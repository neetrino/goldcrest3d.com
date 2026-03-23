"use client";

import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";

/** Gold bird mark; background removed (see scripts/process-header-logo.mjs). */
const LOGO_SRC = "/images/header-logo.png";

const NAV_ITEMS: { id: LandingSectionId; label: string }[] = [
  { id: LANDING_SECTION_IDS.HERO, label: "Home" },
  { id: LANDING_SECTION_IDS.SPECIALIZATIONS, label: "Specializations" },
  { id: LANDING_SECTION_IDS.PHILOSOPHY, label: "Engineering" },
  { id: LANDING_SECTION_IDS.FOUNDER, label: "Founder" },
  { id: LANDING_SECTION_IDS.FOOTER, label: "Contact" },
];

/** Scoped styles for the header "Request a Quote" CTA only. Change here to avoid affecting other header elements. */
const REQUEST_QUOTE_BTN_CLASSES =
  "nav-cta-gradient mr-10 -translate-x-56 flex h-[36px] w-[190px] shrink-0 items-center justify-center rounded-full px-[28px] py-[8px] text-sm font-bold leading-5 text-white transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50";

export function LandingNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[length:var(--landing-nav-height)] w-full bg-white/95 backdrop-blur-[6px]"
      aria-label="Main navigation"
    >
      <div className="flex h-full w-full items-center justify-between pl-[51px] pr-[51px]">
        <div className="flex min-w-0 shrink-0">
          <Link
            href={`#${LANDING_SECTION_IDS.HERO}`}
            className="flex items-center"
            aria-label="Goldcrest 3D — Home"
          >
            <Image
              src={LOGO_SRC}
              alt="Goldcrest 3D"
              width={713}
              height={386}
              sizes="(max-width: 768px) 100px, 120px"
              priority
              className="h-[length:var(--landing-nav-height)] w-auto max-w-[min(120px,calc(100vw-200px))] object-contain object-left"
            />
          </Link>
        </div>
        <ul
          className="hidden h-5 list-none flex-1 items-start justify-end gap-[80px] md:flex md:max-w-[711px]"
          aria-label="Nav links"
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} className="flex h-5 items-center">
              <Link
                href={`#${id}`}
                className="h-5 text-[14px] font-medium leading-5 text-[#0f172a] no-underline transition hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          id="landing-nav-request-quote"
          href={`#${LANDING_SECTION_IDS.QUOTE}`}
          className={REQUEST_QUOTE_BTN_CLASSES}
          aria-label="Request a Quote"
        >
          Request a Quote
        </Link>
      </div>
    </nav>
  );
}
