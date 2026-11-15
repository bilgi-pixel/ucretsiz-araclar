export default {
  slug: 'kw-watt-cevir',
  title: 'Kilovat Watt Çevirici',
  h1Tail: 'kW ↔ W',
  pageTitle: 'Kilovat Watt Çevirici – kW\'den Watt\'a, Watt\'tan kW\'ye Çevirme',
  description: 'Kilovatı watta, wattı kilovata çevirin. 1 kW = 1000 W eşitliğiyle çalışır; megavat karşılığını ve cihazın bir saatte harcayacağı enerjiyi (kWh) de gösterir.',
  card: 'Kilovatı watta, wattı kilovata çevirin; megavat karşılığını ve bir saatlik tüketimi kWh olarak görün.',
  category: 'birim',
  keywords: ['kw watt çevirme', '1 kw kaç watt', 'watt kw dönüştürme', '1000 watt kaç kw', 'kilovat watt', 'watt kilovat hesaplama', '2000 watt kaç kw'],
  lead: 'Bir gücü kilovattan (kW) watta (W) ya da watttan kilovata çevirin. <strong>1 kW = 1000 W</strong> olduğundan işlem bin ile çarpma ya da bölmedir; araç ayrıca megavat karşılığını ve cihazın bir saat çalıştığında harcayacağı enerjiyi verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Güç', type: 'number', placeholder: 'Örn. 2,5', hint: 'Ondalık için virgül kullanın. Tek noktalı yazım da ondalık sayılır: 1.500 = 1,5.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kw', 'Kilovat → Watt'], ['w', 'Watt → Kilovat']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const w = v.yon === 'w' ? x : x * 1000;
    const wRow = ['Watt', h.sig(w, 10) + ' W'];
    const kwRow = ['Kilovat', h.sig(w / 1000, 10) + ' kW'];
    return {
      rows: [
        ...(v.yon === 'w' ? [kwRow, wRow] : [wRow, kwRow]),
        ['Megavat', h.sig(w / 1e6, 10) + ' MW'],
        ['Bir saatte harcanan enerji', h.sig(w / 1000, 10) + ' kWh'],
      ],
      note: '1 kW = 1000 W. Enerji satırı, cihazın bu güçte kesintisiz bir saat çalıştığı varsayımıyla hesaplanır.',
    };
  },
  cases: [
    { in: { deger: '2,5', yon: 'kw' }, out: { 'Watt': '2.500 W', 'Megavat': '0,0025 MW' } },
    { in: { deger: '1500', yon: 'w' }, out: { 'Kilovat': '1,5 kW', 'Bir saatte harcanan enerji': '1,5 kWh' } },
    { in: { deger: '1', yon: 'kw' }, out: { 'Watt': '1.000 W', 'Megavat': '0,001 MW' } },
    { in: { deger: '60', yon: 'w' }, out: { 'Kilovat': '0,06 kW' } },
    { in: { deger: '2000', yon: 'w' }, out: { 'Kilovat': '2 kW', 'Bir saatte harcanan enerji': '2 kWh' } },
    { in: { deger: '0,75', yon: 'kw' }, out: { 'Watt': '750 W' } },
    { in: { deger: '0', yon: 'kw' }, out: { 'Watt': '0 W' } },
    { in: { deger: '2 kW', yon: 'kw' }, error: true },
    { in: { deger: '-100', yon: 'w' }, error: true },
  ],
  howto: [
    'Cihazın etiketinde, kataloğunda ya da faturanızdaki sözleşme gücü satırında yazan değeri "Güç" alanına girin.',
    'Değer kilovat ise "Kilovat → Watt", watt ise "Watt → Kilovat" yönünü seçin.',
    '"Çevir" düğmesine basın. Karşılık gelen değer ilk satırda, megavat ve bir saatlik enerji tüketimi alt satırlarda görünür.',
    'Birden fazla cihazın toplam gücünü bulmak için hepsini aynı birime çevirip toplayın.',
  ],
  sections: [
    { h: 'Watt ve kilovat nedir?', p: [
      'Watt, gücün SI birimidir ve saniyede bir joule enerji aktarımını ifade eder. Adını buhar makinesini geliştiren James Watt\'tan alır. "Kilo" ön eki bin anlamına geldiğinden kilovat bin watt demektir; tıpkı kilogramın bin gram, kilometrenin bin metre olması gibi. Dolayısıyla çeviri bir birim değişikliği değil, yalnızca ondalık virgülün üç basamak kaydırılmasıdır.',
      'Küçük cihazların gücü watt ile yazılır: LED ampul, telefon şarj aleti, televizyon, dizüstü bilgisayar. Güç büyüdükçe sayılar uzamasın diye kilovata geçilir: klima, fırın, şofben, kombi, elektrikli araç şarj istasyonu ve motorlar. Santral ölçeğinde ise megavat (bir milyon watt) kullanılır.',
    ] },
    { h: 'Formül', p: [
      'Kilovattan watta: <strong>W = kW × 1000</strong>. Watttan kilovata: <strong>kW = W ÷ 1000</strong>. Pratikte kW değerinde virgülü üç basamak sağa, watt değerinde üç basamak sola kaydırırsınız: 2,5 kW = 2500 W; 60 W = 0,06 kW.',
      'Kısaltmaların yazımı da önemlidir. Kilo ön eki küçük "k", watt ise büyük "W" ile yazılır: doğru yazım <strong>kW</strong>\'dir. Büyük "M" mega (milyon), küçük "m" mili (binde bir) anlamına gelir; MW ile mW arasında bir milyar kat fark vardır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Klima:</strong> Etiketinde 2,5 kW yazan bir cihazın gücü 2,5 × 1000 = 2500 W\'tır.',
      '<strong>Ütü:</strong> 1500 W\'lık bir ütü 1500 ÷ 1000 = 1,5 kW eder. Bir saat kesintisiz çalışırsa 1,5 kWh enerji harcar.',
      '<strong>Ampul:</strong> 60 W\'lık bir ampul 0,06 kW\'tır; bir saatte 0,06 kWh, on saatte 0,6 kWh tüketir.',
      '<strong>Motor:</strong> 0,75 kW\'lık bir elektrik motoru 750 W gücündedir.',
    ] },
    { h: 'Ev cihazlarının yaklaşık güçleri', p: [
      'Aşağıdaki değerler tipik aralıklardır; gerçek güç markaya ve modele göre değişir, kesin değer için cihaz etiketine bakın.',
    ], ul: [
      '<strong>LED ampul:</strong> 5–15 W (0,005–0,015 kW)',
      '<strong>Dizüstü bilgisayar:</strong> 45–100 W (0,045–0,1 kW)',
      '<strong>Buzdolabı kompresörü:</strong> 100–200 W çalışırken',
      '<strong>Mikrodalga fırın:</strong> 800–1200 W (0,8–1,2 kW)',
      '<strong>Su ısıtıcı (kettle):</strong> 1800–2400 W (1,8–2,4 kW)',
      '<strong>Elektrikli fırın:</strong> 2000–3500 W (2–3,5 kW)',
      '<strong>Elektrikli şofben:</strong> 7000 W ve üzeri (7 kW+)',
    ] },
    { h: 'kW ile kWh arasındaki fark', p: [
      'En sık karıştırılan iki kavram bunlardır. Kilovat <strong>güçtür</strong>: cihazın belirli bir anda ne kadar hızlı enerji harcadığını gösterir. Kilovatsaat <strong>enerjidir</strong>: belirli bir süre boyunca toplam ne kadar harcandığını gösterir ve faturaya yansıyan budur. İkisini birbirine bağlayan süredir: enerji (kWh) = güç (kW) × süre (saat).',
      'Araçtaki "Bir saatte harcanan enerji" satırı bu ilişkiyi somutlaştırır. 2000 W, yani 2 kW gücündeki bir ısıtıcı bir saatte 2 kWh, üç saatte 6 kWh harcar. Termostatlı cihazlar sürekli tam güçte çalışmadığı için gerçek tüketim çoğu zaman bu üst sınırın altında kalır.',
    ] },
    { h: 'Nerelerde gerekir?', p: [
      'Bir prize ya da uzatma kablosuna takacağınız cihazların toplam gücünü hesaplarken hepsini aynı birime çevirmeniz gerekir. Jeneratör, kesintisiz güç kaynağı ya da güneş enerjisi invertörü seçerken cihaz listesi wattla, ürün kapasiteleri ise çoğunlukla kilovatla verilir. Elektrik aboneliğinde sözleşme gücü kW olarak belirlenir; evdeki cihazların watt değerlerini toplayıp kilovata çevirmek kurulu gücünüz hakkında fikir verir.',
      'Kapasite bazen kVA ile de verilir. kVA görünür güçtür ve güç faktörü hesaba katılmadan doğrudan kW\'ye eşit sayılamaz; bu dönüşüm için ayrı bir hesap gerekir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Birinci hata, binlik noktasını ondalık sanmak ya da tersini yapmaktır. Bir katalogda "1.500 W" yazıyorsa bu bin beş yüz watttır; bu araca ise 1500 olarak girilmelidir. İkinci hata, toplam güç hesabında birimleri karıştırmaktır: 2 kW\'lık bir ısıtıcı ile 800 W\'lık bir mikrodalganın toplamı 802 değil, 2800 W ya da 2,8 kW\'tır.',
      'Üçüncü hata, etiketteki azami gücü sürekli tüketim sanmaktır. Çamaşır makinesi, fırın ve klima gibi cihazlar çalışma süresinin yalnızca bir bölümünde etiket gücüne ulaşır. Fatura tahmini için güç değerini değil, cihazın enerji etiketindeki çevrim ya da yıllık tüketim değerini kullanmak daha gerçekçi sonuç verir.',
    ] },
    { h: 'Uyarı', p: [
      'Bu sayfa yalnızca birim çevirir. Priz, kablo, sigorta ve tesisat kapasitesiyle ilgili kararlar yalnızca toplam watt değerine göre verilmez; akım, kablo kesiti, eşzamanlı kullanım ve güvenlik payı da hesaba katılır. Tesisat işleri için yetkili bir elektrikçiye danışın.',
    ] },
  ],
  faq: [
    ['1 kW kaç watt eder?', '1 kilovat 1000 watttır. Buna göre 2 kW 2000 W, 0,5 kW 500 W eder.'],
    ['1000 watt kaç kW eder?', '1000 watt tam olarak 1 kilovattır. Watt değerini 1000\'e bölerek kilovata çevirirsiniz.'],
    ['2000 watt kaç kW eder ve saatte ne kadar harcar?', '2000 W, 2 kW\'tır. Cihaz bir saat boyunca tam güçte çalışırsa 2 kWh elektrik harcar.'],
    ['kW mi büyük, watt mı?', 'Kilovat daha büyük birimdir; bir kilovat bin watta eşittir.'],
    ['kW ile kWh aynı şey mi?', 'Hayır. kW anlık gücü, kWh ise zaman içinde tüketilen enerjiyi gösterir. Güç ile çalışma süresinin (saat) çarpımı kWh\'yi verir.'],
    ['1 MW kaç kW eder?', '1 megavat 1000 kilovat, yani 1.000.000 watttır.'],
    ['kVA değerini bu araçla kW\'ye çevirebilir miyim?', 'Hayır. kVA görünür güçtür; kW\'ye çevirmek için güç faktörüyle çarpmak gerekir. Bu araç yalnızca watt ve kilovat arasında çeviri yapar.'],
    ['1.500 yazdığımda neden 1,5 olarak okunuyor?', 'Araç tek noktalı sayıları ondalık kabul eder. Bin beş yüz watt için 1500 yazın.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır ve yazdıklarınız hiçbir sunucuya gönderilmez.'],
  ],
  related: ['watt-beygir-cevir', 'beygir-kw-cevir', 'kva-kw-cevir', 'kw-amper-cevir', 'elektrik-tuketim-hesapla', 'kwh-joule-cevir'],
};
