/**
 * Format price stored in cents for display in AMD.
 */
export function formatPriceAmd(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(cents / 100));
}
