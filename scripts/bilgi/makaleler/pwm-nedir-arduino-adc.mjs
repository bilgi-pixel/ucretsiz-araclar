export default {
  slug: "pwm-nedir-arduino-adc",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "PWM Nedir? Görev Döngüsü, 555 Zamanlayıcı ve Geliştirme Kartında ADC Çözünürlüğü",
  pageTitle: "PWM Nedir? Görev Döngüsü, 555 ve ADC Çözünürlüğü",
  description: "PWM nedir, görev döngüsü nasıl hesaplanır? LED ve motor kontrolü, PWM frekansı, 555 ile PWM üretimi, 10 bit ADC adım gerilimi ve geliştirme kartı örnekleri.",
  keywords: ["pwm nedir", "görev döngüsü nedir", "duty cycle", "geliştirme kartı pwm", "adc çözünürlüğü", "10 bit adc", "555 zamanlayıcı", "pwm frekansı", "motor hız kontrolü pwm"],
  lead: "PWM (darbe genişlik modülasyonu), <strong>bir sinyali çok hızlı açıp kapatarak ve açık kalma süresinin oranını değiştirerek</strong> yüke giden ortalama gücü ayarlama yöntemidir. Bu orana görev döngüsü denir: 5 V'luk bir sinyal periyodun %25'inde açıksa ortalama gerilim 1,25 V olur. LED parlaklığı, motor hızı ve ısıtıcı gücü bu yolla kontrol edilir. Ters yöndeki işi, yani analog gerilimi sayıya çevirmeyi ADC yapar: 5 V referanslı 10 bitlik bir ADC'de bir adım yaklaşık 4,88 mV'tur. Bu yazıda formülleri, 555 entegresiyle PWM üretimini ve geliştirme kartı örneklerini çözümlü anlatıyoruz.",
  kisaCevap: [
    "Görev döngüsü (%) = açık süre ÷ periyot × 100; periyot = 1 ÷ frekans.",
    "İdeal kare dalgada ortalama gerilim = tepe gerilimi × görev döngüsü; 5 V ve %25 için 1,25 V.",
    "8 bitlik PWM'de karşılaştırma değeri 0–255 arasıdır; %25 görev döngüsü için yaklaşık 64.",
    "ADC adım gerilimi (1 LSB) = referans gerilimi ÷ 2ⁿ; 5 V ve 10 bit için 5 ÷ 1.024 ≈ 4,88 mV.",
    "Sayısal kod = giriş gerilimi ÷ adım gerilimi (aşağı yuvarlanır); 10 bit, 5 V referansta 2,5 V → 512.",
    "555 kararsız devrede f ≈ 1,44 ÷ ((R1 + 2 × R2) × C); görev döngüsü standart bağlantıda %50'nin üzerindedir."
  ],
  figure: {
    alt: "Üç PWM sinyali: yüzde 25, 50 ve 75 görev döngüsü, 1 ms periyot, 5 V tepe; ortalama gerilimler 1,25 V, 2,5 V ve 3,75 V. Altta 10 bitlik ADC basamakları ve 2,5 V girişin 512 koduna dönüşmesi.",
    caption: "Periyot aynı (1 ms, 1 kHz) kalırken açık süre uzadıkça ortalama gerilim artar. Alt bölümde 5 V referanslı 10 bitlik ADC her 4,88 mV'u bir adım sayar; 2,5 V giriş 512 kodunu verir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">PWM görev döngüsü ve ortalama gerilim</text>
  <g>
    <text x="20" y="66" class="b">%25</text>
    <polyline points="70,80 70,50 120,50 120,80 270,80 270,50 320,50 320,80 470,80 470,50 520,50 520,80 560,80" class="sp sw" fill="none"/>
    <line x1="70" y1="72.5" x2="560" y2="72.5" class="sa dash" fill="none"/>
    <text x="580" y="70" class="sm b">ort. 1,25 V</text>
    <text x="20" y="136" class="b">%50</text>
    <polyline points="70,150 70,120 170,120 170,150 270,150 270,120 370,120 370,150 470,150 470,120 570,120 570,150" class="sp sw" fill="none"/>
    <line x1="70" y1="135" x2="560" y2="135" class="sa dash" fill="none"/>
    <text x="580" y="140" class="sm b">ort. 2,5 V</text>
    <text x="20" y="206" class="b">%75</text>
    <polyline points="70,220 70,190 220,190 220,220 270,220 270,190 420,190 420,220 470,220 470,190 560,190" class="sp sw" fill="none"/>
    <line x1="70" y1="197.5" x2="560" y2="197.5" class="sa dash" fill="none"/>
    <text x="580" y="210" class="sm b">ort. 3,75 V</text>
    <line x1="70" y1="234" x2="270" y2="234" class="st" fill="none"/>
    <text x="170" y="250" class="sm mid">periyot T = 1 ms (1 kHz)</text>
    <text x="400" y="250" class="sm t2">tepe 5 V · kesikli çizgi: ortalama</text>
  </g>
  <rect x="20" y="268" width="680" height="160" rx="12" class="sf sb"/>
  <text x="40" y="294" class="b">10 bit ADC, 5 V referans</text>
  <polyline points="40,410 70,410 70,395 100,395 100,380 130,380 130,365 160,365 160,350 190,350 190,335 220,335 220,320" class="sok sw" fill="none"/>
  <text x="40" y="330" class="sm t2">her basamak</text>
  <text x="40" y="346" class="sm t2">= 1 LSB</text>
  <text x="260" y="324">1 LSB = 5 ÷ 1.024 = <tspan class="b p">4,88 mV</tspan></text>
  <text x="260" y="350">Seviye sayısı: 2<tspan class="sm">10</tspan> = 1.024 (kod 0 … 1.023)</text>
  <text x="260" y="376">2,5 V ÷ 4,88 mV = <tspan class="b p">kod 512</tspan></text>
  <text x="260" y="402" class="sm t2">Kod → gerilim: 512 × 5 ÷ 1.024 = 2,5 V</text>
</svg>`
  },
  sections: [
    {
      h: "PWM nedir, nasıl çalışır?",
      p: [
        "PWM, İngilizce <em>Pulse Width Modulation</em> (darbe genişlik modülasyonu) ifadesinin kısaltmasıdır. Dijital bir çıkış yalnızca iki durumda olabilir: açık (örneğin 5 V) ya da kapalı (0 V). Ara bir gerilim üretemeyen bu çıkış, saniyede yüzlerce ya da binlerce kez açılıp kapatılır. Açık kalma süresi uzadıkça yüke giden ortalama enerji artar, kısaldıkça azalır.",
        "Yük bu hızlı değişime tek tek tepki veremeyecek kadar \"yavaş\"sa, yani bir LED'in ışığını gözümüz, bir motorun dönüşünü rotorun ataleti ortalarsa, sonuç sanki ara bir gerilim uygulanmış gibidir. PWM'nin en büyük avantajı verimliliktir: anahtarlama elemanı ya tam açık ya tam kapalı olduğu için üzerinde az güç harcanır. Gerilimi direnç ya da doğrusal düzenleyiciyle düşürmek ise aradaki farkı ısı olarak harcar."
      ]
    },
    {
      h: "Görev döngüsü (duty cycle) nasıl hesaplanır?",
      p: [
        "Bir PWM sinyalinin iki temel parametresi vardır: <strong>frekans</strong> (saniyedeki periyot sayısı) ve <strong>görev döngüsü</strong> (bir periyot içinde sinyalin açık kaldığı sürenin oranı). Periyot frekansın tersidir; 1 kHz'lik bir sinyalin periyodu 1 ms'dir."
      ],
      formula: "Periyot T = 1 ÷ f\nGörev döngüsü D (%) = açık süre ÷ T × 100\nOrtalama gerilim = V_tepe × D\nEtkin (RMS) gerilim = V_tepe × √D\nn bit sayaç değeri ≈ D × (2ⁿ − 1)",
      ol: [
        "Frekans 1 kHz, görev döngüsü %25, tepe gerilimi 5 V olsun.",
        "Periyot: 1 ÷ 1.000 = 1 ms. Açık süre: 0,25 × 1 ms = 0,25 ms; kapalı süre 0,75 ms.",
        "Ortalama gerilim: 5 × 0,25 = 1,25 V.",
        "Etkin (RMS) gerilim: 5 × √0,25 = 2,5 V. Dirençli bir ısıtıcıda güç oranı görev döngüsüne, yani %25'e eşittir.",
        "8 bitlik sayaçta karşılaştırma değeri: 0,25 × 255 = 63,75 → 64. Gerçekleşen görev döngüsü 64 ÷ 255 = %25,1 olur."
      ],
      after: [
        "Ortalama gerilim ile etkin gerilim farklıdır: ortalama, motor ve LED gibi yüklerin \"hissettiği\" ortalama değeri; etkin gerilim ise dirençli yükte aynı ısıyı üreten doğru gerilimi anlatır. Bu hesapları [[arac:pwm-gorev-dongusu-hesapla|PWM Görev Döngüsü Hesaplama]] aracıyla yapabilirsiniz. Güç, gerilim ve akım ilişkisi için [[bilgi:watt-amper-volt-iliskisi|watt, amper, volt ilişkisi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Geliştirme kartında PWM ile LED parlaklığı nasıl ayarlanır?",
      p: [
        "Hobi elektroniğinde yaygın kullanılan mikrodenetleyicili geliştirme kartlarının bazı dijital pinleri donanımsal PWM üretebilir. Birçok kartta yazılımın PWM komutu 8 bit çözünürlükle çalışır: 0 tamamen kapalı, 255 tamamen açık anlamına gelir. 128 değeri yaklaşık %50, 64 değeri yaklaşık %25 görev döngüsü verir. Bu pinlerdeki PWM frekansı karta göre değişir ve genellikle birkaç yüz hertz ile birkaç kilohertz arasındadır; kesin değeri kartınızın belgelerinden kontrol edin.",
        "LED'i PWM pinine mutlaka seri bir akım sınırlama direnciyle bağlayın; direnç değeri PWM'den bağımsız olarak LED'in tam açık durumdaki akımına göre seçilir. Hesap yöntemi [[bilgi:led-direnci-nasil-hesaplanir|LED direnci nasıl hesaplanır]] yazısında anlatılır. Gözümüz ışığı doğrusal algılamadığı için 0–255 arasında eşit adımlarla artırılan parlaklık başta hızlı, sonra yavaş artıyormuş gibi görünür; yumuşak bir geçiş için düşük değerlerde küçük, yüksek değerlerde büyük adımlar kullanılır (gama düzeltmesi)."
      ],
      table: {
        head: ["Sayaç değeri (8 bit)", "Görev döngüsü", "Ortalama gerilim (5 V)", "Algılanan etki"],
        rows: [
          ["0", "%0", "0 V", "LED sönük"],
          ["32", "%12,5", "0,63 V", "Belirgin ama loş"],
          ["64", "%25,1", "1,25 V", "Orta-loş"],
          ["128", "%50,2", "2,51 V", "Göze %50'den parlak görünür"],
          ["255", "%100", "5 V", "Tam parlak"]
        ],
        caption: "LED'in ileri gerilimi nedeniyle LED üzerindeki gerilim bu ortalamadan farklıdır; tablo PWM çıkışının ortalamasını gösterir."
      }
    },
    {
      h: "PWM frekansı neden önemlidir?",
      p: [
        "Görev döngüsü ne kadar güç verileceğini, frekans ise bu gücün ne kadar \"düzgün\" verileceğini belirler. Frekans çok düşükse yük açılıp kapanmayı izlemeye başlar: LED titrer, motor sarsılarak döner. Frekans çok yüksekse anahtarlama kayıpları artar, transistör ısınır ve sinyal kenarları bozulabilir. Doğru frekans uygulamaya göre seçilir."
      ],
      ul: [
        "<strong>LED parlaklığı:</strong> Göz titremesini önlemek için genellikle birkaç yüz hertz ve üzeri yeterlidir; kamera kayıtlarında titreme görünmemesi için daha yüksek frekans tercih edilir.",
        "<strong>Küçük DC motorlar:</strong> Düşük frekanslar (yüzlerce hertz) motorda duyulabilir bir vızıltı yaratır; insan kulağının duyma sınırının üzerindeki frekanslar (yaklaşık 20 kHz üstü) sessiz çalışma sağlar.",
        "<strong>Servo motorlar:</strong> Görev döngüsü değil, darbe genişliği önemlidir; çoğu standart servo yaklaşık 50 Hz'lik (20 ms) periyotta 1–2 ms'lik darbelerle konum alır.",
        "<strong>Güç elektroniği:</strong> Gerilim dönüştürücüler onlarca kilohertz ile megahertz düzeyinde çalışır; frekans arttıkça bobin ve kondansatör küçülür."
      ],
      after: [
        "Mikrodenetleyicilerde frekans ile çözünürlük arasında bir denge vardır: sayaç saati sabitken frekansı artırmak sayacın daha erken sıfırlanması, yani daha az basamak (düşük çözünürlük) demektir. 16 MHz saatle 8 bitlik sayaç en fazla 16.000.000 ÷ 256 = 62,5 kHz frekansa ulaşır."
      ]
    },
    {
      h: "Motor hız kontrolünde PWM nasıl kullanılır?",
      p: [
        "DC motorun hızı, uygulanan ortalama gerilimle yaklaşık orantılıdır; PWM görev döngüsünü artırmak motoru hızlandırır. Ancak bir mikrodenetleyici pini motoru doğrudan sürecek kadar akım veremez ve motorun ürettiği gerilim sıçramaları pine zarar verebilir. Bu yüzden pin, motoru bir anahtarlama elemanı (transistör ya da MOSFET) veya hazır bir motor sürücü modülü üzerinden kontrol eder.",
        "Motor bir bobindir; akım aniden kesildiğinde ters yönde yüksek bir gerilim üretir. Bu gerilimi güvenli biçimde söndürmek için motorun uçlarına ters bağlı bir diyot (serbest dolaşım diyotu) konur; çoğu motor sürücü modülünde bu koruma yerleşiktir. Motorun beslemesi ayrı bir kaynaktan verilse bile kartın ve sürücünün toprak (GND) hatları ortak olmalıdır. Yön değiştirmek için H köprüsü adı verilen dört anahtarlı bir yapı kullanılır."
      ],
      after: [
        "Şebeke gerilimi (230 V AC) ile çalışan motor ve ısıtıcıları kontrol eden devreler hayati tehlike taşır; bu tür projeler yalnızca yetkin kişilerce, uygun yalıtım ve koruma elemanlarıyla yapılmalıdır. Düşük gerilimli projelerde bile pil ve adaptörlerin akım sınırlarına, kabloların kesitine ve ısınmaya dikkat edin."
      ]
    },
    {
      h: "ADC çözünürlüğü ne demek? 10 bitlik ADC'de adım gerilimi",
      p: [
        "ADC (Analog-Dijital Çevirici), bir sensörden gelen sürekli gerilimi mikrodenetleyicinin işleyebileceği bir sayıya çevirir. Çözünürlük, ADC'nin ölçüm aralığını kaç eşit basamağa böldüğünü bit sayısıyla anlatır. n bitlik bir ADC 2ⁿ seviye üretir: 10 bit için 1.024 seviye, 12 bit için 4.096 seviye. Ölçüm aralığının üst sınırı referans gerilimidir (Vref)."
      ],
      formula: "Seviye sayısı = 2ⁿ · En büyük kod = 2ⁿ − 1\nAdım gerilimi (1 LSB) = Vref ÷ 2ⁿ\nSayısal kod = taban(Vgiriş ÷ LSB)\nGerilim ≈ kod × Vref ÷ 2ⁿ\nİdeal SNR (dB) ≈ 6,02 × n + 1,76",
      table: {
        head: ["Çözünürlük", "Seviye", "LSB (Vref = 5 V)", "LSB (Vref = 3,3 V)", "İdeal SNR"],
        rows: [
          ["8 bit", "256", "19,53 mV", "12,89 mV", "49,9 dB"],
          ["10 bit", "1.024", "4,88 mV", "3,22 mV", "62,0 dB"],
          ["12 bit", "4.096", "1,22 mV", "0,81 mV", "74,0 dB"],
          ["16 bit", "65.536", "76,3 µV", "50,4 µV", "98,1 dB"]
        ],
        caption: "Değerler ideal çeviriciler içindir. Gerçek ADC'lerde gürültü ve doğrusallık hataları nedeniyle etkin çözünürlük bit sayısının altında kalır."
      },
      after: [
        "<strong>Çözümlü örnek:</strong> 10 bitlik ADC, 5 V referans. Adım gerilimi 5 ÷ 1.024 = 4,8828 mV. Girişte 2,5 V varsa kod 2,5 ÷ 0,0048828 = 512 olur. Girişte 1,8 V varsa 1,8 ÷ 0,0048828 = 368,6 sonucu aşağı yuvarlanır ve kod 368 olur; bu kod 368 × 5 ÷ 1.024 ≈ 1,797 V'a karşılık gelir, aradaki 3 mV'luk fark niceleme hatasıdır ve her zaman 1 LSB'den küçüktür. Bazı kaynaklar ve kodlar Vref ÷ (2ⁿ − 1), yani 5 ÷ 1.023 kullanır; fark küçüktür ama hesaplarda hangisini kullandığınızı tutarlı tutun. Bu hesapları [[arac:adc-cozunurluk-hesapla|ADC Çözünürlük Hesaplama]] aracıyla yapabilir, kodun ikilik karşılığını [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısından öğrenebilirsiniz.",
        "ADC girişine referans geriliminden yüksek ya da toprağın altında bir gerilim uygulamak çeviriciye ve kartınıza zarar verebilir. Daha yüksek gerilimleri ölçmek için iki dirençli bir gerilim bölücü kullanılır; bölücünün çıkışı her koşulda Vref'in altında kalmalıdır. Dirençlerin hesabı [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] ile yapılır."
      ]
    },
    {
      h: "555 entegresi ile PWM nasıl üretilir?",
      p: [
        "555 zamanlayıcı, mikrodenetleyici kullanmadan kare dalga üretmenin klasik yoludur. <strong>Kararsız (astable)</strong> bağlantıda iki direnç (R1, R2) ve bir kondansatör (C) kullanılır; kondansatör R1 + R2 üzerinden dolar, R2 üzerinden boşalır. Dolma süresi yüksek, boşalma süresi düşük çıkışı belirler."
      ],
      formula: "Yüksek süre t_H = 0,693 × (R1 + R2) × C\nDüşük süre t_L = 0,693 × R2 × C\nFrekans f ≈ 1,44 ÷ ((R1 + 2 × R2) × C)\nGörev döngüsü D = (R1 + R2) ÷ (R1 + 2 × R2) × 100\nTek atımlı (monostable): T = 1,1 × R × C",
      ol: [
        "R1 = 1 kΩ, R2 = 10 kΩ, C = 100 nF seçelim.",
        "Yüksek süre: 0,693 × 11.000 × 100 × 10⁻⁹ ≈ 0,762 ms.",
        "Düşük süre: 0,693 × 10.000 × 100 × 10⁻⁹ ≈ 0,693 ms.",
        "Periyot 1,455 ms, frekans yaklaşık 687 Hz; 1,44 ÷ (21.000 × 100 × 10⁻⁹) formülü de yaklaşık 686 Hz verir.",
        "Görev döngüsü: 11 ÷ 21 ≈ %52,4."
      ],
      after: [
        "Standart bağlantıda yüksek süre her zaman düşük süreden uzun olduğu için görev döngüsü %50'nin altına inemez. Ayarlanabilir PWM için R2'ye paralel bir diyot eklenir ve dolma-boşalma yolları bir potansiyometreyle ayrılır; böylece frekans yaklaşık sabit kalırken görev döngüsü %5–95 gibi geniş bir aralıkta değiştirilebilir. Kondansatörün dolma süresinin arkasındaki fizik [[bilgi:rc-zaman-sabiti-kondansator-sarj-suresi|RC zaman sabiti]] yazısında, değerleri hesaplamak ise [[arac:555-zamanlayici-hesapla|555 Zamanlayıcı Hesaplama]] aracındadır. Kondansatör üzerindeki \"104\" gibi kodlar 100 nF demektir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Pinden fazla akım çekmek:</strong> Motor, röle ve güçlü LED'leri doğrudan pine bağlamak kartı bozabilir; sürücü devre kullanın.",
        "<strong>Diyotu unutmak:</strong> Bobinli yüklerde ters gerilim koruması olmadan anahtarlama elemanı zarar görebilir.",
        "<strong>Ortak toprağı bağlamamak:</strong> Ayrı beslemeli devrelerde GND hatları birleştirilmezse kontrol sinyali çalışmaz.",
        "<strong>ADC'de referansı yanlış varsaymak:</strong> 3,3 V'luk kartta 5 V referansla hesap yapmak tüm ölçümleri yanlış ölçekler.",
        "<strong>PWM çıkışını analog gerilim sanmak:</strong> PWM pini gerçek bir ara gerilim vermez; ölçü aletiyle ortalamayı görürsünüz, ama düzgün bir analog sinyal için RC alçak geçiren filtre gerekir.",
        "<strong>Görev döngüsünü güçle karıştırmak:</strong> Ortalama gerilim D ile, dirençli yükteki güç de D ile orantılıdır; ancak etkin gerilim √D ile değişir."
      ]
    }
  ],
  faq: [
    ["PWM nedir, nasıl çalışır?", "PWM, dijital bir çıkışı çok hızlı açıp kapatarak açık kalma süresinin oranıyla yüke giden ortalama gücü ayarlama yöntemidir. LED, motor ve ısıtıcı gibi yükler bu hızlı değişimi ortalayarak ara bir gerilim uygulanmış gibi davranır."],
    ["Görev döngüsü (duty cycle) nasıl hesaplanır?", "Görev döngüsü, açık sürenin periyoda bölünüp 100 ile çarpılmasıyla bulunur. 1 kHz'lik sinyalde periyot 1 ms'dir; sinyal 0,25 ms açık kalıyorsa görev döngüsü %25, 5 V tepe için ortalama gerilim 1,25 V olur."],
    ["Geliştirme kartında PWM ile LED parlaklığı nasıl ayarlanır?", "LED seri bir dirençle PWM destekli pine bağlanır ve yazılımda 0 ile 255 arasında bir değer verilir. 64 yaklaşık %25, 128 yaklaşık %50 görev döngüsü sağlar; göz ışığı doğrusal algılamadığı için gama düzeltmesi geçişi yumuşatır."],
    ["PWM frekansı neden önemlidir?", "Frekans çok düşükse LED titrer, motor sarsılır ya da vızıldar; çok yüksekse anahtarlama kayıpları ve ısınma artar. LED için birkaç yüz hertz üzeri, sessiz motor kontrolü için yaklaşık 20 kHz üzeri frekanslar tercih edilir."],
    ["ADC çözünürlüğü ne demek?", "ADC çözünürlüğü, çeviricinin ölçüm aralığını kaç eşit basamağa böldüğünü bit sayısıyla anlatır. n bitlik ADC 2ⁿ seviye üretir; 10 bit 1.024, 12 bit 4.096 seviye demektir. Bit sayısı arttıkça daha küçük gerilim farkları ayırt edilir."],
    ["10 bitlik ADC'de adım gerilimi kaçtır?", "Adım gerilimi referans geriliminin 1.024'e bölünmesiyle bulunur. 5 V referansta 5 ÷ 1.024 ≈ 4,88 mV, 3,3 V referansta yaklaşık 3,22 mV'tur. 5 V referansla 2,5 V giriş 512 koduna karşılık gelir."],
    ["555 entegresi ile PWM nasıl üretilir?", "555 kararsız bağlantıda iki direnç ve bir kondansatörle kare dalga üretir; frekans yaklaşık 1,44 ÷ ((R1 + 2R2) × C) formülüyle bulunur. Standart bağlantıda görev döngüsü %50'nin üzerindedir; diyot ve potansiyometreyle geniş aralıkta ayarlanabilir."],
    ["Motor hız kontrolünde PWM nasıl kullanılır?", "PWM görev döngüsü artırıldıkça motorun gördüğü ortalama gerilim ve hızı artar. Pin motoru doğrudan sürmez; transistör, MOSFET ya da motor sürücü modülü kullanılır ve motora ters bağlı koruma diyotu eklenir."],
    ["PWM çıkışından gerçek analog gerilim elde edilebilir mi?", "Evet, PWM çıkışına bir direnç ve kondansatörden oluşan alçak geçiren filtre eklenerek darbeler yumuşatılır ve yaklaşık sabit bir gerilim elde edilir. Filtrenin kesim frekansı PWM frekansının belirgin biçimde altında seçilmelidir."]
  ],
  tools: ["pwm-gorev-dongusu-hesapla", "adc-cozunurluk-hesapla", "555-zamanlayici-hesapla"],
  related: ["led-direnci-nasil-hesaplanir", "ohm-kanunu-nedir", "rc-zaman-sabiti-kondansator-sarj-suresi", "ikilik-sayi-sistemi-nasil-cevrilir", "kondansator-kodu-nasil-okunur-104"],
  uyari: "elektrik işlerinde güvenlik önlemlerini alın; şebeke gerilimiyle çalışan devreleri yalnızca yetkin kişiler kurmalıdır"
};
