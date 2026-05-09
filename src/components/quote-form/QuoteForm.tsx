"use client";

import {
  useActionState,
  useRef,
  useState,
  useCallback,
  useEffect,
  startTransition,
} from "react";
import { submitQuote } from "@/app/actions/quote";
import { notifyAdminLeadsUpdated } from "@/lib/adminLeadsBroadcast";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import type { QuoteSubmitResult } from "@/app/actions/quote";
import { uploadQuoteAttachmentsWithPresignedUrls } from "@/lib/client/quote-direct-upload";
import Image from "next/image";
import {
  resolveQuoteAttachmentContentType,
  validateQuoteAttachment,
} from "@/lib/validations/quoteAttachment";
/** Picker shows images + PDF; server allows PNG, JPEG/JPG, WebP, PDF */
const ACCEPT_ATTRIBUTE =
  "image/png,image/jpeg,image/webp,image/jpg,.jpg,.jpeg,.jfif,.webp,application/pdf,image/*";

const initialState: QuoteSubmitResult = null;

const labelClass =
  "font-manrope font-bold leading-[15px] tracking-[2px] text-[rgba(24,22,16,0.4)] text-[10px] uppercase";
const inputClass =
  "font-manrope w-full border-0 border-b border-[#EEEEEE] bg-transparent px-1 py-4 text-[16px] leading-[24px] text-[#757575] placeholder:text-[#757575] focus:ring-0 focus:border-[#c69f58] focus:outline-none transition-colors disabled:opacity-60";

/** Mobile: Figma padding, radius 33px, full width. `md:` â€” previous submit button. */
const QUOTE_SUBMIT_BUTTON_CLASS =
  "font-manrope flex w-full items-center justify-center self-stretch rounded-[33px] bg-[#181610] pt-[16.412px] pr-[102.148px] pb-[15.569px] pl-[102.345px] text-[14px] font-bold uppercase leading-[20px] tracking-[1.4px] text-white transition-colors hover:bg-[#181610]/90 disabled:opacity-60 md:h-[68px] md:min-w-[266px] md:w-auto md:rounded-full md:px-16 md:py-6 md:self-auto";

type FileWithPreview = { file: File; previewUrl: string | null };

function isImageFile(file: File): boolean {
  const t = resolveQuoteAttachmentContentType(file);
  return (
    t === "image/png" ||
    t === "image/jpeg" ||
    t === "image/webp"
  );
}

function buildFileWithPreview(file: File): FileWithPreview {
  const previewUrl =
    isImageFile(file) ? URL.createObjectURL(file) : null;
  return { file, previewUrl };
}

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState<
    QuoteSubmitResult,
    FormData
  >(submitQuote, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<FileWithPreview[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    const valid: FileWithPreview[] = [];
    let firstError: string | null = null;
    for (const file of newFiles) {
      const err = validateQuoteAttachment(file);
      if (err) {
        if (!firstError) firstError = err;
        continue;
      }
      valid.push(buildFileWithPreview(file));
    }
    setValidationError(firstError);
    setItems((prev) => [...prev, ...valid]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setItems((prev) => {
      const next = prev.slice();
      const removed = next.splice(index, 1)[0];
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
    setValidationError(null);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList?.length) return;
      const arr = Array.from(fileList);
      addFiles(arr);
      e.target.value = "";
    },
    [addFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const fileList = e.dataTransfer.files;
      if (!fileList?.length) return;
      addFiles(Array.from(fileList));
    },
    [addFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const itemsRef = useRef<FileWithPreview[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  useEffect(() => {
    if (state?.success !== true) return;
    notifyAdminLeadsUpdated();
    const toRevoke = itemsRef.current;
    startTransition(() => {
      toRevoke.forEach((i) => {
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      });
      setItems([]);
      setValidationError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    });
  }, [state?.success]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((i) => {
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setValidationError(null);
    setIsUploading(true);
    try {
      const uploadResult = await uploadQuoteAttachmentsWithPresignedUrls(
        itemsRef.current.map((i) => i.file),
      );
      if (!uploadResult.ok) {
        setValidationError(uploadResult.error);
        return;
      }
      const fd = new FormData(formEl);
      fd.set("attachmentKeys", JSON.stringify(uploadResult.keys));
      await formAction(fd);
    } finally {
      setIsUploading(false);
    }
  };

  const busy = isPending || isUploading;

  return (
    <form
      onSubmit={handleSubmit}
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
            disabled={busy}
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
            disabled={busy}
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
          disabled={busy}
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
            <input
              ref={fileInputRef}
              id="quote-attachment"
              type="file"
              accept={ACCEPT_ATTRIBUTE}
              multiple
              disabled={busy}
              className="sr-only"
              aria-label="Attach files (optional)"
              onChange={handleFileChange}
            />
            {items.length > 0 ? (
              <ul className="mt-1 w-full space-y-2" role="list">
                {items.map((item, index) => (
                  <li
                    key={`${item.file.name}-${index}`}
                    className="flex items-center gap-2 rounded border border-[#EEEEEE] bg-white px-3 py-2"
                  >
                    {item.previewUrl ? (
                      <Image
                        src={item.previewUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-neutral-200 font-manrope text-[10px] font-medium text-neutral-600">
                        PDF
                      </span>
                    )}
                    <span className="min-w-0 flex-1 truncate font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.6)]">
                      {item.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile(index);
                      }}
                      disabled={busy}
                      className="shrink-0 rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-50"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      <span className="text-lg leading-none" aria-hidden>
                        x
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <span
                  className="flex h-[36px] w-8 items-center justify-center"
                  data-landing-image={LANDING_IMAGE_IDS.QUOTE_UPLOAD_ICON}
                >
                  <Image
                    src={LANDING_IMAGES.iconUpload}
                    alt=""
                    width={32}
                    height={40}
                    className="object-contain"
                  />
                </span>
                <p className="mt-1 font-manrope text-[14px] font-normal leading-[20px] text-[rgba(24,22,16,0.6)]">
                  or drag and drop
                </p>
                <p className="font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.4)]">
                  No file chosen
                </p>
              </>
            )}
            <p className="mt-1 font-manrope text-[12px] font-normal leading-[16px] text-[rgba(24,22,16,0.4)]">
              PNG, JPG, JPEG, WebP, PDF up to 10MB each, up to 10 files
            </p>
          </label>
        </div>
      </div>
      {validationError && (
        <p
          className="text-center font-manrope text-[12px] font-normal leading-[16px] text-red-600"
          role="alert"
        >
          {validationError}
        </p>
      )}

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

      <div className="-mt-4 flex w-full justify-center md:mt-0">
        <button
          type="submit"
          disabled={busy}
          className={QUOTE_SUBMIT_BUTTON_CLASS}
        >
          {isUploading
            ? "Uploading..."
            : isPending
              ? "Sending..."
              : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
