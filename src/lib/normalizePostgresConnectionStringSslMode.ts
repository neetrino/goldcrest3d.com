/**
 * pg v8 / pg-connection-string v2-ը Node warning է տալիս, երբ `sslmode`-ը `require`, `prefer` կամ `verify-ca` է
 * (ներկայումս դրանք համարվում են `verify-full` անալոգներ, մինչև pg v9 libpq-ին հավասարեցումը)։
 * `sslmode=verify-full` — նույն TLS ստուգումը, առանց warning-ի։
 *
 * @see https://www.postgresql.org/docs/current/libpq-ssl.html
 */
export function normalizePostgresConnectionStringSslMode(
  connectionString: string,
): string {
  try {
    const url = new URL(connectionString);
    const mode = url.searchParams.get("sslmode");
    if (mode == null) {
      return connectionString;
    }
    const lower = mode.toLowerCase();
    if (lower === "require" || lower === "prefer" || lower === "verify-ca") {
      url.searchParams.set("sslmode", "verify-full");
      return url.toString();
    }
    return connectionString;
  } catch {
    return connectionString;
  }
}
