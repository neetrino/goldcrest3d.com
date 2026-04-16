import type { CSSProperties } from "react";
import Image from "next/image";
import {
  framingToCoverImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
} from "./power-banners-layout.constants";

type DesignHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  customDesktopFraming: ImageFraming | null;
  customMobileFraming: ImageFraming | null;
};

export function DesignHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc,
  customDesktopFraming,
  customMobileFraming,
}: DesignHeroSlideBackgroundsProps) {
  const mobileCustomStyle = customMobileFraming
    ? framingToCoverImageStyle(customMobileFraming)
    : undefined;
  const desktopCustomStyle = customDesktopFraming
    ? framingToCoverImageStyle(customDesktopFraming)
    : undefined;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        aria-hidden
      >
        <div
          className="power-banners-fixed-bg-stage relative"
          style={
            {
              ["--hero-bg-min-width" as string]: "390px",
              ["--hero-bg-min-height" as string]: "679px",
              ...(mobileCustomStyle
                ? {}
                : {
                    ["--hero-bg-shift-factor-x" as string]: "0.08",
                    ["--hero-bg-object-position" as string]: "30% center",
                  }),
            } as CSSProperties
          }
        >
          <Image
            src={mobileBgSrc}
            alt=""
            fill
            unoptimized={mobileBgSrc.startsWith("/")}
            sizes={HERO_MOBILE_IMAGE_SIZES}
            className="power-banners-fixed-bg-image"
            style={mobileCustomStyle}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section3-bg-layout-height)] w-full md:block"
        aria-hidden
      >
        <div
          className="power-banners-fixed-bg-stage relative"
          style={
            {
              ["--hero-bg-min-width" as string]: "1920px",
              ["--hero-bg-min-height" as string]: "712px",
              ...(desktopCustomStyle
                ? {}
                : {
                    ["--hero-bg-shift-factor-x" as string]: "0.14",
                    ["--hero-bg-object-position" as string]: "30% center",
                  }),
            } as CSSProperties
          }
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            unoptimized={desktopBgSrc.startsWith("/")}
            sizes={HERO_DESKTOP_IMAGE_SIZES}
            className="power-banners-fixed-bg-image"
            style={desktopCustomStyle}
          />
        </div>
      </div>
    </>
  );
}
