import type { CSSProperties } from "react";

import { SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX } from "./power-banners-layout.constants";

type RenderingHeroSlideTitleProps = {
  desktopTitle: string;
  mobileTitle: string;
  tabletTitle?: string;
  /** Default: responsive spans in one h1. Use split surfaces when mobile vertical offsets wrap title separately. */
  surface?: "responsive" | "mobile-only" | "tablet-only" | "desktop-only";
};

export function RenderingHeroSlideTitle({
  desktopTitle,
  mobileTitle,
  tabletTitle,
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

  if (surface === "tablet-only") {
    return (
      <h1 className="relative hidden max-w-full -translate-y-2.5 whitespace-normal text-balance text-left text-white md:inline-block md:whitespace-nowrap lg:hidden">
        <span className="inline-block" style={innerShiftStyle}>
          {tabletTitle ?? ""}
        </span>
      </h1>
    );
  }

  if (surface === "desktop-only") {
    return (
      <h1 className="relative hidden max-w-full -translate-y-2.5 text-left text-white lg:inline-block lg:whitespace-nowrap">
        <span className="inline-block" style={innerShiftStyle}>
          {desktopTitle}
        </span>
      </h1>
    );
  }

  return (
    <h1 className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-balance text-left text-white lg:-translate-y-2.5 lg:whitespace-nowrap">
      <span className="inline-block" style={innerShiftStyle}>
        <span className="md:hidden">{mobileTitle}</span>
        <span className="hidden md:inline lg:hidden">{tabletTitle ?? ""}</span>
        <span className="hidden lg:inline">{desktopTitle}</span>
      </span>
    </h1>
  );
}
