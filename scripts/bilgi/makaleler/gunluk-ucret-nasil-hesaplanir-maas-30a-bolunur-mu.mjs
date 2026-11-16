export default {
  slug: "gunluk-ucret-nasil-hesaplanir-maas-30a-bolunur-mu",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Günlük Ücret Nasıl Hesaplanır? Aylık Maaş 30'a mı Bölünür, Saatlik Ücret Kaç Eder",
  pageTitle: "Günlük Ücret Hesaplama: Maaş 30'a, Saatlik Ücret 225'e Bölünür",
  description: "Aylık maaşlı işçide günlük ücret maaşın 30'a, saatlik ücret 225'e bölünmesiyle bulunur; şubatta da 30 gün geçerlidir. Eksik gün, ay ortası giriş ve örnekler.",
  keywords: ["günlük ücret hesaplama", "aylık maaş 30'a bölünür mü", "günlük brüt ücret", "saatlik ücret nasıl bulunur", "225 saat hesabı", "eksik gün maaş kesintisi", "yarım gün ücret hesabı", "şubat maaş kaç gün"],
  lead: "Aylık ücretle çalışan bir işçinin günlük ücreti, aylık brüt maaşın 30'a bölünmesiyle bulunur; ayın 28, 29 ya da 31 gün çekmesi sonucu değiştirmez. Saatlik ücret ise haftalık 45 saatlik çalışmada aylık brüt ücretin 225'e (7,5 saat × 30 gün) bölünmesiyle hesaplanır. Bu birim ücretler eksik gün kesintisi, ay ortası işe giriş, fazla mesai, ihbar ve kıdem tazminatı gibi pek çok hesabın temelidir. Aşağıda formülleri, 45.000 TL brüt maaş üzerinden çözümlü örnekleri ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Günlük brüt ücret = aylık brüt ücret ÷ 30; şubat ve 31 çeken aylarda da 30 kullanılır.",
    "Saatlik brüt ücret = aylık brüt ücret ÷ 225 (haftada 45 saat, günde ortalama 7,5 saat).",
    "Eksik gün kesintisi = günlük brüt ücret × eksik gün; kalan gün sayısı SGK'ya ayrıca bildirilir.",
    "Ay ortasında başlayanın ücreti = günlük brüt ücret × o ay çalışılan takvim günü.",
    "Kıdem ve ihbar tazminatında da günlük ücret, giydirilmiş brüt ücretin 30'a bölünmesiyle bulunur.",
    "Örnek: 45.000 TL brüt maaşta günlük ücret 1.500 TL, saatlik ücret 200 TL, fazla mesai saati 300 TL'dir."
  ],
  figure: {
    alt: "45.000 TL brüt aylık maaştan birim ücretlere geçiş: 30'a bölünce günlük 1.500 TL, 225'e bölünce saatlik 200 TL, saatlik ücretin 1,5 katı fazla mesai 300 TL; altta 3 günlük eksik gün kesintisi örneği.",
    caption: "Aylık maaştan günlük ve saatlik ücrete giden iki bölen: 30 ve 225. Örnekteki 45.000 TL brüt tutar örnektir; aynı oranlar her maaşa uygulanır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="p"/></marker></defs>
  <text x="360" y="32" class="lg b mid">Aylık maaştan birim ücrete</text>
  <rect x="250" y="52" width="220" height="62" rx="8" class="p"/>
  <text x="360" y="78" class="sm mid sf">Aylık brüt ücret (örnek)</text>
  <text x="360" y="102" class="b lg mid sf">45.000 TL</text>
  <line x1="300" y1="114" x2="160" y2="164" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <line x1="420" y1="114" x2="560" y2="164" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <text x="196" y="136" class="sm b p end">÷ 30</text>
  <text x="524" y="136" class="sm b p">÷ 225</text>
  <rect x="60" y="168" width="200" height="62" rx="8" class="ps"/>
  <text x="160" y="194" class="sm mid">Günlük ücret</text>
  <text x="160" y="218" class="b lg mid">1.500 TL</text>
  <rect x="460" y="168" width="200" height="62" rx="8" class="ps"/>
  <text x="560" y="194" class="sm mid">Saatlik ücret</text>
  <text x="560" y="218" class="b lg mid">200 TL</text>
  <text x="560" y="254" class="sm mid t2">Fazla mesai: 200 × 1,5 = 300 TL</text>
  <text x="160" y="254" class="sm mid t2">Şubatta da 30 gün sayılır</text>
  <rect x="40" y="280" width="640" height="100" rx="8" class="sf sb"/>
  <rect x="40" y="280" width="8" height="100" class="dg"/>
  <text x="64" y="306" class="b">Eksik gün örneği: 3 gün ücretsiz izin</text>
  <text x="64" y="332" class="sm t2">Kesinti: 1.500 × 3 = 4.500 TL</text>
  <text x="64" y="356" class="sm t2">Ödenecek brüt: 1.500 × 27 gün = 40.500 TL · SGK'ya 27 gün bildirilir</text>
</svg>`
  },
  sections: [
    {
      h: "Aylık maaş neden 30'a bölünür?",
      p: [
        "Türkiye'de aylık ücretle çalışanlar için iş hukuku, sosyal güvenlik ve bordro uygulaması ayı <strong>30 gün</strong> kabul eder. 5510 sayılı Kanun'a göre ayın tamamında çalışan sigortalının prim gün sayısı 30 olarak bildirilir; Asgari Ücret Yönetmeliği de aylık asgari ücreti günlük tutarın 30 katı olarak tanımlar. Yargıtay da kıdem, ihbar ve fazla mesai gibi alacak hesaplarında günlük ücreti aylık ücretin 30'a bölünmesiyle bulur.",
        "Bu yaklaşımın pratik sonucu şudur: aylık maktu ücretle çalışan işçi, 28 gün çeken şubatta da 31 gün çeken martta da aynı aylığı alır. İş Kanunu'nun 49. maddesi de aylığı tam ödenen aylık ücretli işçiler için hafta tatili ve genel tatil ücretlerinin aylığın içinde sayıldığını kabul eder; yani ayrıca gün gün ödeme yapılmaz.",
        "Günlük ücretle çalışanlarda ise durum farklıdır. Sözleşmesi \"günlük şu kadar TL\" diye yapılan işçiye ay kaç gün çekiyorsa o kadar ödeme yapılır; 31 günlük ayda 31 gün, şubatta 28 gün. Bu yazıdaki hesaplar, en yaygın durum olan aylık ücretliler içindir."
      ]
    },
    {
      h: "Günlük ve saatlik ücret formülleri",
      p: [
        "Haftalık çalışma süresi İş Kanunu'nun 63. maddesine göre en çok 45 saattir. Haftada 6 gün çalışılan bir düzende bu günde ortalama 7,5 saate denk gelir. 30 günlük bir ayda 7,5 saatlik günler 225 saat eder; bordro uygulamasında saatlik ücretin bu sayıyla bulunması buradan gelir."
      ],
      formula: "Günlük brüt ücret = aylık brüt ücret ÷ 30\nSaatlik brüt ücret = aylık brüt ücret ÷ 225  (7,5 saat × 30 gün)\nFazla mesai saat ücreti = saatlik brüt ücret × 1,5",
      table: {
        head: ["Aylık brüt (örnek)", "Günlük (÷30)", "Saatlik (÷225)", "Fazla mesai saati (×1,5)"],
        rows: [
          ["33.030 TL (2026 brüt asgari ücret)", "1.101,00 TL", "146,80 TL", "220,20 TL"],
          ["45.000 TL", "1.500,00 TL", "200,00 TL", "300,00 TL"],
          ["60.000 TL", "2.000,00 TL", "266,67 TL", "400,00 TL"],
          ["90.000 TL", "3.000,00 TL", "400,00 TL", "600,00 TL"]
        ],
        caption: "Asgari ücret satırı 2026 yılı için yayımlanan brüt tutara göredir; güncel değeri Çalışma ve Sosyal Güvenlik Bakanlığı duyurusundan kontrol edin."
      },
      after: [
        "Bazı işyerleri haftalık 40 saat ya da 5 günlük düzenle çalışır. Bu durumda saatlik ücret için 225 yerine fiilî aylık saat kullanılabilir; örneğin haftalık 40 saat için 40 × 52 ÷ 12 ≈ 173,3 saat. Sözleşmenizde fazla çalışma hesabının nasıl yapılacağı yazmıyorsa bordro uygulamasındaki genel kabul 225 saattir. Saatlik ve aylık arasında hızlı çeviri için [[arac:saatlik-aylik-ucret-cevir|Saatlik Aylık Ücret Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Şubat ayında da maaş 30 güne mi bölünür?",
      p: [
        "Evet. Aylık ücretli işçide ay kaç gün çekerse çeksin hesap 30 gün üzerinden yapılır. Şubatta tam çalışan işçi 30 günlük ücretini alır ve SGK'ya 30 gün bildirilir. Mart gibi 31 çeken aylarda da fazladan bir günlük ücret ödenmez.",
        "Eksik gün olan aylarda ise uygulama bir adım daha dikkat ister. Ayın tamamı çalışılmamışsa önce eksik gün sayısı bulunur, sonra 30'dan düşülür. Örneğin şubatta 2 gün ücretsiz izin kullanan işçiye 28 değil 30 − 2 = 28 gün ödenir; 31 çeken bir ayda 2 gün ücretsiz izin yine 28 gün eder. Ay içinde işe giriş ya da işten çıkış varsa ise fiilî takvim günleri sayılır; bu ayrımı aşağıdaki örneklerde görebilirsiniz."
      ]
    },
    {
      h: "Eksik gün kesintisi ve yarım gün izin hesabı",
      p: [
        "Ücretsiz izin, devamsızlık ya da rapor gibi nedenlerle çalışılmayan günlerde, aylık ücretten günlük ücret kadar kesinti yapılır. Rapor günlerinde ise ücret yerine şartları varsa SGK geçici iş göremezlik ödeneği ödenir; ayrıntısı için [[bilgi:rapor-parasi-nasil-hesaplanir|rapor parası nasıl hesaplanır]] yazısına bakabilirsiniz."
      ],
      ol: [
        "Günlük ücreti bulun: 45.000 ÷ 30 = 1.500 TL.",
        "Eksik gün sayısını belirleyin: 3 gün ücretsiz izin.",
        "Kesintiyi hesaplayın: 1.500 × 3 = 4.500 TL.",
        "Ödenecek brüt ücret: 45.000 − 4.500 = 40.500 TL; SGK'ya 27 gün bildirilir.",
        "Yarım gün ücretsiz izin için: 7,5 saatin yarısı 3,75 saattir; 3,75 × 200 = 750 TL, yani günlük ücretin yarısı kadar kesinti olur."
      ],
      after: [
        "Ay içindeki çalışılan ve eksik günleri tek tabloda izlemek için [[bilgi:puantaj-nasil-hesaplanir|puantaj nasıl hesaplanır]] yazısı yol gösterir. Saat bazlı giriş-çıkış kayıtlarınızı toplamak için [[arac:calisma-suresi-hesapla|Çalışma Süresi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Ay ortasında işe başlayanın maaşı nasıl hesaplanır?",
      p: [
        "Ay ortasında işe başlayan ya da işten ayrılan çalışanda o ay için fiilen sözleşme altında geçen <strong>takvim günleri</strong> sayılır ve günlük ücretle çarpılır. Bu durumda 30 kuralı yerine ayın gerçek günleri kullanılır, çünkü kısmi bir aydan söz edilir."
      ],
      table: {
        head: ["Durum", "Çalışılan gün", "Hesap", "Brüt ücret"],
        rows: [
          ["16 Mart'ta işe giriş", "16 gün (16–31 Mart)", "1.500 × 16", "24.000 TL"],
          ["15 Nisan'da çıkış", "15 gün (1–15 Nisan)", "1.500 × 15", "22.500 TL"],
          ["10 Şubat'ta işe giriş", "19 gün (10–28 Şubat)", "1.500 × 19", "28.500 TL"],
          ["Tam ay çalışma", "30 gün", "45.000", "45.000 TL"]
        ],
        caption: "Örnek brüt maaş 45.000 TL. Kısmi aylarda bazı işverenler farklı yöntem uygulayabilir; iş sözleşmenize ve bordronuza bakın."
      }
    },
    {
      h: "Günlük brüt ücret ile günlük net ücret farkı",
      p: [
        "Yasal hesapların tamamı brüt ücret üzerinden yapılır: kıdem, ihbar, fazla mesai, eksik gün kesintisi. Günlük net ücret ise yalnızca \"elime günde ne geçiyor\" sorusunun cevabıdır ve aylık net maaşın 30'a bölünmesiyle bulunur. Net tutar, kümülatif vergi matrahına göre aydan aya değiştiği için günlük net ücret de yıl içinde sabit değildir.",
        "Örneğin 45.000 TL brüt maaşı olan bir işçinin yılın ilk aylarındaki net maaşı yaklaşık 36.630 TL ise günlük net ücreti 1.221 TL kadardır. Yılın son aylarında vergi dilimi yükseldiğinde aynı brüt maaşın neti düşer. Bu etkinin nedenini [[bilgi:kumulatif-vergi-matrahi-nedir-maas-neden-duser|kümülatif vergi matrahı]] yazısında ayrıntılı bulabilirsiniz; brütten nete dönüşüm için [[arac:brut-net-maas|Brüt Net Maaş Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Günlük ücret kıdem, ihbar ve fazla mesai hesabında nasıl kullanılır?",
      ul: [
        "<strong>Kıdem tazminatı:</strong> Her tam yıl için 30 günlük giydirilmiş brüt ücret ödenir; artık süreler orantılıdır. Günlük tutar, giydirilmiş brüt ücretin 30'a bölünmesiyle bulunur ve kıdem tavanı ile sınırlanır.",
        "<strong>İhbar tazminatı:</strong> Günlük giydirilmiş brüt ücret, ihbar süresinin gün karşılığıyla (14, 28, 42, 56) çarpılır. Ayrıntılar için [[bilgi:istifa-ederken-ihbar-suresi-verilir-mi|istifada ihbar süresi]] yazısına bakın.",
        "<strong>Fazla çalışma:</strong> Haftalık 45 saati aşan her saat, saatlik ücretin %50 fazlasıyla ödenir. Fazla mesai tutarını [[arac:mesai-hesapla|Mesai Hesaplama]] aracıyla bulabilirsiniz.",
        "<strong>Kullanılmayan yıllık izin:</strong> İş sözleşmesi bittiğinde kullanılmamış izin günleri, son brüt ücretten bulunan günlük ücretle çarpılarak ödenir.",
        "<strong>Hafta tatili ve genel tatil çalışması:</strong> Tatil gününde çalışan aylık ücretliye ayrıca bir günlük ücret ödenir; hesap yine günlük brüt ücretle yapılır."
      ]
    },
    {
      h: "Günlük ücret hesabında sık yapılan hatalar",
      ul: [
        "<strong>Ayın gerçek gün sayısına bölmek:</strong> Aylık ücretlide tam ay çalışıldığında 31'e ya da 28'e bölmek yanlış sonuç verir; bölen 30'dur.",
        "<strong>Net maaşı bölmek:</strong> Tazminat ve kesinti hesapları brüt ücretle yapılır.",
        "<strong>Saatlik ücret için 30 × 8 = 240 kullanmak:</strong> Haftalık 45 saatlik düzende bölen 225'tir; 240 kullanmak saatlik ücreti düşük gösterir.",
        "<strong>Yan hakları unutmak:</strong> Kıdem ve ihbarda düzenli ödenen yol ve yemek yardımı gibi parasal haklar giydirilmiş ücrete eklenir.",
        "<strong>Günlük ücretli ile aylık ücretliyi karıştırmak:</strong> Sözleşmede günlük ücret yazıyorsa ayın gerçek gün sayısı esas alınır.",
        "<strong>Kısmi ayda 30 kuralını uygulamak:</strong> Ay ortasında başlayan ya da ayrılan çalışanda fiilî takvim günleri sayılır; tam ay varsayımı fazla ya da eksik ödeme doğurur."
      ]
    }
  ],
  faq: [
    ["Aylık maaştan günlük ücret nasıl hesaplanır?", "Aylık brüt maaş 30'a bölünür. Örneğin 45.000 TL brüt maaşın günlük karşılığı 1.500 TL'dir. Bu kural ayın 28, 30 ya da 31 gün çekmesinden bağımsız olarak aylık ücretli tüm işçilerde uygulanır."],
    ["Şubat ayında da maaş 30 güne mi bölünür?", "Evet. Aylık ücretli işçi şubatta tam çalışmışsa 30 günlük ücretini alır ve SGK'ya 30 gün bildirilir. Eksik gün varsa bu gün sayısı 30'dan düşülerek ödeme yapılır."],
    ["Saatlik ücret için aylık maaş 225'e mi bölünür?", "Haftalık 45 saatlik çalışma düzeninde evet. Günde ortalama 7,5 saat ile 30 gün çarpılınca 225 saat bulunur. 45.000 TL brüt maaşta saatlik brüt ücret 45.000 ÷ 225 = 200 TL'dir."],
    ["Eksik çalışılan günler maaştan nasıl düşülür?", "Günlük brüt ücret eksik gün sayısıyla çarpılarak kesinti bulunur. 45.000 TL brüt maaşta 3 günlük ücretsiz izin 4.500 TL kesinti yapar; o ay 27 günlük ücret ödenir ve SGK'ya 27 gün bildirilir."],
    ["Günlük brüt ücret ile günlük net ücret farkı nedir?", "Günlük brüt ücret aylık brüt maaşın 30'da biridir ve tüm yasal hesaplarda kullanılır. Günlük net ücret ise aylık net maaşın 30'a bölünmesiyle bulunur ve vergi dilimi yükseldikçe yıl içinde azalabilir."],
    ["Ay ortasında işe başlayanın maaşı nasıl hesaplanır?", "O ay sözleşme altında geçen takvim günleri sayılır ve günlük brüt ücretle çarpılır. 16 Mart'ta başlayan, 45.000 TL brüt maaşlı işçiye mart için 16 gün × 1.500 TL = 24.000 TL brüt ödenir."],
    ["Yarım gün izin kaç TL kesintiye denk gelir?", "Yarım gün, 7,5 saatlik iş gününün yarısı olan 3,75 saattir. Saatlik ücretle çarpıldığında günlük ücretin yarısına eşit olur; 45.000 TL brüt maaşta yarım gün ücretsiz izin 750 TL kesinti demektir."],
    ["Günlük ücret kıdem ve ihbar hesabında nasıl kullanılır?", "Kıdem ve ihbar tazminatında giydirilmiş brüt aylık ücret 30'a bölünür. Kıdemde her tam yıl için 30 günlük ücret, ihbarda ise kıdeme göre 14, 28, 42 ya da 56 günlük ücret ödenir."],
    ["Günlük ücretle çalışan işçiye 31 çeken ayda kaç gün ödenir?", "Sözleşmesi günlük ücret üzerinden yapılmış işçiye ay kaç gün çekiyorsa o kadar ödenir. 31 çeken ayda 31 günlük, şubatta 28 ya da 29 günlük ücret ödenir; 30 kuralı aylık ücretliler içindir."],
    ["Haftada 40 saat çalışanın saatlik ücreti nasıl bulunur?", "Haftalık 40 saatlik düzende aylık ortalama çalışma saati 40 × 52 ÷ 12 ≈ 173,3 saattir. Aylık brüt ücreti bu sayıya bölmek fiilî saatlik ücreti verir; ancak sözleşmede 225 saat esası yazıyorsa o kullanılır."]
  ],
  tools: ["saatlik-aylik-ucret-cevir", "brut-net-maas", "calisma-suresi-hesapla", "mesai-hesapla"],
  related: ["maas-bordrosu-nasil-okunur", "puantaj-nasil-hesaplanir", "part-time-maas-nasil-hesaplanir", "kullanilmayan-yillik-izin-ucreti-nasil-hesaplanir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 4857 sayılı İş Kanunu (md. 41, 49, 63)", "https://www.mevzuat.gov.tr/"],
    ["SGK – Prim gün sayısı ve işveren işlemleri", "https://www.sgk.gov.tr/"],
    ["Çalışma ve Sosyal Güvenlik Bakanlığı – Asgari ücret", "https://www.csgb.gov.tr/"]
  ],
  uyari: "genel bilgi niteliğindedir; bordronuza özgü durumlar için muhasebe biriminize ya da mali müşavirinize danışın"
};
