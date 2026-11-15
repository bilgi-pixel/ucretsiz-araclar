export default {
  slug: 'orta-nokta-hesapla',
  title: 'Orta Nokta Hesaplama',
  h1Tail: 'doğru parçasının orta noktası',
  pageTitle: 'Orta Nokta Hesaplama – İki Noktanın Orta Noktasının Koordinatları',
  description: 'İki noktanın orta noktasının koordinatlarını hesaplayın ya da bir uç ile orta nokta biliniyorsa diğer ucu bulun. Doğru parçasının uzunluğu da gösterilir.',
  card: 'İki noktanın orta noktasını bulun ya da bir uç ve orta noktadan diğer uç noktanın koordinatlarını hesaplayın.',
  category: 'matematik',
  keywords: ['orta nokta hesaplama', 'orta nokta formülü', 'iki noktanın orta noktası', 'doğru parçasının orta noktası', 'orta nokta koordinatları', 'diğer uç noktayı bulma', 'analitik geometri orta nokta'],
  lead: 'Bir doğru parçasının iki ucunun koordinatlarını yazın; araç tam ortadaki noktanın koordinatlarını verir. Bir ucu ve orta noktayı biliyorsanız aynı araçla <strong>diğer uç noktayı</strong> da bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne bulunacak?', type: 'select', options: [['orta', 'Orta nokta (iki uç nokta biliniyor)'], ['uc', 'Diğer uç nokta (bir uç ve orta nokta biliniyor)']], wide: true },
    { id: 'x1', label: 'Birinci nokta (A): x', type: 'number', placeholder: 'Örn. 2' },
    { id: 'y1', label: 'Birinci nokta (A): y', type: 'number', placeholder: 'Örn. 4' },
    { id: 'x2', label: 'İkinci nokta: x', type: 'number', placeholder: 'Örn. 6', hint: '"Diğer uç nokta" seçiliyse buraya orta noktanın x değerini yazın.' },
    { id: 'y2', label: 'İkinci nokta: y', type: 'number', placeholder: 'Örn. 8', hint: '"Diğer uç nokta" seçiliyse buraya orta noktanın y değerini yazın.' },
  ],
  compute(v, h) {
    const ucModu = v.mod === 'uc';
    const x1 = h.num(v.x1, 'Birinci nokta x'), y1 = h.num(v.y1, 'Birinci nokta y');
    const x2 = h.num(v.x2, ucModu ? 'Orta nokta x' : 'İkinci nokta x');
    const y2 = h.num(v.y2, ucModu ? 'Orta nokta y' : 'İkinci nokta y');
    const s = (n) => h.fmt(n, 6);
    let x, y, uzunluk;
    if (ucModu) {
      x = 2 * x2 - x1;
      y = 2 * y2 - y1;
      uzunluk = 2 * Math.hypot(x2 - x1, y2 - y1);
    } else {
      x = (x1 + x2) / 2;
      y = (y1 + y2) / 2;
      uzunluk = Math.hypot(x2 - x1, y2 - y1);
    }
    return {
      rows: [
        [ucModu ? 'Diğer uç nokta (B)' : 'Orta nokta (M)', `(${s(x)}; ${s(y)})`],
        ['x koordinatı', s(x)],
        ['y koordinatı', s(y)],
        ['Doğru parçasının uzunluğu', s(uzunluk) + ' birim'],
        ['Orta noktanın uçlara uzaklığı', s(uzunluk / 2) + ' birim'],
      ],
      note: ucModu
        ? 'B = (2·Mx − Ax; 2·My − Ay). Koordinatlar noktalı virgülle ayrılarak yazılmıştır.'
        : 'M = ((x₁ + x₂) ÷ 2; (y₁ + y₂) ÷ 2). Koordinatlar noktalı virgülle ayrılarak yazılmıştır.',
    };
  },
  cases: [
    { in: { mod: 'orta', x1: '2', y1: '4', x2: '6', y2: '8' }, out: { 'Orta nokta (M)': '(4; 6)', 'x koordinatı': '4', 'y koordinatı': '6', 'Doğru parçasının uzunluğu': '5,656854 birim', 'Orta noktanın uçlara uzaklığı': '2,828427 birim' } },
    { in: { mod: 'uc', x1: '2', y1: '4', x2: '4', y2: '6' }, out: { 'Diğer uç nokta (B)': '(6; 8)', 'x koordinatı': '6', 'y koordinatı': '8' } },
    { in: { mod: 'orta', x1: '-3', y1: '5', x2: '7', y2: '-1' }, out: { 'Orta nokta (M)': '(2; 2)' } },
    { in: { mod: 'orta', x1: '0', y1: '0', x2: '1', y2: '1' }, out: { 'Orta nokta (M)': '(0,5; 0,5)' } },
    { in: { mod: 'orta', x1: '1', y1: '2', x2: '4', y2: '6' }, out: { 'Orta nokta (M)': '(2,5; 4)', 'Doğru parçasının uzunluğu': '5 birim', 'Orta noktanın uçlara uzaklığı': '2,5 birim' } },
    { in: { mod: 'uc', x1: '1', y1: '1', x2: '0', y2: '0' }, out: { 'Diğer uç nokta (B)': '(-1; -1)' } },
    { in: { mod: 'uc', x1: '-4', y1: '2', x2: '1', y2: '3,5' }, out: { 'Diğer uç nokta (B)': '(6; 5)' } },
    { in: { mod: 'orta', x1: '2', y1: '', x2: '6', y2: '8' }, error: true },
    { in: { mod: 'uc', x1: '2', y1: '4', x2: 'm', y2: '8' }, error: true },
  ],
  howto: [
    '"Ne bulunacak?" listesinden işlemi seçin: iki ucu bilinen parçanın orta noktasını mı, yoksa bir ucu ve orta noktası bilinen parçanın diğer ucunu mu arıyorsunuz?',
    'Birinci noktanın (A) x ve y koordinatlarını yazın.',
    'İkinci nokta alanlarına, orta nokta aranıyorsa diğer ucun; diğer uç aranıyorsa orta noktanın koordinatlarını yazın.',
    '"Hesapla" düğmesine basın. Aranan noktanın koordinatları ilk satırda, x ve y değerleri ayrı satırlarda görünür.',
    'Alt satırlardan doğru parçasının tamamının uzunluğunu ve orta noktanın uçlara olan uzaklığını okuyun.',
  ],
  sections: [
    { h: 'Orta nokta nedir?', p: [
      'Bir doğru parçasının orta noktası, parçayı iki eşit uzunlukta parçaya bölen ve iki uca da aynı uzaklıkta olan tek noktadır. Analitik geometride bu noktanın koordinatları, uç noktaların koordinatlarının <strong>aritmetik ortalaması</strong> alınarak bulunur. Başka bir deyişle orta noktanın x değeri iki x değerinin, y değeri iki y değerinin tam ortasındadır.',
      'Orta nokta genellikle M harfiyle gösterilir. A ve B uç noktaları için |AM| = |MB| eşitliği sağlanır ve M noktası her zaman AB doğru parçasının üzerindedir.',
    ] },
    { h: 'Orta nokta formülü', p: [
      'A(x₁, y₁) ve B(x₂, y₂) noktalarının orta noktası şöyle hesaplanır:',
      '<strong>M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2)</strong>',
      'Formülde toplama yapıldığına dikkat edin; uzaklık formülündeki gibi çıkarma değil. Koordinatları çıkarıp ikiye bölmek en sık yapılan hatadır ve orta nokta yerine yarım farkı verir. Koordinatlardan biri negatifse toplama işlemi işaretiyle birlikte yapılır: −3 ile 7\'nin ortalaması (−3 + 7) ÷ 2 = 2\'dir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> A(2, 4) ve B(6, 8). x için (2 + 6) ÷ 2 = 4, y için (4 + 8) ÷ 2 = 6. Orta nokta M(4, 6) olur. Parçanın uzunluğu √(4² + 4²) = √32 ≈ 5,656854 birimdir; orta nokta her iki uca yaklaşık 2,828427 birim uzaklıktadır.',
      '<strong>Örnek 2:</strong> A(−3, 5) ve B(7, −1). x için (−3 + 7) ÷ 2 = 2, y için (5 + (−1)) ÷ 2 = 2. Orta nokta M(2, 2).',
      '<strong>Örnek 3:</strong> A(1, 2) ve B(4, 6). x için 5 ÷ 2 = 2,5, y için 8 ÷ 2 = 4. Orta nokta M(2,5; 4). Parçanın uzunluğu 5 birim, yarısı 2,5 birimdir.',
    ] },
    { h: 'Bir uç ve orta noktadan diğer ucu bulma', p: [
      'Sınav sorularında sıkça ters durum sorulur: A noktası ve M orta noktası verilir, B noktası istenir. Orta nokta formülü B için çözüldüğünde şu bağıntı elde edilir:',
      '<strong>B = (2·Mx − Ax, 2·My − Ay)</strong>',
      'Mantığı şöyle düşünebilirsiniz: A\'dan M\'ye giderken x ve y ne kadar değiştiyse, M\'den B\'ye giderken de aynı miktarda değişir. <strong>Örnek:</strong> A(2, 4) ve M(4, 6) ise x için 2·4 − 2 = 6, y için 2·6 − 4 = 8; diğer uç B(6, 8) olur. Bu, birinci örneğin tersidir ve sonuç tutarlıdır.',
      'Aynı işlem bir noktanın başka bir noktaya göre <strong>simetriğini</strong> bulmaktır. A(1, 1) noktasının orijine göre simetriği için orta nokta olarak (0, 0) girilir ve B(−1, −1) bulunur.',
    ] },
    { h: 'Geometride orta noktanın kullanıldığı yerler', ul: [
      '<strong>Kenarortay:</strong> Üçgende bir köşeyi karşı kenarın orta noktasına birleştiren doğru parçasıdır; uzunluğunu bulmak için önce orta nokta hesaplanır.',
      '<strong>Çemberin merkezi:</strong> Çapın uç noktaları biliniyorsa merkez, bu iki noktanın orta noktasıdır; yarıçap ise parça uzunluğunun yarısıdır.',
      '<strong>Paralelkenar:</strong> Köşegenler birbirini ortalar. Üç köşesi bilinen paralelkenarın dördüncü köşesi, iki köşegenin orta noktalarının çakışması koşulundan bulunur.',
      '<strong>Kenar orta dikme:</strong> Bir doğru parçasının orta noktasından geçen ve parçaya dik olan doğrudur; denklemi yazılırken ilk adım orta noktayı bulmaktır.',
      '<strong>Orta taban:</strong> Üçgende iki kenarın orta noktalarını birleştiren parça üçüncü kenara paraleldir ve onun yarısı uzunluğundadır.',
    ] },
    { h: 'Günlük kullanım örnekleri', p: [
      'Koordinatlarla çalışan her alanda orta nokta işe yarar. Bir çizim ya da tasarım programında iki nokta arasına tam ortadan bir öge yerleştirmek, bir arsa planında iki köşe arasındaki kenarın ortasını işaretlemek, bir grafikte iki ölçümün ortasındaki değeri kestirmek ya da oyun geliştirirken iki nesnenin ortasına kamera yerleştirmek aynı ortalama hesabına dayanır.',
      'Orta nokta, doğrusal interpolasyonun özel bir durumudur: aralığın tam %50\'sindeki nokta. Parçayı ikiye değil de farklı bir oranda bölen noktayı arıyorsanız ağırlıklı ortalama kullanmanız gerekir.',
    ] },
    { h: 'Gösterim ve sınırlar', p: [
      'Türkçede ondalık ayırıcı virgül olduğundan, araç koordinatları birbirinden <strong>noktalı virgülle</strong> ayırarak yazar: (2,5; 4) ifadesi x = 2,5 ve y = 4 demektir. Böylece ondalıklı sonuçlarda karışıklık olmaz.',
      'Hesap düzlemdeki noktalar içindir. Uzaydaki noktalar için aynı kural geçerlidir: z koordinatlarının da ortalaması alınır. Harita üzerindeki enlem ve boylam değerlerinin ortalaması ise yalnızca birbirine yakın noktalar için yaklaşık bir orta nokta verir. Sonuçlar altı ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['Orta nokta formülü nedir?', 'A(x₁, y₁) ve B(x₂, y₂) için orta nokta M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2) olur. Yani x koordinatlarının ve y koordinatlarının ayrı ayrı ortalaması alınır.'],
    ['Orta nokta ve bir uç verilmişse diğer uç nasıl bulunur?', 'Orta noktanın koordinatları ikiyle çarpılır ve bilinen ucun koordinatları çıkarılır: B = (2·Mx − Ax, 2·My − Ay). Araçta "Diğer uç nokta" seçeneğiyle bu hesap doğrudan yapılır.'],
    ['Negatif koordinatlarda orta nokta nasıl hesaplanır?', 'Koordinatlar işaretleriyle birlikte toplanır ve ikiye bölünür. Örneğin −3 ile 7\'nin ortası (−3 + 7) ÷ 2 = 2, −4 ile −10\'un ortası (−4 − 10) ÷ 2 = −7 olur.'],
    ['Noktaların sırası önemli mi?', 'Orta nokta hesabında önemli değildir; toplama işleminde sıra sonucu değiştirmez. Diğer uç nokta hesabında ise hangi noktanın uç, hangisinin orta nokta olduğu doğru alanlara yazılmalıdır.'],
    ['Orta nokta uçlara eşit uzaklıkta mıdır?', 'Evet. Orta nokta tanımı gereği parçayı iki eşit parçaya böler. Araç bu uzaklığı "Orta noktanın uçlara uzaklığı" satırında gösterir; değer parça uzunluğunun yarısıdır.'],
    ['Bir noktanın başka bir noktaya göre simetriğini bulabilir miyim?', 'Evet. "Diğer uç nokta" seçeneğini seçin, simetriği alınacak noktayı birinci nokta, simetri merkezini orta nokta olarak girin. Sonuç, noktanın o merkeze göre simetriğidir.'],
    ['Sonuçta neden noktalı virgül kullanılıyor?', 'Ondalık ayırıcı olarak virgül kullanıldığı için (2,5, 4) gibi bir yazım karışıklığa yol açar. Koordinatları noktalı virgülle ayırmak, hangi virgülün ondalık olduğunu açık hâle getirir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; koordinatlar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['iki-nokta-arasi-uzaklik', 'egim-hesapla', 'dogru-denklemi-bul', 'dogrusal-interpolasyon-hesapla', 'agirlikli-ortalama-hesapla'],
};
