export default {
  slug: "dpi-ve-cozunurluk-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "DPI ve Çözünürlük Nedir? Baskı İçin Fotoğraf Kaç Piksel Olmalı",
  pageTitle: "DPI Nedir? Baskı İçin Kaç Piksel ve Kaç DPI Gerekir",
  description: "DPI, bir inçe düşen nokta sayısıdır; kaliteli baskı için 300 DPI kullanılır. 10x15, A4 ve poster için gereken piksel, DPI-PPI farkı ve cm-piksel çevirme.",
  keywords: ["dpi nedir", "300 dpi kaç piksel", "baskı çözünürlüğü", "10x15 fotoğraf kaç piksel", "a4 300 dpi kaç piksel", "dpi ppi farkı", "cm piksel çevirme", "poster için kaç dpi"],
  lead: "DPI (dots per inch), bir inçlik (2,54 cm) uzunluğa kaç nokta ya da piksel düştüğünü gösteren baskı yoğunluğu ölçüsüdür; yakından bakılan fotoğraf ve belgeler için standart değer <strong>300 DPI</strong>'dır. Bir görselin kaç santimetrelik baskıya yeteceğini piksel sayısı ile DPI birlikte belirler: piksel = cm ÷ 2,54 × DPI. Bu sayfada DPI ile PPI farkını, 10x15'ten postere kadar gereken piksel ölçülerini, telefon fotoğrafının ne kadar büyük basılabileceğini ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Piksel = santimetre ÷ 2,54 × DPI; santimetre = piksel ÷ DPI × 2,54.",
    "Fotoğraf albümü, belge ve kartvizit gibi yakından bakılan baskılar için 300 DPI hedeflenir.",
    "300 DPI'da A4 (21 × 29,7 cm) 2480 × 3508 piksel, 10 × 15 cm fotoğraf 1181 × 1772 pikseldir.",
    "Uzaktan bakılan poster ve afişlerde 100–150 DPI çoğu zaman yeterlidir.",
    "Dosyanın DPI etiketini değiştirmek piksel sayısını, dolayısıyla gerçek kaliteyi değiştirmez.",
    "PPI ekranlar ve dijital görseller için, DPI ise yazıcının bastığı mürekkep noktaları için kullanılır."
  ],
  figure: {
    alt: "Aynı 1 inçlik karede 72, 150 ve 300 DPI yoğunluğu karşılaştırması; altta 10x15 fotoğraf, A4 sayfa ve 50x70 poster için gereken piksel ölçüleri.",
    caption: "DPI arttıkça aynı fiziksel alana daha çok piksel düşer ve ayrıntı keskinleşir. Gereken piksel sayısı, baskı ölçüsü ile hedef DPI çarpılarak bulunur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1 inç (2,54 cm) içinde kaç nokta?</text>
  <g>
    <rect x="60" y="54" width="150" height="150" class="sf sb"/>
    <rect x="60" y="54" width="50" height="50" class="ps"/><rect x="160" y="54" width="50" height="50" class="ps"/>
    <rect x="110" y="104" width="50" height="50" class="ps"/><rect x="60" y="154" width="50" height="50" class="ps"/><rect x="160" y="154" width="50" height="50" class="ps"/>
    <text x="135" y="228" class="b mid">72 DPI</text><text x="135" y="248" class="sm mid mu">ekran, iri nokta</text>
  </g>
  <g>
    <rect x="285" y="54" width="150" height="150" class="sf sb"/>
    <rect x="285" y="54" width="25" height="25" class="p"/><rect x="335" y="54" width="25" height="25" class="p"/><rect x="385" y="54" width="25" height="25" class="p"/>
    <rect x="310" y="79" width="25" height="25" class="p"/><rect x="360" y="79" width="25" height="25" class="p"/><rect x="410" y="79" width="25" height="25" class="p"/>
    <rect x="285" y="104" width="25" height="25" class="p"/><rect x="335" y="104" width="25" height="25" class="p"/><rect x="385" y="104" width="25" height="25" class="p"/>
    <rect x="310" y="129" width="25" height="25" class="p"/><rect x="360" y="129" width="25" height="25" class="p"/><rect x="410" y="129" width="25" height="25" class="p"/>
    <rect x="285" y="154" width="25" height="25" class="p"/><rect x="335" y="154" width="25" height="25" class="p"/><rect x="385" y="154" width="25" height="25" class="p"/>
    <rect x="310" y="179" width="25" height="25" class="p"/><rect x="360" y="179" width="25" height="25" class="p"/><rect x="410" y="179" width="25" height="25" class="p"/>
    <text x="360" y="228" class="b mid">150 DPI</text><text x="360" y="248" class="sm mid mu">poster, afiş</text>
  </g>
  <g>
    <rect x="510" y="54" width="150" height="150" class="p"/>
    <line x1="510" y1="79" x2="660" y2="79" class="sb" fill="none"/><line x1="510" y1="104" x2="660" y2="104" class="sb" fill="none"/>
    <line x1="510" y1="129" x2="660" y2="129" class="sb" fill="none"/><line x1="510" y1="154" x2="660" y2="154" class="sb" fill="none"/>
    <line x1="510" y1="179" x2="660" y2="179" class="sb" fill="none"/><line x1="535" y1="54" x2="535" y2="204" class="sb" fill="none"/>
    <line x1="560" y1="54" x2="560" y2="204" class="sb" fill="none"/><line x1="585" y1="54" x2="585" y2="204" class="sb" fill="none"/>
    <line x1="610" y1="54" x2="610" y2="204" class="sb" fill="none"/><line x1="635" y1="54" x2="635" y2="204" class="sb" fill="none"/>
    <text x="585" y="228" class="b mid">300 DPI</text><text x="585" y="248" class="sm mid mu">fotoğraf, belge</text>
  </g>
  <rect x="20" y="272" width="680" height="134" rx="10" class="sf sb"/>
  <text x="40" y="300" class="b">Gereken piksel = cm ÷ 2,54 × DPI</text>
  <g class="sm">
    <text x="40" y="330" class="b">10 × 15 cm, 300 DPI</text><text x="680" y="330" class="end p b">1181 × 1772 px (2,1 MP)</text>
    <text x="40" y="358" class="b">A4 21 × 29,7 cm, 300 DPI</text><text x="680" y="358" class="end p b">2480 × 3508 px (8,7 MP)</text>
    <text x="40" y="386" class="b">Poster 50 × 70 cm, 150 DPI</text><text x="680" y="386" class="end p b">2953 × 4134 px (12,2 MP)</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "DPI nedir, çözünürlük ne demektir?",
      p: [
        "Dijital bir görsel piksel adı verilen küçük karelerden oluşur ve <strong>çözünürlüğü</strong> genişlik × yükseklik piksel sayısıyla ifade edilir: 4000 × 3000 piksel gibi. Bu sayı görselin içinde ne kadar ayrıntı bulunduğunu gösterir ama tek başına baskı boyutu hakkında bir şey söylemez. Aynı 4000 piksel, küçük bir kartta çok keskin, dev bir afişte ise bulanık görünebilir.",
        "Fiziksel boyutla piksel arasındaki köprü <strong>DPI</strong>'dır (dots per inch, inç başına nokta). 300 DPI, her 2,54 cm'lik uzunluğa 300 piksel yerleştirileceği anlamına gelir. DPI yükseldikçe pikseller küçülür, baskı daha keskin görünür ama aynı görsel daha küçük bir alana basılabilir.",
        "Kısacası piksel sayısı \"elinizdeki ayrıntı miktarı\", DPI ise \"bu ayrıntıyı ne kadar sıkı yerleştireceğiniz\" kararıdır. Baskı boyutunu ikisi birlikte belirler."
      ]
    },
    {
      h: "Piksel, santimetre ve DPI formülü",
      p: [
        "Hesabın tamamı tek bir eşitliğe dayanır: 1 inç = 2,54 cm. Santimetreyi inçe çevirip DPI ile çarparsanız gereken pikseli, pikseli DPI'ya bölüp 2,54 ile çarparsanız basılabilecek santimetreyi bulursunuz."
      ],
      formula: "Piksel = cm ÷ 2,54 × DPI\ncm = piksel ÷ DPI × 2,54\nDPI = piksel ÷ (cm ÷ 2,54)",
      ol: [
        "<strong>Örnek 1 – 10 × 15 cm fotoğraf, 300 DPI:</strong> 10 ÷ 2,54 × 300 = 1181,1 piksel; 15 ÷ 2,54 × 300 = 1771,7 piksel. Yuvarlarsak 1181 × 1772 piksel, yaklaşık 2,1 megapiksel gerekir.",
        "<strong>Örnek 2 – 12 MP telefon fotoğrafı (4000 × 3000) kaç cm basılır?</strong> 300 DPI'da 4000 ÷ 300 × 2,54 = 33,9 cm ve 3000 ÷ 300 × 2,54 = 25,4 cm. Yani yaklaşık 34 × 25 cm'lik keskin bir baskı alınır.",
        "<strong>Örnek 3 – Aynı fotoğraf poster olursa:</strong> 150 DPI'da 4000 ÷ 150 × 2,54 = 67,7 cm ve 3000 ÷ 150 × 2,54 = 50,8 cm. Duvardan birkaç adım geriden bakılan bir poster için bu ölçü rahatlıkla kullanılabilir.",
        "<strong>Örnek 4 – Elimdeki görselin gerçek DPI'ı:</strong> 1200 piksel genişliğindeki bir logo 20 cm genişliğe basılırsa 1200 ÷ (20 ÷ 2,54) = 152 DPI elde edilir; kartvizit kalitesi için yetersiz, broşür için sınırda kalır."
      ],
      after: [
        "Bu hesapları hızlıca yapmak için [[arac:cm-piksel-cevir|cm Piksel Çevirici]] ya da baskı ölçüsünü girip megapiksel ve dosya boyutunu da gösteren [[arac:baski-piksel-boyutu-hesapla|Baskı Piksel Boyutu Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Baskı için kaç DPI gerekir?",
      p: [
        "Gereken DPI, baskıya hangi mesafeden bakılacağına bağlıdır. İnsan gözü yakın mesafede ince ayrıntıları ayırt eder, uzaklaştıkça bu yeteneği azalır. Bu yüzden elde tutulan bir fotoğraf ile yolun karşısından görülen bir afiş aynı yoğunluğu gerektirmez."
      ],
      table: {
        head: ["Baskı türü", "Bakış mesafesi", "Önerilen DPI"],
        rows: [
          ["Kartvizit, davetiye, fotoğraf albümü", "30 cm'den yakın", "300"],
          ["Dergi, broşür, katalog", "30–50 cm", "300"],
          ["A4 belge, rapor, sertifika", "40–60 cm", "200–300"],
          ["Duvar fotoğrafı, kanvas tablo", "1–2 m", "150–200"],
          ["Poster, roll-up", "1–3 m", "100–150"],
          ["Bina giydirme, billboard", "10 m ve üzeri", "20–75"]
        ],
        caption: "Değerler yaygın matbaa uygulamalarıdır. Baskıyı yaptıracağınız yerin teknik şartnamesi farklı bir değer istiyorsa onu esas alın."
      }
    },
    {
      h: "Yaygın baskı ölçüleri için piksel tablosu",
      p: [
        "Aşağıdaki tablo, sık kullanılan fotoğraf ve kâğıt ölçüleri için 150 ve 300 DPI'da gereken piksel değerlerini gösterir. Görseliniz bu değerlerin altındaysa baskıda yumuşama ve tırtıklanma görülebilir; üstündeyse sorun yoktur, fazla pikseller baskıda küçültülür."
      ],
      table: {
        head: ["Ölçü (cm)", "150 DPI (piksel)", "300 DPI (piksel)", "300 DPI megapiksel"],
        rows: [
          ["Vesikalık 4,5 × 6", "266 × 354", "531 × 709", "0,4 MP"],
          ["Kartvizit 8,5 × 5,5", "502 × 325", "1004 × 650", "0,7 MP"],
          ["10 × 15", "591 × 886", "1181 × 1772", "2,1 MP"],
          ["13 × 18", "768 × 1063", "1535 × 2126", "3,3 MP"],
          ["A5 14,8 × 21", "874 × 1240", "1748 × 2480", "4,3 MP"],
          ["A4 21 × 29,7", "1240 × 1754", "2480 × 3508", "8,7 MP"],
          ["20 × 30", "1181 × 1772", "2362 × 3543", "8,4 MP"],
          ["A3 29,7 × 42", "1754 × 2480", "3508 × 4961", "17,4 MP"],
          ["50 × 70", "2953 × 4134", "5906 × 8268", "48,8 MP"]
        ],
        caption: "Piksel değerleri en yakın tam sayıya yuvarlanmıştır. A serisi kâğıtların tüm ölçüleri için [[bilgi:a4-kagit-boyutu-kac-cm|A4 kâğıt boyutu rehberine]] bakabilirsiniz."
      }
    },
    {
      h: "DPI ile PPI arasındaki fark",
      p: [
        "<strong>PPI</strong> (pixels per inch) dijital görüntüdeki ya da ekrandaki piksel yoğunluğunu, <strong>DPI</strong> ise yazıcının kâğıda bıraktığı mürekkep noktalarının yoğunluğunu anlatır. Günlük kullanımda iki terim çoğu zaman birbirinin yerine kullanılır ve fotoğraf baskısı konuşulurken \"300 DPI\" denildiğinde aslında \"300 PPI\" kastedilir.",
        "Teknik farkın pratik bir sonucu vardır: bir mürekkep püskürtmeli yazıcının 4800 DPI çözünürlüğü, fotoğrafınızın 4800 PPI olması gerektiği anlamına gelmez. Yazıcı her pikseli renk karışımı oluşturmak için çok sayıda küçük mürekkep noktasıyla basar. Görseliniz için hedef yine 300 PPI civarıdır.",
        "Ekranlarda ise PPI, ekranın köşegen piksel sayısının inç cinsinden köşegene bölünmesiyle bulunur. 1920 × 1080 çözünürlüklü 24 inç bir monitörde köşegen √(1920² + 1080²) ≈ 2203 pikseldir; 2203 ÷ 24 ≈ 92 PPI eder. Telefonlarda bu değer 400 PPI'ın üzerine çıkabilir."
      ],
      formula: "Ekran PPI = √(genişlik² + yükseklik²) ÷ köşegen (inç)"
    },
    {
      h: "Fotoğrafın DPI'ı nasıl değiştirilir? Gerçekte ne değişir?",
      p: [
        "JPEG ve PNG dosyalarının içinde bir \"DPI\" bilgisi saklanır; ancak bu yalnızca bir etikettir. Bir görselin DPI etiketini 72'den 300'e çevirmek piksel sayısını değiştirmez; yalnızca yazılımın o görseli varsayılan olarak hangi boyutta basacağını değiştirir. 1200 × 1800 piksellik bir fotoğraf 72 DPI etiketiyle 42 × 63 cm, 300 DPI etiketiyle 10 × 15 cm olarak görünür ama içindeki ayrıntı aynıdır.",
        "Gerçek kaliteyi belirleyen piksel sayısıdır. Pikseli yetersiz bir görseli büyütmek (yeniden örneklemek) eksik ayrıntıyı yaratmaz; programlar boşlukları tahminle doldurur ve görüntü yumuşar. Bu yüzden matbaa \"300 DPI gönderin\" dediğinde, istenen ölçüde 300 DPI'a yetecek piksel sayısına sahip bir dosya göndermeniz gerekir."
      ],
      ul: [
        "Piksel sayısını değiştirmek için [[arac:resim-boyutlandir|Resim Boyutlandırma]] aracını kullanabilirsiniz; küçültme kaliteyi korur, büyütme ise ayrıntı eklemez.",
        "Görselin hangi boyutta kaç DPI vereceğini hesaplamak için [[arac:dpi-hesapla|DPI Hesaplama]] aracı piksel, santimetre ve DPI arasında çift yönlü çevirme yapar."
      ]
    },
    {
      h: "Baskıya dosya göndermeden önce kontrol listesi",
      p: [
        "Fotoğraf stüdyosuna, matbaaya ya da kırtasiyeye dosya göndermeden önce birkaç dakikalık kontrol, hem tekrar baskı masrafını hem de zaman kaybını önler. Aşağıdaki adımları sırayla uygulayın."
      ],
      ol: [
        "Baskı ölçüsünü santimetre olarak netleştirin ve kenara kadar baskı varsa her kenara 3 mm taşma payı ekleyin.",
        "Hedef DPI'ı bakış mesafesine göre seçin: elde tutulan işler için 300, duvar ve poster işleri için 150 civarı.",
        "Gereken pikseli formülle hesaplayın ve görselinizin piksel ölçüsüyle karşılaştırın; dosya özelliklerinden ya da görüntüleyicinin bilgi panelinden piksel değerini görebilirsiniz.",
        "Görselin en-boy oranı baskı ölçüsüyle aynı değilse kırpma gerekecektir; önemli bir ayrıntının kenarda kalıp kesilmediğinden emin olun.",
        "Metin ve logo içeren işlerde mümkünse vektörel dosya ya da yüksek çözünürlüklü PDF gönderin; vektörel çizimler her ölçüde keskin kalır.",
        "Gönderdiğiniz dosyanın sıkıştırılmamış ya da yüksek kaliteli JPEG olduğundan emin olun; aşırı sıkıştırma piksel sayısı yeterli olsa bile bloklanma yaratır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Web'den indirilen görseli basmak:</strong> İnternet sitelerindeki görseller genellikle 800–1500 piksel genişliğindedir; A4 bir broşür için gereken 2480 pikselin çok altında kalır.",
        "<strong>Ekran görüntüsüyle baskı:</strong> Ekran görüntüsü ekranın piksel sayısıyla sınırlıdır ve metinler baskıda tırtıklı görünür. Belge basacaksanız asıl dosyayı ya da PDF'i kullanın.",
        "<strong>Sohbet uygulamasından gelen fotoğraf:</strong> Mesajlaşma uygulamaları fotoğrafları sıkıştırıp küçültür. Baskı için fotoğrafın orijinalini isteyin.",
        "<strong>Yalnızca DPI etiketine bakmak:</strong> \"Dosyam 300 DPI\" demek yeterli değildir; asıl soru, istenen ölçüde 300 DPI'ı karşılayacak piksel olup olmadığıdır.",
        "<strong>Taşma payını unutmak:</strong> Kenara kadar basılacak işlerde her kenara genellikle 3 mm taşma payı eklenir; piksel hesabını bu ölçüyle yapın."
      ]
    }
  ],
  faq: [
    ["DPI nedir?", "DPI, dots per inch ifadesinin kısaltmasıdır ve bir inçlik (2,54 cm) uzunluğa kaç nokta ya da piksel düştüğünü gösterir. Baskı kalitesini ve bir görselin kaç santimetre basılabileceğini piksel sayısıyla birlikte belirler."],
    ["Baskı için kaç DPI gerekir?", "Yakından bakılan fotoğraf, kartvizit, broşür ve belgeler için 300 DPI standarttır. Duvar fotoğrafı ve kanvas için 150–200, uzaktan bakılan poster ve afişler için 100–150 DPI çoğu zaman yeterli kaliteyi verir."],
    ["300 DPI A4 kaç pikseldir?", "A4 kâğıt 21 × 29,7 cm'dir. 300 DPI'da bu ölçü 2480 × 3508 piksele, yaklaşık 8,7 megapiksele karşılık gelir. 150 DPI için 1240 × 1754 piksel yeterlidir."],
    ["10x15 fotoğraf baskısı için kaç piksel gerekir?", "10 × 15 cm'lik bir fotoğraf baskısı için 300 DPI'da 1181 × 1772 piksel gerekir. Bu yaklaşık 2,1 megapiksel eder ve günümüz telefonlarının çektiği fotoğraflar bu değerin çok üzerindedir."],
    ["DPI ile PPI farkı nedir?", "PPI dijital görüntüdeki ya da ekrandaki piksel yoğunluğunu, DPI ise yazıcının kâğıda bıraktığı mürekkep noktası yoğunluğunu ifade eder. Fotoğraf baskısında konuşulan 300 DPI aslında görselin 300 PPI olması anlamına gelir."],
    ["Fotoğrafın DPI'ı nasıl değiştirilir?", "Görüntü düzenleme programlarında DPI etiketi değiştirilebilir, ancak bu piksel sayısını ve gerçek kaliteyi değiştirmez. Daha keskin baskı için ya ölçüyü küçültmek ya da daha yüksek piksel sayısına sahip bir orijinal kullanmak gerekir."],
    ["Telefon fotoğrafı poster olarak basılır mı?", "12 megapiksellik bir telefon fotoğrafı 300 DPI'da yaklaşık 34 × 25 cm, 150 DPI'da 68 × 51 cm basılabilir. Uzaktan bakılan bir poster için 50 × 70 cm ölçüsü genellikle kabul edilebilir sonuç verir."],
    ["cm piksele nasıl çevrilir?", "Santimetre değeri 2,54'e bölünerek inçe çevrilir ve sonuç DPI ile çarpılır. Örneğin 300 DPI'da 5 cm, 5 ÷ 2,54 × 300 = 590,6 yani yaklaşık 591 piksel eder."],
    ["Ekranda 72 DPI mi 96 DPI mi kullanılır?", "Ekranda gösterilen görseller için DPI etiketi önemsizdir; ekran görseli kendi piksel sayısıyla gösterir. 72 ve 96 değerleri eski işletim sistemlerinden kalma varsayımlardır ve web görsellerinde yalnızca piksel ölçüsüne bakmak yeterlidir."]
  ],
  tools: ["dpi-hesapla", "baski-piksel-boyutu-hesapla", "cm-piksel-cevir", "resim-boyutlandir"],
  related: ["a4-kagit-boyutu-kac-cm"]
};
