import type { CSSProperties } from "react";
import Image from "next/image";

import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

/** Props for one Modeling Specialization card. Լրիվ սյուն, aspect 83/43, սուր անկյուններ. */
export type ModelingCardProps = {
  title: string;
  description: string;
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
};

const DEFAULT_IMAGE_POSITION = "center center";

export function ModelingCard({
  title,
  description,
  imageSrc,
  imageId,
  gradient,
  imageOnLeft,
  textAlign,
  titleBold = false,
  descriptionMuted = false,
  imagePosition = DEFAULT_IMAGE_POSITION,
  imageLayerBackground,
}: ModelingCardProps) {
  const imageStyle = { objectPosition: imagePosition };
  const textAlignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : "text-left";

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
          className={`absolute inset-0 z-10 flex flex-col justify-center gap-6 px-6 py-8 text-white md:px-8 md:py-10 ${
            imageOnLeft ? "items-end pl-[50%]" : "items-start pr-[50%]"
          } ${textAlignClass}`}
        >
          <h3 className={`font-manrope text-[40px] leading-[28px] ${titleBold ? "font-bold" : "font-extrabold"}`}>
            {title}
          </h3>
          <p className={`font-manrope max-w-[407px] font-light text-[16px] leading-[26px] ${descriptionMuted ? "text-white/60" : "text-white"}`}>
            {description}
          </p>
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
            <p
              className={`font-manrope font-light text-[16px] leading-[26px] ${
                descriptionMuted ? "text-white/60" : "text-white"
              }`}
            >
              {description}
            </p>
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
            <p
              className={`font-manrope font-light text-[16px] leading-[26px] ${
                descriptionMuted ? "text-white/60" : "text-white"
              }`}
            >
              {description}
            </p>
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
