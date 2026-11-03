// Not Ortalaması — vize/final, "finalden kaç almalıyım" ve ağırlıklı ortalama.
// Tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Yedek parametreler; parametreler.json yüklenemezse (çevrimdışı önbellek vb.) bunlar kullanılır.
export const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03',
  varsayilan_vize_orani: 40,
  varsayilan_final_orani: 60,
  varsayilan_gecme_notu: 50,
  donusum_tablosu: [
    { min: 90, harf: 'AA', katsayi: 4.0 }, { min: 85, harf: 'BA', katsayi: 3.5 },
    { min: 80, harf: 'BB', katsayi: 3.0 }, { min: 75, harf: 'CB', katsayi: 2.5 },
    { min: 70, harf: 'CC', katsayi: 2.0 }, { min: 65, harf: 'DC', katsayi: 1.5 },
    { min: 60, harf: 'DD', katsayi: 1.0 }, { min: 50, harf: 'FD', katsayi: 0.5 },
    { min: 0, harf: 'FF', katsayi: 0.0 },
  ],
};
let params = DEFAULT_PARAMS;

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

function parseGrade(raw, label, max) {
  const n = parseNumber(raw, label);
  if (n === null) return null;
  if (n < 0 || n > max) throw new Error(`${label} 0 ile ${max} arasında olmalı. Değeri kontrol edin.`);
  return n;
}

/* ---------- Dönüşüm tablosu ---------- */
export function convert100(score, table = params.donusum_tablosu) {
  const sorted = [...table].sort((a, b) => b.min - a.min);
  return sorted.find((r) => score >= r.min) || sorted[sorted.length - 1];
}

/* ---------- Vize / final ---------- */
function readRatios(rawV, rawF) {
  const v = parseNumber(rawV, 'Vize oranı');
  const f = parseNumber(rawF, 'Final oranı');
  if (v === null || f === null) throw new Error('Vize ve final oranlarını yazın (örn. 40 ve 60).');
  if (v > 100 || f > 100) throw new Error('Oranlar 0 ile 100 arasında olmalı.');
  if (Math.abs(v + f - 100) > 1e-9) throw new Error(`Vize ve final oranlarının toplamı %100 olmalı (şu an %${fmt2.format(v + f).replace(',00', '')}). Oranlardan birini düzeltin.`);
  return { v, f };
}

/** Vize-final hesabı. Boş bırakılan alanlar null döner. */
export function calcVizeFinal({ vize, final, vizeRatio, finalRatio, target }) {
  const { v, f } = readRatios(vizeRatio, finalRatio);
  const vn = parseGrade(vize, 'Vize notu', 100);
  const fn = parseGrade(final, 'Final notu', 100);
  const tn = parseGrade(target, 'Hedef ortalama', 100);
  const out = { average: null, required: null, status: null, vizeRatio: v, finalRatio: f };
  if (vn !== null && fn !== null) out.average = (vn * v + fn * f) / 100;
  if (vn !== null && tn !== null) {
    if (f === 0) throw new Error('Final oranı sıfırken finalden gereken not hesaplanamaz. Final oranını sıfırdan büyük yapın.');
    const need = (tn - (vn * v) / 100) / (f / 100);
    out.required = need;
    out.status = need > 100 ? 'imkansiz' : need <= 0 ? 'yeterli' : 'gerekli';
  }
  return out;
}

/* ---------- Ağırlıklı ortalama ---------- */
/** rows: [{name, grade, credit}] — tamamen boş satırlar atlanır. */
export function calcWeighted(rows, scale) {
  const max = scale === 4 ? 4 : 100;
  let sum = 0, sum4 = 0, credits = 0, used = 0;
  rows.forEach((r, i) => {
    const empty = !String(r.grade).trim() && !String(r.credit).trim();
    if (empty) return;
    const label = r.name && r.name.trim() ? r.name.trim() : `${i + 1}. satır`;
    const g = parseGrade(r.grade, `${label} notu`, max);
    const c = parseNumber(r.credit, `${label} kredisi`);
    if (g === null || c === null) throw new Error(`${label} için hem not hem kredi/ağırlık yazın ya da satırı silin.`);
    if (c <= 0) throw new Error(`${label} kredisi sıfırdan büyük olmalı. Krediyi düzeltin ya da satırı silin.`);
    sum += g * c; credits += c; used += 1;
    sum4 += (scale === 4 ? g : convert100(g).katsayi) * c;
  });
  if (!used) return null;
  const avg = sum / credits;
  return { average: avg, average4: sum4 / credits, credits, count: used, scale, letter: scale === 100 ? convert100(avg) : null };
}

/* ---------- Arayüz ---------- */
async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('yüklenemedi');
    const p = await res.json();
    if (Array.isArray(p.donusum_tablosu) && p.donusum_tablosu.length) params = { ...DEFAULT_PARAMS, ...p };
  } catch { params = DEFAULT_PARAMS; }
}

function add(parent, tag, text, cls) {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  if (cls) e.className = cls;
  parent.append(e);
  return e;
}

function renderRows(box, pairs) {
  box.replaceChildren();
  pairs.forEach(([k, v], i) => {
    const row = add(box, 'div', undefined, 'nr-row' + (i === 0 ? ' is-strong' : ''));
    add(row, 'dt', k); add(row, 'dd', v);
  });
}

async function copy(text, statusEl) {
  if (!text) { statusEl.textContent = 'Kopyalanacak sonuç yok; önce notları girin.'; return; }
  try { await navigator.clipboard.writeText(text); statusEl.textContent = 'Sonuç kopyalandı.'; }
  catch { statusEl.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
}

async function init() {
  await loadParams();
  const pageNote = $('param-updated'); if (pageNote) pageNote.textContent = params.guncelleme;

  /* Sekmeler */
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

  /* --- Vize / final --- */
  const vf = { v: $('vf-vize'), f: $('vf-final'), vr: $('vf-vr'), fr: $('vf-fr'), t: $('vf-target'), err: $('vf-error'), box: $('vf-result'), rows: $('vf-rows'), status: $('vf-status') };
  vf.vr.value = String(params.varsayilan_vize_orani); vf.fr.value = String(params.varsayilan_final_orani);
  vf.t.value = String(params.varsayilan_gecme_notu);
  let vfText = '';
  // Oranlardan biri değişince diğeri 100'e tamamlanır.
  vf.vr.addEventListener('input', () => { try { const n = parseNumber(vf.vr.value, 'Vize oranı'); if (n !== null && n <= 100) vf.fr.value = String(+(100 - n).toFixed(4)).replace('.', ','); } catch { /* hata update'te gösterilir */ } });
  vf.fr.addEventListener('input', () => { try { const n = parseNumber(vf.fr.value, 'Final oranı'); if (n !== null && n <= 100) vf.vr.value = String(+(100 - n).toFixed(4)).replace('.', ','); } catch { /* hata update'te gösterilir */ } });
  function updateVf() {
    vf.status.textContent = '';
    try {
      const r = calcVizeFinal({ vize: vf.v.value, final: vf.f.value, vizeRatio: vf.vr.value, finalRatio: vf.fr.value, target: vf.t.value });
      showError(vf.err, '');
      const pairs = [];
      if (r.average !== null) pairs.push(['Ortalama', fmt2.format(r.average)]);
      if (r.required !== null) {
        if (r.status === 'imkansiz') pairs.push(['Finalden gereken not', `${fmt2.format(r.required)} (ulaşılamaz)`]);
        else if (r.status === 'yeterli') pairs.push(['Finalden gereken not', '0 (vize tek başına yeterli)']);
        else pairs.push(['Finalden gereken not', fmt2.format(r.required)]);
      }
      if (r.average !== null && vf.t.value.trim()) {
        const t = parseNumber(vf.t.value, 'Hedef ortalama');
        pairs.push(['Hedefe göre durum', r.average >= t ? 'Hedefi karşılıyor' : 'Hedefin altında']);
      }
      if (r.average !== null) { const c = convert100(r.average); pairs.push(['Harf / 4\'lük (yaygın tablo genel tablo)', `${c.harf} / ${fmt2.format(c.katsayi)}`]); }
      if (!pairs.length) { vf.box.classList.remove('is-active'); vfText = ''; return; }
      renderRows(vf.rows, pairs);
      vfText = `Vize %${r.vizeRatio} · Final %${r.finalRatio}: ${pairs.map(([k, v]) => `${k} ${v}`).join(' · ')}`;
      vf.box.classList.add('is-active');
    } catch (e) { vf.box.classList.remove('is-active'); vfText = ''; showError(vf.err, e.message); }
  }
  [vf.v, vf.f, vf.vr, vf.fr, vf.t].forEach((i) => i.addEventListener('input', updateVf));
  $('vf-form').addEventListener('submit', (e) => { e.preventDefault(); updateVf(); });
  $('vf-copy').addEventListener('click', () => copy(vfText, vf.status));

  /* --- Ağırlıklı ortalama --- */
  const w = { body: $('w-rows'), scale: $('w-scale'), add: $('w-add'), err: $('w-error'), box: $('w-result'), rows: $('w-out'), status: $('w-status') };
  let wText = '';
  function addRow(values = {}) {
    const row = add(w.body, 'div', undefined, 'nr-line');
    const mk = (cls, label, ph, mode, val) => {
      const wrap = add(row, 'label'); add(wrap, 'span', label);
      const inp = add(wrap, 'input', undefined, cls);
      inp.type = 'text'; inp.autocomplete = 'off'; inp.placeholder = ph; inp.value = val || '';
      if (mode) inp.inputMode = mode;
      inp.addEventListener('input', updateW);
      return inp;
    };
    mk('nr-name', 'Ders adı (isteğe bağlı)', 'örn. Matematik', null, values.name);
    mk('nr-grade', 'Not', 'örn. 78', 'decimal', values.grade);
    mk('nr-credit', 'Kredi / ağırlık', 'örn. 4', 'decimal', values.credit);
    const del = add(row, 'button', 'Sil', 'ba-btn nr-del'); del.type = 'button';
    del.setAttribute('aria-label', 'Dersi sil');
    del.addEventListener('click', () => { row.remove(); if (!w.body.children.length) addRow(); updateW(); });
  }
  function updateW() {
    w.status.textContent = '';
    const rows = [...w.body.children].map((r) => ({ name: r.querySelector('.nr-name').value, grade: r.querySelector('.nr-grade').value, credit: r.querySelector('.nr-credit').value }));
    const scale = Number(w.scale.value);
    try {
      const r = calcWeighted(rows, scale);
      showError(w.err, '');
      if (!r) { w.box.classList.remove('is-active'); wText = ''; return; }
      const pairs = scale === 100
        ? [['Ağırlıklı ortalama (100\'lük)', fmt2.format(r.average)], ['4\'lük karşılığı (derslerin dönüşümüyle)', fmt2.format(r.average4)], ['Ortalamanın harf notu', `${r.letter.harf}`], ['Toplam kredi', fmt2.format(r.credits)]]
        : [['Ağırlıklı ortalama (4\'lük)', fmt2.format(r.average)], ['Toplam kredi', fmt2.format(r.credits)]];
      renderRows(w.rows, pairs);
      wText = `${r.count} ders: ${pairs.map(([k, v]) => `${k} ${v}`).join(' · ')}`;
      w.box.classList.add('is-active');
    } catch (e) { w.box.classList.remove('is-active'); wText = ''; showError(w.err, e.message); }
  }
  w.add.addEventListener('click', () => { addRow(); w.body.lastElementChild.querySelector('.nr-name').focus(); });
  w.scale.addEventListener('change', updateW);
  $('w-copy').addEventListener('click', () => copy(wText, w.status));
  addRow(); addRow(); addRow();

  /* --- Dönüşüm tablosu ve tek not çevirici --- */
  const tbody = $('tbl-body');
  const sorted = [...params.donusum_tablosu].sort((a, b) => b.min - a.min);
  sorted.forEach((r, i) => {
    const max = i === 0 ? 100 : sorted[i - 1].min - 1;
    const tr = add(tbody, 'tr');
    add(tr, 'td', r.min === max ? String(r.min) : `${r.min} – ${max}`); add(tr, 'td', r.harf); add(tr, 'td', fmt2.format(r.katsayi));
  });
  const cv = { i: $('cv-in'), out: $('cv-out'), err: $('cv-error') };
  cv.i.addEventListener('input', () => {
    try {
      const n = parseGrade(cv.i.value, 'Not', 100);
      showError(cv.err, '');
      if (n === null) { cv.out.textContent = '—'; return; }
      const c = convert100(n); cv.out.textContent = `${c.harf} · ${fmt2.format(c.katsayi)}`;
    } catch (e) { cv.out.textContent = '—'; showError(cv.err, e.message); }
  });
}

if (typeof document !== 'undefined' && $('vf-form')) init();
