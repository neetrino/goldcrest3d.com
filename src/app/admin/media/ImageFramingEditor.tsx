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
  resetPowerBannerMobileHeroFraming,
  savePowerBannerMobileHeroFraming,
  type PowerBannerMobileHeroFramingActionResult,
} from "@/app/actions/power-banner-mobile-hero-framing";
import {
  resetFounderSectionFraming,
  saveFounderSectionFraming,
  type FounderSectionFramingActionResult,
} from "@/app/actions/founder-section-framing";
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
  const framingRef = useRef<ImageFraming>(initialFraming ?? DEFAULT_IMAGE_FRAMING);
  const saveInFlightRef = useRef(false);
  const [savePending, setSavePending] = useState(false);

  const serverFramingKey = framingFingerprint(initialFraming);

  useEffect(() => {
    const nextFraming = initialFraming ?? DEFAULT_IMAGE_FRAMING;
    framingRef.current = nextFraming;
    setFraming(nextFraming);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when saved framing changes (fingerprint), not when parent passes a new object reference with the same values.
  }, [serverFramingKey]);

  const [saveState, setSaveState] = useState<
    | SiteMediaFramingActionResult
    | PowerBannerHeroFramingActionResult
    | PowerBannerMobileHeroFramingActionResult
    | ManufacturingSpecializationItemFramingActionResult
    | FounderSectionFramingActionResult
    | null
  >(null);

  const runSaveFramingAction = useCallback(
    async (
      formData: FormData,
    ): Promise<
      | SiteMediaFramingActionResult
      | PowerBannerHeroFramingActionResult
      | PowerBannerMobileHeroFramingActionResult
      | ManufacturingSpecializationItemFramingActionResult
      | FounderSectionFramingActionResult
      | null
    > => {
      if (target.kind === "powerBanner") {
        if (target.variant === "mobile") {
          return savePowerBannerMobileHeroFraming(null, formData);
        }
        return savePowerBannerHeroFraming(null, formData);
      }
      if (target.kind === "manufacturingItem") {
        return saveManufacturingSpecializationItemFraming(null, formData);
      }
      if (target.kind === "founder") {
        return saveFounderSectionFraming(null, formData);
      }
      if (target.kind === "gallery") {
        return saveOrderedGalleryFraming(null, formData);
      }
      return saveModelingSlotFraming(null, formData);
    },
    [target],
  );

  const [resetState, resetAction, resetPending] = useActionState(
    async (
      _p:
        | SiteMediaFramingActionResult
        | PowerBannerHeroFramingActionResult
        | PowerBannerMobileHeroFramingActionResult
        | ManufacturingSpecializationItemFramingActionResult
        | FounderSectionFramingActionResult
        | null,
      formData: FormData,
    ): Promise<
      | SiteMediaFramingActionResult
      | PowerBannerHeroFramingActionResult
      | PowerBannerMobileHeroFramingActionResult
      | ManufacturingSpecializationItemFramingActionResult
      | FounderSectionFramingActionResult
      | null
    > => {
      if (target.kind === "powerBanner") {
        if (target.variant === "mobile") {
          return resetPowerBannerMobileHeroFraming(
            _p as PowerBannerMobileHeroFramingActionResult | null,
            formData,
          );
        }
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
      if (target.kind === "founder") {
        return resetFounderSectionFraming(
          _p as FounderSectionFramingActionResult | null,
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

  const updateFraming = useCallback(
    (updater: ImageFraming | ((prev: ImageFraming) => ImageFraming)) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: ImageFraming) => ImageFraming)(framingRef.current)
          : updater;
      framingRef.current = next;
      setFraming(next);
    },
    [],
  );

  const handleSaveFraming = useCallback(async () => {
    if (!enabled || savePending || resetPending || saveInFlightRef.current) {
      return;
    }

    saveInFlightRef.current = true;
    setSavePending(true);
    try {
      const nextFraming = framingRef.current;
      const formData = new FormData();

      if (target.kind === "gallery") {
        formData.set("itemId", target.itemId);
      }
      if (target.kind === "modeling") {
        formData.set("slotId", target.slotId);
        formData.set("variant", target.variant);
      }
      if (target.kind === "powerBanner") {
        formData.set("bannerKey", target.bannerKey);
      }
      if (target.kind === "manufacturingItem") {
        formData.set("itemKey", target.itemKey);
      }

      formData.set("focusX", String(nextFraming.focusX));
      formData.set("focusY", String(nextFraming.focusY));
      formData.set("zoom", String(nextFraming.zoom));

      const result = await runSaveFramingAction(formData);
      setSaveState(result);
    } catch {
      setSaveState({ ok: false, error: "Could not save framing." });
    } finally {
      saveInFlightRef.current = false;
      setSavePending(false);
    }
  }, [enabled, resetPending, runSaveFramingAction, savePending, target]);

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
        startFraming: framingRef.current,
      };
    },
    [enabled, imageUrl],
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
      updateFraming(next);
    },
    [updateFraming],
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
  const isPowerBannerMobileCompact =
    target.kind === "powerBanner" && target.variant === "mobile";
  const cardClassName = isPowerBannerMobileCompact
    ? `mt-3 space-y-2.5 rounded-xl border border-slate-200/90 p-3 sm:p-3.5 ${appearance.cardClass}`
    : `mt-4 space-y-3 rounded-xl border border-slate-200/90 p-4 ${appearance.cardClass}`;
  const titleClassName = isPowerBannerMobileCompact
    ? "text-[0.82rem] font-semibold text-slate-900"
    : "text-sm font-semibold text-slate-900";
  const hintClassName = isPowerBannerMobileCompact
    ? "mt-1 text-[11px] text-slate-600"
    : "mt-1 text-xs text-slate-600";
  const previewClassName = isPowerBannerMobileCompact
    ? `relative mx-auto w-full max-w-[clamp(10.5rem,42vw,12.5rem)] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${aspectClassName} ${
        enabled ? "cursor-grab active:cursor-grabbing touch-none" : "opacity-70"
      }`
    : `relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${aspectClassName} ${
        enabled ? "cursor-grab active:cursor-grabbing touch-none" : "opacity-70"
      }`;
  const zoomControlsClassName = isPowerBannerMobileCompact
    ? "flex flex-wrap justify-center gap-1.5"
    : "flex flex-wrap justify-center gap-2";
  const zoomButtonClassName = isPowerBannerMobileCompact
    ? "rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50"
    : "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-50";
  const messageClassName = isPowerBannerMobileCompact ? "text-xs" : "text-sm";
  const actionsClassName = isPowerBannerMobileCompact
    ? "flex flex-wrap gap-1.5 border-t border-slate-200/80 pt-2.5"
    : "flex flex-wrap gap-2 border-t border-slate-200/80 pt-3";
  const primaryActionClassName = isPowerBannerMobileCompact
    ? "inline-flex items-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    : "inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60";
  const secondaryActionClassName = isPowerBannerMobileCompact
    ? "inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    : "inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60";

  const resetDisabledWhenServerSaved =
    !enabled || savePending || resetPending;
  const resetDisabledLocalOnly =
    !enabled || savePending || resetPending || isAtDefaultFraming;

  return (
    <div className={cardClassName}>
      <div>
        <p className={titleClassName}>{appearance.title}</p>
        {target.kind === "modeling" ? (
          <ModelingFramePositionHelpText variant={target.variant} />
        ) : (
          <p className={hintClassName}>
            Drag the image inside the preview or use the controls. Save to apply on the live site.
          </p>
        )}
      </div>

      <div
        className={previewClassName}
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
        compact={isPowerBannerMobileCompact}
        disabled={!enabled || savePending || resetPending}
        onUp={() =>
          updateFraming((f) =>
            mergeFraming(f, { focusY: f.focusY - IMAGE_FRAMING_FOCUS_STEP }),
          )
        }
        onDown={() =>
          updateFraming((f) =>
            mergeFraming(f, { focusY: f.focusY + IMAGE_FRAMING_FOCUS_STEP }),
          )
        }
        onLeft={() =>
          updateFraming((f) =>
            mergeFraming(f, { focusX: f.focusX - IMAGE_FRAMING_FOCUS_STEP }),
          )
        }
        onRight={() =>
          updateFraming((f) =>
            mergeFraming(f, { focusX: f.focusX + IMAGE_FRAMING_FOCUS_STEP }),
          )
        }
      />

      <div className={zoomControlsClassName}>
        <button
          type="button"
          disabled={!enabled || savePending || resetPending}
          onClick={() =>
            updateFraming((f) =>
              mergeFraming(f, { zoom: f.zoom + IMAGE_FRAMING_ZOOM_STEP }),
            )
          }
          className={zoomButtonClassName}
        >
          Zoom in
        </button>
        <button
          type="button"
          disabled={!enabled || savePending || resetPending}
          onClick={() =>
            updateFraming((f) =>
              mergeFraming(f, { zoom: f.zoom - IMAGE_FRAMING_ZOOM_STEP }),
            )
          }
          className={zoomButtonClassName}
        >
          Zoom out
        </button>
      </div>

      {message ? (
        <p
          className={`${messageClassName} ${
            (saveState && !saveState.ok) || (resetState && !resetState.ok)
              ? "text-red-700"
              : "text-emerald-800"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <div className={actionsClassName}>
        <button
          type="button"
          onClick={handleSaveFraming}
          disabled={!enabled || savePending || resetPending}
          className={primaryActionClassName}
        >
          {savePending ? "Saving…" : "Save framing"}
        </button>
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
              className={secondaryActionClassName}
            >
              {resetPending ? "Resetting…" : "Reset framing"}
            </button>
          </form>
        ) : (
          <button
            type="button"
            disabled={resetDisabledLocalOnly}
            onClick={() => updateFraming(clampImageFraming(DEFAULT_IMAGE_FRAMING))}
            className={secondaryActionClassName}
          >
            Reset framing
          </button>
        )}
      </div>
    </div>
  );
}
