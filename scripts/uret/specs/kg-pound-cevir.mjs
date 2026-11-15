export default {
  slug: 'kg-pound-cevir',
  title: 'Kilogram Pound (Libre) Çevirici',
  h1Tail: 'kg ↔ lb',
  pageTitle: 'Kilogram Pound Çevirici – kg\'dan Libreye, lb\'den kg\'a Hesaplama',
  description: 'Kilogramı pounda (libre), poundu kilograma çevirin. 1 lb = 0,45359237 kg tanımıyla çalışır; pound ve ons gösterimini, gram karşılığını da verir.',
  card: 'Kilogramı pounda, poundu kilograma çevirin; kargo, spor salonu ve yurt dışı alışverişleri için pound-ons gösterimiyle.',
  category: 'birim',
  keywords: ['kg pound çevirme', 'pound kaç kg', 'libre kaç kilo', '1 lb kaç kg', 'kg to lbs', 'lbs kg hesaplama', 'kilogram libre dönüştürme'],
  lead: 'Bir ağırlığı kilogramdan pounda (libre, kısaltması <strong>lb</strong>) ya da pounddan kilograma çevirin. Araç, uluslararası tanım olan <strong>1 pound = 0,45359237 kg</strong> eşitliğini kullanır; sonucu pound ve ons olarak ayrıca gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 70' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kg', 'Kilogram → Pound'], ['lb', 'Pound → Kilogram']] },
  ],
  compute(v, h) {
    const LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kg = v.yon === 'lb' ? x * LB : x;
    const lb = v.yon === 'lb' ? x : x / LB;
    let tam = Math.floor(lb + 1e-9);
    let oz = Math.round((lb - tam) * 16 * 100) / 100;
    if (oz < 0) oz = 0;
    if (oz >= 16) { tam += 1; oz = 0; }
    const ana = v.yon === 'lb'
      ? [['Kilogram', h.fmt(kg, 4) + ' kg'], ['Pound', h.fmt(lb, 4) + ' lb']]
      : [['Pound', h.fmt(lb, 4) + ' lb'], ['Kilogram', h.fmt(kg, 4) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Pound ve ons', `${h.fmt(tam, 0)} lb ${h.fmt(oz, 2)} oz`],
        ['Gram', h.fmt(kg * 1000, 3) + ' g'],
      ],
      note: '1 lb = 0,45359237 kg (tam tanım), 1 lb = 16 oz. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '70', yon: 'kg' }, out: { 'Pound': '154,3236 lb', 'Pound ve ons': '154 lb 5,18 oz' } },
    { in: { deger: '100', yon: 'lb' }, out: { 'Kilogram': '45,3592 kg', 'Gram': '45.359,237 g' } },
    { in: { deger: '1', yon: 'kg' }, out: { 'Pound': '2,2046 lb', 'Pound ve ons': '2 lb 3,27 oz' } },
    { in: { deger: '0,45359237', yon: 'kg' }, out: { 'Pound': '1 lb', 'Pound ve ons': '1 lb 0 oz' } },
    { in: { deger: '2,5', yon: 'lb' }, out: { 'Kilogram': '1,134 kg', 'Pound ve ons': '2 lb 8 oz', 'Gram': '1.133,981 g' } },
    { in: { deger: '0', yon: 'kg' }, out: { 'Pound': '0 lb' } },
    { in: { deger: 'abc', yon: 'kg' }, error: true },
    { in: { deger: '-3', yon: 'lb' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına çevirmek istediğiniz değeri yazın. Ondalık kısım için virgül de nokta da kullanabilirsiniz.',
    '"Çeviri yönü" listesinden kilogramdan pounda mı, pounddan kilograma mı geçeceğinizi seçin.',
    '"Çevir" düğmesine basın; karşılık gelen değer en üst satırda görünür.',
    'Alt satırlardaki "Pound ve ons" gösterimini ABD biçimli etiket ve formlarda, gram değerini ise mutfak ve kargo terazisi karşılaştırmalarında kullanın.',
  ],
  sections: [
    { h: 'Pound (libre) nedir?', p: [
      'Pound, Amerika Birleşik Devletleri\'nde gündelik hayatın, Birleşik Krallık\'ta ise kısmen hâlâ kullanılan kütle birimidir. Türkçede "libre" adıyla da bilinir. Kısaltması olan <strong>lb</strong>, Latince "libra" sözcüğünden gelir; çoğulu için "lbs" yazımına da sık rastlanır. Günümüzde kullanılan pound, avoirdupois sistemine aittir ve 1959\'daki uluslararası anlaşmayla kilograma bağlanmıştır: bir pound tam olarak 0,45359237 kilogramdır.',
      'Bu tanım sayesinde çeviri bir ölçüm sonucuna değil, sabit bir katsayıya dayanır. Aradaki tek belirsizlik, sonucu kaç basamağa yuvarladığınızdır. Değerli madenlerde kullanılan troy pound farklı bir birimdir ve bu sayfanın konusu değildir.',
    ] },
    { h: 'Kilogramı pounda çevirme formülü', p: [
      'Kilogramdan pounda geçmek için değeri 0,45359237\'ye bölersiniz; bu, yaklaşık 2,20462 ile çarpmakla aynıdır: <strong>lb = kg ÷ 0,45359237</strong>. Pounddan kilograma geçerken tersini yaparsınız: <strong>kg = lb × 0,45359237</strong>.',
      'Çözümlü örnek: 70 kg bir kişinin ağırlığı 70 ÷ 0,45359237 = 154,3236 lb eder. Tam kısım 154 pounddur; kalan 0,3236 pound 16 ile çarpılınca 5,18 ons bulunur. Araç bu yüzden aynı değeri "154 lb 5,18 oz" olarak da yazar. Ters yönde, 100 lb\'lik bir halter plakası 100 × 0,45359237 = 45,3592 kg gelir.',
      'Kafadan hesap için pratik bir yol: kilogramı ikiyle çarpıp sonucun onda birini ekleyin. 70 kg için 140 + 14 = 154 lb bulunur; gerçek değere çok yakındır. Pounddan kilograma geçerken ikiye bölüp sonucun onda birini çıkarabilirsiniz: 100 lb için 50 − 5 = 45 kg.',
    ] },
    { h: 'Pound ve ons gösterimi', p: [
      'ABD\'de ağırlıklar çoğu zaman ondalıklı pound yerine pound ve ons olarak söylenir. Bir pound 16 onstur; dolayısıyla 2,5 lb, "2 lb 8 oz" demektir. Yenidoğan bebeklerin kilosu, paketli gıdaların net ağırlığı ve posta gönderileri bu biçimde yazılır. Araçtaki "Pound ve ons" satırı, ondalık kısmı 16 ile çarparak bu gösterimi sizin yerinize hazırlar.',
      'Dikkat edilmesi gereken nokta, buradaki onsun avoirdupois onsu (yaklaşık 28,35 g) olmasıdır. Altın ve gümüş fiyatlarında geçen troy onsu daha ağırdır ve pound-ons gösterimiyle karıştırılmamalıdır.',
    ] },
    { h: 'Türkiye\'de pound nerede karşımıza çıkar?', ul: [
      '<strong>Spor salonları:</strong> ithal dambıl ve plakaların üzerinde ağırlık çoğu zaman lb olarak yazar; 45 lb\'lik plaka yaklaşık 20,4 kg\'dır.',
      '<strong>Yurt dışı alışverişi ve kargo:</strong> ABD sitelerinde ürün ve paket ağırlığı pound olarak verilir; taşıma ücreti de pound kademelerine göre hesaplanır.',
      '<strong>Havayolu bagajı:</strong> bazı havayolları bagaj hakkını hem kilogram hem pound olarak belirtir; 50 lb yaklaşık 22,7 kg\'dır.',
      '<strong>Bebek ve sağlık takibi:</strong> yabancı kaynaklı büyüme tabloları ve uygulamalar kiloyu pound ve ons olarak isteyebilir.',
      '<strong>Balıkçılık ve olta malzemesi:</strong> misina dayanımı çoğunlukla pound cinsinden etiketlenir.',
      '<strong>Yemek tarifleri:</strong> Amerikan tariflerinde et, tereyağı ve un miktarı pound ile verilir; 1 lb tereyağı yaklaşık 454 gramdır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 lb</strong> = 0,4536 kg = 453,59 g',
      '<strong>5 lb</strong> = 2,268 kg',
      '<strong>10 lb</strong> = 4,5359 kg',
      '<strong>50 lb</strong> = 22,6796 kg',
      '<strong>100 lb</strong> = 45,3592 kg',
      '<strong>1 kg</strong> = 2,2046 lb',
      '<strong>5 kg</strong> = 11,0231 lb',
      '<strong>23 kg</strong> = 50,7063 lb',
      '<strong>50 kg</strong> = 110,2311 lb',
      '<strong>100 kg</strong> = 220,4623 lb',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, çarpılacak ve bölünecek katsayıyı karıştırmaktır. Pound kilogramdan küçük bir birim olduğu için aynı ağırlığın pound değeri her zaman kilogram değerinden büyük çıkar; sonucunuz bunun tersini gösteriyorsa yönü yanlış seçmişsinizdir. İkinci hata, "2,2" gibi kaba bir katsayıyla büyük ağırlıkları çevirmektir: 1.000 kg\'lık bir yükte bu yuvarlama yaklaşık 4,6 lb fark yaratır.',
      'Üçüncü hata, pound sterlin (para birimi) ile ağırlık birimi olan poundu karıştırmaktır. İkisinin adı aynı kökten gelir ama bu araç yalnızca kütle çevirir. Son olarak "lb" ile "lbf" (pound-kuvvet) farklıdır; lbf bir kuvvet birimidir ve tork ya da basınç hesaplarında geçer.',
    ] },
    { h: 'Sınırlar ve duyarlılık', p: [
      'Araç negatif değer kabul etmez. Sonuçlar dört ondalık basamağa kadar gösterilir; bu, gramın onda biri düzeyinde bir duyarlılıktır ve terazi, bagaj, kargo ve spor amaçlı kullanımlar için fazlasıyla yeterlidir. Ticari tartımda geçerli olan değer, kalibrasyonu yapılmış terazinin gösterdiği değerdir; çeviri sonucu yalnızca birim dönüşümünü verir.',
    ] },
  ],
  faq: [
    ['1 pound kaç kilogramdır?', '1 pound tam olarak 0,45359237 kilogramdır; yuvarlanmış hâliyle 0,4536 kg ya da yaklaşık 454 gram eder. Bu değer uluslararası anlaşmayla belirlenmiş tanımdır.'],
    ['1 kilogram kaç pounddur?', '1 kilogram yaklaşık 2,2046 pounddur. Hesap 1 ÷ 0,45359237 işlemiyle yapılır. 10 kg 22,0462 lb, 100 kg 220,4623 lb eder.'],
    ['Libre ile pound aynı şey midir?', 'Evet. Libre, poundun Türkçede kullanılan eski adıdır; ikisi de aynı birimi anlatır ve lb kısaltmasıyla gösterilir. Kısaltma Latince libra sözcüğünden gelir.'],
    ['lb ile lbs arasında fark var mı?', 'Hayır. İkisi de pound demektir; lbs yalnızca İngilizcede çoğul için kullanılan yaygın bir yazımdır. Resmî kısaltma tekil ve çoğulda lb\'dir.'],
    ['150 lbs kaç kilodur?', '150 lb, 150 × 0,45359237 = 68,0389 kg eder. Kabaca hesaplamak için ikiye bölüp onda birini çıkarabilirsiniz: 75 − 7,5 = 67,5 kg; gerçek değere yakın bir tahmin verir.'],
    ['Pound ve ons gösterimini nasıl okurum?', '"7 lb 8 oz" yazımı 7 pound ve 8 ons demektir. 1 pound 16 ons olduğundan bu değer 7,5 pounda, yani yaklaşık 3,402 kilograma eşittir. Araç sonuç kutusunda bu gösterimi ayrı bir satırda verir.'],
    ['Bagajım 23 kg, pound olarak ne kadar?', '23 kg yaklaşık 50,71 lb eder. Bagaj sınırını pound olarak veren havayollarında sınır çoğunlukla 50 lb olarak yazıldığından, kesin hakkınızı biletinizdeki koşullardan kontrol edin.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız ağırlık hiçbir sunucuya iletilmez ve kaydedilmez. Sayfa açıldıktan sonra bağlantı olmadan da çalışır.'],
  ],
  related: ['kg-stone-cevir', 'gram-ons-cevir', 'kg-gram-cevir', 'birim-donustur', 'vki-hesapla'],
};
