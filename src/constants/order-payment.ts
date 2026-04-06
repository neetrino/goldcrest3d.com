/** DB `Order.paymentType` values. UNSET = client has not chosen yet (new orders). */
export const ORDER_PAYMENT_TYPE = {
  UNSET: "UNSET",
  FULL: "FULL",
  SPLIT: "SPLIT",
} as const;

export type OrderPaymentTypeStored =
  (typeof ORDER_PAYMENT_TYPE)[keyof typeof ORDER_PAYMENT_TYPE];
