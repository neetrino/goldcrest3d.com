import { describe, expect, it } from "vitest";

import { buildPaymentLinkEmailPayload } from "@/lib/email/buildPaymentLinkEmail";

describe("buildPaymentLinkEmailPayload", () => {
  it("uses branded shell, CTA, and footer-style closing", () => {
    const { subject, text, html } = buildPaymentLinkEmailPayload({
      clientName: "Gurgen Ginosyan",
      productTitle: "3D model",
      priceLabel: "$100",
      paymentUrl: "https://example.com/order/tok",
      siteLinkHref: "https://example.com",
      siteHostname: "example.com",
    });
    expect(subject).toBe("Your order is ready for payment | Goldcrest 3D");
    expect(text).toContain("Dear Gurgen Ginosyan");
    expect(text).toContain("secure payment");
    expect(text).toContain("Visit our website:");
    expect(html).toContain("Secure payment");
    expect(html).toContain("Pay securely");
    expect(html).toContain("Order summary");
    expect(html).toContain("https://example.com/order/tok");
    expect(html).toContain("If you have any questions about your order");
  });
});
