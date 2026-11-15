// Paralel Direnç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const liste = h.nums(v.direncler, 'Direnç değerleri').map((x) => {
      if (!(x > 0)) h.err('Direnç değerleri sıfırdan büyük olmalı. Sıfır ohm kısa devre anlamına gelir.');
      return x * carpan;
    });
    if (liste.length < 2) h.err('Paralel bağlantı için en az iki direnç değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 direnç değeri yazabilirsiniz.');
    const iletkenlik = liste.reduce((a, r) => a + 1 / r, 0);
    const es = 1 / iletkenlik;
    const ohmYaz = (r) => (r >= 1e6 ? h.fmt(r / 1e6, 4) + ' MΩ' : r >= 1e3 ? h.fmt(r / 1e3, 4) + ' kΩ' : h.fmt(r, 4) + ' Ω');
    const rows = [
      ['Eşdeğer direnç', h.fmt(es, 4) + ' Ω'],
      ['Kısa gösterim', ohmYaz(es)],
      ['Direnç sayısı', String(liste.length)],
      ['En küçük direnç', ohmYaz(Math.min(...liste))],
      ['Toplam iletkenlik', h.sig(iletkenlik * 1000, 6) + ' mS'],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      rows.push(['Toplam akım', h.fmt(u / es, 4) + ' A']);
      rows.push(['Kol akımları', liste.map((r) => h.fmt(u / r, 4) + ' A').join(' · ')]);
      rows.push(['Toplam güç', h.fmt(u * u / es, 4) + ' W']);
    }
    return { rows, note: 'Eşdeğer direnç her zaman en küçük dirençten küçüktür. Dirençler ideal kabul edilmiştir.' };
  }
