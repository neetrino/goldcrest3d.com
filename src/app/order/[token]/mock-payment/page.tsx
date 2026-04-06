import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { isSimulatedPaymentFlow } from "@/lib/payment/config";
import { resolveOrderPaymentAmount } from "@/lib/payment/resolveOrderPaymentAmount";
import { MockPaymentClient } from "./MockPaymentClient";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parsePaymentIndex(
  raw: string | string[] | undefined,
): 0 | 1 | undefined {
  if (raw === undefined) return undefined;
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "0") return 0;
  if (v === "1") return 1;
  return undefined;
}

export default async function MockPaymentPage({ params, searchParams }: Props) {
  if (!isSimulatedPaymentFlow()) {
    notFound();
  }

  const { token: rawToken } = await params;
  const sp = await searchParams;
  const token =
    typeof rawToken === "string" && rawToken.length >= 1 && rawToken.length <= 200
      ? rawToken.trim()
      : "";
  if (!token) notFound();

  const paymentIndex = parsePaymentIndex(sp.paymentIndex);

  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) notFound();

  const resolved = resolveOrderPaymentAmount(order, paymentIndex);
  if (!resolved.ok) {
    redirect(`/order/${encodeURIComponent(token)}`);
  }

  const total = order.priceCents;
  const paid = order.paidCents;
  const isPaid = order.status === "PAID" || paid >= total;
  if (isPaid) {
    redirect(`/order/${encodeURIComponent(token)}`);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        <MockPaymentClient
          orderId={order.id}
          orderToken={order.token}
          amountCents={resolved.amountCents}
          paymentIndex={resolved.paymentIndex}
          productTitle={order.productTitle}
        />
      </div>
      <p className="mt-6 text-center">
        <Link
          href={`/order/${encodeURIComponent(token)}`}
          className="text-sm text-neutral-500 hover:text-neutral-700"
        >
          ← Back to order
        </Link>
      </p>
    </div>
  );
}
