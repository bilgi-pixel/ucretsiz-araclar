// Vize-Final Hesapla — vize/ödev ağırlıklı ortalama ve "finalden kaç almalıyım" hesabı.
// Tamamı tarayıcıda çalışır; girilen notlar hiçbir yere gönderilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtN = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const EPS = 1e-9;

// Yedek parametreler; parametreler.json yüklenemezse (çevrimdışı önbellek vb.) bunlar kullanılır.
export const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04',
  varsayilan_final_orani: 60,
  varsayilan_gecme_notu: 50,
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

function parseGrade(raw, label, max = 100) {
  const n = parseNumber(raw, label);
  if (n === null) return null;
  if (n < 0 || n > max) throw new Error(`${label} 0 ile ${max} arasında olmalı. Değeri kontrol edin.`);
  return n;
}

/** Yukarı yuvarlama; kayan nokta artığı (80,00000001) yüzünden 80,1 çıkmasın diye küçük tolerans var. */
export const ceilTo = (x, digits) => Math.ceil(x * 10 ** digits - EPS) / 10 ** digits;

/* ---------- Hesap çekirdeği ---------- */
/**
 * rows: [{name, grade, weight}] — vize, ara sınav, ödev, proje gibi final dışı bileşenler.
 * Ağırlıklar dersin toplamı üzerinden yüzdedir: tüm satırlar + final = 100.
 * Hesap tam sayıya yakın "puan × yüzde" birimiyle yapılır (kayan nokta hatasını azaltır).
 */
export function calcVizeFinal({ rows, finalWeight, pass, baraj, target, final, but }) {
  const fw = parseNumber(finalWeight, 'Final ağırlığı');
  if (fw === null) throw new Error('Final ağırlığını yazın (örn. 60) ya da yukarıdaki hızlı seçeneklerden birini seçin.');
  if (fw <= 0 || fw > 100) throw new Error('Final ağırlığı 0\'dan büyük, en çok 100 olmalı. Final ağırlığı sıfırsa finalden gereken not hesaplanamaz.');

  // Hiçbir satıra henüz not yazılmadıysa (açılışta ağırlık hazır gelir) sessizce sonuç gösterme
  if (fw < 100 && !rows.some((r) => String(r.grade ?? '').trim() !== '')) return null;

  // Boş olmayan satırları topla
  let earned = 0; // Σ not × ağırlık(%)
  let sumW = 0;
  let used = 0;
  rows.forEach((r, i) => {
    const hasG = String(r.grade ?? '').trim() !== '';
    const hasW = String(r.weight ?? '').trim() !== '';
    if (!hasG && !hasW) return;
    // Final %100 yapılınca tek satırın ağırlığı 0'a tamamlanır; notu boş bu satır hesaba katılmaz
    if (!hasG && hasW && parseNumber(r.weight, `${r.name || 'Vize'} ağırlığı`) === 0) return;
    const label = r.name && String(r.name).trim() ? String(r.name).trim() : `${i + 1}. satır`;
    if (!hasG || !hasW) throw new Error(`${label} için hem not hem ağırlık yazın ya da satırı silin.`);
    const g = parseGrade(r.grade, `${label} notu`, 100);
    const w = parseNumber(r.weight, `${label} ağırlığı`);
    if (w <= 0 || w > 100) throw new Error(`${label} ağırlığı 0 ile 100 arasında olmalı (örn. 40). Ağırlığı düzeltin.`);
    earned += g * w;
    sumW += w;
    used += 1;
  });
  if (!used && fw < 100) return null; // henüz hiçbir vize notu yok
  if (Math.abs(sumW + fw - 100) > 1e-6) {
    const total = sumW + fw;
    throw new Error(`Vize/ödev ağırlıkları toplamı %${fmtN.format(sumW)}, final %${fmtN.format(fw)}; toplam %${fmtN.format(total)} ediyor ama %100 olmalı (${total > 100 ? `${fmtN.format(total - 100)} puan fazla` : `${fmtN.format(100 - total)} puan eksik`}). Ağırlıkları düzeltin.`);
  }

  const passN = parseGrade(pass, 'Geçme notu', 100);
  const barajN = parseGrade(baraj, 'Final baraj notu', 100);
  const targetN = parseGrade(target, 'Hedef ortalama', 100);
  const finalN = parseGrade(final, 'Final notu', 100);
  const butN = parseGrade(but, 'Bütünleme notu', 100);

  const out = {
    finalWeight: fw, vizeWeight: sumW, count: used,
    vizeAverage: sumW > 0 ? earned / sumW : null, // vizelerin kendi ağırlıklarıyla ortalaması
    points: earned / 100, // şu ana kadar toplam puana katkı
    need: null, needTarget: null, average: null, usedLabel: null, passed: null, simulation: [],
  };

  /** Hedef ortalamaya ulaşmak için finalden gereken not; baraj varsa ondan düşük olamaz. */
  const required = (goal) => {
    const raw = (goal * 100 - earned) / fw;
    let value = Math.max(raw, 0);
    let binding = 'ortalama';
    if (barajN !== null && barajN > value + EPS) { value = barajN; binding = 'baraj'; }
    const status = value > 100 + EPS ? 'imkansiz' : raw <= EPS && binding === 'ortalama' ? 'yeterli' : 'gerekli';
    return { raw, value, binding, status, up1: ceilTo(value, 1), upInt: Math.ceil(value - EPS) };
  };
  if (passN !== null) out.need = { ...required(passN), goal: passN };
  if (targetN !== null) out.needTarget = { ...required(targetN), goal: targetN };

  // Final (ya da varsa bütünleme) notu girilmişse dönem sonu ortalaması
  const exam = butN !== null ? butN : finalN;
  if (exam !== null) {
    out.usedLabel = butN !== null ? 'bütünleme' : 'final';
    out.exam = exam;
    out.average = (earned + exam * fw) / 100;
    const avgOk = passN === null || out.average >= passN - EPS;
    const barajOk = barajN === null || exam >= barajN - EPS;
    out.passed = avgOk && barajOk;
    out.failReason = avgOk ? (barajOk ? null : 'baraj') : 'ortalama';
  }

  // Tablo: finalden 40…100 alınırsa ortalama ve durum
  [40, 50, 60, 70, 80, 90, 100].forEach((s) => {
    const avg = (earned + s * fw) / 100;
    const ok = (passN === null || avg >= passN - EPS) && (barajN === null || s >= barajN - EPS);
    out.simulation.push({ final: s, average: avg, ok: passN === null ? null : ok });
  });
  out.hasPass = passN !== null;
  return out;
}

/* ---------- Arayüz yardımcıları ---------- */
async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('yüklenemedi');
    const p = await res.json();
    if (typeof p.guncelleme === 'string') params = { ...DEFAULT_PARAMS, ...p };
  } catch { params = DEFAULT_PARAMS; }
}

function add(parent, tag, text, cls) {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  if (cls) e.className = cls;
  parent.append(e);
  return e;
}

async function copy(text, statusEl) {
  if (!text) { statusEl.textContent = 'Kopyalanacak sonuç yok; önce notları girin.'; return; }
  try { await navigator.clipboard.writeText(text); statusEl.textContent = 'Sonuç kopyalandı.'; }
  catch { statusEl.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
}

/** Sonucu [anahtar, etiket, değer] satırlarına çevirir. */
function buildPairs(r) {
  const pairs = [];
  const needRows = (n, title, key) => {
    if (n.status === 'imkansiz') {
      pairs.push([key, title, `${fmt2.format(n.value)} gerekir → mümkün değil (100'ü aşıyor)`]);
      return;
    }
    if (n.status === 'yeterli') pairs.push([key, title, '0 (vize puanı tek başına yeterli)']);
    else pairs.push([key, title, fmt2.format(n.value)]);
    if (n.status === 'gerekli') pairs.push([`${key}-up`, 'Yukarı yuvarlanmış (güvenli) değer', `${fmt1.format(n.up1)} (tam sayı olarak ${n.upInt})`]);
    if (n.binding === 'baraj') pairs.push([`${key}-bind`, 'Belirleyici koşul', 'Final barajı (ortalama koşulundan yüksek)']);
  };
  if (r.average !== null) {
    pairs.push(['average', `Dönem sonu ortalaması (${r.usedLabel} sayıldı)`, fmt2.format(r.average)]);
    if (r.passed !== null) {
      pairs.push(['verdict', 'Durum', r.passed ? 'Geçme koşulunu sağlıyor' : r.failReason === 'baraj' ? 'Final barajının altında kaldı' : 'Geçme notunun altında kaldı']);
    }
  }
  if (r.need) needRows(r.need, `Geçmek (${fmtN.format(r.need.goal)}) için finalden gereken en düşük not`, 'need');
  if (r.need) {
    if (r.need.status === 'imkansiz') pairs.push(['but', 'Bütünlemede gereken not', 'Bütünleme finalin yerine geçer; aynı hesap geçerli, bu oranlarla yine mümkün değil']);
    else pairs.push(['but', 'Bütünlemede gereken not', `${r.need.status === 'yeterli' ? '0' : fmt2.format(r.need.value)} (bütünleme finalin yerine geçer)`]);
  }
  if (r.needTarget) needRows(r.needTarget, `Hedef ortalama (${fmtN.format(r.needTarget.goal)}) için finalden gereken not`, 'target');
  if (r.vizeAverage !== null) pairs.push(['vize-avg', 'Vize/ödev ortalaması (kendi ağırlıklarıyla)', fmt2.format(r.vizeAverage)]);
  pairs.push(['points', 'Şu ana kadar kazanılan puan', `${fmt2.format(r.points)} / ${fmtN.format(100 - r.finalWeight)}`]);
  return pairs;
}

async function init() {
  await loadParams();
  const note = $('param-updated');
  if (note) note.textContent = params.guncelleme;

  const el = {
    rows: $('vf-rows-in'), add: $('vf-add'), fw: $('vf-fw'), pass: $('vf-pass'), baraj: $('vf-baraj'),
    target: $('vf-target'), final: $('vf-final'), but: $('vf-but'),
    err: $('vf-error'), box: $('vf-result'), out: $('vf-out'), sim: $('sim-body'), simWrap: $('sim-wrap'), status: $('vf-status'),
  };
  let resultText = '';

  const lineInputs = (row) => ({ name: row.querySelector('.vf-name'), grade: row.querySelector('.vf-grade'), weight: row.querySelector('.vf-weight') });
  const readRows = () => [...el.rows.children].map((row) => { const i = lineInputs(row); return { name: i.name.value, grade: i.grade.value, weight: i.weight.value }; });

  /** Tek vize satırı varken ağırlığı final oranının tamamlayıcısı yapar (örn. final 60 → vize 40). */
  function complementSingleRow() {
    if (el.rows.children.length !== 1) return;
    try {
      const f = parseNumber(el.fw.value, 'Final ağırlığı');
      if (f !== null && f >= 0 && f <= 100) lineInputs(el.rows.firstElementChild).weight.value = String(+(100 - f).toFixed(4)).replace('.', ',');
    } catch { /* hata update'te gösterilir */ }
  }
  function syncPressed() {
    document.querySelectorAll('[data-final]').forEach((b) => {
      let on = false;
      try { on = parseNumber(el.fw.value, 'Final ağırlığı') === Number(b.dataset.final); } catch { on = false; }
      b.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('[data-pass]').forEach((b) => {
      let on = false;
      try { on = parseNumber(el.pass.value, 'Geçme notu') === Number(b.dataset.pass); } catch { on = false; }
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function update() {
    el.status.textContent = '';
    syncPressed();
    try {
      const r = calcVizeFinal({ rows: readRows(), finalWeight: el.fw.value, pass: el.pass.value, baraj: el.baraj.value, target: el.target.value, final: el.final.value, but: el.but.value });
      showError(el.err, '');
      if (!r) { el.box.classList.remove('is-active'); resultText = ''; return; }
      const pairs = buildPairs(r);
      // Sonuç satırları: ilk satır vurgulu
      el.out.replaceChildren();
      // Gereken not sorusu varken (final girilmemişken) gereken not öne çıkar
      const order = r.average === null && r.need ? ['need', 'need-up', 'need-bind', 'but', 'target', 'target-up', 'target-bind', 'vize-avg', 'points'] : null;
      const sorted = order ? [...pairs].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0])) : pairs;
      sorted.forEach(([key, k, v], i) => {
        const row = add(el.out, 'div', undefined, 'nr-row' + (i === 0 ? ' is-strong' : ''));
        row.dataset.k = key;
        add(row, 'dt', k); add(row, 'dd', v);
      });
      // Simülasyon tablosu
      el.sim.replaceChildren();
      r.simulation.forEach((s) => {
        const tr = add(el.sim, 'tr');
        add(tr, 'td', String(s.final)); add(tr, 'td', fmt2.format(s.average));
        add(tr, 'td', s.ok === null ? '—' : s.ok ? 'Geçer' : 'Kalır');
      });
      el.simWrap.hidden = false;
      resultText = `Vize-final (final %${fmtN.format(r.finalWeight)}): ${sorted.map(([, k, v]) => `${k}: ${v}`).join(' · ')}`;
      el.box.classList.add('is-active');
    } catch (e) {
      el.box.classList.remove('is-active'); resultText = ''; showError(el.err, e.message);
    }
  }

  function addRow(values = {}) {
    const row = add(el.rows, 'div', undefined, 'vf-line');
    const mk = (cls, label, ph, mode, val) => {
      const wrap = add(row, 'label'); add(wrap, 'span', label);
      const inp = add(wrap, 'input', undefined, cls);
      inp.type = 'text'; inp.autocomplete = 'off'; inp.placeholder = ph; inp.value = val || '';
      if (mode) inp.inputMode = mode;
      inp.addEventListener('input', () => {
        // Tek satır varken satırın ağırlığını değiştirmek final oranını tamamlar
        if (cls === 'vf-weight' && el.rows.children.length === 1) {
          try { const w = parseNumber(inp.value, 'Ağırlık'); if (w !== null && w <= 100) el.fw.value = String(+(100 - w).toFixed(4)).replace('.', ','); } catch { /* update gösterir */ }
        }
        update();
      });
      return inp;
    };
    mk('vf-name', 'Bileşen adı', 'örn. Vize, Ödev', null, values.name);
    mk('vf-grade', 'Not (0-100)', 'örn. 60', 'decimal', values.grade);
    mk('vf-weight', 'Ağırlık (%)', 'örn. 40', 'decimal', values.weight);
    const del = add(row, 'button', 'Sil', 'ba-btn vf-del'); del.type = 'button';
    del.setAttribute('aria-label', 'Bu satırı sil');
    del.addEventListener('click', () => {
      row.remove();
      if (!el.rows.children.length) addRow({ name: 'Vize' });
      complementSingleRow();
      update();
    });
    return row;
  }

  // Başlangıç değerleri
  el.fw.value = String(params.varsayilan_final_orani);
  el.pass.value = String(params.varsayilan_gecme_notu);
  addRow({ name: 'Vize', weight: String(100 - params.varsayilan_final_orani) });

  el.add.addEventListener('click', () => { const r = addRow(); lineInputs(r).name.focus(); update(); });
  [el.pass, el.baraj, el.target, el.final, el.but].forEach((i) => i.addEventListener('input', update));
  el.fw.addEventListener('input', () => { complementSingleRow(); update(); });
  document.querySelectorAll('[data-final]').forEach((b) => b.addEventListener('click', () => { el.fw.value = b.dataset.final; complementSingleRow(); update(); }));
  document.querySelectorAll('[data-pass]').forEach((b) => b.addEventListener('click', () => { el.pass.value = b.dataset.pass; update(); }));
  $('vf-form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('vf-clear').addEventListener('click', () => {
    el.rows.replaceChildren(); el.fw.value = String(params.varsayilan_final_orani); el.pass.value = String(params.varsayilan_gecme_notu);
    [el.baraj, el.target, el.final, el.but].forEach((i) => { i.value = ''; });
    addRow({ name: 'Vize', weight: String(100 - params.varsayilan_final_orani) });
    update();
    lineInputs(el.rows.firstElementChild).grade.focus();
  });
  $('vf-copy').addEventListener('click', () => copy(resultText, el.status));
  syncPressed();
}

if (typeof document !== 'undefined' && $('vf-form')) init();
