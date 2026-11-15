export default {
  slug: 'projeksiyon-mesafesi-hesapla',
  title: 'Projeksiyon Mesafesi ve Ekran Boyutu Hesaplama',
  h1Tail: 'atış oranı ile',
  pageTitle: 'Projeksiyon Mesafesi Hesaplama – Atış Oranı ve Ekran Boyutu',
  description: 'Projeksiyon cihazının atış oranına göre belirli bir mesafeden kaç inç görüntü alacağınızı ya da istediğiniz perde için gereken mesafeyi hesaplayın.',
  card: 'Atış oranına göre projeksiyon mesafesinden görüntü boyutunu ya da perde boyutundan gereken mesafeyi bulun.',
  category: 'gunluk',
  keywords: ['projeksiyon mesafesi hesaplama', 'atış oranı hesaplama', 'throw ratio', 'projeksiyon perde boyutu', 'projeksiyon kaç metreden', 'projeksiyon inç hesaplama', 'kısa mesafe projeksiyon'],
  lead: 'Projeksiyon cihazını duvara kaç metre uzağa koymalısınız, ya da elinizdeki mesafeden kaç inç görüntü alırsınız? Cihazın <strong>atış oranını</strong> ve görüntü biçimini girin; araç görüntünün genişliğini, yüksekliğini, köşegenini ve gereken mesafeyi hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplansın?', type: 'select', options: [['mesafe', 'Mesafeden görüntü boyutu'], ['ekran', 'Ekran köşegeninden mesafe']] },
    { id: 'deger', label: 'Mesafe (m) ya da köşegen (inç)', type: 'number', placeholder: 'Örn. 3 ya da 100', hint: 'İlk seçenekte metre, ikincisinde inç yazın' },
    { id: 'oran', label: 'Atış oranı (throw ratio)', type: 'number', placeholder: 'Örn. 1,5', hint: 'Cihazın teknik özelliklerinde yazar; 1,5:1 için 1,5' },
    { id: 'bicim', label: 'Görüntü biçimi', type: 'select', options: [['16:9', '16:9 (Full HD, 4K)'], ['16:10', '16:10 (WXGA, WUXGA)'], ['4:3', '4:3 (XGA, SVGA)'], ['21:9', '21:9 (sinema)']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, v.mod === 'ekran' ? 'Köşegen' : 'Mesafe');
    const tr = h.pos(v.oran, 'Atış oranı');
    if (tr > 20) h.err('Atış oranı 20\'den büyük olamaz; cihazın teknik özelliklerindeki değeri kontrol edin.');
    const [a, b] = String(v.bicim || '16:9').split(':').map(Number);
    const kosegenOran = Math.sqrt(a * a + b * b);
    let genislik, mesafe;
    if (v.mod === 'ekran') {
      genislik = x * 0.0254 * a / kosegenOran;
      mesafe = genislik * tr;
    } else {
      mesafe = x;
      genislik = mesafe / tr;
    }
    const yukseklik = genislik * b / a;
    const kosegenM = Math.sqrt(genislik * genislik + yukseklik * yukseklik);
    const inc = kosegenM / 0.0254;
    let tip;
    if (tr < 0.4) tip = 'Ultra kısa mesafe';
    else if (tr < 1) tip = 'Kısa mesafe';
    else if (tr <= 2) tip = 'Standart mesafe';
    else tip = 'Uzun mesafe';
    const boyutlar = [
      ['Görüntü genişliği', h.fmt(genislik * 100, 1) + ' cm'],
      ['Görüntü yüksekliği', h.fmt(yukseklik * 100, 1) + ' cm'],
      ['Görüntü alanı', h.fmt(genislik * yukseklik, 2) + ' m²'],
      ['Cihaz sınıfı', tip],
    ];
    const rows = v.mod === 'ekran'
      ? [['Gereken mesafe', h.fmt(mesafe, 2) + ' m'], ['Ekran köşegeni', h.fmt(inc, 1) + ' inç'], ...boyutlar]
      : [['Ekran köşegeni', h.fmt(inc, 1) + ' inç'], ['Mesafe', h.fmt(mesafe, 2) + ' m'], ...boyutlar];
    return {
      rows,
      note: 'Mesafe, objektifin ön yüzünden perdeye ölçülür. Zoom\'lu cihazlarda atış oranı bir aralıktır; iki ucu ayrı ayrı deneyin.',
    };
  },
  cases: [
    { in: { mod: 'mesafe', deger: '3', oran: '1,5', bicim: '16:9' }, out: { 'Ekran köşegeni': '90,3 inç', 'Görüntü genişliği': '200 cm', 'Görüntü yüksekliği': '112,5 cm', 'Görüntü alanı': '2,25 m²' } },
    { in: { mod: 'ekran', deger: '100', oran: '1,5', bicim: '16:9' }, out: { 'Gereken mesafe': '3,32 m', 'Görüntü genişliği': '221,4 cm', 'Görüntü yüksekliği': '124,5 cm' } },
    { in: { mod: 'mesafe', deger: '4', oran: '2', bicim: '4:3' }, out: { 'Ekran köşegeni': '98,4 inç', 'Görüntü genişliği': '200 cm', 'Görüntü yüksekliği': '150 cm', 'Cihaz sınıfı': 'Standart mesafe' } },
    { in: { mod: 'mesafe', deger: '3,2', oran: '1,6', bicim: '16:10' }, out: { 'Ekran köşegeni': '92,9 inç', 'Görüntü yüksekliği': '125 cm' } },
    { in: { mod: 'mesafe', deger: '1', oran: '0,5', bicim: '16:9' }, out: { 'Görüntü genişliği': '200 cm', 'Cihaz sınıfı': 'Kısa mesafe' } },
    { in: { mod: 'ekran', deger: '120', oran: '1,2', bicim: '16:9' }, out: { 'Gereken mesafe': '3,19 m', 'Görüntü genişliği': '265,7 cm' } },
    { in: { mod: 'mesafe', deger: '3', oran: '0', bicim: '16:9' }, error: true },
    { in: { mod: 'ekran', deger: 'yüz', oran: '1,5', bicim: '16:9' }, error: true },
  ],
  howto: [
    'Önce neyi bulmak istediğinizi seçin: cihazı koyacağınız yer belliyse "Mesafeden görüntü boyutu", perde ya da duvar ölçüsü belliyse "Ekran köşegeninden mesafe".',
    'İlk seçenekte objektif ile perde arasındaki mesafeyi metre olarak, ikinci seçenekte istediğiniz görüntü köşegenini inç olarak yazın.',
    '"Atış oranı" alanına cihazın teknik özelliklerindeki throw ratio değerini girin. 1,5:1 yazıyorsa 1,5; aralık verilmişse (1,2–1,5) iki ucu ayrı ayrı hesaplayın.',
    'Görüntü biçimini seçin. Film ve dizi izlemek için satılan cihazların çoğu 16:9, sunum cihazlarının bir kısmı 4:3 ya da 16:10\'dur.',
    '"Hesapla" düğmesine basın; genişlik ve yükseklik değerlerini duvarınızdaki boş alanla karşılaştırın.',
  ],
  sections: [
    { h: 'Atış oranı (throw ratio) nedir?', p: [
      'Atış oranı, projeksiyon cihazının perdeye olan uzaklığının görüntü genişliğine oranıdır: <strong>atış oranı = mesafe ÷ görüntü genişliği</strong>. 1,5 atış oranına sahip bir cihaz, 1 metre genişliğinde görüntü oluşturmak için perdeden 1,5 metre uzakta durmalıdır. Oran küçüldükçe cihaz aynı görüntüyü daha yakından verir.',
      'Bu değer objektifin optik tasarımından gelir ve cihazın kutusunda ya da teknik bilgi sayfasında yer alır. Optik zoom\'u olan modellerde tek sayı yerine 1,2–1,5 gibi bir aralık yazar; zoom halkasını çevirerek bu iki uç arasında herhangi bir oranı seçebilirsiniz. Dijital zoom ise görüntüyü kırparak küçülttüğü için çözünürlük kaybettirir ve hesapta dikkate alınmaz.',
    ] },
    { h: 'Hesap adımları ve çözümlü örnek', p: [
      'Mesafe biliniyorsa önce genişlik bulunur: <strong>genişlik = mesafe ÷ atış oranı</strong>. Yükseklik, görüntü biçiminden gelir: 16:9 için genişlik × 9 ÷ 16. Köşegen de Pisagor bağıntısıyla hesaplanır ve 2,54\'e bölünerek inçe çevrilir.',
      'Örnek: atış oranı 1,5 olan bir cihazı perdeden 3 metre uzağa koyuyorsunuz. Genişlik 3 ÷ 1,5 = 2 metre, yükseklik 2 × 9 ÷ 16 = 1,125 metre olur. Köşegen √(2² + 1,125²) ≈ 2,295 metre, yani yaklaşık 90,3 inçtir. Görüntü alanı 2 × 1,125 = 2,25 m² eder.',
      'Tersine, 100 inçlik 16:9 bir perdeniz varsa genişliği 100 × 2,54 × 16 ÷ √337 ≈ 221,4 cm\'dir. Aynı cihaz için gereken mesafe 2,214 × 1,5 ≈ 3,32 metredir. Odanız bundan kısaysa ya daha küçük bir görüntüye razı olmanız ya da daha küçük atış oranlı bir cihaz seçmeniz gerekir.',
    ] },
    { h: 'Cihaz sınıfları', p: [
      'Sınıf adları üreticiden üreticiye biraz farklı kullanılsa da genel ayrım şöyledir:',
    ], ul: [
      '<strong>Ultra kısa mesafe (0,4\'ün altı):</strong> duvarın hemen dibine, sehpa ya da konsol üzerine konur; önünden geçen kişi gölge düşürmez.',
      '<strong>Kısa mesafe (0,4–1):</strong> küçük odalar, sınıflar ve akıllı tahta uygulamaları için uygundur; 1 metreden 2 metre genişlik verebilir.',
      '<strong>Standart mesafe (1–2):</strong> ev sineması ve toplantı odalarında en yaygın sınıftır; tavana ya da arkadaki rafa yerleştirilir.',
      '<strong>Uzun mesafe (2\'nin üstü):</strong> konferans salonu, düğün salonu ve ibadethane gibi geniş mekânlarda arka duvardan yansıtma için kullanılır.',
    ] },
    { h: 'Yerleşimde dikkat edilecekler', p: [
      'Hesaplanan değer objektifin ön yüzünden perde yüzeyine olan mesafedir; cihazın gövde derinliğini ve arkasındaki kablo payını ayrıca hesaba katın. Tavan montajında askı aparatının yerini belirlerken bu fark birkaç santimetrelik hataya yol açabilir.',
      'Görüntünün dikey konumu atış oranından bağımsızdır ve cihazın ofset değerine ya da mercek kaydırma (lens shift) özelliğine bağlıdır. Cihazı eğerek görüntüyü yukarı taşırsanız görüntü yamuklaşır; dijital yamukluk düzeltmesi bunu giderir ama çözünürlükten yer. Mümkünse cihazı perdeye dik ve doğru yükseklikte konumlandırın.',
      'Görüntü büyüdükçe aynı ışık daha geniş alana yayılır ve parlaklık düşer. Alan iki katına çıktığında birim alana düşen ışık yarıya iner. Aydınlık bir salonda 120 inç görüntü almak, karartılmış bir odada almaktan çok daha fazla lümen gerektirir; "Görüntü alanı" satırı bu karşılaştırma için verilmiştir.',
    ] },
    { h: 'Türkiye\'den tipik kullanım örnekleri', p: [
      'Apartman salonlarında koltuk ile duvar arası çoğunlukla 3–4 metre arasındadır. Standart atış oranlı bir ev sineması cihazıyla bu mesafeden 90–120 inç arası görüntü almak mümkündür. Okullarda ve dershanelerde kullanılan kısa mesafeli cihazlar tahtanın hemen üstüne monte edilir; öğretmenin gölgesi görüntüye düşmez. Kafe ve restoranlarda maç yayını için cihaz genellikle tavana asılır; tavan ile perde arasındaki yatay mesafeyi ölçüp bu araca girerek perde siparişini doğru boyutta verebilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap ideal bir objektif varsayar; üreticilerin beyan ettiği atış oranı birkaç yüzde toleranslı olabilir. Perde siparişi vermeden önce cihazı gerçek mesafeden duvara yansıtıp ölçüm yapmak en güvenli yoldur. Kavisli perdeler, arkadan yansıtma düzenekleri ve anamorfik mercekler bu hesabın kapsamı dışındadır.',
    ] },
  ],
  faq: [
    ['100 inç görüntü için projeksiyon kaç metreden yansıtılmalı?', 'Cihazın atış oranına bağlıdır. 16:9 biçiminde 100 inç görüntünün genişliği yaklaşık 221 cm\'dir; atış oranı 1,5 ise 3,32 metre, 1,2 ise 2,66 metre, 0,5 ise 1,11 metre gerekir.'],
    ['Atış oranını nereden öğrenirim?', 'Cihazın kutusunda, kullanım kılavuzunun teknik özellikler bölümünde ya da üreticinin ürün sayfasında "throw ratio" ya da "yansıtma oranı" adıyla yazar. Bulamazsanız cihazı duvara yansıtıp mesafeyi görüntü genişliğine bölerek kendiniz ölçebilirsiniz.'],
    ['Zoom\'lu cihazda hangi değeri yazmalıyım?', 'Aralığın iki ucunu ayrı ayrı hesaplayın. Küçük değer en geniş görüntüyü, büyük değer en dar görüntüyü verir. İstediğiniz perde boyutu bu iki sonuç arasında kalıyorsa cihaz o mesafeden kullanılabilir.'],
    ['Perdenin inç değeri neyi ifade eder?', 'Televizyonlarda olduğu gibi görüntü alanının köşegen uzunluğunu ifade eder; çerçeve payı dahil değildir. Aynı inç değerinde 4:3 perde 16:9 perdeden daha yüksek ve daha dardır.'],
    ['Görüntü biçimini yanlış seçersem ne olur?', 'Genişlik aynı kalır, çünkü atış oranı genişliğe göre tanımlıdır; ancak yükseklik ve köşegen değişir. 16:9 cihazı 4:3 perdeye yansıtırsanız altta ve üstte boşluk kalır.'],
    ['Kısa mesafe projeksiyon cihazı neden daha pahalı olur?', 'Çok yakından geniş görüntü verebilmek için daha karmaşık, geniş açılı ve bozulması düzeltilmiş optik gerekir. Karşılığında küçük odalarda büyük görüntü ve gölgesiz kullanım sağlar.'],
    ['İzleme mesafesi ile atış mesafesi aynı şey mi?', 'Hayır. Atış mesafesi cihaz ile perde arasındaki uzaklıktır; izleme mesafesi ise sizin perdeye uzaklığınızdır. İkisi birbirinden bağımsız planlanır; cihaz izleyicinin önünde, arkasında ya da tavanda olabilir.'],
    ['Yazdığım ölçüler bir yere kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez.'],
  ],
  related: ['ekran-boyutu-hesapla', 'cm-inc-cevir', 'kamera-lens-gorus-acisi-hesapla', 'en-boy-kutu-hesapla', 'metre-feet-cevir'],
};
