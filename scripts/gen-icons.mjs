// Generates PWA icons (PNG) with zero dependencies, using only Node's zlib.
// Draws a green rounded square with a white "card" in the center.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public');

// --- CRC32 ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function png(size, pixelFn) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size);
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filter none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x, y, size);
      raw[p++] = r; raw[p++] = g; raw[p++] = b; raw[p++] = a;
    }
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function inRoundRect(x, y, size, inset, radius) {
  const x0 = inset, y0 = inset, x1 = size - inset, y1 = size - inset;
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.min(Math.max(x, x0 + radius), x1 - radius);
  const cy = Math.min(Math.max(y, y0 + radius), y1 - radius);
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

function icon(size) {
  return png(size, (x, y, s) => {
    const u = s / 512; // scale factor
    // background: green rounded square
    if (!inRoundRect(x, y, s, 8 * u, 120 * u)) return [0, 0, 0, 0];
    // white "card" centered
    const cw = 300 * u, ch = 210 * u;
    const cx0 = (s - cw) / 2, cy0 = (s - ch) / 2;
    if (x >= cx0 && x <= cx0 + cw && y >= cy0 && y <= cy0 + ch) {
      // green horizontal "text" lines inside the card
      const lineH = 26 * u;
      for (let i = 0; i < 3; i++) {
        const ly = cy0 + 55 * u + i * 55 * u;
        if (y >= ly && y <= ly + lineH && x >= cx0 + 45 * u && x <= cx0 + cw - 45 * u) {
          return [88, 204, 110, 255]; // darker green lines
        }
      }
      return [255, 255, 255, 255];
    }
    return [88, 204, 110, 255]; // brand green (#58CC6E-ish)
  });
}

mkdirSync(OUT, { recursive: true });
for (const size of [192, 512]) {
  const file = join(OUT, `icon-${size}.png`);
  writeFileSync(file, icon(size));
  console.log('wrote', file);
}