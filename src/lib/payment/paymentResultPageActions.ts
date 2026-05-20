import type { PaymentResultCardProps } from "@/components/payment/PaymentResultCard";
import type { ResolvedPaymentReturn } from "@/lib/payment/resolveArcaPaymentReturn";

type ActionLink = PaymentResultCardProps["primaryAction"];

export type PaymentResultPageActions = {
  primaryAction: ActionLink;
  secondaryAction?: ActionLink;
};

export function buildPaymentSuccessPageActions(
  resolved: ResolvedPaymentReturn,
): PaymentResultPageActions {
  if (resolved.orderPaymentHref) {
    return {
      primaryAction: {
        href: resolved.orderPaymentHref,
        label: "View order",
      },
      secondaryAction: { href: "/", label: "Return home" },
    };
  }

  return {
    primaryAction: { href: "/", label: "Return home" },
  };
}

export function buildPaymentFailPageActions(
  resolved: ResolvedPaymentReturn,
): PaymentResultPageActions {
  if (resolved.orderPaymentHref) {
    return {
      primaryAction: {
        href: resolved.orderPaymentHref,
        label: "Try again",
      },
      secondaryAction: { href: "/", label: "Return home" },
    };
  }

  return {
    primaryAction: { href: "/", label: "Return home" },
  };
}
