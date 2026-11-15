export default {
  slug: 'ingilizce-sayi-okunusu',
  title: 'Sayıların İngilizce Okunuşu',
  h1Tail: 'rakamı İngilizce yazıya çevirin',
  pageTitle: 'Sayıların İngilizce Okunuşu – Rakamı İngilizce Yazıya Çevirme',
  description: 'Bir sayının İngilizce yazılışını ve okunuşunu öğrenin: tam sayılar, ondalıklar, negatifler ve sıra sayıları. Amerikan ve İngiliz yazımı arasında seçim yapın.',
  card: 'Sayının İngilizce yazılışını, sıra sayısı biçimini (21st, twenty-first) ve İngilizce basamak ayrımını görün.',
  category: 'metin',
  keywords: ['sayıların ingilizce okunuşu', 'ingilizce sayılar', 'ingilizce sayı yazma', 'rakamı ingilizce yazıya çevirme', 'ingilizce sıra sayıları', 'number to words', 'ingilizce bin milyon milyar'],
  lead: `Bir sayı yazın, <strong>İngilizce yazılışını</strong> anında görün. Araç tam sayıları, ondalıklı ve negatif sayıları çevirir; pozitif tam sayılar için sıra sayısını (first, second, twenty-first) ve İngilizcede kullanılan virgüllü basamak yazımını da verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'sayi', label: 'Sayı', type: 'text', placeholder: 'Örn. 1234', hint: 'Binlik ayraç kullanmayın; ondalık için virgül ya da nokta yazın (örn. 3,14)' },
    { id: 'stil', label: 'Yazım biçimi', type: 'select', options: [['us', 'Amerikan (one hundred one)'], ['uk', 'İngiliz (one hundred and one)']] },
  ],
  compute(v, h) {
    const BIR = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const ON = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const OLCEK = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];
    const t = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (t === '') h.err('Çevrilecek sayıyı yazın.');
    const m = /^([-+]?)(\d+)(?:[.,](\d+))?$/.exec(t);
    if (!m) h.err('Geçerli bir sayı yazın. Binlik ayraç kullanmayın; yalnızca rakam ve tek bir ondalık ayracı girin (örn. 1250 ya da 3,14).');
    const tam = m[2].replace(/^0+(?=\d)/, '');
    const kesir = m[3] || '';
    if (tam.length > 18) h.err('Tam kısım en fazla 18 basamaklı olabilir.');
    if (kesir.length > 20) h.err('Ondalık kısım en fazla 20 basamaklı olabilir.');
    const uk = v.stil === 'uk';
    const iki = (n) => (n < 20 ? BIR[n] : ON[Math.floor(n / 10)] + (n % 10 ? '-' + BIR[n % 10] : ''));
    const uc = (n) => {
      const y = Math.floor(n / 100), k = n % 100, p = [];
      if (y) p.push(BIR[y] + ' hundred');
      if (k) p.push((y && uk ? 'and ' : '') + iki(k));
      return p.join(' ');
    };
    const gruplar = [];
    for (let i = tam.length; i > 0; i -= 3) gruplar.push(Number(tam.slice(Math.max(0, i - 3), i)));
    let okunus;
    if (gruplar.every((g) => g === 0)) okunus = 'zero';
    else {
      const p = [];
      for (let i = gruplar.length - 1; i >= 0; i--) {
        const g = gruplar[i];
        if (!g) continue;
        let s = uc(g);
        if (i === 0 && uk && g < 100 && p.length) s = 'and ' + s;
        p.push(s + (OLCEK[i] ? ' ' + OLCEK[i] : ''));
      }
      okunus = p.join(' ');
    }
    const sifir = okunus === 'zero';
    let tumu = okunus;
    if (kesir) tumu += ' point ' + kesir.split('').map((c) => BIR[Number(c)]).join(' ');
    const negatif = m[1] === '-' && !(sifir && !/[1-9]/.test(kesir));
    if (negatif) tumu = 'minus ' + tumu;
    const ingilizce = (negatif ? '-' : '') + tam.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (kesir ? '.' + kesir : '');
    const rows = [['İngilizce okunuşu', tumu]];
    if (!kesir && !negatif && !sifir) {
      const OZEL = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
      const kes = Math.max(okunus.lastIndexOf(' '), okunus.lastIndexOf('-')) + 1;
      const son = okunus.slice(kes);
      const sira = okunus.slice(0, kes) + (OZEL[son] || (son.endsWith('y') ? son.slice(0, -1) + 'ieth' : son + 'th'));
      const son2 = Number(tam.slice(-2)), son1 = son2 % 10;
      const ek = son2 >= 11 && son2 <= 13 ? 'th' : son1 === 1 ? 'st' : son1 === 2 ? 'nd' : son1 === 3 ? 'rd' : 'th';
      rows.push(['Sıra sayısı (ordinal)', sira], ['Kısa sıra yazımı', ingilizce + ek]);
    }
    rows.push(['İngilizce rakamla yazım', ingilizce]);
    return {
      rows,
      note: 'İngilizcede binlik ayraç virgül, ondalık ayraç noktadır. Ondalık kısım rakam rakam okunur.',
    };
  },
  cases: [
    { in: { sayi: '21', stil: 'us' }, out: { 'İngilizce okunuşu': 'twenty-one', 'Sıra sayısı (ordinal)': 'twenty-first', 'Kısa sıra yazımı': '21st' } },
    { in: { sayi: '1234', stil: 'uk' }, out: { 'İngilizce okunuşu': 'one thousand two hundred and thirty-four', 'İngilizce rakamla yazım': '1,234' } },
    { in: { sayi: '1234', stil: 'us' }, out: { 'İngilizce okunuşu': 'one thousand two hundred thirty-four', 'Kısa sıra yazımı': '1,234th' } },
    { in: { sayi: '0' }, out: { 'İngilizce okunuşu': 'zero', 'İngilizce rakamla yazım': '0' } },
    { in: { sayi: '1000000' }, out: { 'İngilizce okunuşu': 'one million', 'Sıra sayısı (ordinal)': 'one millionth', 'İngilizce rakamla yazım': '1,000,000' } },
    { in: { sayi: '3,14' }, out: { 'İngilizce okunuşu': 'three point one four', 'İngilizce rakamla yazım': '3.14' } },
    { in: { sayi: '-15' }, out: { 'İngilizce okunuşu': 'minus fifteen' } },
    { in: { sayi: '1001', stil: 'uk' }, out: { 'İngilizce okunuşu': 'one thousand and one', 'Sıra sayısı (ordinal)': 'one thousand and first', 'Kısa sıra yazımı': '1,001st' } },
    { in: { sayi: '112', stil: 'us' }, out: { 'İngilizce okunuşu': 'one hundred twelve', 'Sıra sayısı (ordinal)': 'one hundred twelfth', 'Kısa sıra yazımı': '112th' } },
    { in: { sayi: '40' }, out: { 'İngilizce okunuşu': 'forty', 'Sıra sayısı (ordinal)': 'fortieth' } },
    { in: { sayi: '2000000000' }, out: { 'İngilizce okunuşu': 'two billion' } },
    { in: { sayi: '0,05' }, out: { 'İngilizce okunuşu': 'zero point zero five' } },
    { in: { sayi: 'abc' }, error: true },
    { in: { sayi: '1.234.567' }, error: true },
    { in: { sayi: '' }, error: true },
  ],
  howto: [
    `"Sayı" alanına çevirmek istediğiniz sayıyı rakamla yazın. Binlik ayraç koymayın; ondalık kısım için virgül ya da nokta kullanabilirsiniz.`,
    `"Yazım biçimi" listesinden Amerikan ya da İngiliz kullanımını seçin. Fark, yüzler basamağından sonra "and" sözcüğünün gelip gelmemesidir.`,
    `"Çevir" düğmesine basın. İlk satırda sayının İngilizce yazılışı görünür.`,
    `Pozitif bir tam sayı girdiyseniz sıra sayısının uzun (twenty-first) ve kısa (21st) biçimlerini de alt satırlarda bulursunuz.`,
    `Sonucu kopyalayıp ödevinize, faturanıza ya da e-postanıza yapıştırın.`,
  ],
  sections: [
    { h: 'İngilizcede sayılar nasıl kurulur?', p: [
      `İngilizce sayı adları üç katmandan oluşur. Sıfırdan on dokuza kadar her sayının kendine ait bir adı vardır (zero, one, two … nineteen). Yirmiden doksana onluklar ayrı sözcüklerdir: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety. Aradaki sayılar, onluk ile birlik arasına <strong>kısa çizgi</strong> konarak yazılır: 21 için twenty-one, 99 için ninety-nine. Türkçedeki "yirmi bir" yazımının aksine bu çizgi İngilizcede kuraldır.`,
      `Yüzler "hundred" sözcüğüyle kurulur ve Türkçeden farklı olarak başına mutlaka bir sayı gelir: 100 "yüz" değil, "one hundred" (ya da konuşmada "a hundred") diye söylenir. Aynı kural bin ve üstü için de geçerlidir: 1000 "one thousand" olur. Ayrıca hundred, thousand, million sözcükleri belirli bir sayıyla kullanıldığında çoğul eki almaz: "two hundred", "five thousand" yazılır; "two hundreds" yanlıştır.`,
    ] },
    { h: 'Bin, milyon, milyar: billion tuzağı', p: [
      `Sayı üçer basamaklı gruplara ayrılır ve her gruba bir ölçek sözcüğü eklenir. Türkçe konuşanların en çok yanıldığı yer burasıdır, çünkü sözcükler benzer ama karşılıkları kaymıştır:`,
    ], ul: [
      `<strong>thousand</strong> = bin (10<sup>3</sup>)`,
      `<strong>million</strong> = milyon (10<sup>6</sup>)`,
      `<strong>billion</strong> = milyar (10<sup>9</sup>) — "bilyon" değil`,
      `<strong>trillion</strong> = trilyon (10<sup>12</sup>)`,
      `<strong>quadrillion</strong> = katrilyon (10<sup>15</sup>)`,
    ] },
    { h: 'Amerikan ve İngiliz yazımı arasındaki fark', p: [
      `İki kullanım arasındaki temel fark "and" sözcüğüdür. İngiliz İngilizcesinde yüzler basamağı ile ardından gelen onluk ya da birlik arasına "and" konur: 101 "one hundred and one", 1234 "one thousand two hundred and thirty-four". Yüzler basamağı boşsa "and" doğrudan son gruptan önce gelir: 1001 "one thousand and one". Amerikan İngilizcesinde resmî yazımda bu sözcük çoğunlukla kullanılmaz: "one hundred one", "one thousand two hundred thirty-four".`,
      `Hangisini seçeceğiniz hedef kitlenize bağlıdır. İngiltere merkezli sınav ve yayınlarda "and" beklenir; Amerikan kaynaklarında ve çek yazımında "and" genellikle yalnızca ondalık kısmı ayırmak için kullanılır. Kararsız kaldığınızda izlediğiniz ders kitabının ya da kurumun tercihine uyun ve metin boyunca tutarlı kalın.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>1234:</strong> Sayı iki gruba ayrılır: 1 ve 234. İlk grup "one thousand", ikinci grup "two hundred" artı "thirty-four" eder. Amerikan biçiminde sonuç <code>one thousand two hundred thirty-four</code>, İngiliz biçiminde <code>one thousand two hundred and thirty-four</code> olur. İngilizce rakamla yazımı 1,234 şeklindedir.`,
      `<strong>21:</strong> Okunuşu <code>twenty-one</code>, sıra sayısı <code>twenty-first</code>, kısa yazımı <code>21st</code> olur. Sıra sayısında yalnızca son sözcük değişir.`,
      `<strong>3,14:</strong> Ondalık kısım rakam rakam okunur: <code>three point one four</code>. "Three point fourteen" denmez. İngilizce rakamla yazımı 3.14 biçimindedir.`,
      `<strong>-15:</strong> Negatif sayıların başına "minus" gelir: <code>minus fifteen</code>.`,
    ] },
    { h: 'Sıra sayıları (ordinal numbers)', p: [
      `Sıra bildiren sayılar çoğunlukla sayının sonuna "-th" eklenerek yapılır: fourth, sixth, seventh, tenth. Birkaç düzensiz biçim ezberlenmelidir: one → <strong>first</strong>, two → <strong>second</strong>, three → <strong>third</strong>, five → <strong>fifth</strong>, eight → <strong>eighth</strong>, nine → <strong>ninth</strong>, twelve → <strong>twelfth</strong>. Sonu "y" ile biten onluklarda "y" düşer ve "ieth" gelir: twenty → twentieth, forty → fortieth.`,
      `Rakamla kısa yazımda son iki harf eklenir: 1st, 2nd, 3rd, 4th. Sayı 1, 2 ya da 3 ile bitse bile son iki basamak 11, 12 ya da 13 ise ek "th" olur: 11th, 12th, 13th, 111th, 112th. Buna karşılık 21st, 22nd, 23rd, 101st doğrudur. Tarih yazarken (May 21st), kat belirtirken (3rd floor) ve sıralamalarda bu biçimler kullanılır.`,
    ] },
    { h: 'Sık yapılan yazım hataları', ul: [
      `<strong>forty</strong> sözcüğünde "u" yoktur; "fourty" yanlıştır. Buna karşılık four ve fourteen "u" ile yazılır.`,
      `Yirmi bir ile doksan dokuz arasındaki bileşik sayılarda kısa çizgi unutulmamalıdır: thirty-five, eighty-two.`,
      `Türkçedeki virgül ve nokta İngilizcede yer değiştirir: Türkçe 1.250,75 İngilizcede 1,250.75 olarak yazılır.`,
      `fifteen ile fifty, thirteen ile thirty gibi çiftler hem yazımda hem söyleyişte karıştırılır; -teen ile bitenler 13–19 arasıdır.`,
      `"Billion" sözcüğünü "bilyon" diye çevirmek büyük tutarlarda bin katlık hataya yol açar; doğru karşılık milyardır.`,
    ] },
    { h: 'Aracın sınırları', p: [
      `Araç en fazla 18 basamaklı tam kısmı ve 20 basamaklı ondalık kısmı çevirir. Yıl okunuşu (1995 için "nineteen ninety-five"), telefon numarası okunuşu, saatler, kesirler (one half, three quarters) ve para birimli yazım bu aracın kapsamında değildir; sonuç her zaman sayının genel, matematiksel okunuşudur. Resmî belge, çek ya da sözleşmede tutar yazacaksanız karşı kurumun istediği biçimi ayrıca doğrulayın.`,
    ] },
  ],
  faq: [
    ['100 İngilizce nasıl yazılır?', '"One hundred" olarak yazılır. Konuşma dilinde "a hundred" da denir, ancak yalnızca "hundred" demek yanlıştır; başında mutlaka bir sayı ya da "a" bulunur.'],
    ['İngilizcede "and" ne zaman kullanılır?', 'İngiliz kullanımında yüzler basamağından sonra gelen onluk ya da birlikten önce "and" söylenir: one hundred and five. Amerikan resmî yazımında bu sözcük genellikle atılır. Araçta iki biçimi de seçebilirsiniz.'],
    ['Billion milyar mı, bilyon mu demek?', 'Güncel İngilizcede billion 1.000.000.000, yani bir milyardır. Türkçedeki "bilyon" sözcüğüyle karıştırılmamalıdır; bir sonraki basamak olan trillion ise trilyona karşılık gelir.'],
    ['Ondalıklı sayılar nasıl okunur?', 'Ondalık ayraç "point" diye okunur ve ardından gelen rakamlar tek tek söylenir: 2,75 için "two point seven five". Sıfırdan küçük sayılarda baştaki sıfır "zero" olarak okunur; konuşmada "nought" ya da "oh" da duyulabilir.'],
    ['21st, 22nd, 23rd ekleri nasıl belirlenir?', 'Sayının son rakamına bakılır: 1 ile bitiyorsa st, 2 ile bitiyorsa nd, 3 ile bitiyorsa rd, diğerlerinde th gelir. Tek istisna son iki basamağın 11, 12 ya da 13 olmasıdır; bu durumda ek her zaman th olur.'],
    ['Yılları bu araçla çevirebilir miyim?', 'Araç sayının genel okunuşunu verir; 1995 için "one thousand nine hundred ninety-five" yazar. Yıllar ise gündelik İngilizcede çoğunlukla ikişer basamak hâlinde okunur. Yıl okunuşu için sonucu buna göre uyarlamanız gerekir.'],
    ['Neden binlik ayraç kullanamıyorum?', 'Nokta ve virgül Türkçe ve İngilizce yazımda zıt anlam taşıdığından "1.500" gibi bir girdinin bin beş yüz mü, bir buçuk mu olduğu anlaşılamaz. Yanlış çeviriyi önlemek için araç yalnızca tek bir ondalık ayracı kabul eder.'],
    ['Girdiğim sayı bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sayi-bicimlendir', 'roma-rakami-tarih', 'nato-alfabesi-cevir', 'sayi-ayikla', 'ilk-harf-buyut'],
};
