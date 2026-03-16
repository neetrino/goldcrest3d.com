"use client";

import { LANDING_ELEMENT_IDS, LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { GetAQuoteButton, HERO_GET_QUOTE_BUTTON_ID } from "./GetAQuoteButton";
import Image from "next/image";

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
    subtitle:
      "High-resolution assets for brand presentation and global sales. Perfection in every light ray.",
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
        <div
          key={slide.id}
          className={`relative flex min-h-[460px] w-full shrink-0 flex-col overflow-hidden md:min-h-[720px] ${
            slide.id === "rendering" ? "-mt-[60px] md:-mt-[140px]" : ""
          }`}
        >
          {slide.id === "rendering" && (
            <div
              className="relative z-10 h-2 w-full shrink-0 bg-white"
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            data-landing-image={
              slide.id === "modeling"
                ? LANDING_IMAGE_IDS.HERO_MODELING
                : slide.id === "rendering"
                  ? LANDING_IMAGE_IDS.HERO_RENDERING
                  : LANDING_IMAGE_IDS.HERO_DESIGN
            }
          >
              {slide.id === "modeling" ? (
                <div className="absolute inset-y-0 left-1/2 w-[100%] -translate-x-1/2 -translate-y-18 scale-x-110 scale-y-110 md:-translate-y-28 md:scale-x-110 md:scale-y-110">
                  <Image
                    src={slide.bg}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 50%" }}
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </div>
              ) : slide.id === "rendering" ? (
                <div className="absolute inset-y-0 left-1/2 w-[115%] -translate-x-1/2">
                  <Image
                    src={slide.bg}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 60%" }}
                    sizes="100vw"
                    priority={false}
                    unoptimized
                  />
                </div>
              ) : (
                <Image
                  src={slide.bg}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={slide.id === "modeling"}
                  unoptimized
                />
              )}
            </div>
            {/* Text overlay: modeling = centered below jewelry (reference layout); others = existing placement */}
            {slide.id === "modeling" ? (
              <div
                id={LANDING_ELEMENT_IDS.HERO_MODELING_TEXT_GROUP}
                className="relative z-10 flex min-h-full w-full -translate-y-8 flex-col items-center justify-end px-6 pb-12 pt-12 text-center md:-translate-y-14 md:pb-20 md:pt-16"
              >
                <div className="flex w-full justify-center">
                  <h1 className="mt-96 -translate-y-2 whitespace-nowrap font-black leading-tight tracking-tight text-white text-[28px] md:mt-[28rem] md:text-[36px] md:leading-[1.1] md:tracking-[-1.8px] md:text-[48px] md:-translate-y-4">
                    {slide.title}
                  </h1>
                </div>
                <p
                  id={LANDING_ELEMENT_IDS.HERO_MODELING_SUBTITLE}
                  className="mt-5 -translate-y-0.5 whitespace-nowrap font-normal leading-tight text-[#b0b0b0] text-[17px] md:mt-6 md:-translate-y-1 md:text-[18px] md:leading-snug"
                >
                  {slide.subtitle}
                </p>
                <GetAQuoteButton id={HERO_GET_QUOTE_BUTTON_ID} variant="gold" className="mt-6 shrink-0 md:mt-8" />
              </div>
            ) : (
              <div
                className={
                  slide.id === "rendering"
                    ? "relative z-10 flex w-full flex-col items-end justify-center gap-8 pl-6 pr-6 pt-16 pb-16 text-right text-white md:absolute md:right-0 md:top-[58%] md:max-w-[494px] md:-translate-y-1/2 md:pl-12 md:pr-[153px] md:pt-0 md:pb-0"
                    : `relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12 ${
                        slide.contentAlign === "right"
                          ? "items-end text-right"
                          : slide.contentAlign === "left"
                            ? "items-start text-left"
                            : "items-center text-center"
                      } ${slide.darkText ? "text-[#121212]" : "text-white"}`.trim()
                }
              >
                <h1
                  className={
                    slide.id === "rendering"
                      ? "relative inline-block max-w-full whitespace-nowrap font-black leading-[72px] tracking-[-1.8px] text-right text-white text-[56px] md:text-[52px] md:w-[494px]"
                      : slide.darkText
                        ? "max-w-[494px] font-black leading-[72px] tracking-[-1.8px] text-black text-[56px] md:text-[52px]"
                        : "max-w-[896px] font-black leading-[72px] tracking-[-1.8px] text-white text-[56px] md:text-[72px]"
                  }
                >
                  {slide.title}
                </h1>
                <p
                  className={
                    slide.id === "rendering"
                      ? "relative inline-block w-full max-w-[433px] text-right font-light italic leading-[28px] text-[rgba(255,255,255,0.9)] text-[18px] md:text-[20px]"
                      : slide.darkText
                        ? "mt-8 max-w-[409px] font-light italic leading-[28px] text-[rgba(18,18,18,0.9)] text-[18px] md:text-[20px]"
                        : "mt-8 max-w-[672px] font-light italic leading-[28px] text-[rgba(255,255,255,0.9)] text-[18px] md:text-[20px]"
                  }
                >
                  {slide.subtitle}
                </p>
                <GetAQuoteButton
                  className={slide.id === "rendering" ? "w-[190px] shrink-0" : "mt-8 shrink-0"}
                />
              </div>
            )}
        </div>
      ))}
    </section>
  );
}
