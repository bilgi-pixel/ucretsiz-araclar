export default {
  slug: "kelime-bulutu-nedir-nasil-yapilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Kelime Bulutu Nedir, Nasıl Yapılır? Sunum ve Analiz İçin Kullanım",
  pageTitle: "Kelime Bulutu Nedir, Nasıl Yapılır? Türkçe Metin Rehberi",
  description: "Kelime bulutu, bir metinde sık geçen kelimeleri büyük, az geçenleri küçük gösteren görseldir. Türkçe metin hazırlama, etkisiz kelime filtresi ve anket örneği.",
  keywords: ["kelime bulutu nedir", "kelime bulutu oluşturma", "word cloud türkçe", "kelime bulutu sunum", "metin analizi kelime sıklığı", "anket cevapları kelime bulutu", "kelime bulutu ödev", "etkisiz kelimeler"],
  lead: "Kelime bulutu, bir metinde en sık geçen kelimeleri büyük, daha seyrek geçenleri küçük yazı boyutuyla gösteren bir görseldir; metnin ana temalarını tek bakışta özetler. Yapmak için metni yapıştırır, \"ve, bir, bu\" gibi anlam taşımayan etkisiz kelimeleri ayıklar, en fazla kaç kelime gösterileceğini seçer ve sonucu PNG olarak kaydedersiniz. Bu yazıda boyutun nasıl hesaplandığını, Türkçe metinlerin nasıl hazırlanacağını, anket yanıtlarının buluta nasıl dönüştürüleceğini ve bulutun sınırlamalarını örnekle anlatıyoruz.",
  kisaCevap: [
    "Kelime bulutunda her kelimenin yazı boyutu, metinde kaç kez geçtiğiyle orantılıdır.",
    "Boyut genellikle en az ve en çok geçen kelime arasında doğrusal ya da karekök ölçekle dağıtılır.",
    "Türkçede \"ve, bir, bu, da, de, için, ile\" gibi etkisiz kelimeler bulutu boğmaması için filtrelenir.",
    "Aynı kelimenin ekli hâlleri (kargo, kargoyu, kargonun) ayrı sayılır; anlamlı sonuç için metni sadeleştirmek gerekir.",
    "Bulut genel bir izlenim verir; kesin karşılaştırma için kelime frekansı tablosu kullanılmalıdır."
  ],
  figure: {
    alt: "40 anket yanıtından oluşan örnek kelime bulutu: hızlı 18 kez, kargo 15, fiyat 12, kaliteli 9, paketleme 6, iade 4 kez geçiyor; yazı boyutları 56 ile 14 piksel arasında. Yanında aynı verinin sıklık tablosu.",
    caption: "Soldaki bulutta kelimelerin yazı boyutu sağdaki sıklık sayılarından doğrusal ölçekle hesaplanmıştır. Bulut temayı hızlıca gösterir, tablo ise kesin karşılaştırmayı sağlar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sıklıktan yazı boyutuna</text>
  <rect x="24" y="50" width="400" height="300" rx="14" class="sf sb"/>
  <text x="210" y="190" class="mid b p" font-size="56">hızlı</text>
  <text x="250" y="250" class="mid b" font-size="47">kargo</text>
  <text x="110" y="120" class="mid b p" font-size="38">fiyat</text>
  <text x="320" y="112" class="mid b t2" font-size="29">kaliteli</text>
  <text x="120" y="300" class="mid b ok" font-size="20">paketleme</text>
  <text x="350" y="310" class="mid b mu" font-size="14">iade</text>
  <rect x="444" y="50" width="252" height="300" rx="14" class="ps"/>
  <text x="460" y="80" class="b sm">Kelime</text><text x="590" y="80" class="b sm end">Adet</text><text x="680" y="80" class="b sm end">Boyut</text>
  <line x1="458" y1="90" x2="684" y2="90" class="sp" fill="none"/>
  <g class="sm">
    <text x="460" y="120">hızlı</text><text x="590" y="120" class="end">18</text><text x="680" y="120" class="end">56 px</text>
    <text x="460" y="156">kargo</text><text x="590" y="156" class="end">15</text><text x="680" y="156" class="end">47 px</text>
    <text x="460" y="192">fiyat</text><text x="590" y="192" class="end">12</text><text x="680" y="192" class="end">38 px</text>
    <text x="460" y="228">kaliteli</text><text x="590" y="228" class="end">9</text><text x="680" y="228" class="end">29 px</text>
    <text x="460" y="264">paketleme</text><text x="590" y="264" class="end">6</text><text x="680" y="264" class="end">20 px</text>
    <text x="460" y="300">iade</text><text x="590" y="300" class="end">4</text><text x="680" y="300" class="end">14 px</text>
  </g>
  <text x="360" y="380" class="mid sm t2">Boyut = 14 + (adet − 4) ÷ (18 − 4) × (56 − 14)</text>
</svg>`
  },
  sections: [
    {
      h: "Kelime bulutu nedir, ne işe yarar?",
      p: [
        "Kelime bulutu (İngilizcede word cloud ya da tag cloud), bir metindeki kelimeleri geçme sıklıklarına göre farklı boyutlarda bir araya getiren görseldir. En çok tekrar eden kelime en büyük, en az tekrar eden en küçük yazılır. Okuyucu metni baştan sona okumadan hangi kavramların öne çıktığını birkaç saniyede görür.",
        "En yaygın kullanım alanları ödev ve sunumlar, anket ve geri bildirim analizi, toplantı notlarının özetlenmesi, bir konuşma ya da makalenin ana temalarını göstermek ve sınıfta beyin fırtınası sonuçlarını paylaşmaktır. Bir öğretmen, öğrencilere \"Bu dönemi tek kelimeyle anlatın\" diye sorup cevapları buluta dönüştürdüğünde sınıfın genel havası tek bir görselde ortaya çıkar."
      ]
    },
    {
      h: "Kelime boyutu neye göre belirlenir?",
      p: [
        "Bulut oluşturucu önce metindeki her kelimenin kaç kez geçtiğini sayar. Ardından en az ve en çok geçen kelimeler arasında bir yazı boyutu aralığı belirler, örneğin 14 ile 56 piksel. Diğer kelimeler bu aralığa geçme sayılarıyla orantılı olarak yerleştirilir."
      ],
      formula: "Doğrusal ölçek: boyut = en küçük boyut + (adet − en az adet) ÷ (en çok adet − en az adet) × (en büyük boyut − en küçük boyut)\nÖrnek (kargo, 15 kez): 14 + (15 − 4) ÷ (18 − 4) × 42 = 14 + 33 = 47 px",
      after: [
        "Bazı araçlar doğrusal ölçek yerine karekök ya da logaritmik ölçek kullanır. Bu yöntemler en sık kelimenin bulutu tek başına kaplamasını önler; bir kelime 200, diğerleri 5–10 kez geçiyorsa doğrusal ölçekte geri kalan kelimeler okunamayacak kadar küçülür. Ayrıca alanın kelimenin uzunluğuna da bağlı olduğunu unutmayın: \"paketleme\" gibi uzun bir kelime aynı yazı boyutunda \"iade\"den çok daha fazla yer kaplar ve gözü yanıltabilir."
      ]
    },
    {
      h: "Türkçe metinlerde etkisiz kelimeler nasıl çıkarılır?",
      p: [
        "Her dilde anlam taşımayan ama çok sık geçen kelimeler vardır. Türkçede \"ve, bir, bu, şu, da, de, ki, için, ile, gibi, çok, daha, ama, ne, o\" bunların başında gelir. Filtrelenmezse bulutun en büyük kelimeleri bunlar olur ve görsel hiçbir şey anlatmaz. Bu kelimelere <strong>etkisiz kelimeler</strong> (stop words) denir.",
        "İyi bir kelime bulutu oluşturucu Türkçe etkisiz kelime listesiyle gelir ve size ek kelimeler girme imkânı verir. Konuya özgü kelimeleri de elemek gerekebilir: bir ürün yorumları analizinde ürünün adı, bir ders değerlendirmesinde \"ders\" ve \"hoca\" kelimeleri her cevapta geçer ve bilgi taşımaz."
      ],
      ul: [
        "<strong>En kısa kelime uzunluğu:</strong> 3 harften kısa kelimeleri elemek \"o, ve, de\" gibi kelimeleri otomatik temizler.",
        "<strong>Ek eleme listesi:</strong> konuya özgü ve her yanıtta geçen kelimeleri buraya yazın.",
        "<strong>Harf biçimi:</strong> \"Kargo\" ile \"kargo\" aynı sayılsın diye kelimeleri küçük harfe çevirin; Türkçe I/ı ve İ/i dönüşümünün doğru yapıldığından emin olun.",
        "<strong>Sayı ve noktalama:</strong> rakamlar, tarih ve emojiler çoğu zaman temizlenmelidir."
      ]
    },
    {
      h: "Kelime bulutu için metin nasıl hazırlanır?",
      p: [
        "Türkçe eklemeli bir dil olduğu için aynı kök birçok farklı biçimde yazılır: \"kargo, kargoyu, kargonun, kargoda, kargolar\". Bulut oluşturucu bunları ayrı kelime sayar ve asıl tema beş küçük parçaya bölünür. Bu yüzden önemli analizlerde metni önceden sadeleştirmek sonucu belirgin biçimde iyileştirir."
      ],
      ol: [
        "Metni tek bir yere toplayın: anket yanıtları, yorumlar ya da notlar alt alta yapıştırılabilir.",
        "Yazım birliği sağlayın: \"e-posta, eposta, e posta\" gibi farklı yazımları tek biçime getirin.",
        "Önemli kavramlarda ekleri kökte birleştirin: \"kargoyu, kargonun\" → \"kargo\"; bunu bul-değiştir ile yapabilirsiniz.",
        "Kelime öbeklerini birleştirin: \"müşteri hizmetleri\" iki ayrı kelime olarak sayılmasın diye \"müşteri_hizmetleri\" gibi tek parça yazın.",
        "Metni yapıştırmadan önce [[arac:kelime-sayaci|Kelime Sayacı]] ile toplam ve benzersiz kelime sayısını kontrol edin; çok kısa metinler anlamlı bir bulut üretmez."
      ],
      after: [
        "Yazım hatalarının da ayrı kelime oluşturacağını unutmayın; \"hızlı\" ve \"hizli\" iki farklı kelimedir. Türkçe karakter sorunlarının nedenleri için [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: anket yanıtlarını kelime bulutuyla özetlemek",
      p: [
        "Bir e-ticaret mağazası müşterilerine \"Alışverişinizi bir cümleyle değerlendirir misiniz?\" diye sormuş ve 40 yanıt almış olsun. Etkisiz kelimeler ve mağaza adı elendikten, ekler kökte birleştirildikten sonra en sık geçen kelimeler şöyle çıkıyor."
      ],
      table: {
        head: ["Kelime", "Geçme sayısı", "Yanıtların yüzdesi", "Bulutta boyut (14–56 px)"],
        rows: [
          ["hızlı", "18", "%45", "56 px"],
          ["kargo", "15", "%37,5", "47 px"],
          ["fiyat", "12", "%30", "38 px"],
          ["kaliteli", "9", "%22,5", "29 px"],
          ["paketleme", "6", "%15", "20 px"],
          ["iade", "4", "%10", "14 px"]
        ],
        caption: "Yüzde, kelimenin geçtiği yanıt sayısının 40'a bölümüdür; her kelimenin her yanıtta en fazla bir kez geçtiği varsayılmıştır."
      },
      after: [
        "Bulut mağazaya teslimat hızının ve kargonun müşterinin aklında en çok yer eden konular olduğunu gösteriyor. Ancak bulut tek başına bu kelimelerin olumlu mu olumsuz mu kullanıldığını söylemez: \"hızlı kargo\" ile \"kargo hızlı değildi\" aynı iki kelimeyi büyütür. Bu nedenle bulutu bir başlangıç noktası olarak görün ve öne çıkan kelimelerin geçtiği yanıtları ayrıca okuyun. Yüzde hesaplarını kendiniz yapmak isterseniz [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kelime frekansı tablosu ile bulut arasındaki fark",
      p: [
        "Kelime bulutu ve frekans tablosu aynı sayımdan üretilir ama farklı ihtiyaçlara cevap verir. Bulut sezgisel ve dikkat çekicidir; tablo ise kesin ve karşılaştırılabilirdir. Bir sunumda izleyicinin ilgisini çekmek için bulut, bir raporda karar vermek için tablo daha uygundur. Çoğu durumda ikisini birlikte göstermek en iyisidir."
      ],
      table: {
        head: ["Özellik", "Kelime bulutu", "Frekans tablosu"],
        rows: [
          ["Okuma süresi", "Birkaç saniye", "Satır satır okunur"],
          ["Kesinlik", "Düşük; boyut farkı göz kararı", "Yüksek; adet ve yüzde yazılı"],
          ["Karşılaştırma", "Zor; uzun kelimeler büyük görünür", "Kolay; sıralı liste"],
          ["Uygun yer", "Sunum kapağı, poster, sosyal medya", "Rapor, tez, analiz eki"],
          ["Bağlam", "Yok", "Yok; ama yanına örnek alıntı eklenebilir"]
        ]
      },
      after: [
        "Frekans tablosunu ayrıca çıkarmak için [[arac:kelime-frekansi|Kelime Frekansı Analizi]] aracını kullanabilirsiniz. Sıklık tablosunun genel mantığı ve çetele yöntemi [[bilgi:frekans-tablosu-cetele-nasil-yapilir|frekans tablosu nasıl yapılır]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Kelime bulutunun sınırlamaları",
      ul: [
        "<strong>Bağlamı kaybeder:</strong> \"iyi\" ve \"iyi değil\" aynı kelimeyi büyütür; olumsuzluk ve ironi görünmez.",
        "<strong>Uzun kelimeleri öne çıkarır:</strong> göz yazı boyutunu değil kapladığı alanı algılar.",
        "<strong>Ekler temayı böler:</strong> sadeleştirilmemiş Türkçe metinde aynı kavram birçok küçük kelimeye dağılır.",
        "<strong>Küçük örnekte yanıltır:</strong> 10 yanıtlık bir ankette tek bir kişinin uzun cevabı bulutu belirleyebilir.",
        "<strong>Renk ve konum anlam taşımaz:</strong> çoğu bulutta renkler ve kelimelerin yeri rastgeledir; okuyucu bunlara anlam yüklememelidir.",
        "<strong>Kelime öbeklerini ayırır:</strong> \"yapay zekâ\" gibi iki kelimelik kavramlar ayrı ayrı sayılır."
      ]
    },
    {
      h: "Sunum ve ödevlerde nasıl kullanılır?",
      p: [
        "Kelime bulutu bir sunumda konu girişinde ya da bulgular bölümünün başında etkilidir. Başlığın altına \"40 müşteri yanıtında en sık geçen kelimeler\" gibi kaynağı ve örneklem sayısını belirten kısa bir açıklama ekleyin. Hangi kelimelerin elendiğini de not etmek, izleyicinin sonucu doğru yorumlamasını sağlar.",
        "Ödevlerde bir kitabın, şiirin ya da konuşmanın ana temalarını göstermek için kullanılabilir. Örneğin bir romanın ilk bölümüyle son bölümünün bulutlarını yan yana koymak, anlatının odağının nasıl değiştiğini görsel olarak tartışmanın güzel bir yoludur. Bulut tek başına analiz değildir; yorumunuzu metinden örneklerle destekleyin."
      ],
      ul: [
        "Gösterilecek kelime sayısını 30–60 arasında tutun; daha fazlası okunmaz.",
        "Okunabilirlik için kelimelerin çoğunu yatay yazın; dikey kelimeler okumayı yavaşlatır.",
        "Sunumunuzun renklerine uygun bir palet seçin; renkli palet dikkat çeker, tek renk daha ciddi durur.",
        "Projeksiyonda arka planla yeterli kontrast olduğundan emin olun."
      ]
    },
    {
      h: "Araçla kelime bulutu oluşturma ve PNG olarak kaydetme",
      ol: [
        "[[arac:kelime-bulutu|Kelime Bulutu Oluşturucu]]yu açın ve metninizi kutuya yapıştırın.",
        "En kısa kelime uzunluğunu (örneğin 3) ve en çok kaç kelime gösterileceğini (örneğin 50) seçin.",
        "Türkçe etkisiz kelime filtresi açıkken, konuya özgü elenecek kelimeleri ek listeye yazın.",
        "Harf biçimini, şekli (dikdörtgen ya da daire), yazı tipini, renk paletini ve kelime yönünü belirleyin.",
        "Önizlemeyi kontrol edin; gerekiyorsa metni sadeleştirip tekrar oluşturun.",
        "Görseli PNG, sıklık listesini CSV olarak indirin. Metniniz tarayıcınızda işlenir, hiçbir sunucuya gönderilmez."
      ]
    }
  ],
  faq: [
    ["Kelime bulutu nedir, ne işe yarar?", "Kelime bulutu, bir metinde sık geçen kelimeleri büyük, az geçenleri küçük gösteren görseldir. Anket yanıtlarını, toplantı notlarını ya da bir konuşmanın ana temalarını tek bakışta özetlemek için sunum ve ödevlerde kullanılır."],
    ["Kelime boyutu neye göre belirlenir?", "Boyut, kelimenin metinde kaç kez geçtiğiyle orantılıdır. Araç en az ve en çok geçen kelimeler arasında bir yazı boyutu aralığı belirler ve diğer kelimeleri bu aralığa doğrusal, karekök ya da logaritmik ölçekle yerleştirir."],
    ["Türkçe metinlerde 've, bir, bu' gibi kelimeler nasıl çıkarılır?", "Türkçe etkisiz kelime filtresini açın; bu filtre bağlaç ve zamir gibi anlam taşımayan sık kelimeleri eler. Ayrıca en kısa kelime uzunluğunu 3 yapmak ve konuya özgü kelimeleri ek eleme listesine yazmak sonucu temizler."],
    ["Kelime bulutu için metin nasıl hazırlanır?", "Metni tek yerde toplayın, yazım birliği sağlayın, önemli kavramların ekli hâllerini köke indirin ve iki kelimelik kavramları tek parça yazın. Bu adımlar aynı temanın birçok küçük kelimeye bölünmesini önler."],
    ["Anket veya geri bildirim yanıtları kelime bulutuyla nasıl özetlenir?", "Yanıtları alt alta yapıştırıp etkisiz ve konuya özgü kelimeleri eleyin, ekleri birleştirin ve bulutu oluşturun. Öne çıkan kelimelerin geçtiği yanıtları ayrıca okuyun, çünkü bulut olumlu ve olumsuz kullanımı ayırt etmez."],
    ["Kelime bulutunun sınırlamaları nelerdir?", "Bulut bağlamı ve olumsuzluğu göstermez, uzun kelimeleri daha önemli gösterir, eklerle bölünen kelimelerde temayı dağıtır ve küçük örneklerde yanıltabilir. Kesin sonuç için frekans tablosuyla birlikte kullanılmalıdır."],
    ["Kelime frekansı tablosu ile bulut arasındaki fark nedir?", "İkisi aynı sayımdan üretilir. Bulut sezgisel ve dikkat çekicidir ama kesin değildir; frekans tablosu adet ve yüzdeleri sıralı gösterdiği için karşılaştırma ve raporlama için daha uygundur."],
    ["Sunum ve ödevlerde nasıl kullanılır?", "Konu girişinde ya da bulgular bölümünde, kaynağı ve örneklem sayısını belirten bir açıklamayla kullanın. Kelime sayısını 30–60 arasında tutun, kelimelerin çoğunu yatay yazın ve yorumunuzu metinden örneklerle destekleyin."],
    ["Görsel PNG olarak nasıl kaydedilir?", "Bulut oluşturulduktan sonra indirme düğmesiyle görseli PNG dosyası olarak kaydedebilirsiniz. Aynı ekrandan kelime sıklık listesini CSV olarak da indirip tabloya ya da rapora ekleyebilirsiniz."]
  ],
  tools: ["kelime-bulutu", "kelime-frekansi", "kelime-sayaci", "yuzde-hesapla"],
  related: ["frekans-tablosu-cetele-nasil-yapilir", "kelime-yogunlugu-nedir-seo", "ascii-unicode-utf8-farki"]
};
