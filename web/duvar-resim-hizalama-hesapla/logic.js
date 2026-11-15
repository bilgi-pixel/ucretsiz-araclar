// Tablo Asma Yüksekliği ve Aralık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yuk = h.pos(v.yukseklik, 'Tablo yüksekliği');
    const aski = h.nonneg(h.opt(v.aski, 0, 'Askı uzaklığı'), 'Askı uzaklığı');
    const merkez = h.pos(v.merkez, 'Tablo ortasının yüksekliği');
    if (aski > yuk) h.err('Askı noktasının üst kenara uzaklığı tablo yüksekliğinden büyük olamaz.');
    const ust = merkez + yuk / 2;
    const alt = merkez - yuk / 2;
    if (alt < 0) h.err('Bu yükseklikte tablonun altı zemine taşıyor; orta yüksekliğini artırın ya da tablo ölçüsünü kontrol edin.');
    const civi = ust - aski;
    const rows = [
      ['Çivi yüksekliği (yerden)', h.fmt(civi, 1) + ' cm'],
      ['Tablonun üst kenarı', h.fmt(ust, 1) + ' cm'],
      ['Tablonun alt kenarı', h.fmt(alt, 1) + ' cm'],
    ];
    let note = 'Çivi yüksekliği = orta yüksekliği + tablo yüksekliğinin yarısı − askı uzaklığı. Ölçüler bitmiş zeminden alınır.';
    if (String(v.duvar ?? '').trim() !== '') {
      const duvar = h.pos(v.duvar, 'Duvar genişliği');
      const gen = h.pos(v.genislik, 'Tablo genişliği');
      const n = h.posint(v.adet, 'Tablo sayısı');
      if (n > 20) h.err('Tablo sayısı en fazla 20 olabilir.');
      const esit = String(v.aralik ?? '').trim() === '';
      let ara, kenar;
      if (esit) {
        ara = (duvar - n * gen) / (n + 1);
        kenar = ara;
      } else {
        ara = h.nonneg(v.aralik, 'Tablolar arası aralık');
        kenar = (duvar - n * gen - (n - 1) * ara) / 2;
      }
      if (kenar < -1e-9) h.err('Tablolar bu duvara sığmıyor; tablo sayısını ya da aralığı azaltın, duvar genişliğini kontrol edin.');
      const yerler = [];
      for (let i = 0; i < n; i++) yerler.push(h.fmt(kenar + gen / 2 + i * (gen + ara), 1) + ' cm');
      rows.push(['Çivi konumları (sol köşeden)', yerler.join(' · ')]);
      rows.push(['Tablolar arası boşluk', h.fmt(ara, 1) + ' cm']);
      rows.push(['Duvar kenarına kalan boşluk', h.fmt(Math.max(0, kenar), 1) + ' cm']);
      rows.push(['Grubun toplam genişliği', h.fmt(n * gen + (n - 1) * ara, 1) + ' cm']);
      note += esit ? ' Yatayda tablolar ve duvar kenarları arasındaki tüm boşluklar eşit dağıtıldı.' : ' Yatayda tablolar verilen aralıkla gruplandı ve grup duvara ortalandı.';
    }
    return { rows, note };
  }
