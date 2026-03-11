"use client";

import { useActionState, useRef } from "react";
import { submitQuote } from "@/app/actions/quote";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import type { QuoteSubmitResult } from "@/app/actions/quote";
import Image from "next/image";

const QUOTE_ATTACHMENT_FIELD_NAME = "attachment";

const initialState: QuoteSubmitResult = null;

const labelClass =
  "font-manrope font-bold leading-[15px] tracking-[2px] text-[rgba(24,22,16,0.4)] text-[10px] uppercase";
const inputClass =
  "font-manrope w-full border-0 border-b border-[#EEEEEE] bg-transparent px-1 py-4 text-[16px] leading-[24px] text-[#757575] placeholder:text-[#757575] focus:ring-0 focus:border-[#c69f58] focus:outline-none transition-colors disabled:opacity-60";

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState<
    QuoteSubmitResult,
    FormData
  >(submitQuote, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full max-w-[848px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EEEEEE] bg-slate-50/50 px-6 pt-5 pb-6 transition-colors hover:bg-slate-50"
        >
          <input
            ref={fileInputRef}
            id="quote-attachment"
            name={QUOTE_ATTACHMENT_FIELD_NAME}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            disabled={isPending}
            className="sr-only"
          />
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
            PNG, JPG, PDF up to 10MB
          </p>
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
