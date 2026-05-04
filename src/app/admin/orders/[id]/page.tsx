import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { getR2PublicUrl } from "@/lib/storage";
import { formatPrice } from "@/lib/formatPrice";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import {
  ADMIN_ORDER_PAYMENT_BADGE_KIND,
  getAdminOrderPaymentBadgeKind,
} from "@/lib/payment/adminPaymentDisplayStatus";
import { DeleteOrderButton } from "./DeleteOrderButton";
import { formatOrderPaymentTypeLabel } from "@/lib/payment/paymentTypeLabels";
import {
  formatOrderPaymentLinkModeLabel,
  ORDER_PAYMENT_LINK_MODE,
} from "@/constants/order-payment-link-mode";
import { PaymentLinkActions } from "./PaymentLinkActions";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) notFound();

  const productImageUrl = order.productImageKey
    ? getR2PublicUrl(order.productImageKey)
    : null;
  const showPaymentLinkSection =
    getAdminOrderPaymentBadgeKind({
      status: order.status,
      paymentType: order.paymentType,
      priceCents: order.priceCents,
      paidCents: order.paidCents,
    }) !== ADMIN_ORDER_PAYMENT_BADGE_KIND.PAID;
  const selectedPaymentLinkMode =
    order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
      : ORDER_PAYMENT_LINK_MODE.FULL_ONLY;

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-8 px-4 py-6 sm:px-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Orders
      </Link>

      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            {order.productTitle}
          </h1>
          <OrderStatusBadge
            status={order.status}
            paymentType={order.paymentType}
            priceCents={order.priceCents}
            paidCents={order.paidCents}
          />
        </div>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Client
            </dt>
            <dd className="mt-0.5 font-medium">{order.clientName}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Email
            </dt>
            <dd className="mt-0.5 min-w-0 break-all">
              <a
                href={`mailto:${order.clientEmail}`}
                className="text-[var(--foreground)] underline decoration-neutral-300 underline-offset-2 hover:decoration-[var(--foreground)]"
              >
                {order.clientEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Price
            </dt>
            <dd className="mt-0.5 font-medium">
              {formatPrice(order.priceCents)}
              {order.paidCents > 0 && (
                <span className="ml-2 text-sm font-normal text-neutral-500">
                  (Paid: {formatPrice(order.paidCents)})
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Payment type
            </dt>
            <dd className="mt-0.5">{formatOrderPaymentTypeLabel(order.paymentType)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Token (payment link)
            </dt>
            <dd className="mt-0.5 min-w-0">
              <code className="break-all rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-700">
                {order.token}
              </code>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Created
            </dt>
            <dd className="mt-0.5 text-sm text-neutral-600">
              {order.createdAt.toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </dd>
          </div>
          {productImageUrl && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Product image
              </dt>
              <dd className="mt-1">
                <a
                  href={productImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 transition-opacity hover:opacity-90"
                  aria-label="Open product image in new tab"
                >
                  <Image
                    src={productImageUrl}
                    alt={`${order.productTitle} image`}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover"
                    sizes="96px"
                  />
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {showPaymentLinkSection && (
        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            Payment link
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Send the link to the client or copy it. Current selected mode:{" "}
            <span className="font-medium text-neutral-700">
              {formatOrderPaymentLinkModeLabel(order.paymentLinkMode)}
            </span>
          </p>
          <div className="mt-4">
            <PaymentLinkActions
              orderId={order.id}
              paymentLinkUrl={getOrderPaymentUrl(order.token)}
              paymentLinkMode={selectedPaymentLinkMode}
              paymentLinkSentFromDb={order.paymentLinkSentAt != null}
            />
          </div>
        </section>
      )}

      <section className="rounded-lg border border-red-200 bg-red-50/50 p-6">
        <h2 className="text-base font-semibold text-red-800">Danger zone</h2>
        <p className="mt-1 text-sm text-red-700/90">
          Deleting an order cannot be undone.
        </p>
        <div className="mt-4">
          <DeleteOrderButton orderId={order.id} />
        </div>
      </section>
    </div>
  );
}
