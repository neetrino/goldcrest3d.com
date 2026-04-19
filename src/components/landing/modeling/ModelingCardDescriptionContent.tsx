import type { ReactNode } from "react";

import { HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX } from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";
import { renderModelingCopyLine } from "./modeling-copy-line";

export type ModelingCardDescriptionContentParams = Pick<
  ModelingCardProps,
  | "description"
  | "descriptionLines"
  | "descriptionLinesDesktop"
  | "descriptionLinesMobile"
  | "descriptionLayout"
  | "firstDescriptionLineId"
  | "firstDescriptionLineMarginRight"
  | "firstDescriptionLineTranslateX"
  | "secondDescriptionLineTranslateX"
> & {
  hasLines: boolean;
  hipHopMobileLayout: boolean;
  bridalMobileLayout: boolean;
  lineWrapClass: string;
  hipHopMobileLineClass: string;
  hipHopMobileLineSingleLineClass: string;
  bridalRowWrapperClass: string;
  bridalRowSpanClass: string;
  bridalRowSpanClassDesktop: string;
};

export function renderModelingCardDescriptionContent(
  p: ModelingCardDescriptionContentParams,
): ReactNode {
  const {
    description,
    descriptionLines,
    descriptionLinesDesktop,
    descriptionLinesMobile,
    descriptionLayout = "stack",
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
  } = p;

  if (!hasLines || !descriptionLines) {
    return description;
  }

  if (descriptionLayout === "row") {
    if (bridalMobileLayout) {
      return (
        <>
          {descriptionLinesMobile != null && descriptionLinesMobile.length > 0 ? (
            <div className="flex w-full flex-col items-start gap-0.5 sm:hidden">
              {descriptionLinesMobile.map((line, i) => (
                <span
                  key={`bridal-mobile-${i}`}
                  className={`${bridalRowSpanClass} ${lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""} ${i < 2 ? "max-sm:whitespace-nowrap" : "max-sm:whitespace-normal"}`}
                >
                  {renderModelingCopyLine(line)}
                </span>
              ))}
            </div>
          ) : null}
          {descriptionLinesDesktop != null && descriptionLinesDesktop.length > 0 ? (
            <div className="hidden w-full min-w-0 flex-col items-start sm:flex sm:-translate-x-[calc(-0.1rem*var(--ms,1))]">
              <div className="flex w-fit max-w-full flex-col items-start gap-0.5 text-left">
                {descriptionLinesDesktop.map((line, i) => (
                  <span
                    key={`bridal-desktop-stack-${i}`}
                    id={i === 0 ? firstDescriptionLineId : undefined}
                    className={`block font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black ${
                      line.trim() === "Secure prong architecture developed for long-term wear."
                        ? "mt-[calc(0.875rem*var(--ms,1))]"
                        : ""
                    }`}
                  >
                    {line.includes(" settings built for durability,") ? (
                      <>
                        {line.split(" settings built for durability,")[0]}
                        <span className="block">settings built for durability,</span>
                      </>
                    ) : line.includes(" long-term wear.") ? (
                      <>
                        {line.split(" long-term wear.")[0]}
                        <span className="block">long-term wear.</span>
                      </>
                    ) : (
                      renderModelingCopyLine(line)
                    )}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </>
      );
    }

    return (
      <div className={bridalRowWrapperClass}>
        {descriptionLines.map((line, i) => (
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
            {renderModelingCopyLine(line)}
          </span>
        ))}
      </div>
    );
  }

  if (hipHopMobileLayout) {
    return (
      <>
        {descriptionLines.length > 0 ? (
          <div className="sm:hidden">
            {descriptionLines.map((line, i) => (
              line.includes(" structural") ? (
                <span key={i} className={hipHopMobileLineClass}>
                  {line.split(" structural")[0]}
                  <span className="block">structural{line.split(" structural")[1] ?? ""}</span>
                </span>
              ) : (
                <span key={i} className={hipHopMobileLineClass}>
                  {renderModelingCopyLine(line)}
                </span>
              )
            ))}
          </div>
        ) : null}
        {descriptionLinesDesktop != null && descriptionLinesDesktop.length > 0 ? (
          <div className="hidden min-w-0 flex-col items-center sm:flex sm:gap-0">
            {descriptionLinesDesktop.map((line, i) => (
              <span
                key={`hiphop-desktop-${i}`}
                className={`block text-center ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"} ${i > 0 ? "sm:mt-[calc(0.375rem*var(--ms,1))]" : ""}`}
              >
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  return descriptionLines.map((line, i) => (
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
      {renderModelingCopyLine(line)}
    </span>
  ));
}
