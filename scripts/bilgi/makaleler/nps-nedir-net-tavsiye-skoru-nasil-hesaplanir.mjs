export default {
  slug: "nps-nedir-net-tavsiye-skoru-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "NPS Nedir? Net Tavsiye Skoru Nasıl Hesaplanır ve Yorumlanır?",
  pageTitle: "NPS Nedir? Net Tavsiye Skoru Hesaplama ve Yorumlama",
  description: "NPS, 0–10 tavsiye sorusunda 9–10 verenlerin yüzdesinden 0–6 verenlerin yüzdesi çıkarılarak bulunur. 200 yanıtlı örnek, hata payı, örneklem ve CSAT farkı.",
  keywords: ["nps nedir", "net promoter score", "net tavsiye skoru", "nps hesaplama", "müşteri memnuniyeti ölçme", "nps kaç olmalı", "promoter detractor", "nps hata payı"],
  lead: "NPS (Net Promoter Score, net tavsiye skoru), müşterilere \"Bizi bir arkadaşınıza ya da meslektaşınıza tavsiye etme olasılığınız nedir?\" sorusunu 0–10 ölçeğiyle sorup, 9–10 verenlerin (destekçi) yüzdesinden 0–6 verenlerin (kötüleyen) yüzdesini çıkararak bulunan bir sadakat ölçüsüdür. Sonuç −100 ile +100 arasında değişir: 200 yanıtın 110'u destekçi, 40'ı kötüleyense NPS = %55 − %20 = 35'tir. Bu yazıda grupların ayrılmasını, hesabı, sonucun yorumlanmasını, hata payını ve kaç yanıt gerektiğini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "NPS sorusu: \"Bizi bir yakınınıza tavsiye etme olasılığınız 0'dan 10'a kadar nedir?\"",
    "9–10 veren destekçi, 7–8 veren pasif, 0–6 veren kötüleyen sayılır.",
    "NPS = destekçi yüzdesi − kötüleyen yüzdesi; pasifler hesaba girmez ama toplam yanıt sayısında yer alır.",
    "Sonuç −100 (herkes kötüleyen) ile +100 (herkes destekçi) arasında değişir ve yüzde işaretsiz yazılır.",
    "200 yanıtla bulunan NPS = 35'in yüzde 95 güven düzeyindeki hata payı yaklaşık ±11 puandır.",
    "NPS'yi ±5 puan hassasiyetle ölçmek için tipik dağılımlarda yaklaşık 1.000 yanıt gerekir."
  ],
  figure: {
    alt: "0'dan 10'a NPS ölçeği: 0–6 kötüleyen (kırmızı), 7–8 pasif (gri), 9–10 destekçi (yeşil). Altında 200 yanıtlı örnek: 110 destekçi %55, 50 pasif %25, 40 kötüleyen %20; NPS = 55 − 20 = 35.",
    caption: "NPS yalnızca uçtaki iki grubu kullanır: destekçilerin oranından kötüleyenlerin oranı çıkarılır. Pasifler skoru doğrudan etkilemez, ama payda olan toplam yanıt sayısına dahildir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">NPS ölçeği ve hesap</text>
  <g class="mid b">
    <rect x="30" y="56" width="54" height="50" rx="6" class="dgs"/><text x="57" y="88">0</text>
    <rect x="90" y="56" width="54" height="50" rx="6" class="dgs"/><text x="117" y="88">1</text>
    <rect x="150" y="56" width="54" height="50" rx="6" class="dgs"/><text x="177" y="88">2</text>
    <rect x="210" y="56" width="54" height="50" rx="6" class="dgs"/><text x="237" y="88">3</text>
    <rect x="270" y="56" width="54" height="50" rx="6" class="dgs"/><text x="297" y="88">4</text>
    <rect x="330" y="56" width="54" height="50" rx="6" class="dgs"/><text x="357" y="88">5</text>
    <rect x="390" y="56" width="54" height="50" rx="6" class="dgs"/><text x="417" y="88">6</text>
    <rect x="450" y="56" width="54" height="50" rx="6" class="sf sb"/><text x="477" y="88">7</text>
    <rect x="510" y="56" width="54" height="50" rx="6" class="sf sb"/><text x="537" y="88">8</text>
    <rect x="570" y="56" width="54" height="50" rx="6" class="oks"/><text x="597" y="88">9</text>
    <rect x="630" y="56" width="60" height="50" rx="6" class="oks"/><text x="660" y="88">10</text>
  </g>
  <g class="sm mid b">
    <text x="237" y="128" class="dg">Kötüleyen (0–6)</text>
    <text x="507" y="128" class="mu">Pasif (7–8)</text>
    <text x="630" y="128" class="ok">Destekçi (9–10)</text>
  </g>
  <text x="30" y="170" class="b">Örnek: 200 yanıt</text>
  <rect x="30" y="186" width="363" height="40" class="ok"/>
  <rect x="393" y="186" width="165" height="40" class="sf sb"/>
  <rect x="558" y="186" width="132" height="40" class="dg"/>
  <text x="211" y="211" class="mid b sf">110 destekçi · %55</text>
  <text x="475" y="211" class="mid b">50 pasif · %25</text>
  <text x="624" y="211" class="mid b sf">40 · %20</text>
  <rect x="30" y="250" width="660" height="70" rx="10" class="p"/>
  <text x="360" y="280" class="mid sf">NPS = destekçi % − kötüleyen %</text>
  <text x="360" y="306" class="mid sf b lg">NPS = 55 − 20 = 35</text>
  <line x1="60" y1="358" x2="660" y2="358" class="sb sw" fill="none"/>
  <text x="60" y="384" class="sm mid">−100</text><text x="360" y="384" class="sm mid">0</text><text x="660" y="384" class="sm mid">+100</text>
  <circle cx="465" cy="358" r="9" class="p"/>
  <text x="465" y="344" class="sm mid b">35</text>
</svg>`
  },
  sections: [
    {
      h: "NPS nedir, hangi soruyla ölçülür?",
      p: [
        "NPS, bir işletmenin müşterilerinin ne kadarının markayı başkalarına önermeye istekli olduğunu tek bir sayıyla özetleyen bir sadakat göstergesidir. 2000'lerin başında yayımlanan bir yönetim makalesiyle yaygınlaştı ve bugün e-ticaretten bankacılığa, hastanelerden yazılım şirketlerine kadar pek çok sektörde kullanılıyor.",
        "Ölçüm tek bir soruya dayanır: \"[İşletme ya da ürün adı]'nı bir arkadaşınıza ya da meslektaşınıza tavsiye etme olasılığınız 0'dan 10'a kadar nedir?\" 0 \"kesinlikle tavsiye etmem\", 10 \"kesinlikle tavsiye ederim\" anlamına gelir. Sorunun hemen ardından açık uçlu bir \"Bu puanı vermenizin ana nedeni nedir?\" sorusu eklemek, sayının arkasındaki sebebi anlamak için çok değerlidir."
      ]
    },
    {
      h: "Destekçi, pasif ve kötüleyen grupları",
      p: [
        "Yanıtlar üç gruba ayrılır. Bu sınırlar yöntemin parçasıdır ve sonuçların karşılaştırılabilir olması için değiştirilmemelidir."
      ],
      table: {
        head: ["Puan", "Grup", "Davranış eğilimi"],
        rows: [
          ["9–10", "Destekçi (promoter)", "Tekrar satın alır, başkalarına önerir"],
          ["7–8", "Pasif (passive)", "Memnun ama bağlı değil; rakibe kolay geçebilir"],
          ["0–6", "Kötüleyen (detractor)", "Memnun değil; olumsuz yorum yayabilir"]
        ]
      },
      after: [
        "0–6 aralığının bu kadar geniş olması ilk bakışta sert görünebilir. Yöntemin varsayımı, 6 ve altı puan veren müşterilerin markayı aktif olarak önermeyeceği, bir kısmının da olumsuz deneyimini paylaşacağıdır. Pasiflerin skoru doğrudan etkilememesi ise \"memnun ama sadık değil\" durumunu yansıtır."
      ]
    },
    {
      h: "NPS formülü nasıl uygulanır?",
      p: [
        "Hesap üç adımdır: grupların sayısını bulun, her grubun toplam yanıt içindeki yüzdesini hesaplayın ve destekçi yüzdesinden kötüleyen yüzdesini çıkarın. Sonuç yüzde işareti olmadan, bir puan olarak yazılır."
      ],
      formula: "Destekçi % = destekçi sayısı ÷ toplam yanıt × 100\nKötüleyen % = kötüleyen sayısı ÷ toplam yanıt × 100\nNPS = destekçi % − kötüleyen %",
      ol: [
        "Bir e-ticaret mağazası 200 yanıt topladı: 110 kişi 9–10, 50 kişi 7–8, 40 kişi 0–6 verdi.",
        "Destekçi yüzdesi: 110 ÷ 200 = %55.",
        "Kötüleyen yüzdesi: 40 ÷ 200 = %20.",
        "Pasifler (%25) payda olan 200'ün içinde kalır ama çıkarmaya girmez.",
        "NPS = 55 − 20 = 35."
      ],
      after: [
        "Yüzde hesaplarını [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracının \"A, B'nin yüzde kaçı\" bölümüyle hızlıca yapabilirsiniz. Ortalama puan (örneğin 7,9) NPS'nin yerini tutmaz; aynı ortalamaya çok farklı dağılımlarla ulaşılabilir. Ortalamanın neden yanıltıcı olabileceğini [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazısında okuyabilirsiniz."
      ]
    },
    {
      h: "NPS neden −100 ile +100 arasında değişir?",
      p: [
        "İki yüzdenin farkı olduğu için NPS'nin sınırları kendiliğinden belirlenir. Bütün müşteriler 9–10 verirse destekçi oranı %100, kötüleyen oranı %0 olur ve NPS +100 çıkar. Herkes 0–6 verirse sonuç −100'dür. Herkes 7–8 verirse, yani bütün müşteriler pasifse, NPS 0 olur.",
        "Sıfırın üzerindeki bir NPS destekçilerin kötüleyenlerden fazla olduğunu, sıfırın altı ise tersini gösterir. NPS'nin bir yüzde değil puan olarak ifade edilmesinin nedeni de budur: \"NPS %35\" demek yerine \"NPS 35\" yazılır. İki dönem arasındaki değişim de puanla anlatılır; 35'ten 42'ye çıkış \"7 puanlık artış\"tır, \"%20 artış\" değil. Bu ayrım [[bilgi:yuzde-puan-ve-yuzde-degisim-farki|yüzde puan ve yüzde değişim farkı]] yazısında ayrıntılı anlatılıyor."
      ]
    },
    {
      h: "İyi bir NPS kaç olmalıdır?",
      p: [
        "Evrensel bir \"iyi NPS\" değeri yoktur; sonuç sektöre, ülkeye, müşteri tipine ve anketin ne zaman yapıldığına göre büyük farklar gösterir. Yine de uygulamada sık kullanılan kaba bir okuma şöyledir: sıfırın üzeri destekçilerin ağır bastığını, 30 civarı ve üzeri iyi, 50 ve üzeri çok iyi, 70 ve üzeri ise olağanüstü bir sadakati gösterir. Bu eşikler yalnızca yön verir, standart değildir.",
        "En anlamlı karşılaştırma işletmenin kendi geçmişiyle yapılandır. Aynı soru, aynı kanal ve aynı müşteri kitlesiyle düzenli ölçülen NPS'nin yönü, tek seferlik bir değerden çok daha fazla şey söyler. Sektör kıyaslaması yapılacaksa ölçüm yöntemi ve örneklem özelliklerinin benzer olduğundan emin olun."
      ]
    },
    {
      h: "Kaç yanıt toplanırsa sonuç güvenilir olur?",
      p: [
        "NPS bir örneklemden hesaplanan tahmindir; az yanıtla bulunan değer gerçek değerden epey sapabilir. Gerekli yanıt sayısı, istediğiniz hassasiyete ve yanıtların dağılımına bağlıdır. NPS'nin varyansı yaklaşık olarak p<sub>d</sub> + p<sub>k</sub> − (p<sub>d</sub> − p<sub>k</sub>)² formülüyle bulunur; burada p<sub>d</sub> destekçi, p<sub>k</sub> kötüleyen oranıdır."
      ],
      formula: "Varyans ≈ p_d + p_k − (p_d − p_k)²\nÖrnek: 0,55 + 0,20 − 0,35² = 0,6275\nGerekli yanıt (95% güven) ≈ 1,96² × varyans ÷ E²\n±5 puan (E = 0,05): 3,8416 × 0,6275 ÷ 0,0025 ≈ 964 yanıt\n±10 puan (E = 0,10): ≈ 241 yanıt",
      after: [
        "Yani bu dağılımda NPS'yi ±10 puan içinde ölçmek için yaklaşık 240, ±5 puan için yaklaşık 960 yanıt gerekir. Küçük bir işletme için ±10 puan çoğu zaman yeterli bir başlangıçtır. Genel anketler için gereken katılımcı sayısını [[arac:orneklem-buyuklugu-hesapla|Örneklem Büyüklüğü Hesaplama]] aracıyla bulabilirsiniz; ancak bu araç tek bir oran için hesap yapar, NPS iki oranın farkı olduğu için yukarıdaki varyans formülü daha doğru sonuç verir."
      ]
    },
    {
      h: "Hata payı NPS sonucunu nasıl etkiler?",
      p: [
        "Hata payı, bulunan NPS'nin gerçek değerin etrafında ne kadar oynayabileceğini gösterir. 200 yanıtlı örnekte standart hata √(0,6275 ÷ 200) ≈ 0,056, yani 5,6 puandır. Yüzde 95 güven düzeyinde hata payı 1,96 × 5,6 ≈ 11 puan eder: gerçek NPS büyük olasılıkla 24 ile 46 arasındadır."
      ],
      table: {
        head: ["Yanıt sayısı", "Hata payı (95%, bu dağılım)", "NPS = 35 için aralık"],
        rows: [
          ["40", "±24,5", "yaklaşık 10 – 60"],
          ["100", "±15,5", "yaklaşık 20 – 50"],
          ["200", "±11,0", "yaklaşık 24 – 46"],
          ["400", "±7,8", "yaklaşık 27 – 43"],
          ["1.000", "±4,9", "yaklaşık 30 – 40"]
        ],
        caption: "Değerler destekçi %55, kötüleyen %20 dağılımı için hesaplanmıştır; farklı dağılımlarda hata payı biraz değişir."
      },
      after: [
        "Bu tablo önemli bir uyarı içerir: 100 yanıtla ölçülen NPS'nin bir aydan diğerine 35'ten 42'ye çıkması, gerçek bir iyileşme değil yalnızca rastlantısal dalgalanma olabilir. Değişimi yorumlamadan önce hata payını hesaba katın. Tek bir oran için hata payını [[arac:hata-payi-hesapla|Hata Payı Hesaplama]] aracıyla görebilir, kavramın ayrıntısını [[bilgi:guven-araligi-hata-payi-ve-orneklem|güven aralığı ve hata payı]] yazısında okuyabilirsiniz."
      ]
    },
    {
      h: "NPS ile müşteri memnuniyeti (CSAT) farkı",
      p: [
        "CSAT (müşteri memnuniyeti skoru), genellikle belirli bir etkileşimden hemen sonra sorulan \"Bu hizmetten ne kadar memnun kaldınız?\" sorusuna 1–5 ölçeğinde verilen cevaplardan hesaplanır; çoğunlukla 4 ve 5 verenlerin yüzdesi olarak raporlanır. 200 yanıtın 150'si 4–5 verdiyse CSAT %75'tir.",
        "İki ölçüt farklı şeyleri ölçer. CSAT anlık bir deneyimi (bir destek görüşmesi, bir teslimat) değerlendirir; NPS ise markayla genel ilişkiyi ve sadakati ölçer. Bir müşteri son kargo deneyiminden memnun olup (yüksek CSAT) markayı yine de önermeyebilir (düşük NPS). İyi bir ölçüm sistemi ikisini birlikte kullanır: CSAT sorunlu temas noktalarını, NPS genel eğilimi gösterir."
      ],
      table: {
        head: ["Özellik", "NPS", "CSAT"],
        rows: [
          ["Soru", "Tavsiye etme olasılığı", "Memnuniyet düzeyi"],
          ["Ölçek", "0–10", "Çoğunlukla 1–5"],
          ["Hesap", "Destekçi % − kötüleyen %", "4–5 verenlerin yüzdesi"],
          ["Aralık", "−100 ile +100", "%0 ile %100"],
          ["Ne ölçer", "Genel sadakat", "Belirli bir deneyim"]
        ]
      }
    },
    {
      h: "Küçük işletmeler NPS anketini nasıl yapar?",
      ol: [
        "<strong>Zamanı seçin:</strong> e-ticarette ürün teslim edildikten birkaç gün sonra, hizmet işletmelerinde hizmet tamamlandıktan sonra sorun.",
        "<strong>Kısa tutun:</strong> tavsiye sorusu ve bir açık uçlu neden sorusu yeterlidir; uzun anketler yanıt oranını düşürür.",
        "<strong>Kanalı tutarlı tutun:</strong> e-posta, mesaj ya da QR kodlu kart; dönemden döneme kanalı değiştirmek sonuçları karşılaştırılamaz kılar.",
        "<strong>Herkese sorun:</strong> yalnızca memnun görünen müşterilere sormak skoru yapay olarak yükseltir.",
        "<strong>Kişisel verileri koruyun:</strong> yanıtları isimsiz değerlendirin, iletişim bilgilerini yalnızca müşterinin izniyle ve amacına uygun kullanın.",
        "<strong>Döngüyü kapatın:</strong> kötüleyenlere ulaşıp sorunu çözmeye çalışın; destekçilere yorum bırakmalarını rica edin."
      ],
      after: [
        "Açık uçlu yanıtlardaki ortak temaları görmek için yorumları [[arac:kelime-bulutu|Kelime Bulutu Oluşturucu]]ya yapıştırabilirsiniz; en sık geçen kelimeler sorunun nerede olduğunu hızla gösterir. Puanların ortalaması ve dağılımı için [[arac:ortalama-hesapla|Ortalama Hesaplama]] aracı da kullanılabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Pasifleri paydadan çıkarmak:</strong> yüzdeler toplam yanıt sayısına göre hesaplanmalıdır.",
        "<strong>NPS'yi yüzde gibi yazmak:</strong> NPS bir puandır; değişim de puanla ifade edilir.",
        "<strong>Az yanıtla kesin sonuç çıkarmak:</strong> 50 yanıtla bulunan NPS'nin hata payı ±20 puanı aşabilir.",
        "<strong>Ortalama puanı NPS sanmak:</strong> ortalama 8 olan bir ankette NPS 0 da olabilir, 40 da.",
        "<strong>Neden sorusunu atlamak:</strong> sayı ne olduğunu, açık uçlu cevap neden olduğunu söyler.",
        "<strong>Skoru çalışan primine bağlamak:</strong> müşteriden yüksek puan istenmesine ve verinin bozulmasına yol açar."
      ]
    }
  ],
  faq: [
    ["NPS nedir, hangi soruyla ölçülür?", "NPS, müşterilerin markayı başkalarına önerme isteğini ölçen bir sadakat göstergesidir. \"Bizi bir arkadaşınıza ya da meslektaşınıza tavsiye etme olasılığınız 0'dan 10'a kadar nedir?\" sorusuyla ölçülür ve ardından puanın nedeni açık uçlu olarak sorulur."],
    ["Destekçi, pasif ve kötüleyen grupları nasıl ayrılır?", "9 veya 10 puan verenler destekçi, 7 veya 8 verenler pasif, 0 ile 6 arasında puan verenler kötüleyen sayılır. Bu sınırlar yöntemin parçasıdır ve sonuçların karşılaştırılabilir olması için değiştirilmemelidir."],
    ["NPS formülü nasıl uygulanır?", "Destekçilerin toplam yanıt içindeki yüzdesinden kötüleyenlerin yüzdesi çıkarılır. 200 yanıtın 110'u destekçi ve 40'ı kötüleyense NPS = %55 − %20 = 35 olur; pasifler paydada kalır ama çıkarmaya girmez."],
    ["NPS -100 ile +100 arasında neden değişir?", "İki yüzdenin farkı olduğu için. Herkes destekçiyse sonuç +100, herkes kötüleyense −100, herkes pasifse 0 olur. Bu yüzden NPS yüzde işareti olmadan bir puan olarak yazılır."],
    ["İyi bir NPS kaç olmalıdır?", "Evrensel bir değer yoktur; sektör ve müşteri kitlesine göre değişir. Uygulamada sıfırın üzeri olumlu, 30 civarı iyi, 50 üzeri çok iyi, 70 üzeri olağanüstü diye okunur; en anlamlı karşılaştırma işletmenin kendi geçmiş ölçümleriyledir."],
    ["Kaç yanıt toplanırsa sonuç güvenilir olur?", "İstenen hassasiyete bağlıdır. Destekçi %55, kötüleyen %20 dağılımında NPS'yi ±10 puan içinde ölçmek için yaklaşık 240, ±5 puan için yaklaşık 960 yanıt gerekir. Küçük işletmeler için ±10 puan iyi bir başlangıçtır."],
    ["Hata payı NPS sonucunu nasıl etkiler?", "Hata payı gerçek NPS'nin bulunan değerin etrafında ne kadar oynayabileceğini gösterir. 200 yanıtla bulunan 35'lik NPS'nin yüzde 95 güvenle hata payı yaklaşık ±11 puandır; gerçek değer büyük olasılıkla 24 ile 46 arasındadır."],
    ["NPS ile müşteri memnuniyeti (CSAT) farkı nedir?", "CSAT belirli bir deneyimden duyulan memnuniyeti 1–5 ölçeğinde ölçer ve 4–5 verenlerin yüzdesiyle raporlanır. NPS ise markayla genel ilişkiyi ve tavsiye isteğini 0–10 ölçeğinde ölçer; ikisi birlikte kullanıldığında daha bütünlüklü bilgi verir."],
    ["Küçük işletmeler NPS anketini nasıl yapar?", "Hizmet ya da teslimattan kısa süre sonra, tavsiye sorusu ve tek bir neden sorusundan oluşan kısa bir anket gönderilir. Kanal her dönem aynı tutulur, tüm müşterilere sorulur, kişisel veriler korunur ve kötüleyenlere geri dönülerek sorun çözülmeye çalışılır."]
  ],
  tools: ["yuzde-hesapla", "orneklem-buyuklugu-hesapla", "hata-payi-hesapla", "ortalama-hesapla", "kelime-bulutu"],
  related: ["guven-araligi-hata-payi-ve-orneklem", "yuzde-puan-ve-yuzde-degisim-farki", "ortalama-medyan-mod-nedir", "kelime-bulutu-nedir-nasil-yapilir"]
};
