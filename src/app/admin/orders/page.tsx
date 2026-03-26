import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPriceAmd } from "@/lib/formatPrice";

function StatusBadge({ status }: { status: string }) {
  const isPaid = status === "PAID";
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
        (isPaid ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800")
      }
    >
      {isPaid ? "Paid" : "Pending"}
    </span>
  );
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4 py-6 sm:px-6">
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
            Create your first order to get started.
          </p>
          <Link
            href="/admin/orders/new"
            className="mt-4 inline-block rounded-md bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90"
          >
            New order
          </Link>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border-b border-neutral-100 last:border-b-0"
            >
              <Link
                href={`/admin/orders/${order.id}`}
                className="block px-5 py-4 transition-colors hover:bg-neutral-50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-[var(--foreground)]">
                      {order.clientName}
                    </span>
                    <span className="ml-2 text-sm text-neutral-500">
                      {order.clientEmail}
                    </span>
                  </div>
                  <span className="shrink-0 text-sm font-medium">
                    {formatPriceAmd(order.priceCents)} AMD
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  {order.productTitle}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span>{order.paymentType}</span>
                  <span aria-hidden>·</span>
                  <StatusBadge status={order.status} />
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
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
