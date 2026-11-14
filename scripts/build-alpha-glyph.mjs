// Converte design-ref/alpha-simbolo.png (α escuro em fundo claro) em PNG branco
// com transparência, recortado ao contorno. Uso: node scripts/build-alpha-glyph.mjs
import sharp from "sharp";
const { data, info } = await sharp("design-ref/alpha-simbolo.png").removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[y * W + x] < 140) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
const pad = 4; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
const w = x1 - x0 + 1, h = y1 - y0 + 1, out = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const L = data[(y0 + y) * W + (x0 + x)], a = Math.max(0, Math.min(255, ((235 - L) / (235 - 60)) * 255)), o = (y * w + x) * 4;
  out[o] = out[o + 1] = out[o + 2] = 255; out[o + 3] = a;
}
await sharp(out, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile("public/brand/alpha-glyph.png");
console.log({ w, h });
