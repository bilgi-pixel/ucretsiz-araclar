import { downloadBlob, formatBytes, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const TR = 'tr-TR';
const WORDS_PER_MINUTE = 200;
const BIG_TEXT_LIMIT = 2 * 1024 * 1024; // 2 MB üstü metinde uyarı
const history = []; // geri al yığını (son 20 durum)

// ---------- Sayaç ----------

function countWords(text) {
  const m = text.match(/[\p{L}\p{N}]+(?:['’\-.][\p{L}\p{N}]+)*/gu);
  return m ? m.length : 0;
}

function countSentences(text) {
  const t = text.trim();
  if (!t) return 0;
  // Nokta, soru, ünlem ya da üç nokta ile biten parçalar; sondaki noktalama yoksa yine bir cümle sayılır.
  const parts = t.split(/[.!?…]+(?=\s|$)/u).map((s) => s.trim()).filter((s) => /[\p{L}\p{N}]/u.test(s));
  return parts.length;
}

function countParagraphs(text) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).length;
}

function countLines(text) {
  return text ? text.split('\n').length : 0;
}

function readingTime(words) {
  if (!words) return '0 dk';
  const minutes = words / WORDS_PER_MINUTE;
  if (minutes < 1) return `${Math.max(1, Math.round(minutes * 60))} sn`;
  return `${Math.ceil(minutes)} dk`;
}

export function computeStats(text) {
  const words = countWords(text);
  return {
    chars: Array.from(text).length,
    charsNoSpace: Array.from(text.replace(/\s/gu, '')).length,
    words,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: countLines(text),
    reading: readingTime(words),
    bytes: new TextEncoder().encode(text).length,
  };
}

function renderStats() {
  const s = computeStats(input.value);
  $('stat-chars').textContent = s.chars.toLocaleString(TR);
  $('stat-chars-ns').textContent = s.charsNoSpace.toLocaleString(TR);
  $('stat-words').textContent = s.words.toLocaleString(TR);
  $('stat-sentences').textContent = s.sentences.toLocaleString(TR);
  $('stat-paragraphs').textContent = s.paragraphs.toLocaleString(TR);
  $('stat-lines').textContent = s.lines.toLocaleString(TR);
  $('stat-reading').textContent = s.reading;
  $('stat-bytes').textContent = formatBytes(s.bytes);
  $('actions').hidden = !input.value.length;
  $('undo').disabled = history.length === 0;
  if (s.bytes > BIG_TEXT_LIMIT) {
    showError($('error'), `Metin ${formatBytes(s.bytes)} boyutunda; tarayıcı yavaşlayabilir. Daha küçük parçalarla çalışmanız önerilir.`);
  }
}

// ---------- Dönüşümler ----------

const TR_MAP = { ş: 's', Ş: 'S', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I', ö: 'o', Ö: 'O', ü: 'u', Ü: 'U', ç: 'c', Ç: 'C' };

/** Türkçe harfleri ASCII karşılığına çevirir; diğer aksanlı harfleri NFD ile sadeleştirir. */
export function stripTurkish(text) {
  return text
    .replace(/[şŞğĞıİöÖüÜçÇ]/g, (ch) => TR_MAP[ch])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function slugify(text) {
  return stripTurkish(text.toLocaleLowerCase(TR))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleCase(text) {
  return text.toLocaleLowerCase(TR).replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (w) => {
    const first = Array.from(w)[0];
    return first.toLocaleUpperCase(TR) + w.slice(first.length);
  });
}

export function sentenceCase(text) {
  const lower = text.toLocaleLowerCase(TR);
  // Metin başı ya da cümle sonu noktalamasından sonraki ilk harf büyütülür.
  return lower.replace(/(^|[.!?…]\s+|\n\s*)(\p{L})/gu, (m, pre, ch) => pre + ch.toLocaleUpperCase(TR));
}

function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function base64ToUtf8(text) {
  const clean = text.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (!clean) return '';
  if (!/^[A-Za-z0-9+/]+=*$/.test(clean)) throw new Error('base64');
  const padded = clean + '='.repeat((4 - (clean.length % 4)) % 4);
  let bin;
  try { bin = atob(padded); } catch { throw new Error('base64'); }
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

const OPS = {
  upper: (t) => t.toLocaleUpperCase(TR),
  lower: (t) => t.toLocaleLowerCase(TR),
  title: titleCase,
  sentence: sentenceCase,
  'strip-tr': stripTurkish,
  slug: slugify,
  'sort-az': (t) => t.split('\n').sort((a, b) => a.localeCompare(b, TR)).join('\n'),
  'sort-za': (t) => t.split('\n').sort((a, b) => b.localeCompare(a, TR)).join('\n'),
  dedupe: (t) => { const seen = new Set(); return t.split('\n').filter((l) => !seen.has(l) && seen.add(l)).join('\n'); },
  'remove-empty': (t) => t.split('\n').filter((l) => l.trim()).join('\n'),
  'trim-spaces': (t) => t.split('\n').map((l) => l.replace(/[ \t ]+/g, ' ').trim()).join('\n'),
  'base64-encode': utf8ToBase64,
  'base64-decode': base64ToUtf8,
  'url-encode': (t) => encodeURIComponent(t),
  'url-decode': (t) => { try { return decodeURIComponent(t.replace(/\+/g, '%20')); } catch { throw new Error('url'); } },
  reverse: (t) => Array.from(t).reverse().join(''),
};

const OP_ERRORS = {
  base64: 'Metin geçerli bir Base64 değil. Yalnızca A–Z, a–z, 0–9, + ve / karakterleri içermeli; kopyalarken eksik kalmış olabilir.',
  url: 'URL çözülemedi: "%" işaretinden sonra iki hex basamak gelmeli. Metni eksiksiz yapıştırıp tekrar deneyin.',
  utf8: 'Çözülen veri UTF-8 metin değil; bu Base64 bir dosya (resim, PDF) olabilir.',
};

function apply(op) {
  showError($('error'), null);
  const fn = OPS[op];
  if (!fn) return;
  const before = input.value;
  if (!before) return;
  try {
    const after = fn(before);
    if (after === before) return;
    history.push(before);
    if (history.length > 20) history.shift();
    input.value = after;
    renderStats();
    announce(`${$(`op-${op}`).textContent} uygulandı`);
  } catch (err) {
    const key = err instanceof TypeError ? 'utf8' : (err && err.message);
    showError($('error'), OP_ERRORS[key] || 'İşlem sırasında beklenmeyen bir hata oluştu. Metni kontrol edip tekrar deneyin.');
  }
}

function announce(msg) {
  const live = $('live');
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = msg; });
}

// ---------- Olaylar ----------

input.addEventListener('input', () => { showError($('error'), null); renderStats(); });

document.querySelectorAll('[data-op]').forEach((btn) => {
  btn.addEventListener('click', () => apply(btn.dataset.op));
});

$('undo').addEventListener('click', () => {
  if (!history.length) return;
  input.value = history.pop();
  renderStats();
  announce('Geri alındı');
});

$('clear').addEventListener('click', () => {
  if (input.value) history.push(input.value);
  input.value = '';
  showError($('error'), null);
  renderStats();
  input.focus();
});

$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(input.value);
    announce('Panoya kopyalandı');
    const btn = $('copy'); const old = btn.textContent;
    btn.textContent = 'Kopyalandı';
    setTimeout(() => { btn.textContent = old; }, 1500);
  } catch {
    input.select();
    showError($('error'), 'Pano erişimi engellendi. Metin seçildi; Ctrl+C (Mac: Cmd+C) ile kopyalayabilirsiniz.');
  }
});

$('download').addEventListener('click', () => {
  const blob = new Blob([input.value], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'metin.txt');
});

$('paste').addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (!text) return;
    if (input.value) history.push(input.value);
    input.value = text;
    renderStats();
  } catch {
    input.focus();
    showError($('error'), 'Pano okunamadı. Metin alanına tıklayıp Ctrl+V (Mac: Cmd+V) ile yapıştırabilirsiniz.');
  }
});

renderStats();
