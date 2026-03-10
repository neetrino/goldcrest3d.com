/**
 * App base URL (origin) for building absolute links (e.g. payment link).
 * Uses AUTH_URL env.
 */

export function getAppOrigin(): string {
  const url = process.env.AUTH_URL;
  if (!url || typeof url !== "string") return "";
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

/** Full URL for public order payment page. */
export function getOrderPaymentUrl(token: string): string {
  const origin = getAppOrigin();
  if (!origin) return "";
  return `${origin}/order/${token}`;
}
