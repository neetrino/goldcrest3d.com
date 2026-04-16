import type { CSSProperties } from "react";

import type { PowerBannerMobileHeroTextLayout } from "@/lib/power-banner-copy/power-banner-mobile-hero-text-layout";

/** Reference body/description size — CTA `fontSizePx` is scaled relative to this (16 ≈ 100%). */
const POWER_BANNER_MOBILE_HERO_CTA_SCALE_REFERENCE_PX = 16;
const POWER_BANNER_MOBILE_HERO_CTA_SCALE_MIN = 0.55;
const POWER_BANNER_MOBILE_HERO_CTA_SCALE_MAX = 1.4;

type TextLayer = PowerBannerMobileHeroTextLayout["title"];

/** Positions a layer by center anchor inside the mobile hero padded frame (percent of the frame). */
export function getPowerBannerMobileHeroTextPositionStyle(layer: TextLayer): CSSProperties {
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: "translate(-50%, -50%)",
  };
}

/** CTA: same anchor + uniform scale from saved `fontSizePx` (slider). */
export function getPowerBannerMobileHeroCtaLayerStyle(layer: PowerBannerMobileHeroTextLayout["cta"]): CSSProperties {
  const scaleRaw = layer.fontSizePx / POWER_BANNER_MOBILE_HERO_CTA_SCALE_REFERENCE_PX;
  const scale = Math.min(
    POWER_BANNER_MOBILE_HERO_CTA_SCALE_MAX,
    Math.max(POWER_BANNER_MOBILE_HERO_CTA_SCALE_MIN, scaleRaw),
  );
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center center",
  };
}

/** Inner padding for the coordinate space — must match Admin preview and live overlay. */
export const POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS = "px-6 pt-16 pb-16";

export const POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS = "w-max max-w-none overflow-visible";
