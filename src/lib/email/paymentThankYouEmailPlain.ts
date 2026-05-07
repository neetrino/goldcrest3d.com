import { CUSTOMER_SUPPORT_INBOX_EMAIL } from "@/constants/customer-support-inbox";

/** Price strings for payment thank-you copy (same scale as DB whole units). */
export type PaymentThankYouPriceLabels = {
  chargeLabel: string;
  paidToDateLabel: string;
  totalLabel: string;
  remainingLabel: string;
  productQuoted: string;
};

function appendThankYouClosing(
  lines: string[],
  siteHostname: string,
  siteLinkHref: string,
): void {
  lines.push(
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
  );
}

export function buildPartialThankYouText(
  clientName: string,
  labels: PaymentThankYouPriceLabels,
  paymentPageLine: string,
  siteHostname: string,
  siteLinkHref: string,
): string {
  const lines = [
    `Dear ${clientName},`,
    "",
    `Thank you for your payment. We're happy to confirm that we have successfully received ${labels.chargeLabel} toward your order: ${labels.productQuoted}`,
    "",
    "We truly appreciate your trust in Goldcrest 3D and are glad to continue moving forward with your project.",
    "",
    "Payment Summary",
    `• Amount received with this transaction: ${labels.chargeLabel}`,
    `• Total paid to date: ${labels.paidToDateLabel}`,
    `• Order total: ${labels.totalLabel}`,
    "",
    `Remaining balance: ${labels.remainingLabel}`,
    "",
    "To keep your order moving smoothly, you can complete the remaining balance at any time through your secure payment page:",
    "",
    paymentPageLine,
    "",
    "Once the remaining balance is completed, our team will continue with the next steps and keep you updated throughout the process.",
  ];
  appendThankYouClosing(lines, siteHostname, siteLinkHref);
  return lines.join("\n");
}

export function buildFullThankYouText(
  clientName: string,
  labels: PaymentThankYouPriceLabels,
  siteHostname: string,
  siteLinkHref: string,
): string {
  const lines = [
    `Dear ${clientName},`,
    "",
    `Thank you for your payment. We're pleased to confirm that we have successfully received ${labels.chargeLabel} toward your order: ${labels.productQuoted}`,
    "",
    "We sincerely appreciate your trust in Goldcrest 3D. Your order is now fully paid, and our team is ready to move forward with the work.",
    "",
    "Payment Summary",
    `• Amount received with this transaction: ${labels.chargeLabel}`,
    `• Total paid to date: ${labels.paidToDateLabel}`,
    `• Order total: ${labels.totalLabel}`,
    "",
    "Your order is now fully paid.",
    "",
    "Our team will proceed with the next stage of your project. If we need any additional details, files, or clarification, we'll contact you directly.",
    "",
    "Thank you again for choosing Goldcrest 3D. We're excited to work on your project and deliver a result that meets your expectations.",
  ];
  appendThankYouClosing(lines, siteHostname, siteLinkHref);
  return lines.join("\n");
}
