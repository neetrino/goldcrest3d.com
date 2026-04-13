"use client";

import { useEffect, useMemo, useState } from "react";
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

function ModelingCardTitleLines({ title }: { title: string }) {
  if (!title.includes("\n")) {
    return title;
  }
  return title.split(/\r?\n/).map((line, i) => (
    <span key={`modeling-title-line-${i}`} className="block">
      {line}
    </span>
  ));
}

export type ModelingCardFullBleedProps = Pick<
  ModelingCardProps,
  | "title"
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
  imageStyleMobile: CSSProperties;
  imageStyleDesktop: CSSProperties;
  overlayTextContainerClass: string;
  overlayTranslateClass: string;
  textAlignClass: string;
  descriptionBlockAlignClass: string;
  overlayTextContainerStyle: CSSProperties | undefined;
  titleClassName: string;
  titleClassNameResolved: string;
  descriptionClassName: string;
  descriptionContent: ReactNode;
  /** When portrait layout uses distinct mobile rich HTML, render this in the small-viewport overlay. */
  portraitOverlayDescription?: ReactNode;
  /** Resolved mobile title (falls back to desktop `title` when no separate mobile title). */
  titleMobileResolved: string;
  hasDistinctTitleMobile: boolean;
  titleSplitMobileClass: string;
  titleSplitDesktopClass: string;
  DescriptionTag: "div" | "p";
  usesRichDescription: boolean;
};

export function ModelingCardFullBleed({
  title,
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
  imageStyleMobile,
  imageStyleDesktop,
  overlayTextContainerClass,
  overlayTranslateClass,
  textAlignClass,
  descriptionBlockAlignClass,
  overlayTextContainerStyle,
  titleClassName,
  titleClassNameResolved,
  descriptionClassName,
  descriptionContent,
  portraitOverlayDescription,
  titleMobileResolved,
  hasDistinctTitleMobile,
  titleSplitMobileClass,
  titleSplitDesktopClass,
  DescriptionTag,
  usesRichDescription,
}: ModelingCardFullBleedProps) {
  const [hipHopZoomCompensation, setHipHopZoomCompensation] = useState(1);

  useEffect(() => {
    if (!hipHopMobileLayout || typeof window === "undefined") {
      return;
    }

    const baselineDevicePixelRatio = window.devicePixelRatio || 1;

    const updateCompensation = () => {
      const currentDevicePixelRatio = window.devicePixelRatio || baselineDevicePixelRatio;
      const compensation = baselineDevicePixelRatio / currentDevicePixelRatio;
      setHipHopZoomCompensation(Math.max(1, compensation));
    };

    updateCompensation();
    window.addEventListener("resize", updateCompensation);
    window.visualViewport?.addEventListener("resize", updateCompensation);

    return () => {
      window.removeEventListener("resize", updateCompensation);
      window.visualViewport?.removeEventListener("resize", updateCompensation);
    };
  }, [hipHopMobileLayout]);

  const overlayTextStyleResolved = useMemo<CSSProperties | undefined>(() => {
    if (!hipHopMobileLayout) {
      return overlayTextContainerStyle;
    }

    const existingTransform = overlayTextContainerStyle?.transform;

    return {
      ...overlayTextContainerStyle,
      transform: existingTransform
        ? `${existingTransform} scale(${hipHopZoomCompensation})`
        : `scale(${hipHopZoomCompensation})`,
      transformOrigin: "center bottom",
    };
  }, [hipHopMobileLayout, hipHopZoomCompensation, overlayTextContainerStyle]);

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
                  style={imageStyleMobile}
                  sizes="(max-width: 767px) 100vw, 0px"
                />
              </div>
              <div className={imgDesktopWrapperClass}>
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className={imageFillClassNameDesktop}
                  style={imageStyleDesktop}
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
              style={imageStyleDesktop}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )
        ) : null}
      </div>
      <div
        className={`absolute inset-0 z-10 px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textColor} ${!independentTitleDescription ? `flex flex-col gap-[calc(1.5rem*var(--ms,1))] ${hipHopMobileLayout ? "items-center justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(0.25rem*var(--ms,1))] max-sm:translate-y-[calc(-0.3rem*var(--ms,1))] text-center sm:gap-[calc(1.5rem*var(--ms,1))] sm:px-[calc(2rem*var(--ms,1))] sm:pb-[calc(0.5rem*var(--ms,1))] sm:translate-y-[calc(1.6rem*var(--ms,1))]" : bridalMobileLayout ? "justify-center max-sm:!ml-0 max-sm:!mt-0 max-sm:translate-y-[calc(5rem*var(--ms,1))] max-sm:gap-[calc(0.75rem*var(--ms,1))] max-sm:px-[calc(1rem*var(--ms,1))] max-sm:items-start max-sm:text-left sm:-translate-x-[min(calc(13.5rem*var(--ms,1)),32vw)] sm:-translate-y-[min(calc(12rem*var(--ms,1)),28vh)] sm:items-end sm:text-right" : `justify-center ${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
        style={overlayTextStyleResolved}
      >
        {independentTitleDescription ? (
          portraitMobileLayout ? (
            <>
              <div className="absolute inset-0 z-20 flex -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(3rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] sm:hidden">
                <h3 className={PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS}>
                  {usesRichDescription ? (
                    <ModelingCardTitleLines
                      title={hasDistinctTitleMobile ? titleMobileResolved : title}
                    />
                  ) : (hasDistinctTitleMobile ? titleMobileResolved : title) ===
                    PORTRAIT_MOBILE_TITLE_FULL ? (
                    <>
                      <span className="block whitespace-nowrap">3D Portrait</span>
                      <span className="block whitespace-nowrap">Jewelry</span>
                    </>
                  ) : (
                    hasDistinctTitleMobile ? titleMobileResolved : title
                  )}
                </h3>
                <div
                  className={
                    usesRichDescription
                      ? `${PORTRAIT_MOBILE_OVERLAY_DESC_CLASS} modeling-slot-rich-body`
                      : PORTRAIT_MOBILE_OVERLAY_DESC_CLASS
                  }
                >
                  {usesRichDescription ? (
                    portraitOverlayDescription ?? descriptionContent
                  ) : (
                    descriptionLinesMobile!.map((line, i) => (
                      <span key={`portrait-mobile-${i}`} className="block">
                        {line}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div
                className={`absolute inset-0 hidden sm:block ${desktopOverlayShiftClassName ?? ""}`}
              >
                <div
                  className={`${textAlignClass}`}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
                  }}
                >
                  <h3 className={`${titleClassName} ${titleShiftClassName ?? ""}`}>
                    <ModelingCardTitleLines title={title} />
                  </h3>
                </div>
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
              </div>
            </>
          ) : (
            <>
              <div
                className={`${textAlignClass} ${hasDistinctTitleMobile ? titleSplitMobileClass : ""}`}
                style={{
                  position: "absolute",
                  top: titleBlockTop ?? "20%",
                  left: titleBlockLeft ?? "8%",
                  right: textAlign === "left" ? undefined : "8%",
                }}
              >
                <h3 className={`${titleClassName} ${titleShiftClassName ?? ""}`}>
                  <ModelingCardTitleLines
                    title={hasDistinctTitleMobile ? titleMobileResolved : title}
                  />
                </h3>
              </div>
              {hasDistinctTitleMobile ? (
                <div
                  className={`${textAlignClass} ${titleSplitDesktopClass}`}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
                  }}
                >
                  <h3 className={`${titleClassName} ${titleShiftClassName ?? ""}`}>
                    <ModelingCardTitleLines title={title} />
                  </h3>
                </div>
              ) : null}
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
            </>
          )
        ) : (
          <>
            {hasDistinctTitleMobile ? (
              <>
                <h3
                  className={`${titleClassNameResolved} ${titleSplitMobileClass} ${hipHopMobileLayout ? "mt-[calc(0.5rem*var(--ms,1))] self-center text-center translate-y-[calc(0.5rem*var(--ms,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                  style={{
                    ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                    ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                  }}
                >
                  <ModelingCardTitleLines title={titleMobileResolved} />
                </h3>
                <h3
                  className={`${titleClassNameResolved} ${titleSplitDesktopClass} ${hipHopMobileLayout ? "mt-[calc(0.5rem*var(--ms,1))] self-center text-center translate-y-[calc(0.5rem*var(--ms,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                  style={{
                    ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                    ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                  }}
                >
                  <ModelingCardTitleLines title={title} />
                </h3>
              </>
            ) : (
              <h3
                className={`${titleClassNameResolved} ${hipHopMobileLayout ? "mt-[calc(0.5rem*var(--ms,1))] self-center text-center translate-y-[calc(0.5rem*var(--ms,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={{
                  ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                  ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                }}
              >
                <ModelingCardTitleLines title={title} />
              </h3>
            )}
            <DescriptionTag
              className={`${descriptionClassName}${hipHopMobileLayout ? " max-sm:-mt-[calc(0.5rem*var(--ms,1))]" : ""}${bridalMobileLayout ? " max-sm:!-mt-[calc(0.5rem*var(--ms,1))] max-sm:w-full sm:w-auto sm:self-start sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
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
          </>
        )}
      </div>
    </article>
  );
}
