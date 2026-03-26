import { LANDING_SECTION_IDS } from "@/constants";
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
};

export function LandingSections({ siteMedia }: LandingSectionsProps) {
  return (
    <>
      <PowerBanners />

      <SectionPhilosophy />

      <SectionModeling modeling={siteMedia.modeling} />

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
