export default {
  slug: "camelcase-snake-case-kebab-case-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "camelCase, snake_case ve kebab-case Nedir? Değişken Adlandırma Kuralları",
  pageTitle: "camelCase, snake_case, kebab-case Nedir? Adlandırma Kuralları",
  description: "camelCase, PascalCase, snake_case, kebab-case ve SCREAMING_SNAKE_CASE nedir, hangi dilde ve nerede kullanılır? Örnekler, Türkçe karakter ve dönüşüm kuralları.",
  keywords: ["camelcase nedir", "snake case nedir", "kebab case nedir", "pascalcase nedir", "değişken isimlendirme kuralları", "naming convention", "screaming snake case", "url slug biçimi", "json anahtar adlandırma"],
  lead: "camelCase, snake_case ve kebab-case, birden çok kelimeden oluşan adları boşluk kullanmadan yazmanın üç yaygın yoludur: camelCase kelimeleri büyük harfle ayırır (<code>siparisTarihi</code>), snake_case alt çizgiyle (<code>siparis_tarihi</code>), kebab-case ise tireyle (<code>siparis-tarihi</code>). Programlama dilleri boşluklu adlara izin vermediği için her topluluk bu biçimlerden birini gelenek hâline getirmiştir. Bu sayfada beş temel biçimi, hangi dilde ve hangi yerde kullanıldıklarını, Türkçe karakter sorununu ve biçimler arası dönüşümün kurallarını örneklerle bulacaksınız.",
  kisaCevap: [
    "camelCase: ilk kelime küçük, sonrakiler büyük harfle başlar; JavaScript ve Java'da değişken ve fonksiyon adları için yaygındır.",
    "PascalCase: her kelime büyük harfle başlar; birçok dilde sınıf ve tür adları için kullanılır.",
    "snake_case: tüm harfler küçük, kelimeler alt çizgiyle ayrılır; Python ve veritabanı sütun adlarında yaygındır.",
    "kebab-case: tüm harfler küçük, kelimeler tireyle ayrılır; URL'ler, CSS sınıfları ve dosya adları için tercih edilir.",
    "SCREAMING_SNAKE_CASE: tüm harfler büyük, alt çizgiyle ayrılır; sabitler ve ortam değişkenleri için kullanılır.",
    "Kod içi adlarda Türkçe karakter (ç, ğ, ı, ö, ş, ü) kullanmamak, kodlama ve büyük-küçük harf dönüşüm hatalarını önler."
  ],
  figure: {
    alt: "Aynı üç kelimelik ad, müşteri sipariş tarihi, beş biçimde yazılmış: camelCase, PascalCase, snake_case, kebab-case ve SCREAMING_SNAKE_CASE. Her biçimin yanında tipik kullanım yeri var.",
    caption: "\"müşteri sipariş tarihi\" ifadesi Türkçe karakterleri sadeleştirildikten sonra beş biçimde yazılmıştır. Ayırma yöntemi değişir, kelimeler aynı kalır; doğru biçim, adı nerede kullanacağınıza göre seçilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Bir ad, beş yazım biçimi</text>
  <rect x="160" y="44" width="400" height="40" rx="8" class="ps"/>
  <text x="360" y="70" class="mid">"müşteri sipariş tarihi" → musteri siparis tarihi</text>
  <g>
    <rect x="20" y="102" width="680" height="54" rx="8" class="sf sb"/>
    <text x="38" y="126" class="b">camelCase</text><text x="38" y="146" class="sm mu">ilk harf küçük, sonra büyük</text>
    <text x="300" y="136" class="lg b p">musteriSiparisTarihi</text>
    <text x="690" y="136" class="sm end t2">JS/Java değişken</text>
  </g>
  <g>
    <rect x="20" y="164" width="680" height="54" rx="8" class="sf sb"/>
    <text x="38" y="188" class="b">PascalCase</text><text x="38" y="208" class="sm mu">her kelime büyük harfle</text>
    <text x="300" y="198" class="lg b p">MusteriSiparisTarihi</text>
    <text x="690" y="198" class="sm end t2">sınıf, tür adı</text>
  </g>
  <g>
    <rect x="20" y="226" width="680" height="54" rx="8" class="sf sb"/>
    <text x="38" y="250" class="b">snake_case</text><text x="38" y="270" class="sm mu">alt çizgi, küçük harf</text>
    <text x="300" y="260" class="lg b ok">musteri_siparis_tarihi</text>
    <text x="690" y="260" class="sm end t2">Python, SQL sütunu</text>
  </g>
  <g>
    <rect x="20" y="288" width="680" height="54" rx="8" class="sf sb"/>
    <text x="38" y="312" class="b">kebab-case</text><text x="38" y="332" class="sm mu">tire, küçük harf</text>
    <text x="300" y="322" class="lg b ok">musteri-siparis-tarihi</text>
    <text x="690" y="322" class="sm end t2">URL, CSS, dosya</text>
  </g>
  <g>
    <rect x="20" y="350" width="680" height="54" rx="8" class="p"/>
    <text x="38" y="374" class="b sf">SCREAMING_SNAKE</text><text x="38" y="394" class="sm sf">tamamı büyük harf</text>
    <text x="300" y="384" class="lg b sf">MUSTERI_SIPARIS_TARIHI</text>
    <text x="690" y="384" class="sm end sf">sabit, ortam değişkeni</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Neden adlandırma biçimlerine ihtiyaç var?",
      p: [
        "Programlama dillerinde değişken, fonksiyon ve sınıf adları boşluk içeremez. Derleyici <code>sipariş tarihi</code> ifadesini iki ayrı ad olarak okur. Çok kelimeli bir adı tek parça hâline getirmenin birkaç yolu vardır ve her yazılım topluluğu zamanla bunlardan birini gelenek olarak benimsemiştir.",
        "Bu geleneklere İngilizcede <em>naming convention</em> (adlandırma kuralı) denir. Kural derleyiciyi ilgilendirmez; <code>siparisTarihi</code> ile <code>siparis_tarihi</code> aynı şekilde çalışır. Önemli olan kodu okuyan insandır: bir ekipte herkes aynı biçimi kullandığında, bir adın değişken mi, sınıf mı, sabit mi olduğu ilk bakışta anlaşılır ve aynı şey için iki farklı ad yazılması gibi hatalar azalır.",
        "Biçimler yalnızca kodda değil; web adreslerinde, CSS sınıflarında, dosya adlarında, veritabanı tablolarında ve JSON verilerinde de karşınıza çıkar. Her alanın kendi baskın tercihi vardır."
      ]
    },
    {
      h: "camelCase ile PascalCase arasındaki fark",
      p: [
        "camelCase adını devenin hörgücünden alır: kelimeler arasında boşluk yerine büyük harfler yükselir. İlk kelime küçük harfle başlar, sonraki her kelimenin ilk harfi büyüktür: <code>toplamTutar</code>, <code>kullaniciAdi</code>, <code>kdvDahilFiyat</code>.",
        "PascalCase (bazen <em>UpperCamelCase</em> de denir) tek farkla aynıdır: ilk kelimenin ilk harfi de büyüktür: <code>ToplamTutar</code>, <code>FaturaSatiri</code>. Pascal dilinin geleneğinden geldiği için bu adı taşır.",
        "Birçok dilde bu iki biçim birlikte kullanılır ve aralarındaki fark anlam taşır: değişken ve fonksiyon adları camelCase, sınıf, tür ve bileşen adları PascalCase yazılır. Böylece <code>fatura</code> bir nesneyi, <code>Fatura</code> onun sınıfını gösterir."
      ],
      table: {
        head: ["Biçim", "Örnek", "Yaygın kullanım"],
        rows: [
          ["camelCase", "kdvDahilFiyat", "JavaScript, Java, Kotlin, Swift değişken ve fonksiyonları; JSON anahtarları"],
          ["PascalCase", "KdvDahilFiyat", "Sınıf, tür, arayüz adları; C# metotları; arayüz bileşenleri"],
          ["snake_case", "kdv_dahil_fiyat", "Python ve Ruby değişkenleri; veritabanı tablo ve sütunları"],
          ["kebab-case", "kdv-dahil-fiyat", "URL yolları, CSS sınıfları, HTML öznitelikleri, dosya adları"],
          ["SCREAMING_SNAKE_CASE", "KDV_DAHIL_FIYAT", "Sabitler, ortam değişkenleri, yapılandırma anahtarları"]
        ]
      },
      after: [
        "Kısaltmalar küçük bir tartışma konusudur: <code>urlAdresi</code> mi, <code>URLAdresi</code> mi? Güncel stil rehberlerinin çoğu kısaltmayı normal kelime gibi yazmayı önerir (<code>urlAdresi</code>, <code>HtmlTablo</code>), çünkü yan yana gelen kısaltmalarda (<code>XMLHTTPRequest</code>) kelime sınırı kaybolur."
      ]
    },
    {
      h: "snake_case hangi dillerde tercih edilir?",
      p: [
        "snake_case, kelimeleri alt çizgiyle birleştirir ve genellikle tümü küçük harftir: <code>fatura_tarihi</code>, <code>musteri_no</code>. Alt çizgi boşluğa benzediği için uzun adlarda okunması kolaydır.",
        "Python topluluğunun resmî stil rehberi (PEP 8), değişken ve fonksiyon adları için snake_case, sınıf adları için PascalCase önerir. Ruby, Rust ve PHP'nin bazı kesimleri de snake_case kullanır. Veritabanlarında snake_case neredeyse standart hâline gelmiştir; bunun nedeni, birçok veritabanı sisteminin tırnaksız adları büyük ya da küçük harfe çevirmesi ve camelCase adlardaki büyük harf ayrımının kaybolmasıdır. <code>musteriNo</code> adlı bir sütun bazı sistemlerde <code>musterino</code> olarak saklanır."
      ]
    },
    {
      h: "kebab-case neden URL ve CSS'te kullanılır?",
      p: [
        "kebab-case kelimeleri tireyle birleştirir: <code>kdv-hesapla</code>, <code>ana-menu</code>. Adını kelimelerin bir şişe dizilmiş gibi görünmesinden alır. Çoğu programlama dilinde tire eksi işareti olduğu için değişken adlarında kullanılamaz, ama kod dışındaki alanlarda çok yaygındır.",
        "<strong>URL'lerde</strong> tire tercih edilir, çünkü arama motorları tireyi kelime ayırıcı olarak yorumlar ve alt çizgi bağlantı altı çiziliyken görünmez hâle gelebilir. Bu sitedeki adresler de bu kurala uyar. Bir başlığı adres metnine çevirmek için [[arac:url-metni-olustur|URL Metni (Slug) Oluşturma aracını]] kullanabilirsiniz; Türkçe karakterleri sadeleştirir, boşlukları tireye çevirir.",
        "<strong>CSS ve HTML'de</strong> sınıf adları, özel öznitelikler ve özellik adları geleneksel olarak kebab-case yazılır: <code>font-size</code>, <code>background-color</code>, <code>data-slot</code>. JavaScript'ten bu özelliklere erişirken ise camelCase karşılıkları kullanılır: <code>fontSize</code>, <code>backgroundColor</code>. Aynı adın iki biçimi arasındaki bu eşleme, biçimlerin neden bilinmesi gerektiğine iyi bir örnektir."
      ]
    },
    {
      h: "SCREAMING_SNAKE_CASE ne için kullanılır?",
      p: [
        "Tümü büyük harfli ve alt çizgili biçim, kodda \"bu değer değişmez\" demenin geleneksel yoludur: <code>KDV_ORANI</code>, <code>AZAMI_DENEME_SAYISI</code>. Büyük harfler adı ilk bakışta öne çıkarır ve okuyana bunun sıradan bir değişken olmadığını hatırlatır.",
        "İşletim sistemi ortam değişkenleri ve yapılandırma dosyalarındaki anahtarlar da çoğunlukla bu biçimde yazılır. Bazı topluluklar sabitler için PascalCase ya da başka biçimleri tercih eder; önemli olan bir proje içinde tutarlı kalmaktır."
      ]
    },
    {
      h: "Türkçe karakterler değişken adında kullanılmalı mı?",
      p: [
        "Güncel dillerin çoğu Unicode destekler ve teknik olarak <code>müşteriAdı</code> gibi bir ad çalışabilir. Yine de yaygın öneri, kod içi adlarda yalnızca İngiliz alfabesinin harflerini, rakamları ve alt çizgiyi kullanmaktır. Bunun üç somut nedeni vardır:"
      ],
      ul: [
        "<strong>Kodlama riski:</strong> Dosya farklı bir kodlamayla açılır ya da kaydedilirse ı, ş, ğ harfleri bozulur ve ad tanınmaz hâle gelir.",
        "<strong>Büyük-küçük harf dönüşümü:</strong> Türkçede i harfinin büyüğü İ, ı harfinin büyüğü I'dır. Birçok araç dönüşümü İngilizce kurala göre yapar; <code>siparisId</code> adı otomatik dönüşümde beklenmedik biçimde değişebilir.",
        "<strong>Klavye ve ekip:</strong> Türkçe klavyesi olmayan bir geliştirici bu adları yazmakta zorlanır; arama ve otomatik tamamlama da tutarsız çalışabilir."
      ],
      after: [
        "Pratik çözüm, Türkçe kelimeleri kullanıp harfleri sadeleştirmektir: müşteri → <code>musteri</code>, ödeme → <code>odeme</code>, ılık → <code>ilik</code>. Ekranda kullanıcıya gösterilen metinlerde ise Türkçe karakterler elbette olduğu gibi kalmalıdır. Metinlerde Türkçe büyük-küçük harf kurallarına uygun dönüşüm için [[arac:buyuk-kucuk-harf-donustur|Büyük Küçük Harf Dönüştür aracı]] İ/ı ayrımını doğru yapar. Karakter kodlamalarının mantığı için [[bilgi:ascii-unicode-utf8-farki|ASCII ve UTF-8 farkı]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "JSON anahtarlarında ve veritabanında hangi biçim yaygındır?",
      p: [
        "JSON için tek bir zorunlu kural yoktur. JavaScript ile çalışan arayüzlerde camelCase (<code>\"faturaNo\"</code>) yaygındır, çünkü veri doğrudan JavaScript nesnesine dönüşür. Python ya da Ruby ile yazılmış arka uçlarda ve birçok kamu API'sinde snake_case (<code>\"fatura_no\"</code>) görülür. Asıl kural, bir API'nin baştan sona tek biçim kullanmasıdır; aynı yanıtta <code>faturaNo</code> ve <code>musteri_adi</code> yan yana olmamalıdır. JSON'un yapısı için [[bilgi:json-nedir-nasil-okunur|JSON nedir yazısına]] bakabilirsiniz.",
        "Veritabanlarında tablo ve sütun adları için snake_case önerilir: <code>siparis_kalemleri</code>, <code>olusturma_tarihi</code>. Tablolar için tekil mi çoğul mu ad kullanılacağı ekipten ekibe değişir, ama tutarlılık burada da her şeyden önemlidir. Sorgu yazımı için [[bilgi:sql-nedir-temel-sorgular|SQL temel sorgular]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Biçimler arasında otomatik dönüşüm nasıl yapılır?",
      p: [
        "Dönüşümün iki adımı vardır: önce ad kelimelerine ayrılır, sonra hedef biçimin kuralıyla yeniden birleştirilir. Kelimelere ayırırken alt çizgi, tire ve boşluk doğrudan ayırıcıdır; camelCase ve PascalCase'te ise küçük harften büyük harfe geçiş yeni kelimenin başlangıcıdır."
      ],
      ol: [
        "Ayırma: <code>musteriSiparisTarihi</code> → musteri | Siparis | Tarihi.",
        "Normalleştirme: tüm kelimeler küçük harfe çevrilir → musteri | siparis | tarihi.",
        "Birleştirme: snake_case için alt çizgiyle → <code>musteri_siparis_tarihi</code>; kebab-case için tireyle → <code>musteri-siparis-tarihi</code>; sabit için büyük harf ve alt çizgiyle → <code>MUSTERI_SIPARIS_TARIHI</code>.",
        "Kontrol: ardışık kısaltmalar (<code>HTMLTablo</code>) ve rakamlar (<code>adres2Satir</code>) ayrımı belirsizleştirir; sonucu gözle doğrulayın."
      ],
      after: [
        "Uzun bir ad listesini tek tek çevirmek yerine [[arac:camel-snake-donustur|camelCase snake_case Dönüştürücü]] ile tüm satırları aynı anda istediğiniz biçime çevirebilirsiniz. Ad listesini bir metinden ayıklamanız gerekiyorsa [[bilgi:regex-nedir-duzenli-ifade-ornekleri|düzenli ifadeler]] işinizi kolaylaştırır."
      ]
    },
    {
      h: "Ekipte biçim kuralı nasıl belirlenir?",
      p: [
        "Yeni bir projeye başlarken ilk iş, kullandığınız dilin topluluk rehberine bakmaktır; çoğu dilin yaygın kabul görmüş bir stil belgesi vardır ve bu belgeye uymak, dışarıdan gelen geliştiricilerin kodu hemen okumasını sağlar. Ardından dil dışındaki alanlar için kısa bir karar listesi yazın: veritabanı sütunları snake_case, URL'ler kebab-case, JSON anahtarları camelCase gibi.",
        "Kararı yazılı hâle getirmek ve mümkünse otomatik denetim araçlarıyla (kod biçimlendirici, stil denetleyici) zorunlu kılmak, kod incelemelerinde biçim tartışmasına harcanan zamanı ortadan kaldırır. Mevcut bir projede biçim değiştirmek ise ancak tüm ekip ve bağımlı sistemler hazır olduğunda, tek seferde yapılmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Aynı projede biçimleri karıştırmak:</strong> <code>faturaNo</code> ve <code>fatura_no</code> aynı kod tabanında iki ayrı alan sanılabilir.",
        "<strong>URL'de alt çizgi ya da büyük harf kullanmak:</strong> Bazı sunucular büyük-küçük harfe duyarlıdır; <code>/Kdv-Hesapla</code> ile <code>/kdv-hesapla</code> farklı sayfa olabilir.",
        "<strong>Veritabanında camelCase sütun:</strong> Tırnaksız sorgularda büyük harf ayrımı kaybolur.",
        "<strong>Türkçe karakterli kod adları:</strong> Kodlama ve İ/ı dönüşümünde hataya açıktır.",
        "<strong>Anlamsız kısaltmalar:</strong> <code>mstSprTrh</code> gibi adlar biçim kuralına uysa bile okunmaz; kısa ama anlaşılır ad seçin."
      ]
    }
  ],
  faq: [
    ["camelCase ile PascalCase arasındaki fark nedir?", "İkisi de kelimeleri büyük harfle ayırır. camelCase'te ilk harf küçük (toplamTutar), PascalCase'te büyüktür (ToplamTutar). Birçok dilde değişkenler camelCase, sınıf ve tür adları PascalCase yazılır."],
    ["snake_case hangi dillerde tercih edilir?", "Python, Ruby ve Rust topluluklarında değişken ve fonksiyon adları için yaygındır. Veritabanı tablo ve sütun adlarında da neredeyse standarttır, çünkü bazı sistemler tırnaksız adlardaki büyük harf ayrımını korumaz."],
    ["kebab-case neden URL ve CSS'te kullanılır?", "Arama motorları tireyi kelime ayırıcı olarak yorumlar ve URL'lerde okunabilirlik sağlar. CSS özellik ve sınıf adları da geleneksel olarak tireyle yazılır; programlama dillerinde ise tire eksi işareti olduğu için kullanılmaz."],
    ["SCREAMING_SNAKE_CASE ne için kullanılır?", "Değişmeyen sabit değerleri, ortam değişkenlerini ve yapılandırma anahtarlarını göstermek için kullanılır. Tümü büyük harfli yazım, adın sıradan bir değişken olmadığını ilk bakışta belli eder."],
    ["Türkçe karakterler değişken adında kullanılmalı mı?", "Teknik olarak birçok dil izin verse de önerilmez. Kodlama bozulmaları, Türkçe İ/ı dönüşüm sorunları ve klavye farkları hataya yol açar; Türkçe kelimeleri sadeleştirilmiş harflerle (musteri, odeme) yazmak daha güvenlidir."],
    ["JSON anahtarlarında hangi biçim yaygındır?", "JavaScript tabanlı arayüzlerde camelCase, Python ve Ruby tabanlı sistemlerde ve birçok API'de snake_case yaygındır. Zorunlu kural yoktur; önemli olan bir API'nin tüm anahtarlarında aynı biçimi kullanmasıdır."],
    ["Biçimler arasında otomatik dönüşüm nasıl yapılır?", "Ad önce kelimelerine ayrılır, ardından hedef biçimin ayırıcısı ve harf kuralıyla birleştirilir. camelCase snake_case Dönüştürücü bu işlemi birçok satır için aynı anda yapar."],
    ["Veritabanı sütun adlarında hangi stil önerilir?", "Küçük harfli snake_case önerilir; örneğin olusturma_tarihi ya da musteri_no. Büyük harf ayrımına dayanan adlar bazı veritabanlarında tırnaksız sorgularda kaybolur ve hataya yol açar."],
    ["Dosya adlarında hangi biçim kullanılmalı?", "Web'de yayımlanacak dosyalar için küçük harfli kebab-case en güvenlisidir; boşluk ve Türkçe karakter adreslerde kodlanarak uzar. Kod dosyalarında ise kullandığınız dilin topluluk geleneğine uyun."]
  ],
  tools: ["camel-snake-donustur", "buyuk-kucuk-harf-donustur", "url-metni-olustur"],
  related: ["json-nedir-nasil-okunur", "url-kodlama-yuzde-20-nedir", "regex-nedir-duzenli-ifade-ornekleri"],
  sources: [
    ["Python – PEP 8 stil rehberi", "https://peps.python.org/pep-0008/"],
    ["W3C – CSS özellik adları", "https://www.w3.org/Style/CSS/"]
  ]
};
