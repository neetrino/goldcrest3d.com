"use client";

import type { ManufacturingIntelligenceCopyEntry } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.types";
import type { ManufacturingSpecializationItemAdminEntry } from "@/lib/manufacturing-specialization-items/get-manufacturing-specialization-items";
import type { ModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { FinishedCreationsGallery } from "./OrderedGallerySection";
import { ManufacturingIntelligenceSection } from "./ManufacturingIntelligenceSection";
import { ManufacturingSpecializationItemsSection } from "./ManufacturingSpecializationItemsSection";
import { ModelingMediaSection } from "./ModelingMediaSection";
import { PowerBannerCopySection } from "./PowerBannerCopySection";

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
  powerBannerCopy: PowerBannerCopyBundle;
  modelingSlotCopy: ModelingSlotCopyBundle;
  manufacturingIntelligenceCopy: ManufacturingIntelligenceCopyEntry;
  manufacturingSpecializationItems: ManufacturingSpecializationItemAdminEntry[];
};

export function MediaManagerClient({
  bundle,
  powerBannerCopy,
  modelingSlotCopy,
  manufacturingIntelligenceCopy,
  manufacturingSpecializationItems,
}: MediaManagerClientProps) {
  const modelingMeta = bundle.groupsMeta.find(
    (g) => g.key === SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
  );

  return (
    <div className="space-y-10">
      <PowerBannerCopySection bundle={powerBannerCopy} />
      <ModelingMediaSection
        title={modelingMeta?.label ?? "Modeling Specialization"}
        description={
          modelingMeta?.description ??
          "Fixed slots for each Modeling Specialization card."
        }
        slots={bundle.modeling}
        slotCopy={modelingSlotCopy}
      />
      <ManufacturingIntelligenceSection initial={manufacturingIntelligenceCopy} />
      <ManufacturingSpecializationItemsSection items={manufacturingSpecializationItems} />
      <FinishedCreationsGallery row1={bundle.finishedRow1} row2={bundle.finishedRow2} />
    </div>
  );
}
