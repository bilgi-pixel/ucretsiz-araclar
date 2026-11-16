export default {
  slug: "trafo-sarim-orani-nasil-hesaplanir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Trafo Nasıl Çalışır? Sarım Oranı, Gerilim ve Akım Dönüşümü Hesabı",
  pageTitle: "Trafo Sarım Oranı Nasıl Hesaplanır? Gerilim ve Akım",
  description: "Trafoda gerilim oranı sarım oranına eşittir: V1/V2 = N1/N2, akım ise ters orantılıdır. 230 V'tan 12 V hesabı, VA-watt farkı, kayıplar, verim ve güvenlik notları.",
  keywords: ["trafo sarım oranı", "trafo nasıl çalışır", "primer sekonder gerilim", "trafo akım hesabı", "220v 12v trafo", "transformatör formülü", "trafo verimi", "yükseltici düşürücü trafo"],
  lead: "Bir trafoda (transformatör) <strong>gerilimler sarım sayılarıyla doğru, akımlar ise ters orantılıdır</strong>: V₁/V₂ = N₁/N₂ = I₂/I₁. Primer sargıdaki alternatif akım demir nüvede değişen bir manyetik akı oluşturur ve bu akı sekonder sargıda gerilim indükler. Örneğin 230 V'u 12 V'a düşürmek için sarım oranı yaklaşık 19,2 : 1 olmalıdır; 1.150 sarımlı primere 60 sarımlı sekonder gerekir. Bu sayfada çalışma ilkesini, sarım ve akım hesabını, VA ile watt farkını, kayıpları ve verimi, trafonun neden doğru akımda çalışmadığını ve güvenlik kurallarını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Dönüştürme oranı a = N₁/N₂ = V₁/V₂; a > 1 ise trafo düşürücü, a < 1 ise yükselticidir.",
    "İdeal trafoda güç korunur: V₁·I₁ = V₂·I₂; gerilim düşerken akım aynı oranda artar.",
    "230 V → 12 V için a ≈ 19,17; 1.150 sarımlı primerde sekonder 60 sarım olur.",
    "Trafo değişen manyetik akıyla çalıştığı için doğru akımda (DC) gerilim dönüştürmez.",
    "Trafo gücü VA (görünür güç) ile verilir; watt cinsinden aktif güç, güç faktörüne bağlıdır.",
    "Verim = çıkış gücü ÷ giriş gücü; kayıplar bakır (sargı direnci) ve demir (nüve) kayıplarından oluşur."
  ],
  figure: {
    alt: "Trafo şeması: solda 230 volt ve 1150 sarımlı primer sargı, ortada demir nüve ve manyetik akı, sağda 12 volt ve 60 sarımlı sekonder sargı. Altta sekonderden 2 amper çekilince primerin yaklaşık 0,104 amper çektiği gösteriliyor.",
    caption: "Düşürücü bir trafoda sarım oranı 1.150 : 60 ≈ 19,17 : 1'dir. Gerilim bu oranda düşerken akım aynı oranda artar; ideal trafoda her iki taraftaki güç 24 VA'da eşit kalır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Düşürücü trafo: 230 V → 12 V</text>
  <rect x="250" y="60" width="220" height="200" rx="6" class="sb sw" fill="none"/>
  <rect x="290" y="100" width="140" height="120" rx="4" class="sb sw" fill="none"/>
  <text x="360" y="166" class="sm mid mu">demir nüve</text>
  <text x="360" y="52" class="sm mid">manyetik akı Φ</text>
  <g class="sp sw" fill="none">
    <path d="M250 90 h-30 M250 110 h-30 M250 130 h-30 M250 150 h-30 M250 170 h-30 M250 190 h-30 M250 210 h-30 M250 230 h-30"/>
  </g>
  <g class="sok sw" fill="none">
    <path d="M470 140 h30 M470 160 h30 M470 180 h30"/>
  </g>
  <rect x="20" y="96" width="190" height="120" rx="8" class="ps"/>
  <text x="115" y="124" class="b mid">Primer</text>
  <text x="115" y="154" class="xl mid p">230 V</text>
  <text x="115" y="180" class="mid">N₁ = 1.150 sarım</text>
  <text x="115" y="202" class="sm mid">I₁ ≈ 0,104 A</text>
  <rect x="510" y="96" width="190" height="120" rx="8" class="oks"/>
  <text x="605" y="124" class="b mid">Sekonder</text>
  <text x="605" y="154" class="xl mid ok">12 V</text>
  <text x="605" y="180" class="mid">N₂ = 60 sarım</text>
  <text x="605" y="202" class="sm mid">I₂ = 2 A</text>
  <rect x="20" y="284" width="330" height="116" rx="8" class="sf sb"/>
  <text x="36" y="310" class="b">Oran</text>
  <text x="36" y="336" class="sm">a = 230 ÷ 12 ≈ 19,17</text>
  <text x="36" y="360" class="sm">N₂ = 1.150 ÷ 19,17 = 60 sarım</text>
  <text x="36" y="384" class="sm">Sarım başına 0,2 V</text>
  <rect x="370" y="284" width="330" height="116" rx="8" class="sf sb"/>
  <text x="386" y="310" class="b">Güç (ideal)</text>
  <text x="386" y="336" class="sm">S = 12 V × 2 A = 24 VA</text>
  <text x="386" y="360" class="sm">I₁ = 24 ÷ 230 ≈ 0,104 A</text>
  <text x="386" y="384" class="sm dg">Gerçekte kayıplar nedeniyle biraz fazla</text>
</svg>`
  },
  sections: [
    {
      h: "Transformatör (trafo) nasıl çalışır?",
      p: [
        "Trafo, ortak bir demir nüve üzerine sarılmış en az iki bobinden oluşur. Enerjinin girdiği bobine <strong>primer</strong>, çıktığı bobine <strong>sekonder</strong> sargı denir. İki sargı arasında elektriksel bağlantı yoktur; enerji manyetik alan yoluyla aktarılır.",
        "Primere alternatif gerilim uygulandığında sargıdan geçen akım yönünü saniyede 50 kez (Türkiye'deki şebeke frekansı 50 Hz) değiştirir. Bu değişen akım nüvede sürekli büyüyüp küçülen ve yön değiştiren bir manyetik akı oluşturur. Faraday'ın indüksiyon yasasına göre, değişen akının geçtiği her sarımda bir gerilim indüklenir. Sekonder sargının her sarımı aynı akıyı gördüğü için, sekonderde oluşan toplam gerilim sarım sayısıyla orantılıdır.",
        "Bu yüzden trafonun temel ayarı sarım oranıdır. Sekonderde primerden daha az sarım varsa gerilim düşer, daha fazla sarım varsa gerilim yükselir. Güç (yaklaşık) korunduğu için gerilimdeki her düşüş, akımda aynı oranda bir artışla dengelenir."
      ]
    },
    {
      h: "Sarım oranı ile gerilim ve akım arasındaki ilişki",
      formula: "a = N₁ / N₂ = V₁ / V₂\nİdeal trafoda güç korunur: V₁ · I₁ = V₂ · I₂\nBu yüzden: I₂ / I₁ = N₁ / N₂ = a",
      p: [
        "Bu üç bağıntı ideal, yani kayıpsız bir trafo için geçerlidir ve hesapların başlangıç noktasıdır. Formülden dört değişkenden (V₁, V₂, N₁, N₂) üçünü bildiğinizde dördüncüsünü bulabilirsiniz. Akım ilişkisi ise ters yöndedir: sarım sayısı az olan tarafta akım büyüktür, bu yüzden düşük gerilim sargıları daha kalın telle sarılır.",
        "Dönüştürme oranı birden büyükse (a > 1) trafo <strong>düşürücü</strong>, birden küçükse (a < 1) <strong>yükseltici</strong>, bire eşitse <strong>yalıtım (izolasyon) trafosu</strong> adını alır. Yalıtım trafosu gerilimi değiştirmez ama devreyi şebekeden elektriksel olarak ayırır."
      ]
    },
    {
      h: "Çözümlü örnek: 230 V'tan 12 V elde etmek",
      p: [
        "Türkiye'de alçak gerilim şebekesinin anma değeri 230 V'tur; günlük dilde hâlâ \"220 V\" denmesi eski standarttan kalmadır. Hesabı 230 V ile yapmak gerçeğe daha yakın sonuç verir; aşağıda her ikisini de görebilirsiniz."
      ],
      ol: [
        "Oranı bulun: a = V₁ ÷ V₂ = 230 ÷ 12 ≈ 19,17. (220 V ile hesaplanırsa a ≈ 18,33 olur.)",
        "Primer sarım sayısı 1.150 ise sekonder: N₂ = N₁ ÷ a = 1.150 × 12 ÷ 230 = 60 sarım.",
        "Sarım başına gerilim: 230 ÷ 1.150 = 0,2 V/sarım; sekonderde 60 × 0,2 = 12 V çıkar.",
        "Sekonderden 2 A çekilecekse görünür güç: S = 12 × 2 = 24 VA.",
        "İdeal primer akımı: I₁ = 24 ÷ 230 ≈ 0,104 A; ya da I₁ = I₂ ÷ a = 2 ÷ 19,17 ≈ 0,104 A."
      ],
      after: [
        "Hesaplanan sarım sayısı tam çıkmazsa uygulamada en yakın tam sayıya yuvarlanır. Ayrıca gerçek bir trafoda yük altında sargı dirençleri nedeniyle gerilim biraz düşer; bu yüzden üreticiler sekonderi genellikle birkaç yüzde fazla sarar. Boşta ölçülen gerilimin etiketteki değerden biraz yüksek olması bu nedenle normaldir. Bu hesabı [[arac:trafo-sarim-orani-hesapla|Trafo Sarım Oranı Hesaplama aracıyla]] dört alandan birini boş bırakarak yapabilirsiniz."
      ]
    },
    {
      h: "Sekonder akım nasıl hesaplanır?",
      p: [
        "Sekonder akımı aslında trafonun değil, sekondere bağlanan yükün belirlediği bir değerdir. 12 V sekondere 6 Ω'luk bir direnç bağlarsanız Ohm yasasına göre 12 ÷ 6 = 2 A akar. Trafonun görevi bu akımı, etiketindeki güç sınırını aşmadan sağlayabilmektir.",
        "Trafonun sağlayabileceği en yüksek sekonder akım, etiketteki görünür güçten bulunur: I₂(maks) = S ÷ V₂. Örneğin 50 VA'lık, 12 V çıkışlı bir trafo en fazla 50 ÷ 12 ≈ 4,17 A verebilir. Bu sınır aşılırsa sargılar ısınır, yalıtım zamanla bozulur ve trafo zarar görebilir. Ohm yasası ve güç bağıntıları için [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] ve [[bilgi:watt-amper-volt-iliskisi|watt-amper-volt ilişkisi]] yazılarına bakabilirsiniz."
      ],
      table: {
        head: ["Trafo gücü", "Sekonder gerilim", "En yüksek sekonder akım", "İdeal primer akım (230 V)"],
        rows: [
          ["24 VA", "12 V", "2,0 A", "0,104 A"],
          ["50 VA", "12 V", "4,17 A", "0,217 A"],
          ["50 VA", "24 V", "2,08 A", "0,217 A"],
          ["100 VA", "24 V", "4,17 A", "0,435 A"]
        ],
        caption: "Primer akım, gücün 230 V'a bölünmesiyle bulunur; gerçek değer kayıplar ve mıknatıslanma akımı nedeniyle biraz daha yüksektir."
      }
    },
    {
      h: "VA ile watt arasındaki fark",
      p: [
        "Trafoların gücü watt yerine <strong>VA (volt-amper)</strong> ile verilir. Bunun nedeni, trafonun ısınmasını belirleyen şeyin sargılardan geçen akım olmasıdır; yükün bu akımın ne kadarını gerçekten iş yapan güce (watt) çevirdiği trafo açısından önemli değildir.",
        "Saf dirençli bir yükte (ısıtıcı, akkor lamba) akım ve gerilim aynı fazdadır, bu yüzden watt ve VA eşittir. Motor, bobin ya da bazı elektronik yüklerde akım gerilimden geri kalır; bu durumda aktif güç P = S × cos φ olur. 100 VA'lık bir trafoya güç faktörü 0,8 olan bir yük bağlanırsa, trafo tam yüklüyken yük yalnızca 80 W aktif güç kullanır. Güç faktörü hesabı için [[arac:guc-faktoru-hesapla|Güç Faktörü Hesaplama aracı]], kVA-kW ilişkisinin daha geniş anlatımı için [[bilgi:kva-kw-farki-jenerator-secimi|kVA ve kW farkı]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Trafo neden doğru akımda çalışmaz?",
      p: [
        "İndüksiyonla gerilim oluşması için akının <strong>değişmesi</strong> gerekir. Doğru akımda (DC) primerden geçen akım sabittir; nüvede de sabit bir akı oluşur. Sabit akı sekonderde gerilim indüklemez, bu yüzden sekonder çıkışı sıfırdır.",
        "Daha da kötüsü, DC'de primer sargıyı yalnızca kendi bakır direnci sınırlar. Alternatif akımda sargının endüktansı akımı sınırlarken, doğru akımda bu sınırlama ortadan kalkar; çok büyük bir akım akar, sargı hızla ısınır ve yanabilir. Bu nedenle bir trafo asla doğru akım kaynağına bağlanmamalıdır.",
        "Akü ya da pil gibi DC kaynaklardan farklı bir gerilim elde etmek için, gerilimi önce elektronik olarak yüksek frekanslı alternatif akıma çeviren dönüştürücüler kullanılır; telefon şarj cihazları ve dizüstü bilgisayar adaptörlerinin içindeki küçük trafolar bu yöntemle, çok daha yüksek frekansta çalışır. Reaktans ve frekans ilişkisi [[bilgi:empedans-ve-reaktans-nedir|empedans ve reaktans]] yazısında anlatılır."
      ]
    },
    {
      h: "Trafo kayıpları ve verim hesabı",
      p: [
        "Gerçek bir trafo, aldığı enerjinin bir kısmını ısıya çevirir. Bu kayıplar iki ana gruba ayrılır ve verimi belirler."
      ],
      table: {
        head: ["Kayıp türü", "Nedeni", "Neye bağlı?", "Azaltma yolu"],
        rows: [
          ["Bakır kaybı", "Sargı telinin direnci (I²R)", "Yük akımının karesine", "Daha kalın tel"],
          ["Histerezis kaybı", "Nüvenin her periyotta yeniden mıknatıslanması", "Frekans ve nüve malzemesine", "Silisli sac nüve"],
          ["Fuko (girdap) akımı kaybı", "Nüvede dolaşan indüklenmiş akımlar", "Sac kalınlığı ve frekansa", "İnce, yalıtılmış saclar"],
          ["Kaçak akı", "Akının bir kısmının sekonderi kesmemesi", "Sargı yerleşimine", "Sargıları iç içe sarmak"]
        ]
      },
      formula: "Verim η = çıkış gücü ÷ giriş gücü × 100\nÖrnek: giriş 27 W, çıkış 24 W → η = 24 ÷ 27 × 100 ≈ %88,9\nKayıp = 27 − 24 = 3 W (ısı olarak açığa çıkar)",
      after: [
        "Küçük trafoların verimi genellikle %80–%90 aralığındadır; büyük dağıtım trafolarında ise %98'in üzerine çıkar. Trafonun boşta bile ısınmasının nedeni demir kayıplarıdır: yük bağlı olmasa da nüve her periyotta mıknatıslanır. Girişte ve çıkışta harcanan gücü ölçerek kendi trafonuzun verimini [[arac:elektrik-gucu-hesapla|Elektrik Gücü Hesaplama aracıyla]] karşılaştırabilirsiniz."
      ]
    },
    {
      h: "Yükseltici ve düşürücü trafo farkı",
      table: {
        head: ["Özellik", "Düşürücü trafo", "Yükseltici trafo"],
        rows: [
          ["Sarım ilişkisi", "N₂ < N₁", "N₂ > N₁"],
          ["Gerilim", "Sekonderde düşer", "Sekonderde yükselir"],
          ["Akım", "Sekonderde artar", "Sekonderde azalır"],
          ["Tel kalınlığı", "Sekonder kalın", "Primer kalın"],
          ["Tipik kullanım", "Zil, adaptör, kontrol devreleri", "Enerji iletimi, yüksek gerilim test cihazları"]
        ]
      },
      after: [
        "Elektrik santrallerinde üretilen gerilim yükseltici trafolarla çok yüksek değerlere çıkarılır, böylece aynı güç çok daha düşük akımla taşınır ve hatlardaki I²R kaybı azalır. Şehirlerdeki dağıtım merkezlerinde düşürücü trafolar gerilimi kademeli olarak indirir. Aynı trafo, sargıları ters bağlanarak teorik olarak her iki yönde de kullanılabilir; ancak yalıtım ve tel kalınlığı tasarımı tek bir yöne göre yapıldığı için bu uygulamada önerilmez."
      ]
    },
    {
      h: "Güvenlik: şebeke gerilimiyle çalışırken",
      ul: [
        "230 V şebeke gerilimi öldürücü olabilir. Primer tarafındaki bağlantıları yalnızca yetkin kişiler, enerji kesikken ve kontrol kalemiyle doğruladıktan sonra yapmalıdır.",
        "Hobi projelerinde hazır, etiketli ve kapalı kutulu trafo kullanın; şebekeye bağlanacak trafoyu kendiniz sarmayın.",
        "Primer devresine uygun değerde sigorta koyun ve metal gövdeyi topraklayın.",
        "Etiketteki VA değerini aşmayın; trafo dokunulamayacak kadar ısınıyorsa aşırı yüklüdür.",
        "Trafoyu asla doğru akım kaynağına ya da etiketindeki frekanstan farklı bir şebekeye bağlamayın.",
        "Yükseltici trafoların sekonderinde gerilim yüksektir; boşta bile dokunmak tehlikelidir."
      ]
    }
  ],
  faq: [
    ["Transformatör (trafo) nasıl çalışır?", "Primer sargıya uygulanan alternatif akım, demir nüvede sürekli değişen bir manyetik akı oluşturur. Bu akı sekonder sargının her sarımında gerilim indükler; sekonderdeki toplam gerilim, sarım sayısının primere oranıyla belirlenir."],
    ["Sarım oranı ile gerilim oranı arasındaki ilişki nedir?", "İdeal trafoda gerilim oranı sarım oranına eşittir: V₁/V₂ = N₁/N₂. Sekonderde primerin yarısı kadar sarım varsa gerilim de yarıya düşer; akım ise ters yönde değişerek yaklaşık iki katına çıkar."],
    ["220 V'tan 12 V elde etmek için sarım oranı ne olmalı?", "220 V ile hesaplanırsa oran 18,33 : 1, Türkiye şebekesinin anma değeri olan 230 V ile hesaplanırsa yaklaşık 19,17 : 1 olur. Örneğin 1.150 sarımlı bir primere 230 V uygulanıyorsa sekonderde 60 sarım 12 V verir."],
    ["Sekonder akım nasıl hesaplanır?", "Sekonder akımı bağlanan yük belirler ve Ohm yasasıyla bulunur. Trafonun verebileceği en yüksek akım ise etiketteki görünür gücün sekonder gerilimine bölünmesiyle hesaplanır; 50 VA ve 12 V için bu değer yaklaşık 4,17 amperdir."],
    ["Trafo neden doğru akımda çalışmaz?", "Gerilim indüklenmesi için manyetik akının değişmesi gerekir; doğru akım sabit bir akı oluşturur ve sekonderde gerilim indüklemez. Üstelik primer akımını yalnızca tel direnci sınırladığı için sargı aşırı ısınıp yanabilir."],
    ["VA ile watt arasındaki fark nedir?", "VA görünür güçtür ve sargılardan geçen toplam akımı gösterir; trafonun ısınmasını bu belirler. Watt ise aktif güçtür ve P = S × cos φ ile bulunur. Dirençli yüklerde ikisi eşittir, motor gibi yüklerde watt daha düşüktür."],
    ["Trafo kayıpları ve verimi nasıl hesaplanır?", "Verim, çıkış gücünün giriş gücüne bölünüp 100 ile çarpılmasıyla bulunur. Kayıplar sargı direncinden kaynaklanan bakır kaybı ile nüvedeki histerezis ve girdap akımı kayıplarından oluşur; küçük trafolarda verim genellikle yüzde 80 ile 90 arasındadır."],
    ["Yükseltici ve düşürücü trafo farkı nedir?", "Düşürücü trafoda sekonder sarım sayısı primerden azdır, gerilim düşer ve akım artar. Yükseltici trafoda ise sekonderde daha fazla sarım vardır, gerilim yükselir ve akım azalır; enerji iletimi bu ilkeyle düşük kayıpla yapılır."],
    ["Trafo boştayken neden ısınır?", "Yük bağlı olmasa bile primer sargı nüveyi her periyotta yeniden mıknatıslar; bu sırada histerezis ve girdap akımı kayıpları oluşur. Bu demir kayıpları ısı olarak açığa çıkar ve küçük bir mıknatıslanma akımı sürekli çekilir."]
  ],
  tools: ["trafo-sarim-orani-hesapla", "guc-faktoru-hesapla", "elektrik-gucu-hesapla"],
  related: ["kva-kw-farki-jenerator-secimi", "watt-amper-volt-iliskisi", "ohm-kanunu-nedir", "empedans-ve-reaktans-nedir"],
  uyari: "şebeke gerilimiyle yapılan işler hayati tehlike taşır; bağlantıları yetkili bir elektrikçiye yaptırın"
};
