"use server";

import { revalidatePath } from "next/cache";
import { R2_PREFIXES } from "@/constants";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { getAppOrigin, getOrderPaymentUrl } from "@/lib/appUrl";
import { sendEmail } from "@/lib/email";
import { uploadToR2 } from "@/lib/storage";
import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";
import {
  createOrderFormSchema,
} from "@/lib/validations/orderForm";
import { FORM_FIELD_PRODUCT_IMAGE } from "@/constants/order-form";
import { formatPrice } from "@/lib/formatPrice";
import { logger } from "@/lib/logger";
import { ORDER_PAYMENT_LINK_MODE } from "@/constants/order-payment-link-mode";
import { ORDER_STATUS } from "@/constants/order-status";

export type CreateOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string }
  | null;

export type UpdateOrderResult = { error?: string; updated?: boolean } | null;
export type DeleteOrderResult = { error?: string; deleted?: boolean } | null;

/** Generate a URL-safe token for public order link (16 chars). */
function generateOrderToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

/**
 * Server Action: create order — validation, optional R2 image upload, Prisma create.
 */
export async function createOrder(
  _prev: CreateOrderResult,
  formData: FormData,
): Promise<CreateOrderResult> {
  const session = await requireAdminSession();
  if (!session) return { success: false, error: "Unauthorized." };

  const clientName = formData.get("clientName");
  const clientEmail = formData.get("clientEmail");
  const productTitle = formData.get("productTitle");
  const priceRaw = formData.get("priceCents");
  const paymentLinkModeRaw = formData.get("paymentLinkMode");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceParsed =
    typeof priceRaw === "string" && priceRaw.trim() !== ""
      ? parseInt(priceRaw.trim(), 10)
      : NaN;

  const parsed = createOrderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceAmount: Number.isNaN(priceParsed) ? 0 : priceParsed,
    paymentLinkMode:
      paymentLinkModeRaw === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
        ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
        : ORDER_PAYMENT_LINK_MODE.FULL_ONLY,
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceAmount?.[0] ??
      first.paymentLinkMode?.[0] ??
      "Invalid data";
    return { success: false, error: msg };
  }

  let productImageKey: string | null = null;
  if (file instanceof File && file.size > 0) {
    const key = await uploadToR2(R2_PREFIXES.ORDERS, file);
    if (key) productImageKey = key;
  }

  const token = generateOrderToken();
  try {
    const order = await prisma.order.create({
      data: {
        token,
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        productTitle: parsed.data.productTitle,
        productImageKey,
        priceCents: parsed.data.priceAmount,
        paymentType: ORDER_PAYMENT_TYPE.UNSET,
        paymentLinkMode: parsed.data.paymentLinkMode,
      },
    });
    return { success: true, orderId: order.id };
  } catch {
    return { success: false, error: "Order could not be saved. Please try again later." };
  }
}

/**
 * Server Action: update order.
 */
export async function updateOrder(
  orderId: string,
  _prev: UpdateOrderResult,
  formData: FormData,
): Promise<UpdateOrderResult> {
  const session = await requireAdminSession();
  if (!session) return { error: "Unauthorized." };

  const existing = await prisma.order.findUnique({ where: { id: orderId } });
  if (!existing) return { error: "Order not found." };

  const clientName = formData.get("clientName");
  const clientEmail = formData.get("clientEmail");
  const productTitle = formData.get("productTitle");
  const priceRaw = formData.get("priceCents");
  const paymentLinkModeRaw = formData.get("paymentLinkMode");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceParsed =
    typeof priceRaw === "string" && priceRaw.trim() !== ""
      ? parseInt(priceRaw.trim(), 10)
      : NaN;

  const paymentLinkModeFromForm =
    paymentLinkModeRaw === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      : paymentLinkModeRaw === ORDER_PAYMENT_LINK_MODE.FULL_ONLY
        ? ORDER_PAYMENT_LINK_MODE.FULL_ONLY
        : existing.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
          ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
          : ORDER_PAYMENT_LINK_MODE.FULL_ONLY;

  const parsed = createOrderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceAmount: Number.isNaN(priceParsed) ? existing.priceCents : priceParsed,
    paymentLinkMode: paymentLinkModeFromForm,
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceAmount?.[0] ??
      "Invalid data";
    return { error: msg };
  }

  let productImageKey: string | undefined = undefined;
  if (file instanceof File && file.size > 0) {
    const key = await uploadToR2(R2_PREFIXES.ORDERS, file);
    if (key) productImageKey = key;
  }

  const isPaymentFlowLocked =
    existing.paidCents > 0 ||
    existing.status === ORDER_STATUS.PAID ||
    existing.status === ORDER_STATUS.PAYMENT_PROCESSING;
  const isModeChanged = parsed.data.paymentLinkMode !== existing.paymentLinkMode;
  if (isPaymentFlowLocked && isModeChanged) {
    return {
      error:
        "Payment link mode cannot be changed after payment has started or while it is processing.",
    };
  }

  const nextPaymentType = isPaymentFlowLocked
    ? existing.paymentType
    : parsed.data.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_TYPE.UNSET
      : ORDER_PAYMENT_TYPE.FULL;

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        productTitle: parsed.data.productTitle,
        priceCents: parsed.data.priceAmount,
        paymentLinkMode: parsed.data.paymentLinkMode,
        paymentType: nextPaymentType,
        ...(productImageKey != null && { productImageKey }),
      },
    });
    return { updated: true };
  } catch {
    return { error: "Order could not be updated." };
  }
}

/**
 * Server Action: delete order.
 */
export async function deleteOrder(orderId: string): Promise<DeleteOrderResult> {
  const session = await requireAdminSession();
  if (!session) return { error: "Unauthorized." };

  try {
    await prisma.order.delete({ where: { id: orderId } });
    return { deleted: true };
  } catch {
    return { error: "Order could not be deleted." };
  }
}

export type SendPaymentLinkResult =
  | { success: true }
  | { success: false; error: string }
  | null;

export type SetPaymentLinkModeResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Server Action: send payment link email to order client.
 */
export async function sendPaymentLink(
  orderId: string,
  paymentLinkMode?: "FULL_ONLY" | "SPLIT_ENABLED",
): Promise<SendPaymentLinkResult> {
  const session = await requireAdminSession();
  if (!session) return { success: false, error: "Unauthorized." };

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Order not found." };

  const nextPaymentLinkMode =
    paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      : paymentLinkMode === ORDER_PAYMENT_LINK_MODE.FULL_ONLY
        ? ORDER_PAYMENT_LINK_MODE.FULL_ONLY
        : order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
          ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
          : ORDER_PAYMENT_LINK_MODE.FULL_ONLY;

  // Allow mode changes only before payment starts; keeps state coherent for Stripe/webhook flow.
  const canChangePaymentPlan =
    order.paidCents === 0 &&
    order.status !== ORDER_STATUS.PAID &&
    order.status !== ORDER_STATUS.PAYMENT_PROCESSING;
  if (!canChangePaymentPlan && paymentLinkMode !== undefined) {
    return {
      success: false,
      error:
        "Payment mode cannot be changed after payment has started or while it is processing.",
    };
  }

  const nextPaymentType = canChangePaymentPlan
    ? nextPaymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_TYPE.UNSET
      : ORDER_PAYMENT_TYPE.FULL
    : order.paymentType;

  const paymentUrl = getOrderPaymentUrl(order.token);
  if (!paymentUrl) return { success: false, error: "Site URL is not configured (AUTH_URL)." };

  const siteOrigin = getAppOrigin();
  const priceLabel = formatPrice(order.priceCents);
  const { subject, text, html } = buildPaymentLinkEmailPayload(
    order,
    priceLabel,
    paymentUrl,
    siteOrigin,
  );

  const result = await sendEmail({
    to: order.clientEmail,
    subject,
    text,
    html,
  });

  if (!result.success) return { success: false, error: result.error };

  let persisted = false;
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentLinkSentAt: new Date(),
        paymentLinkMode: nextPaymentLinkMode,
        paymentType: nextPaymentType,
      },
    });
    persisted = true;
  } catch (err) {
    // Email already sent — do not return failure (avoids duplicate sends if admin retries).
    logger.error("sendPaymentLink: persist paymentLinkSentAt failed", err);
  }

  if (persisted) {
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
  }

  return { success: true };
}

/**
 * Server Action: persist payment-link mode without sending email.
 * Used by admin "Copy link" to ensure copied URL behavior matches the latest selection.
 */
export async function setOrderPaymentLinkMode(
  orderId: string,
  paymentLinkMode: "FULL_ONLY" | "SPLIT_ENABLED",
): Promise<SetPaymentLinkModeResult> {
  const session = await requireAdminSession();
  if (!session) return { success: false, error: "Unauthorized." };

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Order not found." };

  const nextPaymentLinkMode =
    paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      : ORDER_PAYMENT_LINK_MODE.FULL_ONLY;

  const canChangePaymentPlan =
    order.paidCents === 0 &&
    order.status !== ORDER_STATUS.PAID &&
    order.status !== ORDER_STATUS.PAYMENT_PROCESSING;
  if (!canChangePaymentPlan && nextPaymentLinkMode !== order.paymentLinkMode) {
    return {
      success: false,
      error:
        "Payment mode cannot be changed after payment has started or while it is processing.",
    };
  }

  const nextPaymentType = canChangePaymentPlan
    ? nextPaymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_TYPE.UNSET
      : ORDER_PAYMENT_TYPE.FULL
    : order.paymentType;

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentLinkMode: nextPaymentLinkMode,
        paymentType: nextPaymentType,
      },
    });

    revalidatePath(`/order/${order.token}`);
    revalidatePath(`/admin/orders/${orderId}/edit`);
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");

    return { success: true };
  } catch {
    return { success: false, error: "Could not update payment link mode." };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type OrderEmailFields = {
  id: string;
  clientName: string;
  productTitle: string;
};

function buildPaymentLinkEmailPayload(
  order: OrderEmailFields,
  priceLabel: string,
  paymentUrl: string,
  siteOrigin: string,
): { subject: string; text: string; html: string } {
  const subject = `Complete your purchase at Goldcrest 3D — Order #${order.id}`;
  let siteHostname = "goldcrest3d.com";
  try {
    if (siteOrigin) {
      siteHostname = new URL(siteOrigin).hostname;
    }
  } catch {
    // keep default
  }
  const siteLinkHref = siteOrigin || `https://${siteHostname}`;
  const { clientName, productTitle } = order;
  const productQuoted = `"${productTitle}"`;

  const text = [
    `Hello ${clientName},`,
    "",
    `Thank you for choosing Goldcrest 3D. Your order for the ${productQuoted} is ready for payment.`,
    "Please use the secure link below to complete your transaction:",
    "",
    `Pay Now: ${paymentUrl}`,
    "",
    "Order Details:",
    `• Product: ${productTitle}`,
    `• Total Amount: ${priceLabel}`,
    "",
    "If you have any questions regarding your order, feel free to reply to this email.",
    "",
    "Best regards,",
    "The Goldcrest 3D Team",
    siteHostname,
  ].join("\n");

  const html = [
    `<p>Hello ${escapeHtml(clientName)},</p>`,
    `<p>Thank you for choosing Goldcrest 3D. Your order for the ${escapeHtml(productQuoted)} is ready for payment.</p>`,
    `<p>Please use the secure link below to complete your transaction:</p>`,
    `<p><a href="${escapeHtml(paymentUrl)}">Pay Now</a></p>`,
    `<p>Order Details:</p>`,
    `<p>• Product: ${escapeHtml(productTitle)}<br>• Total Amount: ${escapeHtml(priceLabel)}</p>`,
    `<p>If you have any questions regarding your order, feel free to reply to this email.</p>`,
    `<p>Best regards,<br>The Goldcrest 3D Team<br><a href="${escapeHtml(siteLinkHref)}">${escapeHtml(siteHostname)}</a></p>`,
  ].join("");

  return { subject, text, html };
}
