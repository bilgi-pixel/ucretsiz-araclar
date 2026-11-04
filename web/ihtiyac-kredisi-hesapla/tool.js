// İhtiyaç Kredisi Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';
import { fmt, pct, parseNum, buildPlan, monthlyIRR, annualFromMonthly, renderPlan, loadParams } from './kredi-cekirdek.js';

const $ = (id) => document.getElementById(id);
let params = {
  guncelleme: '2026-11-04', kkdf: 15, bsmv: 15,
  bddk_vade_kademeleri: [
    { tutar_ust: 125000, vade_max_ay: 36 },
    { tutar_ust: 250000, vade_max_ay: 24 },
    { tutar_ust: null, vade_max_ay: 12 },
  ],
  erken_odeme_tazminat: { kalan_vade_esik_ay: 12, oran_kisa: 1, oran_uzun: 2 },
  sinirlar: { vade_max_ay: 60, aylik_faiz_max: 20 },
};
let lastText = '';

/** Kredi tutarına göre BDDK azami vadesi (ay). */
function maxTermFor(amount, tiers) {
  const t = tiers.find((k) => k.tutar_ust === null || amount <= k.tutar_ust);
  return t ? t.vade_max_ay : tiers.at(-1).vade_max_ay;
}

function updateLimitLine() {
  const line = $('limit-line');
  const amount = parseNum($('amount').value);
  if (!$('bddk').checked) { line.textContent = 'BDDK vade sınırı uygulanmıyor; yalnızca matematiksel hesap yapılır.'; return; }
  if (!(amount > 0)) { line.textContent = 'Kredi tutarını girince uygulanacak BDDK azami vadesi burada görünür.'; return; }
  line.textContent = `Bu tutar için BDDK azami vadesi ${maxTermFor(amount, params.bddk_vade_kademeleri)} aydır.`;
}

function calc() {
  const amount = parseNum($('amount').value);
  const rate = parseNum($('rate').value);
  const term = parseNum($('term').value);
  const lim = params.sinirlar;
  if (!(amount > 0)) throw new Error('Kredi tutarı eksik ya da geçersiz. Örneğin 100.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (amount > 1e10) throw new Error('Kredi tutarı çok büyük. 10 milyar TL altında bir tutar girin.');
  if (!(rate >= 0) || rate > lim.aylik_faiz_max) throw new Error(`Aylık faiz oranı geçersiz. 0 ile ${lim.aylik_faiz_max} arasında, aylık yüzde olarak girin (örneğin 3,79). Bankanın teklifindeki aylık oranı kullanın.`);
  if (!Number.isInteger(term) || term < 1 || term > lim.vade_max_ay) throw new Error(`Vade geçersiz. 1 ile ${lim.vade_max_ay} arasında tam sayı olarak ay girin.`);
  if ($('bddk').checked) {
    const maxTerm = maxTermFor(amount, params.bddk_vade_kademeleri);
    if (term > maxTerm) throw new Error(`Bu kredi tutarı için BDDK azami vadesi ${maxTerm} aydır. Vadeyi kısaltın ya da "BDDK vade sınırını uygula" kutusunu kaldırın.`);
  }
  const paidRaw = $('paid').value.trim();
  let paid = null;
  if (paidRaw) {
    paid = parseNum(paidRaw);
    if (!Number.isInteger(paid) || paid < 1 || paid >= term) throw new Error(`Erken kapama için ödenmiş taksit sayısı 1 ile ${term - 1} arasında tam sayı olmalı. Kapama düşünmüyorsanız alanı boş bırakın.`);
  }

  const plan = buildPlan(amount, rate / 100, term, params.kkdf / 100, params.bsmv / 100);
  const irr = monthlyIRR(amount, plan.payment, term);

  $('r-taksit').textContent = fmt(plan.payment);
  $('r-toplam').textContent = fmt(plan.total);
  $('r-faiz').textContent = fmt(plan.sumInterest);
  $('r-kkdf').textContent = fmt(plan.sumKkdf);
  $('r-bsmv').textContent = fmt(plan.sumBsmv);
  $('r-maliyet').textContent = fmt(plan.total - amount);
  $('r-ymo').textContent = `%${new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(annualFromMonthly(irr))}`;
  renderPlan($('plan-body'), plan.rows, ['payment', 'principal', 'interest', 'kkdf', 'bsmv', 'balance']);

  // Erken kapama tahmini (6502 sayılı Kanun md. 27): kalan anapara + erken ödeme tazminatı; işlememiş faiz ve vergi alınmaz.
  const early = $('early-box');
  let earlyText = '';
  if (paid !== null) {
    const remainingTerm = term - paid;
    const principalLeft = plan.rows[paid - 1].balance;
    const tz = params.erken_odeme_tazminat;
    const tzRate = remainingTerm > tz.kalan_vade_esik_ay ? tz.oran_uzun : tz.oran_kisa;
    const fee = principalLeft * (tzRate / 100);
    const closeAmount = principalLeft + fee;
    const remainingInstallments = plan.payment * remainingTerm;
    $('e-bakiye').textContent = fmt(principalLeft);
    $('e-tazminat').textContent = `${fmt(fee)} (${pct(tzRate)})`;
    $('e-kapama').textContent = fmt(closeAmount);
    $('e-kalan-taksit').textContent = fmt(remainingInstallments);
    $('e-tasarruf').textContent = fmt(remainingInstallments - closeAmount);
    early.hidden = false;
    earlyText = ` ${paid}. taksitten sonra kapatılırsa tahmini kapama tutarı ${fmt(closeAmount)}, tahmini tasarruf ${fmt(remainingInstallments - closeAmount)}.`;
  } else {
    early.hidden = true;
  }

  lastText = `İhtiyaç kredisi: ${fmt(amount)}, aylık %${rate}, ${term} ay → aylık taksit ${fmt(plan.payment)}, toplam geri ödeme ${fmt(plan.total)}, KKDF+BSMV ${fmt(plan.sumKkdf + plan.sumBsmv)}.${earlyText} (Bilişim Ajans – matematiksel hesap; dosya masrafı ve sigorta dahil değildir.)`;
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
  updateLimitLine();
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});
$('amount').addEventListener('input', updateLimitLine);
$('bddk').addEventListener('change', updateLimitLine);

loadParams(params, $('param-date')).then((p) => { params = p; updateLimitLine(); });
updateLimitLine();
