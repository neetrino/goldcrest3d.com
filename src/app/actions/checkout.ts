"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { createArcaCheckoutSession } from "@/lib/arca/createArcaCheckoutSession";
import { MIN_CHARGE_MINOR_UNITS } from "@/lib/money";
import { isPaymentConfigured } from "@/lib/payment/config";
import type { CreateCheckoutSessionResult } from "@/lib/payment/checkout-result";
import { resolveOrderPaymentAmount } from "@/lib/payment/resolveOrderPaymentAmount";

const ORDER_ID_MAX_LENGTH = 50;

/**
 * Server Action: register an Arca/iPay hosted payment and return the redirect URL.
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

  if (!isPaymentConfigured()) {
    return {
      success: false,
      error:
        "Payment is not configured. Set ARCA_API_USERNAME and ARCA_API_PASSWORD in the environment.",
    };
  }

  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return { success: false, error: "Order not found." };

    const resolved = resolveOrderPaymentAmount(order, paymentIndex);
    if (!resolved.ok) {
      return { success: false, error: resolved.error };
    }

    const amountMinor = resolved.amountCents;
    if (amountMinor < MIN_CHARGE_MINOR_UNITS) {
      return { success: false, error: "Amount must be at least $0.01." };
    }

    return createArcaCheckoutSession(
      {
        id: order.id,
        token: order.token,
        productTitle: order.productTitle,
        paymentType: order.paymentType,
      },
      amountMinor,
      amountMinor,
      resolved.paymentIndex,
    );
  } catch (err) {
    logger.error("createCheckoutSessionForOrder failed", err);
    return { success: false, error: "Payment could not be started. Please try again." };
  }
}
