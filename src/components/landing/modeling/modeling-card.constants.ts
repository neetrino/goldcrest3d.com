import type { CSSProperties } from "react";

/**
 * Քարտի հարաբերակցություն (լայնություն / բարձրություն).
 * Լայն սյունում (~1000px) բարձրությունը ≈518px.
 */
export const MODELING_CARD_ASPECT_RATIO = "83 / 43";

/** Քարտը լրիվ լցնում է grid-ի սյունը — ավելի մեծ և ավելի մոտ իրար block-ներ։ */
export function getModelingCardWidthStyle(): Pick<CSSProperties, "width"> {
  return { width: "100%" };
}
