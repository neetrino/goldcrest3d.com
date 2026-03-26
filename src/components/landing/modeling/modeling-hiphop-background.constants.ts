import type { CSSProperties } from "react";

const HIP_HOP_BG_FALLBACK = "lightgray" as const;
const HIP_HOP_BG_POS_X = "-0.04px" as const;
const HIP_HOP_BG_POS_Y = "0px" as const;
const HIP_HOP_BG_SIZE_W = "100.009%" as const;
const HIP_HOP_BG_SIZE_H = "108.485%" as const;

/**
 * Background shorthand matching Figma: url, lightgray, position, size, no-repeat.
 */
export function getModelingHipHopCardBackgroundStyle(
  imageUrl: string,
): Pick<CSSProperties, "background"> {
  return {
    background: `url("${imageUrl}") ${HIP_HOP_BG_FALLBACK} ${HIP_HOP_BG_POS_X} ${HIP_HOP_BG_POS_Y} / ${HIP_HOP_BG_SIZE_W} ${HIP_HOP_BG_SIZE_H} no-repeat`,
  };
}
