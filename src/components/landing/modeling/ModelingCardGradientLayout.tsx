import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG } from "@/components/landing/landing-media-frame.constants";

import type { ModelingCardProps } from "./modeling-card.types";

export type ModelingCardGradientLayoutProps = Pick<
  ModelingCardProps,
  | "title"
  | "imageSrc"
  | "imageId"
  | "imageOnLeft"
  | "imageLayerBackground"
  | "imageFillClassName"
  | "titleBold"
> & {
  gradientFrameStyle: CSSProperties;
  hasImage: boolean;
  imageStyle: CSSProperties;
  textAlignClass: string;
  descriptionContent: ReactNode;
  descriptionClassNameGradient: string;
  DescriptionTag: "div" | "p";
};

export function ModelingCardGradientLayout({
  title,
  imageSrc,
  imageId,
  imageOnLeft,
  imageLayerBackground,
  imageFillClassName = "object-cover object-center",
  titleBold = false,
  gradientFrameStyle,
  hasImage,
  imageStyle,
  textAlignClass,
  descriptionContent,
  descriptionClassNameGradient,
  DescriptionTag,
}: ModelingCardGradientLayoutProps) {
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
