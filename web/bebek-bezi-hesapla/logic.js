// Bebek Bezi İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gunluk = h.pos(v.gunluk, 'Günlük bez sayısı');
    if (gunluk > 30) h.err('"Günlük bez sayısı" 30\'dan büyük olamaz; günlük ortalamayı yazdığınızdan emin olun.');
    const gun = h.posint(v.gun, 'Süre');
    const paketAdet = h.posint(v.paketAdet, 'Paketteki bez adedi');
    const toplam = Math.ceil(gunluk * gun - 1e-9);
    const paket = Math.ceil(toplam / paketAdet - 1e-9);
    const artan = paket * paketAdet - toplam;
    const rows = [
      ['Toplam bez ihtiyacı', `${h.fmt(toplam, 0)} adet`],
      ['Alınacak paket sayısı', `${h.fmt(paket, 0)} paket`],
      ['Süre sonunda artan bez', `${h.fmt(artan, 0)} adet`],
      ['Bir paketin yeteceği süre', `${h.fmt(paketAdet / gunluk, 1)} gün`],
    ];
    if (String(v.paketFiyat || '').trim() !== '') {
      const fiyat = h.pos(v.paketFiyat, 'Paket fiyatı');
      const adetFiyat = fiyat / paketAdet;
      rows.push(['Bez adet fiyatı', h.para(adetFiyat)]);
      rows.push(['Toplam paket maliyeti', h.para(paket * fiyat)]);
      rows.push(['Günlük bez masrafı', h.para(gunluk * adetFiyat)]);
      rows.push(['Kullanılan bezlerin maliyeti', h.para(toplam * adetFiyat)]);
    }
    return {
      rows,
      note: 'Hesap, yazdığınız günlük ortalamaya dayanır. Bebeğin yaşı, beslenmesi ve sağlık durumu bez tüketimini değiştirir; beden geçişlerine yakın dönemlerde fazla stok yapmayın.',
    };
  }
