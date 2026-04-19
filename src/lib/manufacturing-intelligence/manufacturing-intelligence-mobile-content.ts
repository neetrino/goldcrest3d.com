import {
  MANUFACTURING_SPECIALIZATION_ITEMS,
  type ManufacturingSpecializationId,
} from "@/constants/manufacturing-specialization";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";
import type { SiteMediaItemRow } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { getManufacturingIntelligenceMobileDefaultCopyMap } from "../manufacturing-intelligence-copy/get-manufacturing-intelligence-mobile-default-copy";
import {
  getManufacturingMobileItemDescriptionKey,
  getManufacturingMobileItemTitleKey,
  MANUFACTURING_MOBILE_SECTION_COPY_KEYS,
} from "../manufacturing-intelligence-copy/manufacturing-intelligence-mobile-copy.keys";
import {
  DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
  parseManufacturingImageTransformFromLayoutMeta,
} from "./manufacturing-image-transform";
import type {
  ManufacturingIntelligenceContent,
  ManufacturingIntelligenceItemContent,
} from "./manufacturing-intelligence.types";

type ManufacturingMobileCopyRow = {
  key: string;
  value: string;
};

export function getManufacturingMobileMediaSlotId(itemId: string): string {
  return `manufacturing-mobile:${itemId}`;
}

export function buildManufacturingIntelligenceMobileContent(
  copyRows: ManufacturingMobileCopyRow[],
  mediaRows: SiteMediaItemRow[],
): ManufacturingIntelligenceContent {
  const defaultCopyMap = getManufacturingIntelligenceMobileDefaultCopyMap();
  const copyMap = new Map(defaultCopyMap);
  for (const row of copyRows) {
    copyMap.set(row.key, row.value);
  }

  const mediaById = new Map(
    mediaRows
      .filter((row) => row.sectionKey === SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE_MOBILE)
      .map((row) => [
        row.slotId.replace(/^manufacturing-mobile:/, "") as ManufacturingSpecializationId,
        row,
      ]),
  );

  const items: ManufacturingIntelligenceItemContent[] = MANUFACTURING_SPECIALIZATION_ITEMS.map(
    (item) => {
      const media = mediaById.get(item.id);
      const dbImageUrl = media?.r2ObjectKey ? resolveSiteMediaDisplayUrl(media.r2ObjectKey) : null;
      return {
        id: item.id,
        title: copyMap.get(getManufacturingMobileItemTitleKey(item.id)) ?? item.title,
        description:
          copyMap.get(getManufacturingMobileItemDescriptionKey(item.id)) ?? item.description ?? "",
        imageAlt:
          media?.alt ??
          copyMap.get(MANUFACTURING_MOBILE_SECTION_COPY_KEYS.IMAGE_ALT) ??
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
      copyMap.get(MANUFACTURING_MOBILE_SECTION_COPY_KEYS.HEADING) ??
      "Manufacturing Intelligence",
    headingMobile:
      copyMap.get(MANUFACTURING_MOBILE_SECTION_COPY_KEYS.HEADING) ??
      "Manufacturing Intelligence",
    items,
  };
}
