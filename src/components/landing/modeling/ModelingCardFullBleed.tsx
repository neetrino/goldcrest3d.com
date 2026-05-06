import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  modelingCopyTranslatePercent,
  modelingTitleForLgViewport,
  modelingTitleForTabletViewport,
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
  MODELING_CMS_TABLET_BODY_FONT_OVERRIDE_CLASS,
  modelingCmsMobileBodyFontStyle,
  modelingCmsMobileTitleFontStyle,
  modelingCmsTabletTitleFontStyle,
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
  | "tabletPreviewTitleFontPx"
  | "tabletPreviewBodyFontPx"
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

const OFFSET_TRANSFORM_YX =
  "translateX(calc(var(--offset-x-active) * var(--ms,1))) translateY(calc(var(--offset-y-active) * var(--ms,1)))";

function buildResponsiveOffsetStyle(
  mobileOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: `${mobileOffsetY}%`,
    ["--offset-y-desktop" as string]: `${desktopOffsetY}%`,
    ["--offset-x-mobile" as string]: `${mobileOffsetX}%`,
    ["--offset-x-desktop" as string]: `${desktopOffsetX}%`,
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
    ["--offset-y-mobile" as string]: `${mobileOffsetY}%`,
    ["--offset-y-tablet" as string]: `${tabletOffsetY}%`,
    ["--offset-y-desktop" as string]: `${desktopOffsetY}%`,
    ["--offset-x-mobile" as string]: `${mobileOffsetX}%`,
    ["--offset-x-tablet" as string]: `${tabletOffsetX}%`,
    ["--offset-x-desktop" as string]: `${desktopOffsetX}%`,
    transform: OFFSET_TRANSFORM_YX,
  };
}

function offsetActiveClassTriple(): string {
  return "[--offset-y-active:var(--offset-y-mobile)] min-[755px]:[--offset-y-active:var(--offset-y-tablet)] lg:[--offset-y-active:var(--offset-y-desktop)] [--offset-x-active:var(--offset-x-mobile)] min-[755px]:[--offset-x-active:var(--offset-x-tablet)] lg:[--offset-x-active:var(--offset-x-desktop)]";
}

function offsetActiveClassDual(): string {
  return "[--offset-y-active:var(--offset-y-mobile)] min-[755px]:[--offset-y-active:var(--offset-y-desktop)] [--offset-x-active:var(--offset-x-mobile)] min-[755px]:[--offset-x-active:var(--offset-x-desktop)]";
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
    ["--offset-y-mobile" as string]: `${mobileOffsetY}%`,
    ["--offset-y-tablet" as string]: `${tabletOffsetY}%`,
    ["--offset-y-desktop" as string]: `${desktopOffsetY}%`,
    ["--offset-x-mobile" as string]: `${mobileOffsetX}%`,
    ["--offset-x-tablet" as string]: `${tabletOffsetX}%`,
    ["--offset-x-desktop" as string]: `${desktopOffsetX}%`,
  };
}

function responsiveOffsetCssVarsOnly(
  mobileOffsetY: number,
  desktopOffsetY: number,
  mobileOffsetX = 0,
  desktopOffsetX = 0,
): CSSProperties {
  return {
    ["--offset-y-mobile" as string]: `${mobileOffsetY}%`,
    ["--offset-y-desktop" as string]: `${desktopOffsetY}%`,
    ["--offset-x-mobile" as string]: `${mobileOffsetX}%`,
    ["--offset-x-desktop" as string]: `${desktopOffsetX}%`,
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
  tabletPreviewTitleFontPx,
  tabletPreviewBodyFontPx,
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
  const titleForMdTablet = modelingTitleForTabletViewport(
    title,
    titleTabletResolved,
    titleMobile ?? "",
  );
  const showMdTabletTitleLine =
    modelingTabletTierEnabled && titleForMdTablet.length > 0;
  const hasPortraitTabletTitle =
    portraitMobileLayout && titleForMdTablet.length > 0;
  const showPortraitTabletText =
    portraitMobileLayout &&
    (hasPortraitTabletTitle || portraitTabletDescriptionContent != null);
  const lgViewportTitleText = modelingTitleForLgViewport(
    title,
    titleTabletResolved,
    titleMobile ?? "",
  );
  const showLgViewportTitle = modelingTabletTierEnabled && lgViewportTitleText.length > 0;
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
    <article className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}>
      <div className="absolute inset-0" data-landing-image={imageId}>
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
                    sizes="(max-width: 754px) 100vw, 0px"
                  />
                </div>
                <div className={imgTabletWrapperClass}>
                  <Image
                    src={(imageSrcTablet ?? imageSrc) as string}
                    alt=""
                    fill
                    className={`min-h-0 min-w-0 ${imageFillClassName}`}
                    style={imageStyle}
                    sizes="(min-width: 755px) and (max-width: 1023px) 50vw, 0px"
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
                    sizes="(max-width: 754px) 100vw, 0px"
                  />
                </div>
                <div className={imgDesktopWrapperClass}>
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className={imageFillClassNameDesktop}
                    style={imageStyle}
                    sizes="(max-width: 754px) 100vw, 50vw"
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
              sizes="(max-width: 754px) 100vw, 50vw"
            />
          )
        ) : null}
      </div>

      <div
        className={`absolute inset-0 z-10 px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] min-[755px]:px-[calc(2rem*var(--ms,1))] min-[755px]:py-[calc(2.5rem*var(--ms,1))] ${textColor} ${!independentTitleDescription ? `flex flex-col gap-[calc(1.5rem*var(--ms,1))] ${hipHopMobileLayout ? "items-center justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(0.25rem*var(--ms,1))] max-[754px]:translate-y-[calc(-0.3rem*var(--ms,1))] text-center min-[755px]:gap-[calc(1.5rem*var(--ms,1))] min-[755px]:px-[calc(2rem*var(--ms,1))] min-[755px]:pb-[calc(0.5rem*var(--ms,1))] min-[755px]:translate-y-[calc(1.6rem*var(--ms,1))]" : bridalMobileLayout ? "justify-center max-[754px]:!ml-0 max-[754px]:!mt-0 max-[754px]:translate-x-[calc(0.6rem*var(--ms,1))] max-[754px]:translate-y-[calc(6rem*var(--ms,1))] max-[754px]:gap-[calc(0.75rem*var(--ms,1))] max-[754px]:px-[calc(1rem*var(--ms,1))] max-[754px]:items-start max-[754px]:text-left min-[755px]:-translate-x-[min(calc(7.5rem*var(--ms,1)),16vw)] min-[755px]:-translate-y-[min(calc(7rem*var(--ms,1)),18vh)] min-[755px]:items-start min-[755px]:text-left" : `justify-center ${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
        style={overlayTextContainerStyle}
      >
        {independentTitleDescription ? (
          portraitMobileLayout ? (
            <>
              <div className="absolute inset-0 z-20 flex -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(3rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] min-[755px]:hidden">
                <div
                  style={{
                    transform: modelingCopyTranslatePercent(titleOffsetXMobile, titleOffsetYMobile),
                  }}
                >
                  <h3
                    className={PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS}
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
                <div className="absolute inset-0 z-20 hidden -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(3rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] min-[755px]:flex lg:hidden">
                  {hasPortraitTabletTitle ? (
                    <div
                      style={{
                        transform: modelingCopyTranslatePercent(
                          titleOffsetXTablet,
                          titleOffsetYTablet,
                        ),
                      }}
                    >
                      <h3
                        className={PORTRAIT_TABLET_OVERLAY_TITLE_CLASS}
                        style={
                          tabletPreviewTitleFontPx != null
                            ? modelingCmsTabletTitleFontStyle(tabletPreviewTitleFontPx)
                            : undefined
                        }
                      >
                        <span className="whitespace-pre-wrap">
                          {renderModelingTitleText(titleForMdTablet)}
                        </span>
                      </h3>
                    </div>
                  ) : null}
                  {portraitTabletDescriptionContent != null ? (
                    <div
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
              <div className={`absolute inset-0 hidden lg:block ${desktopOverlayShiftClassName ?? ""}`}>
                {hasDesktopTitle ? (
                  <div
                    className={textAlignClass}
                    style={{
                      position: "absolute",
                      top: titleBlockTop ?? "20%",
                      left: titleBlockLeft ?? "8%",
                      right: textAlign === "left" ? undefined : "8%",
                      transform: modelingCopyTranslatePercent(titleOffsetXDesktop, titleOffsetYDesktop),
                    }}
                  >
                    <h3 className={`${titleClassName} whitespace-pre-wrap ${titleShiftClassName ?? ""}`}>
                      {renderModelingTitleText(title)}
                    </h3>
                  </div>
                ) : null}
                {hasDescriptionContent ? (
                  <div
                    className={`max-w-[calc(407px*var(--ms,1))] ${descriptionBlockAlignClass}`}
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
                    <DescriptionTag className={descriptionClassName}>{descriptionContent}</DescriptionTag>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {hasDesktopTitle ? (
                <div
                  className={textAlignClass}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
                    transform: modelingCopyTranslatePercent(titleOffsetXDesktop, titleOffsetYDesktop),
                  }}
                >
                  <h3 className={`${titleClassName} whitespace-pre-wrap ${titleShiftClassName ?? ""}`}>
                    {renderModelingTitleText(title)}
                  </h3>
                </div>
              ) : null}
              {hasDescriptionContent ? (
                <div
                  className={`max-w-[calc(407px*var(--ms,1))] ${descriptionBlockAlignClass}`}
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
                  <DescriptionTag className={descriptionClassName}>{descriptionContent}</DescriptionTag>
                </div>
              ) : null}
            </>
          )
        ) : (
          <>
            {hasDesktopTitle || hasMobileTitle || showMdTabletTitleLine ? (
              <div
                className={
                  modelingTabletTierEnabled
                    ? `w-full ${offsetActiveClassTriple()}`
                    : `w-full ${offsetActiveClassDual()}`
                }
                style={responsiveTitleOffsetStyle}
              >
                <h3
                  className={`${titleClassNameResolved} ${hasDescriptionContent ? `h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible ${modelingTabletTierEnabled ? "min-[755px]:h-[calc(24px*var(--ms,1)*var(--mt,1))] lg:h-[calc(24px*var(--ms,1)*var(--mt,1))]" : "min-[755px]:h-[calc(24px*var(--ms,1)*var(--mt,1))]"}` : ""} ${hipHopMobileLayout ? "mt-[calc(0.5rem*var(--ms,1))] self-center text-center max-[754px]:-translate-y-[calc(3rem*var(--ms,1))] min-[755px]:-translate-y-[calc(6rem*var(--ms,1))]" : ""} ${hasHipHopMobileMultilineTitle ? "max-[754px]:leading-[calc(1.22rem*var(--ms,1)*var(--mt,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-[754px]:!mr-0 max-[754px]:!mt-[calc(0.5rem*var(--ms,1))] max-[754px]:!self-start max-[754px]:!text-left min-[755px]:!self-start min-[755px]:!text-left min-[755px]:!mr-0 min-[755px]:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                  style={{
                    ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                    ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                  }}
                >
                  {modelingTabletTierEnabled ? (
                    <>
                      {hasMobileTitle ? (
                        <span
                          className="whitespace-pre-wrap min-[755px]:hidden"
                          style={
                            mobilePreviewTitleFontPx != null
                              ? modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx)
                              : undefined
                          }
                        >
                          {renderModelingTitleText(titleMobile ?? "")}
                        </span>
                      ) : null}
                      {showMdTabletTitleLine ? (
                        <span
                          className="hidden whitespace-pre-wrap min-[755px]:inline lg:hidden"
                          style={
                            tabletPreviewTitleFontPx != null
                              ? modelingCmsTabletTitleFontStyle(tabletPreviewTitleFontPx)
                              : undefined
                          }
                        >
                          {renderModelingTitleText(titleForMdTablet)}
                        </span>
                      ) : null}
                      {showLgViewportTitle ? (
                        <span className="hidden whitespace-pre-wrap lg:inline">
                          {renderModelingTitleText(lgViewportTitleText)}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {hasMobileTitle ? (
                        <span
                          className="whitespace-pre-wrap min-[755px]:hidden"
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
                        <span className="hidden whitespace-pre-wrap min-[755px]:inline">{renderModelingTitleText(title)}</span>
                      ) : null}
                    </>
                  )}
                </h3>
              </div>
            ) : null}
            {hasDescriptionContent ? (
              <DescriptionTag
                className={`${descriptionClassName}${
                  mobilePreviewBodyFontPx != null
                    ? ` ${MODELING_CMS_MOBILE_BODY_FONT_OVERRIDE_CLASS}`
                    : ""
                }${
                  modelingTabletTierEnabled && tabletPreviewBodyFontPx != null
                    ? ` ${MODELING_CMS_TABLET_BODY_FONT_OVERRIDE_CLASS}`
                    : ""
                }${
                  hipHopMobileLayout
                    ? ` max-[754px]:mt-[calc(1rem*var(--ms,1))] ${
                        mobilePreviewBodyFontPx != null
                          ? "max-[754px]:w-[min(100%,calc(560px*var(--ms,1)))] max-[754px]:max-w-full max-[754px]:overflow-x-auto"
                          : "max-[754px]:w-[min(100%,calc(280px*var(--ms,1)))] max-[754px]:max-w-full"
                      } min-[755px]:absolute min-[755px]:bottom-[calc(4rem*var(--ms,1))] min-[755px]:left-1/2 min-[755px]:mt-0 min-[755px]:w-[min(100%,calc(560px*var(--ms,1)))] ${
                        modelingTabletTierEnabled
                          ? `${offsetActiveClassTriple()} max-[754px]:[transform:translateX(calc(var(--offset-x-active)*var(--ms,1)))_translateY(calc(var(--offset-y-active)*var(--ms,1)))] min-[755px]:[transform:translateX(calc(-50%_+_var(--offset-x-active)*var(--ms,1)))_translateY(calc(1.2rem*var(--ms,1)+var(--offset-y-active)*var(--ms,1)))]`
                          : `${offsetActiveClassDual()} max-[754px]:[transform:translateX(calc(var(--offset-x-active)*var(--ms,1)))_translateY(calc(var(--offset-y-active)*var(--ms,1)))] min-[755px]:[transform:translateX(calc(-50%_+_var(--offset-x-active)*var(--ms,1)))_translateY(calc(1.2rem*var(--ms,1)+var(--offset-y-active)*var(--ms,1)))]`
                      }`
                    : ` ${modelingTabletTierEnabled ? offsetActiveClassTriple() : offsetActiveClassDual()}`
                }${bridalMobileLayout ? " max-[754px]:!-mt-[calc(0.5rem*var(--ms,1))] max-[754px]:w-full min-[755px]:w-auto min-[755px]:self-start min-[755px]:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={{
                  ...(mobilePreviewBodyFontPx != null
                    ? {
                        ["--modeling-cms-body-px" as string]: String(mobilePreviewBodyFontPx),
                      }
                    : {}),
                  ...(modelingTabletTierEnabled && tabletPreviewBodyFontPx != null
                    ? {
                        ["--modeling-cms-tablet-body-px" as string]: String(
                          tabletPreviewBodyFontPx,
                        ),
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
