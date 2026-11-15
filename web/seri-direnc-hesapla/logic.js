// Seri Direnç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const liste = h.nums(v.direncler, 'Direnç değerleri').map((x) => {
      if (!(x > 0)) h.err('Direnç değerleri sıfırdan büyük olmalı.');
      return x * carpan;
    });
    if (liste.length < 2) h.err('Seri bağlantı için en az iki direnç değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 direnç değeri yazabilirsiniz.');
    const toplam = liste.reduce((a, b) => a + b, 0);
    const ohmYaz = (r) => (r >= 1e6 ? h.fmt(r / 1e6, 4) + ' MΩ' : r >= 1e3 ? h.fmt(r / 1e3, 4) + ' kΩ' : h.fmt(r, 4) + ' Ω');
    const rows = [
      ['Eşdeğer direnç', h.fmt(toplam, 4) + ' Ω'],
      ['Kısa gösterim', ohmYaz(toplam)],
      ['Direnç sayısı', String(liste.length)],
      ['En büyük direnç', ohmYaz(Math.max(...liste))],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      const akim = u / toplam;
      rows.push(['Devre akımı', h.fmt(akim * 1000, 4) + ' mA']);
      rows.push(['Toplam güç', h.fmt(u * akim, 4) + ' W']);
      rows.push(['Gerilim düşümleri', liste.map((r) => h.fmt(akim * r, 3) + ' V').join(' · ')]);
      rows.push(['Dirençlerde harcanan güç', liste.map((r) => h.fmt(akim * akim * r * 1000, 2) + ' mW').join(' · ')]);
    }
    return { rows, note: 'Dirençler ideal kabul edilir; tolerans ve bağlantı kablolarının direnci hesaba katılmaz.' };
  }
