import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getAppOrigin, getOrderPaymentUrl } from "./appUrl";

describe("getAppOrigin", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.stubEnv("AUTH_URL", "https://goldcrest.example.com");
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllEnvs();
  });

  it("returns origin from AUTH_URL", () => {
    expect(getAppOrigin()).toBe("https://goldcrest.example.com");
  });

  it("returns empty string when AUTH_URL is missing", () => {
    vi.stubEnv("AUTH_URL", "");
    expect(getAppOrigin()).toBe("");
  });

  it("returns origin when AUTH_URL has path", () => {
    vi.stubEnv("AUTH_URL", "https://goldcrest.example.com/auth");
    expect(getAppOrigin()).toBe("https://goldcrest.example.com");
  });
});

describe("getOrderPaymentUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.stubEnv("AUTH_URL", "https://goldcrest.example.com");
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllEnvs();
  });

  it("returns full payment URL for token", () => {
    expect(getOrderPaymentUrl("abc123")).toBe(
      "https://goldcrest.example.com/order/abc123"
    );
  });

  it("returns empty string when origin is missing", () => {
    vi.stubEnv("AUTH_URL", "");
    expect(getOrderPaymentUrl("abc123")).toBe("");
  });
});
