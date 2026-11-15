export default {
  slug: 'seyreltme-orani-hesapla',
  title: 'Seyreltme Oranı (Temizlik Karışımı) Hesaplama',
  h1Tail: '1:10, 1:50 gibi oranlar',
  pageTitle: 'Seyreltme Oranı Hesaplama – Temizlik Karışımı İçin Ürün ve Su',
  description: '1:10, 1:20, 1:50 gibi seyreltme oranlarında ne kadar konsantre ürün ve ne kadar su gerektiğini hesaplayın. Toplam karışıma, ürüne ya da suya göre çalışır.',
  card: 'Konsantre temizlik ürününü 1:10, 1:50 gibi oranlarda sulandırmak için gereken ürün ve su miktarını bulun.',
  category: 'gunluk',
  keywords: ['seyreltme oranı hesaplama', '1:10 oranı ne demek', 'konsantre deterjan sulandırma', 'temizlik karışımı hesaplama', '1:50 seyreltme', 'sulandırma oranı', 'konsantre ürün su oranı'],
  lead: 'Konsantre bir temizlik ürününün etiketindeki <strong>1:10, 1:20, 1:50</strong> gibi oranı ve hazırlamak istediğiniz miktarı girin; araç kaç mililitre ürün ile kaç mililitre su karıştırmanız gerektiğini ve karışımdaki ürün yüzdesini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'urunPay', label: 'Oran – ürün payı', type: 'number', value: '1' },
    { id: 'suPay', label: 'Oran – ikinci sayı', type: 'number', value: '10' },
    { id: 'yorum', label: 'Oranın anlamı', type: 'select', options: [['parca', '1 ölçü ürün + N ölçü su (yaygın)'], ['toplam', '1 ölçü ürün, toplam N ölçü karışım']], hint: 'Etikette "1 ölçü ürüne 10 ölçü su" yazıyorsa ilk seçenek; "10 kat seyreltin" ya da "1/10" yazıyorsa ikinci seçenek uygundur.' },
    { id: 'bilinen', label: 'Bildiğim miktar', type: 'select', options: [['toplam', 'Toplam karışım'], ['urun', 'Ürün (konsantre)'], ['su', 'Su']] },
    { id: 'miktar', label: 'Miktar (litre)', type: 'number', placeholder: 'Örn. 5' },
  ],
  compute(v, h) {
    const a = h.pos(v.urunPay, 'Ürün payı');
    const n = h.pos(v.suPay, 'İkinci sayı');
    const q = h.pos(v.miktar, 'Miktar');
    let suPay = n;
    if (v.yorum === 'toplam') {
      if (!(n > a)) h.err('"Toplam karışım" yorumunda ikinci sayı ürün payından büyük olmalı (örn. 1 ve 10).');
      suPay = n - a;
    }
    const top = a + suPay;
    let urun, su;
    if (v.bilinen === 'urun') { urun = q; su = q * suPay / a; }
    else if (v.bilinen === 'su') { su = q; urun = q * a / suPay; }
    else { urun = q * a / top; su = q * suPay / top; }
    const ml = (x) => h.fmt(x * 1000, 1) + ' ml';
    return {
      rows: [
        ['Ürün (konsantre)', ml(urun)],
        ['Su', ml(su)],
        ['Toplam karışım', ml(urun + su)],
        ['Karışımdaki ürün oranı', '%' + h.fmt(a / top * 100, 2)],
        ['1 litre suya ürün', ml(a / suPay)],
        ['Seyreltme katsayısı', h.fmt(top / a, 2) + ' kat'],
      ],
      note: 'Hacimlerin toplanabildiği varsayılır. Her zaman ürün etiketindeki oran ve güvenlik uyarıları esas alınmalıdır.',
    };
  },
  cases: [
    { in: { urunPay: '1', suPay: '10', yorum: 'parca', bilinen: 'toplam', miktar: '5' }, out: { 'Ürün (konsantre)': '454,5 ml', 'Su': '4.545,5 ml', 'Toplam karışım': '5.000 ml', 'Karışımdaki ürün oranı': '%9,09', '1 litre suya ürün': '100 ml', 'Seyreltme katsayısı': '11 kat' } },
    { in: { urunPay: '1', suPay: '10', yorum: 'toplam', bilinen: 'toplam', miktar: '5' }, out: { 'Ürün (konsantre)': '500 ml', 'Su': '4.500 ml', 'Karışımdaki ürün oranı': '%10', '1 litre suya ürün': '111,1 ml', 'Seyreltme katsayısı': '10 kat' } },
    { in: { urunPay: '1', suPay: '4', yorum: 'parca', bilinen: 'su', miktar: '2' }, out: { 'Ürün (konsantre)': '500 ml', 'Su': '2.000 ml', 'Toplam karışım': '2.500 ml', 'Karışımdaki ürün oranı': '%20' } },
    { in: { urunPay: '1', suPay: '50', yorum: 'parca', bilinen: 'urun', miktar: '0,1' }, out: { 'Ürün (konsantre)': '100 ml', 'Su': '5.000 ml', 'Toplam karışım': '5.100 ml', 'Karışımdaki ürün oranı': '%1,96', '1 litre suya ürün': '20 ml' } },
    { in: { urunPay: '2', suPay: '3', yorum: 'parca', bilinen: 'toplam', miktar: '1' }, out: { 'Ürün (konsantre)': '400 ml', 'Su': '600 ml', 'Karışımdaki ürün oranı': '%40', 'Seyreltme katsayısı': '2,5 kat' } },
    { in: { urunPay: '1', suPay: '1', yorum: 'parca', bilinen: 'toplam', miktar: '0,75' }, out: { 'Ürün (konsantre)': '375 ml', 'Su': '375 ml', 'Karışımdaki ürün oranı': '%50' } },
    { in: { urunPay: '1', suPay: '1', yorum: 'toplam', bilinen: 'toplam', miktar: '1' }, error: true },
    { in: { urunPay: '1', suPay: '10', yorum: 'parca', bilinen: 'toplam', miktar: '0' }, error: true },
    { in: { urunPay: '1', suPay: '', yorum: 'parca', bilinen: 'toplam', miktar: '5' }, error: true },
  ],
  howto: [
    'Etiketteki oranın iki sayısını ilgili alanlara yazın. 1:10 için ürün payı 1, ikinci sayı 10 olur.',
    '"Oranın anlamı" listesinden etiketin ne kastettiğini seçin: bir ölçü ürüne N ölçü su mu, yoksa bir ölçü ürünün toplam N ölçüye tamamlanması mı.',
    'Hangi miktarı bildiğinizi seçin: hazırlamak istediğiniz toplam karışım, elinizdeki ürün ya da kullanacağınız su.',
    'Miktarı litre olarak yazın; 500 ml için 0,5 girebilirsiniz.',
    '"Hesapla" düğmesine basın. Ürün ve su miktarı mililitre olarak, karışımın yüzdesiyle birlikte gösterilir.',
  ],
  sections: [
    { h: '1:10 oranı tam olarak ne demek?', p: [
      'Seyreltme oranlarında en çok karışıklığa yol açan şey, ikinci sayının neyi gösterdiğidir. Temizlik ürünlerinin etiketlerinde yaygın olan yazım <strong>parça:parça</strong> biçimidir: 1:10, bir ölçü ürüne on ölçü su eklemek demektir. Sonuçta on bir ölçü karışım elde edilir ve ürünün karışımdaki payı 1 ÷ 11, yani yaklaşık %9,09 olur.',
      'Laboratuvar dilinde ve bazı teknik föylerde ise aynı yazım <strong>seyreltme katsayısını</strong> anlatır: 1:10 ya da 1/10, bir ölçü ürünün suyla toplam on ölçüye tamamlanması, yani bir ölçü ürün ve dokuz ölçü su demektir. Bu durumda ürünün payı tam %10\'dur. İki yorum arasındaki fark düşük oranlarda belirgindir (1:1 birinde yarı yarıya, diğerinde saf ürün anlamına gelir), yüksek oranlarda ise önemsizleşir: 1:100\'de fark yüzde birin altındadır. Etikette "1 ölçü ürüne 10 ölçü su" gibi açık bir ifade varsa ona uyun; yalnızca oran yazıyorsa üreticinin kullanım kılavuzuna bakın.',
    ] },
    { h: 'Formül', p: [
      'Oran a:b (ürün:su) olsun. Toplam karışım miktarı T biliniyorsa <strong>ürün = T × a ÷ (a + b)</strong> ve <strong>su = T × b ÷ (a + b)</strong> olur. Elinizdeki ürün miktarı U biliniyorsa su = U × b ÷ a; su miktarı S biliniyorsa ürün = S × a ÷ b bulunur. "Toplam N ölçü" yorumunda önce su payı b = N − a olarak hesaplanır, ardından aynı formüller uygulanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>5 litrelik kova, 1:10 oran.</strong> Parça:parça yorumuyla ürün 5 × 1 ÷ 11 = 0,4545 litre, yani <strong>454,5 ml</strong>; su ise 4.545,5 ml olur. Aynı oranı "toplam on ölçü" olarak yorumlarsanız ürün 5 × 1 ÷ 10 = <strong>500 ml</strong>, su 4.500 ml çıkar. Aradaki 45 ml\'lik fark çoğu ev işi için önemsizdir, ama hangi yorumu kullandığınızı bilmek iyidir.',
      '<strong>Püskürtme şişesi, 1:4 oran.</strong> Şişeye 2 litre su koyacaksanız gereken ürün 2 × 1 ÷ 4 = 0,5 litre, yani 500 ml\'dir; toplam 2,5 litre karışım elde edilir ve ürünün payı %20 olur.',
      '<strong>Elde kalan ürünü değerlendirmek, 1:50 oran.</strong> Şişenin dibinde 100 ml konsantre kaldıysa bunu 100 × 50 = 5.000 ml suyla karıştırabilirsiniz; toplam 5,1 litre kullanıma hazır çözelti çıkar. Bu oranda bir litre suya 20 ml ürün düşer; araç bu pratik değeri ayrı bir satırda verir.',
    ] },
    { h: 'Sık kullanılan oranlar (parça:parça)', ul: [
      '<strong>1:1</strong> – karışımın %50\'si ürün; 1 litre suya 1 litre ürün.',
      '<strong>1:4</strong> – %20; 1 litre suya 250 ml ürün.',
      '<strong>1:10</strong> – %9,09; 1 litre suya 100 ml ürün.',
      '<strong>1:20</strong> – %4,76; 1 litre suya 50 ml ürün.',
      '<strong>1:50</strong> – %1,96; 1 litre suya 20 ml ürün.',
      '<strong>1:100</strong> – %0,99; 1 litre suya 10 ml ürün.',
    ] },
    { h: 'Karışımı hazırlarken dikkat edilecekler', ul: [
      'Önce suyu, sonra ürünü ekleyin; böylece köpürme ve sıçrama azalır.',
      'Ölçmek için dereceli kap ya da ürünün kendi kapağını kullanın; kapağın kaç mililitre aldığı çoğu zaman etikette yazar.',
      'Etikette önerilen orandan daha yoğun karışım hazırlamak temizliği iyileştirmez; yüzeyde kalıntı bırakabilir, cildi ve solunum yollarını tahriş edebilir.',
      'Farklı temizlik ürünlerini birbirine karıştırmayın. Özellikle çamaşır suyunu tuz ruhu, amonyaklı ya da asitli ürünlerle karıştırmak zehirli gaz çıkarır.',
      'Hazırladığınız karışımı içecek şişesine koymayın; kabın üzerine içeriğini ve tarihini yazın, çocukların erişemeyeceği yerde saklayın.',
      'Sulandırılmış ürünlerin etkisi zamanla azalabilir; ihtiyacınız kadar hazırlayın.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç hacimlerin birbirine eklenebildiğini varsayar; su bazlı temizlik ürünlerinde bu kabul gündelik duyarlılık için yeterlidir. Hesap yalnızca miktarları verir; bir ürünün hangi yüzey için hangi oranda kullanılacağı, temas süresi ve durulama gerekip gerekmediği üreticinin talimatına bağlıdır. Dezenfeksiyon amaçlı kullanımlarda ve işyeri uygulamalarında ürünün güvenlik bilgi formundaki oranlar ve koruyucu önlemler esas alınmalıdır; bu sayfa bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['1:10 oranında 1 litre suya ne kadar ürün konur?', 'Bir ölçü ürüne on ölçü su anlamında 1:10 için 1 litre suya 100 ml ürün konur. Toplam 1,1 litre karışım elde edilir.'],
    ['1:10 ile 1/10 aynı şey mi?', 'Her zaman değil. 1:10 çoğu temizlik ürününde bir ölçü ürüne on ölçü su demektir (ürün payı %9,09). 1/10 ya da "on kat seyreltme" ise bir ölçü ürünün toplam on ölçüye tamamlanmasıdır (ürün payı %10). Araçta iki yorumu da seçebilirsiniz.'],
    ['10 litrelik kovaya 1:50 oranında ne kadar ürün gerekir?', 'Parça:parça yorumuyla 10 litre toplam karışım için 10.000 ÷ 51 = yaklaşık 196 ml ürün ve 9.804 ml su gerekir. Pratikte 10 litre suya 200 ml ürün eklemek aynı orana karşılık gelir.'],
    ['Yüzde olarak verilen oranı nasıl girerim?', 'Yüzde değer, ürünün toplam karışımdaki payıdır. %5 için "toplam N ölçü" yorumunu seçip ürün payına 5, ikinci sayıya 100 yazabilirsiniz; araç 5 ölçü ürün ve 95 ölçü su olarak hesaplar.'],
    ['Miktarı mililitre olarak girebilir miyim?', 'Miktar alanı litre bekler; 750 ml için 0,75 yazın. Sonuçlar her zaman mililitre olarak gösterilir.'],
    ['Daha yoğun karışım daha iyi temizler mi?', 'Genellikle hayır. Üretici oranı, ürünün etkili ve güvenli olduğu derişime göre belirler. Fazla ürün kalıntı, kayganlık ve tahriş riskini artırır, ayrıca gereksiz masraftır.'],
    ['Araç toz ürünler için kullanılabilir mi?', 'Oranlar hacim üzerinden hesaplanır. Toz ürünlerde etiket çoğunlukla "litre suya şu kadar gram" biçiminde bilgi verir; bu durumda doğrudan su miktarıyla çarpmak daha doğrudur.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız oran ve miktarlar sunucuya gönderilmez.'],
  ],
  related: ['seyreltme-hesapla', 'oran-oranti-hesapla', 'karisim-derisimi-hesapla', 'alkol-orani-seyreltme-hesapla', 'ppm-yuzde-cevir', 'litre-mililitre-cevir'],
};
