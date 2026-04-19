import Image from "next/image";
import type { CSSProperties } from "react";
import {
  getManufacturingImageTransformCssValue,
  type ManufacturingImageTransform,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import {
  HERO_DESKTOP_IMAGE_SIZES,
  HERO_MOBILE_IMAGE_SIZES,
} from "./power-banners-layout.constants";

type DesignHeroSlideBackgroundsProps = {
  desktopBgSrc: string;
  mobileBgSrc: string;
  desktopTransform: ManufacturingImageTransform;
  mobileTransform: ManufacturingImageTransform;
};

export function DesignHeroSlideBackgrounds({
  desktopBgSrc,
  mobileBgSrc,
  desktopTransform,
  mobileTransform,
}: DesignHeroSlideBackgroundsProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
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
            sizes={HERO_MOBILE_IMAGE_SIZES}
            className="object-cover object-left"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[var(--section3-bg-layout-height)] w-full overflow-hidden md:block"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={
            {
              transform: getManufacturingImageTransformCssValue(desktopTransform),
              transformOrigin: "left center",
            } as CSSProperties
          }
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
