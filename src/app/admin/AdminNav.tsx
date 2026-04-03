"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "./AdminLogoutButton";

const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/ce31ef4f-5914-417c-9ba4-4c47b79e2bff";

const NAV_ITEMS = [
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/orders", label: "Orders" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 h-[70px] border-b border-neutral-200 bg-[var(--background)]">
      <div className="flex h-full w-full items-center justify-between pl-[51px] pr-[51px]">
        <div className="flex items-center gap-1">
          <Link
            href="/admin/leads"
            className="flex shrink-0 items-center no-underline hover:opacity-85"
            aria-label="Goldcrest Admin â€” home"
          >
            <Image
              src={LOGO_SRC}
              alt="Goldcrest Admin"
              width={83}
              height={48}
              sizes="100vw"
              className="relative h-12 w-[83px] max-h-full max-w-full overflow-hidden object-cover"
              priority
            />
          </Link>
          <nav
            className="ml-6 flex items-center gap-1"
            aria-label="Admin sections"
          >
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
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
