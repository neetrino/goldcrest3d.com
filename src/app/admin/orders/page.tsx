import Link from "next/link";
import { prisma } from "@/lib/db";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Link
          href="/admin/orders/new"
          className="rounded bg-[var(--foreground)] px-3 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90"
        >
          New order
        </Link>
      </div>
      {orders.length === 0 ? (
        <p className="text-neutral-600">No orders yet.</p>
      ) : (
        <ul className="border border-neutral-200 rounded-md divide-y divide-neutral-200">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/admin/orders/${order.id}`}
                className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-medium text-[var(--foreground)]">
                      {order.clientName}
                    </span>
                    <span className="text-neutral-500 text-sm ml-2">
                      {order.clientEmail}
                    </span>
                  </div>
                  <span className="text-sm font-medium shrink-0">
                    {formatPrice(order.priceCents)} AMD
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  {order.productTitle}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                  <span>{order.paymentType}</span>
                  <span>·</span>
                  <span
                    className={
                      order.status === "PAID"
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {order.status === "PAID" ? "Paid" : "Pending"}
                  </span>
                  <span>·</span>
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
  );
}
