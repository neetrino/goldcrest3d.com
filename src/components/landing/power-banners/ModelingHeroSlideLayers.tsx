import type { CSSProperties } from "react";
import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX,
  SECTION1_HERO_BG_NUDGE_DOWN_PX,
  SECTION1_HERO_BG_SCALE,
} from "./power-banners-layout.constants";

type ModelingHeroSlideLayersProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
};

export function ModelingHeroSlideLayers({
  desktopBgSrc,
  mobileBgSrc,
}: ModelingHeroSlideLayersProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
        aria-hidden
      >
        <Image
          src={mobileBgSrc}
          alt=""
          fill
          priority
          unoptimized={mobileBgSrc.startsWith("/")}
          sizes={HERO_MOBILE_IMAGE_SIZES}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="power-banners-section1-bg pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        style={
          {
            transform: `translateY(-${SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX}px) scale(${SECTION1_HERO_BG_SCALE})`,
            transformOrigin: "center center",
          } as CSSProperties
        }
        aria-hidden
      >
        <Image
          src={desktopBgSrc}
          alt=""
          fill
          priority
          unoptimized={desktopBgSrc.startsWith("/")}
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover"
          style={{
            objectPosition: `center calc(50% + ${SECTION1_HERO_BG_NUDGE_DOWN_PX}px)`,
          }}
        />
      </div>
    </>
  );
}
