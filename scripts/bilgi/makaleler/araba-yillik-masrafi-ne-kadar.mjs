export default {
  slug: "araba-yillik-masrafi-ne-kadar",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Araba Masrafı Ne Kadar? Yakıt, MTV, Kredi ve Km Başına Toplam Maliyet",
  pageTitle: "Araba Yıllık Masrafı Ne Kadar? Km Başına Maliyet Hesabı",
  description: "Arabanın yıllık toplam masrafı nasıl hesaplanır? Yakıt, MTV, sigorta, bakım, değer kaybı ve kredi faiziyle km başına maliyet, taksi karşılaştırması ve örnek bütçe.",
  keywords: ["araba yıllık masrafı", "araba bakım maliyeti", "km başına maliyet", "araba almak mantıklı mı", "araç sahip olma maliyeti", "yakıt masrafı hesaplama", "araba aylık gideri", "değer kaybı hesaplama"],
  lead: "Bir arabanın yıllık masrafı, <strong>yakıt + sabit giderler (MTV, sigorta, kasko, muayene, otopark) + bakım ve lastik + değer kaybı ve finansman</strong> toplamıdır; bu toplamı yıllık kilometreye böldüğünüzde km başına gerçek maliyeti bulursunuz. Örnek varsayımlarımızla yılda 15.000 km yapılan orta sınıf bir otomobil yaklaşık 228.000 TL, yani km başına 15 TL civarında maliyet çıkarıyor ve bunun yalnızca beşte biri yakıt. Bu sayfada her kalemi nasıl hesaplayacağınızı, kredinin etkisini ve taksi ya da toplu taşımayla karşılaştırmayı adım adım gösteriyoruz.",
  kisaCevap: [
    "Toplam yıllık maliyet = yakıt + sabit giderler + bakım ve lastik + değer kaybı + finansman maliyeti.",
    "Yakıt gideri = yıllık km × (100 km'de tüketim ÷ 100) × litre fiyatı.",
    "Km başına maliyet = yıllık toplam maliyet ÷ yıllık km; az kullanılan araçta bu değer hızla yükselir.",
    "Değer kaybı nakit çıkışı olmasa da gerçek bir maliyettir ve çoğu zaman en büyük kalemdir.",
    "Kredi ile alınan araçta faiz ve kredi vergileri yıllık maliyete ayrıca eklenmelidir.",
    "Bu sayfadaki tüm fiyatlar örnek tutardır; kendi sigorta poliçenizi, MTV tutarınızı ve güncel yakıt fiyatını kullanın."
  ],
  figure: {
    alt: "Örnek bir otomobilin 228.250 TL'lik yıllık maliyetinin dağılımı: değer kaybı 96.000 TL, sabit giderler 63.500 TL, yakıt 48.750 TL, bakım ve lastik 20.000 TL. Km başına maliyet 15,22 TL.",
    caption: "Yılda 15.000 km, 100 km'de 6,5 litre tüketim ve örnek fiyatlarla hesaplanan yıllık maliyet dağılımı. Yakıt toplamın yalnızca %21'idir; değer kaybı ve sabit giderler kilometreden bağımsız olarak ödenir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Bir arabanın yıllık maliyeti nereye gidiyor?</text>
  <text x="360" y="56" class="sm mid t2">Örnek: 15.000 km/yıl · 6,5 L/100 km · örnek fiyatlar</text>
  <rect x="20" y="80" width="286" height="64" class="p"/>
  <rect x="306" y="80" width="189" height="64" class="ps"/>
  <rect x="495" y="80" width="145" height="64" class="a"/>
  <rect x="640" y="80" width="60" height="64" class="oks"/>
  <text x="163" y="110" class="b mid sf">Değer kaybı</text><text x="163" y="132" class="sm mid sf">%42,1</text>
  <text x="400" y="110" class="b mid">Sabit giderler</text><text x="400" y="132" class="sm mid">%27,8</text>
  <text x="567" y="110" class="b mid sf">Yakıt</text><text x="567" y="132" class="sm mid sf">%21,4</text>
  <text x="670" y="118" class="sm mid b">%8,8</text>
  <g class="sm">
    <rect x="20" y="170" width="330" height="136" rx="8" class="sf sb"/>
    <text x="36" y="194" class="b">Kalemler (yıllık, örnek)</text>
    <text x="36" y="218">Değer kaybı (%8 × 1,2 mn TL)</text><text x="336" y="218" class="end b">96.000 TL</text>
    <text x="36" y="240">Sigorta, kasko, MTV, muayene, otopark</text><text x="336" y="240" class="end b">63.500 TL</text>
    <text x="36" y="262">Yakıt (975 L × 50 TL)</text><text x="336" y="262" class="end b">48.750 TL</text>
    <text x="36" y="284">Bakım ve lastik</text><text x="336" y="284" class="end b">20.000 TL</text>
  </g>
  <rect x="370" y="170" width="330" height="136" rx="8" class="p"/>
  <text x="535" y="200" class="mid sf">Yıllık toplam</text>
  <text x="535" y="232" class="xl mid sf">228.250 TL</text>
  <text x="535" y="262" class="mid sf">Aylık ≈ 19.021 TL</text>
  <text x="535" y="290" class="b mid sf">Km başına 15,22 TL</text>
  <rect x="20" y="326" width="680" height="54" rx="8" class="sf sb"/>
  <rect x="20" y="326" width="8" height="54" class="dg"/>
  <text x="42" y="348" class="b">Aynı araç yılda 7.500 km yapsaydı</text>
  <text x="42" y="369" class="sm t2">Sabit maliyet aynı kalır, toplam ≈ 193.900 TL olur ve km başına maliyet 25,85 TL'ye çıkar.</text>
</svg>`
  },
  sections: [
    {
      h: "Araba masrafı neden yalnızca yakıttan ibaret değildir?",
      p: [
        "Araba bütçesi yapılırken çoğu kişi yalnızca yakıt faturasını düşünür. Oysa bir aracın gerçek maliyeti, siz hiç sürmeseniz de ödediğiniz sabit giderler ve aracın her yıl kaybettiği değerle birlikte ortaya çıkar. Ekonomistler buna <strong>toplam sahip olma maliyeti</strong> der.",
        "Maliyetleri iki gruba ayırmak hesabı kolaylaştırır. <strong>Değişken giderler</strong> kilometreyle artar: yakıt, lastik aşınması, kilometreye bağlı bakımlar, köprü ve otoyol ücretleri. <strong>Sabit giderler</strong> ise kullanımdan bağımsızdır: motorlu taşıtlar vergisi, zorunlu trafik sigortası, kasko, muayene, otopark aboneliği ve büyük ölçüde değer kaybı. Az kullanılan araçta km başına maliyetin yüksek çıkmasının nedeni bu ikinci gruptur."
      ]
    },
    {
      h: "Yıllık araç maliyeti formülü",
      formula: "Yakıt = yıllık km × tüketim (L/100 km) ÷ 100 × litre fiyatı\nSabit giderler = MTV + trafik sigortası + kasko + muayene payı + otopark, köprü, otoyol\nToplam = yakıt + sabit giderler + bakım ve lastik + değer kaybı + finansman\nKm başına maliyet = toplam ÷ yıllık km",
      p: [
        "Muayene iki yılda bir yapılıyorsa ücretin yarısını yıllık maliyete yazın. Lastikler dört yılda bir değişiyorsa takım fiyatının dörtte birini ekleyin. Aynı mantık akü, fren balatası ve büyük periyodik bakımlar için de geçerlidir: her kalemi ömrüne bölerek yıllığa çevirirsiniz.",
        "Elektrikli araçlarda formül aynıdır; yalnızca tüketim kWh/100 km, fiyat ise kWh başına elektrik fiyatı olarak yazılır. LPG'li araçlarda LPG ve benzinin kullanım oranını ayrı ayrı hesaplayın; karşılaştırması için [[bilgi:lpg-mi-benzin-mi-hangisi-ekonomik|LPG mi benzin mi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: yılda 15.000 km yapan bir otomobil",
      p: [
        "Piyasa değeri 1.200.000 TL olan, 100 km'de ortalama 6,5 litre benzin yakan bir otomobil düşünelim. Yılda 15.000 km yapılıyor. Aşağıdaki tutarlar hesabın mantığını göstermek için seçilmiş <strong>örnek tutarlardır</strong>; kendi değerlerinizle değiştirin."
      ],
      table: {
        head: ["Kalem", "Varsayım (örnek)", "Yıllık tutar"],
        rows: [
          ["Yakıt", "15.000 × 6,5 ÷ 100 = 975 L × 50 TL", "48.750 TL"],
          ["Zorunlu trafik sigortası", "poliçe tutarı", "12.000 TL"],
          ["Kasko", "poliçe tutarı", "30.000 TL"],
          ["Motorlu taşıtlar vergisi", "iki taksit toplamı", "8.000 TL"],
          ["Araç muayenesi", "3.000 TL, iki yılda bir", "1.500 TL"],
          ["Otopark, köprü ve otoyol", "aylık 1.000 TL", "12.000 TL"],
          ["Bakım ve lastik", "periyodik bakım + lastik payı", "20.000 TL"],
          ["Değer kaybı", "araç değerinin %8'i", "96.000 TL"],
          ["Toplam", "", "228.250 TL"]
        ],
        caption: "Km başına maliyet: 228.250 ÷ 15.000 = 15,22 TL. Aylık ortalama: 228.250 ÷ 12 ≈ 19.021 TL. Yakıtın toplam içindeki payı %21,4."
      },
      after: [
        "Bu örnekte yakıt dördüncü büyük kalem bile değil; değer kaybı tek başına toplamın %42'sini oluşturuyor. Kendi aracınız için aynı hesabı [[arac:kilometre-maliyeti-hesapla|Kilometre Başına Maliyet Hesaplama]] aracında yakıt, sabit giderler, bakım ve değer kaybı alanlarını doldurarak yapabilirsiniz. Yalnızca yakıtı ayrıntılı hesaplamak için [[arac:yakit-hesapla|Yakıt Hesaplama]] aracı, tüketiminizi ölçmek için [[bilgi:100-km-de-kac-litre-yakit-hesaplama|100 km'de kaç litre yakıt]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Yakıt dışındaki masraflar: kontrol listesi",
      ul: [
        "<strong>Motorlu taşıtlar vergisi (MTV):</strong> Ocak ve temmuz aylarında iki eşit taksitle ödenir; tutar aracın yaşına, motor hacmine ve taşıt değerine göre değişir.",
        "<strong>Zorunlu trafik sigortası:</strong> Yasal zorunluluktur; prim aracın türüne, ilinize ve hasarsızlık basamağınıza bağlıdır.",
        "<strong>Kasko:</strong> İsteğe bağlıdır ama kredili araçlarda banka genellikle şart koşar.",
        "<strong>Araç muayenesi:</strong> Otomobillerde ilk muayene alımdan üç yıl sonra, sonrasında iki yılda bir yapılır.",
        "<strong>Periyodik bakım:</strong> Yağ, filtre, fren, triger gibi kalemler kilometreye ya da süreye bağlıdır.",
        "<strong>Lastik:</strong> Yaz ve kış lastiği kullanıyorsanız iki takımın da ömrünü ve değişim işçiliğini ekleyin; ebat okumak için [[bilgi:lastik-ebatlari-nasil-okunur|lastik ebatları nasıl okunur]].",
        "<strong>Otopark, köprü, otoyol ve yıkama:</strong> Küçük görünür ama aylık toplamı bütçede belirgin yer tutar.",
        "<strong>Trafik cezaları ve beklenmeyen onarımlar:</strong> Yıllık bir yedek pay ayırmak gerçekçi bir bütçenin parçasıdır."
      ]
    },
    {
      h: "MTV yıllık maliyete nasıl eklenir?",
      p: [
        "Motorlu taşıtlar vergisi her yıl yeniden değerleme oranına göre güncellenir ve aracın tescil yılı, motor silindir hacmi ve taşıt değerine göre belirlenen tarifeden okunur. Yıllık maliyet hesabında iki taksiti toplayıp tek kalem olarak yazmanız yeterlidir. Aracı yıl ortasında aldıysanız o yılın ödenen taksitlerini değil, tam yıllık tutarı kullanın; çünkü önümüzdeki yıllarda her yıl ödeyeceksiniz.",
        "Kendi aracınızın vergisini [[arac:mtv-hesapla|MTV Hesaplama]] aracıyla bulabilirsiniz. Araç yaşlandıkça MTV düşer, ama bakım ve onarım masrafları genellikle artar; bu iki etki birbirini kısmen dengeler."
      ]
    },
    {
      h: "Değer kaybı masraf olarak sayılmalı mı?",
      p: [
        "Evet. Değer kaybı cebinizden her ay çıkan bir para olmasa da aracı sattığınız gün gerçekleşen bir maliyettir. 1.200.000 TL'ye aldığınız araç dört yıl sonra 850.000 TL'ye satılıyorsa aradaki 350.000 TL, yılda ortalama 87.500 TL'lik bir giderdir. Bunu hesaba katmayan bütçe aracın maliyetini olduğundan çok düşük gösterir.",
        "Türkiye'de yüksek enflasyon dönemlerinde ikinci el araç fiyatları nominal olarak artabildiği için değer kaybı görünmez hâle gelebilir. Doğru karşılaştırma için reel değere bakmak gerekir: aracınızın fiyatı %20 artarken genel fiyatlar %30 arttıysa aracınız reel olarak değer kaybetmiştir. Ayrıca araca bağlanan paranın fırsat maliyeti de vardır; aynı para mevduatta ya da başka bir yatırımda getiri sağlayabilirdi."
      ]
    },
    {
      h: "Taşıt kredisi faizi toplam maliyeti ne kadar artırır?",
      p: [
        "Kredili alımda faiz, aracın fiyatına eklenen ek bir maliyettir. Bireysel kredilerde faize ayrıca KKDF ve BSMV eklenir; bu nedenle sözleşmedeki faiz oranı ile ödediğiniz gerçek maliyet farklıdır. Ayrıca bankacılık düzenlemeleri araç fiyatına göre kredi tutarına ve vadesine üst sınır koyabilir; güncel sınırları bankanızdan öğrenin."
      ],
      formula: "Örnek: 500.000 TL kredi, 24 ay, aylık faiz %3 (örnek oran)\nVergiler dahil aylık maliyet ≈ %3 × 1,30 = %3,9\nAylık taksit ≈ 32.459 TL · Toplam faiz ve vergi ≈ 279.000 TL\nYıllık maliyete etkisi ≈ 279.000 ÷ 2 = 139.500 TL",
      after: [
        "Bu örnekte iki yıllık kredi maliyeti, aracın yıllık işletme maliyetinin neredeyse yarısı kadar ek yük getiriyor. Kendi kredi teklifinizi karşılaştırmak için [[arac:tasit-kredisi-hesapla|Taşıt Kredisi Hesaplama]] aracını, kavramların ayrıntısı için [[rehber:tasit-kredisi-nasil-hesaplanir|taşıt kredisi rehberini]] kullanabilirsiniz. Peşin alımda ise kredi faizi yerine paranın fırsat maliyetini yazmak daha doğrudur."
      ]
    },
    {
      h: "Araba mı, taksi ya da toplu taşıma mı daha ekonomik?",
      p: [
        "Karşılaştırma için maliyeti sabit ve değişken olarak ayırın. Örnek aracımızda değişken maliyet (yakıt + bakım) km başına yaklaşık 4,58 TL, sabit maliyet (sigorta, vergi, otopark, değer kaybı) yılda 159.500 TL'dir. Taksinin km başına 40 TL olduğunu varsayarsak başa baş noktası 159.500 ÷ (40 − 4,58) ≈ 4.500 km'dir. Yılda bundan az yol yapan biri için, yalnızca maliyet açısından bakıldığında taksi daha ucuzdur."
      ],
      table: {
        head: ["Yıllık kullanım", "Araba (örnek)", "Km başına", "Yorum"],
        rows: [
          ["5.000 km", "≈ 182.400 TL", "36,48 TL", "Taksi maliyetine yakın"],
          ["7.500 km", "≈ 193.900 TL", "25,85 TL", "Sabit giderler ağır basıyor"],
          ["15.000 km", "228.250 TL", "15,22 TL", "Örnek senaryo"],
          ["25.000 km", "≈ 274.100 TL", "10,96 TL", "Yoğun kullanımda araç avantajlı"]
        ],
        caption: "Sabit giderler 159.500 TL, değişken maliyet km başına yaklaşık 4,58 TL varsayımıyla hesaplanmıştır. Yüksek kilometrede bakım sıklığı ve değer kaybı da artacağı için gerçek rakamlar biraz daha yüksek çıkar."
      },
      after: [
        "Toplu taşıma maliyet olarak neredeyse her senaryoda en ekonomik seçenektir; ancak zaman, konfor, aile ihtiyaçları ve ulaşım ağına erişim gibi parayla ölçülmeyen etkenler de karara girer. Hesap, \"araba almak mantıklı mı\" sorusuna duygusal değil sayısal bir başlangıç noktası sunar."
      ]
    },
    {
      h: "Aylık araç bütçesi nasıl planlanır?",
      ol: [
        "Yıllık sabit giderleri (MTV, sigorta, kasko, muayene payı) toplayıp 12'ye bölün; bu tutarı her ay ayrı bir hesapta biriktirin.",
        "Aylık ortalama kilometrenizi ve güncel yakıt fiyatını kullanarak yakıt bütçesini çıkarın; fiyat artışları için %10 pay bırakın.",
        "Bakım ve lastik için yıllık tahmini 12'ye bölün ve bunu da birikime ekleyin.",
        "Kredi taksiti varsa ayrı satırda yazın.",
        "Değer kaybını bütçeye \"araç yenileme fonu\" olarak ekleyin; birkaç yıl sonra araç değiştirirken bu birikim size peşinat olur."
      ],
      after: [
        "Bütçe disiplini için [[bilgi:50-30-20-butce-kurali|50-30-20 bütçe kuralı]] iyi bir çerçeve sunar: araç masrafları çoğunlukla zorunlu giderler sepetinde yer alır ve gelirin büyük bir kısmını kaplıyorsa aracın sizin için pahalı olduğuna işaret eder."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca yakıtı hesaplamak:</strong> Toplamın beşte biriyle karar vermek, gerçek maliyeti dört beş kat küçük gösterir.",
        "<strong>Değer kaybını yok saymak:</strong> Satış günü ortaya çıkan fark yıllara dağıtılmalıdır.",
        "<strong>Üretici tüketim değerini kullanmak:</strong> Şehir içi kullanımda gerçek tüketim katalog değerinin belirgin üzerinde olabilir; kendi ölçümünüzü kullanın.",
        "<strong>Seyrek giderleri unutmak:</strong> Muayene, lastik, akü gibi kalemleri ömürlerine bölerek yıllığa çevirin.",
        "<strong>Kredi vergilerini atlamak:</strong> Faiz oranına KKDF ve BSMV eklenmeden hesaplanan taksit eksik çıkar."
      ]
    }
  ],
  faq: [
    ["Bir arabanın yıllık toplam masrafı nasıl hesaplanır?", "Yakıt, MTV, trafik sigortası, kasko, muayene payı, otopark ve köprü ücretleri, bakım ve lastik giderleri, değer kaybı ve varsa kredi maliyeti toplanır. Seyrek giderler ömürlerine bölünerek yıllığa çevrilir ve hepsi tek toplamda birleştirilir."],
    ["Km başına maliyet nasıl bulunur?", "Yıllık toplam maliyet yıllık kilometreye bölünür. Örneğimizde 228.250 TL ÷ 15.000 km = 15,22 TL çıkar. Sabit giderler kilometreden bağımsız olduğu için az kullanılan araçta km başına maliyet hızla yükselir."],
    ["Yakıt dışında hangi masraflar vardır?", "Motorlu taşıtlar vergisi, zorunlu trafik sigortası, kasko, araç muayenesi, periyodik bakım, lastik, akü, otopark, köprü ve otoyol ücretleri, yıkama, değer kaybı ve kredili alımlarda faiz ile kredi vergileri başlıca kalemlerdir."],
    ["MTV yıllık maliyete nasıl eklenir?", "Ocak ve temmuz aylarında ödenen iki taksit toplanarak tek bir yıllık kalem olarak yazılır. Tutar aracın yaşına, motor hacmine ve taşıt değerine göre değişir ve her yıl yeniden değerleme oranıyla güncellenir."],
    ["Taşıt kredisi faizi toplam maliyeti ne kadar artırır?", "Faiz oranına ve vadeye bağlıdır. Örneğin 500.000 TL'lik 24 ay vadeli, vergiler dahil aylık %3,9 maliyetli bir kredide toplam faiz ve vergi yaklaşık 279.000 TL olur; bu da yıllık maliyete yaklaşık 139.500 TL ekler."],
    ["Değer kaybı masraf olarak sayılmalı mı?", "Sayılmalıdır. Aracın alış ve satış fiyatı arasındaki fark, kullandığınız yıllara bölündüğünde çoğu zaman en büyük gider kalemidir. Yüksek enflasyonda nominal fiyat artsa bile reel değer kaybı devam edebilir."],
    ["Araba mı taksi/toplu taşıma mı daha ekonomik?", "Yıllık kilometreye bağlıdır. Örnek varsayımlarla yılda yaklaşık 4.500 km'nin altında yol yapan biri için taksi daha ucuz çıkar. Toplu taşıma ise maliyet olarak çoğu senaryoda en ekonomik seçenektir."],
    ["Aylık araç bütçesi nasıl planlanır?", "Yıllık sabit giderleri 12'ye bölüp her ay ayırın, yakıtı aylık kilometre ve güncel fiyatla hesaplayın, bakım ve lastik için aylık pay koyun, kredi taksitini ayrı yazın ve değer kaybını araç yenileme fonu olarak biriktirin."],
    ["Elektrikli araçta yıllık maliyet nasıl hesaplanır?", "Formül aynıdır; yakıt yerine 100 km'de tüketilen kWh ile kWh başına elektrik fiyatı çarpılır. Evde ve hızlı şarj istasyonunda fiyat çok farklı olabileceği için şarj alışkanlığınıza göre ağırlıklı ortalama fiyat kullanın."]
  ],
  tools: ["kilometre-maliyeti-hesapla", "yakit-hesapla", "mtv-hesapla", "tasit-kredisi-hesapla"],
  related: ["100-km-de-kac-litre-yakit-hesaplama", "lpg-mi-benzin-mi-hangisi-ekonomik", "otv-nedir-arac-otv-nasil-hesaplanir", "lastik-ebatlari-nasil-okunur", "50-30-20-butce-kurali"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Motorlu taşıtlar vergisi", "https://www.gib.gov.tr/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"],
    ["Türkiye İstatistik Kurumu – Tüketici fiyatları", "https://www.tuik.gov.tr/"]
  ],
  uyari: "tutarlar örnek varsayımlardır ve finansal tavsiye niteliği taşımaz"
};
