"use client";

import type { LandingSectionId } from "@/constants";
import Link from "next/link";
import { createPortal } from "react-dom";

export type LandingNavMobileItem = { id: LandingSectionId; label: string };

type LandingNavMobileDrawerProps = {
  menuId: string;
  items: LandingNavMobileItem[];
  sectionHrefPrefix: "#" | "/#";
  onClose: () => void;
};

/** Above `LandingNav` (`z-50`) and page overlays; portal avoids `backdrop-filter` / overflow clipping on the nav. */
const Z_INDEX_MOBILE_NAV_BACKDROP = 100;
const Z_INDEX_MOBILE_NAV_DRAWER = 101;

export function LandingNavMobileDrawer({
  menuId,
  items,
  sectionHrefPrefix,
  onClose,
}: LandingNavMobileDrawerProps) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 cursor-default bg-black/20 lg:hidden"
        style={{ zIndex: Z_INDEX_MOBILE_NAV_BACKDROP }}
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        id={menuId}
        className="fixed inset-x-0 border-b border-black/10 bg-white/98 py-4 shadow-md lg:hidden"
        style={{
          zIndex: Z_INDEX_MOBILE_NAV_DRAWER,
          top: "var(--landing-nav-height)",
        }}
        role="dialog"
        aria-modal={true}
        aria-label="Site sections"
      >
        <ul className="mx-auto flex max-w-lg list-none flex-col gap-1 px-[length:var(--landing-nav-padding-x)]">
          {items.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={`${sectionHrefPrefix}${id}`}
                className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#0f172a] no-underline transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
                onClick={onClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>,
    document.body,
  );
}
