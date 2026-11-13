// Bileşik faiz hesaplayıcı — tamamen tarayıcıda çalışır, girilen değerler hiçbir yere gönderilmez.
import { showError } from '../assets/js/ba.js';
import { compound, effectiveAnnual, doublingYears } from './logic.js';

const $ = (id) => document.getElementById(id);
const tl = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const n2 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

/** "100.000,50" ya da "100000.5" biçimini sayıya çevirir. */
export function parseTr(str) {
  let t = String(str).trim().replace(/\s|₺|TL/gi, '');
  if (t === '') return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  const principal = parseTr($('p').value);
  const ratePct = parseTr($('r').value);
  const years = parseTr($('t').value);
  const monthly = $('m').value.trim() === '' ? 0 : parseTr($('m').value);
  const n = Number($('n').value);
  const fail = (msg) => { $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), msg); };
  if (!(principal >= 0)) return fail('Ana parayı 0 ya da daha büyük bir sayı olarak yazın (örn. 100.000).');
  if (!(ratePct >= 0) || ratePct > 1000) return fail('Yıllık faiz oranını 0 ile 1000 arasında yüzde olarak yazın (örn. 45 ya da 42,5).');
  if (!(years > 0) || years > 100) return fail('Süreyi 0 ile 100 yıl arasında yazın; ay için ondalık kullanabilirsiniz (örn. 1,5 yıl).');
  if (!(monthly >= 0)) return fail('Aylık ek yatırım boş bırakılabilir ya da 0 veya daha büyük bir sayı olmalı.');
  if (principal === 0 && monthly === 0) return fail('Ana para ya da aylık ek yatırımdan en az biri sıfırdan büyük olmalı.');
  const res = compound({ principal, ratePct, years, n, monthly });
  $('r-final').textContent = tl.format(res.final) + ' TL';
  $('r-dep').textContent = tl.format(res.deposits) + ' TL';
  $('r-int').textContent = tl.format(res.interest) + ' TL';
  $('r-eff').textContent = '%' + n2.format(effectiveAnnual(ratePct, n));
  const d = doublingYears(ratePct, n);
  $('r-dbl').textContent = Number.isFinite(d) ? n2.format(d) + ' yıl' : '—';
  $('rows').innerHTML = '';
  for (const r of res.rows) {
    const tr = document.createElement('tr');
    const y = Number.isInteger(r.year) ? String(r.year) : n2.format(r.year);
    for (const v of [y + '. yıl', tl.format(r.deposits), tl.format(r.interest), tl.format(r.balance)]) {
      const td = document.createElement('td'); td.textContent = v; tr.appendChild(td);
    }
    $('rows').appendChild(tr);
  }
  $('result').hidden = false;
  $('result').classList.add('is-active');
});
