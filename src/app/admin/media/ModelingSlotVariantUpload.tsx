"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  upsertModelingSlotImage,
  type ModelingSlotImageVariant,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

import { ImageUploadControl } from "./ImageUploadControl";
import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";

const VARIANT_LABEL: Record<ModelingSlotImageVariant, string> = {
  desktop: "Desktop / tablet",
  mobile: "Mobile",
};

const VARIANT_DESCRIPTION: Record<ModelingSlotImageVariant, string> = {
  desktop: "Shown from the medium breakpoint up (tablets and desktops).",
  mobile: "Shown below the medium breakpoint (phones). If empty, the desktop image is used.",
};

type ModelingSlotVariantUploadProps = {
  row: AdminModelingSlotRow;
  variant: ModelingSlotImageVariant;
};

export function ModelingSlotVariantUpload({
  row,
  variant,
}: ModelingSlotVariantUploadProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return upsertModelingSlotImage(row.slotKey, variant, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  const r2Key =
    variant === "desktop" ? row.r2ObjectKey : row.r2ObjectKeyMobile;
  const currentFileName = formatR2ObjectDisplayName(r2Key);
  const hasImage =
    variant === "desktop" ? Boolean(row.displayUrl) : Boolean(row.displayUrlMobile);
  const actionVerb = hasImage ? "Replace" : "Upload";

  return (
    <form
      action={formAction}
      aria-label={`${actionVerb} ${VARIANT_LABEL[variant]} image for ${row.label}`}
      className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4"
    >
      <div className="mb-3 border-b border-slate-200/80 pb-2">
        <p className="text-sm font-semibold text-slate-900">
          {VARIANT_LABEL[variant]}
        </p>
        <p className="mt-1 text-xs text-slate-600">{VARIANT_DESCRIPTION[variant]}</p>
      </div>

      {currentFileName ? (
        <p className="mb-2 text-xs text-slate-600">
          <span className="font-medium text-slate-700">Stored file:</span>{" "}
          <span className="break-all text-slate-800">{currentFileName}</span>
        </p>
      ) : (
        <p className="mb-2 text-xs text-slate-500">
          {variant === "mobile" && row.displayUrl
            ? "No separate mobile file — site uses the desktop image for small screens."
            : "No file uploaded for this size yet."}
        </p>
      )}

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-slate-800">
          {hasImage ? "Replace with a new image" : "Add your image"}
        </p>
        <p className="text-xs text-slate-500">
          {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
        </p>
        <ImageUploadControl
          disabled={isPending}
          stableDomId={`gc-modeling-upload-${row.slotKey}-${variant}`}
        />
      </div>

      <div className="mt-4">
        <MediaFormSubmitButton pendingLabel="Uploading…">
          {hasImage ? `Replace ${VARIANT_LABEL[variant]} image` : `Upload ${VARIANT_LABEL[variant]} image`}
        </MediaFormSubmitButton>
      </div>

      <ModelingSlotFormMessages state={state} />
    </form>
  );
}
