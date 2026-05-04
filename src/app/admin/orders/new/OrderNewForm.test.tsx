import { describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { OrderNewForm } from "./OrderNewForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/app/actions/order", () => ({
  createOrder: vi.fn(() => Promise.resolve(null)),
}));

describe("OrderNewForm", () => {
  it("renders all form fields and submit button", () => {
    render(<OrderNewForm />);

    expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/product image \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price \(\$\)/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /full-only link/i })).toBeChecked();
    expect(
      screen.getByRole("radio", { name: /50\/50-enabled link/i }),
    ).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /save order/i });
    expect(submit).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cancel/i })).toHaveAttribute(
      "href",
      "/admin/orders"
    );
  });

  it("shows lead email suggestions on click when lead emails are provided", () => {
    const { container } = render(
      <OrderNewForm leadEmails={["alpha@example.com", "beta@example.com"]} />,
    );
    const form = container.querySelector("form");
    expect(form).toBeTruthy();
    const emailInput = within(form as HTMLElement).getByRole("combobox");
    act(() => {
      fireEvent.click(emailInput);
    });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "alpha@example.com" }),
    ).toBeInTheDocument();
  });
});
