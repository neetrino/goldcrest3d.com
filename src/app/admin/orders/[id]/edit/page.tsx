import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { OrderEditForm } from "../OrderEditForm";

type Props = { params: Promise<{ id: string }> };

/**
 * Standalone edit screen (e.g. from list pencil): form only, no detail/payment/danger UI.
 */
export default async function AdminOrderEditPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) notFound();

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-6 sm:px-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Orders
      </Link>

      <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <OrderEditForm order={order} />
      </div>
    </div>
  );
}
