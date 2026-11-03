// SVG'yi PNG'ye Çevir — saf Canvas. SVG önce DOMParser ile ayrıştırılıp temizlenir (script, olay işleyici,
// dış kaynak), ölçüsü hesaplanır ve ancak ondan sonra blob URL ile Image'a verilir; böylece dosya
// doğrudan sayfaya gömülmez, dış istek çıkmaz. Toplu indirme için fflate (MIT). Dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;          // Chrome/Firefox tuval sınırı
const MAX_AREA = 268_000_000;    // ~16384² piksel
const DEFAULT_SIZE = 512;        // ölçüsüz SVG için
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
// Birim → piksel (CSS 96 dpi)
const UNIT = { px: 1, pt: 96 / 72, pc: 16, mm: 96 / 25.4, cm: 96 / 2.54, in: 96, em: 16, rem: 16, '': 1 };

let items = []; // { id, file, svg, w, h, warnings[], outBlob, outName, outW, outH }
let seq = 0;
let fflate = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

function canEncode(mime) {
  try { const c = document.createElement('canvas'); c.width = c.height = 2; return c.toDataURL(mime).startsWith(`data:${mime}`); } catch { return false; }
}
const WEBP_OK = canEncode('image/webp');
if (!WEBP_OK) {
  const opt = $('opt-format').querySelector('option[value="webp"]');
  opt.disabled = true;
  opt.textContent = 'WebP (bu tarayıcı WebP yazamıyor)';
}

/* ---------- SVG ayrıştırma ve temizleme ---------- */
function parseLength(v) {
  if (v == null) return null;
  const m = String(v).trim().match(/^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\s*(px|pt|pc|mm|cm|in|em|rem|%)?$/i);
  if (!m) return null;
  if (m[2] === '%') return null; // yüzde: taşıyıcıya bağlı, anlamsız
  const n = parseFloat(m[1]) * (UNIT[(m[2] || '').toLowerCase()] ?? 1);
  return n > 0 ? n : null;
}

function isExternalRef(v) {
  if (!v) return false;
  const s = v.trim();
  if (s.startsWith('#') || s.startsWith('data:')) return false;
  return /^(https?:)?\/\//i.test(s) || /^[a-z][a-z0-9+.-]*:/i.test(s) || /^[./\w-]+\.(png|jpe?g|gif|webp|svg|woff2?|ttf|otf)$/i.test(s);
}

/**
 * SVG metnini ayrıştırır, güvenli hâle getirir ve ölçüsünü hesaplar.
 * Döner: { svg (temiz metin), w, h, warnings[] }
 */
function prepareSvg(text) {
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) {
    throw new Error('SVG parse');
  }
  const warnings = [];

  // 1) Script ve olay işleyicileri at (Image içinde zaten çalışmaz; yine de kaynağa girmesin).
  doc.querySelectorAll('script').forEach((n) => n.remove());
  // foreignObject tuvali kirletebilir (toBlob başarısız olur) → çıkar ve uyar.
  const fo = doc.getElementsByTagNameNS(SVG_NS, 'foreignObject');
  if (fo.length) { warnings.push('SVG içinde HTML (foreignObject) var; tarayıcı bunu PNG\'ye çizemediği için çıkarıldı.'); Array.from(fo).forEach((n) => n.remove()); }

  // 2) Dış kaynaklar: <image>, <use>, <font-face-uri>, <style> @import / url(http…)
  let external = 0, fonts = 0;
  for (const el of Array.from(doc.querySelectorAll('*'))) {
    for (const attr of Array.from(el.attributes)) {
      if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
    }
    const href = el.getAttribute('href') ?? el.getAttributeNS(XLINK_NS, 'href');
    const tag = el.localName.toLowerCase();
    if (href && isExternalRef(href) && (tag === 'image' || tag === 'use' || tag === 'font-face-uri' || tag === 'a')) {
      if (tag === 'a') { el.removeAttribute('href'); el.removeAttributeNS(XLINK_NS, 'href'); continue; }
      external++;
      el.remove();
    }
    const style = el.getAttribute('style');
    if (style && /url\(\s*['"]?\s*(https?:)?\/\//i.test(style)) { external++; el.setAttribute('style', style.replace(/url\([^)]*\)/gi, 'none')); }
  }
  for (const st of Array.from(doc.querySelectorAll('style'))) {
    let css = st.textContent || '';
    if (/@import|url\(\s*['"]?\s*(https?:)?\/\//i.test(css)) {
      external++;
      css = css.replace(/@import[^;]*;/gi, '').replace(/url\(\s*['"]?\s*(?:https?:)?\/\/[^)]*\)/gi, 'none');
      st.textContent = css;
    }
    if (/@font-face/i.test(css)) fonts++;
  }
  if (external) warnings.push(`${external} dış kaynak (internetten resim, font ya da stil) bulundu ve çıkarıldı: tarayıcı güvenlik gereği SVG görselinin içinden dış dosya yüklemez, bu yüzden o parçalar boş kalır. Kaynağı SVG'ye gömülü (data:) olarak ekleyip tekrar deneyin.`);
  if (doc.getElementsByTagNameNS(SVG_NS, 'text').length && !fonts) {
    warnings.push('SVG metin içeriyor; yazı tipi bilgisayarınızda kurulu değilse yedek fontla çizilir. Tasarım programında metni "yola/eğriye çevir" ile dışa aktarırsanız her yerde aynı görünür.');
  }

  // 3) Ölçü: width/height → viewBox → varsayılan
  let w = parseLength(root.getAttribute('width'));
  let h = parseLength(root.getAttribute('height'));
  const vb = (root.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
  const hasVb = vb.length === 4 && vb.every((n) => Number.isFinite(n)) && vb[2] > 0 && vb[3] > 0;
  if (!w && !h && hasVb) { w = vb[2]; h = vb[3]; }
  else if (w && !h) h = hasVb ? w * vb[3] / vb[2] : w;
  else if (!w && h) w = hasVb ? h * vb[2] / vb[3] : h;
  if (!w || !h) {
    w = h = DEFAULT_SIZE;
    warnings.push('SVG\'de genişlik/yükseklik ya da viewBox yok; 512×512 piksel varsayıldı. Çizim kırpık görünürse tasarım programında belgeyi çizime sığdırıp yeniden kaydedin.');
  }
  if (!hasVb) root.setAttribute('viewBox', `0 0 ${w} ${h}`);
  root.setAttribute('width', String(w));
  root.setAttribute('height', String(h));
  if (!root.getAttribute('xmlns')) root.setAttribute('xmlns', SVG_NS);
  const svg = new XMLSerializer().serializeToString(root);
  return { svg, w, h, warnings };
}

/* ---------- Dosya ekleme ---------- */
createDropzone({ el: $('drop'), accept: 'image/svg+xml,.svg,.svgz', multiple: true, onFiles: addFiles });

async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const svgs = files.filter((f) => /^image\/svg/i.test(f.type) || /\.svg$/i.test(f.name));
  const msgs = [];
  if (svgs.length !== files.length) {
    const other = files.filter((f) => !svgs.includes(f));
    msgs.push(`${other.length} dosya SVG değil ve atlandı (${other.slice(0, 2).map((f) => f.name).join(', ')}). Bu araç yalnızca .svg dosyalarını çevirir; PNG/JPG'yi başka biçime çevirmek için "Resim Formatı Dönüştür", PDF için "PDF'den Resme" aracını kullanın.`);
  }
  if (svgs.some((f) => f.size > BIG_FILE)) msgs.push('50 MB üzeri bir SVG seçtiniz; işlem yavaş olabilir ya da bellek yetmeyebilir.');
  const broken = [];
  for (const file of svgs) {
    try {
      const text = await file.text();
      const info = prepareSvg(text);
      const id = String(++seq);
      items.push({ id, file, ...info, outBlob: null, outName: null });
      const li = document.createElement('li');
      li.dataset.id = id;
      const url = URL.createObjectURL(new Blob([info.svg], { type: 'image/svg+xml' }));
      li.innerHTML = `<img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
        <button class="ba-icon-btn" type="button" data-act="download" aria-label="Bu dosyayı indir" hidden>⤓</button>
        <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
      li.querySelector('.name').textContent = file.name;
      li.querySelector('.meta').textContent = `${Math.round(info.w)}×${Math.round(info.h)} · ${formatBytes(file.size)}`;
      if (info.warnings.length) {
        const warn = document.createElement('div');
        warn.className = 'sp-warn';
        warn.setAttribute('role', 'status');
        warn.textContent = info.warnings.join(' ');
        li.appendChild(warn);
      }
      list.appendChild(li);
    } catch (err) {
      console.error(err);
      broken.push(file.name);
    }
  }
  if (broken.length) msgs.push(`${broken.join(', ')}: SVG okunamadı. Dosya bozuk, boş ya da aslında SVG değil (ör. .svg uzantılı bir PDF/PNG). Dosyayı bir metin düzenleyicide açın; "<svg" ile başlayan XML görmelisiniz.`);
  if (msgs.length) showError($('error'), msgs.join(' '));
  refresh();
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  const it = items.find((x) => x.id === li.dataset.id);
  if (!it) return;
  if (btn.dataset.act === 'remove') {
    items = items.filter((x) => x !== it);
    li.remove();
    refresh();
  } else if (btn.dataset.act === 'download' && it.outBlob) {
    downloadBlob(it.outBlob, it.outName);
  }
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
  updateOptionVisibility();
  updateSizeHint();
}

$('clear').addEventListener('click', () => {
  items = []; list.innerHTML = '';
  showError($('error'), null);
  refresh();
});

/* ---------- Seçenekler ---------- */
$('opt-format').addEventListener('change', () => { updateOptionVisibility(); });
$('opt-mode').addEventListener('change', () => { updateOptionVisibility(); updateSizeHint(); });
$('opt-scale').addEventListener('change', updateSizeHint);
$('opt-width').addEventListener('input', updateSizeHint);
$('opt-transparent').addEventListener('change', updateOptionVisibility);
$('opt-bg').addEventListener('input', () => { $('opt-bg-code').textContent = $('opt-bg').value; });
$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `%${Math.round($('opt-quality').value * 100)}`; });

function updateOptionVisibility() {
  const f = $('opt-format').value;
  const transparentAllowed = f !== 'jpg';
  $('field-transparent').hidden = !transparentAllowed;
  $('field-bg').hidden = transparentAllowed && $('opt-transparent').checked;
  $('field-quality').hidden = f === 'png';
  $('field-scale').hidden = $('opt-mode').value !== 'scale';
  $('field-width').hidden = $('opt-mode').value !== 'width';
}

function targetSize(it) {
  if ($('opt-mode').value === 'width') {
    const W = Math.max(1, Math.round(Number($('opt-width').value) || 0));
    return { W, H: Math.max(1, Math.round(W * it.h / it.w)) };
  }
  const s = Number($('opt-scale').value) || 1;
  return { W: Math.max(1, Math.round(it.w * s)), H: Math.max(1, Math.round(it.h * s)) };
}

function updateSizeHint() {
  const first = items[0];
  if (!first) return;
  const { W, H } = targetSize(first);
  $('size-hint').textContent = `${first.file.name} → ${W}×${H} px${items.length > 1 ? ' (diğerleri aynı kurala göre)' : ''}`;
}
updateOptionVisibility();

/* ---------- Çizim ---------- */
function loadSvgImage(svgText) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG render')); };
    img.src = url;
  });
}

function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

async function convertOne(it, opts) {
  const { W, H } = targetSize(it);
  if (W > MAX_SIDE || H > MAX_SIDE || W * H > MAX_AREA) {
    throw new Error(`Hedef boyut ${W}×${H} tarayıcı sınırını aşıyor (en fazla ${MAX_SIDE} px kenar). Daha küçük ölçek ya da genişlik seçin.`);
  }
  const img = await loadSvgImage(it.svg);
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!opts.transparent) { ctx.fillStyle = opts.bg; ctx.fillRect(0, 0, W, H); }
  ctx.imageSmoothingQuality = 'high';
  // Tarayıcı SVG'yi hedef boyutta vektörden rasterize eder; büyütmede bulanıklık olmaz.
  ctx.drawImage(img, 0, 0, W, H);
  const blob = await toBlob(canvas, MIME[opts.format], opts.format === 'png' ? undefined : opts.quality);
  if (blob.type !== MIME[opts.format]) throw new Error(`format ${opts.format} unsupported`);
  canvas.width = canvas.height = 1;
  return { blob, W, H };
}

$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const format = $('opt-format').value;
  const opts = {
    format,
    quality: Number($('opt-quality').value) || 0.92,
    transparent: format !== 'jpg' && $('opt-transparent').checked,
    bg: $('opt-bg').value || '#ffffff',
  };
  if (format === 'webp' && !WEBP_OK) {
    showError($('error'), 'Tarayıcınız WebP yazmayı desteklemiyor. Chrome, Edge, Firefox ya da Safari 16+ ile deneyin ya da PNG seçin.');
    btn.disabled = false;
    return;
  }
  if ($('opt-mode').value === 'width' && !(Number($('opt-width').value) > 0)) {
    showError($('error'), 'Genişlik için 1 ile 16384 arasında bir piksel değeri girin ya da "Ölçek" seçeneğine geçin.');
    btn.disabled = false;
    return;
  }
  const failed = [];
  let done = 0, totalOut = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const { blob, W, H } = await convertOne(it, opts);
        it.outBlob = blob;
        it.outName = `${baseName(it.file.name)}${$('opt-mode').value === 'scale' && Number($('opt-scale').value) !== 1 ? `@${$('opt-scale').value}x` : ''}.${format}`;
        it.outW = W; it.outH = H;
        done++; totalOut += blob.size;
        if (li) {
          li.querySelector('.meta').textContent = `${Math.round(it.w)}×${Math.round(it.h)} → ${W}×${H} · ${format.toUpperCase()} ${formatBytes(blob.size)}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push(`${it.file.name}: ${/tarayıcı sınırını/.test(err.message) ? err.message : 'çizilemedi'}`);
        if (li) li.querySelector('.meta').textContent = 'çevrilemedi';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} dosya · ${format.toUpperCase()} · toplam ${formatBytes(totalOut)}`;
      $('download-zip').hidden = done < 2;
      $('download-all').hidden = done < 2;
      $('download-one').hidden = done !== 1;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      showError($('error'), `${failed.length} dosya çevrilemedi. ${failed.slice(0, 3).join(' · ')}. SVG'nin bir tarayıcıda açılabildiğini kontrol edin; hâlâ olmuyorsa tasarım programından "düz SVG" (plain SVG) olarak yeniden kaydedin.`);
    }
  } finally {
    btn.disabled = false;
  }
});

/* ---------- İndirme ---------- */
$('download-one').addEventListener('click', () => {
  const it = items.find((x) => x.outBlob);
  if (it) downloadBlob(it.outBlob, it.outName);
});

$('download-all').addEventListener('click', async () => {
  for (const it of items) {
    if (!it.outBlob) continue;
    downloadBlob(it.outBlob, it.outName);
    await new Promise((r) => setTimeout(r, 300));
  }
});

$('download-zip').addEventListener('click', async () => {
  const ready = items.filter((it) => it.outBlob);
  if (!ready.length) return;
  const btn = $('download-zip');
  btn.disabled = true;
  try {
    const ff = await getFflate();
    const entries = {};
    const used = new Set();
    for (let i = 0; i < ready.length; i++) {
      const it = ready[i];
      let name = it.outName, n = 2;
      while (used.has(name)) name = it.outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      setProgress($('progress'), (i / ready.length) * 100, `Arşive ekleniyor: ${name}`);
      await tick();
      entries[name] = [new Uint8Array(await it.outBlob.arrayBuffer()), { level: 0, mtime: new Date() }];
    }
    const zipped = ff.zipSync(entries);
    setProgress($('progress'), null);
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), `svg-${$('opt-format').value}.zip`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Zip oluşturulamadı; tarayıcı belleği yetmemiş olabilir. "Tek tek indir" düğmesini kullanın ya da daha az dosyayla deneyin.');
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Ters yön: raster → SVG'ye gömme (vektörleştirme DEĞİL) ---------- */
createDropzone({ el: $('raster-drop'), accept: 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp', multiple: false, onFiles: ([file]) => embedRaster(file) });

function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('read'));
    r.readAsDataURL(file);
  });
}

async function embedRaster(file) {
  showError($('raster-error'), null);
  $('raster-result').classList.remove('is-active');
  if (!/^image\/(png|jpe?g|webp)$/i.test(file.type) && !/\.(png|jpe?g|webp)$/i.test(file.name)) {
    showError($('raster-error'), `"${file.name}" PNG, JPG ya da WebP değil. Bu bölüm yalnızca raster resmi SVG kabına sarar.`);
    return;
  }
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image(); const u = URL.createObjectURL(file);
      i.onload = () => { URL.revokeObjectURL(u); resolve(i); };
      i.onerror = () => { URL.revokeObjectURL(u); reject(new Error('decode')); };
      i.src = u;
    });
    const dataUrl = await readDataUrl(file);
    const W = img.naturalWidth, H = img.naturalHeight;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n  <!-- Bu SVG vektör değildir: içinde orijinal ${W}×${H} piksellik resim gömülüdür. -->\n  <image width="${W}" height="${H}" href="${dataUrl}"/>\n</svg>\n`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    $('raster-info').textContent = `${file.name} · ${W}×${H} px · SVG ${formatBytes(blob.size)} (resim base64 ile gömüldü, boyut ~%33 arttı)`;
    $('raster-result').classList.add('is-active');
    $('raster-download').onclick = () => downloadBlob(blob, `${baseName(file.name)}.svg`);
  } catch (err) {
    console.error(err);
    showError($('raster-error'), 'Resim açılamadı; dosya bozuk olabilir ya da uzantısı içeriğiyle uyuşmuyor.');
  }
}
