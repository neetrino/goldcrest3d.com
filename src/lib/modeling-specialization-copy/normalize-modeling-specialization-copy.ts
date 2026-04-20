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

function clampOffset(value: number): number {
  return Math.min(300, Math.max(-300, Math.round(value)));
}

export function normalizeModelingSpecializationCopyPayload(
  payload: ModelingSpecializationCopyPayload,
): ModelingSpecializationCopyPayload {
  return {
    titleDesktop: normalizeMultilineValue(payload.titleDesktop),
    titleMobile: normalizeMultilineValue(payload.titleMobile),
    bodyDesktop: normalizeMultilineValue(payload.bodyDesktop),
    bodyMobile: normalizeMultilineValue(payload.bodyMobile),
    titleDesktopOffsetY: clampOffset(payload.titleDesktopOffsetY),
    titleMobileOffsetY: clampOffset(payload.titleMobileOffsetY),
    bodyDesktopOffsetY: clampOffset(payload.bodyDesktopOffsetY),
    bodyMobileOffsetY: clampOffset(payload.bodyMobileOffsetY),
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
    titleDesktopOffsetY: 0,
    titleMobileOffsetY: 0,
    bodyDesktopOffsetY: 0,
    bodyMobileOffsetY: 0,
    desktopLine1Emphasis: "",
  };
}
