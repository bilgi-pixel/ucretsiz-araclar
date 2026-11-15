export default {
  slug: "karekok-nasil-alinir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Karekök Nasıl Alınır? Elle Karekök Hesaplama ve Kareköklü İfadeler",
  pageTitle: "Karekök Nasıl Alınır? Elle Hesaplama ve Kök Dışına Çıkarma",
  description: "Bir sayının karekökü, karesi o sayıya eşit olan negatif olmayan sayıdır. Tam kareler, elle karekök bulma, kök dışına çıkarma ve paydayı rasyonel yapma.",
  keywords: ["karekök nasıl alınır", "karekök hesaplama", "elle karekök bulma", "kareköklü sayılar", "tam kare sayılar", "kök dışına çıkarma", "karekök 2 kaçtır", "paydayı rasyonel yapma"],
  lead: "Bir sayının karekökü, <strong>kendisiyle çarpıldığında o sayıyı veren negatif olmayan sayıdır</strong>: 7 × 7 = 49 olduğu için √49 = 7'dir. Tam kare sayıların kökü tam sayıdır; 2, 3, 5 gibi tam kare olmayan sayıların kökü ise sonsuz ve devirsiz ondalıklı bir sayıdır (√2 ≈ 1,414). Elle karekök almak için sayıyı iki tam kare arasına yerleştirip tahmin-ortalama yöntemiyle yaklaşabilir ya da basamaklı bölme yöntemini kullanabilirsiniz. Bu yazıda tam kareleri, kök dışına çıkarmayı, kareköklü ifadelerle dört işlemi ve paydayı rasyonel yapmayı 8. ve 9. sınıf düzeyinde çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "√a = b ise b × b = a ve b ≥ 0'dır; √0 = 0, √1 = 1, √144 = 12.",
    "Tam kareler: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225…",
    "Kök dışına çıkarma: √72 = √(36 × 2) = 6√2; içerideki en büyük tam kare çarpan dışarı alınır.",
    "Toplama yalnızca kök içleri aynıysa yapılır: 2√3 + 5√3 = 7√3; √2 + √3 toplanamaz.",
    "Çarpma ve bölmede kök içleri birleşir: √a × √b = √(a × b), √a ÷ √b = √(a ÷ b).",
    "Önemli yaklaşık değerler: √2 ≈ 1,414; √3 ≈ 1,732; √5 ≈ 2,236."
  ],
  figure: {
    alt: "150'nin karekökünü elle bulma: 150, 144 ile 169 tam kareleri arasında olduğu için kök 12 ile 13 arasındadır. Tahmin-ortalama yöntemiyle 12, 12,25 ve 12,2474 adımlarıyla gerçek değere yaklaşılır.",
    caption: "Önce sayı iki tam kare arasına yerleştirilir: 144 < 150 < 169 olduğu için 12 < √150 < 13. Sonra tahmin ile sayının tahmine bölümünün ortalaması alınır. İki adımda dört ondalık basamak doğruluğa ulaşılır: √150 ≈ 12,2474.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">√150 elle nasıl bulunur?</text>
  <text x="40" y="70" class="b">1. adım: iki tam kare arasına yerleştir</text>
  <line x1="80" y1="120" x2="640" y2="120" class="st sw" fill="none"/>
  <line x1="80" y1="108" x2="80" y2="132" class="st sw" fill="none"/>
  <line x1="640" y1="108" x2="640" y2="132" class="st sw" fill="none"/>
  <circle cx="214.4" cy="120" r="8" class="p"/>
  <text x="80" y="100" class="mid b">144 = 12²</text><text x="640" y="100" class="mid b">169 = 13²</text>
  <text x="214" y="152" class="mid b p">150</text>
  <text x="360" y="176" class="mid">12 &lt; √150 &lt; 13</text>
  <text x="40" y="220" class="b">2. adım: tahmin et, ortalama al, tekrarla</text>
  <rect x="40" y="236" width="200" height="104" rx="10" class="sf sb"/>
  <text x="140" y="262" class="mid sm mu">Tahmin 1</text>
  <text x="140" y="294" class="mid xl">12</text>
  <text x="140" y="322" class="mid sm">150 ÷ 12 = 12,5</text>
  <rect x="260" y="236" width="200" height="104" rx="10" class="ps"/>
  <text x="360" y="262" class="mid sm mu">Tahmin 2</text>
  <text x="360" y="294" class="mid xl">12,25</text>
  <text x="360" y="322" class="mid sm">(12 + 12,5) ÷ 2</text>
  <rect x="480" y="236" width="200" height="104" rx="10" class="p"/>
  <text x="580" y="262" class="mid sm sf">Tahmin 3</text>
  <text x="580" y="294" class="mid xl sf">12,2474</text>
  <text x="580" y="322" class="mid sm sf">(12,25 + 12,2449) ÷ 2</text>
  <rect x="40" y="356" width="640" height="48" rx="8" class="oks"/>
  <text x="360" y="386" class="mid b">Kontrol: 12,2474 × 12,2474 ≈ 149,999 → √150 ≈ 12,247</text>
</svg>`
  },
  sections: [
    {
      h: "Karekök nedir?",
      p: [
        "Karekök, kare alma işleminin tersidir. Bir sayının karesi, o sayının kendisiyle çarpımıdır: 5² = 25. Karekök ise bu işlemi geri alır ve \"hangi negatif olmayan sayının karesi 25'tir?\" sorusunu cevaplar: √25 = 5. Kök işareti (√) altındaki sayıya <strong>kök içi</strong> denir.",
        "Geometrik olarak karekök, alanı bilinen bir karenin kenar uzunluğudur. Alanı 49 cm² olan karenin bir kenarı √49 = 7 cm'dir. Bu yorum, alan ve uzunluk problemlerinde kökün neden ortaya çıktığını açıklar.",
        "(−5)² de 25 ettiği için x² = 25 denkleminin iki çözümü vardır: x = 5 ve x = −5. Ancak √25 sembolü yalnızca negatif olmayan kökü, yani 5'i gösterir. Gerçek sayılarda negatif bir sayının karekökü tanımlı değildir; √(−4) bir gerçek sayı değildir."
      ]
    },
    {
      h: "Tam kare sayılar hangileri?",
      p: [
        "Bir tam sayının karesi olan sayılara tam kare denir. Tam karelerin karekökü tam sayıdır. İlk 20 tam kareyi ezbere bilmek, hem kök dışına çıkarma hem de tahmin yöntemini çok hızlandırır."
      ],
      table: {
        head: ["n", "n²", "n", "n²", "n", "n²", "n", "n²"],
        rows: [
          ["1", "1", "6", "36", "11", "121", "16", "256"],
          ["2", "4", "7", "49", "12", "144", "17", "289"],
          ["3", "9", "8", "64", "13", "169", "18", "324"],
          ["4", "16", "9", "81", "14", "196", "19", "361"],
          ["5", "25", "10", "100", "15", "225", "20", "400"]
        ]
      },
      after: [
        "Bir sayının tam kare olup olmadığını hızlıca ele vermek için son basamağa bakabilirsiniz: tam kareler 2, 3, 7 ya da 8 ile bitmez. Ancak bu yalnızca eleme yapar; 0, 1, 4, 5, 6, 9 ile biten her sayı tam kare değildir. Kesin sonuç için [[arac:tam-kare-kontrol|Tam Kare Kontrol]] aracı karekökü ve en yakın tam kareleri gösterir."
      ]
    },
    {
      h: "Elle karekök nasıl hesaplanır?",
      p: [
        "Hesap makinesi olmadan karekök bulmanın iki pratik yolu vardır. Birincisi, sınavlarda da işe yarayan <strong>tahmin-ortalama</strong> (Babil ya da Heron) yöntemidir. Bir tahmin yaparsınız, sayıyı tahmininize bölersiniz ve iki sayının ortalamasını yeni tahmin olarak alırsınız. Gerçek kök, tahmin ile bölümün arasında kaldığı için her adımda değere hızla yaklaşırsınız."
      ],
      formula: "Yeni tahmin = (tahmin + sayı ÷ tahmin) ÷ 2\n√150: 12 → (12 + 12,5) ÷ 2 = 12,25 → (12,25 + 12,2449) ÷ 2 = 12,2474",
      ol: [
        "Sayıyı iki tam kare arasına yerleştirin: 144 < 150 < 169, yani 12 < √150 < 13.",
        "Küçük olana yakın bir tahmin seçin: 12.",
        "Sayıyı tahmine bölün: 150 ÷ 12 = 12,5.",
        "Ortalamayı alın: (12 + 12,5) ÷ 2 = 12,25. Bu ilk iyileştirilmiş tahmindir.",
        "Tekrarlayın: 150 ÷ 12,25 ≈ 12,2449; ortalama ≈ 12,2474. Gerçek değer 12,24745'tir."
      ],
      after: [
        "İkinci yol <strong>basamaklı bölme</strong> yöntemidir. Sayı sağdan ikişer basamaklık gruplara ayrılır. Örneğin √1369 için gruplar 13 | 69'dur. İlk grubun içindeki en büyük tam kare 9 olduğu için ilk basamak 3, kalan 13 − 9 = 4'tür. Sonraki grup aşağı indirilir: 469. Bulunan sayının iki katı olan 6'nın yanına öyle bir d basamağı yazılır ki 6d × d sayısı 469'u geçmesin: 67 × 7 = 469 tam olarak tutar. Sonuç √1369 = 37'dir. Aynı yöntem, sayının sağına 00 grupları eklenerek ondalık basamaklar için de sürdürülebilir."
      ]
    },
    {
      h: "Karekök 2 kaçtır? Önemli yaklaşık değerler",
      p: [
        "√2, tam kare olmadığı için ondalık açılımı sonsuz ve devirsizdir; yani irrasyonel bir sayıdır. Yaklaşık değeri <strong>1,41421356…</strong>'dır. Kenarı 1 birim olan karenin köşegeni tam olarak √2 birimdir; bu yüzden geometride sık görünür. Aşağıdaki değerler sınavlarda tahmin yapmak için yeterlidir."
      ],
      table: {
        head: ["Kök", "Yaklaşık değer", "Kök", "Yaklaşık değer"],
        rows: [
          ["√2", "1,414", "√7", "2,646"],
          ["√3", "1,732", "√8 = 2√2", "2,828"],
          ["√5", "2,236", "√10", "3,162"],
          ["√6", "2,449", "√12 = 2√3", "3,464"]
        ]
      },
      after: [
        "Daha fazla ondalık basamak ya da büyük sayılar için [[arac:karekok-hesapla|Karekök Hesaplama]] aracını kullanabilirsiniz; araç sonucu sadeleştirilmiş köklü biçimde de gösterir."
      ]
    },
    {
      h: "Kök dışına çıkarma nasıl yapılır?",
      p: [
        "Kök içindeki sayı bir tam kare ile başka bir sayının çarpımı olarak yazılabiliyorsa, tam kare çarpanın kökü dışarı alınır. Amaç, kök içinde mümkün olan en küçük sayıyı bırakmaktır. Bunun için kök içindeki sayının <strong>en büyük tam kare çarpanını</strong> bulmanız gerekir."
      ],
      formula: "√(a² × b) = a√b\n√72 = √(36 × 2) = 6√2\n√180 = √(36 × 5) = 6√5",
      ol: [
        "√48: 48 = 16 × 3 → √48 = 4√3.",
        "√200: 200 = 100 × 2 → √200 = 10√2.",
        "√98: 98 = 49 × 2 → √98 = 7√2.",
        "√75: 75 = 25 × 3 → √75 = 5√3.",
        "Ters işlem: 3√5 = √(9 × 5) = √45. Kat sayının karesi kök içine girer."
      ],
      after: [
        "En büyük tam kare çarpanı göremezseniz sayıyı asal çarpanlarına ayırın: 72 = 2 × 2 × 2 × 3 × 3. Her iki aynı çarpandan biri dışarı çıkar: 2 × 3 = 6 dışarı, tek kalan 2 içeride kalır. Asal çarpanlara ayırma, [[bilgi:ebob-ekok-nasil-bulunur|EBOB ve EKOK]] konusunda da kullanılan yöntemdir."
      ]
    },
    {
      h: "Kareköklü sayılar nasıl toplanır, çarpılır, bölünür?",
      p: [
        "<strong>Toplama ve çıkarma</strong> yalnızca kök içleri aynı olan terimler arasında yapılır; kök dışındaki kat sayılar toplanır, kök içi aynen kalır. Kök içleri farklıysa önce kök dışına çıkarma ile aynı hale getirmeye çalışın.",
        "<strong>Çarpma ve bölmede</strong> kök içleri tek kök altında birleştirilebilir. Kök dışındaki sayılar kendi aralarında, kök içindekiler kendi aralarında çarpılır."
      ],
      table: {
        head: ["İşlem", "Kural", "Örnek"],
        rows: [
          ["Toplama", "a√c + b√c = (a + b)√c", "2√3 + 5√3 = 7√3"],
          ["Önce sadeleştir", "Kök içlerini eşitle", "√12 + √27 = 2√3 + 3√3 = 5√3"],
          ["Toplanamayan", "Kök içleri farklı", "√2 + √3 sadeleşmez"],
          ["Çarpma", "a√b × c√d = ac√(bd)", "2√3 × 4√5 = 8√15"],
          ["Aynı kökle çarpma", "√a × √a = a", "√7 × √7 = 7"],
          ["Bölme", "√a ÷ √b = √(a ÷ b)", "√50 ÷ √2 = √25 = 5"]
        ]
      },
      after: [
        "En sık yapılan hata √(a + b) = √a + √b sanmaktır. √(9 + 16) = √25 = 5'tir; oysa √9 + √16 = 3 + 4 = 7'dir. Kök, toplama üzerine dağılmaz; yalnızca çarpma ve bölme üzerine dağılır."
      ]
    },
    {
      h: "Paydayı rasyonel yapma nedir?",
      p: [
        "Paydada kök bulunan bir kesri, değeri değişmeyecek şekilde paydası köksüz hale getirmeye <strong>paydayı rasyonel yapma</strong> denir. Bunun için pay ve payda aynı uygun ifadeyle çarpılır."
      ],
      ol: [
        "Payda tek kök ise kökün kendisiyle çarpın: 6 ÷ √3 = (6 × √3) ÷ (√3 × √3) = 6√3 ÷ 3 = 2√3.",
        "Payda k√a ise yine √a ile çarpmak yeter: 10 ÷ (2√5) = 10√5 ÷ (2 × 5) = √5.",
        "Payda iki terimliyse eşleniğiyle çarpın: 1 ÷ (√5 − √2) = (√5 + √2) ÷ [(√5)² − (√2)²] = (√5 + √2) ÷ 3.",
        "Eşlenik, ortadaki işaretin değiştirilmiş halidir; (a − b)(a + b) = a² − b² özdeşliği kökleri yok eder."
      ]
    },
    {
      h: "Küp kök nasıl alınır?",
      p: [
        "Küp kök, kendisiyle üç kez çarpıldığında sayıyı veren sayıdır ve ∛ ile gösterilir: 4 × 4 × 4 = 64 olduğu için ∛64 = 4. Karekökten farklı olarak negatif sayıların küp kökü tanımlıdır: (−3)³ = −27 olduğu için ∛(−27) = −3.",
        "Tam küpler 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000'dir. Kök dışına çıkarmada bu kez üç aynı çarpandan biri dışarı çıkar: ∛54 = ∛(27 × 2) = 3∛2. Küp kök ve daha yüksek dereceli kökler için [[arac:kup-kok-hesapla|Küp Kök Hesaplama]] ve [[arac:n-dereceden-kok-hesapla|N. Dereceden Kök Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kökü toplamaya dağıtmak:</strong> √(a + b) ≠ √a + √b.",
        "<strong>√(x²) = x yazmak:</strong> Doğrusu |x|'tir; x = −3 için √9 = 3'tür, −3 değil.",
        "<strong>En büyük tam kareyi kaçırmak:</strong> √72 = 2√18 yazıp bırakmak eksiktir; √18 de sadeleşir ve sonuç 6√2 olur.",
        "<strong>Kat sayıyı kök içine yanlış almak:</strong> 3√2 = √18'dir, √6 değil; kat sayının karesi içeri girer.",
        "<strong>Negatif sayının karekökünü almak:</strong> Gerçek sayılarda √(−9) tanımlı değildir; ∛(−8) = −2 ise tanımlıdır."
      ],
      after: [
        "Sonucunuzu kontrol etmenin en güvenli yolu, bulduğunuz kökün karesini almaktır. 6√2 için (6√2)² = 36 × 2 = 72 eder; sonuç başlangıçtaki kök içine eşitse sadeleştirme doğrudur. Yaklaşık değerlerde de aynı kontrol geçerlidir: 12,247² ≈ 149,99 olduğu için √150 tahmini yeterince iyidir. LGS'de kareköklü ifadeleri sıralama sorularında, kökleri tahmin etmek yerine sayıları kök içine alıp karşılaştırmak da işe yarar: 3√5 = √45 ve 4√3 = √48 olduğu için 4√3 daha büyüktür."
      ]
    }
  ],
  faq: [
    ["Karekök nasıl alınır?", "Kendisiyle çarpıldığında verilen sayıyı veren negatif olmayan sayı bulunur. Tam karelerde bu sayı tam sayıdır, örneğin √81 = 9. Tam kare olmayanlarda sayı iki tam kare arasına yerleştirilip tahmin-ortalama yöntemiyle yaklaşılır."],
    ["Elle karekök nasıl hesaplanır?", "Sayı iki tam kare arasına yerleştirilir, bir tahmin seçilir, sayı tahmine bölünür ve tahmin ile bölümün ortalaması yeni tahmin olarak alınır. √150 için 12, 12,25 ve 12,2474 adımlarıyla iki tekrarda dört basamak doğruluğa ulaşılır."],
    ["Tam kare sayılar hangileri?", "Bir tam sayının karesi olan sayılar tam karedir: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196 ve 225 ilk on beş tam karedir. Tam kareler 2, 3, 7 ya da 8 ile bitmez."],
    ["Kök dışına çıkarma nasıl yapılır?", "Kök içindeki sayı en büyük tam kare çarpanı ile kalan çarpanın çarpımı olarak yazılır ve tam karenin kökü dışarı alınır. Örneğin √72 = √(36 × 2) = 6√2 ve √48 = √(16 × 3) = 4√3'tür."],
    ["Kareköklü sayılar nasıl toplanır?", "Yalnızca kök içleri aynı olan terimler toplanabilir; kök dışındaki kat sayılar toplanır ve kök içi aynen yazılır. √12 + √27 gibi ifadelerde önce sadeleştirme yapılır: 2√3 + 3√3 = 5√3."],
    ["Paydayı rasyonel yapma nedir?", "Paydasında kök bulunan bir kesrin pay ve paydasını uygun bir ifadeyle çarparak paydadaki kökü yok etmektir. Tek kökte kökün kendisiyle, iki terimli paydada ise eşleniğiyle çarpılır; 6 ÷ √3 = 2√3 olur."],
    ["Karekök 2 kaçtır?", "Karekök 2 yaklaşık 1,41421356'dır ve ondalık açılımı sonsuz ve devirsiz olduğu için irrasyonel bir sayıdır. Kenarı 1 birim olan bir karenin köşegen uzunluğu tam olarak √2 birimdir."],
    ["Küp kök nasıl alınır?", "Kendisiyle üç kez çarpıldığında sayıyı veren sayı bulunur; ∛64 = 4 ve ∛(−27) = −3'tür. Tam küp olmayan sayılarda üç aynı çarpandan biri kök dışına çıkarılır, örneğin ∛54 = 3∛2 olur."]
  ],
  tools: ["karekok-hesapla", "tam-kare-kontrol", "kup-kok-hesapla", "n-dereceden-kok-hesapla"],
  related: ["pisagor-teoremi-nedir", "ebob-ekok-nasil-bulunur", "alan-ve-hacim-formulleri"],
  sources: [
    ["Millî Eğitim Bakanlığı – Matematik öğretim programları", "https://www.meb.gov.tr/"]
  ]
};
