// Birikim (tasarruf) Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; yatırım/finansal tavsiye değildir, getiri garantisi yoktur.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Türkçe sayı biçimi ---------- */
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pctFmt = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

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
 * Ay ay birikim simülasyonu. Her ayın sonunda bakiye önce aylık oranla büyür, sonra katkı eklenir:
 * bakiye = bakiye × (1 + yıllık/12) + katkı.
 * start: başlangıç tutarı, dep: aylık katkı, rate: yıllık getiri (kesir), months: toplam ay,
 * infl: yıllık enflasyon (kesir). Dönüş: yıl sonları ve son ay için satırlar.
 */
export function simulate({ start, dep, rate, months, infl }) {
  const r = rate / 12;
  let balance = start;
  let invested = start;
  const rows = [];
  for (let k = 1; k <= months; k++) {
    balance = balance * (1 + r) + dep;
    invested += dep;
    if (k % 12 === 0 || k === months) {
      rows.push({
        k, invested, gain: balance - invested, balance,
        real: balance / Math.pow(1 + infl, k / 12),
      });
    }
  }
  const last = rows[rows.length - 1];
  return { rows, invested: last.invested, gain: last.gain, balance: last.balance, real: last.real, months };
}

/**
 * Hedef tutar için gereken aylık katkı.
 * aylık = (hedef − başlangıç × (1+i)^n) × i / ((1+i)^n − 1); i = 0 ise (hedef − başlangıç) / n.
 * Başlangıç tutarı zaten hedefi aşıyorsa 0 ya da negatif çıkar (çağıran taraf kontrol eder).
 */
export function monthlyNeeded({ target, start, rate, months }) {
  const i = rate / 12;
  if (!(i > 0)) return (target - start) / months;
  const g = Math.pow(1 + i, months);
  return (target - start * g) * i / (g - 1);
}

/** Ay sayısını tablo etiketine çevirir: 6. ay, 3. yıl, 2 yıl 6 ay. */
function periodLabel(k) {
  if (k % 12 === 0) return `${k / 12}. yıl`;
  if (k < 12) return `${k}. ay`;
  return `${Math.floor(k / 12)} yıl ${k % 12} ay`;
}

function termText(months) {
  const y = Math.floor(months / 12), z = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yıl`);
  if (z) parts.push(`${z} ay`);
  return parts.join(' ') || '0 ay';
}

/** Tuval üzerine yığılmış sütun grafik çizer (yatırılan + getiri). */
function drawChart(canvas, rows) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 320, h = canvas.clientHeight || 220;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const padL = 52, padR = 8, padT = 12, padB = 26;
  const maxY = Math.max(...rows.map((p) => Math.max(p.balance, p.invested))) || 1;
  const Y = (v) => h - padB - (v / maxY) * (h - padT - padB);
  ctx.font = '11px sans-serif'; ctx.fillStyle = '#4a4a4a'; ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = (maxY * i) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(v), padL - 6, y + 4);
  }
  const slot = (w - padL - padR) / rows.length;
  const barW = Math.max(2, Math.min(36, slot * 0.7));
  rows.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const yInv = Y(p.invested), yTop = Y(Math.max(p.balance, p.invested));
    ctx.fillStyle = '#8a8a8a';
    ctx.fillRect(x, yInv, barW, h - padB - yInv);
    ctx.fillStyle = '#7b2331';
    ctx.fillRect(x, yTop, barW, yInv - yTop);
  });
  ctx.fillStyle = '#4a4a4a'; ctx.textAlign = 'left';
  ctx.fillText(periodLabel(rows[0].k), padL, h - 8);
  ctx.textAlign = 'right';
  ctx.fillText(periodLabel(rows[rows.length - 1].k), w - padR, h - 8);
  canvas.dataset.ready = '1';
  const last = rows[rows.length - 1];
  canvas.setAttribute('aria-label', `Sütun grafik: süre sonunda yatırılan ${fmt(last.invested)}, getiri ${fmt(last.gain)}, bakiye ${fmt(last.balance)}.`);
}

/* ---------- Arayüz ---------- */
const el = { form: $('form'), error: $('error'), result: $('result'), status: $('copy-status') };
let lastSummary = '';
let lastRows = null;

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const mode = currentMode();
  $('g-monthly').hidden = mode === 'hedef';
  $('g-target').hidden = mode === 'birikim';
  $('calc').textContent = mode === 'birikim' ? 'Birikimi hesapla' : 'Aylık tutarı hesapla';
}

/** Boş bırakılabilen sayı alanı: boşsa varsayılan, doluysa sayı; geçersizse hata fırlatır. */
function readOptional(id, fallback, msg, min, max) {
  const txt = $(id).value.trim();
  if (!txt) return fallback;
  const v = parseNum(txt);
  if (!(v >= min && v <= max)) throw new Error(msg);
  return v;
}

function readTerm() {
  const v = parseNum($('b-term').value);
  if (!(v > 0)) throw new Error('Süre geçersiz ya da boş. Sıfırdan büyük bir sayı yazın ve yıl ya da ay birimini seçin (örnek: 5 yıl).');
  const months = Math.round($('b-unit').value === 'ay' ? v : v * 12);
  if (months < 1) throw new Error('Süre en az 1 ay olmalı. Daha uzun bir süre yazın.');
  if (months > 600) throw new Error('Süre çok uzun. En fazla 50 yıl (600 ay) girin.');
  return months;
}

function readCommon() {
  const start = readOptional('b-start', 0, 'Başlangıç tutarı geçersiz. 0 ya da daha büyük bir tutarı rakamla yazın (örnek: 5.000) ya da alanı boş bırakın.', 0, 1e12);
  const rate = readOptional('b-rate', 0, 'Getiri oranı geçersiz. Yıllık oranı yüzde olarak 0 ile 1000 arasında yazın (örnek: 12 ya da 12,5) ya da alanı boş bırakın.', 0, 1000) / 100;
  const inflTxt = $('b-infl').value.trim();
  const infl = readOptional('b-infl', 0, 'Enflasyon oranı geçersiz. Yıllık oranı yüzde olarak 0 ile 1000 arasında yazın (örnek: 30) ya da alanı boş bırakın.', 0, 1000) / 100;
  return { start, rate, infl, hasInfl: inflTxt !== '' && infl > 0, months: readTerm() };
}

function render({ res, mode, c, need, target }) {
  const head = mode === 'hedef'
    ? `Aylık ayırmanız gereken tutar: ${fmt(need)}`
    : `Süre sonunda bakiye: ${fmt(res.balance)}`;
  $('r-head').textContent = head;
  $('row-need').hidden = mode !== 'hedef';
  if (mode === 'hedef') $('r-need').textContent = fmt(need);
  $('r-invested').textContent = fmt(res.invested);
  $('r-gain').textContent = c.rate > 0 ? fmt(res.gain) : 'Getiri girilmedi';
  $('r-balance').textContent = fmt(res.balance);
  $('row-real').hidden = !c.hasInfl;
  $('th-real').hidden = !c.hasInfl;
  if (c.hasInfl) {
    $('dt-real').textContent = `Bugünkü alım gücüyle değer (enflasyon ${pctFmt(c.infl * 100)})`;
    $('r-real').textContent = fmt(res.real);
  }
  $('r-note').textContent = mode === 'hedef'
    ? `${termText(c.months)} boyunca her ay sonunda bu tutarı ayırırsanız${c.rate > 0 ? ` yıllık ${pctFmt(c.rate * 100)} getiriyle` : ' (getirisiz)'} ${fmt(target)} hedefine ulaşırsınız.`
    : `${termText(c.months)} boyunca her ay sonunda katkı yapıldığı${c.rate > 0 ? ` ve yıllık ${pctFmt(c.rate * 100)} getiri sağlandığı` : ' (getirisiz)'} varsayılmıştır.`;
  $('plan-body').innerHTML = res.rows.map((s) =>
    `<tr><th scope="row">${periodLabel(s.k)}</th><td>${money.format(s.invested)}</td><td>${money.format(s.gain)}</td><td>${money.format(s.balance)}</td>${c.hasInfl ? `<td>${money.format(s.real)}</td>` : ''}</tr>`).join('');
  el.result.classList.add('is-active');
  lastRows = res.rows;
  drawChart($('chart'), res.rows);
  const lines = [
    head,
    `Süre: ${termText(c.months)}`,
    `Toplam yatırılan: ${fmt(res.invested)}`,
    `Toplam getiri: ${fmt(res.gain)}`,
    `Süre sonu bakiye: ${fmt(res.balance)}`,
  ];
  if (c.hasInfl) lines.push(`Bugünkü alım gücüyle değer: ${fmt(res.real)}`);
  lines.push('(Matematiksel hesaptır; yatırım tavsiyesi değildir, getiri garantisi yoktur.)');
  lastSummary = lines.join('\n');
}

el.form.addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  el.status.textContent = '';
  try {
    const mode = currentMode();
    const c = readCommon();
    if (mode === 'birikim') {
      const dep = readOptional('b-monthly', 0, 'Aylık katkı geçersiz. 0 ya da daha büyük bir tutarı rakamla yazın (örnek: 1.000).', 0, 1e12);
      if (!(dep > 0) && !(c.start > 0)) throw new Error('Başlangıç tutarı ve aylık katkı sıfır. En az birine sıfırdan büyük bir tutar yazın (örnek: aylık 1.000).');
      const res = simulate({ start: c.start, dep, rate: c.rate, months: c.months, infl: c.infl });
      render({ res, mode, c });
    } else {
      const target = parseNum($('b-target').value);
      if (!(target > 0)) throw new Error('Hedef tutar geçersiz ya da boş. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 100.000).');
      const grown = c.start * Math.pow(1 + c.rate / 12, c.months);
      if (grown >= target) throw new Error('Başlangıç tutarınız bu sürede zaten hedefe ulaşıyor; aylık katkı gerekmiyor. Hedefi yükseltin ya da süreyi kısaltın.');
      const need = monthlyNeeded({ target, start: c.start, rate: c.rate, months: c.months });
      const res = simulate({ start: c.start, dep: need, rate: c.rate, months: c.months, infl: c.infl });
      render({ res, mode, c, need, target });
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
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastSummary); el.status.textContent = 'Özet panoya kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
});
// Genişlik değişince (ör. ekran döndürme) grafiği yeniden çiz.
window.addEventListener('resize', () => { if (lastRows && el.result.classList.contains('is-active')) drawChart($('chart'), lastRows); });
syncMode();
