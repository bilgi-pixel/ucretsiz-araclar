export default {
  slug: "is-ve-guc-formulu-fizik",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "İş ve Güç Formülü Nedir? W = F·d, P = W/t ve Watt-Beygir Hesabı",
  pageTitle: "İş ve Güç Formülü: W = F·d·cosθ, P = W/t, Watt ve Beygir",
  description: "Fizikte iş W = F·d·cosθ, güç P = W/t formülüyle bulunur; birimleri joule ve watt'tır. İşin sıfır olduğu durumlar, merdiven örneği, beygir dönüşümü ve kWh.",
  keywords: ["iş formülü", "güç formülü", "fizikte iş nedir", "güç nedir fizik", "joule nedir", "watt nedir", "iş güç enerji", "watt beygir dönüşümü"],
  lead: "Fizikte iş, bir kuvvetin cismi kendi doğrultusunda yer değiştirmesiyle aktarılan enerjidir ve <strong>W = F · d · cos θ</strong> formülüyle hesaplanır; birimi joule'dür (J). Güç ise işin ne kadar hızlı yapıldığını gösterir: <strong>P = W / t</strong>, birimi watt'tır (W = J/s). 50 N'luk kuvvetle bir kutuyu 10 m itmek 500 J iş demektir; bu iş 5 saniyede yapılırsa güç 100 W olur. Bu sayfada işin sıfır olduğu durumları, açılı kuvvet hesabını, merdiven çıkan birinin gücünü, watt-beygir dönüşümünü, iş-kinetik enerji ilişkisini ve kWh'nin neden enerji birimi olduğunu çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "İş: W = F · d · cos θ; F kuvvet (N), d yer değiştirme (m), θ kuvvet ile yer değiştirme arasındaki açıdır.",
    "1 joule, 1 newtonluk kuvvetin cismi kuvvet doğrultusunda 1 metre hareket ettirmesiyle yapılan iştir.",
    "Kuvvet yer değiştirmeye dikse (θ = 90°) ya da cisim hareket etmiyorsa yapılan iş sıfırdır.",
    "Güç: P = W / t ya da sabit hızda P = F · v; 1 watt saniyede 1 joule iş demektir.",
    "1 mekanik beygir gücü ≈ 745,7 W, 1 metrik beygir gücü (PS) ≈ 735,5 W'tır.",
    "kWh bir güç değil enerji birimidir: 1 kWh = 1.000 W × 3.600 s = 3.600.000 J."
  ],
  figure: {
    alt: "60 kilogramlık bir kişinin 9 metre yüksekliğe 12 saniyede merdiven çıkması: yapılan iş m çarpı g çarpı h eşittir 5297 joule, güç 5297 bölü 12 eşittir yaklaşık 441 watt, bu da yaklaşık 0,59 beygir. Yanda kuvvet ve yer değiştirme arasındaki açının işe etkisi.",
    caption: "Merdiven çıkarken yapılan iş yalnızca yüksekliğe bağlıdır; merdivenin uzunluğu ya da eğimi değil. Güç ise aynı işin ne kadar sürede yapıldığına bağlıdır: aynı merdiveni 24 saniyede çıkan kişi yarı güç harcar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Merdiven çıkmanın işi ve gücü</text>
  <polyline points="40,330 90,330 90,295 140,295 140,260 190,260 190,225 240,225 240,190 290,190 290,155 340,155 340,120" class="sp sw" fill="none"/>
  <line x1="370" y1="330" x2="370" y2="120" class="sa sw" fill="none"/>
  <polygon points="362,128 370,112 378,128" class="a"/>
  <text x="386" y="230" class="b">h = 9 m</text>
  <circle cx="315" cy="100" r="12" class="p"/>
  <text x="315" y="80" class="sm mid b">60 kg</text>
  <text x="190" y="362" class="sm mid mu">Merdiven uzunluğu işe girmez; yalnızca yükseklik</text>
  <rect x="450" y="60" width="250" height="150" rx="10" class="ps"/>
  <text x="575" y="88" class="b mid">İş</text>
  <text x="575" y="116" class="mid">W = m · g · h</text>
  <text x="575" y="142" class="sm mid">60 × 9,81 × 9</text>
  <text x="575" y="180" class="xl mid p">5.297 J</text>
  <rect x="450" y="224" width="250" height="150" rx="10" class="p"/>
  <text x="575" y="252" class="b mid sf">Güç (t = 12 s)</text>
  <text x="575" y="280" class="mid sf">P = W / t</text>
  <text x="575" y="306" class="sm mid sf">5.297 ÷ 12</text>
  <text x="575" y="344" class="xl mid sf">≈ 441 W</text>
  <text x="575" y="398" class="sm mid">≈ 0,59 hp (745,7 W) · ≈ 0,60 PS (735,5 W)</text>
</svg>`
  },
  sections: [
    {
      h: "Fizikte iş nedir, formülü nedir?",
      p: [
        "Günlük dilde \"iş\" yorulmakla, çabayla eşanlamlıdır. Fizikte ise iş çok daha dar ve kesin bir kavramdır: bir kuvvet bir cisme etki ettiğinde ve cisim <strong>kuvvetin doğrultusunda yer değiştirdiğinde</strong> iş yapılmış olur. İş, kuvvet aracılığıyla bir sisteme aktarılan ya da sistemden alınan enerjinin ölçüsüdür.",
        "Kuvvet ile yer değiştirme aynı doğrultudaysa iş, kuvvetin büyüklüğü ile yer değiştirmenin çarpımıdır. Kuvvet belirli bir açıyla uygulanıyorsa, yalnızca kuvvetin hareket doğrultusundaki bileşeni iş yapar; bu bileşen F · cos θ ile bulunur."
      ],
      formula: "W = F · d · cos θ\nW: iş (joule, J)   F: kuvvet (newton, N)\nd: yer değiştirme (metre, m)   θ: kuvvet ile yer değiştirme arasındaki açı",
      after: [
        "Örnek 1: Yatay bir zeminde bir kutuyu 50 N'luk yatay kuvvetle 10 m itiyorsunuz. Açı 0°, cos 0° = 1 olduğundan W = 50 × 10 × 1 = 500 J.",
        "Örnek 2: Aynı kutuyu yere 60° açıyla tuttuğunuz bir iple 50 N kuvvetle 10 m çekiyorsunuz. cos 60° = 0,5 olduğu için W = 50 × 10 × 0,5 = 250 J. Kuvvetin yarısı kutuyu yukarı doğru kaldırmaya çalışır ve yatay harekete katkı yapmaz. Bu hesapları [[arac:is-hesapla|İş Hesaplama aracıyla]] açı girerek yapabilirsiniz; açıların kosinüs değerlerini trigonometri tablosundan bulabilirsiniz."
      ]
    },
    {
      h: "Hangi durumlarda yapılan iş sıfırdır?",
      p: [
        "Fiziksel işin tanımı gereği, çok yorulsanız bile bazı durumlarda yapılan iş sıfırdır. Bu, sınavlarda en sık sorulan kavram sorularından biridir."
      ],
      ul: [
        "<strong>Cisim hareket etmiyorsa (d = 0):</strong> Bir duvarı saatlerce itseniz de duvar yerinden oynamıyorsa duvar üzerine iş yapmazsınız. Kaslarınızda harcanan enerji ısıya dönüşür.",
        "<strong>Kuvvet yer değiştirmeye dikse (θ = 90°):</strong> Elinizde bir çantayı yatay bir koridorda sabit hızla taşıdığınızda, çantayı tutan kuvvet yukarı, hareket yataydır. cos 90° = 0 olduğu için bu kuvvet iş yapmaz.",
        "<strong>Düzgün çembersel harekette merkezcil kuvvet:</strong> İpe bağlı dönen bir taşta ipteki gerilme her an harekete diktir; hız büyüklüğü değişmez, iş yapılmaz.",
        "<strong>Yükü sabit tutmak:</strong> Bir halteri başınızın üstünde hareketsiz tutmak fiziksel olarak sıfır iştir; ancak kaldırma sırasında iş yapılmıştır."
      ],
      after: [
        "İşin işareti de önemlidir. Kuvvet harekete zıt yöndeyse (θ = 180°) iş negatiftir; sürtünme kuvveti kayan bir cismin üzerinde negatif iş yapar ve onun kinetik enerjisini azaltır. Sürtünmenin hesaplanışı [[bilgi:surtunme-kuvveti-nasil-hesaplanir|sürtünme kuvveti]] yazısında anlatılmıştır."
      ]
    },
    {
      h: "Güç nedir, P = W/t nasıl kullanılır?",
      p: [
        "İki kişi aynı yükü aynı yüksekliğe kaldırırsa ikisi de aynı işi yapar. Ancak biri bunu 2 saniyede, diğeri 10 saniyede yapıyorsa, ilki daha güçlüdür. <strong>Güç</strong>, birim zamanda yapılan iş ya da aktarılan enerjidir."
      ],
      formula: "P = W / t\nCisim sabit hızla hareket ediyorsa: P = F · v\nP: güç (watt, W)   t: süre (saniye, s)   v: hız (m/s)",
      after: [
        "Örnek 3: 500 J'lük iş 5 saniyede yapılırsa P = 500 ÷ 5 = 100 W olur. Aynı iş 2 saniyede yapılırsa güç 250 W'a çıkar.",
        "Örnek 4: Bir otomobil düz yolda 25 m/s (90 km/sa) sabit hızla giderken hava direnci ve sürtünmeyi yenmek için tekerleklerden 2.000 N'luk itme kuvveti gerekiyorsa, motorun tekerleklere aktardığı güç P = F · v = 2.000 × 25 = 50.000 W = 50 kW olur. Gücü iş ve süreden ya da kuvvet ve hızdan [[arac:guc-hesapla|Güç Hesaplama aracıyla]] bulabilirsiniz."
      ]
    },
    {
      h: "1 joule ve 1 watt neyi ifade eder?",
      p: [
        "<strong>1 joule</strong>, 1 newtonluk kuvvetin cismi kuvvet doğrultusunda 1 metre hareket ettirmesiyle yapılan iştir (1 J = 1 N · m). Somut bir karşılık vermek gerekirse: yaklaşık 102 gramlık bir elmayı yerden 1 metre yukarı kaldırmak yaklaşık 1 J iş gerektirir (0,102 × 9,81 × 1 ≈ 1).",
        "<strong>1 watt</strong> ise saniyede 1 joule iş yapılması ya da enerji aktarılmasıdır (1 W = 1 J/s). Bir LED ampulün 9 W olması, her saniye 9 J elektrik enerjisini ışık ve ısıya dönüştürdüğü anlamına gelir."
      ],
      table: {
        head: ["Büyüklük", "Sembol", "SI birimi", "Tanım"],
        rows: [
          ["İş / enerji", "W, E", "joule (J)", "1 J = 1 N · m = 1 kg · m²/s²"],
          ["Güç", "P", "watt (W)", "1 W = 1 J/s"],
          ["Kuvvet", "F", "newton (N)", "1 N = 1 kg · m/s²"],
          ["Elektrik enerjisi", "E", "kilowattsaat (kWh)", "1 kWh = 3.600.000 J"]
        ]
      }
    },
    {
      h: "Merdiven çıkan bir kişinin gücü nasıl hesaplanır?",
      p: [
        "Bu klasik soru, iş ve gücü birlikte kullanmanın güzel bir örneğidir. Merdiven çıkan kişi, kendi ağırlığını belirli bir yüksekliğe kaldırır. Yerçekimine karşı yapılan iş W = m · g · h ile bulunur; yatayda alınan yol bu işe katkı yapmaz."
      ],
      ol: [
        "Verilenler: kütle m = 60 kg, yükseklik h = 9 m (yaklaşık 3 kat), süre t = 12 s, g = 9,81 m/s².",
        "Ağırlık: G = m · g = 60 × 9,81 = 588,6 N.",
        "İş: W = G · h = 588,6 × 9 = 5.297,4 J.",
        "Güç: P = W / t = 5.297,4 ÷ 12 ≈ 441,45 W.",
        "Beygir gücüne çevirme: 441,45 ÷ 745,7 ≈ 0,59 hp ya da 441,45 ÷ 735,5 ≈ 0,60 PS."
      ],
      after: [
        "Bu hesap vücudun kaldırma için yaptığı mekanik işi verir. İnsan kasları kimyasal enerjinin ancak bir bölümünü mekanik işe çevirdiği için, harcanan toplam enerji bunun birkaç katıdır; kalanı ısı olarak açığa çıkar."
      ]
    },
    {
      h: "Watt ile beygir gücü arasındaki dönüşüm",
      p: [
        "Beygir gücü, buhar makinelerinin gücünü atlarınkiyle karşılaştırmak için ortaya çıkmış tarihsel bir birimdir. Bugün iki farklı tanımı yaygın olarak kullanılır ve aradaki fark yaklaşık %1,4'tür."
      ],
      table: {
        head: ["Birim", "Watt karşılığı", "Nerede kullanılır?"],
        rows: [
          ["Mekanik beygir gücü (hp)", "745,7 W", "Bazı ülkelerin motor ve pompa etiketleri"],
          ["Metrik beygir gücü (PS, BG)", "735,5 W", "Avrupa ve Türkiye'de otomobil ruhsatları ve kataloglar"],
          ["Kilowatt (kW)", "1.000 W", "Resmî SI birimi; teknik belgeler"]
        ]
      },
      after: [
        "Örnek 4'teki 50 kW, 50.000 ÷ 735,5 ≈ 68 PS ya da 50.000 ÷ 745,7 ≈ 67 hp eder. Dönüşümleri [[arac:watt-beygir-cevir|Watt Beygir Çevirici]] ile iki tanım arasında seçim yaparak yapabilirsiniz. Motorlarda güç ile tork arasındaki farkı [[bilgi:beygir-gucu-ve-tork-farki|beygir gücü ve tork]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "İş ve kinetik enerji arasındaki ilişki",
      p: [
        "İş-enerji teoremi, bir cisim üzerinde yapılan net işin o cismin kinetik enerjisindeki değişime eşit olduğunu söyler. Bu teorem, kuvvetlerin ayrıntısına girmeden hız değişimlerinden iş ve güç hesaplamayı sağlar."
      ],
      formula: "W(net) = ΔEk = ½ · m · v(son)² − ½ · m · v(ilk)²",
      after: [
        "Örnek 5: 1.000 kg'lık bir otomobil duruştan 20 m/s (72 km/sa) hıza çıkıyor. Kinetik enerji değişimi ½ × 1.000 × 20² = 200.000 J'dür; yani tekerleklere net 200 kJ iş aktarılmıştır. Hızlanma 10 saniye sürdüyse ortalama güç 200.000 ÷ 10 = 20.000 W = 20 kW olur. Hava direnci ve sürtünme kayıpları nedeniyle motorun gerçek gücü bundan yüksektir.",
        "Aynı mantık frenlemede de geçerlidir: frenler, aracın kinetik enerjisini negatif iş yaparak ısıya çevirir. Hız iki katına çıktığında kinetik enerji dört katına çıktığı için fren mesafesi de yaklaşık dört katına çıkar. Kinetik enerjiyi [[arac:kinetik-enerji-hesapla|Kinetik Enerji Hesaplama aracıyla]] bulabilir, enerji türlerinin geniş anlatımı için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısını okuyabilirsiniz."
      ]
    },
    {
      h: "kWh neden bir enerji birimidir?",
      p: [
        "Elektrik faturalarında görülen <strong>kilowattsaat (kWh)</strong>, adında \"watt\" geçtiği için sıklıkla güç birimi sanılır. Oysa güç (kW) ile sürenin (saat) çarpımıdır ve bu çarpım, P = W / t bağıntısından W = P · t olarak enerjiyi verir."
      ],
      formula: "1 kWh = 1.000 W × 3.600 s = 3.600.000 J = 3,6 MJ\nÖrnek: 2.000 W'lık ısıtıcı 3 saat çalışırsa E = 2 kW × 3 sa = 6 kWh = 21,6 MJ",
      after: [
        "Bu yüzden bir cihazın etiketindeki watt değeri, onun ne kadar hızlı enerji tükettiğini; faturadaki kWh ise toplamda ne kadar enerji tükettiğinizi gösterir. Güç, gerilim ve akım arasındaki ilişki için [[bilgi:watt-amper-volt-iliskisi|watt-amper-volt]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Verim ve sık yapılan hatalar",
      p: [
        "Hiçbir makine kendisine verilen enerjinin tamamını işe çeviremez. <strong>Verim</strong> = yararlı iş (ya da güç) ÷ harcanan enerji (ya da güç) × 100 ile bulunur. Merdiven örneğindeki 441 W'lık işi %80 verimli bir elektrikli asansör yapsaydı, motorun şebekeden çektiği güç 441,45 ÷ 0,8 ≈ 552 W olurdu."
      ],
      ul: [
        "<strong>Açıyı yanlış seçmek:</strong> θ, kuvvet ile yer değiştirme arasındaki açıdır; kuvvet ile yatay ya da düşey eksen arasındaki açıyla karıştırmayın.",
        "<strong>Kütleyi kuvvet yerine yazmak:</strong> 60 kg bir kuvvet değildir; ağırlık için g ile çarpmak gerekir (588,6 N).",
        "<strong>Birimleri karıştırmak:</strong> km/sa hızı m/s'ye çevirmeden P = F · v kullanmak 3,6 kat hatalı sonuç verir.",
        "<strong>Merdiven uzunluğunu kullanmak:</strong> Yerçekimine karşı işte yalnızca düşey yükseklik önemlidir.",
        "<strong>kWh'yi güç sanmak:</strong> kWh enerji, kW güçtür.",
        "<strong>Harcanan çabayı fiziksel işle eşitlemek:</strong> Hareket yoksa yapılan iş sıfırdır."
      ]
    }
  ],
  faq: [
    ["Fizikte iş nedir, formülü nedir?", "Fizikte iş, bir kuvvetin cismi kendi doğrultusunda yer değiştirmesiyle aktarılan enerjidir. W = F · d · cos θ formülüyle hesaplanır; burada F kuvvet, d yer değiştirme, θ ise ikisi arasındaki açıdır ve birim joule'dür."],
    ["Hangi durumlarda yapılan iş sıfırdır?", "Cisim hareket etmiyorsa, kuvvet yer değiştirmeye dikse ya da düzgün çembersel harekette merkezcil kuvvet söz konusuysa yapılan iş sıfırdır. Örneğin bir çantayı yatay koridorda sabit hızla taşırken çantayı tutan kuvvet iş yapmaz."],
    ["Güç nedir, P = W/t nasıl kullanılır?", "Güç, birim zamanda yapılan iştir. Yapılan iş joule cinsinden süreye saniye cinsinden bölünür ve sonuç watt olarak bulunur; 500 joule'lük iş 5 saniyede yapılırsa güç 100 watt olur. Sabit hızda P = F · v de kullanılabilir."],
    ["1 joule ve 1 watt neyi ifade eder?", "1 joule, 1 newtonluk kuvvetin cismi kuvvet doğrultusunda 1 metre hareket ettirmesiyle yapılan iştir. 1 watt ise saniyede 1 joule iş yapılması ya da enerji aktarılmasıdır; yani watt, joule'ün ne hızla harcandığını gösterir."],
    ["Merdiven çıkan bir kişinin gücü nasıl hesaplanır?", "Önce yapılan iş kütle, yerçekimi ivmesi ve çıkılan düşey yüksekliğin çarpımıyla bulunur, sonra süreye bölünür. 60 kilogramlık bir kişi 9 metreyi 12 saniyede çıkarsa iş 5.297 joule, güç yaklaşık 441 watt olur."],
    ["Watt ile beygir gücü arasındaki dönüşüm nedir?", "Mekanik beygir gücü yaklaşık 745,7 watt, metrik beygir gücü (PS) yaklaşık 735,5 watt'tır. Watt değerini bu sayılardan birine bölerek beygir gücünü bulursunuz; Türkiye'de otomobillerde genellikle metrik beygir kullanılır."],
    ["İş ve kinetik enerji arasındaki ilişki nedir?", "İş-enerji teoremine göre bir cisim üzerinde yapılan net iş, kinetik enerjisindeki değişime eşittir. 1.000 kilogramlık bir aracı duruştan 20 m/s hıza çıkarmak için tekerleklere net 200.000 joule iş aktarılmalıdır."],
    ["kWh neden bir enerji birimidir?", "kWh, kilowatt cinsinden gücün saat cinsinden süreyle çarpımıdır ve iş ile güç bağıntısına göre bu çarpım enerjiyi verir. 1 kWh, 1.000 watt'lık gücün bir saat boyunca harcanmasıdır ve 3.600.000 joule'e eşittir."],
    ["Negatif iş ne demektir?", "Kuvvet hareketin tersi yönünde etki ediyorsa yapılan iş negatiftir; bu, kuvvetin cisimden enerji aldığı anlamına gelir. Sürtünme ve frenleme kuvvetleri negatif iş yaparak cismin kinetik enerjisini azaltır ve ısıya dönüştürür."]
  ],
  tools: ["guc-hesapla", "is-hesapla", "kinetik-enerji-hesapla", "watt-beygir-cevir"],
  related: ["kinetik-ve-potansiyel-enerji", "beygir-gucu-ve-tork-farki", "watt-amper-volt-iliskisi", "newtonun-hareket-yasalari"]
};
