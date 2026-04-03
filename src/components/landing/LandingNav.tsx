"use client";

import {
  LANDING_SECTION_IDS,
  SITE_HEADER_LOGO_SRC,
  type LandingSectionId,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { LandingNavMobileDrawer } from "@/components/landing/LandingNavMobileDrawer";
import { LandingNavMenuIcon } from "@/components/landing/LandingNavMenuIcon";
import { useLandingNavBodyLock } from "@/components/landing/useLandingNavBodyLock";

const NAV_ITEMS: { id: LandingSectionId; label: string }[] = [
  { id: LANDING_SECTION_IDS.HERO, label: "Home" },
  { id: LANDING_SECTION_IDS.SPECIALIZATIONS, label: "Specializations" },
  { id: LANDING_SECTION_IDS.PHILOSOPHY, label: "Engineering" },
  { id: LANDING_SECTION_IDS.FOUNDER, label: "Founder" },
  { id: LANDING_SECTION_IDS.FOOTER, label: "Contact" },
];

/** Full desktop (xl+, 1280px): Figma offset + աջ (`+136px`). */
const REQUEST_QUOTE_BTN_CLASSES =
  "nav-cta-gradient flex h-[36px] min-h-[36px] shrink-0 items-center justify-center rounded-full py-[8px] text-sm font-bold leading-5 text-white transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 max-xl:max-w-[min(190px,calc(100vw-8rem))] max-xl:translate-x-0 max-xl:px-4 max-xl:mr-2 w-[min(190px,calc(100vw-8rem))] px-[28px] xl:mr-10 xl:w-[190px] xl:max-w-none xl:translate-x-[calc(-14rem+136px)] xl:px-[28px]";

/** Stable DOM id — `useId()` can mismatch SSR vs hydrate when the tree shifts (e.g. after refresh). */
const LANDING_NAV_MOBILE_MENU_DOM_ID = "landing-nav-mobile-menu";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useLandingNavBodyLock(mobileOpen, closeMenu);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 h-[length:var(--landing-nav-height)] w-full max-w-full overflow-x-clip bg-white/97 backdrop-blur-sm md:overflow-visible"
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
            left:
              "calc(var(--landing-nav-padding-x) + var(--landing-nav-logo-offset-x) + var(--landing-nav-logo-nudge-x))",
          }}
          aria-label="Goldcrest 3D — Home"
        >
          <Image
            src={SITE_HEADER_LOGO_SRC}
            alt="Goldcrest 3D"
            width={71}
            height={41}
            sizes="71px"
            priority
            className="max-w-none h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] shrink-0 object-contain object-left"
          />
        </Link>
        <ul
          className="absolute left-[calc(50%-32px)] top-1/2 z-20 hidden min-w-0 -translate-x-1/2 -translate-y-1/2 list-none flex-row items-center justify-center gap-3 md:flex md:h-[18px] md:gap-3 lg:gap-6 xl:gap-[64px]"
          aria-label="Nav links"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} className="flex shrink-0 items-center md:h-[18px]">
              <Link
                href={`#${id}`}
                className="whitespace-nowrap text-[13px] font-medium leading-[18px] text-[#0f172a] no-underline transition hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
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
            aria-controls={LANDING_NAV_MOBILE_MENU_DOM_ID}
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
          menuId={LANDING_NAV_MOBILE_MENU_DOM_ID}
          items={NAV_ITEMS}
          onClose={closeMenu}
        />
      ) : null}
    </nav>
  );
}
