import type { CSSProperties } from "react";
import Image from "next/image";
import {
  getManufacturingImageTransformCssValue,
  type ManufacturingImageTransform,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
} from "./power-banners-layout.constants";

type ModelingHeroSlideLayersProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  tabletBgSrc: string;
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
  tabletTransform: ManufacturingImageTransform;
};

export function ModelingHeroSlideLayers({
  desktopBgSrc,
  mobileBgSrc,
  tabletBgSrc,
  desktopTransform,
  mobileTransform,
  tabletTransform,
}: ModelingHeroSlideLayersProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={
            {
              transform: getManufacturingImageTransformCssValue(mobileTransform),
              transformOrigin: "center center",
            } as CSSProperties
          }
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
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block lg:hidden"
        style={
          {
            transform: getManufacturingImageTransformCssValue(tabletTransform),
            transformOrigin: "center center",
          } as CSSProperties
        }
        aria-hidden
      >
        <Image
          src={tabletBgSrc}
          alt=""
          fill
          priority
          unoptimized
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover"
        />
      </div>
      <div
        className="power-banners-section1-bg pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
        style={
          {
            transform: getManufacturingImageTransformCssValue(desktopTransform),
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
          unoptimized
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover"
        />
      </div>
    </>
  );
}
