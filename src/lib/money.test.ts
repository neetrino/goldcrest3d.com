import { describe, expect, it } from "vitest";

import { dollarsToMinorUnits, minorUnitsToDollars } from "@/lib/money";

describe("money", () => {
  it("converts dollars to minor units and back", () => {
    expect(dollarsToMinorUnits(0.01)).toBe(1);
    expect(dollarsToMinorUnits(150)).toBe(15_000);
    expect(minorUnitsToDollars(1)).toBe(0.01);
    expect(minorUnitsToDollars(15_000)).toBe(150);
  });
});
