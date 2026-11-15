// Kreatin Kullanım Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kilo = h.pos(v.kilo, 'Vücut ağırlığı');
    if (kilo < 40 || kilo > 250) h.err('Vücut ağırlığı 40 ile 250 kg arasında olmalı.');
    const yukleme = v.protokol !== 'idame';
    const formulIdame = kilo * 0.03;
    const idame = Math.max(3, formulIdame);
    const rows = [];
    let yuklemeToplam = 0;
    let gun = 0;
    if (yukleme) {
      gun = h.posint(String(v.yuklemeGun ?? '').trim() === '' ? '5' : v.yuklemeGun, 'Yükleme süresi');
      if (gun < 5 || gun > 7) h.err('Yükleme süresi 5 ile 7 gün arasında olmalı.');
      const gunluk = kilo * 0.3;
      yuklemeToplam = gunluk * gun;
      rows.push(['Yükleme dozu', h.fmt(gunluk, 1) + ' g/gün']);
      rows.push(['Yüklemede doz başına', `4 × ${h.fmt(gunluk / 4, 1)} g`]);
      rows.push(['Yükleme dönemi toplamı', `${h.fmt(yuklemeToplam, 1)} g (${gun} gün)`]);
      rows.push(['İdame dozu', h.fmt(idame, 1) + ' g/gün']);
    } else {
      rows.push(['İdame dozu', h.fmt(idame, 1) + ' g/gün']);
    }
    rows.push(['Kiloya göre idame (0,03 g/kg)', h.fmt(formulIdame, 1) + ' g/gün']);
    const ilk30 = yuklemeToplam + idame * (30 - gun);
    rows.push(['İlk 30 günde toplam', h.fmt(ilk30, 0) + ' g']);
    if (String(v.paket ?? '').trim() !== '') {
      const paket = h.pos(v.paket, 'Kutu miktarı');
      if (paket > 10000) h.err('Kutu miktarı 10.000 gramdan büyük olamaz; gram cinsinden yazın.');
      let yeter;
      if (paket <= yuklemeToplam + 1e-9) {
        yeter = yukleme ? Math.floor(paket / (kilo * 0.3) + 1e-9) : 0;
      } else {
        yeter = gun + Math.floor((paket - yuklemeToplam) / idame + 1e-9);
      }
      rows.push(['Kutunun yeteceği süre', `${yeter} gün`]);
    }
    return {
      rows,
      note: 'Yükleme 0,3 g/kg/gün, idame 0,03 g/kg/gün üzerinden hesaplanır; idame dozu en az 3 g alınır. Değerler kreatin monohidrat içindir ve sağlıklı yetişkinlere yönelik genel bilgidir, tıbbi öneri değildir.',
    };
  }
