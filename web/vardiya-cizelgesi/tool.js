// Vardiya ve Nöbet Çizelgesi — aylık çizelge; PDF (A4 yatay, pdf-lib + DejaVu), PNG ve JSON.
// Tek yerleşim fonksiyonu (buildPages) hem PDF hem PNG için çizim komutları üretir.
// Hiçbir veri ağa gitmez; taslak yalnızca bu tarayıcının localStorage alanında tutulur.
// Yasal uyarılar (haftalık 45 saat, gece 7,5 saat) yalnızca bilgilendirme amaçlıdır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DRAFT_KEY = 'ba-vardiya-cizelgesi-taslak';
const APP_ID = 'bilisimajans-vardiya-cizelgesi';
const PW = 841.89, PH = 595.28; // A4 yatay (pt)
const MAX_EMP = 40;
const CODES = ['S', 'A', 'G', 'İ'];
const LABELS = { S: 'Sabah', A: 'Akşam', G: 'Gece', 'İ': 'İzin' };
const WD = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DEFAULT_TYPES = {
  S: { start: '08:00', end: '16:00', color: '#fde9a8' },
  A: { start: '16:00', end: '00:00', color: '#bcd7f2' },
  G: { start: '23:00', end: '06:30', color: '#d9c8f0' },
  'İ': { start: '', end: '', color: '#bfe3c8' },
};
const WEEK_LIMIT = 45, NIGHT_LIMIT = 7.5;

const now = new Date();
const state = {
  title: 'Vardiya Çizelgesi', month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
  emps: '', types: JSON.parse(JSON.stringify(DEFAULT_TYPES)),
  pattern: 'S,S,A,A,G,G,İ,İ', offset: 0, step: 2, fixLeave: false, cells: {},
};
let fontCache = null;
let saveTimer = 0;

const hexToRgb01 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const fmtH = (h) => (Number.isInteger(h) ? String(h) : h.toFixed(1).replace('.', ','));
const trUp = (s) => s.toLocaleUpperCase('tr-TR');

// ---------- Veri yardımcıları ----------
function employees() {
  return state.emps.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function monthInfo() {
  const m = /^(\d{4})-(\d{2})$/.exec(state.month);
  if (!m || +m[2] < 1 || +m[2] > 12) throw new Error('Ay geçersiz. Ay alanından bir ay seçin (örn. Kasım 2026).');
  const y = +m[1], mo = +m[2];
  const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  const wd = (d) => (new Date(Date.UTC(y, mo - 1, d)).getUTCDay() + 6) % 7; // 0 = Pazartesi
  return { y, mo, days, wd, name: `${MONTHS[mo - 1]} ${y}` };
}

/** Vardiya süresi (saat); gece yarısını aşan vardiyalar dahil. İzin için 0. */
function typeHours(code) {
  const t = state.types[code];
  if (!t || code === 'İ' || !t.start || !t.end) return 0;
  const [a, b] = [t.start, t.end].map((x) => { const [h, m] = x.split(':').map(Number); return h * 60 + m; });
  const d = (b - a + 1440) % 1440;
  return (d === 0 ? 1440 : d) / 60;
}

function normCode(raw) {
  const u = trUp(String(raw).trim());
  if (u === 'I') return 'İ'; // ASCII I yazıldıysa izin kabul et
  return CODES.includes(u) ? u : '';
}

/** Kişi başı toplamlar: saat ve tür sayıları. */
function totals(ei, days) {
  const t = { h: 0, S: 0, A: 0, G: 0, 'İ': 0 };
  for (let d = 1; d <= days; d++) {
    const c = state.cells[`${ei}-${d}`];
    if (!c) continue;
    t[c]++;
    t.h += typeHours(c);
  }
  return t;
}

/** Uyarılar: eksik haftalık izin, 45 saat aşımı, gece vardiyası uzunluğu. */
function computeWarnings() {
  const out = [];
  let mi; try { mi = monthInfo(); } catch { return out; }
  const emps = employees();
  if (typeHours('G') > NIGHT_LIMIT) out.push(`Gece vardiyası ${fmtH(typeHours('G'))} saat; İş Kanunu md. 69 gece çalışmasını günde en fazla 7,5 saat ile sınırlar. Saatleri kısaltın.`);
  // Pazartesi başlayan haftalar
  const weeks = [];
  let cur = [];
  for (let d = 1; d <= mi.days; d++) {
    if (mi.wd(d) === 0 && cur.length) { weeks.push(cur); cur = []; }
    cur.push(d);
  }
  if (cur.length) weeks.push(cur);
  emps.forEach((name, ei) => {
    weeks.forEach((w, wi) => {
      const hrs = w.reduce((s, d) => s + typeHours(state.cells[`${ei}-${d}`] || ''), 0);
      const filled = w.some((d) => state.cells[`${ei}-${d}`]);
      if (hrs > WEEK_LIMIT) out.push(`${name}: ${wi + 1}. haftada ${fmtH(hrs)} saat çalışma var; haftalık 45 saati aşıyor (İş Kanunu md. 63).`);
      if (filled && w.length === 7 && !w.some((d) => state.cells[`${ei}-${d}`] === 'İ')) out.push(`${name}: ${wi + 1}. haftada (${w[0]}-${w[6]} ${MONTHS[mi.mo - 1]}) izin günü yok; haftada en az 24 saat dinlenme gerekir (md. 46).`);
    });
  });
  return out;
}

// ---------- Formdan duruma ----------
function readControls() {
  state.title = $('f-title').value.trim();
  state.month = $('f-month').value;
  state.emps = $('f-emps').value;
  for (const c of CODES) {
    if (c === 'İ') { state.types[c].color = $('t-İ-color').value; continue; }
    state.types[c] = { start: $(`t-${c}-start`).value, end: $(`t-${c}-end`).value, color: $(`t-${c}-color`).value };
  }
  state.pattern = $('f-pattern').value;
  state.offset = Math.round(Number($('f-offset').value)) || 0;
  state.step = Math.round(Number($('f-step').value)) || 0;
  state.fixLeave = $('f-fix').checked;
}

function writeControls() {
  $('f-title').value = state.title;
  $('f-month').value = state.month;
  $('f-emps').value = state.emps;
  for (const c of CODES) {
    $(`t-${c}-color`).value = state.types[c].color;
    if (c !== 'İ') { $(`t-${c}-start`).value = state.types[c].start; $(`t-${c}-end`).value = state.types[c].end; }
  }
  $('f-pattern').value = state.pattern;
  $('f-offset').value = state.offset;
  $('f-step').value = state.step;
  $('f-fix').checked = state.fixLeave;
}

// ---------- Izgara ----------
function cellStyle(btn, code) {
  btn.textContent = code || '';
  btn.style.background = code ? state.types[code].color : '';
}

function cellLabel(name, day, mi, code) {
  return `${name}, ${day} ${MONTHS[mi.mo - 1]}: ${code ? LABELS[code] : 'boş'}`;
}

function buildGrid() {
  const table = $('grid');
  table.textContent = '';
  let mi;
  try { mi = monthInfo(); } catch (e) { showError($('error'), e.message); return; }
  const emps = employees();
  const cap = document.createElement('caption');
  cap.className = 'visually-hidden';
  cap.textContent = `${mi.name} vardiya çizelgesi. Hücreye tıklayarak sabah, akşam, gece ve izin arasında geçiş yapın.`;
  table.appendChild(cap);
  const head = table.createTHead().insertRow();
  const hn = document.createElement('th'); hn.scope = 'col'; hn.textContent = 'Çalışan'; hn.className = 'name';
  head.appendChild(hn);
  for (let d = 1; d <= mi.days; d++) {
    const th = document.createElement('th');
    th.scope = 'col';
    const w = mi.wd(d);
    th.className = w >= 5 ? 'we' : '';
    th.innerHTML = `<span class="dn">${d}</span><span class="wd">${WD[w]}</span>`;
    head.appendChild(th);
  }
  for (const [k, lab] of [['h', 'Saat'], ...CODES.map((c) => [c, c])]) {
    const th = document.createElement('th'); th.scope = 'col'; th.className = 'tot'; th.textContent = lab;
    th.title = k === 'h' ? 'Toplam çalışma saati' : `${LABELS[k]} vardiyası gün sayısı`;
    head.appendChild(th);
  }
  const body = table.createTBody();
  emps.forEach((name, ei) => {
    const tr = body.insertRow();
    const th = document.createElement('th'); th.scope = 'row'; th.className = 'name'; th.textContent = name;
    tr.appendChild(th);
    for (let d = 1; d <= mi.days; d++) {
      const td = tr.insertCell();
      if (mi.wd(d) >= 5) td.className = 'we';
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'cell'; b.dataset.e = String(ei); b.dataset.d = String(d);
      const code = state.cells[`${ei}-${d}`] || '';
      cellStyle(b, code);
      b.setAttribute('aria-label', cellLabel(name, d, mi, code));
      td.appendChild(b);
    }
    for (let k = 0; k < 5; k++) { const td = tr.insertCell(); td.className = 'tot'; }
    refreshTotals(tr, ei, mi);
  });
  renderWarnings();
}

function refreshTotals(tr, ei, mi) {
  const t = totals(ei, mi.days);
  const cells = tr.querySelectorAll('td.tot');
  cells[0].textContent = fmtH(t.h);
  CODES.forEach((c, i) => { cells[i + 1].textContent = String(t[c]); });
}

function renderWarnings() {
  const w = computeWarnings();
  const box = $('warnings');
  box.textContent = '';
  box.hidden = !w.length;
  if (!w.length) return;
  const h = document.createElement('strong');
  h.textContent = `${w.length} uyarı (bilgilendirme):`;
  box.appendChild(h);
  const ul = document.createElement('ul');
  for (const m of w.slice(0, 12)) { const li = document.createElement('li'); li.textContent = m; ul.appendChild(li); }
  if (w.length > 12) { const li = document.createElement('li'); li.textContent = `… ve ${w.length - 12} uyarı daha.`; ul.appendChild(li); }
  box.appendChild(ul);
}

function refresh() {
  readControls();
  showError($('error'), null);
  const n = employees().length;
  if (n > MAX_EMP) { showError($('error'), `En fazla ${MAX_EMP} çalışan girilebilir; ${n} satır var. Fazla satırları silin ya da çizelgeyi ikiye bölün.`); }
  // Çalışan sayısı azaldıysa artık kullanılmayan hücreleri temizle
  for (const k of Object.keys(state.cells)) if (+k.split('-')[0] >= n) delete state.cells[k];
  buildGrid();
  scheduleSave();
}

$('grid').addEventListener('click', (e) => {
  const b = e.target.closest('button.cell');
  if (!b) return;
  const ei = +b.dataset.e, d = +b.dataset.d;
  const cur = state.cells[`${ei}-${d}`] || '';
  const next = CODES[CODES.indexOf(cur) + 1] || '';
  if (next) state.cells[`${ei}-${d}`] = next; else delete state.cells[`${ei}-${d}`];
  const mi = monthInfo();
  cellStyle(b, next);
  b.setAttribute('aria-label', cellLabel(employees()[ei], d, mi, next));
  refreshTotals(b.closest('tr'), ei, mi);
  renderWarnings();
  scheduleSave();
});

// ---------- Rotasyon ----------
function applyRotation() {
  readControls();
  showError($('error'), null);
  const emps = employees();
  if (!emps.length) { showError($('error'), 'Önce çalışan listesine en az bir ad yazın (her satıra bir kişi).'); return; }
  if (emps.length > MAX_EMP) { refresh(); return; }
  const raw = state.pattern.split(/[\s,;]+/).filter(Boolean);
  const pat = raw.map(normCode);
  if (!pat.length || pat.some((c) => !c)) {
    const bad = raw.find((r) => !normCode(r));
    showError($('error'), `Rotasyon düzeninde tanınmayan kod var${bad ? `: "${bad}"` : ''}. Yalnızca S (sabah), A (akşam), G (gece), İ (izin) kodlarını virgülle yazın; örn. S,S,A,A,G,G,İ,İ.`);
    return;
  }
  let mi; try { mi = monthInfo(); } catch (e) { showError($('error'), e.message); return; }
  state.cells = {};
  emps.forEach((_, ei) => {
    for (let d = 1; d <= mi.days; d++) {
      const idx = (((state.offset + ei * state.step + (d - 1)) % pat.length) + pat.length) % pat.length;
      state.cells[`${ei}-${d}`] = pat[idx];
    }
  });
  let added = 0;
  if (state.fixLeave) {
    // Tam (Pazartesi–Pazar) haftada izin yoksa Pazar gününü izin yap
    emps.forEach((_, ei) => {
      for (let d = 1; d + 6 <= mi.days; d++) {
        if (mi.wd(d) !== 0) continue;
        let has = false;
        for (let k = 0; k < 7; k++) if (state.cells[`${ei}-${d + k}`] === 'İ') has = true;
        if (!has) { state.cells[`${ei}-${d + 6}`] = 'İ'; added++; }
      }
    });
  }
  buildGrid();
  scheduleSave();
  $('status').textContent = `Rotasyon uygulandı: ${emps.length} çalışan, ${mi.days} gün.${added ? ` ${added} haftaya izin günü eklendi.` : ''}`;
}
$('apply-rotation').addEventListener('click', applyRotation);
$('clear-cells').addEventListener('click', () => {
  state.cells = {}; buildGrid(); scheduleSave();
  $('status').textContent = 'Tüm hücreler temizlendi.';
});

// ---------- Taslak ve JSON ----------
function serialize() {
  readControls();
  return { surum: 1, uygulama: APP_ID, ...state };
}

function sanitize(raw) {
  if (!raw || typeof raw !== 'object' || raw.uygulama !== APP_ID) throw new Error('BAD');
  const s = JSON.parse(JSON.stringify({ ...state, cells: {}, types: DEFAULT_TYPES }));
  const str = (v, n, d) => (typeof v === 'string' ? v.slice(0, n) : d);
  s.title = str(raw.title, 80, 'Vardiya Çizelgesi');
  s.month = /^\d{4}-(0[1-9]|1[0-2])$/.test(raw.month) ? raw.month : state.month;
  s.emps = str(raw.emps, 3000, '').split(/\r?\n/).slice(0, MAX_EMP).map((l) => l.slice(0, 40)).join('\n');
  s.pattern = str(raw.pattern, 120, 'S,S,A,A,G,G,İ,İ');
  s.offset = Number.isInteger(raw.offset) ? Math.max(-999, Math.min(999, raw.offset)) : 0;
  s.step = Number.isInteger(raw.step) ? Math.max(-999, Math.min(999, raw.step)) : 2;
  s.fixLeave = raw.fixLeave === true;
  if (raw.types && typeof raw.types === 'object') {
    for (const c of CODES) {
      const t = raw.types[c];
      if (!t) continue;
      const time = (x, d) => (typeof x === 'string' && /^\d{2}:\d{2}$/.test(x) ? x : d);
      s.types[c] = { start: c === 'İ' ? '' : time(t.start, DEFAULT_TYPES[c].start), end: c === 'İ' ? '' : time(t.end, DEFAULT_TYPES[c].end), color: /^#[0-9a-f]{6}$/i.test(t.color) ? t.color : DEFAULT_TYPES[c].color };
    }
  }
  if (raw.cells && typeof raw.cells === 'object') {
    for (const [k, v] of Object.entries(raw.cells)) {
      if (/^\d{1,2}-\d{1,2}$/.test(k) && CODES.includes(v)) s.cells[k] = v;
    }
  }
  return s;
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(serialize())); $('draft-status').textContent = 'Taslak bu tarayıcıya kaydedildi.'; }
    catch { $('draft-status').textContent = 'Taslak kaydedilemedi (tarayıcı depolaması kapalı olabilir). JSON olarak indirmeyi deneyin.'; }
  }, 400);
}

function applyState(s) {
  Object.assign(state, s);
  writeControls();
  buildGrid();
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return false;
    applyState(sanitize(JSON.parse(raw)));
    $('draft-status').textContent = 'Önceki taslağınız bu tarayıcıdan yüklendi.';
    return true;
  } catch { return false; }
}

// ---------- Yerleşim (PDF ve PNG ortak) ----------
/** Sayfa başına çizim komutları; koordinatlar sol üst köşeye göre pt. */
function buildPages(measure) {
  const mi = monthInfo();
  const emps = employees();
  const M = 24;
  const W = PW - 2 * M;
  const nameW = 104, totW = [28, 20, 20, 20, 20];
  const dayW = (W - nameW - totW.reduce((a, b) => a + b, 0)) / mi.days;
  const headH = 28, footerH = 44;
  const top0 = M + 34;
  const rowH = 20;
  const perPage = Math.max(1, Math.floor((PH - M - footerH - top0 - headH) / rowH));
  const pageCount = Math.max(1, Math.ceil(emps.length / perPage));
  const fit = (text, size, bold, maxW) => {
    if (measure(text, size, bold) <= maxW) return text;
    let s = text;
    while (s.length > 1 && measure(`${s}…`, size, bold) > maxW) s = s.slice(0, -1);
    return `${s}…`;
  };
  const pages = [];
  for (let p = 0; p < pageCount; p++) {
    const ops = [];
    const title = state.title || 'Vardiya Çizelgesi';
    ops.push({ t: 'text', s: fit(`${title} – ${mi.name}`, 16, true, W - 80), x: M, y: M + 14, size: 16, bold: true, color: '#7b2331' });
    if (pageCount > 1) ops.push({ t: 'text', s: `Sayfa ${p + 1} / ${pageCount}`, x: PW - M, y: M + 14, size: 9, bold: false, color: '#444444', align: 'r' });
    ops.push({ t: 'text', s: 'Vardiya çizelgesi · araclar.bilisimajans.com', x: M, y: M + 27, size: 7.5, bold: false, color: '#666666' });
    // Başlık satırı
    const top = top0;
    ops.push({ t: 'rect', x: M, y: top, w: W, h: headH, fill: '#7b2331', stroke: '#7b2331', lw: 0.5 });
    ops.push({ t: 'text', s: 'Çalışan', x: M + 5, y: top + 17, size: 8.5, bold: true, color: '#ffffff' });
    for (let d = 1; d <= mi.days; d++) {
      const x = M + nameW + dayW * (d - 1);
      const we = mi.wd(d) >= 5;
      if (we) ops.push({ t: 'rect', x, y: top, w: dayW, h: headH, fill: '#4f1621', stroke: null, lw: 0 });
      ops.push({ t: 'text', s: String(d), x: x + dayW / 2, y: top + 12, size: 7.5, bold: true, color: '#ffffff', align: 'c' });
      ops.push({ t: 'text', s: WD[mi.wd(d)], x: x + dayW / 2, y: top + 23, size: 6, bold: false, color: '#ffffff', align: 'c' });
    }
    let tx = M + nameW + dayW * mi.days;
    ['Saat', ...CODES].forEach((lab, i) => {
      ops.push({ t: 'text', s: lab, x: tx + totW[i] / 2, y: top + 17, size: 8, bold: true, color: '#ffffff', align: 'c' });
      tx += totW[i];
    });
    // Satırlar
    const slice = emps.slice(p * perPage, (p + 1) * perPage);
    slice.forEach((name, i) => {
      const ei = p * perPage + i;
      const y = top + headH + rowH * i;
      ops.push({ t: 'rect', x: M, y, w: nameW, h: rowH, fill: i % 2 ? '#ffffff' : '#f8eaec', stroke: '#777777', lw: 0.5 });
      ops.push({ t: 'text', s: fit(name, 8.5, true, nameW - 8), x: M + 4, y: y + 13.5, size: 8.5, bold: true, color: '#111111' });
      for (let d = 1; d <= mi.days; d++) {
        const x = M + nameW + dayW * (d - 1);
        const code = state.cells[`${ei}-${d}`] || '';
        const fill = code ? state.types[code].color : (mi.wd(d) >= 5 ? '#ececec' : '#ffffff');
        ops.push({ t: 'rect', x, y, w: dayW, h: rowH, fill, stroke: '#777777', lw: 0.4 });
        if (code) ops.push({ t: 'text', s: code, x: x + dayW / 2, y: y + 13.5, size: 8, bold: true, color: '#111111', align: 'c' });
      }
      const t = totals(ei, mi.days);
      let x = M + nameW + dayW * mi.days;
      [fmtH(t.h), ...CODES.map((c) => String(t[c]))].forEach((v, k) => {
        ops.push({ t: 'rect', x, y, w: totW[k], h: rowH, fill: '#f2f2f2', stroke: '#777777', lw: 0.5 });
        ops.push({ t: 'text', s: v, x: x + totW[k] / 2, y: y + 13.5, size: 8, bold: k === 0, color: '#111111', align: 'c' });
        x += totW[k];
      });
    });
    // Açıklama (her sayfanın altında)
    const fy = PH - M - footerH + 8;
    let lx = M;
    CODES.forEach((c) => {
      const t = state.types[c];
      const txt = c === 'İ' ? `${c} = İzin` : `${c} = ${LABELS[c]} ${t.start}-${t.end} (${fmtH(typeHours(c))} sa)`;
      ops.push({ t: 'rect', x: lx, y: fy - 7, w: 9, h: 9, fill: t.color, stroke: '#777777', lw: 0.4 });
      ops.push({ t: 'text', s: txt, x: lx + 13, y: fy, size: 8, bold: false, color: '#111111' });
      lx += 13 + measure(txt, 8, false) + 16;
    });
    ops.push({ t: 'text', s: 'Bilgilendirme: Haftalık çalışma süresi 45 saati (İş Kanunu md. 63), gece çalışması günde 7,5 saati (md. 69) aşmamalıdır. Bu çizelge hukuki tavsiye değildir.', x: M, y: fy + 16, size: 6.5, bold: false, color: '#555555' });
    pages.push(ops);
  }
  return pages;
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (n) => fetch(`${base}${n}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

async function buildPdf() {
  const PDFLib = await getPdfLib();
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  const fd = await loadFonts();
  const doc = await PDFLib.PDFDocument.create();
  doc.registerFontkit(window.fontkit);
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  doc.setTitle(state.title || 'Vardiya Çizelgesi');
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  const { rgb } = PDFLib;
  const col = (h) => { const [r, g, b] = hexToRgb01(h); return rgb(r, g, b); };
  const pages = buildPages((s, size, b) => (b ? bold : reg).widthOfTextAtSize(s, size));
  for (const ops of pages) {
    const page = doc.addPage([PW, PH]);
    for (const o of ops) {
      if (o.t === 'rect') {
        const opt = { x: o.x, y: PH - o.y - o.h, width: o.w, height: o.h, color: col(o.fill) };
        if (o.stroke) { opt.borderColor = col(o.stroke); opt.borderWidth = o.lw; }
        page.drawRectangle(opt);
      } else {
        const f = o.bold ? bold : reg;
        const w = f.widthOfTextAtSize(o.s, o.size);
        const x = o.align === 'c' ? o.x - w / 2 : (o.align === 'r' ? o.x - w : o.x);
        page.drawText(o.s, { x, y: PH - o.y, size: o.size, font: f, color: col(o.color) });
      }
    }
  }
  return new Blob([await doc.save()], { type: 'application/pdf' });
}

async function buildPng() {
  const fd = await loadFonts();
  try {
    const face = new FontFace('BA DejaVu', fd.regular);
    const faceB = new FontFace('BA DejaVu', fd.bold, { weight: 'bold' });
    await Promise.all([face.load(), faceB.load()]);
    document.fonts.add(face); document.fonts.add(faceB);
  } catch { /* sistem yazı tipiyle devam */ }
  const k = 2246 / PW;
  const font = (size, b) => `${b ? 'bold ' : ''}${size * k}px "BA DejaVu", "DejaVu Sans", sans-serif`;
  const probe = document.createElement('canvas').getContext('2d');
  const pages = buildPages((s, size, b) => { probe.font = font(size, b); return probe.measureText(s).width / k; });
  const canvas = document.createElement('canvas');
  canvas.width = 2246; canvas.height = Math.round(PH * k) * pages.length;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  pages.forEach((ops, pi) => {
    const oy = pi * PH;
    for (const o of ops) {
      if (o.t === 'rect') {
        ctx.fillStyle = o.fill; ctx.fillRect(o.x * k, (o.y + oy) * k, o.w * k, o.h * k);
        if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = o.lw * k; ctx.strokeRect(o.x * k, (o.y + oy) * k, o.w * k, o.h * k); }
      } else {
        ctx.font = font(o.size, o.bold); ctx.fillStyle = o.color;
        ctx.textAlign = o.align === 'c' ? 'center' : (o.align === 'r' ? 'right' : 'left');
        ctx.fillText(o.s, o.x * k, (o.y + oy) * k);
      }
    }
  });
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('PNG'))), 'image/png'));
}

// ---------- İndirme ----------
function fileBase() {
  const raw = `${state.title || 'vardiya-cizelgesi'}-${state.month}`.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşüâîû]+/gi, '-').replace(/^-+|-+$/g, '');
  return raw || 'vardiya-cizelgesi';
}

async function run(btnId, label, ext, maker) {
  const btn = $(btnId);
  showError($('error'), null);
  readControls();
  const emps = employees();
  if (!emps.length) { showError($('error'), 'Çalışan listesi boş. Her satıra bir ad yazın, sonra vardiyaları doldurun.'); return; }
  if (emps.length > MAX_EMP) { showError($('error'), `En fazla ${MAX_EMP} çalışan girilebilir. Fazla satırları silin.`); return; }
  try { monthInfo(); } catch (e) { showError($('error'), e.message); return; }
  if (!Object.keys(state.cells).length) { showError($('error'), 'Çizelgede hiç vardiya yok. "Rotasyonu uygula" düğmesine basın ya da hücrelere tıklayarak vardiya seçin.'); return; }
  btn.disabled = true;
  setProgress($('progress'), 30, `${label} hazırlanıyor…`);
  await tick();
  try {
    const blob = await maker();
    const name = `${fileBase()}.${ext}`;
    downloadBlob(blob, name);
    $('result-info').textContent = `${formatBytes(blob.size)} · ${name}`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    showError($('error'), String(err && err.message) === 'FONT'
      ? 'Yazı tipi dosyası yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : `${label} oluşturulurken bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse çalışan sayısını azaltın.`);
  } finally { setProgress($('progress'), null); btn.disabled = false; }
}

$('make-pdf').addEventListener('click', () => run('make-pdf', 'PDF', 'pdf', buildPdf));
$('make-png').addEventListener('click', () => run('make-png', 'PNG görseli', 'png', buildPng));

$('save-json').addEventListener('click', () => {
  showError($('error'), null);
  downloadBlob(new Blob([JSON.stringify(serialize(), null, 2)], { type: 'application/json' }), `${fileBase()}.json`);
  $('draft-status').textContent = 'JSON dosyası indirildi. Daha sonra "JSON yükle" ile devam edebilirsiniz.';
});

createDropzone({
  el: $('json-drop'), accept: '.json,application/json', multiple: false,
  onFiles: async ([file]) => {
    showError($('error'), null);
    try {
      if (file.size > 1024 * 1024) throw new Error('BIG');
      applyState(sanitize(JSON.parse(await file.text())));
      scheduleSave();
      $('draft-status').textContent = `"${file.name}" yüklendi.`;
    } catch (e) {
      showError($('error'), e.message === 'BIG'
        ? 'JSON dosyası çok büyük. Bu araçta kaydettiğiniz bir çizelge dosyası seçin.'
        : 'Bu dosya bir vardiya çizelgesi kaydı değil ya da bozuk. Bu sayfadan "JSON kaydet" ile indirdiğiniz dosyayı seçin.');
    }
  },
});

$('clear-draft').addEventListener('click', () => {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* yok say */ }
  $('draft-status').textContent = 'Kayıtlı taslak silindi.';
});

['f-title', 'f-month', 'f-emps', 't-S-start', 't-S-end', 't-S-color', 't-A-start', 't-A-end', 't-A-color', 't-G-start', 't-G-end', 't-G-color', 't-İ-color', 'f-pattern', 'f-offset', 'f-step', 'f-fix']
  .forEach((id) => $(id).addEventListener('input', refresh));
$('form').addEventListener('submit', (e) => e.preventDefault());

// Başlangıç
writeControls();
if (!loadDraft()) buildGrid();
document.documentElement.dataset.ready = '1';
