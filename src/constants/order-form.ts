/**
 * FormData key for admin order product image file upload.
 * Server actions read this key — keep aligned with form `<input name>`.
 */
export const FORM_FIELD_PRODUCT_IMAGE = "productImage";

/**
 * Stripe minor units per major unit for the checkout currency (e.g. 100).
 * DB `priceCents` / `paidCents` store whole major units.
 */
export const STRIPE_MINOR_UNITS_PER_MAJOR_UNIT = 100;
