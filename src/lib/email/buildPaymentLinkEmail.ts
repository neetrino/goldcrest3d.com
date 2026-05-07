import { CUSTOMER_SUPPORT_INBOX_EMAIL } from "@/constants/customer-support-inbox";
import {
  BRANDED_EMAIL_ACCENT,
  BRANDED_EMAIL_BODY_TEXT,
  buildBrandedEmailDocument,
  escapeHtmlForEmail,
} from "@/lib/email/brandedTransactionalShell";

const PAYMENT_LINK_HEADER_SUBTITLE = "Secure payment";

export type PaymentLinkEmailInput = {
  clientName: string;
  productTitle: string;
  priceLabel: string;
  paymentUrl: string;
  siteLinkHref: string;
  siteHostname: string;
};

function orderSummaryBoxHtml(productTitle: string, priceLabel: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px 0;background-color:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
      <tr>
        <td style="padding:18px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <p style="margin:0 0 10px 0;font-size:14px;color:#64748b;line-height:1.5;">Order summary</p>
          <p style="margin:0 0 8px 0;font-size:15px;color:${BRANDED_EMAIL_BODY_TEXT};line-height:1.5;"><span style="color:#64748b;">Product:</span> <strong>${escapeHtmlForEmail(productTitle)}</strong></p>
          <p style="margin:0;font-size:15px;color:${BRANDED_EMAIL_BODY_TEXT};line-height:1.5;"><span style="color:#64748b;">Total:</span> <strong>${escapeHtmlForEmail(priceLabel)}</strong></p>
        </td>
      </tr>
    </table>`;
}

function buildPaymentLinkBodyInner(input: PaymentLinkEmailInput): string {
  const { clientName, productTitle, priceLabel, paymentUrl, siteHostname, siteLinkHref } =
    input;
  const productQuoted = `"${productTitle}"`;
  const summary = orderSummaryBoxHtml(productTitle, priceLabel);
  return `
    <p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Dear ${escapeHtmlForEmail(clientName)},</p>
    <p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Thank you for choosing Goldcrest 3D. Your order for <strong>${escapeHtmlForEmail(productQuoted)}</strong> is ready for <strong>secure payment</strong>.</p>
    <p style="margin:0 0 20px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">When you're ready, complete your transaction using the button below. The link is personal to your order and safe to use on any device.</p>
    ${summary}
    <p style="margin:0 0 14px 0;text-align:center;">
      <a href="${escapeHtmlForEmail(paymentUrl)}" style="display:inline-block;padding:14px 28px;background-color:${BRANDED_EMAIL_ACCENT};color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">Pay securely</a>
    </p>
    <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;word-break:break-all;text-align:center;color:#64748b;">
      <a href="${escapeHtmlForEmail(paymentUrl)}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${escapeHtmlForEmail(paymentUrl)}</a>
    </p>
    <p style="margin:0 0 8px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">With appreciation,<br /><strong>The Goldcrest 3D Team</strong><br /><a href="${escapeHtmlForEmail(siteLinkHref)}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${escapeHtmlForEmail(siteHostname)}</a></p>
  `;
}

function buildPaymentLinkPlainText(input: PaymentLinkEmailInput): string {
  const {
    clientName,
    productTitle,
    priceLabel,
    paymentUrl,
    siteHostname,
    siteLinkHref,
  } = input;
  const productQuoted = `"${productTitle}"`;
  return [
    `Dear ${clientName},`,
    "",
    `Thank you for choosing Goldcrest 3D. Your order for ${productQuoted} is ready for secure payment.`,
    "",
    "When you're ready, complete your transaction using the secure link below. The link is personal to your order.",
    "",
    "Order summary",
    `• Product: ${productTitle}`,
    `• Total: ${priceLabel}`,
    "",
    paymentUrl,
    "",
    "With appreciation,",
    "The Goldcrest 3D Team",
    siteHostname,
    "",
    "If you have any questions about your order, simply reply to this email or contact us at " +
      `${CUSTOMER_SUPPORT_INBOX_EMAIL}.`,
    "",
    "Visit our website:",
    siteLinkHref,
  ].join("\n");
}

/**
 * Branded payment-link email (admin sends checkout URL to the client).
 */
export function buildPaymentLinkEmailPayload(
  input: PaymentLinkEmailInput,
): { subject: string; text: string; html: string } {
  const subject = `Your order is ready for payment | Goldcrest 3D`;
  const text = buildPaymentLinkPlainText(input);
  const bodyInner = buildPaymentLinkBodyInner(input);
  const html = buildBrandedEmailDocument(
    PAYMENT_LINK_HEADER_SUBTITLE,
    bodyInner,
    input.siteLinkHref,
  );
  return { subject, text, html };
}
