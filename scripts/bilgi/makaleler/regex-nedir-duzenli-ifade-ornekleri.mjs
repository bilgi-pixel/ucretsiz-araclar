export default {
  slug: "regex-nedir-duzenli-ifade-ornekleri",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Regex (Düzenli İfade) Nedir? Türkçe Örneklerle Regex Nasıl Yazılır",
  pageTitle: "Regex Nedir? Düzenli İfade Örnekleri ve Türkçe Karakterler",
  description: "Regex, metinde kalıp aramaya yarayan düzenli ifade dilidir. . * + ? anlamları, e-posta ve Türk telefon numarası regex'i, Türkçe karakterler, gruplar ve bul-değiştir.",
  keywords: ["regex nedir", "düzenli ifade nedir", "regex örnekleri", "e-posta regex", "telefon numarası regex", "regex nasıl yazılır", "regex türkçe karakter", "regex bul değiştir"],
  lead: "Regex (regular expression, düzenli ifade), bir metin içinde belirli bir <strong>kalıba uyan</strong> parçaları bulmak, doğrulamak ya da değiştirmek için kullanılan kısa bir arama dilidir. \"Tam olarak bu kelimeyi bul\" yerine \"05 ile başlayan 11 haneli her sayıyı bul\" gibi kurallar yazmanızı sağlar. Programlama dillerinde, metin editörlerinde, tablolama programlarında ve form doğrulamada aynı temel söz dizimi kullanılır. Bu yazıda temel karakterleri, Türkçe harflerin nasıl yakalanacağını ve e-posta, telefon, link gibi gerçek örnekleri adım adım anlatıyoruz.",
  kisaCevap: [
    "Regex, metinde harf harf değil kural ile arama yapmayı sağlayan bir kalıp dilidir.",
    "<code>.</code> herhangi bir karakter, <code>*</code> sıfır ya da daha fazla, <code>+</code> bir ya da daha fazla, <code>?</code> sıfır ya da bir tekrar demektir.",
    "<code>\\d</code> rakam, <code>\\s</code> boşluk, <code>\\w</code> harf-rakam-alt çizgi; ancak <code>\\w</code> Türkçe ç, ğ, ı, ö, ş, ü harflerini yakalamaz.",
    "Türkçe harfler için <code>[a-zA-ZçğıöşüÇĞİÖŞÜ]</code> ya da Unicode bayrağıyla <code>\\p{L}</code> kullanılır.",
    "Türk cep telefonu için pratik kalıp: <code>^(\\+90|0)?5\\d{9}$</code> (boşluklar önceden silinmiş olmalı).",
    "Parantez <code>( )</code> grup oluşturur; bul-değiştirde yakalanan grup <code>$1</code>, <code>$2</code> ile geri çağrılır."
  ],
  figure: {
    alt: "Bir Türk cep telefonu regex kalıbının parçalara ayrılmış hâli: başlangıç işareti, isteğe bağlı +90 ya da 0, sabit 5 rakamı, dokuz rakam ve bitiş işareti; altında eşleşen ve eşleşmeyen örnek numaralar.",
    caption: "Bir regex kalıbını soldan sağa parça parça okumak, nasıl çalıştığını anlamanın en kolay yoludur. Üstteki kalıp yalnızca 5 ile başlayan, toplam 10 haneli (başına 0 ya da +90 gelebilen) numaraları kabul eder.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir kalıbı parçalarına ayırmak</text>
  <g class="mid">
    <rect x="30" y="56" width="70" height="56" rx="8" class="p"/><text x="65" y="91" class="lg b sf">^</text>
    <rect x="110" y="56" width="180" height="56" rx="8" class="ps"/><text x="200" y="91" class="lg b">(\\+90|0)?</text>
    <rect x="300" y="56" width="70" height="56" rx="8" class="sf sb"/><text x="335" y="91" class="lg b">5</text>
    <rect x="380" y="56" width="140" height="56" rx="8" class="oks"/><text x="450" y="91" class="lg b">\\d{9}</text>
    <rect x="530" y="56" width="70" height="56" rx="8" class="p"/><text x="565" y="91" class="lg b sf">$</text>
  </g>
  <g class="sm mid">
    <line x1="65" y1="114" x2="65" y2="140" class="st" fill="none"/><text x="65" y="156">metnin</text><text x="65" y="172">başı</text>
    <line x1="200" y1="114" x2="200" y2="140" class="st" fill="none"/><text x="200" y="156">+90 ya da 0</text><text x="200" y="172">olabilir de olmayabilir de</text>
    <line x1="335" y1="114" x2="335" y2="140" class="st" fill="none"/><text x="335" y="156">tam olarak</text><text x="335" y="172">5 rakamı</text>
    <line x1="450" y1="114" x2="450" y2="140" class="st" fill="none"/><text x="450" y="156">ardından tam</text><text x="450" y="172">9 rakam</text>
    <line x1="565" y1="114" x2="565" y2="140" class="st" fill="none"/><text x="565" y="156">metnin</text><text x="565" y="172">sonu</text>
  </g>
  <text x="30" y="214" class="b">Deneme sonuçları</text>
  <g>
    <rect x="30" y="228" width="320" height="36" rx="6" class="oks"/><text x="46" y="252">05321234567</text><text x="334" y="252" class="end b ok">eşleşir</text>
    <rect x="30" y="272" width="320" height="36" rx="6" class="oks"/><text x="46" y="296">+905321234567</text><text x="334" y="296" class="end b ok">eşleşir</text>
    <rect x="30" y="316" width="320" height="36" rx="6" class="oks"/><text x="46" y="340">5321234567</text><text x="334" y="340" class="end b ok">eşleşir</text>
    <rect x="370" y="228" width="320" height="36" rx="6" class="dgs"/><text x="386" y="252">02121234567</text><text x="674" y="252" class="end b dg">5 yok</text>
    <rect x="370" y="272" width="320" height="36" rx="6" class="dgs"/><text x="386" y="296">0532123456</text><text x="674" y="296" class="end b dg">eksik hane</text>
    <rect x="370" y="316" width="320" height="36" rx="6" class="dgs"/><text x="386" y="340">0532 123 45 67</text><text x="674" y="340" class="end b dg">boşluk var</text>
  </g>
  <rect x="30" y="368" width="660" height="38" rx="8" class="sf sb"/>
  <text x="360" y="392" class="sm mid t2">İpucu: kullanıcı girişindeki boşluk ve tireleri önce silin, sonra kalıbı uygulayın.</text>
</svg>`
  },
  sections: [
    {
      h: "Regex nedir, ne işe yarar?",
      p: [
        "Bir metin editöründe \"bul\" komutuna yazdığınız kelime yalnızca kendisini bulur. Regex ise bir <strong>tarif</strong> yazmanıza izin verir: \"@ işareti içeren ve boşluk içermeyen kelimeler\", \"yıl biçimindeki dört haneli sayılar\", \"satır başındaki boşluklar\" gibi. Bu tarife uyan her parça eşleşme olarak bulunur.",
        "En sık kullanım alanları şunlardır: form alanlarının doğru biçimde doldurulup doldurulmadığını denetlemek (e-posta, telefon, posta kodu), uzun bir metinden belirli bilgileri ayıklamak (tüm e-posta adreslerini ya da linkleri çekmek), toplu düzeltme yapmak (tarih biçimini değiştirmek, fazladan boşlukları silmek) ve kayıt dosyalarında hata satırlarını süzmek.",
        "Regex'in farklı \"lehçeleri\" vardır; JavaScript, Python, PHP, Java ve metin editörlerinin söz dizimi büyük ölçüde aynı olsa da ileri özelliklerde küçük farklar görülür. Bu yazıdaki örnekler tarayıcılarda kullanılan JavaScript söz dizimine göredir ve sitedeki araçlarda doğrudan denenebilir."
      ]
    },
    {
      h: "Temel karakterler: . * + ? ve diğerleri",
      p: [
        "Regex'te bazı karakterler kendisi olarak değil, özel anlamıyla okunur. Bunlara <strong>meta karakter</strong> denir. Bir meta karakteri düz karakter olarak aramak isterseniz önüne ters bölü koyarsınız: nokta işaretini aramak için <code>\\.</code>, artı işareti için <code>\\+</code> yazılır."
      ],
      table: {
        head: ["Karakter", "Anlamı", "Örnek", "Eşleşen"],
        rows: [
          ["<code>.</code>", "Satır sonu dışında herhangi tek karakter", "<code>k.t</code>", "kat, kit, kot, k-t"],
          ["<code>*</code>", "Önceki öğe 0 ya da daha fazla kez", "<code>ab*c</code>", "ac, abc, abbbc"],
          ["<code>+</code>", "Önceki öğe 1 ya da daha fazla kez", "<code>ab+c</code>", "abc, abbc (ac değil)"],
          ["<code>?</code>", "Önceki öğe 0 ya da 1 kez (isteğe bağlı)", "<code>renkl?i</code>", "renki, renkli"],
          ["<code>{n,m}</code>", "Önceki öğe en az n, en fazla m kez", "<code>\\d{2,4}</code>", "12, 123, 1234"],
          ["<code>^</code> ve <code>$</code>", "Metnin (ya da satırın) başı ve sonu", "<code>^Merhaba</code>", "Merhaba ile başlayan metin"],
          ["<code>[ ]</code>", "Köşeli parantez içindekilerden biri", "<code>[aeı]</code>", "a, e ya da ı"],
          ["<code>[^ ]</code>", "Köşeli parantez içindekiler hariç", "<code>[^0-9]</code>", "rakam olmayan karakter"],
          ["<code>|</code>", "Veya", "<code>kedi|köpek</code>", "kedi ya da köpek"],
          ["<code>\\d \\s \\w</code>", "Rakam, boşluk, harf-rakam-alt çizgi", "<code>\\d+</code>", "2026, 15, 7"],
          ["<code>\\b</code>", "Kelime sınırı", "<code>\\bkar\\b</code>", "\"kar\" kelimesi (karpuz değil)"]
        ],
        caption: "Büyük harfli sürümler tersini anlatır: \\D rakam olmayan, \\S boşluk olmayan, \\W harf-rakam olmayan karakterdir."
      },
      after: [
        "Tekrar belirten <code>*</code>, <code>+</code> ve <code>{n,m}</code> varsayılan olarak <strong>açgözlüdür</strong> (greedy): mümkün olan en uzun parçayı yakalar. Arkalarına <code>?</code> eklerseniz (<code>.*?</code>) en kısa eşleşmeyi tercih ederler. Örneğin <code>\"(.*)\"</code> bir satırdaki ilk tırnaktan son tırnağa kadar her şeyi alırken <code>\"(.*?)\"</code> her tırnak çiftini ayrı ayrı yakalar."
      ]
    },
    {
      h: "Türkçe karakterler regex'te nasıl yakalanır?",
      p: [
        "Türkçe metinlerde en sık yaşanan sorun <code>\\w</code> ve <code>[a-z]</code> kısayollarının yalnızca İngiliz alfabesini kapsamasıdır. <code>\\w+</code> kalıbı \"çiçek\" kelimesini tek parça olarak değil, \"i\" ve \"ek\" gibi kırık parçalar hâlinde bulur; çünkü ç bu sınıfa girmez. Aynı nedenle <code>\\b</code> kelime sınırı da Türkçe harflerin yanında beklenmedik yerlerde oluşur.",
        "İki çözüm vardır. Birincisi Türkçe harfleri sınıfa elle eklemektir: <code>[a-zA-ZçğıöşüÇĞİÖŞÜ]+</code>. İkincisi Unicode desteğini kullanmaktır: JavaScript'te kalıbın sonuna <code>u</code> bayrağı koyup <code>\\p{L}+</code> yazarsanız dünyadaki bütün dillerin harfleri yakalanır. Rakamları da dâhil etmek için <code>[\\p{L}\\p{N}]+</code> kullanılır.",
        "Büyük-küçük harf duyarsızlık bayrağı (<code>i</code>) Türkçede dikkat ister. Birçok ortamda I harfinin küçüğü ı değil i, İ harfinin küçüğü ise i ile birleşik nokta olarak işlenir. Bu yüzden \"ISPARTA\" ile \"ısparta\" eşleşmeyebilir. Kritik aramalarda iki biçimi de sınıfa açıkça yazmak (<code>[Iı]</code>, <code>[İi]</code>) en güvenli yoldur. Karakter kodlamasının neden bu farkı yarattığını [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Hazır regex örnekleri: e-posta, telefon, tarih, link",
      p: [
        "Aşağıdaki kalıplar günlük ihtiyaçların çoğunu karşılar. Tamamı \"yeterince iyi\" doğrulama içindir; örneğin e-posta kalıbı adresin gerçekten var olup olmadığını söyleyemez, yalnızca biçimini denetler."
      ],
      table: {
        head: ["Amaç", "Kalıp", "Açıklama"],
        rows: [
          ["E-posta (basit doğrulama)", "<code>^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$</code>", "Boşluksuz ad, @, alan adı, nokta ve en az 2 harfli uzantı"],
          ["Türk cep telefonu", "<code>^(\\+90|0)?5\\d{9}$</code>", "Boşluk ve tireler silindikten sonra uygulanır"],
          ["Sabit hat (alan kodlu)", "<code>^0?[2-4]\\d{9}$</code>", "2, 3 ya da 4 ile başlayan alan kodları"],
          ["Tarih (GG.AA.YYYY)", "<code>^\\d{2}\\.\\d{2}\\.\\d{4}$</code>", "Yalnızca biçim; 31.02 gibi geçersiz günleri ayırt etmez"],
          ["Web bağlantısı", "<code>https?://[^\\s\"']+</code>", "http ya da https ile başlayıp boşluğa kadar giden metin"],
          ["Posta kodu", "<code>^\\d{5}$</code>", "Türkiye'de posta kodları 5 hanelidir"],
          ["Çift boşluk", "<code> {2,}</code>", "Yan yana iki ya da daha fazla boşluk"],
          ["Satır sonu boşlukları", "<code>[ \\t]+$</code>", "m bayrağıyla her satır sonunda çalışır"]
        ],
        caption: "Ters bölüler bu tabloda tek yazılmıştır; bir programlama dilinin dizgi içine yazarken çoğu zaman iki kez yazmanız gerekir."
      },
      after: [
        "Bu kalıpları kendi metninizde denemek için [[arac:regex-test|Regex Test]] aracını kullanabilirsiniz: eşleşmeler canlı vurgulanır, gruplar ayrı ayrı listelenir. Yalnızca adres ya da bağlantı ayıklamak istiyorsanız kalıp yazmanıza gerek kalmadan [[arac:e-posta-ayikla|E-posta Ayıkla]] ve [[arac:url-ayikla|URL Ayıkla]] araçları işi tek tıkla yapar."
      ]
    },
    {
      h: "Çözümlü örnek: Türk telefon numarasını doğrulamak",
      p: [
        "Kullanıcılar telefon numarasını \"0532 123 45 67\", \"+90 (532) 123-45-67\" ya da \"5321234567\" gibi çok farklı biçimlerde yazar. Tüm bu biçimleri tek kalıpla yakalamaya çalışmak hem okunmaz hem kırılgan bir regex üretir. Doğru yöntem iki adımlıdır: önce temizle, sonra doğrula."
      ],
      ol: [
        "Rakam ve artı dışındaki her şeyi silin: <code>[^\\d+]</code> kalıbını boş metinle değiştirin. \"+90 (532) 123-45-67\" ifadesi \"+905321234567\" olur.",
        "Başlangıcı tanımlayın: <code>^(\\+90|0)?</code> numaranın başında +90 ya da 0 olabileceğini, ikisinin de zorunlu olmadığını söyler.",
        "Cep telefonu numaraları 5 ile başlar; kalıba sabit <code>5</code> ekleyin.",
        "Geriye kalan 9 haneyi <code>\\d{9}</code> ile isteyin ve <code>$</code> ile bitirin. Böylece fazladan hane olan numaralar reddedilir.",
        "Sonuç: <code>^(\\+90|0)?5\\d{9}$</code>. \"05321234567\" eşleşir, \"0532123456\" (bir hane eksik) eşleşmez."
      ],
      after: [
        "Aynı mantık IBAN, vergi numarası ya da plaka gibi alanlar için de geçerlidir: regex yalnızca biçimi denetler. TR kimlik numarası ve IBAN gibi alanlarda ayrıca kontrol basamağı hesaplanır; bunun nasıl yapıldığını [[bilgi:iban-nedir-kac-haneli|IBAN nedir, kaç hanelidir]] yazısında görebilirsiniz."
      ]
    },
    {
      h: "Grup ve yakalama nedir?",
      p: [
        "Normal parantez <code>( )</code> iki iş görür: içindekileri tek bir öğe gibi davrandırır (örneğin <code>(ha)+</code> \"hahaha\" ile eşleşir) ve eşleşen parçayı numaralı bir <strong>yakalama grubuna</strong> kaydeder. Gruplar soldan sağa, açılan parantez sırasıyla 1, 2, 3 diye numaralanır.",
        "Yalnızca gruplamak, ama yakalamamak istiyorsanız <code>(?:...)</code> yazarsınız. Bu, numaraların karışmasını önler ve büyük metinlerde biraz daha hızlıdır. JavaScript, Python ve birçok ortam gruplara ad vermeye de izin verir; uzun kalıplarda \"1. grup\" yerine \"gün\", \"ay\", \"yıl\" gibi adlarla çalışmak okunurluğu artırır.",
        "Örnek: <code>(\\d{2})\\.(\\d{2})\\.(\\d{4})</code> kalıbı \"15.11.2026\" metninde 1. grubu \"15\", 2. grubu \"11\", 3. grubu \"2026\" olarak yakalar. Bu grupları bir sonraki bölümde tarih biçimini çevirmek için kullanacağız."
      ]
    },
    {
      h: "Regex ile bul-değiştir nasıl yapılır?",
      p: [
        "Bul-değiştir, regex'in en çok zaman kazandırdığı kullanımdır. Değiştirme metninde <code>$1</code>, <code>$2</code> gibi işaretler yakalanan grupların yerine geçer; <code>$&</code> ise eşleşmenin tamamını temsil eder. Bazı metin editörleri bunun yerine <code>\\1</code> söz dizimini kullanır."
      ],
      ol: [
        "Tarih biçimini GG.AA.YYYY'den YYYY-AA-GG'ye çevirmek için arama kutusuna <code>(\\d{2})\\.(\\d{2})\\.(\\d{4})</code> yazın.",
        "Değiştirme kutusuna <code>$3-$2-$1</code> yazın. \"15.11.2026\" ifadesi \"2026-11-15\" olur.",
        "Fazladan boşlukları temizlemek için <code> {2,}</code> arayıp tek boşlukla değiştirin.",
        "Satır başındaki madde işaretlerini silmek için m bayrağıyla <code>^[-*•]\\s*</code> arayıp boş bırakın.",
        "Her değiştirmeden önce eşleşme sayısına bakın; beklediğinizden çok fazla eşleşme varsa kalıp gereğinden geniştir."
      ],
      after: [
        "Bu işlemleri tarayıcıda, metninizi hiçbir yere göndermeden yapmak için [[arac:bul-ve-degistir|Bul ve Değiştir]] aracının düzenli ifade seçeneğini açmanız yeterlidir."
      ]
    },
    {
      h: "Bayraklar ve sık yapılan hatalar",
      p: [
        "Kalıbın davranışını değiştiren harflere <strong>bayrak</strong> denir. JavaScript'te en sık kullanılanlar: <code>g</code> (tüm eşleşmeleri bul, ilkinde durma), <code>i</code> (büyük-küçük harf duyarsız), <code>m</code> (<code>^</code> ve <code>$</code> her satırın başı ve sonu olsun), <code>s</code> (nokta satır sonunu da yakalasın) ve <code>u</code> (Unicode desteği, <code>\\p{L}</code> için gerekli)."
      ],
      ul: [
        "<strong>Noktayı kaçırmamak:</strong> <code>www.site.com</code> kalıbındaki noktalar herhangi bir karakteri yakalar; \"wwwXsiteYcom\" de eşleşir. Doğrusu <code>www\\.site\\.com</code>.",
        "<strong>Başlangıç ve bitiş işaretini unutmak:</strong> <code>\\d{5}</code> kalıbı \"1234567\" içinde de 5 hane bulur. Alanın tamamını denetlemek için <code>^\\d{5}$</code> yazın.",
        "<strong>Her şeyi tek kalıba sıkıştırmak:</strong> \"Kusursuz\" e-posta regex'leri yüzlerce karakter uzunluğundadır ve bakımı zordur. Basit kalıp ve doğrulama e-postası çoğu zaman daha iyi sonuç verir.",
        "<strong>Açgözlü eşleşmeyi gözden kaçırmak:</strong> HTML ya da tırnak içi metinlerde <code>.*</code> yerine <code>.*?</code> ya da <code>[^\"]*</code> kullanın.",
        "<strong>Türkçe harfleri unutmak:</strong> Ad-soyad alanında <code>^[a-zA-Z ]+$</code> kullanmak Çağlar, Şükrü, Gülşen gibi adları reddeder.",
        "<strong>Felaket geri izleme:</strong> <code>(a+)+$</code> gibi iç içe tekrarlar uzun girdilerde tarayıcıyı kilitleyebilir. İç içe tekrarlardan kaçının."
      ]
    }
  ],
  faq: [
    ["Regex nedir?", "Regex ya da düzenli ifade, bir metinde belirli bir kalıba uyan parçaları bulmak, doğrulamak ve değiştirmek için kullanılan kısa bir arama dilidir. Kelimenin kendisi yerine \"5 rakamla başlayan 10 hane\" gibi kurallar yazmanızı sağlar."],
    ["Regex'te . * + ? karakterleri ne anlama gelir?", "Nokta satır sonu dışındaki herhangi bir karakteri, yıldız önceki öğenin sıfır ya da daha fazla tekrarını, artı bir ya da daha fazla tekrarını, soru işareti ise önceki öğenin isteğe bağlı olduğunu yani sıfır ya da bir kez geçtiğini anlatır."],
    ["E-posta adresi regex ile nasıl doğrulanır?", "Pratik bir kalıp ^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$ biçimindedir: boşluksuz ad, @ işareti, alan adı, nokta ve en az iki harfli uzantı ister. Adresin gerçekten var olduğunu ise ancak bir doğrulama e-postası gönderip anlayabilirsiniz."],
    ["Türk telefon numarası için regex nasıl yazılır?", "Önce boşluk, tire ve parantezleri silin; ardından ^(\\+90|0)?5\\d{9}$ kalıbını uygulayın. Bu kalıp başında +90 ya da 0 olan veya olmayan, 5 ile başlayan ve toplam 10 haneli cep telefonu numaralarını kabul eder."],
    ["Türkçe karakterler regex'te nasıl yakalanır?", "\\w ve [a-z] Türkçe ç, ğ, ı, ö, ş, ü harflerini kapsamaz. Harfleri [a-zA-ZçğıöşüÇĞİÖŞÜ] biçiminde sınıfa ekleyebilir ya da JavaScript'te u bayrağıyla \\p{L} kullanarak tüm dillerin harflerini yakalayabilirsiniz."],
    ["Grup ve yakalama nedir?", "Normal parantez içindeki kısım hem tek bir öğe gibi davranır hem de eşleşen parçayı numaralı bir gruba kaydeder. Bu gruplar bul-değiştirde $1, $2 gibi işaretlerle geri çağrılır; yalnızca gruplamak için (?:...) kullanılır."],
    ["Metinden tüm linkler regex ile nasıl ayıklanır?", "https?://[^\\s\"']+ kalıbını g bayrağıyla çalıştırdığınızda metindeki http ve https ile başlayan tüm bağlantılar listelenir. Sonda kalan nokta ya da virgül gibi işaretleri ayrıca temizlemeniz gerekebilir; hazır araç bunu sizin yerinize yapar."],
    ["Regex bul-değiştir nasıl yapılır?", "Arama kutusuna gruplu bir kalıp, değiştirme kutusuna da $1, $2 gibi grup işaretleri içeren yeni biçimi yazarsınız. Örneğin (\\d{2})\\.(\\d{2})\\.(\\d{4}) aranıp $3-$2-$1 yazılırsa 15.11.2026 tarihi 2026-11-15 olur."],
    ["Regex her programda aynı mı çalışır?", "Temel söz dizimi JavaScript, Python, PHP, Java ve çoğu metin editöründe aynıdır. Ancak geriye bakma, Unicode sınıfları ve değiştirme işaretleri gibi ileri özelliklerde farklar olabilir; kalıbı kullanacağınız ortamda denemeniz en sağlıklısıdır."]
  ],
  tools: ["regex-test", "bul-ve-degistir", "e-posta-ayikla", "url-ayikla"],
  related: ["ascii-unicode-utf8-farki", "turkce-karakter-sorunu-nasil-duzeltilir", "json-nedir-nasil-okunur", "url-kodlama-yuzde-20-nedir"],
  sources: [
    ["ECMA International – ECMAScript dil belirtimi (RegExp)", "https://tc39.es/ecma262/"],
    ["Unicode Konsorsiyumu – Unicode Düzenli İfadeler (UTS #18)", "https://www.unicode.org/reports/tr18/"]
  ]
};
