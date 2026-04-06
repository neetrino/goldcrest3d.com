"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setOrderPaymentTypeByToken } from "@/app/actions/orderPaymentChoice";
import { formatPriceAmd } from "@/lib/formatPrice";

type Props = {
  token: string;
  totalCents: number;
};

export function OrderPaymentTypeChoice({ token, totalCents }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState<"FULL" | "SPLIT" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const half = Math.floor(totalCents / 2);

  const choose = async (paymentType: "FULL" | "SPLIT") => {
    setError(null);
    setPending(paymentType);
    const result = await setOrderPaymentTypeByToken(token, paymentType);
    setPending(null);
    if (result.success) {
      router.refresh();
      return;
    }
    setError(result.error);
  };

  return (
    <section
      className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4"
      aria-labelledby="payment-type-heading"
    >
      <h2
        id="payment-type-heading"
        className="text-base font-semibold text-neutral-900"
      >
        How would you like to pay?
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Choose one option. You can complete payment in the next step.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => void choose("FULL")}
          disabled={!!pending}
          className="flex w-full flex-col items-start rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:border-[var(--foreground)]/40 hover:bg-neutral-50 disabled:opacity-60"
        >
          <span className="font-medium text-neutral-900">Pay in full</span>
          <span className="mt-0.5 text-sm text-neutral-600">
            Pay {formatPriceAmd(totalCents)} AMD in one payment.
          </span>
        </button>
        <button
          type="button"
          onClick={() => void choose("SPLIT")}
          disabled={!!pending}
          className="flex w-full flex-col items-start rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:border-[var(--foreground)]/40 hover:bg-neutral-50 disabled:opacity-60"
        >
          <span className="font-medium text-neutral-900">
            Pay 50% now / split payment
          </span>
          <span className="mt-0.5 text-sm text-neutral-600">
            Pay {formatPriceAmd(half)} AMD now, then {formatPriceAmd(totalCents - half)}{" "}
            AMD for the remainder.
          </span>
        </button>
      </div>
      {pending && (
        <p className="mt-3 text-sm text-neutral-500" role="status">
          Saving your choice…
        </p>
      )}
      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
