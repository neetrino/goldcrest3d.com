import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_ARTICLE_SHELL_CLASSES,
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  modelingCopyTitleDesktopOnly,
  modelingCopyTranslatePercent,
} from "./modeling-card.constants";
import {
  PORTRAIT_MOBILE_OVERLAY_DESC_CLASS,
  PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS,
  PORTRAIT_MOBILE_TITLE_FULL,
  PORTRAIT_TABLET_OVERLAY_TITLE_CLASS,
} from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";
import {
  MODELING_CMS_MOBILE_BODY_FONT_OVERRIDE_CLASS,
  modelingCmsMobileBodyFontStyle,
  modelingCmsMobileTitleFontStyle,
} from "./modeling-cms-mobile-font-style";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

export type ModelingCardFullBleedProps = Pick<
  ModelingCardProps,
  | "title"
  | "titleMobile"
  | "titleTablet"
  | "imageSrc"
  | "imageSrcTablet"
  | "imageId"
  | "imageSrcMobile"
  | "imageLayerBackground"
  | "imageLayerBackgroundMobile"
  | "imageLayerBackgroundTablet"
  | "imageFillClassName"
  | "imageFillClassNameDesktop"
  | "independentTitleDescription"
  | "textAlign"
  | "titleBlockTop"
  | "titleBlockLeft"
  | "titleShiftClassName"
  | "descriptionBlockTop"
  | "descriptionBlockLeft"
  | "desktopOverlayShiftClassName"
  | "descriptionAlign"
  | "titleAlignSelf"
  | "titleMarginRight"
  | "titleMarginTop"
  | "titleOffsetYDesktop"
  | "titleOffsetXDesktop"
  | "titleOffsetYMobile"
  | "titleOffsetXMobile"
  | "titleOffsetYTablet"
  | "titleOffsetXTablet"
  | "titleMarginTopCompensate"
  | "descriptionMarginTop"
  | "descriptionOffsetYDesktop"
  | "descriptionOffsetXDesktop"
  | "descriptionOffsetYMobile"
  | "descriptionOffsetXMobile"
  | "descriptionOffsetYTablet"
  | "descriptionOffsetXTablet"
  | "descriptionLinesMobile"
  | "mobilePreviewTitleFontPx"
  | "mobilePreviewBodyFontPx"
> & {
  textColor: string;
  hipHopMobileLayout: boolean;
  bridalMobileLayout: boolean;
  portraitMobileLayout: boolean;
  modelingTabletTierEnabled?: boolean;
  /** 3D Portrait: tablet-only description lines (md–lg) when CMS tablet body is set. */
  portraitTabletDescriptionContent?: ReactNode;
  imgMobileWrapperClass: string;
  imgTabletWrapperClass?: string;
  imgDesktopWrapperClass: string;
  imageStyle: CSSProperties;
  overlayTextContainerClass: string;
  overlayTranslateClass: string;
  textAlignClass: string;
  descriptionBlockAlignClass: string;
  overlayTextContainerStyle: CSSProperties | undefined;
  titleClassName: string;
  titleClassNameResolved: string;
  descriptionClassName: string;
  descriptionContent: ReactNode;
  hasDescriptionContent: boolean;
  DescriptionTag: "div" | "p";
};

/**
 * Offsets are unitless integers in CSS vars; `* 1%` is relative to the transformed element’s box.
 * Title wrapper uses `flex-1` (Hip-Hop) so % is a meaningful share of the card, not ~one line height.
 * Hip-Hop desktop description mixes -50% centering with the same vars — unitless vars avoid invalid `calc(-50% + 5)`.
 */
const OFFSET_TRANSFORM_YX =
  "translateX(calc(var(--offset-x-active) * 1% * var(--ms,1))) translateY(calc(var(--offset-y-active) * 1% * var(--ms,1)))";

function buildResponsiveOffsetStyle(
  mobileOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: String(mobileOffsetY),
    ["--offset-y-desktop" as string]: String(desktopOffsetY),
    ["--offset-x-mobile" as string]: String(mobileOffsetX),
    ["--offset-x-desktop" as string]: String(desktopOffsetX),
    transform: OFFSET_TRANSFORM_YX,
  };
}

function buildTripleOffsetStyle(
  mobileOffsetY: number,
  tabletOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  tabletOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: String(mobileOffsetY),
    ["--offset-y-tablet" as string]: String(tabletOffsetY),
    ["--offset-y-desktop" as string]: String(desktopOffsetY),
    ["--offset-x-mobile" as string]: String(mobileOffsetX),
    ["--offset-x-tablet" as string]: String(tabletOffsetX),
    ["--offset-x-desktop" as string]: String(desktopOffsetX),
    transform: OFFSET_TRANSFORM_YX,
  };
}

function offsetActiveClassTriple(): string {
  return "[--offset-y-active:var(--offset-y-mobile)] md:[--offset-y-active:var(--offset-y-tablet)] lg:[--offset-y-active:var(--offset-y-desktop)] [--offset-x-active:var(--offset-x-mobile)] md:[--offset-x-active:var(--offset-x-tablet)] lg:[--offset-x-active:var(--offset-x-desktop)]";
}

function offsetActiveClassDual(): string {
  return "[--offset-y-active:var(--offset-y-mobile)] sm:[--offset-y-active:var(--offset-y-desktop)] [--offset-x-active:var(--offset-x-mobile)] sm:[--offset-x-active:var(--offset-x-desktop)]";
}

/** CSS vars only — use when combining with other transforms on the same node (e.g. Hip-Hop description). */
function tripleOffsetCssVarsOnly(
  mobileOffsetY: number,
  tabletOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  tabletOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: String(mobileOffsetY),
    ["--offset-y-tablet" as string]: String(tabletOffsetY),
    ["--offset-y-desktop" as string]: String(desktopOffsetY),
    ["--offset-x-mobile" as string]: String(mobileOffsetX),
    ["--offset-x-tablet" as string]: String(tabletOffsetX),
    ["--offset-x-desktop" as string]: String(desktopOffsetX),
  };
}

function responsiveOffsetCssVarsOnly(
  mobileOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: String(mobileOffsetY),
    ["--offset-y-desktop" as string]: String(desktopOffsetY),
    ["--offset-x-mobile" as string]: String(mobileOffsetX),
    ["--offset-x-desktop" as string]: String(desktopOffsetX),
  };
}

function buildDescriptionMarginStyle(
  titleMarginTopCompensate: boolean | undefined,
  titleMarginTop: string | undefined,
  descriptionMarginTop: string | undefined,
): CSSProperties | undefined {
  if (titleMarginTopCompensate && titleMarginTop != null) {
    return {
      marginTop:
        descriptionMarginTop != null
          ? `calc(${descriptionMarginTop} - ${titleMarginTop})`
          : `calc(0px - ${titleMarginTop})`,
    };
  }
  if (descriptionMarginTop != null) {
    return { marginTop: descriptionMarginTop };
  }
  return undefined;
}

export function ModelingCardFullBleed({
  title,
  titleMobile,
  titleTablet,
  imageSrc,
  imageSrcTablet,
  imageId,
  imageSrcMobile,
  imageLayerBackground,
  imageLayerBackgroundMobile,
  imageLayerBackgroundTablet,
  imageFillClassName = "object-cover object-center",
  imageFillClassNameDesktop = "object-contain",
  modelingTabletTierEnabled = false,
  portraitTabletDescriptionContent,
  independentTitleDescription = false,
  textAlign,
  titleBlockTop,
  titleBlockLeft,
  titleShiftClassName,
  descriptionBlockTop,
  descriptionBlockLeft,
  desktopOverlayShiftClassName,
  descriptionAlign,
  titleAlignSelf,
  titleMarginRight,
  titleMarginTop,
  titleOffsetYDesktop = 0,
  titleOffsetXDesktop = 0,
  titleOffsetYMobile = 0,
  titleOffsetXMobile = 0,
  titleOffsetYTablet = 0,
  titleOffsetXTablet = 0,
  titleMarginTopCompensate,
  descriptionMarginTop,
  descriptionOffsetYDesktop = 0,
  descriptionOffsetXDesktop = 0,
  descriptionOffsetYMobile = 0,
  descriptionOffsetXMobile = 0,
  descriptionOffsetYTablet = 0,
  descriptionOffsetXTablet = 0,
  descriptionLinesMobile,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
  textColor,
  hipHopMobileLayout,
  bridalMobileLayout,
  portraitMobileLayout,
  imgMobileWrapperClass,
  imgTabletWrapperClass: imgTabletWrapperClassProp,
  imgDesktopWrapperClass,
  imageStyle,
  overlayTextContainerClass,
  overlayTranslateClass,
  textAlignClass,
  descriptionBlockAlignClass,
  overlayTextContainerStyle,
  titleClassName,
  titleClassNameResolved,
  descriptionClassName,
  descriptionContent,
  hasDescriptionContent,
  DescriptionTag,
}: ModelingCardFullBleedProps) {
  const imgTabletWrapperClass = imgTabletWrapperClassProp ?? "";
  const titleTabletResolved = (titleTablet ?? "").trim();
  const hasDesktopTitle = title.trim().length > 0;
  const hasMobileTitle = (titleMobile ?? "").trim().length > 0;
  const hasTabletTitle = modelingTabletTierEnabled && titleTabletResolved.length > 0;
  const hasPortraitTabletTitle = portraitMobileLayout && titleTabletResolved.length > 0;
  const showPortraitTabletText =
    portraitMobileLayout &&
    (hasPortraitTabletTitle || portraitTabletDescriptionContent != null);
  const lgViewportTitleText = modelingCopyTitleDesktopOnly(title);
  const showLgViewportTitle =
    modelingTabletTierEnabled && lgViewportTitleText.length > 0;
  const hasHipHopMobileMultilineTitle = hipHopMobileLayout && (titleMobile ?? "").includes("\n");
  const responsiveTitleOffsetStyle = modelingTabletTierEnabled
    ? buildTripleOffsetStyle(
        titleOffsetYMobile,
        titleOffsetYTablet,
        titleOffsetYDesktop,
        titleOffsetXMobile,
        titleOffsetXTablet,
        titleOffsetXDesktop,
      )
    : buildResponsiveOffsetStyle(
        titleOffsetYMobile,
        titleOffsetYDesktop,
        titleOffsetXMobile,
        titleOffsetXDesktop,
      );
  const responsiveDescriptionOffsetStyle = modelingTabletTierEnabled
    ? buildTripleOffsetStyle(
        descriptionOffsetYMobile,
        descriptionOffsetYTablet,
        descriptionOffsetYDesktop,
        descriptionOffsetXMobile,
        descriptionOffsetXTablet,
        descriptionOffsetXDesktop,
      )
    : buildResponsiveOffsetStyle(
        descriptionOffsetYMobile,
        descriptionOffsetYDesktop,
        descriptionOffsetXMobile,
        descriptionOffsetXDesktop,
      );

  return (
    <article
      className={`${MODELING_CARD_ARTICLE_SHELL_CLASSES} ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div className="absolute inset-0 z-0" data-landing-image={imageId}>
        {imageLayerBackground && imageLayerBackgroundMobile ? (
          imgTabletWrapperClass.length > 0 && imageLayerBackgroundTablet != null ? (
            <>
              <div className={imgMobileWrapperClass} style={imageLayerBackgroundMobile} />
              <div className={imgTabletWrapperClass} style={imageLayerBackgroundTablet} />
              <div className={imgDesktopWrapperClass} style={imageLayerBackground} />
            </>
          ) : (
            <>
              <div className={imgMobileWrapperClass} style={imageLayerBackgroundMobile} />
              <div className={imgDesktopWrapperClass} style={imageLayerBackground} />
            </>
          )
        ) : (
          <div
            className="absolute inset-0"
            style={{
              ...(imageLayerBackground ?? undefined),
              ...(!imageLayerBackground ? { backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } : {}),
            }}
          />
        )}
        {!imageLayerBackground && imageSrc ? (
          imageSrcMobile != null ? (
            imgTabletWrapperClass.length > 0 ? (
              <>
                <div className={imgMobileWrapperClass}>
                  <Image
                    src={imageSrcMobile}
                    alt=""
                    fill
                    className={`min-h-0 min-w-0 ${imageFillClassName}`}
                    style={imageStyle}
                    sizes="(max-width: 767px) 100vw, 0px"
                  />
                </div>
                <div className={imgTabletWrapperClass}>
                  <Image
                    src={(imageSrcTablet ?? imageSrc) as string}
                    alt=""
                    fill
                    className={`min-h-0 min-w-0 ${imageFillClassName}`}
                    style={imageStyle}
                    sizes="(max-width: 1023px) 50vw, 0px"
                  />
                </div>
                <div className={imgDesktopWrapperClass}>
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className={imageFillClassNameDesktop}
                    style={imageStyle}
                    sizes="(min-width: 1024px) 50vw, 0px"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={imgMobileWrapperClass}>
                  <Image
                    src={imageSrcMobile}
                    alt=""
                    fill
                    className={`min-h-0 min-w-0 ${imageFillClassName}`}
                    style={imageStyle}
                    sizes="(max-width: 767px) 100vw, 0px"
                  />
                </div>
                <div className={imgDesktopWrapperClass}>
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className={imageFillClassNameDesktop}
                    style={imageStyle}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </>
            )
          ) : (
            <Image
              src={imageSrc}
              alt=""
              fill
              className={imageFillClassName}
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )
        ) : null}
      </div>

      <div
        className={`absolute inset-0 z-10 min-h-0 overflow-visible [overflow-wrap:anywhere] max-sm:px-4 max-sm:py-4 sm:px-[calc(1.5rem*var(--ms,1))] sm:py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textColor} ${!independentTitleDescription ? `flex flex-col gap-[calc(1.5rem*var(--ms,1))] ${hipHopMobileLayout ? "items-center justify-end max-sm:gap-3 max-sm:px-4 max-sm:pb-1 max-sm:-translate-y-[0.3rem] text-center sm:gap-[calc(1.5rem*var(--ms,1))] sm:px-[calc(2rem*var(--ms,1))] sm:pb-[calc(0.5rem*var(--ms,1))] sm:translate-y-[calc(1.6rem*var(--ms,1))]" : bridalMobileLayout ? "justify-center max-sm:!ml-0 max-sm:!mt-0 max-sm:translate-x-[0.6rem] max-sm:translate-y-[6rem] max-sm:gap-3 max-sm:px-4 max-sm:items-start max-sm:text-left sm:-translate-x-[min(calc(7.5rem*var(--ms,1)),16vw)] sm:-translate-y-[min(calc(7rem*var(--ms,1)),18vh)] sm:items-start sm:text-left" : `justify-center ${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
        style={overlayTextContainerStyle}
      >
        {independentTitleDescription ? (
          portraitMobileLayout ? (
            <>
              {/* max-sm: pinned overlay; sm–md: restored vw / --ms (tablet). */}
              <div className="absolute inset-0 z-20 flex min-h-0 min-w-0 max-sm:-translate-x-[162px] max-sm:-translate-y-[3rem] max-sm:gap-3 max-sm:px-4 max-sm:pb-8 sm:max-md:-translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] sm:max-md:-translate-y-[calc(3rem*var(--ms,1))] sm:max-md:gap-[calc(0.75rem*var(--ms,1))] sm:max-md:px-[calc(1rem*var(--ms,1))] sm:max-md:pb-[calc(2rem*var(--ms,1))] flex-col items-end justify-end overflow-hidden [overflow-wrap:anywhere] md:hidden">
                <div
                  className="min-w-0 max-w-full"
                  style={{
                    transform: modelingCopyTranslatePercent(titleOffsetXMobile, titleOffsetYMobile),
                  }}
                >
                  <h3
                    className={`max-w-full break-words ${PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS}`}
                    style={
                      mobilePreviewTitleFontPx != null
                        ? modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx)
                        : undefined
                    }
                  >
                    {(titleMobile ?? title) === PORTRAIT_MOBILE_TITLE_FULL ? (
                      <>
                        <span className="block whitespace-nowrap">3D Portrait</span>
                        <span className="block whitespace-nowrap">Jewelry</span>
                      </>
                    ) : (
                      <span className="whitespace-pre-wrap">{renderModelingTitleText(titleMobile ?? title)}</span>
                    )}
                  </h3>
                </div>
                <div
                  className="min-w-0 max-w-full"
                  style={{
                    transform: modelingCopyTranslatePercent(
                      descriptionOffsetXMobile,
                      descriptionOffsetYMobile,
                    ),
                  }}
                >
                  <div
                    className={PORTRAIT_MOBILE_OVERLAY_DESC_CLASS}
                    style={
                      mobilePreviewBodyFontPx != null
                        ? modelingCmsMobileBodyFontStyle(mobilePreviewBodyFontPx)
                        : undefined
                    }
                  >
                    {descriptionLinesMobile!.map((line, i) => (
                      <span key={`portrait-mobile-${i}`} className="block">
                        {renderModelingCopyLine(line)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {showPortraitTabletText ? (
                <div className="absolute inset-0 z-20 hidden min-h-0 min-w-0 -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(3rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] overflow-hidden px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] [overflow-wrap:anywhere] md:flex lg:hidden">
                  {hasPortraitTabletTitle ? (
                    <div
                      className="min-w-0 max-w-full"
                      style={{
                        transform: modelingCopyTranslatePercent(
                          titleOffsetXTablet,
                          titleOffsetYTablet,
                        ),
                      }}
                    >
                      <h3 className={`max-w-full break-words ${PORTRAIT_TABLET_OVERLAY_TITLE_CLASS}`}>
                        <span className="whitespace-pre-wrap">
                          {renderModelingTitleText(titleTabletResolved)}
                        </span>
                      </h3>
                    </div>
                  ) : null}
                  {portraitTabletDescriptionContent != null ? (
                    <div
                      className="min-w-0 max-w-full"
                      style={{
                        transform: modelingCopyTranslatePercent(
                          descriptionOffsetXTablet,
                          descriptionOffsetYTablet,
                        ),
                      }}
                    >
                      {portraitTabletDescriptionContent}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div
                className={`absolute inset-0 hidden min-h-0 min-w-0 overflow-hidden lg:block [overflow-wrap:anywhere] ${desktopOverlayShiftClassName ?? ""}`}
              >
                {hasDesktopTitle ? (
                  <div
                    className={`${textAlignClass} max-w-full`}
                    style={{
                      position: "absolute",
                      top: titleBlockTop ?? "20%",
                      left: titleBlockLeft ?? "8%",
                      right: textAlign === "left" ? undefined : "8%",
                      transform: modelingCopyTranslatePercent(titleOffsetXDesktop, titleOffsetYDesktop),
                    }}
                  >
                    <h3
                      className={`${titleClassName} max-w-full break-words whitespace-pre-wrap ${titleShiftClassName ?? ""}`}
                    >
                      {renderModelingTitleText(title)}
                    </h3>
                  </div>
                ) : null}
                {hasDescriptionContent ? (
                  <div
                    className={`min-w-0 max-w-[min(100%,calc(407px*var(--ms,1)))] overflow-hidden ${descriptionBlockAlignClass}`}
                    style={{
                      position: "absolute",
                      top: descriptionBlockTop ?? "32%",
                      left: descriptionBlockLeft ?? "14%",
                      right:
                        descriptionAlign === "right" ? "8%" : textAlign === "left" ? undefined : "8%",
                      transform: modelingCopyTranslatePercent(
                        descriptionOffsetXDesktop,
                        descriptionOffsetYDesktop,
                      ),
                    }}
                  >
                    <DescriptionTag className={`max-w-full break-words ${descriptionClassName}`}>
                      {descriptionContent}
                    </DescriptionTag>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {hasDesktopTitle ? (
                <div
                  className={`${textAlignClass} max-w-full`}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
                    transform: modelingCopyTranslatePercent(titleOffsetXDesktop, titleOffsetYDesktop),
                  }}
                >
                  <h3
                    className={`${titleClassName} max-w-full break-words whitespace-pre-wrap ${titleShiftClassName ?? ""}`}
                  >
                    {renderModelingTitleText(title)}
                  </h3>
                </div>
              ) : null}
              {hasDescriptionContent ? (
                <div
                  className={`min-w-0 max-w-[min(100%,calc(407px*var(--ms,1)))] overflow-hidden ${descriptionBlockAlignClass}`}
                  style={{
                    position: "absolute",
                    top: descriptionBlockTop ?? "32%",
                    left: descriptionBlockLeft ?? "14%",
                    right:
                      descriptionAlign === "right" ? "8%" : textAlign === "left" ? undefined : "8%",
                    transform: modelingCopyTranslatePercent(
                      descriptionOffsetXDesktop,
                      descriptionOffsetYDesktop,
                    ),
                  }}
                >
                  <DescriptionTag className={`max-w-full break-words ${descriptionClassName}`}>
                    {descriptionContent}
                  </DescriptionTag>
                </div>
              ) : null}
            </>
          )
        ) : (
          <>
            {hasDesktopTitle || hasMobileTitle || hasTabletTitle ? (
              <div
                className={
                  modelingTabletTierEnabled
                    ? `min-w-0 max-w-full w-full ${hipHopMobileLayout && hasDescriptionContent ? "flex min-h-0 flex-1 flex-col justify-end" : ""} ${offsetActiveClassTriple()}`
                    : `min-w-0 max-w-full w-full ${hipHopMobileLayout && hasDescriptionContent ? "flex min-h-0 flex-1 flex-col justify-end" : ""} ${offsetActiveClassDual()}`
                }
                style={responsiveTitleOffsetStyle}
              >
                <h3
                  className={`max-w-full shrink-0 break-words ${titleClassNameResolved} ${
                    hasDescriptionContent && !hipHopMobileLayout
                      ? bridalMobileLayout
                        ? "overflow-visible"
                        : `h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-hidden ${
                            modelingTabletTierEnabled
                              ? "md:h-[calc(24px*var(--ms,1)*var(--mt,1))] lg:h-[calc(24px*var(--ms,1)*var(--mt,1))]"
                              : "sm:h-[calc(24px*var(--ms,1)*var(--mt,1))]"
                          }`
                      : ""
                  } ${hipHopMobileLayout ? "relative z-0 self-center text-center" : ""} ${hasHipHopMobileMultilineTitle ? "max-sm:leading-[calc(1.22rem*var(--ms,1)*var(--mt,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                  style={{
                    ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                    ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                  }}
                >
                  {modelingTabletTierEnabled ? (
                    <>
                      {hasMobileTitle ? (
                        <span
                          className="max-w-full whitespace-pre-wrap md:hidden"
                          style={
                            mobilePreviewTitleFontPx != null
                              ? modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx)
                              : undefined
                          }
                        >
                          {renderModelingTitleText(titleMobile ?? "")}
                        </span>
                      ) : null}
                      {hasTabletTitle ? (
                        <span className="hidden max-w-full whitespace-pre-wrap md:inline lg:hidden">
                          {renderModelingTitleText(titleTabletResolved)}
                        </span>
                      ) : null}
                      {showLgViewportTitle ? (
                        <span className="hidden max-w-full whitespace-pre-wrap lg:inline">
                          {renderModelingTitleText(lgViewportTitleText)}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {hasMobileTitle ? (
                        <span
                          className="max-w-full whitespace-pre-wrap sm:hidden"
                          style={
                            mobilePreviewTitleFontPx != null
                              ? modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx)
                              : undefined
                          }
                        >
                          {renderModelingTitleText(titleMobile ?? "")}
                        </span>
                      ) : null}
                      {hasDesktopTitle ? (
                        <span className="hidden max-w-full whitespace-pre-wrap sm:inline">
                          {renderModelingTitleText(title)}
                        </span>
                      ) : null}
                    </>
                  )}
                </h3>
              </div>
            ) : null}
            {hasDescriptionContent ? (
              <DescriptionTag
                className={`min-w-0 max-w-full break-words ${descriptionClassName}${
                  mobilePreviewBodyFontPx != null
                    ? ` ${MODELING_CMS_MOBILE_BODY_FONT_OVERRIDE_CLASS}`
                    : ""
                }${
                  hipHopMobileLayout
                    ? ` max-sm:mt-[calc(1rem*var(--ms,1))] ${
                        mobilePreviewBodyFontPx != null
                          ? "max-sm:min-w-0 max-sm:w-full max-sm:max-w-full"
                          : "max-sm:min-w-0 max-sm:w-full max-sm:max-w-full"
                      } sm:absolute sm:bottom-[calc(4rem*var(--ms,1))] sm:left-1/2 sm:mt-0 sm:w-[min(100%,calc(560px*var(--ms,1)))] ${
                        modelingTabletTierEnabled
                          ? `${offsetActiveClassTriple()} max-sm:[transform:translateX(calc(var(--offset-x-active)*1%))_translateY(calc(var(--offset-y-active)*1%))] sm:[transform:translateX(calc(-50%_+_var(--offset-x-active)*1%*var(--ms,1)))_translateY(calc(1.2rem*var(--ms,1)+var(--offset-y-active)*1%*var(--ms,1)))]`
                          : `${offsetActiveClassDual()} max-sm:[transform:translateX(calc(var(--offset-x-active)*1%))_translateY(calc(var(--offset-y-active)*1%))] sm:[transform:translateX(calc(-50%_+_var(--offset-x-active)*1%*var(--ms,1)))_translateY(calc(1.2rem*var(--ms,1)+var(--offset-y-active)*1%*var(--ms,1)))]`
                      }`
                    : ` ${modelingTabletTierEnabled ? offsetActiveClassTriple() : offsetActiveClassDual()}`
                }${bridalMobileLayout ? " max-sm:!-mt-[calc(0.5rem*var(--ms,1))] max-sm:w-full sm:w-auto sm:self-start sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={{
                  ...(mobilePreviewBodyFontPx != null
                    ? {
                        ["--modeling-cms-body-px" as string]: String(mobilePreviewBodyFontPx),
                      }
                    : {}),
                  ...(hipHopMobileLayout
                    ? modelingTabletTierEnabled
                      ? tripleOffsetCssVarsOnly(
                          descriptionOffsetYMobile,
                          descriptionOffsetYTablet,
                          descriptionOffsetYDesktop,
                          descriptionOffsetXMobile,
                          descriptionOffsetXTablet,
                          descriptionOffsetXDesktop,
                        )
                      : responsiveOffsetCssVarsOnly(
                          descriptionOffsetYMobile,
                          descriptionOffsetYDesktop,
                          descriptionOffsetXMobile,
                          descriptionOffsetXDesktop,
                        )
                    : responsiveDescriptionOffsetStyle),
                  ...buildDescriptionMarginStyle(
                    titleMarginTopCompensate,
                    titleMarginTop,
                    descriptionMarginTop,
                  ),
                }}
              >
                {descriptionContent}
              </DescriptionTag>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}
