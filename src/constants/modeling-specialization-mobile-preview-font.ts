/** Admin Media Manager — “Live position preview” mobile column only; not used on the public site. */
export const MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_DEFAULT = 16;
export const MODELING_MOBILE_PREVIEW_BODY_FONT_PX_DEFAULT = 14;

export const MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN = 4;
export const MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX = 28;

export const MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN = 4;
export const MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX = 22;

export function clampModelingMobilePreviewTitleFontPx(value: number): number {
  return Math.min(
    MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX,
    Math.max(MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN, Math.round(value)),
  );
}

export function clampModelingMobilePreviewBodyFontPx(value: number): number {
  return Math.min(
    MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX,
    Math.max(MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN, Math.round(value)),
  );
}
