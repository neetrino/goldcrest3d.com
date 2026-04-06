"use client";

import { useState, useTransition } from "react";
import {
  sendPaymentLink,
  type SendPaymentLinkResult,
} from "@/app/actions/order";
import { getAdminSendPaymentLinkButtonClasses } from "@/components/admin/sendPaymentLinkButtonClassName";

export type OrderListItemSendPaymentLinkButtonProps = {
  orderId: string;
  paymentLinkUrl: string;
  /** From DB: payment link email was successfully sent at least once. */
  paymentLinkSentFromDb: boolean;
};

export function OrderListItemSendPaymentLinkButton({
  orderId,
  paymentLinkUrl,
  paymentLinkSentFromDb,
}: OrderListItemSendPaymentLinkButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [sendResult, setSendResult] = useState<SendPaymentLinkResult>(null);
  const [sentSuccessfullyThisSession, setSentSuccessfullyThisSession] =
    useState(false);

  const handleSend = () => {
    setSendResult(null);
    startTransition(async () => {
      const result = await sendPaymentLink(orderId);
      setSendResult(result);
      if (result?.success) {
        setSentSuccessfullyThisSession(true);
      }
    });
  };

  const showFadedSentStyle =
    (paymentLinkSentFromDb || sentSuccessfullyThisSession) && !isPending;
  const isDisabled = isPending || !paymentLinkUrl;

  const buttonClass = getAdminSendPaymentLinkButtonClasses({
    showFadedSentStyle,
    variant: "compact",
  });

  return (
    <div className="flex max-w-[10rem] flex-col items-stretch gap-1">
      <button
        type="button"
        onClick={handleSend}
        disabled={isDisabled}
        aria-label={
          showFadedSentStyle
            ? "Payment link was sent (click to send again)"
            : "Send payment link to client"
        }
        className={`rounded-md ${buttonClass} ${
          isDisabled && !showFadedSentStyle ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isPending ? "Sending…" : "Send payment link"}
      </button>
      {sendResult && !sendResult.success && sendResult.error ? (
        <p className="text-center text-[11px] leading-snug text-red-600" role="alert">
          {sendResult.error}
        </p>
      ) : null}
    </div>
  );
}
