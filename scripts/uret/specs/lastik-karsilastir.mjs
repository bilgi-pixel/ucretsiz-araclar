export default {
  slug: 'lastik-karsilastir',
  title: 'Lastik Ebadı Karşılaştırma',
  h1Tail: 'çap, çevre ve hız farkı',
  pageTitle: 'Lastik Ebadı Karşılaştırma – Çap Farkı ve Gösterge Sapması',
  description: 'İki lastik ebadını karşılaştırın: yanak yüksekliği, toplam çap, çevre, çap farkı yüzdesi ve hız göstergesindeki sapmayı tek hesapla görün.',
  card: 'İki lastik ebadının çapını, çevresini ve yanak yüksekliğini karşılaştırın; hız göstergesi sapmasını görün.',
  category: 'gunluk',
  keywords: ['lastik ebadı karşılaştırma', 'lastik çap farkı', 'lastik ebat hesaplama', 'jant büyütme hesaplama', 'kilometre saati sapması', 'lastik yanak yüksekliği', 'lastik çevresi hesaplama'],
  lead: `Mevcut lastiğinizle takmayı düşündüğünüz lastiğin ebadını yazın; araç iki lastiğin <strong>yanak yüksekliğini, toplam çapını ve çevresini</strong> hesaplar, aradaki farkı yüzde olarak verir ve hız göstergenizin ne kadar sapacağını gösterir.`,
  button: 'Karşılaştır',
  inputs: [
    { id: 'eski', label: 'Mevcut lastik ebadı', type: 'text', placeholder: 'Örn. 205/55 R16', hint: 'Genişlik/yanak oranı R jant çapı biçiminde yazın.' },
    { id: 'yeni', label: 'Yeni lastik ebadı', type: 'text', placeholder: 'Örn. 225/45 R17' },
    { id: 'hiz', label: 'Göstergedeki hız (km/sa)', type: 'number', value: '100', hint: 'Sapmanın hesaplanacağı gösterge hızı.' },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { eski: '205/55 R16', yeni: '225/45 R17', hiz: '100' }, out: { 'Çap farkı': '+0,38 %', 'Mevcut lastik çapı': '631,9 mm', 'Yeni lastik çapı': '634,3 mm', 'Gerçek hız': '100,4 km/sa' } },
    { in: { eski: '195/65 R15', yeni: '205/55 R16', hiz: '100' }, out: { 'Çap farkı': '-0,41 %', 'Mevcut lastik çapı': '634,5 mm', 'Mevcut yanak yüksekliği': '126,8 mm', 'Yeni yanak yüksekliği': '112,8 mm' } },
    { in: { eski: '205/55 R16', yeni: '205/55 R16', hiz: '120' }, out: { 'Çap farkı': '0 %', 'Gerçek hız': '120 km/sa', 'Genişlik farkı': '0 mm' } },
    { in: { eski: '185/65R15', yeni: '185/60R15', hiz: '100' }, out: { 'Çap farkı': '-2,98 %', 'Yeni lastik çapı': '603 mm', 'Çap farkı (mm)': '-18,5 mm', 'Gerçek hız': '97 km/sa' } },
    { in: { eski: '205/55 r16', yeni: '215/65 R16', hiz: '100' }, out: { 'Çap farkı': '+8,55 %', 'Yeni lastik çapı': '685,9 mm', 'Yerden yükseklik değişimi': '+27 mm' } },
    { in: { eski: '225/45 ZR17', yeni: '225/40 R18', hiz: '90' }, out: { 'Mevcut lastik çapı': '634,3 mm', 'Yeni lastik çapı': '637,2 mm', 'Çap farkı': '+0,46 %' } },
    { in: { eski: '205-55-16', yeni: '225/45 R17', hiz: '100' }, error: true },
    { in: { eski: '205/55 R16', yeni: '', hiz: '100' }, error: true },
  ],
  howto: [
    `"Mevcut lastik ebadı" alanına aracınızda takılı lastiğin yanağında yazan ölçüyü girin, örneğin 205/55 R16.`,
    `"Yeni lastik ebadı" alanına takmayı düşündüğünüz ölçüyü aynı biçimde yazın.`,
    `Hız göstergesi sapmasını hangi hızda görmek istiyorsanız "Göstergedeki hız" alanına yazın; varsayılan 100 km/sa değeridir.`,
    `"Karşılaştır" düğmesine basın. İlk satırdaki çap farkı yüzdesi kararınızı verirken bakacağınız ana değerdir.`,
    `Alt satırlardan yanak yüksekliği, çevre, yerden yükseklik değişimi ve gerçek hızı okuyun; isterseniz sonucu kopyalayıp lastikçinizle paylaşın.`,
  ],
  sections: [
    { h: 'Lastik ebadı nasıl okunur?', p: [
      `Lastiğin yanağındaki <strong>205/55 R16</strong> gibi bir yazı üç ayrı ölçü taşır. İlk sayı lastiğin kesit genişliğidir ve milimetre cinsindendir: 205 mm. İkinci sayı yanak oranıdır; yanak yüksekliğinin genişliğe oranını yüzde olarak verir. 55 değeri, yanağın genişliğin yüzde 55'i kadar, yani 112,75 mm yüksekliğinde olduğunu söyler. R harfi radyal yapıyı, son sayı ise lastiğin oturduğu jantın çapını inç olarak gösterir.`,
      `Bu üç sayıdan lastiğin toplam çapı kolayca bulunur. Jant çapı milimetreye çevrilir (inç × 25,4) ve üzerine iki yanak yüksekliği eklenir, çünkü tekerleğin hem üstünde hem altında birer yanak vardır. Ebadın ardından gelen 91V gibi yük ve hız simgeleri çap hesabına girmez; ancak yeni lastiğin bu değerlerinin aracınız için öngörülenden düşük olmaması gerekir.`,
    ] },
    { h: 'Hesaplama formülleri', ul: [
      `<strong>Yanak yüksekliği</strong> = genişlik × yanak oranı ÷ 100`,
      `<strong>Toplam çap</strong> = jant çapı × 25,4 + 2 × yanak yüksekliği`,
      `<strong>Çevre</strong> = π × toplam çap`,
      `<strong>Çap farkı (%)</strong> = (yeni çap − mevcut çap) ÷ mevcut çap × 100`,
      `<strong>Gerçek hız</strong> = göstergedeki hız × yeni çap ÷ mevcut çap`,
      `<strong>Yerden yükseklik değişimi</strong> = çap farkının yarısı`,
    ] },
    { h: 'Çözümlü örnek: 16 inçten 17 inçe geçiş', p: [
      `Aracınızda 205/55 R16 lastik olsun ve 225/45 R17 ebadına geçmeyi düşünün. Mevcut lastikte yanak 205 × 0,55 = 112,75 mm, çap 16 × 25,4 + 2 × 112,75 = 406,4 + 225,5 = <strong>631,9 mm</strong> olur. Yeni lastikte yanak 225 × 0,45 = 101,25 mm, çap 17 × 25,4 + 2 × 101,25 = 431,8 + 202,5 = <strong>634,3 mm</strong> eder.`,
      `İki çap arasındaki fark yalnızca 2,4 mm'dir; bu da 2,4 ÷ 631,9 × 100 = yüzde 0,38 demektir. Göstergeniz 100 km/sa gösterirken araç gerçekte yaklaşık 100,4 km/sa hızla gider. Jant bir inç büyümüş, yanak yaklaşık 11,5 mm incelmiş, taban 20 mm genişlemiş ama tekerleğin dış ölçüsü neredeyse aynı kalmıştır. Jant büyütmenin mantığı tam olarak budur: jant büyürken yanak oranı düşürülerek toplam çap korunur.`,
    ] },
    { h: 'Çap farkı neden önemlidir?', p: [
      `Aracın hız göstergesi ve kilometre sayacı tekerleğin dönüş sayısından hesap yapar. Daha büyük çaplı lastik her turda daha uzun yol aldığı için gösterge gerçek hızdan düşük değer gösterir; farkında olmadan hız sınırını aşabilirsiniz. Daha küçük çaplı lastikte ise gösterge olduğundan yüksek okur ve kilometre sayacı gerçekte gidilenden fazla yol yazar.`,
      `Çap değişimi yalnızca göstergeyi etkilemez. Büyük çap, aktarma oranını uzatır; araç aynı devirde daha hızlı gider ama kalkışta daha isteksiz hissedilir. ABS, çekiş kontrolü ve denge sistemleri tekerlek hız algılayıcılarına güvenir; ön ve arka aksta farklı çapta lastik kullanmak bu sistemleri yanıltabilir. Dört çeker araçlarda akslar arası çap farkı aktarma organlarına zarar verebilir.`,
      `Lastik sektöründe yaygın kabul gören pratik kural, toplam çaptaki değişimin <strong>yüzde 3'ü geçmemesidir</strong>; birçok usta bu sınırı daha da dar tutar. Araç bu eşiği aştığınızda sonuç notunda sizi uyarır. Ebat değişikliğinin yasal ve teknik uygunluğu için araç ruhsatındaki ve üretici belgelerindeki onaylı ebatlara bakın, muayene ve sigorta açısından güncel mevzuatı kontrol edin.`,
    ] },
    { h: 'Genişlik ve yanak değişiminin sürüşe etkisi', p: [
      `Daha geniş taban, kuru zeminde yol tutuşu ve fren performansını artırabilir; buna karşılık yuvarlanma direnci ve dolayısıyla yakıt tüketimi biraz yükselir, ıslak zeminde suda kızaklama eğilimi artabilir. Daha alçak yanak direksiyon tepkilerini keskinleştirir ama çukur ve kasislerde konforu azaltır, jantın darbe alma riskini yükseltir. Türkiye'deki bozuk şehir içi yollarda çok ince yanaklı lastiklerin jant eğilmesine yol açması sık karşılaşılan bir durumdur.`,
      `Geniş lastik seçerken çamurluk içi boşluğa, direksiyon tam kırıkken sürtme olup olmadığına ve jant genişliğinin o lastik için uygun aralıkta olduğuna da bakmak gerekir. Bu sayfa yalnızca geometrik karşılaştırma yapar; jant genişliği ve ofset (ET) uyumunu hesaba katmaz.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Yanak oranını milimetre sanmak: 55, yanağın 55 mm olduğu anlamına gelmez; genişliğin yüzde 55'idir. Genişlik değişince yanak yüksekliği de değişir.`,
      `Yalnızca jantı büyütüp yanak oranını aynı bırakmak: 205/55 R16 yerine 205/55 R17 takmak çapı yaklaşık yüzde 4 büyütür.`,
      `Nominal ölçüyü kesin kabul etmek: aynı ebattaki iki farklı lastiğin gerçek çapı birkaç milimetre farklı olabilir; diş derinliği azaldıkça çap da küçülür.`,
      `Hız göstergesinin fabrika çıkışında zaten bir miktar fazla gösterdiğini unutmak: buradaki "gerçek hız" değeri, göstergenin mevcut lastikle tam doğru okuduğu varsayımına dayanır.`,
      `Sonuçlar bilgilendirme amaçlıdır; nihai ebat kararını aracınızın onaylı ebat listesine ve yetkin bir lastik uzmanının görüşüne göre verin.`,
    ] },
  ],
  faq: [
    ['Lastik çapı farkı en fazla yüzde kaç olmalı?', `Yaygın pratik kural toplam çap farkının yüzde 3'ü aşmamasıdır; mümkünse yüzde 1–2'nin altında kalmak tercih edilir. Kesin sınır için aracınızın onaylı ebat listesine ve güncel mevzuata bakın.`],
    ['205/55 R16 yerine 225/45 R17 takılır mı?', `Geometrik olarak iki ebadın çapı neredeyse aynıdır: 631,9 mm ve 634,3 mm, fark yüzde 0,38. Ancak takılabilirlik yalnızca çapa bağlı değildir; jant genişliği, ofset, çamurluk boşluğu ve aracın onaylı ebatları da uygun olmalıdır.`],
    ['Büyük lastik takınca hız göstergesi nasıl etkilenir?', `Çap büyüdüğünde gösterge gerçek hızdan düşük gösterir. Örneğin çap yüzde 3 büyüdüyse göstergede 100 km/sa okurken araç yaklaşık 103 km/sa hızla gidiyordur.`],
    ['Yanak yüksekliği nasıl hesaplanır?', `Genişlik yanak oranıyla çarpılıp 100'e bölünür. 195/65 ebadında 195 × 65 ÷ 100 = 126,75 mm yanak yüksekliği bulunur.`],
    ['Lastik değişince kilometre sayacı da yanlış mı sayar?', `Evet, sapma hız göstergesindekiyle aynı orandadır. Çap yüzde 2 küçüldüyse sayaç gerçekte gidilen her 100 km için yaklaşık 102 km yazar.`],
    ['Ebadı hangi biçimlerde yazabilirim?', `205/55 R16, 205/55R16, 205/55 ZR16 ve 205/55-16 biçimleri kabul edilir. Büyük küçük harf fark etmez. Hafif ticari araçlardaki 16C gibi ekleri ve yük-hız simgelerini yazmayın.`],
    ['Ön ve arkaya farklı ebat takabilir miyim?', `Bazı araçlar fabrika çıkışında ön ve arkada farklı genişlik kullanır, ancak bu ebatların çapları birbirine çok yakın seçilir. Üreticinin öngörmediği bir kombinasyon sürüş elektroniğini ve dört çeker sistemleri olumsuz etkileyebilir.`],
    ['Yazdığım ebatlar bir yere gönderiliyor mu?', `Hayır. Karşılaştırma tamamen tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['lastik-olcusu-hesapla', 'vites-hiz-hesapla', 'yakit-tuketimi-hesapla', 'hiz-hesapla', 'cm-inc-cevir'],
};
