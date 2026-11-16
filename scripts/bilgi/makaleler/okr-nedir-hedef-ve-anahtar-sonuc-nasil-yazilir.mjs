export default {
  slug: "okr-nedir-hedef-ve-anahtar-sonuc-nasil-yazilir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "OKR Nedir? Hedef ve Anahtar Sonuç Nasıl Yazılır, Nasıl Puanlanır?",
  pageTitle: "OKR Nedir? Hedef ve Anahtar Sonuç Yazma, Puanlama Rehberi",
  description: "OKR, ilham veren bir hedef ile onu ölçen 3–5 anahtar sonuçtan oluşan yöntemdir. İyi hedef yazımı, 0–1 puanlama, 0,7'nin anlamı, KPI ve SMART farkı.",
  keywords: ["okr nedir", "okr örnekleri", "hedef ve anahtar sonuçlar", "okr puanlama", "okr ile kpi farkı", "kişisel okr", "çeyreklik hedef", "anahtar sonuç nasıl yazılır"],
  lead: "OKR (Objectives and Key Results, hedefler ve anahtar sonuçlar), ulaşılmak istenen niteliksel bir hedefi ve bu hedefe ulaşılıp ulaşılmadığını gösteren 3–5 ölçülebilir anahtar sonucu birlikte yazan bir hedef belirleme yöntemidir. Hedef \"nereye gitmek istiyoruz\" sorusunu, anahtar sonuçlar \"oraya vardığımızı nereden anlarız\" sorusunu cevaplar. Genellikle üç aylık dönemlerle uygulanır ve her anahtar sonuç dönem sonunda 0 ile 1 arasında puanlanır; iddialı hedeflerde 0,7 civarı başarılı kabul edilir. Bu yazıda yazım kurallarını, puanlama hesabını ve KPI ile SMART farkını örnekle anlatıyoruz.",
  kisaCevap: [
    "OKR = 1 hedef (objective) + 3–5 anahtar sonuç (key result); hedef niteliksel ve ilham verici, anahtar sonuç sayısal ve ölçülebilirdir.",
    "Anahtar sonuç bir iş değil sonuçtur: \"kampanya yapmak\" değil \"tekrar satın alma oranını %18'den %25'e çıkarmak\".",
    "Puan = (gerçekleşen − başlangıç) ÷ (hedef − başlangıç); 0 ile 1 arasında sınırlanır.",
    "İddialı OKR'lerde 0,6–0,7 puan iyi kabul edilir; sürekli 1,0 alınıyorsa hedefler fazla güvenli yazılmıştır.",
    "KPI sürekli izlenen sağlık göstergesidir; OKR bir dönemde değiştirilmek istenen şeye odaklanır.",
    "Tipik döngü üç aydır: dönem başında yazım, her hafta kısa kontrol, dönem sonunda puanlama ve değerlendirme."
  ],
  figure: {
    alt: "OKR yapısı: üstte 'Müşterilerimiz siparişlerini daha hızlı alsın' hedefi, altında üç anahtar sonuç ve dönem sonu puanları: teslim süresi 4 günden 2,6 güne (0,70), aynı gün kargo oranı %30'dan %58'e (0,70), teslimat şikâyeti 120'den 60'a (0,75). Ortalama puan 0,72.",
    caption: "Hedef yönü, anahtar sonuçlar mesafeyi gösterir. Her anahtar sonuç başlangıç ile hedef arasında kat edilen yolun oranıyla puanlanır; ortalama 0,72, iddialı bir hedef için başarılı bir dönemdir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir OKR ve dönem sonu puanı</text>
  <rect x="30" y="50" width="660" height="60" rx="10" class="p"/>
  <text x="46" y="76" class="sm sf">HEDEF (O)</text>
  <text x="46" y="98" class="b sf">Müşterilerimiz siparişlerini daha hızlı alsın</text>
  <g>
    <rect x="30" y="130" width="660" height="70" rx="8" class="sf sb"/>
    <text x="46" y="154" class="sm b">AS1: Ortalama teslim süresi 4 günden 2 güne</text>
    <text x="46" y="180" class="sm t2">Gerçekleşen: 2,6 gün</text>
    <rect x="330" y="168" width="250" height="16" rx="4" class="ps"/>
    <rect x="330" y="168" width="175" height="16" rx="4" class="ok"/>
    <text x="676" y="182" class="end b">0,70</text>
    <rect x="30" y="212" width="660" height="70" rx="8" class="sf sb"/>
    <text x="46" y="236" class="sm b">AS2: Aynı gün kargo oranı %30'dan %70'e</text>
    <text x="46" y="262" class="sm t2">Gerçekleşen: %58</text>
    <rect x="330" y="250" width="250" height="16" rx="4" class="ps"/>
    <rect x="330" y="250" width="175" height="16" rx="4" class="ok"/>
    <text x="676" y="264" class="end b">0,70</text>
    <rect x="30" y="294" width="660" height="70" rx="8" class="sf sb"/>
    <text x="46" y="318" class="sm b">AS3: Teslimat şikâyeti ayda 120'den 40'a</text>
    <text x="46" y="344" class="sm t2">Gerçekleşen: 60</text>
    <rect x="330" y="332" width="250" height="16" rx="4" class="ps"/>
    <rect x="330" y="332" width="188" height="16" rx="4" class="ok"/>
    <text x="676" y="346" class="end b">0,75</text>
  </g>
  <text x="30" y="398" class="b">Ortalama: (0,70 + 0,70 + 0,75) ÷ 3 = 0,72</text>
  <text x="690" y="398" class="end sm t2">İddialı hedefte 0,6–0,7 iyi sayılır</text>
</svg>`
  },
  sections: [
    {
      h: "OKR (Objectives and Key Results) nedir?",
      p: [
        "OKR, bir ekibin ya da kişinin belirli bir dönemde neyi başarmak istediğini ve bunu nasıl ölçeceğini tek sayfada yazmasını sağlayan bir hedef yöntemidir. Yöntem 1970'lerde bir yarı iletken üreticisinde yönetim aracı olarak geliştirildi, sonraki on yıllarda hızlı büyüyen teknoloji şirketleriyle yaygınlaştı ve bugün her ölçekte işletmede, kamu kurumlarında ve kişisel planlamada kullanılıyor.",
        "Yapı iki parçadan oluşur. <strong>Hedef</strong> (objective) niteliksel, kısa ve akılda kalan bir cümledir; ekibe yön verir. <strong>Anahtar sonuçlar</strong> (key results) ise hedefe ulaşıldığını kanıtlayacak sayısal ölçütlerdir. Her hedefin altında genellikle 3–5 anahtar sonuç bulunur; daha fazlası odağı dağıtır."
      ]
    },
    {
      h: "İyi bir hedef (objective) nasıl yazılır?",
      p: [
        "İyi bir hedef ekibin sabah işe gelirken hatırlayacağı kadar kısa ve anlamlıdır. Sayı içermek zorunda değildir; sayılar anahtar sonuçların işidir. Hedef \"neden önemli\" sorusuna da kendiliğinden cevap verir."
      ],
      table: {
        head: ["Zayıf hedef", "Neden zayıf", "Daha iyi hedef"],
        rows: [
          ["Satışları artırmak", "Belirsiz ve her dönem aynı", "Kurumsal müşterilerde ilk tercih edilen tedarikçi olmak"],
          ["Yeni web sitesini yayınlamak", "Bir iş, sonuç değil", "Ziyaretçilerin aradığını ilk denemede bulduğu bir site sunmak"],
          ["%20 büyümek", "Sayı hedefte, yön yok", "Mevcut müşterilerimizin bizden daha fazla ürün alması"],
          ["Her şeyi iyileştirmek", "Odak yok", "Siparişler müşteriye daha hızlı ulaşsın"]
        ]
      },
      ul: [
        "Tek bir cümle olsun ve teknik jargon içermesin.",
        "Ekibin etki edebileceği bir alanı tarif etsin.",
        "İddialı ama inandırıcı olsun; ekip \"zor ama denemeye değer\" demeli.",
        "Bir dönemde (çoğunlukla üç ay) anlamlı ilerleme sağlanabilecek bir konu seçin."
      ]
    },
    {
      h: "Anahtar sonuçlar neden ölçülebilir olmalı?",
      p: [
        "Anahtar sonuç, dönem sonunda tartışmasız biçimde \"oldu\" ya da \"şu kadar oldu\" diyebilmenizi sağlar. Ölçülemeyen bir anahtar sonuç, dönem sonunda yoruma açılır ve yöntem anlamını yitirir. Bu yüzden her anahtar sonuçta bir başlangıç değeri, bir hedef değer ve bir ölçüm kaynağı bulunmalıdır.",
        "En sık yapılan hata, yapılacak işleri anahtar sonuç olarak yazmaktır. \"Yeni kargo firmasıyla anlaşma yapmak\" bir iştir (girdi); \"ortalama teslim süresini 4 günden 2 güne indirmek\" bir sonuçtur (çıktı). İşler, anahtar sonuçlara ulaşmak için yapılacak <strong>girişimler</strong> listesinde yer alır."
      ],
      formula: "Anahtar sonuç kalıbı: [ölçüt]'ü [başlangıç]'tan [hedef]'e [yön: çıkarmak/indirmek]\nÖrnek: Aynı gün kargo oranını %30'dan %70'e çıkarmak",
      ul: [
        "Her anahtar sonuç tek bir ölçüt içersin; iki ölçütü \"ve\" ile bağlamayın.",
        "Ölçümün nereden alınacağını önceden belirleyin: muhasebe raporu, kargo paneli, anket.",
        "Hem artırılacak hem de bozulmaması gereken ölçütleri dengeleyin: teslim hızı artarken hatalı gönderi oranı yükselmemeli.",
        "Anahtar sonuçlar birlikte gerçekleştiğinde hedefin gerçekleştiğine gerçekten inanılmalı."
      ]
    },
    {
      h: "OKR'ler nasıl puanlanır?",
      p: [
        "Dönem sonunda her anahtar sonuç 0 ile 1 arasında puanlanır. En yaygın yöntem, başlangıç değeri ile hedef değer arasındaki mesafenin ne kadarının kat edildiğini hesaplamaktır. Bu formül hem artırılacak hem de azaltılacak ölçütlerde aynı şekilde çalışır; sonuç 0'ın altına inerse 0, 1'in üzerine çıkarsa 1 kabul edilir."
      ],
      formula: "Puan = (gerçekleşen − başlangıç) ÷ (hedef − başlangıç)\nAS1: (2,6 − 4) ÷ (2 − 4) = −1,4 ÷ −2 = 0,70\nAS2: (58 − 30) ÷ (70 − 30) = 28 ÷ 40 = 0,70\nAS3: (60 − 120) ÷ (40 − 120) = −60 ÷ −80 = 0,75\nHedef puanı = (0,70 + 0,70 + 0,75) ÷ 3 ≈ 0,72",
      after: [
        "Anahtar sonuçların önemi farklıysa ağırlıklı ortalama kullanılabilir; ağırlıkları dönem başında belirleyin ki sonradan tartışma çıkmasın. İlerleme yüzdesini kendiniz hesaplamak için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracının yüzde değişim bölümünü kullanabilirsiniz; ağırlıklı puan için [[arac:agirlikli-ortalama-hesapla|Ağırlıklı Ortalama Hesaplama]] işe yarar."
      ]
    },
    {
      h: "0,7 neden iyi bir puan sayılır?",
      p: [
        "OKR yönteminde iki tür hedef ayrılır. <strong>Taahhüt</strong> niteliğindeki OKR'ler mutlaka tamamlanması gereken işlerdir ve 1,0 beklenir; örneğin yasal bir zorunluluğa uyum. <strong>İddialı</strong> (aspirasyonel) OKR'ler ise bilerek zor yazılır; ekibin konfor alanının ötesine geçmesini amaçlar. Bu tür hedeflerde 0,6–0,7 civarı bir puan, ekibin gerçekten zor bir şeyi büyük ölçüde başardığını gösterir.",
        "Bir ekip her dönem bütün anahtar sonuçlarında 1,0 alıyorsa, hedefler muhtemelen fazla güvenli yazılmıştır. Sürekli 0,3'ün altında kalınıyorsa hedefler gerçekçi değildir ya da kaynaklar yetersizdir. Puan bir performans notu değil, öğrenme aracıdır; OKR puanını doğrudan prim ve maaşa bağlamak ekipleri düşük hedef yazmaya iter."
      ],
      table: {
        head: ["Puan aralığı", "Yorum (iddialı OKR)", "Sonraki dönem için"],
        rows: [
          ["0,0–0,3", "Belirgin ilerleme yok", "Hedef, yöntem ya da kaynak gözden geçirilmeli"],
          ["0,4–0,6", "İlerleme var ama hedefin altında", "Engeller analiz edilmeli"],
          ["0,6–0,7", "İddialı hedefte başarılı dönem", "Benzer iddia düzeyi korunabilir"],
          ["0,8–1,0", "Hedef aşıldı ya da tamamlandı", "Hedef fazla güvenli olabilir, çıta yükseltilebilir"]
        ]
      }
    },
    {
      h: "OKR ile KPI arasındaki fark",
      p: [
        "KPI (temel performans göstergesi), bir işin sağlıklı yürüyüp yürümediğini sürekli izleyen ölçüttür: aylık ciro, müşteri kaybı oranı, stok devir hızı gibi. KPI'lar bir arabanın gösterge paneline benzer; her zaman bakılır. OKR ise belirli bir dönemde neyin değişmesini istediğinizi tarif eder; aracı nereye süreceğinizi gösteren rotadır.",
        "İkisi birbirini tamamlar. Bir KPI istenen düzeyin altına düştüğünde, onu iyileştirmek bir sonraki dönemin OKR'si olabilir: \"Müşteri kaybı oranı KPI'ı %8'e çıktı\" tespiti, \"Müşterilerimiz bizimle kalmak istesin\" hedefi ve \"aylık kayıp oranını %8'den %5'e indirmek\" anahtar sonucuna dönüşür. Hedefe ulaşıldığında ölçüt yeniden normal izlenen KPI'lar arasına döner."
      ]
    },
    {
      h: "OKR ile SMART hedef arasındaki fark",
      p: [
        "SMART, tek bir hedefin iyi yazılıp yazılmadığını kontrol eden bir ölçütler listesidir: belirli, ölçülebilir, ulaşılabilir, ilgili ve zamana bağlı. OKR ise bir hedefin nasıl yapılandırılacağını ve takip edileceğini belirleyen bir yönetim yöntemidir. OKR'deki her anahtar sonuç aslında SMART ilkelerine uygun yazılmalıdır; hedef cümlesi ise bilerek daha ilham verici ve niteliksel bırakılır."
      ],
      table: {
        head: ["Özellik", "SMART hedef", "OKR"],
        rows: [
          ["Yapı", "Tek cümlelik ölçülebilir hedef", "Niteliksel hedef + 3–5 ölçülebilir sonuç"],
          ["İddia düzeyi", "Ulaşılabilir olması beklenir", "İddialı OKR'lerde bilerek zor"],
          ["Dönem", "Hedefe göre değişir", "Çoğunlukla üç ay"],
          ["Başarı ölçüsü", "Gerçekleşti ya da gerçekleşmedi", "0–1 arası puan"],
          ["Kullanım", "Kişisel ve proje hedefleri", "Ekip ve kurum hizalaması"]
        ]
      },
      after: [
        "SMART kriterlerinin her birinin örneklerle açıklaması [[bilgi:smart-hedef-nedir-nasil-yazilir|SMART hedef nedir]] yazısında yer alıyor. İkisini birlikte kullanmak kolaydır: hedefi OKR mantığıyla, anahtar sonuçları SMART ölçütleriyle yazın."
      ]
    },
    {
      h: "Çeyreklik OKR döngüsü nasıl işler?",
      ol: [
        "<strong>Hazırlık (dönem başlamadan 1–2 hafta önce):</strong> önceki dönemin puanları ve KPI'lar gözden geçirilir, kurum düzeyindeki 2–3 hedef belirlenir.",
        "<strong>Yazım:</strong> ekipler kendi OKR'lerini kurum hedefleriyle ilişkili olacak şekilde yazar; her ekip en fazla 3 hedef ve hedef başına 3–5 anahtar sonuç seçer.",
        "<strong>Hizalama:</strong> ekipler birbirlerinin OKR'lerini okur, bağımlılıkları ve çakışmaları konuşur.",
        "<strong>Haftalık kontrol:</strong> her hafta 15 dakikalık bir toplantıda her anahtar sonuç için güncel değer ve dönem sonu tahmini paylaşılır.",
        "<strong>Dönem ortası:</strong> gerçekçi olmadığı anlaşılan anahtar sonuçlar gerekçesiyle güncellenebilir; ama sık değişiklik yöntemi zayıflatır.",
        "<strong>Dönem sonu:</strong> puanlama yapılır, öğrenilenler yazılır ve bir sonraki dönemin hazırlığına girdi olur."
      ],
      after: [
        "Çeyreklerin hangi aylara denk geldiğini [[bilgi:q1-q2-q3-q4-ceyrek-donem-hangi-aylar|Q1, Q2, Q3, Q4 hangi aylar]] yazısında bulabilirsiniz. Girişimleri haftalara bölüp sorumluları belirlemek için yazdırılabilir [[arac:proje-planlayici|Proje Planlayıcı]] kullanışlıdır."
      ]
    },
    {
      h: "Kişisel hayatta OKR nasıl uygulanır?",
      p: [
        "OKR yalnızca şirketler için değildir. Kişisel bir hedefi üç aylık bir döneme yaymak, hedefi \"bir gün yaparım\" olmaktan çıkarıp ölçülebilir adımlara dönüştürür. Kişisel OKR'de de aynı kurallar geçerlidir: tek bir ilham verici hedef, 3–4 ölçülebilir sonuç, haftalık kısa kontrol."
      ],
      ul: [
        "<strong>Hedef:</strong> İş toplantılarında İngilizceyi rahatça konuşabilmek.",
        "<strong>AS1:</strong> 12 hafta boyunca haftada 3 konuşma pratiği yapmak (36 oturum).",
        "<strong>AS2:</strong> Seviye belirleme sınavındaki konuşma puanını 55'ten 70'e çıkarmak.",
        "<strong>AS3:</strong> Bu çeyrekte en az 2 kısa sunumu İngilizce yapmak.",
        "<strong>Girişimler:</strong> konuşma grubuna katılmak, her hafta bir iş e-postasını İngilizce yazmak, toplantı öncesi kelime listesi hazırlamak."
      ],
      after: [
        "Hedefin nedenini, engellerini ve ilerlemesini tek sayfada görmek için [[arac:hedef-planlayici|Hedef Planlayıcı]] şablonunu, günlük alışkanlık takibi için [[arac:otuz-gunluk-hedef-cizelgesi|30 Günlük Hedef Çizelgesi]]ni yazdırabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>İşleri anahtar sonuç yazmak:</strong> \"rapor hazırlamak\" bir iştir; ölçülebilir sonucu yazın.",
        "<strong>Çok fazla OKR:</strong> ekip başına 3'ten fazla hedef odağı dağıtır.",
        "<strong>Başlangıç değerini bilmemek:</strong> ölçümü olmayan bir anahtar sonuç dönem sonunda puanlanamaz.",
        "<strong>Yaz ve unut:</strong> haftalık kontrol yapılmazsa OKR dönem sonunda sürpriz olur.",
        "<strong>Puanı prime bağlamak:</strong> ekipler güvenli, düşük hedef yazmaya başlar.",
        "<strong>Her şeyi OKR'ye taşımak:</strong> rutin işler ve sürekli izlenen ölçütler KPI olarak kalmalıdır."
      ]
    }
  ],
  faq: [
    ["OKR (Objectives and Key Results) nedir?", "OKR, niteliksel ve ilham veren bir hedef ile bu hedefe ulaşıldığını gösteren 3–5 ölçülebilir anahtar sonucu birlikte yazan bir hedef yöntemidir. Genellikle üç aylık dönemlerle uygulanır ve dönem sonunda puanlanır."],
    ["İyi bir hedef (objective) nasıl yazılır?", "Tek cümlelik, kısa, jargonsuz ve ekibin etki edebileceği bir yön tarif etmelidir. Sayı içermesi gerekmez; ölçüm anahtar sonuçların işidir. İddialı ama inandırıcı olmalı ve bir dönemde anlamlı ilerleme sağlanabilecek bir konuyu seçmelidir."],
    ["Anahtar sonuçlar neden ölçülebilir olmalı?", "Dönem sonunda hedefe ulaşılıp ulaşılmadığını tartışmasız göstermek için. Her anahtar sonuçta başlangıç değeri, hedef değer ve ölçüm kaynağı olmalıdır; yapılacak işler anahtar sonuç değil, ona ulaşmak için girişimlerdir."],
    ["OKR'ler nasıl puanlanır, 0,7 neden iyi sayılır?", "Her anahtar sonuç (gerçekleşen − başlangıç) ÷ (hedef − başlangıç) formülüyle 0–1 arasında puanlanır. İddialı hedefler bilerek zor yazıldığı için 0,6–0,7 civarı puan büyük ölçüde başarı anlamına gelir; sürekli 1,0 hedeflerin fazla güvenli olduğunu gösterir."],
    ["OKR ile KPI arasındaki fark nedir?", "KPI işin sağlığını sürekli izleyen göstergedir, OKR ise belirli bir dönemde değiştirilmek istenen şeye odaklanır. Bir KPI istenen düzeyin altına düştüğünde onu iyileştirmek bir sonraki dönemin OKR'si hâline gelebilir."],
    ["OKR ile SMART hedef arasındaki fark nedir?", "SMART tek bir hedefin iyi yazılıp yazılmadığını kontrol eden ölçütlerdir; OKR ise hedefin yapısını ve takibini belirleyen yöntemdir. OKR'deki anahtar sonuçlar SMART ilkelerine uygun yazılırken hedef cümlesi daha niteliksel ve ilham verici bırakılır."],
    ["Çeyreklik OKR döngüsü nasıl işler?", "Dönem öncesinde önceki puanlar gözden geçirilip yeni OKR'ler yazılır ve ekipler arasında hizalanır. Dönem boyunca haftalık kısa kontroller yapılır, dönem sonunda puanlama ve öğrenilenlerin değerlendirilmesiyle döngü tamamlanır."],
    ["Kişisel hayatta OKR nasıl uygulanır?", "Bir kişisel hedefi üç aylık döneme yayıp altına 3–4 ölçülebilir anahtar sonuç yazarsınız; örneğin 12 haftada 36 konuşma pratiği ve sınav puanını 55'ten 70'e çıkarmak. Haftalık kısa kontrollerle ilerlemeyi izlersiniz."],
    ["İlerleme yüzde olarak nasıl takip edilir?", "Her anahtar sonuç için kat edilen mesafe toplam mesafeye bölünüp 100 ile çarpılır. Teslim süresi 4 günden 2 güne inecekken 2,6 güne indiyse ilerleme %70'tir; hedefin genel ilerlemesi anahtar sonuçların ortalamasıdır."]
  ],
  tools: ["hedef-planlayici", "proje-planlayici", "otuz-gunluk-hedef-cizelgesi", "yuzde-hesapla", "agirlikli-ortalama-hesapla"],
  related: ["smart-hedef-nedir-nasil-yazilir", "q1-q2-q3-q4-ceyrek-donem-hangi-aylar", "eisenhower-matrisi-nedir-acil-onemli", "gunluk-plan-nasil-yapilir-zaman-bloklama"]
};
