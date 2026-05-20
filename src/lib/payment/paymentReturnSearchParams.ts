import { PAYMENT_RESULT_PATHS } from "@/constants/payment-routes";

export type PaymentReturnQuery = {
  token?: string;
  orderId?: string;
  mdOrder?: string;
  payment?: string;
};

function firstQuery(
  raw: string | string[] | undefined,
): string | undefined {
  if (raw === undefined) return undefined;
  const v = Array.isArray(raw) ? raw[0] : raw;
  const trimmed = typeof v === "string" ? v.trim() : "";
  return trimmed.length > 0 ? trimmed : undefined;
}

export function parsePaymentReturnQuery(
  searchParams: Record<string, string | string[] | undefined>,
): PaymentReturnQuery {
  return {
    token: firstQuery(searchParams.token),
    orderId: firstQuery(searchParams.orderId),
    mdOrder: firstQuery(searchParams.mdOrder),
    payment: firstQuery(searchParams.payment),
  };
}

export function paymentReturnPath(
  page: "success" | "fail",
  query: PaymentReturnQuery,
): string {
  const base =
    page === "success"
      ? PAYMENT_RESULT_PATHS.success
      : PAYMENT_RESULT_PATHS.fail;
  const params = new URLSearchParams();
  if (query.token) params.set("token", query.token);
  if (query.orderId) params.set("orderId", query.orderId);
  if (query.mdOrder) params.set("mdOrder", query.mdOrder);
  if (query.payment) params.set("payment", query.payment);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function appendPaymentReturnQuery(
  path: string,
  query: PaymentReturnQuery,
): string {
  const url = new URL(path, "http://local");
  if (query.token) url.searchParams.set("token", query.token);
  if (query.orderId) url.searchParams.set("orderId", query.orderId);
  if (query.mdOrder) url.searchParams.set("mdOrder", query.mdOrder);
  if (query.payment) url.searchParams.set("payment", query.payment);
  return `${url.pathname}${url.search}`;
}
