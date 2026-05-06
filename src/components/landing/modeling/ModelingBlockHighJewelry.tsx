import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import {
  MODELING_CARD_FRAME_MOBILE_CLASSES,
  modelingBodyLinesForLgViewport,
  modelingCopyTranslatePercent,
  modelingTitleForLgViewport,
} from "./modeling-card.constants";
import {
  mergeCssProperties,
  modelingCmsMobileBodyFontStyle,
  modelingCmsMobileTitleFontStyle,
  modelingCmsTabletBodyFontStyle,
  modelingCmsTabletTitleFontStyle,
} from "./modeling-cms-mobile-font-style";
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
  titleDesktopOffsetX: number;
  titleMobileOffsetY: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetY: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
  tabletPreviewTitleFontPx: number;
  tabletPreviewBodyFontPx: number;
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
  titleDesktopOffsetX,
  titleMobileOffsetY,
  titleMobileOffsetX,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyDesktopOffsetX,
  bodyMobileOffsetY,
  bodyMobileOffsetX,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
  desktopLine1Emphasis,
  tabletLine1Emphasis,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
  tabletPreviewTitleFontPx,
  tabletPreviewBodyFontPx,
}: ModelingBlockHighJewelryProps) {
  const oneImage =
    imageUrlDesktop === imageUrlMobile && imageUrlMobile === imageUrlTablet;

  const normalizedTabletLines = reduceHighJewelryLines(descriptionLinesTablet);
  const tabletLinesNoBreakPreciseDigital = normalizedTabletLines.map((line) =>
    line.replace(/\bprecise digital\b/gi, "precise\u00A0digital"),
  );

  const tabletLine1 = tabletLinesNoBreakPreciseDigital[0] ?? "";
  const tabletRest = tabletLinesNoBreakPreciseDigital.slice(1);

  const mobileLine1 = descriptionLinesMobile[0] ?? "";
  const mobileRest = descriptionLinesMobile.slice(1);

  const titleTabletDisplay = titleTablet.trim();
  const titleForLg = modelingTitleForLgViewport(titleDesktop, titleTablet, titleMobile);
  const hasTabletDescriptionCopy = descriptionLinesTablet.some(
    (line) => line.trim().length > 0,
  );

  const rawLinesForLg = modelingBodyLinesForLgViewport(
    descriptionLinesDesktop,
    descriptionLinesTablet,
    descriptionLinesMobile,
  );
  const lgUsesDesktopCopy = descriptionLinesDesktop.some((l) => l.trim().length > 0);
  const lgUsesTabletCopy =
    !lgUsesDesktopCopy && descriptionLinesTablet.some((l) => l.trim().length > 0);
  const normalizedLgDescLines = reduceHighJewelryLines(rawLinesForLg);
  const lgDescLinesNoBreak = normalizedLgDescLines.map((line) =>
    line.replace(/\bprecise digital\b/gi, "precise\u00A0digital"),
  );
  const lgDescLine1 = lgDescLinesNoBreak[0] ?? "";
  const lgDescRest = lgDescLinesNoBreak.slice(1);
  const lgDescLine1Emphasis = lgUsesDesktopCopy
    ? desktopLine1Emphasis
    : lgUsesTabletCopy
      ? tabletLine1Emphasis
      : "";
  const hasLgDescriptionCopy = rawLinesForLg.some((l) => l.trim().length > 0);

  const objectClassName =
    "h-full w-full object-cover max-sm:object-right sm:object-[center_48%_center]";
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
            sizes="(max-width: 639px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 sm:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-right"
                sizes="(max-width: 639px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden sm:block lg:hidden">
              <Image
                src={imageUrlTablet}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(min-width: 640px) and (max-width: 1023px) 50vw, 0px"
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
        {titleForLg.length > 0 ? (
          <h3 className="h-[calc(28px*var(--ms,1)*var(--mt,1))] overflow-visible font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] sm:h-[calc(24px*var(--ms,1)*var(--mt,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal sm:font-extrabold sm:scale-x-105 sm:origin-center lg:font-manrope lg:font-extrabold">
            {titleMobile.trim().length > 0 ? (
              <span
                className="inline-block whitespace-pre-wrap sm:hidden"
                style={mergeCssProperties(
                  {
                    transform: modelingCopyTranslatePercent(titleMobileOffsetX, titleMobileOffsetY),
                  },
                  modelingCmsMobileTitleFontStyle(mobilePreviewTitleFontPx),
                )}
              >
                {renderModelingTitleText(titleMobile)}
              </span>
            ) : null}
            {titleTabletDisplay.length > 0 ? (
              <span
                className="hidden whitespace-pre-wrap sm:inline-block lg:hidden"
                style={mergeCssProperties(
                  {
                    transform: modelingCopyTranslatePercent(titleTabletOffsetX, titleTabletOffsetY),
                  },
                  modelingCmsTabletTitleFontStyle(tabletPreviewTitleFontPx),
                )}
              >
                {renderModelingTitleText(titleTabletDisplay)}
              </span>
            ) : null}
            <span
              className="hidden whitespace-pre-wrap lg:inline-block"
              style={{
                transform: modelingCopyTranslatePercent(titleDesktopOffsetX, titleDesktopOffsetY),
              }}
            >
              {renderModelingTitleText(titleForLg)}
            </span>
          </h3>
        ) : null}
        {descriptionLinesMobile.length > 0 ? (
          <p
            className="mt-[calc(1rem*var(--ms,1))] block w-[min(100%,calc(280px*var(--ms,1)))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(0.8125rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:hidden"
            style={mergeCssProperties(
              {
                transform: modelingCopyTranslatePercent(bodyMobileOffsetX, bodyMobileOffsetY),
              },
              modelingCmsMobileBodyFontStyle(mobilePreviewBodyFontPx),
            )}
          >
            <span className="block whitespace-nowrap">{renderModelingCopyLine(mobileLine1)}</span>
            {mobileRest.map((line, index) => (
              <span
                key={`mobile-desc-${line}-${index}`}
                className={index === 0 ? "mt-0 block" : "block"}
              >
                {renderModelingCopyLine(line)}
              </span>
            ))}
          </p>
        ) : null}
        {hasTabletDescriptionCopy ? (
          <div
            className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 sm:block lg:hidden"
            style={mergeCssProperties(
              {
                transform: modelingCopyTranslatePercent(bodyTabletOffsetX, bodyTabletOffsetY),
              },
              modelingCmsTabletBodyFontStyle(tabletPreviewBodyFontPx),
            )}
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
        {hasLgDescriptionCopy ? (
          <div
            className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 lg:block"
            style={{
              transform: modelingCopyTranslatePercent(bodyDesktopOffsetX, bodyDesktopOffsetY),
            }}
          >
            {lgDescLine1.length > 0 ? (
              <span className="block whitespace-nowrap -translate-x-[calc(1.9rem*var(--ms,1))]">
                {renderModelingCopyLine(lgDescLine1)}{" "}
                {lgDescLine1Emphasis.trim().length > 0 ? (
                  <span className="whitespace-nowrap">{lgDescLine1Emphasis}</span>
                ) : null}
              </span>
            ) : null}
            {lgDescRest.map((line, index) => (
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
