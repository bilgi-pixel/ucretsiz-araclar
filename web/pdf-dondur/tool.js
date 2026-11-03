// PDF Sayfa Döndür — pdf-lib setRotation + pdf.js önizleme.
// Tüm işlem tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;

let items = []; // { id, file, pages, bytes }
let results = []; // { name, blob, pages, rotated }
let previewToken = 0; // eski önizleme çağrılarını iptal etmek için

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });

/** Dosyaları doğrular (şifreli/bozuk), sayfa sayısını okur ve listeye ekler. */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resim döndürmek için Resim Boyutlandır aracını kullanın.`);
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
  return {
    angle: Number($('opt-angle').value),
    mode: $('opt-scope').value, // all | range
    range: $('opt-range').value.trim(),
  };
}

// ---- Önizleme: ilk dosyanın ilk sayfası, seçilen açıyla döndürülmüş ----
async function drawPreview() {
  const token = ++previewToken;
  const first = items[0];
  if (!first) return;
  const o = getOptions();
  let applies = true;
  try {
    applies = o.mode === 'all' || !o.range || parsePageRanges(o.range, first.pages).includes(1);
  } catch { applies = true; }
  try {
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: first.bytes.slice(0) }).promise;
    const page = await pdf.getPage(1);
    const rotation = (page.rotate + (applies ? o.angle : 0)) % 360;
    const base = page.getViewport({ scale: 1, rotation });
    const scale = Math.min(1, 260 / Math.max(base.width, base.height));
    const vp = page.getViewport({ scale, rotation });
    const canvas = $('preview');
    if (token !== previewToken) { pdf.destroy(); return; }
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    page.cleanup(); pdf.destroy();
    canvas.hidden = false;
    $('preview-note').textContent = applies
      ? `Önizleme: ilk sayfa ${o.angle}° saat yönünde döndürülmüş hâliyle.`
      : 'Önizleme: ilk sayfa seçtiğiniz aralığın dışında kaldığı için döndürülmeyecek.';
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    $('preview').hidden = true;
    $('preview-note').textContent = 'Önizleme gösterilemedi; döndürme yine de uygulanabilir.';
  }
}

$('opt-angle').addEventListener('change', drawPreview);
$('opt-range').addEventListener('input', drawPreview);
$('opt-scope').addEventListener('change', () => {
  $('field-range').hidden = $('opt-scope').value !== 'range';
  drawPreview();
});

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
    if (o.mode === 'range' && !o.range) throw new Error('RANGE_EMPTY');
    const PDFLib = await getPdfLib();
    for (let i = 0; i < items.length; i++) {
      const { file, bytes } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} okunuyor…`);
      await tick();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
      const pages = doc.getPages();
      const targets = o.mode === 'all' ? pages.map((_, k) => k + 1) : parsePageRanges(o.range, pages.length);
      if (!targets.length) throw new Error(`NONE:${file.name}`);
      let done = 0;
      for (const n of targets) {
        const page = pages[n - 1];
        const current = page.getRotation().angle;
        page.setRotation(PDFLib.degrees((((current + o.angle) % 360) + 360) % 360));
        done++;
        if (done % 50 === 0) { setProgress($('progress'), ((i + done / targets.length) / items.length) * 100, `${file.name}: ${done}/${targets.length}`); await tick(); }
      }
      doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
      doc.setCreator('araclar.bilisimajans.com');
      const out = await doc.save();
      results.push({ name: `${baseName(file.name)}-dondurulmus.pdf`, blob: new Blob([out], { type: 'application/pdf' }), pages: pages.length, rotated: targets.length });
    }
    setProgress($('progress'), 100, 'Hazır');
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    const msg = m === 'RANGE_EMPTY' ? 'Sayfa aralığı boş. Örnek: 1-3,5 yazın ya da "Tüm sayfalar" seçeneğine dönün.'
      : m.startsWith('NONE:') ? `"${m.slice(5)}" dosyasında seçtiğiniz aralığa düşen sayfa yok. Aralığı dosyanın sayfa sayısına göre düzeltin.`
      : /Geçersiz sayfa ifadesi/.test(m) ? m
      : friendlyError(err);
    showError($('error'), msg);
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  box.innerHTML = '';
  const total = results.reduce((s, r) => s + r.rotated, 0);
  $('result-info').textContent = results.length === 1
    ? `${results[0].pages} sayfadan ${results[0].rotated} tanesi döndürüldü · ${formatBytes(results[0].blob.size)}`
    : `${results.length} dosya · toplam ${total} sayfa döndürüldü`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? "Döndürülmüş PDF'i indir" : `${r.name} indir`;
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
