// Abonelik Yıllık Maliyeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.liste);
    if (!satirlar.length) h.err('En az bir abonelik yazın. Örnek: Müzik; 60');
    if (satirlar.length > 100) h.err('En fazla 100 satır girebilirsiniz.');
    const yil = h.posint(v.yil === '' ? '5' : v.yil, 'Yıl sayısı');
    if (yil > 50) h.err('"Yıl sayısı" en fazla 50 olabilir.');
    const kalemler = satirlar.map((s, i) => {
      const p = s.split(';').map((x) => x.trim());
      if (p.length < 2 || p[0] === '' || p[1] === '') h.err(`${i + 1}. satır anlaşılamadı. Biçim: Ad; tutar; dönem (örn. Müzik; 60; aylık).`);
      const tutar = h.nonneg(p[1], `${i + 1}. satırdaki tutar`);
      const d = (p[2] || 'aylık').toLocaleLowerCase('tr');
      let kat;
      if (d.startsWith('ay')) kat = 12;
      else if (d.startsWith('y')) kat = 1;
      else if (d.startsWith('h')) kat = 52;
      else h.err(`${i + 1}. satırdaki dönem "${p[2]}" tanınmadı. aylık, yıllık ya da haftalık yazın.`);
      return { ad: p[0], yillik: tutar * kat };
    });
    const toplam = kalemler.reduce((a, k) => a + k.yillik, 0);
    const sirali = kalemler.slice().sort((a, b) => b.yillik - a.yillik);
    const enPahali = sirali[0];
    const text = sirali.map((k) => `${k.ad}: ${h.para(k.yillik)}/yıl (aylık ${h.para(k.yillik / 12)}, pay %${h.fmt(toplam > 0 ? k.yillik / toplam * 100 : 0, 1)})`).join('\n');
    return {
      rows: [
        ['Yıllık toplam', h.para(toplam)],
        ['Aylık ortalama', h.para(toplam / 12)],
        ['Günlük ortalama', h.para(toplam / 365)],
        ['Abonelik sayısı', `${kalemler.length} abonelik`],
        ['En pahalı abonelik', `${enPahali.ad} (${h.para(enPahali.yillik)}/yıl)`],
        ['Seçilen sürede toplam', `${h.para(toplam * yil)} (${yil} yıl)`],
      ],
      text,
      note: 'Haftalık ödemeler 52, aylık ödemeler 12 ile çarpılarak yıllığa çevrilir. Çok yıllık toplam, fiyatların hiç değişmediği varsayımıyla hesaplanır; zam geldikçe gerçek tutar daha yüksek olur.',
    };
  }
