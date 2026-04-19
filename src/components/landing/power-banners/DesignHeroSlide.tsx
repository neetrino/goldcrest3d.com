import { LANDING_IMAGE_IDS } from "@/constants";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlideBackgrounds } from "./DesignHeroSlideBackgrounds";
import { DesignHeroSlideCopy } from "./DesignHeroSlideCopy";

type DesignHeroSlideProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
};

export function DesignHeroSlide({
  desktopBgSrc,
  mobileBgSrc,
  desktopCopy,
  mobileCopy,
}: DesignHeroSlideProps) {
  return (
    <div
      className="power-banners-section3-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
    >
      <DesignHeroSlideBackgrounds desktopBgSrc={desktopBgSrc} mobileBgSrc={mobileBgSrc} />
      <DesignHeroSlideCopy desktopCopy={desktopCopy} mobileCopy={mobileCopy} />
    </div>
  );
}
