import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

const TITLE_LINE1 = "Ancient & Heritag";
const TITLE_LINE2 = "Jewelry";
const DESCRIPTION_LINES = [
  "Cultural and historical motifs re-engineered into structurally",
  "optimized, production-ready CAD frameworks.",
  "Authentic design language preserved through precise digital",
  "reconstruction and manufacturing awareness.",
] as const;

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage() {
  return (
    <article
      className="relative min-w-0 w-full overflow-hidden"
      style={{
        ...getModelingCardWidthStyle(),
        aspectRatio: MODELING_CARD_ASPECT_RATIO,
      }}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HERITAGE}
      >
        <Image
          src={LANDING_IMAGES.modelingHeritage}
          alt=""
          fill
          className="object-cover object-left"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
      <h3
        className="absolute right-0 top-12 z-10 flex flex-col items-end font-manrope text-[32px] font-bold leading-[24px] text-black md:right-[2rem] md:top-[12.7rem] md:scale-x-105 md:origin-right"
      >
        <span className="whitespace-nowrap">{TITLE_LINE1}</span>
        <span className="mt-2 whitespace-nowrap">{TITLE_LINE2}</span>
      </h3>
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-black md:flex-row md:justify-end md:px-8 md:py-10">
        <div
          className="max-w-[520px] text-right font-manrope text-[14px] font-light leading-[22px] text-black/70 md:mr-[0%] md:mt-[15.25rem]"
          style={{ overflow: "visible" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap justify-end items-baseline gap-x-2 gap-y-1">
              <span>{DESCRIPTION_LINES[0]}</span>
              <span>{DESCRIPTION_LINES[1]}</span>
            </div>
            <div className="-mt-2 flex flex-wrap justify-end items-baseline gap-x-2 gap-y-1">
              <span>{DESCRIPTION_LINES[2]}</span>
              <span>{DESCRIPTION_LINES[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
