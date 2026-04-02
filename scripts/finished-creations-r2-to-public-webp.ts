/**
 * Downloads Finished Creations images from public R2 URLs, keeps originals under
 * `public/images/{finished|modeling}/originals/`, writes WebP in `public/images/{finished|modeling}/`.
 * Does not delete or modify objects in R2.
 *
 * Usage:
 *   pnpm exec tsx scripts/finished-creations-r2-to-public-webp.ts --from-db
 *   pnpm exec tsx scripts/finished-creations-r2-to-public-webp.ts --urls-file scripts/finished-creations-urls.txt
 *
 * Requires `.env` / `.env.local`: R2_PUBLIC_URL, and for --from-db: DATABASE_URL.
 */

import { readFile } from "node:fs/promises";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import sharp from "sharp";

const FINISHED_WEBP_QUALITY = 92;

const SECTION_FINISHED_ROW1 = "finished_creations_row1";
const SECTION_FINISHED_ROW2 = "finished_creations_row2";

/** Matches `DEFAULT_FINISHED_ROW1` / `DEFAULT_FINISHED_ROW2` basenames and folders. */
const ROW1_CANONICAL: readonly { base: string; folder: "finished" | "modeling" }[] = [
  { base: "block1-portrait-jewelry", folder: "finished" },
  { base: "block2-ancient-heritage", folder: "finished" },
  { base: "block3-hiphop", folder: "finished" },
  { base: "bridal-engagement", folder: "modeling" },
];

const ROW2_CANONICAL: readonly { base: string; folder: "finished" | "modeling" }[] = [
  { base: "small-block-bridal-1", folder: "finished" },
  { base: "small-block-bridal-2", folder: "finished" },
  { base: "small-block-portrait", folder: "finished" },
  { base: "mechanical-lock-systems", folder: "modeling" },
  { base: "small-block-bridal-1", folder: "finished" },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const PUBLIC_IMAGES = path.join(REPO_ROOT, "public", "images");
const PUBLIC_FINISHED = path.join(PUBLIC_IMAGES, "finished");
const PUBLIC_ORIGINALS_FALLBACK = path.join(PUBLIC_FINISHED, "originals");

function loadDotenv(): void {
  loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
  loadEnv({ path: path.join(REPO_ROOT, ".env") });
}

function getR2PublicUrl(base: string, key: string): string {
  const trimmed = base.replace(/\/$/, "");
  const k = key.replace(/^\//, "");
  return `${trimmed}/${k}`;
}

function safeFileBaseFromUrlOrKey(source: string): string {
  try {
    const u = new URL(source);
    const last = u.pathname.split("/").filter(Boolean).pop() ?? "image";
    return last.replace(/[^a-zA-Z0-9._-]+/g, "_");
  } catch {
    const last = source.split("/").filter(Boolean).pop() ?? "image";
    return last.replace(/[^a-zA-Z0-9._-]+/g, "_");
  }
}

function extFromContentType(contentType: string | null): string {
  if (!contentType) {
    return ".bin";
  }
  const lower = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
  if (lower.includes("jpeg") || lower.includes("jpg")) {
    return ".jpg";
  }
  if (lower.includes("png")) {
    return ".png";
  }
  if (lower.includes("webp")) {
    return ".webp";
  }
  if (lower.includes("gif")) {
    return ".gif";
  }
  return ".bin";
}

async function ensureBaseDirs(): Promise<void> {
  await mkdir(PUBLIC_ORIGINALS_FALLBACK, { recursive: true });
  await mkdir(PUBLIC_FINISHED, { recursive: true });
  await mkdir(path.join(PUBLIC_IMAGES, "modeling"), { recursive: true });
}

async function parseUrlsFile(filePath: string): Promise<string[]> {
  const raw = await readFile(filePath, "utf8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

type NamedJob = { url: string; base: string; folder: "finished" | "modeling" };

async function loadNamedJobsFromDb(): Promise<NamedJob[]> {
  const r2Base = process.env.R2_PUBLIC_URL;
  if (!r2Base) {
    throw new Error("R2_PUBLIC_URL is not set in environment.");
  }
  const { prisma } = await import("../src/lib/db");
  try {
    const [row1, row2] = await Promise.all([
      prisma.siteMediaItem.findMany({
        where: {
          sectionKey: SECTION_FINISHED_ROW1,
          r2ObjectKey: { not: null },
        },
        orderBy: { sortOrder: "asc" },
        select: { r2ObjectKey: true },
      }),
      prisma.siteMediaItem.findMany({
        where: {
          sectionKey: SECTION_FINISHED_ROW2,
          r2ObjectKey: { not: null },
        },
        orderBy: { sortOrder: "asc" },
        select: { r2ObjectKey: true },
      }),
    ]);

    if (row1.length !== ROW1_CANONICAL.length) {
      console.warn(
        `finished row1: DB has ${row1.length} items, expected ${ROW1_CANONICAL.length}; mapping min(lengths).`,
      );
    }
    if (row2.length !== ROW2_CANONICAL.length) {
      console.warn(
        `finished row2: DB has ${row2.length} items, expected ${ROW2_CANONICAL.length}; mapping min(lengths).`,
      );
    }

    const jobs: NamedJob[] = [];
    const n1 = Math.min(row1.length, ROW1_CANONICAL.length);
    for (let i = 0; i < n1; i++) {
      const url = getR2PublicUrl(r2Base, row1[i].r2ObjectKey!);
      jobs.push({ url, base: ROW1_CANONICAL[i].base, folder: ROW1_CANONICAL[i].folder });
    }
    const n2 = Math.min(row2.length, ROW2_CANONICAL.length);
    for (let i = 0; i < n2; i++) {
      const url = getR2PublicUrl(r2Base, row2[i].r2ObjectKey!);
      jobs.push({ url, base: ROW2_CANONICAL[i].base, folder: ROW2_CANONICAL[i].folder });
    }
    return jobs;
  } finally {
    await prisma.$disconnect();
  }
}

async function downloadOne(url: string): Promise<{ buffer: Buffer; contentType: string | null }> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    contentType: res.headers.get("content-type"),
  };
}

type CachedDownload = { buffer: Buffer; contentType: string | null };

async function writeNamedOutputs(jobs: NamedJob[]): Promise<void> {
  const urlCache = new Map<string, CachedDownload>();

  for (const job of jobs) {
    let cached = urlCache.get(job.url);
    if (!cached) {
      cached = await downloadOne(job.url);
      urlCache.set(job.url, cached);
    }

    const publicDir = path.join(PUBLIC_IMAGES, job.folder);
    const originalsDir = path.join(publicDir, "originals");
    await mkdir(originalsDir, { recursive: true });

    const ext = extFromContentType(cached.contentType);
    const originalPath = path.join(originalsDir, `${job.base}${ext}`);
    await writeFile(originalPath, cached.buffer);

    const webpBuffer = await sharp(cached.buffer)
      .webp({ quality: FINISHED_WEBP_QUALITY, effort: 6 })
      .toBuffer();
    const webpPath = path.join(publicDir, `${job.base}.webp`);
    await writeFile(webpPath, webpBuffer);

    console.log(
      `OK: ${job.folder}/${job.base} ← ${job.url}\n  → ${path.relative(REPO_ROOT, originalPath)}\n  → ${path.relative(REPO_ROOT, webpPath)}`,
    );
  }
}

async function processUrlBasenameMode(url: string): Promise<void> {
  const baseName = safeFileBaseFromUrlOrKey(url);
  const baseWithoutExt = baseName.replace(/\.[^.]+$/, "") || "image";

  const { buffer, contentType } = await downloadOne(url);
  const ext = extFromContentType(contentType);
  const originalPath = path.join(PUBLIC_ORIGINALS_FALLBACK, `${baseWithoutExt}${ext}`);

  await writeFile(originalPath, buffer);

  const webpBuffer = await sharp(buffer)
    .webp({ quality: FINISHED_WEBP_QUALITY, effort: 6 })
    .toBuffer();

  const webpPath = path.join(PUBLIC_FINISHED, `${baseWithoutExt}.webp`);
  await writeFile(webpPath, webpBuffer);

  console.log(`OK: ${url}\n  → ${path.relative(REPO_ROOT, originalPath)}\n  → ${path.relative(REPO_ROOT, webpPath)}`);
}

function printHelp(): void {
  console.log(`finished-creations-r2-to-public-webp

  --from-db          Load R2 keys from SiteMediaItem (finished rows), map to landing-defaults filenames
  --urls-file <path> One image URL per line (# comments allowed); names derived from URL basename

R2 bucket objects are not modified.`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  loadDotenv();
  await ensureBaseDirs();

  if (argv.includes("--from-db")) {
    const jobs = await loadNamedJobsFromDb();
    if (jobs.length === 0) {
      console.warn("No finished media rows with R2 keys. Nothing to do.");
      process.exit(0);
    }
    await writeNamedOutputs(jobs);
    return;
  }

  const idx = argv.indexOf("--urls-file");
  if (idx === -1 || !argv[idx + 1]) {
    printHelp();
    process.exit(1);
  }
  const filePath = path.isAbsolute(argv[idx + 1])
    ? argv[idx + 1]
    : path.join(REPO_ROOT, argv[idx + 1]);
  const urls = await parseUrlsFile(filePath);

  if (urls.length === 0) {
    console.warn("No URLs in file.");
    process.exit(0);
  }

  const uniqueUrls = [...new Set(urls)];

  for (const url of uniqueUrls) {
    try {
      await processUrlBasenameMode(url);
    } catch (e) {
      console.error(`FAIL: ${url}`, e);
      process.exitCode = 1;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
