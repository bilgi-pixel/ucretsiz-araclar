// Speed, Distance and Time Calculator: runs entirely in your browser; your numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { parseOptional, solve, fmt, fmtDuration, fmtPace } from './core.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
let last = '';

const LABELS = { speed: 'Calculate speed', distance: 'Calculate distance', time: 'Calculate time' };

/** Disables the group that will be calculated, based on the selected mode. */
function syncMode() {
  const m = mode();
  const off = { speed: ['speed-v', 'speed-u'], distance: ['dist-v', 'dist-u'], time: ['t-h', 't-m', 't-s'] }[m];
  for (const id of ['speed-v', 'speed-u', 'dist-v', 'dist-u', 't-h', 't-m', 't-s']) $(id).disabled = off.includes(id);
  for (const [grp, ids] of [['g-speed', 'speed'], ['g-dist', 'distance'], ['g-time', 'time']]) $(grp).classList.toggle('is-calc', ids === m);
  $('calc').textContent = LABELS[m];
}

function readInputs() {
  const m = mode();
  const out = {};
  if (m !== 'speed') {
    const v = parseOptional($('speed-v').value, 'Speed');
    out.speed = v === null ? null : { v, unit: $('speed-u').value };
  }
  if (m !== 'distance') {
    const v = parseOptional($('dist-v').value, 'Distance');
    out.dist = v === null ? null : { v, unit: $('dist-u').value };
  }
  if (m !== 'time') {
    const h = parseOptional($('t-h').value, 'Hours');
    const mi = parseOptional($('t-m').value, 'Minutes');
    const s = parseOptional($('t-s').value, 'Seconds');
    out.seconds = h === null && mi === null && s === null ? null : (h ?? 0) * 3600 + (mi ?? 0) * 60 + (s ?? 0);
  }
  return out;
}

function run() {
  showError($('error'), '');
  try {
    const m = mode();
    const r = solve(m, readInputs());
    const speedTxt = `${fmt(r.mph)} mph (${fmt(r.kmh)} km/h)`;
    const distTxt = `${fmt(r.meters / 1609.344)} miles (${fmt(r.meters / 1000)} km)`;
    const timeTxt = fmtDuration(r.secs);
    $('r-big').textContent = m === 'speed' ? `Speed = ${speedTxt}` : m === 'distance' ? `Distance = ${distTxt}` : `Time = ${timeTxt}`;
    $('r-speed').textContent = speedTxt;
    $('r-speed2').textContent = `${fmt(r.mps)} m/s · ${fmt(r.mps / 0.3048)} ft/s · ${fmt(r.knot)} knots`;
    $('r-dist').textContent = `${distTxt} · ${fmt(r.meters)} m · ${fmt(r.meters / 0.3048)} ft`;
    $('r-time').textContent = `${timeTxt} (${fmt(r.secs / 3600)} hours)`;
    $('r-pace').textContent = r.paceSecPerMile ? `${fmtPace(r.paceSecPerMile, 'mile')} · ${fmtPace(r.paceSecPerKm, 'km')}` : '—';
    last = `${m === 'speed' ? 'Speed' : m === 'distance' ? 'Distance' : 'Time'}: ${$('r-big').textContent.split('= ')[1]} · speed ${speedTxt} · distance ${distTxt} · time ${timeTxt}`;
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  for (const id of ['speed-v', 'dist-v', 't-h', 't-m', 't-s']) $(id).value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = ''; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
syncMode();
