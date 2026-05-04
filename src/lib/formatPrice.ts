/**
 * Format a whole-unit amount for display (same integer scale as DB `priceCents` / `paidCents`).
 * Uses a dollar sign; numeric value is unchanged.
 */
export function formatPrice(amountWholeUnits: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amountWholeUnits));
}
