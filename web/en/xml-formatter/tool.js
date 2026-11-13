// XML formatter — everything runs in the browser with DOMParser; nothing is uploaded.
import { showError } from '../../assets/js/ba.js';
import { format, minify, parse, stats } from '../../xml-bicimlendir/logic.js';

const $ = (id) => document.getElementById(id);
const T = {'empty': 'Paste the XML you want to format into the box, or choose an .xml file.', 'bad': 'The XML is not valid{line}. Details: {msg}', 'line': ' (line {n})', 'ok': 'Valid XML. Root: <{root}>, {e} elements, {a} attributes, up to {d} levels deep.', 'copied': 'Result copied to the clipboard.', 'nocopy': 'Could not copy; select the text and copy it manually.', 'big': 'File too large (max 5 MB).', 'loc': 'en-US'};
const nf = new Intl.NumberFormat(T.loc);

function run(mode) {
  showError($('error'), '');
  const src = $('src').value;
  if (!src.trim()) { showError($('error'), T.empty); return; }
  const ind = $('ind').value === 'tab' ? '\t' : ' '.repeat(Number($('ind').value));
  const r = mode === 'min' ? minify(src) : format(src, ind);
  if (r.error) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), T.bad.replace('{line}', r.line ? T.line.replace('{n}', String(r.line)) : '').replace('{msg}', r.error.slice(0, 300)));
    return;
  }
  $('out').value = r.xml;
  const s = stats(parse(src).doc);
  $('info').textContent = T.ok.replace('{root}', s.root).replace('{e}', nf.format(s.elements)).replace('{a}', nf.format(s.attributes)).replace('{d}', String(s.depth));
  $('status').textContent = '';
  $('result').hidden = false; $('result').classList.add('is-active');
}

$('fmt').addEventListener('click', () => run('fmt'));
$('min').addEventListener('click', () => run('min'));
$('file').addEventListener('change', async () => {
  const f = $('file').files[0];
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) { showError($('error'), T.big); return; }
  $('src').value = await f.text();
  run('fmt');
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('out').value); $('status').textContent = T.copied; }
  catch { $('status').textContent = T.nocopy; }
});
$('dl').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([$('out').value], { type: 'application/xml' }));
  const a = document.createElement('a'); a.href = url; a.download = 'formatted.xml'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
