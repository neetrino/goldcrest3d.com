import { LANDING_IMAGE_IDS } from "@/constants";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlideBackgrounds } from "./DesignHeroSlideBackgrounds";
import { DesignHeroSlideCopy } from "./DesignHeroSlideCopy";

type DesignHeroSlideProps = {
  copy: PowerBannerCopyEntry;
};

export function DesignHeroSlide({ copy }: DesignHeroSlideProps) {
  return (
    <div
      className="power-banners-section3-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
    >
      <DesignHeroSlideBackgrounds
        desktopBgSrc={copy.desktopBgSrc}
        mobileBgSrc={copy.mobileBgSrc}
      />
      <DesignHeroSlideCopy copy={copy} />
    </div>
  );
}
