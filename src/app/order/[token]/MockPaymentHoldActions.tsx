"use client";

import { useState } from "react";
import { clearMockPaymentHold } from "@/app/actions/mock-payment";

type Props = { orderId: string; orderToken: string };

/**
 * Dev-only: clears simulated PAYMENT_PROCESSING so the user can try paying again.
 */
export function MockPaymentHoldActions({ orderId, orderToken }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clear = async () => {
    setError(null);
    setPending(true);
    const result = await clearMockPaymentHold(orderId, orderToken);
    setPending(false);
    if (result.success) {
      window.location.reload();
      return;
    }
    setError(result.error);
  };

  return (
    <div className="rounded-md border border-blue-200 bg-blue-50/80 px-3 py-2 text-sm text-blue-950">
      <p className="font-medium">Payment processing (simulated)</p>
      <p className="mt-1 text-blue-900/90">
        No charge completed. Clear the hold to try again or choose another simulated outcome.
      </p>
      <button
        type="button"
        onClick={() => void clear()}
        disabled={pending}
        className="mt-2 rounded border border-blue-300 bg-white px-3 py-1.5 text-xs font-medium text-blue-900 hover:bg-blue-100/50 disabled:opacity-60"
      >
        {pending ? "Clearing…" : "Clear simulated hold (dev)"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
