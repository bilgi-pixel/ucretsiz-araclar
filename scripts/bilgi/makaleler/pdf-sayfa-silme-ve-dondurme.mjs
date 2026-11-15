export default {
  slug: "pdf-sayfa-silme-ve-dondurme",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'den Sayfa Nasıl Silinir, Döndürülür ve Sıralanır? Ücretsiz Yöntem",
  pageTitle: "PDF Sayfa Silme ve Döndürme: Ücretsiz, Programsız Yöntem",
  description: "PDF'den sayfa silmek için sayfa numarasını ya da 2,5-7 gibi aralığı seçip yeni dosyayı kaydetmeniz yeter. Ters sayfayı döndürme, sıralama, ayırma ve boş sayfa ekleme.",
  keywords: ["pdf sayfa silme", "pdf sayfa döndürme", "pdf sayfa sırası değiştirme", "pdf'den sayfa çıkarma", "pdf ters sayfa düzeltme", "pdf sayfa ayırma", "pdf boş sayfa ekleme", "telefonda pdf sayfa silme"],
  lead: "PDF'den sayfa silmek için dosyayı tarayıcıda çalışan bir PDF aracında açıp <strong>silinecek sayfaları küçük resimlerden işaretlemeniz ya da \"3, 8-10\" gibi bir aralık yazmanız</strong> ve yeni dosyayı indirmeniz yeterlidir; özgün dosya değişmez. Ters taranmış bir sayfa aynı şekilde 90, 180 ya da 270 derece döndürülür ve kaydedildiğinde döndürme kalıcı olur. Bu sayfada silme, döndürme, sıralama, sayfa ayırma ve boş sayfa ekleme işlemlerini; sayfa numaralarının neden kaydığını ve resmî belgelerde nelere dikkat etmeniz gerektiğini adım adım bulacaksınız.",
  kisaCevap: [
    "Sayfa silme: dosyayı açın, sayfaları seçin ya da 2,5-7 gibi aralık yazın, yeni PDF'i indirin.",
    "Döndürme 90° adımlarla yapılır: 90° saat yönünde, 180° baş aşağı, 270° saat yönünün tersine çevirir.",
    "Kaydedilen döndürme kalıcıdır; yalnızca görüntüleyicide döndürmek ise dosyaya yazılmaz.",
    "Bir sayfayı silince arkasındaki sayfaların numarası bir azalır; birden çok işlemi tek ekranda yapmak bu kaymayı önler.",
    "Belirli sayfaları ayrı dosya yapmak için o sayfaları seçip yeni PDF olarak çıkarmak yeterlidir.",
    "Şifreli PDF'ler önce açılış şifresiyle açılmalıdır; e-imzalı belgede yapılan her değişiklik imzayı geçersiz kılar."
  ],
  figure: {
    alt: "8 sayfalık taranmış belge: 3. ve 6. sayfalar boş olduğu için siliniyor, 5. sayfa ters olduğu için 180 derece döndürülüyor; sonuçta 6 sayfa kalıyor ve eski 5. sayfa yeni 4. sayfa oluyor.",
    caption: "Silme işlemi arkadaki sayfaların numarasını kaydırır. Örnekte 3. sayfa silinince eski 5. sayfa 4. sıraya geçer; bu yüzden döndürmeyi silmeden önce yapmak ya da tüm işlemleri tek ekranda tamamlamak gerekir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Silme ve döndürme: sayfa numaraları nasıl kayar?</text>
  <text x="20" y="64" class="b">Önce (8 sayfa)</text>
  <g>
    <rect x="20" y="78" width="70" height="92" rx="4" class="sf sb"/><text x="55" y="130" class="b mid">1</text>
    <rect x="106" y="78" width="70" height="92" rx="4" class="sf sb"/><text x="141" y="130" class="b mid">2</text>
    <rect x="192" y="78" width="70" height="92" rx="4" class="dgs"/><text x="227" y="122" class="b mid dg">3</text><text x="227" y="142" class="sm mid dg">boş: sil</text>
    <rect x="278" y="78" width="70" height="92" rx="4" class="sf sb"/><text x="313" y="130" class="b mid">4</text>
    <rect x="364" y="78" width="70" height="92" rx="4" class="ps"/><text x="399" y="122" class="b mid p">5</text><text x="399" y="142" class="sm mid p">ters: 180°</text>
    <rect x="450" y="78" width="70" height="92" rx="4" class="dgs"/><text x="485" y="122" class="b mid dg">6</text><text x="485" y="142" class="sm mid dg">boş: sil</text>
    <rect x="536" y="78" width="70" height="92" rx="4" class="sf sb"/><text x="571" y="130" class="b mid">7</text>
    <rect x="622" y="78" width="70" height="92" rx="4" class="sf sb"/><text x="657" y="130" class="b mid">8</text>
  </g>
  <line x1="360" y1="186" x2="360" y2="220" class="st sw" fill="none"/>
  <polygon points="352,220 368,220 360,234" class="t2"/>
  <text x="20" y="262" class="b">Sonra (6 sayfa)</text>
  <g>
    <rect x="20" y="276" width="70" height="92" rx="4" class="oks"/><text x="55" y="320" class="b mid">1</text><text x="55" y="340" class="sm mid mu">eski 1</text>
    <rect x="106" y="276" width="70" height="92" rx="4" class="oks"/><text x="141" y="320" class="b mid">2</text><text x="141" y="340" class="sm mid mu">eski 2</text>
    <rect x="192" y="276" width="70" height="92" rx="4" class="oks"/><text x="227" y="320" class="b mid">3</text><text x="227" y="340" class="sm mid mu">eski 4</text>
    <rect x="278" y="276" width="70" height="92" rx="4" class="p"/><text x="313" y="320" class="b mid sf">4</text><text x="313" y="340" class="sm mid sf">eski 5</text>
    <rect x="364" y="276" width="70" height="92" rx="4" class="oks"/><text x="399" y="320" class="b mid">5</text><text x="399" y="340" class="sm mid mu">eski 7</text>
    <rect x="450" y="276" width="70" height="92" rx="4" class="oks"/><text x="485" y="320" class="b mid">6</text><text x="485" y="340" class="sm mid mu">eski 8</text>
  </g>
  <rect x="540" y="276" width="160" height="92" rx="8" class="sf sb"/>
  <text x="620" y="306" class="sm mid b">Aralık yazımı</text>
  <text x="620" y="330" class="sm mid">Sil: 3,6</text>
  <text x="620" y="352" class="sm mid">Döndür: 5 → 180°</text>
  <text x="360" y="402" class="sm mid t2">Önce döndürüp sonra silin ya da hepsini sayfa düzenleme ekranında tek seferde yapın.</text>
</svg>`
  },
  sections: [
    {
      h: "PDF sayfaları neden düzenlemeye ihtiyaç duyar?",
      p: [
        "PDF, belgeyi her cihazda aynı göründüğü bir son biçim olarak saklamak için tasarlanmıştır. Bu yüzden Word belgesi gibi kolayca düzenlenmez; ama sayfa düzeyindeki işlemler (silme, döndürme, sıralama, ayırma) içeriğe dokunmadan yapılabilir. Gündelik hayatta bu ihtiyaç en çok taranmış belgelerde ortaya çıkar: tarayıcı boş arka yüzleri de sayfa olarak ekler, besleyiciye ters konan kâğıt baş aşağı görünür, sayfalar karışık sırayla taranır.",
        "Başvuru sistemleri de sayfa düzenlemeyi gerektirir. Bir kurum yalnızca belirli sayfaları, belirli bir boyutun altında ve doğru sırayla istediğinde, 40 sayfalık bir dosyadan 3 sayfayı ayırmak ya da gereksiz sayfaları çıkararak dosyayı küçültmek gerekir. Bu işlemlerin hepsi ücretli bir masaüstü programı olmadan tarayıcıda yapılabilir."
      ]
    },
    {
      h: "PDF'den tek sayfa ya da birden çok sayfa nasıl silinir?",
      p: [
        "[[arac:pdf-sayfa-sil|PDF Sayfa Sil aracı]] dosyayı tarayıcınızda açar ve her sayfanın küçük resmini gösterir. Dosya bir sunucuya yüklenmez; işlem cihazınızda yapılır."
      ],
      ol: [
        "Aracı açın ve PDF dosyasını seçin ya da sürükleyip bırakın.",
        "Silinecek sayfaları küçük resimlerin üzerine tıklayarak işaretleyin. Çok sayfalı belgelerde sayfa numaralarını kutuya yazmak daha hızlıdır.",
        "Aralığı virgül ve tireyle yazın: <code>3</code> tek sayfayı, <code>3,8</code> iki ayrı sayfayı, <code>8-10</code> 8, 9 ve 10. sayfaları siler; <code>2,5-7</code> ise 2, 5, 6 ve 7. sayfaları kapsar.",
        "Seçimi önizlemede kontrol edin ve yeni PDF'i indirin. Özgün dosyanız olduğu gibi kalır.",
        "İndirilen dosyayı açıp sayfa sayısının beklediğiniz gibi azaldığını doğrulayın."
      ],
      after: [
        "Sayfa silmek dosya boyutunu genellikle azaltır; ancak tüm sayfaların paylaştığı yazı tipi ve görseller dosyada kalabildiği için azalma her zaman sayfa sayısıyla orantılı değildir. Boyutu daha fazla düşürmek gerekirse [[rehber:pdf-kucultme-nasil-yapilir|PDF küçültme rehberi]]ne bakabilirsiniz."
      ]
    },
    {
      h: "Ters taranmış PDF sayfası nasıl döndürülür?",
      p: [
        "Döndürme 90 derecelik adımlarla yapılır. Yan yatmış bir sayfa 90 ya da 270 derece, baş aşağı duran bir sayfa 180 derece döndürülür. Hangi yöne döndüreceğinizi kestirmek için sayfanın üst kenarının şu anda nerede durduğuna bakın:"
      ],
      table: {
        head: ["Sayfanın üst kenarı şu an", "Gereken döndürme", "Açıklama"],
        rows: [
          ["Solda", "90° (saat yönünde)", "Metin aşağıdan yukarı okunuyor"],
          ["Sağda", "270° (saat yönünün tersine 90°)", "Metin yukarıdan aşağı okunuyor"],
          ["Altta", "180°", "Sayfa baş aşağı"],
          ["Üstte", "Döndürme gerekmez", "Sayfa doğru konumda"]
        ]
      },
      after: [
        "[[arac:pdf-dondur|PDF Döndür aracı]]nda tüm sayfaları birden ya da yalnızca yazdığınız aralığı döndürebilirsiniz. Yatay tablolar içeren bir raporda yalnızca tablo sayfalarını döndürmek için o sayfaların numaralarını girmeniz yeterlidir.",
        "Döndürme, sayfanın içeriğini yeniden çizmez; PDF'te her sayfanın bir \"döndürme\" özelliği vardır ve araç bu değeri değiştirir. Bu yüzden işlem kalitede kayıp yaratmaz ve metin seçilebilir kalır."
      ]
    },
    {
      h: "Döndürülen sayfa kaydedilince kalıcı olur mu?",
      p: [
        "Bu sorunun cevabı döndürmeyi nerede yaptığınıza bağlıdır. PDF görüntüleyicilerin çoğunda bulunan \"görünümü döndür\" düğmesi yalnızca o anki görüntüyü çevirir; dosyayı kapatıp yeniden açtığınızda ya da başkasına gönderdiğinizde sayfa yine ters görünür. Bu, dosyanın kendisinin değişmediği anlamına gelir.",
        "Döndürme aracıyla işlem yapıp yeni PDF'i indirdiğinizde ise döndürme bilgisi dosyaya yazılır ve kalıcı olur. Dosyayı hangi cihazda, hangi programda açarsanız açın sayfa doğru yönde görünür; yazdırırken de doğru yönde basılır. Emin olmak için indirdiğiniz dosyayı farklı bir uygulamada, örneğin telefonunuzun dosya görüntüleyicisinde açıp kontrol edin."
      ]
    },
    {
      h: "PDF sayfalarının sırası nasıl değiştirilir? Tek ekranda düzenleme",
      p: [
        "Silme, döndürme ve sıralamayı ayrı araçlarda art arda yapmak mümkündür, ama her işlemden sonra sayfa numaraları değişebileceği için hata riski artar. Şekildeki örnekte 3. sayfa silindikten sonra eski 5. sayfa 4. sıraya geçer; ikinci adımda \"5. sayfayı döndür\" derseniz yanlış sayfayı döndürürsünüz.",
        "[[arac:pdf-sayfa-duzenle|PDF Sayfa Düzenle aracı]] bu işlemlerin hepsini tek ekranda, küçük resimler üzerinde yapmanızı sağlar: sayfaları sürükleyerek yeniden sıralarsınız, her sayfanın kendi döndürme düğmesiyle ters olanları düzeltirsiniz, gereksizleri silersiniz ve sonucu tek seferde kaydedersiniz."
      ],
      ol: [
        "Dosyayı sayfa düzenleme aracında açın; tüm sayfalar ızgara hâlinde görünür.",
        "Önce sırayı düzeltin: yanlış yerdeki sayfayı tutup doğru konuma sürükleyin.",
        "Ters ya da yan duran sayfaları kendi üzerlerindeki döndürme düğmesiyle düzeltin.",
        "Boş ve gereksiz sayfaları silin; ekran bu sırada numaraları güncel gösterir.",
        "Son hâli küçük resimlerden kontrol edip yeni PDF olarak kaydedin."
      ]
    },
    {
      h: "Belirli sayfaları ayrı dosya yapmak ve boş sayfa eklemek",
      p: [
        "Bir PDF'ten yalnızca belirli sayfaları ayrı dosya olarak almak, silmenin tersidir: istemediğiniz sayfaları silmek yerine istediğiniz sayfaları seçip yeni dosya olarak çıkarırsınız. Örneğin 40 sayfalık bir tapu ya da sözleşme dosyasından yalnızca 12–14. sayfaları göndermeniz gerekiyorsa sayfa düzenleme aracında bu üç sayfayı seçip \"seçilenleri yeni PDF olarak çıkar\" demeniz yeterlidir. Özgün 40 sayfalık dosya bozulmadan kalır.",
        "Boş sayfa eklemek ise özellikle çift taraflı yazdırmada işe yarar. Bir bölümün her zaman sağ sayfadan başlaması isteniyorsa ya da kitapçık hazırlarken sayfa sayısının 4'ün katı olması gerekiyorsa uygun yerlere boş sayfa eklenir. 13 sayfalık bir belgeyi kitapçık olarak basmak için sona 3 boş sayfa eklenip toplam 16'ya tamamlanır.",
        "Sayfanın tamamını değil, kenarlarındaki geniş boşlukları ya da tarayıcının eklediği siyah çerçeveyi atmak istiyorsanız silme değil kırpma gerekir; bunun için [[arac:pdf-kirp|PDF Kırp aracı]] kullanılır."
      ]
    },
    {
      h: "Telefonda PDF sayfası silinebilir mi?",
      p: [
        "Evet. Tarayıcıda çalışan PDF araçları telefonda da aynı şekilde açılır; Android'de Chrome, iPhone'da Safari ile dosyayı \"Dosyalar\" uygulamasından ya da e-posta ekinden seçebilirsiniz. Küçük resimler telefon ekranında da görünür ve dokunarak seçilebilir. Çok sayfalı belgelerde küçük ekranda tek tek dokunmak yerine aralık yazmak daha pratiktir.",
        "Telefonda dikkat edilecek iki nokta vardır. Birincisi, indirilen yeni dosya genellikle \"İndirilenler\" klasörüne kaydedilir ve özgün dosyayla karışmaması için adının farklı olduğuna bakın. İkincisi, yüzlerce sayfalık ya da çok yüksek çözünürlüklü taranmış belgeler eski telefonlarda tarayıcıyı yavaşlatabilir; bu durumda işlemi bilgisayarda yapmak daha rahattır."
      ]
    },
    {
      h: "Adobe olmadan PDF düzenlenebilir mi? Sınırlar ve resmî belgeler",
      p: [
        "Sayfa silme, döndürme, sıralama, ayırma, birleştirme ve kırpma gibi sayfa düzeyindeki işlemler için ücretli bir PDF programına ihtiyaç yoktur. Ancak sayfanın içindeki metni değiştirmek farklı bir iştir: PDF'teki metin harf harf konumlandırıldığı için bir paragrafı yeniden yazmak çoğu zaman özgün belgeye (Word, Excel) dönmeyi gerektirir. Taranmış belgelerde ise sayfa aslında bir resimdir ve metin düzenlenemez."
      ],
      ul: [
        "<strong>Şifreli PDF'ler:</strong> Açılış şifresi olan bir dosya, şifre girilmeden düzenlenemez. Dosyanın şifresini biliyorsanız önce açıp korumasız bir kopya oluşturmanız gerekir.",
        "<strong>E-imzalı belgeler:</strong> Elektronik imzalı bir PDF'te tek bir sayfanın silinmesi ya da döndürülmesi bile imzayı geçersiz kılar. İmzalı belgeyi olduğu gibi gönderin; yalnızca bir kısmı isteniyorsa kurumla iletişime geçin.",
        "<strong>Barkodlu resmî çıktılar:</strong> e-Devlet gibi sistemlerden alınan barkodlu belgeler barkodla doğrulanır. Belgeden sayfa çıkarmak doğrulamada eksik ya da tutarsız görünmesine yol açabilir; belgeyi bütün olarak gönderin.",
        "<strong>Yer işaretleri ve bağlantılar:</strong> Sayfa düzenlemesinden sonra içindekiler bağlantıları ve yer işaretleri her zaman korunmayabilir; uzun raporlarda bunu kontrol edin."
      ],
      after: [
        "Birden fazla PDF'i tek dosyada toplamanız gerekiyorsa sıralama mantığı aynıdır; ayrıntısı [[rehber:pdf-birlestirme-nasil-yapilir|PDF birleştirme rehberi]]nde anlatılır."
      ]
    },
    {
      h: "Sayfa düzenlemede sık yapılan hatalar",
      ul: [
        "<strong>Silmeden sonra eski numaralarla devam etmek:</strong> Arka arkaya yapılan işlemlerde numaralar kayar; ya tek ekranda çalışın ya da her adımdan sonra numaraları yeniden kontrol edin.",
        "<strong>Görüntüleyicide döndürüp kaydedildiğini sanmak:</strong> Görünümü döndürmek dosyayı değiştirmez; alıcı sayfayı yine ters görür.",
        "<strong>Özgün dosyanın üzerine yazmak:</strong> Yanlış sayfa silinirse geri dönüş olmaz; yeni dosyayı farklı adla kaydedin.",
        "<strong>Aralığı yanlış yazmak:</strong> <code>5-7</code> üç sayfayı kapsar; yalnızca 5 ve 7'yi silmek için <code>5,7</code> yazılmalıdır.",
        "<strong>Boş görünen sayfayı kontrol etmeden silmek:</strong> Tarayıcı açık renkli kurşun kalem yazılarını ya da arka sayfadaki küçük notları zayıf gösterebilir; silmeden önce yakınlaştırıp bakın."
      ]
    }
  ],
  faq: [
    ["PDF'den tek sayfa nasıl silinir?", "Dosyayı bir PDF sayfa silme aracında açın, silmek istediğiniz sayfanın küçük resmine tıklayın ya da numarasını yazın ve yeni dosyayı indirin. Özgün dosya değişmez; indirilen kopyada o sayfa yer almaz."],
    ["Ters taranmış PDF sayfası nasıl döndürülür?", "PDF döndürme aracında ters sayfanın numarasını seçip 180 derece döndürün; yan yatmış sayfalar için 90 ya da 270 derece seçin. İşlem kalitede kayıp yaratmaz ve yeni dosyayı kaydettiğinizde kalıcı olur."],
    ["PDF sayfalarının sırası nasıl değiştirilir?", "Sayfa düzenleme aracında tüm sayfalar küçük resim olarak görünür; yanlış yerdeki sayfayı tutup doğru konuma sürükleyin ve yeni PDF olarak kaydedin. Döndürme ve silme de aynı ekranda yapılabilir."],
    ["PDF'den belirli sayfalar nasıl ayrı dosya yapılır?", "Sayfa düzenleme aracında istediğiniz sayfaları seçip yeni PDF olarak çıkarma seçeneğini kullanın. Örneğin 40 sayfalık dosyadan 12–14. sayfaları seçerseniz yalnızca bu üç sayfadan oluşan yeni bir dosya elde edersiniz."],
    ["Döndürülen sayfa kaydedilince kalıcı olur mu?", "Döndürme aracıyla yapılıp yeni dosya olarak kaydedilen döndürme kalıcıdır ve her programda aynı görünür. Görüntüleyicideki görünüm döndürme düğmesi ise dosyayı değiştirmez; kapatınca sayfa eski hâline döner."],
    ["Telefonda PDF sayfası silinebilir mi?", "Evet, tarayıcıda çalışan bir PDF aracını Chrome ya da Safari'de açıp dosyayı seçerek telefonda da sayfa silebilirsiniz. Çok sayfalı belgelerde küçük resimlere dokunmak yerine sayfa aralığını yazmak daha pratiktir."],
    ["Adobe olmadan PDF düzenlenebilir mi?", "Sayfa silme, döndürme, sıralama, ayırma ve kırpma gibi işlemler ücretli program olmadan tarayıcıda yapılabilir. Sayfadaki metni yeniden yazmak ise çoğunlukla belgenin özgün Word ya da Excel dosyasına dönmeyi gerektirir."],
    ["PDF'e boş sayfa nasıl eklenir?", "Sayfa düzenleme aracında boş sayfa ekleme seçeneğiyle istediğiniz konuma boş sayfa koyabilirsiniz. Çift taraflı yazdırmada bölümleri sağ sayfadan başlatmak ya da kitapçık için sayfa sayısını 4'ün katına tamamlamak için kullanılır."]
  ],
  tools: ["pdf-sayfa-sil", "pdf-dondur", "pdf-sayfa-duzenle", "pdf-kirp", "pdf-n-up"],
  related: ["iki-fotograf-yan-yana-birlestirme", "a4-kagit-boyutu-kac-cm"]
};
