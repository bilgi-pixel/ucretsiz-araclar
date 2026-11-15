// Taşınma Koli Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const BAZ = { '1+0': 15, '1+1': 25, '2+1': 40, '3+1': 55, '4+1': 70, '5+1': 85 };
    const CARPAN = { az: 0.8, orta: 1, cok: 1.3 };
    const baz = BAZ[v.ev];
    if (!baz) h.err('Listeden bir ev tipi seçin.');
    const kisi = h.posint(v.kisi, 'Evde yaşayan kişi sayısı');
    if (kisi > 15) h.err('"Evde yaşayan kişi sayısı" en fazla 15 olabilir.');
    const rulo = h.pos(v.rulo, 'Koli bandı rulo uzunluğu');
    const carpan = CARPAN[v.yogunluk] || 1;
    const toplam = Math.ceil((baz + (kisi - 1) * 5) * carpan - 1e-9);
    const kucuk = Math.round(toplam * 0.3 + 1e-9);
    const buyuk = Math.round(toplam * 0.2 + 1e-9);
    const orta = toplam - kucuk - buyuk;
    const bant = toplam * 3;
    const ruloAdet = Math.ceil(bant / rulo - 1e-9);
    const hacim = (kucuk * 36 + orta * 80 + buyuk * 150) / 1000;
    return {
      rows: [
        ['Tahmini koli sayısı', `${toplam} koli`],
        ['Küçük koli (kitap, tabak, ağır eşya)', `${kucuk} adet`],
        ['Orta koli (mutfak, giysi, genel)', `${orta} adet`],
        ['Büyük koli (yorgan, yastık, hafif eşya)', `${buyuk} adet`],
        ['Koli bandı', `${h.fmt(bant, 0)} m (${ruloAdet} rulo)`],
        ['Kolilerin yaklaşık toplam hacmi', `${h.fmt(hacim, 2)} m³`],
      ],
      note: 'Bu bir kestirimdir: ev tipi için bir başlangıç değeri alınır, ilk kişiden sonraki her kişi için 5 koli eklenir ve yoğunluğa göre düzeltilir. Mobilya, beyaz eşya ve askılı giysiler koliye girmediği için hesaba dahil değildir. Hacim; 40×30×30, 50×40×40 ve 60×50×50 cm koli ölçüleri varsayılarak bulunur.',
    };
  }
