export default {
  slug: 'mm-inc-cevir',
  title: 'Milimetre İnç Çevirici',
  h1Tail: 'mm ↔ inç',
  pageTitle: 'Milimetre İnç Çevirici – mm\'den İnçe, Kesirli İnç Karşılığıyla',
  description: 'Milimetreyi inçe, inçi milimetreye çevirin. 1 inç = 25,4 mm tanımıyla hesaplar; en yakın 1/16 kesirli inç karşılığını ve sapmasını da gösterir.',
  card: 'Milimetreyi inçe, inçi milimetreye çevirin; anahtar, matkap ucu ve cıvata ölçüleri için en yakın kesirli inç karşılığıyla.',
  category: 'birim',
  keywords: ['mm inç çevirme', '1 inç kaç mm', 'milimetre inç', 'inç mm tablosu', 'kesirli inç mm', '1/2 inç kaç mm', 'mm to inch', 'matkap ucu inç mm'],
  lead: 'Milimetre ile inç arasında iki yönlü çeviri yapın. Araç <strong>1 inç = 25,4 mm</strong> tanımını kullanır ve atölyede işe yarayan bir ek bilgi verir: değerin en yakın <strong>1/16 kesirli inç</strong> karşılığı ve bu kesrin gerçek ölçüden kaç milimetre saptığı.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 12,7' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mm', 'Milimetre → İnç'], ['inc', 'İnç → Milimetre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const mm = v.yon === 'inc' ? x * 25.4 : x;
    const inc = v.yon === 'inc' ? x : x / 25.4;
    // En yakın 1/16 inç: tam kısım + sadeleştirilmiş kesir
    const on6 = Math.round(inc * 16);
    const tam = Math.floor(on6 / 16);
    let pay = on6 - tam * 16;
    let payda = 16;
    while (pay > 0 && pay % 2 === 0) { pay /= 2; payda /= 2; }
    let kesir;
    if (pay === 0) kesir = `${h.fmt(tam, 0)} inç`;
    else if (tam === 0) kesir = `${pay}/${payda} inç`;
    else kesir = `${h.fmt(tam, 0)} ${pay}/${payda} inç`;
    const sapma = (on6 / 16) * 25.4 - mm;
    const sapmaMetni = Math.abs(sapma) < 0.0005 ? 'yok (tam karşılık)' : `${sapma > 0 ? '+' : '−'}${h.fmt(Math.abs(sapma), 3)} mm`;
    return {
      rows: [
        v.yon === 'inc' ? ['Milimetre', h.fmt(mm, 4) + ' mm'] : ['İnç', h.fmt(inc, 4) + ' inç'],
        v.yon === 'inc' ? ['İnç', h.fmt(inc, 4) + ' inç'] : ['Milimetre', h.fmt(mm, 4) + ' mm'],
        ['En yakın kesirli inç (1/16)', kesir],
        ['Kesrin sapması', sapmaMetni],
        ['Santimetre', h.fmt(mm / 10, 4) + ' cm'],
        ['Binde inç (thou)', h.fmt(inc * 1000, 2) + ' thou'],
      ],
      note: '1 inç = 25,4 mm (tam tanım). Kesirli karşılık en yakın 1/16 inçe yuvarlanır; sapma, kesrin gerçek ölçüden farkıdır.',
    };
  },
  cases: [
    { in: { deger: '12,7', yon: 'mm' }, out: { 'İnç': '0,5 inç', 'En yakın kesirli inç (1/16)': '1/2 inç', 'Kesrin sapması': 'yok (tam karşılık)' } },
    { in: { deger: '0,75', yon: 'inc' }, out: { 'Milimetre': '19,05 mm', 'En yakın kesirli inç (1/16)': '3/4 inç', 'Santimetre': '1,905 cm' } },
    { in: { deger: '25,4', yon: 'mm' }, out: { 'İnç': '1 inç', 'En yakın kesirli inç (1/16)': '1 inç', 'Binde inç (thou)': '1.000 thou' } },
    { in: { deger: '10', yon: 'mm' }, out: { 'İnç': '0,3937 inç', 'En yakın kesirli inç (1/16)': '3/8 inç', 'Kesrin sapması': '−0,475 mm' } },
    { in: { deger: '100', yon: 'mm' }, out: { 'İnç': '3,937 inç', 'En yakın kesirli inç (1/16)': '3 15/16 inç' }, match: { 'Kesrin sapması': '^\\+0,01[23] mm$' } },
    { in: { deger: '3', yon: 'inc' }, out: { 'Milimetre': '76,2 mm', 'En yakın kesirli inç (1/16)': '3 inç' } },
    { in: { deger: '0', yon: 'mm' }, out: { 'İnç': '0 inç', 'En yakın kesirli inç (1/16)': '0 inç' } },
    { in: { deger: '1/2', yon: 'inc' }, error: true },
    { in: { deger: '-4', yon: 'mm' }, error: true },
  ],
  howto: [
    '"Değer" alanına ölçüyü yazın. İnç girerken kesri ondalığa çevirin: 1/2 için 0,5, 3/8 için 0,375, 1 1/4 için 1,25 yazılır.',
    '"Çeviri yönü" listesinden milimetreden inçe ya da inçten milimetreye seçimini yapın.',
    '"Çevir" düğmesine basın. İlk satır ondalıklı karşılığı, üçüncü satır en yakın 1/16 kesirli inçi gösterir.',
    '"Kesrin sapması" satırına bakarak o kesirli ölçünün sizin parçanıza uyup uymayacağına karar verin.',
    'Gerekirse tüm satırları kopyalayıp sipariş ya da iş emri notuna yapıştırın.',
  ],
  sections: [
    { h: 'Milimetre ile inç arasındaki ilişki', p: [
      'İnç, 1959\'daki uluslararası anlaşmadan bu yana tam olarak 25,4 milimetre olarak tanımlanır. Dolayısıyla çeviri bir ölçüm değil, basit bir aritmetik işlemdir: <strong>inç = mm ÷ 25,4</strong> ve <strong>mm = inç × 25,4</strong>. Bir milimetre yaklaşık 0,03937 inçtir.',
      'Santimetre-inç çevirisi daha çok ekran ve beden gibi büyük ölçülerde kullanılırken, milimetre-inç çevirisi teknik işlerin dilidir: cıvata ve somun çapları, anahtar ağızları, matkap uçları, sac ve levha kalınlıkları, boru ve hortum bağlantıları, bisiklet parçaları ve elektronik bileşenlerin bacak aralıkları bu iki birim arasında gidip gelir.',
    ] },
    { h: 'Kesirli inç neden önemli?', p: [
      'İnçle çalışan takım ve bağlantı elemanları ondalıklı değil kesirli ölçülerle adlandırılır: 1/4, 5/16, 3/8, 7/16, 1/2 gibi. Kesirlerin paydası hep ikinin kuvvetidir (2, 4, 8, 16, 32, 64), çünkü inç cetveli her çizgide ikiye bölünerek ilerler. Elinizde kumpasla ölçülmüş 10 mm\'lik bir değer varsa, bunun "0,3937 inç" olduğunu bilmek tek başına işe yaramaz; raftaki hangi anahtarın ya da matkap ucunun buna en yakın olduğunu bilmeniz gerekir.',
      'Araç bu yüzden sonucu en yakın on altıda bire yuvarlar ve kesri sadeleştirir: 6/16 yerine 3/8, 8/16 yerine 1/2 yazar. Ardından bu kesrin milimetre karşılığı ile sizin girdiğiniz değer arasındaki farkı "Kesrin sapması" satırında verir. Artı işareti kesirli ölçünün daha büyük, eksi işareti daha küçük olduğunu gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 12,7 mm kaç inçtir? 12,7 ÷ 25,4 = 0,5 inç. On altıda karşılığı 8/16, sadeleşmiş hâli 1/2 inçtir ve sapma yoktur.',
      '<strong>Örnek 2:</strong> 10 mm\'lik bir ölçü için 10 ÷ 25,4 = 0,3937 inç bulunur. Bunu 16 ile çarpınca 6,3 eder; en yakın tam sayı 6 olduğundan kesir 6/16, yani 3/8 inçtir. 3/8 inç 9,525 mm ettiğinden sapma −0,475 mm\'dir: 3/8 inçlik parça, 10 mm\'den yaklaşık yarım milimetre küçüktür. Bir anahtar ya da delik için bu fark çoğu zaman kabul edilemez.',
      '<strong>Örnek 3:</strong> 3/4 inçlik bir bağlantının milimetre karşılığı için alana 0,75 yazıp "İnç → Milimetre" seçilir: 0,75 × 25,4 = 19,05 mm.',
      '<strong>Örnek 4:</strong> 100 mm, 3,937 inç eder; en yakın kesir 3 15/16 inçtir ve bu ölçü 100,0125 mm olduğu için sapma yalnızca milimetrenin yüzde biri dolayındadır.',
    ] },
    { h: 'Sık kullanılan kesirli inç – milimetre karşılıkları', ul: [
      '<strong>1/16 inç</strong> = 1,5875 mm',
      '<strong>1/8 inç</strong> = 3,175 mm',
      '<strong>3/16 inç</strong> = 4,7625 mm',
      '<strong>1/4 inç</strong> = 6,35 mm',
      '<strong>5/16 inç</strong> = 7,9375 mm',
      '<strong>3/8 inç</strong> = 9,525 mm',
      '<strong>1/2 inç</strong> = 12,7 mm',
      '<strong>5/8 inç</strong> = 15,875 mm',
      '<strong>3/4 inç</strong> = 19,05 mm',
      '<strong>1 inç</strong> = 25,4 mm',
    ] },
    { h: 'Binde inç (thou) nedir?', p: [
      'Hassas imalatta inç, binde birlik dilimlerle ifade edilir. İnçin binde biri İngiltere\'de "thou", ABD\'de "mil" olarak adlandırılır ve 0,0254 mm, yani 25,4 mikrona eşittir. Sentil (aralık) mastarları, sac kalınlıkları, baskı devre kartlarındaki yol genişlikleri ve kaplama kalınlıkları çoğunlukla bu birimle verilir. Sonuç kutusundaki son satır, değerinizin kaç thou ettiğini gösterir; örneğin 1 inç 1.000 thou\'dur.',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'Metrik ve inç ölçülü bağlantı elemanları birbirinin yerine kullanılmamalıdır. Bazı ölçüler birbirine çok yakındır (örneğin 8 mm ile 5/16 inç arasında yalnızca 0,06 mm fark vardır) ve yakın ölçülü anahtar somuna oturuyormuş gibi görünebilir; ancak küçük boşluk bile köşelerin yalama olmasına yol açar. Diş adımı ise tamamen farklı bir konudur: çapı tutsa bile metrik cıvata inç dişli somuna uymaz.',
      'Boru ölçülerinde "yarım inç", "bir inç" gibi adlar anma ölçüsüdür ve borunun gerçek dış çapını vermez; bu tür ölçüler için ilgili standart tablosuna bakılmalıdır. Araç yalnızca 1/16 çözünürlüğünde kesir üretir; 1/32 ya da 1/64 gerektiren hassas işlerde ondalıklı inç değerini kullanın. Sonuçlar bilgilendirme amaçlıdır; imalat toleransı gerektiren işlerde teknik resim ve standartlar esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['1 inç kaç milimetredir?', '1 inç tam olarak 25,4 milimetredir. Bu bir tanımdır; yuvarlama içermez. Yarım inç 12,7 mm, çeyrek inç 6,35 mm eder.'],
    ['1 milimetre kaç inçtir?', '1 milimetre yaklaşık 0,03937 inçtir. Binde inç olarak 39,37 thou eder. Hesap 1 ÷ 25,4 işlemiyle yapılır.'],
    ['1/2 inç kaç mm eder?', '1/2 inç 12,7 milimetredir. Araca kesri ondalık olarak, yani 0,5 biçiminde yazmanız gerekir; "1/2" yazımı sayı olarak kabul edilmez.'],
    ['Kesirli inçi ondalığa nasıl çeviririm?', 'Payı paydaya bölün. 3/8 için 3 ÷ 8 = 0,375; 5/16 için 5 ÷ 16 = 0,3125 bulunur. Tam sayılı kesirlerde tam kısmı ekleyin: 1 1/4 inç 1,25 inçtir.'],
    ['10 mm anahtar yerine 3/8 inç anahtar kullanılabilir mi?', 'Hayır, önerilmez. 3/8 inç 9,525 mm\'dir; 10 mm\'lik somuna girmez. Tersine, yakın büyüklükteki inç anahtar metrik somunda boşluk yapar ve köşeleri bozabilir. Her zaman doğru ölçü sistemindeki takımı kullanın.'],
    ['"Kesrin sapması" satırı ne anlama gelir?', 'En yakın 1/16 kesirli inç ölçüsünün, sizin girdiğiniz gerçek değerden kaç milimetre farklı olduğunu gösterir. Artı değer kesirli ölçünün daha büyük, eksi değer daha küçük olduğunu belirtir. Sapma yoksa değer tam olarak o kesre eşittir.'],
    ['Thou ile mikron arasındaki ilişki nedir?', '1 thou, yani inçin binde biri, 25,4 mikrondur. Tersinden 1 mikron yaklaşık 0,03937 thou eder.'],
    ['Ölçülerim bir sunucuya gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz değerler cihazınızdan çıkmaz ve hiçbir yerde saklanmaz.'],
  ],
  related: ['cm-inc-cevir', 'mikron-mm-cevir', 'parmak-cm-cevir', 'metre-feet-cevir', 'inc-piksel-cevir', 'birim-donustur'],
};
