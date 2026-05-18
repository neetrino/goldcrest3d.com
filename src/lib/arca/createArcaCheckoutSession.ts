import { getAppOrigin, getOrderPaymentUrl } from "@/lib/appUrl";
import { arcaRegisterOrder, isArcaApiSuccess } from "@/lib/arca/client";
import { getArcaConfig } from "@/lib/arca/config";
import { formatArcaApiError } from "@/lib/arca/errors";
import { buildArcaMerchantOrderNumber } from "@/lib/arca/merchantOrderNumber";
import { prisma } from "@/lib/db";
import { MIN_CHARGE_MINOR_UNITS } from "@/lib/money";
import type { CreateCheckoutSessionResult } from "@/lib/payment/checkout-result";

export type OrderForArcaCheckout = {
  id: string;
  token: string;
  productTitle: string;
  paymentType: string;
};

/**
 * Registers an order with Arca/iPay and returns the hosted payment page URL.
 */
export async function createArcaCheckoutSession(
  order: OrderForArcaCheckout,
  amountMinor: number,
  amountMinorExpected: number,
  paymentIndex?: 0 | 1,
  pageView: "DESKTOP" | "MOBILE" = "DESKTOP",
): Promise<CreateCheckoutSessionResult> {
  const config = getArcaConfig();
  if (!config) {
    return {
      success: false,
      error:
        "Arca is not configured (set ARCA_API_USERNAME and ARCA_API_PASSWORD).",
    };
  }

  if (
    amountMinor < MIN_CHARGE_MINOR_UNITS ||
    amountMinorExpected < MIN_CHARGE_MINOR_UNITS
  ) {
    return { success: false, error: "Amount must be at least $0.01." };
  }

  const orderPageUrl = getOrderPaymentUrl(order.token);
  if (!orderPageUrl) {
    return { success: false, error: "Site URL is not configured (AUTH_URL)." };
  }

  const origin = getAppOrigin();
  if (!origin) {
    return { success: false, error: "Site URL is not configured (AUTH_URL)." };
  }

  const tokenQuery = `token=${encodeURIComponent(order.token)}`;
  const returnUrl = `${origin}/api/payments/arca/return?${tokenQuery}`;
  const failUrl = `${origin}/api/payments/arca/return?${tokenQuery}&payment=failed`;
  const merchantOrderNumber = buildArcaMerchantOrderNumber(order.id, paymentIndex);

  const label =
    order.paymentType === "SPLIT" && paymentIndex !== undefined
      ? paymentIndex === 0
        ? "First 50%"
        : "Second 50%"
      : order.productTitle;

  try {
    const body = await arcaRegisterOrder(config, {
      orderNumber: merchantOrderNumber,
      amountMinor,
      returnUrl,
      failUrl,
      description: label,
      pageView,
    });

    if (!isArcaApiSuccess(body.errorCode)) {
      return {
        success: false,
        error: formatArcaApiError(body.errorCode, body.errorMessage),
      };
    }

    const arcaOrderId = body.orderId?.trim();
    const formUrl = body.formUrl?.trim();
    if (!arcaOrderId || !formUrl) {
      return { success: false, error: "Arca did not return a payment URL." };
    }

    await prisma.arcaPayment.create({
      data: {
        arcaOrderId,
        orderId: order.id,
        merchantOrderNumber,
        paymentIndex: paymentIndex ?? null,
        amountWholeExpected: amountMinorExpected,
      },
    });

    return { success: true, url: formUrl };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Arca payment error.";
    return { success: false, error: message };
  }
}
