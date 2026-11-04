import { downloadBlob, showError } from '../assets/js/ba.js';

// Online kronometre: performance.now tabanlı (setInterval yalnızca çizim içindir),
// tur kaydı, en hızlı/en yavaş analizi, CSV/metin dışa aktarma, tam ekran.
// Hiçbir veri kaydedilmez ve gönderilmez.

const $ = (id) => document.getElementById(id);
const baseTitle = document.title;
const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0');

/* ---------- Saf yardımcılar (test için dışa açık) ---------- */

/** ms → { main: "SS:DD:SN", cs: "yy" }; yüzde saniye aşağı yuvarlanır. */
export function splitTime(ms) {
  const t = Math.max(0, Math.floor(ms));
  const total = Math.floor(t / 1000);
  return {
    main: `${pad(total / 3600)}:${pad((total % 3600) / 60)}:${pad(total % 60)}`,
    cs: pad((t % 1000) / 10),
  };
}
/** ms → "SS:DD:SN.yy" */
export function formatTime(ms) {
  const s = splitTime(ms);
  return `${s.main}.${s.cs}`;
}
/** Tur listesi için kısa biçim: bir saatten kısaysa "DD:SN.yy". */
export function formatLap(ms) {
  const t = formatTime(ms);
  return ms >= 3600000 ? t : t.slice(3);
}
/**
 * Tur analizi: en az iki tur varsa en hızlı/en yavaş indeksini verir.
 * Tüm turlar eşitse işaret yoktur (-1).
 */
export function analyzeLaps(laps) {
  const n = laps.length;
  const total = n ? laps[n - 1].total : 0;
  const result = { fastest: -1, slowest: -1, average: n ? total / n : 0, count: n };
  if (n < 2) return result;
  let f = 0;
  let s = 0;
  laps.forEach((lap, i) => {
    if (lap.split < laps[f].split) f = i;
    if (lap.split > laps[s].split) s = i;
  });
  if (laps[f].split !== laps[s].split) { result.fastest = f; result.slowest = s; }
  return result;
}

/* ---------- Durum ---------- */
const sw = { state: 'idle', startAt: 0, acc: 0, laps: [] };

function elapsed() {
  return sw.state === 'running' ? sw.acc + (performance.now() - sw.startAt) : sw.acc;
}
function lastTotal() {
  return sw.laps.length ? sw.laps[sw.laps.length - 1].total : 0;
}

/* ---------- Kontroller ---------- */
function toggle() {
  showError($('error'), null);
  if (sw.state === 'running') {
    sw.acc = elapsed();
    sw.state = 'paused';
  } else {
    sw.startAt = performance.now();
    sw.state = 'running';
  }
  render(true);
}
function lap() {
  if (sw.state !== 'running') return;
  const total = elapsed();
  if (total <= lastTotal()) return; // sıfır uzunlukta tur kaydedilmez
  sw.laps.push({ total, split: total - lastTotal() });
  renderLaps();
  render(true);
}
function reset() {
  sw.state = 'idle';
  sw.acc = 0;
  sw.laps = [];
  showError($('error'), null);
  $('kr-note').textContent = '';
  renderLaps();
  render(true);
}
$('kr-start').addEventListener('click', toggle);
$('kr-lap').addEventListener('click', lap);
$('kr-reset').addEventListener('click', reset);

/* ---------- Çizim ---------- */
const last = { main: '', cs: '', lapText: '', title: '' };

function render(force = false) {
  const ms = elapsed();
  const { main, cs } = splitTime(ms);
  if (force || main !== last.main) { $('kr-main').textContent = main; last.main = main; }
  if (force || cs !== last.cs) { $('kr-cs').textContent = `.${cs}`; last.cs = cs; }

  const lapText = `Tur ${sw.laps.length + 1}: ${formatLap(ms - lastTotal())}`;
  if (force || lapText !== last.lapText) { $('kr-current').textContent = lapText; last.lapText = lapText; }

  $('kr-status').textContent = { idle: 'Hazır', running: 'Çalışıyor', paused: 'Durduruldu' }[sw.state];
  $('kr-box').dataset.state = sw.state;
  $('kr-start').textContent = sw.state === 'running' ? 'Durdur' : sw.state === 'paused' ? 'Devam' : 'Başlat';
  $('kr-lap').disabled = sw.state !== 'running';

  // Sekme başlığı saniyede bir değişir (her yüzde saniyede güncellemek sekmeyi titretir).
  let title = baseTitle;
  if (sw.state === 'running') title = `${main} – ${baseTitle}`;
  else if (sw.state === 'paused') title = `Durdu ${main} – ${baseTitle}`;
  if (title !== last.title) { document.title = title; last.title = title; }
}

function renderLaps() {
  const list = $('kr-laps');
  list.textContent = '';
  const info = analyzeLaps(sw.laps);
  // En yeni tur üstte.
  for (let i = sw.laps.length - 1; i >= 0; i--) {
    const l = sw.laps[i];
    const li = document.createElement('li');
    li.dataset.lap = String(i + 1);
    const name = document.createElement('span');
    name.className = 'kr-n';
    name.textContent = `Tur ${i + 1}`;
    if (i === info.fastest || i === info.slowest) {
      const tag = document.createElement('small');
      tag.className = 'kr-tag';
      tag.textContent = i === info.fastest ? 'en hızlı' : 'en yavaş';
      name.append(' ', tag);
      li.classList.add(i === info.fastest ? 'is-fast' : 'is-slow');
    }
    const split = document.createElement('span');
    split.className = 'kr-split';
    split.textContent = formatLap(l.split);
    const total = document.createElement('span');
    total.className = 'kr-total';
    total.textContent = formatLap(l.total);
    li.append(name, split, total);
    // Ekran okuyucu için satırın anlamı: hangi sütunun tur süresi, hangisinin toplam olduğu belli olsun.
    const tagText = i === info.fastest ? ', en hızlı' : i === info.slowest ? ', en yavaş' : '';
    li.setAttribute('aria-label', `Tur ${i + 1}, tur süresi ${formatLap(l.split)}, toplam ${formatLap(l.total)}${tagText}`);
    list.appendChild(li);
  }
  $('kr-laps-wrap').hidden = sw.laps.length === 0;

  // Özet satırı
  const sum = $('kr-summary');
  if (!sw.laps.length) {
    sum.textContent = '';
  } else {
    let text = `${info.count} tur · ortalama ${formatLap(info.average)}`;
    if (info.fastest >= 0) {
      text += ` · en hızlı Tur ${info.fastest + 1} (${formatLap(sw.laps[info.fastest].split)})`;
      text += ` · en yavaş Tur ${info.slowest + 1} (${formatLap(sw.laps[info.slowest].split)})`;
    }
    sum.textContent = text;
  }
  ['kr-copy', 'kr-csv', 'kr-txt'].forEach((id) => { $(id).disabled = sw.laps.length === 0; });
}

// Çizim döngüsü: yalnızca ekranı yeniler; doğruluk performance.now farkından gelir.
setInterval(() => render(), 50);
document.addEventListener('visibilitychange', () => render(true));

/* ---------- Dışa aktarma ---------- */
function lapRows() {
  return sw.laps.map((l, i) => [String(i + 1), formatTime(l.split), formatTime(l.total)]);
}
function buildText() {
  const lines = ['Tur\tTur süresi\tToplam süre', ...lapRows().map((r) => r.join('\t'))];
  const info = analyzeLaps(sw.laps);
  if (info.fastest >= 0) {
    lines.push('', `En hızlı: Tur ${info.fastest + 1} (${formatTime(sw.laps[info.fastest].split)})`);
    lines.push(`En yavaş: Tur ${info.slowest + 1} (${formatTime(sw.laps[info.slowest].split)})`);
  }
  if (sw.laps.length) lines.push(`Ortalama tur: ${formatTime(info.average)}`);
  return lines.join('\n') + '\n';
}
/** Noktalı virgül ayracı ve UTF-8 BOM: Türkçe Excel çift tıklamayla sütunlara böler. */
function buildCsv() {
  const rows = ['Tur;Tur süresi;Toplam süre', ...lapRows().map((r) => r.join(';'))];
  return '﻿' + rows.join('\r\n') + '\r\n';
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Eski tarayıcılar için yedek yol
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('copy failed');
}

$('kr-copy').addEventListener('click', async () => {
  showError($('error'), null);
  if (!sw.laps.length) return;
  try {
    await copyText(buildText());
    $('kr-note').textContent = `${sw.laps.length} tur panoya kopyalandı.`;
  } catch {
    $('kr-note').textContent = '';
    showError($('error'), 'Panoya kopyalanamadı. Tarayıcı izin vermemiş olabilir; "Metin indir" ile listeyi dosya olarak kaydedin.');
  }
});
$('kr-csv').addEventListener('click', () => {
  if (!sw.laps.length) return;
  downloadBlob(new Blob([buildCsv()], { type: 'text/csv;charset=utf-8' }), 'kronometre-turlari.csv');
  $('kr-note').textContent = 'CSV dosyası indirildi.';
});
$('kr-txt').addEventListener('click', () => {
  if (!sw.laps.length) return;
  downloadBlob(new Blob([buildText()], { type: 'text/plain;charset=utf-8' }), 'kronometre-turlari.txt');
  $('kr-note').textContent = 'Metin dosyası indirildi.';
});

/* ---------- Tam ekran ---------- */
async function toggleFullscreen() {
  const box = $('kr-box');
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (box.requestFullscreen) await box.requestFullscreen();
    else showError($('error'), 'Bu tarayıcı tam ekranı desteklemiyor. Tarayıcı penceresini büyüterek kullanabilir ya da F11 ile tarayıcı tam ekranını deneyebilirsiniz.');
  } catch {
    showError($('error'), 'Tam ekrana geçilemedi. Tarayıcı izin vermemiş olabilir; F11 ile tarayıcı tam ekranını deneyin.');
  }
}
$('kr-fs').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  $('kr-fs').textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
});

/* ---------- Klavye kısayolları ---------- */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  const el = e.target;
  const tag = (el && el.tagName) || '';
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (el && el.isContentEditable)) return;
  if (e.key === ' ' || e.code === 'Space') {
    // Odaktaki düğme/bağlantı Boşluk ile zaten kendi işini yapar; çift tetiklemeyelim.
    if (['BUTTON', 'A', 'SUMMARY'].includes(tag)) return;
    e.preventDefault();
    toggle();
  } else if (e.key === 'l' || e.key === 'L') {
    lap();
  } else if (e.key === 'r' || e.key === 'R') {
    reset();
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});

/* ---------- Sayfa kapatılırken uyarı ---------- */
window.addEventListener('beforeunload', (e) => {
  if (sw.state !== 'running') return;
  e.preventDefault();
  e.returnValue = ''; // eski tarayıcılar için
});

/* Test ve şeffaflık için saf işlevleri aç. */
window.kronometre = { formatTime, formatLap, analyzeLaps, splitTime };

renderLaps();
render(true);
