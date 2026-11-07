// Alphabetize List: runs entirely in your browser; your text is never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { sortLines } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US');
let last = '';

function run() {
  showError($('error'), '');
  const text = $('input').value;
  if (!text.trim()) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), 'There is nothing to sort. Paste your list into the box with one item per line.');
    return;
  }
  const r = sortLines(text, {
    mode: $('mode').value, lang: $('lang').value, desc: $('opt-desc').checked, ignoreCase: $('opt-ci').checked,
    numeric: $('opt-num').checked, dedupe: $('opt-dedupe').checked, dropEmpty: $('opt-empty').checked, trim: $('opt-trim').checked,
  });
  last = r.lines.join('\n');
  $('output').value = last;
  const parts = [`${nf.format(r.lines.length)} ${r.lines.length === 1 ? 'line' : 'lines'} sorted`];
  if (r.removedDupes) parts.push(`${nf.format(r.removedDupes)} duplicate ${r.removedDupes === 1 ? 'line' : 'lines'} removed`);
  if (r.removedEmpty) parts.push(`${nf.format(r.removedEmpty)} blank ${r.removedEmpty === 1 ? 'line' : 'lines'} removed`);
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
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sorted list copied to the clipboard.'; }
  catch { $('output').select(); st.textContent = 'Could not copy; the list is selected, so press Ctrl+C to copy it.'; }
});
