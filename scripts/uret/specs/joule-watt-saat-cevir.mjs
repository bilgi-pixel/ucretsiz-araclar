export default {
  slug: 'joule-watt-saat-cevir',
  title: 'Joule Watt-saat Çevirici',
  h1Tail: 'J ↔ Wh',
  pageTitle: 'Joule Watt-saat Çevirici – J\'den Wh\'ye Enerji Çevirme',
  description: 'Joule değerini watt-saate, watt-saati joule\'e çevirin. 1 Wh = 3.600 J eşitliğiyle çalışır; kilojoule ve kilowatt-saat karşılığını da gösterir.',
  card: 'Joule\'ü watt-saate, watt-saati joule\'e çevirin; kilojoule ve kilowatt-saat karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['joule watt saat çevirme', '1 wh kaç joule', 'joule wh dönüştürme', 'watt saat joule hesaplama', '3600 joule kaç wh', 'wh to joule', 'powerbank wh joule'],
  lead: 'Enerjiyi joule\'den watt-saate ya da watt-saatten joule\'e çevirin. Bir watt, saniyede bir joule demek olduğundan <strong>1 Wh = 3.600 J</strong> eşitliği tam değerdir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Enerji', type: 'number', placeholder: 'Örn. 3600' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['j', 'Joule → Watt-saat'], ['wh', 'Watt-saat → Joule']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Enerji');
    const j = v.yon === 'wh' ? x * 3600 : x;
    const wh = v.yon === 'wh' ? x : x / 3600;
    const satirWh = ['Watt-saat', h.sig(wh, 8) + ' Wh'];
    const satirJ = ['Joule', h.sig(j, 8) + ' J'];
    return {
      rows: [
        v.yon === 'wh' ? satirJ : satirWh,
        v.yon === 'wh' ? satirWh : satirJ,
        ['Kilojoule', h.sig(j / 1000, 8) + ' kJ'],
        ['Kilowatt-saat', h.sig(wh / 1000, 8) + ' kWh'],
      ],
      note: '1 Wh = 3.600 J, 1 kWh = 3.600.000 J = 3,6 MJ (tam değer). Sonuçlar sekiz anlamlı basamağa kadar gösterilir.',
    };
  },
  cases: [
    { in: { deger: '3600', yon: 'j' }, out: { 'Watt-saat': '1 Wh', 'Kilojoule': '3,6 kJ', 'Kilowatt-saat': '0,001 kWh' } },
    { in: { deger: '1', yon: 'wh' }, out: { 'Joule': '3.600 J', 'Kilojoule': '3,6 kJ' } },
    { in: { deger: '1000', yon: 'wh' }, out: { 'Joule': '3.600.000 J', 'Kilowatt-saat': '1 kWh', 'Kilojoule': '3.600 kJ' } },
    { in: { deger: '18000', yon: 'j' }, out: { 'Watt-saat': '5 Wh' } },
    { in: { deger: '50', yon: 'wh' }, out: { 'Joule': '180.000 J', 'Kilojoule': '180 kJ', 'Kilowatt-saat': '0,05 kWh' } },
    { in: { deger: '12,5', yon: 'wh' }, out: { 'Joule': '45.000 J' } },
    { in: { deger: '1', yon: 'j' }, out: { 'Watt-saat': '0,00027777778 Wh' } },
    { in: { deger: '0', yon: 'j' }, out: { 'Watt-saat': '0 Wh' } },
    { in: { deger: '-10', yon: 'j' }, error: true },
    { in: { deger: 'enerji', yon: 'wh' }, error: true },
  ],
  howto: [
    '"Enerji" alanına çevirmek istediğiniz değeri yazın. Ondalık için virgül kullanın; binlik ayraç koymadan yazmanız en güvenlisidir.',
    '"Çeviri yönü" listesinden joule\'den watt-saate mi, watt-saatten joule\'e mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, ardından kilojoule ve kilowatt-saat değerleri görünür.',
    'Sonucu rapora ya da ödeve aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Joule ve watt-saat neyi ölçer?', p: [
      'İkisi de enerji birimidir; yalnızca ölçekleri ve kullanıldıkları yerler farklıdır. Joule (J), Uluslararası Birim Sistemi\'nin enerji birimidir: bir newtonluk kuvvetin bir cismi bir metre itmesiyle yapılan iş bir joule eder. Fizik, kimya ve mühendislik formüllerinde enerji hemen her zaman joule ile yazılır.',
      'Watt-saat (Wh) ise güç ile sürenin çarpımıdır: bir watt gücündeki bir cihazın bir saat çalıştığında harcadığı enerji. Elektrik sayaçları, piller, bataryalar ve güneş panelleri bu birimle ya da bin katı olan kilowatt-saat (kWh) ile konuşur, çünkü "kaç watt, kaç saat" sorusuna doğrudan yanıt verir. Dikkat edilmesi gereken nokta, watt-saatin "watt bölü saat" değil, "watt çarpı saat" olduğudur.',
    ] },
    { h: 'Çeviri formülü nereden gelir?', p: [
      'Watt, saniyede bir joule enerji aktarımıdır: 1 W = 1 J/s. Bir saat 3.600 saniye olduğuna göre bir watt-saat, 1 J/s × 3.600 s = 3.600 joule eder. Buradan <strong>J = Wh × 3.600</strong> ve <strong>Wh = J ÷ 3.600</strong> eşitlikleri çıkar. Katsayı bir ölçüm sonucu değil, tanımların doğrudan sonucudur; bu nedenle çeviri tam değerlidir.',
      'Büyük ölçekte aynı ilişki 1 kWh = 3.600.000 J = 3,6 megajoule (MJ) olarak yazılır. Araç her sonucu kilojoule ve kilowatt-saat olarak da gösterir; böylece hem küçük pil değerlerini hem de fatura ölçeğindeki tüketimleri rahatça okuyabilirsiniz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir kondansatör deneyinde 18.000 J enerji hesaplanıyor. Watt-saat karşılığı 18.000 ÷ 3.600 = 5 Wh. Bu, 5 watt\'lık bir LED ampulü bir saat yakmaya yetecek enerjidir.',
      '<strong>Örnek 2:</strong> Bir dizüstü bilgisayar bataryasının etiketinde 50 Wh yazıyor. Joule olarak 50 × 3.600 = 180.000 J, yani 180 kJ. Kilowatt-saat cinsinden 0,05 kWh eder.',
      '<strong>Örnek 3:</strong> 1.000 Wh\'lik bir taşınabilir güç istasyonu tam olarak 1 kWh, yani 3.600.000 J enerji depolar. Kuramsal olarak 100 watt çeken bir cihazı 10 saat besleyebilir; uygulamada dönüştürücü kayıpları nedeniyle süre biraz daha kısa olur.',
    ] },
    { h: 'Pil ve powerbank etiketlerini okumak', p: [
      'Taşınabilir şarj cihazları çoğunlukla miliamper-saat (mAh) ile pazarlanır, fakat mAh bir enerji değil, yük birimidir; enerjiyi bulmak için gerilimle çarpmak gerekir: <strong>Wh = mAh × V ÷ 1.000</strong>. Hücre gerilimi 3,7 V olan 10.000 mAh\'lik bir powerbank, 10.000 × 3,7 ÷ 1.000 = 37 Wh enerji taşır; bu da 133.200 joule eder. Aynı mAh değerine sahip iki batarya, gerilimleri farklıysa farklı miktarda enerji depolar. Bu yüzden bataryaları karşılaştırmanın sağlıklı yolu watt-saat değerine bakmaktır.',
      'Havayolu şirketleri kabine alınabilecek lityum bataryalar için sınırları genellikle watt-saat üzerinden belirtir. Sınır değerleri şirkete ve kurallara göre değişebildiğinden, yolculuk öncesinde havayolunuzun güncel kurallarını kontrol edin; bataryanızın üzerinde yalnızca mAh yazıyorsa yukarıdaki formülle Wh değerini bulabilirsiniz.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 J</strong> ≈ 0,000278 Wh',
      '<strong>1 kJ</strong> ≈ 0,2778 Wh',
      '<strong>3.600 J</strong> = 1 Wh',
      '<strong>1 MJ</strong> ≈ 277,78 Wh',
      '<strong>10 Wh</strong> = 36.000 J = 36 kJ',
      '<strong>100 Wh</strong> = 360.000 J = 360 kJ',
      '<strong>1 kWh</strong> = 3.600.000 J = 3,6 MJ',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Birinci hata, güç ile enerjiyi karıştırmaktır. Watt bir güç birimidir, yani enerjinin ne hızla harcandığını söyler; watt-saat ve joule ise harcanan toplam enerjidir. "Bu cihaz saatte 100 watt yakıyor" cümlesi teknik olarak yanlıştır; doğrusu "100 watt çekiyor, bir saatte 100 watt-saat tüketiyor" olur. İkinci hata, joule\'ü watt-saate çevirirken 3.600 yerine 60\'a bölmektir; bu, saati dakikayla karıştırmaktan kaynaklanır ve sonucu altmış kat büyütür.',
      'Üçüncü hata, watt-saniye ile watt-saati karıştırmaktır. Fotoğraf flaşlarında görülen watt-saniye (Ws) doğrudan joule\'e eşittir: 1 Ws = 1 J. Dördüncü olarak, besin etiketlerindeki enerji değerleri kilojoule ve kilokalori ile verilir; 1 Wh aynı zamanda 3,6 kJ olduğundan bu araçla kilojoule değerini watt-saate çevirmek için değeri 1.000 ile çarpıp joule olarak girmeniz yeterlidir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif enerji kabul etmez. Sonuçlar sekiz anlamlı basamağa kadar gösterilir; çok küçük ya da çok büyük değerlerde bilimsel gösterime geçilir. Buradaki çeviri yalnızca birim dönüşümüdür: bir cihazın gerçek çalışma süresi verim, sıcaklık, bataryanın yaşı ve çekilen akım gibi etkenlere bağlıdır. Elektrik tesisatı, batarya paketi tasarımı ya da enerji maliyeti gibi kararlar için sonuçları yalnızca bilgilendirme amaçlı kullanın ve gerektiğinde bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['1 watt-saat kaç joule eder?', '1 watt-saat tam olarak 3.600 joule eder. Çünkü 1 watt saniyede 1 joule demektir ve bir saatte 3.600 saniye vardır.'],
    ['1 joule kaç watt-saattir?', '1 joule, 1 ÷ 3.600 ≈ 0,000278 watt-saattir. Joule gündelik elektrik tüketimine göre çok küçük bir birim olduğu için faturalar kilowatt-saat ile hesaplanır.'],
    ['1 kWh kaç joule eder?', '1 kilowatt-saat 3.600.000 joule, yani 3,6 megajoule eder. Bir kilowatt-saat bin watt-saattir.'],
    ['Watt ile watt-saat arasındaki fark nedir?', 'Watt güçtür, yani enerjinin birim zamanda harcanma hızıdır. Watt-saat ise enerjidir: gücün süreyle çarpımı. 60 watt\'lık bir cihaz iki saat çalışırsa 120 watt-saat enerji tüketir.'],
    ['mAh değerini watt-saate nasıl çeviririm?', 'mAh değerini bataryanın anma gerilimiyle çarpıp 1.000\'e bölün. Örneğin 3,7 V ve 5.000 mAh\'lik bir batarya 18,5 Wh eder; bu da 66.600 joule demektir.'],
    ['Watt-saniye ile joule aynı mı?', 'Evet. 1 watt-saniye tam olarak 1 joule\'dür. Stüdyo flaşlarında enerji bu yüzden watt-saniye ya da joule olarak belirtilir; ikisi aynı sayıdır.'],
    ['Joule mü watt-saat mi kullanmalıyım?', 'Fizik ve kimya hesaplarında joule, elektrik tüketimi ve batarya kapasitesinde watt-saat ya da kilowatt-saat kullanmak alışılmıştır. İkisi aynı niceliği ölçtüğü için istediğiniz zaman 3.600 katsayısıyla birinden diğerine geçebilirsiniz.'],
    ['Yazdığım değer bir sunucuya gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz değer hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['kwh-joule-cevir', 'kalori-joule-cevir', 'kcal-kj-cevir', 'kwh-kcal-cevir', 'elektrik-tuketim-hesapla', 'guc-hesapla'],
};
