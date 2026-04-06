import { ORDER_STATUS } from "@/constants/order-status";

/** Admin Orders UI — payment badge kind (derived; not stored in DB). */
export const ADMIN_ORDER_PAYMENT_BADGE_KIND = {
  PAID: "paid",
  PENDING: "pending",
  PARTIALLY_PAID: "partially_paid",
  PAYMENT_PROCESSING: "payment_processing",
} as const;

export type AdminOrderPaymentBadgeKind =
  (typeof ADMIN_ORDER_PAYMENT_BADGE_KIND)[keyof typeof ADMIN_ORDER_PAYMENT_BADGE_KIND];

type OrderLike = {
  status: string;
  paymentType: string;
  priceCents: number;
  paidCents: number;
};

/**
 * Resolves which payment badge to show in Admin → Orders (list/detail).
 * Split (50–50) orders with the first half paid but not the full total use
 * {@link ADMIN_ORDER_PAYMENT_BADGE_KIND.PARTIALLY_PAID} instead of pending.
 */
export function getAdminOrderPaymentBadgeKind(
  order: OrderLike,
): AdminOrderPaymentBadgeKind {
  if (
    order.status === ORDER_STATUS.PAID ||
    order.paidCents >= order.priceCents
  ) {
    return ADMIN_ORDER_PAYMENT_BADGE_KIND.PAID;
  }
  if (order.status === ORDER_STATUS.PAYMENT_PROCESSING) {
    return ADMIN_ORDER_PAYMENT_BADGE_KIND.PAYMENT_PROCESSING;
  }
  if (
    order.paymentType === "SPLIT" &&
    order.paidCents > 0 &&
    order.paidCents < order.priceCents
  ) {
    return ADMIN_ORDER_PAYMENT_BADGE_KIND.PARTIALLY_PAID;
  }
  return ADMIN_ORDER_PAYMENT_BADGE_KIND.PENDING;
}
