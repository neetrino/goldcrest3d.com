import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuoteForm } from "./QuoteForm";

vi.mock("@/app/actions/quote", () => ({
  submitQuote: vi.fn(() => Promise.resolve(null)),
}));

describe("QuoteForm", () => {
  it("renders all form fields and submit button", () => {
    render(<QuoteForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/attach file \(optional\)/i)
    ).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /submit request/i });
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveAttribute("type", "submit");
  });

  it("has correct input names for server action", () => {
    render(<QuoteForm />);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute(
      "name",
      "fullName"
    );
    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute("name", "email");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute(
      "name",
      "message"
    );
  });

  it("has accessibility hints for file input", () => {
    render(<QuoteForm />);
    const fileInputs = screen.getAllByLabelText(/attach file \(optional\)/i);
    const fileInput = fileInputs[0];
    expect(fileInput).toHaveAttribute("accept", expect.stringContaining("image/png"));
    expect(fileInput.getAttribute("accept")).toContain("application/pdf");
  });
});
