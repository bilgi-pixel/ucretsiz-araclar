export default {
  slug: 'punycode-cevir',
  title: 'Punycode (Türkçe Alan Adı) Çevirici',
  h1Tail: 'xn-- ↔ Türkçe karakter',
  pageTitle: 'Punycode Çevirici – Türkçe Karakterli Alan Adını xn-- Biçimine Çevirme',
  description: 'Türkçe karakterli alan adını Punycode (xn--) biçimine çevirin ya da xn-- ile başlayan adı Türkçe hâline geri alın. DNS, e-posta ve sertifika ayarları için.',
  card: 'çiçek.com gibi Türkçe karakterli alan adlarını xn-- biçimine çevirin ya da xn-- adını okunur hâle getirin.',
  category: 'gelistirici',
  keywords: ['punycode çevirici', 'türkçe alan adı', 'xn-- nedir', 'idn alan adı', 'türkçe karakterli domain', 'punycode decode', 'xn-- çevirme', 'idn dönüştürücü'],
  lead: 'İçinde ç, ğ, ı, ö, ş, ü geçen alan adları DNS kayıtlarında <code>xn--</code> ile başlayan ASCII karşılıklarıyla saklanır. Bu araç Türkçe karakterli alan adını <strong>Punycode</strong> biçimine çevirir, <code>xn--</code> ile başlayan bir adı da okunur hâline geri döndürür.',
  button: 'Çevir',
  inputs: [
    { id: 'alan', label: 'Alan adı', type: 'text', placeholder: 'Örn. çiçek.com.tr ya da xn--iek-1lab.com.tr', wide: true, hint: 'Yalnızca alan adını yazın; birden çok etiket nokta ile ayrılır.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['oto', 'Otomatik algıla'], ['kodla', 'Türkçe karakterli → Punycode (xn--)'], ['coz', 'Punycode (xn--) → Türkçe karakterli']] },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { alan: 'çiçek.com' }, out: { 'Punycode (ASCII) alan adı': 'xn--iek-1lab.com', 'Punycode ile kodlanan etiket': '1 / 2' } },
    { in: { alan: 'xn--trkiye-3ya.com' }, out: { 'Türkçe karakterli (Unicode) alan adı': 'türkiye.com', 'Punycode (ASCII) alan adı': 'xn--trkiye-3ya.com' } },
    { in: { alan: 'bücher.de' }, out: { 'Punycode (ASCII) alan adı': 'xn--bcher-kva.de' } },
    { in: { alan: 'münchen.de' }, out: { 'Punycode (ASCII) alan adı': 'xn--mnchen-3ya.de' } },
    { in: { alan: 'İSTANBUL.İST' }, out: { 'Punycode (ASCII) alan adı': 'istanbul.ist', 'Punycode ile kodlanan etiket': '0 / 2' } },
    { in: { alan: 'xn--maana-pta.com', yon: 'coz' }, out: { 'Türkçe karakterli (Unicode) alan adı': 'mañana.com' } },
    { in: { alan: 'şırnak.bel.tr', yon: 'kodla' }, out: { 'Punycode (ASCII) alan adı': 'xn--rnak-kza9y.bel.tr', 'ASCII uzunluğu': '21 karakter' } },
    { in: { alan: 'ornek.com', yon: 'coz' }, error: true },
    { in: { alan: 'çiçek evi.com' }, error: true },
    { in: { alan: 'xn--!!!.com' }, error: true },
    { in: { alan: '' }, error: true },
  ],
  howto: [
    '"Alan adı" kutusuna çevirmek istediğiniz adı yazın: Türkçe karakterli hâlini ya da <code>xn--</code> ile başlayan ASCII hâlini.',
    'Çeviri yönünü "Otomatik algıla" olarak bırakabilirsiniz; araç adın içinde Türkçe karakter mi yoksa <code>xn--</code> öneki mi olduğuna bakarak karar verir.',
    '"Çevir" düğmesine basın. Sonuçta hem ASCII (Punycode) hem de okunur (Unicode) biçim birlikte gösterilir.',
    'DNS kaydı, sunucu yapılandırması ya da sertifika başvurusu için ASCII biçimini kopyalayın; kartvizit, afiş ve reklam metninde okunur biçimi kullanın.',
  ],
  sections: [
    { h: 'Punycode nedir, neden gerekli?', p: [
      'Alan adı sistemi (DNS) tasarlanırken alan adlarında yalnızca İngilizce harfler, rakamlar ve tire öngörülmüştü. Sonradan farklı alfabelerdeki karakterlerin de kullanılabilmesi için DNS\'in kendisini değiştirmek yerine bir çeviri katmanı eklendi: ASCII dışı karakter içeren her etiket, <strong>Punycode</strong> adlı algoritmayla yalnızca harf, rakam ve tireden oluşan bir diziye dönüştürülür ve başına <code>xn--</code> öneki konur. Bu tür adlara uluslararasılaştırılmış alan adı (IDN) denir.',
      'Tarayıcının adres çubuğuna "çiçek.com" yazdığınızda tarayıcı bunu arka planda <code>xn--iek-1lab.com</code> olarak sorgular. Kullanıcı Türkçe hâlini görür; ad sunucuları, e-posta sunucuları ve sertifikalar ise ASCII hâliyle çalışır. İkisi aynı alan adıdır, yalnızca gösterim farklıdır.',
    ] },
    { h: 'Çeviri nasıl yapılır?', p: [
      'Alan adı noktalardan etiketlere ayrılır ve her etiket ayrı ayrı ele alınır. Yalnızca ASCII içeren etiketler (com, tr, www gibi) olduğu gibi kalır. ASCII dışı karakter içeren etikette önce ASCII karakterler sırayla yazılır, ardından bir tire konur; tireden sonraki kısım, çıkarılan karakterlerin hangileri olduğunu ve nereye yerleştirileceğini 36 tabanlı sayılarla (a–z ve 0–9) kodlar.',
      '"çiçek" etiketinde ASCII harfler i, e ve k\'dir; iki "ç" harfi çıkarılır. Sonuç <code>iek-1lab</code> olur ve önekle birlikte <code>xn--iek-1lab</code> yazılır. Tireden sonraki "1lab" kısmı, çıkarılan iki ç harfinin kod noktasını ve sözcükteki yerlerini anlatır. Kodlama geri döndürülebilirdir: aynı diziden her zaman aynı Türkçe ad elde edilir.',
      '"türkiye" için sonuç <code>xn--trkiye-3ya</code>, Şırnak örneğindeki "şırnak" için <code>xn--rnak-kza9y</code> olur. İkincisinde iki farklı ASCII dışı harf (ş ve ı) bulunduğu için kodlu kısım daha uzundur.',
    ] },
    { h: 'Türkçe karakterli alan adı kullanırken bilinmesi gerekenler', ul: [
      '<strong>Hangi uzantılar?</strong> Türkçe karakter desteği uzantıdan uzantıya değişir. Almak istediğiniz adı kayıt kuruluşunuzda sorgulayın; her uzantının izin verdiği karakter listesi farklı olabilir.',
      '<strong>E-posta:</strong> Türkçe karakterli alan adında e-posta adresi kullanmak, karşı tarafın sunucusunun ve programının da bunu desteklemesine bağlıdır. Sorun yaşamamak için çoğu işletme yazışmada ASCII karşılığı olan ikinci bir alan adı kullanır.',
      '<strong>İkisini birden almak:</strong> "çiçek" ile "cicek" farklı alan adlarıdır. Ziyaretçilerin bir kısmı Türkçe klavye kullanmayacağı için iki adı da kaydedip birini diğerine yönlendirmek yaygın bir uygulamadır.',
      '<strong>Sunucu ayarları:</strong> web sunucusu sanal ana makine tanımına, DNS bölge dosyasına ve SSL sertifikası başvurusuna ASCII (xn--) biçimi yazılır.',
      '<strong>Bağlantı paylaşımı:</strong> bazı uygulamalar bağlantıyı kopyalarken ASCII biçimine çevirir. Karşınıza çıkan xn-- adresi bu araçla çözerek hangi ada ait olduğunu görebilirsiniz.',
    ] },
    { h: 'Büyük İ ve küçük ı sorunu', p: [
      'Alan adları büyük-küçük harfe duyarsızdır ve küçük harfe çevrilerek işlenir. Türkçede bu adım dikkat ister: ASCII büyük "I" harfi alan adlarında küçük "i" ile aynıdır, noktasız "ı" ise ayrı bir karakterdir ve Punycode gerektirir. Araç büyük "I" ve "İ" harflerini "i" olarak ele alır; bu yüzden "İSTANBUL.İST" girdisi düz ASCII <code>istanbul.ist</code> sonucunu verir. Büyük noktalı "İ" konusunda tarayıcılar farklı davranabilir: harfi "i" ve ardından gelen ayrı bir nokta işaretine dönüştürüp beklemediğiniz bir xn-- adı üretebilirler. Bu yüzden alan adlarını her yerde küçük harfle yazmak en güvenli yoldur.',
      'Noktasız ı içeren bir ad istiyorsanız küçük harfle yazın: "ışık" ile "isik" ve "işik" birbirinden farklı üç addır. Büyük harfle "IŞIK" yazıldığında hangi harfin kastedildiği anlaşılamayacağından sonuç beklediğinizden farklı çıkabilir.',
    ] },
    { h: 'Benzer görünen karakterler ve güvenlik', p: [
      'Farklı alfabelerde birbirine çok benzeyen harfler vardır; örneğin Kiril alfabesindeki bazı harfler Latin harfleriyle neredeyse aynı görünür. Kötü niyetli kişiler bundan yararlanarak tanınmış bir adın görsel ikizini kaydedebilir. Tarayıcılar bu riske karşı kuşkulu adları adres çubuğunda xn-- biçiminde gösterir.',
      'Bir e-postada ya da mesajda gelen bağlantının adresinde <code>xn--</code> görüyorsanız, tıklamadan önce bu araçla çözüp gerçekte hangi karakterlerden oluştuğuna bakmak iyi bir alışkanlıktır. Araç yalnızca çeviri yapar; adın güvenilir olup olmadığına dair hüküm vermez.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Bir etiketin ASCII karşılığı en fazla 63, alan adının tamamı en fazla 253 karakter olabilir; Türkçe karakterler kodlanınca uzadığı için bu sınıra okunur hâlinden daha erken ulaşılır. Araç bu uzunlukları denetler.',
      'Dönüşümde Punycode algoritması (RFC 3492) uygulanır; ad küçük harfe çevrilir ve birleşik karakterler tek biçime getirilir. Tarayıcıların uyguladığı kapsamlı IDNA eşleme tablolarının tamamı (örneğin Almanca ß ya da farklı alfabelere özgü kurallar) burada yoktur. Küçük harfle yazılmış Türkçe ve Batı Avrupa dillerindeki adlar için sonuçlar tarayıcınızınkiyle aynıdır; alışılmadık karakterlerde kayıt kuruluşunuzun gösterdiği ASCII biçimini esas alın.',
    ] },
  ],
  faq: [
    ['xn-- ile başlayan alan adı ne anlama gelir?', 'Alan adında ASCII dışı en az bir karakter (Türkçe harf, aksanlı harf ya da başka bir alfabe) bulunduğunu ve adın Punycode ile kodlandığını gösterir. Bu araçla çözerek okunur hâlini görebilirsiniz.'],
    ['Türkçe karakterli alan adı ile xn-- hâli farklı siteler mi?', 'Hayır, ikisi aynı alan adının iki gösterimidir. Tarayıcıya hangisini yazarsanız yazın aynı siteye gidersiniz; DNS her zaman xn-- biçimini kullanır.'],
    ['DNS kaydına hangisini yazmalıyım?', 'ASCII (xn--) biçimini. Bölge dosyaları, sunucu yapılandırmaları ve sertifika başvuruları Punycode karşılığını bekler. Bazı yönetim panelleri Türkçe yazımı kabul edip kendisi çevirir, ama ASCII biçimi her yerde çalışır.'],
    ['Alan adının tamamı mı kodlanıyor?', 'Hayır. Her etiket ayrı değerlendirilir ve yalnızca ASCII dışı karakter içerenler kodlanır. "çiçek.com.tr" adında yalnızca ilk etiket xn-- biçimine girer; com ve tr aynı kalır.'],
    ['cicek.com ile çiçek.com aynı mı?', 'Hayır, tamamen farklı iki alan adıdır ve ayrı ayrı kaydedilir. Birine sahip olmak diğerini size vermez; ziyaretçi kaybetmemek için genellikle ikisi de alınır.'],
    ['Türkçe karakterli alan adı arama motorlarında sorun çıkarır mı?', 'Arama motorları IDN adlarını tanır ve okunur hâliyle gösterebilir. Yine de bağlantıların paylaşımda xn-- biçimine dönüşebilmesi ve yazım zorluğu gibi pratik etkileri göz önünde bulundurun.'],
    ['Adres ya da e-posta yapıştırırsam ne olur?', 'Araç baştaki protokol kısmını, yolu ve e-posta adresindeki kullanıcı adını ayıklayıp yalnızca alan adını çevirir. En temiz sonuç için yine de yalnızca alan adını yazmanız önerilir.'],
    ['Sorguladığım alan adı bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız ad sunucuya gönderilmez. Araç alan adının kayıtlı ya da boşta olup olmadığını da sorgulamaz, yalnızca yazım dönüşümü yapar.'],
  ],
  related: ['url-kodla', 'url-ayristir', 'unicode-kacis-cevir', 'unicode-kod-noktasi', 'base64-donustur'],
};
