import {
  GetAQuoteButton,
  HERO_SECTION3_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  splitMultilineText,
  splitMultilineTextPreservingLines,
} from "./resolve-power-banner-display";
import { SECTION3_TEXT_COLUMN_TOP_MD_CLASS } from "./power-banners-layout.constants";

type DesignHeroSlideCopyProps = {
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
  tabletCopy: PowerBannerCopyEntry;
};

export function DesignHeroSlideCopy({
  desktopCopy,
  mobileCopy,
  tabletCopy,
}: DesignHeroSlideCopyProps) {
  const desktopSubtitleLines = splitMultilineTextPreservingLines(desktopCopy.body);
  const tabletSubtitleLines = splitMultilineTextPreservingLines(tabletCopy.body);
  const mobileSubtitleLines = splitMultilineTextPreservingLines(mobileCopy.body);
  const mobileTitleLines = splitMultilineTextPreservingLines(mobileCopy.title);
  const tabletTitle = splitMultilineText(tabletCopy.title).join(" ");

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto ${SECTION3_TEXT_COLUMN_TOP_MD_CLASS} md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20`}
    >
      <div className="flex w-full flex-col items-end gap-7 md:items-start md:gap-8">
        <div className="w-full md:hidden">
          <div className="power-banners-section3-text-cluster flex w-full flex-col items-end gap-7 text-right text-[#121212] max-md:-translate-y-[7.5rem]">
            <div className="flex w-full flex-col items-end gap-7">
              <h1
                className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal"
                style={{
                  transform: `translate(${mobileCopy.titleOffsetX}px, ${mobileCopy.titleOffsetY}px)`,
                }}
              >
                {mobileTitleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line.length > 0 ? line : "\u00A0"}
                  </span>
                ))}
              </h1>
              <p
                className="hero-primary-subtitle-typography-design max-w-[433px] self-end text-right"
                style={{
                  transform: `translate(${mobileCopy.bodyOffsetX}px, ${mobileCopy.bodyOffsetY}px)`,
                }}
              >
                {mobileSubtitleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line.length > 0 ? line : "\u00A0"}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden w-full flex-col items-start gap-8 text-left md:max-lg:flex">
          <div className="power-banners-section3-text-cluster flex w-full flex-col items-start gap-8 text-[#121212] md:translate-y-0">
            <h1
              className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal md:whitespace-nowrap"
              style={{
                transform: `translate(${tabletCopy.titleOffsetX}px, ${tabletCopy.titleOffsetY}px)`,
              }}
            >
              {tabletTitle}
            </h1>
            <div
              className="flex w-full flex-col items-start gap-0.5 md:gap-1"
              style={{
                transform: `translate(${tabletCopy.bodyOffsetX}px, ${tabletCopy.bodyOffsetY}px)`,
              }}
            >
              <p className="hero-primary-subtitle-typography-design max-w-[433px] md:max-w-[433px] md:-translate-y-4 md:self-start md:text-left">
                {tabletSubtitleLines.map((line, i) => (
                  <span key={i} className="block md:whitespace-nowrap">
                    {line.length > 0 ? line : "\u00A0"}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden w-full lg:flex lg:flex-col lg:items-start lg:gap-8 lg:text-left">
          <div className="power-banners-section3-text-cluster flex w-full flex-col items-start gap-8 text-[#121212] md:translate-y-0">
            <h1
              className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal lg:whitespace-nowrap"
              style={{
                transform: `translate(${desktopCopy.titleOffsetX}px, ${desktopCopy.titleOffsetY}px)`,
              }}
            >
              {desktopCopy.title}
            </h1>
            <div
              className="flex w-full flex-col items-start gap-0.5 lg:gap-1"
              style={{
                transform: `translate(${desktopCopy.bodyOffsetX}px, ${desktopCopy.bodyOffsetY}px)`,
              }}
            >
              <p className="hero-primary-subtitle-typography-design max-w-[433px] lg:max-w-[433px] lg:-translate-y-4 lg:self-start lg:text-left">
                {desktopSubtitleLines.map((line, i) => (
                  <span key={i} className="block lg:whitespace-nowrap">
                    {line.length > 0 ? line : "\u00A0"}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <span
          className="inline-flex max-md:mt-0 max-md:self-end md:hidden md:mt-0"
          style={{
            transform: `translate(${mobileCopy.ctaOffsetX}px, ${mobileCopy.ctaOffsetY}px)`,
          }}
        >
          <GetAQuoteButton
            id={HERO_SECTION3_GET_QUOTE_BUTTON_ID}
            variant="gold"
            className="shrink-0 self-end md:self-start"
          />
        </span>
        <span
          className="hidden md:inline-flex lg:hidden md:mt-0 md:self-start"
          style={{
            transform: `translate(${tabletCopy.ctaOffsetX}px, ${tabletCopy.ctaOffsetY}px)`,
          }}
        >
          <GetAQuoteButton variant="gold" className="shrink-0 self-start" />
        </span>
        <span
          className="hidden lg:inline-flex lg:mt-0 lg:self-start"
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
