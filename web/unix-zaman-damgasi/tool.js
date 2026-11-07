// Unix Zaman Damgası Dönüştürücü — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseStamp, toMs, formatIn, isoUtc, fromLocalInput, relative, TR_ZONE } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { useGrouping: false });
const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'cihaz';
const show = (el) => { el.hidden = false; el.classList.add('is-active'); };
const hide = (el) => { el.hidden = true; el.classList.remove('is-active'); };

$('o-local-l').textContent = `Cihazınızın saati (${deviceZone})`;

/* Şu anki Unix zamanı — her saniye güncellenen gerçek saat (geri sayım değil). */
const tickNow = () => { $('now-sec').textContent = String(Math.floor(Date.now() / 1000)); };
tickNow(); setInterval(tickNow, 1000);

function runStamp() {
  showError($('error'), '');
  try {
    const { ms, unit } = toMs(parseStamp($('ts').value), $('unit').value);
    const tr = formatIn(ms, TR_ZONE), local = formatIn(ms, undefined);
    $('o-iso').textContent = isoUtc(ms);
    $('o-tr').textContent = `${tr.text} (${tr.weekday})`;
    $('o-local').textContent = `${local.text} (${local.weekday})`;
    $('o-rel').textContent = relative(ms);
    $('o-unit').textContent = unit === 'ms' ? 'milisaniye' : 'saniye';
    show($('res-ts'));
  } catch (e) { hide($('res-ts')); showError($('error'), e.message); }
}

function runDate() {
  showError($('error2'), '');
  try {
    const ms = fromLocalInput($('dt').value, $('tz').value);
    $('o-sec').textContent = nf.format(Math.floor(ms / 1000));
    $('o-ms').textContent = nf.format(ms);
    $('o-iso2').textContent = isoUtc(ms);
    show($('res-dt'));
  } catch (e) { hide($('res-dt')); showError($('error2'), e.message); }
}

$('form-ts').addEventListener('submit', (e) => { e.preventDefault(); runStamp(); });
$('form-dt').addEventListener('submit', (e) => { e.preventDefault(); runDate(); });
$('ts-now').addEventListener('click', () => { $('ts').value = String(Math.floor(Date.now() / 1000)); $('unit').value = 's'; runStamp(); });
$('dt-now').addEventListener('click', () => {
  const n = new Date(), p = (v) => String(v).padStart(2, '0');
  $('dt').value = `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
  $('tz').value = 'local'; runDate();
});
for (const b of document.querySelectorAll('[data-copy]')) {
  b.addEventListener('click', async () => {
    const st = $('copy-status');
    try { await navigator.clipboard.writeText($(b.dataset.copy).textContent); st.textContent = 'Panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; değeri elle seçip kopyalayın.'; }
  });
}
