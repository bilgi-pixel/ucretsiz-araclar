// Video boyutu hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez, video dosyası seçilmez.
import { showError } from '../assets/js/ba.js';
import { calc } from './hesap.js';

const $ = (id) => document.getElementById(id);
const val = (id) => ($(id) ? $(id).value : '');

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }
function currentBase() { return Number(document.querySelector('input[name="base"]:checked').value); }

function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); }

/** Seçili moda ait alan gruplarını gösterir, diğerlerini gizler. */
function syncMode() {
  const m = currentMode();
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = !p.dataset.panel.split(' ').includes(m); });
  hideResult(); showError($('error'), '');
}

function collect() {
  return {
    base: currentBase(),
    vbr: val('f-vbr'), vbrUnit: val('f-vbr-unit'), abr: val('f-abr'),
    h: val('f-h'), m: val('f-m'), s: val('f-s'),
    target: val('f-target'), targetUnit: val('f-target-unit'),
    cap: val('f-cap'), capUnit: val('f-cap-unit'),
    res: val('f-res'), fps: val('f-fps'), depth: val('f-depth'),
  };
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
    last = calc(currentMode(), collect());
    render(last);
  } catch (e) {
    last = null;
    hideResult();
    showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
document.querySelectorAll('input[name="base"]').forEach((r) => r.addEventListener('change', hideResult));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  last = null; syncMode();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last.summary); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Hazır profil: değer "birim:sayı" (örn. "mbps:8"); video bit hızı alanını doldurur, hesabı kullanıcı başlatır.
$('profile').addEventListener('change', () => {
  const p = val('profile');
  if (!p) return;
  const [unit, num] = p.split(':');
  $('f-vbr-unit').value = unit; $('f-vbr').value = num;
});
// Elle bit hızı yazılırsa profil seçimi artık geçerli değildir.
$('f-vbr').addEventListener('input', () => { $('profile').value = ''; });

// Hızlı seç düğmeleri (kapasite ve hedef boyut).
document.querySelectorAll('.vb-chip[data-cap]').forEach((b) => b.addEventListener('click', () => {
  $('f-cap').value = b.dataset.cap; $('f-cap-unit').value = b.dataset.unit;
}));
document.querySelectorAll('.vb-chip[data-target]').forEach((b) => b.addEventListener('click', () => {
  $('f-target').value = b.dataset.target; $('f-target-unit').value = b.dataset.unit;
}));

syncMode();
