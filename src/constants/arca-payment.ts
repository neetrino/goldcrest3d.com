/** Arca/iPay REST orderStatus: full authorization (payment completed). */
export const ARCA_ORDER_STATUS_PAID = 2;

/** Arca/iPay REST orderStatus: registered but not paid. */
export const ARCA_ORDER_STATUS_REGISTERED = 0;

/** Arca/iPay REST orderStatus: authorization declined. */
export const ARCA_ORDER_STATUS_DECLINED = 6;

/** ISO 4217 numeric code for US dollar (site checkout currency). */
export const ARCA_CURRENCY_USD_NUMERIC = "840";

/** ISO 4217 numeric code for Armenian dram. */
export const ARCA_CURRENCY_AMD_NUMERIC = "051";

/** Default live REST host — IDBank / generic Arca (merchant manual §9). */
export const ARCA_LIVE_API_ORIGIN = "https://ipay.arca.am";

/** EPG merchant portal host (some banks expose REST here). */
export const ARCA_EPG_API_ORIGIN = "https://epg.arca.am";

/** Inecobank gateway (same API shape as Arca). */
export const ARCA_INECOBANK_API_ORIGIN = "https://pg.inecoecom.am";

export const ARCA_REST_REGISTER = "register.do";
export const ARCA_REST_ORDER_STATUS_EXTENDED = "getOrderStatusExtended.do";
