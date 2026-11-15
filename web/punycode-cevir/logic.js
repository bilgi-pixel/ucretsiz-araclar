// Punycode (Türkçe Alan Adı) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = String(v.alan ?? '').trim();
    if (s === '') h.err('"Alan adı" alanına çevrilecek alan adını yazın (örn. çiçek.com).');
    // Protokol, yol ve port yapıştırıldıysa ayıkla
    s = s.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, '').replace(/[/?#].*$/, '').replace(/^[^@]*@/, '').replace(/:\d+$/, '');
    s = s.replace(/[。．｡]/g, '.').replace(/\.$/, '');
    if (s === '') h.err('Metinde alan adı bulunamadı; yalnızca alan adını yazın (örn. çiçek.com).');
    if (/\s/.test(s)) h.err('Alan adında boşluk olamaz; sözcükleri bitişik ya da tire ile yazın.');
    // Küçük harfe çevir: Türkçe İ → i, I → i (alan adlarında ASCII I, i ile aynıdır)
    const buyukI = /İ/.test(s);
    s = s.replace(/İ/g, 'i').replace(/I/g, 'i').toLowerCase().normalize('NFC');
    const etiketler = s.split('.');
    if (etiketler.some((e) => e === '')) h.err('Alan adında art arda iki nokta ya da başta nokta var; her nokta arasında en az bir karakter olmalıdır.');

    const BASE = 36, TMIN = 1, TMAX = 26, SKEW = 38, DAMP = 700, IBIAS = 72, IN = 128, MAXINT = 2147483647;
    const uyarla = (delta, n, ilk) => {
      let k = 0;
      delta = ilk ? Math.floor(delta / DAMP) : delta >> 1;
      delta += Math.floor(delta / n);
      for (; delta > ((BASE - TMIN) * TMAX) >> 1; k += BASE) delta = Math.floor(delta / (BASE - TMIN));
      return k + Math.floor(((BASE - TMIN + 1) * delta) / (delta + SKEW));
    };
    const rakam = (d) => String.fromCharCode(d < 26 ? 97 + d : 22 + d);
    const kodla = (etiket) => {
      const cps = Array.from(etiket, (c) => c.codePointAt(0));
      let out = cps.filter((c) => c < 128).map((c) => String.fromCharCode(c)).join('');
      const temel = out.length;
      let hh = temel;
      if (temel > 0) out += '-';
      let n = IN, delta = 0, bias = IBIAS;
      while (hh < cps.length) {
        let m = MAXINT;
        for (const c of cps) if (c >= n && c < m) m = c;
        if (m - n > Math.floor((MAXINT - delta) / (hh + 1))) h.err('Etiket Punycode ile kodlanamayacak kadar uzun.');
        delta += (m - n) * (hh + 1);
        n = m;
        for (const c of cps) {
          if (c < n) delta++;
          if (c === n) {
            let q = delta;
            for (let k = BASE; ; k += BASE) {
              const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
              if (q < t) break;
              out += rakam(t + ((q - t) % (BASE - t)));
              q = Math.floor((q - t) / (BASE - t));
            }
            out += rakam(q);
            bias = uyarla(delta, hh + 1, hh === temel);
            delta = 0;
            hh++;
          }
        }
        delta++;
        n++;
      }
      return out;
    };
    const coz = (girdi, ham) => {
      const bozuk = () => h.err(`"${ham}" geçerli bir Punycode etiketi değil; xn-- sonrasındaki kısmı kontrol edin.`);
      const out = [];
      const son = girdi.lastIndexOf('-');
      for (let j = 0; j < Math.max(son, 0); j++) out.push(girdi.charCodeAt(j));
      let i = 0, n = IN, bias = IBIAS;
      for (let idx = son >= 0 ? son + 1 : 0; idx < girdi.length;) {
        const eski = i;
        for (let w = 1, k = BASE; ; k += BASE) {
          if (idx >= girdi.length) bozuk();
          const c = girdi.charCodeAt(idx++);
          const d = c >= 48 && c <= 57 ? c - 22 : c >= 97 && c <= 122 ? c - 97 : -1;
          if (d < 0 || d > Math.floor((MAXINT - i) / w)) bozuk();
          i += d * w;
          const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
          if (d < t) break;
          if (w > Math.floor(MAXINT / (BASE - t))) bozuk();
          w *= BASE - t;
        }
        const uz = out.length + 1;
        bias = uyarla(i - eski, uz, eski === 0);
        if (Math.floor(i / uz) > MAXINT - n) bozuk();
        n += Math.floor(i / uz);
        i %= uz;
        if (n > 0x10FFFF || (n >= 0xD800 && n <= 0xDFFF)) bozuk();
        out.splice(i++, 0, n);
      }
      return String.fromCodePoint(...out);
    };

    const asciiMi = (e) => /^[\x00-\x7F]*$/.test(e);
    const varXn = etiketler.some((e) => e.startsWith('xn--'));
    const varUni = etiketler.some((e) => !asciiMi(e));
    let yon = v.yon;
    if (yon !== 'kodla' && yon !== 'coz') yon = varUni ? 'kodla' : varXn ? 'coz' : 'kodla';
    if (yon === 'coz' && !varXn) h.err('Bu alan adında xn-- ile başlayan bir etiket yok; çözülecek Punycode bulunamadı. Türkçe karakterli adı çevirmek için yönü değiştirin.');

    const uni = [], asc = [];
    for (const e of etiketler) {
      let u = e;
      if (e.startsWith('xn--')) {
        if (!asciiMi(e)) h.err(`"${e}" etiketi hem xn-- ile başlıyor hem ASCII dışı karakter içeriyor; ikisinden birini kullanın.`);
        u = coz(e.slice(4), e);
        if (asciiMi(u) || 'xn--' + kodla(u) !== e) h.err(`"${e}" geçerli bir Punycode etiketi değil; xn-- sonrasındaki kısmı kontrol edin.`);
      }
      const a = asciiMi(u) ? u : 'xn--' + kodla(u);
      if (!/^[a-z0-9-]+$/.test(a.startsWith('xn--') ? 'a' : a)) h.err(`"${u}" etiketinde alan adlarında kullanılamayan bir karakter var; yalnızca harf, rakam ve tire kullanın.`);
      if (/[\x00-\x2C\x2E\x2F\x3A-\x60\x7B-\x7F]/.test(u)) h.err(`"${u}" etiketinde alan adlarında kullanılamayan bir karakter var; yalnızca harf, rakam ve tire kullanın.`);
      if (u.startsWith('-') || u.endsWith('-')) h.err(`"${u}" etiketi tire ile başlayamaz ya da bitemez.`);
      if (a.length > 63) h.err(`"${u}" etiketinin ASCII karşılığı ${a.length} karakter; bir etiket en fazla 63 karakter olabilir.`);
      uni.push(u); asc.push(a);
    }
    const A = asc.join('.'), U = uni.join('.');
    if (A.length > 253) h.err(`Alan adının ASCII karşılığı ${A.length} karakter; toplam uzunluk en fazla 253 karakter olabilir.`);
    const cevrilen = asc.filter((a) => a.startsWith('xn--')).length;
    const rows = yon === 'coz'
      ? [['Türkçe karakterli (Unicode) alan adı', U], ['Punycode (ASCII) alan adı', A]]
      : [['Punycode (ASCII) alan adı', A], ['Türkçe karakterli (Unicode) alan adı', U]];
    rows.push(['Punycode ile kodlanan etiket', `${cevrilen} / ${asc.length}`]);
    rows.push(['ASCII uzunluğu', `${A.length} karakter`]);
    return {
      rows,
      note: buyukI ? 'Büyük noktalı İ harfi küçük i olarak ele alındı. Tarayıcılar bu harfi farklı işleyebildiğinden alan adını küçük harfle yazmanız önerilir.' : cevrilen === 0 ? 'Bu alan adında ASCII dışı karakter yok; Punycode dönüşümü gerekmiyor.' : 'DNS kayıtlarında, sunucu ve sertifika ayarlarında xn-- ile başlayan ASCII biçimini kullanın.',
    };
  }
