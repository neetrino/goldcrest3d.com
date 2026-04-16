import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  DEFAULT_IMAGE_FRAMING,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

type HeroFramingByViewport = {
  desktop: ImageFraming | null;
  mobile: ImageFraming | null;
};

/**
 * Resolves independent hero framing values per viewport.
 * Each viewport requires its own custom upload key to activate custom framing behavior.
 */
export function resolveCustomHeroFramingByViewport(
  copy: PowerBannerCopyEntry,
): HeroFramingByViewport {
  return {
    desktop: copy.heroImageR2Key
      ? copy.heroImageFraming ?? DEFAULT_IMAGE_FRAMING
      : null,
    mobile: copy.heroImageMobileR2Key
      ? copy.heroImageFramingMobile ?? DEFAULT_IMAGE_FRAMING
      : null,
  };
}
