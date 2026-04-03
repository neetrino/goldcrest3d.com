import type { CSSProperties } from "react";
import {
  HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS,
  SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX,
} from "./power-banners-layout.constants";

export function RenderingHeroSlideTitle() {
  return (
    <h1
      className={`relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-left md:-translate-y-2.5 md:whitespace-nowrap ${HERO_PRIMARY_TITLE_TYPOGRAPHY_CLASS}`}
    >
      <span
        className="inline-block"
        style={
          {
            transform: `translateY(${SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX}px)`,
          } as CSSProperties
        }
      >
        Jewelry Rendering
      </span>
    </h1>
  );
}
