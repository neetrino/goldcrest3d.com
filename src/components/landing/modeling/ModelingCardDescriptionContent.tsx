import type { ReactNode } from "react";

import { modelingBodyLinesForLgViewport } from "./modeling-card.constants";
import {
  HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX,
  HIPHOP_TABLET_DESCRIPTION_CLASS,
} from "./modeling-card.typography-layout.constants";
import type { ModelingCardProps } from "./modeling-card.types";
import { renderModelingCopyLine } from "./modeling-copy-line";

const HIPHOP_MOBILE_FORCE_SINGLE_LINE_TEXTS = new Set<string>([
  "High-mass, fully iced-out structures engineered for",
  "High-mass, fully iced-out structures engineered",
  "structural durability and controlled weight distribution.",
]);
const HIPHOP_MOBILE_SHIFT_LEFT_LINES = new Set<string>([
  "High-mass, fully iced-out structures engineered for",
  "High-mass, fully iced-out structures engineered",
  "structural durability and controlled weight distribution.",
]);

/** When CMS puts "engineered" alone on its own line, join it onto the previous line. */
function mergeHipHopLonelyEngineeredLine(lines: string[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const next = lines[i + 1]?.trim();
    if (next != null && /^engineered\.?$/i.test(next)) {
      out.push(`${lines[i].trimEnd()} ${next}`);
      i += 2;
    } else {
      out.push(lines[i]);
      i += 1;
    }
  }
  return out;
}

export type ModelingCardDescriptionContentParams = Pick<
  ModelingCardProps,
  | "description"
  | "descriptionLines"
  | "descriptionLinesDesktop"
  | "descriptionLinesMobile"
  | "descriptionLinesTablet"
  | "descriptionLayout"
  | "firstDescriptionLineId"
  | "firstDescriptionLineMarginRight"
  | "firstDescriptionLineTranslateX"
  | "secondDescriptionLineTranslateX"
> & {
  hasLines: boolean;
  hipHopMobileLayout: boolean;
  bridalMobileLayout: boolean;
  /** When true, split mobile / tablet / desktop copy at md and lg (modeling CMS tablet tier). */
  modelingTabletTierEnabled?: boolean;
  lineWrapClass: string;
  hipHopMobileLineClass: string;
  hipHopMobileLineSingleLineClass: string;
  bridalRowWrapperClass: string;
  bridalRowSpanClass: string;
  bridalRowSpanClassDesktop: string;
};

function renderHipHopBreakpointDesktopLines(
  lines: string[],
  keyPrefix: string,
  continuationGapClass = "sm:mt-[calc(0.375rem*var(--ms,1))]",
): ReactNode {
  const merged = mergeHipHopLonelyEngineeredLine(lines);
  return merged.map((line, i) => (
    <span
      key={`${keyPrefix}-${i}`}
      className={`block text-center ${i < 2 ? "whitespace-nowrap" : "whitespace-normal"} ${i > 0 ? continuationGapClass : ""}`}
    >
      {line.includes(" performance.")
        ? (
            <>
              {line.split(" performance.")[0]}
              <span className="block">performance.</span>
            </>
          )
        : line.includes(" performance․")
          ? (
              <>
                {line.split(" performance․")[0]}
                <span className="block">performance․</span>
              </>
            )
          : renderModelingCopyLine(line)}
    </span>
  ));
}

export function renderModelingCardDescriptionContent(
  p: ModelingCardDescriptionContentParams,
): ReactNode {
  const {
    description,
    descriptionLines,
    descriptionLinesDesktop,
    descriptionLinesMobile,
    descriptionLinesTablet,
    descriptionLayout = "stack",
    firstDescriptionLineId,
    firstDescriptionLineMarginRight,
    firstDescriptionLineTranslateX,
    secondDescriptionLineTranslateX,
    hasLines,
    hipHopMobileLayout,
    bridalMobileLayout,
    modelingTabletTierEnabled = false,
    lineWrapClass,
    hipHopMobileLineClass,
    hipHopMobileLineSingleLineClass,
    bridalRowWrapperClass,
    bridalRowSpanClass,
  } = p;

  if (!hasLines || !descriptionLines) {
    return description;
  }

  if (descriptionLayout === "row") {
    if (bridalMobileLayout) {
      const tabletStackLines =
        descriptionLinesTablet != null &&
        descriptionLinesTablet.some((l) => l.trim().length > 0)
          ? descriptionLinesTablet
          : [];

      const bridalDesktopStack = (lines: string[], keyPrefix: string) => (
        <div className="flex w-fit max-w-full flex-col items-start gap-0.5 text-left">
          {lines.map((line, i) => (
            <span
              key={`${keyPrefix}-${i}`}
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
      );

      if (modelingTabletTierEnabled && descriptionLinesTablet != null) {
        return (
          <>
            {descriptionLinesMobile != null && descriptionLinesMobile.length > 0 ? (
              <div className="flex w-full flex-col items-start gap-0.5 md:hidden">
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
            {tabletStackLines.length > 0 ? (
              <div className="hidden w-full min-w-0 flex-col items-start md:flex lg:hidden md:-translate-x-[calc(-0.1rem*var(--ms,1))]">
                {bridalDesktopStack(tabletStackLines, "bridal-tablet-stack")}
              </div>
            ) : null}
            {(() => {
              const linesForLg = modelingBodyLinesForLgViewport(
                descriptionLinesDesktop ?? [],
                tabletStackLines,
                descriptionLinesMobile ?? [],
              );
              return linesForLg.length > 0 ? (
                <div className="hidden w-full min-w-0 flex-col items-start lg:flex lg:-translate-x-[calc(-0.1rem*var(--ms,1))]">
                  {bridalDesktopStack(linesForLg, "bridal-desktop-stack")}
                </div>
              ) : null;
            })()}
          </>
        );
      }

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
              {bridalDesktopStack(descriptionLinesDesktop, "bridal-desktop-stack")}
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
    const tabletHipHopLines =
      descriptionLinesTablet != null &&
      descriptionLinesTablet.some((l) => l.trim().length > 0)
        ? descriptionLinesTablet
        : [];

    if (modelingTabletTierEnabled && descriptionLinesTablet != null) {
      const mobileLinesMerged = mergeHipHopLonelyEngineeredLine(descriptionLines);
      return (
        <>
          {mobileLinesMerged.length > 0 ? (
            <div className="md:hidden">
              {mobileLinesMerged.map((line, i) => {
                const forceSingleLineOnMobile =
                  HIPHOP_MOBILE_FORCE_SINGLE_LINE_TEXTS.has(line.trim());
                const shiftLeftOnMobile = HIPHOP_MOBILE_SHIFT_LEFT_LINES.has(
                  line.trim(),
                );
                return (
                  <span
                    key={i}
                    className={`${hipHopMobileLineClass} ${forceSingleLineOnMobile ? "max-md:whitespace-nowrap" : ""} ${shiftLeftOnMobile ? "max-md:-translate-x-[calc(1.5rem*var(--ms,1))]" : ""}`}
                  >
                    {renderModelingCopyLine(line)}
                  </span>
                );
              })}
            </div>
          ) : null}
          {tabletHipHopLines.length > 0 ? (
            <div
              className={`hidden min-w-0 flex-col items-center md:flex lg:hidden md:gap-0 ${HIPHOP_TABLET_DESCRIPTION_CLASS}`}
            >
              {renderHipHopBreakpointDesktopLines(
                tabletHipHopLines,
                "hiphop-tablet",
                "md:mt-[calc(0.375rem*var(--ms,1))]",
              )}
            </div>
          ) : null}
          {(() => {
            const linesForLg = modelingBodyLinesForLgViewport(
              descriptionLinesDesktop ?? [],
              tabletHipHopLines,
              descriptionLines,
            );
            return linesForLg.length > 0 ? (
              <div className="hidden min-w-0 flex-col items-center lg:flex lg:gap-0">
                {renderHipHopBreakpointDesktopLines(linesForLg, "hiphop-desktop")}
              </div>
            ) : null;
          })()}
        </>
      );
    }

    const mobileLinesMergedNoTablet = mergeHipHopLonelyEngineeredLine(descriptionLines);
    return (
      <>
        {mobileLinesMergedNoTablet.length > 0 ? (
          <div className="sm:hidden">
            {mobileLinesMergedNoTablet.map((line, i) => {
              const forceSingleLineOnMobile =
                HIPHOP_MOBILE_FORCE_SINGLE_LINE_TEXTS.has(line.trim());
              const shiftLeftOnMobile = HIPHOP_MOBILE_SHIFT_LEFT_LINES.has(
                line.trim(),
              );
              return (
                <span
                  key={i}
                  className={`${hipHopMobileLineClass} ${forceSingleLineOnMobile ? "max-sm:whitespace-nowrap" : ""} ${shiftLeftOnMobile ? "max-sm:-translate-x-[calc(1.5rem*var(--ms,1))]" : ""}`}
                >
                  {renderModelingCopyLine(line)}
                </span>
              );
            })}
          </div>
        ) : null}
        {descriptionLinesDesktop != null && descriptionLinesDesktop.length > 0 ? (
          <div className="hidden min-w-0 flex-col items-center sm:flex sm:gap-0">
            {renderHipHopBreakpointDesktopLines(descriptionLinesDesktop, "hiphop-desktop")}
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
