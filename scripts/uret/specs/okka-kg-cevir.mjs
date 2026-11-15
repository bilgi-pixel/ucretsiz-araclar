export default {
  slug: 'okka-kg-cevir',
  title: 'Okka Kilogram Çevirici',
  h1Tail: 'okka ↔ kg',
  pageTitle: 'Okka Kilogram Çevirici – 1 Okka Kaç kg, Kaç Gram, Kaç Dirhem',
  description: 'Osmanlı ağırlık birimi okkayı kilograma, kilogramı okkaya çevirin. 1 okka = 400 dirhem ≈ 1,283 kg kabulüyle dirhem ve gram karşılığını da gösterir.',
  card: 'Eski ağırlık birimi okkayı kilograma, kilogramı okkaya çevirin; dirhem ve gram karşılığıyla, eski tarif ve belgeler için.',
  category: 'birim',
  keywords: ['okka kaç kg', '1 okka kaç gram', 'okka kilogram çevirme', 'okka nedir', 'dirhem kaç gram', 'kıyye kaç kilo', 'osmanlı ağırlık ölçüleri', 'okka hesaplama'],
  lead: 'Osmanlı döneminden kalan ağırlık birimi okkayı (kıyye) kilograma ya da kilogramı okkaya çevirin. Araç, en yaygın kabul olan <strong>1 okka = 400 dirhem = 1,282945 kg</strong> değerini kullanır ve sonucu dirhem ile gram olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 10' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['okka', 'Okka → Kilogram'], ['kg', 'Kilogram → Okka']] },
  ],
  compute(v, h) {
    const OKKA = 1.282945;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kg = v.yon === 'kg' ? x : x * OKKA;
    const okka = v.yon === 'kg' ? x / OKKA : x;
    const ana = v.yon === 'kg'
      ? [['Okka', h.fmt(okka, 4) + ' okka'], ['Kilogram', h.fmt(kg, 6) + ' kg']]
      : [['Kilogram', h.fmt(kg, 6) + ' kg'], ['Okka', h.fmt(okka, 4) + ' okka']];
    return {
      rows: [
        ...ana,
        ['Dirhem', h.fmt(okka * 400, 2) + ' dirhem'],
        ['Gram', h.fmt(kg * 1000, 3) + ' g'],
      ],
      note: 'Kabul: 1 okka = 400 dirhem = 1,282945 kg (1 dirhem ≈ 3,207 g). Okkanın değeri döneme ve bölgeye göre değişmiştir; tarihî belgelerde sonucu yaklaşık kabul edin.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'okka' }, out: { 'Kilogram': '1,282945 kg', 'Dirhem': '400 dirhem', 'Gram': '1.282,945 g' } },
    { in: { deger: '5', yon: 'kg' }, out: { 'Okka': '3,8973 okka', 'Dirhem': '1.558,91 dirhem' } },
    { in: { deger: '10', yon: 'okka' }, out: { 'Kilogram': '12,82945 kg', 'Dirhem': '4.000 dirhem' } },
    { in: { deger: '1', yon: 'kg' }, out: { 'Okka': '0,7795 okka', 'Dirhem': '311,78 dirhem', 'Gram': '1.000 g' } },
    { in: { deger: '44', yon: 'okka' }, out: { 'Kilogram': '56,44958 kg', 'Dirhem': '17.600 dirhem' } },
    { in: { deger: '1,282945', yon: 'kg' }, out: { 'Okka': '1 okka', 'Dirhem': '400 dirhem' } },
    { in: { deger: '6', yon: 'okka' }, out: { 'Kilogram': '7,69767 kg' } },
    { in: { deger: 'iki okka', yon: 'okka' }, error: true },
    { in: { deger: '-1', yon: 'kg' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına okka ya da kilogram cinsinden değeri yazın; yarım okka için 0,5 girebilirsiniz.',
    '"Çeviri yönü" listesinden Okka → Kilogram ya da Kilogram → Okka seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı gösterir.',
    'Eski bir tarif ya da belgede miktar dirhemle verilmişse "Dirhem" satırını; mutfak terazisinde tartacaksanız "Gram" satırını kullanın.',
  ],
  sections: [
    { h: 'Okka nedir?', p: [
      'Okka, Osmanlı Devleti\'nde ve Cumhuriyet\'in ilk yıllarında çarşı pazarda en çok kullanılan ağırlık birimidir. Eski metinlerde <strong>kıyye</strong> adıyla da geçer. Bir okka 400 dirhemdir. Türkiye\'de 1930\'ların başında çıkarılan Ölçüler Kanunu ile metrik sisteme geçilmiş, okkanın yerini kilogram almıştır. Buna karşın sözcük dilimizde yaşamaya devam etmiş; yaşlıların anlatılarında, eski yemek defterlerinde, tapu ve mahkeme kayıtlarında, vakfiyelerde ve edebiyat eserlerinde sık sık karşımıza çıkmıştır.',
      'Okka yalnızca Anadolu\'da değil, Balkanlar\'dan Mısır\'a kadar eski Osmanlı coğrafyasının büyük bölümünde kullanılmıştır. Bu geniş alanda ve yüzyıllar boyunca birimin değeri her yerde tıpatıp aynı kalmamıştır; aşağıda bu konuya ayrıca değinilmiştir.',
    ] },
    { h: '1 okka kaç kilogramdır?', p: [
      'İstanbul\'da kullanılan ve bugün kaynaklarda en çok anılan standart okka yaklaşık <strong>1,283 kilogramdır</strong>. Bu araç, 1 dirhemi 3,2073625 gram alarak 400 dirhemlik okkayı 1,282945 kg kabul eder. Kaynaklarda 1,282 kg ya da 1,283 kg gibi yuvarlanmış değerlerle de karşılaşabilirsiniz; aradaki fark bir gramın altındadır ve gündelik amaçlar için önemsizdir.',
      'Çeviri formülü basittir: <strong>kg = okka × 1,282945</strong> ve <strong>okka = kg ÷ 1,282945</strong>. Kafadan hesap için okkayı "bir kilo ve yaklaşık çeyrek fazlası" olarak düşünebilirsiniz; dört okka beş kilogramdan biraz fazladır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Eski bir reçel tarifinde 10 okka şeker yazıyor. 10 × 1,282945 = 12,82945 kg, yani yaklaşık 12,8 kilogram şeker gerekir. Bu aynı zamanda 4.000 dirhemdir.',
      'Örnek 2: 5 kilogramlık bir miktarın okka karşılığı 5 ÷ 1,282945 = 3,8973 okkadır; dirhem olarak 1.558,91 dirhem eder.',
      'Örnek 3: 1 kilogram, 0,7795 okka ya da 311,78 dirhemdir. Yani bir kilogram, bir okkanın dörtte üçünden biraz fazladır.',
      'Örnek 4: Bir belgede 44 okka yazıyorsa bu 44 × 1,282945 = 56,44958 kg eder. 44 okka, eski sistemde bir kantar olarak anılan miktardır.',
    ] },
    { h: 'Dirhem ve okkanın katları', p: [
      'Okkanın alt birimi dirhemdir; bir okka 400 dirhem, bir dirhem de yaklaşık 3,207 gramdır. Eski tariflerde baharat, maya, tuz gibi az kullanılan malzemeler dirhemle, un, şeker, yağ ve et gibi ana malzemeler okkayla yazılır. "Yüz dirhem" çeyrek okka, yani yaklaşık 321 gram; "iki yüz dirhem" yarım okka, yani yaklaşık 641 gramdır.',
      'Okkadan büyük miktarlar için de ayrı adlar kullanılmıştır. Yaygın kabule göre:',
    ], ul: [
      '<strong>1 dirhem</strong> ≈ 3,207 gram',
      '<strong>100 dirhem</strong> = çeyrek okka ≈ 320,7 gram',
      '<strong>1 okka (kıyye)</strong> = 400 dirhem ≈ 1,283 kg',
      '<strong>1 batman</strong> = 6 okka ≈ 7,70 kg',
      '<strong>1 kantar</strong> = 44 okka ≈ 56,45 kg',
      '<strong>1 çeki</strong> = 4 kantar = 176 okka ≈ 225,8 kg',
    ] },
    { h: 'Değer neden kaynaktan kaynağa değişiyor?', p: [
      'Metrik sistemden önceki ölçüler bugünkü gibi tek bir uluslararası tanıma bağlı değildi. Okkanın ve özellikle batman, kantar gibi katlarının değeri şehirden şehre, tartılan malın cinsine ve döneme göre farklılık gösterebiliyordu. Aynı adı taşıyan bir birim bir bölgede daha ağır, başka bir bölgede daha hafif olabiliyordu. Bu yüzden tarihî bir belgedeki miktarı günümüz birimine çevirirken sonucu kesin bir ölçüm gibi değil, iyi bir yaklaşım olarak görmek gerekir.',
      'Akademik bir çalışma, tez ya da yayın hazırlıyorsanız belgenin ait olduğu yer ve dönem için kullanılan değeri güvenilir bir tarih kaynağından doğrulayın ve hangi katsayıyı kullandığınızı metninizde belirtin. Bu araç tek bir standart değerle çalışır.',
    ] },
    { h: 'Dilimizde okka', p: [
      'Birim kullanımdan kalkmış olsa da deyimlerde yaşamaktadır. "Okkalı" sözcüğü ağır, iri, dolgun anlamında kullanılır; büyük fincanda sunulan bol kahveye "okkalı kahve" denir. "Okka çekmek" bir şeyin beklenenden ağır gelmesini, "okkanın altına gitmek" ise bir olayda başkalarıyla birlikte zarar görmeyi ya da cezalandırılmayı anlatır. "Dirhem dirhem" ise azar azar, ölçülü ölçülü anlamına gelir.',
      'Bu deyimler, okkanın bir zamanlar gündelik hayatın ne kadar merkezinde olduğunu gösterir. Büyükanne tariflerini bugünün mutfağına uyarlamak, eski romanlardaki alışveriş sahnelerini anlamak ya da aile büyüklerinden kalan defterleri okumak isteyenler için bu çeviri hâlâ pratik bir gerekliliktir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez ve yalnızca yukarıda belirtilen standart okka değerini kullanır; bölgesel okkaları ya da başka ülkelerde aynı kökten gelen farklı değerdeki birimleri kapsamaz. Kilogram sonucu altı ondalık basamağa kadar gösterilir; ancak birimin tarihî belirsizliği göz önüne alındığında sonucu gram düzeyine yuvarlayarak kullanmak daha gerçekçidir. Günümüzde ticarette okka kullanılmaz; alım satımda geçerli birim kilogramdır.',
    ] },
  ],
  faq: [
    ['1 okka kaç kilogramdır?', 'Yaygın kabule göre 1 okka yaklaşık 1,283 kilogramdır. Bu araç 400 dirhemlik okkayı 1,282945 kg olarak hesaplar.'],
    ['1 okka kaç gramdır?', '1 okka yaklaşık 1.283 gramdır; araçta kullanılan değer 1.282,945 gramdır. Yarım okka yaklaşık 641 gram, çeyrek okka yaklaşık 321 gram eder.'],
    ['1 kilogram kaç okka eder?', '1 kilogram yaklaşık 0,7795 okkadır; bu da yaklaşık 312 dirheme karşılık gelir.'],
    ['1 dirhem kaç gramdır?', '1 dirhem yaklaşık 3,207 gramdır. 400 dirhem bir okka eder. Eski tariflerde geçen 10 dirhem yaklaşık 32 gram, 50 dirhem yaklaşık 160 gramdır.'],
    ['Kıyye ile okka aynı şey mi?', 'Evet. Kıyye, okkanın eski metinlerde ve resmî kayıtlarda kullanılan adıdır; ikisi de 400 dirhemlik aynı birimi anlatır.'],
    ['Okka bugün kullanılıyor mu?', 'Hayır. Türkiye\'de metrik sisteme geçilmesiyle birlikte okka resmî ölçü olmaktan çıkmıştır. Günümüzde yalnızca deyimlerde, eski belgelerde ve tariflerde karşımıza çıkar.'],
    ['Kantar ve batman kaç okkadır?', 'Yaygın kabule göre bir batman 6 okka, bir kantar 44 okkadır. Ancak bu katların değeri bölgeye ve tartılan mala göre değişebildiği için tarihî belgelerde yerel değeri ayrıca araştırmak gerekir.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayı sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kg-gram-cevir', 'mutfak-olcu-donustur', 'tarif-olcekle', 'birim-donustur', 'hicri-miladi'],
};
