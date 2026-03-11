"use client";

import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";

/** Logo from Figma Header (node 92:255). Replace with /images/logo.png when available. */
const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/e8a85363-92c6-44c0-a48d-d4b356c99573";

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
      className="sticky top-0 z-50 h-[69px] w-full border-b border-[var(--foreground)]/5 bg-white"
      aria-label="Main navigation"
    >
      <div className="flex h-full w-full items-center justify-between gap-8 pl-[51px] pr-[51px]">
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
          />
        </Link>
        <ul className="hidden flex-1 list-none justify-center gap-10 md:flex">
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
          className="nav-cta-gradient flex h-14 shrink-0 items-center justify-center rounded-full px-6 py-2.5 text-base font-bold leading-5 text-white shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Request a Quote
        </Link>
      </div>
    </nav>
  );
}
