/**
 * FormData key for admin order product image file upload.
 * Server actions read this key — keep aligned with form `<input name>`.
 */
export const FORM_FIELD_PRODUCT_IMAGE = "productImage";

/**
 * Payment gateway minor units per major unit (e.g. 100 for USD cents).
 * DB `priceCents` / `paidCents` store minor units (e.g. 1 = $0.01).
 */
export const PAYMENT_MINOR_UNITS_PER_MAJOR_UNIT = 100;
