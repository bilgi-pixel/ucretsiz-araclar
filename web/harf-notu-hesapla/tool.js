// Harf Notu Hesapla — 100'lük → harf notu / 4'lük katsayı, YÖK 4'lük ↔ 100'lük dönüşümü ve GANO.
// Tamamı tarayıcıda çalışır; girilen notlar hiçbir yere gönderilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtN = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

/* ---------- Varsayılan parametreler ----------
 * parametreler.json yüklenemezse (çevrimdışı önbellek vb.) bunlar kullanılır.
 * YÖK tablosu: 100'lük = 30 + (4'lük − 1) × 70 / 3, iki ondalığa KESİLİR; 1,00–4,00 arası, 0,01 adımlı (301 satır).
 * Hesap sent cinsinden tam sayıyla yapılır; kayan nokta hatası olmaz. Resmî tabloyla satır satır doğrulanmıştır. */
const yokFormula = (cents) => Math.floor((2000 + 70 * cents) / 3) / 100;
function buildYokDefault() {
  const rows = [];
  for (let c = 400; c >= 100; c--) rows.push([c / 100, yokFormula(c)]);
  return rows;
}
export const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04',
  harf_tablosu: [
    { min: 90, harf: 'AA', katsayi: 4.0 }, { min: 85, harf: 'BA', katsayi: 3.5 },
    { min: 80, harf: 'BB', katsayi: 3.0 }, { min: 75, harf: 'CB', katsayi: 2.5 },
    { min: 70, harf: 'CC', katsayi: 2.0 }, { min: 65, harf: 'DC', katsayi: 1.5 },
    { min: 60, harf: 'DD', katsayi: 1.0 }, { min: 50, harf: 'FD', katsayi: 0.5 },
    { min: 0, harf: 'FF', katsayi: 0.0 },
  ],
  yok_tablosu: buildYokDefault(),
};
let params = DEFAULT_PARAMS;
const toMap = (rows) => new Map(rows.map(([x, y]) => [Math.round(x * 100), y]));
let yokMap = toMap(DEFAULT_PARAMS.yok_tablosu);
const cloneTable = (t) => t.map((r) => ({ ...r }));
let table = cloneTable(DEFAULT_PARAMS.harf_tablosu);

/* ---------- Sayı ayrıştırma (85,5 / 85.5 / 1.250) ---------- */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  if (/[^0-9.,]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 72,5). Harf, eksi işareti ve sembolleri silip tekrar deneyin.`);
  if (!/\d/.test(s)) throw new Error(`${label} okunamadı. Örnek biçim: 72,5`);
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if ((s.match(/\./g) || []).length > 1) {
    s = s.replace(/\./g, '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 72,5`);
  return n;
}

export function parseGrade(raw, label, max = 100) {
  const n = parseNumber(raw, label);
  if (n === null) return null;
  if (n < 0 || n > max) throw new Error(`${label} 0 ile ${fmtN.format(max)} arasında olmalı. Değeri kontrol edin.`);
  return n;
}

/* ---------- Harf notu tablosu ---------- */
/** 100'lük puanı harf notu satırına çevirir (alt sınırı en yüksek eşleşen satır). */
export function convert100(score, tbl = table) {
  const sorted = [...tbl].sort((a, b) => b.min - a.min);
  return sorted.find((r) => score >= r.min) || sorted[sorted.length - 1];
}

/** Harfin puan aralığını döndürür: { lo, hi } — hi, bir üstteki harfin alt sınırından 0,01 azdır. */
export function letterRange(harf, tbl = table) {
  const sorted = [...tbl].sort((a, b) => b.min - a.min);
  const i = sorted.findIndex((r) => r.harf === harf);
  if (i < 0) return null;
  return { lo: sorted[i].min, hi: i === 0 ? 100 : +(sorted[i - 1].min - 0.01).toFixed(2) };
}

/** Kullanıcının düzenlediği tabloyu doğrular (AA → FF sırasıyla). Hata fırlatır, sorunu söyler. */
export function validateTable(rows) {
  let prev = Infinity;
  rows.forEach((r, i) => {
    if (!Number.isFinite(r.min) || r.min < 0 || r.min > 100) throw new Error(`${r.harf} alt sınırı 0 ile 100 arasında bir sayı olmalı. Değeri düzeltin.`);
    if (!Number.isFinite(r.katsayi) || r.katsayi < 0 || r.katsayi > 4) throw new Error(`${r.harf} katsayısı 0 ile 4 arasında olmalı (örn. 3,5). Değeri düzeltin.`);
    if (r.min >= prev) throw new Error(`${r.harf} alt sınırı bir üstteki harftan küçük olmalı; sınırlar AA'dan FF'ye doğru azalır. ${r.harf} değerini düzeltin.`);
    if (i === rows.length - 1 && r.min !== 0) throw new Error('Son harfin (FF) alt sınırı 0 olmalı ki her puan bir harfe denk gelsin.');
    prev = r.min;
  });
  return rows;
}

/* ---------- YÖK 4'lük ↔ 100'lük ---------- */
/** 4'lük notu YÖK tablosuyla 100'lüğe çevirir. 3 ondalıklı ortalama 2 ondalığa yuvarlanır. */
export function yokTo100(x, map = yokMap) {
  if (x < 1) return { below: true, approx25: x * 25 };
  const cents = Math.round(x * 100 + 1e-9);
  const value = map.get(cents);
  if (value === undefined) throw new Error('Bu not YÖK tablosunda bulunamadı. 1,00 ile 4,00 arasında bir değer yazın.');
  return { below: false, value, used: cents / 100, rounded: Math.abs(cents - x * 100) > 1e-6, approx25: x * 25 };
}

/** YÖK tablosunun tersi (yaklaşık): 100'lük → 4'lük. Tablo 30–100 arasını kapsar. */
export function yokTo4(y) {
  if (y < 30) return null;
  return 1 + ((y - 30) * 3) / 70;
}

/* ---------- GANO ---------- */
/**
 * rows: [{name, credit, letter, score}] — mode 'harf' ise letter, 'puan' ise score kullanılır.
 * GANO = Σ(kredi × katsayı) / Σ kredi. Önceki GANO + önceki kredi verilirse genel ortalama da hesaplanır.
 */
export function calcGano({ rows, mode, prevGano, prevCredit, tbl = table, map = yokMap }) {
  let points = 0, credits = 0, used = 0;
  rows.forEach((r, i) => {
    const hasC = String(r.credit ?? '').trim() !== '';
    const hasN = mode === 'harf' ? Boolean(r.letter) : String(r.score ?? '').trim() !== '';
    if (!hasC && !hasN) return;
    const label = r.name && String(r.name).trim() ? String(r.name).trim() : `${i + 1}. ders`;
    if (!hasC || !hasN) throw new Error(`${label} için hem kredi hem ${mode === 'harf' ? 'harf notu' : '100\'lük not'} girin ya da satırı silin.`);
    const c = parseNumber(r.credit, `${label} kredisi`);
    if (c <= 0) throw new Error(`${label} kredisi sıfırdan büyük olmalı. Krediyi düzeltin ya da satırı silin.`);
    let k;
    if (mode === 'harf') {
      const row = tbl.find((t) => t.harf === r.letter);
      if (!row) throw new Error(`${label} için geçerli bir harf notu seçin.`);
      k = row.katsayi;
    } else {
      k = convert100(parseGrade(r.score, `${label} notu`, 100), tbl).katsayi;
    }
    points += c * k; credits += c; used += 1;
  });
  if (!used) return null;
  const gano = points / credits;
  const out = { gano, credits, points, count: used, yok: null, overall: null };
  const rounded = Math.round(gano * 100 + 1e-9) / 100;
  if (rounded >= 1) out.yok = yokTo100(rounded, map).value;
  const pg = parseGrade(prevGano, 'Önceki GANO', 4);
  const pc = parseNumber(prevCredit, 'Önceki toplam kredi');
  if ((pg === null) !== (pc === null)) throw new Error('Önceki GANO ile önceki toplam krediyi birlikte yazın ya da ikisini de boş bırakın.');
  if (pg !== null && pc > 0) {
    const oc = pc + credits;
    const og = (pg * pc + points) / oc;
    const orr = Math.round(og * 100 + 1e-9) / 100;
    out.overall = { gano: og, credits: oc, yok: orr >= 1 ? yokTo100(orr, map).value : null };
  }
  return out;
}

/* ---------- Arayüz ---------- */
async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('yüklenemedi');
    const p = await res.json();
    if (Array.isArray(p.harf_tablosu) && p.harf_tablosu.length && Array.isArray(p.yok_tablosu) && p.yok_tablosu.length === 301) {
      params = { ...DEFAULT_PARAMS, ...p };
      yokMap = toMap(params.yok_tablosu);
      table = cloneTable(params.harf_tablosu);
    }
  } catch { params = DEFAULT_PARAMS; yokMap = toMap(DEFAULT_PARAMS.yok_tablosu); table = cloneTable(DEFAULT_PARAMS.harf_tablosu); }
}

function add(parent, tag, text, cls) {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  if (cls) e.className = cls;
  parent.append(e);
  return e;
}

/** pairs: [anahtar, etiket, değer]; ilk satır vurgulu. */
function renderRows(box, pairs) {
  box.replaceChildren();
  pairs.forEach(([key, k, v], i) => {
    const row = add(box, 'div', undefined, 'nr-row' + (i === 0 ? ' is-strong' : ''));
    row.dataset.k = key;
    add(row, 'dt', k); add(row, 'dd', v);
  });
}

async function copy(text, statusEl) {
  if (!text) { statusEl.textContent = 'Kopyalanacak sonuç yok; önce notları girin.'; return; }
  try { await navigator.clipboard.writeText(text); statusEl.textContent = 'Sonuç kopyalandı.'; }
  catch { statusEl.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
}

const textOf = (pairs) => pairs.map(([, k, v]) => `${k}: ${v}`).join(' · ');

async function init() {
  await loadParams();
  const note = $('param-updated'); if (note) note.textContent = params.guncelleme;

  /* --- Sekmeler --- */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function selectTab(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!k) return;
      const n = tabs[(i + k + tabs.length) % tabs.length]; selectTab(n); n.focus(); e.preventDefault();
    });
  });

  /* --- 1) 100'lük → harf notu --- */
  const hn = { in: $('hn-score'), err: $('hn-error'), box: $('hn-box'), out: $('hn-out'), status: $('hn-status') };
  let hnText = '';
  function updateHn() {
    hn.status.textContent = '';
    try {
      const n = parseGrade(hn.in.value, 'Not', 100);
      showError(hn.err, '');
      if (n === null) { hn.box.classList.remove('is-active'); hnText = ''; return; }
      const r = convert100(n);
      const rg = letterRange(r.harf);
      const pairs = [
        ['harf', 'Harf notu', r.harf],
        ['katsayi', '4\'lük katsayı', fmt2.format(r.katsayi)],
        ['aralik', `${r.harf} için puan aralığı`, `${fmtN.format(rg.lo)} – ${fmtN.format(rg.hi)}`],
      ];
      renderRows(hn.out, pairs);
      hnText = `${fmtN.format(n)} puan → ${textOf(pairs)}`;
      hn.box.classList.add('is-active');
    } catch (e) { hn.box.classList.remove('is-active'); hnText = ''; showError(hn.err, e.message); }
  }
  hn.in.addEventListener('input', updateHn);
  $('hn-copy').addEventListener('click', () => copy(hnText, hn.status));

  /* --- Okulun kendi tablosu (düzenlenebilir) --- */
  const te = { rows: $('te-rows'), err: $('te-error'), status: $('te-status') };
  const teInputs = [];
  function fillTable() {
    teInputs.forEach(({ min, k }, i) => { min.value = String(table[i].min); k.value = String(table[i].katsayi).replace('.', ','); });
  }
  table.forEach((r, i) => {
    const row = add(te.rows, 'div', undefined, 'te-line');
    add(row, 'strong', r.harf, 'te-h');
    const l1 = add(row, 'label'); add(l1, 'span', `${r.harf} alt sınırı`);
    const min = add(l1, 'input'); min.type = 'text'; min.inputMode = 'decimal'; min.autocomplete = 'off';
    const l2 = add(row, 'label'); add(l2, 'span', `${r.harf} katsayısı`);
    const k = add(l2, 'input'); k.type = 'text'; k.inputMode = 'decimal'; k.autocomplete = 'off';
    if (i === table.length - 1) { min.disabled = true; min.title = 'Son harfin alt sınırı 0 olmalıdır'; }
    teInputs.push({ min, k });
    [min, k].forEach((inp) => inp.addEventListener('input', onTableEdit));
  });
  fillTable();
  function onTableEdit() {
    try {
      const rows = teInputs.map(({ min, k }, i) => {
        const lbl = table[i].harf;
        const m = parseNumber(min.value, `${lbl} alt sınırı`);
        const c = parseNumber(k.value, `${lbl} katsayısı`);
        if (m === null || c === null) throw new Error(`${lbl} için alt sınır ve katsayı boş bırakılamaz. Değer yazın ya da "Varsayılan tabloya dön" düğmesine basın.`);
        return { harf: lbl, min: m, katsayi: c };
      });
      validateTable(rows);
      table = rows;
      showError(te.err, '');
      te.status.textContent = 'Tablo güncellendi; hesaplar bu tabloyla yapılıyor.';
      updateHn(); updateGano();
    } catch (e) { te.status.textContent = ''; showError(te.err, e.message); }
  }
  $('te-reset').addEventListener('click', () => {
    table = cloneTable(params.harf_tablosu); fillTable(); showError(te.err, '');
    te.status.textContent = 'Varsayılan tabloya dönüldü.';
    updateHn(); updateGano();
  });

  /* --- 2) YÖK 4'lük ↔ 100'lük --- */
  const yk = { in: $('yok-in'), err: $('yok-error'), box: $('yok-box'), out: $('yok-out'), status: $('yok-status') };
  let ykText = '';
  function updateYok() {
    yk.status.textContent = '';
    try {
      const x = parseGrade(yk.in.value, '4\'lük not', 4);
      showError(yk.err, '');
      if (x === null) { yk.box.classList.remove('is-active'); ykText = ''; return; }
      const r = yokTo100(x);
      const pairs = [];
      if (r.below) pairs.push(['yok', 'YÖK tablosundaki 100\'lük karşılığı', 'Tabloda karşılığı yok (tablo 1,00 ile başlar)']);
      else pairs.push(['yok', `YÖK tablosundaki 100'lük karşılığı (${fmt2.format(r.used)} satırı)`, fmt2.format(r.value)]);
      pairs.push(['x25', 'Doğru orantı (×25), yalnızca karşılaştırma için', fmt2.format(r.approx25)]);
      if (!r.below && r.rounded) pairs.push(['round', 'Yuvarlama', `${fmtN.format(x)} değeri iki ondalığa (${fmt2.format(r.used)}) yuvarlanarak tablodan okundu`]);
      renderRows(yk.out, pairs);
      ykText = `4'lük ${fmtN.format(x)} → ${textOf(pairs)}`;
      yk.box.classList.add('is-active');
    } catch (e) { yk.box.classList.remove('is-active'); ykText = ''; showError(yk.err, e.message); }
  }
  yk.in.addEventListener('input', updateYok);
  $('yok-copy').addEventListener('click', () => copy(ykText, yk.status));

  const rv = { in: $('rev-in'), err: $('rev-error'), out: $('rev-out') };
  rv.in.addEventListener('input', () => {
    try {
      const y = parseGrade(rv.in.value, '100\'lük not', 100);
      showError(rv.err, '');
      if (y === null) { rv.out.textContent = '—'; return; }
      const x = yokTo4(y);
      rv.out.textContent = x === null ? 'Tabloda karşılığı yok (tablo 30\'dan başlar)' : `${fmt2.format(x)} (yaklaşık)`;
    } catch (e) { rv.out.textContent = '—'; showError(rv.err, e.message); }
  });

  // Tam YÖK tablosu: ilk açılışta çizilir (301 satır, iki sütun çifti halinde)
  const full = $('yok-full');
  let fullDone = false;
  full.addEventListener('toggle', () => {
    if (!full.open || fullDone) return;
    fullDone = true;
    const tb = $('yok-body');
    const rows = params.yok_tablosu;
    const half = Math.ceil(rows.length / 2);
    for (let i = 0; i < half; i++) {
      const tr = add(tb, 'tr');
      const a = rows[i], b = rows[i + half];
      add(tr, 'td', fmt2.format(a[0])); add(tr, 'td', fmt2.format(a[1]));
      add(tr, 'td', b ? fmt2.format(b[0]) : ''); add(tr, 'td', b ? fmt2.format(b[1]) : '');
    }
  });

  /* --- 3) GANO --- */
  const g = { body: $('g-rows'), mode: $('g-mode'), add: $('g-add'), prevG: $('g-prev-gano'), prevC: $('g-prev-kredi'), err: $('g-error'), box: $('g-box'), out: $('g-out'), status: $('g-status') };
  let gText = '';
  const letters = () => params.harf_tablosu.map((r) => r.harf);
  function syncLine(row) {
    const harf = g.mode.value === 'harf';
    row.querySelector('.g-letter-wrap').hidden = !harf;
    row.querySelector('.g-score-wrap').hidden = harf;
    const out = row.querySelector('.g-conv');
    out.textContent = '';
    try {
      let r = null;
      if (harf) { const l = row.querySelector('.g-letter').value; r = table.find((t) => t.harf === l) || null; }
      else { const n = parseGrade(row.querySelector('.g-score').value, 'Not', 100); r = n === null ? null : convert100(n); }
      if (r) out.textContent = harf ? `katsayı ${fmt2.format(r.katsayi)}` : `${r.harf} · ${fmt2.format(r.katsayi)}`;
    } catch { /* hata update'te gösterilir */ }
  }
  function addLine(values = {}) {
    const row = add(g.body, 'div', undefined, 'hn-line');
    const mk = (wrapCls, label, build) => {
      const wrap = add(row, 'label', undefined, wrapCls); add(wrap, 'span', label);
      return build(wrap);
    };
    mk('', 'Ders adı (isteğe bağlı)', (w) => { const i = add(w, 'input', undefined, 'g-name'); i.type = 'text'; i.autocomplete = 'off'; i.placeholder = 'örn. Matematik'; i.value = values.name || ''; i.addEventListener('input', updateGano); });
    mk('', 'Kredi / AKTS', (w) => { const i = add(w, 'input', undefined, 'g-credit'); i.type = 'text'; i.inputMode = 'decimal'; i.autocomplete = 'off'; i.placeholder = 'örn. 4'; i.value = values.credit || ''; i.addEventListener('input', updateGano); });
    mk('g-letter-wrap', 'Harf notu', (w) => {
      const s = add(w, 'select', undefined, 'g-letter');
      add(s, 'option', 'Seçin').value = '';
      letters().forEach((l) => { add(s, 'option', l).value = l; });
      s.value = values.letter || '';
      s.addEventListener('change', updateGano);
    });
    mk('g-score-wrap', '100\'lük not', (w) => { const i = add(w, 'input', undefined, 'g-score'); i.type = 'text'; i.inputMode = 'decimal'; i.autocomplete = 'off'; i.placeholder = 'örn. 78'; i.value = values.score || ''; i.addEventListener('input', updateGano); });
    add(row, 'output', undefined, 'g-conv').setAttribute('aria-live', 'off');
    const del = add(row, 'button', 'Sil', 'ba-btn hn-del'); del.type = 'button';
    del.setAttribute('aria-label', 'Dersi sil');
    del.addEventListener('click', () => { row.remove(); if (!g.body.children.length) addLine(); updateGano(); });
    syncLine(row);
    return row;
  }
  function updateGano() {
    g.status.textContent = '';
    [...g.body.children].forEach(syncLine);
    const rows = [...g.body.children].map((r) => ({ name: r.querySelector('.g-name').value, credit: r.querySelector('.g-credit').value, letter: r.querySelector('.g-letter').value, score: r.querySelector('.g-score').value }));
    try {
      const r = calcGano({ rows, mode: g.mode.value, prevGano: g.prevG.value, prevCredit: g.prevC.value });
      showError(g.err, '');
      if (!r) { g.box.classList.remove('is-active'); gText = ''; return; }
      const pairs = [
        ['gano', 'Dönem ağırlıklı ortalaması (4\'lük)', fmt2.format(r.gano)],
        ['credits', 'Toplam kredi', fmtN.format(r.credits)],
        ['points', 'Toplam puan (kredi × katsayı)', fmt2.format(r.points)],
        ['count', 'Ders sayısı', String(r.count)],
      ];
      if (r.yok !== null) pairs.push(['yok', 'YÖK tablosundaki 100\'lük karşılığı', fmt2.format(r.yok)]);
      else pairs.push(['yok', 'YÖK tablosundaki 100\'lük karşılığı', 'Tabloda karşılığı yok (1,00 altı)']);
      if (r.overall) {
        pairs.push(['overall', 'Genel ortalama (önceki dönemler dahil)', fmt2.format(r.overall.gano)]);
        pairs.push(['overall-credits', 'Genel toplam kredi', fmtN.format(r.overall.credits)]);
        if (r.overall.yok !== null) pairs.push(['overall-yok', 'Genel ortalamanın YÖK 100\'lük karşılığı', fmt2.format(r.overall.yok)]);
      }
      renderRows(g.out, pairs);
      gText = textOf(pairs);
      g.box.classList.add('is-active');
    } catch (e) { g.box.classList.remove('is-active'); gText = ''; showError(g.err, e.message); }
  }
  g.add.addEventListener('click', () => { const r = addLine(); r.querySelector('.g-name').focus(); });
  g.mode.addEventListener('change', () => {
    const harf = g.mode.value === 'harf';
    // 100'lükten harfe geçerken yazılmış notlar harfe çevrilir
    [...g.body.children].forEach((row) => {
      if (!harf) return;
      try { const n = parseGrade(row.querySelector('.g-score').value, 'Not', 100); if (n !== null && !row.querySelector('.g-letter').value) row.querySelector('.g-letter').value = convert100(n).harf; } catch { /* yoksay */ }
    });
    updateGano();
  });
  [g.prevG, g.prevC].forEach((i) => i.addEventListener('input', updateGano));
  $('g-copy').addEventListener('click', () => copy(gText, g.status));
  addLine(); addLine(); addLine();

  /* --- Sayfadaki tablolar (içerik bölümü) --- */
  const tbody = $('tbl-harf');
  if (tbody) {
    const sorted = [...params.harf_tablosu].sort((a, b) => b.min - a.min);
    sorted.forEach((r, i) => {
      const hi = i === 0 ? 100 : +(sorted[i - 1].min - 0.01).toFixed(2);
      const tr = add(tbody, 'tr');
      add(tr, 'td', `${fmtN.format(r.min)} – ${fmtN.format(hi)}`); add(tr, 'td', r.harf); add(tr, 'td', fmt2.format(r.katsayi));
    });
  }
  const ozet = $('tbl-yok-ozet');
  if (ozet) {
    [4, 3.75, 3.5, 3.25, 3, 2.75, 2.5, 2.25, 2, 1.5, 1].forEach((x) => {
      const tr = add(ozet, 'tr');
      add(tr, 'td', fmt2.format(x)); add(tr, 'td', fmt2.format(yokMap.get(Math.round(x * 100))));
    });
  }
}

if (typeof document !== 'undefined' && $('hn-score')) init();
