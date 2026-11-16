export default {
  slug: "yari-omur-nedir-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Yarı Ömür Nedir, Nasıl Hesaplanır? Radyoaktif Bozunma Formülü ve Örnekler",
  pageTitle: "Yarı Ömür Nedir, Nasıl Hesaplanır? Formül ve Çözümlü Örnek",
  description: "Yarı ömür, bir maddenin yarısının bozunması için geçen süredir. N = N₀ × (1/2)^(t/T) formülü, 3 yarı ömürde kalan miktar, karbon-14 tarihlemesi ve logaritmayla çözüm.",
  keywords: ["yarı ömür nedir", "yarı ömür hesaplama", "radyoaktif bozunma", "karbon 14 yarı ömrü", "yarı ömür formülü", "kalan madde miktarı", "yarı ömür logaritma", "bozunma sabiti"],
  lead: "Yarı ömür, radyoaktif bir maddenin <strong>atomlarının yarısının bozunması için geçen süredir</strong>. Her yarı ömürde kalan miktar bir öncekinin yarısına iner: 1 yarı ömür sonra %50, 2 yarı ömür sonra %25, 3 yarı ömür sonra %12,5 kalır. Kalan miktar <strong>N = N₀ × (1/2)<sup>t/T</sup></strong> formülüyle hesaplanır; burada N₀ başlangıç miktarı, t geçen süre, T yarı ömürdür. Karbon-14'ün yarı ömrü yaklaşık 5.730 yıldır ve arkeolojik kalıntıların yaşı bu sayede bulunur. Aşağıda formülü, logaritmayla süre hesabını ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Yarı ömür (T), bir örnekteki radyoaktif çekirdeklerin yarısının bozunduğu süredir ve başlangıç miktarından bağımsızdır.",
    "Kalan miktar: N = N₀ × (1/2)<sup>t/T</sup>; n yarı ömür sonra kalan oran (1/2)<sup>n</sup>'dir.",
    "3 yarı ömür sonra başlangıcın 1/8'i yani %12,5'i, 10 yarı ömür sonra yaklaşık binde biri kalır.",
    "Geçen süre: t = T × log₂(N₀ ÷ N) = T × ln(N₀ ÷ N) ÷ ln 2.",
    "Bozunma sabiti λ = ln 2 ÷ T ≈ 0,693 ÷ T; formül N = N₀ × e<sup>−λt</sup> biçiminde de yazılır.",
    "Karbon-14'ün yarı ömrü yaklaşık 5.730 yıldır; örnekte %25 karbon-14 kaldıysa yaşı yaklaşık 11.460 yıldır."
  ],
  figure: {
    alt: "Radyoaktif bozunma eğrisi: başlangıçta 80 gram olan maddenin her 6 günlük yarı ömürde yarıya inerek 40, 20, 10 ve 5 grama düşmesi; eğri üzerinde yüzde 100, 50, 25, 12,5 ve 6,25 noktaları işaretli.",
    caption: "Her yarı ömürde kalan miktar yarıya iner, ama hiçbir zaman tam sıfıra ulaşmaz. Örnekte yarı ömrü 6 gün olan 80 g'lık bir madde 18 günde 10 grama, 24 günde 5 grama düşer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">80 g madde, yarı ömür 6 gün</text>
  <line x1="80" y1="60" x2="80" y2="340" class="st" fill="none"/>
  <line x1="80" y1="340" x2="680" y2="340" class="st" fill="none"/>
  <g class="sm end">
    <text x="72" y="84">80 g</text><text x="72" y="214">40 g</text><text x="72" y="279">20 g</text><text x="72" y="344">0</text>
  </g>
  <g class="sm mid">
    <text x="80" y="362">0</text><text x="200" y="362">6</text><text x="320" y="362">12</text>
    <text x="440" y="362">18</text><text x="560" y="362">24</text><text x="680" y="362">30 gün</text>
  </g>
  <line x1="200" y1="210" x2="200" y2="340" class="sb dash" fill="none"/>
  <line x1="320" y1="275" x2="320" y2="340" class="sb dash" fill="none"/>
  <line x1="440" y1="307" x2="440" y2="340" class="sb dash" fill="none"/>
  <line x1="80" y1="210" x2="200" y2="210" class="sb dash" fill="none"/>
  <path d="M80 80 C130 145,160 190,200 210 S280 262,320 275 S400 300,440 307 S520 320,560 324 S640 330,680 332" class="sp sw" fill="none"/>
  <g>
    <circle cx="80" cy="80" r="7" class="p"/><text x="94" y="76" class="sm b">%100 · 80 g</text>
    <circle cx="200" cy="210" r="7" class="p"/><text x="214" y="200" class="sm b">%50 · 40 g</text>
    <circle cx="320" cy="275" r="7" class="p"/><text x="334" y="262" class="sm b">%25 · 20 g</text>
    <circle cx="440" cy="307" r="7" class="ok"/><text x="454" y="294" class="sm b ok">%12,5 · 10 g</text>
    <circle cx="560" cy="324" r="6" class="p"/><text x="574" y="314" class="sm b">%6,25 · 5 g</text>
  </g>
  <rect x="80" y="380" width="600" height="32" rx="8" class="ps"/>
  <text x="380" y="401" class="sm mid b">N = N₀ × (1/2)^(t/T) → 80 × (1/2)^(18/6) = 80 × 1/8 = 10 g</text>
</svg>`
  },
  sections: [
    {
      h: "Yarı ömür nedir?",
      p: [
        "Bazı atom çekirdekleri kararsızdır ve kendiliğinden ışıma yaparak başka çekirdeklere dönüşür. Bu olaya <strong>radyoaktif bozunma</strong> denir. Tek bir çekirdeğin ne zaman bozunacağı önceden bilinemez; ama çok sayıda çekirdekten oluşan bir örnekte, belirli bir sürede çekirdeklerin ne kadarının bozunacağı istatistiksel olarak çok kesin biçimde belirlidir.",
        "<strong>Yarı ömür</strong>, bir örnekteki radyoaktif çekirdeklerin yarısının bozunması için geçen süredir. Her radyoaktif çekirdek türünün (izotopun) kendine özgü bir yarı ömrü vardır ve bu süre sıcaklık, basınç ya da kimyasal bağ gibi dış koşullardan pratikte etkilenmez. Yarı ömürler saniyenin çok küçük kesirlerinden milyarlarca yıla kadar uzanır.",
        "Yarı ömrün en önemli özelliği <strong>başlangıç miktarından bağımsız</strong> olmasıdır. 100 gramın 50 grama inmesi ne kadar sürüyorsa 50 gramın 25 grama inmesi de o kadar sürer. Bu yüzden bozunma doğrusal değil üsteldir: miktar her eşit sürede aynı <em>oranda</em> azalır, aynı <em>miktarda</em> değil.",
        "Bozunma sırasında çekirdek alfa parçacığı (iki proton ve iki nötrondan oluşan helyum çekirdeği), beta parçacığı (elektron ya da pozitron) ya da gama ışını yayabilir. Hangi ışımanın yayıldığı yarı ömür hesabını değiştirmez; formül yalnızca henüz bozunmamış çekirdek sayısıyla ilgilenir. Ancak bozunma ürünü de radyoaktifse, yani bir bozunma zinciri varsa, toplam etkinlik hesabı daha karmaşık hâle gelir ve her halka ayrı ayrı değerlendirilir."
      ]
    },
    {
      h: "Yarı ömür formülü",
      p: [
        "Kalan miktarı hesaplamak için geçen sürenin kaç yarı ömre karşılık geldiğini bulup 1/2'nin o kuvvetini alırsınız. Aynı ilişki bozunma sabiti λ (lambda) ve doğal üstel fonksiyonla da yazılabilir; iki biçim aynı sonucu verir."
      ],
      formula: "N = N₀ × (1/2)^(t / T)\nN = N₀ × e^(−λt), λ = ln 2 ÷ T ≈ 0,693 ÷ T\nGeçen süre: t = T × log₂(N₀ ÷ N) = T × ln(N₀ ÷ N) ÷ ln 2\nYarı ömür: T = t × ln 2 ÷ ln(N₀ ÷ N)",
      after: [
        "Formüldeki N ve N₀ kütle (gram), atom sayısı ya da etkinlik (aktivite) olabilir; yeter ki ikisi aynı birimde olsun. t ile T de aynı zaman biriminde olmalıdır: yarı ömür yıl cinsindense süreyi de yıl olarak yazın. Bu dört büyüklükten herhangi üçünü bildiğinizde dördüncüsünü [[arac:yari-omur-hesapla|yarı ömür hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "3 yarı ömür sonra ne kadar madde kalır?",
      p: [
        "Yarı ömür sayısı tam sayı olduğunda hesap kafadan yapılabilir: her yarı ömürde kalan miktarı ikiye bölersiniz. Aşağıdaki tablo kalan ve bozunan oranları gösterir."
      ],
      table: {
        head: ["Geçen yarı ömür", "Kalan oran", "Kalan yüzde", "Bozunan yüzde", "80 g'dan kalan"],
        rows: [
          ["0", "1", "%100", "%0", "80 g"],
          ["1", "1/2", "%50", "%50", "40 g"],
          ["2", "1/4", "%25", "%75", "20 g"],
          ["3", "1/8", "%12,5", "%87,5", "10 g"],
          ["4", "1/16", "%6,25", "%93,75", "5 g"],
          ["5", "1/32", "%3,125", "%96,875", "2,5 g"],
          ["7", "1/128", "≈ %0,78", "≈ %99,2", "≈ 0,63 g"],
          ["10", "1/1.024", "≈ %0,098", "≈ %99,9", "≈ 0,078 g"]
        ],
        caption: "10 yarı ömür sonra başlangıç miktarının yaklaşık binde biri kalır; bu yüzden pratikte 7–10 yarı ömür \"neredeyse tamamen bozunmuş\" kabul edilir."
      },
      after: [
        "Sorularda sık geçen bir tuzak, \"bozunan\" ile \"kalan\" miktarın karıştırılmasıdır. 3 yarı ömür sonra kalan %12,5'tir; bozunan ise %87,5'tir. Yüzde hesaplarının genel mantığı için [[arac:yuzde-degisim-hesapla|yüzde değişim hesaplama]] aracı yardımcı olur."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Kalan miktar:</strong> Yarı ömrü 6 gün olan 80 g'lık bir maddenin 18 gün sonra ne kadarı kalır? t/T = 18 ÷ 6 = 3. N = 80 × (1/2)³ = 80 ÷ 8 = 10 g.",
        "<strong>Kesirli yarı ömür:</strong> Aynı madde 9 gün sonra? t/T = 1,5. N = 80 × 0,5<sup>1,5</sup> = 80 × 0,3536 ≈ 28,3 g. Sonuç 40 g ile 20 g'ın tam ortası (30 g) değildir; bozunma üstel olduğu için biraz daha azdır.",
        "<strong>Yarı ömrü bulma:</strong> 64 mg'lık bir örnek 20 dakikada 4 mg'a iniyor. Oran 64 ÷ 4 = 16 = 2⁴, yani 4 yarı ömür geçmiş. T = 20 ÷ 4 = 5 dakika.",
        "<strong>Başlangıç miktarını bulma:</strong> Yarı ömrü 8 gün olan bir maddeden 24 gün sonra 15 g kalmış. 24 ÷ 8 = 3 yarı ömür; N₀ = 15 × 2³ = 120 g.",
        "<strong>Bozunma sabiti:</strong> Yarı ömrü 5 dakika olan çekirdek için λ = 0,693 ÷ 5 ≈ 0,139 dakika⁻¹; her dakika çekirdeklerin yaklaşık %13'ü bozunur."
      ]
    },
    {
      h: "Yarı ömür logaritma ile nasıl çözülür?",
      p: [
        "Geçen süre tam sayı yarı ömre denk gelmiyorsa ya da kalan oran 2'nin kuvveti değilse logaritma kullanmak gerekir. Formülün iki tarafının logaritmasını aldığınızda üs aşağı iner ve t yalnız bırakılabilir. Hesap makinesinde log₂ tuşu yoksa ln ya da log₁₀ ile aynı sonucu bulabilirsiniz: log₂ x = ln x ÷ ln 2 = log x ÷ log 2."
      ],
      ol: [
        "Soru: Yarı ömrü 12 yıl olan bir maddenin %70'inin bozunması ne kadar sürer?",
        "Kalan oran %30'dur: N ÷ N₀ = 0,30, yani N₀ ÷ N = 1 ÷ 0,30 ≈ 3,333.",
        "Logaritmayı alın: ln 3,333 ≈ 1,204; ln 2 ≈ 0,693.",
        "Yarı ömür sayısı: 1,204 ÷ 0,693 ≈ 1,737.",
        "Süre: t = 12 × 1,737 ≈ 20,8 yıl."
      ],
      after: [
        "Logaritma kurallarının ayrıntısı [[bilgi:logaritma-nasil-hesaplanir|logaritma nasıl hesaplanır]] yazısında; üs ve logaritmayı farklı tabanlarda hesaplamak için ise [[arac:us-logaritma-hesapla|üs ve logaritma hesaplama]] aracı kullanılabilir. Aynı üstel mantık para dünyasında bileşik faizde ters yönde, büyüme olarak çalışır; bunun sezgisel bir kısayolu [[bilgi:72-kurali-nedir|72 kuralı]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Karbon-14 yarı ömrü ve karbon tarihlemesi",
      p: [
        "Atmosferde kozmik ışınların etkisiyle sürekli olarak az miktarda radyoaktif karbon-14 oluşur ve karbondioksitle birlikte bitkilere, oradan da hayvanlara ve insanlara geçer. Canlı bir organizmada karbon-14'ün kararlı karbona oranı atmosferdekiyle yaklaşık aynı kalır. Organizma öldüğünde yeni karbon alımı durur ve içindeki karbon-14 yaklaşık <strong>5.730 yıllık</strong> yarı ömürle azalmaya başlar.",
        "Bir arkeolojik örnekteki karbon-14 oranı ölçülüp canlılardaki oranla karşılaştırılarak örneğin kaç yıl önce öldüğü hesaplanır. Örneğin bir odun parçasında oran canlıdakinin %25'i ise 2 yarı ömür geçmiştir: yaş ≈ 2 × 5.730 = 11.460 yıl. Oran %60 ise t = 5.730 × log₂(1 ÷ 0,60) ≈ 5.730 × 0,737 ≈ 4.220 yıl bulunur.",
        "Karbon tarihlemesi yaklaşık 50.000 yıla kadar olan organik örneklerde güvenilir sonuç verir; daha eski örneklerde kalan karbon-14 ölçülemeyecek kadar azdır. Atmosferdeki karbon-14 oranı tarih boyunca biraz değiştiği için laboratuvarlar ham sonucu ağaç halkaları gibi bağımsız verilerle kalibre eder. Kayaçlar ve çok eski oluşumlar için ise uranyum ya da potasyum gibi çok uzun yarı ömürlü izotoplar kullanılır."
      ],
      table: {
        head: ["İzotop", "Yaklaşık yarı ömür", "Kullanıldığı alan"],
        rows: [
          ["İyot-131", "≈ 8 gün", "Tıpta tanı ve tedavi"],
          ["Kobalt-60", "≈ 5,27 yıl", "Sterilizasyon, endüstriyel ışınlama"],
          ["Sezyum-137", "≈ 30 yıl", "Ölçüm cihazları, çevresel izleme"],
          ["Radyum-226", "≈ 1.600 yıl", "Tarihsel olarak ışınlama"],
          ["Karbon-14", "≈ 5.730 yıl", "Organik kalıntıların yaşı"],
          ["Uranyum-238", "≈ 4,47 milyar yıl", "Kayaç ve Dünya'nın yaşı"]
        ]
      }
    },
    {
      h: "İlaçlarda yarı ömür ne anlama gelir?",
      p: [
        "Farmakolojide \"yarı ömür\" terimi radyoaktiviteden farklı bir anlamda kullanılır: bir ilacın kandaki derişiminin yarıya inmesi için geçen süreyi anlatır. Vücut ilacı karaciğerde işleyip böbreklerle atarken derişim çoğu ilaçta yaklaşık üstel biçimde azalır; bu yüzden aynı formül yaklaşık olarak uygulanabilir. Genel kabul, yaklaşık 4–5 yarı ömür sonra ilacın büyük kısmının (%94–97) vücuttan atılmış olacağıdır.",
        "İlaç yarı ömrü kişinin yaşına, karaciğer ve böbrek işlevlerine, kullandığı diğer ilaçlara göre önemli ölçüde değişir. Bu yüzden doz aralığı ve kullanım süresi hakkındaki kararlar yalnızca hekim ve eczacı tarafından verilmelidir; prospektüsteki değerler genel bir bilgidir ve kendi kendinize doz ayarlaması yapmak için kullanılmamalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Bozunmayı doğrusal sanmak:</strong> \"2 yarı ömürde hepsi biter\" düşüncesi yanlıştır; 2 yarı ömürde %25 kalır.",
        "<strong>Birimleri karıştırmak:</strong> Yarı ömür gün, süre saat cinsindeyse önce birimleri eşitleyin.",
        "<strong>Kalan ile bozunanı karıştırmak:</strong> Soru \"ne kadarı bozunur\" diyorsa sonucu 100'den çıkarın.",
        "<strong>Kesirli yarı ömürde ortalama almak:</strong> 1,5 yarı ömürde kalan miktar %50 ile %25'in ortası olan %37,5 değil, yaklaşık %35,4'tür.",
        "<strong>Yarı ömrün başlangıç miktarına bağlı olduğunu sanmak:</strong> Miktar ne olursa olsun yarılanma süresi aynıdır.",
        "<strong>Karbon tarihlemesini her şeye uygulamak:</strong> Yöntem yalnızca bir zamanlar canlı olan organik maddeler ve yaklaşık 50.000 yıla kadar geçerlidir."
      ]
    }
  ],
  faq: [
    ["Yarı ömür nedir?", "Yarı ömür, radyoaktif bir örnekteki çekirdeklerin yarısının bozunması için geçen süredir. Her izotopun kendine özgü bir yarı ömrü vardır ve bu süre başlangıç miktarından, sıcaklık ve basınç gibi dış koşullardan pratikte etkilenmez."],
    ["Yarı ömür formülü nedir?", "Kalan miktar N = N₀ × (1/2)^(t/T) formülüyle bulunur; N₀ başlangıç miktarı, t geçen süre, T yarı ömürdür. Aynı ilişki bozunma sabitiyle N = N₀ × e^(−λt) olarak da yazılır ve λ, 0,693'ün yarı ömre bölünmesiyle hesaplanır."],
    ["3 yarı ömür sonra ne kadar madde kalır?", "3 yarı ömür sonra başlangıç miktarının 1/8'i yani yüzde 12,5'i kalır, yüzde 87,5'i bozunmuş olur. Örneğin 80 gramlık bir maddeden 3 yarı ömür sonra 10 gram kalır; her yarı ömürde kalan miktar bir öncekinin yarısıdır."],
    ["Karbon-14'ün yarı ömrü kaç yıldır?", "Karbon-14'ün yarı ömrü yaklaşık 5.730 yıldır. Bu süre, organik kalıntıların yaşını belirlemekte kullanılan karbon tarihlemesinin temelidir ve yöntem yaklaşık 50.000 yıla kadar olan örneklerde güvenilir sonuç verir."],
    ["Karbon tarihlemesi nasıl yapılır?", "Örnekteki karbon-14 oranı ölçülür ve canlı organizmalardaki oranla karşılaştırılır. Kalan oran yarı ömür formülüne konarak geçen süre bulunur; örneğin oran yüzde 25 ise 2 yarı ömür yani yaklaşık 11.460 yıl geçmiştir. Sonuçlar kalibrasyonla düzeltilir."],
    ["Yarı ömür logaritma ile nasıl çözülür?", "Geçen süre t = T × ln(N₀ ÷ N) ÷ ln 2 formülüyle bulunur. Örneğin yarı ömrü 12 yıl olan bir maddenin yüzde 30'u kaldıysa ln(1 ÷ 0,30) ≈ 1,204 değeri 0,693'e bölünür ve 12 ile çarpılır; sonuç yaklaşık 20,8 yıldır."],
    ["İlaçlarda yarı ömür ne anlama gelir?", "İlaçlarda yarı ömür, ilacın kandaki derişiminin yarıya inmesi için geçen süredir. Genel kabule göre 4–5 yarı ömür sonra ilacın büyük kısmı vücuttan atılır; ancak bu süre kişiden kişiye değişir ve doz kararları yalnızca hekim tarafından verilmelidir."],
    ["Yüzde kalan miktar nasıl bulunur?", "Geçen süreyi yarı ömre bölüp yarı ömür sayısını bulun, ardından 0,5'in bu sayıya göre kuvvetini alıp 100 ile çarpın. Örneğin 1,5 yarı ömür için 0,5 üzeri 1,5 yaklaşık 0,354 eder, yani yaklaşık yüzde 35,4 kalır."],
    ["Radyoaktif madde hiç tamamen biter mi?", "Kuramsal olarak kalan miktar her yarı ömürde yarıya iner ve hiçbir zaman tam sıfır olmaz. Pratikte ise atom sayısı sonlu olduğu için yeterince uzun sürede örnek tümüyle bozunur; 10 yarı ömür sonra başlangıcın yaklaşık binde biri kalır."]
  ],
  tools: ["yari-omur-hesapla", "us-logaritma-hesapla", "yuzde-degisim-hesapla"],
  related: ["logaritma-nasil-hesaplanir", "72-kurali-nedir", "bilesik-faiz-nedir", "mol-nedir-nasil-hesaplanir"],
  sources: [
    ["Uluslararası Atom Enerjisi Ajansı (IAEA) – Nükleer veri", "https://www.iaea.org/"],
    ["Türkiye Enerji, Nükleer ve Maden Araştırma Kurumu (TENMAK)", "https://www.tenmak.gov.tr/"]
  ]
};
