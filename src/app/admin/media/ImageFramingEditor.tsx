"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  resetModelingSlotFraming,
  resetOrderedGalleryFraming,
  type SiteMediaFramingActionResult,
  saveModelingSlotFraming,
  saveOrderedGalleryFraming,
} from "@/app/actions/site-media-framing";
import {
  resetManufacturingSpecializationItemFraming,
  saveManufacturingSpecializationItemFraming,
  type ManufacturingSpecializationItemFramingActionResult,
} from "@/app/actions/manufacturing-specialization-item-framing";
import {
  resetPowerBannerHeroFraming,
  savePowerBannerHeroFraming,
  type PowerBannerHeroFramingActionResult,
} from "@/app/actions/power-banner-hero-framing";
import {
  clampImageFraming,
  DEFAULT_IMAGE_FRAMING,
  framingFingerprint,
  framingToCoverImageStyle,
  type ImageFraming,
} from "@/lib/site-media/image-framing";
import { FramingDirectionPad } from "./FramingDirectionPad";
import {
  IMAGE_FRAMING_DRAG_SENSITIVITY,
  IMAGE_FRAMING_FOCUS_STEP,
  IMAGE_FRAMING_ZOOM_STEP,
} from "./image-framing-editor.constants";
import { framingSectionAppearance } from "./framing-section-appearance";
import type { ImageFramingTarget } from "./image-framing-target";
import { ModelingFramePositionHelpText } from "./ModelingFramePositionHelpText";

export type { ImageFramingTarget } from "./image-framing-target";

type ImageFramingEditorProps = {
  imageUrl: string | null;
  /** Saved framing from DB; null = use default center framing in the editor only. */
  initialFraming: ImageFraming | null;
  aspectClassName: string;
  target: ImageFramingTarget;
  /** When false, controls are disabled (e.g. no upload yet). */
  enabled: boolean;
  /** Passed to `next/image` `sizes` for the preview (match bounded preview width when set). */
  previewSizes?: string;
};

function mergeFraming(
  prev: ImageFraming,
  patch: Partial<ImageFraming>,
): ImageFraming {
  return clampImageFraming({ ...prev, ...patch });
}

const DEFAULT_FRAMING_PREVIEW_SIZES = "(max-width: 1024px) 100vw, 640px";

export function ImageFramingEditor({
  imageUrl,
  initialFraming,
  aspectClassName,
  target,
  enabled,
  previewSizes = DEFAULT_FRAMING_PREVIEW_SIZES,
}: ImageFramingEditorProps) {
  const router = useRouter();
  const [framing, setFraming] = useState<ImageFraming>(
    () => initialFraming ?? DEFAULT_IMAGE_FRAMING,
  );

  const serverFramingKey = framingFingerprint(initialFraming);

  useEffect(() => {
    setFraming(initialFraming ?? DEFAULT_IMAGE_FRAMING);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when saved framing changes (fingerprint), not when parent passes a new object reference with the same values.
  }, [serverFramingKey]);

  const [saveState, saveAction, savePending] = useActionState(
    async (
      _p:
        | SiteMediaFramingActionResult
        | PowerBannerHeroFramingActionResult
        | ManufacturingSpecializationItemFramingActionResult
        | null,
      formData: FormData,
    ): Promise<
      | SiteMediaFramingActionResult
      | PowerBannerHeroFramingActionResult
      | ManufacturingSpecializationItemFramingActionResult
      | null
    > => {
      if (target.kind === "powerBanner") {
        return savePowerBannerHeroFraming(
          _p as PowerBannerHeroFramingActionResult | null,
          formData,
        );
      }
      if (target.kind === "manufacturingItem") {
        return saveManufacturingSpecializationItemFraming(
          _p as ManufacturingSpecializationItemFramingActionResult | null,
          formData,
        );
      }
      if (target.kind === "gallery") {
        return saveOrderedGalleryFraming(_p as SiteMediaFramingActionResult | null, formData);
      }
      return saveModelingSlotFraming(_p as SiteMediaFramingActionResult | null, formData);
    },
    null,
  );

  const [resetState, resetAction, resetPending] = useActionState(
    async (
      _p:
        | SiteMediaFramingActionResult
        | PowerBannerHeroFramingActionResult
        | ManufacturingSpecializationItemFramingActionResult
        | null,
      formData: FormData,
    ): Promise<
      | SiteMediaFramingActionResult
      | PowerBannerHeroFramingActionResult
      | ManufacturingSpecializationItemFramingActionResult
      | null
    > => {
      if (target.kind === "powerBanner") {
        return resetPowerBannerHeroFraming(
          _p as PowerBannerHeroFramingActionResult | null,
          formData,
        );
      }
      if (target.kind === "manufacturingItem") {
        return resetManufacturingSpecializationItemFraming(
          _p as ManufacturingSpecializationItemFramingActionResult | null,
          formData,
        );
      }
      if (target.kind === "gallery") {
        return resetOrderedGalleryFraming(_p as SiteMediaFramingActionResult | null, formData);
      }
      return resetModelingSlotFraming(_p as SiteMediaFramingActionResult | null, formData);
    },
    null,
  );

  useEffect(() => {
    if (saveState?.ok || resetState?.ok) {
      router.refresh();
    }
  }, [saveState?.ok, resetState?.ok, router]);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    startFraming: ImageFraming;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !imageUrl) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startFraming: framing,
      };
    },
    [enabled, imageUrl, framing],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const rect = e.currentTarget.getBoundingClientRect();
      const scale = 100 / Math.max(rect.width, 1);
      const next = mergeFraming(d.startFraming, {
        focusX: d.startFraming.focusX - dx * scale * IMAGE_FRAMING_DRAG_SENSITIVITY,
        focusY: d.startFraming.focusY - dy * scale * IMAGE_FRAMING_DRAG_SENSITIVITY,
      });
      setFraming(next);
    },
    [],
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Already released.
    }
  }, []);

  const defaultFramingKey = framingFingerprint(DEFAULT_IMAGE_FRAMING);
  const localFramingKey = framingFingerprint(framing);
  const isAtDefaultFraming = localFramingKey === defaultFramingKey;
  const serverHasSavedFraming = initialFraming !== null;

  const message =
    saveState && !saveState.ok
      ? saveState.error
      : resetState && !resetState.ok
        ? resetState.error
        : saveState?.ok
          ? "Framing saved."
          : resetState?.ok
            ? "Framing reset."
            : null;

  if (!imageUrl) {
    return null;
  }

  const appearance = framingSectionAppearance(target);

  const resetDisabledWhenServerSaved =
    !enabled || savePending || resetPending;
  const resetDisabledLocalOnly =
    !enabled || savePending || resetPending || isAtDefaultFraming;

  return (
    <div
      className={`mt-4 space-y-3 rounded-xl border border-slate-200/90 p-4 ${appearance.cardClass}`}
    >
      <div>
        <p className="text-sm font-semibold text-slate-900">{appearance.title}</p>
        {target.kind === "modeling" ? (
          <ModelingFramePositionHelpText variant={target.variant} />
        ) : (
          <p className="mt-1 text-xs text-slate-600">
            Drag the image inside the preview or use the controls. Save to apply on the live site.
          </p>
        )}
      </div>

      <div
        className={`relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${aspectClassName} ${
          enabled ? "cursor-grab active:cursor-grabbing touch-none" : "opacity-70"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          style={framingToCoverImageStyle(framing)}
          sizes={previewSizes}
        />
      </div>

      <FramingDirectionPad
        disabled={!enabled || savePending || resetPending}
        onUp={() =>
          setFraming((f) => mergeFraming(f, { focusY: f.focusY - IMAGE_FRAMING_FOCUS_STEP }))
        }
        onDown={() =>
          setFraming((f) => mergeFraming(f, { focusY: f.focusY + IMAGE_FRAMING_FOCUS_STEP }))
        }
        onLeft={() =>
          setFraming((f) => mergeFraming(f, { focusX: f.focusX - IMAGE_FRAMING_FOCUS_STEP }))
        }
        onRight={() =>
          setFraming((f) => mergeFraming(f, { focusX: f.focusX + IMAGE_FRAMING_FOCUS_STEP }))
        }
      />

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          disabled={!enabled || savePending || resetPending}
          onClick={() =>
            setFraming((f) =>
              mergeFraming(f, { zoom: f.zoom + IMAGE_FRAMING_ZOOM_STEP }),
            )
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        >
          Zoom in
        </button>
        <button
          type="button"
          disabled={!enabled || savePending || resetPending}
          onClick={() =>
            setFraming((f) =>
              mergeFraming(f, { zoom: f.zoom - IMAGE_FRAMING_ZOOM_STEP }),
            )
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        >
          Zoom out
        </button>
      </div>

      {message ? (
        <p
          className={`text-sm ${
            (saveState && !saveState.ok) || (resetState && !resetState.ok)
              ? "text-red-700"
              : "text-emerald-800"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2 border-t border-slate-200/80 pt-3">
        <form action={saveAction} className="inline">
          {target.kind === "gallery" ? (
            <input type="hidden" name="itemId" value={target.itemId} />
          ) : null}
          {target.kind === "modeling" ? (
            <>
              <input type="hidden" name="slotId" value={target.slotId} />
              <input type="hidden" name="variant" value={target.variant} />
            </>
          ) : null}
          {target.kind === "powerBanner" ? (
            <input type="hidden" name="bannerKey" value={target.bannerKey} />
          ) : null}
          {target.kind === "manufacturingItem" ? (
            <input type="hidden" name="itemKey" value={target.itemKey} />
          ) : null}
          <input type="hidden" name="focusX" value={String(framing.focusX)} />
          <input type="hidden" name="focusY" value={String(framing.focusY)} />
          <input type="hidden" name="zoom" value={String(framing.zoom)} />
          <button
            type="submit"
            disabled={!enabled || savePending || resetPending}
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savePending ? "Saving…" : "Save framing"}
          </button>
        </form>
        {serverHasSavedFraming ? (
          <form action={resetAction} className="inline">
            {target.kind === "gallery" ? (
              <input type="hidden" name="itemId" value={target.itemId} />
            ) : null}
            {target.kind === "modeling" ? (
              <>
                <input type="hidden" name="slotId" value={target.slotId} />
                <input type="hidden" name="variant" value={target.variant} />
              </>
            ) : null}
            {target.kind === "powerBanner" ? (
              <input type="hidden" name="bannerKey" value={target.bannerKey} />
            ) : null}
            {target.kind === "manufacturingItem" ? (
              <input type="hidden" name="itemKey" value={target.itemKey} />
            ) : null}
            <button
              type="submit"
              disabled={resetDisabledWhenServerSaved}
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetPending ? "Resetting…" : "Reset framing"}
            </button>
          </form>
        ) : (
          <button
            type="button"
            disabled={resetDisabledLocalOnly}
            onClick={() => setFraming(clampImageFraming(DEFAULT_IMAGE_FRAMING))}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset framing
          </button>
        )}
      </div>
    </div>
  );
}
