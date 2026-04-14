"use client";

import type { MutableRefObject, ReactNode } from "react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

type MediaFormSubmitButtonProps = {
  /** Visible label when not loading */
  children: ReactNode;
  /** Shown while the form action runs */
  pendingLabel: string;
  className?: string;
  /** Tailwind classes for the pending spinner ring (default: light ring on dark buttons). */
  pendingSpinnerClassName?: string;
  /**
   * When multiple submit buttons share one form, pass a shared ref and a unique id per button so only
   * the pressed control shows loading (`useFormStatus` is otherwise true for all descendants).
   */
  submitIntentId?: string;
  activeSubmitIntentRef?: MutableRefObject<string | null>;
};

/**
 * Submit button tied to the parent form’s pending state (server action).
 */
const DEFAULT_PENDING_SPINNER_CLASS =
  "border-white/30 border-t-white";

export function MediaFormSubmitButton({
  children,
  pendingLabel,
  className,
  pendingSpinnerClassName = DEFAULT_PENDING_SPINNER_CLASS,
  submitIntentId,
  activeSubmitIntentRef,
}: MediaFormSubmitButtonProps) {
  const { pending } = useFormStatus();

  const useIntent =
    activeSubmitIntentRef != null && submitIntentId != null && submitIntentId.length > 0;

  useEffect(() => {
    if (!pending && useIntent && activeSubmitIntentRef) {
      activeSubmitIntentRef.current = null;
    }
  }, [pending, useIntent, activeSubmitIntentRef]);

  const intent = activeSubmitIntentRef?.current ?? null;
  const isThisButtonPending =
    pending &&
    (!useIntent ||
      intent === null ||
      intent === submitIntentId);

  return (
    <button
      type="submit"
      disabled={pending}
      onPointerDown={() => {
        if (useIntent) {
          activeSubmitIntentRef.current = submitIntentId;
        }
      }}
      className={
        className ??
        "inline-flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {isThisButtonPending ? (
        <>
          <span
            className={`size-4 shrink-0 animate-spin rounded-full border-2 ${pendingSpinnerClassName}`}
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
