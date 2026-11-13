// Compound interest calculator: runs entirely in your browser; your numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { compound, effectiveAnnual, doublingYears } from '../../bilesik-faiz-hesapla/logic.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const n2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Accepts "100,000.50" or "100000.5". */
export function parseEn(str) {
  const t = String(str).trim().replace(/[\s$€£,]/g, '');
  if (t === '') return NaN;
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  const principal = parseEn($('p').value);
  const ratePct = parseEn($('r').value);
  const years = parseEn($('t').value);
  const monthly = $('m').value.trim() === '' ? 0 : parseEn($('m').value);
  const n = Number($('n').value);
  const fail = (msg) => { $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), msg); };
  if (!(principal >= 0)) return fail('Enter the starting amount as 0 or a positive number (e.g. 10,000).');
  if (!(ratePct >= 0) || ratePct > 1000) return fail('Enter the annual interest rate as a percentage between 0 and 1000 (e.g. 5 or 4.5).');
  if (!(years > 0) || years > 100) return fail('Enter a period between 0 and 100 years; decimals work for months (e.g. 1.5 years).');
  if (!(monthly >= 0)) return fail('Monthly contribution can be left empty, or must be 0 or more.');
  if (principal === 0 && monthly === 0) return fail('Either the starting amount or the monthly contribution must be greater than zero.');
  const res = compound({ principal, ratePct, years, n, monthly });
  $('r-final').textContent = money.format(res.final);
  $('r-dep').textContent = money.format(res.deposits);
  $('r-int').textContent = money.format(res.interest);
  $('r-eff').textContent = n2.format(effectiveAnnual(ratePct, n)) + '%';
  const d = doublingYears(ratePct, n);
  $('r-dbl').textContent = Number.isFinite(d) ? n2.format(d) + ' years' : '—';
  $('rows').innerHTML = '';
  for (const r of res.rows) {
    const tr = document.createElement('tr');
    const y = Number.isInteger(r.year) ? String(r.year) : n2.format(r.year);
    for (const v of ['Year ' + y, money.format(r.deposits), money.format(r.interest), money.format(r.balance)]) {
      const td = document.createElement('td'); td.textContent = v; tr.appendChild(td);
    }
    $('rows').appendChild(tr);
  }
  $('result').hidden = false;
  $('result').classList.add('is-active');
});
