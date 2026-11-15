// Sezar Şifreleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    const kaydir = (t, d) => {
      let o = '', say = 0;
      for (const c of t) {
        let i = BUYUK.indexOf(c);
        if (i >= 0) { o += BUYUK[(((i + d) % n) + n) % n]; say++; continue; }
        i = KUCUK.indexOf(c);
        if (i >= 0) { o += KUCUK[(((i + d) % n) + n) % n]; say++; continue; }
        o += c;
      }
      return [o, say];
    };
    const alfabeAdi = en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf';
    if (v.islem === 'tum') {
      const [, say] = kaydir(s, 0);
      if (say === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
      const tek = s.replace(/\n+/g, ' ');
      const satirlar = [];
      for (let k = 1; k < n; k++) satirlar.push(`${String(k).padStart(2, ' ')}: ${kaydir(tek, -k)[0]}`);
      return {
        rows: [
          ['Denenen kaydırma', `${n - 1} farklı anahtar`],
          ['Alfabe', alfabeAdi],
          ['Kaydırılan harf', h.fmt(say, 0)],
        ],
        text: satirlar.join('\n'),
        note: 'Her satır, metnin o anahtarla şifrelendiği varsayılarak çözülmüş hâlidir. Anlamlı okunan satırın numarası aranan anahtardır.',
      };
    }
    const k = h.int(v.kaydirma, 'Kaydırma (anahtar)');
    const etkin = ((k % n) + n) % n;
    const coz = v.islem === 'coz';
    const [cikti, say] = kaydir(s, coz ? -etkin : etkin);
    return {
      rows: [
        ['Etkin kaydırma', `${etkin} harf ${coz ? 'geri' : 'ileri'}`],
        ['Alfabe', alfabeAdi],
        ['Kaydırılan harf', h.fmt(say, 0)],
      ],
      text: cikti,
      note: etkin === 0 ? 'Etkin kaydırma 0 olduğu için metin değişmedi; alfabedeki harf sayısının katı olmayan bir anahtar seçin.' : 'Alfabede bulunmayan harfler, rakamlar, boşluklar ve noktalama işaretleri olduğu gibi bırakılır.',
    };
  }
