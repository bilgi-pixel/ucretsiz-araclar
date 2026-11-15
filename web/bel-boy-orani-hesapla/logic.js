// Bel Boy Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bel = h.pos(v.bel, 'Bel çevresi');
    const boy = h.pos(v.boy, 'Boy');
    if (boy < 50 || boy > 250) h.err('Boy 50 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,70 değil 170).');
    if (bel < 20 || bel > 250) h.err('Bel çevresi 20 ile 250 cm arasında olmalı; değeri santimetre olarak yazın.');
    const oran = bel / boy;
    const o = oran + 1e-9;
    const durum = o >= 0.6 ? 'Yüksek risk (0,60 ve üzeri)'
      : o >= 0.5 ? 'Artmış risk (0,50–0,59)'
      : o >= 0.4 ? 'Sağlıklı aralık (0,40–0,49)'
      : 'Düşük (0,40 altı)';
    const sinir = boy * 0.5;
    const fark = bel - sinir;
    return {
      rows: [
        ['Bel boy oranı', h.fix(oran, 2)],
        ['Değerlendirme', durum],
        ['Boyunuza göre bel çevresi üst sınırı', h.fmt(sinir, 1) + ' cm'],
        ['Sınıra göre durum', fark > 1e-9 ? `Sınırın ${h.fmt(fark, 1)} cm üzerinde` : Math.abs(fark) <= 1e-9 ? 'Tam sınırda' : `Sınırın ${h.fmt(-fark, 1)} cm altında`],
        ['Sağlıklı aralığa karşılık gelen bel çevresi', `${h.fmt(boy * 0.4, 1)} – ${h.fmt(sinir, 1)} cm`],
      ],
      note: 'Aralıklar yetişkinler için yaygın kullanılan sınırlardır ve kadın-erkek ayrımı yapılmaz. Sonuç tanı değildir.',
    };
  }
