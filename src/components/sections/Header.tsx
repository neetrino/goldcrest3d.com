"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Specializations", href: "#specializations" },
  { label: "Engineering", href: "#engineering" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 backdrop-blur-md bg-white/90 border-b border-[var(--color-slate-border)]">
      <div className="container-narrow h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="#hero"
          className="shrink-0 h-9 w-auto max-w-[80px] md:max-w-[71px] flex items-center"
          aria-label="Goldcrest home"
        >
          <span className="text-[var(--color-charcoal)] font-semibold text-lg tracking-tight">
            Goldcrest
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-slate-heading)]"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile menu button */}
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-bold text-white uppercase tracking-wider bg-[var(--color-charcoal)] hover:bg-[var(--color-primary)] transition-colors shadow-sm"
          >
            Request a Quote
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-[var(--color-charcoal)] hover:bg-black/5 aria-expanded:bg-black/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--color-slate-border)] shadow-lg ${menuOpen ? "block" : "hidden"}`}
        aria-hidden={!menuOpen}
      >
        <nav className="container-narrow py-4 flex flex-col gap-1" aria-label="Main">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="py-3 px-2 text-[var(--color-slate-heading)] font-medium hover:bg-black/5 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-2 py-3 rounded-full text-center font-bold text-white bg-[var(--color-charcoal)]"
            onClick={() => setMenuOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
