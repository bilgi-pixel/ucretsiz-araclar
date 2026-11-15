export default {
  slug: 'kg-gram-cevir',
  title: 'Kilogram Gram Çevirici',
  h1Tail: 'kg ↔ g',
  pageTitle: 'Kilogram Gram Çevirici – 1 kg Kaç Gram, Gramdan Kiloya Hesaplama',
  description: 'Kilogramı grama, gramı kilograma çevirin. 1 kg = 1.000 gram; sonucu "2 kg 350 g" biçiminde, miligram ve ton karşılığıyla birlikte görün.',
  card: 'Kilogramı grama, gramı kilograma çevirin; pazar, mutfak ve kargo için "2 kg 350 g" gösterimiyle birlikte.',
  category: 'birim',
  keywords: ['kg gram çevirme', '1 kg kaç gram', 'gram kg hesaplama', 'gram kaç kilo', 'yarım kilo kaç gram', 'kilogram gram dönüştürme', '750 gram kaç kg'],
  lead: 'Bir ağırlığı kilogramdan grama ya da gramdan kilograma çevirin. <strong>1 kilogram = 1.000 gram</strong> eşitliği kullanılır; sonuç ayrıca terazilerde ve etiketlerde görülen "kilogram ve gram" biçiminde de yazılır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 2,35', hint: 'Binlik ayraç kullanmayın (1500 yazın) ya da 1.500,00 biçiminde yazın.' },
    { id: 'birim', label: 'Girdiğiniz birim', type: 'select', options: [['kg', 'Kilogram (kg) → Gram'], ['g', 'Gram (g) → Kilogram']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = Math.round((v.birim === 'g' ? x : x * 1000) * 1e6) / 1e6;
    const kg = g / 1000;
    let tamKg = Math.floor(kg + 1e-9);
    let kalanG = Math.round((g - tamKg * 1000) * 1000) / 1000;
    if (kalanG < 0) kalanG = 0;
    if (kalanG >= 1000) { tamKg += 1; kalanG = 0; }
    const ana = v.birim === 'g'
      ? [['Kilogram', h.fmt(kg, 6) + ' kg'], ['Gram', h.fmt(g, 3) + ' g']]
      : [['Gram', h.fmt(g, 3) + ' g'], ['Kilogram', h.fmt(kg, 6) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Kilogram ve gram', `${h.fmt(tamKg, 0)} kg ${h.fmt(kalanG, 3)} g`],
        ['Miligram', h.fmt(g * 1000, 0) + ' mg'],
        ['Ton', h.fmt(kg / 1000, 9) + ' t'],
      ],
      note: '1 kg = 1.000 g = 1.000.000 mg; 1 ton = 1.000 kg.',
    };
  },
  cases: [
    { in: { deger: '2,35', birim: 'kg' }, out: { 'Gram': '2.350 g', 'Kilogram ve gram': '2 kg 350 g' } },
    { in: { deger: '750', birim: 'g' }, out: { 'Kilogram': '0,75 kg', 'Kilogram ve gram': '0 kg 750 g' } },
    { in: { deger: '1', birim: 'kg' }, out: { 'Gram': '1.000 g', 'Miligram': '1.000.000 mg' } },
    { in: { deger: '1500', birim: 'g' }, out: { 'Kilogram': '1,5 kg', 'Kilogram ve gram': '1 kg 500 g' } },
    { in: { deger: '0,25', birim: 'kg' }, out: { 'Gram': '250 g' } },
    { in: { deger: '5000', birim: 'g' }, out: { 'Kilogram': '5 kg', 'Ton': '0,005 t', 'Kilogram ve gram': '5 kg 0 g' } },
    { in: { deger: '3,075', birim: 'kg' }, out: { 'Gram': '3.075 g', 'Kilogram ve gram': '3 kg 75 g' } },
    { in: { deger: 'bir kilo', birim: 'kg' }, error: true },
    { in: { deger: '-250', birim: 'g' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına değeri yazın. Kesirli kilogram için virgül kullanın (2,35); gram değerlerinde binlik ayraç koymayın (1500).',
    '"Girdiğiniz birim" listesinden değerin kilogram mı gram mı olduğunu seçin.',
    '"Çevir" düğmesine basın. İlk satırda öbür birimdeki karşılık yer alır.',
    '"Kilogram ve gram" satırı, sonucu terazi ekranında ya da kargo etiketinde gördüğünüz iki parçalı biçimde verir; gerekirse "Sonucu kopyala" ile alın.',
  ],
  sections: [
    { h: 'Kilogram ve gram ilişkisi', p: [
      'Kilogram, uluslararası birim sisteminin temel kütle birimidir; gram ise onun binde biridir. "Kilo" ön eki bin anlamına gelir: kilometre bin metre, kilogram bin gramdır. Türkçede gündelik konuşmada "kilo" sözcüğü tek başına kilogram yerine kullanılır. Simgeler küçük harfle yazılır: kilogram için <strong>kg</strong>, gram için <strong>g</strong>.',
      'Çeviri iki yönde de tek bir işlemdir: <strong>g = kg × 1.000</strong> ve <strong>kg = g ÷ 1.000</strong>. Başka bir deyişle ondalık virgülü üç basamak kaydırırsınız. Kilogramdan grama geçerken virgül sağa gider ve sayı büyür; gramdan kilograma geçerken virgül sola gider ve sayı küçülür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Kasaptan alınan et 2,35 kg geldi. Gram karşılığı 2,35 × 1.000 = 2.350 gramdır; terazi bunu "2 kg 350 g" olarak da gösterebilir.',
      'Örnek 2: Bir paketin üzerinde 750 g yazıyor. Kilogram karşılığı 750 ÷ 1.000 = 0,75 kg\'dır; yani dörtte üç kilo.',
      'Örnek 3: Bir kargo 1.500 gram geldi. 1.500 ÷ 1.000 = 1,5 kg, yani 1 kg 500 g.',
      'Örnek 4: Bir tarifte 0,25 kg tereyağı isteniyor. 0,25 × 1.000 = 250 gram; standart bir paket tereyağına denk gelir.',
      'Örnek 5: Yenidoğan bir bebeğin kilosu 3,075 kg ölçüldü. Bu 3.075 gram, yani 3 kg 75 g demektir. Burada sık yapılan bir okuma hatası vardır: 3,075 kg, "3 kilo 750 gram" değildir.',
    ] },
    { h: 'Ondalıklı kilogramı doğru okumak', p: [
      'Virgülden sonraki basamaklar gramı verir, ancak üç basamağa tamamlandığında. 1,5 kg bin beş yüz gramdır, çünkü 1,5 aslında 1,500 demektir; "bir kilo beş gram" değildir. Aynı şekilde 2,05 kg iki kilo elli gram, 2,5 kg iki kilo beş yüz gram, 2,005 kg ise iki kilo beş gramdır.',
      'Karışıklığı önlemenin en kolay yolu, virgülden sonraki kısmı zihninizde üç basamağa tamamlamaktır: 0,7 → 0,700 → 700 gram; 0,07 → 0,070 → 70 gram; 0,007 → 7 gram. Araçtaki "Kilogram ve gram" satırı bu okumayı sizin yerinize yapar.',
    ] },
    { h: 'Gündelik dildeki karşılıklar', ul: [
      '<strong>Yarım kilo</strong> = 0,5 kg = 500 gram',
      '<strong>Çeyrek kilo</strong> = 0,25 kg = 250 gram',
      '<strong>Bir buçuk kilo</strong> = 1,5 kg = 1.500 gram',
      '<strong>Yüz gram</strong> = 0,1 kg',
      '<strong>Elli gram</strong> = 0,05 kg',
      '<strong>İki yüz elli gram</strong> = 0,25 kg (çeyrek kilo ile aynı)',
      '<strong>Yedi yüz elli gram</strong> = 0,75 kg',
      '<strong>On kilo</strong> = 10.000 gram',
      '<strong>Bir ton</strong> = 1.000 kg = 1.000.000 gram',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Pazarda ve markette fiyatlar çoğunlukla kilogram üzerinden yazılır, ama aldığınız miktar gramla tartılır. Kilosu belli bir ürünün 350 gramının ne tuttuğunu bulmak için önce gramı kilograma çevirmeniz (0,35 kg), sonra kilogram fiyatıyla çarpmanız gerekir. Paketli ürünlerde birim fiyat karşılaştırması da aynı mantıkla yapılır: 400 gramlık ve 1 kilogramlık iki paketi karşılaştırırken ikisini de aynı birime getirirsiniz.',
      'Kargo ve posta gönderilerinde ücret kademeleri kilogram ya da gram sınırlarına göre belirlenir; mutfak terazinizin gösterdiği gram değerini kilograma çevirerek hangi kademeye girdiğinizi görebilirsiniz. Okulda ilkokul matematiğinden lise fiziğine kadar birim çevirme sorularının en sık karşılaşılan türü de budur; fizik formüllerinde kütle kilogram olarak kullanılır, bu yüzden gram verilen değerler önce kilograma çevrilir.',
      'Yemek tariflerinde, bebek gelişimi takibinde, evcil hayvan maması porsiyonlarında ve el işi malzemelerinde de aynı çeviriye ihtiyaç duyulur.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Birinci hata, yukarıda anlatılan ondalık okuma hatasıdır. İkinci hata, virgülü iki basamak kaydırmaktır; kilogram ile gram arasında yüz değil bin kat vardır. Üçüncü hata, girdide binlik ayraç olarak tek nokta kullanmaktır: araç "1.500" yazımını 1,5 olarak okur. Bin beş yüz gram için 1500 ya da 1.500,00 yazın.',
      'Bir de "ağırlık" ile "kütle" ayrımı vardır. Gündelik dilde kilogram ağırlık birimi gibi kullanılır, fizikte ise kütle birimidir; ağırlık bir kuvvettir ve newton ile ölçülür. Bu araç gündelik anlamıyla, kütle birimleri arasında çeviri yapar. Negatif değer kabul edilmez; gramın binde birine kadar olan değerler gösterilir.',
    ] },
  ],
  faq: [
    ['1 kilogram kaç gramdır?', '1 kilogram 1.000 gramdır. "Kilo" ön eki bin anlamına geldiği için bu tam bir eşitliktir.'],
    ['1 gram kaç kilogramdır?', '1 gram 0,001 kilogramdır, yani kilogramın binde biri. 100 gram 0,1 kg, 250 gram 0,25 kg eder.'],
    ['Yarım kilo kaç gramdır?', 'Yarım kilo 500 gramdır. Çeyrek kilo 250 gram, üç çeyrek kilo ise 750 gramdır.'],
    ['1,5 kg kaç gram eder?', '1,5 kg, 1.500 gram eder; yani bir kilo beş yüz gram. Virgülden sonraki 5, beş gram değil beş yüz gram anlamına gelir.'],
    ['750 gram kaç kilogramdır?', '750 gram 0,75 kilogramdır. Gram değerini 1.000\'e bölerek kilograma çevirirsiniz.'],
    ['Gramın kısaltması g mi, gr mı?', 'Standart simge g harfidir; kilogram için de kg yazılır. "gr" yazımı etiketlerde ve gündelik kullanımda görülse de resmî birim simgesi değildir. Simgelerden sonra nokta konmaz.'],
    ['Kilogram fiyatı belli olan ürünün gram fiyatını nasıl bulurum?', 'Kilogram fiyatını 1.000\'e bölerseniz bir gramın fiyatını bulursunuz. Belirli bir miktar için gramı kilograma çevirip kilogram fiyatıyla çarpın; örneğin 350 gram, 0,35 kg olarak hesaba girer.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz ağırlık sunucuya iletilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['gram-miligram-cevir', 'ton-kg-cevir', 'kg-pound-cevir', 'mutfak-olcu-donustur', 'fiyat-hesapla'],
};
