export default {
  slug: "mantolama-nedir-kac-cm-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Mantolama Nedir? Kaç cm Olmalı, m² Hesabı ve Isı Tasarrufu",
  pageTitle: "Mantolama Nedir, Kaç cm Olmalı? m² Hesabı ve Isı Tasarrufu",
  description: "Mantolama, dış duvarların yalıtım levhasıyla kaplanmasıdır. Kalınlık U değeri hesabıyla belirlenir. EPS, XPS, taşyünü farkı, m² hesabı ve tasarruf örneği.",
  keywords: ["mantolama nedir", "mantolama kaç cm olmalı", "mantolama m2 hesaplama", "eps xps taşyünü farkı", "mantolama ne kadar tasarruf sağlar", "dış cephe yalıtımı", "ts 825 ısı yalıtım bölgeleri", "tek daire mantolama"],
  lead: "Mantolama, binanın dış duvarlarının dışarıdan ısı yalıtım levhalarıyla bir manto gibi sarılması, üzerine file ve sıva uygulanmasıdır. Kalınlık için tek bir doğru sayı yoktur: binanın bulunduğu iklim bölgesine, duvarın yapısına ve seçilen malzemenin ısı iletkenliğine göre <strong>U değeri hesabıyla</strong> belirlenir; konutlarda genellikle birkaç santimetreden 10 cm'ye kadar uzanan kalınlıklar görülür. Bu sayfada mantolamanın nasıl çalıştığını, kalınlığın ısı kaybını nasıl değiştirdiğini, metrekare ve malzeme hesabını, EPS-XPS-taşyünü farkını ve tasarrufun nasıl tahmin edileceğini bulacaksınız.",
  kisaCevap: [
    "Mantolama, dış duvarların dışarıdan yalıtım levhası, yapıştırıcı, dübel, file ve sıvayla kaplanmasıdır.",
    "Isı geçirgenliği U = 1 ÷ (Rsi + Σ kalınlık/λ + Rse); U küçüldükçe duvardan kaçan ısı azalır.",
    "Örnek bir yalıtımsız tuğla duvarda U ≈ 1,91 W/m²K iken λ = 0,035 olan 6 cm levhayla U ≈ 0,45'e iner; duvardan kaçan ısı yaklaşık %77 azalır.",
    "Mantolama alanı = toplam cephe alanı − pencere ve kapı boşlukları; levha adedi için fire payı eklenir.",
    "TS 825 standardı 2024'te güncellendi; ısı yalıtım bölgeleri 4'ten 6'ya çıktı ve yeni kurallar 1 Nisan 2025'ten itibaren uygulanıyor.",
    "Gerekli kalınlık projeye özel ısı yalıtım hesabıyla belirlenir; genel tablolar yalnızca fikir verir."
  ],
  figure: {
    alt: "Mantolama katmanlarını içten dışa gösteren duvar kesiti ve yanında yalıtım kalınlığı arttıkça duvarın U değerinin 1,91'den 0,30'a düşüşünü gösteren çubuk grafik.",
    caption: "Solda tipik bir mantolama kesiti: iç sıva, tuğla duvar, yapıştırıcı, yalıtım levhası, file gömülü sıva ve son kat kaplama. Sağda aynı duvarın λ = 0,035 W/mK levhayla farklı kalınlıklardaki U değeri. İlk santimetreler en büyük kazancı sağlar; kalınlık arttıkça her ek santimetrenin etkisi azalır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="170" y="30" class="b mid">Mantolama kesiti (içten dışa)</text>
  <rect x="40" y="50" width="14" height="300" class="sf sb"/>
  <rect x="54" y="50" width="96" height="300" class="dgs"/>
  <rect x="150" y="50" width="8" height="300" class="mu"/>
  <rect x="158" y="50" width="72" height="300" class="ps"/>
  <rect x="230" y="50" width="12" height="300" class="sf sb"/>
  <line x1="236" y1="50" x2="236" y2="350" class="sa dash" fill="none"/>
  <rect x="242" y="50" width="6" height="300" class="p"/>
  <g class="sm">
    <text x="47" y="372" class="mid">1</text><text x="102" y="372" class="mid">2</text><text x="154" y="372" class="mid">3</text>
    <text x="194" y="372" class="mid">4</text><text x="236" y="372" class="mid">5</text><text x="250" y="372">6</text>
  </g>
  <g class="sm">
    <text x="270" y="80">1 İç sıva</text>
    <text x="270" y="104">2 Duvar (tuğla)</text>
    <text x="270" y="128">3 Yapıştırıcı</text>
    <text x="270" y="152" class="b p">4 Yalıtım levhası</text>
    <text x="270" y="176">5 Sıva + file</text>
    <text x="270" y="200">6 Son kat kaplama</text>
  </g>
  <text x="40" y="400" class="sm t2">İç taraf (sıcak)</text><text x="250" y="400" class="sm t2 end">Dış taraf</text>
  <text x="560" y="30" class="b mid">Duvar U değeri (W/m²K)</text>
  <line x1="420" y1="350" x2="700" y2="350" class="st" fill="none"/>
  <rect x="430" y="68" width="34" height="282" class="dg"/>
  <text x="447" y="60" class="sm mid b">1,91</text><text x="447" y="370" class="sm mid">0 cm</text>
  <rect x="474" y="243" width="34" height="107" class="ps"/>
  <text x="491" y="235" class="sm mid">0,73</text><text x="491" y="370" class="sm mid">3</text>
  <rect x="518" y="262" width="34" height="88" class="ps"/>
  <text x="535" y="254" class="sm mid">0,60</text><text x="535" y="370" class="sm mid">4</text>
  <rect x="562" y="284" width="34" height="66" class="ok"/>
  <text x="579" y="276" class="sm mid b">0,45</text><text x="579" y="370" class="sm mid">6</text>
  <rect x="606" y="297" width="34" height="53" class="ok"/>
  <text x="623" y="289" class="sm mid">0,36</text><text x="623" y="370" class="sm mid">8</text>
  <rect x="650" y="306" width="34" height="44" class="ok"/>
  <text x="667" y="298" class="sm mid">0,30</text><text x="667" y="370" class="sm mid">10</text>
  <text x="560" y="396" class="sm mid t2">Yalıtım kalınlığı, λ = 0,035 W/mK</text>
</svg>`
  },
  sections: [
    {
      h: "Mantolama nedir, nasıl çalışır?",
      p: [
        "Isı her zaman sıcak taraftan soğuk tarafa akar. Kışın evinizin içindeki ısı duvarlar, çatı, pencereler ve hava sızıntıları üzerinden dışarı kaçar; kombi ya da kalorifer bu kaybı karşılamak için yakıt harcar. Mantolama, dış duvarlara düşük ısı iletkenliğine sahip bir katman ekleyerek bu akışı yavaşlatır.",
        "Uygulama dışarıdan yapılır: yalıtım levhaları yapıştırıcıyla duvara yapıştırılır, dübellerle sabitlenir, üzerine file gömülü bir sıva katmanı ve en son dekoratif kaplama uygulanır. Bu katmanların tamamına dış cephe ısı yalıtım sistemi de denir.",
        "Dışarıdan yalıtımın en önemli avantajı, kolon, kiriş ve döşeme uçları gibi duvardan daha hızlı ısı ileten bölgeleri de örtmesidir. Bu bölgelere <strong>ısı köprüsü</strong> denir; yalıtılmadıklarında hem ısı kaçağına hem de iç yüzeyde soğuk noktalara, yoğuşmaya ve küf oluşumuna yol açabilirler."
      ]
    },
    {
      h: "Kalınlık nasıl belirlenir? U değeri formülü",
      p: [
        "Bir duvarın ısı yalıtım performansı <strong>U değeri</strong> (ısı geçirgenlik katsayısı) ile ifade edilir. Birimi W/m²K'dir ve iç ile dış arasında 1 derece sıcaklık farkı olduğunda 1 m² duvardan kaç watt ısı geçtiğini gösterir. Her katmanın ısıl direnci kalınlığının ısı iletkenliğine (λ) bölünmesiyle bulunur; dirençler toplanır ve toplamın tersi U değerini verir."
      ],
      formula: "R (katman) = kalınlık (m) ÷ λ (W/mK)\nU = 1 ÷ (Rsi + R₁ + R₂ + … + Rse)\nIsı kaybı (W) = U × alan (m²) × sıcaklık farkı (°C)\nRsi ≈ 0,13 · Rse ≈ 0,04 (duvar için iç ve dış yüzey dirençleri)",
      after: [
        "Örnek bir duvar düşünelim: 2 cm iç sıva (λ ≈ 0,87), 13,5 cm yatay delikli tuğla (örnek λ ≈ 0,45), 3 cm dış sıva (λ ≈ 1,0). Dirençlerin toplamı 0,13 + 0,023 + 0,300 + 0,030 + 0,04 = 0,523 m²K/W eder ve U = 1 ÷ 0,523 ≈ 1,91 W/m²K bulunur. Aynı duvara λ = 0,035 olan 6 cm levha eklendiğinde levhanın direnci 0,06 ÷ 0,035 = 1,714 olur; toplam 2,237'ye çıkar ve U ≈ 0,45 W/m²K'ye iner.",
        "Malzemelerin gerçek λ değerleri ürün belgesinde yazar. Kendi duvarınızın U değerini ve yalıtımın etkisini [[arac:isi-kaybi-hesapla|ısı kaybı hesaplama aracı]] ile katman katman görebilirsiniz."
      ]
    },
    {
      h: "Mantolama kaç cm olmalı? Kalınlığın etkisi",
      p: [
        "Yukarıdaki örnek duvarda yalıtım kalınlığını artırdıkça U değerinin nasıl değiştiğine bakalım. Tablodaki son sütun, yalıtımsız duruma göre duvardan kaçan ısının yüzde kaç azaldığını gösterir."
      ],
      table: {
        head: ["Levha kalınlığı (λ = 0,035)", "Duvar U değeri (W/m²K)", "Duvar ısı kaybındaki azalma"],
        rows: [
          ["Yalıtımsız", "1,91", "—"],
          ["3 cm", "0,73", "%62"],
          ["4 cm", "0,60", "%69"],
          ["5 cm", "0,51", "%73"],
          ["6 cm", "0,45", "%77"],
          ["8 cm", "0,36", "%81"],
          ["10 cm", "0,30", "%85"]
        ],
        caption: "Değerler örnek duvar ve örnek λ değerleriyle hesaplanmıştır; yalnızca duvar kaybını gösterir. Çatı, pencere ve havalandırma kayıpları ayrıca vardır."
      },
      after: [
        "Tablodan iki sonuç çıkar. Birincisi, ilk birkaç santimetre en büyük kazancı sağlar: 0'dan 4 cm'ye çıkmak kaybı üçte birine indirirken 8'den 10 cm'ye çıkmak yalnızca birkaç puanlık iyileşme getirir. İkincisi, \"kaç cm\" sorusunun cevabı malzemeye de bağlıdır: λ değeri daha düşük bir levhayla aynı U değerine daha ince bir katmanla ulaşılır.",
        "Türkiye'de yeni binalar ve esaslı tadilatlar için asgari yalıtım koşulları <strong>TS 825 Binalarda Isı Yalıtım Kuralları</strong> standardıyla belirlenir. Standart Ekim 2024'te güncellendi; ısı yalıtım bölgesi sayısı 4'ten 6'ya çıktı ve yeni kurallar 1 Nisan 2025'ten itibaren uygulanmaya başladı. Hangi ilin hangi bölgede olduğu ve bölgeye göre izin verilen en yüksek U değerleri standardın ekinde yer alır. Kesin kalınlık için projenizin ısı yalıtım hesabını ya da yetkili bir mühendisin hesabını esas alın."
      ]
    },
    {
      h: "EPS, XPS ve taşyünü arasındaki fark",
      p: [
        "Mantolamada en sık kullanılan üç levha türü genleştirilmiş polistiren (EPS), ekstrüde polistiren (XPS) ve taşyünüdür. Hepsi düşük ısı iletkenliğine sahiptir ama nem, yangın davranışı, buhar geçirgenliği ve fiyat bakımından farklılaşır."
      ],
      table: {
        head: ["Özellik", "EPS", "XPS", "Taşyünü"],
        rows: [
          ["Görünüm", "Beyaz ya da gri (grafitli), boncuklu yapı", "Renkli, kapalı gözenekli düzgün yüzey", "Lifli, yoğun levha"],
          ["Tipik λ aralığı (W/mK)", "Yaklaşık 0,031–0,040", "Yaklaşık 0,030–0,036", "Yaklaşık 0,034–0,040"],
          ["Su emme", "Düşük", "Çok düşük", "Suya karşı korunmalı"],
          ["Yangın davranışı", "Yanıcı sınıf; yangın bariyeri gerekebilir", "Yanıcı sınıf", "Yanmaz sınıf"],
          ["Buhar geçirgenliği", "Orta", "Düşük", "Yüksek"],
          ["Tipik kullanım", "Konut cepheleri", "Temel, bodrum, zemine yakın bölgeler", "Yüksek binalar, yangın riski yüksek cepheler"]
        ],
        caption: "λ aralıkları genel bilgidir; seçtiğiniz ürünün beyan edilen değerini ürün belgesinden okuyun."
      },
      after: [
        "Gri renkli grafit katkılı EPS levhalar, beyaz EPS'ye göre daha düşük λ değerine sahiptir; bu sayede aynı performansa biraz daha ince levhayla ulaşılabilir. Yüksek binalarda ve yangın yönetmeliğinin özel koşul aradığı yapılarda malzeme seçimini proje ve yönetmelik belirler; bu konuda yalnızca fiyat üzerinden karar vermeyin."
      ]
    },
    {
      h: "Mantolama metrekaresi ve malzeme hesabı",
      p: [
        "Mantolama alanı, binanın dış cephe alanından pencere ve kapı boşlukları çıkarılarak bulunur. Her cephe için uzunluk × yükseklik hesaplanır, dört cephe toplanır, sonra boşluklar düşülür. Pencere kenarlarındaki dönüşler (söve) ve çatı saçağı altları ayrıca ölçülür."
      ],
      ol: [
        "Cepheleri ölçün: 15 m ve 6 m uzunluğunda iki çift cephe, yükseklik 20 m. Toplam: 2 × (15 + 6) × 20 = 840 m². Bu örnekte yalnızca yarısının mantolanacağını varsayalım: 420 m².",
        "Boşlukları düşün: pencere ve balkon kapısı boşlukları toplam 90 m² olsun. Net alan 420 − 90 = 330 m².",
        "Levha: %5 fireyle 330 × 1,05 = 346,5 m². 0,5 m²'lik levhalardan 346,5 ÷ 0,5 = 693 adet.",
        "Yapıştırıcı: örnek sarfiyat 4,5 kg/m² ise 330 × 4,5 = 1.485 kg, 25 kg'lık torbadan 60 torba.",
        "Sıva: örnek sarfiyat 4,5 kg/m² ise yine 1.485 kg, 60 torba.",
        "Dübel: metrekareye 6 adet ise 330 × 6 = 1.980 adet. File: fireli alan ve %10 bindirme ile 346,5 × 1,1 ≈ 381 m²."
      ],
      after: [
        "Sarfiyat değerleri ürünlere ve duvarın düzgünlüğüne göre değişir; torba üzerindeki değeri kullanın. [[arac:mantolama-hesapla|Mantolama hesaplama aracı]] cephe alanını, boşlukları ve sarfiyatları alarak levha, yapıştırıcı, sıva, dübel ve file miktarını birlikte verir. Cephe alanını hesaplamak için [[arac:duvar-alani-hesapla|duvar alanı aracı]]ndan da yararlanabilirsiniz."
      ]
    },
    {
      h: "Mantolama doğalgazda ne kadar tasarruf sağlar?",
      p: [
        "Tasarruf, binanın toplam ısı kaybında duvarların payına, iklime, eski duvarın yapısına ve evinizi kaç derecede tuttuğunuza bağlıdır. Bu yüzden \"her evde yüzde şu kadar\" gibi tek bir rakam vermek yanıltıcı olur. Ancak duvarın kendi kaybındaki değişimi hesaplayarak mantıklı bir tahmin yapabilirsiniz."
      ],
      formula: "Mevsimlik duvar kaybı (kWh) = U × alan × derece-gün × 24 ÷ 1.000\nGaz karşılığı (m³) ≈ kWh ÷ (gazın ısıl değeri × kombi verimi)",
      after: [
        "Örnek: 100 m² dış duvarı olan bir dairede, örnek olarak 2.000 derece-günlük bir ısıtma sezonu düşünelim. Yalıtımsız duvar (U = 1,91) sezonda yaklaşık 1,91 × 100 × 2.000 × 24 ÷ 1.000 ≈ 9.170 kWh ısı kaybeder. 6 cm mantolamayla (U = 0,45) bu değer yaklaşık 2.150 kWh'ye iner. Aradaki yaklaşık 7.000 kWh, 10,64 kWh/m³ ısıl değer ve %90 kombi verimiyle yaklaşık 730 m³ doğalgaza karşılık gelir.",
        "Derece-gün değeri şehirden şehre büyük fark gösterir; soğuk illerde tasarruf daha yüksek, ılıman illerde daha düşük çıkar. Ayrıca yalıtımsız binalarda pencere ve çatıdan kaçan ısı da büyüktür; mantolama bunları çözmez. Tasarrufu paraya çevirmek için [[arac:dogalgaz-tuketim-hesapla|doğalgaz tüketim hesaplama aracı]]yla kWh'yi m³'e çevirip güncel birim fiyatı uygulayabilirsiniz. Kombi kapasitesiyle ilişkisini [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası ve kombi kapasitesi]] yazımız anlatır."
      ]
    },
    {
      h: "Tek daireye mantolama yapılabilir mi?",
      p: [
        "Apartmanlarda dış cephe, Kat Mülkiyeti Kanunu'na göre ortak yerdir. Cephede yapılacak bir değişiklik için kat malikleri kurulunun kararı gerekir; gerekli çoğunluk ve masrafların paylaşımı kanuna ve yönetim planına göre belirlenir. Bu yüzden bir daire sahibinin kendi başına yalnızca kendi cephesini mantolatması hem hukuki hem teknik sorun doğurabilir.",
        "Teknik açıdan da tek dairelik mantolama sınırlı fayda sağlar: komşu dairelerle birleşim çizgilerinde ısı köprüleri kalır, cephede renk ve doku farkı oluşur. Karar alınamayan binalarda bazı daire sahipleri iç yüzeyden yalıtım ya da ısı yalıtımlı iç kaplama gibi yöntemlere yönelir; bu yöntemlerin yoğuşma riski ayrıca değerlendirilmelidir. Uyuşmazlık durumunda hukuki destek almanız önerilir."
      ]
    },
    {
      h: "Mantolama ne zaman yapılmalı?",
      p: [
        "Yapıştırıcı ve sıvaların düzgün kuruyup prizini alması için hava sıcaklığının uygun aralıkta olması gerekir. Ürün belgelerinde genellikle donma riski olan günlerde, yağmurda ve çok sıcak, doğrudan güneş alan saatlerde uygulama yapılmaması önerilir. Türkiye'nin büyük bölümünde ilkbahar sonu ile sonbahar başı arası en uygun dönemdir.",
        "Kışa yakın aylarda talep yoğunlaştığı için ekip bulmak ve iskele kurmak zorlaşabilir. Site yönetimlerinin kararı, teklif toplamayı ve ödeme planını yaz başından önce tamamlaması, uygulamanın ideal hava koşullarında yapılmasını sağlar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca kalınlığa bakmak:</strong> Aynı kalınlıktaki iki levhanın λ değeri farklıysa yalıtım performansı da farklıdır; ürün belgesindeki beyan değerini karşılaştırın.",
        "<strong>Dübel ve fileden tasarruf:</strong> Eksik dübel rüzgâr yükünde levhaların ayrılmasına, eksik file sıvada çatlaklara yol açar.",
        "<strong>Söve ve ısı köprülerini atlamak:</strong> Pencere kenarları ve döşeme uçları yalıtılmazsa iç yüzeyde soğuk noktalar ve küf oluşabilir.",
        "<strong>Tasarrufu yalnızca mantolamadan beklemek:</strong> Tek camlı pencereler, yalıtımsız çatı ve hava sızıntıları sürerken beklenen tasarruf gerçekleşmez.",
        "<strong>Uygunsuz havada uygulama:</strong> Donma ya da yağmur altında yapılan uygulama yapıştırıcının tutmamasına ve sıvanın bozulmasına neden olabilir."
      ]
    },
    {
      h: "Araçlarla mantolama hesabı adımları",
      ol: [
        "Cephe ölçülerini çıkarın ve [[arac:duvar-alani-hesapla|duvar alanı aracı]]yla toplam alanı bulun.",
        "[[arac:mantolama-hesapla|Mantolama hesaplama aracı]]na cephe alanını, boşlukları, levha alanını ve ürün sarfiyatlarını yazın.",
        "Kalınlık seçeneklerini karşılaştırmak için [[arac:isi-kaybi-hesapla|ısı kaybı aracı]]nda duvar katmanlarını ve farklı levha kalınlıklarını deneyin.",
        "Tasarrufu tahmin etmek için kWh farkını [[arac:dogalgaz-tuketim-hesapla|doğalgaz tüketim aracı]]yla m³'e çevirin ve güncel tarifeyle çarpın."
      ]
    }
  ],
  faq: [
    ["Mantolama nedir?", "Mantolama, binanın dış duvarlarının dışarıdan ısı yalıtım levhalarıyla kaplanması, levhaların dübelle sabitlenip üzerine file gömülü sıva ve son kat kaplama uygulanmasıdır. Amaç duvarlardan kaçan ısıyı azaltmaktır."],
    ["Mantolama kaç cm olmalı?", "Tek bir doğru kalınlık yoktur. Binanın ısı yalıtım bölgesi, duvarın yapısı ve levhanın ısı iletkenliğine göre TS 825 hesabıyla belirlenir. Konutlarda birkaç santimetreden 10 cm'ye kadar kalınlıklar yaygındır."],
    ["Mantolama metrekaresi nasıl hesaplanır?", "Her cephenin uzunluğu yüksekliğiyle çarpılır, cepheler toplanır ve pencere ile kapı boşlukları çıkarılır. Levha ihtiyacı için net alana %5 civarında fire payı eklenir ve levha alanına bölünür."],
    ["EPS, XPS ve taşyünü arasındaki fark nedir?", "EPS ekonomik ve yaygın konut levhasıdır. XPS kapalı gözenekli olduğu için suya dayanıklıdır, temel ve bodrumda tercih edilir. Taşyünü yanmaz sınıftadır ve yangın riskinin önemli olduğu cephelerde kullanılır."],
    ["Mantolama doğalgazda ne kadar tasarruf sağlar?", "Tasarruf iklime, duvarın eski hâline ve binanın diğer kayıplarına bağlıdır. Örnek bir tuğla duvarda 6 cm mantolama duvardan kaçan ısıyı yaklaşık %77 azaltır; toplam faturadaki etki ise pencere ve çatı kayıplarına göre daha düşük olabilir."],
    ["Tek daireye mantolama yapılabilir mi?", "Dış cephe ortak yer olduğu için kat malikleri kurulunun kararı gerekir. Tek dairelik uygulama ısı köprüleri ve cephe görünümü bakımından da sınırlı fayda sağlar; karar alınamıyorsa iç yalıtım seçenekleri bir uzmanla değerlendirilebilir."],
    ["Isı yalıtım bölgeleri nedir?", "Isı yalıtım bölgeleri, Türkiye'nin iklim koşullarına göre ayrıldığı ve her bölge için izin verilen en yüksek U değerlerinin belirlendiği bölgelerdir. TS 825'in 2024 güncellemesiyle bölge sayısı 4'ten 6'ya çıkmıştır."],
    ["Mantolama ne zaman yapılmalı?", "Yapıştırıcı ve sıvaların düzgün kuruması için donma riski olmayan, yağmursuz ve aşırı sıcak olmayan günler tercih edilir. Türkiye'nin büyük bölümünde ilkbahar sonu ile sonbahar başı en uygun dönemdir."],
    ["Mantolama küf sorununu çözer mi?", "Duvar iç yüzeyindeki küf çoğunlukla soğuk yüzeyde yoğuşmadan kaynaklanır. Doğru uygulanmış mantolama iç yüzey sıcaklığını yükselterek bu riski azaltır; ancak yetersiz havalandırma sürüyorsa küf tamamen geçmeyebilir."]
  ],
  tools: ["mantolama-hesapla", "isi-kaybi-hesapla", "dogalgaz-tuketim-hesapla", "duvar-alani-hesapla"],
  related: ["dogalgaz-faturasi-ve-kombi-kapasitesi", "bir-duvara-kac-tugla-gider"],
  sources: [
    ["Türk Standardları Enstitüsü – TS 825", "https://www.tse.org.tr/"],
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", "https://www.csb.gov.tr/"]
  ]
};
