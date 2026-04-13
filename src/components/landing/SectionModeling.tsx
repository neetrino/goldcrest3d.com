import { LANDING_SECTION_IDS } from "@/constants";
import type { ModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
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
  modelingSlotCopy: ModelingSlotCopyBundle;
};

/**
 * Modeling Specialization section. 2×3 grid — քարտերը լրիվ սյուն, aspect 83/43, փոքր gap, սուր անկյուններ.
 */
export function SectionModeling({ modeling, modelingSlotCopy }: SectionModelingProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-3 md:px-5"
      aria-labelledby="modeling-specialization"
    >
      <div className="modeling-specialization-cq mx-auto w-full max-w-[1920px]">
        <div className="modeling-specialization-scale py-6 md:pt-[calc(var(--modeling-scale-padding-y-md)*var(--ms,1))] md:pb-[calc(var(--modeling-scale-padding-b-md)*var(--ms,1))]">
          <div className="flex min-h-[calc(140px*var(--ms,1))] w-full min-w-0 flex-col items-center justify-center overflow-visible py-6 md:min-h-[calc(200px*var(--ms,1))] md:justify-center md:overflow-hidden md:py-0">
            <ModelingSpecializationTitle />
          </div>

          <div className="modeling-specialization-card-text-scale grid min-w-0 grid-cols-1 gap-[calc(0.625rem*var(--ms,1))] sm:grid-cols-2 lg:gap-[calc(0.5rem*var(--ms,1))]">
          <ModelingBlockHipHop
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.HIP_HOP]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].mobileFraming}
          />
          <ModelingBlockBridal
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.BRIDAL]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].mobileFraming}
          />
          <ModelingBlockPortrait
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.PORTRAIT]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].mobileFraming}
          />
          <ModelingBlockMechanical
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.MECHANICAL]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].mobileFraming}
          />
          <ModelingBlockHeritage
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.HERITAGE]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].mobileFraming}
          />
          <ModelingBlockHighJewelry
            copy={modelingSlotCopy[MODELING_SLOT_KEYS.HIGH_JEWELRY]}
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].mobile}
            imageFramingDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktopFraming}
            imageFramingMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].mobileFraming}
          />
          </div>
        </div>
      </div>
    </section>
  );
}
