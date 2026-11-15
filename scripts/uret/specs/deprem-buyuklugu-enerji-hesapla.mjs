export default {
  slug: 'deprem-buyuklugu-enerji-hesapla',
  title: 'Deprem Büyüklüğü Enerji Karşılaştırma',
  h1Tail: 'iki büyüklük arasındaki fark',
  pageTitle: 'Deprem Büyüklüğü Enerji Karşılaştırma – Kaç Kat Daha Güçlü?',
  description: 'İki deprem büyüklüğünü karşılaştırın: açığa çıkan enerji kaç kat, yer hareketi genliği kaç kat fark ediyor? Enerjiyi joule ve TNT eşdeğeri olarak görün.',
  card: 'İki deprem büyüklüğü arasındaki enerji ve genlik farkını kat olarak hesaplayın; enerjiyi joule ve TNT eşdeğeriyle görün.',
  category: 'gunluk',
  keywords: ['deprem büyüklüğü karşılaştırma', 'deprem enerjisi hesaplama', '7 büyüklüğündeki deprem 6\'dan kaç kat güçlü', 'deprem kaç kat büyük', 'moment büyüklüğü enerji', 'deprem tnt eşdeğeri', 'richter ölçeği logaritmik'],
  lead: '7,0 büyüklüğündeki bir deprem, 6,0 büyüklüğündekinden "bir puan" büyük değildir; yaklaşık 32 kat daha fazla enerji açığa çıkarır. Bu araç, yazdığınız iki büyüklük arasındaki <strong>enerji ve genlik oranını</strong> hesaplar, her depremin enerjisini joule ve TNT eşdeğeri olarak verir.',
  button: 'Karşılaştır',
  inputs: [
    { id: 'm1', label: '1. depremin büyüklüğü', type: 'number', placeholder: 'Örn. 7,7' },
    { id: 'm2', label: '2. depremin büyüklüğü (isteğe bağlı)', type: 'number', placeholder: 'Örn. 6,0', hint: 'Boş bırakırsanız yalnızca 1. depremin enerjisi hesaplanır' },
  ],
  compute(v, h) {
    const m1 = h.num(v.m1, '1. depremin büyüklüğü');
    const var2 = String(v.m2 ?? '').trim() !== '';
    const m2 = var2 ? h.num(v.m2, '2. depremin büyüklüğü') : null;
    const sinir = (m, ad) => { if (m < 0 || m > 10) h.err(`"${ad}" 0 ile 10 arasında olmalı (örn. 6,5).`); };
    sinir(m1, '1. depremin büyüklüğü');
    if (var2) sinir(m2, '2. depremin büyüklüğü');
    const enerji = (m) => Math.pow(10, 1.5 * m + 4.8);
    const bilim = (x) => {
      let us = Math.floor(Math.log10(x) + 1e-12);
      let man = x / Math.pow(10, us);
      if (Number(man.toFixed(2)) >= 10) { man /= 10; us += 1; }
      return `${h.fmt(man, 2)} × 10^${us} J`;
    };
    const tnt = (x) => {
      const ton = x / 4.184e9;
      if (ton >= 1e6) return h.fmt(ton / 1e6, 2) + ' megaton TNT';
      if (ton >= 1000) return h.fmt(ton / 1000, 2) + ' kiloton TNT';
      if (ton >= 1) return h.fmt(ton, 2) + ' ton TNT';
      return h.fmt(ton * 1000, 2) + ' kg TNT';
    };
    const e1 = enerji(m1);
    if (!var2) {
      return {
        rows: [
          ['Açığa çıkan sismik enerji', bilim(e1)],
          ['TNT eşdeğeri', tnt(e1)],
          ['Elektrik enerjisi karşılığı', h.sig(e1 / 3.6e6, 3) + ' kWh'],
        ],
        note: 'Enerji, log E = 1,5 × M + 4,8 (joule) bağıntısıyla hesaplanan, sismik dalgalarla yayılan yaklaşık enerjidir.',
      };
    }
    const fark = Math.abs(m1 - m2);
    const e2 = enerji(m2);
    const guclu = Math.abs(m1 - m2) < 1e-12 ? 'İki deprem eşit büyüklükte' : m1 > m2 ? '1. deprem' : '2. deprem';
    return {
      rows: [
        ['Enerji oranı', h.fmt(Math.pow(10, 1.5 * fark), 2) + ' kat'],
        ['Genlik oranı', h.fmt(Math.pow(10, fark), 2) + ' kat'],
        ['Büyüklük farkı', h.fmt(fark, 2)],
        ['Daha güçlü olan', guclu],
        ['1. depremin enerjisi', bilim(e1)],
        ['1. depremin TNT eşdeğeri', tnt(e1)],
        ['2. depremin enerjisi', bilim(e2)],
        ['2. depremin TNT eşdeğeri', tnt(e2)],
      ],
      note: 'Oranlar büyük olanın küçük olana oranıdır. Büyüklük depremin kaynağındaki enerjiyi anlatır; bir yerde hissedilen şiddet ve hasar ayrıca derinliğe, uzaklığa, zemine ve yapı kalitesine bağlıdır.',
    };
  },
  cases: [
    { in: { m1: '7', m2: '6' }, out: { 'Enerji oranı': '31,62 kat', 'Genlik oranı': '10 kat', 'Daha güçlü olan': '1. deprem', '1. depremin TNT eşdeğeri': '476,88 kiloton TNT', '2. depremin enerjisi': '6,31 × 10^13 J' } },
    { in: { m1: '6', m2: '8' }, out: { 'Enerji oranı': '1.000 kat', 'Genlik oranı': '100 kat', 'Daha güçlü olan': '2. deprem' } },
    { in: { m1: '6' }, out: { 'Açığa çıkan sismik enerji': '6,31 × 10^13 J', 'TNT eşdeğeri': '15,08 kiloton TNT' } },
    { in: { m1: '7,7', m2: '7,5' }, out: { 'Enerji oranı': '2 kat', 'Genlik oranı': '1,58 kat', '1. depremin TNT eşdeğeri': '5,35 megaton TNT' } },
    { in: { m1: '5', m2: '4,5' }, out: { 'Enerji oranı': '5,62 kat', 'Genlik oranı': '3,16 kat', '1. depremin TNT eşdeğeri': '476,88 ton TNT', '2. depremin TNT eşdeğeri': '84,8 ton TNT' } },
    { in: { m1: '6,3', m2: '5' }, out: { 'Enerji oranı': '89,13 kat', 'Genlik oranı': '19,95 kat' } },
    { in: { m1: '7', m2: '7' }, out: { 'Enerji oranı': '1 kat', 'Daha güçlü olan': 'İki deprem eşit büyüklükte' } },
    { in: { m1: '2' }, out: { 'TNT eşdeğeri': '15,08 kg TNT' } },
    { in: { m1: '' }, error: true },
    { in: { m1: '12', m2: '6' }, error: true },
    { in: { m1: '7', m2: 'büyük' }, error: true },
  ],
  howto: [
    '"1. depremin büyüklüğü" alanına karşılaştırmak istediğiniz ilk depremin büyüklüğünü yazın (örneğin 7,7). Ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"2. depremin büyüklüğü" alanına ikinci depremin büyüklüğünü yazın. Yalnızca tek bir depremin enerjisini görmek istiyorsanız bu alanı boş bırakın.',
    '"Karşılaştır" düğmesine basın.',
    'İlk satırda enerjinin, ikinci satırda yer hareketi genliğinin kaç kat fark ettiğini; alt satırlarda her depremin joule ve TNT eşdeğeri olarak enerjisini görürsünüz.',
  ],
  sections: [
    { h: 'Büyüklük ölçeği neden yanıltıcı görünür?', p: [
      'Deprem büyüklüğü logaritmik bir ölçektir. Günlük hayatta kullandığımız ölçeklerin çoğu doğrusaldır: 20 kilo 10 kilonun iki katıdır. Büyüklükte ise her tam sayı artış, sismografın kaydettiği dalga genliğinin 10 katına, açığa çıkan enerjinin ise yaklaşık 32 katına karşılık gelir. İki tam sayı fark, enerjide 1.000 kat demektir. Bu yüzden 5,0 ile 7,0 arasındaki fark "iki puan" değil, bin kat enerjidir.',
      'Aynı nedenle ondalık farklar da küçümsenmemelidir. Büyüklükteki 0,2\'lik bir fark enerjide iki kat, 0,1\'lik bir fark ise yaklaşık yüzde 41 fazla enerji anlamına gelir. Haberlerde bir depremin büyüklüğü farklı kurumlarca 7,7 ve 7,8 olarak açıklandığında aradaki fark sanıldığından önemlidir.',
    ] },
    { h: 'Kullanılan bağıntılar', p: [
      'Araç, sismolojide yaygın kullanılan Gutenberg-Richter enerji bağıntısını temel alır: <strong>log<sub>10</sub>E = 1,5 × M + 4,8</strong>. Burada M büyüklük, E sismik dalgalarla yayılan enerjidir (joule). Bağıntıdan iki sonuç çıkar:',
    ], ul: [
      '<strong>Enerji oranı = 10<sup>1,5 × ΔM</sup></strong>. ΔM = 1 için 10<sup>1,5</sup> ≈ 31,62; ΔM = 2 için 1.000.',
      '<strong>Genlik oranı = 10<sup>ΔM</sup></strong>. ΔM = 1 için 10; ΔM = 2 için 100.',
      '<strong>TNT eşdeğeri:</strong> 1 ton TNT = 4,184 × 10<sup>9</sup> joule kabul edilir; enerji bu değere bölünür.',
      '<strong>Elektrik karşılığı:</strong> 1 kWh = 3,6 × 10<sup>6</sup> joule.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 7,0 ve 6,0:</strong> Fark 1,0\'dır. Enerji oranı 10<sup>1,5</sup> = <strong>31,62 kat</strong>, genlik oranı 10 kattır. 6,0 büyüklüğündeki depremin enerjisi 10<sup>13,8</sup> ≈ 6,31 × 10<sup>13</sup> J, yani yaklaşık 15 kiloton TNT\'dir. 7,0 büyüklüğündeki depremin enerjisi ise yaklaşık 477 kiloton TNT eder.',
      '<strong>Örnek 2 – 7,7 ve 7,5:</strong> Fark yalnızca 0,2\'dir, ancak enerji oranı 10<sup>0,3</sup> ≈ <strong>2 kat</strong>, genlik oranı 1,58 kattır. 7,7 büyüklüğündeki depremin enerjisi yaklaşık 5,35 megaton TNT eşdeğeridir.',
      '<strong>Örnek 3 – 6,0 ve 8,0:</strong> İki birimlik fark enerjide 1.000 kat, genlikte 100 kat demektir. 8 büyüklüğünde tek bir depremin enerjisine ulaşmak için 6 büyüklüğünde bin deprem gerekir.',
      '<strong>Örnek 4 – 5,0 ve 4,5:</strong> Yarım birimlik fark enerjide 5,62 kat, genlikte 3,16 kattır.',
    ] },
    { h: 'Hızlı başvuru: büyüklük farkı ve enerji oranı', ul: [
      '<strong>0,1 fark:</strong> yaklaşık 1,41 kat enerji',
      '<strong>0,2 fark:</strong> yaklaşık 2 kat',
      '<strong>0,5 fark:</strong> yaklaşık 5,6 kat',
      '<strong>1,0 fark:</strong> yaklaşık 31,6 kat',
      '<strong>1,5 fark:</strong> yaklaşık 178 kat',
      '<strong>2,0 fark:</strong> 1.000 kat',
      '<strong>3,0 fark:</strong> yaklaşık 31.600 kat',
    ] },
    { h: 'Büyüklük ile şiddet aynı şey değildir', p: [
      'Büyüklük, depremin kaynağında açığa çıkan enerjinin ölçüsüdür ve bir deprem için tek bir değerdir. <strong>Şiddet</strong> ise depremin belirli bir yerde insanlar, yapılar ve doğa üzerindeki etkisini anlatır; aynı deprem merkez üssüne yakın bir ilçede çok yüksek, yüzlerce kilometre uzakta düşük şiddette hissedilir. Şiddeti belirleyen etkenler arasında odak derinliği, fayın yırtılma yönü, merkeze uzaklık, yerel zemin koşulları ve sarsıntının süresi vardır.',
      'Bu yüzden bu araçtaki oranlar hasarı doğrudan öngörmez. Sığ ve yerleşim yerinin altındaki 6 büyüklüğünde bir deprem, açık denizde ve derinde oluşan 7 büyüklüğünde bir depremden çok daha yıkıcı olabilir. Hasarı asıl belirleyen, yapıların depreme dayanıklı tasarlanıp tasarlanmadığıdır.',
    ] },
    { h: 'Hangi büyüklük türü?', p: [
      'Halk arasında "Richter ölçeği" denilse de bugün büyük depremler için kurumlar çoğunlukla <strong>moment büyüklüğünü</strong> (Mw) açıklar. Richter\'in özgün yerel büyüklüğü (ML) büyük depremlerde doygunluğa ulaşır ve enerjiyi olduğundan küçük gösterir; moment büyüklüğü ise fayın yırtılan alanına ve kayma miktarına dayandığı için büyük depremlerde de güvenilirdir. İki farklı kurumun ya da iki farklı büyüklük türünün değerlerini karşılaştırırken aynı tür ölçünün kullanıldığından emin olun; aksi halde hesaplanan oran yanıltıcı olur.',
    ] },
    { h: 'Sınırlar', p: [
      'Enerji bağıntısı deneysel bir ortalamadır; gerçek depremlerde yayılan sismik enerji, aynı büyüklük için birkaç kat sapabilir. Hesaplanan değer, fay boyunca harcanan toplam enerjinin yalnızca dalgalar halinde yayılan bölümüdür; ısıya ve kayaçların kırılmasına giden enerji bunun dışındadır. TNT ve kilovatsaat karşılıkları, büyüklüğün ne kadar hızlı büyüdüğünü sezdirmek için verilen kaba benzetmelerdir. Bu sayfa eğitim ve bilgilendirme amaçlıdır; deprem tehlikesi, yapı güvenliği ve afet planlaması için resmî kurumların verileri ve uzman değerlendirmesi esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['7 büyüklüğündeki deprem 6 büyüklüğündekinden kaç kat güçlüdür?', 'Açığa çıkan enerji bakımından yaklaşık 31,6 kat, sismografta kaydedilen genlik bakımından 10 kat daha büyüktür.'],
    ['Büyüklükteki 0,1\'lik fark önemli midir?', 'Evet. 0,1\'lik fark yaklaşık yüzde 41 daha fazla enerji demektir; 0,2\'lik fark ise enerjiyi iki katına çıkarır.'],
    ['Enerji oranı ile genlik oranı arasındaki fark nedir?', 'Genlik oranı, sismograftaki dalga yüksekliğinin kaç kat arttığını gösterir ve her birim için 10 kattır. Enerji oranı ise açığa çıkan toplam enerjiyi karşılaştırır ve her birim için yaklaşık 32 kattır. "Kaç kat güçlü" sorusunun cevabı çoğu zaman enerji oranıdır.'],
    ['Richter ölçeği ile moment büyüklüğü aynı mı?', 'Hayır. Richter\'in yerel büyüklüğü küçük ve orta, yakın depremler için tanımlanmıştır. Büyük depremlerde bugün moment büyüklüğü (Mw) kullanılır. Orta büyüklüklerde iki değer birbirine yakındır.'],
    ['Daha büyük deprem her zaman daha çok hasar verir mi?', 'Hayır. Hasar; derinliğe, yerleşim yerine uzaklığa, zemine ve en çok da yapı kalitesine bağlıdır. Büyüklük yalnızca kaynaktaki enerjiyi anlatır.'],
    ['Kaç küçük deprem bir büyük depremin enerjisini boşaltır?', 'Enerji oranı kadar. Örneğin 7 büyüklüğündeki tek bir depremin enerjisi için 5 büyüklüğünde yaklaşık 1.000 deprem gerekir. Bu yüzden küçük depremlerin büyük bir depremin enerjisini "boşalttığı" düşüncesi sayısal olarak gerçekçi değildir.'],
    ['TNT eşdeğeri ne anlama geliyor?', 'Enerjinin, patladığında aynı miktarda enerji veren TNT kütlesi olarak ifade edilmesidir. 6 büyüklüğündeki bir depremin sismik enerjisi yaklaşık 15 kiloton TNT\'ye denktir. Bu yalnızca büyüklük duygusu vermek için kullanılan bir benzetmedir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız büyüklükler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['bilimsel-gosterim-cevir', 'kwh-joule-cevir', 'kinetik-enerji-hesapla', 'kutle-enerji-hesapla', 'simsek-mesafesi-hesapla'],
};
