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
  const callbackUrl = pathname && pathname !== "/admin" ? pathname : "/admin";
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
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Enter your credentials to access the admin area.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <p
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
              role="alert"
            >
              {ERROR_MESSAGE}
            </p>
          )}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-[var(--foreground)]"
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
              className="mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-[var(--foreground)]"
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
              className="mt-1.5 w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[var(--foreground)] px-4 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
