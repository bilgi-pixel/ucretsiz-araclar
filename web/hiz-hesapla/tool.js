// Hız, Yol ve Süre Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz değerler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseOptional, solve, fmt, fmtDuration, fmtPace } from './core.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
let last = '';

const LABELS = { hiz: 'Hızı hesapla', yol: 'Yolu hesapla', sure: 'Süreyi hesapla' };

/** Seçili moda göre hesaplanacak alanı pasifleştirir. */
function syncMode() {
  const m = mode();
  const off = { hiz: ['speed-v', 'speed-u'], yol: ['dist-v', 'dist-u'], sure: ['t-h', 't-m', 't-s'] }[m];
  for (const id of ['speed-v', 'speed-u', 'dist-v', 'dist-u', 't-h', 't-m', 't-s']) $(id).disabled = off.includes(id);
  for (const [grp, ids] of [['g-speed', 'hiz'], ['g-dist', 'yol'], ['g-time', 'sure']]) $(grp).classList.toggle('is-calc', ids === m);
  $('calc').textContent = LABELS[m];
}

function readInputs() {
  const m = mode();
  const out = {};
  if (m !== 'hiz') {
    const v = parseOptional($('speed-v').value, 'Hız');
    out.speed = v === null ? null : { v, unit: $('speed-u').value };
  }
  if (m !== 'yol') {
    const v = parseOptional($('dist-v').value, 'Yol');
    out.dist = v === null ? null : { v, unit: $('dist-u').value };
  }
  if (m !== 'sure') {
    const h = parseOptional($('t-h').value, 'Saat');
    const mi = parseOptional($('t-m').value, 'Dakika');
    const s = parseOptional($('t-s').value, 'Saniye');
    out.seconds = h === null && mi === null && s === null ? null : (h ?? 0) * 3600 + (mi ?? 0) * 60 + (s ?? 0);
  }
  return out;
}

function run() {
  showError($('error'), '');
  try {
    const m = mode();
    const r = solve(m, readInputs());
    const speedTxt = `${fmt(r.kmh)} km/sa`;
    const distTxt = `${fmt(r.meters / 1000)} km`;
    const timeTxt = fmtDuration(r.secs);
    $('r-big').textContent = m === 'hiz' ? `Hız = ${speedTxt}` : m === 'yol' ? `Yol = ${distTxt}` : `Süre = ${timeTxt}`;
    $('r-speed').textContent = speedTxt;
    $('r-speed2').textContent = `${fmt(r.mps)} m/sn · ${fmt(r.mph)} mil/sa · ${fmt(r.knot)} knot`;
    $('r-dist').textContent = `${distTxt} · ${fmt(r.meters)} m · ${fmt(r.meters / 1609.344)} mil`;
    $('r-time').textContent = `${timeTxt} (${fmt(r.secs / 3600)} saat)`;
    $('r-pace').textContent = r.paceSecPerKm ? fmtPace(r.paceSecPerKm) : '—';
    last = `${m === 'hiz' ? 'Hız' : m === 'yol' ? 'Yol' : 'Süre'}: ${$('r-big').textContent.split('= ')[1]} · hız ${speedTxt} · yol ${distTxt} · süre ${timeTxt}`;
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
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncMode();
