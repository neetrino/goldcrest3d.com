"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  computeOverlayAlignment,
  type ModelingTextOverlayAlignmentGuides,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides";
import type { ModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import { clampModelingTextOverlayLayout } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

import {
  MODELING_TEXT_OVERLAY_EDITOR_CANVAS_CSS_VARS,
  MODELING_TEXT_OVERLAY_EDITOR_DESKTOP_CANVAS_MAX_WIDTH_PX,
  MODELING_TEXT_OVERLAY_EDITOR_MOBILE_CANVAS_MAX_WIDTH_PX,
  MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT,
} from "./modeling-text-overlay-editor.constants";
import { ModelingTextOverlayFontSliders } from "./ModelingTextOverlayFontSliders";
import {
  type ModelingOverlayLayerKey,
  ModelingTextOverlayEditorSurface,
} from "./ModelingTextOverlayEditorSurface";

type LayerKey = ModelingOverlayLayerKey;

type ModelingTextOverlayVisualEditorProps = {
  variant: "desktop" | "mobile";
  layout: ModelingTextOverlayLayout;
  onLayoutChange: (next: ModelingTextOverlayLayout) => void;
  imageUrl: string | null;
  titleText: string;
  bodyHtml: string;
  textDarkPreview: boolean;
  /** Inline edits sync to the same React state as the title fields (desktop vs mobile by `variant`). */
  onTitleChange: (value: string) => void;
  /** Inline edits sync to the same React state as the rich HTML fields (desktop vs mobile by `variant`). */
  onBodyHtmlChange: (value: string) => void;
};

export function ModelingTextOverlayVisualEditor({
  variant,
  layout,
  onLayoutChange,
  imageUrl,
  titleText,
  bodyHtml,
  textDarkPreview,
  onTitleChange,
  onBodyHtmlChange,
}: ModelingTextOverlayVisualEditorProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inlineFrameRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLDivElement>(null);
  const bodyLayerRef = useRef<HTMLDivElement>(null);
  const alignmentGuideClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogTitleId = useId();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerKey | null>(null);
  const [alignmentGuides, setAlignmentGuides] = useState<ModelingTextOverlayAlignmentGuides | null>(
    null,
  );

  const updateLayer = useCallback(
    (key: LayerKey, patch: Partial<ModelingTextOverlayLayout["title"]>) => {
      onLayoutChange(
        clampModelingTextOverlayLayout({
          ...layout,
          [key]: { ...layout[key], ...patch },
        }),
      );
    },
    [layout, onLayoutChange],
  );

  const startDrag = useCallback(
    (
      layer: LayerKey,
      frameRef: React.RefObject<HTMLDivElement | null>,
      event: ReactPointerEvent<HTMLElement>,
    ) => {
      event.preventDefault();
      const el = event.currentTarget;
      const frame = frameRef.current;
      const titleEl = titleLayerRef.current;
      const bodyEl = bodyLayerRef.current;
      if (!frame) {
        return;
      }
      el.setPointerCapture(event.pointerId);

      const onMove = (ev: PointerEvent) => {
        const fr = frame.getBoundingClientRect();
        const rawCenterXPx = ev.clientX - fr.left;
        const rawCenterYPx = ev.clientY - fr.top;
        if (!titleEl || !bodyEl) {
          const xPct = (rawCenterXPx / fr.width) * 100;
          const yPct = (rawCenterYPx / fr.height) * 100;
          updateLayer(layer, { xPct, yPct });
          return;
        }
        const movingEl = layer === "title" ? titleEl : bodyEl;
        const otherEl = layer === "title" ? bodyEl : titleEl;
        const result = computeOverlayAlignment(fr, layer, movingEl, otherEl, rawCenterXPx, rawCenterYPx);
        updateLayer(layer, { xPct: result.xPct, yPct: result.yPct });
        setAlignmentGuides(result.guides);
      };

      const onUp = (ev: PointerEvent) => {
        setAlignmentGuides(null);
        if (el.hasPointerCapture(ev.pointerId)) {
          el.releasePointerCapture(ev.pointerId);
        }
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
    },
    [updateLayer],
  );

  const variantLabel = variant === "desktop" ? "Desktop / tablet" : "Mobile";
  const modalCanvasMaxStyle =
    variant === "desktop"
      ? { maxWidth: MODELING_TEXT_OVERLAY_EDITOR_DESKTOP_CANVAS_MAX_WIDTH_PX }
      : { maxWidth: MODELING_TEXT_OVERLAY_EDITOR_MOBILE_CANVAS_MAX_WIDTH_PX };

  const imageSizesInline =
    variant === "desktop"
      ? "(max-width: 768px) 100vw, min(800px, 100vw)"
      : "(max-width: 768px) 100vw, 480px";

  const imageSizesModal =
    variant === "desktop"
      ? `(max-width: 1280px) 100vw, ${MODELING_TEXT_OVERLAY_EDITOR_DESKTOP_CANVAS_MAX_WIDTH_PX}px`
      : `(max-width: 480px) 100vw, ${MODELING_TEXT_OVERLAY_EDITOR_MOBILE_CANVAS_MAX_WIDTH_PX}px`;

  const openModal = useCallback(() => {
    setEditorOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    setAlignmentGuides(null);
    if (alignmentGuideClearRef.current !== null) {
      clearTimeout(alignmentGuideClearRef.current);
      alignmentGuideClearRef.current = null;
    }
    dialogRef.current?.close();
    setEditorOpen(false);
  }, []);

  useEffect(() => {
    if (!editorOpen || !selectedLayer) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowDown") {
        return;
      }
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      const step =
        e.shiftKey ? MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT * 4 : MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT;
      const cur = layout[selectedLayer];
      let nextXPct = cur.xPct;
      let nextYPct = cur.yPct;
      if (e.key === "ArrowLeft") nextXPct -= step;
      if (e.key === "ArrowRight") nextXPct += step;
      if (e.key === "ArrowUp") nextYPct -= step;
      if (e.key === "ArrowDown") nextYPct += step;

      const frame = modalFrameRef.current;
      const titleEl = titleLayerRef.current;
      const bodyEl = bodyLayerRef.current;
      if (frame && titleEl && bodyEl) {
        const fr = frame.getBoundingClientRect();
        const rawCenterXPx = (nextXPct / 100) * fr.width;
        const rawCenterYPx = (nextYPct / 100) * fr.height;
        const movingEl = selectedLayer === "title" ? titleEl : bodyEl;
        const otherEl = selectedLayer === "title" ? bodyEl : titleEl;
        const result = computeOverlayAlignment(
          fr,
          selectedLayer,
          movingEl,
          otherEl,
          rawCenterXPx,
          rawCenterYPx,
        );
        updateLayer(selectedLayer, { xPct: result.xPct, yPct: result.yPct });
        setAlignmentGuides(result.guides);
        if (alignmentGuideClearRef.current !== null) {
          clearTimeout(alignmentGuideClearRef.current);
        }
        alignmentGuideClearRef.current = setTimeout(() => {
          setAlignmentGuides(null);
          alignmentGuideClearRef.current = null;
        }, 420);
      } else {
        updateLayer(selectedLayer, { xPct: nextXPct, yPct: nextYPct });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (alignmentGuideClearRef.current !== null) {
        clearTimeout(alignmentGuideClearRef.current);
        alignmentGuideClearRef.current = null;
      }
    };
  }, [editorOpen, layout, selectedLayer, updateLayer]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Editing: {variantLabel}
        </p>
      </div>

      <div className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2 shadow-inner">
        <div className="w-full" style={MODELING_TEXT_OVERLAY_EDITOR_CANVAS_CSS_VARS}>
          <button
            type="button"
            onClick={openModal}
            className="group relative w-full cursor-zoom-in rounded-lg text-left outline-none ring-slate-300 transition hover:ring-2 focus-visible:ring-2"
            aria-label={`Open ${variantLabel} visual layout editor`}
          >
            <ModelingTextOverlayEditorSurface
              variant={variant}
              layout={layout}
              imageUrl={imageUrl}
              titleText={titleText}
              bodyHtml={bodyHtml}
              textDarkPreview={textDarkPreview}
              frameRef={inlineFrameRef}
              selectedLayer={null}
              onSelectLayer={() => {}}
              onDragStart={() => {}}
              imageSizes={imageSizesInline}
              overlaySuppressed
              interactive={false}
            />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-slate-900/75 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            Open full editor
          </span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed left-0 top-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 shadow-none [&::backdrop]:bg-slate-900/50"
        aria-labelledby={dialogTitleId}
        onClose={() => setEditorOpen(false)}
      >
        <div
          className="flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="flex max-h-[min(100dvh-2rem,1000px)] w-full flex-col gap-4 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6"
            style={modalCanvasMaxStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 id={dialogTitleId} className="text-base font-semibold text-slate-900">
                  Visual layout — {variantLabel}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Click title or description to type in place (Enter for new lines; description supports
                  paragraphs). Lines do not auto-wrap when you change size — only explicit breaks and
                  paragraph structure apply. Use the grip above a selected layer to drag position. Arrow
                  keys nudge the selected layer. Sizes apply to this layout only — close when done; save
                  with the form when ready.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="w-full rounded-xl border border-slate-200 bg-slate-100 p-3 shadow-inner">
              <div className="w-full" style={MODELING_TEXT_OVERLAY_EDITOR_CANVAS_CSS_VARS}>
                <ModelingTextOverlayEditorSurface
                  variant={variant}
                  layout={layout}
                  imageUrl={imageUrl}
                  titleText={titleText}
                  bodyHtml={bodyHtml}
                  textDarkPreview={textDarkPreview}
                  frameRef={modalFrameRef}
                  selectedLayer={selectedLayer}
                  onSelectLayer={setSelectedLayer}
                  onDragStart={(layer, e) => startDrag(layer, modalFrameRef, e)}
                  imageSizes={imageSizesModal}
                  interactive
                  onTitleChange={onTitleChange}
                  onBodyHtmlChange={onBodyHtmlChange}
                  alignmentGuides={alignmentGuides}
                  layerRefs={{ title: titleLayerRef, body: bodyLayerRef }}
                />
              </div>
            </div>

            <ModelingTextOverlayFontSliders variantLabel={variantLabel} layout={layout} updateLayer={updateLayer} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
