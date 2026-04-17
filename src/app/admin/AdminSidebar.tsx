"use client";

import { SITE_HEADER_LOGO_SRC } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { ComponentType } from "react";

/** Pixel size for nav icons (must match Tailwind size on `<Icon />`). */
const ADMIN_NAV_ITEM_ICON_SIZE_PX = 18;

/** Inbox â€” incoming messages / leads, stroke style matches nav. */
function IconNavInbox({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      height={ADMIN_NAV_ITEM_ICON_SIZE_PX}
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

/** Orders â€” package / fulfillment. */
function IconNavOrders({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      height={ADMIN_NAV_ITEM_ICON_SIZE_PX}
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

/** Media â€” image / gallery. */
function IconNavMedia({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      height={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

/** Settings â€” gear (footer link next to logout). */
function IconNavSettings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      height={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Log out icon â€” box with arrow right (15Ã—15), matches sidebar icon style. */
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

/** Unread badge: show "99+" above this count. */
const INBOX_UNREAD_BADGE_CAP = 99;

function formatUnreadBadgeLabel(n: number): string {
  return n > INBOX_UNREAD_BADGE_CAP ? "99+" : String(n);
}

/** Layout / CMS — stacked layers icon */
function IconNavManager({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      height={ADMIN_NAV_ITEM_ICON_SIZE_PX}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
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
  { href: "/admin/media", label: "Media Manager", Icon: IconNavMedia, showBadge: false },
  { href: "/admin/manager2", label: "Admin Manager2", Icon: IconNavManager, showBadge: false },
];

type AdminSidebarProps = {
  leadsUnreadCount: number;
  userName: string | null;
  userImage: string | null;
  /** For mobile drawer: closes the drawer after navigation. */
  onNavigate?: () => void;
  /** Mobile drawer open state; desktop layout ignores this. */
  mobileNavOpen?: boolean;
  id?: string;
};

/**
 * Admin sidebar per Figma: logo, nav (Inbox/Leads, Orders, Media), user block (settings icon + logout).
 */
export function AdminSidebar({
  leadsUnreadCount,
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
        "fixed inset-y-0 left-0 z-50 flex h-screen w-[256px] shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white " +
        "transition-transform duration-200 ease-out " +
        (mobileNavOpen ? "translate-x-0 " : "-translate-x-full ") +
        "lg:translate-x-0"
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
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
        <nav
          className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-4 pb-4"
          aria-label="Admin sections"
        >
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
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span className="min-w-0 flex-1">{label}</span>
                {showBadge && leadsUnreadCount > 0 && (
                  <span
                    className="rounded-full bg-[var(--foreground)] px-1.5 py-0.5 text-center text-[10px] font-medium text-white min-w-[1.25rem]"
                    title="Unread leads â€” open inbox to review"
                    aria-label={`${leadsUnreadCount} unread leads`}
                  >
                    {formatUnreadBadgeLabel(leadsUnreadCount)}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="shrink-0 border-t border-slate-200 px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-200">
            {userImage ? (
              <Image
                src={userImage}
                alt=""
                width={32}
                height={32}
                className="object-cover"
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
              <IconNavSettings className="h-[15px] w-[15px] shrink-0" />
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
