// Percentage Calculator (EN) — runs entirely in the browser; nothing is sent to a server.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmtNum = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
const fmtMoney = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = (n) => `${fmtNum.format(n)}%`;

/* ---------- Number parsing (1,250.50 / 1250.5 / 1.250,50 / -12.5) ---------- */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/[\s ]/g, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} must contain digits only (e.g. 1,250.50). Remove letters and symbols and try again.`);
  let neg = false;
  if (/^[+-]/.test(s)) { neg = s[0] === '-'; s = s.slice(1); }
  if (/[+-]/.test(s) || !/\d/.test(s)) throw new Error(`${label} could not be read. A minus sign is only allowed at the start; example format: 1,250.50`);
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    // Whichever separator comes last is the decimal mark (also accepts 1.250,50).
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    const commas = (s.match(/,/g) || []).length;
    if (commas > 1 || /^\d{1,3},\d{3}$/.test(s)) s = s.replace(/,/g, ''); // "1,250" is read as thousands
    else s = s.replace(',', '.'); // "2,5" is read as a decimal comma
  } else if (lastDot >= 0) {
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} could not be read. Example format: 1,250.50`);
  return neg ? -n : n;
}

/* ---------- Modes: labels and calculation core ---------- */
export const MODES = {
  percentof: {
    a: 'Number (A)', b: 'Percent (B, %)', ph: ['e.g. 2,500', 'e.g. 18'],
    title: (A, B) => `${fmtPct(B)} of ${fmtNum.format(A)}`,
    calc: (A, B) => {
      const v = (A * B) / 100;
      return { rows: [['Result', fmtNum.format(v)], ['A + result', fmtNum.format(A + v)], ['A − result', fmtNum.format(A - v)]] };
    },
  },
  whatpercent: {
    a: 'Part (A)', b: 'Whole (B)', ph: ['e.g. 50', 'e.g. 200'],
    title: (A, B) => `${fmtNum.format(A)} as a percentage of ${fmtNum.format(B)}`,
    calc: (A, B) => {
      if (B === 0) throw new Error('The whole (B) cannot be zero because a percentage of zero is undefined. Enter a non-zero number in field B.');
      const v = (A / B) * 100;
      return { rows: [['Result', fmtPct(v)], ['Ratio (A / B)', fmtNum.format(A / B)]] };
    },
  },
  change: {
    a: 'Starting value (A)', b: 'New value (B)', ph: ['e.g. 800', 'e.g. 1,000'],
    title: (A, B) => `Change from ${fmtNum.format(A)} to ${fmtNum.format(B)}`,
    calc: (A, B) => {
      if (A === 0) throw new Error('The starting value (A) cannot be zero because a percentage change from zero cannot be calculated. Enter a non-zero value in field A.');
      const v = ((B - A) / Math.abs(A)) * 100;
      return { rows: [['Change', `${v >= 0 ? 'Increase' : 'Decrease'} ${fmtPct(Math.abs(v))}`], ['Difference (B − A)', fmtNum.format(B - A)]] };
    },
  },
  discount: {
    a: 'Price (A)', b: 'Discount (B, %)', ph: ['e.g. 1,200', 'e.g. 15'],
    title: (A, B) => `${fmtMoney.format(A)} with ${fmtPct(B)} off`,
    calc: (A, B) => {
      if (B > 100 || B < 0) throw new Error('The discount must be between 0 and 100. Enter the rate as a percent (e.g. 15).');
      const disc = (A * B) / 100;
      return { rows: [['Price after discount', fmtMoney.format(A - disc)], ['You save', fmtMoney.format(disc)]] };
    },
  },
  apply: {
    a: 'Value (A)', b: 'Rate (B, %)', ph: ['e.g. 1,000', 'e.g. 18'], dir: true,
    title: (A, B, dir) => `${fmtNum.format(A)} ${dir === 'decrease' ? 'decreased' : 'increased'} by ${fmtPct(B)}`,
    calc: (A, B, dir) => {
      const delta = (A * B) / 100;
      const v = dir === 'decrease' ? A - delta : A + delta;
      return { rows: [['New value', fmtNum.format(v)], [dir === 'decrease' ? 'Amount removed' : 'Amount added', fmtNum.format(delta)]] };
    },
  },
};

/** Pure calculation: parses inputs and returns a result object (may throw; returns null for empty input). */
export function compute(mode, rawA, rawB, dir = 'increase') {
  const m = MODES[mode];
  const A = parseNumber(rawA, 'Value A');
  const B = parseNumber(rawB, 'Value B');
  if (A === null || B === null) return null;
  const r = m.calc(A, B, dir);
  return { ...r, title: m.title(A, B, dir) };
}

/* ---------- UI ---------- */
if (typeof document !== 'undefined' && $('form')) {
  const el = {
    a: $('f-a'), b: $('f-b'), la: $('l-a'), lb: $('l-b'), dir: $('f-dir'), dirWrap: $('dir-wrap'),
    err: $('error'), result: $('result'), rows: $('r-rows'), title: $('r-title'),
    copy: $('copy'), status: $('copy-status'),
  };
  let lastText = '';
  const currentMode = () => document.querySelector('input[name="mode"]:checked').value;

  function applyLabels() {
    const m = MODES[currentMode()];
    el.la.textContent = m.a; el.lb.textContent = m.b;
    el.a.placeholder = m.ph[0]; el.b.placeholder = m.ph[1];
    el.dirWrap.hidden = !m.dir;
  }

  function update() {
    el.status.textContent = '';
    try {
      const r = compute(currentMode(), el.a.value, el.b.value, el.dir.value);
      showError(el.err, '');
      if (!r) { el.result.classList.remove('is-active'); lastText = ''; return; }
      el.title.textContent = r.title;
      el.rows.replaceChildren();
      r.rows.forEach(([k, v], i) => {
        const row = document.createElement('div');
        row.className = 'yz-row' + (i === 0 ? ' is-strong' : '');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = v;
        row.append(dt, dd); el.rows.append(row);
      });
      lastText = `${r.title}: ${r.rows.map(([k, v]) => `${k} ${v}`).join(' · ')}`;
      el.result.classList.add('is-active');
    } catch (e) {
      el.result.classList.remove('is-active'); lastText = '';
      showError(el.err, e.message);
    }
  }

  document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => { applyLabels(); update(); }));
  [el.a, el.b, el.dir].forEach((i) => i.addEventListener('input', update));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  el.copy.addEventListener('click', async () => {
    if (!lastText) { el.status.textContent = 'Nothing to copy yet; enter both values first.'; return; }
    try { await navigator.clipboard.writeText(lastText); el.status.textContent = 'Result copied.'; }
    catch { el.status.textContent = 'Could not copy automatically; select the result and copy it by hand.'; }
  });
  applyLabels();
}
