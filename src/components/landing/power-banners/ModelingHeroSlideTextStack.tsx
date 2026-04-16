import type { CSSProperties } from "react";
import { Fragment } from "react";

import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { looksLikeHeroBannerRichBody } from "@/lib/power-banner-copy/looks-like-hero-banner-rich-body";
import {
  resolveModelingTitleDesktop,
  resolveModelingTitleMobileLines,
} from "./resolve-power-banner-display";
import { HeroBannerBodyRichText } from "./HeroBannerBodyRichText";
import {
  SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX,
  SECTION1_HERO_TEXT_NUDGE_DOWN_PX,
  SECTION1_MODELING_TITLE_NUDGE_UP_PX,
} from "./power-banners-layout.constants";

type ModelingHeroSlideTextStackProps = {
  copy: PowerBannerCopyEntry;
};

function toPlainLines(value: string): string[] {
  return value
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ModelingHeroSlideTextStack({
  copy,
}: ModelingHeroSlideTextStackProps) {
  const desktopTitle = resolveModelingTitleDesktop(copy.title);
  const mobileTitleLines = resolveModelingTitleMobileLines(copy.mobileTitle);

  const desktopBody = copy.body.trim();
  const mobileBody = copy.mobileBody.trim();
  const useRichDesktopBody = looksLikeHeroBannerRichBody(desktopBody);
  const useRichMobileBody = looksLikeHeroBannerRichBody(mobileBody);
  const desktopPlain = desktopBody.replace(/\s+/g, " ");
  const mobilePlainLines = toPlainLines(mobileBody);

  const hasMobileOverlay = copy.mobileOverlayText.trim().length > 0;

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
        {hasMobileOverlay ? (
          <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#e2c481] md:hidden">
            {copy.mobileOverlayText}
          </span>
        ) : null}
        <span className="md:hidden">
          {mobileTitleLines.map((line, i) => (
            <span key={i} className={i === 0 ? "block whitespace-nowrap" : "block"}>
              {line}
            </span>
          ))}
        </span>
        <span className="hidden md:inline">{desktopTitle}</span>
      </h1>

      <div
        id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
        className="hero-primary-subtitle-typography mt-4 w-full max-w-[min(100%,36rem)] shrink-0 md:mt-5"
      >
        <div className="md:hidden">
          {mobileBody.length > 0 ? (
            useRichMobileBody ? (
              <HeroBannerBodyRichText
                body={mobileBody}
                className="hero-banner-rich-body w-full text-center [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
              />
            ) : (
              <p>
                {mobilePlainLines.map((line, i) => (
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
            )
          ) : null}
        </div>

        <div className="hidden md:block">
          {desktopBody.length > 0 ? (
            useRichDesktopBody ? (
              <HeroBannerBodyRichText
                body={desktopBody}
                className="hero-banner-rich-body w-full text-center [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
              />
            ) : (
              <p>{desktopPlain}</p>
            )
          ) : null}
        </div>
      </div>

      <GetAQuoteButton
        id={HERO_GET_QUOTE_BUTTON_ID}
        variant="gold"
        className="mt-6 shrink-0 md:mt-8"
      />
    </div>
  );
}
