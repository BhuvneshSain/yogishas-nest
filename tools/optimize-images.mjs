#!/usr/bin/env node
// Lightweight, safe image optimization pipeline.
// - Generates WebP/AVIF alongside existing JPG/PNG images
// - Creates a few responsive sizes for hero and gallery assets
// - Gracefully no-ops if `sharp` is not installed (so dev doesn't break)

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

const root = process.cwd();
const pubDir = path.join(root, 'public');

async function hasSharp() {
  try {
    await import('sharp');
    return true;
  } catch (e) {
    return false;
  }
}

function listPublicImages() {
  const entries = fs.readdirSync(pubDir, { withFileTypes: true });
  const allow = new Set(['.jpg', '.jpeg', '.png']);
  return entries
    .filter(d => d.isFile())
    .map(d => d.name)
    .filter(n => allow.has(path.extname(n).toLowerCase()))
    // Focus on infra and gallery for now
    .filter(n => /^(infra|gallery\d+)\.(jpe?g|png)$/i.test(n));
}

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function fileIsNewer(src, out) {
  try {
    const [a, b] = await Promise.all([fsp.stat(src), fsp.stat(out)]);
    return a.mtimeMs > b.mtimeMs;
  } catch {
    return true; // if output missing, treat as newer
  }
}

async function processImage(sharp, file) {
  const srcPath = path.join(pubDir, file);
  const base = file.replace(/\.(jpe?g|png)$/i, '');

  const isHero = /^infra\./i.test(file);
  const isGallery = /^gallery\d+\./i.test(file);

  const sizes = isHero ? [768, 1280, 1600] : isGallery ? [800, 1024, 1400] : [];

  const tasks = [];

  // Single full-size conversions
  for (const fmt of ['webp', 'avif']) {
    const out = path.join(pubDir, `${base}.${fmt}`);
    if (await fileIsNewer(srcPath, out)) {
      const img = sharp(srcPath);
      const cfg = fmt === 'webp' ? { quality: 72 } : { quality: 50 };
      tasks.push(img.toFormat(fmt, cfg).toFile(out));
    }
  }

  // Responsive sizes for hero/gallery
  for (const w of sizes) {
    for (const fmt of ['webp', 'avif']) {
      const out = path.join(pubDir, `${base}-${w}.${fmt}`);
      if (await fileIsNewer(srcPath, out)) {
        const img = sharp(srcPath).resize({ width: w, withoutEnlargement: true });
        const cfg = fmt === 'webp' ? { quality: 70 } : { quality: 48 };
        tasks.push(img.toFormat(fmt, cfg).toFile(out));
      }
    }
  }

  await Promise.all(tasks);
}

async function main() {
  const available = await hasSharp();
  if (!available) {
    console.log('[images] `sharp` not installed — skipping optimization.');
    return; // Do not fail the build/dev
  }
  const sharp = (await import('sharp')).default;
  await ensureDir(pubDir);
  const files = listPublicImages();
  if (!files.length) {
    console.log('[images] No target images found in /public.');
    return;
  }
  const start = Date.now();
  await Promise.all(files.map(f => processImage(sharp, f)));
  const ms = Date.now() - start;
  console.log(`[images] Optimized ${files.length} base images in ${ms}ms.`);
}

main().catch(err => {
  console.warn('[images] Optimization failed:', err?.message || err);
});

