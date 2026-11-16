export default {
  slug: "motor-hacmi-cc-nedir-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Motor Hacmi (cc) Nedir, Nasıl Hesaplanır? 1.6 Motor Ne Anlama Gelir",
  pageTitle: "Motor Hacmi (cc) Nedir, Nasıl Hesaplanır? 1.6 Motor Kaç cc",
  description: "Motor hacmi, tüm silindirlerdeki pistonların süpürdüğü toplam hacimdir: π ÷ 4 × çap² × strok × silindir sayısı. 1.6 motor ≈ 1.598 cc; çap, strok, MTV ve turbo etkisi.",
  keywords: ["motor hacmi nedir", "motor hacmi nasıl hesaplanır", "silindir hacmi formülü", "1.6 motor kaç cc", "cc ne demek", "motor hacmi mtv ilişkisi", "1400 cc kaç litre", "çap strok nedir"],
  lead: "Motor hacmi, pistonların silindir içinde alt ve üst ölü nokta arasında hareket ederken <strong>süpürdüğü toplam hacimdir</strong> ve santimetreküp (cc) ya da litre ile ifade edilir. Hesabı tek formüldür: <strong>hacim = π ÷ 4 × çap² × strok × silindir sayısı</strong>. 1 cc tam olarak 1 mililitre olduğu için 1.598 cc'lik bir motor 1,6 litre, yani \"1.6 motor\" diye anılır. Bu sayfada çap ve stroku, adım adım hesaplamayı, sıkıştırma oranını, motor hacminin güç ve MTV ile ilişkisini ve turbonun etkisini bulacaksınız.",
  kisaCevap: [
    "Motor hacmi (silindir hacmi) = π ÷ 4 × çap² × strok × silindir sayısı; çap ve strok cm ile girilirse sonuç cc çıkar.",
    "1 cc = 1 cm³ = 1 mililitre; 1.000 cc = 1 litre, dolayısıyla 1.400 cc = 1,4 litre.",
    "\"1.6 motor\" genellikle 1.580–1.600 cc arasındaki motorları anlatır; örneğin 79 mm çap, 81,5 mm strok ve 4 silindirle 1.598 cc elde edilir.",
    "Çap silindirin iç çapı, strok pistonun alt ve üst ölü nokta arasındaki yoludur.",
    "Motorlu taşıtlar vergisinde otomobiller 1.300, 1.600, 1.800, 2.000 cc gibi motor hacmi dilimlerine ayrılır.",
    "Turbo, silindire daha fazla hava bastığı için küçük hacimli motorun büyük atmosferik motor kadar güç üretmesini sağlar."
  ],
  figure: {
    alt: "Silindir kesiti: silindir çapı D, pistonun üst ölü nokta ile alt ölü nokta arasındaki yolu strok S olarak gösteriliyor; arada süpürülen hacim taralı, üstte yanma odası hacmi. Yanda 79 mm çap ve 81,5 mm strokla dört silindirli motor için 1.598 cc hesabı.",
    caption: "Piston üst ölü noktadan alt ölü noktaya inerken çapı D olan silindirde S kadar yol alır; taralı bölge süpürme hacmidir. Yanma odası hacmi motor hacmine katılmaz ama sıkıştırma oranını belirler.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Silindir hacmi nereden gelir?</text>
  <rect x="90" y="70" width="200" height="290" class="sf sb"/>
  <line x1="90" y1="70" x2="90" y2="360" class="st sw" fill="none"/>
  <line x1="290" y1="70" x2="290" y2="360" class="st sw" fill="none"/>
  <rect x="92" y="72" width="196" height="36" class="dgs"/>
  <text x="190" y="95" class="sm mid b">yanma odası</text>
  <rect x="92" y="108" width="196" height="190" class="ps"/>
  <text x="190" y="196" class="mid b">süpürme hacmi</text>
  <text x="190" y="218" class="sm mid">tek silindir: 399,5 cc</text>
  <rect x="94" y="298" width="192" height="46" rx="4" class="p"/>
  <text x="190" y="326" class="sm mid b sf">piston (alt ölü nokta)</text>
  <line x1="190" y1="344" x2="190" y2="400" class="st sw" fill="none"/>
  <line x1="60" y1="108" x2="320" y2="108" class="sp dash" fill="none"/>
  <line x1="60" y1="298" x2="320" y2="298" class="sp dash" fill="none"/>
  <text x="330" y="112" class="sm p">ÜÖN</text>
  <text x="330" y="302" class="sm p">AÖN</text>
  <line x1="60" y1="112" x2="60" y2="294" class="sa sw" fill="none"/>
  <polygon points="54,120 60,108 66,120" class="a"/><polygon points="54,286 60,298 66,286" class="a"/>
  <text x="48" y="208" class="b end">S</text>
  <line x1="94" y1="384" x2="286" y2="384" class="sa sw" fill="none"/>
  <polygon points="102,378 90,384 102,390" class="a"/><polygon points="278,378 290,384 278,390" class="a"/>
  <text x="190" y="416" class="b mid">D (çap)</text>
  <rect x="390" y="70" width="310" height="290" rx="10" class="sf sb"/>
  <rect x="390" y="70" width="8" height="290" class="p"/>
  <text x="414" y="100" class="b">Örnek: 4 silindirli \"1.6\" motor</text>
  <text x="414" y="132" class="sm">Çap D = 79 mm = 7,9 cm</text>
  <text x="414" y="156" class="sm">Strok S = 81,5 mm = 8,15 cm</text>
  <text x="414" y="188" class="sm">Tek silindir = 0,7854 × 7,9² × 8,15</text>
  <text x="414" y="210" class="sm">= 0,7854 × 62,41 × 8,15 = 399,5 cc</text>
  <text x="414" y="242" class="sm">Toplam = 399,5 × 4</text>
  <text x="414" y="276" class="xl p">1.598 cc</text>
  <text x="414" y="302" class="sm t2">≈ 1,6 litre · ruhsatta \"1598\"</text>
  <text x="414" y="338" class="sm mu">π ÷ 4 = 0,7854</text>
</svg>`
  },
  sections: [
    {
      h: "Motor hacmi (cc) nedir?",
      p: [
        "İçten yanmalı bir motorda her silindirin içinde bir piston aşağı yukarı hareket eder. Pistonun çıkabildiği en üst noktaya <strong>üst ölü nokta (ÜÖN)</strong>, inebildiği en alt noktaya <strong>alt ölü nokta (AÖN)</strong> denir. Piston bu iki nokta arasında hareket ederken bir hacmi \"süpürür\"; bu hacim tek bir silindirin hacmidir. Motordaki tüm silindirlerin süpürme hacimlerinin toplamı <strong>motor hacmi</strong> ya da silindir hacmidir.",
        "Motor hacmi, bir çevrimde motorun ne kadar hava–yakıt karışımı alabileceğinin ölçüsüdür. Kısaltmadaki <strong>cc</strong>, İngilizce \"cubic centimetre\", yani santimetreküp demektir. Ruhsatta \"silindir hacmi: 1598 cm³\" gibi yazılır; ilanlarda ve günlük dilde ise litreye yuvarlanmış hâli (1.6) kullanılır. Motosikletlerde 125 cc, 250 cc gibi değerlerin geçmesi de aynı ölçüdür."
      ]
    },
    {
      h: "1 cc kaç mililitredir?",
      p: [
        "1 cc tam olarak 1 santimetreküp, 1 santimetreküp de tam olarak 1 mililitredir. Yani <strong>1 cc = 1 ml</strong> ve 1.000 cc = 1 litredir. Bu eşitlik yalnızca motorlarda değil, enjektör ölçülerinde ve tıbbi dozlarda da kullanılır; enjektördeki \"5 cc\" ile \"5 ml\" aynı miktardır.",
        "Bu yüzden motor hacmini litreye çevirmek için cc değerini 1.000'e bölmeniz yeterlidir: 1.400 cc = 1,4 litre, 1.248 cc = 1,248 litre (\"1.2\"), 2.993 cc = 2,993 litre (\"3.0\"). Çeviri için [[arac:cc-ml-cevir|cc Mililitre Çevirici]] litre karşılığını da birlikte gösterir; hacim birimleri arasındaki genel ilişki için [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Çap ve strok nedir?",
      p: [
        "<strong>Çap</strong> (bore), silindirin iç çapıdır ve pistonun yüzey alanını belirler. <strong>Strok</strong> (stroke), pistonun ÜÖN ile AÖN arasında aldığı yoldur ve krank milinin kol uzunluğunun iki katına eşittir. Teknik kataloglarda bu ikisi genellikle \"79,0 × 81,5 mm\" biçiminde, önce çap sonra strok olarak verilir.",
        "Çap ile strokun oranı motorun karakterini etkiler. Çapı stroktan büyük olan <strong>kısa stroklu</strong> motorlar yüksek devirlere kolay çıkar; büyük piston yüzeyi büyük supaplara yer açar. Stroku çaptan uzun olan <strong>uzun stroklu</strong> motorlar düşük devirde daha fazla tork üretir; dizel motorların çoğu bu yapıdadır. Çap ve stroku eşit olan motorlara <strong>kare motor</strong> denir."
      ],
      table: {
        head: ["Tip", "Koşul", "Karakter"],
        rows: [
          ["Kısa stroklu", "Çap > strok", "Yüksek devir, canlı tepki, yüksek güç"],
          ["Kare", "Çap = strok", "Dengeli; örnek 86 × 86 mm, 4 silindir = 1.998 cc"],
          ["Uzun stroklu", "Strok > çap", "Düşük devirde yüksek tork, yakıt verimi"]
        ]
      }
    },
    {
      h: "Silindir hacmi nasıl hesaplanır? Formül ve çözümlü örnekler",
      p: [
        "Silindirin hacmi, taban alanı ile yüksekliğinin çarpımıdır. Taban bir dairedir ve alanı π × (çap ÷ 2)² = π ÷ 4 × çap² formülüyle bulunur; yükseklik ise stroktur. Tek silindirin hacmini silindir sayısıyla çarptığınızda motor hacmini elde edersiniz."
      ],
      formula: "Tek silindir hacmi = π ÷ 4 × D² × S\nMotor hacmi = π ÷ 4 × D² × S × silindir sayısı\nD ve S cm ise sonuç cm³ (cc); mm ise sonucu 1.000'e bölün",
      ol: [
        "<strong>1.6 motor:</strong> D = 79 mm = 7,9 cm, S = 81,5 mm = 8,15 cm, 4 silindir. Tek silindir = 0,7854 × 62,41 × 8,15 = 399,5 cc. Toplam = 399,5 × 4 = 1.597,9 ≈ 1.598 cc.",
        "<strong>1.4 motor:</strong> D = 76,5 mm, S = 75,6 mm, 4 silindir. 0,7854 × 7,65² × 7,56 × 4 = 0,7854 × 58,52 × 7,56 × 4 = 1.389,9 cc ≈ 1.390 cc. Bu kısa stroklu bir motordur (strok < çap).",
        "<strong>1.0 üç silindirli motor:</strong> D = 71 mm, S = 84 mm, 3 silindir. 0,7854 × 7,1² × 8,4 × 3 = 997,7 cc. Strok çaptan uzun olduğu için uzun stroklu bir motordur.",
        "<strong>Tek silindirli motosiklet:</strong> D = 54 mm, S = 54,5 mm. 0,7854 × 5,4² × 5,45 = 124,8 cc; ruhsatta 125 cc sınıfına girer."
      ],
      after: [
        "Bu hesapları [[arac:motor-hacmi-hesapla|Motor Hacmi (cc) Hesaplama]] aracıyla yapabilirsiniz: çap, strok ve silindir sayısını milimetre cinsinden girdiğinizde toplam hacmi cc ve litre olarak, silindir başına hacmi ve motor tipini (kısa stroklu, kare, uzun stroklu) gösterir. Hesap geometrik süpürme hacmidir; ruhsattaki değerle bir iki cc fark olması üretim toleransları ve yuvarlamadan kaynaklanır."
      ]
    },
    {
      h: "1.6 motor kaç cc'dir? Yuvarlama nasıl yapılır?",
      p: [
        "Üreticiler motor hacmini pazarlamada genellikle bir ondalık basamağa yuvarlar. 1.598 cc, 1.596 cc ya da 1.587 cc'lik motorların hepsi \"1.6\" diye satılır. Aynı şekilde 1.461 cc'lik bir dizel \"1.5\", 1.968 cc'lik bir dizel \"2.0\" olarak anılır. Bu nedenle ilandaki 1.6 değeri size motorun tam hacmini değil, sınıfını söyler; resmî değer ruhsatta ve teknik belgede yazar."
      ],
      table: {
        head: ["Pazarlama adı", "Tipik gerçek hacim", "Litre"],
        rows: [
          ["1.0", "990–1.000 cc", "0,99–1,00 L"],
          ["1.2", "1.197–1.248 cc", "1,20–1,25 L"],
          ["1.4", "1.364–1.398 cc", "1,36–1,40 L"],
          ["1.5", "1.461–1.499 cc", "1,46–1,50 L"],
          ["1.6", "1.560–1.598 cc", "1,56–1,60 L"],
          ["2.0", "1.968–1.998 cc", "1,97–2,00 L"]
        ],
        caption: "Aralıklar piyasadaki yaygın motorlardan derlenmiş örneklerdir. Vergi dilimi hesabında yuvarlanmış ad değil, ruhsattaki tam cc değeri esas alınır."
      }
    },
    {
      h: "Sıkıştırma oranı ve yanma odası",
      p: [
        "Piston üst ölü noktadayken silindirin üstünde küçük bir hacim kalır: <strong>yanma odası hacmi</strong>. Motor hacmine bu kısım katılmaz, ama motorun verimini belirleyen sıkıştırma oranı bu hacimle hesaplanır. Sıkıştırma oranı, piston aşağıdayken silindirdeki toplam hacmin, piston yukarıdayken kalan hacme oranıdır."
      ],
      formula: "Sıkıştırma oranı = (süpürme hacmi + yanma odası hacmi) ÷ yanma odası hacmi\nÖrnek: (399,5 + 40) ÷ 40 = 10,99 → yaklaşık 11 : 1",
      after: [
        "Benzinli motorlarda sıkıştırma oranı genellikle 10:1 ile 13:1, dizel motorlarda 15:1 ile 20:1 arasındadır. Oran yükseldikçe yakıttan elde edilen verim artar, ancak benzinli motorda vuruntu riski de yükselir. Dizel motorların yüksek torkunun bir nedeni de bu yüksek sıkıştırmadır; ayrıntısı [[bilgi:beygir-gucu-ve-tork-farki|beygir gücü ve tork farkı]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Motor hacmi arttıkça güç artar mı? Turbonun etkisi",
      p: [
        "Diğer her şey eşitse evet: daha büyük hacim, her çevrimde daha fazla hava ve yakıt yakmak, dolayısıyla daha fazla iş demektir. Ancak \"diğer her şey\" nadiren eşittir. Motorun ürettiği güç; silindire ne kadar hava girdiğine, ne kadar hızlı döndüğüne, yakıt sistemine, supap düzenine ve sürtünme kayıplarına bağlıdır.",
        "<strong>Turbo</strong> bu denklemi en çok değiştiren unsurdur. Egzoz gazıyla dönen bir türbin, emme tarafındaki kompresörü çevirir ve silindire atmosfer basıncının üzerinde hava basar. Silindire giren hava kütlesi arttığı için aynı hacimden çok daha fazla güç elde edilir. Bu sayede bugün 1.0 litrelik üç silindirli turbo bir motor, eskinin 1.6 litrelik atmosferik motoruyla benzer güç ve daha yüksek tork verebilir. Bu yaklaşıma \"küçültme\" (downsizing) denir; amaç, düşük yükte küçük motorun sürtünme ve pompalama kayıplarının azlığından yararlanıp yakıt tüketimini düşürmektir.",
        "Dolayısıyla iki aracı karşılaştırırken yalnızca motor hacmine bakmak yanıltıcıdır. Güç (kW ya da PS) ve tork (Nm) değerleri, aracın ağırlığıyla birlikte değerlendirildiğinde çok daha anlamlı bir tablo verir."
      ]
    },
    {
      h: "Motor hacmi MTV'yi ve ÖTV'yi nasıl etkiler?",
      p: [
        "Motorlu taşıtlar vergisinde (MTV) otomobiller motor silindir hacmine göre dilimlere ayrılır: 1.300 cc ve altı, 1.301–1.600 cc, 1.601–1.800 cc, 1.801–2.000 cc, 2.001–2.500 cc, 2.501–3.000 cc, 3.001–3.500 cc, 3.501–4.000 cc ve 4.001 cc üzeri. Vergi tutarı bu dilime ve aracın yaşına göre belirlenir; 2018 ve sonrasında ilk tescili yapılan otomobillerde aracın taşıt değeri de dilimi etkiler. Tutarlar her yıl yeniden değerleme oranıyla güncellendiği için güncel değer için resmî kaynağa bakın.",
        "Pratik sonuç şudur: 1.598 cc'lik bir araç 1.301–1.600 dilimindeyken 1.601 cc'lik bir araç bir üst dilime geçer ve daha fazla vergi öder. Üreticilerin 1.6 motorları 1.600 cc'nin hemen altında tasarlamasının bir nedeni de budur. Yeni araç alımındaki özel tüketim vergisinde de 1.600 cc ve 2.000 cc eşikleri belirleyicidir; mantığı [[bilgi:otv-nedir-arac-otv-nasil-hesaplanir|araç ÖTV'si nasıl hesaplanır]] yazısında bulabilirsiniz. Kendi aracınızın vergisini [[arac:mtv-hesapla|MTV Hesaplama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Birimleri karıştırmak:</strong> Çap ve stroku mm ile girip sonucu doğrudan cc saymak 1.000 kat hata verir; mm ile hesapladıysanız sonucu 1.000'e bölün.",
        "<strong>Yarıçap yerine çap kullanmak:</strong> π × r² formülünde r yarıçaptır; çap kullanılıyorsa formül π ÷ 4 × D² olmalıdır.",
        "<strong>Yanma odasını hacme eklemek:</strong> Motor hacmi yalnızca süpürme hacmidir; yanma odası sıkıştırma oranı hesabına girer.",
        "<strong>Pazarlama adını vergi değeri sanmak:</strong> Vergi dilimi için ruhsattaki tam cc değeri esas alınır.",
        "<strong>Hacmi güçle eşitlemek:</strong> Turbo, devir ve yakıt sistemi gücü hacimden çok daha fazla etkileyebilir; [[arac:beygir-kw-cevir|Beygir Kilovat Çevirici]] ile ruhsattaki kW değerini de karşılaştırın."
      ]
    }
  ],
  faq: [
    ["Motor hacmi (cc) nedir?", "Motor hacmi, tüm silindirlerdeki pistonların üst ve alt ölü nokta arasında hareket ederken süpürdüğü toplam hacimdir. Santimetreküp (cc) ya da litre ile ifade edilir ve motorun bir çevrimde alabileceği hava–yakıt karışımının ölçüsüdür."],
    ["Silindir hacmi nasıl hesaplanır?", "Silindir hacmi π ÷ 4 × çap² × strok formülüyle bulunur ve silindir sayısıyla çarpılarak motor hacmi elde edilir. Çap ve strok santimetre cinsinden girilirse sonuç doğrudan cc çıkar. Örneğin 7,9 cm çap ve 8,15 cm strokla tek silindir 399,5 cc'dir."],
    ["1.6 motor kaç cc'dir?", "1.6 motor, genellikle 1.560 ile 1.598 cc arasındaki motorlara verilen pazarlama adıdır. Örneğin 79 mm çap, 81,5 mm strok ve dört silindirli bir motor 1.598 cc'dir. Kesin değer ruhsatta silindir hacmi olarak yazar."],
    ["Çap ve strok nedir?", "Çap silindirin iç çapıdır ve piston yüzeyini belirler. Strok, pistonun üst ölü nokta ile alt ölü nokta arasında aldığı yoldur. Çap stroktan büyükse motor kısa stroklu, strok çaptan büyükse uzun stroklu, ikisi eşitse kare motor olarak adlandırılır."],
    ["Motor hacmi arttıkça güç artar mı?", "Diğer koşullar eşitse büyük hacim daha fazla güç demektir, ancak güç; devir, hava besleme, yakıt sistemi ve sürtünme kayıplarına da bağlıdır. Turbo beslemeli küçük bir motor, büyük atmosferik bir motordan daha fazla güç ve tork üretebilir."],
    ["Motor hacmi MTV'yi nasıl etkiler?", "Otomobillerde motorlu taşıtlar vergisi motor hacmi dilimlerine ve araç yaşına göre belirlenir: 1.300, 1.600, 1.800, 2.000 cc gibi eşikler vardır. 2018 sonrası tescilli araçlarda taşıt değeri de dilimi etkiler. Güncel tutarlar her yıl yeniden belirlenir."],
    ["1 cc kaç mililitredir?", "1 cc, yani 1 santimetreküp, tam olarak 1 mililitreye eşittir. Bu nedenle 1.000 cc 1 litre eder; 1.400 cc'lik bir motor 1,4 litre olarak ifade edilir. Aynı eşitlik enjektör ve ilaç ölçülerinde de geçerlidir."],
    ["Turbo motorlarda küçük hacim neden yeterli olur?", "Turbo, egzoz gazının enerjisiyle silindire atmosfer basıncının üzerinde hava basar. Silindire giren hava kütlesi arttığı için aynı hacimden daha fazla yakıt yakılabilir ve daha fazla güç elde edilir. Bu sayede küçük motorlar hem güçlü hem de düşük yükte ekonomik olabilir."],
    ["1400 cc kaç litre eder?", "1.400 cc, 1.000'e bölündüğünde 1,4 litre eder. Bu tür motorlar ilanlarda 1.4 olarak geçer. Gerçek hacim genellikle 1.364 ile 1.398 cc arasında olabilir; kesin değer için aracın ruhsatındaki silindir hacmi satırına bakılmalıdır."]
  ],
  tools: ["motor-hacmi-hesapla", "cc-ml-cevir", "mtv-hesapla", "beygir-kw-cevir"],
  related: ["beygir-gucu-ve-tork-farki", "otv-nedir-arac-otv-nasil-hesaplanir", "alan-ve-hacim-formulleri", "araba-yillik-masrafi-ne-kadar"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Motorlu Taşıtlar Vergisi", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 197 sayılı Motorlu Taşıtlar Vergisi Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
