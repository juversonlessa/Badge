/**
 * Replaces outer background (same color as corners / connected to image border)
 * with solid white. Use for logos on black or uniform dark backgrounds.
 */
import { Jimp } from "jimp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const FILES = [
  "images/jotalessa.png",
  "images/luzdocerrado.png",
  "images/jlcmkt.png",
  "images/logoDevTec.png",
  "images/CAIES.png",
  "images/projects/training-time-logo.png",
  "images/projects/aura-finance-logo.png",
];

const RGB_TOL = 22;
const ALPHA_TOL = 40;

function matchRef(r, g, b, a, ref) {
  return (
    Math.abs(r - ref.r) <= RGB_TOL &&
    Math.abs(g - ref.g) <= RGB_TOL &&
    Math.abs(b - ref.b) <= RGB_TOL &&
    Math.abs(a - ref.a) <= ALPHA_TOL
  );
}

async function processFile(relativePath) {
  const filePath = join(ROOT, relativePath);
  const img = await Jimp.read(filePath);
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const data = img.bitmap.data;

  function rgbaAt(x, y) {
    const i = (y * w + x) * 4;
    return {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
    };
  }

  const corners = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
  ];
  let ref = { r: 0, g: 0, b: 0, a: 255 };
  for (const [x, y] of corners) {
    const c = rgbaAt(x, y);
    ref.r += c.r;
    ref.g += c.g;
    ref.b += c.b;
    ref.a += c.a;
  }
  ref.r = Math.round(ref.r / 4);
  ref.g = Math.round(ref.g / 4);
  ref.b = Math.round(ref.b / 4);
  ref.a = Math.round(ref.a / 4);

  const visited = new Uint8Array(w * h);
  const queue = [];

  function tryPush(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const i = y * w + x;
    if (visited[i]) return;
    const c = rgbaAt(x, y);
    if (!matchRef(c.r, c.g, c.b, c.a, ref)) return;
    visited[i] = 1;
    queue.push([x, y]);
  }

  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }

  let qi = 0;
  while (qi < queue.length) {
    const [x, y] = queue[qi++];
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neighbors) {
      tryPush(nx, ny);
    }
  }

  for (let i = 0; i < visited.length; i++) {
    if (!visited[i]) continue;
    const j = i * 4;
    data[j] = 255;
    data[j + 1] = 255;
    data[j + 2] = 255;
    data[j + 3] = 255;
  }

  await img.write(filePath);
  console.log("OK", relativePath);
}

for (const f of FILES) {
  await processFile(f);
}
