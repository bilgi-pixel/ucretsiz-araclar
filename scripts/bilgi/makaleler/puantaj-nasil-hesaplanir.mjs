export default {
  slug: "puantaj-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Puantaj Nasıl Hesaplanır? Çalışma Saatleri ve Ondalık Saat Dönüşümü",
  pageTitle: "Puantaj Nasıl Hesaplanır? Çalışma Saati ve Ondalık Saat",
  description: "Puantaj nasıl hesaplanır? Giriş-çıkış farkından molayı düşme, saatleri toplama, 7,5 saatin 7 saat 30 dakika olması, gece vardiyası, fazla mesai ve Excel formülü.",
  keywords: ["puantaj nasıl hesaplanır", "puantaj nedir", "çalışma saati hesaplama", "7,5 saat kaç saat kaç dakika", "ondalık saat çevirme", "mesai saatleri toplama", "puantaj cetveli excel", "vardiyalı puantaj"],
  lead: "Puantaj, her çalışan için <strong>günlük çıkış saatinden giriş saatini ve yasal molayı çıkarıp</strong> bulunan net sürelerin aylık tabloya işlenmesiyle hesaplanır; sonra günler toplanır ve haftalık 45 saati aşan kısım fazla mesai olarak ayrılır. Toplama yaparken saat:dakika ile ondalık saati karıştırmamak gerekir: 7,5 saat 7 saat 30 dakikadır, 7 saat 50 dakika değil. Bu rehberde molaların nasıl düşüleceğini, gece vardiyasında gün değişimini, eksik günlerin nasıl işleneceğini ve Excel formülünü örnek bir haftalık puantajla anlatıyoruz.",
  kisaCevap: [
    "Günlük net süre = çıkış saati − giriş saati − ara dinlenme (mola).",
    "Ondalık saat = saat + dakika ÷ 60; örneğin 7 saat 45 dakika = 7,75 saat.",
    "Ondalık saatten dakikaya: ondalık kısım × 60; 7,5 saat = 7 saat 30 dakika, 8,2 saat = 8 saat 12 dakika.",
    "İş Kanunu'na göre 4 saate kadar işte 15 dakika, 4–7,5 saat arası işte 30 dakika, 7,5 saati aşan işte 1 saat mola verilir ve çalışma süresinden sayılmaz.",
    "Haftalık normal çalışma en fazla 45 saattir; aşan her saat %50 zamlı fazla mesai olarak ayrı yazılır.",
    "Gece yarısını geçen vardiyada çıkış saatine 24 saat eklenerek hesap yapılır: 22:00–06:00 = 8 saat brüt."
  ],
  figure: {
    alt: "Bir haftalık puantaj örneği: pazartesi 8,75, salı 8, çarşamba 8,5, perşembe 8,25, cuma 9, cumartesi 4,5 saat; toplam 47 saat, 45 saat normal ve 2 saat fazla mesai.",
    caption: "Örnek haftalık puantaj: her günün net süresi moladan sonra hesaplanır, toplam 47 saattir. 45 saatlik yasal sınırı aşan 2 saat fazla mesaidir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Haftalık puantaj: net saatler</text>
  <line x1="90" y1="340" x2="700" y2="340" class="sb" fill="none"/>
  <g class="sm mid">
    <rect x="110" y="165" width="70" height="175" rx="4" class="ps"/><text x="145" y="157" class="b">8,75</text><text x="145" y="360">Pzt</text>
    <rect x="210" y="180" width="70" height="160" rx="4" class="ps"/><text x="245" y="172" class="b">8,00</text><text x="245" y="360">Sal</text>
    <rect x="310" y="170" width="70" height="170" rx="4" class="ps"/><text x="345" y="162" class="b">8,50</text><text x="345" y="360">Çar</text>
    <rect x="410" y="175" width="70" height="165" rx="4" class="ps"/><text x="445" y="167" class="b">8,25</text><text x="445" y="360">Per</text>
    <rect x="510" y="160" width="70" height="180" rx="4" class="ps"/><text x="545" y="152" class="b">9,00</text><text x="545" y="360">Cum</text>
    <rect x="610" y="250" width="70" height="90" rx="4" class="ps"/><text x="645" y="242" class="b">4,50</text><text x="645" y="360">Cmt</text>
  </g>
  <text x="20" y="180" class="sm mu">saat</text>
  <rect x="20" y="56" width="216" height="64" rx="8" class="sf sb"/>
  <text x="128" y="82" class="sm mid t2">Toplam net</text><text x="128" y="108" class="xl mid">47,00</text>
  <rect x="252" y="56" width="216" height="64" rx="8" class="oks"/>
  <text x="360" y="82" class="sm mid t2">Normal çalışma</text><text x="360" y="108" class="xl mid ok">45,00</text>
  <rect x="484" y="56" width="216" height="64" rx="8" class="dgs"/>
  <text x="592" y="82" class="sm mid t2">Fazla mesai (%50)</text><text x="592" y="108" class="xl mid dg">2,00</text>
  <text x="360" y="396" class="sm mid mu">Pzt 08:30–18:15, 1 saat mola → 9 sa 45 dk − 1 sa = 8 sa 45 dk = 8,75</text>
</svg>`
  },
  sections: [
    {
      h: "Puantaj nedir, neden tutulur?",
      p: [
        "Puantaj, çalışanların hangi gün işe geldiğini, kaç saat çalıştığını, izinli, raporlu ya da devamsız olduğu günleri gösteren devam çizelgesidir. Kelime Fransızca \"pointage\" (işaretleme) sözcüğünden gelir. Fabrika, şantiye, mağaza ve vardiyalı çalışan her işletmede bordronun ham verisi puantajdır.",
        "İşveren, çalışma sürelerini ve fazla çalışmaları belgelemekle yükümlüdür. Puantaj, SGK'ya bildirilecek prim gününü, eksik gün nedenini, fazla mesai ücretini ve yıllık izin hakedişini belirler. Uyuşmazlık durumunda mahkemeler de imzalı puantaj kayıtlarını delil olarak inceler.",
        "Pratikte puantaj iki biçimde tutulur: <strong>gün bazlı</strong> (her gün için \"çalıştı, izinli, raporlu\" gibi bir kod) ve <strong>saat bazlı</strong> (her gün için giriş-çıkış saati ve net süre). Fazla mesai ve vardiyalı işlerde saat bazlı puantaj zorunlu hâle gelir."
      ]
    },
    {
      h: "Günlük çalışma süresi nasıl hesaplanır?",
      p: [
        "Bir günün net çalışma süresi, çıkış saatinden giriş saatinin çıkarılması ve ara dinlenmenin düşülmesiyle bulunur. Hesabı saat:dakika biçiminde yapıp sonra ondalığa çevirmek hatayı azaltır."
      ],
      formula: "Net süre = Çıkış − Giriş − Mola\nÖrnek: 18:15 − 08:30 = 9 sa 45 dk; 9 sa 45 dk − 1 sa = 8 sa 45 dk = 8,75 saat",
      after: [
        "Dakikaları çıkarırken eksik kalırsa bir saati 60 dakikaya çevirirsiniz: 17:10 − 08:40 için önce 17:10'u 16:70 yazın; 16:70 − 08:40 = 8 sa 30 dk. Bu adımı elle yapmak yerine [[arac:calisma-suresi-hesapla|Çalışma Süresi Hesaplama]] aracına giriş, çıkış ve molayı yazarak sonucu hem saat-dakika hem ondalık saat olarak görebilirsiniz."
      ]
    },
    {
      h: "Ondalık saat dönüşümü: 7,5 saat kaç saat kaç dakika?",
      p: [
        "Bordro ve ücret hesaplarında süreler genellikle <strong>ondalık saat</strong> olarak kullanılır, çünkü saatlik ücretle çarpmak kolaydır. Ancak ondalık kısım dakikayı değil, saatin kesrini gösterir. 0,5 saat yarım saat, yani 30 dakikadır; 0,1 saat 6 dakikadır.",
        "Puantajda en sık yapılan hata 7:45'i 7,45 diye yazmaktır. 7:45 aslında 7,75 saattir; 7,45 saat ise 7 saat 27 dakika eder. Bu küçük fark bir ay boyunca biriktiğinde birkaç saatlik ücrete karşılık gelir."
      ],
      formula: "Saat:dakika → ondalık: saat + dakika ÷ 60\nOndalık → saat:dakika: tam kısım saat, (ondalık kısım × 60) dakika",
      table: {
        head: ["Saat:dakika", "Ondalık saat", "Ondalık saat", "Saat:dakika"],
        rows: [
          ["0:15", "0,25", "0,1", "0:06"],
          ["0:30", "0,50", "0,2", "0:12"],
          ["0:45", "0,75", "0,4", "0:24"],
          ["7:20", "7,33", "7,5", "7:30"],
          ["7:45", "7,75", "8,2", "8:12"],
          ["8:40", "8,67", "9,75", "9:45"]
        ],
        caption: "Sol iki sütun saat:dakikadan ondalığa, sağ iki sütun ondalıktan saat:dakikaya dönüşümdür."
      },
      after: [
        "Dönüşümü hızlıca yapmak için [[arac:ondalik-saat-cevir|Ondalık Saat Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Molalar puantajdan düşülür mü?",
      p: [
        "Evet. 4857 sayılı İş Kanunu'nun 68. maddesine göre ara dinlenmeleri çalışma süresinden sayılmaz. Kanun, günlük çalışma süresine göre en az şu molaları öngörür: 4 saat veya daha kısa işlerde 15 dakika, 4 saatten 7,5 saate kadar olan işlerde yarım saat, 7,5 saatten fazla süren işlerde 1 saat. Bu süreler en az sınırdır; sözleşme ya da işyeri uygulaması daha uzun mola verebilir.",
        "Önemli bir ayrıntı: Çalışanın işyerinden ayrılamadığı, işverenin emrinde beklediği süreler mola sayılmaz; çalışma süresine eklenir. Örneğin yemek molasında da makinenin başında kalması istenen bir işçinin bu süresi puantajda çalışma olarak yazılmalıdır.",
        "Sigara ve çay molası gibi kısa aralar işyeri uygulamasına göre değerlendirilir. Puantajda tutarlılık için molayı her gün aynı kurala göre düşün ve kuralı yazılı hâle getirin."
      ]
    },
    {
      h: "Haftalık toplam, fazla mesai ve ücret hesabı",
      p: [
        "Günlük net süreler haftalık toplanır. Haftalık çalışma süresi en çok 45 saattir ve günlük çalışma 11 saati aşamaz. 45 saati aşan çalışma <strong>fazla çalışma</strong> sayılır ve her saati için normal saatlik ücretin %50 fazlası ödenir. Sözleşmede haftalık süre 45 saatin altında belirlenmişse, sözleşme süresiyle 45 saat arasındaki çalışma <strong>fazla sürelerle çalışma</strong> olup %25 zamlıdır. Yıllık fazla çalışma 270 saati geçemez."
      ],
      table: {
        head: ["Gün", "Giriş", "Çıkış", "Mola", "Net (sa:dk)", "Net (ondalık)"],
        rows: [
          ["Pazartesi", "08:30", "18:15", "1:00", "8:45", "8,75"],
          ["Salı", "08:30", "17:30", "1:00", "8:00", "8,00"],
          ["Çarşamba", "08:30", "18:00", "1:00", "8:30", "8,50"],
          ["Perşembe", "08:30", "17:45", "1:00", "8:15", "8,25"],
          ["Cuma", "08:30", "18:30", "1:00", "9:00", "9,00"],
          ["Cumartesi", "09:00", "14:00", "0:30", "4:30", "4,50"],
          ["Toplam", "", "", "", "47:00", "47,00"]
        ],
        caption: "Örnek: haftalık toplam 47 saat, bunun 45 saati normal, 2 saati %50 zamlı fazla mesaidir."
      },
      after: [
        "Ücrete çevirmek için saatlik ücreti bulun. Aylık ücretlilerde yaygın yöntem aylık brüt ücreti 225'e (30 gün × 7,5 saat) bölmektir. Örnek olarak 2026 brüt asgari ücreti 33.030 TL alınırsa saatlik ücret 146,80 TL, fazla mesai saati 146,80 × 1,5 = 220,20 TL olur; 2 saatlik fazla mesai bordroya 440,40 TL brüt ek kazanç olarak yansır. Haftalık sürelerin toplamını alt alta yazarak almak için [[arac:sure-toplama|Süre Toplama]] aracı pratiktir. Bu tutarın bordroya nasıl girdiğini [[bilgi:maas-bordrosu-nasil-okunur|maaş bordrosu nasıl okunur]] yazısında görebilirsiniz."
      ]
    },
    {
      h: "Vardiyalı ve gece çalışmasında puantaj",
      p: [
        "Gece yarısını geçen vardiyalarda çıkış saati giriş saatinden küçük görünür. Bu durumda çıkış saatine 24 saat ekleyerek hesap yaparsınız: 22:00–06:00 vardiyası için 30:00 − 22:00 = 8 saat brüt, 1 saat mola düşülürse 7 saat net.",
        "Gece çalışması (saat 20:00'den sonra başlayıp en geç 06:00'ya kadar süren dönem) için İş Kanunu ayrıca sınır koyar: işçilerin gece çalışmaları 7,5 saati geçemez. Vardiyalı düzende puantajda her çalışanın hangi vardiyada olduğu ve vardiya değişimlerinde en az 11 saatlik dinlenme verilip verilmediği de izlenmelidir.",
        "Rotasyonlu düzenler (örneğin 2 sabah, 2 akşam, 2 gece, 2 izin) elle takip edildiğinde hata yapmak kolaydır. [[arac:vardiya-cizelgesi|Vardiya Çizelgesi]] aracıyla rotasyonu otomatik doldurup toplam saatleri görebilir, çizelgeyi PDF olarak çıktı alabilirsiniz."
      ]
    },
    {
      h: "Eksik gün, izin ve rapor puantaja nasıl işlenir?",
      ul: [
        "<strong>Yıllık ücretli izin:</strong> Çalışılmış gibi ücretlidir; puantajda \"Yİ\" gibi ayrı kodla işaretlenir, prim günü düşmez.",
        "<strong>Hafta tatili ve resmî tatil:</strong> Ücretlidir; resmî tatilde çalışılırsa o gün için ayrıca bir günlük ücret daha ödenir.",
        "<strong>İstirahat raporu:</strong> Raporlu günler eksik gün olarak bildirilir, iş göremezlik ödeneğini SGK öder.",
        "<strong>Ücretsiz izin ve devamsızlık:</strong> Ücretten düşülür ve eksik gün nedeniyle birlikte SGK'ya bildirilir.",
        "<strong>Geç gelme ve erken çıkma:</strong> Saat bazlı puantajda dakika olarak yazılır; ücretten kesinti yapılacaksa bunun sözleşmede ya da işyeri yönetmeliğinde düzenlenmiş olması gerekir."
      ],
      after: [
        "Her duruma tek harfli ya da iki harfli bir kod verip çizelgenin altına açıklama tablosu koymak, ay sonunda muhasebeye giden veriyi okunur kılar."
      ]
    },
    {
      h: "Puantaj cetveli Excel'de nasıl hazırlanır?",
      ol: [
        "Sütunları Tarih, Giriş, Çıkış, Mola (dakika), Net süre ve Ondalık saat olarak açın; Giriş ve Çıkış hücrelerini saat biçimine (ss:dd) ayarlayın.",
        "Gece yarısını geçen vardiyaları da kapsayan net süre formülü: <code>=MOD(C2-B2;1)-D2/1440</code>. MOD işlevi negatif farkı 24 saat ekleyerek düzeltir, 1440 bir günün dakika sayısıdır.",
        "Ondalık saate çevirmek için net süreyi 24 ile çarpın: <code>=E2*24</code> ve hücreyi sayı biçimine alın.",
        "Haftalık toplam için ondalık sütunu toplayın; fazla mesai için <code>=MAK(0;TOPLA(F2:F8)-45)</code> yazın.",
        "Saat biçimindeki toplam 24 saati aşınca sıfırdan başlamasın diye toplam hücresinin biçimini <code>[s]:dd</code> yapın."
      ]
    },
    {
      h: "Puantajda sık yapılan hatalar",
      ul: [
        "<strong>Dakikayı ondalık sanmak:</strong> 7:45 = 7,75 saattir, 7,45 değil.",
        "<strong>Molayı unutmak ya da iki kez düşmek:</strong> Turnike kayıtlarında mola zaten çıkış-giriş olarak görünüyorsa ayrıca düşmeyin.",
        "<strong>Gece vardiyasında eksi süre:</strong> Çıkışa 24 saat eklemeyi unutmak sonucu negatif yapar.",
        "<strong>Fazla mesaiyi günlük hesaplamak:</strong> Fazla çalışma kural olarak haftalık 45 saat üzerinden belirlenir; denkleştirme uygulanıyorsa dönem ortalamasına bakılır.",
        "<strong>İmzasız puantaj:</strong> Çalışanın imzası ya da elektronik onayı olmayan kayıtlar uyuşmazlıkta zayıf delil sayılır."
      ]
    }
  ],
  faq: [
    ["Puantaj nedir, nasıl tutulur?", "Puantaj, çalışanların her gün işe gelip gelmediğini, kaç saat çalıştığını, izin, rapor ve devamsızlık durumlarını gösteren devam çizelgesidir. Gün bazlı kodlarla ya da günlük giriş-çıkış saatleri ve net süreler yazılarak aylık tablo hâlinde tutulur."],
    ["Çalışma saatleri nasıl toplanır?", "Önce her günün net süresini çıkış eksi giriş eksi mola olarak bulun, sonra süreleri ondalık saate çevirip toplayın. Saat:dakika olarak toplarsanız 60 dakikayı aşan kısmı bir saate çevirmeyi unutmayın; karışıklığı önlemek için ondalık toplama daha güvenlidir."],
    ["7,5 saat kaç saat kaç dakika eder?", "7,5 saat 7 saat 30 dakikadır. Ondalık kısım saatin kesridir: 0,5 × 60 = 30 dakika. Aynı mantıkla 7,25 saat 7 saat 15 dakika, 7,75 saat ise 7 saat 45 dakika eder."],
    ["Ondalık saat dakikaya nasıl çevrilir?", "Ondalık saatin tam kısmı saati verir, virgülden sonraki kısım 60 ile çarpılarak dakikaya çevrilir. Örneğin 8,2 saat için 0,2 × 60 = 12 dakika bulunur, yani sonuç 8 saat 12 dakikadır."],
    ["Molalar puantajdan düşülür mü?", "Evet, İş Kanunu'na göre ara dinlenmeleri çalışma süresinden sayılmaz. Dört saate kadar işte 15 dakika, 4 ile 7,5 saat arasında yarım saat, 7,5 saati aşan işte 1 saat en az mola verilir. İşçinin işverenin emrinde beklediği süre ise çalışmadır."],
    ["Vardiyalı çalışmada puantaj nasıl hesaplanır?", "Her vardiyanın net süresi ayrı hesaplanır; gece yarısını geçen vardiyada çıkış saatine 24 saat eklenir. Örneğin 22:00 ile 06:00 arası 8 saattir, mola düşülerek net bulunur. Gece çalışmasının 7,5 saati geçmemesine de dikkat edilmelidir."],
    ["Eksik gün puantaja nasıl işlenir?", "Ücretsiz izin, devamsızlık ve rapor gibi eksik günler ayrı kodlarla işaretlenir. Bu günler ücretten düşülür ve SGK'ya eksik gün nedeni koduyla bildirilir. Yıllık izin ve hafta tatili ise ücretli olduğu için eksik gün sayılmaz."],
    ["Puantaj cetveli Excel'de nasıl hazırlanır?", "Tarih, giriş, çıkış, mola ve net süre sütunlarını açın. Net süre için MOD(çıkış-giriş;1) eksi mola formülünü, ondalık saat için sonucu 24 ile çarpmayı kullanın. Toplam hücresini [s]:dd biçimine alarak 24 saati aşan toplamları doğru görün."],
    ["Haftalık kaç saatin üzeri fazla mesai sayılır?", "Haftalık 45 saati aşan çalışma fazla çalışmadır ve her saati için saatlik ücretin yüzde 50 fazlası ödenir. Sözleşmede daha kısa süre belirlenmişse o süre ile 45 saat arasındaki çalışma yüzde 25 zamlı fazla sürelerle çalışma sayılır."]
  ],
  tools: ["calisma-suresi-hesapla", "ondalik-saat-cevir", "sure-toplama", "vardiya-cizelgesi", "brut-net-maas"],
  related: ["maas-bordrosu-nasil-okunur", "sgk-prim-gunu-nasil-hesaplanir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 4857 sayılı İş Kanunu (md. 41, 63, 68, 69)", "https://www.mevzuat.gov.tr/"],
    ["Çalışma ve Sosyal Güvenlik Bakanlığı", "https://www.csgb.gov.tr/"]
  ]
};
