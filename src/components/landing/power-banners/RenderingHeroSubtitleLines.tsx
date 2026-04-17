import { LANDING_ELEMENT_IDS } from "@/constants";
import { looksLikeHeroBannerRichBody } from "@/lib/power-banner-copy/looks-like-hero-banner-rich-body";
import { resolveRenderingSubtitleDisplay } from "./resolve-power-banner-display";
import { HeroBannerBodyRichText } from "./HeroBannerBodyRichText";

type RenderingHeroSubtitleLinesProps = {
  desktopBody: string;
  mobileBody: string;
};

export function RenderingHeroSubtitleLines({
  desktopBody,
  mobileBody,
}: RenderingHeroSubtitleLinesProps) {
  const desktopTrimmed = desktopBody.trim();
  const mobileTrimmed = mobileBody.trim();
  const useRichDesktop = looksLikeHeroBannerRichBody(desktopTrimmed);
  const useRichMobile = looksLikeHeroBannerRichBody(mobileTrimmed);

  const desktopPlain = resolveRenderingSubtitleDisplay(desktopTrimmed, "desktop");
  const mobilePlain = resolveRenderingSubtitleDisplay(mobileTrimmed, "mobile");

  return (
    <div
      id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
      className="hero-primary-subtitle-typography relative block w-full min-w-0 max-w-full self-start text-left"
    >
      <div className="md:hidden">
        {mobileTrimmed.length > 0 ? (
          useRichMobile ? (
            <div className="whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal [&_.hero-banner-rich-body_p]:mb-2 [&_.hero-banner-rich-body_p:last-child]:mb-0">
              <HeroBannerBodyRichText
                body={mobileTrimmed}
                className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
              />
            </div>
          ) : (
            <p>
              {mobilePlain.mobileLines.map((line, i) => (
                <span
                  key={i}
                  className={
                    mobilePlain.useDefaultLineBreakLayout
                      ? "block whitespace-nowrap"
                      : "block whitespace-normal"
                  }
                >
                  {line}
                </span>
              ))}
            </p>
          )
        ) : null}
      </div>

      <div className="hidden md:block">
        {desktopTrimmed.length > 0 ? (
          useRichDesktop ? (
            <div className="whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal [&_.hero-banner-rich-body_p]:mb-2 [&_.hero-banner-rich-body_p:last-child]:mb-0">
              <HeroBannerBodyRichText
                body={desktopTrimmed}
                className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
              />
            </div>
          ) : (
            <p>
              {desktopPlain.desktopLines.map((line, i) => (
                <span
                  key={i}
                  className={
                    desktopPlain.useDefaultLineBreakLayout
                      ? "block md:whitespace-nowrap"
                      : "block whitespace-normal"
                  }
                >
                  {line}
                </span>
              ))}
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
