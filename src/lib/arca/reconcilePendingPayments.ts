import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getArcaConfig } from "@/lib/arca/config";
import { processArcaPaymentCompleted } from "@/lib/payment/processArcaPaymentCompleted";

const DEFAULT_MAX_AGE_HOURS = 48;
const DEFAULT_BATCH_LIMIT = 20;

export type ReconcileArcaPaymentsResult = {
  checked: number;
  applied: number;
  skipped: number;
  errors: number;
};

/**
 * Polls Arca for pending registrations (user closed browser before returnUrl).
 * Call from a secured cron route — see `/api/cron/arca-payments`.
 */
export async function reconcilePendingArcaPayments(
  maxAgeHours: number = DEFAULT_MAX_AGE_HOURS,
  batchLimit: number = DEFAULT_BATCH_LIMIT,
): Promise<ReconcileArcaPaymentsResult> {
  if (!getArcaConfig()) {
    return { checked: 0, applied: 0, skipped: 0, errors: 0 };
  }

  const since = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);

  const pending = await prisma.arcaPayment.findMany({
    where: { appliedAt: null, createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    take: batchLimit,
  });

  let applied = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of pending) {
    try {
      const outcome = await processArcaPaymentCompleted(row.arcaOrderId);
      if (outcome.handled && !outcome.duplicate) {
        applied += 1;
      } else {
        skipped += 1;
      }
    } catch (err) {
      errors += 1;
      logger.error("reconcilePendingArcaPayments: row failed", {
        arcaOrderId: row.arcaOrderId,
        err,
      });
    }
  }

  return {
    checked: pending.length,
    applied,
    skipped,
    errors,
  };
}
