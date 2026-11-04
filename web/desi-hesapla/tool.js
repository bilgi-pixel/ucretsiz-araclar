// Desi Hesaplama — tamamı tarayıcıda çalışır; ölçüler sunucuya gitmez.
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

let P = { kara_bolen: 3000, hava_bolen: 5000, guncelleme: '2026-11-04', kaynak: 'Kargo sektörü bölenleri' };
loadParams(P, $('params-line')).then((p) => { P = p; });

let seq = 0;
const boxes = $('boxes');

function addBox() {
  seq++;
  const n = boxes.children.length + 1;
  const row = document.createElement('div');
  row.className = 'box-row';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', 'Koli ' + n);
  const f = (cls, label, hint) => '<div class="ba-field"><label for="' + cls + seq + '">' + label + '</label><input id="' + cls + seq + '" class="' + cls + '" type="text" inputmode="decimal" autocomplete="off" placeholder="' + hint + '"></div>';
  row.innerHTML = '<div class="box-head"><strong class="box-title">Koli ' + n + '</strong><button type="button" class="ba-btn box-del">Sil</button></div>' +
    '<div class="box-grid">' + f('b-en', 'En (cm)', '40') + f('b-boy', 'Boy (cm)', '30') + f('b-yuk', 'Yükseklik (cm)', '20') + f('b-kg', 'Gerçek ağırlık (kg)', 'isteğe bağlı') + f('b-qty', 'Adet', '1') + '</div>';
  row.querySelector('.b-qty').value = '1';
  row.querySelector('.box-del').addEventListener('click', () => {
    if (boxes.children.length > 1) { row.remove(); renumber(); } else { row.querySelectorAll('input').forEach((i) => { i.value = ''; }); row.querySelector('.b-qty').value = '1'; }
    hideResult($('result'));
  });
  boxes.appendChild(row);
  return row;
}
function renumber() {
  [...boxes.children].forEach((r, i) => { r.setAttribute('aria-label', 'Koli ' + (i + 1)); r.querySelector('.box-title').textContent = 'Koli ' + (i + 1); });
}
/** Yukarı yuvarlama; kayan nokta artığı (8.0000001) yüzünden bir üst desiye atlamasın. */
const ceil = (x) => Math.ceil(x - 1e-9);

/** Saf hesap: hacimsel desi = en x boy x yükseklik / bölen; faturalanan = max(desi, kg). */
export function calcBox(en, boy, yuk, kg, divisor) {
  const desi = en * boy * yuk / divisor;
  return { desi, kg, billable: ceil(Math.max(desi, kg)), byWeight: kg > desi };
}

function run() {
  showError($('error'), '');
  const divisor = $('divisor').value === 'hava' ? P.hava_bolen : P.kara_bolen;
  const lines = [];
  let totDesi = 0, totKg = 0, totBill = 0;
  for (const [i, row] of [...boxes.children].entries()) {
    const g = (c) => row.querySelector('.' + c).value;
    const en = parseNum(g('b-en')), boy = parseNum(g('b-boy')), yuk = parseNum(g('b-yuk')), kg = parseOpt(g('b-kg')), qty = parseNum(g('b-qty'));
    if ([en, boy, yuk].some((v) => !(v > 0) || v > 1000)) return fail('Koli ' + (i + 1) + ': en, boy ve yüksekliği santimetre cinsinden, 0\'dan büyük ve 1000\'den küçük sayılarla girin (örnek: 40, 30, 20).');
    if (Number.isNaN(kg) || kg < 0 || kg > 2000) return fail('Koli ' + (i + 1) + ': gerçek ağırlığı kilogram olarak girin ya da boş bırakın (örnek: 2,5).');
    if (!Number.isInteger(qty) || qty < 1 || qty > 999) return fail('Koli ' + (i + 1) + ': adet 1 ile 999 arasında tam sayı olmalı.');
    const b = calcBox(en, boy, yuk, kg, divisor);
    totDesi += b.desi * qty; totKg += kg * qty; totBill += b.billable * qty;
    lines.push('<li>Koli ' + (i + 1) + ' (' + nf.format(en) + '×' + nf.format(boy) + '×' + nf.format(yuk) + ' cm, ' + qty + ' adet): ' + nf.format(b.desi) + ' desi, ' + nf.format(kg) + ' kg → faturalanan ' + nf.format(b.billable) + ' ' + (b.byWeight ? 'kg (ağırlık)' : 'desi (hacim)') + (qty > 1 ? ' × ' + qty : '') + '</li>');
  }
  $('r-desi').textContent = nf.format(totDesi) + ' desi';
  $('r-kg').textContent = nf.format(totKg) + ' kg';
  $('r-bill').textContent = nf.format(totBill);
  $('r-which').textContent = totKg === 0 ? 'Ağırlık girilmedi; hacimsel değer esas alındı.' : (totKg > totDesi ? 'Gerçek ağırlık hacimsel değerden büyük: ağırlık (kg) faturalanır.' : 'Hacimsel değer gerçek ağırlıktan büyük veya eşit: desi faturalanır.');
  $('r-lines').innerHTML = lines.join('');
  showResult($('result'));
}

$('add').addEventListener('click', () => { if (boxes.children.length >= 20) return fail('En fazla 20 koli ekleyebilirsiniz. Aynı ölçüdeki kolileri tek satırda "adet" ile girin.'); addBox().querySelector('input').focus(); renumber(); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => { boxes.innerHTML = ''; addBox(); hideResult($('result')); showError($('error'), ''); boxes.querySelector('input').focus(); });
addBox();
