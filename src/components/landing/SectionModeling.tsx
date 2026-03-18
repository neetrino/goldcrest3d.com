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
 * Modeling Specialization section. 2×3 grid — քարտերը լրիվ սյուն, aspect 83/43, փոքր gap, սուր անկյուններ.
 */
export function SectionModeling() {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-3 py-[67px] md:px-5 md:py-[67px]"
      aria-labelledby="modeling-heading"
    >
      <div className="mx-auto max-w-[1920px]">
        <ModelingSpecializationTitle />

        <div className="mt-14 grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-2.5 lg:gap-2">
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
