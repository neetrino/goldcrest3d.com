"use client";

import { useActionState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  updateAdminLogin,
  type UpdateLoginResult,
} from "@/app/actions/admin-credentials";

const inputClass =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

export type AdminEmailChangeFieldsProps = {
  storedLogin: string;
  typedCurrentLogin: string;
  onTypedCurrentLoginChange: (value: string) => void;
  currentLoginVerified: boolean;
  onVerifyCurrentLogin: () => void;
  localVerifyError: string | null;
};

export function AdminEmailChangeFields({
  storedLogin,
  typedCurrentLogin,
  onTypedCurrentLoginChange,
  currentLoginVerified,
  onVerifyCurrentLogin,
  localVerifyError,
}: AdminEmailChangeFieldsProps) {
  const loginInitial: UpdateLoginResult = null;
  const [loginState, loginAction, isLoginPending] = useActionState<
    UpdateLoginResult,
    FormData
  >(updateAdminLogin, loginInitial);

  useEffect(() => {
    if (loginState?.success === true) {
      signOut({ callbackUrl: "/auth/signin?updated=login" });
    }
  }, [loginState?.success]);

  const serverRejectedCurrent =
    loginState?.success === false &&
    loginState.clearCurrentVerification === true;
  const showNewLoginStep = currentLoginVerified && !serverRejectedCurrent;

  return (
    <form
      action={loginAction}
      className="mt-4 space-y-6"
      onSubmit={(e) => {
        if (!showNewLoginStep) {
          e.preventDefault();
        }
      }}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          Step 1 — Confirm current login
        </h3>
        <div>
          <label
            htmlFor="settings-currentLogin"
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Current login
          </label>
          <p className="mt-0.5 text-sm text-neutral-500">
            Enter the login you currently use to sign in, then verify it.
          </p>
          <input
            id="settings-currentLogin"
            name="currentLogin"
            type="text"
            autoComplete="username"
            required
            value={typedCurrentLogin}
            onChange={(e) => onTypedCurrentLoginChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onVerifyCurrentLogin();
              }
            }}
            disabled={isLoginPending}
            className={inputClass}
            placeholder=""
            aria-invalid={Boolean(localVerifyError)}
            aria-describedby={
              localVerifyError ? "login-verify-error" : undefined
            }
          />
          {localVerifyError && (
            <p
              id="login-verify-error"
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {localVerifyError}
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={isLoginPending || !storedLogin}
          onClick={onVerifyCurrentLogin}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-opacity hover:bg-slate-50 disabled:opacity-50"
        >
          Verify current login
        </button>
      </div>

      {showNewLoginStep && (
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-700">
            Step 2 — New login
          </h3>
          <div>
            <label
              htmlFor="settings-newLogin"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              New login
            </label>
            <input
              id="settings-newLogin"
              name="newLogin"
              type="text"
              autoComplete="username"
              required
              disabled={isLoginPending}
              className={inputClass}
              placeholder=""
              aria-describedby={
                loginState?.success === false ? "login-error" : undefined
              }
            />
            {loginState?.success === false && (
              <p
                id="login-error"
                className="mt-1.5 text-sm text-red-600"
                role="alert"
              >
                {loginState.error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoginPending}
            className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoginPending ? "Saving…" : "Save login"}
          </button>
        </div>
      )}
    </form>
  );
}
