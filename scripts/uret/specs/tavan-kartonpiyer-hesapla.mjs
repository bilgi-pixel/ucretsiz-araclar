export default {
  slug: 'tavan-kartonpiyer-hesapla',
  title: 'Kartonpiyer Hesaplama',
  h1Tail: 'metre, adet ve tutar',
  pageTitle: 'Kartonpiyer Hesaplama – Tavan İçin Kaç Metre Kartonpiyer Gerekir?',
  description: 'Oda ölçülerini ve kartonpiyer parça boyunu girin; tavan çevresi için gereken metreyi, parça adedini, köşe sayısını ve isteğe bağlı tahmini tutarı hesaplayın.',
  card: 'Oda ölçülerine göre tavan kartonpiyeri için gereken metreyi, parça adedini ve tahmini malzeme tutarını bulun.',
  category: 'insaat',
  keywords: ['kartonpiyer hesaplama', 'kaç metre kartonpiyer lazım', 'tavan kartonpiyer metraj', 'kartonpiyer adet hesabı', 'tavan çevresi hesaplama', 'kartonpiyer maliyeti', 'stropiyer hesaplama'],
  lead: `Odanın enini ve boyunu, kullanacağınız kartonpiyerin parça boyunu yazın. Araç tavan çevresini bulur, fire payını ekler ve <strong>kaç metre, kaç parça kartonpiyer</strong> gerektiğini gösterir; metre fiyatını girerseniz tahmini malzeme tutarını da hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'ek', label: 'Ek uzunluk (m)', type: 'number', value: '0', hint: 'Kiriş, kolon ve baca dönüşlerinin eklediği uzunluk.' },
    { id: 'kose', label: 'Köşe sayısı', type: 'number', value: '4', hint: 'İç ve dış köşelerin toplamı.' },
    { id: 'parca', label: 'Parça boyu (m)', type: 'number', value: '2' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'fiyat', label: 'Metre fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const ek = h.nonneg(v.ek, 'Ek uzunluk');
    const kose = h.int(v.kose, 'Köşe sayısı');
    if (kose < 0) h.err('Köşe sayısı negatif olamaz.');
    const parca = h.pos(v.parca, 'Parça boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const cevre = 2 * (en + boy);
    const net = cevre + ek;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / parca - 1e-9);
    const alinan = adet * parca;
    const rows = [
      ['Gerekli kartonpiyer', h.fmt(toplam, 2) + ' m'],
      ['Alınacak adet', `${h.fmt(adet, 0)} parça (${h.fmt(parca, 2)} m)`],
      ['Satın alınan toplam', h.fmt(alinan, 2) + ' m'],
      ['Tavan çevresi', h.fmt(cevre, 2) + ' m'],
      ['Net döşenecek uzunluk', h.fmt(net, 2) + ' m'],
      ['Gönye kesimli köşe', h.fmt(kose, 0) + ' adet'],
      ['Tavan alanı', h.fmt(en * boy, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const fiyat = h.nonneg(v.fiyat, 'Metre fiyatı');
      rows.push(['Tahmini malzeme tutarı', h.para(alinan * fiyat)]);
    }
    return {
      rows,
      note: 'Tutar, satın alınan tam parçaların toplam metresi üzerinden hesaplanır; yapıştırıcı, macun, boya ve işçilik dahil değildir.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5' }, out: { 'Gerekli kartonpiyer': '19,8 m', 'Alınacak adet': '10 parça (2 m)', 'Satın alınan toplam': '20 m', 'Tavan çevresi': '18 m', 'Tavan alanı': '20 m²' } },
    { in: { en: '3', boy: '4', fiyat: '60' }, out: { 'Gerekli kartonpiyer': '15,4 m', 'Alınacak adet': '8 parça (2 m)', 'Tavan çevresi': '14 m', 'Tahmini malzeme tutarı': '960,00 TL' } },
    { in: { en: '5', boy: '6', ek: '2', kose: '8', fire: '5' }, out: { 'Gerekli kartonpiyer': '25,2 m', 'Alınacak adet': '13 parça (2 m)', 'Net döşenecek uzunluk': '24 m', 'Gönye kesimli köşe': '8 adet' } },
    { in: { en: '3,5', boy: '4,2', parca: '1,2' }, out: { 'Gerekli kartonpiyer': '16,94 m', 'Alınacak adet': '15 parça (1,2 m)', 'Satın alınan toplam': '18 m', 'Tavan alanı': '14,7 m²' } },
    { in: { en: '4', boy: '4', fire: '0', fiyat: '50' }, out: { 'Gerekli kartonpiyer': '16 m', 'Alınacak adet': '8 parça (2 m)', 'Tahmini malzeme tutarı': '800,00 TL' } },
    { in: { en: '6', boy: '3', parca: '2,4', fire: '10', fiyat: '125,5' }, out: { 'Gerekli kartonpiyer': '19,8 m', 'Alınacak adet': '9 parça (2,4 m)', 'Satın alınan toplam': '21,6 m', 'Tahmini malzeme tutarı': '2.710,80 TL' } },
    { in: { en: '4', boy: '' }, error: true },
    { in: { en: '4', boy: '5', parca: '0' }, error: true },
    { in: { en: '4', boy: '5', kose: '-2' }, error: true },
  ],
  howto: [
    `Odanın enini ve boyunu tavan hizasında, duvardan duvara ölçerek metre cinsinden yazın.`,
    `Tavanda kiriş sarkması, kolon ya da baca çıkıntısı varsa bunların çevreye eklediği uzunluğu "Ek uzunluk" alanına, toplam köşe sayısını "Köşe sayısı" alanına girin.`,
    `Alacağınız kartonpiyerin tek parça boyunu yazın; alçı ve hazır strafor modellerde bu çoğunlukla 1 ya da 2 metredir.`,
    `Fire payını belirleyin, tutarı da görmek istiyorsanız metre fiyatını yazın ve "Hesapla" düğmesine basın.`,
    `Sonuçtaki parça adedine göre sipariş verin; köşe sayısı kesim planı yaparken işinizi kolaylaştırır.`,
  ],
  sections: [
    { h: 'Kartonpiyer nedir, nereye uygulanır?', p: [
      `Kartonpiyer, duvar ile tavanın birleştiği köşeyi kapatan dekoratif profildir. Köşedeki boya ve sıva kusurlarını gizler, odaya bitmiş bir görünüm kazandırır ve bazı modellerde arkasına şerit aydınlatma ya da kablo gizlemek için de kullanılır. Geleneksel olarak alçıdan yerinde çekilir ya da hazır alçı çubuklar hâlinde yapıştırılır; günümüzde polistiren (strafor) ve poliüretan esaslı hafif hazır modeller de yaygındır.`,
      `Hangi malzemeden olursa olsun ihtiyaç duyulan miktar aynı mantıkla hesaplanır: kartonpiyer tavanın çevresi boyunca kesintisiz döner. Süpürgelikten farklı olarak kapı boşlukları düşülmez, çünkü kapının üzerinde de tavan köşesi devam eder.`,
    ] },
    { h: 'Hesaplama formülü', p: [
      `Dikdörtgen bir tavanın çevresi <strong>2 × (en + boy)</strong> ile bulunur. Tavandan sarkan bir kirişin iki yüzü ya da duvardan çıkan bir kolonun yan yüzleri bu çevreye eklenir. Araç şu sırayı izler: net uzunluk = çevre + ek uzunluk; gerekli miktar = net uzunluk × (1 + fire ÷ 100); parça adedi = gerekli miktar ÷ parça boyu, yukarı yuvarlanır.`,
      `Metre fiyatı girildiğinde tutar, gerekli metre üzerinden değil <strong>satın alınan tam parçaların toplam metresi</strong> üzerinden hesaplanır; çünkü satıcıdan yarım parça alamazsınız. Kartonpiyeri metre işi olarak ustaya yaptırıyorsanız ve fiyat uygulanan metre üzerinden veriliyorsa, "Net döşenecek uzunluk" değerini fiyatla kendiniz çarpabilirsiniz.`,
    ] },
    { h: 'Çözümlü örnek: 4 × 5 metrelik salon', p: [
      `Tavan çevresi 2 × (4 + 5) = 18 metredir. Kiriş ya da çıkıntı olmadığından net uzunluk da 18 metredir. Yüzde 10 fire eklenince 18 × 1,10 = <strong>19,8 metre</strong> eder. İki metrelik parçalardan 19,8 ÷ 2 = 9,9, yani <strong>10 parça</strong> gerekir; satın alınan toplam 20 metre olur.`,
      `İkinci örnek: 3 × 4 metrelik bir yatak odası için çevre 14 metre, fireyle birlikte 15,4 metredir. İki metrelik parçalardan 8 adet alınır ve bu 16 metre eder. Metre fiyatı 60 TL ise malzeme tutarı 16 × 60 = 960 TL olarak hesaplanır.`,
    ] },
    { h: 'Köşeler ve gönye kesimi', p: [
      `Kartonpiyer köşelerde 45 derecelik gönye kesimiyle birleştirilir. Her köşe için iki parçanın ucu kesildiğinden, köşe sayısı arttıkça hem işçilik hem fire artar. Sade bir dikdörtgen odada dört iç köşe vardır. Duvardan çıkan her kolon iki dış ve iki iç köşe daha ekler; yani tek kolonlu bir odada köşe sayısı sekize çıkar.`,
      `Geniş ve desenli modellerde desenin köşede tutması için parçaların belirli bir noktadan kesilmesi gerekir; bu da fireyi artırır. Bazı hazır sistemlerde köşeler için ayrı hazır köşe parçaları satılır. Böyle bir ürün kullanıyorsanız köşe sayısı kadar hazır parça almayı unutmayın.`,
    ] },
    { h: 'Fire payı ne kadar olmalı?', ul: [
      `<strong>Yüzde 5:</strong> dört köşeli, düz duvarlı odalar ve deneyimli usta.`,
      `<strong>Yüzde 10:</strong> çoğu ev için güvenli genel değer; araçta varsayılan budur.`,
      `<strong>Yüzde 15 ve üzeri:</strong> çok kirişli tavanlar, cumbalı ya da açılı duvarlar, geniş desenli modeller ve ilk kez yapılan uygulamalar.`,
    ], p: [
      `Alçı kartonpiyer kırılgandır; taşıma sırasında kırılabilecek parçalar için de bir-iki yedek bulundurmak işin yarıda kalmasını önler.`,
    ] },
    { h: 'Ölçü alırken sık yapılan hatalar', ul: [
      `Ölçüyü zeminden almak: süpürgelik hizası ile tavan hizası arasında, sıva kalınlığı ve duvar eğriliği nedeniyle fark olabilir. Mümkünse tavana yakın ölçün.`,
      `Kiriş dönüşlerini unutmak: tavandan 40 cm sarkan ve odayı boydan boya geçen bir kirişin etrafında kartonpiyer dönecekse, kirişin iki yanındaki uzunluklar ayrıca eklenmelidir.`,
      `Kapı ve pencere boşluklarını düşmek: kartonpiyer bu açıklıkların üzerinden kesintisiz geçer, düşüm yapılmaz.`,
      `Parça boyunu yanlış varsaymak: bazı modeller 1 metre, bazıları 2 ya da 2,4 metre boyundadır; etiketi kontrol edin.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç profil miktarını hesaplar; yapıştırma alçısı ya da yapıştırıcı, derz macunu, astar ve boya ihtiyacı ile işçilik bu hesabın dışındadır. Girilen fiyat sizin yazdığınız değerdir; güncel fiyatlar model, genişlik ve satıcıya göre değiştiği için teklif almadan kesin bütçe çıkarmayın. Asma tavan, gizli ışık bandı ve tavan göbeği gibi uygulamalar ayrıca planlanmalıdır.`,
    ] },
  ],
  faq: [
    ['20 m² oda için kaç metre kartonpiyer gerekir?', `Bu, odanın biçimine bağlıdır. 4 × 5 metrelik 20 m² odada çevre 18 metredir ve yüzde 10 fireyle 19,8 metre kartonpiyer gerekir. Aynı alan 2,5 × 8 metre olsaydı çevre 21 metreye çıkardı. Bu yüzden hesap metrekareye değil en ve boya göre yapılır.`],
    ['Kapı ve pencere boşlukları düşülür mü?', `Hayır. Kartonpiyer duvarın tavanla birleştiği çizgide olduğu için kapı ve pencerelerin üzerinden kesintisiz devam eder. Yalnızca tavana kadar yükselen gömme dolap gibi elemanların önünde uygulama yapılmayacaksa o uzunluğu kendiniz çıkarabilirsiniz.`],
    ['Kartonpiyer parçaları kaç metre olur?', `Hazır alçı ve strafor modeller çoğunlukla 1 ya da 2 metre boyunda satılır; poliüretan modellerde 2 ve 2,4 metre de görülür. Yerinde çekme alçı kartonpiyerde parça kavramı yoktur; bu durumda "Net döşenecek uzunluk" değerini kullanın.`],
    ['Köşe sayısı sonucu değiştirir mi?', `Köşe sayısı metre hesabını doğrudan değiştirmez; bilgi amaçlı gösterilir ve kaç gönye kesimi yapılacağını anlatır. Köşe sayısı fazlaysa fire payını yükseltmeniz yerinde olur.`],
    ['Kirişli tavanda nasıl hesap yaparım?', `Kartonpiyer kirişin etrafından dolaşacaksa, kirişin her iki yüzü boyunca uzunluğu ve varsa sarkma yüksekliği kadar dönüşleri toplayıp "Ek uzunluk" alanına yazın. Kirişin her iki yanında ikişer köşe oluşacağı için köşe sayısını da artırın.`],
    ['Tutar neden gerekli metreden fazla çıkıyor?', `Çünkü tutar, satın almak zorunda olduğunuz tam parçaların toplam metresi üzerinden hesaplanır. 15,4 metre ihtiyaç için 2 metrelik sekiz parça, yani 16 metre alınır ve ödeme bu 16 metre üzerinden yapılır.`],
    ['Tavan alanı neden gösteriliyor?', `Tavan alanı kartonpiyer miktarını etkilemez; tavan boyası, asma tavan ya da tavan kaplaması gibi yan işleri planlarken elinizin altında olması için eklenmiştir.`],
    ['Yazdığım ölçü ve fiyatlar kaydediliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz ölçüler ve fiyat hiçbir sunucuya gönderilmez. Sayfa yüklendikten sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['supurgelik-hesapla', 'alcipan-hesapla', 'duvar-alani-hesapla', 'boya-fayans-hesapla', 'alan-cevre-hesapla', 'duvar-kagidi-hesapla'],
};
