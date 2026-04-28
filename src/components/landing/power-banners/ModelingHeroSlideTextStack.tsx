import type { CSSProperties } from "react";
import { Fragment } from "react";

import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  resolveModelingTitleDesktop,
  splitMultilineText,
  splitMultilineTextPreservingLines,
} from "./resolve-power-banner-display";
import {
  SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX,
  SECTION1_HERO_TEXT_NUDGE_DOWN_PX,
  SECTION1_MODELING_TITLE_NUDGE_UP_PX,
} from "./power-banners-layout.constants";

type ModelingHeroSlideTextStackProps = {
  desktopCopy: PowerBannerCopyEntry;
  mobileCopy: PowerBannerCopyEntry;
  tabletCopy: PowerBannerCopyEntry;
};

export function ModelingHeroSlideTextStack({
  desktopCopy,
  mobileCopy,
  tabletCopy,
}: ModelingHeroSlideTextStackProps) {
  const desktopTitle = resolveModelingTitleDesktop(desktopCopy.title);
  const tabletTitle = resolveModelingTitleDesktop(tabletCopy.title);
  const mobileTitleLines = splitMultilineText(mobileCopy.title);
  const desktopLines = splitMultilineTextPreservingLines(desktopCopy.body);
  const tabletLines = splitMultilineTextPreservingLines(tabletCopy.body);
  const mobileLines = splitMultilineText(mobileCopy.body);

  const clusterStyle = {
    ["--section1-modeling-text-nudge-y-mobile" as string]: `${SECTION1_HERO_TEXT_NUDGE_DOWN_PX + SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX}px`,
    ["--section1-modeling-text-nudge-y-desktop" as string]: `${SECTION1_HERO_TEXT_NUDGE_DOWN_PX}px`,
  } as CSSProperties;

  return (
    <div
      id={LANDING_ELEMENT_IDS.HERO_MODELING_TEXT_GROUP}
      className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-10 pt-8 text-center max-md:translate-y-[var(--section1-modeling-text-nudge-y-mobile)] lg:translate-y-[var(--section1-modeling-text-nudge-y-desktop)] lg:pb-16 lg:pt-12 md:max-lg:translate-y-[var(--section1-modeling-text-nudge-y-desktop)] md:max-lg:pb-16 md:max-lg:pt-12"
      style={clusterStyle}
    >
      <div className="flex w-full flex-col items-center md:hidden">
        <h1
          className="inline-block max-w-[min(100%,36rem)] whitespace-normal text-balance"
          style={{
            transform: `translate(${mobileCopy.titleOffsetX}px, ${mobileCopy.titleOffsetY - SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
          }}
        >
          {mobileTitleLines.map((line, i) => (
            <span
              key={i}
              className={i === 0 ? "block whitespace-nowrap" : "block"}
            >
              {line}
            </span>
          ))}
        </h1>
        <div
          style={{
            transform: `translate(${mobileCopy.bodyOffsetX}px, ${mobileCopy.bodyOffsetY}px)`,
          }}
        >
          <p
            id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
            className="hero-primary-subtitle-typography mt-4 shrink-0"
          >
            {mobileLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 ? (
                  <>
                    <br className="md:hidden" />{" "}
                  </>
                ) : null}
                <span className={i === 0 ? "whitespace-nowrap" : undefined}>{line}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="hidden w-full flex-col items-center md:flex lg:hidden">
        <h1
          className="inline-block max-w-none whitespace-normal text-balance"
          style={{
            transform: `translate(${tabletCopy.titleOffsetX}px, ${tabletCopy.titleOffsetY - SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
          }}
        >
          {tabletTitle}
        </h1>
        <div
          style={{
            transform: `translate(${tabletCopy.bodyOffsetX}px, ${tabletCopy.bodyOffsetY}px)`,
          }}
        >
          <p className="hero-primary-subtitle-typography mt-5 shrink-0">
            {tabletLines.map((line, i) => (
              <span key={i} className="block">
                {line.length > 0 ? line : "\u00A0"}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="hidden w-full flex-col items-center lg:flex">
        <h1
          className="inline-block max-w-none whitespace-normal text-balance"
          style={{
            transform: `translate(${desktopCopy.titleOffsetX}px, ${desktopCopy.titleOffsetY - SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
          }}
        >
          {desktopTitle}
        </h1>
        <div
          style={{
            transform: `translate(${desktopCopy.bodyOffsetX}px, ${desktopCopy.bodyOffsetY}px)`,
          }}
        >
          <p className="hero-primary-subtitle-typography mt-5 shrink-0">
            {desktopLines.map((line, i) => (
              <span key={i} className="block">
                {line.length > 0 ? line : "\u00A0"}
              </span>
            ))}
          </p>
        </div>
      </div>

      <span
        className="mt-6 inline-flex md:hidden"
        style={{
          transform: `translate(${mobileCopy.ctaOffsetX}px, ${mobileCopy.ctaOffsetY}px)`,
        }}
      >
        <GetAQuoteButton id={HERO_GET_QUOTE_BUTTON_ID} variant="gold" />
      </span>
      <span
        className="mt-6 hidden md:inline-flex lg:hidden"
        style={{
          transform: `translate(${tabletCopy.ctaOffsetX}px, ${tabletCopy.ctaOffsetY}px)`,
        }}
      >
        <GetAQuoteButton variant="gold" />
      </span>
      <span
        className="mt-6 hidden lg:inline-flex"
        style={{
          transform: `translate(${desktopCopy.ctaOffsetX}px, ${desktopCopy.ctaOffsetY}px)`,
        }}
      >
        <GetAQuoteButton variant="gold" />
      </span>
    </div>
  );
}
