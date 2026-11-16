export default {
  slug: "doluluk-orani-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Doluluk Oranı Nasıl Hesaplanır? Otel, Kiralık Ev ve Restoran",
  pageTitle: "Doluluk Oranı Nasıl Hesaplanır? ADR ve RevPAR Formülü",
  description: "Doluluk oranı nasıl hesaplanır? Otel doluluk formülü, ADR ve RevPAR nedir, günlük kiralık evde ve restoranda doluluk, gelirle ilişkisi ve çözümlü örnekler.",
  keywords: ["doluluk oranı hesaplama", "otel doluluk oranı", "doluluk oranı formülü", "adr nedir", "revpar nedir", "günlük kiralık ev doluluk", "masa doluluk oranı", "oda gece hesabı"],
  lead: "Doluluk oranı, <strong>satılan (dolu) kapasitenin satılabilir toplam kapasiteye bölünüp 100 ile çarpılmasıyla</strong> bulunur. Otelde birim oda-gecedir: 40 odalı bir otel 30 günlük ayda 1.200 oda-gece satabilir; 900'ünü sattıysa doluluk %75'tir. Doluluk tek başına yeterli değildir; oda başına ortalama fiyatı gösteren ADR ve satılabilir oda başına geliri gösteren RevPAR ile birlikte okunur. Bu yazıda otel, günlük kiralık ev ve restoran için formülleri, çözümlü örnekleri ve doluluğu gelire bağlamanın yollarını bulacaksınız.",
  kisaCevap: [
    "Doluluk oranı (%) = satılan birim ÷ (birim sayısı × dönem gün sayısı) × 100.",
    "ADR (ortalama günlük fiyat) = oda geliri ÷ satılan oda-gece sayısı.",
    "RevPAR (satılabilir oda başına gelir) = oda geliri ÷ toplam oda-gece = ADR × doluluk oranı.",
    "Örnek: 40 oda × 30 gün = 1.200 oda-gece; 900 satış %75 doluluk; 2.700.000 TL gelirle ADR 3.000 TL, RevPAR 2.250 TL.",
    "Bakım ya da tadilat nedeniyle satışa kapalı birimler kapasiteden düşülürse gerçek satılabilir doluluk görülür.",
    "Restoranda doluluk koltuk ya da masa üzerinden, servis (öğle, akşam) bazında ölçülür."
  ],
  figure: {
    alt: "40 odalı otelin 30 günlük takvimi: 1.200 oda-gecenin 900'ü dolu, doluluk yüzde 75. Yanında ADR 3.000 TL ve RevPAR 2.250 TL hesabı.",
    caption: "40 oda × 30 gün = 1.200 satılabilir oda-gece. 900 oda-gece satılınca doluluk %75 olur. 2.700.000 TL oda geliriyle ADR 3.000 TL, RevPAR 2.250 TL'dir; RevPAR = ADR × doluluk eşitliği sağlanır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Otelde doluluk, ADR ve RevPAR</text>
  <text x="30" y="62" class="b">1.200 oda-gece (her kare = 25 oda-gece)</text>
  <g>
    <rect x="30" y="76" width="380" height="228" rx="8" class="sf sb"/>
    <rect x="40" y="86" width="360" height="156" rx="4" class="p"/>
    <rect x="40" y="246" width="360" height="48" rx="4" class="sf sb"/>
    <line x1="40" y1="125" x2="400" y2="125" class="sb" fill="none"/>
    <line x1="40" y1="164" x2="400" y2="164" class="sb" fill="none"/>
    <line x1="40" y1="203" x2="400" y2="203" class="sb" fill="none"/>
    <line x1="40" y1="270" x2="400" y2="270" class="sb" fill="none"/>
    <line x1="85" y1="86" x2="85" y2="294" class="sb" fill="none"/><line x1="130" y1="86" x2="130" y2="294" class="sb" fill="none"/>
    <line x1="175" y1="86" x2="175" y2="294" class="sb" fill="none"/><line x1="220" y1="86" x2="220" y2="294" class="sb" fill="none"/>
    <line x1="265" y1="86" x2="265" y2="294" class="sb" fill="none"/><line x1="310" y1="86" x2="310" y2="294" class="sb" fill="none"/>
    <line x1="355" y1="86" x2="355" y2="294" class="sb" fill="none"/>
    <text x="220" y="170" class="xl mid sf">900 dolu</text>
    <text x="220" y="276" class="b mid">300 boş</text>
  </g>
  <rect x="440" y="76" width="250" height="68" rx="10" class="p"/>
  <text x="565" y="104" class="b mid sf">Doluluk = 900 ÷ 1.200</text>
  <text x="565" y="130" class="xl mid sf">%75</text>
  <rect x="440" y="156" width="250" height="68" rx="10" class="ps"/>
  <text x="565" y="184" class="b mid">ADR = 2.700.000 ÷ 900</text>
  <text x="565" y="210" class="lg b mid">3.000 TL</text>
  <rect x="440" y="236" width="250" height="68" rx="10" class="oks"/>
  <text x="565" y="264" class="b mid">RevPAR = 2.700.000 ÷ 1.200</text>
  <text x="565" y="290" class="lg b mid">2.250 TL</text>
  <rect x="30" y="322" width="660" height="56" rx="10" class="sf sb"/>
  <text x="360" y="346" class="b mid">Kontrol: RevPAR = ADR × doluluk</text>
  <text x="360" y="368" class="mid">3.000 TL × 0,75 = 2.250 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Doluluk oranı nedir, ne işe yarar?",
      p: [
        "Doluluk oranı, bir işletmenin sunabildiği kapasitenin ne kadarını gerçekten sattığını gösteren temel performans ölçüsüdür. Otel, pansiyon ve günlük kiralık evlerde oda ya da daire-gece; restoranlarda koltuk ya da masa; otoparkta araç yeri; spor salonunda ders kontenjanı birim olarak kullanılır. Hangi sektörde olursa olsun mantık aynıdır: satılan birim ÷ satılabilir birim. Kapasite zamana bağlı ve saklanamaz bir ürün olduğu için bugün boş kalan oda ya da masa, yarın ikinci kez satılamaz; doluluğun işletmeler için bu kadar önemli olmasının nedeni budur.",
        "Bu oran, satışların sezonlara göre nasıl değiştiğini görmenizi, fiyat kararlarını sınamanızı ve yatırımın kendini ne kadar sürede ödeyeceğini tahmin etmenizi sağlar. Ancak tek başına okunduğunda yanıltıcı olabilir: fiyatları çok düşürerek %100 doluluğa ulaşmak, daha az ama daha yüksek fiyatlı satıştan daha az kazandırabilir. Bu yüzden doluluk her zaman fiyat ve gelir göstergeleriyle birlikte değerlendirilir."
      ]
    },
    {
      h: "Otel doluluk oranı formülü",
      p: [
        "Otelcilikte kapasite <strong>oda-gece</strong> ile ölçülür. Bir oda bir gece satılabilir; 40 odalı bir otel 30 günlük bir ayda 40 × 30 = 1.200 oda-gece sunar. Aynı oda bir gecede iki kez satılamayacağı için oda-gece, kapasitenin en doğal birimidir. Konaklayan kişi sayısı değil, satılan oda sayısı sayılır; iki kişilik bir odada kalan çift tek oda-gece eder."
      ],
      formula: "Satılabilir kapasite = oda sayısı × dönemdeki gün sayısı\nDoluluk oranı (%) = satılan oda-gece ÷ satılabilir kapasite × 100\nÖrnek: 900 ÷ (40 × 30) × 100 = 900 ÷ 1.200 × 100 = %75",
      after: [
        "Bakım, boya ya da arıza nedeniyle bir oda birkaç gece satışa kapatıldıysa iki farklı oran hesaplanabilir. Toplam kapasiteye göre hesaplanan oran kapalı odaları da boş sayar; satılabilir kapasiteye göre hesaplanan oran ise yalnızca satışa açık odaları dikkate alır. Örneğin 2 oda 15 gün kapalıysa satılabilir kapasite 1.200 − 30 = 1.170 oda-gecedir ve 900 satış %76,9 doluluğa karşılık gelir. Raporlarınızda hangisini kullandığınızı belirtin ve dönemler arasında yöntemi değiştirmeyin."
      ]
    },
    {
      h: "ADR ve RevPAR ne demek?",
      p: [
        "<strong>ADR</strong> (Average Daily Rate, ortalama günlük oda fiyatı), satılan her oda-gece için elde edilen ortalama gelirdir. <strong>RevPAR</strong> (Revenue Per Available Room, satılabilir oda başına gelir) ise geliri boş odalar da dahil tüm kapasiteye yayar. RevPAR, doluluğu ve fiyatı tek sayıda birleştirdiği için otel performansını karşılaştırmada en çok kullanılan göstergedir.",
        "Örneğimizde ay boyunca oda geliri 2.700.000 TL olsun. ADR = 2.700.000 ÷ 900 = 3.000 TL; RevPAR = 2.700.000 ÷ 1.200 = 2.250 TL. Aynı sonuca ADR × doluluk ile de ulaşılır: 3.000 × 0,75 = 2.250 TL. Tutarlar örnektir."
      ],
      table: {
        head: ["Senaryo", "Doluluk", "ADR", "Oda geliri (aylık)", "RevPAR"],
        rows: [
          ["A: Düşük fiyat, yüksek doluluk", "%90", "2.400 TL", "2.592.000 TL", "2.160 TL"],
          ["B: Örnek otel", "%75", "3.000 TL", "2.700.000 TL", "2.250 TL"],
          ["C: Yüksek fiyat, düşük doluluk", "%60", "3.600 TL", "2.592.000 TL", "2.160 TL"]
        ],
        caption: "40 oda ve 30 gün için. A ve C senaryosunda gelir aynıdır; B, ikisinden daha fazla kazandırır. Doluluğun yüksek olması tek başına daha iyi anlamına gelmez."
      },
      after: [
        "Tablo, doluluk ile fiyat arasındaki dengeyi gösterir. Yüksek doluluk daha fazla temizlik, çamaşır ve personel maliyeti de getirir; bu nedenle aynı RevPAR'da daha düşük dolulukla çalışmak bazen daha kârlıdır. Maliyetleri de hesaba katmak için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazısındaki yöntem kullanılabilir."
      ]
    },
    {
      h: "Günlük kiralık evde doluluk ve gelir",
      p: [
        "Tek bir daireyi günlük ya da haftalık kiraya veren biri için hesap daha basittir: birim sayısı birdir, kapasite dönemdeki gece sayısıdır. 30 günlük bir ayda 18 gece kiralanan bir dairenin doluluk oranı 18 ÷ 30 × 100 = %60'tır. Gecelik ortalama fiyat 2.500 TL ise aylık brüt gelir 18 × 2.500 = 45.000 TL, gece başına ortalama gelir (RevPAR karşılığı) 45.000 ÷ 30 = 1.500 TL olur.",
        "Günlük kiralık evlerde \"iyi doluluk\" sabit bir sayı değildir; bölgeye, sezona, fiyata ve minimum konaklama süresine göre değişir. Sahil bölgelerinde yaz aylarında doluluk çok yüksek, kış aylarında çok düşük olabilir. Bu yüzden yıllık ortalamayı tek başına değil, ay ay izlemek daha anlamlıdır. Ayrıca temizlik, komisyon, faturalar ve eşya yıpranması gibi giderler düşülmeden brüt gelirle yatırım kararı vermemek gerekir."
      ]
    },
    {
      h: "Doluluk oranına göre kira getirisi nasıl değişir?",
      p: [
        "Bir dairenin günlük kiraya mı, uzun dönem kiraya mı verileceğine karar verirken doluluk kritik rol oynar. Aşağıdaki örnekte gecelik 2.500 TL fiyatla farklı doluluk oranlarındaki yıllık brüt gelir, aylık 25.000 TL'lik uzun dönem kirayla (yıllık 300.000 TL) karşılaştırılmıştır. Rakamlar örnektir ve giderler düşülmemiştir."
      ],
      table: {
        head: ["Yıllık doluluk", "Kiralanan gece", "Yıllık brüt gelir", "Uzun dönem kiraya göre"],
        rows: [
          ["%30", "110", "275.000 TL", "25.000 TL az"],
          ["%40", "146", "365.000 TL", "65.000 TL fazla"],
          ["%50", "183", "457.500 TL", "157.500 TL fazla"],
          ["%60", "219", "547.500 TL", "247.500 TL fazla"]
        ],
        caption: "Gece sayıları 365 gün üzerinden yuvarlanmıştır. Günlük kiralamada temizlik, komisyon, fatura ve yönetim giderleri genellikle çok daha yüksektir."
      },
      after: [
        "Bu karşılaştırmada başabaş doluluğu, uzun dönem kira gelirini yakalamak için gereken gece sayısıdır: 300.000 ÷ 2.500 = 120 gece, yani yaklaşık %33. Giderler eklendiğinde bu eşik yükselir. Yatırımın geri dönüşünü değerlendirmek için [[arac:kira-getirisi-hesapla|Kira Getirisi Hesaplama]] aracını ve [[bilgi:ev-kac-yilda-amorti-eder|ev kaç yılda amorti eder]] yazısını kullanabilirsiniz."
      ]
    },
    {
      h: "Restoranlarda masa ve koltuk doluluğu",
      p: [
        "Restoranlarda kapasite koltuk ya da masa üzerinden ve her servis için ayrı ölçülür. 80 koltuklu bir restoran öğle servisinde 60 kişi ağırladıysa koltuk doluluğu 60 ÷ 80 × 100 = %75'tir. Ancak dört kişilik masaya iki kişi oturduğunda masa dolu, koltukların yarısı boştur; bu yüzden masa doluluğu ve koltuk doluluğu farklı çıkabilir.",
        "Restoranlarda doluluğa ek olarak <strong>masa devir hızı</strong> da izlenir: bir serviste bir masanın kaç kez kullanıldığı. 20 masalı bir restoran akşam servisinde 34 masa siparişi aldıysa devir hızı 34 ÷ 20 = 1,7'dir. Devir hızını artırmak, aynı kapasiteyle daha fazla müşteriye hizmet vermek demektir. Etkinlik ve düğün salonlarında kişi-masa hesabı için [[bilgi:dugun-salonu-kac-masa-davetli-hesabi|düğün salonu kaç masa]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sezon dışında doluluk nasıl artırılır?",
      ul: [
        "<strong>Dinamik fiyat:</strong> Talebin düştüğü günlerde fiyatı biraz indirmek, odayı boş bırakmaktan genellikle daha kazançlıdır; çünkü boş oda-gece bir daha satılamaz.",
        "<strong>Uzun konaklama indirimi:</strong> Haftalık ve aylık konaklamalarda indirim, sezon dışında doluluğu kalıcı biçimde yükseltir ve temizlik maliyetini azaltır.",
        "<strong>Hedef kitle değiştirmek:</strong> Yaz tatilcisi yerine kışın iş seyahati, kongre ya da uzaktan çalışan misafirlere yönelmek.",
        "<strong>Paketler:</strong> Kahvaltı, transfer ya da yerel etkinliklerle birleştirilmiş paketler fiyat algısını iyileştirir.",
        "<strong>Minimum gece sayısını esnetmek:</strong> Sezon dışında tek gecelik rezervasyonlara izin vermek boş araları doldurur."
      ],
      after: [
        "Her önlemin etkisini doluluk ve RevPAR üzerinden ölçün. Fiyatı %10 düşürüp doluluğu %5 artırmak geliri azaltabilir; kararınızı verirken iki göstergeyi birlikte izleyin."
      ]
    },
    {
      h: "Sık yapılan hesap hataları",
      ul: [
        "<strong>Kişi saymak:</strong> Otel doluluğunda misafir sayısı değil, satılan oda-gece sayılır.",
        "<strong>Gün sayısını unutmak:</strong> 40 odalı otelde 900 satış, 30 günlük kapasite yerine 40'a bölünürse anlamsız bir sonuç çıkar.",
        "<strong>Ücretsiz ve personel odalarını karıştırmak:</strong> Ücretsiz verilen odalar ADR'yi düşürür; ayrı raporlanmaları gerekir.",
        "<strong>Brüt geliri kâr sanmak:</strong> Yüksek doluluk yüksek maliyet demektir; kâr için giderleri düşün.",
        "<strong>Yıllık ortalamaya güvenmek:</strong> %50 yıllık doluluk, yazın %90 kışın %10 olabilir; nakit planı ay ay yapılmalıdır."
      ]
    },
    {
      h: "Ücretsiz araçla doluluk oranı hesaplama",
      p: [
        "[[arac:doluluk-orani-hesapla|Doluluk Oranı Hesaplama]] aracına dolu birim sayısını, kapasiteyi ve dönem uzunluğunu (gün ya da servis sayısı) yazın; doluluk ve boşluk oranını, toplam ve boş kapasiteyi görün. Dönem gelirini de girerseniz araç dolu birim başına ortalama geliri (ADR), kapasite birimi başına geliri (RevPAR) ve boş kapasitenin gelir karşılığını hesaplar.",
        "Yüzdeler arasında karşılaştırma yapmak, örneğin bu ayki dolulukla geçen yılın aynı ayını kıyaslamak için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracını kullanabilirsiniz. Tüm hesaplar tarayıcınızda yapılır; işletme verileriniz hiçbir yere gönderilmez."
      ]
    }
  ],
  faq: [
    ["Doluluk oranı nasıl hesaplanır?", "Satılan birim sayısı, birim sayısı ile dönemdeki gün sayısının çarpımına bölünür ve 100 ile çarpılır. 40 odalı otelde 30 günde 900 oda-gece satılırsa doluluk 900 ÷ 1.200 × 100 = %75 olur."],
    ["Otel doluluk oranı formülü nedir?", "Otel doluluk oranı = satılan oda-gece ÷ (oda sayısı × gün sayısı) × 100. Konaklayan kişi sayısı değil satılan oda sayısı esas alınır; satışa kapalı odalar istenirse kapasiteden düşülür."],
    ["ADR ve RevPAR ne demek?", "ADR, satılan oda-gece başına ortalama fiyattır ve oda gelirinin satılan oda-geceye bölünmesiyle bulunur. RevPAR, oda gelirinin tüm satılabilir oda-geceye bölünmesidir ve ADR ile doluluk oranının çarpımına eşittir."],
    ["Günlük kiralık evde iyi doluluk oranı kaçtır?", "Sabit bir iyi oran yoktur; bölge, sezon, fiyat ve giderlere göre değişir. Karar için uzun dönem kira gelirine ulaşmak için gereken başabaş doluluğunu hesaplayın ve giderleri düştükten sonraki net gelire bakın."],
    ["Restoranlarda masa doluluğu nasıl ölçülür?", "Her servis için dolu koltuk ya da masa sayısı toplam kapasiteye bölünür. 80 koltuklu restoranda 60 misafir %75 koltuk doluluğu demektir. Ayrıca bir masanın serviste kaç kez kullanıldığını gösteren devir hızı izlenir."],
    ["Sezon dışında doluluk nasıl artırılır?", "Dinamik fiyatlama, uzun konaklama indirimleri, iş seyahati gibi farklı hedef kitleler, paket teklifler ve minimum gece şartının esnetilmesi sezon dışında boş geceleri azaltmanın yaygın yollarıdır."],
    ["Doluluk oranı gelirle nasıl ilişkilendirilir?", "Doluluk, ortalama fiyatla çarpıldığında satılabilir birim başına geliri (RevPAR) verir. Bu sayede düşük fiyat yüksek doluluk ile yüksek fiyat düşük doluluk senaryoları aynı ölçüyle karşılaştırılabilir."],
    ["Kira getirisi doluluğa göre nasıl değişir?", "Günlük kiralamada yıllık gelir, kiralanan gece sayısı ile gecelik fiyatın çarpımıdır. Uzun dönem kira gelirini yakalamak için gereken gece sayısı, yıllık kiranın gecelik fiyata bölünmesiyle bulunur; giderler bu eşiği yükseltir."],
    ["Satışa kapalı odalar doluluk hesabına dahil mi?", "İki yöntem kullanılır. Toplam kapasiteye göre hesapta kapalı odalar boş sayılır; satılabilir kapasiteye göre hesapta kapasiteden düşülür. 2 oda 15 gün kapalıysa 900 satış %75 yerine %76,9 doluluk verir."]
  ],
  tools: ["doluluk-orani-hesapla", "kira-getirisi-hesapla", "yuzde-hesapla"],
  related: ["basabas-noktasi-nedir", "ev-kac-yilda-amorti-eder", "dugun-salonu-kac-masa-davetli-hesabi", "kar-marji-nasil-hesaplanir"]
};
