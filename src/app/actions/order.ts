"use server";

import { R2_PREFIXES } from "@/constants";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { sendEmail } from "@/lib/email";
import { uploadToR2 } from "@/lib/storage";
import { orderFormSchema } from "@/lib/validations/orderForm";
import { FORM_FIELD_PRODUCT_IMAGE } from "@/constants/order-form";

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
  const priceAmdRaw = formData.get("priceCents");
  const paymentType = formData.get("paymentType");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceAmdParsed =
    typeof priceAmdRaw === "string" && priceAmdRaw.trim() !== ""
      ? parseInt(priceAmdRaw.trim(), 10)
      : NaN;

  const parsed = orderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceAmd: Number.isNaN(priceAmdParsed) ? 0 : priceAmdParsed,
    paymentType: paymentType === "SPLIT" ? "SPLIT" : "FULL",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceAmd?.[0] ??
      first.paymentType?.[0] ??
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
        priceCents: parsed.data.priceAmd,
        paymentType: parsed.data.paymentType,
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
  const priceAmdRaw = formData.get("priceCents");
  const paymentType = formData.get("paymentType");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceAmdParsed =
    typeof priceAmdRaw === "string" && priceAmdRaw.trim() !== ""
      ? parseInt(priceAmdRaw.trim(), 10)
      : NaN;

  const parsed = orderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceAmd: Number.isNaN(priceAmdParsed) ? existing.priceCents : priceAmdParsed,
    paymentType: paymentType === "SPLIT" ? "SPLIT" : "FULL",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceAmd?.[0] ??
      first.paymentType?.[0] ??
      "Invalid data";
    return { error: msg };
  }

  let productImageKey: string | undefined = undefined;
  if (file instanceof File && file.size > 0) {
    const key = await uploadToR2(R2_PREFIXES.ORDERS, file);
    if (key) productImageKey = key;
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        productTitle: parsed.data.productTitle,
        priceCents: parsed.data.priceAmd,
        paymentType: parsed.data.paymentType,
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

/**
 * Server Action: send payment link email to order client.
 */
export async function sendPaymentLink(
  orderId: string,
): Promise<SendPaymentLinkResult> {
  const session = await requireAdminSession();
  if (!session) return { success: false, error: "Unauthorized." };

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Order not found." };

  const paymentUrl = getOrderPaymentUrl(order.token);
  if (!paymentUrl) return { success: false, error: "Site URL is not configured (AUTH_URL)." };

  const subject = "Goldcrest 3D — payment link";
  const priceAmd = String(order.priceCents);
  const text = `Hello ${order.clientName},\n\nYour order payment link.\n\n${paymentUrl}\n\nProduct: ${order.productTitle}\nPrice: ${priceAmd} AMD`;
  const html = `<p>Hello ${escapeHtml(order.clientName)},</p><p>Your order payment link.</p><p><a href="${escapeHtml(paymentUrl)}">${escapeHtml(paymentUrl)}</a></p><p>Product: ${escapeHtml(order.productTitle)}<br>Price: ${escapeHtml(priceAmd)} AMD</p>`;

  const result = await sendEmail({
    to: order.clientEmail,
    subject,
    text,
    html,
  });

  if (!result.success) return { success: false, error: result.error };
  return { success: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
