import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  PaymentResultStatusIcon,
  type PaymentStatusIconKind,
} from "@/components/payment/PaymentResultStatusIcon";
import { SITE_HEADER_LOGO_SRC } from "@/constants";

export type PaymentResultVariant = "success" | "failure";

type ActionLink = { href: string; label: string };

export type PaymentResultCardProps = {
  variant: PaymentResultVariant;
  statusIcon: PaymentStatusIconKind;
  title: string;
  description: string;
  primaryAction: ActionLink;
  secondaryAction?: ActionLink;
  footnote?: ReactNode;
};

const VARIANT_STYLES: Record<PaymentResultVariant, { statusBorder: string }> = {
  success: { statusBorder: "border-t-green-500" },
  failure: { statusBorder: "border-t-red-500" },
};

const PRIMARY_BTN =
  "nav-cta-gradient inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-center text-sm font-bold leading-5 text-white transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#e2c481]/60 sm:w-auto sm:min-w-[11rem]";

const SECONDARY_BTN =
  "inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-center text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-slate-300 sm:w-auto sm:min-w-[11rem]";

export function PaymentResultCard({
  variant,
  statusIcon,
  title,
  description,
  primaryAction,
  secondaryAction,
  footnote,
}: PaymentResultCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-slate-200/90 border-t-4 bg-white p-8 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.18)] sm:p-10 ${styles.statusBorder}`}
    >
      <div className="flex justify-center">
        <Image
          src={SITE_HEADER_LOGO_SRC}
          alt="Goldcrest 3D"
          width={57}
          height={33}
          sizes="57px"
          priority
          className="h-[length:var(--landing-nav-logo-height)] w-[length:var(--landing-nav-logo-width)] object-contain"
        />
      </div>

      <div className="mx-auto mt-8 w-fit">
        <PaymentResultStatusIcon kind={statusIcon} />
      </div>

      <h1 className="mt-6 text-center font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
        {title}
      </h1>
      <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <Link href={primaryAction.href} className={PRIMARY_BTN}>
          {primaryAction.label}
        </Link>
        {secondaryAction ? (
          <Link href={secondaryAction.href} className={SECONDARY_BTN}>
            {secondaryAction.label}
          </Link>
        ) : null}
      </div>

      {footnote ? (
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
          {footnote}
        </p>
      ) : null}
    </article>
  );
}
