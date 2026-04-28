import { LANDING_IMAGE_IDS } from "@/constants";
import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlideBackgrounds } from "./DesignHeroSlideBackgrounds";
import { DesignHeroSlideCopy } from "./DesignHeroSlideCopy";

type DesignHeroSlideProps = {
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

export function DesignHeroSlide({
  desktopBgSrc,
  mobileBgSrc,
  tabletBgSrc,
  desktopCopy,
  mobileCopy,
  tabletCopy,
  desktopTransform,
  mobileTransform,
  tabletTransform,
}: DesignHeroSlideProps) {
  return (
    <div
      className="power-banners-section3-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
    >
      <DesignHeroSlideBackgrounds
        desktopBgSrc={desktopBgSrc}
        mobileBgSrc={mobileBgSrc}
        tabletBgSrc={tabletBgSrc}
        desktopTransform={desktopTransform}
        mobileTransform={mobileTransform}
        tabletTransform={tabletTransform}
      />
      <DesignHeroSlideCopy
        desktopCopy={desktopCopy}
        mobileCopy={mobileCopy}
        tabletCopy={tabletCopy}
      />
    </div>
  );
}
