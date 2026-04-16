import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { ImageFraming } from "@/lib/site-media/image-framing";

type HeroFramingByViewport = {
  desktop: ImageFraming | null;
  mobile: ImageFraming | null;
};

/** Resolves independent hero framing values per viewport. */
export function resolveCustomHeroFramingByViewport(
  copy: PowerBannerCopyEntry,
): HeroFramingByViewport {
  return {
    desktop: copy.heroImageFraming,
    mobile: copy.heroImageFramingMobile,
  };
}
