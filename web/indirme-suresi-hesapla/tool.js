// İndirme süresi hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calc, quickCell } from './hesap.js';

const $ = (id) => document.getElementById(id);
const val = (id) => ($(id) ? $(id).value : '');

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }
function currentBase() { return Number(document.querySelector('input[name="base"]:checked').value); }

/** Seçili moda ait alan gruplarını gösterir, diğerlerini gizler. */
function syncMode() {
  const m = currentMode();
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = !p.dataset.panel.split(' ').includes(m); });
  hideResult(); showError($('error'), '');
}

function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); }

function collect(mode) {
  const common = { base: currentBase(), eff: val('f-eff') };
  if (mode === 'time') return { ...common, size: val('f-size'), sizeUnit: val('f-size-unit'), speed: val('f-speed'), speedUnit: val('f-speed-unit') };
  if (mode === 'speed') return { ...common, size: val('f-size'), sizeUnit: val('f-size-unit'), time: val('f-time'), timeUnit: val('f-time-unit') };
  return { ...common, value: val('f-cv'), unit: val('f-cv-unit') };
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
  $('copy-status').textContent = '';
}

function run() {
  showError($('error'), '');
  try {
    last = calc(currentMode(), collect(currentMode()));
    render(last);
  } catch (e) {
    last = null;
    hideResult();
    showError($('error'), e.message);
  }
}

/** Hızlı tablodaki hücreleri seçili tabana göre yeniden doldurur. */
function renderQuick() {
  const base = currentBase();
  document.querySelectorAll('#quick tbody tr').forEach((tr) => {
    tr.querySelectorAll('td[data-mbps]').forEach((td) => {
      td.textContent = quickCell(Number(tr.dataset.size), tr.dataset.unit, Number(td.dataset.mbps), base);
    });
  });
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
document.querySelectorAll('input[name="base"]').forEach((r) => r.addEventListener('change', () => { renderQuick(); hideResult(); }));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  last = null; syncMode(); renderQuick();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last.summary); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Hızlı seçim düğmeleri: alanı doldurur, hesaplamayı kullanıcı başlatır.
document.querySelectorAll('.id-chip[data-size]').forEach((b) => b.addEventListener('click', () => {
  $('f-size').value = b.dataset.size; $('f-size-unit').value = b.dataset.unit;
}));
document.querySelectorAll('.id-chip[data-speed]').forEach((b) => b.addEventListener('click', () => {
  $('f-speed').value = b.dataset.speed; $('f-speed-unit').value = b.dataset.unit || 'mbps';
}));
document.querySelectorAll('.id-chip[data-eff]').forEach((b) => b.addEventListener('click', () => { $('f-eff').value = b.dataset.eff; }));

syncMode();
renderQuick();
