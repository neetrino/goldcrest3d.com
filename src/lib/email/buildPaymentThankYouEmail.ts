import {
  BRANDED_EMAIL_ACCENT,
  BRANDED_EMAIL_BODY_TEXT,
  buildBrandedEmailDocument,
  escapeHtmlForEmail,
} from "@/lib/email/brandedTransactionalShell";
import { formatPrice } from "@/lib/formatPrice";
import {
  buildFullThankYouText,
  buildPartialThankYouText,
  type PaymentThankYouPriceLabels,
} from "@/lib/email/paymentThankYouEmailPlain";

const THANK_YOU_HEADER_SUBTITLE = "Payment received";

export type PaymentThankYouEmailInput = {
  clientName: string;
  productTitle: string;
  /** Whole major units received in this charge (same scale as DB). */
  amountThisChargeWhole: number;
  paidCents: number;
  priceCents: number;
  orderPageUrl: string;
  siteLinkHref: string;
  siteHostname: string;
};

function paymentSummaryHtml(
  chargeLabel: string,
  paidToDateLabel: string,
  totalLabel: string,
): string {
  return `
    <p style="margin:0 0 10px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;"><strong>Payment Summary</strong></p>
    <p style="margin:0 0 6px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">• Amount received with this transaction: <strong>${escapeHtmlForEmail(chargeLabel)}</strong></p>
    <p style="margin:0 0 6px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">• Total paid to date: <strong>${escapeHtmlForEmail(paidToDateLabel)}</strong></p>
    <p style="margin:0 0 20px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">• Order total: <strong>${escapeHtmlForEmail(totalLabel)}</strong></p>`;
}

function buildPartialMidHtml(
  summaryBlock: string,
  remainingLabel: string,
  orderPageUrl: string,
): string {
  const payBlock = orderPageUrl
    ? `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;word-break:break-all;"><a href="${escapeHtmlForEmail(orderPageUrl)}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${escapeHtmlForEmail(orderPageUrl)}</a></p>`
    : `<p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:15px;line-height:1.6;">Use the secure payment link from your earlier email from us.</p>`;
  return `<p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">We truly appreciate your trust in Goldcrest 3D and are glad to continue moving forward with your project.</p>
       ${summaryBlock}
       <p style="margin:0 0 12px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;"><strong>Remaining balance:</strong> <strong>${escapeHtmlForEmail(remainingLabel)}</strong></p>
       <p style="margin:0 0 12px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">To keep your order moving smoothly, you can complete the remaining balance at any time through your secure payment page:</p>
       ${payBlock}
       <p style="margin:0 0 24px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Once the remaining balance is completed, our team will continue with the next steps and keep you updated throughout the process.</p>`;
}

function buildFullMidHtml(summaryBlock: string): string {
  return `<p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">We sincerely appreciate your trust in Goldcrest 3D. Your order is now <strong>fully paid</strong>, and our team is ready to move forward with the work.</p>
       ${summaryBlock}
       <p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;"><strong>Your order is now fully paid.</strong></p>
       <p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Our team will proceed with the next stage of your project. If we need any additional details, files, or clarification, we'll contact you directly.</p>
       <p style="margin:0 0 24px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Thank you again for choosing Goldcrest 3D. We're excited to work on your project and deliver a result that meets your expectations.</p>`;
}

function buildThankYouOpenLineHtml(
  isFullyPaid: boolean,
  labels: PaymentThankYouPriceLabels,
): string {
  return isFullyPaid
    ? `Thank you for your payment. We're pleased to confirm that we have successfully received <strong>${escapeHtmlForEmail(labels.chargeLabel)}</strong> toward your order: <strong>${escapeHtmlForEmail(labels.productQuoted)}</strong>`
    : `Thank you for your payment. We're happy to confirm that we have successfully received <strong>${escapeHtmlForEmail(labels.chargeLabel)}</strong> toward your order: <strong>${escapeHtmlForEmail(labels.productQuoted)}</strong>`;
}

function buildThankYouBodyInner(
  clientName: string,
  siteHostname: string,
  siteLinkHref: string,
  openLineHtml: string,
  midBlock: string,
): string {
  return `
    <p style="margin:0 0 16px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">Dear ${escapeHtmlForEmail(clientName)},</p>
    <p style="margin:0 0 20px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">${openLineHtml}</p>
    ${midBlock}
    <p style="margin:0 0 8px 0;color:${BRANDED_EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">With appreciation,<br /><strong>The Goldcrest 3D Team</strong><br /><a href="${escapeHtmlForEmail(siteLinkHref)}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${escapeHtmlForEmail(siteHostname)}</a></p>
  `;
}

function resolveThankYouPricing(input: PaymentThankYouEmailInput): {
  labels: PaymentThankYouPriceLabels;
  isFullyPaid: boolean;
  paymentPageLine: string;
  subject: string;
} {
  const { productTitle, amountThisChargeWhole, paidCents, priceCents, orderPageUrl } =
    input;
  const chargeLabel = formatPrice(amountThisChargeWhole);
  const totalLabel = formatPrice(priceCents);
  const paidToDateLabel = formatPrice(paidCents);
  const remainingWhole = Math.max(0, priceCents - paidCents);
  const labels: PaymentThankYouPriceLabels = {
    chargeLabel,
    paidToDateLabel,
    totalLabel,
    remainingLabel: formatPrice(remainingWhole),
    productQuoted: `"${productTitle}"`,
  };
  const isFullyPaid = paidCents >= priceCents;
  const paymentPageLine =
    orderPageUrl ||
    "(Use the secure payment link from your earlier email from us.)";
  const subject = isFullyPaid
    ? `Thank you — your order is fully paid | Goldcrest 3D`
    : `Thank you — we received your payment | Goldcrest 3D`;
  return { labels, isFullyPaid, paymentPageLine, subject };
}

/**
 * Subject, plain text, and branded HTML for a post-payment thank-you to the client.
 */
export function buildPaymentThankYouEmailPayload(
  input: PaymentThankYouEmailInput,
): { subject: string; text: string; html: string } {
  const { clientName, orderPageUrl, siteLinkHref, siteHostname } = input;
  const { labels, isFullyPaid, paymentPageLine, subject } =
    resolveThankYouPricing(input);

  const text = isFullyPaid
    ? buildFullThankYouText(clientName, labels, siteHostname, siteLinkHref)
    : buildPartialThankYouText(
        clientName,
        labels,
        paymentPageLine,
        siteHostname,
        siteLinkHref,
      );

  const summaryBlock = paymentSummaryHtml(
    labels.chargeLabel,
    labels.paidToDateLabel,
    labels.totalLabel,
  );
  const midBlock = isFullyPaid
    ? buildFullMidHtml(summaryBlock)
    : buildPartialMidHtml(summaryBlock, labels.remainingLabel, orderPageUrl);

  const bodyInner = buildThankYouBodyInner(
    clientName,
    siteHostname,
    siteLinkHref,
    buildThankYouOpenLineHtml(isFullyPaid, labels),
    midBlock,
  );
  const html = buildBrandedEmailDocument(
    THANK_YOU_HEADER_SUBTITLE,
    bodyInner,
    siteLinkHref,
  );

  return { subject, text, html };
}
