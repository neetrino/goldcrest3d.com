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

/** Compact on small screens, fixed width on desktop to avoid collisions. */
const REQUEST_QUOTE_BTN_CLASSES =
  "nav-cta-gradient inline-flex h-[36px] min-h-[36px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 text-[12px] font-bold leading-5 text-white transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50 sm:px-4 sm:text-sm lg:w-[190px] lg:px-[28px] xl:mr-10 xl:translate-x-[calc(-14rem+80px)]";

/** Stable DOM id — `useId()` can mismatch SSR vs hydrate when the tree shifts (e.g. after refresh). */
const LANDING_NAV_MOBILE_MENU_DOM_ID = "landing-nav-mobile-menu";

type LandingNavProps = {
  useAbsoluteSectionLinks?: boolean;
};

export function LandingNav({
  useAbsoluteSectionLinks = false,
}: LandingNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionHrefPrefix: "#" | "/#" = useAbsoluteSectionLinks ? "/#" : "#";

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useLandingNavBodyLock(mobileOpen, closeMenu);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 h-[length:var(--landing-nav-height)] w-full max-w-[100vw] overflow-x-clip bg-white/97 backdrop-blur-sm"
      aria-label="Main navigation"
    >
      <div className="landing-nav-horizontal-padding mx-auto grid h-full w-full max-w-[1612px] min-w-0 grid-cols-[minmax(calc(var(--landing-nav-logo-offset-x)+var(--landing-nav-logo-width)),1fr)_auto_1fr] items-center gap-x-1 min-[381px]:gap-x-2 sm:gap-x-3 lg:gap-x-6">
        <Link
          href={`${sectionHrefPrefix}${LANDING_SECTION_IDS.HERO}`}
          className="col-start-1 row-start-1 flex h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] min-h-[length:var(--landing-nav-logo-height)] min-w-[length:var(--landing-nav-logo-width)] shrink-0 items-center justify-self-start ms-[length:var(--landing-nav-logo-offset-x)]"
          aria-label="Goldcrest 3D — Home"
        >
          <Image
            src={SITE_HEADER_LOGO_SRC}
            alt="Goldcrest 3D"
            width={57}
            height={33}
            sizes="57px"
            priority
            className="max-w-none h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] shrink-0 object-contain object-left"
          />
        </Link>
        <ul
          className="col-start-2 row-start-1 hidden w-max min-w-0 list-none items-center justify-self-center gap-[clamp(0.75rem,2.4vw,4rem)] lg:flex lg:max-xl:gap-[clamp(0.65rem,1.65vw,2.75rem)]"
          aria-label="Nav links"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} className="flex shrink-0 items-center">
              <Link
                href={`${sectionHrefPrefix}${id}`}
                className="whitespace-nowrap text-[13px] font-medium leading-[18px] text-[#0f172a] no-underline transition hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="col-start-3 row-start-1 flex min-w-0 shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#0f172a] transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={LANDING_NAV_MOBILE_MENU_DOM_ID}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <LandingNavMenuIcon open={mobileOpen} />
          </button>
          <Link
            id="landing-nav-request-quote"
            href={`${sectionHrefPrefix}${LANDING_SECTION_IDS.QUOTE}`}
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
          sectionHrefPrefix={sectionHrefPrefix}
          onClose={closeMenu}
        />
      ) : null}
    </nav>
  );
}
