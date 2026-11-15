export default {
  slug: 'binom-dagilimi-hesapla',
  title: 'Binom Dağılımı Hesaplama',
  h1Tail: 'P(X = k) ve birikimli olasılıklar',
  pageTitle: 'Binom Dağılımı Hesaplama – P(X = k), En Az ve En Çok Olasılığı',
  description: 'Deneme sayısı, başarı sayısı ve başarı olasılığını girin; binom dağılımında tam k, en çok k ve en az k başarı olasılığını, beklenen değeri ve standart sapmayı bulun.',
  card: 'n denemede tam k, en çok k ve en az k başarı olasılığını; beklenen değer, varyans ve standart sapmayla birlikte hesaplayın.',
  category: 'matematik',
  keywords: ['binom dağılımı hesaplama', 'binom olasılık hesaplama', 'binom formülü', 'n denemede k başarı olasılığı', 'birikimli binom olasılığı', 'binom beklenen değer varyans', 'bernoulli denemesi'],
  lead: 'Her biri aynı başarı olasılığına sahip <strong>n bağımsız denemede</strong> tam k kez, en çok k kez ya da en az k kez başarı elde etme olasılığını hesaplayın. Araç ayrıca dağılımın beklenen değerini, varyansını ve standart sapmasını verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'n', label: 'Deneme sayısı (n)', type: 'number', placeholder: 'Örn. 10', hint: '1 ile 100.000 arasında tam sayı' },
    { id: 'k', label: 'Başarı sayısı (k)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'p', label: 'Tek denemede başarı olasılığı (p)', type: 'text', placeholder: 'Örn. 0,5 ya da 1/6', hint: '0 ile 1 arasında ondalık sayı, kesir (1/6) ya da yüzde (%30)' },
  ],
  compute(v, h) {
    const n = h.posint(v.n, 'Deneme sayısı (n)');
    if (n > 100000) h.err('"Deneme sayısı (n)" en fazla 100.000 olabilir.');
    const k = h.int(v.k, 'Başarı sayısı (k)');
    if (k < 0 || k > n) h.err(`"Başarı sayısı (k)" 0 ile ${n} (deneme sayısı) arasında olmalı.`);
    const ad = 'Tek denemede başarı olasılığı (p)';
    let ps = String(v.p ?? '').trim();
    if (ps === '') h.err(`"${ad}" alanını doldurun.`);
    let p;
    if (ps.includes('/')) {
      const par = ps.split('/');
      if (par.length !== 2) h.err('Kesri "1/6" biçiminde yazın.');
      const pay = h.num(par[0], ad), payda = h.num(par[1], ad);
      if (payda === 0) h.err('Kesrin paydası sıfır olamaz.');
      p = pay / payda;
    } else if (ps.includes('%')) {
      p = h.num(ps.replace(/%/g, ''), ad) / 100;
    } else {
      p = h.num(ps, ad);
    }
    if (!(p >= 0 && p <= 1)) h.err('Başarı olasılığı 0 ile 1 arasında olmalı. Yüzde olarak yazacaksanız % işareti ekleyin (örn. %30).');
    const q = 1 - p;
    // pmf(i) = C(n,i) p^i q^(n-i); taşmayı önlemek için logaritmayla hesaplanır.
    const pmf = new Array(n + 1).fill(0);
    if (p === 0) pmf[0] = 1;
    else if (p === 1) pmf[n] = 1;
    else {
      const lp = Math.log(p), lq = Math.log(q);
      let lc = 0;
      for (let i = 0; i <= n; i++) {
        if (i > 0) lc += Math.log(n - i + 1) - Math.log(i);
        pmf[i] = Math.exp(lc + i * lp + (n - i) * lq);
      }
    }
    let alt = 0, ust = 0;
    for (let i = 0; i < k; i++) alt += pmf[i];
    for (let i = n; i > k; i--) ust += pmf[i];
    const esit = pmf[k];
    const kirp = (x) => Math.min(1, Math.max(0, x));
    const yaz = (x) => {
      x = kirp(x);
      if (x > 0 && x < 1e-6) return `${h.sig(x, 4)} (%${h.sig(x * 100, 4)})`;
      return `${h.fmt(x, 6)} (%${h.fmt(x * 100, 4)})`;
    };
    return {
      rows: [
        [`P(X = ${k})`, yaz(esit)],
        [`P(X ≤ ${k})`, yaz(alt + esit)],
        [`P(X < ${k})`, yaz(alt)],
        [`P(X ≥ ${k})`, yaz(ust + esit)],
        [`P(X > ${k})`, yaz(ust)],
        ['Beklenen değer (n·p)', h.fmt(n * p, 4)],
        ['Varyans (n·p·q)', h.fmt(n * p * q, 4)],
        ['Standart sapma', h.fmt(Math.sqrt(n * p * q), 4)],
      ],
      note: `n = ${h.fmt(n, 0)}, p = ${h.fmt(p, 6)}, q = 1 − p = ${h.fmt(q, 6)}. Denemelerin bağımsız ve başarı olasılığının sabit olduğu varsayılır.`,
    };
  },
  cases: [
    { in: { n: '5', k: '2', p: '0,5' }, out: { 'P(X = 2)': '0,3125 (%31,25)', 'P(X ≤ 2)': '0,5 (%50)', 'P(X < 2)': '0,1875 (%18,75)', 'P(X ≥ 2)': '0,8125 (%81,25)', 'P(X > 2)': '0,5 (%50)', 'Beklenen değer (n·p)': '2,5', 'Varyans (n·p·q)': '1,25', 'Standart sapma': '1,118' } },
    { in: { n: '20', k: '5', p: '0,25' }, out: { 'P(X = 5)': '0,202331 (%20,2331)', 'P(X ≤ 5)': '0,617173 (%61,7173)', 'P(X ≥ 5)': '0,585158 (%58,5158)', 'Beklenen değer (n·p)': '5', 'Varyans (n·p·q)': '3,75', 'Standart sapma': '1,9365' } },
    { in: { n: '10', k: '0', p: '0,1' }, out: { 'P(X = 0)': '0,348678 (%34,8678)', 'P(X < 0)': '0 (%0)', 'P(X ≥ 0)': '1 (%100)', 'P(X > 0)': '0,651322 (%65,1322)' } },
    { in: { n: '6', k: '1', p: '1/6' }, out: { 'P(X = 1)': '0,401878 (%40,1878)', 'P(X ≥ 1)': '0,665102 (%66,5102)', 'Beklenen değer (n·p)': '1' } },
    { in: { n: '10', k: '2', p: '%30' }, out: { 'P(X = 2)': '0,233474 (%23,3474)', 'P(X ≤ 2)': '0,382783 (%38,2783)', 'Varyans (n·p·q)': '2,1' } },
    { in: { n: '100', k: '50', p: '0,5' }, out: { 'P(X = 50)': '0,079589 (%7,9589)', 'P(X ≤ 50)': '0,539795 (%53,9795)', 'Standart sapma': '5' } },
    { in: { n: '50', k: '3', p: '0,02' }, out: { 'P(X = 3)': '0,06067 (%6,067)', 'P(X ≥ 3)': '0,078428 (%7,8428)' } },
    { in: { n: '5', k: '3', p: '0,8' }, out: { 'P(X = 3)': '0,2048 (%20,48)', 'P(X ≤ 3)': '0,26272 (%26,272)', 'P(X ≥ 3)': '0,94208 (%94,208)' } },
    { in: { n: '4', k: '4', p: '0,5' }, out: { 'P(X = 4)': '0,0625 (%6,25)', 'P(X > 4)': '0 (%0)' } },
    { in: { n: '10', k: '11', p: '0,5' }, error: true },
    { in: { n: '10', k: '3', p: '1,5' }, error: true },
    { in: { n: '0', k: '0', p: '0,5' }, error: true },
    { in: { n: '10', k: '3', p: '' }, error: true },
  ],
  howto: [
    '"Deneme sayısı (n)" alanına deneyin kaç kez tekrarlandığını yazın: atılan para sayısı, kontrol edilen ürün adedi, sorulan soru sayısı gibi.',
    '"Başarı sayısı (k)" alanına olasılığını merak ettiğiniz başarı adedini yazın; 0 ile n arasında bir tam sayı olmalıdır.',
    'Tek bir denemedeki başarı olasılığını 0,5 gibi ondalık, 1/6 gibi kesir ya da %30 gibi yüzde biçiminde girin.',
    '"Hesapla" düğmesine basın. İlk satır tam k başarı olasılığını, sonraki dört satır birikimli olasılıkları gösterir.',
    'Soru "en az", "en çok", "daha fazla" ya da "daha az" diyorsa ilgili eşitsizlik satırını okuyun; son üç satır dağılımın özet ölçüleridir.',
  ],
  sections: [
    { h: 'Binom dağılımı nedir, ne zaman kullanılır?', p: [
      'Yalnızca iki sonucu olan (başarı ya da başarısızlık) bir denemeye Bernoulli denemesi denir. Böyle bir deneme aynı koşullarda n kez tekrarlandığında elde edilen başarı sayısı X, binom dağılımına uyar. Dağılımın geçerli olması için dört koşul aranır: deneme sayısı önceden bellidir, her denemenin iki sonucu vardır, başarı olasılığı p denemeden denemeye değişmez ve denemeler birbirinden bağımsızdır.',
      'Yazı tura atışları, çoktan seçmeli bir testte rastgele işaretlenen sorular, üretim hattından alınan parçaların kusurlu olup olmaması, bir kampanya e-postasını açan alıcıların sayısı ya da serbest atış kullanan bir basketbolcunun isabetleri bu kalıba uyan tipik örneklerdir.',
    ] },
    { h: 'Binom olasılık formülü', p: [
      'n denemede tam k başarı elde etme olasılığı şöyledir: <strong>P(X = k) = C(n, k) × p<sup>k</sup> × (1 − p)<sup>n − k</sup></strong>. Buradaki C(n, k), n denemenin içinden başarılı olacak k tanesinin kaç farklı biçimde seçilebileceğini gösteren kombinasyondur ve n! ÷ (k! × (n − k)!) ile hesaplanır. p<sup>k</sup> çarpanı k başarının, (1 − p)<sup>n − k</sup> çarpanı ise geri kalan başarısızlıkların olasılığıdır.',
      'Birikimli olasılıklar bu değerlerin toplanmasıyla bulunur. P(X ≤ k), 0\'dan k\'ye kadar olan bütün başarı sayılarının olasılıkları toplamıdır; P(X ≥ k) ise k\'den n\'ye kadar olanların toplamıdır. İkisi birbirinin tümleyeni değildir, çünkü ikisi de k\'yi içerir: P(X ≥ k) = 1 − P(X < k) bağıntısı geçerlidir.',
    ] },
    { h: 'Çözümlü örnek: 5 atışta 2 yazı', p: [
      'Hilesiz bir para 5 kez atılıyor; tam 2 kez yazı gelme olasılığı nedir? Burada n = 5, k = 2, p = 0,5 alınır. C(5, 2) = 10 olduğundan P(X = 2) = 10 × 0,5<sup>2</sup> × 0,5<sup>3</sup> = 10 ÷ 32 = <strong>0,3125</strong> bulunur.',
      'En çok 2 yazı gelmesi için 0, 1 ve 2 yazının olasılıkları toplanır: (1 + 5 + 10) ÷ 32 = 0,5. En az 2 yazı gelme olasılığı ise 1 − P(X < 2) = 1 − 6/32 = 0,8125\'tir. Beklenen yazı sayısı 5 × 0,5 = 2,5, varyans 1,25, standart sapma yaklaşık 1,118\'dir. Bu değerleri araca girerek adım adım karşılaştırabilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: kalite kontrol', p: [
      'Bir üretim hattında parçaların %2\'sinin kusurlu çıktığı bilinsin. Rastgele alınan 50 parçalık bir numunede tam 3 kusurlu bulunma olasılığı için n = 50, k = 3, p = 0,02 yazılır. Sonuç yaklaşık 0,06067, yani %6,07\'dir. Aynı numunede 3 ya da daha fazla kusurlu çıkma olasılığı yaklaşık %7,84\'tür. Beklenen kusurlu sayısı 50 × 0,02 = 1 olduğundan, üç ve üzeri kusurlu görülmesi seyrek ama olağan dışı sayılmayacak bir durumdur.',
    ] },
    { h: 'Beklenen değer, varyans ve standart sapma', p: [
      'Binom dağılımının ortalaması <strong>μ = n × p</strong>, varyansı <strong>σ² = n × p × (1 − p)</strong>, standart sapması bunun kareköküdür. Ortalama, deney çok kez tekrarlandığında başarı sayısının yaklaşacağı değeri; standart sapma ise sonuçların bu değerin çevresinde ne kadar oynadığını anlatır. Varyans p = 0,5 iken en büyük değerini alır; olasılık 0\'a ya da 1\'e yaklaştıkça sonuçlar daha öngörülebilir hâle gelir.',
      'Dört şıklı 20 soruluk bir testi tümüyle rastgele işaretleyen biri için n = 20 ve p = 0,25\'tir. Beklenen doğru sayısı 5, standart sapma yaklaşık 1,94\'tür. Tam 5 doğru yapma olasılığı yaklaşık %20,23, en az 5 doğru yapma olasılığı ise yaklaşık %58,52\'dir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      '<strong>"En az" ile "daha fazla"yı karıştırmak:</strong> En az 3, X ≥ 3 demektir ve 3\'ü kapsar; 3\'ten fazla ise X > 3\'tür. Araç iki satırı ayrı gösterir.',
      '<strong>Geri koymadan çekilişte kullanmak:</strong> Küçük bir topluluktan geri koymadan seçim yapılıyorsa başarı olasılığı her çekilişte değişir; bu durumda hipergeometrik dağılım gerekir.',
      '<strong>Olasılığı yüzde olarak yazıp işareti unutmak:</strong> %30 yerine yalnızca 30 yazılırsa değer 1\'den büyük olduğu için hata alırsınız; 0,3 ya da %30 yazın.',
      '<strong>Bağımsızlığı sorgulamamak:</strong> Aynı kişinin art arda yanıtları ya da aynı partiden gelen ürünler birbirini etkiliyorsa model gerçeği tam yansıtmaz.',
    ], p: [
      'Araç 100.000 denemeye kadar tam hesap yapar; normal yaklaşım kullanmaz. Milyonda birden küçük olasılıklar bilimsel gösterimle yazılır. Sonuçlar eğitim ve ön değerlendirme amaçlıdır; kalite, sağlık ya da finans alanındaki kararlar için bir istatistik uzmanının değerlendirmesi gerekir.',
    ] },
  ],
  faq: [
    ['Binom dağılımının formülü nedir?', 'P(X = k) = C(n, k) × p^k × (1 − p)^(n − k). Burada n deneme sayısı, k başarı sayısı, p tek denemedeki başarı olasılığı, C(n, k) ise n\'nin k\'li kombinasyonudur.'],
    ['P(X ≤ k) ile P(X < k) arasındaki fark nedir?', 'P(X ≤ k), k başarının kendisini de içerir; P(X < k) içermez. Aralarındaki fark tam olarak P(X = k) kadardır. Kesikli dağılımlarda bu ayrım sonucu belirgin biçimde değiştirir.'],
    ['Başarı olasılığını kesir olarak yazabilir miyim?', 'Evet. Olasılık alanına 1/6 ya da 3/8 gibi bir kesir, 0,25 gibi bir ondalık sayı ya da %25 gibi bir yüzde yazabilirsiniz; üçü de kabul edilir.'],
    ['"Başarı" kelimesi iyi bir sonuç anlamına mı gelir?', 'Hayır, yalnızca sayılan sonucu ifade eder. Kusurlu ürün, hastalığa yakalanma ya da yanlış yanıt da "başarı" olarak tanımlanabilir; önemli olan p değerinin o sonucun olasılığı olmasıdır.'],
    ['Binom dağılımı ne zaman normal dağılıma yaklaşır?', 'Deneme sayısı büyüdükçe ve p uç değerlerden uzak oldukça dağılım çan eğrisine benzer. Yaygın pratik ölçüt, n × p ve n × (1 − p) değerlerinin her ikisinin de en az 10 olmasıdır. Bu araç yaklaşım yerine tam değeri hesapladığı için böyle bir koşula gerek duymaz.'],
    ['Beklenen değer tam sayı çıkmazsa ne anlama gelir?', 'Beklenen değer uzun vadeli ortalamadır, tek bir deneyin sonucu değildir. 5 atışta beklenen yazı sayısının 2,5 olması, çok sayıda beş atışlık serinin ortalamasının 2,5\'e yaklaşacağını söyler.'],
    ['En az bir başarı olasılığını nasıl bulurum?', 'k alanına 1 yazıp P(X ≥ 1) satırını okuyun. Bu değer 1 − (1 − p)^n formülüne eşittir; örneğin 10 denemede p = 0,1 için yaklaşık %65,13\'tür.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; değerler sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['olasilik-hesapla', 'kombinasyon-permutasyon', 'faktoriyel-hesapla', 'standart-sapma-hesapla', 'zar-olasiligi-hesapla', 'guven-araligi-hesapla'],
};
