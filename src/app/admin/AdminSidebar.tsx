"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const SIDEBAR_LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/9e9a440f-112c-4732-9efd-d56a2f3e2331";
const ICON_INBOX =
  "https://www.figma.com/api/mcp/asset/85cabe9a-efa4-4eeb-886e-e96cf013d8ef";
const ICON_ORDERS =
  "https://www.figma.com/api/mcp/asset/e8f4af8f-4d8a-4aa0-a553-99004bdd822d";
const ICON_REPORTS =
  "https://www.figma.com/api/mcp/asset/30cc1acf-8ad7-4be6-b5df-50e1701e5cfb";
const ICON_SETTINGS =
  "https://www.figma.com/api/mcp/asset/7bd8c9ae-ad6d-4832-a03d-2ef7770b20de";

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

const NAV_ITEMS = [
  { href: "/admin/leads", label: "Inbox/Leads", icon: ICON_INBOX, showBadge: true },
  { href: "/admin/orders", label: "Orders", icon: ICON_ORDERS, showBadge: false },
  { href: "/admin/reports", label: "Reports", icon: ICON_REPORTS, showBadge: false },
] as const;

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
                src={SIDEBAR_LOGO_SRC}
                alt=""
                width={44}
                height={26}
                className="object-contain"
                unoptimized
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
          {NAV_ITEMS.map(({ href, label, icon, showBadge }) => {
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
                <span className="relative h-[15px] w-[15px] shrink-0">
                  <Image
                    src={icon}
                    alt=""
                    width={15}
                    height={15}
                    className="object-contain"
                    unoptimized
                  />
                </span>
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
