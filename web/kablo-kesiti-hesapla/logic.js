// Kablo Kesiti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sistem = ['tek', 'uc', 'dc'].includes(v.sistem) ? v.sistem : 'tek';
    const u = h.pos(v.gerilim, 'Gerilim');
    const i = h.pos(v.akim, 'Akım');
    const l = h.pos(v.uzunluk, 'Hat uzunluğu');
    const yuzde = h.pos(v.dusum, 'İzin verilen gerilim düşümü');
    if (yuzde >= 100) h.err('"İzin verilen gerilim düşümü" %100\'den küçük olmalı; tipik değerler %1 ile %5 arasındadır.');
    let cosfi = 1;
    if (sistem !== 'dc') {
      cosfi = h.pos(v.cosfi, 'Güç faktörü');
      if (cosfi > 1) h.err('"Güç faktörü" 0 ile 1 arasında olmalı (örn. 0,85).');
    }
    const iletkenlik = v.malzeme === 'al' ? 35 : 56;
    const katsayi = sistem === 'uc' ? Math.sqrt(3) : 2;
    const izinli = (u * yuzde) / 100;
    const pay = katsayi * l * i * cosfi;
    const kesit = pay / (iletkenlik * izinli);
    const standartlar = sistem === 'dc'
      ? [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]
      : [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
    const dusumKesit = standartlar.find((s) => s >= kesit * (1 - 1e-9));
    if (!dusumKesit) h.err(`Hesaplanan kesit ${h.fmt(kesit, 1)} mm² olup 240 mm²'den büyük. Hattı paralel kablolarla kurmayı, gerilimi yükseltmeyi ya da mesafeyi kısaltmayı değerlendirin.`);
    // Akım taşıma için yaklaşık en küçük kesit: koruma elemanı anma akımına göre yaygın tesisat uygulaması (bakır, PVC yalıtım).
    // Alüminyumda bir üst standart kesit alınır. 10 A'e kadar DC devrelerde bu sınır uygulanmaz (ince kablolu düşük gerilim işleri).
    const AKIM = [[10, 1.5], [16, 2.5], [25, 4], [32, 6], [40, 10], [63, 16], [80, 25], [100, 35], [125, 50], [160, 70], [200, 95], [250, 120]];
    let akimKesit = null, tabloDisi = false;
    if (!(sistem === 'dc' && i <= 10)) {
      const satir = AKIM.find(([a]) => i <= a * (1 + 1e-9));
      if (!satir) tabloDisi = true;
      else { akimKesit = satir[1]; if (v.malzeme === 'al') akimKesit = standartlar[Math.min(standartlar.length - 1, standartlar.indexOf(akimKesit) + 1)]; }
    }
    const secilen = Math.max(dusumKesit, akimKesit || 0);
    const gercek = pay / (iletkenlik * secilen);
    return {
      rows: [
        ['Önerilen standart kesit', h.fmt(secilen, 2) + ' mm²'],
        ['Gerilim düşümü için en küçük kesit', h.fmt(kesit, 3) + ' mm²'],
        ['Akım için en küçük kesit (yaklaşık)', tabloDisi ? '250 A üzeri: tablo dışı, projeye göre belirlenir' : akimKesit ? h.fmt(akimKesit, 2) + ' mm²' : 'Uygulanmadı (10 A\'e kadar DC)'],
        ['Belirleyici ölçüt', akimKesit && akimKesit > dusumKesit ? 'Akım taşıma' : 'Gerilim düşümü'],
        ['İzin verilen gerilim düşümü', h.fmt(izinli, 3) + ' V'],
        ['Seçilen kesitte gerilim düşümü', `${h.fmt(gercek, 3)} V (%${h.fmt((gercek / u) * 100, 2)})`],
        ['Hat sonundaki gerilim', h.fmt(u - gercek, 2) + ' V'],
        ['Akım yoğunluğu', h.fmt(i / secilen, 2) + ' A/mm²'],
      ],
      note: 'Önerilen kesit, gerilim düşümü ile akım taşıma ölçütlerinden büyük olanıdır. Akım ölçütü yaygın tesisat uygulamasına dayanan yaklaşık bir alt sınırdır; gerçek akım taşıma kapasitesi döşeme şekline, ortam sıcaklığına, kablo tipine ve yan yana kablo sayısına göre düşebilir. Kesin seçim ve koruma elemanı uyumu için yetkili elektrik mühendisine ya da elektrikçiye danışın.',
    };
  }
