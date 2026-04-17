import Image from "next/image";
import type { CSSProperties } from "react";

import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import type { ModelingBlockViewport } from "./ModelingBlockHipHop";
import { ModelingPlainText } from "./ModelingPlainText";

const MOBILE_OVERLAY_TRANSLATE_Y_PX = 100;

const TITLE_LINE1 = "Mechanical &";
const TITLE_LINE2 = "Lock Systems";

const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "md:-translate-y-1.5";

const DESCRIPTION_MOBILE_LINES = [
  "Tolerance-calibrated clasps, hinges and",
  "multi-part articulated structures",
  "engineered for controlled movement.",
] as const;

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
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockMechanicalProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const t1 = managed?.titleLine1 ?? TITLE_LINE1;
  const t2 = managed?.titleLine2 ?? TITLE_LINE2;
  const mobileImgWrap = emulateMobileChrome
    ? "absolute inset-0 block"
    : "absolute inset-0 md:hidden";
  const desktopImgWrap = emulateMobileChrome
    ? "absolute inset-0 hidden"
    : "absolute inset-0 hidden md:block";
  const overlayClass = emulateMobileChrome
    ? "absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black -translate-x-[calc(0.375rem*var(--ms,1))] translate-y-[calc(var(--mechanical-overlay-ty)*var(--ms,1))]"
    : "absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black max-sm:-translate-x-[calc(0.375rem*var(--ms,1))] max-sm:translate-y-[calc(var(--mechanical-overlay-ty)*var(--ms,1))] md:gap-[calc(1.25rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] md:pt-[calc(3.25rem*var(--ms,1))]";
  const mobileLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...DESCRIPTION_MOBILE_LINES];
  const desktopLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...DESCRIPTION_LINES];

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
            <div className={mobileImgWrap}>
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-[56%_center]"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className={desktopImgWrap}>
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
        className={overlayClass}
        style={
          {
            ["--mechanical-overlay-ty" as string]: `${MOBILE_OVERLAY_TRANSLATE_Y_PX}px`,
          } as CSSProperties
        }
      >
        <h3
          className={
            viewport === "mobile"
              ? "z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px]"
              : "z-10 w-full max-w-[calc(520px*var(--ms,1))] shrink-0 text-left font-manrope text-[calc(32px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(24px*var(--ms,1)*var(--mt,1))] tracking-normal md:scale-x-105 md:origin-left"
          }
        >
          <span
            className={`block ${viewport === "desktop" && !emulateMobileChrome ? TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS : ""}`}
          >
            <ModelingPlainText text={t1} />
          </span>
          <span className="block">
            <ModelingPlainText text={t2} />
          </span>
        </h3>
        {viewport === "mobile" ? (
          <p className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))]">
            {mobileLines.map((line, i) => (
              <span key={i} className="block">
                {line.length === 0 ? "\u00A0" : line}
              </span>
            ))}
          </p>
        ) : null}
        {viewport === "desktop" ? (
          <div
            className="w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))]"
            style={{ overflow: "visible" }}
          >
            {desktopLines.map((line, i) => (
              <span key={i} className="block whitespace-pre-line">
                {line.length === 0 ? "\u00A0" : line}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
