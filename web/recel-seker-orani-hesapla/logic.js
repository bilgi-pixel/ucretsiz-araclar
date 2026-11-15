// Reçel Şeker Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const q = h.pos(v.miktar, 'Miktar') * 1000;
    const p = h.pos(v.oran, 'Şeker oranı');
    if (p > 200) h.err('Şeker oranı %200\'den büyük olamaz. Reçellerde oran çoğunlukla %50 ile %120 arasındadır.');
    const meyve = v.bilinen === 'seker' ? q * 100 / p : q;
    const seker = v.bilinen === 'seker' ? q : q * p / 100;
    const toplam = meyve + seker;
    return {
      rows: [
        v.bilinen === 'seker' ? ['Gereken meyve', h.fmt(meyve, 0) + ' g'] : ['Gereken şeker', h.fmt(seker, 0) + ' g'],
        v.bilinen === 'seker' ? ['Şeker', h.fmt(seker, 0) + ' g'] : ['Meyve', h.fmt(meyve, 0) + ' g'],
        ['Tenceredeki ham karışım', h.fmt(toplam, 0) + ' g'],
        ['Eklenen şekerin karışımdaki payı', '%' + h.fmt(seker / toplam * 100, 2)],
        ['Meyve : şeker', '1 : ' + h.fmt(p / 100, 2)],
      ],
      note: 'Meyve ağırlığı; sap, çekirdek ve kabuk ayıklandıktan sonraki net ağırlıktır. Pişme sırasında su buharlaştığı için bitmiş reçel ham karışımdan hafif olur.',
    };
  }
