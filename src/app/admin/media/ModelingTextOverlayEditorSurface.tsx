"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { ModelingTextOverlayAlignmentGuidesOverlay } from "./ModelingTextOverlayAlignmentGuidesOverlay";
import { ModelingTextOverlayDragMoveHandle } from "./ModelingTextOverlayDragMoveHandle";
import type { ModelingTextOverlayAlignmentGuides } from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides";
import type {
  ModelingOverlayLayerKey,
  ModelingTextOverlayLayout,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import {
  getModelingTextOverlayLayerFrameStyle,
  MODELING_TEXT_OVERLAY_FRAME_PADDING_DESKTOP_CLASS,
  MODELING_TEXT_OVERLAY_FRAME_PADDING_MOBILE_CLASS,
  MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS,
  MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-presentation";

export const MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

export type { ModelingOverlayLayerKey };

function selectedRingClass(isSelected: boolean): string {
  return isSelected ? "ring-2 ring-[#e2c481] ring-offset-2 ring-offset-black/20 rounded-sm" : "";
}

type OverlayEditorSurfaceProps = {
  variant: "desktop" | "mobile";
  layout: ModelingTextOverlayLayout;
  imageUrl: string | null;
  titleText: string;
  bodyHtml: string;
  textDarkPreview: boolean;
  frameRef: RefObject<HTMLDivElement | null>;
  selectedLayer: ModelingOverlayLayerKey | null;
  onSelectLayer: (layer: ModelingOverlayLayerKey) => void;
  onDragStart: (layer: ModelingOverlayLayerKey, e: ReactPointerEvent<HTMLElement>) => void;
  imageSizes: string;
  /** When true, title/body layers are hidden and ignore pointer events (image-only thumbnail). */
  overlaySuppressed?: boolean;
  /** When false, overlay is display-only (e.g. inline preview before opening the modal editor). */
  interactive: boolean;
  /** When set with `interactive`, title is edited in place and updates parent state. */
  onTitleChange?: (value: string) => void;
  /** When set with `interactive`, description HTML is edited in place. */
  onBodyHtmlChange?: (value: string) => void;
  /** Alignment guide lines (frame %); shown during drag/nudge in the visual editor. */
  alignmentGuides?: ModelingTextOverlayAlignmentGuides | null;
  /** Refs to positioned layer wrappers (for alignment measurements). */
  layerRefs?: {
    readonly title: RefObject<HTMLDivElement | null>;
    readonly body: RefObject<HTMLDivElement | null>;
  };
};

export function ModelingTextOverlayEditorSurface({
  variant,
  layout,
  imageUrl,
  titleText,
  bodyHtml,
  textDarkPreview,
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
}: OverlayEditorSurfaceProps) {
  const aspectClass = variant === "desktop" ? "aspect-[83/43]" : "aspect-[360/259]";
  const paddingClass =
    variant === "desktop"
      ? MODELING_TEXT_OVERLAY_FRAME_PADDING_DESKTOP_CLASS
      : MODELING_TEXT_OVERLAY_FRAME_PADDING_MOBILE_CLASS;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleFocusedRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyFocusedRef = useRef(false);

  const titleEditable = Boolean(interactive && onTitleChange);
  const bodyEditable = Boolean(interactive && onBodyHtmlChange);

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

  const posTitle = getModelingTextOverlayLayerFrameStyle(layout.title);
  const posBody = getModelingTextOverlayLayerFrameStyle(layout.body);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg bg-slate-200 ${aspectClass}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes={imageSizes}
          priority={false}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
          Upload an image above to preview this slot.
        </div>
      )}
      <div
        className={`absolute inset-0 ${paddingClass} transition-opacity duration-150 ${
          overlaySuppressed ? "pointer-events-none opacity-0" : ""
        }`}
        aria-hidden={overlaySuppressed}
      >
        <div ref={frameRef} className="relative h-full w-full min-h-0 outline-none" tabIndex={-1}>
          <div
            ref={layerRefs?.title}
            className={`${MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS} ${selectedRingClass(interactive && selectedLayer === "title")}`}
            style={posTitle}
          >
            {interactive && titleEditable ? (
              <ModelingTextOverlayDragMoveHandle
                label="Drag to move title"
                onActivate={() => onSelectLayer("title")}
                onPointerDown={(e) => onDragStart("title", e)}
              />
            ) : null}
            <h3
              ref={titleEditable ? titleRef : undefined}
              className={`font-manrope font-extrabold outline-none ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS} ${
                textDarkPreview ? "text-slate-900" : "text-white"
              } ${
                titleEditable
                  ? "cursor-text select-text"
                  : "pointer-events-none touch-none select-none"
              } ${interactive && !titleEditable ? "pointer-events-auto cursor-grab active:cursor-grabbing" : ""}`}
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
            </h3>
          </div>

          <div
            ref={layerRefs?.body}
            className={`${MODELING_TEXT_OVERLAY_LAYER_BOX_CLASS} ${selectedRingClass(interactive && selectedLayer === "body")}`}
            style={posBody}
          >
            {interactive && bodyEditable ? (
              <ModelingTextOverlayDragMoveHandle
                label="Drag to move description"
                onActivate={() => onSelectLayer("body")}
                onPointerDown={(e) => onDragStart("body", e)}
              />
            ) : null}
            {bodyEditable ? (
              <div
                ref={bodyRef}
                className={`modeling-slot-rich-body cursor-text select-text font-manrope font-light outline-none ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS} ${
                  textDarkPreview ? "text-slate-800" : "text-white/90"
                } ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
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
                className={`touch-none ${
                  textDarkPreview ? "text-slate-800" : "text-white/90"
                } ${
                  interactive
                    ? "pointer-events-auto cursor-grab active:cursor-grabbing"
                    : "pointer-events-none"
                }`}
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
                  className={`modeling-slot-rich-body font-manrope font-light ${MODELING_TEXT_OVERLAY_TEXT_WHITESPACE_CLASS} ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
                />
              </div>
            )}
          </div>
          {alignmentGuides ? <ModelingTextOverlayAlignmentGuidesOverlay guides={alignmentGuides} /> : null}
        </div>
      </div>
    </div>
  );
}
