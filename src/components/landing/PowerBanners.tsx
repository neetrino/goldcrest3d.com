"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { GetAQuoteButton } from "./GetAQuoteButton";
import Image from "next/image";

const HERO_LOCAL_BG = "/images/hero-3d-bg.png";

const SLIDES: Array<{
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  contentAlign: "left" | "center" | "right";
  useRemote?: boolean;
}> = [
  {
    id: "modeling",
    title: "3D Production-Ready Modeling",
    subtitle:
      "Engineered for casting, printing and precise stone setting. Every micron accounted for.",
    bg: HERO_LOCAL_BG,
    contentAlign: "right",
  },
  {
    id: "rendering",
    title: "Jewelry Rendering",
    subtitle:
      "High-resolution assets for brand presentation and global sales. Perfection in every light ray.",
    bg: LANDING_IMAGES.heroRendering,
    contentAlign: "left",
    useRemote: true,
  },
  {
    id: "design",
    title: "Jewelry Design",
    subtitle:
      "Concept-to-CAD development for legacy collection building. Your vision, engineered.",
    bg: LANDING_IMAGES.heroDesign,
    contentAlign: "center",
    useRemote: true,
  },
];

export function PowerBanners() {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full bg-[#1a1a1a]"
      aria-label="Hero"
    >
      {SLIDES.map((slide) => (
        <div
          key={slide.id}
          className="relative flex min-h-[560px] w-full shrink-0 overflow-hidden md:min-h-[883px]"
        >
          <div className="absolute inset-0 pointer-events-none">
              {slide.useRemote ? (
                <Image
                  src={slide.bg}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={slide.id === "modeling"}
                  unoptimized
                />
              ) : (
                <Image
                  src={slide.bg}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              )}
            </div>
            <div
              className={
                slide.id === "rendering"
                  ? "relative z-10 flex w-full flex-col items-start justify-center gap-8 pl-6 pr-6 pt-16 pb-16 text-left text-white md:absolute md:left-0 md:top-[58%] md:max-w-[672px] md:-translate-y-1/2 md:pl-[153px] md:pr-12 md:pt-0 md:pb-0"
                  : `relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12 ${
                      slide.contentAlign === "right"
                        ? "items-end text-right"
                        : slide.contentAlign === "left"
                          ? "items-start text-left"
                          : "items-center text-center"
                    }`
              }
            >
              <h1
                className={
                  slide.id === "rendering"
                    ? "relative inline-block max-w-full font-black leading-[72px] tracking-[-1.8px] text-left text-white text-[56px] md:text-[72px] md:w-[651px]"
                    : "max-w-[896px] font-black leading-[72px] tracking-[-1.8px] text-white text-[56px] md:text-[72px]"
                }
              >
                {slide.title}
              </h1>
              <p
                className={
                  slide.id === "rendering"
                    ? "relative inline-block w-full max-w-[672px] text-left font-light italic leading-[28px] text-[rgba(255,255,255,0.9)] text-[18px] md:text-[20px]"
                    : "mt-8 max-w-[672px] font-light italic leading-[28px] text-[rgba(255,255,255,0.9)] text-[18px] md:text-[20px]"
                }
              >
                {slide.subtitle}
              </p>
              <GetAQuoteButton
                className={slide.id === "rendering" ? "w-[271.5px] shrink-0" : "mt-8 shrink-0"}
              />
            </div>
        </div>
      ))}
    </section>
  );
}
