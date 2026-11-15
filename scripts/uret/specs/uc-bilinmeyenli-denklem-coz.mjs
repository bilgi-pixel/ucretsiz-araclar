export default {
  slug: 'uc-bilinmeyenli-denklem-coz',
  title: 'Üç Bilinmeyenli Denklem Çözme',
  h1Tail: 'x, y ve z bulma',
  pageTitle: 'Üç Bilinmeyenli Denklem Çözme – x, y, z Bulma (Cramer Kuralı)',
  description: 'Üç bilinmeyenli üç doğrusal denklemi katsayılarını yazarak çözün. x, y, z değerleri ve D, Dx, Dy, Dz determinantları; çözümsüz ve sonsuz çözümlü sistemler de saptanır.',
  card: 'Üç denklemli, üç bilinmeyenli doğrusal sistemi çözün; x, y, z değerlerini ve Cramer determinantlarını görün.',
  category: 'matematik',
  keywords: ['üç bilinmeyenli denklem çözme', '3 bilinmeyenli denklem', 'x y z bulma', 'cramer kuralı 3x3', 'denklem sistemi çözücü', 'determinant ile denklem çözme', 'gauss yok etme', 'üç denklem üç bilinmeyen'],
  lead: 'Üç bilinmeyenli üç doğrusal denklemin katsayılarını satır satır yazın; araç <strong>x, y ve z</strong> değerlerini bulur, Cramer kuralında kullanılan dört determinantı da gösterir. Tek çözüm yoksa sistemin çözümsüz mü yoksa sonsuz çözümlü mü olduğunu bildirir.',
  button: 'Çöz',
  inputs: [
    { id: 'd1', label: '1. denklem katsayıları (a b c d)', type: 'text', placeholder: 'Örn. 2 1 -1 8', hint: 'ax + by + cz = d için dört sayıyı boşlukla ayırarak yazın.', wide: true },
    { id: 'd2', label: '2. denklem katsayıları (a b c d)', type: 'text', placeholder: 'Örn. -3 -1 2 -11', wide: true },
    { id: 'd3', label: '3. denklem katsayıları (a b c d)', type: 'text', placeholder: 'Örn. -2 1 2 -3', wide: true },
  ],
  compute(v, h) {
    const oku = (metin, sira) => {
      const ad = `${sira}. denklem`;
      const sayilar = h.nums(metin, ad);
      if (sayilar.length !== 4) h.err(`${ad} için tam dört sayı yazın: x, y, z katsayıları ve eşitliğin sağ tarafı (örn. 2 1 -1 8). Olmayan terim için 0 girin.`);
      if (sayilar[0] === 0 && sayilar[1] === 0 && sayilar[2] === 0) h.err(`${ad} içinde x, y ve z katsayılarının üçü birden sıfır olamaz.`);
      return sayilar;
    };
    const R = [oku(v.d1, 1), oku(v.d2, 2), oku(v.d3, 3)];
    const det = (m) => {
      const t = [
        m[0][0] * m[1][1] * m[2][2], m[0][1] * m[1][2] * m[2][0], m[0][2] * m[1][0] * m[2][1],
        -m[0][2] * m[1][1] * m[2][0], -m[0][0] * m[1][2] * m[2][1], -m[0][1] * m[1][0] * m[2][2],
      ];
      const toplam = t.reduce((p, q) => p + q, 0);
      const olcek = t.reduce((p, q) => p + Math.abs(q), 0);
      return Math.abs(toplam) <= 1e-12 * olcek ? 0 : toplam;
    };
    const sutunDegistir = (k) => R.map((r) => [0, 1, 2].map((j) => (j === k ? r[3] : r[j])));
    const A = R.map((r) => r.slice(0, 3));
    const d = det(A);
    const dx = det(sutunDegistir(0)), dy = det(sutunDegistir(1)), dz = det(sutunDegistir(2));
    const s = (x) => h.fmt(x, 6);
    if (d === 0) {
      const rank = (M0) => {
        const M = M0.map((r) => r.slice());
        const enBuyuk = Math.max(...M.flat().map(Math.abs));
        const eps = 1e-9 * (enBuyuk || 1);
        let r = 0;
        for (let c = 0; c < M[0].length && r < M.length; c++) {
          let p = r;
          for (let i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
          if (Math.abs(M[p][c]) <= eps) continue;
          [M[r], M[p]] = [M[p], M[r]];
          for (let i = r + 1; i < M.length; i++) {
            const f = M[i][c] / M[r][c];
            for (let j = c; j < M[0].length; j++) M[i][j] -= f * M[r][j];
          }
          r++;
        }
        return r;
      };
      const sonsuz = rank(A) === rank(R);
      return {
        rows: [
          ['Çözüm', sonsuz ? 'Sonsuz çözüm var (denklemler birbirine bağımlı)' : 'Çözüm yok (denklemler çelişiyor)'],
          ['Determinant (D)', '0'],
          ['Dx', s(dx)],
          ['Dy', s(dy)],
          ['Dz', s(dz)],
        ],
        note: sonsuz
          ? 'Denklemlerden en az biri diğerlerinden türetilebiliyor; üç bilinmeyeni tek tek belirlemek için bağımsız bir denklem daha gerekir.'
          : 'Sol taraflar birbirine bağımlı, sağ taraflar ise bu bağımlılığa uymuyor; üç koşul aynı anda sağlanamaz.',
      };
    }
    const x = dx / d, y = dy / d, z = dz / d;
    return {
      rows: [
        ['Çözüm', `x = ${s(x)}, y = ${s(y)}, z = ${s(z)}`],
        ['x', s(x)],
        ['y', s(y)],
        ['z', s(z)],
        ['Determinant (D)', s(d)],
        ['Dx', s(dx)],
        ['Dy', s(dy)],
        ['Dz', s(dz)],
      ],
      note: 'Cramer kuralı: x = Dx ÷ D, y = Dy ÷ D, z = Dz ÷ D. Sonuçlar en fazla altı ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { d1: '2 1 -1 8', d2: '-3 -1 2 -11', d3: '-2 1 2 -3' }, out: { 'Çözüm': 'x = 2, y = 3, z = -1', 'x': '2', 'y': '3', 'z': '-1', 'Determinant (D)': '-1', 'Dx': '-2', 'Dy': '-3', 'Dz': '1' } },
    { in: { d1: '1 1 1 6', d2: '2 -1 1 3', d3: '1 2 -1 2' }, out: { 'x': '1', 'y': '2', 'z': '3', 'Determinant (D)': '7' } },
    { in: { d1: '1 1 1 3', d2: '1 -1 1 1', d3: '1 1 -1 1' }, out: { 'x': '1', 'y': '1', 'z': '1', 'Determinant (D)': '4' } },
    { in: { d1: '2 0 0 1', d2: '0 4 0 1', d3: '0 0 5 1' }, out: { 'x': '0,5', 'y': '0,25', 'z': '0,2', 'Determinant (D)': '40' } },
    { in: { d1: '1,5 1 0 4', d2: '0 1 1 5', d3: '1 0 1 6' }, out: { 'x': '2', 'y': '1', 'z': '4' } },
    { in: { d1: '1 1 1 1', d2: '1 1 1 2', d3: '1 -1 1 0' }, out: { 'Çözüm': 'Çözüm yok (denklemler çelişiyor)', 'Determinant (D)': '0' } },
    { in: { d1: '1 1 1 1', d2: '2 2 2 2', d3: '1 -1 1 0' }, out: { 'Çözüm': 'Sonsuz çözüm var (denklemler birbirine bağımlı)' } },
    { in: { d1: '1 2 3', d2: '1 1 1 2', d3: '1 -1 1 0' }, error: true },
    { in: { d1: '1 x 3 4', d2: '1 1 1 2', d3: '1 -1 1 0' }, error: true },
    { in: { d1: '0 0 0 4', d2: '1 1 1 2', d3: '1 -1 1 0' }, error: true },
  ],
  howto: [
    'Üç denklemi de <strong>ax + by + cz = d</strong> biçimine getirin: bilinmeyenler x, y, z sırasıyla solda, sabit sayı sağda olsun.',
    'Her denklem için dört sayıyı aralarında boşluk bırakarak ilgili satıra yazın. Örneğin 2x + y − z = 8 için "2 1 -1 8" girilir.',
    'Bir denklemde bulunmayan bilinmeyenin katsayısı yerine 0 yazın; görünmeyen katsayı (örneğin tek başına y) 1\'dir. Ondalıklı sayılarda virgül kullanabilirsiniz.',
    '"Çöz" düğmesine basın. Çözüm ilk satırda, x, y, z ayrı satırlarda, determinantlar en altta listelenir.',
    'Bulunan değerleri üç denklemde de yerine koyarak sağlama yapın.',
  ],
  sections: [
    { h: 'Üç bilinmeyenli sistem neyi anlatır?', p: [
      'Üç bilinmeyeni tek tek belirleyebilmek için birbirinden bağımsız üç koşul gerekir. Her doğrusal denklem üç boyutlu uzayda bir düzlem tanımlar; sistemin çözümü de bu üç düzlemin ortak noktasıdır. Düzlemler bir odanın iki duvarı ve zemini gibi tek bir köşede buluşuyorsa tek çözüm vardır.',
      'Düzlemler her zaman tek noktada buluşmaz. İki düzlem paralelse ya da üçü ikişer ikişer kesişip ortak bir nokta bırakmıyorsa sistem çözümsüzdür. Üç düzlem bir kitabın sayfaları gibi ortak bir doğru boyunca kesişiyorsa ya da bazıları üst üste biniyorsa sonsuz çözüm ortaya çıkar. Araç bu üç durumu ayırt eder.',
    ] },
    { h: 'Cramer kuralı ve 3×3 determinant', p: [
      'Araç önce katsayılardan oluşan 3×3 determinantı (D) hesaplar. Sonra x sütununu sağ taraf sayılarıyla değiştirerek Dx, y sütununu değiştirerek Dy, z sütununu değiştirerek Dz bulunur. D sıfır değilse çözüm <strong>x = Dx ÷ D</strong>, <strong>y = Dy ÷ D</strong>, <strong>z = Dz ÷ D</strong> olur.',
      'Satırları (a₁ b₁ c₁), (a₂ b₂ c₂), (a₃ b₃ c₃) olan determinant birinci satıra göre şöyle açılır: <strong>D = a₁(b₂c₃ − b₃c₂) − b₁(a₂c₃ − a₃c₂) + c₁(a₂b₃ − a₃b₂)</strong>. Ortadaki terimin önündeki eksi işareti en sık unutulan ayrıntıdır. Sarrus kuralı da aynı sonucu verir: üç ana köşegen çarpımı toplanır, üç ters köşegen çarpımı çıkarılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Sistem: 2x + y − z = 8, −3x − y + 2z = −11, −2x + y + 2z = −3.',
      'D = 2·[(−1)·2 − 1·2] − 1·[(−3)·2 − (−2)·2] + (−1)·[(−3)·1 − (−2)·(−1)] = 2·(−4) − 1·(−2) − 1·(−5) = −8 + 2 + 5 = −1.',
      'Aynı açılımla Dx = −2, Dy = −3 ve Dz = 1 bulunur. Buradan x = −2 ÷ −1 = 2, y = −3 ÷ −1 = 3, z = 1 ÷ −1 = −1 çıkar.',
      'Sağlama: 2·2 + 3 − (−1) = 8; −3·2 − 3 + 2·(−1) = −11; −2·2 + 3 + 2·(−1) = −3. Üç denklem de sağlanıyor.',
    ] },
    { h: 'Yok etme (Gauss) yöntemiyle karşılaştırma', p: [
      'Okulda en çok kullanılan yol, bilinmeyenleri sırayla yok etmektir. Önce iki denklem çifti seçilip aynı bilinmeyen (örneğin z) her ikisinden yok edilir; geriye x ve y içeren iki denklem kalır. Bu iki bilinmeyenli sistem çözülür, bulunan değerler baştaki denklemlerden birine yazılarak üçüncü bilinmeyen elde edilir.',
      'Yukarıdaki örnekte birinci ve ikinci denklem toplanırsa −x + z = −3, birinci denklem üçüncüden çıkarılırsa −4x + 3z = −11 elde edilir. İlkinden z = x − 3 yazılıp ikincide yerine konursa −4x + 3x − 9 = −11, yani x = 2 bulunur; ardından z = −1 ve y = 3 gelir. Elle çözümde işlem sayısı azdır ama işaret hatası riski yüksektir; bu araçla sonucu doğrulamak işe yarar.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Karışım ve alışveriş problemleri:</strong> Üç farklı ürünün birim fiyatı bilinmiyor, üç ayrı alışverişin toplam tutarı biliniyorsa her alışveriş bir denklem verir.',
      '<strong>Elektrik devreleri:</strong> Kirchhoff yasalarıyla yazılan çevre ve düğüm denklemleri, üç kollu devrelerde üç bilinmeyenli sisteme dönüşür.',
      '<strong>Kimya:</strong> Tepkime denkleştirmede ve üç bileşenli karışımların miktar hesabında katsayılar denklem sistemiyle bulunur.',
      '<strong>Geometri:</strong> Üç noktadan geçen parabolün y = ax² + bx + c katsayıları, noktalar yerine yazıldığında a, b, c için üç denklem oluşur.',
      '<strong>Statik:</strong> Dengedeki bir cisme etkiyen üç bilinmeyen kuvvet, denge denklemleriyle çözülür.',
    ] },
    { h: 'Girdi biçimi ve sık yapılan hatalar', p: [
      'Her satıra tam dört sayı yazılmalıdır. Üç ya da beş sayı girilirse araç hangi satırda sorun olduğunu bildirir. Bilinmeyenlerin sırası üç denklemde de aynı olmalıdır; bir denklemde x, y, z, diğerinde y, x, z sırasıyla katsayı yazmak yanlış sonuca götürür.',
      'Eksi işaretini sayıya bitişik yazın ("- 3" değil "-3"). Sabit terim eşitliğin solundaysa sağa geçirirken işaretini değiştirin: x + y + z − 6 = 0 denklemi "1 1 1 6" olarak girilir. Kesirli katsayılarda denklemin tamamını paydayla çarpıp tam sayıya çevirmek yuvarlama hatasını önler.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca doğrusal denklemleri çözer; bilinmeyenlerin çarpımı, karesi ya da kökü bulunan sistemler kapsam dışındadır. Sonuçlar altı ondalık basamağa yuvarlanır. Katsayıları birbirine çok yakın olan, neredeyse bağımlı sistemlerde determinant sıfıra çok yaklaşır ve küçük girdi farkları sonucu büyük ölçüde değiştirebilir; mühendislik hesaplarında böyle bir sistemle karşılaşırsanız verilerinizi ve ölçüm duyarlılığınızı gözden geçirin.',
    ] },
  ],
  faq: [
    ['Üç bilinmeyenli denklem nasıl çözülür?', 'Yok etme yöntemiyle bilinmeyenler sırayla elenebilir ya da Cramer kuralı kullanılabilir. Bu araç Cramer kuralını uygular: D, Dx, Dy, Dz determinantlarını hesaplar ve her bilinmeyeni ilgili determinantın D\'ye bölümü olarak bulur.'],
    ['Katsayıları hangi sırayla yazmalıyım?', 'Her satıra önce x katsayısı, sonra y katsayısı, sonra z katsayısı, en son eşitliğin sağındaki sayı yazılır. Sayılar boşlukla ayrılır; örneğin x + 2y − z = 2 için "1 2 -1 2" girilir.'],
    ['Bir denklemde z yoksa ne yazacağım?', 'O bilinmeyenin katsayısı yerine 0 yazın. Örneğin 3x + y = 7 denklemi "3 1 0 7" olur. Bir satırda üç katsayının hepsi birden 0 olamaz.'],
    ['Determinant sıfır çıkarsa ne olur?', 'Sistemin tek çözümü yoktur. Denklemler birbiriyle çelişiyorsa çözüm hiç yoktur; bir denklem diğerlerinden türetilebiliyorsa sonsuz çözüm vardır. Araç hangisinin geçerli olduğunu ilk satırda belirtir.'],
    ['İki denklemle üç bilinmeyen bulunur mu?', 'Genel olarak hayır. İki denklem üç bilinmeyeni tek tek belirlemeye yetmez; ya sonsuz çözüm vardır ya da hiç yoktur. Tek bir çözüm için birbirinden bağımsız üç denklem gerekir.'],
    ['Ondalıklı katsayı kullanabilir miyim?', 'Evet. Ondalık ayırıcı olarak virgül ya da nokta yazabilirsiniz: "1,5 1 0 4" geçerli bir satırdır. Sayıları birbirinden ayırmak için virgül değil boşluk kullanın.'],
    ['Sonucun doğru olduğunu nasıl anlarım?', 'x, y ve z değerlerini üç denklemde de yerine koyun; her birinde sol taraf sağdaki sayıya eşit çıkmalıdır. Tek bir denklemi sağlaması yeterli değildir, üçü de sağlanmalıdır.'],
    ['Girdiğim denklemler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız katsayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['iki-bilinmeyenli-denklem-coz', 'diskriminant-hesapla', 'dogru-denklemi-bul', 'dogrusal-interpolasyon-hesapla', 'dogrusal-regresyon-hesapla'],
};
