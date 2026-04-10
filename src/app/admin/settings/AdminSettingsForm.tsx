"use client";

import { useActionState, useState } from "react";
import {
  updateAdminPassword,
  type UpdatePasswordResult,
} from "@/app/actions/admin-credentials";
import { AdminEmailChangeFields } from "./AdminEmailChangeFields";

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

type AdminSettingsFormProps = {
  currentEmail: string;
};

export function AdminSettingsForm({ currentEmail }: AdminSettingsFormProps) {
  const storedEmailNorm = normalizeEmail(currentEmail);
  const [emailFieldsKey, setEmailFieldsKey] = useState(0);
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);
  const [typedCurrentEmail, setTypedCurrentEmail] = useState("");
  const [localVerifyError, setLocalVerifyError] = useState<string | null>(null);

  const passwordInitial: UpdatePasswordResult = null;
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    UpdatePasswordResult,
    FormData
  >(updateAdminPassword, passwordInitial);

  function handleVerifyCurrentEmail(): void {
    setLocalVerifyError(null);
    if (!storedEmailNorm) {
      setLocalVerifyError(
        "No login email is set on this account. Contact support before changing login.",
      );
      setCurrentEmailVerified(false);
      return;
    }
    const typed = normalizeEmail(typedCurrentEmail);
    if (!typed) {
      setLocalVerifyError("Enter your current email address.");
      setCurrentEmailVerified(false);
      return;
    }
    if (typed !== storedEmailNorm) {
      setLocalVerifyError(
        "The current email does not match your account. Enter the exact address you use to sign in.",
      );
      setCurrentEmailVerified(false);
      return;
    }
    setCurrentEmailVerified(true);
    setEmailFieldsKey((k) => k + 1);
  }

  function handleCurrentEmailChange(value: string): void {
    setTypedCurrentEmail(value);
    setLocalVerifyError(null);
    if (currentEmailVerified) {
      setCurrentEmailVerified(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Change login (email)
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          First confirm your current login email, then enter your new address.
          After a successful change, you will need to sign in again with the new
          email.
        </p>
        <AdminEmailChangeFields
          key={emailFieldsKey}
          storedEmailNorm={storedEmailNorm}
          typedCurrentEmail={typedCurrentEmail}
          onTypedCurrentEmailChange={handleCurrentEmailChange}
          currentEmailVerified={currentEmailVerified}
          onVerifyCurrentEmail={handleVerifyCurrentEmail}
          localVerifyError={localVerifyError}
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Change password
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Enter your current password, then choose a new password (at least 8
          characters).
        </p>
        <form action={passwordAction} className="mt-4 space-y-4">
          {/* Associates the form with the account for password managers / a11y (Chrome DOM hint). */}
          <input
            type="email"
            name="username"
            autoComplete="username"
            defaultValue={currentEmail}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          />
          <div>
            <label
              htmlFor="settings-currentPassword"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Current password
            </label>
            <input
              id="settings-currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPasswordPending}
              className={inputClass}
              aria-describedby={
                passwordState?.success === false ? "password-error" : undefined
              }
            />
          </div>
          <div>
            <label
              htmlFor="settings-newPassword"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              New password
            </label>
            <input
              id="settings-newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isPasswordPending}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="settings-confirmNewPassword"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Confirm new password
            </label>
            <input
              id="settings-confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isPasswordPending}
              className={inputClass}
            />
          </div>
          {passwordState?.success === false && (
            <p
              id="password-error"
              className="text-sm text-red-600"
              role="alert"
            >
              {passwordState.error}
            </p>
          )}
          {passwordState?.success === true && (
            <p className="text-sm text-green-600" role="status">
              Password updated successfully.
            </p>
          )}
          <button
            type="submit"
            disabled={isPasswordPending}
            className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPasswordPending ? "Saving…" : "Save password"}
          </button>
        </form>
      </section>
    </div>
  );
}
