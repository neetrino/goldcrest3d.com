/**
 * Explicit mock flag — no Stripe API calls; use simulated payment UI only.
 */
export function isMockPaymentEnabled(): boolean {
  return process.env.PAYMENT_MOCK_MODE === "true";
}

/**
 * Stripe secret present and non-empty (trimmed).
 */
export function isStripeSecretConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  return Boolean(key && key.length > 0);
}

/**
 * Use simulated checkout (mock payment page) when mock mode is on, or when Stripe is not configured (demo / production without keys yet).
 */
export function isSimulatedPaymentFlow(): boolean {
  return isMockPaymentEnabled() || !isStripeSecretConfigured();
}
