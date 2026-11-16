export default {
  slug: "su-faturasi-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Su Faturası Nasıl Hesaplanır? Metreküp Fiyatı ve Duş Su Tüketimi",
  pageTitle: "Su Faturası Nasıl Hesaplanır? Metreküp ve Atık Su Bedeli",
  description: "Su faturası nasıl hesaplanır? 1 m³ kaç litre, atık su bedeli, kademeli tarife, KDV ve ÇTV kalemleri, 10 dakikalık duş kaç litre ve dört kişilik ailenin örnek faturası.",
  keywords: ["su faturası hesaplama", "1 ton su kaç tl", "su metreküp fiyatı", "duş kaç litre su harcar", "atık su bedeli", "kademeli su tarifesi", "su tasarrufu", "su sayacı endeksi"],
  lead: "Su faturası, <strong>dönem içinde sayaçtan geçen su miktarının (m³) birim fiyatla çarpılması</strong> ve buna atık su bedeli, varsa sabit bedeller, çevre temizlik vergisi ve KDV eklenmesiyle hesaplanır. 1 metreküp 1.000 litredir ve halk arasında \"1 ton su\" denir. Birim fiyatlar belediyeden belediyeye ve aynı belediyede tüketim kademesine göre değiştiği için bu yazıdaki tutarlar örnek tutardır; kendi tarifenizi su idarenizin sitesinden ya da faturanızdan alın. Aşağıda sayaç okumadan duş tüketimine kadar tüm hesabı örnekle anlatıyoruz.",
  kisaCevap: [
    "1 m³ = 1.000 litre ≈ 1 ton su; sayaçtaki siyah rakamlar m³, kırmızı rakamlar litreyi gösterir.",
    "Dönem tüketimi = son endeks − ilk endeks (m³).",
    "Su bedeli = tüketim × su birim fiyatı; kademeli tarifede her kademe kendi fiyatıyla hesaplanır.",
    "Atık su bedeli genellikle aynı m³ üzerinden ayrı bir birim fiyatla eklenir.",
    "Faturada ayrıca çevre temizlik vergisi, varsa sabit bedel ve KDV yer alabilir; oranlar faturada yazar.",
    "10 L/dk debili duş başlığıyla 10 dakikalık duş 100 litre su harcar."
  ],
  figure: {
    alt: "Örnek su faturası dökümü: 14,4 metreküp tüketim, kademeli su bedeli 664 TL, atık su bedeli 288 TL, ara toplam 952 TL; yanında 10 dakikalık duşun 100 litre, 6 dakikalık duşun 60 litre su harcadığını gösteren çubuklar.",
    caption: "Dört kişilik ailenin örnek aylık tüketimi 14,4 m³. Örnek tarifede ilk 10 m³ 40 TL'den, kalanı 60 TL'den; atık su 20 TL/m³. KDV ve diğer kalemler ara toplama eklenir. Tutarlar örnektir, tarifeler belediyeye göre değişir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Su faturası nasıl oluşur? (örnek tutar)</text>
  <rect x="20" y="50" width="400" height="350" rx="12" class="sf sb"/>
  <text x="40" y="80" class="b">Sayaç: 1.245,6 → 1.260,0 m³</text>
  <text x="40" y="104" class="sm t2">Tüketim = 1.260,0 − 1.245,6 = <tspan class="b">14,4 m³</tspan> (14.400 L)</text>
  <line x1="40" y1="118" x2="400" y2="118" class="sb" fill="none"/>
  <text x="40" y="144" class="sm">1. kademe: 10 m³ × 40 TL</text><text x="400" y="144" class="sm b end">400 TL</text>
  <text x="40" y="168" class="sm">2. kademe: 4,4 m³ × 60 TL</text><text x="400" y="168" class="sm b end">264 TL</text>
  <rect x="40" y="178" width="360" height="26" rx="4" class="ps"/>
  <text x="52" y="196" class="sm b">Su bedeli</text><text x="392" y="196" class="sm b end">664 TL</text>
  <text x="40" y="228" class="sm">Atık su: 14,4 m³ × 20 TL</text><text x="400" y="228" class="sm b end">288 TL</text>
  <rect x="40" y="240" width="360" height="30" rx="6" class="p"/>
  <text x="52" y="261" class="b sf">Ara toplam</text><text x="392" y="261" class="b sf end">952 TL</text>
  <text x="40" y="296" class="sm">+ Çevre temizlik vergisi (belediyeye göre)</text>
  <text x="40" y="318" class="sm">+ Varsa sabit bedel / sayaç bedeli</text>
  <text x="40" y="340" class="sm">+ KDV (oran faturada yazar)</text>
  <text x="40" y="378" class="sm t2">Birim fiyatlar örnektir; kendi tarifenizi kullanın.</text>
  <rect x="440" y="50" width="260" height="350" rx="12" class="sf sb"/>
  <text x="570" y="80" class="b mid">Bir duş kaç litre?</text>
  <line x1="470" y1="340" x2="680" y2="340" class="st" fill="none"/>
  <rect x="480" y="140" width="80" height="200" rx="4" class="dgs"/>
  <text x="520" y="130" class="b mid">100 L</text>
  <text x="520" y="360" class="sm mid">10 dk</text><text x="520" y="378" class="sm mid">10 L/dk</text>
  <rect x="590" y="220" width="80" height="120" rx="4" class="oks"/>
  <text x="630" y="210" class="b mid">60 L</text>
  <text x="630" y="360" class="sm mid">6 dk</text><text x="630" y="378" class="sm mid">10 L/dk</text>
  <text x="570" y="104" class="sm mid t2">litre = süre × debi</text>
</svg>`
  },
  sections: [
    {
      h: "1 metreküp (1 ton) su kaç litredir?",
      p: [
        "Su faturalarında birim metreküptür (m³). 1 metreküp, kenarları 1 metre olan bir küpün hacmidir ve <strong>1.000 litreye</strong> eşittir. Suyun yoğunluğu yaklaşık 1 kg/litre olduğu için 1 m³ su yaklaşık 1.000 kg, yani 1 ton gelir; bu yüzden günlük dilde \"tonu kaç lira\" denir. 1 ton su ile 1 metreküp su pratikte aynı şeydir.",
        "Litre ile metreküp arasındaki çevirmeyi doğru yapmak, günlük alışkanlıkların faturaya etkisini görmenin anahtarıdır. 100 litrelik bir duş 0,1 m³, 15 litrelik bir bulaşık makinesi programı 0,015 m³, 1.000 litrelik bir çatı deposu 1 m³'tür. Hızlı dönüşüm için [[arac:litre-metrekup-cevir|Litre Metreküp Çevirici]] aracını, depo ve havuz hacimleri için [[bilgi:su-deposu-kac-litre-havuz-kac-ton|su deposu kaç litre]] yazısını kullanabilirsiniz."
      ]
    },
    {
      h: "Su sayacı nasıl okunur, tüketim nasıl bulunur?",
      p: [
        "Mekanik su sayaçlarında genellikle iki renk rakam bulunur: <strong>siyah rakamlar metreküpü</strong>, kırmızı rakamlar ya da küçük kadranlar litreyi (metreküpün binde birini) gösterir. Fatura hesabında siyah rakamlar esas alınır; bazı idareler ondalık kısmı da kullanır. Kartlı ve uzaktan okunan sayaçlarda değer ekranda m³ olarak görünür.",
        "Dönem tüketimi, son okuma ile ilk okuma arasındaki farktır. Örneğin bir önceki okumada sayaç 1.245,6 m³, bu ay 1.260,0 m³ gösteriyorsa tüketim 14,4 m³'tür. Okuma aralığı 30 günden farklıysa (örneğin 34 gün), günlük ortalama ve 30 günlük karşılığını bulmak tüketiminizi aydan aya karşılaştırmanızı sağlar. [[arac:su-tuketimi-hesapla|Su Tüketimi Hesaplama]] aracı endeksleri girdiğinizde günlük, kişi başı ve 30 günlük tüketimi hesaplar."
      ],
      formula: "Tüketim (m³) = son endeks − ilk endeks = 1.260,0 − 1.245,6 = 14,4 m³\nGünlük ortalama (L) = tüketim × 1.000 ÷ gün sayısı = 14.400 ÷ 30 = 480 L/gün\nKişi başı günlük (L) = 480 ÷ 4 = 120 L/kişi/gün",
      after: [
        "Sızıntı kontrolü için evdeki tüm muslukları kapatıp sayaca bakın. Kırmızı kadran ya da küçük yıldız çark dönmeye devam ediyorsa tesisatta, rezervuarda ya da bir muslukta kaçak olabilir. Sızdıran bir klozet rezervuarı günde yüzlerce litre suyu fark edilmeden harcayabilir."
      ]
    },
    {
      h: "Su faturası nasıl hesaplanır? Kalemler tek tek",
      p: [
        "Faturanın yapısı belediyeden belediyeye biraz değişse de çoğunda aynı kalemler bulunur. Her kalemin kendi birim fiyatı ya da oranı olduğu için toplam tutarı anlamanın yolu faturayı satır satır okumaktır."
      ],
      table: {
        head: ["Kalem", "Nasıl hesaplanır?", "Not"],
        rows: [
          ["Su bedeli", "Tüketim (m³) × su birim fiyatı", "Kademeli tarifede kademe kademe"],
          ["Atık su bedeli", "Tüketim (m³) × atık su birim fiyatı", "Kanalizasyon ve arıtma hizmeti karşılığı"],
          ["Sabit bedel / sayaç bedeli", "Dönem başına sabit tutar", "Her idarede bulunmayabilir"],
          ["Çevre temizlik vergisi (ÇTV)", "Belediyenin belirlediği tutar ya da tüketime göre", "Konutlarda çoğu zaman su faturasıyla tahsil edilir"],
          ["KDV", "İlgili kalemlerin toplamı × KDV oranı", "Oran ve hangi kalemlere uygulandığı faturada yazar"]
        ],
        caption: "Abone türüne (konut, işyeri, resmî daire, şantiye) göre birim fiyatlar ayrı belirlenir. Güncel tarife için su idarenizin sitesine bakın."
      },
      after: [
        "Su bedeli ile atık su bedeli genellikle aynı m³ üzerinden hesaplanır; bu nedenle tükettiğiniz her metreküp iki kez fiyatlanır. Bahçe sulaması gibi kanalizasyona gitmeyen kullanımlar için bazı idarelerde ayrı sayaç ve tarife seçeneği bulunur. Çevre ve atık bedellerinin su tüketimine bağlanmasını öngören \"kirleten öder\" düzenlemesi Çevre, Şehircilik ve İklim Değişikliği Bakanlığı tarafından yönetmelikle getirilmiş, uygulama tarihi ertelenmiştir; belediyenizdeki güncel durumu su idarenizden öğrenin."
      ]
    },
    {
      h: "Kademeli tarife nasıl işler? Çözümlü örnek",
      p: [
        "Birçok belediye su tasarrufunu teşvik etmek için konutlarda kademeli tarife uygular: belirli bir miktara kadar düşük, o miktarın üzerindeki tüketime daha yüksek birim fiyat uygulanır. Kademeli tarifede tüm tüketim yüksek fiyattan değil, yalnızca sınırı aşan kısım yüksek fiyattan hesaplanır; bu mantık gelir vergisi dilimlerine benzer."
      ],
      ol: [
        "Örnek tarifeyi belirleyin: 0–10 m³ için 40 TL/m³, 10 m³ üzeri için 60 TL/m³; atık su 20 TL/m³. Bu fiyatlar örnek tutardır.",
        "Birinci kademe: 10 m³ × 40 TL = 400 TL.",
        "İkinci kademe: (14,4 − 10) = 4,4 m³ × 60 TL = 264 TL. Su bedeli toplamı 664 TL.",
        "Atık su bedeli: 14,4 m³ × 20 TL = 288 TL.",
        "Ara toplam: 664 + 288 = 952 TL. Buna faturanızdaki ÇTV ve sabit bedeller eklenir, ardından KDV hesaplanır."
      ],
      after: [
        "KDV'yi eklerken hangi kalemlere uygulandığına ve oranına faturanızdan bakın; [[arac:kdv-hesapla|KDV Hesaplama]] aracı KDV hariç tutardan dahil tutara geçmeyi kolaylaştırır. Kademeli tarifede bir ailenin aynı tüketimi farklı okuma dönemlerine yayması, örneğin okuma 30 yerine 40 gün sonra yapıldığında, kademe sınırını aşmasına neden olabilir; bazı idareler bunu gün sayısına göre orantılayarak düzeltir."
      ]
    },
    {
      h: "10 dakikalık duş kaç litre su harcar?",
      p: [
        "Bir duşta harcanan su, duş süresi ile duş başlığının debisinin (dakikada akan litre) çarpımıdır. Standart duş başlıkları dakikada yaklaşık 8–15 litre, su tasarruflu başlıklar 6–8 litre akıtır. Debiyi ölçmek için duşu tam açıp bir kovayı 10 saniye doldurun; kovadaki litreyi 6 ile çarparak dakikalık debiyi bulursunuz."
      ],
      formula: "Duş başına su (L) = süre (dk) × debi (L/dk)\n10 dk × 10 L/dk = 100 L · 6 dk × 10 L/dk = 60 L · 10 dk × 6 L/dk = 60 L\nSuyu 25 °C ısıtmak için enerji ≈ litre × 25 × 1,163 Wh = 100 L için ≈ 2,9 kWh",
      after: [
        "Dört kişilik bir ailede her biri günde bir kez 10 dakikalık duş alıyorsa günde 400 litre, ayda 12 m³ su yalnızca duşa gider. Duş süresini 6 dakikaya indirmek ayda 4,8 m³ tasarruf eder. Örnek tarifede bu miktarın ikinci kademeden düştüğünü varsayarsak su ve atık su bedelinde 4,8 × (60 + 20) = 384 TL'lik bir azalma olur; üstelik ısıtılmayan suyun enerji tasarrufu da eklenir. Kendi değerlerinizle hesap için [[arac:dus-su-tuketimi-hesapla|Duş Su Tüketimi Hesaplama]] aracını kullanın; suyu ısıtan doğalgazın maliyeti için [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası]] yazısına bakın."
      ]
    },
    {
      h: "Dört kişilik ailenin aylık su tüketimi ne kadar?",
      p: [
        "Tüketim; hane büyüklüğüne, alışkanlıklara, ev aletlerine ve bahçe olup olmamasına göre büyük farklılık gösterir. Tek bir \"normal\" değer vermek yerine kullanım kalemlerinden bir tahmin yapmak daha öğreticidir. Aşağıdaki tablo dört kişilik bir hane için örnek bir günlük kullanım dökümüdür."
      ],
      table: {
        head: ["Kullanım", "Örnek varsayım", "Günlük (4 kişi)"],
        rows: [
          ["Duş", "Kişi başı 7 dk × 9 L/dk", "252 L"],
          ["Klozet", "Kişi başı 5 sifon × 6 L", "120 L"],
          ["Lavabo (el, yüz, diş)", "Kişi başı 10 L", "40 L"],
          ["Mutfak (yemek, içme, elde yıkama)", "Hane için", "40 L"],
          ["Bulaşık makinesi", "Günde 1 program × 12 L", "12 L"],
          ["Çamaşır makinesi", "Haftada 4 yıkama × 50 L ÷ 7", "29 L"],
          ["Toplam", "", "≈ 493 L/gün → ≈ 14,8 m³/ay"]
        ],
        caption: "Değerler örnektir. Bahçe sulaması, havuz ya da eski tip sifonlar tüketimi belirgin biçimde artırır."
      },
      after: [
        "Kendi faturanızdaki tüketimi kişi sayısına ve gün sayısına bölerek kişi başı günlük litre değerinizi bulun; bu, aylar arası değişimi ve olası kaçakları izlemenin en kolay yoludur. Ani bir artış görüyorsanız önce sızıntı kontrolü yapın."
      ]
    },
    {
      h: "Su tasarrufu faturaya ne kadar yansır?",
      ul: [
        "<strong>Duş süresini kısaltmak:</strong> Dakika başına yaklaşık 8–12 litre tasarruf; dört kişide günde 2 dakika kısaltma ayda yaklaşık 2–3 m³ eder.",
        "<strong>Tasarruflu duş başlığı ve musluk perlatörü:</strong> Akışı %30–50 azaltabilir; maliyeti düşük, geri dönüşü hızlıdır.",
        "<strong>Çift kademeli sifon:</strong> Küçük kademe 3–4 litre, büyük kademe 6 litre kullanır.",
        "<strong>Kaçakları gidermek:</strong> Damlayan bir musluk ya da sızdıran bir rezervuar ayda birkaç metreküp suyu boşa harcayabilir.",
        "<strong>Makineleri tam dolu çalıştırmak:</strong> Yarım yük ile tam yük aynı suyu harcar; elde bulaşık yıkamak çoğu zaman makineden fazla su tüketir.",
        "<strong>Bahçe sulamasını akşam yapmak:</strong> Buharlaşma azalır; damla sulama hortumla sulamaya göre çok daha az su harcar."
      ],
      after: [
        "Kademeli tarifede tasarrufun etkisi daha büyüktür, çünkü azalan tüketim önce en pahalı kademeden düşer. Örnek tarifede 14,4 m³'ten 10 m³'e inmek, su ve atık su bedelinde 4,4 × 80 = 352 TL'lik bir fark yaratır. Bahçe sulaması için [[bilgi:damla-sulama-ne-kadar-su-verilir|damla sulama ne kadar su verilir]] yazısı faydalı olabilir."
      ]
    },
    {
      h: "Su faturasında sık yapılan hatalar",
      ul: [
        "<strong>Tek fiyatla hesaplamak:</strong> Kademeli tarifede tüm tüketimi ilk kademe fiyatıyla çarpmak faturayı olduğundan düşük gösterir.",
        "<strong>Atık su bedelini unutmak:</strong> Toplam m³ maliyetinin önemli bir kısmı atık su bedelidir.",
        "<strong>Okuma gün sayısını gözden kaçırmak:</strong> 40 günlük bir dönemi 30 günlük faturayla karşılaştırmak yanıltır.",
        "<strong>Kırmızı rakamları m³ sanmak:</strong> Sayaçtaki kırmızı rakamlar litredir; okumayı siyah rakamlardan yapın.",
        "<strong>Başka belediyenin tarifesini kullanmak:</strong> Birim fiyatlar şehirden şehre, hatta aynı şehirde abone türüne göre değişir."
      ],
      after: [
        "Bu sayfadaki tüm birim fiyatlar örnek tutardır. Faturanıza itirazınız varsa okuma fotoğrafı ve tarih bilgisiyle su idarenize başvurabilirsiniz. Elektrik faturasının benzer yapısı için [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Su faturası nasıl hesaplanır?", "Son ve ilk sayaç endeksi arasındaki fark tüketimi verir. Tüketim su birim fiyatıyla, ayrıca atık su birim fiyatıyla çarpılır; varsa sabit bedel, çevre temizlik vergisi ve KDV eklenerek fatura tutarı bulunur."],
    ["1 metreküp (1 ton) su kaç litredir?", "1 metreküp su 1.000 litredir. Suyun yoğunluğu yaklaşık 1 kg/litre olduğu için 1 m³ su yaklaşık 1 ton gelir; bu nedenle faturalarda metreküp fiyatına halk arasında ton fiyatı denir."],
    ["Atık su bedeli faturaya nasıl eklenir?", "Atık su bedeli genellikle tükettiğiniz suyun metreküpü üzerinden ayrı bir birim fiyatla hesaplanır ve su bedelinin yanına eklenir. Kanalizasyon ve arıtma hizmetinin karşılığıdır; oranı belediyeye göre değişir."],
    ["10 dakikalık duş kaç litre su harcar?", "Duş başlığının debisine bağlıdır. Dakikada 10 litre akıtan bir başlıkla 10 dakikalık duş 100 litre, dakikada 6 litre akıtan tasarruflu başlıkla 60 litre su harcar."],
    ["Dört kişilik ailenin aylık su tüketimi ne kadar?", "Alışkanlıklara göre çok değişir; duş, klozet, mutfak ve makineler için yapılan örnek bir dökümde dört kişilik hane günde yaklaşık 490 litre, ayda yaklaşık 15 m³ su kullanır. Bahçe varsa tüketim artar."],
    ["Kademeli tarife nasıl işler?", "Belirli bir tüketim miktarına kadar düşük, bu miktarı aşan kısma daha yüksek birim fiyat uygulanır. Tüm tüketim yüksek fiyattan değil, yalnızca sınırı aşan kısım üst kademe fiyatından hesaplanır."],
    ["Su faturasında KDV var mı?", "Evet, su faturalarında KDV uygulanır. Oranın ne olduğu ve hangi kalemlere uygulandığı faturanızda ayrıca gösterilir; güncel oranlar için faturanızı ve Gelir İdaresi Başkanlığı duyurularını kontrol edin."],
    ["Su tasarrufu faturaya ne kadar yansır?", "Tasarruf edilen her metreküp hem su hem atık su bedelinden düşer; kademeli tarifede önce pahalı kademeden azalır. Örnek tarifede 4,8 m³ tasarruf su ve atık su bedelinde yaklaşık 384 TL azalma sağlar."],
    ["Su sayacında kırmızı rakamlar ne anlama gelir?", "Mekanik sayaçlarda siyah rakamlar metreküpü, kırmızı rakamlar ya da küçük kadranlar litreyi gösterir. Fatura okumasında siyah rakamlar esas alınır; tüm musluklar kapalıyken kırmızı kadran dönüyorsa kaçak olabilir."]
  ],
  tools: ["su-tuketimi-hesapla", "dus-su-tuketimi-hesapla", "litre-metrekup-cevir", "kdv-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "dogalgaz-faturasi-ve-kombi-kapasitesi", "su-deposu-kac-litre-havuz-kac-ton", "damla-sulama-ne-kadar-su-verilir"],
  sources: [
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", "https://csb.gov.tr/"],
    ["Gelir İdaresi Başkanlığı – KDV ve çevre temizlik vergisi", "https://www.gib.gov.tr/"]
  ]
};
