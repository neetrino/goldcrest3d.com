"use client";

import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { formatR2ObjectDisplayName } from "@/lib/site-media/format-r2-object-label";

import { ImageUploadControl } from "./ImageUploadControl";
import {
  SITE_MEDIA_FORMATS_LABEL,
  SITE_MEDIA_MAX_SIZE_MB,
} from "./media-manager.constants";

type ModelingSlotStoredAndUploadProps = {
  row: AdminModelingSlotRow;
  isPending: boolean;
};

export function ModelingSlotStoredAndUpload({
  row,
  isPending,
}: ModelingSlotStoredAndUploadProps) {
  const currentFileName = formatR2ObjectDisplayName(row.r2ObjectKey);
  const hasImage = Boolean(row.displayUrl);

  return (
    <>
      {currentFileName ? (
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">Stored file:</span>{" "}
          <span className="break-all text-slate-800">{currentFileName}</span>
        </p>
      ) : (
        <p className="text-xs text-slate-500">No file uploaded for this slot yet.</p>
      )}

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-slate-800">
          {hasImage ? "Replace with a new image" : "Add your image"}
        </p>
        <p className="text-xs text-slate-500">
          {SITE_MEDIA_FORMATS_LABEL} · max {SITE_MEDIA_MAX_SIZE_MB} MB
        </p>
        <ImageUploadControl disabled={isPending} />
      </div>
    </>
  );
}
