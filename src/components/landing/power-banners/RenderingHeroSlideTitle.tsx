import type { CSSProperties } from "react";

import { SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX } from "./power-banners-layout.constants";

type RenderingHeroSlideTitleProps = {
  desktopTitle: string;
  mobileTitle: string;
  /** Default: responsive spans in one h1. Use split surfaces when mobile vertical offsets wrap title separately. */
  surface?: "responsive" | "mobile-only" | "desktop-only";
};

export function RenderingHeroSlideTitle({
  desktopTitle,
  mobileTitle,
  surface = "responsive",
}: RenderingHeroSlideTitleProps) {
  const innerShiftStyle = {
    transform: `translateY(${SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX}px)`,
  } as CSSProperties;

  if (surface === "mobile-only") {
    return (
      <h1 className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-left text-white md:hidden">
        <span className="inline-block" style={innerShiftStyle}>
          {mobileTitle}
        </span>
      </h1>
    );
  }

  if (surface === "desktop-only") {
    return (
      <h1 className="relative hidden max-w-full -translate-y-2.5 text-left text-white md:inline-block md:whitespace-nowrap">
        <span className="inline-block" style={innerShiftStyle}>
          {desktopTitle}
        </span>
      </h1>
    );
  }

  return (
    <h1 className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-left text-white md:-translate-y-2.5 md:whitespace-nowrap">
      <span className="inline-block" style={innerShiftStyle}>
        <span className="md:hidden">{mobileTitle}</span>
        <span className="hidden md:inline">{desktopTitle}</span>
      </span>
    </h1>
  );
}
