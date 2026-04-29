import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { LANDING_MEDIA_CONTAIN_FRAME_BG } from "@/components/landing/landing-media-frame.constants";

import type { ModelingCardProps } from "./modeling-card.types";
import { renderModelingTitleText } from "./modeling-copy-line";

export type ModelingCardGradientLayoutProps = Pick<
  ModelingCardProps,
  | "title"
  | "imageSrc"
  | "imageId"
  | "imageOnLeft"
  | "imageLayerBackground"
  | "imageFillClassName"
  | "titleBold"
  | "titleOffsetYDesktop"
  | "titleOffsetYMobile"
  | "descriptionOffsetYDesktop"
  | "descriptionOffsetYMobile"
> & {
  gradientFrameStyle: CSSProperties;
  hasImage: boolean;
  imageStyle: CSSProperties;
  textAlignClass: string;
  descriptionContent: ReactNode;
  descriptionClassNameGradient: string;
  hasDescriptionContent: boolean;
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
  titleOffsetYDesktop = 0,
  descriptionOffsetYDesktop = 0,
  gradientFrameStyle,
  hasImage,
  imageStyle,
  textAlignClass,
  descriptionContent,
  descriptionClassNameGradient,
  hasDescriptionContent,
  DescriptionTag,
}: ModelingCardGradientLayoutProps) {
  const titleTransform = `translateY(calc(${titleOffsetYDesktop}% * var(--ms,1)))`;
  const descriptionTransform = `translateY(calc(${descriptionOffsetYDesktop}% * var(--ms,1)))`;
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
              />
            ) : null}
          </div>
          <div
            className={`order-1 flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:order-2 md:w-1/2 md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
          >
            <h3
              className={`font-manrope whitespace-pre-wrap text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${hasDescriptionContent ? "h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible" : ""} ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
              style={{ transform: titleTransform }}
            >
              {renderModelingTitleText(title)}
            </h3>
            {hasDescriptionContent ? (
              <DescriptionTag
                className={descriptionClassNameGradient}
                style={{ transform: descriptionTransform }}
              >
                {descriptionContent}
              </DescriptionTag>
            ) : null}
          </div>
        </>
      ) : hasImage ? (
        <>
          <div
            className={`flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:w-1/2 md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
          >
            <h3
              className={`font-manrope whitespace-pre-wrap text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${hasDescriptionContent ? "h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible" : ""} ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
              style={{ transform: titleTransform }}
            >
              {renderModelingTitleText(title)}
            </h3>
            {hasDescriptionContent ? (
              <DescriptionTag
                className={descriptionClassNameGradient}
                style={{ transform: descriptionTransform }}
              >
                {descriptionContent}
              </DescriptionTag>
            ) : null}
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
              />
            ) : null}
          </div>
        </>
      ) : (
        <div
          className={`flex flex-col justify-center gap-[calc(1.5rem*var(--ms,1))] px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] text-white md:w-full md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textAlignClass}`}
        >
          <h3
            className={`font-manrope whitespace-pre-wrap text-[calc(40px*var(--ms,1)*var(--mt,1))] leading-[calc(28px*var(--ms,1)*var(--mt,1))] ${hasDescriptionContent ? "h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible" : ""} ${
              titleBold ? "font-bold" : "font-extrabold"
            }`}
            style={{ transform: titleTransform }}
          >
            {renderModelingTitleText(title)}
          </h3>
          {hasDescriptionContent ? (
            <DescriptionTag
              className={descriptionClassNameGradient}
              style={{ transform: descriptionTransform }}
            >
              {descriptionContent}
            </DescriptionTag>
          ) : null}
        </div>
      )}
    </article>
  );
}
