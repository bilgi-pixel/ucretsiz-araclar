// Emekli ikramiyesi ve zam hesabı (tahmini) — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcIkramiye, calcZam, calcBayram } from './hesap.js';

const $ = (id) => document.getElementById(id);
// parametreler.json yüklenemezse kullanılacak varsayılanlar.
let par = { guncelleme: '2026-11-04', bayram_ikramiyesi_tl: 4000, bayram_sayisi_yillik: 2, ikramiye_azami_hizmet_yili: 30 };

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }
function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); }
function syncMode() {
  const m = currentMode();
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== m; });
  hideResult(); showError($('error'), '');
}

let last = null;
function render(res) {
  const dl = $('rows'); dl.textContent = '';
  res.rows.forEach(([label, value, strong]) => {
    const row = document.createElement('div'); row.className = 'kdv-row' + (strong ? ' is-strong' : '');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    row.append(dt, dd); dl.appendChild(row);
  });
  $('r-notes').textContent = res.notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try {
    const m = currentMode();
    if (m === 'ikramiye') last = calcIkramiye({ salary: $('i-salary').value, gosterge: $('i-gosterge').value, ek: $('i-ek').value, katsayi: $('i-katsayi').value, years: $('i-years').value, months: $('i-months').value }, par);
    else if (m === 'zam') last = calcZam({ salary: $('z-salary').value, rate: $('z-rate').value, period: $('z-period').value });
    else last = calcBayram({ amount: $('b-amount').value, count: $('b-count').value });
    render(last);
  } catch (e) {
    last = null; hideResult(); showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').querySelectorAll('input[type="text"]').forEach((i) => { i.value = ''; });
  $('b-amount').value = String(par.bayram_ikramiyesi_tl).replace('.', ','); $('b-count').value = '1';
  hideResult(); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last.summary); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) par = { ...par, ...(await res.json()) };
  } catch { /* gömülü varsayılanlar kullanılır */ }
  if (!$('b-amount').value) $('b-amount').value = String(par.bayram_ikramiyesi_tl);
  $('param-date').textContent = new Date(par.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
syncMode(); init();
