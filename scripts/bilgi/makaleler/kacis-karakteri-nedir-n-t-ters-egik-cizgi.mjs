export default {
  slug: "kacis-karakteri-nedir-n-t-ters-egik-cizgi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Kaçış Karakteri Nedir? \\n, \\t, \\\" ve Ters Eğik Çizgi Ne İşe Yarar",
  pageTitle: "Kaçış Karakteri Nedir? \\n, \\t ve Ters Eğik Çizgi",
  description: "Kaçış karakteri (genellikle \\), ardından gelen karakterin özel anlamını değiştirir: \\n yeni satır, \\t sekme, \\\" tırnak. JSON, Unicode, dosya yolu ve regex örnekleri.",
  keywords: ["kaçış karakteri nedir", "escape character", "\\n ne demek", "ters eğik çizgi", "json kaçış", "unicode kaçış", "string escape", "backslash n nedir"],
  lead: "Kaçış karakteri, bir metin içinde <strong>kendisinden sonra gelen karakterin olağan anlamını değiştiren</strong> özel işarettir; programlama dillerinin ve JSON'un çoğunda bu iş ters eğik çizgiyle (\\) yapılır. Böylece <code>\\n</code> yeni satır, <code>\\t</code> sekme, <code>\\\"</code> ise dizeyi bitirmeyen sıradan bir tırnak anlamına gelir. Bu sayfada en sık kullanılan kaçış dizilerini, tırnak içinde tırnak yazmayı, JSON'da zorunlu kaçışları, \\u00E7 gibi Unicode kaçışlarını, Windows dosya yollarındaki çift ters eğik çizgiyi, URL kodlamayla farkı ve düzenli ifadelerde kaçışı örneklerle bulacaksınız.",
  kisaCevap: [
    "Kaçış karakteri, ardından gelen karakteri \"özel\" ya da \"sıradan\" kılar; çoğu dilde bu karakter ters eğik çizgidir (\\).",
    "\\n yeni satır (satır sonu), \\t yatay sekme, \\r satır başı, \\\\ tek bir ters eğik çizgi anlamına gelir.",
    "Çift tırnaklı dizede tırnak \\\" ile yazılır; tek tırnaklı dizede \\' kullanılır.",
    "JSON'da çift tırnak, ters eğik çizgi ve U+0000–U+001F arasındaki kontrol karakterleri kaçırılmak zorundadır.",
    "\\u00E7 gibi Unicode kaçışları, karakteri kod noktası numarasıyla yazar; \\u00E7 = ç, \\u0131 = ı.",
    "URL kodlama (%20) ve HTML varlıkları da kaçış yöntemidir ama farklı kurallarla ve farklı yerlerde kullanılır."
  ],
  figure: {
    alt: "Ters eğik çizginin ardından gelen harfe göre anlamı değişir: n yeni satır, t sekme, tırnak işareti sıradan tırnak, ters eğik çizgi tek ters eğik çizgi, u ve dört onaltılık rakam Unicode karakteri.",
    caption: "Ters eğik çizgi tek başına yazdırılmaz; kendisinden sonra gelen karakterle birlikte iki ya da daha fazla karakterlik bir \"kaçış dizisi\" oluşturur ve bu dizi tek bir karaktere dönüşür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kaçış dizisi: yazılan → üretilen</text>
  <g class="mid">
    <rect x="20" y="52" width="130" height="60" rx="8" class="p"/><text x="85" y="90" class="xl sf">\\n</text>
    <rect x="20" y="122" width="130" height="60" rx="8" class="p"/><text x="85" y="160" class="xl sf">\\t</text>
    <rect x="20" y="192" width="130" height="60" rx="8" class="p"/><text x="85" y="230" class="xl sf">\\"</text>
    <rect x="20" y="262" width="130" height="60" rx="8" class="p"/><text x="85" y="300" class="xl sf">\\\\</text>
    <rect x="20" y="332" width="130" height="60" rx="8" class="p"/><text x="85" y="370" class="lg b sf">\\u00E7</text>
  </g>
  <g>
    <line x1="160" y1="82" x2="220" y2="82" class="sp sw" fill="none"/><polygon points="220,74 234,82 220,90" class="p"/>
    <line x1="160" y1="152" x2="220" y2="152" class="sp sw" fill="none"/><polygon points="220,144 234,152 220,160" class="p"/>
    <line x1="160" y1="222" x2="220" y2="222" class="sp sw" fill="none"/><polygon points="220,214 234,222 220,230" class="p"/>
    <line x1="160" y1="292" x2="220" y2="292" class="sp sw" fill="none"/><polygon points="220,284 234,292 220,300" class="p"/>
    <line x1="160" y1="362" x2="220" y2="362" class="sp sw" fill="none"/><polygon points="220,354 234,362 220,370" class="p"/>
  </g>
  <g>
    <rect x="244" y="52" width="456" height="60" rx="8" class="sf sb"/><text x="260" y="78" class="b">Yeni satır (LF, U+000A)</text><text x="260" y="100" class="sm t2">"Ad:\\nSoyad:" iki satır olarak yazdırılır</text>
    <rect x="244" y="122" width="456" height="60" rx="8" class="sf sb"/><text x="260" y="148" class="b">Yatay sekme (U+0009)</text><text x="260" y="170" class="sm t2">"Ürün\\tFiyat" sütunları hizalar</text>
    <rect x="244" y="192" width="456" height="60" rx="8" class="sf sb"/><text x="260" y="218" class="b">Sıradan çift tırnak</text><text x="260" y="240" class="sm t2">dizeyi bitirmez: "Ali \\"selam\\" dedi"</text>
    <rect x="244" y="262" width="456" height="60" rx="8" class="sf sb"/><text x="260" y="288" class="b">Tek bir ters eğik çizgi</text><text x="260" y="310" class="sm t2">"C:\\\\Belgeler" → C:\\Belgeler</text>
    <rect x="244" y="332" width="456" height="60" rx="8" class="oks"/><text x="260" y="358" class="b">ç harfi (kod noktası U+00E7)</text><text x="260" y="380" class="sm t2">kodlama sorunu olan yerlerde güvenli yazım</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Kaçış karakteri nedir?",
      p: [
        "Programlama dillerinde metin, tırnak işaretleri arasına yazılır: <code>\"Merhaba\"</code>. Peki metnin içinde tırnak işareti geçerse ne olur? Derleyici ya da yorumlayıcı ilk gördüğü kapanış tırnağında dizenin bittiğini düşünür ve geri kalan kısmı anlamlandıramaz. Benzer şekilde, metnin içine \"yeni satır\" ya da \"sekme\" gibi klavyeyle tek satırda yazılamayan karakterleri koymak da sorundur.",
        "<strong>Kaçış karakteri</strong> bu iki sorunu çözer. Kendisinden sonra gelen karakterin anlamını değiştirerek ona \"burada özel bir şey var\" ya da \"bu karakteri özel anlamıyla değil, sıradan karakter olarak oku\" der. İngilizcede <em>escape</em> (kaçmak) sözcüğüyle anılır; karakter, sözdiziminin kurallarından \"kaçırılmış\" olur.",
        "Çoğu dilde ve veri biçiminde kaçış karakteri ters eğik çizgidir (\\, İngilizce backslash). Ters eğik çizgi ve ardından gelen karakterlerin oluşturduğu gruba <strong>kaçış dizisi</strong> denir. Kaynak kodda iki karakter olarak görünen <code>\\n</code>, çalışma anında tek bir karaktere, yani satır sonuna dönüşür."
      ]
    },
    {
      h: "\\n, \\t ve diğer kaçış dizileri ne anlama gelir?",
      table: {
        head: ["Dizi", "Anlamı", "Kod noktası", "Tipik kullanım"],
        rows: [
          ["\\n", "Yeni satır (line feed)", "U+000A", "Metni satırlara bölmek"],
          ["\\r", "Satır başı (carriage return)", "U+000D", "Windows satır sonu \\r\\n"],
          ["\\t", "Yatay sekme", "U+0009", "Sütun hizalama, TSV dosyaları"],
          ["\\\\", "Ters eğik çizginin kendisi", "U+005C", "Dosya yolları, regex"],
          ["\\\"", "Çift tırnak", "U+0022", "Çift tırnaklı dize içinde tırnak"],
          ["\\'", "Tek tırnak (kesme)", "U+0027", "Tek tırnaklı dize içinde kesme"],
          ["\\0", "Boş (null) karakter", "U+0000", "Düşük seviyeli programlama"],
          ["\\b, \\f", "Geri al, sayfa besleme", "U+0008, U+000C", "Eski terminal ve yazıcı denetimi"]
        ],
        caption: "Diller arasında küçük farklar vardır; örneğin bazı dillerde \\' yalnızca tek tırnaklı dizede geçerlidir."
      },
      after: [
        "Satır sonu konusu ayrıca dikkat ister. Unix tabanlı sistemler satır sonunu yalnızca \\n ile, Windows ise \\r\\n çiftiyle yazar. İki sistem arasında taşınan metin dosyalarında fazladan görünen boş satırlar ya da satır sonunda görünmez karakterler genellikle bu farktan kaynaklanır."
      ]
    },
    {
      h: "Tırnak içinde tırnak nasıl yazılır?",
      p: [
        "Bir müşteri yorumunu ya da alıntıyı kod içinde dize olarak yazmak istediğinizi düşünün: <em>Ali \"teslimat hızlıydı\" dedi.</em> Bunu çift tırnaklı bir dizeye koymanın üç yolu vardır."
      ],
      ol: [
        "İçteki tırnakları kaçırın: <code>\"Ali \\\"teslimat hızlıydı\\\" dedi.\"</code>",
        "Dış tırnak türünü değiştirin: <code>'Ali \"teslimat hızlıydı\" dedi.'</code> Tek tırnak içinde çift tırnak özel değildir.",
        "Destekleyen dillerde ters tırnaklı (şablon) dize kullanın; bu dizelerde hem tek hem çift tırnak serbestçe yazılır ve satır sonları korunur."
      ],
      after: [
        "Türkçe metinlerde kesme işareti çok sık geçtiği için (\"Ankara'da\", \"Ali'nin\") tek tırnaklı dizelerde her kesmeyi \\' ile kaçırmak gerekir. Bu yüzden Türkçe metin içeren kodlarda çift tırnaklı ya da şablon dizeler daha az hataya yol açar. Elinizdeki metni güvenle bir JavaScript dizesine çevirmek için [[arac:js-kacis-karakteri|JS Kaçış Karakteri aracını]] kullanabilirsiniz; araç tırnak türünü seçmenize izin verir ve gerekli kaçışları otomatik ekler."
      ]
    },
    {
      h: "JSON'da hangi karakterler kaçırılmalıdır?",
      p: [
        "JSON, kaçış kuralları en katı biçimlerden biridir. Dizeler yalnızca çift tırnakla yazılır ve şu karakterler dize içinde <strong>mutlaka</strong> kaçırılmalıdır: çift tırnak (\\\"), ters eğik çizgi (\\\\) ve U+0000 ile U+001F arasındaki tüm kontrol karakterleri. Kontrol karakterleri arasında yeni satır ve sekme de vardır; yani JSON dizesinin içinde gerçek bir satır sonu bulunamaz, onun yerine \\n yazılır.",
        "JSON'un tanıdığı kısa kaçışlar şunlardır: \\\" \\\\ \\/ \\b \\f \\n \\r \\t ve dört onaltılık rakamlı \\uXXXX. Eğik çizginin (/) kaçırılması zorunlu değildir, isteğe bağlıdır. Tek tırnak (\\') JSON'da geçerli bir kaçış <em>değildir</em>; JSON'da tek tırnak zaten sıradan bir karakterdir ve kaçırılmadan yazılır."
      ],
      formula: "Düz metin:   Fatura \"2026/14\" ödendi\n            Not: sekmeli satır\nJSON dizesi: \"Fatura \\\"2026/14\\\" ödendi\\nNot:\\tsekmeli satır\"",
      after: [
        "Elle kaçış eklemek uzun metinlerde hataya açıktır; bir tırnağı unutmak tüm dosyanın okunamamasına yol açar. [[arac:json-kacis|JSON Kaçış aracı]] metni JSON dizesine güvenle yerleştirilecek biçime çevirir ya da kaçışlı dizeyi yeniden okunur metne döndürür. JSON yapısının genelini merak ediyorsanız [[bilgi:json-nedir-nasil-okunur|JSON nedir rehberine]] bakın."
      ]
    },
    {
      h: "\\u00E7 gibi Unicode kaçışları nedir?",
      p: [
        "Unicode, dünyadaki tüm yazı sistemlerindeki karakterlere bir numara (kod noktası) verir. Unicode kaçışı, karakteri doğrudan yazmak yerine bu numarayla yazmaktır. JavaScript ve JSON'da biçim <code>\\u</code> ve ardından dört onaltılık rakamdır. Bu yöntem, dosyanın kodlaması belirsiz olduğunda ya da yalnızca ASCII karakterlerin güvenle taşınabildiği ortamlarda Türkçe harfleri bozulmadan aktarmayı sağlar."
      ],
      table: {
        head: ["Harf", "Unicode kaçışı", "Harf", "Unicode kaçışı"],
        rows: [
          ["ç", "\\u00E7", "Ç", "\\u00C7"],
          ["ğ", "\\u011F", "Ğ", "\\u011E"],
          ["ı", "\\u0131", "İ", "\\u0130"],
          ["ö", "\\u00F6", "Ö", "\\u00D6"],
          ["ş", "\\u015F", "Ş", "\\u015E"],
          ["ü", "\\u00FC", "Ü", "\\u00DC"]
        ],
        caption: "Örnek: \"\\u0130stanbul\" dizesi çalışma anında \"İstanbul\" olarak görünür."
      },
      after: [
        "Dört rakama sığmayan karakterler (emojilerin çoğu gibi) JSON'da iki \\u dizisinden oluşan bir \"vekil çift\" ile, modern JavaScript'te ise <code>\\u{1F600}</code> gibi süslü parantezli biçimle yazılır. Farklı kaçış biçimleri arasında çeviri için [[arac:unicode-kacis-cevir|Unicode Kaçış Çevirici]] kullanılabilir. Kod noktası, karakter ve bayt ilişkisini [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 rehberi]] ayrıntılı anlatır."
      ]
    },
    {
      h: "Windows dosya yollarında çift ters eğik çizgi neden gerekir?",
      p: [
        "Windows klasörleri ters eğik çizgiyle ayırır: C:\\Users\\Ali\\notlar.txt. Bu yol bir programlama dilinde dizeye olduğu gibi yazılırsa ters eğik çizgiler kaçış karakteri olarak yorumlanır. Örneğin <code>\"C:\\new\\table.txt\"</code> yazdığınızda \\n yeni satıra, \\t sekmeye dönüşür ve yol \"C:\", yeni satır, \"ew\", sekme, \"able.txt\" gibi anlamsız bir metne bozulur.",
        "Çözüm, her ters eğik çizgiyi iki kez yazmaktır: <code>\"C:\\\\new\\\\table.txt\"</code>. İlk ters eğik çizgi kaçış karakteridir, ikincisi ise kaçırılan sıradan karakterdir; sonuçta dizede tek bir ters eğik çizgi kalır. Bazı diller \"ham dize\" (raw string) desteği sunar; bu dizelerde ters eğik çizgi özel anlam taşımaz. Ayrıca Windows'un çoğu programı düz eğik çizgiyi (C:/Users/Ali) de kabul eder; bu da kaçış sorununu ortadan kaldırır."
      ]
    },
    {
      h: "Kaçış ile URL kodlama ve HTML varlıkları arasındaki fark",
      p: [
        "\"Özel karakteri güvenli hâle getirme\" fikri farklı ortamlarda farklı biçimler alır. Hepsi birer kaçış yöntemidir ama birbirinin yerine kullanılamaz; çünkü her biri kendi ortamının kurallarına göre tasarlanmıştır."
      ],
      table: {
        head: ["Yöntem", "Nerede?", "Örnek", "Neyi çözer?"],
        rows: [
          ["Ters eğik çizgi kaçışı", "Programlama dilleri, JSON", "\\n, \\\"", "Dize sınırları ve kontrol karakterleri"],
          ["Unicode kaçışı", "JS, JSON, CSS", "\\u00E7", "Kodlama belirsizliği"],
          ["URL (yüzde) kodlama", "Web adresleri, form verisi", "boşluk → %20, ç → %C3%A7", "Adreste izin verilmeyen karakterler"],
          ["HTML varlıkları", "HTML belgeleri", "ve-işareti + lt + noktalı virgül", "Etiket sanılabilecek küçüktür, büyüktür işaretleri"],
          ["CSV tırnaklama", "Virgülle ayrılmış dosyalar", "\"Ankara, Çankaya\"", "Hücre içindeki virgül ve tırnak"]
        ]
      },
      after: [
        "Sık yapılan bir hata, URL'ye yerleştirilecek bir değeri JSON kaçışıyla ya da tersini yapmaktır. Bir arama terimini adres satırına eklerken yüzde kodlama kullanılmalıdır; bunun için [[arac:url-kodla|URL Kodlama aracı]] ve [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama rehberi]] yardımcı olur."
      ]
    },
    {
      h: "Düzenli ifadelerde (regex) kaçış nasıl yapılır?",
      p: [
        "Düzenli ifadelerde nokta (.), yıldız (*), artı (+), soru işareti (?), parantezler, köşeli parantezler, süslü parantezler, şapka (^), dolar ($) ve dikey çizgi (|) özel anlam taşır. Bu karakterleri sıradan karakter olarak aramak için önlerine ters eğik çizgi koyarsınız. Örneğin \"3.5\" metnini aramak için <code>3\\.5</code> yazılır; kaçırılmamış nokta \"herhangi bir karakter\" anlamına gelir ve \"345\" ile de eşleşir.",
        "İşler, düzenli ifade bir programlama dilinde dize olarak yazıldığında karışır: önce dilin dize kaçışı, sonra regex kaçışı uygulanır. Bir rakamı temsil eden <code>\\d</code> ifadesi, sıradan bir dize içinde <code>\"\\\\d\"</code> olarak yazılmak zorunda kalabilir. Bu nedenle birçok dil düzenli ifadeler için ayrı bir yazım (ör. eğik çizgiler arasında) ya da ham dize sunar. Ayrıntılı örnekler için [[bilgi:regex-nedir-duzenli-ifade-ornekleri|regex rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çift kaçış:</strong> Zaten kaçırılmış bir metni yeniden kaçırmak \\\\n gibi diziler üretir ve ekranda \"\\n\" yazısı görünür. Metni bir kez kaçırın, gerektiğinde geri çözün.",
        "<strong>JSON'da tek tırnak kullanmak:</strong> JSON yalnızca çift tırnaklı dizeleri kabul eder; tek tırnaklı dize ayrıştırma hatası verir.",
        "<strong>Gerçek satır sonunu JSON dizesine koymak:</strong> Çok satırlı metinler JSON'a \\n ile aktarılmalıdır.",
        "<strong>Windows yolunu kaçırmadan yazmak:</strong> \\n, \\t, \\r ile başlayan klasör adları sessizce bozulur.",
        "<strong>Yanlış ortamın kaçışını kullanmak:</strong> URL'de \\u, JSON'da %20 kullanmak beklenen sonucu vermez."
      ]
    }
  ],
  faq: [
    ["Kaçış karakteri nedir?", "Kaçış karakteri, kendisinden sonra gelen karakterin olağan anlamını değiştiren özel işarettir. Çoğu programlama dilinde ve JSON'da ters eğik çizgiyle yapılır; tırnak gibi özel karakterleri sıradan yapmaya ya da yeni satır gibi yazılamayan karakterleri eklemeye yarar."],
    ["\\n ve \\t ne anlama gelir?", "\\n yeni satır (line feed, U+000A) karakteridir ve metni bir alt satıra geçirir. \\t ise yatay sekme (U+0009) karakteridir; sütunları hizalamak ya da sekmeyle ayrılmış veri dosyalarında alanları ayırmak için kullanılır."],
    ["Tırnak içinde tırnak nasıl yazılır?", "Çift tırnaklı dizede içteki tırnaklar \\\" ile kaçırılır, tek tırnaklı dizede kesme işaretleri \\' ile yazılır. Alternatif olarak dış tırnak türünü değiştirebilir ya da destekleyen dillerde ters tırnaklı şablon dize kullanabilirsiniz."],
    ["JSON'da hangi karakterler kaçırılmalıdır?", "JSON dizelerinde çift tırnak, ters eğik çizgi ve U+0000 ile U+001F arasındaki tüm kontrol karakterleri kaçırılmak zorundadır. Yeni satır \\n, sekme \\t olarak yazılır; tek tırnak ise JSON'da kaçırılmaz ve \\' geçerli bir kaçış değildir."],
    ["\\u00E7 gibi Unicode kaçışları nedir?", "Unicode kaçışı, karakteri Unicode kod noktası numarasıyla yazmaktır; \\u ve dört onaltılık rakamdan oluşur. \\u00E7 ç harfini, \\u0131 noktasız ı harfini verir; kodlamanın belirsiz olduğu ortamlarda Türkçe harfleri güvenle taşımaya yarar."],
    ["Windows dosya yollarında çift ters eğik çizgi neden gerekir?", "Dize içinde tek ters eğik çizgi kaçış karakteri sayılır ve \\n, \\t gibi diziler yola karışarak onu bozar. Her ters eğik çizgiyi iki kez yazmak, dizede tek bir sıradan ters eğik çizgi kalmasını sağlar; ham dize ya da düz eğik çizgi de kullanılabilir."],
    ["Kaçış ile URL kodlama arasındaki fark nedir?", "Ters eğik çizgi kaçışı programlama dillerinde ve JSON'da dize sınırlarını korur. URL kodlama ise web adreslerinde izin verilmeyen karakterleri yüzde işareti ve onaltılık bayt değeriyle yazar; boşluk %20, ç harfi %C3%A7 olur ve iki yöntem birbirinin yerine kullanılamaz."],
    ["Regex'te kaçış nasıl yapılır?", "Nokta, yıldız, artı, soru işareti ve parantez gibi özel anlamlı karakterlerin önüne ters eğik çizgi konur; 3\\.5 yalnızca 3.5 ile eşleşir. Düzenli ifade bir dize içinde yazılıyorsa dilin dize kaçışı da uygulandığı için ters eğik çizgiyi iki kez yazmak gerekebilir."],
    ["Ekranda \\n yazısı görünüyorsa sorun nedir?", "Bu genellikle metnin iki kez kaçırıldığını gösterir; \\n yeni satıra dönüşmek yerine ters eğik çizgi ve n harfi olarak kalmıştır. Metni bir kez geri çözmek ya da kaçışın yalnızca bir aşamada uygulanmasını sağlamak sorunu giderir."]
  ],
  tools: ["js-kacis-karakteri", "json-kacis", "unicode-kacis-cevir", "url-kodla"],
  related: ["json-nedir-nasil-okunur", "ascii-unicode-utf8-farki", "regex-nedir-duzenli-ifade-ornekleri", "url-kodlama-yuzde-20-nedir"]
};
