import { getOrderPaymentUrl } from "@/lib/appUrl";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { processArcaPaymentCompleted } from "@/lib/payment/processArcaPaymentCompleted";
import type { PaymentReturnQuery } from "@/lib/payment/paymentReturnSearchParams";

export type PaymentReturnPage = "success" | "fail";

export type ResolvedPaymentReturnStatus =
  | "success"
  | "failed"
  | "pending"
  | "unknown";

export type ResolvedPaymentReturn = {
  status: ResolvedPaymentReturnStatus;
  orderPaymentHref?: string;
};

type ResolveInput = PaymentReturnQuery & {
  arcaOrderIdFromQuery?: string;
  returnPage: PaymentReturnPage;
};

/**
 * Verifies Arca payment server-side for bank return pages (idempotent).
 */
export async function resolveArcaPaymentReturn(
  input: ResolveInput,
): Promise<ResolvedPaymentReturn> {
  const { token, arcaOrderIdFromQuery, returnPage } = input;
  const bankMarkedFailed = input.payment === "failed";

  if (!token) {
    return { status: "unknown" };
  }

  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) {
    return { status: "unknown" };
  }

  const orderPaymentHref = getOrderPaymentUrl(token) || undefined;

  let arcaOrderId = arcaOrderIdFromQuery?.trim();
  if (!arcaOrderId) {
    const latestPending = await prisma.arcaPayment.findFirst({
      where: { orderId: order.id, appliedAt: null },
      orderBy: { createdAt: "desc" },
    });
    arcaOrderId = latestPending?.arcaOrderId;
  }

  if (!arcaOrderId) {
    if (returnPage === "fail" && bankMarkedFailed) {
      return { status: "failed", orderPaymentHref };
    }
    return { status: "unknown", orderPaymentHref };
  }

  const outcome = await processArcaPaymentCompleted(arcaOrderId);

  if (outcome.handled) {
    return { status: "success", orderPaymentHref };
  }

  if (outcome.reason === "not_paid") {
    if (returnPage === "fail" || bankMarkedFailed) {
      return { status: "failed", orderPaymentHref };
    }
    return { status: "pending", orderPaymentHref };
  }

  logger.warn("Payment return page: could not apply payment", {
    token,
    arcaOrderId,
    returnPage,
    reason: outcome.reason,
  });

  if (returnPage === "fail" || bankMarkedFailed) {
    return { status: "failed", orderPaymentHref };
  }

  return { status: "unknown", orderPaymentHref };
}
