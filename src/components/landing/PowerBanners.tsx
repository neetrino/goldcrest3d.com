"use client";

import { Fragment } from "react";
import { LANDING_SECTION_IDS } from "@/constants";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import { HERO_SLOT_KEYS } from "@/lib/site-media/site-media.registry";
import { DesignHeroSlide } from "@/components/landing/power-banners/DesignHeroSlide";
import { ModelingHeroSlide } from "@/components/landing/power-banners/ModelingHeroSlide";
import { RenderingHeroSlide } from "@/components/landing/power-banners/RenderingHeroSlide";

const HERO_SLIDES = [
  { id: "modeling" as const, slot: HERO_SLOT_KEYS.MODELING },
  { id: "rendering" as const, slot: HERO_SLOT_KEYS.RENDERING },
  { id: "design" as const, slot: HERO_SLOT_KEYS.DESIGN },
];

type PowerBannersProps = {
  powerBannerCopy: PowerBannerCopyBundle;
  hero: LandingSiteMedia["hero"];
};

export function PowerBanners({ powerBannerCopy, hero }: PowerBannersProps) {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-white"
      aria-label="Hero"
    >
      {HERO_SLIDES.map((slide) => (
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
              <ModelingHeroSlide
                desktopBgSrc={hero[slide.slot].desktop}
                mobileBgSrc={hero[slide.slot].mobile}
                layoutMeta={hero[slide.slot].layoutMeta}
                copy={powerBannerCopy.MODELING}
              />
            ) : slide.id === "rendering" ? (
              <RenderingHeroSlide
                desktopBgSrc={hero[slide.slot].desktop}
                mobileBgSrc={hero[slide.slot].mobile}
                layoutMeta={hero[slide.slot].layoutMeta}
                copy={powerBannerCopy.RENDERING}
              />
            ) : (
              <DesignHeroSlide
                desktopBgSrc={hero[slide.slot].desktop}
                mobileBgSrc={hero[slide.slot].mobile}
                layoutMeta={hero[slide.slot].layoutMeta}
                copy={powerBannerCopy.DESIGN}
              />
            )}
          </div>
          {slide.id === "rendering" && (
            <div
              className="relative z-10 h-2 w-full shrink-0 bg-white"
              aria-hidden
            />
          )}
        </Fragment>
      ))}
    </section>
  );
}
