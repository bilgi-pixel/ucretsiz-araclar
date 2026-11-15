// Litre Metreküp Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const litre = v.yon === 'ml' ? x * 1000 : x;
    const m3 = litre / 1000;
    const m3Satir = ['Metreküp', h.fmt(m3, 6) + ' m³'];
    const lSatir = ['Litre', h.fmt(litre, 3) + ' L'];
    return {
      rows: [
        v.yon === 'ml' ? lSatir : m3Satir,
        v.yon === 'ml' ? m3Satir : lSatir,
        ['Desimetreküp', h.fmt(litre, 3) + ' dm³'],
        ['Santimetreküp', h.fmt(litre * 1000, 0) + ' cm³'],
        ['Suyun yaklaşık kütlesi', h.fmt(litre, 1) + ' kg'],
      ],
      note: '1 m³ = 1000 L (tam). Kütle satırı yalnızca su içindir ve 1 litre suyun yaklaşık 1 kg geldiği varsayımına dayanır.',
    };
  }
