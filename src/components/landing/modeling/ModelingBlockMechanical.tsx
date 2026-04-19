import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

/** Mobile-only overlay nudge down (`max-sm:translate-y`); paired with `--mechanical-overlay-ty`. */
const MOBILE_OVERLAY_TRANSLATE_Y_PX = 100;

/** Desktop (md+): nudge first title line up without shifting the rest of the overlay. */
const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "md:-translate-y-1.5";
const TITLE_MOBILE_NUDGE_DOWN_CLASS = "max-sm:mt-[calc(1.25rem*var(--ms,1))]";
const OVERLAY_DESKTOP_NUDGE_UP_CLASS = "sm:-translate-y-[calc(1.5rem*var(--ms,1))]";

type ModelingBlockMechanicalProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  descriptionLinesDesktop,
  descriptionLinesMobile,
}: ModelingBlockMechanicalProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const hasDesktopTitle = titleDesktop.trim().length > 0;
  const hasMobileTitle = titleMobile.trim().length > 0;
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
        className={`absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black max-sm:-translate-x-[calc(0.375rem*var(--ms,1))] max-sm:translate-y-[calc(var(--mechanical-overlay-ty)*var(--ms,1))] md:gap-[calc(1.25rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] md:pt-[calc(3.25rem*var(--ms,1))] ${OVERLAY_DESKTOP_NUDGE_UP_CLASS}`}
        style={
          {
            ["--mechanical-overlay-ty" as string]: `${MOBILE_OVERLAY_TRANSLATE_Y_PX}px`,
          } as React.CSSProperties
        }
      >
        {hasMobileTitle || hasDesktopTitle ? (
          <h3 className={`z-10 h-[calc(28px*var(--ms,1)*var(--mt,1))] w-[calc(283px*var(--ms,1))] max-w-full shrink-0 overflow-visible text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-sm:whitespace-normal sm:h-[calc(24px*var(--ms,1)*var(--mt,1))] sm:w-full sm:max-w-[calc(520px*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal md:scale-x-105 md:origin-left ${TITLE_MOBILE_NUDGE_DOWN_CLASS}`}>
            {hasMobileTitle ? (
              <span
                className={`block whitespace-pre-wrap sm:hidden ${TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS}`}
              >
                {renderModelingTitleText(titleMobile)}
              </span>
            ) : null}
            {hasDesktopTitle ? (
              <span className={`hidden whitespace-pre-wrap sm:block ${TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS}`}>
                {renderModelingTitleText(titleDesktop)}
              </span>
            ) : null}
          </h3>
        ) : null}
        {descriptionLinesMobile.length > 0 ? (
          <p className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] sm:hidden">
            {descriptionLinesMobile.map((line, i) => (
              <span key={i} className="block">
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </p>
        ) : null}
        {descriptionLinesDesktop.length > 0 ? (
          <div
            className="hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:block lg:-translate-y-[calc(1rem*var(--ms,1))]"
            style={{ overflow: "visible" }}
          >
            {descriptionLinesDesktop.map((line, i) => (
            <span key={i} className="block whitespace-nowrap">
              {renderModelingCopyLine(line)}
            </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
