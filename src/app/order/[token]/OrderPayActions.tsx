"use client";

import { useState } from "react";
import { createCheckoutSessionForOrder } from "@/app/actions/checkout";

type Props = {
  orderId: string;
  paymentType: string;
  priceCents: number;
  paidCents: number;
  /** When true, button labels indicate simulated checkout (PAYMENT_MOCK_MODE). */
  mockPaymentEnabled?: boolean;
};

export function OrderPayActions({
  orderId,
  paymentType,
  priceCents,
  paidCents,
  mockPaymentEnabled = false,
}: Props) {
  const [pending, setPending] = useState<"full" | "first" | "second" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const half = Math.floor(priceCents / 2);
  const firstPaid = paidCents >= half;
  const isPaid = paidCents >= priceCents;

  const handlePay = async (paymentIndex?: 0 | 1) => {
    setError(null);
    setPending(paymentType === "SPLIT" ? (paymentIndex === 0 ? "first" : "second") : "full");

    const result = await createCheckoutSessionForOrder(orderId, paymentIndex);
    setPending(null);

    if (result.success && result.url) {
      window.location.href = result.url;
      return;
    }
    setError(result.success ? null : result.error);
  };

  if (isPaid) return null;

  return (
    <div className="flex flex-col gap-3">
      {paymentType === "SPLIT" ? (
        <>
          {!firstPaid && (
            <button
              type="button"
              onClick={() => handlePay(0)}
              disabled={!!pending}
              className="w-full rounded bg-[var(--foreground)] px-4 py-3 text-[var(--background)] font-medium hover:opacity-90 disabled:opacity-60"
            >
              {pending === "first" ? "Loading…" : mockPaymentEnabled ? "Pay first 50% (simulated)" : "Pay first 50%"}
            </button>
          )}
          {firstPaid && (
            <button
              type="button"
              onClick={() => handlePay(1)}
              disabled={!!pending}
              className="w-full rounded bg-[var(--foreground)] px-4 py-3 text-[var(--background)] font-medium hover:opacity-90 disabled:opacity-60"
            >
              {pending === "second" ? "Loading…" : mockPaymentEnabled ? "Pay second 50% (simulated)" : "Pay second 50%"}
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => handlePay()}
          disabled={!!pending}
          className="w-full rounded bg-[var(--foreground)] px-4 py-3 text-[var(--background)] font-medium hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Loading…" : mockPaymentEnabled ? "Pay (simulated)" : "Pay"}
        </button>
      )}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
