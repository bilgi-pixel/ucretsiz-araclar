// Online Grafik Oluşturucu — saf Canvas + elle üretilen SVG. Veri hiçbir zaman sunucuya gitmez.
// Tek bir "çizim listesi" üretilir; aynı liste hem canvas'a (önizleme/PNG) hem SVG metnine dönüştürülür.
import { createDropzone, downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_ROWS = 100;
const MAX_FILE = 2 * 1024 * 1024;
const FONT = '"IBM Plex Sans", "Segoe UI", Arial, sans-serif';
const FONT_SVG = "'IBM Plex Sans', 'Segoe UI', Arial, sans-serif";

/* ---------- Türkçe sayı yardımcıları ---------- */
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const fmt = (n) => nf.format(n);

/** "1.234,5", "12,5", "1234.5", "%12" gibi girdileri sayıya çevirir; olmazsa NaN. */
function parseNumber(raw) {
  let s = String(raw ?? '').trim().replace(/[%\s₺$€]/g, '');
  if (!s) return NaN;
  if (s.includes('.') && s.includes(',')) {
    // Son görülen ayraç ondalıktır.
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (s.includes(',')) {
    s = s.replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, ''); // 1.234.567 → binlik ayracı
  }
  return /^-?\d*\.?\d+$/.test(s) ? Number(s) : NaN;
}

/* ---------- Renk paletleri ---------- */
const PALETTES = {
  bordo: { base: '#7b2331', list: ['#7b2331', '#a8404f', '#5e1a25', '#c46a76', '#3f1019', '#8f5a63', '#d89aa3', '#6b3a42'] },
  mavi: { base: '#1d5fa8', list: ['#1d5fa8', '#4b8cd1', '#123e70', '#7fb0e0', '#0b2747', '#5f7fa3', '#a9cdf0', '#2f4a68'] },
  gri: { base: '#4b5563', list: ['#4b5563', '#7b8494', '#2b313a', '#a3abb8', '#171b21', '#636b78', '#c4c9d2', '#394049'] },
  renkli: { base: '#2f6db5', list: ['#2f6db5', '#d9534f', '#2e9e6b', '#e7a21c', '#8e5bb5', '#17a2b8', '#e0679a', '#7a8b2b', '#a0522d', '#5a6b7b'] },
};
const colorAt = (pal, i) => PALETTES[pal].list[i % PALETTES[pal].list.length];

/** Arka plana göre okunur metin rengi (parlaklık). */
function textOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const y = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255));
  return y > 150 ? '#1f2328' : '#ffffff';
}

/* ---------- Metin ölçümü (canvas) ---------- */
const measureCtx = document.createElement('canvas').getContext('2d');
function textWidth(str, size, weight = 400) {
  measureCtx.font = `${weight} ${size}px ${FONT}`;
  return measureCtx.measureText(str).width;
}

/* ---------- Veri tablosu ---------- */
const rowsEl = $('rows');
let rowSeq = 0;

function addRow(label = '', value = '') {
  const n = ++rowSeq;
  const li = document.createElement('li');
  li.className = 'go-row';
  li.innerHTML = `<input type="text" class="r-label" aria-label="Etiket" autocomplete="off" placeholder="Etiket">
    <input type="text" class="r-value" inputmode="decimal" aria-label="Değer" autocomplete="off" placeholder="Değer">
    <button type="button" class="ba-icon-btn" data-act="remove" aria-label="Satırı sil">✕</button>`;
  li.querySelector('.r-label').value = label;
  li.querySelector('.r-value').value = value;
  li.dataset.n = String(n);
  rowsEl.appendChild(li);
  renumber();
  return li;
}
function renumber() {
  Array.from(rowsEl.children).forEach((li, i) => {
    li.querySelector('.r-label').setAttribute('aria-label', `Etiket ${i + 1}`);
    li.querySelector('.r-value').setAttribute('aria-label', `Değer ${i + 1}`);
  });
}
function clearRows() { rowsEl.innerHTML = ''; }

rowsEl.addEventListener('input', schedule);
rowsEl.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-act="remove"]');
  if (!b) return;
  b.closest('li').remove();
  renumber();
  schedule();
});
$('add-row').addEventListener('click', () => {
  if (rowsEl.children.length >= MAX_ROWS) {
    showError($('error'), `En fazla ${MAX_ROWS} satır eklenebilir. Daha fazla veriyi gruplayıp toplamlarını girin.`);
    return;
  }
  addRow().querySelector('.r-label').focus();
});
$('clear-rows').addEventListener('click', () => { clearRows(); addRow(); schedule(); });

/** "etiket;değer" satırlarını ayrıştırır → [{label, raw}] */
function parseText(text) {
  const out = [];
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  lines.forEach((line, idx) => {
    let parts;
    if (line.includes(';')) parts = line.split(';');
    else if (line.includes('\t')) parts = line.split('\t');
    else if (/,/.test(line)) {
      const k = line.lastIndexOf(',');
      // "Ocak,12" gibi; "Ocak,12,5" belirsizse son virgülden böl.
      parts = [line.slice(0, k), line.slice(k + 1)];
      if (Number.isNaN(parseNumber(parts[1])) && parts[0].includes(',')) {
        const k2 = line.lastIndexOf(',', k - 1);
        parts = [line.slice(0, k2), line.slice(k2 + 1)];
      }
    } else {
      const m = line.match(/^(.*\S)\s+(-?[\d.,]+)$/);
      parts = m ? [m[1], m[2]] : [line, ''];
    }
    const label = (parts[0] || '').trim().replace(/^"|"$/g, '');
    const raw = (parts[1] || '').trim().replace(/^"|"$/g, '');
    // İlk satır başlıksa (değer sayı değilse) atla.
    if (idx === 0 && lines.length > 1 && Number.isNaN(parseNumber(raw))) return;
    out.push({ label, raw });
  });
  return out;
}

function applyText(text) {
  showError($('error'), null);
  const parsed = parseText(text);
  if (!parsed.length) {
    showError($('error'), 'Satır bulunamadı. Her satıra "Etiket;Değer" biçiminde yazın (örnek: Ocak;120).');
    return;
  }
  clearRows();
  parsed.slice(0, MAX_ROWS).forEach((p) => addRow(p.label, p.raw));
  if (parsed.length > MAX_ROWS) showError($('error'), `İlk ${MAX_ROWS} satır alındı; fazlası atlandı.`);
  schedule();
}
$('apply-text').addEventListener('click', () => applyText($('f-text').value));

createDropzone({
  el: $('drop'), accept: '.csv,.txt,text/csv,text/plain', multiple: false,
  onFiles: async ([file]) => {
    if (file.size > MAX_FILE) { showError($('error'), 'Dosya 2 MB üzerinde. Grafik için veriyi özetleyip (etiket + değer) daha küçük bir dosya kullanın.'); return; }
    if (!/\.(csv|txt)$/i.test(file.name) && !/^text\//.test(file.type)) {
      showError($('error'), 'Yalnızca .csv veya .txt dosyaları okunur. Excel dosyanız varsa "Farklı kaydet → CSV" ile dışa aktarıp tekrar deneyin.');
      return;
    }
    const text = await file.text();
    $('f-text').value = text;
    applyText(text);
  },
});

/** Tablodaki geçerli satırlar + uyarılar. */
function readData() {
  const data = [];
  const bad = [];
  Array.from(rowsEl.children).forEach((li, i) => {
    const label = li.querySelector('.r-label').value.trim();
    const rawV = li.querySelector('.r-value').value.trim();
    if (!label && !rawV) return;
    const v = parseNumber(rawV);
    if (Number.isNaN(v)) { bad.push(i + 1); return; }
    data.push({ label: label || `Satır ${i + 1}`, value: v });
  });
  return { data, bad };
}

/* ---------- Seçenekler ---------- */
function readOptions() {
  const [W, H] = $('opt-size').value.split('x').map(Number);
  return {
    type: $('opt-type').value, W, H,
    title: $('opt-title').value.trim(),
    catTitle: $('opt-cat').value.trim(),
    valTitle: $('opt-val').value.trim(),
    palette: $('opt-palette').value,
    labels: $('opt-labels').checked,
    legend: $('opt-legend').value,
    vary: $('opt-vary').checked,
    transparent: $('opt-transparent').checked,
  };
}

/* ---------- Çizim listesi ---------- */
// ops: { t:'path', d, fill, stroke, sw, op, dash } | { t:'text', x, y, s, size, fill, anchor, weight, rot }
const INK = '#1f2328';
const GRID = '#d6d9de';
const AXIS = '#7a818c';

function niceScale(min, max) {
  if (max === min) { max = min + 1; }
  const range = max - min;
  const rough = range / 5;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const f = rough / pow;
  const step = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * pow;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return { lo, hi, ticks };
}

const f2 = (n) => Math.round(n * 100) / 100;
const rectD = (x, y, w, h) => `M${f2(x)} ${f2(y)}h${f2(w)}v${f2(h)}h${f2(-w)}z`;
const lineD = (x1, y1, x2, y2) => `M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}`;

function buildScene(o, data) {
  const { W, H } = o;
  const base = Math.max(14, Math.round(Math.min(W, H) / 38));
  const ops = [];
  const text = (x, y, s, size, fill = INK, anchor = 'start', weight = 400, rot = 0) => ops.push({ t: 'text', x, y, s, size, fill, anchor, weight, rot });
  const pad = Math.round(base * 1.2);
  let top = pad, bottom = H - pad, left = pad, right = W - pad;

  if (o.title) {
    const ts = Math.round(base * 1.6);
    text(W / 2, top + ts * 0.85, o.title, ts, INK, 'middle', 700);
    top += ts * 1.5;
  }

  const pie = o.type === 'pie' || o.type === 'donut';
  const varied = pie || o.vary;
  const entries = varied
    ? data.map((d, i) => ({ name: d.label, color: colorAt(o.palette, i) }))
    : [{ name: o.valTitle || 'Değerler', color: PALETTES[o.palette].base }];

  // Efsane (legend) alanı
  if (o.legend !== 'yok' && entries.length) {
    const sw = Math.round(base * 0.9);
    const gap = Math.round(base * 0.5);
    if (o.legend === 'ust' || o.legend === 'alt') {
      // Satırlara sar
      const maxW = right - left;
      const rows = [[]];
      let cur = 0;
      entries.forEach((e) => {
        const w = sw + gap + textWidth(e.name, base) + base * 1.2;
        if (cur + w > maxW && rows[rows.length - 1].length) { rows.push([]); cur = 0; }
        rows[rows.length - 1].push({ e, w });
        cur += w;
      });
      const rowH = Math.round(base * 1.6);
      const block = rows.length * rowH;
      const y0 = o.legend === 'ust' ? top + gap : bottom - block;
      rows.forEach((row, r) => {
        const total = row.reduce((a, b) => a + b.w, 0) - base * 1.2;
        let x = (left + right) / 2 - total / 2;
        row.forEach(({ e, w }) => {
          ops.push({ t: 'path', d: rectD(x, y0 + r * rowH + (rowH - sw) / 2 - gap / 2, sw, sw), fill: e.color });
          text(x + sw + gap, y0 + r * rowH + rowH / 2 + base * 0.15, e.name, base, INK);
          x += w;
        });
      });
      if (o.legend === 'ust') top += block + gap * 2; else bottom -= block + gap;
    } else {
      const maxLabel = Math.min((right - left) * 0.3, Math.max(...entries.map((e) => textWidth(e.name, base))));
      const bw = sw + gap + maxLabel;
      const rowH = Math.round(base * 1.6);
      const block = entries.length * rowH;
      const x0 = o.legend === 'sag' ? right - bw : left;
      const y0 = (top + bottom) / 2 - Math.min(block, bottom - top) / 2;
      entries.forEach((e, i) => {
        const y = y0 + i * rowH;
        if (y + rowH > bottom + 1) return; // sığmayanlar atlanır
        ops.push({ t: 'path', d: rectD(x0, y + (rowH - sw) / 2, sw, sw), fill: e.color });
        let label = e.name;
        while (label.length > 3 && textWidth(label, base) > maxLabel) label = `${label.slice(0, -2)}…`;
        text(x0 + sw + gap, y + rowH / 2 + base * 0.35, label, base, INK);
      });
      if (o.legend === 'sag') right -= bw + base * 1.5; else left += bw + base * 1.5;
    }
  }

  if (!data.length) return { ops, empty: true };

  if (pie) {
    const total = data.reduce((a, d) => a + d.value, 0);
    const cx = (left + right) / 2, cy = (top + bottom) / 2;
    const r = Math.max(10, Math.min(right - left, bottom - top) / 2 - base * 0.5);
    const r0 = o.type === 'donut' ? r * 0.55 : 0;
    let a = -Math.PI / 2;
    data.forEach((d, i) => {
      const frac = d.value / total;
      const a1 = a + frac * Math.PI * 2;
      const col = colorAt(o.palette, i);
      let dd;
      const pt = (rad, ang) => `${f2(cx + rad * Math.cos(ang))} ${f2(cy + rad * Math.sin(ang))}`;
      if (frac >= 0.9999) {
        dd = `M${pt(r, a)}A${f2(r)} ${f2(r)} 0 1 1 ${pt(r, a + Math.PI)}A${f2(r)} ${f2(r)} 0 1 1 ${pt(r, a)}z`;
        if (r0) dd += `M${pt(r0, a)}A${f2(r0)} ${f2(r0)} 0 1 0 ${pt(r0, a + Math.PI)}A${f2(r0)} ${f2(r0)} 0 1 0 ${pt(r0, a)}z`;
      } else {
        const large = frac > 0.5 ? 1 : 0;
        dd = r0
          ? `M${pt(r, a)}A${f2(r)} ${f2(r)} 0 ${large} 1 ${pt(r, a1)}L${pt(r0, a1)}A${f2(r0)} ${f2(r0)} 0 ${large} 0 ${pt(r0, a)}z`
          : `M${f2(cx)} ${f2(cy)}L${pt(r, a)}A${f2(r)} ${f2(r)} 0 ${large} 1 ${pt(r, a1)}z`;
      }
      ops.push({ t: 'path', d: dd, fill: col, stroke: '#ffffff', sw: Math.max(1, base / 12), rule: 'evenodd' });
      if (o.labels && frac >= 0.07) {
        const mid = (a + a1) / 2;
        const rr = r0 ? (r + r0) / 2 : r * 0.64;
        const label = `${fmt(d.value)} (%${fmt(Math.round(frac * 1000) / 10)})`;
        text(cx + rr * Math.cos(mid), cy + rr * Math.sin(mid) + base * 0.35, label, Math.round(base * 0.9), textOn(col), 'middle', 600);
      }
      a = a1;
    });
    if (r0) {
      text(cx, cy - base * 0.1, 'Toplam', Math.round(base * 0.9), AXIS, 'middle', 400);
      text(cx, cy + base * 1.2, fmt(total), Math.round(base * 1.5), INK, 'middle', 700);
    }
    return { ops };
  }

  const horizontal = o.type === 'bar';
  const vals = data.map((d) => d.value);
  const sc = niceScale(Math.min(0, ...vals), Math.max(0, ...vals));
  const labelsSize = Math.round(base * 0.9);

  // Eksen adları için yer ayır
  if (o.catTitle) { if (horizontal) left += base * 1.8; else bottom -= base * 1.8; }
  if (o.valTitle) { if (horizontal) bottom -= base * 1.8; else left += base * 1.8; }

  if (horizontal) {
    const catW = Math.min((right - left) * 0.3, Math.max(...data.map((d) => textWidth(d.label, labelsSize))) + base * 0.6);
    const tickH = base * 1.6;
    const px0 = left + catW, px1 = right - base * 3, py0 = top + base * 0.5, py1 = bottom - tickH;
    const X = (v) => px0 + ((v - sc.lo) / (sc.hi - sc.lo)) * (px1 - px0);
    sc.ticks.forEach((t) => {
      ops.push({ t: 'path', d: lineD(X(t), py0, X(t), py1), stroke: GRID, sw: 1 });
      text(X(t), py1 + base * 1.2, fmt(t), labelsSize, AXIS, 'middle');
    });
    const band = (py1 - py0) / data.length;
    const bh = Math.min(band * 0.7, base * 4);
    data.forEach((d, i) => {
      const yc = py0 + band * (i + 0.5);
      const x0 = X(0), x1 = X(d.value);
      ops.push({ t: 'path', d: rectD(Math.min(x0, x1), yc - bh / 2, Math.abs(x1 - x0), bh), fill: varied ? colorAt(o.palette, i) : PALETTES[o.palette].base });
      let lab = d.label;
      while (lab.length > 3 && textWidth(lab, labelsSize) > catW - base * 0.5) lab = `${lab.slice(0, -2)}…`;
      text(px0 - base * 0.4, yc + labelsSize * 0.35, lab, labelsSize, INK, 'end');
      if (o.labels) text(d.value >= 0 ? x1 + base * 0.4 : x1 - base * 0.4, yc + labelsSize * 0.35, fmt(d.value), labelsSize, INK, d.value >= 0 ? 'start' : 'end', 600);
    });
    ops.push({ t: 'path', d: lineD(X(0), py0, X(0), py1), stroke: AXIS, sw: 1.5 });
    if (o.catTitle) text(pad + base * 0.9, (py0 + py1) / 2, o.catTitle, base, INK, 'middle', 600, -90);
    if (o.valTitle) text((px0 + px1) / 2, bottom + base * 1.2, o.valTitle, base, INK, 'middle', 600);
    return { ops };
  }

  // Dikey türler: sütun, çizgi, alan
  const band0 = right - left;
  const maxLab = Math.max(...data.map((d) => textWidth(d.label, labelsSize)));
  const approxBand = (band0 - base * 4) / data.length;
  const rotate = maxLab > approxBand * 0.92;
  const tickH = rotate ? Math.min(maxLab, base * 9) * 0.75 + base * 1.2 : base * 1.8;
  const valW = Math.max(...sc.ticks.map((t) => textWidth(fmt(t), labelsSize))) + base * 0.8;
  const px0 = left + valW, px1 = right - base * 0.5, py0 = top + base * 1.5, py1 = bottom - tickH;
  const Y = (v) => py1 - ((v - sc.lo) / (sc.hi - sc.lo)) * (py1 - py0);
  sc.ticks.forEach((t) => {
    ops.push({ t: 'path', d: lineD(px0, Y(t), px1, Y(t)), stroke: GRID, sw: 1 });
    text(px0 - base * 0.4, Y(t) + labelsSize * 0.35, fmt(t), labelsSize, AXIS, 'end');
  });
  const band = (px1 - px0) / data.length;
  const xc = (i) => px0 + band * (i + 0.5);
  const baseCol = PALETTES[o.palette].base;

  if (o.type === 'column') {
    const bw = Math.min(band * 0.7, base * 5);
    data.forEach((d, i) => {
      const y0 = Y(0), y1 = Y(d.value);
      ops.push({ t: 'path', d: rectD(xc(i) - bw / 2, Math.min(y0, y1), bw, Math.abs(y1 - y0)), fill: varied ? colorAt(o.palette, i) : baseCol });
      if (o.labels) text(xc(i), d.value >= 0 ? y1 - base * 0.4 : y1 + base * 1.2, fmt(d.value), labelsSize, INK, 'middle', 600);
    });
  } else {
    const pts = data.map((d, i) => [xc(i), Y(d.value)]);
    if (o.type === 'area') {
      const d = `M${f2(pts[0][0])} ${f2(Y(0))}${pts.map((p) => `L${f2(p[0])} ${f2(p[1])}`).join('')}L${f2(pts[pts.length - 1][0])} ${f2(Y(0))}z`;
      ops.push({ t: 'path', d, fill: baseCol, op: 0.25 });
    }
    if (pts.length > 1) ops.push({ t: 'path', d: `M${pts.map((p) => `${f2(p[0])} ${f2(p[1])}`).join('L')}`, stroke: baseCol, sw: Math.max(2, base / 6), join: 'round' });
    const rr = Math.max(3, base / 4);
    pts.forEach((p, i) => {
      const c = varied ? colorAt(o.palette, i) : baseCol;
      ops.push({ t: 'path', d: `M${f2(p[0] - rr)} ${f2(p[1])}a${f2(rr)} ${f2(rr)} 0 1 0 ${f2(rr * 2)} 0a${f2(rr)} ${f2(rr)} 0 1 0 ${f2(-rr * 2)} 0z`, fill: c, stroke: '#ffffff', sw: 1.5 });
      if (o.labels) text(p[0], p[1] - base * 0.8, fmt(data[i].value), labelsSize, INK, 'middle', 600);
    });
  }
  ops.push({ t: 'path', d: lineD(px0, Y(0), px1, Y(0)), stroke: AXIS, sw: 1.5 });
  ops.push({ t: 'path', d: lineD(px0, py0, px0, py1), stroke: AXIS, sw: 1 });
  data.forEach((d, i) => {
    let lab = d.label;
    if (rotate) {
      const lim = base * 9;
      while (lab.length > 3 && textWidth(lab, labelsSize) > lim) lab = `${lab.slice(0, -2)}…`;
      text(xc(i) + labelsSize * 0.3, py1 + base * 0.9, lab, labelsSize, INK, 'end', 400, -40);
    } else {
      text(xc(i), py1 + base * 1.3, lab, labelsSize, INK, 'middle');
    }
  });
  if (o.catTitle) text((px0 + px1) / 2, bottom + base * 1.2, o.catTitle, base, INK, 'middle', 600);
  if (o.valTitle) text(pad + base * 0.9, (py0 + py1) / 2, o.valTitle, base, INK, 'middle', 600, -90);
  return { ops };
}

/* ---------- Canvas ve SVG çıktısı ---------- */
function drawCanvas(canvas, o, ops) {
  canvas.width = o.W; canvas.height = o.H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, o.W, o.H);
  if (!o.transparent) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, o.W, o.H); }
  ctx.lineJoin = 'round';
  for (const op of ops) {
    if (op.t === 'path') {
      const p = new Path2D(op.d);
      ctx.globalAlpha = op.op ?? 1;
      if (op.fill) { ctx.fillStyle = op.fill; ctx.fill(p, op.rule || 'nonzero'); }
      ctx.globalAlpha = 1;
      if (op.stroke) { ctx.strokeStyle = op.stroke; ctx.lineWidth = op.sw || 1; ctx.stroke(p); }
    } else {
      ctx.save();
      ctx.fillStyle = op.fill;
      ctx.font = `${op.weight} ${op.size}px ${FONT}`;
      ctx.textAlign = op.anchor === 'middle' ? 'center' : op.anchor === 'end' ? 'right' : 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.translate(op.x, op.y);
      if (op.rot) ctx.rotate((op.rot * Math.PI) / 180);
      ctx.fillText(op.s, 0, 0);
      ctx.restore();
    }
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function toSvg(o, ops) {
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${o.W}" height="${o.H}" viewBox="0 0 ${o.W} ${o.H}" font-family="${esc(FONT_SVG)}">`];
  if (o.title) parts.push(`<title>${esc(o.title)}</title>`);
  if (!o.transparent) parts.push(`<rect width="${o.W}" height="${o.H}" fill="#ffffff"/>`);
  for (const op of ops) {
    if (op.t === 'path') {
      let a = `<path d="${op.d}" fill="${op.fill || 'none'}"`;
      if (op.op != null) a += ` fill-opacity="${op.op}"`;
      if (op.rule) a += ` fill-rule="${op.rule}"`;
      if (op.stroke) a += ` stroke="${op.stroke}" stroke-width="${f2(op.sw || 1)}"`;
      if (op.join) a += ` stroke-linejoin="${op.join}"`;
      parts.push(`${a}/>`);
    } else {
      const rot = op.rot ? ` transform="rotate(${op.rot} ${f2(op.x)} ${f2(op.y)})"` : '';
      parts.push(`<text x="${f2(op.x)}" y="${f2(op.y)}" font-size="${op.size}" font-weight="${op.weight}" fill="${op.fill}" text-anchor="${op.anchor}"${rot}>${esc(op.s)}</text>`);
    }
  }
  parts.push('</svg>');
  return parts.join('\n');
}

/* ---------- Önizleme döngüsü ---------- */
let timer = null;
let current = null; // { o, ops }
function schedule() {
  clearTimeout(timer);
  $('canvas').dataset.ready = '0';
  timer = setTimeout(render, 120);
}

function syncFields() {
  const t = $('opt-type').value;
  const pie = t === 'pie' || t === 'donut';
  $('field-cat').hidden = pie;
  $('field-val').hidden = pie;
  $('field-vary').hidden = pie;
}

function render() {
  showError($('error'), null);
  const o = readOptions();
  const { data, bad } = readData();
  const msgs = [];
  if (bad.length) msgs.push(`${bad.slice(0, 5).join(', ')}. satırdaki değer sayı değil, bu satırlar grafiğe alınmadı. Sayıları 12,5 veya 1.250 biçiminde yazın.`);
  let use = data;
  if (o.type === 'pie' || o.type === 'donut') {
    const pos = data.filter((d) => d.value > 0);
    if (pos.length !== data.length) msgs.push('Pasta ve halka grafikte yalnızca pozitif değerler gösterilir; sıfır ve negatif satırlar atlandı.');
    use = pos;
  }
  $('warn').textContent = msgs.join(' ');
  $('warn').classList.toggle('is-active', msgs.length > 0);
  const canvas = $('canvas');
  if (!use.length) {
    current = null;
    canvas.width = 2; canvas.height = 2;
    $('info').textContent = 'Önizleme için en az bir satır etiket ve sayısal değer girin.';
    canvas.dataset.ready = '0';
    ['download-png', 'download-svg', 'copy'].forEach((id) => { $(id).disabled = true; });
    return;
  }
  try {
    const scene = buildScene(o, use);
    drawCanvas(canvas, o, scene.ops);
    current = { o, ops: scene.ops };
    $('info').textContent = `${o.W}×${o.H} px · ${use.length} satır`;
    canvas.dataset.ready = '1';
    ['download-png', 'download-svg', 'copy'].forEach((id) => { $(id).disabled = false; });
  } catch (err) {
    console.error(err);
    showError($('error'), 'Grafik çizilemedi. Veriyi kontrol edin ya da farklı bir grafik türü seçin.');
  }
}

['opt-type', 'opt-size', 'opt-title', 'opt-cat', 'opt-val', 'opt-palette', 'opt-labels', 'opt-legend', 'opt-vary', 'opt-transparent'].forEach((id) => {
  $(id).addEventListener('input', () => { syncFields(); schedule(); });
  $(id).addEventListener('change', () => { syncFields(); schedule(); });
});

/* ---------- Dışa aktarma ---------- */
const slug = () => {
  const t = $('opt-title').value.trim() || $('opt-type').value;
  const s = t.toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  return `grafik-${s || 'cikti'}`;
};
const toBlob = (canvas) => new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('encode failed'))), 'image/png'));

$('download-png').addEventListener('click', async () => {
  if (!current) return;
  try { downloadBlob(await toBlob($('canvas')), `${slug()}.png`); } catch {
    showError($('error'), 'PNG oluşturulamadı. Tarayıcı belleği yetmemiş olabilir; daha küçük bir boyut ön ayarı seçin.');
  }
});
$('download-svg').addEventListener('click', () => {
  if (!current) return;
  downloadBlob(new Blob([toSvg(current.o, current.ops)], { type: 'image/svg+xml;charset=utf-8' }), `${slug()}.svg`);
});
$('copy').addEventListener('click', async () => {
  if (!current) return;
  try {
    const blob = await toBlob($('canvas'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    $('copy-note').textContent = 'Grafik panoya kopyalandı.';
  } catch {
    $('copy-note').textContent = '';
    showError($('error'), 'Pano kullanılamadı (tarayıcı izin vermemiş olabilir). PNG olarak indirip kullanabilirsiniz.');
  }
});

/* ---------- Başlangıç: örnek veri ---------- */
[['Ocak', '120'], ['Şubat', '95'], ['Mart', '140'], ['Nisan', '180']].forEach(([l, v]) => addRow(l, v));
syncFields();
render();
