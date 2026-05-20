import type { PaymentResultVariant } from "@/components/payment/PaymentResultCard";

export type PaymentResultCopyKey = "success" | "failed" | "pending" | "unknown";

type PaymentResultCopy = {
  variant: PaymentResultVariant;
  title: string;
  description: string;
};

const COPY: Record<PaymentResultCopyKey, PaymentResultCopy> = {
  success: {
    variant: "success",
    title: "Payment Successful",
    description:
      "Thank you! Your payment has been completed successfully. We have received your order and will process it shortly.",
  },
  failed: {
    variant: "failure",
    title: "Payment Failed",
    description:
      "Unfortunately, your payment could not be completed. Please try again or contact support if the issue continues.",
  },
  pending: {
    variant: "success",
    title: "Payment Processing",
    description:
      "Your payment is still being confirmed. Please refresh this page in a moment or check your order page for an updated balance.",
  },
  unknown: {
    variant: "failure",
    title: "Payment Status Unclear",
    description:
      "We could not confirm your payment status automatically. If you were charged, please contact us with your order details.",
  },
};

export function contentForPaymentResult(
  key: PaymentResultCopyKey,
): PaymentResultCopy {
  return COPY[key];
}
