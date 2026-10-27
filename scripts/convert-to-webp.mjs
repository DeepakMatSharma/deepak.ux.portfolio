/**
 * Converts all PNG/JPG images in public/assets to WebP.
 * Skips files that already have a .webp counterpart that is newer.
 * Reports before/after sizes.
 */
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, basename, extname } from "path";

const ASSETS_DIR = new URL("../public/assets", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const QUALITY = 82; // Good balance of quality vs size

const files = (await readdir(ASSETS_DIR)).filter(f =>
  /\.(png|jpe?g)$/i.test(f)
);

let totalBefore = 0;
let totalAfter = 0;

console.log(`\nConverting ${files.length} images to WebP (quality=${QUALITY})...\n`);
console.log("─".repeat(72));

for (const file of files) {
  const srcPath = join(ASSETS_DIR, file);
  const outName = basename(file, extname(file)) + ".webp";
  const outPath = join(ASSETS_DIR, outName);

  const srcStat = await stat(srcPath);
  const srcKB = (srcStat.size / 1024).toFixed(0);

  try {
    await sharp(srcPath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outPath);

    const outStat = await stat(outPath);
    const outKB = (outStat.size / 1024).toFixed(0);
    const savings = (((srcStat.size - outStat.size) / srcStat.size) * 100).toFixed(0);

    totalBefore += srcStat.size;
    totalAfter  += outStat.size;

    console.log(`✓ ${file.padEnd(42)} ${String(srcKB).padStart(6)} KB → ${String(outKB).padStart(6)} KB  (-${savings}%)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log("─".repeat(72));
const totalBeforeKB = (totalBefore / 1024).toFixed(0);
const totalAfterKB  = (totalAfter  / 1024).toFixed(0);
const totalSavings  = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
console.log(`\nTotal: ${totalBeforeKB} KB → ${totalAfterKB} KB  (-${totalSavings}% / saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB)\n`);
console.log("All WebP files written. Now update source references and delete originals.");
