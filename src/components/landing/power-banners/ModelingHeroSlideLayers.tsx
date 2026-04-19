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
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
};

export function ModelingHeroSlideLayers({
  desktopBgSrc,
  mobileBgSrc,
  desktopTransform,
  mobileTransform,
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
        className="power-banners-section1-bg pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
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
          sizes={HERO_DESKTOP_IMAGE_SIZES}
          className="object-cover"
        />
      </div>
    </>
  );
}
