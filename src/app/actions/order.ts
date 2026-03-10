"use server";

import { auth } from "@/lib/auth";
import { R2_PREFIXES } from "@/constants";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { sendEmail } from "@/lib/email";
import { uploadToR2 } from "@/lib/storage";
import { orderFormSchema } from "@/lib/validations/orderForm";

const FORM_FIELD_PRODUCT_IMAGE = "productImage";

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
 * Admin only.
 */
export async function createOrder(
  _prev: CreateOrderResult,
  formData: FormData,
): Promise<CreateOrderResult> {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Մուտքը անհրաժեշտ է։" };

  const clientName = formData.get("clientName");
  const clientEmail = formData.get("clientEmail");
  const productTitle = formData.get("productTitle");
  const priceCentsRaw = formData.get("priceCents");
  const paymentType = formData.get("paymentType");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceCents =
    typeof priceCentsRaw === "string" && priceCentsRaw.trim() !== ""
      ? parseInt(priceCentsRaw.trim(), 10)
      : NaN;

  const parsed = orderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceCents: Number.isNaN(priceCents) ? 0 : priceCents,
    paymentType: paymentType === "SPLIT" ? "SPLIT" : "FULL",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceCents?.[0] ??
      first.paymentType?.[0] ??
      "Սխալ տվյալներ";
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
        priceCents: parsed.data.priceCents,
        paymentType: parsed.data.paymentType,
      },
    });
    return { success: true, orderId: order.id };
  } catch {
    return { success: false, error: "Պատվերը չի պահպանվել։ Փորձեք ավելի ուշ։" };
  }
}

/**
 * Server Action: update order. Admin only.
 */
export async function updateOrder(
  orderId: string,
  _prev: UpdateOrderResult,
  formData: FormData,
): Promise<UpdateOrderResult> {
  const session = await auth();
  if (!session?.user) return { error: "Մուտքը անհրաժեշտ է։" };

  const existing = await prisma.order.findUnique({ where: { id: orderId } });
  if (!existing) return { error: "Պատվերը չի գտնվել։" };

  const clientName = formData.get("clientName");
  const clientEmail = formData.get("clientEmail");
  const productTitle = formData.get("productTitle");
  const priceCentsRaw = formData.get("priceCents");
  const paymentType = formData.get("paymentType");
  const file = formData.get(FORM_FIELD_PRODUCT_IMAGE);

  const priceCents =
    typeof priceCentsRaw === "string" && priceCentsRaw.trim() !== ""
      ? parseInt(priceCentsRaw.trim(), 10)
      : NaN;

  const parsed = orderFormSchema.safeParse({
    clientName: typeof clientName === "string" ? clientName : "",
    clientEmail: typeof clientEmail === "string" ? clientEmail : "",
    productTitle: typeof productTitle === "string" ? productTitle : "",
    priceCents: Number.isNaN(priceCents) ? existing.priceCents : priceCents,
    paymentType: paymentType === "SPLIT" ? "SPLIT" : "FULL",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.clientName?.[0] ??
      first.clientEmail?.[0] ??
      first.productTitle?.[0] ??
      first.priceCents?.[0] ??
      first.paymentType?.[0] ??
      "Սխալ տվյալներ";
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
        priceCents: parsed.data.priceCents,
        paymentType: parsed.data.paymentType,
        ...(productImageKey != null && { productImageKey }),
      },
    });
    return { updated: true };
  } catch {
    return { error: "Պատվերը չի թարմացվել։" };
  }
}

/**
 * Server Action: delete order. Admin only.
 */
export async function deleteOrder(orderId: string): Promise<DeleteOrderResult> {
  const session = await auth();
  if (!session?.user) return { error: "Մուտքը անհրաժեշտ է։" };

  try {
    await prisma.order.delete({ where: { id: orderId } });
    return { deleted: true };
  } catch {
    return { error: "Պատվերը չի ջնջվել։" };
  }
}

export type SendPaymentLinkResult =
  | { success: true }
  | { success: false; error: string }
  | null;

/**
 * Server Action: send payment link email to order client. Admin only.
 */
export async function sendPaymentLink(
  orderId: string,
): Promise<SendPaymentLinkResult> {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Մուտքը անհրաժեշտ է։" };

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Պատվերը չի գտնվել։" };

  const paymentUrl = getOrderPaymentUrl(order.token);
  if (!paymentUrl) return { success: false, error: "Կայքի հղումը կարգավորված չէ (AUTH_URL)։" };

  const subject = "Goldcrest 3D — վճարման հղում";
  const text = `Բարև ${order.clientName},\n\nՁեր պատվերի վճարման հղումը.\n\n${paymentUrl}\n\nԱպրանք: ${order.productTitle}\nԳին: ${(order.priceCents / 100).toFixed(0)} ֏`;
  const html = `<p>Բարև ${escapeHtml(order.clientName)},</p><p>Ձեր պատվերի վճարման հղումը.</p><p><a href="${escapeHtml(paymentUrl)}">${escapeHtml(paymentUrl)}</a></p><p>Ապրանք: ${escapeHtml(order.productTitle)}<br>Գին: ${(order.priceCents / 100).toFixed(0)} ֏</p>`;

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

export { FORM_FIELD_PRODUCT_IMAGE };
