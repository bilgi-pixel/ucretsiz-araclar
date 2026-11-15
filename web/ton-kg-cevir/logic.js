// Ton Kilogram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const LB = 0.45359237;
    const KAT = { t: 1000, kg: 1, short: 2000 * LB, long: 2240 * LB };
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kat = KAT[v.birim];
    if (!kat) h.err('Listeden geçerli bir birim seçin.');
    const kg = x * kat;
    const kgSatir = ['Kilogram', h.fmt(kg, 4) + ' kg'];
    const tSatir = ['Metrik ton', h.fmt(kg / 1000, 6) + ' t'];
    return {
      rows: [
        ...(v.birim === 'kg' ? [tSatir, kgSatir] : [kgSatir, tSatir]),
        ['ABD tonu (short ton)', h.fmt(kg / KAT.short, 4) + ' sh tn'],
        ['İngiliz tonu (long ton)', h.fmt(kg / KAT.long, 4) + ' long tn'],
        ['Kental (100 kg)', h.fmt(kg / 100, 4) + ' q'],
        ['Pound', h.fmt(kg / LB, 2) + ' lb'],
      ],
      note: '1 metrik ton = 1.000 kg; 1 short ton = 2.000 lb = 907,18474 kg; 1 long ton = 2.240 lb = 1.016,0469088 kg.',
    };
  }
