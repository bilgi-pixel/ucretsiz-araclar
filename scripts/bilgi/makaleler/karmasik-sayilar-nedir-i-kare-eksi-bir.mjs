export default {
  slug: "karmasik-sayilar-nedir-i-kare-eksi-bir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Karmaşık Sayılar Nedir? i² = −1, Dört İşlem, Modül ve Eşlenik",
  pageTitle: "Karmaşık Sayılar Nedir? i² = −1, Dört İşlem, Modül ve Eşlenik",
  description: "Karmaşık sayı a + bi biçimindedir ve i² = −1'dir. i'nin kuvvetleri, dört işlem, eşlenikle bölme, modül, argüman ve negatif diskriminantlı denklem örnekleri.",
  keywords: ["karmaşık sayılar", "i kare eksi 1", "karmaşık sayı modülü", "eşlenik nedir", "karmaşık sayılarda bölme", "sanal sayı", "karmaşık düzlem", "i nin kuvvetleri"],
  lead: "Karmaşık sayı, <strong>a + bi</strong> biçiminde yazılan ve <strong>i² = −1</strong> eşitliğini sağlayan sanal birim i'yi içeren sayıdır; a gerçel kısım, b sanal kısımdır. Gerçel sayılarda karekökü alınamayan negatif sayılar, örneğin √(−16) = 4i, karmaşık sayılarla ifade edilir. Bu sayfada i'nin kuvvetlerini, dört işlemi, bölmede eşleniğin neden kullanıldığını, modül ve argümanı, kutupsal gösterimi ve diskriminantı negatif denklemlerin köklerini adım adım çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Karmaşık sayı z = a + bi biçimindedir; a = Re(z) gerçel kısım, b = Im(z) sanal kısımdır ve i² = −1'dir.",
    "i'nin kuvvetleri 4'lü döngüyle tekrar eder: i, −1, −i, 1. Üssü 4'e bölüp kalana bakmak yeterlidir.",
    "Toplamada gerçel kısımlar ve sanal kısımlar ayrı toplanır; çarpmada çarpım dağıtılır ve i² yerine −1 yazılır.",
    "z = a + bi'nin eşleniği a − bi'dir; bölmede pay ve payda paydanın eşleniğiyle çarpılarak payda gerçel yapılır.",
    "Modül |z| = √(a² + b²) sayının orijine uzaklığıdır: |3 + 4i| = 5.",
    "Diskriminantı negatif ikinci dereceden denklemin kökleri birbirinin eşleniği olan iki karmaşık sayıdır."
  ],
  figure: {
    alt: "Karmaşık düzlemde z = 3 + 4i noktası: yatay eksen gerçel, dikey eksen sanal; orijinden uzaklık modül 5, yatayla yapılan açı argüman yaklaşık 53,13 derece; eşleniği 3 − 4i x eksenine göre simetrik.",
    caption: "Karmaşık sayı düzlemde bir nokta ya da vektördür. 3 + 4i noktasının orijine uzaklığı √(3² + 4²) = 5, argümanı arctan(4/3) ≈ 53,13°'dir. Eşlenik 3 − 4i, gerçel eksene göre yansımadır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Karmaşık düzlem: z = 3 + 4i</text>
  <line x1="60" y1="230" x2="420" y2="230" class="st" fill="none"/>
  <line x1="120" y1="50" x2="120" y2="400" class="st" fill="none"/>
  <text x="414" y="250" class="sm end t2">Gerçel eksen (Re)</text>
  <text x="128" y="60" class="sm t2">Sanal eksen (Im)</text>
  <g class="sm mid t2">
    <text x="160" y="248">1</text><text x="200" y="248">2</text><text x="240" y="248">3</text><text x="280" y="248">4</text>
    <text x="108" y="194" class="end">1</text><text x="108" y="154" class="end">2</text><text x="108" y="114" class="end">3</text><text x="108" y="74" class="end">4</text>
    <text x="108" y="274" class="end">−1</text><text x="108" y="394" class="end">−4</text>
  </g>
  <line x1="240" y1="70" x2="240" y2="230" class="sb dash" fill="none"/>
  <line x1="120" y1="70" x2="240" y2="70" class="sb dash" fill="none"/>
  <line x1="120" y1="230" x2="240" y2="70" class="sp sw" fill="none"/>
  <circle cx="240" cy="70" r="7" class="p"/>
  <text x="252" y="66" class="b p">z = 3 + 4i</text>
  <text x="160" y="140" class="b p">|z| = 5</text>
  <path d="M 160 230 A 40 40 0 0 0 144 198" class="sa" fill="none"/>
  <text x="168" y="218" class="sm b">53,13°</text>
  <line x1="120" y1="230" x2="240" y2="390" class="sok dash" fill="none"/>
  <circle cx="240" cy="390" r="6" class="ok"/>
  <text x="252" y="394" class="b ok">z̄ = 3 − 4i</text>
  <rect x="450" y="56" width="250" height="150" rx="8" class="sf sb"/>
  <text x="575" y="82" class="b mid">i'nin kuvvetleri</text>
  <g class="mid">
    <text x="510" y="114">i¹ = i</text><text x="640" y="114">i² = −1</text>
    <text x="510" y="146">i³ = −i</text><text x="640" y="146">i⁴ = 1</text>
  </g>
  <text x="575" y="182" class="sm mid t2">i²⁰²⁶: 2026 = 4·506 + 2 → −1</text>
  <rect x="450" y="222" width="250" height="176" rx="8" class="ps"/>
  <text x="575" y="248" class="b mid">z₁ = 3 + 4i, z₂ = 1 − 2i</text>
  <g class="sm">
    <text x="466" y="278">Toplam: 4 + 2i</text>
    <text x="466" y="304">Fark: 2 + 6i</text>
    <text x="466" y="330">Çarpım: 11 − 2i</text>
    <text x="466" y="356">Bölüm: −1 + 2i</text>
    <text x="466" y="382" class="t2">|z₁·z₂| = 5·√5 ≈ 11,18</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Karmaşık sayı nedir, neden ihtiyaç duyulur?",
      p: [
        "Gerçel sayılarda hiçbir sayının karesi negatif olamaz; bu yüzden x² + 1 = 0 gibi basit bir denklemin gerçel çözümü yoktur. Matematikçiler bu boşluğu kapatmak için karesi −1 olan yeni bir sayı tanımladı: <strong>sanal birim i</strong>. Bu tanımla birlikte her negatif sayının karekökü yazılabilir hale geldi: √(−9) = 3i, √(−16) = 4i, √(−2) = i√2.",
        "Bir gerçel sayı ile bir sanal sayının toplamına <strong>karmaşık sayı</strong> denir ve z = a + bi biçiminde yazılır. Burada a ve b gerçel sayılardır; a'ya gerçel kısım Re(z), b'ye sanal kısım Im(z) denir. b = 0 ise sayı gerçeldir, a = 0 ve b ≠ 0 ise sayı saf sanaldır. Dolayısıyla gerçel sayılar, karmaşık sayıların özel bir alt kümesidir.",
        "İki karmaşık sayı ancak gerçel kısımları ve sanal kısımları ayrı ayrı eşitse eşittir: a + bi = c + di ise a = c ve b = d'dir. Bu özellik, bilinmeyen içeren karmaşık sayı denklemlerini iki ayrı gerçel denkleme dönüştürmeyi sağlar. Örneğin (x + 2) + (y − 1)i = 5 + 3i ise x + 2 = 5 ve y − 1 = 3, yani x = 3 ve y = 4 bulunur.",
        "Sayı kümeleri iç içe genişler: doğal sayılar tam sayıların, tam sayılar rasyonel sayıların, rasyonel sayılar gerçel sayıların, gerçel sayılar da karmaşık sayıların alt kümesidir (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ). Gerçel sayılardan farklı olarak karmaşık sayılar arasında \"büyüktür\" ya da \"küçüktür\" sıralaması tanımlanmaz; 3 + 4i ile 1 − 2i'den hangisinin büyük olduğu sorusu anlamsızdır. Karşılaştırma ancak modüller üzerinden yapılabilir: |3 + 4i| = 5, |1 − 2i| ≈ 2,24."
      ]
    },
    {
      h: "i sayısının kuvvetleri nasıl hesaplanır?",
      p: [
        "i'nin kuvvetleri dörtlü bir döngüyle tekrar eder: i¹ = i, i² = −1, i³ = i² · i = −i, i⁴ = (i²)² = 1. Beşinci kuvvette döngü baştan başlar: i⁵ = i. Bu yüzden büyük bir üs için üssü 4'e bölüp kalana bakmak yeterlidir."
      ],
      formula: "iⁿ = i^(n mod 4)   (kalan 0 ise sonuç 1)\nÖrnek: i²⁰²⁶ → 2026 = 4 × 506 + 2 → i² = −1",
      table: {
        head: ["Üssün 4'e bölümünden kalan", "Sonuç", "Örnek"],
        rows: [
          ["0", "1", "i⁸ = 1, i¹⁰⁰ = 1"],
          ["1", "i", "i⁵ = i, i⁴⁵ = i"],
          ["2", "−1", "i⁶ = −1, i²⁰²⁶ = −1"],
          ["3", "−i", "i⁷ = −i, i⁹⁹ = −i"]
        ]
      },
      after: [
        "Ardışık dört kuvvetin toplamı her zaman sıfırdır: i + i² + i³ + i⁴ = i − 1 − i + 1 = 0. Bu özellik, i + i² + … + i²⁰ gibi toplam sorularını hızla çözmeyi sağlar: 20 terim beş tam döngüdür ve toplam 0'dır."
      ]
    },
    {
      h: "Karmaşık sayılarda toplama, çıkarma ve çarpma",
      p: [
        "Toplama ve çıkarmada gerçel kısımlar kendi arasında, sanal kısımlar kendi arasında işleme girer. Çarpmada ise iki parantez, cebirdeki gibi dağılma özelliğiyle açılır ve i² gördüğünüz yere −1 yazılır. Aşağıdaki örneklerde z₁ = 3 + 4i ve z₂ = 1 − 2i kullanılmıştır."
      ],
      ol: [
        "<strong>Toplama:</strong> (3 + 4i) + (1 − 2i) = (3 + 1) + (4 − 2)i = 4 + 2i.",
        "<strong>Çıkarma:</strong> (3 + 4i) − (1 − 2i) = (3 − 1) + (4 + 2)i = 2 + 6i.",
        "<strong>Çarpma:</strong> (3 + 4i)(1 − 2i) = 3 − 6i + 4i − 8i² = 3 − 2i + 8 = 11 − 2i.",
        "<strong>Kare alma:</strong> (1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i.",
        "<strong>Gerçel sayıyla çarpma:</strong> 2 · (3 + 4i) = 6 + 8i; her iki kısım da 2 ile çarpılır."
      ],
      after: [
        "Çarpmanın önemli bir sonucu, bir sayının kendi eşleniğiyle çarpımının her zaman gerçel olmasıdır: (a + bi)(a − bi) = a² − b²i² = a² + b². Örneğin (3 + 4i)(3 − 4i) = 9 + 16 = 25. Bu özellik bölmenin anahtarıdır."
      ]
    },
    {
      h: "Karmaşık sayı bölmesinde eşlenik neden kullanılır?",
      p: [
        "Bir karmaşık sayının <strong>eşleniği</strong>, sanal kısmının işareti değiştirilerek bulunur: z = a + bi ise z̄ = a − bi. Bölme işleminde amaç sonucu yine a + bi biçiminde yazmaktır; bunun için paydada i kalmamalıdır. Pay ve payda paydanın eşleniğiyle çarpıldığında payda a² + b² gibi gerçel bir sayıya dönüşür ve sonuç kolayca ayrılır."
      ],
      formula: "(3 + 4i) ÷ (1 − 2i) = (3 + 4i)(1 + 2i) ÷ [(1 − 2i)(1 + 2i)]\n= (3 + 6i + 4i + 8i²) ÷ (1 + 4)\n= (−5 + 10i) ÷ 5 = −1 + 2i",
      after: [
        "Sonucu doğrulamak için çarpma yapabilirsiniz: (−1 + 2i)(1 − 2i) = −1 + 2i + 2i − 4i² = −1 + 4i + 4 = 3 + 4i. Bölme doğru çıkmıştır. Dört işlemin sonucunu, modülünü ve eşleniğini birlikte görmek için [[arac:karmasik-sayi-hesapla|Karmaşık Sayı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Modül (mutlak değer) nasıl bulunur?",
      p: [
        "Karmaşık sayılar, yatay ekseni gerçel kısım, dikey ekseni sanal kısım olan <strong>karmaşık düzlemde</strong> bir nokta olarak gösterilir. z = a + bi sayısı (a, b) noktasına karşılık gelir. Bu noktanın orijine uzaklığına <strong>modül</strong> ya da mutlak değer denir ve Pisagor teoremiyle bulunur: |z| = √(a² + b²).",
        "Örnek: |3 + 4i| = √(9 + 16) = √25 = 5. |1 − 2i| = √(1 + 4) = √5 ≈ 2,236. Modülün kullanışlı özellikleri vardır: çarpımın modülü modüllerin çarpımıdır (|z₁ · z₂| = |z₁| · |z₂|) ve bir sayı ile eşleniğinin modülü eşittir. Kontrol: |11 − 2i| = √125 ≈ 11,18 ve 5 · √5 ≈ 11,18.",
        "Kök içindeki sayının sadeleştirilmesi ve ondalık değeri için [[arac:karekok-hesapla|Karekök Hesaplama]] aracı işinizi görür; Pisagor teoreminin geometrik anlamı için [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi makalesine]] bakabilirsiniz."
      ]
    },
    {
      h: "Argüman ve kutupsal gösterim nedir?",
      p: [
        "Karmaşık sayının orijinle birleştirilen doğru parçasının pozitif gerçel eksenle yaptığı açıya <strong>argüman</strong> denir ve arg(z) ya da θ ile gösterilir. Birinci bölgedeki bir sayı için θ = arctan(b / a)'dır. 3 + 4i için θ = arctan(4/3) ≈ 53,13°. Sayı başka bir bölgedeyse açıya 180° ya da 360° eklenmesi gerekebilir; örneğin −3 + 4i ikinci bölgededir ve argümanı yaklaşık 126,87°'dir.",
        "Modül r ve argüman θ biliniyorsa sayı <strong>kutupsal (trigonometrik) biçimde</strong> yazılabilir: z = r(cos θ + i sin θ). 3 + 4i = 5(cos 53,13° + i sin 53,13°). Bu gösterimde çarpma ve kuvvet alma çok kolaylaşır: modüller çarpılır, argümanlar toplanır. n. kuvvet için De Moivre formülü kullanılır: zⁿ = rⁿ(cos nθ + i sin nθ)."
      ],
      after: [
        "Kenarlardan açı bulmanın ayrıntıları [[bilgi:arcsin-arccos-arctan-ters-trigonometri|ters trigonometri makalesinde]] anlatılıyor."
      ]
    },
    {
      h: "Diskriminantı negatif denklemin kökleri nasıl bulunur?",
      p: [
        "İkinci dereceden ax² + bx + c = 0 denkleminde diskriminant Δ = b² − 4ac negatifse gerçel kök yoktur, ama iki karmaşık kök vardır. Kök formülü aynen uygulanır; √Δ yerine i√|Δ| yazılır. Gerçel katsayılı denklemlerde bu iki kök her zaman birbirinin eşleniğidir."
      ],
      ol: [
        "Denklem: x² + 2x + 5 = 0. Katsayılar a = 1, b = 2, c = 5.",
        "Diskriminant: Δ = 2² − 4 · 1 · 5 = 4 − 20 = −16.",
        "Kökü yazın: √(−16) = 4i.",
        "Kök formülü: x = (−2 ± 4i) ÷ 2 = −1 ± 2i.",
        "Kontrol: kökler toplamı −2 = −b/a, kökler çarpımı (−1)² + 2² = 5 = c/a. Doğru."
      ],
      after: [
        "Diskriminantın işaretine göre kök türlerini [[bilgi:diskriminant-ikinci-derece-denklem|diskriminant makalesinde]] bulabilir, kendi denkleminizi karmaşık kökleriyle birlikte [[arac:denklem-cozucu|Denklem Çözücü]] aracında adım adım çözebilirsiniz."
      ]
    },
    {
      h: "Karmaşık sayılar mühendislikte nerede kullanılır?",
      p: [
        "Karmaşık sayılar yalnızca sınav konusu değildir; dönen ve salınan her şeyin matematiğinde doğal araçtır. <strong>Elektrik mühendisliğinde</strong> alternatif akım devrelerinde direnç, bobin ve kondansatörün birlikte etkisi empedans olarak Z = R + jX biçiminde yazılır (elektrikte akımla karışmasın diye i yerine j kullanılır). Böylece faz farkları basit cebirle hesaplanır; ayrıntılar [[bilgi:empedans-ve-reaktans-nedir|empedans ve reaktans makalesinde]].",
        "<strong>Sinyal işlemede</strong> ses ve görüntüyü frekanslarına ayıran Fourier dönüşümü karmaşık sayılarla çalışır. <strong>Kontrol sistemlerinde</strong> bir sistemin kararlı olup olmadığı, karmaşık düzlemdeki köklerinin konumuna bakılarak anlaşılır. <strong>Kuantum fiziğinde</strong> dalga fonksiyonları karmaşık değerlidir. Bilgisayar grafiklerinde iki boyutlu döndürmeler de karmaşık sayı çarpımıyla ifade edilebilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>i²'yi +1 almak:</strong> Çarpmadan sonra i² mutlaka −1 ile değiştirilir.",
        "<strong>√(−4) · √(−9) = √36 yazmak:</strong> Negatif sayıların kökleri çarpılırken önce i'ye çevirin: 2i · 3i = 6i² = −6.",
        "<strong>Bölmede yalnızca paydayı eşlenikle çarpmak:</strong> Pay da aynı eşlenikle çarpılmalıdır.",
        "<strong>Modülde sanal kısmın karesini i ile almak:</strong> |a + bi| = √(a² + b²); b²i² değil b² kullanılır.",
        "<strong>Argümanda bölgeyi unutmak:</strong> arctan(b/a) yalnızca birinci ve dördüncü bölgede doğrudan doğru sonuç verir."
      ]
    }
  ],
  faq: [
    ["Karmaşık sayı nedir, neden ihtiyaç duyulur?", "Karmaşık sayı a + bi biçiminde yazılan ve karesi −1 olan sanal birim i'yi içeren sayıdır. Gerçel sayılarda çözümü olmayan x² + 1 = 0 gibi denklemleri çözmek ve negatif sayıların kökünü yazabilmek için tanımlanmıştır."],
    ["i sayısının kuvvetleri nasıl hesaplanır?", "i'nin kuvvetleri i, −1, −i, 1 şeklinde dörtlü döngüyle tekrar eder. Üs 4'e bölünür ve kalana göre sonuç bulunur; örneğin 2026'nın 4'e bölümünden kalan 2 olduğu için i üzeri 2026 eşittir −1."],
    ["Karmaşık sayılarda toplama ve çarpma nasıl yapılır?", "Toplamada gerçel ve sanal kısımlar ayrı ayrı toplanır: (3 + 4i) + (1 − 2i) = 4 + 2i. Çarpmada parantezler dağıtılır ve i² yerine −1 yazılır: (3 + 4i)(1 − 2i) = 11 − 2i."],
    ["Karmaşık sayı bölmesinde eşlenik neden kullanılır?", "Bir sayının eşleniğiyle çarpımı gerçel olduğu için pay ve payda paydanın eşleniğiyle çarpılınca paydadaki i kaybolur. Böylece sonuç a + bi biçiminde yazılabilir; (3 + 4i) bölü (1 − 2i) eşittir −1 + 2i."],
    ["Modül (mutlak değer) nasıl bulunur?", "Modül, karmaşık sayının düzlemde orijine uzaklığıdır ve gerçel ile sanal kısımların karelerinin toplamının karekökü alınarak bulunur. Örneğin 3 + 4i sayısının modülü √(9 + 16) = 5'tir."],
    ["Argüman ve kutupsal gösterim nedir?", "Argüman, sayıyı orijine bağlayan doğrunun pozitif gerçel eksenle yaptığı açıdır. Modül r ve argüman θ ile sayı r(cos θ + i sin θ) biçiminde yazılır; 3 + 4i için r = 5 ve θ yaklaşık 53,13 derecedir."],
    ["Diskriminantı negatif denklemin kökleri nasıl bulunur?", "Kök formülü uygulanır ve negatif diskriminantın karekökü i ile yazılır. x² + 2x + 5 = 0 için Δ = −16, √Δ = 4i ve kökler −1 + 2i ile −1 − 2i olur; kökler birbirinin eşleniğidir."],
    ["Karmaşık sayılar mühendislikte nerede kullanılır?", "Alternatif akım devrelerinde empedans hesabında, Fourier dönüşümüyle sinyal işlemede, kontrol sistemlerinin kararlılık analizinde ve kuantum fiziğinde kullanılır. Elektrikte akımla karışmaması için sanal birim j harfiyle gösterilir."],
    ["Eşlenik nedir, nasıl yazılır?", "Bir karmaşık sayının eşleniği, sanal kısmının işareti değiştirilerek elde edilir: 3 + 4i'nin eşleniği 3 − 4i'dir. Sayı ile eşleniğinin toplamı gerçel kısmın iki katı, çarpımı ise modülün karesidir."]
  ],
  tools: ["karmasik-sayi-hesapla", "denklem-cozucu", "karekok-hesapla"],
  related: ["diskriminant-ikinci-derece-denklem", "empedans-ve-reaktans-nedir", "arcsin-arccos-arctan-ters-trigonometri"]
};
