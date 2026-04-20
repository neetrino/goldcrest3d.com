import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

type ModelingBlockHeritageProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
};

type HeritageOverlayTextProps = {
  titleDesktop: string;
  titleMobile: string;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
};

function HeritageOverlayText({
  titleDesktop,
  titleMobile,
  descriptionLinesDesktop,
  descriptionLinesMobile,
}: HeritageOverlayTextProps) {
  const hasMobileTitle = titleMobile.trim().length > 0;
  const hasDesktopTitle = titleDesktop.trim().length > 0;
  return (
    <div className="absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]">
      <div className="-translate-x-[calc(0.3rem*var(--ms,1))] -translate-y-[calc(0rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black md:-translate-x-[calc(1.5rem*var(--ms,1))] md:mt-[calc(12.7rem*var(--ms,1))] md:-translate-y-[calc(4.15rem*var(--ms,1))]">
        {hasDesktopTitle || hasMobileTitle ? (
          <h3 className="mt-[calc(2.25rem*var(--ms,1))] h-[calc(20px*var(--ms,1)*var(--mt,1))] overflow-visible font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] sm:mt-0 sm:h-[calc(24px*var(--ms,1)*var(--mt,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-right sm:tracking-normal sm:font-extrabold">
            {hasMobileTitle ? (
              <span className="block whitespace-pre-wrap text-right translate-y-[calc(2.75rem*var(--ms,1))] sm:hidden">
                {renderModelingTitleText(titleMobile)}
              </span>
            ) : null}
            {hasDesktopTitle ? (
              <span className="hidden whitespace-pre-wrap sm:inline">{renderModelingTitleText(titleDesktop)}</span>
            ) : null}
          </h3>
        ) : null}
        {descriptionLinesMobile.length > 0 || descriptionLinesDesktop.length > 0 ? (
          <p className="mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:mt-[calc(1rem*var(--ms,1))] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black">
            {descriptionLinesMobile.map((line, index) => (
              <span key={`mobile-${index}`} className="block whitespace-nowrap sm:hidden">
                {renderModelingCopyLine(line)}
              </span>
            ))}
            {descriptionLinesDesktop.map((line, index) => (
              <span key={`desktop-${index}`} className="hidden whitespace-nowrap sm:block">
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  descriptionLinesDesktop,
  descriptionLinesMobile,
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
      <HeritageOverlayText
        titleDesktop={titleDesktop}
        titleMobile={titleMobile}
        descriptionLinesDesktop={descriptionLinesDesktop}
        descriptionLinesMobile={descriptionLinesMobile}
      />
    </article>
  );
}
