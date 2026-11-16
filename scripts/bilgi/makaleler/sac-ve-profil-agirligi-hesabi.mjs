export default {
  slug: "sac-ve-profil-agirligi-hesabi",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Sac ve Profil Ağırlığı Nasıl Hesaplanır? Kutu Profil, Boru ve Levha Tablosu",
  pageTitle: "Sac ve Profil Ağırlığı Hesabı: Kutu Profil, Boru, Levha",
  description: "Sac ağırlığı = en (m) × boy (m) × kalınlık (mm) × 7,85; 1 m² 2 mm sac 15,7 kg. Kutu profil, boru formülleri, paslanmaz ve alüminyum farkı, mermer ve teklif hesabı.",
  keywords: ["sac ağırlığı hesaplama", "kutu profil ağırlığı", "boru ağırlığı hesaplama", "1 m2 sac kaç kg", "çelik yoğunluğu 7.85", "mermer ağırlığı", "profil metre ağırlığı"],
  lead: "Bir metal parçanın ağırlığı <strong>hacmi ile yoğunluğunun çarpımıdır</strong>; çelik sac için pratik formül <strong>ağırlık (kg) = en (m) × boy (m) × kalınlık (mm) × 7,85</strong>'tir. Bu yüzden 1 m² ve 2 mm kalınlığındaki çelik sac 15,7 kg, 1.000 × 2.000 mm'lik 2 mm levha 31,4 kg gelir. Kutu profil ve borularda önce kesit alanı bulunur, sonra boy ve yoğunlukla çarpılır: 40 × 40 × 2 mm kutu profil metrede yaklaşık 2,39 kg'dır. Bu sayfada formülleri, hazır tabloları, paslanmaz ve alüminyum farkını, mermer plaka hesabını ve teklif hazırlarken ağırlığın fiyata çevrilmesini bulacaksınız.",
  kisaCevap: [
    "Çelik yoğunluğu 7,85 g/cm³ = 7.850 kg/m³ alınır; bu, 1 m² ve 1 mm kalınlıktaki çelik sacın 7,85 kg gelmesi demektir.",
    "Sac: kg = en (m) × boy (m) × kalınlık (mm) × 7,85; 1 m² 2 mm sac = 15,7 kg, 3 mm = 23,55 kg.",
    "Kutu profil: kesit (mm²) = a × b − (a − 2t) × (b − 2t); kg/m = kesit × 7,85 ÷ 1.000.",
    "Boru: kg/m = π × (dış çap − et) × et × 7,85 ÷ 1.000 (ölçüler mm); 48,3 × 3 mm boru = 3,35 kg/m.",
    "Paslanmaz çelik yaklaşık 7,93, alüminyum 2,70, bakır 8,96 g/cm³'tür; aynı ölçüde alüminyum çeliğin yaklaşık üçte biri ağırlığındadır.",
    "Hesaplanan değer teorik ağırlıktır; kalınlık toleransı, köşe yarıçapı ve kaplama nedeniyle kantar değeri birkaç yüzde farklı çıkabilir."
  ],
  figure: {
    alt: "Üç kesit şeması ve formülleri: düz levha için en × boy × kalınlık, kutu profil için dış kare eksi iç kare, boru için π × (D − t) × t. Örnekler: 1 m² 2 mm sac 15,7 kg, 40 × 40 × 2 kutu profil 2,386 kg/m ve 6 metrede 14,32 kg, 48,3 × 3 boru 3,351 kg/m.",
    caption: "Ağırlık hesabının üç temel kalıbı. Hepsinde mantık aynıdır: kesit alanı × uzunluk = hacim, hacim × yoğunluk = ağırlık. Örnekler çelik (7,85 g/cm³) için hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kesit × uzunluk × yoğunluk = ağırlık</text>
  <rect x="20" y="50" width="220" height="350" rx="10" class="sf sb"/>
  <text x="130" y="78" class="b mid">Düz sac (levha)</text>
  <polygon points="50,160 170,120 210,140 90,180" class="ps"/>
  <polygon points="90,180 210,140 210,150 90,190" class="p"/>
  <polygon points="50,160 90,180 90,190 50,170" class="p"/>
  <text x="130" y="220" class="sm mid">kalınlık t = 2 mm</text>
  <text x="130" y="258" class="sm mid b">kg = en × boy × t × 7,85</text>
  <text x="130" y="282" class="sm mid t2">(en, boy: m · t: mm)</text>
  <text x="130" y="320" class="sm mid">1 m × 1 m × 2 × 7,85</text>
  <text x="130" y="356" class="xl mid p">15,7 kg</text>
  <rect x="250" y="50" width="220" height="350" rx="10" class="sf sb"/>
  <text x="360" y="78" class="b mid">Kutu profil</text>
  <rect x="310" y="100" width="100" height="100" class="p"/>
  <rect x="320" y="110" width="80" height="80" class="sf"/>
  <text x="360" y="155" class="sm mid">36 × 36</text>
  <text x="360" y="220" class="sm mid">40 × 40 × 2 mm</text>
  <text x="360" y="258" class="sm mid b">a·b − (a−2t)·(b−2t)</text>
  <text x="360" y="282" class="sm mid">1.600 − 1.296 = 304 mm²</text>
  <text x="360" y="320" class="sm mid">304 × 7,85 ÷ 1.000</text>
  <text x="360" y="356" class="xl mid p">2,386 kg/m</text>
  <text x="360" y="384" class="sm mid t2">6 m boy: 14,32 kg</text>
  <rect x="480" y="50" width="220" height="350" rx="10" class="sf sb"/>
  <text x="590" y="78" class="b mid">Boru</text>
  <circle cx="590" cy="150" r="50" class="p"/>
  <circle cx="590" cy="150" r="40" class="sf"/>
  <line x1="540" y1="150" x2="640" y2="150" class="st dash" fill="none"/>
  <text x="590" y="144" class="sm mid">D = 48,3</text>
  <text x="590" y="220" class="sm mid">48,3 × 3 mm</text>
  <text x="590" y="258" class="sm mid b">π × (D − t) × t</text>
  <text x="590" y="282" class="sm mid">π × 45,3 × 3 = 426,9 mm²</text>
  <text x="590" y="320" class="sm mid">426,9 × 7,85 ÷ 1.000</text>
  <text x="590" y="356" class="xl mid p">3,351 kg/m</text>
  <text x="590" y="384" class="sm mid t2">6 m boy: 20,1 kg</text>
</svg>`
  },
  sections: [
    {
      h: "Ağırlık hesabının mantığı: hacim × yoğunluk",
      p: [
        "Metal atölyelerinde, demir-çelik ticaretinde ve inşaat şantiyelerinde malzeme genellikle kilogramla alınıp satılır, ama siparişler ölçüyle (levha ebadı, profil boyu, boru çapı) verilir. Ağırlığı önceden bilmek; teklif hazırlamak, nakliye aracını seçmek, vinç ve forklift kapasitesini kontrol etmek ve çatı ya da asma kat gibi taşıyıcı sistemlerin yükünü hesaplamak için gereklidir.",
        "Hesap her zaman aynı iki adımdan oluşur. Önce parçanın hacmi bulunur: levhada en × boy × kalınlık, profil ve boruda kesit alanı × uzunluk. Sonra hacim malzemenin <strong>yoğunluğuyla</strong> çarpılır. Yoğunluğun ne olduğunu ve birimler arasındaki ilişkiyi [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazısında, kütle ile ağırlık arasındaki farkı [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] yazısında bulabilirsiniz; ticarette \"ağırlık\" denince kilogram cinsinden kütle kastedilir."
      ]
    },
    {
      h: "Çeliğin yoğunluğu neden 7,85 alınır?",
      p: [
        "Karbon çelikleri, içeriklerindeki karbon ve alaşım elementlerine göre yaklaşık 7,75 ile 7,90 g/cm³ arasında yoğunluğa sahiptir. Mühendislik hesaplarında, çelik ürün standartlarındaki teorik ağırlık tablolarında ve ticarette yapı çeliği için yaygın olarak <strong>7,85 g/cm³</strong> (7.850 kg/m³) değeri kabul edilir. Bu standartlaşma sayesinde farklı satıcıların tabloları birbiriyle karşılaştırılabilir.",
        "7,85 değerinin pratik bir güzelliği de vardır: 1 m² alanda 1 mm kalınlıktaki çelik tam 1.000 cm³ hacim eder (100 cm × 100 cm × 0,1 cm) ve 1.000 × 7,85 = 7.850 g = <strong>7,85 kg</strong> gelir. Yani metrekare ağırlığını bulmak için kalınlığı milimetre cinsinden 7,85 ile çarpmanız yeterlidir. Diğer malzemelerde de aynı kural geçerlidir; yalnızca 7,85 yerine o malzemenin yoğunluğu yazılır."
      ],
      table: {
        head: ["Malzeme", "Yoğunluk (g/cm³)", "1 m² × 1 mm ağırlığı", "1 m² × 2 mm ağırlığı"],
        rows: [
          ["Karbon çelik (siyah sac, DKP, galvaniz)", "7,85", "7,85 kg", "15,70 kg"],
          ["Paslanmaz çelik (yaygın östenitik)", "7,93", "7,93 kg", "15,86 kg"],
          ["Alüminyum", "2,70", "2,70 kg", "5,40 kg"],
          ["Bakır", "8,96", "8,96 kg", "17,92 kg"],
          ["Pirinç", "8,50", "8,50 kg", "17,00 kg"]
        ],
        caption: "Değerler teorik hesap içindir. Alaşım türüne göre yoğunluk birkaç binde bir değişebilir; kesin değer için üreticinin teknik föyüne bakın."
      }
    },
    {
      h: "Sac ağırlığı nasıl hesaplanır?",
      formula: "Sac ağırlığı (kg) = en (m) × boy (m) × kalınlık (mm) × yoğunluk (g/cm³)\nm² ağırlığı (kg/m²) = kalınlık (mm) × yoğunluk",
      ol: [
        "<strong>1 m² 2 mm sac:</strong> 1 × 1 × 2 × 7,85 = 15,7 kg.",
        "<strong>1.000 × 2.000 mm, 2 mm levha:</strong> 1 × 2 × 2 × 7,85 = 31,4 kg.",
        "<strong>1.250 × 2.500 mm, 1,5 mm levha:</strong> 1,25 × 2,5 × 1,5 × 7,85 = 36,80 kg.",
        "<strong>1.500 × 3.000 mm, 3 mm levha:</strong> 1,5 × 3 × 3 × 7,85 = 105,98 kg; bu levhayı iki kişinin taşıması zordur.",
        "<strong>Aynı ölçüde alüminyum:</strong> 1 × 2 × 2 × 2,70 = 10,8 kg; çelik levhanın yaklaşık %34'ü."
      ],
      table: {
        head: ["Kalınlık (mm)", "kg/m²", "1.000 × 2.000 levha", "1.250 × 2.500 levha"],
        rows: [
          ["0,5", "3,93", "7,85 kg", "12,27 kg"],
          ["1", "7,85", "15,70 kg", "24,53 kg"],
          ["1,5", "11,78", "23,55 kg", "36,80 kg"],
          ["2", "15,70", "31,40 kg", "49,06 kg"],
          ["3", "23,55", "47,10 kg", "73,59 kg"],
          ["5", "39,25", "78,50 kg", "122,66 kg"],
          ["10", "78,50", "157,00 kg", "245,31 kg"]
        ],
        caption: "Çelik için teorik değerler. Baklavalı (gözyaşı desenli) saclarda desen nedeniyle ağırlık düz saca göre biraz fazladır; üretici tablosunu kullanın."
      },
      after: [
        "Kesilmiş parçalar, delikli levhalar ya da şekilli kesimler için önce net alanı bulun: dikdörtgenden kesilen deliklerin alanını çıkarın. Çember, üçgen gibi şekillerin alan formülleri [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısında. Levha ölçüsü, kalınlık, adet ve isteğe bağlı kilogram fiyatıyla [[arac:sac-agirligi-hesapla|Sac Ağırlığı Hesaplama]] aracı toplam ağırlığı ve tutarı verir."
      ]
    },
    {
      h: "Kutu profil metre ağırlığı nasıl bulunur?",
      p: [
        "Kutu profil (kare ya da dikdörtgen kesitli içi boş profil) için kesit alanı, dış dikdörtgenin alanından iç boşluğun alanının çıkarılmasıyla bulunur. İç boşluğun kenarları, dış kenarlardan iki et kalınlığı (2t) kadar kısadır. Kesit alanı mm² cinsinden bulunduğunda 7,85 ile çarpıp 1.000'e bölerek metre ağırlığına ulaşırsınız."
      ],
      formula: "Kesit (mm²) = a × b − (a − 2t) × (b − 2t)\nMetre ağırlığı (kg/m) = kesit (mm²) × 7,85 ÷ 1.000\nBoy ağırlığı = kg/m × boy (m)   (standart boy çoğunlukla 6 m)",
      table: {
        head: ["Profil (a × b × t, mm)", "Kesit (mm²)", "kg/m (teorik)", "6 m boy (kg)"],
        rows: [
          ["20 × 20 × 1,5", "111", "0,871", "5,23"],
          ["30 × 30 × 2", "224", "1,758", "10,55"],
          ["40 × 20 × 1,5", "171", "1,342", "8,05"],
          ["40 × 40 × 2", "304", "2,386", "14,32"],
          ["50 × 50 × 3", "564", "4,427", "26,56"],
          ["60 × 40 × 2", "384", "3,014", "18,09"],
          ["80 × 80 × 3", "924", "7,253", "43,52"],
          ["100 × 100 × 4", "1.536", "12,058", "72,35"]
        ],
        caption: "Hesap keskin köşe varsayar. Gerçek profillerin köşeleri yuvarlatılmış olduğu için üretici tablolarındaki değerler genellikle %2–5 daha düşüktür (ör. 40 × 40 × 2 için yaklaşık 2,3 kg/m)."
      },
      after: [
        "Örnek: 40 × 40 × 2 mm profil için 40 × 40 = 1.600 mm², iç boşluk 36 × 36 = 1.296 mm², kesit 1.600 − 1.296 = 304 mm². Metre ağırlığı 304 × 7,85 ÷ 1.000 = 2,386 kg/m, 6 metrelik boy 14,32 kg. 20 boy için 286,4 kg malzeme gerekir. [[arac:profil-agirligi-hesapla|Kutu Profil Ağırlığı Hesaplama]] aracı birim ağırlığın yanında boya hesabı için dış yüzey alanını da verir: 40 × 40 profilde metre başına 0,16 m²."
      ]
    },
    {
      h: "Boru ağırlığı formülü nedir?",
      p: [
        "Boru kesiti bir halkadır. Halka alanı π ÷ 4 × (D² − d²) formülüyle bulunur; iç çap d = D − 2t yazılıp sadeleştirildiğinde çok daha pratik bir formül elde edilir: <strong>π × (D − t) × t</strong>. Buradaki (D − t), et kalınlığının ortasından geçen ortalama çaptır; halka, bu çevre uzunluğunda ve t kalınlığında bir şerit gibi düşünülebilir."
      ],
      formula: "Kesit (mm²) = π × (D − t) × t\nMetre ağırlığı (kg/m) = π × (D − t) × t × 7,85 ÷ 1.000\nKısa yol (çelik): kg/m ≈ 0,02466 × (D − t) × t",
      table: {
        head: ["Dış çap × et (mm)", "Yaklaşık anma ölçüsü", "kg/m (teorik)", "6 m boy (kg)"],
        rows: [
          ["21,3 × 2,0", "1/2\"", "0,952", "5,71"],
          ["26,9 × 2,0", "3/4\"", "1,228", "7,37"],
          ["33,7 × 2,6", "1\"", "1,994", "11,96"],
          ["48,3 × 3,0", "1 1/2\"", "3,351", "20,11"],
          ["60,3 × 3,0", "2\"", "4,239", "25,43"],
          ["114,3 × 4,0", "4\"", "10,881", "65,29"]
        ],
        caption: "İnç cinsinden anma ölçüsü boru dış çapı değil geleneksel bir addır; hesapta her zaman milimetre cinsinden gerçek dış çapı kullanın."
      },
      after: [
        "Paslanmaz, bakır ya da PVC boru için 7,85 yerine ilgili yoğunluğu yazın. PVC'nin yoğunluğu yaklaşık 1,4 g/cm³ olduğundan aynı ölçüdeki PVC boru çelik borunun beşte birinden de hafiftir. [[arac:boru-agirligi-hesapla|Boru Ağırlığı Hesaplama]] aracı farklı malzemeleri seçmenize ya da özel yoğunluk girmenize izin verir ve iç çapı da gösterir."
      ]
    },
    {
      h: "Paslanmaz ve alüminyum sac ağırlığı farkı",
      p: [
        "Paslanmaz çeliğin yoğunluğu karbon çelikten yalnızca yaklaşık %1 fazladır; 1 m² 2 mm paslanmaz sac 15,86 kg, karbon çelik 15,70 kg gelir. Bu yüzden pratikte aynı tablolar kullanılabilir, ama büyük tonajlarda fark birikir: 10 ton karbon çeliğe karşılık gelen ölçüde paslanmaz yaklaşık 10,1 ton olur. Fiyatı çok farklı olduğu için teklifte doğru yoğunluğu kullanmak önemlidir.",
        "Alüminyum ise çeliğin yaklaşık üçte biri yoğunluktadır (2,70 ÷ 7,85 = 0,344). Aynı ölçüdeki alüminyum levha çelik levhanın yaklaşık %34'ü kadar gelir. Ancak alüminyumun dayanımı ve rijitliği de daha düşüktür; aynı taşıma işini yapması için genellikle daha kalın kesit seçilir. Bu nedenle \"alüminyum üç kat hafiftir\" karşılaştırması aynı ölçü için doğrudur, aynı işlev için değil."
      ]
    },
    {
      h: "Mermer plaka ağırlığı nasıl hesaplanır?",
      p: [
        "Doğal taşlarda da aynı formül geçerlidir; yalnızca yoğunluk farklıdır. Mermerin yoğunluğu türüne göre yaklaşık 2,6–2,8 g/cm³, granitin 2,6–2,8 g/cm³, travertenin gözenekliliğine göre 2,3–2,6 g/cm³ civarındadır. Taş ölçüleri genellikle santimetreyle verildiği için birimleri dikkatli çevirin."
      ],
      formula: "Ağırlık (kg) = en (m) × boy (m) × kalınlık (m) × yoğunluk (kg/m³)\nya da: m² ağırlığı (kg/m²) = kalınlık (cm) × 10 × yoğunluk (g/cm³)",
      ol: [
        "<strong>60 × 60 × 2 cm mermer plaka (2,7 g/cm³):</strong> 0,6 × 0,6 × 0,02 × 2.700 = 19,44 kg.",
        "<strong>2 cm mermerin m² ağırlığı:</strong> 2 × 10 × 2,7 = 54 kg/m².",
        "<strong>3 cm granit tezgâh, 0,62 × 3 m:</strong> 0,62 × 3 × 0,03 × 2.700 = 150,7 kg; montaj için en az üç dört kişi ya da kaldırma ekipmanı gerekir.",
        "<strong>Merdiven basamağı, 30 × 120 × 3 cm:</strong> 0,3 × 1,2 × 0,03 × 2.700 = 29,2 kg."
      ],
      after: [
        "Taş seçiminden sonra kesin yoğunluk için tedarikçinin teknik değerini kullanın. Ölçü ve kalınlıktan plaka ağırlığını bulmak için [[arac:mermer-agirligi-hesapla|Mermer ve Granit Ağırlığı Hesaplama]] aracı farklı taş türlerini listeler."
      ]
    },
    {
      h: "Teklif hazırlarken ağırlık fiyata nasıl çevrilir?",
      p: [
        "Demir-çelik ürünleri çoğunlukla kilogram (ya da ton) fiyatıyla satılır. Teklif hazırlarken teorik ağırlığı bulduktan sonra şu kalemleri ayrı ayrı düşünmek gerekir: malzeme bedeli, kesim ve işleme payı (fire), işçilik, yüzey işlemi (boya, galvaniz) ve nakliye. Fiyatlar sık değiştiği için aşağıdaki örnekteki kilogram fiyatı tamamen örnektir; güncel değeri tedarikçinizden alın."
      ],
      ol: [
        "<strong>Malzeme listesi:</strong> 20 boy 40 × 40 × 2 profil (20 × 14,32 = 286,4 kg) ve 4 levha 1.000 × 2.000 × 2 mm sac (4 × 31,4 = 125,6 kg). Toplam 412,0 kg.",
        "<strong>Fire payı:</strong> Kesim artıkları için %5 eklenirse 412,0 × 1,05 = 432,6 kg.",
        "<strong>Malzeme bedeli:</strong> Örnek kilogram fiyatı 45 TL ise 432,6 × 45 = 19.467 TL (KDV hariç).",
        "<strong>Diğer kalemler:</strong> İşçilik, boya ya da galvaniz (genellikle m² ya da kg başına), nakliye ve kâr payı ayrıca eklenir. KDV ve kâr marjının hesaplanması için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısına bakabilirsiniz."
      ],
      after: [
        "Teorik ağırlık ile kantar ağırlığı arasındaki farkı teklifte açıkça belirtmek, teslimatta yaşanabilecek anlaşmazlıkları önler. Haddehane toleransları nedeniyle gerçek ağırlık teorik değerin birkaç yüzde altında ya da üstünde çıkabilir; satış \"teorik ağırlık üzerinden\" mi yoksa \"kantar ağırlığı üzerinden\" mi yapılacak, sözleşmede yazılmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Birimleri karıştırmak:</strong> Formülde en ve boy metre, kalınlık milimetre olmalıdır; üçünü de milimetre girerseniz sonuç bir milyon kat büyür.",
        "<strong>Profilde et kalınlığını bir kez düşmek:</strong> İç ölçü a − t değil a − 2t'dir; profilin iki karşı duvarı vardır.",
        "<strong>Boruda anma ölçüsünü dış çap sanmak:</strong> 1 inçlik boru 25,4 mm değil, yaklaşık 33,7 mm dış çaplıdır.",
        "<strong>Paslanmaz için ayrı yoğunluk kullanmamak:</strong> Küçük işlerde fark önemsizdir, büyük tonajda ve pahalı malzemede önemlidir.",
        "<strong>Fireyi unutmak:</strong> Standart boylardan kesim yapılırken artan parçalar da satın alınmış malzemedir; teklife ekleyin."
      ]
    }
  ],
  faq: [
    ["Sac ağırlığı nasıl hesaplanır?", "Sac ağırlığı en (m) × boy (m) × kalınlık (mm) × yoğunluk formülüyle hesaplanır; çelik için yoğunluk 7,85 alınır. Örneğin 1.000 × 2.000 mm ve 2 mm kalınlıktaki çelik levha 1 × 2 × 2 × 7,85 = 31,4 kg gelir."],
    ["1 m² 2 mm sac kaç kg gelir?", "1 metrekare ve 2 mm kalınlığındaki çelik sac 2 × 7,85 = 15,7 kg gelir. Aynı ölçüde paslanmaz çelik yaklaşık 15,86 kg, alüminyum ise 5,4 kg'dır. Kalınlığı milimetre olarak yoğunlukla çarpmak metrekare ağırlığını verir."],
    ["Kutu profil metre ağırlığı nasıl bulunur?", "Kesit alanı dış ölçülerin çarpımından iç boşluğun alanı çıkarılarak bulunur: a × b − (a − 2t) × (b − 2t). Sonuç 7,85 ile çarpılıp 1.000'e bölünür. 40 × 40 × 2 mm profil için 304 mm² kesitle 2,386 kg/m bulunur."],
    ["Boru ağırlığı formülü nedir?", "Çelik boru için metre ağırlığı π × (dış çap − et kalınlığı) × et kalınlığı × 7,85 ÷ 1.000 formülüyle bulunur; ölçüler milimetre girilir. Örneğin 48,3 mm dış çaplı ve 3 mm etli boru yaklaşık 3,35 kg/m gelir."],
    ["Çeliğin yoğunluğu neden 7,85 alınır?", "Karbon çeliklerinin yoğunluğu bileşimlerine göre yaklaşık 7,75–7,90 g/cm³ arasındadır. Mühendislik hesapları ve ticari ağırlık tabloları için yapı çeliğinde 7,85 g/cm³ standart değer olarak kabul edilir; bu sayede farklı tablolar birbiriyle karşılaştırılabilir."],
    ["Paslanmaz ve alüminyum sac ağırlığı farkı nedir?", "Paslanmaz çeliğin yoğunluğu yaklaşık 7,93 g/cm³ ile karbon çelikten yalnızca yüzde 1 fazladır. Alüminyumun yoğunluğu 2,70 g/cm³'tür; aynı ölçüdeki alüminyum levha çelik levhanın yaklaşık yüzde 34'ü kadar gelir."],
    ["Mermer plaka ağırlığı nasıl hesaplanır?", "Plakanın en, boy ve kalınlığı metreye çevrilip çarpılır ve mermerin yoğunluğuyla, yaklaşık 2.700 kg/m³ ile çarpılır. Örneğin 60 × 60 × 2 cm mermer plaka 0,6 × 0,6 × 0,02 × 2.700 = 19,44 kg gelir; 2 cm mermerin metrekaresi yaklaşık 54 kg'dır."],
    ["Teklif hazırlarken ağırlık fiyata nasıl çevrilir?", "Önce tüm parçaların teorik ağırlığı toplanır ve kesim firesi için yüzde birkaç pay eklenir. Bu ağırlık tedarikçinin güncel kilogram fiyatıyla çarpılarak malzeme bedeli bulunur; işçilik, yüzey işlemi, nakliye, kâr ve KDV ayrıca eklenir."],
    ["Teorik ağırlık ile kantar ağırlığı neden farklı çıkar?", "Teorik ağırlık nominal ölçülerle ve standart yoğunlukla hesaplanır. Gerçek üründe kalınlık toleransı, profil köşelerinin yuvarlaklığı, galvaniz ya da boya kaplaması bulunur. Bu nedenle kantar ağırlığı teorik değerden birkaç yüzde farklı çıkabilir."]
  ],
  tools: ["sac-agirligi-hesapla", "profil-agirligi-hesapla", "boru-agirligi-hesapla", "mermer-agirligi-hesapla"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "kutle-ve-agirlik-farki", "alan-ve-hacim-formulleri", "kar-marji-nasil-hesaplanir"],
  sources: [
    ["Türk Standardları Enstitüsü – çelik ürün standartları", "https://www.tse.org.tr/"],
    ["BIPM – SI kütle ve hacim birimleri", "https://www.bipm.org/en/measurement-units"]
  ]
};
