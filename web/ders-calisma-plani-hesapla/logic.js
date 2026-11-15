// Ders Çalışma Planı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.dersler);
    if (!satirlar.length) h.err('En az bir ders yazın (örn. "Matematik 3").');
    if (satirlar.length > 12) h.err('En fazla 12 ders girebilirsiniz; benzer dersleri tek satırda birleştirin.');
    const gunluk = h.pos(v.gunluk, 'Günlük çalışma süresi');
    if (gunluk > 24) h.err('Günlük çalışma süresi 24 saatten fazla olamaz.');
    const gun = h.posint(v.gun, 'Haftada çalışılan gün');
    if (gun > 7) h.err('Haftada en fazla 7 gün olabilir.');
    const sabit = ['Haftalık toplam çalışma', 'Ders sayısı', 'Ağırlık toplamı'];
    const dersler = [];
    for (const s of satirlar) {
      const p = s.split(/\s+/);
      let ad = s, w = 1;
      if (p.length > 1 && /^\d+([.,]\d+)?$/.test(p[p.length - 1])) {
        w = h.pos(p[p.length - 1], 'Ağırlık');
        ad = p.slice(0, -1).join(' ');
      }
      if (dersler.some((d) => d.ad.toLocaleLowerCase('tr-TR') === ad.toLocaleLowerCase('tr-TR')) || sabit.includes(ad)) {
        h.err(`"${ad}" adı iki kez kullanılmış ya da ayrılmış bir ad; her derse farklı bir ad verin.`);
      }
      dersler.push({ ad, w });
    }
    const toplamW = dersler.reduce((a, d) => a + d.w, 0);
    const hafta = gunluk * gun;
    const rows = [['Haftalık toplam çalışma', `${h.fmt(hafta, 2)} saat`]];
    for (const d of dersler) {
      const saat = (hafta * d.w) / toplamW;
      rows.push([d.ad, `haftada ${h.fmt(saat, 2)} saat · günde ${h.fmt((saat * 60) / gun, 0)} dakika`]);
    }
    rows.push(['Ders sayısı', `${dersler.length}`], ['Ağırlık toplamı', h.fmt(toplamW, 2)]);
    return { rows, note: 'Günlük dakika, haftalık payın çalışılan günlere eşit bölünmüş hâlidir; dersleri günlere dönüşümlü dağıtabilirsiniz.' };
  }
