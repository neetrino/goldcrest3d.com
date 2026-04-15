import { parseImageFramingJson } from "@/lib/site-media/image-framing";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";

import type { FounderSectionEntry } from "./founder-section.types";

type Resolved = Pick<
  FounderSectionEntry,
  "customImageDisplayUrl" | "heroImageR2Key" | "heroImageFraming"
>;

export function resolveFounderSectionImageFields(
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
