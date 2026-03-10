import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderNewForm } from "./OrderNewForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/app/actions/order", () => ({
  createOrder: vi.fn(() => Promise.resolve(null)),
  FORM_FIELD_PRODUCT_IMAGE: "productImage",
}));

describe("OrderNewForm", () => {
  it("renders all form fields and submit button", () => {
    render(<OrderNewForm />);

    expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product image \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price \(amd\)/i)).toBeInTheDocument();

    expect(screen.getByRole("radio", { name: /full \(full\)/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /50–50 \(split\)/i })).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /save order/i });
    expect(submit).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cancel/i })).toHaveAttribute(
      "href",
      "/admin/orders"
    );
  });

  it("FULL payment type is selected by default", () => {
    render(<OrderNewForm />);
    const fullRadios = screen.getAllByRole("radio", { name: /full \(full\)/i });
    expect(fullRadios.length).toBeGreaterThan(0);
    expect(fullRadios[0]).toBeChecked();
  });
});
