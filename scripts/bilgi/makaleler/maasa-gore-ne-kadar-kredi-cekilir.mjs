export default {
  slug: "maasa-gore-ne-kadar-kredi-cekilir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Maaşa Göre Ne Kadar Kredi Çekilir? Aylık Ödeme Gücü Hesaplama",
  pageTitle: "Maaşa Göre Ne Kadar Kredi Çekilir? Ödeme Gücü Hesabı",
  description: "Maaşa göre kredi tutarı, karşılanabilir taksit ile faiz ve vadeden bulunur. Borç/gelir oranı, BDDK vade sınırları, taksitten kredi tutarı formülü ve örnek.",
  keywords: ["maaşa göre kredi hesaplama", "maaşım kaç tl kredi çekebilirim", "kredi ödeme gücü", "maaşın yüzde kaçı taksite gider", "borç gelir oranı", "ne kadar kredi alabilirim", "aylık taksit maaş oranı", "taksitten kredi tutarı hesaplama"],
  lead: "Maaşınıza göre çekebileceğiniz kredi, önce <strong>rahatça ödeyebileceğiniz aylık taksiti</strong> bulup sonra bu taksiti faiz ve vadeyle krediye çevirerek hesaplanır. Bankaların herkese uyguladığı sabit bir \"maaşın yüzde şu kadarı\" kuralı yoktur; gelir belgeniz, mevcut borçlarınız ve kredi notunuz birlikte değerlendirilir. Kişisel bütçe açısından toplam taksitlerin net gelirin yaklaşık üçte birini aşmaması sık kullanılan bir ölçüdür. Bu sayfada borç/gelir oranını, BDDK vade sınırlarını ve taksitten kredi tutarına geçiş formülünü örnek tutarlarla bulacaksınız.",
  kisaCevap: [
    "Önce karşılanabilir taksit bulunur: net gelir × hedef oran − mevcut taksitler.",
    "Borç/gelir oranı = tüm aylık borç ödemeleri ÷ aylık net gelir × 100.",
    "Kişisel bütçede toplam taksitlerin net gelirin %30–35'ini aşmaması yaygın bir güvenlik ölçüsüdür; yasal bir sınır değildir.",
    "Kredi tutarı = taksit × (1 − (1 + r)<sup>−n</sup>) ÷ r; r vergiler dahil aylık maliyet, n vade (ay).",
    "BDDK'nın Şubat 2025 kararına göre ihtiyaç kredisinde 125.000 TL'ye kadar 36 ay, 250.000 TL'ye kadar 24 ay, üzerinde 12 ay azami vade uygulanır.",
    "Kredi kartı limitleri ve mevcut kredi kartı borçları da ödeme gücünü azaltır."
  ],
  figure: {
    alt: "Maaştan kredi tutarına giden adımlar: 40.000 TL net gelir, yüzde 35 ile 14.000 TL taksit kapasitesi, 4.000 TL mevcut taksit düşülünce 10.000 TL yeni taksit; örnek faizle 12, 24 ve 36 ay için kredi tutarları.",
    caption: "Örnekte aylık vergiler dahil maliyet %3,9 alınmıştır (örnek oran). 36 aylık tutar hesapta 191.729 TL çıksa da 125.000 TL üzerindeki ihtiyaç kredilerinde 36 ay vade verilmediği için bu seçenek kullanılamaz.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Maaştan kredi tutarına: örnek hesap</text>
  <rect x="20" y="52" width="160" height="70" rx="8" class="sf sb"/>
  <text x="100" y="80" class="sm mid">Net gelir</text>
  <text x="100" y="106" class="lg b mid">40.000 TL</text>
  <rect x="200" y="52" width="160" height="70" rx="8" class="sf sb"/>
  <text x="280" y="80" class="sm mid">%35 sınır</text>
  <text x="280" y="106" class="lg b mid">14.000 TL</text>
  <rect x="380" y="52" width="160" height="70" rx="8" class="dgs"/>
  <text x="460" y="80" class="sm mid">Mevcut taksit</text>
  <text x="460" y="106" class="lg b mid dg">−4.000 TL</text>
  <rect x="560" y="52" width="140" height="70" rx="8" class="p"/>
  <text x="630" y="80" class="sm mid sf">Yeni taksit</text>
  <text x="630" y="106" class="lg b mid sf">10.000 TL</text>
  <line x1="630" y1="126" x2="630" y2="160" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <text x="40" y="186" class="b">10.000 TL taksitle çekilebilecek kredi (aylık %3,9 örnek maliyet)</text>
  <rect x="40" y="204" width="186" height="34" rx="4" class="oks"/>
  <text x="250" y="227" class="b">12 ay: 94.398 TL</text>
  <rect x="40" y="252" width="303" height="34" rx="4" class="oks"/>
  <text x="365" y="275" class="b">24 ay: 154.043 TL</text>
  <rect x="40" y="300" width="377" height="34" rx="4" class="dgs"/>
  <text x="440" y="323" class="b">36 ay: 191.729 TL</text>
  <text x="440" y="343" class="sm dg">125.000 TL üzeri 36 ay verilmez</text>
  <rect x="40" y="360" width="640" height="44" rx="8" class="sf sb"/>
  <rect x="40" y="360" width="8" height="44" class="p"/>
  <text x="60" y="387" class="sm">Kredi = taksit × (1 − (1 + r)^−n) ÷ r · Toplam geri ödeme 24 ayda 240.000 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Maaşa göre kredi hesabının mantığı",
      p: [
        "Kredi hesabını genellikle tersten düşünürüz: \"100.000 TL çekersem taksit ne olur?\" Maaşa göre kredi sorusu ise öteki yönden gelir: \"Ayda ödeyebileceğim taksit belli, buna göre en fazla ne kadar çekebilirim?\" İkinci soru daha sağlıklıdır, çünkü bütçenizden başlar ve kredi tutarını ona göre belirler.",
        "Hesap üç adımdan oluşur: bütçenize göre üstlenebileceğiniz en yüksek taksiti bulmak, bu taksiti faiz ve vergilerle birlikte krediye çevirmek ve sonucu BDDK'nın vade sınırlarına ve bankanın değerlendirmesine göre kontrol etmek. Bu sayfadaki örnekler eğitim amaçlıdır; bir kredi önerisi ya da onay garantisi değildir.",
        "Hesaba başlamadan önce gerçek net gelirinizi belirleyin. Prim, ikramiye ya da mesai gibi her ay aynı olmayan ödemeleri değil, son birkaç ayın düzenli ortalamasını esas alın. Gider tarafında ise kira, aidat, faturalar, ulaşım ve okul giderleri gibi kaçınılmaz harcamaları eksiksiz yazın; bu kalemleri düşük tahmin etmek, hesabı olduğundan iyimser gösterir."
      ]
    },
    {
      h: "Maaşın yüzde kaçı kredi taksitine ayrılmalı?",
      p: [
        "Türkiye'de bireysel krediler için kanunla belirlenmiş tek bir \"maaşın en fazla şu kadarı\" sınırı yoktur. Bankalar ödeme gücünü kendi kredi politikalarına, gelir belgesine, Kredi Kayıt Bürosu kayıtlarına ve mevcut borçlara göre değerlendirir. Bu yüzden aynı maaşa sahip iki kişiye farklı tutarlarda kredi teklif edilebilir.",
        "Kişisel finans açısından yaygın kullanılan ölçü, kira dahil olmamak üzere <strong>tüm kredi taksitlerinin net gelirin %30–35'ini geçmemesidir</strong>. Konut kredisinde bu oran biraz daha yüksek tutulabilir; ama kira, faturalar ve zorunlu harcamalar yüksekse daha düşük bir oran seçmek daha güvenlidir. Bütçenizi ihtiyaç, istek ve birikim olarak ayırmak için [[bilgi:50-30-20-butce-kurali|50/30/20 bütçe kuralı]] iyi bir başlangıçtır."
      ],
      table: {
        head: ["Toplam taksit / net gelir", "Değerlendirme (genel yaklaşım)"],
        rows: [
          ["%20'nin altı", "Rahat; beklenmedik giderlere pay kalır"],
          ["%20–35", "Kabul edilebilir; bütçe takibi önemlidir"],
          ["%35–50", "Zorlayıcı; gelir düşüşünde ödeme riski artar"],
          ["%50'nin üstü", "Yüksek risk; yeni borçtan kaçınmak önerilir"]
        ],
        caption: "Bu eşikler bir banka kuralı ya da yasal sınır değildir; kişisel bütçe için yol göstericidir."
      }
    },
    {
      h: "Borç/gelir oranı nedir, bankalar ödeme gücünü nasıl hesaplar?",
      formula: "Borç/gelir oranı (%) = toplam aylık borç ödemeleri ÷ aylık net gelir × 100\nKarşılanabilir yeni taksit = net gelir × hedef oran − mevcut taksitler",
      p: [
        "Borç/gelir oranı, gelirinizin ne kadarının borç ödemelerine gittiğini gösterir. Hesaba ihtiyaç, taşıt ve konut kredisi taksitleri, kredili mevduat hesabı faizleri ve kredi kartı ödemeleri girer. Bankalar bu oranın yanında gelirin düzenliliğine, çalışma süresine, kredi notuna ve geçmiş ödeme alışkanlıklarına da bakar.",
        "Kendi oranınızı hesaplamak için [[arac:aylik-odeme-gucu-hesapla|Aylık Ödeme Gücü Hesaplama]] aracına gelirinizi, sabit giderlerinizi ve mevcut taksitlerinizi girebilirsiniz; araç bütçenizi zorlamadan üstlenebileceğiniz en yüksek yeni taksiti ve borç/gelir oranınızı gösterir."
      ]
    },
    {
      h: "Taksit tutarından kredi tutarı nasıl bulunur?",
      p: [
        "Eşit taksitli bir kredinin tutarı, gelecekteki taksitlerin bugünkü değerine eşittir. Tüketici kredilerinde faizin üzerine Kaynak Kullanımını Destekleme Fonu (KKDF) ve Banka ve Sigorta Muameleleri Vergisi (BSMV) eklendiğinden, hesapta kullanılan aylık oranın bu vergileri de içermesi gerekir. Her iki vergi de faiz tutarı üzerinden %15 oranında uygulandığı için aylık faizi 1,30 ile çarpmak pratik bir yaklaşımdır."
      ],
      formula: "r = aylık faiz × 1,30 (KKDF %15 + BSMV %15)\nKredi tutarı = taksit × (1 − (1 + r)^−n) ÷ r\nTaksit = kredi × r ÷ (1 − (1 + r)^−n)",
      ol: [
        "Aylık faizi örnek olarak %3 kabul edin: r = 0,03 × 1,30 = 0,039.",
        "Karşılanabilir taksit 10.000 TL, vade 24 ay olsun.",
        "(1 + 0,039)<sup>−24</sup> ≈ 0,3992; 1 − 0,3992 = 0,6008.",
        "0,6008 ÷ 0,039 ≈ 15,404; × 10.000 = yaklaşık 154.043 TL.",
        "24 ay boyunca toplam 240.000 TL ödenir; aradaki yaklaşık 85.957 TL faiz ve vergidir."
      ],
      after: [
        "Faiz oranı burada yalnızca hesabı göstermek için seçilmiş bir örnektir; güncel oranlar bankadan bankaya ve aydan aya değişir. Ters yönde, belirli bir tutarın taksitini görmek için [[arac:ihtiyac-kredisi-hesapla|İhtiyaç Kredisi Hesaplama]] ya da [[arac:kredi-hesapla|Kredi Hesaplama]] aracını kullanabilirsiniz. Faiz ve vergilerin ayrıntısı [[rehber:kredi-faizi-nasil-hesaplanir|kredi faizi rehberinde]] anlatılır."
      ]
    },
    {
      h: "Çözümlü örnek: 40.000 TL net maaş",
      ol: [
        "Net gelir 40.000 TL, hedef oran %35: 40.000 × 0,35 = 14.000 TL toplam taksit kapasitesi.",
        "Mevcut taşıt kredisi taksiti 4.000 TL: yeni taksit için 14.000 − 4.000 = 10.000 TL kalır.",
        "Aylık %3,9 vergiler dahil örnek maliyetle 12 ayda yaklaşık 94.398 TL, 24 ayda yaklaşık 154.043 TL kredi çekilebilir.",
        "36 ay hesapta 191.729 TL verir; ancak bu tutar 125.000 TL'yi aştığı için ihtiyaç kredisinde 36 ay vade kullanılamaz.",
        "36 ay vadeyle çekilebilecek en yüksek tutar 125.000 TL'dir; bu durumda taksit yaklaşık 6.520 TL olur ve bütçede pay kalır."
      ],
      after: [
        "Aynı kişinin mevcut kredisi olmasaydı yeni taksit kapasitesi 14.000 TL'ye çıkardı. Mevcut borçları kapatmanın ya da erken ödemenin etkisini görmek için [[bilgi:kredi-erken-kapama-nasil-hesaplanir|kredi erken kapama nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "BDDK vade sınırları: vade uzarsa çekilebilecek kredi artar mı?",
      p: [
        "Matematiksel olarak evet: aynı taksitle vade uzadıkça kredi tutarı artar, ama toplam faiz de hızla büyür. Ancak ihtiyaç kredilerinde vade serbest değildir. BDDK'nın 13 Şubat 2025 tarihli 11152 sayılı kararıyla güncellenen sınırlar, kredi tutarına göre azami vadeyi belirler."
      ],
      table: {
        head: ["İhtiyaç kredisi tutarı", "Azami vade"],
        rows: [
          ["125.000 TL'ye kadar", "36 ay"],
          ["125.000 TL – 250.000 TL", "24 ay"],
          ["250.000 TL üzeri", "12 ay"]
        ],
        caption: "Sınırlar BDDK kararlarıyla değişebilir; başvuru öncesi BDDK duyurularını ya da bankanızı kontrol edin. Konut ve taşıt kredilerinde ayrı kurallar uygulanır."
      },
      after: [
        "Bu sınırlar nedeniyle yüksek tutarlı ihtiyaç kredilerinde taksit hızla yükselir. 300.000 TL'lik bir kredi en fazla 12 ay vadeyle verilebildiğinden, örnek maliyetle aylık taksit yaklaşık 31.800 TL'ye çıkar. Bu, birçok bütçe için tek başına gelirin yarısından fazlasıdır."
      ]
    },
    {
      h: "Kredi kartı borçları ve limitleri ödeme gücünü etkiler mi?",
      p: [
        "Evet. Kredi kartı borçları, ödenmesi gereken asgari tutarlar ve hatta kullanılmayan yüksek limitler bankaların risk değerlendirmesine girer. Banka Kartları ve Kredi Kartları Yönetmeliği'ne göre bir kişinin tüm bankalardaki toplam kart limiti ilk yıl aylık gelirinin 2 katını, sonraki yıllarda 4 katını aşamaz. BDDK'nın Ocak 2026 kararlarıyla limitlerin belgelenmiş gelirle uyumlu hâle getirilmesi de gündemdedir.",
        "Kartınızda döner borç taşıyorsanız asgari ödeme tutarını borç/gelir hesabına ekleyin. Asgari ödemenin nasıl belirlendiğini [[arac:kredi-karti-asgari-odeme-hesapla|Kredi Kartı Asgari Ödeme Hesaplama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Asgari ücretli ne kadar kredi çekebilir? Ek gelir dahil edilir mi?",
      p: [
        "2026'da net asgari ücret 28.075,50 TL'dir. %30 hedef oranla aylık 8.422,65 TL taksit kapasitesi çıkar. Aynı örnek maliyetle (%3,9) bu taksit 24 ayda yaklaşık 129.700 TL'lik krediye karşılık gelir; ancak bu tutar 125.000 TL'yi aştığı için vade 24 ay ile sınırlıdır. Kira ödeyen biri için %30 oranı fazla yüksek olabilir; gerçek bütçeyle hesaplamak şarttır.",
        "Ek gelirler (kira geliri, serbest meslek kazancı, düzenli ek iş) belgelenebiliyorsa bankalar tarafından dikkate alınabilir. Belgesiz ya da düzensiz gelirler ise genellikle hesaba katılmaz veya düşük ağırlıkla değerlendirilir. Kendi bütçenizde de düzensiz geliri taksit planına dahil etmemek, gelir düştüğünde ödeme güçlüğü yaşamamanın en sağlam yoludur."
      ]
    },
    {
      h: "Kredi çekmeden önce kontrol listesi",
      ul: [
        "Toplam taksitlerin net gelire oranını hesapladınız mı?",
        "En az üç aylık zorunlu giderinizi karşılayacak bir acil durum birikiminiz var mı?",
        "Yıllık maliyet oranını (faiz, vergiler, dosya masrafı, sigorta) karşılaştırdınız mı?",
        "Kredi tutarı ile vadenin BDDK sınırlarına uyduğunu kontrol ettiniz mi?",
        "Erken kapama koşullarını ve ücretini sordunuz mu?",
        "Kredinin amacına gerçekten ihtiyaç var mı, peşin almak mümkün mü? Bunun için [[bilgi:pesin-mi-taksit-mi-hesaplama|peşin mi taksit mi]] yazısına bakın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Brüt maaşla hesaplamak:</strong> Taksitler net gelirden ödenir.",
        "<strong>Vergileri unutmak:</strong> KKDF ve BSMV taksiti belirgin biçimde artırır.",
        "<strong>Yalnızca taksite bakmak:</strong> Uzun vadede toplam geri ödeme kredi tutarının çok üzerine çıkar.",
        "<strong>Kart borçlarını saymamak:</strong> Asgari ödemeler de aylık borç yüküdür.",
        "<strong>Gelir artışına güvenmek:</strong> Beklenen zam gerçekleşmezse bütçe açığı oluşur."
      ]
    }
  ],
  faq: [
    ["Maaşa göre ne kadar kredi çekebilirim?", "Önce net gelirinizin %30–35'i gibi güvenli bir oranından mevcut taksitlerinizi düşerek yeni taksit kapasitenizi bulun. Sonra bu taksiti faiz, vergiler ve vadeyle krediye çevirin. Kesin tutarı bankanın değerlendirmesi belirler."],
    ["Maaşın yüzde kaçı kredi taksitine ayrılmalı?", "Yasal bir sınır yoktur; kişisel bütçede tüm kredi taksitlerinin net gelirin yaklaşık %30–35'ini aşmaması yaygın bir güvenlik ölçüsüdür. Kira ve zorunlu giderler yüksekse daha düşük oran seçmek gerekir."],
    ["Bankalar ödeme gücünü nasıl hesaplar?", "Bankalar belgelenmiş geliri, mevcut kredi ve kart borçlarını, Kredi Kayıt Bürosu kayıtlarını, kredi notunu ve çalışma süresini birlikte değerlendirir. Her bankanın kendi kredi politikası olduğundan sonuçlar farklı olabilir."],
    ["Borç/gelir oranı nedir?", "Borç/gelir oranı, tüm aylık borç ödemelerinin aylık net gelire bölünüp 100 ile çarpılmasıyla bulunur. Örneğin 40.000 TL gelirle ayda 10.000 TL taksit ödeyen birinin oranı %25'tir."],
    ["Kredi kartı borçları ödeme gücünü etkiler mi?", "Evet. Kart borçları, asgari ödeme tutarları ve toplam limitler risk değerlendirmesine girer. Yönetmeliğe göre toplam kart limiti ilk yıl aylık gelirin 2 katını, sonraki yıllarda 4 katını aşamaz."],
    ["Asgari ücretli ne kadar kredi çekebilir?", "2026 net asgari ücreti 28.075,50 TL'dir; %30 oranla aylık yaklaşık 8.420 TL taksit kapasitesi çıkar. Örnek maliyetle bu 24 ayda yaklaşık 130 bin TL krediye denk gelir, ama gerçek bütçe ve bankanın kararı belirleyicidir."],
    ["Vade uzarsa çekilebilecek kredi artar mı?", "Aynı taksitle vade uzadıkça tutar artar ama toplam faiz de büyür. İhtiyaç kredilerinde BDDK sınırları nedeniyle 125.000 TL üzerinde en fazla 24 ay, 250.000 TL üzerinde en fazla 12 ay vade uygulanır."],
    ["Ek gelir kredi limitine dahil edilir mi?", "Belgelenebilen düzenli ek gelirler, örneğin kira geliri ya da serbest meslek kazancı, bankalar tarafından dikkate alınabilir. Belgesiz veya düzensiz gelirler genellikle hesaba katılmaz ya da düşük ağırlıkla değerlendirilir."],
    ["Taksit tutarından kredi tutarı nasıl bulunur?", "Kredi tutarı, taksitin (1 − (1 + r) üssü eksi n) ÷ r ile çarpılmasıyla bulunur; r vergiler dahil aylık maliyet, n ay sayısıdır. 10.000 TL taksit, %3,9 ve 24 ayda yaklaşık 154.043 TL eder."]
  ],
  tools: ["aylik-odeme-gucu-hesapla", "ihtiyac-kredisi-hesapla", "kredi-hesapla", "butce-50-30-20-hesapla", "kredi-karti-asgari-odeme-hesapla"],
  related: ["50-30-20-butce-kurali", "kredi-erken-kapama-nasil-hesaplanir", "pesin-mi-taksit-mi-hesaplama", "nominal-ve-efektif-faiz-farki"],
  sources: [
    ["BDDK – Kurul kararları ve duyurular", "https://www.bddk.org.tr/"],
    ["TCMB – Kredi faiz oranı istatistikleri", "https://www.tcmb.gov.tr/"],
    ["Mevzuat – Banka Kartları ve Kredi Kartları Yönetmeliği", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "kişisel kredi ya da yatırım tavsiyesi değildir; kredi kararı öncesinde bankanızın güncel teklifini ve sözleşme koşullarını inceleyin"
};
