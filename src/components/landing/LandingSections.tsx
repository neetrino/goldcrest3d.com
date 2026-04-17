import { LANDING_SECTION_IDS } from "@/constants";
import type { ManagedHomeBundle } from "@/lib/managed-home/managed-home-schemas";
import { buildManufacturingItemsForDisplay } from "@/lib/managed-home/build-manufacturing-items";
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
  managedHome: ManagedHomeBundle;
};

export function LandingSections({
  siteMedia,
  powerBannerCopy,
  managedHome,
}: LandingSectionsProps) {
  const manufacturingItems = buildManufacturingItemsForDisplay(
    managedHome.manufacturing,
    siteMedia.manufacturing,
  );

  return (
    <>
      <PowerBanners
        powerBannerCopy={powerBannerCopy}
        hero={siteMedia.hero}
      />

      <SectionPhilosophy content={managedHome.philosophy} />

      <SectionModeling
        modeling={siteMedia.modeling}
        content={managedHome.modeling}
      />

      <SectionManufacturing
        sectionTitle={managedHome.manufacturing.sectionTitle}
        items={manufacturingItems}
      />

      <SectionFounder
        content={managedHome.founder}
        founderPhoto={siteMedia.founderPhoto}
      />

      <SectionFinishedCreations
        row1={siteMedia.finished.row1}
        row2={siteMedia.finished.row2}
      />

      <SectionProcess content={managedHome.process} />

      <SectionQuote />

      <footer id={LANDING_SECTION_IDS.FOOTER}>
        <LandingFooter />
      </footer>
    </>
  );
}
