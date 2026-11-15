// Tüp Hava Tüketimi (SAC) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tup = h.pos(v.tup, 'Tüp hacmi');
    const p1 = h.pos(v.baslangic, 'Başlangıç basıncı');
    const p2 = h.nonneg(v.bitis, 'Bitiş basıncı');
    const d = h.nonneg(v.derinlik, 'Ortalama derinlik');
    const t = h.pos(v.sure, 'Dalış süresi');
    if (tup > 50) h.err('Tüp hacmi 50 litreden büyük olamaz; tüpün su hacmini litre olarak yazın (örn. 12).');
    if (p1 > 350) h.err('Başlangıç basıncı 350 bardan büyük olamaz; değeri bar cinsinden yazın.');
    if (p2 >= p1) h.err('Bitiş basıncı başlangıç basıncından küçük olmalı; iki değeri kontrol edin.');
    if (d > 100) h.err('Ortalama derinlik 100 metreden büyük olamaz.');
    const metreBasinaBar = v.su === 'tatli' ? 10.3 : 10;
    const ortam = d / metreBasinaBar + 1;
    const dusus = p1 - p2;
    const hava = dusus * tup;
    const rmv = hava / t / ortam;
    const sacBar = dusus / t / ortam;
    return {
      rows: [
        ['Yüzey hava tüketimi (SAC/RMV)', h.fmt(rmv, 1) + ' litre/dakika'],
        ['Basınç cinsinden SAC', h.fmt(sacBar, 2) + ' bar/dakika'],
        ['Tüketilen hava', h.fmt(hava, 0) + ' litre'],
        ['Ortalama ortam basıncı', h.fmt(ortam, 2) + ' bar'],
        ['Derinlikteki tüketim', h.fmt(rmv * ortam, 1) + ' litre/dakika'],
      ],
      note: 'Bar/dakika değeri yalnızca bu tüp hacmi için geçerlidir. Sonuç bilgilendirme amaçlıdır; dalış planı eğitiminize ve dalış liderinizin kurallarına göre yapılmalıdır.',
    };
  }
