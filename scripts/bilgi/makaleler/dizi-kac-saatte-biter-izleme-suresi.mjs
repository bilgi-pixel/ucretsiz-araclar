export default {
  slug: "dizi-kac-saatte-biter-izleme-suresi",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Bir Dizi Kaç Saatte Biter? Toplam İzleme Süresi ve Günlük Bölüm Planı",
  pageTitle: "Dizi Kaç Saatte Biter? Toplam İzleme Süresi Hesaplama",
  description: "Dizi süresi = bölüm sayısı × ortalama bölüm süresi. 50 bölüm × 47 dk = 39 sa 10 dk; günde 2 bölümle 25 gün. Hızlı izleme, film bitiş saati ve mola.",
  keywords: ["dizi kaç saatte biter", "dizi izleme süresi hesaplama", "toplam izleme süresi", "günde kaç bölüm", "dizi maratonu", "bölüm süresi toplama", "film bitiş saati", "1,25x izleme"],
  lead: "Bir dizinin kaç saatte biteceğini bulmak için toplam bölüm sayısını ortalama bölüm süresiyle çarpmanız yeterlidir: 5 sezon, 10'ar bölüm ve bölüm başına 47 dakikalık bir dizi 50 × 47 = 2.350 dakika, yani 39 saat 10 dakika eder. Günde 2 bölüm izlerseniz dizi 25 günde biter. Bu sayfada sezonlara göre değişen bölüm sürelerini toplamayı, 1,25x ve 1,5x hızın ne kadar zaman kazandırdığını, bir filmin bitiş saatini ve haftalık ekran süresini hesaplamayı örneklerle anlatıyoruz.",
  kisaCevap: [
    "Toplam süre = bölüm sayısı × ortalama bölüm süresi; sonuç dakikaysa 60'a bölüp saate çevirin.",
    "Kaç günde biter = toplam bölüm ÷ günlük bölüm sayısı; küsurat çıkarsa bir üst tam sayıya yuvarlayın.",
    "Hızlı izlemede süre hız katsayısına bölünür: 1,25x süreyi %20, 1,5x yaklaşık %33 kısaltır.",
    "Film bitiş saati = başlama saati + film süresi (+ varsa reklam ve ara).",
    "Sezonlar arasında bölüm süreleri farklıysa her sezonu ayrı çarpıp toplamak daha doğru sonuç verir."
  ],
  figure: {
    alt: "Örnek dizi hesabı: 5 sezon çarpı 10 bölüm çarpı 47 dakika eşittir 2.350 dakika, 39 saat 10 dakika. Altta izleme hızına göre süre çubukları: 1x 39 saat 10 dakika, 1,25x 31 saat 20 dakika, 1,5x 26 saat 7 dakika. Sağda günde 2 bölümle 25 gün.",
    caption: "Aynı dizi üç farklı hızda: normal hızda 2.350 dakika, 1,25x hızda 1.880 dakika, 1,5x hızda yaklaşık 1.567 dakika. Günde 2 bölümle bitirme süresi 25 gündür.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bu dizi kaç saatte biter?</text>
  <rect x="20" y="50" width="130" height="70" rx="8" class="sf sb"/>
  <text x="85" y="82" class="xl mid">5</text><text x="85" y="106" class="sm mid t2">sezon</text>
  <text x="166" y="92" class="lg b mid">×</text>
  <rect x="182" y="50" width="130" height="70" rx="8" class="sf sb"/>
  <text x="247" y="82" class="xl mid">10</text><text x="247" y="106" class="sm mid t2">bölüm / sezon</text>
  <text x="328" y="92" class="lg b mid">×</text>
  <rect x="344" y="50" width="130" height="70" rx="8" class="sf sb"/>
  <text x="409" y="82" class="xl mid">47</text><text x="409" y="106" class="sm mid t2">dakika / bölüm</text>
  <text x="490" y="92" class="lg b mid">=</text>
  <rect x="506" y="50" width="194" height="70" rx="8" class="p"/>
  <text x="603" y="82" class="xl mid sf">2.350 dk</text><text x="603" y="106" class="sm mid sf">39 saat 10 dakika</text>
  <text x="20" y="160" class="b">İzleme hızına göre toplam süre</text>
  <text x="20" y="196" class="sm b">1x</text>
  <rect x="70" y="180" width="440" height="24" rx="4" class="ps"/>
  <text x="520" y="197" class="sm b">39 sa 10 dk</text>
  <text x="20" y="236" class="sm b">1,25x</text>
  <rect x="70" y="220" width="352" height="24" rx="4" class="oks"/>
  <text x="432" y="237" class="sm b">31 sa 20 dk</text>
  <text x="20" y="276" class="sm b">1,5x</text>
  <rect x="70" y="260" width="293" height="24" rx="4" class="oks"/>
  <text x="373" y="277" class="sm b">26 sa 7 dk</text>
  <rect x="20" y="306" width="420" height="80" rx="8" class="sf sb"/>
  <text x="36" y="332" class="b">Formül</text>
  <text x="36" y="356" class="sm">Hızlı süre = normal süre ÷ hız</text>
  <text x="36" y="376" class="sm">2.350 ÷ 1,25 = 1.880 dk (7 sa 50 dk kazanç)</text>
  <rect x="460" y="160" width="240" height="226" rx="8" class="ps"/>
  <text x="580" y="190" class="b mid">Günlük plan</text>
  <text x="580" y="226" class="sm mid">50 bölüm ÷ 2 bölüm/gün</text>
  <text x="580" y="270" class="xl mid p">25 gün</text>
  <text x="580" y="306" class="sm mid">Günde 1 bölüm: 50 gün</text>
  <text x="580" y="330" class="sm mid">Günde 3 bölüm: 17 gün</text>
  <text x="580" y="362" class="sm mid t2">50 ÷ 3 = 16,7 → 17</text>
</svg>`
  },
  sections: [
    {
      h: "Bir dizinin toplam süresi nasıl hesaplanır?",
      p: [
        "Toplam izleme süresinin hesabı basit bir çarpmadır: kaç bölüm olduğunu ve bir bölümün ortalama kaç dakika sürdüğünü bilmeniz yeterlidir. Bölüm süreleri genellikle yayın platformunun bölüm listesinde ya da dizinin tanıtım sayfasında yazar. Süreleri birkaç bölümden alıp ortalamasını kullanmak, her bölümü tek tek toplamaktan çok daha hızlıdır ve çoğu zaman birkaç dakikalık sapma dışında aynı sonucu verir."
      ],
      formula: "Toplam süre (dk) = toplam bölüm sayısı × ortalama bölüm süresi (dk)\nSaat = toplam dakika ÷ 60 (tam kısım) · kalan dakika = toplam dakika mod 60\nÖrnek: 50 × 47 = 2.350 dk → 2.350 ÷ 60 = 39 saat, kalan 10 dakika",
      after: [
        "Dakikayı saat ve dakikaya ayırırken ondalık sonuca dikkat edin: 2.350 ÷ 60 = 39,17 saat çıkar, ama bu \"39 saat 17 dakika\" değildir. 0,17 saat yaklaşık 10 dakikadır. Bu karışıklığı önlemek için [[arac:saat-dakika-cevir|Saat Dakika Çevirici]] ondalık saati \"39 sa 10 dk\" biçiminde gösterir. Ondalık saatin dakikaya nasıl çevrildiğini [[bilgi:ondalik-saat-dakikaya-cevirme|ondalık saati dakikaya çevirme]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "Günde 2 bölümle bir dizi kaç günde biter?",
      p: [
        "Bitirme süresini bulmak için toplam bölüm sayısını günde izlemeyi planladığınız bölüm sayısına bölün. Sonuç küsuratlı çıkarsa bir üst tam sayıya yuvarlayın, çünkü son gün kalan birkaç bölümü izlemek de bir gün sayılır."
      ],
      table: {
        head: ["Günlük plan", "50 bölümlük dizi", "100 bölümlük dizi", "Günlük izleme süresi (47 dk bölüm)"],
        rows: [
          ["Günde 1 bölüm", "50 gün", "100 gün", "47 dakika"],
          ["Günde 2 bölüm", "25 gün", "50 gün", "1 saat 34 dakika"],
          ["Günde 3 bölüm", "17 gün", "34 gün", "2 saat 21 dakika"],
          ["Haftada 5 bölüm", "10 hafta", "20 hafta", "Haftada 3 saat 55 dakika"]
        ],
        caption: "50 ÷ 3 = 16,7 → 17 gün; 100 ÷ 3 = 33,3 → 34 gün olarak yuvarlanmıştır."
      },
      after: [
        "Bölüm sayısı yerine günlük süre üzerinden de plan yapabilirsiniz. Günde 2 saat ayırıyorsanız 2.350 dakikalık dizi 2.350 ÷ 120 = 19,6 → 20 günde biter. Bu yöntem, bölüm sürelerinin sezondan sezona değiştiği dizilerde daha gerçekçi sonuç verir."
      ]
    },
    {
      h: "Bölüm süreleri saat:dakika olarak nasıl toplanır?",
      p: [
        "Bölüm süreleri \"52:30\" ya da \"1:04:15\" gibi saat:dakika:saniye biçiminde verildiğinde, onlu sayılar gibi doğrudan toplanamaz. Dakika ve saniye 60'ta bir üst birime geçer. Elle toplarken önce saniyeleri, sonra dakikaları, en son saatleri toplayıp her adımda 60'ı aşan kısmı üst basamağa aktarmanız gerekir."
      ],
      ol: [
        "Üç bölüm düşünün: 52:30, 47:45 ve 1:04:15 (saat:dakika:saniye).",
        "Saniyeleri toplayın: 30 + 45 + 15 = 90 saniye = 1 dakika 30 saniye. 30 saniye yazın, 1 dakikayı aktarın.",
        "Dakikaları toplayın: 52 + 47 + 4 + 1 (aktarılan) = 104 dakika = 1 saat 44 dakika. 44 dakika yazın, 1 saati aktarın.",
        "Saatleri toplayın: 0 + 0 + 1 + 1 (aktarılan) = 2 saat.",
        "Sonuç: 2 saat 44 dakika 30 saniye."
      ],
      after: [
        "Uzun bir bölüm listesini bu şekilde toplamak hataya açıktır. [[arac:sure-toplama|Süre Toplama]] aracına süreleri alt alta yazdığınızda toplamı, ortalamayı ve ondalık saat karşılığını birlikte görürsünüz."
      ]
    },
    {
      h: "Uzun dizilerde sezonlar arası süre farkı nasıl hesaba katılır?",
      p: [
        "Birçok dizide bölüm süreleri sezondan sezona değişir: ilk sezon uzun bölümlerle başlayıp sonraki sezonlarda kısalabilir ya da final sezonları daha uzun bölümler içerebilir. Bölüm sayıları da her sezonda farklı olabilir. Bu durumda tek bir ortalama yerine her sezonu ayrı hesaplamak daha doğrudur."
      ],
      table: {
        head: ["Sezon", "Bölüm sayısı", "Ortalama süre", "Sezon toplamı"],
        rows: [
          ["1. sezon", "8", "55 dk", "440 dk"],
          ["2. sezon", "10", "48 dk", "480 dk"],
          ["3. sezon", "12", "42 dk", "504 dk"],
          ["Toplam", "30", "yaklaşık 47,5 dk", "1.424 dk = 23 sa 44 dk"]
        ]
      },
      after: [
        "Açılış jeneriğini ve \"önceki bölümlerde\" özetini atlıyorsanız bölüm başına 1–3 dakika kazanırsınız. Bölüm başına 2 dakika atlamak bu 30 bölümlük dizide 60 dakika, yani toplam süreyi 22 saat 44 dakikaya indirir. Kapanış jeneriğinin uzun olduğu dizilerde kazanç daha da büyüktür."
      ]
    },
    {
      h: "1,25x hızda izleme süreyi ne kadar kısaltır?",
      p: [
        "Hızlı izlemede toplam süre, normal süre hız katsayısına bölünerek bulunur. 1,25x hızda her dakikalık içerik 0,8 dakikada izlenir, yani süre %20 kısalır. 1,5x hızda süre üçte bir oranında, 2x hızda yarı yarıya azalır."
      ],
      formula: "Hızlı izleme süresi = normal süre ÷ hız katsayısı\nKazanılan süre = normal süre − hızlı izleme süresi\n2.350 ÷ 1,25 = 1.880 dk · kazanç 470 dk = 7 sa 50 dk",
      table: {
        head: ["Hız", "Süre oranı", "2.350 dakikalık dizi", "Kazanç"],
        rows: [
          ["1x", "%100", "39 sa 10 dk", "–"],
          ["1,25x", "%80", "31 sa 20 dk", "7 sa 50 dk"],
          ["1,5x", "yaklaşık %67", "26 sa 7 dk", "13 sa 3 dk"],
          ["2x", "%50", "19 sa 35 dk", "19 sa 35 dk"]
        ]
      },
      after: [
        "Hızlı izleme belgesel, ders videosu ve konuşma ağırlıklı içeriklerde iyi sonuç verir; ancak diyalogların, müziğin ve oyunculuğun önemli olduğu dizilerde izleme deneyimini değiştirir. 1,25x çoğu kişi için anlaşılırlığı fazla bozmadan zaman kazandıran bir başlangıç noktasıdır. Bir sürenin bir sayıya bölünmesini ya da çarpılmasını [[arac:sure-bolme-carpma|Süre Bölme ve Çarpma]] aracı saat:dakika biçiminde hesaplar."
      ]
    },
    {
      h: "Bir filmin bitiş saati nasıl hesaplanır?",
      p: [
        "Filmin bitiş saatini bulmak için başlama saatine film süresini eklersiniz. Saat 60 dakikada bir arttığı için önce dakikaları toplayıp 60'ı aşan kısmı saate aktarmak gerekir. Sinemada reklam ve fragmanlar için 15–20 dakika, televizyonda reklam aralarına göre daha fazla süre eklemek gerekebilir."
      ],
      ol: [
        "Başlama saati: 21.40. Film süresi: 2 saat 18 dakika.",
        "Dakikaları toplayın: 40 + 18 = 58 dakika; 60'ı aşmadığı için aktarma yok.",
        "Saatleri toplayın: 21 + 2 = 23.",
        "Bitiş saati: 23.58. Sinemada 15 dakika reklam varsa gerçek bitiş 00.13 olur."
      ],
      after: [
        "Gece yarısını geçen hesaplarda saat 24'ü aşarsa 24 çıkarın: 23.50'de başlayan 1 saat 45 dakikalık film 25.35, yani ertesi gün 01.35'te biter. Başlama ve bitiş arasındaki süreyi bulmak ya da bir saate süre eklemek için [[arac:saat-hesapla|Saat Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Haftada kaç saat ekran başında geçirdiğimi nasıl bulurum?",
      p: [
        "Haftalık ekran süresini hesaplamak, dizi planınızın günlük hayatınızda ne kadar yer kapladığını görmenin en kolay yoludur. Her gün izlediğiniz süreyi not edip haftanın sonunda toplayın. Telefonların ve televizyonların çoğunda ekran süresi raporu bulunur; bu raporlar uygulama bazında süre gösterir."
      ],
      table: {
        head: ["Gün", "İzleme süresi"],
        rows: [
          ["Pazartesi – Perşembe", "4 × 1 sa 34 dk = 6 sa 16 dk"],
          ["Cuma", "2 sa 21 dk"],
          ["Cumartesi", "3 sa 8 dk"],
          ["Pazar", "2 sa 21 dk"],
          ["Haftalık toplam", "14 sa 6 dk"]
        ],
        caption: "47 dakikalık bölümlerle hafta içi günde 2, cuma ve pazar 3, cumartesi 4 bölüm izlendiği varsayılmıştır."
      },
      after: [
        "Bu örnek plan haftada 18 bölüm eder ve 50 bölümlük diziyi üç haftadan biraz kısa sürede bitirir (50 ÷ 18 ≈ 2,8 hafta). Çocuklar için ekran süresi önerilerini ve bunların yaşa göre nasıl değiştiğini [[bilgi:cocuklar-icin-ekran-suresi-kac-saat|çocuklar için ekran süresi]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Uzun izleme seanslarında mola neden önemli?",
      p: [
        "Art arda birkaç bölüm izlemek, saatlerce hareketsiz oturmak ve ekrana yakın bakmak anlamına gelir. Uzun süre aynı noktaya odaklanmak göz kuruluğu ve yorgunluğuna, hareketsizlik ise kas ve eklem sertliğine yol açabilir. Gece geç saatlere uzayan izleme seansları uyku süresini kısaltır ve ertesi günün dikkatini etkiler."
      ],
      ul: [
        "<strong>Her bölüm arasında kalkın:</strong> birkaç dakika yürümek, esnemek ve su içmek dolaşımı canlandırır.",
        "<strong>Gözleri dinlendirin:</strong> yaygın bir öneri, yaklaşık her 20 dakikada bir 20 saniye boyunca 6 metre kadar uzaktaki bir noktaya bakmaktır.",
        "<strong>Otomatik oynatmayı kapatın:</strong> bir sonraki bölümün kendiliğinden başlaması, planladığınızdan fazla izlemenin en yaygın nedenidir.",
        "<strong>Bitiş saatini önceden belirleyin:</strong> yatmadan önce izlemeyi bırakacağınız saati hesaplayıp bir alarm kurmak işe yarar.",
        "<strong>Uyku süresini koruyun:</strong> izleme planını uyku saatinizden geriye doğru kurun; kısa kalan uykunun birikimi için [[bilgi:uyku-borcu-nedir-nasil-hesaplanir|uyku borcu]] yazısına bakabilirsiniz."
      ],
      note: "Göz ağrısı, baş ağrısı ya da bulanık görme sık tekrarlıyorsa bir göz hekimine başvurun; bu öneriler genel bilgilendirme amaçlıdır."
    }
  ],
  faq: [
    ["Bir dizinin toplam süresi nasıl hesaplanır?", "Toplam bölüm sayısını ortalama bölüm süresiyle çarpın, sonucu 60'a bölerek saate çevirin. Örneğin 50 bölüm ve 47 dakikalık bölümler 2.350 dakika, yani 39 saat 10 dakika eder."],
    ["Günde 2 bölümle bir dizi kaç günde biter?", "Toplam bölüm sayısını 2'ye bölün ve küsurat varsa yukarı yuvarlayın. 50 bölümlük bir dizi 25 günde, 75 bölümlük bir dizi 38 günde biter; bölüm başına süre değişse de gün sayısı değişmez."],
    ["Bölüm süreleri saat:dakika olarak nasıl toplanır?", "Önce saniyeleri, sonra dakikaları, en son saatleri toplayın ve her adımda 60'ı aşan kısmı bir üst birime aktarın. Uzun listelerde süre toplama aracı kullanmak hata riskini ortadan kaldırır."],
    ["1,25x hızda izleme süreyi ne kadar kısaltır?", "1,25x hızda süre 1,25'e bölünür ve yüzde 20 kısalır. 39 saat 10 dakikalık bir dizi bu hızda 31 saat 20 dakikada biter; kazanç 7 saat 50 dakikadır."],
    ["Bir filmin bitiş saati nasıl hesaplanır?", "Başlama saatine film süresini ekleyin, dakikalar 60'ı aşarsa saate aktarın. 21.40'ta başlayan 2 saat 18 dakikalık film 23.58'de biter; sinemada reklam süresini de eklemeyi unutmayın."],
    ["Uzun dizilerde sezonlar arası süre farkı nasıl hesaba katılır?", "Her sezonun bölüm sayısını kendi ortalama süresiyle çarpın ve sezon toplamlarını birleştirin. Tek bir genel ortalama kullanmak, sezonlar arasında süre farkı büyükse birkaç saatlik sapmaya yol açabilir."],
    ["Haftada kaç saat ekran başında geçirdiğimi nasıl bulurum?", "Her gün izlediğiniz süreyi not edip hafta sonunda toplayın ya da cihazınızın ekran süresi raporuna bakın. Hafta içi günde 2, hafta sonu 3–4 bölümlük bir plan 47 dakikalık bölümlerle haftada 14 saati geçer."],
    ["Uzun izleme seanslarında mola neden önemli?", "Saatlerce hareketsiz oturmak ve ekrana odaklanmak göz yorgunluğuna, kas sertliğine ve uyku kaybına yol açabilir. Bölüm aralarında kalkmak, gözleri uzağa bakarak dinlendirmek ve otomatik oynatmayı kapatmak yardımcı olur."],
    ["Jenerik atlamak toplam süreyi ne kadar azaltır?", "Bölüm başına atladığınız dakikayı bölüm sayısıyla çarpın. Bölüm başına 2 dakikalık açılış ve özet atlamak 30 bölümlük bir dizide 1 saat, 100 bölümlük bir dizide 3 saat 20 dakika kazandırır."]
  ],
  tools: ["sure-bolme-carpma", "sure-toplama", "saat-dakika-cevir", "saat-hesapla"],
  related: ["ondalik-saat-dakikaya-cevirme", "cocuklar-icin-ekran-suresi-kac-saat", "uyku-borcu-nedir-nasil-hesaplanir"]
};
