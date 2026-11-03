// Kelime Bulutu Oluşturucu — saf Canvas, spiral yerleştirme + piksel maskesiyle çakışma kontrolü.
// Metin hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, showError, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_TEXT = 1024 * 1024;       // 1 MB üstünde uyarı
const MAX_TEXT = 20 * 1024 * 1024;  // 20 MB üstü reddedilir
const GRID = 0.5;                   // çakışma ızgarası ölçeği (yarı çözünürlük)

/* ---------- Türkçe etkisiz (stop-word) kelimeler ---------- */
const STOP_WORDS = new Set(`acaba ama ancak artık aslında az bana bazı belki ben beni benim beri beş bile bir birçok biri birkaç birşey biz bizden bize bizi bizim bu buna bunda bundan bunlar bunları bunların bunu bunun burada çok çünkü da daha dahi de defa değil diye diğer en gibi hem hep hepsi her hiç için ile ise kadar karşın kendi kendine kendini ki kim kimden kime kimi mi mı mu mü nasıl ne neden nerede nerede nereye niçin niye o olan olarak oldu olduğu olduklarını olmak olması olmayan olsa olsun olup olur olursa oluyor on ona ondan onlar onlara onlardan onları onların onu onun öyle pek ise rağmen sadece sanki şey şeyi şeyler şu şuna şunda şundan şunları şunu şöyle sonra tarafından tüm üzere ve veya ya yani yoksa yine yok yüzden zaten bunun ayrıca fakat hatta üç iki dört altı yedi sekiz dokuz diğeri herhangi bütün hangi hangisi şimdi böyle bile mü ise ötürü dolayı göre kez kere üstelik oysa halde gerek başka eğer yalnız değin dek sonuç iken ki`.split(/\s+/));

/* ---------- Renk paletleri ve yazı tipleri ---------- */
const PALETTES = {
  bordo: ['#7b2331', '#a8404f', '#5e1a25', '#c46a76', '#3f1019', '#8f5a63', '#6b3a42'],
  mavi: ['#1d5fa8', '#4b8cd1', '#123e70', '#6fa3d8', '#0b2747', '#5f7fa3', '#2f4a68'],
  gri: ['#2b313a', '#4b5563', '#171b21', '#636b78', '#394049', '#7b8494', '#111111'],
  renkli: ['#2f6db5', '#d9534f', '#2e9e6b', '#c98a0b', '#8e5bb5', '#12899d', '#d04a85', '#6b7a1f'],
};
const FONTS = {
  plex: { family: '"IBM Plex Sans", "Segoe UI", Arial, sans-serif', weight: 600, scale: 1 },
  caveat: { family: '"Caveat", cursive', weight: 700, scale: 1.3 },
  mono: { family: '"IBM Plex Mono", Consolas, monospace', weight: 500, scale: 0.9 },
};

/* ---------- Seçenekler ---------- */
function readOptions() {
  const [W, H] = $('opt-size').value.split('x').map(Number);
  return {
    W, H,
    shape: $('opt-shape').value,
    font: $('opt-font').value,
    palette: $('opt-palette').value,
    rotate: $('opt-rotate').value,
    caseMode: $('opt-case').value,
    minLen: Math.max(1, Math.min(20, Math.round(Number($('opt-minlen').value)) || 2)),
    topN: Math.max(5, Math.min(300, Math.round(Number($('opt-topn').value)) || 60)),
    useStop: $('opt-stop').checked,
    numbers: $('opt-numbers').checked,
    extra: $('opt-extra').value,
    transparent: $('opt-transparent').checked,
  };
}

/* ---------- Metin → sıklık ---------- */
/** Kelimeleri sayar; Türkçe küçük harfe çevirir, kesme işaretinden sonrasını (ekleri) atar. */
function countWords(text, o) {
  const extra = new Set(o.extra.split(/[,;\n]/).map((s) => s.trim().toLocaleLowerCase('tr')).filter(Boolean));
  const counts = new Map();
  let total = 0;
  const re = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?/gu;
  let m;
  while ((m = re.exec(text)) !== null) {
    let w = m[0];
    const k = w.search(/['’]/);
    if (k > 0) w = w.slice(0, k); // "Türkiye'de" → "Türkiye"
    w = w.toLocaleLowerCase('tr');
    total++;
    if (w.length < o.minLen) continue;
    if (!o.numbers && /^\p{N}+$/u.test(w)) continue;
    if (o.useStop && STOP_WORDS.has(w)) continue;
    if (extra.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  const list = Array.from(counts, ([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, 'tr'));
  return { list, total, distinct: counts.size };
}

const showCase = (w, mode) => (mode === 'upper' ? w.toLocaleUpperCase('tr') : mode === 'title' ? w.charAt(0).toLocaleUpperCase('tr') + w.slice(1) : w);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });

/* ---------- Durum ve tablo ---------- */
let stats = { list: [], total: 0, distinct: 0 };
let shown = [];
let cloudReady = false;
let building = null; // devam eden çizim (indirme bunu bekler)

function refreshTable() {
  const text = $('text').value;
  const o = readOptions();
  if (text.length > BIG_TEXT) {
    $('warn').textContent = `Metin ${(text.length / 1024 / 1024).toFixed(1)} MB: 1 MB üzerindeki metinlerde sayım ve yerleştirme birkaç saniye sürebilir. Tarayıcı yanıt vermezse metni bölümlere ayırıp deneyin.`;
    $('warn').classList.add('is-active');
  } else {
    $('warn').textContent = '';
    $('warn').classList.remove('is-active');
  }
  stats = countWords(text, o);
  shown = stats.list.slice(0, o.topN);
  const body = $('freq-body');
  body.innerHTML = '';
  const sum = stats.list.reduce((a, b) => a + b.count, 0) || 1;
  const frag = document.createDocumentFragment();
  shown.forEach((it, i) => {
    const tr = document.createElement('tr');
    const cells = [String(i + 1), showCase(it.word, o.caseMode), String(it.count), `%${nf.format((it.count / sum) * 100)}`];
    cells.forEach((c, j) => { const td = document.createElement('td'); td.textContent = c; if (j !== 1) td.style.textAlign = 'right'; tr.appendChild(td); });
    frag.appendChild(tr);
  });
  body.appendChild(frag);
  $('freq-box').hidden = shown.length === 0;
  $('stats').textContent = text.trim()
    ? `${stats.total} kelime tarandı · ${stats.distinct} farklı kelime kaldı · ilk ${shown.length} gösteriliyor`
    : 'Metin yapıştırın ya da bir .txt dosyası bırakın.';
  $('generate').disabled = shown.length === 0;
  $('download-csv').disabled = shown.length === 0;
  if (!text.trim() || !shown.length) {
    if (text.trim() && !shown.length) showError($('error'), 'Filtrelerden sonra kelime kalmadı. Asgari kelime uzunluğunu düşürün ya da etkisiz kelime filtresini kapatın.');
  } else {
    showError($('error'), null);
  }
}

let timer = null;
const schedule = () => { clearTimeout(timer); timer = setTimeout(() => { timer = null; refreshTable(); }, 250); };
$('text').addEventListener('input', schedule);
['opt-minlen', 'opt-topn', 'opt-stop', 'opt-numbers', 'opt-extra', 'opt-case'].forEach((id) => {
  $(id).addEventListener('input', schedule);
  $(id).addEventListener('change', schedule);
});
$('clear').addEventListener('click', () => { $('text').value = ''; refreshTable(); $('cloud-box').hidden = true; });

createDropzone({
  el: $('drop'), accept: '.txt,text/plain', multiple: false,
  onFiles: async ([file]) => {
    showError($('error'), null);
    if (!/\.txt$/i.test(file.name) && !/^text\//.test(file.type)) {
      showError($('error'), 'Yalnızca .txt (düz metin) dosyaları okunur. Word veya PDF belgeniz varsa metni kopyalayıp kutuya yapıştırın ya da "PDF Metin Çıkar" aracını kullanın.');
      return;
    }
    if (file.size > MAX_TEXT) {
      showError($('error'), 'Dosya 20 MB üzerinde; tarayıcıda işlenemez. Metni bölümlere ayırıp daha küçük dosyalarla deneyin.');
      return;
    }
    $('text').value = await file.text();
    refreshTable();
  },
});

/* ---------- Spiral yerleştirme ---------- */
// Basit, tohumlu rastgele sayı üreteci: aynı metin aynı bulutu verir.
function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const maskCanvas = document.createElement('canvas');
const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });

/** Kelimenin piksel maskesi: merkeze göre (dx,dy) ızgara ofsetleri + sınırlayıcı yarım ölçüler. */
function makeMask(word, size, angleDeg, f) {
  const px = Math.max(4, size * GRID);
  const font = `${f.weight} ${px}px ${f.family}`;
  maskCtx.font = font;
  const tw = maskCtx.measureText(word).width;
  const pad = 2;
  const w = tw + pad * 2, h = px * 1.35 + pad * 2;
  const a = (angleDeg * Math.PI) / 180;
  const bw = Math.ceil(Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a))) + 2;
  const bh = Math.ceil(Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a))) + 2;
  maskCanvas.width = bw; maskCanvas.height = bh;
  maskCtx.clearRect(0, 0, bw, bh);
  maskCtx.font = font;
  maskCtx.textAlign = 'center';
  maskCtx.textBaseline = 'middle';
  maskCtx.translate(bw / 2, bh / 2);
  maskCtx.rotate(a);
  maskCtx.fillStyle = '#000'; maskCtx.strokeStyle = '#000'; maskCtx.lineWidth = pad;
  maskCtx.strokeText(word, 0, 0); // dolgu + çizgi = kelimeler arasında küçük boşluk
  maskCtx.fillText(word, 0, 0);
  maskCtx.setTransform(1, 0, 0, 1, 0, 0);
  const data = maskCtx.getImageData(0, 0, bw, bh).data;
  const pts = [];
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) if (data[(y * bw + x) * 4 + 3] > 24) pts.push(x - (bw >> 1), y - (bh >> 1));
  return { pts: Int32Array.from(pts), hw: bw >> 1, hh: bh >> 1 };
}

function findSpot(mask, occ, gw, gh, rng) {
  const cx = gw / 2, cy = gh / 2;
  const aspect = Math.max(0.6, Math.min(2, gw / gh));
  const maxR = Math.hypot(gw, gh) * 0.55;
  let theta = rng() * Math.PI * 2;
  const pts = mask.pts;
  const pitch = 3; // spiral kolları arası (ızgara pikseli)
  for (let guard = 0; guard < 400000; guard++) {
    const r = (pitch * theta) / (Math.PI * 2);
    if (r > maxR) return null;
    const x = Math.round(cx + r * Math.cos(theta) * aspect);
    const y = Math.round(cy + r * Math.sin(theta));
    theta += Math.min(0.5, 2 / Math.max(r, 2));
    if (x - mask.hw < 0 || x + mask.hw >= gw || y - mask.hh < 0 || y + mask.hh >= gh) continue;
    let hit = false;
    for (let i = 0; i < pts.length; i += 2) {
      if (occ[(y + pts[i + 1]) * gw + (x + pts[i])]) { hit = true; break; }
    }
    if (!hit) return { x, y };
  }
  return null;
}

function markMask(mask, x, y, occ, gw) {
  const pts = mask.pts;
  for (let i = 0; i < pts.length; i += 2) occ[(y + pts[i + 1]) * gw + (x + pts[i])] = 1;
}

async function buildCloud(o, words) {
  const shown = words; // başlangıçtaki liste kopyası: yerleşim sırasında tablo değişse de etkilenmez
  const t0 = performance.now();
  const f = FONTS[o.font];
  // Yazı tipi dosyaları (latin-ext dahil) ölçümden önce yüklenmeli.
  await Promise.all(['IBM Plex Sans', 'Caveat', 'IBM Plex Mono'].filter((n) => f.family.includes(n)).map((n) => document.fonts.load(`${f.weight} 40px "${n}"`, 'ğüşıİçöĞÜŞÇÖ Abc')));
  const gw = Math.ceil(o.W * GRID), gh = Math.ceil(o.H * GRID);
  const occ = new Uint8Array(gw * gh);
  if (o.shape === 'circle') {
    const R = Math.min(gw, gh) / 2 - 2;
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) if (Math.hypot(x - gw / 2, y - gh / 2) > R) occ[y * gw + x] = 1;
  }
  const rng = mulberry32(12345 + shown.length);
  const maxC = shown[0].count, minC = shown[shown.length - 1].count;
  const span = Math.max(1, maxC - minC);
  const areaK = o.shape === 'circle' ? 0.82 : 1;
  const maxSize = Math.min(o.W, o.H) * 0.2 * areaK * f.scale;
  const minSize = Math.max(13, Math.min(o.W, o.H) * 0.025) * f.scale;
  const angles = o.rotate === 'none' ? [0] : o.rotate === 'some' ? [0, 0, 0, 90] : [0, 0, 90, -35, 35];
  const placed = [];
  let skipped = 0;
  for (let i = 0; i < shown.length; i++) {
    const it = shown[i];
    // Süre sınırı: 1,5 sn aşılırsa kalan kelimeler atlanır (yavaş cihazda takılmayı önler).
    if (performance.now() - t0 > 1500) { skipped += shown.length - i; break; }
    const label = showCase(it.word, o.caseMode);
    const t = maxC === minC ? 0.5 : (it.count - minC) / span;
    let size = minSize + (maxSize - minSize) * Math.pow(t, 0.65);
    const angle = i === 0 ? 0 : angles[Math.floor(rng() * angles.length)];
    let spot = null, mask = null;
    for (let attempt = 0; attempt < 4 && !spot; attempt++) {
      mask = makeMask(label, size, angle, f);
      spot = findSpot(mask, occ, gw, gh, rng);
      if (!spot) size *= 0.85;
      if (size < 11) break;
    }
    if (spot) {
      markMask(mask, spot.x, spot.y, occ, gw);
      placed.push({ label, size, angle, x: spot.x / GRID, y: spot.y / GRID, color: PALETTES[o.palette][i % PALETTES[o.palette].length], count: it.count });
    } else skipped++;
    if (i % 3 === 0) { setProgress($('progress'), ((i + 1) / shown.length) * 100, `${i + 1}/${shown.length} kelime yerleştirildi`); await tick(); }
  }
  return { placed, skipped, f };
}

function paint(canvas, o, placed, f) {
  canvas.width = o.W; canvas.height = o.H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, o.W, o.H);
  if (!o.transparent) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, o.W, o.H); }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const p of placed) {
    ctx.save();
    ctx.font = `${f.weight} ${p.size}px ${f.family}`;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.fillText(p.label, 0, 0);
    ctx.restore();
  }
}

$('generate').addEventListener('click', () => { building = generateCloud().finally(() => { building = null; }); });
async function generateCloud() {
  if (timer) { clearTimeout(timer); timer = null; refreshTable(); }
  if (!shown.length) return;
  showError($('error'), null);
  const o = readOptions();
  const words = shown.slice(0, 200);
  const btn = $('generate');
  btn.disabled = true;
  $('canvas').dataset.ready = '0';
  try {
    setProgress($('progress'), 0, 'Hazırlanıyor…');
    await tick();
    const { placed, skipped, f } = await buildCloud(o, words);
    paint($('canvas'), o, placed, f);
    $('cloud-box').hidden = false;
    $('canvas').dataset.ready = '1';
    $('cloud-info').textContent = `${o.W}×${o.H} px · ${placed.length} kelime yerleşti${skipped ? ` · ${skipped} kelime sığmadı` : ''}`;
    if (skipped) {
      $('warn').textContent = `${skipped} kelime alana sığmadığı için bulutta yok. Boyutu büyütün, kelime sayısını azaltın ya da dikdörtgen şekli seçin; sıklık tablosunda hepsi yine görünür.`;
      $('warn').classList.add('is-active');
    }
    cloudReady = true;
    $('download-png').disabled = false;
  } catch (err) {
    console.error(err);
    showError($('error'), 'Bulut oluşturulamadı. Kelime sayısını azaltın ya da daha küçük bir boyut seçin; sorun sürerse sayfayı yenileyip tekrar deneyin.');
  } finally {
    setProgress($('progress'), null);
    btn.disabled = false;
  }
}

/* ---------- İndirme ---------- */
$('download-png').addEventListener('click', async () => {
  if (building) await building; // çizim bitmeden tıklanırsa bitmesini bekle
  if (!cloudReady) return;
  $('canvas').toBlob((b) => {
    if (b) downloadBlob(b, 'kelime-bulutu.png');
    else showError($('error'), 'PNG oluşturulamadı. Daha küçük bir boyut seçip yeniden deneyin.');
  }, 'image/png');
});

$('download-csv').addEventListener('click', () => {
  if (!shown.length) return;
  const o = readOptions();
  const sum = stats.list.reduce((a, b) => a + b.count, 0) || 1;
  // Türkçe Excel için noktalı virgül ve BOM; hücre başındaki =,+,-,@ karakterleri formül olmasın diye kaçırılır.
  const safe = (s) => (/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""');
  const lines = ['kelime;adet;oran'];
  shown.forEach((it) => lines.push(`"${safe(showCase(it.word, o.caseMode))}";${it.count};${nf.format((it.count / sum) * 100).replace('.', ',')}`));
  downloadBlob(new Blob(['﻿', lines.join('\r\n'), '\r\n'], { type: 'text/csv;charset=utf-8' }), 'kelime-sikligi.csv');
});

refreshTable();
