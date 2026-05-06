/**
 * CSS class on each modeling card (`modeling-section-scale.css`).
 * Container inline-size drives `--ms` so overlay copy scales with the card column, not the full section width.
 */
export const MODELING_CARD_INLINE_SIZE_CONTAINER_CLASS = "modeling-specialization-card-cq";

/** Inclusive max viewport width (px) for Modeling mobile layout/copy. */
export const MODELING_VIEWPORT_MOBILE_MAX_PX = 754;

/** Min viewport width (px) for Modeling tablet band (with desktop-dominant copy from `lg`). */
export const MODELING_VIEWPORT_TABLET_MIN_PX = MODELING_VIEWPORT_MOBILE_MAX_PX + 1;
