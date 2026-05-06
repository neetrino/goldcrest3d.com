"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useState } from "react";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_ARTICLE_SHELL_CLASSES,
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  modelingBodyLinesForLgViewport,
  modelingCopyTranslatePercent,
  modelingTitleForLgViewport,
} from "./modeling-card.constants";
import {
  mergeCssProperties,
  modelingCmsMobileBodyFontStyle,
  modelingCmsMobileTitleFontStyle,
} from "./modeling-cms-mobile-font-style";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

/** Mobile-only overlay nudge down (`max-sm:translate-y`); paired with `--mechanical-overlay-ty`. */
const MOBILE_OVERLAY_TRANSLATE_Y_PX = 100;
const MOBILE_OVERLAY_TRANSLATE_Y_ANDROID_PX = 70;

/** Desktop (lg+): nudge first title line up without shifting the rest of the overlay. */
const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "lg:-translate-y-1.5";
/** Tablet (md–lg): align with tablet typography tier. */
const TITLE_LINE1_TABLET_NUDGE_UP_CLASS = "md:-translate-y-1.5";
const TITLE_MOBILE_NUDGE_DOWN_CLASS = "max-sm:mt-[calc(1.25rem*var(--ms,1))]";
const OVERLAY_TABLET_DESKTOP_NUDGE_UP_CLASS =
  "md:-translate-y-[calc(1.5rem*var(--ms,1))] lg:-translate-y-[calc(1.5rem*var(--ms,1))]";

type ModelingBlockMechanicalProps = {
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
  isAndroidViewport: boolean;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
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
  isAndroidViewport,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
}: ModelingBlockMechanicalProps) {
  const [isAndroidClient] = useState(() => {
    if (typeof navigator === "undefined") {
      return isAndroidViewport;
    }
    const nav = navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const hasAndroidUa = /Android/i.test(navigator.userAgent);
    const hasAndroidPlatform = /Android/i.test(nav.userAgentData?.platform ?? "");
    return hasAndroidUa || hasAndroidPlatform;
  });
  const hasDesktopTitle = titleDesktop.trim().length > 0;
  const hasMobileTitle = titleMobile.trim().length > 0;
  const hasTabletTitle = titleTablet.trim().length > 0;
  const titleForLg = modelingTitleForLgViewport(titleDesktop, titleTablet, titleMobile);
  const showLgTitle = titleForLg.length > 0;
  const linesForLgBody = modelingBodyLinesForLgViewport(
    descriptionLinesDesktop,
    descriptionLinesTablet,
    descriptionLinesMobile,
  );

  const isAndroidResolved = isAndroidViewport || isAndroidClient;
  const mobileOverlayTranslateYPx = isAndroidResolved
    ? MOBILE_OVERLAY_TRANSLATE_Y_ANDROID_PX
    : MOBILE_OVERLAY_TRANSLATE_Y_PX;

  return (
    <article
      className={`${MODELING_CARD_ARTICLE_SHELL_CLASSES} ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        <div className="absolute inset-0 md:hidden">
          <Image
            src={imageUrlMobile}
            alt=""
            fill
            className="min-h-0 min-w-0 h-full w-full object-cover object-[56%_center]"
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
            sizes="(max-width: 1280px) 50vw, 33vw"
          />
        </div>
      </div>
      <div
        className={`absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(1rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-black max-sm:-translate-x-[calc(0.375rem*var(--ms,1))] max-sm:translate-y-[calc(var(--mechanical-overlay-ty)*var(--ms,1))] md:gap-[calc(1.25rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] md:pt-[calc(3.25rem*var(--ms,1))] ${OVERLAY_TABLET_DESKTOP_NUDGE_UP_CLASS}`}
        style={
          {
            ["--mechanical-overlay-ty" as string]: `${mobileOverlayTranslateYPx}px`,
          } as CSSProperties
        }
      >
        {hasMobileTitle || hasTabletTitle || hasDesktopTitle ? (
          <div className="w-full">
            <h3 className={`z-10 h-[calc(28px*var(--ms,1)*var(--mt,1))] w-[calc(283px*var(--ms,1))] max-w-full shrink-0 overflow-visible text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-sm:whitespace-normal md:max-lg:h-[calc(24px*var(--ms,1)*var(--mt,1))] md:max-lg:w-full md:max-lg:max-w-[calc(520px*var(--ms,1))] md:max-lg:font-manrope md:max-lg:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:max-lg:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:max-lg:tracking-normal md:max-lg:scale-x-105 md:max-lg:origin-left lg:h-[calc(24px*var(--ms,1)*var(--mt,1))] lg:w-full lg:max-w-[calc(520px*var(--ms,1))] lg:font-manrope lg:text-[calc(32px*var(--ms,1)*var(--mt,1))] lg:leading-[calc(24px*var(--ms,1)*var(--mt,1))] lg:tracking-normal lg:scale-x-105 lg:origin-left ${TITLE_MOBILE_NUDGE_DOWN_CLASS}`}>
              {hasMobileTitle ? (
                <span
                  className={`block whitespace-pre-wrap md:hidden ${TITLE_LINE1_TABLET_NUDGE_UP_CLASS}`}
                  style={mergeCssProperties(
                    {
                      transform: modelingCopyTranslatePercent(titleMobileOffsetX, titleMobileOffsetY),
                    },
                    modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx),
                  )}
                >
                  {renderModelingTitleText(titleMobile)}
                </span>
              ) : null}
              {hasTabletTitle ? (
                <span
                  className={`hidden whitespace-pre-wrap md:block lg:hidden ${TITLE_LINE1_TABLET_NUDGE_UP_CLASS}`}
                  style={{
                    transform: modelingCopyTranslatePercent(titleTabletOffsetX, titleTabletOffsetY),
                  }}
                >
                  {renderModelingTitleText(titleTablet)}
                </span>
              ) : null}
              {showLgTitle ? (
                <span
                  className="hidden lg:block"
                  style={{
                    transform: modelingCopyTranslatePercent(titleDesktopOffsetX, titleDesktopOffsetY),
                  }}
                >
                  <span className={`block whitespace-pre-wrap ${TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS}`}>
                    {renderModelingTitleText(titleForLg)}
                  </span>
                </span>
              ) : null}
            </h3>
          </div>
        ) : null}
        {descriptionLinesMobile.length > 0 ? (
          <p
            className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(0.8125rem*var(--ms,1)*var(--mt,1))] md:hidden"
            style={mergeCssProperties(
              {
                transform: modelingCopyTranslatePercent(bodyMobileOffsetX, bodyMobileOffsetY),
              },
              modelingCmsMobileBodyFontStyle(mobilePreviewBodyFontPx),
            )}
          >
            {descriptionLinesMobile.map((line, i) => (
              <span key={i} className="block">
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </p>
        ) : null}
        {descriptionLinesTablet.length > 0 ? (
          <div
            style={{
              transform: modelingCopyTranslatePercent(bodyTabletOffsetX, bodyTabletOffsetY),
            }}
          >
            <p className="hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] md:max-lg:block lg:hidden">
              {descriptionLinesTablet.map((line, i) => (
                <span key={`t-${i}`} className="block whitespace-nowrap">
                  {renderModelingCopyLine(line)}
                </span>
              ))}
            </p>
          </div>
        ) : null}
        {linesForLgBody.length > 0 ? (
          <div
            style={{
              transform: modelingCopyTranslatePercent(bodyDesktopOffsetX, bodyDesktopOffsetY),
            }}
          >
            <div
              className="hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] lg:block lg:-translate-y-[calc(1rem*var(--ms,1))]"
              style={{ overflow: "visible" }}
            >
              {linesForLgBody.map((line, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {renderModelingCopyLine(line)}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
