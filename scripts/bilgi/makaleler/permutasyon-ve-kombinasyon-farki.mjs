export default {
  slug: "permutasyon-ve-kombinasyon-farki",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Permütasyon ve Kombinasyon Nedir? Formüller, Farkı ve Çözümlü Örnekler",
  pageTitle: "Permütasyon ve Kombinasyon Farkı: Formüller ve Örnekler",
  description: "Permütasyon sıralama, kombinasyon seçmedir. P(n,r) ve C(n,r) formülleri, faktöriyel, 0! neden 1, tekrarlı ve dairesel permütasyon, sınıftan ekip seçme örnekleri.",
  keywords: ["permütasyon nedir", "kombinasyon nedir", "permütasyon kombinasyon farkı", "kombinasyon formülü", "permütasyon formülü", "faktöriyel nedir", "tekrarlı permütasyon", "dairesel permütasyon"],
  lead: "Permütasyon ile kombinasyon arasındaki fark tek bir soruya bağlıdır: <strong>sıra önemli mi?</strong> Sıralama önemliyse permütasyon P(n, r) = n! ÷ (n − r)!, yalnızca hangi elemanların seçildiği önemliyse kombinasyon C(n, r) = n! ÷ [r! · (n − r)!] kullanılır. Örneğin 5 kişiden bir başkan ve bir yardımcı seçmenin 20 yolu (permütasyon), 2 kişilik bir ekip kurmanın 10 yolu (kombinasyon) vardır. Bu yazıda faktöriyeli, iki formülün mantığını, tekrarlı ve dairesel permütasyonu 10. sınıf ve AYT düzeyinde çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Faktöriyel: n! = n · (n − 1) · … · 2 · 1; tanım gereği 0! = 1.",
    "Permütasyon (sıralı diziliş): P(n, r) = n! ÷ (n − r)!; n elemanın hepsi dizilirse n!.",
    "Kombinasyon (sırasız seçim): C(n, r) = n! ÷ [r! · (n − r)!] = P(n, r) ÷ r!.",
    "Ayırt etme sorusu: seçilenlerin yerini değiştirince yeni bir durum oluşuyorsa permütasyon, oluşmuyorsa kombinasyon.",
    "Tekrarlı permütasyon: n elemanda a, b, … kez tekrar eden öğeler varsa n! ÷ (a! · b! · …); ANKARA kelimesi 6! ÷ 3! = 120 farklı dizilir.",
    "Dairesel permütasyon: n kişi yuvarlak masaya (n − 1)! farklı biçimde oturur."
  ],
  figure: {
    alt: "A, B ve C harflerinden ikişer seçim: permütasyonda AB, BA, AC, CA, BC, CB olmak üzere 6 sıralı dizi; kombinasyonda AB, AC, BC olmak üzere 3 grup. 6 bölü 2 faktöriyel eşittir 3.",
    caption: "Aynı üç harften iki eleman alındığında permütasyon sırayı sayar (6), kombinasyon saymaz (3). Her kombinasyon r! = 2 permütasyona karşılık gelir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">{A, B, C} kümesinden 2 eleman</text>
  <rect x="20" y="50" width="400" height="290" rx="10" class="sf sb"/>
  <rect x="20" y="50" width="400" height="48" rx="10" class="p"/>
  <text x="220" y="80" class="b mid sf">Permütasyon: sıra önemli</text>
  <g class="mid b lg">
    <rect x="50" y="118" width="100" height="44" rx="8" class="ps"/><text x="100" y="147">AB</text>
    <rect x="170" y="118" width="100" height="44" rx="8" class="ps"/><text x="220" y="147">AC</text>
    <rect x="290" y="118" width="100" height="44" rx="8" class="ps"/><text x="340" y="147">BC</text>
    <rect x="50" y="178" width="100" height="44" rx="8" class="ps"/><text x="100" y="207">BA</text>
    <rect x="170" y="178" width="100" height="44" rx="8" class="ps"/><text x="220" y="207">CA</text>
    <rect x="290" y="178" width="100" height="44" rx="8" class="ps"/><text x="340" y="207">CB</text>
  </g>
  <text x="220" y="262" class="b mid">P(3, 2) = 3! ÷ 1! = 6</text>
  <text x="220" y="292" class="sm mid t2">Örnek: başkan ve yardımcı seçmek</text>
  <rect x="440" y="50" width="260" height="290" rx="10" class="sf sb"/>
  <rect x="440" y="50" width="260" height="48" rx="10" class="ok"/>
  <text x="570" y="80" class="b mid sf">Kombinasyon: sıra yok</text>
  <g class="mid b lg">
    <rect x="470" y="118" width="200" height="34" rx="8" class="oks"/><text x="570" y="142">{A, B}</text>
    <rect x="470" y="160" width="200" height="34" rx="8" class="oks"/><text x="570" y="184">{A, C}</text>
    <rect x="470" y="202" width="200" height="34" rx="8" class="oks"/><text x="570" y="226">{B, C}</text>
  </g>
  <text x="570" y="262" class="b mid">C(3, 2) = 3! ÷ (2! · 1!) = 3</text>
  <text x="570" y="292" class="sm mid t2">Örnek: 2 kişilik ekip kurmak</text>
  <rect x="20" y="356" width="680" height="48" rx="8" class="ps"/>
  <text x="360" y="386" class="b mid">C(n, r) = P(n, r) ÷ r!  →  6 ÷ 2 = 3</text>
</svg>`
  },
  sections: [
    {
      h: "Önce temel: faktöriyel nedir, 0! neden 1?",
      p: [
        "Faktöriyel, 1'den n'e kadar olan doğal sayıların çarpımıdır ve n! ile gösterilir: 4! = 4 · 3 · 2 · 1 = 24, 5! = 120, 6! = 720. Faktöriyel, n farklı nesnenin bir sıraya kaç farklı biçimde dizilebileceğini verir. Örneğin 4 kitap rafa 4! = 24 farklı sırayla dizilebilir: ilk yere 4, ikinci yere 3, üçüncü yere 2, son yere 1 seçenek kalır.",
        "<strong>0! = 1</strong> tanımı keyfî değildir. Hiç eleman yokken onları dizmenin tek bir yolu vardır: hiçbir şey yapmamak. Ayrıca n! = n · (n − 1)! bağıntısı n = 1 için 1! = 1 · 0! verir; bunun tutması için 0! = 1 olmalıdır. Bu tanım sayesinde C(n, n) = C(n, 0) = 1 gibi formüller tutarlı çalışır.",
        "Faktöriyel çok hızlı büyür: 10! = 3.628.800, 20! ise 19 basamaklıdır. Hesaplamalarda büyük faktöriyelleri tamamen açmak yerine sadeleştirmek işinizi kolaylaştırır: 10! ÷ 8! = 10 · 9 = 90. Büyük değerlerin tam sonucunu görmek için [[arac:faktoriyel-hesapla|Faktöriyel Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Permütasyon nedir? Formül ve mantığı",
      p: [
        "Permütasyon, n farklı elemandan r tanesinin <strong>sıralı</strong> olarak seçilip dizilmesidir. Yarışmada ilk üç dereceyi belirlemek, şifre oluşturmak ya da kitapları rafa dizmek permütasyon örnekleridir; çünkü aynı elemanların farklı sırası farklı bir sonuç demektir."
      ],
      formula: "P(n, r) = n! ÷ (n − r)!   (0 ≤ r ≤ n)\nP(n, n) = n!\nÇarpma ilkesiyle: P(n, r) = n · (n − 1) · … · (n − r + 1)",
      after: [
        "Örnek: 8 koşucunun katıldığı bir yarışta altın, gümüş ve bronz madalya kaç farklı şekilde dağıtılabilir? Birinci için 8, ikinci için 7, üçüncü için 6 seçenek vardır: P(8, 3) = 8 · 7 · 6 = 336. Formülle: 8! ÷ 5! = 40.320 ÷ 120 = 336."
      ]
    },
    {
      h: "Kombinasyon nedir? Formül ve mantığı",
      p: [
        "Kombinasyon, n farklı elemandan r tanesinin <strong>sırasız</strong> olarak seçilmesidir. Bir takıma oyuncu seçmek, bir menüden 3 yemek seçmek, sınavda 10 sorudan 6'sını cevaplamak kombinasyon örnekleridir; seçilenlerin hangi sırayla seçildiği sonucu değiştirmez.",
        "Kombinasyon, permütasyondan türetilir. r eleman seçildiğinde bu elemanların kendi aralarında r! farklı sıralaması vardır ve kombinasyonda bunların hepsi tek bir durum sayılır. Bu yüzden permütasyon sayısı r!'e bölünür."
      ],
      formula: "C(n, r) = n! ÷ [r! · (n − r)!] = P(n, r) ÷ r!\nÖzellikler: C(n, 0) = C(n, n) = 1;  C(n, r) = C(n, n − r)",
      after: [
        "C(n, r) değerleri Pascal üçgeninin n'inci satırındaki sayılardır; örneğin C(5, 2) = 10, beşinci satırdaki üçüncü sayıdır. Üçgeni satır satır görmek için [[arac:pascal-ucgeni-olustur|Pascal Üçgeni Oluşturucu]] aracını kullanabilirsiniz. C(n, r) = C(n, n − r) özelliği hesabı kısaltır: C(20, 18) yerine C(20, 2) = 190 hesaplamak çok daha kolaydır."
      ]
    },
    {
      h: "Permütasyon ile kombinasyon farkı nasıl anlaşılır?",
      p: [
        "Soruyu okurken kendinize şunu sorun: seçtiğim iki elemanın yerini değiştirirsem yeni bir durum mu oluşur? Oluşuyorsa permütasyon, oluşmuyorsa kombinasyon kullanılır. Sorudaki \"sıralama, dizilme, görev dağıtma, ilk-ikinci, şifre\" gibi ifadeler genellikle permütasyona; \"seçme, grup, ekip, takım, komisyon\" ifadeleri kombinasyona işaret eder."
      ],
      table: {
        head: ["Durum", "Sıra önemli mi?", "Yöntem", "Sonuç"],
        rows: [
          ["5 kişiden başkan ve yardımcı seçmek", "Evet", "P(5, 2)", "20"],
          ["5 kişiden 2 kişilik ekip seçmek", "Hayır", "C(5, 2)", "10"],
          ["8 koşucudan ilk üç dereceyi belirlemek", "Evet", "P(8, 3)", "336"],
          ["8 kişiden 3 kişilik komisyon seçmek", "Hayır", "C(8, 3)", "56"],
          ["10 soruluk sınavda 6 soru seçmek", "Hayır", "C(10, 6)", "210"],
          ["Rakamları farklı 4 haneli şifre (0–9)", "Evet", "P(10, 4)", "5.040"]
        ],
        caption: "Aynı n ve r için permütasyon her zaman kombinasyonun r! katıdır: P(8, 3) = 336 = 56 × 6."
      }
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Sınıftan ekip seçme:</strong> 30 kişilik bir sınıftan 4 kişilik proje ekibi kaç farklı şekilde seçilir? Sıra önemsiz: C(30, 4) = (30 · 29 · 28 · 27) ÷ (4 · 3 · 2 · 1) = 657.720 ÷ 24 = 27.405.",
        "<strong>Görevli ekip:</strong> Aynı sınıftan bir başkan, bir sekreter ve bir sayman seçilecekse sıra (görev) önemlidir: P(30, 3) = 30 · 29 · 28 = 24.360.",
        "<strong>Koşullu seçim:</strong> 6 kız ve 5 erkek arasından 2 kız ve 2 erkekten oluşan 4 kişilik ekip: C(6, 2) · C(5, 2) = 15 · 10 = 150. Gruplar bağımsız seçildiği için çarpma ilkesi kullanılır.",
        "<strong>En az koşulu:</strong> 4 kişilik ekipte en az 1 erkek olsun isteniyorsa tümünden hiç erkek olmayanları çıkarın: C(11, 4) − C(6, 4) = 330 − 15 = 315.",
        "<strong>Yan yana koşulu:</strong> 5 kişi bir sıraya oturacak, Ali ile Ayşe yan yana olacak. İkisini tek kişi sayın: 4! = 24 dizilişi kendi aralarında 2! ile çarpın: 24 · 2 = 48."
      ],
      after: [
        "Bu tür hesapları adım adım görmek ve sonucunuzu kontrol etmek için [[arac:kombinasyon-permutasyon|Kombinasyon ve Permütasyon Hesaplama]] aracı tam sonuç ve çözüm adımlarını verir."
      ]
    },
    {
      h: "Tekrarlı permütasyon ve tekrarlı seçim",
      p: [
        "Dizilen elemanlardan bazıları birbirinin aynısıysa, bunların yer değiştirmesi yeni bir dizi oluşturmaz. Bu yüzden toplam diziliş, aynı elemanların kendi aralarındaki dizilişlerine bölünür."
      ],
      formula: "Tekrarlı permütasyon: n! ÷ (a! · b! · c! · …)\nTekrarlı seçimle sıralı dizi (her yere n seçenek): n^r",
      ul: [
        "<strong>ANKARA:</strong> 6 harf, A harfi 3 kez tekrar ediyor: 6! ÷ 3! = 720 ÷ 6 = 120 farklı dizi.",
        "<strong>MATEMATİK:</strong> 9 harf; M 2, A 2, T 2 kez tekrar ediyor: 9! ÷ (2! · 2! · 2!) = 362.880 ÷ 8 = 45.360.",
        "<strong>Rakam tekrarına izin veren şifre:</strong> 4 basamaklı, her basamakta 0–9: 10<sup>4</sup> = 10.000 şifre. Tekrarsız olsaydı P(10, 4) = 5.040 olurdu.",
        "<strong>Bir yolda kısa yol sayısı:</strong> 3 sağa, 2 yukarı adımla gidilen ızgarada yol sayısı 5! ÷ (3! · 2!) = 10'dur; bu aynı zamanda C(5, 2)'dir."
      ]
    },
    {
      h: "Dairesel permütasyon nedir?",
      p: [
        "Elemanlar bir çember etrafına dizildiğinde başlangıç noktası yoktur; herkesi bir sandalye kaydırmak aynı oturma düzenini verir. Bu yüzden bir kişiyi sabitleyip kalanları dizeriz ve n kişi için (n − 1)! sonuç bulunur.",
        "Örnek: 6 kişi yuvarlak bir masaya 5! = 120 farklı şekilde oturabilir. Düz bir sıraya oturuyor olsalardı sonuç 6! = 720 olurdu. Bileklik ya da kolye gibi ters çevrilebilen dizilişlerde saat yönü ve tersi aynı sayıldığı için sonuç ayrıca 2'ye bölünür: 6 farklı boncuktan (6 − 1)! ÷ 2 = 60 farklı bileklik yapılır."
      ]
    },
    {
      h: "Olasılıkla bağlantısı ve sık yapılan hatalar",
      p: [
        "Sayma yöntemleri olasılığın temelidir: olasılık = istenen durum sayısı ÷ tüm durum sayısı. Örneğin 30 kişilik sınıftan rastgele seçilen 4 kişilik ekipte belirli iki arkadaşın birlikte bulunma olasılığı C(28, 2) ÷ C(30, 4) = 378 ÷ 27.405 ≈ 0,0138, yani yaklaşık %1,4'tür. Bu tür oranları kesir ve yüzde olarak görmek için [[arac:olasilik-hesapla|Olasılık Hesaplama]] aracını kullanabilirsiniz."
      ],
      ul: [
        "<strong>Seçimde sırayı saymak:</strong> Ekip, grup ve komisyon sorularında permütasyon kullanmak sonucu r! kat büyütür.",
        "<strong>Görevli seçimde sırayı unutmak:</strong> Başkan-yardımcı gibi farklı görevler varsa kombinasyon eksik sayar.",
        "<strong>Tekrarı bölmeyi unutmak:</strong> Aynı harfleri içeren kelimelerde n! fazla sayar.",
        "<strong>\"En az\" sorularında durumları tek tek toplamak:</strong> Tümleyen yöntemi (tümü − hiç olmayan) daha az hata yaptırır.",
        "<strong>Çarpma ile toplamayı karıştırmak:</strong> \"ve\" ile bağlanan bağımsız seçimler çarpılır, \"veya\" ile bağlanan ayrık durumlar toplanır."
      ]
    }
  ],
  faq: [
    ["Permütasyon nedir?", "Permütasyon, farklı elemanların sıralı olarak dizilmesidir. n elemandan r tanesinin sıralı dizilişlerinin sayısı P(n, r) = n! bölü (n − r)! formülüyle bulunur. Örneğin 8 koşucu arasında ilk üç derece P(8, 3) = 336 farklı şekilde belirlenebilir."],
    ["Kombinasyon nedir?", "Kombinasyon, n elemandan r tanesinin sıra gözetmeksizin seçilmesidir. Sayısı C(n, r) = n! bölü [r! çarpı (n − r)!] ile bulunur. Örneğin 5 kişiden 2 kişilik ekip C(5, 2) = 10 farklı şekilde kurulabilir."],
    ["Permütasyon ile kombinasyon arasındaki fark nedir?", "Fark sıralamanın önemli olup olmamasıdır. Seçilen elemanların yeri değiştiğinde yeni bir durum oluşuyorsa permütasyon, oluşmuyorsa kombinasyon kullanılır. Aynı n ve r için permütasyon sayısı kombinasyon sayısının r! katıdır."],
    ["Sıralama önemliyse hangisi kullanılır?", "Sıralama önemliyse permütasyon kullanılır. Derece belirleme, farklı görevlere kişi atama, şifre oluşturma ve nesneleri bir sıraya dizme soruları permütasyondur. Yalnızca hangi elemanların seçildiği önemliyse kombinasyon kullanılır."],
    ["Faktöriyel nedir, 0! neden 1?", "Faktöriyel, 1'den n'e kadar olan doğal sayıların çarpımıdır; 5! = 120. Sıfır faktöriyel 1 kabul edilir, çünkü hiç eleman yokken onları dizmenin tek bir yolu vardır ve n! = n çarpı (n − 1)! bağıntısı ancak bu tanımla tutarlı kalır."],
    ["Tekrarlı permütasyon nasıl hesaplanır?", "Toplam eleman sayısının faktöriyeli, tekrar eden her elemanın tekrar sayısının faktöriyellerinin çarpımına bölünür. ANKARA kelimesinde 6 harf ve 3 tane A olduğundan 6! bölü 3! eşittir 120 farklı diziliş elde edilir."],
    ["C(n,r) formülü nasıl uygulanır?", "Paydaki faktöriyelleri açmadan sadeleştirin: C(n, r), n'den başlayarak r tane azalan sayının çarpımının r!'e bölünmesidir. C(30, 4) için 30 · 29 · 28 · 27 = 657.720 bulunur ve 24'e bölünerek 27.405 elde edilir."],
    ["Bir sınıftan kaç farklı ekip seçilebilir?", "Ekipte görev farkı yoksa kombinasyon kullanılır. 30 kişilik sınıftan 4 kişilik ekip C(30, 4) = 27.405 farklı şekilde seçilebilir. Ekip üyelerine başkan, sekreter gibi farklı görevler verilecekse permütasyon kullanılır ve sonuç büyür."],
    ["Dairesel permütasyon nedir?", "Elemanların bir çember etrafına dizilmesidir. Başlangıç noktası olmadığı için bir eleman sabitlenir ve n eleman (n − 1)! farklı biçimde dizilir. Örneğin 6 kişi yuvarlak bir masaya 5! = 120 farklı şekilde oturabilir."]
  ],
  tools: ["kombinasyon-permutasyon", "faktoriyel-hesapla", "olasilik-hesapla", "pascal-ucgeni-olustur"],
  related: ["ortalama-medyan-mod-nedir", "ebob-ekok-nasil-bulunur"],
  sources: [
    ["MEB – Ortaöğretim Matematik Dersi Öğretim Programı", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kılavuzu ve konu kapsamı", "https://www.osym.gov.tr/"]
  ]
};
