import { LANDING_ELEMENT_IDS } from "@/constants";
import {
  RENDERING_SUBTITLE_LINE1,
  RENDERING_SUBTITLE_LINE2,
  RENDERING_SUBTITLE_MOBILE_LINE1,
  RENDERING_SUBTITLE_MOBILE_LINE2,
  RENDERING_SUBTITLE_MOBILE_LINE3,
  RENDERING_SUBTITLE_MOBILE_LINE4,
} from "./power-banners-layout.constants";

export function RenderingHeroSubtitleLines() {
  return (
    <p
      id={LANDING_ELEMENT_IDS.HERO_RENDERING_SUBTITLE}
      className="hero-primary-subtitle-typography relative inline-block w-full max-w-[433px] self-start text-left"
    >
      <span className="md:hidden">
        <span className="block whitespace-nowrap">
          {RENDERING_SUBTITLE_MOBILE_LINE1}
        </span>
        <span className="block whitespace-nowrap">
          {RENDERING_SUBTITLE_MOBILE_LINE2}
        </span>
        <span className="block whitespace-nowrap">
          {RENDERING_SUBTITLE_MOBILE_LINE3}
        </span>
        <span className="block whitespace-nowrap">
          {RENDERING_SUBTITLE_MOBILE_LINE4}
        </span>
      </span>
      <span className="hidden md:block">
        <span className="block md:whitespace-nowrap">
          {RENDERING_SUBTITLE_LINE1}
        </span>
        <span className="block md:whitespace-nowrap">
          {RENDERING_SUBTITLE_LINE2}
        </span>
      </span>
    </p>
  );
}
