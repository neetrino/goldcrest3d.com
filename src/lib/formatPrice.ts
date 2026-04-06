/**
 * Format an AMD amount stored as whole drams (integer in DB / UI).
 */
export function formatPriceAmd(amountAmd: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amountAmd));
}
