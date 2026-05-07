/**
 * Minimal logger — use instead of console in production paths.
 * Can be replaced with Pino for prod (see TECH_CARD 8.7).
 *
 * Errors are flattened for `console.error` so devtools never stringify huge Prisma
 * runtime blobs (which can flood the terminal via Next's console interception).
 */

const STACK_PREVIEW_MAX_CHARS = 2500;

/** Safe, compact representation for logs (Prisma / generic Error / unknown). */
function formatErrorForLog(err: unknown): Record<string, string> {
  if (err === null || err === undefined) {
    return { detail: String(err) };
  }
  if (typeof err !== "object") {
    return { detail: String(err) };
  }

  const o = err as Record<string, unknown>;
  const out: Record<string, string> = {};

  if (typeof o.name === "string") out.name = o.name;
  if (typeof o.message === "string") out.message = o.message;
  if (typeof o.code === "string") out.code = o.code;
  if (typeof o.clientVersion === "string") out.clientVersion = o.clientVersion;

  if (o.meta !== undefined) {
    try {
      out.meta = JSON.stringify(o.meta);
    } catch {
      out.meta = "[unserializable]";
    }
  }

  if (typeof o.stack === "string") {
    const s = o.stack;
    out.stack =
      s.length > STACK_PREVIEW_MAX_CHARS ? `${s.slice(0, STACK_PREVIEW_MAX_CHARS)}…` : s;
  }

  if (Object.keys(out).length === 0) {
    const ctor = err.constructor?.name;
    return {
      detail: "[non-enumerable error object]",
      ...(typeof ctor === "string" ? { constructorName: ctor } : {}),
    };
  }

  return out;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function formatContextForLog(ctx: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(ctx)) {
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      out[key] = String(val);
    } else if (val === null || val === undefined) {
      out[key] = String(val);
    } else {
      try {
        out[key] = JSON.stringify(val);
      } catch {
        out[key] = "[unserializable]";
      }
    }
  }
  return out;
}

type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, detail?: unknown) {
  const payload: Record<string, unknown> = { message };

  if (detail !== undefined) {
    if (level === "error") {
      payload.error = formatErrorForLog(detail);
    } else if (isPlainRecord(detail)) {
      payload.context = formatContextForLog(detail);
    } else {
      payload.detail = formatErrorForLog(detail);
    }
  }

  if (level === "error") {
    console.error(`[${level}]`, payload);
  } else if (level === "warn") {
    console.warn(`[${level}]`, payload);
  } else {
    console.info(`[${level}]`, payload);
  }
}

export const logger = {
  info: (message: string) => log("info", message),
  warn: (message: string, detail?: unknown) => log("warn", message, detail),
  error: (message: string, err?: unknown) => log("error", message, err),
};
