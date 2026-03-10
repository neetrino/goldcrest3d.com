"use client";

import { signOut } from "next-auth/react";

const LOGOUT_LABEL = "Log out";

/**
 * Logout button for Admin header. Signs out and redirects to /admin (sign-in form).
 */
export function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className="rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-neutral-100"
    >
      {LOGOUT_LABEL}
    </button>
  );
}
