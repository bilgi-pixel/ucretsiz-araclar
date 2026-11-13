// XML formatter — everything runs in the browser with DOMParser; nothing is uploaded.
import { showError } from '../assets/js/ba.js';
import { format, minify, parse, stats } from './logic.js';

const $ = (id) => document.getElementById(id);
const T = {'empty': 'Önce biçimlendirilecek XML’i kutuya yapıştırın ya da bir .xml dosyası seçin.', 'bad': 'XML geçerli değil{line}. Ayrıntı: {msg}', 'line': ' (satır {n})', 'ok': 'Geçerli XML. Kök: <{root}>, {e} eleman, {a} öznitelik, en fazla {d} seviye derinlik.', 'copied': 'Sonuç panoya kopyalandı.', 'nocopy': 'Kopyalanamadı; metni seçip elle kopyalayın.', 'big': 'Dosya çok büyük (en fazla 5 MB).', 'loc': 'tr-TR'};
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
  const a = document.createElement('a'); a.href = url; a.download = 'bicimlendirilmis.xml'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
