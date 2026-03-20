"use client";

import { useActionState } from "react";
import { submitQuote } from "@/app/actions/quote";
import { SectionContainer } from "./SectionContainer";

const INITIAL_STATE: { success: true } | { success: false; error: string } | null =
  null;

export function ContactForm() {
  const [state, formAction] = useActionState(submitQuote, INITIAL_STATE);

  return (
    <SectionContainer id="contact" className="bg-white">
      <div className="container-narrow mx-auto max-w-3xl">
        <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest text-center">
          Inquiry
        </p>
        <h2 className="mt-2 text-[var(--color-charcoal)] text-[clamp(2rem,4vw,3rem)] font-normal tracking-tight text-center">
          Submit Project
        </h2>
        <p className="mt-3 text-[var(--color-charcoal-muted)] text-lg lg:text-xl text-center">
          Start your next engineering project with precision.
        </p>

        <form action={formAction} className="mt-10 lg:mt-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-3">
              <label
                htmlFor="fullName"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal-label)]"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Jean-Pierre Laurent"
                className="w-full bg-transparent border-0 border-b border-[var(--color-input-border)] px-1 py-4 text-base text-[var(--color-charcoal)] placeholder:text-[#757575] focus:ring-0 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal-label)]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@studio.com"
                className="w-full bg-transparent border-0 border-b border-[var(--color-input-border)] px-1 py-4 text-base text-[var(--color-charcoal)] placeholder:text-[#757575] focus:ring-0 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal-label)]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Describe technical requirements..."
              className="w-full bg-transparent border-0 border-b border-[var(--color-input-border)] px-1 py-4 text-base text-[var(--color-charcoal)] placeholder:text-[#757575] focus:ring-0 focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-y min-h-[120px]"
            />
          </div>

          <div className="flex flex-col items-center justify-center px-4 py-6 lg:py-8 border-2 border-dashed border-[var(--color-input-border)] rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <label className="cursor-pointer flex flex-col items-center gap-1 text-center">
              <span className="text-sm text-[var(--color-charcoal-soft)]">
                Drag and drop or click to upload
              </span>
              <span className="text-xs text-[var(--color-charcoal-label)]">
                PNG, JPG, PDF up to 10MB
              </span>
              <input
                type="file"
                name="attachment"
                accept=".png,.jpg,.jpeg,.pdf"
                className="sr-only"
              />
            </label>
          </div>

          {state?.success === false && (
            <p className="text-red-600 text-sm" role="alert">
              {state.error}
            </p>
          )}
          {state?.success === true && (
            <p className="text-green-700 text-sm" role="status">
              Request submitted successfully.
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="h-[68px] px-12 rounded-full bg-[var(--color-charcoal)] text-white text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] transition-colors shadow-sm"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </SectionContainer>
  );
}
