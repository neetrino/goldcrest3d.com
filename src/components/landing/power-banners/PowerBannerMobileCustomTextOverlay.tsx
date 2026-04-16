import type { CSSProperties } from "react";
import { Fragment } from "react";

import {
  GetAQuoteButton,
  HERO_GET_QUOTE_BUTTON_ID,
  HERO_SECTION2_GET_QUOTE_BUTTON_ID,
  HERO_SECTION3_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import { looksLikeHeroBannerRichBody } from "@/lib/power-banner-copy/looks-like-hero-banner-rich-body";
import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import {
  resolveDesignSubtitleDisplay,
  resolveModelingTitleMobileLines,
  resolveRenderingSubtitleDisplay,
} from "./resolve-power-banner-display";
import { HeroBannerBodyRichText } from "./HeroBannerBodyRichText";
import {
  getPowerBannerMobileHeroTextPositionStyle,
  POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS,
  POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS,
} from "@/lib/power-banner-copy/power-banner-mobile-hero-text-overlay-presentation";

const RICH_MOBILE =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

type PowerBannerMobileCustomTextOverlayProps = {
  bannerKey: PowerBannerKey;
  layout: ModelingTextOverlayLayout;
  copy: PowerBannerCopyEntry;
};

export function PowerBannerMobileCustomTextOverlay({
  bannerKey,
  layout,
  copy,
}: PowerBannerMobileCustomTextOverlayProps) {
  const mobileTitle = copy.mobileTitle.trim();
  const mobileBody = copy.mobileBody.trim();
  const useRichMobileBody = looksLikeHeroBannerRichBody(mobileBody);
  const modelingLines = resolveModelingTitleMobileLines(copy.mobileTitle);
  const designPlain = resolveDesignSubtitleDisplay(mobileBody);
  const renderingPlain = resolveRenderingSubtitleDisplay(mobileBody);

  const titlePositionStyle = getPowerBannerMobileHeroTextPositionStyle(layout.title);
  const bodyPositionStyle = getPowerBannerMobileHeroTextPositionStyle(layout.body);

  const quoteId =
    bannerKey === "MODELING"
      ? HERO_GET_QUOTE_BUTTON_ID
      : bannerKey === "RENDERING"
        ? HERO_SECTION2_GET_QUOTE_BUTTON_ID
        : HERO_SECTION3_GET_QUOTE_BUTTON_ID;

  const quoteClass =
    bannerKey === "DESIGN"
      ? "mt-6 shrink-0 self-end"
      : bannerKey === "RENDERING"
        ? "mt-6 shrink-0 self-start"
        : "mt-6 shrink-0";

  const visualTextVars: CSSProperties = {
    ["--pb-hero-title-fs" as string]: `${layout.title.fontSizePx}px`,
    ["--pb-hero-body-fs" as string]: `${layout.body.fontSizePx}px`,
  };

  return (
    <div
      className={`pointer-events-auto absolute inset-0 z-10 md:hidden ${POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS}`}
      data-power-banner-mobile-visual-text="1"
      style={visualTextVars}
    >
      <div className="relative h-full w-full min-h-0">
        <div
          className={`${POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS} max-w-[min(100%,494px)]`}
          style={titlePositionStyle}
        >
          {bannerKey === "MODELING" ? (
            <h1
              className="pb-mobile-hero-title-dynamic-fs inline-block whitespace-normal text-balance text-center text-white"
            >
              {modelingLines.map((line, i) => (
                <span key={i} className={i === 0 ? "block whitespace-nowrap" : "block"}>
                  {line}
                </span>
              ))}
            </h1>
          ) : bannerKey === "RENDERING" ? (
            <h1
              className="pb-mobile-hero-title-dynamic-fs relative inline-block max-w-full whitespace-normal text-balance text-left text-white"
            >
              {mobileTitle}
            </h1>
          ) : (
            <h1
              className="hero-primary-title-typography-design pb-mobile-hero-title-dynamic-fs inline-block max-w-[min(100%,494px)] whitespace-normal text-balance"
            >
              {mobileTitle}
            </h1>
          )}
        </div>

        <div
          className={`${POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS} flex max-w-[min(100%,494px)] flex-col ${bannerKey === "DESIGN" ? "items-end text-right" : bannerKey === "RENDERING" ? "items-start text-left" : "items-center text-center"}`}
          style={bodyPositionStyle}
        >
          {mobileBody.length > 0 ? (
            <div
              className={`pb-mobile-hero-body-dynamic-fs w-full min-w-0 ${
                bannerKey === "DESIGN" ? "text-right" : ""
              }`}
            >
              {bannerKey === "MODELING" ? (
                useRichMobileBody ? (
                  <HeroBannerBodyRichText
                    body={mobileBody}
                    className={`hero-primary-subtitle-typography w-full text-center text-white ${RICH_MOBILE} [&_p]:mb-2 [&_p:last-child]:mb-0`}
                  />
                ) : (
                  <p className="hero-primary-subtitle-typography text-white">
                    {mobileBody
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, i) => (
                        <Fragment key={i}>
                          {i > 0 ? (
                            <>
                              <br />{" "}
                            </>
                          ) : null}
                          <span className={i === 0 ? "whitespace-nowrap" : undefined}>{line}</span>
                        </Fragment>
                      ))}
                  </p>
                )
              ) : bannerKey === "RENDERING" ? (
                <div className="hero-primary-subtitle-typography relative block w-full min-w-0 max-w-full self-start text-left text-white">
                  {useRichMobileBody ? (
                    <div
                      className={`whitespace-normal ${RICH_MOBILE} [&_.hero-banner-rich-body_p]:mb-2 [&_.hero-banner-rich-body_p:last-child]:mb-0`}
                    >
                      <HeroBannerBodyRichText
                        body={mobileBody}
                        className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                      />
                    </div>
                  ) : (
                    <p>
                      {renderingPlain.mobileLines.map((line, i) => (
                        <span
                          key={i}
                          className={
                            renderingPlain.useDefaultLineBreakLayout
                              ? "block whitespace-nowrap"
                              : "block whitespace-normal"
                          }
                        >
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              ) : useRichMobileBody ? (
                <div className="hero-primary-subtitle-typography-design w-full whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal">
                  <HeroBannerBodyRichText
                    body={mobileBody}
                    className={`hero-banner-rich-body w-full ${RICH_MOBILE} [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0`}
                  />
                </div>
              ) : (
                <p className="hero-primary-subtitle-typography-design">
                  {designPlain.lines.map((line, i) => (
                    <span
                      key={i}
                      className={
                        designPlain.useDefaultLineBreakLayout ? "block" : "block whitespace-normal"
                      }
                    >
                      {line}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ) : null}
          <GetAQuoteButton id={quoteId} variant="gold" className={quoteClass} />
        </div>
      </div>
    </div>
  );
}
