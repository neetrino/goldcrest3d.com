import { describe, expect, it } from "vitest";

import { buildPaymentThankYouEmailPayload } from "@/lib/email/buildPaymentThankYouEmail";

const base = {
  clientName: "Jane Doe",
  productTitle: "Custom CAD package",
  amountThisChargeWhole: 500,
  paidCents: 500,
  priceCents: 1000,
  orderPageUrl: "https://example.com/order/tok",
  siteLinkHref: "https://example.com",
  siteHostname: "example.com",
};

describe("buildPaymentThankYouEmailPayload", () => {
  it("uses partial-payment subject and new copy for balance", () => {
    const { subject, text, html } = buildPaymentThankYouEmailPayload(base);
    expect(subject).toContain("we received your payment");
    expect(text).toContain("$500");
    expect(text).toContain("Remaining balance: $500");
    expect(text).toContain("We're happy to confirm");
    expect(html).toContain("Remaining balance:");
    expect(html).toContain("https://example.com/order/tok");
    expect(text).not.toMatch(/Reference:\s*Order/i);
    expect(html).not.toMatch(/Reference:\s*Order/i);
  });

  it("uses fully-paid subject and new copy when settled", () => {
    const { subject, text, html } = buildPaymentThankYouEmailPayload({
      ...base,
      paidCents: 1000,
      amountThisChargeWhole: 500,
    });
    expect(subject).toContain("fully paid");
    expect(text).toContain("We're pleased to confirm");
    expect(text).toContain("excited to work on your project");
    expect(html).toContain("fully paid");
    expect(html).not.toContain("Remaining balance:");
    expect(text).not.toMatch(/Reference:\s*Order/i);
    expect(html).not.toMatch(/Reference:\s*Order/i);
  });
});
