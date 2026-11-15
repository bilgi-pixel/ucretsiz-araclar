export default {
  slug: "enflasyona-gore-paranin-degeri",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Enflasyona Göre Paranın Değeri ve Reel Getiri Nasıl Hesaplanır?",
  pageTitle: "Enflasyona Göre Paranın Değeri ve Reel Getiri Hesaplama",
  description: "Geçmişteki bir tutarın bugünkü değeri TÜFE endeksleri oranıyla, reel getiri Fisher denklemiyle bulunur. Formüller, maaş erimesi ve aylıktan yıllığa örnekler.",
  keywords: ["enflasyon hesaplama", "paranın bugünkü değeri", "reel getiri hesaplama", "enflasyona göre maaş", "tüfe hesaplama", "10 yıl önceki 100 tl bugün ne kadar", "alım gücü", "fisher denklemi"],
  lead: "Geçmişteki bir tutarın bugünkü değerini bulmak için tutarı, <strong>bugünkü TÜFE endeksinin o tarihteki endekse oranıyla</strong> çarparsınız. Yıllık oranlarla çalışıyorsanız her yılın (1 + enflasyon) çarpanlarını art arda uygularsınız. Bir yatırımın ya da maaş artışının enflasyonu geçip geçmediğini ise reel getiri gösterir: <strong>(1 + nominal getiri) ÷ (1 + enflasyon) − 1</strong>. Bu sayfada formülleri, TÜFE ile ÜFE farkını, aylık enflasyondan yıllığa geçişi ve maaşınızın alım gücünü örnek oranlarla hesaplamayı anlatıyoruz.",
  kisaCevap: [
    "Bugünkü değer = eski tutar × (bugünkü TÜFE endeksi ÷ eski tarihteki TÜFE endeksi).",
    "Yıllık oranlarla: bugünkü değer = eski tutar × (1 + e₁) × (1 + e₂) × … şeklinde birikimli çarpılır.",
    "Reel getiri (Fisher) = (1 + nominal oran) ÷ (1 + enflasyon) − 1; basit fark (nominal − enflasyon) yalnızca yaklaşıktır.",
    "Aylık oranlardan yıllık enflasyon toplanarak değil çarpılarak bulunur: %3'lük 12 ay yıllık %42,58 eder.",
    "Alım gücü kaybı = 1 − 1 ÷ (1 + enflasyon); %40 enflasyonda paranın alım gücü %28,6 azalır.",
    "TÜFE tüketicinin ödediği fiyatları, Yİ-ÜFE üreticinin yurt içi satış fiyatlarını ölçer; kira ve maaş hesaplarında genellikle TÜFE kullanılır."
  ],
  figure: {
    alt: "Enflasyonun 100.000 TL üzerindeki etkisi: üç yıl boyunca yüzde 25, 40 ve 60 enflasyonla aynı sepeti almak için gereken tutar 125.000, 175.000 ve 280.000 TL'ye çıkar; reel getiri örneği yüzde 45 faiz ve yüzde 35 enflasyonla yüzde 7,41.",
    caption: "Örnek oranlarla: üç yıl önce 100.000 TL'ye alınan bir sepetin bugün 280.000 TL'ye mal olması, paranın alım gücünün %64,3 azalması demektir. Sağdaki kart reel getirinin Fisher denklemiyle nasıl bulunduğunu gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı sepetin fiyatı (örnek oranlar)</text>
  <line x1="40" y1="330" x2="440" y2="330" class="sb" fill="none"/>
  <rect x="60" y="270" width="70" height="60" rx="4" class="ps"/>
  <rect x="160" y="255" width="70" height="75" rx="4" class="ps"/>
  <rect x="260" y="225" width="70" height="105" rx="4" class="ps"/>
  <rect x="360" y="162" width="70" height="168" rx="4" class="p"/>
  <g class="sm mid">
    <text x="95" y="262" class="b">100.000</text><text x="195" y="247" class="b">125.000</text>
    <text x="295" y="217" class="b">175.000</text><text x="395" y="154" class="b">280.000</text>
    <text x="95" y="350">Başlangıç</text><text x="195" y="350">1. yıl</text><text x="295" y="350">2. yıl</text><text x="395" y="350">3. yıl</text>
    <text x="195" y="370" class="mu">%25</text><text x="295" y="370" class="mu">%40</text><text x="395" y="370" class="mu">%60</text>
  </g>
  <text x="40" y="80" class="sm">Çarpan: 1,25 × 1,40 × 1,60 = <tspan class="b">2,80</tspan></text>
  <text x="40" y="102" class="sm">Alım gücü kaybı: 1 − 1 ÷ 2,80 = <tspan class="b dg">%64,3</tspan></text>
  <rect x="470" y="60" width="230" height="270" rx="12" class="sf sb"/>
  <text x="585" y="88" class="b mid">Reel getiri (Fisher)</text>
  <text x="585" y="122" class="sm mid">Mevduat faizi %45</text>
  <text x="585" y="144" class="sm mid">Enflasyon %35</text>
  <line x1="490" y1="160" x2="680" y2="160" class="sb" fill="none"/>
  <text x="585" y="186" class="sm mid">1,45 ÷ 1,35 − 1</text>
  <text x="585" y="224" class="xl mid ok">%7,41</text>
  <text x="585" y="256" class="sm mid mu">Basit fark %10 gösterir,</text>
  <text x="585" y="274" class="sm mid mu">ama gerçek kazanç %7,41</text>
  <text x="585" y="306" class="sm mid t2">Oranlar örnektir</text>
  <rect x="20" y="386" width="680" height="1" class="sb"/>
  <text x="360" y="408" class="sm mid t2">Gerçek hesap için TÜİK'in yayımladığı TÜFE endeks değerlerini kullanın.</text>
</svg>`
  },
  sections: [
    {
      h: "Enflasyon paranın değerini nasıl etkiler?",
      p: [
        "Enflasyon, mal ve hizmet fiyatlarının genel düzeyindeki sürekli artıştır. Fiyatlar yükseldiğinde aynı miktar parayla daha az şey alabilirsiniz; yani paranın nominal değeri (üzerinde yazan rakam) aynı kalsa da <strong>reel değeri</strong>, diğer adıyla <strong>alım gücü</strong> düşer. Cebinizdeki 1.000 TL'nin bir yıl sonra kaç ekmeğe, kaç litre yakıta yettiği bu yüzden değişir.",
        "Türkiye'de enflasyonu resmî olarak Türkiye İstatistik Kurumu (TÜİK) ölçer ve her ayın başında bir önceki aya ait endeksleri yayımlar. Hesaplarınızda bu resmî verileri kullanmanız, kira artışı, maaş pazarlığı ya da yatırım karşılaştırması gibi durumlarda tartışmasız bir zemin sağlar. Bu yazıdaki örneklerde kullanılan oranlar yalnızca hesap mantığını göstermek içindir."
      ]
    },
    {
      h: "Geçmişteki paranın bugünkü değeri: formül",
      formula: "Bugünkü değer = eski tutar × (güncel TÜFE endeksi ÷ eski tarihteki TÜFE endeksi)\nYıllık oranlarla: bugünkü değer = eski tutar × (1 + e₁) × (1 + e₂) × … × (1 + eₙ)\nAlım gücü kaybı = 1 − (eski tutar ÷ bugünkü değer)",
      p: [
        "En doğru yöntem endeks oranıdır. TÜİK, TÜFE'yi bir baz yıla göre endeks olarak yayımlar. Örneğin bir tarihte endeks 500, bugün 1.500 ise fiyatlar genel olarak 3 kat artmıştır; o tarihteki 100 TL bugün 300 TL'ye denk gelir. Bu yöntemde ara yılların oranlarıyla tek tek uğraşmazsınız.",
        "Yalnızca yıllık enflasyon oranlarını biliyorsanız bunları art arda çarparsınız. Oranları toplamak yanlıştır: %25, %40 ve %60'lık üç yıl toplamda %125 değil, 1,25 × 1,40 × 1,60 = 2,80 kat, yani %180 artış demektir. Bu fark yüksek enflasyon dönemlerinde çok büyük hatalara yol açar."
      ],
      ol: [
        "Başlangıç tarihini ve tutarı belirleyin: üç yıl önce 100.000 TL.",
        "Her yılın enflasyonunu (1 + oran) çarpanına çevirin: 1,25; 1,40; 1,60.",
        "Çarpanları çarpın: 1,25 × 1,40 × 1,60 = 2,80.",
        "Tutarı çarpanla çarpın: 100.000 × 2,80 = 280.000 TL. Üç yıl önceki 100.000 TL, bugünkü 280.000 TL'ye eşdeğerdir.",
        "Alım gücü kaybını hesaplayın: 1 − 1 ÷ 2,80 = %64,3. Aynı 100.000 TL bugün eskisinin yalnızca %35,7'si kadar mal alır."
      ],
      after: [
        "\"10 yıl önceki 100 TL bugün ne kadar?\" sorusunun cevabı da aynı yöntemle bulunur: 10 yıl önceki ayın TÜFE endeksini ve son yayımlanan endeksi TÜİK'ten alıp oranlarını 100 ile çarparsınız. [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracı, oranları sizin girdiğiniz değerlerle bu hesabı otomatik yapar."
      ]
    },
    {
      h: "Reel getiri nedir? Fisher denklemi",
      p: [
        "Reel getiri, bir yatırımın enflasyondan arındırılmış kazancıdır. Paranız mevduatta yılda %45 büyüse de fiyatlar %35 artmışsa, gerçekte zenginleşme oranınız %10 değildir. Doğru hesap, ekonomist Irving Fisher'ın adıyla anılan denklemle yapılır.",
        "Fisher denklemi, nominal büyüme çarpanını enflasyon çarpanına böler. Basit çıkarma (nominal − enflasyon), oranlar küçükken iyi bir yaklaşıktır ama Türkiye'deki gibi yüksek oranlarda belirgin biçimde yanıltır."
      ],
      formula: "Reel getiri = (1 + nominal getiri) ÷ (1 + enflasyon) − 1\nÖrnek: (1 + 0,45) ÷ (1 + 0,35) − 1 = 0,0741 → %7,41\nYaklaşık formül (yalnız düşük oranlarda): reel ≈ nominal − enflasyon",
      table: {
        head: ["Nominal getiri", "Enflasyon", "Basit fark", "Gerçek reel getiri (Fisher)"],
        rows: [
          ["%5", "%3", "%2,00", "%1,94"],
          ["%45", "%35", "%10,00", "%7,41"],
          ["%50", "%40", "%10,00", "%7,14"],
          ["%30", "%40", "−%10,00", "−%7,14"]
        ],
        caption: "Oranlar örnektir. Mevduatta stopaj gibi kesintiler varsa nominal getiriyi net (kesinti sonrası) tutarla girin."
      },
      after: [
        "Faizin enflasyonu geçip geçmediğini anlamak için Fisher sonucunun sıfırdan büyük olup olmadığına bakmanız yeterlidir. Stopaj sonrası reel getiriyi görmek için [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Maaşım enflasyon karşısında ne kadar eridi?",
      p: [
        "Maaşınızın alım gücünü ölçmek için maaş artış oranınızı aynı dönemin enflasyonuyla Fisher mantığıyla karşılaştırırsınız. Burada önemli olan, iki oranın aynı dönemi kapsamasıdır: Ocak'tan Ocak'a aldığınız zammı, aynı 12 ayın yıllık enflasyonuyla kıyaslamalısınız."
      ],
      formula: "Reel maaş değişimi = (yeni maaş ÷ eski maaş) ÷ (1 + dönem enflasyonu) − 1",
      ol: [
        "Bir yıl önce net maaşınız 30.000 TL, bugün 40.000 TL olsun: nominal artış 40.000 ÷ 30.000 = 1,3333, yani %33,3.",
        "Aynı dönemde enflasyon örnek olarak %40 olsun: çarpan 1,40.",
        "Reel değişim: 1,3333 ÷ 1,40 − 1 = −%4,76. Maaşınız rakam olarak arttı ama alım gücünüz yaklaşık %4,8 azaldı.",
        "Alım gücünü korumak için gereken maaş: 30.000 × 1,40 = 42.000 TL. Aradaki fark aylık 2.000 TL'dir."
      ],
      after: [
        "Aynı hesap kira için de geçerlidir. Kira artışlarında yasal üst sınır olarak çoğunlukla TÜFE'nin 12 aylık ortalaması kullanılır; ayrıntılar için [[rehber:kira-artisi-nasil-hesaplanir|kira artışı rehberine]] bakabilirsiniz. Belirli bir tutarın birkaç yıl sonra alım gücünün ne olacağını görmek için [[arac:satin-alma-gucu-hesapla|Satın Alma Gücü Kaybı Hesaplama]] aracı kullanışlıdır."
      ]
    },
    {
      h: "Aylık enflasyondan yıllık enflasyon nasıl bulunur?",
      p: [
        "Aylık oranlar toplanmaz, bileşik olarak çarpılır. Çünkü her ayın artışı, bir önceki ayın artmış fiyatları üzerine gelir. Bu, [[bilgi:bilesik-faiz-nedir|bileşik faizdeki]] \"faizin faizi\" mantığının aynısıdır.",
        "Tersi de mümkündür: yıllık bir oranı eşdeğer aylık orana çevirmek için (1 + yıllık oran) değerinin 12. kökünü alıp 1 çıkarırsınız. Örneğin yıllık %42,58 enflasyon, aylık ortalama %3'e karşılık gelir."
      ],
      formula: "Yıllık oran = (1 + a₁) × (1 + a₂) × … × (1 + a₁₂) − 1\nSabit aylık oranda: yıllık = (1 + a)¹² − 1\nÖrnek: 1,03¹² − 1 = 0,4258 → %42,58 (toplamla bulunan %36 değil)\nEşdeğer aylık oran = (1 + yıllık)^(1/12) − 1",
      table: {
        head: ["Sabit aylık enflasyon", "Toplama ile (yanlış)", "Bileşik yıllık (doğru)"],
        rows: [
          ["%1", "%12", "%12,68"],
          ["%2", "%24", "%26,82"],
          ["%3", "%36", "%42,58"],
          ["%4", "%48", "%60,10"]
        ]
      }
    },
    {
      h: "Geleceğe bakmak: N yıl sonra bir şey kaç para olur?",
      p: [
        "Aynı formülü ileriye doğru da kullanabilirsiniz. Bugün fiyatı belli olan bir ürünün ya da hizmetin belirli bir enflasyon varsayımıyla birkaç yıl sonra ne kadar tutacağını görmek, birikim hedefi koyarken çok işe yarar. Burada kullandığınız oran bir tahmindir; tek bir değer yerine iyimser ve kötümser iki senaryo hesaplamak daha sağlıklı sonuç verir.",
        "Örneğin bugün 1.000.000 TL olan bir aracın fiyatı, yıllık %30 enflasyon varsayımıyla 3 yıl sonra 1.000.000 × 1,30³ = 2.197.000 TL olur. Varsayım %20 olsaydı sonuç 1.728.000 TL çıkardı. İki senaryo arasındaki yaklaşık 470.000 TL'lik fark, uzun vadeli planlarda oran tahmininin ne kadar belirleyici olduğunu gösterir."
      ],
      formula: "N yıl sonraki fiyat = bugünkü fiyat × (1 + beklenen enflasyon)ᴺ\nÖrnek: 1.000.000 × 1,30³ = 2.197.000 TL",
      ul: [
        "Birikim hedefinizi bugünkü fiyatla değil, hedef tarihteki tahmini fiyatla belirleyin.",
        "Hedef tarihe kadar birikiminizin getirisi en az bu enflasyon varsayımı kadar değilse hedef her yıl uzaklaşır.",
        "Uzun vadeli hesapları her yıl gerçekleşen resmî enflasyonla güncelleyin."
      ]
    },
    {
      h: "TÜFE ile ÜFE farkı nedir, hangisi kullanılmalı?",
      p: [
        "<strong>TÜFE (Tüketici Fiyat Endeksi)</strong>, hanelerin satın aldığı gıda, kira, ulaşım, giyim, eğitim gibi mal ve hizmetlerin fiyat değişimini ölçer. Günlük hayattaki alım gücü, maaş, kira ve emekli aylığı hesaplarında esas alınan endeks budur.",
        "<strong>Yİ-ÜFE (Yurt İçi Üretici Fiyat Endeksi)</strong> ise üreticilerin yurt içine sattıkları ürünlerin fabrika çıkış fiyatlarını ölçer. Ham madde ve enerji fiyatlarından daha hızlı etkilenir; işletmelerin maliyet hesaplarında, bazı sözleşme ve endekslemelerde kullanılır. İki endeks aynı dönemde farklı sonuçlar verebilir; hesapta hangisinin kullanılacağı sözleşmede ya da mevzuatta yazılıdır."
      ],
      table: {
        head: ["Özellik", "TÜFE", "Yİ-ÜFE"],
        rows: [
          ["Ölçtüğü fiyat", "Tüketicinin ödediği", "Üreticinin satış fiyatı"],
          ["Kullanım", "Maaş, kira, emekli aylığı, alım gücü", "Maliyet, bazı sözleşmeler ve endekslemeler"],
          ["Yayımlayan", "TÜİK, aylık", "TÜİK, aylık"]
        ]
      }
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yıllık oranları toplamak:</strong> Çok yıllı hesapta oranlar çarpılır; toplamak sonucu küçültür.",
        "<strong>Reel getiriyi çıkarma ile bulmak:</strong> Yüksek enflasyonda Fisher denklemini kullanın.",
        "<strong>Farklı dönemleri karşılaştırmak:</strong> Maaş artışını ve enflasyonu aynı 12 ay için alın.",
        "<strong>Brüt getiriyi kullanmak:</strong> Stopaj ve masraf sonrası net getiriyi enflasyonla karşılaştırın.",
        "<strong>Ortalama ile yıllığı karıştırmak:</strong> 12 aylık ortalama TÜFE ile yıllık TÜFE farklı ölçülerdir; kira hesabında hangisinin geçerli olduğunu kontrol edin."
      ],
      after: [
        "İki değer arasındaki yüzde değişimi hızlıca bulmak için [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracını kullanabilirsiniz. Tüm araçlar tarayıcınızda çalışır ve girdiğiniz rakamları saklamaz."
      ]
    }
  ],
  faq: [
    ["Enflasyona göre paranın bugünkü değeri nasıl hesaplanır?", "Eski tutar, güncel TÜFE endeksinin o tarihteki TÜFE endeksine oranıyla çarpılır. Yalnızca yıllık oranlar biliniyorsa her yılın (1 + enflasyon) çarpanı art arda çarpılarak toplam artış katsayısı bulunur."],
    ["Reel getiri nedir, nasıl hesaplanır?", "Reel getiri, enflasyondan arındırılmış gerçek kazançtır. (1 + nominal getiri) ÷ (1 + enflasyon) − 1 formülüyle bulunur; %45 faiz ve %35 enflasyonda reel getiri %10 değil %7,41'dir."],
    ["TÜFE ile ÜFE farkı nedir?", "TÜFE tüketicilerin satın aldığı mal ve hizmetlerin fiyatlarını, Yİ-ÜFE ise üreticilerin yurt içi satış fiyatlarını ölçer. Maaş, kira ve alım gücü hesaplarında genellikle TÜFE, maliyet hesaplarında ÜFE kullanılır."],
    ["Maaşım enflasyon karşısında ne kadar eridi?", "Yeni maaşı eski maaşa bölün, sonucu (1 + dönem enflasyonu) ile bölüp 1 çıkarın. 30.000 TL'den 40.000 TL'ye çıkan maaş %40 enflasyonda reel olarak yaklaşık %4,8 küçülmüş demektir."],
    ["Yıllık enflasyon aylıktan nasıl bulunur?", "Her ayın (1 + aylık oran) çarpanları birbiriyle çarpılır ve sonuçtan 1 çıkarılır. Her ay %3 enflasyon olursa yıllık oran toplama ile bulunan %36 değil, 1,03 üzeri 12 eksi 1 ile %42,58 olur."],
    ["Faiz enflasyonu geçiyor mu nasıl anlarım?", "Kesinti sonrası net faiz oranınızı aynı dönemin enflasyonuyla Fisher denklemine koyun. Sonuç sıfırdan büyükse faiz enflasyonu geçiyor, küçükse paranızın alım gücü faize rağmen azalıyor demektir."],
    ["Fisher denklemi nedir?", "Nominal faiz, reel faiz ve enflasyon arasındaki ilişkiyi kuran denklemdir: (1 + nominal) = (1 + reel) × (1 + enflasyon). Buradan reel faiz, nominal çarpanın enflasyon çarpanına bölünüp 1 çıkarılmasıyla bulunur."],
    ["Alım gücü nasıl hesaplanır?", "Paranın alım gücü 1 ÷ (1 + enflasyon) ile çarpılarak bulunur. %40 enflasyonda 100 TL'nin alım gücü 71,43 TL'ye iner; yani kayıp 1 − 1 ÷ 1,40 formülüyle %28,6 olarak hesaplanır."]
  ],
  tools: ["enflasyon-hesapla", "reel-faiz-hesapla", "satin-alma-gucu-hesapla", "yuzde-degisim-hesapla"],
  related: ["bilesik-faiz-nedir", "50-30-20-butce-kurali", "kyk-borcu-nasil-hesaplanir"],
  sources: [
    ["TÜİK – Tüketici Fiyat Endeksi", "https://www.tuik.gov.tr/"],
    ["TCMB – Enflasyon verileri ve para politikası", "https://www.tcmb.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, örneklerdeki oranlar temsilîdir"
};
