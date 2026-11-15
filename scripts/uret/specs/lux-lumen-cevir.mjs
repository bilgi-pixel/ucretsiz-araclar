export default {
  slug: 'lux-lumen-cevir',
  title: 'Lüks Lümen Çevirici',
  h1Tail: 'lx ↔ lm',
  pageTitle: 'Lüks Lümen Çevirici – Lümenden Lükse, Lüksten Lümene Hesaplama',
  description: 'Lümeni lükse, lüksü lümene aydınlatılan alana göre çevirin. 1 lüks = 1 lümen/m² bağıntısını kullanır; foot-candle karşılığını da gösterir.',
  card: 'Işık akısını (lümen) aydınlık düzeyine (lüks) ya da tersine, aydınlatılan alanı girerek çevirin.',
  category: 'birim',
  keywords: ['lüks lümen çevirme', 'lümen lüks hesaplama', 'lux lumen', '1 lüks kaç lümen', 'lümen kaç lüks', 'aydınlık düzeyi hesaplama', 'foot candle lüks'],
  lead: `Bir ışık kaynağının <strong>lümen</strong> değerini, ışığın yayıldığı alana göre <strong>lüks</strong> değerine ya da istenen lüks düzeyini gerekli lümene çevirin. Hesap, 1 lüks = 1 lümen/m² tanımına dayanır.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['lm', 'Lümen → Lüks'], ['lx', 'Lüks → Lümen']] },
    { id: 'alan', label: 'Aydınlatılan alan (m²)', type: 'number', placeholder: 'Örn. 10', hint: 'Işığın düştüğü yüzeyin alanı, metrekare olarak.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const alan = h.pos(v.alan, 'Aydınlatılan alan');
    const lm = v.yon === 'lx' ? x * alan : x;
    const lx = lm / alan;
    const a = ['Aydınlık düzeyi', h.fmt(lx, 2) + ' lx'];
    const b = ['Işık akısı', h.fmt(lm, 2) + ' lm'];
    return {
      rows: [
        v.yon === 'lx' ? b : a,
        v.yon === 'lx' ? a : b,
        ['Alan', h.fmt(alan, 4) + ' m²'],
        ['Foot-candle karşılığı', h.fmt(lx / 10.763910416709722, 2) + ' fc'],
      ],
      note: 'Işığın tamamının yüzeye eşit dağıldığı varsayılır; armatür, duvar ve tavan kayıpları hesaba katılmaz.',
    };
  },
  cases: [
    { in: { deger: '1000', yon: 'lm', alan: '10' }, out: { 'Aydınlık düzeyi': '100 lx', 'Işık akısı': '1.000 lm' } },
    { in: { deger: '500', yon: 'lx', alan: '20' }, out: { 'Işık akısı': '10.000 lm', 'Aydınlık düzeyi': '500 lx' } },
    { in: { deger: '800', yon: 'lm', alan: '4' }, out: { 'Aydınlık düzeyi': '200 lx', 'Foot-candle karşılığı': '18,58 fc' } },
    { in: { deger: '300', yon: 'lx', alan: '12' }, out: { 'Işık akısı': '3.600 lm' } },
    { in: { deger: '1600', yon: 'lm', alan: '1' }, out: { 'Aydınlık düzeyi': '1.600 lx' } },
    { in: { deger: '450', yon: 'lm', alan: '2,5' }, out: { 'Aydınlık düzeyi': '180 lx' } },
    { in: { deger: '1000', yon: 'lm', alan: '0' }, error: true },
    { in: { deger: '1000', yon: 'lm', alan: '' }, error: true },
    { in: { deger: '-5', yon: 'lx', alan: '10' }, error: true },
  ],
  howto: [
    `"Değer" alanına ampulün ya da armatürün lümen değerini veya hedeflediğiniz lüks düzeyini yazın.`,
    `"Çeviri yönü" listesinden lümenden lükse mi, lüksten lümene mi geçeceğinizi seçin.`,
    `"Aydınlatılan alan" kutusuna ışığın düştüğü yüzeyin metrekaresini girin; oda için en × boy çarpımını kullanabilirsiniz.`,
    `"Çevir" düğmesine basın. Sonuçta lüks ve lümen değerleri ile foot-candle karşılığı birlikte listelenir.`,
  ],
  sections: [
    { h: 'Lümen ve lüks aynı şeyi ölçmez', p: [
      `<strong>Lümen (lm)</strong>, bir ışık kaynağının her yöne yaydığı toplam görünür ışık miktarıdır; teknik adıyla ışık akısıdır. Ampul kutularının üzerinde yazan değer budur ve kaynağın kendisine ait bir özelliktir. <strong>Lüks (lx)</strong> ise bir yüzeyin birim alanına düşen ışık miktarını, yani aydınlık düzeyini anlatır. Masanızın üzerinin ne kadar aydınlık olduğunu lüks söyler, lümen söylemez.`,
      `Bu yüzden iki birim arasında sabit bir katsayı yoktur. Aynı 1.000 lümenlik ampul küçük bir kilerde yüksek, geniş bir salonda düşük lüks üretir. Aradaki bağ alandır: <strong>1 lüks, bir metrekareye düşen 1 lümendir</strong>. Çeviri yapabilmek için ışığın yayıldığı yüzeyin büyüklüğünü bilmek zorunludur; araç bu nedenle alan girdisi ister.`,
    ] },
    { h: 'Formül', p: [
      `Lümenden lükse: <strong>lüks = lümen ÷ alan (m²)</strong>. Lüksten lümene: <strong>lümen = lüks × alan (m²)</strong>. Alan metrekare olmalıdır; santimetrekare cinsinden bir yüzeyiniz varsa 10.000'e bölerek metrekareye çevirin.`,
      `Araç ayrıca Amerikan kaynaklarında kullanılan <strong>foot-candle (fc)</strong> değerini verir. Bir foot-candle, bir fit kareye düşen bir lümendir ve yaklaşık 10,764 lükse eşittir. Yurt dışı kataloglarındaki 50 fc gibi bir öneriyi yaklaşık 538 lüks olarak okuyabilirsiniz.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 1.000 lümenlik bir ampulün ışığı 10 m² bir yüzeye eşit dağılıyorsa aydınlık düzeyi 1.000 ÷ 10 = 100 lüks olur.`,
      `<strong>Örnek 2:</strong> 20 m² bir çalışma odasında 500 lüks hedefleniyor. Yüzeye ulaşması gereken ışık 500 × 20 = 10.000 lümendir. Armatür ve yansıma kayıpları yüzünden satın alınacak toplam lümenin bundan fazla olması gerekir.`,
      `<strong>Örnek 3:</strong> 800 lümenlik bir masa lambası 4 m² bir bölgeyi aydınlatıyorsa 200 lüks elde edilir; bu da 18,58 foot-candle demektir.`,
    ] },
    { h: 'Gerçek mekânlarda neden daha fazla lümen gerekir?', p: [
      `Buradaki hesap ideal durumu verir: kaynaktan çıkan ışığın tamamı hedef yüzeye, eşit biçimde düşer. Gerçekte ışığın bir kısmı armatürün içinde kalır, bir kısmı tavana ve duvarlara gider, koyu renkli yüzeylerde emilir. Aydınlatma tasarımında bu kayıplar <em>kullanım faktörü</em> ve <em>bakım faktörü</em> adı verilen katsayılarla hesaba katılır; zamanla tozlanma ve lambanın yaşlanması da ışığı azaltır.`,
      `Pratikte, bu araçla bulduğunuz lümen değeri alt sınırdır. Açık renkli, alçak tavanlı bir odada kayıp sınırlı kalırken yüksek tavanlı, koyu duvarlı bir mekânda ışığın önemli bölümü çalışma düzlemine ulaşmaz. İş yerleri için aydınlık düzeyi koşulları standart ve yönetmeliklerle belirlenir; bağlayıcı bir proje hazırlıyorsanız güncel mevzuatı kontrol edin ve bir aydınlatma uzmanına danışın.`,
    ] },
    { h: 'Tipik aydınlık düzeyleri', p: [
      `Aşağıdaki değerler kabaca fikir vermek içindir; ölçüm koşullarına göre geniş aralıkta değişir.`,
    ], ul: [
      `<strong>Dolunaylı açık gece:</strong> 1 lüksün altında`,
      `<strong>Sokak aydınlatması:</strong> yaklaşık 10–30 lüks`,
      `<strong>Ev içi oturma alanı:</strong> yaklaşık 100–300 lüks`,
      `<strong>Ofis masası, okuma:</strong> yaklaşık 300–500 lüks`,
      `<strong>Hassas montaj, çizim:</strong> 750 lüks ve üzeri`,
      `<strong>Kapalı havada gün ışığı:</strong> birkaç bin lüks`,
      `<strong>Doğrudan güneş ışığı:</strong> on binlerce lüks, açık yaz gününde 100.000 lüks dolayı`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Watt ile lümeni karıştırmak:</strong> Watt tüketilen elektrik gücüdür, ışık miktarı değildir. Aynı lümeni veren LED ampul, akkor ampulün çok küçük bir bölümü kadar güç çeker.`,
      `<strong>Alanı yanlış seçmek:</strong> Spot ya da projektör gibi yönlü kaynaklarda ışık tüm odaya değil dar bir bölgeye düşer. Bu durumda oda alanını değil, ışık konisinin yüzeyde oluşturduğu lekenin alanını kullanın.`,
      `<strong>Mesafeyi unutmak:</strong> Kaynak yüzeyden uzaklaştıkça ışık daha geniş alana yayılır ve lüks, mesafenin karesiyle ters orantılı olarak düşer. Lambayı iki kat uzağa taşımak aydınlık düzeyini dörtte bire indirir.`,
      `<strong>Lüksmetre okumasını lümen sanmak:</strong> Telefon uygulamaları ve lüksmetreler lüks ölçer; ampulün toplam lümenini doğrudan vermez.`,
    ] },
  ],
  faq: [
    ['1 lüks kaç lümendir?', 'Sabit bir karşılığı yoktur; alana bağlıdır. 1 lüks, 1 metrekareye düşen 1 lümendir. 5 metrekarelik bir yüzeyde 1 lüks elde etmek için 5 lümen, 20 metrekarede 20 lümen gerekir.'],
    ['1.000 lümen kaç lüks eder?', 'Işığın yayıldığı alana göre değişir: 1 metrekarede 1.000 lüks, 10 metrekarede 100 lüks, 25 metrekarede 40 lüks eder. Araçta alanı girerek kendi durumunuzu hesaplayabilirsiniz.'],
    ['Odam için kaç lümen gerekir?', 'Hedeflediğiniz lüks düzeyini oda alanıyla çarpın. 15 metrekarelik bir odada 200 lüks için yüzeye 3.000 lümen ulaşmalıdır. Armatür ve duvar kayıpları nedeniyle satın alınacak toplam lümeni bunun üzerinde tutmak gerekir.'],
    ['Foot-candle nedir?', 'Foot-candle, fit kareye düşen lümen sayısıdır ve ABD kaynaklarında lüks yerine kullanılır. 1 foot-candle yaklaşık 10,764 lükstür; kabaca 10 ile çarparak lükse geçebilirsiniz.'],
    ['Kandela ile lümen aynı mı?', 'Hayır. Kandela belirli bir yöndeki ışık şiddetidir; lümen tüm yönlere yayılan toplam ışıktır. Dar açılı bir spot düşük lümenle yüksek kandela verebilir. Bu araç kandela çevirisi yapmaz.'],
    ['Telefonla lüks ölçülebilir mi?', 'Telefonların ortam ışığı sensörü kaba bir lüks değeri verebilir, ancak kalibre edilmediği için sonuç cihazdan cihaza belirgin biçimde farklılaşır. Resmî ölçümlerde kalibrasyonlu lüksmetre kullanılır.'],
    ['Alanı santimetrekare olarak biliyorum, ne yapmalıyım?', 'Santimetrekare değerini 10.000\'e bölerek metrekareye çevirin. Örneğin 60 cm × 120 cm ölçüsündeki bir masa 7.200 cm², yani 0,72 m² eder.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz sayılar sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['aydinlatma-lumen-hesapla', 'elektrik-gucu-hesapla', 'kw-watt-cevir', 'birim-donustur'],
};
