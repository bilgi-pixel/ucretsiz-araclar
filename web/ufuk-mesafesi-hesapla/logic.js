// Ufuk Mesafesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const goz = h.pos(v.goz, 'Göz yüksekliği');
    const hedef = h.opt(v.hedef, 0, 'Hedef cismin yüksekliği');
    if (hedef < 0) h.err('"Hedef cismin yüksekliği" negatif olamaz.');
    if (goz > 100000 || hedef > 100000) h.err('Yükseklik en fazla 100.000 m (100 km) olabilir; değeri metre cinsinden yazın.');
    const R = 6371000 * (v.kirilma === 'var' ? 7 / 6 : 1);
    const ufuk = (y) => Math.sqrt(2 * R * y + y * y);
    const d1 = ufuk(goz);
    const d2 = ufuk(hedef);
    const aci = (Math.atan(d1 / R) * 180) / Math.PI;
    const rows = [
      ['Ufuk mesafesi', h.fmt(d1 / 1000, 2) + ' km'],
      ['Ufuk mesafesi (deniz mili)', h.fmt(d1 / 1852, 2) + ' deniz mili'],
      ['Ufuk alçalma açısı', h.fmt(aci, 3) + '°'],
    ];
    if (hedef > 0) {
      rows.push(['Hedefin ufku', h.fmt(d2 / 1000, 2) + ' km']);
      rows.push(['Hedefin görülebildiği en uzak mesafe', h.fmt((d1 + d2) / 1000, 2) + ' km']);
    }
    return {
      rows,
      note: v.kirilma === 'var'
        ? 'Standart atmosferde ışığın bükülmesi, Dünya yarıçapı 7/6 oranında büyütülerek hesaba katıldı. Gerçek kırılma hava koşullarına göre değişir.'
        : 'Dünya 6.371 km yarıçaplı küre kabul edildi; atmosfer kırılması, dalga ve arazi engelleri hesaba katılmadı.',
    };
  }
