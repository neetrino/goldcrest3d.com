import { LANDING_SECTION_IDS } from "@/constants";
import type { ManufacturingSpecializationItem } from "@/constants/manufacturing-specialization";
import type { ManufacturingIntelligenceCopyEntry } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.types";
import type { ModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import type { FounderSectionEntry } from "@/lib/founder-section/founder-section.types";
import { LandingFooter } from "./LandingFooter";
import { PowerBanners } from "./PowerBanners";
import { SectionFinishedCreations } from "./SectionFinishedCreations";
import { SectionFounder } from "./SectionFounder";
import { SectionManufacturing } from "./SectionManufacturing";
import { SectionModeling } from "./SectionModeling";
import { SectionPhilosophy } from "./SectionPhilosophy";
import { SectionProcess } from "./SectionProcess";
import { SectionQuote } from "./SectionQuote";

type LandingSectionsProps = {
  siteMedia: LandingSiteMedia;
  powerBannerCopy: PowerBannerCopyBundle;
  modelingSlotCopy: ModelingSlotCopyBundle;
  manufacturingIntelligenceCopy: ManufacturingIntelligenceCopyEntry;
  manufacturingSpecializationItems: ManufacturingSpecializationItem[];
  founderSection: FounderSectionEntry;
};

export function LandingSections({
  siteMedia,
  powerBannerCopy,
  modelingSlotCopy,
  manufacturingIntelligenceCopy,
  manufacturingSpecializationItems,
  founderSection,
}: LandingSectionsProps) {
  return (
    <>
      <PowerBanners powerBannerCopy={powerBannerCopy} />

      <SectionPhilosophy />

      <SectionModeling modeling={siteMedia.modeling} modelingSlotCopy={modelingSlotCopy} />

      <SectionManufacturing
        copy={manufacturingIntelligenceCopy}
        specializationItems={manufacturingSpecializationItems}
      />

      <SectionFounder founder={founderSection} />

      <SectionFinishedCreations
        row1={siteMedia.finished.row1}
        row2={siteMedia.finished.row2}
      />

      <SectionProcess />

      <SectionQuote />

      <footer id={LANDING_SECTION_IDS.FOOTER}>
        <LandingFooter />
      </footer>
    </>
  );
}
