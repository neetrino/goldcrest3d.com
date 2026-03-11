"use client";

import { useActionState } from "react";
import { submitQuote } from "@/app/actions/quote";

/** Must match the field name used in submitQuote (server). */
const QUOTE_ATTACHMENT_FIELD_NAME = "attachment";
import type { QuoteSubmitResult } from "@/app/actions/quote";

const initialState: QuoteSubmitResult = null;

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState<
    QuoteSubmitResult,
    FormData
  >(submitQuote, initialState);

  return (
    <form
      action={formAction}
      className="mt-6 max-w-xl space-y-4"
      aria-describedby={
        state?.success === false ? "quote-error" : state?.success ? "quote-success" : undefined
      }
    >
      <div>
        <label htmlFor="quote-fullName" className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Full name
        </label>
        <input
          id="quote-fullName"
          name="fullName"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          disabled={isPending}
          className="w-full rounded border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--foreground)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/30 disabled:opacity-60"
          placeholder="e.g. John Smith"
        />
      </div>

      <div>
        <label htmlFor="quote-email" className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Email
        </label>
        <input
          id="quote-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isPending}
          className="w-full rounded border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--foreground)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/30 disabled:opacity-60"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="quote-message" className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Message
        </label>
        <textarea
          id="quote-message"
          name="message"
          required
          maxLength={5000}
          rows={4}
          disabled={isPending}
          className="w-full resize-y rounded border border-[var(--foreground)]/20 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--foreground)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/30 disabled:opacity-60"
          placeholder="Describe your project or question..."
        />
      </div>

      <div>
        <label htmlFor="quote-attachment" className="mb-1 block text-sm font-medium text-[var(--foreground)]/80">
          Attach image/file (optional)
        </label>
        <input
          id="quote-attachment"
          name={QUOTE_ATTACHMENT_FIELD_NAME}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          disabled={isPending}
          className="w-full text-sm text-[var(--foreground)]/80 file:mr-2 file:rounded file:border file:border-[var(--foreground)]/20 file:bg-[var(--foreground)]/5 file:px-3 file:py-1.5 file:text-sm file:text-[var(--foreground)]"
        />
        <p className="mt-1 text-xs text-[var(--foreground)]/60">
          JPEG, PNG, WebP, GIF or PDF, max 10 MB
        </p>
      </div>

      {state?.success === false && (
        <p id="quote-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      )}
      {state?.success === true && (
        <p id="quote-success" className="text-sm text-green-600 dark:text-green-400" role="status">
          Request sent. We will get back to you.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Submit Request"}
      </button>
    </form>
  );
}
