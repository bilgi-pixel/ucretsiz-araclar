// PDF Sayfa Sil — pdf.js ile küçük resimler, pdf-lib ile kalan sayfaları yeni belgeye kopyalama.
// Dosya hiçbir zaman sunucuya gitmez; tüm işlem tarayıcıda yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const grid = $('pages');
const EAGER_THUMBS = 60;      // bu sayıya kadar hemen çizilir, kalanı görünür olunca
const BIG_FILE = 50 * 1024 * 1024;

let file = null;
let srcBytes = null;
let pdfjsDoc = null;
let pages = [];               // { n (1 tabanlı), selected, rendered }
let resultBlob = null;
let resultName = '';
let observer = null;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

/* ---------- Dosya açma ve küçük resimler ---------- */
async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), 'Bu bir PDF dosyası değil. Lütfen .pdf uzantılı bir dosya seçin; Word veya resim dosyasını önce PDF’e çevirebilirsiniz.');
    return;
  }
  file = f;
  if (f.size > BIG_FILE) $('warn-big').hidden = false;
  let count = 0;
  try {
    setProgress($('progress'), 5, 'PDF açılıyor…');
    await tick();
    srcBytes = await f.arrayBuffer();
    const pdfjs = await getPdfJs();
    pdfjsDoc = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    count = pdfjsDoc.numPages;
    if (!count) throw new Error('no pages');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const s = String(err && (err.name + ' ' + err.message));
    showError($('error'), /PasswordException|password|encrypted/i.test(s)
      ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.'
      : /no pages/.test(s) ? 'Bu PDF’te sayfa bulunamadı. Dosyayı açabildiğinizi kontrol edip yeniden seçin.' : friendlyError(err));
    file = null; srcBytes = null; pdfjsDoc = null;
    return;
  }
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${count} sayfa · ${formatBytes(f.size)}`;
  pages = Array.from({ length: count }, (_, i) => ({ n: i + 1, selected: false, rendered: false }));
  $('editor').hidden = false;
  $('actions').hidden = false;
  buildCards();
  updateSummary();
  await renderThumbs();
}

function buildCards() {
  grid.innerHTML = '';
  for (const p of pages) {
    const li = document.createElement('li');
    li.className = 'pg-card';
    li.dataset.n = String(p.n);
    li.innerHTML = `<label>
      <span class="pg-top"><input type="checkbox" aria-label="Sayfa ${p.n} sil"><span class="pg-num">Sayfa ${p.n}</span></span>
      <span class="pg-thumb"><canvas aria-hidden="true"></canvas><span class="pg-mark" hidden>Silinecek</span></span>
    </label>`;
    grid.appendChild(li);
  }
}

function syncCards() {
  for (const li of grid.children) {
    const p = pages[Number(li.dataset.n) - 1];
    li.classList.toggle('is-selected', p.selected);
    li.querySelector('input').checked = p.selected;
    li.querySelector('.pg-mark').hidden = !p.selected;
  }
  updateSummary();
}

async function renderThumbs() {
  const eager = pages.slice(0, EAGER_THUMBS);
  for (let k = 0; k < eager.length; k++) {
    if (!pdfjsDoc) return;
    setProgress($('progress'), ((k + 1) / eager.length) * 100, `Önizleme hazırlanıyor ${k + 1}/${eager.length}`);
    await drawThumb(eager[k]);
    if (k % 4 === 3) await tick();
  }
  setProgress($('progress'), null);
  if (pages.length > EAGER_THUMBS) {
    $('lazy-note').hidden = false;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const p = pages[Number(en.target.dataset.n) - 1];
        if (p && !p.rendered) drawThumb(p);
        observer.unobserve(en.target);
      });
    }, { rootMargin: '300px' });
    pages.slice(EAGER_THUMBS).forEach((p) => observer.observe(grid.children[p.n - 1]));
  }
}

async function drawThumb(p) {
  if (p.rendered || !pdfjsDoc) return;
  p.rendered = true;
  const li = grid.children[p.n - 1];
  if (!li) return;
  const canvas = li.querySelector('canvas');
  try {
    const page = await pdfjsDoc.getPage(p.n);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: 150 / Math.max(base.width, base.height) });
    canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    canvas.dataset.ready = '1';
  } catch (err) {
    console.error(err);
    li.querySelector('.pg-thumb').classList.add('is-failed');
  }
}

/* ---------- Seçim ---------- */
grid.addEventListener('change', (e) => {
  const cb = e.target.closest('input[type="checkbox"]');
  if (!cb) return;
  const p = pages[Number(cb.closest('li').dataset.n) - 1];
  p.selected = cb.checked;
  invalidate();
  syncCards();
});

function applyRange() {
  const expr = $('range-input').value.trim();
  if (!expr) { showError($('error'), 'Silinecek sayfaları yazın; örneğin 2,5-7 (2. sayfa ve 5’ten 7’ye kadar olanlar).'); return; }
  let nums;
  try {
    nums = parsePageRanges(expr, pages.length);
  } catch (err) {
    showError($('error'), `${err.message} Sayfaları virgülle, aralıkları tireyle yazın.`);
    return;
  }
  if (!nums.length) {
    showError($('error'), `Yazdığınız aralıkta bu belgede sayfa yok. Belge ${pages.length} sayfalıktır; 1 ile ${pages.length} arasında bir numara yazın.`);
    return;
  }
  showError($('error'), null);
  nums.forEach((n) => { pages[n - 1].selected = true; });
  invalidate();
  syncCards();
}
$('range-apply').addEventListener('click', applyRange);
$('range-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyRange(); } });

$('sel-all').addEventListener('click', () => {
  const all = pages.every((p) => p.selected);
  pages.forEach((p) => { p.selected = !all; });
  invalidate(); syncCards();
});
$('sel-invert').addEventListener('click', () => { pages.forEach((p) => { p.selected = !p.selected; }); invalidate(); syncCards(); });
$('sel-none').addEventListener('click', () => { pages.forEach((p) => { p.selected = false; }); invalidate(); syncCards(); });

function updateSummary() {
  const del = pages.filter((p) => p.selected).length;
  $('summary').textContent = `${pages.length} sayfa · ${pages.length - del} kalacak · ${del} silinecek`;
}

function invalidate() {
  resultBlob = null;
  $('result').classList.remove('is-active');
}

/* ---------- Sil ve kaydet ---------- */
$('run').addEventListener('click', async () => {
  if (!srcBytes) return;
  const del = pages.filter((p) => p.selected);
  if (!del.length) { showError($('error'), 'Önce silmek istediğiniz sayfaları işaretleyin ya da “2,5-7” gibi bir aralık yazıp “Aralığı seç”e basın.'); return; }
  const keep = pages.filter((p) => !p.selected);
  if (!keep.length) { showError($('error'), 'Tüm sayfaları seçtiniz; PDF’te en az bir sayfa kalmalı. Tutmak istediğiniz sayfaların işaretini kaldırın.'); return; }
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  try {
    const PDFLib = await getPdfLib();
    setProgress($('progress'), 5, 'Kaynak PDF okunuyor…');
    await tick();
    let src;
    try {
      src = await PDFLib.PDFDocument.load(srcBytes, { ignoreEncryption: false });
    } catch (err) {
      if (/encrypted/i.test(String(err))) throw new Error('şifreli');
      throw new Error(`okunamadı: ${err && err.message}`);
    }
    const out = await PDFLib.PDFDocument.create();
    out.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    out.setCreator('araclar.bilisimajans.com');
    // Yalnızca kalan sayfalar kopyalanır; silinenlerin içeriği çıktıda bulunmaz.
    for (let k = 0; k < keep.length; k += 20) {
      const chunk = keep.slice(k, k + 20);
      const copied = await out.copyPages(src, chunk.map((p) => p.n - 1));
      copied.forEach((pg) => out.addPage(pg));
      setProgress($('progress'), 10 + (Math.min(k + 20, keep.length) / keep.length) * 80, `Sayfalar kopyalanıyor ${Math.min(k + 20, keep.length)}/${keep.length}`);
      await tick();
    }
    setProgress($('progress'), 95, 'PDF yazılıyor…');
    await tick();
    const bytes = await out.save();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-sayfa-silindi.pdf`;
    $('result-info').textContent = `${del.length} sayfa silindi · ${keep.length} sayfa kaldı · ${formatBytes(resultBlob.size)} · ${resultName}`;
    $('result').hidden = false;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message);
    showError($('error'), /şifreli/.test(m)
      ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.'
      : /okunamadı/.test(m)
        ? 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin; sorun sürerse önce PDF Küçült aracıyla yeniden paketlemeyi deneyin.'
        : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (resultBlob) downloadBlob(resultBlob, resultName);
});

/* ---------- Temizle ---------- */
function reset() {
  if (observer) { observer.disconnect(); observer = null; }
  if (pdfjsDoc) pdfjsDoc.destroy().catch(() => {});
  file = null; srcBytes = null; pdfjsDoc = null; pages = []; resultBlob = null; resultName = '';
  $('files').innerHTML = ''; grid.innerHTML = '';
  $('editor').hidden = true; $('actions').hidden = true; $('warn-big').hidden = true; $('lazy-note').hidden = true;
  $('range-input').value = '';
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);
