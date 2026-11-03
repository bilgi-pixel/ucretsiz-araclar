// PDF Bilgi ve Meta Veri Temizleme: pdf-lib ile belge bilgi sözlüğü (Info) alanları gösterilir, düzenlenir ya da silinir;
// isteğe bağlı olarak XMP (/Metadata) akışı da dosyadan çıkarılır. Sayfa içeriği değişmez.
// Tümü tarayıcıda; hiçbir dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;

// Bilgi sözlüğü alanları: anahtar, etiket, tür
const FIELDS = [
  { key: 'Title', label: 'Başlık', kind: 'text', wide: true },
  { key: 'Author', label: 'Yazar', kind: 'text' },
  { key: 'Subject', label: 'Konu', kind: 'text' },
  { key: 'Keywords', label: 'Anahtar kelimeler', kind: 'text', wide: true },
  { key: 'Creator', label: 'Oluşturan (uygulama)', kind: 'text' },
  { key: 'Producer', label: 'Üretici (PDF yazıcısı)', kind: 'text' },
  { key: 'CreationDate', label: 'Oluşturma tarihi', kind: 'date' },
  { key: 'ModDate', label: 'Değişiklik tarihi', kind: 'date' },
];

let items = []; // { id, file, bytes, li }
let results = []; // { name, blob }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

const pad = (n) => String(n).padStart(2, '0');
/** Date → datetime-local değeri (yerel saat, dakika duyarlığı). */
function toLocalInput(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Bilgi sözlüğünü döndürür; yoksa null (okuma sırasında oluşturmaz). */
function readInfoDict(PDFLib, doc) {
  const { PDFDict } = PDFLib;
  try {
    const ref = doc.context.trailerInfo.Info;
    const d = ref ? doc.context.lookup(ref) : null;
    return d instanceof PDFDict ? d : null;
  } catch { return null; }
}

/** Alanın ham metin değerini okur (UTF-16 / PDFDocEncoding çözülür). */
function readField(PDFLib, doc, key) {
  const info = readInfoDict(PDFLib, doc);
  if (!info) return '';
  const v = info.lookup(PDFLib.PDFName.of(key));
  if (!v || typeof v.decodeText !== 'function') return '';
  try { return v.decodeText(); } catch { return ''; }
}

function readDate(PDFLib, doc, key) {
  const info = readInfoDict(PDFLib, doc);
  if (!info) return null;
  const v = info.lookup(PDFLib.PDFName.of(key));
  if (!v) return null;
  try {
    const d = typeof v.decodeDate === 'function' ? v.decodeDate() : null;
    return d && !Number.isNaN(d.getTime()) ? d : null;
  } catch { return null; }
}

function xmpRef(PDFLib, doc) {
  const v = doc.catalog.get(PDFLib.PDFName.of('Metadata'));
  return v || null;
}

/** Dosyaları doğrular (şifreli/bozuk), alanlarını okur ve kart olarak listeler. */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resimlerin bilgisini silmek için Resim Dönüştür ile yeniden kaydedebilirsiniz.`);
      continue;
    }
    let bytes, doc;
    try {
      bytes = await file.arrayBuffer();
      doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
      if (!doc.getPageCount()) throw new Error('no pages');
    } catch (err) {
      showError($('error'), /encrypted/i.test(String(err && err.message || err))
        ? `"${file.name}" şifreli görünüyor. Dosya şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırın, sonra tekrar deneyin.`
        : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı başka bir programda açabildiğinizi kontrol edip yeniden seçin.`);
      continue;
    }
    if (file.size >= BIG_FILE) {
      $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
      $('warning').classList.add('is-active');
    }
    const id = `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const li = buildCard(PDFLib, doc, file, id);
    items.push({ id, file, bytes, li });
    $('files').appendChild(li);
  }
  refresh();
}

function buildCard(PDFLib, doc, file, id) {
  const li = document.createElement('li');
  li.className = 'mt-card';
  li.dataset.id = id;
  const size = doc.getPageCount() ? doc.getPage(0).getSize() : { width: 0, height: 0 };
  const mm = (pt) => Math.round((pt * 25.4) / 72);
  const head = document.createElement('div');
  head.className = 'mt-head';
  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = file.name;
  const meta = document.createElement('span');
  meta.className = 'meta';
  meta.textContent = `${doc.getPageCount()} sayfa · ${formatBytes(file.size)} · ilk sayfa ${mm(size.width)}×${mm(size.height)} mm`;
  const rm = document.createElement('button');
  rm.type = 'button';
  rm.className = 'ba-icon-btn';
  rm.dataset.act = 'remove';
  rm.setAttribute('aria-label', `${file.name} dosyasını kaldır`);
  rm.textContent = '✕';
  head.append(name, meta, rm);

  const body = document.createElement('div');
  body.className = 'mt-body';
  for (const f of FIELDS) {
    const wrap = document.createElement('div');
    wrap.className = 'ba-field' + (f.wide ? ' wide' : '');
    const label = document.createElement('label');
    label.htmlFor = `${id}-${f.key}`;
    label.textContent = f.label;
    const input = document.createElement('input');
    input.id = `${id}-${f.key}`;
    input.dataset.field = f.key;
    input.autocomplete = 'off';
    let initial = '';
    if (f.kind === 'date') {
      input.type = 'datetime-local';
      const d = readDate(PDFLib, doc, f.key);
      initial = d ? toLocalInput(d) : '';
    } else {
      input.type = 'text';
      initial = readField(PDFLib, doc, f.key);
    }
    input.value = initial;
    input.dataset.initial = initial;
    wrap.append(label, input);
    body.appendChild(wrap);
  }
  const xmp = xmpRef(PDFLib, doc);
  const note = document.createElement('p');
  note.className = 'mt-xmp wide';
  note.dataset.xmp = xmp ? '1' : '0';
  note.innerHTML = xmp
    ? 'XMP üst veri akışı: <b>var</b> (düzenleme geçmişi ve ek bilgiler taşıyabilir).'
    : 'XMP üst veri akışı: <b>yok</b>.';
  body.appendChild(note);
  li.append(head, body);
  return li;
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
  $('hint-clear').hidden = !has;
  if (!has) { $('warning').classList.remove('is-active'); $('result').classList.remove('is-active'); }
}

$('clear-all').addEventListener('click', () => {
  for (const inp of $('files').querySelectorAll('input[data-field]')) inp.value = '';
  $('opt-xmp').checked = true;
});

$('reset').addEventListener('click', () => {
  items = []; results = [];
  $('files').innerHTML = '';
  $('opt-title').value = '';
  setProgress($('progress'), null);
  showError($('error'), null);
  refresh();
});

/** Tüm PDF nesneleri içinde /Metadata anahtarlarını ve XMP akışlarını siler. */
function stripXmp(PDFLib, doc) {
  const { PDFName, PDFDict, PDFStream } = PDFLib;
  const META = PDFName.of('Metadata');
  const dead = [];
  for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
    const dict = obj instanceof PDFStream ? obj.dict : (obj instanceof PDFDict ? obj : null);
    if (!dict) continue;
    if (dict.get(PDFName.of('Type')) === META) { dead.push(ref); continue; }
    if (dict.has(META)) dict.delete(META);
  }
  if (doc.catalog.has(META)) doc.catalog.delete(META);
  for (const ref of dead) doc.context.delete(ref);
}

/** Karttaki alan değerlerini belgeye uygular. */
function applyFields(PDFLib, doc, li, forcedTitle) {
  const { PDFName, PDFHexString, PDFString } = PDFLib;
  let info = readInfoDict(PDFLib, doc);
  for (const f of FIELDS) {
    const input = li.querySelector(`input[data-field="${f.key}"]`);
    let value = input.value.trim();
    if (f.key === 'Title' && forcedTitle) value = forcedTitle;
    const changed = value !== (input.dataset.initial || '');
    if (!changed) continue;
    const key = PDFName.of(f.key);
    if (!value) {
      if (info) info.delete(key);
      continue;
    }
    if (!info) info = doc.getInfoDict();
    if (f.kind === 'date') {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) continue;
      info.set(key, PDFString.fromDate(d));
    } else {
      info.set(key, PDFHexString.fromText(value));
    }
  }
}

$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  results = [];
  const forcedTitle = $('opt-title').value.trim();
  const removeXmp = $('opt-xmp').checked;
  try {
    const PDFLib = await getPdfLib();
    for (let i = 0; i < items.length; i++) {
      const { file, bytes, li } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} işleniyor…`);
      await tick();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
      applyFields(PDFLib, doc, li, forcedTitle);
      if (removeXmp) stripXmp(PDFLib, doc);
      const out = await doc.save();
      results.push({ name: `${baseName(file.name)}-temiz.pdf`, blob: new Blob([out], { type: 'application/pdf' }) });
    }
    setProgress($('progress'), 100, 'Hazır');
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /encrypted/i.test(String(err && err.message || err))
      ? 'Dosya şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırın.'
      : 'İşlem sırasında beklenmeyen bir hata oluştu. Sayfayı yenileyip dosyayı yeniden seçin; sorun sürerse dosyayı başka bir programda "PDF olarak kaydet" ile yenileyin.');
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  box.innerHTML = '';
  $('result-info').textContent = results.length === 1
    ? `Üst veri temizlendi · ${formatBytes(results[0].blob.size)}. Belge içeriği değişmedi.`
    : `${results.length} dosya hazır. Belge içerikleri değişmedi.`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? "Temiz PDF'i indir" : `${r.name} indir`;
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
