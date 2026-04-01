import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE_LINE1 = "Ancient & Heritag";
const TITLE_LINE2 = "Jewelry";

/** Mobile only (Figma): Inter, two lines; desktop copy unchanged. */
const TITLE_MOBILE_LINE1 = "Ancient &";
const TITLE_MOBILE_LINE2 = "Heritage Jewelry";

const DESCRIPTION_MOBILE =
  "Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks.";

const DESCRIPTION_LINES = [
  "Cultural and historical motifs re-engineered into structurally",
  "optimized, production-ready CAD frameworks.",
  "Authentic design language preserved through precise digital",
  "reconstruction and manufacturing awareness.",
] as const;

type ModelingBlockHeritageProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockHeritageProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HERITAGE}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-center"
                sizes="(max-width: 767px) 100vw, 0px"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 33vw"
                unoptimized
              />
            </div>
          </>
        )}
      </div>
      <div className="absolute inset-0 z-10 max-sm:translate-x-1.5 max-sm:translate-y-16">
        <h3 className="absolute right-0 top-12 z-10 flex max-w-full flex-col items-end text-black max-sm:-translate-y-6 max-sm:translate-x-0.5 max-sm:right-6 max-sm:w-[151px] max-sm:font-sans max-sm:text-[20px] max-sm:font-bold max-sm:leading-[28px] max-sm:tracking-[-0.449px] sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:tracking-normal sm:font-bold md:right-[2rem] md:top-[12.7rem] md:scale-x-105 md:origin-right">
          <span className="max-sm:translate-y-1 whitespace-nowrap sm:hidden">
            {TITLE_MOBILE_LINE1}
          </span>
          <span className="mt-1 whitespace-nowrap sm:hidden">{TITLE_MOBILE_LINE2}</span>
          <span className="hidden whitespace-nowrap sm:block">{TITLE_LINE1}</span>
          <span className="mt-2 hidden whitespace-nowrap sm:block">{TITLE_LINE2}</span>
        </h3>
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-black md:flex-row md:justify-end md:px-8 md:py-10">
          <p className="w-[151px] max-w-full self-end text-right font-sans text-[12px] font-light leading-4 text-[#364153] sm:hidden">
            {DESCRIPTION_MOBILE}
          </p>
          <div
            className="hidden max-w-[520px] text-right font-manrope text-[14px] font-light leading-[22px] text-black/70 sm:block md:mr-[0%] md:mt-[15.25rem]"
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
      </div>
    </article>
  );
}
