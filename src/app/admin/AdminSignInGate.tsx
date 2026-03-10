"use client";

import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ERROR_MESSAGE = "Invalid email or password. Please try again.";

/**
 * Renders the admin sign-in form when there is no session.
 * Shown inside admin layout so /admin and /admin/* never show admin UI before login.
 */
export function AdminSignInGate() {
  const pathname = usePathname();
  const router = useRouter();
  const callbackUrl = pathname && pathname !== "/admin" ? pathname : "/admin/leads";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });
    setIsSubmitting(false);
    if (result?.error) {
      setError(true);
      return;
    }
    if (result?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-xl font-semibold text-center text-[var(--foreground)]">
          Admin sign in
        </h1>
        <p className="text-sm text-center text-neutral-500">
          Enter your credentials to access the admin area.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p
              className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md"
              role="alert"
            >
              {ERROR_MESSAGE}
            </p>
          )}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 bg-[var(--background)] text-[var(--foreground)]"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Password
            </label>
            <input
              id="admin-password"
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
    </div>
  );
}
