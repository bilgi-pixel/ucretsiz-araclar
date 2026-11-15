// Çocuk Boy Tahmini Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const anne = h.pos(v.anne, 'Anne boyu');
    const baba = h.pos(v.baba, 'Baba boyu');
    if (anne < 120 || anne > 220) h.err('"Anne boyu" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın.');
    if (baba < 120 || baba > 220) h.err('"Baba boyu" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın.');
    const erkek = v.cinsiyet !== 'kiz';
    const hedef = (anne + baba + (erkek ? 13 : -13)) / 2;
    const alt = hedef - 8.5;
    const ust = hedef + 8.5;
    const inc = hedef / 2.54;
    const ft = Math.floor(inc / 12 + 1e-9);
    return {
      rows: [
        ['Tahmini yetişkin boyu', h.fmt(hedef, 1) + ' cm'],
        ['Olası aralık', `${h.fmt(alt, 1)} – ${h.fmt(ust, 1)} cm`],
        ['Ebeveyn boy ortalaması', h.fmt((anne + baba) / 2, 1) + ' cm'],
        ['Feet ve inç karşılığı', `${ft} ft ${h.fmt(inc - ft * 12, 1)} inç`],
      ],
      note: 'Hedef boy yöntemi: erkek çocukta (anne + baba + 13) ÷ 2, kız çocukta (anne + baba − 13) ÷ 2; aralık ±8,5 cm. Sonuç istatistiksel bir tahmindir, tıbbi değerlendirme değildir.',
    };
  }
