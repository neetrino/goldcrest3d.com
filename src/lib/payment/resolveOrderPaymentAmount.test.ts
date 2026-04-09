import { describe, expect, it } from "vitest";
import { ORDER_PAYMENT_TYPE } from "@/constants/order-payment";
import { ORDER_PAYMENT_LINK_MODE } from "@/constants/order-payment-link-mode";
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
        paymentLinkMode: ORDER_PAYMENT_LINK_MODE.SPLIT_ENABLED,
      },
      undefined,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/choose how you want to pay/i);
    }
  });

  it("treats UNSET as FULL for full-only links", () => {
    const result = resolveOrderPaymentAmount(
      {
        status: ORDER_STATUS.PENDING,
        priceCents: 10000,
        paidCents: 3000,
        paymentType: ORDER_PAYMENT_TYPE.UNSET,
        paymentLinkMode: ORDER_PAYMENT_LINK_MODE.FULL_ONLY,
      },
      undefined,
    );

    expect(result).toEqual({
      ok: true,
      amountCents: 7000,
      paymentIndex: undefined,
    });
  });
});
