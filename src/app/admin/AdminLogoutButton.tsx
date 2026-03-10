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
      className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:underline underline-offset-4"
    >
      {LOGOUT_LABEL}
    </button>
  );
}
