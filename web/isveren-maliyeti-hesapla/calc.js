// Brüt-net maaş hesap çekirdeği: DOM'dan bağımsız, saf fonksiyonlar (Node'da da test edilir).

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Kümülatif matrah için artan oranlı gelir vergisi tarifesi. */
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

/**
 * 12 aylık hesap. Her ay aynı brüt ücret varsayılır.
 * opts: { asgariIstisna: bool, isverenMaliyeti: bool, isverenIndirim: bool }
 */
export function calcYear(brut, p, opts = {}) {
  const asgari = p.asgari_ucret_brut;
  const capBase = asgari * p.sgk_tavan_katsayisi; // SGK prim tavanı (aylık)
  const sgkBase = Math.min(brut, capBase);
  const sgkRate = p.sgk_isci_orani / 100;
  const issRate = p.issizlik_isci_orani / 100;
  const damgaRate = p.damga_vergisi_orani / 100;
  const asgariSgkBase = Math.min(asgari, capBase);
  const asgariMatrah = asgari - round2(asgariSgkBase * sgkRate) - round2(asgariSgkBase * issRate);
  const employerRate = (p.sgk_isveren_orani - (opts.isverenIndirim ? p.sgk_isveren_indirim_puan : 0) + p.issizlik_isveren_orani) / 100;

  const rows = [];
  let cum = 0, cumAsgari = 0;
  const totals = { brut: 0, sgk: 0, issizlik: 0, matrah: 0, gelirVergisi: 0, damga: 0, net: 0, isverenMaliyet: 0 };
  for (let m = 1; m <= 12; m++) {
    const sgk = round2(sgkBase * sgkRate);
    const issizlik = round2(sgkBase * issRate);
    const matrah = round2(brut - sgk - issizlik);
    const gvGross = taxOnBase(cum + matrah, p.gelir_vergisi_dilimleri) - taxOnBase(cum, p.gelir_vergisi_dilimleri);
    let gv = gvGross;
    let damga = brut * damgaRate;
    if (opts.asgariIstisna) {
      // İstisna: asgari ücretin kendi kümülatif matrahı üzerinden hesaplanan vergi ve damga vergisi kadar.
      const gvIst = taxOnBase(cumAsgari + asgariMatrah, p.gelir_vergisi_dilimleri) - taxOnBase(cumAsgari, p.gelir_vergisi_dilimleri);
      gv = Math.max(0, gvGross - gvIst);
      damga = Math.max(0, brut - asgari) * damgaRate;
    }
    gv = round2(gv);
    damga = round2(damga);
    const net = round2(brut - sgk - issizlik - gv - damga);
    const isverenMaliyet = round2(brut + sgkBase * employerRate);
    rows.push({ ay: m, brut, sgk, issizlik, matrah, kumulatif: round2(cum + matrah), gelirVergisi: gv, damga, net, isverenMaliyet });
    cum += matrah;
    cumAsgari += asgariMatrah;
    totals.brut += brut; totals.sgk += sgk; totals.issizlik += issizlik; totals.matrah += matrah;
    totals.gelirVergisi += gv; totals.damga += damga; totals.net += net; totals.isverenMaliyet += isverenMaliyet;
  }
  for (const k of Object.keys(totals)) totals[k] = round2(totals[k]);
  return { rows, totals };
}

/** Hedef net (belirtilen ay) için brüt ücreti ikili aramayla bulur. Net, brütle monoton artar. */
export function netToBrut(targetNet, p, opts = {}, month = 1) {
  const netAt = (b) => calcYear(b, p, opts).rows[month - 1].net;
  let lo = 0, hi = Math.max(targetNet * 3, 1000);
  while (netAt(hi) < targetNet && hi < 1e9) hi *= 2;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (netAt(mid) < targetNet) lo = mid; else hi = mid;
  }
  return round2(hi);
}

/**
 * Aylık işveren maliyeti dökümü (brüt ücret üzerinden).
 * opts: { isverenIndirim: bool, destek: bool, destekTutari: number }
 */
export function employerCost(brut, p, opts = {}) {
  const capBase = p.asgari_ucret_brut * p.sgk_tavan_katsayisi;
  const sgkBase = Math.min(brut, capBase);
  const sgkRate = p.sgk_isveren_orani - (opts.isverenIndirim ? p.sgk_isveren_indirim_puan : 0);
  const sgk = round2(sgkBase * sgkRate / 100);
  const issizlik = round2(sgkBase * p.issizlik_isveren_orani / 100);
  const destek = opts.destek ? Math.min(round2(opts.destekTutari || 0), sgk + issizlik) : 0;
  return { brut, sgkBase, sgkRate, sgk, issizlik, destek, toplam: round2(brut + sgk + issizlik - destek) };
}
