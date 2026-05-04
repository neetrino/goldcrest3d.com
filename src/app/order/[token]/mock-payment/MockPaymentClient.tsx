"use client";

import { useState } from "react";
import {
  completeMockPayment,
  type MockPaymentOutcome,
} from "@/app/actions/mock-payment";
import { formatPrice } from "@/lib/formatPrice";

type Props = {
  orderId: string;
  orderToken: string;
  amountCents: number;
  paymentIndex?: 0 | 1;
  productTitle: string;
};

const OUTCOMES: { value: MockPaymentOutcome; label: string; hint: string }[] = [
  { value: "success", label: "Success", hint: "Apply payment like a captured charge." },
  { value: "failed", label: "Failed", hint: "Declined — no change to balance." },
  { value: "pending", label: "Pending", hint: "Async processing — order marked as processing." },
];

export function MockPaymentClient({
  orderId,
  orderToken,
  amountCents,
  paymentIndex,
  productTitle,
}: Props) {
  const [outcome, setOutcome] = useState<MockPaymentOutcome>("success");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setPending(true);
    const result = await completeMockPayment(orderId, orderToken, outcome, paymentIndex);
    setPending(false);
    if (result.success) {
      window.location.assign(result.redirectPath);
      return;
    }
    setError(result.error);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950"
        role="status"
      >
        <strong className="font-semibold">Simulated checkout (development only).</strong> No real
        card charge and no payment provider API calls. Replace with Stripe when ready; set{" "}
        <code className="rounded bg-amber-100/80 px-1">PAYMENT_MOCK_MODE=false</code>.
      </div>

      <div>
        <h2 className="text-lg font-semibold text-neutral-900">{productTitle}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Amount for this step:{" "}
          <span className="font-medium text-neutral-900">{formatPrice(amountCents)}</span>
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-neutral-800">Simulated result</legend>
        <div className="flex flex-col gap-2">
          {OUTCOMES.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-2 rounded-md border border-neutral-200 p-3 has-[:checked]:border-[var(--foreground)] has-[:checked]:bg-neutral-50"
            >
              <input
                type="radio"
                name="mock-outcome"
                value={o.value}
                checked={outcome === o.value}
                onChange={() => setOutcome(o.value)}
                className="mt-0.5"
              />
              <span>
                <span className="font-medium text-neutral-900">{o.label}</span>
                <span className="mt-0.5 block text-xs text-neutral-500">{o.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => void submit()}
        disabled={pending}
        className="w-full rounded bg-[var(--foreground)] px-4 py-3 text-[var(--background)] font-medium hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Applying…" : "Continue"}
      </button>
    </div>
  );
}
