/**
 * Stripe — checkout sessions for order payments (Full 100% or Split 50-50).
 */

import Stripe from "stripe";
import { getOrderPaymentUrl } from "@/lib/appUrl";

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
 * @param amountCents - Amount to charge in this session (e.g. full price or 50%)
 * @param paymentIndex - For SPLIT: 0 = first 50%, 1 = second 50%. For FULL: undefined
 */
export async function createCheckoutSession(
  order: OrderForCheckout,
  amountCents: number,
  paymentIndex?: 0 | 1,
): Promise<CreateCheckoutSessionResult> {
  if (!stripe) {
    return { success: false, error: "Stripe is not configured (STRIPE_SECRET_KEY)." };
  }
  if (amountCents <= 0) {
    return { success: false, error: "Amount must be greater than 0." };
  }

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
            unit_amount: amountCents,
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
