export default {
  slug: "sayi-dizisi-sorulari-nasil-cozulur",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Sayı Dizisi Soruları Nasıl Çözülür? Kural Bulma Yöntemleri ve Örnekler",
  pageTitle: "Sayı Dizisi Soruları Nasıl Çözülür? 7 Kural Bulma Yöntemi",
  description: "Sayı dizisi sorularında önce ardışık farklara, sonra oranlara bakın; iç içe dizi, Fibonacci, kare-küp ve ikinci fark kalıplarını çözümlü 10 örnekle öğrenin.",
  keywords: ["sayı dizisi soruları", "sayı dizisi kuralı bulma", "örüntü soruları", "sayısal mantık soruları", "kpss sayı dizisi", "fark dizisi", "fibonacci dizisi soruları", "ardışık farklar yöntemi"],
  lead: "Sayı dizisi sorularını çözmenin en hızlı yolu sabit bir kontrol sırası izlemektir: önce <strong>ardışık farklara</strong>, sonra <strong>ardışık oranlara</strong>, ardından <strong>tek ve çift sıradaki terimlere ayrı ayrı</strong>, en son da kare, küp, asal ve Fibonacci gibi bilinen kalıplara bakılır. Çoğu soru bu sıradaki ilk üç adımdan birinde çözülür. Bu sayfada yedi temel kalıbı, her biri için çözümlü örnekleri, sınavlarda süre yönetimini ve sık düşülen tuzakları anlatıyoruz.",
  kisaCevap: [
    "İlk adım ardışık farkları yazmaktır: 2, 5, 10, 17, 26 dizisinin farkları 3, 5, 7, 9 olduğundan sonraki terim 37'dir.",
    "Farklar düzensizse oranlara bakın: 3, 6, 12, 24 dizisinde her terim 2 ile çarpılır, sonraki 48'dir.",
    "Farklar da bir dizi oluşturuyorsa ikinci farka bakın: 3, 4, 8, 17, 33 dizisinde farklar 1, 4, 9, 16 kare sayılardır, sonraki 58'dir.",
    "Sayılar bir büyüyüp bir küçülüyorsa iki iç içe dizi vardır: 2, 10, 4, 20, 8 dizisinde sonraki terim 40'tır.",
    "Fibonacci türünde her terim önceki ikisinin toplamıdır: 1, 1, 2, 3, 5, 8 → 13.",
    "Hızlı büyüyen dizilerde kare, küp, faktöriyel ya da \"×2 + 1\" gibi karma kurallar aranır."
  ],
  figure: {
    alt: "Sayı dizisi kural bulma akış şeması: önce ardışık farklar, sonra oranlar, sonra tek ve çift sıralı terimler, en son bilinen kalıplar; yanında 3, 4, 8, 17, 33 dizisinin ikinci fark yöntemiyle 58 olarak çözülmesi.",
    caption: "Kontrol sırası: fark → oran → iç içe dizi → bilinen kalıp. Sağdaki örnekte birinci farklar 1, 4, 9, 16 kare sayılardır; sonraki fark 25 olduğundan dizinin sonraki terimi 33 + 25 = 58'dir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="t2"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Kural bulma sırası</text>
  <g>
    <rect x="30" y="54" width="300" height="56" rx="8" class="p"/>
    <text x="180" y="78" class="b mid sf">1. Ardışık farklar</text>
    <text x="180" y="98" class="sm mid sf">sabit ya da düzenli mi?</text>
    <line x1="180" y1="110" x2="180" y2="128" class="st" fill="none" marker-end="url(#ok)"/>
    <rect x="30" y="132" width="300" height="56" rx="8" class="ps"/>
    <text x="180" y="156" class="b mid">2. Ardışık oranlar</text>
    <text x="180" y="176" class="sm mid t2">×2, ×3, ÷2 …</text>
    <line x1="180" y1="188" x2="180" y2="206" class="st" fill="none" marker-end="url(#ok)"/>
    <rect x="30" y="210" width="300" height="56" rx="8" class="ps"/>
    <text x="180" y="234" class="b mid">3. Tek ve çift sıralar ayrı</text>
    <text x="180" y="254" class="sm mid t2">iç içe iki dizi</text>
    <line x1="180" y1="266" x2="180" y2="284" class="st" fill="none" marker-end="url(#ok)"/>
    <rect x="30" y="288" width="300" height="56" rx="8" class="sf sb"/>
    <text x="180" y="312" class="b mid">4. Bilinen kalıplar</text>
    <text x="180" y="332" class="sm mid t2">kare, küp, asal, Fibonacci</text>
  </g>
  <rect x="360" y="54" width="330" height="290" rx="8" class="sf sb"/>
  <text x="525" y="80" class="b mid">Örnek: 3, 4, 8, 17, 33, ?</text>
  <g class="mid">
    <text x="400" y="122" class="lg b">3</text><text x="455" y="122" class="lg b">4</text><text x="510" y="122" class="lg b">8</text><text x="565" y="122" class="lg b">17</text><text x="620" y="122" class="lg b">33</text><text x="670" y="122" class="lg b p">58</text>
    <text x="427" y="164" class="ok b">+1</text><text x="482" y="164" class="ok b">+4</text><text x="537" y="164" class="ok b">+9</text><text x="592" y="164" class="ok b">+16</text><text x="645" y="164" class="p b">+25</text>
    <text x="455" y="206" class="sm t2">1²</text><text x="510" y="206" class="sm t2">2²</text><text x="565" y="206" class="sm t2">3²</text><text x="620" y="206" class="sm t2">4²</text><text x="670" y="206" class="sm p b">5²</text>
  </g>
  <text x="380" y="252" class="sm">Birinci farklar 1, 4, 9, 16: kare sayılar.</text>
  <text x="380" y="276" class="sm">Sonraki fark 5² = 25.</text>
  <rect x="380" y="292" width="290" height="36" rx="6" class="oks"/>
  <text x="525" y="316" class="b mid ok">Cevap: 33 + 25 = 58</text>
  <rect x="30" y="362" width="660" height="44" rx="8" class="sf sb"/>
  <text x="360" y="390" class="sm mid">İpucu: her soruya en fazla 60–75 saniye ayırın; kural çıkmazsa işaretleyip geçin.</text>
</svg>`
  },
  sections: [
    {
      h: "Sayı dizisi sorusu nedir, nerelerde çıkar?",
      p: [
        "Sayı dizisi soruları, belirli bir kurala göre dizilmiş sayıların ardından gelecek terimi ya da aradaki eksik terimi bulmanızı ister. Ölçülen beceri matematik bilgisinden çok örüntü tanıma, yani sayıların arasındaki ilişkiyi hızlıca fark edebilmektir. Kural genellikle toplama, çarpma, kuvvet alma ya da bunların birleşiminden oluşur.",
        "Bu soru tipi KPSS ve ALES gibi sınavların sayısal mantık kısımlarında, özel sektör ve kamu kurumlarının işe alım yetenek testlerinde, askerî ve polis okullarının sınavlarında ve zekâ testlerinde sıkça yer alır. Okul matematiğindeki aritmetik ve geometrik diziler de bu soruların temelini oluşturur."
      ]
    },
    {
      h: "Ardışık farklar yöntemi nedir?",
      p: [
        "Bir dizide her terimden bir öncekini çıkararak elde ettiğiniz sayılara <strong>birinci farklar</strong> denir. Farklar sabitse dizi aritmetiktir ve her adımda aynı sayı eklenir. Farklar sabit değil de kendi aralarında düzenli artıyorsa, farkların farkına, yani <strong>ikinci farklara</strong> bakılır. İkinci farklar sabitse dizi ikinci dereceden bir kurala uyar."
      ],
      ol: [
        "Diziyi yazın: 2, 5, 10, 17, 26.",
        "Birinci farkları altına yazın: 3, 5, 7, 9.",
        "Farkların kendisi düzenli mi? Her biri 2 artıyor; ikinci farklar sabit 2.",
        "Sonraki birinci fark 11 olur; sonraki terim 26 + 11 = 37.",
        "Kontrol: Dizi n² + 1 kuralına da uyar (1² + 1 = 2, 2² + 1 = 5 … 6² + 1 = 37)."
      ],
      after: [
        "İkinci farklar da sabit değilse üçüncü farka gitmek yerine farkların bilinen bir kalıp olup olmadığına bakın. 5, 7, 11, 19, 35 dizisinde farklar 2, 4, 8, 16'dır; bunlar her adımda ikiye katlanır. Sonraki fark 32, sonraki terim 35 + 32 = 67'dir. Sabit farklı dizilerin genel terim formülünü [[bilgi:aritmetik-ve-geometrik-dizi-formulleri|aritmetik ve geometrik dizi formülleri makalesinde]] bulabilirsiniz."
      ]
    },
    {
      h: "Çarpımsal (geometrik) diziler nasıl tanınır?",
      p: [
        "Terimler hızla büyüyor ya da küçülüyorsa ve farklar düzensiz görünüyorsa, ardışık terimlerin birbirine oranına bakın. Oran sabitse dizi <strong>geometriktir</strong>: 3, 6, 12, 24 dizisinde her terim bir öncekinin 2 katıdır ve sonraki terim 48'dir. 81, 27, 9, 3 dizisinde oran 1/3'tür ve sonraki terim 1'dir.",
        "Oran sabit değil de düzenli değişebilir. 1, 2, 6, 24, 120 dizisinde çarpanlar ×2, ×3, ×4, ×5'tir; sonraki terim 120 × 6 = 720 olur (bu dizi faktöriyellerdir). Bir diğer sık kalıp çarpma ile toplamanın birleşimidir: 4, 9, 19, 39 dizisinde her terim \"önceki × 2 + 1\" kuralıyla bulunur ve sonraki terim 79'dur."
      ],
      table: {
        head: ["Dizi", "Kural", "Sonraki terim"],
        rows: [
          ["3, 6, 12, 24", "×2", "48"],
          ["81, 27, 9, 3", "÷3", "1"],
          ["1, 2, 6, 24, 120", "×2, ×3, ×4, ×5", "720"],
          ["4, 9, 19, 39", "×2 + 1", "79"],
          ["2, 6, 18, 54", "×3", "162"]
        ]
      },
      after: [
        "Geometrik dizinin n. terimini ve toplamını hesaplamak için [[arac:geometrik-dizi-hesapla|Geometrik Dizi Hesaplama]], sabit farklı diziler için [[arac:aritmetik-dizi-hesapla|Aritmetik Dizi Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "İç içe iki dizi olan sorular nasıl çözülür?",
      p: [
        "Sayılar bir büyüyüp bir küçülüyor, ya da farklar bir artı bir eksi gidiyorsa, dizi büyük olasılıkla iki ayrı dizinin iç içe geçmesinden oluşur. Bu durumda tek sıradaki terimleri (1., 3., 5. …) ve çift sıradaki terimleri (2., 4., 6. …) ayrı ayrı yazın.",
        "Örnek: 2, 10, 4, 20, 8, ? dizisinde tek sıralar 2, 4, 8'dir ve her biri 2 katına çıkar. Çift sıralar 10, 20'dir ve aynı şekilde 2 katına çıkar. Sorulan terim altıncı terim olduğu için çift sıradaki dizinin devamıdır: 20 × 2 = 40.",
        "İkinci bir örnek: 1, 12, 3, 10, 5, 8, ? dizisinde tek sıralar 1, 3, 5 (her adımda +2), çift sıralar 12, 10, 8'dir (her adımda −2). Sorulan yedinci terim tek sıraya aittir ve 7'dir. Bu tip sorularda sorulan terimin hangi sıraya düştüğünü belirlemek çözümün yarısıdır."
      ]
    },
    {
      h: "Fibonacci, kare ve küp kalıpları",
      p: [
        "Bazı diziler doğrudan bilinen sayı ailelerinden oluşur. Bu kalıpları ezbere tanımak, sınavda ciddi zaman kazandırır."
      ],
      table: {
        head: ["Kalıp", "Örnek dizi", "Kural", "Sonraki"],
        rows: [
          ["Fibonacci", "1, 1, 2, 3, 5, 8", "Önceki iki terimin toplamı", "13"],
          ["Fibonacci benzeri", "2, 3, 5, 8, 13", "Önceki iki terimin toplamı", "21"],
          ["Kare sayılar", "1, 4, 9, 16, 25", "n²", "36"],
          ["Küp sayılar", "1, 8, 27, 64", "n³", "125"],
          ["Kare + 1", "2, 5, 10, 17, 26", "n² + 1", "37"],
          ["Ardışık çarpım", "2, 6, 12, 20, 30", "n × (n + 1)", "42"],
          ["Asal sayılar", "2, 3, 5, 7, 11", "Sıradaki asal", "13"]
        ]
      },
      after: [
        "Fibonacci türü dizilerde başlangıç terimleri farklı olabilir: 4, 7, 11, 18, 29 dizisi de \"önceki ikisinin toplamı\" kuralına uyar ve sonraki terim 47'dir. Kare ve küp sayıları 1'den 15'e kadar, asalları da 50'ye kadar bilmek bu kalıpları ilk bakışta tanımanızı sağlar. Asal sayıların özellikleri için [[bilgi:asal-sayilar-nedir|asal sayılar makalesine]] bakabilirsiniz."
      ]
    },
    {
      h: "Adım adım genel çözüm stratejisi",
      ol: [
        "<strong>Büyüme hızına bakın.</strong> Yavaş ve düzenli büyüyorsa farklarla, hızlı büyüyorsa oranlarla başlayın.",
        "<strong>Farkları yazın.</strong> Sabitse aritmetik; düzenli artıyorsa ikinci farka ya da farkların kalıbına bakın.",
        "<strong>Oranları deneyin.</strong> Sabit oran, artan çarpan ya da \"× a + b\" türü karma kurallar.",
        "<strong>İşaret ve yön değişimine bakın.</strong> İnip çıkıyorsa tek ve çift sıraları ayırın.",
        "<strong>Bilinen kalıpları tarayın.</strong> Kare, küp, asal, Fibonacci, faktöriyel.",
        "<strong>Kuralı tüm terimlerde doğrulayın.</strong> Yalnızca ilk iki üç terime uyan kural yanlış olabilir.",
        "<strong>Seçeneklerden geriye gidin.</strong> Çoktan seçmeli sorularda seçenekleri dizinin son terimiyle karşılaştırmak kuralı ele verebilir."
      ]
    },
    {
      h: "Bir dizi sorusunu kaç saniyede çözmek gerekir?",
      p: [
        "Sınavın türüne göre değişmekle birlikte, sayısal mantık bölümlerinde soru başına ortalama süre genellikle bir dakika civarındadır. Pratik bir hedef, kolay dizileri 20–30 saniyede, orta zorluktakileri 60 saniyede çözmek ve 75 saniyeyi aşan soruyu işaretleyip geçmektir. Tek bir soruda takılmak, çözebileceğiniz birkaç soruyu kaybetmenize yol açar.",
        "Hız, çözülen soru sayısıyla gelişir. Her gün kısa bir set çözüp yanlış yaptığınız soruların kuralını not etmek, hangi kalıplarda zorlandığınızı gösterir. Kendinizi sınamak için [[arac:sayi-dizisi-testi|Sayı Dizisi Testi]] 12 dakikada 15 soru sunar ve sonunda her sorunun kuralını açıklar; sayı benzetmesi ve farklı sayıyı bulma sorularını da içeren daha geniş bir set için [[arac:sayisal-zeka-testi|Sayısal Zekâ Testi]] aracını kullanabilirsiniz. Günlük çalışma planı kurmak için [[bilgi:gunde-kac-soru-cozulmeli|günde kaç soru çözülmeli makalesindeki]] önerilere göz atın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kuralı iki terimden çıkarmak:</strong> 2, 4 ile başlayan dizi ×2 de olabilir, +2 de; üçüncü terimi görmeden karar vermeyin.",
        "<strong>Sorulan terimin sırasını karıştırmak:</strong> İç içe dizilerde cevap, sorulan terimin hangi alt diziye ait olduğuna göre değişir.",
        "<strong>İşlem hatası:</strong> Kural doğru bulunsa bile son toplama ya da çarpmada yapılan hata cevabı yanlışlar; son adımı tekrar kontrol edin.",
        "<strong>Eksik terimli sorularda yalnızca bir tarafa bakmak:</strong> Ortadaki boşluk için kuralı hem öncesindeki hem sonrasındaki terimlerle doğrulayın.",
        "<strong>Her soruda karmaşık kural aramak:</strong> Çoğu soru basit fark ya da oranla çözülür; önce basit olanı deneyin."
      ]
    }
  ],
  faq: [
    ["Sayı dizisi sorularında kural nasıl bulunur?", "Sabit bir sıra izlenir: önce ardışık farklar, sonra ardışık oranlar, ardından tek ve çift sıradaki terimler ayrı ayrı, en son kare, küp, asal ve Fibonacci gibi bilinen kalıplar kontrol edilir. Bulunan kural tüm terimlerde doğrulanır."],
    ["Ardışık farklar yöntemi nedir?", "Her terimden bir öncekini çıkararak farklar dizisi elde edilir. Farklar sabitse dizi aritmetiktir; farklar düzenli değişiyorsa ikinci farklara bakılır. 2, 5, 10, 17, 26 dizisinde farklar 3, 5, 7, 9 olduğundan sonraki terim 37'dir."],
    ["Çarpımsal (geometrik) diziler nasıl tanınır?", "Terimler hızla büyüyor ya da küçülüyorsa ardışık terimlerin oranına bakılır. Oran sabitse dizi geometriktir; 3, 6, 12, 24 dizisinde oran 2'dir ve sonraki terim 48 olur. Oran düzenli değişen diziler de vardır."],
    ["İç içe iki dizi olan sorular nasıl çözülür?", "Tek sıradaki ve çift sıradaki terimler ayrı ayrı yazılır ve her birinin kuralı bulunur. 2, 10, 4, 20, 8 dizisinde tek sıralar ve çift sıralar ikiye katlanır; altıncı terim çift sıraya ait olduğu için 40'tır."],
    ["Fibonacci türü dizilerde sonraki terim nasıl bulunur?", "Her terim kendinden önceki iki terimin toplamıdır. 1, 1, 2, 3, 5, 8 dizisinde sonraki terim 5 + 8 = 13'tür. Başlangıç terimleri farklı olsa da aynı kural uygulanır; 4, 7, 11, 18, 29 dizisinin devamı 47'dir."],
    ["Kare ve küp sayılarla kurulan diziler nasıl fark edilir?", "Terimler 1, 4, 9, 16 ya da 1, 8, 27, 64 gibi tanıdık değerlerse ya da birinci farklar kare sayılar oluşturuyorsa bu kalıptan şüphelenilir. 1'den 15'e kadar kare ve küpleri bilmek bu soruları birkaç saniyede çözmeyi sağlar."],
    ["Örüntü soruları hangi sınavlarda çıkar?", "KPSS ve ALES gibi sınavların sayısal mantık kısımlarında, kamu ve özel sektör işe alım yetenek testlerinde, askerî ve polis okulu sınavlarında ve zekâ testlerinde sıkça yer alır."],
    ["Bir dizi sorusunu kaç saniyede çözmek gerekir?", "Sayısal mantık bölümlerinde soru başına ortalama süre bir dakika civarındadır. Kolay dizileri yarım dakikada çözmek, 75 saniyeyi aşan soruyu işaretleyip geçmek ve sonra geri dönmek iyi bir stratejidir."],
    ["Dizide eksik olan ortadaki terim nasıl bulunur?", "Boşluğun öncesindeki ve sonrasındaki terimlerden kural çıkarılır ve aday değer her iki tarafla doğrulanır. Örneğin 3, 6, ?, 24, 48 dizisinde oran 2 olduğundan eksik terim 12'dir ve 24 ile de uyumludur."]
  ],
  tools: ["sayi-dizisi-testi", "sayisal-zeka-testi", "aritmetik-dizi-hesapla", "geometrik-dizi-hesapla"],
  related: ["aritmetik-ve-geometrik-dizi-formulleri", "matris-sorulari-raven-testi-nedir", "asal-sayilar-nedir"]
};
