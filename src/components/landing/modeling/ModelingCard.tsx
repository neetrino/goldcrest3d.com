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
  description,
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
  imageFillClassName = "object-cover object-center",
  imageFillClassNameDesktop = "object-contain",
}: ModelingCardProps) {
  const hasNonEmptyLines = (lines: string[] | undefined): boolean =>
    Boolean(lines?.some((line) => line.trim().length > 0));
  const hasLines =
    hasNonEmptyLines(descriptionLines) ||
    hasNonEmptyLines(descriptionLinesDesktop) ||
    hasNonEmptyLines(descriptionLinesMobile);
  const hasDescriptionContent = hasLines || description.trim().length > 0;
  const hipHopMobileLayout = mobileHipHopTypography;
  const bridalMobileLayout =
    mobileBridalTypography && hasLines && fluidTextLayout && descriptionLayout === "row";
  const portraitMobileLayout =
    mobilePortraitTypography &&
    hasLines &&
    independentTitleDescription;
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
    "block whitespace-normal leading-[calc(16px*var(--ms,1)*var(--mt,1))] sm:whitespace-nowrap sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";
  const hipHopMobileLineSingleLineClass =
    "block max-sm:whitespace-nowrap leading-[calc(16px*var(--ms,1)*var(--mt,1))] sm:whitespace-nowrap sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";
  const bridalRowWrapperClass = bridalMobileLayout
    ? "flex w-full flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1"
    : "flex flex-wrap items-baseline gap-x-4 gap-y-1";
  const bridalRowSpanClass = bridalMobileLayout
    ? "max-sm:!m-0 max-sm:!translate-x-0 max-sm:block max-sm:w-[calc(291px*var(--ms,1))] max-sm:max-w-full max-sm:text-left max-sm:font-sans max-sm:text-[calc(12px*var(--ms,1)*var(--mt,1))] max-sm:font-light max-sm:!leading-[calc(1rem*var(--ms,1)*var(--mt,1))] max-sm:text-[#364153] sm:inline"
    : "";
  const bridalRowSpanClassDesktop = `${bridalRowSpanClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""}`;

  const descriptionContent = renderModelingCardDescriptionContent({
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
    bridalRowSpanClassDesktop,
  });

  const DescriptionTag = hasLines ? "div" : "p";
  const titleSizeClass =
    titleCompact || hasLines
      ? "text-[calc(32px*var(--ms,1)*var(--mt,1))] leading-[calc(24px*var(--ms,1)*var(--mt,1))] scale-x-105 origin-left"
      : "text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))]";
  const titleClassName = `font-manrope ${titleSizeClass} ${titleBold ? "font-bold" : "font-extrabold"} ${textColor}`;
  const titleClassNameResolved = hipHopMobileLayout
    ? `font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] ${textColor} sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-left sm:tracking-normal ${titleBold ? "sm:font-bold" : "sm:font-extrabold"}`
    : bridalMobileLayout
      ? `font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:scale-x-105 sm:origin-left sm:tracking-normal ${titleBold ? "sm:font-bold" : "sm:font-extrabold"} sm:text-black`
      : titleClassName;
  const descriptionClassName = hipHopMobileLayout
    ? `font-sans w-full text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(16px*var(--ms,1)*var(--mt,1))] text-center sm:max-w-[calc(560px*var(--ms,1))] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-center ${descriptionColor}`
    : `font-manrope font-light ${hasLines ? `text-[calc(14px*var(--ms,1)*var(--mt,1))] leading-[calc(22px*var(--ms,1)*var(--mt,1))] ${noDescriptionMaxWidth ? "" : "max-w-[calc(560px*var(--ms,1))]"}` : "text-[calc(16px*var(--ms,1)*var(--mt,1))] leading-[calc(26px*var(--ms,1)*var(--mt,1))] max-w-[calc(407px*var(--ms,1))]"} ${descriptionColor}`;
  const descriptionClassNameGradient = `font-manrope font-light text-[calc(16px*var(--ms,1)*var(--mt,1))] leading-[calc(26px*var(--ms,1)*var(--mt,1))] ${descriptionColor}`;
  const imageStyle = { objectPosition: imagePosition };
  const imgMobileWrapperClass =
    imagePairBreakpoint === "md"
      ? "absolute inset-0 md:hidden"
      : "absolute inset-0 sm:hidden";
  const imgDesktopWrapperClass =
    imagePairBreakpoint === "md"
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
        titleMobile={titleMobile}
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
        textColor={textColor}
        hipHopMobileLayout={hipHopMobileLayout}
        bridalMobileLayout={bridalMobileLayout}
        portraitMobileLayout={portraitMobileLayout}
        imgMobileWrapperClass={imgMobileWrapperClass}
        imgDesktopWrapperClass={imgDesktopWrapperClass}
        imageStyle={imageStyle}
        overlayTextContainerClass={overlayTextContainerClass}
        overlayTranslateClass={overlayTranslateClass}
        textAlignClass={textAlignClass}
        descriptionBlockAlignClass={descriptionBlockAlignClass}
        overlayTextContainerStyle={overlayTextContainerStyle}
        titleClassName={titleClassName}
        titleClassNameResolved={titleClassNameResolved}
        descriptionClassName={descriptionClassName}
        descriptionContent={descriptionContent}
        hasDescriptionContent={hasDescriptionContent}
        DescriptionTag={DescriptionTag}
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
      imageStyle={imageStyle}
      textAlignClass={textAlignClass}
      descriptionContent={descriptionContent}
      descriptionClassNameGradient={descriptionClassNameGradient}
      hasDescriptionContent={hasDescriptionContent}
      DescriptionTag={DescriptionTag}
    />
  );
}
