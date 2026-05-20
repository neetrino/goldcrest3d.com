import { NextRequest, NextResponse } from "next/server";

import { PAYMENT_RESULT_PATHS } from "@/constants/payment-routes";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { processArcaPaymentCompleted } from "@/lib/payment/processArcaPaymentCompleted";
import { appendPaymentReturnQuery } from "@/lib/payment/paymentReturnSearchParams";

function firstParam(value: string | null): string | undefined {
  const v = value?.trim();
  return v && v.length > 0 ? v : undefined;
}

/**
 * Customer return URL after Arca hosted payment. Status is verified via REST, not query params.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = firstParam(request.nextUrl.searchParams.get("token"));
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const arcaOrderIdFromQuery =
    firstParam(request.nextUrl.searchParams.get("orderId")) ??
    firstParam(request.nextUrl.searchParams.get("mdOrder"));

  let arcaOrderId = arcaOrderIdFromQuery;

  if (!arcaOrderId) {
    const latestPending = await prisma.arcaPayment.findFirst({
      where: { orderId: order.id, appliedAt: null },
      orderBy: { createdAt: "desc" },
    });
    arcaOrderId = latestPending?.arcaOrderId;
  }

  const bankFailed = request.nextUrl.searchParams.get("payment") === "failed";
  const query = {
    token,
    orderId: arcaOrderIdFromQuery,
    mdOrder: arcaOrderIdFromQuery,
    payment: bankFailed ? "failed" : undefined,
  };

  if (!arcaOrderId) {
    const path = appendPaymentReturnQuery(
      bankFailed ? PAYMENT_RESULT_PATHS.fail : PAYMENT_RESULT_PATHS.success,
      { token, payment: bankFailed ? "failed" : undefined },
    );
    return NextResponse.redirect(new URL(path, request.url));
  }

  const outcome = await processArcaPaymentCompleted(arcaOrderId);

  if (outcome.handled) {
    const path = appendPaymentReturnQuery(PAYMENT_RESULT_PATHS.success, {
      ...query,
      orderId: arcaOrderId,
      mdOrder: arcaOrderId,
    });
    return NextResponse.redirect(new URL(path, request.url));
  }

  if (outcome.reason === "not_paid") {
    const path = appendPaymentReturnQuery(PAYMENT_RESULT_PATHS.success, {
      ...query,
      orderId: arcaOrderId,
      mdOrder: arcaOrderId,
    });
    return NextResponse.redirect(new URL(path, request.url));
  }

  logger.warn("Arca return: payment not applied", {
    token,
    arcaOrderId,
    reason: outcome.reason,
  });
  const path = appendPaymentReturnQuery(PAYMENT_RESULT_PATHS.fail, {
    ...query,
    orderId: arcaOrderId,
    mdOrder: arcaOrderId,
    payment: "failed",
  });
  return NextResponse.redirect(new URL(path, request.url));
}
