"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import {
  clampPowerBannerMobileHeroTextLayout,
  type PowerBannerMobileHeroOverlayLayerKey,
  type PowerBannerMobileHeroTextLayout,
} from "@/lib/power-banner-copy/power-banner-mobile-hero-text-layout";
import {
  computeOverlayAlignment,
  type ModelingTextOverlayAlignmentGuides,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides";
import type { ImageFraming } from "@/lib/site-media/image-framing";

import { MODELING_TEXT_OVERLAY_EDITOR_NUDGE_PCT } from "./modeling-text-overlay-editor.constants";
import { PowerBannerMobileHeroFontSliders } from "./PowerBannerMobileHeroFontSliders";
import {
  PowerBannerMobileHeroTextEditorSurface,
} from "./PowerBannerMobileHeroTextEditorSurface";
import { POWER_BANNER_MOBILE_HERO_TEXT_EDITOR_FRAME_MAX_WIDTH_PX } from "./power-banner-mobile-hero-text-editor.constants";

type LayerKey = PowerBannerMobileHeroOverlayLayerKey;

type PowerBannerMobileHeroTextVisualEditorProps = {
  bannerKey: PowerBannerKey;
  layout: PowerBannerMobileHeroTextLayout;
  onLayoutChange: (next: PowerBannerMobileHeroTextLayout) => void;
  mobileBgSrc: string;
  mobileFraming: ImageFraming | null;
  titleText: string;
  bodyHtml: string;
  onTitleChange: (value: string) => void;
  onBodyHtmlChange: (value: string) => void;
};

export function PowerBannerMobileHeroTextVisualEditor({
  bannerKey,
  layout,
  onLayoutChange,
  mobileBgSrc,
  mobileFraming,
  titleText,
  bodyHtml,
  onTitleChange,
  onBodyHtmlChange,
}: PowerBannerMobileHeroTextVisualEditorProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inlineFrameRef = useRef<HTMLDivElement>(null);
  const modalFrameRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLDivElement>(null);
  const bodyLayerRef = useRef<HTMLDivElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);
  const alignmentGuideClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogTitleId = useId();
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerKey | null>(null);
  const [alignmentGuides, setAlignmentGuides] = useState<ModelingTextOverlayAlignmentGuides | null>(null);

  const updateLayer = useCallback(
    (key: LayerKey, patch: Partial<PowerBannerMobileHeroTextLayout["title"]>) => {
      onLayoutChange(
        clampPowerBannerMobileHeroTextLayout({
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
      event: React.PointerEvent<HTMLElement>,
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
        if (layer === "cta" || !titleEl || !bodyEl) {
          const xPct = (rawCenterXPx / fr.width) * 100;
          const yPct = (rawCenterYPx / fr.height) * 100;
          updateLayer(layer, { xPct, yPct });
          setAlignmentGuides(null);
          return;
        }
        const movingEl = layer === "title" ? titleEl : bodyEl;
        const otherEl = layer === "title" ? bodyEl : titleEl;
        const result = computeOverlayAlignment(
          fr,
          layer,
          movingEl,
          otherEl,
          rawCenterXPx,
          rawCenterYPx,
        );
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

  const modalCanvasMaxStyle = { maxWidth: POWER_BANNER_MOBILE_HERO_TEXT_EDITOR_FRAME_MAX_WIDTH_PX };

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

      if (selectedLayer === "cta") {
        updateLayer("cta", { xPct: nextXPct, yPct: nextYPct });
        return;
      }

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
      <div className="mx-auto w-full rounded-xl border border-slate-200 bg-slate-100 py-2 shadow-inner" style={modalCanvasMaxStyle}>
        <button
          type="button"
          onClick={openModal}
          className="group relative w-full cursor-zoom-in rounded-lg text-left outline-none ring-slate-300 transition hover:ring-2 focus-visible:ring-2"
          aria-label="Open Visual text layout editor"
        >
          <PowerBannerMobileHeroTextEditorSurface
            bannerKey={bannerKey}
            layout={layout}
            imageUrl={mobileBgSrc}
            mobileFraming={mobileFraming}
            titleText={titleText}
            bodyHtml={bodyHtml}
            frameRef={inlineFrameRef}
            selectedLayer={null}
            onSelectLayer={() => {}}
            onDragStart={() => {}}
            overlaySuppressed
            interactive={false}
          />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-slate-900/75 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            Open full editor
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed left-0 top-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 shadow-none [&::backdrop]:bg-slate-900/50"
        aria-labelledby={dialogTitleId}
        onClose={() => setEditorOpen(false)}
      >
        <div className="flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6" onClick={closeModal}>
          <div
            className="flex max-h-[min(100dvh-2rem,1000px)] w-full max-w-[min(100dvw-2rem,65rem)] flex-col gap-4 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 id={dialogTitleId} className="text-base font-semibold text-slate-900">
                  Visual text layout — Mobile hero
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Drag title, description, or Get a Quote (or arrow keys when a layer is selected). Sizes apply
                  to the mobile hero only. Save mobile content below when finished.
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

            <div className="mx-auto w-full rounded-xl border border-slate-200 bg-slate-100 py-3 shadow-inner" style={modalCanvasMaxStyle}>
              <PowerBannerMobileHeroTextEditorSurface
                bannerKey={bannerKey}
                layout={layout}
                imageUrl={mobileBgSrc}
                mobileFraming={mobileFraming}
                titleText={titleText}
                bodyHtml={bodyHtml}
                frameRef={modalFrameRef}
                selectedLayer={selectedLayer}
                onSelectLayer={setSelectedLayer}
                onDragStart={(layer, e) => startDrag(layer, modalFrameRef, e)}
                interactive
                onTitleChange={onTitleChange}
                onBodyHtmlChange={onBodyHtmlChange}
                alignmentGuides={alignmentGuides}
                layerRefs={{ title: titleLayerRef, body: bodyLayerRef, cta: ctaLayerRef }}
              />
            </div>

            <PowerBannerMobileHeroFontSliders variantLabel="Mobile hero" layout={layout} updateLayer={updateLayer} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
