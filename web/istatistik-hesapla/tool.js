// Ortalama, Medyan, Mod, Standart Sapma Hesaplama — tamamı tarayıcıda çalışır; veri sunucuya gitmez.
import { createDropzone, downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_VALUES = 100000;

/* ---------- Sayı biçimi ---------- */
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 4 });
const nfPct = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
/** Türkçe biçimli sayı (en çok 4 ondalık). */
export function fmt(v) {
  if (v === null || v === undefined || !Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-12 ? 0 : v;
  if (Math.abs(r) >= 1e15 || (Math.abs(r) < 1e-4 && r !== 0)) return r.toExponential(4).replace('.', ',');
  return nf.format(r);
}

/* ---------- Giriş ayrıştırma ---------- */
/** Tek bir sayı parçasını çevirir: 1.250,5 / 1250,5 / 1250.5 / -3. Geçersizse null. */
function parseOne(t) {
  if (!/^[+-]?[\d.,]+$/.test(t) || !/\d/.test(t)) return null;
  let s = t;
  const sign = s[0] === '-' ? -1 : 1;
  if (/^[+-]/.test(s)) s = s.slice(1);
  if (s.includes(',')) {
    // Virgül ondalıktır; noktalar binlik ayırıcıdır.
    if ((s.match(/,/g) || []).length > 1) return null;
    const [ip, fp] = s.split(',');
    if (ip.includes('.') && !/^\d{1,3}(\.\d{3})+$/.test(ip)) return null;
    s = `${ip.replace(/\./g, '')}.${fp}`;
  } else if (s.includes('.')) {
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    else if ((s.match(/\./g) || []).length > 1) return null;
  }
  const n = Number(s) * sign;
  return Number.isFinite(n) ? n : null;
}

/**
 * Metni sayı dizisine çevirir. Ayraç: satır sonu, boşluk, noktalı virgül, sekme.
 * Boşluksuz ve birden çok virgül içeren parça virgülle ayrılmış liste sayılır (2,4,4,5);
 * tek virgüllü parça ondalık sayıdır (2,5).
 */
export function parseList(text) {
  const out = [];
  const tokens = String(text || '').split(/[\s;]+/).filter(Boolean);
  for (let raw of tokens) {
    raw = raw.replace(/^,+|,+$/g, '');
    if (!raw) continue;
    const commas = (raw.match(/,/g) || []).length;
    const parts = commas > 1 ? raw.split(',').filter(Boolean) : [raw];
    for (const p of parts) {
      const n = parseOne(p);
      if (n === null) throw new Error(`"${p}" sayı olarak okunamadı. Yalnızca rakam, eksi işareti ve ondalık virgül kullanın; harfleri ve başlık satırını silip tekrar deneyin.`);
      out.push(n);
      if (out.length > MAX_VALUES) throw new Error(`En fazla ${MAX_VALUES.toLocaleString('tr-TR')} değer işlenebilir. Veriyi bölüp tekrar deneyin.`);
    }
  }
  return out;
}

/* ---------- İstatistik hesapları ---------- */
/** Sıralı dizide doğrusal enterpolasyonlu yüzdelik (Excel ÇEYREK.DHL / QUARTILE.INC yöntemi). */
function quantile(sorted, p) {
  const pos = (sorted.length - 1) * p;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function computeStats(values, population) {
  const n = values.length;
  const sorted = [...values].sort((a, b) => a - b);
  let sum = 0;
  for (const v of sorted) sum += v;
  const mean = sum / n;
  let ss = 0;
  for (const v of values) ss += (v - mean) ** 2;
  const df = population ? n : n - 1;
  const variance = df > 0 ? ss / df : null;
  const sd = variance === null ? null : Math.sqrt(variance);
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  // Sıklık tablosu ve mod
  const freq = new Map();
  for (const v of sorted) freq.set(v, (freq.get(v) || 0) + 1);
  let maxF = 0;
  freq.forEach((c) => { if (c > maxF) maxF = c; });
  const modes = maxF > 1 ? [...freq.entries()].filter(([, c]) => c === maxF).map(([v]) => v) : [];
  const allPos = sorted[0] > 0;
  const geo = allPos ? Math.exp(sorted.reduce((a, v) => a + Math.log(v), 0) / n) : null;
  const harm = allPos ? n / sorted.reduce((a, v) => a + 1 / v, 0) : null;
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  return { n, sorted, sum, mean, median, freq, maxF, modes, min: sorted[0], max: sorted[n - 1], range: sorted[n - 1] - sorted[0], ss, df, variance, sd, geo, harm, q1, q3, iqr: q3 - q1, population };
}

/** Terimleri kısaltarak toplam ifadesi üretir: 2 + 4 + 4 + … + 9 */
function joinTerms(arr, f = fmt, max = 6) {
  if (arr.length <= max) return arr.map(f).join(' + ');
  return `${arr.slice(0, max - 1).map(f).join(' + ')} + … + ${f(arr[arr.length - 1])}`;
}

function buildSteps(s) {
  const steps = [];
  steps.push(`Toplam = ${joinTerms(s.sorted)} = ${fmt(s.sum)} (adet n = ${s.n})`);
  steps.push(`Aritmetik ortalama = Toplam / n = ${fmt(s.sum)} / ${s.n} = ${fmt(s.mean)}`);
  if (s.n % 2) steps.push(`Medyan: ${s.n} değer tek sayıdadır; sıralı listede ${(s.n + 1) / 2}. değer = ${fmt(s.median)}`);
  else steps.push(`Medyan: ${s.n} değer çift sayıdadır; ${s.n / 2}. ve ${s.n / 2 + 1}. değerin ortalaması = (${fmt(s.sorted[s.n / 2 - 1])} + ${fmt(s.sorted[s.n / 2])}) / 2 = ${fmt(s.median)}`);
  steps.push(s.modes.length ? `Mod: en sık geçen değer ${s.modes.map(fmt).join(', ')} (${s.maxF} kez)` : 'Mod: hiçbir değer birden fazla kez geçmediği için mod yoktur.');
  if (s.variance === null) {
    steps.push('Varyans ve standart sapma: örneklem seçeneğinde en az 2 değer gerekir (n − 1 sıfır olamaz).');
  } else {
    const devs = s.sorted.map((v) => (v - s.mean) ** 2);
    const dev = s.sorted.map((v) => `(${fmt(v)} − ${fmt(s.mean)})²`);
    const head = dev.length <= 4 ? dev.join(' + ') : `${dev.slice(0, 3).join(' + ')} + … + ${dev[dev.length - 1]}`;
    steps.push(`Kareler toplamı = Σ(x − ortalama)² = ${head} = ${fmt(devs.reduce((a, b) => a + b, 0))}`);
    steps.push(`Varyans (${s.population ? 'anakütle, n' : 'örneklem, n − 1'}) = ${fmt(s.ss)} / ${s.df} = ${fmt(s.variance)}`);
    steps.push(`Standart sapma = √varyans = √${fmt(s.variance)} = ${fmt(s.sd)}`);
  }
  steps.push(`Çeyrekler (doğrusal enterpolasyon): Q1 = ${fmt(s.q1)}, Q3 = ${fmt(s.q3)}, IQR = Q3 − Q1 = ${fmt(s.iqr)}`);
  steps.push(`Açıklık = en büyük − en küçük = ${fmt(s.max)} − ${fmt(s.min)} = ${fmt(s.range)}`);
  return steps;
}

/* ---------- Görünüm ---------- */
let current = null;
let lastZ = null;

function rowsOf(s) {
  const rows = [
    ['n', 'Adet (n)', fmt(s.n)],
    ['sum', 'Toplam', fmt(s.sum)],
    ['mean', 'Aritmetik ortalama', fmt(s.mean)],
    ['median', 'Medyan', fmt(s.median)],
    ['mode', 'Mod', s.modes.length ? s.modes.slice(0, 10).map(fmt).join(', ') + (s.modes.length > 10 ? ' …' : '') : 'Yok (tüm değerler tek)'],
    ['range', 'Açıklık (aralık)', fmt(s.range)],
    ['variance', `Varyans (${s.population ? 'anakütle' : 'örneklem'})`, fmt(s.variance)],
    ['sd', `Standart sapma (${s.population ? 'anakütle' : 'örneklem'})`, fmt(s.sd)],
    ['q1', 'Birinci çeyrek (Q1)', fmt(s.q1)],
    ['q3', 'Üçüncü çeyrek (Q3)', fmt(s.q3)],
    ['iqr', 'Çeyrekler açıklığı (IQR)', fmt(s.iqr)],
    ['min', 'En küçük', fmt(s.min)],
    ['max', 'En büyük', fmt(s.max)],
    ['geo', 'Geometrik ortalama', s.geo === null ? 'Tanımsız (pozitif değer gerekir)' : fmt(s.geo)],
    ['harm', 'Harmonik ortalama', s.harm === null ? 'Tanımsız (pozitif değer gerekir)' : fmt(s.harm)],
  ];
  if (lastZ !== null) rows.push(['z', `z-skoru (x = ${fmt(lastZ.x)})`, lastZ.z === null ? 'Hesaplanamadı (standart sapma 0 ya da yok)' : fmt(lastZ.z)]);
  return rows;
}

function renderRows(s) {
  const dl = $('r-rows');
  dl.textContent = '';
  for (const [key, label, val] of rowsOf(s)) {
    const row = document.createElement('div');
    row.className = 'st-row' + (key === 'mean' || key === 'sd' ? ' is-strong' : '');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.id = `r-${key}`; dd.textContent = val;
    row.append(dt, dd);
    dl.append(row);
  }
}

function renderSorted(s) {
  const LIM = 500;
  const list = s.sorted.slice(0, LIM).map(fmt).join(' · ');
  $('sorted').textContent = list + (s.n > LIM ? ` … (ilk ${LIM} değer gösteriliyor, toplam ${s.n})` : '');
}

function buildBins(s) {
  if (s.range === 0) return [{ lo: s.min, hi: s.max, count: s.n }];
  const k = Math.min(20, Math.max(3, Math.ceil(Math.log2(s.n)) + 1));
  const w = s.range / k;
  const bins = Array.from({ length: k }, (_, i) => ({ lo: s.min + i * w, hi: s.min + (i + 1) * w, count: 0 }));
  for (const v of s.sorted) bins[Math.min(k - 1, Math.floor((v - s.min) / w))].count++;
  return bins;
}

function renderFreq(s, bins) {
  const body = $('freq-body');
  body.textContent = '';
  const useBins = s.freq.size > 40;
  $('freq-note').textContent = useBins ? 'Çok sayıda farklı değer olduğu için sınıf aralıkları gösteriliyor (son aralığın üst sınırı dahildir).' : '';
  $('freq-head').textContent = useBins ? 'Sınıf aralığı' : 'Değer';
  const items = useBins ? bins.map((b, i) => [`${fmt(b.lo)} – ${fmt(b.hi)}${i === bins.length - 1 ? ' ]' : ' )'}`, b.count]) : [...s.freq.entries()].map(([v, c]) => [fmt(v), c]);
  let cum = 0;
  for (const [label, c] of items) {
    cum += c;
    const tr = document.createElement('tr');
    for (const t of [label, String(c), `%${nfPct.format((c / s.n) * 100)}`, `%${nfPct.format((cum / s.n) * 100)}`]) {
      const td = document.createElement('td'); td.textContent = t; tr.append(td);
    }
    body.append(tr);
  }
}

function drawHistogram(bins) {
  const cv = $('hist');
  const dpr = window.devicePixelRatio || 1;
  const cssW = Math.max(280, Math.min(cv.parentElement.clientWidth || 600, 760));
  const cssH = 240;
  cv.width = cssW * dpr; cv.height = cssH * dpr;
  cv.style.width = `${cssW}px`; cv.style.height = `${cssH}px`;
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  const padL = 36, padB = 40, padT = 12, padR = 8;
  const maxC = Math.max(...bins.map((b) => b.count));
  const plotW = cssW - padL - padR, plotH = cssH - padT - padB;
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#444'; ctx.strokeStyle = '#999'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
  ctx.textAlign = 'right';
  ctx.fillText('0', padL - 4, padT + plotH + 4);
  ctx.fillText(String(maxC), padL - 4, padT + 8);
  const bw = plotW / bins.length;
  bins.forEach((b, i) => {
    const h = (b.count / maxC) * plotH;
    ctx.fillStyle = '#7b2331';
    ctx.fillRect(padL + i * bw + 1, padT + plotH - h, Math.max(1, bw - 2), h);
    if (b.count) { ctx.fillStyle = '#222'; ctx.textAlign = 'center'; ctx.fillText(String(b.count), padL + i * bw + bw / 2, padT + plotH - h - 3); }
  });
  ctx.fillStyle = '#444'; ctx.textAlign = 'center';
  const step = Math.ceil(bins.length / Math.max(1, Math.floor(plotW / 60)));
  bins.forEach((b, i) => { if (i % step === 0) ctx.fillText(fmt(b.lo), padL + i * bw, padT + plotH + 14); });
  ctx.fillText(fmt(bins[bins.length - 1].hi), padL + plotW, padT + plotH + 28);
  cv.setAttribute('aria-label', `Histogram: ${bins.length} sınıf, en yüksek sütun ${maxC} değer içeriyor. Ayrıntılar aşağıdaki sıklık tablosundadır.`);
}

function textSummary() {
  return rowsOf(current).map(([, l, v]) => `${l}: ${v}`).join('\n');
}

function csvSummary() {
  const s = current;
  const lines = ['Ölçüt;Değer', ...rowsOf(s).map(([, l, v]) => `${l};${v}`), '', 'Değer;Sıklık'];
  s.freq.forEach((c, v) => lines.push(`${fmt(v)};${c}`));
  return lines.join('\r\n');
}

/* ---------- Ana akış ---------- */
function hideResult() { current = null; $('result').classList.remove('is-active'); }

function update() {
  showError($('error'), '');
  let values;
  try { values = parseList($('data').value); } catch (e) { hideResult(); showError($('error'), e.message); return; }
  if (!values.length) { hideResult(); return; }
  // z-skoru girdisi
  lastZ = null;
  const zRaw = $('zx').value.trim();
  const s = computeStats(values, $('kind').value === 'pop');
  if (zRaw) {
    const x = parseOne(zRaw.replace(/\s/g, ''));
    if (x === null) showError($('error'), 'z-skoru için girilen değer okunamadı. Örnek: 7 ya da 7,5 yazın.');
    else lastZ = { x, z: s.sd ? (x - s.mean) / s.sd : null };
  }
  current = s;
  $('result').classList.add('is-active');
  renderRows(s);
  const steps = $('steps'); steps.textContent = '';
  for (const t of buildSteps(s)) { const li = document.createElement('li'); li.textContent = t; steps.append(li); }
  if (lastZ && lastZ.z !== null) {
    const li = document.createElement('li');
    li.textContent = `z-skoru = (x − ortalama) / standart sapma = (${fmt(lastZ.x)} − ${fmt(s.mean)}) / ${fmt(s.sd)} = ${fmt(lastZ.z)}`;
    steps.append(li);
  }
  renderSorted(s);
  const bins = buildBins(s);
  renderFreq(s, bins);
  drawHistogram(bins);
}

function setup() {
  createDropzone({
    el: $('drop'), accept: '.csv,.txt,.tsv,text/plain,text/csv', multiple: false,
    onFiles: async ([file]) => {
      showError($('error'), '');
      if (file.size > 20 * 1024 * 1024) { showError($('error'), 'Dosya 20 MB’tan büyük. Veriyi küçültüp tekrar deneyin.'); return; }
      $('warn-big').hidden = file.size <= 5 * 1024 * 1024;
      let text = await file.text();
      try { parseList(text); } catch {
        // İlk satır başlık olabilir; atlayıp yeniden dene.
        const rest = text.split(/\r?\n/).slice(1).join('\n');
        try { parseList(rest); text = rest; } catch { /* update() asıl hatayı gösterir */ }
      }
      $('data').value = text.trim();
      $('file-info').textContent = `${file.name} okundu (yalnızca bu tarayıcıda işlendi).`;
      update();
    },
  });
  ['data', 'zx'].forEach((id) => $(id).addEventListener('input', update));
  $('kind').addEventListener('change', update);
  $('example').addEventListener('click', () => { $('data').value = '2, 4, 4, 4, 5, 5, 7, 9'; update(); });
  $('clear').addEventListener('click', () => { $('data').value = ''; $('zx').value = ''; $('file-info').textContent = ''; update(); });
  $('copy').addEventListener('click', async () => {
    if (!current) return;
    try { await navigator.clipboard.writeText(textSummary()); $('copy-status').textContent = 'Sonuçlar panoya kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonuçları elle seçip kopyalayın.'; }
  });
  $('csv').addEventListener('click', () => {
    if (!current) return;
    downloadBlob(new Blob(['﻿', csvSummary()], { type: 'text/csv;charset=utf-8' }), 'istatistik-sonuclari.csv');
  });
  window.addEventListener('resize', () => { if (current) drawHistogram(buildBins(current)); });
}

setup();
