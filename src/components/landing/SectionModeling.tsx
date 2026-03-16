import { LANDING_SECTION_IDS } from "@/constants";
import {
  ModelingSpecializationTitle,
  ModelingBlockHipHop,
  ModelingBlockBridal,
  ModelingBlockHighJewelry,
  ModelingBlockMechanical,
  ModelingBlockPortrait,
  ModelingBlockHeritage,
} from "./modeling";

/**
 * Modeling Specialization section. Figma: title + 2×3 grid of cards (942×495, rounded-16).
 * Each block is a separate component for clear separation.
 */
export function SectionModeling() {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-4 py-[67px] md:px-6 md:py-[67px]"
      aria-labelledby="modeling-heading"
    >
      <div className="mx-auto max-w-[1920px]">
        <ModelingSpecializationTitle />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-[18px]">
          <ModelingBlockHipHop />
          <ModelingBlockBridal />
          <ModelingBlockPortrait />
          <ModelingBlockMechanical />
          <ModelingBlockHeritage />
          <ModelingBlockHighJewelry />
        </div>
      </div>
    </section>
  );
}
