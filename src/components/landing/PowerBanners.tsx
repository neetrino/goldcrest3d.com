"use client";

import { Fragment } from "react";
import { LANDING_SECTION_IDS } from "@/constants";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlide } from "@/components/landing/power-banners/DesignHeroSlide";
import { ModelingHeroSlide } from "@/components/landing/power-banners/ModelingHeroSlide";
import { RenderingHeroSlide } from "@/components/landing/power-banners/RenderingHeroSlide";

const HERO_SLIDES = [
  { id: "modeling" as const, copyKey: "MODELING" as const },
  { id: "rendering" as const, copyKey: "RENDERING" as const },
  { id: "design" as const, copyKey: "DESIGN" as const },
];

type PowerBannersProps = {
  powerBannerCopy: PowerBannerCopyBundle;
};

export function PowerBanners({ powerBannerCopy }: PowerBannersProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-white"
      aria-label="Hero"
    >
      {HERO_SLIDES.map((slide) => {
        const copy = powerBannerCopy[slide.copyKey];
        return (
        <Fragment key={slide.id}>
          <div
            className={`relative flex w-full shrink-0 flex-col ${
              slide.id === "modeling"
                ? "overflow-x-visible overflow-y-clip bg-white"
                : "overflow-hidden min-h-0 bg-white md:h-auto"
            } ${slide.id === "rendering" ? "-mt-[60px] md:-mt-[140px]" : ""}`}
          >
            {slide.id === "rendering" && (
              <div
                className="relative z-10 h-2 w-full shrink-0 bg-white"
                aria-hidden
              />
            )}
            {slide.id === "modeling" ? (
              <ModelingHeroSlide copy={copy} />
            ) : slide.id === "rendering" ? (
              <RenderingHeroSlide copy={copy} />
            ) : (
              <DesignHeroSlide copy={copy} />
            )}
          </div>
          {slide.id === "rendering" && (
            <div
              className="relative z-10 h-2 w-full shrink-0 bg-white"
              aria-hidden
            />
          )}
        </Fragment>
        );
      })}
    </section>
  );
}
