export default {
  slug: 'metrekare-fiyati-hesapla',
  title: 'Metrekare Birim Fiyatı Hesaplama',
  h1Tail: 'brüt ve net m²',
  pageTitle: 'Metrekare Fiyatı Hesaplama – Brüt ve Net m² Birim Fiyatı',
  description: "Ev, arsa ya da işyerinin toplam fiyatını alanına bölerek brüt ve net metrekare birim fiyatını bulun; bölge ortalamasıyla farkını yüzde olarak görün.",
  card: "Toplam fiyat ve alandan brüt ve net metrekare birim fiyatını hesaplayın, bölge ortalamasıyla karşılaştırın.",
  category: 'finans',
  keywords: ['metrekare fiyatı hesaplama', 'm2 birim fiyat', 'evin metrekare fiyatı', 'arsa metrekare fiyatı', 'brüt net metrekare', 'm2 fiyat hesaplama', 'daire metrekare fiyatı'],
  lead: "Bir gayrimenkulün toplam fiyatını ve alanını yazın; araç <strong>metrekare birim fiyatını</strong> hesaplasın. Net alanı da girerseniz brüt ve net m² fiyatını ayrı ayrı, bölge ortalamasını girerseniz ilanın ortalamadan yüzde kaç pahalı ya da ucuz olduğunu görürsünüz.",
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Toplam fiyat (TL)', type: 'number', placeholder: 'Örn. 3000000', hint: 'Binlik ayraç kullanmayın ya da 3.000.000,00 biçiminde yazın.' },
    { id: 'brutAlan', label: 'Brüt alan (m²)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'netAlan', label: 'Net alan (m², isteğe bağlı)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'ortalama', label: 'Bölge ortalama m² fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 20000', hint: 'Brüt m² fiyatıyla karşılaştırılır. Binlik ayraç kullanmayın.' },
  ],
  compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Toplam fiyat');
    const brut = h.pos(v.brutAlan, 'Brüt alan');
    const bosMu = (s) => String(s ?? '').trim() === '';
    const birim = fiyat / brut;
    const rows = [['Brüt m² fiyatı', h.para(birim, 'TL/m²')]];
    if (!bosMu(v.netAlan)) {
      const net = h.pos(v.netAlan, 'Net alan');
      if (net > brut + 1e-9) h.err('"Net alan" brüt alandan büyük olamaz; iki değeri kontrol edin.');
      rows.push(['Net m² fiyatı', h.para(fiyat / net, 'TL/m²')]);
      rows.push(['Net / brüt alan oranı', '%' + h.fmt(net / brut * 100, 2)]);
    }
    if (!bosMu(v.ortalama)) {
      const ort = h.pos(v.ortalama, 'Bölge ortalama m² fiyatı');
      const fark = (birim - ort) / ort * 100;
      const yon = Math.abs(fark) < 0.005 ? 'ortalamayla aynı' : fark > 0 ? 'ortalamadan pahalı' : 'ortalamadan ucuz';
      rows.push(['Bölge ortalamasına göre', `%${h.fmt(Math.abs(fark), 2)} ${yon}`.replace(/^%0 /, '')]);
      rows.push(['Ortalama fiyatla bu alanın değeri', h.para(ort * brut)]);
    }
    return { rows, note: 'Birim fiyat, toplam fiyatın alana bölümüdür. İlanlar çoğunlukla brüt alan üzerinden karşılaştırılır.' };
  },
  cases: [
    { in: { fiyat: '3000000', brutAlan: '120', netAlan: '100' }, out: { 'Brüt m² fiyatı': '25.000,00 TL/m²', 'Net m² fiyatı': '30.000,00 TL/m²', 'Net / brüt alan oranı': '%83,33' } },
    { in: { fiyat: '3000000', brutAlan: '120', ortalama: '20000' }, out: { 'Brüt m² fiyatı': '25.000,00 TL/m²', 'Bölge ortalamasına göre': '%25 ortalamadan pahalı', 'Ortalama fiyatla bu alanın değeri': '2.400.000,00 TL' } },
    { in: { fiyat: '1500000', brutAlan: '500' }, out: { 'Brüt m² fiyatı': '3.000,00 TL/m²' } },
    { in: { fiyat: '2000000', brutAlan: '95', netAlan: '80', ortalama: '25000' }, out: { 'Brüt m² fiyatı': '21.052,63 TL/m²', 'Net m² fiyatı': '25.000,00 TL/m²', 'Net / brüt alan oranı': '%84,21', 'Bölge ortalamasına göre': '%15,79 ortalamadan ucuz' } },
    { in: { fiyat: '4000000', brutAlan: '160', ortalama: '25000' }, out: { 'Brüt m² fiyatı': '25.000,00 TL/m²', 'Bölge ortalamasına göre': 'ortalamayla aynı' } },
    { in: { fiyat: '750000', brutAlan: '62,5' }, out: { 'Brüt m² fiyatı': '12.000,00 TL/m²' } },
    { in: { fiyat: '3000000', brutAlan: '0' }, error: true },
    { in: { fiyat: '3000000', brutAlan: '100', netAlan: '120' }, error: true },
  ],
  howto: [
    '"Toplam fiyat" alanına ilan ya da satış bedelini yazın.',
    '"Brüt alan" alanına ilanda ya da tapuda belirtilen brüt metrekareyi girin. Arsa ve tarla için parselin yüzölçümünü yazın.',
    'Net alanı biliyorsanız ilgili kutuya yazın; böylece fiilen kullanacağınız alanın birim fiyatı da hesaplanır.',
    'İsterseniz aynı semtteki benzer gayrimenkullerin ortalama m² fiyatını girerek ilanın ortalamaya göre konumunu görün.',
    '"Hesapla" düğmesine basın ve sonuçları başka ilanların sonuçlarıyla karşılaştırın.',
  ],
  sections: [
    { h: 'Metrekare birim fiyatı nedir, neden kullanılır?', p: [
      "Metrekare birim fiyatı, bir gayrimenkulün toplam bedelinin alanına bölünmesiyle bulunan, bir metrekareye düşen fiyattır. Farklı büyüklükteki daireleri, arsaları ya da dükkânları aynı ölçüye indirgediği için karşılaştırmanın en pratik yoludur. 3.000.000 TL'lik 120 m² bir daire ile 2.600.000 TL'lik 95 m² bir daireden hangisinin daha pahalı olduğunu toplam fiyata bakarak söylemek zordur; birim fiyata bakınca ilki 25.000 TL/m², ikincisi yaklaşık 27.368 TL/m² çıkar ve küçük dairenin aslında daha pahalı olduğu görülür.",
      "Birim fiyat yalnızca alım satımda değil, kiralık ilanlarda, kat karşılığı inşaat pazarlıklarında, kamulaştırma ve değerleme raporlarında, tadilat ve zemin kaplama tekliflerinde de kullanılır. Aynı formülle kiralık bir işyerinin aylık m² kirasını da hesaplayabilirsiniz; fiyat alanına aylık kirayı yazmanız yeterlidir.",
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      "Hesap tek bir bölme işlemidir: <strong>m² birim fiyatı = toplam fiyat ÷ alan</strong>. Brüt alan kullanılırsa brüt birim fiyat, net alan kullanılırsa net birim fiyat bulunur.",
      "Örnek: 3.000.000 TL'ye satılan bir dairenin brüt alanı 120 m², net alanı 100 m² olsun. Brüt birim fiyat 3.000.000 ÷ 120 = 25.000 TL/m², net birim fiyat 3.000.000 ÷ 100 = 30.000 TL/m² eder. Net alanın brüt alana oranı 100 ÷ 120 = yüzde 83,33'tür; yani ödediğiniz her 100 metrekarenin yaklaşık 83 metrekaresini fiilen kullanırsınız.",
      "Bölgedeki benzer dairelerin ortalaması 20.000 TL/m² ise bu ilan (25.000 − 20.000) ÷ 20.000 = yüzde 25 daha pahalıdır. Aynı 120 m² ortalama fiyattan 2.400.000 TL ederdi; aradaki 600.000 TL'lik farkın manzara, kat, bina yaşı ya da site olanakları gibi bir gerekçesi olup olmadığını sorgulamak gerekir.",
    ] },
    { h: 'Brüt alan ile net alan arasındaki fark', p: [
      "Net alan, dairenin içinde duvarlar arasında kalan ve fiilen kullanılan alandır. Brüt alan ise buna duvar kalınlıklarını, balkonları ve çoğu zaman merdiven, asansör, koridor gibi ortak alanlardan daireye düşen payı ekler. Hangi kalemlerin brüte dâhil edildiği projeden projeye ve ilan sahibinin alışkanlığına göre değişebilir; bu yüzden iki ilanı karşılaştırırken aynı tür alanı kullandığınızdan emin olun.",
      "Ortak alanı geniş sitelerde net/brüt oranı düşer. Oran yüzde 70'lerin altına iniyorsa ödediğiniz bedelin önemli bir bölümü ortak alanlara gidiyor demektir. Bu kendi başına kötü değildir; ancak karşılaştırmayı brüt fiyat üzerinden yaparsanız böyle bir daire olduğundan ucuz görünür. Net birim fiyat bu yanılgıyı ortadan kaldırır.",
    ] },
    { h: 'Arsa, tarla ve işyerlerinde kullanım', p: [
      "Arsa ve tarlada net-brüt ayrımı yoktur; tapudaki yüzölçümü kullanılır. Tarla ilanlarında alan sıklıkla dönüm olarak verilir; uygulamada 1 dönüm 1.000 m² kabul edilir. 4 dönüm bir tarlanın fiyatı 2.000.000 TL ise birim fiyat 2.000.000 ÷ 4.000 = 500 TL/m² olur. Hisseli tapularda toplam parsel alanını değil, satın aldığınız hisseye düşen alanı yazmalısınız.",
      "İmarlı arsalarda birim fiyat kadar emsal, yani parselde yapılabilecek toplam inşaat alanı da önemlidir. Emsali yüksek bir arsanın m² fiyatı yüksek görünse de inşaat alanı başına düşen arsa maliyeti daha düşük olabilir. İmar durumunu ilgili belediyeden doğrulamadan yalnızca birim fiyata göre karar vermeyin.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "Bir ilanın net, diğerinin brüt alanını kullanarak karşılaştırma yapmak",
      "İlandaki alanı tapu ya da yapı kullanma izin belgesindeki alanla doğrulamamak",
      "Farklı kattaki, farklı yaştaki ya da farklı cephedeki daireleri yalnızca birim fiyatla kıyaslamak",
      "Eşyalı satışlarda eşya bedelini, otopark ve depo gibi eklentileri fiyattan ayırmamak",
      "Bölge ortalaması olarak ilan fiyatlarını, yani istenen fiyatları gerçekleşen satış fiyatı gibi kabul etmek",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Araç yalnızca aritmetik bir bölme yapar; gayrimenkulün değerini belirlemez. Bölge ortalaması alanı sizin girdiğiniz değere dayanır, sayfa herhangi bir fiyat verisi içermez ve internetten veri çekmez. Sonuçlar bilgilendirme amaçlıdır; alım satım kararı öncesinde lisanslı değerleme uzmanından görüş almanız önerilir.",
    ] },
  ],
  faq: [
    ['Metrekare fiyatı nasıl hesaplanır?', "Toplam fiyat alana bölünür. 2.000.000 TL'lik 80 m² bir dairenin metrekare fiyatı 2.000.000 ÷ 80 = 25.000 TL'dir."],
    ['Brüt metrekare mi net metrekare mi esas alınmalı?', "İlanlar ve bölge ortalamaları çoğunlukla brüt alan üzerinden konuşulur, bu yüzden piyasayla karşılaştırırken brüt birim fiyat kullanılır. Kendi kullanımınız açısından neyin karşılığını ödediğinizi görmek için net birim fiyata da bakmanız yararlıdır."],
    ['Net alan brüt alanın yüzde kaçı olmalı?', "Sabit bir kural yoktur; binanın tasarımına ve ortak alanların büyüklüğüne göre değişir. Araç bu oranı hesaplayıp gösterir, siz de aynı bölgedeki diğer projelerle karşılaştırabilirsiniz. Oran düştükçe ortak alan payı artıyor demektir."],
    ['Dönümü metrekareye nasıl çeviririm?', "Uygulamada 1 dönüm 1.000 metrekare kabul edilir. 2,5 dönüm arazi için alan kutusuna 2500 yazabilirsiniz. Hektar için 1 hektar 10.000 metrekaredir."],
    ['Kiralık bir yerin metrekare kirasını hesaplayabilir miyim?', "Evet. Toplam fiyat alanına aylık kirayı, alan kutusuna metrekareyi yazın. Sonuç satırındaki değer aylık m² kirası olarak okunur; 150 m² bir ofisin kirası 45.000 TL ise m² kirası 300 TL eder."],
    ['Bölge ortalamasını nereden bulurum?', "Aynı mahallede, benzer yaş ve özellikteki birkaç ilanın birim fiyatını bu araçla hesaplayıp ortalamasını alabilirsiniz. İlan fiyatlarının pazarlık öncesi istenen fiyatlar olduğunu, gerçekleşen satışların farklı olabileceğini unutmayın."],
    ['Ondalıklı alan değeri yazabilir miyim?', "Evet. 62,5 gibi ondalıklı alanları virgül ya da nokta kullanarak girebilirsiniz. Para alanlarında ise binlik ayraç kullanmamanız ya da 1.500.000,00 biçiminde yazmanız gerekir."],
    ['Yazdığım fiyatlar bir yere gönderiliyor mu?', "Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz fiyat ve alan bilgileri sunucuya iletilmez, kaydedilmez."],
  ],
  related: ['kira-getirisi-hesapla', 'birim-fiyat-karsilastir', 'birim-maliyet-hesapla', 'pesin-vadeli-karsilastir', 'yatirim-getirisi-hesapla'],
};
