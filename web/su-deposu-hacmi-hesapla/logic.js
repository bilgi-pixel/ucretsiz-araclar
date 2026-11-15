// Su Deposu Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const H = h.pos(v.yukseklik, 'Yükseklik');
    let taban; // cm²
    if (v.sekil === 'silindir') {
      const d = h.pos(v.cap, 'Çap');
      taban = Math.PI * d * d / 4;
    } else {
      taban = h.pos(v.boy, 'Boy') * h.pos(v.en, 'En');
    }
    const bos = (s) => String(s ?? '').trim() === '';
    const sev = bos(v.seviye) ? H : h.nonneg(v.seviye, 'Su seviyesi');
    if (sev > H + 1e-9) h.err('Su seviyesi depo yüksekliğinden büyük olamaz.');
    const toplam = taban * H / 1000; // litre
    const mevcut = taban * sev / 1000;
    const rows = [
      ['Toplam hacim', h.fmt(toplam, 1) + ' litre'],
      ['Metreküp', h.fmt(toplam / 1000, 3) + ' m³'],
      ['Depodaki su', h.fmt(mevcut, 1) + ' litre'],
      ['Doluluk oranı', '%' + h.fmt(sev / H * 100, 1)],
      ['Suyun ağırlığı', h.fmt(mevcut, 1) + ' kg'],
      ['Her 1 cm seviye', h.fmt(taban / 1000, 2) + ' litre'],
    ];
    if (!bos(v.tuketim)) {
      const t = h.pos(v.tuketim, 'Günlük su tüketimi');
      rows.push(['Yeteceği süre', h.fmt(mevcut / t, 1) + ' gün']);
    }
    return {
      rows,
      note: 'İç ölçülere göre hesaplanır; 1 litre su yaklaşık 1 kg kabul edilmiştir. Deponun kendi ağırlığı dahil değildir.',
    };
  }
