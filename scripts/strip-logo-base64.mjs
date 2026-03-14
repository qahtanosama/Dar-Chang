/**
 * strip-logo-base64.mjs  (v2)
 *
 * Removes all <image xlink:href="data:image/..."> elements from /public/logo.svg.
 * These are embedded raster PNG bitmaps that inflate the SVG from its true
 * ~30 KB of vector paths to over 1.3 MB of downloaded bloat.
 *
 * Usage:
 *   node scripts/strip-logo-base64.mjs
 *
 * Safe to run multiple times (idempotent).
 */

import { readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, '../public/logo.svg');

const before = statSync(svgPath).size;
let svg = readFileSync(svgPath, 'utf8');

// 1. Strip <metadata>...</metadata> block (c2pa / Adobe Content Credentials header)
svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');

// 2. Strip ALL <image .../> or <image ...></image> elements that carry base64 data
//    These match both self-closing and double-tag forms.
svg = svg.replace(/<image[^>]*(?:xlink:href|href)=["']data:image[\s\S]*?(?:\/?>|<\/image>)/gi, '');

writeFileSync(svgPath, svg, 'utf8');

const after = statSync(svgPath).size;
const saving = ((before - after) / before * 100).toFixed(1);

console.log(`✅  logo.svg stripped successfully`);
console.log(`    Before : ${(before / 1024).toFixed(1)} KB`);
console.log(`    After  : ${(after / 1024).toFixed(1)} KB`);
console.log(`    Saved  : ${((before - after) / 1024).toFixed(1)} KB (${saving}%)`);
