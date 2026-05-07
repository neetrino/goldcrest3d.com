import type Stripe from "stripe";

import { STRIPE_MINOR_UNITS_PER_MAJOR_UNIT } from "@/constants/order-form";
import { sendPaymentThankYouForOrder } from "@/lib/email/sendPaymentThankYouForOrder";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { applyPaidAmountToOrder } from "@/lib/payment/applyPaidAmount";
import { isPrismaUniqueViolation } from "@/lib/prisma/isPrismaUniqueViolation";

export type ProcessCheckoutSessionOutcome =
  | { handled: true; duplicateSession: boolean }
  | { handled: false; reason: "missing_order_id" | "order_not_found" | "zero_amount" };

/**
 * Applies payment from a completed Checkout Session, sends client thank-you email,
 * and uses {@link AppliedStripeCheckoutSession} so Stripe retries do not double-apply.
 */
export async function processStripeCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<ProcessCheckoutSessionOutcome> {
  const orderId = session.metadata?.orderId ?? session.client_reference_id;
  if (!orderId || typeof orderId !== "string") {
    return { handled: false, reason: "missing_order_id" };
  }

  const sessionId = session.id;
  if (!sessionId) {
    logger.error("Stripe webhook: checkout session missing id");
    return { handled: false, reason: "missing_order_id" };
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    logger.warn("Stripe webhook: order not found for session", { orderId, sessionId });
    return { handled: false, reason: "order_not_found" };
  }

  try {
    await prisma.appliedStripeCheckoutSession.create({
      data: {
        stripeCheckoutSessionId: sessionId,
        orderId: order.id,
      },
    });
  } catch (err) {
    if (isPrismaUniqueViolation(err)) {
      return { handled: true, duplicateSession: true };
    }
    throw err;
  }

  const amountTotalMinor = session.amount_total ?? 0;
  const paidDeltaWhole = Math.round(
    amountTotalMinor / STRIPE_MINOR_UNITS_PER_MAJOR_UNIT,
  );

  if (paidDeltaWhole <= 0) {
    await prisma.appliedStripeCheckoutSession
      .delete({ where: { stripeCheckoutSessionId: sessionId } })
      .catch(() => {});
    logger.warn("Stripe webhook: session amount_total not positive; skipped apply", {
      sessionId,
      orderId,
    });
    return { handled: false, reason: "zero_amount" };
  }

  try {
    await applyPaidAmountToOrder(orderId, paidDeltaWhole);
  } catch (err) {
    await prisma.appliedStripeCheckoutSession
      .delete({ where: { stripeCheckoutSessionId: sessionId } })
      .catch(() => {});
    throw err;
  }

  const updated = await prisma.order.findUnique({ where: { id: orderId } });
  if (updated) {
    await sendPaymentThankYouForOrder(updated, paidDeltaWhole);
  }

  return { handled: true, duplicateSession: false };
}
