import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import { renderModelingCopyLine, renderModelingTitleText } from "./modeling-copy-line";

function reduceHighJewelryLines(lines: readonly string[]): string[] {
  return lines.reduce<string[]>((acc, rawLine) => {
    const line = rawLine.trim();
    const previousLine = acc[acc.length - 1] ?? "";
    const previousLineTrimmed = previousLine.trim();
    const shouldMovePreciseDigitalToPrevious =
      /^precise\s+digital\s+reconstruction\b/i.test(line) &&
      /\bthrough$/i.test(previousLineTrimmed);
    const shouldJoinWithPrevious =
      /^digital\b/i.test(line) && /\bprecise$/i.test(previousLineTrimmed);

    if (shouldMovePreciseDigitalToPrevious) {
      acc[acc.length - 1] = `${previousLine} precise digital`;
      const trimmedCurrentLine = line.replace(/^precise\s+digital\s+/i, "");
      if (trimmedCurrentLine.length > 0) {
        acc.push(trimmedCurrentLine);
      }
      return acc;
    }

    if (shouldJoinWithPrevious) {
      acc[acc.length - 1] = `${previousLine} digital`;
      const trimmedCurrentLine = line.replace(/^digital\s+/i, "");
      if (trimmedCurrentLine.length > 0) {
        acc.push(trimmedCurrentLine);
      }
      return acc;
    }

    acc.push(rawLine);
    return acc;
  }, []);
}

type ModelingBlockHighJewelryProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageUrlTablet: string;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  titleTabletOffsetY: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  bodyTabletOffsetY: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
};

/** High Jewelry — full-bleed; mobile / tablet / desktop assets and copy tiers. */
export function ModelingBlockHighJewelry({
  imageUrlDesktop,
  imageUrlMobile,
  imageUrlTablet,
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleMobileOffsetY,
  titleTabletOffsetY,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
  bodyTabletOffsetY,
  desktopLine1Emphasis,
  tabletLine1Emphasis,
}: ModelingBlockHighJewelryProps) {
  const oneImage =
    imageUrlDesktop === imageUrlMobile && imageUrlMobile === imageUrlTablet;

  const normalizedDesktopLines = reduceHighJewelryLines(descriptionLinesDesktop);
  const desktopLinesNoBreakPreciseDigital = normalizedDesktopLines.map((line) =>
    line.replace(/\bprecise digital\b/gi, "precise\u00A0digital"),
  );
  const normalizedTabletLines = reduceHighJewelryLines(descriptionLinesTablet);
  const tabletLinesNoBreakPreciseDigital = normalizedTabletLines.map((line) =>
    line.replace(/\bprecise digital\b/gi, "precise\u00A0digital"),
  );

  const desktopLine1 = desktopLinesNoBreakPreciseDigital[0] ?? "";
  const desktopRest = desktopLinesNoBreakPreciseDigital.slice(1);
  const tabletLine1 = tabletLinesNoBreakPreciseDigital[0] ?? "";
  const tabletRest = tabletLinesNoBreakPreciseDigital.slice(1);

  const mobileLine1 = descriptionLinesMobile[0] ?? "";
  const mobileRest = descriptionLinesMobile.slice(1);

  const titleTabletDisplay = titleTablet.trim();
  const hasTabletDescriptionCopy = descriptionLinesTablet.some(
    (line) => line.trim().length > 0,
  );

  const objectClassName =
    "h-full w-full object-cover max-md:object-right md:object-[center_48%_center]";
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {oneImage ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className={objectClassName}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-right"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden md:block lg:hidden">
              <Image
                src={imageUrlTablet}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(max-width: 1023px) 50vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(min-width: 1024px) 33vw, 0px"
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[calc(144px*var(--ms,1))]"
        style={{ marginTop: "-33%" }}
      >
        {titleDesktop.trim().length > 0 ||
        titleMobile.trim().length > 0 ||
        titleTabletDisplay.length > 0 ? (
          <h3 className="h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] md:h-[calc(24px*var(--ms,1)*var(--mt,1))] md:font-manrope md:text-[calc(32px*var(--ms,1)*var(--mt,1))] md:leading-[calc(24px*var(--ms,1)*var(--mt,1))] md:tracking-normal md:font-bold lg:font-manrope">
            {titleMobile.trim().length > 0 ? (
              <span
                className="inline-block whitespace-pre-wrap md:hidden"
                style={{ transform: `translateY(calc(${titleMobileOffsetY}px * var(--ms,1)))` }}
              >
                {renderModelingTitleText(titleMobile)}
              </span>
            ) : null}
            {titleTabletDisplay.length > 0 ? (
              <span
                className="hidden whitespace-pre-wrap md:inline-block lg:hidden"
                style={{ transform: `translateY(calc(${titleTabletOffsetY}px * var(--ms,1)))` }}
              >
                {renderModelingTitleText(titleTabletDisplay)}
              </span>
            ) : null}
            {titleDesktop.trim().length > 0 ? (
              <span
                className="hidden whitespace-pre-wrap lg:inline-block"
                style={{ transform: `translateY(calc(${titleDesktopOffsetY}px * var(--ms,1)))` }}
              >
                {renderModelingTitleText(titleDesktop)}
              </span>
            ) : null}
          </h3>
        ) : null}
        {descriptionLinesMobile.length > 0 ? (
          <p
            className="mt-[calc(1rem*var(--ms,1))] block w-[min(100%,calc(280px*var(--ms,1)))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] md:hidden"
            style={{ transform: `translateY(calc(${bodyMobileOffsetY}px * var(--ms,1)))` }}
          >
            <span className="block whitespace-nowrap">{renderModelingCopyLine(mobileLine1)}</span>
            {mobileRest.map((line, index) => (
              <span
                key={`mobile-desc-${line}-${index}`}
                className={index === 0 ? "mt-[calc(0.25rem*var(--ms,1))] block" : "block"}
              >
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </p>
        ) : null}
        {hasTabletDescriptionCopy ? (
          <div
            className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 md:block lg:hidden"
            style={{ transform: `translateY(calc(${bodyTabletOffsetY}px * var(--ms,1)))` }}
          >
            {tabletLine1.length > 0 ? (
              <span className="block whitespace-nowrap -translate-x-[calc(1.9rem*var(--ms,1))]">
                {renderModelingCopyLine(tabletLine1)}{" "}
                {tabletLine1Emphasis.trim().length > 0 ? (
                  <span className="whitespace-nowrap">{tabletLine1Emphasis}</span>
                ) : null}
              </span>
            ) : null}
            {tabletRest.map((line, index) => (
              <span
                key={`tablet-desc-${line}-${index}`}
                className={
                  index === 0
                    ? "mt-[calc(0.125rem*var(--ms,1))] block whitespace-nowrap"
                    : "block"
                }
              >
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </div>
        ) : null}
        {descriptionLinesDesktop.length > 0 ? (
          <div
            className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 lg:block"
            style={{ transform: `translateY(calc(${bodyDesktopOffsetY}px * var(--ms,1)))` }}
          >
            {desktopLine1.length > 0 ? (
              <span className="block whitespace-nowrap -translate-x-[calc(1.9rem*var(--ms,1))]">
                {renderModelingCopyLine(desktopLine1)}{" "}
                {desktopLine1Emphasis.trim().length > 0 ? (
                  <span className="whitespace-nowrap">{desktopLine1Emphasis}</span>
                ) : null}
              </span>
            ) : null}
            {desktopRest.map((line, index) => (
              <span
                key={`desktop-desc-${line}-${index}`}
                className={
                  index === 0
                    ? "mt-[calc(0.125rem*var(--ms,1))] block whitespace-nowrap"
                    : "block"
                }
              >
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
