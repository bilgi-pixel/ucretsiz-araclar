// Ay Evresi Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz tarih sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseTrDateTime, moonInfo, fmtTr, TR_OFFSET_MS } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
let last = '';

function trToday() {
  const d = new Date(Date.now() + TR_OFFSET_MS);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`;
}

function run() {
  showError($('error'), '');
  try {
    const ms = parseTrDateTime($('date').value, $('time').value || '12:00');
    const m = moonInfo(ms);
    const pct = nf.format(m.illumination * 100);
    $('r-icon').textContent = m.icon;
    $('r-big').textContent = `${m.name} · %${pct} aydınlık`;
    $('r-name').textContent = m.name;
    $('r-illum').textContent = `%${pct}`;
    $('r-age').textContent = `${nf.format(m.ageDays)} gün (${m.waxing ? 'büyüyor' : 'küçülüyor'})`;
    $('r-prev').textContent = fmtTr(m.prevNew);
    const rows = [['r-next-new', 0], ['r-next-first', 1], ['r-next-full', 2], ['r-next-last', 3]];
    for (const [id, ph] of rows) $(id).textContent = fmtTr(m.nextOf(ph).ms);
    last = `${fmtTr(ms)}: ${m.name}, %${pct} aydınlık, Ay'ın yaşı ${nf.format(m.ageDays)} gün. Sonraki dolunay: ${fmtTr(m.nextOf(2).ms)}; sonraki yeni ay: ${fmtTr(m.nextOf(0).ms)}.`;
    $('result').hidden = false; $('result').classList.add('is-active');
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

$('date').value = trToday();
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('today').addEventListener('click', () => {
  const d = new Date(Date.now() + TR_OFFSET_MS);
  $('date').value = trToday();
  $('time').value = `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  run();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
