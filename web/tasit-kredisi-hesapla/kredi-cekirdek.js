// Kredi hesap çekirdeği: DOM'dan bağımsız saf fonksiyonlar. Yalnızca matematiksel hesaptır; finansal tavsiye değildir.
// Bu dosya konut/taşıt/ihtiyaç kredisi sayfalarında aynı içerikle bulunur (bundler yok, her klasör kendi kopyasını kullanır).

export const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmt = (n) => `${money.format(n)} TL`;
export const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "3,5", "3.5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/**
 * Eşit taksitli (anüite) plan. Aylık faiz r (kesir), KKDF ve BSMV faiz üzerinden (kesir).
 * Taksit vergili efektif oranla hesaplanır; her satırda faiz, KKDF ve BSMV ayrılır.
 */
export function buildPlan(principal, monthlyRate, months, kkdfRate, bsmvRate) {
  const re = monthlyRate * (1 + kkdfRate + bsmvRate);
  const exact = re === 0 ? principal / months : (principal * re) / (1 - Math.pow(1 + re, -months));
  const payment = Math.round(exact * 100) / 100; // bankalar taksiti kuruşa yuvarlar
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

/** Aylık iç verim oranı (ikiye bölme). net = eline geçen tutar (masraflar düşülmüş olabilir). */
export function monthlyIRR(net, payment, months) {
  let lo = 0, hi = 1;
  const pv = (i) => (i === 0 ? payment * months : (payment * (1 - Math.pow(1 + i, -months))) / i);
  for (let n = 0; n < 200; n++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > net) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

export const annualFromMonthly = (i) => (Math.pow(1 + i, 12) - 1) * 100;

/** Ödeme planı tablosunu doldurur. cols: [{key, label?}] — anahtar sırasıyla; ilk sütun ay (satır başlığı). */
export function renderPlan(tbody, rows, keys) {
  const frag = document.createDocumentFragment();
  for (const r of rows) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = String(r.month);
    tr.appendChild(th);
    for (const k of keys) {
      const td = document.createElement('td');
      td.textContent = money.format(r[k]);
      tr.appendChild(td);
    }
    frag.appendChild(tr);
  }
  tbody.replaceChildren(frag);
}

/** parametreler.json okur; yüklenemezse (çevrimdışı vb.) verilen varsayılanları kullanır ve tarihi yazar. */
export async function loadParams(defaults, dateEl) {
  let params = defaults;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar geçerli */ }
  const d = new Date(params.guncelleme);
  if (dateEl) dateEl.textContent = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  return params;
}
