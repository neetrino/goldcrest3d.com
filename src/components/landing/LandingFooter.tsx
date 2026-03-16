import { LANDING_IMAGE_IDS } from "@/constants";
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-12">
          <div className="flex max-w-[384px] flex-col gap-[10px]">
            <div
              className="relative h-[63px] w-[111px]"
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_LOGO}
            >
              <Image
                src={LANDING_IMAGES.footerLogo}
                alt="Goldcrest 3D"
                fill
                className="object-contain object-left"
                sizes="111px"
                unoptimized
              />
            </div>
            <p className="font-manrope font-bold leading-[20px] text-[#0f172a] text-[14px]">
              GOLDCREST 3D
            </p>
            <p className="font-manrope font-light leading-[24px] text-[rgba(24,22,16,0.6)] text-[16px]">
              Precision in every dimension.
            </p>
          </div>
          <div>
            <h3 className="font-bold leading-[16px] tracking-[1.2px] text-[#0f172a] text-[12px] uppercase">
              Links
            </h3>
            <nav className="mt-[40px] flex flex-col gap-3" aria-label="Footer navigation">
              <Link
                href="/#hero"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                Home
              </Link>
              <Link
                href="/#founder"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                About
              </Link>
              <Link
                href="/#specializations"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                Services
              </Link>
              <Link
                href="/#quote"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold leading-[16px] tracking-[1.2px] text-[#0f172a] text-[12px] uppercase">
              Contact
            </h3>
            <div className="mt-[40px] flex flex-col gap-[13px]">
              <a
                href="mailto:info@goldcrest3d.com"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                info@goldcrest3d.com
              </a>
              <a
                href="tel:+37496301010"
                className="text-[14px] leading-[20px] text-[#64748b] hover:text-[var(--foreground)]"
              >
                +374 96 30-10-10
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                aria-label="Instagram"
                data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_1}
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                aria-label="LinkedIn"
                data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_2}
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition hover:opacity-80"
                aria-label="YouTube"
                data-landing-image={LANDING_IMAGE_IDS.FOOTER_SOCIAL_3}
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
            <div
              className="mt-4 h-24 w-full overflow-hidden rounded-lg bg-slate-200 grayscale opacity-50"
              data-landing-image={LANDING_IMAGE_IDS.FOOTER_FOLLOW_IMAGE}
            >
              <Image
                src={LANDING_IMAGES.footerFollowImage}
                alt=""
                width={368}
                height={96}
                className="h-full w-full object-cover"
                style={{ height: "auto" }}
                loading="eager"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="mt-0 flex flex-col gap-4 border-t border-[#e2e8f0] pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-bold leading-[15px] tracking-[1px] text-[#94a3b8] text-[10px] uppercase">
            © 2024 Goldcrest 3D. All rights reserved.
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
