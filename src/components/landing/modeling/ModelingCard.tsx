import type { CSSProperties } from "react";
import Image from "next/image";

import {
  LANDING_MEDIA_CONTAIN_FRAME_BG,
  LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED,
} from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

/** With `mobileHipHopTypography`, stack lines from this index are `hidden sm:block` (tail desktop-only on mobile). */
const HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX = 2;

/** 3D Portrait — `sm:hidden` overlay only; desktop uses existing Manrope + absolute layout. */
const PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS =
  "flex w-full flex-col items-end gap-0 font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black";
const PORTRAIT_MOBILE_TITLE_FULL = "3D Portrait Jewelry";
const PORTRAIT_MOBILE_OVERLAY_DESC_CLASS =
  "w-[calc(155px*var(--ms,1))] max-w-full text-right font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153]";

/** Props for one Modeling Specialization card. Լրիվ սյուն, aspect 83/43, սուր անկյուններ. */
export type ModelingCardProps = {
  title: string;
  /** Single paragraph; ignored when descriptionLines is set. */
  description: string;
  /** When set, description is rendered as one block per line (e.g. Hip-Hop). */
  descriptionLines?: string[];
  /**
   * Hip-Hop: with `mobileHipHopTypography`, `sm+` uses these lines instead of `descriptionLines` (mobile unchanged).
   * Bridal: with `mobileBridalTypography` + row layout, `sm+` can use these as a right-aligned stack instead of the two-line row.
   */
  descriptionLinesDesktop?: string[];
  /**
   * With `mobileBridalTypography`: below `sm`, these lines replace `descriptionLines` (e.g. split first paragraph); `sm+` still uses `descriptionLines`.
   */
  descriptionLinesMobile?: string[];
  /** When omitted, card shows gradient + text only (no image column). */
  imageSrc?: string;
  /** data-landing-image id for this card's image (section-by-section replacement). */
  imageId?: string;
  /** If set, card uses gradient background and image in one half; if not, image is full-cover with text overlay. */
  gradient?: string;
  imageOnLeft: boolean;
  /** Figma: left, right, or center (Bridal is center). */
  textAlign: "left" | "right" | "center";
  /** Figma: blocks 1–3 ExtraBold, 4–6 Bold */
  titleBold?: boolean;
  /** When true, title uses same size as Bridal block: 32px, leading 24px, scale-x-105. */
  titleCompact?: boolean;
  /** Figma: only Ancient & Heritage uses rgba(255,255,255,0.6) for description */
  descriptionMuted?: boolean;
  /** Critical: where the image is anchored (e.g. "right center" so pendant stays visible). */
  imagePosition?: string;
  /** Figma CSS background on full-bleed layer (replaces next/image when set). */
  imageLayerBackground?: Pick<CSSProperties, "background">;
  /** Second full-bleed background for small viewports when set (with `imageLayerBackground` for `md+`). */
  imageLayerBackgroundMobile?: Pick<CSSProperties, "background">;
  /**
   * Below `sm`: this URL (static asset); `sm+`: `imageSrc` (CMS / default).
   * Only with `imageSrc` and without `imageLayerBackground`.
   */
  imageSrcMobile?: string;
  /**
   * When `imageSrc` + `imageSrcMobile` or dual layer backgrounds: width at which the desktop asset applies.
   * Use `md` for CMS desktop/mobile pairs so tablets use the desktop file.
   */
  imagePairBreakpoint?: "sm" | "md";
  /** When true, title and description use black text (e.g. Bridal on light background). */
  textDark?: boolean;
  /** Override left inset for text (e.g. "38%") when imageOnLeft. */
  textInsetLeft?: string;
  /** When set with imageOnLeft, shifts the text block left (margin-right on the text container). */
  textShiftLeft?: string;
  /** When true and descriptionLines is used, omit max-width so only explicit line breaks apply. */
  noDescriptionMaxWidth?: boolean;
  /** When true, no fixed inset/margin; text area uses only padding; use textBlockAlign for position. */
  fluidTextLayout?: boolean;
  /** With fluidTextLayout: where the text block sits (start = left, end = right, center). */
  textBlockAlign?: "start" | "end" | "center";
  /** When "row" and descriptionLines, render lines side by side; default "stack". */
  descriptionLayout?: "stack" | "row";
  /** When "start", only the title aligns to the left; description keeps container alignment. */
  titleAlignSelf?: "start" | "end";
  /** Optional margin-right on the title (shifts title left when aligned end). */
  titleMarginRight?: string;
  /** Optional margin-top on the title only (pushes title down). */
  titleMarginTop?: string;
  /** When true and titleMarginTop is set, description gets negative margin so it stays in place. */
  titleMarginTopCompensate?: boolean;
  /** With fluidTextLayout: shift the whole text block right (e.g. "8%"). */
  textBlockMarginLeft?: string;
  /** With fluidTextLayout: shift the whole text block down (e.g. "6%"). */
  textBlockMarginTop?: string;
  /** Margin-top on the description only (moves description down, title unchanged). */
  descriptionMarginTop?: string;
  /** Id for the first description line only (when descriptionLines + row); isolates it for styling. */
  firstDescriptionLineId?: string;
  /** Margin-right on the first description line only (adds space before second line in row layout). */
  firstDescriptionLineMarginRight?: string;
  /** Translate first description line horizontally (e.g. "-6%" moves it left) in row layout. */
  firstDescriptionLineTranslateX?: string;
  /** Translate second description line horizontally (e.g. "-4%" moves it left) in row layout. */
  secondDescriptionLineTranslateX?: string;
  /** When true, title and description are positioned independently (absolute top/left). */
  independentTitleDescription?: boolean;
  /** With independentTitleDescription: title position top (e.g. "18%"). */
  titleBlockTop?: string;
  /** With independentTitleDescription: title position left (e.g. "8%"). */
  titleBlockLeft?: string;
  /** With independentTitleDescription: description position top (e.g. "32%"). */
  descriptionBlockTop?: string;
  /** With independentTitleDescription: description position left (e.g. "8%"). */
  descriptionBlockLeft?: string;
  /** When set, overrides textAlign for the description block only (e.g. right-aligned lines for flush-right typography). */
  descriptionAlign?: "left" | "right";
  /**
   * Hip-Hop block only: below `sm`, Inter title/body (Figma); `sm+` restores default Manrope layout.
   */
  mobileHipHopTypography?: boolean;
  /**
   * Bridal block only: below `sm`, Inter title + body (Figma); requires `fluidTextLayout` + `descriptionLayout="row"`.
   */
  mobileBridalTypography?: boolean;
  /**
   * 3D Portrait block only: below `sm`, `descriptionLinesMobile` copy; `sm+` keeps absolute title/description + `descriptionLines`.
   */
  mobilePortraitTypography?: boolean;
  /**
   * Optional `next/image` fill layer classes.
   * Default: `object-contain`.
   */
  imageFillClassName?: string;
  /** With `imageSrcMobile`: `sm+` image `className` (e.g. `object-contain`). */
  imageFillClassNameDesktop?: string;
};

const DEFAULT_IMAGE_POSITION = "center center";

export function ModelingCard({
  title,
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
  descriptionBlockTop,
  descriptionBlockLeft,
  descriptionAlign,
  mobileHipHopTypography = false,
  mobileBridalTypography = false,
  mobilePortraitTypography = false,
  imageFillClassName = "object-cover object-center",
  imageFillClassNameDesktop = "object-contain",
}: ModelingCardProps) {
  const hasLines = descriptionLines && descriptionLines.length > 0;
  const hipHopMobileLayout = mobileHipHopTypography && hasLines;
  const bridalMobileLayout =
    mobileBridalTypography && hasLines && fluidTextLayout && descriptionLayout === "row";
  const portraitMobileLayout =
    mobilePortraitTypography &&
    hasLines &&
    independentTitleDescription &&
    descriptionLinesMobile != null &&
    descriptionLinesMobile.length > 0;
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
  /** First two Hip-Hop lines: one visual line each on mobile (no mid-line wrap). */
  const hipHopMobileLineSingleLineClass =
    "block max-sm:whitespace-nowrap leading-[calc(16px*var(--ms,1)*var(--mt,1))] sm:whitespace-nowrap sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))]";
  const bridalRowWrapperClass = bridalMobileLayout
    ? "flex w-full flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1"
    : "flex flex-wrap items-baseline gap-x-4 gap-y-1";
  const bridalRowSpanClass = bridalMobileLayout
    ? "max-sm:!m-0 max-sm:!translate-x-0 max-sm:block max-sm:w-[calc(291px*var(--ms,1))] max-sm:max-w-full max-sm:text-left max-sm:font-sans max-sm:text-[calc(12px*var(--ms,1)*var(--mt,1))] max-sm:font-light max-sm:!leading-[calc(1rem*var(--ms,1)*var(--mt,1))] max-sm:text-[#364153] sm:inline"
    : "";
  const bridalRowSpanClassDesktop = `${bridalRowSpanClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""}`;
  const descriptionContent = hasLines
    ?         descriptionLayout === "row"
      ? bridalMobileLayout &&
        descriptionLinesMobile != null &&
        descriptionLinesMobile.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-start gap-0.5 sm:hidden">
              {descriptionLinesMobile.map((line, i) => (
                <span
                  key={`bridal-mobile-${i}`}
                  className={`${bridalRowSpanClass} ${lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""} ${i < 2 ? "max-sm:whitespace-nowrap" : "max-sm:whitespace-normal"}`}
                >
                  {line}
                </span>
              ))}
            </div>
            {descriptionLinesDesktop != null && descriptionLinesDesktop.length > 0 ? (
              <div className="hidden w-full min-w-0 flex-col items-start sm:flex">
                <div className="flex w-fit max-w-full flex-col items-start gap-0.5 text-left">
                  {descriptionLinesDesktop.map((line, i) => (
                    <span
                      key={`bridal-desktop-stack-${i}`}
                      id={i === 0 ? firstDescriptionLineId : undefined}
                      className="block font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden flex-wrap items-baseline gap-x-4 gap-y-1 sm:flex">
                {descriptionLines!.map((line, i) => (
                  <span
                    key={`bridal-desktop-${i}`}
                    id={i === 0 ? firstDescriptionLineId : undefined}
                    className={`${bridalRowSpanClassDesktop} ${i === 0 ? `${lineWrapClass} whitespace-nowrap` : lineWrapClass}`}
                    style={
                      i === 0
                        ? {
                            ...(firstDescriptionLineMarginRight != null && {
                              marginRight: firstDescriptionLineMarginRight,
                            }),
                            ...(firstDescriptionLineTranslateX != null && {
                              transform: `translateX(${firstDescriptionLineTranslateX})`,
                            }),
                          }
                        : i === 1
                          ? {
                              marginLeft: "auto",
                              ...(secondDescriptionLineTranslateX != null && {
                                transform: `translateX(${secondDescriptionLineTranslateX})`,
                              }),
                            }
                          : undefined
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={bridalRowWrapperClass}>
            {descriptionLines!.map((line, i) => (
              <span
                key={i}
                id={i === 0 ? firstDescriptionLineId : undefined}
                className={`${bridalRowSpanClass} ${i === 0 ? `${lineWrapClass} whitespace-nowrap` : lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""}`}
                style={
                  i === 0
                    ? {
                        ...(firstDescriptionLineMarginRight != null && {
                          marginRight: firstDescriptionLineMarginRight,
                        }),
                        ...(firstDescriptionLineTranslateX != null && {
                          transform: `translateX(${firstDescriptionLineTranslateX})`,
                        }),
                      }
                    : i === 1
                      ? {
                          marginLeft: "auto",
                          ...(secondDescriptionLineTranslateX != null && {
                            transform: `translateX(${secondDescriptionLineTranslateX})`,
                          }),
                        }
                      : undefined
                }
              >
                {line}
              </span>
            ))}
          </div>
        )
      : hipHopMobileLayout &&
          descriptionLinesDesktop != null &&
          descriptionLinesDesktop.length > 0 ? (
          <>
            <div className="sm:hidden">
              {descriptionLines!.map((line, i) => (
                <span
                  key={i}
                  className={`${
                    i < HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX
                      ? hipHopMobileLineSingleLineClass
                      : hipHopMobileLineClass
                  }${i >= HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX ? " hidden sm:block" : ""}`}
                >
                  {line}
                </span>
              ))}
            </div>
            <div className="hidden min-w-0 flex-col sm:flex sm:translate-x-[calc(1.5rem*var(--ms,1))] sm:gap-0">
              {descriptionLinesDesktop.map((line, i) => (
                <span
                  key={`hiphop-desktop-${i}`}
                  className={`block ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"} ${i === 0 ? "sm:translate-x-[calc(0.5rem*var(--ms,1))] sm:translate-y-[calc(0.125rem*var(--ms,1))]" : ""} ${i === 1 ? "sm:mt-[calc(0.375rem*var(--ms,1))]" : ""} ${i === 2 ? "sm:mt-[calc(0.375rem*var(--ms,1))] sm:-translate-y-[calc(0.25rem*var(--ms,1))] sm:translate-x-[min(calc(19rem*var(--ms,1)),40vw)]" : ""}`}
                >
                  {line}
                </span>
              ))}
            </div>
          </>
        )
      : descriptionLines!.map((line, i) => (
          <span
            key={i}
            className={`${
              hipHopMobileLayout
                ? i < HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX
                  ? hipHopMobileLineSingleLineClass
                  : hipHopMobileLineClass
                : `block ${lineWrapClass}`
            }${hipHopMobileLayout && i >= HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX ? " hidden sm:block" : ""}`}
          >
            {line}
          </span>
        ))
    : description;
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
    ? `font-sans w-full text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(16px*var(--ms,1)*var(--mt,1))] text-center sm:max-w-[calc(560px*var(--ms,1))] sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-left ${descriptionColor}`
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
                    unoptimized
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
                    unoptimized
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
                unoptimized
              />
            )
          ) : null}
        </div>
        <div
          className={`absolute inset-0 z-10 px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textColor} ${!independentTitleDescription ? `flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] ${hipHopMobileLayout ? "max-sm:items-center max-sm:gap-[calc(0.75rem*var(--ms,1))] max-sm:translate-x-[calc(0.125rem*var(--ms,1))] max-sm:translate-y-[calc(72px*var(--ms,1))] max-sm:px-[calc(1rem*var(--ms,1))] max-sm:pb-[calc(1.5rem*var(--ms,1))] max-sm:text-center sm:items-start sm:gap-[calc(1.5rem*var(--ms,1))] sm:pr-[40%] sm:translate-x-[calc(3.75rem*var(--ms,1))] sm:translate-y-[calc(8.5rem*var(--ms,1))] sm:text-left" : bridalMobileLayout ? "max-sm:!ml-0 max-sm:!mt-0 max-sm:translate-y-[calc(5rem*var(--ms,1))] max-sm:gap-[calc(0.75rem*var(--ms,1))] max-sm:px-[calc(1rem*var(--ms,1))] max-sm:items-start max-sm:text-left sm:-translate-x-[min(calc(13.5rem*var(--ms,1)),32vw)] sm:-translate-y-[min(calc(12rem*var(--ms,1)),28vh)] sm:items-end sm:text-right" : `${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
          style={overlayTextContainerStyle}
        >
          {independentTitleDescription ? (
            portraitMobileLayout ? (
              <>
                <div className="absolute inset-0 z-20 flex -translate-x-[min(calc(12.5rem*var(--ms,1)),45vw)] -translate-y-[calc(1rem*var(--ms,1))] flex-col items-end justify-end gap-[calc(0.75rem*var(--ms,1))] px-[calc(1rem*var(--ms,1))] pb-[calc(2rem*var(--ms,1))] sm:hidden">
                  <h3 className={PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS}>
                    {title === PORTRAIT_MOBILE_TITLE_FULL ? (
                      <>
                        <span className="block whitespace-nowrap">3D Portrait</span>
                        <span className="block whitespace-nowrap">Jewelry</span>
                      </>
                    ) : (
                      title
                    )}
                  </h3>
                  <div className={PORTRAIT_MOBILE_OVERLAY_DESC_CLASS}>
                    {descriptionLinesMobile!.map((line, i) => (
                      <span key={`portrait-mobile-${i}`} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 hidden sm:block">
                  <div
                    className={`${textAlignClass}`}
                    style={{
                      position: "absolute",
                      top: titleBlockTop ?? "20%",
                      left: titleBlockLeft ?? "8%",
                      right: textAlign === "left" ? undefined : "8%",
                    }}
                  >
                    <h3 className={titleClassName}>{title}</h3>
                  </div>
                  <div
                    className={`max-w-[calc(407px*var(--ms,1))] ${descriptionBlockAlignClass}`}
                    style={{
                      position: "absolute",
                      top: descriptionBlockTop ?? "32%",
                      left: descriptionBlockLeft ?? "14%",
                      right: descriptionAlign === "right" ? "8%" : textAlign === "left" ? undefined : "8%",
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
                  className={`${textAlignClass}`}
                  style={{
                    position: "absolute",
                    top: titleBlockTop ?? "20%",
                    left: titleBlockLeft ?? "8%",
                    right: textAlign === "left" ? undefined : "8%",
                  }}
                >
                  <h3 className={titleClassName}>{title}</h3>
                </div>
                <div
                  className={`max-w-[calc(407px*var(--ms,1))] ${descriptionBlockAlignClass}`}
                  style={{
                    position: "absolute",
                    top: descriptionBlockTop ?? "32%",
                    left: descriptionBlockLeft ?? "14%",
                    right: descriptionAlign === "right" ? "8%" : textAlign === "left" ? undefined : "8%",
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
              <h3
                className={`${titleClassNameResolved} ${hipHopMobileLayout ? "max-sm:mt-[calc(0.5rem*var(--ms,1))] max-sm:self-center max-sm:text-center sm:self-auto sm:text-left sm:translate-x-[min(calc(15.25rem*var(--ms,1)),32vw)] sm:translate-y-[calc(0.25rem*var(--ms,1))]" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-[calc(0.5rem*var(--ms,1))] max-sm:!self-start max-sm:!text-left sm:!self-start sm:!text-left sm:!mr-0 sm:ml-[calc(7rem*var(--ms,1))]" : ""}`}
                style={{
                  ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                  ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                }}
              >
                {title}
              </h3>
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

  const gradientFrameStyle = {
    ...getModelingCardWidthStyle(),
    background: gradient,
  } as const;

  const hasImage = imageSrc != null && imageId != null;

  return (
    <article
      className="flex min-h-[calc(320px*var(--ms,1))] min-w-0 w-full flex-col overflow-hidden max-md:min-h-[calc(400px*var(--ms,1))] md:min-h-0 md:flex-row md:items-stretch md:aspect-[83/43]"
      style={gradientFrameStyle}
    >
      {imageOnLeft && hasImage ? (
        <>
          <div
            className="relative order-2 h-[calc(240px*var(--ms,1))] shrink-0 overflow-hidden md:order-1 md:h-full md:min-h-0 md:w-1/2"
            data-landing-image={imageId}
            style={{
              ...(imageLayerBackground ?? undefined),
              ...(!imageLayerBackground ? { backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG } : {}),
            }}
          >
            {!imageLayerBackground ? (
              <Image
                src={imageSrc!}
                alt=""
                fill
                className={imageFillClassName}
                style={imageStyle}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : null}
          </div>
          <div
            className={`order-1 flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:order-2 md:w-1/2 md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
            >
              {title}
            </h3>
            <DescriptionTag className={descriptionClassNameGradient}>
              {descriptionContent}
            </DescriptionTag>
          </div>
        </>
      ) : hasImage ? (
        <>
          <div
            className={`flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:w-1/2 md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
            >
              {title}
            </h3>
            <DescriptionTag className={descriptionClassNameGradient}>
              {descriptionContent}
            </DescriptionTag>
          </div>
          <div
            className="relative h-[calc(240px*var(--ms,1))] shrink-0 overflow-hidden md:h-full md:min-h-0 md:w-1/2"
            data-landing-image={imageId}
            style={{
              ...(imageLayerBackground ?? undefined),
              ...(!imageLayerBackground ? { backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG } : {}),
            }}
          >
            {!imageLayerBackground ? (
              <Image
                src={imageSrc!}
                alt=""
                fill
                className={imageFillClassName}
                style={imageStyle}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : null}
          </div>
        </>
      ) : (
        <div
          className={`flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:w-full md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
        >
          <h3
            className={`font-manrope text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${
              titleBold ? "font-bold" : "font-extrabold"
            }`}
          >
            {title}
          </h3>
          <DescriptionTag className={descriptionClassNameGradient}>
            {descriptionContent}
          </DescriptionTag>
        </div>
      )}
    </article>
  );
}
