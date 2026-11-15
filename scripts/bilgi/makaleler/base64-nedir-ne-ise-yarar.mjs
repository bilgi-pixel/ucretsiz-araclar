export default {
  slug: "base64-nedir-ne-ise-yarar",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Base64 Nedir, Ne İşe Yarar? Base64 Kodlama ve Çözme Nasıl Yapılır",
  pageTitle: "Base64 Nedir, Ne İşe Yarar? Kodlama ve Çözme Rehberi",
  description: "Base64, ikili veriyi 64 güvenli karakterle metne çeviren kodlamadır; şifreleme değildir. Nasıl çalıştığı, %33 boyut artışı, resim ve e-postada kullanımı.",
  keywords: ["base64 nedir", "base64 ne işe yarar", "base64 çözme", "base64 decode", "base64 resim", "base64 şifreleme mi", "base64 boyut artışı", "base32 nedir"],
  lead: "Base64, resim, PDF ya da herhangi bir ikili veriyi yalnızca <strong>64 güvenli karakterden</strong> (A–Z, a–z, 0–9, + ve /) oluşan düz metne çeviren bir kodlama yöntemidir; amacı gizlemek değil, veriyi metin kabul eden sistemlerden bozulmadan geçirmektir. Her 3 bayt veri 4 karaktere dönüştüğü için kodlanmış veri yaklaşık <strong>%33 büyür</strong>. Base64 bir şifreleme değildir: anahtar gerektirmez ve herkes saniyeler içinde çözebilir. Bu rehberde nasıl çalıştığını, adım adım bir kodlama örneğini, nerelerde kullanıldığını ve Base32 ile URL kodlamadan farkını bulacaksınız.",
  kisaCevap: [
    "Base64, ikili veriyi 64 karakterlik alfabeyle metne çeviren, RFC 4648 ile tanımlanmış bir kodlamadır.",
    "3 bayt (24 bit) altışar bitlik 4 gruba bölünür; her grup alfabeden bir karaktere karşılık gelir.",
    "Kodlanan veri yaklaşık 4/3 oranında, yani %33 büyür; satır sonu eklenirse artış biraz daha fazladır.",
    "Sondaki = ya da == işaretleri dolgudur; son grubun 1 ya da 2 bayt eksik olduğunu gösterir.",
    "Base64 şifreleme değildir; anahtarı yoktur ve herkes geri çözebilir. Parola ya da gizli bilgiyi korumaz.",
    "URL-safe Base64, adreslerde sorun çıkaran + ve / yerine - ve _ kullanır."
  ],
  figure: {
    alt: "Man kelimesinin Base64'e dönüşümü: üç harfin ASCII baytları 77, 97, 110 yan yana 24 bit olarak yazılıyor, altışar bitlik dört gruba bölünüyor ve 19, 22, 5, 46 değerleri T, W, F, u karakterlerine dönüşüyor.",
    caption: "3 bayt girer, 4 karakter çıkar. \"Man\" kelimesinin 24 biti altışar bitlik dört parçaya bölünür; her parçanın 0–63 arasındaki değeri Base64 alfabesinde bir harfe karşılık gelir ve sonuç TWFu olur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">"Man" nasıl "TWFu" olur?</text>
  <g class="mid">
    <rect x="60" y="54" width="200" height="56" rx="8" class="p"/>
    <text x="160" y="80" class="lg b sf">M</text><text x="160" y="100" class="sm sf">ASCII 77</text>
    <rect x="260" y="54" width="200" height="56" rx="8" class="ps"/>
    <text x="360" y="80" class="lg b">a</text><text x="360" y="100" class="sm">ASCII 97</text>
    <rect x="460" y="54" width="200" height="56" rx="8" class="p"/>
    <text x="560" y="80" class="lg b sf">n</text><text x="560" y="100" class="sm sf">ASCII 110</text>
  </g>
  <text x="40" y="142" class="sm mu">8 bitlik baytlar</text>
  <g class="b mid">
    <text x="160" y="142">01001101</text><text x="360" y="142">01100001</text><text x="560" y="142">01101110</text>
  </g>
  <line x1="60" y1="160" x2="660" y2="160" class="sb dash" fill="none"/>
  <text x="40" y="190" class="sm mu">6 bitlik gruplar</text>
  <g class="mid">
    <rect x="60" y="200" width="146" height="44" rx="6" class="sf sb"/><text x="133" y="228" class="b">010011</text>
    <rect x="211" y="200" width="146" height="44" rx="6" class="sf sb"/><text x="284" y="228" class="b">010110</text>
    <rect x="362" y="200" width="146" height="44" rx="6" class="sf sb"/><text x="435" y="228" class="b">000101</text>
    <rect x="513" y="200" width="147" height="44" rx="6" class="sf sb"/><text x="586" y="228" class="b">101110</text>
    <text x="133" y="270" class="sm">= 19</text><text x="284" y="270" class="sm">= 22</text>
    <text x="435" y="270" class="sm">= 5</text><text x="586" y="270" class="sm">= 46</text>
    <rect x="98" y="284" width="70" height="56" rx="8" class="oks"/><text x="133" y="320" class="xl">T</text>
    <rect x="249" y="284" width="70" height="56" rx="8" class="oks"/><text x="284" y="320" class="xl">W</text>
    <rect x="400" y="284" width="70" height="56" rx="8" class="oks"/><text x="435" y="320" class="xl">F</text>
    <rect x="551" y="284" width="70" height="56" rx="8" class="oks"/><text x="586" y="320" class="xl">u</text>
  </g>
  <rect x="60" y="360" width="600" height="44" rx="8" class="sf sb"/>
  <text x="360" y="380" class="sm mid b">Alfabe: 0–25 A–Z · 26–51 a–z · 52–61 0–9 · 62 + · 63 /</text>
  <text x="360" y="397" class="sm mid t2">3 bayt → 4 karakter: boyut 4/3 kat, yani yaklaşık %33 büyür</text>
</svg>`
  },
  sections: [
    {
      h: "Base64 nedir?",
      p: [
        "Bilgisayardaki her dosya sonuçta bir bayt dizisidir ve her bayt 0 ile 255 arasında bir değer alır. Bu değerlerin bir kısmı ekranda görünmeyen kontrol karakterlerine, satır sonuna ya da sistemden sisteme farklı yorumlanan kodlara karşılık gelir. E-posta, JSON, XML, HTML ya da URL gibi <strong>metin için tasarlanmış</strong> ortamlara bu baytları doğrudan koymak verinin bozulmasına yol açabilir.",
        "<strong>Base64</strong>, bu sorunu çözmek için ikili veriyi yalnızca her sistemde aynı görünen 64 karakterle yazar: 26 büyük harf, 26 küçük harf, 10 rakam ve iki işaret (+ ile /). Eşittir işareti (=) ise yalnızca sonda dolgu olarak kullanılır. Bu alfabe ve kurallar <strong>RFC 4648</strong> standardında tanımlanmıştır.",
        "Adındaki 64 sayısı alfabedeki karakter sayısından gelir. 64 = 2<sup>6</sup> olduğu için her karakter tam 6 bit bilgi taşır; Base64'ün bütün matematiği bu basit ilişkiye dayanır."
      ]
    },
    {
      h: "Base64 nasıl çalışır? Adım adım kodlama",
      p: [
        "Kodlayıcı veriyi üçer baytlık bloklar hâlinde okur. Üç bayt 3 × 8 = 24 bit eder; bu 24 bit altışar bitlik 4 gruba bölünür ve her grubun değeri (0–63) alfabedeki karşılığına çevrilir. Görseldeki \"Man\" örneğini adım adım izleyelim."
      ],
      ol: [
        "Harflerin ASCII değerlerini bulun: M = 77, a = 97, n = 110.",
        "Her birini 8 bitlik ikili sayıya çevirin: 01001101, 01100001, 01101110.",
        "Bitleri yan yana yazıp altışarlı gruplara ayırın: 010011 | 010110 | 000101 | 101110.",
        "Her grubu onluğa çevirin: 19, 22, 5, 46.",
        "Alfabeden karşılıklarını alın: 19 = T, 22 = W, 5 = F, 46 = u. Sonuç: <code>TWFu</code>."
      ],
      after: [
        "İkili sayılara çevirme adımı size yabancı geliyorsa [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısı temel mantığı anlatır. Çözme işlemi aynı adımların tersidir: her karakter 6 bitlik değerine çevrilir, bitler birleştirilir ve sekizerli gruplar hâlinde baytlara ayrılır."
      ]
    },
    {
      h: "Sondaki = işareti ne anlama gelir?",
      p: [
        "Veri uzunluğu her zaman 3'ün katı olmaz. Son blokta 1 ya da 2 bayt kalırsa eksik bitler sıfırla tamamlanır ve çıktının 4 karakterin katı olması için sona <strong>=</strong> dolgusu eklenir. Bir = işareti son blokta 2 bayt, iki = işareti 1 bayt olduğunu gösterir."
      ],
      table: {
        head: ["Girdi", "Bayt sayısı", "Base64 çıktısı", "Dolgu"],
        rows: [
          ["H", "1", "SA==", "2 adet ="],
          ["Hi", "2", "SGk=", "1 adet ="],
          ["Man", "3", "TWFu", "yok"],
          ["Merhaba", "7", "TWVyaGFiYQ==", "2 adet ="],
          ["ğ", "2 (UTF-8: C4 9F)", "xJ8=", "1 adet ="],
          ["Ağ", "3 (41 C4 9F)", "QcSf", "yok"]
        ],
        caption: "Türkçe karakterler UTF-8'de 2 bayt tuttuğu için \"ğ\" tek harf olsa da 2 baytlık veri gibi kodlanır."
      },
      after: [
        "Bazı uygulamalar, özellikle URL ve belirteç (token) kullanan sistemler, dolguyu hiç yazmaz. Çözücü uzunluktan eksik baytı anlayabildiği için bu genellikle sorun olmaz; ancak katı bir çözücü dolgusuz veriyi reddedebilir. Hata alırsanız sona uzunluğu 4'ün katına tamamlayacak kadar = eklemeyi deneyin."
      ]
    },
    {
      h: "Base64 ne işe yarar? Kullanım alanları",
      ul: [
        "<strong>E-posta ekleri:</strong> E-posta protokolü başlangıçta yalnızca 7 bitlik metin taşımak için tasarlandı. PDF, fotoğraf gibi ekler MIME standardıyla Base64'e çevrilip 76 karakterlik satırlar hâlinde gönderilir.",
        "<strong>Gömülü resimler (data URI):</strong> Küçük bir simge, ayrı bir dosya isteği yerine <code>data:image/png;base64,…</code> biçiminde doğrudan HTML ya da CSS içine yazılabilir.",
        "<strong>API ve JSON:</strong> JSON metin biçimidir; bir dosyayı JSON içinde göndermek gerektiğinde içerik Base64 olarak bir alana konur.",
        "<strong>Kimlik doğrulama başlıkları:</strong> HTTP Basic kimlik doğrulamada kullanıcı adı ve parola Base64 ile birleştirilir. Bu bir koruma değildir; güvenliği sağlayan HTTPS bağlantısıdır.",
        "<strong>Belirteçler:</strong> JWT gibi belirteçlerin parçaları URL-safe Base64 ile yazılır; içerik okunabilir, yalnızca imza değiştirilmesini engeller.",
        "<strong>Sertifika ve anahtar dosyaları:</strong> PEM biçimindeki sertifikaların BEGIN ve END satırları arasındaki uzun metin Base64'tür."
      ]
    },
    {
      h: "Base64 bir şifreleme yöntemi mi?",
      p: [
        "Hayır. Bu, Base64 hakkındaki en yaygın yanlış anlamadır. <strong>Kodlama</strong> (encoding), veriyi başka bir biçimde yazmaktır ve herkesin bildiği sabit bir kuralla geri çevrilir. <strong>Şifreleme</strong> (encryption) ise veriyi yalnızca anahtara sahip olanın açabileceği biçime sokar. Base64'te anahtar yoktur; çözmek için tek gereken herhangi bir çözücüdür.",
        "Bir yapılandırma dosyasında ya da kaynak kodda Base64 ile yazılmış bir parola görürseniz bunu açık metin olarak saklanmış kabul edin. Gizli bilgiler gerçek şifreleme algoritmalarıyla korunmalı, parolalar ise geri çözülemeyen özetleme yöntemleriyle saklanmalıdır.",
        "Base64'ün tek \"gizleme\" etkisi, metnin ilk bakışta okunmamasıdır. Bu nedenle kötü niyetli yazılımlar ve oltalama e-postaları da içeriklerini Base64 ile gizlemeye çalışır; güvenlik yazılımları bu yüzden Base64 bloklarını çözerek tarar."
      ]
    },
    {
      h: "Base64 dosya boyutunu ne kadar büyütür?",
      p: [
        "Her 3 bayt 4 karakter olduğu için kodlanmış veri asıl verinin 4/3 katıdır. Satır sonu eklenmezse artış yaklaşık <strong>%33,3</strong>'tür. E-postadaki gibi her 76 karakterde bir satır sonu (2 bayt) eklenirse artış yaklaşık %37'ye çıkar."
      ],
      formula: "Base64 uzunluğu = 4 × ⌈bayt sayısı ÷ 3⌉\nÖrnek: 300 KB = 300.000 bayt → 4 × 100.000 = 400.000 karakter ≈ 400 KB",
      table: {
        head: ["Asıl dosya", "Base64 (satır sonsuz)", "E-posta ekinde (76 karakterlik satırlar)"],
        rows: [
          ["30 KB simge", "40 KB", "yaklaşık 41 KB"],
          ["300 KB fotoğraf", "400 KB", "yaklaşık 410 KB"],
          ["3 MB PDF", "4 MB", "yaklaşık 4,1 MB"],
          ["15 MB video", "20 MB", "yaklaşık 20,5 MB"]
        ],
        caption: "E-posta servislerinin ek sınırı kodlanmış boyuta uygulandığı için 25 MB sınırlı bir hesaptan pratikte yaklaşık 18 MB'lık dosya gönderilebilir."
      },
      after: [
        "Bu yüzden büyük resimleri Base64 ile sayfaya gömmek iyi bir fikir değildir: sayfa ağırlaşır ve tarayıcı resmi ayrıca önbelleğe alamaz. Data URI yöntemi birkaç KB'lık simgeler için mantıklıdır. Boyut birimlerini karşılaştırmak için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Base64, Base32, Hex ve URL kodlama karşılaştırması",
      p: [
        "Aynı aileden başka kodlamalar da vardır. Aralarındaki fark, kullandıkları alfabenin büyüklüğü ve dolayısıyla verimlilikleridir. Alfabe küçüldükçe her karakter daha az bit taşır, çıktı uzar ama karakterler daha \"güvenli\" olur."
      ],
      table: {
        head: ["Kodlama", "Alfabe", "Karakter başına bit", "Boyut artışı", "Tipik kullanım"],
        rows: [
          ["Hex (Base16)", "0–9, A–F", "4", "%100", "Hash değerleri, renk kodları, bayt dökümü"],
          ["Base32", "A–Z, 2–7", "5", "%60", "İki adımlı doğrulama anahtarları, büyük-küçük harf duyarsız ortamlar"],
          ["Base64", "A–Z, a–z, 0–9, +, /", "6", "%33", "E-posta ekleri, data URI, API"],
          ["Base64 URL-safe", "A–Z, a–z, 0–9, -, _", "6", "%33", "URL, dosya adı, JWT"],
          ["URL (yüzde) kodlama", "Yalnızca sorunlu karakterler %XX olur", "değişken", "değişken", "Adres ve form verisi"]
        ]
      },
      after: [
        "URL kodlama ile Base64 aynı şey değildir. URL kodlama metnin büyük kısmını olduğu gibi bırakır ve yalnızca boşluk, Türkçe harf ya da özel işaretleri %20, %C4%9F gibi dizilere çevirir. Base64 ise verinin tamamını yeniden yazar. Ayrıntılar için [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama ve %20]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Base64 kodlu metin nasıl çözülür?",
      ol: [
        "[[arac:base64-donustur|Base64 Kodla / Çöz]] aracını açın ve çözme sekmesini seçin.",
        "Base64 metnini kutuya yapıştırın. data:image/… ile başlayan bir data URI yapıştırırsanız araç resmi önizleme olarak gösterir.",
        "İçerik metinse çözülen yazı ekranda görünür; dosyaysa (PDF, resim) indirip açabilirsiniz.",
        "Metin anlamsız karakterlerle çıkıyorsa içerik ikili bir dosya olabilir ya da karakter kodlaması farklıdır; çıktıyı onaltılık olarak görmek için [[arac:hex-metin-cevir|Metni Hex Koda Çevirme]] aracını kullanın.",
        "Alfabede yalnızca büyük harfler ve 2–7 rakamları görüyorsanız veri büyük olasılıkla Base32'dir; [[arac:base32-cevir|Base32 Kodlama ve Çözme]] aracını deneyin."
      ],
      after: [
        "Araç tamamen tarayıcınızda çalışır; yapıştırdığınız metin ya da seçtiğiniz dosya hiçbir sunucuya yüklenmez. Yine de içinde gizli bilgi olabilecek belirteçleri ve sertifikaları paylaşılan bilgisayarlarda çözerken dikkatli olun."
      ]
    },
    {
      h: "Sık karşılaşılan hatalar",
      ul: [
        "<strong>Geçersiz karakter:</strong> Kopyalarken araya giren boşluk, satır sonu ya da tırnak çözmeyi bozar. Metni temizleyip yeniden deneyin.",
        "<strong>URL-safe ile standart karışması:</strong> İçinde - ve _ olan bir metni standart çözücü reddedebilir; bunları + ve / ile değiştirin ya da URL-safe seçeneğini işaretleyin.",
        "<strong>Türkçe karakterlerin bozulması:</strong> Metin UTF-8 dışında bir kodlamayla kodlanmışsa ğ, ş, ı gibi harfler yanlış çıkar. Ayrıntı için [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısına bakın.",
        "<strong>Base64'ü sıkıştırma sanmak:</strong> Base64 boyutu küçültmez, büyütür.",
        "<strong>Gizli bilgiyi Base64 ile saklamak:</strong> Kodlama koruma sağlamaz; parola ve anahtarlar gerçek şifrelemeyle korunmalıdır."
      ]
    }
  ],
  faq: [
    ["Base64 nedir?", "Base64, ikili veriyi büyük ve küçük harfler, rakamlar ile + ve / işaretlerinden oluşan 64 karakterlik bir alfabeyle düz metne çeviren kodlama yöntemidir. RFC 4648 standardında tanımlanmıştır ve metin kabul eden ortamlarda veri taşımak için kullanılır."],
    ["Base64 ne işe yarar?", "E-posta eklerini göndermeye, küçük resimleri HTML ya da CSS içine gömmeye, JSON ve API'lerde dosya taşımaya, sertifika ve belirteç dosyalarını metin olarak saklamaya yarar. Amaç verinin metin sistemlerinden bozulmadan geçmesidir."],
    ["Base64 bir şifreleme yöntemi mi?", "Hayır, Base64 bir kodlamadır ve anahtar kullanmaz. Herkes standart bir çözücüyle saniyeler içinde orijinal veriye ulaşabilir. Gizli bilgileri korumak için gerçek şifreleme algoritmaları kullanılmalıdır."],
    ["Base64 kodlu metin nasıl çözülür?", "Metni Base64 Kodla / Çöz aracına yapıştırıp çözme seçeneğini kullanmanız yeterlidir. Sonuç metinse ekranda görünür, dosyaysa indirilebilir. Hata alırsanız araya giren boşlukları ve satır sonlarını temizleyin."],
    ["Resim neden Base64'e çevrilir?", "Küçük simge ve görseller Base64'e çevrilerek data URI biçiminde doğrudan HTML, CSS ya da e-posta içine yazılabilir. Böylece ayrı bir dosya isteği gerekmez; ancak boyut yaklaşık üçte bir arttığı için büyük resimlerde önerilmez."],
    ["Base64 dosya boyutunu ne kadar büyütür?", "Her 3 bayt 4 karaktere dönüştüğü için boyut 4/3 katına, yani yaklaşık yüzde 33 oranında artar. E-postadaki gibi satır sonları eklenirse artış yaklaşık yüzde 37'ye çıkar."],
    ["Base64 ile Base32 farkı nedir?", "Base64 64 karakterlik alfabe kullanır ve karakter başına 6 bit taşır; boyutu yüzde 33 artırır. Base32 yalnızca büyük harfler ve 2–7 rakamlarını kullanır, karakter başına 5 bit taşır ve boyutu yüzde 60 artırır ama büyük-küçük harf karışıklığına dayanıklıdır."],
    ["URL kodlama ile Base64 aynı şey mi?", "Hayır. URL kodlama yalnızca boşluk, Türkçe harf ve özel işaretleri yüzde işaretiyle başlayan dizilere çevirir, metnin geri kalanını korur. Base64 ise verinin tamamını 64 karakterlik alfabeyle yeniden yazar."],
    ["Base64 metninin sonundaki eşittir işareti nedir?", "Eşittir işareti dolgudur ve çıktının 4 karakterin katı olmasını sağlar. Tek eşittir son blokta 2 bayt, iki eşittir son blokta 1 bayt olduğunu gösterir; veri uzunluğu 3'ün katıysa dolgu olmaz."]
  ],
  tools: ["base64-donustur", "base32-cevir", "url-kodla", "hex-metin-cevir"],
  related: ["url-kodlama-yuzde-20-nedir", "ikilik-sayi-sistemi-nasil-cevrilir", "turkce-karakter-sorunu-nasil-duzeltilir"],
  sources: [
    ["IETF – RFC 4648: Base16, Base32 ve Base64 Veri Kodlamaları", "https://www.rfc-editor.org/rfc/rfc4648"],
    ["IETF – RFC 2045: MIME Bölüm Bir", "https://www.rfc-editor.org/rfc/rfc2045"]
  ]
};
