import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";
import type { ManufacturingSpecializationItem } from "@/constants/manufacturing-specialization";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

import type { ManufacturingPayload } from "./managed-home-schemas";

export type ManufacturingItemResolved = ManufacturingSpecializationItem & {
  layoutMeta: unknown | null;
};

export function buildManufacturingItemsForDisplay(
  managed: ManufacturingPayload,
  media: LandingSiteMedia["manufacturing"],
): ManufacturingItemResolved[] {
  return managed.items.map((m) => {
    const staticItem = MANUFACTURING_SPECIALIZATION_ITEMS.find((s) => s.id === m.id);
    const slotMedia = media[m.id];
    const src = slotMedia?.src ?? staticItem?.detailImageSrc ?? "";
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      detailImageSrc: src,
      detailImageAlt: m.detailImageAlt ?? staticItem?.detailImageAlt,
      detailPhotoLayout: staticItem?.detailPhotoLayout,
      layoutMeta: slotMedia?.layoutMeta ?? null,
    };
  });
}
