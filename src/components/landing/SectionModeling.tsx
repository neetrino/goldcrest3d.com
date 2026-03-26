import { LANDING_SECTION_IDS } from "@/constants";
import type { LandingModelingMedia } from "@/lib/site-media/get-landing-site-media";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";
import {
  ModelingSpecializationTitle,
  ModelingBlockHipHop,
  ModelingBlockBridal,
  ModelingBlockHighJewelry,
  ModelingBlockMechanical,
  ModelingBlockPortrait,
  ModelingBlockHeritage,
} from "./modeling";

/** Fixed height of the Modeling Specialization title block — block does not resize with content. */
const MODELING_TITLE_BLOCK_HEIGHT_PX = 200;

type SectionModelingProps = {
  modeling: LandingModelingMedia;
};

/**
 * Modeling Specialization section. 2×3 grid — քարտերը լրիվ սյուն, aspect 83/43, փոքր gap, սուր անկյուններ.
 */
export function SectionModeling({ modeling }: SectionModelingProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-3 py-6 md:px-5 md:py-[67px]"
      aria-labelledby="modeling-specialization"
    >
      <div className="mx-auto max-w-[1920px]">
        <div
          className="flex w-full min-w-0 flex-col items-center justify-center overflow-visible md:overflow-hidden"
          style={{ height: `${MODELING_TITLE_BLOCK_HEIGHT_PX}px` }}
        >
          <ModelingSpecializationTitle />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-2.5 lg:gap-2">
          <ModelingBlockHipHop imageUrl={modeling[MODELING_SLOT_KEYS.HIP_HOP]} />
          <ModelingBlockBridal imageUrl={modeling[MODELING_SLOT_KEYS.BRIDAL]} />
          <ModelingBlockPortrait imageUrl={modeling[MODELING_SLOT_KEYS.PORTRAIT]} />
          <ModelingBlockMechanical imageUrl={modeling[MODELING_SLOT_KEYS.MECHANICAL]} />
          <ModelingBlockHeritage imageUrl={modeling[MODELING_SLOT_KEYS.HERITAGE]} />
          <ModelingBlockHighJewelry imageUrl={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY]} />
        </div>
      </div>
    </section>
  );
}
