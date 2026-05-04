import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { getR2PublicUrl } from "@/lib/storage";
import { formatPriceAmd } from "@/lib/formatPrice";
import { ORDER_STATUS } from "@/constants/order-status";
import { isSimulatedPaymentFlow } from "@/lib/payment/config";
import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";
import { formatOrderPaymentTypeLabel } from "@/lib/payment/paymentTypeLabels";
import { ORDER_PAYMENT_LINK_MODE } from "@/constants/order-payment-link-mode";
import { MockPaymentHoldActions } from "./MockPaymentHoldActions";
import { OrderPayActions } from "./OrderPayActions";
import { OrderPaymentTypeChoice } from "./OrderPaymentTypeChoice";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstQuery(
  raw: string | string[] | undefined,
): string | undefined {
  if (raw === undefined) return undefined;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export default async function OrderPaymentPage({ params, searchParams }: Props) {
  const { token } = await params;
  const sp = await searchParams;
  const mockFlag = firstQuery(sp.mock);
  const mockMsg = firstQuery(sp.msg);
  const mockPaymentEnabled = isSimulatedPaymentFlow();

  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) notFound();

  const total = order.priceCents;
  const paid = order.paidCents;
  const remaining = total - paid;
  const isPaid = order.status === "PAID" || paid >= total;
  const half = Math.floor(total / 2);
  const firstHalfPaid = paid >= half;
  const needsClientPaymentTypeChoice =
    order.paymentType === ORDER_PAYMENT_TYPE.UNSET &&
    order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED &&
    !isPaid &&
    order.status !== ORDER_STATUS.PAYMENT_PROCESSING;
  const effectivePaymentType =
    order.paymentType === ORDER_PAYMENT_TYPE.UNSET &&
    order.paymentLinkMode === ORDER_PAYMENT_LINK_MODE.FULL_ONLY
      ? ORDER_PAYMENT_TYPE.FULL
      : order.paymentType;

  const productImageUrl = order.productImageKey
    ? getR2PublicUrl(order.productImageKey)
    : null;

  const showMockBanner = mockPaymentEnabled && mockFlag !== undefined;

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        {showMockBanner && mockFlag === "success" && (
          <p
            className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-900"
            role="status"
          >
            Simulated payment: <strong>success</strong> — balance updated for testing only.
          </p>
        )}
        {showMockBanner && mockFlag === "failed" && (
          <p
            className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900"
            role="status"
          >
            Simulated payment: <strong>failed</strong> — no charge applied.
          </p>
        )}
        {showMockBanner && mockFlag === "pending" && (
          <p
            className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900"
            role="status"
          >
            Simulated payment: <strong>pending</strong> — order marked as processing (not paid yet).
          </p>
        )}
        {showMockBanner && mockFlag === "error" && mockMsg && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
            {mockMsg}
          </p>
        )}
        {mockPaymentEnabled && !showMockBanner && (
          <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
            <strong className="font-semibold">Test mode:</strong> payments are simulated (no real charges).
          </p>
        )}
        <h1 className="text-xl font-semibold text-neutral-900">
          {order.productTitle}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Goldcrest 3D</p>

        <dl className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Total</dt>
            <dd className="font-medium">{formatPriceAmd(total)} AMD</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Paid</dt>
            <dd className="font-medium text-green-600">{formatPriceAmd(paid)} AMD</dd>
          </div>
          {!isPaid && (
            <div className="flex justify-between text-sm">
              <dt className="text-neutral-500">Remaining</dt>
              <dd className="font-medium text-amber-600">
                {formatPriceAmd(remaining)} AMD
              </dd>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <dt className="text-neutral-500">Payment type</dt>
            <dd className="max-w-[14rem] text-right text-neutral-800">
              {needsClientPaymentTypeChoice
                ? "You will choose below"
                : formatOrderPaymentTypeLabel(effectivePaymentType)}
            </dd>
          </div>
        </dl>

        {effectivePaymentType === "SPLIT" && !isPaid && (
          <p className="mt-3 text-sm text-neutral-600">
            {!firstHalfPaid
              ? "Pay the first 50%, then the remaining 50%."
              : "Pay the remaining 50%."}
          </p>
        )}

        {productImageUrl && (
          <div className="relative mt-4 h-40 w-full">
            <Image
              src={productImageUrl}
              alt={order.productTitle}
              fill
              className="rounded object-contain"
              sizes="(max-width: 32rem) 100vw, 512px"
            />
          </div>
        )}

        <div className="mt-6 space-y-3">
          {order.status === ORDER_STATUS.PAYMENT_PROCESSING && !isPaid && (
            <>
              {mockPaymentEnabled ? (
                <MockPaymentHoldActions orderId={order.id} orderToken={order.token} />
              ) : (
                <p className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
                  Payment is being processed. Please check back later.
                </p>
              )}
            </>
          )}
          {needsClientPaymentTypeChoice ? (
            <OrderPaymentTypeChoice token={order.token} totalCents={total} />
          ) : isPaid ? (
            <p className="rounded bg-green-50 py-3 text-center font-medium text-green-800">
              Order is fully paid
            </p>
          ) : order.status === ORDER_STATUS.PAYMENT_PROCESSING ? null : (
            <OrderPayActions
              orderId={order.id}
              paymentType={effectivePaymentType}
              priceCents={order.priceCents}
              paidCents={order.paidCents}
              mockPaymentEnabled={mockPaymentEnabled}
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
