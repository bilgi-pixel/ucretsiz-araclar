export default {
  slug: "bu-hafta-yilin-kacinci-haftasi",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Bu Hafta Yılın Kaçıncı Haftası? ISO Hafta Numarası Nasıl Hesaplanır",
  pageTitle: "Bu Hafta Yılın Kaçıncı Haftası? ISO Hafta Numarası Hesabı",
  description: "ISO 8601'e göre hafta pazartesi başlar, yılın ilk haftası ilk perşembeyi içeren haftadır. 2026 yılı 53 haftalıktır; 16–22 Kasım 2026 47. haftadır. Hesap ve örnekler.",
  keywords: ["yılın kaçıncı haftası", "hafta numarası", "iso hafta numarası", "bugün yılın kaçıncı günü", "bir yılda kaç hafta var", "53. hafta nedir", "hafta numarasından tarih bulma"],
  lead: "Hafta numarası Türkiye ve Avrupa'da <strong>ISO 8601</strong> standardına göre sayılır: hafta <strong>pazartesi</strong> başlar ve yılın 1. haftası, o yılın <strong>ilk perşembesini içeren haftadır</strong>. Bu kurala göre 16–22 Kasım 2026 haftası 2026'nın 47. haftasıdır ve 2026, perşembe günüyle başladığı için 53 haftalık bir yıldır. Hafta numarası her hafta değiştiği için güncel değeri hafta numarası aracından görebilirsiniz; bu sayfada hesabın mantığını, formülünü, 52 ile 53 hafta farkını ve hafta numarasından tarih bulmayı örneklerle anlatıyoruz.",
  kisaCevap: [
    "ISO 8601'de hafta pazartesi başlar, pazar biter; 1. hafta, 4 Ocak'ı (eşdeğer olarak yılın ilk perşembesini) içeren haftadır.",
    "Bir yıl 52 ya da 53 ISO haftası içerir; yıl perşembe günü başlıyorsa ya da artık yıl çarşamba başlıyorsa 53 hafta vardır.",
    "2026 yılı 1 Ocak perşembe başladığı için 53 haftalıktır; 1. hafta 29 Aralık 2025'te başlar, 53. hafta 3 Ocak 2027'de biter.",
    "Hafta numarası = ⌊(yılın kaçıncı günü − haftanın günü + 10) ÷ 7⌋; haftanın günü pazartesi 1, pazar 7 alınır.",
    "ISO hafta tarihi YYYY-Www-G biçiminde yazılır: 16 Kasım 2026 pazartesi = 2026-W47-1.",
    "16 Kasım 2026 yılın 320. günüdür; yıl sonuna 45 gün kalmıştır."
  ],
  figure: {
    alt: "Aralık 2026 sonu ile Ocak 2027 başını gösteren hafta numaralı takvim şeridi: 21–27 Aralık 52. hafta, 28 Aralık–3 Ocak 53. hafta, 4–10 Ocak 2027'nin 1. haftası. Perşembe sütunu vurgulanmış ve 1 Ocak 2027 cumanın 2026'nın 53. haftasında kaldığı gösteriliyor.",
    caption: "Perşembe kuralı: bir hafta, perşembesi hangi yıla düşüyorsa o yılın haftasıdır. 31 Aralık 2026 perşembe olduğu için 28 Aralık–3 Ocak haftası 2026'nın 53. haftasıdır; 1–3 Ocak 2027 günleri de bu haftaya dahildir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Yıl geçişinde hafta numarası: perşembe kuralı</text>
  <g class="sm mid b">
    <text x="150" y="70">Pzt</text><text x="230" y="70">Sal</text><text x="310" y="70">Çar</text>
    <text x="390" y="70" class="p">Per</text><text x="470" y="70">Cum</text><text x="550" y="70">Cmt</text><text x="630" y="70">Paz</text>
  </g>
  <rect x="352" y="80" width="76" height="222" rx="6" class="ps"/>
  <text x="56" y="114" class="b mid">H52</text>
  <g class="mid">
    <rect x="114" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="150" y="116">21 Ara</text>
    <rect x="194" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="230" y="116">22</text>
    <rect x="274" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="310" y="116">23</text>
    <rect x="354" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="390" y="116" class="b">24</text>
    <rect x="434" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="470" y="116">25</text>
    <rect x="514" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="550" y="116">26</text>
    <rect x="594" y="88" width="72" height="44" rx="6" class="sf sb"/><text x="630" y="116">27</text>
  </g>
  <text x="56" y="180" class="b mid p">H53</text>
  <g class="mid">
    <rect x="114" y="154" width="72" height="44" rx="6" class="sf sb"/><text x="150" y="182">28 Ara</text>
    <rect x="194" y="154" width="72" height="44" rx="6" class="sf sb"/><text x="230" y="182">29</text>
    <rect x="274" y="154" width="72" height="44" rx="6" class="sf sb"/><text x="310" y="182">30</text>
    <rect x="354" y="154" width="72" height="44" rx="6" class="p"/><text x="390" y="182" class="b sf">31 Ara</text>
    <rect x="434" y="154" width="72" height="44" rx="6" class="oks"/><text x="470" y="182">1 Oca</text>
    <rect x="514" y="154" width="72" height="44" rx="6" class="oks"/><text x="550" y="182">2</text>
    <rect x="594" y="154" width="72" height="44" rx="6" class="oks"/><text x="630" y="182">3</text>
  </g>
  <text x="56" y="246" class="b mid ok">H1</text>
  <g class="mid">
    <rect x="114" y="220" width="72" height="44" rx="6" class="oks"/><text x="150" y="248">4 Oca</text>
    <rect x="194" y="220" width="72" height="44" rx="6" class="oks"/><text x="230" y="248">5</text>
    <rect x="274" y="220" width="72" height="44" rx="6" class="oks"/><text x="310" y="248">6</text>
    <rect x="354" y="220" width="72" height="44" rx="6" class="ok"/><text x="390" y="248" class="b sf">7</text>
    <rect x="434" y="220" width="72" height="44" rx="6" class="oks"/><text x="470" y="248">8</text>
    <rect x="514" y="220" width="72" height="44" rx="6" class="oks"/><text x="550" y="248">9</text>
    <rect x="594" y="220" width="72" height="44" rx="6" class="oks"/><text x="630" y="248">10</text>
  </g>
  <text x="680" y="182" class="sm">2026</text>
  <text x="680" y="248" class="sm ok">2027</text>
  <rect x="20" y="318" width="680" height="70" rx="8" class="sf sb"/>
  <rect x="20" y="318" width="8" height="70" class="p"/>
  <text x="40" y="344" class="sm b">Yeşil kutular 2027 takvim günleri; 1–3 Ocak yine de 2026-W53'e aittir.</text>
  <text x="40" y="370" class="sm t2">2027'nin 1. haftası 4 Ocak pazartesi başlar, çünkü ilk perşembe 7 Ocak'tır.</text>
</svg>`
  },
  sections: [
    {
      h: "Hafta numarası nedir, neden kullanılır?",
      p: [
        "Hafta numarası, yılın haftalarını 1'den başlayarak sıralayan bir sayıdır. Özellikle üretim planlaması, lojistik, tedarik zinciri, proje yönetimi, okul ve sınav takvimleri ile vardiya çizelgelerinde \"47. hafta teslim\", \"KW 12\" gibi ifadeler sık kullanılır. Tarih yerine hafta numarası vermek, bir işin hangi gün değil hangi hafta içinde yapılacağını kısa ve net biçimde anlatır.",
        "Avrupa'daki tedarikçilerle çalışan işletmeler için hafta numarası neredeyse ortak bir dildir: teslim tarihleri, üretim partileri ve ürün etiketlerindeki tarih kodları çoğu zaman hafta numarasıyla yazılır. Örneğin bir lastiğin üretim tarihindeki dört haneli kod (\"4726\") 2026'nın 47. haftasını gösterir. Bu tür kodların nasıl okunduğunu [[bilgi:lastik-ebatlari-nasil-okunur|lastik ebatları]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "ISO hafta numarası kuralları",
      p: [
        "Uluslararası tarih ve saat standardı <strong>ISO 8601</strong>, hafta numarasını üç kuralla tanımlar. Türkiye ve Avrupa ülkelerinin büyük kısmı bu sistemi kullanır; takvimlerde, resmî planlarda ve tablolama programlarının ISO işlevlerinde karşınıza çıkan numara budur."
      ],
      ol: [
        "<strong>Hafta pazartesi başlar, pazar biter.</strong> Her hafta tam 7 gündür ve iki yıl arasında bölünmez.",
        "<strong>Yılın 1. haftası, ilk perşembeyi içeren haftadır.</strong> Bu, \"4 Ocak'ı içeren hafta\" ve \"yeni yılın en az 4 gününü içeren ilk hafta\" ifadeleriyle aynı anlama gelir.",
        "<strong>Hafta hangi yılın haftasıysa, o haftanın günleri de o \"hafta yılına\" aittir.</strong> Bu yüzden 1 Ocak bazen önceki yılın 52. ya da 53. haftasında, 31 Aralık bazen sonraki yılın 1. haftasında yer alır."
      ],
      after: [
        "Perşembe kuralının mantığı şudur: perşembe haftanın tam ortasındaki gündür. Perşembe hangi yıla düşüyorsa haftanın en az dört günü o yıla aittir; hafta da o yılın haftası sayılır. Bu sayede hiçbir yılın ilk haftası yalnızca bir iki günlük bir parça olmaz."
      ]
    },
    {
      h: "Bu hafta yılın kaçıncı haftası? 2026 hafta tablosu",
      p: [
        "Hafta numarası her pazartesi bir artar. Bu yazının güncellendiği hafta olan 16–22 Kasım 2026, 2026'nın <strong>47. haftasıdır</strong>; bir önceki hafta (9–15 Kasım) 46. haftaydı. Bugünün hafta numarasını anlık görmek için [[arac:hafta-numarasi|Haftanın Kaçıncı Haftası]] aracını kullanabilirsiniz; araç seçtiğiniz herhangi bir tarihin hafta numarasını, yılın kaçıncı günü olduğunu ve yıl sonuna kalan günü de gösterir."
      ],
      table: {
        head: ["Hafta", "Başlangıç (pazartesi)", "Bitiş (pazar)", "Not"],
        rows: [
          ["1", "29 Aralık 2025", "4 Ocak 2026", "1 Ocak 2026 perşembe olduğu için"],
          ["10", "2 Mart 2026", "8 Mart 2026", "Mart'ın ilk tam haftası"],
          ["13", "23 Mart 2026", "29 Mart 2026", "1. çeyreğin son tam haftası"],
          ["26", "22 Haziran 2026", "28 Haziran 2026", "Yılın ortası"],
          ["40", "28 Eylül 2026", "4 Ekim 2026", "1 Ekim bu haftada"],
          ["47", "16 Kasım 2026", "22 Kasım 2026", "Bu yazının haftası"],
          ["52", "21 Aralık 2026", "27 Aralık 2026", ""],
          ["53", "28 Aralık 2026", "3 Ocak 2027", "2026'nın son haftası"]
        ],
        caption: "2027'nin 1. haftası 4 Ocak 2027 pazartesi başlar ve 2027 yılı 52 haftalıktır."
      }
    },
    {
      h: "ISO hafta numarası nasıl hesaplanır? Formül ve örnekler",
      p: [
        "Elle hesap için iki bilgiye ihtiyacınız var: tarihin yılın kaçıncı günü olduğu (sıra günü) ve haftanın hangi günü olduğu (pazartesi 1, salı 2 … pazar 7). Ardından aşağıdaki formül uygulanır; ⌊ ⌋ işareti \"aşağı yuvarla\" demektir."
      ],
      formula: "Hafta = ⌊(sıra günü − haftanın günü + 10) ÷ 7⌋\nSonuç 0 ise: tarih önceki yılın son haftasındadır (52 ya da 53)\nSonuç 53 ise ve yıl 52 haftalıksa: tarih sonraki yılın 1. haftasındadır",
      ol: [
        "<strong>16 Kasım 2026 (pazartesi):</strong> Sıra günü 320, haftanın günü 1. (320 − 1 + 10) ÷ 7 = 329 ÷ 7 = 47,0 → 47. hafta.",
        "<strong>10 Şubat 2026 (salı):</strong> Sıra günü 41, haftanın günü 2. (41 − 2 + 10) ÷ 7 = 49 ÷ 7 = 7 → 7. hafta.",
        "<strong>1 Ocak 2026 (perşembe):</strong> Sıra günü 1, haftanın günü 4. (1 − 4 + 10) ÷ 7 = 1 → 1. hafta.",
        "<strong>1 Ocak 2027 (cuma):</strong> (1 − 5 + 10) ÷ 7 = 0,86 → 0. Sonuç 0 olduğu için tarih önceki yılın son haftasındadır: 2026 53 haftalık olduğundan 2026-W53.",
        "<strong>31 Aralık 2026 (perşembe):</strong> Sıra günü 365, haftanın günü 4. (365 − 4 + 10) ÷ 7 = 53 → 2026 53 haftalık olduğu için 53. hafta."
      ],
      after: [
        "Sıra gününü bulmak için ayların gün sayılarını toplayıp ayın gününü eklersiniz; artık yıllarda şubat 29 gündür. Bu adım için [[arac:yilin-kacinci-gunu|Yılın Kaçıncı Günü Hesaplama]] aracı yılın yüzde kaçının geçtiğini de gösterir. Artık yıl kuralı için [[bilgi:artik-yil-nedir-subat-kac-gun|artık yıl nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Bir yılda 52 mi 53 hafta mı vardır?",
      p: [
        "Bir yıl 365 ya da 366 gündür; bu da 52 hafta artı 1 ya da 2 gün eder. Bu artan günler birikerek yaklaşık her 5–6 yılda bir yılın 53 haftaya çıkmasına yol açar. ISO sistemine göre bir yılın 53 haftalık olması için iki koşuldan biri yeterlidir: yıl <strong>perşembe</strong> günü başlıyorsa ya da yıl <strong>artık yıl</strong> olup <strong>çarşamba</strong> günü başlıyorsa."
      ],
      table: {
        head: ["Yıl", "1 Ocak", "ISO hafta sayısı"],
        rows: [
          ["2020", "Çarşamba (artık yıl)", "53"],
          ["2025", "Çarşamba", "52"],
          ["2026", "Perşembe", "53"],
          ["2027", "Cuma", "52"],
          ["2028", "Cumartesi (artık yıl)", "52"],
          ["2032", "Perşembe (artık yıl)", "53"],
          ["2037", "Perşembe", "53"]
        ],
        caption: "2015–2040 arasında 53 haftalık yıllar: 2015, 2020, 2026, 2032 ve 2037."
      },
      after: [
        "53. hafta özellikle haftalık bütçe, bordro ve satış raporlarında sorun çıkarır: 52 haftalık yıllarla karşılaştırma yaparken bir haftalık fazlalığı hesaba katmanız gerekir. Haftalık maaş ya da kira ödemelerinde 2026'da 53 ödeme günü olabileceğini planlamada göz önünde bulundurun. Yıla yayılmış iş günü hesapları için [[bilgi:bir-ayda-kac-is-gunu-var|bir ayda kaç iş günü var]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Yılın ilk haftası hangi gün başlar?",
      p: [
        "ISO sisteminde 1. hafta her zaman bir pazartesi başlar, ama bu pazartesi 29 Aralık ile 4 Ocak arasındaki herhangi bir gün olabilir. 1 Ocak pazartesi, salı, çarşamba ya da perşembeye denk geliyorsa 1. hafta 1 Ocak'ı içerir ve önceki yılın son günlerinden başlayabilir. 1 Ocak cuma, cumartesi ya da pazara denk geliyorsa bu günler önceki yılın son haftasında kalır ve 1. hafta izleyen pazartesi başlar.",
        "Farklı ülkelerde başka sistemler de kullanılır. ABD'de ve bazı yazılımların varsayılan ayarında hafta pazar başlar ve 1. hafta 1 Ocak'ı içeren haftadır; bu sistemde yılın ilk haftası bir iki günlük olabilir ve yıl 53 ya da 54 \"hafta\" parçasına bölünebilir. Örneğin 1 Ocak 2027, ISO'ya göre 2026'nın 53. haftasındayken, bu ikinci sisteme göre 2027'nin 1. haftasıdır. Yurt dışı bir tedarikçiyle hafta numarası üzerinden anlaşırken hangi sistemin kullanıldığını teyit edin."
      ]
    },
    {
      h: "Elektronik tabloda hafta numarası nasıl bulunur?",
      p: [
        "Tablolama programlarının Türkçe sürümlerinde ISO hafta numarası için <code>ISOHAFTASAYISI(tarih)</code> işlevi kullanılır. Daha genel <code>HAFTASAYISI(tarih; tür)</code> işlevi ise ikinci parametreye göre farklı sistemler uygular: tür 1 ya da boş bırakıldığında hafta pazar başlar ve 1 Ocak'ı içeren hafta 1. hafta sayılır; tür <strong>21</strong> seçildiğinde sonuç ISO 8601 ile aynı olur. İngilizce sürümde işlev adları ISOWEEKNUM ve WEEKNUM'dur."
      ],
      ul: [
        "<code>=ISOHAFTASAYISI(\"16.11.2026\")</code> → 47",
        "<code>=HAFTASAYISI(\"16.11.2026\"; 21)</code> → 47 (ISO ile aynı)",
        "<code>=HAFTASAYISI(\"01.01.2027\"; 1)</code> → 1, oysa ISO'ya göre bu tarih 2026'nın 53. haftasıdır.",
        "Yılın kaçıncı günü için: <code>=A1 - TARİH(YIL(A1); 1; 0)</code>"
      ],
      after: [
        "Hafta numarasının yanında doğru yılı da göstermek için hafta yılını ayrıca hesaplamak gerekir; aksi hâlde 1 Ocak 2027 için \"2027 – 53. hafta\" gibi yanlış bir etiket oluşabilir. Bu tür kenar durumlarda [[arac:iso-hafta-tarihi-cevir|ISO Hafta Tarihi Çevirici]] tarihi doğrudan YYYY-Www-G biçimine çevirir ve yılı doğru verir."
      ]
    },
    {
      h: "Hafta numarasından tarih nasıl bulunur?",
      p: [
        "Elinizde \"2026'nın 47. haftası\" gibi bir bilgi varsa o haftanın pazartesini bulmak için şu yöntemi kullanabilirsiniz: yılın 4 Ocak gününü bulun, o günü içeren haftanın pazartesine geri gidin (bu, 1. haftanın pazartesidir), ardından (hafta numarası − 1) × 7 gün ekleyin."
      ],
      ol: [
        "4 Ocak 2026 pazar günüdür; o haftanın pazartesi 29 Aralık 2025'tir. Bu, 2026-W01'in ilk günüdür.",
        "47. hafta için (47 − 1) × 7 = 322 gün ekleyin.",
        "29 Aralık 2025 + 322 gün = 16 Kasım 2026 pazartesi. Hafta 22 Kasım 2026 pazar günü biter.",
        "Haftanın belirli bir günü gerekiyorsa gün numarasından 1 çıkarıp ekleyin: 2026-W47-5 (cuma) = 16 Kasım + 4 gün = 20 Kasım 2026."
      ],
      after: [
        "Hafta numaraları işaretlenmiş bir yıllık takvim hazırlamak, özellikle ofis ve atölye panoları için pratiktir. [[arac:takvim-olustur|Yazdırılabilir Takvim Oluştur]] aracıyla pazartesi başlayan, hafta numaralarının göründüğü aylık ya da yıllık takvimi PDF olarak alabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Bu hafta yılın kaçıncı haftası?", "Hafta numarası her pazartesi bir artar. Örneğin 16–22 Kasım 2026 haftası ISO 8601'e göre 2026'nın 47. haftasıdır. Bugünün hafta numarasını görmek için tarih seçerek hafta numarasını gösteren bir araç kullanabilir ya da formülle hesaplayabilirsiniz."],
    ["ISO hafta numarası nasıl hesaplanır?", "Tarihin yılın kaçıncı günü olduğu ve haftanın günü (pazartesi 1, pazar 7) bulunur. Hafta = aşağı yuvarla((sıra günü − haftanın günü + 10) ÷ 7) formülü uygulanır. Sonuç 0 çıkarsa tarih önceki yılın son haftasındadır."],
    ["Bir yılda 52 mi 53 hafta mı vardır?", "ISO sistemine göre yılların çoğu 52 haftalıktır. Yıl perşembe günü başlıyorsa ya da artık yıl çarşamba günü başlıyorsa 53 hafta vardır. 2026 yılı perşembe başladığı için 53 haftalıktır; sonraki 53 haftalık yıl 2032'dir."],
    ["Yılın ilk haftası hangi gün başlar?", "ISO 8601'de yılın ilk haftası, o yılın ilk perşembesini içeren haftanın pazartesi günü başlar. Bu pazartesi 29 Aralık ile 4 Ocak arasında herhangi bir gün olabilir; 2026'da 29 Aralık 2025, 2027'de ise 4 Ocak 2027'dir."],
    ["Bugün yılın kaçıncı günü?", "Yılın kaçıncı günü, önceki ayların gün sayılarının toplamına ayın gününün eklenmesiyle bulunur. Örneğin 16 Kasım 2026, 2026'nın 320. günüdür ve yıl sonuna 45 gün kalmıştır. Artık yıllarda mart ve sonrasındaki günler bir artar."],
    ["Excel'de hafta numarası nasıl bulunur?", "Tablolama programlarının Türkçe sürümünde ISOHAFTASAYISI(tarih) işlevi ISO hafta numarasını verir. HAFTASAYISI(tarih; 21) de aynı sonucu üretir. Tür parametresi 1 ya da boş bırakılırsa hafta pazar başlar ve sonuç ISO numarasından farklı olabilir."],
    ["Hafta numarası iş planlamasında neden kullanılır?", "Hafta numarası, bir işin hangi hafta içinde yapılacağını kısa ve tek anlamlı biçimde ifade eder. Üretim, lojistik, tedarik ve proje planlamasında teslim haftaları, parti kodları ve kapasite planları hafta numarasıyla takip edilir; Avrupalı tedarikçilerle ortak bir dil sağlar."],
    ["Hafta numarasından tarih nasıl bulunur?", "Yılın 4 Ocak gününü içeren haftanın pazartesi bulunur; bu 1. haftanın başlangıcıdır. Ardından (hafta numarası − 1) × 7 gün eklenir. Örneğin 2026'nın 47. haftası, 29 Aralık 2025'e 322 gün eklenerek 16 Kasım 2026 pazartesi olarak bulunur."],
    ["53. hafta nedir?", "53. hafta, ISO sistemine göre 53 haftalık yıllarda bulunan son haftadır. Yıl perşembe başladığında ya da artık yıl çarşamba başladığında oluşur. 2026'nın 53. haftası 28 Aralık 2026 pazartesi başlar ve 3 Ocak 2027 pazar biter."]
  ],
  tools: ["hafta-numarasi", "iso-hafta-tarihi-cevir", "yilin-kacinci-gunu", "takvim-olustur"],
  related: ["artik-yil-nedir-subat-kac-gun", "bir-ayda-kac-is-gunu-var", "vardiya-cizelgesi-nasil-hazirlanir"],
  sources: [
    ["ISO – ISO 8601 tarih ve saat gösterimi", "https://www.iso.org/iso-8601-date-and-time-format.html"],
    ["Türkiye Cumhuriyeti – resmî tatiller ve takvim bilgisi", "https://www.turkiye.gov.tr/"]
  ]
};
