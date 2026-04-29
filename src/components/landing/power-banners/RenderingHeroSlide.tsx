import type { CSSProperties } from "react";
import { LANDING_IMAGE_IDS } from "@/constants";
import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  SECTION2_TEXT_CLUSTER_NUDGE_MD_PX,
  SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX,
} from "./power-banners-layout.constants";
import { RenderingHeroSlideBackgrounds } from "./RenderingHeroSlideBackgrounds";
import { RenderingHeroSlideCopy } from "./RenderingHeroSlideCopy";

type RenderingHeroSlideProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  tabletBgSrc: string;
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
  tabletCopy: PowerBannerCopyEntry;
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
  tabletTransform: ManufacturingImageTransform;
};

export function RenderingHeroSlide({
  desktopBgSrc,
  mobileBgSrc,
  tabletBgSrc,
  desktopCopy,
  mobileCopy,
  tabletCopy,
  desktopTransform,
  mobileTransform,
  tabletTransform,
}: RenderingHeroSlideProps) {
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
      <RenderingHeroSlideBackgrounds
        desktopBgSrc={desktopBgSrc}
        mobileBgSrc={mobileBgSrc}
        tabletBgSrc={tabletBgSrc}
        desktopTransform={desktopTransform}
        mobileTransform={mobileTransform}
        tabletTransform={tabletTransform}
      />
      <RenderingHeroSlideCopy
        desktopCopy={desktopCopy}
        mobileCopy={mobileCopy}
        tabletCopy={tabletCopy}
      />
    </div>
  );
}
