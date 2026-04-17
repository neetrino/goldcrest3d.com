import type { CSSProperties } from "react";
import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION1_HERO_BG_MOBILE_PATH,
} from "./power-banners-layout.constants";
import {
  resolveHeroMobileBgTransform,
  resolveModelingHeroDesktopBgTransform,
  resolveModelingHeroDesktopObjectPosition,
} from "./resolve-hero-bg-transform";

type ModelingHeroSlideLayersProps = {
  desktopBgSrc: string;
  mobileBgSrc?: string;
  layoutMeta?: unknown | null;
};

export function ModelingHeroSlideLayers({
  desktopBgSrc,
  mobileBgSrc = SECTION1_HERO_BG_MOBILE_PATH,
  layoutMeta = null,
}: ModelingHeroSlideLayersProps) {
  const desktopTransform = resolveModelingHeroDesktopBgTransform(layoutMeta);
  const desktopObjectPosition =
    resolveModelingHeroDesktopObjectPosition(layoutMeta);
  const mobileTransform = resolveHeroMobileBgTransform(layoutMeta);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
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
              priority
              unoptimized
              sizes={HERO_MOBILE_IMAGE_SIZES}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <Image
            src={mobileBgSrc}
            alt=""
            fill
            priority
            unoptimized
            sizes={HERO_MOBILE_IMAGE_SIZES}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div
        className="power-banners-section1-bg pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        style={desktopTransform as CSSProperties}
        aria-hidden
      >
        <Image
          src={desktopBgSrc}
          alt=""
          fill
          priority
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover"
          style={{
            objectPosition: desktopObjectPosition,
          }}
        />
      </div>
    </>
  );
}
