// FAVÖK ve FAVÖK Marjı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const nn = (s, ad) => { const n = h.opt(s, 0, ad); if (n < 0) h.err(`"${ad}" negatif olamaz.`); return n; };
    const satis = h.pos(v.satis, 'Net satışlar');
    const amort = nn(v.amortisman, 'Amortisman ve itfa payları');
    let fvok, note;
    if (v.yontem === 'net') {
      const kar = h.num(v.netKar, 'Dönem net kârı');
      const faiz = nn(v.faiz, 'Finansman (faiz) giderleri');
      const vergi = nn(v.vergi, 'Vergi gideri');
      fvok = kar + faiz + vergi;
      note = 'Net kârdan başlanan yöntemde, esas faaliyet dışı gelir ve giderler (kur farkı, varlık satış kârı gibi) net kârın içinde kaldığı için sonuç, satışlardan başlanan yöntemden farklı çıkabilir.';
    } else {
      const smm = h.nonneg(v.smm, 'Satışların maliyeti');
      const gider = nn(v.gider, 'Faaliyet giderleri');
      if (amort > smm + gider + 1e-9) h.err('"Amortisman ve itfa payları" maliyet ve giderlerin toplamından büyük olamaz; amortisman bu kalemlerin içinde yer alan bir tutardır.');
      fvok = satis - smm - gider;
      note = 'Amortisman, satışların maliyeti ve faaliyet giderlerinin içinde zaten gider yazılmış kabul edilir ve faaliyet kârına geri eklenir.';
    }
    const favok = fvok + amort;
    return {
      rows: [
        ['FAVÖK', h.para(favok)],
        ['FAVÖK marjı', yuzde(favok / satis * 100)],
        ['Faaliyet kârı (FVÖK)', h.para(fvok)],
        ['FVÖK marjı', yuzde(fvok / satis * 100)],
        ['Geri eklenen amortisman', h.para(amort)],
      ],
      note,
    };
  }
