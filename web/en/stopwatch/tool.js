import { downloadBlob, showError } from '../../assets/js/ba.js';

// Online stopwatch: based on performance.now (setInterval only redraws),
// lap recording, fastest/slowest analysis, CSV/text export, full screen.
// Nothing is stored or sent anywhere.

const $ = (id) => document.getElementById(id);
const baseTitle = document.title;
const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0');

/* ---------- Pure helpers (exposed for tests) ---------- */

/** ms → { main: "HH:MM:SS", cs: "hh" }; hundredths are rounded down. */
export function splitTime(ms) {
  const t = Math.max(0, Math.floor(ms));
  const total = Math.floor(t / 1000);
  return {
    main: `${pad(total / 3600)}:${pad((total % 3600) / 60)}:${pad(total % 60)}`,
    cs: pad((t % 1000) / 10),
  };
}
/** ms → "HH:MM:SS.hh" */
export function formatTime(ms) {
  const s = splitTime(ms);
  return `${s.main}.${s.cs}`;
}
/** Short lap format: "MM:SS.hh" when under one hour. */
export function formatLap(ms) {
  const t = formatTime(ms);
  return ms >= 3600000 ? t : t.slice(3);
}
/**
 * Lap analysis: with two or more laps returns the fastest/slowest index.
 * If all laps are equal there is no marker (-1).
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

/* ---------- State ---------- */
const sw = { state: 'idle', startAt: 0, acc: 0, laps: [] };

function elapsed() {
  return sw.state === 'running' ? sw.acc + (performance.now() - sw.startAt) : sw.acc;
}
function lastTotal() {
  return sw.laps.length ? sw.laps[sw.laps.length - 1].total : 0;
}

/* ---------- Controls ---------- */
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
  if (total <= lastTotal()) return; // zero-length laps are not recorded
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

/* ---------- Rendering ---------- */
const last = { main: '', cs: '', lapText: '', title: '' };

function render(force = false) {
  const ms = elapsed();
  const { main, cs } = splitTime(ms);
  if (force || main !== last.main) { $('kr-main').textContent = main; last.main = main; }
  if (force || cs !== last.cs) { $('kr-cs').textContent = `.${cs}`; last.cs = cs; }

  const lapText = `Lap ${sw.laps.length + 1}: ${formatLap(ms - lastTotal())}`;
  if (force || lapText !== last.lapText) { $('kr-current').textContent = lapText; last.lapText = lapText; }

  $('kr-status').textContent = { idle: 'Ready', running: 'Running', paused: 'Paused' }[sw.state];
  $('kr-box').dataset.state = sw.state;
  $('kr-start').textContent = sw.state === 'running' ? 'Stop' : sw.state === 'paused' ? 'Resume' : 'Start';
  $('kr-lap').disabled = sw.state !== 'running';

  // The tab title changes once a second (updating every hundredth would make the tab flicker).
  let title = baseTitle;
  if (sw.state === 'running') title = `${main} – ${baseTitle}`;
  else if (sw.state === 'paused') title = `Paused ${main} – ${baseTitle}`;
  if (title !== last.title) { document.title = title; last.title = title; }
}

function renderLaps() {
  const list = $('kr-laps');
  list.textContent = '';
  const info = analyzeLaps(sw.laps);
  // Newest lap on top.
  for (let i = sw.laps.length - 1; i >= 0; i--) {
    const l = sw.laps[i];
    const li = document.createElement('li');
    li.dataset.lap = String(i + 1);
    const name = document.createElement('span');
    name.className = 'kr-n';
    name.textContent = `Lap ${i + 1}`;
    if (i === info.fastest || i === info.slowest) {
      const tag = document.createElement('small');
      tag.className = 'kr-tag';
      tag.textContent = i === info.fastest ? 'fastest' : 'slowest';
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
    // Screen reader label: makes clear which column is the split and which is the total.
    const tagText = i === info.fastest ? ', fastest' : i === info.slowest ? ', slowest' : '';
    li.setAttribute('aria-label', `Lap ${i + 1}, split ${formatLap(l.split)}, total ${formatLap(l.total)}${tagText}`);
    list.appendChild(li);
  }
  $('kr-laps-wrap').hidden = sw.laps.length === 0;

  // Summary line
  const sum = $('kr-summary');
  if (!sw.laps.length) {
    sum.textContent = '';
  } else {
    let text = `${info.count} ${info.count === 1 ? 'lap' : 'laps'} · average ${formatLap(info.average)}`;
    if (info.fastest >= 0) {
      text += ` · fastest Lap ${info.fastest + 1} (${formatLap(sw.laps[info.fastest].split)})`;
      text += ` · slowest Lap ${info.slowest + 1} (${formatLap(sw.laps[info.slowest].split)})`;
    }
    sum.textContent = text;
  }
  ['kr-copy', 'kr-csv', 'kr-txt'].forEach((id) => { $(id).disabled = sw.laps.length === 0; });
}

// Draw loop: only refreshes the display; accuracy comes from performance.now differences.
setInterval(() => render(), 50);
document.addEventListener('visibilitychange', () => render(true));

/* ---------- Export ---------- */
function lapRows() {
  return sw.laps.map((l, i) => [String(i + 1), formatTime(l.split), formatTime(l.total)]);
}
function buildText() {
  const lines = ['Lap\tSplit\tTotal time', ...lapRows().map((r) => r.join('\t'))];
  const info = analyzeLaps(sw.laps);
  if (info.fastest >= 0) {
    lines.push('', `Fastest: Lap ${info.fastest + 1} (${formatTime(sw.laps[info.fastest].split)})`);
    lines.push(`Slowest: Lap ${info.slowest + 1} (${formatTime(sw.laps[info.slowest].split)})`);
  }
  if (sw.laps.length) lines.push(`Average lap: ${formatTime(info.average)}`);
  return lines.join('\n') + '\n';
}
/** Comma separator and UTF-8 BOM so Excel opens the file with correct columns and characters. */
function buildCsv() {
  const rows = ['Lap,Split,Total time', ...lapRows().map((r) => r.join(','))];
  return '﻿' + rows.join('\r\n') + '\r\n';
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for older browsers
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
    $('kr-note').textContent = `${sw.laps.length} ${sw.laps.length === 1 ? 'lap' : 'laps'} copied to the clipboard.`;
  } catch {
    $('kr-note').textContent = '';
    showError($('error'), 'Could not copy to the clipboard. Your browser may have blocked it; use "Download text" to save the list as a file instead.');
  }
});
$('kr-csv').addEventListener('click', () => {
  if (!sw.laps.length) return;
  downloadBlob(new Blob([buildCsv()], { type: 'text/csv;charset=utf-8' }), 'stopwatch-laps.csv');
  $('kr-note').textContent = 'CSV file downloaded.';
});
$('kr-txt').addEventListener('click', () => {
  if (!sw.laps.length) return;
  downloadBlob(new Blob([buildText()], { type: 'text/plain;charset=utf-8' }), 'stopwatch-laps.txt');
  $('kr-note').textContent = 'Text file downloaded.';
});

/* ---------- Full screen ---------- */
async function toggleFullscreen() {
  const box = $('kr-box');
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (box.requestFullscreen) await box.requestFullscreen();
    else showError($('error'), 'This browser does not support full screen for page elements. Enlarge the window or try F11 for browser full screen.');
  } catch {
    showError($('error'), 'Could not enter full screen. Your browser may have blocked it; try F11 for browser full screen.');
  }
}
$('kr-fs').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  $('kr-fs').textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
});

/* ---------- Keyboard shortcuts ---------- */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  const el = e.target;
  const tag = (el && el.tagName) || '';
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (el && el.isContentEditable)) return;
  if (e.key === ' ' || e.code === 'Space') {
    // A focused button/link already handles Space itself; avoid double triggering.
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

/* ---------- Warn before closing while running ---------- */
window.addEventListener('beforeunload', (e) => {
  if (sw.state !== 'running') return;
  e.preventDefault();
  e.returnValue = ''; // for older browsers
});

/* Expose pure functions for tests and transparency. */
window.stopwatch = { formatTime, formatLap, analyzeLaps, splitTime };

renderLaps();
render(true);
