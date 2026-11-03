// PDF Düzleştir (Flatten) — iki mod:
//  (a) Form + açıklama: pdf-lib form.flatten() alanları sayfa içeriğine işler; yorum/damga/çizim gibi
//      açıklamaların (annotation) görünüm akışları (/AP /N) sayfaya form XObject olarak çizilir.
//  (b) Tam raster: pdf.js her sayfayı görüntüye çevirir, yeni PDF'e gömülür (metin seçilemez olur).
// Her şey tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_PIXELS = 36_000_000; // tek sayfa için kanvas üst sınırı (bellek koruması)
const FONTKIT_URL = new URL('../vendor/pdf-lib-fontkit@1.1.1/fontkit.umd.min.js', import.meta.url).href;
const FONT_URL = new URL('../vendor/fonts/dejavu-sans@2.37/DejaVuSans.ttf', import.meta.url).href;

let items = []; // { id, file, bytes, pages, fields, annots, signed }
let results = []; // { name, blob, before, after, note }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

/** Dosyayı doğrular; alan, açıklama ve imza alanı sayısını çıkarır. */
async function inspect(PDFLib, bytes) {
  const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
  const { PDFName, PDFDict } = PDFLib;
  let fields = 0, signed = false, annots = 0;
  if (doc.catalog.lookupMaybe(PDFName.of('AcroForm'), PDFDict)) {
    try {
      const all = doc.getForm().getFields();
      fields = all.length;
      signed = all.some((f) => f instanceof PDFLib.PDFSignature);
    } catch { /* form okunamazsa alan sayısı 0 kalır */ }
  }
  for (const p of doc.getPages()) {
    const a = p.node.Annots();
    if (!a) continue;
    for (let i = 0; i < a.size(); i++) {
      const d = doc.context.lookupMaybe(a.get(i), PDFDict);
      const st = d && d.get(PDFName.of('Subtype'));
      const s = st ? String(st) : '';
      if (s !== '/Link' && s !== '/Widget' && s !== '/Popup') annots++;
    }
  }
  return { pages: doc.getPageCount(), fields, annots, signed };
}

async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resim dosyası için Resimden PDF'e aracını kullanın.`);
      continue;
    }
    let bytes, info;
    try {
      bytes = await file.arrayBuffer();
      info = await inspect(PDFLib, bytes);
      if (!info.pages) throw new Error('no pages');
    } catch (err) {
      showError($('error'), /encrypted/i.test(String(err))
        ? `"${file.name}" şifreli görünüyor. Dosya şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırıp tekrar deneyin.`
        : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı başka bir programda açabildiğinizi kontrol edip yeniden seçin.`);
      continue;
    }
    if (file.size >= BIG_FILE) {
      $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir, özellikle tam raster modunda telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
      $('warning').classList.add('is-active');
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    items.push({ id, file, bytes, ...info });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>';
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${info.pages} sayfa · ${info.fields} alan · ${info.annots} açıklama · ${formatBytes(file.size)}${info.signed ? ' · imza alanı var' : ''}`;
    $('files').appendChild(li);
  }
  refresh();
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  items = items.filter((it) => it.id !== li.dataset.id);
  li.remove();
  refresh();
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('run').disabled = !has;
  $('sign-warn').hidden = !items.some((it) => it.signed);
  syncMode();
}

function syncMode() {
  const raster = $('opt-mode').value === 'raster';
  $('group-form').hidden = raster;
  $('group-raster').hidden = !raster;
  $('opt-quality-out').textContent = `%${Math.round(Number($('opt-quality').value) * 100)}`;
}
$('opt-mode').addEventListener('change', syncMode);
$('opt-quality').addEventListener('input', syncMode);

function reset() {
  items = []; results = [];
  $('files').innerHTML = '';
  $('downloads').innerHTML = '';
  $('result-list').innerHTML = '';
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  setProgress($('progress'), null);
  refresh();
}
$('clear').addEventListener('click', reset);

/* ---------- (a) Form + açıklama düzleştirme ---------- */

/** Tek bir açıklamanın /AP /N akışını bulur (durum sözlüğü varsa /AS ile seçer). */
function getAppearanceStream(PDFLib, ctx, annot) {
  const { PDFName, PDFDict, PDFStream, PDFRef } = PDFLib;
  const ap = annot.lookupMaybe(PDFName.of('AP'), PDFDict);
  if (!ap) return null;
  let nRaw = ap.get(PDFName.of('N'));
  let n = nRaw && ctx.lookup(nRaw);
  if (n instanceof PDFDict && !(n instanceof PDFStream)) {
    const as = annot.get(PDFName.of('AS'));
    nRaw = as ? n.get(as) : null;
    n = nRaw && ctx.lookup(nRaw);
  }
  if (!(n instanceof PDFStream)) return null;
  return { stream: n, ref: nRaw instanceof PDFRef ? nRaw : ctx.register(n) };
}

/** BBox + Matrix → açıklama Rect'ine oturan dönüşüm matrisi (PDF 32000-1, 12.5.5). */
function fitMatrix(PDFLib, stream, rect) {
  const { PDFName, PDFArray, PDFNumber } = PDFLib;
  const num = (arr, i, d) => { const v = arr && arr.lookupMaybe(i, PDFNumber); return v ? v.asNumber() : d; };
  const bb = stream.dict.lookupMaybe(PDFName.of('BBox'), PDFArray);
  const m = stream.dict.lookupMaybe(PDFName.of('Matrix'), PDFArray);
  const b = [num(bb, 0, 0), num(bb, 1, 0), num(bb, 2, 1), num(bb, 3, 1)];
  const mm = [1, 0, 0, 1, 0, 0].map((d, i) => num(m, i, d));
  const xs = [], ys = [];
  for (const [x, y] of [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]]) {
    xs.push(mm[0] * x + mm[2] * y + mm[4]);
    ys.push(mm[1] * x + mm[3] * y + mm[5]);
  }
  const tx1 = Math.min(...xs), tx2 = Math.max(...xs), ty1 = Math.min(...ys), ty2 = Math.max(...ys);
  const rx1 = Math.min(rect[0], rect[2]), rx2 = Math.max(rect[0], rect[2]);
  const ry1 = Math.min(rect[1], rect[3]), ry2 = Math.max(rect[1], rect[3]);
  const sx = tx2 - tx1 > 1e-6 ? (rx2 - rx1) / (tx2 - tx1) : 1;
  const sy = ty2 - ty1 > 1e-6 ? (ry2 - ry1) / (ty2 - ty1) : 1;
  return [sx, 0, 0, sy, rx1 - tx1 * sx, ry1 - ty1 * sy];
}

/** Link/Widget dışındaki açıklamaları sayfaya işler. Döner: { flattened, skipped }. */
function flattenAnnotations(PDFLib, doc) {
  const { PDFName, PDFDict, PDFArray, PDFNumber } = PDFLib;
  const ctx = doc.context;
  let flattened = 0, skipped = 0;
  for (const page of doc.getPages()) {
    const annots = page.node.Annots();
    if (!annots) continue;
    const keep = [];
    for (let i = 0; i < annots.size(); i++) {
      const raw = annots.get(i);
      const annot = ctx.lookupMaybe(raw, PDFDict);
      if (!annot) continue;
      const sub = String(annot.get(PDFName.of('Subtype')) || '');
      if (sub === '/Link' || sub === '/Widget') { keep.push(raw); continue; }
      if (sub === '/Popup') continue; // açılır not kutusu: üst açıklama düzleşince anlamsız kalır
      const flagsNum = annot.lookupMaybe(PDFName.of('F'), PDFNumber);
      const flags = flagsNum ? flagsNum.asNumber() : 0;
      if (flags & 2 || flags & 32) continue; // gizli ya da görüntülenmeyecek açıklama
      const ap = getAppearanceStream(PDFLib, ctx, annot);
      const rectArr = annot.lookupMaybe(PDFName.of('Rect'), PDFArray);
      if (!ap || !rectArr || rectArr.size() < 4) { keep.push(raw); skipped++; continue; }
      const rect = [0, 1, 2, 3].map((k) => rectArr.lookup(k, PDFNumber).asNumber());
      if (!ap.stream.dict.get(PDFName.of('Subtype'))) ap.stream.dict.set(PDFName.of('Subtype'), PDFName.of('Form'));
      const key = page.node.newXObject('BAFlat', ap.ref);
      const [a, b, c, d, e, f] = fitMatrix(PDFLib, ap.stream, rect);
      page.pushOperators(
        PDFLib.pushGraphicsState(),
        PDFLib.concatTransformationMatrix(a, b, c, d, e, f),
        PDFLib.drawObject(key),
        PDFLib.popGraphicsState(),
      );
      flattened++;
    }
    if (keep.length) page.node.set(PDFName.of('Annots'), ctx.obj(keep));
    else page.node.delete(PDFName.of('Annots'));
  }
  return { flattened, skipped };
}

async function flattenForm(PDFLib, doc) {
  const { PDFName, PDFDict } = PDFLib;
  if (!doc.catalog.lookupMaybe(PDFName.of('AcroForm'), PDFDict)) return 0;
  const form = doc.getForm();
  const count = form.getFields().length;
  if (!count) return 0;
  try {
    form.flatten(); // gerekirse eksik alan görünümleri standart fontla üretilir
  } catch (err) {
    // Türkçe karakterli değerler standart fontta çizilemez: DejaVu ile yeniden dene.
    await loadScript(FONTKIT_URL);
    doc.registerFontkit(window.fontkit);
    const font = await doc.embedFont(await (await fetch(FONT_URL)).arrayBuffer(), { subset: true });
    form.updateFieldAppearances(font);
    form.flatten({ updateFieldAppearances: false });
  }
  return count;
}

async function runForm(PDFLib, item) {
  const o = { form: $('opt-form').checked, annots: $('opt-annots').checked };
  const doc = await PDFLib.PDFDocument.load(item.bytes, { ignoreEncryption: false });
  let fields = 0, ann = { flattened: 0, skipped: 0 };
  if (o.form) fields = await flattenForm(PDFLib, doc);
  if (o.annots) ann = flattenAnnotations(PDFLib, doc);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  const out = await doc.save();
  const parts = [`${fields} form alanı`, `${ann.flattened} açıklama düzleştirildi`];
  if (ann.skipped) parts.push(`${ann.skipped} açıklamanın görünümü olmadığı için işlenemedi (olduğu gibi bırakıldı)`);
  return { blob: new Blob([out], { type: 'application/pdf' }), note: parts.join(' · '), suffix: 'duzlestirilmis' };
}

/* ---------- (b) Tam raster düzleştirme ---------- */
async function runRaster(PDFLib, pdfjs, item, onPage) {
  const dpi = Number($('opt-dpi').value);
  const quality = Number($('opt-quality').value);
  const pdf = await pdfjs.getDocument({ data: item.bytes.slice(0) }).promise;
  try {
    const out = await PDFLib.PDFDocument.create();
    out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    out.setCreator('araclar.bilisimajans.com');
    const canvas = document.createElement('canvas');
    for (let n = 1; n <= pdf.numPages; n++) {
      onPage(n, pdf.numPages);
      await tick();
      const page = await pdf.getPage(n);
      const base = page.getViewport({ scale: 1 });
      let scale = dpi / 72;
      if (base.width * scale * base.height * scale > MAX_PIXELS) scale = Math.sqrt(MAX_PIXELS / (base.width * base.height));
      const vp = page.getViewport({ scale });
      canvas.width = Math.max(1, Math.floor(vp.width));
      canvas.height = Math.max(1, Math.floor(vp.height));
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Açıklamalar ve form alanları da tuvale çizilir (AnnotationMode.ENABLE).
      await page.render({ canvasContext: ctx, viewport: vp, annotationMode: pdfjs.AnnotationMode ? pdfjs.AnnotationMode.ENABLE : 1 }).promise;
      const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', quality));
      if (!blob) throw new Error('memory: canvas export failed');
      const jpg = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const p = out.addPage([base.width, base.height]);
      p.drawImage(jpg, { x: 0, y: 0, width: base.width, height: base.height });
      page.cleanup();
    }
    canvas.width = canvas.height = 0;
    const bytes = await out.save({ useObjectStreams: false });
    return { blob: new Blob([bytes], { type: 'application/pdf' }), note: `${pdf.numPages} sayfa ${dpi} dpi görüntüye çevrildi; metin seçilemez`, suffix: 'raster' };
  } finally {
    pdf.destroy();
  }
}

$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  results = [];
  const raster = $('opt-mode').value === 'raster';
  try {
    if (!raster && !$('opt-form').checked && !$('opt-annots').checked) throw new Error('NOTHING');
    const PDFLib = await getPdfLib();
    const pdfjs = raster ? await getPdfJs() : null;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${item.file.name} işleniyor…`);
      await tick();
      const r = raster
        ? await runRaster(PDFLib, pdfjs, item, (n, total) => setProgress($('progress'), ((i + (n - 1) / total) / items.length) * 100, `${item.file.name}: sayfa ${n}/${total}`))
        : await runForm(PDFLib, item);
      results.push({ name: `${baseName(item.file.name)}-${r.suffix}.pdf`, blob: r.blob, before: item.file.size, after: r.blob.size, note: r.note });
    }
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    showError($('error'), m === 'NOTHING'
      ? 'Hiçbir seçenek işaretli değil. "Form alanlarını düzleştir" ya da "Açıklamaları düzleştir" kutusunu işaretleyin veya tam raster modunu seçin.'
      : /memory|allocation|canvas/i.test(m)
        ? 'Sayfa tarayıcı belleği için fazla büyük. Çözünürlüğü 150 dpi\'a düşürün ya da PDF\'i PDF Böl aracıyla parçalayıp tekrar deneyin.'
        : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  const list = $('result-list');
  box.innerHTML = ''; list.innerHTML = '';
  results.forEach((r, i) => {
    const li = document.createElement('li');
    const cmp = r.after <= r.before ? 'daha küçük' : 'daha büyük';
    li.textContent = `${r.name}: ${formatBytes(r.before)} → ${formatBytes(r.after)} (${cmp}) · ${r.note}`;
    list.appendChild(li);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? "Düzleştirilmiş PDF'i indir" : `${r.name} indir`;
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
