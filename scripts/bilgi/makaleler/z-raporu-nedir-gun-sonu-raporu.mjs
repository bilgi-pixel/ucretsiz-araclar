export default {
  slug: "z-raporu-nedir-gun-sonu-raporu",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "Z Raporu Nedir? Yazar Kasa Gün Sonu Raporu Nasıl Okunur ve Saklanır",
  pageTitle: "Z Raporu Nedir? Yazar Kasa Gün Sonu Raporu Nasıl Okunur",
  description: "Z raporu, ödeme kaydedici cihazın günlük satışları kapatan mali gün sonu raporudur. X raporu farkı, KDV toplamlarını okuma, nakit-kart ayrımı ve saklama.",
  keywords: ["z raporu nedir", "x raporu z raporu farkı", "yazar kasa gün sonu raporu", "z raporu nasıl alınır", "z raporu saklama süresi", "z raporu muhasebeye nasıl işlenir", "ökc gün sonu", "z raporu kdv"],
  lead: "Z raporu, ödeme kaydedici cihazın (ÖKC, yazar kasa) o günkü tüm satışlarını KDV oranlarına ve ödeme türlerine göre toplayıp <strong>mali hafızaya kalıcı olarak yazan ve günü kapatan gün sonu raporudur</strong>; her iş günü sonunda alınması zorunludur. X raporu ise günü kapatmayan, bilgi amaçlı ara rapordur. Bu sayfada Z raporunda hangi bilgilerin bulunduğunu, KDV toplamlarının nasıl okunduğunu, nakit ve kartlı satışların nasıl ayrıldığını, muhasebeye nasıl işlendiğini ve kaç yıl saklandığını çözümlü bir örnekle bulacaksınız.",
  kisaCevap: [
    "Z raporu, ÖKC'nin günlük satışlarını kapatan ve mali hafızaya kaydeden zorunlu gün sonu raporudur.",
    "X raporu aynı bilgileri gösterir ama günü kapatmaz ve mali hafızaya yazmaz; gün içinde kontrol için alınır.",
    "Z raporunda tarih, Z numarası, fiş sayısı, KDV oranlarına göre matrah ve KDV, toplam satış ile nakit-kart dağılımı yer alır.",
    "KDV dahil satıştan KDV'yi bulmak için: KDV = brüt tutar × oran ÷ (100 + oran).",
    "Z raporları Vergi Usul Kanunu md. 253'e göre en az 5 yıl, tacirler için TTK açısından 10 yıl saklanır.",
    "Yeni nesil ÖKC'lerde Z raporu verileri ayrıca elektronik olarak Gelir İdaresi Başkanlığı'na iletilir."
  ],
  figure: {
    alt: "Örnek Z raporu: yüzde 20, yüzde 10 ve yüzde 1 KDV gruplarında brüt satış, matrah ve KDV; toplam 18.510 TL satış, 2.510 TL KDV; 7.510 TL nakit ve 11.000 TL kredi kartı.",
    caption: "Çözümlü örnekteki Z raporunun sadeleştirilmiş görünümü. Brüt satışlar KDV dahildir; matrah ve KDV her oran grubu için ayrı hesaplanır. Tutarlar örnektir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Z raporu nasıl okunur? (örnek)</text>
  <rect x="40" y="44" width="300" height="380" rx="6" class="sf sb"/>
  <text x="190" y="70" class="b mid">ÖRNEK İŞLETME</text>
  <text x="190" y="90" class="sm mid t2">Tarih 16.11.2026 · Z NO: 0412</text>
  <line x1="56" y1="102" x2="324" y2="102" class="sb dash" fill="none"/>
  <g class="sm">
    <text x="56" y="124">Fiş sayısı</text><text x="324" y="124" class="end">142</text>
    <text x="56" y="152" class="b">KDV %20  brüt</text><text x="324" y="152" class="end b">12.000,00</text>
    <text x="70" y="170" class="t2">matrah / KDV</text><text x="324" y="170" class="end t2">10.000,00 / 2.000,00</text>
    <text x="56" y="196" class="b">KDV %10  brüt</text><text x="324" y="196" class="end b">5.500,00</text>
    <text x="70" y="214" class="t2">matrah / KDV</text><text x="324" y="214" class="end t2">5.000,00 / 500,00</text>
    <text x="56" y="240" class="b">KDV %1  brüt</text><text x="324" y="240" class="end b">1.010,00</text>
    <text x="70" y="258" class="t2">matrah / KDV</text><text x="324" y="258" class="end t2">1.000,00 / 10,00</text>
  </g>
  <line x1="56" y1="272" x2="324" y2="272" class="sb dash" fill="none"/>
  <g class="sm">
    <text x="56" y="294" class="b">TOPLAM SATIŞ</text><text x="324" y="294" class="end b">18.510,00</text>
    <text x="56" y="316" class="b">TOPLAM KDV</text><text x="324" y="316" class="end b">2.510,00</text>
    <text x="56" y="344">Nakit</text><text x="324" y="344" class="end">7.510,00</text>
    <text x="56" y="366">Kredi kartı</text><text x="324" y="366" class="end">11.000,00</text>
  </g>
  <line x1="56" y1="380" x2="324" y2="380" class="sb dash" fill="none"/>
  <text x="190" y="404" class="sm mid b">MALİ HAFIZA · GÜN KAPANDI</text>
  <rect x="370" y="60" width="320" height="96" rx="8" class="ps"/>
  <text x="386" y="86" class="b">KDV dahil tutardan KDV</text>
  <text x="386" y="112" class="sm">12.000 × 20 ÷ 120 = 2.000 TL</text>
  <text x="386" y="134" class="sm">5.500 × 10 ÷ 110 = 500 TL</text>
  <rect x="370" y="172" width="320" height="96" rx="8" class="oks"/>
  <text x="386" y="198" class="b">Ödeme kontrolü</text>
  <text x="386" y="224" class="sm">7.510 + 11.000 = 18.510 TL</text>
  <text x="386" y="246" class="sm">Kasa sayımı ve POS gün sonu ile eşleşmeli</text>
  <rect x="370" y="284" width="320" height="110" rx="8" class="p"/>
  <text x="386" y="310" class="b sf">X raporu ≠ Z raporu</text>
  <text x="386" y="334" class="sm sf">X: gün içi bilgi, günü kapatmaz</text>
  <text x="386" y="356" class="sm sf">Z: günü kapatır, mali hafızaya yazar,</text>
  <text x="386" y="376" class="sm sf">her gün bir kez ve sırayla numaralanır</text>
</svg>`
  },
  sections: [
    {
      h: "Z raporu nedir?",
      p: [
        "Perakende satış yapan ve Vergi Usul Kanunu'na göre fatura yerine perakende satış fişi düzenleyebilen işletmeler, satışlarını <strong>ödeme kaydedici cihazlar (ÖKC)</strong> ile kayda geçirir. Yazar kasa ve yeni nesil yazar kasa POS cihazları bu gruptadır. Z raporu, bu cihazın gün içinde kestiği tüm fişleri tek bir kapanış raporunda toplayan belgedir.",
        "Z raporu alındığında o günün satış toplamları cihazın silinemeyen <strong>mali hafızasına</strong> yazılır, rapora sıra numarası (Z numarası) verilir ve cihaz yeni güne geçer. Bu yüzden Z raporu, işletmenin o günkü hasılatının vergi idaresi açısından resmî kaydıdır ve muhasebe kayıtlarının dayanağını oluşturur.",
        "Yeni nesil ÖKC'lerde Z raporu verileri, cihazın bağlı olduğu hizmet merkezi üzerinden elektronik olarak Gelir İdaresi Başkanlığı'na iletilir. Cihazın internet bağlantısının kesintisiz tutulması işletmenin sorumluluğundadır."
      ]
    },
    {
      h: "X raporu ile Z raporu arasındaki fark",
      table: {
        head: ["Özellik", "X raporu", "Z raporu"],
        rows: [
          ["Amacı", "Gün içi bilgi ve kontrol", "Günü mali olarak kapatmak"],
          ["Mali hafızaya yazılır mı?", "Hayır", "Evet, kalıcı olarak"],
          ["Kaç kez alınabilir?", "Gün içinde istenildiği kadar", "Her mali gün için bir kez"],
          ["Numara", "Sıra numarası yok ya da bilgi amaçlı", "Sırayla artan Z numarası"],
          ["Muhasebe belgesi mi?", "Hayır", "Evet, hasılat kaydının dayanağı"],
          ["Ne zaman alınır?", "Vardiya değişimi, ara kasa sayımı", "İş günü kapanışında"]
        ]
      },
      after: [
        "Vardiyalı çalışan bir dükkânda her vardiya sonunda X raporu alıp kasa sayımıyla karşılaştırmak, gün sonunda Z raporu ile çıkabilecek farkların hangi vardiyada oluştuğunu bulmayı kolaylaştırır."
      ]
    },
    {
      h: "Z raporu ne zaman alınmalıdır?",
      p: [
        "Z raporu her iş günü sonunda, o gün satış yapılmasa bile cihazın kullanıldığı her gün için alınır. Mali gün kural olarak 00.00–24.00 arasını kapsar. Gece yarısından sonra da açık kalan işletmeler (restoran, kafe, eczane nöbeti gibi) Z raporunu kapanış saatinde alır; gece yarısından sonraki satışlar uygulamada önceki güne ait sayılır.",
        "Cihaz hurdaya ayrılmadan ya da değiştirilmeden önce yetkili servis son Z raporunu alır ve veriler idareye iletilir. Bu nedenle cihaz değişikliğinde son Z raporunun bir kopyasını muhasebe dosyasına eklemek iyi bir uygulamadır."
      ]
    },
    {
      h: "Z raporunda hangi bilgiler bulunur?",
      ul: [
        "<strong>İşletme bilgileri:</strong> Unvan, adres, vergi dairesi ve vergi kimlik numarası.",
        "<strong>Tarih, saat ve Z numarası:</strong> Raporların atlanmadan sırayla alındığını gösterir.",
        "<strong>Mali sicil numarası:</strong> Cihazın idaredeki kaydı.",
        "<strong>Fiş sayısı ve iptal/iade bilgileri:</strong> Gün içinde kesilen fiş adedi, iptal edilen fişler ve tutarları.",
        "<strong>KDV oranlarına göre toplamlar:</strong> Her oran grubu için brüt satış, matrah (KDV hariç tutar) ve KDV.",
        "<strong>Toplam satış ve toplam KDV:</strong> Günün KDV dahil hasılatı ve içindeki toplam KDV.",
        "<strong>Ödeme türlerine göre dağılım:</strong> Nakit, kredi/banka kartı, yemek kartı ve diğer ödeme türleri.",
        "<strong>Kümülatif toplamlar:</strong> Cihazın ilk kullanımından itibaren biriken toplam satış ve KDV."
      ]
    },
    {
      h: "Z raporundaki KDV toplamları nasıl okunur? Çözümlü örnek",
      p: [
        "ÖKC'den kesilen fişlerdeki fiyatlar KDV dahildir. Z raporu her oran grubu için önce KDV dahil brüt satışı, sonra bunun içindeki matrahı ve KDV'yi gösterir. Raporu kontrol ederken şu formülü kullanırsınız:"
      ],
      formula: "KDV = KDV dahil tutar × oran ÷ (100 + oran)\nMatrah = KDV dahil tutar − KDV",
      ol: [
        "%20 grubu: 12.000 × 20 ÷ 120 = 2.000 TL KDV; matrah 10.000 TL.",
        "%10 grubu: 5.500 × 10 ÷ 110 = 500 TL KDV; matrah 5.000 TL.",
        "%1 grubu: 1.010 × 1 ÷ 101 = 10 TL KDV; matrah 1.000 TL.",
        "Toplam satış: 12.000 + 5.500 + 1.010 = 18.510 TL. Toplam KDV: 2.000 + 500 + 10 = 2.510 TL. Toplam matrah: 16.000 TL."
      ],
      after: [
        "Bu hesapları tek tek yapmak yerine [[arac:kdv-hesapla|KDV Hesaplama]] aracında \"KDV dahil tutardan\" seçeneğiyle her grubu kontrol edebilirsiniz. Ürün gruplarının hangi KDV oranına girdiğini merak ediyorsanız [[bilgi:kdv-oranlari-2026-hangi-urunde-yuzde-kac|KDV oranları 2026]] makalesine bakın."
      ]
    },
    {
      h: "Kredi kartı ve nakit satışlar Z raporunda nasıl ayrılır?",
      p: [
        "Z raporunun ödeme bölümü, günün toplam satışının hangi ödeme aracıyla tahsil edildiğini gösterir. Örnekte 18.510 TL'lik satışın 7.510 TL'si nakit, 11.000 TL'si kredi kartıyla alınmıştır. Bu iki rakamın toplamı her zaman toplam satışa eşit olmalıdır.",
        "Gün sonunda üç kontrol yapılmalıdır: kasadaki nakit sayımı Z raporundaki nakit toplamla, banka POS'unun gün sonu raporu Z raporundaki kart toplamıyla ve yemek kartı ya da diğer ödeme araçlarının slipleri ilgili satırla eşleşmelidir. Fark çıkarsa iptal edilmeyen hatalı fiş, yanlış ödeme türü seçimi ya da kayda geçmemiş satış aranmalıdır.",
        "Yeni nesil ÖKC POS'larda kartlı ödeme cihazın içinde alındığı için kart toplamı genellikle otomatik doğru gelir; ayrı bir banka POS'u kullanılıyorsa ödeme türünün kasada elle doğru seçilmesi önemlidir."
      ]
    },
    {
      h: "Z raporu muhasebeye nasıl işlenir?",
      p: [
        "Z raporu muhasebede günlük hasılat kaydının belgesidir. Her rapor için KDV oranlarına göre ayrı satış hesabı ve hesaplanan KDV kaydı yapılır; tahsilat tarafı nakit ve kart dağılımına göre kasa ve banka (ya da kredi kartı alacakları) hesaplarına bölünür. Örnekteki gün için kayıt mantığı şöyledir:"
      ],
      table: {
        head: ["Hesap", "Borç", "Alacak"],
        rows: [
          ["Kasa (nakit)", "7.510,00", ""],
          ["Kredi kartı alacakları / banka", "11.000,00", ""],
          ["Yurt içi satışlar (%20 grubu matrahı)", "", "10.000,00"],
          ["Yurt içi satışlar (%10 grubu matrahı)", "", "5.000,00"],
          ["Yurt içi satışlar (%1 grubu matrahı)", "", "1.000,00"],
          ["Hesaplanan KDV", "", "2.510,00"]
        ],
        caption: "Borç toplamı (18.510) alacak toplamına (18.510) eşittir. Hesap adları ve kodları muhasebe düzeninize göre değişebilir."
      },
      after: [
        "Z raporlarının ay sonunda toplamı, KDV beyannamesindeki teslim ve hizmetlerin matrahına girer. Önceki aydan devreden KDV'nin bu tutardan nasıl düşüldüğünü [[bilgi:devreden-kdv-nedir-nasil-hesaplanir|devreden KDV]] makalesinde bulabilirsiniz. Küçük işletmeler bu kayıtları çoğunlukla [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe]] programında tutar ve mali müşavire aylık iletir."
      ]
    },
    {
      h: "Z raporu alınmazsa ne olur?",
      p: [
        "Z raporu alınmayan günlerin satışları mali hafızaya kapanış kaydı olarak geçmez ve muhasebeye dayanak belgesi oluşmaz. Vergi incelemesinde ya da yoklamada bu durum kayıt dışı satış şüphesi doğurur; işletme Vergi Usul Kanunu'nun belge düzenine ilişkin hükümleri kapsamında usulsüzlük cezalarıyla karşılaşabilir. Ayrıca bir sonraki gün alınan Z raporu iki günün satışını birlikte gösterir ve günlük hasılat takibi bozulur.",
        "Yeni nesil cihazlarda Z raporunun alınmadığı ya da verilerin iletilmediği idare tarafından elektronik olarak görülebilir. Unutulan bir günün Z raporu ertesi gün ilk iş olarak alınmalı ve durum mali müşavire bildirilmelidir."
      ]
    },
    {
      h: "Z raporu kaç yıl saklanır?",
      p: [
        "Z raporları, Vergi Usul Kanunu md. 253 uyarınca ilgili oldukları yılı izleyen takvim yılı başından itibaren <strong>5 yıl</strong> saklanır. İşletme tacir sayılıyorsa Türk Ticaret Kanunu md. 82'deki 10 yıllık saklama süresi de geçerlidir; bu durumda raporları 10 yıl tutmak gerekir.",
        "Termal kâğıda basılan Z raporları zamanla soluklaşır ve okunamaz hâle gelebilir. Raporu aldığınız gün fotokopisini çekmek ya da taranmış kopyasını oluşturmak, aslı silinse bile kayıtların okunabilir kalmasını sağlar. Saklama sürelerinin nasıl sayıldığı için [[bilgi:ticari-evrak-saklama-suresi-kac-yil|ticari evrak saklama süresi]] makalesine bakın."
      ]
    },
    {
      h: "Gün sonu kontrol listesi",
      ol: [
        "Vardiya ya da gün içi kontroller için X raporu alın, kasa sayımıyla karşılaştırın.",
        "İş günü sonunda Z raporunu alın; Z numarasının bir öncekini izlediğini kontrol edin.",
        "Nakit toplamı kasa sayımıyla, kart toplamı POS gün sonu raporuyla eşleştirin.",
        "KDV gruplarını [[arac:hesap-makinesi|hesap makinesi]] ile kontrol edin; iptal ve iadeleri not alın.",
        "Raporun kopyasını oluşturun ve ay sonu klasörüne ekleyin; ay toplamını muhasebeye iletin."
      ]
    }
  ],
  faq: [
    ["Z raporu nedir?", "Z raporu, ödeme kaydedici cihazın günlük tüm satışlarını KDV oranlarına ve ödeme türlerine göre toplayıp mali hafızaya kalıcı olarak yazan ve günü kapatan zorunlu gün sonu raporudur. Günlük hasılat kaydının resmî dayanağıdır."],
    ["X raporu ile Z raporu arasındaki fark nedir?", "X raporu gün içinde istenildiği kadar alınabilen, günü kapatmayan ve mali hafızaya yazılmayan bilgi raporudur. Z raporu ise günde bir kez alınır, günü kapatır, sıra numarası taşır ve muhasebe belgesidir."],
    ["Z raporu ne zaman alınmalıdır?", "Z raporu cihazın kullanıldığı her iş günü sonunda alınır. Gece yarısından sonra da açık kalan işletmeler raporu kapanış saatinde alır; gece yarısından sonraki satışlar uygulamada önceki güne dahil edilir."],
    ["Z raporunda hangi bilgiler bulunur?", "İşletme ve cihaz bilgileri, tarih ve Z numarası, fiş sayısı, iptal ve iadeler, KDV oranlarına göre brüt satış, matrah ve KDV, toplam satış ve KDV, ödeme türlerine göre dağılım ile kümülatif toplamlar bulunur."],
    ["Z raporundaki KDV toplamları nasıl okunur?", "Her oran grubundaki brüt satış KDV dahildir. KDV, brüt tutar çarpı oran bölü yüz artı oran formülüyle bulunur; brüt tutardan KDV düşülünce matrah kalır. Örneğin %20 grubunda 12.000 TL'nin 2.000 TL'si KDV'dir."],
    ["Z raporu alınmazsa ne olur?", "O günün satışları için muhasebe dayanağı oluşmaz, incelemede kayıt dışı satış şüphesi doğar ve belge düzenine ilişkin usulsüzlük cezaları gündeme gelebilir. Unutulan rapor ertesi gün ilk iş alınmalı ve mali müşavire bildirilmelidir."],
    ["Z raporu kaç yıl saklanır?", "Vergi Usul Kanunu md. 253'e göre ilgili yılı izleyen yılın başından itibaren 5 yıl saklanır. İşletme tacirse Türk Ticaret Kanunu gereği süre 10 yıldır; termal kâğıt soluklaştığı için kopya almak önerilir."],
    ["Kredi kartı ve nakit satışlar Z raporunda nasıl ayrılır?", "Z raporunun ödeme bölümü toplam satışı nakit, kart ve diğer ödeme türlerine böler. Nakit toplam kasa sayımıyla, kart toplam POS gün sonu raporuyla eşleşmeli; ikisinin toplamı toplam satışa eşit olmalıdır."],
    ["Z raporu muhasebeye nasıl işlenir?", "Her Z raporu için KDV oranlarına göre satış matrahları ve hesaplanan KDV alacak, nakit ve kart tahsilatları borç kaydedilir. Ay sonunda Z raporu toplamları KDV beyannamesindeki teslim matrahına girer."]
  ],
  tools: ["kdv-hesapla", "hesap-makinesi", "kar-zarar-hesapla"],
  related: ["kdv-oranlari-2026-hangi-urunde-yuzde-kac", "devreden-kdv-nedir-nasil-hesaplanir", "e-arsiv-fatura-nedir-nasil-kesilir", "ticari-evrak-saklama-suresi-kac-yil"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Yeni nesil ödeme kaydedici cihazlar", "https://ynokc.gib.gov.tr/"],
    ["Gelir İdaresi Başkanlığı – Vergi Usul Kanunu", "https://www.gib.gov.tr/"]
  ],
  uyari: "vergi danışmanlığı yerine geçmez; cihazınıza ve işletmenize özgü durumlar için mali müşavirinize danışın"
};
