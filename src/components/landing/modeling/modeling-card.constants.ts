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
 * `max-w-full` — նեղ էկրաններում լայնությունը չի անցնի սյունը։
 * sm+ — լրիվ լայնություն + aspect (նախկին վարք)։
 */
export const MODELING_CARD_FRAME_MOBILE_CLASSES =
  "mx-auto max-w-full h-[259px] w-[360px] sm:mx-0 sm:h-auto sm:w-full sm:aspect-[83/43]" as const;

/** Քարտը լրիվ լցնում է grid-ի սյունը — ավելի մեծ և ավելի մոտ իրար block-ներ։ */
export function getModelingCardWidthStyle(): Pick<CSSProperties, "width"> {
  return { width: "100%" };
}
