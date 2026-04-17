import type { ReactNode } from "react";

import { HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX } from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";

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
  | "hipHopSplitScope"
  | "bridalSplitScope"
  | "emulateMobileChrome"
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
    hipHopSplitScope = "full",
    bridalSplitScope = "full",
    hasLines,
    hipHopMobileLayout,
    bridalMobileLayout,
    lineWrapClass,
    hipHopMobileLineClass,
    hipHopMobileLineSingleLineClass,
    bridalRowWrapperClass,
    bridalRowSpanClass,
    bridalRowSpanClassDesktop,
    emulateMobileChrome = false,
  } = p;

  if (!hasLines || !descriptionLines) {
    return description;
  }

  if (
    emulateMobileChrome &&
    bridalMobileLayout &&
    descriptionLayout === "row" &&
    descriptionLinesMobile != null &&
    descriptionLinesMobile.length > 0 &&
    bridalSplitScope === "full"
  ) {
    return (
      <div className="flex w-full flex-col items-start gap-0.5">
        {descriptionLinesMobile.map((line, i) => (
          <span
            key={`bridal-emul-${i}`}
            className={`${bridalRowSpanClass} ${lineWrapClass} ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"}`}
          >
            {line.length === 0 ? "\u00A0" : line}
          </span>
        ))}
      </div>
    );
  }

  if (
    hipHopMobileLayout &&
    hipHopSplitScope === "mobile" &&
    descriptionLines.length > 0
  ) {
    return (
      <div>
        {descriptionLines.map((line, i) => (
          <span
            key={i}
            className={
              i < HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX
                ? hipHopMobileLineSingleLineClass
                : hipHopMobileLineClass
            }
          >
            {line.length === 0 ? "\u00A0" : line}
          </span>
        ))}
      </div>
    );
  }

  if (
    hipHopMobileLayout &&
    hipHopSplitScope === "desktop" &&
    descriptionLinesDesktop != null &&
    descriptionLinesDesktop.length > 0
  ) {
    return (
      <div className="flex min-w-0 flex-col items-center gap-0">
        {descriptionLinesDesktop.map((line, i) => (
          <span
            key={`hiphop-desktop-only-${i}`}
            className={`block text-center ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"} ${i > 0 ? "mt-[calc(0.375rem*var(--ms,1))]" : ""}`}
          >
            {line}
          </span>
        ))}
      </div>
    );
  }

  if (descriptionLayout === "row") {
    if (
      bridalMobileLayout &&
      descriptionLinesMobile != null &&
      descriptionLinesMobile.length > 0
    ) {
      if (bridalSplitScope === "desktop") {
        return descriptionLinesDesktop != null && descriptionLinesDesktop.length > 0 ? (
          <div className="flex w-full min-w-0 flex-col items-start">
            <div className="flex w-fit max-w-full flex-col items-start gap-0.5 text-left">
              {descriptionLinesDesktop.map((line, i) => (
                <span
                  key={`bridal-desktop-stack-only-${i}`}
                  id={i === 0 ? firstDescriptionLineId : undefined}
                  className="block font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {descriptionLines.map((line, i) => (
              <span
                key={`bridal-desktop-row-${i}`}
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
        );
      }
      if (bridalSplitScope === "mobile") {
        return (
          <div className="flex w-full flex-col items-start gap-0.5">
            {descriptionLinesMobile.map((line, i) => (
              <span
                key={`bridal-mobile-only-${i}`}
                className={`${bridalRowSpanClass} ${lineWrapClass} ${bridalMobileLayout ? "sm:font-manrope sm:text-[calc(14px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(22px*var(--ms,1)*var(--mt,1))] sm:text-black" : ""} ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"}`}
              >
                {line}
              </span>
            ))}
          </div>
        );
      }
      return (
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
              {descriptionLines.map((line, i) => (
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
            {line}
          </span>
        ))}
      </div>
    );
  }

  if (
    hipHopMobileLayout &&
    descriptionLinesDesktop != null &&
    descriptionLinesDesktop.length > 0
  ) {
    return (
      <>
        <div className="sm:hidden">
          {descriptionLines.map((line, i) => (
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
        <div className="hidden min-w-0 flex-col items-center sm:flex sm:gap-0">
          {descriptionLinesDesktop.map((line, i) => (
            <span
              key={`hiphop-desktop-${i}`}
              className={`block text-center ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"} ${i > 0 ? "sm:mt-[calc(0.375rem*var(--ms,1))]" : ""}`}
            >
              {line}
            </span>
          ))}
        </div>
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
      {line.length === 0 ? "\u00A0" : line}
    </span>
  ));
}
