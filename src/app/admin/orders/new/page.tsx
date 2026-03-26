import Link from "next/link";
import { OrderNewForm } from "./OrderNewForm";

export default function AdminOrderNewPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-6 sm:px-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Orders
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          New order
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Create an order and send the payment link to the client.
        </p>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <OrderNewForm />
      </div>
    </div>
  );
}
