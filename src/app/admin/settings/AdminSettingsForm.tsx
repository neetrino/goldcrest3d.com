"use client";

import { useActionState, useState } from "react";
import {
  updateAdminPassword,
  type UpdatePasswordResult,
} from "@/app/actions/admin-credentials";
import { AdminEmailChangeFields } from "./AdminEmailChangeFields";
import { PasswordInputWithToggle } from "./PasswordInputWithToggle";

function normalizeLogin(value: string): string {
  return value.trim();
}

type AdminSettingsFormProps = {
  currentLogin: string;
};

export function AdminSettingsForm({ currentLogin }: AdminSettingsFormProps) {
  const storedLogin = normalizeLogin(currentLogin);
  const [loginFieldsKey, setLoginFieldsKey] = useState(0);
  const [currentLoginVerified, setCurrentLoginVerified] = useState(false);
  const [typedCurrentLogin, setTypedCurrentLogin] = useState("");
  const [localVerifyError, setLocalVerifyError] = useState<string | null>(null);

  const passwordInitial: UpdatePasswordResult = null;
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    UpdatePasswordResult,
    FormData
  >(updateAdminPassword, passwordInitial);

  function handleVerifyCurrentLogin(): void {
    setLocalVerifyError(null);
    if (!storedLogin) {
      setLocalVerifyError(
        "No login is set on this account. Contact support before changing login.",
      );
      setCurrentLoginVerified(false);
      return;
    }
    const typed = normalizeLogin(typedCurrentLogin);
    if (!typed) {
      setLocalVerifyError("Enter your current login.");
      setCurrentLoginVerified(false);
      return;
    }
    if (typed !== storedLogin) {
      setLocalVerifyError(
        "The current login does not match your account. Enter the exact value you use to sign in.",
      );
      setCurrentLoginVerified(false);
      return;
    }
    setCurrentLoginVerified(true);
    setLoginFieldsKey((k) => k + 1);
  }

  function handleCurrentLoginChange(value: string): void {
    setTypedCurrentLogin(value);
    setLocalVerifyError(null);
    if (currentLoginVerified) {
      setCurrentLoginVerified(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Change login
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          First confirm your current login, then enter your new one. After a
          successful change, you will need to sign in again.
        </p>
        <AdminEmailChangeFields
          key={loginFieldsKey}
          storedLogin={storedLogin}
          typedCurrentLogin={typedCurrentLogin}
          onTypedCurrentLoginChange={handleCurrentLoginChange}
          currentLoginVerified={currentLoginVerified}
          onVerifyCurrentLogin={handleVerifyCurrentLogin}
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
        <form
          action={passwordAction}
          className="mt-4 space-y-4"
          autoComplete="off"
        >
          <PasswordInputWithToggle
            id="settings-currentPassword"
            name="currentPassword"
            label="Current password"
            autoComplete="off"
            readOnlyUntilFocused
            disabled={isPasswordPending}
            ariaDescribedBy={
              passwordState?.success === false ? "password-error" : undefined
            }
          />
          <PasswordInputWithToggle
            id="settings-newPassword"
            name="newPassword"
            label="New password"
            autoComplete="new-password"
            minLength={8}
            disabled={isPasswordPending}
          />
          <PasswordInputWithToggle
            id="settings-confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm new password"
            autoComplete="new-password"
            minLength={8}
            disabled={isPasswordPending}
          />
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
