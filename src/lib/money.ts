import { PAYMENT_MINOR_UNITS_PER_MAJOR_UNIT } from "@/constants/order-form";

/** Smallest chargeable amount in minor units (USD: 1 cent). */
export const MIN_CHARGE_MINOR_UNITS = 1;

/** Minimum order total for 50/50 split (two non-zero halves). */
export const MIN_SPLIT_ORDER_MINOR_UNITS = 2;

/** Admin-entered dollars → DB minor units (`priceCents` / `paidCents`). */
export function dollarsToMinorUnits(dollars: number): number {
  return Math.round(dollars * PAYMENT_MINOR_UNITS_PER_MAJOR_UNIT);
}

/** DB minor units → dollars for admin forms. */
export function minorUnitsToDollars(minorUnits: number): number {
  return minorUnits / PAYMENT_MINOR_UNITS_PER_MAJOR_UNIT;
}

/** Parse `<input type="number" step="0.01">` from admin order forms. */
export function parseAdminPriceDollars(raw: FormDataEntryValue | null): number {
  if (typeof raw !== "string" || raw.trim() === "") return NaN;
  return Number.parseFloat(raw.trim());
}
