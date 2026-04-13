"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useLayoutEffect, useRef } from "react";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

export const MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS =
  "[&_p:not(:last-child)]:mb-[0.45em] [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

/** Matches `ModelingSlotCustomTextOverlay` padding for each breakpoint. */
export const OVERLAY_PADDING_DESKTOP_CLASS = "px-8 py-10";
export const OVERLAY_PADDING_MOBILE_CLASS = "px-6 py-8";

export type ModelingOverlayLayerKey = "title" | "body";

function PreviewTitleLines({ title }: { title: string }) {
  if (!title.includes("\n")) {
    return title;
  }
  return title.split(/\r?\n/).map((line, i) => (
    <span key={`ed-title-${i}`} className="block">
      {line}
    </span>
  ));
}

function layerPositionStyle(layer: ModelingTextOverlayLayout["title"]): CSSProperties {
  return {
    position: "absolute",
    left: `${layer.xPct}%`,
    top: `${layer.yPct}%`,
    transform: "translate(-50%, -50%)",
    maxWidth: "min(92%, calc(560px * var(--ms, 1)))",
  };
}

function layerTitleFontStyle(layer: ModelingTextOverlayLayout["title"], textDark: boolean): CSSProperties {
  return {
    fontSize: `calc(${layer.fontSizePx}px * var(--ms, 1) * var(--mt, 1))`,
    color: textDark ? "#0f172a" : "#ffffff",
  };
}

function layerBodyFontStyle(layer: ModelingTextOverlayLayout["title"], textDark: boolean): CSSProperties {
  return {
    fontSize: `calc(${layer.fontSizePx}px * var(--ms, 1) * var(--mt, 1))`,
    color: textDark ? "#0f172a" : "#ffffff",
  };
}

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
  frameRef: React.RefObject<HTMLDivElement | null>;
  selectedLayer: ModelingOverlayLayerKey | null;
  onSelectLayer: (layer: ModelingOverlayLayerKey) => void;
  onDragStart: (layer: ModelingOverlayLayerKey, e: ReactPointerEvent<HTMLElement>) => void;
  imageSizes: string;
  /** When false, overlay is display-only (e.g. inline preview before opening the modal editor). */
  interactive: boolean;
  /** When set with `interactive`, title is edited in place and updates parent state. */
  onTitleChange?: (value: string) => void;
  /** When set with `interactive`, description HTML is edited in place. */
  onBodyHtmlChange?: (value: string) => void;
};

function DragMoveHandle({
  label,
  onActivate,
  onPointerDown,
}: {
  label: string;
  onActivate: () => void;
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onPointerDown={(e) => {
        e.stopPropagation();
        onActivate();
        onPointerDown(e);
      }}
      className="absolute left-1/2 top-0 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-[calc(100%+4px)] cursor-grab items-center justify-center rounded-md border border-slate-400/90 bg-white/95 text-slate-600 shadow-sm hover:bg-white active:cursor-grabbing"
    >
      <span className="flex flex-col gap-0.5" aria-hidden>
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
      </span>
    </button>
  );
}

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
  interactive,
  onTitleChange,
  onBodyHtmlChange,
}: OverlayEditorSurfaceProps) {
  const aspectClass = variant === "desktop" ? "aspect-[83/43]" : "aspect-[360/259]";
  const paddingClass =
    variant === "desktop" ? OVERLAY_PADDING_DESKTOP_CLASS : OVERLAY_PADDING_MOBILE_CLASS;

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

  const posTitle = layerPositionStyle(layout.title);
  const posBody = layerPositionStyle(layout.body);

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
      <div className={`absolute inset-0 ${paddingClass}`}>
        <div ref={frameRef} className="relative h-full w-full min-h-0 outline-none" tabIndex={-1}>
          <div
            className={`min-w-0 ${selectedRingClass(interactive && selectedLayer === "title")}`}
            style={posTitle}
          >
            {interactive && titleEditable ? (
              <DragMoveHandle
                label="Drag to move title"
                onActivate={() => onSelectLayer("title")}
                onPointerDown={(e) => onDragStart("title", e)}
              />
            ) : null}
            <h3
              ref={titleEditable ? titleRef : undefined}
              className={`min-w-0 font-manrope font-extrabold outline-none ${
                textDarkPreview ? "text-slate-900" : "text-white"
              } ${
                titleEditable
                  ? "cursor-text select-text whitespace-pre-wrap"
                  : "pointer-events-none touch-none select-none"
              } ${interactive && !titleEditable ? "pointer-events-auto cursor-grab active:cursor-grabbing" : ""}`}
              style={layerTitleFontStyle(layout.title, textDarkPreview)}
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
              {titleEditable ? null : <PreviewTitleLines title={titleText} />}
            </h3>
          </div>

          <div
            className={`min-w-0 ${selectedRingClass(interactive && selectedLayer === "body")}`}
            style={posBody}
          >
            {interactive && bodyEditable ? (
              <DragMoveHandle
                label="Drag to move description"
                onActivate={() => onSelectLayer("body")}
                onPointerDown={(e) => onDragStart("body", e)}
              />
            ) : null}
            {bodyEditable ? (
              <div
                ref={bodyRef}
                className={`modeling-slot-rich-body cursor-text select-text font-manrope font-light outline-none ${
                  textDarkPreview ? "text-slate-800" : "text-white/90"
                } ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
                style={layerBodyFontStyle(layout.body, textDarkPreview)}
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
                style={layerBodyFontStyle(layout.body, textDarkPreview)}
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
                  className={`modeling-slot-rich-body font-manrope font-light ${MODELING_TEXT_OVERLAY_RICH_PREVIEW_CLASS}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
