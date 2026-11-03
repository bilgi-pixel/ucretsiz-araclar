// PDF Aç (görüntüleyici): pdf.js ile PDF tarayıcıda çizilir; sayfa gezinme, yakınlaştırma, döndürme (yalnızca görünüm),
// metin arama (textContent), küçük resimler, tam ekran ve yazdırma. Dosya hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, formatBytes, showError, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MIN_SCALE = 0.25;
const MAX_SCALE = 5;

let pdfjs = null;
let pdf = null;
let loadingTask = null;
let pageNo = 1;
let scale = 1;
let fitMode = true; // true: genişliğe sığdır
let rotation = 0; // yalnızca görünüm, 90'ın katı
let renderToken = 0;
let renderTask = null;
const textCache = new Map(); // sayfa no → { items, viewportless }
let matches = []; // { page, item, start, len }
let matchIndex = -1;
let searchToken = 0;
let thumbObserver = null;

const dz = createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: (f) => openFile(f[0]) });
void dz;

/** Seçilen dosyayı pdf.js ile açar. Şifre gerekirse parola kutusunu gösterir. */
async function openFile(file) {
  showError($('error'), null);
  $('warning').classList.remove('is-active');
  closeDoc();
  if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
    showError($('error'), `"${file.name}" bir PDF değil. Word dosyası için PDF'e Çevir araçlarını, resimler için Resimden PDF'e aracını kullanın.`);
    return;
  }
  try { pdfjs = pdfjs || await getPdfJs(); } catch (err) {
    showError($('error'), 'Görüntüleyici yüklenemedi. Sayfayı yenileyip tekrar deneyin.');
    return;
  }
  setProgress($('progress'), 20, 'PDF açılıyor…');
  if (file.size >= BIG_FILE) {
    $('warning').textContent = `Dosya büyük (${formatBytes(file.size)}). Açılması uzun sürebilir; telefonlarda bellek yetmeyebilir.`;
    $('warning').classList.add('is-active');
  }
  let data;
  try { data = new Uint8Array(await file.arrayBuffer()); } catch {
    setProgress($('progress'), null);
    showError($('error'), 'Dosya okunamadı. Dosyayı yeniden seçmeyi deneyin.');
    return;
  }
  const task = pdfjs.getDocument({ data });
  loadingTask = task;
  task.onPassword = (update, reason) => {
    setProgress($('progress'), null);
    askPassword(update, reason, file.name);
  };
  try {
    const doc = await task.promise;
    if (loadingTask !== task) { doc.destroy(); return; }
    hidePasswordBox();
    pdf = doc;
    setProgress($('progress'), null);
    startViewer(file);
  } catch (err) {
    if (loadingTask !== task) return; // kullanıcı vazgeçti ya da yeni dosya seçti
    setProgress($('progress'), null);
    hidePasswordBox();
    const s = String(err && (err.name + ' ' + err.message));
    showError($('error'), /Password|encrypted/i.test(s)
      ? 'Bu PDF şifreli ve açılamadı. Doğru parolayla tekrar deneyin ya da dosyayı gönderen kişiden parolayı isteyin.'
      : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı yeniden indirmeyi veya başka bir programda açılıp açılmadığını denemeyi öneririz.`);
  }
}

let pwUpdate = null;
function askPassword(update, reason, name) {
  pwUpdate = update;
  $('pw-box').hidden = false;
  $('pw-msg').innerHTML = '';
  const strong = document.createElement('strong');
  strong.textContent = reason === 2 ? 'Parola yanlış.' : 'Bu PDF parola korumalı.';
  $('pw-msg').append(strong, document.createTextNode(reason === 2
    ? ` "${name}" için doğru parolayı yazıp tekrar deneyin.`
    : ' Açmak için parolayı yazın. Parola yalnızca tarayıcınızda kullanılır, hiçbir yere gönderilmez.'));
  $('pw').value = '';
  $('pw').focus();
}
function hidePasswordBox() { $('pw-box').hidden = true; pwUpdate = null; $('pw').value = ''; }
$('pw-box').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!pwUpdate || !$('pw').value) return;
  setProgress($('progress'), 40, 'Parola deneniyor…');
  const fn = pwUpdate;
  fn($('pw').value);
});
$('pw-cancel').addEventListener('click', () => {
  if (loadingTask) { const t = loadingTask; loadingTask = null; t.destroy(); }
  setProgress($('progress'), null);
  hidePasswordBox();
});

function closeDoc() {
  renderToken++;
  searchToken++;
  if (renderTask) { try { renderTask.cancel(); } catch { /* yoksay */ } renderTask = null; }
  if (loadingTask) { try { loadingTask.destroy(); } catch { /* yoksay */ } loadingTask = null; }
  pdf = null;
  textCache.clear();
  matches = []; matchIndex = -1;
  if (thumbObserver) { thumbObserver.disconnect(); thumbObserver = null; }
  $('side').innerHTML = '';
  $('hl-layer').innerHTML = '';
  $('q').value = '';
  $('search-status').textContent = '';
  $('viewer').hidden = true;
  $('file-info').hidden = true;
  $('drop').classList.remove('compact');
  hidePasswordBox();
}

function startViewer(file) {
  pageNo = 1; rotation = 0; fitMode = true;
  $('viewer').hidden = false;
  $('drop').classList.add('compact');
  $('file-info').hidden = false;
  $('file-info').textContent = `${file.name} · ${pdf.numPages} sayfa · ${formatBytes(file.size)}`;
  $('page-total').textContent = String(pdf.numPages);
  $('page-no').max = String(pdf.numPages);
  buildThumbs();
  goTo(1, true);
}

/** Sayfayı çizer (tarayıcı yoğunluğuna göre keskin). */
async function renderPage() {
  if (!pdf) return;
  const token = ++renderToken;
  if (renderTask) { try { renderTask.cancel(); } catch { /* yoksay */ } }
  const page = await pdf.getPage(pageNo);
  if (token !== renderToken) return;
  const base = page.getViewport({ scale: 1, rotation: (page.rotate + rotation) % 360 });
  if (fitMode) {
    const avail = Math.max(200, $('stage').clientWidth - 28);
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, avail / base.width));
  }
  const viewport = page.getViewport({ scale, rotation: (page.rotate + rotation) % 360 });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = $('canvas');
  canvas.width = Math.floor(viewport.width * dpr);
  canvas.height = Math.floor(viewport.height * dpr);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;
  $('zoom-lbl').textContent = `${Math.round(scale * 100)}%`;
  const ctx = canvas.getContext('2d');
  renderTask = page.render({ canvasContext: ctx, viewport, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null });
  try { await renderTask.promise; } catch (e) { if (e && e.name === 'RenderingCancelledException') return; throw e; }
  if (token !== renderToken) return;
  canvas.dataset.page = String(pageNo);
  canvas.dataset.ready = '1';
  await drawHighlights(page, viewport, token);
}

function goTo(n, force = false) {
  if (!pdf) return;
  n = Math.min(pdf.numPages, Math.max(1, Math.round(n) || 1));
  if (n === pageNo && !force) { $('page-no').value = String(n); return; }
  pageNo = n;
  $('canvas').dataset.ready = '0';
  $('page-no').value = String(n);
  $('btn-prev').disabled = n <= 1;
  $('btn-next').disabled = n >= pdf.numPages;
  $('stage').scrollTop = 0;
  for (const b of $('side').children) b.setAttribute('aria-current', b.dataset.page === String(n) ? 'true' : 'false');
  const cur = $('side').querySelector('[aria-current="true"]');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
  renderPage().catch(() => showError($('error'), 'Sayfa çizilemedi. Dosya bozuk olabilir; başka bir PDF okuyucuyla da deneyin.'));
}

function setScale(next) {
  fitMode = false;
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
  renderPage();
}
const zoomStep = (dir) => setScale(scale * (dir > 0 ? 1.25 : 0.8));

/* ---------- Küçük resimler ---------- */
function buildThumbs() {
  const side = $('side');
  side.innerHTML = '';
  if (thumbObserver) thumbObserver.disconnect();
  thumbObserver = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      thumbObserver.unobserve(en.target);
      drawThumb(en.target);
    }
  }, { root: side, rootMargin: '200px' });
  for (let i = 1; i <= pdf.numPages; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pv-thumb';
    b.dataset.page = String(i);
    b.setAttribute('aria-label', `${i}. sayfaya git`);
    b.setAttribute('aria-current', i === 1 ? 'true' : 'false');
    const c = document.createElement('canvas');
    c.width = 120; c.height = 160;
    b.append(c, document.createTextNode(String(i)));
    side.appendChild(b);
    thumbObserver.observe(b);
  }
}
async function drawThumb(btn) {
  const doc = pdf;
  if (!doc) return;
  try {
    const page = await doc.getPage(Number(btn.dataset.page));
    const rot = (page.rotate + rotation) % 360;
    const base = page.getViewport({ scale: 1, rotation: rot });
    const vp = page.getViewport({ scale: 120 / base.width, rotation: rot });
    const c = btn.querySelector('canvas');
    c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    btn.dataset.done = '1';
  } catch { /* küçük resim çizilemezse sessizce geç */ }
}
$('side').addEventListener('click', (e) => {
  const b = e.target.closest('.pv-thumb');
  if (b) goTo(Number(b.dataset.page));
});
$('btn-side').addEventListener('click', () => {
  const hide = !$('side').hidden;
  $('side').hidden = hide;
  $('btn-side').setAttribute('aria-pressed', String(!hide));
  renderPage();
});

/* ---------- Arama ---------- */
const norm = (s) => s.toLocaleLowerCase('tr-TR');

async function getText(n) {
  if (textCache.has(n)) return textCache.get(n);
  const page = await pdf.getPage(n);
  const content = await page.getTextContent();
  const items = content.items.filter((it) => typeof it.str === 'string');
  textCache.set(n, items);
  return items;
}

async function runSearch() {
  const q = $('q').value.trim();
  const token = ++searchToken;
  matches = []; matchIndex = -1;
  $('hl-layer').innerHTML = '';
  if (!pdf || !q) { $('search-status').textContent = ''; return; }
  const needle = norm(q);
  const doc = pdf;
  $('search-status').textContent = 'Aranıyor…';
  for (let n = 1; n <= doc.numPages; n++) {
    const items = await getText(n);
    if (token !== searchToken || doc !== pdf) return;
    items.forEach((it, idx) => {
      const hay = norm(it.str);
      let from = 0;
      for (;;) {
        const at = hay.indexOf(needle, from);
        if (at < 0) break;
        matches.push({ page: n, item: idx, start: at, len: needle.length, hayLen: hay.length });
        from = at + Math.max(1, needle.length);
      }
    });
    if (n % 5 === 0) await tick();
  }
  if (token !== searchToken) return;
  if (!matches.length) { $('search-status').textContent = 'Eşleşme yok'; $('search-status').dataset.count = '0'; await refreshHighlights(); return; }
  // Geçerli sayfadan sonraki ilk eşleşmeyi seç
  let first = matches.findIndex((m) => m.page >= pageNo);
  if (first < 0) first = 0;
  selectMatch(first);
}

function selectMatch(i) {
  if (!matches.length) return;
  matchIndex = (i + matches.length) % matches.length;
  const m = matches[matchIndex];
  $('search-status').textContent = `${matchIndex + 1} / ${matches.length} eşleşme`;
  $('search-status').dataset.count = String(matches.length);
  if (m.page !== pageNo) goTo(m.page); else refreshHighlights();
}

async function refreshHighlights() {
  if (!pdf) return;
  const token = renderToken;
  const page = await pdf.getPage(pageNo);
  const viewport = page.getViewport({ scale, rotation: (page.rotate + rotation) % 360 });
  await drawHighlights(page, viewport, token);
}

/** Geçerli sayfadaki eşleşmeleri sarı kutularla işaretler (item dönüşümü viewport'a çevrilir). */
async function drawHighlights(page, viewport, token) {
  const layer = $('hl-layer');
  layer.innerHTML = '';
  if (!matches.length || token !== renderToken) return;
  const items = await getText(pageNo);
  const Util = pdfjs.Util;
  const frag = document.createDocumentFragment();
  matches.forEach((m, idx) => {
    if (m.page !== pageNo) return;
    const it = items[m.item];
    if (!it || !it.width) return;
    const tx = Util.transform(viewport.transform, it.transform);
    const fontH = Math.hypot(tx[2], tx[3]) || 10;
    const ux = tx[0] / (Math.hypot(tx[0], tx[1]) || 1);
    const uy = tx[1] / (Math.hypot(tx[0], tx[1]) || 1);
    const total = it.width * viewport.scale;
    const w = (total * m.len) / m.hayLen;
    const off = (total * m.start) / m.hayLen;
    const d = document.createElement('div');
    d.className = 'pv-hl' + (idx === matchIndex ? ' cur' : '');
    d.dataset.match = String(idx);
    d.style.cssText = `left:${tx[4]}px;top:${tx[5]}px;width:${w}px;height:${fontH}px;transform-origin:0 0;transform:matrix(${ux},${uy},${-uy},${ux},0,0) translate(${off}px,-100%)`;
    frag.appendChild(d);
  });
  layer.appendChild(frag);
}

let searchTimer = null;
$('q').addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(runSearch, 300); });
$('q').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  if (searchTimer) { clearTimeout(searchTimer); searchTimer = null; runSearch(); return; }
  selectMatch(matchIndex + (e.shiftKey ? -1 : 1));
});
$('btn-snext').addEventListener('click', () => selectMatch(matchIndex + 1));
$('btn-sprev').addEventListener('click', () => selectMatch(matchIndex - 1));

/* ---------- Araç çubuğu ---------- */
$('btn-prev').addEventListener('click', () => goTo(pageNo - 1));
$('btn-next').addEventListener('click', () => goTo(pageNo + 1));
$('page-no').addEventListener('change', () => goTo(Number($('page-no').value)));
$('page-no').addEventListener('keydown', (e) => { if (e.key === 'Enter') goTo(Number($('page-no').value)); });
$('btn-zin').addEventListener('click', () => zoomStep(1));
$('btn-zout').addEventListener('click', () => zoomStep(-1));
$('btn-fit').addEventListener('click', () => { fitMode = true; renderPage(); });
$('btn-rot').addEventListener('click', () => {
  rotation = (rotation + 90) % 360;
  // küçük resimleri yeni yönle yeniden çiz
  for (const b of $('side').children) { b.dataset.done = ''; thumbObserver && thumbObserver.observe(b); }
  renderPage();
});
$('btn-full').addEventListener('click', async () => {
  const wrap = $('wrap');
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await wrap.requestFullscreen();
  } catch { showError($('error'), 'Tam ekran bu tarayıcıda açılamadı. Tarayıcının kendi tam ekran (F11) özelliğini deneyin.'); }
});
document.addEventListener('fullscreenchange', () => { if (pdf) renderPage(); });
window.addEventListener('resize', () => { if (pdf && fitMode) renderPage(); });

/* ---------- Yazdırma ---------- */
async function printAll() {
  if (!pdf) return;
  const area = $('print-area');
  area.innerHTML = '';
  const doc = pdf;
  try {
    for (let n = 1; n <= doc.numPages; n++) {
      setProgress($('progress'), (n - 1) / doc.numPages * 100, `Yazdırmaya hazırlanıyor… ${n}/${doc.numPages}`);
      const page = await doc.getPage(n);
      const rot = (page.rotate + rotation) % 360;
      const base = page.getViewport({ scale: 1, rotation: rot });
      const vp = page.getViewport({ scale: Math.min(2, 1500 / base.width), rotation: rot });
      const c = document.createElement('canvas');
      c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      area.appendChild(c);
      await tick();
    }
  } catch {
    setProgress($('progress'), null);
    showError($('error'), 'Yazdırma için sayfalar hazırlanamadı. Dosyayı daha küçük parçalara bölüp yeniden deneyin.');
    return;
  }
  setProgress($('progress'), 100, 'Hazır');
  await tick();
  setProgress($('progress'), null);
  window.print();
}
window.addEventListener('afterprint', () => { $('print-area').innerHTML = ''; });
$('btn-print').addEventListener('click', printAll);

/* ---------- Klavye kısayolları ---------- */
document.addEventListener('keydown', (e) => {
  if (!pdf || $('viewer').hidden) return;
  const t = e.target;
  const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') { e.preventDefault(); printAll(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') { e.preventDefault(); $('q').focus(); $('q').select(); return; }
  if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
  const inButton = t && t.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter');
  if (inButton) return;
  switch (e.key) {
    case 'ArrowLeft': case 'PageUp': e.preventDefault(); goTo(pageNo - 1); break;
    case 'ArrowRight': case 'PageDown': e.preventDefault(); goTo(pageNo + 1); break;
    case 'Home': e.preventDefault(); goTo(1); break;
    case 'End': e.preventDefault(); goTo(pdf.numPages); break;
    case '+': case '=': e.preventDefault(); zoomStep(1); break;
    case '-': case '_': e.preventDefault(); zoomStep(-1); break;
    case '0': e.preventDefault(); fitMode = true; renderPage(); break;
    case 'r': case 'R': e.preventDefault(); $('btn-rot').click(); break;
    case 'f': case 'F': e.preventDefault(); $('btn-full').click(); break;
    case '/': e.preventDefault(); $('q').focus(); break;
    default: break;
  }
});
