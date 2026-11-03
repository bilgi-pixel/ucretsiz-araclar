// design-tokens.json ile ba.css :root bloğunu karşılaştırır.
// Her token'ın $extensions["ba.css"] adı CSS'te aynı değerle bulunmalı.
// Kullanım: node scripts/check-tokens.mjs  (hata varsa çıkış kodu 1)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'web/assets/design-tokens.json'), 'utf8'));
const css = readFileSync(join(root, 'web/assets/css/ba.css'), 'utf8');

// İlk :root { … } bloğundaki özel özellikleri topla (iç içe parantez yok).
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
const cssVars = new Map();
for (const m of rootBlock.matchAll(/(--[\w-]+)\s*:\s*([\s\S]*?);(?=\s*(?:--|color-scheme|\/\*|$))/g)) {
  cssVars.set(m[1], m[2]);
}

// Karşılaştırma: küçük harf, tırnaksız, tek boşluk, "0.2" → ".2"
const norm = (s) => String(s).toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').replace(/\b0\.(\d)/g, '.$1').trim();
const toCss = (t) => {
  const v = t.$value;
  if (Array.isArray(v) && t.$type === 'cubicBezier') return `cubic-bezier(${v.join(', ')})`;
  if (Array.isArray(v)) return v.map((x) => (/[ -]/.test(x) ? `"${x}"` : x)).join(', ');
  if (t.$type === 'duration') return String(v).endsWith('ms') ? `${parseFloat(v) / 1000}s`.replace(/^0\./, '.') : v;
  return v;
};

let checked = 0; const errors = [];
(function walk(node, path) {
  if (!node || typeof node !== 'object') return;
  const name = node.$extensions?.['ba.css'];
  if (name && '$value' in node) {
    checked++;
    const want = norm(toCss(node));
    const have = cssVars.has(name) ? norm(cssVars.get(name)) : undefined;
    if (have === undefined) errors.push(`${path}: ${name} ba.css :root içinde yok`);
    else if (have !== want) errors.push(`${path}: ${name}\n    json: ${want}\n    css : ${have}`);
    return;
  }
  for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v, path ? `${path}.${k}` : k);
})(tokens, '');

if (errors.length) {
  console.error(`✗ ${errors.length} uyumsuz token (${checked} denetlendi):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${checked} token ba.css ile eşleşiyor.`);
