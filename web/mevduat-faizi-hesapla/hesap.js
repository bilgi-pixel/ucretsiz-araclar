// Vadeli mevduat net getiri hesabı — saf mantık (DOM yok). Yatırım tavsiyesi değil, yalnızca matematiktir.

/** Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: "TL vadeli mevduat stopajı (Gelir Vergisi Kanunu geçici md. 67 ve 2006/10731 sayılı Karar): vadesiz ve 6 aya kadar vadeli %17,5, 1 yıla kadar %15, 1 yıldan uzun %10; bu oranlar 10041 sayılı Cumhurbaşkanı Kararıyla 9.7.2025 tarihinden itibaren açılan veya vadesi yenilenen hesaplar için belirlenmiştir (GİB, G.V.K. Geçici 67 Rehberi, Şubat 2026). Uygulama süresi 31.12.2025 tarihinden 30.06.2026 tarihine (10706 sayılı Karar, RG 19.12.2025), oradan 31.12.2026 tarihine uzatılmıştır (11444 sayılı Karar, RG 20.06.2026, sayı 33286). 31.12.2026 sonrası için henüz yeni karar yoktur; yeni karar çıkarsa oranlar değişebilir, bankanızın güncel kesintisini kontrol edin.",
  yaklasik: false,
  yilGunu: 365,
  ayGunu: 30,
  dilimler: [
    { ad: '6 aya kadar (1-180 gün)', enAz: 1, enFazla: 180, yuzde: 17.5 },
    { ad: '1 yıla kadar (181-365 gün)', enAz: 181, enFazla: 365, yuzde: 15 },
    { ad: '1 yıl ve üzeri (366 gün ve fazlası)', enAz: 366, enFazla: null, yuzde: 10 },
  ],
};

const round2 = (x) => Math.round(x * 100 + 1e-9) / 100;

/** Vadeye göre stopaj dilimini döndürür. */
export function stopajFor(days, P = DEFAULTS) {
  for (const d of P.dilimler) if (days >= d.enAz && (d.enFazla === null || days <= d.enFazla)) return d;
  return P.dilimler[P.dilimler.length - 1];
}

/**
 * Net getiri hesabı. amount: TL, days: vade (gün), rate: yıllık brüt faiz (%), taxPct: stopaj (%) ya da null (otomatik).
 * Bankalar faizi ve stopajı kuruşa yuvarlar; burada da aynı sırayla yuvarlanır.
 */
export function computeDeposit({ amount, days, rate, taxPct = null }, P = DEFAULTS) {
  if (!(amount > 0) || amount > 1e12) throw new Error('Tutar geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 100.000).');
  if (!(Number.isInteger(days) && days >= 1 && days <= 3650)) throw new Error('Vade geçersiz. 1 ile 3.650 arasında tam sayı bir gün sayısı yazın (örnek: 32) ya da ay seçip ay sayısını girin.');
  if (!(rate >= 0 && rate <= 1000)) throw new Error('Faiz oranı geçersiz. Yıllık brüt oranı yüzde olarak, 0 ile 1000 arasında yazın (örnek: 45 ya da 47,5).');
  if (taxPct !== null && !(taxPct >= 0 && taxPct <= 100)) throw new Error('Stopaj oranı geçersiz. 0 ile 100 arasında bir yüzde yazın ya da otomatik seçeneğini kullanın.');
  const band = stopajFor(days, P);
  const tax = taxPct === null ? band.yuzde : taxPct;
  const gross = round2((amount * (rate / 100) * days) / P.yilGunu);
  const taxAmt = round2(gross * (tax / 100));
  const net = round2(gross - taxAmt);
  const months = days / P.ayGunu;
  return {
    amount, days, rate, tax, auto: taxPct === null, band,
    gross, taxAmt, net,
    total: round2(amount + net),
    monthlyNet: round2(net / months),
    dailyNet: round2(net / days),
    netRate: ((net / amount) * P.yilGunu * 100) / days, // yıllık basit net oran (%)
    effectiveTotalPct: (net / amount) * 100,
  };
}
