import { LANDING_IMAGES } from "@/constants/landing-assets";

import type { PowerBannerKey } from "./power-banner-keys";

/** Canonical desktop hero assets when no custom upload exists. */
export const HERO_BANNER_DEFAULT_DESKTOP: Record<PowerBannerKey, string> = {
  MODELING: LANDING_IMAGES.heroModeling,
  RENDERING: LANDING_IMAGES.heroRendering,
  DESIGN: LANDING_IMAGES.heroDesign,
};

/**
 * Art-directed mobile crops when no custom upload exists.
 * When a custom image is set, the same URL is used on mobile and desktop (`object-cover`).
 */
export const HERO_BANNER_DEFAULT_MOBILE: Record<PowerBannerKey, string> = {
  MODELING: "/images/modeling/block1-mobile.png",
  RENDERING: "/images/rendering/block2-mobile.png",
  DESIGN: "/images/design/block3-mobile-original.png",
};
