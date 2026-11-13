// Bileşik faiz mantığı — DOM yok; Türkçe ve İngilizce sayfalar ortak kullanır.
export const FREQS = { 1: 'yıllık', 2: '6 ayda bir', 4: '3 ayda bir', 12: 'aylık', 365: 'günlük' };

/** Yıllık nominal faiz (yüzde) ve yıllık bileşik sayısından aylık eşdeğer oranı verir. */
export function monthlyRate(ratePct, n) {
  const r = ratePct / 100;
  return Math.pow(1 + r / n, n / 12) - 1;
}

/** Efektif yıllık faiz (yüzde). */
export function effectiveAnnual(ratePct, n) {
  return (Math.pow(1 + ratePct / 100 / n, n) - 1) * 100;
}

/**
 * Ana para, yıllık faiz, süre (yıl) ve bileşik sıklığıyla birikimi hesaplar.
 * monthly: her ayın sonunda eklenen tutar (0 olabilir).
 * Döner: { final, deposits, interest, rows:[{year, deposits, interest, balance}] }
 */
export function compound({ principal, ratePct, years, n, monthly = 0 }) {
  const i = monthlyRate(ratePct, n);
  const months = Math.round(years * 12);
  let bal = principal, dep = principal;
  const rows = [];
  for (let m = 1; m <= months; m++) {
    bal = bal * (1 + i) + monthly;
    dep += monthly;
    if (m % 12 === 0 || m === months) rows.push({ year: m / 12, deposits: dep, interest: bal - dep, balance: bal });
  }
  if (months === 0) rows.push({ year: 0, deposits: dep, interest: 0, balance: bal });
  return { final: bal, deposits: dep, interest: bal - dep, rows };
}

/** Paranın kaç yılda ikiye katlanacağı (ek yatırım yokken). */
export function doublingYears(ratePct, n) {
  if (ratePct <= 0) return Infinity;
  return Math.log(2) / (n * Math.log(1 + ratePct / 100 / n));
}
