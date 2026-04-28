/** Hero copy text / CTA nudge limits (px); tablet + mobile + desktop rows share this clamp. */
export const POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN = -500;
export const POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX = 500;
export const POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_NUDGE_STEP = 4;

/** Clamps persisted hero copy offsets (px) for admin UI and form submission. */
export function clampPowerBannerCopyOffsetPx(value: number): number {
  const rounded = Number.isFinite(value) ? Math.round(value) : 0;
  return Math.min(
    POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX,
    Math.max(POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN, rounded),
  );
}
