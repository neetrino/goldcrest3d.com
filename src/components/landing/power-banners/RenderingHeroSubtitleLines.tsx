import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  resolveRenderingSubtitleDesktop,
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
  const { line1, line2 } = resolveRenderingSubtitleDesktop(desktopBody);
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
        <span className="block md:whitespace-nowrap">{line1}</span>
        {line2 ? (
          <span className="block md:whitespace-nowrap">{line2}</span>
        ) : null}
      </span>
    </p>
  );
}
