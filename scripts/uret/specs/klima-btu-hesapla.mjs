export default {
  slug: 'klima-btu-hesapla',
  title: 'Klima BTU Hesaplama',
  h1Tail: 'oda için kaç BTU klima?',
  pageTitle: 'Klima BTU Hesaplama – Metrekareye Göre Kaç BTU Klima Gerekir?',
  description: 'Oda alanı, iklim, tavan yüksekliği, güneş durumu ve kişi sayısına göre gereken klima kapasitesini BTU/saat ve kW olarak hesaplayın; uygun kapasite sınıfını görün.',
  card: 'Odanın metrekaresine, iklime ve kişi sayısına göre gereken klima kapasitesini BTU ve kW olarak tahmin edin.',
  category: 'elektrik',
  keywords: ['klima btu hesaplama', 'kaç btu klima almalıyım', 'metrekareye göre klima', '20 metrekare kaç btu', 'btu hesabı', 'klima kapasite hesaplama', 'btu kw çevirme'],
  lead: 'Bir odayı serinletmek için gereken klima kapasitesini <strong>BTU/saat</strong> olarak tahmin edin. Araç; alanı, iklim katsayısını, tavan yüksekliğini, güneş alma durumunu ve odadaki kişi sayısını hesaba katar ve piyasadaki en yakın kapasite sınıfını önerir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Oda alanı (m²)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'iklim', label: 'İklim', type: 'select', options: [
      ['350', 'Ilıman (350 BTU/m²)'],
      ['300', 'Serin (300 BTU/m²)'],
      ['400', 'Sıcak (400 BTU/m²)'],
      ['450', 'Çok sıcak (450 BTU/m²)'],
    ] },
    { id: 'tavan', label: 'Tavan yüksekliği (m)', type: 'number', value: '2,7' },
    { id: 'gunes', label: 'Güneş durumu', type: 'select', options: [
      ['normal', 'Normal'],
      ['gunesli', 'Çok güneş alıyor (+%10)'],
      ['golge', 'Gölgede / kuzey cephe (−%10)'],
    ] },
    { id: 'kisi', label: 'Odadaki kişi sayısı', type: 'number', value: '2', hint: 'İki kişiden sonraki her kişi için 600 BTU eklenir.' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Oda alanı');
    const kats = { 300: 300, 350: 350, 400: 400, 450: 450 }[v.iklim] ?? 350;
    const tavan = h.opt(v.tavan, 2.7, 'Tavan yüksekliği');
    if (!(tavan > 0)) h.err('"Tavan yüksekliği" sıfırdan büyük olmalı.');
    if (tavan > 10) h.err('"Tavan yüksekliği" metre cinsinden olmalı (örn. 2,7).');
    const carpan = v.gunes === 'gunesli' ? 1.1 : v.gunes === 'golge' ? 0.9 : 1;
    const kisi = String(v.kisi ?? '').trim() === '' ? 2 : h.posint(v.kisi, 'Odadaki kişi sayısı');
    const ek = Math.max(0, kisi - 2) * 600;
    const btu = alan * kats * (tavan / 2.7) * carpan + ek;
    const siniflar = [9000, 12000, 18000, 24000, 36000, 48000];
    const sinif = siniflar.find((s) => s >= btu - 1e-6);
    return {
      rows: [
        ['Gerekli kapasite', h.fmt(btu, 0) + ' BTU/saat'],
        ['Önerilen kapasite sınıfı', sinif ? h.fmt(sinif, 0) + ' BTU' : '48.000 BTU üzeri (birden fazla cihaz ya da merkezi sistem)'],
        ['Soğutma gücü', h.fmt(btu * 0.00029307107, 2) + ' kW'],
        ['Kişi kaynaklı ek yük', h.fmt(ek, 0) + ' BTU/saat'],
      ],
      note: 'Bu bir ön tahmindir. Yalıtım, cam alanı, çatı katı, mutfak ve elektronik cihaz ısısı gibi etkenler gerçek ihtiyacı değiştirir; satın almadan önce yerinde keşif yaptırın.',
    };
  },
  cases: [
    { in: { alan: '20', iklim: '350', tavan: '2,7', gunes: 'normal', kisi: '2' }, out: { 'Gerekli kapasite': '7.000 BTU/saat', 'Önerilen kapasite sınıfı': '9.000 BTU', 'Soğutma gücü': '2,05 kW' } },
    { in: { alan: '25', iklim: '400', tavan: '2,7', gunes: 'gunesli', kisi: '4' }, out: { 'Gerekli kapasite': '12.200 BTU/saat', 'Önerilen kapasite sınıfı': '18.000 BTU', 'Soğutma gücü': '3,58 kW', 'Kişi kaynaklı ek yük': '1.200 BTU/saat' } },
    { in: { alan: '30', iklim: '450', tavan: '3', gunes: 'normal', kisi: '2' }, out: { 'Gerekli kapasite': '15.000 BTU/saat', 'Önerilen kapasite sınıfı': '18.000 BTU', 'Soğutma gücü': '4,4 kW' } },
    { in: { alan: '15', iklim: '300', tavan: '2,7', gunes: 'golge', kisi: '1' }, out: { 'Gerekli kapasite': '4.050 BTU/saat', 'Önerilen kapasite sınıfı': '9.000 BTU', 'Soğutma gücü': '1,19 kW' } },
    { in: { alan: '40', iklim: '350', tavan: '2,7', gunes: 'normal', kisi: '5' }, out: { 'Gerekli kapasite': '15.800 BTU/saat', 'Önerilen kapasite sınıfı': '18.000 BTU', 'Soğutma gücü': '4,63 kW' } },
    { in: { alan: '60', iklim: '400', tavan: '2,7', gunes: 'normal', kisi: '2' }, out: { 'Gerekli kapasite': '24.000 BTU/saat', 'Önerilen kapasite sınıfı': '24.000 BTU', 'Soğutma gücü': '7,03 kW' } },
    { in: { alan: '-10', iklim: '350' }, error: true },
    { in: { alan: '20', iklim: '350', kisi: '2,5' }, error: true },
  ],
  howto: [
    'Klimanın takılacağı odanın taban alanını metrekare olarak yazın. Açık mutfaklı salonlarda iki bölümün toplam alanını kullanın.',
    'Bulunduğunuz yerin yaz koşullarına en yakın iklim seçeneğini işaretleyin; her seçeneğin metrekare başına BTU katsayısı yanında yazar.',
    'Tavan yüksekliğini metre olarak girin. Standart 2,7 m dışındaki yükseklikler hesaba orantılı olarak yansıtılır.',
    'Odanın güneş alma durumunu ve genellikle aynı anda bulunan kişi sayısını belirtin.',
    '"Hesapla" düğmesine basın; gereken BTU/saat değeri, önerilen kapasite sınıfı ve kW karşılığı görüntülenir.',
  ],
  sections: [
    { h: 'BTU nedir?', p: [
      'BTU, "British Thermal Unit" ifadesinin kısaltmasıdır ve bir ısı enerjisi birimidir. Klimalarda kullanılan değer aslında <strong>BTU/saat</strong>, yani cihazın bir saatte ortamdan çekebildiği ısı miktarıdır; gündelik dilde "saat" kısmı söylenmez. 1 BTU/saat yaklaşık 0,293 watt\'a eşittir. Buna göre 12.000 BTU\'luk bir klimanın soğutma gücü yaklaşık 3,52 kW\'tır.',
      'Buradaki kW değeri klimanın şebekeden çektiği elektrik gücü değil, taşıdığı ısı gücüdür. Klimalar ısıyı üretmek yerine bir yerden başka bir yere taşıdığı için, tükettikleri elektrik soğutma gücünün birkaç katı daha azdır. Bu oran enerji etiketindeki verim değerleriyle (SEER, SCOP) ifade edilir.',
    ] },
    { h: 'Hesap yöntemi', p: [
      'Araç, yaygın kullanılan metrekare katsayısı yaklaşımını uygular: <strong>BTU/saat = alan × iklim katsayısı × (tavan yüksekliği ÷ 2,7) × güneş çarpanı + kişi eki</strong>. İklim katsayısı serin bölgeler için 300, ılıman için 350, sıcak için 400, çok sıcak için 450 BTU/m² alınır. Güneş çarpanı yoğun güneş alan odalarda 1,10, gölgede kalan odalarda 0,90\'dır. Odada iki kişiden fazla insan bulunuyorsa, fazladan her kişi için 600 BTU/saat eklenir; çünkü insan vücudu da ortama sürekli ısı verir.',
      'Bu katsayılar kesin mühendislik değerleri değil, pratikte kullanılan yaklaşık kabullerdir. Amaç, mağazaya gitmeden önce hangi kapasite sınıfına bakmanız gerektiğini göstermektir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Ilıman bir şehirde 20 m², 2,7 m tavanlı, normal güneş alan ve iki kişinin kullandığı bir yatak odası: 20 × 350 × 1 × 1 + 0 = 7.000 BTU/saat. En yakın üst sınıf 9.000 BTU\'dur ve soğutma gücü karşılığı yaklaşık 2,05 kW eder.',
      'Sıcak bir bölgede 25 m², batıya bakan ve dört kişilik bir salon: 25 × 400 = 10.000; güneş çarpanıyla 11.000; iki fazla kişi için 1.200 eklenince 12.200 BTU/saat. Bu değer 12.000\'in biraz üzerinde kaldığı için araç 18.000 BTU sınıfını önerir. Böyle sınır durumlarında perde, yalıtım ve kullanım alışkanlığınıza göre bir alt sınıf da yeterli olabilir; karar için keşif önemlidir.',
    ] },
    { h: 'Yaygın kapasite sınıfları', p: [
      'Duvar tipi ve salon tipi klimalar piyasada belirli kapasite basamaklarında satılır. Araç, bulduğu değeri bu basamaklardan ihtiyacı karşılayan en küçüğüne yuvarlar.',
    ], ul: [
      '<strong>9.000 BTU</strong> (yaklaşık 2,6 kW): küçük yatak odaları ve çalışma odaları',
      '<strong>12.000 BTU</strong> (yaklaşık 3,5 kW): orta büyüklükte odalar',
      '<strong>18.000 BTU</strong> (yaklaşık 5,3 kW): salonlar',
      '<strong>24.000 BTU</strong> (yaklaşık 7,0 kW): büyük salonlar, küçük iş yerleri',
      '<strong>36.000 – 48.000 BTU</strong>: salon tipi cihazlar, mağaza ve ofisler',
    ] },
    { h: 'Küçük ya da büyük klima almanın sakıncaları', p: [
      'Kapasitesi yetersiz klima, en sıcak günlerde odayı istenen sıcaklığa indiremez ve kompresör neredeyse hiç durmadan çalışır; bu hem konforu hem cihaz ömrünü olumsuz etkiler. Gereğinden büyük klima ise odayı çok hızlı soğutup durur; sık sık devreye girip çıkar, nemi yeterince alamaz ve ortam serin ama rutubetli hissedilir. İnverter cihazlar kapasitelerini ayarlayabildiği için bu sorunu hafifletir, yine de ihtiyaca yakın sınıfı seçmek en doğrusudur.',
    ] },
    { h: 'Hesaba girmeyen etkenler', ul: [
      '<strong>Yalıtım ve cam:</strong> Mantolamasız bina, tek cam ve geniş cam yüzeyler ısı kazancını belirgin biçimde artırır.',
      '<strong>Çatı katı:</strong> Üstü doğrudan çatı olan daireler yaz aylarında çok daha fazla ısınır.',
      '<strong>Isı kaynakları:</strong> Açık mutfaktaki ocak ve fırın, bilgisayarlar, televizyon ve aydınlatma ek yük getirir.',
      '<strong>Açık kapılar:</strong> Klima yalnızca kapalı hacmi soğutur; koridora açık kapı, alanı fiilen büyütür.',
      '<strong>Isıtma amaçlı kullanım:</strong> Kışın klimayla ısınacaksanız ısıtma kapasitesi ve düşük dış sıcaklıktaki performans ayrıca değerlendirilmelidir.',
    ] },
    { h: 'Uyarı', p: [
      'Bu sayfa bilgilendirme amaçlı bir ön hesap sunar; ısı yükü hesabı ya da mühendislik projesi yerine geçmez. Özellikle iş yerleri, sunucu odaları, çok cepheli ya da çatı katı mekânlar için yetkili bir servis ya da makine mühendisinden keşif isteyin. Cihazın montajı ve elektrik bağlantısı mutlaka yetkili kişilerce yapılmalıdır.',
    ] },
  ],
  faq: [
    ['20 metrekare oda için kaç BTU klima gerekir?', 'Ilıman iklimde, standart tavan yüksekliğinde ve iki kişilik kullanımda 20 × 350 = 7.000 BTU/saat çıkar; 9.000 BTU\'luk bir klima yeterlidir. Sıcak bölgede ve güneş alan odada ihtiyaç 8.800 BTU\'ya yükselir, yine 9.000 sınıfı sınırda karşılar.'],
    ['12.000 BTU kaç metrekareyi soğutur?', 'Katsayıya göre değişir: ılıman iklimde 12.000 ÷ 350 ≈ 34 m², sıcak iklimde 12.000 ÷ 400 = 30 m², çok sıcak iklimde yaklaşık 27 m². Güneş, kişi sayısı ve tavan yüksekliği bu alanı azaltır.'],
    ['BTU ile kW arasında nasıl dönüşüm yapılır?', '1 BTU/saat yaklaşık 0,293 W\'tır; BTU/saat değerini 3.412\'ye bölerek kW bulunur. 9.000 BTU yaklaşık 2,64 kW, 18.000 BTU yaklaşık 5,28 kW, 24.000 BTU yaklaşık 7,03 kW eder.'],
    ['Hangi iklim seçeneğini seçmeliyim?', 'Yaz aylarında gündüz sıcaklığının çoğunlukla 30 °C\'nin altında kaldığı yerler için serin, 30–35 °C için ılıman, 35–40 °C için sıcak, 40 °C ve üzerini sık gören yerler için çok sıcak seçeneği uygun bir başlangıçtır.'],
    ['Kişi sayısı neden hesaba katılıyor?', 'Oturan bir yetişkin ortama sürekli ısı ve nem verir. Kalabalık oturma odalarında, toplantı odalarında ya da bekleme salonlarında bu yük göz ardı edilirse klima yetersiz kalır. Araç iki kişiden sonraki her kişi için 600 BTU/saat ekler.'],
    ['Klimanın elektrik tüketimini bu sonuçtan bulabilir miyim?', 'Doğrudan hayır. Soğutma gücü, elektrik tüketimi değildir. Yaklaşık tüketim için soğutma gücünü cihazın verim katsayısına bölmek gerekir; kesin değer için enerji etiketindeki yıllık tüketim bilgisine bakın.'],
    ['Sonuç iki sınıfın arasında kalırsa ne yapmalıyım?', 'Araç her zaman üst sınıfı önerir. Değer alt sınıfı çok az aşıyorsa, iyi yalıtımlı ve perdeli bir odada inverter bir alt sınıf cihaz da iş görebilir; kararı keşif yapan yetkili servisle birlikte verin.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; oda bilgileriniz hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kombi-kapasite-hesapla', 'cihaz-elektrik-maliyeti-hesapla', 'oda-hacmi-hesapla', 'isi-kaybi-hesapla', 'kw-watt-cevir'],
};
