export default {
  slug: "kamera-ve-mikrofon-testi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Kamera ve Mikrofon Testi Nasıl Yapılır? Görüntülü Görüşme Öncesi",
  pageTitle: "Kamera ve Mikrofon Testi: İzin, Siyah Ekran ve Ses Sorunları",
  description: "Kamera ve mikrofonu tarayıcıda izin verip canlı görüntü ve ses seviyesiyle test edebilirsiniz. Siyah ekran, ses gelmemesi, izin ayarları ve sınav öncesi kontrol.",
  keywords: ["kamera testi", "mikrofon testi", "webcam test", "mikrofon çalışmıyor", "kamera açılmıyor", "hoparlör testi", "görüntülü görüşme öncesi test", "laptop kamerası siyah"],
  lead: "Kameranızı ve mikrofonunuzu test etmenin en hızlı yolu, bir test sayfasında tarayıcıya erişim izni verip <strong>canlı görüntüyü</strong> ve <strong>ses seviyesi göstergesini</strong> izlemektir; görüntü geliyor ve konuştuğunuzda gösterge hareket ediyorsa cihazlar çalışıyordur. Görüntü siyahsa ya da ses gelmiyorsa sorun çoğunlukla izinlerde, yanlış seçilmiş cihazda ya da kamerayı kullanan başka bir uygulamadadır. Bu sayfada adım adım test yöntemini, en sık sorunların çözümünü ve online sınav öncesi kontrol listesini bulacaksınız.",
  kisaCevap: [
    "Tarayıcı kameraya ve mikrofona yalnızca siz izin verdiğinizde erişebilir; izin adres çubuğundaki kilit ya da kamera simgesinden yönetilir.",
    "Kamera siyah görünüyorsa önce fiziksel kapağı, kamera kapatma tuşunu ve kamerayı kullanan başka bir uygulamayı kontrol edin.",
    "Ses seviyesi göstergesi hareket etmiyorsa yanlış giriş cihazı seçilmiş ya da mikrofon sessize alınmış olabilir.",
    "İşletim sisteminin gizlilik ayarlarında kamera ve mikrofon erişimi kapalıysa tarayıcı izni tek başına yetmez.",
    "Hoparlör testinde sol ve sağ kanalın ayrı ayrı doğru taraftan gelmesi gerekir.",
    "Önemli bir görüşme ya da sınavdan en az 15 dakika önce aynı cihaz ve tarayıcıyla test yapın."
  ],
  figure: {
    alt: "Kamera ve mikrofon sorun giderme akış şeması: önce tarayıcı izni, sonra işletim sistemi gizlilik ayarı, ardından doğru cihaz seçimi, başka uygulama kontrolü ve son olarak fiziksel kapak ile sürücü kontrolü.",
    caption: "Sorunların büyük çoğunluğu ilk iki kutuda çözülür. Her adımdan sonra test sayfasını yenileyip yeniden deneyin.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Görüntü ya da ses gelmiyor mu? Sırayla kontrol edin</text>
  <g>
    <rect x="20" y="56" width="216" height="92" rx="10" class="p"/>
    <text x="128" y="84" class="b mid sf">1. Tarayıcı izni</text>
    <text x="128" y="108" class="sm mid sf">Adres çubuğundaki simge</text>
    <text x="128" y="128" class="sm mid sf">"İzin ver" seçili mi?</text>
    <rect x="252" y="56" width="216" height="92" rx="10" class="ps"/>
    <text x="360" y="84" class="b mid">2. Sistem gizlilik ayarı</text>
    <text x="360" y="108" class="sm mid t2">Windows / macOS / telefon</text>
    <text x="360" y="128" class="sm mid t2">uygulamalara erişim açık mı?</text>
    <rect x="484" y="56" width="216" height="92" rx="10" class="ps"/>
    <text x="592" y="84" class="b mid">3. Doğru cihaz</text>
    <text x="592" y="108" class="sm mid t2">Listede harici kamera,</text>
    <text x="592" y="128" class="sm mid t2">kulaklık mikrofonu seçili mi?</text>
    <line x1="238" y1="102" x2="248" y2="102" class="sp sw" fill="none" marker-end="url(#ok2)"/>
    <line x1="470" y1="102" x2="480" y2="102" class="sp sw" fill="none" marker-end="url(#ok2)"/>
    <line x1="592" y1="150" x2="592" y2="176" class="sp sw" fill="none" marker-end="url(#ok2)"/>
    <rect x="484" y="182" width="216" height="92" rx="10" class="sf sb"/>
    <text x="592" y="210" class="b mid">4. Başka uygulama</text>
    <text x="592" y="234" class="sm mid t2">Kamerayı başka program</text>
    <text x="592" y="254" class="sm mid t2">kullanıyor mu? Kapatın.</text>
    <line x1="482" y1="228" x2="472" y2="228" class="sp sw" fill="none" marker-end="url(#ok2)"/>
    <rect x="252" y="182" width="216" height="92" rx="10" class="sf sb"/>
    <text x="360" y="210" class="b mid">5. Fiziksel kontrol</text>
    <text x="360" y="234" class="sm mid t2">Kamera kapağı, Fn tuşu,</text>
    <text x="360" y="254" class="sm mid t2">mikrofon sessiz düğmesi</text>
    <line x1="250" y1="228" x2="240" y2="228" class="sp sw" fill="none" marker-end="url(#ok2)"/>
    <rect x="20" y="182" width="216" height="92" rx="10" class="sf sb"/>
    <text x="128" y="210" class="b mid">6. Sürücü ve yeniden başlatma</text>
    <text x="128" y="234" class="sm mid t2">Aygıt Yöneticisi, güncelleme,</text>
    <text x="128" y="254" class="sm mid t2">bilgisayarı yeniden başlat</text>
  </g>
  <rect x="20" y="298" width="680" height="116" rx="10" class="oks"/>
  <text x="40" y="326" class="b ok">Test başarılı sayılır, eğer:</text>
  <text x="40" y="352" class="sm">Görüntü akıcı ve yüzünüz iyi aydınlanmış · konuşunca seviye çubuğu yükseliyor</text>
  <text x="40" y="376" class="sm">Kayıt dinlendiğinde ses net, cızırtısız · sol ses soldan, sağ ses sağdan geliyor</text>
  <text x="40" y="400" class="sm t2">Hepsi görüşmede kullanacağınız cihaz ve tarayıcıyla denenmeli.</text>
</svg>`
  },
  sections: [
    {
      h: "Tarayıcıda kamera ve mikrofon testi nasıl çalışır?",
      p: [
        "Modern tarayıcılar, web sayfalarının kamera ve mikrofona erişmesine yalnızca kullanıcı izin verdiğinde olanak tanır. Bir test sayfası açtığınızda tarayıcı adres çubuğunun yanında \"Bu site kameranızı ve mikrofonunuzu kullanmak istiyor\" gibi bir soru gösterir. İzin verdiğinizde sayfa canlı görüntüyü ve mikrofondan gelen sesin seviyesini ekrana yansıtabilir.",
        "İyi tasarlanmış bir test aracı görüntüyü ve sesi yalnızca cihazınızda işler; hiçbir veri sunucuya gönderilmez. [[arac:kamera-test|Kamera Testi]] aracı canlı görüntünün yanında kameranın verdiği çözünürlüğü, mikrofon seviye göstergesini ve sol-sağ hoparlör sınamasını tek ekranda sunar. Bu sayede görüşme uygulamasını açmadan üç cihazı birden kontrol edebilirsiniz.",
        "Kamera ve mikrofon erişimi güvenlik nedeniyle yalnızca güvenli (şifreli) bağlantı üzerinden çalışan sayfalarda izin verilir. Adres çubuğunda kilit simgesi görmüyorsanız tarayıcı izin sorusunu hiç göstermeyebilir."
      ]
    },
    {
      h: "Adım adım kamera testi",
      ol: [
        "Görüşmede kullanacağınız tarayıcıda [[arac:kamera-test|Kamera Testi]] sayfasını açın ve \"Kamerayı başlat\" düğmesine basın.",
        "Tarayıcının sorduğu izin penceresinde \"İzin ver\" seçeneğini işaretleyin. Bu pencere çıkmazsa adres çubuğundaki kamera ya da kilit simgesinden izni elle açın.",
        "Birden fazla kameranız varsa (dizüstü bilgisayarın kendi kamerası ve harici webcam gibi) listeden kullanacağınızı seçin.",
        "Görüntüde yüzünüzün net, akıcı ve yeterince aydınlık olduğunu kontrol edin. Pencere arkanızdaysa yüzünüz karanlık görünür; ışık kaynağını karşınıza alın.",
        "Ekranda gösterilen çözünürlük bilgisine bakın. 1280 × 720 (HD) görüntülü görüşmeler için yeterlidir; 640 × 480 görüyorsanız yanlış kamera ya da düşük kalite modu seçili olabilir.",
        "Kamerayı kapatıp test sayfasını kapatın; kameranın yanındaki ışığın söndüğünü görün."
      ]
    },
    {
      h: "Adım adım mikrofon ve hoparlör testi",
      p: [
        "Mikrofon testinde amaç iki şeyi doğrulamaktır: ses gerçekten algılanıyor mu ve algılanan ses anlaşılır mı? Seviye göstergesi ilk soruyu, kısa bir kayıt alıp dinlemek ikinci soruyu yanıtlar."
      ],
      ol: [
        "[[arac:mikrofon-test|Mikrofon Testi]] sayfasını açın, izin verin ve doğru giriş cihazını seçin. Kulaklık kullanıyorsanız kulaklığın mikrofonunu seçmeyi unutmayın.",
        "Normal sesinizle konuşun. Seviye çubuğu konuşurken belirgin biçimde yükselmeli, sustuğunuzda neredeyse sıfıra inmelidir.",
        "10 saniyelik bir kayıt alıp dinleyin. Ses boğuk, uzak ya da cızırtılıysa mikrofonla ağzınız arasındaki mesafeyi ve ortam gürültüsünü kontrol edin.",
        "Hoparlör ya da kulaklık için [[arac:hoparlor-test|Hoparlör Testi]] sayfasında sol ve sağ kanalı ayrı ayrı çalın. Sol kanal sesi sol taraftan, sağ kanal sesi sağ taraftan gelmelidir.",
        "Daha uzun bir deneme kaydı almak ve dosya olarak saklamak isterseniz [[arac:ses-kaydedici|Ses Kaydedici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "İzinleri açma: tarayıcı ve işletim sistemi",
      p: [
        "Kamera ve mikrofon erişimi iki katmanda kontrol edilir. Birinci katman tarayıcıdır: her site için ayrı izin tutulur. İkinci katman işletim sistemidir: tarayıcının kendisinin kameraya erişmesine izin verilmemişse, siteye izin vermeniz bir işe yaramaz."
      ],
      table: {
        head: ["Ortam", "Nereden açılır?", "Dikkat edilecek nokta"],
        rows: [
          ["Tarayıcı (masaüstü)", "Adres çubuğundaki kilit ya da kamera simgesi → site izinleri", "Daha önce \"Engelle\" dediyseniz soru bir daha çıkmaz; izni buradan değiştirin"],
          ["Windows", "Ayarlar → Gizlilik ve güvenlik → Kamera / Mikrofon", "Hem genel erişim hem de \"masaüstü uygulamalarının erişmesine izin ver\" açık olmalı"],
          ["macOS", "Sistem Ayarları → Gizlilik ve Güvenlik → Kamera / Mikrofon", "Tarayıcının yanındaki anahtar açık olmalı; değişiklikten sonra tarayıcıyı yeniden başlatın"],
          ["Android", "Ayarlar → Uygulamalar → tarayıcı → İzinler", "\"Yalnızca uygulama kullanılırken\" seçeneği yeterlidir"],
          ["iPhone / iPad", "Ayarlar → tarayıcı uygulaması → Kamera / Mikrofon", "Ayrıca web sitesi ayarlarında \"Sor\" ya da \"İzin Ver\" seçili olmalı"]
        ],
        caption: "Menü adları işletim sistemi sürümüne göre küçük farklılıklar gösterebilir."
      }
    },
    {
      h: "Laptop kamerası neden siyah görünüyor?",
      p: [
        "İzin verildiği hâlde görüntü yerine siyah bir kare görüyorsanız sorun genellikle donanım tarafındadır. Aşağıdaki nedenler en sıktan en seyreğe doğru sıralanmıştır."
      ],
      ul: [
        "<strong>Fiziksel kapak:</strong> Birçok dizüstü bilgisayarda kameranın önünde kaydırmalı bir gizlilik kapağı bulunur. Kapak kapalıyken kamera çalışır ama görüntü siyahtır.",
        "<strong>Kamera kapatma tuşu:</strong> Bazı modellerde F tuşları sırasında üzeri çizili kamera simgeli bir tuş vardır; basıldığında kamera donanımsal olarak devre dışı kalır.",
        "<strong>Başka uygulama kullanıyor:</strong> Kamera aynı anda yalnızca bir uygulamaya görüntü verebilir. Arka planda açık kalan görüşme ya da kayıt programını kapatın.",
        "<strong>Yanlış kamera seçili:</strong> Sanal kamera yazılımları ya da bağlı olmayan eski bir webcam listede ilk sırada olabilir.",
        "<strong>Sürücü sorunu:</strong> Windows'ta Aygıt Yöneticisi'nde kamerada uyarı işareti görüyorsanız sürücüyü güncelleyin ya da cihazı kaldırıp bilgisayarı yeniden başlatın."
      ]
    },
    {
      h: "Mikrofon sesi neden gelmiyor?",
      ul: [
        "<strong>Sessize alınmış:</strong> Kulaklık kablosundaki sessiz düğmesi, klavyedeki mikrofon kapatma tuşu ya da görüşme uygulamasındaki sessiz simgesi açık olabilir.",
        "<strong>Yanlış giriş cihazı:</strong> Bilgisayar kulaklığınızı bağladığınız hâlde dahili mikrofonu kullanmaya devam ediyor olabilir. Hem işletim sisteminin ses ayarlarında hem de görüşme uygulamasında giriş cihazını kontrol edin.",
        "<strong>Düşük giriş seviyesi:</strong> Sistem ses ayarlarında mikrofon seviyesi çok düşükse gösterge yalnızca bağırınca hareket eder. Seviyeyi %70–90 aralığına getirin.",
        "<strong>Bluetooth kulaklık profili:</strong> Kablosuz kulaklıklar müzik dinlerken yüksek kaliteli profili, görüşmede ise mikrofonlu profili kullanır. Mikrofon devreye girdiğinde sesin kalitesinin düşmesi normaldir; mikrofon hiç çalışmıyorsa cihazı eşleştirmeden kaldırıp yeniden eşleştirin.",
        "<strong>Uygulamanın özel erişimi:</strong> Bazı ses yazılımları mikrofonu kendine ayırabilir. Diğer ses programlarını kapatıp yeniden deneyin."
      ]
    },
    {
      h: "Online sınav ve iş görüşmesi öncesi kontrol listesi",
      p: [
        "Uzaktan yapılan sınavlarda ve görüşmelerde teknik bir aksilik hem stres yaratır hem de süreyi kısaltır. Aşağıdaki kontrolleri görüşmeden en az 15 dakika önce, görüşmede kullanacağınız cihaz ve tarayıcıyla yapın."
      ],
      ol: [
        "Cihazı şarja takın ya da pilin yeterli olduğundan emin olun; görüntülü görüşme pil tüketimini belirgin biçimde artırır.",
        "Kamera, mikrofon ve hoparlörü test edin; görüşme uygulamasının kendi ayarlarında da aynı cihazların seçili olduğunu doğrulayın.",
        "Işık kaynağını karşınıza alın, kamerayı göz hizasına yakın konumlandırın ve arka planda kişisel bilgi içeren bir şey olmadığını kontrol edin.",
        "Bildirimleri kapatın ve kamerayı kullanabilecek diğer uygulamaları sonlandırın.",
        "İnternet bağlantınızı kontrol edin; mümkünse kablolu bağlantı kullanın ve evdeki büyük indirmeleri durdurun.",
        "Sınav kurumunun istediği özel bir tarayıcı ya da uzantı varsa onu önceden kurup kendi test sayfasında deneyin."
      ]
    },
    {
      h: "Kamera kullanılırken gizlilik nasıl korunur?",
      p: [
        "Kamera ve mikrofon izinleri, bir siteye ya da uygulamaya verdiğiniz en hassas izinler arasındadır. İzni yalnızca güvendiğiniz ve gerçekten ihtiyaç duyduğunuz sitelere verin. Görüşme bittikten sonra kamera ışığının söndüğünü kontrol etmek, erişimin gerçekten kapandığını gösterir.",
        "Tarayıcınızın site izinleri bölümünde hangi sitelere kamera ve mikrofon izni verdiğinizi düzenli aralıklarla gözden geçirin; artık kullanmadığınız sitelerin izinlerini kaldırın. Fiziksel bir kamera kapağı ya da küçük bir yapışkan bant, yazılımsal ayarlardan bağımsız ek bir güvence sağlar.",
        "Bilişim Ajans'ın test araçları görüntüyü ve sesi yalnızca cihazınızda işler; kayıt yapmadığınız sürece hiçbir şey saklanmaz ve sayfa kapandığında erişim sona erer."
      ]
    }
  ],
  faq: [
    ["Kameram çalışıyor mu nasıl test ederim?", "Bir kamera test sayfası açıp tarayıcıya kamera izni verin. Canlı görüntünüz ekranda akıcı biçimde görünüyorsa kamera çalışıyordur; görüntü gelmiyorsa izinleri, kamera kapağını ve kamerayı kullanan başka uygulamaları kontrol edin."],
    ["Mikrofon testi nasıl yapılır?", "Mikrofon test sayfasında izin verip doğru giriş cihazını seçin ve konuşun. Seviye göstergesi sesinizle birlikte hareket ediyorsa mikrofon çalışıyordur; kısa bir kayıt alıp dinleyerek sesin net olup olmadığını da kontrol edebilirsiniz."],
    ["Tarayıcı kamera iznini nasıl veririm?", "Adres çubuğunun solundaki kilit ya da kamera simgesine tıklayın ve site izinlerinde kamera ile mikrofonu izin ver olarak ayarlayın. Daha önce engellediyseniz değişiklikten sonra sayfayı yenilemeniz gerekir."],
    ["Mikrofon sesi neden gelmiyor?", "En sık nedenler mikrofonun sessize alınmış olması, yanlış giriş cihazının seçilmesi ve işletim sistemi gizlilik ayarlarında mikrofon erişiminin kapalı olmasıdır. Giriş seviyesinin çok düşük olması da göstergenin hareket etmemesine yol açabilir."],
    ["Laptop kamerası neden siyah görünüyor?", "Görüntü siyahsa kameranın önündeki gizlilik kapağı kapalı olabilir, klavyedeki kamera kapatma tuşuna basılmış olabilir ya da kamerayı başka bir uygulama kullanıyor olabilir. Bunlar değilse sürücüyü güncellemek ve yeniden başlatmak çözüm olur."],
    ["Hoparlör sağ-sol kanal testi nasıl yapılır?", "Hoparlör test sayfasında sol ve sağ kanal seslerini ayrı ayrı çalın. Sol kanal yalnızca sol taraftan, sağ kanal yalnızca sağ taraftan gelmelidir; ters geliyorsa kulaklık ters takılmış ya da kablo bağlantısı yanlış olabilir."],
    ["Online sınav öncesi kamera nasıl kontrol edilir?", "Sınavdan en az 15 dakika önce sınavda kullanacağınız cihaz ve tarayıcıyla kamera, mikrofon ve hoparlör testini yapın. Işığı karşınıza alın, şarjı kontrol edin ve kamerayı kullanabilecek diğer uygulamaları kapatın."],
    ["Kamera kullanılırken gizlilik nasıl korunur?", "Kamera iznini yalnızca güvendiğiniz sitelere verin, tarayıcının site izinleri listesini düzenli gözden geçirin ve görüşme sonrasında kamera ışığının söndüğünü kontrol edin. Fiziksel kamera kapağı ek bir güvence sağlar."],
    ["Test sırasında görüntüm ya da sesim kaydediliyor mu?", "Hayır. Bilişim Ajans test araçları görüntü ve sesi yalnızca tarayıcınızda işler ve sunucuya göndermez. Ses kaydı aldığınızda bile kayıt yalnızca sizin cihazınızda tutulur ve siz indirmedikçe saklanmaz."]
  ],
  tools: ["kamera-test", "mikrofon-test", "hoparlor-test", "ses-kaydedici"],
  related: ["internet-hizi-kac-mbps-olmali"]
};
