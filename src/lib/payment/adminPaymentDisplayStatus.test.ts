import { describe, expect, it } from "vitest";
import { ORDER_STATUS } from "@/constants/order-status";
import {
  ADMIN_ORDER_PAYMENT_BADGE_KIND,
  getAdminOrderPaymentBadgeKind,
} from "./adminPaymentDisplayStatus";

describe("getAdminOrderPaymentBadgeKind", () => {
  it("returns paid when status is PAID", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PAID,
        paymentType: "SPLIT",
        priceCents: 10_000,
        paidCents: 5_000,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PAID);
  });

  it("returns paid when paidCents meets or exceeds price (data consistency)", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PENDING,
        paymentType: "SPLIT",
        priceCents: 10_000,
        paidCents: 10_000,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PAID);
  });

  it("returns payment_processing when status is PAYMENT_PROCESSING (before partial badge)", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PAYMENT_PROCESSING,
        paymentType: "SPLIT",
        priceCents: 10_000,
        paidCents: 5_000,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PAYMENT_PROCESSING);
  });

  it("returns partially_paid for SPLIT when first half is paid but not full", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PENDING,
        paymentType: "SPLIT",
        priceCents: 10_001,
        paidCents: 5_000,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PARTIALLY_PAID);
  });

  it("returns pending for SPLIT when nothing paid yet", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PENDING,
        paymentType: "SPLIT",
        priceCents: 10_000,
        paidCents: 0,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PENDING);
  });

  it("returns pending for FULL when unpaid", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PENDING,
        paymentType: "FULL",
        priceCents: 10_000,
        paidCents: 0,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PENDING);
  });

  it("does not use partially_paid for FULL even if partial paidCents (non-split)", () => {
    expect(
      getAdminOrderPaymentBadgeKind({
        status: ORDER_STATUS.PENDING,
        paymentType: "FULL",
        priceCents: 10_000,
        paidCents: 3_000,
      }),
    ).toBe(ADMIN_ORDER_PAYMENT_BADGE_KIND.PENDING);
  });
});
