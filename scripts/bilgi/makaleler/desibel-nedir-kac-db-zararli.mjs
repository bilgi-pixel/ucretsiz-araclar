export default {
  slug: "desibel-nedir-kac-db-zararli",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Desibel Nedir? Kaç dB Ses Zararlıdır, Ses Şiddeti Düzeyi Nasıl Hesaplanır",
  pageTitle: "Desibel Nedir? Kaç dB Ses Zararlı, Ses Şiddeti Hesabı",
  description: "Desibel, ses şiddetinin logaritmik ölçüsüdür: L = 10·log(I/I₀). 85 dB(A) üstünde uzun süre kalmak işitmeye zarar verir. Gürültü sınırları, ters kare yasası.",
  keywords: ["desibel nedir", "kaç desibel zararlı", "ses şiddeti düzeyi", "db hesaplama", "ters kare yasası", "gürültü seviyesi", "ses mesafe ile nasıl azalır", "85 db kaç saat"],
  lead: "Desibel (dB), ses şiddetini işitme eşiğine göre logaritmik olarak ölçen birimdir: <strong>L = 10 × log<sub>10</sub>(I ÷ I<sub>0</sub>)</strong>, I<sub>0</sub> = 10<sup>-12</sup> W/m². Her 10 dB artış ses şiddetini 10 katına çıkarır. Türkiye'deki iş sağlığı mevzuatı günlük 8 saatlik maruziyette <strong>80 dB(A)</strong>'yı alt, <strong>85 dB(A)</strong>'yı üst eylem değeri, <strong>87 dB(A)</strong>'yı sınır değer kabul eder; Dünya Sağlık Örgütü de yetişkinler için kulaklıkla dinlemede haftada 40 saat boyunca 80 dB(A)'yı güvenli sınır olarak verir. Bu sayfada hesabı, mesafe etkisini ve gündelik seslerin değerlerini anlatıyoruz.",
  kisaCevap: [
    "Ses şiddeti düzeyi: L = 10 × log(I ÷ 10<sup>-12</sup> W/m²); işitme eşiği 0 dB'dir.",
    "+10 dB şiddeti 10 kat artırır ve kulağa yaklaşık iki kat daha yüksek gelir; +3 dB şiddeti iki katına çıkarır.",
    "Aynı güçte iki kaynak tek kaynaktan 3 dB fazladır: 80 dB + 80 dB ≈ 83 dB.",
    "Noktasal kaynakta mesafe iki katına çıkınca ses düzeyi yaklaşık 6 dB düşer (ters kare yasası).",
    "İş yerinde 80, 85 ve 87 dB(A) sırasıyla alt eylem, üst eylem ve maruziyet sınır değeridir (8 saatlik ortalama).",
    "Her +3 dB için güvenli maruz kalma süresi yarıya iner: 85 dB(A) 8 saat ise 94 dB(A) 1 saat, 100 dB(A) yaklaşık 15 dakikadır."
  ],
  figure: {
    alt: "Desibel ölçeği: 0 dB işitme eşiği, 30 dB fısıltı, 60 dB konuşma, 80 dB yoğun trafik, 85 dB uzun maruziyette risk sınırı, 100 dB matkap, 120 dB ağrı eşiği. Altta 85 dB 8 saat, 94 dB 1 saat, 100 dB 15 dakika süre çubukları.",
    caption: "Değerler tipik örneklerdir ve ölçüm mesafesine göre değişir. Risk yalnızca sesin düzeyine değil, ne kadar süre maruz kalındığına da bağlıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Gündelik sesler ve işitme riski (dB(A), yaklaşık)</text>
  <rect x="40" y="52" width="300" height="34" class="oks"/>
  <rect x="340" y="52" width="150" height="34" class="ps"/>
  <rect x="490" y="52" width="190" height="34" class="dgs"/>
  <text x="190" y="74" class="sm mid b">güvenli bölge</text>
  <text x="415" y="74" class="sm mid b">süreye dikkat</text>
  <text x="585" y="74" class="sm mid b">kısa sürede risk</text>
  <line x1="40" y1="96" x2="680" y2="96" class="st" fill="none"/>
  <g class="sm mid">
    <line x1="40" y1="92" x2="40" y2="104" class="st" fill="none"/><text x="40" y="120" class="b">0</text><text x="40" y="138">eşik</text>
    <line x1="160" y1="92" x2="160" y2="104" class="st" fill="none"/><text x="160" y="120" class="b">30</text><text x="160" y="138">fısıltı</text>
    <line x1="280" y1="92" x2="280" y2="104" class="st" fill="none"/><text x="280" y="120" class="b">60</text><text x="280" y="138">konuşma</text>
    <line x1="360" y1="92" x2="360" y2="104" class="st" fill="none"/><text x="360" y="120" class="b">80</text><text x="360" y="138">trafik</text>
    <line x1="380" y1="88" x2="380" y2="108" class="sp sw" fill="none"/><text x="390" y="160" class="b p">85</text>
    <line x1="440" y1="92" x2="440" y2="104" class="st" fill="none"/><text x="446" y="120" class="b">100</text><text x="446" y="138">matkap</text>
    <line x1="520" y1="92" x2="520" y2="104" class="st" fill="none"/><text x="520" y="120" class="b">120</text><text x="520" y="138">ağrı eşiği</text>
    <line x1="640" y1="92" x2="640" y2="104" class="st" fill="none"/><text x="640" y="120" class="b">150</text><text x="640" y="138">yakın patlama</text>
  </g>
  <text x="40" y="196" class="b">Aynı risk için izin verilen süre (her +3 dB süreyi yarılar)</text>
  <g class="sm">
    <text x="40" y="228">85 dB(A)</text><rect x="120" y="214" width="480" height="20" class="oks"/><text x="610" y="229">8 saat</text>
    <text x="40" y="258">88 dB(A)</text><rect x="120" y="244" width="240" height="20" class="ps"/><text x="370" y="259">4 saat</text>
    <text x="40" y="288">91 dB(A)</text><rect x="120" y="274" width="120" height="20" class="ps"/><text x="250" y="289">2 saat</text>
    <text x="40" y="318">94 dB(A)</text><rect x="120" y="304" width="60" height="20" class="dgs"/><text x="190" y="319">1 saat</text>
    <text x="40" y="348">100 dB(A)</text><rect x="120" y="334" width="15" height="20" class="dg"/><text x="145" y="349">15 dakika</text>
  </g>
  <rect x="380" y="290" width="300" height="70" rx="8" class="sf sb"/>
  <text x="530" y="316" class="b mid">Mesafe × 2 → −6 dB</text>
  <text x="530" y="342" class="sm mid">1 m'de 90 dB → 2 m'de 84, 10 m'de 70</text>
  <text x="360" y="396" class="sm mid t2">Süre değerleri eşit enerji ilkesine göre örnektir; mevzuat 8 saatlik ortalamayı esas alır.</text>
</svg>`
  },
  sections: [
    {
      h: "Desibel nedir?",
      p: [
        "İnsan kulağı çok geniş bir şiddet aralığını algılar. Duyabildiğimiz en zayıf ses ile ağrıya neden olan ses arasında yaklaşık bir trilyon kat şiddet farkı vardır. Bu kadar büyük bir aralığı doğrusal sayılarla ifade etmek pratik değildir. Desibel ölçeği, bu farkları logaritma ile sıkıştırarak 0 ile 140 civarındaki yönetilebilir sayılara dönüştürür.",
        "Desibel aslında bir oran birimidir: ölçülen bir büyüklüğün referans bir değere göre kaç kat olduğunu logaritmik olarak söyler. Seste referans, sağlıklı bir kulağın 1.000 Hz'de duyabildiği en zayıf ses şiddeti olan 10<sup>-12</sup> W/m²'dir ve bu değer 0 dB kabul edilir. Aynı mantık elektronikte ve kablosuz sinyallerde de kullanılır; Wi-Fi sinyalindeki dBm kavramı için [[bilgi:dbm-nedir-wifi-sinyal-gucu|dBm yazısına]] bakabilirsiniz.",
        "Gürültü ölçümlerinde sıkça <strong>dB(A)</strong> ifadesi görülür. Buradaki A, insan kulağının farklı frekanslara duyarlılığını taklit eden bir ağırlıklandırma filtresidir. Kulak, çok alçak ve çok tiz seslere orta frekanslardan daha az duyarlı olduğu için gürültü mevzuatı ve sağlık önerileri genellikle A ağırlıklı değerleri kullanır."
      ]
    },
    {
      h: "Ses şiddeti düzeyi nasıl hesaplanır?",
      formula: "L (dB) = 10 × log10(I ÷ I₀) · I₀ = 10^-12 W/m²\nI = I₀ × 10^(L ÷ 10)\nİki düzeyin farkı: ΔL = 10 × log10(I₂ ÷ I₁)\nToplam düzey: L = 10 × log10(10^(L₁/10) + 10^(L₂/10) + …)",
      ol: [
        "<strong>Şiddetten desibele:</strong> I = 10<sup>-5</sup> W/m² ise L = 10 × log(10<sup>-5</sup> ÷ 10<sup>-12</sup>) = 10 × 7 = <strong>70 dB</strong>.",
        "<strong>Desibelden şiddete:</strong> 60 dB için I = 10<sup>-12</sup> × 10<sup>6</sup> = 10<sup>-6</sup> W/m².",
        "<strong>Fark:</strong> 80 dB'lik ses, 60 dB'lik sesten 10<sup>2</sup> = 100 kat daha şiddetlidir.",
        "<strong>İki kaynak:</strong> İki ayrı 80 dB kaynak birlikte 10 × log(2 × 10<sup>8</sup>) ≈ <strong>83 dB</strong> verir, 160 dB değil."
      ],
      after: [
        "Desibeller doğrudan toplanmaz; önce şiddete çevrilip toplanır, sonra yeniden desibele dönülür. Birden çok kaynağın toplam düzeyini ya da şiddetten desibele dönüşümü [[arac:ses-siddeti-hesapla|Ses Şiddeti Hesaplama]] aracı yapar. Güç ve gerilim oranlarını desibele çevirmek için [[arac:desibel-hesapla|Desibel Hesaplama]] aracı 10 log ve 20 log kurallarını kullanır. Logaritmanın kendisi için [[bilgi:logaritma-nasil-hesaplanir|logaritma yazısı]] temel bilgiyi verir."
      ]
    },
    {
      h: "10 dB artış sesi kaç kat güçlendirir?",
      p: [
        "Fiziksel olarak 10 dB artış ses şiddetini <strong>10 katına</strong>, 20 dB artış 100 katına, 30 dB artış 1.000 katına çıkarır. 3 dB artış ise şiddeti yaklaşık iki katına çıkarır. Ancak kulağımızın algısı da logaritmiktir: 10 dB'lik bir artış, sesin yaklaşık <strong>iki kat daha yüksek</strong> geldiği hissini verir. 3 dB'lik bir değişiklik ise ancak fark edilebilir düzeydedir.",
        "Bu durumun pratik bir sonucu vardır: gürültüyü yarıya indirdiğinizi hissetmek için şiddeti onda birine düşürmeniz gerekir. Öte yandan aynı makineden iki tane çalıştırmak düzeyi yalnızca 3 dB artırır; bu yüzden bir atölyedeki makinelerin sayısını azaltmak beklenenden daha az fark yaratabilir, en gürültülü kaynağı susturmak ise büyük fark yaratır."
      ],
      table: {
        head: ["Düzey farkı", "Şiddet oranı", "Algı (yaklaşık)"],
        rows: [
          ["+1 dB", "1,26 kat", "Genellikle fark edilmez"],
          ["+3 dB", "2 kat", "Hafifçe fark edilir"],
          ["+6 dB", "4 kat", "Belirgin artış"],
          ["+10 dB", "10 kat", "Yaklaşık iki kat yüksek"],
          ["+20 dB", "100 kat", "Yaklaşık dört kat yüksek"]
        ]
      }
    },
    {
      h: "Uzaklaştıkça ses neden azalır? Ters kare yasası",
      p: [
        "Açık alanda noktasal bir kaynaktan çıkan ses enerjisi her yöne eşit yayılır ve giderek büyüyen küre yüzeylerine dağılır. Kürenin yüzey alanı 4πr² olduğundan, birim alana düşen şiddet uzaklığın karesiyle ters orantılı azalır: <strong>I ∝ 1/r²</strong>. Buna ters kare yasası denir. Aynı yasa ışık ve ışınım şiddeti için de geçerlidir."
      ],
      formula: "I₂ = I₁ × (r₁ ÷ r₂)²\nL₂ = L₁ − 20 × log10(r₂ ÷ r₁)\nMesafe × 2 → −6 dB · Mesafe × 10 → −20 dB",
      after: [
        "Örnek: 1 metrede 90 dB ölçülen bir kaynaktan 2 metre uzaklaşınca düzey yaklaşık 84 dB'e, 10 metre uzaklaşınca 70 dB'e iner. Kapalı ortamlarda duvarlardan yansıma nedeniyle düşüş bundan daha az olur; uzun bir yol gibi çizgisel kaynaklarda ise mesafe iki katına çıktığında yaklaşık 3 dB düşüş beklenir. Mesafeye göre şiddet hesabı için [[arac:isik-siddeti-mesafe-hesapla|Ters Kare Yasası Hesaplama]] aracını kullanabilirsiniz; sesin havadaki yayılma hızı ise [[bilgi:ses-hizi-kac-km-saat|ses hızı yazısında]] anlatılır."
      ]
    },
    {
      h: "Kaç desibel ses zararlı kabul edilir?",
      p: [
        "İşitme hasarı riski hem sesin düzeyine hem de maruz kalma süresine bağlıdır. Kısa süreli 80 dB genellikle zararsızdır, ama 85 dB(A) civarındaki bir gürültüye her gün saatlerce maruz kalmak yıllar içinde kalıcı işitme kaybına yol açabilir. Çok yüksek ve ani sesler (patlama, silah sesi) ise tek seferde iç kulağa zarar verebilir."
      ],
      table: {
        head: ["Kaynak", "Değer", "Ne anlama gelir"],
        rows: [
          ["Çalışanların Gürültü ile İlgili Risklerden Korunmalarına Dair Yönetmelik", "80 dB(A)", "En düşük maruziyet eylem değeri: kulak koruyucu sağlanır, eğitim verilir"],
          ["Aynı yönetmelik", "85 dB(A)", "En yüksek maruziyet eylem değeri: kulak koruyucu kullanımı zorunlu, önlem programı"],
          ["Aynı yönetmelik", "87 dB(A)", "Maruziyet sınır değeri: kulak koruyucu dahil hesaplanan maruziyet bunu aşamaz"],
          ["Aynı yönetmelik (tepe değerler)", "135 / 137 / 140 dB(C)", "Anlık tepe ses basıncı için sırasıyla alt, üst eylem ve sınır değer"],
          ["DSÖ – ITU güvenli dinleme standardı", "80 dB(A), haftada 40 saat", "Yetişkinler için kişisel ses cihazlarında önerilen haftalık sınır (çocuklarda 75 dB(A))"]
        ],
        caption: "İş yerindeki değerler 8 saatlik günlük ortalama maruziyete (L<sub>EX,8h</sub>) göredir. Güncel metin için mevzuat ve Çalışma ve Sosyal Güvenlik Bakanlığı kaynaklarına bakın."
      },
      after: [
        "Eşit enerji ilkesine göre ses düzeyi her 3 dB arttığında aynı toplam enerjiye ulaşmak için gereken süre yarıya iner. 85 dB(A) için 8 saat, 88 dB(A) için 4 saat, 94 dB(A) için 1 saat, 100 dB(A) için yaklaşık 15 dakika aynı riski taşır. Konser, gece kulübü ve yüksek sesle kulaklık kullanımı bu düzeylere kolayca ulaşabilir.",
        "Çevresel gürültüde ise Dünya Sağlık Örgütü, uyku ve kalp-damar sağlığı üzerindeki etkiler nedeniyle trafik gürültüsü için çok daha düşük düzeyler önermektedir. Türkiye'de çevresel gürültü, Çevresel Gürültünün Değerlendirilmesi ve Yönetimi Yönetmeliği ile düzenlenir."
      ]
    },
    {
      h: "Günlük seslerin desibel değerleri",
      table: {
        head: ["Ses", "Yaklaşık düzey", "Not"],
        rows: [
          ["İşitme eşiği", "0 dB", "Referans"],
          ["Yaprak hışırtısı", "10–20 dB", "Çok sessiz"],
          ["Fısıltı, sessiz kütüphane", "30 dB", "Uyku için sakin ortam"],
          ["Buzdolabı uğultusu", "40 dB", "Arka plan sesi"],
          ["Normal konuşma (1 m)", "60 dB", "Rahat iletişim"],
          ["Elektrikli süpürge, yoğun trafik", "70–80 dB", "Uzun süre rahatsız edici"],
          ["Matkap, motosiklet", "95–100 dB", "Kısa sürede risk"],
          ["Konser, gece kulübü", "100–110 dB", "Kulak koruyucu önerilir"],
          ["Ağrı eşiği", "≈ 120–130 dB", "Anında rahatsızlık"],
          ["Yakın mesafede patlama", "140 dB ve üstü", "Tek seferde hasar riski"]
        ],
        caption: "Değerler ölçüm mesafesine ve cihaza göre değişen yaklaşık örneklerdir."
      }
    },
    {
      h: "Telefon uygulamalarıyla desibel ölçülebilir mi?",
      p: [
        "Telefon uygulamaları kabaca bir fikir verebilir, ancak kalibre edilmiş bir ses düzeyi ölçer yerine geçmez. Telefon mikrofonları konuşma için tasarlanmıştır; çok yüksek seslerde doyuma ulaşır, alçak ve tiz frekansları farklı algılar ve modelden modele farklı sonuç verir. Bazı uygulamalar A ağırlıklandırma da uygulamaz.",
        "İş yerinde yasal amaçlı gürültü ölçümü, standartlara uygun ve kalibrasyonu yapılmış cihazlarla, yetkin kişilerce yapılmalıdır. Telefon uygulaması yine de \"bu ortam yüksek mi?\" sorusuna hızlı bir cevap almak, ölçümleri karşılaştırmak ve kulak koruyucu takma alışkanlığı kazanmak için kullanışlıdır."
      ]
    },
    {
      h: "İşitme sağlığını korumak için pratik öneriler",
      ul: [
        "Kulaklıkla dinlerken ses düzeyini cihazın azami seviyesinin yaklaşık yüzde altmışının altında tutmak ve aralar vermek yaygın bir öneridir.",
        "Gürültülü ortamda kendi sesinizi duyurmak için bağırmanız gerekiyorsa ortam muhtemelen 85 dB(A) civarındadır.",
        "Konser, maç ve gürültülü iş ortamlarında kulak tıkacı ya da kulaklık tipi koruyucu kullanın.",
        "Gürültüye maruz kaldıktan sonra kulak çınlaması ya da boğuk işitme olursa kulaklarınızı dinlendirin; şikâyet sürerse bir kulak burun boğaz hekimine başvurun.",
        "İş yerinde 80 dB(A)'nın üzerinde gürültüye maruz kalıyorsanız işvereniniz risk değerlendirmesi yapmak, koruyucu sağlamak ve gerekirse sağlık gözetimi uygulamakla yükümlüdür."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Desibelleri toplamak:</strong> 80 + 80 dB, 160 dB değil yaklaşık 83 dB'dir.",
        "<strong>10 dB'i küçük fark sanmak:</strong> Şiddette 10 kat, algıda yaklaşık iki kat artıştır.",
        "<strong>dB ile dB(A)'yı karıştırmak:</strong> Sağlık ve mevzuat değerleri A ağırlıklıdır.",
        "<strong>Süreyi göz ardı etmek:</strong> Risk düzey ile sürenin birlikte etkisidir; kısa süreli 90 dB, uzun süreli 85 dB kadar riskli olmayabilir.",
        "<strong>Mesafeyi belirtmemek:</strong> Bir kaynağın desibel değeri ölçüm mesafesi olmadan eksik bilgidir."
      ]
    }
  ],
  faq: [
    ["Desibel nedir?", "Desibel, ses şiddetini insan kulağının duyabildiği en zayıf sese göre logaritmik olarak ölçen birimdir. Formülü L eşittir 10 çarpı log I bölü I sıfırdır ve her 10 desibellik artış ses şiddetinin 10 katına çıktığını gösterir."],
    ["Kaç desibel ses zararlı kabul edilir?", "Türkiye'deki iş sağlığı mevzuatına göre 8 saatlik günlük ortalamada 80 dB(A) alt eylem, 85 dB(A) üst eylem, 87 dB(A) sınır değerdir. Uzun süre 85 dB(A) civarında kalmak kalıcı işitme kaybı riskini artırır."],
    ["Ses şiddeti düzeyi nasıl hesaplanır?", "Ses şiddeti, işitme eşiği olan 10 üzeri eksi 12 watt bölü metrekareye bölünür, sonucun 10 tabanında logaritması alınır ve 10 ile çarpılır. 10 üzeri eksi 5 watt bölü metrekare şiddet 70 desibel eder."],
    ["10 dB artış sesi kaç kat güçlendirir?", "10 desibellik artış ses şiddetini fiziksel olarak 10 katına çıkarır ve kulağa yaklaşık iki kat daha yüksek gelir. 3 desibellik artış ise şiddeti yaklaşık iki katına çıkarır ama ancak fark edilir."],
    ["Uzaklaştıkça ses neden azalır?", "Noktasal bir kaynaktan çıkan ses enerjisi giderek büyüyen küre yüzeylerine dağılır ve birim alana düşen şiddet uzaklığın karesiyle azalır. Açık alanda mesafe iki katına çıktığında ses düzeyi yaklaşık 6 desibel düşer."],
    ["Ters kare yasası nedir?", "Ters kare yasası, noktasal bir kaynaktan yayılan ses, ışık ya da ışınım şiddetinin kaynaktan uzaklığın karesiyle ters orantılı azaldığını söyler. Uzaklık 10 katına çıkarsa şiddet 100'de bire, ses düzeyi 20 desibel düşer."],
    ["Günlük seslerin desibel değerleri nelerdir?", "Fısıltı yaklaşık 30, normal konuşma 60, yoğun trafik 70 ile 80, matkap ve motosiklet 95 ile 100, konser 100 ile 110 desibel civarındadır. Ağrı eşiği yaklaşık 120 ile 130 desibeldir; değerler mesafeye göre değişir."],
    ["Telefon uygulamalarıyla desibel ölçülebilir mi?", "Telefon uygulamaları yaklaşık bir fikir verir ama kalibre edilmiş ses düzeyi ölçerin yerini tutmaz. Mikrofonlar yüksek seslerde doyuma ulaşabilir ve modelden modele farklı ölçer; resmî ölçümler standart cihazlarla yapılmalıdır."],
    ["İki ses kaynağının toplam desibeli nasıl bulunur?", "Desibeller doğrudan toplanmaz; her düzey önce şiddete çevrilir, şiddetler toplanır ve sonuç yeniden desibele dönüştürülür. Aynı düzeyde iki kaynak tek kaynaktan yaklaşık 3 desibel fazla ses üretir."]
  ],
  tools: ["ses-siddeti-hesapla", "desibel-hesapla", "isik-siddeti-mesafe-hesapla"],
  related: ["dbm-nedir-wifi-sinyal-gucu", "logaritma-nasil-hesaplanir", "ses-hizi-kac-km-saat"],
  uyari: "işitme sağlığına ilişkin genel bilgidir, tıbbi tavsiye değildir; kulak çınlaması ya da işitme azalması fark ederseniz kulak burun boğaz hekimine başvurun",
  sources: [
    ["Mevzuat – Çalışanların Gürültü ile İlgili Risklerden Korunmalarına Dair Yönetmelik", "https://www.mevzuat.gov.tr/"],
    ["Çalışma ve Sosyal Güvenlik Bakanlığı – İş sağlığı ve güvenliği", "https://www.csgb.gov.tr/"],
    ["WHO – Safe listening devices and systems: a WHO-ITU standard", "https://www.who.int/publications/i/item/9789241515276"]
  ]
};
