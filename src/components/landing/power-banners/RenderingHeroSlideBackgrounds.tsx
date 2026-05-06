import type { CSSProperties } from "react";
import Image from "next/image";
import {
  getManufacturingImageTransformCssValue,
  type ManufacturingImageTransform,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import {
  RENDERING_HERO_DESKTOP_IMAGE_SIZES,
  RENDERING_HERO_MOBILE_IMAGE_SIZES,
} from "./power-banners-layout.constants";

type RenderingHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  tabletBgSrc: string;
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
  tabletTransform: ManufacturingImageTransform;
};

export function RenderingHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc,
  tabletBgSrc,
  desktopTransform,
  mobileTransform,
  tabletTransform,
}: RenderingHeroSlideBackgroundsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 min-[755px]:hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={
            {
              transform: getManufacturingImageTransformCssValue(mobileTransform),
              transformOrigin: "left center",
            } as CSSProperties
          }
        >
          <Image
            src={mobileBgSrc}
            alt=""
            fill
            unoptimized
            sizes={RENDERING_HERO_MOBILE_IMAGE_SIZES}
            className="object-cover object-left"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden min-[755px]:block lg:hidden"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={
            {
              transform: getManufacturingImageTransformCssValue(tabletTransform),
              transformOrigin: "center center",
            } as CSSProperties
          }
        >
          <Image
            src={tabletBgSrc}
            alt=""
            fill
            sizes={RENDERING_HERO_DESKTOP_IMAGE_SIZES}
            className="object-cover object-center"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={
            {
              transform: getManufacturingImageTransformCssValue(desktopTransform),
              transformOrigin: "center center",
            } as CSSProperties
          }
        >
          <Image
            src={desktopBgSrc}
            alt=""
            fill
            sizes={RENDERING_HERO_DESKTOP_IMAGE_SIZES}
            className="object-cover object-center"
          />
        </div>
      </div>
    </>
  );
}
