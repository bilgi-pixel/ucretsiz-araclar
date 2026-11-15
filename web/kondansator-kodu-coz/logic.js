// Kondansatör Kodu Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kod = String(v.kod ?? '').trim().toUpperCase().replace(/\s+/g, '');
    if (kod === '') h.err('"Kondansatör kodu" alanını doldurun (örn. 104).');
    const toleranslar = {
      B: ['±0,1 pF', 'pf', 0.1, 0.1], C: ['±0,25 pF', 'pf', 0.25, 0.25], D: ['±0,5 pF', 'pf', 0.5, 0.5],
      F: ['±%1', 'yuzde', 1, 1], G: ['±%2', 'yuzde', 2, 2], J: ['±%5', 'yuzde', 5, 5], K: ['±%10', 'yuzde', 10, 10],
      M: ['±%20', 'yuzde', 20, 20], Z: ['+%80 / −%20', 'yuzde', 20, 80],
    };
    let pf, harf = '', tur;
    let m;
    if ((m = /^(\d{2})(\d)([A-Z])?$/.exec(kod))) {
      const taban = Number(m[1]);
      const us = Number(m[2]);
      if (taban === 0) h.err('Kodun ilk iki hanesi 00 olamaz. Kondansatörün üzerindeki yazıyı kontrol edin.');
      if (us === 7) h.err('Üçüncü hane 7 olan kod standart değildir. Kodu doğru okuduğunuzdan emin olun.');
      pf = us === 8 ? taban * 0.01 : us === 9 ? taban * 0.1 : taban * Math.pow(10, us);
      harf = m[3] || '';
      tur = 'Üç haneli kod (iki rakam + çarpan)';
    } else if ((m = /^(\d{1,2})([A-Z])?$/.exec(kod))) {
      pf = Number(m[1]);
      if (pf === 0) h.err('Kapasite sıfır olamaz. Kodu kontrol edin.');
      harf = m[2] || '';
      tur = 'Doğrudan pikofarad değeri';
    } else if ((m = /^(\d*)R(\d+)([A-Z])?$/.exec(kod)) && (m[1] !== '' || m[2] !== '')) {
      pf = Number((m[1] || '0') + '.' + m[2]);
      if (!(pf > 0)) h.err('Kapasite sıfır olamaz. Kodu kontrol edin.');
      harf = m[3] || '';
      tur = 'R\'li kod (R ondalık virgül yerindedir)';
    } else {
      h.err('Kod tanınmadı. 104, 472J, 4R7 ya da 47 biçiminde yazın; gerilim kodu ya da başka yazıları eklemeyin.');
    }
    if (harf === 'R') h.err('Kod tanınmadı. R harfi ondalık ayraç olarak kullanılır (örn. 4R7 = 4,7 pF).');
    if (harf && !toleranslar[harf]) h.err(`"${harf}" bilinen bir tolerans harfi değil. Desteklenen harfler: B, C, D, F, G, J, K, M, Z.`);
    const uygun = pf < 1000 ? h.sig(pf, 6) + ' pF' : pf < 1e6 ? h.sig(pf / 1000, 6) + ' nF' : h.sig(pf / 1e6, 6) + ' µF';
    const rows = [
      ['Kapasite', uygun],
      ['Pikofarad', h.fmt(pf, 2) + ' pF'],
      ['Nanofarad', h.fmt(pf / 1000, 5) + ' nF'],
      ['Mikrofarad', h.fmt(pf / 1e6, 8) + ' µF'],
      ['Kod türü', tur],
      ['Tolerans', harf ? `${toleranslar[harf][0]} (${harf})` : 'Belirtilmemiş'],
    ];
    if (harf) {
      const t = toleranslar[harf];
      const alt = t[1] === 'pf' ? pf - t[2] : pf * (1 - t[2] / 100);
      const ust = t[1] === 'pf' ? pf + t[3] : pf * (1 + t[3] / 100);
      rows.push(['Değer aralığı', `${h.fmt(Math.max(alt, 0), 3)} – ${h.fmt(ust, 3)} pF`]);
    }
    return { rows, note: 'Üç haneli kodda ilk iki rakam değeri, üçüncü rakam eklenecek sıfır sayısını verir; sonuç pikofarad cinsindendir.' };
  }
