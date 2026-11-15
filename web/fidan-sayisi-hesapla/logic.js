// Fidan Sayısı (Dikim Aralığı) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Dikim alanı');
    const sa = h.pos(v.siraArasi, 'Sıra arası mesafe');
    const su = h.pos(v.siraUzeri, 'Sıra üzeri mesafe');
    const yedek = h.nonneg(v.yedek, 'Yedek fidan payı');
    const ucgen = v.sistem === 'ucgen';
    if (ucgen && Math.abs(sa - su) > 1e-9) h.err('Üçgen dikimde ağaçlar arası mesafe her yönde eşittir; sıra arası ve sıra üzeri alanlarına aynı değeri yazın.');
    const m2 = alan * 1000;
    const agacAlan = ucgen ? su * su * Math.sqrt(3) / 2 : sa * su;
    const ham = m2 / agacAlan;
    const adet = Math.floor(ham + 1e-9);
    const rows = [
      ['Gereken fidan sayısı', h.fmt(adet, 0) + ' adet'],
      ['Dekara fidan sayısı', h.fmt(1000 / agacAlan, 2) + ' adet/da'],
      ['Bir ağaca düşen alan', h.fmt(agacAlan, 2) + ' m²'],
      ['Dikim alanı', h.fmt(m2, 1) + ' m²'],
    ];
    if (ucgen) rows.push(['Sıralar arası dik mesafe', h.fmt(su * Math.sqrt(3) / 2, 2) + ' m']);
    if (yedek > 0) {
      const ek = Math.ceil(adet * yedek / 100 - 1e-9);
      rows.push(['Yedek fidan', h.fmt(ek, 0) + ' adet']);
      rows.push(['Yedekle birlikte sipariş', h.fmt(adet + ek, 0) + ' adet']);
    }
    return {
      rows,
      note: 'Hesap alanın tamamının dikildiğini varsayar; yol, sınır boşluğu ve parselin şekli nedeniyle gerçek sayı biraz daha düşük çıkabilir.',
    };
  }
