import { LANDING_IMAGE_IDS } from "@/constants";
import { DesignHeroSlideBackgrounds } from "./DesignHeroSlideBackgrounds";
import { DesignHeroSlideCopy } from "./DesignHeroSlideCopy";

type DesignHeroSlideProps = {
  desktopBgSrc: string;
};

export function DesignHeroSlide({ desktopBgSrc }: DesignHeroSlideProps) {
  return (
    <div
      className="power-banners-section3-block relative overflow-hidden"
      data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
    >
      <DesignHeroSlideBackgrounds desktopBgSrc={desktopBgSrc} />
      <DesignHeroSlideCopy />
    </div>
  );
}
