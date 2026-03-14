/**
 * compress-images.mjs
 *
 * Batch-converts heavy PNG assets in /public to WebP using sharp.
 * This permanently reduces repository size and removes the need for
 * Next.js to serve multi-hundred-KB PNGs at runtime.
 *
 * Usage:
 *   npm install --save-dev sharp   (first time only)
 *   node scripts/compress-images.mjs
 *
 * ⚠️  IMPORTANT: After running this script, update all image src paths
 *     in your source code from .png → .webp.
 *     The script prints a summary of all renamed files for easy search/replace.
 *
 * Quality: 85 (visually lossless for photography, ~80–90% smaller than PNG)
 * Metadata is stripped to avoid c2pa / EXIF data inflating file sizes.
 */

import { readdirSync, statSync, unlinkSync } from 'fs';
import { resolve, extname, basename, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

// Directories containing heavy PNGs we want to compress
const TARGET_DIRS = [
    publicDir,                                      // hero-poster.png, og-image.png
    resolve(publicDir, 'images'),                   // *_bg.png (5 service backgrounds)
    resolve(publicDir, 'portfolio'),                // excavator.png, vhs-motor.png
    resolve(publicDir, 'portfolio/machinery/excavators'),
    resolve(publicDir, 'portfolio/machinery/wheel-loaders'),
    resolve(publicDir, 'portfolio/machinery/bulldozers'),
];

// Dynamically import sharp (ESM)
let sharp;
try {
    sharp = (await import('sharp')).default;
} catch {
    console.error('❌  sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
}

const results = [];
let totalSavedBytes = 0;

for (const dir of TARGET_DIRS) {
    let files;
    try {
        files = readdirSync(dir);
    } catch {
        console.warn(`⚠️  Skipping missing dir: ${relative(publicDir, dir) || '.'}`);
        continue;
    }

    for (const file of files) {
        if (extname(file).toLowerCase() !== '.png') continue;

        const inputPath = resolve(dir, file);
        const outputPath = resolve(dir, basename(file, '.png') + '.webp');

        const before = statSync(inputPath).size;

        try {
            await sharp(inputPath)
                .webp({ quality: 85 })
                .withMetadata(false)        // strip EXIF / c2pa
                .toFile(outputPath);

            const after = statSync(outputPath).size;
            const saved = before - after;
            totalSavedBytes += saved;

            const relInput = relative(publicDir, inputPath);
            const relOutput = relative(publicDir, outputPath);

            results.push({
                from: relInput,
                to: relOutput,
                before: (before / 1024).toFixed(0),
                after: (after / 1024).toFixed(0),
                saved: (saved / 1024).toFixed(0),
                pct: ((saved / before) * 100).toFixed(0),
            });

            // Remove original PNG to avoid serving both
            unlinkSync(inputPath);

        } catch (err) {
            console.error(`  ❌  Failed: ${file} — ${err.message}`);
        }
    }
}

// Print summary table
console.log('\n✅  Image compression complete!\n');
console.log('File'.padEnd(55), 'Before'.padStart(8), 'After'.padStart(8), 'Saved'.padStart(8), ' %');
console.log('─'.repeat(85));
for (const r of results) {
    const arrow = `${r.from} → ${r.to}`;
    console.log(
        arrow.padEnd(55),
        `${r.before} KB`.padStart(8),
        `${r.after} KB`.padStart(8),
        `${r.saved} KB`.padStart(8),
        `${r.pct}%`.padStart(4),
    );
}
console.log('─'.repeat(85));
console.log(`Total saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
console.log('\n📝  Next step: Replace .png → .webp in all src= attributes in /src');
