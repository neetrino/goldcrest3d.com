"use client";

import { useActionState, useRef, useState, useCallback, useEffect } from "react";
import { submitQuote } from "@/app/actions/quote";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import type { QuoteSubmitResult } from "@/app/actions/quote";
import Image from "next/image";
import { QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES } from "@/lib/validations/quoteAttachment";

const QUOTE_ATTACHMENT_FIELD_NAME = "attachment";
/** Picker shows all images + PDF; server still validates PNG, JPG, PDF only */
const ACCEPT_ATTRIBUTE = "image/png,image/jpeg,image/jpg,application/pdf,image/*";

const initialState: QuoteSubmitResult = null;

const labelClass =
  "font-manrope font-bold leading-[15px] tracking-[2px] text-[rgba(24,22,16,0.4)] text-[10px] uppercase";
const inputClass =
  "font-manrope w-full border-0 border-b border-[#EEEEEE] bg-transparent px-1 py-4 text-[16px] leading-[24px] text-[#757575] placeholder:text-[#757575] focus:ring-0 focus:border-[#c69f58] focus:outline-none transition-colors disabled:opacity-60";

const IMAGE_MIME_PREFIX = "image/";

function setFileInputFiles(input: HTMLInputElement | null, file: File | null) {
  if (!input) return;
  const dt = new DataTransfer();
  if (file) dt.items.add(file);
  input.files = dt.files;
}

function isImageFile(file: File): boolean {
  return (file.type ?? "").toLowerCase().startsWith(IMAGE_MIME_PREFIX);
}

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState<
    QuoteSubmitResult,
    FormData
  >(submitQuote, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const updateFilePreview = useCallback((file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setFileName(file ? file.name : "");
    if (file && isImageFile(file)) {
      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      updateFilePreview(file);
    },
    [updateFilePreview],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      const type = (file.type ?? "").toLowerCase();
      if (!QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES.includes(type)) return;
      setFileInputFiles(fileInputRef.current, file);
      updateFilePreview(file);
    },
    [updateFilePreview],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  useEffect(() => {
    if (state?.success === true) {
      setFileInputFiles(fileInputRef.current, null);
      updateFilePreview(null);
    }
  }, [state?.success, updateFilePreview]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  return (
    <form
      action={formAction}
      className="space-y-12"
      aria-describedby={
        state?.success === false
          ? "quote-error"
          : state?.success
            ? "quote-success"
            : undefined
      }
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="quote-fullName" className={`block ${labelClass}`}>
            Full Name
          </label>
          <input
            id="quote-fullName"
            name="fullName"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            disabled={isPending}
            className={inputClass}
            placeholder="Jean-Pierre Laurent"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="quote-email" className={`block ${labelClass}`}>
            Email
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isPending}
            className={inputClass}
            placeholder="email@studio.com"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="quote-message" className={`block ${labelClass}`}>
          Message
        </label>
        <textarea
          id="quote-message"
          name="message"
          required
          maxLength={5000}
          rows={4}
          disabled={isPending}
          className={`min-h-[129px] resize-y ${inputClass}`}
          placeholder="Describe technical requirements..."
        />
      </div>

      <div className="flex justify-center">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex w-full max-w-[848px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EEEEEE] bg-slate-50/50 px-6 pt-5 pb-6 transition-colors hover:bg-slate-50"
        >
          <label
            htmlFor="quote-attachment"
            className="flex w-full cursor-pointer flex-col items-center justify-center"
          >
            <span className="sr-only">Attach file (optional)</span>
            <input
              ref={fileInputRef}
              id="quote-attachment"
              name={QUOTE_ATTACHMENT_FIELD_NAME}
              type="file"
              accept={ACCEPT_ATTRIBUTE}
              disabled={isPending}
              className="sr-only"
              onChange={handleFileChange}
            />
            {previewUrl ? (
              <div className="mt-1 flex flex-col items-center gap-2">
                <img
                  src={previewUrl}
                  alt=""
                  className="max-h-[140px] max-w-full rounded object-contain"
                />
                <p className="font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.6)]">
                  {fileName}
                </p>
              </div>
            ) : fileName && fileName.toLowerCase().endsWith(".pdf") ? (
              <div className="mt-1 flex flex-col items-center gap-1">
                <span className="rounded bg-neutral-200 px-2 py-1 font-manrope text-xs font-medium text-neutral-600">
                  PDF
                </span>
                <p className="font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.6)]">
                  {fileName}
                </p>
              </div>
            ) : (
              <>
                <span className="flex h-[30px] w-6 items-center justify-center">
                  <Image
                    src={LANDING_IMAGES.iconUpload}
                    alt=""
                    width={24}
                    height={30}
                    className="object-contain"
                    unoptimized
                  />
                </span>
                <p className="mt-1 font-manrope text-[14px] font-normal leading-[20px] text-[rgba(24,22,16,0.6)]">
                  or drag and drop
                </p>
                <p className="font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.4)]">
                  {fileName || "No file chosen"}
                </p>
              </>
            )}
            <p className="mt-1 font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.4)]">
              PNG, JPG, PDF up to 10MB
            </p>
          </label>
        </div>
      </div>

      {state?.success === false && (
        <p
          id="quote-error"
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {state.error}
        </p>
      )}
      {state?.success === true && (
        <p
          id="quote-success"
          className="text-sm text-green-600 dark:text-green-400"
          role="status"
        >
          Request sent. We will get back to you.
        </p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="font-manrope h-[68px] min-w-[266px] rounded-full bg-[#181610] px-16 py-6 text-[14px] font-bold uppercase leading-[20px] tracking-[1.4px] text-white transition-colors hover:bg-[#181610]/90 disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
