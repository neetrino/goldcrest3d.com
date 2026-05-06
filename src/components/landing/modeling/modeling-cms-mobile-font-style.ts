import type { CSSProperties } from "react";

/** Matches `modeling-cms-mobile-font.css` for viewports below the `sm` breakpoint (mobile tier). */
export const MODELING_CMS_MOBILE_BODY_FONT_OVERRIDE_CLASS = "modeling-cms-mobile-body-font-override";

/** Matches `modeling-cms-tablet-font.css` for viewports `sm`–below `lg` (640px–1023px). */
export const MODELING_CMS_TABLET_BODY_FONT_OVERRIDE_CLASS = "modeling-cms-tablet-body-font-override";

/** Mobile CMS title size — scales with section `--ms` / `--mt` like fixed Tailwind sizes. */
export function modelingCmsMobileTitleFontStyle(previewTitleFontPx: number): CSSProperties {
  return {
    fontSize: `calc(${previewTitleFontPx}px * var(--ms, 1) * var(--mt, 1))`,
    lineHeight: 1.25,
  };
}

/** Mobile CMS description size — scales with section `--ms` / `--mt`. */
export function modelingCmsMobileBodyFontStyle(previewBodyFontPx: number): CSSProperties {
  return {
    fontSize: `calc(${previewBodyFontPx}px * var(--ms, 1) * var(--mt, 1))`,
    lineHeight: 1.2,
  };
}

/** Tablet CMS title size (640px–1023px) — same scaling as mobile tier. */
export function modelingCmsTabletTitleFontStyle(previewTitleFontPx: number): CSSProperties {
  return modelingCmsMobileTitleFontStyle(previewTitleFontPx);
}

/** Tablet CMS description size — same scaling as mobile tier. */
export function modelingCmsTabletBodyFontStyle(previewBodyFontPx: number): CSSProperties {
  return modelingCmsMobileBodyFontStyle(previewBodyFontPx);
}

export function mergeCssProperties(
  base: CSSProperties,
  extra: CSSProperties | undefined,
): CSSProperties {
  return extra == null ? base : { ...base, ...extra };
}
