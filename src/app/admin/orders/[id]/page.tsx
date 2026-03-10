import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { getR2PublicUrl } from "@/lib/storage";
import { OrderEditForm } from "./OrderEditForm";
import { DeleteOrderButton } from "./DeleteOrderButton";
import { PaymentLinkActions } from "./PaymentLinkActions";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) notFound();

  const productImageUrl = order.productImageKey
    ? getR2PublicUrl(order.productImageKey)
    : null;

  return (
    <div className="max-w-2xl space-y-8">
      <Link
        href="/admin/orders"
        className="text-sm text-neutral-600 hover:text-[var(--foreground)]"
      >
        ← Orders
      </Link>

      <div className="border border-neutral-200 rounded-md p-4 space-y-3">
        <h1 className="text-xl font-semibold">{order.productTitle}</h1>
        <p>
          <span className="text-neutral-500">Client: </span>
          <span className="font-medium">{order.clientName}</span>
        </p>
        <p>
          <span className="text-neutral-500">Email: </span>
          <a
            href={`mailto:${order.clientEmail}`}
            className="text-blue-600 hover:underline"
          >
            {order.clientEmail}
          </a>
        </p>
        <p>
          <span className="text-neutral-500">Price: </span>
          <span className="font-medium">{formatPrice(order.priceCents)} AMD</span>
        </p>
        <p>
          <span className="text-neutral-500">Payment type: </span>
          <span>{order.paymentType}</span>
        </p>
        <p>
          <span className="text-neutral-500">Status: </span>
          <span
            className={
              order.status === "PAID" ? "text-green-600" : "text-amber-600"
            }
          >
            {order.status === "PAID" ? "Paid" : "Pending"}
          </span>
          {order.paidCents > 0 && (
            <span className="ml-2 text-sm text-neutral-500">
              (Paid: {formatPrice(order.paidCents)} AMD)
            </span>
          )}
        </p>
        <p className="text-sm text-neutral-500">
          Token (link): <code className="bg-neutral-100 px-1 rounded">{order.token}</code>
        </p>
        <p className="text-sm text-neutral-500">
          {order.createdAt.toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
        {productImageUrl && (
          <div>
            <span className="text-sm font-medium text-neutral-700">
              Product image:
            </span>
            <div className="mt-1">
              <a
                href={productImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open
              </a>
            </div>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Payment link</h2>
        <PaymentLinkActions
          orderId={order.id}
          paymentLinkUrl={getOrderPaymentUrl(order.token)}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Edit</h2>
        <OrderEditForm order={order} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Danger</h2>
        <DeleteOrderButton orderId={order.id} />
      </section>
    </div>
  );
}
