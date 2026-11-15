export default {
  slug: "yds-puani-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "YDS Puanı Nasıl Hesaplanır? Kaç Doğru Kaç Puan, Seviye Tablosu",
  pageTitle: "YDS Puan Hesaplama: Kaç Doğru Kaç Puan, A–E Seviye Tablosu",
  description: "YDS'de 80 soru vardır ve her doğru 1,25 puandır; yanlış doğruyu götürmez. 55 puan için 44, 60 için 48 doğru gerekir. Seviye tablosu, YÖKDİL ve geçerlilik süresi.",
  keywords: ["yds puan hesaplama", "yds kaç doğru kaç puan", "yds seviye tablosu", "yökdil puan hesaplama", "yds yanlış doğruyu götürür mü", "yds geçerlilik süresi", "e-yds puan"],
  lead: "YDS puanı, doğru cevap sayısının <strong>1,25 ile çarpılmasıyla</strong> hesaplanır: sınavda 80 soru vardır ve 100 ÷ 80 = 1,25 puan eder. Yanlış cevaplar doğruları götürmez, boş ve yanlış aynı şekilde sıfır puan alır. Bu yüzden 60 puan için 48, akademik başvurularda sık aranan 55 puan için 44 doğru gerekir. ÖSYM, puanı 90 ve üzeri A, 80–89 B, 70–79 C, 60–69 D, 50–59 E seviyesi olarak da gösterir. Bu sayfada formülü, iptal edilen sorularda hesabın nasıl değiştiğini, YÖKDİL ile farkları ve kullanım eşiklerini bulacaksınız.",
  kisaCevap: [
    "YDS puanı = doğru sayısı × 1,25; 80 soru, 100 tam puan.",
    "Yanlış cevaplar doğruyu götürmez; bu yüzden boş bırakmak avantaj sağlamaz.",
    "55 puan için 44, 60 puan için 48, 70 puan için 56, 80 puan için 64 doğru gerekir.",
    "Seviyeler: A 90–100, B 80–89, C 70–79, D 60–69, E 50–59.",
    "İptal edilen soru varsa her doğru 100 ÷ (80 − iptal sayısı) puan eder.",
    "YÖKDİL de 80 soru ve doğru başına 1,25 puanla hesaplanır, ancak A–E seviyesi tanımlanmaz."
  ],
  figure: {
    alt: "YDS doğru sayısı ve puan ilişkisi: 40 doğru 50 puan E, 44 doğru 55 puan, 48 doğru 60 puan D, 56 doğru 70 puan C, 64 doğru 80 puan B, 72 doğru 90 puan A; her doğru 1,25 puan.",
    caption: "Puan doğrusal artar: her doğru 1,25 puan. Renkli bantlar ÖSYM'nin seviye harflerini, işaretler en sık aranan eşikleri gösterir. 55 puan doktora ve doçentlik başvurusunda yönetmelikteki asgari puandır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">YDS: doğru sayısı → puan → seviye</text>
  <text x="360" y="54" class="sm mid t2">Puan = doğru × 1,25 (yanlış doğruyu götürmez)</text>
  <rect x="60" y="80" width="200" height="56" class="sf sb"/>
  <rect x="260" y="80" width="80" height="56" class="dgs"/>
  <rect x="340" y="80" width="80" height="56" class="ps"/>
  <rect x="420" y="80" width="80" height="56" class="ps"/>
  <rect x="500" y="80" width="80" height="56" class="oks"/>
  <rect x="580" y="80" width="100" height="56" class="ok"/>
  <g class="mid b">
    <text x="160" y="113" class="sm">seviye yok</text>
    <text x="300" y="113">E</text><text x="380" y="113">D</text><text x="460" y="113">C</text><text x="540" y="113">B</text><text x="630" y="113" class="sf">A</text>
  </g>
  <line x1="60" y1="160" x2="680" y2="160" class="st" fill="none"/>
  <g class="sm mid">
    <text x="260" y="180">50</text><text x="340" y="180">60</text><text x="420" y="180">70</text><text x="500" y="180">80</text><text x="580" y="180">90</text><text x="680" y="180">100</text>
    <text x="36" y="180" class="end mu">puan</text>
  </g>
  <line x1="300" y1="140" x2="300" y2="166" class="sa sw" fill="none"/>
  <text x="300" y="206" class="sm mid b p">55 puan = 44 doğru</text>
  <rect x="20" y="230" width="680" height="34" rx="6" class="sf sb"/>
  <g class="sm">
    <text x="36" y="252" class="b">Puan</text><text x="150" y="252">50</text><text x="230" y="252">55</text><text x="310" y="252">60</text><text x="390" y="252">65</text><text x="470" y="252">70</text><text x="550" y="252">80</text><text x="630" y="252">90</text>
  </g>
  <rect x="20" y="268" width="680" height="34" rx="6" class="ps"/>
  <g class="sm b">
    <text x="36" y="290">Doğru</text><text x="150" y="290">40</text><text x="230" y="290">44</text><text x="310" y="290">48</text><text x="390" y="290">52</text><text x="470" y="290">56</text><text x="550" y="290">64</text><text x="630" y="290">72</text>
  </g>
  <rect x="20" y="320" width="680" height="66" rx="10" class="sf sb"/>
  <rect x="20" y="320" width="8" height="66" class="p"/>
  <text x="44" y="346" class="b">İptal edilen soru varsa</text>
  <text x="44" y="370" class="sm">2 soru iptal: her doğru 100 ÷ 78 = 1,282 puan · 55 için 43 doğru yeter</text>
</svg>`
  },
  sections: [
    {
      h: "YDS nedir, ne için kullanılır?",
      p: [
        "Yabancı Dil Bilgisi Seviye Tespit Sınavı (YDS), ÖSYM tarafından yapılan ve adayların okuduğunu anlama, kelime bilgisi ve dil bilgisi düzeyini ölçen merkezi bir sınavdır. Kâğıt üzerinde yapılan YDS yılda belirli dönemlerde, elektronik ortamda yapılan e-YDS ise yıl içinde daha sık oturumlarla uygulanır. Her iki sınav da aynı değerlendirme kuralına tabidir.",
        "YDS sonucu; kamu personelinin yabancı dil tazminatında, lisansüstü eğitim başvurularında, doçentlik başvurusunda, tıpta ve diş hekimliğinde uzmanlık sınavlarının yabancı dil şartında ve yurt dışı görevlendirmelerde kullanılır. YÖK'ün yaptırdığı YÖKDİL ise ağırlıklı olarak akademik amaçlarla, alanlara göre (fen, sağlık, sosyal) ayrılmış bir sınavdır."
      ]
    },
    {
      h: "YDS puanı nasıl hesaplanır?",
      p: [
        "ÖSYM kılavuzuna göre YDS'de yalnızca doğru cevaplar dikkate alınır; yanlış cevaplar puanı düşürmez. Sınavda 80 soru vardır ve doğru sayısı 100 üzerinden puana çevrilir. Bu nedenle her doğru cevap 100 ÷ 80 = 1,25 puan değerindedir. Puan, adayların birbirine göre başarısından bağımsızdır; yani standart puan ya da ortalamaya göre ölçekleme yapılmaz."
      ],
      formula: "YDS puanı = doğru sayısı × 1,25\nGereken doğru = hedef puan ÷ 1,25 (yukarı yuvarlanır)\nİptal varsa: soru puanı = 100 ÷ (80 − iptal edilen soru sayısı)",
      ol: [
        "Cevap anahtarıyla karşılaştırarak doğru sayınızı bulun; örneğin 51 doğru.",
        "Doğru sayısını 1,25 ile çarpın: 51 × 1,25 = 63,75 puan.",
        "Seviyeyi belirleyin: 63,75 puan 60–69 aralığında olduğu için D seviyesidir.",
        "Yanlış ve boş sayıları hesaba katmayın; 51 doğru ile 29 yanlış ya da 29 boş aynı puanı verir."
      ],
      after: [
        "Doğru sayınızı girerek puanınızı, seviyenizi ve hedef puan için gereken doğru sayısını görmek için [[arac:yds-puan-hesapla|YDS Puan Hesaplama]] aracını kullanabilirsiniz. Araç YDS, e-YDS ve YÖKDİL türlerini ayrı ayrı destekler."
      ]
    },
    {
      h: "Kaç doğru kaç puan? Tablo",
      table: {
        head: ["Doğru sayısı", "Puan", "Seviye", "Tipik kullanım"],
        rows: [
          ["40", "50,00", "E", "TUS, DUS, EUS yabancı dil şartı"],
          ["44", "55,00", "E", "Doktora ve doçentlik başvurusu asgari puanı"],
          ["48", "60,00", "D", "Birçok yüksek lisans ilanı"],
          ["52", "65,00", "D", "–"],
          ["56", "70,00", "C", "Yabancı dil tazminatı alt sınırı"],
          ["64", "80,00", "B", "Tazminatta B düzeyi"],
          ["72", "90,00", "A", "Tazminatta A düzeyi"],
          ["80", "100,00", "A", "Tam puan"]
        ],
        caption: "Eşikler yönetmelik ve ÖSYM kılavuzlarındaki genel değerlerdir; başvuracağınız kurumun ilanındaki puan esastır."
      },
      p: [
        "Tablodaki eşiklerin çoğu 1,25'in tam katı olduğu için tam sayı doğruya denk gelir. Kurumun istediği puan 1,25'in katı değilse, örneğin 62 puan isteniyorsa, 62 ÷ 1,25 = 49,6 çıkar ve yukarı yuvarlanarak 50 doğru gerekir; 49 doğru 61,25 puan eder ve eşiği karşılamaz."
      ]
    },
    {
      h: "YDS'de yanlış doğruyu götürür mü?",
      p: [
        "Hayır. YDS, e-YDS ve YÖKDİL'de yanlış cevaplar doğru cevapları götürmez; yalnızca doğru sayısı puana çevrilir. Bu durum, YKS ve KPSS gibi \"4 yanlış 1 doğruyu götürür\" kuralı olan sınavlardan farklıdır. Net hesabının mantığını merak ediyorsanız [[rehber:net-hesaplama-nasil-yapilir|net hesaplama rehberine]] bakabilirsiniz.",
        "Bu kuralın stratejik sonucu açıktır: hiçbir soruyu boş bırakmamak gerekir. Emin olmadığınız bir soruda bile işaretleme yapmak kaybettirmez; beş seçenekli bir soruda rastgele işaretleme bile yaklaşık %20 olasılıkla 1,25 puan kazandırır. Sınavın son dakikalarında boş kalan soruları mutlaka işaretleyin."
      ]
    },
    {
      h: "İptal edilen sorularda puan nasıl değişir?",
      p: [
        "Sınavdan sonra ÖSYM ya da yargı kararıyla bir soru iptal edilirse, o soru değerlendirme dışı kalır ve geçerli soruların puan değeri yeniden belirlenir. Böylece tam puan yine 100 olur, ama her doğrunun değeri biraz artar. Cevabı değiştirilen sorularda ise güncellenen cevap anahtarı esas alınır."
      ],
      table: {
        head: ["İptal edilen soru", "Geçerli soru", "Bir doğrunun puanı", "55 puan için gereken doğru"],
        rows: [
          ["0", "80", "1,250", "44"],
          ["1", "79", "1,266", "44"],
          ["2", "78", "1,282", "43"],
          ["4", "76", "1,316", "42"]
        ]
      }
    },
    {
      h: "YDS seviyeleri ve kullanım eşikleri",
      p: [
        "ÖSYM, YDS ve e-YDS sonuç belgesinde puanın yanında seviye harfini de gösterir. Seviye harfleri özellikle kamu personelinin yabancı dil tazminatında belirleyicidir. YÖKDİL ve e-YÖKDİL kılavuzlarında ise A–E seviyesi tanımlanmaz; bu sınavlarda yalnızca puan kullanılır."
      ],
      ul: [
        "<strong>Doktora ve doçentlik:</strong> Yönetmeliklerde aranan asgari puan 55'tir; üniversiteler doktora için daha yüksek puan isteyebilir.",
        "<strong>Tezli yüksek lisans:</strong> Ulusal bir asgari puan yoktur; puanı her üniversite kendisi belirler.",
        "<strong>Yabancı dil tazminatı:</strong> A, B ve C düzeyinde ödenir; D ve E düzeyinde ödenmez. Tazminat için YDS ya da e-YDS gerekir, YÖKDİL kabul edilmez.",
        "<strong>TUS, DUS, EUS:</strong> Yabancı dil şartı için en az 50 puan aranır."
      ]
    },
    {
      h: "YDS sonucu kaç yıl geçerli? YÖKDİL ile farkı",
      p: [
        "YDS sonucunun geçerlilik süresini sonucu kullanan kurum belirler. Yabancı dil tazminatında ve uzmanlık sınavlarında sonuç 5 yıl geçerlidir; tazminatta süre dolunca seviye bir alt düzeye inmiş sayılır. Lisansüstü başvurularda ise üniversitelerin ilanlarında belirttiği süre esastır.",
        "YÖKDİL, puan hesabı bakımından YDS ile aynıdır: 80 soru, doğru başına 1,25 puan ve yanlış cevap cezası yok. Farkı, sınavın fen, sağlık ve sosyal bilimler alanlarına göre ayrılması ve seviye harfi verilmemesidir. YÖKDİL sonucu lisansüstü eğitim ve hazırlık muafiyetinde 5 yıl, öğretim elemanı kadroları ve doçentlik başvurularında süresiz geçerlidir."
      ],
      table: {
        head: ["Özellik", "YDS / e-YDS", "YÖKDİL / e-YÖKDİL"],
        rows: [
          ["Soru sayısı", "80", "80"],
          ["Doğru başına puan", "1,25", "1,25"],
          ["Yanlış cezası", "Yok", "Yok"],
          ["Seviye harfi", "A–E", "Yok"],
          ["Yabancı dil tazminatı", "Geçerli", "Geçerli değil"],
          ["Alan ayrımı", "Yok", "Fen, sağlık, sosyal"]
        ]
      }
    },
    {
      h: "Kâğıt YDS mi, e-YDS mi?",
      p: [
        "İki sınav da aynı puanlama kuralını kullanır ve sonuçları aynı amaçlarla kabul edilir. Fark, uygulama biçimi ve takvimdedir. Kâğıt YDS yılda birkaç kez, belirli tarihlerde çok sayıda adayla yapılır. e-YDS ise ÖSYM'nin elektronik sınav merkezlerinde, yıl boyunca dağılmış oturumlarda uygulanır ve sonuçlar genellikle daha kısa sürede açıklanır.",
        "Acil bir başvuru için belge yetiştirmeniz gerekiyorsa e-YDS takvimi daha esnek seçenek sunabilir; ancak oturum kontenjanları sınırlıdır ve bazı dillerde yalnızca belirli tarihlerde sınav yapılır. Sınav ücretleri ve tarihler her yıl ÖSYM sınav takviminde ilan edildiği için başvurudan önce güncel takvimi kontrol edin."
      ]
    },
    {
      h: "Hazırlanırken süre ve hedef planı",
      p: [
        "YDS'de 80 soru için 180 dakika süre verilir; bu da soru başına ortalama 2 dakika 15 saniye demektir. Okuma parçaları daha uzun sürdüğü için kelime ve dil bilgisi sorularını daha hızlı çözmek, sona zaman bırakır. Deneme sınavlarında soru başına sürenizi ölçmek, gerçek sınavda hangi bölüme ne kadar ayıracağınızı planlamanızı sağlar.",
        "Hedefinizi doğru sayısıyla koymak çalışmayı somutlaştırır: 55 puan isteyen biri için hedef 80 soruda 44 doğrudur, yani soruların %55'i. Denemelerde ortalama doğru sayınızı izleyip hedefe ne kadar uzak olduğunuzu görebilirsiniz. Çözme hızınızı ölçmek için [[arac:soru-cozme-hizi-hesapla|Soru Çözme Hızı Hesaplama]] aracını, yüzde hesapları için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracını kullanabilirsiniz."
      ]
    }
  ],
  faq: [
    ["YDS puanı nasıl hesaplanır?", "YDS puanı doğru cevap sayısının 1,25 ile çarpılmasıyla bulunur. Sınavda 80 soru vardır ve 100 tam puan bu sorulara eşit dağıtılır; yanlış ve boş cevaplar puanı etkilemez."],
    ["YDS'de her soru kaç puan?", "İptal edilen soru yoksa her doğru cevap 100 ÷ 80 = 1,25 puan değerindedir. Soru iptal edilirse geçerli soru sayısı azalır ve bir doğrunun değeri 100 ÷ (80 − iptal sayısı) olarak yeniden hesaplanır."],
    ["YDS'de yanlış doğruyu götürür mü?", "Hayır. YDS, e-YDS ve YÖKDİL'de yalnızca doğru cevaplar puana çevrilir, yanlışlar doğruları götürmez. Bu yüzden hiçbir soruyu boş bırakmamak ve emin olunmayan sorularda da işaretleme yapmak mantıklıdır."],
    ["YDS 60 puan için kaç doğru gerekir?", "60 puan için 60 ÷ 1,25 = 48 doğru gerekir. Benzer şekilde 50 puan için 40, 55 puan için 44, 70 puan için 56 ve 80 puan için 64 doğru yapmak gerekir."],
    ["YDS seviye harfleri (A, B, C) ne anlama gelir?", "ÖSYM puanı seviyeye de çevirir: 90–100 A, 80–89 B, 70–79 C, 60–69 D, 50–59 E. Bu harfler özellikle kamu personelinin yabancı dil tazminatında kullanılır; tazminat A, B ve C düzeyinde ödenir."],
    ["YDS sonucu kaç yıl geçerli?", "Geçerlilik süresini sonucu kullanan kurum belirler. Yabancı dil tazminatında ve TUS, DUS, EUS gibi sınavlarda 5 yıldır; lisansüstü başvurularda üniversitenin ilanında yazan süre esas alınır."],
    ["YÖKDİL ile YDS puanı aynı mı hesaplanır?", "Evet. YÖKDİL'de de 80 soru vardır, her doğru 1,25 puandır ve yanlışlar doğruyu götürmez. Farkı, alanlara göre ayrı sınav yapılması, seviye harfi verilmemesi ve yabancı dil tazminatında kullanılamamasıdır."],
    ["Akademik kadro için kaç YDS gerekir?", "Doktora başvurusu ve doçentlik için yönetmeliklerdeki asgari puan 55'tir. Tezli yüksek lisansta ulusal bir alt sınır yoktur; puanı üniversite belirler. Kadro ilanlarında daha yüksek puan istenebilir, ilanı kontrol edin."]
  ],
  tools: ["yds-puan-hesapla", "yuzde-hesapla", "soru-cozme-hizi-hesapla", "t-skoru-hesapla"],
  related: ["takdir-tesekkur-kac-ortalama", "kyk-borcu-nasil-hesaplanir"],
  sources: [
    ["ÖSYM – YDS ve YÖKDİL kılavuzları", "https://www.osym.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – Lisansüstü Eğitim ve Öğretim Yönetmeliği", "https://www.mevzuat.gov.tr/"],
    ["YÖK – Doçentlik Yönetmeliği", "https://www.yok.gov.tr/"]
  ]
};
