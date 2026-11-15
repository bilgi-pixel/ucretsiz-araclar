export default {
  slug: "zincirleme-indirim-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Zincirleme İndirim Nasıl Hesaplanır? %20+%10 İndirim Toplam Kaç Yüzde",
  pageTitle: "Zincirleme İndirim Hesaplama: %20 + %10 Neden %28 Eder?",
  description: "Zincirleme indirimde oranlar toplanmaz, kalan paylar çarpılır: %20 + %10 = 1 − 0,80 × 0,90 = %28. Bayi iskontosu, sepette ek indirim, eski fiyatı bulma ve KDV sırası.",
  keywords: ["zincirleme indirim hesaplama", "%20 + %10 indirim kaç yüzde", "üst üste indirim hesaplama", "iskonto hesaplama", "bayi iskontosu", "indirim oranı nasıl bulunur", "sepette ek indirim", "indirimden önceki fiyat"],
  lead: "Zincirleme (art arda) indirimde oranlar toplanmaz; <strong>her indirim bir öncekinden kalan fiyata uygulanır</strong>. Bu yüzden %20 ve ardından %10 indirim toplam %30 değil, %28 eder: 1.000 TL'lik ürün önce 800 TL'ye, sonra 720 TL'ye düşer. Genel formül, her indirimden sonra kalan payların çarpılmasıdır: 0,80 × 0,90 = 0,72, yani fiyatın %72'si ödenir. Bu sayfada formülü, bayi iskontosu ve sepette ek indirim örneklerini, indirimli fiyattan eski fiyatı bulmayı, sabit tutarlı kuponlarda sıranın önemini ve KDV'nin indirimle ilişkisini bulacaksınız.",
  kisaCevap: [
    "Son fiyat = liste fiyatı × (1 − a) × (1 − b) × (1 − c)…; oranlar ondalık yazılır (%20 = 0,20).",
    "Toplam (eşdeğer) indirim oranı = 1 − (1 − a) × (1 − b) × …; %20 + %10 = %28, %20 + %10 + %5 = %31,6.",
    "Yüzde indirimlerde sıra fark etmez; %10 + %20 de %28 eder.",
    "Sabit tutarlı indirimde (ör. 100 TL kupon) sıra fark eder: önce yüzde sonra kupon, müşteri için daha avantajlıdır.",
    "İndirimli fiyattan eski fiyat: eski fiyat = yeni fiyat ÷ (1 − toplam indirim oranı).",
    "Faturada gösterilen ticari iskontolar KDV matrahına girmez; KDV indirimli tutar üzerinden hesaplanır."
  ],
  figure: {
    alt: "1.000 TL'lik ürüne %20 indirim uygulanınca 800 TL, ardından %10 indirim uygulanınca 720 TL; toplam indirim 280 TL yani yüzde 28. Yanında yüzde 30 sanıldığında beklenen 700 TL ile karşılaştırma.",
    caption: "İkinci indirim 1.000 TL'ye değil, kalan 800 TL'ye uygulanır; bu yüzden 100 TL değil 80 TL düşer. Aradaki 20 TL, %30 ile %28 arasındaki farktır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">%20 + %10 zincirleme indirim</text>
  <g>
    <rect x="40" y="70" width="140" height="200" rx="6" class="sf sb"/>
    <text x="110" y="62" class="b mid">Liste</text>
    <text x="110" y="176" class="lg b mid">1.000 TL</text>
    <rect x="260" y="110" width="140" height="160" rx="6" class="ps"/>
    <rect x="260" y="70" width="140" height="40" rx="6" class="dgs"/>
    <text x="330" y="96" class="sm mid dg b">−200 (%20)</text>
    <text x="330" y="196" class="lg b mid">800 TL</text>
    <rect x="480" y="126" width="140" height="144" rx="6" class="p"/>
    <rect x="480" y="110" width="140" height="16" rx="4" class="dgs"/>
    <text x="550" y="104" class="sm mid dg b">−80 (%10 × 800)</text>
    <text x="550" y="204" class="lg b mid sf">720 TL</text>
  </g>
  <line x1="190" y1="170" x2="248" y2="170" class="st sw" fill="none"/><polygon points="248,162 260,170 248,178" class="t2"/>
  <line x1="410" y1="190" x2="468" y2="190" class="st sw" fill="none"/><polygon points="468,182 480,190 468,198" class="t2"/>
  <text x="219" y="160" class="sm mid">× 0,80</text><text x="439" y="180" class="sm mid">× 0,90</text>
  <rect x="40" y="296" width="640" height="104" rx="10" class="sf sb"/>
  <rect x="40" y="296" width="8" height="104" class="p"/>
  <text x="64" y="324" class="b">Toplam indirim = 1 − 0,80 × 0,90 = 1 − 0,72 = %28</text>
  <text x="64" y="352">%30 sanılırsa beklenen fiyat 700 TL; gerçek fiyat 720 TL</text>
  <text x="64" y="380" class="sm t2">Sıra değişse de sonuç aynı: 1.000 × 0,90 × 0,80 = 720 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Zincirleme indirim nedir?",
      p: [
        "Zincirleme indirim, bir fiyata birden fazla yüzde indirimin art arda uygulanmasıdır. Mağazada \"%20 indirimli ürünlerde kasada ek %10\" kampanyası, e-ticarette \"sepette ek %15\" fırsatı ya da toptancının bayilerine verdiği \"%30 + %10 + %5\" iskonto dizisi hep zincirleme indirimdir.",
        "Zincirleme indirimin can alıcı noktası şudur: ikinci indirim liste fiyatına değil, ilk indirimden <strong>sonra kalan</strong> fiyata uygulanır. Bu yüzden indirimlerin toplamı, oranların toplamından her zaman küçüktür. Kampanya dilinde \"%20 + %10\" yazması, %30 indirim yapıldığı anlamına gelmez."
      ]
    },
    {
      h: "Zincirleme indirim formülü",
      formula: "Son fiyat = liste fiyatı × (1 − a) × (1 − b) × (1 − c) …\nToplam indirim oranı = 1 − (1 − a) × (1 − b) × (1 − c) …\nToplam indirim tutarı = liste fiyatı − son fiyat\n(a, b, c: ondalık oranlar; %20 = 0,20)",
      p: [
        "Formülün mantığı basittir: %20 indirimden sonra fiyatın %80'ini, ardından %10 indirimden sonra kalanın %90'ını ödersiniz. Kalan payları çarptığınızda ödediğiniz toplam payı bulursunuz: 0,80 × 0,90 = 0,72. Ödediğiniz pay %72 ise gerçek indirim %28'dir.",
        "Çarpmanın değişme özelliği nedeniyle yüzde indirimlerin sırası sonucu değiştirmez: önce %10 sonra %20 uygulamak da 0,90 × 0,80 = 0,72 verir. Kampanyada \"önce hangisi uygulanıyor\" sorusu yalnızca sabit tutarlı indirimler işin içine girdiğinde önemlidir."
      ]
    },
    {
      h: "%20 + %10 indirim neden %30 etmez? Hazır tablo",
      p: [
        "Aşağıdaki tablo sık görülen indirim birleşimlerinin gerçek karşılığını gösterir. Sağdaki sütun, 1.000 TL'lik bir ürünün son fiyatıdır."
      ],
      table: {
        head: ["İndirim dizisi", "Ödenen pay", "Gerçek toplam indirim", "1.000 TL ürünün son fiyatı"],
        rows: [
          ["%10 + %10", "0,90 × 0,90 = 0,81", "%19", "810 TL"],
          ["%20 + %10", "0,80 × 0,90 = 0,72", "%28", "720 TL"],
          ["%20 + %20", "0,80 × 0,80 = 0,64", "%36", "640 TL"],
          ["%30 + %10", "0,70 × 0,90 = 0,63", "%37", "630 TL"],
          ["%50 + %20", "0,50 × 0,80 = 0,40", "%60", "400 TL"],
          ["%50 + %50", "0,50 × 0,50 = 0,25", "%75", "250 TL"],
          ["%20 + %10 + %5", "0,80 × 0,90 × 0,95 = 0,684", "%31,6", "684 TL"]
        ]
      },
      after: [
        "Fark, oranlar büyüdükçe belirginleşir: \"%50 + %50\" bedava değil, %75 indirim demektir. Kendi oranlarınızı adım adım görmek için [[arac:zincirleme-indirim-hesapla|Zincirleme İndirim Hesaplama aracı]] her basamaktan sonraki fiyatı, toplam indirim tutarını ve tek indirime eşdeğer oranı listeler."
      ]
    },
    {
      h: "İskonto nedir, bayi iskontosu nasıl uygulanır?",
      p: [
        "Ticarette <strong>iskonto</strong>, satıcının liste fiyatı üzerinden alıcıya tanıdığı indirimdir. Toptancı ve distribütörler bayilerine çoğu zaman tek bir oran yerine bir iskonto dizisi tanımlar: temel bayi iskontosu, hacim iskontosu, kampanya iskontosu, peşin ödeme iskontosu gibi. Bu diziler zincirleme hesaplanır."
      ],
      ol: [
        "Liste fiyatı 10.000 TL (KDV hariç) olan bir ürün için bayi iskontosu %30, kampanya iskontosu %10, peşin ödeme iskontosu %5 olsun.",
        "Bayi iskontosu: 10.000 × 0,70 = 7.000 TL.",
        "Kampanya iskontosu: 7.000 × 0,90 = 6.300 TL.",
        "Peşin ödeme iskontosu: 6.300 × 0,95 = 5.985 TL.",
        "Toplam iskonto: 10.000 − 5.985 = 4.015 TL, yani %40,15 (oranların toplamı olan %45 değil).",
        "KDV net tutar üzerinden eklenir: %20 oran örneğiyle 5.985 × 1,20 = 7.182 TL."
      ],
      after: [
        "Bayi fiyat listeleriyle çalışırken iskonto dizisini tek bir eşdeğer orana çevirmek fiyat karşılaştırmasını kolaylaştırır: \"%30 + %10 + %5\" veren tedarikçi ile \"%40\" veren tedarikçi arasında, ilki biraz daha iyi koşul sunar (%40,15). Liste fiyatı, iskonto oranı ve net fiyat arasında üç yönlü hesap için [[arac:iskonto-hesapla|İskonto Hesaplama aracı]] kullanılabilir; net fiyata kâr payı eklerken [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı ile markup farkına]] dikkat edin."
      ]
    },
    {
      h: "Sepette ek indirim ve sabit tutarlı kuponlar",
      p: [
        "E-ticaret sitelerinde \"sepette ek %10\" türü indirimler, ürünün zaten indirimli fiyatına uygulanan ikinci halkadır ve yukarıdaki formülle hesaplanır. Ancak kampanyalar çoğu zaman yüzde indirimle birlikte sabit tutarlı kupon da içerir (\"500 TL üzeri 100 TL indirim\" gibi). Sabit tutarlı indirimlerde sıra sonucu değiştirir:"
      ],
      table: {
        head: ["Uygulama sırası", "Hesap", "Son fiyat"],
        rows: [
          ["Önce %20, sonra 100 TL kupon", "1.000 × 0,80 = 800 → 800 − 100", "700 TL"],
          ["Önce 100 TL kupon, sonra %20", "1.000 − 100 = 900 → 900 × 0,80", "720 TL"]
        ],
        caption: "Önce yüzde, sonra sabit tutar uygulandığında müşteri daha az öder; çünkü yüzde indirim daha büyük bir tutara uygulanır."
      },
      after: [
        "Kampanya koşulları, kuponun hangi tutara uygulandığını (ürün fiyatına mı, indirimli sepet tutarına mı) ve alt limitin indirimden önce mi sonra mı kontrol edildiğini belirtmelidir. 500 TL alt limitli bir kupon, indirimden sonra sepet 480 TL'ye düşerse geçersiz kalabilir. Şarta bağlı indirim ve kampanyalarda koşulların açıkça belirtilmesi de tüketici mevzuatının gereğidir."
      ]
    },
    {
      h: "Farklı kampanyaları karşılaştırmak: hangisi daha avantajlı?",
      p: [
        "Mağazalar aynı indirimi farklı biçimlerde sunabilir. Karşılaştırmanın en sağlam yolu her teklifi \"ödenen pay\"a çevirmektir. \"%25 + %20\" kampanyasında ödenen pay 0,75 × 0,80 = 0,60, yani tek seferde %40 indirimle aynıdır. \"3 al 2 öde\" kampanyasında üç ürünün ikisinin parası ödendiği için ödenen pay 2 ÷ 3 = 0,667'dir; bu da yaklaşık %33,3 indirime denk gelir, ama yalnızca üç ürüne gerçekten ihtiyacınız varsa.",
        "\"İkinci ürüne %50\" kampanyası da aynı mantıkla değerlendirilir: aynı fiyatlı iki üründe 1 + 0,5 = 1,5 ürün parası ödenir, ödenen pay 1,5 ÷ 2 = 0,75 ve indirim %25'tir. Fiyatları farklı ürünlerde indirim genellikle ucuz olana uygulandığı için gerçek oran daha da düşer. Bu dönüşümleri yaptıktan sonra kampanyalar tek bir ölçüyle, yani ödenen payla yan yana konabilir."
      ]
    },
    {
      h: "İndirim oranı nasıl hesaplanır, eski fiyat nasıl bulunur?",
      p: [
        "Etikette yalnızca eski ve yeni fiyat yazıyorsa indirim oranı, fiyat farkının eski fiyata oranıdır. Tersine, yalnızca indirimli fiyatı ve oranı biliyorsanız eski fiyatı bulmak için yeni fiyatı ödenen paya bölmeniz gerekir; oranı yeni fiyata eklemek yanlış sonuç verir."
      ],
      formula: "İndirim oranı = (eski fiyat − yeni fiyat) ÷ eski fiyat × 100\nÖrnek: 1.250 TL → 950 TL: 300 ÷ 1.250 = %24\nEski fiyat = yeni fiyat ÷ (1 − indirim oranı)\nÖrnek: %28 indirimle 720 TL → 720 ÷ 0,72 = 1.000 TL (720 × 1,28 = 921,60 değil)",
      after: [
        "Ticaret Bakanlığının 1 Ağustos 2026'da yürürlüğe giren düzenlemesine göre indirimli satış reklamlarında \"indirimden önceki fiyat\", indirimin başlamasından önceki belirli bir dönemde (Bakanlık duyurusuna göre son 10 gün) uygulanan en düşük fiyat olarak gösterilmelidir; çabuk bozulan ürünler ve hizmetler için istisnalar vardır. Etiketteki indirimin gerçekçi olup olmadığını kontrol etmek ve oranı hızla bulmak için [[arac:indirim-orani-hesapla|İndirim Oranı Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "KDV indirimden önce mi sonra mı uygulanır?",
      p: [
        "Ticari işlemlerde KDV, iskonto düşüldükten sonraki tutar üzerinden hesaplanır. KDV Kanunu'nun 25. maddesine göre fatura ve benzeri belgelerde gösterilmesi şartıyla ticari teamüllere uygun olarak yapılan iskontolar KDV matrahına dahil edilmez. Yani faturada önce liste fiyatı ve iskonto yazılır, KDV indirimli net tutar üzerinden eklenir.",
        "Perakendede fiyatlar genellikle KDV dahil gösterilir ve yüzde indirim KDV dahil fiyata uygulanır. Yüzde indirimlerde bu sıra sonucu değiştirmez: KDV hariç 1.000 TL'ye %20 iskonto uygulayıp %20 KDV eklemek 800 × 1,20 = 960 TL eder; KDV dahil 1.200 TL'ye %20 indirim uygulamak da 1.200 × 0,80 = 960 TL eder. Sabit tutarlı indirimlerde ise tutarın KDV dahil mi hariç mi olduğu sonucu değiştirir; faturada bunun açıkça belirtilmesi gerekir."
      ],
      note: "KDV oranları ürün ve hizmete göre farklılık gösterir; örneklerde kullanılan %20 yalnızca hesap mantığını göstermek içindir."
    },
    {
      h: "İndirim hesaplarken sık yapılan hatalar",
      ul: [
        "<strong>Oranları toplamak:</strong> %20 + %10 = %30 sanmak, son fiyatı olduğundan düşük tahmin ettirir.",
        "<strong>Eski fiyatı oran ekleyerek bulmak:</strong> %20 indirimli 800 TL'nin eski fiyatı 800 × 1,20 = 960 değil, 800 ÷ 0,80 = 1.000 TL'dir.",
        "<strong>Kuponun sırasını önemsememek:</strong> Sabit tutar önce düşülürse yüzde indirim daha küçük bir tutara uygulanır.",
        "<strong>İskonto dizisini tek oranla karşılaştırmamak:</strong> Tedarikçi teklifleri eşdeğer orana çevrilmeden kıyaslanırsa yanlış seçim yapılabilir.",
        "<strong>Yüzde ile yüzde puanı karıştırmak:</strong> İndirimin %20'den %30'a çıkması 10 yüzde puanlık, ama %50'lik bir artıştır."
      ],
      after: [
        "Yüzde hesabının temel kalıplarını tekrar etmek isterseniz [[arac:yuzde-hesapla|Yüzde Hesaplama aracı]] ve [[rehber:yuzde-hesaplama-nasil-yapilir|yüzde hesaplama rehberi]] işinize yarar."
      ]
    }
  ],
  faq: [
    ["Zincirleme indirim nasıl hesaplanır?", "Her indirim bir öncekinden kalan fiyata uygulanır. Liste fiyatı her indirimden sonra kalan payla çarpılır: 1.000 TL × 0,80 × 0,90 = 720 TL. Toplam indirim oranı 1'den kalan payların çarpımı çıkarılarak bulunur."],
    ["%20 + %10 indirim neden %30 etmez?", "İkinci indirim liste fiyatına değil, ilk indirimden sonra kalan fiyata uygulanır. 1.000 TL önce 800 TL'ye, sonra 800'ün yüzde 10'u düşülerek 720 TL'ye iner; toplam indirim 280 TL, yani yüzde 28'dir."],
    ["İskonto nedir?", "İskonto, satıcının liste fiyatı üzerinden alıcıya tanıdığı ticari indirimdir. Bayi, hacim, kampanya ya da peşin ödeme iskontosu gibi türleri vardır ve birden fazla iskonto genellikle zincirleme uygulanır."],
    ["Bayi iskontosu nasıl uygulanır?", "İskontolar sırayla, her biri bir öncekinden kalan tutara uygulanır. 10.000 TL liste fiyatına yüzde 30, 10 ve 5 iskonto uygulanınca net fiyat 5.985 TL olur; toplam iskonto yüzde 45 değil, yüzde 40,15'tir."],
    ["İndirimli fiyattan eski fiyat nasıl bulunur?", "İndirimli fiyat, ödenen paya bölünür: eski fiyat = yeni fiyat ÷ (1 − indirim oranı). Yüzde 20 indirimli 800 TL'nin eski fiyatı 800 ÷ 0,80 = 1.000 TL'dir; oranı yeni fiyata eklemek yanlış sonuç verir."],
    ["İndirim oranı nasıl hesaplanır?", "Eski ve yeni fiyat arasındaki fark eski fiyata bölünüp 100 ile çarpılır. 1.250 TL'den 950 TL'ye düşen bir ürünün indirim oranı 300 ÷ 1.250 × 100 = yüzde 24'tür."],
    ["Sepette ek indirim nasıl hesaplanır?", "Sepette ek yüzde indirim, ürünün zaten indirimli fiyatına uygulanır ve zincirleme formülle hesaplanır. Sabit tutarlı kupon da varsa sıra önemlidir; önce yüzde indirim, sonra kupon uygulanması müşteri lehinedir."],
    ["KDV indirimden önce mi sonra mı uygulanır?", "Faturada gösterilen ticari iskontolar KDV matrahına dahil edilmez; KDV, iskonto düşüldükten sonraki net tutar üzerinden hesaplanır. Yüzde indirimlerde KDV dahil ya da hariç fiyata uygulamak aynı son fiyatı verir."]
  ],
  tools: ["zincirleme-indirim-hesapla", "iskonto-hesapla", "indirim-orani-hesapla", "yuzde-hesapla"],
  related: ["kar-marji-nasil-hesaplanir", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["T.C. Ticaret Bakanlığı – İndirimli satış reklamlarına ilişkin düzenleme duyurusu", "https://ticaret.gov.tr/haberler/ticaret-bakanligindan-indirimli-satis-reklamlarinda-seffafligi-artiracak-yeni-duzenleme"],
    ["Mevzuat Bilgi Sistemi – 3065 sayılı Katma Değer Vergisi Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.3065.pdf"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır; fatura ve vergi uygulamaları için mali müşavirinize danışın"
};
