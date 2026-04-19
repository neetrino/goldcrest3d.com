import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  splitMultilineText,
} from "./resolve-power-banner-display";

type RenderingHeroSubtitleLinesProps = {
  desktopBody: string;
  mobileBody: string;
};

export function RenderingHeroSubtitleLines({
  desktopBody,
  mobileBody,
}: RenderingHeroSubtitleLinesProps) {
  const desktopLines = splitMultilineText(desktopBody);
  const mobileLines = splitMultilineText(mobileBody);

  return (
    <p
      id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
      className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] self-start text-left"
    >
      <span className="md:hidden">
        {mobileLines.map((line, i) => (
          <span key={i} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
      <span className="hidden md:block">
        {desktopLines.map((line, i) => (
          <span key={i} className="block md:whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
    </p>
  );
}
