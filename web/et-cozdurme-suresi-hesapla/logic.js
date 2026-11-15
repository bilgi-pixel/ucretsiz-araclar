// Donmuş Et Çözdürme Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = h.pos(v.agirlik, 'Donmuş etin ağırlığı');
    if (kg > 20) h.err('Ağırlık 20 kg\'dan büyük olamaz; değeri kilogram olarak yazın (750 g için 0,75).');
    const su = v.yontem === 'su';
    // Buzdolabı: 11 saat/kg, en az 12 saat. Soğuk su: 65 dk/kg.
    const dk = su ? Math.round(kg * 65 + 1e-9) : Math.max(720, Math.round(kg * 660 + 1e-9));
    const sa = (m) => {
      const g = Math.floor(m / 1440), s = Math.floor((m % 1440) / 60), d = m % 60;
      const p = [];
      if (g) p.push(g + ' gün');
      if (s) p.push(s + ' saat');
      if (d) p.push(d + ' dk');
      return p.length ? p.join(' ') : '0 dk';
    };
    const rows = [
      ['Tahmini çözülme süresi', sa(dk)],
      ['Saat olarak', h.fmt(dk / 60, 1) + ' saat'],
    ];
    if (su) {
      rows.push(['Su değiştirme sayısı', Math.floor((dk - 1) / 30) + ' kez (30 dakikada bir)']);
      rows.push(['Çözüldükten sonra', 'Bekletmeden hemen pişirin']);
    } else {
      rows.push(['Çözüldükten sonra', 'Buzdolabında 1–2 gün içinde pişirin']);
    }
    const s = String(v.hedef ?? '').trim();
    if (s !== '') {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(s);
      if (!m || +m[1] > 23 || +m[2] > 59) h.err('Saati SS:DD biçiminde yazın (örn. 19:00) ya da alanı boş bırakın.');
      const fark = +m[1] * 60 + +m[2] - dk;
      const gun = fark < 0 ? Math.ceil(-fark / 1440) : 0;
      const t = ((fark % 1440) + 1440) % 1440;
      const saat = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
      rows.push(['Dondurucudan çıkarma zamanı', gun === 0 ? `Aynı gün ${saat}` : `${gun} gün önce ${saat}`]);
    }
    return {
      rows,
      note: su
        ? 'Soğuk su için yaklaşık 65 dk/kg alınmıştır. Et sızdırmaz poşette olmalı, su soğuk kalmalı ve 30 dakikada bir yenilenmelidir.'
        : 'Buzdolabı (yaklaşık 4 °C) için 11 saat/kg, en az 12 saat alınmıştır. Parçanın kalınlığı ve dolabın sıcaklığı süreyi değiştirir.',
    };
  }
