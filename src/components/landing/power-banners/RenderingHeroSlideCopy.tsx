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
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-5 pb-16 pt-16 sm:px-8 min-[755px]:absolute min-[755px]:left-0 min-[755px]:right-auto min-[755px]:top-[38%] min-[755px]:max-w-[min(520px,44vw)] min-[755px]:-translate-y-1/2 min-[755px]:items-start min-[755px]:justify-center min-[755px]:px-0 min-[755px]:pl-12 min-[755px]:pr-6 min-[755px]:pb-0 min-[755px]:pt-0 lg:pl-20">
      <div className="power-banners-section2-text-cluster flex w-full max-w-md flex-col items-start gap-8 text-left text-white sm:max-w-lg min-[755px]:max-w-none min-[755px]:items-start min-[755px]:text-left">
        <div className="flex w-full flex-col items-start gap-8 min-[755px]:hidden">
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

        <div className="hidden w-full flex-col gap-8 min-[755px]:flex lg:hidden">
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
          className="mt-6 inline-flex min-[755px]:hidden"
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
          className="mt-6 hidden min-[755px]:inline-flex lg:hidden min-[755px]:self-start"
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
