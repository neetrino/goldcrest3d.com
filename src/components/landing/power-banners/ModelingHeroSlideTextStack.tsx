import type { CSSProperties } from "react";
import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import {
  HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS,
  MODELING_TITLE_DESKTOP_DISPLAY,
  MODELING_TITLE_MOBILE_DISPLAY,
  SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX,
  SECTION1_HERO_TEXT_NUDGE_DOWN_PX,
  SECTION1_MODELING_TITLE_NUDGE_UP_PX,
} from "./power-banners-layout.constants";

export function ModelingHeroSlideTextStack() {
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
        className={`inline-block max-w-[min(100%,36rem)] whitespace-normal text-balance md:max-w-none ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
        style={{
          transform: `translateY(-${SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
        }}
      >
        <span className="md:hidden">{MODELING_TITLE_MOBILE_DISPLAY}</span>
        <span className="hidden md:inline">
          {MODELING_TITLE_DESKTOP_DISPLAY}
        </span>
      </h1>
      <p
        id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
        className="hero-primary-subtitle-typography mt-4 shrink-0 md:mt-5"
      >
        <>
          Engineered for casting, printing and
          <br className="md:hidden" />
          {" "}precise stone setting. Every micron
          <br className="md:hidden" />
          {" "}accounted for.
        </>
      </p>
      <GetAQuoteButton
        id={HERO_GET_QUOTE_BUTTON_ID}
        variant="gold"
        className="mt-6 shrink-0 md:mt-8"
      />
    </div>
  );
}
