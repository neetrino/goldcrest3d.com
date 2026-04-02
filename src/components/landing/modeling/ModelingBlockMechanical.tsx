import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "Mechanical & Lock Systems";

/** Mobile only (Figma): Inter 12/300, width 283px. */
const DESCRIPTION_MOBILE =
  "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement.";

/** Desktop line breaks — match design baseline (left-aligned block, ragged right). */
const DESCRIPTION_LINES = [
  "Tolerance-calibrated clasps, hinges and",
  "multi-part articulated",
  "structures engineered for controlled",
  "movement and secure locking",
  "performance. Functional systems",
  "developed for durability, precision",
  "alignment and long-term",
  "mechanical reliability.",
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
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black max-sm:-translate-x-[calc(0.375rem*var(--ms,1))] max-sm:translate-y-[calc(72px*var(--ms,1))] md:gap-[calc(1.25rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] md:pt-[calc(3.25rem*var(--ms,1))]">
        <h3 className="z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-sm:whitespace-normal sm:w-full sm:max-w-[calc(520px*var(--ms,1))] sm:whitespace-nowrap sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal md:scale-x-105 md:origin-left">
          {TITLE}
        </h3>
        <p className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] sm:hidden">
          {DESCRIPTION_MOBILE}
        </p>
        <div
          className="hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:block"
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
