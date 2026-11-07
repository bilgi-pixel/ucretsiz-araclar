// Matris hesaplayıcı arayüzü — tarayıcıda çalışır; girilen sayılar sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseNum, add, sub, mul, scale, transpose, det, inverse, fmt } from './logic.js';

const $ = (id) => document.getElementById(id);
const NEEDS_B = new Set(['add', 'sub', 'mul']);

/** Boyuta göre giriş ızgarasını kurar; mevcut değerleri korur. */
function buildGrid(name) {
  const r = Number($(`${name}-rows`).value), c = Number($(`${name}-cols`).value);
  const host = $(`grid-${name}`);
  const old = [...host.querySelectorAll('input')].reduce((m, i) => { m[`${i.dataset.r},${i.dataset.c}`] = i.value; return m; }, {});
  host.innerHTML = '';
  host.style.setProperty('--cols', c);
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) {
    const inp = document.createElement('input');
    inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off';
    inp.dataset.r = i; inp.dataset.c = j;
    inp.setAttribute('aria-label', `${name.toUpperCase()} matrisi ${i + 1}. satır ${j + 1}. sütun`);
    inp.value = old[`${i},${j}`] ?? '';
    host.appendChild(inp);
  }
}
function readGrid(name) {
  const r = Number($(`${name}-rows`).value), c = Number($(`${name}-cols`).value);
  const inputs = $(`grid-${name}`).querySelectorAll('input');
  const M = Array.from({ length: r }, () => Array(c).fill(0));
  for (const inp of inputs) {
    const raw = inp.value.trim();
    const v = raw === '' ? 0 : parseNum(raw); // boş hücre 0 sayılır
    if (Number.isNaN(v)) throw new Error(`${name.toUpperCase()} matrisinde "${raw}" geçerli bir sayı değil. Rakam kullanın, ondalık için virgül ya da nokta yazın (örn. 2,5).`);
    M[Number(inp.dataset.r)][Number(inp.dataset.c)] = v;
  }
  return M;
}
function syncOp() {
  const op = $('op').value;
  $('b-box').hidden = !NEEDS_B.has(op);
  $('k-wrap').hidden = op !== 'scale';
}

function renderMatrix(M) {
  const t = document.createElement('table');
  t.className = 'mx-table';
  for (const row of M) {
    const tr = t.insertRow();
    for (const v of row) tr.insertCell().textContent = fmt(v);
  }
  return t;
}

function run() {
  showError($('error'), '');
  const out = $('r-body'); out.innerHTML = '';
  try {
    const op = $('op').value, A = readGrid('a');
    const ar = A.length, ac = A[0].length;
    let title, value, matrix;
    if (NEEDS_B.has(op)) {
      const B = readGrid('b'), br = B.length, bc = B[0].length;
      if (op !== 'mul' && (ar !== br || ac !== bc)) throw new Error(`Toplama ve çıkarmada A (${ar}×${ac}) ile B (${br}×${bc}) aynı boyutta olmalı. Satır ve sütun sayılarını eşitleyin.`);
      if (op === 'mul' && ac !== br) throw new Error(`Çarpma için A'nın sütun sayısı (${ac}) B'nin satır sayısına (${br}) eşit olmalı. Boyutları düzeltin.`);
      matrix = op === 'add' ? add(A, B) : op === 'sub' ? sub(A, B) : mul(A, B);
      title = op === 'add' ? 'A + B' : op === 'sub' ? 'A − B' : 'A × B';
    } else if (op === 'scale') {
      const k = parseNum($('k').value);
      if (Number.isNaN(k)) throw new Error('Çarpan geçerli bir sayı olmalı (örn. 3 ya da 0,5).');
      matrix = scale(A, k); title = `${$('k').value.trim()} · A`;
    } else if (op === 'transpose') { matrix = transpose(A); title = 'Aᵀ (devrik)'; }
    else {
      if (ar !== ac) throw new Error(`Determinant ve ters matris yalnızca kare matriste hesaplanır; A şu an ${ar}×${ac}. Satır ve sütun sayısını eşitleyin.`);
      if (op === 'det') { value = det(A); title = 'det(A)'; }
      else {
        const inv = inverse(A);
        if (!inv) throw new Error('A matrisinin determinantı 0; ters matrisi yoktur (tekil matris). Satırlardan birinin diğerinin katı olmadığını kontrol edin.');
        matrix = inv; title = 'A⁻¹ (ters matris)';
      }
    }
    $('r-title').textContent = title;
    if (matrix) { out.appendChild(renderMatrix(matrix)); $('r-text').value = matrix.map((r) => r.map(fmt).join('\t')).join('\n'); }
    else { const p = document.createElement('p'); p.className = 'mx-value'; p.id = 'r-value'; p.textContent = fmt(value); out.appendChild(p); $('r-text').value = fmt(value); }
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

for (const n of ['a', 'b']) { $(`${n}-rows`).addEventListener('change', () => buildGrid(n)); $(`${n}-cols`).addEventListener('change', () => buildGrid(n)); buildGrid(n); }
$('op').addEventListener('change', syncOp); syncOp();
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  document.querySelectorAll('.mx-grid input').forEach((i) => { i.value = ''; });
  $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText($('r-text').value); st.textContent = "Sonuç panoya kopyalandı (sekmeyle ayrılmış, Excel'e yapıştırılabilir)."; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
