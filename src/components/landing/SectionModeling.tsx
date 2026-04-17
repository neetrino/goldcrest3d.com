import { LANDING_SECTION_IDS } from "@/constants";
import type {
  ModelingPayload,
  ModelingViewportPayload,
} from "@/lib/managed-home/managed-home-schemas";
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
import type { ModelingBlockViewport } from "./modeling/ModelingBlockHipHop";

import "./modeling/modeling-section-scale.css";

type SectionModelingProps = {
  modeling: LandingModelingMedia;
  content: ModelingPayload;
  /**
   * Admin Manager2 only: viewport media queries still use the real window width, so a narrow
   * preview frame does not show the mobile branch. Force which CMS branch is visible.
   */
  previewForceViewport?: "mobile" | "desktop";
};

function SectionModelingGrid({
  modeling,
  viewportPayload,
  viewport,
  emulateMobileChrome,
}: {
  modeling: LandingModelingMedia;
  viewportPayload: ModelingViewportPayload;
  viewport: ModelingBlockViewport;
  emulateMobileChrome: boolean;
}) {
  const cards = viewportPayload.cards;
  return (
    <div className="modeling-specialization-card-text-scale grid min-w-0 grid-cols-1 gap-[calc(0.625rem*var(--ms,1))] @min-[640px]:grid-cols-2 @min-[640px]:gap-[calc(0.5rem*var(--ms,1))]">
        <ModelingBlockHipHop
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIP_HOP].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIP_HOP].mobile}
          managed={cards?.hip_hop}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
        <ModelingBlockBridal
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.BRIDAL].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.BRIDAL].mobile}
          managed={cards?.bridal}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
        <ModelingBlockPortrait
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.PORTRAIT].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.PORTRAIT].mobile}
          managed={cards?.portrait}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
        <ModelingBlockMechanical
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.MECHANICAL].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.MECHANICAL].mobile}
          managed={cards?.mechanical}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
        <ModelingBlockHeritage
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HERITAGE].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.HERITAGE].mobile}
          managed={cards?.heritage}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
        <ModelingBlockHighJewelry
          imageUrlDesktop={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].desktop}
          imageUrlMobile={modeling[MODELING_SLOT_KEYS.HIGH_JEWELRY].mobile}
          managed={cards?.high_jewelry}
          viewport={viewport}
          emulateMobileChrome={emulateMobileChrome}
        />
    </div>
  );
}

/**
 * Modeling Specialization section — separate desktop and mobile copy and images from CMS.
 */
export function SectionModeling({
  modeling,
  content,
  previewForceViewport,
}: SectionModelingProps) {
  const emulateMobileChrome = previewForceViewport === "mobile";

  const mobileGridClass =
    previewForceViewport === "mobile"
      ? "block"
      : previewForceViewport === "desktop"
        ? "hidden"
        : "md:hidden";

  const desktopGridClass =
    previewForceViewport === "mobile"
      ? "hidden"
      : previewForceViewport === "desktop"
        ? "block"
        : "hidden md:block";

  const titleForce =
    previewForceViewport === "mobile" || previewForceViewport === "desktop"
      ? previewForceViewport
      : undefined;

  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className={
        emulateMobileChrome
          ? "bg-white px-3"
          : "bg-white px-3 md:px-5"
      }
      aria-labelledby="modeling-specialization"
    >
      <div className="modeling-specialization-cq @container mx-auto w-full max-w-[1920px]">
        <div className="modeling-specialization-scale py-6 md:pt-[calc(var(--modeling-scale-padding-y-md)*var(--ms,1))] md:pb-[calc(var(--modeling-scale-padding-b-md)*var(--ms,1))]">
          <div
            className={`flex min-h-[calc(140px*var(--ms,1))] w-full min-w-0 flex-col items-center justify-center overflow-visible py-6 md:min-h-[calc(200px*var(--ms,1))] md:justify-center md:overflow-hidden md:py-0 ${previewForceViewport === "mobile" ? "md:min-h-[calc(140px*var(--ms,1))] md:justify-center md:py-6" : ""}`}
          >
            <ModelingSpecializationTitle
              titleMobile={content.mobile.sectionTitle}
              titleDesktop={content.desktop.sectionTitle}
              {...(titleForce != null ? { previewForceViewport: titleForce } : {})}
            />
          </div>
          <div className={mobileGridClass}>
            <SectionModelingGrid
              modeling={modeling}
              viewportPayload={content.mobile}
              viewport="mobile"
              emulateMobileChrome={emulateMobileChrome}
            />
          </div>
          <div className={desktopGridClass}>
            <SectionModelingGrid
              modeling={modeling}
              viewportPayload={content.desktop}
              viewport="desktop"
              emulateMobileChrome={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
