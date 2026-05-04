import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { formatPrice } from "@/lib/formatPrice";
import { formatOrderPaymentTypeLabel } from "@/lib/payment/paymentTypeLabels";
import { ORDER_PAYMENT_LINK_MODE } from "@/constants/order-payment-link-mode";
import { OrderEditPencilIcon } from "@/components/admin/OrderEditPencilIcon";
import { OrderListItemSendPaymentLinkButton } from "@/components/admin/OrderListItemSendPaymentLinkButton";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-6 sm:px-6">
      <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            Orders
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Create and manage payment orders.
          </p>
        </div>
        <Link
          href="/admin/orders/new"
          className="rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
        >
          New order
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 bg-white py-16 text-center shadow-sm">
          <p className="text-neutral-500">No orders yet.</p>
          <p className="mt-1 text-sm text-neutral-400">
            Create your first order using the button above to get started.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="group flex overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="block min-w-0 flex-1 p-4 transition-colors group-hover:bg-neutral-50 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:gap-y-0">
                        <span className="font-medium text-[var(--foreground)]">
                          {order.clientName}
                        </span>
                        <span className="text-sm text-neutral-500 break-words sm:break-normal">
                          {order.clientEmail}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 break-words">
                        {order.productTitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        <span>{formatOrderPaymentTypeLabel(order.paymentType)}</span>
                        <span aria-hidden>·</span>
                        <OrderStatusBadge
                          status={order.status}
                          paymentType={order.paymentType}
                          priceCents={order.priceCents}
                          paidCents={order.paidCents}
                        />
                        <span aria-hidden>·</span>
                        <time dateTime={order.createdAt.toISOString()}>
                          {order.createdAt.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </div>
                    </div>
                    <div className="max-w-full shrink-0 overflow-x-auto border-t border-neutral-100 pt-3 sm:w-auto sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-right [scrollbar-width:thin]">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Total
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-lg font-semibold tabular-nums tracking-tight text-[var(--foreground)]">
                        <span className="font-medium text-neutral-600">
                          {formatPrice(order.priceCents)}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex shrink-0 flex-col border-neutral-200 border-t sm:flex-row sm:border-t-0 sm:border-l">
                  <div className="flex min-h-[44px] items-center justify-center border-neutral-200 border-b px-2 py-2 sm:min-h-0 sm:border-b-0 sm:border-r sm:px-3 sm:py-3">
                    <OrderListItemSendPaymentLinkButton
                      orderId={order.id}
                      paymentLinkUrl={getOrderPaymentUrl(order.token)}
                      paymentLinkMode={
                        order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
                          ? ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED
                          : ORDER_PAYMENT_LINK_MODE.FULL_ONLY
                      }
                      paymentLinkSentFromDb={order.paymentLinkSentAt != null}
                    />
                  </div>
                  <Link
                    href={`/admin/orders/${order.id}/edit`}
                    className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center self-stretch px-3 text-neutral-500 transition-colors group-hover:bg-neutral-50 hover:text-[var(--foreground)] sm:min-h-0 sm:min-w-0 sm:px-4"
                    aria-label={`Edit order: ${order.clientName}`}
                  >
                    <OrderEditPencilIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
