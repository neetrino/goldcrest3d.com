"use client";

import { useTransition, useState } from "react";
import { sendPaymentLink, type SendPaymentLinkResult } from "@/app/actions/order";
import { getAdminSendPaymentLinkButtonClasses } from "@/components/admin/sendPaymentLinkButtonClassName";

type Props = {
  orderId: string;
  paymentLinkUrl: string;
  /** From DB: payment link email was successfully sent at least once. */
  paymentLinkSentFromDb: boolean;
};

export function PaymentLinkActions({
  orderId,
  paymentLinkUrl,
  paymentLinkSentFromDb,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<SendPaymentLinkResult>(null);
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    setState(null);
    startTransition(async () => {
      const result = await sendPaymentLink(orderId);
      setState(result);
    });
  };

  const showFadedSentStyle =
    (paymentLinkSentFromDb || state?.success === true) && !isPending;

  const handleCopy = async () => {
    if (!paymentLinkUrl) return;
    try {
      await navigator.clipboard.writeText(paymentLinkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleSend}
        disabled={isPending || !paymentLinkUrl}
        aria-label={
          showFadedSentStyle
            ? "Payment link was sent (click to send again)"
            : "Send payment link to client"
        }
        className={`rounded-md ${getAdminSendPaymentLinkButtonClasses({
          showFadedSentStyle,
          variant: "default",
        })} ${
          (isPending || !paymentLinkUrl) && !showFadedSentStyle
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
      >
        {isPending ? "Sending…" : "Send payment link"}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!paymentLinkUrl}
        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-neutral-50 disabled:opacity-50"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      {state?.success && (
        <span className="text-sm text-green-600" role="status">
          Email sent
        </span>
      )}
      {state && !state.success && state.error && (
        <span className="text-sm text-red-600" role="alert">
          {state.error}
        </span>
      )}
    </div>
  );
}
