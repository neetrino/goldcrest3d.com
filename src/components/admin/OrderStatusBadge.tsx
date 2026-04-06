import {
  ADMIN_ORDER_PAYMENT_BADGE_KIND,
  getAdminOrderPaymentBadgeKind,
} from "@/lib/payment/adminPaymentDisplayStatus";

type Props = {
  status: string;
  paymentType: string;
  priceCents: number;
  paidCents: number;
};

export function OrderStatusBadge({
  status,
  paymentType,
  priceCents,
  paidCents,
}: Props) {
  const kind = getAdminOrderPaymentBadgeKind({
    status,
    paymentType,
    priceCents,
    paidCents,
  });

  if (kind === ADMIN_ORDER_PAYMENT_BADGE_KIND.PAID) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Paid
      </span>
    );
  }
  if (kind === ADMIN_ORDER_PAYMENT_BADGE_KIND.PAYMENT_PROCESSING) {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
        Payment processing
      </span>
    );
  }
  if (kind === ADMIN_ORDER_PAYMENT_BADGE_KIND.PARTIALLY_PAID) {
    return (
      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-900">
        Partially paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
      Pending
    </span>
  );
}
