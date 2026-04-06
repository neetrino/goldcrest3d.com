/**
 * Order lifecycle for payment (DB `Order.status`).
 * `PAYMENT_PROCESSING` — async / simulated pending settlement (not fully paid).
 */
export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
  PAID: "PAID",
} as const;

export type OrderStatusValue = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
