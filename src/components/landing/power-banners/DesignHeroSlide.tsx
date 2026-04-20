import { LANDING_IMAGE_IDS } from "@/constants";
import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlideBackgrounds } from "./DesignHeroSlideBackgrounds";
import { DesignHeroSlideCopy } from "./DesignHeroSlideCopy";

type DesignHeroSlideProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
};

export function DesignHeroSlide({
  desktopBgSrc,
  mobileBgSrc,
  desktopCopy,
  mobileCopy,
  desktopTransform,
  mobileTransform,
}: DesignHeroSlideProps) {
  return (
    <div
      className="power-banners-section3-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
    >
      <DesignHeroSlideBackgrounds
        desktopBgSrc={desktopBgSrc}
        mobileBgSrc={mobileBgSrc}
        desktopTransform={desktopTransform}
        mobileTransform={mobileTransform}
      />
      <DesignHeroSlideCopy desktopCopy={desktopCopy} mobileCopy={mobileCopy} />
    </div>
  );
}
