// Enflasyon ve Alım Gücü Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Oranları kullanıcı girer; araç hiçbir TÜFE verisi saklamaz ve ağ isteği yapmaz.
// Yalnızca matematiksel hesaptır; yatırım/finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Türkçe sayı biçimi ---------- */
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir; baştaki eksi işaretine izin verir. Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  let neg = false;
  if (t.startsWith('-')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if (!/^\d*\.?\d+$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

/* ---------- Hesap çekirdeği (saf fonksiyonlar) ---------- */

/** Yıllık oranlar listesinden (yüzde) kümülatif çarpan. */
export function cumulativeFactor(ratesPct) {
  return ratesPct.reduce((acc, r) => acc * (1 + r / 100), 1);
}

/** Fisher ilişkisi: reel getiri yüzdesi = ((1 + nominal) / (1 + enflasyon) − 1) × 100. */
export function realReturn(nominalPct, inflationPct) {
  return ((1 + nominalPct / 100) / (1 + inflationPct / 100) - 1) * 100;
}

/** Yıl noktaları: 0, 1, 2 … floor(n) ve kesirliyse n. */
function yearPoints(n) {
  const pts = [];
  for (let k = 0; k <= Math.floor(n + 1e-9); k++) pts.push(k);
  if (n - Math.floor(n + 1e-9) > 1e-9) pts.push(n);
  return pts;
}

/* ---------- Okuma yardımcıları (Türkçe hata mesajlarıyla) ---------- */

function readAmount(id, name) {
  const v = parseNum($(id).value);
  if (!(v > 0)) throw new Error(`${name} geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 10.000).`);
  return v;
}

function readRate(id, name) {
  const v = parseNum($(id).value);
  if (!(v > -100 && v <= 100000)) throw new Error(`${name} geçersiz. Yüzde olarak, rakamla yazın (örnek: 45 ya da 42,5); ondalık için virgül kullanın.`);
  return v;
}

function readYears(id, name) {
  const txt = $(id).value.trim();
  if (!txt) return 1;
  const v = parseNum(txt);
  if (!(v > 0 && v <= 100)) throw new Error(`${name} geçersiz. 0'dan büyük, en fazla 100 olan bir yıl sayısı yazın (örnek: 3 ya da 2,5).`);
  return v;
}

/** Boşluk, satır sonu ya da noktalı virgülle ayrılmış yüzde listesini okur. */
export function parseRateList(text) {
  const parts = String(text || '').split(/[\s;]+/).filter(Boolean);
  if (!parts.length) throw new Error('Yıllık enflasyon oranlarını yazın. Her yılı yeni satıra ya da noktalı virgülle ayırarak girin (örnek: 64,77; 44,38).');
  if (parts.length > 100) throw new Error('En fazla 100 yıllık oran girebilirsiniz.');
  return parts.map((p, i) => {
    const v = parseNum(p);
    if (!(v > -100 && v <= 100000)) throw new Error(`${i + 1}. oran ("${p}") geçersiz. Yalnızca rakam yazın, ondalık için virgül kullanın; yıllar arasına noktalı virgül ya da satır sonu koyun.`);
    return v;
  });
}

/* ---------- Grafik ---------- */

/** Tuval üzerine çok çizgili basit grafik çizer. series: [{color, dash, values}], labels: x etiketleri. */
function drawChart(canvas, labels, series, ariaText) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 320, h = canvas.clientHeight || 220;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const padL = 58, padR = 12, padT = 12, padB = 26;
  const all = series.flatMap((s) => s.values);
  const maxY = Math.max(...all, 1e-9);
  const minY = Math.min(0, ...all);
  const n = labels.length;
  const X = (i) => padL + (n > 1 ? (i / (n - 1)) : 0.5) * (w - padL - padR);
  const Y = (v) => h - padB - ((v - minY) / (maxY - minY || 1)) * (h - padT - padB);
  ctx.font = '11px sans-serif'; ctx.fillStyle = '#4a4a4a'; ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 1;
  const compact = new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 });
  for (let i = 0; i <= 4; i++) {
    const v = minY + ((maxY - minY) * i) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    ctx.textAlign = 'right'; ctx.fillText(compact.format(v), padL - 6, y + 4);
  }
  ctx.textAlign = 'left'; ctx.fillText(labels[0], padL, h - 8);
  if (n > 1) { ctx.textAlign = 'right'; ctx.fillText(labels[n - 1], w - padR, h - 8); }
  series.forEach((s) => {
    ctx.beginPath(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.2; ctx.setLineDash(s.dash || []);
    s.values.forEach((v, i) => { const x = X(i), y = Y(v); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = s.color;
    s.values.forEach((v, i) => { if (n <= 40) { ctx.beginPath(); ctx.arc(X(i), Y(v), 2.6, 0, Math.PI * 2); ctx.fill(); } });
  });
  canvas.dataset.ready = '1';
  canvas.setAttribute('aria-label', ariaText);
}

/* ---------- Arayüz ---------- */
const el = { form: $('form'), error: $('error'), result: $('result'), status: $('copy-status') };
let lastSummary = '';
let lastDraw = null;

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const mode = currentMode();
  ['gecmis', 'gelecek', 'reel', 'maas'].forEach((m) => { $(`g-${m}`).hidden = m !== mode; });
  $('g-list').hidden = mode !== 'gecmis' || $('p-method').value !== 'yillik';
  $('g-cum').hidden = mode !== 'gecmis' || $('p-method').value !== 'kumulatif';
  $('calc').textContent = { gecmis: 'Bugünkü değeri hesapla', gelecek: 'Gelecek fiyatı hesapla', reel: 'Reel getiriyi hesapla', maas: 'Alım gücünü hesapla' }[mode];
}

/** Sonuç bloğunu doldurur. rows: [[etiket, değer], ...]; table: {head: [...], body: [[...]]}. */
function render({ headline, rows, table, labels, series, legend, aria, note }) {
  $('r-head').textContent = headline;
  $('r-rows').innerHTML = rows.map(([k, v]) => `<div class="en-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('r-note').textContent = note || '';
  $('plan-head').innerHTML = `<tr>${table.head.map((h, i) => `<th scope="col"${i === 0 ? '' : ''}>${h}</th>`).join('')}</tr>`;
  $('plan-body').innerHTML = table.body.map((r) => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  $('r-legend').textContent = legend;
  el.result.classList.add('is-active');
  lastDraw = { labels, series, aria };
  drawChart($('chart'), labels, series, aria);
  lastSummary = `${headline}\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n(Matematiksel hesaptır; yatırım tavsiyesi değildir.)`;
}

const BORDO = '#7b2331', GRI = '#6b6b6b';

function calcGecmis() {
  const amount = readAmount('p-amount', 'Geçmişteki tutar');
  let factor, tableBody = [], labels, values;
  if ($('p-method').value === 'yillik') {
    const rates = parseRateList($('p-rates').value);
    let acc = 1;
    labels = ['Başlangıç']; values = [amount];
    rates.forEach((r, i) => {
      acc *= 1 + r / 100;
      tableBody.push([`${i + 1}. yıl`, pct(r), pct((acc - 1) * 100), money.format(amount * acc)]);
      labels.push(`${i + 1}. yıl`); values.push(amount * acc);
    });
    factor = acc;
  } else {
    const c = parseNum($('p-cum').value);
    if (!(c > -100 && c <= 10000000)) throw new Error('Kümülatif enflasyon oranı geçersiz. Yüzde olarak, rakamla yazın (örnek: 50 ya da 1.250,5).');
    factor = 1 + c / 100;
    labels = ['Başlangıç', 'Bugün']; values = [amount, amount * factor];
    tableBody.push(['Toplam dönem', pct(c), pct(c), money.format(amount * factor)]);
  }
  const today = amount * factor;
  const back = amount / factor;
  render({
    headline: `Bugünkü karşılığı: ${fmt(today)}`,
    rows: [
      ['Geçmişteki tutar', fmt(amount)],
      ['Kümülatif enflasyon', pct((factor - 1) * 100)],
      ['Aynı alım gücü için bugün gereken tutar', fmt(today)],
      ['Bugünkü tutarın (aynı rakam) başlangıçtaki alım gücü karşılığı', fmt(back)],
      ['Alım gücü değişimi', factor === 1 ? '%0' : pct((1 / factor - 1) * 100)],
    ],
    table: { head: ['Dönem', 'Yıllık oran', 'Kümülatif artış', 'Karşılığı (TL)'], body: tableBody },
    labels, series: [{ color: BORDO, values }],
    legend: 'Bordo çizgi, başlangıç tutarının aynı alım gücünü korumak için her yıl ulaşması gereken değeri gösterir.',
    aria: `Çizgi grafik: ${fmt(amount)} tutarın bugünkü karşılığı ${fmt(today)}.`,
    note: 'Sonuç, girdiğiniz oranlarla hesaplanır; oranların doğruluğu sizin sorumluluğunuzdadır.',
  });
}

function calcGelecek() {
  const price = readAmount('f-price', 'Güncel fiyat');
  const r = readRate('f-rate', 'Yıllık enflasyon oranı');
  const years = readYears('f-years', 'Süre');
  const pts = yearPoints(years);
  const values = pts.map((t) => price * Math.pow(1 + r / 100, t));
  const fut = values[values.length - 1];
  const yl = (t) => (t === 0 ? 'Bugün' : Number.isInteger(t) ? `${t}. yıl` : `${new Intl.NumberFormat('tr-TR').format(t)} yıl`);
  render({
    headline: `${new Intl.NumberFormat('tr-TR').format(years)} yıl sonraki fiyat: ${fmt(fut)}`,
    rows: [
      ['Güncel fiyat', fmt(price)],
      ['Yıllık enflasyon varsayımı', pct(r)],
      ['Toplam fiyat artışı', pct((fut / price - 1) * 100)],
      ['Bugünkü paranın o günkü alım gücü', fmt(price * price / fut)],
    ],
    table: { head: ['Yıl', 'Fiyat (TL)', 'Yıllık artış (TL)'], body: pts.map((t, i) => [yl(t), money.format(values[i]), i ? money.format(values[i] - values[i - 1]) : '–']) },
    labels: pts.map(yl), series: [{ color: BORDO, values }],
    legend: 'Bordo çizgi, oran sabit kalırsa fiyatın yıllara göre seyrini gösterir.',
    aria: `Çizgi grafik: ${fmt(price)} fiyat ${new Intl.NumberFormat('tr-TR').format(years)} yılda ${fmt(fut)} olur.`,
    note: 'Oranın sabit kaldığı varsayılır; gerçekte enflasyon yıldan yıla değişir.',
  });
}

function calcReel() {
  const nom = readRate('r-nominal', 'Nominal getiri oranı');
  const inf = readRate('r-infl', 'Enflasyon oranı');
  const years = readYears('r-years', 'Süre');
  const baseTxt = $('r-amount').value.trim();
  const base = baseTxt ? readAmount('r-amount', 'Anapara') : 100;
  const real = realReturn(nom, inf);
  const pts = yearPoints(years);
  const nomVals = pts.map((t) => base * Math.pow(1 + nom / 100, t));
  const realVals = pts.map((t) => base * Math.pow((1 + nom / 100) / (1 + inf / 100), t));
  const unit = baseTxt ? 'TL' : 'endeks';
  const f = (v) => (baseTxt ? fmt(v) : money.format(v));
  const yl = (t) => (t === 0 ? 'Başlangıç' : Number.isInteger(t) ? `${t}. yıl` : `${new Intl.NumberFormat('tr-TR').format(t)} yıl`);
  render({
    headline: `Reel getiri (yıllık): ${pct(real)}`,
    rows: [
      ['Nominal getiri (yıllık)', pct(nom)],
      ['Enflasyon (yıllık)', pct(inf)],
      ['Reel getiri (yıllık)', pct(real)],
      ['Basit fark (nominal − enflasyon)', pct(nom - inf)],
      [`Süre sonunda nominal değer (${unit})`, f(nomVals[nomVals.length - 1])],
      [`Süre sonunda reel değer (başlangıç parasıyla, ${unit})`, f(realVals[realVals.length - 1])],
    ],
    table: { head: ['Yıl', `Nominal (${unit})`, `Reel (${unit})`], body: pts.map((t, i) => [yl(t), money.format(nomVals[i]), money.format(realVals[i])]) },
    labels: pts.map(yl), series: [{ color: GRI, dash: [6, 4], values: nomVals }, { color: BORDO, values: realVals }],
    legend: 'Kesikli gri çizgi nominal değeri, bordo çizgi enflasyondan arındırılmış reel değeri gösterir.',
    aria: `Çizgi grafik: yıllık reel getiri ${pct(real)}; süre sonunda nominal ${f(nomVals[nomVals.length - 1])}, reel ${f(realVals[realVals.length - 1])}.`,
    note: baseTxt ? 'Reel değer, başlangıçtaki paranın alım gücüyle ifade edilir.' : 'Anapara girmediğiniz için başlangıç 100 birimlik endeks alındı.',
  });
}

function calcMaas() {
  const salary = readAmount('m-salary', 'Maaş');
  const inf = readRate('m-infl', 'Yıllık enflasyon oranı');
  const raiseTxt = $('m-raise').value.trim();
  const raise = raiseTxt ? readRate('m-raise', 'Yıllık zam oranı') : 0;
  const years = readYears('m-years', 'Süre');
  const pts = yearPoints(years);
  const needed = pts.map((t) => salary * Math.pow(1 + inf / 100, t));
  const actual = pts.map((t) => salary * Math.pow(1 + raise / 100, t));
  const k = Math.pow((1 + raise / 100) / (1 + inf / 100), years);
  const n = pts.length - 1;
  const yl = (t) => (t === 0 ? 'Bugün' : Number.isInteger(t) ? `${t}. yıl` : `${new Intl.NumberFormat('tr-TR').format(t)} yıl`);
  render({
    headline: k >= 1 ? `Alım gücü artışı: ${pct((k - 1) * 100)}` : `Alım gücü kaybı: ${pct((1 - k) * 100)}`,
    rows: [
      ['Başlangıç maaşı', fmt(salary)],
      ['Aynı alım gücü için gereken maaş', fmt(needed[n])],
      ['Zamlı maaş', fmt(actual[n])],
      ['Aradaki fark', fmt(actual[n] - needed[n])],
      ['Zamlı maaşın başlangıç parasıyla değeri', fmt(salary * k)],
    ],
    table: { head: ['Yıl', 'Gereken maaş (TL)', 'Zamlı maaş (TL)', 'Fark (TL)'], body: pts.map((t, i) => [yl(t), money.format(needed[i]), money.format(actual[i]), money.format(actual[i] - needed[i])]) },
    labels: pts.map(yl), series: [{ color: GRI, dash: [6, 4], values: needed }, { color: BORDO, values: actual }],
    legend: 'Kesikli gri çizgi alım gücünü korumak için gereken maaşı, bordo çizgi zamlı maaşı gösterir.',
    aria: `Çizgi grafik: zamlı maaş ${fmt(actual[n])}, alım gücünü korumak için gereken maaş ${fmt(needed[n])}.`,
    note: 'Enflasyon ve zam her yıl sabit varsayılır; vergi dilimi ve kesintiler hesaba katılmaz.',
  });
}

el.form.addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  el.status.textContent = '';
  try {
    ({ gecmis: calcGecmis, gelecek: calcGelecek, reel: calcReel, maas: calcMaas })[currentMode()]();
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
$('p-method').addEventListener('change', syncMode);
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastSummary); el.status.textContent = 'Özet panoya kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
});
// Genişlik değişince (ör. ekran döndürme) grafiği yeniden çiz.
window.addEventListener('resize', () => { if (lastDraw && el.result.classList.contains('is-active')) drawChart($('chart'), lastDraw.labels, lastDraw.series, lastDraw.aria); });
syncMode();
