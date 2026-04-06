"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { ORDER_STATUS } from "@/constants/order-status";
import { applyPaidAmountToOrder } from "@/lib/payment/applyPaidAmount";
import { isSimulatedPaymentFlow } from "@/lib/payment/config";
import { resolveOrderPaymentAmount } from "@/lib/payment/resolveOrderPaymentAmount";

const ORDER_ID_MAX_LENGTH = 50;

export type MockPaymentOutcome = "success" | "failed" | "pending";

export type CompleteMockPaymentResult =
  | { success: true; redirectPath: string }
  | { success: false; error: string };

/**
 * Applies a simulated payment outcome (dev-only). Never calls external providers.
 */
export async function completeMockPayment(
  orderId: string,
  orderToken: string,
  outcome: MockPaymentOutcome,
  paymentIndex?: 0 | 1,
): Promise<CompleteMockPaymentResult> {
  if (!isSimulatedPaymentFlow()) {
    return { success: false, error: "Simulated payment is not available." };
  }

  const id =
    typeof orderId === "string" && orderId.length >= 1 && orderId.length <= ORDER_ID_MAX_LENGTH
      ? orderId.trim()
      : "";
  const token =
    typeof orderToken === "string" && orderToken.length >= 1 && orderToken.length <= 200
      ? orderToken.trim()
      : "";
  if (!id || !token) return { success: false, error: "Invalid order." };

  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order || order.token !== token) {
      return { success: false, error: "Order not found." };
    }

    if (outcome === "failed") {
      if (order.status === ORDER_STATUS.PAID) {
        return { success: false, error: "Order is already fully paid." };
      }
      return {
        success: true,
        redirectPath: `/order/${encodeURIComponent(token)}?mock=failed`,
      };
    }

    const resolved = resolveOrderPaymentAmount(order, paymentIndex);
    if (!resolved.ok) {
      return { success: false, error: resolved.error };
    }

    const query = outcome === "success" ? "mock=success" : "mock=pending";

    if (outcome === "pending") {
      await prisma.order.update({
        where: { id },
        data: { status: ORDER_STATUS.PAYMENT_PROCESSING },
      });
      return { success: true, redirectPath: `/order/${encodeURIComponent(token)}?${query}` };
    }

    await applyPaidAmountToOrder(id, resolved.amountCents);
    return { success: true, redirectPath: `/order/${encodeURIComponent(token)}?${query}` };
  } catch (err) {
    logger.error("completeMockPayment failed", err);
    return { success: false, error: "Could not complete simulated payment." };
  }
}

/**
 * Clears simulated "payment processing" so the client can retry (mock mode only).
 */
export async function clearMockPaymentHold(
  orderId: string,
  orderToken: string,
): Promise<{ success: true } | { success: false; error: string }> {
  if (!isSimulatedPaymentFlow()) {
    return { success: false, error: "Simulated payment is not available." };
  }

  const id =
    typeof orderId === "string" && orderId.length >= 1 && orderId.length <= ORDER_ID_MAX_LENGTH
      ? orderId.trim()
      : "";
  const token =
    typeof orderToken === "string" && orderToken.length >= 1 && orderToken.length <= 200
      ? orderToken.trim()
      : "";
  if (!id || !token) return { success: false, error: "Invalid order." };

  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order || order.token !== token) {
      return { success: false, error: "Order not found." };
    }
    if (order.status !== ORDER_STATUS.PAYMENT_PROCESSING) {
      return { success: true };
    }
    await prisma.order.update({
      where: { id },
      data: { status: ORDER_STATUS.PENDING },
    });
    return { success: true };
  } catch (err) {
    logger.error("clearMockPaymentHold failed", err);
    return { success: false, error: "Could not clear hold." };
  }
}
