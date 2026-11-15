export default {
  slug: 'kalori-kilokalori-cevir',
  title: 'Kalori Kilokalori Çevirici',
  h1Tail: 'cal ↔ kcal',
  pageTitle: `Kalori Kilokalori Çevirici – cal'den kcal'ye, kcal'den cal'ye`,
  description: `Kaloriyi kilokaloriye, kilokaloriyi kaloriye çevirin. 1 kcal = 1.000 cal eşitliğiyle çalışır; joule, kilojoule ve watt-saat karşılıklarını da gösterir.`,
  card: `Kalori (cal) ile kilokalori (kcal) arasında çeviri yapın; joule, kilojoule ve watt-saat karşılığını da görün.`,
  category: 'birim',
  keywords: ['kalori kilokalori çevirme', '1 kcal kaç kalori', 'kcal cal farkı', 'kilokalori kaç kalori', 'cal kcal çevirici', 'kcal kj çevirme', 'besin etiketi kalori kcal'],
  lead: `Bir enerji değerini kalori (cal), kilokalori (kcal), joule (J) ve kilojoule (kJ) arasında çevirin. Araç <strong>1 kcal = 1.000 cal = 4.184 J</strong> eşitliklerini kullanır ve besin etiketlerindeki "kalori" ile fizikteki "kalori" arasındaki farkı netleştirmenize yardımcı olur.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Enerji değeri', type: 'number', placeholder: 'Örn. 250', hint: 'Binlik ayraç kullanmayın (örn. 2000).' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['kcal', 'Kilokalori (kcal)'], ['cal', 'Kalori (cal)'], ['kj', 'Kilojoule (kJ)'], ['j', 'Joule (J)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['cal', 'Kalori (cal)'], ['kcal', 'Kilokalori (kcal)'], ['kj', 'Kilojoule (kJ)'], ['j', 'Joule (J)']] },
  ],
  compute(v, h) {
    // Taban birim joule; termokimyasal kalori: 1 cal = 4,184 J (tam tanım).
    const birimler = {
      cal: [4.184, 'cal'],
      kcal: [4184, 'kcal'],
      j: [1, 'J'],
      kj: [1000, 'kJ'],
    };
    const x = h.nonneg(v.deger, 'Enerji değeri');
    const k = birimler[v.kaynak] || birimler.kcal;
    const t = birimler[v.hedef] || birimler.cal;
    const joule = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(joule / b[0], 9) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Kalori', yaz(birimler.cal)],
        ['Kilokalori', yaz(birimler.kcal)],
        ['Joule', yaz(birimler.j)],
        ['Kilojoule', yaz(birimler.kj)],
        ['Watt-saat', h.sig(joule / 3600, 6) + ' Wh'],
      ],
      note: '1 kcal = 1.000 cal = 4,184 kJ (termokimyasal kalori). Besin etiketlerinde "kalori" diye anılan değer kilokaloridir.',
    };
  },
  cases: [
    { in: { deger: '1', kaynak: 'kcal', hedef: 'cal' }, out: { 'Sonuç': '1.000 cal', 'Joule': '4.184 J', 'Kilojoule': '4,184 kJ' } },
    { in: { deger: '500', kaynak: 'cal', hedef: 'kcal' }, out: { 'Sonuç': '0,5 kcal', 'Joule': '2.092 J' } },
    { in: { deger: '2000', kaynak: 'kcal', hedef: 'kj' }, out: { 'Sonuç': '8.368 kJ', 'Kalori': '2.000.000 cal', 'Watt-saat': '2.324,44 Wh' } },
    { in: { deger: '100', kaynak: 'kj', hedef: 'kcal' }, out: { 'Sonuç': '23,9005736 kcal', 'Joule': '100.000 J' } },
    { in: { deger: '250', kaynak: 'kcal', hedef: 'kj' }, out: { 'Sonuç': '1.046 kJ', 'Kalori': '250.000 cal' } },
    { in: { deger: '4,184', kaynak: 'j', hedef: 'cal' }, out: { 'Sonuç': '1 cal', 'Kilokalori': '0,001 kcal' } },
    { in: { deger: '0', kaynak: 'kcal', hedef: 'cal' }, out: { 'Sonuç': '0 cal' } },
    { in: { deger: 'çok', kaynak: 'kcal', hedef: 'cal' }, error: true },
    { in: { deger: '-50', kaynak: 'kcal', hedef: 'cal' }, error: true },
  ],
  howto: [
    `"Enerji değeri" alanına sayıyı yazın; ondalık için virgül kullanabilirsiniz.`,
    `"Girilen birim" listesinden değerin birimini seçin. Besin etiketinden okuduğunuz değer için kilokalori (kcal) seçeneğini kullanın.`,
    `"Çevrilecek birim" listesinden hedef birimi belirleyin: kalori, kilokalori, kilojoule ya da joule.`,
    `"Çevir" düğmesine basın. İlk satır hedef birimdeki sonucu, alt satırlar diğer bütün karşılıkları gösterir.`,
  ],
  sections: [
    { h: 'Kalori ile kilokalori arasındaki fark', p: [
      `Kalori sözcüğü iki farklı büyüklük için kullanıldığından sık sık karışıklığa yol açar. Fizik ve kimyadaki <strong>kalori (cal)</strong>, bir gram suyun sıcaklığını bir santigrat derece artırmak için gereken enerji olarak tanımlanmış küçük bir birimdir. <strong>Kilokalori (kcal)</strong> bunun bin katıdır ve bir kilogram suyun sıcaklığını bir derece artıran enerjiye karşılık gelir.`,
      `Beslenmede "kalori" denildiğinde ise hemen her zaman kilokalori kastedilir. Bir dilim ekmeğin 70 kalori olduğu söylendiğinde aslında 70 kcal, yani 70.000 küçük kalori anlatılmaktadır. İngilizce kaynaklarda bu ayrım bazen büyük harfle yapılır: büyük C ile yazılan "Calorie" kilokalori, küçük c ile yazılan "calorie" küçük kaloridir. Türkiye'de ambalajlı gıdaların etiketlerinde enerji değeri kcal ve kJ olarak birlikte yer alır.`,
    ] },
    { h: 'Çeviri formülleri', ul: [
      `<strong>cal = kcal × 1.000</strong>`,
      `<strong>kcal = cal ÷ 1.000</strong>`,
      `<strong>kJ = kcal × 4,184</strong>`,
      `<strong>kcal = kJ ÷ 4,184</strong>`,
      `<strong>J = cal × 4,184</strong>`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `Bir kimya sorusunda 500 cal ısı verildiği yazıyor ve sonucu kilokalori olarak bulmanız gerekiyor: 500 ÷ 1.000 = <strong>0,5 kcal</strong>. Joule karşılığı 500 × 4,184 = 2.092 J'dür.`,
      `Günlük 2.000 kcal'lik bir beslenme planını ele alalım. Küçük kalori cinsinden bu 2.000 × 1.000 = 2.000.000 cal, kilojoule cinsinden 2.000 × 4,184 = <strong>8.368 kJ</strong> eder. Aynı enerji yaklaşık 2.324 watt-saat, yani yaklaşık 2,3 kilovat-saattir; bir insanın gün boyu besinlerden aldığı enerji, elektrik faturasındaki birimle ifade edildiğinde birkaç kilovat-saat düzeyindedir.`,
      `Ters yönde: yurt dışından gelen bir ürünün etiketinde yalnızca "100 kJ" yazıyorsa kilokalori karşılığı 100 ÷ 4,184 ≈ 23,9 kcal olur. Kabaca hesap için kilojoule değerini dörde bölmek yeterli bir yaklaşım verir.`,
    ] },
    { h: 'Hangi kalori tanımı kullanılıyor?', p: [
      `Tarih boyunca kalorinin birkaç farklı tanımı yapılmıştır, çünkü suyun bir derece ısınması için gereken enerji başlangıç sıcaklığına göre çok az değişir. Bu araç, kimyada ve beslenme biliminde yaygın olan <strong>termokimyasal kaloriyi</strong> kullanır: 1 cal tam olarak 4,184 joule kabul edilir. Buhar tablolarında kullanılan uluslararası tablo kalorisi ise 4,1868 joule'dür. İki tanım arasındaki fark on binde altı dolayındadır; günlük beslenme hesaplarında hiçbir önemi yoktur, ancak hassas mühendislik hesaplarında hangi tanımın geçerli olduğuna bakmak gerekir.`,
      `Joule, enerjinin SI birimidir ve bilimsel yayınlarda kalori yerine giderek daha çok tercih edilir. Kalori ise beslenmede ve gündelik dilde yerleşik olduğu için kullanılmaya devam etmektedir.`,
    ] },
    { h: 'Besinlerde enerji: hızlı başvuru', p: [
      `Besin etiketlerindeki enerji değerleri, temel besin ögelerinin gram başına yaklaşık enerji katsayılarıyla hesaplanır. Bu katsayılar yuvarlak ortalama değerlerdir; tek tek besinlerde küçük sapmalar olabilir.`,
    ], ul: [
      `<strong>Karbonhidrat:</strong> gram başına yaklaşık 4 kcal (yaklaşık 17 kJ)`,
      `<strong>Protein:</strong> gram başına yaklaşık 4 kcal (yaklaşık 17 kJ)`,
      `<strong>Yağ:</strong> gram başına yaklaşık 9 kcal (yaklaşık 37 kJ)`,
      `<strong>Alkol:</strong> gram başına yaklaşık 7 kcal (yaklaşık 29 kJ)`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Etiketteki değeri bin ile çarpmak ya da bine bölmek:</strong> etikette yazan "kalori" zaten kilokaloridir. Diyet uygulamasına girerken ayrıca çeviri yapmanız gerekmez.`,
      `<strong>kJ ile kcal sütunlarını karıştırmak:</strong> etiketlerde iki değer yan yana durur ve kilojoule sayısı her zaman yaklaşık dört kat büyüktür. Büyük sayıyı kilokalori sanmak, alınan enerjiyi dört kat fazla hesaplamak demektir.`,
      `<strong>100 gram ile porsiyon değerini ayırt etmemek:</strong> birim çevirisi doğru olsa bile değerin hangi miktar için verildiğine bakılmazsa sonuç yanıltıcı olur.`,
      `<strong>Kısaltmaları yanlış yazmak:</strong> doğru yazım küçük harfle cal ve kcal biçimindedir; büyük harfli "Cal" özel olarak kilokalori anlamına gelir.`,
    ] },
    { h: 'Sınırlar ve sağlık notu', p: [
      `Araç yalnızca birim çevirir; bir besinin enerji içeriğini ya da sizin günlük enerji gereksiniminizi hesaplamaz. Negatif değer kabul edilmez. Sonuçlar dokuz anlamlı basamağa kadar gösterilir.`,
      `Buradaki bilgiler genel bilgilendirme amaçlıdır. Kilo verme, kilo alma ya da bir hastalığa bağlı beslenme düzeni için enerji hedefinizi bir diyetisyen ya da hekimle birlikte belirleyin.`,
    ] },
  ],
  faq: [
    ['1 kilokalori kaç kaloridir?', `1 kilokalori 1.000 kaloridir. Kilo ön eki bin anlamına geldiği için kilokalori değerini 1.000 ile çarparak kaloriye çevirirsiniz.`],
    ['Besin etiketindeki kalori kcal mi, cal mi?', `Kilokaloridir. Gündelik dilde ve beslenmede "kalori" denildiğinde kilokalori (kcal) kastedilir; 100 kalorilik bir atıştırmalık aslında 100 kcal enerji içerir.`],
    ['1 kcal kaç kilojoule eder?', `1 kcal 4,184 kilojoule eder. Tersine 1 kilojoule yaklaşık 0,239 kcal'dir. Kabaca hesap için kcal değerini 4 ile çarpabilir, kJ değerini 4'e bölebilirsiniz.`],
    ['1 kalori kaç joule eder?', `Termokimyasal tanıma göre 1 kalori tam olarak 4,184 joule'dür. Uluslararası tablo kalorisi kullanılan kaynaklarda bu değer 4,1868 joule olarak geçer.`],
    ['Büyük harfle yazılan Calorie ne demek?', `İngilizce kaynaklarda büyük C ile yazılan Calorie, kilokalori anlamında kullanılır. Küçük c ile yazılan calorie ise bunun binde biri olan küçük kaloridir.`],
    ['Kalori mi joule mü kullanmalıyım?', `Bilimsel çalışmalarda ve SI birim sisteminde joule kullanılır. Beslenme ve diyet bağlamında kilokalori yaygındır; etiketlerde çoğu zaman ikisi birlikte verilir, hangisini izleyeceğiniz alışkanlığınıza bağlıdır.`],
    ['2.000 kcal kaç kilovat-saat eder?', `2.000 kcal, 8.368 kilojoule'dür; bu da yaklaşık 2.324 watt-saat, yani yaklaşık 2,32 kilovat-saat eder.`],
    ['Yazdığım değerler bir yere kaydediliyor mu?', `Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra çevrimdışı da çalışır.`],
  ],
  related: ['kcal-kj-cevir', 'kalori-joule-cevir', 'kwh-kcal-cevir', 'met-kalori-hesapla', 'kalori-acigi-hesapla', 'isi-enerjisi-hesapla'],
};
