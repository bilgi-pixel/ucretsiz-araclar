// PDF N-up (2/4/6/9'lu) ve kitapçık dizgisi — pdf-lib embedPage ile vektörel; raster yok.
// Tüm işlem tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4;
const CELL_PAD = 4; // hücre içi iç boşluk (pt)

// Kağıtlar (mm, dikey)
const PAPERS = { a4: [210, 297], a3: [297, 420], a5: [148, 210], letter: [215.9, 279.4] };

// Dikey ve yatay kağıt için ızgara (sütun × satır)
const GRIDS = {
  portrait: { 2: [1, 2], 4: [2, 2], 6: [2, 3], 9: [3, 3] },
  landscape: { 2: [2, 1], 4: [2, 2], 6: [3, 2], 9: [3, 3] },
};

let items = []; // { id, file, pages, bytes }
let results = [];
let previewToken = 0;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir.`);
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
  drawPreview();
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  items = items.filter((it) => it.id !== li.dataset.id);
  li.remove();
  refresh();
  drawPreview();
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-box').hidden = !has;
  $('run').disabled = !has;
}

function reset() {
  items = []; results = [];
  $('files').innerHTML = '';
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  refresh();
}
$('clear').addEventListener('click', reset);

function getOptions() {
  const [pw, ph] = PAPERS[$('opt-paper').value];
  const margin = Math.max(0, Number($('opt-margin').value.replace(',', '.')) || 0);
  if (margin * 2 >= Math.min(pw, ph) / 2) throw new Error('MARGIN');
  return {
    booklet: $('opt-mode').value === 'booklet',
    n: Number($('opt-n').value),
    pw: pw * MM, ph: ph * MM,
    orient: $('opt-orient').value, // auto | portrait | landscape
    order: $('opt-order').value, // rows | cols
    margin: margin * MM,
    border: $('opt-border').checked,
  };
}

/** Kitapçık için sayfa sayısını 4'ün katına tamamlar. */
const bookletTotal = (n) => Math.ceil(n / 4) * 4;

/** Kağıt yönünü seçer: kitapçık her zaman yatay; "otomatik" ilk sayfaya en iyi sığan yönü seçer. */
function pickOrientation(o, ew, eh) {
  if (o.booklet) return 'landscape';
  if (o.orient !== 'auto') return o.orient;
  const best = (ori) => {
    const TW = ori === 'landscape' ? o.ph : o.pw, TH = ori === 'landscape' ? o.pw : o.ph;
    const [c, r] = GRIDS[ori][o.n];
    const cw = (TW - 2 * o.margin) / c - 2 * CELL_PAD, ch = (TH - 2 * o.margin) / r - 2 * CELL_PAD;
    return Math.min(cw / ew, ch / eh);
  };
  return best('landscape') > best('portrait') ? 'landscape' : 'portrait';
}

/** Çıktı yüzlerinin planı: her yüz için hücre sırasına göre kaynak sayfa indeksi (ya da boş için null). */
function plan(total, o) {
  const sheets = [];
  if (o.booklet) {
    const P = bookletTotal(total);
    const at = (i) => (i < total ? i : null);
    for (let k = 0; k < P / 4; k++) {
      sheets.push([at(P - 1 - 2 * k), at(2 * k)]); // ön yüz: sol, sağ
      sheets.push([at(2 * k + 1), at(P - 2 - 2 * k)]); // arka yüz
    }
    return sheets;
  }
  for (let s = 0; s < total; s += o.n) {
    const cells = [];
    for (let i = 0; i < o.n; i++) cells.push(s + i < total ? s + i : null);
    sheets.push(cells);
  }
  return sheets;
}

/** Hücre i'nin konumu (PDF koordinatı: sol-alt başlangıç). */
function cellRect(i, ori, o) {
  const TW = ori === 'landscape' ? o.ph : o.pw, TH = ori === 'landscape' ? o.pw : o.ph;
  const [cols, rows] = o.booklet ? [2, 1] : GRIDS[ori][o.n];
  const col = o.order === 'cols' && !o.booklet ? Math.floor(i / rows) : i % cols;
  const row = o.order === 'cols' && !o.booklet ? i % rows : Math.floor(i / cols);
  const cw = (TW - 2 * o.margin) / cols, ch = (TH - 2 * o.margin) / rows;
  return { TW, TH, x: o.margin + col * cw, y: TH - o.margin - (row + 1) * ch, w: cw, h: ch };
}

/** Sayfayı hücreye oranı koruyarak sığdırır; dönen: ölçek ve sol-alt konum. */
function fitInCell(ew, eh, c) {
  const s = Math.min((c.w - 2 * CELL_PAD) / ew, (c.h - 2 * CELL_PAD) / eh);
  return { s, x: c.x + (c.w - ew * s) / 2, y: c.y + (c.h - eh * s) / 2 };
}

// ---- Önizleme: ilk çıktı yüzü ----
async function drawPreview() {
  const token = ++previewToken;
  const first = items[0];
  if (!first) return;
  let o;
  try { o = getOptions(); } catch { $('preview').hidden = true; $('preview-note').textContent = 'Önizleme için daha küçük bir kenar boşluğu girin.'; return; }
  try {
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: first.bytes.slice(0) }).promise;
    const sheet = plan(first.pages, o)[0];
    const p1 = await pdf.getPage(1);
    const b1 = p1.getViewport({ scale: 1 });
    const ori = pickOrientation(o, b1.width, b1.height);
    const T = cellRect(0, ori, o);
    const k = Math.min(1, 300 / Math.max(T.TW, T.TH));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(T.TW * k); canvas.height = Math.round(T.TH * k);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < sheet.length; i++) {
      const c = cellRect(i, ori, o);
      if (o.border) { ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.strokeRect(c.x * k, (c.TH - c.y - c.h) * k, c.w * k, c.h * k); }
      if (sheet[i] === null) continue;
      const page = await pdf.getPage(sheet[i] + 1);
      const base = page.getViewport({ scale: 1 });
      const f = fitInCell(base.width, base.height, c);
      const vp = page.getViewport({ scale: f.s * k });
      const tmp = document.createElement('canvas');
      tmp.width = Math.max(1, Math.round(vp.width)); tmp.height = Math.max(1, Math.round(vp.height));
      const tctx = tmp.getContext('2d');
      tctx.fillStyle = '#fff'; tctx.fillRect(0, 0, tmp.width, tmp.height);
      await page.render({ canvasContext: tctx, viewport: vp }).promise;
      page.cleanup();
      if (token !== previewToken) { pdf.destroy(); return; }
      // Sayfa kenarını belli etmek için ince gri çerçeve
      ctx.drawImage(tmp, f.x * k, (c.TH - f.y - base.height * f.s) * k);
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
      ctx.strokeRect(f.x * k, (c.TH - f.y - base.height * f.s) * k, tmp.width, tmp.height);
    }
    pdf.destroy();
    if (token !== previewToken) return;
    const dst = $('preview');
    dst.width = canvas.width; dst.height = canvas.height;
    dst.getContext('2d').drawImage(canvas, 0, 0);
    dst.hidden = false;
    $('preview-note').textContent = o.booklet
      ? 'Önizleme: kitapçığın ilk yüzü (en son sayfa solda, 1. sayfa sağda).'
      : `Önizleme: ilk çıktı sayfası (${o.n}'li düzen, ${ori === 'landscape' ? 'yatay' : 'dikey'}).`;
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    $('preview').hidden = true;
    $('preview-note').textContent = 'Önizleme gösterilemedi; düzenleme yine de uygulanabilir.';
  }
}

function onOptionChange() {
  const booklet = $('opt-mode').value === 'booklet';
  $('opt-n').disabled = booklet;
  $('opt-orient').disabled = booklet;
  $('opt-order').disabled = booklet;
  $('booklet-note').hidden = !booklet;
  drawPreview();
}
for (const id of ['opt-mode', 'opt-n', 'opt-paper', 'opt-orient', 'opt-order', 'opt-border']) $(id).addEventListener('change', onOptionChange);
$('opt-margin').addEventListener('input', drawPreview);

// ---- Asıl iş ----
$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  results = [];
  try {
    const o = getOptions();
    const PDFLib = await getPdfLib();
    const gray = PDFLib.rgb(0.55, 0.55, 0.55);
    for (let i = 0; i < items.length; i++) {
      const { file, bytes } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} okunuyor…`);
      await tick();
      const src = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
      const out = await PDFLib.PDFDocument.create();
      const srcPages = src.getPages();
      const embedded = await out.embedPdf(src, srcPages.map((_, k) => k)); // tüm sayfalar, vektörel
      const info = srcPages.map((sp) => {
        const { width: pw, height: ph } = sp.getSize();
        const rot = ((sp.getRotation().angle % 360) + 360) % 360;
        const swap = rot === 90 || rot === 270;
        return { pw, ph, rot, ew: swap ? ph : pw, eh: swap ? pw : ph };
      });
      const ori = pickOrientation(o, info[0].ew, info[0].eh);
      const sheets = plan(srcPages.length, o);
      for (let sIdx = 0; sIdx < sheets.length; sIdx++) {
        const first = cellRect(0, ori, o);
        const page = out.addPage([first.TW, first.TH]);
        sheets[sIdx].forEach((srcIdx, ci) => {
          const c = cellRect(ci, ori, o);
          if (o.border) page.drawRectangle({ x: c.x, y: c.y, width: c.w, height: c.h, borderColor: gray, borderWidth: 0.5 });
          if (srcIdx === null) return;
          const d = info[srcIdx];
          const f = fitInCell(d.ew, d.eh, c);
          // Sayfa döndürmesini (/Rotate) koruyarak çiz
          let x = f.x, y = f.y, angle = 0;
          if (d.rot === 90) { y = f.y + d.pw * f.s; angle = -90; }
          else if (d.rot === 180) { x = f.x + d.pw * f.s; y = f.y + d.ph * f.s; angle = 180; }
          else if (d.rot === 270) { x = f.x + d.ph * f.s; angle = 90; }
          page.drawPage(embedded[srcIdx], { x, y, xScale: f.s, yScale: f.s, rotate: PDFLib.degrees(angle) });
        });
        if (sIdx % 10 === 9) {
          setProgress($('progress'), ((i + (sIdx + 1) / sheets.length) / items.length) * 100, `${file.name}: ${sIdx + 1}/${sheets.length} yüz`);
          await tick();
        }
      }
      out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
      out.setCreator('araclar.bilisimajans.com');
      const data = await out.save();
      results.push({
        name: `${baseName(file.name)}-${o.booklet ? 'kitapcik' : `${o.n}li`}.pdf`,
        blob: new Blob([data], { type: 'application/pdf' }),
        pages: srcPages.length, sheets: sheets.length, padded: o.booklet ? bookletTotal(srcPages.length) : srcPages.length,
      });
    }
    setProgress($('progress'), 100, 'Hazır');
    renderResult(o);
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    showError($('error'), m === 'MARGIN' ? 'Kenar boşluğu kağıda göre çok büyük. Daha küçük bir değer girin (örnek: 8 mm).' : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function renderResult(o) {
  const box = $('downloads');
  box.innerHTML = '';
  const describe = (r) => (o.booklet
    ? `${r.pages} sayfa ${r.padded}'e tamamlandı → ${r.sheets} yüz (${r.sheets / 2} yaprak)`
    : `${r.pages} sayfa → ${r.sheets} çıktı sayfası`);
  $('result-info').textContent = results.length === 1
    ? `${describe(results[0])} · ${formatBytes(results[0].blob.size)}`
    : `${results.length} dosya hazırlandı`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? "Düzenlenmiş PDF'i indir" : `${r.name} indir`;
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
