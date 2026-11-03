import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, tick, parsePageRanges } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
let file = null;
let srcDoc = null;
let pageCount = 0;
let results = []; // { blob, name }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Lütfen bir PDF dosyası seçin.'); return; }
  file = f;
  try {
    const PDFLib = await getPdfLib();
    srcDoc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
    pageCount = srcDoc.getPageCount();
  } catch (err) {
    file = null; srcDoc = null;
    showError($('error'), friendlyError(err));
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pageCount} sayfa · ${formatBytes(f.size)}`;
  $('page-count').textContent = String(pageCount);
  $('opt-range').value = pageCount > 1 ? `1-${Math.min(pageCount, 2)}` : '1';
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; srcDoc = null; pageCount = 0; results = [];
  $('files').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  $('downloads').innerHTML = '';
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

$('opt-mode').addEventListener('change', () => {
  const m = $('opt-mode').value;
  $('f-range').hidden = !(m === 'extract' || m === 'delete');
  $('f-every').hidden = m !== 'every';
  $('opt-range').placeholder = m === 'delete' ? 'silinecek sayfalar, örn. 1, 4-5' : 'örn. 1-3, 5, 8-10';
});

async function makePdf(PDFLib, indices) {
  const out = await PDFLib.PDFDocument.create();
  out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  const pages = await out.copyPages(srcDoc, indices);
  pages.forEach((p) => out.addPage(p));
  return new Blob([await out.save()], { type: 'application/pdf' });
}

$('run').addEventListener('click', async () => {
  if (!srcDoc) return;
  const btn = $('run');
  btn.disabled = true;
  results = [];
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const mode = $('opt-mode').value;
  const base = baseName(file.name);
  try {
    const PDFLib = await getPdfLib();
    const all = Array.from({ length: pageCount }, (_, i) => i);
    const groups = []; // [{ indices, name }]
    if (mode === 'extract') {
      // Yazılış sırası korunur (sıralama aracı olarak da kullanılabilsin).
      const nums = parsePageRangesOrdered($('opt-range').value, pageCount);
      if (!nums.length) throw new Error('Geçersiz sayfa ifadesi');
      groups.push({ indices: nums.map((n) => n - 1), name: `${base}-sayfalar.pdf` });
    } else if (mode === 'delete') {
      const del = new Set(parsePageRanges($('opt-range').value, pageCount));
      const keep = all.filter((i) => !del.has(i + 1));
      if (!keep.length) throw new Error('Tüm sayfalar silinemez; en az bir sayfa kalmalı.');
      groups.push({ indices: keep, name: `${base}-duzenlendi.pdf` });
    } else if (mode === 'every') {
      const n = Math.max(1, Number($('opt-every').value) || 1);
      for (let i = 0, k = 1; i < pageCount; i += n, k++) groups.push({ indices: all.slice(i, i + n), name: `${base}-${k}.pdf` });
    } else {
      all.forEach((i) => groups.push({ indices: [i], name: `${base}-${i + 1}.pdf` }));
    }
    for (let g = 0; g < groups.length; g++) {
      setProgress($('progress'), (g / groups.length) * 100, `${g + 1}/${groups.length} hazırlanıyor…`);
      await tick();
      results.push({ blob: await makePdf(PDFLib, groups[g].indices), name: groups[g].name });
    }
    setProgress($('progress'), null);
    renderDownloads();
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /Geçersiz sayfa|silinemez/.test(err.message) ? err.message : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function parsePageRangesOrdered(expr, total) {
  const out = [];
  for (const part of String(expr || '').split(/[,\s;]+/).filter(Boolean)) {
    const nums = parsePageRanges(part, total);
    nums.forEach((n) => { if (!out.includes(n)) out.push(n); });
  }
  return out;
}

function renderDownloads() {
  const box = $('downloads');
  const total = results.reduce((s, r) => s + r.blob.size, 0);
  $('result-info').textContent = results.length === 1 ? `${results[0].name} · ${formatBytes(total)}` : `${results.length} dosya · toplam ${formatBytes(total)}`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `ba-btn ${results.length === 1 ? 'ba-btn-success ba-btn-lg' : ''}`;
    b.textContent = results.length === 1 ? 'PDF\'i indir' : `${i + 1}. parçayı indir`;
    b.dataset.download = String(i);
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    box.appendChild(b);
  });
  if (results.length > 1) {
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'ba-btn ba-btn-success ba-btn-lg';
    all.textContent = 'Tümünü indir';
    all.addEventListener('click', async () => {
      for (const r of results) { downloadBlob(r.blob, r.name); await new Promise((res) => setTimeout(res, 400)); }
    });
    box.prepend(all);
  }
  $('result').classList.add('is-active');
}
