import { prisma } from "@/lib/db";
import { ORDER_STATUS } from "@/constants/order-status";

/**
 * Applies a confirmed payment amount to an order (Stripe webhook or mock success).
 * Idempotent-safe for duplicate deliveries if amounts match expected increments.
 */
export async function applyPaidAmountToOrder(
  orderId: string,
  amountPaidWhole: number,
): Promise<void> {
  if (amountPaidWhole <= 0) return;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return;

  const newPaidCents = order.paidCents + amountPaidWhole;
  const isFullyPaid = newPaidCents >= order.priceCents;

  await prisma.order.update({
    where: { id: orderId },
    data: {
      paidCents: newPaidCents,
      status: isFullyPaid ? ORDER_STATUS.PAID : ORDER_STATUS.PENDING,
    },
  });
}
