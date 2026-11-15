export default {
  slug: 'aydinlatma-lumen-hesapla',
  title: 'Aydınlatma İhtiyacı (Lümen) Hesaplama',
  h1Tail: 'oda için kaç lümen gerekir?',
  pageTitle: 'Aydınlatma Hesaplama – Odaya Kaç Lümen ve Kaç Ampul Gerekir?',
  description: 'Oda alanına ve kullanım amacına göre gereken toplam lümeni, ampul sayısını ve yaklaşık LED gücünü hesaplayın. Lüks değerini kendiniz de girebilirsiniz.',
  card: 'Odanın metrekaresine ve kullanım amacına göre gereken lümeni, ampul sayısını ve yaklaşık LED watt değerini bulun.',
  category: 'elektrik',
  keywords: ['lümen hesaplama', 'aydınlatma hesabı', 'odaya kaç lümen gerekir', 'kaç ampul gerekir', 'lüks lümen hesaplama', 'metrekareye kaç watt led', 'salon aydınlatma hesabı'],
  lead: 'Bir odayı yeterince aydınlatmak için gereken toplam ışık akısını <strong>lümen</strong> olarak hesaplayın. Araç, alanı hedef aydınlık düzeyiyle (lüks) çarpar; seçtiğiniz ampulden kaç adet gerektiğini ve yaklaşık LED gücünü de verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Oda alanı (m²)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'mekan', label: 'Mekân türü', type: 'select', options: [
      ['salon', 'Salon / oturma odası (150 lüks)'],
      ['yatak', 'Yatak odası (100 lüks)'],
      ['mutfak', 'Mutfak (300 lüks)'],
      ['banyo', 'Banyo (200 lüks)'],
      ['koridor', 'Koridor / antre (100 lüks)'],
      ['calisma', 'Çalışma odası / ofis (500 lüks)'],
      ['atolye', 'Atölye / ince iş (750 lüks)'],
    ] },
    { id: 'ozelLux', label: 'Özel aydınlık düzeyi (lüks)', type: 'number', placeholder: 'Boş = mekân türüne göre', hint: 'Doldurursanız mekân türü yerine bu değer kullanılır.' },
    { id: 'ampul', label: 'Bir ampulün ışık akısı (lm)', type: 'number', value: '800', hint: 'Ampul kutusunda "lm" olarak yazar.' },
    { id: 'verim', label: 'Işık verimi (lm/W)', type: 'number', value: '100', hint: 'Güncel LED ampullerde çoğunlukla 80–130 lm/W arasındadır.' },
  ],
  compute(v, h) {
    const tablo = { salon: 150, yatak: 100, mutfak: 300, banyo: 200, koridor: 100, calisma: 500, atolye: 750 };
    const alan = h.pos(v.alan, 'Oda alanı');
    const ozel = String(v.ozelLux ?? '').trim() !== '';
    const lux = ozel ? h.pos(v.ozelLux, 'Özel aydınlık düzeyi') : (tablo[v.mekan] ?? 150);
    const ampul = h.opt(v.ampul, 800, 'Bir ampulün ışık akısı');
    if (!(ampul > 0)) h.err('"Bir ampulün ışık akısı" sıfırdan büyük olmalı.');
    const verim = h.opt(v.verim, 100, 'Işık verimi');
    if (!(verim > 0)) h.err('"Işık verimi" sıfırdan büyük olmalı.');
    const lm = alan * lux;
    const adet = Math.max(1, Math.ceil(lm / ampul - 1e-9));
    return {
      rows: [
        ['Gerekli ışık akısı', h.fmt(lm, 0) + ' lm'],
        ['Hedef aydınlık düzeyi', h.fmt(lux, 0) + ' lüks'],
        ['Ampul sayısı', adet + ' adet'],
        ['Yaklaşık LED gücü', h.fmt(lm / verim, 1) + ' W'],
        ['Seçilen ampullerle toplam', h.fmt(adet * ampul, 0) + ' lm'],
      ],
      note: 'Hesap, ışığın tamamının kullanım yüzeyine ulaştığını varsayar. Koyu duvar, yüksek tavan, abajur ve gömme armatür kayıpları için sonuca %20–30 pay eklemek yerinde olur.',
    };
  },
  cases: [
    { in: { alan: '20', mekan: 'salon' }, out: { 'Gerekli ışık akısı': '3.000 lm', 'Ampul sayısı': '4 adet', 'Yaklaşık LED gücü': '30 W' } },
    { in: { alan: '12', mekan: 'mutfak' }, out: { 'Gerekli ışık akısı': '3.600 lm', 'Ampul sayısı': '5 adet', 'Yaklaşık LED gücü': '36 W', 'Seçilen ampullerle toplam': '4.000 lm' } },
    { in: { alan: '10', mekan: 'calisma', ampul: '1000', verim: '125' }, out: { 'Gerekli ışık akısı': '5.000 lm', 'Ampul sayısı': '5 adet', 'Yaklaşık LED gücü': '40 W' } },
    { in: { alan: '8', mekan: 'salon', ozelLux: '250' }, out: { 'Gerekli ışık akısı': '2.000 lm', 'Hedef aydınlık düzeyi': '250 lüks', 'Ampul sayısı': '3 adet' } },
    { in: { alan: '6', mekan: 'koridor' }, out: { 'Gerekli ışık akısı': '600 lm', 'Ampul sayısı': '1 adet', 'Yaklaşık LED gücü': '6 W' } },
    { in: { alan: '5', mekan: 'banyo' }, out: { 'Gerekli ışık akısı': '1.000 lm', 'Ampul sayısı': '2 adet' } },
    { in: { alan: '0', mekan: 'salon' }, error: true },
    { in: { alan: '20', mekan: 'salon', ampul: '0' }, error: true },
  ],
  howto: [
    'Odanın taban alanını metrekare olarak yazın. Dikdörtgen bir odada en ile boyu çarpmanız yeterlidir; 4 m × 5 m bir salon 20 m² eder.',
    'Mekân türünü seçin. Her seçeneğin yanında hesapta kullanılan hedef aydınlık düzeyi lüks olarak yazılıdır.',
    'Farklı bir aydınlık düzeyi istiyorsanız "Özel aydınlık düzeyi" alanına kendi lüks değerinizi girin; bu alan doluysa mekân türü dikkate alınmaz.',
    'Almayı düşündüğünüz ampulün kutusundaki lümen değerini ve biliyorsanız ışık verimini yazın; bilmiyorsanız varsayılan 800 lm ve 100 lm/W değerlerini bırakın.',
    '"Hesapla" düğmesine basın. Toplam lümen, ampul sayısı ve yaklaşık LED gücü sonuç kutusunda görünür.',
  ],
  sections: [
    { h: 'Lümen, lüks ve watt arasındaki fark', p: [
      'Aydınlatma alışverişinde en sık karıştırılan üç kavram lümen, lüks ve watt\'tır. <strong>Lümen (lm)</strong> bir ışık kaynağının her yöne yaydığı toplam ışık miktarını, yani ışık akısını anlatır. <strong>Lüks (lx)</strong> ise bu ışığın bir yüzeye ne yoğunlukta düştüğünü gösterir; bir metrekareye düşen bir lümen, bir lükstür. <strong>Watt (W)</strong> ışığı değil, ampulün şebekeden çektiği elektrik gücünü ölçer.',
      'Akkor ampul döneminde herkes "60 watt\'lık ampul" diye konuşurdu, çünkü teknoloji tekti ve watt ile parlaklık birlikte artardı. LED\'lerde aynı parlaklık çok daha düşük güçle elde edildiği için watt artık parlaklık ölçüsü değildir. Bu yüzden ampul seçerken kutudaki lümen değerine bakmak gerekir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Temel bağıntı çok yalındır: <strong>gerekli lümen = alan (m²) × hedef aydınlık düzeyi (lüks)</strong>. Ampul sayısı, bu toplamın tek bir ampulün lümen değerine bölünüp yukarı yuvarlanmasıyla bulunur. Yaklaşık elektrik gücü ise toplam lümenin ışık verimine (lm/W) bölümüdür.',
      'Çözümlü örnek: 20 m² bir salon için hedef 150 lüks alınırsa 20 × 150 = 3.000 lümen gerekir. 800 lümenlik ampullerden 3.000 ÷ 800 = 3,75, yani yukarı yuvarlanarak 4 adet takılmalıdır; bu dört ampul toplam 3.200 lümen verir. Işık verimi 100 lm/W kabul edilirse 3.000 ÷ 100 = 30 W civarında bir LED gücü yeterli olur.',
      'İkinci örnek: 12 m² bir mutfakta tezgâh üstünde rahat çalışmak için 300 lüks hedeflenirse 12 × 300 = 3.600 lümen çıkar. 800 lümenlik ampulden 5 adet gerekir ve toplam 4.000 lümene ulaşılır.',
    ] },
    { h: 'Mekâna göre yaygın aydınlık düzeyleri', p: [
      'Aşağıdaki değerler konutlarda ve küçük iş yerlerinde yaygın olarak kullanılan yaklaşık hedeflerdir; araçtaki seçenekler bu değerlere göre hazırlanmıştır. İş yerleri için bağlayıcı değerler ilgili aydınlatma standartlarında ve iş sağlığı mevzuatında tanımlanır; profesyonel projelerde güncel standardı esas alın.',
    ], ul: [
      '<strong>Koridor, antre, yatak odası genel aydınlatma:</strong> yaklaşık 100 lüks',
      '<strong>Salon ve oturma odası:</strong> yaklaşık 150 lüks',
      '<strong>Banyo:</strong> yaklaşık 200 lüks (ayna önünde daha fazlası istenir)',
      '<strong>Mutfak:</strong> yaklaşık 300 lüks',
      '<strong>Çalışma masası, ofis, ders çalışma alanı:</strong> yaklaşık 500 lüks',
      '<strong>İnce işçilik, atölye, çizim:</strong> 750 lüks ve üzeri',
    ] },
    { h: 'Sonucu neler değiştirir?', p: [
      'Bu sayfadaki hesap bir ön tahmindir ve ışığın tamamının zemine ya da çalışma yüzeyine ulaştığını varsayar. Gerçekte ışığın bir bölümü tavan, duvar ve armatürün kendisi tarafından yutulur. Açık renk boyalı, alçak tavanlı bir odada kayıp azdır; koyu renk duvarlar, ahşap kaplama, yüksek tavan ve kalın abajurlar kaybı belirgin biçimde artırır.',
      'Aydınlatma tasarımında bu etkiler "kullanım faktörü" ve "bakım faktörü" adıyla hesaba katılır. Pratikte, bulunan lümen değerine %20–30 pay eklemek çoğu ev için yeterlidir. Spot ve gömme armatürlerde ışık dar bir açıyla yayıldığından, toplam lümen yeterli olsa bile aralarda karanlık bölgeler kalabilir; bu yüzden az sayıda güçlü kaynak yerine daha çok sayıda ve iyi dağıtılmış kaynak tercih edilir.',
    ] },
    { h: 'Ampul seçerken dikkat edilecekler', ul: [
      '<strong>Renk sıcaklığı:</strong> 2700–3000 K sıcak beyaz oturma ve yatak odalarına, 4000 K doğal beyaz mutfak ve çalışma alanlarına, 6500 K soğuk beyaz ise depo ve atölye gibi yerlere uygundur.',
      '<strong>Renksel geriverim (CRI):</strong> Renklerin doğal görünmesi için 80 ve üzeri, makyaj aynası ve mutfak gibi yerlerde 90 ve üzeri tercih edilir.',
      '<strong>Işık açısı:</strong> Dar açılı spotlar vurgu için, geniş açılı ampuller genel aydınlatma için kullanılır.',
      '<strong>Kısılabilirlik:</strong> Dimmer kullanacaksanız kutuda "dim edilebilir" ibaresi olmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, eski alışkanlıkla watt değerine göre ampul almaktır; 9 W\'lık iki farklı LED ampulün lümen değerleri birbirinden çok farklı olabilir. İkinci hata, tek bir tavan armatürüyle bütün odayı aydınlatmaya çalışmaktır: toplam lümen tutsa bile köşeler loş, armatürün altı aşırı parlak kalır. Üçüncü hata ise yaşla birlikte artan ışık ihtiyacını göz ardı etmektir; ileri yaştaki kullanıcılar için hedef değerleri bir kademe yükseltmek okuma ve mutfak işlerinde rahatlık sağlar.',
      'Sonuçlar bilgilendirme amaçlıdır. İş yeri, mağaza, okul gibi mekânlarda ve elektrik tesisatı değişikliği gerektiren işlerde aydınlatma projesi için yetkili bir elektrik mühendisine ya da aydınlatma uzmanına danışın.',
    ] },
  ],
  faq: [
    ['20 metrekare salon için kaç lümen gerekir?', 'Genel aydınlatma için yaklaşık 150 lüks hedeflenirse 20 × 150 = 3.000 lümen gerekir. Kayıplar için pay bırakmak isterseniz 3.600–4.000 lümen aralığını hedefleyebilirsiniz; bu da 800 lümenlik 4–5 ampule karşılık gelir.'],
    ['Lümen ile lüks arasındaki fark nedir?', 'Lümen kaynağın verdiği toplam ışık miktarıdır; lüks ise bu ışığın yüzeye düşen yoğunluğudur. 1 lüks, 1 metrekareye düşen 1 lümendir. Aynı ampul küçük odada yüksek, büyük odada düşük lüks değeri oluşturur.'],
    ['800 lümen kaç watt eder?', 'Teknolojiye göre değişir. Işık verimi 100 lm/W olan bir LED ampulde 800 lümen yaklaşık 8 W çeker. Aynı ışığı veren eski tip akkor ampul yaklaşık 60 W güç harcardı.'],
    ['Metrekare başına kaç watt LED gerekir?', 'Sabit bir değer yoktur, çünkü watt parlaklığı göstermez. Yine de 100 lm/W verimli LED\'lerle salon için metrekareye yaklaşık 1,5 W, mutfak için 3 W, çalışma alanı için 5 W civarı bir güç ortaya çıkar.'],
    ['Araç ampul sayısını neden yukarı yuvarlıyor?', 'Yarım ampul takılamadığı ve hedefin altında kalmak istenmediği için sonuç her zaman bir üst tam sayıya yuvarlanır. "Seçilen ampullerle toplam" satırı, yuvarlama sonrası elde edeceğiniz gerçek lümeni gösterir.'],
    ['Özel lüks alanına ne zaman değer yazmalıyım?', 'Listedeki mekân türleri ihtiyacınızı karşılamıyorsa ya da elinizde bir projeden, standarttan veya lüksmetre ölçümünden gelen belirli bir hedef varsa bu alanı kullanın. Alan doluysa mekân türü seçimi hesaba katılmaz.'],
    ['Tavan yüksekliği hesabı etkiler mi?', 'Bu basit yöntemde tavan yüksekliği yer almaz. Ancak tavan yükseldikçe ışık daha geniş alana yayılır ve yüzeydeki lüks düşer. 3 metreden yüksek tavanlarda sonuca ek pay koymak ya da sarkıt armatür kullanmak iyi bir çözümdür.'],
    ['Girdiğim oda bilgileri kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler herhangi bir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['led-tasarruf-hesapla', 'cihaz-elektrik-maliyeti-hesapla', 'serit-led-guc-kaynagi-hesapla', 'elektrik-gucu-hesapla', 'isik-siddeti-mesafe-hesapla'],
};
