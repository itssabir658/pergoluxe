/**
 * Generates the committed placeholder imagery for the homepage — abstract,
 * brand-toned architectural gradients with a louver-line motif. These are
 * deliberately abstract (clearly "no photography yet", per the project's
 * honesty-of-placeholder precedent in NAVIGATION.md) rather than fake
 * stock photos, but composed and graded to the brand palette so layouts
 * read correctly until real photography lands.
 *
 * Run once (or after tweaking): `node scripts/generate-placeholders.mjs`
 * Outputs are committed — this script is not part of any build step.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public", "images");

/** Louver motif: evenly spaced rounded beams, slightly rotated. */
function louvers({ width, height, angle, color, opacity, beam = 26, gap = 118 }) {
  const span = Math.max(width, height) * 1.6;
  const count = Math.ceil(span / gap) + 4;
  let rects = "";
  for (let i = 0; i < count; i += 1) {
    const y = -span * 0.3 + i * gap;
    rects += `<rect x="${-span * 0.3}" y="${y}" width="${span * 1.6}" height="${beam}" rx="${beam / 2}" fill="${color}" opacity="${opacity}"/>`;
  }
  return `<g transform="rotate(${angle} ${width / 2} ${height / 2})">${rects}</g>`;
}

function vignette(width, height, strength) {
  return `
    <radialGradient id="vig" cx="50%" cy="42%" r="75%">
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="${strength}"/>
    </radialGradient>
    <rect width="${width}" height="${height}" fill="url(#vig)"/>`;
}

async function heroPoster() {
  const w = 2400;
  const h = 1350;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#171210"/>
        <stop offset="0.5" stop-color="#241b14"/>
        <stop offset="1" stop-color="#3a2a1d"/>
      </linearGradient>
      <linearGradient id="glow" x1="0" y1="1" x2="0.8" y2="0">
        <stop offset="0" stop-color="#a8683d" stop-opacity="0"/>
        <stop offset="1" stop-color="#c9925e" stop-opacity="0.22"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    ${louvers({ width: w, height: h, angle: -7, color: "#d8ab7a", opacity: 0.07, beam: 30, gap: 150 })}
    ${vignette(w, h, 0.55)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(imagesDir, "hero-poster.jpg"));
}

const collectionTones = {
  "attached-pergolas": { from: "#efe6d8", to: "#ddcdb6", angle: 0 },
  "freestanding-pergolas": { from: "#ece4d9", to: "#d6c3ad", angle: 90 },
  "louvered-roofs": { from: "#e9dfd2", to: "#cdb9a0", angle: -14 },
  enclosures: { from: "#f0e9de", to: "#d9cab4", angle: 32 },
};

async function collectionImage(handle, { from, to, angle }) {
  const w = 1200;
  const h = 900;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${louvers({ width: w, height: h, angle, color: "#6d4a2f", opacity: 0.1, beam: 16, gap: 84 })}
    ${vignette(w, h, 0.18)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(path.join(imagesDir, `collection-${handle}.jpg`));
}

await mkdir(imagesDir, { recursive: true });
await heroPoster();
for (const [handle, tone] of Object.entries(collectionTones)) {
  await collectionImage(handle, tone);
}
console.log("Placeholder images written to public/images/");
