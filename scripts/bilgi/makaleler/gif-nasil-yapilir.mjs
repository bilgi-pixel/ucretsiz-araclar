export default {
  slug: "gif-nasil-yapilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "GIF Nasıl Yapılır? Fotoğraflardan ve Videodan Hareketli GIF Oluşturma",
  pageTitle: "GIF Nasıl Yapılır? Fotoğraf ve Videodan Hareketli GIF",
  description: "GIF yapmak için kareler sırayla dizilir, kare süresi, genişlik ve renk sayısı seçilir. GIF neden büyük olur, kaç fps olmalı, MP4 farkı ve boyut küçültme yolları.",
  keywords: ["gif nasıl yapılır", "fotoğraftan gif yapma", "hareketli gif oluşturma", "gif boyutu küçültme", "gif kaç fps olmalı", "telefonda gif yapma", "gif ile video farkı", "videodan gif yapma"],
  lead: "Hareketli GIF, <strong>birden çok görüntünün belirli aralıklarla art arda gösterildiği</strong> bir resim dosyasıdır; yapmak için fotoğrafları ya da bir videonun kısa bir bölümünü sıraya koyup kare hızını, genişliği ve renk sayısını seçmeniz yeterlidir. Çoğu kullanım için 10–15 kare/saniye ve 480–640 piksel genişlik iyi bir dengedir. GIF en fazla 256 renkle çalıştığı ve video gibi kareler arası sıkıştırma yapmadığı için dosyası aynı uzunluktaki MP4'ten çok daha büyük olur. Bu sayfada adım adım GIF yapmayı, boyut hesabını ve küçültme yollarını bulacaksınız.",
  kisaCevap: [
    "GIF yapmak için kareleri sıralayın, kare süresini (ya da fps) seçin, genişliği ve renk sayısını belirleyip dışa aktarın.",
    "Kısa animasyon ve ekran kayıtları için 10–15 fps genellikle yeterlidir; 20 fps ve üstü akıcılığı artırır ama dosyayı büyütür.",
    "GIF her karede en fazla 256 renk kullanabilir; fotoğraflarda renk geçişleri bu yüzden bantlı görünebilir.",
    "Dosya boyutunu en çok genişlik, kare sayısı (süre × fps) ve renk sayısı belirler.",
    "Aynı içerik MP4 olarak çoğu zaman birkaç kat daha küçüktür; uzun ve renkli klipler için video daha uygundur.",
    "Tarayıcıda çalışan araçlarla program indirmeden GIF yapılabilir; dosyanın cihazdan çıkmadığından emin olun."
  ],
  figure: {
    alt: "GIF oluşturma akışı: dört kare sırayla diziliyor, 10 fps ile her kare 0,1 saniye gösteriliyor; altta genişlik, kare sayısı ve renk sayısının dosya boyutuna etkisi; 480 piksel, 3 saniye, 10 fps örneğinde 30 kare.",
    caption: "Kare hızı her karenin ekranda ne kadar kalacağını belirler: 10 fps'de her kare 0,1 saniye görünür. Boyut tahmini sıkıştırma öncesi üst sınırı gösterir; gerçek dosya içeriğe göre daha küçük olur.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="gf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">GIF nasıl oluşur? Kareler + süre + renk</text>
  <g>
    <rect x="40" y="56" width="120" height="84" rx="6" class="sf sb"/><circle cx="70" cy="112" r="14" class="p"/>
    <rect x="190" y="56" width="120" height="84" rx="6" class="sf sb"/><circle cx="240" cy="100" r="14" class="p"/>
    <rect x="340" y="56" width="120" height="84" rx="6" class="sf sb"/><circle cx="410" cy="88" r="14" class="p"/>
    <rect x="490" y="56" width="120" height="84" rx="6" class="sf sb"/><circle cx="580" cy="80" r="14" class="p"/>
  </g>
  <g class="sm mid"><text x="100" y="158">Kare 1</text><text x="250" y="158">Kare 2</text><text x="400" y="158">Kare 3</text><text x="550" y="158">Kare 4</text></g>
  <line x1="620" y1="98" x2="680" y2="98" class="sp sw" fill="none" marker-end="url(#gf)"/>
  <text x="650" y="84" class="sm mid b">döngü</text>
  <text x="360" y="186" class="sm mid b p">10 fps → her kare 0,1 saniye ekranda</text>
  <rect x="40" y="206" width="200" height="118" rx="8" class="ps"/>
  <text x="140" y="232" class="b mid">Genişlik</text>
  <text x="140" y="258" class="sm mid">480 px yerine 960 px</text>
  <text x="140" y="282" class="sm mid">piksel sayısı ×4</text>
  <text x="140" y="308" class="sm mid b dg">boyut ≈ 4 kat</text>
  <rect x="260" y="206" width="200" height="118" rx="8" class="ps"/>
  <text x="360" y="232" class="b mid">Kare sayısı</text>
  <text x="360" y="258" class="sm mid">süre × fps</text>
  <text x="360" y="282" class="sm mid">3 sn × 10 = 30 kare</text>
  <text x="360" y="308" class="sm mid b dg">20 fps: 60 kare</text>
  <rect x="480" y="206" width="200" height="118" rx="8" class="oks"/>
  <text x="580" y="232" class="b mid">Renk sayısı</text>
  <text x="580" y="258" class="sm mid">en fazla 256</text>
  <text x="580" y="282" class="sm mid">64 renk: daha küçük</text>
  <text x="580" y="308" class="sm mid b ok">ekran kaydında yeterli</text>
  <rect x="40" y="342" width="640" height="70" rx="8" class="sf sb"/>
  <rect x="40" y="342" width="8" height="70" class="p"/>
  <text x="60" y="368" class="sm b">Örnek: 480 × 270 px, 3 saniye, 10 fps</text>
  <text x="60" y="392" class="sm">480 × 270 × 30 ≈ 3,9 milyon piksel ≈ sıkıştırma öncesi 3,9 MB üst sınır</text>
</svg>`
  },
  sections: [
    {
      h: "GIF nedir, nasıl çalışır?",
      p: [
        "GIF (Graphics Interchange Format), 1987'de geliştirilen ve 1989'daki GIF89a sürümüyle animasyon desteği kazanan bir resim biçimidir. Bir GIF dosyası bir ya da daha fazla kare içerir; her karenin ekranda ne kadar kalacağı saniyenin yüzde biri cinsinden kaydedilir. Görüntüleyici kareleri sırayla gösterir ve dosyada belirtildiyse başa dönerek sonsuz döngü oluşturur.",
        "GIF'te her kare en fazla 256 renklik bir renk tablosu (palet) kullanır ve görüntü verisi kayıpsız LZW yöntemiyle sıkıştırılır. Ses taşımaz. Bu özellikler GIF'i logolar, basit animasyonlar, ekran kayıtları ve kısa tepki görüntüleri için uygun, ama uzun ve renkli videolar için verimsiz kılar. Neredeyse her tarayıcıda, e-posta istemcisinde ve mesajlaşma uygulamasında ek bir oynatıcıya gerek kalmadan açılabilmesi ise en büyük avantajıdır."
      ]
    },
    {
      h: "Fotoğraflardan GIF nasıl yapılır?",
      ol: [
        "Kullanacağınız fotoğrafları seçin ve aynı en-boy oranında olduklarından emin olun; farklı oranlar karelerde siyah boşluk ya da kırpma yaratır.",
        "Fotoğrafları gösterilecekleri sıraya göre dizin; dosya adlarını 01, 02, 03 diye numaralamak sıralamayı kolaylaştırır.",
        "Kare süresini belirleyin: fotoğraf slaytı için her kare 0,5–1 saniye, akıcı hareket için 0,07–0,1 saniye (10–15 fps).",
        "Çıktı genişliğini seçin: sosyal medya ve mesajlaşma için 480–640 piksel çoğu zaman yeterlidir.",
        "Renk sayısını seçin: fotoğraflarda 256, düz renkli grafiklerde 64 ya da 128.",
        "Döngü ayarını belirleyin (sonsuz ya da belirli sayıda tekrar) ve GIF'i oluşturup indirin."
      ],
      after: [
        "Bu adımların tamamını [[arac:gif-olustur|GIF Oluşturucu]] ile tarayıcınızda yapabilirsiniz; araç birden çok resimden ya da MP4/WebM videodan GIF üretir, kare hızı, genişlik, renk sayısı ve döngü seçeneklerini sunar. Dosyalarınız bilgisayarınızdan çıkmaz. Fotoğrafları önce aynı boyuta getirmek isterseniz [[arac:resim-boyutlandir|Resim Boyutlandırma]] aracını kullanın."
      ]
    },
    {
      h: "Videodan ya da ekran kaydından GIF yapmak",
      p: [
        "Videodan GIF yaparken en önemli karar süredir. GIF uzadıkça kare sayısı ve dosya boyutu doğrusal olarak artar; bu yüzden videonun tamamını değil, anlatmak istediğiniz 2–6 saniyelik bölümü seçin. Başlangıç ve bitiş zamanını belirleyip yalnızca bu aralığı dönüştürmek hem dosyayı küçültür hem de izleyicinin dikkatini tek bir harekete odaklar.",
        "Ekran kayıtları GIF'e çok uygundur, çünkü genellikle sınırlı sayıda düz renk içerir. Bir yazılım adımını, bir menüdeki tıklamayı ya da bir hata mesajını göstermek için 8–12 fps ve 64–128 renk çoğu zaman yeterlidir. Ekran kaydı almak için [[rehber:ekran-kaydi-nasil-alinir|ekran kaydı rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "GIF kaç kare/saniye olmalı?",
      p: [
        "Kare hızı (fps), saniyede kaç karenin gösterildiğidir. Göz, saniyede yaklaşık 10 karenin üzerinde hareketi akıcı algılamaya başlar; sinema 24, çoğu video 25–30 fps kullanır. GIF'te ise yüksek kare hızı dosyayı hızla büyüttüğü için daha düşük değerler tercih edilir."
      ],
      table: {
        head: ["Kare hızı", "Kare süresi", "Uygun kullanım", "3 saniyede kare"],
        rows: [
          ["5 fps", "0,2 sn", "Basit animasyon, en küçük dosya", "15"],
          ["8 fps", "0,125 sn", "Ekran kaydı, arayüz gösterimi", "24"],
          ["10 fps", "0,1 sn", "Çoğu kullanım için dengeli seçim", "30"],
          ["15 fps", "yaklaşık 0,067 sn", "Daha akıcı hareket", "45"],
          ["20 fps", "0,05 sn", "Hızlı hareket, büyük dosya", "60"]
        ],
        caption: "GIF kare süreleri saniyenin yüzde biri cinsinden saklandığı için 15 fps gibi değerler yuvarlanır. Çoğu tarayıcı 0,02 saniyeden kısa kare sürelerini 0,1 saniyeye çevirir; bu yüzden çok yüksek kare hızları GIF'i hızlandırmak yerine yavaşlatabilir."
      },
      after: [
        "Kare hızı kavramının video ve oyunlardaki karşılığı için [[bilgi:fps-nedir-kac-fps-olmali|FPS nedir, kaç FPS olmalı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "GIF dosyası neden bu kadar büyük olur?",
      p: [
        "GIF, kareleri birbirinden büyük ölçüde bağımsız saklar. Videolarda kullanılan modern sıkıştırma yöntemleri ise yalnızca kareler arasında değişen bölümleri kaydeder; sabit bir arka plan önünde konuşan biri için her karede yalnızca küçük bir alan değişir. GIF'te bu avantaj sınırlıdır. Ayrıca fotoğraflardaki yumuşak renk geçişleri 256 renge indirilirken uygulanan titreme (dithering) deseni, LZW sıkıştırmasının verimini düşürür."
      ],
      formula: "Kare sayısı = süre (sn) × fps\nSıkıştırma öncesi kaba üst sınır (bayt) ≈ genişlik × yükseklik × kare sayısı\nÖrnek: 480 × 270 × (3 × 10) = 3.888.000 bayt ≈ 3,9 MB",
      after: [
        "Bu hesap, her pikselin bir bayt yer kapladığı sıkıştırılmamış durumu gösterir; gerçek GIF, içeriğe göre bunun belirgin biçimde altında kalır. Düz renkli ekran kayıtlarında sıkıştırma çok etkilidir, fotoğraf ve doğa görüntülerinde daha az etkilidir. Formül yine de hangi ayarın boyutu ne kadar etkilediğini gösterir: genişliği iki katına çıkarmak piksel sayısını dört katına, fps'yi iki katına çıkarmak kare sayısını iki katına çıkarır. Video bit hızı ve boyut ilişkisi için [[bilgi:video-dosya-boyutu-ve-bitrate|video dosya boyutu ve bitrate]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "GIF boyutu nasıl küçültülür?",
      ul: [
        "<strong>Süreyi kısaltın:</strong> 6 saniyelik GIF'i 3 saniyeye indirmek boyutu yaklaşık yarıya düşürür.",
        "<strong>Genişliği azaltın:</strong> 640 pikselden 480 piksele inmek piksel sayısını yaklaşık %44 azaltır.",
        "<strong>Kare hızını düşürün:</strong> 15 fps yerine 10 fps, kare sayısını üçte bir azaltır.",
        "<strong>Renk sayısını azaltın:</strong> Ekran kayıtlarında 64 renk çoğu zaman fark edilmez.",
        "<strong>Hareketli alanı küçültün:</strong> Görüntüyü yalnızca hareketin olduğu bölgeye kırpın.",
        "<strong>Sabit kamera kullanın:</strong> Titreyen görüntüde her karede tüm pikseller değişir ve sıkıştırma belirgin biçimde kötüleşir."
      ],
      after: [
        "Hâlâ büyükse içeriği video olarak paylaşmayı düşünün. Tek bir kareyi ya da küçük resimleri ayrıca küçültmek için [[arac:resim-kucult|Resim Küçültme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "GIF ile MP4 arasındaki fark nedir? GIF'te kaç renk kullanılabilir?",
      table: {
        head: ["Özellik", "GIF", "MP4 (H.264)"],
        rows: [
          ["Renk", "Kare başına en fazla 256", "Milyonlarca renk"],
          ["Sıkıştırma", "Kayıpsız LZW, kareler arası sınırlı", "Kayıplı, kareler arası güçlü sıkıştırma"],
          ["Ses", "Yok", "Var"],
          ["Dosya boyutu", "Büyük", "Aynı içerikte çoğu zaman birkaç kat küçük"],
          ["Uyumluluk", "Neredeyse her yerde, e-posta dahil", "Tarayıcı ve uygulamalarda yaygın, e-postada sınırlı"],
          ["Saydamlık", "Tek renkli tam saydamlık", "Standart MP4'te yok"],
          ["Otomatik döngü", "Dosyanın içinde tanımlı", "Oynatıcı ayarına bağlı"]
        ]
      },
      after: [
        "GIF'in 256 renk sınırı, bir karenin aynı anda en fazla 256 farklı renk içerebileceği anlamına gelir. Teknik olarak her kareye ayrı palet verilebilir, ama pratikte araçlar çoğunlukla 32, 64, 128 ya da 256 renk seçeneği sunar. Logo ve çizimlerde 32–64 renk yeterli olurken fotoğraf ağırlıklı görüntülerde 256 renk bile bantlanma yaratabilir. Görsel biçimlerin genel karşılaştırması için [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısına bakın."
      ]
    },
    {
      h: "WhatsApp'ta ve telefonda GIF nasıl gönderilir?",
      p: [
        "Mesajlaşma uygulamalarının çoğu GIF dosyası kabul eder, ancak bant genişliğini azaltmak için GIF'i arka planda kısa, sessiz ve döngüde oynayan bir videoya dönüştürebilir. Bu yüzden gönderdiğiniz GIF karşı tarafta kalite ya da boyut olarak biraz farklı görünebilir. GIF'i galeriye kaydedip sohbette dosya ya da medya olarak eklemek en yaygın yoldur.",
        "Telefonda GIF yapmak için tarayıcıda çalışan bir aracı mobil tarayıcınızdan açabilir, galeriden fotoğrafları ya da kısa bir videoyu seçebilirsiniz. Mobil cihazlarda bellek sınırlı olduğu için uzun ve yüksek çözünürlüklü videolardan GIF üretmek yavaş olabilir; kısa bir bölüm ve 480 piksel civarında genişlik seçmek işlemi hızlandırır. Kayıt almadan önce kayıt boyutunu tahmin etmek için [[arac:video-boyutu-hesapla|Video Boyutu Hesaplama]] aracı işinize yarayabilir."
      ]
    },
    {
      h: "Program indirmeden GIF yapılabilir mi? Gizlilik notu",
      p: [
        "Evet. Modern tarayıcılar video çözme, resim işleme ve dosya oluşturma işlemlerini kendi içinde yapabildiği için GIF üretmek için program kurmak gerekmez. Burada dikkat edilmesi gereken nokta, kullandığınız çevrim içi aracın dosyalarınızı bir sunucuya yükleyip yüklemediğidir. Kişisel fotoğraflar, iş yerindeki ekran kayıtları ya da müşteri bilgisi içeren görüntüler için dosyayı cihazdan çıkarmadan işleyen araçlar tercih edilmelidir.",
        "Sitedeki GIF aracı işlemi tamamen tarayıcınızda yapar; ne video ne de oluşan GIF bir sunucuya gönderilir. Başkasına ait görüntü ve videolardan GIF üretip paylaşırken telif ve kişilik haklarına dikkat edin; özellikle kişilerin rızası olmadan görüntülerini paylaşmaktan kaçının."
      ]
    }
  ],
  faq: [
    ["Fotoğraflardan GIF nasıl yapılır?", "Aynı en-boy oranındaki fotoğrafları sıraya koyun, kare süresini, çıktı genişliğini ve renk sayısını seçin, döngü ayarını belirleyip GIF'i oluşturun. Slayt için kare başına 0,5–1 saniye, akıcı hareket için 10–15 fps uygundur."],
    ["GIF dosyası neden bu kadar büyük olur?", "GIF kareleri büyük ölçüde bağımsız saklar, en fazla 256 renk kullanır ve videolardaki gibi güçlü kareler arası sıkıştırma yapmaz. Genişlik, süre, kare hızı ve renk sayısı arttıkça dosya hızla büyür."],
    ["GIF kaç kare/saniye olmalı?", "Çoğu kullanım için 10–15 fps dengeli bir seçimdir. Ekran kayıtlarında 8–12 fps yeterlidir; 20 fps ve üstü akıcılığı artırır ama dosyayı büyütür. Çok kısa kare süreleri bazı tarayıcılarda yavaşlatılır."],
    ["GIF ile MP4 arasındaki fark nedir?", "GIF kare başına en fazla 256 renk kullanır, ses taşımaz ve genellikle büyüktür ama neredeyse her yerde açılır. MP4 milyonlarca renk ve ses destekler, aynı içerikte çoğu zaman birkaç kat daha küçüktür."],
    ["WhatsApp'ta GIF nasıl gönderilir?", "GIF'i telefonunuzun galerisine kaydedip sohbette medya ya da dosya olarak ekleyebilirsiniz. Uygulama GIF'i arka planda kısa sessiz bir videoya dönüştürebildiği için karşı tarafta görünüm biraz farklı olabilir."],
    ["GIF boyutu nasıl küçültülür?", "Süreyi kısaltın, genişliği azaltın, kare hızını düşürün, renk sayısını azaltın ve görüntüyü yalnızca hareketli bölgeye kırpın. Hâlâ çok büyükse içeriği MP4 video olarak paylaşmak daha verimlidir."],
    ["GIF'te kaç renk kullanılabilir?", "GIF'te her kare en fazla 256 renk içerebilir. Logo ve ekran kayıtlarında 32–128 renk çoğu zaman yeterlidir; fotoğraflarda 256 renkte bile yumuşak geçişler bantlı görünebilir."],
    ["Program indirmeden GIF yapılabilir mi?", "Evet, tarayıcıda çalışan araçlarla program kurmadan GIF yapılabilir. Kişisel ya da iş görüntülerinde dosyaları bir sunucuya yüklemeden, tamamen tarayıcıda işleyen araçları tercih etmek gizlilik açısından önemlidir."],
    ["Telefonda GIF yapmak mümkün mü?", "Mobil tarayıcıdan bir GIF aracı açıp galeriden fotoğraf ya da kısa video seçerek GIF yapabilirsiniz. Telefon belleği sınırlı olduğundan kısa bir bölüm ve 480 piksel civarında genişlik seçmek işlemi hızlandırır."]
  ],
  tools: ["gif-olustur", "resim-boyutlandir", "resim-kucult", "video-boyutu-hesapla"],
  related: ["fps-nedir-kac-fps-olmali", "video-dosya-boyutu-ve-bitrate", "jpg-png-svg-farki", "en-boy-orani-16-9-ne-demek"]
};
