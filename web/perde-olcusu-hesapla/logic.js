// Perde Ölçüsü ve Kumaş Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const g = h.pos(v.genislik, 'Korniş / ray genişliği');
    const boy = h.pos(v.boy, 'Bitmiş perde boyu');
    const pile = Number(v.pile);
    if (!(pile >= 1)) h.err('Pile oranı listeden seçilmelidir.');
    const ke = h.pos(v.kumasEni, 'Kumaş eni');
    const kanat = v.kanat === '2' ? 2 : 1;
    const bp = h.nonneg(v.boyPay, 'Etek ve büzgü payı');
    const yp = h.nonneg(v.yanPay, 'Yan kenar payı');
    const kesim = boy + bp;
    const kanatGen = g * pile / kanat + 2 * yp;
    const toplamGen = kanatGen * kanat;
    const rows = [];
    if (v.kullanim === 'pano') {
      const panoKanat = Math.ceil(kanatGen / ke - 1e-9);
      const pano = panoKanat * kanat;
      rows.push(['Gerekli kumaş', h.fmt(pano * kesim / 100, 2) + ' m']);
      rows.push(['Pano sayısı', pano + ' adet']);
      rows.push(['Pano kesim boyu', h.fmt(kesim, 1) + ' cm']);
      rows.push(['Dikilecek toplam genişlik', h.fmt(toplamGen, 1) + ' cm']);
      rows.push(['Kanat başına genişlik', h.fmt(kanatGen, 1) + ' cm']);
      return { rows, note: 'Desenli kumaşlarda her pano için desen tekrarı (raport) kadar ek pay gerekir; bu pay hesaba dahil değildir.' };
    }
    if (ke + 1e-9 < kesim) h.err('Kumaş eni (' + h.fmt(ke, 1) + ' cm), perde boyu ile payların toplamından (' + h.fmt(kesim, 1) + ' cm) kısa. Daha geniş enli kumaş seçin ya da "Dar enli kumaş" kullanımına geçin.');
    rows.push(['Gerekli kumaş', h.fmt(toplamGen / 100, 2) + ' m']);
    rows.push(['Dikilecek toplam genişlik', h.fmt(toplamGen, 1) + ' cm']);
    rows.push(['Kanat başına genişlik', h.fmt(kanatGen, 1) + ' cm']);
    rows.push(['Gereken kumaş eni (boy + pay)', h.fmt(kesim, 1) + ' cm']);
    rows.push(['Enden artan kumaş', h.fmt(ke - kesim, 1) + ' cm']);
    return { rows, note: 'Geniş enli kumaşta metraj korniş boyunca alınır; kumaşın eni perdenin boyunu oluşturur.' };
  }
