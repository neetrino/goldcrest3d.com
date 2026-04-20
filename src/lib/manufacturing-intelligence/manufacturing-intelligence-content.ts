import {
  MANUFACTURING_SPECIALIZATION_ITEMS,
  type ManufacturingSpecializationId,
} from "@/constants/manufacturing-specialization";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";
import type { SiteMediaItemRow } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { getManufacturingIntelligenceDefaultCopyMap } from "../manufacturing-intelligence-copy/get-manufacturing-intelligence-default-copy";
import {
  getManufacturingItemDescriptionKey,
  getManufacturingItemTitleKey,
  MANUFACTURING_SECTION_COPY_KEYS,
} from "../manufacturing-intelligence-copy/manufacturing-intelligence-copy.keys";
import {
  DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
  parseManufacturingImageTransformFromLayoutMeta,
} from "./manufacturing-image-transform";
import type {
  ManufacturingIntelligenceContent,
  ManufacturingIntelligenceItemContent,
} from "./manufacturing-intelligence.types";

type ManufacturingCopyRow = {
  key: string;
  value: string;
};

export function buildManufacturingIntelligenceContent(
  copyRows: ManufacturingCopyRow[],
  mediaRows: SiteMediaItemRow[],
): ManufacturingIntelligenceContent {
  const defaultCopyMap = getManufacturingIntelligenceDefaultCopyMap();
  const copyMap = new Map(defaultCopyMap);
  for (const row of copyRows) {
    copyMap.set(row.key, row.value);
  }
  const mediaById = new Map(
    mediaRows
      .filter((row) => row.sectionKey === SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE)
      .map((row) => [row.slotId as ManufacturingSpecializationId, row]),
  );

  const items: ManufacturingIntelligenceItemContent[] = MANUFACTURING_SPECIALIZATION_ITEMS.map(
    (item) => {
      const media = mediaById.get(item.id);
      const dbImageUrl = media?.r2ObjectKey ? resolveSiteMediaDisplayUrl(media.r2ObjectKey) : null;
      return {
        id: item.id,
        title: copyMap.get(getManufacturingItemTitleKey(item.id)) ?? item.title,
        description:
          copyMap.get(getManufacturingItemDescriptionKey(item.id)) ?? item.description ?? "",
        imageAlt:
          media?.alt ??
          copyMap.get(MANUFACTURING_SECTION_COPY_KEYS.IMAGE_ALT) ??
          item.detailImageAlt ??
          "Manufacturing Intelligence section image",
        imageSrc: dbImageUrl ?? item.detailImageSrc ?? "",
        detailPhotoLayout: item.detailPhotoLayout,
        transform: media
          ? parseManufacturingImageTransformFromLayoutMeta(media.layoutMeta)
          : DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
      };
    },
  );

  return {
    headingDesktop:
      copyMap.get(MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP) ??
      "Manufacturing Intelligence",
    headingMobile:
      copyMap.get(MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE) ??
      "Manufacturing Intelligence",
    items,
  };
}
