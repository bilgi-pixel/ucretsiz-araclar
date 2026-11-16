export default {
  slug: "islem-onceligi-nedir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "İşlem Önceliği Nedir? Parantez, Üs, Çarpma–Bölme Sırası ve Örnekler",
  pageTitle: "İşlem Önceliği Nedir? Parantez, Üs, Çarpma-Bölme Sırası",
  description: "İşlem önceliği sırası: parantez, üslü ifade, çarpma-bölme (soldan sağa), toplama-çıkarma (soldan sağa). Çözümlü örnekler, 6 ÷ 2(1+2) tartışması ve hesap makinesi farkı.",
  keywords: ["işlem önceliği", "işlem sırası", "parantez önceliği", "çarpma mı bölme mi önce", "işlem önceliği 6. sınıf", "6 ÷ 2(1+2) kaç", "işlem önceliği kuralı", "üslü ifade işlem sırası"],
  lead: "İşlem önceliği, birden fazla işlem içeren bir ifadenin hangi sırayla hesaplanacağını belirleyen kuraldır: <strong>önce parantez içi, sonra üslü ifadeler, ardından çarpma ve bölme, en son toplama ve çıkarma</strong> yapılır. Çarpma ile bölme ve toplama ile çıkarma kendi aralarında eşit önceliklidir; soldan sağa hangisi önce geliyorsa o yapılır. Bu sayfada kuralı adım adım çözülmüş örneklerle, kesirli ifadelerde ve negatif sayılarda uygulanışıyla, sosyal medyada tartışılan 6 ÷ 2(1+2) sorusuyla ve hesap makinelerinin farkıyla anlatıyoruz.",
  kisaCevap: [
    "Sıra: 1) parantez, 2) üslü ifade ve kök, 3) çarpma–bölme, 4) toplama–çıkarma.",
    "Çarpma ve bölme eşit önceliklidir; soldan sağa sırayla yapılır: 48 ÷ 4 ÷ 2 = 6.",
    "Toplama ve çıkarma eşit önceliklidir; soldan sağa yapılır: 10 − 4 + 3 = 9.",
    "İç içe parantezlerde en içteki parantezden başlanır.",
    "−3² = −9, (−3)² = 9: üs yalnızca hemen önündeki sayıya uygulanır.",
    "8 + 12 ÷ 4 × 3 − 2² = 8 + 9 − 4 = 13."
  ],
  figure: {
    alt: "İşlem önceliği merdiveni: parantez, üs, çarpma-bölme, toplama-çıkarma dört basamak; yanında 8 + 12 ÷ 4 × 3 − 2² ifadesinin adım adım 13'e indirgenmesi.",
    caption: "Soldaki basamaklar öncelik sırasını, sağdaki adımlar örneğin çözümünü gösterir. Aynı basamaktaki işlemler (çarpma ve bölme gibi) soldan sağa yapılır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">İşlem önceliği: hangi işlem önce?</text>
  <rect x="20" y="56" width="280" height="56" rx="8" class="p"/>
  <text x="40" y="82" class="lg b sf">1</text><text x="70" y="82" class="b sf">Parantez ( )</text>
  <text x="70" y="102" class="sm sf">en içteki önce</text>
  <rect x="40" y="122" width="260" height="56" rx="8" class="ps"/>
  <text x="58" y="148" class="lg b">2</text><text x="88" y="148" class="b">Üs ve kök</text>
  <text x="88" y="168" class="sm">2², √9</text>
  <rect x="60" y="188" width="240" height="56" rx="8" class="ps"/>
  <text x="78" y="214" class="lg b">3</text><text x="108" y="214" class="b">Çarpma ve bölme</text>
  <text x="108" y="234" class="sm">soldan sağa</text>
  <rect x="80" y="254" width="220" height="56" rx="8" class="sf sb"/>
  <text x="98" y="280" class="lg b">4</text><text x="128" y="280" class="b">Toplama, çıkarma</text>
  <text x="128" y="300" class="sm">soldan sağa</text>
  <rect x="330" y="56" width="370" height="254" rx="10" class="sf sb"/>
  <text x="350" y="86" class="b">Örnek çözüm</text>
  <g class="sm">
    <text x="350" y="120" class="b">8 + 12 ÷ 4 × 3 − 2²</text>
    <text x="350" y="148">Üs: 2² = 4</text><text x="680" y="148" class="end mu">8 + 12 ÷ 4 × 3 − 4</text>
    <text x="350" y="176">Bölme (soldaki): 12 ÷ 4 = 3</text><text x="680" y="176" class="end mu">8 + 3 × 3 − 4</text>
    <text x="350" y="204">Çarpma: 3 × 3 = 9</text><text x="680" y="204" class="end mu">8 + 9 − 4</text>
    <text x="350" y="232">Toplama (soldaki): 8 + 9 = 17</text><text x="680" y="232" class="end mu">17 − 4</text>
    <text x="350" y="260">Çıkarma: 17 − 4</text>
  </g>
  <text x="680" y="290" class="xl end ok">= 13</text>
  <rect x="20" y="330" width="680" height="54" rx="8" class="dgs"/>
  <text x="40" y="353" class="b">Sık hata: soldan sağa okumak yerine çarpmayı bölmeden önce yapmak</text>
  <text x="40" y="374" class="sm">12 ÷ 4 × 3 = 9 doğru; 12 ÷ (4 × 3) = 1 yanlış (parantez yoksa)</text>
</svg>`
  },
  sections: [
    {
      h: "İşlem önceliği nedir, neden gereklidir?",
      p: [
        "İçinde birden fazla işlem bulunan bir ifadeyi farklı sıralarla hesaplarsanız farklı sonuçlar bulursunuz. Örneğin 2 + 3 × 4 ifadesi soldan sağa okunursa 5 × 4 = 20, önce çarpma yapılırsa 2 + 12 = 14 sonucunu verir. Matematikte bir ifadenin yalnızca tek bir değeri olabilmesi için herkesin aynı sırayı izlemesi gerekir; bu ortak sıraya <strong>işlem önceliği</strong> denir.",
        "İşlem önceliği bir sözleşmedir ama keyfî değildir. Çarpma, aynı sayının tekrar tekrar toplanması; üs ise aynı sayının tekrar tekrar çarpılması olduğu için \"daha güçlü\" işlemler önce yapılır. Bu kural, cebirdeki denklemlerin, fizik formüllerinin ve tablolama programlarındaki formüllerin herkes tarafından aynı şekilde okunmasını sağlar.",
        "Konu Türkiye'de 5. ve 6. sınıf matematik programında işlenir ve tam sayılar, kesirler, üslü ifadeler gibi sonraki konuların temelini oluşturur."
      ]
    },
    {
      h: "İşlem önceliği kuralı: dört adım",
      ol: [
        "<strong>Parantez:</strong> Önce parantez içindeki işlemler yapılır. İç içe parantez varsa en içteki parantezden dışarıya doğru ilerlenir. Köşeli ve süslü parantezler de aynı şekilde değerlendirilir.",
        "<strong>Üslü ifadeler ve kökler:</strong> Parantezler bittikten sonra üsler ve kökler hesaplanır.",
        "<strong>Çarpma ve bölme:</strong> Bu iki işlem eşit önceliklidir. İfadede soldan sağa hangisi önce geliyorsa o yapılır.",
        "<strong>Toplama ve çıkarma:</strong> Bu iki işlem de eşit önceliklidir ve soldan sağa yapılır."
      ],
      after: [
        "İngilizce kaynaklarda bu sıra PEMDAS ya da BODMAS kısaltmalarıyla anlatılır. Bu kısaltmalar \"çarpma bölmeden önce\" ya da \"bölme çarpmadan önce\" gibi yanlış bir izlenim verebilir; oysa iki işlem eşittir ve yalnızca soldan sağa sıraya bakılır. Aynı durum toplama ve çıkarma için de geçerlidir."
      ]
    },
    {
      h: "Çözümlü örnekler",
      table: {
        head: ["İfade", "Adımlar", "Sonuç"],
        rows: [
          ["8 + 12 ÷ 4 × 3 − 2²", "2² = 4 → 12 ÷ 4 = 3 → 3 × 3 = 9 → 8 + 9 − 4", "13"],
          ["(5 + 3) × 2² − 18 ÷ (4 − 1)", "Parantezler: 8 ve 3 → 2² = 4 → 8 × 4 = 32, 18 ÷ 3 = 6 → 32 − 6", "26"],
          ["20 − 6 ÷ 3 × 2 + 1", "6 ÷ 3 = 2 → 2 × 2 = 4 → 20 − 4 + 1", "17"],
          ["48 ÷ 4 ÷ 2", "Soldan sağa: 48 ÷ 4 = 12 → 12 ÷ 2", "6"],
          ["10 − 4 + 3", "Soldan sağa: 10 − 4 = 6 → 6 + 3", "9"],
          ["7 − (2 + 3) × 2 + 9 ÷ 3", "Parantez: 5 → 5 × 2 = 10, 9 ÷ 3 = 3 → 7 − 10 + 3", "0"]
        ]
      },
      after: [
        "Üçüncü örnekte yapılan tipik hata, önce 3 × 2 = 6 hesaplayıp 6 ÷ 6 = 1 bulmak ve sonucu 20 vermektir. Dördüncü örnekte ise 4 ÷ 2 önce yapılırsa 48 ÷ 2 = 24 bulunur; ikisi de soldan sağa kuralını çiğner. Kendi örneklerinizi [[arac:hesap-makinesi|Hesap Makinesi]]nin bilimsel modunda parantezlerle yazarak kontrol edebilirsiniz."
      ]
    },
    {
      h: "Parantez neden önce yapılır?",
      p: [
        "Parantez, \"bu kısmı tek bir sayı gibi düşün\" demenin yoludur. Normal öncelik sırasını değiştirmek istediğimizde parantez kullanırız. 2 + 3 × 4 = 14'tür; ama toplamın önce yapılmasını istiyorsak (2 + 3) × 4 = 20 yazarız. Parantezin önceliği olmasaydı bu ikisini ayırt etmenin yolu kalmazdı.",
        "İç içe parantezlerde en içteki parantezden başlanır. Örneğin 3 × [12 − (4 + 2) × 2] ifadesinde önce (4 + 2) = 6, ardından köşeli parantez içinde 12 − 6 × 2 = 12 − 12 = 0, en son 3 × 0 = 0 bulunur."
      ]
    },
    {
      h: "Üslü ifade işlem sırasında nereye girer?",
      p: [
        "Üslü ifadeler parantezden hemen sonra, çarpma ve bölmeden önce hesaplanır. 5 × 2³ ifadesinde önce 2³ = 8, sonra 5 × 8 = 40 bulunur; (5 × 2)³ ise 10³ = 1.000'dir.",
        "Negatif sayılarla çalışırken dikkat: <strong>−3²</strong> ifadesinde üs yalnızca 3'e uygulanır ve sonuç −9'dur. Negatif sayının karesini almak istiyorsanız parantez gerekir: <strong>(−3)² = 9</strong>. Art arda üsler sağdan sola okunur: 2<sup>3<sup>2</sup></sup> = 2<sup>9</sup> = 512'dir, (2³)² = 64 ile karıştırılmamalıdır. Üslü ifadelerin diğer kuralları için [[bilgi:uslu-sayilar-kurallari|üslü sayılar kuralları]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Kesirli ifadelerde işlem önceliği",
      p: [
        "Kesirlerde de kural aynıdır: önce çarpma ve bölme, sonra toplama ve çıkarma. Örneğin 1/2 + 3/4 × 2/3 ifadesinde önce 3/4 × 2/3 = 6/12 = 1/2 hesaplanır, ardından 1/2 + 1/2 = 1 bulunur. Soldan sağa okuyup önce toplama yapılsaydı 5/4 × 2/3 = 10/12 = 5/6 gibi yanlış bir sonuca ulaşılırdı.",
        "Kesir çizgisi gizli bir parantez gibi davranır: payın ve paydanın her biri kendi içinde tamamlanır, sonra bölme yapılır. (6 + 4) ÷ (3 − 1) ile 6 + 4 ÷ 3 − 1 farklıdır; ilki 10 ÷ 2 = 5, ikincisi yaklaşık 6,33'tür. Kesirlerle dört işlemi adım adım görmek için [[arac:kesir-hesapla|Kesir Hesaplama]] aracını, konunun ayrıntıları için [[bilgi:kesirlerle-islemler|kesirlerle işlemler]] makalesini kullanabilirsiniz."
      ]
    },
    {
      h: "\"6 ÷ 2(1+2)\" gibi sorular neden tartışılır?",
      p: [
        "Bu ifade sosyal medyada sık sık paylaşılır ve insanlar 1 ile 9 arasında bölünür. Tartışmanın nedeni matematik değil, yazımın belirsizliğidir. Çarpma işareti yazılmadan bitişik yazılan 2(1+2) bazı kişilerce \"tek bir terim\" gibi okunur ve önce hesaplanır: 6 ÷ 6 = 1.",
        "Okulda öğretilen standart kurala göre ise gizli çarpma da normal bir çarpmadır ve bölmeyle eşit önceliklidir. Önce parantez: 6 ÷ 2 × 3; ardından soldan sağa: 3 × 3 = <strong>9</strong>. Bilimsel hesap makinelerinin büyük çoğunluğu da 9 sonucunu verir, ancak bazı modeller gizli çarpmaya öncelik tanıyarak 1 gösterebilir.",
        "Asıl ders şudur: belirsizlik yaratabilecek ifadelerde parantez ya da kesir çizgisi kullanmak gerekir. (6 ÷ 2)(1 + 2) = 9 ve 6 ÷ [2(1 + 2)] = 1 yazıldığında tartışma ortadan kalkar."
      ]
    },
    {
      h: "Hesap makinesi işlem önceliğine uyar mı?",
      p: [
        "Bu, hesap makinesinin türüne bağlıdır. <strong>Bilimsel hesap makineleri</strong> ve bilgisayardaki hesap uygulamalarının bilimsel modu işlem önceliğine uyar: 2 + 3 × 4 yazıp eşittire bastığınızda 14 bulursunuz. <strong>Basit (dört işlem) hesap makinelerinin</strong> çoğu ise her tuşa bastığınızda o ana kadarki sonucu hesaplar; aynı tuşlama 20 sonucunu verir.",
        "Tablolama programları formülleri işlem önceliğine göre hesaplar; ancak bazı programlar −3^2 yazıldığında eksi işaretini sayının parçası sayarak 9 sonucunu verebilir. Önemli hesaplarda parantez kullanmak, hangi araçta çalıştığınızdan bağımsız olarak doğru sonucu garanti eder. Denklemleri adım adım çözmek için [[arac:denklem-cozucu|Denklem Çözücü]] aracından yararlanabilirsiniz."
      ]
    },
    {
      h: "Tam sayılarda işaret ve işlem önceliği",
      p: [
        "Negatif sayılar işin içine girdiğinde işlem sırası değişmez, yalnızca her adımda işaret kuralları uygulanır. Örneğin −12 ÷ (−3) + 4 × (−2) ifadesinde önce bölme ve çarpma: (−12) ÷ (−3) = 4 ve 4 × (−2) = −8; ardından toplama: 4 + (−8) = −4.",
        "İşaret kuralları için kısa hatırlatma: aynı işaretli iki sayının çarpımı ya da bölümü pozitif, farklı işaretlilerinki negatiftir. Ayrıntılar için [[bilgi:tam-sayilarla-islemler-isaret-kurallari|tam sayılarla işlemler]] makalesine bakın."
      ]
    },
    {
      h: "Günlük hayattan bir örnek: alışveriş hesabı",
      p: [
        "İşlem önceliği yalnızca sınav sorusu değildir. Markette 3 paket makarna (tanesi 25 TL), 2 kg domates (kilosu 40 TL) aldığınızı ve 50 TL'lik bir indirim kuponu kullandığınızı düşünün. Toplamı tek satırda yazarsak 3 × 25 + 2 × 40 − 50 olur. Önce çarpmalar: 75 ve 80; sonra soldan sağa toplama ve çıkarma: 75 + 80 − 50 = 105 TL.",
        "Aynı ifadeyi basit bir hesap makinesine tuşlarken soldan sağa girerseniz 3 × 25 = 75, 75 + 2 = 77, 77 × 40 = 3.080, 3.080 − 50 = 3.030 gibi saçma bir sonuç görürsünüz. Bu yüzden basit makinede her çarpımı ayrı hesaplayıp toplamak ya da bilimsel moda geçmek gerekir. Tablolama programına <code>=3*25+2*40-50</code> yazdığınızda ise program işlem önceliğine uyarak doğrudan 105 sonucunu verir."
      ]
    },
    {
      h: "Sık yapılan hatalar ve kontrol yöntemi",
      ul: [
        "<strong>Çarpmayı her zaman bölmeden önce yapmak:</strong> 12 ÷ 4 × 3 = 9'dur, 1 değildir.",
        "<strong>Toplamayı her zaman çıkarmadan önce yapmak:</strong> 10 − 4 + 3 = 9'dur, 3 değildir.",
        "<strong>Negatif sayının karesinde parantezi unutmak:</strong> −3² = −9, (−3)² = 9.",
        "<strong>Parantez önündeki sayıyı yalnızca ilk terimle çarpmak:</strong> 2(1 + 2) = 2 × 3 = 6'dır; 2 × 1 + 2 = 4 değildir.",
        "<strong>Birden çok işlemi tek adımda yapmak:</strong> Her satırda yalnızca bir işlem yapıp ifadeyi yeniden yazmak, hataları görünür kılar."
      ],
      after: [
        "Kontrol için ifadeyi bilimsel hesap makinesine parantezleriyle birlikte yazın ve sonucunuzla karşılaştırın. Farklı çıkıyorsa adımlarınızı yukarıdaki dört basamakla tek tek eşleştirin."
      ]
    }
  ],
  faq: [
    ["İşlem önceliği nedir?", "İşlem önceliği, birden çok işlem içeren bir ifadenin hangi sırayla hesaplanacağını belirleyen kuraldır. Sıra parantez, üslü ifade ve kök, çarpma-bölme ve en son toplama-çıkarma şeklindedir."],
    ["Parantez neden önce yapılır?", "Parantez, içindeki işlemin tek bir sayı gibi değerlendirilmesini sağlar ve normal öncelik sırasını değiştirmek için kullanılır. Önce yapılmasaydı 2 + 3 × 4 ile (2 + 3) × 4 ifadelerini ayırt etmek mümkün olmazdı."],
    ["Çarpma mı bölme mi önce yapılır?", "Çarpma ve bölme eşit önceliklidir; ifadede soldan sağa hangisi önce geliyorsa o yapılır. Örneğin 12 ÷ 4 × 3 ifadesinde önce bölme yapılır ve sonuç 9 olur."],
    ["Toplama ve çıkarma hangi sırayla yapılır?", "Toplama ve çıkarma da eşit önceliklidir ve soldan sağa yapılır. 10 − 4 + 3 ifadesinde önce 10 − 4 = 6, ardından 6 + 3 = 9 bulunur; toplamayı önce yapmak 3 gibi yanlış bir sonuç verir."],
    ["Üslü ifade işlem sırasında nereye girer?", "Üslü ifadeler ve kökler parantezden hemen sonra, çarpma ve bölmeden önce hesaplanır. Üs yalnızca hemen önündeki sayıya uygulanır; bu yüzden −3² = −9, (−3)² = 9'dur."],
    ["'6 ÷ 2(1+2)' gibi sorular neden tartışılır?", "Çarpma işareti yazılmadan bitişik yazılan ifade bazı kişilerce önce hesaplanacak tek terim gibi okunur ve sonuç 1 bulunur. Standart kurala göre gizli çarpma bölmeyle eşittir ve sonuç 9'dur; parantez kullanmak tartışmayı ortadan kaldırır."],
    ["Hesap makinesi işlem önceliğine uyar mı?", "Bilimsel hesap makineleri ve bilgisayardaki bilimsel modlar işlem önceliğine uyar. Basit dört işlem makinelerinin çoğu ise her tuşta ara sonucu hesapladığından 2 + 3 × 4 için 14 yerine 20 gösterebilir."],
    ["Kesirli ifadelerde işlem önceliği nasıl uygulanır?", "Kesirlerde de önce çarpma ve bölme, sonra toplama ve çıkarma yapılır. Kesir çizgisi gizli bir parantez gibidir; pay ve payda kendi içinde tamamlandıktan sonra bölme işlemi yapılır."],
    ["İç içe parantezlerde hangi sıra izlenir?", "En içteki parantezden başlanır ve dışarıya doğru ilerlenir. Her parantezin içinde de normal öncelik sırası, yani üs, çarpma-bölme ve toplama-çıkarma sırası uygulanır."]
  ],
  tools: ["hesap-makinesi", "kesir-hesapla", "denklem-cozucu"],
  related: ["uslu-sayilar-kurallari", "kesirlerle-islemler", "tam-sayilarla-islemler-isaret-kurallari", "karekok-nasil-alinir"],
  sources: [
    ["MEB – Ortaokul matematik dersi öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
