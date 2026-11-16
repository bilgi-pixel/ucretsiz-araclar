export default {
  slug: "isveren-maliyeti-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "İşveren Maliyeti Nasıl Hesaplanır? 2026 SGK İşveren Payı ve Teşvik",
  pageTitle: "İşveren Maliyeti Nasıl Hesaplanır? 2026 SGK Payı ve Teşvik",
  description: "İşveren maliyeti = brüt ücret + %21,75 SGK işveren payı + %2 işsizlik primi − Hazine teşviki. 2026 oranları, emekli çalışan farkı ve çözümlü örnekler.",
  keywords: ["işveren maliyeti hesaplama", "işverene maliyeti nasıl hesaplanır", "sgk işveren payı yüzde kaç", "işsizlik sigortası işveren payı", "hazine teşviki 5 puan", "bir çalışanın işverene maliyeti", "brüt maaşın işverene maliyeti", "emekli çalışan işveren maliyeti"],
  lead: "İşveren maliyeti, çalışanın <strong>brüt ücretine</strong> işverenin ödediği <strong>%21,75 SGK işveren payı</strong> ile <strong>%2 işsizlik sigortası primi</strong> eklenip, varsa Hazine teşviki düşülerek bulunur. 2026'da imalat dışı özel sektörde 2 puan, imalat sektöründe 5 puan teşvik uygulanabilir. Örneğin 50.000 TL brüt ücretin imalat dışı bir işyerine aylık maliyeti, teşvikle birlikte 60.875 TL olur. Bu sayfada formülü, emekli çalışan farkını, yan hakların etkisini ve yıllık maliyet hesabını adım adım bulacaksınız.",
  kisaCevap: [
    "Formül: işveren maliyeti = brüt ücret + SGK işveren payı + işsizlik işveren payı − Hazine teşviki.",
    "2026'da SGK işveren payı %21,75'tir: %12 malullük-yaşlılık-ölüm, %7,5 genel sağlık, %2,25 kısa vadeli sigorta kolları.",
    "İşsizlik sigortasında işveren payı %2, işçi payı %1'dir.",
    "Hazine teşviki 2026'da imalat dışı özel sektörde 2 puan, imalat sektöründe 5 puandır; prime esas kazanç üzerinden düşülür.",
    "Primler prime esas kazanç üst sınırına (2026'da aylık 297.270 TL) kadar hesaplanır; bunun üzerindeki ücrete SGK primi işlemez.",
    "Emekli çalışanda sosyal güvenlik destek primi işveren payı %24,75'tir, işsizlik primi kesilmez."
  ],
  figure: {
    alt: "50.000 TL brüt ücretin işveren maliyetini gösteren yığılmış çubuk: brüt ücret, 10.875 TL SGK işveren payı, 1.000 TL işsizlik payı ve 1.000 TL teşvik indirimiyle 60.875 TL toplam.",
    caption: "Brüt ücret çalışana ödenen tutarın vergi ve kesinti öncesi halidir; işverenin kasasından çıkan tutar bunun yaklaşık %22–24 üzerindedir. Örnek imalat dışı özel sektörde 2 puan teşvikle hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">50.000 TL brüt ücretin işverene maliyeti (2026)</text>
  <rect x="40" y="70" width="450" height="56" rx="6" class="ps"/>
  <text x="265" y="104" class="b mid">Brüt ücret 50.000 TL</text>
  <rect x="490" y="70" width="98" height="56" class="p"/>
  <text x="539" y="96" class="sm b mid sf">SGK %21,75</text>
  <text x="539" y="114" class="sm mid sf">10.875 TL</text>
  <rect x="588" y="70" width="9" height="56" class="a"/>
  <text x="640" y="96" class="sm b">İşsizlik %2</text>
  <text x="640" y="114" class="sm">1.000 TL</text>
  <line x1="40" y1="150" x2="680" y2="150" class="sb dash" fill="none"/>
  <rect x="40" y="170" width="300" height="70" rx="8" class="sf sb"/>
  <text x="56" y="196" class="b">Teşvik (imalat dışı, 2 puan)</text>
  <text x="56" y="222" class="dg b">50.000 × %2 = −1.000 TL</text>
  <rect x="380" y="170" width="300" height="70" rx="8" class="sf sb"/>
  <text x="396" y="196" class="b">Teşvik (imalat, 5 puan)</text>
  <text x="396" y="222" class="dg b">50.000 × %5 = −2.500 TL</text>
  <rect x="40" y="262" width="300" height="60" rx="8" class="oks"/>
  <text x="190" y="290" class="b mid">Toplam maliyet</text>
  <text x="190" y="312" class="lg b mid ok">60.875 TL</text>
  <rect x="380" y="262" width="300" height="60" rx="8" class="oks"/>
  <text x="530" y="290" class="b mid">Toplam maliyet</text>
  <text x="530" y="312" class="lg b mid ok">59.375 TL</text>
  <rect x="40" y="340" width="640" height="44" rx="8" class="sf sb"/>
  <rect x="40" y="340" width="8" height="44" class="p"/>
  <text x="60" y="367" class="sm">Teşviksiz: 50.000 + 10.875 + 1.000 = 61.875 TL. Emekli çalışanda: 50.000 + %24,75 = 62.375 TL.</text>
</svg>`
  },
  sections: [
    {
      h: "İşveren maliyeti nedir, neden brüt ücretten fazladır?",
      p: [
        "İş sözleşmesinde yazan brüt ücret, çalışanın vergi ve sigorta kesintilerinden önceki kazancıdır. Çalışan bu brüt tutardan kendi SGK payını, işsizlik payını, gelir vergisini ve damga vergisini öder; eline kalan tutar nettir. İşveren ise brüt ücretin tamamını öder ve bunun üstüne kendi payına düşen primleri de yatırır.",
        "Bu nedenle bir çalışanın işverene gerçek maliyeti brüt ücretin üzerindedir. Bütçe yaparken, iş ilanında ücret belirlerken ya da bir pozisyonun kârlılığını değerlendirirken net maaşla değil, <strong>toplam işveren maliyetiyle</strong> hesap yapmak gerekir. Aksi halde personel giderini yüzde yirmiden fazla eksik planlamış olursunuz.",
        "Maaşın kalemlerini bordro üzerinde görmek isterseniz [[bilgi:maas-bordrosu-nasil-okunur|maaş bordrosu nasıl okunur]] yazısı işçi ve işveren paylarının bordroda nerede durduğunu gösterir."
      ]
    },
    {
      h: "2026 işveren prim oranları",
      p: [
        "İşverenin ödediği primler 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu ile 4447 sayılı İşsizlik Sigortası Kanunu'na dayanır. 19 Aralık 2025 tarihli Resmî Gazete'de yayımlanan 7566 sayılı Kanunla malullük, yaşlılık ve ölüm sigortasının işveren payı 1 puan artırıldı; böylece 2026'da toplam SGK işveren payı %21,75'e çıktı."
      ],
      table: {
        head: ["Kalem", "İşçi payı", "İşveren payı", "Toplam"],
        rows: [
          ["Malullük, yaşlılık ve ölüm sigortası", "%9", "%12", "%21"],
          ["Genel sağlık sigortası", "%5", "%7,5", "%12,5"],
          ["Kısa vadeli sigorta kolları", "-", "%2,25", "%2,25"],
          ["SGK toplamı", "%14", "%21,75", "%35,75"],
          ["İşsizlik sigortası", "%1", "%2", "%3"],
          ["Genel toplam", "%15", "%23,75", "%38,75"]
        ],
        caption: "Kısa vadeli sigorta kolları oranı işyerinin tehlike sınıfına göre değişmez; 5510 sayılı Kanun'a göre tüm işyerleri için %2,25'tir."
      },
      after: [
        "Oranlar prime esas kazanç üzerinden uygulanır. 2026 için SGK Genelgesi 2026/2'de prime esas kazancın alt sınırı aylık 33.030 TL, üst sınırı ise alt sınırın 9 katı olan 297.270 TL olarak açıklandı. Üst sınırı aşan ücretlerde primler tavan tutar üzerinden hesaplanır; aşan kısım yalnızca gelir vergisi ve damga vergisine konu olur."
      ]
    },
    {
      h: "İşveren maliyeti formülü",
      formula: "SGK işveren payı = prime esas kazanç × %21,75\nİşsizlik işveren payı = prime esas kazanç × %2\nHazine teşviki = prime esas kazanç × (2 ya da 5 puan)\nİşveren maliyeti = brüt ücret + SGK işveren payı + işsizlik işveren payı − teşvik",
      p: [
        "Prime esas kazanç çoğu zaman brüt ücrete eşittir. Ancak prime tabi olan yan ödemeler (örneğin nakit ödenen ikramiye, prim ya da istisna sınırını aşan yemek bedeli) prime esas kazanca eklenir; istisna kapsamındaki ödemeler ise eklenmez. Bu yüzden önce o ayın prime esas kazancını belirlemek, sonra oranları uygulamak gerekir."
      ],
      after: [
        "Hazine teşviki, işverenin primlerini yasal süresinde ödemesi, prim ve idari para cezası borcunun bulunmaması ve sigortalıları eksiksiz bildirmesi gibi koşullara bağlıdır. 5 puanlık oran imalat sektöründeki işverenler için 31 Aralık 2026'ya kadar geçerlidir; diğer özel sektör işverenleri 2026'da 2 puan indirimden yararlanır. Koşulları SGK'nın güncel genelgesinden kontrol edin."
      ]
    },
    {
      h: "Çözümlü örnek 1: 50.000 TL brüt ücret",
      ol: [
        "Prime esas kazancı belirleyin: başka prime tabi ödeme yoksa 50.000 TL.",
        "SGK işveren payı: 50.000 × 0,2175 = 10.875 TL.",
        "İşsizlik işveren payı: 50.000 × 0,02 = 1.000 TL.",
        "Teşviksiz maliyet: 50.000 + 10.875 + 1.000 = 61.875 TL.",
        "İmalat dışı işyerinde 2 puan teşvik: 50.000 × 0,02 = 1.000 TL indirim; maliyet 60.875 TL.",
        "İmalat sektöründe 5 puan teşvik: 50.000 × 0,05 = 2.500 TL indirim; maliyet 59.375 TL."
      ],
      after: [
        "Görüldüğü gibi teşvik, toplam maliyeti imalat dışında yaklaşık %1,6, imalatta yaklaşık %4 düşürür. Teşvikten yararlanamayan (örneğin borcu olan) bir işveren için maliyet 61.875 TL olarak kalır. Aynı hesabı farklı ücretlerle denemek için [[arac:isveren-maliyeti-hesapla|İşveren Maliyeti Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek 2: asgari ücretli çalışan",
      p: [
        "2026 brüt asgari ücreti 33.030 TL'dir. SGK işveren payı 33.030 × 0,2175 = 7.184,03 TL, işsizlik işveren payı 33.030 × 0,02 = 660,60 TL'dir. Teşviksiz toplam maliyet 40.874,63 TL olur. İmalat dışı işyerinde 2 puan teşvik (660,60 TL) düşüldüğünde maliyet 40.214,03 TL'ye iner.",
        "Ayrıca 5510 sayılı Kanun'un geçici 112. maddesiyle getirilen asgari ücret desteği, koşulları sağlayan işverenlere 2026'da prim ödeme günü başına 42,33 TL, yani 30 gün için 1.269,90 TL destek sağlar. Bu destek uygulandığında aylık maliyet yaklaşık 38.944,13 TL olur. Desteğin kapsamı ve şartları her yıl yeniden düzenlendiği için SGK duyurusunu kontrol edin. Asgari ücretin net ve brüt kırılımı için [[rehber:asgari-ucret-2026|asgari ücret 2026 rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Net maaştan işveren maliyetine nasıl gidilir?",
      p: [
        "İş görüşmelerinde ücret genellikle net konuşulur. Net maaştan işveren maliyetine doğrudan çarpanla gitmek doğru sonuç vermez, çünkü gelir vergisi dilimli ve kümülatiftir: yılın ilk aylarında %15 diliminde olan bir çalışan, sonbaharda %20 ya da %27 dilimine geçebilir. Aynı net maaşı korumak için gereken brüt ücret yıl içinde artar.",
        "Doğru yol iki adımlıdır. Önce [[arac:brut-net-maas|Brüt Net Maaş Hesaplama]] aracıyla hedeflediğiniz netin her ay hangi brüte karşılık geldiğini bulun. Sonra bu brüt tutara işveren paylarını ekleyin. Vergi dilimlerinin mantığı için [[bilgi:gelir-vergisi-dilimleri-2026|gelir vergisi dilimleri 2026]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Emekli çalışanın işverene maliyeti farklı mı?",
      p: [
        "Evet. Emeklilik aylığı alırken çalışmaya devam eden kişiler için genel sigorta primi yerine <strong>sosyal güvenlik destek primi (SGDP)</strong> ödenir. 2026'da SGDP'nin işveren payı %22,5, kısa vadeli sigorta kolları %2,25 olmak üzere toplam %24,75'tir; çalışan payı ise %7,5'tir. Emekli çalışan için işsizlik sigortası primi kesilmez.",
        "50.000 TL brüt ücretli bir emekli için işveren payı 50.000 × 0,2475 = 12.375 TL, toplam maliyet 62.375 TL olur. Genel uygulamada 2 ve 5 puanlık Hazine teşviki SGDP'ye uygulanmadığı için emekli çalışanın maliyeti, teşvikten yararlanan normal sigortalıya göre biraz daha yüksek çıkabilir."
      ]
    },
    {
      h: "Yemek, yol, ikramiye ve kıdem karşılığı maliyete dahil mi?",
      p: [
        "Yan haklar işverenin kasasından çıktığı için <strong>her durumda</strong> maliyetin parçasıdır; fark, bunların prim ve vergiye tabi olup olmamasıdır. Örneğin istisna sınırları içinde yemek kartıyla verilen yemek bedeli prime esas kazanca girmez, ama kartın yükleme tutarı yine bir giderdir. Sınırı aşan kısım hem ücrete eklenir hem de işveren primini artırır. Ayrıntı için [[bilgi:yemek-karti-vergi-istisnasi-2026|yemek kartı vergi istisnası 2026]] yazısına bakın."
      ],
      table: {
        head: ["Kalem", "İşverene maliyet", "SGK primine etkisi"],
        rows: [
          ["Brüt ücret", "Tamamı", "Prime esas kazancın temelidir"],
          ["Nakit ikramiye ve satış primi", "Tamamı", "Ödendiği aya eklenir, prim işler"],
          ["Yemek bedeli (istisna içinde)", "Tamamı", "Prim işlemez"],
          ["Yemek bedeli (istisnayı aşan)", "Tamamı", "Aşan kısma prim işler"],
          ["Servis ya da toplu taşıma kartı", "Tamamı", "Ayni yol yardımında istisna sınırları vardır"],
          ["Kıdem tazminatı karşılığı", "Dönem sonunda ödenir", "Prime tabi değildir"]
        ]
      },
      after: [
        "Kıdem tazminatı, bir yılını dolduran çalışan için iş sözleşmesi belirli koşullarla sona erdiğinde ödenir ve her tam yıl için 30 günlük brüt ücret kadardır (kıdem tavanına kadar). Aylık bütçede bu yükü görmek için çoğu işletme brüt ücretin yaklaşık 1/12'sini, yani %8,33'ünü karşılık olarak ayırır. Bu prim gibi aylık ödenen bir tutar değil, ileride doğabilecek bir yükümlülüğün planlamasıdır."
      ]
    },
    {
      h: "Bir çalışanın yıllık işveren maliyeti nasıl bulunur?",
      ol: [
        "Aylık brüt ücreti 12 ile çarpın; yıl içinde zam varsa her dönemi ayrı hesaplayın.",
        "Yıl içinde ödenecek ikramiye, prim ve diğer nakit ödemeleri ekleyin.",
        "Her ay için prime esas kazanca %23,75 (SGK %21,75 + işsizlik %2) uygulayın; tavanı aşan aylarda tavanı esas alın.",
        "Hak kazanılan teşvikleri düşün.",
        "Prime tabi olmayan yan hakları (istisna içindeki yemek ve yol) ve kıdem karşılığını ekleyin."
      ],
      after: [
        "Örnek: 50.000 TL brütle 12 ay çalışan, yılda bir brüt maaş tutarında ikramiye alan ve imalat dışı işyerinde çalışan biri için yıllık prime esas kazanç 650.000 TL'dir. İşveren primleri 650.000 × 0,2375 = 154.375 TL, teşvik 650.000 × 0,02 = 13.000 TL'dir. Maliyet 650.000 + 154.375 − 13.000 = 791.375 TL olur; kıdem karşılığı ve yemek gibi yan haklar bunun üzerine eklenir. Yıllık brüt kazancı ayrıca görmek için [[arac:yillik-maas-hesapla|Yıllık Maaş Hesaplama]] aracı işinizi görür."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Net maaşı 1,23 gibi sabit bir katsayıyla çarpmak:</strong> Gelir vergisi kümülatif olduğu için net-brüt ilişkisi aydan aya değişir.",
        "<strong>Teşviki brüt ücretin tamamına uygulamak:</strong> Teşvik prime esas kazanç üzerinden ve tavanla sınırlı hesaplanır.",
        "<strong>Eski oranları kullanmak:</strong> 2025'te işveren SGK payı %20,75 idi; 2026'da %21,75'tir.",
        "<strong>Emekli çalışanı normal sigortalı gibi hesaplamak:</strong> SGDP oranı farklıdır ve işsizlik primi yoktur.",
        "<strong>Yan hakları unutmak:</strong> Prim işlemeyen ödemeler de işverenin nakit çıkışıdır."
      ]
    }
  ],
  faq: [
    ["İşveren maliyeti nasıl hesaplanır?", "Brüt ücrete prime esas kazancın %21,75'i kadar SGK işveren payı ve %2'si kadar işsizlik işveren payı eklenir, hak kazanılan Hazine teşviki düşülür. 50.000 TL brütte teşviksiz maliyet 61.875 TL'dir."],
    ["2026'da SGK işveren payı yüzde kaç?", "2026'da SGK işveren payı %21,75'tir: %12 malullük-yaşlılık-ölüm, %7,5 genel sağlık sigortası ve %2,25 kısa vadeli sigorta kolları. 7566 sayılı Kanunla 2025'teki %20,75 orana 1 puan eklenmiştir."],
    ["İşsizlik sigortası işveren payı ne kadar?", "4447 sayılı Kanun'a göre işsizlik sigortası priminin işveren payı prime esas kazancın %2'si, işçi payı %1'idir. Emeklilik aylığı alan çalışanlar için işsizlik primi kesilmez."],
    ["5 puanlık Hazine teşviki maliyeti ne kadar düşürür?", "2026'da 5 puanlık teşvik yalnızca imalat sektöründeki işverenler için geçerlidir ve prime esas kazancın %5'i kadar indirim sağlar; 50.000 TL brütte 2.500 TL eder. Diğer özel sektörde indirim 2 puandır."],
    ["Net maaştan işveren maliyetine nasıl gidilir?", "Önce net maaşın o aya karşılık gelen brüt tutarı bulunur, çünkü gelir vergisi dilimleri yıl içinde değişir. Ardından bu brüte %21,75 SGK ve %2 işsizlik işveren payı eklenir, teşvik düşülür."],
    ["Emekli çalışanın işverene maliyeti farklı mı?", "Evet. Emekli çalışan için sosyal güvenlik destek primi ödenir; işveren payı %24,75'tir ve işsizlik primi yoktur. Hazine teşvikleri genellikle uygulanmadığından maliyet normal sigortalıya göre biraz yüksek çıkabilir."],
    ["İşveren maliyetine yemek ve yol yardımı dahil mi?", "Yemek ve yol yardımları işverenin nakit çıkışı olduğu için maliyete dahildir. İstisna sınırları içindeki kısım prime esas kazanca girmez; sınırı aşan kısım ücrete eklenir ve işveren primini artırır."],
    ["Kıdem tazminatı karşılığı maliyete eklenmeli mi?", "Aylık bordroda yer almasa da bütçe planlamasında eklenmesi önerilir. Her tam yıl için 30 günlük brüt ücret ödendiğinden işletmeler genellikle brüt ücretin yaklaşık %8,33'ünü karşılık olarak ayırır."],
    ["Bir çalışanın yıllık işveren maliyeti nasıl bulunur?", "Yıllık brüt ücret ve ikramiyeler toplanır, her ayın prime esas kazancına %23,75 işveren primi uygulanır, teşvikler düşülür, sonra prime tabi olmayan yan haklar ve kıdem karşılığı eklenir."]
  ],
  tools: ["isveren-maliyeti-hesapla", "brut-net-maas", "asgari-ucret-hesapla", "yillik-maas-hesapla", "kidem-tazminati"],
  related: ["maas-bordrosu-nasil-okunur", "gelir-vergisi-dilimleri-2026", "sgk-prim-gunu-nasil-hesaplanir", "yemek-karti-vergi-istisnasi-2026"],
  sources: [
    ["SGK – İşveren prim oranları ve genelgeler", "https://www.sgk.gov.tr/"],
    ["Mevzuat – 5510 sayılı Kanun", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5510.pdf"],
    ["Mevzuat – 4447 sayılı İşsizlik Sigortası Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.4447.pdf"],
    ["Resmî Gazete – 7566 sayılı Kanun (19.12.2025)", "https://www.resmigazete.gov.tr/eskiler/2025/12/20251219-1.htm"]
  ],
  uyari: "mali müşavirlik hizmeti yerine geçmez; teşvik ve destek koşulları için SGK'nın güncel duyurularını ve mali müşavirinizi esas alın"
};
