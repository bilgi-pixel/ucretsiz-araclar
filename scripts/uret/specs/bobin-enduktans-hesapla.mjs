export default {
  slug: 'bobin-enduktans-hesapla',
  title: 'Bobin Endüktansı Hesaplama',
  h1Tail: 'tek katlı silindirik bobin',
  pageTitle: 'Bobin Endüktansı Hesaplama – Sarım, Çap ve Uzunluktan µH Bulma',
  description: 'Sarım sayısı, bobin çapı ve uzunluğundan tek katlı silindirik bobinin endüktansını hesaplayın. Uzun solenoid formülü ve hava nüve için Wheeler yaklaşımı birlikte.',
  card: 'Sarım sayısı, çap ve uzunluğu girin; hava ya da nüveli tek katlı bobinin endüktansını nH, µH veya mH olarak bulun.',
  category: 'elektrik',
  keywords: ['bobin endüktans hesaplama', 'endüktans hesaplama', 'hava nüveli bobin hesabı', 'solenoid endüktansı', 'bobin sarım sayısı hesaplama', 'wheeler formülü', 'mikrohenri hesaplama'],
  lead: 'Tek katlı silindirik bir bobinin (solenoidin) endüktansını sarım sayısı, çap ve sarım uzunluğundan hesaplayın. Araç ideal <strong>uzun solenoid formülünü</strong> ve hava nüveli bobinlerde daha gerçekçi sonuç veren <strong>Wheeler yaklaşımını</strong> birlikte gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sarim', label: 'Sarım sayısı (N)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'cap', label: 'Bobin çapı (mm)', type: 'number', placeholder: 'Örn. 20', hint: 'Telin merkezinden merkezine ölçülen ortalama çap.' },
    { id: 'uzunluk', label: 'Sarım uzunluğu (mm)', type: 'number', placeholder: 'Örn. 50', hint: 'İlk sarımdan son sarıma kadar olan eksenel uzunluk.' },
    { id: 'mur', label: 'Nüvenin bağıl geçirgenliği (µr)', type: 'number', value: '1', hint: 'Hava nüve için 1. Ferrit ve demir nüvelerde üretici verisini kullanın.' },
  ],
  compute(v, h) {
    const N = h.pos(v.sarim, 'Sarım sayısı');
    const d = h.pos(v.cap, 'Bobin çapı');
    const l = h.pos(v.uzunluk, 'Sarım uzunluğu');
    const mur = h.opt(v.mur, 1, 'Nüvenin bağıl geçirgenliği');
    if (!(mur >= 1)) h.err('"Nüvenin bağıl geçirgenliği" en az 1 olmalı (hava için 1).');
    const bicim = (H) => {
      const a = Math.abs(H);
      if (a < 1e-6) return h.sig(H * 1e9, 4) + ' nH';
      if (a < 1e-3) return h.sig(H * 1e6, 4) + ' µH';
      if (a < 1) return h.sig(H * 1e3, 4) + ' mH';
      return h.sig(H, 4) + ' H';
    };
    const mu0 = 4e-7 * Math.PI;
    const r = d / 2000;
    const A = Math.PI * r * r;
    const L = mu0 * mur * N * N * A / (l / 1000);
    const rows = [['Endüktans (uzun solenoid formülü)', bicim(L)]];
    if (mur === 1) {
      const ri = d / 2 / 25.4;
      const li = l / 25.4;
      rows.push(['Endüktans (Wheeler, hava nüveli)', bicim(ri * ri * N * N / (9 * ri + 10 * li) * 1e-6)]);
    }
    rows.push(['Uzunluk / çap oranı', h.fmt(l / d, 2)]);
    rows.push(['Yaklaşık tel uzunluğu', h.fmt(N * Math.PI * d / 1000, 2) + ' m']);
    rows.push(['Kesit alanı', h.fmt(A * 1e6, 2) + ' mm²']);
    let note = 'Uzun solenoid formülü uç etkilerini yok sayar ve kısa bobinlerde endüktansı olduğundan büyük gösterir.';
    if (mur === 1) note += l / d < 0.4 ? ' Bu bobin çok kısa (uzunluk çapın 0,4 katından az); Wheeler sonucu da yaklaşık kabul edilmelidir.' : ' Hava nüveli bobinde Wheeler sonucunu esas alın.';
    else note += ' Nüveli bobinlerde gerçek değer nüvenin biçimine ve hava aralığına bağlıdır; sonucu üst sınır olarak değerlendirin.';
    return { rows, note };
  },
  cases: [
    { in: { sarim: '100', cap: '20', uzunluk: '50', mur: '1' }, out: { 'Endüktans (uzun solenoid formülü)': '78,96 µH', 'Endüktans (Wheeler, hava nüveli)': '66,73 µH', 'Uzunluk / çap oranı': '2,5', 'Yaklaşık tel uzunluğu': '6,28 m' } },
    { in: { sarim: '10', cap: '10', uzunluk: '10', mur: '1' }, out: { 'Endüktans (uzun solenoid formülü)': '987 nH', 'Endüktans (Wheeler, hava nüveli)': '678,8 nH', 'Kesit alanı': '78,54 mm²' } },
    { in: { sarim: '200', cap: '10', uzunluk: '40', mur: '100' }, out: { 'Endüktans (uzun solenoid formülü)': '9,87 mH', 'Uzunluk / çap oranı': '4' } },
    { in: { sarim: '50', cap: '25', uzunluk: '25' }, out: { 'Endüktans (uzun solenoid formülü)': '61,69 µH', 'Endüktans (Wheeler, hava nüveli)': '42,42 µH' } },
    { in: { sarim: '1000', cap: '50', uzunluk: '100', mur: '1' }, out: { 'Endüktans (uzun solenoid formülü)': '24,67 mH', 'Endüktans (Wheeler, hava nüveli)': '20,09 mH' } },
    { in: { sarim: '20', cap: '6', uzunluk: '12', mur: '1' }, out: { 'Endüktans (uzun solenoid formülü)': '1,184 µH', 'Endüktans (Wheeler, hava nüveli)': '964,2 nH' } },
    { in: { sarim: '0', cap: '20', uzunluk: '50' }, error: true },
    { in: { sarim: '100', cap: '20', uzunluk: '50', mur: '0,5' }, error: true },
    { in: { sarim: '100', cap: '', uzunluk: '50' }, error: true },
  ],
  howto: [
    'Bobindeki toplam sarım (tur) sayısını yazın.',
    'Bobinin çapını milimetre olarak girin. En doğru sonuç için iç çapa bir tel çapı ekleyerek telin merkezinden geçen ortalama çapı kullanın.',
    'Sarımların kapladığı eksenel uzunluğu milimetre olarak yazın; makaranın değil, sarılı bölümün uzunluğu önemlidir.',
    'Hava nüveli bobinlerde geçirgenliği 1 bırakın; nüveli bobinlerde üreticinin verdiği bağıl ya da etkin geçirgenlik değerini girin.',
    '"Hesapla" düğmesine basın; endüktans uygun birimde (nH, µH, mH) gösterilir.',
  ],
  sections: [
    { h: 'Endüktans nedir?', p: [
      'Endüktans, bir iletkenin içinden geçen akımdaki değişime karşı koyma özelliğidir. Bobinden akım geçtiğinde çevresinde manyetik alan oluşur; akım değişmeye çalıştığında bu alan da değişir ve bobinin uçlarında değişime karşı yönde bir gerilim indüklenir. Birimi henridir (H). Elektronikte karşılaşılan değerler çoğunlukla çok daha küçüktür: milihenri (mH, binde bir), mikrohenri (µH, milyonda bir) ve nanohenri (nH, milyarda bir).',
      'Bobinler; filtrelerde, anahtarlamalı güç kaynaklarında, radyo frekans devrelerinde, rezonans devrelerinde ve parazit bastırmada kullanılır. Amatör telsizciler, hoparlör filtresi yapanlar ve deney devresi kuran öğrenciler bobinleri sıklıkla kendileri sarar; bu durumda sarım sayısının önceden hesaplanması gerekir.',
    ] },
    { h: 'Uzun solenoid formülü', p: [
      'Uzunluğu çapına göre büyük olan, sıkı ve düzgün sarılmış tek katlı bir bobin için ders kitaplarındaki bağıntı şudur: <strong>L = µ<sub>0</sub> · µ<sub>r</sub> · N² · A ÷ l</strong>. Burada µ<sub>0</sub> boşluğun manyetik geçirgenliği (4π × 10<sup>−7</sup> H/m), µ<sub>r</sub> nüvenin bağıl geçirgenliği, N sarım sayısı, A bobinin kesit alanı (m²) ve l sarım uzunluğudur (m).',
      'Formülden üç önemli sonuç çıkar: endüktans sarım sayısının <strong>karesiyle</strong> artar, yani sarımı iki katına çıkarmak endüktansı dört katına çıkarır; kesit alanı çapın karesine bağlı olduğundan çapı büyütmek de güçlü etki yapar; aynı sarımı daha uzun bir alana yaymak ise endüktansı düşürür.',
    ] },
    { h: 'Wheeler yaklaşımı neden ayrıca veriliyor?', p: [
      'Uzun solenoid formülü manyetik alanın bobinin her yerinde eşit olduğunu varsayar. Gerçek bobinlerde uçlara doğru alan zayıflar ve bobin kısaldıkça bu etki büyür; ideal formül endüktansı olduğundan yüksek gösterir. Harold Wheeler\'ın tek katlı hava nüveli bobinler için verdiği pratik formül bu uç etkisini hesaba katar: <strong>L (µH) = r² · N² ÷ (9r + 10l)</strong>; burada r yarıçap, l uzunluktur ve ikisi de inç cinsindendir. Araç milimetre girdilerini kendisi inçe çevirir.',
      'Wheeler formülü, sarım uzunluğu çapın yaklaşık 0,4 katından büyük olan bobinlerde yüzde bir dolayında doğrulukla sonuç verir. Daha kısa, yassı bobinlerde hata büyür; araç bu durumda sonuç altındaki notla uyarır. Nüveli bobinlerde Wheeler satırı gösterilmez, çünkü formül yalnızca hava nüve için geçerlidir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '100 sarımlı, 20 mm çapında ve 50 mm uzunluğunda hava nüveli bir bobin alalım. Yarıçap 0,01 m, kesit alanı π × 0,01² ≈ 3,1416 × 10<sup>−4</sup> m², uzunluk 0,05 m\'dir. Uzun solenoid formülüyle L = 4π × 10<sup>−7</sup> × 100² × 3,1416 × 10<sup>−4</sup> ÷ 0,05 ≈ 78,96 µH bulunur.',
      'Wheeler formülü için yarıçap 0,3937 inç, uzunluk 1,9685 inçtir: L = 0,3937² × 100² ÷ (9 × 0,3937 + 10 × 1,9685) ≈ 1.550 ÷ 23,23 ≈ 66,73 µH. İki sonuç arasındaki yaklaşık %15\'lik fark, uç etkisinin bu boyutlardaki bir bobinde bile ne kadar belirgin olduğunu gösterir. Bu bobin için yaklaşık 6,28 metre tel gerekir.',
    ] },
    { h: 'Nüveli bobinler', p: [
      'Bobinin içine ferrit ya da demir tozu gibi manyetik bir malzeme yerleştirildiğinde manyetik akı yoğunlaşır ve endüktans artar. İdeal durumda artış bağıl geçirgenlik kadardır; örneğin 200 sarımlı, 10 mm çapında, 40 mm uzunluğunda bir bobin µ<sub>r</sub> = 100 için formüle göre 9,87 mH verir.',
      'Uygulamada çubuk biçimli açık nüvelerde manyetik devre havadan tamamlandığı için etkin geçirgenlik, malzemenin katalog değerinin çok altında kalır. Toroid ve kapalı çekirdeklerde ise üreticiler doğrudan "A<sub>L</sub>" değeri verir ve endüktans L = A<sub>L</sub> × N² ile hesaplanır. Bu yüzden nüveli bobinlerde bu sayfadaki sonucu bir üst sınır ve başlangıç tahmini olarak düşünün, kesin değer için ölçüm yapın.',
    ] },
    { h: 'Ölçüm ve sarım ipuçları', ul: [
      '<strong>Çap:</strong> Makaranın dış çapına bir tel çapı ekleyin; ince telde fark küçüktür, kalın telde belirginleşir.',
      '<strong>Sarım aralığı:</strong> Sarımları aralıklı sarmak uzunluğu artırır ve endüktansı düşürür; ince ayar için sarımları sıkıştırıp açmak yaygın bir yöntemdir.',
      '<strong>Çok katlı bobinler:</strong> Bu araç tek katlı bobinler içindir; üst üste katlar sarıldığında farklı formüller gerekir.',
      '<strong>Yüksek frekans:</strong> Sarımlar arası kapasite bobinin kendi rezonansını oluşturur; bu frekansa yaklaşıldıkça bobin beklenen gibi davranmaz.',
      '<strong>Doğrulama:</strong> Sardığınız bobini bir LCR metre ile ya da bilinen bir kondansatörle rezonans frekansını ölçerek kontrol edin.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar kuramsal yaklaşımlardır ve bilgilendirme amaçlıdır. Tel çapı, sarım düzgünlüğü, çevredeki metal parçalar ve frekans gerçek değeri etkiler. Şebeke gerilimi ya da yüksek akım taşıyan devrelerde bobin tasarımı; doyma akımı, ısınma ve yalıtım açısından ayrıca değerlendirilmeli, gerektiğinde bir elektrik-elektronik mühendisine danışılmalıdır.',
    ] },
  ],
  faq: [
    ['Sarım sayısını iki katına çıkarırsam endüktans ne olur?', 'Uzunluk ve çap aynı kalırsa endüktans dört katına çıkar, çünkü endüktans sarım sayısının karesiyle orantılıdır. Ancak aynı tel ile daha fazla sarım uzunluğu da artıracağından pratikte artış dört kattan az olur.'],
    ['Hangi sonucu kullanmalıyım: solenoid mi, Wheeler mı?', 'Hava nüveli tek katlı bobinlerde Wheeler sonucu gerçeğe daha yakındır. Uzun solenoid formülü kuramsal üst sınırı gösterir ve bobin çapına göre ne kadar uzunsa iki sonuç birbirine o kadar yaklaşır.'],
    ['Belirli bir endüktans için sarım sayısını nasıl bulurum?', 'Çap ve uzunluğu sabit tutup sarım sayısını değiştirerek hedef değere yaklaşın. Kestirme olarak, mevcut sonucu hedefe bölüp karekökünü alın; sarım sayısını bu oranda değiştirmek gerekir. Örneğin endüktansı yarıya indirmek için sarımı yaklaşık 0,71 ile çarpın.'],
    ['Tel kalınlığı endüktansı etkiler mi?', 'Doğrudan formülde yer almaz, ancak dolaylı etkisi vardır: kalın tel aynı sarım sayısında daha uzun yer kaplar ve ortalama çapı büyütür. Tel kalınlığı asıl olarak bobinin direncini ve taşıyabileceği akımı belirler.'],
    ['µH, mH ve nH arasında nasıl dönüşüm yapılır?', '1 H = 1.000 mH = 1.000.000 µH = 1.000.000.000 nH. Dolayısıyla 1 mH = 1.000 µH ve 1 µH = 1.000 nH eder. Araç sonucu okunması en kolay birimde gösterir.'],
    ['Ferrit çubuk için hangi geçirgenlik değerini yazmalıyım?', 'Malzemenin katalogdaki başlangıç geçirgenliği yüzlerce ya da binlerce olabilir, ancak açık çubuk nüvede etkin değer bunun çok altındadır ve çubuğun boy/çap oranına bağlıdır. Üreticinin etkin geçirgenlik verisi yoksa en güvenilir yol ölçmektir.'],
    ['Toroid bobinler için bu araç kullanılabilir mi?', 'Hayır. Toroidlerde manyetik yol kapalıdır ve hesap üreticinin verdiği A<sub>L</sub> değeriyle ya da toroid geometrisine özgü formülle yapılır. Bu araç yalnızca düz silindirik, tek katlı bobinler içindir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler herhangi bir sunucuya gönderilmez.'],
  ],
  related: ['kapasitif-reaktans-hesapla', 'lc-rezonans-frekansi-hesapla', 'empedans-hesapla', 'trafo-sarim-orani-hesapla', 'anten-boyu-hesapla'],
};
