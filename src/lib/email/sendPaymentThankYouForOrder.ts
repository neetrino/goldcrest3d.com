import type { Order } from "@/generated/prisma/client";

import { buildPaymentThankYouEmailPayload } from "@/lib/email/buildPaymentThankYouEmail";
import { sendEmail, type SendEmailResult } from "@/lib/email";
import { getAppOrigin, getOrderPaymentUrl } from "@/lib/appUrl";
import { logger } from "@/lib/logger";

function resolveEmailWebsiteLinkUrl(): string {
  const explicit = process.env.EMAIL_WEBSITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  return getAppOrigin();
}

function resolveSiteHostname(fallbackHref: string): string {
  try {
    return new URL(fallbackHref).hostname;
  } catch {
    return "goldcrest3d.com";
  }
}

/**
 * Sends a branded English thank-you after a successful payment (Stripe webhook or mock flow).
 * Does not throw; logs on failure. Skips gracefully when email is not configured.
 */
export async function sendPaymentThankYouForOrder(
  order: Pick<
    Order,
    "clientName" | "clientEmail" | "productTitle" | "id" | "token" | "paidCents" | "priceCents"
  >,
  amountThisChargeWhole: number,
): Promise<SendEmailResult> {
  const siteLinkHref = resolveEmailWebsiteLinkUrl() || "https://goldcrest3d.com";
  const siteHostname = resolveSiteHostname(siteLinkHref);
  const orderPageUrl = getOrderPaymentUrl(order.token);

  const { subject, text, html } = buildPaymentThankYouEmailPayload({
    clientName: order.clientName,
    productTitle: order.productTitle,
    amountThisChargeWhole,
    paidCents: order.paidCents,
    priceCents: order.priceCents,
    orderPageUrl,
    siteLinkHref,
    siteHostname,
  });

  const result = await sendEmail({
    to: order.clientEmail,
    subject,
    text,
    html,
  });

  if (!result.success) {
    logger.error(
      `sendPaymentThankYouForOrder: email failed for order ${order.id}: ${result.error}`,
    );
  }

  return result;
}
