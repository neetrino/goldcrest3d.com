import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-bg-warm)] border-t border-[var(--color-slate-border)]">
      <div className="container-narrow mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href="#hero" className="inline-block">
              <span className="text-[var(--color-slate-heading)] font-semibold text-xl">
                Goldcrest
              </span>
            </Link>
            <p className="mt-3 text-[var(--color-charcoal-soft)] text-base leading-relaxed max-w-sm">
              Specialized in precision jewelry CAD and structural engineering
              for high-end manufacturing.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-slate-heading)]">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-slate-muted)]">
              <li>
                <a
                  href="mailto:hello@ds-jewelry.studio"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  hello@ds-jewelry.studio
                </a>
              </li>
              <li>
                <a
                  href="tel:+15559023481"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  +1 (555) 902-3481
                </a>
              </li>
              <li>
                Yerevan, Armenia
                <br />
                <span className="text-[var(--color-charcoal-soft)]">
                  International collaborations available
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-slate-heading)]">
              Follow
            </h3>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/80 border border-[var(--color-slate-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-lg font-bold">in</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/80 border border-[var(--color-slate-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-slate-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--color-slate-muted)]">
          <p>© 2024 DS Studio Engineering. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[var(--color-charcoal)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--color-charcoal)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
