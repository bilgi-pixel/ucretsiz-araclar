// Tarihi Roma Rakamına Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d = h.date(v.tarih, 'Tarih');
    const gun = d.getUTCDate(), ay = d.getUTCMonth() + 1, yil = d.getUTCFullYear();
    if (yil < 1 || yil > 3999) h.err('Standart Roma rakamlarıyla yalnızca 1–3999 arasındaki yıllar yazılabilir.');
    const roma = (n) => {
      const tablo = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
      let s = '';
      for (const [deger, simge] of tablo) while (n >= deger) { s += simge; n -= deger; }
      return s;
    };
    const G = roma(gun), A = roma(ay), Y = roma(yil);
    const ayr = { nokta: '.', orta: '·', tire: '-', egik: '/', bosluk: ' ' }[v.ayrac] ?? '.';
    const parcalar = v.sira === 'agy' ? [A, G, Y] : v.sira === 'yag' ? [Y, A, G] : [G, A, Y];
    const yazim = parcalar.join(ayr);
    return {
      rows: [
        ['Roma rakamıyla tarih', yazim],
        ['Gün', `${gun} = ${G}`],
        ['Ay', `${ay} (${h.ayAdi(ay)}) = ${A}`],
        ['Yıl', `${yil} = ${Y}`],
        ['Haftanın günü', h.gunAdi(d)],
        ['Karakter sayısı (ayraçlar dahil)', String(Array.from(yazim).length)],
      ],
      note: 'Çıkarma kuralına dayalı standart yazım kullanılır (4 = IV, 9 = IX, 40 = XL, 90 = XC, 400 = CD, 900 = CM).',
    };
  }
