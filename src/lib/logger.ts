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

function log(level: string, message: string, err?: unknown) {
  const payload =
    err !== undefined ? { message, error: formatErrorForLog(err) } : { message };
  if (level === "error") {
    console.error(`[${level}]`, payload);
  } else {
    console.info(`[${level}]`, payload);
  }
}

export const logger = {
  info: (message: string) => log("info", message),
  error: (message: string, err?: unknown) => log("error", message, err),
};
