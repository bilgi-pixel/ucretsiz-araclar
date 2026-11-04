// Kredi Kartı Asgari Ödeme Hesaplama — tamamı tarayıcıda çalışır; tutarlarınız sunucuya gitmez.
// Hesap yalnızca matematiktir; yatırım ya da borçlanma tavsiyesi değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const tl = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 });
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

/** Varsayılan parametreler; parametreler.json okunursa üzerine yazılır. */
let params = { limit_esigi: 100000, oran_dusuk: 20, oran_yuksek: 40 };

export function num(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL/gi, '');
  if (t === '') return NaN;
  // Türkçe biçim: 1.250,75 → 1250.75 ; "1250.75" ve "1250,75" da kabul edilir.
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return Number(t);
}

/** Limite göre otomatik asgari ödeme oranı (yüzde). */
export function autoRate(limit, p = params) {
  return limit <= p.limit_esigi ? p.oran_dusuk : p.oran_yuksek;
}

/**
 * Yalnızca asgari ödeme yapılırsa borcun erimesi: her ay asgari = bakiye × oran,
 * kalan bakiyeye aylık akdi faiz işler, yeni harcama yok. 600 ay üst sınır.
 */
export function simulate(debt, ratePct, interestPct) {
  let balance = debt, months = 0, paid = 0, interest = 0;
  while (balance >= 1 && months < 600) {
    const min = Math.min(balance, balance * ratePct / 100);
    paid += min;
    const rest = balance - min;
    const i = rest * interestPct / 100;
    interest += i;
    balance = rest + i;
    months += 1;
  }
  const capped = balance >= 1;
  // Kalan 1 TL altı bakiye son ay ödemesine eklenir.
  paid += balance;
  return { months, totalPaid: paid, totalInterest: interest, capped };
}

export function compute(v, p = params) {
  if (!Number.isFinite(v.debt) || v.debt <= 0) throw new Error('Dönem borcunu sıfırdan büyük bir tutar olarak girin (örn. 15.000).');
  if (v.debt > 100_000_000) throw new Error('Dönem borcu çok büyük görünüyor. Tutarı TL cinsinden ve kuruşsuz yazıp tekrar deneyin.');
  if (!Number.isFinite(v.limit) || v.limit <= 0) throw new Error('Kart limitini girin (örn. 40.000). Limit, asgari ödeme oranını belirler; bilmiyorsanız oranı listeden elle seçin.');
  if (!Number.isFinite(v.interest) || v.interest < 0 || v.interest > 20) throw new Error('Aylık akdi faiz oranını yüzde olarak girin (örn. 3,25). Oran hesap özetinizde yazar.');
  if (!Number.isFinite(v.late) || v.late < 0 || v.late > 20) throw new Error('Aylık gecikme faizi oranını yüzde olarak girin (örn. 3,55).');
  if (!Number.isInteger(v.lateDays) || v.lateDays < 0 || v.lateDays > 365) throw new Error('Gecikme gününü 0 ile 365 arasında tam sayı olarak yazın.');
  const rate = v.rateMode === 'auto' ? autoRate(v.limit, p) : Number(v.rateMode);
  const minPay = v.debt * rate / 100;
  const rest = v.debt - minPay;
  const nextInterest = rest * v.interest / 100;
  const lateInterest = minPay * v.late / 100 * v.lateDays / 30;
  return { rate, minPay, rest, nextInterest, nextDebt: rest + nextInterest, lateInterest, sim: simulate(v.debt, rate, v.interest), v };
}

function read() {
  return {
    debt: num($('debt').value), limit: num($('limit').value), rateMode: $('rate').value,
    interest: num($('interest').value), late: num($('late').value), lateDays: num($('days').value || '0'),
  };
}

let last = null;
function render(r) {
  $('r-min').textContent = tl.format(r.minPay);
  $('r-rate').textContent = `% ${nf.format(r.rate)}`;
  $('r-rest').textContent = tl.format(r.rest);
  $('r-int').textContent = tl.format(r.nextInterest);
  $('r-next').textContent = tl.format(r.nextDebt);
  $('r-late').textContent = r.v.lateDays > 0 ? tl.format(r.lateInterest) : 'Gecikme günü girilmedi';
  const s = r.sim;
  $('r-months').textContent = s.capped ? '50 yıldan uzun' : `${s.months} ay`;
  $('r-tpaid').textContent = s.capped ? '—' : tl.format(s.totalPaid);
  $('r-tint').textContent = s.capped ? '—' : tl.format(s.totalInterest);
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try { last = compute(read()); render(last); }
  catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json');
    if (!res.ok) return;
    const j = await res.json();
    params = { ...params, ...j };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar kullanılır */ }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  ['debt', 'limit', 'days'].forEach((id) => { $(id).value = ''; });
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('debt').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const t = `Asgari ödeme: ${tl.format(last.minPay)} (% ${nf.format(last.rate)}). Kalan borç: ${tl.format(last.rest)}. Tahmini sonraki ay faizi: ${tl.format(last.nextInterest)}. Yalnızca asgari ödemeyle borç ${last.sim.capped ? '50 yıldan uzun' : last.sim.months + ' ayda'} biter, toplam faiz ${last.sim.capped ? '—' : tl.format(last.sim.totalInterest)}. Tahmindir.`;
  try { await navigator.clipboard.writeText(t); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
loadParams();
