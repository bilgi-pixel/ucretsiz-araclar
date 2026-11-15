export default {
  slug: 'gb-tb-cevir',
  title: 'Gigabayt Terabayt Çevirici',
  h1Tail: 'GB ↔ TB',
  pageTitle: 'Gigabayt Terabayt Çevirici – GB\'den TB\'ye, TB\'den GB\'ye Hesaplama',
  description: 'Gigabaytı terabayta, terabaytı gigabayta çevirin. 1024 ya da 1000 tabanını seçin; megabayt karşılığını ve diskin bilgisayarda görünen kapasitesini de öğrenin.',
  card: 'GB değerini TB\'ye, TB değerini GB\'ye çevirin; disk etiketindeki kapasite ile bilgisayarda görünen değeri karşılaştırın.',
  category: 'birim',
  keywords: ['gb tb çevirme', '1 tb kaç gb', 'gigabayt terabayt', 'terabayt kaç gigabayt', 'gb to tb', '1 tb disk kaç gb görünür', '2 tb kaç gb'],
  lead: 'Gigabayt (GB) cinsinden bir depolama miktarını terabayta (TB), terabaytı gigabayta çevirin. Disk, SSD ve yedekleme planlarında işinize yarayacak biçimde hem <strong>1 TB = 1024 GB</strong> hem de <strong>1 TB = 1000 GB</strong> kabulü desteklenir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['gb', 'Gigabayt → Terabayt'], ['tb', 'Terabayt → Gigabayt']] },
    { id: 'sistem', label: 'Kat sayısı', type: 'select', options: [['1024', 'İkili: 1 TB = 1024 GB'], ['1000', 'Ondalık: 1 TB = 1000 GB']], hint: 'Disk kutusunun üstündeki kapasite için 1000, işletim sisteminin gösterdiği değer için 1024 seçin.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const gb = v.yon === 'tb' ? x * k : x;
    const tb = gb / k;
    const bayt = gb * k * k * k;
    const rTb = ['Terabayt', h.sig(tb, 8) + ' TB'];
    const rGb = ['Gigabayt', h.sig(gb, 8) + ' GB'];
    const diger = k === 1024
      ? ['Ondalık (üretici etiketi) karşılığı', h.sig(bayt / 1e9, 8) + ' GB']
      : ['Bilgisayarda görünen (1024 tabanlı)', h.sig(bayt / 1073741824, 8) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'tb' ? [rGb, rTb] : [rTb, rGb]),
        ['Megabayt', h.sig(gb * k, 10) + ' MB'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 TB = 1024 GB = 1.048.576 MB kabulüyle yapıldı.'
        : 'Hesap 1 TB = 1000 GB = 1.000.000 MB (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  },
  cases: [
    { in: { deger: '2', yon: 'tb', sistem: '1024' }, out: { 'Gigabayt': '2.048 GB', 'Megabayt': '2.097.152 MB' } },
    { in: { deger: '512', yon: 'gb', sistem: '1024' }, out: { 'Terabayt': '0,5 TB', 'Gigabayt': '512 GB' } },
    { in: { deger: '1', yon: 'tb', sistem: '1000' }, out: { 'Gigabayt': '1.000 GB', 'Bilgisayarda görünen (1024 tabanlı)': '931,32257 GiB' } },
    { in: { deger: '500', yon: 'gb', sistem: '1024' }, out: { 'Terabayt': '0,48828125 TB' } },
    { in: { deger: '4000', yon: 'gb', sistem: '1000' }, out: { 'Terabayt': '4 TB', 'Megabayt': '4.000.000 MB' } },
    { in: { deger: '1', yon: 'tb', sistem: '1024' }, out: { 'Gigabayt': '1.024 GB', 'Ondalık (üretici etiketi) karşılığı': '1.099,5116 GB' } },
    { in: { deger: '0', yon: 'gb', sistem: '1024' }, out: { 'Terabayt': '0 TB' } },
    { in: { deger: 'iki', yon: 'tb' }, error: true },
    { in: { deger: '-1', yon: 'gb' }, error: true },
  ],
  howto: [
    '"Değer" alanına gigabayt ya da terabayt cinsinden miktarı yazın; 0,5 ya da 1,5 gibi ondalıklı değerler de geçerlidir.',
    '"Çeviri yönü" listesinden GB → TB ya da TB → GB seçeneğini işaretleyin.',
    '"Kat sayısı" alanında hesabın 1024 mü yoksa 1000 tabanıyla mı yapılacağını belirleyin.',
    '"Çevir" düğmesine basın; sonuç kutusunda terabayt, gigabayt ve megabayt karşılıkları ile öteki sistemdeki değer görünür.',
  ],
  sections: [
    { h: 'Gigabayt ve terabayt arasındaki ilişki', p: [
      'Terabayt, gigabayttan bir basamak büyük depolama birimidir. İkili sayımda bir terabayt 1024 gigabayt eder; ondalık sayımda ise 1000 gigabayttır. Buna göre iki temel formül şunlardır: <strong>TB = GB ÷ kat sayısı</strong> ve <strong>GB = TB × kat sayısı</strong>. Kat sayısı, seçtiğiniz sisteme göre 1024 ya da 1000 olur.',
      'Çözümlü örnek: 2 TB\'lik bir alan 1024 tabanında 2 × 1024 = 2.048 GB, megabayt olarak 2.048 × 1024 = 2.097.152 MB eder. 512 GB\'lik bir SSD aynı tabanda 512 ÷ 1024 = 0,5 TB\'dir. Ondalık sistemde 4000 GB tam 4 TB\'ye karşılık gelir.',
    ] },
    { h: '1 TB disk neden 931 GB görünür?', p: [
      'Yeni alınan bir diskin bilgisayarda etiketindekinden küçük görünmesi en çok sorulan konulardan biridir. Depolama üreticileri kapasiteyi ondalık öneklerle belirtir: 1 TB yazan bir diskte 1.000.000.000.000 bayt bulunur. Birçok işletim sistemi ise aynı bayt sayısını 1024\'ün kuvvetlerine bölerek gösterir. 1.000.000.000.000 ÷ 1.073.741.824 işlemi yaklaşık 931,32 sonucunu verir; ekranda "931 GB" yazmasının nedeni budur.',
      'Bunu araçla doğrulamak için değere 1 yazın, TB → GB yönünü ve "Ondalık" kat sayısını seçin. "Bilgisayarda görünen" satırında 931,32257 GiB değerini görürsünüz. Disk bozuk ya da eksik değildir; yalnızca aynı miktar iki farklı ölçekle ifade edilmektedir. Ayrıca dosya sistemi kendi yapıları için bir miktar alan ayırdığından, kullanılabilir boş alan bu değerin de biraz altında olabilir.',
    ] },
    { h: 'Etiket kapasitesine göre görünen değerler', ul: [
      '<strong>120 GB</strong> etiketli SSD yaklaşık 111,76 GiB',
      '<strong>240 GB</strong> etiketli SSD yaklaşık 223,52 GiB',
      '<strong>256 GB</strong> etiketli SSD yaklaşık 238,42 GiB',
      '<strong>500 GB</strong> etiketli disk yaklaşık 465,66 GiB',
      '<strong>1 TB</strong> etiketli disk yaklaşık 931,32 GiB',
      '<strong>2 TB</strong> etiketli disk yaklaşık 1.862,65 GiB (1,82 TiB)',
      '<strong>4 TB</strong> etiketli disk yaklaşık 3.725,29 GiB (3,64 TiB)',
      '<strong>8 TB</strong> etiketli disk yaklaşık 7.450,58 GiB (7,28 TiB)',
    ] },
    { h: 'Depolama planlarken nasıl kullanılır?', p: [
      'Güvenlik kamerası kayıt cihazı, ağ depolama ünitesi ya da yedekleme diski seçerken ihtiyacınızı çoğunlukla gigabayt olarak hesaplar, ürünleri ise terabayt olarak görürsünüz. Örneğin günde 40 GB kayıt üreten bir kamera sistemi için 30 günlük arşiv 1.200 GB tutar. Bunu ondalık sistemle terabayta çevirdiğinizde 1,2 TB eder; yani 1 TB\'lik disk yetmez, bir üst kapasiteye yönelmek gerekir.',
      'Bulut depolama paketleri, oyun konsolu diskleri ve fotoğraf arşivleri için de benzer bir hesap yapılır. Ortalama büyüklüğü bilinen dosyaların sayısını çarparak toplam gigabaytı bulur, ardından terabayta çevirerek hangi kapasitenin yeteceğini görürsünüz. Planlamada bir miktar boş alan payı bırakmak, diskin tamamen dolmasının getirdiği yavaşlamayı önler.',
    ] },
    { h: 'Terabaytın ötesi', p: [
      'Terabayttan sonraki birim petabayttır (PB): 1 PB, seçilen sisteme göre 1024 ya da 1000 TB eder. Veri merkezleri ve büyük arşivler bu ölçekte konuşur. Bireysel kullanımda ise terabayt hâlâ en büyük gündelik birimdir. İkili adlandırmada terabaytın karşılığı tebibayt (TiB), gigabaytın karşılığı gibibayttır (GiB); 1 TiB = 1024 GiB = 1.099.511.627.776 bayttır.',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'Çeviri yaparken kaynağınızın hangi sistemi kullandığını bilmek sonucu belirler. Ürün etiketi, teknik şartname ve satış ilanları neredeyse her zaman ondalıktır. İşletim sisteminin disk yönetimi ekranı, bellek bilgisi ve pek çok yedekleme yazılımı ikili hesap yapar. İki sistemin terabayt düzeyindeki farkı yaklaşık yüzde 9,95\'tir; yani birim büyüdükçe aradaki açı da büyür. Megabayt düzeyinde yüzde 4,9, gigabayt düzeyinde yüzde 7,4 olan bu fark terabaytta onda bire yaklaşır.',
      'Araç negatif sayı kabul etmez ve sonuçları sekiz anlamlı basamakla gösterir. Sonuçlar bilgi amaçlıdır; satın alma kararında ürünün kendi teknik belgesindeki bayt cinsinden kapasiteyi esas alın.',
    ] },
  ],
  faq: [
    ['1 TB kaç GB eder?', 'İkili kabulde 1 TB = 1024 GB, ondalık SI tanımında 1 TB = 1000 GB\'dir. Disk üreticileri ondalık değeri kullanır; işletim sistemleri çoğunlukla 1024 tabanlı gösterim yapar.'],
    ['1 GB kaç TB eder?', '1024 tabanında 1 GB = 0,0009765625 TB, 1000 tabanında 1 GB = 0,001 TB\'dir.'],
    ['2 TB disk bilgisayarda kaç GB görünür?', 'Etiketinde 2 TB yazan bir disk 2.000.000.000.000 bayt içerir ve 1024 tabanlı gösterimde yaklaşık 1.862,65 GiB, yani 1,82 TiB olarak görünür.'],
    ['500 GB kaç TB eder?', '1024 tabanında 0,48828125 TB, 1000 tabanında tam 0,5 TB eder. Yarım terabaytın ikili karşılığı 512 GB\'dir.'],
    ['TB ile TiB aynı şey mi?', 'Hayır. TB resmî olarak 10<sup>12</sup> bayt, TiB (tebibayt) ise 2<sup>40</sup> bayttır. TiB yaklaşık yüzde 10 daha büyüktür. Gündelik dilde TB yazılıp TiB kastedilmesi karışıklığa yol açar.'],
    ['1 TB\'ye kaç film ya da fotoğraf sığar?', 'Bu tamamen dosya boyutuna bağlıdır. Ortalama dosya boyutunuzu gigabayt olarak biliyorsanız 1.000 (ya da 1.024) GB\'yi bu değere bölerek kaba bir sayı bulabilirsiniz; örneğin 4 GB\'lik dosyalardan yaklaşık 250 tane sığar.'],
    ['Terabayttan büyük birim hangisidir?', 'Sırasıyla petabayt (PB), eksabayt (EB), zettabayt (ZB) ve yottabayt (YB) gelir. Her biri bir öncekinin 1000 (ondalık) ya da 1024 (ikili) katıdır.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Çeviri işlemi yalnızca tarayıcınızda çalışır; yazdığınız değer sunucuya iletilmez, kaydedilmez. Sayfa yüklendikten sonra internet olmadan da kullanılabilir.'],
  ],
  related: ['mb-gb-cevir', 'gib-gb-cevir', 'kb-mb-cevir', 'bit-bayt-cevir', 'video-boyutu-hesapla', 'birim-donustur'],
};
