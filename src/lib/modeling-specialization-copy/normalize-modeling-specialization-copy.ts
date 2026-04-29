import {
  clampModelingCopyOffset,
  clampModelingTabletCopyOffset,
} from "@/constants/modeling-specialization-copy-offset";

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
    titleTablet: normalizeMultilineValue(payload.titleTablet),
    bodyTablet: normalizeMultilineValue(payload.bodyTablet),
    titleDesktopOffsetY: clampModelingCopyOffset(payload.titleDesktopOffsetY),
    titleMobileOffsetY: clampModelingCopyOffset(payload.titleMobileOffsetY),
    bodyDesktopOffsetY: clampModelingCopyOffset(payload.bodyDesktopOffsetY),
    bodyMobileOffsetY: clampModelingCopyOffset(payload.bodyMobileOffsetY),
    titleDesktopOffsetX: clampModelingTabletCopyOffset(payload.titleDesktopOffsetX),
    bodyDesktopOffsetX: clampModelingTabletCopyOffset(payload.bodyDesktopOffsetX),
    titleMobileOffsetX: clampModelingTabletCopyOffset(payload.titleMobileOffsetX),
    bodyMobileOffsetX: clampModelingTabletCopyOffset(payload.bodyMobileOffsetX),
    titleTabletOffsetY: clampModelingTabletCopyOffset(payload.titleTabletOffsetY),
    bodyTabletOffsetY: clampModelingTabletCopyOffset(payload.bodyTabletOffsetY),
    titleTabletOffsetX: clampModelingTabletCopyOffset(payload.titleTabletOffsetX),
    bodyTabletOffsetX: clampModelingTabletCopyOffset(payload.bodyTabletOffsetX),
    desktopLine1Emphasis: normalizeSingleLineValue(payload.desktopLine1Emphasis),
    tabletLine1Emphasis: normalizeSingleLineValue(payload.tabletLine1Emphasis),
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
    titleTablet: "",
    bodyTablet: "",
    titleDesktopOffsetY: 0,
    titleMobileOffsetY: 0,
    bodyDesktopOffsetY: 0,
    bodyMobileOffsetY: 0,
    titleDesktopOffsetX: 0,
    bodyDesktopOffsetX: 0,
    titleMobileOffsetX: 0,
    bodyMobileOffsetX: 0,
    titleTabletOffsetY: 0,
    bodyTabletOffsetY: 0,
    titleTabletOffsetX: 0,
    bodyTabletOffsetX: 0,
    desktopLine1Emphasis: "",
    tabletLine1Emphasis: "",
  };
}
