export default {
  slug: 'bavul-hacmi-hesapla',
  title: 'Bavul Hacmi (Litre) Hesaplama',
  h1Tail: 'ölçüden litreye',
  pageTitle: 'Bavul Hacmi Hesaplama – Valiz Ölçüsünden Litre ve Toplam Boyut',
  description: 'Bavulun en, boy ve derinlik ölçüsünden hacmini litre olarak hesaplayın. Havayollarının baktığı toplam boyutu (en + boy + derinlik) ve inç karşılığını görün.',
  card: 'Valizin santimetre ölçülerinden litre hacmini, kullanılabilir iç hacmi ve havayolu toplam boyutunu hesaplayın.',
  category: 'gunluk',
  keywords: ['bavul hacmi hesaplama', 'valiz kaç litre', 'bavul litre hesaplama', 'kabin boy valiz ölçüleri', 'valiz toplam boyut', 'bagaj ölçüsü hesaplama', '55x40x20 kaç litre'],
  lead: 'Bavulunuzun kaç litre olduğunu etiketi olmadan da bulabilirsiniz. En, boy ve derinliği santimetre olarak yazın; araç <strong>dış hacmi litre</strong> cinsinden, tahmini kullanılabilir iç hacmi, havayollarının kontrol ettiği toplam boyutu ve ölçülerin inç karşılığını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Yükseklik (cm)', type: 'number', placeholder: 'Örn. 55', hint: 'Tekerlek ve sap dahil, dik dururken' },
    { id: 'en', label: 'Genişlik (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'derinlik', label: 'Derinlik (cm)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'oran', label: 'Kullanılabilir iç hacim oranı (%)', type: 'number', value: '85', hint: 'Gövde kalınlığı, tekerlek yuvası ve sap borusu payı; emin değilseniz 85 bırakın' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Yükseklik');
    const en = h.pos(v.en, 'Genişlik');
    const der = h.pos(v.derinlik, 'Derinlik');
    const oran = h.pos(v.oran, 'Kullanılabilir iç hacim oranı');
    if (oran > 100) h.err('Kullanılabilir hacim oranı %100\'den büyük olamaz.');
    if (Math.max(boy, en, der) > 300) h.err('Ölçüler santimetre olarak girilmeli ve 300 cm\'yi aşmamalı; değerleri kontrol edin.');
    const litre = boy * en * der / 1000;
    const toplam = boy + en + der;
    const uzun = Math.max(boy, en, der);
    let sinif;
    if (uzun <= 45) sinif = 'Kişisel eşya / sırt çantası boyu';
    else if (uzun <= 56) sinif = 'Kabin boy';
    else if (uzun <= 70) sinif = 'Orta boy';
    else sinif = 'Büyük boy';
    const inc = (x) => h.fmt(x / 2.54, 1);
    return {
      rows: [
        ['Dış hacim', h.fmt(litre, 1) + ' L'],
        ['Tahmini iç hacim', h.fmt(litre * oran / 100, 1) + ' L'],
        ['Toplam boyut (en + boy + derinlik)', h.fmt(toplam, 1) + ' cm'],
        ['İnç ölçüleri', inc(boy) + ' × ' + inc(en) + ' × ' + inc(der) + ' inç'],
        ['Toplam boyut (inç)', inc(toplam) + ' inç'],
        ['Yaklaşık sınıf', sinif],
      ],
      note: 'Hacim dikdörtgen prizma kabulüyle bulunur; köşeleri yuvarlak valizlerde gerçek hacim biraz daha azdır. Bagaj sınırları havayoluna göre değişir.',
    };
  },
  cases: [
    { in: { boy: '55', en: '40', derinlik: '20', oran: '85' }, out: { 'Dış hacim': '44 L', 'Tahmini iç hacim': '37,4 L', 'Toplam boyut (en + boy + derinlik)': '115 cm', 'İnç ölçüleri': '21,7 × 15,7 × 7,9 inç', 'Yaklaşık sınıf': 'Kabin boy' } },
    { in: { boy: '68', en: '45', derinlik: '28', oran: '85' }, out: { 'Dış hacim': '85,7 L', 'Tahmini iç hacim': '72,8 L', 'Toplam boyut (en + boy + derinlik)': '141 cm', 'Yaklaşık sınıf': 'Orta boy' } },
    { in: { boy: '78', en: '52', derinlik: '32', oran: '85' }, out: { 'Dış hacim': '129,8 L', 'Tahmini iç hacim': '110,3 L', 'Toplam boyut (en + boy + derinlik)': '162 cm', 'Yaklaşık sınıf': 'Büyük boy' } },
    { in: { boy: '55', en: '40', derinlik: '23', oran: '100' }, out: { 'Dış hacim': '50,6 L', 'Tahmini iç hacim': '50,6 L', 'Toplam boyut (en + boy + derinlik)': '118 cm' } },
    { in: { boy: '40', en: '30', derinlik: '15', oran: '85' }, out: { 'Dış hacim': '18 L', 'Toplam boyut (en + boy + derinlik)': '85 cm', 'Yaklaşık sınıf': 'Kişisel eşya / sırt çantası boyu' } },
    { in: { boy: '76,2', en: '50,8', derinlik: '25,4', oran: '85' }, out: { 'İnç ölçüleri': '30 × 20 × 10 inç', 'Toplam boyut (inç)': '60 inç' } },
    { in: { boy: '55', en: '40', derinlik: '0', oran: '85' }, error: true },
    { in: { boy: '55', en: '40', derinlik: '20', oran: '120' }, error: true },
  ],
  howto: [
    'Bavulu dik konuma getirin ve yerden en üst noktasına kadar ölçün; tekerlekleri ve içeri itilmiş sapı ölçüye dahil edin. Bu değeri "Yükseklik" alanına yazın.',
    'En geniş yerinden genişliği, en şişkin yerinden derinliği ölçüp ilgili alanlara girin. Yan tutamaklar ve dış cepler dolu haldeyken ölçmek daha gerçekçidir.',
    'Kullanılabilir iç hacim oranını değiştirmek istemiyorsanız 85 olarak bırakın. Yalnızca dış hacmi görmek için 100 yazabilirsiniz.',
    '"Hesapla" düğmesine basın. Litre değerini ürün karşılaştırmasında, toplam boyutu ise havayolu bagaj kurallarıyla kıyaslamada kullanın.',
  ],
  sections: [
    { h: 'Bavul hacmi nasıl hesaplanır?', p: [
      'Hacim, üç kenar uzunluğunun çarpımıdır. Ölçüler santimetre olduğunda sonuç santimetreküp çıkar; 1 litre 1.000 santimetreküp olduğundan sonucu bine bölmek yeterlidir: <strong>litre = yükseklik × genişlik × derinlik ÷ 1.000</strong>.',
      'Çözümlü örnek: kabin boy olarak satılan 55 × 40 × 20 cm ölçülerindeki bir valiz için 55 × 40 × 20 = 44.000 cm³, yani 44 litre bulunur. Kenarların toplamı 55 + 40 + 20 = 115 cm\'dir. Gövde, astar, tekerlek yuvaları ve teleskopik sapın boruları için yüzde 15 pay düşüldüğünde kullanılabilir hacim 44 × 0,85 = 37,4 litre olur. Araç bu örnek için aynı sonuçları verir.',
    ] },
    { h: 'Dış hacim ile etiketteki litre neden farklı?', p: [
      'Üreticilerin etikete yazdığı litre değeri çoğunlukla iç hacimdir ve dış ölçülerden hesaplanan değerden küçüktür. Bunun birkaç nedeni vardır: dış ölçüye tekerlekler ve sap dahildir ama bunlar eşya koyabileceğiniz hacim değildir; valizin köşeleri yuvarlaktır; teleskopik sapın boruları iç tabanda yer kaplar; sert kabuklu modellerde gövde ve astar kalınlığı da hacimden yer.',
      'Araçtaki "kullanılabilir iç hacim oranı" bu farkı kabaca yansıtmak için vardır. Varsayılan yüzde 85 bir başlangıç tahminidir; tekerlekleri gövdenin dışına taşan dört tekerlekli modellerde oran daha düşük, tekerleksiz kumaş çantalarda daha yüksek olabilir. Kesin değer için üreticinin beyan ettiği litreyi esas alın; elinizde böyle bir bilgi yoksa bu tahmin karşılaştırma yapmanıza yeter.',
    ] },
    { h: 'Toplam boyut ne işe yarar?', p: [
      'Havayolları bagaj sınırını iki biçimde tanımlar. Kabin bagajında genellikle üç ölçü ayrı ayrı verilir; her kenarın kendi sınırını aşmaması gerekir. Uçak altına verilen kayıtlı bagajda ise sıkça <strong>en + boy + derinlik toplamı</strong> için tek bir üst sınır konur. Uluslararası uçuşlarda 158 cm (62 inç) sık rastlanan bir sınırdır, ancak bu değer havayoluna, bilet sınıfına ve hatta göre değişir.',
      'Bu nedenle aracın verdiği toplam boyutu ve tek tek kenar ölçülerini, uçacağınız havayolunun güncel bagaj kurallarıyla karşılaştırmanız gerekir. Ağırlık sınırı ayrı bir kuraldır; hacmi uygun olan bir valiz ağırlık sınırını aşabilir.',
    ] },
    { h: 'Litreye göre yaklaşık kullanım rehberi', p: [
      'Aşağıdaki aralıklar piyasadaki yaygın adlandırmaya dayanır ve kişiden kişiye değişen kaba bir rehberdir. Mevsim, gidilen yerin iklimi ve çamaşır yıkama imkânı ihtiyacı belirgin biçimde değiştirir.',
    ], ul: [
      '<strong>20–30 litre:</strong> günlük sırt çantası ya da koltuk altı kişisel eşya; bir gecelik iş seyahati.',
      '<strong>35–45 litre:</strong> kabin boy valiz; iki-dört günlük kısa seyahatler.',
      '<strong>60–80 litre:</strong> orta boy valiz; bir haftalık tatil.',
      '<strong>90–120 litre ve üzeri:</strong> büyük boy valiz; iki hafta ve üzeri ya da iki kişinin ortak bavulu.',
    ] },
    { h: 'Doğru ölçüm için ipuçları', p: [
      'Havalimanındaki ölçü kalıbı valizin en dış noktalarını dikkate alır. Bu yüzden ölçerken tekerlekleri, üst ve yan tutamakları, dış cepleri ve varsa körük fermuarı açıkken oluşan şişkinliği hesaba katın. Kumaş valizler doldukça derinlik birkaç santimetre artabilir; boşken sınırın altında kalan bir valiz doluyken kalıba girmeyebilir.',
      'Şerit metreyi yere dik tutun ve valizi duvara yaslayarak ölçün; eğik tutulan metre ölçüyü olduğundan uzun gösterir. Yurt dışı sitelerinden alışverişte ölçüler inç olarak verilir; araç santimetre girdinizin inç karşılığını da gösterdiği için ürün sayfasındaki değerle doğrudan kıyaslayabilirsiniz. Örneğin 76,2 × 50,8 × 25,4 cm, tam olarak 30 × 20 × 10 inçtir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Hesap, valizi köşeleri keskin bir dikdörtgen prizma kabul eder; gerçek valizlerde köşe yuvarlaklığı nedeniyle dış hacim de bir miktar daha küçüktür. "Yaklaşık sınıf" satırı yalnızca en uzun kenara bakar: 56 cm\'ye kadar kabin boy, 70 cm\'ye kadar orta boy, üzeri büyük boy olarak adlandırılır. Bu adlandırma satış dilindeki genel kullanıma dayanır ve hiçbir havayolunun kabin bagajı onayı anlamına gelmez. Seyahatten önce bilet aldığınız firmanın bagaj koşullarını mutlaka kontrol edin.',
    ] },
  ],
  faq: [
    ['55 × 40 × 20 cm valiz kaç litredir?', 'Dış ölçülere göre 44 litredir. Tekerlek, sap ve gövde payı düşüldüğünde kullanılabilir hacim yaklaşık 35–40 litre arasında kalır.'],
    ['Kabin boy valiz kaç litre olur?', 'Kabin boy olarak satılan valizlerin çoğu 35 ile 45 litre arasındadır. Hacimden çok kenar ölçüleri önemlidir; havayolları litreye değil santimetreye bakar.'],
    ['Toplam boyut 158 cm ne demek?', 'Valizin en, boy ve derinliğinin toplamının 158 santimetreyi aşmaması demektir. Birçok havayolunun kayıtlı bagaj için kullandığı bir sınırdır; ancak her firma kendi kuralını belirler, bu yüzden biletinizin koşullarına bakın.'],
    ['Ölçüye tekerlekler dahil mi?', 'Evet. Havayolları dış ölçüyü tekerlek, sap ve cepler dahil olarak değerlendirir. Ürün sayfalarında bazen yalnızca gövde ölçüsü verilir; satın almadan önce toplam dış ölçüyü kontrol edin.'],
    ['Sırt çantası ya da spor çantası için de kullanılabilir mi?', 'Yaklaşık bir değer için evet. Çanta doluyken en, boy ve derinliği ölçün. Yumuşak çantalar dikdörtgen prizmadan uzak olduğu için gerçek hacim hesaplanandan belirgin biçimde küçük çıkabilir; iç hacim oranını 70–80 gibi daha düşük bir değere çekebilirsiniz.'],
    ['Körüklü valizde hangi ölçüyü yazmalıyım?', 'Valizi nasıl kullanacaksanız o haliyle ölçün. Körük açıkken derinlik birkaç santimetre artar ve hacim büyür, ancak kabin ölçü sınırını aşabilir. İki durumu ayrı ayrı hesaplayıp karşılaştırabilirsiniz.'],
    ['Litre ile kilogram arasında bağlantı var mı?', 'Doğrudan yoktur; ağırlık koyduğunuz eşyaya bağlıdır. Hacmi uygun olan bir valiz ağırlık sınırını aşabilir, bu yüzden bagajı ayrıca tartmanız gerekir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['koli-sigdirma-hesapla', 'cm-inc-cevir', 'desimetrekup-litre-cevir', 'ev-tasima-koli-hesapla', 'birim-donustur'],
};
