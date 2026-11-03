// Ders Programı Oluşturucu — haftalık program tablosu; PDF (A4 yatay, pdf-lib + DejaVu), PNG ve JSON.
// Tek bir yerleşim fonksiyonu (buildOps) hem PDF hem PNG için çizim komutları üretir.
// Hiçbir veri ağa gitmez; taslak yalnızca bu tarayıcının localStorage alanında tutulur.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, getPdfLib, loadScript, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const DRAFT_KEY = 'ba-ders-programi-taslak';
const PW = 841.89, PH = 595.28; // A4 yatay (pt)
const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const THEMES = {
  bordo: { accent: '#7b2331', tint: '#f8eaec', headText: '#ffffff' },
  mavi: { accent: '#1d4e89', tint: '#e6eef8', headText: '#ffffff' },
  yesil: { accent: '#1f6b46', tint: '#e5f3ec', headText: '#ffffff' },
  bw: { accent: '#000000', tint: '#e6e6e6', headText: '#000000', plainHead: true },
};
const PRESETS = {
  ogrenci: { days: 5, start: '08:30', lesson: 40, brk: 10, count: 7, title: 'Ders Programı' },
  ogretmen: { days: 5, start: '08:30', lesson: 40, brk: 10, count: 8, title: 'Haftalık Ders Programı' },
  calisma: { days: 7, start: '09:00', lesson: 50, brk: 10, count: 6, title: 'Haftalık Çalışma Programı' },
};

const state = {
  days: 5, manual: false, start: '08:30', lesson: 40, brk: 10, count: 7, times: '',
  title: 'Ders Programı', name: '', cls: '', term: '', theme: 'bordo', cells: {},
};
let slots = [];
let activeCell = null;
let fontCache = null;
let saveTimer = 0;

const pad = (n) => String(n).padStart(2, '0');
const toHM = (min) => `${pad(Math.floor(min / 60) % 24)}:${pad(min % 60)}`;
const hexToRgb01 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

// ---------- Saat dilimleri ----------

/** Seçeneklerden saat dilimlerini üretir; geçersizse Türkçe hata fırlatır. */
function computeSlots(s) {
  if (s.manual) {
    const lines = s.times.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) throw new Error('Saat listesi boş. Her satıra "08:30-09:10" biçiminde bir ders saati yazın.');
    if (lines.length > 14) throw new Error('En fazla 14 ders saati girilebilir. Fazla satırları silin.');
    return lines.map((l, i) => {
      const m = l.match(/^(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})$/);
      if (!m) throw new Error(`${i + 1}. satır anlaşılamadı: "${l}". "08:30-09:10" biçiminde yazın.`);
      const a = +m[1] * 60 + +m[2], b = +m[3] * 60 + +m[4];
      if (+m[1] > 23 || +m[3] > 23 || +m[2] > 59 || +m[4] > 59 || b <= a) throw new Error(`${i + 1}. satırda saat geçersiz: bitiş, başlangıçtan sonra olmalı.`);
      return { start: toHM(a), end: toHM(b) };
    });
  }
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.start);
  if (!m || +m[1] > 23 || +m[2] > 59) throw new Error('Başlangıç saati geçersiz. Saat alanına 08:30 gibi bir saat yazın.');
  if (!Number.isInteger(s.lesson) || s.lesson < 10 || s.lesson > 180) throw new Error('Ders süresi 10 ile 180 dakika arasında olmalı.');
  if (!Number.isInteger(s.brk) || s.brk < 0 || s.brk > 60) throw new Error('Teneffüs 0 ile 60 dakika arasında olmalı.');
  if (!Number.isInteger(s.count) || s.count < 1 || s.count > 14) throw new Error('Ders sayısı 1 ile 14 arasında olmalı.');
  const out = [];
  let t = +m[1] * 60 + +m[2];
  for (let i = 0; i < s.count; i++) {
    if (t + s.lesson >= 24 * 60) throw new Error('Dersler gece yarısını aşıyor. Başlangıç saatini erkene alın ya da ders sayısını azaltın.');
    out.push({ start: toHM(t), end: toHM(t + s.lesson) });
    t += s.lesson + s.brk;
  }
  return out;
}

// ---------- Formdan duruma ----------

function readControls() {
  state.days = Number($('opt-days').value);
  state.manual = $('opt-manual').checked;
  state.start = $('opt-start').value;
  state.lesson = Number($('opt-lesson').value);
  state.brk = Number($('opt-break').value);
  state.count = Number($('opt-count').value);
  state.times = $('opt-times').value;
  state.title = $('f-title').value.trim();
  state.name = $('f-name').value.trim();
  state.cls = $('f-class').value.trim();
  state.term = $('f-term').value.trim();
  state.theme = $('opt-theme').value;
}

function writeControls() {
  $('opt-days').value = String(state.days);
  $('opt-manual').checked = state.manual;
  $('opt-start').value = state.start;
  $('opt-lesson').value = state.lesson;
  $('opt-break').value = state.brk;
  $('opt-count').value = state.count;
  $('opt-times').value = state.times;
  $('f-title').value = state.title;
  $('f-name').value = state.name;
  $('f-class').value = state.cls;
  $('f-term').value = state.term;
  $('opt-theme').value = state.theme;
  syncManualUi();
}

function syncManualUi() {
  $('auto-fields').hidden = state.manual;
  $('manual-fields').hidden = !state.manual;
}

// ---------- Izgara (canlı önizleme) ----------

function applyThemeVars() {
  const t = THEMES[state.theme] || THEMES.bordo;
  const g = $('grid-wrap');
  g.style.setProperty('--ds-accent', t.accent);
  g.style.setProperty('--ds-tint', t.tint);
  g.style.setProperty('--ds-head-text', t.headText);
  g.classList.toggle('plain-head', !!t.plainHead);
  $('ds-title').textContent = state.title || 'Ders Programı';
  $('ds-sub').textContent = [state.name, state.cls, state.term].filter(Boolean).join(' · ');
}

function buildGrid() {
  const table = $('grid');
  table.textContent = '';
  const cap = document.createElement('caption');
  cap.className = 'visually-hidden';
  cap.textContent = 'Haftalık ders programı. Hücreye ders adını yazın.';
  table.appendChild(cap);
  const head = table.createTHead().insertRow();
  const corner = document.createElement('th');
  corner.scope = 'col'; corner.textContent = 'Saat';
  head.appendChild(corner);
  for (let d = 0; d < state.days; d++) {
    const th = document.createElement('th');
    th.scope = 'col'; th.textContent = DAYS[d];
    head.appendChild(th);
  }
  const body = table.createTBody();
  slots.forEach((sl, s) => {
    const tr = body.insertRow();
    const th = document.createElement('th');
    th.scope = 'row';
    th.innerHTML = `<span class="no">${s + 1}.</span> <span class="tm">${sl.start}<br>${sl.end}</span>`;
    tr.appendChild(th);
    for (let d = 0; d < state.days; d++) {
      const td = tr.insertCell();
      const key = `${d}-${s}`;
      const inp = document.createElement('input');
      inp.type = 'text'; inp.id = `cell-${key}`; inp.maxLength = 60; inp.autocomplete = 'off';
      inp.setAttribute('aria-label', `${DAYS[d]} ${s + 1}. ders, ${sl.start}-${sl.end}`);
      const c = state.cells[key];
      if (c) { inp.value = c.t || ''; if (c.c) td.style.background = c.c; }
      inp.addEventListener('focus', () => { activeCell = key; });
      inp.addEventListener('input', () => {
        const cur = state.cells[key] || {};
        state.cells[key] = { t: inp.value, c: cur.c || '' };
        scheduleSave();
      });
      td.appendChild(inp);
    }
  });
}

/** Seçenekler değişince saatleri yeniden hesaplar; hata varsa eski ızgarayı korur. */
function refresh() {
  readControls();
  try {
    const next = computeSlots(state);
    slots = next;
    showError($('error'), null);
    buildGrid();
  } catch (e) {
    showError($('error'), e.message);
  }
  applyThemeVars();
  scheduleSave();
}

// ---------- Renk paleti ----------

function setCellColor(color) {
  if (!activeCell) { $('palette-status').textContent = 'Önce bir hücreye tıklayın, sonra rengi seçin.'; return; }
  const [d] = activeCell.split('-').map(Number);
  if (d >= state.days) return;
  const cur = state.cells[activeCell] || { t: '' };
  state.cells[activeCell] = { t: cur.t || '', c: color };
  const inp = $(`cell-${activeCell}`);
  if (inp) { inp.parentElement.style.background = color || ''; inp.focus(); }
  $('palette-status').textContent = color ? 'Hücre renklendirildi.' : 'Hücre rengi kaldırıldı.';
  scheduleSave();
}

// ---------- Taslak, JSON ----------

function serialize() {
  readControls();
  return { surum: 1, uygulama: 'bilisimajans-ders-programi', ...state };
}

function sanitize(raw) {
  if (!raw || typeof raw !== 'object' || raw.uygulama !== 'bilisimajans-ders-programi') throw new Error('BAD');
  const s = { ...state, cells: {} };
  const num = (v, a, b, dflt) => (Number.isInteger(v) && v >= a && v <= b ? v : dflt);
  s.days = [5, 6, 7].includes(raw.days) ? raw.days : 5;
  s.manual = raw.manual === true;
  s.start = /^\d{1,2}:\d{2}$/.test(raw.start) ? raw.start.padStart(5, '0') : '08:30';
  s.lesson = num(raw.lesson, 10, 180, 40);
  s.brk = num(raw.brk, 0, 60, 10);
  s.count = num(raw.count, 1, 14, 7);
  s.times = typeof raw.times === 'string' ? raw.times.slice(0, 400) : '';
  for (const k of ['title', 'name', 'cls', 'term']) s[k] = typeof raw[k] === 'string' ? raw[k].slice(0, 80) : '';
  s.theme = THEMES[raw.theme] ? raw.theme : 'bordo';
  if (raw.cells && typeof raw.cells === 'object') {
    for (const [k, v] of Object.entries(raw.cells)) {
      if (!/^\d-\d{1,2}$/.test(k) || !v || typeof v.t !== 'string') continue;
      s.cells[k] = { t: v.t.slice(0, 60), c: /^#[0-9a-f]{6}$/i.test(v.c) ? v.c : '' };
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
  try { slots = computeSlots(state); } catch { slots = computeSlots({ ...state, manual: false }); }
  buildGrid();
  applyThemeVars();
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

function hasContent() { return Object.values(state.cells).some((c) => c.t && c.t.trim()); }

// ---------- Yerleşim (PDF ve PNG ortak) ----------

/** Çizim komutları üretir; koordinatlar sol üst köşeye göre pt cinsindendir. */
function buildOps(measure) {
  const T = THEMES[state.theme] || THEMES.bordo;
  const ops = [];
  const M = 32;
  const W = PW - 2 * M;
  const fit = (text, size, bold, maxW) => {
    if (measure(text, size, bold) <= maxW) return text;
    let s = text;
    while (s.length > 1 && measure(`${s}…`, size, bold) > maxW) s = s.slice(0, -1);
    return `${s}…`;
  };
  const wrap = (text, size, maxW) => {
    const lines = []; let cur = '';
    for (const w of text.split(/\s+/)) {
      const t = cur ? `${cur} ${w}` : w;
      if (!cur || measure(t, size, false) <= maxW) cur = t; else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  };
  let y = M;
  ops.push({ t: 'text', s: fit(state.title || 'Ders Programı', 22, true, W), x: M, y: y + 20, size: 22, bold: true, color: T.accent });
  y += 28;
  const sub = [state.name, state.cls, state.term].filter(Boolean).join(' · ');
  if (sub) { ops.push({ t: 'text', s: fit(sub, 11, false, W), x: M, y: y + 9, size: 11, bold: false, color: '#444444' }); y += 18; }
  y += 8;
  const top = y, bottom = PH - 36;
  const headH = 26;
  const rowH = Math.min(62, (bottom - top - headH) / slots.length);
  const timeW = 78;
  const dayW = (W - timeW) / state.days;
  // Başlık satırı
  const headFill = T.plainHead ? '#ffffff' : T.accent;
  ops.push({ t: 'rect', x: M, y: top, w: W, h: headH, fill: headFill, stroke: T.plainHead ? '#000000' : T.accent, lw: T.plainHead ? 1.2 : 0.6 });
  ops.push({ t: 'text', s: 'Saat', x: M + timeW / 2, y: top + 17, size: 10, bold: true, color: T.headText, align: 'c' });
  for (let d = 0; d < state.days; d++) {
    const cx = M + timeW + dayW * d;
    ops.push({ t: 'line', x1: cx, y1: top, x2: cx, y2: top + headH, color: T.plainHead ? '#000000' : '#ffffff', lw: 0.6 });
    ops.push({ t: 'text', s: fit(DAYS[d], 10, true, dayW - 6), x: cx + dayW / 2, y: top + 17, size: 10, bold: true, color: T.headText, align: 'c' });
  }
  slots.forEach((sl, s) => {
    const ry = top + headH + rowH * s;
    ops.push({ t: 'rect', x: M, y: ry, w: timeW, h: rowH, fill: s % 2 ? '#ffffff' : T.tint, stroke: '#777777', lw: 0.6 });
    const mid = ry + rowH / 2;
    ops.push({ t: 'text', s: `${s + 1}. ders`, x: M + timeW / 2, y: mid - 3, size: 8.5, bold: true, color: '#222222', align: 'c' });
    ops.push({ t: 'text', s: `${sl.start}-${sl.end}`, x: M + timeW / 2, y: mid + 9, size: 8.5, bold: false, color: '#333333', align: 'c' });
    for (let d = 0; d < state.days; d++) {
      const cx = M + timeW + dayW * d;
      const cell = state.cells[`${d}-${s}`];
      ops.push({ t: 'rect', x: cx, y: ry, w: dayW, h: rowH, fill: cell && cell.c ? cell.c : '#ffffff', stroke: '#777777', lw: 0.6 });
      if (cell && cell.t && cell.t.trim()) {
        const size = rowH < 38 ? 8.5 : 10;
        const lh = size * 1.2;
        const maxLines = Math.max(1, Math.floor((rowH - 6) / lh));
        let lines = wrap(cell.t.trim(), size, dayW - 8);
        if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = `${lines[maxLines - 1]}…`; }
        lines = lines.map((l) => fit(l, size, false, dayW - 8));
        const total = lines.length * lh;
        lines.forEach((l, i) => ops.push({ t: 'text', s: l, x: cx + dayW / 2, y: ry + (rowH - total) / 2 + lh * i + size * 0.88, size, bold: false, color: '#111111', align: 'c' }));
      }
    }
  });
  ops.push({ t: 'text', s: 'araclar.bilisimajans.com · Ücretsiz ders programı oluşturucu', x: M, y: PH - 18, size: 7, bold: false, color: '#666666' });
  return ops;
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
  doc.setTitle(state.title || 'Ders Programı');
  const reg = await doc.embedFont(fd.regular, { subset: true });
  const bold = await doc.embedFont(fd.bold, { subset: true });
  const page = doc.addPage([PW, PH]);
  const { rgb } = PDFLib;
  const col = (h) => { const [r, g, b] = hexToRgb01(h); return rgb(r, g, b); };
  const ops = buildOps((s, size, b) => (b ? bold : reg).widthOfTextAtSize(s, size));
  for (const o of ops) {
    if (o.t === 'rect') {
      page.drawRectangle({ x: o.x, y: PH - o.y - o.h, width: o.w, height: o.h, color: col(o.fill), borderColor: col(o.stroke), borderWidth: o.lw });
    } else if (o.t === 'line') {
      page.drawLine({ start: { x: o.x1, y: PH - o.y1 }, end: { x: o.x2, y: PH - o.y2 }, thickness: o.lw, color: col(o.color) });
    } else {
      const f = o.bold ? bold : reg;
      const w = f.widthOfTextAtSize(o.s, o.size);
      page.drawText(o.s, { x: o.align === 'c' ? o.x - w / 2 : o.x, y: PH - o.y, size: o.size, font: f, color: col(o.color) });
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
  } catch { /* yazı tipi yüklenemezse sistem yazı tipiyle devam */ }
  const k = 2246 / PW;
  const canvas = document.createElement('canvas');
  canvas.width = 2246; canvas.height = Math.round(PH * k);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  const font = (size, b) => `${b ? 'bold ' : ''}${size * k}px "BA DejaVu", "DejaVu Sans", sans-serif`;
  const ops = buildOps((s, size, b) => { ctx.font = font(size, b); return ctx.measureText(s).width / k; });
  for (const o of ops) {
    if (o.t === 'rect') {
      ctx.fillStyle = o.fill; ctx.fillRect(o.x * k, o.y * k, o.w * k, o.h * k);
      ctx.strokeStyle = o.stroke; ctx.lineWidth = o.lw * k; ctx.strokeRect(o.x * k, o.y * k, o.w * k, o.h * k);
    } else if (o.t === 'line') {
      ctx.strokeStyle = o.color; ctx.lineWidth = o.lw * k; ctx.beginPath(); ctx.moveTo(o.x1 * k, o.y1 * k); ctx.lineTo(o.x2 * k, o.y2 * k); ctx.stroke();
    } else {
      ctx.font = font(o.size, o.bold); ctx.fillStyle = o.color; ctx.textAlign = o.align === 'c' ? 'center' : 'left';
      ctx.fillText(o.s, o.x * k, o.y * k);
    }
  }
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('PNG'))), 'image/png'));
}

// ---------- İndirme eylemleri ----------

function fileBase() {
  const raw = (state.title || 'ders-programi').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşüâîû]+/gi, '-').replace(/^-+|-+$/g, '');
  return raw || 'ders-programi';
}

async function run(btnId, label, ext, maker) {
  const btn = $(btnId);
  showError($('error'), null);
  readControls();
  try { slots = computeSlots(state); } catch (e) { showError($('error'), e.message); return; }
  if (!hasContent()) { showError($('error'), 'Programda hiç ders yok. En az bir hücreye ders adı yazın, sonra tekrar deneyin.'); return; }
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
      : `${label} oluşturulurken bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse ders adlarını kısaltın.`);
  } finally { setProgress($('progress'), null); btn.disabled = false; }
}

$('make-pdf').addEventListener('click', () => run('make-pdf', 'PDF', 'pdf', buildPdf));
$('make-png').addEventListener('click', () => run('make-png', 'PNG görseli', 'png', buildPng));

$('save-json').addEventListener('click', () => {
  showError($('error'), null);
  const blob = new Blob([JSON.stringify(serialize(), null, 2)], { type: 'application/json' });
  downloadBlob(blob, `${fileBase()}.json`);
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
        ? 'JSON dosyası çok büyük. Bu araçta kaydettiğiniz bir program dosyası seçin.'
        : 'Bu dosya bir ders programı kaydı değil ya da bozuk. Bu sayfadan "JSON kaydet" ile indirdiğiniz dosyayı seçin.');
    }
  },
});

$('clear-cells').addEventListener('click', () => {
  if (!hasContent() || window.confirm('Tüm hücreler silinsin mi? Bu işlem geri alınamaz.')) {
    state.cells = {}; buildGrid(); scheduleSave();
    $('palette-status').textContent = 'Hücreler temizlendi.';
  }
});
$('clear-draft').addEventListener('click', () => {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* yok say */ }
  $('draft-status').textContent = 'Kayıtlı taslak silindi.';
});

// Palet ve ön ayarlar
document.querySelectorAll('#palette button[data-color]').forEach((b) => b.addEventListener('click', () => setCellColor(b.dataset.color)));
document.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
  const p = PRESETS[b.dataset.preset];
  Object.assign(state, { days: p.days, manual: false, start: p.start, lesson: p.lesson, brk: p.brk, count: p.count, title: p.title });
  writeControls();
  refresh();
  document.querySelectorAll('[data-preset]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
}));
['opt-days', 'opt-start', 'opt-lesson', 'opt-break', 'opt-count', 'opt-times', 'f-title', 'f-name', 'f-class', 'f-term', 'opt-theme'].forEach((id) => $(id).addEventListener('input', refresh));
$('opt-manual').addEventListener('change', () => { readControls(); syncManualUi(); refresh(); });
$('form').addEventListener('submit', (e) => e.preventDefault());

// Başlangıç
writeControls();
if (!loadDraft()) { slots = computeSlots(state); buildGrid(); applyThemeVars(); }
document.documentElement.dataset.ready = '1';
