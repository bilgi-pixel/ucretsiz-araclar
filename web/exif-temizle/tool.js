// EXIF / Konum Bilgisi Temizleyici — saf JS; kütüphanesiz bayt düzeyinde ayrıştırma.
// JPEG, PNG ve WebP dosyalarındaki üst veri (EXIF, GPS, XMP, IPTC, metin parçaları) kaldırılır.
// Piksel verisine dokunulmaz (yeniden sıkıştırma yok). Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const cards = $('cards');
const BIG_FILE = 50 * 1024 * 1024;
const HEIC_EXT = /\.(heic|heif|hif)$/i;
const BAD_MSG = 'Dosya bozuk görünüyor ya da gerçek bir fotoğraf değil. Dosyayı başka bir programda açabildiğinizi kontrol edin; açılıyorsa "Farklı kaydet" ile JPG olarak yeniden kaydedip tekrar deneyin.';

let items = []; // { id, file, bytes, info, outBlob, outName }
let seq = 0;
let fflate = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/* ---------- Bayt yardımcıları ---------- */
const ascii = (b, s, e) => { let t = ''; for (let i = s; i < e && i < b.length; i++) t += String.fromCharCode(b[i]); return t; };
const startsWith = (b, s, str) => ascii(b, s, s + str.length) === str;
const u16be = (b, p) => (b[p] << 8) | b[p + 1];
const u32be = (b, p) => ((b[p] * 2 ** 24) + (b[p + 1] << 16) + (b[p + 2] << 8) + b[p + 3]);
const u32le = (b, p) => (b[p] + (b[p + 1] << 8) + (b[p + 2] << 16) + b[p + 3] * 2 ** 24);

function detectKind(b) {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpeg';
  if (b.length > 8 && b[0] === 0x89 && startsWith(b, 1, 'PNG')) return 'png';
  if (b.length > 12 && startsWith(b, 0, 'RIFF') && startsWith(b, 8, 'WEBP')) return 'webp';
  if (b.length > 12 && startsWith(b, 4, 'ftyp') && /^(heic|heix|hevc|heim|heis|mif1|msf1)/.test(ascii(b, 8, 12))) return 'heic';
  return null;
}

/* ---------- EXIF / TIFF ayrıştırıcı ---------- */
const TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

/** TIFF üstbilgisinden başlayarak IFD'leri gezer; özet alanları ve alan sayısını döndürür. */
function parseTiff(b, start, end) {
  const out = { make: '', model: '', software: '', date: '', orientation: 0, gps: null, count: 0, hasMakerNote: false };
  if (end - start < 8) return out;
  const le = b[start] === 0x49 && b[start + 1] === 0x49;
  if (!le && !(b[start] === 0x4d && b[start + 1] === 0x4d)) return out;
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const r16 = (p) => dv.getUint16(p, le);
  const r32 = (p) => dv.getUint32(p, le);
  if (r16(start + 2) !== 42) return out;
  const seen = new Set();
  const inside = (p, n) => p >= start && p + n <= end;

  const readText = (e) => {
    const n = r32(e + 4);
    const off = n <= 4 ? e + 8 : start + r32(e + 8);
    if (!inside(off, n)) return '';
    return ascii(b, off, off + n).replace(/\0+$/, '').trim();
  };
  const readRationals = (e, k) => {
    const off = start + r32(e + 8);
    if (r32(e + 4) < k || !inside(off, k * 8)) return null;
    const v = [];
    for (let i = 0; i < k; i++) {
      const d = r32(off + i * 8 + 4);
      v.push(d ? r32(off + i * 8) / d : 0);
    }
    return v;
  };

  function readIfd(rel, kind) {
    const pos = start + rel;
    if (seen.has(pos) || !inside(pos, 2)) return 0;
    seen.add(pos);
    const n = r16(pos);
    if (!inside(pos + 2, n * 12 + 4)) return 0;
    const gpsRef = {};
    for (let i = 0; i < n; i++) {
      const e = pos + 2 + i * 12;
      const tag = r16(e), type = r16(e + 2), cnt = r32(e + 4);
      if (!TYPE_SIZE[type]) continue;
      if (kind === 'ifd0' && tag === 0x8769) { readIfd(r32(e + 8), 'exif'); continue; }
      if (kind === 'ifd0' && tag === 0x8825) { readIfd(r32(e + 8), 'gps'); continue; }
      if (kind === 'exif' && tag === 0xa005) { readIfd(r32(e + 8), 'interop'); continue; }
      out.count++;
      if (kind === 'ifd0') {
        if (tag === 0x010f) out.make = readText(e);
        else if (tag === 0x0110) out.model = readText(e);
        else if (tag === 0x0131) out.software = readText(e);
        else if (tag === 0x0132 && !out.date) out.date = readText(e);
        else if (tag === 0x0112 && type === 3 && cnt === 1) out.orientation = r16(e + 8);
      } else if (kind === 'exif') {
        if (tag === 0x9003) out.date = readText(e) || out.date;
        else if (tag === 0x927c) out.hasMakerNote = true;
      } else if (kind === 'gps') {
        if (tag === 1 || tag === 3) gpsRef[tag] = readText(e);
        else if (tag === 2 || tag === 4) gpsRef[tag] = readRationals(e, 3);
      }
    }
    if (kind === 'gps' && gpsRef[2] && gpsRef[4]) {
      const toDeg = (v) => v[0] + v[1] / 60 + v[2] / 3600;
      let lat = toDeg(gpsRef[2]), lon = toDeg(gpsRef[4]);
      if (/^S/i.test(gpsRef[1] || '')) lat = -lat;
      if (/^W/i.test(gpsRef[3] || '')) lon = -lon;
      if (Number.isFinite(lat) && Number.isFinite(lon)) out.gps = { lat, lon };
    }
    if (kind === 'ifd0') {
      const next = r32(pos + 2 + n * 12);
      if (next) readIfd(next, 'ifd1');
    }
    return n;
  }
  try { readIfd(r32(start + 4), 'ifd0'); } catch { /* bozuk EXIF: elde edilen kadarıyla yetin */ }
  return out;
}

const emptyInfo = () => ({ kind: '', width: 0, height: 0, make: '', model: '', software: '', date: '', orientation: 0, gps: null, fields: 0, xmp: false, iptc: false, comments: 0, texts: 0, hasExif: false });

function mergeExif(info, ex) {
  info.hasExif = true;
  info.make = ex.make; info.model = ex.model; info.software = ex.software; info.date = ex.date;
  info.orientation = ex.orientation; info.gps = ex.gps;
  info.fields += ex.count;
}

/* ---------- JPEG ---------- */
const XMP_SIG = 'http://ns.adobe.com/xap/1.0/\0';
const XMP_EXT_SIG = 'http://ns.adobe.com/xmp/extension/\0';

/** JPEG'i segmentlerine ayırır; hangilerinin kalacağını belirler. */
function processJpeg(b) {
  const info = emptyInfo();
  info.kind = 'jpeg';
  const keep = []; // { s, e } aralıkları
  let p = 2;
  keep.push({ s: 0, e: 2 });
  let sawSof = false;
  while (p < b.length) {
    if (b[p] !== 0xff) throw new Error('bad jpeg');
    let q = p;
    while (b[q] === 0xff) q++;
    const m = b[q++];
    const segStart = q - 2;
    if (m === 0xd9) { keep.push({ s: segStart, e: q }); p = q; break; }
    if (m === 0x01 || (m >= 0xd0 && m <= 0xd7) || m === 0x00) { keep.push({ s: segStart, e: q }); p = q; continue; }
    if (q + 2 > b.length) throw new Error('bad jpeg');
    const len = u16be(b, q);
    const segEnd = q + len;
    if (len < 2 || segEnd > b.length) throw new Error('bad jpeg');
    const payload = q + 2;
    let drop = false;
    if (m === 0xe1) {
      if (startsWith(b, payload, 'Exif\0\0')) { mergeExif(info, parseTiff(b, payload + 6, segEnd)); drop = true; }
      else if (startsWith(b, payload, XMP_SIG) || startsWith(b, payload, XMP_EXT_SIG)) { info.xmp = true; info.fields++; drop = true; }
      else drop = true;
    } else if (m === 0xe2) {
      drop = !startsWith(b, payload, 'ICC_PROFILE\0'); // ICC renk profili kalır
    } else if (m === 0xed) { info.iptc = true; info.fields++; drop = true; }
    else if (m === 0xfe) { info.comments++; info.fields++; drop = true; }
    else if (m >= 0xe3 && m <= 0xef && m !== 0xee) drop = true; // APP3–APP15 (APP14 Adobe renk bilgisi kalır)
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc && !sawSof) {
      sawSof = true; info.height = u16be(b, payload + 1); info.width = u16be(b, payload + 3);
    }
    if (!drop) keep.push({ s: segStart, e: segEnd });
    if (m === 0xda) { keep.push({ s: segEnd, e: b.length }); p = b.length; break; } // taranmış veri aynen kopyalanır
    p = segEnd;
  }
  if (!sawSof) throw new Error('bad jpeg');
  return { info, keep };
}

function applyKeep(b, keep) {
  const total = keep.reduce((n, k) => n + (k.e - k.s), 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const k of keep) { out.set(b.subarray(k.s, k.e), o); o += k.e - k.s; }
  return out;
}

/* ---------- PNG ---------- */
const PNG_DROP = new Set(['tEXt', 'iTXt', 'zTXt', 'eXIf']);

function processPng(b) {
  const info = emptyInfo();
  info.kind = 'png';
  const keep = [{ s: 0, e: 8 }];
  let p = 8, sawIhdr = false, sawEnd = false;
  while (p + 12 <= b.length) {
    const len = u32be(b, p);
    const type = ascii(b, p + 4, p + 8);
    const end = p + 12 + len;
    if (end > b.length) throw new Error('bad png');
    if (type === 'IHDR') { sawIhdr = true; info.width = u32be(b, p + 8); info.height = u32be(b, p + 12); }
    if (PNG_DROP.has(type)) {
      if (type === 'eXIf') {
        mergeExif(info, parseTiff(b, p + 8 + (startsWith(b, p + 8, 'Exif\0\0') ? 6 : 0), p + 8 + len));
      } else { info.texts++; info.fields++; }
    } else keep.push({ s: p, e: end });
    p = end;
    if (type === 'IEND') { sawEnd = true; break; }
  }
  if (!sawIhdr || !sawEnd) throw new Error('bad png');
  return { info, keep };
}

/* ---------- WebP ---------- */
function processWebp(b) {
  const info = emptyInfo();
  info.kind = 'webp';
  const riffEnd = Math.min(b.length, 8 + u32le(b, 4));
  const pieces = [];
  let p = 12, sawImage = false;
  while (p + 8 <= riffEnd) {
    const type = ascii(b, p, p + 4);
    const len = u32le(b, p + 4);
    const end = p + 8 + len + (len & 1);
    if (p + 8 + len > riffEnd) throw new Error('bad webp');
    if (type === 'VP8X') { info.width = 1 + b[p + 12] + (b[p + 13] << 8) + (b[p + 14] << 16); info.height = 1 + b[p + 15] + (b[p + 16] << 8) + (b[p + 17] << 16); }
    else if (type === 'VP8 ') { info.width = (b[p + 14] | (b[p + 15] << 8)) & 0x3fff; info.height = (b[p + 16] | (b[p + 17] << 8)) & 0x3fff; }
    else if (type === 'VP8L') { const v = b[p + 9] | (b[p + 10] << 8) | (b[p + 11] << 16) | (b[p + 12] << 24); info.width = (v & 0x3fff) + 1; info.height = ((v >>> 14) & 0x3fff) + 1; }
    if (type === 'VP8 ' || type === 'VP8L' || type === 'ANMF') sawImage = true;
    if (type === 'EXIF') {
      const off = p + 8 + (startsWith(b, p + 8, 'Exif\0\0') ? 6 : 0);
      mergeExif(info, parseTiff(b, off, p + 8 + len));
    } else if (type === 'XMP ') { info.xmp = true; info.fields++; }
    else pieces.push({ type, s: p, e: Math.min(end, riffEnd) });
    p = end;
  }
  if (!sawImage) throw new Error('bad webp');
  return { info, pieces };
}

function buildWebp(b, pieces) {
  let total = 12;
  for (const x of pieces) total += x.e - x.s;
  const out = new Uint8Array(total);
  out.set(b.subarray(0, 12), 0);
  let o = 12;
  for (const x of pieces) {
    out.set(b.subarray(x.s, x.e), o);
    if (x.type === 'VP8X') out[o + 8] &= ~0x0c; // EXIF (0x08) ve XMP (0x04) bayraklarını temizle
    o += x.e - x.s;
  }
  new DataView(out.buffer).setUint32(4, total - 8, true);
  return out;
}

/* ---------- Ortak: analiz ve temizleme ---------- */
function analyze(bytes) {
  const kind = detectKind(bytes);
  if (kind === 'heic') return { heic: true };
  if (!kind) return { bad: true };
  try {
    if (kind === 'jpeg') return { info: processJpeg(bytes).info };
    if (kind === 'png') return { info: processPng(bytes).info };
    return { info: processWebp(bytes).info };
  } catch { return { bad: true }; }
}

const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const EXT = { jpeg: 'jpg', png: 'png', webp: 'webp' };

/** Yönü canvas ile düzeltip JPEG'i yeniden kodlar (EXIF'siz çıkar). */
async function reencodeUpright(file) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const c = document.createElement('canvas');
  c.width = bmp.width; c.height = bmp.height;
  c.getContext('2d').drawImage(bmp, 0, 0);
  bmp.close && bmp.close();
  const blob = await new Promise((res, rej) => c.toBlob((x) => (x ? res(x) : rej(new Error('encode failed'))), 'image/jpeg', 0.95));
  const out = { blob, width: c.width, height: c.height };
  c.width = c.height = 1;
  return out;
}

async function cleanOne(it, fixOrientation) {
  const b = it.bytes;
  const kind = it.info.kind;
  if (kind === 'jpeg' && fixOrientation && it.info.orientation > 1) {
    const r = await reencodeUpright(it.file);
    return { blob: r.blob, removed: it.info.fields, reencoded: true, width: r.width, height: r.height };
  }
  let out;
  if (kind === 'jpeg') { const r = processJpeg(b); out = applyKeep(b, r.keep); }
  else if (kind === 'png') { const r = processPng(b); out = applyKeep(b, r.keep); }
  else { const r = processWebp(b); out = buildWebp(b, r.pieces); }
  return { blob: new Blob([out], { type: MIME[kind] }), removed: it.info.fields, reencoded: false, width: it.info.width, height: it.info.height };
}

/* ---------- Arayüz ---------- */
createDropzone({
  el: $('drop'),
  accept: 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.jfif,.png,.webp',
  multiple: true,
  onFiles: addFiles,
});

function pill(text, cls) {
  const s = document.createElement('span');
  s.className = `ex-pill${cls ? ` ${cls}` : ''}`;
  s.textContent = text;
  return s;
}

function renderCard(it) {
  const card = cards.querySelector(`[data-id="${it.id}"]`);
  const info = it.info;
  card.innerHTML = '';
  const h = document.createElement('h3');
  h.textContent = it.file.name;
  card.appendChild(h);
  const dl = document.createElement('dl');
  const row = (k, v) => { const dt = document.createElement('dt'); dt.textContent = k; const dd = document.createElement('dd'); dd.textContent = v; dl.append(dt, dd); };
  const cam = [info.make, info.model].filter(Boolean).join(' ');
  row('Boyut', `${info.width}×${info.height} piksel · ${info.kind.toUpperCase().replace('JPEG', 'JPG')} · ${formatBytes(it.file.size)}`);
  if (cam) row('Kamera / telefon', cam);
  if (info.date) row('Çekim tarihi', info.date);
  if (info.software) row('Yazılım', info.software);
  if (info.orientation > 1) row('Yön (Orientation)', `${info.orientation} (fotoğraf yan ya da ters kaydedilmiş)`);
  if (info.xmp) row('XMP', 'var (düzenleme geçmişi, etiketler vb.)');
  if (info.iptc) row('IPTC', 'var (telif, başlık, anahtar sözcükler)');
  if (info.comments) row('JPEG yorumu', `${info.comments} adet`);
  if (info.texts) row('PNG metin parçaları', `${info.texts} adet`);
  card.appendChild(dl);
  const flags = document.createElement('p');
  flags.className = 'ex-flags';
  if (info.gps) {
    flags.appendChild(pill(`Konum bilgisi var (yaklaşık ${info.gps.lat.toFixed(4)}, ${info.gps.lon.toFixed(4)})`, 'warn'));
  } else {
    flags.appendChild(pill('Konum bilgisi bulunamadı', 'ok'));
  }
  flags.appendChild(pill(info.fields ? `${info.fields} üst veri alanı` : 'Üst veri yok', info.fields ? '' : 'ok'));
  card.appendChild(flags);
  if (info.kind === 'jpeg' && info.orientation > 1) {
    const n = document.createElement('p');
    n.className = 'hint';
    n.textContent = 'Not: Temizleme EXIF bloğunu tümüyle sildiği için bu fotoğraf bazı programlarda yan görünebilir. "Yönü düzelt" seçeneği fotoğrafı doğru yöne çevirip yeniden kodlar.';
    card.appendChild(n);
  }
  const res = document.createElement('p');
  res.className = 'ex-result';
  res.hidden = true;
  card.appendChild(res);
}

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const msgs = [];
  if (files.some((f) => f.size > BIG_FILE)) {
    msgs.push('50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız dosyaları tek tek deneyin.');
  }
  (async () => {
    const skipped = [];
    for (const file of files) {
      if (HEIC_EXT.test(file.name) || /^image\/hei[cf]$/i.test(file.type)) {
        msgs.push(`${file.name}: HEIC/HEIF dosyaları desteklenmiyor; tarayıcılar bu Apple biçimini güvenle işleyemiyor. iPhone'da Ayarlar > Kamera > Formatlar > "En Uyumlu" seçerseniz telefon JPG çeker; mevcut fotoğrafı "Dosyalar" uygulamasından paylaşırken JPG'ye çevirebilirsiniz.`);
        continue;
      }
      let bytes;
      try { bytes = new Uint8Array(await file.arrayBuffer()); } catch { skipped.push(file.name); continue; }
      const res = analyze(bytes);
      if (res.heic) {
        msgs.push(`${file.name}: içeriği HEIC/HEIF olan bir dosya; desteklenmiyor. Fotoğrafı önce JPG'ye çevirip tekrar deneyin (iPhone'da "En Uyumlu" kamera biçimi ya da Dosyalar uygulaması).`);
        continue;
      }
      if (res.bad) { skipped.push(file.name); continue; }
      const id = String(++seq);
      const it = { id, file, bytes, info: res.info, outBlob: null, outName: null, url: URL.createObjectURL(file) };
      items.push(it);
      const li = document.createElement('li');
      li.dataset.id = id;
      li.innerHTML = `<img class="thumb" alt="" src="${it.url}"><span class="name"></span><span class="meta"></span>
        <button class="ba-icon-btn" type="button" data-act="download" aria-label="Bu dosyayı indir" hidden>⤓</button>
        <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
      li.querySelector('.name').textContent = file.name;
      li.querySelector('.meta').textContent = `${res.info.kind.toUpperCase().replace('JPEG', 'JPG')} · ${formatBytes(file.size)}`;
      list.appendChild(li);
      const card = document.createElement('section');
      card.className = 'ex-card';
      card.dataset.id = id;
      cards.appendChild(card);
      renderCard(it);
    }
    if (skipped.length) {
      msgs.push(`${skipped.length} dosya okunamadı (${skipped.slice(0, 3).join(', ')}${skipped.length > 3 ? '…' : ''}). Dosya bozuk ya da JPG, PNG, WebP dışında bir biçim olabilir; fotoğrafı başka bir programda açıp JPG olarak yeniden kaydederek tekrar deneyin.`);
    }
    if (msgs.length) showError($('error'), msgs.join(' '));
    refresh();
  })();
}

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('summary-title').hidden = !has;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
  // "Yönü düzelt" yalnızca yönü bozuk bir JPEG varsa anlamlı
  $('field-orient').hidden = !items.some((it) => it.info.kind === 'jpeg' && it.info.orientation > 1);
}

function removeItem(it) {
  URL.revokeObjectURL(it.url);
  items = items.filter((x) => x !== it);
  list.querySelector(`li[data-id="${it.id}"]`)?.remove();
  cards.querySelector(`[data-id="${it.id}"]`)?.remove();
  refresh();
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const it = items.find((x) => x.id === btn.closest('li').dataset.id);
  if (!it) return;
  if (btn.dataset.act === 'remove') removeItem(it);
  else if (btn.dataset.act === 'download' && it.outBlob) downloadBlob(it.outBlob, it.outName);
});

$('clear').addEventListener('click', () => {
  items.forEach((it) => URL.revokeObjectURL(it.url));
  items = []; list.innerHTML = ''; cards.innerHTML = '';
  showError($('error'), null);
  refresh();
});

const sizeNote = (d) => (d >= 0 ? `${formatBytes(d)} küçüldü` : `${formatBytes(-d)} büyüdü`);

$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const fix = $('opt-orient').checked;
  const failed = [];
  let done = 0, fieldTotal = 0, inTotal = 0, outTotal = 0, reenc = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const r = await cleanOne(it, fix);
        it.outBlob = r.blob;
        it.outName = `${baseName(it.file.name)}-temiz.${EXT[it.info.kind]}`;
        done++; fieldTotal += r.removed; inTotal += it.file.size; outTotal += r.blob.size;
        if (r.reencoded) reenc++;
        const card = cards.querySelector(`[data-id="${it.id}"] .ex-result`);
        card.textContent = `Temizlendi: ${r.removed} alan · ${formatBytes(it.file.size)} → ${formatBytes(r.blob.size)} (${sizeNote(it.file.size - r.blob.size)}) · ${r.width}×${r.height} piksel`
          + (r.reencoded ? ' · Yön düzeltildiği için fotoğraf JPEG olarak yeniden kodlandı (kalite %95).' : ' · Piksel verisi değişmedi, yeniden sıkıştırma yapılmadı.');
        card.hidden = false;
        const li = list.querySelector(`li[data-id="${it.id}"]`);
        li.querySelector('button[data-act="download"]').hidden = false;
        li.querySelector('.meta').textContent = `temizlendi · ${formatBytes(r.blob.size)}`;
      } catch (err) {
        console.error(err);
        failed.push(it.file.name);
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `Temizlendi: ${fieldTotal} alan · ${done} dosya · ${formatBytes(inTotal)} → ${formatBytes(outTotal)} (${sizeNote(inTotal - outTotal)})`
        + (reenc ? ` · ${reenc} dosya yön düzeltmesi için yeniden kodlandı` : '');
      $('download-zip').hidden = done < 2;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      showError($('error'), `${failed.length} dosya temizlenemedi (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). ${BAD_MSG}`);
    }
  } finally {
    btn.disabled = false;
  }
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
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'temiz-fotograflar.zip');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Zip oluşturulamadı; tarayıcı belleği yetmemiş olabilir. "Tek tek indir" düğmesini kullanın ya da daha az dosyayla deneyin.');
  } finally {
    btn.disabled = false;
  }
});
