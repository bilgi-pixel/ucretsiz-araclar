// Kelime Sayısından Sayfa Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kelime = h.pos(v.kelime, 'Kelime sayısı');
    const ozel = String(v.sayfaBasi ?? '').trim() !== '';
    let wpp;
    if (ozel) wpp = h.pos(v.sayfaBasi, 'Sayfa başına kelime');
    else {
      const pt = Number(v.punto), ar = Number(v.aralik);
      if (![10, 11, 12, 14].includes(pt) || ![1, 1.5, 2].includes(ar)) h.err('Yazı boyutu ve satır aralığını listeden seçin.');
      wpp = (500 * (12 / pt) * (12 / pt)) / ar;
    }
    const sayfa = kelime / wpp;
    const tam = Math.max(1, Math.ceil(sayfa - 1e-9));
    return {
      rows: [
        ['Sayfa sayısı', `${h.fmt(sayfa, 1)} sayfa`],
        ['Tam sayfa olarak', `${h.fmt(tam, 0)} sayfa`],
        ['Sayfa başına kelime', `${h.fmt(wpp, 0)} kelime`],
      ],
      note: ozel ? 'Hesap, girdiğiniz sayfa başına kelime değeriyle yapıldı.'
        : 'Tahmin; A4 kâğıt, standart kenar boşluğu ve düz paragraf metni içindir. Başlık, tablo ve görseller sayfa sayısını artırır.',
    };
  }
