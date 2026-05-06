import type { CSSProperties } from "react";

import {
  MODELING_MOBILE_ASPECT_HEIGHT,
  MODELING_MOBILE_ASPECT_WIDTH,
} from "@/lib/site-media/modeling-mobile-image.constants";

/**
 * Քարտի հարաբերակցություն (լայնություն / բարձրություն).
 * Լայն սյունում (~1000px) բարձրությունը ≈518px.
 */
export const MODELING_CARD_ASPECT_RATIO = "83 / 43";

/** Mobile (< sm): Figma ֆիքս չափ — grid-ը մեկ սյուն է (server mobile uploads crop to this aspect). */
export const MODELING_CARD_MOBILE_WIDTH_PX = MODELING_MOBILE_ASPECT_WIDTH;
export const MODELING_CARD_MOBILE_HEIGHT_PX = MODELING_MOBILE_ASPECT_HEIGHT;

/**
 * Portrait overlay X shift for **max-sm only** (~45% of 360px Figma card). Tablet/desktop use vw/`--ms` again in `ModelingCardFullBleed`.
 * Keep in sync with `max-sm:-translate-x-[162px]`.
 */
export const MODELING_PORTRAIT_OVERLAY_SHIFT_X_MOBILE_PX = 162;

/**
 * Article shell: below `sm`, keep a solid min width so grid/flex cannot squash the card.
 *
 * **Tailwind:** arbitrary utilities must appear as complete literals in source (no `${px}` interpolation),
 * otherwise the compiler will not emit the classes. Keep `360` in sync with `MODELING_MOBILE_ASPECT_WIDTH`.
 */
export const MODELING_CARD_ARTICLE_SHELL_CLASSES =
  "relative overflow-hidden max-sm:min-w-[360px] sm:min-w-0" as const;

/**
 * Card frame — mobile: fixed Figma width + min-height fallback (content is absolutely positioned; avoids 0-height rows).
 * sm+: full grid column (flush with sibling columns; small grid gap only).
 *
 * **Tailwind:** literal `360`, `259` in class strings (see `MODELING_CARD_ARTICLE_SHELL_CLASSES` note).
 */
export const MODELING_CARD_FRAME_MOBILE_CLASSES =
  "min-h-0 max-sm:mx-auto max-sm:w-[360px] max-sm:max-w-none max-sm:shrink-0 max-sm:min-h-[259px] aspect-[360/259] sm:mx-0 sm:h-auto sm:w-full sm:max-w-none sm:aspect-[83/43]" as const;

/** Քարտը լրիվ լցնում է grid-ի սյունը — ավելի մեծ և ավելի մոտ իրար block-ներ։ */
export function getModelingCardWidthStyle(): Pick<CSSProperties, "width"> {
  return { width: "100%" };
}

/** CMS copy offsets: integer % of the element’s own box, scaled with section `--ms` (matches ModelingCardFullBleed). */
export function modelingCopyTranslatePercent(offsetXPct: number, offsetYPct: number): string {
  return `translateX(calc(${offsetXPct} * 1% * var(--ms,1))) translateY(calc(${offsetYPct} * 1% * var(--ms,1)))`;
}

function linesHaveContent(lines: readonly string[]): boolean {
  return lines.some((l) => l.trim().length > 0);
}

/**
 * Large-viewport body lines when desktop rows are empty (e.g. only tablet tier filled in CMS).
 * Order: desktop → tablet → mobile. Desktop typography/offsets stay unchanged; only the string source varies.
 */
export function modelingBodyLinesForLgViewport(
  linesDesktop: readonly string[],
  linesTablet: readonly string[],
  linesMobile: readonly string[],
): string[] {
  if (linesHaveContent(linesDesktop)) return [...linesDesktop];
  if (linesHaveContent(linesTablet)) return [...linesTablet];
  return [...linesMobile];
}

/**
 * Large-viewport title when `titleDesktop` is empty. Order: desktop → tablet → mobile.
 */
export function modelingTitleForLgViewport(
  titleDesktop: string,
  titleTablet: string,
  titleMobile: string,
): string {
  const d = titleDesktop.trim();
  if (d.length > 0) return titleDesktop;
  const t = titleTablet.trim();
  if (t.length > 0) return titleTablet;
  return titleMobile.trim();
}
