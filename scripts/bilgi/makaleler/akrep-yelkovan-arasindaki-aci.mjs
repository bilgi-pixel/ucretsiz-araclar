export default {
  slug: "akrep-yelkovan-arasindaki-aci",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Akrep ile Yelkovan Arasındaki Açı Nasıl Bulunur? Formül ve Çözümlü Örnekler",
  pageTitle: "Akrep Yelkovan Arasındaki Açı: Formül ve Saat Problemleri",
  description: "Akrep ile yelkovan arasındaki açı |30·saat − 5,5·dakika| formülüyle bulunur. Saat 3:40'ta açı 130°. Çakışma, dik açı ve sınav soruları çözümlü.",
  keywords: ["akrep yelkovan arasındaki açı", "saat açısı problemi", "saat 3:40 açı", "akrep yelkovan formülü", "saat problemleri", "akrep yelkovan kaç kez çakışır", "açı hesaplama"],
  lead: "Akrep ile yelkovan arasındaki açı <strong>|30 × saat − 5,5 × dakika|</strong> formülüyle bulunur; sonuç 180°'den büyükse 360°'den çıkarılarak küçük açı elde edilir. Saat 3:40'ta |90 − 220| = 130° olur. Formülün sırrı, yelkovanın dakikada 6°, akrebin ise dakikada 0,5° dönmesidir; aradaki fark dakikada 5,5°'dir. Bu sayfada formülün nereden geldiğini, çözümlü örnekleri, ibrelerin günde kaç kez çakıştığını, dik açı saatlerini ve LGS, TYT, KPSS tarzı soruların çözüm yolunu anlatıyoruz.",
  kisaCevap: [
    "Yelkovan 60 dakikada 360° döner: dakikada 6°.",
    "Akrep 12 saatte 360° döner: saatte 30°, dakikada 0,5°.",
    "Açı = |30 × S − 5,5 × D|; sonuç 180°'den büyükse 360° − sonuç küçük açıdır.",
    "Saat 3:40'ta açı 130°, 9:15'te 172,5°, 7:20'de 100°'dir.",
    "İbreler 12 saatte 11 kez, 24 saatte 22 kez üst üste gelir; her çakışma arası 720/11 ≈ 65,45 dakikadır.",
    "İbreler 24 saatte 44 kez dik açı, 22 kez doğru açı (180°) yapar."
  ],
  figure: {
    alt: "Saat kadranında 3:40 gösterimi: yelkovan 240° konumunda 8'i, akrep 110° konumunda 3 ile 4 arasını gösteriyor; aradaki küçük açı 130°. Yanda formül adımları.",
    caption: "Saat 3:40'ta yelkovan 40 × 6 = 240°'de, akrep 3 × 30 + 40 × 0,5 = 110°'dedir. Fark 130°'dir; bu açı 180°'den küçük olduğu için doğrudan cevaptır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Saat 3:40 – akrep ile yelkovan arasındaki açı</text>
  <circle cx="200" cy="215" r="150" class="sf sb"/>
  <g class="b mid">
    <text x="200" y="88">12</text><text x="335" y="221">3</text><text x="200" y="356">6</text><text x="65" y="221">9</text>
    <text x="275" y="108" class="sm">1</text><text x="320" y="153" class="sm">2</text><text x="320" y="288" class="sm">4</text><text x="275" y="333" class="sm">5</text>
    <text x="125" y="333" class="sm">7</text><text x="80" y="288" class="sm">8</text><text x="80" y="153" class="sm">10</text><text x="125" y="108" class="sm">11</text>
  </g>
  <path d="M200 215 L249.8 233.1 A53 53 0 0 1 154.1 241.5 Z" class="ps"/>
  <line x1="200" y1="215" x2="88.4" y2="279.4" class="sp sw" fill="none"/>
  <line x1="200" y1="215" x2="283.7" y2="245.5" class="st sw" fill="none"/>
  <circle cx="200" cy="215" r="6" class="p"/>
  <text x="246" y="236" class="b p">130°</text>
  <text x="80" y="306" class="sm b p">yelkovan</text>
  <text x="284" y="268" class="sm b">akrep</text>
  <rect x="400" y="70" width="290" height="62" rx="8" class="sf sb"/>
  <text x="416" y="96" class="b">Yelkovan: 40 × 6° = 240°</text>
  <text x="416" y="120" class="sm t2">dakikada 6° (360° ÷ 60)</text>
  <rect x="400" y="142" width="290" height="62" rx="8" class="sf sb"/>
  <text x="416" y="168" class="b">Akrep: 3 × 30° + 40 × 0,5° = 110°</text>
  <text x="416" y="192" class="sm t2">saatte 30°, dakikada 0,5°</text>
  <rect x="400" y="214" width="290" height="62" rx="8" class="ps"/>
  <text x="416" y="240" class="b">Fark: |240 − 110| = 130°</text>
  <text x="416" y="264" class="sm">180°'den küçük → küçük açı</text>
  <rect x="400" y="290" width="290" height="70" rx="8" class="p"/>
  <text x="545" y="318" class="b mid sf">Kısa formül</text>
  <text x="545" y="344" class="b mid sf">|30·S − 5,5·D| = |90 − 220|</text>
</svg>`
  },
  sections: [
    {
      h: "İbreler dakikada kaç derece döner?",
      p: [
        "Saat kadranı bir tam çemberdir, yani 360°'dir ve 12 eşit saat dilimine ayrılmıştır. Her saat dilimi 360 ÷ 12 = 30°, her dakika çizgisi ise 360 ÷ 60 = 6°'dir. Bu iki sayı saat problemlerinin temelidir.",
        "<strong>Yelkovan</strong> (dakika ibresi) bir saatte kadranı tam bir kez dolaşır: 60 dakikada 360°, yani <strong>dakikada 6°</strong>. <strong>Akrep</strong> (saat ibresi) ise 12 saatte bir tur atar: saatte 30°, 60 dakikada 30° olduğu için <strong>dakikada 0,5°</strong>. Akrep saniyede ise 1/120 derece ilerler.",
        "Sınavlarda en çok yapılan hata, akrebin dakikalar boyunca yerinde durduğunu sanmaktır. Saat 3:40'ta akrep tam 3'ün üstünde değildir; 3 ile 4 arasının üçte ikisini geçmiştir. Gerçek bir saatin yüzüne bakarsanız bunu kolayca görürsünüz. Problemleri çözerken kâğıda küçük bir kadran çizmek de sonucun mantıklı olup olmadığını hemen gösterir."
      ]
    },
    {
      h: "Akrep yelkovan açısı formülü",
      p: [
        "Her iki ibrenin konumunu 12 hizasından saat yönünde ölçelim. Saat S ve dakika D iken yelkovan 6D derecede, akrep 30S + 0,5D derecededir. Aradaki fark bu iki konumun farkının mutlak değeridir."
      ],
      formula: "Yelkovan konumu = 6 × D\nAkrep konumu = 30 × S + 0,5 × D\nAçı = |30 × S − 5,5 × D|\nAçı > 180° ise küçük açı = 360° − açı",
      after: [
        "Formüldeki S, 12 saatlik düzende yazılır; 15:40 için S = 3 alınır, 12:30 için S = 12 ya da 0 alınabilir (ikisi de aynı sonucu verir, çünkü 30 × 12 = 360°). 5,5 sayısı ise ibrelerin göreli hızıdır: yelkovan akrepten dakikada 6 − 0,5 = 5,5° daha hızlı döner.",
        "Elle hesapladığınız sonucu kontrol etmek için [[arac:saat-acisi-hesapla|Saat Açısı Hesaplama]] aracına saati ve dakikayı yazın; küçük ve büyük açıyı, ibre konumlarını ve açı türünü birlikte gösterir."
      ]
    },
    {
      h: "Çözümlü örnekler: 3:40, 9:15, 7:20, 12:30",
      ol: [
        "<strong>3:40</strong> → |30 × 3 − 5,5 × 40| = |90 − 220| = 130°. 180°'den küçük olduğu için küçük açı 130°, büyük açı 230°'dir.",
        "<strong>9:15</strong> → |270 − 82,5| = 187,5°. 180°'den büyük olduğu için küçük açı 360 − 187,5 = <strong>172,5°</strong>'dir. Pek çok kişi 180° der; oysa akrep 9'dan 7,5° ilerlemiştir.",
        "<strong>7:20</strong> → |210 − 110| = 100°. Küçük açı 100°, geniş açıdır.",
        "<strong>12:30</strong> → |0 − 165| = 165°. Akrep 12 ile 1'in tam ortasında, yelkovan 6'dadır.",
        "<strong>4:30</strong> → |120 − 165| = 45°. Akrep 4 ile 5'in ortasındadır, yelkovan 6'da; aradaki 1,5 saat dilimi 45° eder.",
        "<strong>6:00</strong> → |180 − 0| = 180°. İbreler zıt yöndedir, doğru açı oluşur."
      ],
      table: {
        head: ["Saat", "Akrep konumu", "Yelkovan konumu", "Küçük açı"],
        rows: [
          ["3:40", "110°", "240°", "130°"],
          ["9:15", "277,5°", "90°", "172,5°"],
          ["7:20", "220°", "120°", "100°"],
          ["10:10", "305°", "60°", "115°"],
          ["12:30", "15°", "180°", "165°"],
          ["4:30", "135°", "180°", "45°"]
        ]
      }
    },
    {
      h: "Akrep ve yelkovan günde kaç kez üst üste gelir?",
      p: [
        "İbrelerin üst üste gelmesi, aradaki açının 0° olması demektir. Yelkovan akrebi her turda yakalar, ama akrep de ilerlediği için yakalama tam 60 dakikada değil, biraz sonra olur. Yelkovanın akrebe göre bir tur (360°) fazla dönmesi için 360 ÷ 5,5 = 720/11 ≈ <strong>65,45 dakika</strong> gerekir.",
        "12 saat 720 dakika olduğundan bu sürede 720 ÷ (720/11) = <strong>11 çakışma</strong> olur; 24 saatte 22. Neden 12 değil? Çünkü 11 ile 1 arasında bir çakışma yoktur: 11:00'den sonraki çakışma tam 12:00'dedir ve bir sonraki turun başlangıcı sayılır."
      ],
      formula: "S ile S+1 arasında çakışma dakikası: D = 30S ÷ 5,5 = 60S/11\nSaat 2 ile 3 arası: D = 120/11 = 10 10/11 dakika → yaklaşık 2:10:55",
      after: [
        "Aynı mantıkla ibreler zıt yönde (180°) 24 saatte 22 kez, dik açıda (90°) 44 kez buluşur. Dik açı her 12 saatte iki kat sık olur, çünkü 90° iki farklı biçimde oluşabilir: yelkovan akrebin 90° önünde ya da 90° arkasında."
      ]
    },
    {
      h: "Dik açı yaptıkları saatler nasıl bulunur?",
      p: [
        "İstenen açıyı formüle yerleştirip denklemi çözersiniz. Mutlak değer olduğu için iki durum vardır: 30S − 5,5D = +90 ya da 30S − 5,5D = −90."
      ],
      ol: [
        "Soru: Saat 3 ile 4 arasında ibreler hangi anlarda dik açı yapar?",
        "Birinci durum: 90 − 5,5D = 90 → D = 0. Yani tam 3:00.",
        "İkinci durum: 90 − 5,5D = −90 → 5,5D = 180 → D = 360/11 = 32 8/11 dakika, yaklaşık <strong>3:32:44</strong>.",
        "Kontrol: akrep 90 + 16,36 = 106,36°, yelkovan 196,36°; fark 90°."
      ],
      after: [
        "Aynı yolla \"saat 5 ile 6 arasında ibreler hangi anda zıt yönde olur?\" sorusu 150 − 5,5D = −180 denkleminden D = 60 dakika çıkar ve bu aralığın dışında kalır; diğer çözüm 150 − 5,5D = 180 negatif dakika verir. Bu da 5 ile 6 arasında zıt konumun yalnızca tam 6:00'da (aralığın sonunda) gerçekleştiğini gösterir. Sınavda böyle sonuçlara dikkat edin: dakika 0 ile 60 arasında olmalıdır."
      ]
    },
    {
      h: "Geniş açı ile dar açı: hangisi alınır?",
      p: [
        "İki ibre çemberi iki parçaya böler: biri 180°'den küçük ya da eşit, diğeri büyük. Bu iki açının toplamı her zaman 360°'dir. Aksi belirtilmedikçe soru \"ibreler arasındaki açı\" dediğinde <strong>küçük olanı</strong> kastedilir. Küçük açı 90°'den küçükse dar açı, 90° ise dik açı, 90° ile 180° arasındaysa geniş açı, 180° ise doğru açı adını alır.",
        "Bazı sorular açıkça \"büyük açı\" ya da \"saat yönündeki açı\" ister. Saat yönündeki açı, akrepten başlayıp saat yönünde yelkovana kadar ölçülen açıdır ve 180°'yi aşabilir. Soru kökünü dikkatle okumak puan kaybını önler. Açı türlerini ve üçgende açılar konusunu [[bilgi:ucgende-acilar|üçgende açılar yazısında]] tazeleyebilirsiniz."
      ]
    },
    {
      h: "Saat problemleri sınavlarda nasıl sorulur?",
      ul: [
        "<strong>Doğrudan açı:</strong> \"Saat 8:20'de ibreler arasındaki dar açı kaç derecedir?\" Formül: |240 − 110| = 130°.",
        "<strong>Ters soru:</strong> \"Saat 4 ile 5 arasında ibreler arasındaki açı ilk kez 10° olduğunda saat kaçtır?\" Denklem 120 − 5,5D = 10 → D = 20 dakika.",
        "<strong>Çakışma sayısı:</strong> \"Bir gün içinde ibreler kaç kez üst üste gelir?\" Cevap 22.",
        "<strong>Ayna ve ters saat:</strong> Aynadaki saatin gerçek saati 11:60'tan çıkarılarak bulunur; 3:40 aynada 8:20 görünür.",
        "<strong>Bozuk saat:</strong> \"Saatte 2 dakika geri kalan bir saat\" sorusu oran-orantı ile çözülür; [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı yazısı]] yöntemi anlatır.",
        "<strong>Radyan sorusu:</strong> Lise trigonometrisinde açı radyan istenebilir; 130° = 13π/18 radyandır. Dönüşüm için [[arac:derece-radyan-cevir|Derece Radyan Çevirici]] kullanılabilir."
      ],
      after: [
        "Pratik ipucu: sınavda formülü hatırlamazsanız ibre konumlarını ayrı ayrı hesaplayın; yelkovanı 6D, akrebi 30S + D/2 olarak bulup farklarını alın. İki yol da aynı sonuca götürür ve yöntem tek başına yeterlidir."
      ]
    },
    {
      h: "Saniyeli ve kesirli dakikalı sorular",
      p: [
        "Bazı sorular saniyeyi de hesaba katar. Bu durumda dakikayı ondalık olarak yazmak yeterlidir: 2:10:30 için D = 10,5 alınır ve açı |60 − 57,75| = 2,25° bulunur. Saniye ibresi de işin içine girerse onun dakikada 360°, yani saniyede 6° döndüğünü hatırlayın.",
        "Çakışma ve dik açı sorularında sonuç çoğu zaman 11'e bölünen kesirli dakikalar çıkar: 10 10/11, 32 8/11, 21 9/11 gibi. Bu kesirleri saniyeye çevirmek için kesirli kısmı 60 ile çarpın; 8/11 dakika yaklaşık 43,6 saniyedir. Şıklarda genellikle kesirli biçim verildiği için ondalığa geçmeden kesirle çalışmak hem daha hızlı hem daha güvenlidir. Kesirlerle işlem pratiği için [[bilgi:kesirlerle-islemler|kesirlerle işlemler yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Akrebi sabit sanmak:</strong> 3:40'ta akrep 90°'de değil 110°'dedir; 0,5 × D payını unutmayın.",
        "<strong>24 saatlik saati doğrudan kullanmak:</strong> 15:40 için S = 15 alırsanız 450 − 220 = 230 çıkar; 360'tan çıkarmazsanız yanılırsınız. S'yi 12'ye göre yazın.",
        "<strong>Büyük açıyı cevap vermek:</strong> Sonuç 180°'den büyükse küçük açı için 360'tan çıkarın.",
        "<strong>Çakışma sayısını 24 sanmak:</strong> Doğru cevap 22'dir.",
        "<strong>Dakikayı ondalık saatle karıştırmak:</strong> 32,73 dakika, 32 dakika 44 saniyedir; ondalık zamanı dakika-saniyeye çevirmek için [[bilgi:ondalik-saat-dakikaya-cevirme|ondalık saat yazısına]] bakın."
      ]
    }
  ],
  faq: [
    ["Akrep ile yelkovan arasındaki açı nasıl hesaplanır?", "Açı, otuz çarpı saat eksi beş buçuk çarpı dakika ifadesinin mutlak değeriyle bulunur. Sonuç 180 dereceden büyükse 360'tan çıkarılarak küçük açı elde edilir; saat 12'lik düzende yazılmalıdır."],
    ["Saat 3:40'ta akrep ile yelkovan arasındaki açı kaçtır?", "Saat 3:40'ta yelkovan 240 derecede, akrep 110 derecededir. Aradaki fark 130 derecedir ve 180'den küçük olduğu için küçük açı 130, büyük açı 230 derecedir."],
    ["Akrep dakikada kaç derece döner?", "Akrep 12 saatte tam tur attığı için saatte 30 derece, dakikada 0,5 derece döner. Bu yüzden saat 3:40'ta akrep tam 3'ün üzerinde değil, 3 ile 4 arasının üçte ikisini geçmiş durumdadır."],
    ["Yelkovan dakikada kaç derece ilerler?", "Yelkovan 60 dakikada 360 derece döndüğü için dakikada 6 derece ilerler. Akreple arasındaki göreli hız dakikada 5,5 derecedir ve formüldeki 5,5 katsayısı buradan gelir."],
    ["Akrep ve yelkovan günde kaç kez üst üste gelir?", "İbreler 12 saatte 11 kez, 24 saatte 22 kez üst üste gelir. İki çakışma arasında yaklaşık 65,45 dakika vardır; 11 ile 1 arasında çakışma olmadığı için sayı 24 değildir."],
    ["Dik açı yaptıkları saatler nasıl bulunur?", "Formül 90 dereceye eşitlenir ve artı ile eksi iki durum ayrı çözülür. Saat 3 ile 4 arasında bu, tam 3:00 ve yaklaşık 3:32:44 anlarını verir; bir günde toplam 44 dik açı anı vardır."],
    ["Geniş açı ile dar açı hangisi alınır?", "Soru aksini belirtmedikçe ibreler arasındaki açı denince küçük olan açı kastedilir. Küçük açı 90'dan küçükse dar, 90 ile 180 arasındaysa geniş açıdır; iki açının toplamı her zaman 360 derecedir."],
    ["Saat problemleri sınavlarda nasıl sorulur?", "Sınavlarda doğrudan açı hesaplama, verilen açıya göre saati bulma, günlük çakışma sayısı, aynadaki saat ve geri kalan saat soruları sorulur. Hepsinde ibre hızları olan 6 ve 0,5 derece temel alınır."],
    ["Saat 9:15'te ibreler neden 180 derece değildir?", "Saat 9:15'te yelkovan 3'tedir ama akrep 9'dan çeyrek saat ilerlemiş, yani 7,5 derece kaymıştır. Bu yüzden ibreler arasındaki küçük açı 180 değil 172,5 derecedir."]
  ],
  tools: ["saat-acisi-hesapla", "derece-radyan-cevir", "ucgen-acisi-hesapla"],
  related: ["kesirlerle-islemler", "ucgende-acilar", "oran-oranti-nasil-cozulur", "ondalik-saat-dakikaya-cevirme"],
  sources: [
    ["MEB – Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"],
    ["ÖSYM – Sınav soru kitapçıkları", "https://www.osym.gov.tr/"]
  ]
};
