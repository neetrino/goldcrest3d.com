import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { OrderEditForm } from "./OrderEditForm";

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

  it("renders form with order data prefilled", () => {
    render(<OrderEditForm order={mockOrder} />);

    expect(screen.getByLabelText(/client name/i)).toHaveValue("Test Client");
    expect(screen.getByLabelText(/client email/i)).toHaveValue(
      "client@example.com"
    );
    expect(screen.getByLabelText(/product title/i)).toHaveValue("Custom model");
    expect(screen.getByLabelText(/price \(amd\)/i)).toHaveValue(25000);
  });

  it("renders FULL and SPLIT payment options", () => {
    render(<OrderEditForm order={mockOrder} />);
    expect(screen.getAllByRole("radio", { name: /^full$/i }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("radio", { name: /split \(50–50\)/i }).length
    ).toBeGreaterThan(0);
  });

  it("shows Update button", () => {
    render(<OrderEditForm order={mockOrder} />);
    const buttons = screen.getAllByRole("button", { name: /^update$/i });
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeInTheDocument();
  });

  it("checks FULL when order paymentType is FULL", () => {
    render(<OrderEditForm order={mockOrder} />);
    const fullRadios = screen.getAllByRole("radio", { name: /^full$/i });
    expect(fullRadios[0]).toBeChecked();
  });

  it("shows SPLIT selected when order paymentType is SPLIT", () => {
    render(
      <OrderEditForm order={{ ...mockOrder, paymentType: "SPLIT" }} />
    );
    const checkedRadios = screen.getAllByRole("radio", { checked: true });
    const hasSplitChecked = checkedRadios.some(
      (el) => el.getAttribute("value") === "SPLIT"
    );
    expect(hasSplitChecked).toBe(true);
  });

  it("when paymentType is UNSET, no payment option is pre-selected", () => {
    render(
      <OrderEditForm order={{ ...mockOrder, paymentType: "UNSET" }} />
    );
    expect(screen.getByRole("radio", { name: /^full$/i })).not.toBeChecked();
    expect(
      screen.getByRole("radio", { name: /split \(50–50\)/i }),
    ).not.toBeChecked();
    expect(
      screen.getByText(/client has not chosen yet/i),
    ).toBeInTheDocument();
  });
});
