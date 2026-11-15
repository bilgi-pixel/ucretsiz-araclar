// Makaraya Sarılan Misina Uzunluğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const d1 = h.pos(v.capBilinen, 'Makarada yazan misina çapı');
    const l1 = h.pos(v.uzunlukBilinen, 'Makarada yazan kapasite');
    const d2 = h.pos(v.capYeni, 'Saracağınız misinanın çapı');
    if (d1 > 3 || d2 > 3) h.err('Misina çapı 3 mm\'den büyük olamaz; çapı milimetre olarak yazın (örn. 0,30).');
    const kapasite = l1 * (d1 / d2) * (d1 / d2);
    const rows = [
      ['Yeni misina kapasitesi', h.fmt(kapasite, 1) + ' m'],
      ['Kapasite oranı', h.fmt(kapasite / l1 * 100, 1) + ' %'],
    ];
    const bos = (s) => String(s ?? '').trim() === '';
    if (!bos(v.istenen)) {
      const ist = h.pos(v.istenen, 'Sarmak istediğiniz uzunluk');
      if (ist > kapasite * (1 + 1e-9)) h.err(`Bu makaraya ${h.fmt(d2, 3)} mm misinadan en fazla ${h.fmt(kapasite, 1)} m sığar; daha kısa bir uzunluk yazın.`);
      const doluluk = Math.min(1, ist / kapasite);
      rows.push(['Makara doluluğu', h.fmt(doluluk * 100, 1) + ' %']);
      rows.push(['Kalan boşluk (aynı misinayla)', h.fmt(kapasite - ist, 1) + ' m']);
      if (!bos(v.capDolgu)) {
        const d3 = h.pos(v.capDolgu, 'Dolgu misinası çapı');
        if (d3 > 3) h.err('Dolgu misinası çapı 3 mm\'den büyük olamaz.');
        rows.push(['Gereken dolgu misinası', h.fmt(l1 * (d1 / d3) * (d1 / d3) * (1 - doluluk), 1) + ' m']);
      }
    } else if (!bos(v.capDolgu)) {
      h.err('Dolgu misinası hesabı için "Sarmak istediğiniz uzunluk" alanını da doldurun.');
    }
    return {
      rows,
      note: 'Hesap, kapasitenin misina kesit alanıyla ters orantılı olduğu kabulüne dayanır. Sarım sıkılığı ve ip misinaların gerçek çapı sonucu yüzde 10–20 oynatabilir.',
    };
  }
