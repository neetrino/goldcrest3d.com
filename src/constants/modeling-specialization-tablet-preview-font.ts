/** Admin Media Manager + landing: tablet tier (640px–1023px) modeling card copy. */
export const MODELING_TABLET_PREVIEW_TITLE_FONT_PX_DEFAULT = 32;
export const MODELING_TABLET_PREVIEW_BODY_FONT_PX_DEFAULT = 14;

export const MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MIN = 10;
export const MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MAX = 48;

export const MODELING_TABLET_PREVIEW_BODY_FONT_PX_MIN = 8;
export const MODELING_TABLET_PREVIEW_BODY_FONT_PX_MAX = 24;

export function clampModelingTabletPreviewTitleFontPx(value: number): number {
  return Math.min(
    MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MAX,
    Math.max(MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MIN, Math.round(value)),
  );
}

export function clampModelingTabletPreviewBodyFontPx(value: number): number {
  return Math.min(
    MODELING_TABLET_PREVIEW_BODY_FONT_PX_MAX,
    Math.max(MODELING_TABLET_PREVIEW_BODY_FONT_PX_MIN, Math.round(value)),
  );
}
