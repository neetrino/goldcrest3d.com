import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getManufacturingIntelligenceCopyBundle } from "@/lib/manufacturing-intelligence-copy/get-manufacturing-intelligence-copy";
import { getManufacturingSpecializationItemsResolved } from "@/lib/manufacturing-specialization-items/get-manufacturing-specialization-items";
import { getModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/get-modeling-slot-copy";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import { getFounderSectionEntry } from "@/lib/founder-section/get-founder-section";

export default async function Home() {
  const [
    siteMedia,
    powerBannerCopy,
    modelingSlotCopy,
    manufacturingIntelligenceCopy,
    manufacturingSpecializationItems,
    founderSection,
  ] = await Promise.all([
    getLandingSiteMedia(),
    getPowerBannerCopyBundle(),
    getModelingSlotCopyBundle(),
    getManufacturingIntelligenceCopyBundle(),
    getManufacturingSpecializationItemsResolved(),
    getFounderSectionEntry(),
  ]);
  return (
    <>
      <LandingNav />
      <main className="min-h-screen pt-[length:var(--landing-nav-height)]">
        <LandingSections
          siteMedia={siteMedia}
          powerBannerCopy={powerBannerCopy}
          modelingSlotCopy={modelingSlotCopy}
          manufacturingIntelligenceCopy={manufacturingIntelligenceCopy}
          manufacturingSpecializationItems={manufacturingSpecializationItems}
          founderSection={founderSection}
        />
      </main>
    </>
  );
}
