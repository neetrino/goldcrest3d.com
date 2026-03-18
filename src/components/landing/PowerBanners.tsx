"use client";

import { Fragment } from "react";
import { LANDING_ELEMENT_IDS, LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
  HERO_SECTION2_GET_QUOTE_BUTTON_ID,
} from "./GetAQuoteButton";

/** Section1 — ներքևի լրացում (px), նկարի ֆրեյմը չի փոխվում */
const SECTION1_TAIL_MIN_HEIGHT_PX = 120;

/** Section1 — միայն հերո-նկարը դեպի ներքև (px), background-position Y */
const SECTION1_HERO_BG_NUDGE_DOWN_PX = 16;

/** Section1 — վերնագիր, ենթավերնագիր, CTA դեպի ներքև (translateY, px); ցածր արժեք = ավելի վերև */
const SECTION1_HERO_TEXT_NUDGE_DOWN_PX = 22;

/** Միայն modeling վերնագիր — translateY(-N); ցածր N = ավելի ներքև */
const SECTION1_MODELING_TITLE_NUDGE_UP_PX = 0;

/** Հերո գլխավոր վերնագրի մասշտաբ — modeling և Jewelry Rendering նույնը */
const HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS =
  "font-black leading-tight text-white text-[24px] tracking-[-0.006em] md:text-[42px] md:leading-[1.1] md:[letter-spacing:-1.28px]";

/** Explicit two-line copy for Jewelry Rendering subtitle; line break is intentional. */
const RENDERING_SUBTITLE_LINE1 = "High-resolution assets for brand presentation";
const RENDERING_SUBTITLE_LINE2 = "and global sales. Perfection in every light ray.";

/**
 * Jewelry Design (section 3) — միայն բլոկի բարձրություն (նկարի background-* առանձին).
 */
const DESIGN_SECTION_BLOCK_MIN_HEIGHT_MOBILE_PX = 440;
const DESIGN_SECTION_BLOCK_HEIGHT_MD_PX = 640;

/**
 * Jewelry Design (section 3) — ֆոնի պարամետրեր (Figma dev mode).
 */
const DESIGN_SECTION_BG_POSITION_X_PX = -0.228;
const DESIGN_SECTION_BG_POSITION_Y_PX = -140.296;
const DESIGN_SECTION_BG_SIZE_WIDTH_PERCENT = 112.306;
const DESIGN_SECTION_BG_SIZE_HEIGHT_PERCENT = 139.319;

/** Section2 (Jewelry Rendering) — ամբողջ տեքստային բլոկը միասին դեպի ձախ (px) */
const SECTION2_TEXT_CLUSTER_NUDGE_LEFT_MOBILE_PX = 56;
const SECTION2_TEXT_CLUSTER_NUDGE_LEFT_MD_PX = 128;

/** Միայն «Jewelry Rendering» վերնագիր — դեպի ներքև (px) */
const SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX = 10;

const SLIDES: Array<{
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  contentAlign: "left" | "center" | "right";
  useRemote?: boolean;
  /** Figma: Jewelry Design uses dark text on light bg */
  darkText?: boolean;
}> = [
  {
    id: "modeling",
    title: "3D Production-Ready Modeling",
    subtitle:
      "Engineered for casting, printing and precise stone setting. Every micron accounted for.",
    bg: LANDING_IMAGES.heroModeling,
    contentAlign: "center",
    useRemote: true,
  },
  {
    id: "rendering",
    title: "Jewelry Rendering",
    subtitle: `${RENDERING_SUBTITLE_LINE1} ${RENDERING_SUBTITLE_LINE2}`,
    bg: LANDING_IMAGES.heroRendering,
    contentAlign: "right",
    useRemote: true,
  },
  {
    id: "design",
    title: "Jewelry Design",
    subtitle:
      "Concept-to-CAD development for legacy collection building. Your vision, engineered.",
    bg: LANDING_IMAGES.heroDesign,
    contentAlign: "left",
    useRemote: true,
    darkText: true,
  },
];

export function PowerBanners() {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-[#d8d8d8]"
      aria-label="Hero"
    >
      {SLIDES.map((slide) => (
        <Fragment key={slide.id}>
        <div
          className={`relative flex w-full shrink-0 flex-col overflow-hidden ${
            slide.id === "modeling"
              ? "items-center bg-[#d8d8d8]"
              : slide.id === "rendering"
                ? "min-h-0"
                : slide.id === "design"
                  ? "power-banners-section3-block mx-auto w-full max-w-[1920px] bg-[lightgray]"
                  : "min-h-[460px] md:min-h-[720px]"
          } ${slide.id === "rendering" ? "-mt-[60px] md:-mt-[140px]" : ""}`}
        >
          {slide.id === "rendering" && (
            <div
              className="relative z-10 h-2 w-full shrink-0 bg-white"
              aria-hidden
            />
          )}
          {slide.id === "modeling" ? (
            <div
              className="power-banners-section1-block shrink-0"
              style={
                {
                  ["--section1-tail-min-height" as string]: `${SECTION1_TAIL_MIN_HEIGHT_PX}px`,
                } as React.CSSProperties
              }
            >
              <div
                className="power-banners-section1-image-strip"
                data-landing-image={LANDING_IMAGE_IDS.HERO_MODELING}
              >
                <div
                  className="power-banners-section1-bg pointer-events-none absolute inset-0"
                  style={
                    {
                      ["--section1-hero-bg" as string]: `url("${slide.bg}")`,
                      ["--section1-bg-nudge-y" as string]: `${SECTION1_HERO_BG_NUDGE_DOWN_PX}px`,
                    } as React.CSSProperties
                  }
                  aria-hidden
                />
                <div
                  id={LANDING_ELEMENT_IDS.HERO_MODELING_TEXT_GROUP}
                  className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-10 pt-8 text-center md:pb-16 md:pt-12"
                  style={{
                    transform: `translateY(${SECTION1_HERO_TEXT_NUDGE_DOWN_PX}px)`,
                  }}
                >
                  <h1
                    className={`inline-block whitespace-nowrap ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
                    style={{
                      transform: `translateY(-${SECTION1_MODELING_TITLE_NUDGE_UP_PX}px)`,
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
                    className="hero-primary-subtitle-typography mt-4 shrink-0 md:mt-5"
                  >
                    {slide.subtitle}
                  </p>
                  <GetAQuoteButton
                    id={HERO_GET_QUOTE_BUTTON_ID}
                    variant="gold"
                    className="mt-6 shrink-0 md:mt-8"
                  />
                </div>
              </div>
              <div className="power-banners-section1-tail shrink-0" aria-hidden />
            </div>
          ) : slide.id === "rendering" ? (
            <div
              className="power-banners-section2-block relative overflow-hidden"
              data-landing-image={LANDING_IMAGE_IDS.HERO_RENDERING}
              style={
                {
                  ["--section2-hero-bg" as string]: `url("${slide.bg}")`,
                  ["--section2-text-cluster-nudge-mobile" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_LEFT_MOBILE_PX}px`,
                  ["--section2-text-cluster-nudge-md" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_LEFT_MD_PX}px`,
                } as React.CSSProperties
              }
            >
              <div className="relative z-10 flex h-full w-full flex-col items-end justify-center pl-6 pr-6 pt-16 pb-16 md:absolute md:right-0 md:top-[50%] md:max-w-[494px] md:h-auto md:-translate-y-1/2 md:pl-12 md:pr-[153px] md:pt-0 md:pb-0">
                <div className="power-banners-section2-text-cluster flex w-full flex-col items-end gap-8 text-right text-white">
                  <h1
                    className={`relative inline-block max-w-full translate-x-1 -translate-y-2.5 whitespace-nowrap text-right md:-translate-x-10 md:-translate-y-2.5 ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
                  >
                    <span
                      className="inline-block"
                      style={{
                        transform: `translateY(${SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX}px)`,
                      }}
                    >
                      {slide.title}
                    </span>
                  </h1>
                  <p
                    id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
                    className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] text-right"
                  >
                    <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_LINE1}</span>
                    <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_LINE2}</span>
                  </p>
                  <GetAQuoteButton
                    id={HERO_SECTION2_GET_QUOTE_BUTTON_ID}
                    variant="gold"
                    className="shrink-0"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden bg-[lightgray]"
                data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
                style={{
                  backgroundImage: `url("${slide.bg}")`,
                  backgroundPosition: `${DESIGN_SECTION_BG_POSITION_X_PX}px ${DESIGN_SECTION_BG_POSITION_Y_PX}px`,
                  backgroundSize: `${DESIGN_SECTION_BG_SIZE_WIDTH_PERCENT}% ${DESIGN_SECTION_BG_SIZE_HEIGHT_PERCENT}%`,
                  backgroundRepeat: "no-repeat",
                }}
                aria-hidden
              />
              <div
                className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12 ${
                  slide.contentAlign === "right"
                    ? "items-end text-right"
                    : slide.contentAlign === "left"
                      ? "items-start text-left"
                      : "items-center text-center"
                } ${slide.darkText ? "text-[#121212]" : "text-white"}`.trim()}
              >
                <h1
                  className={
                    slide.darkText
                      ? "max-w-[494px] font-black leading-[72px] tracking-[-1.8px] text-black text-[56px] md:text-[52px]"
                      : "max-w-[896px] font-black leading-[72px] tracking-[-1.8px] text-white text-[56px] md:text-[72px]"
                  }
                >
                  {slide.title}
                </h1>
                <p
                  className={
                    slide.darkText
                      ? "mt-8 max-w-[409px] font-light italic leading-[28px] text-[rgba(18,18,18,0.9)] text-[18px] md:text-[20px]"
                      : "mt-8 max-w-[672px] font-light italic leading-[28px] text-[rgba(255,255,255,0.9)] text-[18px] md:text-[20px]"
                  }
                >
                  {slide.subtitle}
                </p>
                <GetAQuoteButton className="mt-8 shrink-0" />
              </div>
            </>
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
