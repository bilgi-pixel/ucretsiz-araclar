// Konut Kredisi Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';
import { fmt, parseNum, buildPlan, monthlyIRR, annualFromMonthly, renderPlan, loadParams } from './kredi-cekirdek.js';

const $ = (id) => document.getElementById(id);
let params = {
  guncelleme: '2026-11-04', kkdf: 0, bsmv: 0,
  sinirlar: { vade_max_ay: 120, aylik_faiz_max: 20 },
};
let lastText = '';

/** Boş masraf alanı 0 sayılır; yazılmışsa geçerli ve negatif olmayan sayı olmalıdır. */
function readCost(id, label) {
  const raw = $(id).value.trim();
  if (!raw) return 0;
  const v = parseNum(raw);
  if (!(v >= 0)) throw new Error(`${label} geçersiz. Yalnızca rakam, nokta ve virgül kullanın (örneğin 12.500) ya da boş bırakın.`);
  return v;
}

function calc() {
  const amount = parseNum($('amount').value);
  const rate = parseNum($('rate').value);
  const term = parseNum($('term').value);
  const lim = params.sinirlar;
  if (!(amount > 0)) throw new Error('Kredi tutarı eksik ya da geçersiz. Örneğin 1.000.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (amount > 1e10) throw new Error('Kredi tutarı çok büyük. 10 milyar TL altında bir tutar girin.');
  if (!(rate >= 0) || rate > lim.aylik_faiz_max) throw new Error(`Aylık faiz oranı geçersiz. 0 ile ${lim.aylik_faiz_max} arasında, aylık yüzde olarak girin (örneğin 2,49). Bankanın teklifindeki aylık oranı kullanın.`);
  if (!Number.isInteger(term) || term < 1 || term > lim.vade_max_ay) throw new Error(`Vade geçersiz. Konut kredisinde vade en fazla ${lim.vade_max_ay} ay (10 yıl) olabilir; 1 ile ${lim.vade_max_ay} arasında tam sayı girin.`);

  const costs = [['f-ekspertiz', 'Ekspertiz ücreti'], ['f-ipotek', 'İpotek tesis ücreti'], ['f-dosya', 'Dosya/tahsis ücreti'], ['f-sigorta', 'Sigorta (DASK, hayat vb.)'], ['f-diger', 'Diğer masraf']];
  let costTotal = 0;
  for (const [id, label] of costs) costTotal += readCost(id, label);

  const plan = buildPlan(amount, rate / 100, term, params.kkdf / 100, params.bsmv / 100);
  // Masraflar peşin ödendiği için eline geçen tutar kredi - masraf kabul edilir (masraflı yıllık maliyet).
  const netReceived = Math.max(amount - costTotal, amount * 0.01);
  const irrPlain = monthlyIRR(amount, plan.payment, term);
  const irrCost = monthlyIRR(netReceived, plan.payment, term);

  $('r-taksit').textContent = fmt(plan.payment);
  $('r-toplam').textContent = fmt(plan.total);
  $('r-faiz').textContent = fmt(plan.total - amount);
  $('r-masraf').textContent = fmt(costTotal);
  $('r-genel').textContent = fmt(plan.total + costTotal);
  $('r-toplam-maliyet').textContent = fmt(plan.total - amount + costTotal);
  const pctFmt = (v) => `%${new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}`;
  $('r-ymo').textContent = pctFmt(annualFromMonthly(irrPlain));
  $('r-ymo-masraf').textContent = pctFmt(annualFromMonthly(irrCost));
  renderPlan($('plan-body'), plan.rows, ['payment', 'principal', 'interest', 'balance']);

  lastText = `Konut kredisi: ${fmt(amount)}, aylık %${rate}, ${term} ay → aylık taksit ${fmt(plan.payment)}, toplam geri ödeme ${fmt(plan.total)}, toplam faiz ${fmt(plan.total - amount)}, masraflar ${fmt(costTotal)}. (Bilişim Ajans – matematiksel hesap; bankanızın teklifi esastır.)`;
  const res = $('result');
  res.hidden = false;
  res.classList.add('is-active');
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  $('copy-status').textContent = '';
  showError($('error'), '');
  try { calc(); } catch (err) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
});

$('clear').addEventListener('click', () => {
  $('form').reset();
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), '');
  $('copy-status').textContent = '';
});

$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

loadParams(params, $('param-date')).then((p) => { params = p; });
