/**
 * Temporary mock payment mode — development / staging only.
 * When true: no Stripe API calls for checkout; use simulated payment UI instead.
 * Never enable in production with real business traffic.
 */
export function isMockPaymentEnabled(): boolean {
  return process.env.PAYMENT_MOCK_MODE === "true";
}
