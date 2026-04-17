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
 * Card frame: mobile aspect in narrow containers; wide (container ≥640px) matches desktop 83/43.
 * Uses the section `@container` (`.modeling-specialization-cq`) so Manager2 mobile preview matches
 * a real phone even when the browser window is wide — `sm:` alone would wrongly use desktop layout.
 */
export const MODELING_CARD_FRAME_MOBILE_CLASSES =
  "mx-auto w-full max-w-full min-h-0 aspect-[360/259] @min-[640px]:mx-0 @min-[640px]:h-auto @min-[640px]:w-full @min-[640px]:aspect-[83/43]" as const;

/** Քարտը լրիվ լցնում է grid-ի սյունը — ավելի մեծ և ավելի մոտ իրար block-ներ։ */
export function getModelingCardWidthStyle(): Pick<CSSProperties, "width"> {
  return { width: "100%" };
}
