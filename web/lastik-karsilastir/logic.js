// Lastik Ebadı Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const coz = (s, ad) => {
      const t = String(s ?? '').trim().toUpperCase().replace(',', '.');
      if (t === '') h.err(`"${ad}" alanını doldurun (örn. 205/55 R16).`);
      const m = /^(\d{3})\s*\/\s*(\d{2})\s*(?:Z?R|-|\s)\s*(\d{2}(?:\.5)?)$/.exec(t);
      if (!m) h.err(`"${ad}" 205/55 R16 biçiminde olmalı: genişlik (mm) / yanak oranı R jant çapı (inç).`);
      const gen = +m[1], oran = +m[2], jant = +m[3];
      if (gen < 105 || gen > 455) h.err(`"${ad}" için genişlik 105–455 mm arasında olmalı.`);
      if (oran < 20 || oran > 95) h.err(`"${ad}" için yanak oranı 20–95 arasında olmalı.`);
      if (jant < 10 || jant > 30) h.err(`"${ad}" için jant çapı 10–30 inç arasında olmalı.`);
      const yanak = gen * oran / 100;
      const cap = jant * 25.4 + 2 * yanak;
      return { gen, yanak, cap, cevre: Math.PI * cap };
    };
    const a = coz(v.eski, 'Mevcut lastik ebadı');
    const b = coz(v.yeni, 'Yeni lastik ebadı');
    const hiz = h.pos(v.hiz, 'Göstergedeki hız');
    const fark = (b.cap - a.cap) / a.cap * 100;
    const gercek = hiz * b.cap / a.cap;
    const isaret = (x, d) => (x > 0 ? '+' : '') + h.fmt(x, d);
    let yorum;
    if (Math.abs(fark) < 1e-9) yorum = 'İki ebadın toplam çapı aynı; hız göstergesi ve kilometre sayacı etkilenmez.';
    else if (Math.abs(fark) <= 3) yorum = 'Çap farkı yüzde 3 sınırının içinde; yine de ebadın aracınıza uygunluğunu ruhsat ve üretici bilgilerinden doğrulayın.';
    else yorum = 'Çap farkı yüzde 3\'ü aşıyor. Bu büyüklükte fark gösterge sapmasını, sürüş elektroniğini ve çamurluk boşluğunu belirgin etkiler; önerilmez.';
    return {
      rows: [
        ['Çap farkı', isaret(fark, 2) + ' %'],
        ['Mevcut lastik çapı', h.fmt(a.cap, 1) + ' mm'],
        ['Yeni lastik çapı', h.fmt(b.cap, 1) + ' mm'],
        ['Çap farkı (mm)', isaret(b.cap - a.cap, 1) + ' mm'],
        ['Mevcut yanak yüksekliği', h.fmt(a.yanak, 1) + ' mm'],
        ['Yeni yanak yüksekliği', h.fmt(b.yanak, 1) + ' mm'],
        ['Mevcut çevre', h.fmt(a.cevre, 0) + ' mm'],
        ['Yeni çevre', h.fmt(b.cevre, 0) + ' mm'],
        ['Genişlik farkı', isaret(b.gen - a.gen, 0) + ' mm'],
        ['Yerden yükseklik değişimi', isaret((b.cap - a.cap) / 2, 1) + ' mm'],
        ['Km başına tur (mevcut / yeni)', h.fmt(1e6 / a.cevre, 0) + ' / ' + h.fmt(1e6 / b.cevre, 0)],
        ['Gerçek hız', h.fmt(gercek, 1) + ' km/sa'],
      ],
      note: yorum + ' Hesap nominal ebat üzerinden yapılır; gerçek çap markaya, basınca ve aşınmaya göre birkaç milimetre değişir.',
    };
  }
