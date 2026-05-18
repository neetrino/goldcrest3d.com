import {
  ARCA_CURRENCY_USD_NUMERIC,
  ARCA_EPG_API_ORIGIN,
  ARCA_INECOBANK_API_ORIGIN,
  ARCA_LIVE_API_ORIGIN,
} from "@/constants/arca-payment";

export type ArcaBank = "idbank" | "inecobank" | "epg";

export type ArcaConfig = {
  apiOrigin: string;
  userName: string;
  password: string;
  currencyCode: string;
  language: string;
  force3ds2: boolean;
};

function resolveArcaBank(): ArcaBank {
  const bank = process.env.ARCA_BANK?.trim().toLowerCase();
  if (bank === "inecobank") return "inecobank";
  if (bank === "idbank") return "idbank";
  return "epg";
}

function resolveApiOrigin(bank: ArcaBank): string {
  const override = process.env.ARCA_API_BASE_URL?.trim().replace(/\/$/, "");
  if (override) return override;

  if (bank === "epg") return ARCA_EPG_API_ORIGIN;
  if (bank === "inecobank") return ARCA_INECOBANK_API_ORIGIN;

  return ARCA_LIVE_API_ORIGIN;
}

function resolveCredentials(): {
  userName: string | undefined;
  password: string | undefined;
} {
  return {
    userName:
      process.env.ARCA_API_USERNAME?.trim() ||
      process.env.ARCA_USERNAME?.trim(),
    password:
      process.env.ARCA_API_PASSWORD?.trim() ||
      process.env.ARCA_PASSWORD?.trim(),
  };
}

/**
 * Arca/iPay REST credentials and options from environment.
 * Returns null when username or password is missing.
 */
export function getArcaConfig(): ArcaConfig | null {
  const { userName, password } = resolveCredentials();
  if (!userName || !password) return null;

  const bank = resolveArcaBank();

  const currencyRaw = process.env.ARCA_CURRENCY_CODE?.trim();
  const currencyCode =
    currencyRaw && /^\d{3}$/.test(currencyRaw)
      ? currencyRaw
      : ARCA_CURRENCY_USD_NUMERIC;

  const langRaw = process.env.ARCA_LANGUAGE?.trim().toLowerCase();
  const language =
    langRaw === "hy" || langRaw === "en" || langRaw === "ru" ? langRaw : "en";

  const force3ds2 =
    process.env.ARCA_FORCE_3DS2?.trim().toLowerCase() !== "false";

  return {
    apiOrigin: resolveApiOrigin(bank),
    userName,
    password,
    currencyCode,
    language,
    force3ds2,
  };
}

export function isArcaConfigured(): boolean {
  return getArcaConfig() !== null;
}
