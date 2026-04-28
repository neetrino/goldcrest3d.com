import type { CSSProperties } from "react";

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
};

export function DesignHeroSlideCopy({
  desktopCopy,
  mobileCopy,
}: DesignHeroSlideCopyProps) {
  const desktopSubtitleLines = splitMultilineTextPreservingLines(desktopCopy.body);
  const mobileSubtitleLines = splitMultilineTextPreservingLines(mobileCopy.body);
  const mobileTitle = splitMultilineText(mobileCopy.title).join(" ");

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto ${SECTION3_TEXT_COLUMN_TOP_MD_CLASS} md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20`}
    >
      <div className="flex w-full flex-col items-end gap-7 md:items-start md:gap-8">
        <div className="w-full md:hidden">
          <div className="power-banners-section3-text-cluster flex w-full flex-col items-end gap-7 text-right text-[#121212] max-md:-translate-y-[7.5rem]">
            <div className="flex w-full flex-col items-end gap-7">
              <h1
                className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal text-balance"
                style={{ transform: `translateY(${mobileCopy.titleOffsetY}px)` }}
              >
                {mobileTitle}
              </h1>
              <p
                className="hero-primary-subtitle-typography-design max-w-[433px] self-end text-right"
                style={{ transform: `translateY(${mobileCopy.bodyOffsetY}px)` }}
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

        <div className="hidden w-full md:flex md:flex-col md:items-start md:gap-8 md:text-left">
          <div className="power-banners-section3-text-cluster flex w-full flex-col items-start gap-8 text-[#121212] md:translate-y-0">
            <h1
              className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal text-balance md:whitespace-nowrap"
              style={{ transform: `translateY(${desktopCopy.titleOffsetY}px)` }}
            >
              {desktopCopy.title}
            </h1>
            <div
              className="flex w-full flex-col items-start gap-0.5 md:gap-1"
              style={{ transform: `translateY(${desktopCopy.bodyOffsetY}px)` }}
            >
              <p className="hero-primary-subtitle-typography-design max-w-[433px] md:max-w-[433px] md:-translate-y-4 md:self-start md:text-left">
                {desktopSubtitleLines.map((line, i) => (
                  <span key={i} className="block md:whitespace-nowrap">
                    {line.length > 0 ? line : "\u00A0"}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <span
          className="inline-flex max-md:[transform:translateY(var(--hero-design-cta-y-mobile,0px))] md:[transform:translateY(var(--hero-design-cta-y-desktop,0px))] max-md:mt-0 self-end md:mt-0 md:self-start"
          style={
            {
              ["--hero-design-cta-y-mobile" as string]: `${mobileCopy.ctaOffsetY}px`,
              ["--hero-design-cta-y-desktop" as string]: `${desktopCopy.ctaOffsetY}px`,
            } as CSSProperties
          }
        >
          <GetAQuoteButton
            id={HERO_SECTION3_GET_QUOTE_BUTTON_ID}
            variant="gold"
            className="shrink-0 self-end md:self-start"
          />
        </span>
      </div>
    </div>
  );
}
