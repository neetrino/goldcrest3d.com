import type { CSSProperties } from "react";

/**
 * Քարտի հարաբերակցություն (լայնություն / բարձրություն).
 * Լայն սյունում (~1000px) բարձրությունը ≈518px.
 */
export const MODELING_CARD_ASPECT_RATIO = "83 / 43";

/** Mobile (< sm): Figma ֆիքս չափ — grid-ը մեկ սյուն է։ */
export const MODELING_CARD_MOBILE_WIDTH_PX = 360;
export const MODELING_CARD_MOBILE_HEIGHT_PX = 259;

/**
 * Քարտի արտաքին frame — միայն max-sm.
 * Լայնությունը `w-full` — grid-ի սյունը ամբողջությամբ; բարձրությունը aspect-ից (Figma 360×259)։
 * sm+ — լրիվ լայնություն + 83/43։
 */
export const MODELING_CARD_FRAME_MOBILE_CLASSES =
  "mx-auto w-full max-w-full min-h-0 aspect-[360/259] sm:mx-0 sm:h-auto sm:w-full sm:aspect-[83/43]" as const;

/** Քարտը լրիվ լցնում է grid-ի սյունը — ավելի մեծ և ավելի մոտ իրար block-ներ։ */
export function getModelingCardWidthStyle(): Pick<CSSProperties, "width"> {
  return { width: "100%" };
}
