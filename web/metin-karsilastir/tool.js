// Metin Karşılaştırma — saf JS Myers diff (kütüphane yok). Metin tarayıcıdan çıkmaz.
// Büyük girdilerde arayüzü dondurmamak için her N adımda tick() ile nefes verilir.
import { createDropzone, showError, formatBytes, setProgress, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_D = 3000;        // Myers'te izin verilen en fazla fark sayısı (bellek: ~D² / 2)
const CONTEXT = 3;         // satır görünümünde değişikliğin çevresindeki bağlam satırı
const ROW_CHUNK = 800;     // DOM'a parça parça eklenen satır sayısı

let lastOps = null;        // son karşılaştırmanın sonucu (kopyalama / görünüm değişimi için)
let lastLevel = 'line';
let running = false;

/* ---------- Ayrıştırma ---------- */
function splitLines(text) {
  if (!text) return [];
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  if (lines[lines.length - 1] === '') lines.pop(); // sondaki satır sonu fazladan satır sayılmaz
  return lines;
}
function splitWords(text) {
  return text.replace(/\r\n?/g, '\n').match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) || [];
}
function splitChars(text) {
  return Array.from(text.replace(/\r\n?/g, '\n'));
}

/** Karşılaştırma anahtarı: seçeneklere göre normalleştirilmiş token. */
function makeKey(level, opts) {
  return (t) => {
    let k = t;
    if (opts.ignoreCase) k = k.toLocaleLowerCase('tr');
    if (opts.ignoreSpace) {
      if (level === 'line') k = k.replace(/\s+/g, ' ').trim();
      else if (/^\s+$/.test(k)) k = '';
    }
    return k;
  };
}

/* ---------- Myers diff (iz saklamalı, D sınırlı) ---------- */
/**
 * a, b: tamsayı dizileri. Döner: [{ t: 'eq'|'del'|'add', i, j }] ya da null (D sınırı aşıldı).
 * i: a içindeki, j: b içindeki indeks (ilgili olmayan taraf -1).
 */
async function myers(a, b, onTick) {
  const n = a.length, m = b.length;
  const max = Math.min(n + m, MAX_D);
  const off = max + 1;
  let v = new Int32Array(2 * max + 3);
  const trace = [];
  let found = -1;
  for (let d = 0; d <= max; d++) {
    trace.push(v.slice(off - d - 1, off + d + 2));
    for (let k = -d; k <= d; k += 2) {
      let x;
      if (k === -d || (k !== d && v[off + k - 1] < v[off + k + 1])) x = v[off + k + 1];
      else x = v[off + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) { x++; y++; }
      v[off + k] = x;
      if (x >= n && y >= m) { found = d; break; }
    }
    if (found >= 0) break;
    if ((d & 63) === 0 && onTick) await onTick(d / max);
  }
  if (found < 0) return null;
  // Geri izleme
  const ops = [];
  let x = n, y = m;
  for (let d = found; d > 0; d--) {
    const vv = trace[d]; // trace[d] = d adımı BAŞINDAKİ v: indeks k için vv[k - (-d-1)] = vv[k + d + 1]
    const get = (k) => vv[k + d + 1];
    const k = x - y;
    let prevK;
    if (k === -d || (k !== d && get(k - 1) < get(k + 1))) prevK = k + 1; else prevK = k - 1;
    const prevX = get(prevK);
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) { x--; y--; ops.push({ t: 'eq', i: x, j: y }); }
    if (x === prevX) { y--; ops.push({ t: 'add', i: -1, j: y }); }
    else { x--; ops.push({ t: 'del', i: x, j: -1 }); }
  }
  while (x > 0 && y > 0) { x--; y--; ops.push({ t: 'eq', i: x, j: y }); }
  return ops.reverse();
}

/** Tokenleri tamsayıya eşler, ortak baş/son kısmı atar, Myers'i orta kısma uygular. */
async function diffTokens(aTok, bTok, keyFn, onTick) {
  const map = new Map();
  const id = (t) => { const k = keyFn(t); let v = map.get(k); if (v === undefined) { v = map.size; map.set(k, v); } return v; };
  const a = aTok.map(id), b = bTok.map(id);
  let s = 0;
  while (s < a.length && s < b.length && a[s] === b[s]) s++;
  let ea = a.length, eb = b.length;
  while (ea > s && eb > s && a[ea - 1] === b[eb - 1]) { ea--; eb--; }
  const ops = [];
  for (let i = 0; i < s; i++) ops.push({ t: 'eq', i, j: i });
  let truncated = false;
  const midA = a.slice(s, ea), midB = b.slice(s, eb);
  let mid;
  if (!midA.length) mid = midB.map((_, j) => ({ t: 'add', i: -1, j }));
  else if (!midB.length) mid = midA.map((_, i) => ({ t: 'del', i, j: -1 }));
  else mid = await myers(midA, midB, onTick);
  if (!mid) {
    // Çok fazla fark: tüm orta bölümü sil+ekle olarak işaretle
    truncated = true;
    mid = [...midA.map((_, i) => ({ t: 'del', i, j: -1 })), ...midB.map((_, j) => ({ t: 'add', i: -1, j }))];
  }
  for (const o of mid) ops.push({ t: o.t, i: o.i >= 0 ? o.i + s : -1, j: o.j >= 0 ? o.j + s : -1 });
  for (let q = 0; q < a.length - ea; q++) ops.push({ t: 'eq', i: ea + q, j: eb + q });
  return { ops, truncated };
}

/* ---------- Görünüm ---------- */
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

/** Satır düzeyi: bağlam dışındaki aynı satırları gizleyen satır listesi üretir. */
function buildLineRows(ops, A, B) {
  // Önce silme/ekleme bloklarını yan yana eşleştir
  const rows = []; // { kind: 'eq'|'chg'|'gap', l, r, ln, rn, count }
  let idx = 0;
  while (idx < ops.length) {
    const o = ops[idx];
    if (o.t === 'eq') { rows.push({ kind: 'eq', l: A[o.i], r: B[o.j], ln: o.i + 1, rn: o.j + 1 }); idx++; continue; }
    const dels = [], adds = [];
    while (idx < ops.length && ops[idx].t !== 'eq') { (ops[idx].t === 'del' ? dels : adds).push(ops[idx]); idx++; }
    const len = Math.max(dels.length, adds.length);
    for (let q = 0; q < len; q++) {
      const d = dels[q], a = adds[q];
      rows.push({ kind: 'chg', l: d ? A[d.i] : null, r: a ? B[a.j] : null, ln: d ? d.i + 1 : null, rn: a ? a.j + 1 : null });
    }
  }
  // Bağlam dışını boşluk satırlarına topla
  const keep = new Array(rows.length).fill(false);
  rows.forEach((r, i) => { if (r.kind === 'chg') for (let k = Math.max(0, i - CONTEXT); k <= Math.min(rows.length - 1, i + CONTEXT); k++) keep[k] = true; });
  const out = [];
  for (let i = 0; i < rows.length;) {
    if (keep[i]) { out.push(rows[i]); i++; continue; }
    let j = i;
    while (j < rows.length && !keep[j]) j++;
    out.push({ kind: 'gap', hidden: rows.slice(i, j) });
    i = j;
  }
  return out;
}

function lineCell(cls, num, sign, text) {
  const td = el('div', `md-cell ${cls}`);
  td.appendChild(el('span', 'md-num', num == null ? '' : String(num)));
  td.appendChild(el('span', 'md-sign', sign));
  td.appendChild(el('span', 'md-text', text == null ? '' : text));
  return td;
}

function renderLineRow(r, mode, parent) {
  if (mode === 'side') {
    const row = el('div', 'md-row md-side');
    if (r.kind === 'eq') { row.append(lineCell('md-eq', r.ln, ' ', r.l), lineCell('md-eq', r.rn, ' ', r.r)); }
    else {
      row.append(lineCell(r.l == null ? 'md-empty' : 'md-del', r.ln, r.l == null ? '' : '−', r.l), lineCell(r.r == null ? 'md-empty' : 'md-add', r.rn, r.r == null ? '' : '+', r.r));
    }
    parent.appendChild(row);
  } else if (r.kind === 'eq') {
    const row = el('div', 'md-row'); row.appendChild(lineCell('md-eq', r.rn, ' ', r.r)); parent.appendChild(row);
  } else {
    if (r.l != null) { const row = el('div', 'md-row'); row.appendChild(lineCell('md-del', r.ln, '−', r.l)); parent.appendChild(row); }
    if (r.r != null) { const row = el('div', 'md-row'); row.appendChild(lineCell('md-add', r.rn, '+', r.r)); parent.appendChild(row); }
  }
}

async function renderLines(ops, A, B, mode, host) {
  const rows = buildLineRows(ops, A, B);
  let n = 0;
  for (const r of rows) {
    if (r.kind === 'gap') {
      const btn = el('button', 'md-gap', `⋯ ${r.hidden.length} aynı satır gizlendi — göstermek için tıklayın`);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        const frag = document.createDocumentFragment();
        r.hidden.forEach((h) => renderLineRow(h, mode, frag));
        btn.replaceWith(frag);
      });
      host.appendChild(btn);
    } else renderLineRow(r, mode, host);
    if (++n % ROW_CHUNK === 0) await tick();
  }
}

/** Kelime/karakter düzeyi: satır içi (birleşik) ya da iki sütun. */
async function renderInline(ops, A, B, mode, host) {
  const make = (items, cls) => {
    const pre = el('div', `md-inline ${cls || ''}`);
    return pre;
  };
  const flush = (pre, buf, cls) => {
    if (!buf) return;
    const s = el('span', cls, buf);
    pre.appendChild(s);
  };
  const build = (filter) => {
    const pre = make();
    let cur = '', curCls = null, count = 0;
    for (const o of ops) {
      let cls = null, text = null;
      if (o.t === 'eq') { cls = ''; text = filter === 'left' ? A[o.i] : B[o.j]; }
      else if (o.t === 'del' && filter !== 'right') { cls = 'md-del'; text = A[o.i]; }
      else if (o.t === 'add' && filter !== 'left') { cls = 'md-add'; text = B[o.j]; }
      if (text == null) continue;
      if (cls !== curCls) { flush(pre, cur, curCls); cur = ''; curCls = cls; }
      cur += text;
      if (++count % 20000 === 0) { /* uzun metinde DOM'u küçük tut */ }
    }
    flush(pre, cur, curCls);
    return pre;
  };
  if (mode === 'side') {
    const wrap = el('div', 'md-cols');
    const l = el('div', 'md-col'); l.appendChild(el('div', 'md-colh', 'Özgün (silinenler işaretli)')); l.appendChild(build('left'));
    const r = el('div', 'md-col'); r.appendChild(el('div', 'md-colh', 'Yeni (eklenenler işaretli)')); r.appendChild(build('right'));
    wrap.append(l, r); host.appendChild(wrap);
  } else host.appendChild(build('both'));
  await tick();
}

/* ---------- Karşılaştırma ---------- */
function getOptions() {
  return {
    level: $('opt-level').value,
    ignoreCase: $('opt-case').checked,
    ignoreSpace: $('opt-space').checked,
    mode: document.querySelector('input[name="opt-view"]:checked').value,
  };
}

const NOUN = { line: 'satır', word: 'kelime/parça', char: 'karakter' };

async function compare() {
  if (running) return;
  running = true;
  const btn = $('compare');
  btn.disabled = true;
  showError($('error'), null);
  const out = $('output');
  const opts = getOptions();
  const aText = $('text-a').value, bText = $('text-b').value;
  try {
    if (!aText && !bText) {
      showError($('error'), 'İki metin kutusu da boş. Karşılaştırmak için iki metni yapıştırın ya da .txt dosyalarını kutulara bırakın.');
      $('result').classList.remove('is-active');
      return;
    }
    out.textContent = '';
    setProgress($('progress'), 0, 'Karşılaştırılıyor…');
    await tick();
    const split = { line: splitLines, word: splitWords, char: splitChars }[opts.level];
    const A = split(aText), B = split(bText);
    const { ops, truncated } = await diffTokens(A, B, makeKey(opts.level, opts), async (p) => {
      setProgress($('progress'), Math.min(95, Math.round(p * 100)), 'Karşılaştırılıyor…');
      await tick();
    });
    lastOps = { ops, A, B };
    lastLevel = opts.level;
    const add = ops.filter((o) => o.t === 'add').length;
    const del = ops.filter((o) => o.t === 'del').length;
    const same = ops.length - add - del;
    // Özet
    $('stat-add').textContent = String(add);
    $('stat-del').textContent = String(del);
    $('stat-same').textContent = String(same);
    $('stat-unit').textContent = NOUN[opts.level];
    $('summary-text').textContent = add === 0 && del === 0
      ? 'Metinler aynı: hiç fark bulunamadı.'
      : `${add} ${NOUN[opts.level]} eklendi, ${del} ${NOUN[opts.level]} silindi, ${same} ${NOUN[opts.level]} aynı.`;
    if (truncated) showError($('error'), `İki metin birbirinden çok farklı olduğu için ayrıntılı eşleştirme yapılmadı; ortadaki bölüm tamamen "silindi + eklendi" gösteriliyor. Daha anlamlı sonuç için metinleri bölümlere ayırın ya da "Satır" düzeyini deneyin.`);
    out.className = `md-out ${opts.mode === 'side' ? 'is-side' : 'is-uni'}`;
    out.textContent = '';
    if (opts.level === 'line') await renderLines(ops, A, B, opts.mode, out);
    else await renderInline(ops, A, B, opts.mode, out);
    $('copy').disabled = add === 0 && del === 0;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    showError($('error'), 'Karşılaştırma tamamlanamadı; metinler tarayıcı belleği için çok büyük olabilir. Metni bölümlere ayırın ya da "Satır" düzeyinde deneyin.');
  } finally {
    setProgress($('progress'), null);
    btn.disabled = false;
    running = false;
  }
}

$('compare').addEventListener('click', compare);
// Seçenekler değişince sonuç zaten varsa yenile
['opt-level', 'opt-case', 'opt-space'].forEach((id) => $(id).addEventListener('change', () => { if ($('result').classList.contains('is-active')) compare(); }));
document.querySelectorAll('input[name="opt-view"]').forEach((r) => r.addEventListener('change', () => { if ($('result').classList.contains('is-active')) compare(); }));

$('swap').addEventListener('click', () => {
  const t = $('text-a').value; $('text-a').value = $('text-b').value; $('text-b').value = t;
  const n = $('name-a').textContent; $('name-a').textContent = $('name-b').textContent; $('name-b').textContent = n;
  if ($('result').classList.contains('is-active')) compare();
});
$('clear').addEventListener('click', () => {
  $('text-a').value = ''; $('text-b').value = '';
  $('name-a').textContent = ''; $('name-b').textContent = '';
  $('output').textContent = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  lastOps = null;
});

/* ---------- Farkları kopyala ---------- */
function buildDiffText() {
  if (!lastOps) return '';
  const { ops, A, B } = lastOps;
  const out = [];
  if (lastLevel === 'line') {
    let i = 0;
    while (i < ops.length) {
      if (ops[i].t === 'eq') { i++; continue; }
      const dels = [], adds = [];
      while (i < ops.length && ops[i].t !== 'eq') { (ops[i].t === 'del' ? dels : adds).push(ops[i]); i++; }
      const first = dels[0] ? dels[0].i + 1 : (adds[0].j + 1);
      out.push(`@@ satır ${first} @@`);
      dels.forEach((o) => out.push(`- ${A[o.i]}`));
      adds.forEach((o) => out.push(`+ ${B[o.j]}`));
    }
  } else {
    let i = 0;
    while (i < ops.length) {
      if (ops[i].t === 'eq') { i++; continue; }
      let d = '', a = '';
      while (i < ops.length && ops[i].t !== 'eq') { if (ops[i].t === 'del') d += A[ops[i].i]; else a += B[ops[i].j]; i++; }
      if (d) out.push(`- ${d}`);
      if (a) out.push(`+ ${a}`);
    }
  }
  return out.join('\n');
}

$('copy').addEventListener('click', async () => {
  const text = buildDiffText();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Pano izni yoksa geçici textarea ile dene
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    if (!ok) { showError($('error'), 'Panoya kopyalanamadı. Tarayıcı izni vermemiş olabilir; farkları aşağıdaki sonuçtan elle seçip kopyalayın.'); return; }
  }
  $('copy-status').textContent = 'Farklar panoya kopyalandı.';
  setTimeout(() => { $('copy-status').textContent = ''; }, 3000);
});

/* ---------- Dosya bırakma ---------- */
async function loadInto(file, which) {
  showError($('error'), null);
  if (file.size > BIG_FILE) showError($('error'), `${file.name} ${formatBytes(file.size)}; 50 MB üzeri metinler tarayıcıyı yavaşlatabilir. Gerekirse dosyayı bölün.`);
  try {
    const buf = new Uint8Array(await file.arrayBuffer());
    // İlk 8 KB'ta NUL baytı varsa ikili dosyadır
    if (buf.subarray(0, 8192).includes(0)) throw new Error('binary');
    $(`text-${which}`).value = new TextDecoder('utf-8').decode(buf).replace(/^﻿/, '');
    $(`name-${which}`).textContent = `${file.name} (${formatBytes(file.size)})`;
  } catch (err) {
    showError($('error'), `${file.name} metin dosyası gibi görünmüyor. Bu araç .txt, .md, .csv, .json, .html gibi düz metin dosyalarını açar; Word ya da PDF için önce metni kopyalayıp kutuya yapıştırın.`);
  }
}
createDropzone({ el: $('drop-a'), accept: '.txt,.md,.csv,.json,.html,.css,.js,.xml,.log,text/*', multiple: false, onFiles: ([f]) => loadInto(f, 'a') });
createDropzone({ el: $('drop-b'), accept: '.txt,.md,.csv,.json,.html,.css,.js,.xml,.log,text/*', multiple: false, onFiles: ([f]) => loadInto(f, 'b') });
