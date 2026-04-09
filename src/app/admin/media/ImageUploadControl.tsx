"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { SITE_MEDIA_ACCEPT } from "./media-manager.constants";

type ImageUploadControlProps = {
  /** When false, e.g. while parent form is submitting */
  disabled?: boolean;
  /** Called when user selects or drops a file (for showing filename only) */
  onFileChosen?: (file: File | null) => void;
  /**
   * Stable `id` / `htmlFor` for input+label. Prefer on pages with several uploads:
   * `useId()` can diverge between SSR and hydration when many client trees mount together.
   */
  stableDomId?: string;
};

/**
 * Accessible drop / click target for a single image file input (`name="file"`).
 */
export function ImageUploadControl({
  disabled,
  onFileChosen,
  stableDomId,
}: ImageUploadControlProps) {
  const generatedId = useId();
  const inputId = stableDomId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const applyFile = useCallback(
    (file: File | null) => {
      if (!inputRef.current) {
        return;
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (!file) {
        inputRef.current.value = "";
        setDisplayName(null);
        setPreviewUrl(null);
        onFileChosen?.(null);
        return;
      }
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
      setDisplayName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      onFileChosen?.(file);
    },
    [onFileChosen, previewUrl],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    applyFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      applyFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`rounded-xl border-2 border-dashed transition-colors ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
            : isDragging
              ? "border-amber-500 bg-amber-50/80"
              : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/80"
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          name="file"
          type="file"
          accept={SITE_MEDIA_ACCEPT}
          required
          disabled={disabled}
          onChange={onInputChange}
          className="sr-only"
        />
        {previewUrl ? (
          <div className="p-3">
            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img
                src={previewUrl}
                alt={displayName ? `Preview of ${displayName}` : "Selected image preview"}
                className="h-40 w-full object-contain"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor={inputId}
                className={`inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 ${
                  disabled ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                Choose a different image
              </label>
              <button
                type="button"
                onClick={() => applyFile(null)}
                disabled={disabled}
                className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Remove selected image
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className={`flex cursor-pointer flex-col items-center gap-2 px-4 py-8 text-center ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            <span
              className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600"
              aria-hidden
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-slate-800">
              Drop an image here, or click to browse
            </span>
            <span className="max-w-[280px] text-xs text-slate-500">
              One file at a time
            </span>
          </label>
        )}
      </div>
      {displayName ? (
        <p className="truncate text-xs text-slate-600" title={displayName}>
          Selected: <span className="font-medium text-slate-800">{displayName}</span>
        </p>
      ) : null}
    </div>
  );
}
