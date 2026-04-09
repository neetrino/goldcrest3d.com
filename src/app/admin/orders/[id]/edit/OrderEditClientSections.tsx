"use client";

import { useState } from "react";
import {
  formatOrderPaymentLinkModeLabel,
  ORDER_PAYMENT_LINK_MODE,
} from "@/constants/order-payment-link-mode";
import type { Order } from "@/generated/prisma/client";
import { OrderEditForm } from "../OrderEditForm";
import { PaymentLinkActions } from "../PaymentLinkActions";

type Props = {
  order: Order;
  paymentLinkUrl: string;
};

export function OrderEditClientSections({ order, paymentLinkUrl }: Props) {
  const [selectedPaymentLinkMode, setSelectedPaymentLinkMode] = useState<
    "FULL_ONLY" | "SPLIT_ENABLED"
  >(
    order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      : ORDER_PAYMENT_LINK_MODE.FULL_ONLY,
  );

  return (
    <>
      <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <OrderEditForm
          order={order}
          paymentLinkMode={selectedPaymentLinkMode}
          onPaymentLinkModeChange={setSelectedPaymentLinkMode}
        />
      </div>

      <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--foreground)]">
          Payment link
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Send the link to the client or copy it. Current selected mode:{" "}
          <span className="font-medium text-neutral-700">
            {formatOrderPaymentLinkModeLabel(selectedPaymentLinkMode)}
          </span>
        </p>
        <div className="mt-4">
          <PaymentLinkActions
            orderId={order.id}
            paymentLinkUrl={paymentLinkUrl}
            paymentLinkMode={selectedPaymentLinkMode}
            paymentLinkSentFromDb={order.paymentLinkSentAt != null}
          />
        </div>
      </section>
    </>
  );
}
