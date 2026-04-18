/**
 * Canonicalize rich HTML fields through the canvas rich-text document model.
 *
 * Dry run:
 *   pnpm tsx scripts/migrate-rich-html-to-canvas.ts
 *
 * Apply updates:
 *   pnpm tsx scripts/migrate-rich-html-to-canvas.ts --apply
 */

import { prisma } from "@/lib/db";
import {
  canvasRichTextDocumentToHtml,
  htmlToCanvasRichTextDocument,
} from "@/lib/canvas-rich-text/canvas-rich-text-document";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

type DiffEntry = {
  entity: string;
  id: string;
  field: string;
  changed: boolean;
};

function normalizeHtml(html: string): string {
  return canvasRichTextDocumentToHtml(htmlToCanvasRichTextDocument(html));
}

async function processPowerBanner(apply: boolean, diffs: DiffEntry[]): Promise<void> {
  const rows = await prisma.powerBannerCopy.findMany();
  for (const row of rows) {
    const body = normalizeHtml(row.body);
    const bodyMobile = normalizeHtml(row.bodyMobile ?? "");
    const changed = body !== row.body || bodyMobile !== (row.bodyMobile ?? "");
    diffs.push({ entity: "PowerBannerCopy", id: row.bannerKey, field: "body/bodyMobile", changed });
    if (!apply || !changed) continue;
    await prisma.powerBannerCopy.update({
      where: { bannerKey: row.bannerKey },
      data: { body, bodyMobile },
    });
  }
}

async function processModelingSlots(apply: boolean, diffs: DiffEntry[]): Promise<void> {
  const rows = await prisma.modelingSlotCopy.findMany();
  for (const row of rows) {
    const body = normalizeHtml(row.body);
    const bodyMobile = normalizeHtml(row.bodyMobile ?? "");
    const changed = body !== row.body || bodyMobile !== (row.bodyMobile ?? "");
    diffs.push({ entity: "ModelingSlotCopy", id: row.slotKey, field: "body/bodyMobile", changed });
    if (!apply || !changed) continue;
    await prisma.modelingSlotCopy.update({
      where: { slotKey: row.slotKey },
      data: { body, bodyMobile },
    });
  }
}

async function processManufacturingIntelligence(apply: boolean, diffs: DiffEntry[]): Promise<void> {
  const rows = await prisma.manufacturingIntelligenceCopy.findMany();
  for (const row of rows) {
    const body = normalizeHtml(row.body);
    const changed = body !== row.body;
    diffs.push({ entity: "ManufacturingIntelligenceCopy", id: row.id, field: "body", changed });
    if (!apply || !changed) continue;
    await prisma.manufacturingIntelligenceCopy.update({
      where: { id: row.id },
      data: { body },
    });
  }
}

async function processManufacturingItems(apply: boolean, diffs: DiffEntry[]): Promise<void> {
  const rows = await prisma.manufacturingSpecializationItemCopy.findMany();
  for (const row of rows) {
    const body = normalizeHtml(row.body);
    const changed = body !== row.body;
    diffs.push({
      entity: "ManufacturingSpecializationItemCopy",
      id: row.itemKey,
      field: "body",
      changed,
    });
    if (!apply || !changed) continue;
    await prisma.manufacturingSpecializationItemCopy.update({
      where: { itemKey: row.itemKey },
      data: { body },
    });
  }
}

async function processFounder(apply: boolean, diffs: DiffEntry[]): Promise<void> {
  const rows = await prisma.founderSectionCopy.findMany();
  for (const row of rows) {
    const body = normalizeHtml(row.body);
    const changed = body !== row.body;
    diffs.push({ entity: "FounderSectionCopy", id: row.id, field: "body", changed });
    if (!apply || !changed) continue;
    await prisma.founderSectionCopy.update({
      where: { id: row.id },
      data: { body },
    });
  }
}

async function main(): Promise<void> {
  const apply = process.argv.includes("--apply");
  const diffs: DiffEntry[] = [];

  try {
    await processPowerBanner(apply, diffs);
    await processModelingSlots(apply, diffs);
    await processManufacturingIntelligence(apply, diffs);
    await processManufacturingItems(apply, diffs);
    await processFounder(apply, diffs);
  } catch (error) {
    if (isMigrationPendingError(error)) {
      console.error(
        "Database schema is behind the code. Run prisma migrations first, then rerun this script.",
      );
      process.exitCode = 1;
      return;
    }
    throw error;
  }

  const changedCount = diffs.filter((d) => d.changed).length;
  const totalCount = diffs.length;

  console.log(`Canvas rich-text migration ${apply ? "apply" : "dry-run"} completed.`);
  console.log(`Rows scanned: ${totalCount}`);
  console.log(`Rows requiring canonicalization: ${changedCount}`);

  for (const diff of diffs.filter((d) => d.changed)) {
    console.log(`- ${diff.entity}:${diff.id} (${diff.field})`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

