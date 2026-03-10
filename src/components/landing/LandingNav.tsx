"use client";

import {
  LANDING_SECTION_IDS,
  type LandingSectionId,
} from "@/constants";

const NAV_ITEMS: { id: LandingSectionId; label: string }[] = [
  { id: LANDING_SECTION_IDS.HERO, label: "Home" },
  { id: LANDING_SECTION_IDS.PHILOSOPHY, label: "Philosophy" },
  { id: LANDING_SECTION_IDS.SPECIALIZATIONS, label: "Specialisations" },
  { id: LANDING_SECTION_IDS.MANUFACTURING, label: "Manufacturing" },
  { id: LANDING_SECTION_IDS.FOUNDER, label: "Founder" },
  { id: LANDING_SECTION_IDS.PROCESS, label: "Process" },
  { id: LANDING_SECTION_IDS.QUOTE, label: "Request" },
  { id: LANDING_SECTION_IDS.FOOTER, label: "Contact" },
];

export function LandingNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--foreground)]/10 bg-[var(--background)]/90 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <a
          href={`#${LANDING_SECTION_IDS.HERO}`}
          className="text-lg font-semibold text-[var(--foreground)] no-underline hover:opacity-80"
        >
          Goldcrest 3D
        </a>
        <ul className="flex flex-wrap items-center gap-1 md:gap-2">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="rounded-md px-2 py-1.5 text-sm text-[var(--foreground)]/70 transition hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
