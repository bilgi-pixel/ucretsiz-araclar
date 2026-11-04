// Base64 / Hex / URL encoder and decoder (EN) — runs entirely in the browser; text and files are never sent anywhere.
import { createDropzone, downloadBlob, formatBytes, showError, setProgress, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const WARN_BYTES = 5 * 1024 * 1024;   // warn above 5 MB
const MAX_BYTES = 50 * 1024 * 1024;   // refuse above 50 MB

/* ---------- Pure helpers ---------- */

/** Converts bytes to Base64 in chunks so large files do not overflow the call stack. */
export function bytesToBase64(bytes, urlSafe = false) {
  let bin = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  let b64 = btoa(bin);
  if (urlSafe) b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return b64;
}

/** Encodes text as UTF-8 Base64 (accented and non-Latin characters are handled correctly). */
export function encodeText(text, urlSafe = false) {
  return bytesToBase64(new TextEncoder().encode(text), urlSafe);
}

/**
 * Decodes Base64 text (standard or URL-safe, optionally with a data URI prefix) to bytes.
 * Returns { bytes, mime } — mime is only set when a data URI was given.
 */
export function base64ToBytes(input) {
  let s = String(input ?? '').trim();
  let mime = '';
  const m = /^data:([^;,]*)((?:;[^;,]*)*),/i.exec(s);
  if (m) { mime = m[1].toLowerCase(); s = s.slice(m[0].length); }
  s = s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  if (!s) throw new Error('There is no Base64 text to decode. Paste the Base64 text or data URI into the box.');
  if (/[^A-Za-z0-9+/=]/.test(s)) throw new Error('Invalid Base64: only A-Z, a-z, 0-9, +, / and = are allowed. Make sure the text was copied completely and does not include quotes or other symbols.');
  s = s.replace(/=+$/, '');
  if (s.length % 4 === 1) throw new Error('Invalid Base64: the length does not add up, so the end of the text may be missing. Copy the source again from start to finish.');
  s += '='.repeat((4 - (s.length % 4)) % 4);
  let bin;
  try { bin = atob(s); } catch { throw new Error('Invalid Base64: it could not be decoded. Copy the text again.'); }
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { bytes, mime };
}

/** Decodes Base64 to UTF-8 text; throws when the bytes are not text. */
export function decodeText(input) {
  const { bytes } = base64ToBytes(input);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('This Base64 is not valid UTF-8 text; it probably holds the contents of a file such as an image or a PDF. Use the "Base64 → File" tab to download it as a file.');
  }
}

/** Guesses a MIME type from the file signature (magic bytes); null if unknown. */
export function sniffMime(b) {
  const at = (i, arr) => arr.every((v, k) => b[i + k] === v);
  if (b.length >= 8 && at(0, [0x89, 0x50, 0x4e, 0x47])) return 'image/png';
  if (b.length >= 3 && at(0, [0xff, 0xd8, 0xff])) return 'image/jpeg';
  if (b.length >= 6 && at(0, [0x47, 0x49, 0x46, 0x38])) return 'image/gif';
  if (b.length >= 12 && at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return 'image/webp';
  if (b.length >= 4 && at(0, [0x25, 0x50, 0x44, 0x46])) return 'application/pdf';
  if (b.length >= 4 && at(0, [0x50, 0x4b, 0x03, 0x04])) return 'application/zip';
  if (b.length >= 3 && at(0, [0x49, 0x44, 0x33])) return 'audio/mpeg';
  if (b.length >= 2 && at(0, [0x42, 0x4d])) return 'image/bmp';
  if (b.length >= 4 && at(0, [0x00, 0x00, 0x01, 0x00])) return 'image/x-icon';
  // SVG / HTML / JSON: look at the first bytes
  const head = new TextDecoder('utf-8').decode(b.subarray(0, 300)).trimStart().toLowerCase();
  if (head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))) return 'image/svg+xml';
  if (head.startsWith('<!doctype html') || head.startsWith('<html')) return 'text/html';
  if (head.startsWith('{') || head.startsWith('[')) return 'application/json';
  return null;
}

const EXT = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp', 'image/svg+xml': 'svg', 'image/bmp': 'bmp',
  'image/x-icon': 'ico', 'application/pdf': 'pdf', 'application/zip': 'zip', 'audio/mpeg': 'mp3', 'text/html': 'html',
  'application/json': 'json', 'text/plain': 'txt', 'text/csv': 'csv', 'application/octet-stream': 'bin',
};
export const extForMime = (mime) => EXT[mime] || 'bin';

export function hexEncode(text) {
  return Array.from(new TextEncoder().encode(text), (x) => x.toString(16).padStart(2, '0')).join(' ');
}
export function hexDecode(input) {
  const s = String(input).replace(/0x/gi, '').replace(/[\s,:\-]/g, '');
  if (!s) throw new Error('There is no hex text to decode. Example: 48 65 6c 6c 6f');
  if (/[^0-9a-fA-F]/.test(s)) throw new Error('Invalid hex: only 0-9 and a-f are allowed (spaces, commas and colons are fine).');
  if (s.length % 2) throw new Error('Invalid hex: the number of digits must be even because one byte is two hex digits. One digit is missing or extra.');
  const bytes = new Uint8Array(s.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { throw new Error('This hex string is not valid UTF-8 text; it may be binary data.'); }
}
export function urlDecode(input) {
  try { return decodeURIComponent(String(input).replace(/\+/g, ' ')); } catch { throw new Error('Invalid URL encoding: each % must be followed by two hex digits (for example %C3%BC). Check the text.'); }
}

/* ---------- UI ---------- */
if (typeof document !== 'undefined' && $('tabs')) {
  const error = $('error');
  const progress = $('progress');

  // Tabs
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    showError(error, '');
    $('warning').classList.remove('is-active');
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      let n = -1;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (n >= 0) { e.preventDefault(); tabs[n].focus(); selectTab(tabs[n]); }
    });
  });

  // Copy: Clipboard API first, then select + execCommand
  async function copyFrom(area) {
    const text = area.value;
    if (!text) { showError(error, 'There is nothing to copy yet. Encode or decode something first.'); return; }
    showError(error, '');
    try { await navigator.clipboard.writeText(text); } catch {
      area.focus(); area.select();
      try { document.execCommand('copy'); } catch { showError(error, 'Could not copy to the clipboard. Select the text and press Ctrl+C.'); return; }
    }
    $('copy-status').textContent = 'Copied to the clipboard.';
    setTimeout(() => { $('copy-status').textContent = ''; }, 2500);
  }
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyFrom($(b.dataset.copy))));

  const run = (fn) => () => { showError(error, ''); try { fn(); } catch (err) { showError(error, err.message); } };

  // 1) Text
  const tIn = $('t-input'), tOut = $('t-output');
  $('t-encode').addEventListener('click', run(() => {
    if (!tIn.value) throw new Error('There is no text to encode. Type some text into the box.');
    tOut.value = encodeText(tIn.value, $('t-urlsafe').checked);
  }));
  $('t-decode').addEventListener('click', run(() => { tOut.value = decodeText(tIn.value); }));
  $('t-clear').addEventListener('click', () => { tIn.value = ''; tOut.value = ''; showError(error, ''); tIn.focus(); });

  // 2) File → Base64
  let dataUri = '';
  const fOut = $('f-output');
  function renderFileOutput() {
    if (!dataUri) { fOut.value = ''; return; }
    fOut.value = $('f-raw').checked ? dataUri.slice(dataUri.indexOf(',') + 1) : dataUri;
  }
  $('f-raw').addEventListener('change', renderFileOutput);
  createDropzone({
    el: $('drop'), multiple: false,
    onFiles: async ([file]) => {
      showError(error, '');
      const warn = $('warning');
      warn.classList.remove('is-active');
      $('f-result').hidden = true;
      if (file.size > MAX_BYTES) { showError(error, `This file is ${formatBytes(file.size)}; files above 50 MB slow the browser down. Choose a smaller file or shrink it first.`); return; }
      if (file.size > WARN_BYTES) { warn.textContent = `This file is ${formatBytes(file.size)}. Base64 makes data about a third larger and the browser may slow down above 5 MB; expect a short wait.`; warn.classList.add('is-active'); }
      try {
        setProgress(progress, 20, 'Reading file…');
        await tick();
        const buf = new Uint8Array(await file.arrayBuffer());
        const mime = file.type || sniffMime(buf) || 'application/octet-stream';
        setProgress(progress, 70, 'Converting to Base64…');
        await tick();
        dataUri = `data:${mime};base64,${bytesToBase64(buf)}`;
        renderFileOutput();
        $('f-info').textContent = `${file.name} · ${mime} · ${formatBytes(file.size)} → Base64 ${formatBytes(dataUri.length)}`;
        const isImg = mime.startsWith('image/');
        $('f-img-box').hidden = !isImg;
        if (isImg) {
          $('f-preview').src = dataUri;
          const long = dataUri.length > 200000;
          const shown = long ? `data:${mime};base64,...` : dataUri;
          $('f-snip-img').value = long ? `<img src="${shown}" alt=""> <!-- copy the full address from the box above -->` : `<img src="${dataUri}" alt="">`;
          $('f-snip-css').value = long ? `background-image: url("${shown}"); /* copy the full address from the box above */` : `background-image: url("${dataUri}");`;
        }
        $('f-result').hidden = false;
      } catch (err) {
        showError(error, 'The file could not be read. Close any program that has the file open, then select it again.');
      } finally { setProgress(progress, null); }
    },
  });

  // 3) Base64 → File
  $('d-download').addEventListener('click', run(() => {
    const { bytes, mime } = base64ToBytes($('d-input').value);
    const type = mime || sniffMime(bytes) || 'application/octet-stream';
    const ext = extForMime(type);
    let name = $('d-name').value.trim().replace(/[\\/:*?"<>|]+/g, '-') || 'file';
    if (!/\.[A-Za-z0-9]{1,5}$/.test(name)) name += `.${ext}`;
    $('d-info').textContent = `Detected type: ${type} · ${formatBytes(bytes.length)} · file name: ${name}`;
    downloadBlob(new Blob([bytes], { type }), name);
  }));
  $('d-input').addEventListener('input', () => {
    try {
      const { bytes, mime } = base64ToBytes($('d-input').value);
      $('d-info').textContent = `Detected type: ${mime || sniffMime(bytes) || 'unknown (application/octet-stream)'} · ${formatBytes(bytes.length)}`;
    } catch { $('d-info').textContent = ''; }
  });

  // 4) Hex / URL
  const hIn = $('h-input'), hOut = $('h-output');
  $('h-hex-enc').addEventListener('click', run(() => { hOut.value = hexEncode(hIn.value); }));
  $('h-hex-dec').addEventListener('click', run(() => { hOut.value = hexDecode(hIn.value); }));
  $('h-url-enc').addEventListener('click', run(() => { hOut.value = encodeURIComponent(hIn.value); }));
  $('h-url-dec').addEventListener('click', run(() => { hOut.value = urlDecode(hIn.value); }));
}
