// Hareket katmanını (docs/TASARIM.md §5) ba.css'e ve web/ altındaki TÜM HTML sayfalarına uygular.
// Tekrar çalıştırılabilir: zaten uygulanmış sayfayı ve CSS'i atlar. Yeni araç/rehber sayfası eklenince
// yeniden çalıştırmak yeterli:  node scripts/apply-motion.mjs
//
// Sayfa başına yapılanlar:
//   1. <head>: viewport'tan sonra html.ba-js (+ sayfa görünürse html.ba-in) ekleyen tek satırlık betik
//   2. </body> öncesi: <script type="module" src="…/assets/js/motion.js">
//   3. .ba-logo içindeki <img> → <span class="ba-logo-img"> (parıltı)
//   4. Hub h1 iki satır + .ba-grad + daktilo satırı; araç sayfalarında (.ba-hero-tool) h1'in anahtar parçası .ba-grad
// ba.css: :root'a --ba-dur-*/--ba-ease-* token'ları, dosya sonuna scripts/motion.css bloğu (yoksa).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dry = process.argv.includes('--dry');

const TOKENS = `  /* hareket (design-tokens.json → motion) */
  --ba-dur-fast: .15s;
  --ba-dur-base: .45s;
  --ba-dur-reveal: .7s;
  --ba-dur-word: .7s;
  --ba-dur-shine: 7s;
  --ba-cycle: 6.8s;
  --ba-stagger: .07s;
  --ba-ease-out: cubic-bezier(.2, .7, .2, 1);
  --ba-ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  --ba-ease-inout: cubic-bezier(.65, 0, .35, 1);
  --ba-rise: 22px;
  --ba-icon-cycle: 3.4s;
`;
const HEAD_SCRIPT = `<script>document.documentElement.classList.add('ba-js');if(document.visibilityState!=='hidden')document.documentElement.classList.add('ba-in')</script>`;
const TYPER_WORDS = 'PDF birleştir|PDF böl|resimden PDF yap|QR kod üret|maaş hesapla|zip aç|CV oluştur';

/* ---------- ba.css ---------- */
const cssPath = join(root, 'web/assets/css/ba.css');
const raw = readFileSync(cssPath, 'utf8');
const cssNl = raw.includes('\r\n') ? '\r\n' : '\n';
let css = raw.replace(/\r\n/g, '\n');
let cssChanged = false;
if (!css.includes('--ba-dur-fast')) {
  if (!css.includes('  --ba-gutter: 16px;\n')) throw new Error('ba.css :root içinde "--ba-gutter: 16px;" satırı yok; token ekleme noktası bulunamadı');
  css = css.replace('  --ba-gutter: 16px;\n', '  --ba-gutter: 16px;\n' + TOKENS);
  cssChanged = true;
}
if (!css.includes('@keyframes baRise')) {
  css += readFileSync(join(here, 'motion.css'), 'utf8').replace(/\r\n/g, '\n');
  cssChanged = true;
}
if (cssChanged && !dry) writeFileSync(cssPath, css.replace(/\n/g, cssNl));
console.log(cssChanged ? 'ba.css: hareket bloğu eklendi' : 'ba.css: zaten güncel');

/* ---------- HTML sayfaları ---------- */
function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (n !== 'vendor' && n !== 'assets') walk(p, out); }
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

let seen = 0, changed = 0, grad = 0;
for (const file of walk(join(root, 'web'))) {
  const orig = readFileSync(file, 'utf8');
  let h = orig;
  const link = h.match(/<link rel="stylesheet" href="([^"]*)assets\/css\/ba\.css">/);
  if (!link) { console.log('atlandı (ba.css bağlantısı yok):', file.slice(root.length + 1)); continue; }
  seen++;
  const p = link[1];
  const nl = h.includes('\r\n') ? '\r\n' : '\n';

  if (!h.includes("classList.add('ba-js')")) {
    h = h.replace(/(<meta name="viewport"[^>]*>)(\r?\n)/, `$1$2  ${HEAD_SCRIPT}$2`);
  }
  if (!h.includes('motion.js')) {
    h = h.replace(/(\r?\n)<\/body>/, `$1  <script type="module" src="${p}assets/js/motion.js"></script>$1</body>`);
  }
  if (!h.includes('ba-logo-img')) {
    h = h.replace(/(<a class="ba-logo"[^>]*>)(<img [^>]*>)/, '$1<span class="ba-logo-img">$2</span>');
  }
  const isHub = file === join(root, 'web', 'index.html');
  if (isHub && !h.includes('ba-typer')) {
    h = h.replace('<h1>Ücretsiz online araçlar — dosyanız bilgisayarınızdan çıkmaz</h1>',
      `<h1>Ücretsiz online araçlar,<br><span class="ba-grad">dosyanız bilgisayarınızdan çıkmaz.</span></h1>${nl}      <p class="ba-typer"><span class="pre">Tek tıkla:</span> <span class="ba-type" data-words="${TYPER_WORDS}">PDF birleştir</span></p>`);
  } else if (!isHub && h.includes('ba-hero-tool') && !h.includes('ba-grad')) {
    // Araç sayfası: " – ", ": " veya " (" öncesi anahtar parça; yoksa tüm başlık. <small> gibi iç etiketler korunur.
    h = h.replace(/<h1>([^<]+?)((?:\s*<[^>]+>[^<]*<\/[^>]+>)*)<\/h1>/, (m, t, tail) => {
      const sep = t.match(/^(.*?)(\s+–\s+|:\s+|\s+\()(.*)$/);
      grad++;
      if (sep) return `<h1><span class="ba-grad">${sep[1]}</span>${sep[2]}${sep[3]}${tail}</h1>`;
      return `<h1><span class="ba-grad">${t.trim()}</span>${t.endsWith(' ') ? ' ' : ''}${tail}</h1>`;
    });
  }
  if (h !== orig) { changed++; if (!dry) writeFileSync(file, h); }
}
console.log(`${seen} sayfa tarandı, ${changed} güncellendi (${grad} araç h1 gradyan)${dry ? ' [--dry, yazılmadı]' : ''}`);
