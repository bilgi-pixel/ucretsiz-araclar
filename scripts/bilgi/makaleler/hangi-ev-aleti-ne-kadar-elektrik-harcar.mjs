export default {
  slug: "hangi-ev-aleti-ne-kadar-elektrik-harcar",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Hangi Ev Aleti Ne Kadar Elektrik Harcar? Cihaz Başına Aylık kWh ve TL Hesabı",
  pageTitle: "Hangi Ev Aleti Ne Kadar Elektrik Harcar? Cihaz Başına Hesap",
  description: "Cihazın aylık tüketimi watt × günlük saat × 30 ÷ 1000 ile kWh olarak bulunur, birim fiyatla TL'ye çevrilir. Buzdolabı, klima, çamaşır makinesi, bekleme modu örnekleri.",
  keywords: ["hangi cihaz ne kadar elektrik yakar", "buzdolabı kaç watt", "çamaşır makinesi elektrik tüketimi", "klima saatte kaç kwh", "bekleme modu elektrik", "cihaz elektrik maliyeti", "elektrik tasarrufu", "led ampul tasarrufu"],
  lead: "Bir ev aletinin ne kadar elektrik harcadığını bulmak için gücünü (watt) günlük kullanım saatiyle çarpar, 1.000'e bölerek günlük kWh'yi, bunu 30 ile çarparak aylık tüketimi bulursunuz; faturaya etkisi aylık kWh ile kWh birim fiyatının çarpımıdır. Örneğin ortalama 1.000 W çeken bir klima günde 8 saat çalışırsa ayda 240 kWh harcar; birim fiyat örnek olarak 3 TL ise bu 720 TL eder. Evde en çok elektriği genellikle ısıtma ve soğutma cihazları harcar. Aşağıda cihaz cihaz örnek tüketimleri, bekleme modunu ve tasarruf hesaplarını bulacaksınız.",
  kisaCevap: [
    "Günlük tüketim (kWh) = güç (W) × günlük kullanım (saat) ÷ 1.000.",
    "Aylık maliyet = günlük kWh × 30 × kWh birim fiyatı (faturanızdaki tüm vergi ve bedeller dahil fiyat).",
    "Watt anlık gücü, kWh ise belirli bir sürede harcanan enerjiyi gösterir; fatura kWh ile hesaplanır.",
    "Buzdolabı sürekli çalışsa da kompresör aralıklı devreye girdiği için ortalama çekişi etiket gücünün altında kalır.",
    "Elektrikli ısıtıcı ve klima gibi yüksek güçlü, uzun süre çalışan cihazlar faturanın en büyük kalemleri olur.",
    "Bekleme modundaki cihazlar tek tek az görünse de 10 cihaz × 3 W ayda yaklaşık 21,6 kWh eder."
  ],
  figure: {
    alt: "Ev aletlerinin örnek aylık elektrik tüketimi çubuk grafiği: elektrikli ısıtıcı 240 kWh, klima 240 kWh, buzdolabı 30 kWh, bulaşık makinesi 22 kWh, bekleme modu 21,6 kWh, çamaşır makinesi 16 kWh, televizyon 12 kWh, LED aydınlatma 9 kWh, su ısıtıcı 9 kWh.",
    caption: "Tüketimler metindeki örnek kullanım varsayımlarına göre hesaplanmıştır; TL karşılıkları örnek 3 TL/kWh birim fiyatla verilmiştir. Kendi cihazınızın etiket değeri ve faturanızdaki birim fiyat sonucu değiştirir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Örnek aylık tüketim (kWh) ve tutar (3 TL/kWh)</text>
  <g class="sm end">
    <text x="190" y="70">Elektrikli ısıtıcı</text><text x="190" y="108">Klima (inverter)</text><text x="190" y="146">Buzdolabı</text>
    <text x="190" y="184">Bulaşık makinesi</text><text x="190" y="222">Bekleme (10 cihaz)</text><text x="190" y="260">Çamaşır makinesi</text>
    <text x="190" y="298">Televizyon</text><text x="190" y="336">LED aydınlatma</text><text x="190" y="374">Su ısıtıcı (kettle)</text>
  </g>
  <rect x="200" y="54" width="384" height="24" rx="3" class="dg"/>
  <rect x="200" y="92" width="384" height="24" rx="3" class="p"/>
  <rect x="200" y="130" width="48" height="24" rx="3" class="ps"/>
  <rect x="200" y="168" width="35" height="24" rx="3" class="ps"/>
  <rect x="200" y="206" width="35" height="24" rx="3" class="dgs"/>
  <rect x="200" y="244" width="26" height="24" rx="3" class="ps"/>
  <rect x="200" y="282" width="19" height="24" rx="3" class="ps"/>
  <rect x="200" y="320" width="14" height="24" rx="3" class="oks"/>
  <rect x="200" y="358" width="14" height="24" rx="3" class="ps"/>
  <g class="sm b">
    <text x="592" y="71">240 kWh · 720 TL</text><text x="592" y="109">240 kWh · 720 TL</text>
    <text x="256" y="147">30 kWh · 90 TL</text><text x="243" y="185">22 kWh · 66 TL</text>
    <text x="243" y="223">21,6 kWh · 65 TL</text><text x="234" y="261">16 kWh · 48 TL</text>
    <text x="227" y="299">12 kWh · 36 TL</text><text x="222" y="337">9 kWh · 27 TL</text><text x="222" y="375">9 kWh · 27 TL</text>
  </g>
  <rect x="30" y="396" width="660" height="34" rx="8" class="sf sb"/>
  <text x="360" y="418" class="sm mid">kWh = W × saat ÷ 1.000 · aylık = günlük × 30 · tutar = kWh × birim fiyat</text>
</svg>`
  },
  sections: [
    {
      h: "Watt ile kWh arasındaki fark nedir?",
      p: [
        "<strong>Watt (W)</strong>, bir cihazın çalışırken o an çektiği gücü gösterir. Etiketinde 2.000 W yazan bir ısıtıcı, tam güçte çalıştığı her an 2.000 W güç çeker. <strong>Kilovatsaat (kWh)</strong> ise bir süre boyunca harcanan enerjidir: 1.000 W'lık bir cihaz 1 saat çalışırsa 1 kWh enerji harcar. Elektrik faturası güce değil, harcanan enerjiye, yani kWh'ye göre hesaplanır.",
        "Bu ayrım önemlidir, çünkü yüksek güçlü bir cihaz kısa süre çalışıyorsa az enerji harcayabilir. 2.000 W'lık bir su ısıtıcı günde toplam 9 dakika çalışırsa 0,3 kWh harcar; 50 W ortalama çeken bir buzdolabı ise 24 saat boyunca 1,2 kWh harcar. Güç, akım ve gerilim arasındaki ilişkiyi [[bilgi:watt-amper-volt-iliskisi|watt amper volt ilişkisi]] yazısında, birimler arası dönüşümü [[arac:joule-watt-saat-cevir|Joule Watt-saat Çevirici]]de bulabilirsiniz."
      ]
    },
    {
      h: "Bir cihazın aylık elektrik maliyeti nasıl hesaplanır?",
      p: [
        "Hesap için üç bilgi gerekir: cihazın gücü, günlük kullanım süresi ve faturanızdaki kWh birim fiyatı. Güç bilgisi cihazın etiketinde, kullanım kılavuzunda ya da enerji etiketinde yazar. Birim fiyat için faturanızdaki toplam tutarı tüketilen kWh'ye bölmek, vergiler ve dağıtım bedeli dahil gerçek bir değer verir."
      ],
      formula: "Günlük kWh = güç (W) × günlük saat ÷ 1.000\nAylık kWh = günlük kWh × 30\nAylık maliyet = aylık kWh × birim fiyat (TL/kWh)",
      ol: [
        "Cihazın gücünü bulun: televizyon, 100 W.",
        "Günlük kullanımı tahmin edin: 4 saat.",
        "Günlük tüketim: 100 × 4 ÷ 1.000 = 0,4 kWh.",
        "Aylık tüketim: 0,4 × 30 = 12 kWh.",
        "Maliyet: 12 × 3 TL (örnek birim fiyat) = 36 TL."
      ],
      after: [
        "Bu adımları tek ekranda görmek için [[arac:cihaz-elektrik-maliyeti-hesapla|Cihaz Elektrik Maliyeti Hesaplama]] aracını kullanabilirsiniz. Evdeki tüm cihazları birlikte toplamak isterseniz [[arac:elektrik-tuketim-hesapla|Elektrik Tüketim Hesaplama]] aracı cihaz listesi üzerinden toplam tüketimi verir."
      ]
    },
    {
      h: "Cihaz cihaz örnek tüketim tablosu",
      p: [
        "Aşağıdaki tablo yaygın ev aletleri için örnek güç ve kullanım varsayımlarıyla hesaplanmıştır. Gerçek değerler cihazın yaşına, enerji sınıfına, kullanım alışkanlığına ve mevsime göre büyük ölçüde değişir. Tutarlar 3 TL/kWh örnek birim fiyatla verilmiştir."
      ],
      table: {
        head: ["Cihaz", "Örnek güç / kullanım", "Aylık kWh", "Aylık tutar (örnek)"],
        rows: [
          ["Elektrikli ısıtıcı", "2.000 W, günde 4 saat", "240", "720 TL"],
          ["Klima (inverter)", "Ortalama 1.000 W, günde 8 saat", "240", "720 TL"],
          ["Buzdolabı", "Günde yaklaşık 1 kWh", "30", "90 TL"],
          ["Bulaşık makinesi", "Yıkama başına 1,1 kWh, ayda 20 yıkama", "22", "66 TL"],
          ["Bekleme modu", "10 cihaz × 3 W, 24 saat", "21,6", "65 TL"],
          ["Çamaşır makinesi", "Yıkama başına 1 kWh, ayda 16 yıkama", "16", "48 TL"],
          ["Televizyon", "100 W, günde 4 saat", "12", "36 TL"],
          ["LED aydınlatma", "6 ampul × 10 W, günde 5 saat", "9", "27 TL"],
          ["Su ısıtıcı", "2.000 W, günde toplam 9 dakika", "9", "27 TL"],
          ["Ütü", "2.000 W, haftada 2 saat", "yaklaşık 17", "yaklaşık 52 TL"]
        ],
        caption: "Değerler örnektir. Kendi cihazınızın etiketindeki güç ve faturanızdaki birim fiyatla yeniden hesaplayın."
      }
    },
    {
      h: "Buzdolabı ayda kaç kWh elektrik harcar?",
      p: [
        "Buzdolabı günün 24 saati prize takılı olsa da kompresörü sürekli çalışmaz; iç sıcaklık ayarlanan değerin üzerine çıktığında devreye girer, soğutunca durur. Bu yüzden etiketteki çalışma gücü (örneğin 100–150 W) ile ortalama çekiş (çoğu zaman 30–60 W) farklıdır. Enerji etiketindeki <strong>yıllık kWh</strong> değeri en güvenilir bilgidir: yılda 300 kWh yazan bir buzdolabı ayda yaklaşık 25 kWh harcar.",
        "Tüketimi artıran başlıca etkenler kapının sık ve uzun açılması, sıcak yemeğin soğumadan konması, cihazın fırın ya da güneş alan bir duvarın yanında durması, arka ızgaranın tozlanması ve kapı contasının sızdırmasıdır. Eski bir buzdolabını yenisiyle değiştirmeyi düşünüyorsanız iki cihazın yıllık kWh farkını birim fiyatla çarparak yıllık tasarrufu hesaplayabilirsiniz."
      ]
    },
    {
      h: "Klima saatte kaç kWh tüketir?",
      p: [
        "Klimanın tüketimi kapasitesine (BTU), enerji verimliliğine, dış sıcaklığa ve ayarlanan sıcaklığa bağlıdır. Ev tipi 9.000–12.000 BTU'luk inverter klimalar ilk açılışta daha yüksek güç çeker, oda istenen sıcaklığa ulaşınca düşük devirde çalışır. Pratikte saatlik ortalama tüketim çoğu zaman 0,5 ile 1,5 kWh arasında değişir.",
        "Tasarruf için ayarı dış sıcaklıkla aşırı fark yaratmayacak bir değerde tutmak, filtreleri düzenli temizlemek, güneş alan pencereleri perdelemek ve kapı-pencere açıkken çalıştırmamak etkilidir. Odanıza uygun kapasiteyi seçmek de önemlidir: küçük bir klima sürekli tam güçte zorlanır. Kapasite hesabı için [[bilgi:klima-kac-btu-olmali|klima kaç BTU olmalı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çamaşır ve bulaşık makinesi bir yıkamada ne kadar harcar?",
      p: [
        "Yıkama makinelerinde enerjinin büyük kısmı suyu ısıtmaya gider. Bu yüzden program sıcaklığı tüketimi doğrudan belirler: 30–40 °C'lik programlar 60 °C ve üstü programlara göre belirgin biçimde daha az enerji harcar. Eko programlar daha uzun sürse de suyu daha düşük sıcaklıkta ve daha uzun süre işleyerek enerji tasarrufu sağlar.",
        "Cihazın enerji etiketinde 100 yıkama başına kWh değeri yazıyorsa bunu 100'e bölerek yıkama başına tüketimi bulabilirsiniz. Örneğin 100 yıkamada 70 kWh yazan bir çamaşır makinesi, eko programda yıkama başına yaklaşık 0,7 kWh harcar. Makineyi tam doldurmak, gereksiz ön yıkamadan kaçınmak ve düşük sıcaklık seçmek tasarrufun en kolay yoludur."
      ]
    },
    {
      h: "Bekleme modundaki cihazlar ne kadar elektrik çeker?",
      p: [
        "Televizyon, modem, oyun konsolu, ses sistemi, mikrodalga fırın saati, şarj adaptörleri ve masaüstü bilgisayar gibi cihazlar kapalı görünürken de az miktarda güç çekebilir. Yeni cihazlarda bu değer genellikle 0,5–1 W civarındayken eski cihazlarda birkaç watt olabilir."
      ],
      formula: "Bekleme tüketimi (aylık kWh) = cihaz sayısı × bekleme gücü (W) × 24 × 30 ÷ 1.000\nÖrnek: 10 × 3 × 24 × 30 ÷ 1.000 = 21,6 kWh → 3 TL/kWh ile yaklaşık 65 TL",
      after: [
        "Anahtarlı uzatma kabloları kullanmak, kullanılmayan şarj cihazlarını prizden çıkarmak ve cihazların enerji tasarrufu ayarlarını açmak bekleme tüketimini azaltır. Modem ve buzdolabı gibi sürekli çalışması gereken cihazları kapatmayın."
      ]
    },
    {
      h: "LED ampule geçmek ne kadar tasarruf sağlar?",
      p: [
        "Aydınlatmada tasarruf hesabı basittir: eski ve yeni ampulün güç farkını kullanım süresiyle çarparsınız. 60 W'lık akkor ampul yerine yaklaşık aynı ışığı veren 8–10 W'lık LED ampul kullanmak, ampul başına güçte yaklaşık %85 azalma demektir."
      ],
      table: {
        head: ["Senaryo", "Güç", "Aylık tüketim (6 ampul, günde 5 saat)", "Aylık tutar (örnek 3 TL/kWh)"],
        rows: [
          ["Akkor ampul", "60 W", "54 kWh", "162 TL"],
          ["LED ampul", "10 W", "9 kWh", "27 TL"],
          ["Fark", "50 W", "45 kWh", "135 TL"]
        ]
      },
      after: [
        "Kendi ampul sayınız ve kullanım sürenizle tasarrufu [[arac:led-tasarruf-hesapla|LED Tasarruf Hesaplama]] aracında görebilirsiniz. Odaya kaç lümen gerektiğini merak ediyorsanız [[bilgi:oda-icin-kac-lumen-gerekir|oda için kaç lümen gerekir]] yazısı yol gösterir."
      ]
    },
    {
      h: "Kademeli tarifede hesap nasıl değişir?",
      p: [
        "Türkiye'de mesken abonelerinde elektrik fiyatı, yıllık tüketim belirli bir sınırı aştığında daha yüksek bir kademe fiyatına geçebilir. Sınırlar ve fiyatlar Enerji Piyasası Düzenleme Kurumu tarafından belirlenir ve dönem dönem güncellenir. Bu nedenle cihaz başına maliyet hesaplarken, kendi faturanızdaki birim fiyatı kullanmak en doğrusudur; yüksek kademeye geçtiyseniz aynı cihazın maliyeti de artar.",
        "Faturanın hangi kalemlerden oluştuğunu, dağıtım bedeli ve vergilerin nasıl eklendiğini [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazısında ayrıntılı bulabilirsiniz. Bu yazıdaki tüm tutarlar örnektir ve yalnızca hesap yöntemini göstermek için verilmiştir."
      ],
      note: "Elektrikli cihazları kullanırken üretici talimatlarına uyun; hasarlı kablo ve fişleri kullanmayın, yüksek güçlü cihazları (ısıtıcı, ütü, su ısıtıcı) aynı uzatma kablosuna takmayın ve elektrik tesisatıyla ilgili işleri yetkili bir elektrikçiye yaptırın."
    }
  ],
  faq: [
    ["Bir cihazın aylık elektrik maliyeti nasıl hesaplanır?", "Cihazın gücü watt olarak günlük kullanım saatiyle çarpılıp 1.000'e bölünerek günlük kWh bulunur. Bu değer 30 ile çarpılınca aylık tüketim, aylık tüketim de faturadaki birim fiyatla çarpılınca aylık maliyet bulunur."],
    ["Buzdolabı ayda kaç kWh elektrik harcar?", "Kompresör aralıklı çalıştığı için buzdolapları çoğu zaman günde yaklaşık 0,7–1,5 kWh, ayda 20–45 kWh civarında harcar. En güvenilir bilgi enerji etiketindeki yıllık kWh değeridir; bu değeri 12'ye bölerek aylık tüketimi bulabilirsiniz."],
    ["Klima saatte kaç kWh tüketir?", "Ev tipi 9.000–12.000 BTU'luk inverter klimalar koşullara göre saatte çoğu zaman 0,5 ile 1,5 kWh arasında tüketir. İlk çalışmada daha yüksek, oda istenen sıcaklığa ulaşınca daha düşük güç çekerler."],
    ["Çamaşır ve bulaşık makinesi bir yıkamada ne kadar harcar?", "Program sıcaklığına göre değişmekle birlikte bir yıkama çoğu zaman 0,6 ile 1,5 kWh arasında enerji harcar. Enerjinin büyük kısmı suyu ısıtmaya gittiği için düşük sıcaklıklı ve eko programlar tüketimi belirgin biçimde azaltır."],
    ["Bekleme modundaki cihazlar ne kadar elektrik çeker?", "Bekleme modundaki bir cihaz genellikle 0,5 ile birkaç watt çeker. Tek tek az görünse de 10 cihaz 3'er watt çekerse ayda yaklaşık 21,6 kWh eder; örnek 3 TL/kWh birim fiyatla bu yaklaşık 65 TL'dir."],
    ["LED ampule geçmek ne kadar tasarruf sağlar?", "60 W'lık akkor ampul yerine 10 W'lık LED kullanmak ampul başına güçte yaklaşık yüzde 85 azalma sağlar. Günde 5 saat yanan 6 ampulde aylık tüketim 54 kWh'den 9 kWh'ye iner; fark 45 kWh'dir."],
    ["Watt ve kWh arasındaki fark nedir?", "Watt bir cihazın o an çektiği gücü, kilovatsaat ise belirli bir sürede harcanan enerjiyi gösterir. 1.000 W'lık bir cihaz bir saat çalışırsa 1 kWh harcar; elektrik faturası güce değil kWh'ye göre hesaplanır."],
    ["Kademeli tarifede hesap nasıl değişir?", "Mesken abonelerinde yıllık tüketim belirli bir sınırı aşarsa daha yüksek kademe fiyatı uygulanabilir. Bu durumda her kWh daha pahalıya gelir ve cihaz başına maliyet artar; hesapta faturanızdaki güncel birim fiyatı kullanmak gerekir."],
    ["Evde en çok elektriği hangi cihazlar harcar?", "Genellikle elektrikli ısıtıcı, klima, elektrikli şofben ve fırın gibi yüksek güçlü ve uzun süre çalışan cihazlar faturanın en büyük kalemleridir. Sürekli çalışan buzdolabı ile bekleme modundaki cihazlar da yıl boyunca birikerek önemli bir pay oluşturur."]
  ],
  tools: ["cihaz-elektrik-maliyeti-hesapla", "led-tasarruf-hesapla", "elektrik-tuketim-hesapla", "joule-watt-saat-cevir"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "watt-amper-volt-iliskisi", "klima-kac-btu-olmali", "oda-icin-kac-lumen-gerekir"],
  sources: [
    ["Enerji Piyasası Düzenleme Kurumu – Tarifeler", "https://www.epdk.gov.tr/"],
    ["Enerji ve Tabii Kaynaklar Bakanlığı – Enerji verimliliği", "https://enerji.gov.tr/"]
  ],
  uyari: "tutarlar örnektir; elektrik tesisatı ve cihaz kurulumu için yetkili bir elektrikçiye başvurun"
};
