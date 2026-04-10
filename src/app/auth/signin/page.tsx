"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const CREDENTIALS_ERROR = "CredentialsSignin";

const ERROR_MESSAGE = "Invalid login or password. Please try again.";

function AuthSignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const errorParam = searchParams.get("error");
  const updatedParam = searchParams.get("updated");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showError = errorParam === CREDENTIALS_ERROR;
  const showLoginUpdated =
    updatedParam === "login" || updatedParam === "email";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: true,
    });
    setIsSubmitting(false);
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <h1 className="text-xl font-semibold text-center text-[var(--foreground)]">
        Admin sign in
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showLoginUpdated && (
          <p
            className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-md"
            role="status"
          >
            Login updated. Please sign in with your new login.
          </p>
        )}
        {showError && (
          <p
            className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md"
            role="alert"
          >
            {ERROR_MESSAGE}
          </p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Login
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 bg-[var(--background)] text-[var(--foreground)]"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 bg-[var(--background)] text-[var(--foreground)]"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 rounded-md bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/**
 * Admin sign-in page. Shows a safe error message on failed credentials.
 * Proxy redirects unauthenticated /admin requests here with callbackUrl.
 */
export default function AuthSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <Suspense fallback={<div className="text-[var(--foreground)]">Loading…</div>}>
        <AuthSignInForm />
      </Suspense>
    </div>
  );
}
