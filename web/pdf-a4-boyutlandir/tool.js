// PDF Sayfa Boyutunu Değiştir — pdf-lib embedPage ile vektörel ölçekleme + pdf.js önizleme.
// Tüm işlem tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4; // 1 mm = 2.8346 pt

// Hedef kağıt boyutları (mm, dikey: genişlik × yükseklik)
const PAPERS = {
  a4: [210, 297], a5: [148, 210], a3: [297, 420], letter: [215.9, 279.4], legal: [215.9, 355.6],
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
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resmi PDF'e çevirmek için Resimden PDF'e aracını kullanın.`);
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

/** Form değerlerini okur; geçersiz özel ölçüde Error fırlatır. */
function getOptions() {
  const paper = $('opt-paper').value;
  let w, h;
  if (paper === 'custom') {
    w = Number($('opt-w').value.replace(',', '.'));
    h = Number($('opt-h').value.replace(',', '.'));
    if (!(w >= 20 && w <= 5000 && h >= 20 && h <= 5000)) throw new Error('CUSTOM');
  } else {
    [w, h] = PAPERS[paper];
  }
  const margin = Math.max(0, Number($('opt-margin').value.replace(',', '.')) || 0);
  if (margin * 2 >= Math.min(w, h)) throw new Error('MARGIN');
  return { w: w * MM, h: h * MM, margin: margin * MM, mode: $('opt-mode').value, orient: $('opt-orient').value };
}

/** Sayfanın görünen (döndürme uygulanmış) boyutuna göre hedef kağıdı ve yerleşimi hesaplar. */
function layout(ew, eh, o) {
  let TW = o.w, TH = o.h; // dikey
  const landscape = o.orient === 'landscape' || (o.orient === 'auto' && ew > eh);
  if (landscape) { TW = o.h; TH = o.w; }
  const m = o.mode === 'box' ? 0 : o.margin;
  const iw = TW - 2 * m, ih = TH - 2 * m;
  let s = 1;
  if (o.mode === 'fit') s = Math.min(iw / ew, ih / eh);
  else if (o.mode === 'fill') s = Math.max(iw / ew, ih / eh);
  return { TW, TH, s, x: (TW - ew * s) / 2, y: (TH - eh * s) / 2, m };
}

// ---- Önizleme: ilk dosyanın ilk sayfası, hedef kağıda yerleştirilmiş ----
async function drawPreview() {
  const token = ++previewToken;
  const first = items[0];
  if (!first) return;
  let o;
  try { o = getOptions(); } catch { $('preview').hidden = true; $('preview-note').textContent = 'Önizleme için geçerli bir kağıt ölçüsü ve kenar boşluğu girin.'; return; }
  try {
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: first.bytes.slice(0) }).promise;
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const L = layout(base.width, base.height, o);
    const k = Math.min(1, 280 / Math.max(L.TW, L.TH));
    // Kaynak sayfayı yerleşim ölçeğinde ayrı bir tuvale çiz
    const src = document.createElement('canvas');
    const vp = page.getViewport({ scale: L.s * k });
    src.width = Math.max(1, Math.round(vp.width)); src.height = Math.max(1, Math.round(vp.height));
    const sctx = src.getContext('2d');
    sctx.fillStyle = '#fff'; sctx.fillRect(0, 0, src.width, src.height);
    await page.render({ canvasContext: sctx, viewport: vp }).promise;
    page.cleanup(); pdf.destroy();
    if (token !== previewToken) return;
    const canvas = $('preview');
    canvas.width = Math.round(L.TW * k); canvas.height = Math.round(L.TH * k);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath(); ctx.rect(L.m * k, L.m * k, canvas.width - 2 * L.m * k, canvas.height - 2 * L.m * k); ctx.clip();
    ctx.drawImage(src, L.x * k, L.y * k, src.width, src.height);
    ctx.restore();
    canvas.hidden = false;
    $('preview-note').textContent = `Önizleme: ilk sayfa ${(L.TW / MM).toFixed(0)} × ${(L.TH / MM).toFixed(0)} mm kağıda yerleştirilmiş hâliyle.`;
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    $('preview').hidden = true;
    $('preview-note').textContent = 'Önizleme gösterilemedi; boyutlandırma yine de uygulanabilir.';
  }
}

for (const id of ['opt-paper', 'opt-mode', 'opt-orient']) $(id).addEventListener('change', onOptionChange);
for (const id of ['opt-w', 'opt-h', 'opt-margin']) $(id).addEventListener('input', drawPreview);
function onOptionChange() {
  $('field-custom').hidden = $('opt-paper').value !== 'custom';
  $('opt-margin').disabled = $('opt-mode').value === 'box';
  drawPreview();
}

/** Kaynak sayfayı (döndürme dahil) hedef sayfaya çizer. */
function drawFitted(PDFLib, outPage, emb, pw, ph, rot, L, mode) {
  const s = L.s;
  const ox = L.x, oy = L.y;
  let x = ox, y = oy, angle = 0;
  if (rot === 90) { x = ox; y = oy + pw * s; angle = -90; }
  else if (rot === 180) { x = ox + pw * s; y = oy + ph * s; angle = 180; }
  else if (rot === 270) { x = ox + ph * s; y = oy; angle = 90; }
  // PDF koordinatlarında y yukarı doğrudur; layout y'si alttan ölçülür (simetrik olduğu için aynı).
  const clip = mode === 'fill' && L.m > 0;
  if (clip) {
    outPage.pushOperators(
      PDFLib.pushGraphicsState(),
      PDFLib.moveTo(L.m, L.m), PDFLib.lineTo(L.TW - L.m, L.m), PDFLib.lineTo(L.TW - L.m, L.TH - L.m), PDFLib.lineTo(L.m, L.TH - L.m),
      PDFLib.closePath(), PDFLib.clip(), PDFLib.endPath(),
    );
  }
  outPage.drawPage(emb, { x, y, xScale: s, yScale: s, rotate: PDFLib.degrees(angle) });
  if (clip) outPage.pushOperators(PDFLib.popGraphicsState());
}

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
    for (let i = 0; i < items.length; i++) {
      const { file, bytes } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} okunuyor…`);
      await tick();
      const src = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
      const out = await PDFLib.PDFDocument.create();
      const srcPages = src.getPages();
      const CHUNK = 40;
      for (let start = 0; start < srcPages.length; start += CHUNK) {
        const idx = [];
        for (let k = start; k < Math.min(srcPages.length, start + CHUNK); k++) idx.push(k);
        const embedded = await out.embedPdf(src, idx);
        embedded.forEach((emb, j) => {
          const sp = srcPages[idx[j]];
          const { width: pw, height: ph } = sp.getSize();
          const rot = ((sp.getRotation().angle % 360) + 360) % 360;
          const swap = rot === 90 || rot === 270;
          const L = layout(swap ? ph : pw, swap ? pw : ph, o);
          const np = out.addPage([L.TW, L.TH]);
          drawFitted(PDFLib, np, emb, pw, ph, rot, L, o.mode);
        });
        setProgress($('progress'), ((i + Math.min(1, (start + CHUNK) / srcPages.length)) / items.length) * 100, `${file.name}: ${Math.min(srcPages.length, start + CHUNK)}/${srcPages.length} sayfa`);
        await tick();
      }
      out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
      out.setCreator('araclar.bilisimajans.com');
      const data = await out.save();
      results.push({ name: `${baseName(file.name)}-boyutlu.pdf`, blob: new Blob([data], { type: 'application/pdf' }), pages: srcPages.length });
    }
    setProgress($('progress'), 100, 'Hazır');
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    const msg = m === 'CUSTOM' ? 'Özel ölçü geçersiz. Genişlik ve yüksekliği 20 ile 5000 mm arasında, milimetre cinsinden girin (örnek: 210 ve 297).'
      : m === 'MARGIN' ? 'Kenar boşluğu kağıda göre çok büyük. Daha küçük bir değer girin (örnek: 10 mm).'
      : friendlyError(err);
    showError($('error'), msg);
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  box.innerHTML = '';
  const total = results.reduce((s, r) => s + r.pages, 0);
  $('result-info').textContent = results.length === 1
    ? `${results[0].pages} sayfa yeniden boyutlandırıldı · ${formatBytes(results[0].blob.size)}`
    : `${results.length} dosya · toplam ${total} sayfa yeniden boyutlandırıldı`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? "Boyutlandırılmış PDF'i indir" : `${r.name} indir`;
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
