export default {
  slug: 'kwh-joule-cevir',
  title: 'Kilovatsaat Joule Çevirici',
  h1Tail: 'kWh ↔ J',
  pageTitle: 'Kilovatsaat Joule Çevirici – kWh\'den Joule\'e, J\'den kWh\'ye',
  description: 'Kilovatsaati joule\'e, joule\'ü kilovatsaate çevirin. 1 kWh = 3.600.000 J eşitliğiyle çalışır; kilojoule, megajoule ve watt-saat karşılıklarını da verir.',
  card: 'Elektrik faturasındaki kWh değerini joule, kJ ve MJ\'ye ya da joule\'ü kWh\'ye çevirin.',
  category: 'birim',
  keywords: ['kwh joule çevirme', '1 kwh kaç joule', 'joule kwh', 'kilovatsaat megajoule', 'kwh mj çevirme', 'kilovatsaat joule hesaplama', '1 kwh kaç mj'],
  lead: 'Elektrik enerjisini kilovatsaatten (kWh) joule\'e (J) ya da joule\'den kilovatsaate çevirin. Hesap, <strong>1 kWh = 3.600.000 J = 3,6 MJ</strong> tam eşitliğine dayanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 250', hint: 'Çok büyük ya da çok küçük sayıları 3,6e6 biçiminde de yazabilirsiniz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kwh', 'Kilovatsaat → Joule'], ['j', 'Joule → Kilovatsaat']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const j = v.yon === 'j' ? x : x * 3.6e6;
    const kwh = j / 3.6e6;
    const jRow = ['Joule', h.sig(j, 8) + ' J'];
    const kwhRow = ['Kilovatsaat', h.sig(kwh, 8) + ' kWh'];
    return {
      rows: [
        ...(v.yon === 'j' ? [kwhRow, jRow] : [jRow, kwhRow]),
        ['Kilojoule', h.sig(j / 1e3, 8) + ' kJ'],
        ['Megajoule', h.sig(j / 1e6, 8) + ' MJ'],
        ['Watt-saat', h.sig(kwh * 1000, 8) + ' Wh'],
      ],
      note: '1 kWh = 3.600.000 J (tam). Sonuçlar sekiz anlamlı basamağa yuvarlanır; çok küçük ya da çok büyük değerler 10 üssüyle gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'kwh' }, out: { 'Joule': '3.600.000 J', 'Megajoule': '3,6 MJ', 'Kilojoule': '3.600 kJ', 'Watt-saat': '1.000 Wh' } },
    { in: { deger: '3600000', yon: 'j' }, out: { 'Kilovatsaat': '1 kWh' } },
    { in: { deger: '250', yon: 'kwh' }, out: { 'Joule': '900.000.000 J', 'Megajoule': '900 MJ' } },
    { in: { deger: '0,5', yon: 'kwh' }, out: { 'Joule': '1.800.000 J', 'Megajoule': '1,8 MJ' } },
    { in: { deger: '1e9', yon: 'j' }, out: { 'Kilovatsaat': '277,77778 kWh', 'Megajoule': '1.000 MJ' } },
    { in: { deger: '1', yon: 'j' }, out: { 'Kilovatsaat': '2,7777778 × 10^-7 kWh' } },
    { in: { deger: '0', yon: 'kwh' }, out: { 'Joule': '0 J' } },
    { in: { deger: 'kwh', yon: 'kwh' }, error: true },
    { in: { deger: '-1', yon: 'j' }, error: true },
  ],
  howto: [
    '"Değer" alanına enerji miktarını yazın; faturanızdaki tüketim için kWh, bir fizik sorusundaki enerji için joule değerini girin.',
    '"Çeviri yönü" listesinden hangi birimden hangisine geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında kilojoule, megajoule ve watt-saat değerleri yer alır.',
    'Sonuçları kopyalayıp ödev, rapor ya da enerji hesabı tablonuza aktarın.',
  ],
  sections: [
    { h: 'Kilovatsaat nedir?', p: [
      'Kilovatsaat bir güç birimi değil, <strong>enerji</strong> birimidir. Bir kilovat gücündeki bir cihazın bir saat boyunca çalışırken harcadığı enerjiye bir kilovatsaat denir. Elektrik sayaçları tüketimi bu birimle ölçer ve faturalar kWh başına birim fiyat üzerinden hesaplanır. 2000 watt gücündeki bir elektrikli ısıtıcı yarım saat çalıştığında 2 kW × 0,5 saat = 1 kWh enerji harcar.',
      'Joule ise SI\'ın enerji birimidir ve bir watt gücün bir saniyede aktardığı enerjiye eşittir: 1 J = 1 W·s. Joule gündelik elektrik tüketimi için çok küçük kaldığından sayaçlarda saat tabanlı kilovatsaat tercih edilir.',
    ] },
    { h: '3,6 milyon nereden geliyor?', p: [
      'Katsayı doğrudan birimlerin tanımından çıkar. Bir kilovat 1000 watt, bir saat 3600 saniyedir. Dolayısıyla 1 kWh = 1000 W × 3600 s = 3.600.000 W·s = 3.600.000 J. Bu değer bir ölçüm sonucu değil, tanımdır; yuvarlama içermez.',
      'Formüller: <strong>J = kWh × 3.600.000</strong> ve <strong>kWh = J ÷ 3.600.000</strong>. Megajoule ile çalışmak daha rahattır: 1 kWh = 3,6 MJ ve 1 MJ ≈ 0,2778 kWh.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Aylık fatura:</strong> Bir evin aylık tüketimi 250 kWh olsun. 250 × 3.600.000 = 900.000.000 J, yani 900 MJ. Araçta 250 yazıp "Kilovatsaat → Joule" seçtiğinizde bu sonucu görürsünüz.',
      '<strong>Fizik sorusu:</strong> Bir sistemin bir milyar joule (1e9 J) enerji harcadığı verilmişse bunun elektrik karşılığı 1.000.000.000 ÷ 3.600.000 = 277,77778 kWh\'dir.',
      '<strong>Küçük değer:</strong> Yarım kilovatsaat 1.800.000 J, yani 1,8 MJ eder. Tek bir joule ise 2,7777778 × 10^-7 kWh gibi çok küçük bir değerdir; araç bu tür sonuçları 10 üssüyle gösterir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>1 Wh</strong> = 3600 J = 3,6 kJ',
      '<strong>1 kWh</strong> = 3.600.000 J = 3600 kJ = 3,6 MJ',
      '<strong>10 kWh</strong> = 36 MJ',
      '<strong>100 kWh</strong> = 360 MJ',
      '<strong>1 MWh</strong> = 3600 MJ = 3,6 GJ',
      '<strong>1 MJ</strong> ≈ 0,2778 kWh',
      '<strong>1 GJ</strong> ≈ 277,78 kWh',
    ] },
    { h: 'kW ile kWh karışıklığı', p: [
      'Kilovat (kW) bir cihazın anlık gücünü, kilovatsaat (kWh) ise belirli bir sürede tüketilen enerjiyi gösterir. Aralarındaki ilişki zamandır: enerji = güç × süre. "Kilovat/saat" biçimindeki yazım yanlıştır, çünkü birim bölme değil çarpma içerir. Bir cihazın etiketindeki watt değerini joule\'e çevirmek için önce kaç saniye ya da kaç saat çalıştığını bilmeniz gerekir; güç tek başına enerjiye çevrilemez.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Fizik derslerinde elektrik enerjisi soruları çoğunlukla joule ile çözülür, ama günlük hayattaki karşılığı kWh\'dir; iki dünya arasındaki köprü bu çeviridir. Doğal gaz, yakıt ve ısı enerjisi hesaplarında megajoule ve gigajoule yaygındır; farklı enerji kaynaklarını elektrikle karşılaştırmak için hepsini ortak bir birime, çoğunlukla kWh\'ye taşımak gerekir.',
      'Batarya kapasiteleri watt-saat ya da kilovatsaat olarak verilir. Elektrikli araç bataryasındaki 60 kWh\'lik depolama 216 MJ enerjiye karşılık gelir. Güneş paneli üretimi, ısı pompası verimi ve enerji kimlik belgelerindeki yıllık tüketim değerleri de aynı dönüşümle karşılaştırılabilir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'İlk hata, sıfır sayısını şaşırmaktır: 1 kWh üç milyon altı yüz bin joule\'dür, üç bin altı yüz değil. 3600 J yalnızca bir watt-saatin karşılığıdır. Emin olamadığınızda megajoule üzerinden düşünmek işi kolaylaştırır; kWh değerini 3,6 ile çarpmak MJ verir.',
      'İkinci hata, sonuçtaki noktaları ondalık sanmaktır. Bu sayfada nokta binlik ayraçtır; "3.600.000 J" üç milyon altı yüz bin joule demektir. Üçüncü hata ise yıllık ve aylık tüketimi karıştırmaktır: faturadaki değer bir dönem içindir, enerji kimlik belgesi gibi belgelerdeki değer ise çoğunlukla yıllıktır. Çevirmeden önce sayının hangi süreye ait olduğunu kontrol edin.',
      'Son olarak, joule ile çalışan fizik sorularında süreyi saniyeye çevirmeyi unutmayın. 100 W\'lık bir lamba 2 saatte 100 × 7200 = 720.000 J harcar; bu da 0,2 kWh eder. Süreyi saat olarak bırakıp watt ile çarparsanız joule değil watt-saat bulursunuz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca birim dönüştürür; verim kayıplarını, şebeke kayıplarını ya da tarife fiyatlarını hesaba katmaz. Negatif değer kabul edilmez. Fatura tutarı hesaplamak için güncel birim fiyatları tedarikçinizden ya da faturanızdan öğrenmeniz gerekir.',
    ] },
  ],
  faq: [
    ['1 kWh kaç joule eder?', '1 kilovatsaat tam olarak 3.600.000 joule, yani 3,6 megajoule\'dür. Değer, 1000 watt ile 3600 saniyenin çarpımından gelir.'],
    ['1 joule kaç kWh eder?', '1 joule yaklaşık 0,000000278 kWh\'dir; bilimsel gösterimle 2,7778 × 10^-7 kWh. Bu yüzden elektrik tüketiminde joule yerine kilovatsaat kullanılır.'],
    ['1 MJ kaç kWh eder?', '1 megajoule 1 ÷ 3,6 = 0,2778 kWh\'dir. Tersine 1 kWh 3,6 MJ eder.'],
    ['Watt-saat ile kilovatsaat arasındaki fark nedir?', '1 kilovatsaat 1000 watt-saattir. Telefon ve dizüstü bataryaları gibi küçük kapasiteler Wh, ev tüketimi ve araç bataryaları kWh ile ifade edilir.'],
    ['Gücü (kW) doğrudan joule\'e çevirebilir miyim?', 'Hayır. Güç ile enerji farklı büyüklüklerdir. Önce gücü çalışma süresiyle çarpıp enerjiyi (kWh) bulmanız, sonra joule\'e çevirmeniz gerekir.'],
    ['Faturamdaki kWh değerini neden joule\'e çevireyim?', 'Farklı enerji türlerini karşılaştırırken ortak birim gerekir. Doğal gaz, odun ya da akaryakıtın ısıl değeri çoğunlukla megajoule ile verildiği için elektrik tüketimini MJ\'ye çevirmek karşılaştırmayı kolaylaştırır.'],
    ['Sonuçtaki "× 10^-7" ne anlama geliyor?', 'Bu bilimsel gösterimdir. 2,78 × 10^-7, ondalık virgülün yedi basamak sola kaydırılması, yani 0,000000278 demektir. Çok küçük ve çok büyük sayılar okunabilir kalsın diye bu biçim kullanılır.'],
    ['Yazdıklarım bir sunucuya gidiyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; girdiğiniz değerler kaydedilmez ve hiçbir yere iletilmez.'],
  ],
  related: ['joule-watt-saat-cevir', 'kwh-kcal-cevir', 'kw-watt-cevir', 'elektrik-tuketim-hesapla', 'kalori-joule-cevir'],
};
