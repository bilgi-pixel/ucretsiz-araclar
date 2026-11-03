import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
let file = null;
let pdf = null;
let results = []; // { blob, name }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Lütfen bir PDF dosyası seçin.'); return; }
  file = f;
  try {
    const pdfjs = await getPdfJs();
    pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
  } catch (err) {
    file = null; pdf = null;
    showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message))) ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.' : friendlyError(err));
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
  $('options').hidden = false;
  $('actions').hidden = false;
  await renderThumbs();
}

async function renderThumbs() {
  const grid = $('pages');
  grid.innerHTML = '';
  grid.hidden = $('opt-all').checked;
  const max = Math.min(pdf.numPages, 200);
  for (let i = 1; i <= max; i++) {
    const label = document.createElement('label');
    const canvas = document.createElement('canvas');
    label.appendChild(canvas);
    label.insertAdjacentHTML('beforeend', `<input type="checkbox" value="${i}" checked> Sayfa ${i}`);
    grid.appendChild(label);
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale: 0.25 });
    canvas.width = vp.width; canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    if (i % 5 === 0) await tick();
  }
  if (pdf.numPages > max) grid.insertAdjacentHTML('beforeend', `<p class="hint">İlk ${max} sayfa önizleniyor; "Tüm sayfalar" seçeneği hepsini dönüştürür.</p>`);
}

$('opt-all').addEventListener('change', () => { $('pages').hidden = $('opt-all').checked; });

function reset() {
  file = null; pdf = null; results = [];
  $('files').innerHTML = ''; $('pages').innerHTML = ''; $('pages').hidden = true;
  $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active'); $('downloads').innerHTML = '';
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

$('run').addEventListener('click', async () => {
  if (!pdf) return;
  const btn = $('run');
  btn.disabled = true;
  results = []; $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const format = $('opt-format').value;
  const scale = Number($('opt-scale').value);
  const ext = format === 'png' ? 'png' : 'jpg';
  const base = baseName(file.name);
  let pages;
  if ($('opt-all').checked) pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
  else pages = Array.from($('pages').querySelectorAll('input:checked')).map((c) => Number(c.value));
  if (!pages.length) { showError($('error'), 'En az bir sayfa seçin.'); btn.disabled = false; return; }
  try {
    for (let k = 0; k < pages.length; k++) {
      const n = pages[k];
      setProgress($('progress'), (k / pages.length) * 100, `Sayfa ${n} çiziliyor (${k + 1}/${pages.length})`);
      await tick();
      const page = await pdf.getPage(n);
      const vp = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      const blob = await new Promise((r) => canvas.toBlob(r, format === 'png' ? 'image/png' : 'image/jpeg', 0.9));
      results.push({ blob, name: `${base}-sayfa-${n}.${ext}` });
      canvas.width = canvas.height = 0;
    }
    setProgress($('progress'), null);
    renderDownloads();
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function renderDownloads() {
  const box = $('downloads');
  const total = results.reduce((s, r) => s + r.blob.size, 0);
  $('result-info').textContent = `${results.length} görsel · toplam ${formatBytes(total)}`;
  if (results.length > 1) {
    const all = document.createElement('button');
    all.type = 'button'; all.className = 'ba-btn ba-btn-success ba-btn-lg'; all.textContent = 'Tümünü indir';
    all.addEventListener('click', async () => {
      for (const r of results) { downloadBlob(r.blob, r.name); await new Promise((res) => setTimeout(res, 400)); }
    });
    box.appendChild(all);
  }
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `ba-btn ${results.length === 1 ? 'ba-btn-success ba-btn-lg' : ''}`;
    b.textContent = results.length === 1 ? 'Görseli indir' : r.name;
    b.dataset.download = String(i);
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    box.appendChild(b);
  });
  $('result').classList.add('is-active');
}
