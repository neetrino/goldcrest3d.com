import type { CSSProperties } from "react";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import {
  hasCustomModelingTextLayout,
  type ModelingTextOverlayLayout,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import {
  resolveModelingSlotBodyForMobile,
  resolveModelingSlotTitleForMobile,
} from "@/lib/modeling-slot-copy/resolve-modeling-slot-body-mobile";

const MODELING_RICH_BODY =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

function OverlayTitleLines({ title }: { title: string }) {
  if (!title.includes("\n")) {
    return title;
  }
  return title.split(/\r?\n/).map((line, i) => (
    <span key={`overlay-title-${i}`} className="block">
      {line}
    </span>
  ));
}

function layerStyle(layer: ModelingTextOverlayLayout["title"]): CSSProperties {
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: "translate(-50%, -50%)",
    fontSize: `calc(${layer.fontSizePx}px * var(--ms, 1) * var(--mt, 1))`,
    maxWidth: "min(92%, calc(560px * var(--ms, 1)))",
  };
}

export type ModelingSlotCustomTextOverlayProps = {
  layoutDesktop: ModelingTextOverlayLayout;
  layoutMobile: ModelingTextOverlayLayout;
  titleDesktop: string;
  titleMobile: string;
  bodyDesktopHtml: string;
  bodyMobileHtml: string;
  textDark: boolean;
};

/** Shared by standalone blocks (Mechanical, Heritage, High Jewelry) when copy includes saved layouts. */
export function getModelingSlotCustomTextOverlayProps(
  copy: ModelingSlotCopyEntry,
  textDark: boolean,
): ModelingSlotCustomTextOverlayProps | null {
  if (!hasCustomModelingTextLayout(copy.textLayoutDesktop, copy.textLayoutMobile)) {
    return null;
  }
  return {
    layoutDesktop: copy.textLayoutDesktop!,
    layoutMobile: copy.textLayoutMobile!,
    titleDesktop: copy.title,
    titleMobile: resolveModelingSlotTitleForMobile(copy),
    bodyDesktopHtml: copy.body,
    bodyMobileHtml: resolveModelingSlotBodyForMobile(copy),
    textDark,
  };
}

/**
 * Absolute title + rich body for Modeling Specialization when both desktop and mobile layouts
 * are saved in Admin. Coordinate space matches the padded overlay in `ModelingCardFullBleed`.
 */
export function ModelingSlotCustomTextOverlay({
  layoutDesktop,
  layoutMobile,
  titleDesktop,
  titleMobile,
  bodyDesktopHtml,
  bodyMobileHtml,
  textDark,
}: ModelingSlotCustomTextOverlayProps) {
  const titleClass = textDark
    ? "font-manrope font-extrabold text-black"
    : "font-manrope font-extrabold text-white";
  const bodyClass = textDark
    ? `modeling-slot-rich-body ${MODELING_RICH_BODY} font-manrope font-light text-black/90`
    : `modeling-slot-rich-body ${MODELING_RICH_BODY} font-manrope font-light text-white/90`;

  return (
    <div
      className={`absolute inset-0 z-10 px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))] ${textDark ? "text-black" : "text-white"}`}
    >
      <div className="relative h-full w-full min-h-0">
        <div className="hidden md:block absolute inset-0">
          <h3 className={titleClass} style={layerStyle(layoutDesktop.title)}>
            <OverlayTitleLines title={titleDesktop} />
          </h3>
          <div style={layerStyle(layoutDesktop.body)}>
            <HeroBannerBodyRichText body={bodyDesktopHtml} className={bodyClass} />
          </div>
        </div>
        <div className="md:hidden absolute inset-0">
          <h3 className={titleClass} style={layerStyle(layoutMobile.title)}>
            <OverlayTitleLines title={titleMobile} />
          </h3>
          <div style={layerStyle(layoutMobile.body)}>
            <HeroBannerBodyRichText body={bodyMobileHtml} className={bodyClass} />
          </div>
        </div>
      </div>
    </div>
  );
}
