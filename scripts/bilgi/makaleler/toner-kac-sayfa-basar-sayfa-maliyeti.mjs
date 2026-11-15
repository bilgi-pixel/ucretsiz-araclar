export default {
  slug: "toner-kac-sayfa-basar-sayfa-maliyeti",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Toner Kaç Sayfa Basar? %5 Doluluk, Sayfa Başı Maliyet ve Kağıt Gramajı",
  pageTitle: "Toner Kaç Sayfa Basar? %5 Doluluk ve Sayfa Başı Maliyet",
  description: "Toner verimi ISO/IEC 19752'ye göre yaklaşık %5 doluluklu standart sayfayla ölçülür. Gerçek verim = verim × 5 ÷ doluluk. Sayfa maliyeti, drum ve 80 gr kağıt.",
  keywords: ["toner kaç sayfa basar", "sayfa başı baskı maliyeti", "%5 doluluk oranı nedir", "toner ömrü hesaplama", "muadil toner mi orijinal mi", "kağıt gramajı nedir", "iso/iec 19752", "drum ünitesi ne zaman değişir"],
  lead: "Bir tonerin kaç sayfa basacağı kutusunda yazan <strong>sayfa verimiyle</strong> belirtilir ve bu değer, siyah-beyaz lazer tonerlerde <strong>ISO/IEC 19752</strong> standardına göre yaklaşık %5 doluluğa karşılık gelen standart test sayfası sürekli basılarak ölçülür. Sizin sayfalarınız daha doluysa verim orantılı olarak düşer: <strong>gerçek verim ≈ kutudaki verim × 5 ÷ gerçek doluluk</strong>. 6.000 sayfalık bir toner %10 dolulukta yaklaşık 3.000 sayfa basar. Bu sayfada standardın ne ölçtüğünü, doluluk oranını, sayfa başı maliyet hesabını, drum ünitesini, muadil ve orijinal karşılaştırmasını ve kağıt gramajını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Kutudaki sayfa verimi, siyah lazer tonerlerde ISO/IEC 19752, renkli lazer tonerlerde ISO/IEC 19798 yöntemiyle ölçülür.",
    "%5 doluluk, sayfa yüzeyinin yaklaşık yüzde beşinin tonerle kaplanmasıdır; tipik bir yazışma sayfasına yakındır.",
    "Gerçek verim ≈ kutudaki verim × 5 ÷ gerçek doluluk (%); doluluk iki katına çıkarsa verim yarıya iner.",
    "Sayfa başı maliyet = toner fiyatı ÷ gerçek verim + kağıt fiyatı ÷ yaprak sayısı + drum fiyatı ÷ drum ömrü.",
    "80 gr kağıt, metrekaresi 80 gram gelen kağıttır; bir A4 yaprak yaklaşık 5 gram, 500'lük paket yaklaşık 2,5 kg'dır.",
    "Muadil ile orijinali kutu fiyatıyla değil, aynı ölçüme dayanan verimle bulunan sayfa başı maliyetle karşılaştırın."
  ],
  figure: {
    alt: "Aynı 6.000 sayfa verimli tonerin farklı sayfa dolulukları için gerçek verimini gösteren çubuk grafik: yüzde 2,5'te 12.000, yüzde 5'te 6.000, yüzde 10'da 3.000, yüzde 20'de 1.500 sayfa; yanında doluluk örnek sayfaları.",
    caption: "Kutudaki verim yalnızca standart test koşulları için geçerlidir. Sayfalarınız ne kadar doluysa toner o kadar az sayfa basar. Çubuklar, 6.000 sayfa verimli bir tonerin farklı dolulukta yaklaşık kaç sayfa basacağını gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Doluluk arttıkça toner verimi düşer</text>
  <text x="30" y="62" class="b">Sayfa örnekleri</text>
  <rect x="30" y="76" width="70" height="99" rx="3" class="sf sb"/>
  <line x1="40" y1="92" x2="88" y2="92" class="st" fill="none"/><line x1="40" y1="104" x2="80" y2="104" class="st" fill="none"/><line x1="40" y1="116" x2="86" y2="116" class="st" fill="none"/>
  <text x="65" y="196" class="sm mid b">%5</text><text x="65" y="212" class="sm mid">yazışma</text>
  <rect x="115" y="76" width="70" height="99" rx="3" class="sf sb"/>
  <rect x="125" y="86" width="50" height="22" class="t"/>
  <line x1="125" y1="120" x2="175" y2="120" class="st sw" fill="none"/><line x1="125" y1="132" x2="170" y2="132" class="st sw" fill="none"/><line x1="125" y1="144" x2="175" y2="144" class="st sw" fill="none"/><line x1="125" y1="156" x2="160" y2="156" class="st sw" fill="none"/>
  <text x="150" y="196" class="sm mid b">%10–15</text><text x="150" y="212" class="sm mid">tablo, logo</text>
  <rect x="200" y="76" width="70" height="99" rx="3" class="sf sb"/>
  <rect x="208" y="84" width="54" height="60" class="t"/>
  <line x1="208" y1="156" x2="262" y2="156" class="st sw" fill="none"/>
  <text x="235" y="196" class="sm mid b">%20+</text><text x="235" y="212" class="sm mid">grafik, fotoğraf</text>
  <text x="330" y="62" class="b">6.000 sayfa verimli toner</text>
  <g class="sm">
    <text x="330" y="96">%2,5</text><rect x="380" y="82" width="320" height="22" rx="4" class="oks"/><text x="690" y="98" class="end b">12.000</text>
    <text x="330" y="134">%5</text><rect x="380" y="120" width="160" height="22" rx="4" class="p"/><text x="548" y="136" class="b">6.000 (kutudaki değer)</text>
    <text x="330" y="172">%10</text><rect x="380" y="158" width="80" height="22" rx="4" class="ps"/><text x="468" y="174" class="b">3.000</text>
    <text x="330" y="210">%20</text><rect x="380" y="196" width="40" height="22" rx="4" class="dgs"/><text x="428" y="212" class="b">1.500</text>
  </g>
  <rect x="30" y="248" width="660" height="150" rx="10" class="sf sb"/>
  <rect x="30" y="248" width="8" height="150" class="p"/>
  <text x="54" y="276" class="b">Sayfa başı maliyet örneği (örnek tutarlar)</text>
  <text x="54" y="302" class="sm">Toner 2.400 TL · verim 6.000 · gerçek doluluk %8 → 6.000 × 5 ÷ 8 = 3.750 sayfa → 0,64 TL</text>
  <text x="54" y="326" class="sm">Kağıt 250 TL ÷ 500 yaprak = 0,50 TL · Drum 1.500 TL ÷ 30.000 sayfa = 0,05 TL</text>
  <text x="54" y="356" class="b p">Toplam ≈ 1,19 TL/sayfa · ayda 2.000 sayfa ≈ 2.380 TL</text>
  <text x="54" y="382" class="sm t2">Elektrik, bakım ve cihaz bedeli dahil değildir.</text>
</svg>`
  },
  sections: [
    {
      h: "Bir toner kaç sayfa basar? Sayfa verimi ne demek?",
      p: [
        "Toner ve kartuş kutularında yazan \"yaklaşık 3.000 sayfa\" ya da \"6.000 sayfa\" ifadesine <strong>sayfa verimi</strong> (page yield) denir. Bu sayı, tonerin her koşulda o kadar sayfa basacağı anlamına gelmez; belirli bir test sayfası, belirli ayarlar ve belirli bir ortamda yapılan standart bir ölçümün sonucudur. Aynı tonerle bir ofis 6.000 sayfa, grafik ağırlıklı çalışan bir başka ofis 3.000 sayfa basabilir.",
        "Eskiden üreticiler verimi kendi yöntemleriyle ve çoğu zaman yalnızca \"%5 doluluk\" ifadesiyle açıklıyordu; sonuçlar birbirleriyle karşılaştırılamıyordu. Bu sorunu çözmek için Uluslararası Standardizasyon Örgütü (ISO) ile Uluslararası Elektroteknik Komisyonu (IEC) ortak test yöntemleri yayımladı. Bugün kutudaki verimin hangi standarda göre ölçüldüğünü belirtmek yaygın bir uygulamadır."
      ],
      table: {
        head: ["Standart", "Kapsam"],
        rows: [
          ["ISO/IEC 19752", "Siyah-beyaz (monokrom) lazer toner kartuşlarının sayfa verimi"],
          ["ISO/IEC 19798", "Renkli lazer toner kartuşlarının sayfa verimi"],
          ["ISO/IEC 24711", "Mürekkep püskürtmeli kartuşların sayfa verimi"],
          ["ISO/IEC 24712", "Renkli verim testlerinde kullanılan standart test sayfaları"]
        ]
      }
    },
    {
      h: "ISO/IEC 19752 sayfa verimini nasıl ölçer?",
      p: [
        "ISO/IEC 19752, siyah-beyaz lazer yazıcı tonerlerinin verimini ölçmek için ilk olarak 2004'te yayımlandı ve sonraki yıllarda güncellendi. Yöntemin amacı, farklı üreticilerin tonerlerini aynı kurallarla ölçerek karşılaştırılabilir bir sayı elde etmektir. Testin ana unsurları şunlardır:"
      ],
      ul: [
        "<strong>Standart test sayfası:</strong> Metin ve basit grafik içeren, yaklaşık %5 doluluğa karşılık gelen tanımlı bir test belgesi kullanılır. Sayfa, A4 ya da Letter kâğıda, yazıcının varsayılan ayarlarıyla basılır.",
        "<strong>Sürekli baskı:</strong> Test sayfası, toner ömrünün sonuna ulaşılana kadar kesintisiz basılır.",
        "<strong>Örnek sayısı:</strong> En az üç ayrı yazıcıda, her birinde en az üç kartuş olmak üzere toplam en az dokuz kartuş test edilir. Yazıcılar ve kartuşlar üreticinin seçtiği özel ürünler değil, piyasadan temin edilen ürünlerdir.",
        "<strong>Kontrollü ortam:</strong> Sıcaklık ve nem toner tüketimini etkilediği için test belirli çevre koşullarında yapılır; kâğıt türü ve hata durumlarının nasıl ele alınacağı da tanımlıdır.",
        "<strong>Ömür sonu ölçütü:</strong> Kartuşun ne zaman bitmiş sayılacağı, baskıdaki belirgin soluklaşma ya da yazıcının tonerin bittiğini bildirip durması gibi tanımlı ölçütlerle belirlenir. Üreticinin önerdiği çalkalama gibi işlemler de kurala bağlanmıştır.",
        "<strong>İstatistiksel alt sınır:</strong> Kutuda açıklanan verim, test sonuçlarının basit ortalaması değildir; standart, açıklanan değerin birden çok kartuş ve yazıcıyla yapılan ölçümlerin istatistiksel güven sınırı içinde kalmasını ister. Bu yüzden açıklanan sayı, ortalamadan biraz düşük ve temkinli bir değerdir."
      ],
      after: [
        "Standardın sağladığı şey adil bir karşılaştırma zeminidir: aynı standartla ölçülmüş iki tonerin verimini yan yana koyabilirsiniz. Ancak kendi ofisinizdeki gerçek verimi tahmin etmek için kendi sayfalarınızın doluluğunu hesaba katmanız gerekir. Renkli lazer tonerler için ISO/IEC 19798, birden fazla sayfadan oluşan ve her renk için ayrı doluluk içeren bir test seti kullanır."
      ]
    },
    {
      h: "%5 doluluk oranı ne demek?",
      p: [
        "Doluluk (kaplama) oranı, bir sayfanın yüzeyinin yüzde kaçının tonerle kaplandığını gösterir. %5 doluluk, normal satır aralığıyla yazılmış, kenar boşlukları bırakılmış, tablo ve logo içermeyen yarım ya da üç çeyrek sayfalık bir yazışmaya yakındır. Kalın yazı tipleri, tablolar, logolar, grafikler, gri tonlu alanlar ve fotoğraflar doluluğu hızla artırır."
      ],
      formula: "Gerçek verim ≈ kutudaki verim × 5 ÷ gerçek doluluk (%)\nÖrnek: 6.000 × 5 ÷ 10 = 3.000 sayfa",
      table: {
        head: ["Belge türü", "Tahmini doluluk", "6.000 sayfalık tonerin yaklaşık verimi"],
        rows: [
          ["Kısa yazışma, dilekçe", "%2,5–5", "6.000–12.000 sayfa"],
          ["Tipik ofis belgesi, fatura", "%5–8", "3.750–6.000 sayfa"],
          ["Tablolu rapor, antetli kağıt", "%8–12", "2.500–3.750 sayfa"],
          ["Grafik, sunum çıktısı", "%15–25", "1.200–2.000 sayfa"],
          ["Fotoğraf, koyu zeminli sayfa", "%30 ve üzeri", "1.000 sayfanın altında"]
        ],
        caption: "Doluluk değerleri tahminidir. Bazı yazıcı yönetim panelleri ve sürücüleri gerçek ortalama doluluğu gösterebilir."
      }
    },
    {
      h: "Toner ömrü neden üretici değerinden düşük çıkar?",
      ul: [
        "<strong>Yüksek doluluk:</strong> En büyük etkendir; sayfalarınız %10 doluysa verim yarıya iner.",
        "<strong>Kısa ve seyrek işler:</strong> Test sürekli baskıyla yapılır. Tek sayfalık sık işlerde yazıcının hazırlık ve temizleme döngüleri de bir miktar toner harcayabilir.",
        "<strong>Yoğunluk ayarı:</strong> Sürücüde baskı koyuluğunu artırmak toner tüketimini artırır; taslak ya da tasarruf modu azaltır.",
        "<strong>Başlangıç kartuşu:</strong> Bazı yazıcılar kutudan, normal kartuştan daha düşük kapasiteli bir başlangıç tonerle çıkar; ilk tonerin erken bitmesi bu yüzden olabilir.",
        "<strong>Ortam koşulları:</strong> Yüksek nem ve sıcaklık toner davranışını etkileyebilir.",
        "<strong>Erken uyarı:</strong> Yazıcı \"toner azaldı\" uyarısını kartuş tamamen bitmeden verir; baskı kalitesi bozulmadıkça basmaya devam etmek genellikle mümkündür."
      ],
      after: [
        "Kalan toner yüzdesinden ve günlük baskı adedinden tonerin kaç iş günü yeteceğini, yıllık kaç kartuş gerekeceğini [[arac:toner-omru-hesapla|toner ömrü hesaplama aracı]]yla bulabilirsiniz. Araç, gerçek verimi aynı formülle (verim × 5 ÷ doluluk) hesaplar."
      ]
    },
    {
      h: "Sayfa başı baskı maliyeti nasıl hesaplanır?",
      p: [
        "Yazıcı maliyetini doğru değerlendirmenin yolu, cihazın ya da tonerin kutu fiyatına değil, bir sayfanın kaça mal olduğuna bakmaktır. Sayfa başı maliyet üç ana kalemden oluşur: toner, kağıt ve (ayrı değiştirilen modellerde) drum ünitesi."
      ],
      formula: "Toner payı = toner fiyatı ÷ (kutudaki verim × 5 ÷ gerçek doluluk)\nKağıt payı = paket fiyatı ÷ paketteki yaprak sayısı\nDrum payı = drum fiyatı ÷ drum ömrü (sayfa)\nSayfa başı maliyet = toner payı + kağıt payı + drum payı",
      ol: [
        "Toner: örnek fiyat 2.400 TL, kutudaki verim 6.000 sayfa, sizin ortalama doluluğunuz %8. Gerçek verim 6.000 × 5 ÷ 8 = 3.750 sayfa; toner payı 2.400 ÷ 3.750 = 0,64 TL.",
        "Kağıt: örnek fiyat 250 TL'lik 500 yapraklık paket; kağıt payı 250 ÷ 500 = 0,50 TL.",
        "Drum: örnek fiyat 1.500 TL, ömrü 30.000 sayfa; drum payı 1.500 ÷ 30.000 = 0,05 TL.",
        "Toplam: 0,64 + 0,50 + 0,05 = 1,19 TL/sayfa. Ayda 2.000 sayfa basan bir ofis için aylık yaklaşık 2.380 TL, yıllık yaklaşık 28.560 TL."
      ],
      after: [
        "Örnekte kağıdın sayfa maliyetindeki payının toner kadar büyük olduğuna dikkat edin; çift taraflı baskı kağıt payını yarıya indirir. Tutarlar yalnızca hesabı göstermek için seçilmiş örneklerdir; kendi toner, kağıt ve drum fiyatlarınızı [[arac:sayfa-basi-maliyet-hesapla|sayfa başı maliyet hesaplama aracı]]na girerek gerçek maliyetinizi bulabilirsiniz. Bu hesapta elektrik, bakım ve yazıcının satın alma bedeli yer almaz."
      ]
    },
    {
      h: "Muadil ile orijinal toner nasıl karşılaştırılır?",
      p: [
        "Orijinal (cihaz üreticisinin) toner ile muadil (uyumlu) toner arasında karar verirken kutu fiyatı yanıltıcı olabilir. Doğru karşılaştırma, aynı ölçüm yöntemiyle belirtilmiş verimlere dayanan sayfa başı maliyettir."
      ],
      ul: [
        "<strong>Verimin dayanağını sorun:</strong> Kutudaki sayfa sayısının ISO/IEC 19752 gibi bir standarda göre mi ölçüldüğünü, yoksa yalnızca \"%5 doluluk\" ifadesiyle mi verildiğini kontrol edin. Standarda dayanmayan verim değerleri karşılaştırma için güvenilir değildir.",
        "<strong>Sayfa başı maliyeti hesaplayın:</strong> Her iki ürün için fiyatı verime bölün. Örneğin 2.400 TL'ye 6.000 sayfa 0,40 TL, 1.200 TL'ye 4.000 sayfa 0,30 TL eder; ikincisi kutuda daha az sayfa yazsa da sayfa başına daha ucuzdur.",
        "<strong>Baskı kalitesini deneyin:</strong> Soluk baskı, lekelenme ya da sızıntı, yeniden basılan sayfalar nedeniyle maliyeti artırır.",
        "<strong>Garanti ve iade koşullarını okuyun:</strong> Arızalı kartuşun değişim koşullarını ve kartuşun cihaz garantisine etkisi konusunda satıcının ve üreticinin açıklamalarını kontrol edin.",
        "<strong>Kurumsal alımlarda şartname:</strong> Kamu ve kurumsal alımlarda verimin standarda göre beyan edilmesini şartnameye yazmak, teklifleri karşılaştırılabilir hâle getirir."
      ]
    },
    {
      h: "Drum ünitesi ne zaman değişir?",
      p: [
        "Lazer yazıcılarda görüntüyü kağıda aktaran ışığa duyarlı silindire <strong>drum</strong> (görüntüleme ünitesi) denir. Bazı yazıcılarda drum tonerle aynı kartuşun içindedir ve her toner değişiminde yenilenir; bazılarında ise ayrı bir parçadır ve tonerden çok daha uzun ömürlüdür.",
        "Ayrı drum ünitelerinin ömrü sayfa sayısıyla belirtilir; ancak bu değer genellikle iş başına basılan sayfa sayısına bağlıdır, çünkü drum her işin başında ve sonunda da döner. Tek sayfalık çok sayıda işte drum, belirtilen sayfa sayısına ulaşmadan yıpranabilir. Sayfalarda tekrarlayan noktalar, çizgiler ya da gri bir zemin görünmeye başladığında ve yazıcı drum uyarısı verdiğinde değişim zamanı gelmiştir."
      ]
    },
    {
      h: "80 gr kağıt ne anlama gelir? Kağıt gramajı",
      p: [
        "Kağıt gramajı, kağıdın metrekare başına ağırlığıdır ve g/m² ile gösterilir. 80 gr kağıt, 1 metrekaresi 80 gram gelen kağıttır. Ofislerde en yaygın kullanılan gramaj 80 g/m²'dir; 70–75 g/m² daha ince ve ekonomik, 90–100 g/m² daha dolgun, 120 g/m² ve üzeri ise kapak, broşür ya da davetiye gibi işler içindir."
      ],
      formula: "Bir yaprağın ağırlığı (g) = en (m) × boy (m) × gramaj (g/m²)\nA4 (0,210 × 0,297 m) × 80 g/m² ≈ 5,0 g · 500 yaprak ≈ 2,5 kg",
      after: [
        "Yazıcıların destekleyebildiği gramaj aralığı kullanım kılavuzunda yazar. Kalın kağıtlar çoğu zaman manuel besleme tepsisinden ve \"kalın kağıt\" ayarıyla basılmalıdır. Kargo ya da arşiv planlaması için kağıt ağırlığını [[arac:kagit-agirligi-hesapla|kağıt ağırlığı hesaplama aracı]]yla, A serisi kağıt ölçülerini [[arac:kagit-boyutlari|kağıt boyutları aracı]]yla görebilirsiniz. A4'ün neden 21 × 29,7 cm olduğunu [[bilgi:a4-kagit-boyutu-kac-cm|A4 kağıt boyutu]] yazımız anlatır."
      ]
    },
    {
      h: "Ofis için lazer mi mürekkep püskürtmeli mi daha ekonomik?",
      p: [
        "Cevap baskı hacmine ve içeriğe bağlıdır. Lazer yazıcılar yüksek hacimli metin baskısında hızlı ve tutarlıdır; toner kuruma yapmadığı için uzun süre kullanılmadan beklemeye de dayanıklıdır. Mürekkep püskürtmeli yazıcılar renkli ve fotoğraf baskısında güçlüdür; uzun süre kullanılmadığında başlıklar kuruyabilir ve temizleme döngüleri mürekkep harcar. Doldurulabilir mürekkep tanklı modeller ise mürekkep maliyetini belirgin biçimde düşürebilir.",
        "Karar verirken cihaz fiyatını değil, birkaç yıllık toplam maliyeti hesaplayın: cihaz bedeli + (aylık sayfa × sayfa başı maliyet × ay sayısı). Ayda birkaç yüz sayfadan fazla siyah-beyaz baskı yapan ofislerde lazer çoğu zaman öne çıkarken düşük hacimli, renkli ağırlıklı kullanımda mürekkep tanklı çözümler avantajlı olabilir. Renkli baskıda renklerin neden ekrandakinden farklı çıktığını [[bilgi:cmyk-ve-rgb-farki-baski|CMYK ve RGB farkı]] yazımız anlatır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kutudaki verimi garanti sanmak:</strong> Verim standart test sayfası içindir; kendi dolulukunuzla düzeltin.",
        "<strong>Kutu fiyatıyla karşılaştırmak:</strong> Ucuz toner az sayfa basıyorsa sayfa başına daha pahalı olabilir.",
        "<strong>Kağıdı hesaba katmamak:</strong> Kağıt, sayfa maliyetinin önemli bir bölümünü oluşturur.",
        "<strong>Standarda dayanmayan verimlere güvenmek:</strong> Ölçüm yöntemi belirtilmeyen sayfa sayıları karşılaştırılamaz.",
        "<strong>İlk tonerle karar vermek:</strong> Cihazla gelen başlangıç kartuşu daha düşük kapasiteli olabilir."
      ]
    }
  ],
  faq: [
    ["Bir toner kaç sayfa basar?", "Toner kutusunda yazan sayfa verimi kadar, ancak bu değer standart test sayfasındaki yaklaşık yüzde 5 doluluk için geçerlidir. Sayfalarınız daha doluysa verim orantılı olarak azalır; örneğin yüzde 10 dolulukta yaklaşık yarısı kadar sayfa basılır."],
    ["%5 doluluk oranı ne demek?", "Yüzde 5 doluluk, sayfa yüzeyinin yaklaşık yüzde beşinin tonerle kaplanmasıdır. Kenar boşlukları olan, tablo ve logo içermeyen kısa bir yazışma sayfası bu orana yakındır; grafikler ve fotoğraflar doluluğu belirgin biçimde artırır."],
    ["Sayfa başı baskı maliyeti nasıl hesaplanır?", "Toner fiyatı gerçek verime, kağıt paketi fiyatı yaprak sayısına, drum fiyatı drum ömrüne bölünür ve üç sonuç toplanır. Gerçek verim, kutudaki verimin 5 ile çarpılıp kendi doluluk oranınıza bölünmesiyle bulunur."],
    ["Toner ömrü neden üretici değerinden düşük çıkar?", "Sayfalarınızın standart test sayfasından daha dolu olması en büyük nedendir. Kısa ve seyrek baskı işleri, yüksek koyuluk ayarı, cihazla gelen düşük kapasiteli başlangıç kartuşu ve ortam koşulları da verimi düşürebilir."],
    ["Muadil ile orijinal toner maliyeti nasıl karşılaştırılır?", "Her iki ürünün fiyatını aynı standarda göre ölçülmüş sayfa verimine bölerek sayfa başı maliyeti karşılaştırın. Verimin ISO/IEC 19752 gibi bir standarda dayanıp dayanmadığını, baskı kalitesini ve garanti koşullarını da kontrol edin."],
    ["Drum ünitesi ne zaman değişir?", "Ayrı drum üniteleri tonerden uzun ömürlüdür ve yazıcı drum uyarısı verdiğinde ya da sayfalarda tekrarlayan nokta, çizgi veya gri zemin oluştuğunda değiştirilir. Drum ömrü iş başına basılan sayfa sayısına göre değişir."],
    ["80 gr kağıt ne anlama gelir?", "80 gr kağıt, bir metrekaresi 80 gram gelen kağıt demektir ve ofislerde en yaygın gramajdır. Bir A4 yaprağı yaklaşık 5 gram, 500 yapraklık bir paket yaklaşık 2,5 kilogram gelir."],
    ["Ofis için lazer mi mürekkepli mi daha ekonomik?", "Yüksek hacimli siyah-beyaz baskıda lazer yazıcılar genellikle daha ekonomik ve hızlıdır. Düşük hacimli ve renkli ağırlıklı kullanımda mürekkep tanklı yazıcılar avantajlı olabilir; karar için birkaç yıllık toplam maliyeti hesaplayın."],
    ["ISO/IEC 19752 nedir?", "ISO/IEC 19752, siyah-beyaz lazer toner kartuşlarının sayfa verimini ölçmek için uluslararası test yöntemidir. Standart test sayfası, en az dokuz kartuş, kontrollü ortam ve tanımlı ömür sonu ölçütleriyle karşılaştırılabilir bir verim değeri elde edilmesini sağlar."]
  ],
  tools: ["toner-omru-hesapla", "sayfa-basi-maliyet-hesapla", "kagit-agirligi-hesapla", "kagit-boyutlari"],
  related: ["a4-kagit-boyutu-kac-cm", "cmyk-ve-rgb-farki-baski", "kar-marji-nasil-hesaplanir"],
  sources: [
    ["ISO – ISO/IEC 19752 Monokrom toner kartuşları için sayfa verimi belirleme yöntemi", "https://www.iso.org/"],
    ["IEC – Uluslararası Elektroteknik Komisyonu", "https://www.iec.ch/"]
  ]
};
