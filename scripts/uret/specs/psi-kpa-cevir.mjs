export default {
  slug: 'psi-kpa-cevir',
  title: 'PSI Kilopascal Çevirici',
  h1Tail: 'psi ↔ kPa',
  pageTitle: 'PSI kPa Çevirici – PSI\'dan Kilopascal\'a Basınç Hesaplama',
  description: 'Psi değerini kilopascala, kPa değerini psi\'ye çevirin. 1 psi = 6,894757 kPa eşitliğiyle çalışır; bar, atm, mmHg ve kg/cm² karşılıklarını da gösterir.',
  card: 'Psi\'yi kilopascala, kPa\'yı psi\'ye çevirin; ithal araç etiketleri, top ve lastik basınçları için bar ve atm ile.',
  category: 'birim',
  keywords: ['psi kpa çevirme', '1 psi kaç kpa', 'kpa psi çevirme', '32 psi kaç kpa', 'psi kilopascal', '100 kpa kaç psi', 'psi hesaplama', 'lastik basıncı kpa psi'],
  lead: 'Basıncı psi\'den kilopascala ya da kilopascaldan psi\'ye çevirin. Araç <strong>1 psi = 6,894757 kPa</strong> eşitliğini kullanır; sonucu bar, atmosfer, mmHg ve kg/cm² olarak da listeler.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 32' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['psi', 'PSI → Kilopascal (kPa)'], ['kpa', 'Kilopascal (kPa) → PSI']] },
  ],
  compute(v, h) {
    const x = h.num(v.basinc, 'Basınç');
    const PSI = 6.894757293168361; // 1 lbf/in² = 4,4482216152605 N ÷ 6,4516 cm² = 6,894757… kPa
    const kpa = v.yon === 'kpa' ? x : x * PSI;
    const psi = v.yon === 'kpa' ? x / PSI : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kpa' ? ['PSI', f(psi) + ' psi'] : ['Kilopascal', f(kpa) + ' kPa'],
        v.yon === 'kpa' ? ['Kilopascal', f(kpa) + ' kPa'] : ['PSI', f(psi) + ' psi'],
        ['Bar', f(kpa / 100) + ' bar'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['Milimetre cıva', f(kpa / 0.133322387415) + ' mmHg'],
        ['kg/cm²', f(kpa / 98.0665) + ' kgf/cm²'],
      ],
      note: '1 psi = 6,894757 kPa; 1 kPa = 0,1450377 psi. Negatif değerler vakum (atmosfer altı gösterge basıncı) olarak çevrilir.',
    };
  },
  cases: [
    { in: { basinc: '32', yon: 'psi' }, out: { 'Kilopascal': '220,6322 kPa', 'Bar': '2,206322 bar' } },
    { in: { basinc: '100', yon: 'kpa' }, out: { 'PSI': '14,50377 psi', 'Bar': '1 bar' } },
    { in: { basinc: '1', yon: 'psi' }, out: { 'Kilopascal': '6,894757 kPa', 'Milimetre cıva': '51,71493 mmHg' } },
    { in: { basinc: '240', yon: 'kpa' }, out: { 'PSI': '34,80906 psi' } },
    { in: { basinc: '14,7', yon: 'psi' }, out: { 'Kilopascal': '101,3529 kPa' } },
    { in: { basinc: '35', yon: 'psi' }, out: { 'Kilopascal': '241,3165 kPa' } },
    { in: { basinc: '-5', yon: 'psi' }, out: { 'Kilopascal': '-34,47379 kPa' } },
    { in: { basinc: 'otuz iki', yon: 'psi' }, error: true },
    { in: { basinc: '', yon: 'kpa' }, error: true },
  ],
  howto: [
    '"Basınç" alanına psi ya da kPa cinsinden değeri yazın; ondalık kısım için virgül veya nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden "PSI → Kilopascal" ya da "Kilopascal → PSI" seçeneğini işaretleyin.',
    '"Çevir" düğmesine basın. Karşılık gelen basınç en üstte; bar, atmosfer, mmHg ve kg/cm² değerleri altında gösterilir.',
    'Sonuçları saklamak ya da iletmek için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'İki farklı ölçü sisteminin basınç birimleri', p: [
      'Psi ve kilopascal aynı fiziksel büyüklüğü, yani birim alana düşen kuvveti iki farklı ölçü sistemiyle ifade eder. <strong>Psi</strong> ("pound per square inch"), bir inç karelik yüzeye bir libre-kuvvetin uyguladığı basınçtır ve Amerikan ölçü sistemine aittir. <strong>Kilopascal (kPa)</strong> ise metrik sistemin, daha doğrusu Uluslararası Birim Sistemi\'nin basınç birimi olan pascalın bin katıdır: bir metrekareye bin newton.',
      'Aralarındaki katsayı bu tanımlardan hesaplanır. Bir libre-kuvvet 4,4482216 newton, bir inç kare 6,4516 santimetrekaredir. Bölme yapıldığında 1 psi = 6.894,757 Pa, yani 6,894757 kPa bulunur. Tersinden 1 kPa = 0,1450377 psi eder. Katsayı "yuvarlak" olmadığı için akıldan çeviri bar ile kPa arasındaki kadar kolay değildir; bu araç işi sizin yerinize yapar.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Psi\'den kilopascala geçmek için değeri 6,894757 ile çarparsınız: <strong>kPa = psi × 6,894757</strong>. Kilopascaldan psi\'ye geçmek için aynı sayıya böler ya da 0,1450377 ile çarparsınız: <strong>psi = kPa × 0,1450377</strong>.',
      '<strong>Örnek 1:</strong> Yurt dışından gelen bir aracın kılavuzunda lastik basıncı 32 psi olarak yazıyor. 32 × 6,894757 = 220,63 kPa. Bu, 2,21 bar demektir; bar taksimatlı pompada 2,2\'ye ayarlamak yeterlidir.',
      '<strong>Örnek 2:</strong> Araç etiketinde 240 kPa yazıyor ve elinizde yalnızca psi gösteren dijital bir lastik saati var. 240 × 0,1450377 = 34,81 psi. Saatte yaklaşık 35 psi görmelisiniz.',
      '<strong>Örnek 3:</strong> 100 kPa, 14,50 psi eder. Atmosfer basıncı ise 101,325 kPa olduğundan 14,696 psi\'dir; İngilizce kaynaklarda bu değer çoğunlukla 14,7 psi olarak yuvarlanır.',
      'Kabaca tahmin için psi değerini 7 ile çarpıp yüzde 1,5 düşebilirsiniz: 30 psi için 210 eksi 3, yaklaşık 207 kPa bulunur; tam değer 206,84 kPa\'dır.',
    ] },
    { h: 'Bu çeviriye nerede ihtiyaç duyulur?', ul: [
      '<strong>Araç lastik etiketleri:</strong> Kuzey Amerika pazarı için üretilmiş araçlarda etiket psi ve kPa değerlerini birlikte verir; Uzak Doğu kaynaklı araçlarda yalnızca kPa yazabilir. Elinizdeki pompanın birimine göre çevirmeniz gerekir.',
      '<strong>Lastik basıncı izleme ekranı:</strong> İthal araçlarda gösterge panelindeki değer psi olabilir. Türkiye\'de alışılmış bar değerine geçmek için önce kPa\'ya çevirip 100\'e bölebilir ya da sonuçtaki "Bar" satırını okuyabilirsiniz.',
      '<strong>Spor topları:</strong> Futbol, basketbol ve voleybol toplarının üzerinde önerilen şişirme basıncı çoğunlukla psi, bazen de bar ya da kPa ile yazar. Örneğin 8,5 psi 58,61 kPa, 15,6 psi ise 107,56 kPa eder. Topun kendi üzerindeki değeri esas alın.',
      '<strong>Bisiklet ve motosiklet:</strong> Lastik yanağındaki azami basınç psi ve kPa olarak birlikte verilir. 50 psi 344,74 kPa, 100 psi 689,48 kPa\'dır.',
      '<strong>Teknik föyler ve standartlar:</strong> Amerikan kaynaklı ekipmanların çalışma basıncı psi ile yazılırken, uluslararası belgelerde kPa ya da MPa kullanılır. 150 psi anma basıncı 1.034,21 kPa, yani yaklaşık 1,03 MPa\'dır.',
      '<strong>Su arıtma ve tesisat ekipmanı:</strong> Filtre gövdeleri, membranlar ve basınç düşürücülerin etiketlerinde azami giriş basıncı psi olarak belirtilmiş olabilir.',
    ] },
    { h: 'Hızlı karşılık tablosu', ul: [
      '<strong>26 psi</strong> = 179,26 kPa',
      '<strong>28 psi</strong> = 193,05 kPa',
      '<strong>30 psi</strong> = 206,84 kPa',
      '<strong>32 psi</strong> = 220,63 kPa',
      '<strong>33 psi</strong> = 227,53 kPa',
      '<strong>35 psi</strong> = 241,32 kPa',
      '<strong>36 psi</strong> = 248,21 kPa',
      '<strong>40 psi</strong> = 275,79 kPa',
      '<strong>44 psi</strong> = 303,37 kPa',
      '<strong>200 kPa</strong> = 29,01 psi',
      '<strong>220 kPa</strong> = 31,91 psi',
      '<strong>260 kPa</strong> = 37,71 psi',
      '<strong>300 kPa</strong> = 43,51 psi',
      '<strong>400 kPa</strong> = 58,02 psi',
    ] },
    { h: 'psig, psia ve ksi', p: [
      'İngilizce belgelerde psi kısaltmasının sonuna eklenen harfler basıncın neye göre ölçüldüğünü belirtir. <strong>psig</strong> ("gauge") gösterge basıncıdır; ortam havasının üzerindeki fazlalığı verir ve lastik saatlerinin gösterdiği değerdir. <strong>psia</strong> ("absolute") mutlak basınçtır; tam boşluğa göre ölçülür ve deniz seviyesinde psig değerinden yaklaşık 14,7 fazladır. Kilopascal tarafında aynı ayrım çoğu zaman "kPa(g)" ve "kPa(a)" biçiminde ya da metin içinde açıklanarak yapılır.',
      'Malzeme dayanımı ve yüksek basınç uygulamalarında bin psi\'lik kat olan <strong>ksi</strong> kullanılır: 1 ksi = 1.000 psi = 6.894,76 kPa, yani yaklaşık 6,895 MPa. Örneğin 3.000 psi, 20.684 kPa ya da 20,68 MPa eder. Bu büyüklükteki değerlerde kilopascal yerine megapascal yazmak daha okunaklıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarılar', p: [
      'En yaygın hata, sayıyı birimine bakmadan kullanmaktır. 220 sayısı kPa için sıradan bir lastik basıncıdır; psi olarak okunursa hiçbir binek lastiğinin taşıyamayacağı bir değerdir. Tersine 32 kPa neredeyse boş bir lastik anlamına gelir. Etikette ve göstergede sayının yanındaki birimi her zaman kontrol edin.',
      'İkinci hata, çarpma ile bölmenin karıştırılmasıdır. Aynı basınç için kPa sayısı psi sayısının yaklaşık yedi katıdır; sonucunuz bu ilişkiye uymuyorsa yön yanlış seçilmiştir.',
      'Bu sayfa yalnızca birim çevirir, uygun basıncı önermez. Lastiklerde aracın etiketini, toplarda ve ekipmanlarda üreticinin belirttiği aralığı kullanın; basınçlı kap ve tesisat işlerinde azami değerleri aşmayın ve gerektiğinde uzmana danışın.',
    ] },
  ],
  faq: [
    ['1 psi kaç kPa eder?', '1 psi yaklaşık 6,895 kPa eder (daha hassas değer 6,894757). Bu aynı zamanda 0,0689 bar\'dır.'],
    ['1 kPa kaç psi eder?', '1 kPa yaklaşık 0,145 psi eder. 100 kPa, yani 1 bar ise 14,50 psi\'dir.'],
    ['32 psi kaç kPa yapar?', '32 psi, 220,63 kPa yapar. Bu değer 2,21 bar\'a denk gelir ve binek araç lastiklerinde sık rastlanan bir basınçtır.'],
    ['35 psi kaç kPa\'dır?', '35 psi, 241,32 kPa\'dır; yaklaşık 2,41 bar eder.'],
    ['Atmosfer basıncı kaç psi ve kaç kPa\'dır?', 'Standart atmosfer basıncı 101,325 kPa\'dır ve 14,696 psi\'ye eşittir. Günlük kullanımda 14,7 psi olarak yuvarlanır.'],
    ['kPa değerini psi\'ye akıldan nasıl çeviririm?', 'kPa değerini 7\'ye bölüp sonuca yüzde 1,5 kadar ekleyin. 210 kPa için 30 artı yaklaşık 0,45, yani 30,5 psi bulunur; tam değer 30,46 psi\'dir.'],
    ['Psi ile bar arasında çeviri için bu aracı kullanabilir miyim?', 'Evet. Sonuç kutusundaki "Bar" satırı her iki yönde de bar karşılığını gösterir. Yalnızca bar ile psi arasında çalışacaksanız ilgili araçlar bölümündeki bar–psi çeviricisi daha doğrudan bir yol sunar.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz basınç değerleri sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['bar-psi-cevir', 'bar-kpa-cevir', 'pascal-bar-cevir', 'mmhg-kpa-cevir', 'kgcm2-bar-cevir'],
};
