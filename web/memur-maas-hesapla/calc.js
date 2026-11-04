// Memur maaşı hesap çekirdeği (tahmini): DOM'dan bağımsız, saf fonksiyonlar.
// Her bileşen ayrı satırdır; hangi bileşenin vergiye ve kesenek matrahına girdiği bayraklarla belirlenir.

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// 657 sayılı Kanun md. 176: ders saati başına gündüz öğretiminde 140, saat 18.00'den sonra başlayan
// derslerde, cumartesi-pazar ve yarıyıl/yaz tatillerinde 150 gösterge × aylık katsayı.
// Gece farkı yüzde artış değil gösterge farkıdır (150/140).
export const EK_DERS_GOSTERGE_GUNDUZ = 140;
export const EK_DERS_GOSTERGE_GECE = 150;

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

/** Derece/kademe için gösterge değerini döndürür; yoksa null. */
export function lookupGosterge(table, derece, kademe) {
  const row = table[String(derece)];
  if (!row || kademe < 1 || kademe > row.length) return null;
  return row[kademe - 1];
}

/**
 * 12 aylık memur maaşı hesabı (her ay aynı değerler varsayılır).
 * input: { gosterge, ekGosterge, aylikKatsayi, tabanKatsayi, yanOdemeKatsayi, yanOdemePuani,
 *          ozelHizmetOrani, es, cocuk, cocuk06, eski5434, istisna, ekDersBrut }
 */
export function calcMemur(input, p) {
  const ka = input.aylikKatsayi, kt = input.tabanKatsayi, ky = input.yanOdemeKatsayi;
  const lines = {
    gostergeAylik: round2(input.gosterge * ka),
    ekGostergeAylik: round2((input.ekGosterge || 0) * ka),
    taban: round2(p.taban_aylik_gostergesi * kt),
    yanOdeme: round2((input.yanOdemePuani || 0) * ky),
  };
  // Özel hizmet / eğitim-öğretim tazminatı: gösterge + ek gösterge aylığı üzerinden oran.
  lines.tazminat = round2((lines.gostergeAylik + lines.ekGostergeAylik) * ((input.ozelHizmetOrani || 0) / 100));
  const ekDers = round2(input.ekDersBrut || 0);
  // Aile yardımı: eş 2273 gösterge, çocuk 250 gösterge (0-6 yaş iki kat), aylık katsayıyla çarpılır.
  lines.aile = round2(ka * ((input.es ? p.aile_es_gostergesi : 0)
    + (input.cocuk || 0) * p.aile_cocuk_gostergesi
    + (input.cocuk06 || 0) * p.aile_cocuk_gostergesi * p.aile_cocuk_0_6_carpan));

  // Kesenek ve GSS matrahı (basitleştirilmiş): gösterge + ek gösterge + taban aylık.
  // 4/c: 5510 md. 82 üst sınırı (2026: aylık 297.270 TL = günlük alt sınır 1.101 TL × 9 × 30) aşılamaz.
  // 5434 iştirakçilerinin keseneği 5434 hükümlerine göre hesaplanır (5510 geçici md. 4); tavan uygulanmaz.
  const primBaseHam = round2(lines.gostergeAylik + lines.ekGostergeAylik + lines.taban);
  const ustSinir = !input.eski5434 && p.prim_ust_sinir_aylik ? p.prim_ust_sinir_aylik : Infinity;
  const primBase = Math.min(primBaseHam, ustSinir);
  const tavanaTakildi = primBaseHam > ustSinir;
  const keseneRate = (input.eski5434 ? p.emekli_kesenegi_5434 : p.emekli_kesenegi_4c) / 100;
  const kesenek = round2(primBase * keseneRate);
  // GSS kişi payı: 4/c'de %5 (5510 md. 81/1-f). 5434 iştirakçilerinde GSS primini (%12) kurum öder,
  // maaştan kesilmez (5510 geçici md. 4).
  const gssRate = (input.eski5434 ? (p.gss_orani_5434 ?? 0) : p.gss_orani) / 100;
  const gss = round2(primBase * gssRate);
  // Kurumun ödediği 4/c primi (maaştan kesilmez): MYÖ işveren %12 (7566 md. 23 ile 2026'dan itibaren) + GSS %7,5.
  // 5434 rejiminde kurum karşılığı farklı kurallara bağlı olduğundan hesaplanmaz (null).
  const kurumRate = ((p.kurum_myo_orani_4c ?? 0) + (p.kurum_gss_orani_4c ?? 0)) / 100;
  const kurumPayi = input.eski5434 || !kurumRate ? null : round2(primBase * kurumRate);

  const taxable = round2(lines.gostergeAylik + lines.ekGostergeAylik + lines.taban + lines.yanOdeme + lines.tazminat + ekDers);
  const matrah = round2(taxable - kesenek - gss);

  // Asgari ücret istisnası: 2026 brüt asgari ücretten %14 SGK ve %1 işsizlik işçi payı düşülerek bulunan matrah (28.075,50 TL).
  const asgari = p.asgari_ucret_brut;
  const asgariMatrah = asgari - round2(asgari * p.asgari_sgk_isci_orani / 100) - round2(asgari * p.asgari_issizlik_isci_orani / 100);
  const damgaRate = p.damga_vergisi_orani / 100;

  const rows = [];
  let cum = 0, cumAsgari = 0;
  const totals = { brut: 0, kesenek: 0, gss: 0, gelirVergisi: 0, damga: 0, net: 0 };
  for (let m = 1; m <= 12; m++) {
    const gvGross = taxOnBase(cum + matrah, p.gelir_vergisi_dilimleri) - taxOnBase(cum, p.gelir_vergisi_dilimleri);
    let gv = gvGross;
    let damga = taxable * damgaRate;
    if (input.istisna) {
      const gvIst = taxOnBase(cumAsgari + asgariMatrah, p.gelir_vergisi_dilimleri) - taxOnBase(cumAsgari, p.gelir_vergisi_dilimleri);
      gv = Math.max(0, gvGross - gvIst);
      damga = Math.max(0, taxable - asgari) * damgaRate;
    }
    gv = round2(gv);
    damga = round2(damga);
    const brut = round2(taxable + lines.aile);
    const net = round2(brut - kesenek - gss - gv - damga);
    rows.push({ ay: m, brut, kesenek, gss, matrah, gelirVergisi: gv, damga, net });
    cum += matrah;
    cumAsgari += asgariMatrah;
    totals.brut += brut; totals.kesenek += kesenek; totals.gss += gss;
    totals.gelirVergisi += gv; totals.damga += damga; totals.net += net;
  }
  for (const k of Object.keys(totals)) totals[k] = round2(totals[k]);
  return {
    lines: { ...lines, ekDers }, primBase, tavanaTakildi, kesenek, gss, kurumPayi, taxable, matrah, asgariMatrah,
    rows, totals, ocakNet: rows[0].net, ortalamaNet: round2(totals.net / 12),
  };
}

/** Ek ders birim ücreti: gösterge × aylık katsayı. Gece / hafta sonu / tatil dersinde gösterge 150'dir (yüzde artış değil). */
export function ekDersUnit(p, aylikKatsayi, gece = false) {
  const gosterge = gece
    ? (p.ek_ders_gostergesi_gece ?? EK_DERS_GOSTERGE_GECE)
    : (p.ek_ders_gostergesi ?? EK_DERS_GOSTERGE_GUNDUZ);
  return round2(gosterge * aylikKatsayi);
}

/** Haftalık gündüz ve gece / hafta sonu saatlerinden aylık brüt ek ders ücreti. */
export function ekDersBrut(p, aylikKatsayi, gunduzHaftalik, geceHaftalik) {
  const hafta = p.aylik_hafta_sayisi ?? 4;
  return round2(gunduzHaftalik * hafta * ekDersUnit(p, aylikKatsayi, false) + geceHaftalik * hafta * ekDersUnit(p, aylikKatsayi, true));
}
