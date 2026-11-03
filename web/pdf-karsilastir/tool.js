// İki PDF'i Karşılaştır — pdf.js ile sayfa metni çıkarılır, satır düzeyinde Myers diff uygulanır
// (metin-karsilastir aracındaki mantığın kopyasıdır), belge bilgileri tabloda kıyaslanır ve isteğe bağlı
// olarak sayfalar kanvasa çizilip piksel farkı kırmızıyla vurgulanır. Dosyalar tarayıcıdan çıkmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_D = 3000;          // Myers'te izin verilen en fazla fark sayısı (bellek ~ D²/2)
const CONTEXT = 2;           // değişikliğin çevresinde gösterilen aynı satır sayısı
const MAX_ROWS = 3000;       // ekrana çizilecek en fazla satır
const VISUAL_MAX_PAGES = 40; // görsel karşılaştırmada en fazla sayfa
const VISUAL_SCALE = 1.2;    // ~86 dpi
const PIXEL_THRESHOLD = 48;  // kanal farkı bu değerin üstündeyse piksel "farklı" sayılır

const slots = { a: null, b: null }; // { file, bytes, numPages }
let last = null;                    // son karşılaştırma sonucu (rapor ve görsel için)
let visualStats = null;

createDropzone({ el: $('drop-a'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile('a', f) });
createDropzone({ el: $('drop-b'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile('b', f) });

function explain(err) {
  const s = String(err && (err.name + ' ' + err.message));
  return /PasswordException|password|encrypted/i.test(s)
    ? 'Dosya şifreli görünüyor; önce PDF Şifre Kaldır aracıyla şifreyi kaldırıp tekrar deneyin.'
    : /Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected|trailer|InvalidPDF/i.test(s)
      ? 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF okuyucuda açabildiğinizi kontrol edip yeniden seçin.'
      : friendlyError(err);
}

async function openFile(which, f) {
  showError($('error'), null);
  hideResults();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir PDF değil. Yalnızca .pdf dosyaları karşılaştırılır; Word dosyası için önce Word'den PDF'e aracını kullanın.`);
    return;
  }
  try {
    const pdfjs = await getPdfJs();
    const bytes = await f.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: bytes.slice(0) }).promise;
    const numPages = doc.numPages;
    await doc.destroy();
    slots[which] = { file: f, bytes, numPages };
    $(`name-${which}`).textContent = `${f.name} · ${numPages} sayfa · ${formatBytes(f.size)}`;
    if (f.size >= BIG_FILE) {
      $('warning').textContent = `"${f.name}" ${formatBytes(f.size)}; 50 MB üstü dosyalarda karşılaştırma uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
      $('warning').classList.add('is-active');
    }
  } catch (err) {
    slots[which] = null;
    $(`name-${which}`).textContent = '';
    showError($('error'), `${which === 'a' ? 'Eski sürüm (A)' : 'Yeni sürüm (B)'}: ${explain(err)}`);
  }
  refresh();
}

function refresh() {
  const ready = !!(slots.a && slots.b);
  $('options').hidden = !ready;
  $('actions').hidden = !ready;
}

function hideResults() {
  $('result').classList.remove('is-active');
  $('detail').hidden = true;
  $('visual-out').innerHTML = '';
  last = null; visualStats = null;
}

$('clear').addEventListener('click', () => {
  slots.a = slots.b = null;
  $('name-a').textContent = ''; $('name-b').textContent = '';
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  setProgress($('progress'), null);
  hideResults();
  refresh();
});

/* ---------- Metin çıkarma ---------- */
/** Bir sayfanın metin öğelerini y koordinatına göre satırlara toplar. */
function pageLines(content) {
  const items = content.items.filter((it) => typeof it.str === 'string' && it.str.trim() !== '' && it.transform);
  items.sort((p, q) => (q.transform[5] - p.transform[5]) || (p.transform[4] - q.transform[4]));
  const lines = [];
  let cur = null;
  for (const it of items) {
    const y = it.transform[5];
    const h = Math.max(2, (it.height || 8) * 0.5);
    if (!cur || Math.abs(cur.y - y) > h) { cur = { y, parts: [] }; lines.push(cur); }
    cur.parts.push(it);
  }
  return lines.map((l) => {
    l.parts.sort((p, q) => p.transform[4] - q.transform[4]);
    let text = '';
    let prevEnd = null;
    for (const it of l.parts) {
      const x = it.transform[4];
      const gapLimit = Math.max(1, (it.height || 8) * 0.15);
      if (prevEnd !== null && x - prevEnd > gapLimit && !/\s$/.test(text) && !/^\s/.test(it.str)) text += ' ';
      text += it.str;
      prevEnd = x + (it.width || 0);
    }
    return text.replace(/\s+/g, ' ').trim();
  }).filter(Boolean);
}

/** Belgenin tüm satırları ({ text, page }) ve belge bilgileri. */
async function extract(pdfjs, slot, label, base, span) {
  const pdf = await pdfjs.getDocument({ data: slot.bytes.slice(0) }).promise;
  try {
    const lines = [];
    const sizes = [];
    for (let n = 1; n <= pdf.numPages; n++) {
      setProgress($('progress'), base + ((n - 1) / pdf.numPages) * span, `${label}: sayfa ${n}/${pdf.numPages} okunuyor…`);
      if (n % 3 === 1) await tick();
      const page = await pdf.getPage(n);
      const vp = page.getViewport({ scale: 1 });
      sizes.push([vp.width, vp.height]);
      const content = await page.getTextContent();
      for (const t of pageLines(content)) lines.push({ text: t, page: n });
      page.cleanup();
    }
    let info = {};
    try { info = (await pdf.getMetadata()).info || {}; } catch { /* bilgi alanı okunamazsa boş kalır */ }
    return { lines, sizes, info, numPages: pdf.numPages, bytes: slot.file.size };
  } finally {
    pdf.destroy();
  }
}

/* ---------- Myers diff (metin-karsilastir/tool.js ile aynı mantık) ---------- */
async function myers(a, b, onTick) {
  const n = a.length, m = b.length;
  const max = Math.min(n + m, MAX_D);
  const off = max + 1;
  const v = new Int32Array(2 * max + 3);
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
    if ((d & 63) === 0 && onTick) await onTick();
  }
  if (found < 0) return null;
  const ops = [];
  let x = n, y = m;
  for (let d = found; d > 0; d--) {
    const vv = trace[d];
    const get = (k) => vv[k + d + 1];
    const k = x - y;
    const prevK = (k === -d || (k !== d && get(k - 1) < get(k + 1))) ? k + 1 : k - 1;
    const prevX = get(prevK);
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) { x--; y--; ops.push({ t: 'eq', i: x, j: y }); }
    if (x === prevX) { y--; ops.push({ t: 'add', i: -1, j: y }); }
    else { x--; ops.push({ t: 'del', i: x, j: -1 }); }
  }
  while (x > 0 && y > 0) { x--; y--; ops.push({ t: 'eq', i: x, j: y }); }
  return ops.reverse();
}

/** Satırları tamsayıya eşler, ortak baş/son kısmı atar, Myers'i orta kısma uygular. */
async function diffLines(A, B, keyFn, onTick) {
  const map = new Map();
  const id = (t) => { const k = keyFn(t); let v = map.get(k); if (v === undefined) { v = map.size; map.set(k, v); } return v; };
  const a = A.map((l) => id(l.text)), b = B.map((l) => id(l.text));
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
    truncated = true; // çok fazla fark: orta bölümün tamamı sil+ekle işaretlenir
    mid = [...midA.map((_, i) => ({ t: 'del', i, j: -1 })), ...midB.map((_, j) => ({ t: 'add', i: -1, j }))];
  }
  for (const o of mid) ops.push({ t: o.t, i: o.i >= 0 ? o.i + s : -1, j: o.j >= 0 ? o.j + s : -1 });
  for (let q = 0; q < a.length - ea; q++) ops.push({ t: 'eq', i: ea + q, j: eb + q });
  return { ops, truncated };
}

/* ---------- Belge bilgisi tablosu ---------- */
function pdfDate(s) {
  const m = /^D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?/.exec(String(s || ''));
  if (!m) return s ? String(s) : '';
  return `${m[3] || '01'}.${m[2] || '01'}.${m[1]}${m[4] ? ` ${m[4]}:${m[5] || '00'}` : ''}`;
}
const mm = (pt) => Math.round((pt * 25.4) / 72);
function sizeText(s) { return s ? `${Math.round(s[0])} × ${Math.round(s[1])} pt (${mm(s[0])} × ${mm(s[1])} mm)` : '—'; }

function metaRows(A, B) {
  const row = (label, a, b) => ({ label, a: a || '—', b: b || '—', diff: String(a || '') !== String(b || '') });
  const f = (x, k) => (x.info[k] ? String(x.info[k]) : '');
  const sizeDiffPages = [];
  for (let i = 0; i < Math.min(A.sizes.length, B.sizes.length); i++) {
    if (Math.abs(A.sizes[i][0] - B.sizes[i][0]) > 1 || Math.abs(A.sizes[i][1] - B.sizes[i][1]) > 1) sizeDiffPages.push(i + 1);
  }
  const rows = [
    row('Sayfa sayısı', String(A.numPages), String(B.numPages)),
    row('Sayfa boyutu (1. sayfa)', sizeText(A.sizes[0]), sizeText(B.sizes[0])),
    row('Dosya boyutu', formatBytes(A.bytes), formatBytes(B.bytes)),
    row('Başlık', f(A, 'Title'), f(B, 'Title')),
    row('Yazar', f(A, 'Author'), f(B, 'Author')),
    row('Konu', f(A, 'Subject'), f(B, 'Subject')),
    row('Anahtar sözcükler', f(A, 'Keywords'), f(B, 'Keywords')),
    row('Oluşturan program', f(A, 'Creator'), f(B, 'Creator')),
    row('PDF üretici', f(A, 'Producer'), f(B, 'Producer')),
    row('Oluşturma tarihi', pdfDate(f(A, 'CreationDate')), pdfDate(f(B, 'CreationDate'))),
    row('Değiştirme tarihi', pdfDate(f(A, 'ModDate')), pdfDate(f(B, 'ModDate'))),
    row('PDF sürümü', f(A, 'PDFFormatVersion'), f(B, 'PDFFormatVersion')),
  ];
  if (sizeDiffPages.length) {
    rows.push({ label: 'Boyutu farklı sayfalar', a: `Sayfa ${sizeDiffPages.slice(0, 20).join(', ')}${sizeDiffPages.length > 20 ? ' …' : ''}`, b: `${sizeDiffPages.length} sayfa`, diff: true });
  }
  return rows;
}

function renderMeta(rows) {
  const tb = $('meta-table').querySelector('tbody');
  tb.innerHTML = '';
  for (const r of rows) {
    const tr = document.createElement('tr');
    if (r.diff) tr.className = 'is-diff';
    for (const txt of [r.label, r.a, r.b, r.diff ? 'Farklı' : 'Aynı']) {
      const td = document.createElement('td');
      td.textContent = txt;
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  }
}

/* ---------- Yan yana fark görünümü ---------- */
function buildRows(ops, A, B) {
  const rows = [];
  let idx = 0;
  while (idx < ops.length) {
    const o = ops[idx];
    if (o.t === 'eq') { rows.push({ kind: 'eq', l: A[o.i], r: B[o.j] }); idx++; continue; }
    const dels = [], adds = [];
    while (idx < ops.length && ops[idx].t !== 'eq') { (ops[idx].t === 'del' ? dels : adds).push(ops[idx]); idx++; }
    const len = Math.max(dels.length, adds.length);
    for (let q = 0; q < len; q++) rows.push({ kind: 'chg', l: dels[q] ? A[dels[q].i] : null, r: adds[q] ? B[adds[q].j] : null });
  }
  const keep = new Array(rows.length).fill(false);
  rows.forEach((r, i) => { if (r.kind === 'chg') for (let k = Math.max(0, i - CONTEXT); k <= Math.min(rows.length - 1, i + CONTEXT); k++) keep[k] = true; });
  const out = [];
  for (let i = 0; i < rows.length;) {
    if (keep[i]) { out.push(rows[i]); i++; continue; }
    let j = i;
    while (j < rows.length && !keep[j]) j++;
    out.push({ kind: 'gap', count: j - i });
    i = j;
  }
  return out;
}

function cell(line, cls, sign) {
  const d = document.createElement('div');
  d.className = `kr-cell${cls ? ' ' + cls : ''}`;
  if (line) {
    const pg = document.createElement('span');
    pg.className = 'pg';
    pg.textContent = `s.${line.page}`;
    d.append(pg, document.createTextNode(`${sign} ${line.text}`));
  }
  return d;
}

function renderDiff(rows) {
  const box = $('diff');
  box.innerHTML = '';
  const frag = document.createDocumentFragment();
  let shown = 0;
  for (const r of rows) {
    if (shown >= MAX_ROWS) {
      const g = document.createElement('div');
      g.className = 'kr-row kr-gap';
      g.textContent = 'Çok sayıda satır var; ekranda ilk bölüm gösteriliyor. Tamamı için fark raporunu indirin.';
      frag.appendChild(g);
      break;
    }
    const row = document.createElement('div');
    if (r.kind === 'gap') {
      row.className = 'kr-row kr-gap';
      row.textContent = `… ${r.count} aynı satır …`;
    } else {
      row.className = 'kr-row';
      row.append(
        cell(r.l, r.kind === 'chg' && r.l ? 'kr-del' : '', r.kind === 'chg' ? '−' : ' '),
        cell(r.r, r.kind === 'chg' && r.r ? 'kr-add' : '', r.kind === 'chg' ? '+' : ' '),
      );
    }
    frag.appendChild(row);
    shown++;
  }
  box.appendChild(frag);
}

/* ---------- Rapor ---------- */
function buildReport() {
  const { A, B, ops, rows, stats, nameA, nameB } = last;
  const L = [];
  L.push('PDF Karşılaştırma Raporu — Bilişim Ajans (araclar.bilisimajans.com)');
  L.push(`Eski sürüm (A): ${nameA}`);
  L.push(`Yeni sürüm (B): ${nameB}`);
  L.push('');
  L.push(`Özet: ${stats.summary}`);
  L.push('');
  L.push('== Belge bilgileri ==');
  for (const r of rows) L.push(`${r.diff ? '[FARKLI] ' : '[aynı]   '}${r.label}: A = ${r.a} | B = ${r.b}`);
  L.push('');
  L.push('== Metin farkları (− eski sürümden silinen, + yeni sürüme eklenen) ==');
  let any = false;
  for (const o of ops) {
    if (o.t === 'del') { L.push(`− [A sayfa ${A.lines[o.i].page}] ${A.lines[o.i].text}`); any = true; }
    else if (o.t === 'add') { L.push(`+ [B sayfa ${B.lines[o.j].page}] ${B.lines[o.j].text}`); any = true; }
  }
  if (!any) L.push('(Metin farkı yok)');
  if (visualStats && visualStats.length) {
    L.push('');
    L.push('== Görsel karşılaştırma (farklı piksel oranı) ==');
    for (const v of visualStats) L.push(`Sayfa ${v.page}: %${v.pct.toFixed(2)}${v.sizeDiffers ? ' (sayfa boyutları farklı, B sayfası A boyutuna uyduruldu)' : ''}`);
  }
  return L.join('\r\n') + '\r\n';
}

$('download-report').addEventListener('click', () => {
  if (!last) return;
  // UTF-8 imzası (BOM): Türkçe karakterler Not Defteri'nde de doğru görünsün.
  const blob = new Blob(['﻿', buildReport()], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `${baseName(last.nameA)}-ile-${baseName(last.nameB)}-fark-raporu.txt`);
});

/* ---------- Karşılaştırmayı çalıştır ---------- */
$('run').addEventListener('click', async () => {
  if (!slots.a || !slots.b) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  hideResults();
  try {
    const pdfjs = await getPdfJs();
    const A = await extract(pdfjs, slots.a, 'A', 0, 35);
    const B = await extract(pdfjs, slots.b, 'B', 35, 35);
    setProgress($('progress'), 75, 'Satırlar karşılaştırılıyor…');
    await tick();
    const ignoreSpace = $('opt-space').checked, ignoreCase = $('opt-case').checked;
    const keyFn = (t) => {
      let k = t;
      if (ignoreSpace) k = k.replace(/\s+/g, ' ').trim();
      if (ignoreCase) k = k.toLocaleLowerCase('tr');
      return k;
    };
    const { ops, truncated } = await diffLines(A.lines, B.lines, keyFn, tick);
    const added = ops.filter((o) => o.t === 'add').length;
    const removed = ops.filter((o) => o.t === 'del').length;
    const pagesTouched = new Set();
    ops.forEach((o) => { if (o.t === 'del') pagesTouched.add(`a${A.lines[o.i].page}`); if (o.t === 'add') pagesTouched.add(`b${B.lines[o.j].page}`); });
    const rows = metaRows(A, B);
    const metaDiffs = rows.filter((r) => r.diff).length;

    const notes = [];
    if (!A.lines.length && !B.lines.length) notes.push('Her iki dosyada da seçilebilir metin bulunamadı; sayfalar büyük olasılıkla taranmış resim. Aşağıdaki görsel karşılaştırmayı kullanın.');
    else if (!A.lines.length) notes.push('A dosyasında metin bulunamadı (taranmış olabilir); tüm B metni "eklenen" görünür. Görsel karşılaştırmayı kullanın.');
    else if (!B.lines.length) notes.push('B dosyasında metin bulunamadı (taranmış olabilir); tüm A metni "silinen" görünür. Görsel karşılaştırmayı kullanın.');
    if (truncated) notes.push('Çok fazla fark olduğu için ayrıntılı eşleştirme yapılamadı; farklı bölüm toplu olarak silinen/eklenen gösteriliyor.');
    $('text-note').textContent = notes.join(' ') || (added + removed ? `${removed} satır silindi, ${added} satır eklendi. Her satırın başındaki "s.N" sayfa numarasıdır.` : 'Metinde fark bulunamadı.');

    let summary;
    if (!added && !removed && !metaDiffs) summary = `Fark yok: iki PDF'in metni ve belge bilgileri aynı (${A.numPages} sayfa, ${A.lines.length} satır). Yalnızca görünüşteki farklar için görsel karşılaştırmayı deneyin.`;
    else if (!added && !removed) summary = `Metin farkı yok; belge bilgilerinde ${metaDiffs} fark var. Şekil ve görüntü farkları için görsel karşılaştırmayı deneyin.`;
    else summary = `${removed} satır silindi, ${added} satır eklendi; ${pagesTouched.size} sayfa etkilendi (A ${A.numPages}, B ${B.numPages} sayfa). Belge bilgilerinde ${metaDiffs} fark var.`;

    last = { A, B, ops, rows, stats: { added, removed, summary }, nameA: slots.a.file.name, nameB: slots.b.file.name };
    renderMeta(rows);
    renderDiff(buildRows(ops, A.lines, B.lines));
    $('summary').textContent = summary;
    $('result').classList.add('is-active');
    $('detail').hidden = false;
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), explain(err));
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Görsel karşılaştırma ---------- */
async function renderPage(page, scale, canvas) {
  const vp = page.getViewport({ scale });
  canvas.width = Math.max(1, Math.floor(vp.width));
  canvas.height = Math.max(1, Math.floor(vp.height));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  return ctx;
}

$('visual').addEventListener('click', async () => {
  if (!slots.a || !slots.b) return;
  const btn = $('visual');
  btn.disabled = true;
  showError($('error'), null);
  const out = $('visual-out');
  out.innerHTML = '';
  visualStats = [];
  let pa = null, pb = null;
  try {
    const pdfjs = await getPdfJs();
    pa = await pdfjs.getDocument({ data: slots.a.bytes.slice(0) }).promise;
    pb = await pdfjs.getDocument({ data: slots.b.bytes.slice(0) }).promise;
    const common = Math.min(pa.numPages, pb.numPages);
    const count = Math.min(common, VISUAL_MAX_PAGES);
    if (pa.numPages !== pb.numPages || common > count) {
      const p = document.createElement('p');
      p.className = 'kr-note';
      p.textContent = `A'da ${pa.numPages}, B'de ${pb.numPages} sayfa var; yalnızca ortak ilk ${count} sayfa karşılaştırıldı${common > count ? ` (en çok ${VISUAL_MAX_PAGES} sayfa)` : ''}.`;
      out.appendChild(p);
    }
    const cA = document.createElement('canvas'), cB = document.createElement('canvas'), cT = document.createElement('canvas');
    for (let n = 1; n <= count; n++) {
      setProgress($('progress'), ((n - 1) / count) * 100, `Görsel karşılaştırma: sayfa ${n}/${count}`);
      await tick();
      const [pgA, pgB] = [await pa.getPage(n), await pb.getPage(n)];
      const ctxA = await renderPage(pgA, VISUAL_SCALE, cA);
      await renderPage(pgB, VISUAL_SCALE, cB);
      const w = cA.width, h = cA.height;
      const sizeDiffers = Math.abs(cA.width - cB.width) > 1 || Math.abs(cA.height - cB.height) > 1;
      // B sayfasını A'nın boyutuna oturtup piksel piksel kıyasla
      cT.width = w; cT.height = h;
      const ctxT = cT.getContext('2d', { willReadFrequently: true });
      ctxT.fillStyle = '#fff'; ctxT.fillRect(0, 0, w, h);
      ctxT.drawImage(cB, 0, 0, w, h);
      const da = ctxA.getImageData(0, 0, w, h);
      const db = ctxT.getImageData(0, 0, w, h).data;
      const out32 = new ImageData(w, h);
      let diff = 0;
      for (let i = 0; i < da.data.length; i += 4) {
        const dr = Math.abs(da.data[i] - db[i]), dg = Math.abs(da.data[i + 1] - db[i + 1]), dbb = Math.abs(da.data[i + 2] - db[i + 2]);
        if (Math.max(dr, dg, dbb) > PIXEL_THRESHOLD) {
          diff++;
          out32.data[i] = 220; out32.data[i + 1] = 38; out32.data[i + 2] = 38;
        } else {
          const lum = (da.data[i] * 299 + da.data[i + 1] * 587 + da.data[i + 2] * 114) / 1000;
          const v = 255 - (255 - lum) * 0.3; // aynı bölgeler soluk gri
          out32.data[i] = out32.data[i + 1] = out32.data[i + 2] = v;
        }
        out32.data[i + 3] = 255;
      }
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      cv.getContext('2d').putImageData(out32, 0, 0);
      const pct = (diff / (w * h)) * 100;
      visualStats.push({ page: n, pct, sizeDiffers });
      cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', `Sayfa ${n} fark görüntüsü: farklı pikseller kırmızı`);
      const fig = document.createElement('figure');
      const cap = document.createElement('figcaption');
      cap.textContent = diff === 0
        ? `Sayfa ${n}: görsel fark yok`
        : `Sayfa ${n}: %${pct.toFixed(2)} piksel farklı${sizeDiffers ? ' (sayfa boyutları farklı, B sayfası A boyutuna uyduruldu)' : ''}`;
      fig.append(cv, cap);
      out.appendChild(fig);
      pgA.cleanup(); pgB.cleanup();
    }
    cA.width = cA.height = cB.width = cB.height = cT.width = cT.height = 0;
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /memory|allocation|canvas/i.test(String(err && err.message))
      ? 'Sayfalar tarayıcı belleği için fazla büyük. Şüpheli sayfaları PDF Böl aracıyla ayırıp tekrar deneyin.'
      : explain(err));
  } finally {
    if (pa) pa.destroy();
    if (pb) pb.destroy();
    btn.disabled = false;
  }
});
