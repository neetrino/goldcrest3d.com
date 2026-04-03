import type { CSSProperties } from "react";
import { LANDING_IMAGE_IDS } from "@/constants";
import {
  SECTION2_TEXT_CLUSTER_NUDGE_MD_PX,
  SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX,
} from "./power-banners-layout.constants";
import { RenderingHeroSlideBackgrounds } from "./RenderingHeroSlideBackgrounds";
import { RenderingHeroSlideCopy } from "./RenderingHeroSlideCopy";

type RenderingHeroSlideProps = {
  desktopBgSrc: string;
};

export function RenderingHeroSlide({ desktopBgSrc }: RenderingHeroSlideProps) {
  return (
    <div
      className="power-banners-section2-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_RENDERING}
      style={
        {
          ["--section2-text-cluster-nudge-mobile" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX}px`,
          ["--section2-text-cluster-nudge-md" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_MD_PX}px`,
        } as CSSProperties
      }
    >
      <RenderingHeroSlideBackgrounds desktopBgSrc={desktopBgSrc} />
      <RenderingHeroSlideCopy />
    </div>
  );
}
