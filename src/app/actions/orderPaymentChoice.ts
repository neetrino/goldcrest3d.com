"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";

export type SetOrderPaymentTypeResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Public server action: client picks FULL or SPLIT before checkout (orders created with UNSET).
 */
export async function setOrderPaymentTypeByToken(
  token: string,
  paymentType: "FULL" | "SPLIT",
): Promise<SetOrderPaymentTypeResult> {
  const t = typeof token === "string" ? token.trim() : "";
  if (!t) return { success: false, error: "Invalid link." };

  if (paymentType !== "FULL" && paymentType !== "SPLIT") {
    return { success: false, error: "Invalid payment option." };
  }

  try {
    const order = await prisma.order.findUnique({ where: { token: t } });
    if (!order) return { success: false, error: "Order not found." };

    if (order.paymentType !== ORDER_PAYMENT_TYPE.UNSET) {
      return { success: false, error: "Payment type is already set." };
    }
    if (order.paidCents > 0) {
      return {
        success: false,
        error:
          "Payment type cannot be changed after a payment has been recorded.",
      };
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentType },
    });

    revalidatePath(`/order/${t}`);
    return { success: true };
  } catch (err) {
    logger.error("setOrderPaymentTypeByToken failed", err);
    return {
      success: false,
      error: "Could not save your choice. Please try again.",
    };
  }
}
