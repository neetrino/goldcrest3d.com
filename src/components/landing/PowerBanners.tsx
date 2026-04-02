"use client";

import { Fragment } from "react";
import { LANDING_ELEMENT_IDS, LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
  HERO_SECTION2_GET_QUOTE_BUTTON_ID,
  HERO_SECTION3_GET_QUOTE_BUTTON_ID,
} from "./GetAQuoteButton";

/** Section1 — ներքևի լրացում (px), նկարի ֆրեյմը չի փոխվում */
const SECTION1_TAIL_MIN_HEIGHT_PX = 120;

/** Section1 — միայն հերո-նկարը դեպի ներքև (px), background-position Y */
const SECTION1_HERO_BG_NUDGE_DOWN_PX = 16;

/** Section1 — նկարը դեպի վեր (px); բլոկի չափը չի փոխվում, strip-ը overflow:hidden */
const SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX = 40;

/** Section1 — նկարի մասշտաբ (1 = նույնը); բլոկի չափը չի փոխվում, overflow-ով կտրվում է */
const SECTION1_HERO_BG_SCALE = 1.08;
const SECTION1_HERO_BG_MOBILE_PATH = "/images/modeling/block1-mobile.png";

/** Section1 — վերնագիր, ենթավերնագիր, CTA դեպի ներքև (translateY, px); ցածր արժեք = ավելի վերև */
const SECTION1_HERO_TEXT_NUDGE_DOWN_PX = 22;

/** Միայն modeling վերնագիր — translateY(-N); ցածր N = ավելի ներքև */
const SECTION1_MODELING_TITLE_NUDGE_UP_PX = 0;

/** Հերո գլխավոր վերնագիր — մասշտաբ (գույնը առանձին) */
const HERO_PRIMARY_TITLE_TYPOGRAPHY_CORE_CLASS =
  "font-black leading-tight text-[24px] tracking-[-0.006em] md:text-[42px] md:leading-[1.1] md:[letter-spacing:-1.28px]";

/** Modeling, Jewelry Rendering — սպիտակ ֆոնի վրա */
const HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS = `${HERO_PRIMARY_TITLE_TYPOGRAPHY_CORE_CLASS} text-white`;

/** Explicit two-line copy for Jewelry Rendering subtitle; line break is intentional. */
const RENDERING_SUBTITLE_LINE1 = "High-resolution assets for brand presentation";
const RENDERING_SUBTITLE_LINE2 = "and global sales. Perfection in every light ray.";
const RENDERING_SUBTITLE_MOBILE_LINE1 = "High-resolution assets for";
const RENDERING_SUBTITLE_MOBILE_LINE2 = "brand presentation and";
const RENDERING_SUBTITLE_MOBILE_LINE3 = "global sales. Perfection in";
const RENDERING_SUBTITLE_MOBILE_LINE4 = "every light ray.";

/** Explicit two-line copy for Jewelry Design subtitle; line break is intentional. */
const DESIGN_SUBTITLE_LINE1 = "Concept-to-CAD development for legacy";
const DESIGN_SUBTITLE_LINE2 = "collection building. Your vision, engineered.";

/** Միայն Jewelry Design ենթավերնագիր — դեպի վերև (Tailwind -translate-y-4 ≈ 16px) */
const DESIGN_SECTION_SUBTITLE_NUDGE_UP_CLASS = "-translate-y-4";

/** Section2 — text column left; cluster nudge disabled (padding handles inset). */
const SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX = 0;
const SECTION2_TEXT_CLUSTER_NUDGE_MD_PX = 0;
const SECTION2_HERO_BG_MOBILE_PATH = "/images/rendering/block2-mobile.png";

/** Section2 — Jewelry Rendering ֆոնի մասշտաբ (լայնություն+բարձրություն համամասնորեն); բլոկը նույնը */
const SECTION2_HERO_BG_SCALE = 1.22;

/** Section2 — ֆոնի նկարը դեպի վեր (px); միայն նկարը, բլոկը նույնը */
const SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX = 76;

/** Section2 — ֆոնի նկարը դեպի ձախ (px); translateX բացասական */
const SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX = 88;

/** Միայն «Jewelry Rendering» վերնագիր — դեպի ներքև (px) */
const SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX = 10;

const SECTION3_HERO_BG_MOBILE_PATH = "/images/design/block3-mobile-original.png";

/**
 * md+ anchor for Jewelry Design text column (`top` with `-translate-y-1/2`).
 * Higher % = block lower in the hero frame.
 */
const SECTION3_TEXT_COLUMN_TOP_MD_CLASS = "md:top-[47%]";

const SLIDES: Array<{
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  contentAlign: "left" | "center" | "right";
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
  },
  {
    id: "rendering",
    title: "Jewelry Rendering",
    subtitle: `${RENDERING_SUBTITLE_LINE1} ${RENDERING_SUBTITLE_LINE2}`,
    bg: LANDING_IMAGES.heroRendering,
    contentAlign: "right",
  },
  {
    id: "design",
    title: "Jewelry Design",
    subtitle: `${DESIGN_SUBTITLE_LINE1} ${DESIGN_SUBTITLE_LINE2}`,
    bg: LANDING_IMAGES.heroDesign,
    contentAlign: "left",
    darkText: true,
  },
];

export function PowerBanners() {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-white"
      aria-label="Hero"
    >
      {SLIDES.map((slide) => (
        <Fragment key={slide.id}>
        <div
          className={`relative flex w-full shrink-0 flex-col overflow-hidden ${
            slide.id === "modeling"
              ? "items-center bg-white"
              : slide.id === "rendering"
                ? "min-h-0 bg-white md:h-auto"
                : slide.id === "design"
                  ? "min-h-0 bg-white md:h-auto"
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
                className="power-banners-section1-image-strip bg-white"
                data-landing-image={LANDING_IMAGE_IDS.HERO_MODELING}
              >
                <div
                  className="power-banners-section1-bg pointer-events-none absolute inset-0"
                  style={
                    {
                      ["--section1-hero-bg" as string]: `url("${slide.bg}")`,
                      ["--section1-hero-bg-mobile" as string]: `url("${SECTION1_HERO_BG_MOBILE_PATH}")`,
                      ["--section1-bg-nudge-y" as string]: `${SECTION1_HERO_BG_NUDGE_DOWN_PX}px`,
                      ["--section1-hero-bg-translate-y" as string]: `-${SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX}px`,
                      ["--section1-hero-bg-scale" as string]: String(SECTION1_HERO_BG_SCALE),
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
                    className={`inline-block max-w-[min(100%,36rem)] whitespace-normal text-balance md:max-w-none ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
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
                  ["--section2-hero-bg-mobile" as string]: `url("${SECTION2_HERO_BG_MOBILE_PATH}")`,
                  ["--section2-hero-bg-scale" as string]: String(SECTION2_HERO_BG_SCALE),
                  ["--section2-hero-bg-translate-y" as string]: `-${SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX}px`,
                  ["--section2-hero-bg-translate-x" as string]: `-${SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX}px`,
                  ["--section2-text-cluster-nudge-mobile" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX}px`,
                  ["--section2-text-cluster-nudge-md" as string]: `${SECTION2_TEXT_CLUSTER_NUDGE_MD_PX}px`,
                } as React.CSSProperties
              }
            >
              <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto md:top-[38%] md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20">
                <div className="power-banners-section2-text-cluster flex w-full flex-col items-end gap-8 text-right text-white">
                  <h1
                    className={`relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-right md:-translate-y-2.5 md:whitespace-nowrap ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
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
                    className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] self-end text-right"
                  >
                    <span className="md:hidden">
                      <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_MOBILE_LINE1}</span>
                      <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_MOBILE_LINE2}</span>
                      <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_MOBILE_LINE3}</span>
                      <span className="block whitespace-nowrap">{RENDERING_SUBTITLE_MOBILE_LINE4}</span>
                    </span>
                    <span className="hidden md:block">
                      <span className="block md:whitespace-nowrap">{RENDERING_SUBTITLE_LINE1}</span>
                      <span className="block md:whitespace-nowrap">{RENDERING_SUBTITLE_LINE2}</span>
                    </span>
                  </p>
                  <GetAQuoteButton
                    id={HERO_SECTION2_GET_QUOTE_BUTTON_ID}
                    variant="gold"
                    className="shrink-0 self-end"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="power-banners-section3-block relative overflow-hidden"
              data-landing-image={LANDING_IMAGE_IDS.HERO_DESIGN}
              style={
                {
                  ["--section3-hero-bg" as string]: `url("${slide.bg}")`,
                  ["--section3-hero-bg-mobile" as string]: `url("${SECTION3_HERO_BG_MOBILE_PATH}")`,
                } as React.CSSProperties
              }
            >
              <div
                className={`relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto ${SECTION3_TEXT_COLUMN_TOP_MD_CLASS} md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20`}
              >
                <div className="power-banners-section3-text-cluster flex w-full flex-col items-start gap-7 text-left text-[#121212] md:gap-8">
                  <h1 className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal text-balance md:whitespace-nowrap">
                    {slide.title}
                  </h1>
                  <div className="flex w-full flex-col items-start gap-0.5 md:gap-1">
                    <p
                      className={`hero-primary-subtitle-typography-design max-w-[433px] self-start text-left ${DESIGN_SECTION_SUBTITLE_NUDGE_UP_CLASS}`}
                    >
                      <span className="block">{DESIGN_SUBTITLE_LINE1}</span>
                      <span className="block">{DESIGN_SUBTITLE_LINE2}</span>
                    </p>
                    <GetAQuoteButton
                      id={HERO_SECTION3_GET_QUOTE_BUTTON_ID}
                      variant="gold"
                      className="shrink-0 self-start"
                    />
                  </div>
                </div>
              </div>
            </div>
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
