// Gelir vergisi hesap çekirdeği: DOM'dan bağımsız, saf fonksiyonlar.

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Artan oranlı tarifeyle verilen yıllık matrahın vergisi. */
export function taxOnBase(base, brackets) {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const upper = b.ust_sinir === null ? Infinity : b.ust_sinir;
    if (base > lower) tax += (Math.min(base, upper) - lower) * (b.oran / 100);
    if (base <= upper) break;
    lower = upper;
  }
  return tax;
}

/** Dilim dökümü: her dilimde matrahın ne kadarı var, ne kadar vergi doğuyor. */
export function breakdown(base, brackets) {
  const rows = [];
  let lower = 0;
  for (const b of brackets) {
    const upper = b.ust_sinir === null ? Infinity : b.ust_sinir;
    const inBracket = Math.max(0, Math.min(base, upper) - lower);
    rows.push({ alt: lower, ust: b.ust_sinir, oran: b.oran, matrah: round2(inBracket), vergi: round2(inBracket * b.oran / 100) });
    lower = upper;
    if (lower === Infinity) break;
  }
  return rows;
}

/** Yıllık matrahtan toplam vergi, efektif oran ve dilim dökümü. */
export function calcTax(base, brackets) {
  const tax = round2(taxOnBase(base, brackets));
  const last = breakdown(base, brackets).filter((r) => r.matrah > 0).pop();
  return { matrah: base, vergi: tax, efektif: base > 0 ? (tax / base) * 100 : 0, marjinal: last ? last.oran : 0, dilimler: breakdown(base, brackets) };
}

/** Ücret için aylık kümülatif gösterim: her ay matrahın 1/12'si eklenir. */
export function monthlyCumulative(base, brackets) {
  const monthly = base / 12;
  const rows = [];
  let prevTax = 0;
  for (let m = 1; m <= 12; m++) {
    const cum = monthly * m;
    const cumTax = taxOnBase(cum, brackets);
    rows.push({ ay: m, matrah: round2(monthly), kumulatif: round2(cum), vergi: round2(cumTax - prevTax), kumulatifVergi: round2(cumTax) });
    prevTax = cumTax;
  }
  return rows;
}

/**
 * Kira gelirinden vergiye esas matrah.
 * Götürü gider: (hasılat - istisna) üzerinden %oran. Gerçek gider: istisnaya isabet eden kısım düşülmez (orantılı).
 */
export function rentBase({ hasilat, istisna, goturu, gider = 0, goturuOran = 15 }) {
  const afterExempt = Math.max(0, hasilat - istisna);
  if (afterExempt === 0) return { matrah: 0, istisnaKullanilan: Math.min(hasilat, istisna), gider: 0 };
  const expense = goturu ? afterExempt * (goturuOran / 100) : Math.min(afterExempt, gider * (afterExempt / hasilat));
  return { matrah: round2(afterExempt - expense), istisnaKullanilan: Math.min(hasilat, istisna), gider: round2(expense) };
}
