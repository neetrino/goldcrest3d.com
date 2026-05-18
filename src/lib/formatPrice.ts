import { minorUnitsToDollars } from "@/lib/money";

/**
 * Format DB minor units for display (e.g. 1 → $0.01, 15000 → $150.00).
 */
export function formatPrice(amountMinorUnits: number): string {
  const dollars = minorUnitsToDollars(amountMinorUnits);
  const fractionDigits = Number.isInteger(dollars) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(dollars);
}
