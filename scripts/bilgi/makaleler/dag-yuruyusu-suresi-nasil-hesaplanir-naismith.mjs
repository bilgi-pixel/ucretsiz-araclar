export default {
  slug: "dag-yuruyusu-suresi-nasil-hesaplanir-naismith",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "Doğa Yürüyüşü Süresi Nasıl Hesaplanır? Naismith Kuralı ve Tırmanış Payı",
  pageTitle: "Doğa Yürüyüşü Süresi Hesaplama: Naismith Kuralı ve Örnek",
  description: "Naismith kuralı: düz yolda saatte 5 km, her 600 m tırmanış için 1 saat eklenir. 14 km ve 900 m tırmanışlı rota yaklaşık 4 saat 18 dakika; iniş, mola ve dönüş saati.",
  keywords: ["doğa yürüyüşü süresi", "naismith kuralı", "dağ yürüyüşü kaç saat", "trekking süresi hesaplama", "tırmanış süresi", "yükseklik farkı süre", "langmuir düzeltmesi", "yürüyüş rotası süre"],
  lead: "Naismith kuralına göre bir doğa yürüyüşünün süresi, <strong>düz yolda saatte 5 km</strong> yürüdüğünüz varsayılarak bulunur ve buna <strong>her 600 metre tırmanış için 1 saat</strong> eklenir. Örneğin 14 km uzunluğunda ve toplam 900 m tırmanışı olan bir rota 2 saat 48 dakika yürüyüş + 1 saat 30 dakika tırmanış = yaklaşık <strong>4 saat 18 dakika</strong> sürer; molalar bu süreye dahil değildir. Bu sayfada formülü, inişler için düzeltmeleri, kondisyon ve sırt çantasının etkisini, grup planlamasını, su ve kalori ihtiyacını ve dönüş saatinin nasıl belirleneceğini anlatıyoruz.",
  kisaCevap: [
    "Naismith kuralı: süre (saat) = mesafe (km) ÷ 5 + toplam tırmanış (m) ÷ 600.",
    "Örnek: 14 km ve 900 m tırmanış → 2,8 + 1,5 = 4,3 saat ≈ 4 saat 18 dakika (molasız).",
    "İniş düzeltmesi (Langmuir): 5–12° arası eğimli inişte her 300 m için 10 dakika çıkarılır, 12°'den dik inişte her 300 m için 10 dakika eklenir.",
    "Kural formda bir yürüyüşçünün hafif yükle, iyi patikadaki temposunu varsayar; ağır çanta, kötü zemin ve grup yürüyüşü süreyi uzatır.",
    "Molalar için saat başına 5–10 dakika eklemek ve güneş batmadan en az bir saat önce bitirecek bir dönüş saati belirlemek yaygın bir güvenlik kuralıdır.",
    "Tırmanış payı, 600 m yükselmenin yaklaşık 5 km düz yürüyüşe denk geldiği anlamına gelir."
  ],
  figure: {
    alt: "Naismith kuralıyla örnek rota: 14 km yatay mesafe 2 saat 48 dakika, 900 metre tırmanış 1 saat 30 dakika, toplam 4 saat 18 dakika; yaklaşık 40 dakika molayla 4 saat 58 dakika; iniş düzeltmesiyle 4 saat 28 dakika ile 5 saat 28 dakika arası.",
    caption: "Yatay mesafe ve yükselti ayrı ayrı süreye çevrilir, sonra toplanır. Molalar ve iniş düzeltmesi ayrıca eklenir. Örnek: 14 km, toplam 900 m tırmanış ve 900 m iniş.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Naismith kuralı: 14 km, 900 m tırmanış</text>
  <polyline points="40,250 160,250 300,120 360,110 520,230 680,250" class="sp sw" fill="none"/>
  <line x1="40" y1="260" x2="680" y2="260" class="sb dash" fill="none"/>
  <text x="300" y="104" class="sm mid">zirve +900 m</text>
  <text x="360" y="282" class="sm mid t2">yatay mesafe 14 km</text>
  <rect x="40" y="300" width="314" height="40" class="ps"/><text x="197" y="325" class="mid b">14 ÷ 5 = 2 sa 48 dk</text>
  <rect x="354" y="300" width="168" height="40" class="p"/><text x="438" y="325" class="mid b sf">900 ÷ 600 = 1 sa 30 dk</text>
  <rect x="522" y="300" width="158" height="40" class="oks"/><text x="601" y="325" class="mid b">= 4 sa 18 dk</text>
  <text x="40" y="372" class="sm">+ mola (saat başı ~10 dk) ≈ 40 dk · iniş düzeltmesi −30 ile +30 dk · planlanan: yaklaşık 4,5–5,5 saat</text>
</svg>`
  },
  sections: [
    {
      h: "Naismith kuralı nedir?",
      p: [
        "Naismith kuralı, İskoç dağcı William W. Naismith'in 1892'de önerdiği, dağ yürüyüşü süresini tahmin etmeye yarayan basit bir hesaptır. Orijinal hâli \"düz yolda saatte 3 mil ve her 2.000 fit tırmanış için yarım saat değil, bir saat ekle\" şeklindedir. Metrik sistemde bu, düz yolda saatte 5 km ve her 600 m tırmanış için 1 saat olarak yuvarlanır.",
        "Kuralın gücü sadeliğindedir: bir haritadan ya da rota planlama uygulamasından mesafeyi ve toplam tırmanışı okuyarak birkaç saniyede süre tahmini yapabilirsiniz. Bu yüzden dağ yürüyüşü kulüplerinde, kamp planlamasında ve rehberli turlarda hâlâ başlangıç noktası olarak kullanılır. Ancak kural formda, hafif yükle ve iyi bir patikada yürüyen bir yetişkini varsayar; diğer koşullar için düzeltme gerekir."
      ],
      formula: "Süre (saat) = mesafe (km) ÷ 5 + toplam tırmanış (m) ÷ 600\nDakika olarak: süre = mesafe × 12 + tırmanış × 0,1\nÖrnek: 14 × 12 + 900 × 0,1 = 168 + 90 = 258 dk"
    },
    {
      h: "Düz yolda saatte kaç km yürünür?",
      p: [
        "Naismith'in saatte 5 km varsayımı, düz ve iyi bir patikada sırt çantasıyla tempolu yürüyen bir yürüyüşçü içindir. Şehirde kaldırımda yürüyen bir yetişkin genellikle saatte 4,5–5,5 km hızla yürür; ormanlık, taşlı ya da köklü bir patikada bu hız saatte 3–4 km'ye düşebilir. Kar, çamur, kum ve yoğun bitki örtüsü hızı daha da azaltır."
      ],
      table: {
        head: ["Zemin ve koşul", "Yaklaşık yatay hız", "1 km için süre"],
        rows: [
          ["İyi stabilize yol, hafif yük", "5 km/sa", "12 dk"],
          ["Normal orman patikası", "4 km/sa", "15 dk"],
          ["Taşlı, köklü, dar patika", "3 km/sa", "20 dk"],
          ["Yolsuz arazi, kar ya da çamur", "2 km/sa ve altı", "30 dk ve üzeri"]
        ],
        caption: "Değerler tırmanış payı hariç yatay hızlardır; kişinin kondisyonuna göre değişir."
      },
      after: [
        "Kendi düz yol hızınızı bilmiyorsanız bir sonraki yürüyüşte düz bir bölümde süre tutun. Yürüyüş hızı ve adım sayısıyla ilgili ayrıntıları [[bilgi:1-km-kac-dakikada-yurunur-yuruyus-hizi|1 km kaç dakikada yürünür]] yazısında, mesafe ve hızdan süre hesabını [[arac:yuruyus-suresi-hesapla|Yürüyüş Süresi Hesaplama]] aracında bulabilirsiniz."
      ]
    },
    {
      h: "Her 600 metre tırmanış süreye ne kadar ekler?",
      p: [
        "Kuralın ikinci yarısı, yükseklik kazanmanın yatay yürümekten çok daha fazla enerji ve zaman gerektirdiğini hesaba katar. Her 600 m tırmanış 1 saat ekler; bu, 100 m tırmanış başına 10 dakika demektir. Saatte 5 km yatay hızla 1 saatte 5 km yol alındığı için, 600 m tırmanış süre açısından yaklaşık 5 km düz yürüyüşe eşdeğerdir. Başka bir deyişle her 1 m tırmanış, yaklaşık 8,3 m düz yürüyüş gibi düşünülebilir."
      ],
      ol: [
        "Haritadan ya da rota uygulamasından toplam yatay mesafeyi okuyun: 14 km.",
        "Toplam tırmanışı (yalnızca yukarı yönlü yükselti toplamını) bulun: 900 m. Başlangıç ile zirve arasındaki farkla toplam tırmanış aynı şey değildir; inişli çıkışlı rotalarda toplam tırmanış daha büyüktür.",
        "Yatay süre: 14 ÷ 5 = 2,8 saat = 2 saat 48 dakika.",
        "Tırmanış payı: 900 ÷ 600 = 1,5 saat = 1 saat 30 dakika.",
        "Toplam: 4 saat 18 dakika. Molalar ve iniş düzeltmesi bu süreye ayrıca eklenir."
      ],
      after: [
        "Bu hesabı mola payıyla birlikte otomatik yapmak için [[arac:tirmanis-suresi-hesapla|Tırmanış Süresi Hesaplama]] aracına parkur uzunluğunu ve toplam tırmanışı girin; araç eşdeğer düz mesafeyi ve ortalama hızı da gösterir."
      ]
    },
    {
      h: "İnişler süre hesabını nasıl etkiler?",
      p: [
        "Orijinal Naismith kuralı inişleri hesaba katmaz. Hafif eğimli inişlerde yürüyüş hızlanır, ama dik ve taşlı inişlerde dizleri korumak için yavaşlamak gerekir; bu yüzden iniş bazen düzden bile yavaş olabilir. Bu farkı hesaba katmak için yaygın olarak <strong>Langmuir düzeltmesi</strong> kullanılır."
      ],
      table: {
        head: ["İniş eğimi", "Düzeltme", "900 m iniş için"],
        rows: [
          ["5°'nin altında", "Düzeltme yok", "0 dk"],
          ["5–12° arası (yumuşak iniş)", "Her 300 m için 10 dk çıkar", "−30 dk"],
          ["12°'den dik", "Her 300 m için 10 dk ekle", "+30 dk"]
        ],
        caption: "Langmuir düzeltmesi bir yaklaşımdır; dizlerinde sorun olan, yorgun ya da çocuklu gruplarda dik inişler daha da uzun sürer."
      },
      after: [
        "Örnek rotada 900 m'lik inişin büyük kısmı dik bir patikadaysa toplam süre 4 saat 18 dakikadan 4 saat 48 dakikaya, yumuşak bir orman yolundaysa 3 saat 48 dakikaya yaklaşır. Planlamada temkinli tarafı, yani uzun süreyi esas almak daha güvenlidir. Tırmanış ve iniş hesabında kullanılan sürat ve süre ilişkisini merak ediyorsanız [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Kondisyon, sırt çantası ve grup yürüyüşü",
      p: [
        "Naismith süresi formda ve hafif yüklü bir yürüyüşçü için bir alt sınır gibidir. Ağır bir sırt çantası (ör. çok günlük kamp ekipmanı), yükseklik, sıcak hava ve yorgunluk süreyi uzatır. Bu etkileri hesaba katmak için geliştirilen yöntemlerden biri olan Tranter düzeltmeleri, kişinin kondisyonuna göre Naismith süresini artırır; az antrenmanlı biri için süre belirgin biçimde uzar.",
        "Grup yürüyüşünde süreyi grubun ortalaması değil, <strong>en yavaş üyesi</strong> belirler. Ayrıca grup büyüdükçe molalar, fotoğraf durakları ve dar geçitlerde bekleme süreleri artar. Pratik bir yaklaşım, Naismith süresine bireysel yürüyüşte %10–20, kalabalık ya da çocuklu gruplarda %25–50 pay eklemektir."
      ],
      ul: [
        "Her saat başı 5–10 dakikalık kısa mola, uzun bir öğle molası ise 30–45 dakika ekler.",
        "2.500 m'nin üzerindeki rakımlarda hız düşer ve yükseklik hastalığı riski ortaya çıkar; tırmanış hızını buna göre ayarlayın.",
        "Planı en yavaş katılımcıya göre yapın, en yavaş kişiyi grubun önüne yakın yürütün ve kimseyi geride yalnız bırakmayın."
      ]
    },
    {
      h: "Yürüyüşte ne kadar su ve yiyecek götürülmeli? Kalori hesabı",
      p: [
        "Su ihtiyacı sıcaklığa, tempoya, kişinin vücut ağırlığına ve terleme miktarına göre çok değişir. Ilıman havada yürüyüş saatinde yaklaşık 0,4–0,8 litre su yaygın bir başlangıç tahminidir; sıcak ve güneşli günlerde ve dik tırmanışlarda ihtiyaç artar. Rotada güvenilir su kaynağı olup olmadığını önceden öğrenin ve kaynaklar arasındaki en uzun bölüm için yeterli su taşıyın.",
        "Enerji harcamasını tahmin etmek için MET (metabolik eşdeğer) yöntemi kullanılabilir: doğa yürüyüşünün MET değeri yaklaşık 6'dır, ağır çanta ve dik yokuşlarda daha yüksektir. 70 kg ağırlığında biri 4,3 saatlik bir yürüyüşte yaklaşık 70 × 6 × 4,3 ≈ 1.800 kcal harcar. Bu, gün boyunca düzenli aralıklarla yenen atıştırmalıklarla desteklenmelidir."
      ],
      formula: "Harcanan enerji (kcal) ≈ MET × kilo (kg) × süre (saat)\nÖrnek: 6 × 70 × 4,3 ≈ 1.806 kcal",
      after: [
        "Kişi sayısı, gün ve hava koşuluna göre su ve yiyecek miktarını [[arac:kamp-su-yiyecek-hesapla|Kamp Su ve Yiyecek Hesaplama]] aracıyla, harcanan enerjiyi [[arac:met-kalori-hesapla|MET Kalori Hesaplama]] aracıyla görebilirsiniz. MET yönteminin ayrıntısı [[bilgi:met-degeri-nedir-kalori-nasil-hesaplanir|MET değeri nedir]] yazısında anlatılıyor."
      ],
      note: "Su ve enerji değerleri genel tahmindir. Kronik hastalığı, kalp ya da tansiyon sorunu olanlar uzun ve yüksek rakımlı yürüyüşlerden önce hekimine danışmalıdır."
    },
    {
      h: "Gün ışığı süresine göre dönüş saati nasıl belirlenir?",
      p: [
        "Dağda en sık yaşanan sorunlardan biri, karanlığın beklenenden önce bastırmasıdır. Planı tersten kurmak bu riski azaltır: güneşin batış saatini öğrenin, bundan en az bir saat önceyi \"bitiş hedefi\" kabul edin ve toplam planlanan süreyi bu saatten geriye sayarak en geç çıkış saatini bulun."
      ],
      ol: [
        "Güneşin batış saati 17.40 olsun; bitiş hedefi 16.40'tır.",
        "Planlanan toplam süre: 4 saat 18 dakika yürüyüş + 40 dakika mola + 30 dakika iniş payı ≈ 5 saat 30 dakika.",
        "En geç çıkış saati: 16.40 − 5.30 = 11.10. Daha erken çıkmak güvenlik payını artırır.",
        "Bir de <strong>geri dönüş saati</strong> belirleyin: zirveye ya da hedef noktaya bu saatte ulaşılmadıysa yürüyüş yarıda kesilip geri dönülür.",
        "Kış aylarında gün kısalır ve hava daha hızlı soğur; aynı rota için planlanan süreye ek pay koyun."
      ],
      after: [
        "Yanınızda kafa lambası, yedek pil, katmanlı giysi ve rotanın çevrim dışı haritası bulundurun. Yürüyüşe çıkmadan önce rotayı ve dönüş saatini bir yakınınıza bildirmek, olası bir aksilikte arama kurtarma ekiplerinin işini kolaylaştırır. Acil durumda 112 aranır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Zirve farkını toplam tırmanış sanmak:</strong> İnişli çıkışlı rotada toplam tırmanış, başlangıç ile zirve arasındaki farktan büyüktür.",
        "<strong>Molaları unutmak:</strong> Naismith süresi molasızdır; saat başı 5–10 dakika eklenmelidir.",
        "<strong>Dönüşü hesaba katmamak:</strong> Gidiş-dönüş rotalarda toplam mesafe ve iniş süresi ayrıca hesaplanır.",
        "<strong>En hızlı kişiye göre planlamak:</strong> Grup süresini en yavaş üye belirler.",
        "<strong>Hava ve zemin koşulunu yok saymak:</strong> Kar, çamur ve sıcak hava hızı belirgin biçimde düşürür.",
        "<strong>Geç çıkmak:</strong> Gün ışığından geriye doğru hesaplanan en geç çıkış saatine uyun."
      ]
    }
  ],
  faq: [
    ["Naismith kuralı nedir?", "Dağ yürüyüşü süresini tahmin etmek için kullanılan basit bir hesaptır. Düz yolda saatte 5 km yürünür ve her 600 metre tırmanış için 1 saat eklenir. Süre mesafenin 5'e, tırmanışın 600'e bölünmesiyle bulunan değerlerin toplamıdır; molalar dahil değildir."],
    ["Düz yolda saatte kaç km yürünür?", "Naismith kuralı iyi bir patikada saatte 5 km varsayar. Gerçekte bu hız zemine göre değişir: normal orman patikasında saatte yaklaşık 4 km, taşlı ve köklü patikada 3 km, yolsuz arazide ya da karda 2 km ve altına düşebilir."],
    ["Her 600 metre tırmanış süreye ne kadar ekler?", "Her 600 metre tırmanış 1 saat, yani her 100 metre 10 dakika ekler. Bu, 600 metre yükselmenin süre açısından yaklaşık 5 km düz yürüyüşe eşdeğer olduğu anlamına gelir. 900 metre tırmanış 1 saat 30 dakika ekler."],
    ["İnişler süre hesabını nasıl etkiler?", "Orijinal kural inişleri hesaba katmaz. Langmuir düzeltmesine göre 5 ile 12 derece arası eğimli inişte her 300 metre için 10 dakika çıkarılır, 12 dereceden dik inişte her 300 metre için 10 dakika eklenir; 900 metre iniş bu yüzden süreyi 30 dakika azaltabilir ya da artırabilir."],
    ["Kondisyon ve sırt çantası süreyi nasıl değiştirir?", "Naismith süresi formda ve hafif yüklü bir yürüyüşçü için alt sınır gibidir. Ağır çanta, düşük kondisyon, yükseklik ve sıcak hava süreyi uzatır; bireysel yürüyüşte yüzde 10 ile 20, kalabalık ya da çocuklu gruplarda yüzde 25 ile 50 pay eklemek yaygın bir yaklaşımdır."],
    ["Grup yürüyüşünde süre nasıl planlanır?", "Grubun süresini en yavaş üyesi belirler. Naismith süresine molalar, dar geçitlerdeki beklemeler ve grup büyüklüğüne göre pay eklenir. En yavaş kişi grubun önüne yakın yürütülür, kimse geride yalnız bırakılmaz ve dönüş saatine kesinlikle uyulur."],
    ["Yürüyüşte ne kadar su ve yiyecek götürülmeli?", "Ilıman havada yürüyüş saatinde yaklaşık 0,4 ile 0,8 litre su yaygın bir başlangıç tahminidir; sıcak havada ve dik tırmanışlarda ihtiyaç artar. Rotadaki su kaynaklarını önceden öğrenin ve gün boyunca düzenli aralıklarla enerji veren atıştırmalıklar yiyin."],
    ["Dağ yürüyüşünde yakılan kalori nasıl hesaplanır?", "MET yöntemiyle yaklaşık hesaplanır: MET değeri, kilo ve saat çarpılır. Doğa yürüyüşünün MET değeri yaklaşık 6'dır; 70 kg ağırlığında biri 4,3 saatte yaklaşık 1.800 kcal harcar. Ağır çanta ve dik yokuşlar bu değeri artırır."],
    ["Gün ışığı süresine göre dönüş saati nasıl belirlenir?", "Güneşin batışından en az bir saat önceyi bitiş hedefi kabul edip toplam planlanan süreyi bu saatten geriye sayın; bu size en geç çıkış saatini verir. Ayrıca hedefe ulaşılamazsa geri dönülecek bir saat belirleyip buna uyun."],
    ["Naismith kuralı koşu ya da bisiklet için kullanılabilir mi?", "Hayır. Kural yürüyüş temposuna göre tasarlanmıştır. Patika koşusunda ve dağ bisikletinde hem yatay hız hem de tırmanış hızı çok farklıdır; bu etkinlikler için kişinin kendi tempo verilerine dayanan ayrı hesaplar kullanılmalıdır."]
  ],
  tools: ["tirmanis-suresi-hesapla", "yuruyus-suresi-hesapla", "kamp-su-yiyecek-hesapla", "met-kalori-hesapla"],
  related: ["1-km-kac-dakikada-yurunur-yuruyus-hizi", "met-degeri-nedir-kalori-nasil-hesaplanir", "hiz-yol-zaman-formulu"],
  sources: [
    ["AFAD – Doğa sporlarında güvenlik ve acil durum", "https://www.afad.gov.tr/"]
  ],
  uyari: "genel planlama bilgisidir; sağlık sorununuz varsa yürüyüşten önce hekiminize danışın, zorlu rotalarda deneyimli bir rehberle yürüyün"
};
