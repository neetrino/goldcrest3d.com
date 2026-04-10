import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { OrderEditClientSections } from "./OrderEditClientSections";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderEditPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) notFound();
  const paymentLinkUrl = getOrderPaymentUrl(order.token);

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-8 px-4 py-6 sm:px-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--foreground)]"
      >
        ← Back to Orders
      </Link>

      <OrderEditClientSections order={order} paymentLinkUrl={paymentLinkUrl} />
    </div>
  );
}
