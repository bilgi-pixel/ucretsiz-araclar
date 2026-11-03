// Yakıt Tüketimi ve Yol Masrafı — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez, fiyat verisi gömülü değildir.
import { showError } from '../assets/js/ba.js';
import { calc } from './hesap.js';

const $ = (id) => document.getElementById(id);
const val = (id) => ($(id) ? $(id).value : '');

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

/** Seçili moda ait alan grubunu gösterir, diğerlerini gizler. */
function syncMode() {
  const m = currentMode();
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = !p.dataset.panel.split(' ').includes(m); });
  $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), '');
}

function collect(mode) {
  if (mode === 'cost') return { km: val('c-km'), cons: val('c-cons'), price: val('c-price'), people: val('c-people'), round: $('c-round').checked, monthly: val('c-monthly') };
  if (mode === 'ev') return { km: val('e-km'), cons: val('e-cons'), price: val('e-price'), people: val('e-people'), round: $('e-round').checked, monthly: val('e-monthly') };
  if (mode === 'range') return { tank: val('r-tank'), cons: val('r-cons'), price: val('r-price') };
  return { liters: val('k-liters'), km: val('k-km'), price: val('k-price') };
}

let last = null;
function render(res) {
  const dl = $('rows');
  dl.textContent = '';
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
    last = calc(currentMode(), collect(currentMode()));
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').querySelectorAll('input[type="text"]').forEach((i) => { i.value = ''; });
  $('form').querySelectorAll('input[type="checkbox"]').forEach((i) => { i.checked = false; });
  $('c-people').value = '1'; $('e-people').value = '1';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last.summary); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Mesafe tablosundaki "Kullan" düğmeleri: km alanını doldurur ve yol maliyeti moduna geçer.
document.querySelectorAll('[data-km]').forEach((b) => b.addEventListener('click', () => {
  document.querySelector('input[name="mode"][value="cost"]').checked = true;
  syncMode();
  $('c-km').value = b.dataset.km;
  $('c-cons').focus();
}));

syncMode();
