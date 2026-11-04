// Başabaş Noktası (Break-even) Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => (Number.isFinite(n) ? `${fmt.format(round2(n))} ₺` : '—');
const pct = (n) => (Number.isFinite(n) ? `%${fmt.format(round2(n))}` : '—');
const units = (n) => `${fmtInt.format(n)} adet`;

// Zorunlu alan henüz boşsa fırlatılır; hata kutusu göstermeden sonucu gizler.
class Incomplete extends Error {}

/* ---------- Sayı ayrıştırma (1.250,50 / 1250,5 / 1250.5) ---------- */
export function parseAmount(raw, label = 'Tutar', { allowZero = true } = {}) {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$|%/gi, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 1.250,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir değer girin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 1.250,50`);
  if (!allowZero && n === 0) throw new Error(`${label} sıfırdan büyük olmalı.`);
  return n;
}

/* ---------- Hesap çekirdeği ---------- */
// Kayan nokta artığı yüzünden 1250,0000000002 → 1251 olmasın diye küçük tolerans.
const ceilUnits = (n) => Math.ceil(n - 1e-9);

/** Bir dönem için başabaş değerleri. fixed: dönem sabit gideri, target: hedef kâr, current: mevcut satış adedi. */
export function analyze({ fixed, price, variable, target = 0, current = null }) {
  const cm = price - variable;
  const beUnits = ceilUnits(fixed / cm);
  const out = { cm, ratio: (cm / price) * 100, fixed, beUnits, beRevenue: beUnits * price };
  if (target > 0) {
    out.targetUnits = ceilUnits((fixed + target) / cm);
    out.targetRevenue = out.targetUnits * price;
  }
  if (current !== null) {
    out.currentProfit = current * cm - fixed;
    out.safetyUnits = current - beUnits;
    out.safetyPct = current > 0 ? ((current - beUnits) / current) * 100 : NaN;
  }
  return out;
}

/* ---------- Sabit gider satırları ---------- */
const el = {
  period: $('b-period'), price: $('b-price'), variable: $('b-var'), target: $('b-target'), current: $('b-current'),
  fixBody: $('fix-rows'), fixAdd: $('fix-add'), fixTotal: $('fix-total'),
  error: $('error'), result: $('result'), rows: $('result-rows'), note: $('result-note'), hint: $('be-hint'),
  copy: $('copy'), status: $('copy-status'), chartWrap: $('chart-wrap'), canvas: $('chart'),
};

/** Sonuç kutusunu gösterir/gizler (.ba-result yalnızca is-active ile görünür). */
function setResult(on) { el.result.hidden = !on; el.result.classList.toggle('is-active', on); }

const periodWord = () => (el.period.value === 'yillik' ? 'yıllık' : 'aylık');

function addFixRow(name = '') {
  const div = document.createElement('div');
  div.className = 'fix-row';
  div.innerHTML = `
    <input type="text" data-k="name" autocomplete="off" aria-label="Gider adı" placeholder="Gider adı">
    <input type="text" inputmode="decimal" data-k="amount" autocomplete="off" aria-label="Gider tutarı (₺)" placeholder="0">
    <button type="button" class="ba-btn fix-del" aria-label="Bu gider satırını sil">×</button>`;
  div.querySelector('[data-k="name"]').value = name;
  el.fixBody.append(div);
  div.querySelector('.fix-del').addEventListener('click', () => { div.remove(); render(); });
  return div;
}

function readFixedTotal() {
  let total = 0;
  Array.from(el.fixBody.children).forEach((div, i) => {
    const label = div.querySelector('[data-k="name"]').value.trim() || `${i + 1}. gider`;
    total += parseAmount(div.querySelector('[data-k="amount"]').value, `${label} tutarı`) ?? 0;
  });
  return total;
}

/* ---------- Hesap ve gösterim ---------- */
let lastChart = null;

function compute() {
  const fixedIn = readFixedTotal();
  const price = parseAmount(el.price.value, 'Birim satış fiyatı', { allowZero: false });
  const variable = parseAmount(el.variable.value, 'Birim değişken maliyet');
  const target = parseAmount(el.target.value, 'Hedef kâr') ?? 0;
  const current = parseAmount(el.current.value, 'Mevcut satış adedi');
  el.fixTotal.textContent = money(fixedIn);
  if (price !== null && variable !== null && price <= variable) {
    throw new Error(`Başabaş yok: birim satış fiyatı (${money(price)}) birim değişken maliyetin (${money(variable)}) üzerinde olmalı; aksi halde her satış sabit giderlere katkı yapmaz, zarar büyütür. Satış fiyatını artırın ya da değişken maliyeti düşürün.`);
  }
  if (price === null || variable === null || fixedIn <= 0) throw new Incomplete();
  // Girdiler seçilen dönemdedir; aylık ↔ yıllık geçişi yalnızca sabit gider, hedef kâr ve mevcut adedi çarpar.
  const toMonth = el.period.value === 'yillik' ? 1 / 12 : 1;
  const toYear = el.period.value === 'yillik' ? 1 : 12;
  const make = (f) => analyze({ fixed: fixedIn * f, price, variable, target: target * f, current: current === null ? null : current * f });
  return { m: make(toMonth), y: make(toYear), inp: el.period.value === 'yillik' ? 'y' : 'm', price, variable, target, hasCurrent: current !== null };
}

function addRow(id, label, values, strong = false) {
  const div = document.createElement('div');
  div.className = `kdv-row be-row${strong ? ' is-strong' : ''}`;
  const dt = document.createElement('dt'); dt.textContent = label;
  div.append(dt);
  values.forEach(([suffix, text, cap]) => {
    const dd = document.createElement('dd');
    dd.id = `r-${id}${suffix}`; dd.textContent = text;
    if (cap) dd.dataset.cap = cap;
    div.append(dd);
  });
  el.rows.append(div);
}

function render() {
  try {
    const r = compute();
    showError(el.error, '');
    el.hint.hidden = true;
    el.rows.innerHTML = '';
    const both = (id, label, f, strong) => addRow(id, label, [['-m', f(r.m), 'Aylık'], ['-y', f(r.y), 'Yıllık']], strong);
    addRow('katki', 'Birim katkı payı (fiyat − değişken maliyet)', [['', money(r.m.cm)]], true);
    addRow('katki-oran', 'Katkı payı oranı', [['', pct(r.m.ratio)]]);
    both('sabit', 'Sabit giderler', (a) => money(a.fixed));
    both('adet', 'Başabaş satış adedi', (a) => units(a.beUnits), true);
    both('ciro', 'Başabaş cirosu', (a) => money(a.beRevenue), true);
    if (r.target > 0) {
      both('hedef-adet', 'Hedef kâr için gereken adet', (a) => units(a.targetUnits), true);
      both('hedef-ciro', 'Hedef kâr için gereken ciro', (a) => money(a.targetRevenue));
    }
    if (r.hasCurrent) {
      both('mevcut-kar', 'Mevcut satışla kâr / zarar', (a) => money(a.currentProfit));
      both('guvenlik-adet', 'Güvenlik marjı (adet)', (a) => (a.safetyUnits >= 0 ? units(a.safetyUnits) : `${units(-a.safetyUnits)} eksik`), true);
      both('guvenlik-oran', 'Güvenlik marjı (satışın yüzdesi)', (a) => (a.safetyUnits >= 0 ? pct(a.safetyPct) : `−${pct(-a.safetyPct)}`));
    }
    const base = r[r.inp];
    let note = `Başabaş adedi, sabit giderlerin birim katkı payına bölünmesiyle bulunur ve tam sayıya yukarı yuvarlanır. Fiyat ve maliyetler KDV hariç, hedef kâr vergi öncesi kabul edilir. Girdiler ${periodWord()} tutardır.`;
    if (r.hasCurrent) {
      note += base.safetyUnits >= 0
        ? ' Mevcut satışınız başabaşın üzerinde; güvenlik marjı satışların ne kadar düşebileceğini gösterir.'
        : ' Mevcut satışınız başabaşın altında; zarar edersiniz. Fiyatı artırmayı, değişken maliyeti ya da sabit gideri düşürmeyi deneyin.';
    }
    el.note.textContent = note;
    setResult(true);
    lastChart = { base, price: r.price, variable: r.variable, current: r.hasCurrent ? parseAmount(el.current.value) : null, target: r.target };
    el.chartWrap.hidden = false;
    drawChart();
  } catch (err) {
    setResult(false);
    el.chartWrap.hidden = true;
    lastChart = null;
    const incomplete = err instanceof Incomplete;
    showError(el.error, incomplete ? '' : err.message);
    el.hint.hidden = !incomplete;
  }
  el.status.textContent = '';
}

/* ---------- Çizgi grafik (canvas) ---------- */
function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function drawChart() {
  if (!lastChart) return;
  const { base, price, variable, current } = lastChart;
  const canvas = el.canvas;
  const cssW = Math.max(240, Math.floor(canvas.parentElement.clientWidth));
  const cssH = cssW < 480 ? 240 : 300;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  canvas.style.height = `${cssH}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const text = cssVar('--ba-text', '#1e2126');
  const muted = cssVar('--ba-text-muted', '#63666c');
  const grid = cssVar('--ba-border', '#e3e1df');
  const revenueColor = cssVar('--ba-success', '#1f7a4d');
  const costColor = cssVar('--ba-danger', '#a3271f');
  const accent = cssVar('--ba-primary', '#7b2331');

  const maxX = Math.max(base.beUnits * 2, (current || 0) * 1.15, (base.targetUnits || 0) * 1.1, 10);
  const maxY = Math.max(price * maxX, base.fixed + variable * maxX);
  const pad = { l: 52, r: 12, t: 16, b: 34 };
  const w = cssW - pad.l - pad.r;
  const h = cssH - pad.t - pad.b;
  const X = (x) => pad.l + (x / maxX) * w;
  const Y = (y) => pad.t + h - (y / maxY) * h;
  const short = (n) => (n >= 1e6 ? `${fmt.format(n / 1e6).replace(/,00$/, '')} Mn` : n >= 1e3 ? `${fmtInt.format(n / 1e3)} B` : fmtInt.format(n));

  ctx.font = '12px sans-serif';
  ctx.lineWidth = 1;
  ctx.strokeStyle = grid; ctx.fillStyle = muted;
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (h * i) / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + w, y); ctx.stroke();
    ctx.fillText(short(maxY * (1 - i / 4)), pad.l - 6, y);
  }
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for (let i = 0; i <= 4; i++) ctx.fillText(fmtInt.format((maxX * i) / 4), pad.l + (w * i) / 4, pad.t + h + 8);

  const line = (color, y0, slope, dash = []) => {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(X(0), Y(y0)); ctx.lineTo(X(maxX), Y(y0 + slope * maxX)); ctx.stroke();
    ctx.setLineDash([]);
  };
  line(revenueColor, 0, price);
  line(costColor, base.fixed, variable);

  // Başabaş kesişimi (gerçek kesişim: sabit ÷ katkı payı, yuvarlanmamış)
  const bx = base.fixed / base.cm;
  const by = price * bx;
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(X(bx), Y(by)); ctx.lineTo(X(bx), pad.t + h); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.arc(X(bx), Y(by), 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = text; ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = X(bx) > cssW * 0.6 ? 'right' : 'left'; ctx.textBaseline = 'bottom';
  ctx.fillText(`Başabaş: ${fmtInt.format(base.beUnits)} adet`, X(bx) + (X(bx) > cssW * 0.6 ? -8 : 8), Y(by) - 8);

  if (current) {
    ctx.strokeStyle = muted; ctx.lineWidth = 1.5; ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.moveTo(X(current), pad.t); ctx.lineTo(X(current), pad.t + h); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = muted; ctx.font = '12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('Mevcut', X(current), pad.t + 2);
  }
  canvas.setAttribute('aria-label', `Başabaş grafiği: toplam gelir ve toplam maliyet çizgileri ${fmtInt.format(base.beUnits)} adette, yaklaşık ${money(base.beRevenue)} ciroda kesişir. Bu adedin altında zarar, üstünde kâr vardır.`);
  $('chart-caption').textContent = `Yatay eksen: ${periodWord()} satış adedi · Dikey eksen: ₺`;
}

/* ---------- Olaylar ---------- */
['period', 'price', 'variable', 'target', 'current'].forEach((k) => {
  el[k].addEventListener('input', render);
  el[k].addEventListener('change', render);
});
el.period.addEventListener('change', () => {
  document.querySelectorAll('[data-pw]').forEach((n) => { n.textContent = periodWord(); });
});
el.fixBody.addEventListener('input', render);
el.fixAdd.addEventListener('click', () => { const d = addFixRow(); d.querySelector('[data-k="name"]').focus(); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  el.fixBody.innerHTML = '';
  ['Kira', 'Personel maaşları', 'Elektrik, su, internet'].forEach(addFixRow);
  el.period.dispatchEvent(new Event('change'));
  render();
});
el.copy.addEventListener('click', async () => {
  const text = Array.from(el.rows.children).map((r) => {
    const vals = Array.from(r.querySelectorAll('dd')).map((d) => (d.dataset.cap ? `${d.dataset.cap}: ${d.textContent}` : d.textContent));
    return `${r.children[0].textContent}: ${vals.join(' | ')}`;
  }).join('\n');
  try { await navigator.clipboard.writeText(text); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => drawChart()).observe(el.canvas.parentElement);
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', drawChart);

['Kira', 'Personel maaşları', 'Elektrik, su, internet'].forEach(addFixRow);
render();
