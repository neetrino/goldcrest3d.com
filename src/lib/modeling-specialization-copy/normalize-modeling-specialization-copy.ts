import type {
  ModelingSpecializationCopyPayload,
  ModelingSpecializationCopyRow,
} from "./modeling-specialization-copy.types";

function normalizeMultilineValue(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

function normalizeSingleLineValue(value: string): string {
  return value.trim();
}

export function normalizeModelingSpecializationCopyPayload(
  payload: ModelingSpecializationCopyPayload,
): ModelingSpecializationCopyPayload {
  return {
    titleDesktop: normalizeSingleLineValue(payload.titleDesktop),
    titleMobile: normalizeSingleLineValue(payload.titleMobile),
    bodyDesktop: normalizeMultilineValue(payload.bodyDesktop),
    bodyMobile: normalizeMultilineValue(payload.bodyMobile),
    desktopLine1Emphasis: normalizeSingleLineValue(payload.desktopLine1Emphasis),
  };
}

export function toCopyLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function emptyModelingSpecializationCopyRow(
  slotKey: ModelingSpecializationCopyRow["slotKey"],
): ModelingSpecializationCopyRow {
  return {
    slotKey,
    titleDesktop: "",
    titleMobile: "",
    bodyDesktop: "",
    bodyMobile: "",
    desktopLine1Emphasis: "",
  };
}
