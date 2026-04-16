import type { CSSProperties } from "react";
import Image from "next/image";
import {
  framingToCoverImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";

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
  /** Admin-uploaded desktop/tablet framing (md+). */
  customDesktopFraming: ImageFraming | null;
  /** Admin-uploaded mobile framing (below md). */
  customMobileFraming: ImageFraming | null;
};

export function ModelingHeroSlideLayers({
  desktopBgSrc,
  mobileBgSrc,
  customDesktopFraming,
  customMobileFraming,
}: ModelingHeroSlideLayersProps) {
  const mobileCustomStyle = customMobileFraming
    ? framingToCoverImageStyle(customMobileFraming)
    : undefined;
  const desktopCustomStyle = customDesktopFraming
    ? framingToCoverImageStyle(customDesktopFraming)
    : undefined;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
        aria-hidden
      >
        <div
          className="power-banners-fixed-bg-stage relative"
          style={
            {
              ["--hero-bg-min-width" as string]: "390px",
              ["--hero-bg-min-height" as string]: "679px",
              ...(mobileCustomStyle ? {} : { ["--hero-bg-shift-factor-x" as string]: "-0.08" }),
            } as CSSProperties
          }
        >
          <Image
            src={mobileBgSrc}
            alt=""
            fill
            priority
            unoptimized={mobileBgSrc.startsWith("/")}
            sizes={HERO_MOBILE_IMAGE_SIZES}
            className="power-banners-fixed-bg-image"
            style={mobileCustomStyle}
          />
        </div>
      </div>
      <div
        className="power-banners-section1-bg pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        style={
          {
            transform: "none",
            transformOrigin: "center center",
          } as CSSProperties
        }
        aria-hidden
      >
        <div
          className="power-banners-fixed-bg-stage relative"
          style={
            {
              ["--hero-bg-min-width" as string]: "1918px",
              ["--hero-bg-min-height" as string]: "707px",
              ...(desktopCustomStyle
                ? {}
                : {
                    ["--hero-bg-shift-y-base" as string]: `-${SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX}px`,
                    ["--hero-bg-shift-factor-x" as string]: "-0.03",
                    ["--hero-bg-scale" as string]: `${SECTION1_HERO_BG_SCALE}`,
                    ["--hero-bg-object-position" as string]: `50% calc(50% + ${SECTION1_HERO_BG_NUDGE_DOWN_PX}px)`,
                  }),
            } as CSSProperties
          }
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            priority
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
