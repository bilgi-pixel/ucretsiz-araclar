export default {
  slug: 'vektorel-carpim-hesapla',
  title: 'Vektörel (Çapraz) Çarpım Hesaplama',
  h1Tail: 'A × B, alan ve normal',
  pageTitle: 'Vektörel (Çapraz) Çarpım Hesaplama – A × B, Alan ve Normal Vektör',
  description: 'Üç boyutlu iki vektörün vektörel (çapraz) çarpımını hesaplayın. Sonuç vektörü, büyüklüğü, paralelkenar ve üçgen alanı ile birim normal vektörü görün.',
  card: 'İki vektörün vektörel (çapraz) çarpımını bulun; paralelkenar alanını, üçgen alanını ve birim normali görün.',
  category: 'matematik',
  keywords: ['vektörel çarpım hesaplama', 'çapraz çarpım hesaplama', 'cross product hesaplama', 'normal vektör bulma', 'vektörlerle paralelkenar alanı', 'vektörlerle üçgen alanı', 'sağ el kuralı', 'A x B hesaplama'],
  lead: 'Üç boyutlu iki vektörün bileşenlerini yazın; araç <strong>A × B</strong> vektörel çarpımını, bu vektörün büyüklüğünü, iki vektörün gerdiği paralelkenarın ve üçgenin alanını ve her iki vektöre dik birim normali hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'A vektörü (x y z)', type: 'text', placeholder: 'Örn. 1 2 3', hint: 'Üç bileşeni boşluk ya da noktalı virgülle ayırın. İki bileşen yazarsanız z = 0 alınır.' },
    { id: 'b', label: 'B vektörü (x y z)', type: 'text', placeholder: 'Örn. 4 5 6' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const x = h.nums(String(s ?? '').replace(/[()\[\]<>]/g, ' '), ad);
      if (x.length < 2 || x.length > 3) h.err(`"${ad}" üç bileşenli olmalı (örn. 1 2 3). Vektörel çarpım üç boyutlu uzayda tanımlıdır; bileşenleri boşlukla ayırın.`);
      if (x.length === 2) x.push(0);
      return x;
    };
    const A = oku(v.a, 'A vektörü'), B = oku(v.b, 'B vektörü');
    const C = [A[1] * B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]];
    const boy = (x) => Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    const yaz = (x) => '(' + x.map((k) => h.fmt(k, 4)).join('; ') + ')';
    const n = boy(C), na = boy(A), nb = boy(B);
    const ic = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
    const sifirVar = na < 1e-12 || nb < 1e-12;
    const paralel = !sifirVar && n <= 1e-9 * na * nb;
    let durum;
    if (sifirVar) durum = 'Vektörlerden biri sıfır vektör; çarpım sıfır vektördür';
    else if (paralel) durum = 'Vektörler paralel; çarpım sıfır vektördür';
    else if (Math.abs(ic) <= 1e-9 * na * nb) durum = 'Vektörler dik; |A × B| = |A| · |B|';
    else durum = 'Sonuç vektörü A ve B\'nin ikisine de diktir';
    return {
      rows: [
        ['Vektörel çarpım (A × B)', yaz(paralel || sifirVar ? [0, 0, 0] : C)],
        ['Büyüklük |A × B|', h.fmt(paralel ? 0 : n, 4)],
        ['Paralelkenar alanı', h.fmt(paralel ? 0 : n, 4)],
        ['Üçgen alanı', h.fmt(paralel ? 0 : n / 2, 4)],
        ['Birim normal vektör', paralel || sifirVar ? 'tanımsız' : yaz(C.map((k) => k / n))],
        ['Aradaki açı', sifirVar ? 'tanımsız' : h.fmt((Math.atan2(paralel ? 0 : n, ic) * 180) / Math.PI, 4) + '°'],
        ['Durum', durum],
      ],
      note: 'Sıra önemlidir: B × A, A × B\'nin ters yönlüsüdür. Alanlar, bileşenlerin biriminin karesi cinsindendir.',
    };
  },
  cases: [
    { in: { a: '1 2 3', b: '4 5 6' }, out: { 'Vektörel çarpım (A × B)': '(-3; 6; -3)', 'Büyüklük |A × B|': '7,3485', 'Üçgen alanı': '3,6742', 'Birim normal vektör': '(-0,4082; 0,8165; -0,4082)', 'Aradaki açı': '12,9332°' } },
    { in: { a: '1 0 0', b: '0 1 0' }, out: { 'Vektörel çarpım (A × B)': '(0; 0; 1)', 'Büyüklük |A × B|': '1', 'Aradaki açı': '90°', 'Durum': 'Vektörler dik; |A × B| = |A| · |B|' } },
    { in: { a: '3 0 0', b: '0 4 0' }, out: { 'Vektörel çarpım (A × B)': '(0; 0; 12)', 'Paralelkenar alanı': '12', 'Üçgen alanı': '6' } },
    { in: { a: '0 1 0', b: '1 0 0' }, out: { 'Vektörel çarpım (A × B)': '(0; 0; -1)' } },
    { in: { a: '2 1 -1', b: '-3 4 1' }, out: { 'Vektörel çarpım (A × B)': '(5; 1; 11)', 'Büyüklük |A × B|': '12,1244' } },
    { in: { a: '1 2 3', b: '2 4 6' }, out: { 'Vektörel çarpım (A × B)': '(0; 0; 0)', 'Paralelkenar alanı': '0', 'Birim normal vektör': 'tanımsız', 'Durum': 'Vektörler paralel; çarpım sıfır vektördür' } },
    { in: { a: '2 3', b: '4 1' }, out: { 'Vektörel çarpım (A × B)': '(0; 0; -10)', 'Üçgen alanı': '5' } },
    { in: { a: '1 2 3 4', b: '4 5 6 7' }, error: true },
    { in: { a: '1 2 3', b: '' }, error: true },
    { in: { a: '5', b: '1 2 3' }, error: true },
  ],
  howto: [
    '"A vektörü" alanına birinci vektörün x, y ve z bileşenlerini aralarında boşluk bırakarak yazın, örneğin <code>1 2 3</code>.',
    '"B vektörü" alanına ikinci vektörün üç bileşenini aynı biçimde yazın. Düzlemdeki vektörler için yalnızca iki bileşen girebilirsiniz; z bileşeni 0 kabul edilir.',
    '"Hesapla" düğmesine basın. İlk satırda A × B vektörü, altında büyüklüğü, paralelkenar ve üçgen alanı ile birim normal vektör yer alır.',
    'B × A sonucunu görmek için iki alandaki vektörlerin yerini değiştirin; bütün bileşenlerin işaret değiştirdiğini göreceksiniz.',
  ],
  sections: [
    { h: 'Vektörel çarpım nedir?', p: [
      'Vektörel çarpım, üç boyutlu uzaydaki iki vektörü alıp sonuç olarak <strong>üçüncü bir vektör</strong> veren işlemdir. İşlem işareti çarpı olduğu için çapraz çarpım adıyla da bilinir. Sonuç vektörünün iki ayırt edici özelliği vardır: yönü, çarpılan iki vektörün ikisine birden diktir; büyüklüğü ise bu iki vektörün oluşturduğu paralelkenarın alanına eşittir.',
      'Skaler çarpım iki vektörün ne kadar aynı yöne baktığını ölçerken, vektörel çarpım ne kadar "farklı yöne" baktığını ölçer. Bu nedenle paralel vektörlerin vektörel çarpımı sıfır vektördür, birbirine dik vektörlerde ise büyüklük en yüksek değerini alır.',
    ] },
    { h: 'Bileşenlerle formül', p: [
      'A = (a₁, a₂, a₃) ve B = (b₁, b₂, b₃) için vektörel çarpımın bileşenleri şöyledir:',
    ], ul: [
      '<strong>x bileşeni:</strong> a₂b₃ − a₃b₂',
      '<strong>y bileşeni:</strong> a₃b₁ − a₁b₃',
      '<strong>z bileşeni:</strong> a₁b₂ − a₂b₁',
      '<strong>Büyüklük:</strong> |A × B| = |A| · |B| · sin θ',
    ] },
    { h: 'Determinantla hesaplama ve çözümlü örnek', p: [
      'Formülü ezberlemenin yaygın yolu, birinci satırına i, j, k birim vektörleri, ikinci satırına A\'nın, üçüncü satırına B\'nin bileşenleri yazılan 3×3 determinantı açmaktır. Her bileşen, o sütun kapatıldığında kalan 2×2 determinanttır; ortadaki (j) terimin işareti eksi alınır.',
      '<strong>Örnek:</strong> A = (1, 2, 3) ve B = (4, 5, 6) olsun. x bileşeni 2 · 6 − 3 · 5 = 12 − 15 = −3; y bileşeni 3 · 4 − 1 · 6 = 12 − 6 = 6; z bileşeni 1 · 5 − 2 · 4 = 5 − 8 = −3 bulunur. Sonuç <strong>A × B = (−3, 6, −3)</strong> olur.',
      'Bu vektörün büyüklüğü √(9 + 36 + 9) = √54 = 7,3485\'tir; A ve B\'nin gerdiği paralelkenarın alanı da bu kadardır. Aynı iki vektörün oluşturduğu üçgenin alanı bunun yarısı, yani 3,6742 birimkaredir. Sağlama için sonucun A ile skaler çarpımına bakılabilir: (−3) · 1 + 6 · 2 + (−3) · 3 = 0. Sıfır çıkması, sonucun A\'ya dik olduğunu doğrular; B için de (−3) · 4 + 6 · 5 + (−3) · 6 = 0 elde edilir.',
    ] },
    { h: 'Sağ el kuralı ve sıranın önemi', p: [
      'A × B vektörünün iki olası dik yönden hangisine baktığını <strong>sağ el kuralı</strong> belirler: sağ elinizin dört parmağını A yönünde uzatıp B\'ye doğru kıvırdığınızda başparmağınız A × B yönünü gösterir. Eksenlerin birim vektörleri için bu kural i × j = k, j × k = i ve k × i = j sonuçlarını verir.',
      'Vektörel çarpımda değişme özelliği yoktur; sıra değiştiğinde sonuç ters döner: <strong>B × A = −(A × B)</strong>. Araçta (1, 0, 0) × (0, 1, 0) işlemi (0, 0, 1) verirken vektörlerin yeri değiştirildiğinde (0, 0, −1) elde edilir. Birleşme özelliği de yoktur: (A × B) × C ile A × (B × C) genellikle farklıdır.',
    ] },
    { h: 'Alan hesabında kullanımı', p: [
      'Köşeleri koordinatlarıyla verilen bir üçgenin alanını bulmak için bir köşeden diğer iki köşeye giden kenar vektörleri oluşturulur ve vektörel çarpımlarının büyüklüğünün yarısı alınır. Örneğin kenar vektörleri (3, 0, 0) ve (0, 4, 0) olan dik üçgende çarpım (0, 0, 12), alan ise 12 ÷ 2 = 6 birimkaredir; bu da 3 · 4 ÷ 2 ile aynı sonuçtur.',
      'Düzlemdeki iki vektör için yalnızca x ve y bileşenlerini yazmanız yeterlidir. Bu durumda sonuç yalnızca z bileşeni olan bir vektördür ve z değerinin işareti dönüş yönünü gösterir: pozitifse A\'dan B\'ye dönüş saat yönünün tersine, negatifse saat yönündedir.',
    ] },
    { h: 'Fizik ve mühendislikte vektörel çarpım', ul: [
      '<strong>Tork (moment):</strong> τ = r × F. Dönme ekseninden kuvvetin uygulandığı noktaya giden konum vektörü ile kuvvetin vektörel çarpımıdır; anahtarla somun sıkarken kolun uzunluğunun neden önemli olduğunu açıklar.',
      '<strong>Manyetik kuvvet:</strong> F = q · (v × B). Manyetik alanda hareket eden yüklü parçacığa etki eden kuvvet, hıza ve alana diktir.',
      '<strong>Açısal momentum:</strong> L = r × p. Konum ile doğrusal momentumun vektörel çarpımıdır.',
      '<strong>Yüzey normali:</strong> Bilgisayar grafiklerinde bir üçgen yüzeyin hangi yöne baktığı, iki kenar vektörünün vektörel çarpımıyla bulunur ve aydınlatma hesabında kullanılır.',
      '<strong>Düzlem denklemi:</strong> Üç noktadan geçen düzlemin normal vektörü, noktalar arasındaki iki vektörün çapraz çarpımıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata y bileşeninin işaretidir: doğru ifade a₃b₁ − a₁b₃ biçimindedir, determinant açılımında orta terimin eksiyle alınması unutulursa işaret ters çıkar. İkinci hata vektörlerin sırasını karıştırmaktır. Üçüncüsü, vektörel çarpımı iki boyutta ya da dört ve üzeri boyutta aynı biçimde tanımlı sanmaktır; bu işlem üç boyuta özgüdür ve araç dört bileşenli girişi kabul etmez.',
      'Sonuçlar dört ondalık basamağa yuvarlanır. Vektörler paralelse ya da biri sıfır vektörse çarpım sıfır vektördür; bu durumda dik yön tek değildir ve birim normal "tanımsız" olarak gösterilir. Bileşenleri virgülle ayırmayın; virgül ondalık ayırıcı olarak okunur.',
    ] },
  ],
  faq: [
    ['Vektörel çarpım nasıl hesaplanır?', 'A = (a₁, a₂, a₃) ve B = (b₁, b₂, b₃) için A × B = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁) formülü kullanılır. (1, 2, 3) × (4, 5, 6) işleminin sonucu (−3, 6, −3) olur.'],
    ['Vektörel çarpımın sonucu neden vektördür?', 'İşlem, iki vektörün belirlediği düzleme dik yönü ve bu vektörlerin gerdiği alanı aynı anda taşıyan bir nicelik üretir. Yön ve büyüklük bilgisini birlikte taşıdığı için sonuç bir sayı değil vektördür.'],
    ['A × B ile B × A aynı mıdır?', 'Hayır. Büyüklükleri eşittir ama yönleri zıttır: B × A = −(A × B). Bu yüzden tork ve manyetik kuvvet gibi hesaplarda vektörlerin sırası formüldeki gibi alınmalıdır.'],
    ['Vektörel çarpım sıfır çıkarsa ne anlama gelir?', 'Sıfırdan farklı iki vektörün vektörel çarpımı sıfır vektörse bu vektörler paraleldir; yani biri diğerinin bir katıdır. Örneğin (1, 2, 3) ile (2, 4, 6) vektörlerinin çarpımı (0, 0, 0) çıkar.'],
    ['Vektörlerle üçgen alanı nasıl bulunur?', 'Üçgenin bir köşesinden çıkan iki kenar vektörünün vektörel çarpımının büyüklüğü ikiye bölünür. Araç bu değeri "Üçgen alanı" satırında doğrudan verir; "Paralelkenar alanı" satırı ise bunun iki katıdır.'],
    ['İki boyutlu vektörlerle vektörel çarpım yapılabilir mi?', 'Düzlemdeki vektörler z bileşeni sıfır olan uzay vektörleri gibi düşünülür. Bu durumda sonuç (0, 0, a₁b₂ − a₂b₁) biçimindedir. Araca iki bileşen yazdığınızda z bileşeni kendiliğinden sıfır alınır.'],
    ['Birim normal vektör ne işe yarar?', 'A × B vektörünün kendi büyüklüğüne bölünmüş hâlidir; boyu 1\'dir ve yalnızca dik yönü gösterir. Düzlem denklemi yazarken, yüzey aydınlatması hesaplarken ve bir noktanın düzleme uzaklığını bulurken kullanılır.'],
    ['Girdiğim vektörler sunucuya gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız bileşenler hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['skaler-carpim-hesapla', 'vektor-hesapla', 'matris-hesapla', 'ucgen-alani-hesapla', 'paralelkenar-alani-hesapla'],
};
