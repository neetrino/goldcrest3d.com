"use server";

import { prisma } from "@/lib/db";
import {
  createCheckoutSession,
  type CreateCheckoutSessionResult,
} from "@/lib/stripe";

/**
 * Server Action: create Stripe Checkout Session for order (public — called from client payment page).
 * Computes amount from order (FULL = remaining total, SPLIT = first or second 50%).
 */
export async function createCheckoutSessionForOrder(
  orderId: string,
  paymentIndex?: 0 | 1,
): Promise<CreateCheckoutSessionResult> {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return { success: false, error: "Պատվերը չի գտնվել։" };
  if (order.status === "PAID") {
    return { success: false, error: "Պատվերը արդեն ամբողջությամբ վճարված է։" };
  }

  const total = order.priceCents;
  const paid = order.paidCents;
  const remaining = total - paid;
  if (remaining <= 0) {
    return { success: false, error: "Վճարման ենթակա գումար չկա։" };
  }

  let amountCents: number;
  let index: 0 | 1 | undefined;

  if (order.paymentType === "SPLIT") {
    const half = Math.floor(total / 2);
    if (paymentIndex === 1) {
      if (paid < half) {
        return { success: false, error: "Նախ վճարեք առաջին 50%-ը։" };
      }
      amountCents = total - half;
      index = 1;
    } else {
      if (paid >= half) {
        return { success: false, error: "Առաջին 50%-ը արդեն վճարված է։" };
      }
      amountCents = half;
      index = 0;
    }
  } else {
    amountCents = remaining;
  }

  const orderForCheckout = {
    id: order.id,
    token: order.token,
    priceCents: order.priceCents,
    productTitle: order.productTitle,
    paymentType: order.paymentType,
    paidCents: order.paidCents,
  };

  return createCheckoutSession(orderForCheckout, amountCents, index);
}
