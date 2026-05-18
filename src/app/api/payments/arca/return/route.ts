import { NextRequest, NextResponse } from "next/server";

import { getOrderPaymentUrl } from "@/lib/appUrl";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { processArcaPaymentCompleted } from "@/lib/payment/processArcaPaymentCompleted";

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

  const orderPageUrl = getOrderPaymentUrl(token);
  const fallbackRedirect = orderPageUrl ?? "/";

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

  if (!arcaOrderId) {
    const redirectUrl = new URL(fallbackRedirect, request.url);
    redirectUrl.searchParams.set("payment", "unknown");
    return NextResponse.redirect(redirectUrl);
  }

  const outcome = await processArcaPaymentCompleted(arcaOrderId);

  const redirectUrl = new URL(fallbackRedirect, request.url);

  if (outcome.handled) {
    redirectUrl.searchParams.set("paid", "1");
    return NextResponse.redirect(redirectUrl);
  }

  if (outcome.reason === "not_paid") {
    redirectUrl.searchParams.set("payment", "pending");
    return NextResponse.redirect(redirectUrl);
  }

  logger.warn("Arca return: payment not applied", {
    token,
    arcaOrderId,
    reason: outcome.reason,
  });
  redirectUrl.searchParams.set("payment", "failed");
  return NextResponse.redirect(redirectUrl);
}
