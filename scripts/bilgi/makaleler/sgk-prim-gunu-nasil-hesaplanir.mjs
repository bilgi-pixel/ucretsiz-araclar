export default {
  slug: "sgk-prim-gunu-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "SGK Prim Günü Nasıl Hesaplanır? Hizmet Dökümü Nasıl Okunur",
  pageTitle: "SGK Prim Günü Hesaplama ve Hizmet Dökümü Okuma Rehberi",
  description: "SGK'da bir ay en fazla 30, bir yıl 360 prim günüdür. Hizmet dökümü e-Devlet'ten nasıl alınır, eksik gün kodları ne demek, borçlanma ve örnek hesap.",
  keywords: ["sgk prim günü hesaplama", "hizmet dökümü sorgulama", "ssk prim gün sayısı öğrenme", "emeklilik için kaç gün prim gerekir", "4a hizmet dökümü", "eksik prim günü", "prim günü nasıl öğrenilir", "eksik gün kodları"],
  lead: "SGK prim günü, adınıza sigorta primi bildirilen günlerin toplamıdır ve hesapta her ay en fazla <strong>30 gün</strong>, her yıl en fazla <strong>360 gün</strong> sayılır. Kendi prim gününüzü e-Devlet'teki \"SGK Tescil ve Hizmet Dökümü\" hizmetinden ücretsiz öğrenebilirsiniz. Dökümde her ay için bildirilen gün sayısı, kazanç ve varsa eksik gün nedeni yer alır. Bu rehberde dökümü satır satır okumayı, eksik gün kodlarının anlamını, askerlik ve doğum borçlanmasının etkisini ve emekliliğe kalan günü elle hesaplamayı anlatıyoruz.",
  kisaCevap: [
    "SGK hesabında 1 ay = 30 gün, 1 yıl = 360 gündür; 31 çeken aylar da 30 gün sayılır.",
    "Prim günü e-Devlet'te \"SGK Tescil ve Hizmet Dökümü\" hizmetinden barkodlu belge olarak alınır.",
    "1 Ekim 2008'den sonra ilk kez 4/a ile sigortalı olanlar için sık anılan şart 7.200 prim günüdür.",
    "Eksik gün varsa işveren bunun nedenini kodla bildirir; ör. 01 istirahat, 06 kısmi istihdam, 07 puantaj kayıtları.",
    "Askerlik ve doğum borçlanmasıyla satın alınan günler prim gününe eklenir.",
    "Kısmi süreli çalışmada toplam çalışma saati 7,5'e bölünerek prim günü bulunur."
  ],
  figure: {
    alt: "Hizmet dökümünden prim günü toplama örneği: üç çalışma dönemi 1.440, 900 ve 2.160 gün, toplam 4.500 gün; 7.200 güne kalan 2.700 gün yaklaşık 7,5 yıl.",
    caption: "Örnek: üç farklı işyerinde geçen tam çalışma dönemleri yıl × 360 ve ay × 30 kuralıyla toplanır. Çubuğun dolu kısmı biriken gün, açık kısmı 7.200 gün hedefine kalan bölümdür.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Prim günü nasıl toplanır?</text>
  <text x="360" y="54" class="sm mid t2">Kural: 1 ay = 30 gün, 1 yıl = 360 gün</text>
  <rect x="20" y="72" width="215" height="92" rx="10" class="sf sb"/>
  <text x="127" y="98" class="sm mid t2">1. işyeri</text>
  <text x="127" y="122" class="b mid">4 yıl tam çalışma</text>
  <text x="127" y="148" class="mid p b">4 × 360 = 1.440</text>
  <rect x="252" y="72" width="215" height="92" rx="10" class="sf sb"/>
  <text x="359" y="98" class="sm mid t2">2. işyeri</text>
  <text x="359" y="122" class="b mid">2 yıl 6 ay</text>
  <text x="359" y="148" class="mid p b">720 + 180 = 900</text>
  <rect x="484" y="72" width="216" height="92" rx="10" class="sf sb"/>
  <text x="592" y="98" class="sm mid t2">3. işyeri</text>
  <text x="592" y="122" class="b mid">6 yıl tam çalışma</text>
  <text x="592" y="148" class="mid p b">6 × 360 = 2.160</text>
  <text x="20" y="206" class="b">Toplam: 1.440 + 900 + 2.160 = 4.500 gün</text>
  <rect x="20" y="222" width="680" height="44" rx="8" class="sf sb"/>
  <rect x="20" y="222" width="425" height="44" rx="8" class="p"/>
  <text x="232" y="250" class="mid b sf">4.500 gün birikti (%62,5)</text>
  <text x="572" y="250" class="mid b">2.700 gün kaldı</text>
  <text x="20" y="288" class="sm mu">0</text><text x="700" y="288" class="sm end mu">7.200 gün</text>
  <rect x="20" y="304" width="330" height="80" rx="10" class="ps"/>
  <text x="36" y="330" class="sm b">Kalan süre (tam çalışma ile)</text>
  <text x="36" y="354" class="b">2.700 ÷ 360 = 7,5 yıl</text>
  <text x="36" y="374" class="sm t2">yaklaşık 7 yıl 6 ay</text>
  <rect x="370" y="304" width="330" height="80" rx="10" class="oks"/>
  <text x="386" y="330" class="sm b">Borçlanma eklenirse</text>
  <text x="386" y="354" class="b">ör. 540 gün askerlik</text>
  <text x="386" y="374" class="sm t2">kalan 2.160 gün = 6 yıl</text>
</svg>`
  },
  sections: [
    {
      h: "Prim günü nedir, hizmet süresinden farkı ne?",
      p: [
        "Prim günü, işvereninizin ya da sizin SGK'ya bildirdiği ve primi ödenen gün sayısıdır. Emeklilik, işsizlik ödeneği, analık ödeneği ve hastalık parası gibi hakların neredeyse tamamı prim gününe bağlıdır. Bu nedenle \"kaç yıldır çalışıyorum\" sorusundan çok \"kaç gün prim ödendi\" sorusu belirleyicidir.",
        "Sigortalılık süresi ise ilk kez sigortalı olduğunuz tarihten bugüne kadar geçen takvim süresidir. 2005'te ilk işe girmiş biri 2026'da 21 yıllık sigortalıdır; ancak arada çalışmadığı yıllar olduysa prim günü bu sürenin çok altında kalabilir. Emeklilikte hem yaş, hem sigortalılık süresi, hem de prim günü şartı birlikte aranabilir."
      ]
    },
    {
      h: "SGK'nın gün sayma kuralı: ay 30, yıl 360",
      p: [
        "SGK ay içindeki gerçek takvim gününe bakmaz. Ayın tamamında çalışan bir sigortalı için 31 çeken Ocak da, 28 çeken Şubat da 30 gün olarak bildirilir. Bir ayda bildirilebilecek en fazla gün 30 olduğu için bir yılın tamamında çalışan kişi en fazla 360 gün prim kazanır.",
        "Aynı ay içinde birden fazla işyerinde çalışsanız bile toplam bildirim 30 günü geçmez. Ay ortasında işe girip çıkanlarda ise gerçek çalışılan gün sayısı bildirilir: 10 Mart'ta işe başlayan biri için Mart ayında 10–31 Mart arası olan 22 gün bildirilir; çünkü kısmi aylarda fiilen çalışılan takvim günü esas alınır. Aynı kişi 10 Nisan'da başlasaydı Nisan için 21 gün bildirilirdi."
      ],
      formula: "Tam yıllar: yıl sayısı × 360\nTam aylar: ay sayısı × 30\nKısmi ay: o ayda fiilen çalışılan gün\nToplam prim günü = tüm dönemlerin toplamı",
      after: [
        "Bu kural yüzünden takvimle yapılan hesap SGK kaydından farklı çıkar. Örneğin 1 Ocak 2016 ile 31 Aralık 2025 arasında kesintisiz çalışan biri takvimde 3.653 gün geçirmiştir ama prim günü 10 × 360 = 3.600'dür. İki tarih arasındaki takvim gününü merak ediyorsanız [[arac:tarih-farki|İki Tarih Arası Gün Hesaplama]] aracını, SGK usulü toplam için ise [[arac:sgk-gun-hesapla|SGK Gün Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Hizmet dökümü e-Devlet'ten nasıl alınır ve okunur?",
      ol: [
        "e-Devlet'e giriş yapın ve arama kutusuna \"SGK Tescil ve Hizmet Dökümü\" yazın.",
        "Açılan sayfada 4/a (SSK), 4/b (Bağ-Kur) ya da 4/c (Emekli Sandığı) hizmetlerinizden ilgili olanı seçin; birden çok statüde çalıştıysanız hepsini ayrı ayrı kontrol edin.",
        "\"Toplu Hizmet Dökümü\" ya da \"Ay/Gün Bazında Hizmet Dökümü\" seçeneğiyle belgeyi görüntüleyin; barkodlu PDF olarak indirip saklayabilirsiniz.",
        "Belgenin üst kısmındaki özet tabloda toplam prim günü ve ilk işe giriş tarihi yazar. Alt kısımdaki satırlarda her ay için işyeri, gün sayısı, kazanç ve eksik gün nedeni yer alır."
      ],
      table: {
        head: ["Sütun", "Ne anlama gelir?", "Nelere dikkat etmeli?"],
        rows: [
          ["Yıl / Ay", "Bildirimin ait olduğu dönem", "Çalıştığınız aylar eksiksiz listelenmeli"],
          ["Gün", "O ay bildirilen prim günü", "Tam ayda 30 olmalı; daha azsa nedenini arayın"],
          ["Kazanç", "Prime esas brüt kazanç", "Gerçek brüt ücretinizle karşılaştırın"],
          ["Eksik gün nedeni", "30'dan az bildirimin kodu", "Kod yoksa ya da yanlışsa işverene sorun"],
          ["Belge türü", "Bildirimin sigorta kolu", "Tüm sigorta kolları mı, sadece GSS mi?"]
        ]
      },
      after: [
        "Kazanç sütununda gerçek ücretinizin altında bir tutar görüyorsanız bu, gelecekteki emekli aylığınızı ve işsizlik ödeneğinizi doğrudan düşürür. Eksik ya da hatalı bildirimler için önce işverenle görüşmek, sonuç alamazsanız SGK'ya hizmet tespiti için başvurmak gerekir."
      ]
    },
    {
      h: "Eksik gün kodları ne anlama gelir?",
      p: [
        "Bir sigortalı için ayda 30 günden az bildirim yapılırsa işveren bunun nedenini bir kodla açıklar. Bu kodlar dökümde \"eksik gün nedeni\" sütununda görünür. En sık karşılaşılanlar aşağıdadır; listenin tamamı ve güncel hâli SGK'nın e-Bildirge kılavuzunda yer alır."
      ],
      table: {
        head: ["Kod", "Anlamı", "Prim gününe etkisi"],
        rows: [
          ["01", "İstirahat (raporlu günler)", "Raporlu günler için prim yatmaz, gün eksik görünür"],
          ["03", "Disiplin cezası", "Ceza süresi kadar gün eksilir"],
          ["06", "Kısmi istihdam", "Yalnızca çalışılan saate denk gün bildirilir"],
          ["07", "Puantaj kayıtları", "Puantaja göre çalışılmayan günler"],
          ["13", "Diğer nedenler", "Açıklama belgesi istenebilir"],
          ["15", "Devamsızlık", "İşe gelinmeyen günler"],
          ["21", "Diğer ücretsiz izin", "Ücretsiz izinde prim ödenmez"]
        ],
        caption: "Kod listesi örnek amaçlı kısaltılmıştır; tam ve güncel liste için SGK e-Bildirge kılavuzuna bakın."
      },
      after: [
        "Tam zamanlı çalıştığınız hâlde dökümde düzenli olarak 06 ya da 13 koduyla eksik gün görüyorsanız bu durum ciddi hak kaybı demektir. Örneğin 5 yıl boyunca her ay 20 gün bildirilmişse 600 gün prim kaybınız vardır; bu da emekliliğinizi yaklaşık 1 yıl 8 ay geciktirir."
      ]
    },
    {
      h: "Emeklilik için kaç gün prim gerekir?",
      p: [
        "Gereken prim günü, ilk kez sigortalı olduğunuz tarihe ve hangi statüde (4/a, 4/b, 4/c) çalıştığınıza göre değişir. 1 Ekim 2008 ve sonrasında ilk kez 4/a kapsamında sigortalı olanlar için en çok anılan şart <strong>7.200 prim günü</strong>dür ve buna yaş şartı eşlik eder. 4/b ve 4/c kapsamındaki yeni dönem sigortalılarda gün şartı daha yüksektir.",
        "1999 öncesi ve 1999–2008 arası girişlerde ise kademeli geçiş kuralları uygulanır; prim günü şartı girişe göre 5.000 ile 7.200 gün arasında değişebilir ve yaş şartı ayrıca kademelidir. Bu tablolar ayrıntılı olduğu için [[rehber:emeklilik-yasi-nasil-hesaplanir|emeklilik yaşı rehberinde]] ayrıca anlatılmıştır. Kendi giriş tarihinize göre şartları görmek için [[arac:emeklilik-yasi-hesapla|Emeklilik Yaşı Hesaplama]] aracını kullanabilirsiniz."
      ],
      ul: [
        "7.200 gün, tam zamanlı ve kesintisiz çalışmayla 20 yıla denk gelir (7.200 ÷ 360).",
        "Aynı şartı ayda ortalama 25 gün bildirimle doldurmak 24 yıl sürer.",
        "Prim günü tamamlansa bile yaş şartı dolmadan emekli aylığı bağlanmaz."
      ]
    },
    {
      h: "Askerlik, doğum ve yurt dışı borçlanması prim gününe eklenir mi?",
      p: [
        "Evet. Borçlanma, çalışmadığınız belirli süreler için sonradan prim ödeyerek bu süreleri hizmetinize saydırmanızdır. Borçlandığınız gün sayısı ödeme tamamlandıktan sonra toplam prim gününüze eklenir ve emeklilik tarihinizi öne çeker.",
        "Askerlik borçlanmasında er ya da erbaş olarak yaptığınız askerlik süresinin tamamı borçlanılabilir. Doğum borçlanması ise kadın sigortalıların doğum sonrası çalışmadıkları süreler için yapılır; her doğum için en fazla 720 gün ve en fazla üç doğum için kullanılabilir. Borçlanma tutarı, başvuru tarihindeki prime esas günlük kazancın alt ve üst sınırı arasında sizin seçeceğiniz bir tutarın %32'si ile gün sayısının çarpımıdır."
      ],
      formula: "Borçlanma bedeli = seçilen günlük kazanç × 0,32 × borçlanılan gün\nÖrnek: 1.101 TL × 0,32 × 540 gün = 190.252,80 TL (örnek tutar)",
      after: [
        "Örnekteki günlük kazanç, 2026 brüt asgari ücretinin (33.030 TL) 30'a bölünmesiyle bulunan alt sınırdır. Daha yüksek bir günlük kazanç seçerseniz borçlanma bedeli artar, ancak ileride bağlanacak aylığa etkisi de olabilir. Borçlanma tahakkuku tebliğ edildikten sonra belirli bir süre içinde ödenmezse işlem geçersiz sayılabileceği için süreyi kaçırmayın; kesin süre ve tutar SGK tebliğinde yazar."
      ]
    },
    {
      h: "Part-time (kısmi süreli) çalışanın prim günü",
      p: [
        "Kısmi süreli çalışanlarda prim günü, ay içindeki toplam çalışma saatinin 7,5 saate bölünmesiyle bulunur. Örneğin ayda 90 saat çalışan biri için 90 ÷ 7,5 = 12 gün bildirilir. Bu nedenle haftada üç gün yarım gün çalışan biri, tam zamanlı çalışana göre emekliliğe çok daha geç ulaşır.",
        "Kanun kısmi süreli çalışanlara, ay içindeki eksik günlerini isteğe bağlı sigorta primi ödeyerek 30 güne tamamlama imkânı tanır. Bunun için SGK'ya başvurmak gerekir; prim tutarı seçtiğiniz günlük kazanç üzerinden hesaplanır. Bu yol, kısmi çalışmanın emeklilik takvimine olumsuz etkisini azaltmanın en doğrudan yoludur."
      ]
    },
    {
      h: "Eksik prim nasıl tamamlanır? Sık yapılan hatalar",
      ul: [
        "<strong>İsteğe bağlı sigorta:</strong> Çalışmadığınız dönemlerde e-Devlet ya da SGK üzerinden isteğe bağlı sigortalı olup prim ödeyerek gün kazanabilirsiniz.",
        "<strong>Borçlanma:</strong> Askerlik, doğum, yurt dışı çalışma ve doktora süresi gibi kanunda sayılan süreleri borçlanabilirsiniz.",
        "<strong>Hizmet tespiti:</strong> Çalıştığınız hâlde bildirilmeyen dönemler için hizmet tespit davası açabilirsiniz; bu davaların zamanaşımı süreleri vardır.",
        "<strong>Hata – takvim günüyle hesaplamak:</strong> 365 ile hesap yapmak sonucu şişirir; SGK 360 kullanır.",
        "<strong>Hata – brüt yıl sayısını prim günü sanmak:</strong> Sigortalılık süresi ile prim günü ayrı şartlardır.",
        "<strong>Hata – farklı statüleri unutmak:</strong> 4/a, 4/b ve 4/c hizmetleri ayrı dökümlerde görünür; toplam için hepsine bakın."
      ],
      after: [
        "Çalışma dönemlerinizi tek tek girip toplam prim gününüzü, yıl-ay-gün karşılığını ve 7.200 güne kalan günü görmek için [[arac:sgk-gun-hesapla|SGK Gün Hesaplama]] aracını kullanabilirsiniz. Günlük mesai sürenizi kayıt altına almak istiyorsanız [[arac:calisma-suresi-hesapla|Çalışma Süresi Hesaplama]] işinizi görür."
      ]
    }
  ],
  faq: [
    ["SGK prim günü nasıl öğrenilir?", "e-Devlet'e giriş yaparak \"SGK Tescil ve Hizmet Dökümü\" hizmetini açın. Sayfanın özet bölümünde toplam prim gününüz yazar; ay ay döküm için barkodlu belgeyi indirip saklayabilirsiniz."],
    ["Hizmet dökümü e-Devlet'ten nasıl alınır?", "e-Devlet'te SGK Tescil ve Hizmet Dökümü hizmetini açıp 4/a, 4/b ya da 4/c seçeneğini işaretleyin. Toplu ya da ay/gün bazında dökümü görüntüleyip PDF olarak indirebilirsiniz; belge barkodlu olduğu için resmî işlemlerde kullanılabilir."],
    ["Bir yıl kaç prim günü sayılır?", "SGK hesabında bir yıl en fazla 360 prim günüdür, çünkü her ay 30 gün olarak sayılır. Yılın tamamında kesintisiz çalışan biri 365 değil 360 gün prim kazanır."],
    ["Emeklilik için kaç gün prim gerekir?", "1 Ekim 2008'den sonra ilk kez 4/a ile sigortalı olanlar için şart 7.200 prim günüdür. Daha önce girenlerde girişe göre 5.000 ile 7.200 gün arasında kademeli şartlar ve ayrıca yaş şartı uygulanır."],
    ["Hizmet dökümündeki eksik gün kodları ne anlama gelir?", "Ayda 30 günden az bildirim yapıldığında işverenin nedeni açıklamak için kullandığı kodlardır. Örneğin 01 istirahat, 06 kısmi istihdam, 07 puantaj kayıtları, 21 diğer ücretsiz izin anlamına gelir; tam liste SGK kılavuzunda bulunur."],
    ["Askerlik ve doğum borçlanması prim gününe eklenir mi?", "Evet, borçlanma bedeli ödendikten sonra borçlanılan gün sayısı toplam prim gününüze eklenir. Doğum borçlanmasında her doğum için en fazla 720 gün ve en fazla üç doğum borçlanılabilir."],
    ["Ayda kaç gün prim yatar?", "Tam ay çalışan bir sigortalı için ayın kaç gün çektiğine bakılmaksızın 30 gün prim bildirilir. Ay ortasında başlayan ya da ayrılanlarda yalnızca o ayda fiilen çalışılan günler bildirilir."],
    ["Part-time çalışanın prim günü nasıl hesaplanır?", "Ay içindeki toplam çalışma saati 7,5'e bölünür. Ayda 90 saat çalışan kişiye 12 gün prim bildirilir; eksik günler isteğe bağlı sigorta primi ödenerek 30 güne tamamlanabilir."],
    ["Eksik prim nasıl tamamlanır?", "İsteğe bağlı sigortalı olarak prim ödemek, askerlik ve doğum gibi borçlanma haklarını kullanmak ve bildirilmeyen çalışmalar için hizmet tespiti başvurusu yapmak başlıca yollardır. Hangi yolun uygun olduğu durumunuza göre değişir."]
  ],
  tools: ["sgk-gun-hesapla", "emeklilik-yasi-hesapla", "calisma-suresi-hesapla", "tarih-farki"],
  related: ["issizlik-maasi-nasil-hesaplanir", "emekli-ikramiyesi-nasil-hesaplanir", "dogum-izni-kac-gun"],
  sources: [
    ["SGK – Sosyal Güvenlik Kurumu", "https://www.sgk.gov.tr/"],
    ["e-Devlet – SGK Tescil ve Hizmet Dökümü", "https://www.turkiye.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 5510 sayılı Kanun", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "bilgilendirme amaçlıdır, kesin prim gününüz için e-Devlet'teki SGK kayıtları esastır"
};
