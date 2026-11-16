export default {
  slug: "karbon-ayak-izi-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Karbon Ayak İzi Nasıl Hesaplanır? Ulaşım, Elektrik ve Isınma Örnekleri",
  pageTitle: "Karbon Ayak İzi Nasıl Hesaplanır? Elektrik, Yakıt, Uçuş",
  description: "Karbon ayak izi = tüketim miktarı × emisyon faktörü. Elektrik, doğal gaz, araç yakıtı ve uçuş için yaklaşık faktörler, örnek hane hesabı ve azaltma yolları.",
  keywords: ["karbon ayak izi hesaplama", "karbon ayak izi nedir", "co2 emisyonu hesaplama", "araba km başına co2", "elektrik tüketimi karbon", "karbon ayak izi azaltma", "kişisel karbon ayak izi", "emisyon faktörü"],
  lead: "Karbon ayak izi, bir kişinin, hanenin ya da ürünün neden olduğu sera gazı salımının karbondioksit eşdeğeri (CO<sub>2</sub>e) cinsinden toplamıdır ve en basit hâliyle <strong>tüketim miktarı × emisyon faktörü</strong> ile hesaplanır. Örnek faktörlerle 100 km'de 6,5 litre benzin yakan bir araba yaklaşık 15 kg CO<sub>2</sub> salar; 1 kWh elektrik Türkiye şebekesinde kabaca 0,4–0,5 kg CO<sub>2</sub>'ye karşılık gelir. Bu sayfada elektrik, doğal gaz, yakıt ve uçuş için yaklaşık faktörleri, örnek bir hane hesabını, okul projeleri için ölçüm yöntemini ve azaltma yollarını anlatıyoruz.",
  kisaCevap: [
    "Karbon ayak izi (kg CO<sub>2</sub>e) = tüketim miktarı × emisyon faktörü; kalemler toplanır.",
    "Örnek faktörler: benzin ≈ 2,31 kg/L, dizel ≈ 2,68 kg/L, LPG ≈ 1,51 kg/L, doğal gaz ≈ 2,0 kg/m³.",
    "Türkiye elektrik şebekesi için örnek faktör ≈ 0,44 kg CO<sub>2</sub>/kWh; değer elektrik üretim karışımına göre yıldan yıla değişir.",
    "Uçuşlar için kabaca 0,15 kg CO<sub>2</sub>/yolcu-km kullanılabilir; kısa uçuşlarda kilometre başına salım daha yüksektir.",
    "TÜİK verilerine göre Türkiye'de 2024 yılında kişi başı sera gazı emisyonu yaklaşık 6,8 ton CO<sub>2</sub> eşdeğeridir (tüm sektörler).",
    "Bu tür hesaplar tahmindir; faktörler kaynağa, yıla ve yönteme göre farklılık gösterir."
  ],
  figure: {
    alt: "Örnek üç kişilik hanenin yıllık karbon ayak izi çubuk grafiği: doğal gaz 2.400 kg, araç yakıtı 2.218 kg, elektrik 1.320 kg, uçuş 144 kg; toplam yaklaşık 6,1 ton, kişi başı yaklaşık 2 ton CO2.",
    caption: "Örnek hane: ayda 250 kWh elektrik, 100 m³ doğal gaz, 80 litre benzin ve yılda bir gidiş-dönüş yurt içi uçuş. Faktörler yaklaşıktır; sonuç yalnızca bu dört kalemi kapsar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Örnek hane: yıllık karbon ayak izi (kg CO₂)</text>
  <g>
    <text x="30" y="84" class="b">Doğal gaz</text>
    <rect x="150" y="64" width="480" height="32" rx="4" class="p"/>
    <text x="640" y="86" class="b">2.400</text>
    <text x="150" y="112" class="sm t2">1.200 m³ × 2,0 kg/m³ · %39,5</text>
    <text x="30" y="146" class="b">Araç yakıtı</text>
    <rect x="150" y="126" width="444" height="32" rx="4" class="ps"/>
    <text x="604" y="148" class="b">2.218</text>
    <text x="150" y="174" class="sm t2">960 L benzin × 2,31 kg/L · %36,5</text>
    <text x="30" y="208" class="b">Elektrik</text>
    <rect x="150" y="188" width="264" height="32" rx="4" class="oks"/>
    <text x="424" y="210" class="b">1.320</text>
    <text x="150" y="236" class="sm t2">3.000 kWh × 0,44 kg/kWh · %21,7</text>
    <text x="30" y="270" class="b">Uçuş</text>
    <rect x="150" y="250" width="29" height="32" rx="4" class="sf sb"/>
    <text x="190" y="272" class="b">144</text>
    <text x="150" y="298" class="sm t2">960 yolcu-km × 0,15 kg · %2,4</text>
  </g>
  <rect x="30" y="318" width="320" height="66" rx="10" class="sf sb"/><rect x="30" y="318" width="8" height="66" class="p"/>
  <text x="52" y="344" class="b">Toplam ≈ 6,08 ton CO₂</text>
  <text x="52" y="368" class="sm">3 kişi → kişi başı ≈ 2,03 ton</text>
  <rect x="370" y="318" width="320" height="66" rx="10" class="ps"/>
  <text x="530" y="344" class="b mid">Formül</text>
  <text x="530" y="368" class="sm mid">miktar × emisyon faktörü, kalemler toplanır</text>
</svg>`
  },
  sections: [
    {
      h: "Karbon ayak izi nedir?",
      p: [
        "Karbon ayak izi, bir faaliyetin doğrudan ya da dolaylı olarak atmosfere saldığı sera gazlarının toplam miktarıdır. Karbondioksitin yanında metan ve diazot monoksit gibi gazlar da iklim üzerinde etkilidir; bu gazlar ısıtma etkilerine göre karbondioksite çevrilerek tek bir birimle, <strong>CO<sub>2</sub> eşdeğeri (CO<sub>2</sub>e)</strong> olarak ifade edilir.",
        "Karbon ayak izi bir kişi, bir hane, bir okul, bir şirket, bir ürün ya da bir etkinlik için hesaplanabilir. Kişisel hesaplarda genellikle evde kullanılan elektrik ve ısınma enerjisi, araç yakıtı, uçak yolculukları, beslenme ve alışveriş gibi kalemler ele alınır. Ürünlerin ayak izi ise hammaddeden üretime, taşımadan atığa kadar tüm yaşam döngüsünü kapsayabilir ve çok daha ayrıntılı veri gerektirir."
      ]
    },
    {
      h: "Karbon ayak izi nasıl hesaplanır? Temel formül",
      formula: "Emisyon (kg CO₂e) = faaliyet verisi × emisyon faktörü\nToplam = elektrik + ısınma + ulaşım + uçuş + diğer kalemler\nKişi başı = hane toplamı ÷ kişi sayısı",
      p: [
        "<strong>Faaliyet verisi</strong>, ne kadar tükettiğinizi gösteren miktardır: kWh elektrik, m³ doğal gaz, litre yakıt, kilometre yol. Bu veriler faturalardan, sayaç okumalarından ve araç yakıt kayıtlarından alınabilir. <strong>Emisyon faktörü</strong> ise bir birim tüketimin kaç kilogram CO<sub>2</sub> eşdeğeri salım yarattığını gösterir. Faktörler ulusal envanterlerden, uluslararası rehberlerden (örneğin IPCC yöntemleri) ve resmî kurumların yayımladığı değerlerden alınır.",
        "Aşağıdaki tablo bu yazıda kullanılan <strong>örnek ve yaklaşık</strong> faktörleri gösterir. Yakıt faktörleri, yakıtın yanması sırasında oluşan doğrudan karbondioksite dayanır; elektrik faktörü ülkedeki üretim karışımına (kömür, doğal gaz, yenilenebilir kaynak payı) göre değişir. Kesin raporlama gereken durumlarda güncel resmî değerler kullanılmalıdır."
      ],
      table: {
        head: ["Kalem", "Birim", "Örnek faktör (kg CO<sub>2</sub>)", "Not"],
        rows: [
          ["Benzin", "1 litre", "≈ 2,31", "Yanma kaynaklı doğrudan salım"],
          ["Dizel (motorin)", "1 litre", "≈ 2,68", "Yanma kaynaklı doğrudan salım"],
          ["Otogaz (LPG)", "1 litre", "≈ 1,51", "Yanma kaynaklı doğrudan salım"],
          ["Doğal gaz", "1 m³", "≈ 2,0", "Yaklaşık 0,2 kg/kWh"],
          ["Şebeke elektriği (Türkiye)", "1 kWh", "≈ 0,44", "Üretim karışımına göre yıldan yıla değişir"],
          ["Uçak yolculuğu", "1 yolcu-km", "≈ 0,15", "Kısa uçuşlarda daha yüksek; yöntem farkı büyük"]
        ],
        caption: "Faktörler örnek/yaklaşık değerlerdir ve sitedeki Karbon Ayak İzi aracının varsayılanlarıyla uyumludur. Kaynaklar: IPCC ulusal envanter rehberleri ve Enerji ve Tabii Kaynaklar Bakanlığı'nın şebeke emisyon verileri; güncel değer için resmî kaynağa bakın."
      }
    },
    {
      h: "Araba ile 100 km kaç kg CO2 salar?",
      p: [
        "Araç salımı, tüketilen yakıt miktarı ile o yakıtın emisyon faktörünün çarpımıdır. Aracınızın 100 km'de ne kadar yakıt tükettiğini biliyorsanız hesap tek adımdır."
      ],
      ol: [
        "100 km'de 6,5 litre benzin tüketen bir otomobil: 6,5 × 2,31 ≈ <strong>15,0 kg CO<sub>2</sub></strong>.",
        "100 km'de 5,5 litre dizel tüketen bir otomobil: 5,5 × 2,68 ≈ <strong>14,7 kg CO<sub>2</sub></strong>. Dizelin litre başı faktörü yüksek olsa da daha az yakıt tüketildiği için sonuç yakındır.",
        "Yolcu başına salım için toplamı araçtaki kişi sayısına bölün: dört kişinin paylaştığı aynı yolculukta kişi başı ≈ 3,75 kg.",
        "Yıllık hesap: yılda 15.000 km yapan 6,5 L/100 km'lik araç 975 litre benzin tüketir; 975 × 2,31 ≈ 2,25 ton CO<sub>2</sub>."
      ],
      after: [
        "Aracınızın gerçek tüketimini öğrenmek için [[bilgi:100-km-de-kac-litre-yakit-hesaplama|100 km'de kaç litre yakıt yazısındaki]] depo doldurma yöntemini kullanabilirsiniz. Aynı yolculuğun maliyetini, sigorta ve bakım dahil kilometre başı giderini görmek için [[arac:kilometre-maliyeti-hesapla|Kilometre Maliyeti Hesaplama]] aracı karbon hesabıyla birlikte değerlendirilebilir. Elektrikli araçlarda doğrudan egzoz salımı yoktur ama şarj elektriğinin üretimi faktörle hesaplanır; maliyet tarafı [[bilgi:elektrikli-arac-sarj-maliyeti-ne-kadar|elektrikli araç şarj maliyeti yazısında]] anlatılır."
      ]
    },
    {
      h: "Elektrik tüketimi karbon ayak izine nasıl yansır?",
      p: [
        "Evinizde kullandığınız elektrik, santrallerde üretilirken salım yaratır. Bu yüzden elektrik tüketimi \"dolaylı\" emisyon olarak sayılır. Faturadaki aylık kWh değerini şebeke emisyon faktörüyle çarparak yaklaşık salımı bulursunuz: ayda 250 kWh tüketen bir hane için 250 × 0,44 = 110 kg CO<sub>2</sub>, yılda yaklaşık 1,32 ton.",
        "Tek tek cihazların payını görmek için cihazın gücünü ve kullanım süresini bilmek yeterlidir. Örneğin günde 18 kWh harcayan bir elektrikli ısıtıcı ayda 540 kWh, yani yaklaşık 238 kg CO<sub>2</sub> salıma karşılık gelir. Cihaz bazında kWh hesabı için [[arac:elektrik-tuketim-hesapla|Elektrik Tüketimi Hesaplama]] aracını, faturanın nasıl oluştuğunu anlamak için [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası yazısını]] kullanabilirsiniz.",
        "Çatı tipi güneş paneli ya da yenilenebilir enerji sertifikalı tarife gibi seçenekler elektrik kaynaklı salımı düşürebilir; bu durumda faktör, kullanılan kaynağa göre ayrıca değerlendirilmelidir."
      ]
    },
    {
      h: "Isınma: doğal gaz ve diğer yakıtlar",
      p: [
        "Türkiye'de birçok hanede ısınmanın ve sıcak suyun ana kaynağı doğal gazdır. Doğal gaz yandığında metreküp başına yaklaşık 2 kg CO<sub>2</sub> oluşur. Ayda ortalama 100 m³ doğal gaz tüketen bir hane yılda yaklaşık 1.200 m³ yakar ve bu yaklaşık 2,4 ton CO<sub>2</sub> eder; kış aylarında tüketim yükseldiği için aylık ortalama yerine yıllık toplamı kullanmak daha doğrudur.",
        "Doğal gaz faturalarında tüketim m³ yanında kWh olarak da gösterilebilir. m³ ile kWh arasında geçiş için [[arac:dogalgaz-tuketim-hesapla|Doğal Gaz Tüketim Hesaplama]] aracını kullanabilirsiniz. Isınmadan kaynaklanan salımı azaltmanın en etkili yolları yalıtım, termostatik vana ve doğru kombi ayarıdır."
      ]
    },
    {
      h: "Örnek: üç kişilik bir hanenin yıllık karbon ayak izi",
      table: {
        head: ["Kalem", "Yıllık tüketim", "Faktör", "Yıllık salım"],
        rows: [
          ["Elektrik", "3.000 kWh (ayda 250)", "0,44 kg/kWh", "1.320 kg"],
          ["Doğal gaz", "1.200 m³ (ayda 100)", "2,0 kg/m³", "2.400 kg"],
          ["Benzin", "960 L (ayda 80)", "2,31 kg/L", "≈ 2.218 kg"],
          ["Uçuş", "960 yolcu-km (bir gidiş-dönüş)", "0,15 kg/yolcu-km", "144 kg"],
          ["Toplam", "", "", "≈ 6.082 kg ≈ 6,08 ton"],
          ["Kişi başı (3 kişi)", "", "", "≈ 2,03 ton"]
        ],
        caption: "Örnek değerler; beslenme, alışveriş, toplu taşıma ve atık dahil değildir."
      },
      after: [
        "Bu örnekte en büyük kalem ısınma, ikincisi araç yakıtıdır. Ancak kişisel hesaplar yalnızca girilen kalemleri kapsar. TÜİK'in ulusal sera gazı envanterine göre Türkiye'nin 2024 yılı toplam salımı yaklaşık 584,5 milyon ton CO<sub>2</sub> eşdeğeri, kişi başı değer ise yaklaşık 6,8 tondur. Bu ulusal ortalama sanayi, tarım, atık ve hizmet sektörlerini de içerdiği için örnek hanenin dört kalemlik hesabıyla doğrudan karşılaştırılmamalıdır."
      ]
    },
    {
      h: "Uçak yolculuğu karbon ayak izini ne kadar artırır?",
      p: [
        "Uçak yolculuğu kısa sürede büyük mesafe kat ettiği için tek bir yolculuk bile kişisel ayak izinde belirgin bir kalem oluşturabilir. Kabaca 0,15 kg CO<sub>2</sub>/yolcu-km faktörüyle 1.000 km'lik bir uçuş yolcu başına yaklaşık 150 kg CO<sub>2</sub> eder. Kısa uçuşlarda kalkış ve tırmanış yakıtı toplam yakıtın büyük kısmını oluşturduğu için kilometre başına salım daha yüksektir; uzun uçuşlarda ise toplam salım mesafe nedeniyle büyüktür.",
        "Uçuş hesaplarında yöntemler arasında büyük farklar vardır: bazı yöntemler yalnızca CO<sub>2</sub>'yi, bazıları yüksek irtifadaki ek iklim etkilerini de hesaba katar; ekonomi ve iş sınıfı koltuklar farklı paylar alır. Bu nedenle uçuş sonuçlarını \"büyüklük sırası\" olarak değerlendirmek gerekir."
      ]
    },
    {
      h: "Okul projesi için karbon ayak izi nasıl ölçülür?",
      ol: [
        "Kapsamı belirleyin: ev mi, sınıf mı, okul mu? Hangi kalemleri (elektrik, ısınma, ulaşım, kâğıt, atık) ölçeceğinizi yazın.",
        "Veri toplayın: elektrik ve doğal gaz faturalarından aylık tüketimleri, ulaşım için öğrencilerin okula geliş biçimini ve mesafesini anket ile kaydedin.",
        "Faktörleri seçin ve kaynağını not edin: projede kullandığınız her faktörün nereden alındığını raporda belirtin.",
        "Hesaplayın: her kalem için miktar × faktör yapın, toplayın ve kişi başına bölün.",
        "Grafikleyin: kalemlerin toplam içindeki payını çubuk ya da pasta grafikle gösterin.",
        "Önlem önerin ve yeniden ölçün: örneğin \"boş sınıfta ışıkları kapatma\" kampanyasından bir ay sonra elektrik tüketimini tekrar karşılaştırın."
      ],
      after: [
        "Projelerde sonucun kesinliğinden çok yöntemin açık ve tutarlı olması önemlidir. Aynı faktörleri ve aynı kapsamı kullanarak yapılan iki ölçüm, aradaki değişimi güvenilir biçimde gösterir. Hesapları hızlıca yapmak için [[arac:karbon-ayak-izi-hesapla|Karbon Ayak İzi Hesaplama]] aracı elektrik, doğal gaz, araç yakıtı ve uçuş kalemlerini alır, kalem kalem dağılımı ve kişi başı değeri gösterir."
      ]
    },
    {
      h: "Karbon ayak izi nasıl azaltılır?",
      ul: [
        "<strong>Isınmada verim:</strong> Çatı ve dış cephe yalıtımı, pencere sızdırmazlığı ve termostat ayarını bir iki derece düşürmek doğal gaz tüketimini belirgin biçimde azaltabilir.",
        "<strong>Elektrikte verim:</strong> Verimli aydınlatma, bekleme modundaki cihazları kapatmak ve yüksek verim sınıflı beyaz eşya tercih etmek tüketimi düşürür.",
        "<strong>Ulaşım:</strong> Kısa mesafelerde yürüyüş ve bisiklet, şehir içinde toplu taşıma, araç paylaşımı ve yumuşak sürüş yakıt tüketimini ve salımı azaltır.",
        "<strong>Uçuş:</strong> Mümkün olduğunda kısa mesafeleri tren ya da otobüsle yapmak, toplantıları çevrim içi düzenlemek uçuş kaleminin etkisini azaltır.",
        "<strong>Tüketim alışkanlıkları:</strong> Gıda israfını azaltmak, ürünleri uzun süre kullanmak ve geri dönüşüme katılmak dolaylı salımları düşürür."
      ],
      after: [
        "Azaltma çalışmalarında ilk adım, en büyük kalemi bulmaktır. Örnek hanede ısınma ve araç yakıtı toplamın dörtte üçünü oluşturduğu için küçük bir verim artışı bile elektrikteki büyük bir tasarruftan daha fazla etki yaratabilir."
      ]
    }
  ],
  faq: [
    ["Karbon ayak izi nedir?", "Karbon ayak izi bir kişinin, hanenin, kurumun ya da ürünün neden olduğu sera gazı salımlarının karbondioksit eşdeğeri cinsinden toplamıdır. Elektrik, ısınma, ulaşım, uçuş ve tüketim gibi kalemlerden oluşur."],
    ["Karbon ayak izi nasıl hesaplanır?", "Her kalem için tüketim miktarı emisyon faktörüyle çarpılır ve sonuçlar toplanır. Örneğin 3.000 kWh elektrik 0,44 kg CO2/kWh örnek faktörle yaklaşık 1.320 kg CO2'ye karşılık gelir."],
    ["Araba ile 100 km kaç kg CO₂ salar?", "100 km'de 6,5 litre benzin tüketen bir otomobil litre başına yaklaşık 2,31 kg faktörle yaklaşık 15 kg CO2 salar. 5,5 litre dizel tüketen bir araç için sonuç yaklaşık 14,7 kg'dır; yolcu sayısına bölünerek kişi başı değer bulunur."],
    ["Elektrik tüketimi karbon ayak izine nasıl yansır?", "Faturadaki kWh değeri şebeke emisyon faktörüyle çarpılır. Türkiye için örnek faktör yaklaşık 0,44 kg CO2/kWh'dir; ayda 250 kWh tüketen bir hane yılda yaklaşık 1,3 ton CO2'ye karşılık gelen dolaylı salım yaratır."],
    ["Ortalama bir kişinin yıllık karbon ayak izi ne kadar?", "TÜİK verilerine göre Türkiye'de 2024 yılında kişi başı sera gazı emisyonu yaklaşık 6,8 ton CO2 eşdeğeridir. Bu değer sanayi ve tarım dahil tüm sektörleri kapsar; kişisel hesaplar genellikle yalnızca ev ve ulaşım kalemlerini içerir."],
    ["Uçak yolculuğu karbon ayak izini ne kadar artırır?", "Kabaca 0,15 kg CO2/yolcu-km faktörüyle 1.000 km'lik bir uçuş yolcu başına yaklaşık 150 kg CO2 eder. Kısa uçuşlarda kilometre başına salım daha yüksektir ve hesaplama yöntemlerine göre sonuçlar belirgin biçimde değişebilir."],
    ["Karbon ayak izi nasıl azaltılır?", "En etkili adımlar ısınmada yalıtım ve termostat ayarı, verimli cihazlar, kısa mesafelerde yürüyüş ve toplu taşıma, araç paylaşımı ve gereksiz uçuşlardan kaçınmaktır. Önce en büyük kalemi belirleyip oradan başlamak en hızlı sonucu verir."],
    ["Okul projesi için karbon ayak izi nasıl ölçülür?", "Kapsam belirlenir, faturalardan ve anketlerden tüketim verileri toplanır, kaynağı belirtilen emisyon faktörleriyle her kalem hesaplanıp toplanır. Sonuç grafikle gösterilir, önlem önerilir ve bir süre sonra aynı yöntemle yeniden ölçülür."],
    ["Emisyon faktörleri neden kaynaktan kaynağa farklı?", "Faktörler yakıtın bileşimine, elektrik üretim karışımına, hesaba katılan gazlara ve yaşam döngüsünün hangi aşamalarının dahil edildiğine göre değişir. Bu nedenle bir hesapta hangi faktörün ve hangi kaynağın kullanıldığı mutlaka belirtilmelidir."]
  ],
  tools: ["karbon-ayak-izi-hesapla", "kilometre-maliyeti-hesapla", "elektrik-tuketim-hesapla", "dogalgaz-tuketim-hesapla"],
  related: ["100-km-de-kac-litre-yakit-hesaplama", "elektrik-faturasi-nasil-hesaplanir", "elektrikli-arac-sarj-maliyeti-ne-kadar", "dogalgaz-faturasi-ve-kombi-kapasitesi"],
  sources: [
    ["TÜİK – Sera Gazı Emisyon İstatistikleri", "https://data.tuik.gov.tr/"],
    ["Enerji ve Tabii Kaynaklar Bakanlığı", "https://enerji.gov.tr/"],
    ["IPCC – Ulusal sera gazı envanteri rehberleri", "https://www.ipcc-nggip.iges.or.jp/"]
  ]
};
