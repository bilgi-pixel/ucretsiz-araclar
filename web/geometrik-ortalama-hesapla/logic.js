// Geometrik Ortalama Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const yuzde = v.tur === 'yuzde';
    const c = yuzde ? a.map((x) => 1 + x / 100) : a;
    if (yuzde) {
      if (c.some((x) => !(x > 1e-12))) h.err('Yüzde değişimler -100\'den büyük olmalı; yüzde 100 ya da daha fazla düşüşte değer sıfırlandığı için ortalama oran hesaplanamaz.');
    } else if (c.some((x) => !(x > 0))) {
      h.err('Geometrik ortalama yalnızca sıfırdan büyük sayılar için hesaplanır. Sıfır ve negatif değerleri çıkarın; artış-azalış oranlarınız varsa "Yüzde değişimler" türünü seçin.');
    }
    const logOrt = c.reduce((s, x) => s + Math.log(x), 0) / n;
    const go = Math.exp(logOrt);
    const carpim = c.reduce((s, x) => s * x, 1);
    const ao = a.reduce((s, x) => s + x, 0) / n;
    const carpimMetin = Number.isFinite(carpim) && carpim > 0 ? h.sig(carpim, 8) : 'Gösterilemeyecek kadar büyük ya da küçük';
    if (yuzde) {
      return {
        rows: [
          ['Ortalama değişim oranı', '% ' + h.fmt((go - 1) * 100, 2)],
          ['Geometrik ortalama (çarpan)', h.fmt(go, 4)],
          ['Toplam değişim', Number.isFinite(carpim) ? '% ' + h.fmt((carpim - 1) * 100, 2) : '—'],
          ['Yüzdelerin aritmetik ortalaması', '% ' + h.fmt(ao, 2)],
          ['Dönem sayısı', String(n)],
        ],
        note: 'Her yüzde değişim (1 + oran ÷ 100) çarpanına çevrildi; çarpanların geometrik ortalamasından 1 çıkarılarak dönem başına ortalama oran bulundu.',
      };
    }
    return {
      rows: [
        ['Geometrik ortalama', h.fmt(go, 4)],
        ['Aritmetik ortalama', h.fmt(ao, 4)],
        ['Sayıların çarpımı', carpimMetin],
        ['Veri sayısı', String(n)],
      ],
      note: 'Geometrik ortalama, sayıların çarpımının n. dereceden köküdür ve aritmetik ortalamadan büyük olamaz.',
    };
  }
