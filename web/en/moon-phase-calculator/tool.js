// Moon Phase Calculator: runs entirely in your browser; the date you enter is never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { parseZonedDateTime, moonInfo, fmtZoned } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
let last = '';

const tz = () => $('tz').value;

/** Current date (yyyy-mm-dd) and time (hh:mm) in the selected time zone. */
function nowIn(timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(new Date());
  const g = (t) => parts.find((p) => p.type === t).value;
  return { date: `${g('year')}-${g('month')}-${g('day')}`, time: `${g('hour')}:${g('minute')}` };
}

function run() {
  showError($('error'), '');
  try {
    const ms = parseZonedDateTime($('date').value, $('time').value || '12:00', tz());
    const m = moonInfo(ms);
    const pct = nf.format(m.illumination * 100);
    $('r-icon').textContent = m.icon;
    $('r-big').textContent = `${m.name} · ${pct}% illuminated`;
    $('r-name').textContent = m.name;
    $('r-illum').textContent = `${pct}%`;
    $('r-age').textContent = `${nf.format(m.ageDays)} days (${m.waxing ? 'waxing' : 'waning'})`;
    $('r-prev').textContent = fmtZoned(m.prevNew, tz());
    const rows = [['r-next-new', 0], ['r-next-first', 1], ['r-next-full', 2], ['r-next-last', 3]];
    for (const [id, ph] of rows) $(id).textContent = fmtZoned(m.nextOf(ph).ms, tz());
    last = `${fmtZoned(ms, tz())}: ${m.name}, ${pct}% illuminated, Moon age ${nf.format(m.ageDays)} days. Next full moon: ${fmtZoned(m.nextOf(2).ms, tz())}; next new moon: ${fmtZoned(m.nextOf(0).ms, tz())}.`;
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

// Preselect the device time zone, adding it to the list when it is not one of the listed zones.
const device = Intl.DateTimeFormat().resolvedOptions().timeZone;
if (device && ![...$('tz').options].some((o) => o.value === device)) {
  const o = document.createElement('option');
  o.value = device; o.textContent = `Your device (${device.replace(/_/g, ' ')})`;
  $('tz').prepend(o);
}
if (device) $('tz').value = device;
if (!$('tz').value) $('tz').value = 'America/New_York';
$('date').value = nowIn(tz()).date;

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('today').addEventListener('click', () => {
  const n = nowIn(tz());
  $('date').value = n.date;
  $('time').value = n.time;
  run();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
