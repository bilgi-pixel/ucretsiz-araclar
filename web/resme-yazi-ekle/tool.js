// Resme Yazı ve Filigran Ekle — saf Canvas; zip için fflate (MIT). Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;
const MAX_PIXELS = 268_000_000;
const PREVIEW_W = 720;
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

let items = []; // { id, file, w, h, broken, outBlob, outName }
let seq = 0;
let logo = null; // { bmp, w, h, name }
let previewBmp = null; // ilk resmin küçültülmüş kopyası
let previewId = null;
// Konum: ızgara ({ fx, fy }) ya da serbest ({ cx, cy }); hepsi 0–1 oranı.
let textPos = { fx: 0.5, fy: 0.5 };
let logoPos = { fx: 1, fy: 1 };

let fflate = null;
async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp', multiple: true, onFiles: addFiles });

/* ---------- Resim yükleme yardımcıları ---------- */
async function loadBitmap(file, opts = {}) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image', ...opts }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unable to decode image'));
    img.src = URL.createObjectURL(file);
  });
}
const dimsOf = (b) => ({ w: b.width || b.naturalWidth, h: b.height || b.naturalHeight });

/* ---------- Dosya listesi ---------- */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name));
  if (ok.length !== files.length) {
    const pdf = files.some((f) => /\.pdf$/i.test(f.name) || f.type === 'application/pdf');
    showError($('error'), `Yalnızca JPG, PNG ve WebP resimlerine yazı eklenebilir; diğer dosyalar atlandı.${pdf ? ' PDF için "PDF Filigran" aracını kullanın.' : ''} HEIC fotoğrafları için önce "Resim Formatı Dönüştür" aracından geçirin.`);
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız önce "Resim Küçült" aracını deneyin.');
  }
  const brokenNames = [];
  for (const file of ok) {
    const it = { id: String(++seq), file, w: 0, h: 0, broken: false, outBlob: null, outName: '' };
    try {
      const bmp = await loadBitmap(file);
      const d = dimsOf(bmp);
      bmp.close && bmp.close();
      if (!d.w || !d.h) throw new Error('Unable to decode image');
      it.w = d.w; it.h = d.h;
    } catch {
      brokenNames.push(file.name);
      continue; // bozuk dosya listeye alınmaz
    }
    items.push(it);
    const li = document.createElement('li');
    li.dataset.id = it.id;
    li.innerHTML = `<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${it.w}×${it.h} · ${formatBytes(file.size)}`;
    list.appendChild(li);
  }
  if (brokenNames.length) {
    showError($('error'), `${brokenNames.slice(0, 3).join(', ')} açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edip yeniden kaydedin.`);
  }
  refresh();
  schedulePreview(true);
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  items = items.filter((x) => x.id !== li.dataset.id);
  li.remove();
  refresh();
  schedulePreview(true);
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-wrap').hidden = !has;
  if (!has) { previewBmp = null; previewId = null; }
  $('result').classList.remove('is-active');
}

$('clear').addEventListener('click', () => {
  items = []; list.innerHTML = '';
  showError($('error'), null);
  refresh();
});

/* ---------- Seçenekler ---------- */
const bind = (id, outId, fmt) => $(id).addEventListener('input', () => { $(outId).textContent = fmt($(id).value); });
bind('opt-size', 'opt-size-out', (v) => `%${v}`);
bind('opt-opacity', 'opt-opacity-out', (v) => `%${v}`);
bind('opt-angle', 'opt-angle-out', (v) => `${v}°`);
bind('opt-logo-size', 'opt-logo-size-out', (v) => `%${v}`);
bind('opt-quality', 'opt-quality-out', (v) => `%${Math.round(v * 100)}`);
bind('opt-color', 'opt-color-code', (v) => v);
['opt-text', 'opt-size', 'opt-color', 'opt-opacity', 'opt-angle', 'opt-bold', 'opt-shadow', 'opt-tile', 'opt-gap', 'opt-logo-size', 'opt-format'].forEach((id) => {
  $(id).addEventListener('input', () => schedulePreview(false));
  $(id).addEventListener('change', () => schedulePreview(false));
});
$('opt-format').addEventListener('change', () => { $('field-quality').hidden = $('opt-format').value === 'png'; });

function markGrid(fx, fy) {
  $('pos-grid').querySelectorAll('button').forEach((b) => {
    b.setAttribute('aria-pressed', String(fx !== null && Number(b.dataset.fx) === fx && Number(b.dataset.fy) === fy));
  });
}
$('pos-grid').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  textPos = { fx: Number(b.dataset.fx), fy: Number(b.dataset.fy) };
  markGrid(textPos.fx, textPos.fy);
  schedulePreview(false);
});
$('opt-logo-pos').addEventListener('change', () => {
  const [fx, fy] = $('opt-logo-pos').value.split(',').map(Number);
  logoPos = { fx, fy };
  schedulePreview(false);
});

/* ---------- Logo ---------- */
$('logo-input').addEventListener('change', async () => {
  const f = $('logo-input').files[0];
  if (!f) return;
  showError($('error'), null);
  try {
    if (!/^image\//.test(f.type) && !/\.(png|webp|jpe?g)$/i.test(f.name)) throw new Error('not image');
    const bmp = await loadBitmap(f);
    const d = dimsOf(bmp);
    if (!d.w || !d.h) throw new Error('decode');
    logo = { bmp, w: d.w, h: d.h, name: f.name };
    $('logo-name').textContent = `${f.name} (${d.w}×${d.h})`;
    $('logo-opts').hidden = false;
    $('logo-remove').hidden = false;
  } catch {
    $('logo-input').value = '';
    showError($('error'), 'Logo dosyası açılamadı. Arka planı şeffaf bir PNG (ya da JPG/WebP) seçin; dosyanın bozuk olmadığını kontrol edin.');
  }
  schedulePreview(false);
});
$('logo-remove').addEventListener('click', () => {
  logo = null;
  $('logo-input').value = '';
  $('logo-name').textContent = '';
  $('logo-opts').hidden = true;
  $('logo-remove').hidden = true;
  schedulePreview(false);
});

/* ---------- Çizim ---------- */
function readSettings() {
  return {
    text: $('opt-text').value.trim(),
    size: Number($('opt-size').value) / 100,
    color: $('opt-color').value,
    opacity: Number($('opt-opacity').value) / 100,
    angle: (Number($('opt-angle').value) * Math.PI) / 180,
    bold: $('opt-bold').checked,
    shadow: $('opt-shadow').checked,
    tile: $('opt-tile').checked,
    gap: Number($('opt-gap').value) / 100,
    logoSize: Number($('opt-logo-size').value) / 100,
  };
}

/** Oran konumunu (ızgara ya da serbest) merkez noktasına çevirir; bw/bh öğenin kutu ölçüsü. */
function place(pos, W, H, bw, bh) {
  if (pos.cx !== undefined) return { x: pos.cx * W, y: pos.cy * H };
  const m = W * 0.03;
  const free = (full, b) => (full - 2 * m - b);
  const x = free(W, bw) >= 0 ? m + bw / 2 + pos.fx * free(W, bw) : W / 2;
  const y = free(H, bh) >= 0 ? m + bh / 2 + pos.fy * free(H, bh) : H / 2;
  return { x, y };
}

/** Öğeyi (yazı ya da logo) döşer: merkez etrafında dönmüş ızgara, her satır yarım adım kaydırılır. */
function drawTiled(ctx, W, H, bw, bh, gap, angle, drawOne) {
  const R = Math.hypot(W, H) / 2;
  let stepX = bw + bh * gap, stepY = bh + bh * gap;
  // Aşırı küçük adımlarda tarayıcıyı kilitlememek için döşeme sayısını sınırla.
  while (((2 * R) / stepX) * ((2 * R) / stepY) > 3000) { stepX *= 1.25; stepY *= 1.25; }
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(angle);
  let row = 0;
  for (let y = -R; y <= R; y += stepY, row++) {
    const off = row % 2 ? stepX / 2 : 0;
    for (let x = -R - stepX + off; x <= R; x += stepX) {
      ctx.save(); ctx.translate(x, y); drawOne(); ctx.restore();
    }
  }
  ctx.restore();
}

/** Resmi + yazıyı + logoyu verilen tuvale çizer. W/H çıktı ölçüsüdür; tüm boyutlar W'ye oranlıdır. */
function render(ctx, W, H, bmp, s, fmt) {
  ctx.clearRect(0, 0, W, H);
  if (fmt === 'jpg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H); }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, W, H);
  ctx.globalAlpha = s.opacity;

  const hasText = s.text.length > 0;
  let tiledLogo = false;
  if (hasText) {
    const fs = Math.max(4, W * s.size);
    ctx.font = `${s.bold ? '700' : '400'} ${fs}px "IBM Plex Sans", "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = s.color;
    if (s.shadow) { ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = fs * 0.12; ctx.shadowOffsetX = fs * 0.04; ctx.shadowOffsetY = fs * 0.04; }
    const tw = ctx.measureText(s.text).width, th = fs * 1.2;
    const drawText = () => ctx.fillText(s.text, 0, 0);
    if (s.tile) drawTiled(ctx, W, H, tw, th, s.gap, s.angle, drawText);
    else {
      const c = Math.abs(Math.cos(s.angle)), n = Math.abs(Math.sin(s.angle));
      const p = place(textPos, W, H, tw * c + th * n, tw * n + th * c);
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(s.angle); drawText(); ctx.restore();
    }
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
  } else if (logo && s.tile) {
    tiledLogo = true;
  }
  if (logo) {
    const lw = W * s.logoSize, lh = (lw * logo.h) / logo.w;
    const drawLogo = () => ctx.drawImage(logo.bmp, -lw / 2, -lh / 2, lw, lh);
    if (tiledLogo) drawTiled(ctx, W, H, lw, lh, s.gap, s.angle, drawLogo);
    else {
      const p = place(logoPos, W, H, lw, lh);
      ctx.save(); ctx.translate(p.x, p.y); drawLogo(); ctx.restore();
    }
  }
  ctx.globalAlpha = 1;
}

/* ---------- Önizleme ---------- */
let previewTimer = null;
function schedulePreview(reload) {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => renderPreview(reload), 80);
}
async function renderPreview(reload) {
  const first = items[0];
  if (!first) return;
  try {
    if (reload || previewId !== first.id || !previewBmp) {
      previewBmp = await loadBitmap(first.file, first.w > PREVIEW_W ? { resizeWidth: PREVIEW_W, resizeQuality: 'high' } : {});
      previewId = first.id;
    }
    const pw = Math.min(first.w, PREVIEW_W);
    const ph = Math.max(1, Math.round((pw * first.h) / first.w));
    const canvas = $('preview-canvas');
    canvas.width = pw; canvas.height = ph;
    render(canvas.getContext('2d'), pw, ph, previewBmp, readSettings(), 'png');
    $('preview-info').textContent = `Önizleme: ${first.file.name} · çıktı ${first.w}×${first.h}${items.length > 1 ? ` · aynı ayar ${items.length} resme uygulanacak` : ''}`;
  } catch { /* önizleme başarısızsa sessiz geç; asıl işlemde hata verilir */ }
}

// Önizlemede sürükle: hedef yazıdır; yazı boşsa logo.
const canvasEl = $('preview-canvas');
let dragging = false;
function moveTo(clientX, clientY) {
  const r = canvasEl.getBoundingClientRect();
  const cx = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  const cy = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
  setFree(cx, cy);
}
function setFree(cx, cy) {
  if ($('opt-text').value.trim() || !logo) { textPos = { cx, cy }; markGrid(null); }
  else logoPos = { cx, cy };
  schedulePreview(false);
}
canvasEl.addEventListener('pointerdown', (e) => { dragging = true; canvasEl.setPointerCapture(e.pointerId); moveTo(e.clientX, e.clientY); e.preventDefault(); });
canvasEl.addEventListener('pointermove', (e) => { if (dragging) moveTo(e.clientX, e.clientY); });
['pointerup', 'pointercancel'].forEach((t) => canvasEl.addEventListener(t, () => { dragging = false; }));
canvasEl.addEventListener('keydown', (e) => {
  const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
  if (!d) return;
  e.preventDefault();
  const cur = $('opt-text').value.trim() || !logo ? textPos : logoPos;
  const base = cur.cx !== undefined ? cur : { cx: cur.fx, cy: cur.fy };
  setFree(Math.min(1, Math.max(0, base.cx + d[0] * 0.01)), Math.min(1, Math.max(0, base.cy + d[1] * 0.01)));
});

/* ---------- Uygula ---------- */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality));
}

async function processOne(it, s, fmt, quality) {
  if (it.w > MAX_SIDE || it.h > MAX_SIDE || it.w * it.h > MAX_PIXELS) throw new Error('memory: too large');
  const bmp = await loadBitmap(it.file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = it.w; canvas.height = it.h;
    render(canvas.getContext('2d'), it.w, it.h, bmp, s, fmt);
    const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : quality);
    if (blob.type !== MIME[fmt]) throw new Error(`format ${fmt} unsupported`);
    return blob;
  } finally {
    bmp.close && bmp.close();
  }
}

$('apply').addEventListener('click', async () => {
  if (!items.length) return;
  const s = readSettings();
  if (!s.text && !logo) {
    showError($('error'), 'Eklenecek bir şey yok. Yazı alanını doldurun ya da bir logo seçin.');
    return;
  }
  const btn = $('apply');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const fmt = $('opt-format').value;
  const quality = Number($('opt-quality').value) || 0.92;
  const failed = [];
  let done = 0, totalOut = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const blob = await processOne(it, s, fmt, quality);
        it.outBlob = blob;
        it.outName = `${baseName(it.file.name)}-yazili.${fmt}`;
        totalOut += blob.size; done++;
      } catch (err) {
        console.error(err);
        it.outBlob = null;
        failed.push({ name: it.file.name, big: /memory/.test(String(err.message)) });
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} resim hazır · toplam ${formatBytes(totalOut)}`;
      $('download-one').hidden = done > 1;
      $('download-zip').hidden = done < 2;
      $('download-one').textContent = 'Resmi indir';
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      const big = failed.some((f) => f.big);
      const webp = fmt === 'webp' ? ' Tarayıcınız WebP yazmayı desteklemiyor olabilir; PNG veya JPG seçin.' : '';
      showError($('error'), `${failed.length} resim işlenemedi (${failed.slice(0, 3).map((f) => f.name).join(', ')}${failed.length > 3 ? '…' : ''}).${big ? ' Resim tarayıcı sınırlarını aşıyor; önce "Resim Küçült" ile boyutunu düşürün.' : ' Dosyanın bozuk olmadığını kontrol edip yeniden deneyin.'}${webp}`);
    }
  } finally {
    btn.disabled = false;
  }
});

$('download-one').addEventListener('click', () => {
  const it = items.find((x) => x.outBlob);
  if (it) downloadBlob(it.outBlob, it.outName);
});

$('download-zip').addEventListener('click', async () => {
  const ready = items.filter((it) => it.outBlob);
  if (!ready.length) return;
  const btn = $('download-zip');
  btn.disabled = true;
  try {
    const { zipSync } = await getFflate();
    const entries = {};
    const used = new Set();
    for (let i = 0; i < ready.length; i++) {
      setProgress($('progress'), (i / ready.length) * 100, `ZIP hazırlanıyor: ${ready[i].outName}`);
      await tick();
      let name = ready[i].outName, n = 2;
      while (used.has(name)) name = ready[i].outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      entries[name] = [new Uint8Array(await ready[i].outBlob.arrayBuffer()), { level: 0 }];
    }
    const zipped = zipSync(entries);
    setProgress($('progress'), null);
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'yazili-resimler.zip');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'ZIP oluşturulamadı; resimleri daha az sayıda seçip yeniden deneyin.');
  } finally {
    btn.disabled = false;
  }
});

markGrid(textPos.fx, textPos.fy);
