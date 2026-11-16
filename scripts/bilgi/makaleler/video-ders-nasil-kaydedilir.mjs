export default {
  slug: "video-ders-nasil-kaydedilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Video Ders Nasıl Kaydedilir? Ekran, Ses ve Kamerayla Ders Hazırlama",
  pageTitle: "Video Ders Nasıl Kaydedilir? Ekran, Ses ve Kamera Kaydı Rehberi",
  description: "Bilgisayarda video ders kaydı: ekran kaydına mikrofon ve kamera ekleme, temiz ses için ayarlar, ideal ders süresi, dosya boyutu hesabı ve öğrenci ödevi teslimi.",
  keywords: ["video ders nasıl çekilir", "ekran ve ses kaydı", "uzaktan eğitim video hazırlama", "ders kaydı nasıl yapılır", "sunum kaydı", "mikrofon ayarı", "video ders süresi", "ekran kaydı dosya boyutu"],
  lead: "Bilgisayarda video ders kaydetmenin en kolay yolu, <strong>sunumu ya da çalıştığınız uygulamayı açıp ekran kaydediciyle ekranı ve mikrofonu birlikte kaydetmektir</strong>; isterseniz kamera görüntünüzü köşeye ekleyebilirsiniz. Kayda başlamadan önce mikrofonu ve kamerayı test etmek, sessiz bir oda seçmek ve dersi 6–15 dakikalık bölümlere ayırmak sonucu en çok iyileştiren adımlardır. Bu sayfada hazırlıktan teslime kadar adımları, temiz ses için ayarları, dosya boyutu hesabını ve öğrenci ödevlerinde dikkat edilecekleri bulacaksınız.",
  kisaCevap: [
    "Video ders için gereken üç şey: ekran kaydedici, iyi konumlanmış bir mikrofon ve sessiz bir ortam; kamera isteğe bağlıdır.",
    "İzleyiciyi en çok kaybettiren şey görüntü değil sestir; yankı ve uğultu, bulanık görüntüden daha rahatsız edicidir.",
    "Çevrimiçi kurs verileri, kısa videoların daha uzun izlendiğini gösterir; tek konu, 6–15 dakika iyi bir hedeftir.",
    "Dosya boyutu (MB) ≈ bit hızı (Mbps) × süre (sn) ÷ 8; 2,5 Mbps'lik 10 dakikalık kayıt yaklaşık 188 MB eder.",
    "Mikrofonu ağzınıza 15–30 cm uzaklıkta, hafif yana dönük konumlandırmak nefes ve patlama seslerini azaltır.",
    "Kayıttan önce 10 saniyelik deneme kaydı alıp dinlemek, yarım saatlik bir dersi baştan çekmekten kurtarır."
  ],
  figure: {
    alt: "Video ders kayıt düzeni: ekran kaydı, mikrofon ve kameranın tek dosyada birleşmesi; altta 10 dakikalık 2,5 Mbps kaydın yaklaşık 188 MB tutması.",
    caption: "Ekran kaydedici üç kaynağı tek dosyada birleştirir. Dosya boyutunu belirleyen asıl etken çözünürlük değil bit hızıdır; aynı süredeki kayıt, düşük bit hızıyla birkaç kat küçük olur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="vd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="st"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Video dersin üç kaynağı, tek dosya</text>
  <rect x="30" y="56" width="190" height="70" rx="10" class="sf sb"/>
  <text x="125" y="86" class="b mid">Ekran</text>
  <text x="125" y="108" class="sm mid mu">sunum, tahta, uygulama</text>
  <rect x="30" y="146" width="190" height="70" rx="10" class="sf sb"/>
  <text x="125" y="176" class="b mid">Mikrofon</text>
  <text x="125" y="198" class="sm mid mu">15–30 cm uzaklık</text>
  <rect x="30" y="236" width="190" height="70" rx="10" class="sf sb"/>
  <text x="125" y="266" class="b mid">Kamera (isteğe bağlı)</text>
  <text x="125" y="288" class="sm mid mu">köşede küçük pencere</text>
  <line x1="220" y1="91" x2="296" y2="166" class="st" fill="none" marker-end="url(#vd)"/>
  <line x1="220" y1="181" x2="296" y2="181" class="st" fill="none" marker-end="url(#vd)"/>
  <line x1="220" y1="271" x2="296" y2="196" class="st" fill="none" marker-end="url(#vd)"/>
  <rect x="300" y="136" width="160" height="90" rx="10" class="p"/>
  <text x="380" y="174" class="b mid sf">Ekran kaydedici</text>
  <text x="380" y="198" class="sm mid sf">tarayıcıda, kurulumsuz</text>
  <line x1="460" y1="181" x2="516" y2="181" class="st" fill="none" marker-end="url(#vd)"/>
  <rect x="520" y="136" width="170" height="90" rx="10" class="oks"/>
  <text x="605" y="174" class="b mid">ders.webm</text>
  <text x="605" y="198" class="sm mid">tek video dosyası</text>
  <rect x="30" y="330" width="660" height="74" rx="8" class="sf sb"/>
  <rect x="30" y="330" width="8" height="74" class="p"/>
  <text x="52" y="356" class="b">Boyut ≈ bit hızı (Mbps) × süre (sn) ÷ 8</text>
  <text x="52" y="384" class="sm t2">2,5 Mbps × 600 sn ÷ 8 = 187,5 MB · 5 Mbps'de aynı ders ≈ 375 MB</text>
</svg>`
  },
  sections: [
    {
      h: "Video ders kaydı için neye ihtiyacınız var?",
      p: [
        "İyi bir video ders için pahalı bir stüdyoya gerek yoktur. Çoğu ders; bir bilgisayar, sunum ya da çalışma dosyası, bir ekran kaydedici ve düzgün sesle yapılabilir. Dizüstü bilgisayarların dahili mikrofonu kısa anlatımlar için yeterli olabilir; düzenli ders hazırlayacaksanız kablolu bir kulaklık mikrofonu ya da masaüstü mikrofon ses kalitesini belirgin biçimde artırır.",
        "Kamera görüntüsü isteğe bağlıdır. Öğretmenin yüzünü görmek bazı öğrenciler için bağ kurmayı kolaylaştırır; ama ekran içeriği ön plandaysa kamerayı köşede küçük bir pencerede tutmak yeterlidir. Matematik çözümü, yazılım anlatımı ya da belge doldurma gibi derslerde dikkat ekrandaki işlemde olmalıdır.",
        "[[arac:ekran-kaydedici|Ekran Kaydedici]] aracı program kurmadan tarayıcıda ekranı, bir pencereyi ya da sekmeyi kaydeder; mikrofon ve sistem sesini ekler, kaydı duraklatıp devam ettirebilir ve WebM olarak indirmenizi sağlar. Kayıt bilgisayarınızda oluşturulur, hiçbir sunucuya yüklenmez."
      ]
    },
    {
      h: "Kayıttan önce kamera ve mikrofon nasıl test edilir?",
      p: [
        "Yarım saatlik bir dersi kaydedip sonunda mikrofonun yanlış cihazdan aldığını fark etmek, video ders hazırlayanların en sık yaşadığı hayal kırıklığıdır. Bunu önlemek için kayda başlamadan önce kısa bir test yapın."
      ],
      ol: [
        "[[arac:mikrofon-test|Mikrofon Testi]] aracında doğru mikrofonu seçin ve normal ses tonunuzla konuşun. Seviye çubuğu konuşurken ortalarda, en yüksek yerlerde kırmızıya değmeden dolaşmalıdır.",
        "10 saniyelik deneme kaydı alıp kulaklıkla dinleyin. Uğultu, yankı ya da cızırtı varsa ortamı ya da mikrofon konumunu değiştirin.",
        "[[arac:kamera-test|Kamera ve Mikrofon Testi]] ile görüntüyü kontrol edin: yüzünüz ışık kaynağına dönük olmalı, pencere arkanızda kalmamalıdır.",
        "Bildirimleri kapatın; anlatım sırasında ekranda beliren bir mesaj hem dikkat dağıtır hem de kişisel bilgi sızdırabilir.",
        "Masaüstündeki gereksiz pencereleri ve sekmeleri kapatın; yalnızca derste kullanacağınız dosyalar açık kalsın."
      ],
      after: [
        "Ayrıntılı test adımları için [[bilgi:kamera-ve-mikrofon-testi|kamera ve mikrofon testi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Hangi mikrofon ayarı daha temiz ses verir?",
      p: [
        "Video derste ses görüntüden daha önemlidir. İzleyici biraz bulanık bir görüntüye katlanır ama yankılı, uğultulu ya da bir yükselip bir alçalan sesi birkaç dakika sonra kapatır. Temiz ses için ekipmandan önce ortam ve mesafe gelir.",
        "Mikrofonu ağzınıza 15–30 cm uzaklıkta, hafifçe yana dönük konumlandırın. Çok yakın konuşmak \"p\" ve \"b\" seslerinde patlamalara, çok uzak konuşmak oda yankısının artmasına yol açar. Boş duvarlı, çıplak zeminli odalar yankı yapar; halı, perde, dolu kitaplık ve yumuşak mobilyalar sesi yutar. Küçük ve eşyalı bir oda, büyük ve boş bir salondan daha iyi kayıt verir."
      ],
      ul: [
        "<strong>Gürültü bastırma:</strong> Sabit uğultuyu (fan, klima) azaltır; çok yüksek seviyede sesi metalik yapabilir.",
        "<strong>Eko iptali:</strong> Hoparlörden çıkan sesin mikrofona geri girmesini engeller; kulaklık kullanıyorsanız gerekmez.",
        "<strong>Otomatik kazanç:</strong> Ses seviyesini dengeler ama sessiz anlarda arka plan gürültüsünü yükseltebilir.",
        "<strong>Seviye:</strong> En yüksek konuşma anında göstergenin kırmızıya girmemesi gerekir; kırpılan ses sonradan düzeltilemez."
      ],
      after: [
        "Yalnızca ses kaydı (örneğin sesli anlatım ya da podcast tarzı ders) hazırlıyorsanız [[arac:ses-kaydedici|Online Ses Kaydedici]] gürültü bastırma ve eko iptali seçenekleriyle WAV ya da WebM kaydı alır."
      ]
    },
    {
      h: "Ekran kaydına ses ve kamera nasıl eklenir? Adım adım",
      ol: [
        "Sunumunuzu ya da uygulamanızı açın, ilk slayda getirin.",
        "Ekran kaydediciyi başka bir sekmede açın; kayıt kaynağı olarak tüm ekranı, tek pencereyi ya da tarayıcı sekmesini seçin.",
        "Mikrofonu açın; videoda bilgisayardan çıkan bir ses (örneğin bir video parçası) olacaksa sistem sesini de seçin.",
        "Kamera görüntüsü istiyorsanız kamerayı küçük bir pencerede açıp ekranın içerikle çakışmayan köşesine yerleştirin; ekran kaydı bu pencereyi de görüntüye alır.",
        "Geri sayımdan sonra anlatıma başlayın. Hata yaptığınızda kaydı duraklatın, cümlenin başına dönüp yeniden başlayın.",
        "Bitince kaydı durdurun, baştan sona bir kez izleyin ve dosyayı anlamlı bir adla kaydedin: ders numarası, konu ve tarih."
      ],
      after: [
        "Tüm ekranı kaydetmek yerine yalnızca sunum penceresini seçmek, yanlışlıkla e-posta ya da mesaj bildirimlerinin videoya girmesini önler. Ekran kaydının teknik ayrıntılarını [[rehber:ekran-kaydi-nasil-alinir|ekran kaydı rehberinde]] bulabilirsiniz."
      ]
    },
    {
      h: "Video ders kaç dakika olmalı?",
      p: [
        "Sabit bir kural yoktur, ama izlenme verileri kısa videolardan yanadır. Çevrimiçi kurs platformlarında milyonlarca izlenme üzerinde yapılan bir araştırma, öğrencilerin video başına ortalama izleme süresinin uzunluk arttıkça 6 dakika civarında tıkandığını, uzun videoların büyük kısmının sonuna kadar izlenmediğini göstermiştir. Pratikte tek bir konuyu anlatan 6–15 dakikalık videolar iyi bir dengedir.",
        "Kırk dakikalık bir dersi tek video yapmak yerine konu başlıklarına göre dört beş kısa videoya bölmek hem izleyiciye hem size kolaylık sağlar. Bir bölümde hata yaparsanız yalnızca o bölümü yeniden kaydedersiniz; öğrenci de takıldığı konuyu bulmak için uzun bir videoda ileri geri sarmaz."
      ],
      table: {
        head: ["Video türü", "Önerilen süre", "İpucu"],
        rows: [
          ["Kavram anlatımı", "6–10 dakika", "Tek kavram, sonunda kısa özet"],
          ["Soru çözümü", "3–8 dakika", "Her soru ayrı video, başlıkta soru numarası"],
          ["Yazılım ya da uygulama gösterimi", "5–12 dakika", "Fare imlecini yavaş hareket ettirin"],
          ["Konu tekrarı", "10–15 dakika", "Bölüm başlıklarını ekranda gösterin"],
          ["Öğrenci sunum ödevi", "Öğretmenin belirlediği süre", "Süre sınırını aşmamak not kriteridir"]
        ]
      },
      after: [
        "Sunum hazırlarken slayt başına kaç dakika ayıracağınızı [[bilgi:sunum-kac-slayt-olmali-konusma-suresi|sunum kaç slayt olmalı]] yazısındaki hesapla planlayabilirsiniz."
      ]
    },
    {
      h: "Kayıt dosyası neden çok büyük olur? Boyut hesabı",
      p: [
        "Video dosyasının boyutunu belirleyen ana etken, saniyede kaydedilen veri miktarı olan <strong>bit hızıdır</strong>. Çözünürlük ve kare hızı bit hızını etkiler ama asıl belirleyici, kaydedicinin seçtiği sıkıştırma ayarıdır. Ekran kayıtları genellikle durağan görüntüler içerdiği için kamera videolarına göre daha iyi sıkışır."
      ],
      formula: "Dosya boyutu (MB) ≈ bit hızı (Mbps) × süre (saniye) ÷ 8\nÖrnek: 2,5 Mbps × 600 sn ÷ 8 = 187,5 MB",
      table: {
        head: ["Bit hızı", "Dakika başına", "10 dakikalık ders", "30 dakikalık ders"],
        rows: [
          ["1 Mbps", "7,5 MB", "75 MB", "225 MB"],
          ["2,5 Mbps", "18,75 MB", "187,5 MB", "562,5 MB"],
          ["5 Mbps", "37,5 MB", "375 MB", "1.125 MB"],
          ["8 Mbps", "60 MB", "600 MB", "1.800 MB"]
        ],
        caption: "Ses kanalı da eklenir: 128 kbps ses dakikada yaklaşık 0,96 MB tutar. Değerler yaklaşıktır; kaydedici değişken bit hızı kullanabilir."
      },
      after: [
        "Okul ya da kurum platformu dosya boyutu sınırı koyuyorsa (örneğin 100 MB) hesabı tersine yapın: 100 MB × 8 ÷ 600 sn = yaklaşık 1,33 Mbps. Yani 10 dakikalık bir dersin sınıra sığması için toplam bit hızının 1,3 Mbps civarında olması gerekir. Video boyutu ile bit hızı ilişkisini [[bilgi:video-dosya-boyutu-ve-bitrate|video dosya boyutu ve bitrate]] yazısı ayrıntılı açıklar."
      ]
    },
    {
      h: "Sunum ve ekran kaydı birlikte nasıl yapılır?",
      p: [
        "Sunum programlarının çoğu \"sunucu görünümü\" sunar: bir ekranda slayt, diğerinde notlarınız görünür. Tek ekranla çalışıyorsanız sunumu tam ekran yerine pencere içinde oynatıp yalnızca o pencereyi kaydetmek, notlarınızı başka bir pencerede tutmanızı sağlar. İki ekranınız varsa slaydı kayıt yapılan ekrana, notları diğer ekrana alın.",
        "Slaytları kalabalık yapmayın. Video derste öğrenci aynı anda hem sizi dinler hem slaydı okur; ekrandaki uzun paragraflar dikkati böler. Her slaytta bir ana fikir, büyük yazı ve görsel yeterlidir. Anlatırken fare imlecini işaretçi gibi kullanın, ama hızlı ve rastgele hareket ettirmeyin."
      ]
    },
    {
      h: "Öğrenci ödevinde video teslimi nasıl hazırlanır?",
      ul: [
        "<strong>Süre sınırına uyun:</strong> Öğretmenin verdiği süreyi aşmamak çoğu zaman değerlendirme ölçütüdür; prova yapıp süreyi ölçün.",
        "<strong>Dosya biçimini kontrol edin:</strong> Teslim platformu yalnızca belirli biçimleri kabul ediyorsa kaydı o biçimde alın ya da dönüştürün.",
        "<strong>Dosya adını düzenleyin:</strong> Ad, soyad, sınıf ve ödev adını dosya adına yazın; \"video1\" gibi adlar karışır.",
        "<strong>Boyutu küçültün:</strong> Sınırı aşıyorsa daha düşük bit hızıyla yeniden kaydedin ya da gereksiz bekleme anlarını çıkarın.",
        "<strong>Kişisel bilgileri koruyun:</strong> Ekranda ev adresi, telefon numarası ya da başka öğrencilerin bilgileri görünmemelidir.",
        "<strong>Teslimden önce izleyin:</strong> Sesin baştan sona duyulduğunu ve son saniyelerin kesilmediğini kontrol edin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Test etmeden kaydetmek:</strong> Yanlış mikrofon seçili kalınca bütün ders sessiz çıkar.",
        "<strong>Pencereyi arkaya almak:</strong> Arkadan gelen ışık yüzü karanlık gösterir; ışık kaynağı karşınızda olmalı.",
        "<strong>Tek nefeste uzun ders:</strong> Uzun kayıtlarda hata yapma ve dikkati kaybetme olasılığı artar; bölümlere ayırın.",
        "<strong>Bildirimleri açık bırakmak:</strong> Kayıt sırasında beliren mesajlar hem dikkati dağıtır hem gizliliği bozar.",
        "<strong>Okunmayacak kadar küçük yazı:</strong> Ekran kaydı telefonda da izlenir; yazı tipini ve yakınlaştırmayı büyük tutun."
      ]
    }
  ],
  faq: [
    ["Bilgisayarda video ders nasıl kaydedilir?", "Sunumunuzu ya da uygulamanızı açın, ekran kaydediciyle ekranı veya ilgili pencereyi seçin, mikrofonu ekleyin ve kayda başlayın. Bitince kaydı izleyip anlamlı bir adla kaydedin; kurulum gerektirmeyen tarayıcı tabanlı kaydediciler yeterlidir."],
    ["Ekran kaydına ses ve kamera nasıl eklenir?", "Ekran kaydedicide mikrofonu ve gerekiyorsa sistem sesini açın. Kamerayı küçük bir pencerede açıp ekranın boş bir köşesine yerleştirdiğinizde ekran kaydı bu pencereyi de görüntüye alır."],
    ["Hangi mikrofon ayarı daha temiz ses verir?", "Mikrofonu ağzınıza 15–30 cm uzaklıkta, hafif yana dönük tutun ve eşyalı, küçük bir odada kaydedin. Gürültü bastırmayı ölçülü kullanın, seviyenin en yüksek anda kırmızıya girmediğini kontrol edin."],
    ["Video ders kaç dakika olmalı?", "Tek bir konuyu anlatan 6–15 dakikalık videolar iyi bir dengedir. Araştırmalar uzun videoların sonuna kadar izlenme oranının düştüğünü gösterir; uzun dersleri konu başlıklarına göre bölmek daha etkilidir."],
    ["Kayıttan önce kamera ve mikrofon nasıl test edilir?", "Mikrofon test aracında doğru cihazı seçip konuşarak seviye çubuğunu izleyin, 10 saniyelik deneme kaydını dinleyin. Kamera testinde ışığın yüzünüze geldiğini ve arka planın sade olduğunu kontrol edin."],
    ["Kayıt dosyası neden çok büyük olur?", "Dosya boyutunu bit hızı belirler: boyut yaklaşık bit hızı çarpı süre bölü sekizdir. 5 Mbps ile kaydedilen 10 dakikalık ders yaklaşık 375 MB tutar; daha düşük bit hızı dosyayı küçültür."],
    ["Sunum ve ekran kaydı birlikte nasıl yapılır?", "Sunumu pencere içinde oynatıp yalnızca o pencereyi kaydedin ya da iki ekran varsa slaydı kayıt ekranına, notları diğer ekrana alın. Slaytları sade ve büyük yazılı tutmak dikkat dağınıklığını önler."],
    ["Öğrenci ödevinde video teslimi nasıl hazırlanır?", "Süre ve dosya biçimi sınırlarına uyun, dosyaya ad, sınıf ve ödev adını yazın, gerekiyorsa daha düşük bit hızıyla yeniden kaydedin. Teslimden önce videonun tamamını sesle birlikte izleyin."],
    ["Ekran kaydım bir sunucuya yükleniyor mu?", "Hayır. Bilişim Ajans'ın ekran kaydedicisi kaydı tarayıcınızda oluşturur ve doğrudan bilgisayarınıza indirir; görüntü ve ses hiçbir sunucuya gönderilmez."]
  ],
  tools: ["ekran-kaydedici", "ses-kaydedici", "mikrofon-test", "kamera-test"],
  related: ["kamera-ve-mikrofon-testi", "video-dosya-boyutu-ve-bitrate", "sunum-kac-slayt-olmali-konusma-suresi", "fps-nedir-kac-fps-olmali"]
};
