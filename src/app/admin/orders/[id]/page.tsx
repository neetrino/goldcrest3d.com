import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getOrderPaymentUrl } from "@/lib/appUrl";
import { getR2PublicUrl } from "@/lib/storage";
import { OrderEditForm } from "./OrderEditForm";
import { DeleteOrderButton } from "./DeleteOrderButton";
import { PaymentLinkActions } from "./PaymentLinkActions";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("hy-AM", {
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
        ← Պատվերներ
      </Link>

      <div className="border border-neutral-200 rounded-md p-4 space-y-3">
        <h1 className="text-xl font-semibold">{order.productTitle}</h1>
        <p>
          <span className="text-neutral-500">Հաճախորդ: </span>
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
          <span className="text-neutral-500">Գին: </span>
          <span className="font-medium">{formatPrice(order.priceCents)} ֏</span>
        </p>
        <p>
          <span className="text-neutral-500">Վճարման տեսակ: </span>
          <span>{order.paymentType}</span>
        </p>
        <p>
          <span className="text-neutral-500">Ստատուս: </span>
          <span
            className={
              order.status === "PAID" ? "text-green-600" : "text-amber-600"
            }
          >
            {order.status === "PAID" ? "Վճարված" : "Սպասվող"}
          </span>
          {order.paidCents > 0 && (
            <span className="ml-2 text-sm text-neutral-500">
              (Վճարված: {formatPrice(order.paidCents)} ֏)
            </span>
          )}
        </p>
        <p className="text-sm text-neutral-500">
          Token (հղում): <code className="bg-neutral-100 px-1 rounded">{order.token}</code>
        </p>
        <p className="text-sm text-neutral-500">
          {order.createdAt.toLocaleString("hy-AM", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
        {productImageUrl && (
          <div>
            <span className="text-sm font-medium text-neutral-700">
              Ապրանքի նկար:
            </span>
            <div className="mt-1">
              <a
                href={productImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Բացել
              </a>
            </div>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Վճարման հղում</h2>
        <PaymentLinkActions
          orderId={order.id}
          paymentLinkUrl={getOrderPaymentUrl(order.token)}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Խմբագրել</h2>
        <OrderEditForm order={order} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Վտանգ</h2>
        <DeleteOrderButton orderId={order.id} />
      </section>
    </div>
  );
}
