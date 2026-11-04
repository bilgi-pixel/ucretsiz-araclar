// Taşıt Kredisi Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';
import { fmt, pct, parseNum, buildPlan, monthlyIRR, annualFromMonthly, renderPlan, loadParams } from './kredi-cekirdek.js';

const $ = (id) => document.getElementById(id);
let params = {
  guncelleme: '2026-11-04', kkdf: 15, bsmv: 15,
  bddk_kademeleri: [
    { fatura_ust: 400000, kredi_orani: 70, vade_max_ay: 48 },
    { fatura_ust: 800000, kredi_orani: 50, vade_max_ay: 36 },
    { fatura_ust: 1200000, kredi_orani: 30, vade_max_ay: 24 },
    { fatura_ust: 2000000, kredi_orani: 20, vade_max_ay: 12 },
  ],
  sinirlar: { vade_max_ay: 60, aylik_faiz_max: 20 },
};
let lastText = '';

/** Fatura bedeline uygun BDDK kademesini bulur; sınırın üstündeyse null döner. */
function tierFor(price, tiers) {
  return tiers.find((t) => price <= t.fatura_ust) || null;
}

function updateLimitLine() {
  const line = $('limit-line');
  const price = parseNum($('price').value);
  if (!$('bddk').checked) { line.textContent = 'BDDK sınırları uygulanmıyor; yalnızca matematiksel hesap yapılır.'; return; }
  if (!(price > 0)) { line.textContent = 'Fatura bedelini girince uygulanacak BDDK kredi oranı ve vade sınırı burada görünür.'; return; }
  const t = tierFor(price, params.bddk_kademeleri);
  if (!t) { line.textContent = `Bu fatura bedeli BDDK kademelerinin (en çok ${fmt(params.bddk_kademeleri.at(-1).fatura_ust)}) üstünde; kademe uygulanamıyor.`; return; }
  const minDown = price * (1 - t.kredi_orani / 100);
  line.textContent = `Bu fatura bedeli için en fazla ${pct(t.kredi_orani)} kredi (en az ${fmt(minDown)} peşinat) ve en fazla ${t.vade_max_ay} ay vade kullanılabilir.`;
}

function calc() {
  const price = parseNum($('price').value);
  const downRaw = $('down').value.trim();
  const down = downRaw ? parseNum(downRaw) : 0;
  const rate = parseNum($('rate').value);
  const term = parseNum($('term').value);
  const lim = params.sinirlar;
  if (!(price > 0)) throw new Error('Araç fatura bedeli eksik ya da geçersiz. Örneğin 1.000.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (price > 1e10) throw new Error('Fatura bedeli çok büyük. 10 milyar TL altında bir tutar girin.');
  if (!(down >= 0)) throw new Error('Peşinat geçersiz. Rakam girin ya da boş bırakın; peşinat yoksa 0 yazabilirsiniz.');
  if (down >= price) throw new Error('Peşinat fatura bedelinden küçük olmalı. Kredi çekilecek bir tutar kalmıyor; peşinatı düşürün.');
  if (!(rate >= 0) || rate > lim.aylik_faiz_max) throw new Error(`Aylık faiz oranı geçersiz. 0 ile ${lim.aylik_faiz_max} arasında, aylık yüzde olarak girin (örneğin 3,29). Bankanın teklifindeki aylık oranı kullanın.`);
  if (!Number.isInteger(term) || term < 1 || term > lim.vade_max_ay) throw new Error(`Vade geçersiz. 1 ile ${lim.vade_max_ay} arasında tam sayı olarak ay girin.`);

  const loan = price - down;
  if ($('bddk').checked) {
    const t = tierFor(price, params.bddk_kademeleri);
    if (!t) throw new Error(`Fatura bedeli BDDK kademelerinin üstünde (en çok ${fmt(params.bddk_kademeleri.at(-1).fatura_ust)}). Sınırsız hesap için "BDDK sınırlarını uygula" kutusunu kaldırın.`);
    const maxLoan = price * (t.kredi_orani / 100);
    if (loan > maxLoan + 0.005) throw new Error(`Bu fatura bedelinde en fazla ${pct(t.kredi_orani)} kredi kullanılabilir (en çok ${fmt(maxLoan)}). Peşinatı en az ${fmt(price - maxLoan)} yapın ya da "BDDK sınırlarını uygula" kutusunu kaldırın.`);
    if (term > t.vade_max_ay) throw new Error(`Bu fatura bedelinde vade en fazla ${t.vade_max_ay} ay olabilir. Vadeyi kısaltın ya da "BDDK sınırlarını uygula" kutusunu kaldırın.`);
  }

  const plan = buildPlan(loan, rate / 100, term, params.kkdf / 100, params.bsmv / 100);
  const irr = monthlyIRR(loan, plan.payment, term);

  $('r-kredi').textContent = fmt(loan);
  $('r-taksit').textContent = fmt(plan.payment);
  $('r-toplam').textContent = fmt(plan.total);
  $('r-faiz').textContent = fmt(plan.sumInterest);
  $('r-kkdf').textContent = fmt(plan.sumKkdf);
  $('r-bsmv').textContent = fmt(plan.sumBsmv);
  $('r-maliyet').textContent = fmt(plan.total - loan);
  $('r-arac').textContent = fmt(down + plan.total);
  $('r-ymo').textContent = `%${new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(annualFromMonthly(irr))}`;
  renderPlan($('plan-body'), plan.rows, ['payment', 'principal', 'interest', 'kkdf', 'bsmv', 'balance']);

  lastText = `Taşıt kredisi: fatura ${fmt(price)}, peşinat ${fmt(down)}, kredi ${fmt(loan)}, aylık %${rate}, ${term} ay → aylık taksit ${fmt(plan.payment)}, toplam geri ödeme ${fmt(plan.total)}. (Bilişim Ajans – matematiksel hesap; sigorta ve masraflar dahil değildir.)`;
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
$('price').addEventListener('input', updateLimitLine);
$('bddk').addEventListener('change', updateLimitLine);

loadParams(params, $('param-date')).then((p) => { params = p; updateLimitLine(); });
updateLimitLine();
