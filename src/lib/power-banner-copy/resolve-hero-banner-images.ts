import { parseImageFramingJson } from "@/lib/site-media/image-framing";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";

import {
  HERO_BANNER_DEFAULT_DESKTOP,
  HERO_BANNER_DEFAULT_MOBILE,
} from "./hero-banner-image-defaults";
import type { PowerBannerKey } from "./power-banner-keys";
import type { PowerBannerCopyEntry } from "./power-banner-copy.types";

type HeroImageResolved = Pick<
  PowerBannerCopyEntry,
  "desktopBgSrc" | "mobileBgSrc" | "heroImageR2Key" | "heroImageFraming"
>;

/**
 * Resolves public hero image URLs from an optional R2 object key.
 * When a custom key is set but the public URL cannot be built, built-in assets are used for display
 * while `heroImageR2Key` still reflects the stored key for admin UI.
 */
export function resolveHeroBannerImageFields(
  key: PowerBannerKey,
  r2ObjectKey: string | null | undefined,
  heroImageLayout: unknown | null | undefined,
): HeroImageResolved {
  const desktopDefault = HERO_BANNER_DEFAULT_DESKTOP[key];
  const mobileDefault = HERO_BANNER_DEFAULT_MOBILE[key];
  const heroImageFraming = parseImageFramingJson(heroImageLayout);
  if (!r2ObjectKey) {
    return {
      desktopBgSrc: desktopDefault,
      mobileBgSrc: mobileDefault,
      heroImageR2Key: null,
      heroImageFraming: null,
    };
  }
  const url = resolveSiteMediaDisplayUrl(r2ObjectKey);
  if (!url) {
    return {
      desktopBgSrc: desktopDefault,
      mobileBgSrc: mobileDefault,
      heroImageR2Key: r2ObjectKey,
      heroImageFraming,
    };
  }
  return {
    desktopBgSrc: url,
    mobileBgSrc: url,
    heroImageR2Key: r2ObjectKey,
    heroImageFraming,
  };
}
