import { LANDING_ELEMENT_IDS } from "@/constants";
import { looksLikeHeroBannerRichBody } from "@/lib/power-banner-copy/looks-like-hero-banner-rich-body";
import { resolveRenderingSubtitleDisplay } from "./resolve-power-banner-display";
import { HeroBannerBodyRichText } from "./HeroBannerBodyRichText";

type RenderingHeroSubtitleLinesProps = {
  body: string;
};

export function RenderingHeroSubtitleLines({ body }: RenderingHeroSubtitleLinesProps) {
  const useRichBody = looksLikeHeroBannerRichBody(body);

  if (useRichBody) {
    return (
      <div
        id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
        className="hero-primary-subtitle-typography relative block w-full min-w-0 max-w-full self-start text-left whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal [&_.hero-banner-rich-body_p]:mb-2 [&_.hero-banner-rich-body_p:last-child]:mb-0"
      >
        <HeroBannerBodyRichText
          body={body}
          className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
        />
      </div>
    );
  }

  const { desktopLines, mobileLines, useDefaultLineBreakLayout } =
    resolveRenderingSubtitleDisplay(body);

  return (
    <p
      id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
      className="hero-primary-subtitle-typography relative block w-full min-w-0 max-w-full self-start text-left"
    >
      <span className="md:hidden">
        {mobileLines.map((line, i) => (
          <span
            key={i}
            className={
              useDefaultLineBreakLayout
                ? "block whitespace-nowrap"
                : "block whitespace-normal"
            }
          >
            {line}
          </span>
        ))}
      </span>
      <span className="hidden md:block">
        {desktopLines.map((line, i) => (
          <span
            key={i}
            className={
              useDefaultLineBreakLayout
                ? "block md:whitespace-nowrap"
                : "block whitespace-normal"
            }
          >
            {line}
          </span>
        ))}
      </span>
    </p>
  );
}
