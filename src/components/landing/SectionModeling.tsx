import { LANDING_SECTION_IDS } from "@/constants";
import { toCopyLines } from "@/lib/modeling-specialization-copy/normalize-modeling-specialization-copy";
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
  isAndroidViewport: boolean;
};

/**
 * Modeling Specialization section. 2×3 grid — քարտերը լրիվ սյուն, aspect 83/43, փոքր gap, սուր անկյուններ.
 */
export function SectionModeling({
  modeling,
  isAndroidViewport,
}: SectionModelingProps) {
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
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].mobile}
            imageUrlTablet={modeling[MODELING_SLOT_KEYS.HIP_HOP].tablet}
            titleDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleMobile}
            titleTablet={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleTablet}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleMobileOffsetY}
            titleTabletOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].titleTabletOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyMobile,
            )}
            descriptionLinesTablet={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyTablet,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyMobileOffsetY}
            bodyTabletOffsetY={modeling[MODELING_SLOT_KEYS.HIP_HOP].bodyTabletOffsetY}
          />
          <ModelingBlockBridal
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].mobile}
            imageUrlTablet={modeling[MODELING_SLOT_KEYS.BRIDAL].tablet}
            titleDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].titleMobile}
            titleTablet={modeling[MODELING_SLOT_KEYS.BRIDAL].titleTablet}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].titleMobileOffsetY}
            titleTabletOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].titleTabletOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.BRIDAL].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.BRIDAL].bodyMobile,
            )}
            descriptionLinesTablet={toCopyLines(
              modeling[MODELING_SLOT_KEYS.BRIDAL].bodyTablet,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].bodyMobileOffsetY}
            bodyTabletOffsetY={modeling[MODELING_SLOT_KEYS.BRIDAL].bodyTabletOffsetY}
          />
          <ModelingBlockPortrait
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].mobile}
            titleDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].titleMobile}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.PORTRAIT].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.PORTRAIT].titleMobileOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.PORTRAIT].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.PORTRAIT].bodyMobile,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.PORTRAIT].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.PORTRAIT].bodyMobileOffsetY}
          />
          <ModelingBlockMechanical
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].mobile}
            imageUrlTablet={modeling[MODELING_SLOT_KEYS.MECHANICAL].tablet}
            titleDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleMobile}
            titleTablet={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleTablet}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleMobileOffsetY}
            titleTabletOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].titleTabletOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyMobile,
            )}
            descriptionLinesTablet={toCopyLines(
              modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyTablet,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyMobileOffsetY}
            bodyTabletOffsetY={modeling[MODELING_SLOT_KEYS.MECHANICAL].bodyTabletOffsetY}
            isAndroidViewport={isAndroidViewport}
          />
          <ModelingBlockHeritage
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].mobile}
            imageUrlTablet={modeling[MODELING_SLOT_KEYS.HERITAGE].tablet}
            titleDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].titleMobile}
            titleTablet={modeling[MODELING_SLOT_KEYS.HERITAGE].titleTablet}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].titleMobileOffsetY}
            titleTabletOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].titleTabletOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HERITAGE].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HERITAGE].bodyMobile,
            )}
            descriptionLinesTablet={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HERITAGE].bodyTablet,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].bodyMobileOffsetY}
            bodyTabletOffsetY={modeling[MODELING_SLOT_KEYS.HERITAGE].bodyTabletOffsetY}
          />
          <ModelingBlockHighJewelry
            imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktop}
            imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].mobile}
            imageUrlTablet={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].tablet}
            titleDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleDesktop}
            titleMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleMobile}
            titleTablet={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleTablet}
            titleDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleDesktopOffsetY}
            titleMobileOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleMobileOffsetY}
            titleTabletOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].titleTabletOffsetY}
            descriptionLinesDesktop={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyDesktop,
            )}
            descriptionLinesMobile={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyMobile,
            )}
            descriptionLinesTablet={toCopyLines(
              modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyTablet,
            )}
            bodyDesktopOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyDesktopOffsetY}
            bodyMobileOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyMobileOffsetY}
            bodyTabletOffsetY={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].bodyTabletOffsetY}
            desktopLine1Emphasis={
              modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktopLine1Emphasis
            }
            tabletLine1Emphasis={
              modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].tabletLine1Emphasis
            }
          />
          </div>
        </div>
      </div>
    </section>
  );
}
