"use client";

import type { AdminSiteMediaBundle } from "@/lib/site-media/get-site-media-admin";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { FinishedCreationsGallery } from "./OrderedGallerySection";
import { ModelingMediaSection } from "./ModelingMediaSection";

type MediaManagerClientProps = {
  bundle: AdminSiteMediaBundle;
};

export function MediaManagerClient({ bundle }: MediaManagerClientProps) {
  const modelingMeta = bundle.groupsMeta.find(
    (g) => g.key === SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
  );

  return (
    <div className="space-y-10">
      <ModelingMediaSection
        title={modelingMeta?.label ?? "Modeling Specialization"}
        description={
          modelingMeta?.description ??
          "Fixed slots for each Modeling Specialization card."
        }
        slots={bundle.modeling}
      />
      <FinishedCreationsGallery row1={bundle.finishedRow1} row2={bundle.finishedRow2} />
    </div>
  );
}
