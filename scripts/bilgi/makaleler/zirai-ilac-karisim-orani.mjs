export default {
  slug: "zirai-ilac-karisim-orani",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Zirai İlaç Nasıl Hazırlanır? 100 Litre Suya Kaç cc İlaç Karıştırılır",
  pageTitle: "Zirai İlaç Karışım Oranı: Etiket Dozu ve Depo Hesabı",
  description: "Zirai ilaçta doz her zaman etikette yazar. Etiketteki 100 litreye ya da dekara dozun sırt pülverizatörü ve depoya nasıl çevrileceği, cc–ml, kalibrasyon ve güvenlik.",
  keywords: ["zirai ilaç karışım oranı", "100 litre suya kaç cc ilaç", "ilaçlama suyu hesaplama", "pülverizatör ilaç oranı", "1 cc kaç ml", "dekara ilaç dozu", "sırt pülverizatörü ilaç hesabı", "ilaçlama hangi saatte yapılır"],
  lead: "Zirai ilacın kaç cc karıştırılacağı <strong>her zaman ürünün etiketinde</strong> yazar ve doz ya \"100 litre suya ml (cc) ya da gram\" ya da \"dekara ml ya da gram\" olarak verilir. Sizin yapmanız gereken, bu dozu kendi deponuza doğru çevirmektir: etikette 100 litre suya 50 ml yazıyorsa 16 litrelik sırt pülverizatörüne 16 ÷ 100 × 50 = 8 ml konur. Bu sayfa yalnızca etiket dozunun okunmasını ve oran hesabını anlatır; hangi ilacın hangi ürüne kullanılacağına ziraat mühendisinin reçetesi ve ürün etiketi karar verir.",
  kisaCevap: [
    "Doz ve kullanım şekli için tek kaynak ruhsatlı ürünün etiketi ve ziraat mühendisinin reçetesidir; etiket dışı doz uygulanmaz.",
    "100 litreye verilen doz için: depoya konacak ilaç = depo hacmi (L) ÷ 100 × etiket dozu.",
    "Dekara verilen doz için: depoya konacak ilaç = etiket dozu (ml/da) × bir deponun ilaçladığı alan (da).",
    "1 cc = 1 ml = 1 cm³; sıvı ilaçlar ml, toz ve granül ilaçlar gram ile ölçülür.",
    "Dekara atılan su miktarı ekipmanınızın kalibrasyonuyla bulunur; etikette su miktarı da belirtilmişse ona uyulur.",
    "İlaç hazırlarken ve uygularken etikette istenen eldiven, maske, gözlük ve koruyucu giysi mutlaka kullanılır."
  ],
  figure: {
    alt: "İki etiket türünün depoya çevrilmesi: örnek etikette 100 litre suya 50 ml yazıyorsa 16 litrelik sırt pülverizatörüne 8 ml; dekara 150 ml ve 40 litre su yazıyorsa 400 litrelik depo 10 dekar ilaçlar ve depoya 1.500 ml konur. Altta koruyucu ekipman listesi.",
    caption: "Değerler hesap mantığını göstermek için seçilmiş örnek etiket değerleridir; hiçbir ürün için doz önerisi değildir. Kullandığınız ürünün etiketindeki doz ve talimatları esas alın.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Etiketteki dozu depoya çevirmek</text>
  <g>
    <rect x="20" y="52" width="330" height="236" rx="10" class="sf sb"/>
    <rect x="20" y="52" width="330" height="40" rx="10" class="p"/>
    <text x="185" y="78" class="b mid sf">Etiket A: 100 litre suya doz</text>
    <text x="185" y="118" class="mid">Örnek etiket: 100 L suya 50 ml</text>
    <text x="185" y="148" class="sm mid t2">Sırt pülverizatörü: 16 L</text>
    <rect x="50" y="162" width="270" height="44" rx="8" class="ps"/>
    <text x="185" y="190" class="mid">16 ÷ 100 × 50</text>
    <text x="185" y="240" class="xl mid p">8 ml</text>
    <text x="185" y="270" class="sm mid t2">her 16 litrelik dolum için</text>

    <rect x="370" y="52" width="330" height="236" rx="10" class="sf sb"/>
    <rect x="370" y="52" width="330" height="40" rx="10" class="p"/>
    <text x="535" y="78" class="b mid sf">Etiket B: dekara doz</text>
    <text x="535" y="118" class="mid">Örnek: dekara 150 ml, 40 L su</text>
    <text x="535" y="148" class="sm mid t2">Depo: 400 L → 400 ÷ 40 = 10 dekar</text>
    <rect x="400" y="162" width="270" height="44" rx="8" class="oks"/>
    <text x="535" y="190" class="mid">150 ml × 10 da</text>
    <text x="535" y="240" class="xl mid p">1.500 ml</text>
    <text x="535" y="270" class="sm mid t2">her 400 litrelik depo için</text>
  </g>
  <rect x="20" y="304" width="680" height="120" rx="10" class="dgs"/>
  <text x="40" y="330" class="b">Hazırlarken ve uygularken (etiketteki koruyucu ekipman)</text>
  <g class="sm">
    <text x="40" y="358">Kimyasala dayanıklı eldiven</text>
    <text x="270" y="358">Etikette istenen maske</text>
    <text x="490" y="358">Koruyucu gözlük</text>
    <text x="40" y="384">Uzun kollu tulum ve çizme</text>
    <text x="270" y="384">Rüzgârsız, serin saat</text>
    <text x="490" y="384">Hasat öncesi bekleme süresi</text>
    <text x="40" y="410" class="b">Zehirlenme şüphesinde Ulusal Zehir Danışma Merkezi: 114</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Önce kural: doz etikette yazar",
      p: [
        "Zirai ilaçlar, resmî adıyla bitki koruma ürünleri, Türkiye'de Tarım ve Orman Bakanlığı tarafından ruhsatlandırılır. Her ürünün etiketinde hangi bitkide, hangi zararlı, hastalık ya da yabancı ota karşı, hangi dozda ve nasıl kullanılacağı; son ilaçlama ile hasat arasında beklenmesi gereken süre; güvenlik önlemleri ve ilk yardım bilgileri yazar. Etiket, ürünün güvenli ve etkili kullanımı için hazırlanmış yasal bir belgedir.",
        "Bitki koruma ürünlerinin seçimi ve kullanımı ziraat mühendisinin değerlendirmesine ve reçetesine dayanmalıdır. Etikette yazmayan bir bitkide kullanmak, dozu \"daha etkili olsun\" diye artırmak ya da ruhsatsız ürün kullanmak hem yasal yaptırım hem de insan sağlığı, çevre ve ürün kalıntısı açısından ciddi riskler doğurur. Bu sayfa hiçbir ürün için doz önermez; yalnızca etikette yazan dozu kendi ekipmanınıza doğru çevirmenizi sağlayacak hesabı anlatır."
      ]
    },
    {
      h: "Etiketteki doz dekara mı 100 litreye mi yazılır?",
      p: [
        "İkisi de kullanılır ve hangisinin geçerli olduğu etikette açıkça belirtilir. Okurken birimi ve neye göre verildiğini dikkatle kontrol edin:"
      ],
      table: {
        head: ["Etiketteki ifade", "Anlamı", "Nasıl çevrilir"],
        rows: [
          ["50 ml / 100 L su", "Konsantrasyon dozu: her 100 litre ilaçlı suya 50 ml ürün", "Depo hacmi ÷ 100 × doz"],
          ["150 ml / dekar", "Alan dozu: her dekara 150 ml ürün düşmeli", "Doz × bir deponun ilaçladığı dekar"],
          ["30 g / 100 L su", "Toz ya da granül üründe konsantrasyon dozu", "Depo hacmi ÷ 100 × doz (gram)"],
          ["Dekara 30–50 L su", "Dekara püskürtülecek ilaçlı su miktarı", "Ekipman kalibrasyonuyla karşılaştırılır"]
        ],
        caption: "Tablodaki sayılar örnektir. Etikette bir aralık verilmişse (örneğin 40–60 ml) hangi değerin kullanılacağı etikette yazan koşullara ve ziraat mühendisinin değerlendirmesine göre belirlenir."
      },
      after: [
        "Önemli fark şudur: <strong>100 litreye verilen dozda</strong> ilaç miktarı suya bağlıdır; dekara daha çok su atarsanız dekara düşen ilaç da artar. <strong>Dekara verilen dozda</strong> ise dekara düşen ilaç sabittir; su miktarı değişirse depoya konacak ilaç miktarı değişir. Bu yüzden dekara dozlu ürünlerde ekipmanınızın dekara kaç litre attığını bilmeniz zorunludur."
      ]
    },
    {
      h: "100 litre suya verilen dozu depoya çevirme",
      formula: "Depoya konacak ilaç = depo hacmi (L) ÷ 100 × etiket dozu (ml ya da g / 100 L)\nÖrnek etiket 50 ml / 100 L ise:\n16 L sırt pülverizatörü → 16 ÷ 100 × 50 = 8 ml\n20 L sırt pülverizatörü → 20 ÷ 100 × 50 = 10 ml\n400 L traktör deposu → 400 ÷ 100 × 50 = 200 ml",
      p: [
        "Depoyu tam doldurmayacaksanız hesabı depoya koyacağınız su miktarıyla yapın, depo kapasitesiyle değil. Örneğin 16 litrelik pülverizatöre 10 litre su koyacaksanız 10 ÷ 100 × 50 = 5 ml ilaç eklenir.",
        "Küçük miktarları doğru ölçmek için ölçekli bir ölçü kabı ya da şırınga kullanın; çay kaşığı, yemek kaşığı gibi mutfak ölçüleri ilaç için kesinlikle kullanılmamalıdır, hem hassas değildir hem de gıdayla temas eden eşyaların kirlenmesine yol açar. Ölçü kabını yalnızca ilaçlama için ayırın ve çocukların ulaşamayacağı yerde saklayın."
      ]
    },
    {
      h: "Dekara verilen dozu depoya çevirme",
      formula: "Bir deponun ilaçladığı alan (da) = depo hacmi (L) ÷ dekara atılan su (L/da)\nDepoya konacak ilaç = etiket dozu (ml/da) × bir deponun ilaçladığı alan\nÖrnek etiket: 150 ml/da · su 40 L/da · depo 400 L\n400 ÷ 40 = 10 da  →  150 × 10 = 1.500 ml",
      p: [
        "Örnekte 400 litrelik depo, dekara 40 litre suyla 10 dekar ilaçlar; dekara 150 ml doz için depoya 150 × 10 = <strong>1.500 ml</strong> ilaç konur. İlaçlanacak toplam alan 20 dekarsa toplam 800 litre su ve 3.000 ml ilaç gerekir, bu da iki tam depo eder. Bu durumda karışımın konsantrasyonu 1.500 ml ÷ 400 L = 100 litrede 375 ml olur; ancak bu sayı yalnızca kendi su miktarınıza göre hesaplanmış bir sonuçtur, etiketin yerine geçen bir doz değildir.",
        "Dekara dozlu ürünlerde en sık yapılan hata, ekipmanın dekara attığı suyu bilmeden depoya ilaç koymaktır. Dekara 40 yerine 60 litre su atıyorsanız aynı 400 litrelik depo yalnızca 6,67 dekar ilaçlar ve depoya konması gereken ilaç 1.000 ml'ye düşer. Su miktarı değiştiğinde hesabı yeniden yapın."
      ],
      after: [
        "Hesabı adım adım ve iki kez kontrol ederek yapın ya da [[arac:ilaclama-suyu-hesapla|Zirai İlaçlama Karışımı Hesaplama]] aracını kullanın. Araca ilaçlanacak alanı, dekara atılan suyu, etiket dozunu ve dozun türünü (dekara ya da 100 litreye) ve depo hacmini yazdığınızda bir depoya konacak ilaç, toplam ilaç, toplam su ve depo dolum sayısı ayrı satırlarda gösterilir."
      ]
    },
    {
      h: "Sırt pülverizatörü için ilaç oranı nasıl hesaplanır?",
      ol: [
        "Etiketi okuyun: doz 100 litreye mi, dekara mı verilmiş, birim ml mi gram mı?",
        "Pülverizatörünüze koyacağınız su miktarını belirleyin (örneğin 16 L).",
        "100 litreye verilen dozda: 16 ÷ 100 × etiket dozu. Örnek etiket 50 ml / 100 L ise 8 ml.",
        "Dekara verilen dozda: önce pülverizatörün bir dolumda kaç dekar ilaçladığını kalibrasyonla bulun. Dekara 40 L atıyorsanız 16 L ile 0,4 dekar ilaçlarsınız; doz dekara 150 ml ise 150 × 0,4 = 60 ml.",
        "Depoyu yarısına kadar suyla doldurun, ölçtüğünüz ilacı ekleyin, karıştırın ve kalan suyu tamamlayın. Etikette farklı bir hazırlama sırası yazıyorsa ona uyun."
      ]
    },
    {
      h: "Dekara kaç litre ilaçlı su atılır? Kalibrasyon",
      p: [
        "Dekara atılan su miktarı ekipmana, meme tipine, basınca, yürüme ya da traktör hızına ve bitkinin büyüklüğüne bağlıdır. Etikette su miktarı da belirtilmişse o aralık esas alınır. Kendi ekipmanınızın gerçekte dekara ne kadar su attığını öğrenmenin yolu basit bir kalibrasyondur:"
      ],
      ol: [
        "Tarlada 10 × 10 metrelik, yani 100 m²'lik bir alan işaretleyin.",
        "Depoyu yalnızca temiz suyla belirli bir çizgiye kadar doldurun.",
        "Normal yürüyüş ya da sürüş hızınızda ve normal basınçta bu alanı püskürtün.",
        "Depoyu yeniden aynı çizgiye kadar doldurmak için gereken suyu ölçün. Örneğin 4 litre.",
        "100 m² dekarın onda biri olduğu için bu miktarı 10 ile çarpın: 4 × 10 = 40 L/da."
      ],
      after: [
        "Kalibrasyon yalnızca suyla yapılır ve özellikle dekara dozlu ürünlerde doğru ilaç miktarı için zorunludur. Alan ölçülerini çevirmek için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "1 cc kaç ml? Birimler ve seyreltme oranı",
      p: [
        "<strong>1 cc (santimetreküp) = 1 ml (mililitre)</strong>'dir; iki birim tamamen aynı hacmi anlatır. Etiketlerde ve günlük dilde ikisi de kullanılır. 1 litre 1.000 ml, yani 1.000 cc'dir. Toz ve granül ürünlerde doz gram ile verilir ve hacimle değil terazi ile ölçülür; 1 gram toz ürün 1 ml'ye eşit değildir. Birim dönüşümleri için [[arac:cc-ml-cevir|cc ml çevirici]] aracını kullanabilirsiniz.",
        "Bazen doz yüzde ya da oran olarak ifade edilir. Yüzde olarak verilen konsantrasyonu 100 litreye çevirmek kolaydır: %0,1 = 100 litrede 100 ml, %0,5 = 100 litrede 500 ml eder. \"1:200\" gibi oranlar ise yoruma açıktır (1 ölçü ürüne 200 ölçü su mu, toplam 200 ölçü mü?) ve bu yüzden bitki koruma ürünlerinde etiketin kendi ifadesi esas alınmalıdır. Temizlik ürünleri gibi konsantreleri sulandırmak için oran mantığını [[arac:seyreltme-orani-hesapla|Seyreltme Oranı Hesaplama]] aracında görebilirsiniz; bu araç zirai ilaç etiketinin yerine geçmez."
      ]
    },
    {
      h: "Farklı ilaçlar aynı depoda karıştırılabilir mi?",
      p: [
        "Yalnızca ürünlerin etiketlerinde karışabilirlik bilgisi varsa ve ziraat mühendisi uygun görüyorsa. Bazı ürünler birbirleriyle kimyasal olarak uyumsuzdur: karıştırıldığında çökelti oluşabilir, ürünlerin etkisi azalabilir ya da bitkide yanıklık (fitotoksisite) görülebilir. Bazı karışımlar uygulayıcı için de risk oluşturabilir.",
        "Etiketinde karışım bilgisi olmayan ürünleri kendi başınıza karıştırmayın. Karışım uygun görülmüşse ürünlerin depoya hangi sırayla ekleneceği de etikette ya da mühendisin talimatında belirtilir. Her ürün için doz ayrı ayrı hesaplanır; karışım olması dozların değiştirileceği anlamına gelmez."
      ]
    },
    {
      h: "İlaçlama hangi saatte yapılmalı? Güvenlik kuralları",
      ul: [
        "<strong>Saat ve hava:</strong> İlaçlama genellikle sabah erken ya da akşamüstü, hava serinken ve rüzgârsızken yapılır. Rüzgârlı havada ilaç komşu tarlalara, yerleşim yerlerine ve su kaynaklarına sürüklenir. Yağış bekleniyorsa ve çok sıcak saatlerde uygulama yapılmaz; etikette özel bir saat ya da sıcaklık koşulu varsa ona uyun.",
        "<strong>Koruyucu ekipman:</strong> Hazırlama ve uygulama sırasında etikette istenen kimyasala dayanıklı eldiven, maske ya da solunum koruyucu, koruyucu gözlük, uzun kollu tulum ve çizme kullanın. Konsantre ürünle çalışırken risk en yüksektir.",
        "<strong>Yeme, içme, sigara yok:</strong> İlaçlama sırasında yemek yemeyin, su içmeyin, sigara içmeyin. İş bitince ellerinizi ve yüzünüzü yıkayın, giysilerinizi ayrı yıkayın.",
        "<strong>Arılar ve çevre:</strong> Çiçeklenme döneminde arılara zararlı ürünlerle ilgili etiket uyarılarına uyun, gerekirse çevredeki arıcıları önceden bilgilendirin. Depoyu su kaynaklarının yanında doldurmayın ve yıkamayın.",
        "<strong>Bekleme süresi:</strong> Etikette yazan son ilaçlama ile hasat arasındaki süreye mutlaka uyun; bu süre ürün kalıntısının güvenli düzeye inmesi için gereklidir.",
        "<strong>Ambalaj ve artık:</strong> Boş ambalajları etiketteki talimata göre çalkalayın, çalkalama suyunu depoya ekleyin ve ambalajları toplama noktalarına teslim edin. Artan ilaçlı suyu kanallara ve toprağa dökmeyin.",
        "<strong>Saklama:</strong> Ürünleri orijinal ambalajında, kilitli, serin ve kuru bir yerde, gıda ve yemden uzakta, çocukların ulaşamayacağı yerde saklayın."
      ],
      after: [
        "Zehirlenme şüphesinde etiketteki ilk yardım talimatlarını uygulayın, ürün etiketini yanınıza alarak en yakın sağlık kuruluşuna başvurun ve Ulusal Zehir Danışma Merkezi'ni 114 numaradan arayın. Gübreleme planı ile ilgili hesaplar için [[bilgi:dekara-ne-kadar-gubre-atilir|dekara ne kadar gübre atılır]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["100 litre suya kaç cc ilaç konur?", "Bu miktar tamamen ürünün etiketinde yazar ve üründen ürüne değişir. Etikette örneğin 100 litre suya 50 ml yazıyorsa 100 litreye 50 cc konur; farklı depo hacmi için depo hacmi ÷ 100 × etiket dozu hesabı yapılır. Etiket dışı doz kullanılmamalıdır."],
    ["Etiketteki doz dekara mı 100 litreye mi yazılır?", "İkisi de kullanılır ve hangisinin geçerli olduğu etikette belirtilir. 100 litreye verilen doz suyun konsantrasyonunu, dekara verilen doz bir dekara düşmesi gereken ilaç miktarını gösterir. Hesap yöntemi bu farka göre değişir."],
    ["Sırt pülverizatörü için ilaç oranı nasıl hesaplanır?", "100 litreye dozlu ürünlerde pülverizatördeki su miktarı 100'e bölünüp etiket dozuyla çarpılır: 16 litre ve 50 ml/100 L için 8 ml. Dekara dozlu ürünlerde önce kalibrasyonla bir dolumun kaç dekar ilaçladığı bulunur."],
    ["1 cc kaç ml'dir?", "1 cc tam olarak 1 ml'ye eşittir; ikisi de bir santimetreküplük hacmi anlatır. 1 litre 1.000 ml ya da 1.000 cc eder. Toz ürünlerde doz gram ile verilir ve hacimle değil terazi ile ölçülmelidir."],
    ["Dekara kaç litre ilaçlı su atılır?", "Ekipmana, meme tipine, basınca, hıza ve bitkinin büyüklüğüne bağlıdır; etikette su miktarı belirtilmişse o esas alınır. Kendi ekipmanınızın değerini 100 m²'lik alanda suyla yapacağınız kalibrasyonla bulabilirsiniz."],
    ["Farklı ilaçlar aynı depoda karıştırılabilir mi?", "Yalnızca etiketlerde karışabilirlik bilgisi varsa ve ziraat mühendisi uygun görüyorsa. Uyumsuz ürünler çökelti oluşturabilir, etkisini kaybedebilir ya da bitkiye zarar verebilir. Etiketinde bilgi olmayan ürünleri kendi başınıza karıştırmayın."],
    ["İlaçlama hangi saatte yapılmalı?", "Genellikle sabah erken ya da akşamüstü, hava serin ve rüzgârsızken yapılır. Rüzgârlı, yağışlı ve çok sıcak saatlerde uygulama yapılmaz. Etikette özel bir koşul belirtilmişse ona uyulur ve koruyucu ekipman mutlaka kullanılır."],
    ["Seyreltme oranı nasıl hesaplanır?", "Yüzde olarak verilen konsantrasyon 100 litreye kolayca çevrilir: %0,5 = 100 litrede 500 ml. 1:200 gibi oranlar yoruma açık olduğundan bitki koruma ürünlerinde her zaman etiketteki ifade ve doz esas alınmalıdır."],
    ["İlaçlamada hangi koruyucu ekipman kullanılmalı?", "Etikette istenen ekipman kullanılır; genellikle kimyasala dayanıklı eldiven, maske ya da solunum koruyucu, koruyucu gözlük, uzun kollu tulum ve çizme gerekir. Konsantre ürünü hazırlarken risk en yüksektir; bu aşamada da ekipmanı çıkarmayın."]
  ],
  tools: ["ilaclama-suyu-hesapla", "cc-ml-cevir", "seyreltme-orani-hesapla"],
  related: ["dekara-ne-kadar-gubre-atilir", "1-donum-kac-metrekare"],
  sources: [
    ["T.C. Tarım ve Orman Bakanlığı – Bitki koruma ürünleri", "https://www.tarimorman.gov.tr/"],
    ["Gıda ve Kontrol Genel Müdürlüğü", "https://www.tarimorman.gov.tr/GKGM"],
    ["T.C. Sağlık Bakanlığı – Ulusal Zehir Danışma Merkezi", "https://www.saglik.gov.tr/"]
  ],
  uyari: "doz önerisi değildir; ruhsatlı ürünün etiketindeki doza ve ziraat mühendisinin reçetesine uyun"
};
