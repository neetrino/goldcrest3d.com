import { describe, expect, it } from "vitest";
import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";
import { ORDER_STATUS } from "@/constants/order-status";
import { resolveOrderPaymentAmount } from "./resolveOrderPaymentAmount";

describe("resolveOrderPaymentAmount", () => {
  it("returns error when payment type is UNSET", () => {
    const result = resolveOrderPaymentAmount(
      {
        status: ORDER_STATUS.PENDING,
        priceCents: 10000,
        paidCents: 0,
        paymentType: ORDER_PAYMENT_TYPE.UNSET,
      },
      undefined,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/choose how you want to pay/i);
    }
  });
});
