import type {
  ModelingSpecializationCopyPayload,
  ModelingSpecializationCopyRow,
} from "./modeling-specialization-copy.types";

function normalizeMultilineValue(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function normalizeSingleLineValue(value: string): string {
  return value.trim();
}

export function normalizeModelingSpecializationCopyPayload(
  payload: ModelingSpecializationCopyPayload,
): ModelingSpecializationCopyPayload {
  return {
    titleDesktop: normalizeMultilineValue(payload.titleDesktop),
    titleMobile: normalizeMultilineValue(payload.titleMobile),
    bodyDesktop: normalizeMultilineValue(payload.bodyDesktop),
    bodyMobile: normalizeMultilineValue(payload.bodyMobile),
    desktopLine1Emphasis: normalizeSingleLineValue(payload.desktopLine1Emphasis),
  };
}

export function toCopyLines(value: string): string[] {
  const normalized = normalizeMultilineValue(value);
  if (normalized.length === 0) {
    return [];
  }
  return normalized.split("\n");
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
