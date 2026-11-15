export default {
  slug: 'elektron-dizilimi-bul',
  title: 'Elektron Dizilimi Bulma',
  h1Tail: 'orbital ve katman dağılımı',
  pageTitle: 'Elektron Dizilimi Bulma – Atom Numarasından Orbital Dizilimi',
  description: 'Atom numarasını ya da element sembolünü yazın; elektron dizilimini, soy gaz kısaltmasını, katman dağılımını ve eşleşmemiş elektron sayısını görün.',
  card: 'Atom numarası ya da sembolden elektron dizilimini, soy gaz kısaltmasını ve katman dağılımını bulun; istisnalar dahil.',
  category: 'bilim',
  keywords: ['elektron dizilimi', 'elektron dizilimi bulma', 'elektron dağılımı', 'orbital dizilimi', 'katman elektron dağılımı', 'soy gaz kısaltması', 'krom bakır elektron dizilimi', 'aufbau kuralı'],
  lead: 'Bir elementin atom numarasını ya da sembolünü yazın; nötr atomun temel hâl <strong>elektron dizilimini</strong> orbital orbital görün. Krom ve bakır gibi kurala uymayan elementler için bilinen istisnalar uygulanır.',
  button: 'Bul',
  inputs: [
    { id: 'element', label: 'Atom numarası ya da sembol', type: 'text', placeholder: 'Örn. 26 ya da Fe', hint: '1–118 arası bir sayı ya da Fe, Cu, Na gibi bir element sembolü yazın.' },
  ],
  compute(v, h) {
    const SEM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
    const AD = 'Hidrojen Helyum Lityum Berilyum Bor Karbon Azot Oksijen Flor Neon Sodyum Magnezyum Alüminyum Silisyum Fosfor Kükürt Klor Argon Potasyum Kalsiyum Skandiyum Titanyum Vanadyum Krom Mangan Demir Kobalt Nikel Bakır Çinko Galyum Germanyum Arsenik Selenyum Brom Kripton Rubidyum Stronsiyum İtriyum Zirkonyum Niyobyum Molibden Teknesyum Rutenyum Rodyum Paladyum Gümüş Kadmiyum İndiyum Kalay Antimon Tellür İyot Ksenon Sezyum Baryum Lantan Seryum Praseodim Neodim Prometyum Samaryum Evropiyum Gadolinyum Terbiyum Disprosyum Holmiyum Erbiyum Tulyum İterbiyum Lutesyum Hafniyum Tantal Tungsten Renyum Osmiyum İridyum Platin Altın Cıva Talyum Kurşun Bizmut Polonyum Astatin Radon Fransiyum Radyum Aktinyum Toryum Protaktinyum Uranyum Neptünyum Plütonyum Amerikyum Küriyum Berkelyum Kaliforniyum Aynştaynyum Fermiyum Mendelevyum Nobelyum Lavrensiyum Rutherfordiyum Dubniyum Seaborgiyum Bohriyum Hassiyum Meitneriyum Darmstadtiyum Röntgenyum Kopernikyum Nihonyum Flerovyum Moskovyum Livermoryum Tennesin Oganesson'.split(' ');
    const SIRA = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
    const KAP = { s: 2, p: 6, d: 10, f: 14 };
    // Aufbau sırasına uymayan, bilinen temel hâl dizilimleri (yalnızca farklı orbitaller)
    const ISTISNA = {
      24: { '4s': 1, '3d': 5 }, 29: { '4s': 1, '3d': 10 },
      41: { '5s': 1, '4d': 4 }, 42: { '5s': 1, '4d': 5 }, 44: { '5s': 1, '4d': 7 }, 45: { '5s': 1, '4d': 8 },
      46: { '5s': 0, '4d': 10 }, 47: { '5s': 1, '4d': 10 },
      57: { '4f': 0, '5d': 1 }, 58: { '4f': 1, '5d': 1 }, 64: { '4f': 7, '5d': 1 },
      78: { '6s': 1, '5d': 9 }, 79: { '6s': 1, '5d': 10 },
      89: { '5f': 0, '6d': 1 }, 90: { '5f': 0, '6d': 2 }, 91: { '5f': 2, '6d': 1 }, 92: { '5f': 3, '6d': 1 },
      93: { '5f': 4, '6d': 1 }, 96: { '5f': 7, '6d': 1 }, 103: { '6d': 0, '7p': 1 },
    };
    const t = String(v.element ?? '').trim();
    if (t === '') h.err('Atom numarasını (1–118) ya da element sembolünü yazın.');
    let z;
    if (/^\d+$/.test(t)) {
      z = Number(t);
      if (z < 1 || z > 118) h.err('Atom numarası 1 ile 118 arasında olmalı.');
    } else {
      const k = t.replace(/İ/g, 'I').replace(/ı/g, 'i').toLowerCase();
      z = SEM.findIndex((s) => s.toLowerCase() === k) + 1;
      if (z < 1) h.err(`"${t}" bilinen bir element sembolü değil. Fe, Cu, Na gibi bir sembol ya da 1–118 arası atom numarası yazın.`);
    }
    const doldur = (n) => {
      const d = {};
      let kalan = n;
      for (const o of SIRA) {
        const al = Math.min(kalan, KAP[o[1]]);
        d[o] = al;
        kalan -= al;
      }
      return d;
    };
    const d = doldur(z);
    const ist = ISTISNA[z];
    if (ist) Object.assign(d, ist);
    const UST = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const ust = (n) => String(n).split('').map((c) => UST[+c]).join('');
    const yaz = (liste) => liste.map((o) => o + ust(d[o])).join(' ');
    const dolu = SIRA.filter((o) => d[o] > 0);
    const soylar = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']];
    const soy = soylar.find(([n]) => n < z);
    let kisa;
    if (soy) {
      const cekirdek = doldur(soy[0]);
      const dis = SIRA.filter((o) => d[o] > 0 && cekirdek[o] === 0);
      kisa = `[${soy[1]}] ${yaz(dis)}`;
    } else kisa = yaz(dolu);
    const kabukSirasi = [...dolu].sort((a, b) => (+a[0] - +b[0]) || ('spdf'.indexOf(a[1]) - 'spdf'.indexOf(b[1])));
    const katman = [0, 0, 0, 0, 0, 0, 0];
    for (const o of dolu) katman[+o[0] - 1] += d[o];
    while (katman.length && katman[katman.length - 1] === 0) katman.pop();
    let tek = 0;
    for (const o of dolu) { const c = KAP[o[1]]; tek += d[o] <= c / 2 ? d[o] : c - d[o]; }
    const periyot = [2, 10, 18, 36, 54, 86, 118].findIndex((n) => z <= n) + 1;
    let note = 'Dizilim nötr atomun temel hâli içindir; iyonlar ve uyarılmış hâller kapsam dışıdır.';
    if (ist) note = 'Bu element Aufbau sırasına tam uymaz; bilinen temel hâl dizilimi gösterilmiştir. ' + note;
    else if (z > 103) note = 'Atom numarası 103\'ten büyük elementlerde dizilim deneysel olarak kesinleşmemiştir; Aufbau sırasına göre öngörülen dizilim gösterilmiştir. ' + note;
    return {
      rows: [
        ['Elektron dizilimi', yaz(dolu)],
        ['Soy gaz kısaltmasıyla', kisa],
        ['Kabuk sırasına göre', yaz(kabukSirasi)],
        ['Katman dağılımı', katman.join('-')],
        ['Element', `${AD[z - 1]} (${SEM[z - 1]}), atom numarası ${z}`],
        ['Periyot', String(periyot)],
        ['Son katmandaki elektron sayısı', String(katman[katman.length - 1])],
        ['Eşleşmemiş elektron sayısı', String(tek)],
      ],
      note,
    };
  },
  cases: [
    { in: { element: '26' }, out: { 'Elektron dizilimi': '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶', 'Soy gaz kısaltmasıyla': '[Ar] 4s² 3d⁶', 'Kabuk sırasına göre': '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²', 'Katman dağılımı': '2-8-14-2', 'Eşleşmemiş elektron sayısı': '4', 'Periyot': '4' } },
    { in: { element: 'Cu' }, out: { 'Elektron dizilimi': '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰', 'Katman dağılımı': '2-8-18-1', 'Element': 'Bakır (Cu), atom numarası 29' } },
    { in: { element: '11' }, out: { 'Elektron dizilimi': '1s² 2s² 2p⁶ 3s¹', 'Soy gaz kısaltmasıyla': '[Ne] 3s¹', 'Katman dağılımı': '2-8-1', 'Son katmandaki elektron sayısı': '1' } },
    { in: { element: '24' }, out: { 'Soy gaz kısaltmasıyla': '[Ar] 4s¹ 3d⁵', 'Eşleşmemiş elektron sayısı': '6' } },
    { in: { element: '1' }, out: { 'Elektron dizilimi': '1s¹', 'Soy gaz kısaltmasıyla': '1s¹', 'Katman dağılımı': '1', 'Periyot': '1' } },
    { in: { element: 'cl' }, out: { 'Soy gaz kısaltmasıyla': '[Ne] 3s² 3p⁵', 'Katman dağılımı': '2-8-7', 'Eşleşmemiş elektron sayısı': '1' } },
    { in: { element: '10' }, out: { 'Elektron dizilimi': '1s² 2s² 2p⁶', 'Soy gaz kısaltmasıyla': '[He] 2s² 2p⁶', 'Eşleşmemiş elektron sayısı': '0' } },
    { in: { element: '79' }, out: { 'Soy gaz kısaltmasıyla': '[Xe] 6s¹ 4f¹⁴ 5d¹⁰', 'Katman dağılımı': '2-8-18-32-18-1', 'Periyot': '6' } },
    { in: { element: 'U' }, out: { 'Soy gaz kısaltmasıyla': '[Rn] 7s² 5f³ 6d¹', 'Katman dağılımı': '2-8-18-32-21-9-2' } },
    { in: { element: '46' }, out: { 'Soy gaz kısaltmasıyla': '[Kr] 4d¹⁰', 'Katman dağılımı': '2-8-18-18', 'Periyot': '5' } },
    { in: { element: '119' }, error: true },
    { in: { element: 'Xx' }, error: true },
    { in: { element: '' }, error: true },
  ],
  howto: [
    'Kutuya elementin atom numarasını (örneğin 26) ya da sembolünü (örneğin Fe) yazın. Sembolde büyük-küçük harf ayrımı yapılmaz.',
    '"Bul" düğmesine basın. İlk satırda orbitallerin dolma sırasına göre yazılmış tam dizilim görünür.',
    'Kısa yazım gerekiyorsa "Soy gaz kısaltmasıyla" satırını, ders kitabınız orbitalleri baş kuantum sayısına göre sıralıyorsa "Kabuk sırasına göre" satırını kullanın.',
    '"Katman dağılımı" satırından her enerji düzeyindeki toplam elektron sayısını, alttaki satırlardan periyodu ve eşleşmemiş elektron sayısını okuyun.',
    'Sonucun altındaki notu kontrol edin; element bir istisna ise ya da dizilimi öngörüye dayanıyorsa orada belirtilir.',
  ],
  sections: [
    { h: 'Elektron dizilimi nedir?', p: [
      'Elektron dizilimi, bir atomdaki elektronların hangi enerji düzeylerine ve orbitallere yerleştiğini gösteren yazımdır. <code>1s² 2s² 2p⁶</code> gibi bir ifadede baştaki rakam enerji düzeyini (baş kuantum sayısı), harf orbital türünü, üstteki sayı ise o alt kabuktaki elektron sayısını belirtir. Üst sayıların toplamı nötr atomda atom numarasına eşittir.',
      'Dizilim, elementin periyodik tablodaki yerini, kaç bağ yapabileceğini, hangi iyonu oluşturmaya yatkın olduğunu ve manyetik özelliklerini anlamanın çıkış noktasıdır. Bu yüzden lise kimya müfredatında ve üniversite sınavlarında temel konulardan biridir.',
    ] },
    { h: 'Dizilim hangi kurallara göre yazılır?', ul: [
      '<strong>Aufbau (yapılanma) kuralı:</strong> elektronlar en düşük enerjili orbitalden başlayarak yerleşir. Dolma sırası 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p biçimindedir.',
      '<strong>Kapasite:</strong> s alt kabuğu en çok 2, p alt kabuğu 6, d alt kabuğu 10, f alt kabuğu 14 elektron alır.',
      '<strong>Pauli ilkesi:</strong> bir orbitalde en fazla iki elektron bulunur ve bunların spinleri zıttır.',
      '<strong>Hund kuralı:</strong> eş enerjili orbitallere elektronlar önce birer birer, aynı spinle yerleşir; eşleşme ancak hepsi yarı dolduktan sonra başlar.',
    ] },
    { h: 'Çözümlü örnek: demir (Z = 26)', p: [
      '26 elektronu sırayla yerleştirelim: 1s\'e 2, 2s\'e 2, 2p\'ye 6, 3s\'e 2, 3p\'ye 6 elektron girer; buraya kadar 18 elektron kullanılmıştır. Sıradaki orbital 4s\'tir ve 2 elektron alır (toplam 20). Kalan 6 elektron 3d\'ye yerleşir. Sonuç: <strong>1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶</strong>.',
      'İlk 18 elektron argon atomunun dizilimiyle aynı olduğundan kısa yazım <strong>[Ar] 4s² 3d⁶</strong> olur. Katmanlara göre toplarsak birinci katmanda 2, ikincide 8, üçüncüde 2 + 6 + 6 = 14, dördüncüde 2 elektron vardır: 2-8-14-2. 3d alt kabuğundaki beş orbitale altı elektron Hund kuralına göre dağıtıldığında bir orbital çift, dört orbital tek elektronlu kalır; bu nedenle demirde dört eşleşmemiş elektron bulunur.',
    ] },
    { h: 'Krom, bakır ve diğer istisnalar', p: [
      'Bazı elementlerin gerçek dizilimi Aufbau sırasının öngördüğünden farklıdır. En bilinen iki örnek krom ve bakırdır. Krom için beklenen [Ar] 4s² 3d⁴ yerine <strong>[Ar] 4s¹ 3d⁵</strong>, bakır için beklenen [Ar] 4s² 3d⁹ yerine <strong>[Ar] 4s¹ 3d¹⁰</strong> gözlenir. Yarı dolu ve tam dolu d alt kabuklarının sağladığı ek kararlılık, bir elektronun 4s\'ten 3d\'ye geçmesini enerji bakımından elverişli kılar.',
      'Benzer sapmalar beşinci ve altıncı periyotta da görülür: molibden ve gümüş, krom ve bakıra benzer davranır; paladyumda 5s orbitali tümüyle boştur ([Kr] 4d¹⁰); altın ve platinde 6s tek elektronludur. Lantan, seryum, gadolinyum ile aktinyum, toryum, uranyum gibi bazı iç geçiş elementlerinde de bir elektron f yerine d orbitalinde bulunur. Araç bu elementler için bilinen temel hâl dizilimini verir ve sonucun altında bunu belirtir.',
    ] },
    { h: 'Dolma sırası mı, kabuk sırası mı?', p: [
      'Aynı dizilim iki biçimde yazılabilir. Dolma sırasına göre yazımda orbitaller elektron aldıkları sırayla dizilir (… 4s² 3d⁶). Kabuk sırasına göre yazımda ise aynı baş kuantum sayısına sahip orbitaller yan yana getirilir (… 3d⁶ 4s²). İkisi de doğrudur ve aynı bilgiyi taşır; hangisinin kullanılacağı ders kitabına ve öğretmene göre değişir. İkinci yazım, geçiş metalleri iyon oluştururken elektronların önce en dış katmandaki s orbitalinden ayrıldığını hatırlamayı kolaylaştırır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      '3d\'yi 4s\'ten önce doldurmak. Potasyum ve kalsiyumda 19. ve 20. elektronlar 4s\'e girer; 3d ancak skandiyumdan itibaren dolar.',
      'p alt kabuğuna 6\'dan, d alt kabuğuna 10\'dan fazla elektron yazmak.',
      'Katman dağılımında üçüncü katmanı 8 ile sınırlamak. Üçüncü katman 18 elektrona kadar alabilir; 8 sınırı yalnızca ilk 20 element için kullanılan sadeleştirmedir.',
      'İyon dizilimini nötr atomun diziliminden sırayla elektron silerek yazmak. Fe²⁺ için elektronlar 3d\'den değil 4s\'ten ayrılır. Bu araç yalnızca nötr atomu verir; iyon için sonucu bu kurala göre kendiniz düzenlemelisiniz.',
      'Atom numarası 103\'ten büyük süper ağır elementlerde dizilimler kuramsal hesaplara dayanır; araç bu elementler için Aufbau sırasının öngördüğü dizilimi gösterir.',
    ] },
  ],
  faq: [
    ['Elektron dizilimi nasıl yazılır?', 'Elektronlar 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p sırasıyla, her alt kabuğun kapasitesi (s 2, p 6, d 10, f 14) doluncaya kadar yerleştirilir. Yerleştirilen elektron sayısı atom numarasına ulaşınca dizilim tamamlanır.'],
    ['Kromun elektron dizilimi neden 4s¹ 3d⁵ ile biter?', 'Yarı dolu 3d alt kabuğu ek kararlılık sağladığı için bir elektron 4s\'ten 3d\'ye geçer. Böylece krom [Ar] 4s² 3d⁴ yerine [Ar] 4s¹ 3d⁵ dizilimine sahip olur ve altı eşleşmemiş elektron taşır.'],
    ['Bakırın elektron dizilimi nedir?', 'Bakırın (Z = 29) dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰, kısaca [Ar] 4s¹ 3d¹⁰ biçimindedir. Tam dolu 3d alt kabuğu, 4s² 3d⁹ düzeninden daha kararlıdır.'],
    ['Soy gaz kısaltması ne demek?', 'Dizilimin, elementten önce gelen soy gazınkiyle aynı olan iç kısmı köşeli parantez içinde o soy gazın sembolüyle gösterilir. Örneğin sodyum için 1s² 2s² 2p⁶ 3s¹ yerine [Ne] 3s¹ yazılır.'],
    ['Katman dağılımı ile orbital dizilimi arasındaki fark nedir?', 'Katman dağılımı her enerji düzeyindeki toplam elektron sayısını verir (demir için 2-8-14-2). Orbital dizilimi ise bu elektronların s, p, d, f alt kabuklarına nasıl paylaştırıldığını da gösterir.'],
    ['Değerlik elektron sayısını bu sonuçtan nasıl bulurum?', 'A grubu (baş grup) elementlerinde son katmandaki elektron sayısı değerlik elektron sayısıdır; klor için 7, sodyum için 1. Geçiş metallerinde en dış s orbitaliyle birlikte dolmakta olan d orbitalindeki elektronlar da değerlik elektronu sayılır.'],
    ['İyonların elektron dizilimini de verir mi?', 'Hayır, araç yalnızca nötr atomun temel hâl dizilimini verir. İyon için önce nötr dizilimi bulup katyonda en dış katmandan elektron çıkarabilir, anyonda sıradaki orbitale elektron ekleyebilirsiniz.'],
    ['Yazdığım bilgi bir yere gönderiliyor mu?', 'Hayır. Element tablosu sayfanın içindedir ve dizilim tarayıcınızda hesaplanır; yazdığınız değer sunucuya iletilmez.'],
  ],
  related: ['periyodik-tablo', 'molar-kutle-hesapla', 'mol-hesapla', 'tanecik-sayisi-hesapla', 'kutle-yuzdesi-bilesik-hesapla'],
};
