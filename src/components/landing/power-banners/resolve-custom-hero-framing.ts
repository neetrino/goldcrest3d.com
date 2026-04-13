import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  DEFAULT_IMAGE_FRAMING,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

/**
 * When a custom R2 hero image is active, returns the saved framing or defaults.
 * When built-in artwork is used, returns null (call sites keep slide-specific layouts).
 */
export function resolveCustomHeroFraming(
  copy: PowerBannerCopyEntry,
): ImageFraming | null {
  if (!copy.heroImageR2Key) {
    return null;
  }
  return copy.heroImageFraming ?? DEFAULT_IMAGE_FRAMING;
}
