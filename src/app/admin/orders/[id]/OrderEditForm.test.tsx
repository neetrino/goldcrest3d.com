import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { OrderEditForm } from "./OrderEditForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock("@/app/actions/order", () => ({
  updateOrder: vi.fn(() => Promise.resolve(null)),
}));

const mockOrder = {
  id: "ord-1",
  clientName: "Test Client",
  clientEmail: "client@example.com",
  productTitle: "Custom model",
  productImageKey: "orders/ord-1/image.png",
  priceCents: 25000,
  paymentType: "FULL" as const,
  paymentLinkMode: "FULL_ONLY" as const,
  paidCents: 0,
  status: "PENDING" as const,
  paymentLinkSentAt: null as Date | null,
  token: "tok-abc",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("OrderEditForm", () => {
  afterEach(() => {
    cleanup();
  });

  const renderForm = (
    orderOverrides?: Partial<typeof mockOrder>,
    paymentLinkMode: "FULL_ONLY" | "SPLIT_ENABLED" = "FULL_ONLY",
  ) =>
    render(
      <OrderEditForm
        order={{ ...mockOrder, ...orderOverrides }}
        paymentLinkMode={paymentLinkMode}
        onPaymentLinkModeChange={vi.fn()}
      />,
    );

  it("renders form with order data prefilled", () => {
    renderForm();

    expect(screen.getByLabelText(/client name/i)).toHaveValue("Test Client");
    expect(screen.getByLabelText(/client email/i)).toHaveValue(
      "client@example.com"
    );
    expect(screen.getByLabelText(/product title/i)).toHaveValue("Custom model");
    expect(screen.getByLabelText(/price \(\$\)/i)).toHaveValue(25000);
  });

  it("shows Update button", () => {
    renderForm();
    const buttons = screen.getAllByRole("button", { name: /^update$/i });
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeInTheDocument();
  });

  it("does not render payment type radios in edit form", () => {
    renderForm();
    expect(screen.queryByText(/payment type/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: /^full$/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("radio", { name: /split \(50–50\)/i }),
    ).not.toBeInTheDocument();
  });

  it("renders payment link mode radios in edit form", () => {
    renderForm();
    expect(screen.getByRole("radio", { name: /full-only/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /enable 50\/50/i })).toBeInTheDocument();
  });
});
