export default {
  slug: "pil-seri-paralel-baglama-18650",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Pil Seri ve Paralel Bağlama: 18650 Paketinde Voltaj ve Kapasite Hesabı",
  pageTitle: "Pil Seri Paralel Bağlama: 18650 Paket Voltajı ve Kapasitesi",
  description: "Pil seri bağlanınca voltaj, paralel bağlanınca kapasite toplanır. 3S2P ne demek, 18650 paketi Wh hesabı, çalışma süresi, BMS ve lityum güvenliği.",
  keywords: ["pil seri paralel bağlama", "18650 pil paketi", "seri bağlamada voltaj", "paralel bağlamada kapasite", "3s2p ne demek", "mah wh çevirme", "akü kullanım süresi", "bms nedir"],
  lead: "Piller <strong>seri</strong> bağlanınca gerilimler toplanır, kapasite (mAh) aynı kalır; <strong>paralel</strong> bağlanınca kapasiteler toplanır, gerilim aynı kalır. 3,6 V ve 3.000 mAh'lik altı 18650 hücreden kurulan 3S2P paket bu yüzden 10,8 V ve 6.000 mAh, yani 64,8 Wh enerji taşır. Bu sayfada dizilim adlarını, mAh ile Wh dönüşümünü, çalışma süresi hesabını ve lityum hücrelerde dengesizlik, BMS ve yangın riskini kavram düzeyinde anlatıyoruz; montaj talimatı vermiyoruz.",
  kisaCevap: [
    "Seri bağlantı (S): toplam gerilim = hücre gerilimi × seri sayısı; kapasite tek hücreninkine eşittir.",
    "Paralel bağlantı (P): toplam kapasite = hücre kapasitesi × paralel sayısı; gerilim tek hücreninkine eşittir.",
    "3S2P, üç seri grubun her birinde iki paralel hücre demektir; toplam 3 × 2 = 6 hücre kullanılır.",
    "Enerji (Wh) = gerilim (V) × kapasite (Ah); 10,8 V × 6 Ah = 64,8 Wh.",
    "Çalışma süresi (saat) ≈ paket Wh × verim ÷ cihaz gücü (W); 64,8 × 0,85 ÷ 10 W ≈ 5,5 saat.",
    "Lityum paketlerde hücre dengesi ve BMS (pil yönetim sistemi) zorunludur; dengesiz hücreler aşırı ısınma ve yangına yol açabilir."
  ],
  figure: {
    alt: "Seri, paralel ve 3S2P bağlantı şeması: seri bağlantıda 3,6 V hücreler 10,8 V eder, paralelde 3.000 mAh hücreler 6.000 mAh eder, 3S2P paket 10,8 V 6.000 mAh ve 64,8 Wh verir.",
    caption: "Aynı hücreler farklı dizilimde farklı paket verir. Seri bağlantı gerilimi, paralel bağlantı kapasiteyi artırır; Wh (enerji) ise hücre sayısıyla doğru orantılıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Seri, paralel ve 3S2P: 18650 hücre 3,6 V · 3.000 mAh</text>
  <g>
    <text x="120" y="66" class="b mid">Seri (3S)</text>
    <rect x="30" y="80" width="54" height="34" rx="6" class="ps"/><text x="57" y="102" class="sm mid b">3,6 V</text>
    <rect x="94" y="80" width="54" height="34" rx="6" class="ps"/><text x="121" y="102" class="sm mid b">3,6 V</text>
    <rect x="158" y="80" width="54" height="34" rx="6" class="ps"/><text x="185" y="102" class="sm mid b">3,6 V</text>
    <line x1="84" y1="97" x2="94" y2="97" class="sp sw" fill="none"/><line x1="148" y1="97" x2="158" y2="97" class="sp sw" fill="none"/>
    <rect x="30" y="132" width="182" height="52" rx="8" class="sf sb"/>
    <text x="121" y="154" class="b mid">10,8 V</text><text x="121" y="174" class="sm mid t2">kapasite 3.000 mAh</text>
  </g>
  <g>
    <text x="360" y="66" class="b mid">Paralel (2P)</text>
    <rect x="300" y="80" width="120" height="30" rx="6" class="oks"/><text x="360" y="100" class="sm mid b">3,6 V · 3.000 mAh</text>
    <rect x="300" y="118" width="120" height="30" rx="6" class="oks"/><text x="360" y="138" class="sm mid b">3,6 V · 3.000 mAh</text>
    <line x1="290" y1="95" x2="290" y2="133" class="sok sw" fill="none"/><line x1="430" y1="95" x2="430" y2="133" class="sok sw" fill="none"/>
    <rect x="280" y="160" width="160" height="40" rx="8" class="sf sb"/>
    <text x="360" y="186" class="b mid">3,6 V · 6.000 mAh</text>
  </g>
  <g>
    <text x="600" y="66" class="b mid">3S2P (6 hücre)</text>
    <rect x="520" y="80" width="46" height="26" rx="5" class="ps"/><rect x="577" y="80" width="46" height="26" rx="5" class="ps"/><rect x="634" y="80" width="46" height="26" rx="5" class="ps"/>
    <rect x="520" y="112" width="46" height="26" rx="5" class="ps"/><rect x="577" y="112" width="46" height="26" rx="5" class="ps"/><rect x="634" y="112" width="46" height="26" rx="5" class="ps"/>
    <text x="543" y="98" class="sm mid">1a</text><text x="600" y="98" class="sm mid">2a</text><text x="657" y="98" class="sm mid">3a</text>
    <text x="543" y="130" class="sm mid">1b</text><text x="600" y="130" class="sm mid">2b</text><text x="657" y="130" class="sm mid">3b</text>
    <rect x="510" y="150" width="180" height="50" rx="8" class="p"/>
    <text x="600" y="172" class="b mid sf">10,8 V · 6.000 mAh</text><text x="600" y="191" class="sm mid sf">= 64,8 Wh</text>
  </g>
  <rect x="30" y="226" width="660" height="78" rx="8" class="sf sb"/><rect x="30" y="226" width="8" height="78" class="p"/>
  <text x="52" y="252" class="b">Hesap: Wh = V × Ah</text>
  <text x="52" y="276" class="sm t2">10,8 V × 6,0 Ah = 64,8 Wh · 10 W cihaz, %85 verim: 64,8 × 0,85 ÷ 10 ≈ 5,5 saat</text>
  <text x="52" y="294" class="sm t2">Hücre aralığı: tam dolu 4,2 V, nominal 3,6–3,7 V; alt sınır üretici verisine göre</text>
  <rect x="30" y="320" width="660" height="84" rx="8" class="dgs"/>
  <text x="52" y="346" class="b dg">Güvenlik: lityum hücre oyuncak değildir</text>
  <text x="52" y="370" class="sm">Farklı kapasite, yaş ya da şarj düzeyindeki hücreler karıştırılmaz; seri gruplar dengelenmezse</text>
  <text x="52" y="390" class="sm">bir hücre aşırı şarj olur. BMS, sigorta ve uygun şarj cihazı olmadan paket kullanılmaz.</text>
</svg>`
  },
  sections: [
    {
      h: "Seri ve paralel bağlantı nedir?",
      p: [
        "Bir pil paketi, tek tek hücrelerin belirli bir düzenle birleştirilmesiyle oluşur. Hücrelerden birinin artı ucu diğerinin eksi ucuna bağlanırsa <strong>seri bağlantı</strong> kurulur; akım tüm hücrelerden sırayla geçer ve gerilimler üst üste eklenir. Bu yüzden iki adet 1,5 V kalem pil seri bağlandığında 3 V elde edilir.",
        "Hücrelerin tüm artı uçları bir noktada, tüm eksi uçları başka bir noktada birleşirse <strong>paralel bağlantı</strong> olur. Gerilim değişmez ama hücreler yükü paylaşır; toplam kapasite ve verilebilecek akım artar. Bir telefon bataryasının içindeki iki hücre çoğu zaman paraleldir: gerilim aynı kalır, kullanım süresi uzar.",
        "Gerçek paketlerin çoğu iki yöntemi birleştirir. Önce birkaç hücre paralel bağlanarak bir \"grup\" oluşturulur, sonra bu gruplar seri bağlanır. Dizüstü bilgisayar bataryaları, elektrikli bisiklet ve scooter paketleri, taşınabilir güç istasyonları bu mantıkla tasarlanır."
      ]
    },
    {
      h: "Formüller: gerilim, kapasite ve enerji",
      p: [
        "Seri ve paralel hesap, hücrelerin birbirinin aynısı olduğu varsayımına dayanır. Aynı model, aynı kapasite, aynı yaş ve aynı şarj düzeyindeki hücrelerde aşağıdaki formüller paketin nominal değerlerini verir."
      ],
      formula: "Paket gerilimi = hücre gerilimi × S (seri sayısı)\nPaket kapasitesi = hücre kapasitesi × P (paralel sayısı)\nHücre sayısı = S × P\nEnerji (Wh) = paket gerilimi (V) × paket kapasitesi (Ah)\nmAh → Ah: mAh ÷ 1.000",
      after: [
        "Burada en sık gözden kaçan nokta, <strong>mAh değerinin tek başına enerji göstermemesidir</strong>. 6.000 mAh'lik 3,6 V paket ile 6.000 mAh'lik 36 V paket arasında on kat enerji farkı vardır. Farklı gerilimdeki paketleri karşılaştırırken mutlaka Wh'ye geçin; dönüşüm için [[arac:mah-wh-cevir|mAh Wh çevirici]] işinizi görür.",
        "Hücre sayısı arttıkça Wh doğrusal olarak büyür. Seri ya da paralel olması enerjiyi değiştirmez; yalnızca o enerjinin hangi gerilim ve akım düzeyinde sunulacağını belirler. 6 hücre her dizilimde aynı 64,8 Wh'yi taşır: 6S1P olarak 21,6 V ve 3 Ah, 1S6P olarak 3,6 V ve 18 Ah."
      ]
    },
    {
      h: "3S2P, 10S4P, 13S5P ne anlama gelir?",
      p: [
        "Paket etiketlerinde görülen bu kısaltmalar dizilimi anlatır. <strong>S</strong> harfinin önündeki sayı seri bağlı grup sayısını, <strong>P</strong> harfinin önündeki sayı her gruptaki paralel hücre sayısını gösterir. Toplam hücre sayısı ikisinin çarpımıdır."
      ],
      table: {
        head: ["Dizilim", "Hücre sayısı", "Nominal gerilim (3,6 V hücre)", "Kapasite (3.000 mAh hücre)", "Enerji"],
        rows: [
          ["1S2P", "2", "3,6 V", "6.000 mAh", "21,6 Wh"],
          ["2S2P", "4", "7,2 V", "6.000 mAh", "43,2 Wh"],
          ["3S2P", "6", "10,8 V", "6.000 mAh", "64,8 Wh"],
          ["4S3P", "12", "14,4 V", "9.000 mAh", "129,6 Wh"],
          ["10S4P", "40", "36 V", "12.000 mAh", "432 Wh"],
          ["13S5P", "65", "46,8 V", "15.000 mAh", "702 Wh"]
        ],
        caption: "Değerler 3,6 V nominal ve 3.000 mAh kapasiteli örnek hücreye göre hesaplanmıştır. Hücrenin kendi etiketindeki değerler farklıysa aynı formülle yeniden hesaplayın."
      },
      after: [
        "Elektrikli bisikletlerde sık görülen \"36 V\" paketin genellikle 10S, \"48 V\" paketin 13S olması bu tablodan kaynaklanır: 10 × 3,6 V = 36 V, 13 × 3,6 V = 46,8 V (yuvarlanarak 48 V sınıfına girer). Tam dolu iken her hücre 4,2 V'a çıktığı için 10S paket şarj sonunda 42 V, 13S paket 54,6 V gösterir."
      ]
    },
    {
      h: "Çözümlü örnek: 18650 paketi hesaplama",
      p: [
        "Bir el feneri ya da küçük bir taşınabilir cihaz için hazırlanmış hazır bir paketi değerlendirdiğinizi düşünün. Etikette \"3S2P, 18650, 3,6 V 3.000 mAh hücre\" yazıyor. Paketin neler sunduğunu adım adım bulalım."
      ],
      ol: [
        "Gerilim: 3 seri grup × 3,6 V = <strong>10,8 V nominal</strong>. Tam doluyken 3 × 4,2 V = 12,6 V ölçülür.",
        "Kapasite: her grupta 2 paralel hücre × 3.000 mAh = <strong>6.000 mAh</strong> (6 Ah).",
        "Enerji: 10,8 V × 6 Ah = <strong>64,8 Wh</strong>.",
        "Çalışma süresi: cihaz 10 W çekiyor ve dönüştürücü verimi yaklaşık %85 ise 64,8 × 0,85 ÷ 10 = <strong>5,5 saat</strong>.",
        "Akım: 10 W ÷ 10,8 V ≈ 0,93 A paketten çekilir; her paralel hücreye yaklaşık 0,46 A düşer. Bu değer hücrenin sürekli deşarj akımı sınırının çok altında olmalıdır."
      ],
      after: [
        "Bu hesap nominal değerlerle yapılır. Gerçek kullanımda hücreler yaşlandıkça kapasite düşer, soğuk havada geçici olarak azalır, yüksek akımda iç direnç nedeniyle gerilim çöker. Planlama yaparken hesapladığınız süreden %10–20 daha kısa bir süre beklemek gerçekçidir. Tüm bu adımları [[arac:pil-seri-paralel-hesapla|Pil Seri-Paralel Hesaplama]] aracıyla tek ekranda yapabilirsiniz."
      ]
    },
    {
      h: "Pil paketi bir cihazı kaç saat çalıştırır?",
      p: [
        "Çalışma süresini bulmanın en güvenilir yolu Wh üzerinden gitmektir. Cihazın gücünü watt olarak bilmiyorsanız etiketindeki gerilim ve akımı çarpın: 12 V ve 2 A yazan bir cihaz yaklaşık 24 W çeker. Ardından paket enerjisini bu güce bölün ve aradaki dönüştürücünün kaybını hesaba katın."
      ],
      formula: "Süre (saat) = paket Wh × verim × kullanılabilir oran ÷ cihaz gücü (W)\nÖrnek: 432 Wh × 0,90 × 0,90 ÷ 250 W ≈ 1,4 saat",
      after: [
        "Örnekteki \"kullanılabilir oran\", paketin tamamen boşaltılmamasını temsil eder. Lityum hücreleri sık sık sıfıra kadar boşaltmak ömrü kısaltır; birçok BMS de belirli bir gerilimin altında yükü keser. Akü gibi büyük sistemler için deşarj derinliğini ve invertör verimini ayrı ayrı girmek isterseniz [[arac:aku-kullanim-suresi-hesapla|Akü Kullanım Süresi Hesaplama]] aracını kullanın. Konunun akü ve UPS tarafı için [[bilgi:ups-aku-kac-saat-gider|UPS akü süresi yazısına]] bakabilirsiniz.",
        "Powerbank ile telefon şarjı da aynı mantıkla çözülür; ancak powerbank etiketindeki mAh değeri iç hücrenin 3,6–3,7 V gerilimine göredir ve USB çıkışında 5 V'a dönüştürme kaybı yaşanır. Bunu ayrıntılı anlatan [[bilgi:powerbank-kac-kez-sarj-eder|powerbank şarj sayısı yazısı]] ve [[arac:powerbank-sarj-sayisi-hesapla|Powerbank Şarj Sayısı]] aracı gerçekçi sonuç verir."
      ]
    },
    {
      h: "Farklı kapasitede piller birlikte kullanılır mı?",
      p: [
        "Kısa cevap: <strong>hayır</strong>. Seri bağlı hücrelerden biri daha düşük kapasiteliyse ya da daha yaşlıysa deşarjda ilk o biter; diğerleri akım vermeye devam ettikçe zayıf hücre aşırı boşalır, hatta ters kutuplanabilir. Şarjda ise ilk o dolar ve diğerleri dolana kadar aşırı şarj gerilimine maruz kalır. Lityum hücrede aşırı şarj, iç ısınma ve gaz çıkışıyla başlayan ve kontrol edilemeyen bir ısıl kaçaka (thermal runaway) dönüşebilir.",
        "Paralel bağlantıda da farklı şarj düzeyindeki hücreler birleştirildiği anda dolu olandan boş olana kontrolsüz bir akım akar. Bu akım bağlantı noktalarını eritecek ya da hücreye zarar verecek kadar yüksek olabilir. Bu yüzden üreticiler aynı seriden, aynı tarihte üretilmiş, kapasitesi ve iç direnci ölçülerek eşleştirilmiş hücreler kullanır."
      ],
      ul: [
        "Aynı model, aynı kapasite ve aynı üretim partisinden hücreler eşleştirilir.",
        "Kullanılmış (sökülmüş) hücreler yeni hücrelerle karıştırılmaz; kapasite ve iç direnç farkı tehlikelidir.",
        "Kimyası farklı hücreler (Li-ion, LiFePO<sub>4</sub>, NiMH, alkalin) asla aynı pakette bulunmaz; gerilim ve şarj kuralları farklıdır.",
        "Şişmiş, ezilmiş, kılıfı yırtık ya da ısınan hücre kullanılmaz; yetkili toplama noktasına teslim edilir."
      ]
    },
    {
      h: "BMS kartı neden gereklidir? Lityum güvenliği",
      p: [
        "<strong>BMS</strong> (Battery Management System, pil yönetim sistemi) lityum paketin güvenlik beynidir. Her seri grubun gerilimini ayrı ayrı izler; bir grup üst sınıra ulaştığında şarjı, alt sınıra indiğinde deşarjı keser. Kısa devre ve aşırı akım durumunda bağlantıyı açar, birçok modelde sıcaklığı da takip eder. Dengeleme (balancing) özelliği ise seri gruplar arasında oluşan küçük gerilim farklarını şarj sırasında eşitler.",
        "BMS olmadan seri lityum paket şarj etmek, en zayıf hücrenin aşırı şarj olmasına göz yummak demektir. 18650 gibi silindirik hücreler yüksek enerji yoğunluğuna sahiptir; ısıl kaçak başladığında hücre çok yüksek sıcaklığa ulaşır, yanıcı gaz çıkarır ve yanındaki hücreleri de tetikleyebilir. Bu yangın su ile kolay söndürülemez ve kapalı ortamda zehirli duman üretir."
      ],
      ul: [
        "Paket yalnızca kendi kimyasına ve seri sayısına uygun şarj cihazıyla doldurulmalıdır.",
        "Şarj sırasında paket gözetimsiz bırakılmamalı, yanıcı malzemeden uzak, sert ve yanmaz bir zeminde durmalıdır.",
        "Hücrelere doğrudan lehim yapmak ısı nedeniyle hücreye zarar verebilir; bu işler uygun ekipmanı ve eğitimi olan kişilerin işidir.",
        "Ev yapımı paket yerine standartlara uygun, sertifikalı ve sigortalı hazır paketler tercih edilmelidir.",
        "Isınan, koku yayan ya da şişen paket hemen kullanımdan kaldırılır; atık piller belediye ya da satıcıların toplama kutularına verilir."
      ],
      after: [
        "Bu yazı kavramları ve hesap mantığını anlatır; paket montajı için bir talimat değildir. Yüksek gerilimli (özellikle 36 V ve üzeri) paketler elektrik çarpması riski de taşır. Elektrikli bisiklet ya da scooter paketinizde sorun varsa yetkili servise başvurun."
      ]
    },
    {
      h: "Sık yapılan hesap hataları",
      ul: [
        "<strong>mAh'leri seride toplamak:</strong> Seri bağlantıda kapasite toplanmaz; 3 adet 3.000 mAh hücre seri bağlanınca paket yine 3.000 mAh'tir, yalnızca gerilim üç katına çıkar.",
        "<strong>Farklı gerilimdeki paketleri mAh ile kıyaslamak:</strong> Doğru karşılaştırma Wh iledir.",
        "<strong>Nominal ile tam dolu gerilimi karıştırmak:</strong> 3,6 V nominaldir; tam dolu hücre 4,2 V ölçülür. Cihazın giriş aralığı tam dolu gerilimi de kaldırmalıdır.",
        "<strong>Verimi unutmak:</strong> Dönüştürücü, invertör ve kablo kayıpları %5–20 arasında enerji tüketebilir.",
        "<strong>Hücre başına akımı gözden kaçırmak:</strong> Paket akımı paralel hücre sayısına bölünür; her hücrenin sürekli deşarj sınırı aşılmamalıdır."
      ]
    },
    {
      h: "Pil Seri-Paralel aracını kullanma",
      ol: [
        "[[arac:pil-seri-paralel-hesapla|Pil Seri-Paralel Hesaplama]] sayfasını açın.",
        "Hücrenin nominal gerilimini (ör. 3,6 V) ve kapasitesini (ör. 3.000 mAh) girin.",
        "Seri ve paralel sayısını yazın ya da 3S2P gibi dizilimi seçin.",
        "İsterseniz cihaz gücünü ekleyin; araç paket gerilimini, kapasitesini, Wh değerini ve tahmini çalışma süresini gösterir.",
        "Sonucu farklı dizilimlerle karşılaştırın; aynı hücre sayısında Wh değerinin değişmediğini göreceksiniz."
      ],
      after: [
        "Gerilim, akım ve güç ilişkisini tazelemek isterseniz [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt yazısı]] temel bilgiyi verir. Hesaplar tarayıcınızda yapılır, girdiğiniz değerler hiçbir yere gönderilmez."
      ]
    }
  ],
  faq: [
    ["Piller seri bağlanınca ne değişir?", "Seri bağlantıda hücrelerin gerilimleri toplanır, kapasite ise tek hücrenin kapasitesine eşit kalır. Üç adet 3,6 V hücre seri bağlanınca 10,8 V elde edilir ama mAh değeri artmaz."],
    ["Paralel bağlamada kapasite nasıl artar?", "Paralel bağlantıda hücreler yükü paylaştığı için kapasiteleri toplanır, gerilim değişmez. İki adet 3.000 mAh hücre paralel bağlanınca 3,6 V gerilimde 6.000 mAh kapasite elde edilir."],
    ["3S2P ne anlama gelir?", "3S2P, üç seri grup ve her grupta iki paralel hücre demektir. Toplam altı hücre kullanılır; 3,6 V ve 3.000 mAh hücrelerle paket 10,8 V ve 6.000 mAh olur."],
    ["18650 pil paketi nasıl hesaplanır?", "Hücre gerilimini seri sayısıyla, hücre kapasitesini paralel sayısıyla çarparsınız. Enerji için gerilimi amper-saat cinsinden kapasiteyle çarparak Wh değerini bulursunuz; çalışma süresini Wh değerini cihaz gücüne bölerek tahmin edersiniz."],
    ["mAh değeri Wh'ye nasıl çevrilir?", "mAh değerini 1.000'e bölüp amper-saate çevirin, ardından nominal gerilimle çarpın. Örneğin 6.000 mAh ve 10,8 V için 6 Ah × 10,8 V = 64,8 Wh sonucu çıkar."],
    ["Farklı kapasitede piller birlikte kullanılır mı?", "Kullanılmamalıdır. Seri bağlantıda zayıf hücre önce biter ve aşırı boşalır, şarjda önce dolar ve aşırı şarj olur. Lityum hücrelerde bu durum ısınma, şişme ve yangın riskini ciddi biçimde artırır."],
    ["Pil paketi bir cihazı kaç saat çalıştırır?", "Paket enerjisini (Wh) cihaz gücüne (W) bölüp dönüştürücü verimiyle çarparak tahmin edilir. 64,8 Wh paket ve 10 W cihaz için yüzde 85 verimle yaklaşık 5,5 saat elde edilir; yaşlanma ve soğuk hava süreyi kısaltır."],
    ["BMS kartı neden gereklidir?", "BMS her seri grubun gerilimini izleyerek aşırı şarjı, aşırı deşarjı, kısa devreyi ve aşırı akımı keser; dengeleme ile gruplar arasındaki farkı eşitler. Seri lityum paketlerde BMS olmadan güvenli kullanım mümkün değildir."],
    ["Lityum pil yangını su ile söndürülür mü?", "Lityum hücre yangınları ısıl kaçak nedeniyle kendini besleyebilir ve kolay söner değildir. Böyle bir durumda ortamı boşaltıp 112 Acil Çağrı Merkezi'ni arayın; şişen ya da ısınan paketi önceden kullanımdan kaldırmak en etkili önlemdir."]
  ],
  tools: ["pil-seri-paralel-hesapla", "mah-wh-cevir", "aku-kullanim-suresi-hesapla", "powerbank-sarj-sayisi-hesapla"],
  related: ["powerbank-kac-kez-sarj-eder", "ups-aku-kac-saat-gider", "watt-amper-volt-iliskisi"],
  uyari: "elektrik ve lityum pil işleri yangın ve çarpılma riski taşır; paket montajı ve onarımı için yetkili servise başvurun",
  sources: [
    ["IEC – Taşınabilir lityum piller güvenlik standartları (IEC 62133)", "https://www.iec.ch/"],
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı – Atık pil ve akümülatörler", "https://csb.gov.tr/"]
  ]
};
