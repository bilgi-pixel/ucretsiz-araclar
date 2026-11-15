// Ondalık Saat Dakika Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun.');
    const iki = (n) => String(n).padStart(2, '0');
    if (v.yon === 'saat') {
      const m = /^(\d+)\s*:\s*(\d{1,2})(?:\s*:\s*(\d{1,2}))?$/.exec(ham);
      if (!m) h.err('Süreyi saat:dakika biçiminde yazın (örn. 7:45 ya da 7:45:30). Ondalık bir değer çevirecekseniz yönü değiştirin.');
      const sa = Number(m[1]), dk = Number(m[2]), sn = m[3] === undefined ? 0 : Number(m[3]);
      if (dk > 59) h.err('Dakika 0 ile 59 arasında olmalı.');
      if (sn > 59) h.err('Saniye 0 ile 59 arasında olmalı.');
      const toplamSn = sa * 3600 + dk * 60 + sn;
      return {
        rows: [
          ['Ondalık saat', h.fmt(toplamSn / 3600, 4) + ' saat'],
          ['Toplam dakika', h.fmt(toplamSn / 60, 2) + ' dk'],
          ['Toplam saniye', h.fmt(toplamSn, 0) + ' sn'],
          ['Saat biçimi', `${sa}:${iki(dk)}:${iki(sn)}`],
        ],
        note: 'Ondalık saat = saat + dakika ÷ 60 + saniye ÷ 3600. Sonuç en fazla dört ondalık basamakla gösterilir.',
      };
    }
    if (ham.includes(':')) h.err('Ondalık saat alanına 7,75 gibi bir sayı yazın. 7:45 biçimindeki süre için yönü "Saat:dakika → Ondalık saat" seçin.');
    const x = h.nonneg(ham, 'Süre');
    const toplamSn = Math.round(x * 3600);
    const sa = Math.floor(toplamSn / 3600);
    const dk = Math.floor((toplamSn % 3600) / 60);
    const sn = toplamSn % 60;
    return {
      rows: [
        ['Saat ve dakika', `${sa} saat ${dk} dakika` + (sn ? ` ${sn} saniye` : '')],
        ['Saat biçimi', `${sa}:${iki(dk)}:${iki(sn)}`],
        ['Toplam dakika', h.fmt(x * 60, 2) + ' dk'],
        ['Toplam saniye', h.fmt(toplamSn, 0) + ' sn'],
      ],
      note: 'Ondalık kısım 60 ile çarpılarak dakikaya çevrilir; sonuç en yakın saniyeye yuvarlanır.',
    };
  }
