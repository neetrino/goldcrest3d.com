import type { CSSProperties } from "react";
import Image from "next/image";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
  SECTION2_HERO_BG_MOBILE_PATH,
} from "./power-banners-layout.constants";
import {
  resolveHeroMobileBgTransform,
  resolveRenderingHeroDesktopBgTransform,
} from "./resolve-hero-bg-transform";

type RenderingHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc?: string;
  layoutMeta?: unknown | null;
};

export function RenderingHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc = SECTION2_HERO_BG_MOBILE_PATH,
  layoutMeta = null,
}: RenderingHeroSlideBackgroundsProps) {
  const desktopTransform = resolveRenderingHeroDesktopBgTransform(layoutMeta);
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
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section2-bg-layout-height)] w-full overflow-hidden md:block"
        aria-hidden
      >
        <div
          className="h-full w-full origin-left"
          style={desktopTransform as CSSProperties}
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            sizes={HERO_DESKTOP_IMAGE_SIZES}
            className="object-cover object-left"
          />
        </div>
      </div>
    </>
  );
}
