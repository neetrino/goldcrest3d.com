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
  if (!order) return { success: false, error: "Order not found." };
  if (order.status === "PAID") {
    return { success: false, error: "Order is already fully paid." };
  }

  const total = order.priceCents;
  const paid = order.paidCents;
  const remaining = total - paid;
  if (remaining <= 0) {
    return { success: false, error: "No amount due for payment." };
  }

  let amountCents: number;
  let index: 0 | 1 | undefined;

  if (order.paymentType === "SPLIT") {
    const half = Math.floor(total / 2);
    if (paymentIndex === 1) {
      if (paid < half) {
        return { success: false, error: "Please pay the first 50% first." };
      }
      amountCents = total - half;
      index = 1;
    } else {
      if (paid >= half) {
        return { success: false, error: "First 50% is already paid." };
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
