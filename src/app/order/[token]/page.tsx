import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getR2PublicUrl } from "@/lib/storage";
import { OrderPayActions } from "./OrderPayActions";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

type Props = { params: Promise<{ token: string }> };

export default async function OrderPaymentPage({ params }: Props) {
  const { token } = await params;
  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) notFound();

  const total = order.priceCents;
  const paid = order.paidCents;
  const remaining = total - paid;
  const isPaid = order.status === "PAID" || paid >= total;
  const half = Math.floor(total / 2);
  const firstHalfPaid = paid >= half;

  const productImageUrl = order.productImageKey
    ? getR2PublicUrl(order.productImageKey)
    : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-neutral-900">
          {order.productTitle}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Goldcrest 3D — order #{order.token}
        </p>

        <dl className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Total</dt>
            <dd className="font-medium">{formatPrice(total)} AMD</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Paid</dt>
            <dd className="font-medium text-green-600">{formatPrice(paid)} AMD</dd>
          </div>
          {!isPaid && (
            <div className="flex justify-between text-sm">
              <dt className="text-neutral-500">Remaining</dt>
              <dd className="font-medium text-amber-600">
                {formatPrice(remaining)} AMD
              </dd>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Payment type</dt>
            <dd>
              {order.paymentType === "SPLIT"
                ? "50% + 50%"
                : "Full amount"}
            </dd>
          </div>
        </dl>

        {order.paymentType === "SPLIT" && !isPaid && (
          <p className="mt-3 text-sm text-neutral-600">
            {!firstHalfPaid
              ? "Pay the first 50%, then the remaining 50%."
              : "Pay the remaining 50%."}
          </p>
        )}

        {productImageUrl && (
          <div className="mt-4">
            <img
              src={productImageUrl}
              alt={order.productTitle}
              className="max-h-40 rounded object-contain"
            />
          </div>
        )}

        <div className="mt-6">
          {isPaid ? (
            <p className="rounded bg-green-50 py-3 text-center font-medium text-green-800">
              Order is fully paid
            </p>
          ) : (
            <OrderPayActions
              orderId={order.id}
              paymentType={order.paymentType}
              priceCents={order.priceCents}
              paidCents={order.paidCents}
            />
          )}
        </div>
      </div>

      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-700"
        >
          ← Goldcrest 3D
        </Link>
      </p>
    </div>
  );
}
