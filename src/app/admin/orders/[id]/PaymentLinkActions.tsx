"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sendPaymentLink,
  setOrderPaymentLinkMode,
  type SendPaymentLinkResult,
} from "@/app/actions/order";
import { getAdminSendPaymentLinkButtonClasses } from "@/components/admin/sendPaymentLinkButtonClassName";

type Props = {
  orderId: string;
  paymentLinkUrl: string;
  paymentLinkMode: "FULL_ONLY" | "SPLIT_ENABLED";
  /** From DB: payment link email was successfully sent at least once. */
  paymentLinkSentFromDb: boolean;
};

export function PaymentLinkActions({
  orderId,
  paymentLinkUrl,
  paymentLinkMode,
  paymentLinkSentFromDb,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCopyPending, setIsCopyPending] = useState(false);
  const [state, setState] = useState<SendPaymentLinkResult>(null);
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    setState(null);
    startTransition(async () => {
      const result = await sendPaymentLink(orderId, paymentLinkMode);
      setState(result);
    });
  };

  const showFadedSentStyle =
    (paymentLinkSentFromDb || state?.success === true) && !isPending;

  const handleCopy = async () => {
    if (!paymentLinkUrl) return;
    setState(null);
    setIsCopyPending(true);
    try {
      const modeResult = await setOrderPaymentLinkMode(orderId, paymentLinkMode);
      if (!modeResult.success) {
        setState({ success: false, error: modeResult.error });
        setCopied(false);
        return;
      }
      await navigator.clipboard.writeText(paymentLinkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      router.refresh();
    } catch {
      setCopied(false);
      setState({ success: false, error: "Could not copy payment link." });
    } finally {
      setIsCopyPending(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleSend}
        disabled={isPending || isCopyPending || !paymentLinkUrl}
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
        disabled={isPending || isCopyPending || !paymentLinkUrl}
        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-neutral-50 disabled:opacity-50"
      >
        {isCopyPending ? "Copying…" : copied ? "Copied" : "Copy link"}
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
