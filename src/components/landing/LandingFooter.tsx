import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer
      className="border-t border-[#e2e8f0] bg-[#f8f7f6] px-4 py-16 md:px-[5.05%] md:pr-[8.23%]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex max-w-[384px] flex-col gap-[10px]">
            <div className="relative h-[63px] w-[111px]">
              <Image
                src={LANDING_IMAGES.footerLogo}
                alt="Goldcrest 3D"
                fill
                className="object-contain object-left"
                sizes="111px"
                unoptimized
              />
            </div>
            <p className="font-manrope font-light leading-[24px] text-[rgba(24,22,16,0.6)] text-[16px]">
              Specialized in precision jewelry CAD and structural engineering
              for high-end manufacturing.
            </p>
          </div>
          <div>
            <h3 className="font-bold leading-[16px] tracking-[1.2px] text-[#0f172a] text-[12px] uppercase">
              Contact
            </h3>
            <div className="mt-[40px] flex flex-col gap-[13px]">
              <a
                href="mailto:hello@goldcrest3d.com"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                hello@goldcrest3d.com
              </a>
              <a
                href="tel:+15559023481"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                +1 (555) 902-3481
              </a>
              <p className="text-[14px] leading-[20px] text-[#64748b]">
                Yerevan, Armenia
                <br />
                International collaborations available
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold leading-[16px] tracking-[1.2px] text-[#0f172a] text-[12px] uppercase">
              Follow
            </h3>
            <div className="mt-[35px] flex gap-4">
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
                  unoptimized
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
                  unoptimized
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
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-0 flex flex-col gap-4 border-t border-[#e2e8f0] pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-bold leading-[15px] tracking-[1px] text-[#94a3b8] text-[10px] uppercase">
            © {new Date().getFullYear()} Goldcrest 3D. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-bold leading-[15px] tracking-[1px] text-[#94a3b8] text-[10px] uppercase hover:text-[var(--foreground)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-bold leading-[15px] tracking-[1px] text-[#94a3b8] text-[10px] uppercase hover:text-[var(--foreground)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
