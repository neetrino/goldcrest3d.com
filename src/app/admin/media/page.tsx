import { getManufacturingIntelligenceCopyBundle } from "@/lib/manufacturing-intelligence-copy/get-manufacturing-intelligence-copy";
import { getManufacturingSpecializationItemsAdmin } from "@/lib/manufacturing-specialization-items/get-manufacturing-specialization-items";
import { getModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/get-modeling-slot-copy";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getSiteMediaAdminBundle } from "@/lib/site-media/get-site-media-admin";

import { MediaManagerClient } from "./MediaManagerClient";

export default async function AdminMediaPage() {
  const [
    bundle,
    powerBannerCopy,
    modelingSlotCopy,
    manufacturingIntelligenceCopy,
    manufacturingSpecializationItems,
  ] = await Promise.all([
    getSiteMediaAdminBundle(),
    getPowerBannerCopyBundle(),
    getModelingSlotCopyBundle(),
    getManufacturingIntelligenceCopyBundle(),
    getManufacturingSpecializationItemsAdmin(),
  ]);

  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4 py-8 sm:px-6">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Site content
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Media Manager
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Upload and organize images that appear on the public site. Pick a file, confirm the
          preview, and you&apos;re done — updates apply as soon as each upload succeeds.
        </p>
      </header>
      <MediaManagerClient
        bundle={bundle}
        powerBannerCopy={powerBannerCopy}
        modelingSlotCopy={modelingSlotCopy}
        manufacturingIntelligenceCopy={manufacturingIntelligenceCopy}
        manufacturingSpecializationItems={manufacturingSpecializationItems}
      />
    </div>
  );
}
