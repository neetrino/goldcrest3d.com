import { ORDER_STATUS } from "@/constants/order-status";

type OrderLike = {
  status: string;
  priceCents: number;
  paidCents: number;
  paymentType: string;
};

export type ResolvedPaymentAmount =
  | { ok: true; amountCents: number; paymentIndex: 0 | 1 | undefined }
  | { ok: false; error: string };

/**
 * Same rules as checkout: FULL = remaining balance; SPLIT = first or second half.
 */
export function resolveOrderPaymentAmount(
  order: OrderLike,
  paymentIndex?: 0 | 1,
): ResolvedPaymentAmount {
  if (order.status === ORDER_STATUS.PAID) {
    return { ok: false, error: "Order is already fully paid." };
  }
  if (order.status === ORDER_STATUS.PAYMENT_PROCESSING) {
    return {
      ok: false,
      error:
        "A payment is already being processed. Wait or clear the simulated hold (dev).",
    };
  }

  const total = order.priceCents;
  const paid = order.paidCents;
  const remaining = total - paid;
  if (remaining <= 0) {
    return { ok: false, error: "No amount due for payment." };
  }

  if (order.paymentType === "SPLIT") {
    const half = Math.floor(total / 2);
    if (paymentIndex === 1) {
      if (paid < half) {
        return { ok: false, error: "Please pay the first 50% first." };
      }
      return { ok: true, amountCents: total - half, paymentIndex: 1 };
    }
    if (paid >= half) {
      return { ok: false, error: "First 50% is already paid." };
    }
    return { ok: true, amountCents: half, paymentIndex: 0 };
  }

  return { ok: true, amountCents: remaining, paymentIndex: undefined };
}
