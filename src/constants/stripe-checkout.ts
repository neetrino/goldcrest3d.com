/**
 * Stripe Checkout ISO 4217 code. Must match the connected account and minor-unit rules.
 * Required when Stripe checkout is used (`STRIPE_SECRET_KEY` set).
 */
export function getStripeCheckoutCurrencyIso(): string {
  const iso = process.env.STRIPE_CHECKOUT_CURRENCY_ISO?.trim().toLowerCase();
  if (!iso) {
    throw new Error(
      "STRIPE_CHECKOUT_CURRENCY_ISO is required when using Stripe (set in environment).",
    );
  }
  return iso;
}
