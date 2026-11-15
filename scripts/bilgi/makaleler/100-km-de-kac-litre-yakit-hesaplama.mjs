export default {
  slug: "100-km-de-kac-litre-yakit-hesaplama",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Araç 100 km'de Kaç Litre Yakar? Yakıt Tüketimi ve km Başı Maliyet",
  pageTitle: "100 km'de Kaç Litre Yakar? Yakıt Tüketimi Hesaplama",
  description: "100 km'de yakıt tüketimi = harcanan litre ÷ gidilen km × 100. Depo usulü ölçüm, km başı maliyet, MPG çevirme, LPG-benzin karşılaştırması ve tüketimi artıranlar.",
  keywords: ["100 km'de kaç litre yakar", "yakıt tüketimi hesaplama", "km başı yakıt maliyeti", "depo usulü yakıt hesaplama", "lpg mi benzin mi", "şehir içi yakıt tüketimi", "mpg litre çevirme", "klima yakıt tüketimi"],
  lead: "Aracınızın 100 km'de kaç litre yaktığını bulmak için <strong>harcanan yakıtı (litre) gidilen mesafeye (km) bölüp 100 ile çarparsınız</strong>. 612 km'de 41,3 litre yakıt harcayan bir araç 41,3 ÷ 612 × 100 ≈ 6,75 L/100 km tüketir. En güvenilir ölçüm, depoyu iki kez tamamen doldurarak yapılan \"depo usulü\" hesaptır. Bu sayfada depo usulünün adımlarını, kilometre başı maliyeti, fabrika değerleriyle gerçek tüketim arasındaki farkı, MPG çevirmeyi, LPG ile benzini karşılaştırmayı ve tüketimi artıran etkenleri çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Tüketim (L/100 km) = harcanan yakıt (L) ÷ gidilen mesafe (km) × 100.",
    "Litreyle gidilen yol (km/L) = gidilen mesafe ÷ harcanan yakıt; 6,75 L/100 km yaklaşık 14,8 km/L eder.",
    "Kilometre başı yakıt maliyeti = L/100 km × litre fiyatı ÷ 100.",
    "Depo usulü: depoyu tam doldurun, kilometre sayacını sıfırlayın, normal kullanın, yeniden tam doldurup eklenen litreyi okunan km'ye bölün.",
    "ABD MPG'den çevirme: L/100 km = 235,215 ÷ MPG; İngiliz MPG için 282,481 ÷ MPG.",
    "Fabrika değerleri standart test döngüsünde ölçülür; günlük kullanımda tüketim genellikle bunun üzerinde çıkar."
  ],
  figure: {
    alt: "Depo usulü yakıt tüketimi ölçümünün dört adımı: depoyu doldur ve sayacı sıfırla, normal sür, yeniden tam doldur, hesapla; 612 kilometrede 41,3 litre için 6,75 litre/100 km ve km başı maliyet.",
    caption: "Depo usulünde ilk ve ikinci dolum aynı pompada, aynı biçimde (tabanca ilk kez otomatik kesene kadar) yapılır. İkinci dolumda eklenen litre, aradaki yolda harcanan yakıttır. Litre fiyatı örnek değerdir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Depo usulü ölçüm</text>
  <g class="mid">
    <rect x="20" y="52" width="150" height="110" rx="10" class="ps"/>
    <text x="95" y="80" class="b">1. Tam doldur</text><text x="95" y="104" class="sm">Tabanca kesene kadar</text><text x="95" y="126" class="sm">Sayaç (trip) = 0</text>
    <rect x="195" y="52" width="150" height="110" rx="10" class="sf sb"/>
    <text x="270" y="80" class="b">2. Normal sür</text><text x="270" y="104" class="sm">Her zamanki</text><text x="270" y="126" class="sm">kullanımınla</text>
    <rect x="370" y="52" width="150" height="110" rx="10" class="ps"/>
    <text x="445" y="80" class="b">3. Yine doldur</text><text x="445" y="104" class="sm">Aynı pompa, aynı</text><text x="445" y="126" class="sm">kesme noktası</text>
    <rect x="545" y="52" width="155" height="110" rx="10" class="p"/>
    <text x="622" y="80" class="b sf">4. Hesapla</text><text x="622" y="104" class="sm sf">Eklenen litre</text><text x="622" y="126" class="sm sf">÷ sayaç × 100</text>
  </g>
  <line x1="172" y1="107" x2="192" y2="107" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="347" y1="107" x2="367" y2="107" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="522" y1="107" x2="542" y2="107" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="20" y="190" width="680" height="190" rx="10" class="sf sb"/>
  <rect x="20" y="190" width="8" height="190" class="p"/>
  <text x="44" y="220" class="b">Örnek ölçüm</text>
  <text x="44" y="250">Sayaç: 612 km · Eklenen yakıt: 41,3 L</text>
  <text x="44" y="282" class="b p">41,3 ÷ 612 × 100 = 6,75 L/100 km</text>
  <text x="44" y="312">612 ÷ 41,3 = 14,8 km/L</text>
  <text x="44" y="344">Örnek litre fiyatı 45 TL → 6,75 × 45 ÷ 100 ≈ 3,04 TL/km</text>
  <text x="44" y="368" class="sm t2">Doğruluk için 2–3 depo ölçüp ortalamasını alın.</text>
</svg>`
  },
  sections: [
    {
      h: "Yakıt tüketimi nasıl ifade edilir?",
      p: [
        "Türkiye ve Avrupa'da yakıt tüketimi <strong>litre/100 km</strong> (L/100 km) ile ifade edilir: aracın 100 kilometrelik yol için kaç litre yakıt harcadığı. Bu değer ne kadar küçükse araç o kadar az yakar. Günlük konuşmada sık kullanılan bir diğer ölçü ise <strong>km/L</strong>, yani bir litreyle kaç kilometre gidildiğidir; bu değer büyüdükçe araç daha tasarrufludur.",
        "ABD ve İngiltere'de ise galon başına mil (MPG) kullanılır; bu da km/L gibi \"büyük olan iyi\" mantığıyla çalışır. İki ülkenin galonları farklı olduğu için ABD MPG ile İngiliz MPG aynı değildir. Yurt dışı araç ilanlarını değerlendirirken birimi doğru çevirmek bu yüzden önemlidir."
      ],
      formula: "L/100 km = harcanan yakıt (L) ÷ mesafe (km) × 100\nkm/L = mesafe (km) ÷ harcanan yakıt (L) = 100 ÷ (L/100 km)\nL/100 km = 235,215 ÷ ABD MPG · L/100 km = 282,481 ÷ İngiliz MPG"
    },
    {
      h: "Depo usulü yakıt ölçümü nasıl yapılır?",
      p: [
        "Yol bilgisayarının gösterdiği ortalama tüketim pratik bir fikir verir, ancak araçtan araca birkaç yüzde yanılabilir. Gerçek tüketimi bulmanın en güvenilir yolu, pompada eklenen yakıtı ölçmektir."
      ],
      ol: [
        "Depoyu tamamen doldurun. Tabancanın ilk kez otomatik kestiği noktada durun; üzerine ek yapmayın.",
        "Kilometre sayacını (trip) sıfırlayın ya da toplam kilometreyi not edin.",
        "Aracı her zamanki gibi kullanın. Ölçümün anlamlı olması için en az 300–400 km yol yapın ya da deponun yarısından fazlasını tüketin.",
        "Mümkünse aynı istasyonda, aynı pompada yeniden doldurun ve yine ilk kesme noktasında durun.",
        "Pompanın gösterdiği litreyi sayaçtaki kilometreye bölüp 100 ile çarpın: 41,3 ÷ 612 × 100 = 6,75 L/100 km."
      ],
      after: [
        "Tek bir ölçüm, dolum farklılıkları nedeniyle birkaç yüzde hatalı olabilir. Ölçümü iki üç depo boyunca tekrarlayıp toplam litreyi toplam kilometreye bölmek daha doğru bir ortalama verir. Değerleri [[arac:yakit-tuketimi-hesapla|yakıt tüketimi hesaplama aracı]]na girdiğinizde 100 km'deki tüketim, km/L değeri ve km başı yakıt maliyeti birlikte hesaplanır."
      ]
    },
    {
      h: "Kilometre başı yakıt maliyeti nasıl bulunur?",
      p: [
        "Tüketimi bildiğinizde yakıt maliyetini hesaplamak kolaydır. 100 km'deki tüketimi litre fiyatıyla çarpıp 100'e bölerseniz kilometre başına maliyeti bulursunuz."
      ],
      formula: "km başı maliyet (TL) = L/100 km × litre fiyatı ÷ 100\n100 km maliyeti (TL) = L/100 km × litre fiyatı\nAylık yakıt gideri = aylık km × km başı maliyet",
      table: {
        head: ["Tüketim (L/100 km)", "Litre fiyatı (örnek)", "100 km maliyeti", "km başı maliyet", "Aylık 1.500 km"],
        rows: [
          ["5,0", "45 TL", "225 TL", "2,25 TL", "3.375 TL"],
          ["6,75", "45 TL", "303,75 TL", "3,04 TL", "4.556 TL"],
          ["8,0", "45 TL", "360 TL", "3,60 TL", "5.400 TL"],
          ["10,0", "45 TL", "450 TL", "4,50 TL", "6.750 TL"]
        ],
        caption: "Litre fiyatı yalnızca hesabı göstermek için seçilmiş örnek tutardır; güncel fiyatı istasyondan ya da EPDK'nın akaryakıt fiyat duyurularından alın."
      },
      after: [
        "Bu hesap yalnızca yakıtı kapsar. Aracın gerçek kilometre maliyetinde sigorta, kasko, motorlu taşıtlar vergisi, bakım, lastik ve değer kaybı da vardır. Bunları birlikte görmek için [[arac:kilometre-maliyeti-hesapla|kilometre maliyeti hesaplama aracı]]nı kullanabilirsiniz. İki şehir arasındaki bir yolculuğun toplam yakıt ve köprü-otoyol giderini planlıyorsanız [[rehber:iki-sehir-arasi-mesafe-hesaplama|iki şehir arası mesafe hesaplama rehberi]] işinize yarar."
      ]
    },
    {
      h: "Fabrika değerleri neden gerçek tüketimden düşüktür?",
      p: [
        "Yeni araçların katalog tüketim değerleri, laboratuvar ortamında, belirli bir hız ve ivmelenme profilini izleyen standart bir test döngüsünde ölçülür. Avrupa'da ve Türkiye'de bugün kullanılan döngü WLTP'dir; eski NEDC döngüsüne göre daha gerçekçi olsa da yine trafik, hava, yük ve sürüş alışkanlıklarını tam yansıtmaz.",
        "Günlük kullanımda tüketimi yükselten başlıca etkenler şunlardır: sık dur-kalk yapılan şehir trafiği, kısa mesafeli ve motorun ısınmadığı yolculuklar, yüksek otoyol hızları, soğuk hava, klima kullanımı, araçtaki fazla yük ve tavan bagajı, düşük lastik basıncı ve sert hızlanma. Bu yüzden katalog değerini, aynı döngüde ölçülmüş araçları birbiriyle karşılaştırmak için kullanmak, kendi tüketiminizi ise ölçerek bulmak en doğrusudur."
      ],
      table: {
        head: ["Kullanım biçimi", "Tüketime etkisi", "Neden?"],
        rows: [
          ["Şehir içi dur-kalk", "Yüksek", "Her hızlanmada aracı yeniden hareket ettirmek enerji ister"],
          ["Sabit hızda şehirlerarası", "Düşük", "Motor verimli bölgede, az frenleme"],
          ["Çok yüksek otoyol hızı", "Artar", "Hava direnci hızın karesiyle büyür"],
          ["Kısa yolculuk, soğuk motor", "Yüksek", "Isınma sırasında motor daha zengin karışımla çalışır"],
          ["Ağır yük, tavan bagajı", "Artar", "Kütle ve aerodinamik direnç artar"]
        ]
      }
    },
    {
      h: "LPG mi benzin mi daha ekonomik?",
      p: [
        "LPG'li araçlar, aynı mesafe için benzine göre litre olarak daha fazla yakıt tüketir, çünkü LPG'nin litre başına enerjisi daha düşüktür. Buna karşın LPG'nin litre fiyatı genellikle benzinden belirgin biçimde ucuz olduğu için 100 km maliyeti çoğu zaman daha düşük çıkar. Karşılaştırmayı litreyle değil, 100 km maliyetiyle yapmak gerekir."
      ],
      ol: [
        "Benzinle tüketim 7,0 L/100 km, örnek benzin fiyatı 45 TL: 100 km maliyeti 7,0 × 45 = 315 TL.",
        "LPG ile tüketim 8,5 L/100 km, örnek LPG fiyatı 25 TL: 100 km maliyeti 8,5 × 25 = 212,5 TL.",
        "100 km'de fark 315 − 212,5 = 102,5 TL, yani kilometre başına yaklaşık 1,03 TL.",
        "LPG dönüşüm maliyeti örnek olarak 30.000 TL ise geri dönüş mesafesi 30.000 ÷ 1,025 ≈ 29.300 km."
      ],
      after: [
        "Yılda az yol yapan biri için dönüşüm maliyeti yıllar sonra karşılanırken çok yol yapanlarda geri dönüş birkaç ay sürebilir. LPG'li araçlar ilk çalıştırmada ve soğuk motorda bir miktar benzin kullanır; ayrıca periyodik muayene, tank ve sistem bakımı da hesaba katılmalıdır. Kendi değerlerinizle karşılaştırma yapmak ve dönüşümün kaç kilometrede amorti olacağını görmek için [[arac:lpg-benzin-karsilastir|LPG benzin karşılaştırma aracı]]nı kullanabilirsiniz."
      ]
    },
    {
      h: "MPG litre/100 km'ye nasıl çevrilir?",
      p: [
        "ABD galonu yaklaşık 3,785 litre, İngiliz galonu yaklaşık 4,546 litre, bir mil ise 1,609 km'dir. Bu birimlerden türetilen sabitlerle çevirme tek adımda yapılır. MPG ile L/100 km ters orantılı olduğu için çevirme bir bölme işlemidir; yüzde farkla düşünmek yanıltıcı olur."
      ],
      table: {
        head: ["ABD MPG", "L/100 km", "İngiliz MPG", "L/100 km"],
        rows: [
          ["20", "11,8", "25", "11,3"],
          ["25", "9,4", "35", "8,1"],
          ["30", "7,8", "40", "7,1"],
          ["35", "6,7", "50", "5,6"],
          ["40", "5,9", "60", "4,7"]
        ]
      },
      after: [
        "Örnek: ABD'den ithal bir aracın ilanında 30 MPG yazıyorsa 235,215 ÷ 30 ≈ 7,8 L/100 km eder. Aynı 30 değeri İngiliz MPG ise 282,481 ÷ 30 ≈ 9,4 L/100 km'dir. Çevirmeyi [[arac:yakit-tuketimi-birim-cevir|yakıt tüketimi birim çevirici]] ile L/100 km, km/L ve iki MPG türü arasında yapabilirsiniz."
      ]
    },
    {
      h: "Lastik basıncı ve klima tüketimi etkiler mi?",
      p: [
        "<strong>Lastik basıncı:</strong> Düşük basınçlı lastikler yola daha fazla temas ettiği için yuvarlanma direnci artar ve araç aynı hızı korumak için daha fazla yakıt harcar. Düşük basınç ayrıca lastiğin kenarlarından erken aşınmasına ve yol tutuşunun bozulmasına yol açar. Basıncı ayda en az bir kez, lastikler soğukken ve araç üreticisinin kapı kenarında ya da yakıt kapağında belirttiği değere göre kontrol edin.",
        "<strong>Klima:</strong> Klima kompresörü motordan güç aldığı için tüketimi artırır. Etki, motorun zaten az güç ürettiği şehir içi düşük hızlarda daha belirgin, otoyolda daha sınırlıdır. Yüksek hızlarda klimayı kapatıp camları açmak ise hava direncini artırdığı için çoğu zaman beklenen tasarrufu sağlamaz. Sıcak günlerde aracı bir süre camları açık sürüp içerideki sıcak havayı boşalttıktan sonra klimayı çalıştırmak, sistemin daha kısa sürede verimli çalışmasına yardımcı olur.",
        "Tüketimi azaltmak için yumuşak hızlanma, trafiği önceden okuyarak fren yerine motor freni kullanma, gereksiz yükü boşaltma ve kullanılmayan tavan bagajını sökme gibi alışkanlıklar, araç değiştirmeden fark yaratan en etkili yöntemlerdir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tek bir dolumla karar vermek:</strong> Tabancanın kesme noktası istasyondan istasyona değişir; birkaç depo ortalaması alın.",
        "<strong>Yakıt ışığından ışığa ölçmek:</strong> Uyarı ışığının yandığı nokta kesin bir seviye değildir; depo usulü daha güvenilirdir.",
        "<strong>Yol bilgisayarını mutlak doğru sanmak:</strong> Gösterge birkaç yüzde iyimser ya da kötümser olabilir; pompa ölçümüyle karşılaştırın.",
        "<strong>LPG'yi litreyle karşılaştırmak:</strong> LPG daha fazla litre tüketir; karşılaştırma 100 km maliyetiyle yapılmalıdır.",
        "<strong>ABD ve İngiliz MPG'yi karıştırmak:</strong> Aynı MPG değeri iki ülkede yaklaşık %20 farklı tüketime karşılık gelir."
      ]
    }
  ],
  faq: [
    ["Aracım 100 km'de kaç litre yakıyor, nasıl hesaplarım?", "Harcadığınız yakıtı litre olarak gittiğiniz kilometreye bölüp 100 ile çarparsınız. 612 km'de 41,3 litre yakıt harcadıysanız tüketiminiz yaklaşık 6,75 L/100 km'dir; en doğru sonuç depo usulü ölçümle alınır."],
    ["Depo usulü yakıt ölçümü nasıl yapılır?", "Depoyu tabanca kesene kadar doldurup kilometre sayacını sıfırlarsınız. Aracı normal kullandıktan sonra yine aynı biçimde doldurur, eklenen litreyi sayaçtaki kilometreye bölüp 100 ile çarparsınız. Birkaç depo ortalaması daha güvenilirdir."],
    ["Kilometre başı yakıt maliyeti nasıl bulunur?", "100 km'deki tüketimi litre fiyatıyla çarpıp 100'e bölersiniz. Örneğin 6,75 L/100 km tüketen bir araç, örnek 45 TL litre fiyatıyla kilometre başına yaklaşık 3,04 TL yakıt maliyetine sahiptir."],
    ["Fabrika değerleri neden gerçek tüketimden düşüktür?", "Katalog değerleri laboratuvarda standart bir test döngüsüyle ölçülür. Şehir trafiği, soğuk hava, klima, yük, yüksek hız ve sürüş tarzı gibi gerçek koşullar bu testte tam yansımadığı için günlük tüketim genellikle daha yüksek çıkar."],
    ["LPG mi benzin mi daha ekonomik?", "LPG litre olarak daha fazla tüketilir ama litre fiyatı genellikle düşük olduğu için 100 km maliyeti çoğu zaman daha ucuzdur. Dönüşüm maliyetinin kaç kilometrede çıkacağı yıllık kullanımınıza bağlıdır; karşılaştırmayı 100 km maliyetiyle yapın."],
    ["Lastik basıncı yakıt tüketimini etkiler mi?", "Evet. Düşük basınçlı lastikler yuvarlanma direncini artırarak yakıt tüketimini yükseltir, lastiğin erken aşınmasına ve yol tutuşunun bozulmasına yol açar. Basıncı ayda bir, lastikler soğukken üreticinin önerdiği değere göre kontrol edin."],
    ["MPG litre/100 km'ye nasıl çevrilir?", "ABD MPG için 235,215 sayısını MPG değerine, İngiliz MPG için 282,481 sayısını MPG değerine bölersiniz. Örneğin 30 ABD MPG yaklaşık 7,8 L/100 km, 30 İngiliz MPG ise yaklaşık 9,4 L/100 km eder."],
    ["Klima yakıt tüketimini ne kadar artırır?", "Klima kompresörü motordan güç aldığı için tüketimi artırır; etki şehir içi düşük hızlarda daha belirgin, otoyolda daha sınırlıdır. Kesin oran araca, dış sıcaklığa ve klima ayarına göre değişir."],
    ["Şehir içi tüketim neden daha yüksektir?", "Şehir içinde sık durup kalkmak, her hızlanmada aracı yeniden hareket ettirmek için yakıt harcamayı gerektirir. Rölantide bekleme ve motorun ısınmadığı kısa yolculuklar da tüketimi artırır."]
  ],
  tools: ["yakit-tuketimi-hesapla", "kilometre-maliyeti-hesapla", "lpg-benzin-karsilastir", "yakit-tuketimi-birim-cevir"],
  related: ["enflasyona-gore-paranin-degeri"],
  sources: [
    ["Enerji Piyasası Düzenleme Kurumu (EPDK) – Akaryakıt piyasası", "https://www.epdk.gov.tr/"]
  ]
};
