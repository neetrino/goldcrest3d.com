/**
 * Stripe — checkout sessions for order payments (Full 100% or Split 50-50).
 */

import Stripe from "stripe";
import { AMD_MINOR_UNITS_PER_DRAM } from "@/constants/order-form";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { isMockPaymentEnabled } from "@/lib/payment/config";

const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = secretKey ? new Stripe(secretKey) : null;

export type OrderForCheckout = {
  id: string;
  token: string;
  priceCents: number;
  productTitle: string;
  paymentType: string;
  paidCents: number;
};

export type CreateCheckoutSessionResult =
  | { success: true; url: string }
  | { success: false; error: string };

/**
 * Creates a Stripe Checkout Session for an order (full or partial amount).
 * @param order - Order record (id, token, priceCents, productTitle, paymentType, paidCents)
 * @param amountWholeAmd - Amount to charge in whole AMD (Stripe gets minor units)
 * @param paymentIndex - For SPLIT: 0 = first 50%, 1 = second 50%. For FULL: undefined
 */
export async function createCheckoutSession(
  order: OrderForCheckout,
  amountWholeAmd: number,
  paymentIndex?: 0 | 1,
): Promise<CreateCheckoutSessionResult> {
  if (isMockPaymentEnabled()) {
    return {
      success: false,
      error:
        "Stripe checkout is disabled while PAYMENT_MOCK_MODE is enabled. Use the simulated payment page.",
    };
  }
  if (!stripe) {
    return { success: false, error: "Stripe is not configured (STRIPE_SECRET_KEY)." };
  }
  if (amountWholeAmd <= 0) {
    return { success: false, error: "Amount must be greater than 0." };
  }

  const unitAmountMinor = Math.round(amountWholeAmd * AMD_MINOR_UNITS_PER_DRAM);

  const baseUrl = getOrderPaymentUrl(order.token);
  if (!baseUrl) {
    return { success: false, error: "Site URL is not configured (AUTH_URL)." };
  }

  const label =
    order.paymentType === "SPLIT" && paymentIndex !== undefined
      ? paymentIndex === 0
        ? "First 50%"
        : "Second 50%"
      : order.productTitle;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "amd",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "amd",
            unit_amount: unitAmountMinor,
            product_data: {
              name: label,
              description: order.productTitle,
            },
          },
        },
      ],
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        ...(order.paymentType === "SPLIT" && paymentIndex !== undefined && { paymentIndex: String(paymentIndex) }),
      },
      success_url: `${baseUrl}?session_id={CHECKOUT_SESSION_ID}&paid=1`,
      cancel_url: baseUrl,
    });

    const url = session.url ?? null;
    if (!url) {
      return { success: false, error: "Stripe did not return a URL." };
    }
    return { success: true, url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error.";
    return { success: false, error: message };
  }
}
