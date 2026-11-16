export default {
  slug: "dbm-nedir-wifi-sinyal-gucu",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "dBm Nedir? Wi-Fi Sinyal Gücü -50 ve -70 dBm İyi mi, Nasıl Yorumlanır",
  pageTitle: "dBm Nedir? Wi-Fi Sinyal Gücü -50, -70 dBm Ne Demek",
  description: "dBm, gücün 1 miliwatta göre desibel cinsinden değeridir. Wi-Fi'da -50 dBm çok iyi, -70 dBm sınırda, -80 zayıftır. dBm watt çevirme ve 3 dB kuralı.",
  keywords: ["dbm nedir", "wifi sinyal gücü dbm", "-70 dbm iyi mi", "dbm watt çevirme", "desibel nedir", "mobil sinyal gücü", "rssi nedir", "-50 dbm ne demek"],
  lead: "dBm, bir gücün <strong>1 miliwatta göre kaç desibel</strong> olduğunu gösteren birimdir: 0 dBm = 1 mW, 20 dBm = 100 mW, -70 dBm ise 0,0000001 mW'tır. Wi-Fi'da alınan sinyal neredeyse her zaman 1 mW'ın çok altında olduğu için değerler negatiftir ve sıfıra yaklaştıkça sinyal güçlenir. Kabaca -50 dBm ve üstü mükemmel, -67 dBm görüntülü görüşme için alt sınır, -70 dBm idare eder, -80 dBm ve altı zayıftır. Bu sayfada formülü, watt çevirmeyi ve modem yerleşimini anlatıyoruz.",
  kisaCevap: [
    "dBm = 10 × log<sub>10</sub>(güç mW ÷ 1 mW); 0 dBm tam 1 mW'tır.",
    "Her +3 dB gücü yaklaşık 2 katına, her +10 dB tam 10 katına çıkarır; -3 dB yarıya indirir.",
    "Wi-Fi'da -30 ile -50 dBm arası mükemmel, -50 ile -67 dBm arası iyi, -67 ile -70 dBm sınırda, -80 dBm altı zayıftır.",
    "-70 dBm = 10<sup>-7</sup> mW = 100 pikowatt; -50 dBm bundan tam 100 kat güçlüdür.",
    "Watt'a çevirme: mW = 10<sup>(dBm ÷ 10)</sup>; W = mW ÷ 1.000.",
    "RSSI cihazın ölçtüğü alınan sinyal göstergesidir; çoğu telefon ve modem onu dBm cinsinden gösterir ama bazı yonga setleri birimsiz ölçek kullanır."
  ],
  figure: {
    alt: "Wi-Fi sinyal gücü ölçeği: -30 dBm'den -90 dBm'e kadar renkli çubuk; -50 mükemmel, -67 görüntülü görüşme sınırı, -70 idare eder, -80 zayıf, -90 kullanılamaz; altta her 10 dB'nin 10 kat güç farkı olduğu gösterilir.",
    caption: "Ölçek logaritmiktir: -50 dBm ile -70 dBm arasında yalnızca 20 sayı vardır ama güç farkı 100 kattır. Değerler sıfıra yaklaştıkça sinyal güçlenir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Wi-Fi sinyal gücü (alınan güç, dBm)</text>
  <rect x="40" y="60" width="160" height="46" class="oks"/>
  <rect x="200" y="60" width="136" height="46" class="oks"/>
  <rect x="336" y="60" width="24" height="46" class="ps"/>
  <rect x="360" y="60" width="160" height="46" class="ps"/>
  <rect x="520" y="60" width="160" height="46" class="dgs"/>
  <g class="sm mid">
    <text x="120" y="88" class="b">Mükemmel</text>
    <text x="268" y="88" class="b">İyi</text>
    <text x="440" y="88" class="b">İdare eder</text>
    <text x="600" y="88" class="b">Zayıf / kopuk</text>
  </g>
  <line x1="40" y1="114" x2="680" y2="114" class="st" fill="none"/>
  <g class="sm mid">
    <line x1="40" y1="110" x2="40" y2="122" class="st" fill="none"/><text x="40" y="138">-30</text>
    <line x1="200" y1="110" x2="200" y2="122" class="st" fill="none"/><text x="200" y="138" class="b">-50</text>
    <line x1="336" y1="110" x2="336" y2="122" class="sp sw" fill="none"/><text x="336" y="138" class="b p">-67</text>
    <line x1="360" y1="110" x2="360" y2="122" class="st" fill="none"/><text x="372" y="138">-70</text>
    <line x1="520" y1="110" x2="520" y2="122" class="st" fill="none"/><text x="520" y="138">-80</text>
    <line x1="680" y1="110" x2="680" y2="122" class="st" fill="none"/><text x="680" y="138">-90</text>
  </g>
  <text x="336" y="160" class="sm mid p">görüntülü görüşme ve akış için önerilen alt sınır</text>
  <rect x="40" y="184" width="640" height="88" rx="8" class="sf sb"/><rect x="40" y="184" width="8" height="88" class="p"/>
  <text x="62" y="208" class="b">dBm → miliwatt: mW = 10^(dBm ÷ 10)</text>
  <text x="62" y="232" class="sm t2">20 dBm = 100 mW (modem çıkışı) · 0 dBm = 1 mW · -30 dBm = 0,001 mW</text>
  <text x="62" y="254" class="sm t2">-50 dBm = 0,00001 mW · -70 dBm = 0,0000001 mW (100 kat daha zayıf)</text>
  <rect x="40" y="290" width="200" height="70" rx="8" class="ps"/>
  <text x="140" y="318" class="b mid">+3 dB</text><text x="140" y="342" class="sm mid">güç ≈ 2 kat</text>
  <rect x="260" y="290" width="200" height="70" rx="8" class="ps"/>
  <text x="360" y="318" class="b mid">+10 dB</text><text x="360" y="342" class="sm mid">güç 10 kat</text>
  <rect x="480" y="290" width="200" height="70" rx="8" class="dgs"/>
  <text x="580" y="318" class="b mid">-20 dB</text><text x="580" y="342" class="sm mid">güç 100'de 1</text>
</svg>`
  },
  sections: [
    {
      h: "dBm nedir, neden desibel kullanılır?",
      p: [
        "Radyo sinyalleri çok geniş bir aralıkta değişir. Bir modemin anteninden çıkan güç yaklaşık 0,1 watt iken, birkaç oda ötedeki telefonun aldığı güç bunun milyarda biri kadar olabilir. Bu kadar farklı sayıları virgülden sonra sıfırlarla yazmak hem zordur hem de karşılaştırmayı imkânsız hâle getirir. Desibel (dB) ölçeği bu sorunu logaritma ile çözer: her 10 dB'lik adım gücün 10 kat değiştiğini gösterir.",
        "<strong>dB</strong> tek başına iki gücün oranıdır; bir referans söylenmeden mutlak bir değer anlatmaz. <strong>dBm</strong> ise referansı sabitler: \"m\" harfi 1 miliwattı temsil eder. Yani dBm, ölçülen gücün 1 mW'a oranının desibel cinsinden ifadesidir. Benzer şekilde dBW 1 watta, dBi ise anten kazancında ideal yayıcıya göre ölçülür.",
        "Desibelin genel mantığını ve ses ölçümündeki kullanımını merak ediyorsanız [[bilgi:desibel-nedir-kac-db-zararli|desibel yazısı]] aynı logaritmik kuralı sesle anlatır; [[bilgi:logaritma-nasil-hesaplanir|logaritma yazısı]] ise matematik temelini verir."
      ]
    },
    {
      h: "dBm formülü ve watt çevirme",
      formula: "dBm = 10 × log10(P ÷ 1 mW)\nP (mW) = 10^(dBm ÷ 10)\nP (W) = 10^((dBm − 30) ÷ 10)\ndBW = dBm − 30",
      p: [
        "Formülün mantığı basittir: gücü miliwatt cinsinden yazın, 10 tabanında logaritmasını alın ve 10 ile çarpın. Ters yöndeyse dBm değerini 10'a bölün ve 10'un o kuvvetini alın. 1 W = 1.000 mW olduğu için watt cinsinden sonuç için 30 dB çıkarmak yeterlidir."
      ],
      table: {
        head: ["dBm", "Miliwatt", "Watt", "Nerede görülür"],
        rows: [
          ["+30 dBm", "1.000 mW", "1 W", "Bazı telsiz ve baz istasyonu çıkışları"],
          ["+20 dBm", "100 mW", "0,1 W", "Ev modemi verici gücü (2,4 GHz tipik üst sınır)"],
          ["+10 dBm", "10 mW", "0,01 W", "Küçük kablosuz modüller"],
          ["0 dBm", "1 mW", "0,001 W", "Referans noktası"],
          ["-30 dBm", "0,001 mW", "1 mikrowatt", "Modemin hemen yanındaki telefon"],
          ["-50 dBm", "0,00001 mW", "10 nanowatt", "Aynı odada mükemmel sinyal"],
          ["-70 dBm", "0,0000001 mW", "100 pikowatt", "Birkaç duvar arkası, sınırda"],
          ["-90 dBm", "0,000000001 mW", "1 pikowatt", "Bağlantı kopmak üzere"]
        ],
        caption: "Tablodaki kullanım örnekleri temsilidir; cihaz, frekans ve mevzuata göre değişir."
      },
      after: [
        "Hesabı elle yapmak istemiyorsanız [[arac:dbm-watt-cevir|dBm Watt Çevirici]] dBm, mW, W ve dBW arasında anında dönüşüm yapar. İki ölçüm arasındaki kazanç ya da kaybı bulmak için [[arac:desibel-hesapla|Desibel Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "dBm neden negatif değerlerdir?",
      p: [
        "Logaritma 1'den küçük sayılar için negatif sonuç verir. Telefonunuzun ya da dizüstü bilgisayarınızın aldığı Wi-Fi sinyali 1 mW'ın çok altında olduğundan oran 1'den küçüktür ve dBm değeri eksi çıkar. Bu yüzden -40 dBm, -70 dBm'den <strong>daha güçlüdür</strong>; eksi işareti \"referanstan ne kadar zayıf\" demektir.",
        "Verici tarafında ise durum terstir. Modemin anteninden çıkan güç 1 mW'tan büyüktür ve pozitif dBm ile yazılır. Verici 20 dBm ile yayın yapıp alıcı -60 dBm ölçüyorsa, yol boyunca 80 dB kayıp yaşanmış demektir; bu da gücün 100 milyonda birine düştüğünü gösterir. Duvarlar, mesafe ve diğer engeller bu kaybı oluşturur."
      ]
    },
    {
      h: "Wi-Fi sinyalinde -50 ve -70 dBm ne anlama gelir?",
      p: [
        "Wi-Fi için kullanılan eşikler sektörde genel kabul gören yaklaşık değerlerdir; kesin bir standart değildir. Cihazın anteni, kanal genişliği ve ortamdaki gürültü aynı dBm değerinde farklı hız verebilir. Yine de aşağıdaki tablo gerçek hayatta oldukça isabetli bir rehberdir."
      ],
      table: {
        head: ["Alınan sinyal", "Değerlendirme", "Ne beklenir"],
        rows: [
          ["-30 ile -50 dBm", "Mükemmel", "En yüksek hız; genellikle modemle aynı odada"],
          ["-50 ile -60 dBm", "Çok iyi", "4K video, oyun ve büyük indirmeler sorunsuz"],
          ["-60 ile -67 dBm", "İyi", "Görüntülü görüşme ve akış için güvenilir"],
          ["-67 ile -70 dBm", "Sınırda", "Web ve e-posta çalışır, görüntülü görüşmede takılma olabilir"],
          ["-70 ile -80 dBm", "Zayıf", "Yavaş ve kararsız bağlantı, sık yeniden bağlanma"],
          ["-80 dBm altı", "Çok zayıf", "Bağlantı kopar ya da hiç kurulamaz"]
        ]
      },
      after: [
        "Burada önemli olan yalnızca sinyal değil, sinyalin gürültüye oranıdır (SNR). Ortamdaki gürültü tabanı -95 dBm ise -70 dBm'lik sinyal 25 dB SNR verir; bu, temel kullanım için yeterlidir. Kalabalık apartmanlarda gürültü yükseldiğinde aynı sinyal daha düşük hız sağlar. Ölçtüğünüz hızın paketinize uygun olup olmadığını [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı yazısıyla]] karşılaştırabilirsiniz."
      ]
    },
    {
      h: "3 dB ve 10 dB kuralı: çözümlü örnekler",
      p: [
        "Desibelle çalışmanın en pratik yanı, çarpma işleminin toplamaya dönüşmesidir. Bir kuvvetlendirici gücü iki katına çıkarıyorsa +3 dB, bir kablo gücü yarıya indiriyorsa -3 dB eklersiniz. Bu kuralları bilmek, hesap makinesine gerek kalmadan hızlı tahmin yapmayı sağlar."
      ],
      ol: [
        "<strong>Örnek 1:</strong> Telefon önce -50 dBm, başka bir odada -70 dBm ölçüyor. Fark 20 dB'dir; 10<sup>20/10</sup> = 100. İkinci odadaki güç ilk odanın yüzde biridir.",
        "<strong>Örnek 2:</strong> Modem 20 dBm (100 mW) yayın yapıyor; 17 dBm'e düşürülürse 3 dB azalmış olur ve güç yaklaşık 50 mW'a iner.",
        "<strong>Örnek 3:</strong> -67 dBm'i watt'a çevirelim: 10<sup>-67/10</sup> = 10<sup>-6,7</sup> ≈ 2,0 × 10<sup>-7</sup> mW, yani yaklaşık 200 pikowatt.",
        "<strong>Örnek 4:</strong> 5 dBi kazançlı bir anten, ideal yayıcıya göre gücü belirli bir yönde 10<sup>0,5</sup> ≈ 3,2 kat yoğunlaştırır. Anten gücü artırmaz, yönlendirir."
      ],
      after: [
        "Bu örneklerde dikkat edilmesi gereken nokta, dB'nin oranı, dBm'nin mutlak gücü anlatmasıdır. İki dBm değeri arasındaki fark dB'dir; dBm ile dB toplanabilir (20 dBm + 3 dB = 23 dBm) ama iki dBm değeri doğrudan toplanmaz. İki kaynağın gücünü toplamak için önce mW'a çevirip toplamak, sonra tekrar dBm'e dönmek gerekir: 0 dBm + 0 dBm = 2 mW = 3 dBm."
      ]
    },
    {
      h: "Mobil hat sinyal gücü kaç dBm olmalı?",
      p: [
        "Mobil şebekelerde farklı nesiller farklı göstergeler kullanır. 2G ve 3G'de genellikle RSSI (alınan toplam sinyal gücü), 4G ve 5G'de ise RSRP (referans sinyal alınan gücü) dBm olarak raporlanır. RSRP tek bir referans taşıyıcının gücünü ölçtüğü için RSSI'dan daha düşük sayılar verir; iki değeri doğrudan kıyaslamamak gerekir."
      ],
      table: {
        head: ["4G/5G RSRP", "Değerlendirme"],
        rows: [
          ["-80 dBm ve üstü", "Mükemmel"],
          ["-80 ile -90 dBm", "İyi"],
          ["-90 ile -100 dBm", "Orta; iç mekânda hız düşebilir"],
          ["-100 ile -110 dBm", "Zayıf"],
          ["-110 dBm altı", "Çok zayıf, bağlantı kopabilir"]
        ],
        caption: "Değerler yaklaşık sınıflandırmadır; operatöre, frekans bandına ve cihaza göre farklılık gösterir."
      },
      after: [
        "Telefonların ekranındaki çubuk sayısı üreticiye göre farklı eşiklere bağlıdır; aynı yerde iki telefon farklı çubuk gösterebilir. Gerçek dBm değerini görmek için çoğu telefonda Ayarlar bölümündeki \"Telefon hakkında\" ya da \"Durum\" menüsüne bakabilirsiniz."
      ]
    },
    {
      h: "RSSI ile dBm aynı mı?",
      p: [
        "RSSI (Received Signal Strength Indicator), cihazın aldığı sinyalin gücünü gösteren bir <strong>göstergedir</strong>, birim değildir. Birçok modem, işletim sistemi ve telefon RSSI'ı doğrudan dBm cinsinden raporlar; bu durumda ikisi pratikte aynı şeyi anlatır. Bazı eski kablosuz yonga setleri ise RSSI'ı 0–100 ya da 0–255 gibi üreticiye özel birimsiz bir ölçekte verir.",
        "Bir ekranda \"Sinyal: %70\" gibi bir yüzde görüyorsanız bu, ham dBm değerinin üretici tarafından yüzdeye dönüştürülmüş hâlidir ve cihazdan cihaza değişir. Karşılaştırma yapacaksanız dBm cinsinden değere bakmak en güvenilir yoldur."
      ]
    },
    {
      h: "Modem yeri sinyali nasıl etkiler?",
      p: [
        "Kablosuz sinyal mesafeyle hızla zayıflar. Serbest uzayda mesafe iki katına çıktığında güç dörtte birine iner, bu da yaklaşık 6 dB kayıp demektir. Duvarlar, beton, metal ve su (akvaryum, insan vücudu) ek kayıp ekler. Betonarme bir duvar 10–15 dB, betonarme döşeme ise daha fazla kayıp yaratabilir."
      ],
      ul: [
        "<strong>Merkezî konum:</strong> Modemi evin ortasına, yerden yüksek bir rafa koyun; köşe ve dolap içi en kötü konumlardır.",
        "<strong>Metal ve sudan uzak:</strong> Buzdolabı, çamaşır makinesi, ayna ve akvaryum sinyali yansıtır ya da emer.",
        "<strong>Bant seçimi:</strong> 2,4 GHz duvarları daha iyi geçer ama daha kalabalıktır; 5 GHz daha hızlıdır ama mesafede daha çabuk zayıflar.",
        "<strong>Kanal:</strong> Komşu ağlarla aynı kanalı paylaşmak gürültüyü artırır; modem arayüzünden daha boş bir kanala geçmek SNR'ı iyileştirir.",
        "<strong>Ölçerek karar verin:</strong> Değişiklik öncesi ve sonrası aynı noktada dBm ölçün; 6 dB iyileşme yaklaşık dört kat daha güçlü sinyal demektir."
      ],
      after: [
        "Çok katlı ya da geniş evlerde tek modemle her yerde -67 dBm'in üzerine çıkmak zor olabilir. Bu durumda erişim noktası ya da örgü (mesh) sistemi gibi ek cihazlar düşünülebilir; kablolu bağlantı her zaman en kararlı seçenektir."
      ]
    }
  ],
  faq: [
    ["dBm nedir?", "dBm, bir gücün 1 miliwatta oranının desibel cinsinden ifadesidir. 0 dBm tam 1 mW, 10 dBm 10 mW, -30 dBm ise 0,001 mW eder. Kablosuz iletişimde hem verici hem alıcı gücünü yazmak için kullanılır."],
    ["Wi-Fi sinyalinde -50 ve -70 dBm ne anlama gelir?", "-50 dBm mükemmel bir sinyaldir ve genellikle modemle aynı odada görülür. -70 dBm ise sınırdadır; web gezintisi çalışır ama görüntülü görüşme ve yüksek kaliteli akışta takılmalar yaşanabilir. İkisi arasında 100 kat güç farkı vardır."],
    ["dBm neden negatif değerlerdir?", "Alınan Wi-Fi sinyali 1 mW'ın çok altında olduğu için 1'den küçük oranın logaritması negatif çıkar. Eksi değer sıfıra ne kadar yakınsa sinyal o kadar güçlüdür; -40 dBm, -80 dBm'den çok daha iyidir."],
    ["dBm watt'a nasıl çevrilir?", "dBm değerini 10'a bölüp 10'un bu kuvvetini alırsanız miliwatt bulursunuz; watt için ayrıca 1.000'e bölün. Örneğin 20 dBm için 10 üzeri 2 eşittir 100 mW, yani 0,1 W eder."],
    ["3 dB artış gücü kaç kat artırır?", "3 dB artış gücü yaklaşık iki katına çıkarır, çünkü 10 üzeri 0,3 yaklaşık 2'dir. 10 dB artış ise gücü tam 10 katına çıkarır; aynı mantıkla 3 dB azalma gücü yarıya indirir."],
    ["Mobil hat sinyal gücü kaç dBm olmalı?", "4G ve 5G'de RSRP değeri -80 dBm ve üstündeyse mükemmel, -80 ile -100 dBm arasında iyi ya da orta, -110 dBm altında çok zayıf kabul edilir. Değerler operatöre ve frekansa göre değişebilir."],
    ["RSSI ile dBm aynı mı?", "RSSI alınan sinyal gücünü gösteren bir göstergedir; çoğu cihaz bunu dBm cinsinden raporlar ve bu durumda ikisi aynı anlama gelir. Bazı yonga setleri ise üreticiye özel birimsiz bir ölçek kullanır, bu nedenle farklı cihazları kıyaslarken dikkat edin."],
    ["Modem yeri sinyali nasıl etkiler?", "Mesafe iki katına çıkınca sinyal yaklaşık 6 dB zayıflar; betonarme duvarlar 10 dB ve üzeri ek kayıp yaratır. Modemi evin ortasında, yüksekte ve metal eşyalardan uzak tutmak dBm değerini belirgin biçimde iyileştirir."],
    ["İki sinyalin dBm değeri toplanabilir mi?", "İki dBm değeri doğrudan toplanmaz; önce miliwatta çevrilip toplanır, sonra yeniden dBm'e dönülür. İki adet 0 dBm kaynak 2 mW eder, bu da yaklaşık 3 dBm'dir, 0 dBm değil."]
  ],
  tools: ["dbm-watt-cevir", "desibel-hesapla"],
  related: ["internet-hizi-kac-mbps-olmali", "logaritma-nasil-hesaplanir"],
  sources: [
    ["Bilgi Teknolojileri ve İletişim Kurumu (BTK)", "https://www.btk.gov.tr/"],
    ["ITU – Uluslararası Telekomünikasyon Birliği", "https://www.itu.int/"]
  ]
};
