// Metinden Bağlantı (URL) Ayıklama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin ya da HTML kodu" alanına içinde bağlantı geçen metni yapıştırın.');
    const re = /(?<![\p{L}\p{N}@.\/])(?:https?:\/\/|www\.)[^\s<>"'`]+/giu;
    const say = (s, c) => s.split(c).length - 1;
    const temizle = (u) => {
      for (;;) {
        const son = u.at(-1);
        if ('.,;:!?…»”’*'.includes(son)) u = u.slice(0, -1);
        else if (son === ')' && say(u, ')') > say(u, '(')) u = u.slice(0, -1);
        else if (son === ']' && say(u, ']') > say(u, '[')) u = u.slice(0, -1);
        else if (son === '}' && say(u, '}') > say(u, '{')) u = u.slice(0, -1);
        else return u;
      }
    };
    const sunucu = (u) => {
      let s = u.replace(/^https?:\/\//i, '').split(/[\/?#]/)[0];
      s = s.slice(s.lastIndexOf('@') + 1).replace(/:\d*$/, '').toLowerCase();
      return s;
    };
    let bulunan = [];
    for (const m of ham.match(re) || []) {
      const u = temizle(m);
      const s = sunucu(u);
      if (!/^[^.\s]+(\.[^.\s]+)+$/.test(s)) continue;
      bulunan.push(u);
    }
    if (!bulunan.length) h.err('Metinde bağlantı bulunamadı. Yalnızca http, https ya da www ile başlayan adresler tanınır.');
    const toplam = bulunan.length;
    const guvenli = bulunan.filter((u) => /^https:/i.test(u)).length;
    const kok = (u) => sunucu(u).replace(/^www\./, '');
    if (v.tur === 'alan') bulunan = bulunan.map(kok);
    else if (v.onek === 'ekle') bulunan = bulunan.map((u) => (/^www\./i.test(u) ? 'https://' + u : u));
    let liste = bulunan;
    if (v.tekrar !== 'koru') liste = [...new Set(bulunan)];
    const kars = (x, y) => { const a = x.toLowerCase(), b = y.toLowerCase(); return a < b ? -1 : a > b ? 1 : 0; };
    if (v.sirala === 'alfabe') liste = [...liste].sort(kars);
    const alanlar = new Set(liste.map((u) => (v.tur === 'alan' ? u : kok(u))));
    return {
      rows: [
        [v.tur === 'alan' ? 'Listelenen alan adı' : 'Listelenen bağlantı', String(liste.length)],
        ['Metinde bulunan toplam bağlantı', String(toplam)],
        ['Çıkarılan tekrar', String(toplam - liste.length)],
        ['Farklı alan adı', String(alanlar.size)],
        ['Güvenli (https) bağlantı', `${guvenli} / ${toplam}`],
      ],
      text: liste.join('\n'),
      note: 'Bağlantılar yalnızca metinden okunur; araç hiçbir adresi açmaz, çalışıp çalışmadığını denetlemez.',
    };
  }
