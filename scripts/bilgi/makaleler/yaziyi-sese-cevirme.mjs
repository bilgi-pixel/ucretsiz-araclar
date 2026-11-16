export default {
  slug: "yaziyi-sese-cevirme",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Yazıyı Sese Çevirme Nasıl Yapılır? Türkçe Seslendirme, Hız ve Ses Dosyası",
  pageTitle: "Yazıyı Sese Çevirme Nasıl Yapılır? Türkçe Seslendirme",
  description: "Yazıyı sese çevirme nasıl yapılır? Türkçe metni ücretsiz seslendirme, hız ve perde ayarı, uzun metin kaç dakikada okunur, MP3 olarak kaydetme ve telefonda sesli okuma.",
  keywords: ["yazıyı sese çevirme", "metni sese çevirme", "türkçe seslendirme", "text to speech türkçe", "yazıyı okuyan program", "sesli okuma", "ses dosyası dönüştürme", "metin seslendirme hızı"],
  lead: "Yazıyı sese çevirmek için <strong>metni bir metin okuma (text to speech) aracına yapıştırıp Türkçe sesi seçmeniz ve oynatmanız</strong> yeterlidir; tarayıcılar ve işletim sistemleri bu özelliği cihazdaki ses motoruyla ücretsiz sunar. Okuma hızı, perde ve ses seviyesi ayarlanabilir; normal hızda bir yapay ses dakikada yaklaşık 140–170 kelime okur, yani 1.000 kelimelik bir metin 6–7 dakika sürer. Bu yazıda seslendirmenin nasıl çalıştığını, Türkçe ses kurmayı, ayarları, ses dosyası elde etme yollarını ve kimlerin bu özellikten en çok yararlandığını anlatıyoruz.",
  kisaCevap: [
    "Metin okuma, yazılı metni cihazdaki ses sentezleyiciyle konuşmaya dönüştürür; internet bağlantısı çoğu zaman gerekmez.",
    "Türkçe okuma için cihazda Türkçe ses yüklü olmalıdır; yoksa işletim sisteminin dil ve konuşma ayarlarından eklenir.",
    "Hız genellikle 0,5× ile 2× arasında ayarlanır; 1× hız dakikada yaklaşık 140–170 kelimeye denk gelir.",
    "Okuma süresi ≈ kelime sayısı ÷ dakikadaki kelime; 1.000 kelime 150 kelime/dk ile yaklaşık 6 dakika 40 saniye sürer.",
    "Tarayıcıdaki konuşma özelliği sesi doğrudan hoparlöre verir, kendiliğinden MP3 dosyası üretmez.",
    "Görme güçlüğü, disleksi, dil öğrenimi, metin provası ve göz yorgunluğu en yaygın kullanım nedenleridir."
  ],
  figure: {
    alt: "Yazıyı sese çevirme akışı: metin kutusu, cihazdaki Türkçe ses motoru, hoparlör; altta hız ayarına göre 1.000 kelimelik metnin okunma süresi çubukları: 0,8× 8 dk 20 sn, 1× 6 dk 40 sn, 1,5× 4 dk 27 sn.",
    caption: "Metin tarayıcıdan cihazdaki ses motoruna gider ve hoparlörden çalınır; metin hiçbir sunucuya gönderilmez. Alt bölüm, 1× hızın dakikada 150 kelime kabul edildiği örnekte 1.000 kelimelik metnin süresini gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ys" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Yazıdan sese: nasıl çalışır?</text>
  <rect x="20" y="56" width="200" height="110" rx="10" class="sf sb"/>
  <text x="120" y="84" class="b mid">1. Metin</text>
  <line x1="40" y1="104" x2="200" y2="104" class="sb" fill="none"/>
  <line x1="40" y1="122" x2="190" y2="122" class="sb" fill="none"/>
  <line x1="40" y1="140" x2="160" y2="140" class="sb" fill="none"/>
  <rect x="260" y="56" width="200" height="110" rx="10" class="p"/>
  <text x="360" y="84" class="b mid sf">2. Ses motoru</text>
  <text x="360" y="110" class="sm mid sf">cihazdaki Türkçe ses</text>
  <text x="360" y="132" class="sm mid sf">hız · perde · seviye</text>
  <rect x="500" y="56" width="200" height="110" rx="10" class="oks"/>
  <text x="600" y="84" class="b mid">3. Hoparlör</text>
  <text x="600" y="110" class="sm mid">anında dinleme</text>
  <text x="600" y="132" class="sm mid">dosya üretilmez</text>
  <line x1="222" y1="111" x2="256" y2="111" class="sp sw" fill="none" marker-end="url(#ys)"/>
  <line x1="462" y1="111" x2="496" y2="111" class="sp sw" fill="none" marker-end="url(#ys)"/>
  <text x="360" y="194" class="sm mid t2">Metin cihazınızda kalır; sunucuya gönderilmez.</text>
  <text x="30" y="236" class="b">1.000 kelimelik metin hangi hızda kaç dakika?</text>
  <g class="sm">
    <text x="30" y="268">0,8× (120 k/dk)</text><rect x="170" y="256" width="400" height="18" rx="3" class="ps"/><text x="580" y="270" class="b">8 dk 20 sn</text>
    <text x="30" y="300">1× (150 k/dk)</text><rect x="170" y="288" width="320" height="18" rx="3" class="p"/><text x="500" y="302" class="b">6 dk 40 sn</text>
    <text x="30" y="332">1,25× (188 k/dk)</text><rect x="170" y="320" width="256" height="18" rx="3" class="ps"/><text x="436" y="334" class="b">5 dk 20 sn</text>
    <text x="30" y="364">1,5× (225 k/dk)</text><rect x="170" y="352" width="213" height="18" rx="3" class="ps"/><text x="393" y="366" class="b">4 dk 27 sn</text>
  </g>
  <text x="360" y="392" class="sm mid t2">1× hız sese ve cihaza göre değişir; örnekte 150 kelime/dk alınmıştır.</text>
</svg>`
  },
  sections: [
    {
      h: "Yazıyı sese çevirme nedir, nasıl çalışır?",
      p: [
        "Yazıyı sese çevirme (metin okuma, İngilizcede text to speech ya da kısaca TTS), yazılı bir metnin yapay bir ses tarafından yüksek sesle okunmasıdır. İşlem iki aşamada gerçekleşir. Önce metin çözümlenir: kısaltmalar, sayılar ve noktalama işaretleri okunacak biçime dönüştürülür, kelimeler hecelere ve seslere ayrılır. Ardından ses sentezleyici bu sesleri vurgu ve tonlamayla birleştirerek konuşma üretir.",
        "Günümüzde bilgisayar ve telefon işletim sistemlerinin çoğunda yerleşik bir ses motoru bulunur. Tarayıcılar da bu motora bir konuşma arayüzü üzerinden erişebilir; böylece bir web sayfası, metni hiçbir sunucuya göndermeden cihazınızdaki sesle okutabilir. Sesin doğallığı cihaza ve yüklü ses paketine göre değişir; yeni sürümlerdeki sesler genellikle daha akıcıdır. Aynı metin iki farklı cihazda bu yüzden farklı tonda ve hızda duyulabilir; bu bir hata değil, ses motorlarının farkıdır."
      ]
    },
    {
      h: "Yazı sese nasıl çevrilir? Adım adım",
      ol: [
        "Okutmak istediğiniz metni kopyalayın; bir belgeden, e-postadan ya da web sayfasından olabilir.",
        "[[arac:yaziyi-sese-cevir|Yazıyı Sese Çevir]] aracını açın ve metni kutuya yapıştırın.",
        "Ses listesinden Türkçe sesi seçin. Listede birden fazla Türkçe ses varsa birkaç cümleyle deneyip size en anlaşılır geleni seçin.",
        "Hızı, perdeyi ve ses seviyesini ayarlayın; ilk denemede 1× hızdan başlayın.",
        "Oynat düğmesine basın. Araç okunan kelimeyi vurgulayarak metni takip etmenizi kolaylaştırır; istediğiniz yerde duraklatıp devam edebilirsiniz.",
        "Uzun metinlerde paragrafları bölmek, okumanın daha doğal duraklamalarla ilerlemesini sağlar."
      ],
      after: [
        "Metin tarayıcınızda işlenir ve cihazınızdaki ses motoruna gönderilir; sunucuya yüklenmez, kayıt gerekmez. Bu özellikle gizli ya da kişisel belgeleri dinlemek istediğinizde önemlidir."
      ]
    },
    {
      h: "Türkçe metin seslendirme ücretsiz yapılabilir mi?",
      p: [
        "Evet. Cihazınızda Türkçe ses yüklüyse tarayıcı ya da işletim sistemi üzerinden seslendirme ücretsizdir. Ses listesinde Türkçe görünmüyorsa, işletim sisteminin dil ve konuşma ayarlarından Türkçe dil paketini ya da Türkçe konuşma sesini eklemeniz gerekir. Bilgisayarlarda bu ayar genellikle \"Zaman ve dil\" ya da \"Erişilebilirlik\" bölümündedir; telefonlarda ise erişilebilirlik menüsündeki \"metin okuma\" ya da \"konuşulan içerik\" ayarlarında bulunur. Ses paketi bir kez indirildikten sonra çoğu cihazda internet olmadan da çalışır.",
        "Türkçe sesler Türkçeye özgü karakterleri (ç, ğ, ı, İ, ö, ş, ü) doğru okur; ancak metindeki karakterler bozuk kodlanmışsa (örneğin \"ş\" yerine anlamsız simgeler görünüyorsa) ses de yanlış okur. Bu durumda önce metni düzeltin; nedenleri ve çözümü [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısında anlatılır."
      ]
    },
    {
      h: "Okuma hızı ve ses tonu ayarlanabilir mi?",
      p: [
        "Evet, çoğu seslendirme aracında üç temel ayar bulunur. <strong>Hız</strong> konuşmanın temposunu, <strong>perde</strong> sesin incelik-kalınlığını, <strong>ses seviyesi</strong> ise gürlüğü belirler. Hız ayarı genellikle 0,5× ile 2× arasındadır; 1× hız seçilen sese ve cihaza göre dakikada yaklaşık 140–170 kelimeye denk gelir."
      ],
      table: {
        head: ["Amaç", "Önerilen hız", "Neden"],
        rows: [
          ["Dil öğrenimi, telaffuz çalışması", "0,7× – 0,9×", "Sesleri ve vurguyu ayırt etmek kolaylaşır"],
          ["Ders notu ya da makale dinleme", "1× – 1,25×", "Anlama ve hız dengesi"],
          ["Bilinen bir metni gözden geçirme", "1,3× – 1,6×", "Zaman kazandırır, alışınca anlaşılır kalır"],
          ["Sunum metni provası", "1×", "Gerçek konuşma temposuna yakın"],
          ["Görme güçlüğü olan deneyimli kullanıcılar", "Kişiye göre 2×'e kadar", "Alışkanlıkla çok yüksek hızlar takip edilebilir"]
        ],
        caption: "Değerler başlangıç önerisidir; size uygun hızı kısa denemelerle bulun."
      },
      after: [
        "Perdeyi çok yükseltmek ya da düşürmek sesi yapay hale getirir; küçük değişiklikler genellikle yeterlidir. Uzun dinlemelerde biraz daha düşük ses seviyesi ve sakin bir hız kulak yorgunluğunu azaltır."
      ]
    },
    {
      h: "Uzun metin kaç dakikada okunur?",
      p: [
        "Seslendirme süresini tahmin etmek için kelime sayısını, sesin dakikadaki kelime hızına bölersiniz. 1× hızı dakikada 150 kelime kabul edersek 1.000 kelimelik bir metin 1.000 ÷ 150 ≈ 6,67 dakika, yani yaklaşık 6 dakika 40 saniye sürer. 1,5× hızda (dakikada 225 kelime) aynı metin yaklaşık 4 dakika 27 saniyede biter."
      ],
      formula: "Okuma süresi (dk) = kelime sayısı ÷ (temel hız × hız çarpanı)\n1.000 ÷ 150 = 6,67 dk → 6 dk 40 sn\n1.000 ÷ (150 × 1,5) = 4,44 dk → 4 dk 27 sn",
      after: [
        "Kendi okuma ve konuşma hızınızla karşılaştırmak için [[bilgi:dakikada-kac-kelime-okunur|dakikada kaç kelime okunur]] yazısına, metninizin süresini doğrudan görmek için [[arac:okuma-suresi-hesapla|Okuma Süresi Hesaplama]] aracına bakabilirsiniz. Bir sunum metni hazırlıyorsanız seslendirme, metni kulaktan dinleyip süresini ve akıcılığını kontrol etmenin pratik bir yoludur; hedef süreye göre kelime hesabı için [[bilgi:sunum-kac-slayt-olmali-konusma-suresi|sunum kaç slayt olmalı]] yazısı yol gösterir."
      ]
    },
    {
      h: "Seslendirilen metin MP3 olarak kaydedilebilir mi?",
      p: [
        "Tarayıcının konuşma özelliği sesi doğrudan hoparlöre verir ve kendiliğinden bir ses dosyası üretmez. Bu yüzden Yazıyı Sese Çevir aracı MP3 ya da WAV indirme sunmaz. Dosya üretmek için sesi bir sunucuda oluşturup göndermek gerekirdi; bu da metninizin cihazınızdan çıkması anlamına gelir. Aracın \"metin cihazınızda kalır\" güvencesi bu tercihin sonucudur.",
        "Bir ses dosyasına ihtiyacınız varsa birkaç seçenek vardır. Metni kendi sesinizle okuyup [[arac:ses-kaydedici|Ses Kaydedici]] ile WAV ya da WebM olarak kaydedebilirsiniz; bu, özellikle sunum provası ve dil çalışması için kişisel bir kayıt sağlar. Elinizdeki bir ses dosyasının biçimini değiştirmek için [[arac:ses-donustur|Ses Dönüştürücü]] MP3, M4A, OGG ve FLAC gibi dosyaları WAV ya da Opus biçimine çevirir; bu araç MP3 çıktısı vermez. Ses dosyalarında kalite ve boyut dengesini [[bilgi:mp3-kac-kbps-olmali-ses-kalitesi|MP3 kaç kbps olmalı]] yazısı anlatır.",
        "Yapay seslerle üretilmiş kayıtları ticari bir projede, reklamda ya da yayında kullanmayı düşünüyorsanız kullandığınız ses motorunun lisans koşullarını kontrol edin. Başkasına ait bir metni seslendirip yayımlamak da telif hakkı izni gerektirebilir."
      ]
    },
    {
      h: "Yazıyı sese çevirme kimler için faydalıdır?",
      ul: [
        "<strong>Görme güçlüğü olanlar:</strong> Ekran okuyucularla birlikte metin okuma, web sayfalarına ve belgelere erişimin temel yollarından biridir.",
        "<strong>Disleksi ve okuma güçlüğü yaşayanlar:</strong> Metni hem görmek hem duymak anlamayı ve dikkati destekleyebilir.",
        "<strong>Dil öğrenenler:</strong> Kelimelerin telaffuzunu ve cümle vurgusunu duymak, özellikle yavaş hızda faydalıdır.",
        "<strong>Öğrenciler ve sınava hazırlananlar:</strong> Ders notlarını yolda ya da ev işleri yaparken dinlemek tekrar imkânı sağlar.",
        "<strong>Yazarlar ve editörler:</strong> Metni dışarıdan bir sesle dinlemek, gözden kaçan tekrarları ve uzun cümleleri fark ettirir.",
        "<strong>Sunum hazırlayanlar:</strong> Konuşma metninin süresini ve akıcılığını kontrol etmeyi kolaylaştırır.",
        "<strong>Göz yorgunluğu yaşayanlar:</strong> Uzun ekran günlerinde okumayı dinlemeye çevirmek gözleri dinlendirir."
      ],
      after: [
        "Okuma güçlüğü ya da görme kaybıyla ilgili bir endişeniz varsa, teknolojik çözümlerin yanında bir uzmandan değerlendirme almanız önerilir; metin okuma araçları destekleyicidir, tanı ya da tedavi yerine geçmez."
      ]
    },
    {
      h: "Telefonda metin sesli nasıl okutulur?",
      p: [
        "Telefonların çoğunda erişilebilirlik ayarlarında yerleşik bir metin okuma özelliği bulunur. Bu özellik açıldığında bir metni seçip \"seslendir\" ya da \"sesli oku\" komutunu verebilir, bazı cihazlarda ise ekranın tamamını okutabilirsiniz. Ayarlarda okuma hızını ve kullanılacak dili seçebilir, Türkçe ses verisini indirebilirsiniz.",
        "Tarayıcı tabanlı bir araç kullanmak, telefonunuzda ek bir uygulama kurmadan aynı işi yapmanızı sağlar. Yazıyı Sese Çevir aracı mobil tarayıcıda da çalışır; ana ekrana eklendiğinde uygulama gibi açılır. Telefonun sessiz modda olmadığını ve medya sesinin açık olduğunu kontrol edin; bazı cihazlarda konuşma sesi medya ses seviyesine bağlıdır."
      ],
      ul: [
        "<strong>Ses çıkmıyorsa:</strong> Cihazda Türkçe ses yüklü olmayabilir ya da medya sesi kapalı olabilir.",
        "<strong>Kelimeler yanlış okunuyorsa:</strong> Kısaltmaları ve sembolleri açık yazın: \"Dr.\" yerine \"Doktor\", \"%15\" yerine \"yüzde 15\".",
        "<strong>Uzun metin yarıda kesiliyorsa:</strong> Bazı cihazlar çok uzun metinleri bölerek okur; metni paragraflara ayırın.",
        "<strong>Ses robotik geliyorsa:</strong> Farklı bir Türkçe ses deneyin; cihaza yeni ses paketleri eklenebilir."
      ]
    }
  ],
  faq: [
    ["Yazı sese nasıl çevrilir?", "Metni bir metin okuma aracına yapıştırıp cihazınızdaki Türkçe sesi seçin ve oynatın. Tarayıcı tabanlı araçlar metni cihazdaki ses motoruna gönderir; hız, perde ve ses seviyesini ayarlayabilir, istediğiniz yerde duraklatabilirsiniz."],
    ["Türkçe metin seslendirme ücretsiz yapılabilir mi?", "Evet. Cihazınızda Türkçe ses yüklüyse tarayıcı ve işletim sistemi seslendirmeyi ücretsiz sunar. Türkçe ses görünmüyorsa işletim sisteminin dil, konuşma ya da erişilebilirlik ayarlarından Türkçe ses paketini ekleyin."],
    ["Okuma hızı ve ses tonu ayarlanabilir mi?", "Evet, çoğu araçta hız, perde ve ses seviyesi ayarlanır. Hız genellikle 0,5× ile 2× arasındadır; dil öğrenimi için yavaş, bilinen metinleri gözden geçirmek için daha hızlı ayarlar tercih edilir."],
    ["Seslendirilen metin MP3 olarak kaydedilebilir mi?", "Tarayıcının konuşma özelliği sesi doğrudan hoparlöre verir ve dosya üretmez; bu nedenle araç MP3 indirme sunmaz. Kişisel bir kayıt için metni kendi sesinizle okuyup ses kaydediciyle WAV ya da WebM olarak kaydedebilirsiniz."],
    ["Yazıyı sese çevirme kimler için faydalıdır?", "Görme güçlüğü olanlar, disleksi yaşayanlar, dil öğrenenler, öğrenciler, metnini dinleyerek kontrol etmek isteyen yazarlar, sunum provası yapanlar ve göz yorgunluğu yaşayanlar bu özellikten en çok yararlanan gruplardır."],
    ["Uzun metin kaç dakikada okunur?", "Kelime sayısı sesin dakikadaki kelime hızına bölünür. 1× hız dakikada 150 kelime kabul edilirse 1.000 kelimelik metin yaklaşık 6 dakika 40 saniye, 1,5× hızda yaklaşık 4 dakika 27 saniye sürer."],
    ["Telefonda metin sesli nasıl okutulur?", "Telefonun erişilebilirlik ayarlarındaki metin okuma özelliğini açıp Türkçe sesi seçin; ardından metni seçerek sesli okut komutunu verin. Alternatif olarak tarayıcı tabanlı bir seslendirme aracını mobil tarayıcıda kullanabilirsiniz."],
    ["Ses dosyası formatı nasıl değiştirilir?", "Bir ses dönüştürücüyle dosyayı başka bir biçime çevirebilirsiniz. Bilişim Ajans'ın Ses Dönüştürücü aracı MP3, M4A, OGG ve FLAC dosyalarını tarayıcıda WAV ya da Opus biçimine çevirir; MP3 çıktısı vermez."],
    ["Metin okuma sırasında metnim bir yere gönderiliyor mu?", "Yazıyı Sese Çevir aracında hayır. Metin tarayıcınızda işlenir ve cihazınızdaki ses motoruna verilir; sunucuya yüklenmez, saklanmaz ve sayfayı kapattığınızda silinir."]
  ],
  tools: ["yaziyi-sese-cevir", "ses-donustur", "okuma-suresi-hesapla", "ses-kaydedici"],
  related: ["dakikada-kac-kelime-okunur", "mp3-kac-kbps-olmali-ses-kalitesi", "turkce-karakter-sorunu-nasil-duzeltilir", "sunum-kac-slayt-olmali-konusma-suresi", "altyazi-dosyasi-srt-nedir"]
};
