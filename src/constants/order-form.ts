/**
 * FormData key for admin order product image file upload.
 * Server actions read this key — keep aligned with form `<input name>`.
 */
export const FORM_FIELD_PRODUCT_IMAGE = "productImage";

/**
 * Stripe AMD amounts use minor units (1 dram = 100). DB `priceCents` / `paidCents` use whole drams.
 */
export const AMD_MINOR_UNITS_PER_DRAM = 100;
