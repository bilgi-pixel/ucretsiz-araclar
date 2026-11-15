export default {
  slug: 'cek-senet-iskonto-hesapla',
  title: 'Çek Senet İskonto (Kırdırma) Hesaplama',
  h1Tail: 'iç ve dış iskonto',
  pageTitle: 'Çek Senet İskonto (Kırdırma) Hesaplama – İç ve Dış İskonto',
  description: "Vadesi gelmemiş çek ya da senedi kırdırdığınızda elinize geçecek net tutarı, iskonto tutarını ve efektif yıllık maliyeti iç ve dış iskonto yöntemleriyle hesaplayın.",
  card: "Çek ya da senet kırdırmada iskonto tutarını, elinize geçecek net parayı ve efektif maliyeti hesaplayın.",
  category: 'finans',
  keywords: ['çek kırdırma hesaplama', 'senet iskonto hesaplama', 'çek iskonto hesaplama', 'iç iskonto dış iskonto', 'senet kırdırma', 'çek bozdurma hesaplama', 'iskonto tutarı hesaplama'],
  lead: "Vadesi gelmemiş bir çek ya da senedi nakde çevirmeden önce elinize ne kadar para geçeceğini hesaplayın. Araç, nominal tutar, yıllık iskonto oranı ve vadeye kalan güne göre <strong>iskonto tutarını</strong>, <strong>net ele geçen parayı</strong> ve işlemin <strong>efektif yıllık maliyetini</strong> iç ve dış iskonto yöntemleriyle bulur.",
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Çek / senet tutarı (TL)', type: 'number', placeholder: 'Örn. 100000', hint: 'Evrakın üzerindeki nominal tutar. Binlik ayraç kullanmayın ya da 100.000,00 biçiminde yazın.' },
    { id: 'oran', label: 'Yıllık iskonto oranı (%)', type: 'number', placeholder: 'Örn. 36' },
    { id: 'gun', label: 'Vadeye kalan gün', type: 'number', placeholder: 'Örn. 90' },
    { id: 'yontem', label: 'İskonto yöntemi', type: 'select', options: [['dis', 'Dış iskonto (ticari)'], ['ic', 'İç iskonto (gerçek)']] },
    { id: 'yilGun', label: 'Yıl gün sayısı', type: 'select', options: [['360', '360 gün'], ['365', '365 gün']] },
    { id: 'masraf', label: 'Komisyon ve masraflar (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 500', hint: 'Varsa komisyon, vergi ve dosya masraflarının toplamı. Binlik ayraç kullanmayın.' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Çek / senet tutarı');
    const oran = h.pos(v.oran, 'Yıllık iskonto oranı');
    const gun = h.pos(v.gun, 'Vadeye kalan gün');
    const masraf = h.opt(v.masraf, 0, 'Komisyon ve masraflar');
    if (masraf < 0) h.err('"Komisyon ve masraflar" negatif olamaz.');
    if (gun > 3650) h.err('"Vadeye kalan gün" en fazla 3650 olabilir.');
    const baz = v.yilGun === '365' ? 365 : 360;
    const rt = oran / 100 * gun / baz;
    const iskonto = v.yontem === 'ic' ? tutar - tutar / (1 + rt) : tutar * rt;
    const net = tutar - iskonto - masraf;
    if (net <= 0) h.err('Bu oran ve vadeyle kesintiler çek tutarını aşıyor. Oranı, gün sayısını ya da masrafı kontrol edin; uzun vadelerde iç iskonto yöntemini deneyin.');
    const kesinti = iskonto + masraf;
    return {
      rows: [
        ['Ele geçecek net tutar', h.para(net)],
        ['İskonto tutarı', h.para(iskonto)],
        ['Komisyon ve masraflar', h.para(masraf)],
        ['Toplam kesinti', `${h.para(kesinti)} (%${h.fmt(kesinti / tutar * 100, 2)})`],
        ['Efektif yıllık maliyet (basit)', '%' + h.fmt(kesinti / net * baz / gun * 100, 2)],
      ],
      note: 'Efektif maliyet, toplam kesintinin ele geçen paraya oranının yıllığa çevrilmiş hâlidir (basit faiz). Kuruluşların uyguladığı oran, vergi ve masraflar değişkendir.',
    };
  },
  cases: [
    { in: { tutar: '100000', oran: '36', gun: '90', yontem: 'dis', yilGun: '360' }, out: { 'Ele geçecek net tutar': '91.000,00 TL', 'İskonto tutarı': '9.000,00 TL', 'Toplam kesinti': '9.000,00 TL (%9)', 'Efektif yıllık maliyet (basit)': '%39,56' } },
    { in: { tutar: '100000', oran: '36', gun: '90', yontem: 'ic', yilGun: '360' }, out: { 'Ele geçecek net tutar': '91.743,12 TL', 'İskonto tutarı': '8.256,88 TL', 'Efektif yıllık maliyet (basit)': '%36' } },
    { in: { tutar: '50000', oran: '40', gun: '73', yontem: 'dis', yilGun: '365' }, out: { 'Ele geçecek net tutar': '46.000,00 TL', 'İskonto tutarı': '4.000,00 TL', 'Toplam kesinti': '4.000,00 TL (%8)' } },
    { in: { tutar: '10000', oran: '60', gun: '30', yontem: 'dis', yilGun: '360', masraf: '100' }, out: { 'Ele geçecek net tutar': '9.400,00 TL', 'İskonto tutarı': '500,00 TL', 'Komisyon ve masraflar': '100,00 TL', 'Toplam kesinti': '600,00 TL (%6)', 'Efektif yıllık maliyet (basit)': '%76,6' } },
    { in: { tutar: '120000', oran: '30', gun: '60', yontem: 'ic', yilGun: '360' }, out: { 'Ele geçecek net tutar': '114.285,71 TL', 'İskonto tutarı': '5.714,29 TL', 'Efektif yıllık maliyet (basit)': '%30' } },
    { in: { tutar: '20000', oran: '24', gun: '45' }, out: { 'Ele geçecek net tutar': '19.400,00 TL', 'İskonto tutarı': '600,00 TL' } },
    { in: { tutar: '100000', oran: '400', gun: '120', yontem: 'dis', yilGun: '360' }, error: true },
    { in: { tutar: '100000', oran: '36', gun: '0' }, error: true },
  ],
  howto: [
    '"Çek / senet tutarı" alanına evrakın üzerinde yazan nominal tutarı girin.',
    'Size teklif edilen yıllık iskonto oranını yüzde olarak yazın. Oran aylık verildiyse 12 ile çarparak yıllığa çevirin.',
    'İşlem günü ile vade tarihi arasındaki gün sayısını "Vadeye kalan gün" alanına yazın.',
    'İskonto yöntemini ve yılın 360 mı 365 gün mü sayılacağını seçin. Emin değilseniz teklifi veren kuruluşa hangi yöntemi kullandığını sorun.',
    'Varsa komisyon ve diğer masrafları ekleyip "Hesapla" düğmesine basın; net tutar ve efektif maliyet listelenir.',
  ],
  sections: [
    { h: 'Çek ya da senet kırdırmak ne demektir?', p: [
      "Elinizde üç ay sonra tahsil edilecek bir çek ya da senet varsa ve paraya bugün ihtiyacınız olursa, bu evrakı bir bankaya, faktoring şirketine ya da başka bir kişiye devrederek karşılığında nakit alabilirsiniz. Karşı taraf vadeyi beklemenin bedeli olarak evrakın tutarından bir kesinti yapar. Bu kesintiye <strong>iskonto</strong>, işleme de halk arasında kırdırma ya da bozdurma denir. Elinize geçen para, nominal tutardan iskonto ve masrafların düşülmesiyle bulunur.",
      "İskonto, özünde vadeye kadar olan süre için ödenen faizdir. Ancak faizin hangi tutar üzerinden hesaplandığına göre iki farklı yöntem vardır ve aynı oran, aynı vade için iki yöntem farklı sonuç verir. Teklifleri karşılaştırırken yalnızca orana değil, yönteme ve masraflara da bakmak gerekir.",
    ] },
    { h: 'Dış iskonto ve iç iskonto formülleri', p: [
      "<strong>Dış iskonto (ticari iskonto)</strong> faizi nominal tutar üzerinden hesaplar: <strong>iskonto = nominal tutar × oran × gün ÷ yıl gün sayısı</strong>. Ele geçen tutar nominal tutardan bu iskontonun çıkarılmasıyla bulunur. Hesabı kolay olduğu için uygulamada yaygındır; ancak faiz, elinize geçmeyen para üzerinden de hesaplandığından gerçek maliyet ilan edilen oranın üzerindedir.",
      "<strong>İç iskonto (gerçek iskonto)</strong> önce evrakın bugünkü değerini bulur: <strong>bugünkü değer = nominal tutar ÷ (1 + oran × gün ÷ yıl gün sayısı)</strong>. İskonto, nominal tutar ile bugünkü değer arasındaki farktır. Bu yöntemde faiz, fiilen ele geçen para üzerinden işler; dolayısıyla efektif maliyet ilan edilen orana eşittir ve iskonto tutarı dış iskontoya göre daha düşüktür.",
      "Yıl gün sayısı da sonucu etkiler. Ticari hesaplarda yıl çoğunlukla 360 gün, bazı işlemlerde 365 gün alınır. 360 günlük bazda günlük faiz biraz daha yüksek çıkar.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "100.000 TL tutarında, vadesine 90 gün kalmış bir çek yıllık yüzde 36 oranla kırdırılacak olsun; yıl 360 gün kabul edilsin. Oran × süre çarpımı 0,36 × 90 ÷ 360 = 0,09'dur.",
      "<strong>Dış iskonto:</strong> İskonto 100.000 × 0,09 = 9.000 TL, ele geçen tutar 91.000 TL'dir. 91.000 TL'yi 90 günlüğüne kullanmak için 9.000 TL ödediğiniz için efektif yıllık maliyet 9.000 ÷ 91.000 × 360 ÷ 90 = yüzde 39,56 olur; ilan edilen yüzde 36'nın belirgin biçimde üzerindedir.",
      "<strong>İç iskonto:</strong> Bugünkü değer 100.000 ÷ 1,09 = 91.743,12 TL, iskonto 8.256,88 TL'dir. Efektif maliyet tam yüzde 36'dır. İki yöntem arasındaki fark bu örnekte 743,12 TL'dir; vade uzadıkça ve oran yükseldikçe fark büyür.",
      "<strong>Masraf etkisi:</strong> 10.000 TL'lik, 30 gün vadeli bir senet yüzde 60 oranla dış iskontoya tabi tutulursa iskonto 500 TL'dir. Buna 100 TL masraf eklendiğinde ele geçen para 9.400 TL'ye iner ve efektif yıllık maliyet 600 ÷ 9.400 × 12 = yüzde 76,6'ya çıkar. Kısa vadeli ve küçük tutarlı işlemlerde sabit masrafların etkisi büyüktür.",
    ] },
    { h: 'Teklifleri karşılaştırırken dikkat edilecekler', ul: [
      "Oranın yıllık mı aylık mı olduğunu ve hangi iskonto yöntemiyle uygulandığını sorun.",
      "Komisyon, dosya masrafı, tahsilat ücreti ve vergi gibi ek kalemlerin toplamını öğrenin ve masraf alanına yazın.",
      "Vadeye kalan gün sayısının nasıl sayıldığını ve tahsil süresi için ek gün eklenip eklenmediğini kontrol edin.",
      "Teklifleri ilan edilen oranla değil, bu araçtaki <strong>efektif yıllık maliyet</strong> ve <strong>ele geçecek net tutar</strong> satırlarıyla karşılaştırın.",
      "Evrak karşılıksız çıkarsa size rücu edilip edilmeyeceğini sözleşmeden okuyun; bu, rakamlara yansımayan önemli bir risktir.",
    ] },
    { h: 'Dış iskontonun sınırı', p: [
      "Dış iskontoda oran ile sürenin çarpımı büyüdükçe iskonto nominal tutara yaklaşır; çarpım 1'e ulaştığında iskonto evrakın tamamını yutar. Örneğin yıllık yüzde 400 oran ve 120 gün için hesaplanan iskonto çek tutarını aşar. Bu durumda araç hata verir. Bu, dış iskontonun yalnızca kısa vadeler ve makul oranlar için anlamlı bir yaklaşım olduğunu gösterir; uzun vadelerde iç iskonto ya da bileşik iskonto kullanılır.",
    ] },
    { h: 'Uyarı', p: [
      "Bu sayfa bir oran ya da piyasa verisi içermez; iskonto oranını, masrafları ve yöntemi sizin girmeniz gerekir. Finansman işlemlerine uygulanan vergi ve yasal kesintiler zaman içinde değişebilir; güncel mevzuatı kontrol edin ve toplam masrafı işlemi yapacağınız kuruluştan yazılı olarak öğrenin. Efektif maliyet basit faiz esasına göre yıllığa çevrilmiştir; bileşik esaslı yıllık oran bundan yüksek çıkar. Sonuçlar bilgilendirme amaçlıdır, mali danışmanlık yerine geçmez.",
    ] },
  ],
  faq: [
    ['Çek kırdırma nasıl hesaplanır?', "Dış iskonto yönteminde çek tutarı, yıllık oran ve gün sayısı çarpılıp yıl gün sayısına bölünür; bulunan iskonto çek tutarından düşülür. 100.000 TL, yüzde 36 ve 90 gün için iskonto 9.000 TL, ele geçen tutar 91.000 TL'dir."],
    ['İç iskonto ile dış iskonto arasındaki fark nedir?', "Dış iskonto faizi evrakın nominal tutarı üzerinden, iç iskonto ise evrakın bugünkü değeri üzerinden hesaplar. Aynı oran ve vadede dış iskonto tutarı daha yüksektir, yani kırdıran kişinin eline daha az para geçer."],
    ['Hangi yöntem kullanılıyor, nasıl anlarım?', "Teklifi veren kuruluşa sormanız gerekir. Pratik bir kontrol olarak size bildirilen net tutarı bu araçta iki yöntemle de hesaplayıp hangisine uyduğuna bakabilirsiniz."],
    ['Efektif yıllık maliyet neyi gösterir?', "Elinize geçen parayı kullanmanın yıllık basit faiz karşılığını gösterir. İskonto ve masrafların toplamı ele geçen tutara bölünür ve vadeye göre yıllığa çevrilir. Farklı teklifleri tek bir ölçüyle karşılaştırmanızı sağlar."],
    ['360 gün mü 365 gün mü seçmeliyim?', "Teklifi veren tarafın kullandığı bazı seçin. 360 günlük bazda aynı oran için iskonto biraz daha yüksek çıkar. Bilmiyorsanız her ikisiyle de hesaplayıp aralığı görebilirsiniz."],
    ['Aylık iskonto oranını nasıl girerim?', "Basit faiz esasıyla aylık oranı 12 ile çarpıp yıllık oran alanına yazın. Aylık yüzde 3, yıllık yüzde 36 olarak girilir; 360 günlük bazda 30 günlük iskonto tam olarak yüzde 3 çıkar."],
    ['Birden fazla çeki birlikte hesaplayabilir miyim?', "Her çeki ayrı ayrı hesaplayıp sonuçları toplayabilirsiniz. Kabaca bir tahmin için çeklerin toplam tutarını ve tutar ağırlıklı ortalama vadesini kullanmak da mümkündür; dış iskontoda bu yöntem toplam iskontoyu doğru verir."],
    ['Çek bilgilerim kaydediliyor mu?', "Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz tutar, oran ve vade bilgileri sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['ortalama-vade-hesapla', 'iskonto-hesapla', 'gunluk-faiz-hesapla', 'bugunku-deger-hesapla', 'efektif-faiz-hesapla', 'pesin-vadeli-karsilastir'],
};
