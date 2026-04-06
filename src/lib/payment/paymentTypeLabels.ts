import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";

/**
 * Human-readable payment type for admin and client order views.
 */
export function formatOrderPaymentTypeLabel(paymentType: string): string {
  switch (paymentType) {
    case ORDER_PAYMENT_TYPE.UNSET:
      return "Not set — client chooses at payment";
    case ORDER_PAYMENT_TYPE.SPLIT:
      return "50% + 50%";
    case ORDER_PAYMENT_TYPE.FULL:
      return "Pay in full";
    default:
      return paymentType;
  }
}
