import { LANDING_SECTION_IDS } from "@/constants";
import { LandingFooter } from "./LandingFooter";
import { PowerBanners } from "./PowerBanners";
import { SectionDivider } from "./SectionDivider";
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
      <SectionDivider variant="onLight" />

      <SectionPhilosophy />
      <SectionDivider variant="onLight" />

      <SectionModeling />
      <SectionDivider variant="onLight" />

      <SectionManufacturing />
      <SectionDivider variant="onLight" />

      <SectionFounder />
      <SectionDivider variant="onLight" />

      <SectionFinishedCreations />
      <SectionDivider variant="onLight" />

      <SectionProcess />
      <SectionDivider variant="onLight" />

      <SectionQuote />
      <SectionDivider variant="onLight" />

      <footer id={LANDING_SECTION_IDS.FOOTER}>
        <LandingFooter />
      </footer>
    </>
  );
}
