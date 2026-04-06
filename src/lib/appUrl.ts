/**
 * App base URL (origin) for building absolute links (e.g. payment link).
 * Prefer AUTH_URL (Auth.js); on Vercel fall back to VERCEL_URL when unset.
 */

export function getAppOrigin(): string {
  const auth = process.env.AUTH_URL?.trim();
  if (auth) {
    try {
      return new URL(auth).origin;
    } catch {
      return "";
    }
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const normalized = vercel.replace(/\/$/, "");
    const full = normalized.startsWith("http")
      ? normalized
      : `https://${normalized}`;
    try {
      return new URL(full).origin;
    } catch {
      return "";
    }
  }
  return "";
}

/** Full URL for public order payment page. */
export function getOrderPaymentUrl(token: string): string {
  const origin = getAppOrigin();
  if (!origin) return "";
  return `${origin}/order/${token}`;
}
