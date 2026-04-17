import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import {
  hasCustomModelingTextLayout,
  type ModelingTextOverlayLayout,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import {
  getModelingTextOverlayLayerFrameStyle,
  MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS,
  MODELING_TEXT_OVERLAY_OUTER_PADDING_CLASS,
  MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-presentation";

const MODELING_RICH_BODY =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

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
    titleMobile: copy.titleMobile.trim(),
    bodyDesktopHtml: copy.body,
    bodyMobileHtml: copy.bodyMobile.trim(),
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
    ? `font-manrope font-extrabold text-black ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS}`
    : `font-manrope font-extrabold text-white ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS}`;
  const bodyClass = textDark
    ? `modeling-slot-rich-body ${MODELING_RICH_BODY} font-manrope font-light text-black/90 ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS}`
    : `modeling-slot-rich-body ${MODELING_RICH_BODY} font-manrope font-light text-white/90 ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS}`;

  return (
    <div
      className={`absolute inset-0 z-10 ${MODELING_TEXT_OVERLAY_OUTER_PADDING_CLASS} ${textDark ? "text-black" : "text-white"}`}
    >
      <div className="relative h-full w-full min-h-0">
        <div className="hidden md:block absolute inset-0">
          <div
            className={MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS}
            style={getModelingTextOverlayLayerFrameStyle(layoutDesktop.title)}
          >
            <h3 className={titleClass}>{titleDesktop}</h3>
          </div>
          <div
            className={MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS}
            style={getModelingTextOverlayLayerFrameStyle(layoutDesktop.body)}
          >
            <HeroBannerBodyRichText body={bodyDesktopHtml} className={bodyClass} />
          </div>
        </div>
        <div className="md:hidden absolute inset-0">
          <div
            className={MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS}
            style={getModelingTextOverlayLayerFrameStyle(layoutMobile.title)}
          >
            <h3 className={titleClass}>{titleMobile}</h3>
          </div>
          <div
            className={MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS}
            style={getModelingTextOverlayLayerFrameStyle(layoutMobile.body)}
          >
            <HeroBannerBodyRichText body={bodyMobileHtml} className={bodyClass} />
          </div>
        </div>
      </div>
    </div>
  );
}
