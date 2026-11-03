import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const grid = $('pages');
const EAGER_THUMBS = 60;      // bu sayıya kadar hemen çizilir, kalanı görünür olunca (tembel)
const BIG_FILE = 50 * 1024 * 1024;

let file = null;
let srcBytes = null;          // ArrayBuffer (pdf-lib için saklanır)
let pdfjsDoc = null;
let srcPageCount = 0;
let pages = [];               // { id, srcIndex|null, rotation, deleted, selected, rendered }
let seq = 0;
let resultBlob = null;
let resultName = '';
let observer = null;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

/* ---------- Dosya açma ve küçük resimler ---------- */

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Lütfen bir PDF dosyası seçin.'); return; }
  file = f;
  if (f.size > BIG_FILE) $('warn-big').hidden = false;
  try {
    setProgress($('progress'), 5, 'PDF açılıyor…');
    await tick();
    srcBytes = await f.arrayBuffer();
    const pdfjs = await getPdfJs();
    // pdf.js'e kopya veriyoruz; orijinal ArrayBuffer worker'a aktarılmasın diye.
    pdfjsDoc = await pdfjs.getDocument({ data: srcBytes.slice(0) }).promise;
    srcPageCount = pdfjsDoc.numPages;
    if (!srcPageCount) throw new Error('no pages');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const s = String(err && (err.name + ' ' + err.message));
    showError($('error'), /PasswordException|password|encrypted/i.test(s)
      ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.'
      : /no pages/.test(s) ? 'Bu PDF\'te sayfa bulunamadı. Dosyayı açabildiğinizi kontrol edip yeniden seçin.' : friendlyError(err));
    file = null; srcBytes = null; pdfjsDoc = null;
    return;
  }
  $('files').innerHTML = `<li><span class="name"></span><span class="meta"></span></li>`;
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${srcPageCount} sayfa · ${formatBytes(f.size)}`;
  pages = Array.from({ length: srcPageCount }, (_, i) => ({ id: String(++seq), srcIndex: i, rotation: 0, deleted: false, selected: false, rendered: false }));
  $('editor').hidden = false;
  $('actions').hidden = false;
  renderCards();
  await renderThumbs();
}

/** Tüm kartları (yeniden) oluşturur; thumbnail canvas'ları korunur. */
function renderCards() {
  const old = new Map(Array.from(grid.children).map((li) => [li.dataset.id, li]));
  grid.innerHTML = '';
  pages.forEach((p, i) => {
    let li = old.get(p.id);
    if (!li) li = buildCard(p);
    updateCard(li, p, i);
    grid.appendChild(li);
  });
  updateSummary();
}

function buildCard(p) {
  const li = document.createElement('li');
  li.className = 'pg-card';
  li.dataset.id = p.id;
  li.innerHTML = `
    <div class="pg-top">
      <label class="pg-check"><input type="checkbox" data-act="select"><span class="visually-hidden">Seç</span></label>
      <span class="pg-num"></span>
      <span class="ba-handle" title="Sürükleyerek taşı" aria-hidden="true">⠿</span>
    </div>
    <div class="pg-thumb"><canvas aria-hidden="true"></canvas><span class="pg-blank" hidden>Boş sayfa</span><span class="pg-deleted" hidden>Silindi</span></div>
    <div class="pg-tools">
      <button class="ba-icon-btn" type="button" data-act="rotl" title="Sola döndür">⟲<span class="visually-hidden">Sola döndür</span></button>
      <button class="ba-icon-btn" type="button" data-act="rotr" title="Sağa döndür">⟳<span class="visually-hidden">Sağa döndür</span></button>
      <button class="ba-icon-btn" type="button" data-act="up" title="Öne taşı">←<span class="visually-hidden">Öne taşı</span></button>
      <button class="ba-icon-btn" type="button" data-act="down" title="Sona doğru taşı">→<span class="visually-hidden">Sona doğru taşı</span></button>
      <button class="ba-icon-btn pg-del" type="button" data-act="del" title="Sil">✕<span class="visually-hidden">Sil</span></button>
    </div>`;
  return li;
}

function updateCard(li, p, i) {
  li.classList.toggle('is-deleted', p.deleted);
  li.classList.toggle('is-selected', p.selected);
  li.classList.toggle('is-blank', p.srcIndex === null);
  li.setAttribute('aria-label', `Sayfa ${i + 1}${p.srcIndex === null ? ' (boş)' : ''}${p.deleted ? ', silindi' : ''}${p.rotation ? `, ${p.rotation}° döndürüldü` : ''}`);
  li.querySelector('.pg-num').textContent = p.srcIndex === null ? `${i + 1} · boş` : `${i + 1}${p.srcIndex + 1 !== i + 1 ? ` (eski ${p.srcIndex + 1})` : ''}`;
  li.querySelector('input[data-act="select"]').checked = p.selected;
  li.querySelector('input[data-act="select"]').setAttribute('aria-label', `Sayfa ${i + 1} seç`);
  li.querySelector('.pg-thumb').style.setProperty('--rot', `${p.rotation}deg`);
  li.querySelector('.pg-thumb').dataset.rotation = String(p.rotation);
  li.querySelector('.pg-blank').hidden = p.srcIndex !== null;
  li.querySelector('.pg-deleted').hidden = !p.deleted;
  const del = li.querySelector('[data-act="del"]');
  del.firstChild.textContent = p.deleted ? '↶' : '✕';
  del.title = p.deleted ? 'Geri al' : 'Sil';
  del.querySelector('span').textContent = p.deleted ? 'Geri al' : 'Sil';
  li.querySelector('[data-act="up"]').disabled = i === 0;
  li.querySelector('[data-act="down"]').disabled = i === pages.length - 1;
}

/** İlk EAGER_THUMBS sayfa ilerleme çubuğuyla, kalanı görünür olunca çizilir. */
async function renderThumbs() {
  const eager = pages.slice(0, EAGER_THUMBS);
  for (let k = 0; k < eager.length; k++) {
    if (!pdfjsDoc) return; // bu arada temizlendi
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
        const p = pages.find((x) => x.id === en.target.dataset.id);
        if (p && !p.rendered) drawThumb(p);
        observer.unobserve(en.target);
      });
    }, { rootMargin: '300px' });
    pages.slice(EAGER_THUMBS).forEach((p) => observer.observe(grid.querySelector(`[data-id="${p.id}"]`)));
  }
}

async function drawThumb(p) {
  if (p.rendered || p.srcIndex === null || !pdfjsDoc) return;
  p.rendered = true;
  const li = grid.querySelector(`[data-id="${p.id}"]`);
  if (!li) return;
  const canvas = li.querySelector('canvas');
  try {
    const page = await pdfjsDoc.getPage(p.srcIndex + 1);
    const base = page.getViewport({ scale: 1 });
    const scale = 160 / Math.max(base.width, base.height);
    const vp = page.getViewport({ scale });
    canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    canvas.dataset.ready = '1';
  } catch (err) {
    console.error(err);
    li.querySelector('.pg-thumb').classList.add('is-failed');
  }
}

/* ---------- Kart üzerindeki işlemler ---------- */

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  const idx = pages.findIndex((p) => p.id === li.dataset.id);
  if (idx < 0) return;
  const p = pages[idx];
  switch (btn.dataset.act) {
    case 'rotl': p.rotation = (p.rotation + 270) % 360; break;
    case 'rotr': p.rotation = (p.rotation + 90) % 360; break;
    case 'del': p.deleted = !p.deleted; break;
    case 'up': if (idx > 0) { pages.splice(idx, 1); pages.splice(idx - 1, 0, p); } break;
    case 'down': if (idx < pages.length - 1) { pages.splice(idx, 1); pages.splice(idx + 1, 0, p); } break;
  }
  invalidate();
  renderCards();
  // Klavye odağı aynı sayfanın aynı düğmesinde kalsın.
  grid.querySelector(`[data-id="${p.id}"] [data-act="${btn.dataset.act}"]`)?.focus();
});

grid.addEventListener('change', (e) => {
  const cb = e.target.closest('input[data-act="select"]');
  if (!cb) return;
  const p = pages.find((x) => x.id === cb.closest('li').dataset.id);
  if (p) { p.selected = cb.checked; cb.closest('li').classList.toggle('is-selected', p.selected); updateSummary(); }
});

/* Sürükle-bırak: ba.js makeSortable dikey liste için yazılmış (yalnızca Y ekseni);
   ızgara düzeninde yanlış konuma bıraktığı için burada DOM sırasına göre karar veren sürüm kullanılıyor. */
(function makeGridSortable() {
  let dragging = null;
  grid.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('.ba-handle');
    if (!handle) return;
    dragging = handle.closest('li');
    dragging.classList.add('is-dragging');
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  grid.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('.pg-card');
    if (!over || over === dragging || over.parentElement !== grid) return;
    const kids = Array.from(grid.children);
    const after = kids.indexOf(over) > kids.indexOf(dragging);
    grid.insertBefore(dragging, after ? over.nextSibling : over);
  });
  const end = () => {
    if (!dragging) return;
    dragging.classList.remove('is-dragging');
    dragging = null;
    const order = Array.from(grid.children).map((li) => li.dataset.id);
    pages = order.map((id) => pages.find((p) => p.id === id)).filter(Boolean);
    invalidate();
    renderCards();
  };
  grid.addEventListener('pointerup', end);
  grid.addEventListener('pointercancel', end);
})();

/* ---------- Toplu işlemler ---------- */

const selected = () => pages.filter((p) => p.selected);

$('bulk-select-all').addEventListener('click', () => {
  const all = pages.every((p) => p.selected);
  pages.forEach((p) => { p.selected = !all; });
  renderCards();
});
$('bulk-rotate').addEventListener('click', () => {
  const target = selected().length ? selected() : pages;
  target.forEach((p) => { p.rotation = (p.rotation + 90) % 360; });
  invalidate(); renderCards();
});
$('bulk-delete').addEventListener('click', () => {
  const sel = selected();
  if (!sel.length) { showError($('error'), 'Önce silmek istediğiniz sayfaların kutucuğunu işaretleyin.'); return; }
  showError($('error'), null);
  sel.forEach((p) => { p.deleted = true; p.selected = false; });
  invalidate(); renderCards();
});
$('bulk-reverse').addEventListener('click', () => { pages.reverse(); invalidate(); renderCards(); });
$('bulk-blank').addEventListener('click', () => {
  // Seçili sayfa varsa sonuncusunun ardına, yoksa en sona boş sayfa ekler.
  const sel = selected();
  const at = sel.length ? pages.indexOf(sel[sel.length - 1]) + 1 : pages.length;
  pages.splice(at, 0, { id: String(++seq), srcIndex: null, rotation: 0, deleted: false, selected: false, rendered: true });
  invalidate(); renderCards();
  grid.children[at]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});
$('bulk-extract').addEventListener('click', async () => {
  const sel = selected().filter((p) => !p.deleted);
  if (!sel.length) { showError($('error'), 'Önce yeni PDF\'e alınacak sayfaların kutucuğunu işaretleyin.'); return; }
  await build(sel, `${baseName(file.name)}-secilen.pdf`, `${sel.length} sayfa seçilenlerden`);
});

function updateSummary() {
  const live = pages.filter((p) => !p.deleted).length;
  const sel = selected().length;
  $('summary').textContent = `${pages.length} sayfa · ${live} kalacak · ${pages.length - live} silinecek${sel ? ` · ${sel} seçili` : ''}`;
  $('run').disabled = live === 0;
}

function invalidate() {
  resultBlob = null;
  $('result').classList.remove('is-active');
}

/* ---------- Çıktı ---------- */

$('run').addEventListener('click', async () => {
  const live = pages.filter((p) => !p.deleted);
  if (!live.length) { showError($('error'), 'Tüm sayfalar silinmiş; en az bir sayfa kalmalı.'); return; }
  await build(live, `${baseName(file.name)}-duzenlenmis.pdf`, `${live.length} sayfa`);
});

async function build(list, name, info) {
  if (!srcBytes) return;
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
    const srcPages = src.getPages();
    // Kaynak sayfalar tek seferde kopyalanır; boş sayfalar komşu sayfanın ölçüsünü alır.
    const need = Array.from(new Set(list.filter((p) => p.srcIndex !== null).map((p) => p.srcIndex)));
    const copied = new Map();
    for (let k = 0; k < need.length; k += 20) {
      const chunk = need.slice(k, k + 20);
      const cp = await out.copyPages(src, chunk);
      chunk.forEach((si, j) => copied.set(si, cp[j]));
      setProgress($('progress'), 10 + (Math.min(k + 20, need.length) / need.length) * 70, `Sayfalar kopyalanıyor ${Math.min(k + 20, need.length)}/${need.length}`);
      await tick();
    }
    let lastSize = [595.28, 841.89]; // A4
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      let page;
      if (p.srcIndex === null) {
        const next = list.slice(i + 1).find((q) => q.srcIndex !== null);
        const ref = next ? srcPages[next.srcIndex] : null;
        const size = ref ? [ref.getWidth(), ref.getHeight()] : lastSize;
        page = out.addPage(size);
      } else {
        page = copied.get(p.srcIndex);
        out.addPage(page);
        lastSize = [page.getWidth(), page.getHeight()];
      }
      const current = page.getRotation().angle || 0;
      page.setRotation(PDFLib.degrees((current + p.rotation) % 360));
    }
    setProgress($('progress'), 90, 'PDF yazılıyor…');
    await tick();
    const bytes = await out.save();
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = name;
    $('result-info').textContent = `${info} · ${formatBytes(resultBlob.size)} · ${name}`;
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
    updateSummary();
  }
}

$('download').addEventListener('click', () => {
  if (!resultBlob) return;
  downloadBlob(resultBlob, resultName);
});

/* ---------- Temizle ---------- */

function reset() {
  if (observer) { observer.disconnect(); observer = null; }
  if (pdfjsDoc) { pdfjsDoc.destroy().catch(() => {}); }
  file = null; srcBytes = null; pdfjsDoc = null; srcPageCount = 0; pages = []; resultBlob = null; resultName = '';
  $('files').innerHTML = ''; grid.innerHTML = '';
  $('editor').hidden = true; $('actions').hidden = true; $('warn-big').hidden = true; $('lazy-note').hidden = true;
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);
