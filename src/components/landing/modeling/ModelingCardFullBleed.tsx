import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import {
  LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED,
} from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import {
  PORTRAIT_MOBILE_OVERLAY_DESC_CLASS,
  PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS,
  PORTRAIT_MOBILE_TITLE_FULL,
} from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

export type ModelingCardFullBleedProps = Pick<
  ModelingCardProps,
  | "title"
  | "titleMobile"
  | "imageSrc"
  | "imageId"
  | "imageSrcMobile"
  | "imageLayerBackground"
  | "imageLayerBackgroundMobile"
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
  | "titleMarginTopCompensate"
  | "descriptionMarginTop"
  | "descriptionLinesMobile"
> & {
  textColor: string;
  hipHopMobileLayout: boolean;
  bridalMobileLayout: boolean;
  portraitMobileLayout: boolean;
  imgMobileWrapperClass: string;
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

export function ModelingCardFullBleed({
  title,
  titleMobile,
  imageSrc,
  imageId,
  imageSrcMobile,
  imageLayerBackground,
  imageLayerBackgroundMobile,
  imageFillClassName = "object-cover object-center",
  imageFillClassNameDesktop = "object-contain",
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
  titleMarginTopCompensate,
  descriptionMarginTop,
  descriptionLinesMobile,
  textColor,
  hipHopMobileLayout,
  bridalMobileLayout,
  portraitMobileLayout,
  imgMobileWrapperClass,
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
  const hasDesktopTitle = title.trim().length > 0;
  const hasMobileTitle = (titleMobile ?? "").trim().length > 0;
  const hasHipHopMobileMultilineTitle =
    hipHopMobileLayout && (titleMobile ?? "").includes("\n");

  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div className="absolute inset-0" data-landing-image={imageId}>
        {imageLayerBackground && imageLayerBackgroundMobile ? (
          <>
            <div className={imgMobileWrapperClass} style={imageLayerBackgroundMobile} />
            <div className={imgDesktopWrapperClass} style={imageLayerBackground} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              ...(imageLayerBackground ?? undefined),
              ...(!imageLayerBackground
                ? { backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }
                : {}),
            }}
          />
        )}
        {!imageLayerBackground && imageSrc ? (
          imageSrcMobile != null ? (
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
        className={`absolute inset-0 z-10 px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textColor} ${!independentTitleDescription ? `flex flex-col gap-[calc(1.5rem*var(--ms,1))] ${hipHopMobileLayout ? "items-center justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(0.25rem*var(--ms,1))] max-sm:translate-y-[calc(-0.3rem*var(--ms,1))] text-center sm:gap-[calc(1.5rem*var(--ms,1))] sm:px-[calc(2rem*var(--ms,1))] sm:pb-[calc(0.5rem*var(--ms,1))] sm:translate-y-[calc(1.6rem*var(--ms,1))]" : bridalMobileLayout ? "justify-center max-sm:!ml-0 max-sm:!mt-0 max-sm:translate-x-[calc(0.6rem*var(--ms,1))] max-sm:translate-y-[calc(6rem*var(--ms,1))] max-sm:gap-[calc(0.75rem*var(--ms,1))] max-sm:px-[calc(1rem*var(--ms,1))] max-sm:items-start max-sm:text-left sm:-translate-x-[min(calc(7.5rem*var(--ms,1)),16vw)] sm:-translate-y-[min(calc(7rem*var(--ms,1)),18vh)] sm:items-start sm:text-left" : `justify-center ${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
        style={overlayTextContainerStyle}
      >
        {independentTitleDescription ? (
          portraitMobileLayout ? (
            <>
              <div className="absolute inset-0 z-20 flex -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(3rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] sm:hidden">
                <h3 className={PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS}>
                  {(titleMobile ?? title) === PORTRAIT_MOBILE_TITLE_FULL ? (
                    <>
                      <span className="block whitespace-nowrap">3D Portrait</span>
                      <span className="block whitespace-nowrap">Jewelry</span>
                    </>
                  ) : (
                    <span className="whitespace-pre-wrap">{renderModelingTitleText(titleMobile ?? title)}</span>
                  )}
                </h3>
                <div className={PORTRAIT_MOBILE_OVERLAY_DESC_CLASS}>
                  {descriptionLinesMobile!.map((line, i) => (
                    <span key={`portrait-mobile-${i}`} className="block">
                      {renderModelingCopyLine(line)}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`absolute inset-0 hidden sm:block ${desktopOverlayShiftClassName ?? ""}`}
              >
                {hasDesktopTitle ? (
                  <div
                    className={`${textAlignClass}`}
                    style={{
                      position: "absolute",
                      top: titleBlockTop ?? "20%",
                      left: titleBlockLeft ?? "8%",
                      right: textAlign === "left" ? undefined : "8%",
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
                        descriptionAlign === "right"
                          ? "8%"
                          : textAlign === "left"
                            ? undefined
                            : "8%",
                    }}
                  >
                    <DescriptionTag className={descriptionClassName}>
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
                  className={`${textAlignClass}`}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
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
                      descriptionAlign === "right"
                        ? "8%"
                        : textAlign === "left"
                          ? undefined
                          : "8%",
                  }}
                >
                  <DescriptionTag className={descriptionClassName}>
                    {descriptionContent}
                  </DescriptionTag>
                </div>
              ) : null}
            </>
          )
        ) : (
          <>
            {hasDesktopTitle || hasMobileTitle ? (
              <h3
                className={`${titleClassNameResolved} ${hasDescriptionContent ? "h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible sm:h-[calc(24px*var(--ms,1)*var(--mt,1))]" : ""} ${hipHopMobileLayout ? "mt-[calc(0.5rem*var(--ms,1))] self-center text-center max-sm:-translate-y-[calc(3rem*var(--ms,1))] sm:-translate-y-[calc(6rem*var(--ms,1))]" : ""} ${hasHipHopMobileMultilineTitle ? "max-sm:leading-[calc(1.22rem*var(--ms,1)*var(--mt,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={{
                  ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                  ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                }}
              >
                {hasMobileTitle ? (
                  <span className="whitespace-pre-wrap sm:hidden">{renderModelingTitleText(titleMobile ?? "")}</span>
                ) : null}
                {hasDesktopTitle ? (
                  <span className="hidden whitespace-pre-wrap sm:inline">{renderModelingTitleText(title)}</span>
                ) : null}
              </h3>
            ) : null}
            {hasDescriptionContent ? (
              <DescriptionTag
                className={`${descriptionClassName}${hipHopMobileLayout ? " max-sm:mt-[calc(1rem*var(--ms,1))] max-sm:w-[min(100%,calc(280px*var(--ms,1)))] max-sm:max-w-full sm:absolute sm:bottom-[calc(4rem*var(--ms,1))] sm:left-1/2 sm:mt-0 sm:w-[min(100%,calc(560px*var(--ms,1)))] sm:-translate-x-1/2" : ""}${bridalMobileLayout ? " max-sm:!-mt-[calc(0.5rem*var(--ms,1))] max-sm:w-full sm:w-auto sm:self-start sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={
                  titleMarginTopCompensate && titleMarginTop != null
                    ? {
                        marginTop:
                          descriptionMarginTop != null
                            ? `calc(${descriptionMarginTop} - ${titleMarginTop})`
                            : `calc(0px - ${titleMarginTop})`,
                      }
                    : descriptionMarginTop != null
                      ? { marginTop: descriptionMarginTop }
                      : undefined
                }
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
