import type { CSSProperties } from "react";

import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";

/**
 * Inline `--hero-*` vars for `.power-banners-fixed-bg-stage` on mobile hero — must match each slide’s
 * `*HeroSlide*Backgrounds` branch when the admin has not set custom image framing.
 */
export function getPowerBannerMobileHeroBgStageInlineStyle(
  bannerKey: PowerBannerKey,
  hasCustomMobileFraming: boolean,
): CSSProperties {
  const base: CSSProperties = {
    ["--hero-bg-min-width" as string]: "390px",
    ["--hero-bg-min-height" as string]: "679px",
  };
  if (hasCustomMobileFraming) {
    return base;
  }
  if (bannerKey === "MODELING") {
    return {
      ...base,
      ["--hero-bg-shift-factor-x" as string]: "-0.08",
    };
  }
  if (bannerKey === "RENDERING") {
    return {
      ...base,
      ["--hero-bg-shift-factor-x" as string]: "-0.1",
      ["--hero-bg-object-position" as string]: "left center",
    };
  }
  return {
    ...base,
    ["--hero-bg-shift-factor-x" as string]: "0.08",
    ["--hero-bg-object-position" as string]: "30% center",
  };
}
