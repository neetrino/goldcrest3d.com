import { describe, expect, it } from "vitest";

import { formatPrice } from "@/lib/formatPrice";

describe("formatPrice", () => {
  it("formats sub-dollar amounts with cents", () => {
    expect(formatPrice(1)).toBe("$0.01");
  });

  it("formats whole-dollar amounts without cents", () => {
    expect(formatPrice(15_000)).toBe("$150");
  });
});
