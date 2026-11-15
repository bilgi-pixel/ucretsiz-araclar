export default {
  slug: 'mantolama-hesapla',
  title: 'Mantolama Malzemesi Hesaplama',
  h1Tail: 'levha, yapıştırıcı, sıva, dübel ve file',
  pageTitle: 'Mantolama Hesaplama – Levha, Yapıştırıcı, Dübel ve File Miktarı',
  description: 'Cephe alanını ve pencere-kapı boşluklarını girin; mantolama için gereken ısı yalıtım levhası, yapıştırıcı, sıva, dübel ve donatı filesi miktarını hesaplayın.',
  card: 'Cephe alanından mantolama için gereken yalıtım levhası, yapıştırıcı ve sıva torbası, dübel ve file miktarını bulun.',
  category: 'insaat',
  keywords: ['mantolama hesaplama', 'mantolama malzeme hesabı', 'mantolama metrekare hesaplama', 'kaç paket eps gerekir', 'mantolama dübel sayısı', 'mantolama yapıştırıcı sarfiyatı', 'dış cephe yalıtım hesabı'],
  lead: "Dış cephe ısı yalıtımı (mantolama) için gereken <strong>yalıtım levhası, yapıştırıcı, sıva, dübel ve donatı filesi</strong> miktarını cephe alanından hesaplayın. Sarfiyat değerleri düzenlenebilir; kullandığınız ürünün etiketindeki rakamları yazabilirsiniz.",
  button: 'Hesapla',
  inputs: [
    { id: 'brut', label: 'Toplam cephe alanı (m²)', type: 'number', placeholder: 'Örn. 200', hint: 'Pencere ve kapılar dahil brüt alan.' },
    { id: 'bosluk', label: 'Pencere ve kapı boşlukları (m²)', type: 'number', value: '0' },
    { id: 'levha', label: 'Bir levhanın alanı (m²)', type: 'number', value: '0,5', hint: '50 × 100 cm levha için 0,5.' },
    { id: 'fire', label: 'Levha ve file fire payı (%)', type: 'number', value: '5' },
    { id: 'yapistirici', label: 'Yapıştırıcı sarfiyatı (kg/m²)', type: 'number', value: '4,5' },
    { id: 'siva', label: 'Sıva sarfiyatı (kg/m²)', type: 'number', value: '4,5' },
    { id: 'dubel', label: 'Dübel (adet/m²)', type: 'number', value: '6' },
    { id: 'torba', label: 'Torba ağırlığı (kg)', type: 'number', value: '25' },
  ],
  compute(v, h) {
    const brut = h.pos(v.brut, 'Toplam cephe alanı');
    const bosluk = h.nonneg(v.bosluk, 'Pencere ve kapı boşlukları');
    const la = h.pos(v.levha, 'Bir levhanın alanı');
    const f = h.nonneg(v.fire, 'Levha ve file fire payı');
    const ys = h.nonneg(v.yapistirici, 'Yapıştırıcı sarfiyatı');
    const ss = h.nonneg(v.siva, 'Sıva sarfiyatı');
    const dm = h.nonneg(v.dubel, 'Dübel');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    if (bosluk >= brut) h.err('Pencere ve kapı boşlukları toplam cephe alanından küçük olmalı.');
    const net = brut - bosluk;
    const fireli = net * (1 + f / 100);
    const yk = net * ys, sk = net * ss;
    const yukari = (x) => Math.ceil(x - 1e-9);
    return {
      rows: [
        ['Yalıtım levhası', h.fmt(yukari(fireli / la), 0) + ' adet'],
        ['Net yalıtım alanı', h.fmt(net, 2) + ' m²'],
        ['Fireli levha alanı', h.fmt(fireli, 2) + ' m²'],
        ['Yapıştırıcı', h.fmt(yk, 1) + ' kg (' + yukari(yk / torba) + ' torba)'],
        ['Sıva', h.fmt(sk, 1) + ' kg (' + yukari(sk / torba) + ' torba)'],
        ['Dübel', h.fmt(yukari(net * dm), 0) + ' adet'],
        ['Donatı filesi', h.fmt(fireli * 1.1, 1) + ' m²'],
      ],
      note: 'File miktarına fire payının yanında yüzde 10 bindirme payı eklenmiştir. Sarfiyatlar ürüne ve yüzey düzgünlüğüne göre değişir; ürün etiketini esas alın.',
    };
  },
  cases: [
    { in: { brut: '200', bosluk: '40' }, out: { 'Yalıtım levhası': '336 adet', 'Net yalıtım alanı': '160 m²', 'Fireli levha alanı': '168 m²', 'Yapıştırıcı': '720 kg (29 torba)', 'Sıva': '720 kg (29 torba)', 'Dübel': '960 adet', 'Donatı filesi': '184,8 m²' } },
    { in: { brut: '100', bosluk: '0', levha: '0,5', fire: '0', yapistirici: '5', siva: '4', dubel: '6', torba: '25' }, out: { 'Yalıtım levhası': '200 adet', 'Yapıştırıcı': '500 kg (20 torba)', 'Sıva': '400 kg (16 torba)', 'Dübel': '600 adet', 'Donatı filesi': '110 m²' } },
    { in: { brut: '350', bosluk: '62', levha: '0,72', fire: '8', yapistirici: '4', siva: '5', dubel: '8', torba: '25' }, out: { 'Yalıtım levhası': '432 adet', 'Net yalıtım alanı': '288 m²', 'Fireli levha alanı': '311,04 m²', 'Yapıştırıcı': '1.152 kg (47 torba)', 'Sıva': '1.440 kg (58 torba)', 'Dübel': '2.304 adet' } },
    { in: { brut: '48', bosluk: '6,5', levha: '0,5', fire: '10', yapistirici: '4,5', siva: '4,5', dubel: '5', torba: '20' }, out: { 'Yalıtım levhası': '92 adet', 'Net yalıtım alanı': '41,5 m²', 'Yapıştırıcı': '186,8 kg (10 torba)', 'Dübel': '208 adet' } },
    { in: { brut: '10', bosluk: '0', levha: '0,5', fire: '0', yapistirici: '0', siva: '0', dubel: '0', torba: '25' }, out: { 'Yalıtım levhası': '20 adet', 'Yapıştırıcı': '0 kg (0 torba)', 'Dübel': '0 adet', 'Donatı filesi': '11 m²' } },
    { in: { brut: '600', bosluk: '120', levha: '0,5', fire: '5', yapistirici: '4,5', siva: '4,5', dubel: '6', torba: '25' }, out: { 'Yalıtım levhası': '1.008 adet', 'Yapıştırıcı': '2.160 kg (87 torba)', 'Dübel': '2.880 adet' } },
    { in: { brut: '50', bosluk: '60' }, error: true },
    { in: { brut: '', bosluk: '10' }, error: true },
  ],
  howto: [
    "Yalıtım yapılacak cephelerin toplam alanını metrekare olarak yazın. Her cephenin genişliğini yüksekliğiyle çarpıp toplamanız yeterlidir.",
    "Pencere, kapı ve balkon kapısı gibi levha kaplanmayacak boşlukların toplam alanını girin.",
    "Levha alanını kontrol edin: 50 × 100 cm levha 0,5 m², 60 × 120 cm levha 0,72 m² eder. Sarfiyat ve dübel değerlerini satın alacağınız sistemin etiketine göre düzeltin.",
    "\"Hesapla\" düğmesine basın. Levha adedi, yapıştırıcı ve sıva torbası, dübel ve file miktarı birlikte listelenir.",
  ],
  sections: [
    { h: 'Mantolama sistemi hangi katmanlardan oluşur?', p: [
      "Mantolama, binanın dış yüzeyini kesintisiz bir yalıtım tabakasıyla sarma işidir. Duvardan dışa doğru sıralama şöyledir: yapıştırma harcı, ısı yalıtım levhası (EPS, XPS, taş yünü gibi), levhayı duvara mekanik olarak tutan dübeller, içine donatı filesi gömülen ince sıva katı, astar ve son kat dekoratif kaplama. Köşelerde fileli köşe profili, zemin seviyesinde su basman profili kullanılır.",
      "Bu araç sistemin metrekareyle doğru orantılı tüketilen ana kalemlerini hesaplar: levha, yapıştırıcı, sıva, dübel ve file. Köşe profili, su basman profili, astar ve son kat kaplama cephenin kenar uzunluklarına ve seçilen ürüne bağlı olduğundan ayrıca çıkarılmalıdır.",
    ] },
    { h: 'Hesabın adımları', ol: [
      "<strong>Net alan</strong> = toplam cephe alanı − pencere ve kapı boşlukları.",
      "<strong>Fireli levha alanı</strong> = net alan × (1 + fire ÷ 100). Levha adedi bu alanın tek levha alanına bölünüp yukarı yuvarlanmasıyla bulunur.",
      "<strong>Yapıştırıcı</strong> = net alan × yapıştırıcı sarfiyatı (kg/m²). Torba adedi, toplam kilonun torba ağırlığına bölünüp yukarı yuvarlanmış halidir.",
      "<strong>Sıva</strong> = net alan × sıva sarfiyatı (kg/m²); torba hesabı aynıdır.",
      "<strong>Dübel</strong> = net alan × metrekare başına dübel adedi.",
      "<strong>Donatı filesi</strong> = fireli alan × 1,1. Ek yerlerinde şeritlerin birbirinin üzerine bindirilmesi için yüzde 10 pay eklenir.",
    ] },
    { h: 'Çözümlü örnek: 200 m² cephe', p: [
      "Dört cephesinin toplamı 200 m² olan bir binada pencere ve kapılar 40 m² tutsun. Net yalıtım alanı 200 − 40 = 160 m²'dir. Yüzde 5 fireyle 168 m² levha gerekir; 0,5 m²'lik levhalardan 168 ÷ 0,5 = <strong>336 adet</strong> alınır.",
      "Yapıştırıcı sarfiyatı 4,5 kg/m² alındığında 160 × 4,5 = 720 kg, yani 25 kg'lık torbalardan 720 ÷ 25 = 28,8, yukarı yuvarlanarak <strong>29 torba</strong> eder. Sıva için aynı sarfiyatla yine 29 torba çıkar. Metrekareye 6 dübelle 160 × 6 = <strong>960 dübel</strong>, file için 168 × 1,1 = <strong>184,8 m²</strong> gerekir.",
    ] },
    { h: 'Sarfiyat değerleri hakkında', p: [
      "Araçtaki varsayılan değerler piyasada sık karşılaşılan aralıkların ortasından seçilmiştir, kesin değer değildir. Yapıştırıcı tüketimi duvar yüzeyinin düzgünlüğüne ve uygulama yöntemine (çerçeve ve öbek ya da taraklı tam yüzey) göre çoğunlukla 4–5 kg/m² aralığındadır; bozuk yüzeylerde artar. File gömülen sıva katı için de benzer aralıklar verilir.",
      "Dübel sayısı levha tipine, bina yüksekliğine ve rüzgâra açık köşe bölgelerine göre değişir; metrekarede 4 ile 8 arasında değerler görülür, yüksek katlarda ve köşelerde sayı artar. Dübel boyu ise levha kalınlığına ve duvar malzemesine göre seçilir. Tüm bu değerler için satın aldığınız sistemin teknik föyünü esas alın.",
    ] },
    { h: 'Cephe alanını ölçerken dikkat edilecekler', ul: [
      "<strong>Pencere kenarları (denizlik ve yan yüzler):</strong> boşluğu alandan düşerken pencerenin çevresindeki dönüş yüzeylerine de ince levha uygulandığını unutmayın; küçük boşlukları hiç düşmemek bu payı karşılamanın pratik yoludur.",
      "<strong>Balkon içleri ve çıkmalar:</strong> balkon duvarları, tavanları ve çıkma altları da yalıtılacaksa alana ekleyin.",
      "<strong>Parapet ve çatı arası duvarlar:</strong> çatı katındaki üçgen kalkan duvarları ayrıca hesaplayın.",
      "<strong>Su basman bölgesi:</strong> zemine yakın kısımda suya dayanıklı farklı bir levha kullanılıyorsa o şeridi ayrı hesaplayın.",
      "<strong>Levha kalınlığı:</strong> adet hesabını değiştirmez ama paket içindeki levha sayısını değiştirir; paketle alıyorsanız bulduğunuz adedi paket içeriğine bölün.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Araç malzeme keşfi yapar; yalıtım kalınlığını ya da ısı kaybını hesaplamaz. Gerekli kalınlık iklim bölgesine, duvar yapısına ve yürürlükteki yalıtım yönetmeliğine göre belirlenir; bunun için bir uzmandan ısı yalıtım projesi alın ve güncel mevzuatı kontrol edin. Sonuçlar bilgilendirme amaçlıdır; kesin sipariş öncesinde uygulayıcı firmanın yerinde ölçüsünü esas alın. Yangın güvenliği açısından malzeme sınıfı ve yangın bariyerleri de ayrıca değerlendirilmelidir.",
    ] },
  ],
  faq: [
    ['1 metrekare mantolama için kaç levha gerekir?', "50 × 100 cm ölçüsündeki standart levha 0,5 m² olduğundan metrekareye 2 levha gider. Fire payıyla birlikte 100 m² için yaklaşık 210 levha hesaplanır."],
    ['Bir paket yalıtım levhası kaç metrekare eder?', "Levha kalınlığına göre değişir; kalınlık arttıkça paketteki levha sayısı azalır. Paketin üzerinde yazan levha adedini 0,5 ile çarparak (50 × 100 cm levhalar için) paketin kaç metrekare ettiğini bulabilirsiniz."],
    ['Metrekareye kaç dübel atılır?', "Yaygın uygulamada metrekareye 6 dübel kullanılır; levha ortasına ve birleşim noktalarına gelecek şekilde dizilir. Yüksek binalarda ve köşe bölgelerinde sayı artırılır. Sistem üreticisinin dübelleme planına uyun."],
    ['Yapıştırıcı ile sıva aynı ürün mü?', "Bazı sistemlerde hem yapıştırma hem sıva için tek ürün, bazılarında iki ayrı ürün kullanılır. Araç iki kalemi ayrı sarfiyatla hesaplar; tek ürün kullanıyorsanız iki satırdaki kilogramları toplayın."],
    ['File için neden fazladan pay ekleniyor?', "Donatı filesi şeritler halinde uygulanır ve çatlamayı önlemek için komşu şeritler yaklaşık 10 cm üst üste bindirilir. Ayrıca pencere köşelerine çapraz ek file parçaları konur. Bu yüzden file miktarı net alandan belirgin biçimde fazladır."],
    ['Pencere boşluklarını düşmeli miyim?', "Büyük pencere ve kapı boşluklarını düşmek malzeme fazlasını önler. Ancak pencere çevresindeki dönüş yüzeyleri de kaplandığından, küçük boşlukları düşmemek ya da fire payını biraz yüksek tutmak daha güvenlidir."],
    ['Araç mantolama fiyatını hesaplıyor mu?', "Hayır. Malzeme ve işçilik fiyatları ürüne, kalınlığa ve bölgeye göre değişir. Bulduğunuz miktarları aldığınız güncel birim fiyatlarla çarparak yaklaşık malzeme bütçesini çıkarabilirsiniz."],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', "Hayır. Hesaplama tarayıcınızda yapılır; cephe ölçüleriniz sunucuya iletilmez ve saklanmaz."],
  ],
  related: ['isi-kaybi-hesapla', 'duvar-alani-hesapla', 'siva-hesapla', 'alcipan-hesapla', 'petek-hesapla'],
};
