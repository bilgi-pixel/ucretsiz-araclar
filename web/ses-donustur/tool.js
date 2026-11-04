// Ses Dönüştürücü — Web Audio decodeAudioData ile çözer (MP3, M4A, OGG, WAV, FLAC… tarayıcı desteğine göre),
// OfflineAudioContext ile örnekleme hızı/kanal ayarlar, WAV'ı saf JS ile yazar; WebM/OGG (Opus) için MediaRecorder kullanır.
// MP3 çıktısı yoktur: tarayıcıda yerleşik MP3 kodlayıcı bulunmaz, JS kodlayıcılar LGPL'dir (proje yalnızca MIT/BSD/Apache izin verir).
// Tüm işlem tarayıcıda yapılır; ses dosyası hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const ACCEPT = 'audio/*,.mp3,.wav,.ogg,.oga,.opus,.m4a,.aac,.flac,.webm,.weba,.wma,.aiff,.aif';
const PEAK_TARGET = Math.pow(10, -1 / 20); // −1 dBFS ≈ 0,891
const TRIM_PAD_SEC = 0.03;                 // kırpmada baş/sonda bırakılan pay (sert kesik olmasın)
const OPUS_RATE = 48000;                   // Opus her zaman 48 kHz çalışır

const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
const AC = window.AudioContext || window.webkitAudioContext;

const DECODE_HINT = 'Bu dosya çözülemedi ya da bir ses dosyası değil. MP3, WAV, OGG, M4A veya FLAC seçin; dosya açılmıyorsa başka bir programla WAV olarak kaydedip tekrar deneyin.';

/** @type {{id:string,file:File,duration:number,channels:number}[]} */
let items = [];
let outputs = [];        // { name, blob, duration, ext }
let busy = false;
let cancelRequested = false;

/* ---------- Biçim desteği ---------- */
function pickMime(kind) {
  if (typeof window.MediaRecorder !== 'function' || typeof MediaRecorder.isTypeSupported !== 'function') return '';
  const list = kind === 'ogg' ? ['audio/ogg;codecs=opus', 'audio/ogg'] : ['audio/webm;codecs=opus', 'audio/webm'];
  return list.find((m) => MediaRecorder.isTypeSupported(m)) || '';
}
const MIME = { webm: pickMime('webm'), ogg: pickMime('ogg') };
for (const k of ['webm', 'ogg']) {
  if (MIME[k]) continue;
  const o = $('opt-format').querySelector(`option[value="${k}"]`);
  if (o) { o.disabled = true; o.textContent += ' (bu tarayıcıda desteklenmiyor)'; }
}

createDropzone({ el: $('drop'), accept: ACCEPT, multiple: true, onFiles: addFiles });

/* ---------- Yardımcılar ---------- */
const fmtSec = (s) => {
  const m = Math.floor(s / 60);
  const r = s - m * 60;
  return `${m}:${r.toFixed(2).padStart(5, '0')}`;
};
const chLabel = (n) => (n === 1 ? 'mono' : n === 2 ? 'stereo' : `${n} kanal`);

/** Kullanıcıya gösterilecek Türkçe hata taşıyan Error. */
const userError = (msg) => Object.assign(new Error(msg), { user: true });

/** decodeAudioData'nın hem Promise hem eski callback imzasını destekler. */
function decodeWith(ctx, bytes) {
  return new Promise((resolve, reject) => {
    try {
      const p = ctx.decodeAudioData(bytes, resolve, reject);
      if (p && typeof p.then === 'function') p.then(resolve, reject);
    } catch (e) { reject(e); }
  });
}

/**
 * Dosyayı çözer. Çözme, hedef örnekleme hızındaki bir OfflineAudioContext içinde yapılır:
 * tarayıcı sesi doğrudan bu hıza yeniden örnekler (tek adımda, çift yeniden örnekleme olmadan).
 */
async function decodeFile(file, rate) {
  if (!OAC) throw userError('Bu tarayıcı Web Audio desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.');
  if (!file.size) throw userError(`"${file.name}" boş bir dosya. Dosyanın tam indiğinden emin olup yeniden seçin.`);
  let bytes;
  try { bytes = await file.arrayBuffer(); } catch { throw userError(`"${file.name}" okunamadı. Dosyayı yeniden seçin.`); }
  try {
    return await decodeWith(new OAC(1, 1, rate), bytes);
  } catch {
    throw userError(`"${file.name}" çözülemedi. ${DECODE_HINT}`);
  }
}

/* ---------- Dosya ekleme ---------- */
async function addFiles(files) {
  if (busy) return;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const big = files.find((f) => f.size >= BIG_FILE);
  if (big) {
    $('warning').textContent = `"${big.name}" ${formatBytes(big.size)}; 50 MB üstü seste çözme belleği zorlar, telefonda sekme çökebilir. Mümkünse bilgisayarda deneyin ya da dosyayı önce Ses Kesme aracıyla kısaltın.`;
    $('warning').classList.add('is-active');
  }
  let lastErr = '';
  for (const file of files) {
    try {
      setProgress($('progress'), 40, `"${file.name}" inceleniyor…`);
      await tick();
      const buf = await decodeFile(file, 48000);
      addItem(file, buf.duration, buf.numberOfChannels);
    } catch (err) {
      lastErr = err && err.user ? err.message : `"${file.name}" okunamadı. ${DECODE_HINT}`;
    }
  }
  setProgress($('progress'), null);
  if (lastErr) showError($('error'), lastErr);
  refresh();
}

function addItem(file, duration, channels) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  items.push({ id, file, duration, channels });
  const li = document.createElement('li');
  li.dataset.id = id;
  li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>';
  li.querySelector('.name').textContent = file.name;
  li.querySelector('.meta').textContent = `${fmtSec(duration)} · ${chLabel(channels)} · ${formatBytes(file.size)}`;
  $('files').appendChild(li);
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn || busy) return;
  const li = btn.closest('li');
  items = items.filter((it) => it.id !== li.dataset.id);
  li.remove();
  refresh();
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('run').disabled = !has;
  $('run').textContent = items.length > 1 ? `${items.length} dosyayı dönüştür` : 'Dönüştür';
  syncOptions();
}

$('clear').addEventListener('click', () => {
  if (busy) return;
  items = []; outputs = [];
  $('files').innerHTML = '';
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  setProgress($('progress'), null);
  refresh();
});

$('cancel').addEventListener('click', () => {
  cancelRequested = true;
  $('cancel').disabled = true;
  $('cancel').textContent = 'İptal ediliyor…';
});

/** Biçime göre ilgili seçenek gruplarını gösterir/gizler. */
function syncOptions() {
  const fmt = $('opt-format').value;
  const isWav = fmt === 'wav';
  $('grp-wav').hidden = !isWav;
  $('grp-opus').hidden = isWav;
  $('trim-level').hidden = !$('opt-trim').checked;
  $('realtime-note').hidden = isWav;
}
for (const id of ['opt-format', 'opt-trim']) $(id).addEventListener('change', syncOptions);

/* ---------- Ses işleme ---------- */
/** Kanal sayısını OfflineAudioContext ile hedefe getirir (5.1 → stereo gibi karışımlar tarayıcı kurallarıyla). */
async function remix(buf, targetCh) {
  if (buf.numberOfChannels === targetCh) return Array.from({ length: targetCh }, (_, c) => buf.getChannelData(c));
  const off = new OAC(targetCh, buf.length, buf.sampleRate);
  const src = off.createBufferSource();
  src.buffer = buf;
  src.connect(off.destination);
  src.start();
  const rendered = await off.startRendering();
  return Array.from({ length: targetCh }, (_, c) => rendered.getChannelData(c));
}

/** Baştaki ve sondaki sessizliği kırpar (görünüm dilimi, kopya yok). Tamamen sessizse null döner. */
function trimSilence(channels, rate, thresholdDb) {
  const thr = Math.pow(10, thresholdDb / 20);
  const len = channels[0].length;
  const loud = (i) => { for (const ch of channels) if (Math.abs(ch[i]) > thr) return true; return false; };
  let a = 0;
  while (a < len && !loud(a)) a++;
  if (a >= len) return null;
  let b = len - 1;
  while (b > a && !loud(b)) b--;
  const pad = Math.round(TRIM_PAD_SEC * rate);
  const s = Math.max(0, a - pad), e = Math.min(len, b + 1 + pad);
  return channels.map((ch) => ch.subarray(s, e));
}

function peakOf(channels) {
  let p = 0;
  for (const ch of channels) for (let i = 0; i < ch.length; i++) { const v = Math.abs(ch[i]); if (v > p) p = v; }
  return p;
}

/** 16 ya da 24 bit PCM WAV (RIFF) yazar; uzun dosyada arada nefes alır. */
async function encodeWav(channels, rate, bits, onProgress) {
  const nch = channels.length;
  const len = channels[0].length;
  const bytesPer = bits / 8;
  const dataSize = len * nch * bytesPer;
  if (dataSize > 0xffffffff - 64) throw userError('Ses WAV için fazla uzun (4 GB sınırı). Önce Ses Kesme aracıyla kısaltın ya da WebM/OGG seçin.');
  const ab = new ArrayBuffer(44 + dataSize);
  const v = new DataView(ab);
  const str = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
  str(0, 'RIFF'); v.setUint32(4, 36 + dataSize, true); str(8, 'WAVE');
  str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, nch, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * nch * bytesPer, true);
  v.setUint16(32, nch * bytesPer, true); v.setUint16(34, bits, true);
  str(36, 'data'); v.setUint32(40, dataSize, true);
  let o = 44;
  const CHUNK = 1 << 18;
  for (let start = 0; start < len; start += CHUNK) {
    const end = Math.min(len, start + CHUNK);
    for (let i = start; i < end; i++) {
      for (let c = 0; c < nch; c++) {
        const x = Math.max(-1, Math.min(1, channels[c][i]));
        if (bits === 16) {
          v.setInt16(o, x < 0 ? Math.round(x * 0x8000) : Math.round(x * 0x7fff), true);
          o += 2;
        } else {
          const s = x < 0 ? Math.round(x * 0x800000) : Math.round(x * 0x7fffff);
          v.setUint8(o, s & 255); v.setUint8(o + 1, (s >> 8) & 255); v.setUint8(o + 2, (s >> 16) & 255);
          o += 3;
        }
      }
    }
    if (end < len) { onProgress(end / len); await tick(); }
  }
  return new Blob([ab], { type: 'audio/wav' });
}

/** Opus'u MediaRecorder ile gerçek zamanlı kaydeder (süre kadar sürer). WebM ya da OGG kapsayıcı. */
async function encodeOpus(channels, rate, kind, kbps, onProgress) {
  if (!AC) throw userError('Bu tarayıcı Web Audio desteklemiyor. Güncel Chrome, Edge, Firefox veya Safari kullanın.');
  const mimeType = MIME[kind];
  if (!mimeType) throw userError('Bu tarayıcı seçtiğiniz biçimi kaydedemiyor. Çıktı biçimini WAV yapın ya da Chrome/Edge/Firefox kullanın.');
  const ctx = new AC();
  try {
    await ctx.resume();
    const nch = channels.length;
    const ab = ctx.createBuffer(nch, channels[0].length, rate);
    channels.forEach((ch, i) => ab.copyToChannel(ch, i));
    const dest = ctx.createMediaStreamDestination();
    try { dest.channelCount = nch; } catch { /* varsayılan kalsın */ }
    const src = ctx.createBufferSource();
    src.buffer = ab;
    src.connect(dest); // hoparlöre bağlanmaz: kayıt sessiz yapılır
    const rec = new MediaRecorder(dest.stream, { mimeType, audioBitsPerSecond: kbps * 1000 });
    const parts = [];
    rec.ondataavailable = (e) => { if (e.data && e.data.size) parts.push(e.data); };
    const stopped = new Promise((resolve, reject) => {
      rec.onstop = () => resolve(new Blob(parts, { type: mimeType.split(';')[0] }));
      rec.onerror = () => reject(userError('Kayıt sırasında hata oluştu. Çıktı biçimini WAV yapıp tekrar deneyin.'));
    });
    const total = ab.duration;
    rec.start(250);
    const t0 = ctx.currentTime;
    const w0 = performance.now();
    src.start();
    let failed = false;
    const ended = new Promise((resolve) => { src.onended = resolve; });
    const timer = setInterval(() => {
      const played = ctx.currentTime - t0;
      onProgress(Math.min(0.99, played / total));
      // Ses işleme hiç başlamadıysa (otomatik oynatma engeli, arka plan) sonsuza kadar beklemeyelim.
      if (performance.now() - w0 > 3000 && played < 0.05) { failed = true; src.onended(); }
      if (cancelRequested) { failed = true; try { src.stop(); } catch { /* durmuş */ } }
    }, 150);
    await ended;
    await new Promise((r) => setTimeout(r, 150));
    clearInterval(timer);
    if (rec.state !== 'inactive') rec.stop();
    const blob = await stopped;
    if (cancelRequested) throw Object.assign(new Error('iptal'), { cancelled: true });
    if (failed) throw userError('Tarayıcı ses işlemeyi başlatmadı (sekme arka planda ya da ses engellenmiş olabilir). Sayfada bir yere tıklayıp yeniden deneyin ya da WAV seçin.');
    return blob;
  } finally {
    ctx.close().catch(() => {});
  }
}

/* ---------- Dönüştürme akışı ---------- */
function readOptions() {
  const format = $('opt-format').value;
  return {
    format,
    bits: Number($('opt-bits').value) === 24 ? 24 : 16,
    rate: format === 'wav' ? Number($('opt-rate').value) || 44100 : OPUS_RATE,
    channels: $('opt-channels').value,           // auto | 1 | 2
    kbps: Number($('opt-bitrate').value) || 128,
    normalize: $('opt-normalize').checked,
    trim: $('opt-trim').checked,
    trimDb: Number($('opt-threshold').value) || -50,
  };
}

/** Tek dosyayı seçeneklere göre dönüştürür. */
async function convertOne(item, o, onProgress) {
  onProgress(0.02, 'çözülüyor');
  const buf = await decodeFile(item.file, o.rate);
  const targetCh = o.channels === 'auto' ? Math.min(2, buf.numberOfChannels) : Number(o.channels);
  onProgress(0.1, 'işleniyor');
  await tick();
  let channels = await remix(buf, targetCh);
  if (o.trim) {
    const trimmed = trimSilence(channels, o.rate, o.trimDb);
    if (!trimmed) throw userError(`"${item.file.name}" tamamen sessiz görünüyor. Sessizlik eşiğini yükseltin (ör. −60 dB) ya da "baştaki ve sondaki sessizliği kırp" seçeneğini kapatın.`);
    channels = trimmed;
  }
  if (o.normalize) {
    const peak = peakOf(channels);
    if (peak > 1e-5) {
      const gain = PEAK_TARGET / peak;
      for (const ch of channels) for (let i = 0; i < ch.length; i++) ch[i] *= gain;
    }
  }
  const duration = channels[0].length / o.rate;
  let blob;
  let ext;
  if (o.format === 'wav') {
    blob = await encodeWav(channels, o.rate, o.bits, (p) => onProgress(0.15 + p * 0.85, 'WAV yazılıyor'));
    ext = 'wav';
  } else {
    ext = o.format;
    blob = await encodeOpus(channels, o.rate, o.format, o.kbps, (p) => onProgress(0.15 + p * 0.85, `${ext.toUpperCase()} kaydediliyor (gerçek zamanlı)`));
  }
  return { blob, duration, ext };
}

/** Çıktı adı: kaynakla aynı uzantıysa "-donusturuldu" eklenir; aynı ad tekrar ederse sayaç. */
function outputName(file, ext, used) {
  const base = baseName(file.name) || 'ses';
  const srcExt = (file.name.match(/\.([^.]+)$/) || [, ''])[1].toLowerCase();
  let name = srcExt === ext ? `${base}-donusturuldu.${ext}` : `${base}.${ext}`;
  let n = 2;
  while (used.has(name)) name = `${base}-${n++}.${ext}`;
  used.add(name);
  return name;
}

$('run').addEventListener('click', async () => {
  if (!items.length || busy) return;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  outputs = [];
  busy = true;
  cancelRequested = false;
  $('run').disabled = true; $('clear').disabled = true;
  $('cancel').hidden = false; $('cancel').disabled = false; $('cancel').textContent = 'İptal';
  const o = readOptions();
  const used = new Set();
  const failures = [];
  const total = items.length;
  try {
    for (let i = 0; i < total; i++) {
      if (cancelRequested) break;
      const item = items[i];
      const label = total > 1 ? `(${i + 1}/${total}) ` : '';
      try {
        const res = await convertOne(item, o, (p, what) => {
          setProgress($('progress'), ((i + p) / total) * 100, `${label}${item.file.name}: ${what}… %${Math.round(p * 100)}`);
        });
        outputs.push({ name: outputName(item.file, res.ext, used), blob: res.blob, duration: res.duration, ext: res.ext });
      } catch (err) {
        if (err && err.cancelled) break;
        console.error(err);
        failures.push(err && err.user ? err.message : `"${item.file.name}" dönüştürülemedi. Çıktı biçimini WAV yapıp tekrar deneyin; sorun sürerse dosyayı başka bir programla WAV'a çevirin.`);
      }
    }
  } finally {
    busy = false;
    $('run').disabled = false; $('clear').disabled = false;
    $('cancel').hidden = true;
    setProgress($('progress'), null);
  }
  if (failures.length) showError($('error'), failures.join(' '));
  if (cancelRequested && !outputs.length) { showError($('error'), 'İşlem iptal edildi. Dosyaları yeniden dönüştürebilirsiniz.'); return; }
  if (outputs.length) showResults(cancelRequested);
});

function showResults(cancelled) {
  const box = $('downloads');
  box.textContent = '';
  const list = document.createElement('ul');
  list.className = 'ba-filelist';
  list.setAttribute('aria-label', 'Dönüştürülen dosyalar');
  outputs.forEach((out) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-btn ba-btn-success" type="button">İndir</button>';
    li.querySelector('.name').textContent = out.name;
    li.querySelector('.meta').textContent = `${fmtSec(out.duration)} · ${formatBytes(out.blob.size)}`;
    li.querySelector('button').setAttribute('aria-label', `${out.name} dosyasını indir`);
    li.querySelector('button').addEventListener('click', () => downloadBlob(out.blob, out.name));
    list.appendChild(li);
  });
  box.appendChild(list);
  if (outputs.length > 1) {
    const zipBtn = document.createElement('button');
    zipBtn.type = 'button';
    zipBtn.id = 'download-zip';
    zipBtn.className = 'ba-btn ba-btn-primary ba-btn-lg';
    zipBtn.textContent = `Tümünü ZIP olarak indir (${outputs.length} dosya)`;
    zipBtn.addEventListener('click', downloadZip);
    box.appendChild(zipBtn);
  }
  const total = outputs.reduce((a, x) => a + x.blob.size, 0);
  $('result-info').textContent = `${outputs.length} dosya hazır · toplam ${formatBytes(total)}${cancelled ? ' · işlem iptal edildi, yalnızca tamamlananlar listelendi' : ''}.`;
  $('result').classList.add('is-active');
}

async function downloadZip() {
  try {
    const { zipSync } = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
    const files = {};
    for (const out of outputs) {
      const data = new Uint8Array(await out.blob.arrayBuffer());
      // WAV sıkışır; WebM/OGG zaten sıkıştırılmıştır, yalnızca paketlenir.
      files[out.name] = [data, { level: out.ext === 'wav' ? 6 : 0 }];
    }
    downloadBlob(new Blob([zipSync(files)], { type: 'application/zip' }), 'ses-donusturulen.zip');
  } catch (err) {
    console.error(err);
    showError($('error'), 'ZIP oluşturulamadı. Dosyaları tek tek indirmeyi deneyin.');
  }
}

refresh();
