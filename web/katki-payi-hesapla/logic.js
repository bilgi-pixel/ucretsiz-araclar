// Katkı Payı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const fiyat = h.pos(v.fiyat, 'Birim satış fiyatı');
    const deg = h.nonneg(v.degisken, 'Birim değişken maliyet');
    const kp = fiyat - deg;
    const rows = [
      ['Birim katkı payı', h.para(kp)],
      ['Katkı payı oranı', yuzde(kp / fiyat * 100)],
      ['Değişken maliyet oranı', '%' + h.fmt(deg / fiyat * 100, 2)],
    ];
    let adet = null;
    if (dolu(v.adet)) {
      adet = h.nonneg(v.adet, 'Satış adedi');
      rows.push(['Toplam satış tutarı', h.para(fiyat * adet)]);
      rows.push(['Toplam katkı payı', h.para(kp * adet)]);
    }
    let note = 'Katkı payı, sabit giderler düşülmeden önceki tutardır; kâr değildir.';
    if (dolu(v.sabit)) {
      const sabit = h.nonneg(v.sabit, 'Dönem sabit giderleri');
      if (adet !== null) rows.push(['Faaliyet kârı', h.para(kp * adet - sabit)]);
      if (kp > 1e-12) {
        const bb = sabit / kp;
        rows.push(['Başabaş satış adedi', h.fmt(bb, 2) + ' adet']);
        rows.push(['Başabaş cirosu', h.para(bb * fiyat)]);
        note = 'Başabaş adedi, toplam katkı payının sabit giderlere eşitlendiği satış miktarıdır. Kesirli çıkan adet yukarı yuvarlanarak okunmalıdır.';
      } else {
        note = 'Birim katkı payı sıfır ya da negatif olduğu için başabaş noktası yoktur: bu fiyatla ne kadar çok satılırsa satılsın sabit giderler karşılanamaz.';
      }
    } else if (kp < 0) {
      note = 'Birim katkı payı negatif: ürün değişken maliyetinin altında satılıyor, her satış zararı büyütür.';
    }
    return { rows, note };
  }
