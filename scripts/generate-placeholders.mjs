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

/**
 * Final CTA closing image — the strategy doc calls for "the single best
 * project photo on the site," but every project tile is already shown in
 * Featured Projects, so re-using one full-bleed here would read as the
 * same asset twice on one page. This is deliberately warmer/brighter than
 * the hero (golden-hour amber vs. the hero's dark bronze-black) so the
 * page's last visual beat feels like a distinct, optimistic close rather
 * than a variation of the opening image.
 */
async function finalCta() {
  const w = 2400;
  const h = 1350;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#2b1c10"/>
        <stop offset="0.55" stop-color="#5c3d1f"/>
        <stop offset="1" stop-color="#a8712f"/>
      </linearGradient>
      <linearGradient id="glow" x1="0" y1="1" x2="1" y2="0.2">
        <stop offset="0" stop-color="#f2b969" stop-opacity="0"/>
        <stop offset="1" stop-color="#f6cf8e" stop-opacity="0.32"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    ${louvers({ width: w, height: h, angle: -5, color: "#3a2410", opacity: 0.1, beam: 30, gap: 150 })}
    ${vignette(w, h, 0.5)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(imagesDir, "final-cta.jpg"));
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

/**
 * Configurator finish previews — one per colour option, same composition
 * with the tone family swapped, so the crossfade on finish selection reads
 * as "the same structure in a different finish" rather than a scene change.
 */
const configuratorFinishes = {
  graphite: { from: "#2b2e31", to: "#43474c", line: "#9aa0a6", opacity: 0.14 },
  bronze: { from: "#3a2a1d", to: "#584028", line: "#d8ab7a", opacity: 0.12 },
  alpine: { from: "#e9e7e2", to: "#cfccc4", line: "#7d7a72", opacity: 0.16 },
};

async function configuratorImage(finish, { from, to, line, opacity }) {
  const w = 1600;
  const h = 1200;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${louvers({ width: w, height: h, angle: -10, color: line, opacity, beam: 34, gap: 130 })}
    ${vignette(w, h, 0.28)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(path.join(imagesDir, `configurator-${finish}.jpg`));
}

/** Featured-project tiles — varied tone/angle so a gallery of six reads as
 * six different installs, not one image repeated. */
const projectTones = [
  {
    slug: "hill-country-poolside",
    from: "#31281e",
    to: "#4d3b28",
    line: "#d8ab7a",
    angle: -8,
    opacity: 0.09,
  },
  {
    slug: "lakeside-outdoor-kitchen",
    from: "#efe7db",
    to: "#d3c2ab",
    line: "#6d4a2f",
    angle: 14,
    opacity: 0.11,
  },
  {
    slug: "courtyard-restaurant-canopy",
    from: "#2c2e2b",
    to: "#494c44",
    line: "#aab0a2",
    angle: 0,
    opacity: 0.12,
  },
  {
    slug: "desert-modern-retreat",
    from: "#e9ddc9",
    to: "#cdb694",
    line: "#7a5c3d",
    angle: -20,
    opacity: 0.12,
  },
  {
    slug: "rooftop-terrace-lounge",
    from: "#33302c",
    to: "#544c41",
    line: "#c9b08a",
    angle: 26,
    opacity: 0.1,
  },
  {
    slug: "garden-pavilion",
    from: "#e6e8df",
    to: "#c3c9b4",
    line: "#5d6b4f",
    angle: 8,
    opacity: 0.12,
  },
];

async function projectImage({ slug, from, to, line, angle, opacity }) {
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
    ${louvers({ width: w, height: h, angle, color: line, opacity, beam: 18, gap: 92 })}
    ${vignette(w, h, 0.22)}
  </svg>`;
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(path.join(imagesDir, `project-${slug}.jpg`));
}

await mkdir(imagesDir, { recursive: true });
await heroPoster();
await finalCta();
for (const [handle, tone] of Object.entries(collectionTones)) {
  await collectionImage(handle, tone);
}
for (const [finish, tone] of Object.entries(configuratorFinishes)) {
  await configuratorImage(finish, tone);
}
for (const tone of projectTones) {
  await projectImage(tone);
}
console.log("Placeholder images written to public/images/");
