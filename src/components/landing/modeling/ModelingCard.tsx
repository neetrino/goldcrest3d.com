import type { CSSProperties } from "react";
import Image from "next/image";

import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

/** Props for one Modeling Specialization card. Լրիվ սյուն, aspect 83/43, սուր անկյուններ. */
export type ModelingCardProps = {
  title: string;
  /** Single paragraph; ignored when descriptionLines is set. */
  description: string;
  /** When set, description is rendered as one block per line (e.g. Hip-Hop). */
  descriptionLines?: string[];
  imageSrc: string;
  /** data-landing-image id for this card's image (section-by-section replacement). */
  imageId: string;
  /** If set, card uses gradient background and image in one half; if not, image is full-cover with text overlay. */
  gradient?: string;
  imageOnLeft: boolean;
  /** Figma: left, right, or center (Bridal is center). */
  textAlign: "left" | "right" | "center";
  /** Figma: blocks 1–3 ExtraBold, 4–6 Bold */
  titleBold?: boolean;
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
};

const DEFAULT_IMAGE_POSITION = "center center";

export function ModelingCard({
  title,
  description,
  descriptionLines,
  imageSrc,
  imageId,
  gradient,
  imageOnLeft,
  textAlign,
  titleBold = false,
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
  textBlockMarginLeft,
  textBlockMarginTop,
  descriptionMarginTop,
  firstDescriptionLineId,
  firstDescriptionLineMarginRight,
  firstDescriptionLineTranslateX,
  secondDescriptionLineTranslateX,
}: ModelingCardProps) {
  const hasLines = descriptionLines && descriptionLines.length > 0;
  const textColor = textDark ? "text-black" : "text-white";
  const descriptionColor = textDark
    ? descriptionMuted
      ? "text-black/70"
      : "text-black"
    : descriptionMuted
      ? "text-white/60"
      : "text-white";
  const lineWrapClass = noDescriptionMaxWidth ? "leading-[22px]" : "leading-[22px] whitespace-nowrap";
  const descriptionContent = hasLines
    ?         descriptionLayout === "row"
      ? (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {descriptionLines!.map((line, i) => (
              <span
                key={i}
                id={i === 0 ? firstDescriptionLineId : undefined}
                className={i === 0 ? `${lineWrapClass} whitespace-nowrap` : lineWrapClass}
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
          <span key={i} className={`block ${lineWrapClass}`}>
            {line}
          </span>
        ))
    : description;
  const DescriptionTag = hasLines ? "div" : "p";
  const titleClassName = `font-manrope ${hasLines ? "text-[32px] leading-[24px] scale-x-105 origin-left" : "text-[40px] leading-[28px]"} ${titleBold ? "font-bold" : "font-extrabold"} ${textColor}`;
  const descriptionClassName = `font-manrope font-light ${hasLines ? `text-[14px] leading-[22px] ${noDescriptionMaxWidth ? "" : "max-w-[560px]"}` : "text-[16px] leading-[26px] max-w-[407px]"} ${descriptionColor}`;
  const descriptionClassNameGradient = `font-manrope font-light text-[16px] leading-[26px] ${descriptionColor}`;
  const imageStyle = { objectPosition: imagePosition };
  const textAlignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : "text-left";

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

  const overlayFrameStyle = {
    ...getModelingCardWidthStyle(),
    aspectRatio: MODELING_CARD_ASPECT_RATIO,
  } as const;

  if (!gradient) {
    return (
      <article
        className="relative min-w-0 w-full overflow-hidden"
        style={overlayFrameStyle}
      >
        <div
          className="absolute inset-0"
          data-landing-image={imageId}
          style={imageLayerBackground ?? undefined}
        >
          {!imageLayerBackground ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          ) : null}
        </div>
        <div
          className={`absolute inset-0 z-10 flex flex-col justify-center gap-6 px-6 py-8 md:px-8 md:py-10 ${textColor} ${overlayTextContainerClass} ${textAlignClass} ${overlayTranslateClass}`}
          style={overlayTextContainerStyle}
        >
          <h3
            className={`${titleClassName} ${titleAlignSelf === "start" ? "self-start text-left" : titleAlignSelf === "end" ? "self-end text-right" : ""}`}
            style={titleMarginRight != null ? { marginRight: titleMarginRight } : undefined}
          >
            {title}
          </h3>
          <DescriptionTag
            className={descriptionClassName}
            style={descriptionMarginTop != null ? { marginTop: descriptionMarginTop } : undefined}
          >
            {descriptionContent}
          </DescriptionTag>
        </div>
      </article>
    );
  }

  const gradientFrameStyle = {
    ...getModelingCardWidthStyle(),
    background: gradient,
  } as const;

  return (
    <article
      className="flex min-h-[320px] min-w-0 w-full flex-col overflow-hidden max-md:min-h-[400px] md:min-h-0 md:flex-row md:items-stretch md:aspect-[83/43]"
      style={gradientFrameStyle}
    >
      {imageOnLeft ? (
        <>
          <div
            className="relative order-2 h-[240px] shrink-0 overflow-hidden md:order-1 md:h-full md:min-h-0 md:w-1/2"
            data-landing-image={imageId}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
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
      ) : (
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
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </>
      )}
    </article>
  );
}
