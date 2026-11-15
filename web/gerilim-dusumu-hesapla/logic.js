// Gerilim Düşümü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sistem = ['tek', 'uc', 'dc'].includes(v.sistem) ? v.sistem : 'tek';
    const u = h.pos(v.gerilim, 'Gerilim');
    const i = h.pos(v.akim, 'Akım');
    const l = h.pos(v.uzunluk, 'Hat uzunluğu');
    const s = h.pos(v.kesit, 'Kablo kesiti');
    let cosfi = 1;
    if (sistem !== 'dc') {
      cosfi = h.pos(v.cosfi, 'Güç faktörü');
      if (cosfi > 1) h.err('"Güç faktörü" 0 ile 1 arasında olmalı (örn. 0,85).');
    }
    const iletkenlik = v.malzeme === 'al' ? 35 : 56;
    const tekIletken = l / (iletkenlik * s);
    const ucFaz = sistem === 'uc';
    const dusum = (ucFaz ? Math.sqrt(3) : 2) * tekIletken * i * cosfi;
    if (dusum >= u) h.err('Hesaplanan gerilim düşümü kaynak gerilimine eşit ya da ondan büyük; bu kesit ve uzunlukla bu akım taşınamaz. Kesiti büyütün ya da değerleri kontrol edin.');
    const yuzde = (dusum / u) * 100;
    const kayip = (ucFaz ? 3 : 2) * i * i * tekIletken;
    const rows = [
      ['Gerilim düşümü', h.fmt(dusum, 3) + ' V'],
      ['Gerilim düşümü yüzdesi', '%' + h.fmt(yuzde, 2)],
      ['Hat sonundaki gerilim', h.fmt(u - dusum, 2) + ' V'],
      [ucFaz ? 'Faz iletkeni direnci' : 'Hat direnci (gidiş + dönüş)', h.fmt(ucFaz ? tekIletken : 2 * tekIletken, 4) + ' Ω'],
      ['Kabloda kaybolan güç', h.fmt(kayip, 2) + ' W'],
    ];
    const sinir = h.opt(v.sinir, null, 'Karşılaştırma sınırı');
    if (sinir !== null) {
      if (!(sinir > 0)) h.err('"Karşılaştırma sınırı" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      rows.push(['Sınırla karşılaştırma', yuzde <= sinir + 1e-9 ? `%${h.fmt(sinir, 2)} sınırının içinde` : `%${h.fmt(sinir, 2)} sınırı aşılıyor`]);
    }
    return { rows, note: 'Yalnızca iletkenin omik direnci dikkate alınır (bakır 56, alüminyum 35 m/Ω·mm²). Sıcaklık artışı, reaktans ve bağlantı noktalarındaki kayıplar gerçek düşümü artırabilir.' };
  }
