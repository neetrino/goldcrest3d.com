"use client";

import { SITE_HEADER_LOGO_SRC } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

function IconMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

type AdminLayoutShellProps = {
  leadsUnreadCount: number;
  userName: string | null;
  userImage: string | null;
  children: React.ReactNode;
};

/**
 * Responsive admin chrome: desktop keeps sidebar in flow; mobile uses overlay drawer + top bar.
 */
export function AdminLayoutShell({
  leadsUnreadCount,
  userName,
  userImage,
  children,
}: AdminLayoutShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  const closeNav = () => setMobileNavOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f6] text-[var(--foreground)] lg:flex-row">
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          aria-expanded={mobileNavOpen}
          aria-controls="admin-sidebar"
          aria-label="Open navigation menu"
        >
          <IconMenu className="h-6 w-6" />
        </button>
        <div className="flex min-w-0 items-center gap-3">
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
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-bold text-slate-900 text-[14px] leading-5 tracking-[-0.35px]">
              Goldcrest
            </span>
            <span className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider">
              Admin
            </span>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={closeNav}
        />
      )}

      <AdminSidebar
        id="admin-sidebar"
        leadsUnreadCount={leadsUnreadCount}
        userName={userName}
        userImage={userImage}
        onNavigate={closeNav}
        mobileNavOpen={mobileNavOpen}
      />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto lg:overflow-hidden">
        {children}
      </main>
    </div>
  );
}
