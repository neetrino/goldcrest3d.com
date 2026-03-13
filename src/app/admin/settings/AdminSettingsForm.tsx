"use client";

import { useActionState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  updateAdminEmail,
  updateAdminPassword,
  type UpdateEmailResult,
  type UpdatePasswordResult,
} from "@/app/actions/admin-credentials";

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

type AdminSettingsFormProps = {
  currentEmail: string;
};

export function AdminSettingsForm({ currentEmail }: AdminSettingsFormProps) {
  const emailInitial: UpdateEmailResult = null;
  const [emailState, emailAction, isEmailPending] = useActionState<
    UpdateEmailResult,
    FormData
  >(updateAdminEmail, emailInitial);

  const passwordInitial: UpdatePasswordResult = null;
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    UpdatePasswordResult,
    FormData
  >(updateAdminPassword, passwordInitial);

  useEffect(() => {
    if (emailState?.success === true) {
      signOut({ callbackUrl: "/auth/signin?updated=email" });
    }
  }, [emailState?.success]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-slate-700">
          Current login
        </h2>
        <p
          className="mt-1 text-[var(--foreground)]"
          data-testid="settings-current-email"
        >
          {currentEmail || "—"}
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Change login (email)
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          After changing your email, you will need to sign in again with the new
          address.
        </p>
        <form action={emailAction} className="mt-4 space-y-4">
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
              placeholder={currentEmail || "admin@example.com"}
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
        </form>
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
