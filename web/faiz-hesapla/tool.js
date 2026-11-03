// Basit ve Bileşik Faiz Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; yatırım/finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Türkçe sayı biçimi ---------- */
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "3,5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/* ---------- Hesap çekirdeği ---------- */

/**
 * Dönem dönem faiz simülasyonu.
 * P: anapara, rate: yıllık oran (kesir), years: süre (yıl), type: 'basit' | 'bilesik',
 * m: yıllık bileşik dönem sayısı (365, 12, 1), dep: ay sonunda eklenen tutar, tax: stopaj (kesir).
 * Aylık ekleme varsa adım aydır; bileşik oran (1 + r/m)^(m/12) ile aya çevrilir.
 */
export function simulate({ P, rate, years, type, m, dep, tax }) {
  const hasDep = dep > 0;
  let perYear;
  if (type === 'basit') perYear = (years >= 1 / 12 || hasDep) ? 12 : 365;
  else perYear = hasDep ? 12 : m;
  const n = years * perYear;
  const full = Math.floor(n + 1e-9);
  const frac = n - full < 1e-9 ? 0 : n - full;
  let invested = P;
  let gain = 0;
  const snaps = [{ k: 0, el: 0, invested, gain: 0, balance: P, net: P }];
  const total = full + (frac ? 1 : 0);
  for (let k = 1; k <= total; k++) {
    const len = k <= full ? 1 : frac;
    let interest;
    if (type === 'basit') interest = invested * rate * len / perYear;
    else interest = (invested + gain) * (Math.pow(1 + rate / m, m * len / perYear) - 1);
    gain += interest;
    if (k <= full && hasDep) invested += dep;
    const el = Math.min(k, n) / perYear;
    snaps.push({ k, el, invested, gain, balance: invested + gain, net: invested + gain * (1 - tax) });
  }
  const last = snaps[snaps.length - 1];
  return { snaps, invested: last.invested, gross: last.gain, taxAmt: last.gain * tax, net: last.gain * (1 - tax), total: last.net, years };
}

/** Hedef net toplam tutara ulaşmak için gereken en küçük tam ay sayısı (ikili arama). 0 = ulaşılamaz. */
export function monthsToTarget(opts, target, maxMonths = 1200) {
  const reach = (mo) => simulate({ ...opts, years: mo / 12 }).total >= target;
  if (!reach(maxMonths)) return 0;
  let lo = 1, hi = maxMonths;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (reach(mid)) hi = mid; else lo = mid + 1;
  }
  return lo;
}

/** Hedef net toplam tutara ulaşmak için gereken yıllık oran (kesir; ikili arama). NaN = ulaşılamaz. */
export function rateToTarget(opts, target) {
  const f = (r) => simulate({ ...opts, rate: r }).total;
  let lo = 0, hi = 10; // en çok %1000 yıllık
  if (f(hi) < target) return NaN;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) >= target) hi = mid; else lo = mid;
  }
  return hi;
}

/* ---------- Gösterim yardımcıları ---------- */

/** Geçen süreyi okunur etikete çevirir. */
function label(el, totalYears) {
  if (totalYears * 365 <= 90) return `${Math.round(el * 365)}. gün`;
  const mo = Math.round(el * 12);
  if (mo < 12) return `${mo}. ay`;
  const y = Math.floor(mo / 12), z = mo % 12;
  return `${y} yıl${z ? ` ${z} ay` : ''}`;
}

function durationText(months) {
  const y = Math.floor(months / 12), z = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yıl`);
  if (z) parts.push(`${z} ay`);
  return parts.join(' ') || '0 ay';
}

/** Tuval üzerine iki çizgili basit grafik çizer (yatırılan ve bakiye). */
function drawChart(canvas, snaps, withNet) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 320, h = canvas.clientHeight || 220;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const step = Math.max(1, Math.ceil(snaps.length / 160));
  const pts = snaps.filter((s, i) => i % step === 0 || i === snaps.length - 1);
  const padL = 58, padR = 10, padT = 12, padB = 26;
  const maxY = Math.max(...pts.map((p) => p.balance)) || 1;
  const maxX = pts[pts.length - 1].el || 1;
  const X = (v) => padL + (v / maxX) * (w - padL - padR);
  const Y = (v) => h - padB - (v / maxY) * (h - padT - padB);
  ctx.font = '11px sans-serif'; ctx.fillStyle = '#4a4a4a'; ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = (maxY * i) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(v), padL - 6, y + 4);
  }
  ctx.textAlign = 'center';
  ctx.fillText('0', padL, h - 8);
  ctx.fillText(label(maxX, maxX), w - padR - 14, h - 8);
  const line = (key, color, dash) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.2; ctx.setLineDash(dash);
    pts.forEach((p, i) => { const x = X(p.el), y = Y(p[key]); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
    ctx.stroke(); ctx.setLineDash([]);
  };
  line('invested', '#6b6b6b', [6, 4]);
  line('balance', '#7b2331', []);
  canvas.dataset.ready = '1';
  canvas.setAttribute('aria-label', `Çizgi grafik: yatırılan tutar ${fmt(snaps[snaps.length - 1].invested)}, vade sonu bakiye ${fmt(snaps[snaps.length - 1].balance)}${withNet ? ' (brüt)' : ''}.`);
}

/* ---------- Arayüz ---------- */
const el = {
  form: $('form'), error: $('error'), result: $('result'), status: $('copy-status'),
};
let lastSummary = '';
let lastDraw = null;

function readCommon() {
  const P = parseNum($('f-principal').value);
  if (!(P > 0)) throw new Error('Anapara geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 100.000).');
  const rateTxt = $('f-rate').value.trim();
  const type = $('f-type').value;
  const m = { gunluk: 365, aylik: 12, yillik: 1 }[$('f-comp').value] || 12;
  const depTxt = $('f-deposit').value.trim();
  const dep = depTxt ? parseNum(depTxt) : 0;
  if (depTxt && !(dep >= 0)) throw new Error('Aylık ekleme tutarı geçersiz. Boş bırakın ya da 0 veya daha büyük bir sayı yazın.');
  const taxTxt = $('f-tax').value.trim();
  const tax = taxTxt ? parseNum(taxTxt) : 0;
  if (taxTxt && !(tax >= 0 && tax <= 100)) throw new Error('Stopaj oranı geçersiz. 0 ile 100 arasında bir yüzde yazın ya da boş bırakın.');
  return { P, rateTxt, type, m, dep, tax: tax / 100 };
}

function readRate(txt) {
  const r = parseNum(txt);
  if (!(r >= 0 && r <= 1000)) throw new Error('Faiz oranı geçersiz. Yıllık oranı yüzde olarak, 0 ile 1000 arasında yazın (örnek: 40 ya da 42,5).');
  return r / 100;
}

function readTerm() {
  const v = parseNum($('f-term').value);
  const unit = $('f-unit').value;
  if (!(v > 0)) throw new Error('Süre geçersiz. Sıfırdan büyük bir sayı yazın ve gün, ay ya da yıl birimini seçin.');
  const years = unit === 'gun' ? v / 365 : unit === 'ay' ? v / 12 : v;
  if (years > 100) throw new Error('Süre çok uzun. En fazla 100 yıllık bir süre girin.');
  return years;
}

function readTarget() {
  const t = parseNum($('f-target').value);
  if (!(t > 0)) throw new Error('Hedef tutar geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 500.000).');
  return t;
}

function render(res, opts, headline) {
  const { snaps } = res;
  $('r-head').textContent = headline;
  $('r-invested').textContent = fmt(res.invested);
  $('r-gross').textContent = fmt(res.gross);
  $('r-taxamt').textContent = opts.tax > 0 ? fmt(res.taxAmt) : 'Stopaj girilmedi';
  $('r-net').textContent = fmt(res.net);
  $('r-total').textContent = fmt(res.total);
  const effective = opts.dep > 0 || res.years <= 0 ? null : (Math.pow(res.total / opts.P, 1 / res.years) - 1) * 100;
  $('r-eff').textContent = effective === null || !isFinite(effective) ? 'Aylık ekleme olduğunda hesaplanmaz' : pct(effective);
  const showNet = opts.tax > 0;
  $('th-net').hidden = !showNet;
  const step = Math.max(1, Math.ceil((snaps.length - 1) / 60));
  const rows = snaps.filter((s, i) => i > 0 && (i % step === 0 || i === snaps.length - 1));
  $('plan-body').innerHTML = rows.map((s) =>
    `<tr><th scope="row">${label(s.el, res.years)}</th><td>${money.format(s.invested)}</td><td>${money.format(s.gain)}</td><td>${money.format(s.balance)}</td>${showNet ? `<td>${money.format(s.net)}</td>` : ''}</tr>`).join('');
  el.result.classList.add('is-active');
  lastDraw = { snaps, showNet };
  drawChart($('chart'), snaps, showNet);
  lastSummary = `${headline}\nToplam yatırılan: ${fmt(res.invested)}\nBrüt getiri: ${fmt(res.gross)}\nNet getiri: ${fmt(res.net)}\nVade sonu toplam: ${fmt(res.total)}\n(Matematiksel hesaptır; yatırım tavsiyesi değildir.)`;
}

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const mode = currentMode();
  $('g-rate').hidden = mode === 'oran';
  $('g-term').hidden = mode === 'sure';
  $('g-target').hidden = mode === 'hesap';
  $('g-comp').hidden = $('f-type').value === 'basit';
  $('calc').textContent = mode === 'hesap' ? 'Faizi hesapla' : mode === 'sure' ? 'Süreyi hesapla' : 'Oranı hesapla';
}

el.form.addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  el.status.textContent = '';
  try {
    const c = readCommon();
    const base = { P: c.P, type: c.type, m: c.m, dep: c.dep, tax: c.tax };
    const mode = currentMode();
    if (mode === 'hesap') {
      const rate = readRate(c.rateTxt);
      const years = readTerm();
      const res = simulate({ ...base, rate, years });
      render(res, base, `Vade sonu toplam tutar: ${fmt(res.total)}`);
    } else if (mode === 'sure') {
      const rate = readRate(c.rateTxt);
      const target = readTarget();
      if (target <= c.P) throw new Error('Hedef tutar anaparadan büyük olmalı. Hedefi yükseltin ya da anaparayı düşürün.');
      const months = monthsToTarget({ ...base, rate }, target);
      if (!months) throw new Error('Bu koşullarla 100 yılda bile hedefe ulaşılamıyor. Faiz oranını ya da aylık ekleme tutarını artırın.');
      const res = simulate({ ...base, rate, years: months / 12 });
      render(res, base, `Hedefe ulaşma süresi: ${durationText(months)} (${months} ay)`);
    } else {
      const years = readTerm();
      const target = readTarget();
      const invested = c.P + c.dep * Math.floor(years * 12 + 1e-9);
      if (target <= invested) throw new Error('Hedef tutar, yatıracağınız toplam tutardan büyük olmalı. Hedefi yükseltin ya da süreyi/tutarı azaltın.');
      const rate = rateToTarget({ ...base, years }, target);
      if (Number.isNaN(rate)) throw new Error('Bu hedef için yıllık %1000 oran bile yetmiyor. Süreyi uzatın, hedefi düşürün ya da aylık ekleme yapın.');
      const res = simulate({ ...base, rate, years });
      render(res, base, `Gereken yıllık faiz oranı: ${pct(rate * 100)}`);
    }
  } catch (err) {
    el.result.classList.remove('is-active');
    showError(el.error, err.message);
  }
});

$('clear').addEventListener('click', () => {
  el.form.reset();
  el.result.classList.remove('is-active');
  showError(el.error, '');
  el.status.textContent = '';
  syncMode();
});
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('f-type').addEventListener('change', syncMode);
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastSummary); el.status.textContent = 'Özet panoya kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
});
// Genişlik değişince (ör. ekran döndürme) grafiği yeniden çiz.
window.addEventListener('resize', () => { if (lastDraw && el.result.classList.contains('is-active')) drawChart($('chart'), lastDraw.snaps, lastDraw.showNet); });
syncMode();
