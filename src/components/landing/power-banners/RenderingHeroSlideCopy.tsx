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
  tabletCopy: PowerBannerCopyEntry;
};

export function RenderingHeroSlideCopy({
  desktopCopy,
  mobileCopy,
  tabletCopy,
}: RenderingHeroSlideCopyProps) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto md:top-[38%] md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20">
      <div className="power-banners-section2-text-cluster flex w-full flex-col items-start gap-8 text-left text-white">
        <div className="flex w-full flex-col gap-8 md:hidden">
          <div
            style={{
              transform: `translate(${mobileCopy.titleOffsetX}px, ${mobileCopy.titleOffsetY}px)`,
            }}
          >
            <RenderingHeroSlideTitle
              surface="mobile-only"
              desktopTitle={desktopCopy.title}
              mobileTitle={mobileCopy.title}
              tabletTitle={tabletCopy.title}
            />
          </div>
          <div
            style={{
              transform: `translate(${mobileCopy.bodyOffsetX}px, ${mobileCopy.bodyOffsetY}px)`,
            }}
          >
            <RenderingHeroSubtitleLines
              surface="mobile-only"
              desktopBody={desktopCopy.body}
              mobileBody={mobileCopy.body}
              tabletBody={tabletCopy.body}
            />
          </div>
        </div>

        <div className="hidden w-full flex-col gap-8 md:flex lg:hidden">
          <div
            style={{
              transform: `translate(${tabletCopy.titleOffsetX}px, ${tabletCopy.titleOffsetY}px)`,
            }}
          >
            <RenderingHeroSlideTitle
              surface="tablet-only"
              desktopTitle={desktopCopy.title}
              mobileTitle={mobileCopy.title}
              tabletTitle={tabletCopy.title}
            />
          </div>
          <div
            style={{
              transform: `translate(${tabletCopy.bodyOffsetX}px, ${tabletCopy.bodyOffsetY}px)`,
            }}
          >
            <RenderingHeroSubtitleLines
              surface="tablet-only"
              desktopBody={desktopCopy.body}
              mobileBody={mobileCopy.body}
              tabletBody={tabletCopy.body}
            />
          </div>
        </div>

        <div className="hidden w-full flex-col gap-8 lg:flex">
          <div
            style={{
              transform: `translate(${desktopCopy.titleOffsetX}px, ${desktopCopy.titleOffsetY}px)`,
            }}
          >
            <RenderingHeroSlideTitle
              surface="desktop-only"
              desktopTitle={desktopCopy.title}
              mobileTitle={mobileCopy.title}
              tabletTitle={tabletCopy.title}
            />
          </div>
          <div
            style={{
              transform: `translate(${desktopCopy.bodyOffsetX}px, ${desktopCopy.bodyOffsetY}px)`,
            }}
          >
            <RenderingHeroSubtitleLines
              surface="desktop-only"
              desktopBody={desktopCopy.body}
              mobileBody={mobileCopy.body}
              tabletBody={tabletCopy.body}
            />
          </div>
        </div>

        <span
          className="mt-6 inline-flex md:hidden"
          style={{
            transform: `translate(${mobileCopy.ctaOffsetX}px, ${mobileCopy.ctaOffsetY}px)`,
          }}
        >
          <GetAQuoteButton
            id={HERO_SECTION2_GET_QUOTE_BUTTON_ID}
            variant="gold"
            className="shrink-0 self-start"
          />
        </span>
        <span
          className="mt-6 hidden md:inline-flex lg:hidden md:self-start"
          style={{
            transform: `translate(${tabletCopy.ctaOffsetX}px, ${tabletCopy.ctaOffsetY}px)`,
          }}
        >
          <GetAQuoteButton variant="gold" className="shrink-0 self-start" />
        </span>
        <span
          className="mt-6 hidden lg:inline-flex lg:self-start"
          style={{
            transform: `translate(${desktopCopy.ctaOffsetX}px, ${desktopCopy.ctaOffsetY}px)`,
          }}
        >
          <GetAQuoteButton variant="gold" className="shrink-0 self-start" />
        </span>
      </div>
    </div>
  );
}
