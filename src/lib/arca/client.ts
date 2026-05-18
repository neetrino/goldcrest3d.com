import type { ArcaConfig } from "@/lib/arca/config";
import type {
  ArcaOrderStatusExtendedResponse,
  ArcaRegisterResponse,
} from "@/lib/arca/types";
import { logger } from "@/lib/logger";

const ARCA_FETCH_TIMEOUT_MS = 30_000;

function normalizeErrorCode(value: string | number | undefined): string {
  if (value === undefined || value === null) return "";
  return String(value);
}

/** True when Arca reports no system error (errorCode 0 or missing). */
export function isArcaApiSuccess(errorCode: string | number | undefined): boolean {
  const code = normalizeErrorCode(errorCode);
  return code === "" || code === "0";
}

/**
 * Arca REST — POST `application/x-www-form-urlencoded` (merchant manual §7).
 */
async function arcaPostJson<T extends Record<string, unknown>>(
  config: ArcaConfig,
  methodPath: string,
  params: Record<string, string>,
): Promise<T> {
  const url = `${config.apiOrigin}/payment/rest/${methodPath}`;
  const body = new URLSearchParams(params);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ARCA_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Arca HTTP ${response.status}`);
    }

    const parsed = (await response.json()) as T;
    return parsed;
  } catch (err) {
    logger.error("Arca REST request failed", { methodPath, err });
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export async function arcaRegisterOrder(
  config: ArcaConfig,
  params: {
    orderNumber: string;
    amountMinor: number;
    returnUrl: string;
    failUrl?: string;
    description: string;
    pageView: "DESKTOP" | "MOBILE";
  },
): Promise<ArcaRegisterResponse> {
  const fields: Record<string, string> = {
    userName: config.userName,
    password: config.password,
    orderNumber: params.orderNumber,
    amount: String(params.amountMinor),
    currency: config.currencyCode,
    returnUrl: params.returnUrl,
    description: params.description.slice(0, 99),
    language: config.language,
    pageView: params.pageView,
  };

  if (config.force3ds2) {
    fields.jsonParams = JSON.stringify({ FORCE_3DS2: "true" });
  }

  if (params.failUrl) {
    fields.failUrl = params.failUrl;
  }

  return arcaPostJson<ArcaRegisterResponse>(config, "register.do", fields);
}

export async function arcaGetOrderStatusExtended(
  config: ArcaConfig,
  arcaOrderId: string,
): Promise<ArcaOrderStatusExtendedResponse> {
  return arcaPostJson<ArcaOrderStatusExtendedResponse>(
    config,
    "getOrderStatusExtended.do",
    {
      userName: config.userName,
      password: config.password,
      orderId: arcaOrderId,
      language: config.language,
    },
  );
}
