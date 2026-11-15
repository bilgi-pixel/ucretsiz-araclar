// Hisse Ortalama Maliyet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.alimlar);
    if (!satirlar.length) h.err('"Alımlar" alanına en az bir alım yazın (örn. 100 50).');
    if (satirlar.length > 500) h.err('En fazla 500 alım satırı girebilirsiniz.');
    const bos = (s) => String(s ?? '').trim() === '';
    const kom = bos(v.komisyon) ? 0 : h.nonneg(v.komisyon, 'Alım komisyonu');
    if (kom >= 100) h.err('"Alım komisyonu" %100\'den küçük olmalı.');
    const guncel = bos(v.guncel) ? null : h.nonneg(v.guncel, 'Güncel fiyat');
    let adet = 0, tutar = 0;
    satirlar.forEach((s, i) => {
      const p = s.split(/[\s;xX*×]+/).filter(Boolean);
      if (p.length !== 2) h.err((i + 1) + '. satırda tam iki değer olmalı: adet ve fiyat (örn. 100 50).');
      const a = h.pos(p[0], (i + 1) + '. satır adet');
      const f = h.pos(p[1], (i + 1) + '. satır fiyat');
      adet += a;
      tutar += a * f;
    });
    const komTutar = tutar * kom / 100;
    const maliyet = tutar + komTutar;
    const ort = maliyet / adet;
    const rows = [
      ['Ortalama maliyet', h.fmt(ort, 4) + ' TL'],
      ['Toplam adet', h.fmt(adet, 4)],
      ['Toplam maliyet', h.para(maliyet)],
      ['Alım sayısı', String(satirlar.length)],
    ];
    if (kom > 0) rows.push(['Ödenen komisyon', h.para(komTutar)]);
    if (guncel !== null) {
      const deger = adet * guncel;
      const kz = deger - maliyet;
      const oran = (kz / maliyet) * 100;
      const t = h.fmt(Math.abs(oran), 2);
      rows.push(['Güncel değer', h.para(deger)]);
      rows.push(['Kâr/zarar', h.para(kz)]);
      rows.push(['Kâr/zarar oranı', (oran < 0 && t !== '0' ? '-%' : '%') + t]);
    }
    return { rows, note: 'Ortalama maliyet = toplam ödenen tutar ÷ toplam adet. Satış komisyonu ve vergiler kâr/zarar hesabına dahil değildir.' };
  }
