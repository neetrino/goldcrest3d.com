import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION3_HERO_BG_MOBILE_PATH,
} from "./power-banners-layout.constants";

type DesignHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
};

export function DesignHeroSlideBackgrounds({
  desktopBgSrc,
}: DesignHeroSlideBackgroundsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        aria-hidden
      >
        <Image
          src={SECTION3_HERO_BG_MOBILE_PATH}
          alt=""
          fill
          unoptimized
          sizes={HERO_MOBILE_IMAGE_SIZES}
          className="object-cover object-left"
        />
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section3-bg-layout-height)] w-full md:block"
        aria-hidden
      >
        <Image
          src={desktopBgSrc}
          alt=""
          fill
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover md:max-xl:object-[30%_center] xl:object-left"
        />
      </div>
    </>
  );
}
