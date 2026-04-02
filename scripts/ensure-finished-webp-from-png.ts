/**
 * Builds local WebP assets for Finished Creations fallbacks from existing PNGs.
 * Run after clone or when PNG sources change: pnpm run assets:ensure-finished-webp
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const WEBP_QUALITY = 92;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const JOBS: readonly { src: string; out: string }[] = [
  {
    src: "public/images/finished/block2-ancient-heritage.png",
    out: "public/images/finished/block2-ancient-heritage.webp",
  },
  {
    src: "public/images/finished/block3-hiphop.png",
    out: "public/images/finished/block3-hiphop.webp",
  },
  {
    src: "public/images/modeling/bridal-engagement.png",
    out: "public/images/modeling/bridal-engagement.webp",
  },
];

async function main(): Promise<void> {
  for (const job of JOBS) {
    const absSrc = path.join(REPO_ROOT, job.src);
    const absOut = path.join(REPO_ROOT, job.out);
    await mkdir(path.dirname(absOut), { recursive: true });
    await sharp(absSrc)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(absOut);
    console.log(`OK ${job.out}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
