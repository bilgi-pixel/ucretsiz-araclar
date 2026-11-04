// İndirim Oranı Hesaplama — tamamı tarayıcıda çalışır.
import { showError } from '../assets/js/ba.js';
const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => nf2.format(n) + ' TL';

/** Türkçe ondalık (virgül) ve binlik (nokta) biçimlerini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL|tl/g, '');
  const neg = t.startsWith('-');
  if (neg) t = t.slice(1);
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(','), hasD = t.includes('.');
  if (hasC && hasD) t = t.replace(/\./g, '').replace(',', '.');
  else if (hasC) t = t.replace(',', '.');
  else if (hasD && /^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if ((t.match(/\./g) || []).length > 1) return NaN;
  return neg ? -Number(t) : Number(t);
}
/** Boş alan 0 sayılır (isteğe bağlı alanlar); geçersizse NaN. */
export function parseOpt(s) { return String(s ?? '').trim() === '' ? 0 : parseNum(s); }
function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(msg) { hideResult($('result')); showError($('error'), msg); }
async function loadParams(defaults, lineEl) {
  let p = defaults;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) p = { ...defaults, ...(await res.json()) };
  } catch (e) { /* çevrimdışı önbellekte olmayabilir; varsayılanlar kullanılır */ }
  if (lineEl) {
    const d = new Date(p.guncelleme);
    const txt = Number.isNaN(d.getTime()) ? p.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    lineEl.textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + p.kaynak;
  }
  return p;
}

const pct = (n) => '%' + nf.format(Math.round(n * 100) / 100);
const rows = [];
const add = (label, value, strong) => rows.push({ label, value, strong });

function modeChanged() {
  const m = $('mode').value;
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== m; });
}

function run() {
  showError($('error'), '');
  rows.length = 0;
  const m = $('mode').value;
  let head = '';
  if (m === 'oran') {
    const o = parseNum($('o-old').value), n = parseNum($('o-new').value);
    if (!(o > 0) || !(n >= 0)) return fail('Eski ve yeni fiyatı sayı olarak girin (eski fiyat sıfırdan büyük olmalı). Örnek: 1.250,00 ve 999,90.');
    const d = (o - n) / o * 100;
    head = d >= 0 ? 'İndirim oranı ' + pct(d) : 'Fiyat arttı: ' + pct(-d);
    add(d >= 0 ? 'İndirim oranı' : 'Zam oranı', pct(Math.abs(d)), true);
    add(d >= 0 ? 'Tasarruf' : 'Ek maliyet', money(Math.abs(o - n)));
  } else if (m === 'fiyat') {
    const p = parseNum($('f-price').value), r = parseNum($('f-pct').value);
    if (!(p > 0) || Number.isNaN(r) || r < 0 || r > 100) return fail('Fiyatı sıfırdan büyük, indirim oranını 0 ile 100 arasında girin. Örnek: 1.000 TL ve 20.');
    const fin = p * (1 - r / 100);
    head = 'İndirimli fiyat ' + money(fin);
    add('İndirimli fiyat', money(fin), true);
    add('Tasarruf', money(p - fin));
    add('Ödenecek oran', pct(100 - r));
  } else if (m === 'ardisik') {
    const p = parseOpt($('c-price').value);
    const ids = ['c-1', 'c-2', 'c-3'];
    const ps = ids.map((id) => parseOpt($(id).value));
    if (Number.isNaN(p) || p < 0 || ps.some((v) => Number.isNaN(v) || v < 0 || v > 100)) return fail('Oranlar 0 ile 100 arasında, fiyat pozitif bir sayı olmalı. Örnek: 20 ve 10.');
    if (!ids.some((id) => $(id).value.trim())) return fail('En az bir indirim oranı girin. Ardışık indirim için ikinci alanı da doldurun (örnek: 20 ve 10).');
    const left = ps.reduce((a, v) => a * (1 - v / 100), 1);
    const total = (1 - left) * 100, simple = ps.reduce((a, v) => a + v, 0);
    head = 'Toplam indirim ' + pct(total);
    add('Gerçek toplam indirim', pct(total), true);
    add('Oranları toplarsanız (yanlış yöntem)', pct(simple));
    add('Aradaki fark', nf.format(Math.round((simple - total) * 100) / 100) + ' puan');
    if (p > 0) { add('Son fiyat', money(p * left), true); add('Tasarruf', money(p - p * left)); }
  } else {
    const c = parseNum($('s-claimed').value), s = parseNum($('s-sale').value), low = parseNum($('s-low').value);
    if (!(c > 0) || !(s > 0) || !(low > 0)) return fail('Üç fiyatı da sıfırdan büyük sayılarla girin: etiketteki eski fiyat, indirimli fiyat ve son 30 günde gördüğünüz en düşük fiyat.');
    const claimed = (c - s) / c * 100, real = (low - s) / low * 100;
    add('Etiketin iddia ettiği indirim', pct(claimed));
    add('En düşük fiyata göre gerçek fark', real >= 0 ? pct(real) + ' indirim' : pct(-real) + ' pahalı', true);
    if (c > low) add('Etiketteki eski fiyat, en düşük fiyattan', pct((c - low) / low * 100) + ' yüksek');
    if (s > low * 1.0001) head = 'Gerçek indirim yok: fiyat, görülen en düşük fiyattan ' + pct(-real) + ' yüksek';
    else if (Math.abs(real) < 0.01) head = 'Gerçek indirim yok: fiyat daha önce görülen en düşük fiyatla aynı';
    else if (c > low * 1.1 && claimed - real > 5) head = 'Şüpheli: eski fiyat şişirilmiş görünüyor (iddia ' + pct(claimed) + ', gerçek ' + pct(real) + ')';
    else head = 'Makul görünüyor: gerçek indirim ' + pct(real);
  }
  $('r-head').textContent = head;
  $('r-rows').innerHTML = rows.map((r) => '<div class="kdv-row' + (r.strong ? ' is-strong' : '') + '"><dt>' + r.label + '</dt><dd>' + r.value + '</dd></div>').join('');
  showResult($('result'));
}

$('mode').addEventListener('change', () => { modeChanged(); hideResult($('result')); showError($('error'), ''); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => { $('form').reset(); modeChanged(); hideResult($('result')); showError($('error'), ''); });
modeChanged();
