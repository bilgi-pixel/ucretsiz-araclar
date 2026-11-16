export default {
  slug: "unix-zaman-damgasi-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Unix Zaman Damgası (Epoch) Nedir? Timestamp Tarihe Nasıl Çevrilir",
  pageTitle: "Unix Zaman Damgası (Epoch) Nedir? Timestamp Tarihe Çevirme",
  description: "Unix zaman damgası, 1 Ocak 1970 00:00 UTC'den bu yana geçen saniyedir. Timestamp tarihe çevirme, milisaniye farkı, Türkiye saati, Excel formülü ve 2038 problemi.",
  keywords: ["unix zaman damgası nedir", "epoch nedir", "timestamp nedir", "timestamp tarihe çevirme", "milisaniye timestamp", "2038 problemi", "unix time excel", "epoch time türkiye saati"],
  lead: "Unix zaman damgası (Unix timestamp, epoch time), <strong>1 Ocak 1970 saat 00:00:00 UTC'den bu yana geçen saniye sayısıdır</strong>. Örneğin 1767225600 değeri 1 Ocak 2026 00:00 UTC anını, Türkiye saatiyle 03:00'ü gösterir. Saat dilimi, yaz saati ya da tarih biçimi taşımadığı için bilgisayarlar zamanı saklamak ve karşılaştırmak için bu tek sayıyı kullanır. Aşağıda sayının nasıl tarihe çevrildiğini, saniye ile milisaniye farkını, Excel formülünü ve 2038 problemini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Unix zamanı = 1970-01-01 00:00:00 UTC anından bu yana geçen saniye; bu başlangıç anına epoch denir.",
    "1 gün = 86.400 saniye; tarihe çevirmek için sayıyı 86.400'e bölüp 1 Ocak 1970'e gün olarak eklersiniz.",
    "10 haneli değer saniye, 13 haneli değer milisaniyedir; milisaniyeyi 1.000'e bölerek saniyeye çevirirsiniz.",
    "Zaman damgası saat diliminden bağımsızdır; Türkiye saati (UTC+3) için gösterimde 10.800 saniye eklenir.",
    "Excel'de A1 hücresindeki saniye için: =A1/86400+TARİH(1970;1;1), Türkiye saati için ayrıca +3/24.",
    "İşaretli 32 bit tamsayı 2147483647'de dolar; bu 19 Ocak 2038 03:14:07 UTC anıdır (2038 problemi)."
  ],
  figure: {
    alt: "1970'ten 2038'e uzanan zaman çizgisi: 0 değeri 1 Ocak 1970, 1 milyar değeri 9 Eylül 2001, 1,7 milyar değeri 14 Kasım 2023, 1.767.225.600 değeri 1 Ocak 2026 ve 2.147.483.647 değeri 19 Ocak 2038 olarak işaretli; altında saniyenin tarihe çevrilme adımları.",
    caption: "Zaman damgası tek yönde, saniyede bir artan bir sayaçtır. Çizgi üzerindeki tüm tarihler UTC'dir; Türkiye saati için 3 saat ekleyin. Sağ uçtaki değer, işaretli 32 bit tamsayının taşabileceği son andır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Epoch'tan 2038'e zaman çizgisi</text>
  <line x1="40" y1="120" x2="680" y2="120" class="sp sw" fill="none"/>
  <g class="sm mid">
    <circle cx="40" cy="120" r="8" class="p"/>
    <text x="40" y="96" class="b">0</text><text x="40" y="150">1 Oca 1970</text>
    <circle cx="403" cy="120" r="7" class="a"/>
    <text x="403" y="96" class="b">1.000.000.000</text><text x="403" y="150">9 Eyl 2001</text>
    <circle cx="540" cy="120" r="7" class="a"/>
    <text x="540" y="70" class="b">1.700.000.000</text><text x="540" y="168">14 Kas 2023</text>
    <circle cx="584" cy="120" r="8" class="ok"/>
    <text x="584" y="96" class="b ok">1.767.225.600</text><text x="584" y="150">1 Oca 2026</text>
    <circle cx="680" cy="120" r="8" class="dg"/>
    <text x="672" y="70" class="b dg end">2.147.483.647</text><text x="680" y="168" class="dg">19 Oca 2038</text>
  </g>
  <text x="40" y="214" class="b">Örnek çeviri: 1767225600</text>
  <g class="mid">
    <rect x="40" y="230" width="196" height="76" rx="8" class="sf sb"/>
    <text x="138" y="256" class="sm mu">1) Güne böl</text>
    <text x="138" y="280" class="b">÷ 86.400</text>
    <text x="138" y="298" class="sm">= 20.454 gün</text>
    <rect x="262" y="230" width="196" height="76" rx="8" class="ps"/>
    <text x="360" y="256" class="sm">2) 1970'e ekle</text>
    <text x="360" y="280" class="b">1 Oca 1970 + 20.454 gün</text>
    <text x="360" y="298" class="sm">= 1 Oca 2026 00:00 UTC</text>
    <rect x="484" y="230" width="196" height="76" rx="8" class="p"/>
    <text x="582" y="256" class="sm sf">3) Türkiye saati</text>
    <text x="582" y="280" class="b sf">UTC + 3 saat</text>
    <text x="582" y="298" class="sm sf">= 1 Oca 2026 03:00</text>
  </g>
  <rect x="40" y="328" width="640" height="54" rx="8" class="oks"/>
  <text x="360" y="351" class="sm mid b">10 hane = saniye · 13 hane = milisaniye</text>
  <text x="360" y="371" class="sm mid">1767225600 s = 1767225600000 ms</text>
</svg>`
  },
  sections: [
    {
      h: "Unix zaman damgası nedir?",
      p: [
        "Unix zaman damgası, bir anı \"yıl, ay, gün, saat\" gibi parçalara bölmeden <strong>tek bir tamsayı</strong> ile ifade etme yöntemidir. Sayı, 1 Ocak 1970 Perşembe günü saat 00:00:00 UTC'de sıfırdan başlamış ve o günden beri her saniye bir artmaktadır. Bu başlangıç anına <strong>epoch</strong> (dönem başlangıcı) denir; bu yüzden zaman damgası \"epoch time\" ya da \"Unix time\" adlarıyla da anılır.",
        "Bu yöntemin en büyük avantajı sadeliktir. İki zaman damgasını birbirinden çıkardığınızda aradaki süreyi doğrudan saniye cinsinden bulursunuz; ay uzunlukları, artık yıllar ya da yaz saati geçişleri hesaba katılmaz. Veritabanları, sunucu kayıt dosyaları, programlama dilleri, dosya sistemleri ve web servisleri bu nedenle zamanı çoğunlukla zaman damgası olarak saklar ve yalnızca ekranda gösterirken okunur tarihe çevirir.",
        "Zaman damgası 1970 öncesi tarihler için negatif değer alır. Örneğin −86.400 değeri 31 Aralık 1969 00:00 UTC anıdır. Çoğu modern sistem negatif değerleri de destekler."
      ]
    },
    {
      h: "Epoch neden 1 Ocak 1970'ten başlar?",
      p: [
        "Bu tarihin bilimsel ya da takvimsel özel bir anlamı yoktur; pratik bir mühendislik tercihidir. Unix işletim sistemi 1960'ların sonu ve 1970'lerin başında geliştirildi. Geliştiriciler, sistemin yapıldığı döneme yakın, akılda kalan ve yuvarlak bir başlangıç noktası seçtiler. İlk sürümlerde farklı başlangıç tarihleri ve farklı sayma hızları denendi; sonunda saniye birimi ve 1970'in ilk anı standart hâline geldi.",
        "Bu seçim daha sonra POSIX standardıyla kalıcılaştı ve Unix'ten türeyen sistemlerin yanı sıra pek çok programlama dili ve veri biçimi tarafından benimsendi. Farklı sistemlerin farklı başlangıç noktaları da vardır: Excel tarihleri 1900 başını, bazı dosya sistemleri 1601'i temel alır. Bu nedenle iki sistem arasında tarih aktarırken hangi epoch'un kullanıldığını bilmek önemlidir.",
        "Günlük hayatta zaman damgasıyla en çok şu yerlerde karşılaşırsınız: bir web servisinden dönen yanıttaki <code>created_at</code> ya da <code>exp</code> alanları, sunucu ve uygulama kayıt dosyaları, fotoğraf ve dosyaların değiştirilme bilgisi, oturum çerezlerinin geçerlilik süresi ve dışa aktarılan veritabanı tabloları. Bu alanlarda gördüğünüz 10 ya da 13 haneli sayıların neredeyse tamamı Unix zamanıdır ve aynı yöntemle okunur."
      ]
    },
    {
      h: "Timestamp tarihe nasıl çevrilir? Formül ve çözümlü örnek",
      p: [
        "Elle çevirmenin mantığı, sayıyı önce güne, sonra kalan saniyeyi saat-dakika-saniyeye ayırmaktır. Bir günde 24 × 60 × 60 = 86.400 saniye vardır. Unix zamanı artık saniyeleri saymadığı için her gün tam 86.400 saniye kabul edilir; bu da hesabı kolaylaştırır."
      ],
      formula: "gün sayısı = tam kısım(zaman damgası ÷ 86.400)\nkalan saniye = zaman damgası − gün sayısı × 86.400\nsaat = kalan ÷ 3.600 · dakika = (kalan mod 3.600) ÷ 60 · saniye = kalan mod 60",
      ol: [
        "Örnek değer: <strong>1700000000</strong>. 86.400'e bölün: 1.700.000.000 ÷ 86.400 = 19.675,925… Tam kısım 19.675 gündür.",
        "Kalan saniyeyi bulun: 1.700.000.000 − 19.675 × 86.400 = 1.700.000.000 − 1.699.920.000 = 80.000 saniye.",
        "Saate çevirin: 80.000 ÷ 3.600 = 22 saat, kalan 800 saniye; 800 ÷ 60 = 13 dakika, kalan 20 saniye. Saat 22:13:20 UTC.",
        "Günü takvime yerleştirin: 1 Ocak 1970'e 19.675 gün eklendiğinde 14 Kasım 2023 bulunur. Sonuç: 14 Kasım 2023, 22:13:20 UTC.",
        "Türkiye saatine geçin: 3 saat ekleyince 15 Kasım 2023, 01:13:20 olur. Saat dilimi farkının tarihi de bir gün ileri attığına dikkat edin."
      ],
      after: [
        "Dördüncü adım, ay uzunlukları ve artık yıllar nedeniyle elle en çok hata yapılan kısımdır. Pratikte bu işi [[arac:unix-zaman-damgasi|Unix Zaman Damgası Çevirici]] ile tek adımda yaparsınız; araç sonucu UTC, Türkiye saati ve cihazınızın saatiyle aynı anda gösterir. Artık yılların takvime etkisini [[bilgi:artik-yil-nedir-subat-kac-gun|artık yıl nedir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Saniye, milisaniye ve mikrosaniye zaman damgası farkı",
      p: [
        "Klasik Unix zamanı saniye cinsindendir ve günümüzde 10 hanelidir. JavaScript, Java ve birçok web servisi ise zamanı <strong>milisaniye</strong> cinsinden tutar; bu değerler 13 hanelidir. Bazı veritabanları ve ölçüm sistemleri mikrosaniye (16 hane) ya da nanosaniye (19 hane) kullanır. Hane sayısına bakmak, elinizdeki değerin birimini anlamanın en hızlı yoludur."
      ],
      table: {
        head: ["Birim", "Hane sayısı (bugün)", "Örnek (1 Ocak 2026 00:00 UTC)", "Saniyeye çevirme"],
        rows: [
          ["Saniye", "10", "1767225600", "Olduğu gibi"],
          ["Milisaniye", "13", "1767225600000", "÷ 1.000"],
          ["Mikrosaniye", "16", "1767225600000000", "÷ 1.000.000"],
          ["Nanosaniye", "19", "1767225600000000000", "÷ 1.000.000.000"]
        ],
        caption: "Hane sayısı 2286 yılına kadar saniye cinsinden 10 hane olarak kalır."
      },
      after: [
        "Milisaniyelik bir değeri saniye sanıp çevirirseniz binlerce yıl sonrasına ait anlamsız bir tarih bulursunuz; tersinde ise 1970'in ilk günlerine düşersiniz. \"Tarih 1970 çıktı\" şikâyetlerinin büyük kısmı bu birim karışıklığından kaynaklanır. Birimler arası çeviri için [[arac:milisaniye-saniye-cevir|milisaniye saniye çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Timestamp saat dilimine bağlı mı? Türkiye saati",
      p: [
        "Hayır. Zaman damgası dünyanın her yerinde aynı anda aynı değeri gösterir; İstanbul'da, Londra'da ve Tokyo'da şu anki Unix zamanı aynıdır. Saat dilimi yalnızca bu sayıyı okunur tarihe çevirirken devreye girer. Bu özellik, farklı ülkelerdeki sunucuların ve kullanıcıların kayıtlarını karışıklık olmadan sıralamayı sağlar.",
        "Türkiye 2016'dan bu yana yıl boyunca UTC+3 saatini kullanır ve yaz saati uygulamasına geçmez. Bu nedenle bugünkü tarihleri Türkiye saatine çevirmek için UTC sonucuna 3 saat (10.800 saniye) eklemek yeterlidir. Ancak 2016 öncesine ait kayıtlarda kış aylarında UTC+2, yaz aylarında UTC+3 geçerliydi; eski tarihleri çevirirken tarih kütüphanesinin saat dilimi veritabanını kullanmak gerekir.",
        "Sık yapılan bir hata, yerel saati zaman damgası gibi saklamaktır. Örneğin Türkiye saatiyle 12:00'yi UTC gibi kaydederseniz değer 3 saat ileri kayar ve yurt dışındaki kullanıcılar yanlış saati görür. Kural basittir: daima UTC sakla, yalnızca gösterirken yerel saate çevir. Farklı şehirlerin saatlerini karşılaştırmak için [[arac:zaman-dilimi-cevirici|saat dilimi çevirici]] yardımcı olur."
      ]
    },
    {
      h: "Excel ve tablolama programlarında Unix zamanı nasıl çevrilir?",
      p: [
        "Excel tarihleri, 1900 başından bu yana geçen <strong>gün sayısı</strong> olarak saklar; saat ise günün kesirli kısmıdır. Unix zamanı saniye olduğu için önce 86.400'e bölüp güne çevirir, sonra 1 Ocak 1970'in Excel'deki gün sayısını eklersiniz. Sonuç hücresini tarih-saat biçiminde görüntülemeyi unutmayın; aksi hâlde 46023,125 gibi bir sayı görürsünüz."
      ],
      table: {
        head: ["İşlem", "Türkçe Excel formülü", "Açıklama"],
        rows: [
          ["Saniyeyi UTC tarihe çevirme", "=A1/86400+TARİH(1970;1;1)", "A1'de 10 haneli değer"],
          ["Saniyeyi Türkiye saatine çevirme", "=A1/86400+TARİH(1970;1;1)+3/24", "UTC+3 için 3/24 gün eklenir"],
          ["Milisaniyeyi tarihe çevirme", "=A1/86400000+TARİH(1970;1;1)", "13 haneli değer"],
          ["Tarihi zaman damgasına çevirme", "=(B1-TARİH(1970;1;1))*86400", "B1'deki tarih UTC kabul edilir"],
          ["Türkiye saatindeki tarihi damgaya çevirme", "=(B1-3/24-TARİH(1970;1;1))*86400", "Önce 3 saat geri alınır"]
        ],
        caption: "İngilizce Excel'de TARİH yerine DATE, noktalı virgül yerine bölgesel ayara göre virgül kullanılır. Hücre biçimini \"gg.aa.yyyy ss:dd:nn\" yapın."
      }
    },
    {
      h: "2038 problemi nedir?",
      p: [
        "Eski sistemlerin çoğu Unix zamanını <strong>işaretli 32 bitlik tamsayı</strong> olarak tutar. Bu veri türünün alabileceği en büyük değer 2<sup>31</sup> − 1 = 2.147.483.647'dir. Zaman damgası bu değere 19 Ocak 2038 saat 03:14:07 UTC'de ulaşır. Bir saniye sonra sayı taşar ve en küçük negatif değere, yani 13 Aralık 1901 tarihine geri döner. Bu taşmaya <strong>2038 problemi</strong> ya da Y2K38 denir.",
        "Sorun, 2000 yılı geçişinde konuşulan Y2K sorununa benzer ama kaynağı farklıdır: burada mesele yılın iki haneyle yazılması değil, sayının saklandığı kutunun küçük olmasıdır. Modern masaüstü ve sunucu işletim sistemleri, veritabanları ve programlama dilleri artık 64 bitlik zaman damgası kullanır. 64 bitlik işaretli tamsayının taşması yaklaşık 292 milyar yıl sonraya denk geldiği için pratikte sınırsızdır.",
        "Risk daha çok uzun yıllar güncellenmeden çalışan gömülü cihazlarda, eski dosya biçimlerinde ve veritabanı tablolarında 32 bit olarak tanımlanmış zaman alanlarında bulunur. 2038 sonrasına uzanan tarihlerle çalışan uygulamalar (30 yıllık kredi planları gibi) bu sınırla bugünden karşılaşabilir; bu yüzden yeni sistemlerde zaman alanlarını 64 bit tanımlamak iyi bir uygulamadır."
      ]
    },
    {
      h: "Şu anki Unix zamanı nasıl öğrenilir?",
      ul: [
        "<strong>Tarayıcıda:</strong> [[arac:unix-zaman-damgasi|Unix Zaman Damgası]] sayfası şu anki değeri saniye ve milisaniye olarak canlı gösterir.",
        "<strong>JavaScript konsolunda:</strong> <code>Math.floor(Date.now() / 1000)</code> saniye, <code>Date.now()</code> milisaniye verir.",
        "<strong>Linux ve macOS terminalinde:</strong> <code>date +%s</code> komutu saniye cinsinden değeri yazar.",
        "<strong>Python'da:</strong> <code>import time; int(time.time())</code> aynı sonucu verir.",
        "<strong>Excel'de:</strong> <code>=(ŞİMDİ()-3/24-TARİH(1970;1;1))*86400</code> formülü, bilgisayarınız Türkiye saatindeyse yaklaşık değeri hesaplar."
      ],
      after: [
        "Zaman damgaları yalnızca tarih saklamak için kullanılmaz; benzersiz kimlik üretiminde de işe yarar. Bazı kimlik türleri içinde oluşturulma zamanını taşır; bu konuyu [[bilgi:uuid-guid-nedir|UUID ve GUID nedir]] yazısında, zaman damgasının sık geçtiği veri biçimini ise [[bilgi:json-nedir-nasil-okunur|JSON nedir]] yazısında bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Unix zaman damgası nedir?", "Unix zaman damgası, 1 Ocak 1970 saat 00:00:00 UTC'den bu yana geçen saniye sayısıdır. Saat dilimi ya da tarih biçimi taşımayan bu tek sayı, bilgisayarların zamanı saklamasını, sıralamasını ve iki an arasındaki süreyi kolayca hesaplamasını sağlar."],
    ["Epoch neden 1 Ocak 1970'ten başlar?", "Bu tarih, Unix işletim sisteminin geliştirildiği döneme yakın, yuvarlak ve akılda kalıcı olduğu için seçilmiş pratik bir başlangıç noktasıdır. Özel bir bilimsel anlamı yoktur; daha sonra POSIX standardıyla kalıcı hâle gelmiştir."],
    ["Timestamp tarihe nasıl çevrilir?", "Değeri 86.400'e bölerek 1 Ocak 1970'ten bu yana geçen gün sayısını, kalanı da saat, dakika ve saniyeye ayırarak günün saatini bulursunuz. Sonuç UTC'dir; Türkiye saati için 3 saat eklersiniz. Çevirici araç bu işlemi anında yapar."],
    ["Saniye ve milisaniye timestamp farkı nedir?", "Saniye cinsinden zaman damgası bugün 10 hanelidir, milisaniye cinsinden olanı ise 13 hanelidir ve bin kat büyüktür. Milisaniye değerini saniyeye çevirmek için 1.000'e bölmeniz gerekir; aksi hâlde anlamsız bir tarih elde edersiniz."],
    ["Timestamp saat dilimine bağlı mı?", "Hayır, zaman damgası dünyanın her yerinde aynı andaki aynı değerdir. Saat dilimi yalnızca sayıyı okunur tarihe çevirirken uygulanır. Türkiye yıl boyu UTC+3 kullandığı için güncel tarihlerde UTC sonucuna 3 saat eklemek yeterlidir."],
    ["Excel'de Unix zamanı nasıl çevrilir?", "A1 hücresindeki saniye değeri için =A1/86400+TARİH(1970;1;1) formülünü yazıp hücreyi tarih-saat biçiminde gösterin. Türkiye saati için formülün sonuna +3/24 ekleyin; milisaniye değerlerinde 86400 yerine 86400000 ile bölün."],
    ["2038 problemi nedir?", "Zamanı işaretli 32 bit tamsayı olarak tutan sistemlerde değer 19 Ocak 2038 03:14:07 UTC'de en büyük sınıra ulaşır ve bir saniye sonra taşarak 1901 tarihine döner. Modern 64 bit sistemler bu sorundan etkilenmez; risk eski ve gömülü sistemlerdedir."],
    ["Şu anki Unix zamanı nasıl öğrenilir?", "Tarayıcıdaki zaman damgası aracı şu anki değeri canlı gösterir. Ayrıca JavaScript konsolunda Math.floor(Date.now()/1000), Linux ve macOS terminalinde date +%s komutu ile saniye cinsinden güncel değeri öğrenebilirsiniz."],
    ["Unix zamanı artık saniyeleri sayar mı?", "Hayır, Unix zamanı her günü tam 86.400 saniye kabul eder ve artık saniyeleri saymaz. Bu yüzden atom saatiyle tutulan uluslararası zamandan saniyeler düzeyinde farklıdır; günlük kullanımda ve tarih hesaplarında bu fark önemsizdir."]
  ],
  tools: ["unix-zaman-damgasi", "milisaniye-saniye-cevir", "zaman-dilimi-cevirici"],
  related: ["artik-yil-nedir-subat-kac-gun", "uuid-guid-nedir", "json-nedir-nasil-okunur", "bu-hafta-yilin-kacinci-haftasi"],
  sources: [
    ["The Open Group – POSIX: Seconds Since the Epoch tanımı", "https://pubs.opengroup.org/onlinepubs/9699919799/"],
    ["IANA – Saat Dilimi Veritabanı", "https://www.iana.org/time-zones"]
  ]
};
