"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent, RefObject } from "react";
import { useLayoutEffect, useRef } from "react";

import { GetAQuoteButton } from "@/components/landing/GetAQuoteButton";
import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import { framingToCoverImageStyle, type ImageFraming } from "@/lib/site-media/image-framing";
import {
  getPowerBannerMobileHeroTextPositionStyle,
  POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS,
  POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS,
} from "@/lib/power-banner-copy/power-banner-mobile-hero-text-overlay-presentation";

import { ModelingTextOverlayAlignmentGuidesOverlay } from "./ModelingTextOverlayAlignmentGuidesOverlay";
import { ModelingTextOverlayDragMoveHandle } from "./ModelingTextOverlayDragMoveHandle";
import type { ModelingTextOverlayAlignmentGuides } from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides";
import type { ModelingOverlayLayerKey } from "./ModelingTextOverlayEditorSurface";
import { MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS } from "./ModelingTextOverlayEditorSurface";

export type { ModelingOverlayLayerKey };

function selectedRingClass(isSelected: boolean): string {
  return isSelected ? "ring-2 ring-[#e2c481] ring-offset-2 ring-offset-black/20 rounded-sm" : "";
}

type PowerBannerMobileHeroTextEditorSurfaceProps = {
  bannerKey: PowerBannerKey;
  layout: ModelingTextOverlayLayout;
  imageUrl: string;
  mobileFraming: ImageFraming | null;
  titleText: string;
  bodyHtml: string;
  frameRef: RefObject<HTMLDivElement | null>;
  selectedLayer: ModelingOverlayLayerKey | null;
  onSelectLayer: (layer: ModelingOverlayLayerKey) => void;
  onDragStart: (layer: ModelingOverlayLayerKey, e: ReactPointerEvent<HTMLElement>) => void;
  imageSizes: string;
  overlaySuppressed?: boolean;
  interactive: boolean;
  onTitleChange?: (value: string) => void;
  onBodyHtmlChange?: (value: string) => void;
  alignmentGuides?: ModelingTextOverlayAlignmentGuides | null;
  layerRefs?: {
    readonly title: RefObject<HTMLDivElement | null>;
    readonly body: RefObject<HTMLDivElement | null>;
  };
};

export function PowerBannerMobileHeroTextEditorSurface({
  bannerKey,
  layout,
  imageUrl,
  mobileFraming,
  titleText,
  bodyHtml,
  frameRef,
  selectedLayer,
  onSelectLayer,
  onDragStart,
  imageSizes,
  overlaySuppressed = false,
  interactive,
  onTitleChange,
  onBodyHtmlChange,
  alignmentGuides = null,
  layerRefs,
}: PowerBannerMobileHeroTextEditorSurfaceProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleFocusedRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyFocusedRef = useRef(false);

  const titleEditable = Boolean(interactive && onTitleChange);
  const bodyEditable = Boolean(interactive && onBodyHtmlChange);

  const imageStyle = mobileFraming ? framingToCoverImageStyle(mobileFraming) : undefined;

  const titleLight = bannerKey === "MODELING" || bannerKey === "RENDERING";
  const titleClass = titleLight
    ? `pb-mobile-hero-title-dynamic-fs outline-none whitespace-pre-wrap ${titleEditable ? "cursor-text select-text" : "pointer-events-none touch-none select-none"}`
    : `hero-primary-title-typography-design pb-mobile-hero-title-dynamic-fs outline-none whitespace-pre-wrap ${titleEditable ? "cursor-text select-text" : "pointer-events-none touch-none select-none"}`;

  const visualTextVars: CSSProperties = {
    ["--pb-hero-title-fs" as string]: `${layout.title.fontSizePx}px`,
    ["--pb-hero-body-fs" as string]: `${layout.body.fontSizePx}px`,
  };

  useLayoutEffect(() => {
    if (!titleEditable || !titleRef.current || titleFocusedRef.current) {
      return;
    }
    if (titleRef.current.innerText !== titleText) {
      titleRef.current.innerText = titleText;
    }
  }, [titleEditable, titleText]);

  useLayoutEffect(() => {
    if (!bodyEditable || !bodyRef.current || bodyFocusedRef.current) {
      return;
    }
    const next = finalizeHeroBannerBodyHtml(bodyHtml);
    if (bodyRef.current.innerHTML !== next) {
      bodyRef.current.innerHTML = next;
    }
  }, [bodyEditable, bodyHtml]);

  const posTitle = getPowerBannerMobileHeroTextPositionStyle(layout.title);
  const posBody = getPowerBannerMobileHeroTextPositionStyle(layout.body);

  const bodyWrapperClass =
    bannerKey === "DESIGN"
      ? "hero-primary-subtitle-typography-design w-full whitespace-normal"
      : bannerKey === "RENDERING"
        ? "hero-primary-subtitle-typography w-full text-left text-white"
        : "hero-primary-subtitle-typography w-full text-center text-white";

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-slate-200 aspect-[20/37]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes={imageSizes}
          style={imageStyle}
          priority={false}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
          No mobile hero image.
        </div>
      )}
      <div
        className={`absolute inset-0 ${POWER_BANNER_MOBILE_HERO_TEXT_FRAME_PADDING_CLASS} transition-opacity duration-150 ${
          overlaySuppressed ? "pointer-events-none opacity-0" : ""
        }`}
        aria-hidden={overlaySuppressed}
        data-power-banner-mobile-visual-text="1"
        style={visualTextVars}
      >
        <div ref={frameRef} className="relative h-full w-full min-h-0 outline-none" tabIndex={-1}>
          <div
            ref={layerRefs?.title}
            className={`${POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS} max-w-[min(100%,494px)] ${selectedRingClass(interactive && selectedLayer === "title")}`}
            style={posTitle}
          >
            {interactive && titleEditable ? (
              <ModelingTextOverlayDragMoveHandle
                label="Drag to move title"
                onActivate={() => onSelectLayer("title")}
                onPointerDown={(e) => onDragStart("title", e)}
              />
            ) : null}
            <h1
              ref={titleEditable ? titleRef : undefined}
              className={titleClass}
              style={{ color: titleLight ? "#fff" : undefined }}
              contentEditable={titleEditable}
              suppressHydrationWarning
              onFocus={() => {
                titleFocusedRef.current = true;
                onSelectLayer("title");
              }}
              onBlur={() => {
                titleFocusedRef.current = false;
              }}
              onInput={
                titleEditable && onTitleChange
                  ? (e) => {
                      onTitleChange(e.currentTarget.innerText);
                    }
                  : undefined
              }
              onPointerDown={
                interactive && !titleEditable
                  ? (e) => {
                      onSelectLayer("title");
                      onDragStart("title", e);
                    }
                  : titleEditable
                    ? (e) => {
                        e.stopPropagation();
                      }
                    : undefined
              }
            >
              {titleEditable ? null : titleText}
            </h1>
          </div>

          <div
            ref={layerRefs?.body}
            className={`${POWER_BANNER_MOBILE_HERO_TEXT_LAYER_BOX_CLASS} flex max-w-[min(100%,494px)] flex-col ${
              bannerKey === "DESIGN"
                ? "items-end text-right"
                : bannerKey === "RENDERING"
                  ? "items-start text-left"
                  : "items-center text-center"
            } ${selectedRingClass(interactive && selectedLayer === "body")}`}
            style={posBody}
          >
            {interactive && bodyEditable ? (
              <ModelingTextOverlayDragMoveHandle
                label="Drag to move description"
                onActivate={() => onSelectLayer("body")}
                onPointerDown={(e) => onDragStart("body", e)}
              />
            ) : null}
            <div
              className={`pb-mobile-hero-body-dynamic-fs w-full min-w-0 ${bannerKey === "DESIGN" ? "text-right" : ""}`}
            >
              {bodyEditable ? (
                <div
                  ref={bodyRef}
                  className={`cursor-text select-text outline-none ${bodyWrapperClass} ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
                  contentEditable
                  suppressHydrationWarning
                  onFocus={() => {
                    bodyFocusedRef.current = true;
                    onSelectLayer("body");
                  }}
                  onBlur={() => {
                    bodyFocusedRef.current = false;
                  }}
                  onInput={(e) => {
                    onBodyHtmlChange?.(finalizeHeroBannerBodyHtml(e.currentTarget.innerHTML));
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                />
              ) : (
                <div
                  className={`touch-none ${interactive ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
                  onPointerDown={
                    interactive
                      ? (e) => {
                          onSelectLayer("body");
                          onDragStart("body", e);
                        }
                      : undefined
                  }
                >
                  <HeroBannerBodyRichText
                    body={bodyHtml}
                    className={`hero-banner-rich-body w-full ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
                  />
                </div>
              )}
            </div>
            <GetAQuoteButton
              variant="gold"
              className={`pointer-events-none mt-4 shrink-0 opacity-90 ${
                bannerKey === "DESIGN" ? "self-end" : bannerKey === "RENDERING" ? "self-start" : ""
              }`}
            />
          </div>
          {alignmentGuides ? <ModelingTextOverlayAlignmentGuidesOverlay guides={alignmentGuides} /> : null}
        </div>
      </div>
    </div>
  );
}
