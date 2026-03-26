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
  "flex w-full flex-col items-end gap-0 font-sans text-[20px] font-bold leading-[20px] tracking-[-0.449px] text-black";
const PORTRAIT_MOBILE_TITLE_FULL = "3D Portrait Jewelry";
const PORTRAIT_MOBILE_OVERLAY_DESC_CLASS =
  "w-[155px] max-w-full text-right font-sans text-[12px] font-light leading-4 text-[#364153]";

/** Props for one Modeling Specialization card. Լրիվ սյուն, aspect 83/43, սուր անկյուններ. */
export type ModelingCardProps = {
  title: string;
  /** Single paragraph; ignored when descriptionLines is set. */
  description: string;
  /** When set, description is rendered as one block per line (e.g. Hip-Hop). */
  descriptionLines?: string[];
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
};

const DEFAULT_IMAGE_POSITION = "center center";

export function ModelingCard({
  title,
  description,
  descriptionLines,
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
  const lineWrapClass = noDescriptionMaxWidth ? "leading-[22px]" : "leading-[22px] whitespace-nowrap";
  const hipHopMobileLineClass =
    "block whitespace-normal leading-[16px] sm:whitespace-nowrap sm:leading-[22px]";
  /** First two Hip-Hop lines: one visual line each on mobile (no mid-line wrap). */
  const hipHopMobileLineSingleLineClass =
    "block max-sm:whitespace-nowrap leading-[16px] sm:whitespace-nowrap sm:leading-[22px]";
  const bridalRowWrapperClass = bridalMobileLayout
    ? "flex w-full flex-col items-end gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-1"
    : "flex flex-wrap items-baseline gap-x-4 gap-y-1";
  const bridalRowSpanClass = bridalMobileLayout
    ? "max-sm:!m-0 max-sm:!translate-x-0 max-sm:block max-sm:w-[291px] max-sm:max-w-full max-sm:text-left max-sm:font-sans max-sm:text-[12px] max-sm:font-light max-sm:!leading-4 max-sm:text-[#364153] sm:inline"
    : "";
  const bridalRowSpanClassDesktop = `${bridalRowSpanClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[14px] sm:leading-[22px] sm:text-black" : ""}`;
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
                  className={`${bridalRowSpanClass} ${lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[14px] sm:leading-[22px] sm:text-black" : ""} ${i < 2 ? "max-sm:whitespace-nowrap" : "max-sm:whitespace-normal"}`}
                >
                  {line}
                </span>
              ))}
            </div>
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
          </>
        ) : (
          <div className={bridalRowWrapperClass}>
            {descriptionLines!.map((line, i) => (
              <span
                key={i}
                id={i === 0 ? firstDescriptionLineId : undefined}
                className={`${bridalRowSpanClass} ${i === 0 ? `${lineWrapClass} whitespace-nowrap` : lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[14px] sm:leading-[22px] sm:text-black" : ""}`}
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
      ? "text-[32px] leading-[24px] scale-x-105 origin-left"
      : "text-[40px] leading-[28px]";
  const titleClassName = `font-manrope ${titleSizeClass} ${titleBold ? "font-bold" : "font-extrabold"} ${textColor}`;
  const titleClassNameResolved = hipHopMobileLayout
    ? `font-sans text-[20px] font-bold leading-[28px] tracking-[-0.449px] ${textColor} sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:scale-x-105 sm:origin-left sm:tracking-normal ${titleBold ? "sm:font-bold" : "sm:font-extrabold"}`
    : bridalMobileLayout
      ? `font-sans text-[20px] font-bold leading-[28px] tracking-[-0.449px] text-black sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:scale-x-105 sm:origin-left sm:tracking-normal ${titleBold ? "sm:font-bold" : "sm:font-extrabold"} sm:text-black`
      : titleClassName;
  const descriptionClassName = hipHopMobileLayout
    ? `font-sans w-full text-[12px] font-light leading-[16px] text-center sm:max-w-[560px] sm:font-manrope sm:text-[14px] sm:leading-[22px] sm:text-left ${descriptionColor}`
    : `font-manrope font-light ${hasLines ? `text-[14px] leading-[22px] ${noDescriptionMaxWidth ? "" : "max-w-[560px]"}` : "text-[16px] leading-[26px] max-w-[407px]"} ${descriptionColor}`;
  const descriptionClassNameGradient = `font-manrope font-light text-[16px] leading-[26px] ${descriptionColor}`;
  const imageStyle = { objectPosition: imagePosition };
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
    hasLines && !fluidTextLayout ? "translate-x-6 translate-y-24" : "";

  if (!gradient) {
    return (
      <article
        className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
      >
        <div
          className="absolute inset-0"
          data-landing-image={imageId}
          style={{
            ...(imageLayerBackground ?? undefined),
            ...(!imageLayerBackground
              ? { backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }
              : {}),
          }}
        >
          {!imageLayerBackground && imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-contain"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          ) : null}
        </div>
        <div
          className={`absolute inset-0 z-10 px-6 py-8 md:px-8 md:py-10 ${textColor} ${!independentTitleDescription ? `flex flex-col justify-center gap-6 ${hipHopMobileLayout ? "max-sm:items-center max-sm:gap-3 max-sm:translate-x-0 max-sm:translate-y-[72px] max-sm:px-4 max-sm:pb-6 max-sm:text-center sm:items-start sm:gap-6 sm:pr-[40%] sm:translate-x-6 sm:translate-y-24 sm:text-left" : bridalMobileLayout ? `max-sm:!ml-0 max-sm:!mt-0 max-sm:translate-y-20 max-sm:gap-3 max-sm:px-4 max-sm:items-start max-sm:text-left sm:translate-y-0 sm:items-end sm:text-right` : `${overlayTextContainerClass} ${overlayTranslateClass} ${textAlignClass}`}` : ""}`}
          style={overlayTextContainerStyle}
        >
          {independentTitleDescription ? (
            portraitMobileLayout ? (
              <>
                <div className="absolute inset-0 z-20 flex -translate-x-[11.5rem] -translate-y-4 flex-col items-end justify-end gap-3 px-4 pb-8 sm:hidden">
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
                    className={`max-w-[407px] ${descriptionBlockAlignClass}`}
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
                  className={`max-w-[407px] ${descriptionBlockAlignClass}`}
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
                className={`${titleClassNameResolved} ${hipHopMobileLayout ? "max-sm:mt-2 max-sm:self-center max-sm:text-center sm:self-auto sm:text-left" : ""} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""} ${bridalMobileLayout ? "max-sm:!mr-0 max-sm:!mt-2 max-sm:!self-start max-sm:!text-left sm:!self-end sm:!text-right" : ""}`}
                style={{
                  ...(titleMarginRight != null && { marginRight: titleMarginRight }),
                  ...(titleMarginTop != null && { marginTop: titleMarginTop }),
                }}
              >
                {title}
              </h3>
              <DescriptionTag
                className={`${descriptionClassName}${hipHopMobileLayout ? " max-sm:-mt-2" : ""}${bridalMobileLayout ? " max-sm:!-mt-2 max-sm:w-full" : ""}`}
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
      className="flex min-h-[320px] min-w-0 w-full flex-col overflow-hidden max-md:min-h-[400px] md:min-h-0 md:flex-row md:items-stretch md:aspect-[83/43]"
      style={gradientFrameStyle}
    >
      {imageOnLeft && hasImage ? (
        <>
          <div
            className="relative order-2 h-[240px] shrink-0 overflow-hidden md:order-1 md:h-full md:min-h-0 md:w-1/2"
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
                className="object-contain"
                style={imageStyle}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : null}
          </div>
          <div
            className={`order-1 flex flex-col justify-center gap-6 px-6 py-8 text-white md:order-2 md:w-1/2 md:px-8 md:py-10 ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[40px] leading-[28px] ${
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
            className={`flex flex-col justify-center gap-6 px-6 py-8 text-white md:w-1/2 md:px-8 md:py-10 ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[40px] leading-[28px] ${
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
            className="relative h-[240px] shrink-0 overflow-hidden md:h-full md:min-h-0 md:w-1/2"
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
                className="object-contain"
                style={imageStyle}
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : null}
          </div>
        </>
      ) : (
        <div
          className={`flex flex-col justify-center gap-6 px-6 py-8 text-white md:w-full md:px-8 md:py-10 ${textAlignClass}`}
        >
          <h3
            className={`font-manrope text-[40px] leading-[28px] ${
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
