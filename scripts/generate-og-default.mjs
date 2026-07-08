import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const width = 1200;
const height = 630;
const out = path.join(__dirname, "../public/Images/og-default.png");

const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="180" fill="#2563eb" opacity="0.25"/>
  <circle cx="160" cy="520" r="220" fill="#38bdf8" opacity="0.12"/>
  <text x="80" y="280" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">Robotics Soc Son</text>
  <text x="80" y="360" fill="#bfdbfe" font-family="Arial, Helvetica, sans-serif" font-size="36">FIRST Tech Challenge · STEM · Ha Noi</text>
  <text x="80" y="520" fill="#93c5fd" font-family="Arial, Helvetica, sans-serif" font-size="28">roboticssocson.minhmice.com</text>
</svg>`;

fs.mkdirSync(path.dirname(out), { recursive: true });

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
