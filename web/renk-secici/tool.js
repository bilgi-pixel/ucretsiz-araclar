// Renk Seçici ve Resimden Renk Paleti — tamamen tarayıcıda çalışır, dosya sunucuya gitmez.
import { createDropzone, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- Renk dönüşümleri ---------- */
export function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}
export function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
export function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0; const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}
export function hslToRgb({ h, s, l }) {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}
export function rgbToCmyk({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };
  return { c: ((1 - r - k) / (1 - k)) * 100, m: ((1 - g - k) / (1 - k)) * 100, y: ((1 - b - k) / (1 - k)) * 100, k: k * 100 };
}
export function cmykToRgb({ c, m, y, k }) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return { r: Math.round(255 * (1 - c) * (1 - k)), g: Math.round(255 * (1 - m) * (1 - k)), b: Math.round(255 * (1 - y) * (1 - k)) };
}
const nums = (s) => (String(s).match(/-?\d+(?:[.,]\d+)?/g) || []).map((n) => parseFloat(n.replace(',', '.')));
function parseRgb(s) { const n = nums(s); return n.length === 3 && n.every((v) => v >= 0 && v <= 255) ? { r: n[0], g: n[1], b: n[2] } : null; }
function parseHsl(s) { const n = nums(s); return n.length === 3 && n[1] <= 100 && n[2] <= 100 && n[1] >= 0 && n[2] >= 0 ? hslToRgb({ h: n[0], s: n[1], l: n[2] }) : null; }
function parseCmyk(s) { const n = nums(s); return n.length === 4 && n.every((v) => v >= 0 && v <= 100) ? cmykToRgb({ c: n[0], m: n[1], y: n[2], k: n[3] }) : null; }

/* ---------- WCAG kontrast ---------- */
export function luminance({ r, g, b }) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export function contrastRatio(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/* ---------- Durum ve arayüz (renk seçici) ---------- */
let current = { r: 123, g: 35, b: 49 };
const f = (n) => String(Math.round(n));

function textColorFor(rgb) { return contrastRatio(rgb, { r: 255, g: 255, b: 255 }) >= 4.5 ? '#fff' : '#000'; }

function makeSwatch(hex, label) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'rs-chip'; b.dataset.hex = hex;
  b.style.background = hex; b.style.color = textColorFor(hexToRgb(hex));
  b.textContent = label || hex.toUpperCase();
  b.title = `${hex.toUpperCase()} rengini seç`;
  b.addEventListener('click', () => setColor(hexToRgb(hex)));
  return b;
}

function fillRow(el, list) {
  el.replaceChildren(...list.map((hex) => makeSwatch(hex)));
}

function setColor(rgb, source) {
  current = { r: clamp(Math.round(rgb.r), 0, 255), g: clamp(Math.round(rgb.g), 0, 255), b: clamp(Math.round(rgb.b), 0, 255) };
  const hex = rgbToHex(current), hsl = rgbToHsl(current), cmyk = rgbToCmyk(current);
  const vals = {
    'c-hex': hex.toUpperCase(),
    'c-rgb': `rgb(${current.r}, ${current.g}, ${current.b})`,
    'c-hsl': `hsl(${f(hsl.h)}, ${f(hsl.s)}%, ${f(hsl.l)}%)`,
    'c-cmyk': `cmyk(${f(cmyk.c)}%, ${f(cmyk.m)}%, ${f(cmyk.y)}%, ${f(cmyk.k)}%)`,
  };
  for (const [id, v] of Object.entries(vals)) {
    if (id !== source) { $(id).value = v; }
    $(id).removeAttribute('aria-invalid');
  }
  if (source !== 'c-color') $('c-color').value = hex;
  $('c-swatch').style.background = hex;
  $('c-swatch').dataset.hex = hex;
  showError($('error'), null);
  // tonlar ve uyumlar
  const tone = (dl) => rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: clamp(hsl.l + dl, 3, 97) }));
  fillRow($('r-light'), [tone(40), tone(30), tone(20), tone(10)].filter((x, i, a) => a.indexOf(x) === i));
  fillRow($('r-dark'), [tone(-10), tone(-20), tone(-30), tone(-40)].filter((x, i, a) => a.indexOf(x) === i));
  const hue = (d) => rgbToHex(hslToRgb({ h: hsl.h + d, s: hsl.s, l: hsl.l }));
  fillRow($('r-comp'), [hue(180)]);
  fillRow($('r-triad'), [hue(120), hue(240)]);
  fillRow($('r-analog'), [hue(-30), hue(30)]);
  updateContrast();
  updateCode();
}

function updateContrast() {
  const bg = hexToRgb($('ct-bg').value) || { r: 255, g: 255, b: 255 };
  const ratio = contrastRatio(current, bg);
  const txt = ratio.toFixed(2).replace('.', ',');
  $('ct-ratio').textContent = `${txt}:1`;
  $('ct-ratio').dataset.ratio = ratio.toFixed(3);
  const mark = (id, ok) => { $(id).textContent = ok ? 'Geçer' : 'Kalır'; $(id).dataset.pass = ok ? '1' : '0'; $(id).className = ok ? 'rs-pass' : 'rs-fail'; };
  mark('ct-aa', ratio >= 4.5); mark('ct-aa-l', ratio >= 3); mark('ct-aaa', ratio >= 7); mark('ct-aaa-l', ratio >= 4.5);
  const p = $('ct-sample');
  p.style.color = rgbToHex(current); p.style.background = rgbToHex(bg);
}

function updateCode() {
  const hex = rgbToHex(current), hsl = rgbToHsl(current);
  const kind = $('code-kind').value;
  let out;
  if (kind === 'css') out = `:root {\n  --renk-ana: ${hex};\n  --renk-ana-rgb: ${current.r} ${current.g} ${current.b};\n  --renk-ana-hsl: ${f(hsl.h)} ${f(hsl.s)}% ${f(hsl.l)}%;\n}`;
  else if (kind === 'tailwind') {
    const steps = [[50, 95], [100, 90], [200, 80], [300, 70], [400, 60], [500, 50], [600, 40], [700, 30], [800, 20], [900, 12]];
    out = `// tailwind.config.js → theme.extend.colors\nmarka: {\n` + steps.map(([k, l]) => `  ${k}: '${rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l }))}',`).join('\n') + `\n  DEFAULT: '${hex}',\n},`;
  } else out = `${hex}\nrgb(${current.r}, ${current.g}, ${current.b})\nhsl(${f(hsl.h)}, ${f(hsl.s)}%, ${f(hsl.l)}%)`;
  $('code-out').value = out;
}

async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch { /* yoksay */ } t.remove(); }
  if (btn) { const old = btn.dataset.label || btn.textContent; btn.dataset.label = old; btn.textContent = 'Kopyalandı'; setTimeout(() => { btn.textContent = old; }, 1500); }
}

const parsers = { 'c-hex': hexToRgb, 'c-rgb': parseRgb, 'c-hsl': parseHsl, 'c-cmyk': parseCmyk };
const hints = {
  'c-hex': 'HEX değeri geçersiz. #7b2331 ya da #fff gibi 3 veya 6 haneli yazın.',
  'c-rgb': 'RGB değeri geçersiz. 0-255 arası üç sayı yazın: rgb(123, 35, 49).',
  'c-hsl': 'HSL değeri geçersiz. Ton 0-360, doygunluk ve açıklık %0-100 olmalı: hsl(350, 56%, 32%).',
  'c-cmyk': 'CMYK değeri geçersiz. Dört değer de %0-100 arası olmalı: cmyk(0%, 72%, 60%, 52%).',
};
for (const id of Object.keys(parsers)) {
  $(id).addEventListener('input', () => {
    const rgb = parsers[id]($(id).value);
    if (rgb) setColor(rgb, id);
    else { $(id).setAttribute('aria-invalid', 'true'); showError($('error'), hints[id]); }
  });
}
$('c-color').addEventListener('input', () => setColor(hexToRgb($('c-color').value), 'c-color'));
$('ct-bg').addEventListener('input', () => { $('ct-bg-hex').value = $('ct-bg').value; updateContrast(); });
$('ct-bg-hex').addEventListener('input', () => { const c = hexToRgb($('ct-bg-hex').value); if (c) { $('ct-bg').value = rgbToHex(c); updateContrast(); } });
$('ct-swap').addEventListener('click', () => { const bg = hexToRgb($('ct-bg').value) || { r: 255, g: 255, b: 255 }; const old = { ...current }; $('ct-bg').value = rgbToHex(old); $('ct-bg-hex').value = rgbToHex(old); setColor(bg); });
$('code-kind').addEventListener('change', updateCode);
$('copy-code').addEventListener('click', (e) => copyText($('code-out').value, e.currentTarget));

/* ---------- Sekmeler ---------- */
function showTab(name) {
  for (const t of ['picker', 'palette']) {
    $('tab-' + t).setAttribute('aria-selected', String(t === name));
    $('tab-' + t).tabIndex = t === name ? 0 : -1;
    $('panel-' + t).hidden = t !== name;
  }
}
for (const t of ['picker', 'palette']) {
  $('tab-' + t).addEventListener('click', () => showTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const o = t === 'picker' ? 'palette' : 'picker'; showTab(o); $('tab-' + o).focus(); }
  });
}

/* ---------- Resimden palet: median-cut ---------- */
/** pixels: [r,g,b] dizisi. Medyan kesme ile k renk; yoğunluğa göre sıralı döner. */
export function medianCut(pixels, k) {
  if (!pixels.length) return [];
  let boxes = [pixels];
  const range = (box) => {
    const mn = [255, 255, 255], mx = [0, 0, 0];
    for (const p of box) for (let i = 0; i < 3; i++) { if (p[i] < mn[i]) mn[i] = p[i]; if (p[i] > mx[i]) mx[i] = p[i]; }
    const r = [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]];
    const ch = r.indexOf(Math.max(...r));
    return { ch, span: r[ch] };
  };
  while (boxes.length < k) {
    // bölünebilir (aralığı > 0) en kalabalık kutuyu seç
    let bi = -1, best = 0;
    boxes.forEach((b, i) => { if (b.length > best && range(b).span > 0) { best = b.length; bi = i; } });
    if (bi < 0) break;
    const box = boxes[bi], { ch } = range(box);
    box.sort((a, b) => a[ch] - b[ch]);
    const mid = box.length >> 1;
    boxes.splice(bi, 1, box.slice(0, mid), box.slice(mid));
    boxes = boxes.filter((b) => b.length);
  }
  const total = pixels.length;
  return boxes.map((b) => {
    const s = [0, 0, 0]; for (const p of b) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }
    const rgb = { r: Math.round(s[0] / b.length), g: Math.round(s[1] / b.length), b: Math.round(s[2] / b.length) };
    return { hex: rgbToHex(rgb), rgb, share: b.length / total };
  }).sort((a, b) => b.share - a.share);
}

let palette = []; // { hex, rgb, share }
let imgName = 'resim';
const canvas = $('pal-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const BIG = 50 * 1024 * 1024;

createDropzone({ el: $('drop'), accept: 'image/*', multiple: false, onFiles: ([file]) => loadImage(file) });

async function loadImage(file) {
  showError($('error-p'), null);
  $('warning').classList.remove('is-active');
  if (!file.type.startsWith('image/')) { showError($('error-p'), `"${file.name}" bir resim değil. JPG, PNG, WebP veya GIF dosyası seçin.`); return; }
  if (file.size >= BIG) { $('warning').textContent = `Dosya ${formatBytes(file.size)}; 50 MB üstü resimler yavaş açılabilir.`; $('warning').classList.add('is-active'); }
  let bmp;
  try { bmp = await createImageBitmap(file); }
  catch { showError($('error-p'), `"${file.name}" okunamadı. Dosya bozuk ya da desteklenmeyen bir biçimde olabilir; resmi JPG veya PNG olarak yeniden kaydedip deneyin.`); return; }
  imgName = baseName(file.name);
  const scale = Math.min(1, 900 / bmp.width);
  canvas.width = Math.max(1, Math.round(bmp.width * scale)); canvas.height = Math.max(1, Math.round(bmp.height * scale));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  if (bmp.close) bmp.close();
  $('pal-view').hidden = false;
  await tick();
  extract();
}

function extract() {
  if (!canvas.width) return;
  // küçük örneklem: en uzun kenar 120 px
  const s = Math.min(1, 120 / Math.max(canvas.width, canvas.height));
  const w = Math.max(1, Math.round(canvas.width * s)), h = Math.max(1, Math.round(canvas.height * s));
  const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
  const tctx = tmp.getContext('2d', { willReadFrequently: true });
  tctx.imageSmoothingEnabled = false;
  tctx.drawImage(canvas, 0, 0, w, h);
  const d = tctx.getImageData(0, 0, w, h).data;
  const px = [];
  for (let i = 0; i < d.length; i += 4) if (d[i + 3] >= 125) px.push([d[i], d[i + 1], d[i + 2]]);
  if (!px.length) { showError($('error-p'), 'Resim tamamen saydam görünüyor; renk bulunamadı. Başka bir resim deneyin.'); return; }
  palette = medianCut(px, Number($('pal-count').value));
  renderPalette();
}

function renderPalette() {
  const ul = $('pal-list');
  ul.replaceChildren(...palette.map((p) => {
    const li = document.createElement('li'); li.dataset.hex = p.hex;
    const b = makeSwatch(p.hex, `${p.hex.toUpperCase()} · %${Math.max(1, Math.round(p.share * 100))}`);
    b.title = `${p.hex.toUpperCase()} rengini renk seçicide aç`;
    b.addEventListener('click', () => { setColor(hexToRgb(p.hex)); showTab('picker'); });
    li.appendChild(b); return li;
  }));
  $('pal-strip').replaceChildren(...palette.map((p) => { const i = document.createElement('i'); i.style.background = p.hex; i.style.flex = String(Math.max(p.share, 0.05)); return i; }));
}
$('pal-count').addEventListener('change', extract);

// damlalık: tuvale tıklanan pikselin rengi
function pick(ev) {
  const r = canvas.getBoundingClientRect();
  const x = clamp(Math.floor(((ev.clientX - r.left) / r.width) * canvas.width), 0, canvas.width - 1);
  const y = clamp(Math.floor(((ev.clientY - r.top) / r.height) * canvas.height), 0, canvas.height - 1);
  const [R, G, B, A] = ctx.getImageData(x, y, 1, 1).data;
  if (A < 10) { $('drop-hex').textContent = 'saydam piksel'; return; }
  const hex = rgbToHex({ r: R, g: G, b: B });
  $('drop-hex').textContent = hex.toUpperCase();
  $('drop-hex').dataset.hex = hex;
  $('drop-sw').style.background = hex;
  $('drop-use').disabled = false;
}
canvas.addEventListener('click', pick);
$('drop-use').addEventListener('click', () => { const hex = $('drop-hex').dataset.hex; if (hex) { setColor(hexToRgb(hex)); showTab('picker'); } });
if ('EyeDropper' in window) {
  $('eyedrop').hidden = false;
  $('eyedrop').addEventListener('click', async () => { try { const r = await new window.EyeDropper().open(); setColor(hexToRgb(r.sRGBHex)); } catch { /* kullanıcı iptal etti */ } });
}

/* ---------- Palet dışa aktarma ---------- */
function paletteJson() { return JSON.stringify({ kaynak: imgName, renkler: palette.map((p) => ({ hex: p.hex, rgb: [p.rgb.r, p.rgb.g, p.rgb.b], oran: Number(p.share.toFixed(3)) })) }, null, 2); }
function paletteCss() { return ':root {\n' + palette.map((p, i) => `  --palet-${i + 1}: ${p.hex};`).join('\n') + '\n}\n'; }
$('dl-json').addEventListener('click', () => { if (palette.length) downloadBlob(new Blob([paletteJson()], { type: 'application/json' }), `${imgName}-palet.json`); });
$('dl-css').addEventListener('click', () => { if (palette.length) downloadBlob(new Blob([paletteCss()], { type: 'text/css' }), `${imgName}-palet.css`); });
$('dl-png').addEventListener('click', () => {
  if (!palette.length) return;
  const c = document.createElement('canvas'); const cw = 160; c.width = cw * palette.length; c.height = 200;
  const x = c.getContext('2d');
  palette.forEach((p, i) => { x.fillStyle = p.hex; x.fillRect(i * cw, 0, cw, 200); x.fillStyle = textColorFor(p.rgb); x.font = '600 18px sans-serif'; x.textAlign = 'center'; x.fillText(p.hex.toUpperCase(), i * cw + cw / 2, 108); });
  c.toBlob((b) => downloadBlob(b, `${imgName}-palet.png`), 'image/png');
});
$('copy-pal').addEventListener('click', (e) => { if (palette.length) copyText(palette.map((p) => p.hex.toUpperCase()).join(', '), e.currentTarget); });

setColor(current);
