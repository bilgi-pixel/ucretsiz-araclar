export default {
  slug: "gantt-semasi-nedir-nasil-hazirlanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Gantt Şeması Nedir, Nasıl Hazırlanır? Proje Takvimi ve İş Günü Hesabı",
  pageTitle: "Gantt Şeması Nedir, Nasıl Hazırlanır? İş Günü ve Kritik Yol",
  description: "Gantt şeması görevleri zaman ekseninde çubuklarla gösteren proje takvimidir. Görev bölme, iş günü hesabı, bağımlılık, kritik yol ve tatil etkisi örnekle.",
  keywords: ["gantt şeması nedir", "gantt şeması nasıl yapılır", "proje takvimi", "proje planı hazırlama", "iş bağımlılıkları", "kritik yol", "excel gantt", "kilometre taşı"],
  lead: "Gantt şeması, bir projedeki görevleri satırlara, zamanı sütunlara yerleştirip her görevi başlangıç ve bitiş tarihleri arasında uzanan bir çubukla gösteren proje takvimidir. Görevlerin hangi sırayla yapılacağı, hangilerinin paralel ilerleyebileceği ve projenin en erken ne zaman biteceği tek bakışta görülür. Bu yazıda projeyi görevlere bölmeyi, süreleri iş günüyle hesaplamayı, bağımlılıkları ve kritik yolu bulmayı, resmî tatillerin etkisini ve 19 Ekim 2026'da başlayan örnek bir proje üzerinden şemayı adım adım hazırlamayı anlatıyoruz.",
  kisaCevap: [
    "Gantt şeması, görevleri zaman ekseninde yatay çubuklarla gösteren bir proje çizelgesidir.",
    "Her görev için ad, süre (iş günü), başlangıç, bitiş, sorumlu ve öncül görev belirlenir.",
    "En yaygın bağımlılık \"bitir-başla\"dır: bir görev bitmeden ardılı başlamaz.",
    "Kritik yol, bolluğu (gecikme payı) sıfır olan görevler zinciridir; bu zincirdeki bir günlük gecikme projeyi bir gün geciktirir.",
    "Süreler iş günüyle hesaplanır; hafta sonları ve resmî tatiller takvimde atlanır.",
    "Kilometre taşları süresi sıfır olan önemli anlardır ve şemada eşkenar dörtgenle gösterilir.",
    "Örnek projede 20 iş günü, 19 Ekim–16 Kasım 2026 arasındaki 29 takvim gününe yayılır."
  ],
  figure: {
    alt: "Web sitesi projesi Gantt şeması: analiz, tasarım, içerik, kodlama, test ve yayın görevleri; 29 Ekim tatili, içerik görevinin 7 iş günü bolluğu ve kritik yol vurgulu.",
    caption: "Örnek proje 19 Ekim 2026 Pazartesi başlar. Koyu çubuklar kritik yolu (Analiz → Tasarım → Kodlama → Test → Yayın, 20 iş günü), açık çubuk bolluğu olan İçerik görevini gösterir. 29 Ekim resmî tatili ve hafta sonları atlanmıştır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="26" class="lg b mid">Örnek proje: web sitesi yenileme (2026)</text>
  <g class="sm t2 mid">
    <text x="174" y="54">19 Eki</text><text x="290" y="54">26 Eki</text><text x="406" y="54">2 Kas</text><text x="522" y="54">9 Kas</text><text x="638" y="54">16 Kas</text>
  </g>
  <line x1="166" y1="62" x2="700" y2="62" class="sb" fill="none"/>
  <rect x="332" y="62" width="16" height="276" class="dgs"/>
  <text x="340" y="354" class="sm mid dg">29 Eki</text>
  <g class="sm">
    <text x="20" y="90" class="b">A Analiz (3 g)</text><rect x="166" y="76" width="50" height="20" rx="3" class="p"/>
    <text x="20" y="130" class="b">B Tasarım (5 g)</text><rect x="216" y="116" width="117" height="20" rx="3" class="p"/>
    <text x="20" y="170" class="b">C İçerik (6 g)</text><rect x="216" y="156" width="149" height="20" rx="3" class="ps"/>
    <rect x="365" y="156" width="182" height="20" rx="3" class="sf sb dash"/><text x="456" y="170" class="mid">bolluk 7 iş günü</text>
    <text x="20" y="210" class="b">D Kodlama (8 g)</text><rect x="348" y="196" width="199" height="20" rx="3" class="p"/>
    <text x="20" y="250" class="b">E Test (3 g)</text><rect x="547" y="236" width="50" height="20" rx="3" class="p"/>
    <text x="20" y="290" class="b">F Yayın (1 g)</text><rect x="630" y="276" width="17" height="20" rx="3" class="p"/>
    <polygon points="647,306 655,314 647,322 639,314" class="a"/>
    <text x="633" y="318" class="end b">Kilometre taşı: yayında</text>
  </g>
  <rect x="20" y="364" width="680" height="44" rx="8" class="sf sb"/>
  <text x="36" y="384" class="sm"><tspan class="b">Kritik yol:</tspan> A → B → D → E → F = 3 + 5 + 8 + 3 + 1 = 20 iş günü</text>
  <text x="36" y="401" class="sm t2">Hafta sonları sayılmaz; 28 Ekim arife günü tam iş günü kabul edildi.</text>
</svg>`
  },
  sections: [
    {
      h: "Gantt şeması nedir, ne işe yarar?",
      p: [
        "Gantt şeması, 20. yüzyılın başında makine mühendisi Henry Gantt'ın üretim planlaması için yaygınlaştırdığı bir çubuk grafik türüdür. Sol sütunda projenin görevleri, üstte zaman ekseni bulunur; her görev başlangıç ve bitiş tarihleri arasında uzanan yatay bir çubukla gösterilir. Çubukların uzunluğu süreyi, yerleri ise zamanlamayı anlatır.",
        "Şemanın gücü, karmaşık bir planı tek sayfada görünür kılmasıdır. Ekip üyeleri hangi görevin ne zaman başlayacağını, kimin hangi işi bekleyeceğini ve projenin genel olarak takvimde nerede olduğunu kolayca görür. Yöneticiler için ise gecikmelerin projenin bitişine nasıl yansıyacağını izlemenin en pratik yoludur.",
        "Gantt şeması inşaat, yazılım geliştirme, etkinlik organizasyonu, tez çalışması ve hibe başvurusu gibi başı ve sonu belli her iş için kullanılabilir. Kamu destek başvurularında ve [[bilgi:is-plani-nasil-hazirlanir-kosgeb-ornegi|iş planlarında]] \"iş-zaman çizelgesi\" olarak sıkça istenir."
      ]
    },
    {
      h: "Bir proje görevlere nasıl bölünür?",
      p: [
        "İyi bir şemanın temeli iş kırılım yapısıdır: proje önce ana aşamalara, aşamalar da sorumlusu ve çıktısı belli görevlere ayrılır. Bir görevin şemada yer alabilmesi için tek bir kişiye ya da ekibe atanabilmesi, ölçülebilir bir çıktısı olması ve süresinin tahmin edilebilmesi gerekir. \"Web sitesi yapılacak\" bir görev değil, projenin kendisidir; \"ana sayfa tasarımının onaylanması\" ise bir görevdir.",
        "Görev büyüklüğü için yaygın bir ölçü, bir görevin 1 ile 10 iş günü arasında sürmesidir. Daha uzun görevler izlemeyi zorlaştırır, çok kısa görevler ise şemayı kalabalıklaştırır. Uzun bir görevi alt görevlere bölerek ilerlemeyi daha sık kontrol edebilirsiniz."
      ],
      table: {
        head: ["Görev", "Süre (iş günü)", "Öncül", "Sorumlu (örnek)"],
        rows: [
          ["A – İhtiyaç analizi", "3", "—", "Proje yöneticisi"],
          ["B – Tasarım", "5", "A", "Tasarımcı"],
          ["C – İçerik hazırlığı", "6", "A", "İçerik ekibi"],
          ["D – Kodlama", "8", "B", "Yazılımcı"],
          ["E – Test", "3", "C, D", "Test sorumlusu"],
          ["F – Yayın", "1", "E", "Proje yöneticisi"]
        ],
        caption: "Örnek proje: altı görev, iki paralel kol (B–D ve C)."
      }
    },
    {
      h: "Görev süreleri iş günü olarak nasıl hesaplanır?",
      p: [
        "Proje görevlerinde süre genellikle takvim günü yerine iş günüyle verilir, çünkü ekip hafta sonu ve resmî tatillerde çalışmaz. Görevin bitiş tarihi, başlangıç gününden itibaren iş günleri sayılarak bulunur; başlangıç günü birinci iş günüdür. Bir sonraki görev, öncülünün bittiği günden sonraki ilk iş gününde başlar.",
        "Örnek projede A görevi 19 Ekim 2026 Pazartesi başlar ve 3 iş günü sürer: 19, 20 ve 21 Ekim; bitiş 21 Ekim Çarşamba. B görevi 22 Ekim Perşembe başlar; 22, 23, 26, 27 ve 28 Ekim günleriyle 5 iş günü doldurur ve 28 Ekim Çarşamba biter (24–25 Ekim hafta sonudur)."
      ],
      formula: "Bitiş = başlangıç + (süre − 1) iş günü   (hafta sonu ve tatiller atlanır)\nArdılın başlangıcı = öncülün bitişinden sonraki ilk iş günü",
      after: [
        "Bu sayımı elle yapmak hataya açıktır. [[arac:gun-sayisi-ekle-is-gunu|İş Günü Ekleme aracına]] başlangıç tarihini, iş günü sayısını ve tatil günlerini girerek bitiş tarihini doğrudan bulabilirsiniz. Bir aydaki iş günü sayısının nasıl değiştiğini [[bilgi:bir-ayda-kac-is-gunu-var|bir ayda kaç iş günü var]] yazısı anlatır."
      ]
    },
    {
      h: "Resmî tatiller ve hafta sonları planı nasıl etkiler?",
      p: [
        "Resmî tatiller, şemadaki çubukları takvimde ileri iter. Örnek projede C (İçerik) görevi 22 Ekim'de başlar ve 6 iş günü sürer. 29 Ekim Cumhuriyet Bayramı tatil olduğu için sayım 22, 23, 26, 27, 28 ve 30 Ekim günleriyle tamamlanır; bitiş 30 Ekim Cuma olur. Tatil olmasaydı görev 29 Ekim'de biterdi.",
        "Kritik yoldaki D (Kodlama) görevi de 30 Ekim Cuma başlar, 8 iş günü sürer: 30 Ekim, 2, 3, 4, 5, 6, 9 ve 10 Kasım. Ardından E (Test) 11–13 Kasım, F (Yayın) 16 Kasım Pazartesi yapılır. Böylece 20 iş günlük proje 19 Ekim–16 Kasım arasındaki 29 takvim gününe yayılır.",
        "Ramazan ve Kurban bayramları gibi uzun tatiller, özellikle hafta sonlarıyla birleştiğinde projeyi bir haftadan fazla geciktirebilir. Arife günlerinin yarım gün olması da göz önüne alınmalıdır; örnekte 28 Ekim arifesi sadelik için tam gün sayılmıştır. Planı yapmadan önce [[arac:resmi-tatiller|Resmî Tatiller takvimine]] bakıp tatilleri listelemek iyi bir alışkanlıktır."
      ],
      table: {
        head: ["Görev", "Başlangıç", "Bitiş", "Süre"],
        rows: [
          ["A – Analiz", "19 Ekim 2026 Pzt", "21 Ekim 2026 Çar", "3 iş günü"],
          ["B – Tasarım", "22 Ekim 2026 Per", "28 Ekim 2026 Çar", "5 iş günü"],
          ["C – İçerik", "22 Ekim 2026 Per", "30 Ekim 2026 Cum", "6 iş günü (29 Ekim atlandı)"],
          ["D – Kodlama", "30 Ekim 2026 Cum", "10 Kasım 2026 Sal", "8 iş günü"],
          ["E – Test", "11 Kasım 2026 Çar", "13 Kasım 2026 Cum", "3 iş günü"],
          ["F – Yayın", "16 Kasım 2026 Pzt", "16 Kasım 2026 Pzt", "1 iş günü"]
        ]
      }
    },
    {
      h: "Görevler arasındaki bağımlılıklar nasıl gösterilir?",
      p: [
        "Bağımlılık, bir görevin başlaması ya da bitmesi için başka bir görevin durumuna bağlı olmasıdır. Şemada genellikle öncül görevin çubuğunun sonundan ardıl görevin çubuğunun başına çizilen bir okla gösterilir. Dört tür bağımlılık vardır:"
      ],
      ul: [
        "<strong>Bitir–başla (BB):</strong> En yaygın türdür. Tasarım bitmeden kodlama başlamaz.",
        "<strong>Başla–başla (SS):</strong> İki görev aynı anda başlayabilir; içerik hazırlığı tasarımla birlikte başlar.",
        "<strong>Bitir–bitir (FF):</strong> Biri bitmeden diğeri bitemez; dokümantasyon kodlamayla birlikte biter.",
        "<strong>Başla–bitir (SF):</strong> Nadir kullanılır; yeni sistem çalışmaya başlamadan eski sistem kapatılmaz.",
        "<strong>Gecikme ve öne alma:</strong> \"Bitir–başla + 2 gün\" gibi bekleme süreleri (boya kurumasını beklemek) ya da \"−1 gün\" ile çakışan başlangıçlar da tanımlanabilir."
      ],
      after: [
        "Örnek projede E (Test) hem C'ye hem D'ye bağlıdır. Test, iki görevin de bitmesini bekler; bu nedenle başlangıcı ikisinden geç biteni, yani D'nin bitişi belirler."
      ]
    },
    {
      h: "Kritik yol nedir, nasıl bulunur?",
      p: [
        "Kritik yol, projenin başından sonuna giden görev zincirleri içinde toplam süresi en uzun olanıdır. Projenin en erken bitiş tarihini bu zincir belirler. Kritik yoldaki görevlerin <strong>bolluğu</strong> (gecikme payı) sıfırdır: bu görevlerden birindeki bir günlük gecikme, tüm projeyi bir gün geciktirir.",
        "Örnekte iki yol vardır: A → B → D → E → F toplam 3 + 5 + 8 + 3 + 1 = 20 iş günü; A → C → E → F toplam 3 + 6 + 3 + 1 = 13 iş günü. Kritik yol ilk zincirdir. C görevinin bolluğu 20 − 13 = 7 iş günüdür; yani içerik hazırlığı 7 iş günü gecikse bile proje zamanında biter. Takvimde de bu görülür: C 30 Ekim'de biter, test ise ancak D bittikten sonra, 11 Kasım'da başlar."
      ],
      ol: [
        "Her görev için en erken başlangıç ve bitiş tarihlerini, öncüllerden başlayarak ileriye doğru hesaplayın.",
        "Projenin bitişinden geriye doğru giderek her görevin en geç başlangıç ve bitiş tarihlerini bulun.",
        "Her görev için bolluk = en geç başlangıç − en erken başlangıç değerini hesaplayın.",
        "Bolluğu sıfır olan görevleri birleştirin; bu zincir kritik yoldur.",
        "Kritik yoldaki görevleri şemada koyu renkle işaretleyin ve en sık bunları izleyin."
      ]
    },
    {
      h: "Kilometre taşları şemada nasıl işaretlenir?",
      p: [
        "Kilometre taşı, süresi olmayan ama proje için önemli bir anı temsil eden işarettir: tasarım onayı, sözleşme imzası, ödeme tarihi, ürünün yayına alınması gibi. Gantt şemasında çubuk yerine küçük bir eşkenar dörtgenle gösterilir. Kilometre taşları hem ekibe hem müşteriye ilerlemeyi anlatmanın en net yoludur.",
        "Örnek projede üç kilometre taşı tanımlanabilir: analiz raporunun onayı (21 Ekim), tasarım onayı (28 Ekim) ve yayına alma (16 Kasım). Ödemeler kilometre taşlarına bağlanıyorsa, taşın tarihinin kaymasının nakit akışını nasıl etkileyeceğini de planlamak gerekir. Tarihe kaç gün kaldığını izlemek için [[arac:tarih-farki|Tarih Farkı aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Gantt şeması Excel'de veya yazdırılabilir şablonla nasıl hazırlanır?",
      p: [
        "Küçük projeler için özel bir yazılıma gerek yoktur. Bir elektronik tabloda görev, başlangıç, süre ve bitiş sütunlarını oluşturup sağ tarafa her güne ya da haftaya bir sütun açabilirsiniz. Koşullu biçimlendirmeyle, sütunun tarihi görevin başlangıç ve bitiş tarihleri arasındaysa hücreyi boyayan bir kural tanımlarsınız; böylece çubuklar kendiliğinden oluşur. İş günü hesabı için tablo programlarının iş günü işlevleri kullanılabilir.",
        "Ekip toplantılarında duvara asmak ya da kâğıt üzerinde çalışmak isterseniz [[arac:proje-planlayici|Proje Planlayıcı]] ile görev, sorumlu ve hafta sütunlarından oluşan yazdırılabilir bir plan oluşturabilirsiniz. Haftalık iş takibi için [[arac:haftalik-planlayici|Haftalık Planlayıcı]], aylık genel görünüm için Takvim Oluşturucu da kullanılabilir. Uzun bir şemayı tek sayfaya sığdırmakta zorlanırsanız [[bilgi:excel-tablosu-tek-sayfaya-sigdirma|Excel tablosunu tek sayfaya sığdırma]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Plan gecikince şema nasıl güncellenir? Sık hatalar",
      p: [
        "Gantt şeması bir kez çizilip bırakılan bir belge değildir. Haftada en az bir kez gerçekleşen başlangıç ve bitiş tarihleri işlenmeli, tamamlanma yüzdeleri güncellenmeli ve geciken görevlerin ardılları kaydırılmalıdır. Başlangıçtaki planı \"temel plan\" olarak saklamak, sapmayı görmeyi kolaylaştırır.",
        "Kritik yoldaki bir görev gecikirse üç seçenek vardır: ek kaynak ayırarak görevi kısaltmak, sonraki bir görevi paralel yürütmek (risk artar) ya da bitiş tarihini resmî olarak ertelemek. Bolluğu olan görevlerdeki gecikmeler ise bolluk tükenene kadar bitişi etkilemez; ama bolluk biterse görev kritik yola girer."
      ],
      ul: [
        "<strong>Takvim günüyle hesaplamak:</strong> Hafta sonlarını ve tatilleri saymak, planı gerçekçi olmayan biçimde kısaltır.",
        "<strong>Bağımlılıkları yazmamak:</strong> Çubukları elle yerleştirmek, bir gecikmenin hangi görevleri etkileyeceğini görmeyi engeller.",
        "<strong>Kaynak çakışmasını gözden kaçırmak:</strong> Aynı kişiye aynı günlerde iki tam zamanlı görev vermek planı geçersiz kılar.",
        "<strong>Tampon bırakmamak:</strong> Kritik yolun sonuna küçük bir proje tamponu eklemek beklenmedik gecikmelere karşı korur.",
        "<strong>Güncellememek:</strong> Gerçekleşenle güncellenmeyen şema birkaç hafta içinde işe yaramaz hâle gelir."
      ]
    }
  ],
  faq: [
    ["Gantt şeması nedir, ne işe yarar?", "Gantt şeması, proje görevlerini satırlarda ve zamanı sütunlarda gösteren, her görevi başlangıç ile bitiş arasında uzanan bir çubukla çizen proje takvimidir. Görev sırasını, paralel işleri ve projenin bitiş tarihini tek bakışta gösterir."],
    ["Bir proje görevlere nasıl bölünür?", "Proje önce ana aşamalara, sonra sorumlusu, çıktısı ve süresi belli görevlere ayrılır. Yaygın bir ölçü olarak her görev 1 ile 10 iş günü arasında tutulur; daha uzun görevler alt görevlere bölünür."],
    ["Görev süreleri iş günü olarak nasıl hesaplanır?", "Başlangıç günü birinci iş günü sayılır ve hafta sonları ile resmî tatiller atlanarak süre kadar iş günü ilerlenir. Ardıl görev, öncülün bittiği günden sonraki ilk iş gününde başlar."],
    ["Görevler arasındaki bağımlılıklar nasıl gösterilir?", "Bağımlılıklar öncül görevin çubuğundan ardıl görevin çubuğuna çizilen oklarla gösterilir. En yaygın tür bitir-başla bağımlılığıdır; başla-başla, bitir-bitir ve başla-bitir türleri de kullanılabilir."],
    ["Kritik yol nedir?", "Kritik yol, projenin başından sonuna giden en uzun görev zinciridir ve bolluğu sıfır olan görevlerden oluşur. Bu zincirdeki her gecikme projenin bitiş tarihini aynı oranda geciktirir."],
    ["Kilometre taşları şemada nasıl işaretlenir?", "Kilometre taşları süresi olmayan önemli anlardır ve çubuk yerine eşkenar dörtgen simgesiyle gösterilir. Tasarım onayı, sözleşme imzası ve yayına alma gibi tarihler kilometre taşı olarak tanımlanır."],
    ["Resmî tatiller ve hafta sonları planı nasıl etkiler?", "İş günüyle hesaplanan görevler tatil ve hafta sonlarında ilerlemez, bu yüzden çubuklar takvimde ileri kayar. Örnek projede 29 Ekim tatili nedeniyle içerik görevi bir gün geç bitmiştir."],
    ["Gantt şeması Excel'de veya yazdırılabilir şablonla nasıl hazırlanır?", "Tabloda görev, başlangıç, süre ve bitiş sütunları oluşturulur; sağa gün ya da hafta sütunları eklenip koşullu biçimlendirmeyle tarih aralığındaki hücreler boyanır. Yazdırılabilir proje planlayıcı şablonları da kullanılabilir."],
    ["Plan gecikince şema nasıl güncellenir?", "Gerçekleşen tarihler ve tamamlanma yüzdeleri düzenli işlenir, geciken görevlerin ardılları kaydırılır. Kritik yoldaki gecikmeler için kaynak ekleme, paralel çalışma ya da bitiş tarihini erteleme seçenekleri değerlendirilir."]
  ],
  tools: ["proje-planlayici", "gun-sayisi-ekle-is-gunu", "takvim-olustur", "haftalik-planlayici", "resmi-tatiller"],
  related: ["bir-ayda-kac-is-gunu-var", "is-plani-nasil-hazirlanir-kosgeb-ornegi"]
};
