import type { CSSProperties } from "react";
import { LANDING_IMAGE_IDS } from "@/constants";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  SECTION1_TAIL_MIN_HEIGHT_PX,
} from "./power-banners-layout.constants";
import { ModelingHeroSlideLayers } from "./ModelingHeroSlideLayers";
import { ModelingHeroSlideTextStack } from "./ModelingHeroSlideTextStack";

type ModelingHeroSlideProps = {
  desktopBgSrc: string;
  mobileBgSrc?: string;
  layoutMeta?: unknown | null;
  copy: PowerBannerCopyEntry;
};

export function ModelingHeroSlide({
  desktopBgSrc,
  mobileBgSrc,
  layoutMeta,
  copy,
}: ModelingHeroSlideProps) {
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
          desktopBgSrc={desktopBgSrc}
          mobileBgSrc={mobileBgSrc}
          layoutMeta={layoutMeta}
        />
        <ModelingHeroSlideTextStack copy={copy} layoutMeta={layoutMeta} />
      </div>
      <div className="power-banners-section1-tail shrink-0" aria-hidden />
    </div>
  );
}
