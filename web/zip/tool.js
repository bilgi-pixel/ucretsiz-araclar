// Zip Oluştur / Zip Aç — tamamı tarayıcıda, fflate (MIT) ile. Dosya hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024; // 50 MB üzeri için uyarı
const CHUNK = 1024 * 1024; // dosya okuma parçası

let fflate = null;
async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/* ---------- Sekmeler ---------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function activateTab(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $(t.getAttribute('aria-controls')).hidden = !on;
  }
  if (location.hash !== `#${tab.dataset.tab}`) history.replaceState(null, '', `#${tab.dataset.tab}`);
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => activateTab(t));
  t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); activateTab(next);
    }
  });
});
if (location.hash === '#ac') activateTab(tabs[1]);

/* =====================================================================
   1) ZIP OLUŞTUR
   ===================================================================== */
let createItems = []; // { file, path }
let createBlob = null;
let createName = 'arsiv.zip';

createDropzone({ el: $('drop-create'), multiple: true, onFiles: addCreateFiles });
$('dir-btn').addEventListener('click', (e) => { e.stopPropagation(); $('dir-input').click(); });
$('dir-btn').addEventListener('keydown', (e) => e.stopPropagation()); // dropzone'un Enter/Space işleyicisine düşmesin
$('dir-input').addEventListener('change', () => { addCreateFiles(Array.from($('dir-input').files)); $('dir-input').value = ''; });

function addCreateFiles(files) {
  showError($('error-create'), null);
  $('result-create').classList.remove('is-active');
  const existing = new Set(createItems.map((it) => it.path));
  for (const file of files) {
    let path = (file.webkitRelativePath || file.name).replace(/\\/g, '/').replace(/^\/+/, '');
    if (!path || path.endsWith('/')) continue;
    // Aynı yol varsa "(2)" ekle
    let n = 2; const base = path;
    while (existing.has(path)) path = base.replace(/(\.[^./]+)?$/, ` (${n++})$1`);
    existing.add(path);
    createItems.push({ file, path });
  }
  if (createItems.length && !$('opt-name').value) {
    const first = createItems[0];
    createName = first.file.webkitRelativePath ? first.file.webkitRelativePath.split('/')[0] : baseName(first.file.name);
    $('opt-name').placeholder = createName;
  }
  renderCreateList();
}

function renderCreateList() {
  const list = $('files-create');
  list.innerHTML = '';
  const MAX = 300;
  createItems.slice(0, MAX).forEach((it, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-i="" aria-label="Kaldır">✕</button>';
    li.querySelector('.name').textContent = it.path;
    li.querySelector('.meta').textContent = formatBytes(it.file.size);
    li.querySelector('button').dataset.i = String(i);
    list.appendChild(li);
  });
  if (createItems.length > MAX) {
    const li = document.createElement('li');
    li.textContent = `… ve ${createItems.length - MAX} dosya daha`;
    list.appendChild(li);
  }
  const total = createItems.reduce((s, it) => s + it.file.size, 0);
  const has = createItems.length > 0;
  $('summary-create').hidden = !has;
  $('summary-create').textContent = has ? `${createItems.length} dosya · toplam ${formatBytes(total)}` : '';
  $('options-create').hidden = !has;
  $('actions-create').hidden = !has;
  $('warn-create').hidden = total < BIG_FILE;
}

$('files-create').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-i]');
  if (!btn) return;
  createItems.splice(Number(btn.dataset.i), 1);
  renderCreateList();
});

$('clear-create').addEventListener('click', () => {
  createItems = []; createBlob = null;
  $('opt-name').value = ''; $('opt-name').placeholder = 'arsiv';
  $('result-create').classList.remove('is-active');
  showError($('error-create'), null);
  renderCreateList();
});

function safeArchiveName(raw) {
  let s = String(raw || '').trim().replace(/\.zip$/i, '').replace(/[\\/:*?"<>|]+/g, '-').trim();
  return (s || 'arsiv') + '.zip';
}

$('create').addEventListener('click', async () => {
  if (!createItems.length) return;
  const btn = $('create');
  btn.disabled = true;
  showError($('error-create'), null);
  $('result-create').classList.remove('is-active');
  const level = Number($('opt-level').value);
  try {
    const ff = await getFflate();
    const total = createItems.reduce((s, it) => s + it.file.size, 0) || 1;
    let done = 0;
    const chunks = [];
    const zipDone = new Promise((resolve, reject) => {
      const z = new ff.Zip((err, dat, final) => {
        if (err) { reject(err); return; }
        chunks.push(dat);
        if (final) resolve();
      });
      (async () => {
        try {
          for (let i = 0; i < createItems.length; i++) {
            const { file, path } = createItems[i];
            setProgress($('progress-create'), (done / total) * 100, `${i + 1}/${createItems.length}: ${path}`);
            await tick();
            // Seviye 0: sıkıştırmadan ekle (ana iş parçacığı). Diğerleri: Web Worker'da deflate.
            const entry = level === 0
              ? new ff.ZipPassThrough(path)
              : new ff.AsyncZipDeflate(path, { level, mtime: file.lastModified });
            if (level === 0) entry.mtime = file.lastModified;
            z.add(entry);
            if (file.size === 0) { entry.push(new Uint8Array(0), true); continue; }
            for (let off = 0; off < file.size; off += CHUNK) {
              const end = Math.min(off + CHUNK, file.size);
              const buf = new Uint8Array(await file.slice(off, end).arrayBuffer());
              entry.push(buf, end >= file.size);
              done += buf.length;
              setProgress($('progress-create'), (done / total) * 100, `${i + 1}/${createItems.length}: ${path}`);
              await tick();
            }
          }
          z.end();
        } catch (e) { reject(e); }
      })();
    });
    await zipDone;
    createBlob = new Blob(chunks, { type: 'application/zip' });
    createName = safeArchiveName($('opt-name').value || $('opt-name').placeholder);
    const ratio = total > 1 ? Math.round((1 - createBlob.size / total) * 100) : 0;
    $('result-info-create').textContent = `${createItems.length} dosya · ${formatBytes(createBlob.size)} (${ratio > 0 ? `%${ratio} küçüldü` : 'sıkıştırılamadı'}) · ${createName}`;
    $('result-create').classList.add('is-active');
    setProgress($('progress-create'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress-create'), null);
    showError($('error-create'), zipError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download-create').addEventListener('click', () => { if (createBlob) downloadBlob(createBlob, createName); });

/* =====================================================================
   2) ZIP AÇ
   ===================================================================== */
// OEM kod sayfaları: 0x80–0xFF aralığı. UTF-8 bayrağı olmayan eski arşivler için.
const CP437 = 'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ';
const CP857 = 'ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ ';

function decodeOem(bytes, table) {
  const t = Array.from(table);
  let s = '';
  for (const b of bytes) s += b < 0x80 ? String.fromCharCode(b) : t[b - 0x80];
  return s;
}
function isUtf8(bytes) {
  try { new TextDecoder('utf-8', { fatal: true }).decode(bytes); return true; } catch { return false; }
}
/** Girdi adını seçilen kodlamaya göre çözer. utf8Flag: ZIP genel bayrağı bit 11. */
function decodeName(bytes, utf8Flag, mode) {
  if (mode === 'utf8' || utf8Flag) return new TextDecoder('utf-8').decode(bytes);
  if (mode === 'cp437') return decodeOem(bytes, CP437);
  if (mode === 'cp857') return decodeOem(bytes, CP857);
  if (mode === 'cp1254') return new TextDecoder('windows-1254').decode(bytes);
  // auto: bayrak yoksa önce geçerli UTF-8 mi bak, değilse Türkçe OEM (CP857)
  return isUtf8(bytes) ? new TextDecoder('utf-8').decode(bytes) : decodeOem(bytes, CP857);
}

function dosDate(time, date) {
  const y = (date >> 9) + 1980, mo = ((date >> 5) & 15) - 1, d = date & 31;
  const h = time >> 11, mi = (time >> 5) & 63, s = (time & 31) * 2;
  const dt = new Date(y, mo, d, h, mi, s);
  return isNaN(dt) ? '' : dt.toLocaleDateString('tr-TR');
}

/** Merkezi dizini okur. Şifreli/zip64/desteklenmeyen yöntemleri işaretler. */
function parseCentralDirectory(u8) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const len = u8.length;
  if (len < 22) throw new Error('not a zip');
  let eocd = -1;
  for (let i = len - 22; i >= Math.max(0, len - 65557); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip');
  let count = dv.getUint16(eocd + 10, true);
  let cdOff = dv.getUint32(eocd + 16, true);
  if (count === 0xffff || cdOff === 0xffffffff) {
    // ZIP64
    const loc = eocd - 20;
    if (loc >= 0 && dv.getUint32(loc, true) === 0x07064b50) {
      const e64 = Number(dv.getBigUint64(loc + 8, true));
      if (dv.getUint32(e64, true) !== 0x06064b50) throw new Error('not a zip');
      count = Number(dv.getBigUint64(e64 + 32, true));
      cdOff = Number(dv.getBigUint64(e64 + 48, true));
    }
  }
  const entries = [];
  let p = cdOff;
  for (let i = 0; i < count; i++) {
    if (p + 46 > len || dv.getUint32(p, true) !== 0x02014b50) throw new Error('not a zip');
    const flags = dv.getUint16(p + 8, true);
    const method = dv.getUint16(p + 10, true);
    const time = dv.getUint16(p + 12, true);
    const date = dv.getUint16(p + 14, true);
    let csize = dv.getUint32(p + 20, true);
    let usize = dv.getUint32(p + 24, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    let offset = dv.getUint32(p + 42, true);
    const nameBytes = u8.subarray(p + 46, p + 46 + nameLen);
    // ZIP64 ek alanı
    let q = p + 46 + nameLen; const qEnd = q + extraLen;
    while (q + 4 <= qEnd) {
      const id = dv.getUint16(q, true), sz = dv.getUint16(q + 2, true);
      if (id === 0x0001) {
        let r = q + 4;
        if (usize === 0xffffffff) { usize = Number(dv.getBigUint64(r, true)); r += 8; }
        if (csize === 0xffffffff) { csize = Number(dv.getBigUint64(r, true)); r += 8; }
        if (offset === 0xffffffff) { offset = Number(dv.getBigUint64(r, true)); r += 8; }
      }
      q += 4 + sz;
    }
    entries.push({ nameBytes, utf8: !!(flags & 0x800), encrypted: !!(flags & 1) || method === 99, method, csize, usize, offset, date: dosDate(time, date) });
    p = p + 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

let zipBytes = null;
let zipEntries = []; // parseCentralDirectory çıktısı + name
let zipFileName = '';
const extracted = new Map(); // index → Blob

createDropzone({ el: $('drop-extract'), accept: '.zip,application/zip,application/x-zip-compressed', multiple: false, onFiles: ([f]) => openZip(f) });

async function openZip(file) {
  showError($('error-extract'), null);
  resetExtract();
  zipFileName = file.name;
  $('warn-extract').hidden = file.size < BIG_FILE;
  try {
    if (/\.(rar|7z|tar|gz|tgz|bz2|xz)$/i.test(file.name)) {
      throw new Error('unsupported-format');
    }
    zipBytes = new Uint8Array(await file.arrayBuffer());
    zipEntries = parseCentralDirectory(zipBytes);
    if (zipEntries.some((e) => e.encrypted)) throw new Error('encrypted');
    const usesOem = zipEntries.some((e) => !e.utf8 && e.nameBytes.some((b) => b >= 0x80));
    $('enc-field').hidden = !usesOem;
    applyNames();
    renderExtractList();
  } catch (err) {
    console.error(err);
    zipBytes = null; zipEntries = [];
    showError($('error-extract'), zipError(err));
  }
}

function resetExtract() {
  zipBytes = null; zipEntries = []; extracted.clear();
  $('entries').innerHTML = '';
  $('summary-extract').hidden = true;
  $('actions-extract').hidden = true;
  $('enc-field').hidden = true;
  $('result-extract').classList.remove('is-active');
  setProgress($('progress-extract'), null);
}

function applyNames() {
  const mode = $('opt-encoding').value;
  for (const e of zipEntries) {
    e.name = decodeName(e.nameBytes, e.utf8, mode).replace(/\\/g, '/');
    e.isDir = e.name.endsWith('/') || (e.usize === 0 && e.csize === 0 && e.name.endsWith('/'));
  }
}
$('opt-encoding').addEventListener('change', () => { applyNames(); renderExtractList(); });

function renderExtractList() {
  const list = $('entries');
  list.innerHTML = '';
  const files = zipEntries.map((e, i) => ({ e, i })).filter(({ e }) => !e.isDir);
  const MAX = 500;
  files.slice(0, MAX).forEach(({ e, i }) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-entry="" aria-label="">İndir</button>';
    li.querySelector('.name').textContent = e.name;
    li.querySelector('.meta').textContent = `${formatBytes(e.usize)}${e.date ? ' · ' + e.date : ''}`;
    const b = li.querySelector('button');
    b.dataset.entry = String(i);
    b.setAttribute('aria-label', `${e.name} dosyasını indir`);
    list.appendChild(li);
  });
  if (files.length > MAX) {
    const li = document.createElement('li');
    li.textContent = `… ve ${files.length - MAX} dosya daha (tümünü indirmek için aşağıdaki düğmeyi kullanın)`;
    list.appendChild(li);
  }
  const total = files.reduce((s, { e }) => s + e.usize, 0);
  const packed = files.reduce((s, { e }) => s + e.csize, 0);
  $('summary-extract').hidden = false;
  $('summary-extract').textContent = `${zipFileName} · ${files.length} dosya · açıldığında ${formatBytes(total)} (sıkıştırılmış ${formatBytes(packed)})`;
  $('actions-extract').hidden = files.length === 0;
  $('extract-dir').hidden = !('showDirectoryPicker' in window);
}

/** Tek girdiyi açar; deflate ise Web Worker'da. */
async function extractEntry(i) {
  if (extracted.has(i)) return extracted.get(i);
  const e = zipEntries[i];
  const ff = await getFflate();
  const dv = new DataView(zipBytes.buffer, zipBytes.byteOffset, zipBytes.byteLength);
  if (e.offset + 30 > zipBytes.length || dv.getUint32(e.offset, true) !== 0x04034b50) throw new Error('corrupt zip');
  const nameLen = dv.getUint16(e.offset + 26, true), extraLen = dv.getUint16(e.offset + 28, true);
  const start = e.offset + 30 + nameLen + extraLen;
  if (start + e.csize > zipBytes.length) throw new Error('corrupt zip');
  const data = zipBytes.subarray(start, start + e.csize);
  let out;
  if (e.method === 0) out = data;
  else if (e.method === 8) {
    out = e.csize < 256 * 1024
      ? ff.inflateSync(data, { size: e.usize })
      : await new Promise((res, rej) => ff.inflate(data.slice(), { size: e.usize }, (err, d) => err ? rej(err) : res(d)));
  } else throw new Error(`unsupported method ${e.method}`);
  const blob = new Blob([out], { type: 'application/octet-stream' });
  extracted.set(i, blob);
  return blob;
}

const leaf = (p) => p.split('/').filter(Boolean).pop() || 'dosya';

$('entries').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-entry]');
  if (!btn) return;
  const i = Number(btn.dataset.entry);
  btn.disabled = true;
  showError($('error-extract'), null);
  try {
    setProgress($('progress-extract'), 50, `Açılıyor: ${zipEntries[i].name}`);
    await tick();
    const blob = await extractEntry(i);
    downloadBlob(blob, leaf(zipEntries[i].name));
    setProgress($('progress-extract'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress-extract'), null);
    showError($('error-extract'), zipError(err));
  } finally { btn.disabled = false; }
});

$('extract-all').addEventListener('click', async () => {
  const files = zipEntries.map((e, i) => ({ e, i })).filter(({ e }) => !e.isDir);
  if (!files.length) return;
  const btn = $('extract-all');
  btn.disabled = true;
  showError($('error-extract'), null);
  $('result-extract').classList.remove('is-active');
  try {
    for (let k = 0; k < files.length; k++) {
      const { e, i } = files[k];
      setProgress($('progress-extract'), (k / files.length) * 100, `${k + 1}/${files.length}: ${e.name}`);
      await tick();
      const blob = await extractEntry(i);
      downloadBlob(blob, leaf(e.name));
      // Tarayıcılar art arda indirmeleri aynı anda başlatınca bazılarını yutabilir; kısa aralık bırak.
      await new Promise((r) => setTimeout(r, 350));
    }
    setProgress($('progress-extract'), null);
    $('result-info-extract').textContent = `${files.length} dosya indirildi. Tarayıcı "birden çok dosya indirme" izni istediyse onaylayın; klasör yapısı korunmaz, dosyalar tek tek iner.`;
    $('result-extract').classList.add('is-active');
  } catch (err) {
    console.error(err);
    setProgress($('progress-extract'), null);
    showError($('error-extract'), zipError(err));
  } finally { btn.disabled = false; }
});

/** Chrome/Edge: File System Access API ile klasör yapısını koruyarak çıkar. */
$('extract-dir').addEventListener('click', async () => {
  const files = zipEntries.map((e, i) => ({ e, i })).filter(({ e }) => !e.isDir);
  if (!files.length) return;
  const btn = $('extract-dir');
  btn.disabled = true;
  showError($('error-extract'), null);
  $('result-extract').classList.remove('is-active');
  try {
    const root = await window.showDirectoryPicker({ mode: 'readwrite' });
    for (let k = 0; k < files.length; k++) {
      const { e, i } = files[k];
      setProgress($('progress-extract'), (k / files.length) * 100, `${k + 1}/${files.length}: ${e.name}`);
      await tick();
      const parts = e.name.split('/').filter((p) => p && p !== '..' && p !== '.');
      if (!parts.length) continue;
      let dir = root;
      for (const p of parts.slice(0, -1)) dir = await dir.getDirectoryHandle(p, { create: true });
      const fh = await dir.getFileHandle(parts[parts.length - 1], { create: true });
      const w = await fh.createWritable();
      await w.write(await extractEntry(i));
      await w.close();
    }
    setProgress($('progress-extract'), null);
    $('result-info-extract').textContent = `${files.length} dosya "${root.name}" klasörüne çıkarıldı.`;
    $('result-extract').classList.add('is-active');
  } catch (err) {
    setProgress($('progress-extract'), null);
    if (err && err.name === 'AbortError') return; // kullanıcı vazgeçti
    console.error(err);
    showError($('error-extract'), zipError(err));
  } finally { btn.disabled = false; }
});

$('clear-extract').addEventListener('click', () => { resetExtract(); showError($('error-extract'), null); $('warn-extract').hidden = true; });

/* ---------- Hata metinleri ---------- */
function zipError(err) {
  const m = String(err && err.message || err || '');
  if (/NotReadableError|could not be read|NotFoundError/i.test(m) || (err && /NotReadableError|NotFoundError/.test(err.name || ''))) return 'Dosya okunamadı: seçtikten sonra taşınmış, silinmiş ya da başka bir program tarafından değiştirilmiş olabilir. "Temizle" deyip dosyayı yeniden seçin.';
  if (/encrypted/i.test(m)) return 'Şifreli zip desteklenmiyor. Arşivi oluşturan kişiden şifresiz bir kopya isteyin ya da bilgisayarınızda 7-Zip gibi bir programla şifreyi girerek açın.';
  if (/unsupported-format/i.test(m)) return 'Bu araç yalnızca .zip dosyalarını açar; RAR, 7z ve tar.gz desteklenmez. Bilgisayarınızda 7-Zip (ücretsiz) ile açabilirsiniz.';
  if (/unsupported method/i.test(m)) return 'Bu arşiv, tarayıcıda desteklenmeyen bir sıkıştırma yöntemi (ör. Deflate64, BZip2, LZMA) kullanıyor. 7-Zip veya WinRAR ile açın.';
  if (/not a zip|corrupt|invalid|unexpected EOF/i.test(m)) return 'Dosya bozuk ya da geçerli bir zip değil. Dosyanın tamamen indiğinden emin olun; bir uzantı yanlışlığı varsa (ör. .rar dosyasına .zip adı verilmişse) açılamaz.';
  if (/memory|allocation|Array buffer allocation/i.test(m)) return 'Dosya tarayıcı belleği için fazla büyük. Daha küçük arşivler halinde deneyin ya da bilgisayarınızdaki arşiv programını kullanın.';
  return 'İşlem sırasında beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin.';
}
