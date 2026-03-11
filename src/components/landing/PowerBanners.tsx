"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { GetAQuoteButton } from "./GetAQuoteButton";

/** Hero — Figma 92:319 (3d 1) + 92:267 (text block at x=849, y=295, 896×292) */
const HERO_BG_IMAGE = "/images/hero-3d-bg.png";

/** Figma 1920×883: content frame 92:267 at left=849 (44.22%), top=295 (33.41%), width=896 (46.67%) */
export function PowerBanners() {
  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative w-full overflow-hidden bg-[#1a1a1a] aspect-[1920/883]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_BG_IMAGE}
          alt=""
          className="absolute h-[127.56%] left-[-10.32%] max-w-none top-[-3.43%] w-[110.3%]"
          width={1920}
          height={1128}
          fetchPriority="high"
        />
      </div>

      {/* Content 92:267 — same position as Figma: left 44.22%, top 33.41%, width 46.67% (896px max) */}
      <div className="absolute left-[44.22%] top-[33.41%] z-10 w-[46.67%] max-w-[896px] flex flex-col gap-[32px] items-end">
        <h1 className="min-w-full shrink-0 text-right font-black leading-[72px] tracking-[-1.8px] text-white text-[clamp(2.5rem,5vw,72px)]">
          3D Production-Ready Modeling
        </h1>
        {/* 92:269 — Inter Light Italic, 20px, leading 28px, white/90, text-center */}
        <p className="min-w-full shrink-0 text-center font-light italic leading-[28px] text-white/90 text-[19px]">
          Engineered for casting, printing and precise stone setting. Every
          micron accounted for.
        </p>
        <GetAQuoteButton className="shrink-0" />
      </div>
    </section>
  );
}
