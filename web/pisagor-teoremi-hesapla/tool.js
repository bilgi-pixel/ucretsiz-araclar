// Pisagor Teoremi Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz değerler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseOptional, solveTriangle, fmt } from './core.js';

const $ = (id) => document.getElementById(id);
let last = '';

function draw(r) {
  // Dik üçgen çizimi: dik açı sol altta; kenar oranı korunur.
  const maxW = 150, maxH = 90;
  const k = Math.min(maxW / r.b, maxH / r.a);
  const w = Math.max(r.b * k, 20), h = Math.max(r.a * k, 20);
  const x0 = 25, y0 = 105;
  $('r-svg').innerHTML = `<polygon points="${x0},${y0} ${x0 + w},${y0} ${x0},${y0 - h}" fill="rgba(123,35,49,.08)" stroke="#7b2331" stroke-width="2"/>`
    + `<path d="M${x0},${y0 - 10} h10 v10" fill="none" stroke="#7b2331" stroke-width="1.5"/>`
    + `<text x="${x0 + w / 2 - 5}" y="${y0 + 14}">b = ${fmt(r.b, 4)}</text>`
    + `<text x="${x0 - 22}" y="${y0 - h / 2}" text-anchor="start" transform="rotate(-90 ${x0 - 12} ${y0 - h / 2})">a = ${fmt(r.a, 4)}</text>`
    + `<text x="${x0 + w / 2 + 4}" y="${y0 - h / 2 - 4}">c = ${fmt(r.c, 4)}</text>`;
}

function run() {
  showError($('error'), '');
  try {
    const a = parseOptional($('a').value, 'a kenarı');
    const b = parseOptional($('b').value, 'b kenarı');
    const c = parseOptional($('c').value, 'c kenarı (hipotenüs)');
    const r = solveTriangle(a, b, c);
    const name = r.missing === 'c' ? 'Hipotenüs (c)' : r.missing === 'a' ? 'a kenarı' : 'b kenarı';
    $('r-big').textContent = `${r.missing} = ${fmt(r[r.missing])}`;
    $('r-missing-label').textContent = name;
    $('r-value').textContent = fmt(r[r.missing]);
    $('r-area').textContent = fmt(r.area, 6);
    $('r-perimeter').textContent = fmt(r.perimeter, 6);
    $('r-angles').textContent = `A = ${fmt(r.angleA, 2)}° · B = ${fmt(r.angleB, 2)}° · C = 90°`;
    $('r-height').textContent = fmt(r.height, 6);
    $('r-triple').textContent = r.triple
      ? (r.triple.primitive ? `Evet, (${r.triple.values.join(', ')}) ilkel bir Pisagor üçlüsüdür` : `Evet, (${r.triple.base.join(', ')}) üçlüsünün katıdır`)
      : 'Hayır (tam sayı üçlü değil)';
    draw(r);
    last = `${r.missing} = ${fmt(r[r.missing])} · alan = ${fmt(r.area, 6)} · çevre = ${fmt(r.perimeter, 6)}`;
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  for (const id of ['a', 'b', 'c']) $(id).value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = ''; showError($('error'), ''); $('a').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
