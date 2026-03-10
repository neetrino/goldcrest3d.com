"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "./AdminLogoutButton";

const NAV_ITEMS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/orders", label: "Orders" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-[var(--background)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-1">
          <Link
            href="/admin/leads"
            className="text-base font-semibold text-[var(--foreground)] no-underline hover:opacity-85"
          >
            Goldcrest Admin
          </Link>
          <nav
            className="ml-6 flex items-center gap-1"
            aria-label="Admin sections"
          >
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/admin" && pathname.startsWith(href + "/"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors " +
                    (isActive
                      ? "bg-neutral-100 text-[var(--foreground)]"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-[var(--foreground)]")
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <AdminLogoutButton />
      </div>
    </header>
  );
}
