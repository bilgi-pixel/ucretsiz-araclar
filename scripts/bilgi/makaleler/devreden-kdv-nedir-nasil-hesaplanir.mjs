export default {
  slug: "devreden-kdv-nedir-nasil-hesaplanir",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "Devreden KDV Nedir? Hesaplanan ve İndirilecek KDV Nasıl Mahsup Edilir",
  pageTitle: "Devreden KDV Nedir? Hesaplanan, İndirilecek ve Ödenecek KDV",
  description: "Devreden KDV, indirilecek KDV hesaplanan KDV'den fazla olduğunda sonraki aya aktarılan tutardır. Ödenecek KDV hesabı, 191-391 hesaplar, iade ve çözümlü örnek.",
  keywords: ["devreden kdv nedir", "indirilecek kdv", "hesaplanan kdv", "ödenecek kdv nasıl hesaplanır", "devreden kdv iade", "kdv beyannamesi hesaplama", "191 391 hesap", "devreden kdv ne kadar süre taşınır"],
  lead: "Devreden KDV, bir dönemde alışlarda ödediğiniz KDV'nin (indirilecek KDV) satışlarda tahsil ettiğiniz KDV'den (hesaplanan KDV) fazla olması durumunda <strong>ödenmeyip bir sonraki döneme aktarılan</strong> KDV tutarıdır. Formül basittir: hesaplanan KDV − (indirilecek KDV + önceki aydan devreden KDV) pozitifse ödenecek, negatifse devreden KDV çıkar. Bu sayfada iki aylık çözümlü örnekle hesabı, 191 ve 391 hesapların anlamını, devreden KDV'nin neden biriktiğini ve hangi durumlarda iade alınabileceğini anlatıyoruz.",
  kisaCevap: [
    "Hesaplanan KDV, satışlarınızda müşteriden tahsil ettiğiniz KDV'dir; muhasebede 391 hesapta izlenir.",
    "İndirilecek KDV, alış ve giderlerinizde ödediğiniz ve beyannamede düşebildiğiniz KDV'dir; 191 hesapta izlenir.",
    "Ödenecek KDV = hesaplanan KDV − indirilecek KDV − önceki dönemden devreden KDV (sonuç pozitifse).",
    "Sonuç negatifse fark ödenmez, \"sonraki döneme devreden KDV\" olarak beyannameye yazılır ve izleyen ay indirim olarak kullanılır.",
    "Devreden KDV için süre sınırı yoktur; ancak bir belgedeki KDV'nin indirimi, belgenin ait olduğu yılı izleyen yılın sonuna kadar yapılabilir.",
    "Devreden KDV kural olarak nakit iade edilmez; ihracat, indirimli oranlı teslimler ve tevkifatlı işlemler gibi kanunda sayılan durumlarda iade istenebilir."
  ],
  figure: {
    alt: "İki aylık devreden KDV örneği: ocakta 20.000 TL hesaplanan ve 30.000 TL indirilecek KDV ile 10.000 TL devreden KDV oluşuyor; şubatta 24.000 TL hesaplanan, 10.000 TL indirilecek ve 10.000 TL devreden KDV ile 4.000 TL ödenecek KDV çıkıyor.",
    caption: "Ocakta alışlar satışlardan büyük olduğu için 10.000 TL devreden KDV oluşur. Bu tutar şubat beyannamesinde indirim olarak kullanılır ve şubatta yalnızca 4.000 TL ödenir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Devreden KDV iki ayda nasıl işler?</text>
  <rect x="30" y="54" width="300" height="300" rx="12" class="sf sb"/>
  <text x="180" y="84" class="lg b mid">Ocak</text>
  <text x="50" y="120" class="sm">Hesaplanan KDV (satış)</text><text x="310" y="120" class="b end">20.000</text>
  <text x="50" y="150" class="sm">İndirilecek KDV (alış)</text><text x="310" y="150" class="b end">30.000</text>
  <text x="50" y="180" class="sm">Önceki aydan devreden</text><text x="310" y="180" class="b end">0</text>
  <line x1="50" y1="196" x2="310" y2="196" class="sb" fill="none"/>
  <text x="50" y="222" class="sm">20.000 − 30.000 − 0</text><text x="310" y="222" class="b end dg">−10.000</text>
  <rect x="50" y="250" width="260" height="80" rx="10" class="ps"/>
  <text x="180" y="280" class="b mid">Ödenecek: 0 TL</text>
  <text x="180" y="308" class="b mid p">Devreden: 10.000 TL</text>
  <path d="M310 290 L400 290" class="sp sw" fill="none" marker-end="url(#ok3)"/>
  <rect x="390" y="54" width="300" height="300" rx="12" class="sf sb"/>
  <text x="540" y="84" class="lg b mid">Şubat</text>
  <text x="410" y="120" class="sm">Hesaplanan KDV (satış)</text><text x="670" y="120" class="b end">24.000</text>
  <text x="410" y="150" class="sm">İndirilecek KDV (alış)</text><text x="670" y="150" class="b end">10.000</text>
  <text x="410" y="180" class="sm">Ocaktan devreden</text><text x="670" y="180" class="b end p">10.000</text>
  <line x1="410" y1="196" x2="670" y2="196" class="sb" fill="none"/>
  <text x="410" y="222" class="sm">24.000 − 10.000 − 10.000</text><text x="670" y="222" class="b end ok">4.000</text>
  <rect x="410" y="250" width="260" height="80" rx="10" class="oks"/>
  <text x="540" y="280" class="b mid ok">Ödenecek: 4.000 TL</text>
  <text x="540" y="308" class="b mid">Devreden: 0 TL</text>
  <rect x="30" y="368" width="660" height="40" rx="8" class="p"/>
  <text x="360" y="394" class="b mid sf">Ödenecek KDV = Hesaplanan − İndirilecek − Devreden</text>
</svg>`
  },
  sections: [
    {
      h: "Hesaplanan KDV ile indirilecek KDV farkı nedir?",
      p: [
        "Katma değer vergisi, mal ve hizmetin her el değiştirdiği aşamada yalnızca o aşamada eklenen değer üzerinden vergi alınmasını sağlayan bir sistemdir. Bunu mümkün kılan, her mükellefin satışlarında tahsil ettiği KDV'den alışlarında ödediği KDV'yi düşmesidir. Bu iki kalemin adı beyannamede ve muhasebede farklıdır.",
        "<strong>Hesaplanan KDV</strong>, düzenlediğiniz satış faturalarındaki KDV toplamıdır; yani müşterinizden sizin adınıza tahsil edip devlete aktarmanız gereken vergidir. <strong>İndirilecek KDV</strong> ise aldığınız mal ve hizmet faturalarında tedarikçinize ödediğiniz KDV'dir. Ticari faaliyetle ilgili ve kanunen indirimi kabul edilen alışların KDV'si indirilebilir; binek otomobil alımı gibi bazı giderlerde ise indirim hakkı sınırlıdır.",
        "KDV oranlarının hangi üründe kaç olduğunu [[bilgi:kdv-oranlari-2026-hangi-urunde-yuzde-kac|KDV oranları 2026]] yazımızda, KDV dahil tutardan KDV'yi ayırmayı ise [[rehber:kdv-hesaplama-nasil-yapilir|KDV hesaplama rehberinde]] bulabilirsiniz."
      ],
      table: {
        head: ["Kavram", "Kaynağı", "Muhasebe hesabı", "Beyannamedeki yeri"],
        rows: [
          ["Hesaplanan KDV", "Satış faturaları", "391", "Matrah bölümü, hesaplanan KDV"],
          ["İndirilecek KDV", "Alış ve gider faturaları", "191", "İndirimler bölümü"],
          ["Devreden KDV", "Önceki dönemden kalan", "190", "Önceki dönemden devreden KDV"],
          ["Ödenecek KDV", "Pozitif fark", "360", "Ödenmesi gereken KDV"]
        ]
      }
    },
    {
      h: "Ödenecek ve devreden KDV nasıl hesaplanır?",
      p: [
        "Her ay KDV beyannamesinde yapılan hesap aynıdır. Önce dönemin hesaplanan KDV'si bulunur; ardından o dönemin indirilecek KDV'si ve bir önceki beyannameden devreden KDV toplanır. Hesaplanan KDV bu toplamdan büyükse fark ödenir; küçükse fark ödenmez ve sonraki döneme devreder."
      ],
      formula: "Toplam indirim = dönemin indirilecek KDV'si + önceki dönemden devreden KDV\nHesaplanan KDV > toplam indirim ise: Ödenecek KDV = hesaplanan − toplam indirim\nHesaplanan KDV < toplam indirim ise: Devreden KDV = toplam indirim − hesaplanan",
      after: [
        "Bu hesap nakit akışı açısından önemlidir: Devreden KDV, devletin size borçlu olduğu bir para değildir; yalnızca gelecekte doğacak KDV borcunuza mahsup edilebilecek bir alacaktır. Aylarca satış yapmayan bir işletmenin biriken devreden KDV'si, satışlar başladığında ödenecek KDV'yi azaltarak geri kazanılır.",
        "Hesabı yaparken satış iadeleri, alış iadeleri ve iptal edilen faturalar gibi düzeltme kalemlerini de aynı dönemde işlemeniz gerekir. Satıştan iade alınan malın KDV'si hesaplanan KDV'yi azaltır; alıştan yapılan iade ise indirilecek KDV'yi düşürür. Bu kalemler atlanırsa devreden tutar gerçeği yansıtmaz ve sonraki aylarda düzeltme beyannamesi gerekebilir."
      ]
    },
    {
      h: "Çözümlü örnek: iki aylık devreden KDV hesabı",
      p: [
        "Yeni kurulmuş ve ürünlerine %20 KDV uygulayan bir işletme düşünelim. Ocak ayında büyük bir stok alımı yapmış, şubatta satışları artmıştır. Yukarıdaki görsel bu örneği özetler."
      ],
      ol: [
        "<strong>Ocak – hesaplanan KDV:</strong> KDV hariç 100.000 TL satış × %20 = 20.000 TL.",
        "<strong>Ocak – indirilecek KDV:</strong> KDV hariç 150.000 TL alış × %20 = 30.000 TL.",
        "<strong>Ocak sonucu:</strong> 20.000 − 30.000 − 0 = −10.000. Sonuç negatif olduğu için ödeme yoktur; 10.000 TL şubata devreder.",
        "<strong>Şubat – hesaplanan KDV:</strong> KDV hariç 120.000 TL satış × %20 = 24.000 TL.",
        "<strong>Şubat – indirilecek KDV:</strong> KDV hariç 50.000 TL alış × %20 = 10.000 TL; ocaktan devreden 10.000 TL eklenince toplam indirim 20.000 TL olur.",
        "<strong>Şubat sonucu:</strong> 24.000 − 20.000 = 4.000 TL ödenecek KDV. Mart ayına devreden KDV kalmaz."
      ],
      after: [
        "Bu örnekte işletme iki ayda toplam 44.000 TL KDV tahsil etmiş, 40.000 TL KDV ödemiştir; devlete aktardığı 4.000 TL, iki ayda yarattığı katma değerin (220.000 − 200.000 = 20.000 TL) %20'sine eşittir. Yüzdeli adımları kontrol etmek için [[arac:yuzde-hesapla|yüzde hesaplama]], KDV dahil-hariç tutarları ayırmak için [[arac:kdv-hesapla|KDV hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Devreden KDV neden birikir?",
      p: [
        "Devreden KDV'nin sürekli artması her zaman bir sorun işareti değildir; çoğu zaman işin doğasından kaynaklanır. Ancak uzun süre azalmayan büyük bir devreden KDV, işletmenin nakdinin vergi alacağı olarak bağlandığı anlamına gelir. En sık nedenler şunlardır:"
      ],
      ul: [
        "<strong>Yatırım ve stok dönemi:</strong> Makine, demirbaş ya da büyük stok alımı yapılan aylarda indirilecek KDV satışları aşar.",
        "<strong>Oran farkı:</strong> Alışlarda %20, satışlarda %10 ya da %1 KDV uygulanıyorsa hesaplanan KDV her zaman indirilecek KDV'nin gerisinde kalabilir.",
        "<strong>İhracat:</strong> İhraç edilen mallarda KDV hesaplanmaz, ama bu mallar için yapılan alışlarda KDV ödenir.",
        "<strong>Tevkifatlı satışlar:</strong> KDV'nin bir kısmını alıcının ödediği tevkifatlı işlemlerde satıcının hesapladığı KDV azalır; ayrıntı için [[bilgi:kdv-tevkifati-nasil-hesaplanir|KDV tevkifatı]] yazımıza bakabilirsiniz.",
        "<strong>Sezonluk işler:</strong> Satışların belirli aylarda yoğunlaştığı işletmelerde ölü sezonda KDV birikir, sezonda erir."
      ]
    },
    {
      h: "Devreden KDV ne kadar süre taşınabilir, iade alınabilir mi?",
      p: [
        "Beyannamede oluşan devreden KDV için kanunda bir süre sınırı yoktur; tutar, kullanılıncaya kadar her ay bir sonraki beyannameye aktarılır. Burada karıştırılmaması gereken ayrı bir kural vardır: KDV Kanunu md. 29'a göre bir alış belgesindeki KDV'nin <strong>indirim konusu yapılabilmesi</strong>, belgenin ilgili olduğu takvim yılını izleyen takvim yılı sonuna kadar mümkündür. Yani 2026 tarihli bir faturanın KDV'si en geç 2027 sonuna kadar beyannameye alınmalıdır; bir kez alındıktan sonra devreden tutar süresiz taşınır.",
        "Devreden KDV kural olarak <strong>nakit iade edilmez</strong>. İade yalnızca kanunda sayılan durumlarda istenebilir: ihracat ve ihraç kayıtlı teslimler, indirimli orana tabi teslimlerde belirli sınırlar içinde yüklenilen KDV, tevkifata tabi işlemler, diplomatik ve uluslararası kuruluş istisnaları gibi. İade talebi için belirli belgeler, YMM raporu ya da vergi inceleme raporu istenebilir; usul ve sınırlar KDV Genel Uygulama Tebliği'nde ayrıntılı düzenlenmiştir. Kendi işleminizin iade kapsamında olup olmadığını mali müşavirinizle değerlendirmeniz gerekir."
      ]
    },
    {
      h: "Satışı olmayan ay KDV beyannamesi nasıl verilir?",
      p: [
        "KDV mükellefiyeti olan bir işletme, o ay hiç satış yapmasa bile <strong>KDV beyannamesini vermek zorundadır</strong>. Böyle bir ayda hesaplanan KDV sıfırdır; ay içindeki alışların KDV'si indirilecek KDV olarak yazılır ve önceki aydan gelen devreden KDV ile toplanarak sonraki aya devreder. Beyanname verilmezse usulsüzlük cezası doğar ve indirim hakkının kullanımı tartışmalı hâle gelebilir.",
        "Faaliyet geçici olarak durmuşsa yine de beyan verilir; işletme tamamen kapatılacaksa terk işlemleri ve kalan devreden KDV'nin durumu ayrıca değerlendirilmelidir. Beyanname son günleri için [[bilgi:vergi-takvimi-beyanname-ve-odeme-tarihleri|vergi takvimi]] yazımıza bakabilirsiniz."
      ]
    },
    {
      h: "Muhasebede 191, 190 ve 391 hesaplar ne anlama gelir?",
      p: [
        "Tekdüzen hesap planında KDV üç ana hesapta izlenir. Alış faturalarındaki KDV <strong>191 İndirilecek KDV</strong> hesabına borç, satış faturalarındaki KDV <strong>391 Hesaplanan KDV</strong> hesabına alacak kaydedilir. Ay sonunda bu iki hesap birbirine kapatılır: 391 büyükse fark <strong>360 Ödenecek Vergi ve Fonlar</strong> hesabına, 191 büyükse fark <strong>190 Devreden KDV</strong> hesabına aktarılır.",
        "Ertesi ay 190 hesaptaki tutar yeniden 191 hesaba alınarak indirim olarak kullanılır. Böylece muhasebe kayıtlarıyla beyanname birebir örtüşür. Beyannamedeki devreden tutar ile 190 hesabın bakiyesinin aynı olması, dönem sonu kontrollerinin ilk adımıdır; fark varsa bir faturanın yanlış döneme kaydedildiği ya da hiç kaydedilmediği anlaşılır. Kayıtları düzenli tutmanın temel adımları [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe]] yazımızda anlatılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Devreden KDV'yi kâr ya da alacak sanmak:</strong> Devreden KDV nakit değildir; yalnızca gelecekteki KDV borcuna mahsup edilir.",
        "<strong>Önceki ayın devredenini yazmayı unutmak:</strong> Beyannamede \"önceki dönemden devreden KDV\" satırı boş bırakılırsa fazla ödeme yapılır.",
        "<strong>KDV dahil tutar üzerinden hesap:</strong> KDV, KDV hariç matrah üzerinden hesaplanır; KDV dahil tutara oran uygulamak fazla vergi çıkarır.",
        "<strong>İndirimi kabul edilmeyen giderleri yazmak:</strong> Faaliyetle ilgisi olmayan ya da kanunen indirimi sınırlanan giderlerin KDV'si indirilemez.",
        "<strong>Süreyi kaçırmak:</strong> Bir faturanın KDV'sini, belgenin yılını izleyen yılın sonundan sonra indirmek mümkün değildir."
      ],
      after: [
        "Satış fiyatınızın KDV sonrası kârlılığını görmek isterseniz [[arac:kar-zarar-hesapla|kâr-zarar hesaplama aracına]] KDV hariç alış ve satış tutarlarınızı girebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Devreden KDV nedir?", "Devreden KDV, bir dönemde indirilecek KDV ile önceki dönemden devreden tutarın toplamının hesaplanan KDV'den fazla olması durumunda ödenmeyip sonraki döneme aktarılan KDV'dir. Sonraki ay ödenecek KDV'den mahsup edilerek kullanılır."],
    ["Hesaplanan KDV ile indirilecek KDV farkı nedir?", "Hesaplanan KDV, satış faturalarınızda müşteriden tahsil ettiğiniz vergidir ve 391 hesapta izlenir. İndirilecek KDV ise alış ve gider faturalarında tedarikçiye ödediğiniz vergidir ve 191 hesapta izlenir; beyannamede birincisinden ikincisi düşülür."],
    ["Ödenecek KDV nasıl hesaplanır?", "Ödenecek KDV, dönemin hesaplanan KDV'sinden o dönemin indirilecek KDV'si ve önceki dönemden devreden KDV düşülerek bulunur. Sonuç pozitifse ödenir, negatifse ödeme yapılmaz ve fark sonraki döneme devreden KDV olarak aktarılır."],
    ["Devreden KDV ne kadar süre taşınabilir?", "Beyannamede oluşan devreden KDV için süre sınırı yoktur ve kullanılıncaya kadar aktarılır. Ancak bir faturadaki KDV'nin ilk kez indirime alınması, belgenin ait olduğu yılı izleyen takvim yılının sonuna kadar yapılmalıdır."],
    ["Devreden KDV iade alınabilir mi?", "Kural olarak hayır, devreden KDV yalnızca sonraki dönemlerde mahsup edilir. İhracat, indirimli orana tabi teslimler, tevkifatlı işlemler ve bazı istisnalar gibi kanunda sayılan durumlarda belirli belge ve şartlarla iade talep edilebilir."],
    ["Satışı olmayan ay KDV beyannamesi nasıl verilir?", "Satış olmasa da KDV beyannamesi verilir. Hesaplanan KDV sıfır yazılır, ay içindeki alışların KDV'si indirilecek KDV olarak eklenir ve önceki aydan gelen tutarla birlikte sonraki döneme devreder. Beyan verilmemesi usulsüzlük cezası doğurur."],
    ["Muhasebede 191 ve 391 hesaplar ne anlama gelir?", "191 İndirilecek KDV hesabı alışlarda ödenen KDV'yi, 391 Hesaplanan KDV hesabı satışlarda tahsil edilen KDV'yi gösterir. Ay sonunda iki hesap kapatılır; fark 360 ödenecek vergi ya da 190 devreden KDV hesabına aktarılır."],
    ["Devreden KDV neden birikir?", "Yatırım ve stok alımları, alışlarda yüksek satışlarda düşük KDV oranı uygulanması, ihracat, tevkifatlı satışlar ve sezonluk çalışma devreden KDV'nin birikmesinin başlıca nedenleridir. Uzun süre erimeyen tutar nakdin bağlandığını gösterir."],
    ["Devreden KDV kâr hesabını etkiler mi?", "Devreden KDV gelir ya da gider değildir; bilançoda bir vergi alacağı olarak durur. Kâr hesabı KDV hariç tutarlar üzerinden yapılır. Ancak biriken devreden KDV nakit akışını olumsuz etkilediği için finansman planlamasında dikkate alınmalıdır."]
  ],
  tools: ["kdv-hesapla", "kar-zarar-hesapla", "yuzde-hesapla"],
  related: ["kdv-oranlari-2026-hangi-urunde-yuzde-kac", "kdv-tevkifati-nasil-hesaplanir", "vergi-takvimi-beyanname-ve-odeme-tarihleri", "on-muhasebe-nedir-cari-hesap-takibi"],
  uyari: "mali müşavirlik hizmetinin yerine geçmez; iade ve indirim hakkı gibi konularda mali müşavirinize danışın",
  sources: [
    ["Gelir İdaresi Başkanlığı – KDV Genel Uygulama Tebliği", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 3065 sayılı Katma Değer Vergisi Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
