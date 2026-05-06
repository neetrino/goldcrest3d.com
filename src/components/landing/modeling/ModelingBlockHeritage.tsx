import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_ARTICLE_SHELL_CLASSES,
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  modelingBodyLinesForLgViewport,
  modelingCopyTranslatePercent,
  modelingTitleForLgViewport,
} from "./modeling-card.constants";
import {
  modelingCmsMobileBodyFontStyle,
  modelingCmsMobileTitleFontStyle,
} from "./modeling-cms-mobile-font-style";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

type ModelingBlockHeritageProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageUrlTablet: string;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleDesktopOffsetX: number;
  titleMobileOffsetY: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetY: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};

type HeritageOverlayTextProps = {
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleDesktopOffsetX: number;
  titleMobileOffsetY: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetY: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};

function HeritageOverlayText({
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleDesktopOffsetX,
  titleMobileOffsetY,
  titleMobileOffsetX,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyDesktopOffsetX,
  bodyMobileOffsetY,
  bodyMobileOffsetX,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
}: HeritageOverlayTextProps) {
  const titleTabletResolved = titleTablet.trim();
  const descTabletLines = descriptionLinesTablet.some((l) => l.trim().length > 0)
    ? descriptionLinesTablet
    : [];

  const hasMobileTitle = titleMobile.trim().length > 0;
  const hasDesktopTitle = titleDesktop.trim().length > 0;
  const hasTabletTitle = titleTabletResolved.length > 0;
  const titleForLg = modelingTitleForLgViewport(titleDesktop, titleTabletResolved, titleMobile);
  const showLgTitle = titleForLg.length > 0;
  const linesForLgHeritage = modelingBodyLinesForLgViewport(
    descriptionLinesDesktop,
    descTabletLines,
    descriptionLinesMobile,
  );

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]">
      <div className="-translate-x-[calc(0.3rem*var(--ms,1))] -translate-y-[calc(0rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black md:-translate-x-[calc(1.5rem*var(--ms,1))] md:mt-[calc(12.7rem*var(--ms,1))] md:-translate-y-[calc(4.15rem*var(--ms,1))]">
        {hasDesktopTitle || hasMobileTitle || hasTabletTitle ? (
          <h3 className="mt-[calc(2.25rem*var(--ms,1))] h-[calc(20px*var(--ms,1)*var(--mt,1))] overflow-visible font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] md:mt-0 md:h-[calc(24px*var(--ms,1)*var(--mt,1))] md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:scale-x-105 md:origin-right md:tracking-normal md:font-extrabold lg:font-manrope">
            {hasMobileTitle ? (
              <span
                className="block md:hidden"
                style={{
                  transform: modelingCopyTranslatePercent(titleMobileOffsetX, titleMobileOffsetY),
                }}
              >
                <span
                  className="block whitespace-pre-wrap text-right translate-y-[calc(2.75rem*var(--ms,1))] md:hidden"
                  style={modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx)}
                >
                  {renderModelingTitleText(titleMobile)}
                </span>
              </span>
            ) : null}
            {hasTabletTitle ? (
              <span
                className="hidden md:inline-block lg:hidden"
                style={{
                  transform: modelingCopyTranslatePercent(titleTabletOffsetX, titleTabletOffsetY),
                }}
              >
                <span className="hidden whitespace-pre-wrap md:inline-block lg:hidden">
                  {renderModelingTitleText(titleTabletResolved)}
                </span>
              </span>
            ) : null}
            {showLgTitle ? (
              <span
                className="hidden lg:inline-block"
                style={{
                  transform: modelingCopyTranslatePercent(titleDesktopOffsetX, titleDesktopOffsetY),
                }}
              >
                <span className="hidden whitespace-pre-wrap lg:inline-block">
                  {renderModelingTitleText(titleForLg)}
                </span>
              </span>
            ) : null}
          </h3>
        ) : null}
        {descriptionLinesMobile.length > 0 ||
        descTabletLines.length > 0 ||
        linesForLgHeritage.length > 0 ? (
          <div>
            <div
              style={{
                transform: modelingCopyTranslatePercent(bodyMobileOffsetX, bodyMobileOffsetY),
              }}
            >
              <p
                className="mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(0.8125rem*var(--ms,1)*var(--mt,1))] text-[#364153] md:hidden"
                style={modelingCmsMobileBodyFontStyle(mobilePreviewBodyFontPx)}
              >
                {descriptionLinesMobile.map((line, index) => (
                  <span key={`mobile-${index}`} className="block whitespace-nowrap">
                    {renderModelingCopyLine(line)}
                  </span>
                ))}
              </p>
            </div>
            <div
              style={{
                transform: modelingCopyTranslatePercent(bodyTabletOffsetX, bodyTabletOffsetY),
              }}
            >
              <p className="mt-[calc(3.5rem*var(--ms,1))] hidden w-[calc(470px*var(--ms,1))] max-w-full font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black md:block lg:hidden">
                {descTabletLines.map((line, index) => (
                  <span key={`tablet-${index}`} className="block whitespace-nowrap">
                    {renderModelingCopyLine(line)}
                  </span>
                ))}
              </p>
            </div>
            <div
              style={{
                transform: modelingCopyTranslatePercent(bodyDesktopOffsetX, bodyDesktopOffsetY),
              }}
            >
              <p className="mt-[calc(1rem*var(--ms,1))] hidden w-[calc(470px*var(--ms,1))] max-w-full font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black lg:block">
                {linesForLgHeritage.map((line, index) => (
                  <span key={`desktop-${index}`} className="block whitespace-nowrap">
                    {renderModelingCopyLine(line)}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage({
  imageUrlDesktop,
  imageUrlMobile,
  imageUrlTablet,
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleDesktopOffsetX,
  titleMobileOffsetY,
  titleMobileOffsetX,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyDesktopOffsetX,
  bodyMobileOffsetY,
  bodyMobileOffsetX,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
}: ModelingBlockHeritageProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile && imageUrlDesktop === imageUrlTablet;
  return (
    <article
      className={`${MODELING_CARD_ARTICLE_SHELL_CLASSES} ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
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
            <div className="absolute inset-0 hidden md:block lg:hidden">
              <Image
                src={imageUrlTablet}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 1023px) 50vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(min-width: 1024px) 33vw, 0px"
              />
            </div>
          </>
        )}
      </div>
      <HeritageOverlayText
        titleDesktop={titleDesktop}
        titleMobile={titleMobile}
        titleTablet={titleTablet}
        titleDesktopOffsetY={titleDesktopOffsetY}
        titleDesktopOffsetX={titleDesktopOffsetX}
        titleMobileOffsetY={titleMobileOffsetY}
        titleMobileOffsetX={titleMobileOffsetX}
        titleTabletOffsetY={titleTabletOffsetY}
        titleTabletOffsetX={titleTabletOffsetX}
        descriptionLinesDesktop={descriptionLinesDesktop}
        descriptionLinesMobile={descriptionLinesMobile}
        descriptionLinesTablet={descriptionLinesTablet}
        bodyDesktopOffsetY={bodyDesktopOffsetY}
        bodyDesktopOffsetX={bodyDesktopOffsetX}
        bodyMobileOffsetY={bodyMobileOffsetY}
        bodyMobileOffsetX={bodyMobileOffsetX}
        bodyTabletOffsetY={bodyTabletOffsetY}
        bodyTabletOffsetX={bodyTabletOffsetX}
        mobilePreviewTitleFontPx={mobilePreviewTitleFontPx}
        mobilePreviewBodyFontPx={mobilePreviewBodyFontPx}
      />
    </article>
  );
}
