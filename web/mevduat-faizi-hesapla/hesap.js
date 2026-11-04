// Vadeli mevduat net getiri hesabı — saf mantık (DOM yok). Yatırım tavsiyesi değil, yalnızca matematiktir.

/** Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'Gelir Vergisi Kanunu geçici md. 67 ve Cumhurbaşkanı kararları: TL vadeli mevduatta vadesiz ve 6 aya kadar %17,5, 1 yıla kadar %15, 1 yıl ve daha uzun %10 (2026 uygulaması; oranlar belirli bir bitiş tarihiyle duyurulur ve karar ile uzatılır, 2026 sonrası için güncel kararı kontrol edin). Oranlar sık değişir; bankanızın güncel kesintisini kontrol edin.',
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
