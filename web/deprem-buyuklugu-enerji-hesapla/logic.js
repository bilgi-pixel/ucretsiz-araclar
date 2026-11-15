// Deprem Büyüklüğü Enerji Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m1 = h.num(v.m1, '1. depremin büyüklüğü');
    const var2 = String(v.m2 ?? '').trim() !== '';
    const m2 = var2 ? h.num(v.m2, '2. depremin büyüklüğü') : null;
    const sinir = (m, ad) => { if (m < 0 || m > 10) h.err(`"${ad}" 0 ile 10 arasında olmalı (örn. 6,5).`); };
    sinir(m1, '1. depremin büyüklüğü');
    if (var2) sinir(m2, '2. depremin büyüklüğü');
    const enerji = (m) => Math.pow(10, 1.5 * m + 4.8);
    const bilim = (x) => {
      let us = Math.floor(Math.log10(x) + 1e-12);
      let man = x / Math.pow(10, us);
      if (Number(man.toFixed(2)) >= 10) { man /= 10; us += 1; }
      return `${h.fmt(man, 2)} × 10^${us} J`;
    };
    const tnt = (x) => {
      const ton = x / 4.184e9;
      if (ton >= 1e6) return h.fmt(ton / 1e6, 2) + ' megaton TNT';
      if (ton >= 1000) return h.fmt(ton / 1000, 2) + ' kiloton TNT';
      if (ton >= 1) return h.fmt(ton, 2) + ' ton TNT';
      return h.fmt(ton * 1000, 2) + ' kg TNT';
    };
    const e1 = enerji(m1);
    if (!var2) {
      return {
        rows: [
          ['Açığa çıkan sismik enerji', bilim(e1)],
          ['TNT eşdeğeri', tnt(e1)],
          ['Elektrik enerjisi karşılığı', h.sig(e1 / 3.6e6, 3) + ' kWh'],
        ],
        note: 'Enerji, log E = 1,5 × M + 4,8 (joule) bağıntısıyla hesaplanan, sismik dalgalarla yayılan yaklaşık enerjidir.',
      };
    }
    const fark = Math.abs(m1 - m2);
    const e2 = enerji(m2);
    const guclu = Math.abs(m1 - m2) < 1e-12 ? 'İki deprem eşit büyüklükte' : m1 > m2 ? '1. deprem' : '2. deprem';
    return {
      rows: [
        ['Enerji oranı', h.fmt(Math.pow(10, 1.5 * fark), 2) + ' kat'],
        ['Genlik oranı', h.fmt(Math.pow(10, fark), 2) + ' kat'],
        ['Büyüklük farkı', h.fmt(fark, 2)],
        ['Daha güçlü olan', guclu],
        ['1. depremin enerjisi', bilim(e1)],
        ['1. depremin TNT eşdeğeri', tnt(e1)],
        ['2. depremin enerjisi', bilim(e2)],
        ['2. depremin TNT eşdeğeri', tnt(e2)],
      ],
      note: 'Oranlar büyük olanın küçük olana oranıdır. Büyüklük depremin kaynağındaki enerjiyi anlatır; bir yerde hissedilen şiddet ve hasar ayrıca derinliğe, uzaklığa, zemine ve yapı kalitesine bağlıdır.',
    };
  }
