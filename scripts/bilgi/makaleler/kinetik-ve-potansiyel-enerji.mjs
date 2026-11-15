export default {
  slug: "kinetik-ve-potansiyel-enerji",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Kinetik ve Potansiyel Enerji Nedir? Formüller, Enerji Dönüşümü ve Örnekler",
  pageTitle: "Kinetik ve Potansiyel Enerji: Formüller ve Çözümlü Örnekler",
  description: "Kinetik enerji Ek = ½·m·v², çekim potansiyel enerjisi Ep = m·g·h, esneklik enerjisi ½·k·x². Enerji korunumu, iş-enerji ilişkisi ve çözümlü örnekler.",
  keywords: ["kinetik enerji nedir", "potansiyel enerji nedir", "kinetik enerji formülü", "potansiyel enerji formülü", "enerji dönüşümü", "mekanik enerji korunumu", "esneklik potansiyel enerjisi", "iş enerji ilişkisi"],
  lead: "Kinetik enerji, <strong>bir cismin hareketinden dolayı sahip olduğu enerjidir ve Ek = ½ · m · v² formülüyle</strong> hesaplanır; potansiyel enerji ise cismin konumundan ya da şeklinden dolayı depoladığı enerjidir ve yerden yükseklik için Ep = m · g · h ile bulunur. Her ikisinin birimi joule'dür (J). 2 kg'lık bir top 20 m yükseklikte 400 J potansiyel enerjiye sahiptir (g = 10 m/s²); düşerken bu enerji kinetik enerjiye dönüşür. Bu yazıda formülleri, enerji korunumunu, esneklik enerjisini, iş ile ilişkiyi ve 7. sınıf, 9. sınıf ve TYT düzeyinde çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Kinetik enerji: Ek = ½ · m · v² (m: kg, v: m/s, Ek: J).",
    "Çekim potansiyel enerjisi: Ep = m · g · h (g ≈ 9,8 m/s²; ders sorularında çoğunlukla 10 m/s² alınır).",
    "Esneklik potansiyel enerjisi: Ep = ½ · k · x² (k: yay sabiti N/m, x: uzama ya da sıkışma m).",
    "Hız iki katına çıkarsa kinetik enerji dört katına çıkar; kütle iki katına çıkarsa iki katına çıkar.",
    "Sürtünmesiz ortamda mekanik enerji (Ek + Ep) korunur; biri azalırken diğeri aynı miktarda artar.",
    "İş-enerji teoremi: bir cisme yapılan net iş, kinetik enerjisindeki değişime eşittir (W = ΔEk)."
  ],
  figure: {
    alt: "20 metreden serbest bırakılan 2 kilogramlık topun 20, 15, 10, 5 ve 0 metre yüksekliklerde potansiyel ve kinetik enerjileri; toplam her noktada 400 joule.",
    caption: "Sürtünme ihmal edildiğinde top düştükçe potansiyel enerji (bordo) azalır, kinetik enerji (yeşil) aynı miktarda artar; toplam mekanik enerji her yükseklikte 400 J'dür. Yere çarptığı anda tüm enerji kinetiktir ve hız 20 m/s olur (g = 10 m/s²).",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Düşen topta enerji dönüşümü (m = 2 kg)</text>
  <line x1="120" y1="360" x2="120" y2="60" class="st" fill="none"/>
  <line x1="60" y1="360" x2="680" y2="360" class="st sw" fill="none"/>
  <circle cx="120" cy="60" r="12" class="p"/>
  <line x1="120" y1="78" x2="120" y2="340" class="sp dash" fill="none"/>
  <g class="sm end">
    <text x="96" y="64">20 m</text><text x="96" y="139">15 m</text><text x="96" y="214">10 m</text><text x="96" y="289">5 m</text><text x="96" y="364">0 m</text>
  </g>
  <rect x="160" y="48" width="400" height="24" class="p"/>
  <rect x="160" y="123" width="300" height="24" class="p"/><rect x="460" y="123" width="100" height="24" class="ok"/>
  <rect x="160" y="198" width="200" height="24" class="p"/><rect x="360" y="198" width="200" height="24" class="ok"/>
  <rect x="160" y="273" width="100" height="24" class="p"/><rect x="260" y="273" width="300" height="24" class="ok"/>
  <rect x="160" y="336" width="400" height="20" class="ok"/>
  <g class="sm">
    <text x="572" y="65">Ep 400 · Ek 0</text>
    <text x="572" y="140">Ep 300 · Ek 100</text>
    <text x="572" y="215">Ep 200 · Ek 200</text>
    <text x="572" y="290">Ep 100 · Ek 300</text>
    <text x="572" y="351">Ep 0 · Ek 400</text>
  </g>
  <g class="sm t2">
    <text x="572" y="155">v ≈ 10 m/s</text><text x="572" y="230">v ≈ 14,1 m/s</text><text x="572" y="305">v ≈ 17,3 m/s</text>
  </g>
  <rect x="160" y="382" width="16" height="14" class="p"/><text x="184" y="394" class="sm">Potansiyel enerji (J)</text>
  <rect x="360" y="382" width="16" height="14" class="ok"/><text x="384" y="394" class="sm">Kinetik enerji (J) · toplam her yerde 400 J</text>
</svg>`
  },
  sections: [
    {
      h: "Enerji nedir? Kinetik ve potansiyel enerji farkı",
      p: [
        "Fizikte enerji, iş yapabilme yeteneğidir ve birimi <strong>joule (J)</strong>'dür. Bir joule, 1 newtonluk kuvvetin bir cismi kuvvet yönünde 1 metre hareket ettirirken yaptığı iştir. Mekanik enerjinin iki temel biçimi vardır: hareketle ilgili kinetik enerji ve konumla ya da şekille ilgili potansiyel enerji.",
        "<strong>Kinetik enerji</strong>, hareket eden her cisimde bulunur: yuvarlanan top, akan su, hareket eden araba. Duran bir cismin kinetik enerjisi sıfırdır. <strong>Potansiyel enerji</strong> ise depolanmış enerjidir: yüksekte duran bir kitap düşebileceği için çekim potansiyel enerjisine, gerilmiş bir lastik ya da sıkıştırılmış bir yay eski haline dönebileceği için esneklik potansiyel enerjisine sahiptir.",
        "İki enerji türü sürekli birbirine dönüşür. Salıncakta en yüksek noktada hız sıfıra yaklaşır ve enerji çoğunlukla potansiyeldir; en alt noktada hız en büyüktür ve enerji çoğunlukla kinetiktir. Bu dönüşüm, enerji korunumu ilkesinin en bilinen örneğidir."
      ]
    },
    {
      h: "Kinetik enerji formülü",
      formula: "Ek = ½ · m · v²\nm: kütle (kg) · v: sürat (m/s) · Ek: joule (J)",
      p: [
        "Formüldeki hızın karesi önemli bir sonuç doğurur: <strong>hız iki katına çıkarsa kinetik enerji dört katına</strong>, üç katına çıkarsa dokuz katına çıkar. Kütle ise doğrusal etkilidir; kütle iki katına çıkarsa enerji de iki katına çıkar. Trafikte hızın küçük artışlarının bile çarpışma etkisini çok büyütmesinin nedeni budur.",
        "Hız km/sa verilmişse önce m/s'ye çevirin: km/sa değerini 3,6'ya bölün. 72 km/sa = 20 m/s, 90 km/sa = 25 m/s, 108 km/sa = 30 m/s'dir. Formülü ters kullanarak hız da bulunabilir: v = √(2 · Ek ÷ m). Bu hesaplar için [[arac:kinetik-enerji-hesapla|Kinetik Enerji Hesaplama]] aracı hızı m/s ya da km/sa olarak kabul eder."
      ],
      table: {
        head: ["Cisim", "Kütle", "Hız", "Kinetik enerji"],
        rows: [
          ["Yürüyen bir insan", "70 kg", "1,5 m/s", "78,75 J"],
          ["Atılan bir futbol topu", "0,45 kg", "20 m/s", "90 J"],
          ["Bisikletli", "80 kg", "6 m/s", "1.440 J"],
          ["72 km/sa giden otomobil", "1.000 kg", "20 m/s", "200.000 J"],
          ["Aynı otomobil, 108 km/sa", "1.000 kg", "30 m/s", "450.000 J"]
        ],
        caption: "Otomobilin hızı 1,5 katına çıktığında kinetik enerjisi 2,25 katına çıkar."
      }
    },
    {
      h: "Çekim potansiyel enerjisi nasıl hesaplanır?",
      formula: "Ep = m · g · h\nm: kütle (kg) · g: yer çekimi ivmesi (m/s²) · h: yükseklik (m)",
      p: [
        "Yer çekimi ivmesi Dünya yüzeyinde yaklaşık 9,8 m/s²'dir; ortaokul ve lise sorularında işlem kolaylığı için çoğunlukla 10 m/s² alınır. Sorunun hangi değeri istediğine dikkat edin. Yükseklik, seçilen bir <strong>referans seviyesine</strong> göre ölçülür; genellikle yer seviyesi sıfır kabul edilir. Referans değişirse potansiyel enerjinin değeri değişir, ama iki nokta arasındaki enerji farkı değişmez.",
        "Örnek: 5 kg'lık bir saksı 3. kattaki balkonda, yerden 9 m yüksekte duruyor. g = 10 m/s² alındığında Ep = 5 × 10 × 9 = <strong>450 J</strong>'dür. Aynı saksı 2 m yükseklikteki bir rafta olsaydı 100 J'lük potansiyel enerjiye sahip olurdu. Hesabı [[arac:potansiyel-enerji-hesapla|Potansiyel Enerji Hesaplama]] aracıyla g değerini seçerek yapabilirsiniz."
      ]
    },
    {
      h: "Esneklik potansiyel enerjisi nedir?",
      p: [
        "Yay, lastik ya da tramplen gibi esnek cisimler gerildiğinde veya sıkıştırıldığında enerji depolar. Hooke yasasına göre yayın uyguladığı kuvvet F = k · x'tir; burada k yay sabiti (N/m), x uzama ya da sıkışma miktarıdır (m). Depolanan enerji ise kuvvet-uzama grafiğinin altındaki üçgenin alanına eşittir."
      ],
      formula: "Esneklik potansiyel enerjisi = ½ · k · x²\nÖrnek: k = 200 N/m, x = 0,1 m → ½ × 200 × 0,01 = 1 J",
      after: [
        "Burada da kare etkisi vardır: yayı iki kat fazla sıkıştırmak dört kat enerji depolar. Okçunun yayı, oyuncak tabancalardaki yaylar ve araçların amortisörleri bu enerjiyi kullanır. Yay sabitini ve uzamayı hesaplamak için [[arac:yay-sabiti-hesapla|Yay Sabiti Hesaplama]] aracı esneklik enerjisini de gösterir."
      ]
    },
    {
      h: "Enerji korunumu ve çözümlü örnek",
      p: [
        "Enerjinin korunumu ilkesine göre enerji yoktan var edilemez, var olan enerji yok edilemez; yalnızca bir türden diğerine dönüşür. Sürtünme ve hava direnci ihmal edildiğinde bir cismin kinetik ve potansiyel enerjilerinin toplamı, yani <strong>mekanik enerjisi</strong> sabit kalır."
      ],
      formula: "Mekanik enerji = Ek + Ep = sabit\nEk₁ + Ep₁ = Ek₂ + Ep₂\nSerbest düşmede yere çarpma hızı: v = √(2 · g · h)",
      ol: [
        "2 kg'lık bir top 20 m yükseklikten serbest bırakılıyor (g = 10 m/s²). Başlangıçta Ep = 2 × 10 × 20 = 400 J, Ek = 0.",
        "10 m yükseklikte: Ep = 2 × 10 × 10 = 200 J. Korunumdan Ek = 400 − 200 = 200 J. Hız: 200 = ½ × 2 × v² → v² = 200 → v ≈ 14,1 m/s.",
        "5 m yükseklikte: Ep = 100 J, Ek = 300 J, v = √300 ≈ 17,3 m/s.",
        "Yere çarpma anında: Ep = 0, Ek = 400 J. v = √(2 × 10 × 20) = √400 = 20 m/s.",
        "Dikkat: yere çarpma hızı kütleye bağlı değildir; 2 kg ya da 20 kg'lık top aynı hızla düşer, ama ağır topun enerjisi daha büyüktür."
      ],
      after: [
        "Gerçek hayatta hava direnci ve sürtünme enerjinin bir kısmını ısıya dönüştürür. Bu enerji yok olmaz; ama mekanik enerji olarak geri kazanılamaz. Bu nedenle zıplayan bir top her seferinde biraz daha alçağa sıçrar."
      ]
    },
    {
      h: "İş ile enerji arasındaki ilişki",
      p: [
        "İş, bir kuvvetin cismi kuvvet doğrultusunda hareket ettirmesidir: W = F · d · cos θ. Enerji ise iş yapabilme yeteneği olduğu için iki kavram aynı birimle (joule) ölçülür. <strong>İş-enerji teoremine</strong> göre bir cisme etki eden net kuvvetin yaptığı iş, cismin kinetik enerjisindeki değişime eşittir: W_net = Ek_son − Ek_ilk.",
        "Örnek: 1.000 kg'lık bir otomobil 20 m/s hızla giderken fren yapıp duruyor. Kinetik enerji 200.000 J'den 0'a iner; yani frenlerin yaptığı iş −200.000 J'dür. Fren kuvveti 8.000 N ise duruş mesafesi 200.000 ÷ 8.000 = <strong>25 m</strong> olur. Hız 30 m/s olsaydı enerji 450.000 J, duruş mesafesi 56,25 m olurdu; hız 1,5 katına çıkınca fren mesafesi 2,25 katına çıkar.",
        "Benzer şekilde bir cismi sabit hızla h kadar yukarı kaldırmak için yapılan iş, kazandırılan potansiyel enerjiye eşittir: W = m · g · h. Kuvvet ve yol verilen sorular için [[arac:is-hesapla|İş Hesaplama]] aracını kullanabilirsiniz. Kuvvetin yönü ve kütle-ağırlık ayrımı için [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] ile [[bilgi:basit-makineler-kaldirac-makara|basit makineler]] yazıları yardımcı olur."
      ]
    },
    {
      h: "Günlük hayatta enerji dönüşümleri",
      ul: [
        "<strong>Hidroelektrik santral:</strong> Barajda biriken suyun potansiyel enerjisi, akarken kinetik enerjiye, türbinde de elektrik enerjisine dönüşür.",
        "<strong>Lunapark treni:</strong> İlk tepeye çekilirken potansiyel enerji kazanır; sonraki inişlerde bu enerji hıza dönüşür, tepeler bu yüzden giderek alçalır.",
        "<strong>Sırıkla atlama:</strong> Koşucunun kinetik enerjisi sırığın esneklik enerjisine, oradan da yükseklik kazanılarak potansiyel enerjiye dönüşür.",
        "<strong>Saat yayı ve kurmalı oyuncak:</strong> Kurarken yayda depolanan esneklik enerjisi yavaş yavaş harekete dönüşür.",
        "<strong>Fren yapan araç:</strong> Kinetik enerji balatalarda ısıya dönüşür; elektrikli araçlarda bir kısmı rejeneratif frenle bataryaya geri kazanılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Hızın karesini almamak:</strong> Ek = ½ · m · v²; v'yi kare almadan çarpmak sonucu tamamen bozar.",
        "<strong>½ çarpanını unutmak:</strong> m · v² değeri kinetik enerjinin iki katıdır.",
        "<strong>km/sa ile hesap yapmak:</strong> Hızı önce 3,6'ya bölerek m/s'ye çevirin.",
        "<strong>Gram kullanmak:</strong> Kütle kilogram olmalıdır; 500 g = 0,5 kg.",
        "<strong>g değerini karıştırmak:</strong> Soru 10 m/s² diyorsa 9,8 kullanmayın; şıklar bu değere göre hazırlanır.",
        "<strong>Düşme hızının kütleye bağlı olduğunu sanmak:</strong> Sürtünmesiz ortamda tüm cisimler aynı yükseklikten aynı hızla yere ulaşır."
      ]
    }
  ],
  faq: [
    ["Kinetik enerji nedir?", "Kinetik enerji, bir cismin hareketinden dolayı sahip olduğu enerjidir. Kütle ve hızın karesiyle orantılıdır, birimi joule'dür. Duran bir cismin kinetik enerjisi sıfırdır, hızlandıkça enerjisi hızın karesiyle artar."],
    ["Potansiyel enerji nedir?", "Potansiyel enerji, bir cismin konumu ya da şekli nedeniyle depoladığı enerjidir. Yüksekte duran cisimlerde çekim potansiyel enerjisi, gerilmiş yay veya lastiklerde ise esneklik potansiyel enerjisi olarak bulunur."],
    ["Kinetik enerji formülü nedir?", "Kinetik enerji Ek = ½ · m · v² formülüyle hesaplanır. Kütle kilogram, hız metre bölü saniye cinsinden yazılırsa sonuç joule olarak bulunur; 2 kg ve 3 m/s için enerji 9 J'dür."],
    ["Çekim potansiyel enerjisi nasıl hesaplanır?", "Kütle, yer çekimi ivmesi ve yükseklik çarpılır: Ep = m · g · h. Yer çekimi ivmesi yaklaşık 9,8 m/s² olup ders sorularında çoğunlukla 10 m/s² alınır; 5 kg ve 9 m için sonuç 450 J'dür."],
    ["Esneklik potansiyel enerjisi nedir?", "Gerilen ya da sıkıştırılan esnek cisimlerde depolanan enerjidir ve ½ · k · x² ile hesaplanır. Yay sabiti 200 N/m olan bir yay 10 cm sıkıştırıldığında 1 joule enerji depolar."],
    ["Enerji korunumu nedir?", "Enerji yoktan var edilemez ve yok edilemez, yalnızca bir türden diğerine dönüşür. Sürtünme ihmal edildiğinde kinetik ve potansiyel enerjinin toplamı olan mekanik enerji hareket boyunca sabit kalır."],
    ["Hız iki katına çıkarsa kinetik enerji nasıl değişir?", "Kinetik enerji hızın karesiyle orantılı olduğu için hız iki katına çıkınca enerji dört katına çıkar. Bu yüzden 60 km/sa yerine 120 km/sa ile giden bir aracın çarpışma enerjisi dört kat büyüktür."],
    ["Yüksekten bırakılan cismin yere çarpma hızı nasıl bulunur?", "Sürtünme ihmal edilirse potansiyel enerjinin tamamı kinetik enerjiye dönüşür ve hız v = √(2 · g · h) ile bulunur. 20 metreden bırakılan bir cisim, g = 10 m/s² alındığında yere 20 m/s hızla çarpar; sonuç kütleye bağlı değildir."],
    ["Joule ile kalori arasındaki ilişki nedir?", "İkisi de enerji birimidir; 1 kalori yaklaşık 4,184 joule'e eşittir. Besinlerin enerji değeri genellikle kilokalori ile verilir ve 1 kilokalori yaklaşık 4.184 joule eder."],
    ["İş ile enerji arasındaki ilişki nedir?", "İş ve enerji aynı birimle ölçülür. İş-enerji teoremine göre bir cisme yapılan net iş, kinetik enerjisindeki değişime eşittir; bir cismi yukarı kaldırmak için yapılan iş de kazandığı potansiyel enerjiye eşittir."]
  ],
  tools: ["kinetik-enerji-hesapla", "potansiyel-enerji-hesapla", "is-hesapla", "yay-sabiti-hesapla"],
  related: ["kutle-ve-agirlik-farki", "basit-makineler-kaldirac-makara", "basinc-nedir-nasil-hesaplanir"],
  sources: [
    ["Millî Eğitim Bakanlığı – Fen bilimleri ve fizik öğretim programları", "https://www.meb.gov.tr/"],
    ["BIPM – SI birimleri (joule)", "https://www.bipm.org/en/measurement-units"]
  ]
};
