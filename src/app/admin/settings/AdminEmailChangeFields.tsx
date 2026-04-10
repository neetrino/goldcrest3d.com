"use client";

import { useActionState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  updateAdminEmail,
  type UpdateEmailResult,
} from "@/app/actions/admin-credentials";

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

export type AdminEmailChangeFieldsProps = {
  storedEmailNorm: string;
  typedCurrentEmail: string;
  onTypedCurrentEmailChange: (value: string) => void;
  currentEmailVerified: boolean;
  onVerifyCurrentEmail: () => void;
  localVerifyError: string | null;
};

export function AdminEmailChangeFields({
  storedEmailNorm,
  typedCurrentEmail,
  onTypedCurrentEmailChange,
  currentEmailVerified,
  onVerifyCurrentEmail,
  localVerifyError,
}: AdminEmailChangeFieldsProps) {
  const emailInitial: UpdateEmailResult = null;
  const [emailState, emailAction, isEmailPending] = useActionState<
    UpdateEmailResult,
    FormData
  >(updateAdminEmail, emailInitial);

  useEffect(() => {
    if (emailState?.success === true) {
      signOut({ callbackUrl: "/auth/signin?updated=email" });
    }
  }, [emailState?.success]);

  const serverRejectedCurrent =
    emailState?.success === false &&
    emailState.clearCurrentVerification === true;
  const showNewEmailStep = currentEmailVerified && !serverRejectedCurrent;

  return (
    <form
      action={emailAction}
      className="mt-4 space-y-6"
      onSubmit={(e) => {
        if (!showNewEmailStep) {
          e.preventDefault();
        }
      }}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          Step 1 — Confirm current email
        </h3>
        <div>
          <label
            htmlFor="settings-currentEmail"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Current email
          </label>
          <p className="mt-0.5 text-sm text-neutral-500">
            Enter the email address you currently use to sign in, then verify
            it.
          </p>
          <input
            id="settings-currentEmail"
            name="currentEmail"
            type="email"
            autoComplete="username"
            required
            value={typedCurrentEmail}
            onChange={(e) => onTypedCurrentEmailChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onVerifyCurrentEmail();
              }
            }}
            disabled={isEmailPending}
            className={inputClass}
            placeholder=""
            aria-invalid={Boolean(localVerifyError)}
            aria-describedby={
              localVerifyError ? "email-verify-error" : undefined
            }
          />
          {localVerifyError && (
            <p
              id="email-verify-error"
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {localVerifyError}
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={isEmailPending || !storedEmailNorm}
          onClick={onVerifyCurrentEmail}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-opacity hover:bg-slate-50 disabled:opacity-50"
        >
          Verify current email
        </button>
      </div>

      {showNewEmailStep && (
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-700">
            Step 2 — New login email
          </h3>
          <div>
            <label
              htmlFor="settings-newEmail"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              New email
            </label>
            <input
              id="settings-newEmail"
              name="newEmail"
              type="email"
              autoComplete="email"
              required
              disabled={isEmailPending}
              className={inputClass}
              placeholder=""
              aria-describedby={
                emailState?.success === false ? "email-error" : undefined
              }
            />
            {emailState?.success === false && (
              <p
                id="email-error"
                className="mt-1.5 text-sm text-red-600"
                role="alert"
              >
                {emailState.error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isEmailPending}
            className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isEmailPending ? "Saving…" : "Save email"}
          </button>
        </div>
      )}
    </form>
  );
}
