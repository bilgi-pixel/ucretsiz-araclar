// Net Bugünkü Değer (NBD) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const I = h.nonneg(v.yatirim, 'İlk yatırım tutarı');
    const oran = h.num(v.oran, 'Yıllık iskonto oranı');
    if (oran <= -100) h.err('İskonto oranı −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('İskonto oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    const cf = h.nums(v.akislar, 'Yıllık net nakit akışları');
    if (cf.length > 100) h.err('En fazla 100 yıllık nakit akışı girebilirsiniz.');
    const r = oran / 100;
    let pv = 0;
    let geri = 0;
    const satirlar = ['0. yıl: ' + h.para(-I) + ' (ilk yatırım)'];
    cf.forEach((c, k) => {
      const t = k + 1;
      const b = c / Math.pow(1 + r, t);
      pv += b;
      if (!geri && pv - I >= -1e-9) geri = t;
      satirlar.push(t + '. yıl: ' + h.para(c) + ' → bugünkü değeri ' + h.para(b) + ' (birikimli NBD ' + h.para(pv - I) + ')');
    });
    const nbd = pv - I;
    if (!Number.isFinite(nbd)) h.err('Sonuç hesaplanamadı; oranı ve tutarları kontrol edin.');
    const sifir = Math.abs(nbd) < 0.005;
    const karar = sifir
      ? 'NBD sıfır: yatırım tam olarak beklenen getiriyi sağlıyor'
      : nbd > 0 ? 'NBD pozitif: yatırım beklenen getirinin üzerinde değer yaratıyor' : 'NBD negatif: yatırım beklenen getiriyi karşılamıyor';
    const rows = [
      ['Net bugünkü değer (NBD)', h.para(sifir ? 0 : nbd)],
      ['Nakit akışlarının bugünkü değeri', h.para(pv)],
      ['İlk yatırım', h.para(I)],
    ];
    if (I > 0) rows.push(['Kârlılık endeksi', h.fmt(pv / I, 4)]);
    rows.push(['İndirgenmiş geri dönüş', geri ? geri + '. yıl içinde' : 'Girilen süre içinde geri dönmüyor']);
    rows.push(['Nakit akışlarının indirgenmemiş toplamı', h.para(cf.reduce((a, c) => a + c, 0))]);
    rows.push(['Değerlendirme', karar]);
    return {
      rows,
      text: satirlar.join('\n'),
      note: 'NBD = −yatırım + Σ nakit akışı ÷ (1 + oran)^yıl. Akışların her yılın sonunda gerçekleştiği varsayılır.',
    };
  }
