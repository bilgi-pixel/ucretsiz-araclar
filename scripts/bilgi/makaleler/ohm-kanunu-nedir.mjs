export default {
  slug: "ohm-kanunu-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Ohm Kanunu Nedir? V=I·R Formülü, Akım-Gerilim-Direnç Örnekleri",
  pageTitle: "Ohm Kanunu Nedir? V = I × R Formülü ve Çözümlü Örnekler",
  description: "Ohm kanunu: gerilim = akım × direnç (V = I · R). Ohm üçgeni, birimler, seri ve paralel devre, elektriksel güç ve 8. sınıf ile 10. sınıf düzeyinde çözümlü örnekler.",
  keywords: ["ohm kanunu", "ohm kanunu formülü", "v=ir", "akım gerilim direnç ilişkisi", "ohm kanunu örnek soru", "direnç birimi ohm", "ohm üçgeni", "elektriksel güç formülü"],
  lead: "Ohm kanunu, <strong>bir iletkenin uçları arasındaki gerilimin, içinden geçen akım ile direncinin çarpımına eşit olduğunu</strong> söyler: V = I · R. Gerilim volt (V), akım amper (A), direnç ohm (Ω) ile ölçülür. Direnç sabitken gerilim iki katına çıkarsa akım da iki katına çıkar; 12 V'luk bir kaynağa bağlı 4 Ω'luk dirençten 3 A akım geçer. Bu yazıda formülün üç halini, Ohm üçgenini, seri ve paralel devrelerde kullanımını, elektriksel gücü ve kanunun geçerli olmadığı durumları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Formül: V = I · R; buradan I = V ÷ R ve R = V ÷ I.",
    "Birimler: gerilim volt (V), akım amper (A), direnç ohm (Ω); 1 Ω = 1 V ÷ 1 A.",
    "Direnç sabitse akım gerilimle doğru orantılıdır; gerilim sabitse akım dirençle ters orantılıdır.",
    "Elektriksel güç: P = V · I = I² · R = V² ÷ R, birimi watt (W).",
    "Seri bağlamada dirençler toplanır; paralel bağlamada 1 ÷ R_eş = 1 ÷ R₁ + 1 ÷ R₂.",
    "Ohm kanunu sabit sıcaklıktaki metal iletkenlerde geçerlidir; diyot ve LED gibi elemanlarda geçerli değildir."
  ],
  figure: {
    alt: "Solda Ohm üçgeni: üstte V, altta I ve R. Sağda gerilim-akım grafiği: 2 ohm ve 4 ohm dirençler için düz çizgiler; 12 volt ve 4 ohm noktasında akım 3 amper.",
    caption: "Ohm üçgeninde bulmak istediğiniz büyüklüğü kapatın; kalan ikisi formülü verir. Grafikte direnç sabit olduğu için akım-gerilim ilişkisi doğrusaldır; direnç büyüdükçe doğru yatıklaşır ve aynı gerilimde daha az akım geçer.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Ohm kanunu: V = I · R</text>
  <polygon points="170,70 50,300 290,300" class="ps sp sw"/>
  <line x1="95" y1="215" x2="245" y2="215" class="sp sw" fill="none"/>
  <line x1="170" y1="215" x2="170" y2="300" class="sp sw" fill="none"/>
  <text x="170" y="180" class="xl mid">V</text>
  <text x="125" y="270" class="xl mid">I</text>
  <text x="215" y="270" class="xl mid">R</text>
  <text x="170" y="326" class="sm mid">V = I × R</text>
  <text x="170" y="346" class="sm mid">I = V ÷ R · R = V ÷ I</text>
  <line x1="360" y1="340" x2="690" y2="340" class="st" fill="none"/>
  <line x1="360" y1="340" x2="360" y2="80" class="st" fill="none"/>
  <text x="690" y="360" class="sm end">Gerilim (V)</text>
  <text x="368" y="88" class="sm">Akım (A)</text>
  <g class="sm mid">
    <text x="440" y="358">3</text><text x="520" y="358">6</text><text x="600" y="358">9</text><text x="680" y="358">12</text>
  </g>
  <g class="sm end">
    <text x="352" y="304">1</text><text x="352" y="224">3</text><text x="352" y="104">6</text>
  </g>
  <line x1="360" y1="340" x2="680" y2="100" class="sp sw" fill="none"/>
  <line x1="360" y1="340" x2="680" y2="220" class="sa sw" fill="none"/>
  <text x="600" y="140" class="sm b p">R = 2 Ω</text>
  <text x="600" y="276" class="sm b">R = 4 Ω</text>
  <line x1="680" y1="220" x2="680" y2="340" class="st dash" fill="none"/>
  <line x1="360" y1="220" x2="680" y2="220" class="st dash" fill="none"/>
  <circle cx="680" cy="220" r="7" class="p"/>
  <rect x="440" y="372" width="250" height="24" rx="6" class="oks"/>
  <text x="565" y="389" class="sm mid b">12 V ÷ 4 Ω = 3 A</text>
</svg>`
  },
  sections: [
    {
      h: "Ohm kanunu nedir?",
      p: [
        "Alman fizikçi Georg Simon Ohm, 1827'de yayımladığı çalışmada bir iletkenden geçen akımın uçlarına uygulanan gerilimle doğru orantılı olduğunu gösterdi. Bu orantının sabiti iletkenin direncidir. Kanun bugün elektrik devrelerinin en temel bağıntısıdır ve ortaokul fen bilimleri, lise fiziği ve meslek lisesi elektrik derslerinde öğretilir.",
        "Kanunu bir su borusu benzetmesiyle düşünebilirsiniz: gerilim borudaki basınç farkına, akım borudan geçen suyun debisine, direnç ise borunun darlığına benzer. Basınç arttıkça daha çok su akar; boru daraldıkça aynı basınçla daha az su akar. Benzetme mükemmel değildir, ama üç büyüklük arasındaki ilişkiyi akılda tutmayı kolaylaştırır."
      ]
    },
    {
      h: "Akım, gerilim ve direnç: tanımlar ve birimler",
      table: {
        head: ["Büyüklük", "Sembol", "Birim", "Ne anlatır?", "Ölçü aleti"],
        rows: [
          ["Gerilim (potansiyel fark)", "V (ya da U)", "volt (V)", "Yükleri hareket ettiren elektriksel itme", "Voltmetre (paralel bağlanır)"],
          ["Akım", "I", "amper (A)", "Bir kesitten birim zamanda geçen yük miktarı", "Ampermetre (seri bağlanır)"],
          ["Direnç", "R", "ohm (Ω)", "İletkenin akıma karşı gösterdiği zorluk", "Ohmmetre (devre enerjisizken)"],
          ["Güç", "P", "watt (W)", "Birim zamanda harcanan elektrik enerjisi", "Wattmetre"]
        ]
      },
      after: [
        "Küçük ve büyük değerler için önekler kullanılır: 1 kΩ (kiloohm) = 1.000 Ω, 1 MΩ (megaohm) = 1.000.000 Ω, 1 mA (miliamper) = 0,001 A. Hesaplarda birimleri önce temel birime çevirmeyi unutmayın: 2,2 kΩ'luk dirençten 5 mA geçiyorsa gerilim 2.200 × 0,005 = 11 V'tur. Direnç değerini direnç üzerindeki renklerden okumayı [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Ohm kanunu formülü ve Ohm üçgeni",
      formula: "V = I × R (gerilim = akım × direnç)\nI = V ÷ R (akım = gerilim ÷ direnç)\nR = V ÷ I (direnç = gerilim ÷ akım)",
      p: [
        "Üç formül aynı bağıntının farklı biçimleridir. Hangisini kullanacağınızı hatırlamanın kolay yolu <strong>Ohm üçgenidir</strong>: üçgenin tepesine V, altına yan yana I ve R yazılır. Bulmak istediğiniz büyüklüğü parmağınızla kapatın. V'yi kapatırsanız I ve R yan yana kalır, yani çarpılır. I'yı kapatırsanız V, R'nin üstünde kalır, yani V ÷ R. R'yi kapatırsanız V ÷ I kalır.",
        "Kanunun söylediği ilişki şudur: <strong>direnç sabitken</strong> akım gerilimle doğru orantılıdır; gerilimi iki katına çıkarırsanız akım da iki katına çıkar. <strong>Gerilim sabitken</strong> akım dirençle ters orantılıdır; direnci iki katına çıkarırsanız akım yarıya iner. Gerilim-akım grafiği bir doğrudur ve bu doğrunun eğimi direncin tersini (I ekseni düşeyse) gösterir. Oran ve orantı mantığını [[bilgi:oran-oranti-nasil-cozulur|oran-orantı]] yazısında tekrar edebilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Akımı bulma:</strong> 12 V'luk bir pile 4 Ω'luk direnç bağlanıyor. I = V ÷ R = 12 ÷ 4 = <strong>3 A</strong>.",
        "<strong>Gerilimi bulma:</strong> 50 Ω'luk bir dirençten 0,2 A akım geçiyor. V = I × R = 0,2 × 50 = <strong>10 V</strong>.",
        "<strong>Direnci bulma:</strong> 9 V'luk bir kaynaktan 0,03 A (30 mA) çekiliyor. R = V ÷ I = 9 ÷ 0,03 = <strong>300 Ω</strong>.",
        "<strong>Orantı sorusu:</strong> Bir dirençten 6 V'ta 1,5 A geçiyor. Gerilim 18 V'a çıkarılırsa akım kaç olur? Direnç sabit (6 ÷ 1,5 = 4 Ω) olduğu için gerilim 3 katına çıkınca akım da 3 katına çıkar: <strong>4,5 A</strong>.",
        "<strong>Birim çevirme:</strong> 4,7 kΩ'luk dirence 5 V uygulanıyor. I = 5 ÷ 4.700 ≈ 0,00106 A ≈ <strong>1,06 mA</strong>."
      ],
      after: [
        "Bu hesapları [[arac:ohm-kanunu-hesapla|Ohm Kanunu Hesaplama]] aracıyla doğrulayabilirsiniz; gerilim, akım, direnç ve güçten herhangi ikisini yazdığınızda araç diğer ikisini bulur."
      ]
    },
    {
      h: "Seri ve paralel devrelerde Ohm kanunu",
      p: [
        "Birden fazla direnç içeren devrelerde önce <strong>eşdeğer direnç</strong> bulunur, sonra Ohm kanunu tüm devreye ve tek tek dirençlere uygulanır. Seri bağlamada dirençlerden aynı akım geçer, gerilim paylaşılır. Paralel bağlamada her direncin uçlarındaki gerilim aynıdır, akım paylaşılır."
      ],
      formula: "Seri: R_eş = R₁ + R₂ + R₃ …\nParalel: 1 ÷ R_eş = 1 ÷ R₁ + 1 ÷ R₂ + …\nİki paralel direnç için: R_eş = (R₁ × R₂) ÷ (R₁ + R₂)",
      ol: [
        "<strong>Seri örnek:</strong> 2 Ω, 4 Ω ve 6 Ω seri bağlı, kaynak 24 V. R_eş = 12 Ω, I = 24 ÷ 12 = 2 A. Gerilimler: 2 × 2 = 4 V, 2 × 4 = 8 V, 2 × 6 = 12 V; toplam 24 V.",
        "<strong>Paralel örnek:</strong> 6 Ω ve 3 Ω paralel bağlı, kaynak 12 V. R_eş = (6 × 3) ÷ (6 + 3) = 2 Ω, toplam akım 12 ÷ 2 = 6 A. Kol akımları: 12 ÷ 6 = 2 A ve 12 ÷ 3 = 4 A; toplam 6 A.",
        "Paralel bağlamada eşdeğer direnç, en küçük dirençten bile küçüktür. Evdeki prizlere bağlanan her cihaz paralel bağlandığı için cihaz ekledikçe toplam akım artar."
      ],
      after: [
        "Daha fazla dirençli devreler için [[arac:seri-direnc-hesapla|Seri Direnç Hesaplama]] ve [[arac:paralel-direnc-hesapla|Paralel Direnç Hesaplama]] araçları her direncin akımını ve gerilimini ayrı ayrı gösterir."
      ]
    },
    {
      h: "Elektriksel güç Ohm kanunuyla nasıl bulunur?",
      p: [
        "Elektriksel güç, gerilim ile akımın çarpımıdır: P = V × I. Ohm kanunundaki V = I × R ifadesi yerine konduğunda gücün iki farklı biçimi daha elde edilir. Elinizde hangi iki büyüklük varsa ona uygun formülü seçersiniz."
      ],
      formula: "P = V × I\nP = I² × R\nP = V² ÷ R",
      table: {
        head: ["Bilinenler", "Formül", "Örnek", "Sonuç"],
        rows: [
          ["Gerilim ve akım", "P = V × I", "12 V, 3 A", "36 W"],
          ["Akım ve direnç", "P = I² × R", "2 A, 10 Ω", "40 W"],
          ["Gerilim ve direnç", "P = V² ÷ R", "220 V, 1.100 Ω", "44 W"]
        ]
      },
      after: [
        "Örnek: 230 V şebekede 2.300 W'lık bir su ısıtıcı yaklaşık 2.300 ÷ 230 = 10 A akım çeker ve direnci 230 ÷ 10 = 23 Ω'dur. Bir cihazın ne kadar elektrik tüketeceğini görmek için güç ile kullanım süresini çarparak kWh bulunur; ayrıntısı [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası]] yazısında ve [[arac:elektrik-gucu-hesapla|Elektrik Gücü Hesaplama]] aracındadır."
      ]
    },
    {
      h: "Ohm kanunu her malzemede geçerli mi?",
      p: [
        "Hayır. Ohm kanunu, direnci akım ve gerilimle değişmeyen <strong>ohmik</strong> iletkenler için geçerlidir; sabit sıcaklıktaki metal teller ve sabit dirençler buna örnektir. Bu elemanların gerilim-akım grafiği orijinden geçen bir doğrudur.",
        "Diyot, LED ve transistör gibi yarı iletken elemanlar <strong>ohmik olmayan</strong> elemanlardır: belirli bir gerilime kadar neredeyse hiç akım geçirmezler, sonra akım hızla artar. Akkor ampulün teli de ısındıkça direnci arttığı için grafiği doğru değil eğridir. Bu elemanlarda V ÷ I oranı her noktada farklıdır; yine de herhangi bir anda V, I ve R arasındaki ilişki hesaplanabilir ama R sabit değildir.",
        "İletkenin direnci de malzemeye, uzunluğa ve kesit alanına bağlıdır: R = ρ × L ÷ A. Tel uzadıkça direnç artar, kalınlaştıkça azalır. Bu yüzden yüksek akım çeken cihazlarda kalın kablo kullanılır."
      ]
    },
    {
      h: "Günlük hayatta Ohm kanunu",
      p: [
        "Ohm kanunu yalnızca ders kitabında kalmaz; evdeki elektrik tesisatından hobi elektroniğine kadar birçok kararın arkasında bu basit bağıntı vardır. Aşağıdaki örnekler, formülün pratikte nasıl kullanıldığını gösterir."
      ],
      ul: [
        "<strong>LED için direnç seçimi:</strong> 5 V'luk bir kaynakla, ileri yönde yaklaşık 2 V düşüren bir LED'i 20 mA ile çalıştırmak istiyorsanız dirençte kalan gerilim 5 − 2 = 3 V'tur. R = 3 ÷ 0,02 = 150 Ω gerekir. Direnç olmadan LED'den kontrolsüz akım geçer ve LED bozulabilir.",
        "<strong>Sigorta ve priz yükü:</strong> 230 V hatta 16 A'lik bir sigorta, en fazla yaklaşık 230 × 16 = 3.680 W yüke dayanır. Aynı hatta 2.000 W'lık ısıtıcı ve 2.300 W'lık su ısıtıcı birlikte çalışırsa toplam akım 18,7 A olur ve sigorta atar.",
        "<strong>Uzatma kablosunun ısınması:</strong> İnce bir kablonun direnci daha yüksektir; kablodaki ısı kaybı I² × R ile arttığı için yüksek akım çeken cihazlar ince kabloyu ısıtır.",
        "<strong>Pil ve şarj:</strong> Telefon şarj cihazlarındaki watt değeri, gerilim ile akımın çarpımıdır: 9 V ve 2 A, 18 W demektir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Birimleri çevirmemek:</strong> kΩ ve mA ile doğrudan işlem yapmak 1.000 kat hataya yol açar; önce Ω ve A'ya çevirin.",
        "<strong>Seri ve paraleli karıştırmak:</strong> Paralel dirençler toplanmaz; eşdeğer direnç en küçük dirençten de küçüktür.",
        "<strong>Gücü P = V × R sanmak:</strong> Doğrusu P = V × I ya da P = V² ÷ R'dir.",
        "<strong>Ampermetreyi paralel bağlamak:</strong> Ampermetre devreye seri, voltmetre paralel bağlanır.",
        "<strong>Her elemana Ohm kanunu uygulamak:</strong> Diyot ve LED'de direnç sabit değildir; LED'lere akım sınırlayıcı direnç bu yüzden eklenir."
      ]
    }
  ],
  faq: [
    ["Ohm kanunu nedir?", "Ohm kanunu, bir iletkenin uçları arasındaki gerilimin, içinden geçen akım ile direncinin çarpımına eşit olduğunu belirten temel elektrik yasasıdır. Direnç sabitken akım ile gerilim doğru orantılıdır."],
    ["Ohm kanunu formülü nedir?", "Formül V = I × R'dir; gerilim volt, akım amper, direnç ohm cinsindendir. Aynı bağıntıdan akım I = V ÷ R, direnç ise R = V ÷ I olarak bulunur."],
    ["Akım, gerilim ve direnç arasındaki ilişki nedir?", "Direnç sabitken gerilim arttıkça akım aynı oranda artar. Gerilim sabitken direnç arttıkça akım aynı oranda azalır. Yani akım gerilimle doğru, dirençle ters orantılıdır."],
    ["Direncin birimi nedir?", "Direncin birimi ohm'dur ve Ω sembolüyle gösterilir. Bir ohm, uçları arasında 1 voltluk gerilim olduğunda içinden 1 amper akım geçen iletkenin direncidir; kiloohm ve megaohm katlarıdır."],
    ["Ohm kanunu her malzemede geçerli mi?", "Hayır. Kanun sabit sıcaklıktaki metal iletkenler gibi ohmik elemanlarda geçerlidir. Diyot, LED, transistör ve ısındıkça direnci değişen ampul teli gibi elemanlarda gerilim-akım ilişkisi doğrusal değildir."],
    ["Gerilim artarsa akım nasıl değişir?", "Direnç değişmiyorsa gerilim kaç katına çıkarsa akım da o kadar katına çıkar. Örneğin 6 voltta 1,5 amper geçen dirençten 18 voltta 4,5 amper akım geçer."],
    ["Ohm üçgeni nasıl kullanılır?", "Üçgenin tepesine V, altına I ve R yazılır. Bulmak istediğiniz büyüklüğü kapatırsınız; yan yana kalanlar çarpılır, üst üste kalanlar bölünür. Böylece üç formül tek şekilde hatırlanır."],
    ["Elektriksel güç Ohm kanunuyla nasıl bulunur?", "Güç P = V × I ile bulunur. Ohm kanunu yerine konduğunda P = I² × R ve P = V² ÷ R biçimleri elde edilir; elinizdeki iki büyüklüğe uygun olan formülü kullanırsınız."]
  ],
  tools: ["ohm-kanunu-hesapla", "seri-direnc-hesapla", "paralel-direnc-hesapla", "elektrik-gucu-hesapla"],
  related: ["direnc-renk-kodlari-nasil-okunur", "elektrik-faturasi-nasil-hesaplanir", "kva-kw-farki-jenerator-secimi"],
  sources: [
    ["Millî Eğitim Bakanlığı – Fizik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["BIPM – SI birimleri (amper, volt, ohm)", "https://www.bipm.org/en/measurement-units"]
  ]
};
