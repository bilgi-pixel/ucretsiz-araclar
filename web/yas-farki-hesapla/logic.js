// Yaş Farkı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d1 = h.date(v.dogum1, '1. kişinin doğum tarihi');
    const d2 = h.date(v.dogum2, '2. kişinin doğum tarihi');
    const ayni = d1.getTime() === d2.getTime();
    const a = d1.getTime() <= d2.getTime() ? d1 : d2; // büyük olan (önce doğan)
    const b = a === d1 ? d2 : d1;
    // Ay ekleme: hedef ayda o gün yoksa ayın son günü alınır
    const ekle = (d, n) => {
      const t = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(t / 12), m = t % 12;
      return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), new Date(Date.UTC(y, m + 1, 0)).getUTCDate())));
    };
    let n = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    if (ekle(a, n).getTime() > b.getTime()) n--;
    const yil = Math.floor(n / 12), ay = n % 12, gun = h.gunFarki(ekle(a, n), b);
    const parca = [];
    if (yil) parca.push(yil + ' yıl');
    if (ay) parca.push(ay + ' ay');
    if (gun) parca.push(gun + ' gün');
    const toplam = h.gunFarki(a, b);
    const hafta = Math.floor(toplam / 7), artan = toplam % 7;
    return {
      rows: [
        ['Yaş farkı', ayni ? 'Yok (aynı gün doğmuşlar)' : parca.join(' ')],
        ['Büyük olan', ayni ? 'Yaşıtlar' : (a === d1 ? '1. kişi' : '2. kişi')],
        ['Toplam gün', h.fmt(toplam, 0) + ' gün'],
        ['Toplam hafta', h.fmt(hafta, 0) + ' hafta' + (artan ? ' ' + artan + ' gün' : '')],
        ['Toplam tam ay', h.fmt(yil * 12 + ay, 0) + ' ay'],
        ['Ondalık yıl olarak', h.fmt(toplam / 365.2425, 2) + ' yıl'],
      ],
      note: 'Fark, doğum saatleri dikkate alınmadan tam günler üzerinden hesaplanır. Ondalık yıl değeri ortalama 365,2425 günlük yıl ile bulunur.',
    };
  }
