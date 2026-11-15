export default {
  slug: 'bar-kpa-cevir',
  title: 'Bar Kilopascal Çevirici',
  h1Tail: 'bar ↔ kPa',
  pageTitle: 'Bar kPa Çevirici – Bar\'dan Kilopascal\'a Basınç Çevirme',
  description: 'Bar değerini kilopascala, kPa değerini bara çevirin. 1 bar = 100 kPa tanımıyla çalışır; lastik etiketleri ve teknik belgeler için psi, MPa ve atm de gösterir.',
  card: 'Barı kilopascala, kPa\'yı bara çevirin; lastik etiketi, turbo basıncı ve teknik föyler için psi, MPa ve atm ile.',
  category: 'birim',
  keywords: ['bar kpa çevirme', '1 bar kaç kpa', 'kpa bar çevirme', '220 kpa kaç bar', 'kilopascal bar', 'lastik basıncı kpa', 'kpa hesaplama', '250 kpa kaç bar'],
  lead: 'Basıncı bardan kilopascala ya da kilopascaldan bara çevirin. İki birim arasındaki oran tam olarak yüzdür: <strong>1 bar = 100 kPa</strong>. Sonuç pascal, megapascal, psi ve atmosfer olarak da verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 220' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kpa', 'Kilopascal (kPa) → Bar'], ['bar', 'Bar → Kilopascal (kPa)']] },
  ],
  compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const kpa = v.yon === 'bar' ? x * 100 : x;
    const bar = v.yon === 'bar' ? x : x / 100;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'bar' ? ['Kilopascal', f(kpa) + ' kPa'] : ['Bar', f(bar) + ' bar'],
        v.yon === 'bar' ? ['Bar', f(bar) + ' bar'] : ['Kilopascal', f(kpa) + ' kPa'],
        ['Pascal', h.sig(kpa * 1000, 9) + ' Pa'],
        ['Megapascal', f(kpa / 1000) + ' MPa'],
        ['PSI', f(kpa / 6.894757293168361) + ' psi'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
      ],
      note: '1 bar = 100 kPa = 100.000 Pa (tam tanım). Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  },
  cases: [
    { in: { basinc: '220', yon: 'kpa' }, out: { 'Bar': '2,2 bar', 'PSI': '31,9083 psi' } },
    { in: { basinc: '2,5', yon: 'bar' }, out: { 'Kilopascal': '250 kPa', 'Pascal': '250.000 Pa' } },
    { in: { basinc: '1', yon: 'bar' }, out: { 'Kilopascal': '100 kPa', 'Megapascal': '0,1 MPa' } },
    { in: { basinc: '101,325', yon: 'kpa' }, out: { 'Bar': '1,01325 bar', 'Atmosfer': '1 atm' } },
    { in: { basinc: '0,35', yon: 'bar' }, out: { 'Kilopascal': '35 kPa', 'PSI': '5,076321 psi' } },
    { in: { basinc: '7', yon: 'bar' }, out: { 'Kilopascal': '700 kPa', 'Megapascal': '0,7 MPa' } },
    { in: { basinc: '-80', yon: 'kpa' }, out: { 'Bar': '-0,8 bar' } },
    { in: { basinc: 'kpa', yon: 'kpa' }, error: true },
    { in: { basinc: '', yon: 'bar' }, error: true },
  ],
  howto: [
    '"Basınç" alanına etiketten, kılavuzdan ya da göstergeden okuduğunuz sayıyı yazın.',
    'Değer kilopascal ise "Kilopascal → Bar", bar ise "Bar → Kilopascal" yönünü seçin.',
    '"Çevir" düğmesine basın; sonuç kutusunda karşılık gelen basınçla birlikte Pa, MPa, psi ve atm değerleri görünür.',
    'İhtiyaç duyarsanız "Sonucu kopyala" düğmesiyle bütün satırları panoya alın.',
  ],
  sections: [
    { h: 'Bar ve kilopascal arasındaki ilişki', p: [
      'Kilopascal (kPa), Uluslararası Birim Sistemi\'nin basınç birimi olan pascalın bin katıdır; bir metrekareye bin newton kuvvet düşmesi demektir. Bar ise SI dışı ama onunla uyumlu bir birimdir ve tam 100.000 pascal olarak tanımlanmıştır. Bu iki tanım yan yana konduğunda sonuç yalındır: <strong>1 bar = 100 kPa</strong>, 1 kPa = 0,01 bar.',
      'Dönüşümde yaklaşık bir katsayı bulunmadığı için hata payı yoktur; yapılan iş ondalık virgülü iki basamak kaydırmaktır. Yine de iki birim farklı çevrelerde kullanıldığı için çeviri ihtiyacı sık doğar: Avrupa\'da manometreler ve lastik saatleri bar ile, Uzak Doğu ve Kuzey Amerika kaynaklı pek çok teknik belge ise kPa ile yazılır.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Kilopascaldan bara geçmek için değeri 100\'e bölersiniz: <strong>bar = kPa ÷ 100</strong>. Bardan kilopascala geçmek için 100 ile çarparsınız: <strong>kPa = bar × 100</strong>.',
      '<strong>Örnek 1 – Lastik etiketi:</strong> Aracın kapı direğindeki etikette ön lastikler için 220 kPa yazıyor. 220 ÷ 100 = 2,2 bar. İstasyondaki pompa psi gösteriyorsa aynı değer 31,91 psi\'dir.',
      '<strong>Örnek 2 – Kompresör:</strong> 7 bar\'a ayarlı bir atölye kompresörü 7 × 100 = 700 kPa, yani 0,7 MPa basınç verir. Havalı alet kataloglarında çalışma basıncı çoğunlukla bu biçimlerden biriyle yazılır.',
      '<strong>Örnek 3 – Düşük basınç:</strong> 0,35 bar, 35 kPa eder; yaklaşık 5,08 psi\'dir. Düşük basınçlı uygulamalarda kPa kullanmak ondalıklı bar değerlerinden daha okunaklıdır.',
      '<strong>Örnek 4 – Vakum:</strong> Bir vakum göstergesi −80 kPa okuyor. Bu, −0,8 bar gösterge basıncıdır; yani ortam havasına göre 0,8 bar daha düşük.',
    ] },
    { h: 'kPa ile en sık nerede karşılaşılır?', ul: [
      '<strong>Lastik basınç etiketleri:</strong> Birçok araçta önerilen basınç kPa olarak, yanında bar ya da psi karşılığıyla yazılır. Yalnızca kPa yazan etiketlerde değeri 100\'e bölmek yeterlidir.',
      '<strong>Lastik basıncı izleme sistemleri:</strong> Gösterge panelindeki lastik basıncı ekranı araç ayarlarına göre kPa, bar ya da psi gösterebilir. Birimi menüden değiştiremiyorsanız çeviri gerekir.',
      '<strong>Motor ve turbo verileri:</strong> Arıza tespit cihazları emme manifoldu basıncını ve turbo basıncını çoğunlukla kPa olarak mutlak değerle bildirir. Rölantide çalışan atmosferik bir motorda bu değer açık hava basıncının belirgin biçimde altındadır.',
      '<strong>Yakıt ve yağ basıncı:</strong> Servis kılavuzlarında yakıt hattı ve yağ basıncı için kPa ile verilen kontrol değerleri bulunur; atölyedeki manometre bar taksimatlıysa dönüştürmek gerekir.',
      '<strong>Zemin ve yapı hesapları:</strong> Zemin emniyet gerilmesi, döşeme yükleri ve rüzgâr basıncı kPa (kN/m²) ile ifade edilir.',
      '<strong>Tıbbi gaz ve laboratuvar sistemleri:</strong> Merkezi gaz hatlarının ve regülatörlerin çalışma basınçları teknik föylerde kPa ile belirtilir.',
    ] },
    { h: 'Lastik basınçları için karşılık tablosu', p: [
      'Aşağıdaki sayılar yalnızca birim karşılığıdır; aracınıza uygun basınç değildir. Doğru değeri aracın etiketinden ve kullanım kılavuzundan okuyun.',
    ], ul: [
      '<strong>180 kPa</strong> = 1,8 bar = 26,11 psi',
      '<strong>200 kPa</strong> = 2,0 bar = 29,01 psi',
      '<strong>210 kPa</strong> = 2,1 bar = 30,46 psi',
      '<strong>220 kPa</strong> = 2,2 bar = 31,91 psi',
      '<strong>230 kPa</strong> = 2,3 bar = 33,36 psi',
      '<strong>240 kPa</strong> = 2,4 bar = 34,81 psi',
      '<strong>250 kPa</strong> = 2,5 bar = 36,26 psi',
      '<strong>280 kPa</strong> = 2,8 bar = 40,61 psi',
      '<strong>300 kPa</strong> = 3,0 bar = 43,51 psi',
      '<strong>350 kPa</strong> = 3,5 bar = 50,76 psi',
    ] },
    { h: 'Mutlak basınç mı, gösterge basıncı mı?', p: [
      'Lastik saati ve kompresör manometresi gösterge basıncını, yani ortam havasının üzerindeki fazlalığı ölçer. Motor sensörleri ve meteoroloji ise mutlak basıncı, yani tam boşluğa göre basıncı bildirir. Aynı lastik için gösterge basıncı 220 kPa iken mutlak basınç, üzerine yaklaşık 101 kPa\'lık atmosfer basıncının eklenmesiyle 321 kPa dolayındadır.',
      'Birim çevirisi iki türde de aynıdır: 100\'e bölmek ya da 100 ile çarpmak. Dikkat edilmesi gereken, karşılaştırdığınız iki değerin aynı türden olmasıdır. Turbo basıncını tartışırken "1,5 bar" diyen biri çoğu zaman gösterge basıncını, arıza tespit cihazındaki "250 kPa" ise mutlak basıncı kasteder; ikisi aslında aynı durumu anlatıyor olabilir.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarılar', p: [
      'kPa, hPa ve MPa önekleri kolayca karışır. Hektopascal (hPa) meteorolojide kullanılır ve kilopascalın onda biridir; megapascal (MPa) ise bin kilopascal, yani 10 bardır. 2,2 bar = 220 kPa = 2.200 hPa = 0,22 MPa eşitliğini akılda tutmak sıfır kaydırma hatalarını önler.',
      'Bir diğer karışıklık kPa ile psi arasında yaşanır: etikette 220 yazan bir değeri psi sanmak lastiği yedi kat fazla şişirmeye çalışmak anlamına gelir. Sayının yanındaki birimi mutlaka okuyun. Bu araç yalnızca birim dönüştürür; lastik, basınçlı kap ve tesisatta üreticinin belirttiği sınırları aşmayın, emin olmadığınız durumda yetkili servise danışın.',
    ] },
  ],
  faq: [
    ['1 bar kaç kPa eder?', '1 bar tam olarak 100 kPa eder. Aynı basınç 100.000 Pa ya da 0,1 MPa olarak da yazılabilir.'],
    ['1 kPa kaç bar eder?', '1 kPa, 0,01 bar eder. Yani kilopascal değerini 100\'e bölerek bar karşılığını bulursunuz.'],
    ['220 kPa kaç bar yapar?', '220 kPa, 2,2 bar yapar. Bu değer yaklaşık 31,9 psi\'ye karşılık gelir ve binek araç lastik etiketlerinde sık görülür.'],
    ['250 kPa kaç bar ve kaç psi\'dir?', '250 kPa, 2,5 bar ve yaklaşık 36,26 psi\'dir.'],
    ['kPa ile hPa arasındaki fark nedir?', 'Kilopascal 1.000 pascal, hektopascal 100 pascaldır; yani 1 kPa = 10 hPa. Hava durumu raporlarındaki 1.013 hPa değeri 101,3 kPa, yani yaklaşık 1,013 bardır.'],
    ['Araç etiketinde kPa yazıyor ama pompam bar gösteriyor, ne yapmalıyım?', 'Etiketteki kPa değerini 100\'e bölün ya da bu araca yazıp bar karşılığını okuyun. Örneğin 240 kPa için pompayı 2,4 bar\'a ayarlayın. Ölçümü lastikler soğukken yapmanız önerilir.'],
    ['Negatif kPa değeri ne anlama gelir?', 'Gösterge basıncı olarak verilen negatif değer, basıncın ortam havasından düşük olduğunu, yani vakumu gösterir. Örneğin −50 kPa, −0,5 bar gösterge basıncıdır. Mutlak basınç ise negatif olamaz.'],
    ['Girdiğim değerler sunucuya gönderiliyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; yazdığınız sayılar kaydedilmez ve hiçbir yere iletilmez. Sayfa yüklendikten sonra bağlantı olmadan da kullanılabilir.'],
  ],
  related: ['bar-psi-cevir', 'psi-kpa-cevir', 'pascal-bar-cevir', 'bar-atm-cevir', 'kgcm2-bar-cevir'],
};
