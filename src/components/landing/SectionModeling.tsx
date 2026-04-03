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

import "./modeling/modeling-section-scale.css";

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
      className="bg-white px-3 md:px-5"
      aria-labelledby="modeling-specialization"
    >
      <div className="modeling-specialization-cq ms-0 me-auto w-full max-w-[1920px]">
        <div className="modeling-specialization-scale py-6 md:py-[calc(67px*var(--ms,1))]">
          <div className="flex min-h-[calc(140px*var(--ms,1))] w-full min-w-0 flex-col items-center justify-center overflow-visible py-6 md:min-h-[calc(200px*var(--ms,1))] md:items-stretch md:justify-center md:overflow-hidden md:py-0">
            <ModelingSpecializationTitle />
          </div>

          <div className="modeling-specialization-card-text-scale grid min-w-0 grid-cols-1 gap-[calc(0.625rem*var(--ms,1))] sm:grid-cols-2 lg:gap-[calc(0.5rem*var(--ms,1))]">
          <ModelingBlockHipHop
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].mobile}
          />
          <ModelingBlockBridal
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].mobile}
          />
          <ModelingBlockPortrait
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].mobile}
          />
          <ModelingBlockMechanical
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].mobile}
          />
          <ModelingBlockHeritage
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].mobile}
          />
          <ModelingBlockHighJewelry
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].mobile}
          />
          </div>
        </div>
      </div>
    </section>
  );
}
