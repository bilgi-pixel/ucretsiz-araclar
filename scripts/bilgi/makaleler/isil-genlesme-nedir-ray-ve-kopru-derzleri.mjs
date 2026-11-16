export default {
  slug: "isil-genlesme-nedir-ray-ve-kopru-derzleri",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Isıl Genleşme Nedir? Boyca Genleşme Formülü, Ray ve Köprü Derzleri",
  pageTitle: "Isıl Genleşme Nedir? Boyca Genleşme Formülü ve Örnekler",
  description: "Isıl genleşme, ısınan maddenin boyutlarının büyümesidir: ΔL = L₀·α·ΔT. 25 m çelik ray 50 °C'de 15 mm uzar. Köprü derzi, bimetal, suyun 4 °C anomalisi örnekli.",
  keywords: ["ısıl genleşme", "boyca genleşme formülü", "genleşme katsayısı", "hacimce genleşme", "köprü derzleri neden var", "suyun anormal genleşmesi", "genleşme örnekleri", "bimetal şerit"],
  lead: "Isıl genleşme, bir maddenin sıcaklığı arttığında boyutlarının büyümesi, azaldığında küçülmesidir. Katı bir çubuğun boyundaki değişim ΔL = L₀ · α · ΔT formülüyle hesaplanır; burada α malzemenin boyca genleşme katsayısıdır. Çelik için α yaklaşık 12 × 10⁻⁶ 1/°C olduğundan 25 metrelik bir ray 50 °C ısındığında yaklaşık 15 mm uzar. Bu sayfada formülü çözümlü örneklerle, ray ve köprü derzlerinin neden bırakıldığını, bimetal şeridi, hacimce genleşmeyi ve suyun 4 °C'deki anormal davranışını anlatıyoruz.",
  kisaCevap: [
    "Boyca genleşme: ΔL = L₀ · α · ΔT; L₀ ilk boy, α boyca genleşme katsayısı, ΔT sıcaklık değişimi.",
    "Çelik ve beton için α ≈ 12 × 10⁻⁶ 1/°C, alüminyum için ≈ 23 × 10⁻⁶, bakır için ≈ 17 × 10⁻⁶ 1/°C'dir.",
    "Yüzeyce genleşme katsayısı yaklaşık 2α, hacimce genleşme katsayısı yaklaşık 3α alınır.",
    "Raylar ve köprülerde bırakılan derzler, genleşen malzemenin bükülmesini ya da çatlamasını önler.",
    "Su 0 °C ile 4 °C arasında ısıtılınca büzülür; en yoğun hali yaklaşık 4 °C'dedir. Bu yüzden göller yüzeyden donar."
  ],
  figure: {
    alt: "Isıl genleşme örnek hesabı: kışın −10 °C'de 25 metre olan çelik ray yazın 40 °C'de 15 milimetre uzar. Formül ΔL eşittir L₀ çarpı α çarpı ΔT. Altta malzemelere göre genleşme katsayısı çubukları.",
    caption: "Ray örneği: 25 m × 12 × 10⁻⁶ × 50 °C = 0,015 m = 15 mm. Alttaki çubuklar aynı ray alüminyumdan olsaydı neredeyse iki kat uzayacağını gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">25 metrelik çelik ray ne kadar uzar?</text>
  <text x="20" y="68" class="sm b">Kış −10 °C</text>
  <rect x="120" y="54" width="440" height="20" rx="3" class="sf sb"/>
  <text x="340" y="69" class="sm mid">25,000 m</text>
  <text x="20" y="112" class="sm b">Yaz 40 °C</text>
  <rect x="120" y="98" width="440" height="20" rx="3" class="ps"/>
  <rect x="560" y="98" width="30" height="20" rx="3" class="p"/>
  <text x="340" y="113" class="sm mid">25,015 m</text>
  <line x1="560" y1="132" x2="590" y2="132" class="sp sw" fill="none"/>
  <text x="575" y="152" class="sm mid b p">+15 mm</text>
  <text x="604" y="113" class="sm">derz</text>
  <rect x="20" y="168" width="680" height="70" rx="8" class="p"/>
  <text x="360" y="198" class="lg b mid sf">ΔL = L₀ · α · ΔT</text>
  <text x="360" y="224" class="sm mid sf">25 m × 12 × 10⁻⁶ 1/°C × 50 °C = 0,015 m = 15 mm</text>
  <text x="20" y="270" class="b">Boyca genleşme katsayısı (× 10⁻⁶ 1/°C)</text>
  <g class="sm">
    <text x="20" y="300">Cam</text><rect x="120" y="288" width="126" height="16" rx="3" class="oks"/><text x="254" y="300" class="b">9</text>
    <text x="20" y="326">Çelik</text><rect x="120" y="314" width="168" height="16" rx="3" class="ps"/><text x="296" y="326" class="b">12</text>
    <text x="20" y="352">Bakır</text><rect x="120" y="340" width="238" height="16" rx="3" class="ps"/><text x="366" y="352" class="b">17</text>
    <text x="20" y="378">Pirinç</text><rect x="120" y="366" width="266" height="16" rx="3" class="ps"/><text x="394" y="378" class="b">19</text>
    <text x="20" y="404">Alüminyum</text><rect x="120" y="392" width="322" height="16" rx="3" class="dgs"/><text x="450" y="404" class="b">23</text>
  </g>
  <rect x="490" y="286" width="210" height="124" rx="8" class="sf sb"/>
  <text x="595" y="312" class="b mid">Aynı ray, aynı ΔT</text>
  <text x="595" y="340" class="sm mid">Çelik: 15 mm</text>
  <text x="595" y="364" class="sm mid">Alüminyum: 28,75 mm</text>
  <text x="595" y="392" class="sm mid t2">α büyüdükçe uzama artar</text>
</svg>`
  },
  sections: [
    {
      h: "Isıl genleşme nedir?",
      p: [
        "Bir maddeyi oluşturan atom ve moleküller sürekli titreşim halindedir. Madde ısındığında bu titreşimlerin genliği artar ve parçacıklar arasındaki ortalama uzaklık büyür. Sonuç olarak maddenin boyu, yüzeyi ve hacmi artar. Buna <strong>ısıl genleşme</strong> denir. Sıcaklık düştüğünde ise tersi olur ve madde büzülür.",
        "Isıl genleşme katılarda, sıvılarda ve gazlarda görülür, ama büyüklüğü farklıdır. Gazlar en çok, sıvılar daha az, katılar ise en az genleşir. Katılarda değişim çıplak gözle fark edilmeyecek kadar küçüktür; ancak uzun yapılarda, örneğin raylarda, köprülerde, boru hatlarında ve elektrik tellerinde, milimetreler ve santimetreler düzeyine ulaşır. Mühendislik tasarımında bu yüzden mutlaka hesaba katılır.",
        "Isıl genleşme 9. sınıf fiziğindeki ısı ve sıcaklık konusunun bir parçasıdır. Isı ile sıcaklık arasındaki farkı hatırlamak isterseniz [[bilgi:isi-ve-sicaklik-farki|ısı ve sıcaklık farkı]] yazısına bakabilirsiniz; genleşme sıcaklık değişimine bağlıdır, aktarılan ısı miktarına değil."
      ]
    },
    {
      h: "Boyca genleşme nasıl hesaplanır?",
      p: [
        "Uzunluğu kalınlığına göre çok büyük olan cisimlerde, örneğin tel, çubuk ve raylarda, en önemli değişim boydadır. Boydaki değişim üç şeye bağlıdır: ilk boy, sıcaklık değişimi ve malzemenin cinsi. İlk boy iki katına çıkarsa uzama da iki katına çıkar; sıcaklık farkı iki katına çıkarsa yine uzama iki katına çıkar."
      ],
      formula: "ΔL = L₀ · α · ΔT\nSon boy: L = L₀ · (1 + α · ΔT)\nL₀: ilk boy · α: boyca genleşme katsayısı (1/°C) · ΔT = T_son − T_ilk",
      ol: [
        "Verileri yazın: çelik ray, L₀ = 25 m, kışın −10 °C, yazın 40 °C.",
        "Sıcaklık değişimini bulun: ΔT = 40 − (−10) = 50 °C.",
        "Katsayıyı seçin: çelik için α = 12 × 10⁻⁶ 1/°C.",
        "Formülde yerine koyun: ΔL = 25 × 12 × 10⁻⁶ × 50 = 0,015 m.",
        "Birimi çevirin: 0,015 m = 15 mm. Ray yazın kışa göre 15 mm daha uzundur."
      ],
      after: [
        "Sıcaklık farkı için santigrat ya da kelvin kullanmanız sonucu değiştirmez, çünkü iki ölçekte bir derecelik aralık aynı büyüklüktedir. 50 °C'lik fark 50 K'lik farka eşittir. Sıcaklık ölçekleri arasındaki ilişkiyi [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] gösterir. Hesabı farklı malzemelerle denemek için [[arac:isil-genlesme-hesapla|Isıl Genleşme Hesaplama]] aracı hazır katsayılarla boyca, yüzeyce ve hacimce değişimi verir."
      ]
    },
    {
      h: "Genleşme katsayısı neye bağlıdır?",
      p: [
        "Genleşme katsayısı malzemenin cinsine bağlı bir özelliktir. Atomları arasındaki bağlar güçlü ve sıkı olan malzemeler daha az, bağları zayıf olanlar daha çok genleşir. Katsayı sıcaklıkla da bir miktar değişir, ama günlük sıcaklık aralıklarında sabit kabul edilebilir. Tablodaki değerler ders kitaplarında kullanılan tipik değerlerdir; alaşımın türüne göre küçük farklar olabilir."
      ],
      table: {
        head: ["Malzeme", "α (× 10⁻⁶ 1/°C)", "1 m çubuk, ΔT = 50 °C", "Not"],
        rows: [
          ["Cam (pencere camı)", "9", "0,45 mm", "Isıya dayanıklı özel camlarda çok daha düşük"],
          ["Çelik, demir", "12", "0,60 mm", "Ray, köprü, inşaat demiri"],
          ["Beton", "12", "0,60 mm", "Çelikle yakın olması betonarmeyi mümkün kılar"],
          ["Altın", "14", "0,70 mm", ""],
          ["Bakır", "17", "0,85 mm", "Elektrik tesisatı, su boruları"],
          ["Pirinç, gümüş", "19", "0,95 mm", "Bimetal şeritlerde sık kullanılır"],
          ["Alüminyum", "23", "1,15 mm", "Çeliğin yaklaşık iki katı"],
          ["Kurşun", "29", "1,45 mm", "Yaygın metaller arasında en yükseklerden"]
        ]
      },
      after: [
        "Çelik ile betonun genleşme katsayılarının birbirine çok yakın olması tesadüf değil, betonarme yapının temel şartlarından biridir. Sıcaklık değiştiğinde demir ve beton birlikte uzayıp kısalır; katsayılar çok farklı olsaydı ikisi arasındaki bağ zamanla çözülür ve beton çatlardı."
      ]
    },
    {
      h: "Raylar ve köprüler neden aralıklı yapılır?",
      p: [
        "Genleşmesine izin verilmeyen bir malzeme, uzamak isterken iki ucundan sıkıştırılır ve içinde çok büyük gerilmeler oluşur. Bu gerilme sonunda malzemeyi büker, çatlatır ya da bağlantılarını koparır. Mühendisler bu yüzden uzun yapılarda <strong>genleşme derzi</strong> adı verilen boşluklar ya da esnek birleşimler bırakır."
      ],
      ul: [
        "<strong>Klasik raylar:</strong> eski tip demiryollarında raylar 20–25 metrelik parçalar halinde döşenir ve aralarında birkaç milimetrelik boşluk bırakılır. Trenin geçerken çıkardığı ritmik ses bu boşluklardan gelir.",
        "<strong>Kaynaklı uzun raylar:</strong> günümüzde birçok hatta raylar yüzlerce metre ya da kilometrelerce kaynakla birleştirilir. 1 km'lik çelik ray 50 °C'lik farkta serbest olsaydı 600 mm uzardı; bu raylar uygun sıcaklıkta döşenip traverslere sıkıca bağlanarak uzaması engellenir ve oluşan gerilme ray tarafından taşınır.",
        "<strong>Köprüler:</strong> köprü tabliyesinin uçlarında diş diş görünen metal derzler ya da kauçuk birleşimler bulunur. 100 m'lik çelik bir köprü 60 °C'lik sıcaklık farkında 100 × 12 × 10⁻⁶ × 60 = 0,072 m, yani yaklaşık 7 cm uzar.",
        "<strong>Beton yollar ve kaldırımlar:</strong> beton plakalar arasındaki düzenli çizgiler, sıcaklık ve kuruma kaynaklı hareketlerin kontrolsüz çatlak oluşturmasını önleyen derzlerdir.",
        "<strong>Boru hatları:</strong> sıcak su ve buhar borularında U biçimli dirsekler ya da körüklü parçalar genleşmeyi karşılar."
      ],
      note: "Gerçek yapılarda derz aralığı yalnızca bu basit formülle değil; montaj sıcaklığı, güneş ışınımı, malzemenin sünmesi ve yük durumları dikkate alınarak yetkili mühendisler tarafından hesaplanır."
    },
    {
      h: "Yüzeyce ve hacimce genleşme",
      p: [
        "Bir levhanın hem eni hem boyu uzadığı için alanı da büyür; bir küpün üç boyutu birden uzadığı için hacmi büyür. Küçük sıcaklık değişimlerinde yüzeyce genleşme katsayısı yaklaşık 2α, hacimce genleşme katsayısı yaklaşık 3α alınır. Bu yaklaşım, α'nın çok küçük olması nedeniyle (α² gibi terimler ihmal edilebilecek kadar küçüktür) ders kitaplarında standart olarak kullanılır."
      ],
      formula: "Yüzeyce: ΔA = A₀ · 2α · ΔT\nHacimce: ΔV = V₀ · 3α · ΔT\nÖrnek: 1.000 cm³ alüminyum, ΔT = 50 °C → ΔV = 1.000 × 3 × 23 × 10⁻⁶ × 50 = 3,45 cm³",
      after: [
        "Sıvılar belirli bir biçime sahip olmadığı için yalnızca hacimce genleşme katsayısıyla tanımlanır. Sıvıların hacimce genleşmesi genellikle katılarınkinden çok daha büyüktür. Bu yüzden ağzına kadar doldurulmuş bir yakıt deposu sıcak havada taşabilir; sıvılı termometreler de bu farkı kullanarak çalışır."
      ]
    },
    {
      h: "Suyun 4 °C'deki anormal genleşmesi nedir?",
      p: [
        "Maddelerin çoğu ısındıkça genleşir, soğudukça büzülür. Su ise 0 °C ile 4 °C arasında bu kurala uymaz: bu aralıkta ısıtılan su büzülür, soğutulan su genleşir. Suyun en yoğun olduğu sıcaklık yaklaşık 4 °C'dir (daha kesin olarak 3,98 °C). Su donduğunda ise hacmi yaklaşık %9 artar; buz sudan daha az yoğun olduğu için suyun üstünde yüzer.",
        "Bu anormalliğin doğadaki sonucu hayati önemdedir. Kışın göllerin yüzeyindeki su soğuyup 4 °C'ye geldiğinde en yoğun hale gelir ve dibe çöker. Daha da soğuyan su artık daha hafiftir ve yüzeyde kalır, sonunda yüzeyde buz tabakası oluşur. Buz ve altındaki su tabakası yalıtım görevi görür; gölün dibi 4 °C civarında kalır ve canlılar kışı geçirebilir. Kışın dışarıda kalan su borularının çatlaması da donan suyun genleşmesinden kaynaklanır."
      ],
      after: [
        "Yoğunluk kavramını ve hesabını [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "Bimetal şerit nasıl çalışır?",
      p: [
        "Bimetal şerit, genleşme katsayıları farklı iki metal şeridin boydan boya birbirine perçinlenmesi ya da kaynaklanmasıyla yapılır. Yaygın bir çift pirinç (α ≈ 19 × 10⁻⁶) ve çeliktir (α ≈ 12 × 10⁻⁶). Şerit ısındığında pirinç çelikten daha fazla uzamak ister; ama iki metal birbirine bağlı olduğu için şerit düz kalamaz ve pirinç dış tarafta kalacak şekilde, yani çeliğe doğru bükülür. Soğuduğunda ise ters yöne bükülür."
      ],
      ul: [
        "<strong>Termostat:</strong> ütü, su ısıtıcısı ve eski tip oda termostatlarında bükülen şerit belirli bir sıcaklıkta elektrik kontağını açar ya da kapatır.",
        "<strong>Termik koruma:</strong> bazı sigorta ve motor koruma şalterlerinde aşırı akımla ısınan bimetal devreyi keser.",
        "<strong>İbreli termometre:</strong> spiral biçiminde sarılmış bimetal, sıcaklık değiştikçe açılıp kapanarak ibreyi döndürür."
      ]
    },
    {
      h: "Günlük hayattan genleşme örnekleri",
      p: [
        "Isıl genleşmenin en bilinen ev örneği, sıkışmış cam kavanoz kapağıdır. Kapağı sıcak suyun altında tutmak işe yarar, çünkü metal kapağın genleşme katsayısı camınkinden büyüktür. 8 cm çaplı bir alüminyum kapak ile cam kavanoz ağzı 60 °C ısındığında kapağın çapı yaklaşık 0,11 mm, cam ağzın çapı ise yaklaşık 0,04 mm büyür. Aradaki küçük fark bile sürtünmeyi azaltıp kapağın açılmasını kolaylaştırır."
      ],
      ul: [
        "<strong>Elektrik telleri:</strong> direkler arasındaki teller yazın daha sarkık, kışın daha gergin görünür; teller kışın kopmaması için bir miktar sarkık asılır.",
        "<strong>Sıcak bardağa soğuk su:</strong> kalın cam bardağa kaynar su döküldüğünde iç yüzey dış yüzeyden hızlı genleşir ve oluşan gerilme camı çatlatabilir.",
        "<strong>Diş dolguları:</strong> dolgu malzemelerinin genleşme katsayısının dişe yakın olması, sıcak ve soğuk yiyeceklerde dolgunun gevşememesi için önemlidir.",
        "<strong>Balon ve lastik:</strong> güneşte bırakılan balonun ya da araç lastiğinin basıncı içindeki gazın genleşmesiyle artar."
      ],
      after: [
        "Bir maddeyi belirli bir sıcaklığa getirmek için gereken ısı miktarını hesaplamak isterseniz [[arac:isi-enerjisi-hesapla|Isı Enerjisi Hesaplama]] aracı Q = m · c · ΔT formülünü kullanır. Sıcaklığın alt sınırı olan mutlak sıfır kavramını [[bilgi:mutlak-sifir-nedir-kelvin-rankine|mutlak sıfır]] yazısında bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Isıl genleşme nedir?", "Isıl genleşme, bir maddenin sıcaklığı arttığında parçacıklarının daha fazla titreşip birbirinden uzaklaşması sonucu boyunun, yüzeyinin ve hacminin büyümesidir. Sıcaklık düştüğünde madde büzülür; gazlar en çok, katılar en az genleşir."],
    ["Boyca genleşme nasıl hesaplanır?", "ΔL = L₀ · α · ΔT formülüyle hesaplanır. 25 metrelik çelik bir ray için α = 12 × 10⁻⁶ 1/°C ve ΔT = 50 °C alınırsa ΔL = 25 × 12 × 10⁻⁶ × 50 = 0,015 m, yani 15 mm bulunur."],
    ["Genleşme katsayısı neye bağlıdır?", "Genleşme katsayısı malzemenin cinsine, yani atomları arasındaki bağların yapısına bağlıdır. Çelik için yaklaşık 12, alüminyum için 23, cam için 9 × 10⁻⁶ 1/°C'dir; sıcaklıkla da küçük ölçüde değişir."],
    ["Raylar ve köprüler neden aralıklı yapılır?", "Genleşmesine izin verilmeyen uzun bir yapıda büyük gerilmeler oluşur ve malzeme bükülür ya da çatlar. Derzler bu uzamaya yer açar; 100 metrelik çelik köprü 60 °C farkta yaklaşık 7 cm uzar."],
    ["Suyun 4 °C'deki anormal genleşmesi nedir?", "Su 0 ile 4 °C arasında ısıtılınca büzülür ve en yoğun haline yaklaşık 4 °C'de ulaşır. Donarken hacmi yaklaşık yüzde 9 artar; bu yüzden buz yüzer ve göller yüzeyden donar."],
    ["Bimetal şerit nasıl çalışır?", "Genleşme katsayıları farklı iki metal birbirine bağlanır. Isınınca fazla genleşen metal dışta kalacak şekilde şerit bükülür; bu hareket termostatlarda ve termik korumalarda kontağı açıp kapatmak için kullanılır."],
    ["Hacimce genleşme boyca genleşmenin kaç katıdır?", "Hacimce genleşme katsayısı yaklaşık olarak boyca genleşme katsayısının 3 katıdır, çünkü cisim üç boyutta birden uzar. Yüzeyce genleşme katsayısı ise yaklaşık 2 kat alınır."],
    ["Cam kavanozun kapağı sıcak suyla neden kolay açılır?", "Metal kapağın genleşme katsayısı camınkinden büyüktür. Sıcak suyla ısıtıldığında kapak cam ağızdan daha fazla genişler, aradaki sıkılık ve sürtünme azalır ve kapak daha kolay döner."],
    ["Sıcaklık farkını kelvinle mi santigratla mı yazmalıyım?", "İkisi de aynı sonucu verir, çünkü bir santigrat derecelik aralık bir kelvine eşittir. 50 °C'lik bir sıcaklık değişimi 50 K'dir; yalnızca mutlak sıcaklık gereken formüllerde kelvine çevirmek zorunludur."]
  ],
  tools: ["isil-genlesme-hesapla", "isi-enerjisi-hesapla", "celsius-kelvin-cevir"],
  related: ["isi-ve-sicaklik-farki", "yogunluk-nedir-nasil-hesaplanir", "mutlak-sifir-nedir-kelvin-rankine"]
};
