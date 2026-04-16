import type { CSSProperties } from "react";

import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

/** Positions a layer by center anchor inside the mobile hero padded frame (percent of the frame). */
export function getPowerBannerMobileHeroTextPositionStyle(
  layer: ModelingTextOverlayLayout["title"],
): CSSProperties {
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: "translate(-50%, -50%)",
  };
}

/** Inner padding for the coordinate space — must match Admin preview and live overlay. */
export const POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS = "px-6 pt-16 pb-16";

export const POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS = "w-max max-w-none overflow-visible";
