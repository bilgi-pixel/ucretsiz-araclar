// Yüzde Değişim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const eski = h.num(v.eski, 'Eski (başlangıç) değer');
    const yeni = h.num(v.yeni, 'Yeni (son) değer');
    if (eski === 0) h.err('Eski değer sıfır olamaz; sıfırdan başlayan bir değişim yüzdeyle ifade edilemez. Sıfırdan farklı bir başlangıç değeri yazın.');
    const fark = yeni - eski;
    const oran = (fark / Math.abs(eski)) * 100;
    const yaz = (o) => {
      if (Math.abs(o) < 5e-7) return '%0 (değişim yok)';
      return `%${h.fmt(Math.abs(o), 2)} ${o > 0 ? 'artış' : 'azalış'}`;
    };
    const farkYaz = (fark > 0 ? '+' : '') + h.fmt(fark, 4);
    const geri = yeni === 0 ? 'Hesaplanamaz (yeni değer 0)' : yaz(((eski - yeni) / Math.abs(yeni)) * 100);
    return {
      rows: [
        ['Yüzde değişim', yaz(oran)],
        ['Fark', farkYaz],
        ['Kat (yeni ÷ eski)', h.fmt(yeni / eski, 4)],
        ['Eski değere dönmek için', geri],
      ],
      note: 'Formül: (yeni − eski) ÷ |eski| × 100. Oran her zaman eski değere göre hesaplanır.' + (eski < 0 ? ' Eski değer negatif olduğunda yüzde değişim yanıltıcı olabilir; farkı ayrıca değerlendirin.' : ''),
    };
  }
