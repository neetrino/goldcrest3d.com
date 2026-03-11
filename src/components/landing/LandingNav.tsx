"use client";

import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";

const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/ce31ef4f-5914-417c-9ba4-4c47b79e2bff";

const NAV_ITEMS: { id: LandingSectionId; label: string }[] = [
  { id: LANDING_SECTION_IDS.HERO, label: "Home" },
  { id: LANDING_SECTION_IDS.SPECIALIZATIONS, label: "Specializations" },
  { id: LANDING_SECTION_IDS.PHILOSOPHY, label: "Engineering" },
  { id: LANDING_SECTION_IDS.FOUNDER, label: "Founder" },
  { id: LANDING_SECTION_IDS.FOOTER, label: "Contact" },
];

export function LandingNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[70px] w-full bg-white/95 backdrop-blur-[6px]"
      aria-label="Main navigation"
    >
      <div className="flex h-full w-full items-center justify-between pl-[51px] pr-[51px]">
        <Link
          href={`#${LANDING_SECTION_IDS.HERO}`}
          className="flex shrink-0 items-center"
          aria-label="Goldcrest 3D — Home"
        >
          <Image
            src={LOGO_SRC}
            alt="Goldcrest 3D"
            width={83}
            height={48}
            sizes="100vw"
            className="relative h-12 w-[83px] max-h-full max-w-full overflow-hidden object-cover"
            priority
            unoptimized
          />
        </Link>
        <ul className="hidden flex-1 list-none justify-center gap-[60px] md:flex md:max-w-[711px]" aria-label="Nav links">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className="text-[14px] font-medium leading-5 text-[#0f172a] no-underline transition hover:opacity-80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`#${LANDING_SECTION_IDS.QUOTE}`}
          className="nav-cta-gradient mr-10 flex h-14 shrink-0 items-center justify-center rounded-full px-6 py-2.5 text-base font-bold leading-5 text-white shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Request a Quote
        </Link>
      </div>
    </nav>
  );
}
