// Word Counter & Text Tools (EN) — runs entirely in the browser; your text is never uploaded.
import { downloadBlob, formatBytes, showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const LOCALE = 'en-US';
const READ_WPM = 238; // average adult silent reading speed in English
const SPEAK_WPM = 130; // typical speaking pace for presentations
const BIG_TEXT_LIMIT = 2 * 1024 * 1024; // warn above 2 MB
const history = []; // undo stack (last 20 states)

// ---------- Counters ----------

export function countWords(text) {
  const m = text.match(/[\p{L}\p{N}]+(?:['’\-.][\p{L}\p{N}]+)*/gu);
  return m ? m.length : 0;
}

function countSentences(text) {
  const t = text.trim();
  if (!t) return 0;
  // Pieces ending with a period, question mark, exclamation mark or ellipsis; a trailing piece without punctuation still counts.
  const parts = t.split(/[.!?…]+(?=\s|$)/u).map((s) => s.trim()).filter((s) => /[\p{L}\p{N}]/u.test(s));
  return parts.length;
}

function countParagraphs(text) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).length;
}

function countLines(text) {
  return text ? text.split('\n').length : 0;
}

export function formatTime(words, wpm) {
  if (!words) return '0 min';
  const minutes = words / wpm;
  if (minutes < 1) return `${Math.max(1, Math.round(minutes * 60))} sec`;
  return `${Math.ceil(minutes)} min`;
}

/** The most frequent words (3+ letters), lower-cased; common English stop words are skipped. */
const STOP = new Set('the and for are but not you all any can had her was one our out has have this that with from they will would there their what about which when your said each she how them than then these those into been were being does did its just also very more some such only over other while where who whom why'.split(' '));
export function topWords(text, limit = 5) {
  const counts = new Map();
  for (const w of text.toLowerCase().match(/[\p{L}][\p{L}'’-]*/gu) || []) {
    if (w.length < 3 || STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
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
    reading: formatTime(words, READ_WPM),
    speaking: formatTime(words, SPEAK_WPM),
    bytes: new TextEncoder().encode(text).length,
  };
}

function renderStats() {
  const s = computeStats(input.value);
  $('stat-chars').textContent = s.chars.toLocaleString(LOCALE);
  $('stat-chars-ns').textContent = s.charsNoSpace.toLocaleString(LOCALE);
  $('stat-words').textContent = s.words.toLocaleString(LOCALE);
  $('stat-sentences').textContent = s.sentences.toLocaleString(LOCALE);
  $('stat-paragraphs').textContent = s.paragraphs.toLocaleString(LOCALE);
  $('stat-lines').textContent = s.lines.toLocaleString(LOCALE);
  $('stat-reading').textContent = s.reading;
  $('stat-speaking').textContent = s.speaking;
  $('stat-bytes').textContent = formatBytes(s.bytes);
  const tw = topWords(input.value);
  $('top-words').textContent = tw.length ? tw.map(([w, n]) => `${w} (${n})`).join(', ') : 'none yet';
  $('actions').hidden = !input.value.length;
  $('undo').disabled = history.length === 0;
  if (s.bytes > BIG_TEXT_LIMIT) {
    showError($('error'), `The text is ${formatBytes(s.bytes)}; the browser may slow down. Work with smaller pieces instead.`);
  }
}

// ---------- Transformations ----------

/** Removes accents and diacritics (é → e, ñ → n, ü → u). */
export function stripAccents(text) {
  return text.replace(/ß/g, 'ss').replace(/[øØ]/g, (c) => (c === 'ø' ? 'o' : 'O')).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function slugify(text) {
  return stripAccents(text.toLowerCase()).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function titleCase(text) {
  return text.toLowerCase().replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (w) => {
    const first = Array.from(w)[0];
    return first.toUpperCase() + w.slice(first.length);
  });
}

export function sentenceCase(text) {
  const lower = text.toLowerCase();
  // The first letter of the text and the first letter after sentence-ending punctuation or a line break are capitalized.
  return lower.replace(/(^|[.!?…]\s+|\n\s*)(\p{L})/gu, (m, pre, ch) => pre + ch.toUpperCase());
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
  upper: (t) => t.toUpperCase(),
  lower: (t) => t.toLowerCase(),
  title: titleCase,
  sentence: sentenceCase,
  'strip-accents': stripAccents,
  slug: slugify,
  'sort-az': (t) => t.split('\n').sort((a, b) => a.localeCompare(b, LOCALE)).join('\n'),
  'sort-za': (t) => t.split('\n').sort((a, b) => b.localeCompare(a, LOCALE)).join('\n'),
  dedupe: (t) => { const seen = new Set(); return t.split('\n').filter((l) => !seen.has(l) && seen.add(l)).join('\n'); },
  'remove-empty': (t) => t.split('\n').filter((l) => l.trim()).join('\n'),
  'trim-spaces': (t) => t.split('\n').map((l) => l.replace(/[ \t ]+/g, ' ').trim()).join('\n'),
  'base64-encode': utf8ToBase64,
  'base64-decode': base64ToUtf8,
  'url-encode': (t) => encodeURIComponent(t),
  'url-decode': (t) => { try { return decodeURIComponent(t.replace(/\+/g, '%20')); } catch { throw new Error('url'); } },
  reverse: (t) => Array.from(t).reverse().join(''),
};

const OP_ERRORS = {
  base64: 'The text is not valid Base64. It should contain only A–Z, a–z, 0–9, + and / characters; part of it may have been cut off when you copied it.',
  url: 'The URL could not be decoded: each "%" must be followed by two hex digits. Paste the complete text and try again.',
  utf8: 'The decoded data is not UTF-8 text; this Base64 may belong to a file such as an image or a PDF.',
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
    announce(`${$(`op-${op}`).textContent} applied`);
  } catch (err) {
    const key = err instanceof TypeError ? 'utf8' : (err && err.message);
    showError($('error'), OP_ERRORS[key] || 'Something unexpected went wrong. Check the text and try again.');
  }
}

function announce(msg) {
  const live = $('live');
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = msg; });
}

// ---------- Events ----------

input.addEventListener('input', () => { showError($('error'), null); renderStats(); });

document.querySelectorAll('[data-op]').forEach((btn) => {
  btn.addEventListener('click', () => apply(btn.dataset.op));
});

$('undo').addEventListener('click', () => {
  if (!history.length) return;
  input.value = history.pop();
  renderStats();
  announce('Undone');
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
    announce('Copied to the clipboard');
    const btn = $('copy'); const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = old; }, 1500);
  } catch {
    input.select();
    showError($('error'), 'Clipboard access was blocked. The text is selected; press Ctrl+C (Mac: Cmd+C) to copy it.');
  }
});

$('download').addEventListener('click', () => {
  const blob = new Blob([input.value], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'text.txt');
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
    showError($('error'), 'The clipboard could not be read. Click into the text box and press Ctrl+V (Mac: Cmd+V) to paste.');
  }
});

renderStats();
