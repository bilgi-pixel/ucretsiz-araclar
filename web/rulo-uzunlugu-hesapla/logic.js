// Rulo Uzunluğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const D = h.pos(v.disCap, 'Rulo dış çapı');
    const d = h.nonneg(v.icCap, 'Göbek dış çapı');
    let t = h.pos(v.kalinlik, 'Malzeme kalınlığı');
    if (v.kalinlikBirim === 'mikron') t = t / 1000;
    if (d >= D) h.err('Rulo dış çapı göbek çapından büyük olmalı. İki değeri de aynı birimle (mm) ölçtüğünüzden emin olun.');
    if (t > (D - d) / 2 + 1e-9) h.err('Malzeme kalınlığı, rulonun sarılı kısmından kalın olamaz. Kalınlık birimini (mm ya da mikron) kontrol edin.');
    const L = Math.PI * (D * D - d * d) / (4 * t);
    const sarim = (D - d) / (2 * t);
    const rows = [
      ['Rulo uzunluğu', h.fmt(L / 1000, 2) + ' m'],
      ['Sarım sayısı', h.fmt(sarim, 1) + ' tur'],
      ['Ortalama sarım çevresi', h.fmt(Math.PI * (D + d) / 2, 2) + ' mm'],
      ['Sarılı katman kalınlığı', h.fmt((D - d) / 2, 2) + ' mm'],
    ];
    if (String(v.en ?? '').trim() !== '') {
      const en = h.pos(v.en, 'Rulo eni');
      rows.push(['Toplam yüzey alanı', h.fmt(L / 1000 * en / 1000, 2) + ' m²']);
    }
    return {
      rows,
      note: 'Uzunluk = π × (D² − d²) ÷ (4 × kalınlık). Sarımın sıkı ve boşluksuz olduğu varsayılır; gevşek sarılı rulolarda gerçek uzunluk daha kısadır.',
    };
  }
