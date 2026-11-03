// PDF'e Sayfa Numarası Ekle — pdf-lib + fontkit + DejaVu Sans (Türkçe karakter için).
// Tüm işlem tarayıcıda; dosya ve yazı tipi aynı origin'deki vendor/ klasöründen yüklenir, ağa veri çıkmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, loadScript, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4; // 1 mm = 2.8346 pt

/** Hazır biçim kalıpları: {n} sayfa numarası, {toplam} son numara. */
const FORMATS = {
  plain: '{n}',
  of: '{n} / {toplam}',
  word: 'Sayfa {n}',
  wordOf: 'Sayfa {n} / {toplam}',
  dash: '- {n} -',
  custom: '',
};

let items = []; // { id, file, pages, bytes }
let results = []; // { name, blob }
let fontCache = null; // { regular, bold } ArrayBuffer
let preview = null; // { canvas (sayfa görseli), width, height } — ilk dosyanın ilk sayfası

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

async function getFontkit() {
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  return window.fontkit;
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (f) => fetch(`${base}${f}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

/** Dosyaları doğrular (şifreli/bozuk), sayfa sayısını okur ve listeye ekler. */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; Word belgesi için önce Word'den PDF'e aracını kullanın.`);
      continue;
    }
    let bytes, pages;
    try {
      bytes = await file.arrayBuffer();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
      pages = doc.getPageCount();
      if (!pages) throw new Error('no pages');
    } catch (err) {
      showError($('error'), /encrypted/i.test(String(err))
        ? `"${file.name}" şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.`
        : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin.`);
      continue;
    }
    if (file.size >= BIG_FILE) {
      $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
      $('warning').classList.add('is-active');
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    items.push({ id, file, pages, bytes });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${pages} sayfa · ${formatBytes(file.size)}`;
    $('files').appendChild(li);
  }
  refresh();
  if (items.length && !preview) await buildPreview();
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  items = items.filter((it) => it.id !== li.dataset.id);
  li.remove();
  if (!items.length) preview = null;
  refresh();
  if (items.length) buildPreview(); else drawPreview();
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-box').hidden = !has;
  $('run').disabled = !has;
  const maxPages = Math.max(0, ...items.map((it) => it.pages));
  $('page-count').textContent = has ? (items.length === 1 ? `${maxPages} sayfa` : `${items.length} dosya, en çok ${maxPages} sayfa`) : '';
}

function reset() {
  items = []; results = []; preview = null;
  $('files').innerHTML = '';
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  refresh();
  drawPreview();
}
$('clear').addEventListener('click', reset);

/** Formdaki ayarları tek nesnede toplar. */
function getOptions() {
  const fmtKey = $('opt-format').value;
  const pattern = fmtKey === 'custom' ? ($('opt-custom').value || '{n}') : FORMATS[fmtKey];
  return {
    position: $('opt-position').value, // bottom-center, bottom-right, bottom-left, top-center, top-right, top-left
    pattern,
    start: Math.max(0, Math.floor(Number($('opt-start').value) || 1)),
    skip: Math.max(0, Math.floor(Number($('opt-skip').value) || 0)),
    countSkipped: $('opt-count-skipped').checked,
    range: $('opt-range').value.trim(),
    size: Math.min(72, Math.max(6, Number($('opt-size').value) || 10)),
    bold: $('opt-bold').checked,
    color: $('opt-color').value || '#000000',
    margin: Math.min(60, Math.max(3, Number($('opt-margin').value) || 12)),
  };
}

/** Sayfa indeksine (0 tabanlı) düşen numarayı ve son numarayı hesaplar; null → numaralanmaz. */
function numberFor(index, total, o) {
  if (index < o.skip) return null;
  const base = o.countSkipped ? o.start + index : o.start + index - o.skip;
  const last = o.countSkipped ? o.start + total - 1 : o.start + total - 1 - o.skip;
  return { n: base, last };
}

function formatLabel(pattern, n, last) {
  return pattern.replaceAll('{n}', String(n)).replaceAll('{toplam}', String(last)).replaceAll('{total}', String(last));
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  const v = m ? parseInt(m[1], 16) : 0;
  return { r: ((v >> 16) & 255) / 255, g: ((v >> 8) & 255) / 255, b: (v & 255) / 255 };
}

/** Görsel (döndürülmüş) sayfa koordinatını PDF koordinatına çevirir. */
function toPdf(rotation, W, H, vx, vy) {
  switch (((rotation % 360) + 360) % 360) {
    case 90: return { x: W - vy, y: vx };
    case 180: return { x: W - vx, y: H - vy };
    case 270: return { x: vy, y: H - vx };
    default: return { x: vx, y: vy };
  }
}

/** Görsel alanda (genişlik vw, yükseklik vh) metnin sol-alt başlangıç noktası. */
function anchor(o, vw, vh, textWidth) {
  const m = o.margin * MM;
  const [vert, horiz] = o.position.split('-');
  const x = horiz === 'left' ? m : horiz === 'right' ? vw - m - textWidth : (vw - textWidth) / 2;
  const y = vert === 'top' ? vh - m - o.size : m;
  return { x, y };
}

// ---- Önizleme (pdf.js ile ilk sayfa + canvas üstüne numara) ----
async function buildPreview() {
  const first = items[0];
  if (!first) return;
  try {
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: first.bytes.slice(0) }).promise;
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(1.2, 320 / base.width);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    preview = { canvas, scale, vw: vp.width / scale, vh: vp.height / scale, pages: first.pages };
    page.cleanup(); pdf.destroy();
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    preview = null;
  }
  drawPreview();
}

function drawPreview() {
  const out = $('preview');
  if (!preview) { out.hidden = true; $('preview-hint').hidden = !items.length; return; }
  out.hidden = false; $('preview-hint').hidden = true;
  const o = getOptions();
  out.width = preview.canvas.width; out.height = preview.canvas.height;
  const ctx = out.getContext('2d');
  ctx.drawImage(preview.canvas, 0, 0);
  // Önizleme ilk sayfayı gösterir; ilk sayfa atlanıyorsa bunu belirt.
  const num = numberFor(0, preview.pages, o);
  const note = $('preview-note');
  if (!num) { note.textContent = `İlk ${o.skip} sayfa atlanacak; numara ${o.skip + 1}. sayfadan başlar. Önizleme ilk sayfayı gösteriyor.`; return; }
  note.textContent = 'Önizleme: ilk sayfa (yaklaşık yerleşim).';
  const label = formatLabel(o.pattern, num.n, num.last);
  const s = preview.scale;
  ctx.font = `${o.bold ? 'bold ' : ''}${o.size * s}px "DejaVu Sans", Arial, sans-serif`;
  const w = ctx.measureText(label).width / s;
  const a = anchor(o, preview.vw, preview.vh, w);
  ctx.fillStyle = o.color;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(label, a.x * s, (preview.vh - a.y) * s);
}

['opt-position', 'opt-format', 'opt-custom', 'opt-start', 'opt-skip', 'opt-count-skipped', 'opt-size', 'opt-bold', 'opt-color', 'opt-margin'].forEach((id) => {
  $(id).addEventListener('input', drawPreview);
  $(id).addEventListener('change', drawPreview);
});
$('opt-format').addEventListener('change', () => { $('field-custom').hidden = $('opt-format').value !== 'custom'; });

// ---- Asıl iş ----
$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  results = [];
  const o = getOptions();
  try {
    if (o.pattern.indexOf('{n}') === -1) throw new Error('PATTERN');
    const PDFLib = await getPdfLib();
    const fontkit = await getFontkit();
    const fontData = await loadFonts();
    const color = hexToRgb(o.color);
    for (let i = 0; i < items.length; i++) {
      const { file, bytes } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} okunuyor…`);
      await tick();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
      doc.registerFontkit(fontkit);
      const font = await doc.embedFont(o.bold ? fontData.bold : fontData.regular, { subset: true });
      const pages = doc.getPages();
      const total = pages.length;
      const allowed = new Set(o.range ? parsePageRanges(o.range, total) : pages.map((_, k) => k + 1));
      let drawn = 0;
      for (let p = 0; p < total; p++) {
        if (p % 20 === 0) { setProgress($('progress'), ((i + p / total) / items.length) * 100, `${file.name}: sayfa ${p + 1}/${total}`); await tick(); }
        if (!allowed.has(p + 1)) continue;
        const num = numberFor(p, total, o);
        if (!num) continue;
        const page = pages[p];
        const { width: W, height: H } = page.getSize();
        const rot = page.getRotation().angle;
        const sideways = rot % 180 !== 0;
        const vw = sideways ? H : W, vh = sideways ? W : H;
        const label = formatLabel(o.pattern, num.n, num.last);
        const tw = font.widthOfTextAtSize(label, o.size);
        const a = anchor(o, vw, vh, tw);
        const pt = toPdf(rot, W, H, a.x, a.y);
        page.drawText(label, { x: pt.x, y: pt.y, size: o.size, font, color: PDFLib.rgb(color.r, color.g, color.b), rotate: PDFLib.degrees(rot) });
        drawn++;
      }
      if (!drawn) throw new Error('NONE');
      doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
      doc.setCreator('araclar.bilisimajans.com');
      const out = await doc.save();
      results.push({ name: `${baseName(file.name)}-numarali.pdf`, blob: new Blob([out], { type: 'application/pdf' }), pages: total, drawn });
    }
    setProgress($('progress'), 100, 'Hazır');
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    const msg = m === 'PATTERN' ? 'Özel kalıpta {n} yer tutucusu bulunmalı; örnek: "Sayfa {n} / {toplam}".'
      : m === 'NONE' ? 'Bu ayarlarla hiçbir sayfaya numara düşmedi. Atlanan sayfa sayısını ya da sayfa aralığını küçültün.'
      : m === 'FONT' ? 'Yazı tipi yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : /Geçersiz sayfa ifadesi/.test(m) ? `${m} Boş bırakırsanız tüm sayfalar numaralanır.`
      : /encrypted/i.test(m) ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.'
      : friendlyError(err);
    showError($('error'), msg);
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  box.innerHTML = '';
  const totalDrawn = results.reduce((s, r) => s + r.drawn, 0);
  $('result-info').textContent = results.length === 1
    ? `${results[0].pages} sayfa · ${results[0].drawn} sayfaya numara eklendi · ${formatBytes(results[0].blob.size)}`
    : `${results.length} dosya · toplam ${totalDrawn} sayfaya numara eklendi`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = i === 0 && results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? 'Numaralı PDF\'i indir' : `${r.name} indir`;
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    box.appendChild(b);
  });
  if (results.length > 1) {
    const all = document.createElement('button');
    all.type = 'button'; all.className = 'ba-btn ba-btn-primary'; all.id = 'download-all';
    all.textContent = 'Tümünü indir';
    all.addEventListener('click', async () => { for (const r of results) { downloadBlob(r.blob, r.name); await new Promise((res) => setTimeout(res, 400)); } });
    box.appendChild(all);
  }
  $('result').classList.add('is-active');
}
