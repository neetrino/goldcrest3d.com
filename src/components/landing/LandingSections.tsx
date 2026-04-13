import { LANDING_SECTION_IDS } from "@/constants";
import type { ModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
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
};

export function LandingSections({
  siteMedia,
  powerBannerCopy,
  modelingSlotCopy,
}: LandingSectionsProps) {
  return (
    <>
      <PowerBanners powerBannerCopy={powerBannerCopy} />

      <SectionPhilosophy />

      <SectionModeling modeling={siteMedia.modeling} modelingSlotCopy={modelingSlotCopy} />

      <SectionManufacturing />

      <SectionFounder />

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
