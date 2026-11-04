// Ortalama Hesaplama — aritmetik, geometrik, harmonik, kareli ve ağırlıklı ortalama; tamamı tarayıcıda çalışır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 6 });

/**
 * Metindeki sayıları ayıklar. Ayraç: boşluk, satır sonu, noktalı virgül, sekme.
 * Virgül ondalık ayracıdır ("3,5"); binlik ayracı beklenmez. Geçersiz parça varsa bad dizisinde döner.
 */
export function parseNumbers(text) {
  const parts = String(text ?? '').split(/[\s;]+/).filter(Boolean);
  const values = [];
  const bad = [];
  for (const p of parts) {
    const n = /^[-+]?\d*[.,]?\d+$/.test(p) || /^[-+]?\d+[.,]$/.test(p) ? Number(p.replace(',', '.')) : NaN;
    if (Number.isFinite(n)) values.push(n); else bad.push(p);
  }
  return { values, bad };
}

export function median(v) {
  const s = [...v].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Tüm ortalamaları hesaplar; weights verilirse ağırlıklı ortalama da eklenir. */
export function compute(values, weights) {
  if (values.length < 2) throw new Error('En az iki sayı girin. Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın (örn. 70 85 90).');
  const n = values.length;
  const sum = values.reduce((a, b) => a + b, 0);
  const r = { n, sum, min: Math.min(...values), max: Math.max(...values), mean: sum / n, median: median(values) };
  r.quadratic = Math.sqrt(values.reduce((a, b) => a + b * b, 0) / n);
  r.geometric = values.every((x) => x > 0) ? Math.exp(values.reduce((a, b) => a + Math.log(b), 0) / n) : null;
  r.harmonic = values.every((x) => x > 0) ? n / values.reduce((a, b) => a + 1 / b, 0) : null;
  if (weights) {
    if (weights.length !== n) throw new Error(`Ağırlık sayısı (${weights.length}) sayı adedine (${n}) eşit olmalı. Her sayıya bir ağırlık yazın ya da ağırlık alanını boşaltın.`);
    if (weights.some((w) => w < 0)) throw new Error('Ağırlıklar negatif olamaz. Kredi ya da saat gibi pozitif değerler girin.');
    const wsum = weights.reduce((a, b) => a + b, 0);
    if (wsum === 0) throw new Error('Ağırlıkların toplamı sıfır olamaz. En az bir ağırlık sıfırdan büyük olmalı.');
    r.weighted = values.reduce((a, b, i) => a + b * weights[i], 0) / wsum;
    r.wsum = wsum;
  }
  return r;
}

const fmt = (x) => (x === null ? 'Hesaplanamaz (pozitif sayılar gerekir)' : nf.format(x));
let last = null;

function run() {
  showError($('error'), '');
  try {
    const a = parseNumbers($('values').value);
    if (a.bad.length) throw new Error(`"${a.bad.slice(0, 3).join('", "')}" sayı olarak okunamadı. Yalnızca rakam, virgül/nokta ve eksi işareti kullanın.`);
    let weights = null;
    if ($('weights').value.trim()) {
      const w = parseNumbers($('weights').value);
      if (w.bad.length) throw new Error(`Ağırlık alanında "${w.bad[0]}" okunamadı. Yalnızca sayı yazın.`);
      weights = w.values;
    }
    last = compute(a.values, weights);
    $('r-mean').textContent = fmt(last.mean);
    $('r-n').textContent = String(last.n);
    $('r-sum').textContent = fmt(last.sum);
    $('r-median').textContent = fmt(last.median);
    $('r-geo').textContent = fmt(last.geometric);
    $('r-har').textContent = fmt(last.harmonic);
    $('r-quad').textContent = fmt(last.quadratic);
    $('r-minmax').textContent = `${fmt(last.min)} / ${fmt(last.max)}`;
    $('row-w').hidden = last.weighted === undefined;
    if (last.weighted !== undefined) $('r-weighted').textContent = fmt(last.weighted);
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('values').value = ''; $('weights').value = ''; $('result').hidden = true; $('result').classList.remove('is-active');
  last = null; showError($('error'), ''); $('values').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const t = `Aritmetik ortalama: ${fmt(last.mean)} (${last.n} sayı, toplam ${fmt(last.sum)}). Medyan: ${fmt(last.median)}.` + (last.weighted !== undefined ? ` Ağırlıklı ortalama: ${fmt(last.weighted)}.` : '');
  try { await navigator.clipboard.writeText(t); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
