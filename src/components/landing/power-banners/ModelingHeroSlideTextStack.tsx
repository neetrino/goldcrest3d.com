import type { CSSProperties } from "react";
import { Fragment } from "react";

import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  resolveModelingBodyDisplay,
  resolveModelingTitleDesktop,
  resolveModelingTitleMobileLines,
} from "./resolve-power-banner-display";
import {
  SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX,
  SECTION1_HERO_TEXT_NUDGE_DOWN_PX,
  SECTION1_MODELING_TITLE_NUDGE_UP_PX,
} from "./power-banners-layout.constants";

type ModelingHeroSlideTextStackProps = {
  copy: PowerBannerCopyEntry;
};

export function ModelingHeroSlideTextStack({
  copy,
}: ModelingHeroSlideTextStackProps) {
  const desktopTitle = resolveModelingTitleDesktop(copy.title);
  const mobileTitleLines = resolveModelingTitleMobileLines(copy.title);
  const { desktopParagraph, mobileLines } = resolveModelingBodyDisplay(copy.body);

  return (
    <div
      id={LANDING_ELEMENT_IDS.HERO_MODELING_TEXT_GROUP}
      className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-10 pt-8 text-center max-md:translate-y-[var(--section1-modeling-text-nudge-y-mobile)] md:translate-y-[var(--section1-modeling-text-nudge-y-desktop)] md:pb-16 md:pt-12"
      style={
        {
          ["--section1-modeling-text-nudge-y-mobile" as string]: `${SECTION1_HERO_TEXT_NUDGE_DOWN_PX + SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX}px`,
          ["--section1-modeling-text-nudge-y-desktop" as string]: `${SECTION1_HERO_TEXT_NUDGE_DOWN_PX}px`,
        } as CSSProperties
      }
    >
      <h1
        className="inline-block max-w-[min(100%,36rem)] whitespace-normal text-balance md:max-w-none"
        style={{
          transform: `translateY(-${SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
        }}
      >
        <span className="md:hidden">
          {mobileTitleLines.map((line, i) => (
            <span
              key={i}
              className={i === 0 ? "block whitespace-nowrap" : "block"}
            >
              {line}
            </span>
          ))}
        </span>
        <span className="hidden md:inline">{desktopTitle}</span>
      </h1>
      <p
        id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
        className="hero-primary-subtitle-typography mt-4 shrink-0 md:mt-5"
      >
        <span className="md:hidden">
          {mobileLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 ? (
                <>
                  <br className="md:hidden" />{" "}
                </>
              ) : null}
              <span className={i === 0 ? "whitespace-nowrap" : undefined}>
                {line}
              </span>
            </Fragment>
          ))}
        </span>
        <span className="hidden md:inline">{desktopParagraph}</span>
      </p>
      <GetAQuoteButton
        id={HERO_GET_QUOTE_BUTTON_ID}
        variant="gold"
        className="mt-6 shrink-0 md:mt-8"
      />
    </div>
  );
}
