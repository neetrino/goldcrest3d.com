/** DB `Order.paymentLinkMode` values. Controlled by admin before sending link. */
export const ORDER_PAYMENT_LINK_MODE = {
  FULL_ONLY: "FULL_ONLY",
  SPLIT_ENABLED: "SPLIT_ENABLED",
} as const;

export type OrderPaymentLinkModeStored =
  (typeof ORDER_PAYMENT_LINK_MODE)[keyof typeof ORDER_PAYMENT_LINK_MODE];

export function formatOrderPaymentLinkModeLabel(mode: string): string {
  switch (mode) {
    case ORDER_PAYMENT_LINK_MODE.FULL_ONLY:
      return "Full-only link";
    case ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED:
      return "Full + 50/50 link";
    default:
      return mode;
  }
}
