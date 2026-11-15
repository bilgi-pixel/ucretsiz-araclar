// Faaliyet Kâr Marjı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satis = h.pos(v.satis, 'Net satışlar');
    const smm = h.nonneg(v.smm, 'Satışların maliyeti');
    const gider = h.nonneg(v.gider, 'Faaliyet giderleri');
    const brut = satis - smm;
    const fk = brut - gider;
    const yuzde = (x) => (x < -5e-7 ? '−' : '') + '%' + h.fmt(Math.abs(x), 2);
    const tl = (x) => (x < -0.005 ? '−' : '') + h.para(Math.abs(x));
    return {
      rows: [
        ['Faaliyet kâr marjı', yuzde((fk / satis) * 100)],
        [fk < -0.005 ? 'Faaliyet zararı' : 'Faaliyet kârı', h.para(Math.abs(fk))],
        ['Brüt satış kârı', tl(brut)],
        ['Brüt kâr marjı', yuzde((brut / satis) * 100)],
        ['Faaliyet giderlerinin satışlara oranı', '%' + h.fmt((gider / satis) * 100, 2)],
        ['Satışların maliyetinin satışlara oranı', '%' + h.fmt((smm / satis) * 100, 2)],
      ],
      note: 'Faaliyet kârı; faiz, kur farkı, olağan dışı gelir-giderler ve vergiden önceki, yalnızca ana faaliyetten doğan kârdır.',
    };
  }
