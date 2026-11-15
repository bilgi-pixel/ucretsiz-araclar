export default {
  slug: 'kaldirac-hesapla',
  title: 'Kaldıraç Hesaplama',
  h1Tail: 'kuvvet × kuvvet kolu = yük × yük kolu',
  pageTitle: 'Kaldıraç Hesaplama – Kuvvet, Yük, Kol Uzunluğu ve Mekanik Avantaj',
  description: 'Kaldıraç denge bağıntısıyla gereken kuvveti, kaldırılabilecek yükü ya da kol uzunluklarını hesaplayın. Mekanik avantaj ve kuvvet-yol kazancı birlikte gösterilir.',
  card: 'Kaldıraçta gereken kuvveti, kaldırılabilecek yükü ya da kol uzunluğunu bulun; mekanik avantajı ve kazanç türünü görün.',
  category: 'bilim',
  keywords: ['kaldıraç hesaplama', 'kaldıraç formülü', 'kuvvet kolu yük kolu', 'mekanik avantaj hesaplama', 'basit makineler kaldıraç', 'kuvvet kazancı', 'destek noktası hesaplama'],
  lead: 'Dengedeki bir kaldıraçta <strong>kuvvet × kuvvet kolu = yük × yük kolu</strong> eşitliği geçerlidir. Dört büyüklükten üçünü yazın; araç dördüncüyü, mekanik avantajı ve kazancın kuvvetten mi yoldan mı olduğunu göstersin.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['kuvvet', 'Kuvvet'], ['yuk', 'Yük'], ['kuvvetKolu', 'Kuvvet kolu'], ['yukKolu', 'Yük kolu']] },
    { id: 'yuk', label: 'Yük (N)', type: 'number', placeholder: 'Örn. 600', hint: 'Yükün ağırlığı. Aranıyorsa boş bırakın.' },
    { id: 'yukKolu', label: 'Yük kolu (m)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Yükün desteğe uzaklığı. Aranıyorsa boş bırakın.' },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 150', hint: 'Uygulanan kuvvet. Aranıyorsa boş bırakın.' },
    { id: 'kuvvetKolu', label: 'Kuvvet kolu (m)', type: 'number', placeholder: 'Örn. 2', hint: 'Kuvvetin desteğe uzaklığı. Aranıyorsa boş bırakın.' },
  ],
  compute(v, h) {
    let P, x, F, y; // yük, yük kolu, kuvvet, kuvvet kolu
    if (v.bul !== 'yuk') P = h.pos(v.yuk, 'Yük');
    if (v.bul !== 'yukKolu') x = h.pos(v.yukKolu, 'Yük kolu');
    if (v.bul !== 'kuvvet') F = h.pos(v.kuvvet, 'Kuvvet');
    if (v.bul !== 'kuvvetKolu') y = h.pos(v.kuvvetKolu, 'Kuvvet kolu');
    if (v.bul === 'yuk') P = F * y / x;
    else if (v.bul === 'yukKolu') x = F * y / P;
    else if (v.bul === 'kuvvetKolu') y = P * x / F;
    else F = P * x / y;
    const ma = y / x;
    const satirlar = {
      kuvvet: ['Kuvvet', h.fmt(F, 4) + ' N'],
      yuk: ['Yük', h.fmt(P, 4) + ' N'],
      kuvvetKolu: ['Kuvvet kolu', h.fmt(y, 4) + ' m'],
      yukKolu: ['Yük kolu', h.fmt(x, 4) + ' m'],
    };
    const sira = [v.bul in satirlar ? v.bul : 'kuvvet'];
    for (const k of ['kuvvet', 'yuk', 'kuvvetKolu', 'yukKolu']) if (!sira.includes(k)) sira.push(k);
    let durum;
    if (Math.abs(ma - 1) < 1e-9) durum = 'Kuvvet ve yol kazancı yok (kollar eşit)';
    else if (ma > 1) durum = 'Kuvvetten kazanç, yoldan kayıp';
    else durum = 'Yoldan kazanç, kuvvetten kayıp';
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Mekanik avantaj', h.fmt(ma, 4)],
        ['Moment (her iki yanda)', h.fmt(P * x, 4) + ' N·m'],
        ['Durum', durum],
      ],
      note: 'İdeal kaldıraç varsayılmıştır: çubuğun ağırlığı ve sürtünme ihmal edilir. Mekanik avantaj = kuvvet kolu ÷ yük kolu = yük ÷ kuvvet.',
    };
  },
  cases: [
    { in: { bul: 'kuvvet', yuk: '600', yukKolu: '0,5', kuvvetKolu: '2' }, out: { 'Kuvvet': '150 N', 'Mekanik avantaj': '4', 'Durum': 'Kuvvetten kazanç, yoldan kayıp' } },
    { in: { bul: 'yuk', kuvvet: '100', kuvvetKolu: '1,5', yukKolu: '0,3' }, out: { 'Yük': '500 N', 'Mekanik avantaj': '5' } },
    { in: { bul: 'kuvvetKolu', yuk: '800', yukKolu: '0,25', kuvvet: '100' }, out: { 'Kuvvet kolu': '2 m', 'Mekanik avantaj': '8', 'Moment (her iki yanda)': '200 N·m' } },
    { in: { bul: 'yukKolu', yuk: '300', kuvvet: '60', kuvvetKolu: '1' }, out: { 'Yük kolu': '0,2 m', 'Mekanik avantaj': '5' } },
    { in: { bul: 'kuvvet', yuk: '2', yukKolu: '0,12', kuvvetKolu: '0,04' }, out: { 'Kuvvet': '6 N', 'Mekanik avantaj': '0,3333', 'Durum': 'Yoldan kazanç, kuvvetten kayıp' } },
    { in: { bul: 'kuvvet', yuk: '200', yukKolu: '1', kuvvetKolu: '1' }, out: { 'Kuvvet': '200 N', 'Durum': 'Kuvvet ve yol kazancı yok (kollar eşit)' } },
    { in: { bul: 'kuvvet', yuk: '600', yukKolu: '0,5', kuvvetKolu: '' }, error: true },
    { in: { bul: 'yuk', kuvvet: '100', kuvvetKolu: '1,5', yukKolu: '0' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden hangi değeri aradığınızı seçin: uygulanacak kuvvet, kaldırılabilecek yük ya da kollardan biri.',
    'Bilinen üç değeri yazın. Yük ve kuvveti newton, kol uzunluklarını metre olarak girin; kollar destek noktasından ölçülür.',
    'Yük kütle olarak verildiyse önce ağırlığa çevirin: kilogram değerini yaklaşık 9,81 ile çarpın (ya da soruda verilen g değerini kullanın).',
    '"Hesapla" düğmesine basın. Aranan değerle birlikte mekanik avantaj, iki yandaki ortak moment ve kazancın türü görüntülenir.',
  ],
  sections: [
    { h: 'Kaldıraç nedir ve nasıl çalışır?', p: [
      'Kaldıraç, sabit bir destek noktası etrafında dönebilen sert bir çubuktan oluşan en eski basit makinedir. Bir ucuna kuvvet uygulanır, diğer bir noktasında yük taşınır. Çubuk dengedeyken ya da sabit hızla dönerken kuvvetin desteğe göre momenti yükün momentine eşittir. Bu yüzden desteğe uzak bir noktadan uygulanan küçük bir kuvvet, desteğe yakın duran büyük bir yükü dengeleyebilir.',
      'Kaldıraç iş ya da enerji kazandırmaz. Kuvvetten ne kadar kazanılıyorsa yoldan o oranda kaybedilir: kuvvetin dört katı büyüklüğünde bir yükü kaldıran kaldıraçta elinizin gittiği yol, yükün yükseldiği yolun dört katıdır. Araç bu ilişkiyi "Durum" satırında özetler.',
    ] },
    { h: 'Kaldıraç formülü', p: [
      'Denge koşulu <strong>F · y = P · x</strong> olarak yazılır. F uygulanan kuvvet, y kuvvet kolu (kuvvetin desteğe uzaklığı), P yük, x yük koludur (yükün desteğe uzaklığı). Bu eşitlikten dört büyüklüğün her biri çekilebilir: F = P · x ÷ y, P = F · y ÷ x, y = P · x ÷ F ve x = F · y ÷ P.',
      '<strong>Mekanik avantaj</strong>, yükün kuvvete oranıdır ve ideal kaldıraçta kolların oranına eşittir: MA = P ÷ F = y ÷ x. Mekanik avantaj 1\'den büyükse kuvvetten kazanılır, 1\'den küçükse yoldan (ve hızdan) kazanılır, tam 1 ise yalnızca kuvvetin yönü değişir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 (levye):</strong> 600 N ağırlığındaki bir taş, desteğe 0,5 m uzaklıkta duruyor. Levyenin diğer ucundan, desteğe 2 m uzaklıktan bastırılıyor. Gereken kuvvet F = 600 × 0,5 ÷ 2 = 150 N, mekanik avantaj 2 ÷ 0,5 = 4\'tür. Her iki yandaki moment 300 N·m\'dir.',
      '<strong>Örnek 2 (el arabası):</strong> Tutma kollarından 100 N ile kaldırılan bir el arabasında eller tekerlek aksına 1,5 m, yükün ağırlık merkezi ise 0,3 m uzaklıkta. Taşınabilecek yük P = 100 × 1,5 ÷ 0,3 = 500 N olur; mekanik avantaj 5\'tir.',
      '<strong>Örnek 3 (cımbız):</strong> Cımbızda kuvvet desteğe 4 cm, tutulan cisim 12 cm uzaklıkta olsun. 2 N\'luk bir tutma kuvveti elde etmek için parmakların uygulaması gereken kuvvet 2 × 0,12 ÷ 0,04 = 6 N\'dur. Mekanik avantaj 0,3333 çıkar; yani kuvvetten kaybedilir, karşılığında uçlar parmaklardan daha fazla yol alır ve hassas hareket sağlanır.',
    ] },
    { h: 'Kaldıraç türleri', ul: [
      '<strong>Destek ortada (birinci tür):</strong> tahterevalli, makas, pense, levye, eşit kollu terazi. Kolların oranına göre kuvvetten ya da yoldan kazanç sağlanabilir.',
      '<strong>Yük ortada (ikinci tür):</strong> el arabası, ceviz kıracağı, gazoz açacağı, kapı. Kuvvet kolu her zaman yük kolundan uzundur; daima kuvvetten kazanılır.',
      '<strong>Kuvvet ortada (üçüncü tür):</strong> cımbız, maşa, olta, kürek, insan ön kolu. Kuvvet kolu yük kolundan kısadır; kuvvetten kaybedilir, yoldan ve hızdan kazanılır.',
    ], p: [
      'Hangi tür olursa olsun hesap aynıdır: kollar her zaman destek noktasından ölçülür. Araç türü sormaz; yalnızca iki kolun uzunluğunu doğru girmeniz yeterlidir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En sık görülen yanlış, kolları desteğe göre değil çubuğun ucuna göre ölçmektir. İkinci ve üçüncü tür kaldıraçlarda destek uçtadır ve iki kol aynı taraftadır; yük kolu ile kuvvet kolu üst üste biner, toplanmaz. Bir başka hata, kütleyi doğrudan yük olarak yazmaktır. Denge bağıntısı oran olduğu için yükü ve kuvveti aynı birimde (örneğin ikisini de kilogram-kuvvet olarak) girerseniz oran yine doğru çıkar, ancak moment satırı o zaman N·m olarak yorumlanmamalıdır.',
      'Kol uzunluklarının ikisi de aynı birimde olmalıdır. Biri santimetre biri metre girilirse sonuç yüz kat sapar.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap ideal kaldıraç içindir: çubuk ağırlıksız ve tamamen sert kabul edilir, destekte sürtünme yoktur, kuvvet ve yük çubuğa dik etkir. Ağırlığı ihmal edilemeyen türdeş bir çubukta çubuğun ağırlığı, ağırlık merkezinden etkiyen ek bir yük gibi momente katılmalıdır; bu araç onu hesaba katmaz. Gerçek uygulamalarda sürtünme ve esneme nedeniyle gereken kuvvet biraz daha büyük olur. Sonuçlar eğitim ve ön fikir amaçlıdır; yük kaldırma ve iş güvenliğiyle ilgili kararlarda ekipmanın taşıma kapasitesine ve uzman görüşüne başvurun.',
    ] },
  ],
  faq: [
    ['Kaldıraç formülü nedir?', 'Kuvvet × kuvvet kolu = yük × yük kolu. Kollar destek noktasından ölçülür. Örneğin 600 N\'luk yük 0,5 m\'de, kuvvet 2 m\'de ise gereken kuvvet 600 × 0,5 ÷ 2 = 150 N\'dur.'],
    ['Mekanik avantaj nasıl bulunur?', 'İdeal kaldıraçta kuvvet kolunun yük koluna bölünmesiyle bulunur; bu oran aynı zamanda yükün kuvvete oranıdır. 2 m kuvvet kolu ve 0,5 m yük kolu için mekanik avantaj 4\'tür.'],
    ['Kaldıraç işten kazanç sağlar mı?', 'Hayır. Hiçbir basit makine işten ya da enerjiden kazanç sağlamaz. Kuvvetten kazanılıyorsa aynı oranda yoldan kaybedilir; ideal durumda yapılan iş, yük üzerinde yapılan işe eşittir.'],
    ['Yük kilogram olarak verilmişse ne yapmalıyım?', 'Kütleyi yerçekimi ivmesiyle çarparak ağırlığa çevirin. 50 kg\'lık bir yük yaklaşık 50 × 9,81 = 490,5 N eder. Okul sorularında g çoğu zaman 10 alınır; o durumda 500 N yazın.'],
    ['Cımbız ve maşa neden kuvvet kaybettirir?', 'Bu araçlarda kuvvet, destek ile yük arasında uygulanır; kuvvet kolu yük kolundan kısadır ve mekanik avantaj 1\'den küçüktür. Kayıp bilerek kabul edilir, çünkü karşılığında uçlar daha geniş ve daha hızlı hareket eder.'],
    ['Destek noktasını nereye koyarsam en az kuvvetle kaldırırım?', 'Desteği yüke mümkün olduğunca yaklaştırın. Yük kolu kısaldıkça ve kuvvet kolu uzadıkça mekanik avantaj artar. 3 m\'lik çubukta desteği yükten 0,5 m uzağa koyarsanız avantaj 2,5 ÷ 0,5 = 5 olur.'],
    ['Çubuğun kendi ağırlığı hesaba katılıyor mu?', 'Hayır, araç ağırlıksız çubuk varsayar. Ağır bir çubukta çubuğun ağırlığını, orta noktasından etkiyen ayrı bir kuvvet olarak moment hesabına siz eklemelisiniz.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; girdiğiniz sayılar sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['tork-hesapla', 'kuvvet-hesapla', 'egik-duzlem-hesapla', 'is-hesapla', 'kutle-agirlik-hesapla'],
};
