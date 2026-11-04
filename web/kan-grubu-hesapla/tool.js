// Kan Grubu Hesaplama — tamamı tarayıcıda çalışır; seçimleriniz hiçbir sunucuya gitmez.
// Model: ABO (A, B, 0 alelleri) ve RhD (D, d) Mendel kalıtımı; iki gen bağımsız (9. ve 1. kromozom).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });

/** 8 kombinasyonun sabit gösterim sırası. */
export const GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
const ABOS = ['A', 'B', 'AB', '0'];
const ANTIGENS = { '0': [], A: ['A'], B: ['B'], AB: ['A', 'B'] };

/** "A+" → "A Rh+", "0-" → "0 Rh−" */
export const label = (g) => g.slice(0, -1) + (g.endsWith('+') ? ' Rh+' : ' Rh−');
const keyOf = (g) => g.slice(0, -1) + (g.endsWith('+') ? 'pos' : 'neg');
export const pct = (x) => '%' + nf1.format(x);
const pct1 = (p) => pct(Math.round(p * 1000) / 10);

class UserError extends Error {}

// Varsayılan parametreler (parametreler.json okunamazsa bunlar kullanılır).
const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'Türk Kızılay Kan Hizmetleri Genel Müdürlüğü, KHGM Faaliyet Kitabı 2025, "2025 Yılı Kan Bağışçılarının Kan Grup Dağılımı"; kan uyumu: T.C. Sağlık Bakanlığı Ulusal Kan ve Kan Bileşenleri Hazırlama, Kullanım ve Kalite Güvencesi Rehberi (2016), bölüm 2.6.',
  fenotip_dagilimi: { 'A+': 37, '0+': 30, 'B+': 14, 'AB+': 7, 'A-': 5, '0-': 4, 'B-': 2, 'AB-': 1 },
  yaklasik: false,
};

/** Eşit ağırlık: fenotipi A olan biri %50 AA, %50 A0 sayılır (B ve Rh+ için de aynı). */
export const EQUAL = { hA: 0.5, hB: 0.5, hD: 0.5, alleles: null };

/**
 * Hardy-Weinberg ile fenotip yüzdelerinden heterozigot olasılıkları.
 * r = √f(0), p = √(f(A)+f(0)) − r, q = √(f(B)+f(0)) − r; P(A0 | A) = 2pr / (p² + 2pr) = 2r / (p + 2r).
 * Rh: d = √f(Rh−), D = 1 − d; P(Dd | Rh+) = 2d / (D + 2d). Geçersiz veride null döner.
 */
export function weightsFrom(dist) {
  if (!dist || typeof dist !== 'object') return null;
  const vals = GROUPS.map((g) => Number(dist[g]));
  if (vals.some((x) => !Number.isFinite(x) || x < 0)) return null;
  const tot = vals.reduce((a, b) => a + b, 0);
  if (!(tot > 0)) return null;
  const f = (g) => Number(dist[g]) / tot;
  const fA = f('A+') + f('A-'), fB = f('B+') + f('B-'), f0 = f('0+') + f('0-');
  const fNeg = f('A-') + f('B-') + f('AB-') + f('0-');
  if (!(f0 > 0) || !(fNeg > 0) || fNeg >= 1) return null;
  const r = Math.sqrt(f0);
  const p = Math.sqrt(fA + f0) - r;
  const q = Math.sqrt(fB + f0) - r;
  const d = Math.sqrt(fNeg), D = 1 - d;
  return { hA: 2 * r / (p + 2 * r), hB: 2 * r / (q + 2 * r), hD: 2 * d / (D + 2 * d), alleles: { A: p, B: q, O: r, D, d } };
}

/** Ebeveynin ABO gametleri: iki "yuva" [alel, olasılık]. Genotip biliniyorsa her yuva %50. */
export function aboGametes(abo, gt, w = EQUAL) {
  if (abo === '0') return { slots: [['0', 0.5], ['0', 0.5]], known: true, fixed: true, gt: '00' };
  if (abo === 'AB') return { slots: [['A', 0.5], ['B', 0.5]], known: true, fixed: true, gt: 'AB' };
  if (abo !== 'A' && abo !== 'B') throw new UserError('Kan grubu seçimi okunamadı. Sayfayı yenileyip 0, A, B veya AB seçeneklerinden birini yeniden işaretleyin.');
  const hom = abo + abo, het = abo + '0';
  if (gt === hom) return { slots: [[abo, 0.5], [abo, 0.5]], known: true, gt: hom };
  if (gt === het) return { slots: [[abo, 0.5], ['0', 0.5]], known: true, gt: het };
  const h = abo === 'A' ? w.hA : w.hB;
  return { slots: [[abo, 1 - h / 2], ['0', h / 2]], known: false, h };
}

/** Ebeveynin RhD gametleri. */
export function rhGametes(rh, gt, w = EQUAL) {
  if (rh === '-') return { slots: [['d', 0.5], ['d', 0.5]], known: true, fixed: true, gt: 'dd' };
  if (rh !== '+') throw new UserError('Rh seçimi okunamadı. Sayfayı yenileyip Rh+ veya Rh− seçeneğini yeniden işaretleyin.');
  if (gt === 'DD') return { slots: [['D', 0.5], ['D', 0.5]], known: true, gt: 'DD' };
  if (gt === 'Dd') return { slots: [['D', 0.5], ['d', 0.5]], known: true, gt: 'Dd' };
  return { slots: [['D', 1 - w.hD / 2], ['d', w.hD / 2]], known: false, h: w.hD };
}

const RANK = { A: 0, B: 1, '0': 2 };
function aboGt(a, b) { return RANK[a] <= RANK[b] ? a + b : b + a; }
function aboOf(a, b) {
  if (a === '0' && b === '0') return '0';
  if ((a === 'A' && b === 'B') || (a === 'B' && b === 'A')) return 'AB';
  return a === 'A' || b === 'A' ? 'A' : 'B';
}
function rhGt(a, b) { return a === 'D' ? a + b : b + a; }

/** Saf hesap: anne {abo, rh, gtAbo, gtRh} × baba → fenotip olasılıkları ve Punnett hücreleri. */
export function calc(m, f, w = EQUAL) {
  const mA = aboGametes(m.abo, m.gtAbo, w), fA = aboGametes(f.abo, f.gtAbo, w);
  const mR = rhGametes(m.rh, m.gtRh, w), fR = rhGametes(f.rh, f.gtRh, w);
  const abo = { A: 0, B: 0, AB: 0, '0': 0 };
  const rh = { '+': 0, '-': 0 };
  const aboCells = mA.slots.map(([ma, mp]) => fA.slots.map(([fa, fp]) => {
    const ph = aboOf(ma, fa); abo[ph] += mp * fp;
    return { gt: aboGt(ma, fa), ph, p: mp * fp };
  }));
  const rhCells = mR.slots.map(([ma, mp]) => fR.slots.map(([fa, fp]) => {
    const ph = ma === 'D' || fa === 'D' ? '+' : '-'; rh[ph] += mp * fp;
    return { gt: rhGt(ma, fa), ph, p: mp * fp };
  }));
  const combo = {};
  for (const g of GROUPS) combo[g] = abo[g.slice(0, -1)] * rh[g.slice(-1)];
  return { abo, rh, combo, mA, fA, mR, fR, aboCells, rhCells };
}

/** En büyük kalan yöntemiyle yuvarlama: toplam her zaman tam %100 olur. */
export function roundPercents(vals, dec = 1) {
  const unit = 10 ** dec, total = 100 * unit;
  const sum = vals.reduce((a, b) => a + b, 0);
  if (!(sum > 0)) return vals.map(() => 0);
  const raw = vals.map((v) => (v / sum) * total);
  const fl = raw.map((x) => Math.floor(x + 1e-9));
  let left = total - fl.reduce((a, b) => a + b, 0);
  const order = raw.map((x, i) => ({ i, r: x - fl[i] })).sort((a, b) => b.r - a.r || a.i - b.i);
  for (const o of order) { if (left <= 0 || o.r <= 1e-9) break; fl[o.i]++; left--; }
  if (left > 0) { const iMax = raw.indexOf(Math.max(...raw)); fl[iMax] += left; }
  return fl.map((u) => u / unit);
}

/** Kan uyumu (Sağlık Bakanlığı rehberi 2.6): eritrosit, tam kan, plazma (TDP). */
export function compat(group) {
  if (!GROUPS.includes(group)) throw new UserError('Kan grubu seçimi okunamadı. Listeden bir grup seçin.');
  const a = group.slice(0, -1), s = group.slice(-1);
  const sub = (x, y) => ANTIGENS[x].every((t) => ANTIGENS[y].includes(t)); // x antijenleri ⊆ y antijenleri
  const rhOk = (donor, rec) => donor === '-' || rec === '+';
  const rbcGive = GROUPS.filter((g) => sub(a, g.slice(0, -1)) && rhOk(s, g.slice(-1)));
  const rbcGet = GROUPS.filter((g) => sub(g.slice(0, -1), a) && rhOk(g.slice(-1), s));
  const wbGive = GROUPS.filter((g) => g.slice(0, -1) === a && rhOk(s, g.slice(-1)));
  const wbGet = GROUPS.filter((g) => g.slice(0, -1) === a && rhOk(g.slice(-1), s));
  // Plazmada Rh aranmaz; alıcının antijenleri vericinin antijenlerinin alt kümesi olmalı.
  const plGive = GROUPS.filter((g) => sub(g.slice(0, -1), a));
  const plGet = GROUPS.filter((g) => sub(a, g.slice(0, -1)));
  return { rbcGive, rbcGet, wbGive, wbGet, plGive, plGet };
}

// ---------- Arayüz ----------

let P = { ...DEFAULTS };
let TR_W = weightsFrom(DEFAULTS.fenotip_dagilimi);

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) {
      const j = await res.json();
      if (j && typeof j === 'object') P = { ...DEFAULTS, ...j };
    }
  } catch (e) { /* çevrimdışı ya da bozuk dosya: varsayılanlar kullanılır */ }
  TR_W = weightsFrom(P.fenotip_dagilimi) || weightsFrom(DEFAULTS.fenotip_dagilimi);
  // "YYYY-AA-GG" yerel tarih olarak okunur; UTC yorumu batı saat dilimlerinde bir gün önceyi gösterir.
  const g = String(P.guncelleme || '');
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(g) ? g + 'T12:00:00' : g);
  const txt = Number.isNaN(d.getTime()) ? String(P.guncelleme || '') : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('params-line').textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + String(P.kaynak || DEFAULTS.kaynak);
  $('approx-warn').hidden = P.yaklasik !== true;
  updateWeightInfo();
}

function radioVal(name) {
  const el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : '';
}
function currentWeights() { return radioVal('weight') === 'esit' ? EQUAL : TR_W; }

function updateWeightInfo() {
  const el = $('w-info');
  if (!el) return;
  const w = currentWeights();
  const head = w === EQUAL ? 'Eşit ağırlık: ' : 'Türkiye dağılımından (Hardy-Weinberg): ';
  el.textContent = head + 'A grubunda A0 olasılığı ' + pct1(w.hA) + ' · B grubunda B0 olasılığı ' + pct1(w.hB) + ' · Rh+ için Dd olasılığı ' + pct1(w.hD) + '.';
}

const GT_OPTIONS = {
  A: [['AA', 'AA (homozigot)'], ['A0', 'A0 (heterozigot)']],
  B: [['BB', 'BB (homozigot)'], ['B0', 'B0 (heterozigot)']],
  '0': [['00', '00 (0 grubunda tek olasılık)']],
  AB: [['AB', 'AB (tek olasılık)']],
  '+': [['DD', 'DD (homozigot)'], ['Dd', 'Dd (heterozigot)']],
  '-': [['dd', 'dd (Rh− için tek olasılık)']],
};

function fillSelect(sel, key) {
  const prev = sel.value;
  sel.textContent = '';
  const opts = GT_OPTIONS[key];
  if (!opts) {
    const o = document.createElement('option'); o.value = ''; o.textContent = 'Önce kan grubunu seçin';
    sel.append(o); sel.disabled = true; return;
  }
  for (const [v, t] of opts) { const o = document.createElement('option'); o.value = v; o.textContent = t; sel.append(o); }
  if (opts.some(([v]) => v === prev)) sel.value = prev;
  sel.disabled = opts.length < 2;
}

function syncParent(px) {
  $(px + '-gt').hidden = !$(px + '-know').checked;
  fillSelect($(px + '-gt-abo'), radioVal(px + '-abo'));
  fillSelect($(px + '-gt-rh'), radioVal(px + '-rh'));
}

function readParent(px, who) {
  const abo = radioVal(px + '-abo'), rh = radioVal(px + '-rh');
  if (!abo) throw new UserError(who + ' ABO kan grubunu seçin (0, A, B veya AB). Bilmiyorsanız kan grubu kartına ya da e-Nabız\'daki tahlil sonuçlarına bakabilirsiniz.');
  if (!ABOS.includes(abo)) throw new UserError(who + ' kan grubu seçimi okunamadı. Sayfayı yenileyip yeniden seçin.');
  if (!rh) throw new UserError(who + ' Rh faktörünü (Rh+ veya Rh−) seçin. Kan grubu kartında "Rh pozitif" ya da "Rh negatif" olarak yazar.');
  if (rh !== '+' && rh !== '-') throw new UserError(who + ' Rh seçimi okunamadı. Sayfayı yenileyip yeniden seçin.');
  const p = { abo, rh, gtAbo: '', gtRh: '' };
  if ($(px + '-know').checked) {
    const ga = $(px + '-gt-abo').value, gr = $(px + '-gt-rh').value;
    const okA = (GT_OPTIONS[abo] || []).some(([v]) => v === ga);
    const okR = (GT_OPTIONS[rh] || []).some(([v]) => v === gr);
    if (!okA || !okR) throw new UserError(who + ' genotip seçimi kan grubuyla uyuşmuyor. Genotipi listeden yeniden seçin ya da emin değilseniz "Genotipi biliyorum" kutusunu kaldırın.');
    p.gtAbo = ga; p.gtRh = gr;
  }
  return p;
}

function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(msg) { hideResult($('result')); hideResult($('compat-result')); showError($('error'), msg); }

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

const PH_NAME = { A: 'A grubu', B: 'B grubu', AB: 'AB grubu', '0': '0 grubu', '+': 'Rh+', '-': 'Rh−' };

/** Ağırlıklı Punnett karesi: satırlar anne, sütunlar baba alelleri. */
function punnett(caption, mG, fG, cells) {
  const t = el('table', 'kg-pn');
  t.append(el('caption', '', caption));
  const thead = el('thead'); const hr = el('tr');
  hr.append(el('th', 'kg-pn-corner', 'Anne ↓ Baba →'));
  for (const [a, p] of fG.slots) { const th = el('th', '', a); th.scope = 'col'; th.append(el('small', '', pct1(p))); hr.append(th); }
  thead.append(hr); t.append(thead);
  const tb = el('tbody');
  mG.slots.forEach(([a, p], i) => {
    const tr = el('tr');
    const th = el('th', '', a); th.scope = 'row'; th.append(el('small', '', pct1(p))); tr.append(th);
    for (const c of cells[i]) {
      const td = el('td');
      td.append(el('strong', '', c.gt), el('span', '', PH_NAME[c.ph]), el('small', '', pct1(c.p)));
      tr.append(td);
    }
    tb.append(tr);
  });
  t.append(tb);
  return t;
}

function parentSentence(who, p, gA, gR, wName) {
  let a;
  if (gA.fixed) a = 'ABO genotipi kesin olarak ' + gA.gt;
  else if (gA.known) a = 'ABO genotipi ' + gA.gt + ' olarak girildi';
  else a = p.abo + p.abo + (p.abo === 'A' ? ' mı ' : ' mi ') + p.abo + '0 mı bilinmediği için ' + p.abo + '0 olasılığı ' + pct1(gA.h) + ' alındı (' + wName + ')';
  let r;
  if (gR.fixed) r = 'Rh genotipi kesin olarak dd';
  else if (gR.known) r = 'Rh genotipi ' + gR.gt + ' olarak girildi';
  else r = 'DD mi Dd mi bilinmediği için Dd olasılığı ' + pct1(gR.h) + ' alındı (' + wName + ')';
  return who + ' ' + label(p.abo + p.rh) + ': ' + a + '; ' + r + '.';
}

function runBaby() {
  showError($('error'), '');
  hideResult($('compat-result'));
  let m, f, r;
  try {
    m = readParent('m', 'Annenin');
    f = readParent('f', 'Babanın');
    r = calc(m, f, currentWeights());
  } catch (e) {
    if (e instanceof UserError) return fail(e.message);
    return fail('Hesap yapılamadı. Sayfayı yenileyip seçimleri yeniden yapın; sorun sürerse tarayıcınızı güncelleyin.');
  }
  const wName = currentWeights() === EQUAL ? 'eşit ağırlık' : 'Türkiye dağılımı';

  // 8 kombinasyon
  const vals = GROUPS.map((g) => r.combo[g]);
  const rounded = roundPercents(vals);
  const list = $('combo-list'); list.textContent = '';
  GROUPS.forEach((g, i) => {
    const on = r.combo[g] > 1e-12;
    const li = el('li', on ? '' : 'is-zero');
    li.dataset.g = g;
    const bar = el('span', 'kg-bar'); bar.setAttribute('aria-hidden', 'true');
    const fill = el('i'); fill.style.width = rounded[i] + '%'; bar.append(fill);
    const val = el('span', 'kg-pct', on && rounded[i] === 0 ? '<%0,1' : pct(rounded[i]));
    val.id = 'p-' + keyOf(g);
    li.append(el('span', 'kg-name', label(g)), bar, val);
    list.append(li);
  });
  const aboR = roundPercents(ABOS.map((a) => r.abo[a]));
  ABOS.forEach((a, i) => { $('abo-' + a).textContent = pct(aboR[i]); });
  const rhR = roundPercents([r.rh['+'], r.rh['-']]);
  $('rh-pos').textContent = pct(rhR[0]);
  $('rh-neg').textContent = pct(rhR[1]);
  const sum = Math.round(rounded.reduce((a, b) => a + b, 0) * 10) / 10;
  $('sum-line').textContent = 'Toplam: ' + pct(sum) + ' (yüzdeler 0,1 hassasiyetle, toplam %100 olacak şekilde yuvarlandı).';

  const possible = GROUPS.filter((g) => r.combo[g] > 1e-12);
  const impossible = GROUPS.filter((g) => !(r.combo[g] > 1e-12));
  $('possible').textContent = possible.map(label).join(', ');
  $('impossible').textContent = impossible.length ? impossible.map(label).join(', ') : 'Yok; 8 kombinasyonun tümü mümkün.';

  const max = Math.max(...vals);
  const best = GROUPS.filter((g) => Math.abs(r.combo[g] - max) < 1e-12);
  const bestPct = pct(rounded[GROUPS.indexOf(best[0])]);
  $('r-best').textContent = best.length === 1
    ? 'En olası kan grubu: ' + label(best[0]) + ' (' + bestPct + ')'
    : 'En olası kan grupları: ' + best.map(label).join(', ') + ' (her biri ' + bestPct + ')';

  $('pn-abo').textContent = '';
  $('pn-abo').append(punnett('ABO Punnett karesi (hücrede genotip, kan grubu ve olasılık)', r.mA, r.fA, r.aboCells));
  $('pn-rh').textContent = '';
  $('pn-rh').append(punnett('Rh (D) Punnett karesi', r.mR, r.fR, r.rhCells));

  const ex = $('explain'); ex.textContent = '';
  ex.append(el('p', '', parentSentence('Anne', m, r.mA, r.mR, wName)));
  ex.append(el('p', '', parentSentence('Baba', f, r.fA, r.fR, wName)));
  ex.append(el('p', '', 'Bebek her genden bir aleli anneden, birini babadan alır. Karedeki her hücrenin olasılığı, annenin ve babanın o aleli aktarma olasılıklarının çarpımıdır; aynı kan grubunu veren hücreler toplanır. ABO ve Rh genleri farklı kromozomlarda olduğu için 8 kombinasyonun yüzdesi ABO ve Rh olasılıklarının çarpımıyla bulunur.'));

  $('rh-warn').hidden = !(m.rh === '-' && f.rh === '+');
  $('rh-baby').textContent = pct(rhR[0]);
  $('impossible-note').hidden = impossible.length === 0;
  showResult($('result'));
}

function joinGroups(arr) {
  if (arr.length === GROUPS.length) return 'Tüm gruplar (' + arr.map(label).join(', ') + ')';
  return arr.map(label).join(', ');
}

function runCompat() {
  showError($('error'), '');
  hideResult($('result'));
  const g = radioVal('cg');
  if (!g) return fail('Uyum tablosunu görmek için bir kan grubu seçin (ör. A Rh+). Kendi grubunuzu bilmiyorsanız kan grubu kartınıza bakın.');
  let c;
  try { c = compat(g); } catch (e) { return fail(e instanceof UserError ? e.message : 'Uyum tablosu oluşturulamadı. Sayfayı yenileyip yeniden deneyin.'); }
  $('c-title').textContent = label(g) + ' için kan uyumu';
  $('c-rbc-give').textContent = joinGroups(c.rbcGive);
  $('c-rbc-get').textContent = joinGroups(c.rbcGet);
  $('c-wb-give').textContent = joinGroups(c.wbGive);
  $('c-wb-get').textContent = joinGroups(c.wbGet);
  $('c-pl-give').textContent = joinGroups(c.plGive);
  $('c-pl-get').textContent = joinGroups(c.plGet);
  showResult($('compat-result'));
}

function setMode() {
  const mode = radioVal('mode') || 'baby';
  $('panel-baby').hidden = mode !== 'baby';
  $('panel-compat').hidden = mode !== 'compat';
  showError($('error'), '');
  hideResult($('result'));
  hideResult($('compat-result'));
}

function init() {
  for (const px of ['m', 'f']) {
    document.querySelectorAll('input[name="' + px + '-abo"], input[name="' + px + '-rh"]').forEach((i) => i.addEventListener('change', () => syncParent(px)));
    $(px + '-know').addEventListener('change', () => syncParent(px));
    syncParent(px);
  }
  // Ağırlık değişince açıkta kalan sonuç eski yöntemle kalmasın: sonuç görünüyorsa yeniden hesaplanır.
  document.querySelectorAll('input[name="weight"]').forEach((i) => i.addEventListener('change', () => {
    updateWeightInfo();
    if ($('result').classList.contains('is-active')) runBaby();
  }));
  document.querySelectorAll('input[name="mode"]').forEach((i) => i.addEventListener('change', setMode));
  document.querySelectorAll('input[name="cg"]').forEach((i) => i.addEventListener('change', runCompat));
  $('form-baby').addEventListener('submit', (e) => { e.preventDefault(); runBaby(); });
  $('form-compat').addEventListener('submit', (e) => { e.preventDefault(); runCompat(); });
  $('clear').addEventListener('click', () => {
    $('form-baby').reset();
    for (const px of ['m', 'f']) syncParent(px);
    updateWeightInfo();
    hideResult($('result'));
    showError($('error'), '');
    const first = document.querySelector('input[name="m-abo"]');
    if (first) first.focus();
  });
  setMode();
  updateWeightInfo();
  loadParams();
  // Test kancası: saf hesap fonksiyonlarına erişim (yalnızca okuma).
  window.__kanGrubuHesaplaTest = () => ({ calc, roundPercents, weightsFrom, compat, EQUAL, weights: TR_W, params: P });
}

init();
