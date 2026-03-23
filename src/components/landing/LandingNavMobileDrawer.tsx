"use client";

import type { LandingSectionId } from "@/constants";
import Link from "next/link";

export type LandingNavMobileItem = { id: LandingSectionId; label: string };

type LandingNavMobileDrawerProps = {
  menuId: string;
  items: LandingNavMobileItem[];
  onClose: () => void;
};

export function LandingNavMobileDrawer({
  menuId,
  items,
  onClose,
}: LandingNavMobileDrawerProps) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[35] cursor-default bg-black/20 md:hidden"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        id={menuId}
        className="fixed inset-x-0 top-[length:var(--landing-nav-height)] z-40 border-b border-black/10 bg-white/98 py-4 shadow-md md:hidden"
        role="dialog"
        aria-modal={true}
        aria-label="Site sections"
      >
        <ul className="mx-auto flex max-w-lg list-none flex-col gap-1 px-[length:var(--landing-nav-padding-x)]">
          {items.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className="block rounded-lg px-3 py-3 text-base font-medium text-[#0f172a] no-underline transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
                onClick={onClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
