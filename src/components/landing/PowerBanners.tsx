import { Fragment } from "react";
import { LANDING_SECTION_IDS } from "@/constants";
import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import { DesignHeroSlide } from "@/components/landing/power-banners/DesignHeroSlide";
import { ModelingHeroSlide } from "@/components/landing/power-banners/ModelingHeroSlide";
import { RenderingHeroSlide } from "@/components/landing/power-banners/RenderingHeroSlide";

type PowerBannersProps = {
  powerBannerCopy: PowerBannerCopyBundle;
};

export function PowerBanners({ powerBannerCopy }: PowerBannersProps) {
  const heroSlides = [
    {
      id: "modeling" as const,
      desktopBg: powerBannerCopy.desktop.MODELING.imageSrc,
      mobileBg: powerBannerCopy.mobile.MODELING.imageSrc,
      desktopCopy: powerBannerCopy.desktop.MODELING,
      mobileCopy: powerBannerCopy.mobile.MODELING,
    },
    {
      id: "rendering" as const,
      desktopBg: powerBannerCopy.desktop.RENDERING.imageSrc,
      mobileBg: powerBannerCopy.mobile.RENDERING.imageSrc,
      desktopCopy: powerBannerCopy.desktop.RENDERING,
      mobileCopy: powerBannerCopy.mobile.RENDERING,
    },
    {
      id: "design" as const,
      desktopBg: powerBannerCopy.desktop.DESIGN.imageSrc,
      mobileBg: powerBannerCopy.mobile.DESIGN.imageSrc,
      desktopCopy: powerBannerCopy.desktop.DESIGN,
      mobileCopy: powerBannerCopy.mobile.DESIGN,
    },
  ] as const;

  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-white"
      aria-label="Hero"
    >
      {heroSlides.map((slide) => (
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
                desktopBgSrc={slide.desktopBg}
                mobileBgSrc={slide.mobileBg}
                desktopCopy={slide.desktopCopy}
                mobileCopy={slide.mobileCopy}
              />
            ) : slide.id === "rendering" ? (
              <RenderingHeroSlide
                desktopBgSrc={slide.desktopBg}
                mobileBgSrc={slide.mobileBg}
                desktopCopy={slide.desktopCopy}
                mobileCopy={slide.mobileCopy}
              />
            ) : (
              <DesignHeroSlide
                desktopBgSrc={slide.desktopBg}
                mobileBgSrc={slide.mobileBg}
                desktopCopy={slide.desktopCopy}
                mobileCopy={slide.mobileCopy}
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
