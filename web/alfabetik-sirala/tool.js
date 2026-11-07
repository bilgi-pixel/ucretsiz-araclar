// Alfabetik Sıralama (Türkçe) — tamamı tarayıcıda çalışır; metniniz sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { sortLines } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
let last = '';

function run() {
  showError($('error'), '');
  const text = $('input').value;
  if (!text.trim()) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), 'Sıralanacak metin boş. Her satıra bir öğe gelecek şekilde listenizi kutuya yapıştırın.');
    return;
  }
  const r = sortLines(text, {
    mode: $('mode').value, lang: $('lang').value, desc: $('opt-desc').checked, ignoreCase: $('opt-ci').checked,
    numeric: $('opt-num').checked, dedupe: $('opt-dedupe').checked, dropEmpty: $('opt-empty').checked, trim: $('opt-trim').checked,
  });
  last = r.lines.join('\n');
  $('output').value = last;
  const parts = [`${nf.format(r.lines.length)} satır sıralandı`];
  if (r.removedDupes) parts.push(`${nf.format(r.removedDupes)} yinelenen satır silindi`);
  if (r.removedEmpty) parts.push(`${nf.format(r.removedEmpty)} boş satır silindi`);
  $('r-stats').textContent = parts.join(' · ') + '.';
  $('result').hidden = false; $('result').classList.add('is-active');
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('input').value = ''; $('output').value = ''; last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), ''); $('input').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sıralı liste panoya kopyalandı.'; }
  catch { $('output').select(); st.textContent = 'Kopyalanamadı; liste seçildi, Ctrl+C ile kopyalayabilirsiniz.'; }
});
