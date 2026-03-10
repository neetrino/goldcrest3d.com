"use client";

import { useActionState } from "react";
import { signInAction, type SignInResult } from "@/app/actions/auth";

const initialState: SignInResult = {};

export function SigninForm({ callbackUrl = "/admin/leads" }: { callbackUrl?: string }) {
  const [state, formAction] = useActionState<SignInResult, FormData>(
    signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}
      <div>
        <label
          htmlFor="login"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          Email or username
        </label>
        <input
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
      >
        Sign in
      </button>
    </form>
  );
}
