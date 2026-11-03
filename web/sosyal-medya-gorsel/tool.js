// Sosyal Medya Görsel Boyutlandırıcı — saf Canvas; ZIP için fflate (MIT). Dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const EXT = { jpeg: 'jpg', png: 'png', webp: 'webp' };

// parametreler.json yüklenemezse (çevrimdışı önbellek vb.) kullanılan yedek liste.
const FALLBACK = [
  { id: 'ig-kare', platform: 'Instagram', ad: 'Gönderi (kare)', w: 1080, h: 1080 },
  { id: 'ig-dikey', platform: 'Instagram', ad: 'Gönderi (dikey 4:5)', w: 1080, h: 1350 },
  { id: 'ig-hikaye', platform: 'Instagram', ad: 'Hikaye / Reels', w: 1080, h: 1920 },
  { id: 'yt-kucuk', platform: 'YouTube', ad: 'Video küçük resmi', w: 1280, h: 720 },
];

let presets = [];
let img = null; // { bitmap, w, h, name, size }
let fflate = null;
const states = new Map(); // ön ayar id → { zoom, ox, oy } (ox/oy: çıktı boyutuna oranla kaydırma)
let activeId = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/* ---------- Ön ayarlar ---------- */
function clampInt(v, min, max, def) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return def;
  return Math.max(min, Math.min(max, n));
}
function customPreset() {
  return { id: 'ozel', platform: 'Özel', ad: 'Özel ölçü', w: clampInt($('custom-w').value, 16, 8000, 1000), h: clampInt($('custom-h').value, 16, 8000, 1000) };
}
function getPreset(id) { return id === 'ozel' ? customPreset() : presets.find((p) => p.id === id); }
function stateOf(id) {
  if (!states.has(id)) states.set(id, { zoom: 1, ox: 0, oy: 0 });
  return states.get(id);
}

async function loadPresets() {
  let list = FALLBACK;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.onayarlar) && data.onayarlar.length) list = data.onayarlar;
      const d = new Date(data.guncelleme);
      const txt = Number.isNaN(d.getTime()) ? data.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
      document.querySelectorAll('[data-param-date]').forEach((el) => { el.textContent = txt; });
    }
  } catch { /* yedek listeyle devam */ }
  presets = list;
  const sel = $('preset');
  const groups = new Map();
  for (const p of presets) {
    if (!groups.has(p.platform)) groups.set(p.platform, []);
    groups.get(p.platform).push(p);
  }
  sel.innerHTML = '';
  const checks = $('batch-list');
  checks.innerHTML = '';
  for (const [plat, arr] of groups) {
    const og = document.createElement('optgroup');
    og.label = plat;
    for (const p of arr) {
      const o = document.createElement('option');
      o.value = p.id; o.textContent = `${p.ad} — ${p.w}×${p.h}`;
      og.appendChild(o);
      const lab = document.createElement('label');
      lab.className = 'sm-check';
      lab.innerHTML = '<input type="checkbox"> <span></span>';
      lab.querySelector('input').value = p.id;
      lab.querySelector('span').textContent = `${plat} ${p.ad} (${p.w}×${p.h})`;
      checks.appendChild(lab);
    }
    sel.appendChild(og);
  }
  const og = document.createElement('optgroup');
  og.label = 'Diğer';
  const o = document.createElement('option');
  o.value = 'ozel'; o.textContent = 'Özel ölçü (piksel girin)';
  og.appendChild(o); sel.appendChild(og);
  activeId = presets[0].id;
  // Adresteki ?on=ig-hikaye gibi bir ön ayar varsa onu seç.
  const want = new URLSearchParams(location.search).get('on');
  if (want && getPreset(want)) activeId = want;
  sel.value = activeId;
}

/* ---------- Çizim ---------- */
// Hem önizleme hem çıktı bu fonksiyonla çizilir; böylece gördüğünüz ile indirdiğiniz aynıdır.
function draw(canvas, preset, st, scaleDown = 1) {
  const w = Math.max(1, Math.round(preset.w * scaleDown));
  const h = Math.max(1, Math.round(preset.h * scaleDown));
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  const fit = $('fit').value; // cover | contain
  const base = fit === 'cover' ? Math.max(w / img.w, h / img.h) : Math.min(w / img.w, h / img.h);
  const s = base * st.zoom;
  const dw = img.w * s, dh = img.h * s;
  const lim = (frame, size) => (fit === 'cover' || size >= frame ? Math.max(0, (size - frame) / 2) : (frame - size) / 2);
  let cx = w / 2 + st.ox * w, cy = h / 2 + st.oy * h;
  cx = Math.max(w / 2 - lim(w, dw), Math.min(w / 2 + lim(w, dw), cx));
  cy = Math.max(h / 2 - lim(h, dh), Math.min(h / 2 + lim(h, dh), cy));
  // Resim tuvali tamamen kaplamıyorsa (sığdır modu) boşluklar arka planla doldurulur.
  if (!(dw >= w - 0.5 && dh >= h - 0.5)) paintBackground(ctx, w, h);
  ctx.drawImage(img.bitmap, cx - dw / 2, cy - dh / 2, dw, dh);
  return { cx, cy };
}

function paintBackground(ctx, w, h) {
  if ($('bg-mode').value === 'color') {
    ctx.fillStyle = $('bg-color').value;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  // Bulanık arka plan: resmi doldurarak küçük tuvale çiz, sonra büyüt (her tarayıcıda çalışır).
  const k = 24;
  const small = document.createElement('canvas');
  small.width = Math.max(2, Math.round(w / k)); small.height = Math.max(2, Math.round(h / k));
  const sctx = small.getContext('2d');
  sctx.imageSmoothingQuality = 'high';
  const sc = Math.max(small.width / img.w, small.height / img.h);
  sctx.drawImage(img.bitmap, (small.width - img.w * sc) / 2, (small.height - img.h * sc) / 2, img.w * sc, img.h * sc);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(small, 0, 0, w, h);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; // öndeki resim öne çıksın
  ctx.fillRect(0, 0, w, h);
}

function ratioText(w, h) {
  const g = (a, b) => (b ? g(b, a % b) : a);
  const d = g(w, h);
  const a = w / d, b = h / d;
  return a > 40 || b > 40 ? `${(w / h).toFixed(2)}:1` : `${a}:${b}`;
}

function updatePreview() {
  if (!img) return;
  const p = getPreset(activeId);
  const st = stateOf(activeId);
  const maxW = Math.min(560, $('stage-wrap').clientWidth || 560);
  const sc = Math.min(maxW / p.w, 460 / p.h, 1);
  const cv = $('stage');
  draw(cv, p, st, sc);
  cv.style.width = `${cv.width}px`;
  cv.style.height = `${cv.height}px`;
  $('size-info').textContent = `Çıktı: ${p.w}×${p.h} piksel · oran ${ratioText(p.w, p.h)} · kaynak ${img.w}×${img.h}`;
  const need = (($('fit').value === 'cover') ? Math.max(p.w / img.w, p.h / img.h) : Math.min(p.w / img.w, p.h / img.h)) * st.zoom;
  $('warn-up').hidden = !(need > 1.5);
}

/* ---------- Dosya seçimi ---------- */
createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp,image/gif,image/bmp', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(file) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  if (!/^image\//.test(file.type) && !/\.(jpe?g|png|webp|gif|bmp)$/i.test(file.name)) {
    const pdf = /\.pdf$/i.test(file.name) || file.type === 'application/pdf';
    showError($('error'), `Yalnızca JPG, PNG, WebP, GIF ve BMP resimleri kullanılabilir.${pdf ? ' PDF sayfasını resme çevirmek için önce "PDF\'den Resme" aracını kullanın.' : ''} HEIC fotoğrafları için telefonunuzda "en uyumlu" biçimi seçip JPG olarak kaydedin.`);
    return;
  }
  const big = file.size > BIG_FILE;
  try {
    const bitmap = await createImageBitmap(file);
    if (img && img.bitmap.close) img.bitmap.close();
    img = { bitmap, w: bitmap.width, h: bitmap.height, name: file.name, size: file.size };
  } catch {
    showError($('error'), 'Resim açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edip JPG veya PNG olarak yeniden kaydedin.');
    return;
  }
  if (big) showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir.');
  states.clear();
  $('file-info').textContent = `${img.name} · ${img.w}×${img.h} · ${formatBytes(img.size)}`;
  $('editor').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  syncControls();
  updatePreview();
}

function syncControls() {
  const st = stateOf(activeId);
  $('zoom').value = String(st.zoom);
  $('zoom-val').textContent = `${Math.round(st.zoom * 100)}%`;
  $('custom-box').hidden = activeId !== 'ozel';
  $('bg-field').hidden = $('fit').value !== 'contain';
  $('bg-color-field').hidden = $('fit').value !== 'contain' || $('bg-mode').value !== 'color';
  $('q-field').hidden = $('format').value === 'png';
  $('q-val').textContent = String(Math.round(Number($('quality').value) * 100));
}

/* ---------- Etkileşim ---------- */
$('preset').addEventListener('change', () => { activeId = $('preset').value; syncControls(); updatePreview(); });
['fit', 'bg-mode', 'bg-color', 'format', 'quality'].forEach((id) => $(id).addEventListener('input', () => { syncControls(); updatePreview(); }));
['custom-w', 'custom-h'].forEach((id) => $(id).addEventListener('input', () => {
  if ($('lock').checked && img) {
    // Oran kilidi: diğer kenarı kaynak resmin oranına göre hesapla.
    const r = img.w / img.h;
    if (id === 'custom-w') $('custom-h').value = String(clampInt($('custom-w').value / r, 16, 8000, 1000));
    else $('custom-w').value = String(clampInt($('custom-h').value * r, 16, 8000, 1000));
  }
  updatePreview();
}));
$('zoom').addEventListener('input', () => {
  const st = stateOf(activeId);
  st.zoom = Number($('zoom').value);
  $('zoom-val').textContent = `${Math.round(st.zoom * 100)}%`;
  updatePreview();
});
$('reset').addEventListener('click', () => { states.set(activeId, { zoom: 1, ox: 0, oy: 0 }); syncControls(); updatePreview(); });

// Sınırın ötesinde biriken kaydırma değerini çizimin gerçekten uyguladığı değere çeker.
function normalize(st) {
  const p = getPreset(activeId);
  const tmp = document.createElement('canvas');
  const r = draw(tmp, p, st, Math.min(1, 200 / Math.max(p.w, p.h)));
  st.ox = (r.cx - tmp.width / 2) / tmp.width;
  st.oy = (r.cy - tmp.height / 2) / tmp.height;
}
function nudge(st) { normalize(st); updatePreview(); }

// Sürükleyerek konumlandırma (fare ve dokunma), klavyede ok tuşları, + / - ile yakınlaştırma.
let drag = null;
const stage = $('stage');
stage.addEventListener('pointerdown', (e) => {
  if (!img) return;
  drag = { x: e.clientX, y: e.clientY, ox: stateOf(activeId).ox, oy: stateOf(activeId).oy };
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const r = stage.getBoundingClientRect();
  const st = stateOf(activeId);
  st.ox = drag.ox + (e.clientX - drag.x) / r.width;
  st.oy = drag.oy + (e.clientY - drag.y) / r.height;
  nudge(st);
});
const endDrag = () => { drag = null; };
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
stage.addEventListener('keydown', (e) => {
  const st = stateOf(activeId);
  const map = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, -0.02], ArrowDown: [0, 0.02] };
  if (map[e.key]) { e.preventDefault(); st.ox += map[e.key][0]; st.oy += map[e.key][1]; nudge(st); }
  if (e.key === '+' || e.key === '=') { e.preventDefault(); st.zoom = Math.min(4, st.zoom + 0.1); syncControls(); updatePreview(); }
  if (e.key === '-') { e.preventDefault(); st.zoom = Math.max(1, st.zoom - 0.1); syncControls(); updatePreview(); }
});

/* ---------- Dışa aktarma ---------- */
function encode(preset) {
  const cv = document.createElement('canvas');
  draw(cv, preset, stateOf(preset.id), 1);
  const type = MIME[$('format').value];
  return new Promise((resolve, reject) => {
    cv.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), type, type === 'image/png' ? undefined : Number($('quality').value));
  });
}
function outName(p) {
  return `${baseName(img.name)}-${p.id}-${p.w}x${p.h}.${EXT[$('format').value]}`;
}

$('run').addEventListener('click', async () => {
  if (!img) return;
  showError($('error'), null);
  try {
    const p = getPreset(activeId);
    const blob = await encode(p);
    if (blob.type !== MIME[$('format').value]) {
      showError($('error'), 'Tarayıcınız seçtiğiniz biçimde kaydedemedi; JPG ya da PNG seçip tekrar deneyin.');
      return;
    }
    downloadBlob(blob, outName(p));
    $('result-info').textContent = `${outName(p)} · ${formatBytes(blob.size)}`;
    $('result').classList.add('is-active');
  } catch {
    showError($('error'), 'Görsel oluşturulamadı. Ölçüyü küçültüp ya da başka bir biçim seçip tekrar deneyin.');
  }
});

$('run-zip').addEventListener('click', async () => {
  if (!img) return;
  showError($('error'), null);
  const ids = Array.from(document.querySelectorAll('#batch-list input:checked')).map((i) => i.value);
  if ($('batch-active').checked && !ids.includes(activeId)) ids.unshift(activeId);
  if (ids.length < 1) {
    showError($('error'), 'ZIP için en az bir ön ayar işaretleyin ya da "şu an seçili ölçüyü de ekle" kutusunu açın.');
    return;
  }
  try {
    const { zipSync } = await getFflate();
    const files = {};
    let total = 0;
    for (let i = 0; i < ids.length; i++) {
      const p = getPreset(ids[i]);
      setProgress($('progress'), (i / ids.length) * 90, `${p.platform} ${p.ad} hazırlanıyor (${i + 1}/${ids.length})`);
      await tick();
      const blob = await encode(p);
      files[outName(p)] = [new Uint8Array(await blob.arrayBuffer()), { level: 0 }];
      total += blob.size;
    }
    setProgress($('progress'), 95, 'ZIP paketleniyor');
    await tick();
    downloadBlob(new Blob([zipSync(files)], { type: 'application/zip' }), `${baseName(img.name)}-sosyal-medya.zip`);
    setProgress($('progress'), 100, 'Hazır');
    $('result-info').textContent = `${ids.length} görsel ZIP içinde · ${formatBytes(total)}`;
    $('result').classList.add('is-active');
    setTimeout(() => setProgress($('progress'), null), 800);
  } catch {
    setProgress($('progress'), null);
    showError($('error'), 'ZIP oluşturulamadı. Daha az ön ayar seçip ya da daha küçük bir resimle tekrar deneyin.');
  }
});

$('clear').addEventListener('click', () => {
  img = null; states.clear();
  $('editor').hidden = true; $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  showError($('error'), null);
});

window.addEventListener('resize', () => updatePreview());
loadPresets().then(syncControls);
