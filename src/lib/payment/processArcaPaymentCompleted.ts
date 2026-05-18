import { arcaGetOrderStatusExtended, isArcaApiSuccess } from "@/lib/arca/client";
import { getArcaConfig } from "@/lib/arca/config";
import { isArcaPaymentDeposited } from "@/lib/arca/isPaymentDeposited";
import { sendPaymentThankYouForOrder } from "@/lib/email/sendPaymentThankYouForOrder";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { applyPaidAmountToOrder } from "@/lib/payment/applyPaidAmount";

export type ProcessArcaPaymentOutcome =
  | { handled: true; duplicate: boolean }
  | {
      handled: false;
      reason:
        | "not_configured"
        | "payment_not_found"
        | "not_paid"
        | "status_check_failed"
        | "amount_mismatch";
    };

/**
 * Verifies Arca order status server-side and applies payment once (idempotent).
 */
export async function processArcaPaymentCompleted(
  arcaOrderId: string,
): Promise<ProcessArcaPaymentOutcome> {
  const config = getArcaConfig();
  if (!config) {
    return { handled: false, reason: "not_configured" };
  }

  const payment = await prisma.arcaPayment.findUnique({
    where: { arcaOrderId },
  });
  if (!payment) {
    return { handled: false, reason: "payment_not_found" };
  }

  if (payment.appliedAt) {
    return { handled: true, duplicate: true };
  }

  let statusBody;
  try {
    statusBody = await arcaGetOrderStatusExtended(config, arcaOrderId);
  } catch {
    return { handled: false, reason: "status_check_failed" };
  }

  if (!isArcaApiSuccess(statusBody.errorCode)) {
    logger.warn("Arca status check returned error", {
      arcaOrderId,
      errorCode: statusBody.errorCode,
      errorMessage: statusBody.errorMessage,
    });
    return { handled: false, reason: "status_check_failed" };
  }

  if (!isArcaPaymentDeposited(statusBody)) {
    return { handled: false, reason: "not_paid" };
  }

  const gatewayAmountMinor =
    typeof statusBody.amount === "number" ? statusBody.amount : 0;
  const expectedMinor = payment.amountWholeExpected;

  if (gatewayAmountMinor > 0 && gatewayAmountMinor !== expectedMinor) {
    logger.warn("Arca paid amount does not match expected", {
      arcaOrderId,
      expectedMinor,
      gatewayAmountMinor,
    });
    return { handled: false, reason: "amount_mismatch" };
  }

  const paidMinor =
    gatewayAmountMinor > 0 ? gatewayAmountMinor : payment.amountWholeExpected;

  const applied = await prisma.arcaPayment.updateMany({
    where: { arcaOrderId, appliedAt: null },
    data: { appliedAt: new Date() },
  });

  if (applied.count === 0) {
    return { handled: true, duplicate: true };
  }

  await applyPaidAmountToOrder(payment.orderId, paidMinor);

  const updated = await prisma.order.findUnique({
    where: { id: payment.orderId },
  });
  if (updated) {
    await sendPaymentThankYouForOrder(updated, paidMinor);
  }

  return { handled: true, duplicate: false };
}
