import type { CSSProperties } from "react";
import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX,
  SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION2_HERO_BG_SCALE,
} from "./power-banners-layout.constants";

type RenderingHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
};

export function RenderingHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc,
}: RenderingHeroSlideBackgroundsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        aria-hidden
      >
        <Image
          src={mobileBgSrc}
          alt=""
          fill
          unoptimized={mobileBgSrc.startsWith("/")}
          sizes={HERO_MOBILE_IMAGE_SIZES}
          className="object-cover object-left"
        />
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section2-bg-layout-height)] w-full overflow-hidden md:block"
        aria-hidden
      >
        <div
          className="h-full w-full origin-left"
          style={
            {
              transform: `translateX(-${SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX}px) translateY(-${SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX}px) scale(${SECTION2_HERO_BG_SCALE})`,
            } as CSSProperties
          }
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            unoptimized={desktopBgSrc.startsWith("/")}
            sizes={HERO_DESKTOP_IMAGE_SIZES}
            className="object-cover object-left"
          />
        </div>
      </div>
    </>
  );
}
