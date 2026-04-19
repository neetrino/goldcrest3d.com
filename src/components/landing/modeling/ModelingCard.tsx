import type { CSSProperties, ReactNode } from "react";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { framingToCoverImageStyle } from "@/lib/site-media/image-framing";

import { renderModelingCardDescriptionContent } from "./ModelingCardDescriptionContent";
import { ModelingCardFullBleed } from "./ModelingCardFullBleed";
import { ModelingCardGradientLayout } from "./ModelingCardGradientLayout";
import { getModelingCardWidthStyle } from "./modeling-card.constants";
import { DEFAULT_IMAGE_POSITION } from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";

export type { ModelingCardProps } from "./modeling-card.types";

export function ModelingCard({
  title,
  titleMobile,
  mobileTitleFontSizePx,
  description,
  descriptionRichHtml,
  descriptionRichHtmlMobile,
  mobileBodyFontSizePx,
  descriptionLines,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  imageSrc,
  imageId,
  gradient,
  imageOnLeft,
  textAlign,
  titleBold = false,
  titleCompact = false,
  descriptionMuted = false,
  imagePosition = DEFAULT_IMAGE_POSITION,
  imageLayerBackground,
  imageLayerBackgroundMobile,
  imageSrcMobile,
  imagePairBreakpoint = "sm",
  textDark = false,
  textInsetLeft,
  textShiftLeft,
  noDescriptionMaxWidth = false,
  fluidTextLayout = false,
  textBlockAlign = "start",
  descriptionLayout = "stack",
  titleAlignSelf,
  titleMarginRight,
  titleMarginTop,
  titleMarginTopCompensate,
  textBlockMarginLeft,
  textBlockMarginTop,
  descriptionMarginTop,
  firstDescriptionLineId,
  firstDescriptionLineMarginRight,
  firstDescriptionLineTranslateX,
  secondDescriptionLineTranslateX,
  independentTitleDescription = false,
  titleBlockTop,
  titleBlockLeft,
  titleShiftClassName,
  descriptionBlockTop,
  descriptionBlockLeft,
  desktopOverlayShiftClassName,
  descriptionAlign,
  mobileHipHopTypography = false,
  mobileBridalTypography = false,
  mobilePortraitTypography = false,
  forceMobileViewport = false,
  imageFillClassName = "object-cover object-center",
  imageFillClassNameDesktop = "object-contain",
  imageFramingDesktop,
  imageFramingMobile,
}: ModelingCardProps) {
  const usesRichDescription =
    Boolean(descriptionRichHtml?.trim()) || Boolean(descriptionRichHtmlMobile?.trim());
  const hasLines =
    Boolean(descriptionLines && descriptionLines.length > 0) && !usesRichDescription;
  const hipHopMobileLayout = mobileHipHopTypography && hasLines;
  const bridalMobileLayout =
    mobileBridalTypography && hasLines && fluidTextLayout && descriptionLayout === "row";
  const portraitMobileLayout =
    mobilePortraitTypography &&
    (hasLines || usesRichDescription) &&
    independentTitleDescription &&
    (usesRichDescription ||
      (descriptionLinesMobile != null && descriptionLinesMobile.length > 0));

  const titleMobileDisplay = titleMobile ?? "";
  const titleSplitMobileClass =
    forceMobileViewport
      ? "block"
      : imagePairBreakpoint === "md"
        ? "md:hidden"
        : "sm:hidden";
  const titleSplitDesktopClass =
    forceMobileViewport
      ? "hidden"
      : imagePairBreakpoint === "md"
        ? "hidden md:block"
        : "hidden sm:block";
  const desktopUpTitleTypographyClass =
    imagePairBreakpoint === "md"
      ? "md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:scale-x-105 md:origin-left md:tracking-normal"
      : "sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-left sm:tracking-normal";
  const desktopUpBodyTypographyClass =
    imagePairBreakpoint === "md"
      ? "md:font-manrope md:text-[calc(14px*var(--ms,1)*var(--mt,1))] md:leading-[calc(22px*var(--ms,1)*var(--mt,1))]"
      : "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";

  const textColor = textDark ? "text-black" : "text-white";
  const descriptionColor = textDark
    ? descriptionMuted
      ? "text-black/70"
      : "text-black"
    : descriptionMuted
      ? "text-white/60"
      : "text-white";
  const lineWrapClass = noDescriptionMaxWidth
    ? "leading-[calc(22px*var(--ms,1)*var(--mt,1))]"
    : "leading-[calc(22px*var(--ms,1)*var(--mt,1))] whitespace-nowrap";
  const hipHopMobileLineClass =
    forceMobileViewport
      ? "block whitespace-normal leading-[calc(16px*var(--ms,1)*var(--mt,1))]"
      : "block whitespace-normal leading-[calc(16px*var(--ms,1)*var(--mt,1))] sm:whitespace-nowrap sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";
  const hipHopMobileLineSingleLineClass =
    forceMobileViewport
      ? "block whitespace-nowrap leading-[calc(16px*var(--ms,1)*var(--mt,1))]"
      : "block max-sm:whitespace-nowrap leading-[calc(16px*var(--ms,1)*var(--mt,1))] sm:whitespace-nowrap sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";
  const bridalRowWrapperClass = bridalMobileLayout
    ? forceMobileViewport
      ? "flex w-full flex-col items-end gap-2"
      : "flex w-full flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1"
    : "flex flex-wrap items-baseline gap-x-4 gap-y-1";
  const bridalRowSpanClass = bridalMobileLayout
    ? "max-sm:!m-0 max-sm:!translate-x-0 max-sm:block max-sm:w-[calc(291px*var(--ms,1))] max-sm:max-w-full max-sm:text-left max-sm:font-sans max-sm:text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] max-sm:font-light max-sm:!leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] max-sm:text-[#364153] sm:inline"
    : "";
  const bridalRowSpanClassDesktop = `${bridalRowSpanClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""}`;
  const bridalRowSpanClassDesktopResolved =
    forceMobileViewport && bridalMobileLayout
      ? bridalRowSpanClass
      : bridalRowSpanClassDesktop;

  const titleSizeClass =
    titleCompact || hasLines
      ? "text-[calc(32px*var(--ms,1)*var(--mt,1))] leading-[calc(24px*var(--ms,1)*var(--mt,1))] scale-x-105 origin-left"
      : "text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))]";
  const titleClassName = forceMobileViewport
    ? `font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] ${textColor}`
    : `font-manrope ${titleSizeClass} ${titleBold ? "font-bold" : "font-extrabold"} ${textColor}`;
  const titleClassNameResolved = hipHopMobileLayout
    ? forceMobileViewport
      ? `font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] ${textColor}`
      : `font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] ${textColor} ${desktopUpTitleTypographyClass} ${titleBold ? (imagePairBreakpoint === "md" ? "md:font-bold" : "sm:font-bold") : (imagePairBreakpoint === "md" ? "md:font-extrabold" : "sm:font-extrabold")}`
    : bridalMobileLayout
      ? forceMobileViewport
        ? "font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black"
        : `font-sans text-[calc(var(--modeling-mobile-title-font-px,20)*1px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(var(--modeling-mobile-title-font-px,20)*1.4*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black ${desktopUpTitleTypographyClass} ${titleBold ? (imagePairBreakpoint === "md" ? "md:font-bold" : "sm:font-bold") : (imagePairBreakpoint === "md" ? "md:font-extrabold" : "sm:font-extrabold")} ${imagePairBreakpoint === "md" ? "md:text-black" : "sm:text-black"}`
      : titleClassName;
  const descriptionClassName = forceMobileViewport
    ? `font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] ${descriptionColor}`
    : hipHopMobileLayout
      ? `font-sans w-full text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] text-center ${imagePairBreakpoint === "md" ? "md:max-w-[calc(560px*var(--ms,1))] md:text-center" : "sm:max-w-[calc(560px*var(--ms,1))] sm:text-center"} ${desktopUpBodyTypographyClass} ${descriptionColor}`
      : `font-manrope font-light ${hasLines ? `text-[calc(14px*var(--ms,1)*var(--mt,1))] leading-[calc(22px*var(--ms,1)*var(--mt,1))] ${noDescriptionMaxWidth ? "" : "max-w-[calc(560px*var(--ms,1))]"}` : "text-[calc(16px*var(--ms,1)*var(--mt,1))] leading-[calc(26px*var(--ms,1)*var(--mt,1))] max-w-[calc(407px*var(--ms,1))]"} ${descriptionColor}`;
  const descriptionClassNameGradient = `font-manrope font-light text-[calc(16px*var(--ms,1)*var(--mt,1))] leading-[calc(26px*var(--ms,1)*var(--mt,1))] ${descriptionColor}`;

  const modelingRichBodyLayout =
    "[&_p:not(:last-child)]:mb-[0.22em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

  const desktopRichHtml = descriptionRichHtml ?? "";
  const mobileRichHtmlOnly = descriptionRichHtmlMobile ?? "";

  let descriptionContent: ReactNode;
  let portraitOverlayDescription: ReactNode | undefined;

  const hasAnyRichDescription =
    desktopRichHtml.trim().length > 0 || mobileRichHtmlOnly.trim().length > 0;

  if (usesRichDescription && hasAnyRichDescription) {
    const richDesktopClassName = `modeling-slot-rich-body whitespace-pre ${modelingRichBodyLayout} ${descriptionClassName}`;
    const richMobileClassName = `modeling-slot-rich-body whitespace-pre ${modelingRichBodyLayout} font-sans text-[calc(var(--modeling-mobile-body-font-px,12)*1px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(var(--modeling-mobile-body-font-px,12)*1.333*var(--ms,1)*var(--mt,1))] ${descriptionColor}`;
    const richDesktopNode =
      desktopRichHtml.trim().length > 0 ? (
        <HeroBannerBodyRichText body={desktopRichHtml} className={richDesktopClassName} />
      ) : null;
    const richMobileNode =
      mobileRichHtmlOnly.trim().length > 0 ? (
        <HeroBannerBodyRichText body={mobileRichHtmlOnly} className={richMobileClassName} />
      ) : null;
    if (portraitMobileLayout) {
      descriptionContent = richDesktopNode;
      portraitOverlayDescription = richMobileNode;
    } else if (richDesktopNode || richMobileNode) {
      const mobileVisible =
        forceMobileViewport
          ? "block"
          : imagePairBreakpoint === "md"
            ? "md:hidden"
            : "sm:hidden";
      const desktopVisible =
        forceMobileViewport
          ? "hidden"
          : imagePairBreakpoint === "md"
            ? "hidden md:block"
            : "hidden sm:block";
      descriptionContent = (
        <>
          <div className={mobileVisible}>{richMobileNode}</div>
          <div className={desktopVisible}>{richDesktopNode}</div>
        </>
      );
    }
  } else {
    descriptionContent = renderModelingCardDescriptionContent({
      description,
      descriptionLines,
      descriptionLinesDesktop,
      descriptionLinesMobile,
      descriptionLayout,
      firstDescriptionLineId,
      firstDescriptionLineMarginRight,
      firstDescriptionLineTranslateX,
      secondDescriptionLineTranslateX,
      hasLines,
      hipHopMobileLayout,
      bridalMobileLayout,
      lineWrapClass,
      hipHopMobileLineClass,
      hipHopMobileLineSingleLineClass,
      bridalRowWrapperClass,
      bridalRowSpanClass,
      bridalRowSpanClassDesktop: bridalRowSpanClassDesktopResolved,
    });
  }

  const DescriptionTag = hasLines || usesRichDescription ? "div" : "p";
  const basePositionStyle: CSSProperties = { objectPosition: imagePosition };
  const imageStyleDesktop = imageFramingDesktop
    ? framingToCoverImageStyle(imageFramingDesktop)
    : basePositionStyle;
  const imageStyleMobile = imageFramingMobile
    ? framingToCoverImageStyle(imageFramingMobile)
    : imageFramingDesktop
      ? framingToCoverImageStyle(imageFramingDesktop)
      : basePositionStyle;
  const imgMobileWrapperClass =
    forceMobileViewport
      ? "absolute inset-0"
      : imagePairBreakpoint === "md"
        ? "absolute inset-0 md:hidden"
        : "absolute inset-0 sm:hidden";
  const imgDesktopWrapperClass =
    forceMobileViewport
      ? "absolute inset-0 hidden"
      : imagePairBreakpoint === "md"
        ? "absolute inset-0 hidden md:block"
        : "absolute inset-0 hidden sm:block";
  const textAlignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : "text-left";
  const descriptionBlockAlignClass =
    descriptionAlign === "right"
      ? "text-right"
      : descriptionAlign === "left"
        ? "text-left"
        : textAlignClass;

  const fluidAlignClass =
    textBlockAlign === "center"
      ? "items-center"
      : textBlockAlign === "end"
        ? "items-end"
        : "items-start";
  const overlayTextContainerClass = fluidTextLayout
    ? fluidAlignClass
    : imageOnLeft
      ? hasLines
        ? "items-end pl-[40%]"
        : textInsetLeft
          ? "items-end"
          : "items-end pl-[50%]"
      : hasLines
        ? "items-start pr-[40%]"
        : "items-start pr-[50%]";
  const overlayTextContainerStyle =
    fluidTextLayout && (textBlockMarginLeft != null || textBlockMarginTop != null)
      ? {
          ...(textBlockMarginLeft != null && { marginLeft: textBlockMarginLeft }),
          ...(textBlockMarginTop != null && { marginTop: textBlockMarginTop }),
        }
      : !fluidTextLayout && imageOnLeft && (textInsetLeft != null || textShiftLeft != null)
        ? {
            ...(textInsetLeft != null && { paddingLeft: textInsetLeft }),
            ...(textShiftLeft != null && { marginRight: textShiftLeft }),
          }
        : undefined;
  const overlayTranslateClass =
    hasLines && !fluidTextLayout
      ? "translate-x-[calc(1.5rem*var(--ms,1))] translate-y-[calc(6rem*var(--ms,1))]"
      : "";

  if (!gradient) {
    return (
      <ModelingCardFullBleed
        title={title}
        titleMobileDisplay={titleMobileDisplay}
        titleSplitMobileClass={titleSplitMobileClass}
        titleSplitDesktopClass={titleSplitDesktopClass}
        imageSrc={imageSrc}
        imageId={imageId}
        imageSrcMobile={imageSrcMobile}
        imageLayerBackground={imageLayerBackground}
        imageLayerBackgroundMobile={imageLayerBackgroundMobile}
        imageFillClassName={imageFillClassName}
        imageFillClassNameDesktop={imageFillClassNameDesktop}
        independentTitleDescription={independentTitleDescription}
        textAlign={textAlign}
        titleBlockTop={titleBlockTop}
        titleBlockLeft={titleBlockLeft}
        titleShiftClassName={titleShiftClassName}
        descriptionBlockTop={descriptionBlockTop}
        descriptionBlockLeft={descriptionBlockLeft}
        desktopOverlayShiftClassName={desktopOverlayShiftClassName}
        descriptionAlign={descriptionAlign}
        titleAlignSelf={titleAlignSelf}
        titleMarginRight={titleMarginRight}
        titleMarginTop={titleMarginTop}
        titleMarginTopCompensate={titleMarginTopCompensate}
        descriptionMarginTop={descriptionMarginTop}
        descriptionLinesMobile={descriptionLinesMobile}
        forceMobileViewport={forceMobileViewport}
        textColor={textColor}
        hipHopMobileLayout={hipHopMobileLayout}
        bridalMobileLayout={bridalMobileLayout}
        portraitMobileLayout={portraitMobileLayout}
        imgMobileWrapperClass={imgMobileWrapperClass}
        imgDesktopWrapperClass={imgDesktopWrapperClass}
        imageStyleMobile={imageStyleMobile}
        imageStyleDesktop={imageStyleDesktop}
        overlayTextContainerClass={overlayTextContainerClass}
        overlayTranslateClass={overlayTranslateClass}
        textAlignClass={textAlignClass}
        descriptionBlockAlignClass={descriptionBlockAlignClass}
        overlayTextContainerStyle={overlayTextContainerStyle}
        titleClassName={titleClassName}
        titleClassNameResolved={titleClassNameResolved}
        descriptionClassName={descriptionClassName}
        mobileTitleFontSizePx={mobileTitleFontSizePx}
        mobileBodyFontSizePx={mobileBodyFontSizePx}
        descriptionContent={descriptionContent}
        portraitOverlayDescription={portraitOverlayDescription}
        DescriptionTag={DescriptionTag}
        usesRichDescription={usesRichDescription}
      />
    );
  }

  const gradientFrameStyle = {
    ...getModelingCardWidthStyle(),
    background: gradient,
  } as const;

  const hasImage = imageSrc != null && imageId != null;

  return (
    <ModelingCardGradientLayout
      title={title}
      imageSrc={imageSrc}
      imageId={imageId}
      imageOnLeft={imageOnLeft}
      imageLayerBackground={imageLayerBackground}
      imageFillClassName={imageFillClassName}
      titleBold={titleBold}
      gradientFrameStyle={gradientFrameStyle}
      hasImage={hasImage}
      imageStyle={imageStyleDesktop}
      textAlignClass={textAlignClass}
      descriptionContent={descriptionContent}
      descriptionClassNameGradient={descriptionClassNameGradient}
      DescriptionTag={DescriptionTag}
    />
  );
}
