import type { CSSProperties } from "react";
import { LANDING_IMAGE_IDS } from "@/constants";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  SECTION1_TAIL_MIN_HEIGHT_PX,
} from "./power-banners-layout.constants";
import { ModelingHeroSlideLayers } from "./ModelingHeroSlideLayers";
import { resolveCustomHeroFramingByViewport } from "./resolve-custom-hero-framing";
import { ModelingHeroSlideTextStack } from "./ModelingHeroSlideTextStack";

type ModelingHeroSlideProps = {
  copy: PowerBannerCopyEntry;
};

export function ModelingHeroSlide({ copy }: ModelingHeroSlideProps) {
  const framing = resolveCustomHeroFramingByViewport(copy);

  return (
    <div
      className="power-banners-section1-block shrink-0"
      style={
        {
          ["--section1-tail-min-height" as string]: `${SECTION1_TAIL_MIN_HEIGHT_PX}px`,
        } as CSSProperties
      }
    >
      <div
        className="power-banners-section1-image-strip bg-white"
        data-landing-image={LANDING_IMAGE_IDS.HERO_MODELING}
      >
        <ModelingHeroSlideLayers
          desktopBgSrc={copy.desktopBgSrc}
          mobileBgSrc={copy.mobileBgSrc}
          customDesktopFraming={framing.desktop}
          customMobileFraming={framing.mobile}
        />
        <ModelingHeroSlideTextStack copy={copy} />
      </div>
      <div className="power-banners-section1-tail shrink-0" aria-hidden />
    </div>
  );
}
