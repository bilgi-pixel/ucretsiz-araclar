import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const baseTitle = document.title;

/* ---------- Helpers ---------- */
const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0');

/** ms → "HH:MM:SS" (countdown, rounds up: with 0.4 s left it shows "00:00:01"). */
export function formatCountdown(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${pad(total / 3600)}:${pad((total % 3600) / 60)}:${pad(total % 60)}`;
}
/** ms → "MM:SS", or "HH:MM:SS" beyond one hour. */
export function formatShort(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  return (h ? pad(h) + ':' : '') + `${pad((total % 3600) / 60)}:${pad(total % 60)}`;
}
/** ms → "MM:SS.mmm" (stopwatch, rounds down). */
export function formatStopwatch(ms) {
  const t = Math.max(0, Math.floor(ms));
  const m = Math.floor(t / 60000);
  return `${pad(m)}:${pad((t % 60000) / 1000)}.${pad(t % 1000, 3)}`;
}

/* ---------- Sound (WebAudio; no files) ---------- */
let audioCtx = null;
/** Called on a user click so the browser autoplay restriction is satisfied. */
function prepareAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch { /* continue silently if audio is unsupported */ }
}
function beep(times = 3) {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    for (let i = 0; i < times; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      const t = now + i * 0.35;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.28);
    }
  } catch { /* ignore */ }
}

/* ---------- Tabs ---------- */
const tabs = ['cd', 'sw', 'pm'];
let activeTab = 'cd';
function selectTab(name, focus = false) {
  activeTab = name;
  tabs.forEach((t) => {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', String(sel));
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  });
  if (focus) $('tab-' + name).focus();
  render();
}
tabs.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); selectTab(tabs[(i + 1) % 3], true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectTab(tabs[(i + 2) % 3], true); }
  });
});

/* ---------- Countdown ---------- */
const cd = { state: 'idle', total: 0, endAt: 0, remaining: 0 };

function readCountdownInput() {
  const h = Number($('cd-h').value) || 0;
  const m = Number($('cd-m').value) || 0;
  const s = Number($('cd-s').value) || 0;
  if (h < 0 || m < 0 || s < 0 || ![h, m, s].every(Number.isFinite)) return NaN;
  return ((h * 60 + m) * 60 + s) * 1000;
}
function setCountdownInput(ms) {
  const sec = Math.round(ms / 1000);
  $('cd-h').value = Math.floor(sec / 3600);
  $('cd-m').value = Math.floor((sec % 3600) / 60);
  $('cd-s').value = sec % 60;
}
function cdRemaining() {
  return cd.state === 'running' ? Math.max(0, cd.endAt - Date.now()) : cd.remaining;
}
function cdStart() {
  showError($('error'), null);
  prepareAudio();
  if (cd.state === 'running') { // pause
    cd.remaining = cdRemaining();
    cd.state = 'paused';
  } else {
    if (cd.state !== 'paused') {
      const ms = readCountdownInput();
      if (!Number.isFinite(ms) || ms <= 0) {
        showError($('error'), 'The time is zero or invalid. Enter a value above 0 in the hours, minutes or seconds box, or pick one of the quick presets.');
        return;
      }
      if (ms > 99 * 3600 * 1000 + 999 * 60 * 1000) {
        showError($('error'), 'That time is too long. You can set at most about 4 days; enter a shorter time.');
        return;
      }
      cd.total = ms;
      cd.remaining = ms;
    }
    cd.endAt = Date.now() + cd.remaining;
    cd.state = 'running';
  }
  render();
}
function cdReset() {
  cd.state = 'idle';
  cd.remaining = 0;
  showError($('error'), null);
  render();
}
function cdFinish() {
  cd.state = 'done';
  cd.remaining = 0;
  if ($('cd-sound').checked) beep(3);
  if ($('cd-notify').checked && 'Notification' in window && Notification.permission === 'granted') {
    try { new Notification('Time is up', { body: 'The countdown has finished.' }); } catch { /* ignore */ }
  }
  render();
}
$('cd-start').addEventListener('click', cdStart);
$('cd-reset').addEventListener('click', cdReset);
document.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
  cdReset();
  setCountdownInput(Number(b.dataset.preset) * 60000);
  render();
}));
['cd-h', 'cd-m', 'cd-s'].forEach((id) => $(id).addEventListener('input', () => {
  if (cd.state === 'done') cdReset();
  if (cd.state === 'idle') render();
}));

/* Notification permission: only requested when the user ticks the box. */
$('cd-notify').addEventListener('change', async () => {
  const info = $('cd-notify-info');
  info.textContent = '';
  if (!$('cd-notify').checked) return;
  if (!('Notification' in window)) {
    $('cd-notify').checked = false;
    info.textContent = 'This browser does not support notifications; you will be alerted by sound and the tab title instead.';
    return;
  }
  if (Notification.permission === 'default') {
    try { await Notification.requestPermission(); } catch { /* ignore */ }
  }
  if (Notification.permission !== 'granted') {
    $('cd-notify').checked = false;
    info.textContent = 'Notification permission was not granted. If you want them, allow notifications in the site settings next to the address bar and tick the box again.';
  } else {
    info.textContent = 'Notifications are on: one will appear on your desktop when the time is up.';
  }
});

/* ---------- Stopwatch ---------- */
const sw = { state: 'idle', startAt: 0, acc: 0, laps: [] };
function swElapsed() {
  return sw.state === 'running' ? sw.acc + (performance.now() - sw.startAt) : sw.acc;
}
function swStart() {
  if (sw.state === 'running') {
    sw.acc = swElapsed();
    sw.state = 'paused';
  } else {
    sw.startAt = performance.now();
    sw.state = 'running';
  }
  render();
}
function swLap() {
  if (sw.state !== 'running') return;
  const total = swElapsed();
  const prev = sw.laps.length ? sw.laps[sw.laps.length - 1].total : 0;
  sw.laps.push({ total, split: total - prev });
  renderLaps();
}
function swReset() {
  sw.state = 'idle'; sw.acc = 0; sw.laps = [];
  renderLaps();
  render();
}
function renderLaps() {
  const ol = $('sw-laps');
  ol.innerHTML = '';
  // Newest lap on top.
  [...sw.laps].reverse().forEach((lap, i) => {
    const li = document.createElement('li');
    li.dataset.lap = String(sw.laps.length - i);
    const a = document.createElement('span');
    a.textContent = `Lap ${sw.laps.length - i}: ${formatStopwatch(lap.split)}`;
    const b = document.createElement('span');
    b.textContent = `Total ${formatStopwatch(lap.total)}`;
    li.append(a, b);
    ol.appendChild(li);
  });
  ol.removeAttribute('reversed');
}
$('sw-start').addEventListener('click', swStart);
$('sw-lap').addEventListener('click', swLap);
$('sw-reset').addEventListener('click', swReset);

/* ---------- Pomodoro ---------- */
const pm = { state: 'idle', phase: 'work', rounds: 0, endAt: 0, remaining: 0, total: 0 };
const PHASE_NAMES = { work: 'Focus', short: 'Short break', long: 'Long break' };

function pmSettings() {
  const num = (id, def, min, max) => {
    const v = Math.floor(Number($(id).value));
    return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : def;
  };
  return {
    work: num('pm-work', 25, 1, 180) * 60000,
    short: num('pm-short', 5, 1, 60) * 60000,
    long: num('pm-long', 15, 1, 120) * 60000,
    every: num('pm-every', 4, 2, 12),
  };
}
function pmPhaseMs(phase = pm.phase) { return pmSettings()[phase]; }
function pmRemaining() {
  return pm.state === 'running' ? Math.max(0, pm.endAt - Date.now()) : pm.remaining;
}
function pmLoadPhase(phase) {
  pm.phase = phase;
  pm.total = pmPhaseMs(phase);
  pm.remaining = pm.total;
}
function pmNextPhase() {
  const s = pmSettings();
  if (pm.phase === 'work') {
    pm.rounds += 1;
    return pm.rounds % s.every === 0 ? 'long' : 'short';
  }
  return 'work';
}
function pmStart() {
  prepareAudio();
  if (pm.state === 'running') {
    pm.remaining = pmRemaining();
    pm.state = 'paused';
  } else {
    if (pm.state === 'idle') pmLoadPhase(pm.phase);
    pm.endAt = Date.now() + pm.remaining;
    pm.state = 'running';
  }
  render();
}
function pmAdvance(auto) {
  pmLoadPhase(pmNextPhase());
  if (auto) {
    pm.endAt = Date.now() + pm.remaining;
    pm.state = 'running';
  } else {
    pm.state = 'idle';
  }
}
function pmFinish() {
  if ($('pm-sound').checked) beep(3);
  pmAdvance($('pm-auto').checked);
  render();
}
function pmSkip() {
  pmAdvance(pm.state === 'running');
  render();
}
function pmReset() {
  pm.state = 'idle'; pm.phase = 'work'; pm.rounds = 0;
  pmLoadPhase('work');
  render();
}
$('pm-start').addEventListener('click', pmStart);
$('pm-skip').addEventListener('click', pmSkip);
$('pm-reset').addEventListener('click', pmReset);
document.querySelectorAll('[data-pm]').forEach((b) => b.addEventListener('click', () => {
  const [w, s] = b.dataset.pm.split(',');
  $('pm-work').value = w; $('pm-short').value = s;
  $('pm-long').value = Number(w) >= 50 ? 30 : 15;
  pmReset();
}));
['pm-work', 'pm-short', 'pm-long', 'pm-every'].forEach((id) => $(id).addEventListener('input', () => {
  if (pm.state === 'idle') { pmLoadPhase(pm.phase); render(); }
}));

/* ---------- Rendering and loop ---------- */
function render() {
  // Countdown
  const cdLeft = cd.state === 'idle' ? (Number.isFinite(readCountdownInput()) ? readCountdownInput() : 0) : cdRemaining();
  $('cd-display').textContent = formatCountdown(cdLeft);
  $('cd-status').textContent = { idle: 'Ready', running: 'Running', paused: 'Paused', done: 'Time is up' }[cd.state];
  $('cd-screen').classList.toggle('zm-done', cd.state === 'done');
  $('cd-screen').dataset.state = cd.state;
  $('cd-start').textContent = cd.state === 'running' ? 'Pause' : cd.state === 'paused' ? 'Resume' : 'Start';
  // Stopwatch
  $('sw-display').textContent = formatStopwatch(swElapsed());
  $('sw-status').textContent = { idle: 'Ready', running: 'Running', paused: 'Stopped' }[sw.state];
  $('sw-start').textContent = sw.state === 'running' ? 'Stop' : sw.state === 'paused' ? 'Resume' : 'Start';
  $('sw-lap').disabled = sw.state !== 'running';
  // Pomodoro
  const pmLeft = pm.state === 'idle' ? pmPhaseMs() : pmRemaining();
  $('pm-display').textContent = formatShort(pmLeft);
  $('pm-phase').textContent = PHASE_NAMES[pm.phase] + ({ idle: '', running: ' · running', paused: ' · paused' }[pm.state]);
  $('pm-phase').dataset.phase = pm.phase;
  $('pm-rounds').textContent = `Focus rounds completed: ${pm.rounds}`;
  $('pm-start').textContent = pm.state === 'running' ? 'Pause' : pm.state === 'paused' ? 'Resume' : 'Start';
  updateTitle(cdLeft, pmLeft);
}

function updateTitle(cdLeft, pmLeft) {
  let prefix = '';
  if (cd.state === 'running' && (activeTab === 'cd' || pm.state !== 'running')) prefix = formatCountdown(cdLeft);
  else if (pm.state === 'running') prefix = `${formatShort(pmLeft)} ${PHASE_NAMES[pm.phase]}`;
  else if (cd.state === 'running') prefix = formatCountdown(cdLeft);
  else if (cd.state === 'done') prefix = 'Time is up';
  else if (sw.state === 'running') prefix = formatStopwatch(swElapsed()).slice(0, 8);
  document.title = prefix ? `${prefix} – ${baseTitle}` : baseTitle;
}

/** Recomputed from Date.now on every update, so setInterval drift does not affect the result. */
function loop() {
  if (cd.state === 'running' && Date.now() >= cd.endAt) cdFinish();
  if (pm.state === 'running' && Date.now() >= pm.endAt) pmFinish();
  render();
}
setInterval(loop, 100);
document.addEventListener('visibilitychange', loop);

/* ---------- Full screen ---------- */
async function toggleFullscreen() {
  const box = $('zm-box');
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (box.requestFullscreen) await box.requestFullscreen();
    else showError($('error'), 'This browser does not support full screen for page elements. You can enlarge the window instead.');
  } catch {
    showError($('error'), 'Could not enter full screen. Your browser may have blocked it; try F11 for browser full screen.');
  }
}
$('fs').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => { $('fs').textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen'; });

/* ---------- Keyboard shortcuts ---------- */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target && e.target.tagName) || '';
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A', 'SUMMARY'].includes(tag)) return;
  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    ({ cd: cdStart, sw: swStart, pm: pmStart })[activeTab]();
  } else if (e.key === 'l' || e.key === 'L') {
    if (activeTab === 'sw') swLap();
  } else if (e.key === 'r' || e.key === 'R') {
    ({ cd: cdReset, sw: swReset, pm: pmReset })[activeTab]();
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});

/* Expose pure formatters for tests and transparency. */
window.onlineTimer = { formatCountdown, formatShort, formatStopwatch };

pmLoadPhase('work');
render();
