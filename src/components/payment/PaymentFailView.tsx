import { redirect } from "next/navigation";

import { PaymentResultPage } from "@/components/payment/PaymentResultPage";
import { CUSTOMER_SUPPORT_INBOX_EMAIL } from "@/constants/customer-support-inbox";
import { contentForPaymentResult } from "@/lib/payment/paymentResultCopy";
import { buildPaymentFailPageActions } from "@/lib/payment/paymentResultPageActions";
import {
  parsePaymentReturnQuery,
  paymentReturnPath,
  type PaymentReturnQuery,
} from "@/lib/payment/paymentReturnSearchParams";
import { resolveArcaPaymentReturn } from "@/lib/payment/resolveArcaPaymentReturn";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function PaymentFailView({ searchParams }: Props) {
  const query = parsePaymentReturnQuery(await searchParams);
  return renderPaymentFail(query);
}

export async function renderPaymentFail(query: PaymentReturnQuery) {
  const arcaOrderId = query.orderId ?? query.mdOrder;

  const resolved = await resolveArcaPaymentReturn({
    token: query.token,
    arcaOrderIdFromQuery: arcaOrderId,
    returnPage: "fail",
    payment: query.payment,
  });

  if (resolved.status === "success") {
    redirect(paymentReturnPath("success", query));
  }

  const copyKey =
    resolved.status === "pending"
      ? "pending"
      : resolved.status === "unknown"
        ? "unknown"
        : "failed";

  const copy = contentForPaymentResult(copyKey);
  const actions = buildPaymentFailPageActions(resolved);
  const statusIcon = copyKey === "failed" ? "x" : copyKey === "pending" ? "tick" : "x";

  const footnote = (
    <>
      Questions? Contact{" "}
      <a
        href={`mailto:${CUSTOMER_SUPPORT_INBOX_EMAIL}`}
        className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
      >
        {CUSTOMER_SUPPORT_INBOX_EMAIL}
      </a>
      .
    </>
  );

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
