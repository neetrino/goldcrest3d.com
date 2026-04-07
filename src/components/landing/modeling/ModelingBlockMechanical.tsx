import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

/** Mobile-only overlay nudge down (`max-sm:translate-y`); paired with `--mechanical-overlay-ty`. */
const MOBILE_OVERLAY_TRANSLATE_Y_PX = 100;

const TITLE_LINE1 = "Mechanical &";
const TITLE_LINE2 = "Lock Systems";

/** Desktop (md+): nudge first title line up without shifting the rest of the overlay. */
const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "md:-translate-y-1.5";

/** Mobile only: Inter 12/300, width 283px; explicit line breaks. */
const DESCRIPTION_MOBILE_LINES = [
  "Tolerance-calibrated clasps, hinges and",
  "multi-part articulated structures",
  "engineered for controlled movement.",
] as const;

/** Desktop line breaks â€” match design baseline (left-aligned block, ragged right). */
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
            className="h-full w-full object-cover max-md:object-[56%_center] md:object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-[56%_center]"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black max-sm:-translate-x-[calc(0.375rem*var(--ms,1))] max-sm:translate-y-[calc(var(--mechanical-overlay-ty)*var(--ms,1))] md:gap-[calc(1.25rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] md:pt-[calc(3.25rem*var(--ms,1))]"
        style={
          {
            ["--mechanical-overlay-ty" as string]: `${MOBILE_OVERLAY_TRANSLATE_Y_PX}px`,
          } as React.CSSProperties
        }
      >
        <h3 className="z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-sm:whitespace-normal sm:w-full sm:max-w-[calc(520px*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal md:scale-x-105 md:origin-left">
          <span className={`block ${TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS}`}>
            {TITLE_LINE1}
          </span>
          <span className="block">{TITLE_LINE2}</span>
        </h3>
        <p className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] sm:hidden">
          {DESCRIPTION_MOBILE_LINES.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
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
