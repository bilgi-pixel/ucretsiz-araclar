// PDF Form Doldurma — pdf-lib form API + pdf.js önizleme.
// Tüm işlem tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
// Türkçe karakter için DejaVu Sans gömülür (standart PDF fontları ç, ğ, ı, ş basamaz).
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, getPdfJs, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const FONT_URL = new URL('../vendor/fonts/dejavu-sans@2.37/DejaVuSans.ttf', import.meta.url).href;
const FONTKIT_URL = new URL('../vendor/pdf-lib-fontkit@1.1.1/fontkit.umd.min.js', import.meta.url).href;

let current = null; // { file, bytes, fields: [...], pdfjsDoc }
const pageCache = new Map(); // sayfa no -> { canvas, viewport }
let previewToken = 0;
let fontBytes = null;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([file]) => openFile(file) });

/** Alan türünü pdf-lib sınıfından çıkarır. */
function kindOf(PDFLib, f) {
  if (f instanceof PDFLib.PDFTextField) return f.isMultiline() ? 'multiline' : 'text';
  if (f instanceof PDFLib.PDFCheckBox) return 'checkbox';
  if (f instanceof PDFLib.PDFRadioGroup) return 'radio';
  if (f instanceof PDFLib.PDFDropdown) return 'dropdown';
  if (f instanceof PDFLib.PDFOptionList) return 'list';
  if (f instanceof PDFLib.PDFSignature) return 'signature';
  return 'other'; // düğmeler vb.
}

/** Widget'ın hangi sayfada olduğunu bulur (P girdisi yoksa Annots taranır). */
function pageIndexOf(doc, widget) {
  const pages = doc.getPages();
  const p = widget.P();
  if (p) {
    const i = pages.findIndex((pg) => pg.ref === p);
    if (i >= 0) return i;
  }
  const wref = doc.context.getObjectRef(widget.dict);
  for (let i = 0; i < pages.length; i++) {
    const annots = pages[i].node.Annots();
    if (annots && annots.asArray().some((a) => a === wref)) return i;
  }
  return 0;
}

async function openFile(file) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active');
  if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
    showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; Word belgesi için önce Word'den PDF'e aracını kullanın.`);
    return;
  }
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
    $('warning').classList.add('is-active');
  }
  try {
    const PDFLib = await getPdfLib();
    const bytes = await file.arrayBuffer();
    const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
    const form = doc.getForm();
    const raw = form.getFields();
    const fields = [];
    raw.forEach((f) => {
      const kind = kindOf(PDFLib, f);
      const widgets = f.acroField.getWidgets();
      const places = widgets.map((w) => ({ page: pageIndexOf(doc, w), rect: w.getRectangle() }));
      const info = { name: f.getName(), kind, places, readOnly: false };
      try { info.readOnly = f.isReadOnly(); } catch { /* yoksay */ }
      if (kind === 'text' || kind === 'multiline') { info.value = f.getText() || ''; info.max = f.getMaxLength(); }
      if (kind === 'checkbox') info.value = f.isChecked();
      if (kind === 'radio') { info.options = f.getOptions(); info.value = f.getSelected() || ''; }
      if (kind === 'dropdown') { info.options = f.getOptions(); info.value = (f.getSelected()[0]) || ''; info.editable = f.isEditable(); }
      if (kind === 'list') { info.options = f.getOptions(); info.value = f.getSelected(); info.multi = f.isMultiselect(); }
      fields.push(info);
    });
    const usable = fields.filter((f) => f.kind !== 'other' && f.kind !== 'signature');
    current = { file, bytes, fields, usable, pageCount: doc.getPageCount(), pdfjsDoc: null };
    pageCache.clear();
    $('file-name').textContent = file.name;
    $('file-meta').textContent = `${doc.getPageCount()} sayfa · ${formatBytes(file.size)} · ${usable.length} doldurulabilir alan`;
    $('file-info').hidden = false;
    if (!usable.length) {
      $('editor').hidden = true;
      $('actions').hidden = true;
      showError($('error'), 'Bu PDF\'de doldurulabilir form alanı yok. Boş çizgilerin üstüne yazmak için PDF İmzala ya da Resme Yazı Ekle araçlarını kullanın; metni sayfanın istediğiniz yerine yerleştirebilirsiniz.');
      $('no-fields').hidden = false;
      return;
    }
    $('no-fields').hidden = true;
    renderFields();
    $('editor').hidden = false;
    $('actions').hidden = false;
    highlight(usable[0], 0);
  } catch (err) {
    console.error(err);
    current = null;
    $('editor').hidden = true;
    $('actions').hidden = true;
    $('file-info').hidden = true;
    $('no-fields').hidden = true;
    showError($('error'), /encrypted/i.test(String(err))
      ? `"${file.name}" şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırın, sonra tekrar deneyin.`
      : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı başka bir programla açabildiğinizi kontrol edip yeniden seçin.`);
  }
}

/* ---------- Alan listesi ---------- */
function renderFields() {
  const box = $('fields');
  box.innerHTML = '';
  current.fields.forEach((f, idx) => {
    if (f.kind === 'other') return;
    const wrap = document.createElement('div');
    wrap.className = 'ba-field pf-field';
    wrap.dataset.idx = String(idx);
    const id = `pf-${idx}`;
    const page = f.places[0] ? f.places[0].page + 1 : 1;
    const label = document.createElement('label');
    label.textContent = f.name;
    if (f.kind !== 'radio' && f.kind !== 'checkbox') label.htmlFor = id;
    let ctrl;
    if (f.kind === 'text') {
      ctrl = document.createElement('input'); ctrl.type = 'text'; ctrl.value = f.value; if (f.max) ctrl.maxLength = f.max;
    } else if (f.kind === 'multiline') {
      ctrl = document.createElement('textarea'); ctrl.rows = 3; ctrl.value = f.value; if (f.max) ctrl.maxLength = f.max;
    } else if (f.kind === 'checkbox') {
      ctrl = document.createElement('input'); ctrl.type = 'checkbox'; ctrl.checked = f.value;
      label.textContent = '';
      label.append(ctrl, document.createTextNode(` ${f.name}`));
    } else if (f.kind === 'dropdown' || f.kind === 'list') {
      ctrl = document.createElement('select');
      if (f.kind === 'dropdown') { const o = document.createElement('option'); o.value = ''; o.textContent = '— seçiniz —'; ctrl.appendChild(o); }
      if (f.kind === 'list') { ctrl.multiple = !!f.multi; ctrl.size = Math.min(5, f.options.length || 1); }
      f.options.forEach((opt) => {
        const o = document.createElement('option'); o.value = opt; o.textContent = opt;
        o.selected = f.kind === 'dropdown' ? opt === f.value : f.value.includes(opt);
        ctrl.appendChild(o);
      });
    } else if (f.kind === 'radio') {
      ctrl = document.createElement('div'); ctrl.setAttribute('role', 'radiogroup'); ctrl.setAttribute('aria-label', f.name);
      f.options.forEach((opt, k) => {
        const l = document.createElement('label'); l.className = 'pf-radio';
        const r = document.createElement('input'); r.type = 'radio'; r.name = id; r.value = opt; r.checked = opt === f.value; r.id = `${id}-${k}`;
        l.append(r, document.createTextNode(` ${opt}`));
        ctrl.appendChild(l);
      });
    }
    if (f.kind === 'signature') {
      const p = document.createElement('p'); p.className = 'hint'; p.textContent = 'İmza alanı — bu araçla doldurulamaz. İmza eklemek için PDF İmzala aracını kullanın.';
      wrap.append(label, p);
      box.appendChild(wrap);
      return;
    }
    if (f.kind !== 'radio' && f.kind !== 'checkbox') ctrl.id = id;
    if (f.readOnly) ctrl.disabled = true;
    if (f.kind === 'radio') ctrl.querySelectorAll('input').forEach((i) => { i.disabled = f.readOnly; });
    ctrl.dataset.ctrl = String(idx);
    if (f.kind !== 'checkbox') wrap.append(label);
    else wrap.append(label);
    if (f.kind !== 'checkbox') wrap.append(ctrl);
    const meta = document.createElement('div');
    meta.className = 'hint';
    meta.append(document.createTextNode(`Sayfa ${page}${f.readOnly ? ' · salt okunur' : ''} `));
    const show = document.createElement('button');
    show.type = 'button'; show.className = 'pf-show'; show.textContent = 'Yerini göster';
    show.addEventListener('click', () => highlight(f, 0));
    meta.append(show);
    wrap.append(meta);
    wrap.addEventListener('focusin', () => highlight(f, 0));
    box.appendChild(wrap);
  });
}

/** Girdi denetimlerinden güncel değeri okur. */
function readValue(idx) {
  const f = current.fields[idx];
  const wrap = $('fields').querySelector(`[data-idx="${idx}"]`);
  if (!wrap) return undefined;
  if (f.kind === 'text' || f.kind === 'multiline') return wrap.querySelector('input,textarea').value;
  if (f.kind === 'checkbox') return wrap.querySelector('input').checked;
  if (f.kind === 'radio') { const r = wrap.querySelector('input:checked'); return r ? r.value : ''; }
  if (f.kind === 'dropdown') return wrap.querySelector('select').value;
  if (f.kind === 'list') return [...wrap.querySelectorAll('option:checked')].map((o) => o.value);
  return undefined;
}

/* ---------- Önizleme ve vurgulama ---------- */
async function getPageCanvas(pageNo) {
  if (pageCache.has(pageNo)) return pageCache.get(pageNo);
  const pdfjs = await getPdfJs();
  if (!current.pdfjsDoc) current.pdfjsDoc = await pdfjs.getDocument({ data: current.bytes.slice(0) }).promise;
  const page = await current.pdfjsDoc.getPage(pageNo + 1);
  const base = page.getViewport({ scale: 1 });
  const scale = Math.min(1.5, 460 / base.width);
  const vp = page.getViewport({ scale });
  const cv = document.createElement('canvas');
  cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const entry = { canvas: cv, viewport: vp };
  pageCache.set(pageNo, entry);
  return entry;
}

async function highlight(field, placeIdx) {
  const token = ++previewToken;
  const place = field.places[placeIdx];
  const target = $('preview');
  if (!place) return;
  try {
    const { canvas, viewport } = await getPageCanvas(place.page);
    if (token !== previewToken) return;
    target.width = canvas.width; target.height = canvas.height;
    const ctx = target.getContext('2d');
    ctx.drawImage(canvas, 0, 0);
    const r = place.rect;
    const [x1, y1, x2, y2] = viewport.convertToViewportRectangle([r.x, r.y, r.x + r.width, r.y + r.height]);
    const x = Math.min(x1, x2), y = Math.min(y1, y2), w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
    ctx.fillStyle = 'rgba(255, 196, 0, .35)';
    ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
    ctx.strokeStyle = '#b3123a'; ctx.lineWidth = 2.5;
    ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
    target.hidden = false;
    $('preview-note').textContent = `Sayfa ${place.page + 1} · "${field.name}" alanı vurgulandı.`;
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    target.hidden = true;
    $('preview-note').textContent = 'Önizleme gösterilemedi; alanları yine de doldurabilirsiniz.';
  }
}

/* ---------- Doldur ve indir ---------- */
async function getFontBytes() {
  if (fontBytes) return fontBytes;
  const r = await fetch(FONT_URL);
  if (!r.ok) throw new Error('FONT');
  fontBytes = await r.arrayBuffer();
  return fontBytes;
}

$('run').addEventListener('click', async () => {
  if (!current) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const flatten = $('opt-flatten').checked;
  try {
    setProgress($('progress'), 10, 'Form okunuyor…');
    await tick();
    const PDFLib = await getPdfLib();
    await loadScript(FONTKIT_URL);
    const doc = await PDFLib.PDFDocument.load(current.bytes, { ignoreEncryption: false });
    doc.registerFontkit(window.fontkit);
    const form = doc.getForm();
    setProgress($('progress'), 30, 'Türkçe yazı tipi hazırlanıyor…');
    await tick();
    // Düzenlenebilir çıktıda tam font, kilitlenen (flatten) çıktıda yalnızca kullanılan harfler gömülür.
    const font = await doc.embedFont(await getFontBytes(), { subset: flatten });
    setProgress($('progress'), 50, 'Alanlar dolduruluyor…');
    await tick();
    let filled = 0;
    current.fields.forEach((info, idx) => {
      if (info.readOnly || info.kind === 'other' || info.kind === 'signature') return;
      const val = readValue(idx);
      if (val === undefined) return;
      const f = form.getField(info.name);
      if (info.kind === 'text' || info.kind === 'multiline') { if (val || info.value) { f.setText(val || undefined); filled += val ? 1 : 0; } }
      else if (info.kind === 'checkbox') { if (val) f.check(); else f.uncheck(); filled += val ? 1 : 0; }
      else if (info.kind === 'radio') { if (val) { f.select(val); filled++; } }
      else if (info.kind === 'dropdown') { if (val) { f.select(val); filled++; } else f.clear(); }
      else if (info.kind === 'list') { if (val.length) { f.select(val); filled++; } else f.clear(); }
    });
    setProgress($('progress'), 70, 'Alan görünümleri oluşturuluyor…');
    await tick();
    form.updateFieldAppearances(font);
    if (flatten) form.flatten({ updateFieldAppearances: false });
    doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    doc.setCreator('araclar.bilisimajans.com');
    setProgress($('progress'), 90, 'PDF kaydediliyor…');
    await tick();
    const out = await doc.save();
    const blob = new Blob([out], { type: 'application/pdf' });
    const name = `${baseName(current.file.name)}-doldurulmus.pdf`;
    $('result-info').textContent = `${filled} alan dolduruldu · ${flatten ? 'alanlar kilitlendi (düzleştirildi)' : 'alanlar düzenlenebilir bırakıldı'} · ${formatBytes(blob.size)}`;
    const box = $('downloads');
    box.innerHTML = '';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ba-btn ba-btn-success ba-btn-lg'; b.id = 'download'; b.textContent = 'Doldurulmuş PDF\'i indir';
    b.addEventListener('click', () => downloadBlob(blob, name));
    box.appendChild(b);
    setProgress($('progress'), 100, 'Hazır');
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    showError($('error'), /FONT/.test(m)
      ? 'Türkçe yazı tipi yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : /maximum|max length|too long/i.test(m)
        ? 'Bir alandaki metin, alanın izin verdiği uzunluktan fazla. Metni kısaltıp tekrar deneyin.'
        : /encrypted/i.test(m)
          ? 'Dosya şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırın.'
          : 'Form doldurulamadı. Dosya alanlarıyla ilgili beklenmedik bir sorun olabilir; alanları kontrol edin ya da PDF\'i başka bir programdan yeniden kaydedip deneyin.');
  } finally {
    btn.disabled = false;
  }
});

$('clear').addEventListener('click', () => {
  current = null; pageCache.clear();
  $('fields').innerHTML = '';
  $('editor').hidden = true; $('actions').hidden = true; $('file-info').hidden = true; $('no-fields').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active');
  showError($('error'), null);
});
