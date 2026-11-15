export default {
  slug: 'karis-cm-cevir',
  title: 'Karış ve Kulaç Santimetre Çevirici',
  h1Tail: 'karış, kulaç ↔ cm',
  pageTitle: 'Karış ve Kulaç Kaç cm? Karış Kulaç Santimetre Çevirici',
  description: 'Karış ve kulaç ölçülerini santimetre ve metreye çevirin. Kendi karış ve kulaç boyunuzu girerek kişisel ölçünüzle hesap yapın; denizcilik kulacı 1,8288 m alınır.',
  card: 'Karışı ve kulacı santimetreye, metreye çevirin; kendi karış boyunuzu yazıp cetvelsiz ölçümlerinizi gerçek uzunluğa dönüştürün.',
  category: 'birim',
  keywords: ['karış kaç cm', '1 karış kaç santimetre', 'kulaç kaç metre', '1 kulaç kaç cm', 'karış hesaplama', 'kulaç metre çevirme', 'beden ölçüleri uzunluk', 'denizcilik kulaç'],
  lead: 'Yanınızda metre yokken eşyayı karışla, ipi kulaçla ölçtüyseniz sonucu santimetreye çevirin. Karış ve kulaç insan bedenine dayanan ölçüler olduğu için kişiden kişiye değişir; bu yüzden araç <strong>kendi karış ve kulaç boyunuzu</strong> girmenize izin verir. Varsayılan değerler ortalama bir yetişkin karışı (22 cm) ve denizcilikte kullanılan kulaçtır (182,88 cm).',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 5' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['karis', 'Karış'], ['kulac', 'Kulaç'], ['cm', 'Santimetre'], ['metre', 'Metre']] },
    { id: 'karisBoy', label: 'Bir karış kaç cm?', type: 'number', value: '22', hint: 'Elinizi açıp başparmak ucundan serçe parmak ucuna ölçün.' },
    { id: 'kulacBoy', label: 'Bir kulaç kaç cm?', type: 'number', value: '182,88', hint: 'Denizcilik kulacı 182,88 cm\'dir; kendi kulacınızı da yazabilirsiniz.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const karis = h.pos(v.karisBoy, 'Bir karış kaç cm?');
    const kulac = h.pos(v.kulacBoy, 'Bir kulaç kaç cm?');
    if (karis > 40) h.err('Karış boyu 40 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
    if (kulac > 300) h.err('Kulaç boyu 300 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
    const kat = { karis, kulac, cm: 1, metre: 100 };
    if (!kat[v.birim]) h.err('Listeden geçerli bir birim seçin.');
    const cm = x * kat[v.birim];
    const s = {
      cm: ['Santimetre', h.fmt(cm, 2) + ' cm'],
      metre: ['Metre', h.fmt(cm / 100, 4) + ' m'],
      karis: ['Karış', h.fmt(cm / karis, 4) + ' karış'],
      kulac: ['Kulaç', h.fmt(cm / kulac, 4) + ' kulaç'],
    };
    const sira = v.birim === 'karis' || v.birim === 'kulac' ? ['cm', 'metre', 'karis', 'kulac'] : ['karis', 'kulac', 'cm', 'metre'];
    return {
      rows: sira.filter((k) => k !== v.birim).map((k) => s[k]),
      note: `Hesapta 1 karış = ${h.fmt(karis, 2)} cm, 1 kulaç = ${h.fmt(kulac, 2)} cm alındı. Bu ölçüler kişiye göre değişir; kesin iş için şerit metre kullanın.`,
    };
  },
  cases: [
    { in: { deger: '5', birim: 'karis' }, out: { 'Santimetre': '110 cm', 'Metre': '1,1 m', 'Kulaç': '0,6015 kulaç' } },
    { in: { deger: '10', birim: 'kulac' }, out: { 'Santimetre': '1.828,8 cm', 'Metre': '18,288 m', 'Karış': '83,1273 karış' } },
    { in: { deger: '100', birim: 'cm' }, out: { 'Karış': '4,5455 karış', 'Kulaç': '0,5468 kulaç', 'Metre': '1 m' } },
    { in: { deger: '3', birim: 'karis', karisBoy: '20' }, out: { 'Santimetre': '60 cm', 'Metre': '0,6 m' } },
    { in: { deger: '2', birim: 'metre' }, out: { 'Karış': '9,0909 karış', 'Kulaç': '1,0936 kulaç', 'Santimetre': '200 cm' } },
    { in: { deger: '1', birim: 'kulac', kulacBoy: '170' }, out: { 'Santimetre': '170 cm', 'Metre': '1,7 m' } },
    { in: { deger: '0', birim: 'karis' }, out: { 'Santimetre': '0 cm' } },
    { in: { deger: 'beş', birim: 'karis' }, error: true },
    { in: { deger: '4', birim: 'karis', karisBoy: '0' }, error: true },
    { in: { deger: '4', birim: 'kulac', kulacBoy: '1828' }, error: true },
  ],
  howto: [
    'Daha doğru sonuç için önce kendi karışınızı ölçün: elinizi düz bir yüzeyde olabildiğince açın, başparmak ucu ile serçe parmak ucu arasını cetvelle ölçüp "Bir karış kaç cm?" alanına yazın.',
    'Kulaç kullanacaksanız kollarınızı iki yana açın ve bir orta parmak ucundan diğerine olan mesafeyi ölçtürün; denizcilik hesabı yapıyorsanız 182,88 değerini değiştirmeyin.',
    '"Değer" alanına kaç karış, kaç kulaç, kaç santimetre ya da kaç metre olduğunu yazın ve birimi seçin.',
    '"Çevir" düğmesine basın; santimetre, metre, karış ve kulaç karşılıkları birlikte gösterilir.',
    'Sonuç altındaki notta hesapta kullanılan karış ve kulaç boyu yazar; yanlış girdiyseniz düzeltip yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Karış nedir, kaç santimetredir?', p: [
      'Karış, el parmakları olabildiğince açıldığında başparmağın ucu ile serçe parmağın ucu arasında kalan uzunluktur. Resmî bir standardı yoktur; yetişkinlerde çoğunlukla 18 ile 25 santimetre arasında değişir. Bu araçta varsayılan değer olarak 22 santimetre alınmıştır, ancak iri elli bir yetişkinin karışı 24–25 santimetreyi bulabilir, bir çocuğun karışı ise 12–15 santimetre kadardır.',
      'Karışın değeri kişiye bağlı olsa da aynı kişide gün içinde değişmez; bu yüzden kendi karışınızı bir kez ölçüp aklınızda tutarsanız yanınızda her zaman taşıdığınız bir cetveliniz olur. Mobilya mağazasında bir sehpanın arabaya sığıp sığmayacağına, pazarda bir kumaşın yetip yetmeyeceğine ya da duvardaki boşluğa hangi çerçevenin uyacağına karışla karar vermek bu yüzden işe yarar.',
    ] },
    { h: 'Kulaç nedir, kaç metredir?', p: [
      'Kulaç, kollar iki yana tam açıldığında bir elin orta parmak ucundan diğer elin orta parmak ucuna kadar olan uzunluktur. İnsanlarda kulaç boyu kabaca boy uzunluğuna eşittir; 1,75 metre boyundaki birinin kulacı da 1,75 metre dolayındadır.',
      'Kulaç, karıştan farklı olarak denizcilikte standartlaşmıştır. Derinlik ve halat uzunluğu ölçüsü olarak kullanılan denizcilik kulacı 6 feet, yani <strong>1,8288 metredir</strong>. Eski deniz haritalarında derinlikler kulaçla yazılır; balıkçılar ağın, oltanın ve demir zincirinin boyunu bugün de kulaçla söyler. Halatı iki eliyle çekip kollarını açarak sayan bir balıkçı, aslında tam olarak bu ölçüyü uygulamaktadır.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Formül bir çarpmadan ibarettir: <strong>santimetre = karış sayısı × bir karışın boyu</strong> ve <strong>santimetre = kulaç sayısı × bir kulacın boyu</strong>. Ters yönde santimetre değeri aynı boya bölünür.',
      '<strong>Örnek 1:</strong> Bir masanın eni 5 karış geldi ve karışınız 22 cm. 5 × 22 = 110 cm, yani 1,1 metre. Aynı uzunluk 110 ÷ 182,88 = 0,6015 kulaç eder.',
      '<strong>Örnek 2:</strong> Balıkçı "on kulaçta demirledik" diyor. 10 × 1,8288 = 18,288 metre derinlik demektir; bu da 22 santimetrelik karışla 83,1273 karış eder.',
      '<strong>Örnek 3:</strong> 2 metrelik bir boşluk kaç karıştır? 200 ÷ 22 = 9,0909 karış; yani dokuz karıştan biraz fazla. Karışınız 20 cm ise aynı boşluk tam 10 karış gelir. Aradaki fark, kişisel ölçünün neden önemli olduğunu gösterir.',
    ] },
    { h: 'Bedene dayalı diğer ölçüler', p: [
      'Karış ve kulaç, insan bedeninden türeyen ölçü ailesinin iki üyesidir. Aynı aileden başka ölçüler de gündelik dilde yaşar:',
    ], ul: [
      '<strong>Parmak:</strong> bir parmak eni; kabaca 2 santimetre. "Dört parmak" bir avuç enine yakındır.',
      '<strong>Avuç (tutam):</strong> dört parmağın yan yana eni; yaklaşık 8–10 santimetre.',
      '<strong>Ayak:</strong> bir ayak tabanının boyu; İngiliz sistemindeki foot 30,48 santimetre olarak standartlaşmıştır.',
      '<strong>Arşın:</strong> dirsekten parmak ucuna kol boyu; çarşı arşını 68 santimetre kabul edilir.',
      '<strong>Adım:</strong> yürürken iki topuk arası; yetişkinlerde 65–80 santimetre arasında değişir.',
    ] },
    { h: 'Karışla ölçerken dikkat edilecekler', ul: [
      'Her seferinde elinizi aynı gerginlikte açın. Gevşek karış ile zorlanmış karış arasında 2–3 santimetre fark olabilir.',
      'Karışı yüzeye yatırarak ilerleyin; serçe parmağın bittiği noktayı diğer elinizle işaretleyip başparmağı tam oraya koyun.',
      'Uzun mesafelerde hata birikir. On karışlık bir ölçümde karış başına yarım santimetrelik sapma 5 santimetre eder; iki kez ölçüp ortalamasını almak iyi bir alışkanlıktır.',
      'Kesim, sipariş ve montaj gibi geri dönüşü olmayan işlerde karışı yalnızca ön tahmin için kullanın; son ölçüyü mutlaka şerit metreyle alın.',
      'Kulaçta sırtınızı duvara verip kollarınızı yere paralel tutarak ölçüm yaptırırsanız kendi kulaç boyunuzu daha doğru belirlersiniz.',
    ] },
    { h: 'Dilimizde karış ve kulaç', p: [
      'Bu iki ölçü Türkçenin deyim dünyasında geniş yer tutar. "Karış karış gezmek" bir yeri en ince ayrıntısına kadar dolaşmak, "bir karış toprak" küçük ama değerli bir arazi parçası, "dili bir karış" saygısızca karşılık veren kişi anlamında kullanılır. Yüzmede kolların suyu çekerek öne uzanmasına "kulaç atmak" denmesi de aynı beden hareketinden gelir. Bu deyimler, metre yaygınlaşmadan önce insanların dünyayı kendi bedenleriyle ölçtüğünü hatırlatır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç karış boyunu en fazla 40 cm, kulaç boyunu en fazla 300 cm kabul eder; daha büyük bir değer çoğunlukla birimin yanlış yazıldığını gösterir. Sonuçlar girdiğiniz kişisel ölçünün doğruluğu kadar doğrudur. Denizde seyir ve derinlik hesabı gibi güvenliği ilgilendiren konularda yalnızca resmî harita ve cihaz değerlerine güvenin.',
    ] },
  ],
  faq: [
    ['1 karış kaç santimetredir?', 'Karışın sabit bir değeri yoktur; yetişkinlerde genellikle 18–25 santimetre arasındadır. Ortalama olarak 22 santimetre kabul edilebilir. En doğrusu kendi karışınızı cetvelle ölçüp o değeri kullanmaktır.'],
    ['1 kulaç kaç metredir?', 'Denizcilikte kullanılan kulaç 6 feet, yani 1,8288 metredir. Beden ölçüsü olarak kulaç ise kişinin boyuna yakındır ve kişiden kişiye değişir.'],
    ['Kulaç boyu gerçekten boya eşit mi?', 'Yetişkinlerin çoğunda kulaç boyu ile boy uzunluğu birbirine çok yakındır, ancak tam eşit olmak zorunda değildir. Bazı kişilerde kulaç birkaç santimetre daha uzun ya da kısa olabilir.'],
    ['Kendi karışımı nasıl ölçerim?', 'Elinizi masaya koyup parmaklarınızı zorlamadan olabildiğince açın. Başparmağınızın ucu ile serçe parmağınızın ucu arasındaki düz mesafeyi cetvelle ölçün. Çıkan değeri "Bir karış kaç cm?" alanına yazın.'],
    ['10 kulaç derinlik kaç metre eder?', 'Denizcilik kulacıyla 10 kulaç 18,288 metredir. Yaklaşık hesap için kulaç sayısını 1,83 ile çarpmak yeterlidir.'],
    ['Bir metre kaç karıştır?', '22 santimetrelik karışla 1 metre yaklaşık 4,55 karış eder. Karışınız 20 santimetre ise tam 5 karış, 25 santimetre ise 4 karış gelir.'],
    ['Karış ile arşın arasında nasıl bir ilişki var?', 'İkisi de beden ölçüsüdür ancak farklı uzunlukları anlatır. Çarşı arşını 68 santimetredir ve yaklaşık üç karışa denk gelir. Arşın zamanla standartlaşmış, karış ise kişisel bir ölçü olarak kalmıştır.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez. Sayfayı yenilediğinizde alanlar varsayılan değerlerine döner.'],
  ],
  related: ['arsin-metre-cevir', 'parmak-cm-cevir', 'fersah-km-cevir', 'boy-feet-cm-cevir', 'metre-feet-cevir', 'deniz-mili-km-cevir'],
};
