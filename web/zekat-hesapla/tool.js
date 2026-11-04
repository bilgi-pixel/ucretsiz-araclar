// Zekat Hesaplama — tamamı tarayıcıda çalışır; tutarlar sunucuya gitmez.
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

let P = { altin_nisap_gram: 80.18, gumus_nisap_gram: 595, oran: 0.025, guncelleme: '2026-11-04', kaynak: 'Diyanet İşleri Başkanlığı' };
loadParams(P, $('params-line')).then((p) => { P = p; });

/** Saf hesap: varlık toplamı - borç = net; net >= nisap ise net * oran. */
export function calcZekat({ nisap, cash, goldGram, goldPrice, fx, recv, trade, debt }, oran = 0.025) {
  const total = cash + goldGram * goldPrice + fx + recv + trade;
  const net = total - debt;
  const due = net >= nisap && nisap > 0;
  return { total, net, due, zekat: due ? net * oran : 0 };
}

function run() {
  showError($('error'), '');
  const basis = document.querySelector('input[name="basis"]:checked').value;
  const goldPrice = parseOpt($('g-price').value), silverPrice = parseOpt($('s-price').value);
  const vals = { cash: parseOpt($('a-cash').value), goldGram: parseOpt($('a-gold').value), fx: parseOpt($('a-fx').value),
    recv: parseOpt($('a-recv').value), trade: parseOpt($('a-trade').value), debt: parseOpt($('a-debt').value) };
  const all = [goldPrice, silverPrice, ...Object.values(vals)];
  if (all.some((v) => Number.isNaN(v))) return fail('Bir alan sayı olarak okunamadı. Yalnızca rakam, nokta ve virgül kullanın (örnek: 3.250,50).');
  if (all.some((v) => v < 0)) return fail('Negatif değer girilemez. Borçlarınızı "Ödenmesi gereken borçlar" alanına pozitif sayı olarak yazın.');
  const price = basis === 'altin' ? goldPrice : silverPrice;
  if (!(price > 0)) return fail(basis === 'altin' ? 'Nisabı hesaplamak için 1 gram altının güncel TL fiyatını girin (örnek: 3.250,50).' : 'Nisabı hesaplamak için 1 gram gümüşün güncel TL fiyatını girin.');
  if (vals.goldGram > 0 && !(goldPrice > 0)) return fail('Altın varlığınız için 1 gram altın fiyatını da girin; böylece gram değeri TL\'ye çevrilebilir.');
  const nisapGram = basis === 'altin' ? P.altin_nisap_gram : P.gumus_nisap_gram;
  const nisap = nisapGram * price;
  const r = calcZekat({ nisap, ...vals, goldPrice }, P.oran);
  $('r-nisap').textContent = money(nisap) + ' (' + nf.format(nisapGram) + ' g)';
  $('r-total').textContent = money(r.total);
  $('r-debt').textContent = money(vals.debt);
  $('r-net').textContent = money(r.net);
  $('r-zekat').textContent = money(r.zekat);
  $('r-status').textContent = r.due ? 'Net varlığınız nisaba ulaşıyor.' : 'Net varlığınız nisap miktarının altında; bu hesaba göre zekat düşmüyor.';
  showResult($('result'));
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); hideResult($('result')); showError($('error'), ''); $('g-price').focus();
});
