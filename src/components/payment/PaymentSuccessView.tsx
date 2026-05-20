import { redirect } from "next/navigation";

import { PaymentResultPage } from "@/components/payment/PaymentResultPage";
import { CUSTOMER_SUPPORT_INBOX_EMAIL } from "@/constants/customer-support-inbox";
import { contentForPaymentResult } from "@/lib/payment/paymentResultCopy";
import { buildPaymentSuccessPageActions } from "@/lib/payment/paymentResultPageActions";
import {
  parsePaymentReturnQuery,
  paymentReturnPath,
  type PaymentReturnQuery,
} from "@/lib/payment/paymentReturnSearchParams";
import { resolveArcaPaymentReturn } from "@/lib/payment/resolveArcaPaymentReturn";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function PaymentSuccessView({ searchParams }: Props) {
  const query = parsePaymentReturnQuery(await searchParams);
  return renderPaymentSuccess(query);
}

export async function renderPaymentSuccess(query: PaymentReturnQuery) {
  const arcaOrderId = query.orderId ?? query.mdOrder;

  const resolved = await resolveArcaPaymentReturn({
    token: query.token,
    arcaOrderIdFromQuery: arcaOrderId,
    returnPage: "success",
    payment: query.payment,
  });

  if (resolved.status === "failed") {
    redirect(paymentReturnPath("fail", query));
  }

  const copyKey =
    resolved.status === "pending"
      ? "pending"
      : resolved.status === "unknown"
        ? "unknown"
        : "success";

  const copy = contentForPaymentResult(copyKey);
  const actions = buildPaymentSuccessPageActions(resolved);
  const statusIcon = copyKey === "success" ? "tick" : "x";

  const footnote =
    copyKey === "unknown" ? (
      <>
        Need help? Email{" "}
        <a
          href={`mailto:${CUSTOMER_SUPPORT_INBOX_EMAIL}`}
          className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
        >
          {CUSTOMER_SUPPORT_INBOX_EMAIL}
        </a>
        .
      </>
    ) : undefined;

  return (
    <PaymentResultPage
      variant={copy.variant}
      statusIcon={statusIcon}
      title={copy.title}
      description={copy.description}
      primaryAction={actions.primaryAction}
      secondaryAction={actions.secondaryAction}
      footnote={footnote}
    />
  );
}
