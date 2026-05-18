import { describe, expect, it } from "vitest";

import { ARCA_ORDER_STATUS_PAID } from "@/constants/arca-payment";
import { isArcaPaymentDeposited } from "@/lib/arca/isPaymentDeposited";

describe("isArcaPaymentDeposited", () => {
  it("returns true when paymentState is DEPOSITED", () => {
    expect(
      isArcaPaymentDeposited({
        paymentAmountInfo: { paymentState: "DEPOSITED" },
      }),
    ).toBe(true);
  });

  it("returns true when orderStatus is paid", () => {
    expect(
      isArcaPaymentDeposited({
        orderStatus: ARCA_ORDER_STATUS_PAID,
      }),
    ).toBe(true);
  });

  it("returns false when actionCode is non-zero", () => {
    expect(
      isArcaPaymentDeposited({
        actionCode: 1,
        orderStatus: ARCA_ORDER_STATUS_PAID,
      }),
    ).toBe(false);
  });
});
