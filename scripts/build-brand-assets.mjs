// Gera versões da logo oficial com fundo transparente, ícones e a imagem Open Graph.
// A logo NÃO é redesenhada: os pixels claros do arquivo original viram branco com
// transparência proporcional à luminosidade, preservando forma e proporções.
//
// Uso: node scripts/build-brand-assets.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "design-ref/logo-original.jpg";
mkdirSync("public/brand", { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const cx = W / 2, cy = H / 2, inner = W * 0.43; // área interna do círculo preto

const lum = (i) => 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

function bbox(filter) {
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (Math.hypot(x - cx, y - cy) > inner || !filter(x, y)) continue;
    if (lum((y * W + x) * 3) > 150) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  }
  return { x0, y0, x1, y1 };
}

// Separa o símbolo (parte de cima) do nome (parte de baixo) pela maior faixa vazia.
const rows = new Array(H).fill(0);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++)
  if (Math.hypot(x - cx, y - cy) <= inner && lum((y * W + x) * 3) > 150) rows[y]++;
const inkRows = rows.map((n, y) => (n > 0 ? y : -1)).filter((y) => y >= 0);
let best = { len: 0, mid: 0 };
for (let i = 1; i < inkRows.length; i++) {
  const len = inkRows[i] - inkRows[i - 1];
  if (len > best.len) best = { len, mid: (inkRows[i] + inkRows[i - 1]) / 2 };
}
const split = Math.round(best.mid);
const markBox = bbox((x, y) => y < split);
const fullBox = bbox(() => true);
console.log({ split, markBox, fullBox });

async function extract(box, pad, out, outWidth) {
  const w = box.x1 - box.x0 + 1 + pad * 2, h = box.y1 - box.y0 + 1 + pad * 2;
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const sx = box.x0 - pad + x, sy = box.y0 - pad + y;
    const L = lum((sy * W + sx) * 3);
    const a = Math.max(0, Math.min(255, ((L - 45) / (215 - 45)) * 255));
    const o = (y * w + x) * 4;
    buf[o] = buf[o + 1] = buf[o + 2] = 255; buf[o + 3] = a;
  }
  let img = sharp(buf, { raw: { width: w, height: h, channels: 4 } });
  if (outWidth) img = img.resize({ width: outWidth });
  await img.png({ compressionLevel: 9 }).toFile(out);
  return { w, h };
}

const mark = await extract(markBox, 4, "public/brand/logo-mark.png", 256);
const full = await extract(fullBox, 6, "public/brand/logo-full.png", 640);
const wordBox = bbox((x, y) => y > split);
const word = await extract(wordBox, 3, "public/brand/logo-wordmark.png", 480);
console.log("mark", mark, "full", full, "wordmark", word, wordBox);

// Ícones a partir da logo oficial circular (recorte do círculo).
const circle = Buffer.from(`<svg width="${W}" height="${H}"><circle cx="${cx}" cy="${cy}" r="${W * 0.475}" fill="#fff"/></svg>`);
const masked = await sharp(SRC).ensureAlpha().composite([{ input: circle, blend: "dest-in" }]).png().toBuffer();
const round = await sharp(masked)
  .extract({ left: Math.round(cx - W * 0.475), top: Math.round(cy - W * 0.475), width: Math.round(W * 0.95), height: Math.round(W * 0.95) })
  .png().toBuffer();
await sharp(round).resize(512, 512).png().toFile("public/brand/logo-circle-512.png");
await sharp(round).resize(192, 192).png().toFile("src/app/icon.png");
// Apple icon: fundo sólido (iOS não aceita transparência).
const markBuf = await sharp("public/brand/logo-mark.png").resize({ width: 120 }).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#050505" } })
  .composite([{ input: markBuf, gravity: "center" }]).png().toFile("src/app/apple-icon.png");

// Open Graph 1200x630
const ogLogo = await sharp("public/brand/logo-full.png").resize({ width: 420 }).toBuffer();
const ogBg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="38%" r="60%"><stop offset="0" stop-color="#1c1c1c"/><stop offset="1" stop-color="#050505"/></radialGradient>
    <pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.05"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#p)"/>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#929292" letter-spacing="1">Criação de sites profissionais para empresas</text>
</svg>`);
await sharp(ogBg).composite([{ input: ogLogo, top: 120, left: 390 }]).png().toFile("public/og-image.png");
console.log("ok");
