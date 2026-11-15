export default {
  slug: 'dekar-verim-hesapla',
  title: 'Dekara Verim Hesaplama',
  h1Tail: 'kg/da ve ton/ha',
  pageTitle: 'Dekara Verim Hesaplama – Dönüme Kaç Kilo Ürün Alındı?',
  description: 'Toplam hasat miktarını ve ekim alanını yazın; dekara verimi (kg/da), hektara verimi (ton/ha) ve satış fiyatı girerseniz dekara geliri anında hesaplayın.',
  card: 'Hasat miktarı ve alandan dekara verimi, hektara ton karşılığını ve dekara geliri hesaplayın.',
  category: 'gunluk',
  keywords: ['dekara verim hesaplama', 'dönüme verim', 'kg/da hesaplama', 'hektara verim', 'buğday verimi hesaplama', 'dekara gelir hesaplama', 'tarla verimi'],
  lead: 'Kantar fişindeki toplam ürünü ve ekili alanı yazın; araç <strong>dekara verimi</strong> kilogram olarak, hektara verimi ton olarak verir. Satış fiyatını da girerseniz toplam ve dekara düşen geliri görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'urun', label: 'Toplam hasat miktarı', type: 'number', placeholder: 'Örn. 4500' },
    { id: 'urunBirim', label: 'Hasat birimi', type: 'select', options: [['kg', 'Kilogram (kg)'], ['ton', 'Ton']] },
    { id: 'alan', label: 'Ekili alan', type: 'number', placeholder: 'Örn. 10' },
    { id: 'alanBirim', label: 'Alan birimi', type: 'select', options: [['da', 'Dekar (dönüm)'], ['ha', 'Hektar'], ['m2', 'Metrekare']] },
    { id: 'fiyat', label: 'Satış fiyatı (TL/kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12' },
  ],
  compute(v, h) {
    const u = h.nonneg(v.urun, 'Toplam hasat miktarı');
    const a = h.pos(v.alan, 'Ekili alan');
    const fiyat = h.opt(v.fiyat, 0, 'Satış fiyatı');
    if (fiyat < 0) h.err('Satış fiyatı negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    const kg = v.urunBirim === 'ton' ? u * 1000 : u;
    const da = v.alanBirim === 'ha' ? a * 10 : v.alanBirim === 'm2' ? a / 1000 : a;
    const verim = kg / da;
    const rows = [
      ['Dekara verim', h.fmt(verim, 2) + ' kg/da'],
      ['Hektara verim', h.fmt(verim / 100, 3) + ' ton/ha'],
      ['Metrekareye verim', h.fmt(verim / 1000, 3) + ' kg/m²'],
      ['Toplam hasat', h.fmt(kg, 2) + ' kg'],
      ['Alan', `${h.fmt(da, 3)} dekar (${h.fmt(da * 1000, 1)} m²)`],
    ];
    if (fiyat > 0) {
      rows.push(['Toplam gelir', h.para(kg * fiyat)]);
      rows.push(['Dekara gelir', h.para(verim * fiyat)]);
    }
    return {
      rows,
      note: 'Dekara verim = toplam hasat (kg) ÷ alan (dekar). 1 hektar = 10 dekar, 1 dekar = 1.000 m². Gelir brüt değerdir; masraflar düşülmemiştir.',
    };
  },
  cases: [
    { in: { urun: '4500', urunBirim: 'kg', alan: '10', alanBirim: 'da', fiyat: '' }, out: { 'Dekara verim': '450 kg/da', 'Hektara verim': '4,5 ton/ha', 'Metrekareye verim': '0,45 kg/m²' } },
    { in: { urun: '12', urunBirim: 'ton', alan: '2', alanBirim: 'ha', fiyat: '' }, out: { 'Dekara verim': '600 kg/da', 'Hektara verim': '6 ton/ha', 'Toplam hasat': '12.000 kg', 'Alan': '20 dekar (20.000 m²)' } },
    { in: { urun: '300', urunBirim: 'kg', alan: '500', alanBirim: 'm2', fiyat: '' }, out: { 'Dekara verim': '600 kg/da', 'Alan': '0,5 dekar (500 m²)' } },
    { in: { urun: '4500', urunBirim: 'kg', alan: '10', alanBirim: 'da', fiyat: '12' }, out: { 'Dekara verim': '450 kg/da', 'Toplam gelir': '54.000,00 TL', 'Dekara gelir': '5.400,00 TL' } },
    { in: { urun: '2750', urunBirim: 'kg', alan: '7,5', alanBirim: 'da', fiyat: '' }, out: { 'Dekara verim': '366,67 kg/da', 'Hektara verim': '3,667 ton/ha' } },
    { in: { urun: '80', urunBirim: 'ton', alan: '16', alanBirim: 'da', fiyat: '2,5' }, out: { 'Dekara verim': '5.000 kg/da', 'Hektara verim': '50 ton/ha', 'Toplam gelir': '200.000,00 TL', 'Dekara gelir': '12.500,00 TL' } },
    { in: { urun: '0', urunBirim: 'kg', alan: '10', alanBirim: 'da', fiyat: '' }, out: { 'Dekara verim': '0 kg/da' } },
    { in: { urun: '4500', urunBirim: 'kg', alan: '0', alanBirim: 'da', fiyat: '' }, error: true },
    { in: { urun: 'çok', urunBirim: 'kg', alan: '10', alanBirim: 'da', fiyat: '' }, error: true },
  ],
  howto: [
    'Toplam hasat miktarını yazın ve birimini kilogram ya da ton olarak seçin.',
    'Ürünün alındığı ekili alanı girin; birimini dekar, hektar ya da metrekare olarak belirleyin.',
    'Gelir hesabı da istiyorsanız kilogram satış fiyatını yazın; istemiyorsanız bu alanı boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satırda dekara verimi, altında hektar ve metrekare karşılıklarını görürsünüz.',
    'Farklı parsellerinizi ayrı ayrı hesaplayıp sonuçları karşılaştırarak hangi tarlanın daha verimli olduğunu görebilirsiniz.',
  ],
  sections: [
    { h: 'Dekara verim nedir, neden önemlidir?', p: [
      'Dekara verim, bir dekar (1.000 metrekare) alandan elde edilen ürün miktarıdır ve Türkiye\'de çiftçiler arasında en çok kullanılan verim ölçüsüdür. "Dönüme 450 kilo buğday aldım" cümlesindeki değer budur. Toplam hasat tek başına bir şey söylemez; 20 ton ürün 30 dekardan alındıysa iyi, 80 dekardan alındıysa zayıf bir sonuç olabilir. Verim, farklı büyüklükteki tarlaları, farklı çeşitleri ve farklı yılları birbiriyle karşılaştırılabilir hâle getirir.',
      'Resmî istatistikler, tohum firmalarının çeşit kataloğu ve tarımsal destek başvuruları da verimi kg/da cinsinden ifade eder. Uluslararası kaynaklarda ise ton/hektar kullanılır; araç her iki değeri birlikte verdiği için yabancı kaynaklı bir deneme sonucunu kendi tarlanızla kolayca kıyaslayabilirsiniz.',
    ] },
    { h: 'Formül ve birim dönüşümleri', p: [
      'Hesap basit bir bölmedir: <strong>dekara verim (kg/da) = toplam hasat (kg) ÷ alan (dekar)</strong>. Dikkat edilecek tek nokta birimlerdir. Hasat ton olarak biliniyorsa 1.000 ile çarpılarak kilograma, alan hektar ise 10 ile çarpılarak, metrekare ise 1.000\'e bölünerek dekara çevrilir.',
      'Hektara verim ile dekara verim arasında sabit bir ilişki vardır: <strong>ton/ha = kg/da ÷ 100</strong>. Dekara 450 kg, hektara 4,5 ton demektir. Metrekareye verim ise kg/da değerinin 1.000\'e bölünmesiyle bulunur; sera ve bahçe üretiminde bu gösterim daha kullanışlıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: 10 dekarlık tarladan 4.500 kg buğday hasat edildi. Verim 4.500 ÷ 10 = 450 kg/da, yani 4,5 ton/ha ve metrekareye 0,45 kg\'dır. Ürün kilosu 12 TL\'den satılırsa toplam gelir 54.000 TL, dekara gelir 5.400 TL olur.',
      'Örnek 2: 2 hektar alandan 12 ton mısır alındı. Önce birimler çevrilir: 12 ton 12.000 kg, 2 hektar 20 dekardır. Verim 12.000 ÷ 20 = 600 kg/da, yani 6 ton/ha\'dır.',
      'Örnek 3: 500 metrekarelik serada 300 kg domates toplandı. 500 metrekare 0,5 dekardır; verim 300 ÷ 0,5 = 600 kg/da çıkar. Sera ürünlerinde hasat sezon boyunca parça parça yapıldığı için toplam hasat alanına tüm toplamaların toplamını yazmak gerekir.',
      'Örnek 4: 7,5 dekardan 2.750 kg ayçiçeği alındıysa verim 2.750 ÷ 7,5 = 366,67 kg/da olur. Küsuratlı alanlarda kafadan hesap yanıltıcı olabildiği için araç iki ondalık basamakla sonuç verir.',
    ] },
    { h: 'Alanı doğru belirlemek', p: [
      'Verim hesabındaki en büyük hata kaynağı alandır. Tapuda yazan yüzölçümü ile fiilen ekilen alan çoğu zaman aynı değildir: tarla kenarındaki yol, kanal, taşlık, ağaç altı ve ekilemeyen çukur kısımlar tapu alanına dâhildir ama ürün vermez. Verimi doğru görmek için fiilen ekilen alanı kullanın. Eski yöresel dönüm ölçüleriyle (bazı bölgelerde 1.000 metrekareden farklı kabul edilir) konuşuluyorsa alanı önce metrekare olarak belirleyip araçta metrekare birimini seçmek en güvenli yoldur.',
      'Ortakçılık ya da kiralık arazilerde parsel parsel hesap yapmak, hangi tarlanın kirasını çıkardığını görmek açısından da faydalıdır.',
    ] },
    { h: 'Verimi karşılaştırırken dikkat edilecekler', ul: [
      '<strong>Nem ve yabancı madde:</strong> Hububatta kantar ağırlığı nemli ve çöplü ürünü de içerir. Alım yerinde yapılan nem ve yabancı madde kesintisinden sonraki net ağırlıkla hesap yapmak daha gerçekçidir.',
      '<strong>Ürünün biçimi:</strong> Pamukta kütlü ile lif, mısırda koçan ile dane, ayçiçeğinde kabuklu ile iç ağırlığı farklıdır. Karşılaştırdığınız değerlerin aynı biçimde olduğundan emin olun.',
      '<strong>Hasat kaybı:</strong> Biçerdöver ayarı, geç hasat ve dane dökümü tarlada ürün bırakır; kantara giren miktar tarlanın gerçek üretiminden düşük olabilir.',
      '<strong>Sulu ve kuru koşullar:</strong> Aynı çeşidin sulu ve kuru tarımdaki verimi çok farklıdır; kıyaslamayı benzer koşullar arasında yapın.',
      '<strong>Yıllar arası fark:</strong> Tek bir yılın sonucu yağışa ve hava koşullarına bağlıdır; birkaç yılın ortalaması çeşit ve uygulama kararında daha sağlıklı bir ölçüdür.',
    ] },
    { h: 'Gelir satırı hakkında', p: [
      'Satış fiyatı girildiğinde gösterilen "Toplam gelir" ve "Dekara gelir" brüt değerlerdir; yani yalnızca ürün miktarının fiyatla çarpımıdır. Tohum, gübre, ilaç, mazot, sulama, işçilik, hasat, nakliye ve kira gibi masraflar ile kesintiler bu tutardan düşülmemiştir. Dekara kârı görmek için dekara masrafınızı bu değerden ayrıca çıkarmanız gerekir. Sonuçlar bilgilendirme amaçlıdır; yatırım ve finansman kararlarında kendi maliyet kayıtlarınızı ve bir mali danışmanın görüşünü esas alın.',
    ] },
  ],
  faq: [
    ['Dekara verim nasıl hesaplanır?', 'Toplam hasat miktarı kilogram olarak ekili alanın dekar değerine bölünür. 10 dekardan 4.500 kg ürün alındıysa verim 450 kg/da\'dır.'],
    ['Dekara 500 kg, hektara kaç ton eder?', 'Dekara verimi 100\'e bölerek hektara ton değerini bulursunuz: 500 kg/da, 5 ton/ha eder. Tersine ton/ha değerini 100 ile çarparsanız kg/da elde edersiniz.'],
    ['Dönüm ile dekar aynı şey mi?', 'Bugünkü resmî kullanımda evet; ikisi de 1.000 metrekaredir. Yöresel eski dönüm ölçüleri farklı olabildiğinden emin değilseniz alanı metrekare olarak girin.'],
    ['Hektar kaç dekardır?', '1 hektar 10 dekar, yani 10.000 metrekaredir. Araçta alan birimini hektar seçerseniz dönüşüm kendiliğinden yapılır.'],
    ['Birden fazla tarlanın ortalama verimini nasıl bulurum?', 'Tarlaların verimlerini toplayıp tarla sayısına bölmek yanlış sonuç verir. Bunun yerine tüm tarlaların toplam hasadını ve toplam alanını araca girin; çıkan değer alan ağırlıklı gerçek ortalamadır.'],
    ['Balya ya da kasa sayısıyla hesap yapabilir miyim?', 'Evet, önce toplam ağırlığa çevirmeniz yeterli. Ortalama balya ya da kasa ağırlığını adetle çarpıp sonucu kilogram olarak girin; birkaç balyayı tartarak ortalamayı belirlemek doğruluğu artırır.'],
    ['Gelir hesabında masraflar düşülüyor mu?', 'Hayır. Gösterilen tutar hasat miktarı ile satış fiyatının çarpımı olan brüt gelirdir. Net kazanç için üretim masraflarınızı ayrıca çıkarmalısınız.'],
    ['Yazdığım hasat ve fiyat bilgileri saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['gubre-miktari-hesapla', 'tohum-miktari-hesapla', 'fidan-sayisi-hesapla', 'hektar-donum-cevir', 'donum-metrekare-cevir'],
};
