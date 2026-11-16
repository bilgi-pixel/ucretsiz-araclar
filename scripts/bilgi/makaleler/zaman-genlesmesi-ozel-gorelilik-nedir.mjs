export default {
  slug: "zaman-genlesmesi-ozel-gorelilik-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Zaman Genleşmesi Nedir? Özel Görelilik, Lorentz Çarpanı ve İkizler",
  pageTitle: "Zaman Genleşmesi Nedir? Lorentz Çarpanı ve Örnekler",
  description: "Zaman genleşmesi, hareket eden saatin durgun gözlemciye göre yavaş işlemesidir: Δt = γ·Δt₀. Işık hızının %90'ında γ ≈ 2,29; ikizler paradoksu, müonlar ve GPS.",
  keywords: ["zaman genleşmesi", "özel görelilik", "lorentz çarpanı", "ikizler paradoksu", "ışık hızında zaman", "gps görelilik", "zaman yavaşlar mı", "müon deneyi"],
  lead: "Zaman genleşmesi, Einstein'ın özel görelilik kuramına göre <strong>hareket eden bir saatin, durgun bir gözlemciye göre daha yavaş işlemesidir</strong>. Yavaşlama miktarı Lorentz çarpanıyla verilir: γ = 1 / √(1 − v²/c²) ve Δt = γ · Δt₀. Işık hızının %90'ında giden bir gemide geçen 1 yıl, Dünya'daki gözlemciye göre yaklaşık 2,29 yıldır. Etki günlük hızlarda ölçülemeyecek kadar küçüktür ama müon parçacıklarında, hızlandırıcılarda ve GPS uydularında her gün doğrulanır. Bu sayfada formülü, çözümlü örnekleri, ikizler paradoksunu, kütleçekimsel zaman genleşmesini ve GPS düzeltmesini bulacaksınız.",
  kisaCevap: [
    "Lorentz çarpanı: γ = 1 / √(1 − v²/c²); v hız, c ışık hızıdır (299.792.458 m/s).",
    "Durgun gözlemcinin ölçtüğü süre: Δt = γ · Δt₀; Δt₀ hareket eden saatin kendi ölçtüğü (öz) süredir.",
    "v = 0,5c'de γ ≈ 1,155; v = 0,9c'de γ ≈ 2,294; v = 0,99c'de γ ≈ 7,09.",
    "İkizler paradoksunda 0,8c ile gidip dönen ikiz, Dünya'da geçen 10 yıla karşılık 6 yıl yaşlanır.",
    "Kütleçekimi de zamanı yavaşlatır: yere yakın saatler, yüksekteki saatlere göre daha yavaş işler.",
    "GPS uydularının saatleri iki etkinin toplamıyla günde yaklaşık 38 mikrosaniye hızlı işler ve bu fark düzeltilir."
  ],
  figure: {
    alt: "Lorentz çarpanının hıza göre değişimi: ışık hızının yüzde 10'unda 1,005, yüzde 50'sinde 1,155, yüzde 80'inde 1,667, yüzde 90'ında 2,294, yüzde 99'unda 7,09. Eğri ışık hızına yaklaştıkça dikleşiyor.",
    caption: "Lorentz çarpanı düşük hızlarda neredeyse 1'dir; ışık hızının yarısında bile yalnızca %15,5 artar. Işık hızına yaklaştıkça hızla büyür ve v = c'de sonsuza gider; bu yüzden kütleli bir cisim ışık hızına ulaşamaz.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Lorentz çarpanı γ ve hız</text>
  <line x1="80" y1="350" x2="680" y2="350" class="st" fill="none"/>
  <line x1="80" y1="350" x2="80" y2="60" class="st" fill="none"/>
  <g class="sm mid t2">
    <text x="80" y="372">0</text><text x="200" y="372">0,2c</text><text x="320" y="372">0,4c</text><text x="440" y="372">0,6c</text><text x="560" y="372">0,8c</text><text x="680" y="372">c</text>
  </g>
  <g class="sm end t2">
    <text x="72" y="354">1</text><text x="72" y="313">2</text><text x="72" y="272">3</text><text x="72" y="190">5</text><text x="72" y="108">7</text>
  </g>
  <line x1="80" y1="309" x2="680" y2="309" class="sb dash" fill="none"/>
  <line x1="80" y1="186" x2="680" y2="186" class="sb dash" fill="none"/>
  <line x1="80" y1="104" x2="680" y2="104" class="sb dash" fill="none"/>
  <polyline points="80,350 140,350 200,349 260,348 320,346 380,344 440,340 500,334 560,323 590,313 620,297 638,279 656,245 668,185 674,100" class="sp sw" fill="none"/>
  <line x1="680" y1="60" x2="680" y2="350" class="sdg dash" fill="none"/>
  <text x="676" y="54" class="sm end dg b">v = c: γ → ∞</text>
  <circle cx="380" cy="344" r="6" class="p"/><text x="380" y="330" class="sm mid b">0,5c: 1,155</text>
  <circle cx="560" cy="323" r="6" class="p"/><text x="548" y="308" class="sm end b">0,8c: 1,667</text>
  <circle cx="620" cy="298" r="6" class="p"/><text x="608" y="282" class="sm end b">0,9c: 2,294</text>
  <circle cx="674" cy="100" r="6" class="dg"/><text x="662" y="96" class="sm end b dg">0,99c: 7,09</text>
  <rect x="110" y="70" width="300" height="80" rx="8" class="sf sb"/>
  <text x="126" y="96" class="b">γ = 1 / √(1 − v²/c²)</text>
  <text x="126" y="120" class="sm">Δt = γ · Δt₀</text>
  <text x="126" y="140" class="sm t2">0,9c'de gemideki 1 yıl = Dünya'da 2,29 yıl</text>
  <text x="360" y="400" class="sm mid mu">Yatay eksen: hız (ışık hızının kesri) · Düşey eksen: γ</text>
</svg>`
  },
  sections: [
    {
      h: "Zaman genleşmesi nedir?",
      p: [
        "Gündelik deneyimimizde zaman herkes için aynı hızda akar gibi görünür: iki saati eşitleyip birini uçağa, diğerini masaya koyarsanız akşam ikisi de aynı saati gösterir. Albert Einstein'ın 1905'te yayımladığı <strong>özel görelilik kuramı</strong>, bunun yalnızca düşük hızlarda geçerli bir yaklaşım olduğunu gösterdi.",
        "Kuram iki temel ilkeye dayanır: fizik yasaları sabit hızla hareket eden tüm gözlemciler için aynıdır ve ışığın boşluktaki hızı, kaynağın ya da gözlemcinin hızından bağımsız olarak herkes için aynıdır (c ≈ 299.792 km/s). Bu ikinci ilkeyi korumanın tek yolu, zaman ve uzay ölçümlerinin gözlemciden gözlemciye değişmesidir.",
        "Sonuç <strong>zaman genleşmesi</strong>dir: size göre hareket eden bir saatin tıkırtıları, sizin saatinizin tıkırtılarından daha seyrek gelir. Bu bir saat arızası ya da algı yanılgısı değildir; hareket eden sistemdeki tüm süreçler, kalp atışından atom titreşimine kadar, durgun gözlemciye göre aynı oranda yavaşlar."
      ]
    },
    {
      h: "Lorentz çarpanı nasıl hesaplanır?",
      formula: "γ = 1 / √(1 − v² / c²)\nΔt = γ · Δt₀\nΔt₀: hareket eden saatin kendi ölçtüğü süre (öz zaman)\nΔt: aynı olayın durgun gözlemcinin saatiyle süresi",
      p: [
        "Hesap için hızı ışık hızının kesri olarak yazmak işi kolaylaştırır: β = v / c. Böylece γ = 1 / √(1 − β²) olur. Örneğin v = 0,6c için β² = 0,36, 1 − 0,36 = 0,64, √0,64 = 0,8 ve γ = 1 / 0,8 = 1,25 bulunur.",
        "γ her zaman 1'e eşit ya da 1'den büyüktür. Hız sıfırken γ = 1'dir, yani zaman genleşmesi yoktur. Hız ışık hızına yaklaştıkça payda sıfıra yaklaşır ve γ sınırsız büyür. Bu, kütlesi olan bir cismin ışık hızına neden ulaşamayacağının da matematiksel ifadesidir."
      ],
      table: {
        head: ["Hız (v/c)", "β²", "√(1 − β²)", "γ", "Hareketli saatte 1 yıl = durgun saatte"],
        rows: [
          ["0,1", "0,01", "0,9950", "1,005", "1,005 yıl"],
          ["0,5", "0,25", "0,8660", "1,155", "1,155 yıl"],
          ["0,6", "0,36", "0,8000", "1,250", "1,25 yıl"],
          ["0,8", "0,64", "0,6000", "1,667", "1,667 yıl"],
          ["0,9", "0,81", "0,4359", "2,294", "2,294 yıl"],
          ["0,99", "0,9801", "0,1411", "7,089", "7,09 yıl"],
          ["0,999", "0,998", "0,0447", "22,37", "22,37 yıl"]
        ],
        caption: "Değerler γ = 1/√(1 − β²) ile hesaplanmış ve yuvarlanmıştır."
      }
    },
    {
      h: "Işık hızının yüzde 90'ında zaman ne kadar yavaşlar?",
      ol: [
        "Hız oranı: β = 0,9, β² = 0,81.",
        "1 − β² = 0,19; √0,19 ≈ 0,4359.",
        "γ = 1 / 0,4359 ≈ 2,294.",
        "Gemideki yolcunun saatine göre 1 yıl geçerse, Dünya'daki gözlemciye göre 1 × 2,294 ≈ 2,29 yıl geçmiş olur.",
        "Tersinden: Dünya'da 10 yıl geçtiğinde gemideki saat 10 ÷ 2,294 ≈ 4,36 yıl ilerlemiştir."
      ],
      after: [
        "Yani ışık hızının %90'ında hareket eden bir saat, Dünya'dakine göre yaklaşık yarıdan biraz daha az hızda işler. [[arac:zaman-genlesmesi-hesapla|Zaman Genleşmesi Hesaplama aracıyla]] hızı c oranı, yüzde, km/s ya da m/s olarak girip Lorentz çarpanını ve süre farkını bulabilirsiniz. Işık hızının kendisi ve astronomik uzaklıklar için [[bilgi:isik-yili-nedir-kac-km|ışık yılı nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "İkizler paradoksu nedir?",
      p: [
        "İkizlerden biri Dünya'da kalır, diğeri ışık hızının %80'iyle uzak bir yıldıza gidip geri döner. Dünya'daki ikize göre yolculuk toplam 10 yıl sürer. Yolcu ikizin saati ise γ = 1,667 kadar yavaş işlediği için yalnızca 10 ÷ 1,667 = 6 yıl ilerler. Dönüşte yolcu ikiz kardeşinden 4 yaş daha gençtir.",
        "\"Paradoks\" sorusu şudur: görelilikte hareket görelidir; yolcu ikizin gözünden bakıldığında Dünya ondan uzaklaşıyor gibi görünür, o hâlde Dünya'daki ikizin daha genç kalması gerekmez mi? Cevap, iki ikizin durumunun simetrik olmamasındadır. Dünya'daki ikiz yolculuk boyunca tek bir eylemsiz sistemde kalır; yolcu ikiz ise dönüş için yavaşlar, yön değiştirir ve yeniden hızlanır, yani sistem değiştirir. Bu asimetri hesaba katıldığında her iki bakış açısı da yolcunun daha genç döneceği sonucuna ulaşır.",
        "Bu bir düşünce deneyidir; bugünkü teknolojiyle insanları bu hızlara çıkarmak mümkün değildir. Ancak aynı ilke, aşağıda anlatıldığı gibi parçacıklarda ve uçaklardaki atom saatlerinde doğrudan ölçülmüştür."
      ]
    },
    {
      h: "Müonlar zaman genleşmesini nasıl kanıtlar?",
      p: [
        "Müonlar, kozmik ışınların atmosferin üst katmanlarına (yaklaşık 10–15 km yükseklikte) çarpmasıyla oluşan, elektrona benzeyen ama çok daha ağır ve kararsız parçacıklardır. Durgun hâldeki bir müonun ortalama ömrü yaklaşık 2,2 mikrosaniyedir."
      ],
      ol: [
        "Görelilik olmasaydı: müon ışık hızının %99,8'iyle gitse bile 2,2 µs'de yaklaşık 0,998 × 299.792.458 × 2,2 × 10⁻⁶ ≈ 658 m yol alabilirdi. Çoğu müon yere ulaşmadan bozunurdu.",
        "Görelilikle: v = 0,998c için γ ≈ 15,82'dir. Yerdeki gözlemciye göre müonun ömrü 2,2 × 15,82 ≈ 34,8 µs'ye uzar.",
        "Bu sürede alınan yol yaklaşık 10,4 km olur; bu da müonların büyük kısmının deniz seviyesine ulaşabilmesini açıklar.",
        "Gerçekten de yeryüzünde ölçülen müon sayısı, zaman genleşmesi hesaba katılarak yapılan tahminle uyumludur."
      ],
      after: [
        "Aynı olay müonun gözünden bakıldığında farklı ama tutarlı biçimde açıklanır: müona göre kendi ömrü 2,2 µs'dir, ancak atmosfer kalınlığı uzunluk kısalması nedeniyle γ kadar kısalmış görünür. İki açıklama aynı sonucu verir; görelilik kuramının iç tutarlılığı da budur."
      ]
    },
    {
      h: "Kütleçekimsel zaman genleşmesi farklı mıdır?",
      p: [
        "Evet. Özel görelilik hızdan kaynaklanan zaman genleşmesini açıklar. Einstein'ın 1915'te tamamladığı <strong>genel görelilik</strong> ise kütleçekiminin de zamanı etkilediğini gösterir: güçlü kütleçekim alanındaki saatler, zayıf alandaki saatlere göre daha yavaş işler. Bu yüzden deniz seviyesindeki bir saat, dağ başındaki bir saatten çok az daha yavaş ilerler.",
        "Bu etki günümüzün hassas atom saatleriyle laboratuvar ölçeğinde bile ölçülebilmektedir; birkaç on santimetrelik yükseklik farkı ölçülebilir bir fark yaratır. Kara deliklerin yakınında ise etki çok büyür. Uçaklarla taşınan atom saatleriyle yapılan deneylerde hem hızın hem de yüksekliğin etkisi birlikte ölçülmüş ve kuramla uyumlu bulunmuştur."
      ],
      table: {
        head: ["Etki", "Kaynağı", "Saati nasıl etkiler?"],
        rows: [
          ["Özel görelilik (hız)", "Göreli hareket", "Hareket eden saat yavaşlar"],
          ["Genel görelilik (kütleçekim)", "Kütleçekim alanının şiddeti", "Kütleçekime yakın saat yavaşlar, uzaktaki hızlanır"]
        ]
      }
    },
    {
      h: "GPS uyduları neden görelilik düzeltmesi yapar?",
      p: [
        "Küresel konum belirleme sistemi, uydulardaki atom saatlerinin gönderdiği zaman sinyallerinin alıcıya ulaşma süresini ölçerek çalışır. Sinyal ışık hızıyla ilerlediği için 1 mikrosaniyelik saat hatası yaklaşık 300 metrelik konum hatası demektir. Bu yüzden saatlerin göreli etkilere göre düzeltilmesi zorunludur."
      ],
      table: {
        head: ["Etki", "Uydudaki saate etkisi (günlük, yaklaşık)"],
        rows: [
          ["Özel görelilik (uydunun yaklaşık 3,9 km/s hızı)", "−7 µs (yavaşlar)"],
          ["Genel görelilik (yüksekte daha zayıf kütleçekim)", "+45 µs (hızlanır)"],
          ["Net etki", "≈ +38 µs (hızlı işler)"]
        ],
        caption: "Değerler yaklaşık değerlerdir; uydu saatlerinin frekansı fırlatılmadan önce bu farkı karşılayacak şekilde ayarlanır."
      },
      after: [
        "Düzeltme yapılmasaydı günde yaklaşık 38 µs'lik fark, 38 × 10⁻⁶ × 299.792.458 ≈ 11.400 metre, yani günde 10 kilometreyi aşan bir konum kayması birikimine yol açardı. Telefonunuzdaki konumun birkaç metre doğrulukla çalışması, görelilik kuramının her gün uygulamada doğrulandığı anlamına gelir."
      ]
    },
    {
      h: "Günlük hızlarda zaman genleşmesi fark edilir mi?",
      p: [
        "Hayır, insan algısıyla fark edilemez. Düşük hızlarda γ − 1 ≈ v² / (2c²) yaklaşımı kullanılabilir. Saatte 900 km (250 m/s) hızla uçan bir yolcu uçağı için γ − 1 ≈ 250² / (2 × 299.792.458²) ≈ 3,5 × 10⁻¹³'tür. 10 saatlik (36.000 s) bir uçuşta bu, yaklaşık 36.000 × 3,5 × 10⁻¹³ ≈ 12,5 nanosaniye eder.",
        "Bu fark bir saniyenin milyarda 12,5'i kadardır; ancak atom saatleri bunu ölçebilecek hassasiyettedir. Gerçek uçuşlarda yüksekliğin getirdiği kütleçekimsel etki de hesaba girer ve bazı rotalarda bu etki hız etkisinden büyük olabilir."
      ]
    },
    {
      h: "Zaman genleşmesi ile ilgili sık yapılan hatalar",
      ul: [
        "<strong>Yolcunun zamanı \"yavaş hisseder\" sanmak:</strong> Yolcu kendi saatini normal görür; yavaşlık yalnızca başka bir gözlemciyle karşılaştırıldığında ortaya çıkar.",
        "<strong>γ'yı yanlış yöne uygulamak:</strong> Δt = γ · Δt₀; durgun gözlemcinin ölçtüğü süre her zaman öz zamandan uzundur.",
        "<strong>Hızın karesini unutmak:</strong> Formülde v/c değil v²/c² vardır; 0,9c için 0,9 değil 0,81 kullanılır.",
        "<strong>Işık hızını aşmayı mümkün sanmak:</strong> Kütleli cisim için v = c'de γ sonsuz olur; bu, gereken enerjinin de sınırsız olduğu anlamına gelir. Kütle-enerji ilişkisi [[bilgi:e-mc2-nedir-kutle-enerji|E = mc² yazısında]] anlatılmıştır ve [[arac:kutle-enerji-hesapla|Kütle Enerji Hesaplama aracıyla]] hesaplanabilir.",
        "<strong>Paradoksu çelişki sanmak:</strong> İkizler paradoksu kuramdaki bir çelişki değil, iki ikizin hareketindeki asimetrinin sonucudur."
      ]
    }
  ],
  faq: [
    ["Zaman genleşmesi nedir?", "Zaman genleşmesi, özel görelilik kuramına göre hareket eden bir saatin, durgun bir gözlemciye göre daha yavaş işlemesidir. Etki hız arttıkça büyür ve Lorentz çarpanıyla hesaplanır; günlük hızlarda çok küçüktür ama atom saatleriyle ölçülebilir."],
    ["Lorentz çarpanı nasıl hesaplanır?", "Lorentz çarpanı γ = 1 / √(1 − v²/c²) formülüyle bulunur. Hızı ışık hızına bölüp karesini alın, 1'den çıkarın, karekökünü alın ve 1'i bu sayıya bölün; örneğin 0,6c için sonuç 1,25 olur."],
    ["Işık hızının yüzde 90'ında zaman ne kadar yavaşlar?", "Işık hızının yüzde 90'ında Lorentz çarpanı yaklaşık 2,294'tür. Hareket eden gemideki saatte geçen 1 yıl, Dünya'daki gözlemciye göre yaklaşık 2,29 yıla karşılık gelir; Dünya'da geçen 10 yıl gemide yaklaşık 4,36 yıldır."],
    ["İkizler paradoksu nedir?", "İkizlerden biri ışık hızına yakın hızla yolculuk edip geri döndüğünde, Dünya'da kalan kardeşinden daha genç olur. Örneğin 0,8c ile yapılan ve Dünya'ya göre 10 yıl süren yolculukta yolcu yalnızca 6 yıl yaşlanır; asimetri, yolcunun yön değiştirmesinden kaynaklanır."],
    ["GPS uyduları neden görelilik düzeltmesi yapar?", "Uydulardaki saatler hız nedeniyle günde yaklaşık 7 mikrosaniye yavaşlar, daha zayıf kütleçekim nedeniyle yaklaşık 45 mikrosaniye hızlanır. Net 38 mikrosaniyelik fark düzeltilmeseydi konum hatası günde 10 kilometreyi aşacak şekilde birikirdi."],
    ["Kütleçekimsel zaman genleşmesi farklı mıdır?", "Evet. Hızdan kaynaklanan etkiyi özel görelilik, kütleçekiminden kaynaklanan etkiyi genel görelilik açıklar. Güçlü kütleçekim alanındaki saatler daha yavaş işler; bu yüzden deniz seviyesindeki saat, yüksekteki bir saate göre çok az yavaş ilerler."],
    ["Müonlar zaman genleşmesini nasıl kanıtlar?", "Durgun ömrü yaklaşık 2,2 mikrosaniye olan müonlar, görelilik olmasaydı atmosferde yalnızca birkaç yüz metre yol alabilirdi. Işık hızının yüzde 99,8'inde ömürleri yerdeki gözlemciye göre yaklaşık 16 kat uzar ve bu yüzden deniz seviyesine kadar ulaşabilirler."],
    ["Günlük hızlarda zaman genleşmesi fark edilir mi?", "Hayır, insan algısıyla fark edilmez. Saatte 900 kilometreyle 10 saat uçan bir uçaktaki saat, hız etkisi nedeniyle yalnızca yaklaşık 12,5 nanosaniye geri kalır; bu fark ancak atom saatleriyle ölçülebilir."],
    ["Işık hızında zaman durur mu?", "Kütleli bir cisim için ışık hızında Lorentz çarpanı sonsuz olur; bu, böyle bir cismin ışık hızına hiçbir zaman ulaşamayacağı anlamına gelir. Bu nedenle ışık hızında giden bir gözlemcinin saatinden söz etmek özel görelilik çerçevesinde anlamlı değildir."]
  ],
  tools: ["zaman-genlesmesi-hesapla", "kutle-enerji-hesapla", "isik-yili-km-cevir"],
  related: ["e-mc2-nedir-kutle-enerji", "isik-yili-nedir-kac-km", "ses-hizi-kac-km-saat"],
  sources: [
    ["NIST – Zaman ve frekans ölçümleri", "https://www.nist.gov/"],
    ["GPS.gov – Küresel konumlama sistemi resmî bilgi sayfası", "https://www.gps.gov/"]
  ]
};
