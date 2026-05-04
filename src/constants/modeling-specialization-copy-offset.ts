/** Stored DB values and admin: desktop/mobile vertical copy offset as CSS translateY % (-500…500). */
export const MODELING_COPY_OFFSET_Y_MIN_PCT = -500;
export const MODELING_COPY_OFFSET_Y_MAX_PCT = 500;
/** Admin Up/Down nudge step (percentage points). */
export const MODELING_COPY_OFFSET_NUDGE_PCT = 1;

/**
 * Tablet-only title/body X+Y offsets: very wide range; CSS uses translate % of the text box
 * (not the card). If this still feels “small” visually, the limit is CSS semantics—not this clamp.
 */
export const MODELING_TABLET_COPY_OFFSET_MIN_PCT = -10_000;
export const MODELING_TABLET_COPY_OFFSET_MAX_PCT = 10_000;
/** Medium nudge in admin (percentage points). */
export const MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT = 25;
/** Large nudge in admin (percentage points). */
export const MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT = 100;

export function clampModelingCopyOffset(value: number): number {
  return Math.min(
    MODELING_COPY_OFFSET_Y_MAX_PCT,
    Math.max(MODELING_COPY_OFFSET_Y_MIN_PCT, Math.round(value)),
  );
}

export function clampModelingTabletCopyOffset(value: number): number {
  return Math.min(
    MODELING_TABLET_COPY_OFFSET_MAX_PCT,
    Math.max(MODELING_TABLET_COPY_OFFSET_MIN_PCT, Math.round(value)),
  );
}
