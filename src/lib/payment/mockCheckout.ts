import { getAppOrigin } from "@/lib/appUrl";
import type { CreateCheckoutSessionResult } from "@/lib/stripe";

/**
 * Builds the URL for the dev-only mock checkout page (no external provider).
 */
export function buildMockPaymentPageUrl(
  token: string,
  paymentIndex?: 0 | 1,
): string | null {
  const origin = getAppOrigin();
  if (!origin) return null;
  const base = `${origin}/order/${encodeURIComponent(token)}/mock-payment`;
  if (paymentIndex === 0 || paymentIndex === 1) {
    return `${base}?paymentIndex=${paymentIndex}`;
  }
  return base;
}

/**
 * Returns a redirect URL to the simulated checkout UI (same shape as Stripe session result).
 */
export function createMockCheckoutSession(
  token: string,
  paymentIndex?: 0 | 1,
): CreateCheckoutSessionResult {
  const url = buildMockPaymentPageUrl(token, paymentIndex);
  if (!url) {
    return { success: false, error: "Site URL is not configured (AUTH_URL)." };
  }
  return { success: true, url };
}
