export default {
  slug: 'bar-psi-cevir',
  title: 'Bar PSI Çevirici',
  h1Tail: 'bar ↔ psi',
  pageTitle: 'Bar PSI Çevirici – Lastik Basıncı İçin Bar\'dan PSI\'ya Hesaplama',
  description: 'Bar değerini psi\'ye, psi değerini bara çevirin. 1 bar = 14,5038 psi eşitliğiyle çalışır; lastik, kompresör ve tüp basınçları için kPa ve atm de gösterir.',
  card: 'Barı psi\'ye, psi\'yi bara çevirin; lastik basıncı, kompresör ve manometre okumaları için kPa, atm ve kg/cm² ile.',
  category: 'birim',
  keywords: ['bar psi çevirme', '1 bar kaç psi', 'psi bar çevirme', '32 psi kaç bar', 'lastik basıncı psi bar', 'psi hesaplama', 'basınç birimi çevirme', '2.2 bar kaç psi'],
  lead: 'Basınç değerini bardan psi\'ye ya da psi\'den bara çevirin. Araç <strong>1 bar = 14,50377 psi</strong> eşitliğini kullanır ve sonucu kilopascal, atmosfer ve kg/cm² olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 2,2' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['bar', 'Bar → PSI'], ['psi', 'PSI → Bar']] },
  ],
  compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const PSI = 6.894757293168361; // 1 psi = 6,894757… kPa (lbf/in² tanımından)
    const kpa = v.yon === 'psi' ? x * PSI : x * 100;
    const bar = kpa / 100;
    const psi = kpa / PSI;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'psi' ? ['Bar', f(bar) + ' bar'] : ['PSI', f(psi) + ' psi'],
        v.yon === 'psi' ? ['PSI', f(psi) + ' psi'] : ['Bar', f(bar) + ' bar'],
        ['Kilopascal', f(kpa) + ' kPa'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['kg/cm²', f(kpa / 98.0665) + ' kgf/cm²'],
      ],
      note: '1 bar = 100 kPa; 1 psi = 6,894757 kPa. Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  },
  cases: [
    { in: { basinc: '1', yon: 'bar' }, out: { 'PSI': '14,50377 psi', 'Kilopascal': '100 kPa' } },
    { in: { basinc: '32', yon: 'psi' }, out: { 'Bar': '2,206322 bar', 'Kilopascal': '220,6322 kPa' } },
    { in: { basinc: '2,2', yon: 'bar' }, out: { 'PSI': '31,9083 psi' } },
    { in: { basinc: '100', yon: 'psi' }, out: { 'Bar': '6,894757 bar' } },
    { in: { basinc: '200', yon: 'bar' }, out: { 'PSI': '2.900,755 psi' } },
    { in: { basinc: '1,01325', yon: 'bar' }, out: { 'PSI': '14,69595 psi', 'Atmosfer': '1 atm' } },
    { in: { basinc: '0', yon: 'psi' }, out: { 'Bar': '0 bar' } },
    { in: { basinc: 'iki bar', yon: 'bar' }, error: true },
    { in: { basinc: '', yon: 'psi' }, error: true },
  ],
  howto: [
    '"Basınç" alanına manometreden, lastik etiketinden ya da kullanım kılavuzundan okuduğunuz değeri yazın.',
    'Değer bar cinsindense "Bar → PSI", psi cinsindense "PSI → Bar" yönünü seçin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, diğer satırlar kPa, atm ve kg/cm² değerlerini gösterir.',
    'Gerekirse "Sonucu kopyala" ile değerleri panoya alıp not defterinize ya da servis formuna yapıştırın.',
  ],
  sections: [
    { h: 'Bar ve psi nedir?', p: [
      'Basınç, birim yüzeye dik olarak etki eden kuvvettir. <strong>Bar</strong>, metrik sistemle uyumlu bir basınç birimidir ve tam olarak 100.000 pascal (100 kPa) olarak tanımlanır. Deniz seviyesindeki hava basıncına çok yakın olduğu için sezgiseldir: 1 bar, kabaca üzerimizdeki atmosferin uyguladığı basınç kadardır. Türkiye ve Avrupa\'da lastik basınçları, kompresörler, hidroforlar ve kombi manometreleri bar ile okunur.',
      '<strong>Psi</strong> ("pound per square inch"), inç kareye düşen libre-kuvvet demektir ve Amerikan ölçü sisteminin basınç birimidir. ABD kaynaklı araçlarda, bisiklet lastiklerinin yanaklarında, ithal kompresör ve basınçlı yıkama makinelerinde, dalış ve paintball tüplerinde sıkça görülür. Bir libre-kuvvetin bir inç karelik alana uyguladığı basınç 6.894,757 pascal eder; buradan 1 bar = 14,50377 psi ve 1 psi = 0,0689476 bar bulunur.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Bardan psi\'ye geçmek için değeri 14,50377 ile çarparsınız: <strong>psi = bar × 14,50377</strong>. Psi\'den bara geçmek için aynı sayıya böler ya da 0,0689476 ile çarparsınız: <strong>bar = psi × 0,0689476</strong>.',
      '<strong>Örnek 1:</strong> Aracınızın kapı içindeki etikette ön lastikler için 2,2 bar yazıyor, ancak akaryakıt istasyonundaki pompa psi gösteriyor. 2,2 × 14,50377 = 31,91 psi. Pompayı 32 psi\'ye ayarlamanız yeterlidir.',
      '<strong>Örnek 2:</strong> İthal bir aracın kılavuzunda 32 psi öneriliyor. 32 × 0,0689476 = 2,21 bar. Bar taksimatlı bir saatte ibre 2,2\'nin hemen üzerinde olmalıdır.',
      '<strong>Örnek 3:</strong> 200 bar\'lık bir dalış tüpü 200 × 14,50377 = 2.900,76 psi basınç taşır. Piyasada "3.000 psi" olarak anılan tüpler ise 206,84 bar\'a karşılık gelir.',
      'Akıldan hesap için bar değerini 14,5 ile çarpmak ya da daha kabaca "bar × 15, biraz eksiği" demek yeterlidir. Ters yönde psi değerini 14,5\'e bölün: 29 psi tam 2 bar eder.',
    ] },
    { h: 'Lastik basıncı için hızlı başvuru', p: [
      'Aşağıdaki liste yalnızca birim karşılıklarını gösterir; aracınız için doğru basınç değil, sık karşılaşılan sayıların çevirisidir. Doğru değeri her zaman aracın kapı direğindeki ya da depo kapağındaki etiketten ve kullanım kılavuzundan alın.',
    ], ul: [
      '<strong>2,0 bar</strong> = 29,01 psi',
      '<strong>2,2 bar</strong> = 31,91 psi',
      '<strong>2,3 bar</strong> = 33,36 psi',
      '<strong>2,4 bar</strong> = 34,81 psi',
      '<strong>2,5 bar</strong> = 36,26 psi',
      '<strong>2,8 bar</strong> = 40,61 psi',
      '<strong>3,0 bar</strong> = 43,51 psi',
      '<strong>30 psi</strong> = 2,07 bar',
      '<strong>35 psi</strong> = 2,41 bar',
      '<strong>40 psi</strong> = 2,76 bar',
      '<strong>60 psi</strong> = 4,14 bar',
      '<strong>100 psi</strong> = 6,89 bar',
      '<strong>120 psi</strong> = 8,27 bar',
    ] },
    { h: 'Başka nerelerde kullanılır?', ul: [
      '<strong>Bisiklet lastikleri:</strong> Lastik yanağında izin verilen aralık çoğunlukla hem psi hem bar olarak yazar; ince yol lastiklerinde değerler otomobil lastiklerinin birkaç katı olabilir. Pompanın göstergesi tek birimliyse çeviri gerekir.',
      '<strong>Hava kompresörleri:</strong> Atölye kompresörleri genellikle 8–10 bar aralığında çalışır; 8 bar 116,03 psi, 10 bar 145,04 psi eder. Havalı aletlerin etiketindeki çalışma basıncı psi verilmişse regülatörü buna göre ayarlamak gerekir.',
      '<strong>Basınçlı yıkama makineleri:</strong> 150 bar\'lık bir makine 2.175,57 psi basınç üretir. İlan ve kataloglarda iki birim de kullanıldığından karşılaştırma yaparken aynı birime çevirin.',
      '<strong>Espresso makineleri:</strong> Demleme için anılan 9 bar, 130,53 psi\'dir.',
      '<strong>Su tesisatı ve hidrofor:</strong> Şebeke basıncı çoğunlukla birkaç bar düzeyindedir; ithal armatür ve filtrelerin azami çalışma basıncı psi olarak yazılmış olabilir.',
    ] },
    { h: 'Gösterge basıncı ve mutlak basınç', p: [
      'Lastik saati, kompresör manometresi gibi aletler <em>gösterge basıncını</em>, yani ortam havasının üzerindeki fazlalığı ölçer. Tamamen inmiş bir lastik saatte 0 gösterir, ama içinde hâlâ yaklaşık 1 bar\'lık atmosfer basıncı vardır. Mutlak basınç, gösterge basıncına atmosfer basıncının eklenmesiyle bulunur. İngilizce kaynaklarda bu ayrım "psig" (gösterge) ve "psia" (mutlak) kısaltmalarıyla, metrik tarafta bazen "barg" ve "bara" ile belirtilir.',
      'Birim çevirisi iki tür için de aynıdır; önemli olan iki tarafın aynı türden olmasıdır. Vakum uygulamalarında gösterge basıncı negatif olur; araç negatif değerleri de çevirir. Örneğin −0,8 bar gösterge basıncı −11,60 psi\'ye eşittir.',
    ] },
    { h: 'Sık yapılan hatalar ve güvenlik', p: [
      'En tehlikeli hata, birimi fark etmeden sayıyı aynen uygulamaktır. Etikette 2,3 bar yazan bir lastiği 2,3 psi\'ye şişirmek onu neredeyse boş bırakır; 33 psi yazan bir değeri 33 bar sanmak ise hiçbir binek lastiğinin dayanamayacağı bir basınçtır. Çift taksimatlı saatlerde iç ve dış halkayı karıştırmamaya dikkat edin.',
      'Bar ile kg/cm² gündelik kullanımda birbirinin yerine söylenir, ancak tam eşit değildir: 1 bar 1,0197 kg/cm²\'dir. Lastik gibi uygulamalarda yüzde 2\'lik bu fark önemsizdir; hassas ölçümlerde dikkate alınmalıdır.',
      'Basınç ölçümünü lastikler soğukken yapın; sürüşten sonra ısınan lastikte değer yükselir. Bu sayfa yalnızca birim dönüştürür. Basınçlı kaplar, tüpler ve tesisatla ilgili işlemlerde üreticinin belirttiği azami değerleri aşmayın ve gerektiğinde yetkili servise ya da uzmana danışın.',
    ] },
  ],
  faq: [
    ['1 bar kaç psi eder?', '1 bar yaklaşık 14,5038 psi eder (daha hassas değer 14,50377). Tersine 1 psi, 0,0689476 bar\'dır.'],
    ['32 psi kaç bar yapar?', '32 psi, 2,21 bar yapar (32 × 0,0689476 = 2,2063). Binek araç lastiklerinde sık görülen 2,2 bar değeriyle pratikte aynıdır.'],
    ['2,5 bar kaç psi\'dir?', '2,5 bar, 36,26 psi\'dir. Yakın değerler: 2,4 bar 34,81 psi, 2,6 bar ise 37,71 psi eder.'],
    ['Psi neyin kısaltması?', 'İngilizce "pound per square inch" ifadesinin, yani inç kare başına libre-kuvvetin kısaltmasıdır. Türkçede kimi zaman "libre/inç kare" olarak da geçer.'],
    ['Bar ile atmosfer aynı mı?', 'Çok yakın ama aynı değil. 1 standart atmosfer 1,01325 bar, yani 14,696 psi\'dir; 1 bar ise 0,9869 atm eder. Aradaki fark yaklaşık yüzde 1,3\'tür.'],
    ['Lastiğimi kaç psi şişirmeliyim?', 'Bunu çevirici söyleyemez; doğru değer araca, lastik ölçüsüne ve yüke göre değişir. Aracınızın kapı direğindeki ya da yakıt deposu kapağındaki etikette ve kullanım kılavuzunda yazan değeri kullanın; birimi farklıysa bu araçla çevirin.'],
    ['Psig ve psia ne anlama gelir?', 'Psig gösterge basıncını (atmosfer basıncına göre fazlalık), psia mutlak basıncı (tam boşluğa göre) belirtir. Deniz seviyesinde psia değeri psig değerinden yaklaşık 14,7 fazladır.'],
    ['Yazdığım basınç değerleri kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; değerler sunucuya gönderilmez. Sayfa açıldıktan sonra internet olmadan, örneğin garajda ya da yolda da çalışır.'],
  ],
  related: ['psi-kpa-cevir', 'bar-kpa-cevir', 'bar-atm-cevir', 'kgcm2-bar-cevir', 'pascal-bar-cevir'],
};
