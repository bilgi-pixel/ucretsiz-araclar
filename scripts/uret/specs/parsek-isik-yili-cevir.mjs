export default {
  slug: 'parsek-isik-yili-cevir',
  title: 'Parsek Işık Yılı Çevirici',
  h1Tail: 'pc ↔ ışık yılı',
  pageTitle: `Parsek Işık Yılı Çevirici – 1 Parsek Kaç Işık Yılı Hesaplama`,
  description: `Parseği ışık yılına, ışık yılını parseğe çevirin. Kiloparsek, megaparsek ve astronomik birim desteklenir; kilometre karşılığı ve paralaks açısı da gösterilir.`,
  card: `Parsek, kiloparsek ve megaparseği ışık yılına çevirin; paralaks açısını ve kilometre karşılığını da görün.`,
  category: 'birim',
  keywords: ['parsek ışık yılı çevirme', '1 parsek kaç ışık yılı', 'ışık yılı kaç parsek', 'megaparsek ışık yılı', 'kiloparsek kaç ışık yılı', 'parsek kaç km', 'paralaks uzaklık hesaplama'],
  lead: `Yıldız ve gökada uzaklıklarını parsek (pc), kiloparsek (kpc), megaparsek (Mpc), ışık yılı ve astronomik birim (AB) arasında çevirin. Araç <strong>1 parsek ≈ 3,26156 ışık yılı</strong> ilişkisini tanımdan hesaplar; uzaklığa karşılık gelen paralaks açısını da verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzaklık', type: 'number', placeholder: 'Örn. 4,2465' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['pc', 'Parsek (pc)'], ['iy', 'Işık yılı'], ['kpc', 'Kiloparsek (kpc)'], ['mpc', 'Megaparsek (Mpc)'], ['ab', 'Astronomik birim (AB)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['iy', 'Işık yılı'], ['pc', 'Parsek (pc)'], ['kpc', 'Kiloparsek (kpc)'], ['mpc', 'Megaparsek (Mpc)'], ['ab', 'Astronomik birim (AB)']] },
  ],
  compute(v, h) {
    const AB_KM = 149597870.7;                    // astronomik birim, km (tam)
    const PC_KM = (648000 / Math.PI) * AB_KM;     // parsek tanımı: 648000/π AB
    const IY_KM = 9460730472580.8;                // ışık yılı: 299.792,458 km/s × 365,25 gün
    const birimler = {
      pc: [PC_KM, 'pc'],
      iy: [IY_KM, 'ışık yılı'],
      kpc: [PC_KM * 1e3, 'kpc'],
      mpc: [PC_KM * 1e6, 'Mpc'],
      ab: [AB_KM, 'AB'],
    };
    const x = h.pos(v.deger, 'Uzaklık');
    const k = birimler[v.kaynak] || birimler.pc;
    const t = birimler[v.hedef] || birimler.iy;
    const km = x * k[0];
    const yaz = (b) => h.sig(km / b[0], 6) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Parsek', yaz(birimler.pc)],
        ['Işık yılı', yaz(birimler.iy)],
        ['Astronomik birim', yaz(birimler.ab)],
        ['Kilometre', h.sig(km, 6) + ' km'],
        ['Paralaks açısı', h.sig(PC_KM / km, 6) + ' yay saniyesi'],
      ],
      note: '1 pc = 648000/π AB ≈ 3,26156 ışık yılı. Sonuçlar altı anlamlı basamağa yuvarlanır. Paralaks açısı, yay saniyesi cinsinden 1 ÷ uzaklık (parsek) bağıntısıyla bulunur.',
    };
  },
  cases: [
    { in: { deger: '1', kaynak: 'pc', hedef: 'iy' }, out: { 'Sonuç': '3,26156 ışık yılı', 'Astronomik birim': '206.265 AB', 'Kilometre': '30.856.800.000.000 km', 'Paralaks açısı': '1 yay saniyesi' } },
    { in: { deger: '4,2465', kaynak: 'iy', hedef: 'pc' }, out: { 'Sonuç': '1,30198 pc', 'Paralaks açısı': '0,768059 yay saniyesi' } },
    { in: { deger: '1', kaynak: 'iy', hedef: 'pc' }, out: { 'Sonuç': '0,306601 pc', 'Astronomik birim': '63.241,1 AB' } },
    { in: { deger: '10', kaynak: 'pc', hedef: 'iy' }, out: { 'Sonuç': '32,6156 ışık yılı', 'Paralaks açısı': '0,1 yay saniyesi' } },
    { in: { deger: '1', kaynak: 'kpc', hedef: 'iy' }, out: { 'Sonuç': '3.261,56 ışık yılı', 'Parsek': '1.000 pc' } },
    { in: { deger: '1', kaynak: 'mpc', hedef: 'iy' }, out: { 'Sonuç': '3.261.560 ışık yılı', 'Parsek': '1.000.000 pc' } },
    { in: { deger: '8,6', kaynak: 'iy', hedef: 'pc' }, out: { 'Sonuç': '2,63677 pc', 'Paralaks açısı': '0,379252 yay saniyesi' } },
    { in: { deger: '0', kaynak: 'pc', hedef: 'iy' }, error: true },
    { in: { deger: 'yakın', kaynak: 'pc', hedef: 'iy' }, error: true },
  ],
  howto: [
    `"Uzaklık" alanına değeri yazın; ondalık için virgül kullanın (örn. 4,2465).`,
    `"Girilen birim" listesinden değerin birimini seçin: parsek, ışık yılı, kiloparsek, megaparsek ya da astronomik birim.`,
    `"Çevrilecek birim" listesinden hedef birimi belirleyin.`,
    `"Çevir" düğmesine basın. İlk satır seçtiğiniz birimdeki sonucu gösterir.`,
    `Alt satırlardan parsek, ışık yılı, astronomik birim ve kilometre karşılıklarını, son satırdan da bu uzaklıktaki bir yıldızın paralaks açısını okuyun.`,
  ],
  sections: [
    { h: 'Parsek nedir, adı nereden gelir?', p: [
      `Parsek, "paralaks" ve "saniye" sözcüklerinin birleşmesinden türemiş bir uzaklık birimidir. Dünya Güneş'in çevresinde dolanırken yakın yıldızlar, çok uzaktaki art alan yıldızlarına göre gökyüzünde küçük bir ileri geri kayma gösterir. Bu kaymanın yarısına paralaks açısı denir. Paralaks açısı tam bir yay saniyesi olan, yani bir derecenin 3.600'de biri kadar kayan bir yıldızın uzaklığı 1 parsektir.`,
      `Geometrik olarak parsek, bir astronomik birimlik tabanın bir yay saniyelik açıyla görüldüğü uzaklıktır. Uluslararası Astronomi Birliği bu tanımı sabit bir sayıya bağlamıştır: <strong>1 pc = 648.000 ÷ π AB</strong>, yani yaklaşık 206.265 astronomik birim. Kilometre cinsinden bu yaklaşık 3,0857 × 10<sup>13</sup> km, bir başka deyişle yaklaşık 30,9 trilyon kilometredir.`,
    ] },
    { h: 'Işık yılı ile parsek arasındaki çeviri', p: [
      `Işık yılı, ışığın boşlukta 365,25 günlük bir Jülyen yılında aldığı yoldur ve yaklaşık 9,4607 × 10<sup>12</sup> km eder. İki birimin oranı alındığında <strong>1 parsek ≈ 3,26156 ışık yılı</strong> ve <strong>1 ışık yılı ≈ 0,306601 parsek</strong> bulunur. Parsekten ışık yılına geçmek için 3,26156 ile çarpar, ışık yılından parseğe geçmek için aynı sayıya bölersiniz.`,
      `Örnek: Güneş'e en yakın yıldız olan Proxima Centauri yaklaşık 4,2465 ışık yılı uzaklıktadır. Parsek karşılığı 4,2465 ÷ 3,26156 ≈ <strong>1,30198 pc</strong> olur. Bu uzaklıktaki bir yıldızın paralaks açısı 1 ÷ 1,30198 ≈ 0,768 yay saniyesidir; en yakın yıldızın bile kayması bir yay saniyesinin altında kalır. İkinci örnek: 10 parsek, 10 × 3,26156 = 32,6156 ışık yılı eder. Bu uzaklık, yıldızların gerçek parlaklıklarını karşılaştırmak için kullanılan mutlak kadir tanımındaki standart mesafedir.`,
    ] },
    { h: 'Paralakstan uzaklık bulmak', p: [
      `Parseğin gökbilimciler arasında ışık yılından daha çok tercih edilmesinin nedeni, ölçülen büyüklükle doğrudan bağlantılı olmasıdır. Paralaks açısı yay saniyesi olarak ölçüldüğünde uzaklık parsek cinsinden yalnızca tersini almakla bulunur: <strong>d = 1 ÷ p</strong>. Paralaksı 0,1 yay saniyesi olan yıldız 10 parsek, 0,01 yay saniyesi olan yıldız 100 parsek uzaktadır.`,
      `Araçtaki "Paralaks açısı" satırı bu bağıntıyı tersinden uygular. Açı küçüldükçe ölçüm zorlaşır ve göreli hata büyür; bu nedenle çok uzak cisimlerin uzaklığı paralaksla değil, parlaklığı bilinen yıldız türleri ve kırmızıya kayma gibi dolaylı yöntemlerle belirlenir.`,
    ] },
    { h: 'Kiloparsek ve megaparsek ne zaman kullanılır?', p: [
      `Parsek komşu yıldızlar için uygundur, ama gökada ölçeğinde sayılar yine büyür. Bu yüzden bin parsek için kiloparsek (kpc), bir milyon parsek için megaparsek (Mpc) kullanılır. 1 kpc yaklaşık 3.261,56 ışık yılı, 1 Mpc yaklaşık 3,26 milyon ışık yılıdır.`,
    ], ul: [
      `<strong>Yakın yıldızlar:</strong> birkaç parsek. Sirius yaklaşık 2,64 pc, yani yaklaşık 8,6 ışık yılı uzaktadır.`,
      `<strong>Samanyolu'nun merkezi:</strong> Güneş'e yaklaşık 8 kpc, yani 26 bin ışık yılı dolayında.`,
      `<strong>Samanyolu diskinin çapı:</strong> on binlerce parsek mertebesinde; ışık yılıyla yüz bin dolayında.`,
      `<strong>Andromeda Gökadası:</strong> yaklaşık 0,77 Mpc, yani 2,5 milyon ışık yılı dolayında.`,
      `<strong>Gökada kümeleri ve evrenin genişlemesi:</strong> megaparsek ölçeği; Hubble sabiti de megaparsek başına kilometre/saniye olarak verilir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Parseği zaman birimi sanmak:</strong> adında "saniye" geçse de parsek uzunluk birimidir; ışık yılı da öyle. İkisi de süre değil mesafe ölçer.`,
      `<strong>Çarpanı ters uygulamak:</strong> parsek daha büyük birimdir; aynı uzaklığın ışık yılı sayısı parsek sayısından yaklaşık 3,26 kat büyük olmalıdır.`,
      `<strong>kpc ile Mpc'yi karıştırmak:</strong> aralarında bin kat vardır. Gökadamızın içindeki uzaklıklar kiloparsek, gökadalar arası uzaklıklar megaparsek düzeyindedir.`,
      `<strong>Yuvarlak değerleri kesin saymak:</strong> yıldız uzaklıkları ölçüme dayanır ve yeni gözlemlerle güncellenir. Burada örnek verilen uzaklıklar yaklaşık değerlerdir; çevirinin kendisi ise tanıma dayandığı için kesindir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Uzaklık sıfırdan büyük olmalıdır; paralaks açısı sıfır uzaklık için tanımsızdır. Sonuçlar altı anlamlı basamakla gösterilir, bu yüzden kilometre satırındaki sondaki sıfırlar yuvarlamadan kaynaklanır. Paralaks satırı salt geometrik karşılıktır; çok uzak cisimler için bu açı bugünkü aletlerle ölçülemeyecek kadar küçük çıkar ve yalnızca fikir vermesi için gösterilir.`,
    ] },
  ],
  faq: [
    ['1 parsek kaç ışık yılıdır?', `1 parsek yaklaşık 3,26156 ışık yılıdır. Parsek değerini bu sayıyla çarparak ışık yılına çevirirsiniz; 100 parsek yaklaşık 326 ışık yılı eder.`],
    ['1 ışık yılı kaç parsektir?', `1 ışık yılı yaklaşık 0,306601 parsektir. Işık yılı değerini 3,26156'ya bölerek parseğe geçersiniz.`],
    ['1 parsek kaç kilometredir?', `1 parsek yaklaşık 3,0857 × 10 üzeri 13 kilometre, yani yaklaşık 30,9 trilyon kilometredir. Astronomik birim cinsinden yaklaşık 206.265 AB eder.`],
    ['Gökbilimciler neden ışık yılı yerine parsek kullanır?', `Çünkü parsek, doğrudan ölçülen paralaks açısına bağlıdır: uzaklık parsek cinsinden, yay saniyesi olarak ölçülen paralaksın tersidir. Işık yılı ise daha çok halka yönelik anlatımlarda tercih edilir.`],
    ['1 megaparsek kaç ışık yılıdır?', `1 megaparsek bir milyon parsektir ve yaklaşık 3,26 milyon ışık yılı eder. Gökadalar arası uzaklıklar ve evrenin genişleme hızı bu birimle ifade edilir.`],
    ['Parsek zaman birimi midir?', `Hayır. Parsek bir uzunluk birimidir. Adındaki "sek" hecesi zaman saniyesinden değil, açı ölçüsü olan yay saniyesinden gelir.`],
    ['Paralaks açısı nedir?', `Dünya'nın yörünge hareketi nedeniyle yakın bir yıldızın gökyüzünde uzak yıldızlara göre yaptığı görünür kaymanın yarısıdır. Yay saniyesiyle ölçülür ve yıldız ne kadar uzaksa açı o kadar küçük olur.`],
    ['Yazdığım değerler bir sunucuya gidiyor mu?', `Hayır. Çeviri tümüyle tarayıcınızda yapılır; girdiğiniz sayılar hiçbir yere gönderilmez ve saklanmaz. Sayfa yüklendikten sonra çevrimdışı da kullanılabilir.`],
  ],
  related: ['isik-yili-km-cevir', 'astronomik-birim-km-cevir', 'bilimsel-gosterim-cevir', 'dms-ondalik-derece-cevir', 'gezegen-agirligi-hesapla'],
};
