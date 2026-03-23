"use client";

import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { LandingNavMobileDrawer } from "@/components/landing/LandingNavMobileDrawer";
import { LandingNavMenuIcon } from "@/components/landing/LandingNavMenuIcon";
import { useLandingNavBodyLock } from "@/components/landing/useLandingNavBodyLock";

/** Gold bird mark; background removed (see scripts/process-header-logo.mjs). */
const LOGO_SRC = "/images/header-logo.png";

const NAV_ITEMS: { id: LandingSectionId; label: string }[] = [
  { id: LANDING_SECTION_IDS.HERO, label: "Home" },
  { id: LANDING_SECTION_IDS.SPECIALIZATIONS, label: "Specializations" },
  { id: LANDING_SECTION_IDS.PHILOSOPHY, label: "Engineering" },
  { id: LANDING_SECTION_IDS.FOUNDER, label: "Founder" },
  { id: LANDING_SECTION_IDS.FOOTER, label: "Contact" },
];

/** Full desktop (xl+, 1280px): նույն Figma offset-ը ինչ նախկինում `mr-10 -translate-x-56`. */
const REQUEST_QUOTE_BTN_CLASSES =
  "nav-cta-gradient flex h-[36px] min-h-[36px] shrink-0 items-center justify-center rounded-full py-[8px] text-sm font-bold leading-5 text-white transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 max-xl:max-w-[min(190px,calc(100vw-8rem))] max-xl:translate-x-0 max-xl:px-4 max-xl:mr-2 w-[min(190px,calc(100vw-8rem))] px-[28px] xl:mr-10 xl:w-[190px] xl:max-w-none xl:-translate-x-56 xl:px-[28px]";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useLandingNavBodyLock(mobileOpen, closeMenu);

  return (
    <nav
      className="sticky top-0 z-50 h-[length:var(--landing-nav-height)] w-full max-w-full overflow-x-clip bg-white/95 backdrop-blur-[6px] md:overflow-visible"
      aria-label="Main navigation"
    >
      <div className="relative flex h-full w-full min-w-0 max-w-full items-center justify-between overflow-x-clip px-[length:var(--landing-nav-padding-x)] md:overflow-visible">
        <div
          className="relative shrink-0"
          style={{ width: "var(--landing-nav-logo-slot)" }}
          aria-hidden={true}
        />
        <Link
          href={`#${LANDING_SECTION_IDS.HERO}`}
          className="absolute top-1/2 z-10 flex h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] min-h-[length:var(--landing-nav-logo-height)] min-w-[length:var(--landing-nav-logo-width)] shrink-0 -translate-y-1/2 items-center"
          style={{
            left: "calc(var(--landing-nav-padding-x) + var(--landing-nav-logo-offset-x))",
          }}
          aria-label="Goldcrest 3D — Home"
        >
          <Image
            src={LOGO_SRC}
            alt="Goldcrest 3D"
            width={71}
            height={41}
            sizes="71px"
            priority
            className="max-w-none h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] shrink-0 object-contain object-left"
          />
        </Link>
        <ul
          className="hidden min-w-0 list-none flex-1 items-start justify-end gap-3 md:flex md:h-5 md:max-w-[711px] md:gap-4 md:pr-1 lg:gap-8 lg:pr-2 xl:gap-[80px] xl:pr-0"
          aria-label="Nav links"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} className="flex shrink-0 items-center md:h-5">
              <Link
                href={`#${id}`}
                className="whitespace-nowrap text-[14px] font-medium leading-5 text-[#0f172a] no-underline transition hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#0f172a] transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <LandingNavMenuIcon open={mobileOpen} />
          </button>
          <Link
            id="landing-nav-request-quote"
            href={`#${LANDING_SECTION_IDS.QUOTE}`}
            className={REQUEST_QUOTE_BTN_CLASSES}
            aria-label="Request a Quote"
          >
            Request a Quote
          </Link>
        </div>
      </div>
      {mobileOpen ? (
        <LandingNavMobileDrawer
          menuId={menuId}
          items={NAV_ITEMS}
          onClose={closeMenu}
        />
      ) : null}
    </nav>
  );
}
