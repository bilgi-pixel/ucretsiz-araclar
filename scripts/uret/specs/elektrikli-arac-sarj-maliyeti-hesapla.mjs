export default {
  slug: 'elektrikli-arac-sarj-maliyeti-hesapla',
  title: 'Elektrikli Araç Şarj Maliyeti Hesaplama',
  h1Tail: 'kWh fiyatına göre',
  pageTitle: 'Elektrikli Araç Şarj Maliyeti Hesaplama – 100 km Kaç TL Tutar?',
  description: 'Batarya kapasitesi, şarj aralığı ve kWh birim fiyatına göre elektrikli aracın şarj maliyetini, çekilen enerjiyi, kazanılan menzili ve 100 km maliyetini hesaplayın.',
  card: 'Batarya kapasitesi ve kWh fiyatını girin; şarjın kaç TL tutacağını, kazanılan menzili ve 100 km maliyetini görün.',
  category: 'elektrik',
  keywords: ['elektrikli araç şarj maliyeti', 'şarj ücreti hesaplama', 'elektrikli araba 100 km maliyeti', 'kWh şarj fiyatı', 'evde şarj maliyeti', 'şarj istasyonu ücreti hesaplama', 'elektrikli araç km maliyeti'],
  lead: 'Elektrikli aracınızı belirli bir yüzdeden hedef yüzdeye şarj etmenin kaç liraya mal olacağını hesaplayın. Araç, şarj kayıplarını da hesaba katarak şebekeden çekilen enerjiyi, kazanılan menzili ve <strong>100 km başına maliyeti</strong> verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Batarya kapasitesi (kWh)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'baslangic', label: 'Başlangıç şarj düzeyi (%)', type: 'number', value: '20' },
    { id: 'hedef', label: 'Hedef şarj düzeyi (%)', type: 'number', value: '80' },
    { id: 'fiyat', label: 'Birim fiyat (TL/kWh)', type: 'number', placeholder: 'Örn. 9', hint: 'Faturanızdaki ya da istasyondaki güncel kWh fiyatını yazın; binlik ayraç kullanmayın.' },
    { id: 'kayip', label: 'Şarj kaybı (%)', type: 'number', value: '10', hint: 'Şebekeden çekilip bataryaya ulaşmayan enerji payı.' },
    { id: 'tuketim', label: 'Ortalama tüketim (kWh/100 km)', type: 'number', value: '17' },
  ],
  compute(v, h) {
    const kap = h.pos(v.kapasite, 'Batarya kapasitesi');
    const bas = h.nonneg(v.baslangic, 'Başlangıç şarj düzeyi');
    const hedef = h.pos(v.hedef, 'Hedef şarj düzeyi');
    if (hedef > 100) h.err('"Hedef şarj düzeyi" en fazla 100 olabilir.');
    if (bas >= hedef) h.err('Hedef şarj düzeyi, başlangıç düzeyinden büyük olmalı.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const kayip = h.opt(v.kayip, 10, 'Şarj kaybı');
    if (kayip < 0 || kayip >= 100) h.err('"Şarj kaybı" 0 ile 100 arasında olmalı (100 hariç).');
    const tuk = h.opt(v.tuketim, 17, 'Ortalama tüketim');
    if (!(tuk > 0)) h.err('"Ortalama tüketim" sıfırdan büyük olmalı.');
    const batarya = kap * (hedef - bas) / 100;
    const sebeke = batarya / (1 - kayip / 100);
    const maliyet = sebeke * fiyat;
    const menzil = batarya / tuk * 100;
    return {
      rows: [
        ['Şarj maliyeti', h.para(maliyet)],
        ['Bataryaya eklenen enerji', h.fmt(batarya, 2) + ' kWh'],
        ['Şebekeden çekilen enerji', h.fmt(sebeke, 2) + ' kWh'],
        ['Kazanılan menzil', h.fmt(menzil, 0) + ' km'],
        ['100 km maliyeti', h.para(maliyet / menzil * 100)],
        ['Kilometre başına maliyet', h.para(maliyet / menzil)],
      ],
      note: 'Menzil, girdiğiniz ortalama tüketime göre tahmindir; hız, sıcaklık, klima kullanımı ve yol eğimi gerçek değeri değiştirir.',
    };
  },
  cases: [
    { in: { kapasite: '60', baslangic: '20', hedef: '80', fiyat: '9', kayip: '10', tuketim: '18' }, out: { 'Şarj maliyeti': '360,00 TL', 'Bataryaya eklenen enerji': '36 kWh', 'Şebekeden çekilen enerji': '40 kWh', 'Kazanılan menzil': '200 km', '100 km maliyeti': '180,00 TL' } },
    { in: { kapasite: '75', baslangic: '10', hedef: '100', fiyat: '4', kayip: '0', tuketim: '15' }, out: { 'Şarj maliyeti': '270,00 TL', 'Bataryaya eklenen enerji': '67,5 kWh', 'Kazanılan menzil': '450 km', '100 km maliyeti': '60,00 TL', 'Kilometre başına maliyet': '0,60 TL' } },
    { in: { kapasite: '50', baslangic: '0', hedef: '100', fiyat: '2,5', kayip: '20', tuketim: '20' }, out: { 'Şarj maliyeti': '156,25 TL', 'Şebekeden çekilen enerji': '62,5 kWh', 'Kazanılan menzil': '250 km', '100 km maliyeti': '62,50 TL' } },
    { in: { kapasite: '40', baslangic: '50', hedef: '80', fiyat: '10', kayip: '10', tuketim: '16' }, out: { 'Şarj maliyeti': '133,33 TL', 'Bataryaya eklenen enerji': '12 kWh', 'Şebekeden çekilen enerji': '13,33 kWh', 'Kazanılan menzil': '75 km', '100 km maliyeti': '177,78 TL' } },
    { in: { kapasite: '77', baslangic: '20', hedef: '80', fiyat: '8', kayip: '12' }, out: { 'Şarj maliyeti': '420,00 TL', 'Bataryaya eklenen enerji': '46,2 kWh', 'Şebekeden çekilen enerji': '52,5 kWh', 'Kazanılan menzil': '272 km', '100 km maliyeti': '154,55 TL' } },
    { in: { kapasite: '60', baslangic: '80', hedef: '20', fiyat: '9' }, error: true },
    { in: { kapasite: '60', baslangic: '20', hedef: '80', fiyat: '9', kayip: '100' }, error: true },
    { in: { kapasite: '', baslangic: '20', hedef: '80', fiyat: '9' }, error: true },
  ],
  howto: [
    'Aracınızın kullanılabilir (net) batarya kapasitesini kWh olarak yazın. Bu değer kullanım kılavuzunda ve teknik özellik tablosunda yer alır.',
    'Şarja başladığınız ve şarjı bitirmek istediğiniz yüzdeleri girin. Günlük kullanımda yaygın aralık %20 → %80\'dir.',
    'Şarj edeceğiniz yerin kWh birim fiyatını yazın: evde elektrik faturanızdaki vergiler dâhil birim bedel, istasyonda uygulamada görünen tarife.',
    'Şarj kaybı ve ortalama tüketim alanlarını biliyorsanız düzeltin; bilmiyorsanız varsayılan %10 ve 17 kWh/100 km değerlerini kullanın.',
    '"Hesapla" düğmesine basın; şarj maliyeti, çekilen enerji, menzil ve 100 km maliyeti listelenir.',
  ],
  sections: [
    { h: 'Şarj maliyeti nasıl hesaplanır?', p: [
      'Hesabın çekirdeği üç adımdır. Önce bataryaya eklenecek enerji bulunur: <strong>eklenen enerji = kapasite × (hedef % − başlangıç %) ÷ 100</strong>. Ardından şarj sırasındaki kayıplar eklenerek şebekeden çekilen enerji hesaplanır: <strong>çekilen enerji = eklenen enerji ÷ (1 − kayıp oranı)</strong>. Son olarak bu değer birim fiyatla çarpılır: <strong>maliyet = çekilen enerji × TL/kWh</strong>.',
      'Fatura ya da istasyon sayacı bataryaya giren enerjiyi değil, prizden ya da şarj kablosundan çekilen enerjiyi ölçer. Bu yüzden kayıp payını hesaba katmak, gerçekte ödeyeceğiniz tutara daha yakın bir sonuç verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '60 kWh bataryalı bir aracı %20\'den %80\'e şarj ettiğinizi düşünelim. Eklenen enerji 60 × (80 − 20) ÷ 100 = 36 kWh olur. Şarj kaybı %10 ise şebekeden 36 ÷ 0,90 = 40 kWh çekilir. Birim fiyat 9 TL/kWh alınırsa maliyet 40 × 9 = 360 TL\'dir.',
      'Aracın ortalama tüketimi 18 kWh/100 km ise 36 kWh ile 36 ÷ 18 × 100 = 200 km yol gidilir. Buna göre 100 km\'nin maliyeti 360 ÷ 200 × 100 = 180 TL, kilometre başına maliyet 1,80 TL çıkar. Buradaki 9 TL yalnızca örnek bir sayıdır; kendi tarifenizi yazdığınızda sonuç ona göre değişir.',
    ] },
    { h: 'Şarj kaybı nedir, neden oluşur?', p: [
      'Şebekeden gelen alternatif akım, araç içi şarj cihazında doğru akıma çevrilir; bu dönüşümde enerjinin bir kısmı ısıya dönüşür. Ayrıca batarya soğutma ya da ısıtma sistemi, araç bilgisayarları ve kablo dirençleri de şarj süresince enerji harcar. Tüm bunların toplamı şarj kaybını oluşturur.',
      'Kayıp oranı şarj gücüne, hava sıcaklığına ve aracın tasarımına göre değişir. Ev tipi alternatif akım şarjında çoğu kaynakta %10–15 dolayında değerler anılır; çok düşük güçte uzun süren priz şarjında oran yükselebilir, çünkü araç elektroniği daha uzun süre açık kalır. Doğru akım hızlı şarjda dönüşüm istasyonun içinde yapıldığı için araç tarafındaki kayıp daha düşüktür, ancak batarya ısıl yönetimi yine enerji tüketir. Kendi aracınızın değerini, şarj uygulamasında görünen çekilen enerji ile araç ekranındaki eklenen enerjiyi karşılaştırarak bulabilirsiniz.',
    ] },
    { h: 'Evde şarj ile istasyonda şarj', p: [
      'Evde şarjda birim fiyat, abone grubunuza ve tüketim kademenize göre elektrik faturasında yazan vergiler dâhil kWh bedelidir. Halka açık istasyonlarda ise fiyat işletmeciye, şarj gücüne (AC ya da DC) ve bazen saate göre değişir; hızlı şarj tarifeleri genellikle yavaş şarjdan yüksektir. Bu sayfa herhangi bir tarifeyi sabitlemez; güncel fiyatı siz girersiniz ve farklı senaryoları art arda deneyerek karşılaştırabilirsiniz.',
      'Bazı istasyonlarda kWh bedeline ek olarak bağlantı ücreti, park ücreti ya da şarj bittikten sonra işleyen işgal bedeli uygulanabilir. Bu kalemler hesaba dâhil değildir; varsa sonuca ayrıca ekleyin.',
    ] },
    { h: 'Neden %20–%80 aralığı?', p: [
      'Lityum iyon bataryalar çok düşük ve çok yüksek şarj düzeylerinde daha fazla zorlanır. Üreticilerin çoğu günlük kullanımda bataryayı orta bölgede tutmayı önerir. Ayrıca hızlı şarjda güç, yaklaşık %80\'den sonra belirgin biçimde düşürülür; son %20\'yi doldurmak ilk %60 kadar zaman alabilir. Uzun yolda %10–20\'den %80\'e şarj edip yola devam etmek çoğunlukla hem zaman hem maliyet açısından daha verimlidir. Aracınız için geçerli öneriyi kullanım kılavuzundan kontrol edin.',
    ] },
    { h: 'Benzinli araçla karşılaştırma', p: [
      'İçten yanmalı bir aracın 100 km maliyeti, tüketimi (L/100 km) ile litre fiyatının çarpımıdır. Örneğin 7 L/100 km tüketen bir araçta litre fiyatını yazıp 7 ile çarptığınızda bulduğunuz tutarı, bu aracın "100 km maliyeti" satırıyla doğrudan kıyaslayabilirsiniz. Karşılaştırmanın adil olması için iki tarafta da gerçek kullanım tüketimini, yani katalog değerini değil kendi ortalamanızı kullanın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap, bataryanın tamamının kullanılabilir olduğunu ve tüketimin sabit kaldığını varsayar. Kışın kabin ısıtması, otoyol hızları, rüzgâr ve yük, tüketimi belirgin biçimde artırır; batarya yaşlandıkça kullanılabilir kapasite de azalır. Sonuçlar bilgilendirme amaçlıdır ve mali ya da ticari karar için tek başına dayanak oluşturmaz; kesin tutar için faturanızı ve istasyon işletmecisinin güncel tarifesini esas alın.',
    ] },
  ],
  faq: [
    ['Elektrikli aracı tam doldurmak kaç TL tutar?', 'Başlangıç düzeyine 0, hedefe 100 yazıp kWh fiyatınızı girin. Örneğin 50 kWh batarya, %20 kayıp ve 2,5 TL/kWh ile şebekeden 62,5 kWh çekilir ve maliyet 156,25 TL olur. Kendi tarifenizle sonuç farklı çıkacaktır.'],
    ['100 km maliyeti nasıl bulunuyor?', 'Şarj maliyeti, o şarjla gidilebilecek menzile bölünüp 100 ile çarpılır. Bu, tüketim (kWh/100 km) × birim fiyat ÷ (1 − kayıp oranı) işlemine eşittir; yani sonuç batarya kapasitesinden bağımsızdır.'],
    ['Şarj kaybını bilmiyorum, ne yazmalıyım?', 'Varsayılan %10 değeri makul bir başlangıçtır. Daha temkinli bir tahmin için %15 kullanabilirsiniz. Kesin değeri, sayaçtan ya da şarj uygulamasından okunan enerjiyi aracın bataryaya eklendiğini bildirdiği enerjiye bölerek kendiniz ölçebilirsiniz.'],
    ['Brüt ve net batarya kapasitesi arasındaki fark nedir?', 'Brüt kapasite hücrelerin toplam enerjisidir; net (kullanılabilir) kapasite ise üreticinin batarya ömrünü korumak için ayırdığı tampon düşüldükten sonra kalan kısımdır. Şarj yüzdeleri net kapasiteye göre gösterildiği için hesapta net değeri kullanın.'],
    ['Hızlı şarj daha mı pahalı?', 'Çoğu işletmecide doğru akım hızlı şarjın kWh fiyatı, alternatif akım yavaş şarjdan yüksektir. Farkı görmek için aynı değerlerle iki ayrı hesap yapıp yalnızca birim fiyatı değiştirin.'],
    ['Ortalama tüketimi nereden öğrenirim?', 'Aracın yol bilgisayarı uzun dönem ortalamasını kWh/100 km olarak gösterir. Ekranda km/kWh görüyorsanız 100\'ü o sayıya bölün; örneğin 6 km/kWh, 16,7 kWh/100 km eder.'],
    ['Güneş panelinden şarj ediyorsam ne yazmalıyım?', 'Birim fiyata 0 yazabilirsiniz; araç yine çekilen enerjiyi ve menzili gösterir. Gerçekçi bir karşılaştırma için panelin ürettiği enerjiyi şebekeye satmak yerine araca verdiğinizde vazgeçtiğiniz bedeli de yazabilirsiniz.'],
    ['Araç ve fiyat bilgilerim bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz kapasite, fiyat ve tüketim değerleri sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['elektrikli-arac-menzil-hesapla', 'sarj-suresi-hesapla', 'cihaz-elektrik-maliyeti-hesapla', 'yakit-tuketimi-hesapla', 'kwh-joule-cevir'],
};
