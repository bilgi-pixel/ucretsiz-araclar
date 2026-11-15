export default {
  slug: 'lig-fiksturu-olustur',
  title: 'Lig Fikstürü Oluşturma',
  h1Tail: 'herkes herkesle, hafta hafta',
  pageTitle: 'Lig Fikstürü Oluşturma – Tek ve Çift Devreli Maç Programı',
  description: 'Takım adlarını yazın, herkesin herkesle oynadığı lig fikstürünü hafta hafta oluşturun. Tek ya da çift devre, tek sayıda takımda bay haftası, isteğe bağlı kura.',
  card: 'Takım listesinden tek ya da çift devreli lig fikstürünü hafta hafta oluşturun; tek sayıda takımda bay geçen takım belirlenir.',
  category: 'saglik',
  keywords: ['fikstür oluşturma', 'lig fikstürü hazırlama', 'maç programı oluşturma', 'halı saha turnuva fikstürü', 'çift devreli lig fikstürü', 'fikstür çekme', 'turnuva fikstürü programı', 'bay geçen takım'],
  lead: 'Takımların adlarını alt alta yazın; araç her takımın diğer bütün takımlarla karşılaştığı <strong>lig usulü fikstürü</strong> hafta hafta çıkarsın. Tek devreli ya da rövanşlı çift devreli program seçebilir, takım sırasını kurayla karıştırabilirsiniz. Takım sayısı tekse her hafta bir takım bay geçer.',
  button: 'Oluştur',
  inputs: [
    { id: 'takimlar', label: 'Takımlar (her satıra bir takım)', type: 'textarea', placeholder: 'Yıldızspor\nDemirspor\nGençlik\nKartallar', wide: true, hint: 'En az 2, en çok 40 takım. Sıra numarası yazmanıza gerek yok.' },
    { id: 'devre', label: 'Lig biçimi', type: 'select', options: [['tek', 'Tek devre (her eşleşme bir kez)'], ['cift', 'Çift devre (rövanşlı)']] },
    { id: 'kura', label: 'Takım sırası', type: 'select', options: [['hayir', 'Yazdığım sırayla'], ['evet', 'Kurayla karıştır']] },
  ],
  compute(v, h) {
    let takimlar = h.lines(v.takimlar);
    if (takimlar.length < 2) h.err('Fikstür için en az 2 takım gerekir; her satıra bir takım adı yazın.');
    if (takimlar.length > 40) h.err('En çok 40 takım girebilirsiniz.');
    const gorulen = new Set();
    for (const t of takimlar) {
      const anahtar = t.toLocaleLowerCase('tr-TR');
      if (gorulen.has(anahtar)) h.err(`"${t}" adı birden fazla kez yazılmış; her takımın adı farklı olmalı.`);
      gorulen.add(anahtar);
    }
    if (v.kura === 'evet') {
      takimlar = takimlar.slice();
      for (let i = takimlar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [takimlar[i], takimlar[j]] = [takimlar[j], takimlar[i]];
      }
    }
    const n = takimlar.length;
    const BAY = null;
    let dizi = takimlar.slice();
    if (n % 2 === 1) dizi.push(BAY);
    const m = dizi.length;
    const haftalar = [];
    for (let r = 0; r < m - 1; r++) {
      const maclar = [];
      let bay = '';
      for (let i = 0; i < m / 2; i++) {
        const a = dizi[i], b = dizi[m - 1 - i];
        if (a === BAY) { bay = b; continue; }
        if (b === BAY) { bay = a; continue; }
        const aEvSahibi = i === 0 ? r % 2 === 0 : i % 2 === 1;
        maclar.push(aEvSahibi ? [a, b] : [b, a]);
      }
      haftalar.push({ maclar, bay });
      dizi = [dizi[0], dizi[m - 1], ...dizi.slice(1, m - 1)];
    }
    const cift = v.devre === 'cift';
    const tum = cift ? haftalar.concat(haftalar.map((x) => ({ maclar: x.maclar.map(([e, d]) => [d, e]), bay: x.bay }))) : haftalar;
    const bloklar = tum.map((x, i) => {
      const satirlar = [`${i + 1}. Hafta`, ...x.maclar.map(([e, d]) => `${e} - ${d}`)];
      if (x.bay) satirlar.push(`Bay: ${x.bay}`);
      return satirlar.join('\n');
    });
    const macSayisi = tum.reduce((t, x) => t + x.maclar.length, 0);
    return {
      rows: [
        ['Toplam maç', String(macSayisi)],
        ['Hafta sayısı', String(tum.length)],
        ['Takım sayısı', String(n)],
        ['Haftada oynanan maç', String(Math.floor(n / 2))],
        ['Takım başına maç', String((n - 1) * (cift ? 2 : 1))],
      ],
      text: bloklar.join('\n\n'),
      note: 'Her satırda ilk yazılan takım ev sahibidir.' + (n % 2 === 1 ? ' Takım sayısı tek olduğu için her hafta bir takım bay geçer.' : '') + (cift ? ' İkinci devrede aynı eşleşmeler ev sahibi değiştirilerek tekrarlanır.' : ''),
    };
  },
  cases: [
    { in: { takimlar: 'A\nB\nC\nD', devre: 'tek', kura: 'hayir' }, out: { 'Toplam maç': '6', 'Hafta sayısı': '3', 'Takım sayısı': '4', 'Haftada oynanan maç': '2' }, text: '1. Hafta\nA - D\nB - C\n\n2. Hafta\nC - A\nD - B\n\n3. Hafta\nA - B\nC - D' },
    { in: { takimlar: 'A\nB\nC', devre: 'tek', kura: 'hayir' }, out: { 'Toplam maç': '3', 'Hafta sayısı': '3', 'Haftada oynanan maç': '1', 'Takım başına maç': '2' }, text: '1. Hafta\nB - C\nBay: A\n\n2. Hafta\nC - A\nBay: B\n\n3. Hafta\nA - B\nBay: C' },
    { in: { takimlar: 'A\nB\nC\nD', devre: 'cift', kura: 'hayir' }, out: { 'Toplam maç': '12', 'Hafta sayısı': '6', 'Takım başına maç': '6' }, textMatch: '4\\. Hafta\\nD - A\\nC - B' },
    { in: { takimlar: 'T1\nT2\nT3\nT4\nT5\nT6\nT7\nT8\nT9\nT10\nT11\nT12\nT13\nT14\nT15\nT16\nT17\nT18', devre: 'cift', kura: 'hayir' }, out: { 'Toplam maç': '306', 'Hafta sayısı': '34', 'Haftada oynanan maç': '9', 'Takım başına maç': '34' } },
    { in: { takimlar: 'Ev\nKonuk', devre: 'cift', kura: 'hayir' }, out: { 'Toplam maç': '2', 'Hafta sayısı': '2' }, text: '1. Hafta\nEv - Konuk\n\n2. Hafta\nKonuk - Ev' },
    { in: { takimlar: 'A\nB\nC\nD\nE', devre: 'tek', kura: 'evet' }, out: { 'Toplam maç': '10', 'Hafta sayısı': '5', 'Haftada oynanan maç': '2' }, textMatch: '^1\\. Hafta\\n[A-E] - [A-E]\\n[A-E] - [A-E]\\nBay: [A-E]' },
    { in: { takimlar: 'Tek Takım', devre: 'tek', kura: 'hayir' }, error: true },
    { in: { takimlar: '', devre: 'tek', kura: 'hayir' }, error: true },
    { in: { takimlar: 'Aslan\nKaplan\naslan', devre: 'tek', kura: 'hayir' }, error: true },
  ],
  howto: [
    'Takım adlarını kutuya her satıra bir tane gelecek şekilde yazın ya da hazır listenizi yapıştırın.',
    'Lig biçimini seçin: tek devrede her iki takım bir kez, çift devrede bir kez evinde bir kez deplasmanda karşılaşır.',
    'Eşleşme sırasının tarafsız olmasını istiyorsanız "Kurayla karıştır" seçeneğini işaretleyin; her tıklamada farklı bir fikstür çıkar.',
    '"Oluştur" düğmesine basın. Maç sayısı ve hafta sayısı özet olarak, tüm program altındaki kutuda görünür.',
    'Programı kopyalayıp mesaj grubuna, tabloya ya da yazdırılacak belgeye yapıştırın.',
  ],
  sections: [
    { h: 'Lig usulü fikstür nasıl çalışır?', p: [
      'Lig usulünde (İngilizce adıyla "round-robin") her takım diğer bütün takımlarla karşılaşır. Eleme usulünden farkı, tek bir kötü günün turnuvayı bitirmemesidir; şampiyonu bütün maçların toplamı belirler. Bu yüzden profesyonel ligler, okul içi turnuvalar, halı saha ligleri, satranç ve tavla turnuvaları çoğunlukla bu yöntemi kullanır.',
      'İyi bir fikstürün iki koşulu vardır: hiçbir takım aynı hafta iki maç yapmamalı ve her eşleşme tam olarak bir kez (çift devrede iki kez) yer almalıdır. Takım sayısı arttıkça bunu elle ayarlamak hızla zorlaşır; araç bu işi "çember yöntemi" denen klasik algoritmayla yapar.',
    ] },
    { h: 'Kaç maç, kaç hafta?', p: [
      'Takım sayısına <em>n</em> dersek tek devreli ligde toplam maç sayısı <strong>n × (n − 1) ÷ 2</strong>\'dir. Çift devrede bu sayı ikiye katlanır: <strong>n × (n − 1)</strong>. Hafta sayısı takım sayısı çiftse n − 1, tekse n\'dir; çift devrede iki katı olur.',
      'Çözümlü örnek: 4 takımlı tek devreli bir turnuvada 4 × 3 ÷ 2 = 6 maç oynanır ve program 3 haftada biter; her hafta 2 maç vardır. 18 takımlı çift devreli bir ligde 18 × 17 = 306 maç ve 34 hafta bulunur; her takım 34 maça çıkar. 20 takımlı çift devreli lig ise 380 maç ve 38 hafta eder.',
    ], ul: [
      '<strong>4 takım:</strong> tek devre 6 maç / 3 hafta, çift devre 12 maç / 6 hafta',
      '<strong>5 takım:</strong> tek devre 10 maç / 5 hafta (her hafta bir bay)',
      '<strong>6 takım:</strong> tek devre 15 maç / 5 hafta, çift devre 30 maç / 10 hafta',
      '<strong>8 takım:</strong> tek devre 28 maç / 7 hafta, çift devre 56 maç / 14 hafta',
      '<strong>10 takım:</strong> tek devre 45 maç / 9 hafta, çift devre 90 maç / 18 hafta',
      '<strong>16 takım:</strong> tek devre 120 maç / 15 hafta, çift devre 240 maç / 30 hafta',
    ] },
    { h: 'Çember yöntemi', p: [
      'Algoritma şöyle işler: takımlar iki sıra hâlinde karşılıklı dizilir. İlk takım yerinde sabit kalır, diğerleri her hafta bir adım döner. Her hafta karşı karşıya gelen çiftler o haftanın maçlarıdır. n − 1 dönüşün sonunda her takım diğer herkesle tam bir kez eşleşmiş olur.',
      'A, B, C, D takımlarıyla izleyelim. İlk hafta A ile D, B ile C eşleşir. Sabit A dışındakiler döndürülünce ikinci hafta A ile C, D ile B; üçüncü hafta A ile B, C ile D karşılaşır. Altı olası eşleşmenin tamamı üç haftaya, çakışma olmadan yerleşmiştir. Araç aynı girdiye aynı sonucu bu sırayla verir.',
    ] },
    { h: 'Tek sayıda takım ve bay haftası', p: [
      'Takım sayısı tek olduğunda her hafta bir takım eşsiz kalır. Araç listeye görünmeyen bir "boş" takım ekler; o hafta boş takımla eşleşen takım <strong>bay</strong> geçer, yani maç yapmaz. Lig boyunca her takım tam bir kez (çift devrede iki kez) bay geçer, dolayısıyla kimse avantajlı ya da dezavantajlı olmaz. Beş takımlı tek devreli bir ligde beş hafta vardır ve her takım dört maç yapar.',
    ] },
    { h: 'Ev sahibi dengesi ve kura', p: [
      'Her satırda ilk yazılan takım ev sahibidir. Araç ev sahipliğini haftadan haftaya değiştirerek dağıtır; yine de tek devreli liglerde takımların ev maçı sayısı bir fark edebilir, çünkü takım başına maç sayısı tek olabilir. Çift devreli programda ikinci yarı ilk yarının aynısıdır, yalnızca ev sahibi ile konuk yer değiştirir; böylece her takım her rakibiyle bir kez evinde bir kez deplasmanda oynar.',
      'Tek sahada oynanan halı saha turnuvalarında ev sahibi ayrımı yalnızca forma rengi ya da başlama vuruşu için kullanılabilir. "Kurayla karıştır" seçeneği takımların algoritmadaki yerini rastgele belirler; listenin başına yazılan takımın hep aynı rakiple başlamasını istemiyorsanız bunu kullanın. Kura tarayıcınızın rastgele sayı üretecine dayanır; itiraz olmaması için kurayı ilgililerin önünde çekmek iyi bir uygulamadır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca eşleşmeleri ve hafta sırasını üretir; tarih, saat ve saha ataması yapmaz. Derbi haftalarını belirli tarihlere sabitleme, aynı şehrin takımlarının aynı hafta evde oynamaması, ardışık deplasman sayısını sınırlama gibi profesyonel lig kısıtlarını dikkate almaz. Bu tür istekler için çıkan programda haftaların sırasını elle değiştirebilirsiniz; hafta bloklarının yerini değiştirmek fikstürün geçerliliğini bozmaz.',
    ] },
  ],
  faq: [
    ['6 takımlı ligde kaç maç oynanır?', 'Tek devrede 6 × 5 ÷ 2 = 15 maç oynanır ve fikstür 5 haftada tamamlanır. Çift devrede 30 maç ve 10 hafta olur.'],
    ['Takım sayısı tek olursa ne olur?', 'Her hafta bir takım bay geçer, yani o hafta maçı olmaz. Hafta sayısı takım sayısına eşit olur ve her takım lig boyunca eşit sayıda bay geçer.'],
    ['Çift devreli lig ne demek?', 'Her iki takımın sezon boyunca iki kez karşılaşmasıdır: bir maç bir takımın, rövanş diğer takımın sahasında oynanır. Araç ikinci devreyi, ilk devrenin ev sahibi ve konuk takımlarını yer değiştirerek oluşturur.'],
    ['Aynı listeyle her seferinde aynı fikstür mü çıkar?', '"Yazdığım sırayla" seçiliyken evet; sonuç yalnızca takımların yazılış sırasına bağlıdır. "Kurayla karıştır" seçildiğinde her tıklamada takım sırası rastgele değişir ve farklı bir program oluşur.'],
    ['Haftaların sırasını değiştirebilir miyim?', 'Evet. Her hafta kendi içinde eksiksiz bir tur olduğundan haftaların yerini değiştirmek hiçbir eşleşmeyi bozmaz. Örneğin önemli bir maçı son haftaya almak için ilgili hafta bloğunu sona taşıyabilirsiniz.'],
    ['Bireysel sporlar için de kullanılabilir mi?', 'Evet. Takım adı yerine oyuncu adı yazmanız yeterlidir. Satranç, masa tenisi, tavla, dart ya da e-spor turnuvalarında herkesin herkesle oynadığı program aynı yöntemle çıkar.'],
    ['En çok kaç takım girebilirim?', '40 takıma kadar fikstür oluşturabilirsiniz. 40 takımlı çift devreli lig 1560 maç ve 78 hafta eder; daha büyük organizasyonlarda takımları gruplara ayırmak daha kullanışlıdır.'],
    ['Takım adları bir yere gönderiliyor mu?', 'Hayır. Fikstür tarayıcınızda üretilir; yazdığınız adlar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['eleme-tablosu-olustur', 'gol-averaji-hesapla', 'rastgele-takim-olustur', 'satirlari-karistir', 'oyun-puan-tablosu'],
};
