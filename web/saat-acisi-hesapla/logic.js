// Akrep Yelkovan Açısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = h.int(v.saat, 'Saat');
    if (s < 0 || s > 23) h.err('"Saat" 0 ile 23 arasında olmalı.');
    const d = h.nonneg(v.dakika, 'Dakika');
    if (d >= 60) h.err('"Dakika" 60\'tan küçük olmalı (0–59,99).');
    const akrep = (s % 12) * 30 + d * 0.5;
    const yelkovan = d * 6;
    let fark = Math.abs(akrep - yelkovan);
    if (fark > 180) fark = 360 - fark;
    fark = Math.round(fark * 1e6) / 1e6;
    let tur;
    if (fark === 0) tur = 'Sıfır açı (ibreler üst üste)';
    else if (fark < 90) tur = 'Dar açı';
    else if (fark === 90) tur = 'Dik açı';
    else if (fark < 180) tur = 'Geniş açı';
    else tur = 'Doğru açı (ibreler zıt yönde)';
    return {
      rows: [
        ['Küçük açı', h.fmt(fark, 3) + '°'],
        ['Büyük açı', h.fmt(360 - fark, 3) + '°'],
        ['Akrebin konumu', h.fmt(akrep, 3) + '°'],
        ['Yelkovanın konumu', h.fmt(yelkovan, 3) + '°'],
        ['Açı türü', tur],
      ],
      note: 'İbre konumları 12 hizasından saat yönünde ölçülür. Akrebin dakikalar ilerledikçe sürekli kaydığı varsayılır.',
    };
  }
