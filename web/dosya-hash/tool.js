// Dosya Hash Hesaplama — MD5, SHA-1, SHA-256, SHA-512.
// Tüm hesap tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
// Dosyalar parça parça (4 MB) okunur ve artımlı (incremental) saf JS özetleyicilerle işlenir;
// böylece çok büyük dosyalar belleği doldurmaz. Metin için SHA'larda WebCrypto kullanılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const CHUNK = 4 * 1024 * 1024;
const BIG_FILE = 50 * 1024 * 1024;
const ALGOS = ['md5', 'sha1', 'sha256', 'sha512'];
const LABEL = { md5: 'MD5', sha1: 'SHA-1', sha256: 'SHA-256', sha512: 'SHA-512' };

/* ---------- Sabitler: asal sayıların kök değerlerinden türetilir (SHA-2 tanımı) ---------- */
function primes(n) { const p = []; for (let i = 2; p.length < n; i++) if (p.every((q) => i % q)) p.push(i); return p; }
function iroot(n, k) { // BigInt tamsayı k'ıncı kök (Newton)
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / k) + 1);
  for (;;) {
    const y = ((BigInt(k) - 1n) * x + n / x ** (BigInt(k) - 1n)) / BigInt(k);
    if (y >= x) return x;
    x = y;
  }
}
const P = primes(80);
const frac = (v, bits) => v & ((1n << BigInt(bits)) - 1n);
const K256 = Uint32Array.from(P.slice(0, 64), (p) => Number(frac(iroot(BigInt(p) << 96n, 3), 32)));
const H256 = Uint32Array.from(P.slice(0, 8), (p) => Number(frac(iroot(BigInt(p) << 64n, 2), 32)));
const K512 = new Uint32Array(160); // hi, lo çiftleri
P.forEach((p, i) => { const v = frac(iroot(BigInt(p) << 192n, 3), 64); K512[2 * i] = Number(v >> 32n); K512[2 * i + 1] = Number(v & 0xffffffffn); });
const H512 = new Uint32Array(16);
P.slice(0, 8).forEach((p, i) => { const v = frac(iroot(BigInt(p) << 128n, 2), 64); H512[2 * i] = Number(v >> 32n); H512[2 * i + 1] = Number(v & 0xffffffffn); });

// MD5 sabitleri (RFC 1321): K[i] = floor(2^32 * |sin(i+1)|)
const K_MD5 = Uint32Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296));
const S_MD5 = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];

const rotl = (x, n) => (x << n) | (x >>> (32 - n));
const rotr32 = (x, n) => (x >>> n) | (x << (32 - n));

/* ---------- Sıkıştırma fonksiyonları: (state, dataView, offset) ---------- */
const M_MD5 = new Uint32Array(16);
function md5Block(st, dv, o) {
  const M = M_MD5;
  for (let i = 0; i < 16; i++) M[i] = dv.getUint32(o + i * 4, true);
  let a = st[0], b = st[1], c = st[2], d = st[3];
  for (let i = 0; i < 64; i++) {
    let f, g;
    if (i < 16) { f = (b & c) | (~b & d); g = i; }
    else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) & 15; }
    else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) & 15; }
    else { f = c ^ (b | ~d); g = (7 * i) & 15; }
    const t = d; d = c; c = b;
    b = (b + rotl((a + f + K_MD5[i] + M[g]) | 0, S_MD5[(i >> 4) * 4 + (i & 3)])) | 0;
    a = t;
  }
  st[0] += a; st[1] += b; st[2] += c; st[3] += d;
}

const W1 = new Uint32Array(80);
function sha1Block(st, dv, o) {
  const w = W1;
  for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4, false);
  for (let i = 16; i < 80; i++) w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
  let a = st[0], b = st[1], c = st[2], d = st[3], e = st[4];
  for (let i = 0; i < 80; i++) {
    let f, k;
    if (i < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
    else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
    else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
    else { f = b ^ c ^ d; k = 0xca62c1d6; }
    const t = (rotl(a, 5) + f + e + k + w[i]) | 0;
    e = d; d = c; c = rotl(b, 30); b = a; a = t;
  }
  st[0] += a; st[1] += b; st[2] += c; st[3] += d; st[4] += e;
}

const W256 = new Uint32Array(64);
function sha256Block(st, dv, o) {
  const w = W256;
  for (let i = 0; i < 16; i++) w[i] = dv.getUint32(o + i * 4, false);
  for (let i = 16; i < 64; i++) {
    const s0 = rotr32(w[i - 15], 7) ^ rotr32(w[i - 15], 18) ^ (w[i - 15] >>> 3);
    const s1 = rotr32(w[i - 2], 17) ^ rotr32(w[i - 2], 19) ^ (w[i - 2] >>> 10);
    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
  }
  let a = st[0], b = st[1], c = st[2], d = st[3], e = st[4], f = st[5], g = st[6], h = st[7];
  for (let i = 0; i < 64; i++) {
    const S1 = rotr32(e, 6) ^ rotr32(e, 11) ^ rotr32(e, 25);
    const ch = (e & f) ^ (~e & g);
    const t1 = (h + S1 + ch + K256[i] + w[i]) | 0;
    const S0 = rotr32(a, 2) ^ rotr32(a, 13) ^ rotr32(a, 22);
    const maj = (a & b) ^ (a & c) ^ (b & c);
    const t2 = (S0 + maj) | 0;
    h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
  }
  st[0] += a; st[1] += b; st[2] += c; st[3] += d; st[4] += e; st[5] += f; st[6] += g; st[7] += h;
}

// SHA-512: 64 bit değerler (hi, lo) 32 bit çiftleri olarak tutulur.
let rh = 0, rl = 0;
function rotr64(h, l, n) {
  if (n === 32) { rh = l; rl = h; }
  else if (n < 32) { rh = (h >>> n) | (l << (32 - n)); rl = (l >>> n) | (h << (32 - n)); }
  else { const m = n - 32; rh = (l >>> m) | (h << (32 - m)); rl = (h >>> m) | (l << (32 - m)); }
}
function shr64(h, l, n) { rh = h >>> n; rl = (l >>> n) | (h << (32 - n)); }
/** Üç dönme/kaydırmanın XOR'u: sonuç rh, rl içinde. */
function sig(h, l, a, b, c, shift) {
  rotr64(h, l, a); let xh = rh, xl = rl;
  rotr64(h, l, b); xh ^= rh; xl ^= rl;
  if (shift) shr64(h, l, c); else rotr64(h, l, c);
  rh ^= xh; rl ^= xl;
}
const WH = new Int32Array(80), WL = new Int32Array(80);
function sha512Block(st, dv, o) {
  for (let i = 0; i < 16; i++) { WH[i] = dv.getInt32(o + i * 8, false); WL[i] = dv.getInt32(o + i * 8 + 4, false); }
  for (let i = 16; i < 80; i++) {
    sig(WH[i - 15], WL[i - 15], 1, 8, 7, true); const s0h = rh, s0l = rl;
    sig(WH[i - 2], WL[i - 2], 19, 61, 6, true); const s1h = rh, s1l = rl;
    const lo = (WL[i - 16] >>> 0) + (WL[i - 7] >>> 0) + (s0l >>> 0) + (s1l >>> 0);
    WL[i] = lo | 0; WH[i] = (WH[i - 16] + WH[i - 7] + s0h + s1h + Math.floor(lo / 4294967296)) | 0;
  }
  let ah = st[0] | 0, al = st[1] | 0, bh = st[2] | 0, bl = st[3] | 0, ch = st[4] | 0, cl = st[5] | 0, dh = st[6] | 0, dl = st[7] | 0;
  let eh = st[8] | 0, el = st[9] | 0, fh = st[10] | 0, fl = st[11] | 0, gh = st[12] | 0, gl = st[13] | 0, hh = st[14] | 0, hl = st[15] | 0;
  for (let i = 0; i < 80; i++) {
    sig(eh, el, 14, 18, 41, false); const S1h = rh, S1l = rl;
    const chh = (eh & fh) ^ (~eh & gh), chl = (el & fl) ^ (~el & gl);
    const lo1 = (hl >>> 0) + (S1l >>> 0) + (chl >>> 0) + K512[2 * i + 1] + (WL[i] >>> 0);
    const t1l = lo1 | 0;
    const t1h = (hh + S1h + chh + (K512[2 * i] | 0) + WH[i] + Math.floor(lo1 / 4294967296)) | 0;
    sig(ah, al, 28, 34, 39, false); const S0h = rh, S0l = rl;
    const mjh = (ah & bh) ^ (ah & ch) ^ (bh & ch), mjl = (al & bl) ^ (al & cl) ^ (bl & cl);
    const lo2 = (S0l >>> 0) + (mjl >>> 0);
    const t2l = lo2 | 0, t2h = (S0h + mjh + Math.floor(lo2 / 4294967296)) | 0;
    hh = gh; hl = gl; gh = fh; gl = fl; fh = eh; fl = el;
    const loe = (dl >>> 0) + (t1l >>> 0); el = loe | 0; eh = (dh + t1h + Math.floor(loe / 4294967296)) | 0;
    dh = ch; dl = cl; ch = bh; cl = bl; bh = ah; bl = al;
    const loa = (t1l >>> 0) + (t2l >>> 0); al = loa | 0; ah = (t1h + t2h + Math.floor(loa / 4294967296)) | 0;
  }
  const add = (idx, h, l) => { const lo = (st[idx + 1] >>> 0) + (l >>> 0); st[idx + 1] = lo; st[idx] = (st[idx] + h + Math.floor(lo / 4294967296)) >>> 0; };
  add(0, ah, al); add(2, bh, bl); add(4, ch, cl); add(6, dh, dl); add(8, eh, el); add(10, fh, fl); add(12, gh, gl); add(14, hh, hl);
}

/* ---------- Artımlı özetleyici ---------- */
const SPECS = {
  md5: { block: 64, little: true, init: () => Uint32Array.of(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476), fn: md5Block },
  sha1: { block: 64, little: false, init: () => Uint32Array.of(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0), fn: sha1Block },
  sha256: { block: 64, little: false, init: () => Uint32Array.from(H256), fn: sha256Block },
  sha512: { block: 128, little: false, init: () => Uint32Array.from(H512), fn: sha512Block },
};
const hex8 = (x) => (x >>> 0).toString(16).padStart(8, '0');
const swap32 = (x) => ((x & 0xff) << 24) | ((x & 0xff00) << 8) | ((x >>> 8) & 0xff00) | (x >>> 24);

export function createHasher(name) {
  const spec = SPECS[name];
  const st = spec.init();
  const buf = new Uint8Array(spec.block);
  const bdv = new DataView(buf.buffer);
  let pos = 0, total = 0;
  return {
    update(data) {
      total += data.length;
      let i = 0;
      if (pos) {
        const n = Math.min(spec.block - pos, data.length);
        buf.set(data.subarray(0, n), pos); pos += n; i = n;
        if (pos === spec.block) { spec.fn(st, bdv, 0); pos = 0; }
      }
      if (i + spec.block <= data.length) {
        const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
        for (; i + spec.block <= data.length; i += spec.block) spec.fn(st, dv, i);
      }
      if (i < data.length) { buf.set(data.subarray(i), 0); pos = data.length - i; }
    },
    digest() {
      buf[pos++] = 0x80;
      if (pos > spec.block - (spec.block === 128 ? 16 : 8)) { buf.fill(0, pos); spec.fn(st, bdv, 0); pos = 0; }
      buf.fill(0, pos);
      const bits = total * 8;
      const hi = Math.floor(bits / 4294967296), lo = bits >>> 0;
      if (spec.little) { bdv.setUint32(spec.block - 8, lo, true); bdv.setUint32(spec.block - 4, hi, true); }
      else { bdv.setUint32(spec.block - 8, hi, false); bdv.setUint32(spec.block - 4, lo, false); }
      spec.fn(st, bdv, 0);
      return Array.from(st, (w) => hex8(spec.little ? swap32(w) : w)).join('');
    },
  };
}

/** Küçük girdiler için tek seferde özet (test ve metin için). */
export function hashBytes(name, bytes) { const h = createHasher(name); h.update(bytes); return h.digest(); }

/* ---------- Arayüz durumu ---------- */
let files = []; // File[]
let rows = []; // { name, size, hashes: {algo: hex}, status }
let runToken = 0;

function selectedAlgos() { return ALGOS.filter((a) => $('alg-' + a).checked); }

function normalizeHash(s) { return String(s).replace(/[\s:-]/g, '').toLowerCase(); }
function expectedState() {
  const raw = normalizeHash($('expected').value);
  if (!raw) return { raw: '', valid: false, empty: true };
  return { raw, valid: /^[0-9a-f]+$/.test(raw) && [32, 40, 64, 128].includes(raw.length), empty: false };
}
function matchOf(hashes, exp) {
  for (const [a, h] of Object.entries(hashes)) if (h === exp.raw) return LABEL[a];
  return null;
}

function renderExpectedNote() {
  const e = expectedState();
  const el = $('expected-note');
  if (e.empty) { el.textContent = ''; el.className = 'hint'; return; }
  if (!e.valid) { el.textContent = 'Beklenen hash geçersiz: yalnızca 0-9 ve a-f karakterleri içermeli ve 32 (MD5), 40 (SHA-1), 64 (SHA-256) ya da 128 (SHA-512) karakter olmalı.'; el.className = 'hint rs-bad'; return; }
  el.textContent = ''; el.className = 'hint';
}

function renderFiles() {
  const exp = expectedState();
  const algos = selectedAlgos();
  const body = $('f-body');
  const head = $('f-head');
  head.replaceChildren(...['Dosya', 'Boyut', ...algos.map((a) => LABEL[a]), 'Karşılaştırma'].map((t) => { const th = document.createElement('th'); th.scope = 'col'; th.textContent = t; return th; }));
  body.replaceChildren(...rows.map((r) => {
    const tr = document.createElement('tr');
    tr.dataset.name = r.name;
    const td = (txt, cls) => { const c = document.createElement('td'); if (cls) c.className = cls; c.textContent = txt; tr.appendChild(c); return c; };
    td(r.name); td(formatBytes(r.size));
    for (const a of algos) { const c = td(r.hashes[a] || (r.error ? '–' : '…'), 'rs-hash'); c.dataset.algo = a; }
    const st = td('');
    if (r.error) st.textContent = r.error;
    else if (exp.valid && Object.keys(r.hashes).length) {
      const m = matchOf(r.hashes, exp);
      st.textContent = m ? `Eşleşti (${m})` : 'Eşleşmedi';
      st.className = m ? 'rs-ok' : 'rs-bad';
      st.dataset.match = m ? '1' : '0';
    }
    return tr;
  }));
  $('f-wrap').hidden = !rows.length;
  $('f-actions').hidden = !rows.some((r) => Object.keys(r.hashes).length);
}

async function runFiles() {
  const token = ++runToken;
  const algos = selectedAlgos();
  showError($('error'), null);
  if (!files.length) { rows = []; renderFiles(); setProgress($('progress'), null); return; }
  if (!algos.length) { showError($('error'), 'En az bir algoritma seçin (örneğin SHA-256).'); return; }
  rows = files.map((f) => ({ name: f.name, size: f.size, hashes: {} }));
  renderFiles();
  const totalBytes = files.reduce((s, f) => s + f.size, 0) || 1;
  let done = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    try {
      const hs = algos.map((a) => createHasher(a));
      for (let off = 0; off < f.size; off += CHUNK) {
        if (token !== runToken) return;
        const part = new Uint8Array(await f.slice(off, off + CHUNK).arrayBuffer());
        for (const h of hs) h.update(part);
        done += part.length;
        setProgress($('progress'), (done / totalBytes) * 100, `${f.name} işleniyor… %${Math.round((done / totalBytes) * 100)}`);
        await tick();
      }
      algos.forEach((a, k) => { rows[i].hashes[a] = hs[k].digest(); });
    } catch {
      rows[i].error = 'Okunamadı: dosya taşınmış, silinmiş ya da klasör olabilir. Dosyayı yeniden seçin.';
    }
    renderFiles();
  }
  if (token === runToken) setProgress($('progress'), null);
}

function addFiles(list) {
  const big = list.find((f) => f.size >= BIG_FILE);
  if (big) { $('warning').textContent = `"${big.name}" ${formatBytes(big.size)}; büyük dosyalarda hesap birkaç dakika sürebilir. Sekmeyi kapatmayın.`; $('warning').classList.add('is-active'); }
  files = files.concat(list);
  runFiles();
}

createDropzone({ el: $('drop'), multiple: true, onFiles: addFiles });
for (const a of ALGOS) $('alg-' + a).addEventListener('change', () => { runFiles(); runText(); });
$('expected').addEventListener('input', () => { renderExpectedNote(); renderFiles(); renderText(); });
$('clear').addEventListener('click', () => { files = []; rows = []; runToken++; $('warning').classList.remove('is-active'); showError($('error'), null); setProgress($('progress'), null); renderFiles(); });

function resultLines() {
  const lines = [];
  for (const r of rows) for (const [a, h] of Object.entries(r.hashes)) lines.push({ name: r.name, size: r.size, algo: LABEL[a], hash: h });
  return lines;
}
$('copy-res').addEventListener('click', async (e) => {
  const txt = resultLines().map((l) => `${l.hash}  ${l.algo}  ${l.name}`).join('\n');
  try { await navigator.clipboard.writeText(txt); } catch { const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch { /* yoksay */ } t.remove(); }
  const b = e.currentTarget; const old = b.dataset.label || b.textContent; b.dataset.label = old; b.textContent = 'Kopyalandı'; setTimeout(() => { b.textContent = old; }, 1500);
});
$('dl-csv').addEventListener('click', () => {
  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const csv = '﻿dosya,boyut_bayt,algoritma,hash\r\n' + resultLines().map((l) => [q(l.name), l.size, q(l.algo), q(l.hash)].join(',')).join('\r\n') + '\r\n';
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'hash-sonuclari.csv');
});

/* ---------- Metin sekmesi ---------- */
let textToken = 0;
let textHashes = {};
async function digestText(algo, bytes) {
  if (algo !== 'md5' && globalThis.crypto && crypto.subtle) {
    const name = { sha1: 'SHA-1', sha256: 'SHA-256', sha512: 'SHA-512' }[algo];
    const buf = await crypto.subtle.digest(name, bytes);
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return hashBytes(algo, bytes);
}
async function runText() {
  const token = ++textToken;
  const bytes = new TextEncoder().encode($('t-in').value);
  const out = {};
  for (const a of selectedAlgos()) out[a] = await digestText(a, bytes);
  if (token !== textToken) return;
  textHashes = out;
  renderText();
}
function renderText() {
  const exp = expectedState();
  const algos = selectedAlgos();
  $('t-out').replaceChildren(...algos.filter((a) => textHashes[a]).map((a) => {
    const div = document.createElement('div'); div.className = 'rs-trow'; div.dataset.algo = a;
    const lab = document.createElement('strong'); lab.textContent = LABEL[a];
    const code = document.createElement('code'); code.className = 'rs-hash'; code.textContent = textHashes[a];
    div.append(lab, code);
    if (exp.valid && exp.raw.length === textHashes[a].length) {
      const s = document.createElement('span'); const ok = exp.raw === textHashes[a];
      s.textContent = ok ? 'Eşleşti' : 'Eşleşmedi'; s.className = ok ? 'rs-ok' : 'rs-bad'; s.dataset.match = ok ? '1' : '0'; div.appendChild(s);
    }
    return div;
  }));
}
$('t-in').addEventListener('input', runText);
$('t-copy').addEventListener('click', async (e) => {
  const txt = selectedAlgos().filter((a) => textHashes[a]).map((a) => `${LABEL[a]}: ${textHashes[a]}`).join('\n');
  try { await navigator.clipboard.writeText(txt); } catch { /* pano izni yok */ }
  const b = e.currentTarget; const old = b.dataset.label || b.textContent; b.dataset.label = old; b.textContent = 'Kopyalandı'; setTimeout(() => { b.textContent = old; }, 1500);
});

/* ---------- Sekmeler ---------- */
function showTab(name) {
  for (const t of ['file', 'text']) {
    $('tab-' + t).setAttribute('aria-selected', String(t === name));
    $('tab-' + t).tabIndex = t === name ? 0 : -1;
    $('panel-' + t).hidden = t !== name;
  }
}
for (const t of ['file', 'text']) {
  $('tab-' + t).addEventListener('click', () => showTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const o = t === 'file' ? 'text' : 'file'; showTab(o); $('tab-' + o).focus(); }
  });
}

renderFiles();
runText();
