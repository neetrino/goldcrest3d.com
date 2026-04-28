import type { CSSProperties } from "react";

import {
  GetAQuoteButton,
  HERO_SECTION2_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";

import { RenderingHeroSlideTitle } from "./RenderingHeroSlideTitle";
import { RenderingHeroSubtitleLines } from "./RenderingHeroSubtitleLines";

type RenderingHeroSlideCopyProps = {
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
};

export function RenderingHeroSlideCopy({
  desktopCopy,
  mobileCopy,
}: RenderingHeroSlideCopyProps) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto md:top-[38%] md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20">
      <div className="power-banners-section2-text-cluster flex w-full flex-col items-start gap-8 text-left text-white">
        <div className="flex w-full flex-col gap-8 md:hidden">
          <div style={{ transform: `translateY(${mobileCopy.titleOffsetY}px)` }}>
            <RenderingHeroSlideTitle
              surface="mobile-only"
              desktopTitle={desktopCopy.title}
              mobileTitle={mobileCopy.title}
            />
          </div>
          <div style={{ transform: `translateY(${mobileCopy.bodyOffsetY}px)` }}>
            <RenderingHeroSubtitleLines
              surface="mobile-only"
              desktopBody={desktopCopy.body}
              mobileBody={mobileCopy.body}
            />
          </div>
        </div>

        <div className="hidden w-full flex-col gap-8 md:flex">
          <div style={{ transform: `translateY(${desktopCopy.titleOffsetY}px)` }}>
            <RenderingHeroSlideTitle
              surface="desktop-only"
              desktopTitle={desktopCopy.title}
              mobileTitle={mobileCopy.title}
            />
          </div>
          <div style={{ transform: `translateY(${desktopCopy.bodyOffsetY}px)` }}>
            <RenderingHeroSubtitleLines
              surface="desktop-only"
              desktopBody={desktopCopy.body}
              mobileBody={mobileCopy.body}
            />
          </div>
        </div>

        <span
          className="inline-flex max-md:[transform:translateY(var(--hero-rendering-cta-y-mobile,0px))] md:[transform:translateY(var(--hero-rendering-cta-y-desktop,0px))] md:self-start"
          style={
            {
              ["--hero-rendering-cta-y-mobile" as string]: `${mobileCopy.ctaOffsetY}px`,
              ["--hero-rendering-cta-y-desktop" as string]: `${desktopCopy.ctaOffsetY}px`,
            } as CSSProperties
          }
        >
          <GetAQuoteButton id={HERO_SECTION2_GET_QUOTE_BUTTON_ID} variant="gold" className="shrink-0 self-start" />
        </span>
      </div>
    </div>
  );
}
