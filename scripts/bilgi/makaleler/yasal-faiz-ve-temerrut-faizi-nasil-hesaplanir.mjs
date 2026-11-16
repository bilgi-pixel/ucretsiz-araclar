export default {
  slug: "yasal-faiz-ve-temerrut-faizi-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Yasal Faiz ve Temerrüt Faizi Nedir? Gecikmiş Alacağa Faiz Hesaplama",
  pageTitle: "Yasal Faiz ve Temerrüt Faizi Nasıl Hesaplanır? Güncel Oranlar",
  description: "Yasal faiz 1 Haziran 2024'ten beri yıllık %24. Ticari işlerde temerrüt faizi TCMB avans oranına bağlı. Basit faiz formülü, gün hesabı ve oran değişen dönem örneği.",
  keywords: ["yasal faiz oranı", "temerrüt faizi nedir", "3095 sayılı kanun", "avans faizi", "ticari temerrüt faizi", "yasal faiz hesaplama", "gecikme faizi hesaplama", "icra takibi faiz"],
  lead: "Yasal faiz, sözleşmede faiz oranı kararlaştırılmamış borçlarda uygulanan ve 3095 sayılı Kanun'a göre belirlenen orandır; 1 Haziran 2024'ten beri <strong>yıllık %24</strong>'tür. Temerrüt faizi ise borçlunun ödemeyi geciktirdiği her gün için işleyen faizdir: sözleşmede oran yoksa adi işlerde yasal faiz, ticari işlerde Merkez Bankası'nın avans işlemlerine uyguladığı faiz oranı esas alınır. Faiz basit hesaplanır: anapara × yıllık oran × gün ÷ 365. Bu yazıda oranların nereden geldiğini, temerrüdün ne zaman başladığını ve oran değişen dönemlerin nasıl ayrı hesaplandığını örnekle anlatıyoruz.",
  kisaCevap: [
    "Yasal faiz oranı 3095 sayılı Kanun md. 1'e göre belirlenir; 01.06.2024'ten beri yıllık %24'tür (16.11.2026 itibarıyla).",
    "Sözleşmede temerrüt faizi yoksa adi işlerde temerrüt faizi yasal faiz oranındadır; sözleşme faizi daha yüksekse ondan düşük olamaz.",
    "Ticari işlerde alacaklı, TCMB'nin kısa vadeli avans faiz oranını isteyebilir; bu oran 20.12.2025'ten beri yıllık %39,75'tir.",
    "Temerrüt, muaccel borçta ihtar ile, vadesi belli borçta vadenin geçmesiyle başlar.",
    "Faiz basit hesaplanır: faiz = anapara × yıllık oran × gün ÷ 365; faize faiz yürütülmez.",
    "Oran değiştiğinde her dönem kendi oranıyla ayrı hesaplanır ve sonuçlar toplanır."
  ],
  figure: {
    alt: "Oran değişen dönemde faiz hesabı: 50.000 TL alacakta 1–31 Mayıs 2024 arası 31 gün yüzde 9 ile 382,19 TL, 1 Haziran–30 Temmuz arası 60 gün yüzde 24 ile 1.972,60 TL, toplam 2.354,79 TL.",
    caption: "Yasal faiz 1 Haziran 2024'te %9'dan %24'e çıktığı için, bu tarihi kapsayan bir gecikmede iki dönem ayrı hesaplanır. Her dönem: anapara × oran × gün ÷ 365.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Oran değişince faiz dönem dönem hesaplanır</text>
  <text x="40" y="66" class="b">Alacak: 50.000 TL · temerrüt 30.04.2024 · ödeme 30.07.2024</text>
  <rect x="40" y="90" width="200" height="70" rx="8" class="ps"/>
  <rect x="240" y="90" width="440" height="70" rx="8" class="p"/>
  <text x="140" y="120" class="b mid">%9 yasal faiz</text>
  <text x="140" y="144" class="sm mid">01.05 – 31.05 · 31 gün</text>
  <text x="460" y="120" class="b mid sf">%24 yasal faiz</text>
  <text x="460" y="144" class="sm mid sf">01.06 – 30.07 · 60 gün</text>
  <line x1="240" y1="80" x2="240" y2="172" class="sdg sw dash" fill="none"/>
  <text x="240" y="190" class="sm b mid dg">01.06.2024 oran değişimi</text>
  <rect x="40" y="212" width="310" height="90" rx="10" class="sf sb"/>
  <text x="56" y="238" class="sm b">1. dönem</text>
  <text x="56" y="262" class="sm">50.000 × 0,09 × 31 ÷ 365</text>
  <text x="56" y="288" class="lg b">382,19 TL</text>
  <rect x="370" y="212" width="310" height="90" rx="10" class="sf sb"/>
  <text x="386" y="238" class="sm b">2. dönem</text>
  <text x="386" y="262" class="sm">50.000 × 0,24 × 60 ÷ 365</text>
  <text x="386" y="288" class="lg b">1.972,60 TL</text>
  <rect x="40" y="320" width="640" height="62" rx="10" class="oks"/>
  <text x="360" y="348" class="b mid">Toplam faiz: 382,19 + 1.972,60 = 2.354,79 TL</text>
  <text x="360" y="370" class="sm mid">Basit faiz: faiz anaparaya eklenip yeniden faizlendirilmez</text>
</svg>`
  },
  sections: [
    {
      h: "Yasal faiz nedir, oranı nasıl belirlenir?",
      p: [
        "Yasal faiz, kanunen faiz ödenmesi gereken ama oranı sözleşmede kararlaştırılmamış durumlarda uygulanan faizdir. 3095 sayılı Kanuni Faiz ve Temerrüt Faizine İlişkin Kanun'un 1. maddesi, yasal faiz oranının Cumhurbaşkanınca belirleneceğini düzenler. Oran uzun yıllar yıllık %9 olarak uygulandı; 21 Mayıs 2024 tarihli Resmî Gazete'de yayımlanan 8485 sayılı Cumhurbaşkanı Kararı ile 1 Haziran 2024'ten itibaren yıllık %24'e yükseltildi.",
        "Bu oran 16.11.2026 itibarıyla yürürlüktedir. Oran Cumhurbaşkanı kararıyla değiştirilebildiği için hesap yapmadan önce Resmî Gazete'den ya da güncel yargı kaynaklarından teyit etmek gerekir. Değişiklik geriye yürümez; değişiklik tarihinden önceki dönemler eski oranla hesaplanır."
      ],
      table: {
        head: ["Dönem", "Yasal faiz (yıllık)", "Ticari temerrüt (TCMB avans oranı)"],
        rows: [
          ["01.01.2022 – 30.06.2023", "%9", "%10,75"],
          ["01.07.2023 – 31.05.2024", "%9", "%36,75 (yıl içinde değişen)"],
          ["01.06.2024 – 27.12.2024", "%24", "%51,75"],
          ["28.12.2024 – 07.03.2025", "%24", "%49,25"],
          ["08.03.2025 – 16.09.2025", "%24", "%44,25"],
          ["17.09.2025 – 19.12.2025", "%24", "%42,25"],
          ["20.12.2025'ten itibaren", "%24", "%39,75"]
        ],
        caption: "Kaynak: 3095 sayılı Kanun, 8485 sayılı Cumhurbaşkanı Kararı ve TCMB reeskont ve avans faiz oranları tablosu (16.11.2026'da kontrol edildi). Ticari temerrüt sütunu TCMB avans oranındaki değişiklik tarihlerine göredir; uygulamada hangi yarıyıl kuralının esas alınacağı aşağıda açıklanmıştır."
      }
    },
    {
      h: "Temerrüt faizi ne zaman işlemeye başlar?",
      p: [
        "Temerrüt, borçlunun ödemesi gereken borcu zamanında ödememesidir. Türk Borçlar Kanunu'na göre muaccel, yani istenebilir hâle gelmiş bir borcun borçlusu, alacaklının ihtarıyla temerrüde düşer. İhtar noter ihtarnamesi, iadeli taahhütlü mektup, kayıtlı elektronik posta ya da icra takibiyle yapılabilir; ispat için yazılı ve tarihli olması önemlidir.",
        "Ödeme günü sözleşmede belirli bir tarih olarak kararlaştırılmışsa ayrıca ihtara gerek yoktur: borçlu bu günün geçmesiyle temerrüde düşer. Örneğin \"15 Mart 2026'da ödenecektir\" yazan bir borçta temerrüt faizi 16 Mart'tan itibaren işler.",
        "Temerrüt faizi, borçlunun kusuru aranmaksızın gecikme süresince işler. Alacaklı ayrıca daha büyük bir zararı varsa, borçlunun kusurunu ispatlayarak bunun da tazminini isteyebilir."
      ]
    },
    {
      h: "Ticari işlerde temerrüt faizi neden farklıdır? Avans faizi nedir?",
      p: [
        "3095 sayılı Kanun'un 2. maddesine göre ticari işlerde alacaklı, temerrüt faizi olarak Türkiye Cumhuriyet Merkez Bankası'nın kısa vadeli avans işlemlerine uyguladığı faiz oranını isteyebilir. Kanun bu oranın yıl içinde 31 Aralık ve 30 Haziran tarihlerinde geçerli olan avans faiz oranına göre uygulanacağını belirtir; bu nedenle uygulamada her yarıyıl başında bir önceki günün oranı esas alınır, ama mahkeme kararlarında ve kurum tablolarında oranın değiştiği tarihten itibaren ayrıştırma yapıldığı da görülür. Uyuşmazlıkta hangi yöntemin uygulanacağını bir hukukçuya sorun.",
        "Avans faiz oranı, Merkez Bankası'nın bankalara kısa vadeli avans kullandırırken uyguladığı orandır ve TCMB tarafından ilan edilip Resmî Gazete'de yayımlanır. Bu oran 20 Aralık 2025'ten itibaren yıllık %39,75'tir. Avans oranı, politika faizindeki değişikliklerden sonra güncellenebilir; politika faizinin mantığı için [[bilgi:politika-faizi-nedir-mevduat-ve-krediye-etkisi|politika faizi nedir]] yazısına bakabilirsiniz.",
        "Bir işin ticari sayılması için iki tarafın da tacir olması ve işin ticari işletmeyle ilgili olması gerekir. Tüketici ile tacir arasındaki işlemler ticari iş sayılmaz; bu durumda adi işlerdeki kurallar uygulanır."
      ]
    },
    {
      h: "Faiz basit mi bileşik mi hesaplanır? Formül",
      p: [
        "Yasal faiz ve temerrüt faizi kural olarak <strong>basit faiz</strong> şeklinde hesaplanır: faiz yalnızca anapara üzerinden işler, işleyen faiz anaparaya eklenip yeniden faizlendirilmez. Türk Borçlar Kanunu faizin anaparaya eklenerek yeniden faiz yürütülmesini kural olarak yasaklar; ticari cari hesap gibi kanunda sayılan istisnalar dışında bileşik faiz uygulanamaz.",
        "Gün sayımında uygulamada yıl 365 gün kabul edilir. Faizin işlemeye başladığı gün ile ödeme günü arasındaki takvim günü sayısı kullanılır."
      ],
      formula: "Faiz = anapara × yıllık oran × gün sayısı ÷ 365\nGünlük faiz = anapara × yıllık oran ÷ 365\nÖrnek: 100.000 TL × 0,24 ÷ 365 = 65,75 TL/gün",
      after: [
        "Bileşik faizin nasıl farklılaştığını görmek için [[bilgi:bilesik-faiz-nedir|bileşik faiz nedir]] yazısına bakabilirsiniz. Hesabı kendiniz yapmak isterseniz [[arac:gunluk-faiz-hesapla|Günlük Faiz Hesapla]] aracında anapara, yıllık oran ve gün sayısını girmeniz yeterlidir; aracın stopaj alanını boş bırakın, çünkü temerrüt faizi mevduat faizi değildir."
      ]
    },
    {
      h: "Gün sayısına göre faiz tutarı nasıl bulunur? Çözümlü örnek",
      ol: [
        "100.000 TL'lik bir borç 15 Mart 2026'da ödenmesi gerekirken 30 Eylül 2026'da ödeniyor. Taraflar tacir değil ve sözleşmede faiz oranı yok.",
        "Gün sayısı: 15 Mart ile 30 Eylül 2026 arası 199 gündür. Gün sayısını [[arac:tarih-farki|Tarih Farkı Hesapla]] aracıyla bulabilirsiniz.",
        "Uygulanacak oran yasal faizdir: yıllık %24.",
        "Faiz: 100.000 × 0,24 × 199 ÷ 365 = 13.084,93 TL.",
        "Aynı borç iki tacir arasında ticari bir işten doğmuş olsaydı ve %39,75 avans oranı uygulansaydı faiz 100.000 × 0,3975 × 199 ÷ 365 = 21.671,92 TL olurdu."
      ],
      after: [
        "Örnek, adi ve ticari işler arasındaki oran farkının sonucu ne kadar değiştirdiğini gösterir. Yüzde hesaplarını kontrol etmek için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı, basit ve bileşik faizi karşılaştırmak için Faiz Hesaplama aracı kullanılabilir."
      ]
    },
    {
      h: "Oran değiştiğinde dönemler nasıl ayrı hesaplanır?",
      p: [
        "Gecikme süresi içinde oran değişmişse tek bir oranla hesap yapılmaz. Süre, oranın değiştiği tarihlerden bölünür, her parça kendi oranıyla hesaplanır ve sonuçlar toplanır. Görseldeki örnekte 50.000 TL'lik borç için temerrüt 30 Nisan 2024'te başlamış, ödeme 30 Temmuz 2024'te yapılmıştır.",
        "1–31 Mayıs arası 31 gün için %9 uygulanır: 50.000 × 0,09 × 31 ÷ 365 = 382,19 TL. 1 Haziran–30 Temmuz arası 60 gün için %24 uygulanır: 50.000 × 0,24 × 60 ÷ 365 = 1.972,60 TL. Toplam faiz 2.354,79 TL'dir. Tek oranla, örneğin %24 ile 91 gün hesaplansaydı 2.991,78 TL bulunur ve borçlu fazla öderdi.",
        "Ticari işlerde avans faizi yılda birkaç kez değişebildiği için uzun gecikmelerde dönem sayısı artar. Her dönemin başlangıç ve bitiş tarihini, gün sayısını ve oranını bir tabloda yazmak hatayı önler."
      ]
    },
    {
      h: "Sözleşmede faiz yazmıyorsa hangi oran uygulanır?",
      ul: [
        "<strong>Adi işlerde:</strong> Temerrüt faizi yasal faiz oranındadır (yıllık %24).",
        "<strong>Ticari işlerde:</strong> Alacaklı TCMB avans faiz oranını isteyebilir.",
        "<strong>Sözleşmede akdi faiz var, temerrüt faizi yoksa:</strong> Temerrüt faizi, akdi faiz yasal orandan yüksekse akdi faizden düşük olamaz.",
        "<strong>Sözleşmede temerrüt faizi varsa:</strong> Kararlaştırılan oran uygulanır; ancak ticari olmayan işlerde Türk Borçlar Kanunu'nun 120. maddesindeki üst sınırlar gözetilir: akdi faiz yasal faizin yüzde yüz fazlasını, temerrüt faizi yüzde iki yüz fazlasını aşamaz.",
        "<strong>Tüketici kredileri ve kredi kartları:</strong> Ayrı düzenlemelere tabidir; kredi kartı gecikme faizi için [[bilgi:kredi-karti-akdi-ve-gecikme-faizi-2026|kredi kartı akdi ve gecikme faizi]] yazısına bakın.",
        "<strong>Vergi borçları:</strong> Faiz değil, gecikme zammı uygulanır; ayrıntılar [[bilgi:vergi-gecikme-zammi-nasil-hesaplanir|vergi gecikme zammı]] yazısında."
      ]
    },
    {
      h: "İcra takibinde faiz nasıl talep edilir?",
      p: [
        "İlamsız ya da ilamlı icra takibinde takip talebine üç bilgi yazılır: asıl alacak, takip tarihine kadar işlemiş faiz ve takip tarihinden sonra işleyecek faizin türü ve oranı. İşlemiş faiz yukarıdaki yöntemle hesaplanıp tutar olarak yazılır. İşleyecek faiz için \"takip tarihinden itibaren yasal faiz\" ya da \"avans faizi\" gibi oran türü belirtilir; böylece oran değişirse yeni oran otomatik uygulanır.",
        "Ödeme emrine itiraz edilirse alacaklı itirazın iptali davası açabilir. Haksız itiraz hâlinde mahkeme, alacağın belirli bir yüzdesi oranında icra inkâr tazminatına da hükmedebilir. İşçi alacaklarında faizin başlangıcı ve türü ayrıca değişebilir; kıdem tazminatında gecikme için mevduata uygulanan en yüksek faiz istenebilir. İşçi alacaklarındaki süreler için [[bilgi:isci-alacaklari-zamanasimi-ve-zorunlu-arabuluculuk|işçi alacaklarında zamanaşımı]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Faiz hesabında en sık yapılan hatalar nelerdir?", "En sık hatalar; oran değişen dönemleri tek oranla hesaplamak, ticari olmayan bir işe avans faizi uygulamak, faizi aylık bileşik hesaplamak, temerrüdün başladığı günü yanlış belirlemek ve aynı hesapta bazı dönemleri 360, bazılarını 365 günle bölmektir. Her dönem için tarih, gün sayısı ve oranı ayrı satırda yazmak bu hataların çoğunu önler ve karşı tarafın hesabıyla karşılaştırmayı kolaylaştırır."],
    ["Yasal faiz nedir, oranı nasıl belirlenir?", "Oranı sözleşmede kararlaştırılmamış faiz borçlarında uygulanan faizdir ve 3095 sayılı Kanun'a göre Cumhurbaşkanınca belirlenir. 1 Haziran 2024'ten beri yıllık %24'tür; daha önce uzun süre %9 olarak uygulanmıştı."],
    ["Temerrüt faizi ne zaman işlemeye başlar?", "Muaccel borçta alacaklının ihtarıyla, ödeme günü belirli bir tarih olarak kararlaştırılmış borçta ise bu tarihin geçmesiyle başlar. İhtarın noter, kayıtlı elektronik posta ya da icra takibiyle belgelenmesi ispat açısından önemlidir."],
    ["Ticari işlerde temerrüt faizi neden farklıdır?", "3095 sayılı Kanun'un 2. maddesi, ticari işlerde alacaklıya TCMB'nin kısa vadeli avans işlemlerine uyguladığı faiz oranını isteme hakkı verir. Bu oran 20.12.2025'ten beri yıllık %39,75'tir ve yasal faizden yüksektir."],
    ["Avans faizi nedir, kim belirler?", "Avans faizi, Türkiye Cumhuriyet Merkez Bankası'nın bankalara kısa vadeli avans kullandırırken uyguladığı orandır. TCMB tarafından belirlenip Resmî Gazete'de yayımlanır ve ticari işlerdeki temerrüt faizinin ölçüsü olarak kullanılır."],
    ["Faiz basit mi bileşik mi hesaplanır?", "Yasal faiz ve temerrüt faizi basit faizdir: faiz yalnızca anapara üzerinden işler ve faize faiz yürütülmez. Ticari cari hesap gibi kanunda sayılan istisnalar dışında bileşik faiz uygulanamaz."],
    ["Gün sayısına göre faiz tutarı nasıl bulunur?", "Anapara, yıllık oran ve gün sayısı çarpılıp 365'e bölünür. 100.000 TL'lik borç 199 gün gecikmişse yasal faiz 100.000 × 0,24 × 199 ÷ 365 = 13.084,93 TL olur."],
    ["Sözleşmede faiz yazmıyorsa hangi oran uygulanır?", "Adi işlerde yasal faiz oranı, ticari işlerde TCMB avans faiz oranı uygulanır. Sözleşmede yasal orandan yüksek bir akdi faiz varsa temerrüt faizi bu akdi faizden düşük olamaz."],
    ["İcra takibinde faiz nasıl talep edilir?", "Takip talebinde asıl alacak, takip tarihine kadar işlemiş faiz tutarı ve takip tarihinden sonra işleyecek faizin türü yazılır. İşleyecek faiz için oran türü belirtildiğinde oran değişikliği kendiliğinden uygulanır."],
    ["Oran değiştiğinde dönemler nasıl ayrı hesaplanır?", "Gecikme süresi oranın değiştiği tarihlerden bölünür, her dönem kendi oranı ve gün sayısıyla hesaplanır, sonuçlar toplanır. 50.000 TL'de 31 gün %9 ve 60 gün %24 için toplam faiz 2.354,79 TL'dir."]
  ],
  tools: ["faiz-hesapla", "gunluk-faiz-hesapla", "tarih-farki", "yuzde-hesapla"],
  related: ["bilesik-faiz-nedir", "vergi-gecikme-zammi-nasil-hesaplanir", "kredi-karti-akdi-ve-gecikme-faizi-2026", "politika-faizi-nedir-mevduat-ve-krediye-etkisi"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 3095 sayılı Kanuni Faiz ve Temerrüt Faizine İlişkin Kanun", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.3095.pdf"],
    ["TCMB – Reeskont ve avans faiz oranları", "https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Temel+Faaliyetler/Para+Politikasi/Reeskont+ve+Avans+Faiz+Oranlari"],
    ["Resmî Gazete", "https://www.resmigazete.gov.tr/"]
  ],
  uyari: "oranlar 16.11.2026 itibarıyla kontrol edilmiştir ve genel bilgi niteliğindedir; hukuki uyuşmazlıklarda bir avukata danışın"
};
