export default {
  slug: 'mb-gb-cevir',
  title: 'Megabayt Gigabayt Çevirici',
  h1Tail: 'MB ↔ GB',
  pageTitle: 'Megabayt Gigabayt Çevirici – MB\'den GB\'ye, GB\'den MB\'ye Hesaplama',
  description: 'Megabaytı gigabayta, gigabaytı megabayta çevirin. 1 GB = 1024 MB ya da 1000 MB kabulünü seçin; kilobayt, bayt ve diğer sistemdeki karşılığı da görün.',
  card: 'MB değerini GB\'ye, GB değerini MB\'ye çevirin; 1024 ve 1000 tabanlı iki hesabı yan yana görün.',
  category: 'birim',
  keywords: ['mb gb çevirme', '1 gb kaç mb', 'megabayt gigabayt', 'gb kaç mb eder', 'mb to gb', '1024 mb kaç gb', 'internet paketi mb gb'],
  lead: 'Megabayt (MB) cinsinden bir dosya boyutunu ya da internet kotasını gigabayta (GB), gigabaytı megabayta çevirin. Hesabı yaygın <strong>1 GB = 1024 MB</strong> kabulüyle ya da ondalık <strong>1 GB = 1000 MB</strong> tanımıyla yapabilir, iki sistem arasındaki farkı aynı ekranda görebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2048' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mb', 'Megabayt → Gigabayt'], ['gb', 'Gigabayt → Megabayt']] },
    { id: 'sistem', label: 'Kat sayısı', type: 'select', options: [['1024', 'İkili: 1 GB = 1024 MB'], ['1000', 'Ondalık: 1 GB = 1000 MB']], hint: 'İşletim sistemleri ve çoğu internet paketi 1024, disk ve bellek kartı üreticileri 1000 kullanır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const mb = v.yon === 'gb' ? x * k : x;
    const gb = mb / k;
    const bayt = mb * k * k;
    const rGb = ['Gigabayt', h.sig(gb, 8) + ' GB'];
    const rMb = ['Megabayt', h.sig(mb, 8) + ' MB'];
    const diger = k === 1024
      ? ['Ondalık sistemde (1 GB = 1000 MB)', h.sig(bayt / 1e9, 8) + ' GB']
      : ['İkili sistemde (1 GiB = 1024 MiB)', h.sig(bayt / 1073741824, 8) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'gb' ? [rMb, rGb] : [rGb, rMb]),
        ['Kilobayt', h.sig(mb * k, 10) + ' KB'],
        ['Bayt', h.sig(bayt, 13) + ' bayt'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 GB = 1024 MB = 1.048.576 KB kabulüyle yapıldı.'
        : 'Hesap 1 GB = 1000 MB = 1.000.000 KB (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  },
  cases: [
    { in: { deger: '2048', yon: 'mb', sistem: '1024' }, out: { 'Gigabayt': '2 GB', 'Kilobayt': '2.097.152 KB' } },
    { in: { deger: '5', yon: 'gb', sistem: '1024' }, out: { 'Megabayt': '5.120 MB', 'Gigabayt': '5 GB' } },
    { in: { deger: '500', yon: 'mb', sistem: '1024' }, out: { 'Gigabayt': '0,48828125 GB' } },
    { in: { deger: '1', yon: 'gb', sistem: '1024' }, out: { 'Megabayt': '1.024 MB', 'Bayt': '1.073.741.824 bayt', 'Ondalık sistemde (1 GB = 1000 MB)': '1,0737418 GB' } },
    { in: { deger: '1500', yon: 'mb', sistem: '1000' }, out: { 'Gigabayt': '1,5 GB', 'Bayt': '1.500.000.000 bayt' } },
    { in: { deger: '1,5', yon: 'gb', sistem: '1024' }, out: { 'Megabayt': '1.536 MB' } },
    { in: { deger: '1', yon: 'gb', sistem: '1000' }, out: { 'Megabayt': '1.000 MB', 'İkili sistemde (1 GiB = 1024 MiB)': '0,93132257 GiB' } },
    { in: { deger: '', yon: 'mb' }, error: true },
    { in: { deger: '-3', yon: 'gb' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz miktarı yazın. Ondalıklı değerlerde virgül ya da nokta kullanabilirsiniz (örneğin 1,5).',
    '"Çeviri yönü" listesinden megabayttan gigabayta mı, gigabayttan megabayta mı geçeceğinizi seçin.',
    '"Kat sayısı" listesinden 1024 (ikili) ya da 1000 (ondalık) tabanını seçin. Emin değilseniz 1024\'te bırakın; gündelik kullanımda beklenen sonuç budur.',
    '"Çevir" düğmesine basın. İlk satır aradığınız sonuçtur; altında kilobayt, bayt ve diğer sistemdeki karşılık listelenir.',
    'Sonuçları "Sonucu kopyala" düğmesiyle panoya alıp mesaja ya da tabloya yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'MB\'den GB\'ye çevirme formülü', p: [
      'Megabayt ve gigabayt, dijital verinin boyutunu anlatan iki ardışık birimdir. İkili kabulde bir gigabayt 1024 megabayttır; bu yüzden megabayttan gigabayta geçmek için değeri 1024\'e bölersiniz: <strong>GB = MB ÷ 1024</strong>. Tersine, gigabayttan megabayta geçmek için 1024 ile çarparsınız: <strong>MB = GB × 1024</strong>.',
      'Çözümlü örnek: 2048 MB\'lik bir dosya 2048 ÷ 1024 = 2 GB eder. 5 GB\'lik bir internet paketi 5 × 1024 = 5.120 MB\'dir. 500 MB ise 500 ÷ 1024 = 0,48828125 GB, yani yarım gigabayttan biraz azdır. Ondalık sistemi seçerseniz bölen 1000 olur ve 1500 MB tam 1,5 GB çıkar.',
    ] },
    { h: '1 GB 1024 MB mi, 1000 MB mi?', p: [
      'İkisi de kullanılır ve karışıklığın kaynağı budur. Bilgisayar belleği ikinin katlarıyla adreslendiği için yazılım dünyası onlarca yıl boyunca "kilo" önekini 1024 anlamında kullandı; 1 MB = 1024 KB, 1 GB = 1024 MB alışkanlığı buradan gelir. Uluslararası Birimler Sistemi\'nde (SI) ise kilo, mega ve giga önekleri bin, milyon ve milyar demektir; buna göre 1 GB tam olarak 1.000.000.000 bayttır.',
      'Karışıklığı gidermek için ikili katlara ayrı adlar verilmiştir: kibibayt (KiB), mebibayt (MiB) ve gibibayt (GiB). Bu adlandırmada 1 GiB = 1024 MiB = 1.073.741.824 bayttır. Ancak gündelik dilde ve pek çok işletim sistemi ekranında hâlâ "GB" yazılıp 1024 tabanlı hesap yapılır. Araçtaki "Kat sayısı" seçeneği iki yorumu da hesaplamanızı sağlar; son satır aynı miktarın öteki sistemde kaç ettiğini gösterir.',
    ] },
    { h: 'İnternet paketlerinde MB ve GB', p: [
      'Mobil internet kotaları küçük paketlerde MB, büyük paketlerde GB olarak yazılır: 500 MB, 1 GB, 5 GB, 20 GB gibi. Kalan kullanım bilgisi ise çoğu zaman megabayt olarak bildirilir. "Kalan internetiniz 3.584 MB" yazan bir mesajın karşılığını görmek için değeri yazıp MB → GB yönünü seçin; 3.584 ÷ 1024 = 3,5 GB kaldığını görürsünüz.',
      'Operatörlerin hangi kat sayısını kullandığı tarifeden tarifeye değişebilir; kesin bilgi için kendi operatörünüzün kullanım koşullarına bakın. İki sistem arasındaki fark gigabayt düzeyinde yaklaşık yüzde 2,4\'tür; yani 10 GB\'lik bir pakette 240 MB kadar bir yorum farkı oluşabilir.',
    ] },
    { h: 'Hızlı başvuru tablosu (1024 tabanı)', ul: [
      '<strong>100 MB</strong> = 0,09765625 GB',
      '<strong>256 MB</strong> = 0,25 GB',
      '<strong>512 MB</strong> = 0,5 GB',
      '<strong>1024 MB</strong> = 1 GB',
      '<strong>2048 MB</strong> = 2 GB',
      '<strong>4096 MB</strong> = 4 GB',
      '<strong>8192 MB</strong> = 8 GB',
      '<strong>16384 MB</strong> = 16 GB',
      '<strong>10 GB</strong> = 10.240 MB',
      '<strong>50 GB</strong> = 51.200 MB',
    ] },
    { h: 'Nerelerde işinize yarar?', p: [
      'E-posta eki sınırları megabaytla, bulut depolama alanları gigabaytla ifade edilir; elinizdeki dosyaların toplamını megabayt olarak bilip depolama alanınızın ne kadarını dolduracağını merak ettiğinizde bu çeviriye ihtiyaç duyarsınız. Oyun güncellemeleri, film dosyaları, telefon yedekleri ve sanal makine bellek ayarları da aynı iki birim arasında gidip gelir. Örneğin bir sanal makineye 6 GB bellek vermek istiyorsanız ayar ekranına 6 × 1024 = 6.144 MB yazmanız gerekir.',
      'Bellek modüllerinin kapasitesi her zaman ikili sistemle söylenir: 8 GB RAM, 8.192 MB demektir. USB bellek, SSD ve hafıza kartı üreticileri ise kapasiteyi ondalık sistemle etiketler; bu yüzden 64 GB yazan bir kart bilgisayarda yaklaşık 59,6 GB görünür. Bu eksiklik bir arıza değil, iki sayma biçimi arasındaki farktır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      '<strong>Mb ile MB\'yi karıştırmak:</strong> Küçük b ile yazılan Mb megabit, büyük B ile yazılan MB megabayttır ve aralarında sekiz kat fark vardır. İnternet hızları megabit, dosya boyutları megabayt cinsinden verilir. Bu araç yalnızca bayt tabanlı birimler arasında çeviri yapar.',
      '<strong>Bölmek yerine çarpmak:</strong> Küçük birimden büyük birime geçerken sayı küçülmelidir. 3000 MB\'nin 3 milyon GB etmesi mümkün değildir; sonuç yaklaşık 2,93 GB olmalıdır.',
      'Araç negatif değer kabul etmez. Sonuçlar sekiz anlamlı basamağa kadar gösterilir; bayt satırı tam sayıya yakın değerlerde eksiksiz yazılır. Çok küçük ya da çok büyük sonuçlar bilimsel gösterimle verilir.',
    ] },
  ],
  faq: [
    ['1 GB kaç MB eder?', 'Yaygın ikili kabulde 1 GB = 1024 MB\'dir. Ondalık SI tanımına göre ise 1 GB = 1000 MB eder. Araçta her iki kat sayısını da seçebilirsiniz.'],
    ['1 MB kaç GB eder?', '1024 tabanında 1 MB = 0,0009765625 GB, 1000 tabanında 1 MB = 0,001 GB\'dir. Pratikte megabayt, gigabaytın yaklaşık binde biridir.'],
    ['500 MB yarım GB mı?', 'Ondalık sistemde evet, tam 0,5 GB eder. 1024 tabanında ise 0,48828125 GB\'dir; tam yarım gigabayt 512 MB\'ye karşılık gelir.'],
    ['Hangi kat sayısını seçmeliyim?', 'RAM, işletim sistemi dosya boyutları ve çoğu yazılım ayarı için 1024 doğru sonucu verir. Disk, SSD ve hafıza kartı etiketleri ile ağ ekipmanı belgeleri için 1000 tabanı kullanılır. Kararsızsanız iki sonucu da not edin; fark yüzde 2,4 civarındadır.'],
    ['GiB ile GB arasındaki fark nedir?', 'GiB (gibibayt) her zaman 1024 tabanlıdır ve 1.073.741.824 bayta eşittir. GB resmî tanımıyla 1.000.000.000 bayttır, ancak gündelik kullanımda sıklıkla GiB anlamında yazılır. Aracın son satırı bu iki değeri yan yana gösterir.'],
    ['10 GB internetle ne kadar MB kullanabilirim?', '10 GB, 1024 tabanında 10.240 MB eder. Günde ortalama 340 MB harcarsanız bu kota yaklaşık 30 gün yeter; kendi günlük tüketiminizi megabayt olarak biliyorsanız toplamı buna bölerek süreyi tahmin edebilirsiniz.'],
    ['Ondalıklı GB değeri yazabilir miyim?', 'Evet. 1,5 ya da 0,75 gibi değerleri virgül veya nokta ile yazabilirsiniz. 1,5 GB, 1024 tabanında 1.536 MB olarak hesaplanır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; girdiğiniz sayı hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['gb-tb-cevir', 'kb-mb-cevir', 'gib-gb-cevir', 'bit-bayt-cevir', 'indirme-suresi-hesapla', 'birim-donustur'],
};
