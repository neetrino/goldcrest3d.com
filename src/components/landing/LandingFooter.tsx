import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer
      className="border-t border-[#e2e8f0] bg-[#f8f7f6] px-4 py-16 md:px-6"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="relative h-[63px] w-[111px]">
              <Image
                src={LANDING_IMAGES.footerLogo}
                alt="Goldcrest 3D"
                fill
                className="object-contain object-left"
                sizes="111px"
              />
            </div>
            <p className="max-w-[384px] font-light leading-[1.5] text-[var(--foreground)]/60 text-[16px]">
              Specialized in precision jewelry CAD and structural engineering
              for high-end manufacturing.
            </p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#0f172a] text-[12px]">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 font-normal text-[#64748b] text-[14px]">
              <li>
                <a
                  href="mailto:hello@goldcrest3d.com"
                  className="hover:text-[var(--foreground)]"
                >
                  hello@goldcrest3d.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15559023481"
                  className="hover:text-[var(--foreground)]"
                >
                  +1 (555) 902-3481
                </a>
              </li>
              <li>Yerevan, Armenia</li>
              <li>International collaborations available</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#0f172a] text-[12px]">
              Follow
            </h3>
            <div className="mt-4 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 transition hover:opacity-80"
                aria-label="Instagram"
              >
                <Image
                  src={LANDING_IMAGES.social1}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 transition hover:opacity-80"
                aria-label="LinkedIn"
              >
                <Image
                  src={LANDING_IMAGES.social2}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 transition hover:opacity-80"
                aria-label="YouTube"
              >
                <Image
                  src={LANDING_IMAGES.social3}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-[#e2e8f0] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-bold uppercase tracking-widest text-[#94a3b8] text-[10px]">
            © {new Date().getFullYear()} Goldcrest 3D. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-bold uppercase tracking-widest text-[#94a3b8] text-[10px] hover:text-[var(--foreground)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-bold uppercase tracking-widest text-[#94a3b8] text-[10px] hover:text-[var(--foreground)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
