import { parseImageFramingJson } from "@/lib/site-media/image-framing";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";

import type { ManufacturingIntelligenceCopyEntry } from "./manufacturing-intelligence-copy.types";

type Resolved = Pick<
  ManufacturingIntelligenceCopyEntry,
  "customImageDisplayUrl" | "heroImageR2Key" | "heroImageFraming"
>;

/**
 * Resolves the optional custom Manufacturing Intelligence image from an R2 object key.
 * When the key is set but the public URL cannot be built, the homepage falls back to
 * built-in accordion imagery while `heroImageR2Key` still reflects storage for admin.
 */
export function resolveManufacturingIntelligenceImageFields(
  r2ObjectKey: string | null | undefined,
  heroImageLayout: unknown | null | undefined,
): Resolved {
  const heroImageFraming = parseImageFramingJson(heroImageLayout);
  if (!r2ObjectKey) {
    return {
      customImageDisplayUrl: null,
      heroImageR2Key: null,
      heroImageFraming: null,
    };
  }
  const url = resolveSiteMediaDisplayUrl(r2ObjectKey);
  if (!url) {
    return {
      customImageDisplayUrl: null,
      heroImageR2Key: r2ObjectKey,
      heroImageFraming,
    };
  }
  return {
    customImageDisplayUrl: url,
    heroImageR2Key: r2ObjectKey,
    heroImageFraming,
  };
}
