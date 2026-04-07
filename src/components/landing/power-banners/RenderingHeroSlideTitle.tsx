import type { CSSProperties } from "react";
import { SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX } from "./power-banners-layout.constants";

export function RenderingHeroSlideTitle() {
  return (
    <h1
      className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-left text-white md:-translate-y-2.5 md:whitespace-nowrap"
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
