import type { CSSProperties } from "react";
import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION3_HERO_BG_MOBILE_PATH,
} from "./power-banners-layout.constants";
import {
  resolveDesignHeroDesktopBgTransform,
  resolveHeroMobileBgTransform,
} from "./resolve-hero-bg-transform";

type DesignHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc?: string;
  layoutMeta?: unknown | null;
};

export function DesignHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc = SECTION3_HERO_BG_MOBILE_PATH,
  layoutMeta = null,
}: DesignHeroSlideBackgroundsProps) {
  const desktopTransform = resolveDesignHeroDesktopBgTransform(layoutMeta);
  const mobileTransform = resolveHeroMobileBgTransform(layoutMeta);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        aria-hidden
      >
        {mobileTransform ? (
          <div
            className="absolute inset-0 h-full w-full"
            style={mobileTransform as CSSProperties}
          >
            <Image
              src={mobileBgSrc}
              alt=""
              fill
              unoptimized
              sizes={HERO_MOBILE_IMAGE_SIZES}
              className="object-cover object-left"
            />
          </div>
        ) : (
          <Image
            src={mobileBgSrc}
            alt=""
            fill
            unoptimized
            sizes={HERO_MOBILE_IMAGE_SIZES}
            className="object-cover object-left"
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section3-bg-layout-height)] w-full md:block"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={desktopTransform as CSSProperties}
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            sizes={HERO_DESKTOP_IMAGE_SIZES}
            className="object-cover md:max-xl:object-[30%_center] xl:object-left"
          />
        </div>
      </div>
    </>
  );
}
