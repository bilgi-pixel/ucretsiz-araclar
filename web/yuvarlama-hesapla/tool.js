// Sayı yuvarlama arayüzü — tarayıcıda; BigInt ile kayan nokta hatası olmadan.
import { showError } from '../assets/js/ba.js';
import { roundValue } from './logic.js';

const $ = (id) => document.getElementById(id);
const IDS = { 'yarim-yukari': 'r-half', tavan: 'r-ceil', taban: 'r-floor', kes: 'r-trunc', bankaci: 'r-bank' };

function usingStep() { return document.querySelector('input[name="by"]:checked').value === 'step'; }
function syncBy() {
  $('digits-wrap').hidden = usingStep(); $('step-wrap').hidden = !usingStep();
}
document.querySelectorAll('input[name="by"]').forEach((r) => r.addEventListener('change', syncBy));
syncBy();

function run() {
  showError($('error'), '');
  try {
    if (usingStep() && !$('step').value.trim()) throw new Error('Yuvarlama katını yazın (örn. 0,05 ya da 5) ya da "Basamağa göre" seçeneğine geçin.');
    const opts = usingStep() ? { step: $('step').value } : { digits: $('digits').value === '' ? 0 : Number($('digits').value) };
    const out = {};
    for (const m of Object.keys(IDS)) out[m] = roundValue($('value').value, m, opts);
    for (const [m, id] of Object.entries(IDS)) $(id).textContent = out[m];
    $('result').hidden = false; $('result').classList.add('is-active');
    $('r-note').textContent = usingStep()
      ? `${$('value').value.trim()} sayısı, ${$('step').value.trim()} katlarına yuvarlandı.`
      : `${$('value').value.trim()} sayısı, ${Number($('digits').value || 0)} ondalık basamağa yuvarlandı.`;
  } catch (e) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('value').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), ''); $('value').focus();
});
document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText($(b.dataset.copy).textContent); st.textContent = 'Değer panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; değeri elle seçip kopyalayın.'; }
}));
