export default {
  slug: "maraton-kac-km-yari-maraton-suresi",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Maraton Kaç Km? Yarı Maraton, 10K ve Tempoya Göre Bitiş Süresi Tahmini",
  pageTitle: "Maraton Kaç Km? Yarı Maraton Süresi ve Tempo Hesabı",
  description: "Maraton 42,195 km, yarı maraton 21,0975 km'dir. Mesafenin tarihi, tempoya göre bitiş süreleri, 10K süresinden Riegel formülüyle maraton tahmini ve hazırlık süresi.",
  keywords: ["maraton kaç km", "yarı maraton kaç km", "maraton kaç saatte koşulur", "10k koşu süresi", "maraton temposu", "maraton neden 42 km", "maraton süre tahmini", "dakika km tempo"],
  lead: "Maraton <strong>42,195 kilometre</strong>, yarı maraton ise bunun tam yarısı olan <strong>21,0975 kilometre</strong>dir. Bu mesafe 1908 Londra Olimpiyatları'nda belirlenmiş ve 1921'de uluslararası standart hâline gelmiştir. Bitiş süresi temponuza bağlıdır: kilometreyi 6 dakikada koşan biri maratonu yaklaşık 4 saat 13 dakikada, yarı maratonu 2 saat 6 dakikada bitirir. Aşağıda tempo hesabını, 5K ve 10K sürenizden maraton tahminini, mil–kilometre çevirisini ve hazırlık süresini örneklerle bulacaksınız.",
  kisaCevap: [
    "Maraton = 42,195 km (26 mil 385 yarda); yarı maraton = 21,0975 km; 10K = 10 km; 5K = 5 km.",
    "Bitiş süresi = mesafe × tempo; 5:00 dk/km tempoyla maraton ≈ 3:31, yarı maraton ≈ 1:45.",
    "Tempo (dk/km) = toplam süre ÷ mesafe; 50 dakikada 10 km koşan kişinin temposu 5:00 dk/km'dir.",
    "Riegel formülü: T₂ = T₁ × (D₂ ÷ D₁)<sup>1,06</sup>; 10K'yı 50:00'de koşan biri için maraton tahmini ≈ 3:50.",
    "1 mil = 1,609344 km; mil başına tempoyu km'ye çevirmek için 1,609'a bölün (8:00 dk/mil ≈ 4:58 dk/km).",
    "İlk maratona hazırlık, düzenli koşu geçmişi olanlar için genellikle 16–20 hafta sürer."
  ],
  figure: {
    alt: "Yaygın yarış mesafelerinin çubuk karşılaştırması: 5 km, 10 km, 21,0975 km yarı maraton ve 42,195 km maraton; altında 5, 6 ve 7 dakika/km tempolarıyla her mesafenin bitiş süreleri tablosu.",
    caption: "Maraton, 10K'nın 4,2 katı uzunluğundadır ama aynı tempoyu korumak zorlaştığı için süre genellikle bundan daha fazla artar. Tablodaki süreler sabit tempoyla hesaplanmıştır; gerçek yarışta yorgunluk payını Riegel formülü verir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Yarış mesafeleri ve tempoya göre süre</text>
  <g>
    <text x="20" y="70" class="b">5K</text>
    <rect x="130" y="54" width="68" height="24" rx="4" class="ps"/><text x="206" y="72" class="sm">5 km</text>
    <text x="20" y="108" class="b">10K</text>
    <rect x="130" y="92" width="136" height="24" rx="4" class="ps"/><text x="274" y="110" class="sm">10 km</text>
    <text x="20" y="146" class="b">Yarı maraton</text>
    <rect x="130" y="130" width="287" height="24" rx="4" class="oks"/><text x="425" y="148" class="sm">21,0975 km</text>
    <text x="20" y="184" class="b">Maraton</text>
    <rect x="130" y="168" width="574" height="24" rx="4" class="p"/><text x="694" y="186" class="sm sf end b">42,195 km</text>
  </g>
  <g class="mid">
    <rect x="20" y="216" width="680" height="34" rx="6" class="p"/>
    <text x="110" y="238" class="b sf">Tempo</text><text x="260" y="238" class="b sf">5K</text><text x="380" y="238" class="b sf">10K</text>
    <text x="500" y="238" class="b sf">Yarı maraton</text><text x="630" y="238" class="b sf">Maraton</text>
    <rect x="20" y="256" width="680" height="34" rx="6" class="sf sb"/>
    <text x="110" y="278" class="b">5:00 dk/km</text><text x="260" y="278">25:00</text><text x="380" y="278">50:00</text><text x="500" y="278">1:45:29</text><text x="630" y="278">3:30:59</text>
    <rect x="20" y="296" width="680" height="34" rx="6" class="ps"/>
    <text x="110" y="318" class="b">6:00 dk/km</text><text x="260" y="318">30:00</text><text x="380" y="318">1:00:00</text><text x="500" y="318">2:06:35</text><text x="630" y="318">4:13:10</text>
    <rect x="20" y="336" width="680" height="34" rx="6" class="sf sb"/>
    <text x="110" y="358" class="b">7:00 dk/km</text><text x="260" y="358">35:00</text><text x="380" y="358">1:10:00</text><text x="500" y="358">2:27:41</text><text x="630" y="358">4:55:22</text>
  </g>
  <text x="360" y="398" class="sm mid t2">Süre = mesafe × tempo · saat:dakika:saniye</text>
</svg>`
  },
  sections: [
    {
      h: "Maraton kaç kilometredir ve neden 42,195 km?",
      p: [
        "Maratonun adı ve fikri, MÖ 490'daki Maraton Savaşı'nın ardından bir ulağın zafer haberini Atina'ya koşarak götürdüğü efsanesinden gelir. Maraton kasabası ile Atina arasındaki mesafe yaklaşık 40 km'dir ve 1896'daki ilk modern olimpiyatlarda koşulan maraton da bu civardaydı. İlk yıllarda yarış mesafesi organizasyondan organizasyona değişiyordu.",
        "Bugünkü 42,195 km, 1908 Londra Olimpiyatları'ndan kalmadır. Yarışın başlangıcı saray bahçesine, bitişi stadyumdaki tören locasının önüne konunca parkur 26 mil 385 yarda uzunluğunda oldu; bu da 42,195 km eder. Uluslararası atletizm federasyonu 1921'de bu uzunluğu resmî maraton mesafesi olarak kabul etti ve o günden beri tüm resmî maratonlar bu mesafede koşulur.",
        "Resmî parkurlar özel bir yöntemle, en kısa koşulabilir çizgi boyunca ölçülür ve ölçüm hatasına karşı her kilometreye 1 metre güvenlik payı eklenir. Bu yüzden koşu saatiniz yarış sonunda 42,5 ya da 43 km gösterebilir; çünkü koşucular virajları en iç çizgiden almaz ve kalabalıkta zikzak çizer."
      ]
    },
    {
      h: "Yarış mesafeleri: 5K, 10K, yarı maraton ve maraton",
      table: {
        head: ["Yarış", "Kilometre", "Mil", "Kimler için uygun"],
        rows: [
          ["5K", "5 km", "3,11 mil", "Koşuya yeni başlayanlar için ilk hedef"],
          ["10K", "10 km", "6,21 mil", "Birkaç aylık düzenli koşu deneyimi olanlar"],
          ["Yarı maraton", "21,0975 km", "13,1 mil", "En az 6–12 ay düzenli koşanlar"],
          ["Maraton", "42,195 km", "26,2 mil", "Yarı maraton deneyimi olanlar"],
          ["Ultramaraton", "42,195 km'den uzun", "26,2 milden uzun", "Deneyimli dayanıklılık sporcuları"]
        ],
        caption: "Mil değerleri 1 mil = 1,609344 km tanımıyla hesaplanmıştır."
      },
      after: [
        "Türkiye'de her yıl kasım ayında koşulan ve iki kıtayı birleştiren İstanbul Maratonu'nda da maraton mesafesi 42,195 km'dir; aynı organizasyonda daha kısa mesafeli koşular da düzenlenir. Şehirlerde ilkbahar ve sonbahar aylarında çok sayıda yarı maraton ve 10K yarışı yapılır."
      ]
    },
    {
      h: "Tempo nedir, dakika/km tempo nasıl hesaplanır?",
      p: [
        "Koşucular hızı km/s yerine genellikle <strong>tempo</strong> ile ifade eder: bir kilometreyi kaç dakika ve saniyede koştuğunuz. Tempo, toplam sürenin mesafeye bölünmesiyle bulunur. Hesabı kolaylaştırmak için süreyi önce saniyeye çevirmek, bölmeyi yapıp sonucu dakika:saniye biçimine geri çevirmek en güvenli yoldur."
      ],
      formula: "Tempo (sn/km) = toplam süre (sn) ÷ mesafe (km)\nBitiş süresi (sn) = tempo (sn/km) × mesafe (km)\nHız (km/s) = 60 ÷ tempo (dk/km)",
      ol: [
        "Örnek: 10 km'yi 54 dakika 30 saniyede koştunuz. Süreyi saniyeye çevirin: 54 × 60 + 30 = 3.270 saniye.",
        "Mesafeye bölün: 3.270 ÷ 10 = 327 saniye/km.",
        "Dakika ve saniyeye ayırın: 327 = 5 × 60 + 27, yani tempo 5:27 dk/km.",
        "Hıza çevirin: 3.600 ÷ 327 ≈ 11,0 km/s.",
        "Bu tempoyu yarı maratona uygularsanız 327 × 21,0975 ≈ 6.899 saniye, yani yaklaşık 1:54:59 bulursunuz. Ancak uzun mesafede aynı tempoyu korumak zorlaştığı için gerçekçi tahmin için bir sonraki bölümdeki formül daha uygundur."
      ],
      after: [
        "Mesafe ve süreyi girerek tempoyu, hızı ve 400 metrelik tur süresini [[arac:kosu-temposu-hesapla|koşu temposu hesaplama]] aracıyla bulabilirsiniz. Tempo kavramının antrenmanda nasıl kullanıldığını [[bilgi:kosu-temposu-nasil-hesaplanir|koşu temposu nasıl hesaplanır]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "5K ve 10K süresinden maraton süresi tahmin edilir mi?",
      p: [
        "Evet, yaklaşık olarak. En yaygın yöntem, mühendis ve koşucu Peter Riegel'in önerdiği formüldür. Formül, mesafe uzadıkça tempoyu koruyamadığımızı bir <strong>yorgunluk üssü</strong> ile hesaba katar. Üs olarak genellikle 1,06 kullanılır; bu, mesafe iki katına çıktığında sürenin iki katından yaklaşık %4 fazla olacağı anlamına gelir."
      ],
      formula: "T₂ = T₁ × (D₂ ÷ D₁)^1,06\nT₁: bilinen yarış süresi · D₁: bilinen mesafe · D₂: hedef mesafe",
      ol: [
        "10K'yı 50:00'de koştuğunuzu varsayalım: T₁ = 50 dakika, D₁ = 10 km.",
        "Maraton için oran: 42,195 ÷ 10 = 4,2195.",
        "Üssü alın: 4,2195<sup>1,06</sup> ≈ 4,60.",
        "Çarpın: 50 × 4,60 ≈ 230 dakika, yani yaklaşık 3 saat 50 dakika.",
        "Yarı maraton için aynı yöntemle 50 × 2,10975<sup>1,06</sup> ≈ 110,3 dakika, yaklaşık 1:50:20 bulunur."
      ],
      after: [
        "Formül, hedef mesafeye uygun antrenman yapmış koşucular için iyi bir tahmin verir. Haftada 20 km koşan biri için 10K süresinden yapılan maraton tahmini genellikle iyimser kalır; çünkü maratonun son 10 kilometresi dayanıklılık ve yakıt yönetimiyle ilgilidir. Bu yüzden tahmin için hedefe en yakın mesafedeki (örneğin yarı maraton) güncel süreyi kullanmak daha isabetlidir. Hesabı [[arac:maraton-sure-tahmini|maraton süre tahmini]] aracıyla, yorgunluk katsayısını da değiştirerek yapabilirsiniz."
      ]
    },
    {
      h: "Yarı maraton ve maraton kaç saatte biter? Ortalama süreler",
      p: [
        "Bitiş süreleri yaşa, cinsiyete, deneyime ve parkura göre çok geniş bir aralıkta değişir. Dünya çapındaki büyük şehir maratonlarında amatör koşucuların ortalama bitiş süresi kabaca 4 ile 4,5 saat arasındadır. Yarı maratonda ortalama genellikle 2 saat civarında, 10K'da ise 55–65 dakika aralığındadır. Elit koşucular maratonu 2 saatin biraz üzerinde bitirir.",
        "İlk maratonunu koşanlar için en sağlıklı hedef, süre değil yarışı sağlıklı ve keyifle bitirmektir. Birçok organizasyon parkuru 6 ya da 7 saatte kapatır; yarışa kaydolmadan önce süre sınırını kontrol edin."
      ],
      table: {
        head: ["Hedef maraton süresi", "Gereken ortalama tempo", "Yarı maratonda geçiş", "Hız"],
        rows: [
          ["3:00:00", "4:16 dk/km", "1:30:00", "14,1 km/s"],
          ["3:30:00", "4:59 dk/km", "1:45:00", "12,1 km/s"],
          ["4:00:00", "5:41 dk/km", "2:00:00", "10,5 km/s"],
          ["4:30:00", "6:24 dk/km", "2:15:00", "9,4 km/s"],
          ["5:00:00", "7:07 dk/km", "2:30:00", "8,4 km/s"],
          ["6:00:00", "8:32 dk/km", "3:00:00", "7,0 km/s"]
        ],
        caption: "Eşit tempo varsayımıyla hesaplanmıştır; tempolar saniyeye yuvarlanmıştır."
      }
    },
    {
      h: "Mil cinsinden tempo kilometreye nasıl çevrilir?",
      p: [
        "Yabancı kaynaklı antrenman planları ve bazı koşu saatleri tempoyu dakika/mil olarak verir. 1 mil 1,609344 km olduğu için mil temposunu km temposuna çevirmek için saniye cinsinden değeri 1,609'a bölersiniz; tersine km temposunu 1,609 ile çarparsınız."
      ],
      ol: [
        "8:00 dk/mil tempoyu saniyeye çevirin: 8 × 60 = 480 saniye/mil.",
        "1,609344'e bölün: 480 ÷ 1,609 ≈ 298 saniye/km.",
        "Dakika ve saniyeye ayırın: 298 = 4 × 60 + 58 → 4:58 dk/km.",
        "Ters yönde 5:00 dk/km = 300 saniye × 1,609 ≈ 483 saniye = 8:03 dk/mil."
      ],
      after: [
        "Bu çeviriyi tek adımda [[arac:dakika-kilometre-tempo-cevir|dakika/km tempo çevirici]] ile, yalnızca mesafe çevirmek için ise [[arac:km-mil-cevir|km mil çevirici]] ile yapabilirsiniz."
      ]
    },
    {
      h: "Maratona hazırlık kaç hafta sürer?",
      p: [
        "Düzenli koşu alışkanlığı olan ve rahatça 10 km koşabilen biri için ilk maratona hazırlık genellikle <strong>16–20 hafta</strong> sürer. Yarı maraton için bu süre 10–12 haftadır. Sıfırdan başlayanların önce 5K ve 10K hedefleriyle birkaç ay temel oluşturması, ardından yarı maratona, en son maratona geçmesi sakatlık riskini azaltır.",
        "Hazırlık planlarının ortak noktası haftalık mesafenin kademeli artırılmasıdır; yaygın bir pratik kural haftalık toplamı her hafta %10'dan fazla artırmamaktır. Haftada bir kez yapılan uzun koşu maratondan 3–4 hafta önce 30–32 km'ye ulaşır, yarıştan önceki 2–3 haftada ise yük azaltılır. Sıvı ve enerji alımını uzun koşularda denemek, yarış günü sürpriz yaşamamak için önemlidir; antrenmandaki sıvı ihtiyacı için [[bilgi:antrenmanda-ne-kadar-su-icilmeli|antrenmanda ne kadar su içilmeli]] yazısına bakabilirsiniz.",
        "Kalp-damar hastalığı öyküsü olanlar, uzun süredir hareketsiz olanlar ve kronik rahatsızlığı bulunanlar uzun mesafe antrenmanına başlamadan önce hekimlerine danışmalıdır. Kondisyon düzeyinizi değerlendirmede kullanılan ölçütlerden biri [[bilgi:vo2-max-nedir-kac-olmali|VO2 max]] değeridir."
      ]
    },
    {
      h: "Yarış günü tempo stratejisi",
      p: [
        "Hedef sürenizi belirledikten sonra yarışı eşit parçalara bölmek, tempoyu korumanın en kolay yoludur. Örneğin 4 saatlik hedefte her 5 kilometreyi yaklaşık 28 dakika 26 saniyede geçmeniz gerekir; yarı maraton işaretinde saatiniz 2:00:00 civarını göstermelidir. Birçok deneyimli koşucu ikinci yarıyı ilk yarıyla aynı ya da biraz daha hızlı koşmayı (negatif bölünme) hedefler.",
        "Hava sıcaklığı, rüzgâr ve parkurdaki yokuşlar tempoyu doğrudan etkiler. Sıcak ve nemli havalarda hedef tempoyu kilometre başına 10–20 saniye yavaşlatmak, yarışı bitirememe riskini azaltır. Su istasyonlarında kısa süre yürümek de toplam süreyi sanıldığı kadar uzatmaz; 10 saniyelik bir yürüyüş, sonraki kilometrelerde tempoyu korumanızı sağlayabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yarışa hızlı başlamak:</strong> İlk kilometrelerde hedef tempodan 15–20 saniye hızlı koşmak, son 10 kilometrede çok daha fazla zaman kaybettirir. Hedef tempoyla ya da biraz yavaş başlayın.",
        "<strong>Süreyi dakika sanıp bölmek:</strong> 54:30'u 54,30 dakika diye hesaplamak tempoyu yanlış çıkarır; 30 saniye 0,5 dakikadır. Süreyi önce saniyeye çevirin.",
        "<strong>10K süresini doğrudan 4,2 ile çarpmak:</strong> Yorgunluk payı olmadan yapılan bu hesap maraton süresini genellikle 15–25 dakika iyimser gösterir.",
        "<strong>Saatteki mesafeye güvenmek:</strong> Uydu ölçümü virajlarda ve binalar arasında sapar. Resmî mesafe parkur ölçümüdür.",
        "<strong>Hazırlık süresini kısaltmak:</strong> Birkaç haftalık hazırlıkla maraton koşmaya çalışmak sakatlık riskini belirgin biçimde artırır."
      ]
    }
  ],
  faq: [
    ["Maraton kaç kilometredir?", "Maraton 42,195 kilometredir; bu, 26 mil 385 yardaya karşılık gelir. Mesafe 1908 Londra Olimpiyatları'nda belirlenmiş ve 1921'de uluslararası atletizm federasyonu tarafından resmî maraton uzunluğu olarak kabul edilmiştir."],
    ["Yarı maraton kaç km ve kaç saatte biter?", "Yarı maraton 21,0975 km'dir. Kilometreyi 5 dakikada koşan biri yaklaşık 1 saat 45 dakikada, 6 dakikada koşan biri yaklaşık 2 saat 6 dakikada bitirir. Amatör koşucuların ortalaması genellikle 2 saat civarındadır."],
    ["Maraton neden 42,195 km?", "Bu mesafe 1908 Londra Olimpiyatları'nda başlangıcın saray bahçesine, bitişin stadyumdaki tören locasının önüne konmasıyla ortaya çıktı. Parkur 26 mil 385 yarda yani 42,195 km oldu ve 1921'de bu uzunluk resmî standart hâline getirildi."],
    ["Ortalama maraton süresi nedir?", "Büyük şehir maratonlarında amatör koşucuların ortalama bitiş süresi kabaca 4 ile 4,5 saat arasındadır. Süre yaşa, cinsiyete, deneyime, hava koşullarına ve parkurun eğimine göre geniş bir aralıkta değişir; elit koşucular 2 saatin biraz üzerinde bitirir."],
    ["5K ve 10K süresinden maraton süresi tahmin edilir mi?", "Riegel formülüyle yaklaşık tahmin yapılabilir: hedef süre, bilinen süre ile mesafe oranının 1,06'ncı kuvvetinin çarpımıdır. 10K'yı 50 dakikada koşan biri için maraton tahmini yaklaşık 3 saat 50 dakikadır; yetersiz antrenmanda tahmin iyimser kalır."],
    ["Dakika/km tempo nasıl hesaplanır?", "Toplam süreyi saniyeye çevirip mesafeye bölün, sonucu dakika ve saniyeye ayırın. Örneğin 10 km'yi 54 dakika 30 saniyede koşan kişinin süresi 3.270 saniyedir; 10'a bölünce 327 saniye yani 5:27 dk/km tempo bulunur."],
    ["Mil cinsinden tempo km'ye nasıl çevrilir?", "Mil başına tempoyu saniyeye çevirip 1,609'a bölersiniz. 8:00 dk/mil yani 480 saniye, 1,609'a bölündüğünde yaklaşık 298 saniye eder; bu da 4:58 dk/km tempoya karşılık gelir. Ters yönde 1,609 ile çarparsınız."],
    ["Maratona hazırlık kaç hafta sürer?", "Rahatça 10 km koşabilen biri için ilk maratona hazırlık genellikle 16–20 hafta sürer. Haftalık mesafe kademeli artırılır ve uzun koşu yarıştan birkaç hafta önce 30–32 km'ye ulaşır. Sağlık sorunu olanlar başlamadan önce hekime danışmalıdır."],
    ["İstanbul Maratonu kaç km?", "İstanbul Maratonu'nun ana yarışı da tüm resmî maratonlar gibi 42,195 km'dir ve her yıl kasım ayında iki kıtayı birleştiren parkurda koşulur. Aynı organizasyon kapsamında daha kısa mesafeli koşular da düzenlenir; güncel bilgileri organizasyonun resmî duyurularından takip edin."]
  ],
  tools: ["maraton-sure-tahmini", "kosu-temposu-hesapla", "dakika-kilometre-tempo-cevir", "km-mil-cevir"],
  related: ["kosu-temposu-nasil-hesaplanir", "vo2-max-nedir-kac-olmali", "antrenmanda-ne-kadar-su-icilmeli", "gunde-kac-adim-atmali"],
  uyari: "antrenman planı tıbbi değerlendirme yerine geçmez; uzun mesafe koşuya başlamadan önce hekiminize danışın",
  sources: [
    ["World Athletics – Yol koşusu parkur ölçüm kuralları", "https://worldathletics.org/"],
    ["Gençlik ve Spor Bakanlığı", "https://www.gsb.gov.tr/"]
  ]
};
