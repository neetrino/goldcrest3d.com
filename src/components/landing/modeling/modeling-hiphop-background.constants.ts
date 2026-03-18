import type { CSSProperties } from "react";

/** Figma export — Hip-Hop Jewelry card background layer */
export const MODELING_HIP_HOP_IMAGE_PUBLIC_PATH =
  "/images/modeling/hip-hop.png" as const;

const HIP_HOP_BG_FALLBACK = "lightgray" as const;
const HIP_HOP_BG_POS_X = "-0.04px" as const;
const HIP_HOP_BG_POS_Y = "0px" as const;
const HIP_HOP_BG_SIZE_W = "100.009%" as const;
const HIP_HOP_BG_SIZE_H = "108.485%" as const;

/**
 * Background shorthand matching Figma: url, lightgray, position, size, no-repeat.
 */
export function getModelingHipHopCardBackgroundStyle(): Pick<
  CSSProperties,
  "background"
> {
  return {
    background: `url("${MODELING_HIP_HOP_IMAGE_PUBLIC_PATH}") ${HIP_HOP_BG_FALLBACK} ${HIP_HOP_BG_POS_X} ${HIP_HOP_BG_POS_Y} / ${HIP_HOP_BG_SIZE_W} ${HIP_HOP_BG_SIZE_H} no-repeat`,
  };
}
