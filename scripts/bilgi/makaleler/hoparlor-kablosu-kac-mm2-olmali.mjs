export default {
  slug: "hoparlor-kablosu-kac-mm2-olmali",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Hoparlör Kablosu Kaç mm² Olmalı? Uzunluk, Empedans ve AWG Seçimi",
  pageTitle: "Hoparlör Kablosu Kaç mm² Olmalı? Uzunluk ve Empedansa Göre",
  description: "Hoparlör kablosu kesiti, kablo direncinin hoparlör empedansının %5'ini geçmeyeceği şekilde seçilir. 8 ve 4 ohm için uzunluğa göre mm² tablosu, AWG karşılığı, örnekler.",
  keywords: ["hoparlör kablosu kaç mm", "hoparlör kablosu seçimi", "hoparlör kablo kesiti", "awg mm2 hoparlör", "4 ohm hoparlör kablosu", "hoparlör kablo uzunluğu", "2x1,5 hoparlör kablosu", "bi-wiring"],
  lead: "Ev tipi bir ses sisteminde hoparlör kablosu, <strong>kablonun gidiş-dönüş direncinin hoparlör empedansının yaklaşık %5'ini geçmeyeceği</strong> kesitte seçilir. Bu ölçüte göre 8 ohm hoparlörde 10 metreye kadar 1–1,5 mm², 4 ohm hoparlörde 10 metreye kadar 2,5 mm² genellikle yeterlidir; mesafe uzadıkça ve empedans düştükçe kesit büyür. Bu sayfada formülü, uzunluk ve empedansa göre hazır tabloyu, AWG–mm² dönüşümünü, çözümlü örnekleri ve kablo döşerken dikkat edilecekleri bulacaksınız.",
  kisaCevap: [
    "Kablo direnci R = ρ × 2L ÷ A; bakır için ρ ≈ 0,0172 Ω·mm²/m, L tek yön uzunluk, A kesit (mm²).",
    "Yaygın ölçüt: R, hoparlör empedansının %5'ini geçmesin; bu yaklaşık 0,4–0,5 dB'den az seviye kaybı demektir.",
    "Gereken en küçük kesit A = 0,0172 × 2L ÷ (Z × 0,05); 8 ohm ve 10 m için 0,86 mm², 4 ohm ve 10 m için 1,72 mm².",
    "4 ohm hoparlör, aynı uzunlukta 8 ohm hoparlörün iki katı kesit ister.",
    "16 AWG ≈ 1,31 mm², 14 AWG ≈ 2,08 mm², 12 AWG ≈ 3,31 mm²; AWG numarası küçüldükçe kablo kalınlaşır.",
    "Bakır kaplı alüminyum (CCA) kablonun direnci daha yüksektir; bu tür kabloda bir üst kesiti seçin."
  ],
  figure: {
    alt: "Kablo uzunluğuna göre gereken en küçük hoparlör kablosu kesiti: 8 ohm ve 4 ohm hoparlör için 5, 10, 20 ve 30 metrede mm² değerleri çubuk grafikte; 4 ohm her uzunlukta iki kat kesit istiyor.",
    caption: "Çubuklar, kablo direncinin empedansın %5'inde kaldığı en küçük bakır kesiti gösterir. Satın alırken bunun bir üstündeki standart kesiti (0,75 – 1 – 1,5 – 2,5 – 4 – 6 mm²) seçin.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Gereken en küçük kesit (mm²), %5 ölçütü</text>
  <line x1="80" y1="320" x2="690" y2="320" class="st" fill="none"/>
  <line x1="80" y1="60" x2="80" y2="320" class="st" fill="none"/>
  <g class="sm end mu">
    <text x="72" y="324">0</text><text x="72" y="274">1</text><text x="72" y="224">2</text><text x="72" y="174">3</text><text x="72" y="124">4</text><text x="72" y="74">5</text>
  </g>
  <line x1="80" y1="270" x2="690" y2="270" class="sb dash" fill="none"/>
  <line x1="80" y1="220" x2="690" y2="220" class="sb dash" fill="none"/>
  <line x1="80" y1="170" x2="690" y2="170" class="sb dash" fill="none"/>
  <line x1="80" y1="120" x2="690" y2="120" class="sb dash" fill="none"/>
  <rect x="110" y="298" width="50" height="22" class="ps"/><rect x="162" y="277" width="50" height="43" class="p"/>
  <rect x="260" y="277" width="50" height="43" class="ps"/><rect x="312" y="234" width="50" height="86" class="p"/>
  <rect x="410" y="234" width="50" height="86" class="ps"/><rect x="462" y="148" width="50" height="172" class="p"/>
  <rect x="560" y="191" width="50" height="129" class="ps"/><rect x="612" y="62" width="50" height="258" class="p"/>
  <g class="sm mid b">
    <text x="135" y="292">0,43</text><text x="187" y="271">0,86</text>
    <text x="285" y="271">0,86</text><text x="337" y="228">1,72</text>
    <text x="435" y="228">1,72</text><text x="487" y="142">3,44</text>
    <text x="585" y="185">2,58</text><text x="637" y="56">5,16</text>
  </g>
  <g class="mid">
    <text x="161" y="344">5 m</text><text x="311" y="344">10 m</text><text x="461" y="344">20 m</text><text x="611" y="344">30 m</text>
  </g>
  <rect x="200" y="368" width="18" height="18" class="ps"/><text x="226" y="382" class="sm">8 ohm hoparlör</text>
  <rect x="380" y="368" width="18" height="18" class="p"/><text x="406" y="382" class="sm">4 ohm hoparlör</text>
  <text x="360" y="410" class="sm mid t2">A = 0,0172 × 2L ÷ (Z × 0,05) · L: amfiden hoparlöre tek yön uzunluk</text>
</svg>`
  },
  sections: [
    {
      h: "Hoparlör kablosunun kesiti neden önemlidir?",
      p: [
        "Hoparlör kablosu, amfinin çıkışı ile hoparlör arasında yüksek akım taşıyan bir iletkendir. Her iletken gibi onun da bir direnci vardır ve bu direnç amfi ile hoparlör arasına seri olarak girer. Direnç ne kadar büyükse amfinin ürettiği gücün o kadar büyük kısmı kabloda ısıya dönüşür, hoparlöre ulaşan ses seviyesi düşer.",
        "Daha az bilinen ikinci etki, amfinin hoparlör üzerindeki denetimidir. Amfiler çok düşük çıkış direncine sahiptir ve hoparlör konisinin hareketini sıkı tutar. Kablo direnci büyüdükçe bu denetim zayıflar; özellikle bas bölgesinde ses daha yumuşak, daha az tanımlı hâle gelebilir. Hoparlörün empedansı frekansa göre değiştiği için yüksek kablo direnci frekans tepkisinde de küçük dalgalanmalar yaratır.",
        "İyi haber şu ki bu etkileri ihmal edilebilir düzeye indirmek için çok kalın ya da özel kablolara gerek yoktur. Doğru kesit, basit bir direnç hesabıyla bulunur."
      ]
    },
    {
      h: "Formül: hoparlör kablosu kesiti nasıl hesaplanır?",
      p: [
        "Kablonun direnci, iletkenin özdirenci ile uzunluğunun çarpımının kesite bölünmesiyle bulunur. Hoparlör devresinde akım hem gidiş hem dönüş telinden geçtiği için uzunluk iki kez sayılır. Bakırın 20 °C'deki özdirenci yaklaşık 0,0172 Ω·mm²/m'dir."
      ],
      formula: "Kablo direnci: R = ρ × 2L ÷ A\nGereken en küçük kesit: A = ρ × 2L ÷ (Z × k)\nSeviye kaybı (dB) ≈ 20 × log₁₀((Z + R) ÷ Z)\nρ = 0,0172 Ω·mm²/m (bakır) · L = tek yön uzunluk (m) · Z = hoparlör empedansı (Ω) · k = izin verilen oran (0,05)",
      after: [
        "Yaygın kabul gören pratik ölçüt, kablo direncinin hoparlör empedansının %5'ini geçmemesidir (k = 0,05). Bu sınırda seviye kaybı yarım desibelin altında kalır; çoğu dinleyici bu farkı duyamaz. Daha titiz kurulumlarda %2–3 ölçütü kullanılabilir. Direnç ve akım ilişkisinin temelini [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Uzunluk ve empedansa göre kesit tablosu",
      table: {
        head: ["Tek yön uzunluk", "8 ohm: en küçük", "8 ohm: önerilen", "4 ohm: en küçük", "4 ohm: önerilen"],
        rows: [
          ["5 m", "0,43 mm²", "0,75 mm²", "0,86 mm²", "1,5 mm²"],
          ["10 m", "0,86 mm²", "1,5 mm²", "1,72 mm²", "2,5 mm²"],
          ["15 m", "1,29 mm²", "1,5 mm²", "2,58 mm²", "4 mm²"],
          ["20 m", "1,72 mm²", "2,5 mm²", "3,44 mm²", "4 mm²"],
          ["30 m", "2,58 mm²", "4 mm²", "5,16 mm²", "6 mm²"]
        ],
        caption: "Bakır iletken, %5 ölçütü. \"Önerilen\" sütunu, en küçük değerin üstündeki standart kesittir. 6 ohm hoparlörler için iki sütunun arasındaki değerler kullanılabilir."
      },
      after: [
        "Kendi uzunluğunuz ve empedansınızla hesap yapmak için [[arac:hoparlor-kablo-hesapla|Hoparlör Kablosu Kesiti Hesaplama]] aracı en küçük kesiti, seçtiğiniz kablonun direncini ve seviye kaybını desibel olarak gösterir."
      ]
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1: Salon, 8 ohm, 10 m.</strong> Amfi televizyon ünitesinde, arka hoparlör 10 metre uzakta, hoparlör 8 ohm. En küçük kesit A = 0,0172 × 20 ÷ (8 × 0,05) = 0,344 ÷ 0,4 = 0,86 mm². 1,5 mm² kablo seçerseniz direnç R = 0,0172 × 20 ÷ 1,5 = 0,229 Ω olur; bu empedansın %2,9'udur ve seviye kaybı 20 × log₁₀(8,229 ÷ 8) ≈ 0,25 dB'dir. Kayıp duyulmaz.",
        "<strong>Örnek 2: Aynı mesafe, 4 ohm hoparlör.</strong> Bu kez A = 0,344 ÷ (4 × 0,05) = 1,72 mm². 1,5 mm² kablo kullanırsanız direnç yine 0,229 Ω'dur ama bu 4 ohm'un %5,7'sine denk gelir ve kayıp yaklaşık 0,48 dB'e çıkar. Ölçütü tam karşılamak için 2,5 mm² seçmek gerekir.",
        "<strong>Örnek 3: İnce kablo tuzağı.</strong> Hazır setlerle gelen 0,75 mm²'lik kabloyu 4 ohm hoparlörde 10 metre çekerseniz direnç 0,459 Ω, yani empedansın %11,5'i olur ve kayıp yaklaşık 0,94 dB'e ulaşır. Bu kablolar kısa mesafe için tasarlanmıştır.",
        "<strong>Örnek 4: Uzun hat.</strong> Bahçedeki 4 ohm hoparlöre 20 metre kablo çekeceksiniz. En küçük kesit 3,44 mm²'dir. 2,5 mm² ile direnç 0,275 Ω (%6,9) olur; ölçüt aşıldığı için 4 mm² seçilir."
      ]
    },
    {
      h: "4 ohm ve 8 ohm hoparlörde kablo seçimi neden farklıdır?",
      p: [
        "Kablo direnci sabittir, ama onun etkisi hoparlörün empedansına oranla değerlendirilir. 0,2 ohm'luk bir kablo, 8 ohm'luk hoparlörün yanında %2,5'lik küçük bir pay iken 4 ohm'luk hoparlörde %5'lik bir pay olur. Bu yüzden düşük empedanslı hoparlörler aynı kayıp oranı için daha düşük dirençli, yani daha kalın kablo ister: 4 ohm hoparlör, aynı uzunluktaki 8 ohm hoparlörün tam iki katı kesite ihtiyaç duyar.",
        "Ayrıca hoparlörün üzerinde yazan değer nominal empedanstır. Gerçek empedans frekansa göre değişir; 8 ohm etiketli bir hoparlör bazı frekanslarda 5–6 ohm'a kadar inebilir. Kesit seçerken sınırda kalmak yerine bir üst kesite çıkmak bu yüzden mantıklıdır. Empedans kavramının ayrıntısı için [[bilgi:empedans-ve-reaktans-nedir|empedans ve reaktans]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "AWG değeri mm²'ye nasıl çevrilir?",
      p: [
        "AWG (American Wire Gauge), Kuzey Amerika'da kullanılan kablo kalınlığı ölçeğidir. Ters orantılı çalışır: AWG numarası küçüldükçe tel kalınlaşır. Her 3 AWG adımda kesit yaklaşık iki katına, her 6 adımda yaklaşık dört katına çıkar. Yurt dışı kaynaklı ürünlerde ya da yabancı dildeki kurulum rehberlerinde hoparlör kablosu genellikle AWG ile belirtilir."
      ],
      table: {
        head: ["AWG", "Kesit (mm²)", "En yakın metrik kesit", "Tipik kullanım"],
        rows: [
          ["20", "0,52", "0,5 mm²", "Çok kısa masa üstü bağlantı"],
          ["18", "0,82", "0,75 mm²", "Kısa mesafe, 8 ohm"],
          ["16", "1,31", "1,5 mm² (bir üst)", "Ev sineması, 10 m'ye kadar"],
          ["14", "2,08", "2,5 mm² (bir üst)", "4 ohm, orta mesafe"],
          ["12", "3,31", "4 mm² (bir üst)", "Uzun hat, düşük empedans"],
          ["10", "5,26", "6 mm² (bir üst)", "Çok uzun hat, yüksek güç"]
        ]
      },
      after: [
        "AWG numarasını kesite çevirmek ya da elinizdeki metrik kablonun AWG karşılığını bulmak için [[arac:awg-mm2-cevir|AWG mm² Kablo Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Pahalı hoparlör kablosu fark yaratır mı?",
      p: [
        "Ölçülebilir ve duyulabilir farkın ana belirleyicisi kesit ve uzunluktur; yani direnç. Aynı kesitteki iki bakır kablo arasında ev ortamında duyulabilir bir fark beklemek için teknik bir gerekçe yoktur. Özel kılıf, yönlü işaretler ya da yüksek fiyat, doğru kesitte saf bakır bir kablonun yerini tutmaz.",
        "Dikkat etmeniz gereken nokta malzemedir. Piyasada ucuz kabloların önemli bir kısmı bakır kaplı alüminyumdur (CCA). Alüminyumun özdirenci bakırdan yaklaşık %60 daha yüksektir; aynı kesitteki CCA kablo daha fazla kayıp yaratır ve uç bağlantılarda oksitlenmeye daha yatkındır. Etiket ya da satıcı açıklamasında \"OFC\" ya da \"saf bakır\" ibaresine bakın; CCA kullanacaksanız bir üst kesiti seçin."
      ]
    },
    {
      h: "Kutup (+/−) ters bağlanırsa ne olur?",
      p: [
        "Tek bir hoparlörün kutbunu ters bağlamak ona zarar vermez; yalnızca koni ters yönde hareket eder. Sorun, stereo ya da çok kanallı sistemde hoparlörlerden biri ters bağlandığında ortaya çıkar. İki hoparlör birbirinin tersine hareket ettiği için düşük frekanslar kısmen birbirini söndürür, bas zayıflar ve ses görüntüsü dağınık, ortası boş gibi algılanır.",
        "Hoparlör kablolarının bir telinde şerit, yazı ya da farklı renk bulunur. Bu işaretli teli bütün hoparlörlerde ve amfide aynı uca (genellikle kırmızı +) bağlayın. Kurulumdan sonra stereo bir kayıtta ses iki hoparlörün tam ortasından geliyorsa kutuplar doğrudur."
      ]
    },
    {
      h: "Bi-wiring ve duvar içinden kablo geçirirken dikkat edilecekler",
      p: [
        "Bazı hoparlörlerde iki çift bağlantı ucu bulunur; bi-wiring, bas ve tiz bölümlerine amfiden ayrı kablo çekmektir. Toplam iletken kesitini artırdığı için direnç açısından fayda sağlar, ama aynı toplam kesitteki tek kalın kablodan belirgin bir üstünlüğü yoktur. Bi-wiring yapmayacaksanız hoparlörün üzerindeki köprü plakalarını yerinde bırakın."
      ],
      ul: [
        "<strong>Boru kullanın:</strong> Duvar ya da tavan içine kabloyu doğrudan sıva altına gömmek yerine spiral boru içinden geçirin; ileride değiştirmek mümkün olur.",
        "<strong>Elektrik hattından ayırın:</strong> Hoparlör kablosunu şebeke kablolarıyla aynı boruya koymayın, mümkünse paralel uzun mesafelerden kaçının ve kesişmeleri dik açıyla yapın.",
        "<strong>Uygun yalıtım:</strong> Duvar içi ve dış mekân için alev geciktirici ya da UV dayanımlı kılıflı kablo tercih edin.",
        "<strong>Uzunluğu eşitleyin:</strong> Sol ve sağ hoparlöre benzer uzunlukta kablo çekmek iki kanalın kaybını dengeler.",
        "<strong>Uç bağlantısı:</strong> Açık tel uçlarını büküp kalaylamak ya da uygun fiş takmak kısa devre ve oksitlenme riskini azaltır.",
        "<strong>Güvenlik:</strong> Amfi kapalıyken bağlantı yapın; açık tel uçlarının birbirine değmesi amfinin çıkış katına zarar verebilir."
      ],
      after: [
        "Aynı direnç mantığı, şebeke tarafındaki kablolar için de geçerlidir; ancak orada akım taşıma kapasitesi ve elektrik güvenliği kuralları da devreye girer. Bu konuyu [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısı ayrıca ele alır."
      ]
    }
  ],
  faq: [
    ["Hoparlör kablosu kaç mm² olmalı?", "Kablo direnci hoparlör empedansının yüzde beşini geçmemelidir. Bu ölçüte göre 8 ohm hoparlörde 10 metreye kadar 1–1,5 mm², 4 ohm hoparlörde 10 metreye kadar 2,5 mm² kablo genellikle yeterlidir."],
    ["Kablo uzunluğu ses kalitesini nasıl etkiler?", "Uzunluk arttıkça kablo direnci doğrusal olarak artar. Direnç yükseldikçe hoparlöre ulaşan güç azalır ve amfinin koni üzerindeki denetimi zayıflar; bu yüzden uzun hatlarda kesit büyütülür."],
    ["4 ohm ve 8 ohm hoparlörde kablo seçimi neden farklıdır?", "Kablo direncinin etkisi hoparlör empedansına oranla değerlendirilir. Aynı kablo 4 ohm hoparlörde iki kat daha büyük bir pay oluşturduğu için 4 ohm hoparlör, aynı uzunlukta iki kat kesit ister."],
    ["AWG değeri mm²'ye nasıl çevrilir?", "AWG numarası küçüldükçe tel kalınlaşır. 18 AWG yaklaşık 0,82, 16 AWG 1,31, 14 AWG 2,08, 12 AWG 3,31 mm²'dir; her üç adım kesiti yaklaşık iki katına çıkarır."],
    ["Kablo kaybı yüzde kaçı geçmemeli?", "Yaygın pratik ölçüt, kablo direncinin hoparlör empedansının yüzde beşini geçmemesidir. Bu, yaklaşık yarım desibelin altında seviye kaybına karşılık gelir ve çoğu dinleyici için duyulmaz."],
    ["Pahalı hoparlör kablosu fark yaratır mı?", "Duyulabilir farkı belirleyen başlıca etken kesit ve uzunluktur. Doğru kesitte saf bakır kablo yeterlidir; asıl dikkat edilmesi gereken, daha yüksek dirençli bakır kaplı alüminyum kablolardır."],
    ["Kutup (+/−) ters bağlanırsa ne olur?", "Hoparlör zarar görmez, ama stereo sistemde ters bağlanan hoparlör diğeriyle zıt yönde çalışır. Bas zayıflar ve ses görüntüsü dağılır; işaretli teli bütün uçlarda aynı kutba bağlayın."],
    ["Duvar içinden kablo geçirirken nelere dikkat edilmeli?", "Kabloyu boru içinden geçirin, şebeke kablolarıyla aynı boruya koymayın, uygun yalıtımlı kablo seçin ve iki kanala benzer uzunlukta kablo çekin. Bağlantıları amfi kapalıyken yapın."],
    ["2x1,5 hoparlör kablosu ne demek?", "İki damarlı, her damarı 1,5 mm² kesitli kablo demektir. Damarlardan biri gidiş, diğeri dönüş için kullanılır; hesapta kesit olarak 1,5 mm² ve uzunluk olarak gidiş-dönüş toplamı alınır."]
  ],
  tools: ["hoparlor-kablo-hesapla", "awg-mm2-cevir", "gerilim-dusumu-hesapla"],
  related: ["empedans-ve-reaktans-nedir", "ohm-kanunu-nedir", "kablo-kesiti-nasil-secilir", "desibel-nedir-kac-db-zararli"],
  uyari: "elektrik tesisatı ve şebeke bağlantıları için yetkili bir elektrikçiye danışın; bağlantıları cihazlar kapalıyken yapın"
};
