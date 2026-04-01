import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "Mechanical & Lock Systems";

/** Mobile only (Figma): Inter 12/300, width 283px. */
const DESCRIPTION_MOBILE =
  "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement.";

const DESCRIPTION_LINES = [
  "Tolerance-calibrated clasps, hinges and multi-part articulated",
  "structures engineered for controlled movement and secure locking",
  "performance. Functional systems developed for durability, precision alignment",
  "and long-term mechanical reliability.",
] as const;

type ModelingBlockMechanicalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockMechanicalProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
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
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-white max-sm:-translate-x-1.5 max-sm:translate-y-[72px] max-sm:gap-4 md:flex-row md:justify-end md:px-8 md:py-10">
        <h3 className="z-10 w-[283px] max-w-full text-left font-sans text-[20px] font-bold leading-[28px] tracking-[-0.449px] text-white max-sm:translate-y-2.5 max-sm:shrink-0 max-sm:whitespace-normal sm:absolute sm:right-6 sm:top-6 sm:max-w-none sm:text-right sm:whitespace-nowrap sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:tracking-normal md:right-[21rem] md:top-[3.25rem] md:scale-x-105 md:origin-right">
          {TITLE}
        </h3>
        <p className="w-[283px] max-w-full shrink-0 text-left font-sans text-[12px] font-light leading-4 text-white sm:hidden">
          {DESCRIPTION_MOBILE}
        </p>
        <div
          className="hidden max-w-[520px] text-left font-manrope text-[14px] font-light leading-[22px] sm:block md:mr-[34%] md:mt-[3.75rem]"
          style={{ overflow: "visible" }}
        >
          {DESCRIPTION_LINES.map((line, i) => (
            <span key={i} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
