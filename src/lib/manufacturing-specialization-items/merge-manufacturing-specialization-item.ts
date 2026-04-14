import type { ManufacturingSpecializationItem } from "@/constants/manufacturing-specialization";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import {
  DEFAULT_IMAGE_FRAMING,
  parseImageFramingJson,
} from "@/lib/site-media/image-framing";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";

import { plainManufacturingDescriptionToHtml } from "./plain-default-description-html";

type ItemCopyRow = {
  title: string;
  body: string;
  r2ObjectKey: string | null;
  heroImageLayout?: unknown | null;
};

/**
 * Merges a canonical Manufacturing item with optional DB overrides for the public site.
 */
export function mergeManufacturingSpecializationItem(
  base: ManufacturingSpecializationItem,
  row: ItemCopyRow | null | undefined,
): ManufacturingSpecializationItem {
  const title =
    row?.title != null && String(row.title).trim() !== ""
      ? String(row.title).trim()
      : base.title;

  let descriptionHtml: string;
  if (row?.body != null && String(row.body).trim() !== "") {
    descriptionHtml = finalizeHeroBannerBodyHtml(String(row.body));
  } else {
    descriptionHtml = plainManufacturingDescriptionToHtml(base.description);
  }

  const customUrl =
    row?.r2ObjectKey != null && row.r2ObjectKey !== ""
      ? resolveSiteMediaDisplayUrl(row.r2ObjectKey)
      : null;
  const detailImageSrc = customUrl ?? base.detailImageSrc;
  const parsedLayout = parseImageFramingJson(row?.heroImageLayout);
  const detailImageFraming =
    parsedLayout != null
      ? parsedLayout
      : customUrl != null
        ? DEFAULT_IMAGE_FRAMING
        : null;

  return {
    ...base,
    title,
    description: descriptionHtml,
    detailImageSrc,
    detailImageFraming,
  };
}
