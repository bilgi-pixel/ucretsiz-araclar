export default {
  slug: "ters-yazi-nasil-yazilir-ayna-yazisi",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Ters Yazı Nasıl Yazılır? Ayna Yazısı, Kelimeleri ve Satırları Ters Çevirme",
  pageTitle: "Ters Yazı Nasıl Yazılır? Ayna Yazısı ve Metni Ters Çevirme",
  description: "Ters yazı harfleri sondan başa dizmektir; ayna yazısı ise harflerin şeklini de yansıtır. Kelime ve satır sırasını çevirme, palindrom ve Türkçe karakterler.",
  keywords: ["ters yazı", "ayna yazısı", "ters yazı çevirici", "yazıyı tersten yazma", "kelimeleri ters çevirme", "satırları ters sıralama", "baş aşağı yazı", "ambulans neden ters yazılır"],
  lead: "Ters yazı, bir metnin harflerini son harften ilk harfe doğru yeniden dizmektir: \"Bilişim\" kelimesi tersten \"mişiliB\" olur. Ayna yazısı bundan farklıdır; harflerin sırasıyla birlikte şekilleri de yatay olarak yansıtılır ve metin ancak aynada düz okunur. Bu sayfada harf, kelime ve satır düzeyinde ters çevirmenin farkını, ayna ve baş aşağı yazının nasıl oluştuğunu, ambulanslardaki ters yazının nedenini, palindrom denetimini ve Türkçe karakterlerde dikkat edilmesi gerekenleri bulacaksınız.",
  kisaCevap: [
    "Harf düzeyinde ters çevirme her karakteri sondan başa dizer: \"kitap\" → \"patik\".",
    "Kelime düzeyinde ters çevirme yalnızca kelimelerin sırasını değiştirir, harfler aynı kalır: \"bugün hava güzel\" → \"güzel hava bugün\".",
    "Satır düzeyinde ters çevirme alt alta yazılmış listenin son satırını başa alır; satırların içi değişmez.",
    "Ayna yazısı harflerin şeklini de yansıtır; klavyeyle değil, görüntüyü yatay çevirerek ya da elle yazılarak elde edilir.",
    "Palindrom, boşluk ve noktalama yok sayıldığında tersi kendisine eşit olan ifadedir: \"kabak\", \"Ey Edip Adana'da pide ye\"."
  ],
  figure: {
    alt: "Aynı cümlenin dört farklı ters çevrilişi: harf harf ters, kelime sırası ters, satır sırası ters ve ayna yazısı; her birinin altında ne değiştiği yazıyor.",
    caption: "Ters çevirmenin dört türü farklı sonuç verir. Harf ve kelime düzeyi klavye metnini değiştirir; ayna yazısı ise harflerin görüntüsünü yansıtır ve metin olarak kopyalanamaz.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir metni ters çevirmenin dört yolu</text>
  <rect x="20" y="48" width="680" height="44" rx="8" class="p"/>
  <text x="40" y="76" class="b sf">Kaynak:</text>
  <text x="140" y="76" class="lg sf">bugün hava güzel</text>
  <rect x="20" y="108" width="330" height="128" rx="8" class="sf sb"/>
  <text x="36" y="134" class="b p">1. Harf harf ters</text>
  <text x="36" y="170" class="lg b">lezüg avah nügub</text>
  <text x="36" y="200" class="sm t2">Her karakter sondan başa dizilir.</text>
  <text x="36" y="220" class="sm t2">Okunmaz ama metin olarak kopyalanır.</text>
  <rect x="370" y="108" width="330" height="128" rx="8" class="sf sb"/>
  <text x="386" y="134" class="b p">2. Kelime sırası ters</text>
  <text x="386" y="170" class="lg b">güzel hava bugün</text>
  <text x="386" y="200" class="sm t2">Kelimeler yer değiştirir,</text>
  <text x="386" y="220" class="sm t2">harfler bozulmaz.</text>
  <rect x="20" y="252" width="330" height="150" rx="8" class="sf sb"/>
  <text x="36" y="278" class="b p">3. Satır sırası ters</text>
  <text x="36" y="306" class="sm">1. elma</text><text x="140" y="306" class="sm">3. üzüm</text>
  <text x="36" y="328" class="sm">2. armut</text><text x="140" y="328" class="sm">2. armut</text>
  <text x="36" y="350" class="sm">3. üzüm</text><text x="140" y="350" class="sm">1. elma</text>
  <line x1="100" y1="300" x2="130" y2="340" class="sp" fill="none"/>
  <text x="36" y="384" class="sm t2">Liste baştan sona çevrilir.</text>
  <rect x="370" y="252" width="330" height="150" rx="8" class="ps"/>
  <text x="386" y="278" class="b p">4. Ayna yazısı</text>
  <g transform="translate(1072 0) scale(-1 1)">
    <text x="536" y="326" class="xl mid">AMBULANS</text>
  </g>
  <line x1="386" y1="342" x2="686" y2="342" class="sa dash" fill="none"/>
  <text x="386" y="366" class="sm t2">Harflerin şekli de yansır;</text>
  <text x="386" y="386" class="sm t2">aynada düz okunur, görüntüdür.</text>
</svg>`
  },
  sections: [
    {
      h: "Ters yazı nedir, kaç türü vardır?",
      p: [
        "Günlük dilde \"ters yazı\" denince birbirinden farklı birkaç işlem kastedilir. En yaygını, harfleri sondan başa doğru dizmektir: \"merhaba\" kelimesi \"abahrem\" olur. Bunun dışında yalnızca kelime sırasını çevirmek, alt alta yazılmış bir listenin sırasını tersine çevirmek ve harflerin görüntüsünü aynadaki gibi yansıtmak da ters yazı olarak anılır.",
        "Bu ayrım önemlidir, çünkü her işlem başka bir ihtiyaca cevap verir. Bilmece hazırlayan bir öğretmen harf düzeyinde ters metin ister, tarih sırasına göre yazılmış bir listeyi yeniden eskiye doğru dizmek isteyen biri satır sırasını çevirir, bir araç üzerine yapıştırılacak etiket hazırlayan kişi ise ayna yazısına ihtiyaç duyar. Doğru aracı seçmek için önce hangisini istediğinizi netleştirmek gerekir."
      ],
      table: {
        head: ["İşlem", "Örnek girdi", "Sonuç", "Ne değişir"],
        rows: [
          ["Harf harf ters", "kitap okuyorum", "muroyuko patik", "Tüm karakterlerin sırası"],
          ["Her kelimeyi kendi içinde ters", "kitap okuyorum", "patik muroyuko", "Kelime içi harf sırası; kelime sırası aynı"],
          ["Kelime sırası ters", "kitap okuyorum", "okuyorum kitap", "Yalnızca kelimelerin yeri"],
          ["Satır sırası ters", "3 satırlık liste", "son satır başta", "Satırların yeri; satır içi aynı"],
          ["Ayna yazısı", "AMBULANS", "harfler yansımış görüntü", "Harflerin şekli ve sırası"]
        ]
      }
    },
    {
      h: "Harfleri ters çevirmek ile kelime sırasını ters çevirmek arasındaki fark",
      p: [
        "Harf düzeyinde ters çevirmede metin tek bir karakter dizisi gibi ele alınır ve en sondaki karakter başa gelir. Boşluklar ve noktalama işaretleri de bu diziye dahildir; \"Selam, dünya!\" ifadesi \"!aynüd ,maleS\" olur. Sonuç okunması zor ama tamamen geri çevrilebilir bir metindir: aynı işlemi bir kez daha yaparsanız özgün metne dönersiniz.",
        "Kelime düzeyinde ise kelimeler birer blok olarak korunur, yalnızca yerleri değişir. \"Bugün hava çok güzel\" cümlesi \"güzel çok hava Bugün\" olur. Bu işlem dil oyunlarında, devrik cümle örnekleri hazırlarken ya da \"Soyadı Ad\" biçiminde yazılmış isimleri \"Ad Soyadı\" sırasına getirirken işe yarar. Ayırıcı olarak boşluk yerine virgül de seçilebilir; böylece \"Ankara, İzmir, Bursa\" listesi \"Bursa, İzmir, Ankara\" olarak çevrilir."
      ],
      after: [
        "Harf düzeyindeki işlem için [[arac:metni-ters-cevir|Metni Ters Çevir]], kelime sırası için [[arac:kelimeleri-ters-cevir|Kelimeleri Ters Çevir]] aracını kullanabilirsiniz. İkisi de tarayıcıda çalışır; yazdığınız metin bir sunucuya gönderilmez."
      ]
    },
    {
      h: "Listedeki satırlar ters sıraya nasıl dizilir?",
      p: [
        "Alt alta yazılmış bir listenin sırasını tersine çevirmek, özellikle tarih sırasıyla tutulan kayıtlarda sık gerekir. Örneğin en eskiden en yeniye yazılmış bir sipariş listesini en yeniden en eskiye görmek, ya da yarışma sonuçlarını sondan başa okumak isteyebilirsiniz. Bu işlemde satırların içindeki yazı değişmez, yalnızca satırların yeri yer değiştirir."
      ],
      ol: [
        "Listeyi bir tablo, not ya da e-postadan kopyalayın; her öğe ayrı satırda olsun.",
        "[[arac:satirlari-ters-sirala|Satırları Ters Sırala]] aracına yapıştırın.",
        "Boş satırların korunmasını ya da silinmesini seçin; numaralı listelerde numaraları yeniden vermek isteyip istemediğinizi belirleyin.",
        "Sonucu kopyalayıp kullanacağınız yere yapıştırın."
      ],
      after: [
        "Satırları ters çevirmek alfabetik sıralamayla aynı şey değildir. Alfabetik sıralama içeriğe bakarak yeni bir sıra kurar; ters sıralama ise mevcut sırayı olduğu gibi çevirir. Tekrar eden satırları temizlemek istiyorsanız [[bilgi:tekrar-eden-satirlari-silme-liste-duzenleme|tekrar eden satırları silme]] yazısı listeyi düzenlemenin diğer yollarını anlatır."
      ]
    },
    {
      h: "Ayna yazısı nedir, nerede kullanılır?",
      p: [
        "Ayna yazısı, harflerin hem sırasının hem de şeklinin yatay olarak yansıtıldığı yazıdır. Normal metni aynanın önüne tuttuğunuzda gördüğünüz görüntü, ayna yazısının ta kendisidir; ayna yazısını aynaya tuttuğunuzda ise metin düz okunur. \"R\" harfinin bacağı sola, \"S\" harfinin kıvrımları ters yöne döner.",
        "Tarih boyunca bazı sanatçı ve bilim insanlarının defterlerini ayna yazısıyla tuttuğu bilinir. Bugün ise ayna yazısı daha çok pratik amaçlarla kullanılır: araçların ön tarafındaki uyarı yazıları, cama içeriden yapıştırılan çıkartmalar, tişört baskısında kullanılan transfer kâğıtları ve bazı okul etkinlikleri bunların başında gelir."
      ],
      ul: [
        "<strong>Transfer baskı:</strong> ütüyle kumaşa aktarılan baskılarda çıktı ayna görüntüsü olarak alınır; kumaşa geçtiğinde düz okunur.",
        "<strong>Cama içten yapıştırma:</strong> dükkân vitrinine içeriden yapıştırılan yazı, dışarıdan bakan kişiye göre ters hazırlanır.",
        "<strong>El yazısı alıştırması:</strong> ayna yazısı yazmaya çalışmak, el-göz koordinasyonu ve dikkat için eğlenceli bir etkinlik olarak kullanılır."
      ],
      after: [
        "Ayna yazısı klavyeyle yazılabilen bir metin değildir; standart karakter setlerinde harflerin yansıtılmış biçimleri yoktur. Bu nedenle ayna yazısı genellikle bir görüntü düzenleyicide metni yatay çevirerek, yazıcı ayarlarındaki \"ayna görüntüsü\" seçeneğiyle ya da elle yazılarak elde edilir."
      ]
    },
    {
      h: "Ambulanslarda yazı neden ters yazılır?",
      p: [
        "Ambulansların ön kaputundaki \"AMBULANS\" yazısı ayna görüntüsü olarak yazılır. Bunun nedeni, öndeki sürücünün ambulansı dikiz aynasından görmesidir. Ayna görüntüyü yatay olarak çevirdiği için ters yazılmış metin aynada düz okunur ve sürücü kafasını çevirmeden arkasındaki aracın ambulans olduğunu hemen anlar.",
        "Aynı mantık bazı itfaiye araçlarında ve acil müdahale araçlarında da kullanılır. Bu, ayna yazısının süs değil, işlevsel bir tasarım kararı olduğunu gösteren en bilinen örnektir. Yazının büyük harflerle ve basit bir yazı tipiyle yazılması, aynadan bakıldığında okunurluğu artırır."
      ]
    },
    {
      h: "Baş aşağı (upside down) yazı nasıl yapılır?",
      p: [
        "Baş aşağı yazı, metnin 180 derece döndürülmüş gibi görünmesidir. Klavyede gerçek bir \"döndürme\" yoktur; bu görünüm, Unicode karakter setinde baş aşağı harflere benzeyen başka karakterler seçilerek oluşturulur. Örneğin küçük \"e\" yerine ters çevrilmiş e'ye benzeyen ayrı bir karakter, \"a\" yerine ters a'ya benzeyen bir karakter kullanılır ve metin aynı zamanda sondan başa dizilir.",
        "Bu yöntemin sınırları vardır. Türkçeye özgü ç, ğ, ı, ö, ş, ü harflerinin baş aşağı karşılıkları çoğu zaman yoktur ya da benzer görünen başka bir karakterle yaklaşık olarak gösterilir. Ayrıca ekran okuyucular bu karakterleri anlamlı bir metin olarak okuyamaz, arama motorları da bu metni normal kelime olarak tanımaz. Bu yüzden baş aşağı yazıyı yalnızca eğlence amaçlı, kısa ifadelerde kullanmak en doğrusudur."
      ]
    },
    {
      h: "Palindrom ters yazıyla nasıl kontrol edilir?",
      p: [
        "Palindrom, tersten okunduğunda da aynı olan kelime, cümle ya da sayıdır. Kontrolün mantığı basittir: metin harf harf ters çevrilir ve özgün metinle karşılaştırılır. Ancak cümlelerde boşluk, noktalama ve büyük-küçük harf farkı yok sayılmalıdır; aksi halde \"Ey Edip Adana'da pide ye\" gibi bilinen bir palindrom bile eşleşmez."
      ],
      ol: [
        "Metni küçük harfe çevirin; Türkçede \"I\" harfinin küçüğü \"ı\", \"İ\" harfinin küçüğü \"i\" olmalıdır.",
        "Boşlukları, kesme işaretini ve noktalama işaretlerini silin: \"eyedipadanadapideye\".",
        "Sonucu ters çevirin: \"eyedipadanadapideye\".",
        "İki dizi aynıysa ifade palindromdur. Bu örnekte ikisi de aynıdır."
      ],
      after: [
        "Kelimelerde \"kabak\", \"ses\", \"kazak\", \"kek\" ve \"radar\"; sayılarda 121, 12321 ve 2002 yılı palindrom örnekleridir. Uzun cümleleri elle kontrol etmek yerine [[arac:palindrom-kontrol|Palindrom Kontrol]] aracını kullanabilirsiniz. Palindrom ve anagram oyunlarının daha fazla örneği için [[bilgi:anagram-ve-palindrom-nedir-ornekler|anagram ve palindrom]] yazısına bakın."
      ]
    },
    {
      h: "Ters yazı Türkçe karakterlerde sorun çıkarır mı?",
      p: [
        "İyi yazılmış bir araçta sorun çıkmaz, ama dikkatsiz bir yöntemle sorun çıkabilir. Bilgisayar metni karakter kodları dizisi olarak tutar. ç, ğ, ı, İ, ö, ş, ü gibi harfler tek bir karakter olarak saklandığında ters çevirmede bozulmaz. Bazı kaynaklardan kopyalanan metinlerde ise bir harf, temel harf ile üstüne eklenen bir nokta ya da işaretten oluşan iki ayrı parça halinde gelebilir. Böyle bir metni basitçe ters çevirirseniz işaret yanlış harfin üstüne kayabilir.",
        "Benzer bir durum emojilerde ve bazı simgelerde de yaşanır; tek görünen bir emoji arka planda birden fazla koddan oluşabilir. Sitedeki araçlar metni ekranda görünen karakter birimlerine ayırarak ters çevirir, böylece Türkçe harfler ve emojiler parçalanmaz. Karakter kodlamasının mantığını merak ediyorsanız [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısı konuyu ayrıntılı anlatır."
      ],
      note: "Büyük-küçük harf dönüşümünde Türkçe kuralı uygulanmazsa \"İSTANBUL\" küçültüldüğünde \"istanbul\" yerine noktası kaymış bir \"i\" ile yazılabilir. Palindrom gibi karşılaştırma işlemlerinde Türkçe harf kuralının kullanıldığından emin olun."
    },
    {
      h: "Ters yazının günlük hayatta kullanım alanları",
      ul: [
        "<strong>Okul etkinlikleri:</strong> şifreli mesaj oyunları, ters okunan bilmeceler ve palindrom avı, okuma ve dikkat çalışmalarında kullanılır.",
        "<strong>Veri düzenleme:</strong> tarih sırasıyla tutulmuş kayıtları, günlükleri ya da sohbet dökümlerini sondan başa okumak için satır sırası çevrilir.",
        "<strong>Yazılım testleri:</strong> geliştiriciler, bir uygulamanın Türkçe karakterleri ve emojileri doğru işleyip işlemediğini ters çevirme gibi basit dönüşümlerle sınar.",
        "<strong>Baskı işleri:</strong> transfer baskı, cam etiketi ve araç üstü yazılar için ayna görüntüsü hazırlanır.",
        "<strong>Sosyal medya:</strong> dikkat çekmek için kısa ters ya da baş aşağı ifadeler kullanılır; ancak erişilebilirlik açısından önemli bilgiyi bu biçimde paylaşmamak gerekir."
      ],
      after: [
        "Unutmayın: harf harf ters çevirme bir şifreleme yöntemi değildir. Herkes aynı işlemi tekrarlayarak metni geri çevirebilir. Gizli tutmanız gereken bilgiler için gerçek şifreleme gerekir; basit yer değiştirme şifrelerinin neden kolay çözüldüğünü [[bilgi:sezar-sifreleme-nedir|Sezar şifrelemesi]] yazısında görebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Ters yazı nasıl yazılır?", "Metni harf harf sondan başa doğru dizerek yazılır; \"kitap\" kelimesi \"patik\" olur. Uzun metinlerde elle yazmak yerine metni ters çeviren bir araç kullanmak hem hızlı hem de hatasızdır."],
    ["Ayna yazısı nedir, nerede kullanılır?", "Ayna yazısı, harflerin sırasıyla birlikte şeklinin de yatay olarak yansıtıldığı yazıdır ve aynaya tutulunca düz okunur. Ambulans kaputlarında, transfer baskılarda ve cama içeriden yapıştırılan yazılarda kullanılır."],
    ["Harfleri ters çevirmek ile kelime sırasını ters çevirmek farkı nedir?", "Harf düzeyinde tüm karakterler sondan başa dizilir ve metin okunmaz hale gelir. Kelime düzeyinde ise kelimeler bozulmadan kalır, yalnızca yerleri değişir; \"bugün hava güzel\" ifadesi \"güzel hava bugün\" olur."],
    ["Listedeki satırlar ters sıraya nasıl dizilir?", "Her öğe ayrı satırda olacak biçimde listeyi satır ters sıralama aracına yapıştırın. Son satır başa, ilk satır sona gelir; satırların içindeki yazı değişmez ve boş satırları isteğe göre koruyabilirsiniz."],
    ["Baş aşağı yazı nasıl yapılır?", "Baş aşağı yazı, Unicode içindeki ters dönmüş harflere benzeyen karakterlerle ve metin sondan başa dizilerek oluşturulur. Türkçe harflerin çoğunun karşılığı olmadığı ve ekran okuyucular bu metni okuyamadığı için yalnızca eğlence amaçlı kullanılmalıdır."],
    ["Ambulanslarda yazı neden ters yazılır?", "Öndeki sürücü ambulansı dikiz aynasından gördüğü için yazı ayna görüntüsü olarak hazırlanır. Ayna görüntüyü yeniden çevirdiğinden sürücü \"AMBULANS\" yazısını düz okur ve yol vermesi gerektiğini hemen anlar."],
    ["Palindrom ters yazıyla nasıl kontrol edilir?", "Metin küçük harfe çevrilir, boşluk ve noktalama silinir, sonra ters çevrilip özgün haliyle karşılaştırılır. İki dizi aynıysa ifade palindromdur; \"Ey Edip Adana'da pide ye\" bu testten geçer."],
    ["Ters yazı Türkçe karakterlerde sorun çıkarır mı?", "Karakterleri ekranda görünen birimlere göre ayıran bir araçta sorun çıkmaz. Ancak bazı metinlerde harf ve üstündeki işaret ayrı kodlarla gelebilir; basit yöntemlerle ters çevrildiğinde bu işaretler yanlış harfe kayabilir."],
    ["Ters yazdığım metin güvenli bir şifre sayılır mı?", "Hayır. Ters çevirme herkesin aynı işlemi tekrarlayarak geri alabileceği bir dönüşümdür, gizlilik sağlamaz. Hassas bilgileri korumak için gerçek şifreleme yöntemleri ve güçlü parolalar kullanılmalıdır."]
  ],
  tools: ["metni-ters-cevir", "kelimeleri-ters-cevir", "satirlari-ters-sirala", "palindrom-kontrol"],
  related: ["anagram-ve-palindrom-nedir-ornekler", "tekrar-eden-satirlari-silme-liste-duzenleme", "ascii-unicode-utf8-farki"]
};
