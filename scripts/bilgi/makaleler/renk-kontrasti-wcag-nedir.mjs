export default {
  slug: "renk-kontrasti-wcag-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Renk Kontrastı Nedir? WCAG Oranı 4,5:1 ve Okunabilir Renk Seçimi",
  pageTitle: "Renk Kontrastı Nedir? WCAG 4,5:1 Oranı ve AA, AAA Farkı",
  description: "Renk kontrastı yazı ile zemin arasındaki parlaklık farkıdır. WCAG'ye göre normal metin en az 4,5:1, büyük metin 3:1 olmalı; formül, örnek hesap ve renk seçimi.",
  keywords: ["renk kontrastı nedir", "wcag kontrast oranı", "4.5:1 ne demek", "erişilebilir renk seçimi", "yazı arka plan rengi uyumu", "aa aaa farkı", "kontrast oranı hesaplama", "renk körü tasarım"],
  lead: "Renk kontrastı, yazı ya da simge rengi ile arka plan rengi arasındaki <strong>bağıl parlaklık farkıdır</strong> ve WCAG standardında 1:1 (fark yok) ile 21:1 (siyah üzerine beyaz) arasında bir oranla ifade edilir. Normal boyuttaki metnin AA düzeyinde okunur sayılması için en az <strong>4,5:1</strong>, büyük metnin en az 3:1 oranı gerekir. Bu sayfada oranın nasıl hesaplandığını, AA ile AAA farkını, hangi renk çiftlerinin geçip hangilerinin kaldığını ve renk körlüğünü hesaba katan pratik tasarım kurallarını örneklerle bulacaksınız.",
  kisaCevap: [
    "Kontrast oranı = (açık rengin bağıl parlaklığı + 0,05) ÷ (koyu rengin bağıl parlaklığı + 0,05); sonuç 1 ile 21 arasındadır.",
    "WCAG AA: normal metin en az 4,5:1, büyük metin (24 px ya da 18,66 px kalın ve üstü) en az 3:1.",
    "WCAG AAA: normal metin en az 7:1, büyük metin en az 4,5:1.",
    "Düğme kenarı, form kutusu ve simge gibi metin dışı arayüz öğeleri komşu renge karşı en az 3:1 olmalıdır.",
    "Beyaz zeminde 4,5:1 sınırını geçen en açık düz gri #767676'dır (4,54:1); #777777 ise 4,48:1 ile kalır.",
    "Oran yuvarlanmaz: 4,48:1 sonucu 4,5:1 sayılmaz, AA'dan kalır."
  ],
  figure: {
    alt: "Kontrast oranı cetveli: 1:1 ile 21:1 arası ölçek üzerinde 3:1, 4,5:1 ve 7:1 eşikleri işaretli; altında beyaz zemin üzerinde dört gri tonun oranları ve AA sonucu gösteriliyor.",
    caption: "Üstteki cetvel WCAG eşiklerini gösterir; ölçek doğrusal değildir, oran 1'den 21'e çıkar. Alttaki örneklerde beyaz zemine yazılan gri tonlar koyulaştıkça oran artar: #999999 kalır, #767676 sınırı kıl payı geçer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kontrast oranı cetveli ve eşikler</text>
  <rect x="40" y="62" width="640" height="26" rx="6" class="sf sb"/>
  <rect x="40" y="62" width="96" height="26" rx="6" class="dgs"/>
  <rect x="136" y="62" width="62" height="26" class="ps"/>
  <rect x="198" y="62" width="96" height="26" class="oks"/>
  <rect x="294" y="62" width="386" height="26" rx="6" class="ok"/>
  <g class="sm mid">
    <text x="40" y="108">1:1</text>
    <text x="136" y="108" class="b">3:1</text>
    <text x="198" y="108" class="b">4,5:1</text>
    <text x="294" y="108" class="b">7:1</text>
    <text x="680" y="108">21:1</text>
  </g>
  <g class="sm">
    <text x="44" y="134" class="dg b">yetersiz</text>
    <text x="138" y="134">büyük metin AA</text>
    <text x="200" y="152" class="ok b">normal metin AA</text>
    <text x="300" y="134" class="ok b">normal metin AAA</text>
  </g>
  <text x="40" y="190" class="b">Beyaz zemin üzerinde gri yazı</text>
  <rect x="40" y="206" width="150" height="120" rx="8" class="sf sb"/>
  <text x="115" y="246" class="lg b mid mu">Gri 999999</text>
  <text x="115" y="276" class="b mid">2,85 : 1</text>
  <text x="115" y="304" class="sm mid dg b">AA kaldı</text>
  <rect x="200" y="206" width="150" height="120" rx="8" class="sf sb"/>
  <text x="275" y="246" class="lg b mid t2">Gri 808080</text>
  <text x="275" y="276" class="b mid">3,95 : 1</text>
  <text x="275" y="304" class="sm mid b">yalnız büyük metin</text>
  <rect x="360" y="206" width="150" height="120" rx="8" class="oks"/>
  <text x="435" y="246" class="lg b mid t2">Gri 767676</text>
  <text x="435" y="276" class="b mid">4,54 : 1</text>
  <text x="435" y="304" class="sm mid ok b">AA geçti</text>
  <rect x="520" y="206" width="160" height="120" rx="8" class="oks"/>
  <text x="600" y="246" class="lg b mid">Gri 595959</text>
  <text x="600" y="276" class="b mid">7,00 : 1</text>
  <text x="600" y="304" class="sm mid ok b">AAA geçti</text>
  <rect x="40" y="346" width="640" height="54" rx="8" class="p"/>
  <text x="360" y="370" class="b mid sf">Oran = (L açık + 0,05) ÷ (L koyu + 0,05)</text>
  <text x="360" y="390" class="sm mid sf">Beyaz L = 1 · Gri 767676 L = 0,1812 → 1,05 ÷ 0,2312 = 4,54</text>
</svg>`
  },
  sections: [
    {
      h: "Renk kontrastı nedir, neden önemlidir?",
      p: [
        "Bir metni okuyabilmemiz için harflerin zeminden ayrışması gerekir. Bu ayrışmayı sağlayan şey renklerin tonu değil, <strong>parlaklık farkıdır</strong>. Kırmızı ile yeşil çok farklı renkler gibi görünse de parlaklıkları birbirine yakınsa, özellikle renk körlüğü olan biri için yazı neredeyse kaybolur. Bu nedenle erişilebilirlik standartları kontrastı renk tonuyla değil, parlaklık oranıyla ölçer.",
        "Düşük kontrast yalnızca görme engelli kullanıcıları etkilemez. Güneş altında telefon ekranına bakan, parlaklığı düşük bir dizüstü bilgisayar kullanan ya da yaşı ilerledikçe kontrast duyarlılığı azalan herkes açık gri yazılarda zorlanır. Okunması zor bir form, düğme ya da fiyat etiketi doğrudan dönüşüm kaybı demektir.",
        "Uluslararası ölçüt, W3C'nin yayımladığı <strong>WCAG</strong> (Web İçeriği Erişilebilirlik Yönergeleri) belgesidir. Türkiye'de kamu kurumlarının web sitelerine yönelik erişilebilirlik çalışmaları da büyük ölçüde bu yönergeleri esas alır."
      ]
    },
    {
      h: "WCAG kontrast oranı nasıl hesaplanır?",
      p: [
        "Hesap iki adımdan oluşur. Önce her rengin <strong>bağıl parlaklığı</strong> (L) bulunur; bu, rengin insan gözüne ne kadar aydınlık göründüğünü 0 (siyah) ile 1 (beyaz) arasında gösteren sayıdır. Sonra iki parlaklık aşağıdaki oran formülüne konur. Formüldeki 0,05 eklemesi, ekranın yansıttığı ortam ışığını temsil eder ve siyahta sıfıra bölmeyi önler."
      ],
      formula: "1) Her kanal için: c = değer ÷ 255\n   c ≤ 0,03928 ise doğrusal = c ÷ 12,92\n   değilse doğrusal = ((c + 0,055) ÷ 1,055)^2,4\n2) L = 0,2126 × R + 0,7152 × G + 0,0722 × B\n3) Kontrast oranı = (L açık + 0,05) ÷ (L koyu + 0,05)",
      after: [
        "Ağırlıklara dikkat edin: yeşil kanal parlaklığın yaklaşık %72'sini, kırmızı %21'ini, mavi ise yalnızca %7'sini belirler. Bu yüzden saf mavi (#0000FF) gözümüze canlı gelse de koyu bir renktir ve beyaz zeminde 8,59:1 gibi yüksek bir oran verir; saf sarı ise beyaz zeminde neredeyse okunmaz.",
        "Renk kodlarının RGB değerlerine nasıl ayrıldığını bilmiyorsanız önce [[bilgi:hex-rgb-renk-kodlari-nedir|HEX ve RGB renk kodları]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: #767676 gri, beyaz zeminde",
      p: [
        "Gri tonlarda üç kanal eşit olduğu için hesap kısalır. #767676 kodunda her kanal onaltılık 76, yani onluk 118'dir. Adımları sırayla uygulayalım."
      ],
      ol: [
        "Kanalı 0–1 aralığına getirin: 118 ÷ 255 = 0,4627.",
        "0,03928'den büyük olduğu için üstel formülü kullanın: (0,4627 + 0,055) ÷ 1,055 = 0,4907; 0,4907<sup>2,4</sup> ≈ 0,1812.",
        "Üç kanal eşit olduğundan L = 0,1812 × (0,2126 + 0,7152 + 0,0722) = 0,1812.",
        "Beyazın parlaklığı L = 1'dir. Oran = (1 + 0,05) ÷ (0,1812 + 0,05) = 1,05 ÷ 0,2312 ≈ 4,54.",
        "Sonuç 4,5'ten büyük: normal metin için AA düzeyini geçer, 7'nin altında olduğu için AAA'yı geçemez."
      ],
      after: [
        "Bir ton açığı olan #777777 ile aynı hesabı yaparsanız oran 4,48:1 çıkar. WCAG oranı yukarı yuvarlamaya izin vermez; 4,48 sonucu \"yaklaşık 4,5\" sayılmaz ve AA'dan kalır. Sınırda çalışırken her zaman hesaplanan değere bakın."
      ]
    },
    {
      h: "AA ve AAA seviyesi farkı nedir?",
      p: [
        "WCAG uyumluluğu üç düzeyde tanımlanır: A, AA ve AAA. Kontrast ölçütleri AA ve AAA düzeyindedir. Kurumların ve yasal düzenlemelerin çoğu <strong>AA</strong> düzeyini hedef alır; AAA daha katıdır ve tüm içerik için zorunlu tutulması genellikle önerilmez, ancak uzun metinlerde ve yaşlı kullanıcıların yoğun olduğu hizmetlerde iyi bir hedeftir."
      ],
      table: {
        head: ["Öğe", "AA (asgari)", "AAA (gelişmiş)", "Not"],
        rows: [
          ["Normal metin", "4,5:1", "7:1", "Gövde yazısı, form etiketleri, bağlantılar"],
          ["Büyük metin", "3:1", "4,5:1", "24 px ve üstü ya da 18,66 px ve üstü kalın"],
          ["Arayüz bileşenleri ve grafik öğeler", "3:1", "tanımlı değil", "Düğme kenarı, giriş kutusu, simge, grafik çizgisi"],
          ["Logo ve süs yazısı", "şart yok", "şart yok", "Marka adı ve işlevsiz süs öğeleri muaftır"],
          ["Pasif (devre dışı) öğeler", "şart yok", "şart yok", "Yine de okunabilir tutmak iyi uygulamadır"]
        ],
        caption: "Büyük metin eşiği WCAG'de 18 punto ya da 14 punto kalın olarak tanımlanır; ekranda yaklaşık 24 px ve 18,66 px'e karşılık gelir."
      },
      after: [
        "Metin dışı öğeler için 3:1 kuralı sıkça gözden kaçar. Beyaz zeminde açık gri kenarlı bir form kutusu, içindeki yazı ne kadar koyu olursa olsun kutunun sınırı görülemediği için sorun yaratır. Odak halkası (klavyeyle gezinirken seçili öğenin etrafındaki çerçeve) da bu kurala girer."
      ]
    },
    {
      h: "Hangi yazı ve arka plan renkleri okunur?",
      p: [
        "Aşağıdaki tablo sık kullanılan renk çiftlerinin oranlarını gösterir. Değerler yukarıdaki formülle hesaplanmıştır; kendi markanızın renklerini denemek için hesaplama aracını kullanabilirsiniz."
      ],
      table: {
        head: ["Yazı", "Zemin", "Oran", "Normal metin"],
        rows: [
          ["#000000 siyah", "#FFFFFF beyaz", "21:1", "AAA geçer"],
          ["#333333 koyu gri", "#FFFFFF beyaz", "12,63:1", "AAA geçer"],
          ["#0000FF mavi", "#FFFFFF beyaz", "8,59:1", "AAA geçer"],
          ["#008000 yeşil", "#FFFFFF beyaz", "5,14:1", "AA geçer"],
          ["#FF0000 kırmızı", "#FFFFFF beyaz", "4,00:1", "AA kalır (yalnız büyük metin)"],
          ["#FF0000 kırmızı", "#000000 siyah", "5,25:1", "AA geçer"],
          ["#FFC107 sarı", "#FFFFFF beyaz", "1,63:1", "Okunmaz"],
          ["#FFC107 sarı", "#000000 siyah", "12,88:1", "AAA geçer"],
          ["#00FF00 yeşil", "#FF0000 kırmızı", "2,91:1", "Kalır, renk körlerinde görünmez"]
        ]
      },
      after: [
        "Tablodan iki ders çıkar. Birincisi, saf kırmızı beyaz zeminde gövde metni için yetersizdir; uyarı yazılarında daha koyu bir kırmızı seçmek gerekir. İkincisi, sarı gibi açık renkler beyaz değil koyu zemin ister: sarı uyarı şeridinin üzerine siyah yazı yazmak bu yüzden yaygındır."
      ]
    },
    {
      h: "Renk körleri için tasarım nasıl yapılır?",
      p: [
        "Erkeklerin yaklaşık %8'inde, kadınların yaklaşık %0,5'inde bir tür renk görme bozukluğu bulunur; en yaygını kırmızı-yeşil ayrımının zayıflamasıdır. Bu kullanıcılar için yüksek kontrast tek başına yetmez; bilginin yalnızca renkle verilmemesi de gerekir. WCAG bunu ayrı bir ölçüt olarak tanımlar: renk, bilgiyi ileten tek görsel araç olmamalıdır."
      ],
      ul: [
        "Hatalı form alanını yalnızca kırmızı kenarla değil, yanına bir simge ve \"Bu alan zorunludur\" gibi bir metinle işaretleyin.",
        "Grafiklerde serileri renk yanında çizgi tipi (düz, kesikli), işaret şekli ya da doğrudan etiketle ayırın.",
        "Metin içindeki bağlantıları yalnızca renkle değil alt çizgiyle de belirtin; alt çizgi yoksa bağlantı rengi çevre metne karşı en az 3:1 fark taşımalıdır.",
        "Başarılı ve hatalı durumu yeşil-kırmızı ikilisiyle göstermek yerine mavi-turuncu gibi renk körlerinin ayırt edebildiği çiftleri tercih edin.",
        "Tasarımı gri tonlamaya çevirip bakın: renkler kalktığında bilgi hâlâ anlaşılıyorsa doğru yoldasınız."
      ]
    },
    {
      h: "Uyumlu ve erişilebilir renk paleti nasıl seçilir?",
      p: [
        "Estetik uyum ile okunabilirlik farklı şeylerdir. Renk çemberindeki tamamlayıcı, analog ya da üçlü kurallar birbirine yakışan renkleri bulur ama bu renklerin yazı-zemin çifti olarak okunacağını garanti etmez. Pratik yöntem, paleti önce uyum için kurup ardından her yazı-zemin eşleşmesini kontrast için test etmektir.",
        "Markanızın ana rengi kontrast için fazla açıksa onu tamamen bırakmanız gerekmez. Ana rengi geniş alanlarda, süs öğelerinde ve büyük başlıklarda kullanın; gövde metni ve küçük bağlantılar için aynı tonun daha koyu bir türevini seçin. Koyu tema tasarlıyorsanız saf siyah yerine çok koyu gri, saf beyaz yerine hafif kırık beyaz kullanmak göz yorgunluğunu azaltır; oranlar yine 4,5:1'in üzerinde kalmalıdır.",
        "Baskı işlerinde kontrast mantığı aynıdır ama renkler ekranda olduğundan farklı çıkabilir; ekran ile baskı renk sistemlerinin farkı için [[bilgi:cmyk-ve-rgb-farki-baski|CMYK ve RGB farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Kontrast oranını araçla hesaplama",
      ol: [
        "[[arac:renk-kontrast-hesapla|Renk Kontrast Hesaplama (WCAG)]] aracına yazı rengini ve arka plan rengini HEX kodu olarak girin.",
        "Araç oranı, normal ve büyük metin için AA ile AAA sonucunu ve canlı bir önizlemeyi gösterir; sonuç yetersizse en yakın okunur renk önerisine bakın.",
        "Renk körlüğü simülasyonuyla tasarımınızın farklı görme türlerinde nasıl göründüğünü kontrol edin.",
        "RGB değeriyle çalışıyorsanız [[arac:hex-rgb-cevir|HEX RGB Renk Çevirici]] ile kodu dönüştürün.",
        "Ana renginize uyan tonları [[arac:renk-paleti-olustur|Uyumlu Renk Paleti Oluşturma]] aracıyla üretip her çifti yeniden kontrast aracında test edin."
      ],
      after: [
        "Tüm hesaplar tarayıcınızda yapılır; girdiğiniz renk kodları bir sunucuya gönderilmez."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Gözle karar vermek:</strong> Parlak bir ekranda okunur görünen açık gri, düşük kaliteli bir ekranda ya da güneş altında kaybolur. Oranı mutlaka hesaplayın.",
        "<strong>Placeholder metnini etiket yerine kullanmak:</strong> Form kutusundaki soluk ipucu yazısı çoğunlukla 4,5:1'in altındadır ve yazmaya başlayınca kaybolur.",
        "<strong>Görsel üzerine yazı:</strong> Fotoğrafın açık ve koyu bölgeleri değiştiği için oran yer yer düşer. Yazının arkasına yarı saydam koyu bir katman ekleyin.",
        "<strong>Saydamlığı unutmak:</strong> Yarı saydam bir yazı rengi, zeminle karıştıktan sonraki gerçek renge göre değerlendirilmelidir.",
        "<strong>Yalnızca metni test etmek:</strong> Düğme kenarları, odak halkaları ve simgeler de 3:1 kuralına tabidir."
      ]
    }
  ],
  faq: [
    ["Renk kontrastı nedir?", "Renk kontrastı, yazı ya da simge rengi ile arka plan rengi arasındaki bağıl parlaklık farkıdır. WCAG standardında 1:1 ile 21:1 arasında bir oranla ölçülür ve oran büyüdükçe metin daha kolay okunur."],
    ["WCAG kontrast oranı nasıl hesaplanır?", "Önce her rengin RGB kanalları doğrusal değere çevrilir ve 0,2126 R + 0,7152 G + 0,0722 B ile bağıl parlaklık bulunur. Ardından açık rengin parlaklığına 0,05 eklenip koyu rengin parlaklığı artı 0,05'e bölünür."],
    ["4,5:1 oranı neden önemlidir?", "4,5:1, WCAG'nin normal boyuttaki metin için AA düzeyinde istediği en düşük orandır. Bu eşik, orta düzeyde görme kaybı olan ya da kontrast duyarlılığı azalmış kişilerin metni ek bir yardımcı teknoloji olmadan okuyabilmesi için belirlenmiştir."],
    ["AA ve AAA seviyesi farkı nedir?", "AA düzeyi normal metin için 4,5:1, büyük metin için 3:1 ister ve yasal düzenlemelerin çoğunun hedefidir. AAA düzeyi daha katıdır; normal metinde 7:1, büyük metinde 4,5:1 oranı gerektirir."],
    ["Hangi yazı ve arka plan renkleri okunur?", "Beyaz zeminde siyah, koyu gri, lacivert ve koyu yeşil yazılar rahatça AA düzeyini geçer. Sarı, açık gri ve saf kırmızı beyaz zeminde yetersiz kalır; sarı gibi açık renkler koyu zeminle birlikte kullanılmalıdır."],
    ["Renk körleri için tasarım nasıl yapılır?", "Yüksek kontrastın yanında bilgiyi yalnızca renkle vermemek gerekir. Hata mesajlarında simge ve metin, grafiklerde çizgi tipi ya da etiket, bağlantılarda alt çizgi kullanmak renk görme bozukluğu olan kullanıcıların içeriği anlamasını sağlar."],
    ["HEX kodu RGB'ye nasıl çevrilir?", "Altı haneli HEX kodu ikişerli üç gruba ayrılır ve her grup onaltılık sistemden onluğa çevrilir. Örneğin #767676 kodunda her grup 76'dır ve onluk karşılığı 118 olduğundan renk RGB(118, 118, 118) olarak yazılır."],
    ["Uyumlu renk paleti nasıl seçilir?", "Önce renk çemberi kurallarıyla (tamamlayıcı, analog, üçlü) birbirine yakışan tonları belirleyin, ardından yazı ve zemin olarak kullanacağınız her çifti kontrast aracında test edin. Gerekirse ana rengin koyu bir türevini gövde metninde kullanın."],
    ["Büyük metin kaç piksel sayılır?", "WCAG büyük metni 18 punto ya da 14 punto kalın olarak tanımlar. Ekranda bu yaklaşık 24 piksel normal ya da 18,66 piksel kalın yazıya karşılık gelir; bu boyutlarda AA için 3:1 oran yeterlidir."]
  ],
  tools: ["renk-kontrast-hesapla", "hex-rgb-cevir", "renk-paleti-olustur"],
  related: ["hex-rgb-renk-kodlari-nedir", "cmyk-ve-rgb-farki-baski"],
  sources: [
    ["W3C – WCAG 2.2 Başarı Ölçütü 1.4.3 Kontrast (Asgari)", "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"],
    ["W3C – Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.2", "https://www.w3.org/TR/WCAG22/"]
  ]
};
