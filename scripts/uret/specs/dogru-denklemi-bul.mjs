export default {
  slug: 'dogru-denklemi-bul',
  title: 'İki Noktadan Doğru Denklemi Bulma',
  h1Tail: 'y = mx + n',
  pageTitle: 'İki Noktası Bilinen Doğrunun Denklemi – Doğru Denklemi Bulma',
  description: 'İki noktası bilinen doğrunun denklemini bulun. y = mx + n biçimi, ax + by + c = 0 genel biçimi, eğim ve eksenleri kestiği noktalar; yatay ve düşey doğrular dahil.',
  card: 'İki noktadan geçen doğrunun denklemini y = mx + n ve genel biçimde yazın; eğimi ve eksen kesim noktalarını görün.',
  category: 'matematik',
  keywords: ['doğru denklemi bulma', 'iki noktası bilinen doğrunun denklemi', 'iki noktadan geçen doğru', 'y = mx + n bulma', 'doğrunun genel denklemi', 'eksenleri kestiği noktalar', 'analitik geometri doğru denklemi'],
  lead: 'Bir doğrunun üzerindeki iki noktanın koordinatlarını yazın; araç doğrunun denklemini hem <strong>y = mx + n</strong> hem de <strong>ax + by + c = 0</strong> biçiminde verir, eğimi ve eksenleri kestiği noktaları da gösterir.',
  button: 'Denklemi Bul',
  inputs: [
    { id: 'x1', label: 'Birinci nokta: x₁', type: 'number', placeholder: 'Örn. 0' },
    { id: 'y1', label: 'Birinci nokta: y₁', type: 'number', placeholder: 'Örn. 1' },
    { id: 'x2', label: 'İkinci nokta: x₂', type: 'number', placeholder: 'Örn. 1' },
    { id: 'y2', label: 'İkinci nokta: y₂', type: 'number', placeholder: 'Örn. 3' },
  ],
  compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) h.err('İki nokta aynı; tek noktadan sonsuz sayıda doğru geçer. Denklem için farklı iki nokta girin.');
    const s = (q) => h.fmt(q, 6);
    // Terim listesinden "2x - y + 1" gibi ifade kurar.
    const ifade = (terimler) => {
      let metin = '';
      for (const [kat, harf] of terimler) {
        const m = s(Math.abs(kat));
        if (m === '0') continue;
        const govde = (m === '1' && harf ? '' : m) + harf;
        if (metin === '') metin = (kat < 0 ? '-' : '') + govde;
        else metin += (kat < 0 ? ' - ' : ' + ') + govde;
      }
      return metin === '' ? '0' : metin;
    };
    // Genel biçim katsayıları: mümkünse en küçük tam sayılar.
    let A = dy, B = -dx, C = x2 * y1 - x1 * y2;
    let k = 1, tam = false;
    for (let i = 0; i <= 6 && !tam; i++) {
      const t = [x1, y1, x2, y2].map((q) => q * k);
      if (t.every((q) => Math.abs(q - Math.round(q)) < 1e-9 && Math.abs(q) < 1e7)) {
        const [X1, Y1, X2, Y2] = t.map(Math.round);
        A = k * (Y2 - Y1); B = -k * (X2 - X1); C = X2 * Y1 - X1 * Y2;
        tam = true;
      } else k *= 10;
    }
    if (tam) {
      const ebob = (p, q) => { p = Math.abs(p); q = Math.abs(q); while (q) { [p, q] = [q, p % q]; } return p; };
      const g = ebob(ebob(A, B), C) || 1;
      A /= g; B /= g; C /= g;
    }
    if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
    const genel = ifade([[A, 'x'], [B, 'y'], [C, '']]) + ' = 0';
    if (dx === 0) {
      return {
        rows: [
          ['Doğru denklemi', 'x = ' + s(x1)],
          ['Genel biçim', genel],
          ['Eğim (m)', 'Tanımsız (düşey doğru)'],
          ['y eksenini kestiği nokta', x1 === 0 ? 'Doğru y ekseninin kendisidir' : 'Kesmez (y eksenine paralel)'],
          ['x eksenini kestiği nokta', `(${s(x1)}; 0)`],
        ],
        note: 'İki noktanın x değerleri eşit olduğundan doğru düşeydir; y = mx + n biçiminde yazılamaz.',
      };
    }
    const m = dy / dx;
    const n = (x2 * y1 - x1 * y2) / dx;
    return {
      rows: [
        ['Doğru denklemi', 'y = ' + ifade([[m, 'x'], [n, '']])],
        ['Genel biçim', genel],
        ['Eğim (m)', s(m)],
        ['y eksenini kestiği nokta', `(0; ${s(n)})`],
        ['x eksenini kestiği nokta', dy === 0 ? (y1 === 0 ? 'Doğru x ekseninin kendisidir' : 'Kesmez (x eksenine paralel)') : `(${s(x1 - y1 * dx / dy)}; 0)`],
      ],
      note: 'm = (y₂ − y₁) ÷ (x₂ − x₁), n = y₁ − m·x₁. Katsayılar en fazla altı ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { x1: '0', y1: '1', x2: '1', y2: '3' }, out: { 'Doğru denklemi': 'y = 2x + 1', 'Genel biçim': '2x - y + 1 = 0', 'Eğim (m)': '2', 'y eksenini kestiği nokta': '(0; 1)', 'x eksenini kestiği nokta': '(-0,5; 0)' } },
    { in: { x1: '0', y1: '4', x2: '2', y2: '0' }, out: { 'Doğru denklemi': 'y = -2x + 4', 'Genel biçim': '2x + y - 4 = 0', 'Eğim (m)': '-2', 'x eksenini kestiği nokta': '(2; 0)' } },
    { in: { x1: '1', y1: '2', x2: '3', y2: '8' }, out: { 'Doğru denklemi': 'y = 3x - 1', 'Genel biçim': '3x - y - 1 = 0' } },
    { in: { x1: '2', y1: '3', x2: '2', y2: '7' }, out: { 'Doğru denklemi': 'x = 2', 'Genel biçim': 'x - 2 = 0', 'Eğim (m)': 'Tanımsız (düşey doğru)', 'y eksenini kestiği nokta': 'Kesmez (y eksenine paralel)' } },
    { in: { x1: '0', y1: '5', x2: '4', y2: '5' }, out: { 'Doğru denklemi': 'y = 5', 'Genel biçim': 'y - 5 = 0', 'Eğim (m)': '0', 'x eksenini kestiği nokta': 'Kesmez (x eksenine paralel)' } },
    { in: { x1: '0', y1: '0', x2: '2', y2: '2' }, out: { 'Doğru denklemi': 'y = x', 'Genel biçim': 'x - y = 0', 'y eksenini kestiği nokta': '(0; 0)' } },
    { in: { x1: '1', y1: '1', x2: '3', y2: '2' }, out: { 'Doğru denklemi': 'y = 0,5x + 0,5', 'Genel biçim': 'x - 2y + 1 = 0', 'x eksenini kestiği nokta': '(-1; 0)' } },
    { in: { x1: '0,5', y1: '1', x2: '1,5', y2: '3' }, out: { 'Doğru denklemi': 'y = 2x', 'Genel biçim': '2x - y = 0' } },
    { in: { x1: '-1', y1: '4', x2: '2', y2: '-5' }, out: { 'Doğru denklemi': 'y = -3x + 1', 'Genel biçim': '3x + y - 1 = 0' } },
    { in: { x1: '2', y1: '3', x2: '2', y2: '3' }, error: true },
    { in: { x1: '2', y1: '3', x2: '', y2: '3' }, error: true },
  ],
  howto: [
    'Doğrunun geçtiği iki noktayı belirleyin: A(x₁, y₁) ve B(x₂, y₂).',
    'Birinci noktanın x ve y değerlerini ilk iki alana, ikinci noktanınkileri son iki alana yazın. Ondalıklı ve negatif değerler kabul edilir.',
    '"Denklemi Bul" düğmesine basın. İlk satırda y = mx + n biçimindeki denklem, ikinci satırda genel biçim görünür.',
    'Eğim ve eksen kesim noktaları satırlarını doğruyu çizmek için kullanın: iki kesim noktasını işaretleyip birleştirmek yeterlidir.',
    'Sağlama için girdiğiniz iki noktayı bulunan denklemde yerine koyun; ikisi de denklemi sağlamalıdır.',
  ],
  sections: [
    { h: 'İki noktadan neden tek doğru geçer?', p: [
      'Düzlemde farklı iki noktadan yalnızca bir doğru geçer; bu geometrinin en temel kabullerinden biridir. Dolayısıyla iki noktanın koordinatları, doğrunun denklemini tam olarak belirlemeye yeter. Tek bir nokta yeterli değildir, çünkü o noktadan her yöne sonsuz sayıda doğru çizilebilir; üçüncü bir nokta ise ya zaten aynı doğrunun üzerindedir ya da hiçbir doğru üçünden birden geçmez.',
      'Bir doğrunun denklemi, o doğru üzerindeki bütün (x, y) noktalarının sağladığı eşitliktir. Denklem bulunduktan sonra herhangi bir x için y değerini hesaplayabilir, bir noktanın doğru üzerinde olup olmadığını sınayabilirsiniz.',
    ] },
    { h: 'Denklem nasıl bulunur?', ol: [
      '<strong>Eğimi hesaplayın:</strong> m = (y₂ − y₁) ÷ (x₂ − x₁).',
      '<strong>Nokta-eğim biçimini yazın:</strong> y − y₁ = m·(x − x₁). Noktalardan hangisini kullandığınız sonucu değiştirmez.',
      '<strong>Parantezi açıp y\'yi yalnız bırakın:</strong> y = mx + n elde edilir; burada n = y₁ − m·x₁ değeridir.',
      '<strong>Genel biçim isteniyorsa</strong> bütün terimleri bir tarafa toplayın: ax + by + c = 0.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> A(0, 1) ve B(1, 3). Eğim m = (3 − 1) ÷ (1 − 0) = 2. Nokta-eğim biçimi: y − 1 = 2·(x − 0), yani <strong>y = 2x + 1</strong>. Genel biçim: 2x − y + 1 = 0. Doğru y eksenini (0, 1) noktasında, x eksenini (−0,5; 0) noktasında keser.',
      '<strong>Örnek 2:</strong> A(0, 4) ve B(2, 0). Eğim m = (0 − 4) ÷ (2 − 0) = −2. n = 4 − (−2)·0 = 4. Denklem <strong>y = −2x + 4</strong>, genel biçimi 2x + y − 4 = 0. Sağlama: x = 2 için y = −4 + 4 = 0, ikinci nokta sağlanıyor.',
      '<strong>Örnek 3:</strong> A(1, 1) ve B(3, 2). Eğim m = 1 ÷ 2 = 0,5. n = 1 − 0,5·1 = 0,5. Denklem y = 0,5x + 0,5. İki taraf 2 ile çarpılıp düzenlenirse genel biçim x − 2y + 1 = 0 olur; araç genel biçimi mümkün olduğunda böyle en küçük tam sayılarla yazar.',
    ] },
    { h: 'Doğru denkleminin biçimleri', ul: [
      '<strong>Eğim-kesim biçimi (y = mx + n):</strong> m eğimi, n doğrunun y eksenini kestiği noktanın ordinatını verir. Grafik çizmek ve y değerini hesaplamak için en kullanışlı biçimdir.',
      '<strong>Genel (kapalı) biçim (ax + by + c = 0):</strong> Düşey doğrular dahil her doğruyu ifade edebilir. Eğim −a ÷ b oranıyla bulunur. Bir noktanın doğruya uzaklığı gibi formüller bu biçimi kullanır.',
      '<strong>Nokta-eğim biçimi (y − y₁ = m(x − x₁)):</strong> Bir nokta ve eğim bilindiğinde denklemi yazmanın en hızlı yoludur.',
      '<strong>İki nokta biçimi ((y − y₁) ÷ (y₂ − y₁) = (x − x₁) ÷ (x₂ − x₁)):</strong> Eğimi ayrıca hesaplamadan denklemi tek adımda kurar; içler dışlar çarpımı yapıldığında aynı denklem çıkar. Yatay ve düşey doğrularda payda sıfır olacağından kullanılmaz.',
      '<strong>Eksen kesim biçimi (x ÷ p + y ÷ q = 1):</strong> Doğrunun x eksenini p, y eksenini q değerinde kestiğini doğrudan gösterir; orijinden geçen ya da eksenlere paralel doğrular bu biçimde yazılamaz.',
    ] },
    { h: 'Özel durumlar: yatay, düşey ve orijinden geçen doğrular', p: [
      'İki noktanın y değerleri eşitse doğru <strong>yataydır</strong>, eğimi 0\'dır ve denklemi y = sabit biçimindedir; örneğin (0, 5) ve (4, 5) noktalarından geçen doğru y = 5\'tir ve x eksenini kesmez.',
      'İki noktanın x değerleri eşitse doğru <strong>düşeydir</strong>. Eğim tanımsız olduğundan y = mx + n biçiminde yazılamaz; denklemi x = sabit olur. (2, 3) ve (2, 7) noktalarından geçen doğru x = 2\'dir.',
      'n = 0 çıkıyorsa doğru <strong>orijinden</strong> geçer ve denklemi y = mx biçimindedir. Bu, x ile y arasında doğru orantı olduğu anlamına gelir; (0, 0) ve (2, 2) noktalarından geçen y = x doğrusu bunun en yalın örneğidir.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'İki ölçümden doğrusal bir ilişki kurmak istediğiniz her yerde doğru denklemi kullanılır. Sabit ücret ve birim ücretten oluşan bir tarifede n sabit kısmı, m birim başına ücreti gösterir; iki farklı tüketim miktarı ve tutarı biliniyorsa tarife denklemi çıkarılabilir. Sıcaklık ölçekleri arasındaki dönüşüm, sabit hızla hareket eden bir aracın konum-zaman ilişkisi ve doğrusal amortisman da aynı kalıptadır.',
      'İkiden fazla ölçümünüz varsa ve noktalar tam bir doğru üzerinde değilse, iki nokta seçmek yerine bütün noktalara en iyi uyan doğruyu veren regresyon yöntemi daha uygundur.',
    ] },
    { h: 'Sınırlar', p: [
      'Katsayılar altı ondalık basamağa yuvarlanır; eğim 1 ÷ 3 gibi devirli bir sayıysa denklemde 0,333333 olarak görünür. Böyle durumlarda genel biçim satırı tam sayılı katsayılar verdiği için daha kesindir. Aynı iki nokta girildiğinde doğru belirlenemediğinden araç hata verir.',
    ] },
  ],
  faq: [
    ['İki noktası bilinen doğrunun denklemi nasıl bulunur?', 'Önce eğim hesaplanır: m = (y₂ − y₁) ÷ (x₂ − x₁). Sonra noktalardan biri y − y₁ = m(x − x₁) eşitliğinde yerine konur ve düzenlenir. Sonuç y = mx + n biçimindedir.'],
    ['y = mx + n denkleminde m ve n neyi gösterir?', 'm doğrunun eğimidir; x bir birim arttığında y\'nin ne kadar değiştiğini söyler. n ise doğrunun y eksenini kestiği noktanın y değeridir, yani x = 0 iken y\'nin aldığı değerdir.'],
    ['Genel biçim ile y = mx + n arasındaki fark nedir?', 'İkisi aynı doğruyu anlatır; yalnızca yazılışı farklıdır. Genel biçimde bütün terimler bir taraftadır (ax + by + c = 0) ve düşey doğrular da yazılabilir. y = mx + n biçimi ise eğimi ve y kesim noktasını doğrudan gösterir.'],
    ['Düşey doğrunun denklemi neden x = sabit biçimindedir?', 'Düşey doğru üzerindeki bütün noktaların x değeri aynıdır, y ise her değeri alabilir. Eğim tanımsız olduğu için y = mx + n biçiminde yazılamaz; denklem yalnızca x\'in sabit değerini belirtir.'],
    ['Doğrunun eksenleri kestiği noktalar nasıl bulunur?', 'y eksenini kestiği nokta için x yerine 0 yazılır; sonuç (0, n) noktasıdır. x eksenini kestiği nokta için y yerine 0 yazılır ve x çözülür; sonuç (−n ÷ m, 0) noktasıdır.'],
    ['Bir noktanın doğru üzerinde olup olmadığını nasıl anlarım?', 'Noktanın x değerini denklemde yerine koyun. Çıkan y değeri noktanın y değerine eşitse nokta doğrunun üzerindedir. Genel biçimde ise koordinatlar yerine yazıldığında sonuç 0 olmalıdır.'],
    ['Noktaları farklı sırayla girersem denklem değişir mi?', 'Hayır. İki noktadan tek doğru geçtiği için sıra önemli değildir; aynı denklem elde edilir.'],
    ['Girdiğim koordinatlar bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['egim-hesapla', 'iki-nokta-arasi-uzaklik', 'orta-nokta-hesapla', 'dogrusal-interpolasyon-hesapla', 'dogrusal-regresyon-hesapla', 'iki-bilinmeyenli-denklem-coz'],
};
