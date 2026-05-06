import type { CSSProperties } from "react";

import { splitMultilineTextPreservingLines } from "./resolve-power-banner-display";
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

  const mobileTitleLines = splitMultilineTextPreservingLines(mobileTitle);
  const tabletTitleLines = splitMultilineTextPreservingLines(tabletTitle ?? "");

  if (surface === "mobile-only") {
    return (
      <h1 className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-left text-white min-[755px]:hidden">
        <span className="inline-block" style={innerShiftStyle}>
          {mobileTitleLines.map((line, i) => (
            <span key={i} className="block">
              {line.length > 0 ? line : "\u00A0"}
            </span>
          ))}
        </span>
      </h1>
    );
  }

  if (surface === "tablet-only") {
    return (
      <h1 className="relative hidden max-w-full -translate-y-2.5 whitespace-normal text-left text-white min-[755px]:inline-block lg:hidden">
        <span className="inline-block" style={innerShiftStyle}>
          {tabletTitleLines.map((line, i) => (
            <span key={i} className="block min-[755px]:whitespace-nowrap">
              {line.length > 0 ? line : "\u00A0"}
            </span>
          ))}
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
    <h1 className="relative inline-block max-w-full -translate-y-2.5 whitespace-normal text-left text-white lg:-translate-y-2.5 lg:whitespace-nowrap">
      <span className="inline-block" style={innerShiftStyle}>
        <span className="min-[755px]:hidden">
          {mobileTitleLines.map((line, i) => (
            <span key={i} className="block">
              {line.length > 0 ? line : "\u00A0"}
            </span>
          ))}
        </span>
        <span className="hidden min-[755px]:inline lg:hidden">
          {tabletTitleLines.map((line, i) => (
            <span key={i} className="block min-[755px]:whitespace-nowrap">
              {line.length > 0 ? line : "\u00A0"}
            </span>
          ))}
        </span>
        <span className="hidden lg:inline">{desktopTitle}</span>
      </span>
    </h1>
  );
}
