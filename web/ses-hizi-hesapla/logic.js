// Ses Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    if (T <= -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) üzerinde olmalı.');
    if (T > 1000) h.err('Bu formül çok yüksek sıcaklıklar için uygun değil; 1000 °C ya da altında bir değer yazın.');
    const hiz = 331.3 * Math.sqrt(1 + T / 273.15);
    const rows = [
      ['Ses hızı', h.fmt(hiz, 2) + ' m/s'],
      ['Ses hızı (km/sa)', h.fmt(hiz * 3.6, 1) + ' km/sa'],
      ['Doğrusal yaklaşımla', h.fmt(331.3 + 0.606 * T, 2) + ' m/s'],
      ['1 km için geçen süre', h.fmt(1000 / hiz, 2) + ' s'],
    ];
    if (String(v.sure ?? '').trim() !== '') {
      const t = h.nonneg(v.sure, 'Süre');
      rows.push(['Alınan yol', h.fmt(hiz * t, 1) + ' m']);
      rows.push(['Yankı için engel uzaklığı', h.fmt(hiz * t / 2, 1) + ' m']);
    }
    if (String(v.frekans ?? '').trim() !== '') {
      const f = h.pos(v.frekans, 'Frekans');
      rows.push(['Dalga boyu', h.fmt(hiz / f, 4) + ' m']);
    }
    return {
      rows,
      note: 'Kuru hava için ideal gaz yaklaşımı kullanılır. Nem hızı çok az artırır; basıncın gündelik koşullarda etkisi ihmal edilir.',
    };
  }
