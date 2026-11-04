// Resimden Renk Paleti — medyan kesme + damlalık. Tamamen tarayıcıda çalışır, resim sunucuya gitmez.
import { createDropzone, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- Renk dönüşümleri ---------- */
const toHex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0; const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}
const toLinear = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const luminance = ({ r, g, b }) => 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
const chroma = ({ r, g, b }) => Math.max(r, g, b) - Math.min(r, g, b);
/** Renk kutusu üzerindeki yazı için okunur ön plan: beyaz ya da siyah. */
const textColorFor = (rgb) => (1.05 / (luminance(rgb) + 0.05) >= 4.5 ? '#ffffff' : '#000000');
const fmtRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
const fmtHsl = (rgb) => { const h = rgbToHsl(rgb); return `hsl(${Math.round(h.h)}, ${Math.round(h.s)}%, ${Math.round(h.l)}%)`; };

/* ---------- Medyan kesme ---------- */
/** pixels: [r,g,b] dizisi. En fazla k renk döndürür; { hex, rgb, share } — paylaşıma göre azalan. */
export function medianCut(pixels, k) {
  if (!pixels.length) return [];
  const makeBox = (px) => {
    const mn = [255, 255, 255], mx = [0, 0, 0];
    for (const p of px) for (let i = 0; i < 3; i++) { if (p[i] < mn[i]) mn[i] = p[i]; if (p[i] > mx[i]) mx[i] = p[i]; }
    const r = [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]];
    const ch = r.indexOf(Math.max(...r));
    return { px, ch, span: r[ch], vol: (r[0] + 1) * (r[1] + 1) * (r[2] + 1) };
  };
  let boxes = [makeBox(pixels)];
  while (boxes.length < k) {
    // ilk turlarda en kalabalık kutu, sonra kalabalık × renk uzayı hacmi: baskın renkler önce, çeşitlilik sonra
    const byPopulation = boxes.length < k * 0.75;
    let bi = -1, best = -1;
    boxes.forEach((b, i) => {
      if (b.span <= 0 || b.px.length < 2) return;
      const score = byPopulation ? b.px.length : b.px.length * b.vol;
      if (score > best) { best = score; bi = i; }
    });
    if (bi < 0) break; // her kutu tek renk: daha fazla bölünemez
    const { px, ch } = boxes[bi];
    px.sort((a, b) => a[ch] - b[ch]);
    // medyana en yakın değer sınırından böl; aynı renkteki pikseller hiç ayrılmaz
    const mid = px.length >> 1;
    let cut = -1;
    for (let off = 0; off < px.length && cut < 0; off++) {
      for (const i of [mid + off, mid - off]) {
        if (i >= 1 && i < px.length && px[i - 1][ch] !== px[i][ch]) { cut = i; break; }
      }
    }
    boxes.splice(bi, 1, makeBox(px.slice(0, cut)), makeBox(px.slice(cut)));
  }
  const total = pixels.length;
  const merged = new Map();
  for (const b of boxes) {
    const s = [0, 0, 0];
    for (const p of b.px) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }
    const n = b.px.length;
    const rgb = { r: Math.round(s[0] / n), g: Math.round(s[1] / n), b: Math.round(s[2] / n) };
    const hex = toHex(rgb);
    const cur = merged.get(hex);
    if (cur) cur.share += n / total; else merged.set(hex, { hex, rgb, share: n / total });
  }
  return [...merged.values()].sort((a, b) => b.share - a.share);
}

/* ---------- Durum ---------- */
const MAX_VIEW = 640;     // gösterilen tuvalin en uzun kenarı (damlalık bu tuvalden okur)
const MAX_SAMPLE = 200;   // palet hesabı için küçültülmüş örneğin en uzun kenarı
const BIG = 50 * 1024 * 1024;

let extracted = [];       // medyan kesmeden gelen renkler
let extras = [];          // damlalıkla elle eklenenler
let imgName = 'resim';
let picked = null;        // { hex, rgb }
let marker = null;        // { x, y } tuval pikseli

const view = $('view-canvas');
const vctx = view.getContext('2d');
const base = document.createElement('canvas');           // temiz kopya: işaret çizilmeden piksel okunur
const bctx = base.getContext('2d', { willReadFrequently: true });

const allColors = () => extracted.concat(extras);

/* ---------- Kopyalama ---------- */
function say(text) {
  const el = $('copy-status');
  el.textContent = text;
  clearTimeout(say.t);
  say.t = setTimeout(() => { el.textContent = ''; }, 2500);
}
async function copyText(text, message) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; }
  catch {
    const t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { ok = document.execCommand('copy'); } catch { /* yoksay */ }
    t.remove();
  }
  say(ok ? (message || `Kopyalandı: ${text}`) : 'Kopyalanamadı; metni elle seçip kopyalayın.');
}

/* ---------- Resim yükleme ---------- */
createDropzone({ el: $('drop'), accept: 'image/*', multiple: false, onFiles: ([file]) => loadImage(file) });

async function loadImage(file) {
  showError($('error'), null);
  $('warning').classList.remove('is-active');
  if (file.type && !file.type.startsWith('image/')) {
    showError($('error'), `"${file.name}" bir resim dosyası değil. JPG, PNG veya WebP biçiminde bir resim seçin.`);
    return;
  }
  if (file.size >= BIG) {
    $('warning').textContent = `Dosya ${formatBytes(file.size)}; 50 MB üstü resimler yavaş açılabilir. Takılırsa önce Resim Küçült aracıyla boyutunu düşürün.`;
    $('warning').classList.add('is-active');
  }
  let bmp;
  try { bmp = await createImageBitmap(file); }
  catch {
    showError($('error'), `"${file.name}" okunamadı. Dosya bozuk ya da desteklenmeyen bir biçimde olabilir; resmi JPG veya PNG olarak yeniden kaydedip tekrar deneyin.`);
    return;
  }
  imgName = baseName(file.name) || 'resim';
  const scale = Math.min(1, MAX_VIEW / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale)), h = Math.max(1, Math.round(bmp.height * scale));
  base.width = w; base.height = h;
  bctx.clearRect(0, 0, w, h);
  bctx.imageSmoothingQuality = 'high';
  bctx.drawImage(bmp, 0, 0, w, h);
  if (bmp.close) bmp.close();
  view.width = w; view.height = h;
  // küçük resimler en az 240 CSS pikseli genişliğinde gösterilir (piksel piksel büyütülür)
  const cssW = clamp(w, 240, MAX_VIEW);
  view.style.width = `${cssW}px`;
  view.classList.toggle('rp-pixelated', cssW > w);
  extras = []; picked = null; marker = null;
  updatePickUi();
  drawView();
  $('empty-hint').hidden = true;
  $('view').hidden = false;
  await tick();
  extract();
}

function drawView() {
  vctx.clearRect(0, 0, view.width, view.height);
  vctx.drawImage(base, 0, 0);
  if (!marker) return;
  const rect = view.getBoundingClientRect();
  const k = rect.width ? view.width / rect.width : 1; // CSS pikseli → tuval pikseli
  const cx = marker.x + 0.5, cy = marker.y + 0.5;
  vctx.beginPath(); vctx.arc(cx, cy, 8 * k, 0, Math.PI * 2);
  vctx.lineWidth = 3.5 * k; vctx.strokeStyle = '#ffffff'; vctx.stroke();
  vctx.lineWidth = 1.5 * k; vctx.strokeStyle = '#000000'; vctx.stroke();
}

/* ---------- Palet çıkarma ---------- */
function extract() {
  if (!base.width) return;
  // küçük örnek: en uzun kenar en fazla 200 px; yumuşatma kapalı → düz renkler kirlenmez
  const s = Math.min(1, MAX_SAMPLE / Math.max(base.width, base.height));
  const w = Math.max(1, Math.round(base.width * s)), h = Math.max(1, Math.round(base.height * s));
  const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
  const tctx = tmp.getContext('2d', { willReadFrequently: true });
  tctx.imageSmoothingEnabled = false;
  tctx.drawImage(base, 0, 0, w, h);
  const d = tctx.getImageData(0, 0, w, h).data;
  const px = [];
  for (let i = 0; i < d.length; i += 4) if (d[i + 3] >= 125) px.push([d[i], d[i + 1], d[i + 2]]);
  const want = Number($('count').value);
  extracted = medianCut(px, want);
  if (!extracted.length) {
    showError($('error'), 'Resim tamamen saydam görünüyor; renk bulunamadı. Arka planı dolu bir resim deneyin.');
  } else {
    showError($('error'), null);
  }
  $('pal-info').textContent = !extracted.length ? ''
    : extracted.length < want ? `Resimde ${want} ayrı renk bulunamadı; ${extracted.length} renk gösteriliyor.`
    : `Resimden ${extracted.length} baskın renk çıkarıldı.`;
  renderPalette();
}
$('count').addEventListener('change', extract);

function tagsFor(list) {
  const tags = new Map(list.map((c) => [c.hex, []]));
  if (list.length < 2) return tags;
  const best = (score, dir) => list.reduce((a, c) => (dir * (score(c.rgb) - score(a.rgb)) > 0 ? c : a), list[0]);
  tags.get(best(luminance, 1).hex).push('En açık');
  tags.get(best(luminance, -1).hex).push('En koyu');
  tags.get(best(chroma, 1).hex).push('En doygun');
  return tags;
}

function codeButton(text) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'rp-code'; b.textContent = text;
  b.title = `Kopyala: ${text}`;
  b.addEventListener('click', () => copyText(text));
  return b;
}

function renderPalette() {
  const list = allColors();
  const tags = tagsFor(list);
  $('strip').replaceChildren(...list.map((c) => {
    const i = document.createElement('i');
    i.style.background = c.hex; i.style.flex = String(Math.max(c.share ?? 0.08, 0.04));
    return i;
  }));
  $('pal-list').replaceChildren(...list.map((c, idx) => {
    const hexUp = c.hex.toUpperCase();
    const li = document.createElement('li');
    li.className = 'rp-card'; li.dataset.hex = c.hex;
    const sw = document.createElement('button');
    sw.type = 'button'; sw.className = 'rp-sw';
    sw.style.background = c.hex; sw.style.color = textColorFor(c.rgb);
    sw.setAttribute('aria-label', `${hexUp} kodunu kopyala`);
    sw.title = `${hexUp} kodunu kopyala`;
    const a = document.createElement('span'); a.textContent = hexUp;
    const b = document.createElement('span'); b.textContent = c.manual ? 'elle' : `%${c.share < 0.01 ? '<1' : Math.round(c.share * 100)}`;
    sw.append(a, b);
    sw.addEventListener('click', () => copyText(hexUp));
    const meta = document.createElement('div'); meta.className = 'rp-meta';
    const tg = document.createElement('div'); tg.className = 'rp-tags';
    const names = (tags.get(c.hex) || []).concat(c.manual ? ['Elle eklendi'] : []);
    for (const n of names) { const t = document.createElement('span'); t.className = 'rp-tag'; t.textContent = n; tg.appendChild(t); }
    meta.append(tg, codeButton(hexUp), codeButton(fmtRgb(c.rgb)), codeButton(fmtHsl(c.rgb)));
    if (c.manual) {
      const rm = document.createElement('button');
      rm.type = 'button'; rm.className = 'ba-btn rp-remove'; rm.textContent = 'Kaldır';
      rm.setAttribute('aria-label', `${hexUp} rengini paletten kaldır`);
      rm.addEventListener('click', () => { extras = extras.filter((e) => e.hex !== c.hex); renderPalette(); });
      meta.appendChild(rm);
    }
    li.append(sw, meta);
    li.dataset.index = String(idx);
    return li;
  }));
  updateCode();
}

/* ---------- Damlalık ---------- */
function pickAt(x, y) {
  x = clamp(Math.round(x), 0, base.width - 1); y = clamp(Math.round(y), 0, base.height - 1);
  const [R, G, B, A] = bctx.getImageData(x, y, 1, 1).data;
  marker = { x, y };
  if (A < 10) {
    picked = null;
    updatePickUi('Bu piksel saydam; başka bir nokta seçin.');
  } else {
    const rgb = { r: R, g: G, b: B };
    picked = { hex: toHex(rgb), rgb };
    updatePickUi();
  }
  drawView();
}

function updatePickUi(message) {
  const on = !!picked;
  $('pick-sw').style.background = on ? picked.hex : 'transparent';
  for (const [id, label, val] of [['pick-hex', 'HEX', on && picked.hex.toUpperCase()], ['pick-rgb', 'RGB', on && fmtRgb(picked.rgb)], ['pick-hsl', 'HSL', on && fmtHsl(picked.rgb)]]) {
    const b = $(id);
    b.disabled = !on;
    b.textContent = on ? val : label;
    b.dataset.copy = on ? val : '';
  }
  $('pick-add').disabled = !on;
  $('pick-info').textContent = message || (on ? `Seçilen nokta: ${picked.hex.toUpperCase()} (resimde x ${marker.x}, y ${marker.y}). Kopyalamak için koda tıklayın.` : 'Henüz bir nokta seçilmedi.');
}
for (const id of ['pick-hex', 'pick-rgb', 'pick-hsl']) {
  $(id).addEventListener('click', () => { const v = $(id).dataset.copy; if (v) copyText(v); });
}
$('pick-add').addEventListener('click', () => {
  if (!picked) return;
  if (allColors().some((c) => c.hex === picked.hex)) { updatePickUi(`${picked.hex.toUpperCase()} zaten palette var.`); return; }
  extras.push({ hex: picked.hex, rgb: picked.rgb, share: null, manual: true });
  renderPalette();
  updatePickUi(`${picked.hex.toUpperCase()} palete eklendi.`);
});
view.addEventListener('click', (ev) => {
  const r = view.getBoundingClientRect();
  pickAt(((ev.clientX - r.left) / r.width) * view.width, ((ev.clientY - r.top) / r.height) * view.height);
});
// klavye: ok tuşları işareti kaydırır ve her harekette rengi okur
view.addEventListener('keydown', (ev) => {
  const dirs = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); const m = marker || { x: view.width >> 1, y: view.height >> 1 }; pickAt(m.x, m.y); return; }
  const d = dirs[ev.key];
  if (!d) return;
  ev.preventDefault();
  const step = Math.max(1, Math.round(Math.max(view.width, view.height) / 50)) * (ev.shiftKey ? 5 : 1);
  const m = marker || { x: view.width >> 1, y: view.height >> 1 };
  pickAt(m.x + d[0] * step, m.y + d[1] * step);
});

/* ---------- Dışa aktarma ---------- */
const FORMATS = {
  css: () => ':root {\n' + allColors().map((c, i) => `  --renk-${i + 1}: ${c.hex};`).join('\n') + '\n}\n',
  scss: () => allColors().map((c, i) => `$renk-${i + 1}: ${c.hex};`).join('\n') + '\n',
  json: () => JSON.stringify({
    kaynak: imgName,
    renkler: allColors().map((c) => {
      const h = rgbToHsl(c.rgb);
      return { hex: c.hex, rgb: [c.rgb.r, c.rgb.g, c.rgb.b], hsl: [Math.round(h.h), Math.round(h.s), Math.round(h.l)], oran: c.share == null ? null : Number(c.share.toFixed(3)) };
    }),
  }, null, 2),
  hex: () => allColors().map((c) => c.hex.toUpperCase()).join(', '),
};
function updateCode() { $('code-out').value = allColors().length ? FORMATS[$('fmt').value]() : ''; }
$('fmt').addEventListener('change', updateCode);
$('copy-all').addEventListener('click', () => {
  const text = $('code-out').value;
  if (!text) return;
  const name = $('fmt').selectedOptions[0].textContent;
  copyText(text, `Tüm palet kopyalandı (${name}).`);
});

$('dl-png').addEventListener('click', () => {
  const list = allColors();
  if (!list.length) return;
  // her renk için bir şerit; altında beyaz zemin üzerinde HEX / RGB / HSL (her zaman okunur)
  const colW = list.length > 8 ? 150 : 180, colorH = 240, textH = 104;
  const c = document.createElement('canvas');
  c.width = colW * list.length; c.height = colorH + textH;
  const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, c.width, c.height);
  x.textAlign = 'center'; x.textBaseline = 'alphabetic';
  list.forEach((col, i) => {
    x.fillStyle = col.hex; x.fillRect(i * colW, 0, colW, colorH);
    const cx = i * colW + colW / 2;
    x.fillStyle = '#1e2126'; x.font = '700 20px system-ui, Segoe UI, Arial, sans-serif';
    x.fillText(col.hex.toUpperCase(), cx, colorH + 32);
    x.fillStyle = '#45484e'; x.font = '14px system-ui, Segoe UI, Arial, sans-serif';
    x.fillText(fmtRgb(col.rgb), cx, colorH + 60);
    x.fillText(fmtHsl(col.rgb), cx, colorH + 82);
  });
  c.toBlob((blob) => { if (blob) downloadBlob(blob, `${imgName}-palet.png`); }, 'image/png');
});

updatePickUi();
