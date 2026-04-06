import { describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { OrderNewClientEmailField } from "./OrderNewClientEmailField";

describe("OrderNewClientEmailField", () => {
  it("opens the suggestion list on click when lead emails exist", () => {
    render(
      <OrderNewClientEmailField
        leadEmails={["alpha@example.com"]}
        disabled={false}
        inputClassName=""
      />,
    );
    const input = screen.getByRole("combobox");
    act(() => {
      fireEvent.click(input);
    });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });
});
