// HTML tablo oluşturucu — HTML (satır içi stil ya da class), Markdown ve WordPress blok (wp:table) çıktısı.
// Tüm veri tarayıcıda işlenir; hiçbir hücre içeriği dışarı gönderilmez. Saf JS, kütüphanesiz.
import { downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_ROWS = 100;
const MAX_COLS = 20;
const MAX_TEXT = 2_000_000; // yapıştırılan metin için üst sınır (karakter)
const DELIMS = { tab: '\t', comma: ',', semi: ';', pipe: '|' };
const TABS = ['html', 'md', 'wp'];

// Hücre modeli: metinler cells[r][c]; birleştirmeler spans ("r,c" → {rs, cs}); sütun hizası align[c].
const st = { rows: 3, cols: 3, cells: [], spans: new Map(), align: [], active: null };
st.cells = [['Ürün', 'Adet', 'Fiyat'], ['Kalem', '10', '25 ₺'], ['Defter', '5', '40 ₺']];
st.align = ['', 'center', 'right'];

const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escText(s).replace(/"/g, '&quot;');
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const textHtml = (s) => escText(s).replace(/\n/g, '<br>');

/* ---------- Hata / bilgi ---------- */
function setError(msg) {
  const el = $('error');
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}
function setInfo(msg) { $('t-info').textContent = msg || ''; }
let statusTimer = 0;
function setStatus(msg) {
  $('copied').textContent = msg;
  clearTimeout(statusTimer);
  if (msg) statusTimer = setTimeout(() => { $('copied').textContent = ''; }, 3000);
}

/* ---------- Renk yardımcıları ---------- */
function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mixHex(a, b, t) {
  const A = hexToRgb(a); const B = hexToRgb(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
const textOn = (bg) => (contrast(bg, '#ffffff') >= contrast(bg, '#1e2126') ? '#ffffff' : '#1e2126');

/* ---------- Ayrıştırma (Excel / CSV) ---------- */
// Ayırıcıyı otomatik bulur: sekme (Excel) → noktalı virgül (Türkçe CSV) → virgül → boru.
function detectDelimiter(text) {
  if (text.includes('\t')) return '\t';
  const first = text.split('\n').find((l) => l.trim()) || '';
  let best = '\t'; let bestN = 0;
  for (const d of [';', ',', '|']) {
    // Tırnak içindekileri sayma.
    const n = first.replace(/"[^"]*"/g, '').split(d).length - 1;
    if (n > bestN) { best = d; bestN = n; }
  }
  return best;
}
// Tırnaklı alanları (RFC 4180 benzeri) destekleyen küçük ayrıştırıcı.
function parseTable(raw, choice) {
  const text = String(raw).replace(/\r\n?/g, '\n').replace(/^﻿/, '');
  const delim = choice === 'auto' ? detectDelimiter(text) : (DELIMS[choice] || choice);
  const rows = []; let row = []; let cell = ''; let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false; } else cell += ch;
    } else if (ch === '"' && cell === '') inQ = true;
    else if (ch === delim) { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  row.push(cell); rows.push(row);
  while (rows.length && rows[rows.length - 1].every((c) => c.trim() === '')) rows.pop();
  // Hücre içindeki satır sonları boşluğa çevrilir (tek satırlık metin kutuları için).
  return rows.map((r) => r.map((c) => c.replace(/\n/g, ' ')));
}

/* ---------- Model işlemleri ---------- */
function resize(rows, cols) {
  rows = clamp(Math.round(rows) || 1, 1, MAX_ROWS);
  cols = clamp(Math.round(cols) || 1, 1, MAX_COLS);
  while (st.cells.length < rows) st.cells.push([]);
  st.cells.length = rows;
  for (const row of st.cells) { while (row.length < cols) row.push(''); row.length = cols; }
  while (st.align.length < cols) st.align.push('');
  st.align.length = cols;
  st.rows = rows; st.cols = cols;
  $('t-rows').value = rows; $('t-cols').value = cols;
  if (st.active && (st.active.r >= rows || st.active.c >= cols)) st.active = null;
}

// Birleştirmeleri sınırlara, başlık satırına ve çakışmaya göre temizler; kaplama haritasını döndürür.
function normalizeSpans() {
  const hrow = $('o-hrow').checked;
  const cover = Array.from({ length: st.rows }, () => Array(st.cols).fill(null));
  const entries = [...st.spans.entries()].map(([k, v]) => { const [r, c] = k.split(',').map(Number); return { k, r, c, rs: v.rs, cs: v.cs }; })
    .sort((a, b) => a.r - b.r || a.c - b.c);
  st.spans.clear();
  for (const e of entries) {
    if (e.r >= st.rows || e.c >= st.cols) continue;
    let rs = Math.min(e.rs, st.rows - e.r);
    const cs = Math.min(e.cs, st.cols - e.c);
    if (hrow && e.r === 0) rs = 1; // başlık satırı (thead) satırlar arası birleştirilemez
    if (rs === 1 && cs === 1) continue;
    let clash = false;
    for (let i = 0; i < rs; i++) for (let j = 0; j < cs; j++) if (cover[e.r + i][e.c + j]) clash = true;
    if (clash) continue;
    for (let i = 0; i < rs; i++) for (let j = 0; j < cs; j++) cover[e.r + i][e.c + j] = e.k;
    st.spans.set(e.k, { rs, cs });
  }
  return cover;
}

// Çıktılar için satır satır, yalnızca görünen hücreler.
function tableRows() {
  const cover = normalizeSpans();
  const hrow = $('o-hrow').checked;
  const hcol = $('o-hcol').checked;
  const rows = [];
  for (let r = 0; r < st.rows; r++) {
    const row = [];
    for (let c = 0; c < st.cols; c++) {
      const key = cover[r][c];
      if (key && key !== `${r},${c}`) continue;
      const sp = st.spans.get(`${r},${c}`) || { rs: 1, cs: 1 };
      const headRow = hrow && r === 0;
      const headCol = hcol && c === 0 && !headRow;
      row.push({ r, c, text: st.cells[r][c], rs: sp.rs, cs: sp.cs, tag: headRow || headCol ? 'th' : 'td', scope: headRow ? 'col' : (headCol ? 'row' : ''), headRow, headCol, align: st.align[c] || '' });
    }
    rows.push(row);
  }
  return rows;
}

/* ---------- Seçenekler ---------- */
function opts() {
  let cls = $('o-class').value.trim();
  let clsBad = false;
  if (!/^[a-zA-Z][\w-]*$/.test(cls)) { clsBad = !!cls; cls = 'ba-tablo'; }
  return {
    hrow: $('o-hrow').checked, hcol: $('o-hcol').checked, zebra: $('o-zebra').checked,
    border: $('o-border').value, bcolor: $('o-bcolor').value, hcolor: $('o-hcolor').value, zcolor: $('o-zcolor').value,
    pad: Number($('o-pad').value) || 8, full: $('o-full').checked, scroll: $('o-scroll').checked,
    caption: $('o-caption').value.trim(), mode: $('o-style').value, cls, clsBad,
    wpFixed: $('o-wpfixed').checked,
  };
}
const borderCss = (o) => (o.border === 'none' ? '' : `${o.border === 'thick' ? 2 : 1}px solid ${o.bcolor}`);
const ALIGN_CLASS = { left: 'ta-l', center: 'ta-c', right: 'ta-r' };

/* ---------- HTML çıktısı ---------- */
function buildHtml(o, rows) {
  const inline = o.mode === 'inline';
  const bd = borderCss(o);
  const soft = mixHex(o.hcolor, '#ffffff', 0.88);
  const hfg = textOn(o.hcolor);
  const out = [];
  const ind = (n) => '  '.repeat(n);
  const wrapped = o.scroll;
  const base = wrapped ? 1 : 0;
  if (wrapped) out.push(inline ? '<div style="overflow-x:auto;">' : `<div class="${o.cls}-wrap">`);
  if (inline) {
    out.push(`${ind(base)}<table style="border-collapse:collapse;${o.full ? 'width:100%;' : ''}${bd ? `border:${bd};` : ''}">`);
  } else {
    out.push(`${ind(base)}<table class="${o.cls}">`);
  }
  if (o.caption) {
    out.push(`${ind(base + 1)}<caption${inline ? ' style="padding:8px;text-align:left;font-weight:700;"' : ''}>${textHtml(o.caption)}</caption>`);
  }
  const cellHtml = (cell, level) => {
    const attrs = [];
    if (cell.scope) attrs.push(`scope="${cell.scope}"`);
    if (cell.cs > 1) attrs.push(`colspan="${cell.cs}"`);
    if (cell.rs > 1) attrs.push(`rowspan="${cell.rs}"`);
    if (inline) {
      const p = [];
      if (bd) p.push(`border:${bd}`);
      p.push(`padding:${o.pad}px`);
      if (cell.headRow) p.push(`background-color:${o.hcolor}`, `color:${hfg}`);
      else if (cell.headCol) p.push(`background-color:${soft}`, 'color:#1e2126');
      if (cell.tag === 'th') p.push('font-weight:700');
      if (cell.tag === 'th') p.push(`text-align:${cell.align || 'left'}`); else if (cell.align) p.push(`text-align:${cell.align}`);
      attrs.push(`style="${p.join(';')};"`);
    } else if (cell.align) {
      attrs.push(`class="${ALIGN_CLASS[cell.align]}"`);
    }
    return `${ind(level)}<${cell.tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>${textHtml(cell.text)}</${cell.tag}>`;
  };
  const rowHtml = (cells, level, bodyIndex) => {
    const zebraRow = inline && o.zebra && bodyIndex % 2 === 1;
    return [`${ind(level)}<tr${zebraRow ? ` style="background-color:${o.zcolor};"` : ''}>`, ...cells.map((c) => cellHtml(c, level + 1)), `${ind(level)}</tr>`].join('\n');
  };
  const bodyRows = o.hrow ? rows.slice(1) : rows;
  if (o.hrow) out.push(`${ind(base + 1)}<thead>`, rowHtml(rows[0], base + 2, 0), `${ind(base + 1)}</thead>`);
  if (bodyRows.length) {
    out.push(`${ind(base + 1)}<tbody>`);
    bodyRows.forEach((cells, i) => out.push(rowHtml(cells, base + 2, i)));
    out.push(`${ind(base + 1)}</tbody>`);
  }
  out.push(`${ind(base)}</table>`);
  if (wrapped) out.push('</div>');
  return out.join('\n');
}

// class kipinde CSS; scope verilirse (önizleme) kurallar o kapsamla sınırlanır, sayfayı etkilemez.
function buildCss(o, rows, scope = '') {
  const s = scope ? scope + ' ' : '';
  const bd = borderCss(o);
  const c = o.cls;
  const blocks = [];
  blocks.push(`${s}.${c} {\n  border-collapse: collapse;${o.full ? '\n  width: 100%;' : ''}${bd ? `\n  border: ${bd};` : ''}\n}`);
  blocks.push(`${s}.${c} th,\n${s}.${c} td {${bd ? `\n  border: ${bd};` : ''}\n  padding: ${o.pad}px;\n}`);
  if (o.caption) blocks.push(`${s}.${c} caption {\n  padding: 8px;\n  text-align: left;\n  font-weight: 700;\n}`);
  if (o.hrow) blocks.push(`${s}.${c} thead th {\n  background-color: ${o.hcolor};\n  color: ${textOn(o.hcolor)};\n  font-weight: 700;\n  text-align: left;\n}`);
  if (o.hcol) blocks.push(`${s}.${c} tbody th {\n  background-color: ${mixHex(o.hcolor, '#ffffff', 0.88)};\n  color: #1e2126;\n  font-weight: 700;\n  text-align: left;\n}`);
  if (o.zebra) blocks.push(`${s}.${c} tbody tr:nth-child(even) {\n  background-color: ${o.zcolor};\n}`);
  const used = new Set(rows.flat().map((x) => x.align).filter(Boolean));
  for (const a of ['left', 'center', 'right']) if (used.has(a)) blocks.push(`${s}.${c} .${ALIGN_CLASS[a]} {\n  text-align: ${a};\n}`);
  if (o.scroll) blocks.push(`${s}.${c}-wrap {\n  overflow-x: auto;\n}`);
  return blocks.join('\n\n');
}

/* ---------- Markdown çıktısı ---------- */
function buildMarkdown(o, rows) {
  // Yoğun matris: birleşik hücrelerde yalnızca sol-üst hücre doludur, diğerleri boş kalır.
  const m = Array.from({ length: st.rows }, () => Array(st.cols).fill(''));
  for (const row of rows) for (const cell of row) m[cell.r][cell.c] = cell.text;
  const esc = (s, bold) => { const t = String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>'); return bold && t ? `**${t}**` : t; };
  const grid = m.map((row, r) => row.map((t, c) => esc(t, o.hcol && c === 0 && !(o.hrow && r === 0))));
  const head = o.hrow ? grid[0] : Array(st.cols).fill('');
  const body = o.hrow ? grid.slice(1) : grid;
  const len = (s) => [...s].length;
  const widths = Array.from({ length: st.cols }, (_, c) => Math.max(3, len(head[c]), ...body.map((r) => len(r[c]))));
  const pad = (s, w, a) => {
    const gap = w - len(s);
    if (a === 'right') return ' '.repeat(gap) + s;
    if (a === 'center') { const l = Math.floor(gap / 2); return ' '.repeat(l) + s + ' '.repeat(gap - l); }
    return s + ' '.repeat(gap);
  };
  const line = (cells) => '| ' + cells.map((s, c) => pad(s, widths[c], st.align[c])).join(' | ') + ' |';
  const sep = '| ' + widths.map((w, c) => {
    const a = st.align[c];
    if (a === 'center') return ':' + '-'.repeat(w - 2) + ':';
    if (a === 'right') return '-'.repeat(w - 1) + ':';
    if (a === 'left') return ':' + '-'.repeat(w - 1);
    return '-'.repeat(w);
  }).join(' | ') + ' |';
  const out = [];
  if (o.caption) out.push(`**${o.caption.replace(/\n/g, ' ')}**`, '');
  out.push(line(head), sep, ...body.map(line));
  return out.join('\n');
}

/* ---------- WordPress blok çıktısı ---------- */
function buildWp(o, rows) {
  // Birleşik hücre varsa çekirdek tablo bloğu geçerli kalmaz; "Özel HTML" bloğu üretilir.
  if (st.spans.size) {
    return `<!-- wp:html -->\n${buildHtml({ ...o, mode: 'inline', scroll: false }, rows)}\n<!-- /wp:html -->`;
  }
  const classes = ['wp-block-table'];
  const attrs = {};
  if (o.zebra) { classes.push('is-style-stripes'); attrs.className = 'is-style-stripes'; }
  if (o.wpFixed) attrs.hasFixedLayout = true;
  const comment = Object.keys(attrs).length ? ' ' + JSON.stringify(attrs) : '';
  const cell = (c) => {
    const cl = c.align ? ` class="has-text-align-${c.align}" data-align="${c.align}"` : '';
    return `<${c.tag}${cl}>${textHtml(c.text)}</${c.tag}>`;
  };
  const tr = (cells) => `<tr>${cells.map(cell).join('')}</tr>`;
  let t = `<table${o.wpFixed ? ' class="has-fixed-layout"' : ''}>`;
  if (o.hrow) t += `<thead>${tr(rows[0])}</thead>`;
  const body = o.hrow ? rows.slice(1) : rows;
  if (body.length) t += `<tbody>${body.map(tr).join('')}</tbody>`;
  t += '</table>';
  if (o.caption) t += `<figcaption class="wp-element-caption">${textHtml(o.caption)}</figcaption>`;
  return `<!-- wp:table${comment} -->\n<figure class="${classes.join(' ')}">${t}</figure>\n<!-- /wp:table -->`;
}

/* ---------- Çıktıları yenile ---------- */
function refresh() {
  const o = opts();
  const rows = tableRows();
  const html = buildHtml(o, rows);
  const cls = o.mode === 'class';
  $('out-html').value = html;
  $('wrap-css').hidden = !cls;
  $('o-class-wrap').hidden = !cls;
  $('out-css').value = cls ? buildCss(o, rows) : '';
  $('out-md').value = buildMarkdown(o, rows);
  $('out-wp').value = buildWp(o, rows);
  $('w-class').textContent = o.clsBad ? 'Sınıf adı harfle başlamalı ve yalnızca harf, rakam, tire ve alt çizgi içermeli. Geçici olarak "ba-tablo" kullanılıyor.' : '';
  const merged = st.spans.size > 0;
  $('note-md').hidden = !merged;
  $('note-wp').hidden = !merged;
  $('merge-info').textContent = merged ? `${st.spans.size} birleştirilmiş hücre var.` : '';
  const preview = $('preview');
  preview.innerHTML = (cls ? `<style>${buildCss(o, rows, '#preview')}</style>` : '') + html;
  updateActiveInfo();
}

function updateActiveInfo() {
  $('active-info').textContent = st.active ? `Seçili hücre: satır ${st.active.r + 1}, sütun ${st.active.c + 1}` : 'Seçili hücre yok. Önce tablodaki bir hücreye tıklayın.';
}

/* ---------- Düzenleme tablosu ---------- */
function renderGrid() {
  const cover = normalizeSpans();
  const hrow = $('o-hrow').checked;
  const alignOpts = (c) => [['', 'Otomatik'], ['left', 'Sol'], ['center', 'Orta'], ['right', 'Sağ']]
    .map(([v, l]) => `<option value="${v}"${(st.align[c] || '') === v ? ' selected' : ''}>${l}</option>`).join('');
  let h = '<caption class="visually-hidden">Düzenlenebilir tablo. Her hücre bir metin kutusudur; Enter alttaki hücreye geçer.</caption><thead><tr><th scope="col"><span class="visually-hidden">Satır</span></th>';
  for (let c = 0; c < st.cols; c++) {
    h += `<th scope="col"><span class="ht-colno">Sütun ${c + 1}</span><select data-align="${c}" aria-label="Sütun ${c + 1} hizalama">${alignOpts(c)}</select></th>`;
  }
  h += '</tr></thead><tbody>';
  for (let r = 0; r < st.rows; r++) {
    h += `<tr><th scope="row" class="ht-rowno">${r + 1}</th>`;
    for (let c = 0; c < st.cols; c++) {
      const key = cover[r][c];
      if (key && key !== `${r},${c}`) continue;
      const sp = st.spans.get(`${r},${c}`);
      const a = sp ? `${sp.cs > 1 ? ` colspan="${sp.cs}"` : ''}${sp.rs > 1 ? ` rowspan="${sp.rs}"` : ''}` : '';
      const klass = [sp ? 'is-merged' : '', hrow && r === 0 ? 'is-head' : ''].filter(Boolean).join(' ');
      h += `<td${a}${klass ? ` class="${klass}"` : ''}><input type="text" data-r="${r}" data-c="${c}" aria-label="Satır ${r + 1}, sütun ${c + 1}" autocomplete="off" value="${escAttr(st.cells[r][c])}"></td>`;
    }
    h += '</tr>';
  }
  h += '</tbody>';
  const table = document.createElement('table');
  table.className = 'ht-edit';
  table.innerHTML = h;
  $('grid').replaceChildren(table);
}

function focusCell(r, c) {
  const el = $('grid').querySelector(`input[data-r="${r}"][data-c="${c}"]`);
  if (el) el.focus();
}

// Tablo hücresinden başlayarak (Excel gibi) metni hücrelere yayar.
function spill(text, r0, c0) {
  const data = parseTable(text, 'tab');
  if (!data.length) return;
  const width = Math.max(...data.map((x) => x.length));
  resize(Math.max(st.rows, r0 + data.length), Math.max(st.cols, c0 + width));
  let cut = false;
  data.forEach((row, i) => row.forEach((v, j) => {
    const r = r0 + i; const c = c0 + j;
    if (r < MAX_ROWS && c < MAX_COLS) st.cells[r][c] = v; else cut = true;
  }));
  if (cut) setInfo(`Tablo en fazla ${MAX_ROWS} satır ve ${MAX_COLS} sütun olabilir; sığmayan veriler alınmadı.`);
  renderGrid();
  refresh();
  focusCell(r0, c0);
}

const grid = $('grid');
grid.addEventListener('input', (e) => {
  const i = e.target.closest('input[data-r]');
  if (!i) return;
  st.cells[Number(i.dataset.r)][Number(i.dataset.c)] = i.value;
  refresh();
});
grid.addEventListener('change', (e) => {
  const s = e.target.closest('select[data-align]');
  if (!s) return;
  st.align[Number(s.dataset.align)] = s.value;
  refresh();
});
grid.addEventListener('focusin', (e) => {
  const i = e.target.closest('input[data-r]');
  if (!i) return;
  st.active = { r: Number(i.dataset.r), c: Number(i.dataset.c) };
  updateActiveInfo();
});
grid.addEventListener('keydown', (e) => {
  const i = e.target.closest('input[data-r]');
  if (!i || e.key !== 'Enter') return;
  e.preventDefault();
  focusCell(Number(i.dataset.r) + 1, Number(i.dataset.c));
});
grid.addEventListener('paste', (e) => {
  const i = e.target.closest('input[data-r]');
  if (!i) return;
  const txt = (e.clipboardData && e.clipboardData.getData('text')) || '';
  if (!/[\t\n]/.test(txt.replace(/\n+$/, ''))) return; // tek değer: normal yapıştırma
  e.preventDefault();
  if (txt.length > MAX_TEXT) { setError('Yapıştırılan veri çok büyük. Daha küçük bir bölümü kopyalayıp tekrar deneyin.'); return; }
  setError('');
  spill(txt, Number(i.dataset.r), Number(i.dataset.c));
});

/* ---------- İçe aktarma ---------- */
function doImport(text) {
  if (!text.trim()) { setError('Aktarılacak veri yok. Excel ya da CSV dosyanızdan hücreleri kopyalayıp kutuya yapıştırın, sonra "Tabloya aktar" düğmesine basın.'); return; }
  if (text.length > MAX_TEXT) { setError('Yapıştırılan veri 2 MB üzerinde; tarayıcıyı yormamak için alınmadı. Veriyi parçalara bölüp ayrı ayrı deneyin.'); return; }
  setError('');
  let rows = parseTable(text, $('t-delim').value);
  if (!rows.length) { setError('Veri okunamadı. Ayırıcıyı (sekme, virgül, noktalı virgül) elle seçip tekrar deneyin.'); return; }
  const notes = [];
  if (rows.length > MAX_ROWS) { notes.push(`ilk ${MAX_ROWS} satır alındı`); rows = rows.slice(0, MAX_ROWS); }
  let width = Math.max(...rows.map((r) => r.length));
  if (width > MAX_COLS) { notes.push(`ilk ${MAX_COLS} sütun alındı`); width = MAX_COLS; }
  st.cells = rows.map((r) => Array.from({ length: width }, (_, c) => r[c] || ''));
  st.rows = st.cells.length; st.cols = width;
  st.spans.clear();
  st.active = null;
  st.align = []; // yeni veri, eski hizaları taşımaz
  resize(st.rows, st.cols);
  renderGrid();
  refresh();
  setInfo(`${st.rows} satır x ${st.cols} sütun aktarıldı${notes.length ? ' (' + notes.join(', ') + ')' : ''}.`);
}
$('btn-import').addEventListener('click', () => doImport($('t-paste').value));
$('t-paste').addEventListener('paste', () => setTimeout(() => { if ($('t-paste').value.trim()) doImport($('t-paste').value); }, 0));
$('btn-clear').addEventListener('click', () => {
  st.cells = Array.from({ length: st.rows }, () => Array(st.cols).fill(''));
  st.spans.clear();
  st.active = null;
  $('t-paste').value = '';
  setError(''); setInfo('Tüm hücreler temizlendi.');
  renderGrid(); refresh();
});

/* ---------- Boyut ---------- */
function onResize() {
  const r = Number($('t-rows').value); const c = Number($('t-cols').value);
  if (!Number.isFinite(r) || !Number.isFinite(c) || r < 1 || c < 1) { setError('Satır ve sütun sayısı en az 1 olmalı.'); return; }
  if (r > MAX_ROWS || c > MAX_COLS) setInfo(`En fazla ${MAX_ROWS} satır ve ${MAX_COLS} sütun kullanılabilir; değer sınıra çekildi.`); else setInfo('');
  setError('');
  resize(r, c);
  renderGrid(); refresh();
}
$('t-rows').addEventListener('change', onResize);
$('t-cols').addEventListener('change', onResize);

/* ---------- Birleştirme ---------- */
function afterMerge(msg) {
  setError('');
  renderGrid(); refresh();
  if (st.active) focusCell(st.active.r, st.active.c);
  setInfo(msg);
}
function needActive() {
  if (!st.active) { setError('Önce tablodaki bir hücreye tıklayın; birleştirme o hücreden başlar.'); return false; }
  return true;
}
function mergeRight() {
  if (!needActive()) return;
  const cover = normalizeSpans();
  const { r, c } = st.active;
  const key = `${r},${c}`;
  const sp = st.spans.get(key) || { rs: 1, cs: 1 };
  const nc = c + sp.cs;
  if (nc >= st.cols) { setError('Sağda birleştirilecek sütun yok; seçili hücre son sütunda. Önce sütun sayısını artırın ya da başka bir hücre seçin.'); return; }
  for (let i = 0; i < sp.rs; i++) if (cover[r + i][nc]) { setError('Sağdaki hücre başka bir birleştirmenin parçası. Önce o birleştirmeyi çözün.'); return; }
  st.spans.set(key, { rs: sp.rs, cs: sp.cs + 1 });
  afterMerge('Hücre sağdaki ile birleştirildi. Birleşik hücrenin içeriği olarak yalnızca sol-üst hücre kullanılır.');
}
function mergeDown() {
  if (!needActive()) return;
  const cover = normalizeSpans();
  const { r, c } = st.active;
  const key = `${r},${c}`;
  const sp = st.spans.get(key) || { rs: 1, cs: 1 };
  if ($('o-hrow').checked && r === 0) { setError('Başlık satırındaki hücre aşağı birleştirilemez. "Başlık satırı" seçeneğini kapatın ya da başka bir hücre seçin.'); return; }
  const nr = r + sp.rs;
  if (nr >= st.rows) { setError('Aşağıda birleştirilecek satır yok; seçili hücre son satırda. Önce satır sayısını artırın ya da başka bir hücre seçin.'); return; }
  for (let j = 0; j < sp.cs; j++) if (cover[nr][c + j]) { setError('Alttaki hücre başka bir birleştirmenin parçası. Önce o birleştirmeyi çözün.'); return; }
  st.spans.set(key, { rs: sp.rs + 1, cs: sp.cs });
  afterMerge('Hücre alttakiyle birleştirildi. Birleşik hücrenin içeriği olarak yalnızca sol-üst hücre kullanılır.');
}
function unmerge() {
  if (!needActive()) return;
  normalizeSpans();
  const key = `${st.active.r},${st.active.c}`;
  if (!st.spans.has(key)) { setError('Seçili hücre birleştirilmiş değil. Birleşik bir hücrenin üzerine tıklayıp tekrar deneyin.'); return; }
  st.spans.delete(key);
  afterMerge('Birleştirme çözüldü; gizli hücrelerdeki metinler geri geldi.');
}
$('btn-mright').addEventListener('click', mergeRight);
$('btn-mdown').addEventListener('click', mergeDown);
$('btn-munmerge').addEventListener('click', unmerge);

/* ---------- Hizalama ve seçenekler ---------- */
$('o-alignall').addEventListener('change', () => {
  const v = $('o-alignall').value;
  if (v === '#') return;
  st.align = Array(st.cols).fill(v);
  $('o-alignall').value = '#';
  renderGrid(); refresh();
});
// Yapıyı etkileyen seçenek (başlık satırı) → ızgara yeniden çizilir.
$('o-hrow').addEventListener('change', () => {
  const had = st.spans.size;
  renderGrid(); refresh();
  if (had && st.spans.size < had) setInfo('Başlık satırı satırlar arası birleştirilemediği için ilk satırdaki dikey birleştirmeler çözüldü.');
});
for (const id of ['o-hcol', 'o-zebra', 'o-border', 'o-bcolor', 'o-hcolor', 'o-zcolor', 'o-pad', 'o-full', 'o-scroll', 'o-caption', 'o-style', 'o-class', 'o-wpfixed']) {
  $(id).addEventListener('input', refresh);
  $(id).addEventListener('change', refresh);
}

/* ---------- Sekmeler ---------- */
function selectTab(name, focus) {
  for (const t of TABS) {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', sel ? 'true' : 'false');
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  }
  setError('');
  if (focus) $('tab-' + name).focus();
}
TABS.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(TABS[(i + 1) % TABS.length], true);
    else if (e.key === 'ArrowLeft') selectTab(TABS[(i + TABS.length - 1) % TABS.length], true);
  });
});

/* ---------- Kopyala / indir ---------- */
async function copyFrom(id) {
  const value = $(id).value;
  if (!value) { setError('Kopyalanacak çıktı yok.'); return; }
  setError('');
  try { await navigator.clipboard.writeText(value); } catch {
    const t = document.createElement('textarea');
    t.value = value;
    t.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  setStatus('Kopyalandı');
}
function fileContent(id) {
  const v = $(id).value;
  if (id === 'out-html') {
    const css = $('out-css').value;
    return `<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n<title>Tablo</title>${css ? `\n<style>\n${css}\n</style>` : ''}\n</head>\n<body>\n${v}\n</body>\n</html>\n`;
  }
  return v + '\n';
}
document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyFrom(b.dataset.copy)));
document.querySelectorAll('[data-download]').forEach((b) => b.addEventListener('click', () => {
  const id = b.dataset.download;
  if (!$(id).value) { setError('İndirilecek çıktı yok.'); return; }
  setError('');
  const type = id === 'out-md' || id === 'out-css' ? 'text/plain' : 'text/html';
  downloadBlob(new Blob([fileContent(id)], { type: `${type};charset=utf-8` }), b.dataset.filename);
}));

/* ---------- Başlangıç ---------- */
resize(st.rows, st.cols);
renderGrid();
refresh();
selectTab('html');
