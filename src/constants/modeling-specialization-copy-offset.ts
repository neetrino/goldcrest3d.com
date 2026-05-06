/**
 * Wide % range for tablet copy offsets and for desktop/mobile vertical offsets
 * (translate X/Y as `calc(n * 1% * var(--ms))` of the text box).
 */
export const MODELING_TABLET_COPY_OFFSET_MIN_PCT = -10_000;
export const MODELING_TABLET_COPY_OFFSET_MAX_PCT = 10_000;
/** Medium nudge in admin (percentage points). */
export const MODELING_TABLET_COPY_OFFSET_COARSE_NUDGE_PCT = 25;
/** Large nudge in admin (percentage points). */
export const MODELING_TABLET_COPY_OFFSET_XL_NUDGE_PCT = 100;

/** Admin fine step for desktop/mobile vertical offsets (same as horizontal fine step). */
export const MODELING_COPY_OFFSET_NUDGE_PCT = 1;

/** Desktop/mobile title+body vertical — same clamp as tablet/X (admins need headroom past ±100). */
export const MODELING_COPY_OFFSET_Y_MIN_PCT = MODELING_TABLET_COPY_OFFSET_MIN_PCT;
export const MODELING_COPY_OFFSET_Y_MAX_PCT = MODELING_TABLET_COPY_OFFSET_MAX_PCT;

export function clampModelingTabletCopyOffset(value: number): number {
  return Math.min(
    MODELING_TABLET_COPY_OFFSET_MAX_PCT,
    Math.max(MODELING_TABLET_COPY_OFFSET_MIN_PCT, Math.round(value)),
  );
}

export function clampModelingCopyOffset(value: number): number {
  return clampModelingTabletCopyOffset(value);
}
