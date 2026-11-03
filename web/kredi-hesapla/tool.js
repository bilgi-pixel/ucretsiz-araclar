// Kredi Taksit ve Faiz Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; finansal tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse (çevrimdışı önbellek vb.) kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-03',
  kredi_turleri: {
    ihtiyac: { ad: 'İhtiyaç kredisi', kkdf: 15, bsmv: 15 },
    konut: { ad: 'Konut kredisi', kkdf: 0, bsmv: 0 },
    tasit: { ad: 'Taşıt kredisi', kkdf: 15, bsmv: 15 },
  },
  mevduat_stopaj_ornek: 17.5,
  sinirlar: { vade_max_ay: 360, aylik_faiz_max: 50 },
};

/* ---------- Türkçe sayı biçimi ---------- */
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "3,5", "3.5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/* ---------- Hesap çekirdeği ---------- */

/**
 * Eşit taksitli (anüite) plan. Aylık faiz oranı r (kesir), KKDF ve BSMV faiz üzerinden (kesir).
 * Taksit, vergili efektif oranla (r * (1 + kkdf + bsmv)) hesaplanır; her satırda faiz, KKDF, BSMV ayrılır.
 */
export function buildPlan(principal, monthlyRate, months, kkdfRate, bsmvRate) {
  const k = 1 + kkdfRate + bsmvRate;
  const re = monthlyRate * k;
  // Bankalar taksiti kuruşa yuvarlar; toplam geri ödeme yuvarlanmış taksit x vade olarak bulunur.
  const exact = re === 0 ? principal / months : (principal * re) / (1 - Math.pow(1 + re, -months));
  const payment = Math.round(exact * 100) / 100;
  let balance = principal;
  const rows = [];
  let sumInterest = 0, sumKkdf = 0, sumBsmv = 0;
  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const kkdf = interest * kkdfRate;
    const bsmv = interest * bsmvRate;
    const prin = payment - interest - kkdf - bsmv;
    balance = i === months ? 0 : balance - prin;
    sumInterest += interest; sumKkdf += kkdf; sumBsmv += bsmv;
    rows.push({ month: i, payment, principal: prin, interest, kkdf, bsmv, balance: Math.max(0, balance) });
  }
  return { payment, rows, total: payment * months, sumInterest, sumKkdf, sumBsmv };
}

/** Aylık iç verim oranı (ikiye bölme); ödemeler vergiler dahil taksittir. */
export function monthlyIRR(principal, payment, months) {
  let lo = 0, hi = 1;
  const pv = (i) => (i === 0 ? payment * months : (payment * (1 - Math.pow(1 + i, -months))) / i);
  for (let n = 0; n < 200; n++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > principal) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Mevduat getirisi (basit faiz, 365 gün). Stopaj brüt getiri üzerinden kesilir. */
export function depositReturn(principal, annualRatePct, days, withholdingPct) {
  const gross = principal * (annualRatePct / 100) * (days / 365);
  const tax = gross * (withholdingPct / 100);
  const net = gross - tax;
  return { gross, tax, net, total: principal + net, netAnnualPct: (net / principal) * (365 / days) * 100 };
}

/* ---------- Arayüz ---------- */
const el = {
  form: $('form'), error: $('error'), type: $('type'), status: $('copy-status'),
  creditBox: $('credit-fields'), depositBox: $('deposit-fields'),
  creditRes: $('credit-result'), depositRes: $('deposit-result'),
};
let lastText = '';

function mode() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const credit = mode() === 'kredi';
  el.creditBox.hidden = !credit; el.depositBox.hidden = credit;
  $('calc').textContent = credit ? 'Taksiti hesapla' : 'Getiriyi hesapla';
  el.creditRes.hidden = true; el.depositRes.hidden = true;
  showError(el.error, '');
}

function showTaxes() {
  const t = params.kredi_turleri[el.type.value];
  $('tax-line').textContent = `Seçilen tür için uygulanan oranlar: KKDF ${pct(t.kkdf)}, BSMV ${pct(t.bsmv)} (faiz üzerinden).`;
}

function setText(id, v) { $(id).textContent = v; }

function calcCredit() {
  const amount = parseNum($('amount').value);
  const rate = parseNum($('rate').value);
  const term = parseNum($('term').value);
  const lim = params.sinirlar;
  if (!(amount > 0)) throw new Error('Kredi tutarı eksik ya da geçersiz. Örneğin 100.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (amount > 1e10) throw new Error('Kredi tutarı çok büyük. 10 milyar TL altında bir tutar girin.');
  if (!(rate >= 0) || rate > lim.aylik_faiz_max) throw new Error(`Aylık faiz oranı geçersiz. 0 ile ${lim.aylik_faiz_max} arasında, aylık yüzde olarak girin (örneğin 3,05). Yıllık oranı 12'ye bölerek aylığa çevirebilirsiniz.`);
  if (!Number.isInteger(term) || term < 1 || term > lim.vade_max_ay) throw new Error(`Vade geçersiz. 1 ile ${lim.vade_max_ay} arasında tam sayı olarak ay girin.`);

  const t = params.kredi_turleri[el.type.value];
  const plan = buildPlan(amount, rate / 100, term, t.kkdf / 100, t.bsmv / 100);
  const irr = monthlyIRR(amount, plan.payment, term);
  const ymo = (Math.pow(1 + irr, 12) - 1) * 100;

  setText('r-taksit', fmt(plan.payment));
  setText('r-toplam', fmt(plan.total));
  setText('r-faiz', fmt(plan.sumInterest));
  setText('r-kkdf', fmt(plan.sumKkdf));
  setText('r-bsmv', fmt(plan.sumBsmv));
  setText('r-maliyet', fmt(plan.total - amount));
  setText('r-ymo', `%${new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(ymo)}`);

  const body = $('plan-body');
  const frag = document.createDocumentFragment();
  for (const r of plan.rows) {
    const tr = document.createElement('tr');
    [r.month, ...[r.payment, r.principal, r.interest, r.kkdf, r.bsmv, r.balance].map((x) => money.format(x))].forEach((v, i) => {
      const td = document.createElement(i === 0 ? 'th' : 'td');
      if (i === 0) td.scope = 'row';
      td.textContent = v;
      tr.appendChild(td);
    });
    frag.appendChild(tr);
  }
  body.replaceChildren(frag);

  lastText = `${t.ad}: ${fmt(amount)}, aylık %${rate}, ${term} ay → aylık taksit ${fmt(plan.payment)}, toplam geri ödeme ${fmt(plan.total)}, toplam faiz ${fmt(plan.sumInterest)}. (Bilişim Ajans – matematiksel hesap, dosya masrafı ve sigorta dahil değildir.)`;
  el.creditRes.hidden = false; el.depositRes.hidden = true;
}

function calcDeposit() {
  const amount = parseNum($('d-amount').value);
  const rate = parseNum($('d-rate').value);
  const days = parseNum($('d-days').value);
  const tax = parseNum($('d-tax').value);
  if (!(amount > 0)) throw new Error('Anapara eksik ya da geçersiz. Örneğin 100.000 yazın.');
  if (!(rate >= 0) || rate > 1000) throw new Error('Yıllık faiz oranı geçersiz. 0 ile 1000 arasında, yıllık yüzde olarak girin (örneğin 45).');
  if (!Number.isInteger(days) || days < 1 || days > 3650) throw new Error('Vade günü geçersiz. 1 ile 3650 arasında tam sayı girin (örneğin 32).');
  if (!(tax >= 0) || tax > 100) throw new Error('Stopaj oranı geçersiz. 0 ile 100 arasında bir yüzde girin; güncel oranı bankanızdan öğrenebilirsiniz.');
  const d = depositReturn(amount, rate, days, tax);
  setText('d-gross', fmt(d.gross));
  setText('d-taxamt', fmt(d.tax));
  setText('d-net', fmt(d.net));
  setText('d-total', fmt(d.total));
  setText('d-annual', pct(d.netAnnualPct));
  lastText = `Mevduat: ${fmt(amount)}, yıllık %${rate}, ${days} gün, stopaj %${tax} → net getiri ${fmt(d.net)}, vade sonu ${fmt(d.total)}. (Bilişim Ajans – matematiksel hesap.)`;
  el.depositRes.hidden = false; el.creditRes.hidden = true;
}

el.form.addEventListener('submit', (e) => {
  e.preventDefault();
  el.status.textContent = '';
  showError(el.error, '');
  try {
    if (mode() === 'kredi') calcCredit(); else calcDeposit();
  } catch (err) {
    el.creditRes.hidden = true; el.depositRes.hidden = true;
    showError(el.error, err.message);
  }
});

$('clear').addEventListener('click', () => {
  el.form.reset();
  syncMode(); showTaxes();
  if (params.mevduat_stopaj_ornek != null) $('d-tax').value = String(params.mevduat_stopaj_ornek).replace('.', ',');
  el.status.textContent = '';
});

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
el.type.addEventListener('change', showTaxes);

document.querySelectorAll('.copy-btn').forEach((b) => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastText); el.status.textContent = 'Sonuç kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}));

/* ---------- Parametreler ---------- */
async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar geçerli */ }
  const d = new Date(params.guncelleme);
  const dateText = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('param-date').textContent = dateText;
  if (params.mevduat_stopaj_ornek != null && !$('d-tax').value) $('d-tax').value = String(params.mevduat_stopaj_ornek).replace('.', ',');
  showTaxes();
}

syncMode();
loadParams();
