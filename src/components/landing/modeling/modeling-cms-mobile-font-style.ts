import type { CSSProperties } from "react";

/** Matches `modeling-cms-mobile-font.css` for viewports below the `md` breakpoint. */
export const MODELING_CMS_MOBILE_BODY_FONT_OVERRIDE_CLASS = "modeling-cms-mobile-body-font-override";

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

export function mergeCssProperties(
  base: CSSProperties,
  extra: CSSProperties | undefined,
): CSSProperties {
  return extra == null ? base : { ...base, ...extra };
}
