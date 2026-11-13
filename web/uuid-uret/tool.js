// UUID generator — runs entirely in the browser with crypto.getRandomValues; nothing is sent anywhere.
import { showError } from '../assets/js/ba.js';
import { uuidv4, uuidv7, format, inspect } from './logic.js';

const $ = (id) => document.getElementById(id);
const T = {'cnt': 'Adet 1 ile 1000 arasında bir tam sayı olmalı.', 'empty': 'Kontrol etmek için bir UUID yapıştırın.', 'bad': 'Bu metin geçerli bir UUID değil. UUID 32 onaltılık karakterden oluşur, genellikle 8-4-4-4-12 biçiminde tirelerle yazılır.', 'nil': 'Geçerli: bu "nil UUID", yani tüm bitleri sıfır olan özel değer.', 'okv': 'Geçerli UUID. Sürüm: {v}, varyant: {var}.', 'time': ' Oluşturulma zamanı: {t}.', 'copied': '{n} UUID panoya kopyalandı.', 'nocopy': 'Kopyalanamadı; metni seçip elle kopyalayın.', 'loc': 'tr-TR'};

function generate() {
  showError($('error'), '');
  const n = Number($('count').value.trim());
  if (!Number.isInteger(n) || n < 1 || n > 1000) { showError($('error'), T.cnt); return; }
  const ver = $('ver').value;
  const opts = { upper: $('upper').checked, hyphens: !$('nohy').checked, braces: $('braces').checked };
  const out = [];
  for (let i = 0; i < n; i++) out.push(format(ver === '7' ? uuidv7() : uuidv4(), opts));
  $('out').value = out.join('\n');
  $('status').textContent = '';
  $('result').hidden = false; $('result').classList.add('is-active');
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('out').value); $('status').textContent = T.copied.replace('{n}', String($('out').value.split('\n').filter(Boolean).length)); }
  catch { $('status').textContent = T.nocopy; }
});
$('form-check').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = $('chk').value;
  const msg = $('c-msg');
  if (!v.trim()) { msg.textContent = T.empty; return; }
  const r = inspect(v);
  if (!r.ok) { msg.textContent = T.bad; return; }
  if (r.nil) { msg.textContent = T.nil; return; }
  let s = T.okv.replace('{v}', String(r.version)).replace('{var}', r.variant);
  if (r.time) s += T.time.replace('{t}', r.time.toLocaleString(T.loc));
  msg.textContent = s;
});
generate();
