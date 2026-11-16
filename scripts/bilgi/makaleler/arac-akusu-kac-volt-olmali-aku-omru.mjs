export default {
  slug: "arac-akusu-kac-volt-olmali-aku-omru",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Araç Aküsü Kaç Volt Olmalı? Akü Ömrü, Ölçüm ve Kışın Akü Bakımı",
  pageTitle: "Akü Kaç Volt Olmalı? 12,6 V, Şarj Voltajı ve Akü Ömrü",
  description: "Tam dolu araç aküsü dinlenmiş hâlde yaklaşık 12,6–12,7 V gösterir, motor çalışırken 13,8–14,7 V beklenir. Multimetreyle ölçüm, akü ömrü, kış bakımı, şarj süresi.",
  keywords: ["akü kaç volt olmalı", "12,6 volt akü", "akü ölçümü multimetre", "akü ömrü kaç yıl", "kışın akü bitmesi", "akü şarj etme", "akü amper seçimi", "cca nedir"],
  lead: "Tam dolu ve en az birkaç saat dinlenmiş 12 voltluk bir otomobil aküsü yaklaşık 12,6–12,7 V gösterir; 12,4 V civarı yaklaşık yüzde 75, 12,2 V yaklaşık yüzde 50 doluluk anlamına gelir ve 12,0 V'un altı akünün ciddi biçimde boşaldığını gösterir. Motor çalışırken şarj sistemi akü uçlarında genellikle 13,8–14,7 V oluşturur. Bu yazıda multimetreyle doğru ölçümü, Ah ve CCA değerlerini, kışın akünün neden zayıfladığını, şarj süresi hesabını ve takviyenin güvenli yapılışını anlatıyoruz.",
  kisaCevap: [
    "Dinlenmiş tam dolu akü: 12,6–12,7 V; %75 ≈ 12,4 V; %50 ≈ 12,2 V; %25 ≈ 12,0 V (yaklaşık değerler).",
    "Motor çalışırken akü uçlarında genellikle 13,8–14,7 V görülür; 13 V'un altı ya da 15 V'un üstü şarj sistemine bakılmasını gerektirir.",
    "Ölçüm, motor kapalı ve araç en az 2–3 saat (ideali bir gece) kullanılmamışken yapılmalıdır.",
    "Akü ömrü kullanım, iklim ve bakıma göre değişir; çoğu otomobil aküsü 3–5 yıl kullanılır.",
    "Soğukta akünün verebildiği akım azalırken motoru döndürmek için gereken akım artar; bu yüzden zayıf akü kışın ilk sabah marşında belli olur.",
    "Şarj süresi ≈ eksik kapasite (Ah) ÷ şarj akımı (A) ÷ verim; 60 Ah akünün yarısı 6 A ile yaklaşık 6 saatte dolar."
  ],
  figure: {
    alt: "Akü voltaj göstergesi: 12,7 V tam dolu, 12,4 V yüzde 75, 12,2 V yüzde 50, 12,0 V yüzde 25, 11,9 V altı boş; motor çalışırken 13,8–14,7 V şarj aralığı.",
    caption: "Dinlenmiş akü geriliminin yaklaşık doluluk karşılıkları. Değerler sıcaklığa ve akü türüne göre birkaç onda bir volt değişebilir; kesin teşhis için yük testi gerekir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Akü kaç volt? Dinlenmiş gerilim ve doluluk</text>
  <rect x="40" y="60" width="130" height="200" rx="10" class="dgs"/>
  <rect x="170" y="60" width="130" height="200" class="ps"/>
  <rect x="300" y="60" width="130" height="200" class="ps"/>
  <rect x="430" y="60" width="130" height="200" class="oks"/>
  <rect x="560" y="60" width="130" height="200" rx="10" class="oks"/>
  <g class="mid">
    <text x="105" y="120" class="lg b dg">11,9 V altı</text><text x="105" y="150" class="sm">boş sayılır</text><text x="105" y="176" class="sm">hemen şarj</text>
    <text x="235" y="120" class="lg b">12,0 V</text><text x="235" y="150" class="sm">≈ %25</text>
    <text x="365" y="120" class="lg b">12,2 V</text><text x="365" y="150" class="sm">≈ %50</text>
    <text x="495" y="120" class="lg b">12,4 V</text><text x="495" y="150" class="sm">≈ %75</text>
    <text x="625" y="120" class="lg b ok">12,6–12,7 V</text><text x="625" y="150" class="sm">≈ %100</text>
  </g>
  <text x="365" y="236" class="sm mid t2">Motor kapalı, en az 2–3 saat dinlenmiş akü</text>
  <rect x="40" y="280" width="320" height="104" rx="8" class="p"/>
  <text x="56" y="306" class="b sf">Motor çalışırken</text>
  <text x="56" y="334" class="lg b sf">13,8–14,7 V</text>
  <text x="56" y="362" class="sm sf">Şarj dinamosu ve regülatör çalışıyor</text>
  <rect x="380" y="280" width="310" height="104" rx="8" class="sf sb"/>
  <text x="396" y="306" class="b">Şarj süresi örneği</text>
  <text x="396" y="332" class="sm">60 Ah akü, %50 boş → eksik 30 Ah</text>
  <text x="396" y="354" class="sm">30 ÷ 6 A ÷ 0,85 verim ≈ 5,9 saat</text>
  <text x="396" y="374" class="sm t2">Akıllı şarj cihazı sonu kendisi yavaşlatır</text>
</svg>`
  },
  sections: [
    {
      h: "Araç aküsü nasıl çalışır, \"12 volt\" ne demektir?",
      p: [
        "Otomobillerde kullanılan kurşun-asit aküler, her biri yaklaşık 2,1 V üreten altı hücrenin seri bağlanmasından oluşur. Bu yüzden \"12 voltluk akü\" denir ama tam dolu bir akünün gerçek gerilimi 12,6–12,7 V civarındadır. Akü boşaldıkça hücrelerdeki asit yoğunluğu azalır ve gerilim düşer; bu nedenle dinlenmiş akünün gerilimi doluluğu hakkında iyi bir fikir verir.",
        "Akünün asıl görevi motoru çalıştırmak için marş motoruna kısa süreli ama çok yüksek akım vermektir. Motor çalıştıktan sonra elektrik ihtiyacını şarj dinamosu karşılar ve aynı zamanda aküyü yeniden doldurur. Start-stop sistemli araçlarda ise akü gün içinde çok daha sık boşalıp dolduğu için daha dayanıklı AGM ya da EFB türleri kullanılır. Aracınıza hangi türün uygun olduğu araç kılavuzunda yazar.",
        "Ağır ticari araçlarda iki adet 12 V akü seri bağlanarak 24 V sistem oluşturulur. Bu yazıdaki değerler 12 V'luk binek araç aküleri içindir."
      ]
    },
    {
      h: "Tam dolu bir akü kaç volt göstermelidir?",
      p: [
        "Gerilimin doluluğu doğru göstermesi için akünün \"dinlenmiş\" olması gerekir. Araç yeni kullanıldıysa ya da akü yeni şarj edildiyse yüzeyde geçici bir fazla gerilim (yüzey şarjı) oluşur ve ölçüm gerçeğinden yüksek çıkar. Motoru kapattıktan sonra en az 2–3 saat, mümkünse bir gece bekleyip ölçmek en doğru sonucu verir."
      ],
      table: {
        head: ["Dinlenmiş gerilim", "Yaklaşık doluluk", "Ne yapılmalı?"],
        rows: [
          ["12,6–12,7 V", "%100", "Normal"],
          ["12,4 V", "%75", "Kısa yolculuklarda normal; uzun yol ya da şarj önerilir"],
          ["12,2 V", "%50", "Şarj edin; kışın marş zorlanabilir"],
          ["12,0 V", "%25", "Hemen şarj edin"],
          ["11,9 V ve altı", "boş", "Şarj edin, sonra test ettirin; uzun süre böyle kalan akü kalıcı hasar görür"]
        ],
        caption: "Değerler 25 °C civarında kurşun-asit akü için yaklaşık karşılıklardır; AGM akülerde birkaç onda bir volt yüksek olabilir."
      },
      after: [
        "Gerilim tek başına akünün sağlığını göstermez. Yaşlanmış bir akü şarj edildiğinde 12,6 V gösterebilir ama yük altında hızla çöker. Bu yüzden servislerde akü test cihazıyla yapılan yük testi ya da iç direnç ölçümü daha güvenilir bir sonuç verir."
      ]
    },
    {
      h: "Motor çalışırken şarj voltajı kaç olmalı?",
      p: [
        "Motor çalışırken akü uçlarında ölçülen gerilim şarj sisteminin durumunu gösterir. Çoğu araçta bu değer rölantide 13,8–14,7 V arasındadır. Akıllı şarj yönetimi olan yeni araçlarda dinamo, akü doluyken gerilimi 12,5–13 V'a kadar düşürebilir ve frenlemede yükseltebilir; bu normal bir davranıştır ve araç kılavuzunda belirtilir.",
        "Motor çalışırken gerilim sürekli 13 V'un altındaysa şarj dinamosu, kayış ya da bağlantılar kontrol edilmelidir. 15 V'un üzerindeki değerler regülatör arızasına işaret edebilir ve aküyü aşırı şarjla bozar. Farlar, klima ve arka cam rezistansı açıkken gerilimin kısa süre düşüp toparlanması ise normaldir."
      ]
    },
    {
      h: "Akü multimetreyle nasıl ölçülür?",
      ol: [
        "Motoru ve tüm tüketicileri kapatın, anahtarı çıkarın; ölçüm için akünün en az 2–3 saat dinlenmiş olmasını bekleyin.",
        "Multimetreyi doğru akım gerilimi (DCV ya da V⎓) kademesine alın; 20 V kademesi uygundur.",
        "Kırmızı probu akünün artı (+), siyah probu eksi (−) kutbuna temas ettirin; kutup başlarında oksit varsa temiz bir noktaya dokunun.",
        "Değeri okuyun ve yukarıdaki tabloyla karşılaştırın.",
        "Şarj sistemini kontrol etmek için motoru çalıştırın ve aynı ölçümü rölantide tekrarlayın; 13,8–14,7 V aralığı beklenir.",
        "Marş anında gerilimi izleyebiliyorsanız (bir yardımcıyla) değerin 9,6–10 V'un altına düşmemesi akünün yeterli akım verdiğini gösterir."
      ],
      p: [
        "Multimetrede okunan değeri milivolta ya da başka birimlere çevirmeniz gerekirse [[arac:volt-milivolt-cevir|Volt Milivolt Çevirici]]yi kullanabilirsiniz. Gerilim, akım ve direnç arasındaki ilişki için [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] yazısı temel bilgileri verir."
      ]
    },
    {
      h: "Akü kapasitesi (Ah) ve marş akımı (CCA) ne anlama gelir?",
      p: [
        "Akünün etiketinde iki temel değer bulunur. <strong>Ah (amper-saat)</strong>, akünün depoladığı enerji miktarını gösterir: 60 Ah'lik bir akü kuramsal olarak 20 saat boyunca 3 A verebilir. <strong>CCA ya da EN değeri (soğuk marş akımı)</strong> ise akünün −18 °C'de kısa süre içinde verebileceği en yüksek akımı gösterir ve kışın marş performansının ölçüsüdür.",
        "Akü seçiminde araç kılavuzundaki Ah ve CCA değerleri esas alınır. Daha yüksek kapasiteli akü takmak çoğu zaman sorun yaratmaz ama şarj sisteminin aküyü doldurma süresi uzar ve akünün fiziksel boyutu yuvaya uymayabilir. Daha düşük CCA'lı akü ise özellikle dizel araçlarda kış sabahlarında marşı zorlaştırır. Start-stop sistemli araçlarda yanlış türde akü takmak sistemin çalışmamasına yol açabilir."
      ],
      table: {
        head: ["Değer", "Birimi", "Neyi gösterir?", "Nerede önemli?"],
        rows: [
          ["Nominal gerilim", "V", "Sistem gerilimi (12 V)", "Uyumluluk"],
          ["Kapasite", "Ah", "Depolanan enerji", "Uzun süre park, aksesuar kullanımı"],
          ["Soğuk marş akımı", "A (EN/CCA)", "Soğukta verilebilen akım", "Kış sabahları, dizel motorlar"],
          ["Akü türü", "—", "Sulu, EFB, AGM", "Start-stop sistemleri"]
        ]
      },
      after: [
        "Akünün bir yükü ne kadar süre besleyebileceğini, örneğin park hâlindeyken çalışan bir kameranın aküyü kaç saatte boşaltacağını [[arac:aku-kullanim-suresi-hesapla|Akü Kullanım Süresi aracıyla]] hesaplayabilirsiniz."
      ]
    },
    {
      h: "Akü ömrü kaç yıldır, kışın neden daha çabuk biter?",
      p: [
        "Bir otomobil aküsünün ömrü kullanım şekline, iklime ve bakıma bağlıdır; çoğu akü 3–5 yıl kullanılır. Sık kısa yolculuk, uzun süre park, aşırı sıcak motor bölmesi ve akünün sık sık tamamen boşalması ömrü kısaltır. Sıcak yaz ayları akü içindeki kimyasal yıpranmayı hızlandırır; ama sonuçları genellikle kışın ortaya çıkar.",
        "Soğukta iki etki üst üste biner. Kimyasal tepkimeler yavaşladığı için akünün verebildiği akım ve kullanılabilir kapasitesi azalır. Aynı anda soğuk motor yağı koyulaştığı için motoru döndürmek daha fazla akım gerektirir. Yazın sorunsuz çalışan yaşlı bir akü, ilk soğuk sabahta marşı çeviremeyebilir.",
        "Kışın kısa yolculuklarda ısıtma, fan, koltuk ısıtması, arka cam rezistansı ve farlar birlikte çalıştığı için dinamonun aküyü doldurmaya fırsatı kalmaz. Haftada en az bir kez 30 dakikadan uzun bir yolculuk yapmak ya da aküyü düzenli olarak bir akıllı şarj cihazıyla desteklemek kış aylarında aküyü korur. Elektrikli araçlarda da ayrı bir 12 V akü bulunur ve soğuktan etkilenir; ayrıntı için [[bilgi:elektrikli-arac-menzili-kisin-neden-duser|elektrikli araç kış menzili]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Akü şarj cihazıyla dolum süresi nasıl hesaplanır?",
      formula: "Eksik kapasite (Ah) = akü kapasitesi × (1 − mevcut doluluk)\nŞarj süresi (saat) ≈ eksik kapasite ÷ şarj akımı ÷ şarj verimi\nÖrnek: 60 × 0,5 = 30 Ah → 30 ÷ 6 A ÷ 0,85 ≈ 5,9 saat",
      p: [
        "Kurşun-asit akülerde şarj verimi yaklaşık yüzde 80–90'dır; bir kısmı ısı ve gaz olarak kaybolur. Akıllı şarj cihazları doluluk yüzde 80'i geçtikten sonra akımı kendiliğinden düşürür; bu yüzden son kısım hesaptan uzun sürer. Pratik bir kural olarak şarj akımı akü kapasitesinin yaklaşık onda biri seçilir: 60 Ah için 6 A gibi.",
        "Hesabı farklı akım ve doluluk değerleriyle denemek için [[arac:sarj-suresi-hesapla|Şarj Süresi Hesaplama aracını]] kullanabilirsiniz. Şarjı iyi havalandırılan bir yerde, kıvılcım ve açık alevden uzakta yapın; şarj sırasında kurşun-asit aküler patlayıcı hidrojen gazı çıkarabilir. Şarj cihazının akü türünü (sulu, EFB, AGM) seçebildiğinden emin olun."
      ]
    },
    {
      h: "Uzun süre kullanılmayan araçta akü nasıl korunur?",
      ul: [
        "Araç birkaç hafta kullanılmayacaksa aküyü tam dolu bırakın; boş akü kışın donabilir ve kalıcı hasar görür.",
        "Alarm, araç takip cihazı ve kameralar park hâlinde sürekli akım çeker; bir ay içinde aküyü belirgin biçimde boşaltabilir.",
        "Uzun bekleme için bakım (koruma) modlu akıllı şarj cihazı bağlayın; aküyü aşırı şarj etmeden dolu tutar.",
        "Mümkün değilse akünün eksi kutup başını sökün; ancak bazı araçlarda radyo kodu ve ayarlar silinebilir, kılavuza bakın.",
        "Kutup başlarını temiz ve sıkı tutun; oksitlenme gerilim kaybına yol açar.",
        "Akünün dinlenmiş gerilimini ayda bir ölçün; 12,4 V'un altına düştüyse şarj edin."
      ]
    },
    {
      h: "Takviye (köprü) nasıl güvenli yapılır?",
      ol: [
        "İki aracın da kontağını kapatın; araçların birbirine temas etmediğinden emin olun ve kılavuzdaki takviye noktalarını bulun.",
        "Kırmızı kabloyu önce boş akünün artı (+) kutbuna, sonra dolu akünün artı kutbuna bağlayın.",
        "Siyah kabloyu dolu akünün eksi (−) kutbuna, diğer ucunu boş aküden uzakta, motor bloğundaki boyasız metal bir noktaya (şasi) bağlayın.",
        "Yardımcı aracı çalıştırıp birkaç dakika bekleyin, sonra boş aküsü olan aracı çalıştırın.",
        "Kabloları ters sırayla sökün: önce şasideki siyah, sonra dolu aküdeki siyah, sonra kırmızı uçlar.",
        "Çalışan aracı en az 30 dakika sürün ya da aküyü şarj cihazıyla doldurun; takviye aküyü doldurmaz, yalnızca motoru çalıştırır."
      ],
      p: [
        "Kutupları ters bağlamak aracın elektronik birimlerine ciddi zarar verebilir. Akü şişmiş, çatlamış ya da sızdırıyorsa takviye yapmayın. Kendinizi güvende hissetmiyorsanız yol yardımı ya da bir servis çağırın. Lastik değişimi gibi diğer yol kenarı işlemleri için [[bilgi:bijon-sikma-torku-kac-nm-olmali|bijon sıkma torku]] yazısına da bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Tam dolu bir otomobil aküsü kaç volt göstermelidir?", "En az birkaç saat dinlenmiş tam dolu bir 12 V kurşun-asit akü yaklaşık 12,6–12,7 V gösterir. 12,4 V yaklaşık yüzde 75, 12,2 V yaklaşık yüzde 50 doluluk demektir."],
    ["Motor çalışırken şarj voltajı kaç olmalı?", "Çoğu araçta motor çalışırken akü uçlarında 13,8–14,7 V ölçülür. Akıllı şarj sistemli araçlarda bu değer zaman zaman 12,5–13 V'a düşebilir; sürekli 13 V altı ya da 15 V üstü değerler kontrol gerektirir."],
    ["Akü multimetreyle nasıl ölçülür?", "Motor kapalı ve akü dinlenmişken multimetreyi DC volt kademesine alın, kırmızı probu artı, siyah probu eksi kutba değdirip değeri okuyun. Şarj sistemini görmek için ölçümü motor çalışırken tekrarlayın."],
    ["Akü ömrü ortalama kaç yıldır?", "Kullanım, iklim ve bakıma göre değişmekle birlikte çoğu otomobil aküsü 3–5 yıl kullanılır. Sık kısa yolculuk, uzun park ve akünün sık tamamen boşalması ömrü kısaltır."],
    ["Kışın akü neden daha çabuk biter?", "Soğukta akünün kimyasal tepkimeleri yavaşlar ve verebildiği akım azalır; aynı anda koyulaşan motor yağı marş için daha fazla akım ister. Kısa yolculuklarda ısıtıcı ve farlar da dinamonun aküyü doldurmasını engeller."],
    ["Akü şarj cihazıyla dolum süresi nasıl hesaplanır?", "Eksik kapasiteyi şarj akımına ve yaklaşık 0,85 verime bölün. Örneğin yarısı boş 60 Ah akü için 30 Ah ÷ 6 A ÷ 0,85 ≈ 5,9 saat bulunur; akıllı cihazlar son kısmı daha yavaş doldurur."],
    ["Akü kapasitesi (Ah) ve marş akımı (CCA) ne anlama gelir?", "Ah akünün depoladığı enerjiyi, CCA ya da EN değeri ise akünün eksi 18 derecede kısa sürede verebileceği en yüksek akımı gösterir. Seçimde araç kılavuzundaki değerler esas alınır."],
    ["Uzun süre kullanılmayan araçta akü nasıl korunur?", "Aküyü tam dolu bırakın, ayda bir gerilimini ölçün ve mümkünse bakım modlu akıllı şarj cihazı bağlayın. Alarm ve takip cihazları park hâlinde aküyü boşaltabileceği için uzun beklemede dikkate alınmalıdır."],
    ["Takviye (köprü) nasıl güvenli yapılır?", "Önce kırmızı kabloyu boş ve dolu akünün artı kutuplarına, sonra siyah kabloyu dolu akünün eksisine ve boş aracın şasisine bağlayın. Söküm ters sırayla yapılır; şişmiş ya da sızdıran aküde takviye yapılmaz."]
  ],
  tools: ["aku-kullanim-suresi-hesapla", "sarj-suresi-hesapla", "volt-milivolt-cevir", "ohm-kanunu-hesapla"],
  related: ["ups-aku-kac-saat-gider", "watt-amper-volt-iliskisi"],
  uyari: "akü çalışmalarında koruyucu gözlük kullanın, kıvılcım ve alevden uzak durun; araç kılavuzu ve yetkili servis esas alınır"
};
