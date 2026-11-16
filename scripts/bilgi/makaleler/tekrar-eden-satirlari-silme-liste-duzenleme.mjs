export default {
  slug: "tekrar-eden-satirlari-silme-liste-duzenleme",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Tekrar Eden Satırları Silme: Liste Temizleme ve Düzenleme Yolları",
  pageTitle: "Tekrar Eden Satırları Silme: Liste Temizleme Rehberi",
  description: "Tekrar eden satırları silmek için ilk görülen satır tutulur, kopyalar atılır. Harf ve boşluk ayarları, boş satır, Türkçe sıralama ve virgülle birleştirme.",
  keywords: ["tekrar eden satırları silme", "yinelenen satırları kaldırma", "listeden tekrar edenleri silme", "boş satırları silme", "satırları alfabetik sıralama", "listeyi virgülle ayırma", "metin listesi düzenleme", "satır numarası ekleme"],
  lead: "Bir listedeki tekrar eden satırları silmenin mantığı basittir: satırlar yukarıdan aşağı okunur, <strong>ilk kez görülen satır tutulur</strong>, daha önce görülmüş olanlar atılır. Sonucu belirleyen üç ayar vardır: büyük-küçük harf farkının sayılıp sayılmayacağı, satır başındaki ve sonundaki boşlukların yok sayılıp sayılmayacağı ve boş satırların ne olacağı. Bu sayfada bu ayarların sonucu nasıl değiştirdiğini, Excel kullanmadan liste temizlemeyi, sıralama, virgülle birleştirme, numaralama ve sütun ayıklama adımlarını örnek bir listeyle bulacaksınız.",
  kisaCevap: [
    "Tekrarlar silinirken her satırın ilk görüldüğü hâli tutulur; sıra bozulmaz.",
    "Büyük-küçük harf duyarsız modda \"Ankara\" ile \"ankara\" aynı sayılır; duyarlı modda ikisi de kalır.",
    "Satır başı ve sonundaki boşlukları kırpmak, gözle görülmeyen farklardan doğan sahte benzersizlikleri önler.",
    "Türkçe metinlerde harf duyarsız karşılaştırma Türkçe kurallarla yapılmalıdır: İ ile i, I ile ı eşleşir.",
    "Önerilen sıra: boşlukları temizle, boş satırları sil, tekrarları sil, gerekirse sırala.",
    "Alt alta liste virgülle birleştirilerek tek satıra, tek satır da virgülden bölünerek alt alta listeye çevrilebilir."
  ],
  figure: {
    alt: "Sekiz satırlık şehir listesinin temizlenmesi: büyük-küçük harf ve boşluk farkları yok sayılınca Ankara, İzmir, Bursa ve Antalya kalıyor; 3 tekrar ve 1 boş satır siliniyor.",
    caption: "Soldaki listede \"ankara\" küçük harfle, \"İzmir \" sonunda boşlukla yazılmış ve bir satır boş bırakılmıştır. Sağdaki sonuç, harf duyarsız ve boşluk kırpma ayarlarıyla elde edilmiştir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ts" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Tekrar eden satırları silme: örnek</text>
  <rect x="40" y="52" width="250" height="300" rx="8" class="sf sb"/>
  <text x="165" y="78" class="b mid">Girdi (8 satır)</text>
  <g class="sm">
    <text x="60" y="110">1  Ankara</text>
    <text x="60" y="140">2  İzmir</text>
    <text x="60" y="170" class="dg">3  ankara</text>
    <text x="60" y="200">4  Bursa</text>
    <text x="60" y="230" class="dg">5  İzmir·</text>
    <text x="60" y="260" class="mu">6  (boş satır)</text>
    <text x="60" y="290">7  Antalya</text>
    <text x="60" y="320" class="dg">8  Bursa</text>
  </g>
  <line x1="300" y1="200" x2="420" y2="200" class="sp sw" fill="none" marker-end="url(#ts)"/>
  <text x="360" y="176" class="sm mid b">harf duyarsız</text>
  <text x="360" y="226" class="sm mid b">boşluk kırp</text>
  <rect x="430" y="52" width="250" height="180" rx="8" class="oks"/>
  <text x="555" y="78" class="b mid">Sonuç (4 satır)</text>
  <g class="sm">
    <text x="450" y="110">1  Ankara</text>
    <text x="450" y="140">2  İzmir</text>
    <text x="450" y="170">3  Bursa</text>
    <text x="450" y="200">4  Antalya</text>
  </g>
  <rect x="430" y="246" width="250" height="106" rx="8" class="sf sb"/>
  <text x="446" y="272" class="sm">Silinen tekrar: 3 satır</text>
  <text x="446" y="296" class="sm">Silinen boş satır: 1</text>
  <text x="446" y="320" class="sm">En çok tekrar: Ankara, İzmir,</text>
  <text x="446" y="340" class="sm">Bursa (2'şer kez)</text>
  <rect x="40" y="368" width="640" height="38" rx="8" class="dgs"/>
  <text x="60" y="392" class="sm">Harf duyarlı olsaydı "ankara" ayrı sayılır, sonuç 5 satır olurdu.</text>
</svg>`
  },
  sections: [
    {
      h: "Tekrar eden satır neden olur, neden temizlenmeli?",
      p: [
        "Listeler çoğu zaman birden fazla kaynaktan birleştirilerek oluşur: iki farklı tablodan alınan e-posta adresleri, birkaç kişinin ayrı ayrı topladığı katılımcı isimleri, farklı dönemlerden kalan ürün kodları. Birleştirme sırasında aynı kayıt birden fazla kez listeye girer. Bazen kayıtlar aynı görünür ama küçük farklar taşır: büyük-küçük harf, sonda unutulmuş bir boşluk ya da farklı bir tırnak işareti.",
        "Tekrarlar yalnızca listeyi uzatmakla kalmaz, sonuçları da bozar. Aynı kişiye iki kez e-posta gitmesi, bir ürünün stok sayımında iki kez sayılması ya da bir anketin katılımcı sayısının olduğundan yüksek görünmesi bu tür hatalardandır. Bu yüzden bir listeyi kullanmadan önce temizlemek iyi bir alışkanlıktır."
      ]
    },
    {
      h: "Bir listedeki tekrar eden satırlar nasıl silinir?",
      ol: [
        "Listeyi her satıra bir kayıt gelecek biçimde hazırlayın; virgülle ayrılmış listeyi önce alt alta çevirin.",
        "Karşılaştırma kurallarını seçin: büyük-küçük harf farkı önemli mi, satır başı ve sonundaki boşluklar yok sayılsın mı?",
        "Hangi kopyanın kalacağına karar verin: genellikle ilk görülen tutulur; bazı durumlarda son görülen daha güncel olabilir.",
        "Boş satırların korunup korunmayacağını seçin.",
        "Tekrarları silin ve sonucu kontrol edin: kaç satır silindi, en çok tekrar eden kayıt hangisi?",
        "Gerekirse sonucu sıralayın, numaralayın ya da virgülle birleştirin."
      ],
      after: [
        "Bu adımları [[arac:tekrar-eden-satirlari-sil|Tekrar Eden Satırları Silme]] aracında tek ekranda yapabilirsiniz; araç satır sırasını korur, büyük-küçük harf, boşluk ve boş satır seçenekleri sunar ve en çok tekrar eden satırı gösterir. Metin tarayıcınızda işlenir, hiçbir yere gönderilmez."
      ]
    },
    {
      h: "Büyük-küçük harf farkı tekrar sayılır mı?",
      p: [
        "Bu, seçtiğiniz moda bağlıdır. <strong>Harf duyarlı</strong> modda \"Ankara\" ile \"ankara\" farklı satırlardır ve ikisi de kalır. <strong>Harf duyarsız</strong> modda ikisi aynı kabul edilir ve yalnızca ilk görülen hâli tutulur. İsim, şehir ve e-posta listelerinde genellikle duyarsız mod istenir; çünkü bu listelerde harf farkı çoğunlukla yazım alışkanlığından kaynaklanır, farklı bir kaydı göstermez.",
        "Ürün kodları, parolalar ya da büyük-küçük harfin anlam taşıdığı kısaltmalar gibi listelerde ise duyarlı mod tercih edilmelidir. Örneğin \"Ab12\" ve \"AB12\" iki ayrı stok kodu olabilir."
      ],
      table: {
        head: ["Ayar", "Örnek liste sonucu (8 satır)", "Ne zaman kullanılır?"],
        rows: [
          ["Harf duyarsız + boşluk kırp", "4 satır kalır", "İsim, şehir, e-posta listeleri"],
          ["Harf duyarlı + boşluk kırp", "5 satır kalır (\"ankara\" ayrı)", "Kod ve kısaltma listeleri"],
          ["Harf duyarsız + boşluklar aynen", "5 satır kalır (\"İzmir \" ayrı)", "Boşluğun anlam taşıdığı özel veriler"],
          ["Harf duyarlı + boşluklar aynen", "6 satır kalır", "Birebir aynı satırları silmek için"]
        ],
        caption: "Her durumda boş satırın silindiği kabul edilmiştir. Örnek liste görseldeki sekiz satırdır."
      }
    },
    {
      h: "Türkçe harflerde dikkat edilmesi gereken nokta",
      p: [
        "Türkçede noktalı ve noktasız i iki ayrı harftir: büyük İ'nin küçüğü i, büyük I'nın küçüğü ı'dır. Birçok yazılım büyük-küçük harf dönüşümünü İngilizce kurallarla yapar ve I'yı i'ye çevirir. Bu durumda \"ISPARTA\" ile \"ısparta\" eşleşmezken, \"KIRIKKALE\" küçültüldüğünde yanlışlıkla \"kirikkale\" olur ve gerçek \"kırıkkale\" ile eşleşmez.",
        "Türkçe listelerde harf duyarsız karşılaştırmanın Türkçe kurallarla yapılması bu yüzden önemlidir. Sitedeki metin araçları Türkçe büyük-küçük harf kurallarını kullanır. Metniniz farklı bir sistemden geldiyse ve Türkçe karakterler bozuk görünüyorsa önce [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu nasıl düzeltilir]] yazısındaki adımlarla karakterleri düzeltin; aksi hâlde aynı kelimenin bozuk ve doğru hâli ayrı satır sayılır."
      ]
    },
    {
      h: "Boş satırlar tek seferde nasıl silinir?",
      p: [
        "Boş satırlar, kopyala-yapıştır sırasında ya da paragraflar arasında kalan boşluklardan oluşur. Tamamen boş görünen bir satır bazen yalnızca boşluk ya da sekme karakteri içerir; bu tür satırların da boş sayılması için boşluk kırpma seçeneğinin açık olması gerekir. Tekrar silme işleminden önce boş satırları temizlemek, sonucu daha düzenli hâle getirir.",
        "Yalnızca boş satırları silmek, tekrarlara dokunmamak istiyorsanız [[arac:bos-satirlari-sil|Boş Satırları Silme]] aracını kullanabilirsiniz. Satır içindeki fazla boşlukları, art arda gelen birden fazla boşluğu ya da sekmeleri temizlemek ayrı bir işlemdir ve sitedeki boşluk temizleme aracıyla yapılabilir."
      ]
    },
    {
      h: "E-posta ve telefon listelerinde özel durumlar",
      p: [
        "E-posta adreslerinde büyük-küçük harf pratikte fark yaratmadığı için listeyi harf duyarsız modda temizlemek doğru sonuç verir. Ancak adreslerin başında ya da sonunda kalan boşluklar, satır sonundaki virgül ya da noktalı virgül ve köşeli parantez içinde yazılmış isimler aynı adresi farklı gösterebilir. Bu yüzden önce adresleri metinden ayıklamak, sonra tekrarları silmek daha güvenilirdir.",
        "Telefon numaralarında ise aynı numara 0532 ile başlayan, +90 ülke koduyla yazılmış ya da boşluksuz biçimde yazılmış olabilir. Satır karşılaştırması bu biçimleri farklı sayar. Tekrar silmeden önce tüm numaraları tek bir biçime getirmek, örneğin boşlukları ve ülke kodunu kaldırmak, gerçek tekrarların bulunmasını sağlar. Kişisel veri içeren listeleri yalnızca tarayıcıda çalışan, veriyi dışarı göndermeyen araçlarla işlemek gizlilik açısından da önemlidir."
      ]
    },
    {
      h: "Excel kullanmadan yinelenenler nasıl kaldırılır?",
      p: [
        "Elektronik tablo programlarının yinelenenleri kaldırma özelliği tablo biçimindeki verilerde çok kullanışlıdır. Ancak elinizdeki veri bir e-postadan, bir web sayfasından ya da bir mesajlaşma uygulamasından kopyalanmış düz bir listeyse, onu önce tabloya aktarmak, sütun ayarlamak ve sonra geri kopyalamak zaman alır. Tarayıcıda çalışan metin araçları bu tür listelerde daha hızlıdır.",
        "Tablo verisinde yalnızca belirli bir sütundaki tekrarlara bakmak istiyorsanız önce o sütunu ayıklayın. Sekmeyle, noktalı virgülle ya da virgülle ayrılmış satırlardan belirli bir sütunu almak için sitedeki sütun ayıklama aracını kullanabilir, sonra yalnızca o sütunda tekrar silebilirsiniz. Böylece aynı kişinin farklı satırlarda farklı telefon numarasıyla geçtiği durumları da fark edebilirsiniz."
      ]
    },
    {
      h: "Satırlar alfabetik nasıl sıralanır?",
      p: [
        "Tekrarları sildikten sonra listeyi alfabetik sıralamak, okunurluğu artırır ve gözle kontrolü kolaylaştırır. Türkçe sıralamada harflerin Türk alfabesindeki yeri esas alınmalıdır: ç, c'den sonra; ğ, g'den sonra; ı, h'den sonra ve i'den önce; ö, o'dan sonra; ş, s'den sonra; ü, u'dan sonra gelir. İngilizce kurallarla yapılan sıralama \"Çorum\"u listenin sonuna atabilir."
      ],
      after: [
        "Türkçe kurallara göre A'dan Z'ye ya da Z'den A'ya sıralamak için [[arac:alfabetik-sirala|Alfabetik Sıralama]] aracını kullanabilirsiniz. Türk alfabesindeki harf sırası için [[bilgi:turk-alfabesi-kac-harf|Türk alfabesi kaç harf]] yazısına bakabilirsiniz. Satırların ilk görülme sırasının önemli olduğu listelerde (örneğin başvuru sırası) sıralama yapmayın; tekrar silme işlemi sırayı zaten korur."
      ]
    },
    {
      h: "Alt alta liste virgüllü metne nasıl çevrilir? Numara nasıl eklenir?",
      p: [
        "Bir e-posta alıcı alanına, bir veritabanı sorgusuna ya da bir form alanına yapıştırmak için alt alta listeyi tek satırda virgülle ayrılmış hâle getirmek sık gereken bir işlemdir. Ters yönde, virgülle ayrılmış bir metni alt alta listeye çevirmek de tekrar silme ve sıralama işlemlerinden önce yapılması gereken ilk adımdır. Bu dönüşümlerde öğelerin başına ve sonuna tırnak eklemek ya da öğeleri parantez içine almak gibi seçenekler de işe yarar."
      ],
      ul: [
        "Liste → virgüllü metin: \"Ankara, İzmir, Bursa, Antalya\".",
        "Tırnaklı biçim: \"'Ankara', 'İzmir', 'Bursa', 'Antalya'\" (sorgular için).",
        "Virgüllü metin → liste: her virgülde yeni satır.",
        "Numaralı liste: \"1. Ankara\", \"2. İzmir\" …"
      ],
      after: [
        "Bu dönüşümler için [[arac:liste-virgul-donustur|Listeyi Virgüllü Metne Çevirme]] aracını, satırların başına sıra numarası eklemek için [[arac:satir-numarasi-ekle|Satır Numarası Ekleme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Önerilen temizleme sırası ve sık yapılan hatalar",
      ol: [
        "Bozuk Türkçe karakterleri düzeltin.",
        "Satır başı ve sonundaki boşlukları kırpın.",
        "Boş satırları silin.",
        "Tekrarları silin (çoğu listede harf duyarsız).",
        "Gerekirse sıralayın, numaralayın ya da virgülle birleştirin."
      ],
      ul: [
        "<strong>Sıralamayı tekrar silmeden önce yapmak:</strong> Sorun değildir ama ilk görülme sırası kaybolur.",
        "<strong>Boşlukları kırpmamak:</strong> \"İzmir\" ile \"İzmir \" ayrı satır sayılır.",
        "<strong>Kod listelerinde harf duyarsız mod kullanmak:</strong> Farklı kodlar yanlışlıkla silinebilir.",
        "<strong>Sonucu kontrol etmemek:</strong> Silinen satır sayısını kaynakla karşılaştırın; beklenenden çok fazla satır silindiyse ayarları gözden geçirin.",
        "<strong>Asıl listeyi yedeklememek:</strong> Temizlemeden önce orijinal metni bir yere kaydedin."
      ]
    }
  ],
  faq: [
    ["Bir listedeki tekrar eden satırlar nasıl silinir?", "Liste her satıra bir kayıt gelecek biçimde hazırlanır, karşılaştırma ayarları seçilir ve satırlar yukarıdan aşağı okunarak ilk görülen hâller tutulur, kopyalar atılır. Bu işlem satır sırasını bozmaz."],
    ["Excel kullanmadan yinelenenler nasıl kaldırılır?", "Listeyi tarayıcıda çalışan bir tekrar silme aracına yapıştırıp ayarları seçmek yeterlidir. Tablo verisinde belirli bir sütuna bakmak istiyorsanız önce o sütunu ayıklayıp yalnızca onda tekrar silebilirsiniz."],
    ["Boş satırlar tek seferde nasıl silinir?", "Boş satır silme işlemiyle tüm boş satırlar bir kerede çıkarılır. Yalnızca boşluk ya da sekme içeren satırların da silinmesi için satır başı ve sonundaki boşlukları kırpma seçeneğinin açık olması gerekir."],
    ["Satırlar alfabetik nasıl sıralanır?", "Satırlar Türk alfabesindeki harf sırasına göre A'dan Z'ye ya da Z'den A'ya sıralanır. Ç, Ğ, I, Ö, Ş ve Ü harflerinin doğru yere yerleşmesi için sıralamanın Türkçe kurallarla yapılması gerekir."],
    ["Alt alta liste virgüllü metne nasıl çevrilir?", "Satır sonları virgül ve boşlukla değiştirilerek liste tek satıra çevrilir. Gerekirse her öğe tırnak içine alınabilir; ters işlemde ise her virgülde yeni satıra geçilerek alt alta liste elde edilir."],
    ["Satırların başına numara nasıl eklenir?", "Satır numarası ekleme aracıyla her satırın başına 1, 2, 3 biçiminde sıra numarası eklenir. Numarayı tekrar silme ve sıralamadan sonra eklemek, sonradan numaraların karışmasını önler."],
    ["Büyük/küçük harf farkı tekrar sayılır mı?", "Harf duyarlı modda Ankara ve ankara ayrı satırlardır, harf duyarsız modda aynı sayılır. İsim ve e-posta listelerinde duyarsız, büyük-küçük harfin anlam taşıdığı kod listelerinde duyarlı mod tercih edilmelidir."],
    ["Metinden belirli bir sütun nasıl ayıklanır?", "Sekme, virgül ya da noktalı virgülle ayrılmış satırlarda ayırıcı ve sütun numarası seçilerek yalnızca istenen sütun alınır. Ardından bu sütunda tekrar silme, sıralama gibi işlemler ayrıca yapılabilir."],
    ["Tekrar silerken hangi kopya kalır?", "Varsayılan olarak her satırın ilk görüldüğü hâli kalır ve liste sırası korunur. Listenin sonundaki kayıtlar daha güncelse son görülen hâli tutma seçeneği tercih edilebilir."]
  ],
  tools: ["tekrar-eden-satirlari-sil", "bos-satirlari-sil", "alfabetik-sirala", "liste-virgul-donustur", "satir-numarasi-ekle", "sutun-ayikla"],
  related: ["turkce-karakter-sorunu-nasil-duzeltilir", "turk-alfabesi-kac-harf", "regex-nedir-duzenli-ifade-ornekleri", "lorem-ipsum-nedir-ne-ise-yarar"]
};
