"use client";

import { SITE_HEADER_LOGO_SRC } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { ComponentType } from "react";
const ICON_SETTINGS =
  "https://www.figma.com/api/mcp/asset/7bd8c9ae-ad6d-4832-a03d-2ef7770b20de";

/** Inbox — incoming messages / leads (15×15), stroke style matches nav. */
function IconNavInbox({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

/** Orders — package / fulfillment. */
function IconNavOrders({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

/** Reports — simple bar chart / analytics. */
function IconNavReports({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

/** Log out icon — box with arrow right (15×15), matches sidebar icon style. */
function IconLogout({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const NAV_ITEMS: readonly {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  showBadge: boolean;
}[] = [
  { href: "/admin/leads", label: "Inbox/Leads", Icon: IconNavInbox, showBadge: true },
  { href: "/admin/orders", label: "Orders", Icon: IconNavOrders, showBadge: false },
  { href: "/admin/reports", label: "Reports", Icon: IconNavReports, showBadge: false },
];

type AdminSidebarProps = {
  leadsCount: number;
  userName: string | null;
  userImage: string | null;
  /** For mobile drawer: closes the drawer after navigation. */
  onNavigate?: () => void;
  /** Mobile drawer open state; desktop layout ignores this. */
  mobileNavOpen?: boolean;
  id?: string;
};

/**
 * Admin sidebar per Figma: logo, nav (Inbox/Leads with badge, Orders, Reports), user block.
 */
export function AdminSidebar({
  leadsCount,
  userName,
  userImage,
  onNavigate,
  mobileNavOpen = false,
  id,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id={id}
      className={
        "flex min-h-screen w-[256px] shrink-0 flex-col border-r border-slate-200 bg-white " +
        "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out " +
        (mobileNavOpen ? "translate-x-0 " : "-translate-x-full ") +
        "lg:relative lg:inset-auto lg:z-auto lg:translate-x-0"
      }
    >
      <div className="flex flex-1 flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="relative h-[26px] w-11 shrink-0">
              <Image
                src={SITE_HEADER_LOGO_SRC}
                alt="Goldcrest 3D"
                width={71}
                height={41}
                sizes="44px"
                className="h-full w-full object-contain object-left"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-[14px] leading-5 tracking-[-0.35px]">
                Goldcrest
              </span>
              <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider">
                Engineering Admin
              </span>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-4" aria-label="Admin sections">
          {NAV_ITEMS.map(({ href, label, Icon, showBadge }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => onNavigate?.()}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-amber-500/10 text-[var(--foreground)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--foreground)]"
                }`}
              >
                <Icon className="h-[15px] w-[15px] shrink-0" aria-hidden />
                <span className="flex-1">{label}</span>
                {showBadge && leadsCount > 0 && (
                  <span className="rounded-full bg-[var(--foreground)] px-1.5 py-0.5 text-[10px] font-medium text-white min-w-[10px] text-center">
                    {leadsCount > 99 ? "99+" : leadsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto shrink-0 border-t border-slate-200 px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-200">
            {userImage ? (
              <Image
                src={userImage}
                alt=""
                width={32}
                height={32}
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-600">
                {(userName ?? "A").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-slate-900 text-[12px] leading-4">
              {userName ?? "Admin"}
            </p>
            <p className="truncate text-[10px] text-slate-500 leading-[15px]">
              Senior Admin
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/admin/settings"
              onClick={() => onNavigate?.()}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Settings"
            >
              <Image
                src={ICON_SETTINGS}
                alt=""
                width={15}
                height={15}
                unoptimized
              />
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin" })}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Log out"
            >
              <IconLogout className="h-[15px] w-[15px]" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
