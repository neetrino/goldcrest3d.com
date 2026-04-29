import { LANDING_ELEMENT_IDS } from "@/constants";
import { splitMultilineTextPreservingLines } from "./resolve-power-banner-display";

type RenderingHeroSubtitleLinesProps = {
  desktopBody: string;
  mobileBody: string;
  tabletBody?: string;
  surface?: "responsive" | "mobile-only" | "tablet-only" | "desktop-only";
};

export function RenderingHeroSubtitleLines({
  desktopBody,
  mobileBody,
  tabletBody,
  surface = "responsive",
}: RenderingHeroSubtitleLinesProps) {
  const desktopLines = splitMultilineTextPreservingLines(desktopBody);
  const mobileLines = splitMultilineTextPreservingLines(mobileBody);
  const tabletLines = splitMultilineTextPreservingLines(tabletBody ?? "");

  if (surface === "mobile-only") {
    return (
      <p
        id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
        className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] self-start text-left md:hidden"
      >
        {mobileLines.map((line, i) => (
          <span key={i} className="block whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </p>
    );
  }

  if (surface === "tablet-only") {
    return (
      <p className="hero-primary-subtitle-typography relative hidden w-full max-w-[433px] self-start text-left md:inline-block lg:hidden">
        {tabletLines.map((line, i) => (
          <span key={i} className="block md:whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </p>
    );
  }

  if (surface === "desktop-only") {
    return (
      <p className="hero-primary-subtitle-typography relative hidden w-full max-w-[433px] self-start text-left lg:inline-block">
        {desktopLines.map((line, i) => (
          <span key={i} className="block lg:whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p
      id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
      className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] self-start text-left"
    >
      <span className="md:hidden">
        {mobileLines.map((line, i) => (
          <span key={i} className="block whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </span>
      <span className="hidden md:block lg:hidden">
        {tabletLines.map((line, i) => (
          <span key={i} className="block md:whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </span>
      <span className="hidden lg:block">
        {desktopLines.map((line, i) => (
          <span key={i} className="block lg:whitespace-nowrap">
            {line.length > 0 ? line : "\u00A0"}
          </span>
        ))}
      </span>
    </p>
  );
}
