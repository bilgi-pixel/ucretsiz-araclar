// Peşin mi Vadeli mi Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const pesin = h.pos(v.pesin, 'Peşin fiyat');
    const pesinat = h.opt(v.pesinat, 0, 'Peşinat');
    const taksit = h.pos(v.taksit, 'Aylık taksit tutarı');
    const n = h.posint(v.adet, 'Taksit sayısı');
    const g = h.opt(v.getiri, 0, 'Paranızın aylık getirisi');
    if (pesinat < 0) h.err('"Peşinat" negatif olamaz.');
    if (pesinat >= pesin) h.err('"Peşinat" peşin fiyattan küçük olmalı; peşinat fiyatı karşılıyorsa taksite gerek kalmaz.');
    if (n > 600) h.err('"Taksit sayısı" en fazla 600 olabilir.');
    if (g < 0 || g > 100) h.err('"Paranızın aylık getirisi" 0 ile 100 arasında bir yüzde olmalı.');
    const i = g / 100;
    const anuite = (j) => j < 1e-12 ? n : (1 - Math.pow(1 + j, -n)) / j;
    const toplam = pesinat + taksit * n;
    const bd = pesinat + taksit * anuite(i);
    const fark = toplam - pesin;
    const finans = pesin - pesinat;
    let ortuk;
    if (taksit * n < finans - 0.005) ortuk = 'Hesaplanamaz (vadeli toplam peşin fiyattan düşük)';
    else if (taksit * n < finans + 0.005) ortuk = '%0';
    else {
      let lo = 0, hi = 0.01;
      while (taksit * anuite(hi) > finans && hi < 1e6) hi *= 2;
      for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (taksit * anuite(m) > finans) lo = m; else hi = m; }
      ortuk = '%' + h.fmt((lo + hi) / 2 * 100, 2);
    }
    const d = pesin - bd;
    const sonuc = Math.abs(d) < 0.005 ? 'İkisi eşdeğer' : d > 0 ? 'Vadeli daha avantajlı' : 'Peşin daha avantajlı';
    const dMetin = Math.abs(d) < 0.005 ? h.para(0) : `${h.para(Math.abs(d))} ${d > 0 ? 'vadeli lehine' : 'peşin lehine'}`;
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Vadeli toplam ödeme', h.para(toplam)],
        ['Vade farkı', `${h.para(fark)} (${fark < 0 ? '-' : ''}%${h.fmt(Math.abs(fark) / pesin * 100, 2)})`],
        ['Vadeli ödemenin bugünkü değeri', h.para(bd)],
        ['Bugünkü değer farkı', dMetin],
        ['Vadenin aylık örtük faizi', ortuk],
      ],
      note: 'İlk taksitin bir ay sonra, diğerlerinin birer ay arayla ödendiği varsayılır. Örtük faiz paranızın aylık getirisinden düşükse vadeli, yüksekse peşin ödeme avantajlıdır.',
    };
  }
