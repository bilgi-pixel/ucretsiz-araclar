// Rastgele Takım Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adlar = h.lines(v.oyuncular);
    const n = adlar.length;
    if (n < 2) h.err('Takım oluşturmak için en az 2 ad yazın; her satıra bir ad gelmeli.');
    if (n > 200) h.err('En çok 200 ad girebilirsiniz.');
    const adet = h.posint(String(v.adet ?? '').trim() === '' ? '2' : v.adet, 'Sayı');
    const kisiModu = v.bolme === 'kisi';
    let takimSayisi, yedekSayisi = 0;
    if (kisiModu) {
      if (adet > n) h.err(`Takım başına ${adet} kişi istediniz ama listede ${n} ad var; sayıyı küçültün ya da ad ekleyin.`);
      takimSayisi = Math.floor(n / adet);
      yedekSayisi = n - takimSayisi * adet;
    } else {
      if (adet < 2) h.err('Takım sayısı en az 2 olmalı.');
      if (adet > n) h.err(`${adet} takım için en az ${adet} oyuncu gerekir; listede ${n} ad var.`);
      takimSayisi = adet;
    }
    const kar = adlar.slice();
    for (let i = kar.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kar[i], kar[j]] = [kar[j], kar[i]];
    }
    const yedekler = yedekSayisi ? kar.splice(kar.length - yedekSayisi, yedekSayisi) : [];
    const takimlar = Array.from({ length: takimSayisi }, () => []);
    kar.forEach((ad, i) => takimlar[i % takimSayisi].push(ad));
    const bloklar = takimlar.map((t, i) => `${i + 1}. Takım (${t.length} kişi)\n` + t.join('\n'));
    if (yedekler.length) bloklar.push(`Yedekler (${yedekler.length} kişi)\n` + yedekler.join('\n'));
    const enAz = Math.min(...takimlar.map((t) => t.length));
    const enCok = Math.max(...takimlar.map((t) => t.length));
    const rows = [
      ['Takım sayısı', String(takimSayisi)],
      ['Oyuncu sayısı', String(n)],
      ['Takım başına oyuncu', enAz === enCok ? String(enAz) : `${enAz}–${enCok}`],
    ];
    if (kisiModu) rows.push(['Yedek oyuncu', String(yedekSayisi)]);
    return {
      rows,
      text: bloklar.join('\n\n'),
      note: 'Dağıtım rastgeledir; düğmeye her bastığınızda yeni bir kura çekilir. Beğendiğiniz sonucu kopyalamayı unutmayın.',
    };
  }
