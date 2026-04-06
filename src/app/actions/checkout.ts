"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { isSimulatedPaymentFlow } from "@/lib/payment/config";
import { createMockCheckoutSession } from "@/lib/payment/mockCheckout";
import { resolveOrderPaymentAmount } from "@/lib/payment/resolveOrderPaymentAmount";
import {
  createCheckoutSession,
  type CreateCheckoutSessionResult,
} from "@/lib/stripe";

const ORDER_ID_MAX_LENGTH = 50;

/**
 * Server Action: start checkout — Stripe session URL, or mock payment page when simulated flow (PAYMENT_MOCK_MODE or missing STRIPE_SECRET_KEY).
 * Computes amount from order (FULL = remaining total, SPLIT = first or second 50%).
 */
export async function createCheckoutSessionForOrder(
  orderId: string,
  paymentIndex?: 0 | 1,
): Promise<CreateCheckoutSessionResult> {
  const id =
    typeof orderId === "string" && orderId.length >= 1 && orderId.length <= ORDER_ID_MAX_LENGTH
      ? orderId.trim()
      : "";
  if (!id) return { success: false, error: "Invalid order." };

  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return { success: false, error: "Order not found." };

    const resolved = resolveOrderPaymentAmount(order, paymentIndex);
    if (!resolved.ok) {
      return { success: false, error: resolved.error };
    }

    if (isSimulatedPaymentFlow()) {
      return createMockCheckoutSession(order.token, resolved.paymentIndex);
    }

    const orderForCheckout = {
      id: order.id,
      token: order.token,
      priceCents: order.priceCents,
      productTitle: order.productTitle,
      paymentType: order.paymentType,
      paidCents: order.paidCents,
    };

    return createCheckoutSession(orderForCheckout, resolved.amountCents, resolved.paymentIndex);
  } catch (err) {
    logger.error("createCheckoutSessionForOrder failed", err);
    return { success: false, error: "Payment could not be started. Please try again." };
  }
}
