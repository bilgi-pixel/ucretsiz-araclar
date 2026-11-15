// Yatırım Getirisi (ROI) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const m = h.pos(v.maliyet, 'Yatırım tutarı');
    const d = h.nonneg(v.deger, 'Elde edilen toplam değer');
    const sure = String(v.sure ?? '').trim() === '' ? null : h.pos(v.sure, 'Yatırım süresi');
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const kazanc = d - m;
    const roi = (kazanc / m) * 100;
    const rows = [
      ['Yatırım getirisi (ROI)', yuzde(roi)],
      ['Net kazanç', h.para(kazanc)],
      ['Getiri katsayısı', h.fmt(d / m, 4) + ' kat'],
    ];
    if (sure !== null) {
      const yillik = (Math.pow(d / m, 1 / sure) - 1) * 100;
      rows.push(['Yıllıklandırılmış getiri', yuzde(yillik)]);
      rows.push(['Basit yıllık ortalama', yuzde(roi / sure)]);
    }
    const durum = kazanc > 0 ? 'Yatırım kârda.' : kazanc < 0 ? 'Yatırım zararda.' : 'Yatırım başabaş noktasında.';
    return { rows, note: durum + ' ROI = (elde edilen değer − yatırım tutarı) ÷ yatırım tutarı × 100. Enflasyon ve vergi ayrıca dikkate alınmalıdır.' };
  }
