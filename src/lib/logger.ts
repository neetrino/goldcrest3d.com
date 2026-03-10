/**
 * Minimal logger — use instead of console in production paths.
 * Can be replaced with Pino for prod (see TECH_CARD 8.7).
 */

function log(level: string, message: string, err?: unknown) {
  const payload = err !== undefined ? { message, err } : { message };
  if (level === "error") {
    // eslint-disable-next-line no-console
    console.error(`[${level}]`, payload);
  } else {
    // eslint-disable-next-line no-console
    console.info(`[${level}]`, payload);
  }
}

export const logger = {
  info: (message: string) => log("info", message),
  error: (message: string, err?: unknown) => log("error", message, err),
};
