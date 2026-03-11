import { LANDING_SECTION_IDS } from "@/constants";
import { LandingFooter } from "./LandingFooter";
import { PowerBanners } from "./PowerBanners";
import { SectionFinishedCreations } from "./SectionFinishedCreations";
import { SectionFounder } from "./SectionFounder";
import { SectionManufacturing } from "./SectionManufacturing";
import { SectionModeling } from "./SectionModeling";
import { SectionPhilosophy } from "./SectionPhilosophy";
import { SectionProcess } from "./SectionProcess";
import { SectionQuote } from "./SectionQuote";

export function LandingSections() {
  return (
    <>
      <PowerBanners />

      <SectionPhilosophy />
      <SectionModeling />
      <SectionManufacturing />
      <SectionFounder />
      <SectionFinishedCreations />
      <SectionProcess />
      <SectionQuote />

      <footer id={LANDING_SECTION_IDS.FOOTER}>
        <LandingFooter />
      </footer>
    </>
  );
}
