"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type MediaFormSubmitButtonProps = {
  /** Visible label when not loading */
  children: ReactNode;
  /** Shown while the form action runs */
  pendingLabel: string;
  className?: string;
};

/**
 * Submit button tied to the parent form’s pending state (server action).
 */
export function MediaFormSubmitButton({
  children,
  pendingLabel,
  className,
}: MediaFormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "inline-flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {pending ? (
        <>
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
          <span>{pendingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
